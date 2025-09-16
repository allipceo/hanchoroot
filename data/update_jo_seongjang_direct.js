// 조성장 생년 직접 업데이트 스크립트
const https = require('https');

// API 키
require('dotenv').config();
const API_KEY = process.env.NOTION_API_KEY;

// 조성장의 페이지 ID (기존 데이터에서 확인)
const PAGE_ID = '9ffa7253-b93b-430c-a43b-8c1207f270e5';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

// 조성장 생년 업데이트
function updateJoSeongJangBirth() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      properties: {
        "생년": {
          "number": 1936
        }
      }
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/pages/${PAGE_ID}`,
      method: 'PATCH',
      headers: headers
    };

    console.log('🔄 조성장 생년을 1936으로 업데이트 중...');
    console.log('📋 페이지 ID:', PAGE_ID);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ 업데이트 성공!');
          console.log('📅 새로운 생년:', result.properties.생년?.number);
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

// 실행
updateJoSeongJangBirth().catch(error => {
  console.error('❌ 업데이트 실패:', error.message);
});
