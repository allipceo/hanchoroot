// 촌수계산 함수 - 친가/외가 구분 완성
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

// 2. 공통 조상 찾기 함수
function findCommonAncestor(person1, person2) {
  if (!person1 || !person2) return null;
  
  if (person1.name === person2.name) return person1;
  
  const ancestors1 = getAllAncestors(person1);
  
  let current = person2;
  let visited = new Set();
  
  while (current && !visited.has(current.name)) {
    visited.add(current.name);
    
    if (ancestors1.has(current.name)) {
      return current;
    }
    
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    current = father || mother;
  }
  
  return null;
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
  
  if (person.name === ancestor.name) return 0;
  
  let distance = 0;
  let current = person;
  let visited = new Set();
  
  while (current && distance < 20 && !visited.has(current.name)) {
    visited.add(current.name);
    
    if (current.name === ancestor.name) return distance;
    
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    current = father || mother;
    distance++;
  }
  
  return -1;
}

// 5. 한양조씨 여부 확인
function isJoFamily(person) {
  return person && person.name.startsWith('조');
}

// 6. 친가/외가 구분 함수
function determineFamilySide(person1, person2, commonAncestor) {
  // person1에서 공통조상까지의 경로에서 아버지/어머니 구분
  let current = person1;
  let path1 = [];
  
  while (current && current.name !== commonAncestor.name) {
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    
    if (father && father.name === commonAncestor.name) {
      path1.push('father');
      break;
    } else if (mother && mother.name === commonAncestor.name) {
      path1.push('mother');
      break;
    } else if (father) {
      path1.push('father');
      current = father;
    } else if (mother) {
      path1.push('mother');
      current = mother;
    } else {
      break;
    }
  }
  
  // person2에서 공통조상까지의 경로에서 아버지/어머니 구분
  current = person2;
  let path2 = [];
  
  while (current && current.name !== commonAncestor.name) {
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    
    if (father && father.name === commonAncestor.name) {
      path2.push('father');
      break;
    } else if (mother && mother.name === commonAncestor.name) {
      path2.push('mother');
      break;
    } else if (father) {
      path2.push('father');
      current = father;
    } else if (mother) {
      path2.push('mother');
      current = mother;
    } else {
      break;
    }
  }
  
  // 친가/외가 구분
  const isChin = path1.includes('father') && path2.includes('father');
  const isOe = path1.includes('mother') || path2.includes('mother');
  
  return { isChin, isOe, path1, path2 };
}

// 7. 촌수 계산 함수 (친가/외가 구분 포함)
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
  
  // 촌수 계산
  let chonsu = distance1 + distance2;
  
  // 외자 촌수 처리
  if (isExternal1) chonsu += 1;
  if (isExternal2) chonsu += 1;
  
  // 친가/외가 구분
  const familySide = determineFamilySide(targetPerson1, targetPerson2, commonAncestor);
  
  // 호칭 생성 (친가/외가 구분 포함)
  const title = generateTitleWithFamilySide(targetPerson1, targetPerson2, distance1, distance2, isExternal1, isExternal2, familySide);
  
  console.log(`✅ 촌수: ${chonsu}촌, 호칭: ${title}`);
  console.log(`📋 친가/외가: ${familySide.isChin ? '친가' : familySide.isOe ? '외가' : '혼합'}`);
  
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
    isExternal2: isExternal2,
    familySide: familySide
  };
}

// 8. 호칭 생성 함수 (친가/외가 구분 포함)
function generateTitleWithFamilySide(person1, person2, distance1, distance2, isExternal1, isExternal2, familySide) {
  // 외자 처리
  let prefix = "";
  if (isExternal1 || isExternal2) {
    prefix = "외";
  }
  
  // 친가/외가 구분
  let familyPrefix = "";
  if (familySide.isChin && !familySide.isOe) {
    familyPrefix = "친";
  } else if (familySide.isOe && !familySide.isChin) {
    familyPrefix = "외";
  }
  
  // 같은 세대
  if (distance1 === distance2) {
    if (distance1 === 1) return familyPrefix + "형제/자매";
    if (distance1 === 2) return familyPrefix + "사촌";
    if (distance1 === 3) return familyPrefix + "육촌";
    return familyPrefix + `${distance1}촌`;
  }
  
  // 다른 세대 (위아래 관계)
  const gap = Math.abs(distance1 - distance2);
  
  if (gap === 1) {
    if (distance1 === 1 || distance2 === 1) return familyPrefix + "부모/자식";
    if (distance1 === 2 || distance2 === 2) return familyPrefix + "삼촌/조카";
    return familyPrefix + "상하 관계";
  }
  
  return familyPrefix + `${Math.min(distance1, distance2)}촌 ${gap}세대 차이`;
}

// 9. 시뮬레이션 테스트 함수
function runSimulation() {
  console.log('\n🧪 친가/외가 구분 촌수계산 시뮬레이션...');
  
  const testCases = [
    // 형제 관계
    { person1: "조영하", person2: "조명하", expected: "형제" },
    
    // 부모-자식 관계
    { person1: "조병희", person2: "조영하", expected: "부모/자식" },
    
    // 사촌 관계
    { person1: "조영하", person2: "조세희", expected: "사촌" }
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

// 10. 메인 실행
console.log('🚀 친가/외가 구분 촌수계산 함수 완성!');
console.log('호칭: 친삼촌, 외삼촌, 친사촌, 외사촌 등');

// 시뮬레이션 실행
runSimulation();

// 함수 내보내기
module.exports = {
  calculateChonsu,
  findPerson,
  findCommonAncestor,
  getDistanceToAncestor,
  isJoFamily,
  determineFamilySide,
  generateTitleWithFamilySide
};
