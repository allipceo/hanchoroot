// 조은상 데이터 확인 스크립트
const fs = require('fs');

console.log('=== 조은상 가족관계 데이터 확인 ===\n');

try {
  // core_browser.js에서 조은상 데이터 추출
  const content = fs.readFileSync('./core_browser.js', 'utf8');
  const match = content.match(/const CORE_DATA = ([\s\S]*?);/);
  
  if (!match) {
    throw new Error('CORE_DATA를 찾을 수 없습니다');
  }
  
  const data = JSON.parse(match[1]);
  const joEunsang = data.persons.find(p => p.name === '조은상');
  
  if (!joEunsang) {
    console.log('❌ 조은상 데이터를 찾을 수 없습니다');
    console.log('사용 가능한 이름들:');
    data.persons.slice(0, 10).forEach(p => console.log(`- ${p.name}`));
    return;
  }
  
  console.log('✅ 조은상 데이터 발견!');
  console.log('\n📋 조은상 기본 정보:');
  console.log(`- 이름: ${joEunsang.name}`);
  console.log(`- ID: ${joEunsang.id}`);
  console.log(`- 세대: ${joEunsang.세대}세대`);
  console.log(`- 성별: ${joEunsang.성별}`);
  console.log(`- Line1: ${joEunsang.Line1}`);
  console.log(`- 생년: ${joEunsang.생년}`);
  console.log(`- 생존상태: ${joEunsang.생존상태}`);
  
  console.log('\n👨‍👩‍👧‍👦 가족관계 정보:');
  console.log(`- 아버지: ${joEunsang.relationships.father || '없음'}`);
  console.log(`- 어머니: ${joEunsang.relationships.mother || '없음'}`);
  console.log(`- 배우자: ${joEunsang.relationships.spouses.length > 0 ? joEunsang.relationships.spouses.join(', ') : '없음'}`);
  console.log(`- 자녀: ${joEunsang.relationships.children.length > 0 ? joEunsang.relationships.children.join(', ') : '없음'}`);
  console.log(`- 형제자매: ${joEunsang.relationships.siblings.length > 0 ? joEunsang.relationships.siblings.join(', ') : '없음'}`);
  
  console.log('\n📝 추가 정보:');
  console.log(`- 비고: ${joEunsang.additional.notes || '없음'}`);
  
  // 가족관계 데이터가 있는지 확인
  const hasFamilyData = joEunsang.relationships.father || 
                       joEunsang.relationships.mother || 
                       joEunsang.relationships.spouses.length > 0 || 
                       joEunsang.relationships.children.length > 0;
  
  console.log('\n🔍 가족관계 데이터 분석:');
  console.log(`- 가족관계 데이터 존재: ${hasFamilyData ? '✅ 있음' : '❌ 없음'}`);
  
  if (hasFamilyData) {
    console.log('✅ 가족관계 표시 가능!');
  } else {
    console.log('❌ 가족관계 데이터가 없어 표시할 수 없습니다');
  }
  
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
}
