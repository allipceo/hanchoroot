// 검색 인덱스 생성 및 수정 스크립트
const fs = require('fs');

console.log('=== 검색 인덱스 생성 및 수정 시작 ===\n');

try {
  // 최종 데이터 파일 읽기
  console.log('1. 최종 데이터 파일 읽기...');
  const data = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  console.log(`✅ 데이터 로드 완료: ${data.persons.length}명`);

  // 검색 인덱스 생성
  console.log('\n2. 검색 인덱스 생성...');
  
  const searchIndex = {
    byName: {},
    byHanja: {},
    byGeneration: {},
    byLine: {},
    byGender: {},
    byStatus: {}
  };

  // 각 인물에 대해 인덱스 생성
  data.persons.forEach(person => {
    const { name, generation, line, gender, status } = person;
    
    // 이름 인덱스 (한글)
    if (name) {
      if (!searchIndex.byName[name]) {
        searchIndex.byName[name] = [];
      }
      searchIndex.byName[name].push(person.id);
    }
    
    // 세대 인덱스
    if (generation) {
      if (!searchIndex.byGeneration[generation]) {
        searchIndex.byGeneration[generation] = [];
      }
      searchIndex.byGeneration[generation].push(person.id);
    }
    
    // Line 인덱스
    if (line) {
      if (!searchIndex.byLine[line]) {
        searchIndex.byLine[line] = [];
      }
      searchIndex.byLine[line].push(person.id);
    }
    
    // 성별 인덱스
    if (gender) {
      if (!searchIndex.byGender[gender]) {
        searchIndex.byGender[gender] = [];
      }
      searchIndex.byGender[gender].push(person.id);
    }
    
    // 상태 인덱스
    if (status) {
      if (!searchIndex.byStatus[status]) {
        searchIndex.byStatus[status] = [];
      }
      searchIndex.byStatus[status].push(person.id);
    }
  });

  // 검색 인덱스를 데이터에 추가
  data.searchIndex = searchIndex;
  
  console.log(`✅ 검색 인덱스 생성 완료:`);
  console.log(`   - byName: ${Object.keys(searchIndex.byName).length}개`);
  console.log(`   - byGeneration: ${Object.keys(searchIndex.byGeneration).length}개`);
  console.log(`   - byLine: ${Object.keys(searchIndex.byLine).length}개`);
  console.log(`   - byGender: ${Object.keys(searchIndex.byGender).length}개`);
  console.log(`   - byStatus: ${Object.keys(searchIndex.byStatus).length}개`);

  // 수정된 데이터 저장
  console.log('\n3. 수정된 데이터 저장...');
  fs.writeFileSync('./converted_complete_data_final.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ 수정된 데이터 저장 완료');

  // 브라우저용 core.js 재생성
  console.log('\n4. 브라우저용 core.js 재생성...');
  const coreBrowserContent = `// 한양조씨 족보앱 Core Module V3.0 - 브라우저용
// 브라우저 환경에서 직접 사용할 수 있는 데이터

// 실제 노션 데이터 (155명 완전 데이터 - 검색 인덱스 포함)
const CORE_DATA = ${JSON.stringify(data, null, 2)};

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

  fs.writeFileSync('./data/core_browser.js', coreBrowserContent, 'utf8');
  console.log('✅ 브라우저용 core.js 재생성 완료');

  // 검증
  console.log('\n5. 검증...');
  const testData = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));
  console.log(`✅ 검증 완료: ${testData.persons.length}명, 검색인덱스: ${Object.keys(testData.searchIndex.byName).length}개`);

  console.log('\n🎉 검색 인덱스 생성 및 수정 완료!');
  console.log('📁 수정된 파일: ./converted_complete_data_final.json');
  console.log('📁 브라우저용 파일: ./data/core_browser.js');

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}
