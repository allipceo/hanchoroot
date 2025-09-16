// GIA_KEY_01로 전체 152명에게 ID 적용
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const NOTION_API_KEY = process.env.NOTION_API_KEY; // from .env
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// 원본 노션 데이터 로드
let notionData;
try {
  const rawData = JSON.parse(fs.readFileSync('notion_data_complete.json', 'utf8'));
  notionData = rawData.results;
  console.log(`📊 로드된 원본 데이터: ${notionData.length}명`);
} catch (error) {
  console.log('❌ notion_data_complete.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

// 생성된 ID 데이터 로드
let notionDataWithIds;
try {
  notionDataWithIds = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8'));
  console.log(`📊 로드된 ID 데이터: ${notionDataWithIds.length}명`);
} catch (error) {
  console.log('❌ notion_data_with_ids.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

// ID 매핑 생성 (이름 기준으로 매칭)
const idMapping = {};
notionDataWithIds.forEach(person => {
  idMapping[person.name] = person.id;
});

console.log(`📋 ID 매핑 생성 완료: ${Object.keys(idMapping).length}개`);

// Node.js에서 fetch() 사용을 위한 polyfill
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// fetch() API를 사용한 노션 페이지 업데이트 함수
async function updateNotionPageWithFetch(pageId, personId, personName) {
  const url = `https://api.notion.com/v1/pages/${pageId}`;
  
  const headers = {
    "Authorization": `Bearer ${NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
  };

  const data = {
    "properties": {
      "아이디": {
        "rich_text": [
          {
            "text": {
              "content": personId
            }
          }
        ]
      }
    }
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP 오류: ${response.status}, 상세: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    return { success: true, pageId, personId, personName };
  } catch (error) {
    return { success: false, pageId, personId, personName, error: error.message };
  }
}

// 배치 처리 함수
async function applyAllIdsToNotion() {
  console.log('🚀 GIA_KEY_01로 전체 152명에게 ID 적용 시작...');
  console.log(`📝 대상: ${notionData.length}명`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: [],
    processed: 0
  };

  const startTime = Date.now();

  for (let i = 0; i < notionData.length; i++) {
    const person = notionData[i];
    const pageId = person.id;
    const personName = person.properties.이름.title[0]?.plain_text || '이름없음';
    const personId = idMapping[personName];

    results.processed++;

    if (!personId) {
      console.log(`⚠️ [${i + 1}/${notionData.length}] ID를 찾을 수 없음: ${personName}`);
      results.failed++;
      results.errors.push({
        name: personName,
        personId: 'ID 없음',
        error: 'ID 매핑에서 찾을 수 없음'
      });
      continue;
    }

    // 진행률 표시 (10명마다)
    if ((i + 1) % 10 === 0 || i === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = (i + 1) / elapsed;
      const remaining = (notionData.length - i - 1) / rate;
      console.log(`\n📊 진행률: ${i + 1}/${notionData.length} (${Math.round((i + 1) / notionData.length * 100)}%)`);
      console.log(`⏱️ 경과시간: ${Math.round(elapsed)}초, 예상 남은시간: ${Math.round(remaining)}초`);
    }

    try {
      const result = await updateNotionPageWithFetch(pageId, personId, personName);
      
      if (result.success) {
        results.success++;
        if ((i + 1) % 10 === 0 || i < 5) {
          console.log(`✅ [${i + 1}] ${personName} → ${personId}`);
        }
      } else {
        console.log(`❌ [${i + 1}] ${personName} - ${result.error}`);
        results.failed++;
        results.errors.push({
          name: personName,
          personId,
          error: result.error
        });
      }
      
      // API 제한을 고려한 지연 (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.log(`❌ [${i + 1}] 예외 발생: ${personName} - ${error.message}`);
      results.failed++;
      results.errors.push({
        name: personName,
        personId,
        error: error.message
      });
    }
  }

  const totalTime = (Date.now() - startTime) / 1000;

  console.log('\n🎉 전체 ID 적용 완료!');
  console.log('\n📊 최종 결과 요약:');
  console.log(`✅ 성공: ${results.success}명`);
  console.log(`❌ 실패: ${results.failed}명`);
  console.log(`📝 처리됨: ${results.processed}명`);
  console.log(`⏱️ 총 소요시간: ${Math.round(totalTime)}초`);
  console.log(`📈 평균 처리속도: ${Math.round(results.processed / totalTime)}명/초`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ 실패 목록:');
    results.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.name} (${error.personId}): ${error.error}`);
    });
  }

  // 결과를 파일로 저장
  const resultFile = `id_application_result_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  fs.writeFileSync(resultFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 결과가 ${resultFile}에 저장되었습니다.`);

  return results;
}

// 실행
applyAllIdsToNotion()
  .then(results => {
    if (results.success > 0) {
      console.log('\n🎉 ID 시스템 구축 성공!');
      console.log('다음 단계: 노션-윈도우코어 데이터 동기화');
    } else {
      console.log('\n❌ 모든 적용이 실패했습니다.');
    }
  })
  .catch(error => {
    console.log('\n❌ 실행 오류:', error);
  });
