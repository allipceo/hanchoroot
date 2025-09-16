// 노션 API를 통해 실제 데이터 가져오기
const { Client } = require('@notionhq/client');

// 노션 클라이언트 초기화
const notion = new Client({
<<<<<<< HEAD
  auth: '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'
=======
  auth: process.env.NOTION_API_KEY
>>>>>>> 32f8b4e3839543e088dbb97181584009f5f7d0c1
});

// 데이터베이스 ID
const databaseId = '2093284156fa404a911cbefa4b422994';

async function fetchNotionData() {
  try {
    console.log('노션 데이터베이스에서 데이터 가져오는 중...');
    
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100
    });
    
    console.log(`총 ${response.results.length}개 레코드 가져옴`);
    
    // UTF-8로 저장
    const fs = require('fs');
    fs.writeFileSync('notion_data_utf8.json', JSON.stringify(response.results, null, 2), 'utf8');
    
    console.log('notion_data_utf8.json 파일 생성 완료');
    
    // 필드명 확인
    if (response.results.length > 0) {
      const firstRecord = response.results[0];
      console.log('\n첫 번째 레코드의 필드명들:');
      console.log(Object.keys(firstRecord.properties));
    }
    
  } catch (error) {
    console.error('노션 데이터 가져오기 실패:', error);
  }
}

fetchNotionData();
