// 브라우저용 core.js 파일 생성 스크립트
const fs = require('fs');

console.log('=== 브라우저용 Core Module 생성 시작 ===\n');

try {
  // 최종 데이터 파일 읽기
  console.log('1. 최종 데이터 파일 읽기...');
  const finalData = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  console.log(`✅ 데이터 로드 완료: ${finalData.persons.length}명`);

  // 브라우저용 core.js 파일 생성
  console.log('\n2. 브라우저용 core.js 파일 생성...');
  
  const coreBrowserContent = `// 한양조씨 족보앱 Core Module V3.0 - 브라우저용
// 브라우저 환경에서 직접 사용할 수 있는 데이터

// 실제 노션 데이터 (155명 완전 데이터 - 1세대 관계 수정)
const CORE_DATA = ${JSON.stringify(finalData, null, 2)};

// 브라우저용 데이터 로더 클래스
class CoreDataLoader {
  constructor() {
    this.data = CORE_DATA;
    this.loaded = false;
  }

  // 데이터 로드
  load() {
    if (!this.loaded) {
      this.loaded = true;
      console.log("Core Module 데이터 로드 완료 (브라우저용)");
    }
    return this.data;
  }

  // Person 조회
  getPerson(id) {
    return this.data.persons.find(p => p.id === id);
  }

  // 관리자 정보 조회
  getAdminInfo() {
    return this.data.config.admin;
  }

  // 앱 설정 조회
  getAppConfig() {
    return this.data.config.app;
  }

  // 검색 인덱스 조회
  getSearchIndex() {
    return this.data.searchIndex;
  }

  // 검색 히스토리 조회
  getSearchHistory() {
    return this.data.searchHistory;
  }

  // 이름으로 검색 (간결한 검색 함수)
  searchByName(query) {
    const results = [];
    const searchIndex = this.data.searchIndex;
    
    // 한글 이름 검색
    if (searchIndex.byName[query]) {
      results.push(...searchIndex.byName[query]);
    }
    
    // 한자 이름 검색
    if (searchIndex.byHanja[query]) {
      results.push(...searchIndex.byHanja[query]);
    }
    
    // 부분 검색 (간결한 구현)
    Object.keys(searchIndex.byName).forEach(name => {
      if (name.includes(query) && !results.includes(name)) {
        results.push(...searchIndex.byName[name]);
      }
    });
    
    return results;
  }

  // 검색 히스토리 추가
  addSearchHistory(query, resultCount) {
    const history = this.data.searchHistory;
    const newEntry = {
      query: query,
      timestamp: new Date().toISOString(),
      resultCount: resultCount
    };
    
    // 최신 검색을 맨 앞에 추가
    history.recent.unshift(newEntry);
    
    // 최대 히스토리 수 제한
    if (history.recent.length > history.maxHistory) {
      history.recent = history.recent.slice(0, history.maxHistory);
    }
  }
}

// 전역 인스턴스 생성
const coreLoader = new CoreDataLoader();

// 브라우저 전역 변수로 설정
window.CORE_DATA = CORE_DATA;
window.coreLoader = coreLoader;`;

  // 파일 저장
  fs.writeFileSync('./data/core_browser.js', coreBrowserContent, 'utf8');
  console.log('✅ 브라우저용 core.js 파일 생성 완료');

  // 검증
  console.log('\n3. 생성된 파일 검증...');
  const generatedData = JSON.parse(fs.readFileSync('./data/core_browser.js', 'utf8').match(/const CORE_DATA = ([\s\S]*?);/)[1]);
  console.log(`✅ 검증 완료: ${generatedData.persons.length}명, 검색인덱스: ${Object.keys(generatedData.searchIndex.byName).length}개`);

  console.log('\n🎉 브라우저용 Core Module 생성 완료!');
  console.log('📁 파일 위치: ./data/core_browser.js');
  console.log('🔧 사용법: <script src="../data/core_browser.js"></script>');

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}
