#!/usr/bin/env node
/* Minimal sync toolset - dry-run and partial-apply */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJSON(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8'); }
function nowISO() { return new Date().toISOString(); }

function resolvePath(cli, env, cfg) {
  if (cli) return path.resolve(cli);
  if (process.env[env]) return path.resolve(process.env[env]);
  if (cfg) return path.resolve(ROOT, cfg);
  return null;
}

// args: mode [notionPath] [corePath]
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node sync/index.js <mode:dry-run|apply-partial|overwrite> [notion_export.json] [core_js_or_json]');
  process.exit(1);
}
const mode = args[0];
const notionPath = resolvePath(args[1], 'NOTION_EXPORT_PATH', CONFIG.paths && CONFIG.paths.export);
const corePath = resolvePath(args[2], 'CORE_DATA_PATH', CONFIG.paths && CONFIG.paths.core);
if (!notionPath || !corePath) {
  console.error('Paths unresolved. Provide args, env (NOTION_EXPORT_PATH/CORE_DATA_PATH), or set sync/config.json paths.');
  process.exit(1);
}

// Load notion export (assumed JSON array)
const notionRaw = fs.readFileSync(notionPath);
const notion = readJSON(notionPath);
// Load core data: supports JS with window.CORE_DATA or pure JSON array
let core; let coreBuf = null;
if (corePath.endsWith('.json')) {
  coreBuf = fs.readFileSync(corePath);
  core = JSON.parse(coreBuf.toString('utf8'));
} else {
  const text = fs.readFileSync(corePath, 'utf8');
  coreBuf = Buffer.from(text, 'utf8');
  // support window.CORE_DATA = [...] or export default [...]
  let match = text.match(/window\.CORE_DATA\s*=\s*(\[\s*[\s\S]*?\]);/);
  if (!match) match = text.match(/export\s+default\s+(\[\s*[\s\S]*?\]);/);
  if (!match) {
    console.error('Failed to parse CORE_DATA from JS');
    process.exit(1);
  }
  core = JSON.parse(match[1]);
}

function sortByIdName(arr) {
  return [...arr].sort((a,b)=> (a.id||'').localeCompare(b.id||'') || (a.name||'').localeCompare(b.name||''));
}

function validateIdFormat(arr) {
  const re = /^L[1-6]-G[1-6]-(M|F)-(S|D|H|W)-\d{3}$/;
  return arr.filter(x => !x.id || !re.test(x.id));
}
function validateUniq(arr) {
  const seen = new Set(); const dup = [];
  for (const x of arr) {
    if (!x.id) { dup.push(x); continue; }
    if (seen.has(x.id)) dup.push(x); else seen.add(x.id);
  }
  return dup;
}
function refOK(x, indexByName) {
  const r = x.relationships || {}; const names = [];
  if (r.father) names.push(r.father);
  if (r.mother) names.push(r.mother);
  for (const s of (r.spouses||[])) names.push(s);
  for (const c of (r.children||[])) names.push(c);
  for (const s of (r.siblings||[])) names.push(s);
  return names.every(n => !n || indexByName.has(n));
}
function validateRefs(arr) {
  const idx = new Map();
  for (const p of arr) idx.set(p.name, true);
  const fails = [];
  for (const x of arr) if (!refOK(x, idx)) fails.push(x);
  return fails;
}

function diffById(notionSorted, coreSorted) {
  const coreMap = new Map(coreSorted.map(x => [x.id, x]));
  const notionMap = new Map(notionSorted.map(x => [x.id, x]));
  const add = []; const update = []; const hold = []; const reissued = []; const ref_fixed = [];
  for (const n of notionSorted) {
    if (!n.id) continue;
    const c = coreMap.get(n.id);
    if (!c) { add.push(n.id); continue; }
    const k = ['name','성별','세대','relationships'];
    let changed = false;
    for (const key of k) { if (JSON.stringify(n[key]) !== JSON.stringify(c[key])) { changed = true; break; } }
    if (changed) update.push(n.id);
  }
  for (const c of coreSorted) { if (c.id && !notionMap.has(c.id)) hold.push(c.id); }
  return { add, update, hold, reissued, ref_fixed };
}

