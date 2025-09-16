// JavaScript fetch() API를 사용한 노션 ID 적용 (자문 내용 적용)
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// 원본 노션 데이터 로드 (notion_data_complete.json)
let notionData;
try {
  const rawData = JSON.parse(fs.readFileSync('notion_data_complete.json', 'utf8'));
  notionData = rawData.results; // results 배열 추출
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

// Node.js에서 fetch() 사용을 위한 polyfill
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// 배치 처리 함수
async function applyIdsToNotionWithFetch() {
  console.log('🚀 fetch() API로 노션에 ID 값 적용 시작...');
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  // 처음 3명만 테스트
  const testData = notionData.slice(0, 3);
  console.log(`📝 테스트 대상: ${testData.length}명`);

  for (let i = 0; i < testData.length; i++) {
    const person = testData[i];
    const pageId = person.id;
    const personName = person.properties.이름.title[0]?.plain_text || '이름없음';
    const personId = idMapping[personName];

    if (!personId) {
      console.log(`⚠️ ID를 찾을 수 없음: ${personName}`);
      results.failed++;
      results.errors.push({
        name: personName,
        personId: 'ID 없음',
        error: 'ID 매핑에서 찾을 수 없음'
      });
      continue;
    }

    console.log(`\n[${i + 1}/${testData.length}] ${personName} (${personId}) 업데이트 중...`);

    try {
      const result = await updateNotionPageWithFetch(pageId, personId, personName);
      
      if (result.success) {
        console.log(`✅ 성공: ${personName} → ${personId}`);
        results.success++;
      } else {
        console.log(`❌ 실패: ${personName} - ${result.error}`);
        results.failed++;
        results.errors.push({
          name: personName,
          personId,
          error: result.error
        });
      }
      
      // API 제한을 고려한 지연
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.log(`❌ 예외 발생: ${personName} - ${error.message}`);
      results.failed++;
      results.errors.push({
        name: personName,
        personId,
        error: error.message
      });
    }
  }

  console.log('\n📊 결과 요약:');
  console.log(`✅ 성공: ${results.success}명`);
  console.log(`❌ 실패: ${results.failed}명`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ 실패 목록:');
    results.errors.forEach(error => {
      console.log(`- ${error.name} (${error.personId}): ${error.error}`);
    });
  }

  return results;
}

// 실행
applyIdsToNotionWithFetch()
  .then(results => {
    if (results.success > 0) {
      console.log('\n🎉 fetch() API로 ID 적용 테스트 성공!');
      console.log('전체 적용을 진행할까요?');
    } else {
      console.log('\n❌ 모든 테스트가 실패했습니다.');
    }
  })
  .catch(error => {
    console.log('\n❌ 실행 오류:', error);
  });
