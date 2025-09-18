// 한양조씨 족보앱 메인 JavaScript V3.0
// Lego Block 방식 - 재사용 가능한 모듈들

// 전역 변수
let currentUser = null;
let adminInfo = null;
let appConfig = null;

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화 (Lego Block 방식)
function initializeApp() {
    console.log("한양조씨 족보앱 초기화 시작");
    
    // 1. 데이터 로드
    loadCoreData();
    
    // 2. UI 초기화
    initializeUI();
    
    // 3. 이벤트 리스너 설정
    setupEventListeners();
    
    // 4. 관리자 정보 표시
    displayAdminInfo();
    
    console.log("앱 초기화 완료");
}

// Core 데이터 로드 (V2.0 방법론 - window.CORE_DATA 표준 사용)
function loadCoreData() {
    try {
        // V2.0 방법론: window.CORE_DATA 표준 사용
        if (typeof window.CORE_DATA !== 'undefined') {
            const coreData = window.CORE_DATA;
            adminInfo = coreData.config.admin;
            appConfig = coreData.config.app;
            try{
              // 1) 우선 메모리에 이미 존재하면 사용
              if (window.APP_CURRENT_USER && window.APP_CURRENT_USER.id) {
                currentUser = window.APP_CURRENT_USER;
              } else {
                const saved = localStorage.getItem('gia_current_user');
                currentUser = saved ? JSON.parse(saved) : null;
              }
            }catch(e){ currentUser = null; }
            console.log("Core 데이터 로드 성공 (V2.0)");
        } else {
            console.error("window.CORE_DATA가 로드되지 않았습니다");
        }
    } catch (error) {
        console.error("데이터 로드 오류:", error);
    }
}

// UI 초기화
function initializeUI() {
    // "나" 설정 상태 표시
    displayCurrentUser();
    updateSettingsCurrentUser();
    
    // 앱 버전 표시
    if (appConfig) {
        displayAppVersion();
    }

    // 개발경과 토글
    const devBtn = document.getElementById('dev-progress-btn');
    const devPanel = document.getElementById('dev-progress-panel');
    if (devBtn && devPanel) {
        devBtn.addEventListener('click', function(){
            devPanel.style.display = (devPanel.style.display === 'none' || devPanel.style.display === '') ? 'block' : 'none';
            if (devPanel.style.display === 'block') {
                populateDevProgress();
            }
        });
    }
}

// 현재 사용자 표시
function displayCurrentUser() {
    const userDisplay = document.getElementById('current-user');
    if (!userDisplay) return;
    if (currentUser && currentUser.name) {
        userDisplay.innerHTML = `👤 나는 ${currentUser.name}입니다`;
        userDisplay.style.display = 'block';
    } else {
        userDisplay.style.display = 'none';
    }
}

function updateSettingsCurrentUser(){
  const el=document.getElementById('settings-current-user');
  if(!el) return;
  if(currentUser && currentUser.name){
    // 세대 정보는 CORE_DATA에서 찾아 추가
    let gen='?';
    if(Array.isArray(window.CORE_DATA)){
      const p=window.CORE_DATA.find(x=>x.id===currentUser.id);
      if(p && (p.세대||p.generation)) gen = p.세대 || p.generation;
    }
    el.textContent = `${currentUser.name} (${gen}세대)`;
  } else {
    el.textContent = '미등록';
  }
}

// 앱 버전 표시
function displayAppVersion() {
    const versionDisplay = document.getElementById('app-version');
    if (versionDisplay && appConfig) {
        versionDisplay.innerHTML = `v${appConfig.version}`;
    }
}

// 개발경과 패널 데이터 채우기(개발자용)
function populateDevProgress(){
    const engineVerEl = document.getElementById('engine-version');
    const dataCountEl = document.getElementById('data-count');
    const joCountEl = document.getElementById('jo-count');
    const lastSyncEl = document.getElementById('last-sync');

    if (engineVerEl) engineVerEl.textContent = '촐수 v2.0';

    if (Array.isArray(window.CORE_DATA)) {
        const total = window.CORE_DATA.length;
        const jo = window.CORE_DATA.filter(p=>p && p.name && p.name[0]==='조').length;
        if (dataCountEl) dataCountEl.textContent = `${total}명`;
        if (joCountEl) joCountEl.textContent = `${jo}명`;
    }
    // meta가 있을 경우
    try{
      const meta = window.CORE_DATA && window.CORE_DATA.meta ? window.CORE_DATA.meta : null;
      if (meta && lastSyncEl) lastSyncEl.textContent = meta.lastSync || meta.created || '-';
    }catch(e){ /* no-op */ }
}

