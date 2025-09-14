// 검색 기능 시뮬레이션 테스트
const fs = require('fs');

console.log('=== 검색 기능 시뮬레이션 테스트 ===\n');

try {
  // 데이터 로드
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  
  console.log('1. 데이터 로드 확인:');
  console.log(`   - 총 인물 수: ${data.persons.length}명`);
  console.log(`   - 검색 인덱스 byName: ${Object.keys(data.searchIndex.byName).length}개`);
  console.log(`   - 검색 인덱스 byGeneration: ${Object.keys(data.searchIndex.byGeneration).length}개`);
  console.log(`   - 검색 인덱스 byLine: ${Object.keys(data.searchIndex.byLine).length}개`);
  
  console.log('\n2. 검색 테스트:');
  const testNames = ['조은상', '조영하', '조명하', '조세희', '한지영', '박초희'];
  testNames.forEach(name => {
    const results = data.searchIndex.byName[name] || [];
    console.log(`   - '${name}' 검색: ${results.length}명 결과`);
    if (results.length > 0) {
      console.log(`     → ID: ${results[0]}`);
    }
  });
  
  console.log('\n3. 부분 검색 테스트:');
  const partialResults = Object.keys(data.searchIndex.byName).filter(name => name.includes('조'));
  console.log(`   - '조' 부분 검색: ${partialResults.length}명 결과`);
  console.log(`   - 결과: ${partialResults.slice(0, 5).join(', ')}${partialResults.length > 5 ? '...' : ''}`);
  
  console.log('\n4. 세대별 검색 테스트:');
  Object.keys(data.searchIndex.byGeneration).forEach(gen => {
    const count = data.searchIndex.byGeneration[gen].length;
    console.log(`   - ${gen}세대: ${count}명`);
  });
  
  console.log('\n5. Line별 검색 테스트:');
  Object.keys(data.searchIndex.byLine).forEach(line => {
    const count = data.searchIndex.byLine[line].length;
    console.log(`   - ${line}: ${count}명`);
  });
  
  console.log('\n✅ 시뮬레이션 테스트 완료');
  
} catch (error) {
  console.error('❌ 시뮬레이션 테스트 실패:', error.message);
}
