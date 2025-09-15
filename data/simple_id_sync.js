// 간단한 ID 동기화: 노션 ID를 윈도우코어에 복사
const fs = require('fs');

console.log('🔄 간단한 ID 동기화 시작...');

// 1. 노션 데이터 로드 (ID 포함)
const notionData = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8'));
console.log(`📊 노션 데이터: ${notionData.length}명`);

// 2. 윈도우코어 데이터 로드
const coreData = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8')); // 같은 파일 사용
console.log(`📊 윈도우코어 데이터: ${coreData.length}명`);

// 3. 이름순으로 정렬
notionData.sort((a, b) => a.name.localeCompare(b.name));
coreData.sort((a, b) => a.name.localeCompare(b.name));

console.log('📝 이름순 정렬 완료');

// 4. 이름을 매개로 ID 복사
let syncedCount = 0;
coreData.forEach(corePerson => {
  const notionPerson = notionData.find(n => n.name === corePerson.name);
  if (notionPerson && notionPerson.id) {
    corePerson.id = notionPerson.id;
    syncedCount++;
  }
});

console.log(`✅ ID 동기화 완료: ${syncedCount}명`);

// 5. 결과 저장
const result = `// 한양조씨 족보 앱 - 통합 데이터 소스 (ID 동기화 완료)
// 생성일: ${new Date().toISOString()}
// 데이터 수: ${coreData.length}명

window.CORE_DATA = ${JSON.stringify(coreData, null, 2)};

console.log('📊 CORE_DATA 로드 완료:', {
  총인원: window.CORE_DATA.length,
  ID동기화: '완료',
  생성일: '${new Date().toISOString()}'
});`;

fs.writeFileSync('window_core_data.js', result, 'utf8');
console.log('💾 window_core_data.js 저장 완료');

// 6. 통계 출력
const withId = coreData.filter(p => p.id).length;
const withoutId = coreData.filter(p => !p.id).length;

console.log('\n📊 최종 통계:');
console.log(`✅ 총 인원: ${coreData.length}명`);
console.log(`✅ ID 있음: ${withId}명`);
console.log(`⚠️ ID 없음: ${withoutId}명`);

if (withoutId > 0) {
  console.log('\n⚠️ ID가 없는 인원:');
  coreData.filter(p => !p.id).forEach(person => {
    console.log(`- ${person.name}`);
  });
}

console.log('\n🎉 간단한 ID 동기화 완료!');
