// 촌수 계산기 JavaScript - 3단계
// 1-2단계 app.js, search.js와 연동하여 간결하고 재활용 가능한 코드 작성

// 전역 변수
let calculatorData = null;
let selectedPerson1 = null;
let selectedPerson2 = null;
let currentSelector = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initCalculatorPage();
});

// 촌수 계산기 페이지 초기화
function initCalculatorPage() {
  console.log("촌수 계산기 페이지 초기화");
  
  // 데이터 로드
  loadCalculatorData();
  
  // 이벤트 리스너 설정
  setupCalculatorEventListeners();
  
  // 계산 히스토리 표시
  displayCalculationHistory();
  
  // 앱 버전 정보 표시
  displayAppVersion();
}

// 계산기 데이터 로드 (1-2단계 Core Module 재활용)
function loadCalculatorData() {
  calculatorData = window.appData || CORE_DATA;
  
  // 촌수 계산기 데이터 로드
  if (typeof kinshipCalculator !== 'undefined') {
    kinshipCalculator.loadPersonsData(calculatorData.persons);
    console.log("촌수 계산기 데이터 로드 완료");
  } else {
    console.error("KinshipCalculator를 찾을 수 없습니다");
  }
}

// 계산기 이벤트 리스너 설정
function setupCalculatorEventListeners() {
  // 모달 검색 입력 이벤트
  const modalSearch = document.getElementById('modal-search');
  if (modalSearch) {
    modalSearch.addEventListener('input', handleModalSearch);
    modalSearch.addEventListener('keypress', handleModalSearchKeypress);
  }
  
  // 계산 버튼 상태 업데이트
  updateCalculateButtonState();
}

// 인물 선택기 열기
function openPersonSelector(personNumber) {
  currentSelector = personNumber;
  const modal = document.getElementById('person-modal');
  const modalTitle = document.getElementById('modal-title');
  
  modalTitle.textContent = `${personNumber}번째 사람 선택`;
  modal.style.display = 'flex';
  
  // 모든 인물 목록 표시
  displayAllPersons();
  
  // 검색 입력창 포커스
  setTimeout(() => {
    document.getElementById('modal-search').focus();
  }, 100);
}

// 인물 선택기 닫기
function closePersonSelector() {
  const modal = document.getElementById('person-modal');
  modal.style.display = 'none';
  currentSelector = null;
}

// 모든 인물 표시
function displayAllPersons() {
  const personList = document.getElementById('modal-person-list');
  if (!personList || !calculatorData) return;
  
  personList.innerHTML = calculatorData.persons.map(person => 
    createPersonListItem(person)
  ).join('');
}

// 인물 목록 아이템 생성
function createPersonListItem(person) {
  const statusText = person.status === 'living' ? '생존' : '고인';
  const statusClass = person.status === 'living' ? 'living' : 'deceased';
  
  return `
    <div class="modal-person-item" onclick="selectPerson('${person.id}')">
      <div class="modal-person-info">
        <div class="modal-person-name">${person.name}</div>
        <div class="modal-person-details">${person.generation}세대 | ${person.line} | ${statusText}</div>
      </div>
      <button class="select-person-btn" onclick="event.stopPropagation(); selectPerson('${person.id}')">선택</button>
    </div>
  `;
}

// 인물 선택
function selectPerson(personId) {
  const person = calculatorData.persons.find(p => p.id === personId);
  if (!person) return;
  
  if (currentSelector === 1) {
    selectedPerson1 = person;
    displaySelectedPerson(1, person);
  } else if (currentSelector === 2) {
    selectedPerson2 = person;
    displaySelectedPerson(2, person);
  }
  
  // 모달 닫기
  closePersonSelector();
  
  // 계산 버튼 상태 업데이트
  updateCalculateButtonState();
}

// 선택된 인물 표시
function displaySelectedPerson(personNumber, person) {
  const placeholder = document.getElementById(`person${personNumber}-placeholder`);
  const selected = document.getElementById(`person${personNumber}-selected`);
  const name = document.getElementById(`person${personNumber}-name`);
  const details = document.getElementById(`person${personNumber}-details`);
  
  if (placeholder && selected && name && details) {
    placeholder.style.display = 'none';
    selected.style.display = 'block';
    
    name.textContent = person.name;
    details.textContent = `${person.generation}세대 | ${person.line} | ${person.status === 'living' ? '생존' : '고인'}`;
  }
}

// 계산 버튼 상태 업데이트
function updateCalculateButtonState() {
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.disabled = !selectedPerson1 || !selectedPerson2;
  }
}

