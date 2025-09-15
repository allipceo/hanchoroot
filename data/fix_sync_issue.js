// 조윤희 ID 불일치 수정
const fs = require('fs');

console.log('🔧 조윤희 ID 불일치 수정 중...');

// 윈도우코어 데이터 로드
const coreContent = fs.readFileSync('window_core_data.js', 'utf8');
const match = coreContent.match(/window\.CORE_DATA = (\[[\s\S]*\]);/);
const coreData = JSON.parse(match[1]);

// 조윤희 찾기 및 ID 수정
const targetPerson = coreData.find(p => p.name === '조윤희');
if (targetPerson) {
  console.log(`찾은 인원: ${targetPerson.name}`);
  console.log(`현재 ID: ${targetPerson.id}`);
  
  // 노션의 정확한 ID로 수정
  targetPerson.id = 'L1-G5-F-D-748';
  
  console.log(`수정된 ID: ${targetPerson.id}`);
  
  // 수정된 데이터 저장
  const result = `// 한양조씨 족보 앱 - 통합 데이터 소스 (ID 동기화 완료)
// 생성일: ${new Date().toISOString()}
// 데이터 수: ${coreData.length}명
// 조윤희 ID 수정 완료

window.CORE_DATA = ${JSON.stringify(coreData, null, 2)};

console.log('📊 CORE_DATA 로드 완료:', {
  총인원: window.CORE_DATA.length,
  ID동기화: '완료 (조윤희 ID 수정)',
  생성일: '${new Date().toISOString()}'
});`;

  fs.writeFileSync('window_core_data.js', result, 'utf8');
  console.log('✅ window_core_data.js 수정 완료');
  
} else {
  console.log('❌ 조윤희를 찾을 수 없습니다.');
}

console.log('🎉 ID 수정 완료!');
