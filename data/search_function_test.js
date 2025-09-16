// 검색 기능 JavaScript 함수 검증
const fs = require('fs');

console.log('=== 검색 기능 JavaScript 함수 검증 ===\n');

try {
  // 데이터 로드
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  
  // 검색 함수 시뮬레이션 (js/search.js의 searchByName 함수와 동일)
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
  
  console.log('1. 정확한 이름 검색 테스트:');
  const exactTests = ['조은상', '조영하', '조명하', '조세희'];
  exactTests.forEach(name => {
    const results = searchByName(name, data);
    console.log(`   - '${name}': ${results.length}명 결과`);
    if (results.length > 0) {
      const person = data.persons.find(p => p.id === results[0]);
      console.log(`     → ${person.name} (${person.generation}세대, ${person.line})`);
    }
  });
  
  console.log('\n2. 부분 검색 테스트:');
  const partialTests = ['조', '영', '명'];
  partialTests.forEach(query => {
    const results = searchByName(query, data);
    console.log(`   - '${query}' 부분 검색: ${results.length}명 결과`);
    if (results.length > 0) {
      const sampleResults = results.slice(0, 3).map(id => {
        const person = data.persons.find(p => p.id === id);
        return person ? person.name : id;
      });
      console.log(`     → 샘플: ${sampleResults.join(', ')}${results.length > 3 ? '...' : ''}`);
    }
  });
  
  console.log('\n3. 존재하지 않는 이름 검색 테스트:');
  const nonExistentTests = ['김철수', '이영희', '박민수'];
  nonExistentTests.forEach(name => {
    const results = searchByName(name, data);
    console.log(`   - '${name}': ${results.length}명 결과 (예상: 0명)`);
  });
  
  console.log('\n4. 검색 성능 테스트:');
  const startTime = Date.now();
  for (let i = 0; i < 100; i++) {
    searchByName('조', data);
  }
  const endTime = Date.now();
  console.log(`   - 100회 검색 소요 시간: ${endTime - startTime}ms`);
  console.log(`   - 평균 검색 시간: ${(endTime - startTime) / 100}ms`);
  
  console.log('\n✅ 검색 기능 JavaScript 함수 검증 완료');
  
} catch (error) {
  console.error('❌ 검색 기능 검증 실패:', error.message);
}
