// 조상 관계 디버깅 - 시조까지 연결 확인
const fs = require('fs');

// 데이터 로드
let coreData;
try {
  const content = fs.readFileSync('window_core_data.js', 'utf8');
  const match = content.match(/window\.CORE_DATA = (\[[\s\S]*\]);/);
  if (match) {
    coreData = JSON.parse(match[1]);
  }
} catch (error) {
  console.log('❌ 데이터 로드 실패:', error.message);
  process.exit(1);
}

// 조상 추적 함수
function traceAncestry(personName, maxDepth = 10) {
  console.log(`\n🔍 ${personName}의 조상 추적:`);
  
  const person = coreData.find(p => p.name === personName);
  if (!person) {
    console.log(`❌ ${personName}을 찾을 수 없습니다.`);
    return;
  }
  
  let current = person;
  let depth = 0;
  
  while (current && depth < maxDepth) {
    console.log(`${'  '.repeat(depth)}${depth + 1}세대: ${current.name} (${current.id})`);
    
    const father = coreData.find(p => p.name === current.relationships?.father);
    const mother = coreData.find(p => p.name === current.relationships?.mother);
    
    if (father) {
      console.log(`${'  '.repeat(depth + 1)}아버지: ${father.name}`);
    } else {
      console.log(`${'  '.repeat(depth + 1)}아버지: 없음`);
    }
    
    if (mother) {
      console.log(`${'  '.repeat(depth + 1)}어머니: ${mother.name}`);
    } else {
      console.log(`${'  '.repeat(depth + 1)}어머니: 없음`);
    }
    
    // 다음 부모로 이동
    current = father || mother;
    depth++;
  }
  
  if (depth >= maxDepth) {
    console.log(`⚠️ 최대 깊이(${maxDepth})에 도달했습니다.`);
  }
}

// 시조 관련 인물 찾기
function findSideoRelated() {
  console.log('\n🔍 시조 관련 인물 찾기:');
  
  const sideoRelated = coreData.filter(p => 
    p.name.includes('조정윤') || 
    p.name.includes('임정숙') ||
    p.name.includes('시조')
  );
  
  if (sideoRelated.length > 0) {
    console.log('시조 관련 인물:');
    sideoRelated.forEach(person => {
      console.log(`- ${person.name} (${person.id})`);
    });
  } else {
    console.log('❌ 시조 관련 인물을 찾을 수 없습니다.');
  }
}

// 조씨 성을 가진 사람들 확인
function findJoFamily() {
  console.log('\n🔍 조씨 성을 가진 사람들:');
  
  const joFamily = coreData.filter(p => p.name.startsWith('조'));
  console.log(`총 ${joFamily.length}명의 조씨:`);
  
  joFamily.slice(0, 10).forEach(person => {
    console.log(`- ${person.name} (${person.id}) - 부모: ${person.relationships?.father || '없음'}`);
  });
  
  if (joFamily.length > 10) {
    console.log(`... 외 ${joFamily.length - 10}명`);
  }
}

// 테스트 실행
console.log('🔍 조상 관계 디버깅 시작...');

// 1. 시조 관련 인물 찾기
findSideoRelated();

// 2. 조씨 성을 가진 사람들 확인
findJoFamily();

// 3. 몇 명의 조상 추적
const testPersons = ['조영하', '조명하', '강동민'];
testPersons.forEach(personName => {
  const person = coreData.find(p => p.name === personName);
  if (person) {
    traceAncestry(personName);
  }
});
