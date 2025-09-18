#!/usr/bin/env node
/* Fix duplicate IDs and reference issues in Notion data */

const fs = require('fs');
const path = require('path');

// Load the Notion data
const notionData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'notion_data_with_ids.json'), 'utf8'));

console.log('=== Notion Data Issue Analysis ===');
console.log(`Total records: ${notionData.length}`);

// 1. Find duplicate IDs
const idCount = new Map();
const duplicates = [];

for (const person of notionData) {
  if (person.id) {
    if (idCount.has(person.id)) {
      duplicates.push({ id: person.id, name: person.name, existing: idCount.get(person.id) });
    } else {
      idCount.set(person.id, person.name);
    }
  }
}

console.log(`\n=== Duplicate IDs (${duplicates.length}) ===`);
duplicates.forEach(dup => {
  console.log(`ID: ${dup.id} - ${dup.existing} vs ${dup.name}`);
});

// 2. Find reference issues
const nameSet = new Set(notionData.map(p => p.name));
const refIssues = [];

for (const person of notionData) {
  const r = person.relationships || {};
  const refNames = [];
  if (r.father) refNames.push(r.father);
  if (r.mother) refNames.push(r.mother);
  for (const s of (r.spouses||[])) refNames.push(s);
  for (const c of (r.children||[])) refNames.push(c);
  for (const s of (r.siblings||[])) refNames.push(s);
  
  const missingRefs = refNames.filter(name => !nameSet.has(name));
  if (missingRefs.length > 0) {
    refIssues.push({ name: person.name, missing: missingRefs });
  }
}

console.log(`\n=== Reference Issues (${refIssues.length}) ===`);
refIssues.forEach(issue => {
  console.log(`${issue.name}: missing refs [${issue.missing.join(', ')}]`);
});

// 3. Generate fix suggestions
console.log(`\n=== Fix Suggestions ===`);

// Fix duplicate IDs
if (duplicates.length > 0) {
  console.log('\n1. Duplicate ID Fixes:');
  const fixedData = [...notionData];
  
  duplicates.forEach((dup, index) => {
    const personIndex = fixedData.findIndex(p => p.id === dup.id && p.name === dup.name);
    if (personIndex >= 0) {
      // Generate new ID by incrementing the last number
      const baseId = dup.id.substring(0, dup.id.length - 3);
      const newNumber = String(parseInt(dup.id.slice(-3)) + 100 + index).padStart(3, '0');
      const newId = baseId + newNumber;
      
      fixedData[personIndex].id = newId;
      console.log(`  ${dup.name}: ${dup.id} → ${newId}`);
    }
  });
  
  // Save fixed data
  const outputPath = path.join(__dirname, '..', 'data', 'notion_data_fixed.json');
  fs.writeFileSync(outputPath, JSON.stringify(fixedData, null, 2), 'utf8');
  console.log(`\nFixed data saved to: ${outputPath}`);
}

// Reference fix suggestions
if (refIssues.length > 0) {
  console.log('\n2. Reference Fix Suggestions:');
  refIssues.forEach(issue => {
    console.log(`  ${issue.name}:`);
    issue.missing.forEach(missing => {
      // Find similar names
      const similar = Array.from(nameSet).filter(name => 
        name.includes(missing) || missing.includes(name) || 
        name.replace(/[가-힣]/g, '').toLowerCase() === missing.replace(/[가-힣]/g, '').toLowerCase()
      );
      if (similar.length > 0) {
        console.log(`    "${missing}" → suggest: [${similar.join(', ')}]`);
      } else {
        console.log(`    "${missing}" → no similar names found`);
      }
    });
  });
}

console.log('\n=== Summary ===');
console.log(`- Duplicate IDs: ${duplicates.length}`);
console.log(`- Reference issues: ${refIssues.length}`);
console.log(`- Total issues: ${duplicates.length + refIssues.length}`);
