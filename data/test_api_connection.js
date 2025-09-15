// API 연결 테스트 스크립트
const https = require('https');

// API 키와 데이터베이스 ID
const API_KEY = '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';
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

// 데이터베이스 정보 조회 테스트
function testDatabaseAccess() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/databases/${DATABASE_ID}`,
      method: 'GET',
      headers: headers
    };

    console.log('🔍 데이터베이스 접근 테스트 중...');
    console.log('📋 데이터베이스 ID:', DATABASE_ID);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log('✅ 데이터베이스 접근 성공!');
          console.log('📊 제목:', result.title[0]?.text?.content);
          console.log('🏗️ 필드 수:', Object.keys(result.properties).length);
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

    req.end();
  });
}

// 실행
testDatabaseAccess().catch(error => {
  console.error('❌ 테스트 실패:', error.message);
});