// 촌수 계산 실행 (핵심 함수)
function calculateKinship() {
  if (!selectedPerson1 || !selectedPerson2) {
    alert('두 사람을 모두 선택해주세요.');
    return;
  }
  
  if (!kinshipCalculator) {
    alert('촌수 계산기가 초기화되지 않았습니다.');
    return;
  }
  
  try {
    console.log("촌수 계산 실행:", selectedPerson1.name, "↔", selectedPerson2.name);
    
    // 촌수 계산
    const result = kinshipCalculator.calculateKinship(selectedPerson1.id, selectedPerson2.id);
    
    // 계산 히스토리 추가
    kinshipCalculator.addCalculationHistory(selectedPerson1, selectedPerson2, result);
    
    // 결과 표시
    displayCalculationResult(result);
    
    // 히스토리 업데이트
    displayCalculationHistory();
    
    console.log("촌수 계산 완료:", result);
    
  } catch (error) {
    console.error("촌수 계산 오류:", error);
    alert('촌수 계산 중 오류가 발생했습니다: ' + error.message);
  }
}

// 계산 결과 표시
function displayCalculationResult(result) {
  const resultSection = document.getElementById('result-section');
  const resultCard = document.getElementById('result-card');
  
  if (!resultSection || !resultCard) return;
  
  const relationship = result.relationship;
  
  // 결과 카드 HTML 생성
  resultCard.innerHTML = `
    <div class="result-header">
      <div class="result-relationship">${result.person1.name} ↔ ${result.person2.name}</div>
      <div class="result-degree">${relationship.degree}촌 ${relationship.relation} 관계</div>
    </div>
    
    <div class="result-details">
      <div class="result-detail-item">
        <div class="result-detail-label">호칭</div>
        <div class="result-detail-value">${relationship.honorific}</div>
      </div>
      <div class="result-detail-item">
        <div class="result-detail-label">공통 조상</div>
        <div class="result-detail-value">${getPersonName(relationship.commonAncestor)}</div>
      </div>
    </div>
    
    ${relationship.path.length > 0 ? `
      <div class="result-path">
        <div class="result-path-title">관계 경로</div>
        <div class="result-path-flow">
          ${relationship.path.map(personId => getPersonName(personId)).join(' <span class="result-path-arrow">→</span> ')}
        </div>
      </div>
    ` : ''}
  `;
  
  // 결과 섹션 표시
  resultSection.style.display = 'block';
  
  // 결과 섹션으로 스크롤
  resultSection.scrollIntoView({ behavior: 'smooth' });
}

// 계산 히스토리 표시
function displayCalculationHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList || !kinshipCalculator) return;
  
  const history = kinshipCalculator.getCalculationHistory();
  
  if (history.length === 0) {
    historyList.innerHTML = '<p style="color: #999; font-style: italic; text-align: center; padding: 20px;">최근 계산 기록이 없습니다.</p>';
    return;
  }
  
  historyList.innerHTML = history.map(item => 
    `<div class="history-item" onclick="loadHistoryCalculation('${item.person1}', '${item.person2}')">
      <div class="history-relationship">${item.result}</div>
      <div class="history-persons">${item.person1} ↔ ${item.person2}</div>
    </div>`
  ).join('');
}

// 히스토리에서 계산 로드
function loadHistoryCalculation(person1Name, person2Name) {
  const person1 = calculatorData.persons.find(p => p.name === person1Name);
  const person2 = calculatorData.persons.find(p => p.name === person2Name);
  
  if (person1 && person2) {
    selectedPerson1 = person1;
    selectedPerson2 = person2;
    
    displaySelectedPerson(1, person1);
    displaySelectedPerson(2, person2);
    updateCalculateButtonState();
    
    // 자동으로 계산 실행
    calculateKinship();
  }
}

// 모달 검색 처리
function handleModalSearch(event) {
  const query = event.target.value.trim();
  searchPersons(query);
}

// 모달 검색 키 입력 처리
function handleModalSearchKeypress(event) {
  if (event.key === 'Enter') {
    searchPersons();
  }
}

// 인물 검색
function searchPersons(query) {
  const searchInput = document.getElementById('modal-search');
  const queryText = query || searchInput.value.trim();
  
  const personList = document.getElementById('modal-person-list');
  if (!personList || !calculatorData) return;
  
  if (!queryText) {
    displayAllPersons();
    return;
  }
  
  const filteredPersons = calculatorData.persons.filter(person => 
    person.name.includes(queryText)
  );
  
  personList.innerHTML = filteredPersons.map(person => 
    createPersonListItem(person)
  ).join('');
}

// 인물 이름 가져오기
function getPersonName(personId) {
  if (!personId || !calculatorData) return '미상';
  const person = calculatorData.persons.find(p => p.id === personId);
  return person ? person.name : '미상';
}

// 앱 버전 정보 표시 (1-2단계 재활용)
function displayAppVersion() {
  const appVersion = document.getElementById('app-version');
  const dataVersion = document.getElementById('data-version');
  
  if (appVersion && dataVersion && calculatorData) {
    appVersion.textContent = calculatorData.config.app.version;
    dataVersion.textContent = calculatorData.config.app.dataVersion;
  }
}

// 뒤로가기
function goBack() {
  window.history.back();
}
