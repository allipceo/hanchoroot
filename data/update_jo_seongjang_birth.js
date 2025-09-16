// 조성장 생년 업데이트 스크립트
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

// 조성장 페이지 찾기
function findJoSeongJang() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      filter: {
        property: "이름",
        title: {
          equals: "조성장"
        }
      }
    });

    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/databases/${DATABASE_ID}/query`,
      method: 'POST',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.results && response.results.length > 0) {
            resolve(response.results[0]);
          } else {
            reject(new Error('조성장을 찾을 수 없습니다.'));
          }
        } catch (error) {
          reject(error);
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

// 조성장 생년 업데이트
function updateJoSeongJangBirth(pageId) {
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
async function updateBirthYear() {
  try {
    console.log('🔍 조성장 찾는 중...');
    
    const joSeongJang = await findJoSeongJang();
    console.log('✅ 조성장 찾음:', joSeongJang.properties.이름?.title?.[0]?.text?.content);
    console.log('📅 현재 생년:', joSeongJang.properties.생년?.number);
    console.log('🏷️ Line1:', joSeongJang.properties.Line1?.rich_text?.[0]?.text?.content);
    
    console.log('\n🔄 생년을 1936으로 업데이트 중...');
    
    const result = await updateJoSeongJangBirth(joSeongJang.id);
    console.log('✅ 업데이트 완료!');
    console.log('📅 새로운 생년:', result.properties.생년?.number);
    
  } catch (error) {
    console.error('❌ 업데이트 실패:', error.message);
  }
}

// 실행
updateBirthYear();
