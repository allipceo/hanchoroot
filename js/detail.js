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
  document.getElementById('detail-title').textContent = `👤 ${person.name}`;
  document.getElementById('detail-subtitle').textContent = `${person.generation}세대 | ${person.line}`;
  
  // 인물 기본 정보
  document.getElementById('person-name').textContent = person.name;
  
  const statusElement = document.getElementById('person-status');
  statusElement.textContent = person.생존상태 === '생존' ? '생존' : '고인';
  statusElement.className = `person-status ${person.생존상태 === '생존' ? 'living' : 'deceased'}`;
  
  // 정보 그리드
  document.getElementById('person-generation').textContent = `${person.세대}세대`;
  document.getElementById('person-line').textContent = person.Line1;
  document.getElementById('person-birth').textContent = person.생년 || '미상';
  document.getElementById('person-age').textContent = person.age ? `${person.age}세` : '미상';
}

// 가족 관계 표시
function displayFamilyRelations(person) {
  const familyList = document.getElementById('family-list');
  const relations = [];
  
  // 부모 관계
  if (person.relationships.father) {
    const father = getPersonById(person.relationships.father);
    if (father) {
      relations.push({
        relation: '부',
        name: father.name,
        status: father.status
      });
    }
  }
  
  if (person.relationships.mother) {
    const mother = getPersonById(person.relationships.mother);
    if (mother) {
      relations.push({
        relation: '모',
        name: mother.name,
        status: mother.status
      });
    }
  }
  
  // 배우자 관계
  if (person.relationships.spouses && person.relationships.spouses.length > 0) {
    person.relationships.spouses.forEach(spouseId => {
      const spouse = getPersonById(spouseId);
      if (spouse) {
        relations.push({
          relation: '배우자',
          name: spouse.name,
          status: spouse.status
        });
      }
    });
  }
  
  // 자녀 관계
  if (person.relationships.children && person.relationships.children.length > 0) {
    person.relationships.children.forEach(childId => {
      const child = getPersonById(childId);
      if (child) {
        relations.push({
          relation: '자녀',
          name: child.name,
          status: child.status
        });
      }
    });
  }
  
  // 형제자매 관계
  if (person.relationships.siblings && person.relationships.siblings.length > 0) {
    person.relationships.siblings.forEach(siblingId => {
      const sibling = getPersonById(siblingId);
      if (sibling) {
        relations.push({
          relation: '형제자매',
          name: sibling.name,
          status: sibling.status
        });
      }
    });
  }
  
  // 가족 관계 HTML 생성
  if (relations.length === 0) {
    familyList.innerHTML = '<div class="empty-state"><div class="empty-icon">👨‍👩‍👧‍👦</div><div class="empty-text">가족 관계 정보가 없습니다.</div></div>';
  } else {
    familyList.innerHTML = relations.map(relation => 
      `<div class="family-item">
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
  const contactSection = document.getElementById('contact-section');
  
  // 연락처 정보가 있는지 확인
  const hasContact = person.contact.phone || person.contact.email || person.contact.address;
  
  if (!hasContact) {
    contactSection.style.display = 'none';
    return;
  }
  
  contactSection.style.display = 'block';
  
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
  
  if (person.status === 'deceased' && additional.burialPlace) {
    additionalItems.push({
      label: '안장지',
      value: additional.burialPlace
    });
  }
  
  if (person.status === 'deceased' && additional.memorialDate) {
    additionalItems.push({
      label: '기일',
      value: additional.memorialDate
    });
  }
  
  if (additionalItems.length === 0) {
    additionalInfo.innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">추가 정보가 없습니다.</div></div>';
  } else {
    additionalInfo.innerHTML = additionalItems.map(item => 
      `<div class="additional-item">
        <div class="additional-label">${item.label}</div>
        <div class="additional-value">${item.value}</div>
      </div>`
    ).join('');
  }
}

// 액션 버튼 함수들
function calculateKinship() {
  if (currentPerson) {
    alert(`촌수 계산 기능은 3단계에서 구현됩니다.\n인물: ${currentPerson.name}`);
  }
}

function viewFamily() {
  if (currentPerson) {
    alert(`패밀리 보기 기능은 3단계에서 구현됩니다.\n인물: ${currentPerson.name}`);
  }
}

function contactPerson() {
  if (currentPerson && currentPerson.contact.phone) {
    const phone = currentPerson.contact.phone;
    if (confirm(`${currentPerson.name}님에게 연락하시겠습니까?\n전화번호: ${phone}`)) {
      window.location.href = `tel:${phone}`;
    }
  } else {
    alert('연락처 정보가 없습니다.');
  }
}

// 유틸리티 함수들 (간결한 구현)
function getPersonById(id) {
  return detailData?.persons?.find(p => p.id === id);
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