// Sort as required
const notionSorted = sortByIdName(notion);
const coreSorted = sortByIdName(core);

// 4 checks
const invalid = validateIdFormat(notionSorted);
const dup = validateUniq(notionSorted);
const refFail = validateRefs(notionSorted);
const diff = diffById(notionSorted, coreSorted);

const meta = {
  sha256_export: sha256(notionRaw),
  sha256_core: sha256(coreBuf),
  node: process.version,
  tz: CONFIG.meta.tz,
  commit: process.env.GIT_COMMIT || '',
  sorted_by: CONFIG.export.sorted_by,
  export_count: notionSorted.length,
  core_count: coreSorted.length,
  ts: nowISO(),
  mode
};

const metaPath = path.join(__dirname, 'meta.json');
const metricsPath = path.join(__dirname, 'metrics.json');

function exitWith(code) { process.exit(code); }

if (mode === 'dry-run') {
  writeJSON(metaPath, meta);
  writeJSON(metricsPath, {
    checks: {
      id_format: { ok: invalid.length === 0, fail: invalid.length },
      uniqueness: { ok: dup.length === 0, duplicates: dup.length },
      references: { ok: refFail.length === 0, fail: refFail.length }
    },
    diff,
    errors: []
  });
  const exitCode = (invalid.length || dup.length || refFail.length) ? 3 : (diff.hold.length ? 2 : 0);
  console.log('DRY-RUN complete:', { invalid: invalid.length, dup: dup.length, refFail: refFail.length, add: diff.add.length, update: diff.update.length, hold: diff.hold.length, exitCode });
  exitWith(exitCode);
}

if (mode === 'apply-partial') {
  if (invalid.length || dup.length || refFail.length) {
    writeJSON(metaPath, meta);
    writeJSON(metricsPath, { checks: { id_format: { ok:false, fail: invalid.length }, uniqueness: { ok:false, duplicates: dup.length }, references: { ok:false, fail: refFail.length } }, diff, errors: ['gate_failed'] });
    console.error('Gate failed. Resolve issues before apply.', { invalid: invalid.length, dup: dup.length, refFail: refFail.length });
    exitWith(3);
  }
  const coreMap = new Map(coreSorted.map(x => [x.id, x]));
  for (const id of diff.add) coreMap.set(id, notionSorted.find(x => x.id === id));
  for (const id of diff.update) coreMap.set(id, notionSorted.find(x => x.id === id));
  const next = sortByIdName(Array.from(coreMap.values()));
  const out = path.join(ROOT, 'data', `window_core_data_${new Date().toISOString().replace(/[:.]/g,'-')}.js`);
  const js = `window.CORE_DATA = ${JSON.stringify(next, null, 2)};\n`;
  fs.writeFileSync(out, js, 'utf8');
  writeJSON(metaPath, meta);
  writeJSON(metricsPath, { checks: { id_format: { ok:true, fail: 0 }, uniqueness: { ok:true, duplicates: 0 }, references: { ok:true, fail: 0 } }, diff, errors: [] });
  console.log('APPLY-PARTIAL complete:', { add: diff.add.length, update: diff.update.length, out });
  exitWith(0);
}

if (mode === 'overwrite') {
  if (invalid.length || dup.length || refFail.length) {
    console.error('Gate failed. Overwrite aborted.');
    exitWith(3);
  }
  const out = path.join(ROOT, 'data', `window_core_data_${new Date().toISOString().replace(/[:.]/g,'-')}.js`);
  const js = `window.CORE_DATA = ${JSON.stringify(notionSorted, null, 2)};\n`;
  fs.writeFileSync(out, js, 'utf8');
  writeJSON(metaPath, meta);
  writeJSON(metricsPath, { checks: { id_format: { ok:true, fail: 0 }, uniqueness: { ok:true, duplicates: 0 }, references: { ok:true, fail: 0 } }, diff, errors: [] });
  console.log('OVERWRITE complete:', { total: notionSorted.length, out });
  exitWith(0);
}

console.error('Unknown mode');
exitWith(1);
