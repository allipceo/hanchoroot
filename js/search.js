// 검색 기능 JavaScript - 2단계
// 1단계 app.js와 연동하여 간결하고 재활용 가능한 코드 작성

// 검색 관련 전역 변수
let searchData = null;
let currentSearchResults = [];

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
  console.log("Persons count:", searchData?.persons?.length);
  console.log("Search index:", searchData?.searchIndex);
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

// 이름으로 검색 (Core Module 재활용)
function searchByName(query) {
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
        <span>👤 ${person.세대}세대</span>
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

// 검색 제안 가져오기
function getSearchSuggestions(query) {
  if (!searchData) return [];
  
  const suggestions = [];
  const searchIndex = searchData.searchIndex;
  
  // 이름 제안
  Object.keys(searchIndex.byName).forEach(name => {
    if (name.includes(query) && !suggestions.includes(name)) {
      suggestions.push(name);
    }
  });
  
  // 한자 제안
  Object.keys(searchIndex.byHanja).forEach(hanja => {
    if (hanja.includes(query) && !suggestions.includes(hanja)) {
      suggestions.push(hanja);
    }
  });
  
  return suggestions.slice(0, 5); // 최대 5개 제안
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
  return data?.persons?.find(p => p.id === id);
}

function showPersonDetail(personId) {
  window.location.href = `detail.html?id=${personId}`;
}

// 촌수 계산 기능 제거됨

function goBack() {
  window.location.href = 'index.html';
}
