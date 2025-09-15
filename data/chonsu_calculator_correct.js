// 촌수계산 함수 - 올바른 공식 적용
const fs = require('fs');

// 데이터 로드
let coreData;
try {
  const content = fs.readFileSync('window_core_data.js', 'utf8');
  const match = content.match(/window\.CORE_DATA = (\[[\s\S]*\]);/);
  if (match) {
    coreData = JSON.parse(match[1]);
    console.log(`✅ 데이터 로드 완료: ${coreData.length}명`);
  }
} catch (error) {
  console.log('❌ 데이터 로드 실패:', error.message);
  process.exit(1);
}

// 1. 사람 찾기 함수
function findPerson(name) {
  return coreData.find(p => p.name === name);
}

// 2. 공통 조상 찾기 함수 (가장 가까운 공통 조상)
function findCommonAncestor(person1, person2) {
  if (!person1 || !person2) return null;
  
  // 같은 사람이면 본인
  if (person1.name === person2.name) return person1;
  
  // person1의 모든 조상 수집
  const ancestors1 = getAllAncestors(person1);
  
  // person2에서 위로 올라가면서 공통 조상 찾기
  let current = person2;
  let visited = new Set();
  
  while (current && !visited.has(current.name)) {
    visited.add(current.name);
    
    // person1의 조상에 있으면 공통 조상
    if (ancestors1.has(current.name)) {
      return current;
    }
    
    // 부모로 이동
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    current = father || mother;
  }
  
  return null; // 공통 조상을 찾을 수 없음
}

// 3. 모든 조상 수집 함수
function getAllAncestors(person) {
  const ancestors = new Set();
  let current = person;
  let visited = new Set();
  
  while (current && !visited.has(current.name)) {
    visited.add(current.name);
    ancestors.add(current.name);
    
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    current = father || mother;
  }
  
  return ancestors;
}

// 4. 조상까지 거리 계산 함수
function getDistanceToAncestor(person, ancestor) {
  if (!person || !ancestor) return -1;
  
  // 같은 사람이면 0
  if (person.name === ancestor.name) return 0;
  
  let distance = 0;
  let current = person;
  let visited = new Set();
  
  // 위로 올라가면서 조상 찾기
  while (current && distance < 20 && !visited.has(current.name)) {
    visited.add(current.name);
    
    // 조상을 찾았으면 거리 반환
    if (current.name === ancestor.name) return distance;
    
    // 부모로 이동
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    current = father || mother;
    distance++;
  }
  
  return -1; // 찾을 수 없음
}

// 5. 한양조씨 여부 확인
function isJoFamily(person) {
  return person && person.name.startsWith('조');
}

