// 조정윤을 모든 Line에 포함시키는 스크립트

const fs = require('fs');

// 수정된 데이터 로드
const notionData = JSON.parse(fs.readFileSync('./converted_complete_data_fixed.json', 'utf8'));

console.log('=== 조정윤을 모든 Line에 포함시키기 ===\n');

// 조정윤을 찾아서 복제하여 각 Line에 포함
const jojeongyun = notionData.persons.find(p => p.name === '조정윤');
if (jojeongyun) {
  console.log(`조정윤 찾음: ${jojeongyun.name} (${jojeongyun.line}, ${jojeongyun.gender})`);
  
  // 조정윤을 Line2와 Line3에도 추가
  const jojeongyunLine2 = JSON.parse(JSON.stringify(jojeongyun));
  jojeongyunLine2.id = jojeongyun.id + '_Line2';
  jojeongyunLine2.line = 'Line2';
  jojeongyunLine2.additional = jojeongyunLine2.additional || {};
  jojeongyunLine2.additional.notes = '조정윤 (Line2) - 두 번째 결혼으로 Line2 시작';
  
  const jojeongyunLine3 = JSON.parse(JSON.stringify(jojeongyun));
  jojeongyunLine3.id = jojeongyun.id + '_Line3';
  jojeongyunLine3.line = 'Line3';
  jojeongyunLine3.additional = jojeongyunLine3.additional || {};
  jojeongyunLine3.additional.notes = '조정윤 (Line3) - 두 번째 결혼으로 Line3 시작';
  
  // Line1 조정윤의 노트 수정
  jojeongyun.additional = jojeongyun.additional || {};
  jojeongyun.additional.notes = '조정윤 (Line1) - 첫 번째 결혼으로 Line1 시작';
  
  // 배열에 추가
  notionData.persons.push(jojeongyunLine2);
  notionData.persons.push(jojeongyunLine3);
  
  console.log('✅ 조정윤을 Line2와 Line3에 추가 완료');
}

// 임정숙도 Line2에 추가 (조정윤의 첫 번째 부인이므로 Line2에도 속함)
const imjeongsuk = notionData.persons.find(p => p.name === '임정숙');
if (imjeongsuk) {
  const imjeongsukLine2 = JSON.parse(JSON.stringify(imjeongsuk));
  imjeongsukLine2.id = imjeongsuk.id + '_Line2';
  imjeongsukLine2.line = 'Line2';
  imjeongsukLine2.additional = imjeongsukLine2.additional || {};
  imjeongsukLine2.additional.notes = '임정숙 (Line2) - 조정윤의 첫 번째 부인';
  
  notionData.persons.push(imjeongsukLine2);
  console.log('✅ 임정숙을 Line2에 추가 완료');
}

// 수정된 데이터 저장
fs.writeFileSync('./converted_complete_data_final.json', JSON.stringify(notionData, null, 2), 'utf8');

console.log('\n=== 최종 1세대 분포 ===');
const finalGeneration1Persons = notionData.persons.filter(p => p.generation === 1);
const line1Gen1 = finalGeneration1Persons.filter(p => p.line === 'Line1');
const line2Gen1 = finalGeneration1Persons.filter(p => p.line === 'Line2');
const line3Gen1 = finalGeneration1Persons.filter(p => p.line === 'Line3');

console.log(`Line1 1세대: ${line1Gen1.length}명`);
line1Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line2 1세대: ${line2Gen1.length}명`);
line2Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line3 1세대: ${line3Gen1.length}명`);
line3Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log('\n✅ 최종 데이터 수정 완료: converted_complete_data_final.json');
