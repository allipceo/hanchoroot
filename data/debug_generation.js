// 세대 데이터 디버깅 스크립트
const fs = require('fs');

function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

function debugGeneration() {
  console.log('=== 세대 데이터 디버깅 ===\n');
  
  const data = readJsonFile('notion_data_raw.json');
  
  // 세대 정보가 null인 인물들 찾기
  const nullGen = data.results.filter(person => !person.properties.세대?.select?.name);
  console.log(`세대 정보가 null인 인물 수: ${nullGen.length}`);
  
  console.log('\n세대 정보가 null인 인물들:');
  nullGen.slice(0, 10).forEach((person, i) => {
    const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
    const line = person.properties.Line1?.select?.name || 'Line1';
    console.log(`${i+1}. ${name} (Line: ${line})`);
  });
  
  // 세대별 분포 확인
  const genStats = {};
  data.results.forEach(person => {
    const gen = person.properties.세대?.select?.name || 'null';
    genStats[gen] = (genStats[gen] || 0) + 1;
  });
  
  console.log('\n세대별 분포:');
  Object.entries(genStats).forEach(([gen, count]) => {
    console.log(`${gen}: ${count}명`);
  });
  
  // Line별 분포 확인
  const lineStats = {};
  data.results.forEach(person => {
    const line = person.properties.Line1?.select?.name || 'Line1';
    lineStats[line] = (lineStats[line] || 0) + 1;
  });
  
  console.log('\nLine별 분포:');
  Object.entries(lineStats).forEach(([line, count]) => {
    console.log(`${line}: ${count}명`);
  });
}

debugGeneration();
