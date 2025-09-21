// 상세 정보 화면 JavaScript - 2단계
// 1단계 app.js와 연동하여 간결하고 재활용 가능한 코드 작성

// 전역 변수
let currentPerson = null;
let detailData = null;

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
  console.log("상세 정보 데이터 로드 완료:", Array.isArray(detailData)?`array(${detailData.length})`:'object');
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
  const nameEl = document.getElementById('person-name');
  if (nameEl) nameEl.textContent = `${person.name||person.성명||''} ${/-M-/.test(gid)?'(M)':(/-F-/.test(gid)?'(F)':'')}`;
  // ID에서 세대 추출 (L3-G5-F-D-448 → 5세대)
  const idGeneration = person.id ? person.id.split('-')[1]?.substring(1) : null;
  const gen = idGeneration || person.세대 || person.generation || '';
  const line = person.Line1||person.line||person.Line||'';
  const genEl = document.getElementById('person-generation');
  if (genEl) genEl.textContent = gen?`${gen}세대`:'-';
  const lineEl = document.getElementById('person-line');
  if (lineEl) lineEl.textContent = line||'-';
  // 생년은 그대로, 성별 필드 신설
  const birthEl = document.getElementById('person-birth');
  if (birthEl) birthEl.textContent = person.생년 || person.birth || '미상';
  const genderField = person.성별 || person.gender || (/-M-/.test(gid)?'M':(/-F-/.test(gid)?'F':''));
  const genderEl = document.getElementById('person-gender');
  if (genderEl) genderEl.textContent = genderField || '미상';
  const ageEl = document.getElementById('person-age');
  if (ageEl) ageEl.textContent = person.age ? `${person.age}세` : '미상';
}

