// 상세정보 기능 테스트
const fs = require('fs');

console.log('=== 상세정보 기능 테스트 ===\n');

try {
  // 데이터 로드
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  
  console.log('1. 데이터 로드 확인:');
  console.log(`   - 총 인물 수: ${data.persons.length}명`);
  
  console.log('\n2. 조은상 인물 정보 확인:');
  const joEunSang = data.persons.find(p => p.name === '조은상');
  if (joEunSang) {
    console.log(`   ✅ 조은상 찾음: ID=${joEunSang.id}`);
    console.log(`   - 이름: ${joEunSang.name}`);
    console.log(`   - 세대: ${joEunSang.generation}세대`);
    console.log(`   - Line: ${joEunSang.line}`);
    console.log(`   - 성별: ${joEunSang.gender}`);
    console.log(`   - 상태: ${joEunSang.status}`);
    console.log(`   - 생년월일: ${joEunSang.birthDate || '미상'}`);
    console.log(`   - 부모: ${joEunSang.relationships?.father || '미상'}, ${joEunSang.relationships?.mother || '미상'}`);
    console.log(`   - 배우자: ${joEunSang.relationships?.spouses?.join(', ') || '없음'}`);
    console.log(`   - 자녀: ${joEunSang.relationships?.children?.join(', ') || '없음'}`);
  } else {
    console.log('   ❌ 조은상을 찾을 수 없습니다.');
  }
  
  console.log('\n3. 상세정보 URL 생성 테스트:');
  if (joEunSang) {
    const detailUrl = `detail.html?id=${joEunSang.id}`;
    console.log(`   ✅ 상세정보 URL: ${detailUrl}`);
  }
  
  console.log('\n4. 다른 인물들도 확인:');
  const testPersons = ['조영하', '조명하', '조세희'];
  testPersons.forEach(name => {
    const person = data.persons.find(p => p.name === name);
    if (person) {
      console.log(`   ✅ ${name}: ID=${person.id}, ${person.generation}세대, ${person.line}`);
    } else {
      console.log(`   ❌ ${name}: 찾을 수 없음`);
    }
  });
  
  console.log('\n✅ 상세정보 기능 테스트 완료');
  
} catch (error) {
  console.error('❌ 상세정보 기능 테스트 실패:', error.message);
}
