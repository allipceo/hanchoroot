// 테스트용 노션 데이터베이스 생성 스크립트
const https = require('https');

// API 키와 상위 페이지 ID
require('dotenv').config();
const API_KEY = process.env.NOTION_API_KEY;
const PARENT_PAGE_ID = '2093284156fa404a911cbefa4b422994'; // 기존 데이터베이스 ID를 상위 페이지로 사용

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Notion-Version': '2025-09-03', // 최신 버전
  'Content-Type': 'application/json'
};

// 테스트용 데이터베이스 생성
function createTestDatabase() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      parent: { 
        type: 'page_id', 
        page_id: PARENT_PAGE_ID 
      },
      title: [{ 
        type: 'text', 
        text: { content: 'API 테스트 데이터베이스' } 
      }],
      properties: {
        "아이디": { 
          rich_text: {} 
        },
        "성명": { 
          title: {} 
        },
        "생년": { 
          number: { format: 'number' } 
        }
      }
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: '/v1/databases',
      method: 'POST',
      headers: headers
    };

    console.log('🚀 테스트용 데이터베이스 생성 중...');
    console.log('📋 상위 페이지 ID:', PARENT_PAGE_ID);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ 테스트 데이터베이스 생성 성공!');
          console.log('📊 데이터베이스 ID:', result.id);
          console.log('📝 제목:', result.title[0]?.text?.content);
          console.log('🏗️ 필드 구성:');
          Object.keys(result.properties).forEach(field => {
            console.log(`   - ${field}: ${result.properties[field].type}`);
          });
          resolve(result);
        } else {
          console.error('❌ HTTP 오류:', res.statusCode);
          console.error('📄 응답:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 요청 오류:', error.message);
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// 테스트 데이터 추가
function addTestData(databaseId) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      parent: { 
        database_id: databaseId 
      },
      properties: {
        "아이디": { 
          rich_text: [{ 
            type: 'text', 
            text: { content: 'TEST001' } 
          }] 
        },
        "성명": { 
          title: [{ 
            type: 'text', 
            text: { content: '테스트사용자' } 
          }] 
        },
        "생년": { 
          number: 1990 
        }
      }
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: '/v1/pages',
      method: 'POST',
      headers: headers
    };

    console.log('\n🔄 테스트 데이터 추가 중...');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ 테스트 데이터 추가 성공!');
          console.log('📄 페이지 ID:', result.id);
          resolve(result);
        } else {
          console.error('❌ HTTP 오류:', res.statusCode);
          console.error('📄 응답:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 요청 오류:', error.message);
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// 메인 실행 함수
async function main() {
  try {
    // 1. 테스트 데이터베이스 생성
    const database = await createTestDatabase();
    
    // 2. 테스트 데이터 추가
    await addTestData(database.id);
    
    console.log('\n🎉 모든 작업 완료!');
    console.log('📊 생성된 데이터베이스 ID:', database.id);
    console.log('🔗 노션에서 확인해보세요!');
    
  } catch (error) {
    console.error('❌ 작업 실패:', error.message);
  }
}

// 실행
main();
