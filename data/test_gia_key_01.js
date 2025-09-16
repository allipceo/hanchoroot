// GIA_KEY_01 API 키로 노션 연결 테스트
const https = require('https');

require('dotenv').config();
const API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

const options = {
  hostname: 'api.notion.com',
  port: 443,
  path: `/v1/databases/${DATABASE_ID}`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  }
};

console.log('🔍 GIA_KEY_01로 노션 API 연결 테스트 중...');
console.log(`API Key: ${API_KEY.substring(0, 20)}...`);
console.log(`Database ID: ${DATABASE_ID}`);

const req = https.request(options, (res) => {
  console.log(`\n📊 응답 상태: ${res.statusCode}`);
  console.log(`📋 응답 헤더:`, res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('\n✅ API 연결 성공!');
      try {
        const response = JSON.parse(data);
        console.log('\n📋 데이터베이스 정보:');
        console.log(`제목: ${response.title[0].plain_text}`);
        console.log(`속성 수: ${Object.keys(response.properties).length}`);
        console.log('\n📝 속성 목록:');
        Object.keys(response.properties).forEach(key => {
          const prop = response.properties[key];
          console.log(`- ${key}: ${prop.type}`);
        });
      } catch (error) {
        console.log('❌ JSON 파싱 오류:', error.message);
        console.log('Raw 응답:', data);
      }
    } else {
      console.log('\n❌ API 연결 실패');
      console.log('Raw 응답:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('\n❌ 요청 오류:', error.message);
});

req.end();
