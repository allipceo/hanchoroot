// 완전한 노션 데이터 추출 스크립트
// 모든 데이터를 확실히 가져오기

const https = require('https');

const headers = {
  'Authorization': 'Bearer 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',
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

// 모든 데이터를 가져오는 함수 (페이지네이션 처리)
function fetchAllNotionData() {
  return new Promise((resolve, reject) => {
    let allResults = [];
    let hasMore = true;
    let nextCursor = null;
    
    function fetchPage(cursor) {
      const body = JSON.stringify({
        page_size: 100,
        ...(cursor && { start_cursor: cursor })
      });
      
      const options = {
        hostname: 'api.notion.com',
        port: 443,
        path: '/v1/databases/2093284156fa404a911cbefa4b422994/query',
        method: 'POST',
        headers: headers
      };
      
      console.log(`페이지 ${cursor ? '2' : '1'} 데이터 요청 중...`);
      
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            allResults = allResults.concat(response.results);
            
            console.log(`페이지 ${cursor ? '2' : '1'} 완료: ${response.results.length}개 데이터 수신`);
            console.log(`누적 데이터: ${allResults.length}개`);
            
            if (response.has_more) {
              fetchPage(response.next_cursor);
            } else {
              console.log(`\n전체 데이터 수신 완료: ${allResults.length}개`);
              resolve(allResults);
            }
          } catch (error) {
            console.error('JSON 파싱 오류:', error.message);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('API 호출 오류:', error.message);
        reject(error);
      });
      
      req.write(body);
      req.end();
    }
    
    fetchPage(null);
  });
}

// 메인 실행 함수
async function main() {
  try {
    console.log('=== 완전한 노션 데이터 추출 시작 ===\n');
    
    const allData = await fetchAllNotionData();
    
    // 세대별 분포 확인
    const genStats = {};
    allData.forEach(person => {
      const gen = person.properties.세대?.select?.name || 'null';
      genStats[gen] = (genStats[gen] || 0) + 1;
    });
    
    console.log('\n=== 세대별 분포 ===');
    Object.entries(genStats).forEach(([gen, count]) => {
      console.log(`${gen}: ${count}명`);
    });
    
    // Line별 분포 확인
    const lineStats = {};
    allData.forEach(person => {
      const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
      lineStats[line] = (lineStats[line] || 0) + 1;
    });
    
    console.log('\n=== Line별 분포 ===');
    Object.entries(lineStats).forEach(([line, count]) => {
      console.log(`${line}: ${count}명`);
    });
    
    // 1세대 명단 확인
    console.log('\n=== 1세대 명단 ===');
    const firstGen = allData.filter(person => person.properties.세대?.select?.name === '1세대');
    
    if (firstGen.length > 0) {
      console.log(`1세대 인물 수: ${firstGen.length}명\n`);
      firstGen.forEach((person, i) => {
        const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
        const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
        const gender = person.properties.성별?.select?.name || 'M';
        console.log(`${i+1}. ${name} (Line: ${line}, 성별: ${gender})`);
      });
    } else {
      console.log('1세대 데이터가 없습니다.');
    }
    
    // 2세대 명단 확인
    console.log('\n=== 2세대 명단 ===');
    const secondGen = allData.filter(person => person.properties.세대?.select?.name === '2세대');
    
    if (secondGen.length > 0) {
      console.log(`2세대 인물 수: ${secondGen.length}명\n`);
      secondGen.forEach((person, i) => {
        const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
        const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
        const gender = person.properties.성별?.select?.name || 'M';
        console.log(`${i+1}. ${name} (Line: ${line}, 성별: ${gender})`);
      });
    } else {
      console.log('2세대 데이터가 없습니다.');
    }
    
    // 전체 데이터 저장
    const response = {
      results: allData,
      has_more: false,
      next_cursor: null
    };
    
    require('fs').writeFileSync('notion_data_complete.json', JSON.stringify(response, null, 2));
    console.log('\n전체 데이터가 notion_data_complete.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
}

main();
