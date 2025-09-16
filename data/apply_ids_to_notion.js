// 노션에 생성된 ID 값 적용 (GIA_KEY_01 사용)
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// 생성된 ID 데이터 로드
let notionDataWithIds;
try {
  notionDataWithIds = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8'));
  console.log(`📊 로드된 데이터: ${notionDataWithIds.length}명`);
} catch (error) {
  console.log('❌ notion_data_with_ids.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

// 노션 페이지 업데이트 함수
function updateNotionPage(pageId, personId) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      properties: {
        "아이디": {
          rich_text: [
            {
              text: {
                content: personId
              }
            }
          ]
        }
      }
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/pages/${pageId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, pageId, personId });
        } else {
          reject({ 
            success: false, 
            pageId, 
            personId, 
            statusCode: res.statusCode, 
            error: data 
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({ success: false, pageId, personId, error: error.message });
    });

    req.write(postData);
    req.end();
  });
}

// 배치 처리 함수
async function applyIdsToNotion() {
  console.log('🚀 노션에 ID 값 적용 시작...');
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  // 처음 5명만 테스트
  const testData = notionDataWithIds.slice(0, 5);
  console.log(`📝 테스트 대상: ${testData.length}명`);

  for (let i = 0; i < testData.length; i++) {
    const person = testData[i];
    const pageId = person.id;
    const personId = person.person_id;
    const name = person.properties.이름.title[0]?.plain_text || '이름없음';

    console.log(`\n[${i + 1}/${testData.length}] ${name} (${personId}) 업데이트 중...`);

    try {
      const result = await updateNotionPage(pageId, personId);
      console.log(`✅ 성공: ${name} → ${personId}`);
      results.success++;
      
      // API 제한을 고려한 지연
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`❌ 실패: ${name} - ${error.statusCode || error.error}`);
      results.failed++;
      results.errors.push({
        name,
        personId,
        error: error.statusCode || error.error
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
applyIdsToNotion()
  .then(results => {
    if (results.success > 0) {
      console.log('\n🎉 ID 적용 테스트 성공! 전체 적용을 진행할까요?');
    } else {
      console.log('\n❌ 모든 테스트가 실패했습니다. API 설정을 확인해주세요.');
    }
  })
  .catch(error => {
    console.log('\n❌ 실행 오류:', error);
  });
