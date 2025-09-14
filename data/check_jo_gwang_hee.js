// 조광희의 아버지 확인 스크립트
const fs = require('fs');

console.log('=== 조광희의 아버지 확인 ===\n');

try {
  // core_browser.js에서 조광희 데이터 추출
  const content = fs.readFileSync('./core_browser.js', 'utf8');
  const match = content.match(/const CORE_DATA = ([\s\S]*?);/);
  
  if (!match) {
    throw new Error('CORE_DATA를 찾을 수 없습니다');
  }
  
  const data = JSON.parse(match[1]);
  const joGwangHee = data.persons.find(p => p.name === '조광희');
  
  if (!joGwangHee) {
    console.log('❌ 조광희 데이터를 찾을 수 없습니다');
    console.log('\n사용 가능한 이름들 (조씨 성을 가진 사람들):');
    const joPersons = data.persons.filter(p => p.name.startsWith('조'));
    joPersons.forEach(p => console.log(`- ${p.name} (${p.id})`));
    return;
  }
  
  console.log('✅ 조광희 데이터 발견!');
  console.log('\n📋 조광희 기본 정보:');
  console.log(`- 이름: ${joGwangHee.name}`);
  console.log(`- ID: ${joGwangHee.id}`);
  console.log(`- 세대: ${joGwangHee.세대}세대`);
  console.log(`- 성별: ${joGwangHee.성별}`);
  console.log(`- Line1: ${joGwangHee.Line1}`);
  console.log(`- 생년: ${joGwangHee.생년}`);
  console.log(`- 생존상태: ${joGwangHee.생존상태}`);
  
  console.log('\n👨‍👩‍👧‍👦 조광희의 가족관계:');
  console.log(`- 아버지: ${joGwangHee.relationships.father || '없음'}`);
  console.log(`- 어머니: ${joGwangHee.relationships.mother || '없음'}`);
  console.log(`- 배우자: ${joGwangHee.relationships.spouses.length > 0 ? joGwangHee.relationships.spouses.join(', ') : '없음'}`);
  console.log(`- 자녀: ${joGwangHee.relationships.children.length > 0 ? joGwangHee.relationships.children.join(', ') : '없음'}`);
  console.log(`- 형제자매: ${joGwangHee.relationships.siblings.length > 0 ? joGwangHee.relationships.siblings.join(', ') : '없음'}`);
  
  // 아버지 정보가 있다면 상세 정보 표시
  if (joGwangHee.relationships.father) {
    const father = data.persons.find(p => p.name === joGwangHee.relationships.father);
    if (father) {
      console.log('\n👨 조광희의 아버지 상세 정보:');
      console.log(`- 이름: ${father.name}`);
      console.log(`- ID: ${father.id}`);
      console.log(`- 세대: ${father.세대}세대`);
      console.log(`- 성별: ${father.성별}`);
      console.log(`- Line1: ${father.Line1}`);
      console.log(`- 생년: ${father.생년}`);
      console.log(`- 생존상태: ${father.생존상태}`);
    } else {
      console.log(`\n❌ 아버지 "${joGwangHee.relationships.father}"의 상세 정보를 찾을 수 없습니다`);
    }
  } else {
    console.log('\n❌ 조광희의 아버지 정보가 없습니다');
  }
  
  console.log('\n📝 추가 정보:');
  console.log(`- 비고: ${joGwangHee.additional.notes || '없음'}`);
  
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
}