// 관리자 정보 동적 표시
function displayAdminInfo() {
    if (adminInfo) {
        // 관리자 문의 화면의 정보 업데이트
        updateAdminContactInfo();
    }
}

// 관리자 연락처 정보 업데이트
function updateAdminContactInfo() {
    const adminName = document.getElementById('admin-name');
    const adminPhone = document.getElementById('admin-phone');
    const adminEmail = document.getElementById('admin-email');
    
    if (adminName && adminInfo) {
        adminName.textContent = adminInfo.name;
    }
    if (adminPhone && adminInfo) {
        adminPhone.textContent = adminInfo.phone;
    }
    if (adminEmail && adminInfo) {
        adminEmail.textContent = adminInfo.email;
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 메뉴 버튼 클릭 이벤트
    setupMenuButtons();
    
    // 네비게이션 이벤트
    setupNavigation();
}

// 메뉴 버튼 설정
function setupMenuButtons() {
    const menuButtons = [
        { id: 'search-btn', action: 'search' },
        { id: 'family-btn', action: 'family' },
        { id: 'calculator-btn', action: 'calculator' },
        { id: 'export-btn', action: 'export' },
        { id: 'settings-btn', action: 'settings' }
    ];
    
    menuButtons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', function() {
                handleMenuClick(button.action);
            });
        }
    });
}

// 메뉴 클릭 핸들러
function handleMenuClick(action) {
    console.log(`메뉴 클릭: ${action}`);
    
    switch(action) {
        case 'search':
            navigateToSearch();
            break;
                    case 'family':
                        navigateToFamily();
                        break;
        case 'calculator':
            navigateToCalculator();
            break;
        case 'export':
            // 기존 안내 메시지 대신 export.html로 이동
            window.location.href = 'export.html';
            break;
        case 'settings':
            navigateToSettings();
            break;
        default:
            console.log('알 수 없는 메뉴:', action);
    }
}

// 검색 화면으로 이동 (2단계 추가)
function navigateToSearch() {
    window.location.href = 'search.html';
    console.log('검색 화면으로 이동');
}

// 촌수 계산기 화면으로 이동 (3단계 추가)
function navigateToCalculator() {
    window.location.href = 'calculator.html';
    console.log('촌수 계산기 화면으로 이동');
}

// 패밀리별 보기 화면으로 이동 (4단계 추가)
function navigateToFamily() {
    window.location.href = 'family.html';
    console.log('패밀리별 보기 화면으로 이동');
}

// 설정 화면으로 이동
function navigateToSettings() {
    const settingsScreen = document.getElementById('settings-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (settingsScreen && mainScreen) {
        mainScreen.style.display = 'none';
        settingsScreen.style.display = 'block';
        // 최신 상태 동기화
        try {
          const saved = localStorage.getItem('gia_current_user');
          currentUser = saved ? JSON.parse(saved) : currentUser;
        } catch(e) {}
        updateSettingsCurrentUser();
        console.log('설정 화면으로 이동');
    }
}

// 네비게이션 설정
function setupNavigation() {
    // 뒤로가기 버튼
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
    
    // 홈 버튼
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', goHome);
    }
}

// 뒤로가기
function goBack() {
    const settingsScreen = document.getElementById('settings-screen');
    const mainScreen = document.getElementById('main-screen');
    
    if (settingsScreen && mainScreen) {
        settingsScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        console.log('메인 화면으로 복귀');
    }
}

// 홈으로 이동
function goHome() {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    const mainScreen = document.getElementById('main-screen');
    if (mainScreen) {
        mainScreen.style.display = 'block';
        console.log('홈으로 이동');
    }
}

// 메시지 표시 (간단한 알림)
function showMessage(message) {
    alert(message);
    console.log('메시지:', message);
}

// 유틸리티 함수들 (재사용 가능한 Lego Block들)
const Utils = {
    // ID로 요소 찾기
    getElement: function(id) {
        return document.getElementById(id);
    },
    
    // 클래스로 요소들 찾기
    getElements: function(className) {
        return document.getElementsByClassName(className);
    },
    
    // 요소 표시/숨김
    show: function(element) {
        if (element) element.style.display = 'block';
    },
    
    hide: function(element) {
        if (element) element.style.display = 'none';
    },
    
    // 로그 출력
    log: function(message) {
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    }
};

// 전역으로 노출 (디버깅용)
window.App = {
    initializeApp,
    loadCoreData,
    displayAdminInfo,
    Utils,
    currentUser,
    adminInfo,
    appConfig
};
