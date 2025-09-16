// 노션 API 테스트 스크립트
const https = require('https');

const headers = {
<<<<<<< HEAD
  'Authorization': 'Bearer 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',
=======
  'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
>>>>>>> 32f8b4e3839543e088dbb97181584009f5f7d0c1
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

const body = JSON.stringify({
  page_size: 100
});

const options = {
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/databases/2093284156fa404a911cbefa4b422994/query',
  method: 'POST',
  headers: headers
};

console.log('노션 API 호출 중...');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('API 응답 성공!');
      console.log(`총 ${response.results.length}명의 데이터 수신`);
      
      // 첫 번째 데이터의 Line1 필드 확인
      if (response.results.length > 0) {
        const firstPerson = response.results[0];
        console.log('\n첫 번째 데이터의 Line1 필드:');
        console.log(JSON.stringify(firstPerson.properties.Line1, null, 2));
        
        // Line1 필드가 있는지 확인
        if (firstPerson.properties.Line1) {
          console.log('✅ Line1 필드가 존재합니다!');
        } else {
          console.log('❌ Line1 필드가 없습니다!');
        }
      }
      
      // 파일로 저장
      require('fs').writeFileSync('notion_data_updated.json', JSON.stringify(response, null, 2));
      console.log('\n데이터가 notion_data_updated.json에 저장되었습니다.');
      
    } catch (error) {
      console.error('JSON 파싱 오류:', error.message);
      console.log('응답 데이터:', data.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.error('API 호출 오류:', error.message);
});

req.write(body);
req.end();
