// 실제 152명 데이터를 브라우저용으로 변환하는 스크립트

const fs = require('fs');

// 실제 데이터 로드 (수정된 최종 데이터)
const notionData = JSON.parse(fs.readFileSync('./converted_complete_data_final.json', 'utf8'));

// Line별 분류 함수
function classifyByLine(persons) {
  const byLine = {
    Line1: [],
    Line2: [],
    Line3: [],
    공통: []
  };

  persons.forEach(person => {
    const line = person.line || '공통';
    if (byLine[line]) {
      byLine[line].push(person);
    } else {
      byLine.공통.push(person);
    }
  });

  return byLine;
}

// 세대별 분류 함수
function classifyByGeneration(persons) {
  const byGeneration = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

  persons.forEach(person => {
    const generation = person.generation;
    if (byGeneration[generation]) {
      byGeneration[generation].push(person);
    }
  });

  return byGeneration;
}

// 통계 정보 생성 함수
function generateStatistics(persons) {
  const stats = {
    total: persons.length,
    byLine: {},
    byGeneration: {},
    byGender: { M: 0, F: 0 },
    byStatus: { alive: 0, deceased: 0 }
  };

  // Line별 통계
  const byLine = classifyByLine(persons);
  Object.keys(byLine).forEach(line => {
    stats.byLine[line] = byLine[line].length;
  });

  // 세대별 통계
  const byGeneration = classifyByGeneration(persons);
  Object.keys(byGeneration).forEach(gen => {
    stats.byGeneration[gen] = byGeneration[gen].length;
  });

  // 성별 통계
  persons.forEach(person => {
    if (person.gender === 'M') stats.byGender.M++;
    if (person.gender === 'F') stats.byGender.F++;
  });

  // 상태별 통계
  persons.forEach(person => {
    if (person.status === 'alive') stats.byStatus.alive++;
    if (person.status === 'deceased') stats.byStatus.deceased++;
  });

  return stats;
}

// 브라우저용 데이터 생성
const FAMILY_DATA_BROWSER = {
  persons: notionData.persons,
  byLine: classifyByLine(notionData.persons),
  byGeneration: classifyByGeneration(notionData.persons),
  statistics: generateStatistics(notionData.persons)
};

// 브라우저용 JavaScript 파일 생성
const browserDataContent = `// 브라우저용 패밀리 데이터 (실제 152명 데이터)
// 자동 생성됨: ${new Date().toISOString()}

const FAMILY_DATA_BROWSER = ${JSON.stringify(FAMILY_DATA_BROWSER, null, 2)};

// 전역으로 노출
window.FAMILY_DATA_BROWSER = FAMILY_DATA_BROWSER;

console.log('브라우저용 패밀리 데이터 로드 완료:', FAMILY_DATA_BROWSER);
console.log('총 ${FAMILY_DATA_BROWSER.persons.length}명의 데이터 로드됨');
console.log('Line별 분포:', FAMILY_DATA_BROWSER.statistics.byLine);
console.log('세대별 분포:', FAMILY_DATA_BROWSER.statistics.byGeneration);
`;

// 파일 저장
fs.writeFileSync('./family_data_browser.js', browserDataContent, 'utf8');

console.log('브라우저용 데이터 파일 생성 완료: family_data_browser.js');
console.log(`총 ${FAMILY_DATA_BROWSER.persons.length}명의 데이터 포함`);
console.log('Line별 분포:', FAMILY_DATA_BROWSER.statistics.byLine);
console.log('세대별 분포:', FAMILY_DATA_BROWSER.statistics.byGeneration);
