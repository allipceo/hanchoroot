// window.CORE_DATA 구조 분석 - 간단하고 단단하게
const fs = require('fs');

console.log('🔍 window.CORE_DATA 구조 분석 시작...');

// 1. 데이터 로드
let coreData;
try {
  const content = fs.readFileSync('window_core_data.js', 'utf8');
  const match = content.match(/window\.CORE_DATA = (\[[\s\S]*\]);/);
  if (match) {
    coreData = JSON.parse(match[1]);
    console.log(`✅ 데이터 로드 완료: ${coreData.length}명`);
  } else {
    console.log('❌ CORE_DATA를 찾을 수 없습니다.');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ 파일 읽기 오류:', error.message);
  process.exit(1);
}

// 2. 기본 통계
console.log('\n📊 기본 통계:');
console.log(`총 인원: ${coreData.length}명`);
console.log(`ID 있는 인원: ${coreData.filter(p => p.id).length}명`);

// 3. 관계 데이터 분석
console.log('\n🔍 관계 데이터 분석:');
let hasFather = 0;
let hasMother = 0;
let hasSpouse = 0;

coreData.forEach(person => {
  if (person.relationships?.father) hasFather++;
  if (person.relationships?.mother) hasMother++;
  if (person.relationships?.spouses?.length > 0) hasSpouse++;
});

console.log(`아버지 정보 있는 인원: ${hasFather}명`);
console.log(`어머니 정보 있는 인원: ${hasMother}명`);
console.log(`배우자 정보 있는 인원: ${hasSpouse}명`);

// 4. 샘플 데이터 확인
console.log('\n📋 샘플 데이터 (처음 3명):');
coreData.slice(0, 3).forEach((person, index) => {
  console.log(`\n${index + 1}. ${person.name} (${person.id}):`);
  console.log(`   부모: ${person.relationships?.father || '미상'} - ${person.relationships?.mother || '미상'}`);
  console.log(`   배우자: ${person.relationships?.spouses?.join(', ') || '없음'}`);
  console.log(`   세대: ${person.세대}, Line1: ${person.Line1}`);
});

// 5. 촌수계산에 필요한 최소 데이터 확인
console.log('\n🎯 촌수계산 준비도:');
const readyForChonsu = coreData.filter(p => 
  p.id && 
  p.name && 
  (p.relationships?.father || p.relationships?.mother)
).length;

console.log(`촌수계산 가능한 인원: ${readyForChonsu}명 (${Math.round(readyForChonsu/coreData.length*100)}%)`);

// 6. 간단한 관계 테스트
console.log('\n🧪 간단한 관계 테스트:');
const testPerson = coreData.find(p => p.relationships?.father && p.relationships?.mother);
if (testPerson) {
  console.log(`테스트 대상: ${testPerson.name}`);
  console.log(`부모: ${testPerson.relationships.father} - ${testPerson.relationships.mother}`);
  
  // 부모 찾기
  const father = coreData.find(p => p.name === testPerson.relationships.father);
  const mother = coreData.find(p => p.name === testPerson.relationships.mother);
  
  console.log(`아버지 찾기: ${father ? '✅' : '❌'} ${father?.name || '없음'}`);
  console.log(`어머니 찾기: ${mother ? '✅' : '❌'} ${mother?.name || '없음'}`);
}

console.log('\n✅ 구조 분석 완료!');
console.log('다음 단계: 간단한 촌수계산 함수 개발');
