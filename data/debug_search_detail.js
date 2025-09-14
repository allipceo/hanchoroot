// 검색 → 상세정보 디버깅 스크립트
const fs = require('fs');

console.log('=== 검색 → 상세정보 디버깅 ===\n');

try {
  // 1. 파일들 확인
  console.log('1. 파일 존재 확인:');
  const files = [
    'app/search.html',
    'js/search.js', 
    'app/detail.html',
    'js/detail.js',
    'data/core_browser.js'
  ];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file} 존재`);
    } else {
      console.log(`   ❌ ${file} 없음`);
    }
  });
  
  // 2. search.html에서 core_browser.js 로드 확인
  console.log('\n2. search.html 스크립트 로드 확인:');
  const searchHtml = fs.readFileSync('./app/search.html', 'utf8');
  if (searchHtml.includes('core_browser.js')) {
    console.log('   ✅ search.html에서 core_browser.js 로드 확인');
  } else {
    console.log('   ❌ search.html에서 core_browser.js 로드 누락');
  }
  
  // 3. detail.html에서 core_browser.js 로드 확인
  console.log('\n3. detail.html 스크립트 로드 확인:');
  const detailHtml = fs.readFileSync('./app/detail.html', 'utf8');
  if (detailHtml.includes('core_browser.js')) {
    console.log('   ✅ detail.html에서 core_browser.js 로드 확인');
  } else {
    console.log('   ❌ detail.html에서 core_browser.js 로드 누락');
  }
  
  // 4. search.js에서 CORE_DATA 접근 확인
  console.log('\n4. search.js CORE_DATA 접근 확인:');
  const searchJs = fs.readFileSync('./js/search.js', 'utf8');
  if (searchJs.includes('window.CORE_DATA')) {
    console.log('   ✅ search.js에서 window.CORE_DATA 접근 확인');
  } else {
    console.log('   ❌ search.js에서 window.CORE_DATA 접근 누락');
  }
  
  // 5. detail.js에서 CORE_DATA 접근 확인
  console.log('\n5. detail.js CORE_DATA 접근 확인:');
  const detailJs = fs.readFileSync('./js/detail.js', 'utf8');
  if (detailJs.includes('window.CORE_DATA')) {
    console.log('   ✅ detail.js에서 window.CORE_DATA 접근 확인');
  } else {
    console.log('   ❌ detail.js에서 window.CORE_DATA 접근 누락');
  }
  
  // 6. core_browser.js 파일 내용 확인
  console.log('\n6. core_browser.js 파일 내용 확인:');
  const coreBrowser = fs.readFileSync('./data/core_browser.js', 'utf8');
  if (coreBrowser.includes('window.CORE_DATA = CORE_DATA')) {
    console.log('   ✅ core_browser.js에서 window.CORE_DATA 설정 확인');
  } else {
    console.log('   ❌ core_browser.js에서 window.CORE_DATA 설정 누락');
  }
  
  // 7. 데이터 로드 확인
  console.log('\n7. 데이터 로드 확인:');
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  console.log(`   - 총 인물 수: ${data.persons.length}명`);
  console.log(`   - 검색 인덱스: ${Object.keys(data.searchIndex.byName).length}개`);
  
  // 8. 조은상 데이터 확인
  console.log('\n8. 조은상 데이터 확인:');
  const joEunSang = data.persons.find(p => p.name === '조은상');
  if (joEunSang) {
    console.log(`   ✅ 조은상 찾음: ID=${joEunSang.id}`);
    console.log(`   - 이름: ${joEunSang.name}`);
    console.log(`   - 세대: ${joEunSang.generation}세대`);
    console.log(`   - Line: ${joEunSang.line}`);
    console.log(`   - 상태: ${joEunSang.status}`);
  } else {
    console.log('   ❌ 조은상을 찾을 수 없음');
  }
  
  console.log('\n✅ 디버깅 완료');
  
} catch (error) {
  console.error('❌ 디버깅 실패:', error.message);
}
