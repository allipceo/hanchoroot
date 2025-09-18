// 상세 정보 화면 JavaScript - 2단계
// 1단계 app.js와 연동하여 간결하고 재활용 가능한 코드 작성

// 전역 변수
let currentPerson = null;
let detailData = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initDetailPage();
});

// 상세 정보 페이지 초기화
function initDetailPage() {
  console.log("상세 정보 페이지 초기화");
  
  // URL에서 인물 ID 가져오기
  const personId = getPersonIdFromUrl();
  if (!personId) {
    showError('인물 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 데이터 로드
  loadDetailData();
  
  // 인물 정보 표시
  displayPersonDetail(personId);
  
  // 앱 버전 정보 표시
  displayAppVersion();
}

// URL에서 인물 ID 추출
function getPersonIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// 상세 정보 데이터 로드 (1단계 Core Module 재활용)
function loadDetailData() {
  detailData = window.CORE_DATA || CORE_DATA;
  console.log("상세 정보 데이터 로드 완료:", detailData);
}

// 인물 상세 정보 표시 (핵심 함수)
function displayPersonDetail(personId) {
  const person = getPersonById(personId);
  if (!person) {
    showError('인물 정보를 찾을 수 없습니다.');
    return;
  }
  
  currentPerson = person;
  console.log("인물 상세 정보 표시:", person);
  
  // 기본 정보 표시
  displayBasicInfo(person);
  
  // 가족 관계 표시
  displayFamilyRelations(person);
  
  // 연락처 정보 표시
  displayContactInfo(person);
  
  // 추가 정보 표시
  displayAdditionalInfo(person);
}

// 기본 정보 표시
function displayBasicInfo(person) {
  // 헤더 정보
  const gid = person.id||person.ID||person['아이디']||'';
  document.getElementById('person-name').textContent = `${person.name} ${/-M-/.test(gid)?'(M)':(/-F-/.test(gid)?'(F)':'')}`;
  document.getElementById('person-generation').textContent = `${person.세대}세대`;
  document.getElementById('person-line').textContent = person.Line1;
  // 생년은 그대로, 성별 필드 신설
  document.getElementById('person-birth').textContent = person.생년 || '미상';
  const genderField = person.성별 || (/-M-/.test(gid)?'M':(/-F-/.test(gid)?'F':''));
  const genderEl = document.getElementById('person-gender');
  if (genderEl) genderEl.textContent = genderField || '미상';
  document.getElementById('person-age').textContent = person.age ? `${person.age}세` : '미상';
}

// 가족 관계 표시 (V5.0 - 규격화된 표시 순서)
function displayFamilyRelations(person) {
  const familyList = document.getElementById('family-list');
  const relations = [];
  
  console.log('가족관계 표시 시작 (V5.0):', person.name);
  
  // 1. 본인 (현재 인물) - 표시하지 않음 (이미 상단에 표시됨)
  
  // 2. 배우자 (본인의 배우자)
  if (person.relationships.spouses && person.relationships.spouses.length > 0) {
    person.relationships.spouses.forEach(spouseName => {
      const spouse = getPersonByName(spouseName);
      if (spouse) {
        relations.push({
          relation: '배우자',
          name: spouse.name,
          생존상태: spouse.생존상태,
          id: spouse.id
        });
      }
    });
  }
  
  // 3. 부 (아버지)
  if (person.relationships.father) {
    const father = getPersonByName(person.relationships.father);
    if (father) {
      relations.push({
        relation: '부',
        name: father.name,
        생존상태: father.생존상태,
        id: father.id
      });
    }
  }
  
  // 4. 모 (어머니)
  if (person.relationships.mother) {
    const mother = getPersonByName(person.relationships.mother);
    if (mother) {
      relations.push({
        relation: '모',
        name: mother.name,
        생존상태: mother.생존상태,
        id: mother.id
      });
    }
  }
  
  // 5-8. 자녀 및 자녀의 배우자 (역방향 검색)
  const children = findChildrenByParent(person.name);
  
  // 아들들 먼저 표시
  const sons = children.filter(child => child.성별 === 'M');
  sons.forEach(son => {
    // 아들 표시
    relations.push({
      relation: '아들',
      name: son.name,
      생존상태: son.생존상태,
      id: son.id
    });
    
    // 아들의 배우자 표시 (기혼인 경우)
    if (son.relationships.spouses && son.relationships.spouses.length > 0) {
      son.relationships.spouses.forEach(spouseName => {
        const spouse = getPersonByName(spouseName);
        if (spouse) {
          relations.push({
            relation: '아들의 배우자',
            name: spouse.name,
            생존상태: spouse.생존상태,
            id: spouse.id
          });
        }
      });
    }
  });
  
  // 딸들 표시
  const daughters = children.filter(child => child.성별 === 'F');
  daughters.forEach(daughter => {
    // 딸 표시
    relations.push({
      relation: '딸',
      name: daughter.name,
      생존상태: daughter.생존상태,
      id: daughter.id
    });
    
    // 딸의 배우자 표시 (기혼인 경우)
    if (daughter.relationships.spouses && daughter.relationships.spouses.length > 0) {
      daughter.relationships.spouses.forEach(spouseName => {
        const spouse = getPersonByName(spouseName);
        if (spouse) {
          relations.push({
            relation: '딸의 배우자',
            name: spouse.name,
            생존상태: spouse.생존상태,
            id: spouse.id
          });
        }
      });
    }
  });
  
  console.log('최종 가족관계 목록 (V5.0):', relations);
  
  // 가족 관계 HTML 생성 (클릭 가능하도록 수정)
  if (relations.length === 0) {
    familyList.innerHTML = '<div class="empty-state"><div class="empty-icon">👨‍👩‍👧‍👦</div><div class="empty-text">가족 관계 정보가 없습니다.</div></div>';
  } else {
    familyList.innerHTML = relations.map(relation => 
      `<div class="family-item" onclick="showPersonDetail('${relation.id}')">
        <div class="family-relation">${relation.relation}</div>
        <div class="family-name">${relation.name}</div>
        <div class="family-status ${relation.생존상태 === '생존' ? 'living' : 'deceased'}">${relation.생존상태 === '생존' ? '생존' : '고인'}</div>
      </div>`
    ).join('');
  }
}

// 연락처 정보 표시
function displayContactInfo(person) {
  const contactList = document.getElementById('contact-list');
  const contacts = [];
  
  if (person.contact.phone) {
    contacts.push({
      icon: '📞',
      label: '전화번호',
      value: person.contact.phone
    });
  }
  
  if (person.contact.email) {
    contacts.push({
      icon: '📧',
      label: '이메일',
      value: person.contact.email
    });
  }
  
  if (person.contact.address) {
    contacts.push({
      icon: '🏠',
      label: '주소',
      value: person.contact.address
    });
  }
  
  contactList.innerHTML = contacts.map(contact => 
    `<div class="contact-item">
      <div class="contact-icon">${contact.icon}</div>
      <div class="contact-info">
        <div class="contact-label">${contact.label}</div>
        <div class="contact-value">${contact.value}</div>
      </div>
    </div>`
  ).join('');
}

// 추가 정보 표시
function displayAdditionalInfo(person) {
  const additionalInfo = document.getElementById('additional-info');
  const additional = person.additional;
  
  const additionalItems = [];
  
  if (additional.job) {
    additionalItems.push({
      label: '직업',
      value: additional.job
    });
  }
  
  if (additional.education) {
    additionalItems.push({
      label: '학력',
      value: additional.education
    });
  }
  
  if (additional.notes) {
    additionalItems.push({
      label: '비고',
      value: additional.notes
    });
  }
  
  additionalInfo.innerHTML = additionalItems.map(item => 
    `<div class="additional-item">
      <div class="additional-label">${item.label}</div>
      <div class="additional-value">${item.value}</div>
    </div>`
  ).join('');
}

// 촌수 계산 버튼 클릭
function calculateKinship() {
  if (!currentPerson) {
    alert('인물 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 촌수 계산 페이지로 이동
  window.location.href = `calculator.html?from=${currentPerson.id}`;
}

// 패밀리 보기 버튼 클릭
function viewFamily() {
  if (!currentPerson) {
    alert('인물 정보를 찾을 수 없습니다.');
    return;
  }
  
  // 패밀리 보기 페이지로 이동
  window.location.href = `family.html?person=${currentPerson.id}`;
}

// 연락하기 버튼 클릭
function contactPerson() {
  if (!currentPerson) {
    alert('인물 정보를 찾을 수 없습니다.');
    return;
  }
  
  const phone = currentPerson.contact.phone;
  if (confirm(`${currentPerson.name}님에게 연락하시겠습니까?\n전화번호: ${phone}`)) {
    window.location.href = `tel:${phone}`;
  } else {
    alert('연락처 정보가 없습니다.');
  }
}

// 유틸리티 함수들 (간결한 구현)
function getPersonById(id) {
  return detailData?.persons?.find(p => p.id === id);
}

function getPersonByName(name) {
  return detailData?.persons?.find(p => p.name === name);
}

// 자녀 찾기 함수 (역방향 검색)
function findChildrenByParent(parentName) {
  return detailData?.persons?.filter(person => 
    person.relationships.father === parentName || 
    person.relationships.mother === parentName
  ) || [];
}

function showError(message) {
  alert(message);
  console.error(message);
}

function displayAppVersion() {
  const appVersion = document.getElementById('app-version');
  const dataVersion = document.getElementById('data-version');
  
  if (appVersion && dataVersion && detailData) {
    appVersion.textContent = detailData.config.app.version;
    dataVersion.textContent = detailData.config.app.dataVersion;
  }
}

function goBack() {
  window.history.back();
}