// 가족 관계 표시 (V6.0 - notes 필드 파싱 추가)
function displayFamilyRelations(person) {
  const familyList = document.getElementById('family-list');
  const relations = [];
  
  console.log('가족관계 표시 시작 (V6.0):', person.name);
  
  // notes 필드에서 가족관계 파싱
  const parsedRelations = parseNotesForRelations(person);
  
  // 1. 본인 (현재 인물) - 표시하지 않음 (이미 상단에 표시됨)
  
  // 2. 배우자 (본인의 배우자) - relationships와 parsedRelations, notes에서 찾기
  const rel = person.relationships || {};
  const allSpouses = [...(rel.spouses || []), ...(parsedRelations.spouses || [])];
  
  // notes에서 배우자 찾기 (역방향 검색)
  const spousesFromNotes = findSpousesFromNotes(person.name);
  spousesFromNotes.forEach(spouse => allSpouses.push(spouse.name));
  
  const uniqueSpouses = [...new Set(allSpouses)];
  
  if (uniqueSpouses.length > 0) {
    uniqueSpouses.forEach(spouseName => {
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
  
  // 3. 부 (아버지) - 조병희는 하드코딩, 나머지는 기존 로직
  let fatherName = rel.father || parsedRelations.father;
  if (person.name === '조병희') {
    fatherName = '조정윤'; // 하드코딩
  }
  if (fatherName) {
    const father = getPersonByName(fatherName);
    if (father) {
      relations.push({
        relation: '부',
        name: father.name,
        생존상태: father.생존상태,
        id: father.id
      });
    }
  }
  
  // 4. 모 (어머니) - 조병희는 하드코딩, 나머지는 기존 로직
  let motherName = rel.mother || parsedRelations.mother;
  if (person.name === '조병희') {
    motherName = '임정숙'; // 하드코딩
  }
  if (motherName) {
    const mother = getPersonByName(motherName);
    if (mother) {
      relations.push({
        relation: '모',
        name: mother.name,
        생존상태: mother.생존상태,
        id: mother.id
      });
    }
  }
  
  // 5-8. 자녀 및 자녀의 배우자 (역방향 검색 + notes 파싱)
  const children = findChildrenByParent(person.name);
  const parsedChildren = findChildrenFromNotes(person.name);
  const allChildren = [...children, ...parsedChildren];
  // 중복 제거 (ID 기준)
  const uniqueChildren = allChildren.filter((child, index, arr) => 
    arr.findIndex(c => c.id === child.id) === index
  );
  
  // 아들들 먼저 표시
  const sons = uniqueChildren.filter(child => (child.성별||child.gender) === 'M');
  sons.forEach(son => {
    // 아들 표시
    relations.push({
      relation: '아들',
      name: son.name,
      생존상태: son.생존상태,
      id: son.id
    });
    
    // 아들의 배우자 표시 (기혼인 경우) - relationships와 notes 모두 확인
    const sonSpouses = [];
    
    // relationships에서 배우자 찾기
    if (son.relationships && son.relationships.spouses && son.relationships.spouses.length > 0) {
      sonSpouses.push(...son.relationships.spouses);
    }
    
    // notes에서 배우자 찾기
    const spousesFromNotes = findSpousesFromNotes(son.name);
    spousesFromNotes.forEach(spouse => sonSpouses.push(spouse.name));
    
    // 중복 제거
    const uniqueSonSpouses = [...new Set(sonSpouses)];
    
    uniqueSonSpouses.forEach(spouseName => {
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
  });
  
  // 딸들 표시
  const daughters = uniqueChildren.filter(child => (child.성별||child.gender) === 'F');
  daughters.forEach(daughter => {
    // 딸 표시
    relations.push({
      relation: '딸',
      name: daughter.name,
      생존상태: daughter.생존상태,
      id: daughter.id
    });
    
    // 딸의 배우자 표시 (기혼인 경우) - relationships와 notes 모두 확인
    const daughterSpouses = [];
    
    // relationships에서 배우자 찾기
    if (daughter.relationships && daughter.relationships.spouses && daughter.relationships.spouses.length > 0) {
      daughterSpouses.push(...daughter.relationships.spouses);
    }
    
    // notes에서 배우자 찾기
    const spousesFromNotes = findSpousesFromNotes(daughter.name);
    spousesFromNotes.forEach(spouse => daughterSpouses.push(spouse.name));
    
    // 중복 제거
    const uniqueDaughterSpouses = [...new Set(daughterSpouses)];
    
    uniqueDaughterSpouses.forEach(spouseName => {
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
  const contact = person.contact || {};
  
  if (contact.phone) {
    contacts.push({
      icon: '📞',
      label: '전화번호',
      value: contact.phone
    });
  }
  
  if (contact.email) {
    contacts.push({
      icon: '📧',
      label: '이메일',
      value: contact.email
    });
  }
  
  if (contact.address) {
    contacts.push({
      icon: '🏠',
      label: '주소',
      value: contact.address
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
  const additional = person.additional || {};
  
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
  // 최신 동기화된 데이터 구조 사용 (window.CORE_DATA는 배열)
  if (Array.isArray(detailData)) return detailData.find(p => p.id === id);
  // 구버전 호환성을 위한 fallback
  return detailData?.persons?.find(p => p.id === id);
}

function getPersonByName(name) {
  // 최신 동기화된 데이터 구조 사용 (window.CORE_DATA는 배열)
  if (Array.isArray(detailData)) return detailData.find(p => p.name === name);
  // 구버전 호환성을 위한 fallback
  return detailData?.persons?.find(p => p.name === name);
}

// 자녀 찾기 함수 (역방향 검색)
function findChildrenByParent(parentName) {
  const list = Array.isArray(detailData) ? detailData : (detailData?.persons||[]);
  return list.filter(person => {
    const rel = person.relationships || {};
    return rel.father === parentName || rel.mother === parentName;
  });
}

function showError(message) {
  alert(message);
  console.error(message);
}

function displayAppVersion() {
  const appVersion = document.getElementById('app-version');
  const dataVersion = document.getElementById('data-version');
  
  if (appVersion && dataVersion && detailData) {
    const config = Array.isArray(detailData) ? (detailData.meta?.config||null) : (detailData.config||null);
    appVersion.textContent = config?.app?.version || '-';
    dataVersion.textContent = config?.app?.dataVersion || '-';
  }
}

function goBack() {
  window.history.back();
}

// notes 필드에서 가족관계 파싱하는 함수 (V6.0 추가)
function parseNotesForRelations(person) {
  const notes = person.additional?.notes || '';
  const relations = {
    father: null,
    mother: null,
    spouses: []
  };
  
  if (!notes) return relations;
  
  // "조강하-전흥선의 아들" 패턴 파싱
  const parentPattern = /(.+)-(.+)의\s*(아들|딸)/;
  const parentMatch = notes.match(parentPattern);
  if (parentMatch) {
    relations.father = parentMatch[1];
    relations.mother = parentMatch[2];
  }
  
  // "조성원의 부인" 패턴 파싱
  const spousePattern = /(.+)의\s*부인/;
  const spouseMatch = notes.match(spousePattern);
  if (spouseMatch) {
    // 이 사람이 부인이므로, spouseMatch[1]이 남편
    // 하지만 현재 person은 배우자를 찾는 중이므로 역으로 처리하지 않음
  }
  
  return relations;
}

// notes에서 자녀 찾기 함수 (V6.0 추가)
function findChildrenFromNotes(parentName) {
  let persons = [];
  
  // 데이터 구조에 따라 persons 배열 가져오기
  if (Array.isArray(detailData)) {
    persons = detailData;
  } else if (detailData?.persons) {
    persons = detailData.persons;
  }
  
  const children = [];
  
  // 현재 person의 라인 정보 가져오기 (재혼자 구분용)
  const currentPersonData = currentPerson || getPersonByName(parentName);
  const currentLine = currentPersonData?.id ? currentPersonData.id.split('-')[0] : null;
  
  // 자녀/배우자 찾기
  persons.forEach(person => {
    const notes = person.additional?.notes || '';
    
    // 재혼자 특별 처리 (조정윤, 조병희)
    if (parentName === '조정윤' || parentName === '조병희') {
      // 현재 person과 같은 라인의 자녀만 찾기
      if (currentLine && person.id && person.id.startsWith(currentLine)) {
        if (parentName === '조병희') {
          // 조병희 라인별 고정 자녀 리스트 (하드코딩)
          const fixedChildren = {
            'L1': ['조대하', '조제하', '조광하', '조중하', '조옥란', '조옥영'],
            'L2': ['조일하', '조명진', '조명하', '조영하']
          };
          
          const expectedChildren = fixedChildren[currentLine] || [];
          if (expectedChildren.includes(person.name)) {
            children.push(person);
            return;
          }
        } else if (parentName === '조정윤') {
          // L1,L2: 조정윤-임정숙, L3: 조정윤-이천경
          const pattern1 = /조정윤-임정숙의\s*(아들|딸)/;
          const pattern2 = /조정윤-이천경의\s*(아들|딸)/;
          
          if ((currentLine === 'L1' || currentLine === 'L2') && pattern1.test(notes)) {
            children.push(person);
            return;
          } else if (currentLine === 'L3' && pattern2.test(notes)) {
            children.push(person);
            return;
          }
        }
      }
    } else {
      // 일반적인 부모-자녀 관계 처리
      
      // 패턴 1: "부모이름-배우자이름의 아들/딸" (예: 조성원-박선영의 딸)
      const childPattern1 = new RegExp(`${parentName}-(.+)의\\s*(아들|딸)`);
      const childMatch1 = notes.match(childPattern1);
      if (childMatch1) {
        children.push(person);
        return;
      }
      
      // 패턴 2: "부모이름의 아들/딸" (예: 김명진의 딸)
      const childPattern2 = new RegExp(`${parentName}의\\s*(아들|딸)`);
      const childMatch2 = notes.match(childPattern2);
      if (childMatch2) {
        children.push(person);
        return;
      }
      
      // 패턴 3: "부모1이름 부모2이름의 아들/딸" (예: 김명진 조성희의 딸)
      const childPattern3 = new RegExp(`${parentName}\\s+(.+)의\\s*(아들|딸)`);
      const childMatch3 = notes.match(childPattern3);
      if (childMatch3) {
        children.push(person);
        return;
      }
    }
    
    // 배우자 패턴은 자녀 목록에 추가하지 않음
    const spousePattern = new RegExp(`${parentName}의\\s*부인`);
    if (spousePattern.test(notes)) {
      // 이것은 배우자이므로 자녀 목록에 추가하지 않음
    }
  });
  
  return children;
}

// notes에서 배우자 찾기 함수 (V6.0 추가)
function findSpousesFromNotes(personName) {
  let persons = [];
  
  // 데이터 구조에 따라 persons 배열 가져오기
  if (Array.isArray(detailData)) {
    persons = detailData;
  } else if (detailData?.persons) {
    persons = detailData.persons;
  }
  
  const spouses = [];
  
  // 1. personName을 찾아서 그 사람의 notes에서 배우자 정보 추출
  const targetPerson = persons.find(p => p.name === personName);
  if (targetPerson) {
    const notes = targetPerson.additional?.notes || '';
    
    // "배우자: 이름" 패턴에서 배우자 찾기
    const spouseInNotesPattern = /배우자:\s*(.+?)(?:\s*\||$)/;
    const spouseMatch = notes.match(spouseInNotesPattern);
    if (spouseMatch) {
      const spouseName = spouseMatch[1].trim();
      const spousePerson = persons.find(p => p.name === spouseName);
      if (spousePerson) {
        spouses.push(spousePerson);
      }
    }
  }
  
  // 2. 다른 사람들의 notes에서 personName을 배우자로 언급하는 경우 찾기
  persons.forEach(person => {
    const notes = person.additional?.notes || '';
    
    // 패턴 1: "personName의 부인" 또는 "personName의 남편"
    const spousePattern1 = new RegExp(`${personName}의.*(부인|남편)`);
    if (spousePattern1.test(notes)) {
      spouses.push(person);
      return;
    }
    
    // 패턴 2: "배우자: personName" 형태
    const spousePattern2 = new RegExp(`배우자:\\s*${personName}`);
    if (spousePattern2.test(notes)) {
      spouses.push(person);
      return;
    }
  });
  
  return spouses;
}