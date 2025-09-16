// 노션 데이터베이스에 ID 값 업데이트 스크립트
const https = require('https');

// API 키와 데이터베이스 ID
require('dotenv').config();
const API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

// ID가 포함된 데이터 로드
function loadIdData() {
  try {
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('./notion_data_with_ids.json', 'utf8'));
    console.log(`📊 ID 데이터 로드 완료: ${data.length}명`);
    return data;
  } catch (error) {
    console.error('❌ ID 데이터 로드 실패:', error.message);
    return null;
  }
}

// 노션 페이지 ID 매핑 데이터 로드
function loadNotionPageMapping() {
  try {
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('./notion_data_complete.json', 'utf8'));
    console.log(`📊 노션 페이지 매핑 로드 완료: ${data.results.length}개`);
    return data.results;
  } catch (error) {
    console.error('❌ 노션 페이지 매핑 로드 실패:', error.message);
    return null;
  }
}

// 이름으로 노션 페이지 찾기
function findNotionPageByName(notionPages, targetName) {
  return notionPages.find(page => {
    const pageName = page.properties.이름?.title?.[0]?.text?.content || '';
    return pageName === targetName;
  });
}

// 노션 페이지 ID 필드 업데이트
function updateNotionPageId(pageId, personId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      properties: {
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
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/pages/${pageId}`,
      method: 'PATCH',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// 메인 실행 함수
async function updateAllIds() {
  console.log('🚀 노션 ID 업데이트 시작...\n');

  // 데이터 로드
  const idData = loadIdData();
  const notionPages = loadNotionPageMapping();

  if (!idData || !notionPages) {
    console.error('❌ 데이터 로드 실패로 작업 중단');
    return;
  }

  let successCount = 0;
  let failCount = 0;
  const failedUpdates = [];

  console.log(`📋 총 ${idData.length}명의 ID 업데이트 시작...\n`);

  // 배치 처리 (100개씩)
  const batchSize = 100;
  for (let i = 0; i < idData.length; i += batchSize) {
    const batch = idData.slice(i, i + batchSize);
    console.log(`\n📦 배치 ${Math.floor(i/batchSize) + 1} 처리 중... (${i + 1}-${Math.min(i + batchSize, idData.length)})`);

    // 병렬 처리 (동시에 5개씩)
    const promises = batch.map(async (person, index) => {
      const globalIndex = i + index + 1;
      const name = person.name;
      const personId = person.id;

      try {
        // 노션 페이지 찾기
        const notionPage = findNotionPageByName(notionPages, name);
        
        if (!notionPage) {
          console.log(`⚠️  ${globalIndex}. ${name} → 노션 페이지를 찾을 수 없음`);
          failedUpdates.push({ name, reason: '노션 페이지 없음' });
          failCount++;
          return;
        }

        // ID 업데이트
        await updateNotionPageId(notionPage.id, personId);
        console.log(`✅ ${globalIndex}. ${name} → ${personId}`);
        successCount++;

      } catch (error) {
        console.log(`❌ ${globalIndex}. ${name} → 업데이트 실패: ${error.message}`);
        failedUpdates.push({ name, reason: error.message });
        failCount++;
      }
    });

    // 배치 완료 대기
    await Promise.all(promises);
    
    // 배치 간 잠시 대기 (API 제한 방지)
    if (i + batchSize < idData.length) {
      console.log('⏳ API 제한 방지를 위해 2초 대기...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // 최종 결과 출력
  console.log('\n' + '='.repeat(50));
  console.log('📊 ID 업데이트 완료 결과');
  console.log('='.repeat(50));
  console.log(`✅ 성공: ${successCount}명`);
  console.log(`❌ 실패: ${failCount}명`);
  console.log(`📈 성공률: ${((successCount / idData.length) * 100).toFixed(1)}%`);

  if (failedUpdates.length > 0) {
    console.log('\n❌ 실패한 업데이트 목록:');
    failedUpdates.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - ${item.reason}`);
    });
  }

  console.log('\n🎉 ID 업데이트 작업 완료!');
}

// 실행
updateAllIds().catch(error => {
  console.error('❌ 전체 작업 실패:', error.message);
});
