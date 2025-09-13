// 1세대 가족 관계 데이터 수정 스크립트

const fs = require('fs');

// 실제 데이터 로드
const notionData = JSON.parse(fs.readFileSync('./converted_complete_data.json', 'utf8'));

console.log('=== 1세대 데이터 수정 시작 ===\n');

// 1세대 인물들 찾기
const generation1Persons = notionData.persons.filter(p => p.generation === 1);
console.log('수정 전 1세대 인물들:');
generation1Persons.forEach(p => {
  console.log(`- ${p.name} (${p.line}, ${p.gender})`);
});

// 1세대 데이터 수정
notionData.persons.forEach(person => {
  if (person.generation === 1) {
    switch (person.name) {
      case '조정윤':
        // 조정윤은 Line1, Line2, Line3 모두에 속함 (두 번 결혼)
        person.line = 'Line1'; // 기본값을 Line1으로 설정
        console.log(`✅ 조정윤: ${person.line}로 수정`);
        break;
      case '임정숙':
        // 임정숙은 Line1, Line2에 속함 (첫 번째 부인)
        person.line = 'Line1'; // 기본값을 Line1으로 설정
        console.log(`✅ 임정숙: ${person.line}로 수정`);
        break;
      case '이천경':
        // 이천경은 Line3에 속함 (두 번째 부인)
        person.line = 'Line3';
        console.log(`✅ 이천경: ${person.line}로 수정`);
        break;
    }
  }
});

// 수정된 데이터를 새로운 파일로 저장
fs.writeFileSync('./converted_complete_data_fixed.json', JSON.stringify(notionData, null, 2), 'utf8');

console.log('\n=== 수정 후 1세대 인물들 ===');
const updatedGeneration1Persons = notionData.persons.filter(p => p.generation === 1);
updatedGeneration1Persons.forEach(p => {
  console.log(`- ${p.name} (${p.line}, ${p.gender})`);
});

console.log('\n=== Line별 1세대 분포 ===');
const line1Gen1 = updatedGeneration1Persons.filter(p => p.line === 'Line1');
const line2Gen1 = updatedGeneration1Persons.filter(p => p.line === 'Line2');
const line3Gen1 = updatedGeneration1Persons.filter(p => p.line === 'Line3');
const commonGen1 = updatedGeneration1Persons.filter(p => p.line === '공통');

console.log(`Line1 1세대: ${line1Gen1.length}명`);
line1Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line2 1세대: ${line2Gen1.length}명`);
line2Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log(`Line3 1세대: ${line3Gen1.length}명`);
line3Gen1.forEach(p => console.log(`  - ${p.name}`));

console.log(`공통 1세대: ${commonGen1.length}명`);
commonGen1.forEach(p => console.log(`  - ${p.name}`));

console.log('\n✅ 1세대 데이터 수정 완료: converted_complete_data_fixed.json');