// 6. 촌수 계산 함수 (올바른 공식)
function calculateChonsu(person1Name, person2Name) {
  console.log(`\n🔍 촌수계산: ${person1Name} vs ${person2Name}`);
  
  const person1 = findPerson(person1Name);
  const person2 = findPerson(person2Name);
  
  if (!person1) {
    console.log(`❌ ${person1Name}을 찾을 수 없습니다.`);
    return null;
  }
  
  if (!person2) {
    console.log(`❌ ${person2Name}을 찾을 수 없습니다.`);
    return null;
  }
  
  // 같은 사람
  if (person1.name === person2.name) {
    return { chonsu: 0, title: "본인", type: "self" };
  }
  
  // 한양조씨가 아닌 경우 처리
  const isPerson1Jo = isJoFamily(person1);
  const isPerson2Jo = isJoFamily(person2);
  
  if (!isPerson1Jo && !isPerson2Jo) {
    console.log(`❌ 둘 다 한양조씨가 아닙니다.`);
    return null;
  }
  
  // 한양조씨가 아닌 사람의 경우, 조씨 부모를 찾아서 계산
  let targetPerson1 = person1;
  let targetPerson2 = person2;
  let isExternal1 = false;
  let isExternal2 = false;
  
  if (!isPerson1Jo) {
    const joMother = findPerson(person1.relationships?.mother);
    if (joMother && isJoFamily(joMother)) {
      targetPerson1 = joMother;
      isExternal1 = true;
      console.log(`📝 ${person1Name}은 조씨가 아니므로 어머니 ${joMother.name}으로 계산`);
    } else {
      console.log(`❌ ${person1Name}의 조씨 부모를 찾을 수 없습니다.`);
      return null;
    }
  }
  
  if (!isPerson2Jo) {
    const joMother = findPerson(person2.relationships?.mother);
    if (joMother && isJoFamily(joMother)) {
      targetPerson2 = joMother;
      isExternal2 = true;
      console.log(`📝 ${person2Name}은 조씨가 아니므로 어머니 ${joMother.name}으로 계산`);
    } else {
      console.log(`❌ ${person2Name}의 조씨 부모를 찾을 수 없습니다.`);
      return null;
    }
  }
  
  // 공통 조상 찾기
  const commonAncestor = findCommonAncestor(targetPerson1, targetPerson2);
  
  if (!commonAncestor) {
    console.log(`❌ 공통 조상을 찾을 수 없습니다.`);
    return null;
  }
  
  console.log(`📋 공통 조상: ${commonAncestor.name}`);
  
  // 각자에서 공통 조상까지의 거리
  const distance1 = getDistanceToAncestor(targetPerson1, commonAncestor);
  const distance2 = getDistanceToAncestor(targetPerson2, commonAncestor);
  
  console.log(`📏 ${targetPerson1.name} → 공통조상: ${distance1}세대`);
  console.log(`📏 ${targetPerson2.name} → 공통조상: ${distance2}세대`);
  
  if (distance1 === -1 || distance2 === -1) {
    console.log(`❌ 공통 조상까지 연결되지 않습니다.`);
    return null;
  }
  
  // 촌수 계산 (올바른 공식)
  let chonsu = distance1 + distance2;
  
  // 외자 촌수 처리
  if (isExternal1) chonsu += 1;
  if (isExternal2) chonsu += 1;
  
  // 호칭 생성
  const title = generateTitle(targetPerson1, targetPerson2, distance1, distance2, isExternal1, isExternal2);
  
  console.log(`✅ 촌수: ${chonsu}촌, 호칭: ${title}`);
  
  return {
    chonsu: chonsu,
    title: title,
    type: "relative",
    person1: person1.name,
    person2: person2.name,
    targetPerson1: targetPerson1.name,
    targetPerson2: targetPerson2.name,
    commonAncestor: commonAncestor.name,
    distance1: distance1,
    distance2: distance2,
    isExternal1: isExternal1,
    isExternal2: isExternal2
  };
}

// 7. 호칭 생성 함수
function generateTitle(person1, person2, distance1, distance2, isExternal1, isExternal2) {
  // 외자 처리
  let prefix = "";
  if (isExternal1 || isExternal2) {
    prefix = "외";
  }
  
  // 같은 세대 (공통 조상에서 같은 거리)
  if (distance1 === distance2) {
    if (distance1 === 1) return prefix + "형제/자매";
    if (distance1 === 2) return prefix + "사촌";
    if (distance1 === 3) return prefix + "육촌";
    return prefix + `${distance1}촌`;
  }
  
  // 다른 세대 (위아래 관계)
  const gap = Math.abs(distance1 - distance2);
  
  if (gap === 1) {
    if (distance1 === 1 || distance2 === 1) return prefix + "부모/자식";
    if (distance1 === 2 || distance2 === 2) return prefix + "삼촌/조카";
    return prefix + "상하 관계";
  }
  
  return prefix + `${Math.min(distance1, distance2)}촌 ${gap}세대 차이`;
}

// 8. 시뮬레이션 테스트 함수
function runSimulation() {
  console.log('\n🧪 촌수계산 시뮬레이션 시작...');
  
  // 테스트 케이스들
  const testCases = [
    // 형제 관계 (아버지가 같음)
    { person1: "조영하", person2: "조명하", expected: "형제" },
    
    // 부모-자식 관계
    { person1: "조병희", person2: "조영하", expected: "부모/자식" },
    
    // 사촌 관계
    { person1: "조영하", person2: "조세희", expected: "사촌" },
    
    // 외자 관계
    { person1: "강동민", person2: "조영하", expected: "외" }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n--- 테스트 ${index + 1} ---`);
    const result = calculateChonsu(testCase.person1, testCase.person2);
    
    if (result) {
      console.log(`예상: ${testCase.expected}`);
      console.log(`실제: ${result.title} (${result.chonsu}촌)`);
      console.log(`결과: ${result.title.includes(testCase.expected) ? '✅' : '❌'}`);
    }
  });
}

// 9. 메인 실행
console.log('🚀 촌수계산 함수 개발 완료!');
console.log('올바른 공식: (A→공통조상) + (B→공통조상)');

// 시뮬레이션 실행
runSimulation();

// 함수 내보내기
module.exports = {
  calculateChonsu,
  findPerson,
  findCommonAncestor,
  getDistanceToAncestor,
  isJoFamily,
  generateTitle
};
