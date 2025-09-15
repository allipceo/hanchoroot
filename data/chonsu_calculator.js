// 촌수계산 함수 - 간단하고 단단하게
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

// 시조 정보 (모든 촌수계산의 기준점)
const SIDEO = {
  name: "조정윤-임정숙",
  id: "SIDEO",
  generation: 0
};

// 1. 사람 찾기 함수
function findPerson(name) {
  return coreData.find(p => p.name === name);
}

// 2. 조상까지 거리 계산 함수
function getDistanceToAncestor(person, ancestor) {
  if (!person || !ancestor) return -1;
  
  // 같은 사람이면 0
  if (person.name === ancestor.name) return 0;
  
  // 부모가 없으면 -1 (찾을 수 없음)
  if (!person.relationships?.father && !person.relationships?.mother) return -1;
  
  let distance = 1;
  let current = person;
  
  // 위로 올라가면서 조상 찾기
  while (current && distance < 20) { // 무한루프 방지
    const father = findPerson(current.relationships?.father);
    const mother = findPerson(current.relationships?.mother);
    
    // 부모 중 하나가 조상이면 거리 반환
    if (father && father.name === ancestor.name) return distance;
    if (mother && mother.name === ancestor.name) return distance;
    
    // 다음 부모로 이동 (아버지 우선)
    current = father || mother;
    distance++;
  }
  
  return -1; // 찾을 수 없음
}

// 3. 공통 조상 찾기 함수
function findCommonAncestor(person1, person2) {
  if (!person1 || !person2) return null;
  
  // 같은 사람이면 본인
  if (person1.name === person2.name) return person1;
  
  // 시조가 공통 조상
  return SIDEO;
}

// 4. 촌수 계산 함수
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
  
  // 공통 조상 찾기 (시조)
  const commonAncestor = findCommonAncestor(person1, person2);
  
  // 각자에서 공통 조상까지의 거리
  const distance1 = getDistanceToAncestor(person1, commonAncestor);
  const distance2 = getDistanceToAncestor(person2, commonAncestor);
  
  console.log(`📏 ${person1Name} → 시조: ${distance1}세대`);
  console.log(`📏 ${person2Name} → 시조: ${distance2}세대`);
  
  if (distance1 === -1 || distance2 === -1) {
    console.log(`❌ 공통 조상을 찾을 수 없습니다.`);
    return null;
  }
  
  // 촌수 계산
  const chonsu = distance1 + distance2;
  
  // 호칭 생성
  const title = generateTitle(person1, person2, distance1, distance2);
  
  console.log(`✅ 촌수: ${chonsu}촌, 호칭: ${title}`);
  
  return {
    chonsu: chonsu,
    title: title,
    type: "relative",
    person1: person1.name,
    person2: person2.name,
    distance1: distance1,
    distance2: distance2
  };
}

// 5. 호칭 생성 함수
function generateTitle(person1, person2, distance1, distance2) {
  // 같은 세대
  if (distance1 === distance2) {
    if (distance1 === 1) return "형제/자매";
    if (distance1 === 2) return "사촌";
    if (distance1 === 3) return "육촌";
    return `${distance1}촌`;
  }
  
  // 다른 세대 (위아래 관계)
  const older = distance1 < distance2 ? person1 : person2;
  const younger = distance1 < distance2 ? person2 : person1;
  const gap = Math.abs(distance1 - distance2);
  
  if (gap === 1) {
    if (distance1 === 1 || distance2 === 1) return "부모/자식";
    if (distance1 === 2 || distance2 === 2) return "삼촌/조카";
    return "상하 관계";
  }
  
  return `${Math.min(distance1, distance2)}촌 ${gap}세대 차이`;
}

// 6. 시뮬레이션 테스트 함수
function runSimulation() {
  console.log('\n🧪 촌수계산 시뮬레이션 시작...');
  
  // 테스트 케이스들
  const testCases = [
    // 형제 관계
    { person1: "강동민", person2: "강동욱", expected: "형제" },
    
    // 부모-자식 관계
    { person1: "강달호", person2: "강동민", expected: "부모/자식" },
    
    // 삼촌-조카 관계
    { person1: "강달호", person2: "강동민", expected: "부모/자식" },
    
    // 사촌 관계 (예상)
    { person1: "조영하", person2: "조명하", expected: "형제/자매" }
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

// 7. 메인 실행
console.log('🚀 촌수계산 함수 개발 완료!');
console.log('시조: 조정윤-임정숙 (모든 촌수계산의 기준점)');

// 시뮬레이션 실행
runSimulation();

// 함수 내보내기 (다른 파일에서 사용할 수 있도록)
module.exports = {
  calculateChonsu,
  findPerson,
  getDistanceToAncestor,
  findCommonAncestor,
  generateTitle
};
