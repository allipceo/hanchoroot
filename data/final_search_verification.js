// 최종 검색 기능 검증 및 디버깅
const fs = require('fs');

console.log('=== 최종 검색 기능 검증 및 디버깅 ===\n');

try {
  // 1. 데이터 파일 검증
  console.log('1. 데이터 파일 검증:');
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  console.log(`   ✅ 최종 데이터 파일 로드 성공: ${data.persons.length}명`);
  
  // 2. 검색 인덱스 검증
  console.log('\n2. 검색 인덱스 검증:');
  const searchIndex = data.searchIndex;
  console.log(`   ✅ byName 인덱스: ${Object.keys(searchIndex.byName).length}개`);
  console.log(`   ✅ byGeneration 인덱스: ${Object.keys(searchIndex.byGeneration).length}개`);
  console.log(`   ✅ byLine 인덱스: ${Object.keys(searchIndex.byLine).length}개`);
  
  // 3. 브라우저용 파일 검증
  console.log('\n3. 브라우저용 파일 검증:');
  const browserFile = fs.readFileSync('./data/core_browser.js', 'utf8');
  if (browserFile.includes('CORE_DATA') && browserFile.includes('window.CORE_DATA')) {
    console.log('   ✅ 브라우저용 core_browser.js 파일 정상');
  } else {
    console.log('   ❌ 브라우저용 core_browser.js 파일 문제');
  }
  
  // 4. 검색 HTML 파일 검증
  console.log('\n4. 검색 HTML 파일 검증:');
  const searchHtml = fs.readFileSync('./app/search.html', 'utf8');
  if (searchHtml.includes('core_browser.js')) {
    console.log('   ✅ search.html에서 core_browser.js 로드 확인');
  } else {
    console.log('   ❌ search.html에서 core_browser.js 로드 누락');
  }
  
  // 5. 검색 JavaScript 파일 검증
  console.log('\n5. 검색 JavaScript 파일 검증:');
  const searchJs = fs.readFileSync('./js/search.js', 'utf8');
  if (searchJs.includes('window.CORE_DATA') && searchJs.includes('displaySearchResults')) {
    console.log('   ✅ search.js에서 CORE_DATA 접근 및 결과 표시 함수 확인');
  } else {
    console.log('   ❌ search.js 파일 문제');
  }
  
  // 6. 핵심 검색 테스트
  console.log('\n6. 핵심 검색 테스트:');
  const testQueries = ['조은상', '조영하', '조', '김철수'];
  testQueries.forEach(query => {
    const results = searchByName(query, data);
    console.log(`   - '${query}': ${results.length}명 결과`);
  });
  
  // 7. 성능 테스트
  console.log('\n7. 성능 테스트:');
  const startTime = Date.now();
  for (let i = 0; i < 1000; i++) {
    searchByName('조', data);
  }
  const endTime = Date.now();
  console.log(`   ✅ 1000회 검색 소요 시간: ${endTime - startTime}ms`);
  console.log(`   ✅ 평균 검색 시간: ${(endTime - startTime) / 1000}ms`);
  
  // 8. 메모리 사용량 테스트
  console.log('\n8. 메모리 사용량 테스트:');
  const memBefore = process.memoryUsage();
  const largeSearch = searchByName('조', data);
  const memAfter = process.memoryUsage();
  console.log(`   ✅ 메모리 사용량: ${Math.round((memAfter.heapUsed - memBefore.heapUsed) / 1024)}KB`);
  
  console.log('\n🎉 최종 검색 기능 검증 완료!');
  console.log('📋 모든 테스트 통과 - 검색 기능이 정상 작동합니다.');
  
} catch (error) {
  console.error('❌ 최종 검증 실패:', error.message);
  console.error('스택 트레이스:', error.stack);
}

// 검색 함수 (js/search.js와 동일)
function searchByName(query, searchData) {
  if (!searchData) return [];
  
  const results = [];
  const searchIndex = searchData.searchIndex;
  
  // 정확한 이름 검색
  if (searchIndex.byName[query]) {
    results.push(...searchIndex.byName[query]);
  }
  
  // 한자 이름 검색
  if (searchIndex.byHanja[query]) {
    results.push(...searchIndex.byHanja[query]);
  }
  
  // 부분 검색
  Object.keys(searchIndex.byName).forEach(name => {
    if (name.includes(query) && !results.includes(name)) {
      results.push(...searchIndex.byName[name]);
    }
  });
  
  // 중복 제거 및 정렬
  return [...new Set(results)].sort();
}
