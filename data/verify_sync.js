// 노션 데이터와 윈도우코어 데이터 완전 동기화 확인
const fs = require('fs');

console.log('🔍 노션 데이터와 윈도우코어 데이터 동기화 확인 시작...');

// 1. 노션 데이터 로드 (ID 포함)
let notionData;
try {
  notionData = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8'));
  console.log(`📊 노션 데이터: ${notionData.length}명`);
} catch (error) {
  console.log('❌ notion_data_with_ids.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

// 2. 윈도우코어 데이터 로드
let coreData;
try {
  const coreContent = fs.readFileSync('window_core_data.js', 'utf8');
  const match = coreContent.match(/window\.CORE_DATA = (\[[\s\S]*\]);/);
  if (match) {
    coreData = JSON.parse(match[1]);
    console.log(`📊 윈도우코어 데이터: ${coreData.length}명`);
  } else {
    console.log('❌ window_core_data.js에서 CORE_DATA를 찾을 수 없습니다.');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ window_core_data.js 파일을 읽을 수 없습니다:', error.message);
  process.exit(1);
}

// 3. 기본 통계
console.log('\n📊 기본 통계:');
console.log(`노션 데이터: ${notionData.length}명`);
console.log(`윈도우코어 데이터: ${coreData.length}명`);
console.log(`데이터 수 일치: ${notionData.length === coreData.length ? '✅' : '❌'}`);

// 4. 이름 기준으로 정렬
notionData.sort((a, b) => a.name.localeCompare(b.name));
coreData.sort((a, b) => a.name.localeCompare(b.name));

// 5. 상세 동기화 확인
let syncIssues = [];
let perfectSync = 0;

console.log('\n🔍 상세 동기화 확인:');

for (let i = 0; i < Math.max(notionData.length, coreData.length); i++) {
  const notionPerson = notionData[i];
  const corePerson = coreData[i];
  
  if (!notionPerson) {
    syncIssues.push({
      type: 'missing_in_notion',
      index: i,
      coreName: corePerson?.name || '이름없음'
    });
    continue;
  }
  
  if (!corePerson) {
    syncIssues.push({
      type: 'missing_in_core',
      index: i,
      notionName: notionPerson?.name || '이름없음'
    });
    continue;
  }
  
  // 이름 일치 확인
  if (notionPerson.name !== corePerson.name) {
    syncIssues.push({
      type: 'name_mismatch',
      index: i,
      notionName: notionPerson.name,
      coreName: corePerson.name
    });
    continue;
  }
  
  // ID 일치 확인
  if (notionPerson.id !== corePerson.id) {
    syncIssues.push({
      type: 'id_mismatch',
      index: i,
      name: notionPerson.name,
      notionId: notionPerson.id,
      coreId: corePerson.id
    });
    continue;
  }
  
  // 완전 동기화된 레코드
  perfectSync++;
}

// 6. 결과 출력
console.log('\n📊 동기화 결과:');
console.log(`✅ 완전 동기화: ${perfectSync}명`);
console.log(`❌ 동기화 문제: ${syncIssues.length}개`);

if (syncIssues.length > 0) {
  console.log('\n❌ 동기화 문제 상세:');
  syncIssues.forEach((issue, index) => {
    switch (issue.type) {
      case 'missing_in_notion':
        console.log(`${index + 1}. 노션에 없음: ${issue.coreName}`);
        break;
      case 'missing_in_core':
        console.log(`${index + 1}. 윈도우코어에 없음: ${issue.notionName}`);
        break;
      case 'name_mismatch':
        console.log(`${index + 1}. 이름 불일치: 노션(${issue.notionName}) vs 윈도우코어(${issue.coreName})`);
        break;
      case 'id_mismatch':
        console.log(`${index + 1}. ID 불일치: ${issue.name} - 노션(${issue.notionId}) vs 윈도우코어(${issue.coreId})`);
        break;
    }
  });
} else {
  console.log('\n🎉 완벽한 동기화! 모든 레코드가 일치합니다.');
}

// 7. ID 통계
const notionWithId = notionData.filter(p => p.id).length;
const coreWithId = coreData.filter(p => p.id).length;

console.log('\n📊 ID 통계:');
console.log(`노션 ID 있음: ${notionWithId}명 (${Math.round(notionWithId/notionData.length*100)}%)`);
console.log(`윈도우코어 ID 있음: ${coreWithId}명 (${Math.round(coreWithId/coreData.length*100)}%)`);

// 8. 샘플 데이터 확인
console.log('\n📋 샘플 데이터 확인 (처음 5명):');
for (let i = 0; i < Math.min(5, notionData.length); i++) {
  const notion = notionData[i];
  const core = coreData[i];
  console.log(`${i + 1}. ${notion.name}:`);
  console.log(`   노션 ID: ${notion.id || '없음'}`);
  console.log(`   윈도우코어 ID: ${core.id || '없음'}`);
  console.log(`   일치: ${notion.id === core.id ? '✅' : '❌'}`);
}

// 9. 최종 결론
console.log('\n🎯 최종 결론:');
if (syncIssues.length === 0 && notionData.length === coreData.length) {
  console.log('✅ 완벽한 동기화! 노션 데이터와 윈도우코어 데이터가 100% 일치합니다.');
} else {
  console.log(`❌ 동기화 문제 발견: ${syncIssues.length}개 문제`);
  console.log('문제를 해결한 후 다시 확인해주세요.');
}
