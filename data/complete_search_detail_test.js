// 검색 → 상세정보 완전 통합 테스트
const fs = require('fs');

console.log('=== 검색 → 상세정보 완전 통합 테스트 ===\n');

try {
  // 데이터 로드
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  
  console.log('1. 데이터 로드 확인:');
  console.log(`   - 총 인물 수: ${data.persons.length}명`);
  console.log(`   - 검색 인덱스: ${Object.keys(data.searchIndex.byName).length}개`);
  
  console.log('\n2. 검색 → 상세정보 연결 테스트:');
  
  // 테스트할 인물들
  const testPersons = ['조은상', '조영하', '조명하', '조세희', '한지영'];
  
  testPersons.forEach(name => {
    console.log(`\n   📋 ${name} 테스트:`);
    
    // 1. 검색 테스트
    const searchResults = searchByName(name, data);
    console.log(`      - 검색 결과: ${searchResults.length}명`);
    
    if (searchResults.length > 0) {
      const personId = searchResults[0];
      const person = data.persons.find(p => p.id === personId);
      
      if (person) {
        console.log(`      - 인물 정보: ${person.name} (${person.generation}세대, ${person.line})`);
        
        // 2. 상세정보 URL 생성 테스트
        const detailUrl = `detail.html?id=${personId}`;
        console.log(`      - 상세정보 URL: ${detailUrl}`);
        
        // 3. 상세정보 데이터 검증
        console.log(`      - 상세정보 데이터:`);
        console.log(`        * ID: ${person.id}`);
        console.log(`        * 이름: ${person.name}`);
        console.log(`        * 세대: ${person.generation}세대`);
        console.log(`        * Line: ${person.line}`);
        console.log(`        * 성별: ${person.gender}`);
        console.log(`        * 상태: ${person.status}`);
        console.log(`        * 생년월일: ${person.birthDate || '미상'}`);
        console.log(`        * 부모: ${person.relationships?.father || '미상'}, ${person.relationships?.mother || '미상'}`);
        console.log(`        * 배우자: ${person.relationships?.spouses?.join(', ') || '없음'}`);
        console.log(`        * 자녀: ${person.relationships?.children?.join(', ') || '없음'}`);
        
        console.log(`      ✅ ${name} 검색 → 상세정보 연결 성공`);
      } else {
        console.log(`      ❌ ${name} 인물 정보를 찾을 수 없음`);
      }
    } else {
      console.log(`      ❌ ${name} 검색 결과 없음`);
    }
  });
  
  console.log('\n3. 부분 검색 테스트:');
  const partialQueries = ['조', '영', '명'];
  partialQueries.forEach(query => {
    const results = searchByName(query, data);
    console.log(`   - '${query}' 부분 검색: ${results.length}명 결과`);
    
    if (results.length > 0) {
      const sampleResults = results.slice(0, 3).map(id => {
        const person = data.persons.find(p => p.id === id);
        return person ? `${person.name} (${person.generation}세대, ${person.line})` : id;
      });
      console.log(`     → 샘플: ${sampleResults.join(', ')}${results.length > 3 ? '...' : ''}`);
    }
  });
  
  console.log('\n4. 성능 테스트:');
  const startTime = Date.now();
  for (let i = 0; i < 100; i++) {
    searchByName('조', data);
  }
  const endTime = Date.now();
  console.log(`   - 100회 검색 소요 시간: ${endTime - startTime}ms`);
  console.log(`   - 평균 검색 시간: ${(endTime - startTime) / 100}ms`);
  
  console.log('\n✅ 검색 → 상세정보 완전 통합 테스트 완료');
  
} catch (error) {
  console.error('❌ 통합 테스트 실패:', error.message);
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
