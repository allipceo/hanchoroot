// 검색 기능 JavaScript - 2단계
// 1단계 app.js와 연동하여 간결하고 재활용 가능한 코드 작성

// 검색 관련 전역 변수
let searchData = null;
let currentSearchResults = [];

// 전역 함수 정의
window.goBack = function() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../index.html';
    }
};

window.goHome = function() {
    window.location.href = '../index.html';
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initSearchPage();
});

// 검색 페이지 초기화
function initSearchPage() {
  console.log("검색 페이지 초기화");
  
  // 데이터 로드
  loadSearchData();
  
  // 이벤트 리스너 설정
  setupSearchEventListeners();
  
  // 검색 히스토리 표시
  displaySearchHistory();
  
  // 앱 버전 정보 표시
  displayAppVersion();
}

// 검색 데이터 로드 (1단계 Core Module 재활용)
function loadSearchData() {
  searchData = window.CORE_DATA || CORE_DATA;
  console.log("검색 데이터 로드 완료:", searchData);
  
  // 배열인지 객체인지 확인
  if (Array.isArray(searchData)) {
    console.log("배열 형태 데이터, 인원 수:", searchData.length);
  } else {
    console.log("객체 형태 데이터, 인원 수:", searchData?.persons?.length);
  console.log("Search index:", searchData?.searchIndex);
  }
}

// 검색 이벤트 리스너 설정
function setupSearchEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  // 검색 입력 이벤트
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('keypress', handleSearchKeypress);
  
  // 검색 버튼 클릭
  searchBtn.addEventListener('click', performSearch);
  
  // 검색 제안 클릭
  document.addEventListener('click', handleSuggestionClick);
}

// 검색 입력 처리 (간결한 구현)
function handleSearchInput(event) {
  const query = event.target.value.trim();
  
  if (query.length >= 2) {
    showSearchSuggestions(query);
  } else {
    hideSearchSuggestions();
  }
}

// 검색 키 입력 처리
function handleSearchKeypress(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}

// 검색 실행 (핵심 함수)
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();
  
  if (!query) {
    alert('검색할 이름을 입력해주세요.');
    return;
  }
  
  console.log("검색 실행:", query);
  
  // 검색 결과 가져오기
  const results = searchByName(query);
  
  // 검색 히스토리 추가
  addToSearchHistory(query, results.length);
  
  // 결과 표시
  displaySearchResults(query, results);
  
  // 검색 제안 숨기기
  hideSearchSuggestions();
}

// 이름으로 검색 (배열 기반 검색)
function searchByName(query) {
  if (!searchData) return [];
  
  console.log("검색 실행:", query, "데이터 타입:", Array.isArray(searchData) ? "배열" : "객체");
  
  let persons = [];
  
  // 데이터 구조에 따라 persons 배열 가져오기
  if (Array.isArray(searchData)) {
    persons = searchData;
  } else if (searchData.persons) {
    persons = searchData.persons;
  } else {
    console.error("올바른 데이터 구조를 찾을 수 없습니다.");
    return [];
  }
  
  const results = [];
  const queryLower = query.toLowerCase().trim();
  
  // 이름으로 검색
  persons.forEach(person => {
    if (!person || !person.name) return;
    
    const name = person.name.toLowerCase().trim();
    const displayName = (person.displayName || '').toLowerCase().trim();
    
    // 정확한 매치 또는 부분 매치
    if (name.includes(queryLower) || displayName.includes(queryLower)) {
      results.push(person.id);
    }
  });
  
  console.log(`검색 결과: ${results.length}개 찾음`);
  
  // 중복 제거
  return [...new Set(results)];
}

// 검색 결과 표시
function displaySearchResults(query, results) {
  const resultsSection = document.getElementById('resultsSection');
  const emptyResults = document.getElementById('emptyResults');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsCount = document.getElementById('resultsCount');
  const resultsList = document.getElementById('resultsList');
  
  // 결과 개수 업데이트
  resultsCount.textContent = `${results.length}명`;
  resultsTitle.textContent = `"${query}" 검색 결과`;
  
  if (results.length === 0) {
    // 빈 결과 표시
    resultsSection.style.display = 'none';
    emptyResults.style.display = 'block';
  } else {
    // 결과 목록 표시
    emptyResults.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // 결과 아이템 렌더링
    resultsList.innerHTML = results.map(personId => 
      createResultItem(personId, query)
    ).join('');
  }
  
  // 현재 검색 결과 저장
  currentSearchResults = results;
}

