// 한양조씨 족보앱 Core Module V4.0
// 단일 소스 원칙: window.CORE_DATA만 사용
// 042번 데이터 소스 관리방안 기반 구현

// V4.0: JSON 파일 의존성 제거, window.CORE_DATA 직접 사용
// 이 파일은 이제 브라우저용 core_browser.js를 참조합니다

// 데이터 로딩 함수 (V4.0 - window.CORE_DATA 표준)
class CoreDataLoader {
  constructor() {
    this.data = null;
    this.loaded = false;
  }

  // 데이터 로드 (window.CORE_DATA 사용)
  load() {
    if (!this.loaded) {
      if (typeof window !== 'undefined' && window.CORE_DATA) {
        this.data = window.CORE_DATA;
        console.log('Core 데이터 로드 (V4.0 - window.CORE_DATA):', this.data);
        this.loaded = true;
      } else {
        console.error('window.CORE_DATA가 로드되지 않았습니다. core_browser.js를 먼저 로드하세요.');
      }
    }
    return this.data;
  }

  // Person 조회
  getPerson(id) {
    if (!this.data) this.load();
    return this.data?.persons?.find(p => p.id === id);
  }

  // 관리자 정보 조회
  getAdminInfo() {
    if (!this.data) this.load();
    return this.data?.config?.admin;
  }

  // 앱 설정 조회
  getAppConfig() {
    if (!this.data) this.load();
    return this.data?.config?.app;
  }

  // 검색 인덱스 조회
  getSearchIndex() {
    if (!this.data) this.load();
    return this.data?.searchIndex;
  }

  // 이름으로 검색 (V4.0 - window.CORE_DATA 표준)
  searchByName(query) {
    if (!this.data) this.load();
    const results = [];
    const searchIndex = this.data?.searchIndex;
    
    if (!searchIndex) return results;
    
    // 한글 이름 검색
    if (searchIndex.byName[query]) {
      results.push(...searchIndex.byName[query]);
    }
    
    // 부분 검색
    Object.keys(searchIndex.byName).forEach(name => {
      if (name.includes(query) && !results.includes(name)) {
        results.push(...searchIndex.byName[name]);
      }
    });
    
    return results;
  }
}

// 전역 인스턴스 생성
const coreLoader = new CoreDataLoader();

// 모듈 내보내기 (Node.js 환경 대응)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CoreDataLoader, coreLoader };
}