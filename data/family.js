// 한양조씨 족보앱 Family Module V1.0
// 4단계 패밀리별 보기 전용 데이터 모듈

const fs = require('fs');
const notionData = JSON.parse(fs.readFileSync('./converted_complete_data.json', 'utf8'));

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

// 가족 관계 트리 생성 함수
function buildFamilyTree(persons) {
  const familyTree = {
    generation1: {},
    generation2: {},
    generation3: {},
    generation4: {},
    generation5: {},
    generation6: {}
  };

  // 1세대부터 6세대까지 순차적으로 처리
  for (let gen = 1; gen <= 6; gen++) {
    const generationPersons = persons.filter(p => p.generation === gen);
    
    generationPersons.forEach(person => {
      const personKey = person.name;
      familyTree[`generation${gen}`][personKey] = {
        id: person.id,
        name: person.name,
        hanja: person.hanja,
        generation: person.generation,
        line: person.line,
        gender: person.gender,
        status: person.status,
        children: [],
        spouses: [],
        parents: []
      };

      // 부모 관계 설정
      if (person.father && person.father !== '') {
        familyTree[`generation${gen}`][personKey].parents.push(person.father);
      }
      if (person.mother && person.mother !== '') {
        familyTree[`generation${gen}`][personKey].parents.push(person.mother);
      }

      // 배우자 관계 설정
      if (person.spouse && person.spouse !== '') {
        familyTree[`generation${gen}`][personKey].spouses.push(person.spouse);
      }
    });
  }

  // 자녀 관계 설정 (부모-자녀 관계 역추적)
  for (let gen = 1; gen <= 5; gen++) {
    const currentGenPersons = familyTree[`generation${gen}`];
    const nextGenPersons = familyTree[`generation${gen + 1}`];

    Object.keys(currentGenPersons).forEach(parentName => {
      Object.keys(nextGenPersons).forEach(childName => {
        const child = nextGenPersons[childName];
        if (child.parents.includes(parentName)) {
          currentGenPersons[parentName].children.push(childName);
        }
      });
    });
  }

  return familyTree;
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

// 패밀리별 보기 전용 데이터
const FAMILY_DATA = {
  // 원본 데이터
  persons: notionData.persons,
  
  // Line별 분류
  byLine: classifyByLine(notionData.persons),
  
  // 세대별 분류
  byGeneration: classifyByGeneration(notionData.persons),
  
  // 가족 관계 트리
  familyTree: buildFamilyTree(notionData.persons),
  
  // 통계 정보
  statistics: generateStatistics(notionData.persons)
};

// 패밀리 데이터 로더 클래스
class FamilyDataLoader {
  constructor() {
    this.data = FAMILY_DATA;
    this.loaded = false;
  }

  // 데이터 로드
  load() {
    if (!this.loaded) {
      this.loaded = true;
      console.log("Family Module 데이터 로드 완료");
      console.log(`총 ${this.data.persons.length}명의 데이터 로드됨`);
      console.log(`Line별 분포: Line1(${this.data.byLine.Line1.length}명), Line2(${this.data.byLine.Line2.length}명), Line3(${this.data.byLine.Line3.length}명), 공통(${this.data.byLine.공통.length}명)`);
    }
    return this.data;
  }

  // Line별 인물 조회
  getPersonsByLine(line) {
    return this.data.byLine[line] || [];
  }

  // 세대별 인물 조회
  getPersonsByGeneration(generation) {
    return this.data.byGeneration[generation] || [];
  }

  // Line과 세대 통합 필터링
  getFilteredPersons(line, generation) {
    let filteredPersons = this.data.byLine[line] || [];
    
    if (generation !== 'all' && generation !== null) {
      filteredPersons = filteredPersons.filter(person => 
        person.generation === parseInt(generation)
      );
    }
    
    return filteredPersons;
  }

  // 가족 트리 조회
  getFamilyTree() {
    return this.data.familyTree;
  }

  // 특정 세대의 가족 트리 조회
  getFamilyTreeByGeneration(generation) {
    return this.data.familyTree[`generation${generation}`] || {};
  }

  // 통계 정보 조회
  getStatistics() {
    return this.data.statistics;
  }

  // Line별 통계 조회
  getLineStatistics() {
    return this.data.statistics.byLine;
  }

  // 세대별 통계 조회
  getGenerationStatistics() {
    return this.data.statistics.byGeneration;
  }
}

// 전역 인스턴스 생성
const familyLoader = new FamilyDataLoader();

// 모듈 내보내기 (Node.js 환경 대응)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FAMILY_DATA, FamilyDataLoader, familyLoader };
}
