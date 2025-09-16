// 조병희 관련 가족 데이터 확인 스크립트

const fs = require('fs');

// 실제 데이터 로드
const notionData = JSON.parse(fs.readFileSync('./converted_complete_data.json', 'utf8'));

console.log('=== 조병희 관련 가족 데이터 확인 ===\n');

// 조병희 관련 인물들 찾기
const relatedPersons = notionData.persons.filter(p => 
  p.name.includes('조병희') || 
  p.name.includes('강부인') || 
  p.name.includes('민혜숙') ||
  p.name.includes('조정윤') ||
  p.name.includes('이천경')
);

console.log('관련 인물들:');
relatedPersons.forEach(p => {
  console.log(`- ${p.name} (${p.generation}세대, ${p.line}, ${p.gender})`);
  if (p.relationships) {
    console.log(`  부모: ${p.relationships.father || 'N/A'} - ${p.relationships.mother || 'N/A'}`);
    console.log(`  배우자: ${p.relationships.spouses ? p.relationships.spouses.join(', ') : 'N/A'}`);
  }
  console.log('');
});

// 2세대 인물들 확인
console.log('=== 2세대 인물들 ===');
const generation2Persons = notionData.persons.filter(p => p.generation === 2);
generation2Persons.forEach(p => {
  console.log(`- ${p.name} (${p.line}, ${p.gender})`);
});

console.log('\n=== Line별 2세대 분포 ===');
const line1Gen2 = generation2Persons.filter(p => p.line === 'Line1');
const line2Gen2 = generation2Persons.filter(p => p.line === 'Line2');
const line3Gen2 = generation2Persons.filter(p => p.line === 'Line3');
const commonGen2 = generation2Persons.filter(p => p.line === '공통');

console.log(`Line1 2세대: ${line1Gen2.length}명`);
line1Gen2.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line2 2세대: ${line2Gen2.length}명`);
line2Gen2.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line3 2세대: ${line3Gen2.length}명`);
line3Gen2.forEach(p => console.log(`  - ${p.name}`));

console.log(`공통 2세대: ${commonGen2.length}명`);
commonGen2.forEach(p => console.log(`  - ${p.name}`));
