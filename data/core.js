// 한양조씨 족보앱 Core Module V3.0
// 019번 데이터 스키마 기반 구현

// 실제 노션 데이터 로드 (완벽한 일치 버전)
const fs = require('fs');
const notionData = JSON.parse(fs.readFileSync('./perfect_converted_data.json', 'utf8'));

const CORE_DATA = {
  // Person 데이터 (실제 노션 데이터 100명) - 3-3단계 통합
  persons: notionData.persons,

  // SearchIndex (실제 노션 데이터 기반) - 3-3단계 통합
  searchIndex: notionData.searchIndex,

  // SearchHistory (검색 히스토리) - 3-3단계 통합
  searchHistory: notionData.searchHistory,

  // Config (앱 설정) - 3-3단계 통합
  config: notionData.config
};

// 데이터 로딩 함수 (Lego Block 방식)
class CoreDataLoader {
  constructor() {
    this.data = CORE_DATA;
    this.loaded = false;
  }

  // 데이터 로드
  load() {
    if (!this.loaded) {
      this.loaded = true;
      console.log("Core Module 데이터 로드 완료");
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

// 모듈 내보내기 (Node.js 환경 대응)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CORE_DATA, CoreDataLoader, coreLoader };
}