// 결과 아이템 생성 (간결한 HTML 생성)
function createResultItem(personId, query) {
  const person = getPersonById(personId);
  if (!person) return '';
  
  const statusClass = person.생존상태 === '생존' ? 'living' : 'deceased';
  const statusText = person.생존상태 === '생존' ? '생존' : '고인';
  
  return `
    <div class="result-item" onclick="showPersonDetail('${personId}')">
      <div class="result-item-header">
        <div class="result-name">${person.name} ${/-M-/.test(person.id||person.ID||person['아이디']||'')?'(M)':(/-F-/.test(person.id||person.ID||person['아이디']||'')?'(F)':'')}</div>
        <div class="result-status ${statusClass}">${statusText}</div>
      </div>
      <div class="result-info">
        <span>${person.성별 || (/-M-/.test(person.id||person.ID||person['아이디']||'')?'M':(/-F-/.test(person.id||person.ID||person['아이디']||'')?'F':''))}</span>
        <span>👤 ${person.id ? person.id.split('-')[1]?.substring(1) || person.세대 : person.세대}세대</span>
        <span>🏠 ${person.Line1}</span>
        <span>📅 ${person.생년 || '미상'}</span>
      </div>
      <div class="result-actions">
        <button onclick="event.stopPropagation(); showPersonDetail('${personId}')">상세보기</button>
        
      </div>
    </div>
  `;
}

// 검색 제안 표시
function showSearchSuggestions(query) {
  const suggestions = getSearchSuggestions(query);
  const suggestionsContainer = document.getElementById('searchSuggestions');
  
  if (suggestions.length === 0) {
    hideSearchSuggestions();
    return;
  }
  
  suggestionsContainer.innerHTML = suggestions.map(suggestion => 
    `<div class="suggestion-item" data-query="${suggestion}">${suggestion}</div>`
  ).join('');
  
  suggestionsContainer.style.display = 'block';
}

// 검색 제안 가져오기 (배열 기반)
function getSearchSuggestions(query) {
  if (!searchData) return [];
  
  let persons = [];
  
  // 데이터 구조에 따라 persons 배열 가져오기
  if (Array.isArray(searchData)) {
    persons = searchData;
  } else if (searchData.persons) {
    persons = searchData.persons;
  } else {
    return [];
  }
  
  const suggestions = [];
  const queryLower = query.toLowerCase().trim();
  const nameSet = new Set();
  
  // 이름으로 제안 생성
  persons.forEach(person => {
    if (!person || !person.name) return;
    
    const name = person.name.trim();
    const nameLower = name.toLowerCase();
    
    // 부분 매치되는 이름들 수집
    if (nameLower.includes(queryLower) && !nameSet.has(name) && suggestions.length < 5) {
      nameSet.add(name);
      suggestions.push(name);
    }
  });
  
  return suggestions; // 최대 5개 제한은 위에서 처리됨
}

// 검색 제안 숨기기
function hideSearchSuggestions() {
  const suggestionsContainer = document.getElementById('searchSuggestions');
  suggestionsContainer.style.display = 'none';
}

// 검색 제안 클릭 처리
function handleSuggestionClick(event) {
  if (event.target.classList.contains('suggestion-item')) {
    const query = event.target.dataset.query;
    document.getElementById('searchInput').value = query;
    performSearch();
  }
}

// 검색 히스토리 표시
function displaySearchHistory() {
  const historyList = document.getElementById('historyList');
  // 조대표님 로직 - 간단하게 로컬 스토리지에서 가져오기
  const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  
  if (history.length === 0) {
    historyList.innerHTML = '<p style="color: #999; font-style: italic;">최근 검색 기록이 없습니다.</p>';
    return;
  }
  
  historyList.innerHTML = history.map(item => 
    `<div class="history-item" onclick="searchFromHistory('${item.query}')">${item.query}</div>`
  ).join('');
}

// 히스토리에서 검색
function searchFromHistory(query) {
  document.getElementById('searchInput').value = query;
  performSearch();
}

// 검색 히스토리 추가 (조대표님 로직 - 간단하게)
function addToSearchHistory(query, resultCount) {
  // 간단한 로컬 스토리지 사용
  let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  
  // 중복 제거
  history = history.filter(item => item.query !== query);
  
  // 새 항목 추가
  history.unshift({
    query: query,
    timestamp: new Date().toISOString(),
    resultCount: resultCount
  });
  
  // 최대 10개만 저장
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  
  // 로컬 스토리지에 저장
  localStorage.setItem('searchHistory', JSON.stringify(history));
  
  // 히스토리 다시 표시
  displaySearchHistory();
}

// 앱 버전 정보 표시 (1단계 재활용)
function displayAppVersion() {
  const appVersion = document.getElementById('app-version');
  const dataVersion = document.getElementById('data-version');
  
  if (appVersion && dataVersion && searchData) {
    appVersion.textContent = searchData.config.version || "1.0";
    dataVersion.textContent = searchData.config.lastUpdated || "Unknown";
  }
}

// 유틸리티 함수들 (간결한 구현)
function getPersonById(id) {
  const data = searchData || window.CORE_DATA;
  // 최신 동기화된 데이터 구조 사용 (window.CORE_DATA는 배열)
  if (Array.isArray(data)) return data.find(p => p.id === id);
  // 구버전 호환성을 위한 fallback
  return data?.persons?.find(p => p.id === id);
}

function showPersonDetail(personId) {
  window.location.href = `detail.html?id=${personId}`;
}

// 촌수 계산 기능 제거됨

function goBack() {
  window.location.href = 'index.html';
}
