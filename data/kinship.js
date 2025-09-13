// 촌수 계산 데이터 모듈 V3.0
// 3단계 촌수 계산 기능을 위한 데이터 구조

const KINSHIP_DATA = {
  // 촌수 매트릭스 (사전 계산된 관계)
  kinshipMatrix: {
    // 형제 관계
    "p_001_p_002": { // 조은상 - 조원상
      degree: 1,
      relation: "형제",
      path: ["p_001", "p_003", "p_002"],
      commonAncestor: "p_003",
      honorific: "형님/동생"
    },
    
    // 부자 관계
    "p_001_p_003": { // 조은상 - 조대하
      degree: 1,
      relation: "부자",
      path: ["p_001", "p_003"],
      commonAncestor: "p_003",
      honorific: "아버지/아들"
    },
    "p_002_p_003": { // 조원상 - 조대하
      degree: 1,
      relation: "부자",
      path: ["p_002", "p_003"],
      commonAncestor: "p_003",
      honorific: "아버지/아들"
    },
    
    // 모자 관계
    "p_001_p_004": { // 조은상 - 조광희
      degree: 1,
      relation: "모자",
      path: ["p_001", "p_004"],
      commonAncestor: "p_004",
      honorific: "어머니/아들"
    },
    "p_002_p_004": { // 조원상 - 조광희
      degree: 1,
      relation: "모자",
      path: ["p_002", "p_004"],
      commonAncestor: "p_004",
      honorific: "어머니/아들"
    },
    
    // 조부손 관계
    "p_001_p_005": { // 조은상 - 조영희
      degree: 2,
      relation: "조부손",
      path: ["p_001", "p_003", "p_005"],
      commonAncestor: "p_005",
      honorific: "할아버지/손자"
    },
    "p_002_p_005": { // 조원상 - 조영희
      degree: 2,
      relation: "조부손",
      path: ["p_002", "p_003", "p_005"],
      commonAncestor: "p_005",
      honorific: "할아버지/손자"
    }
  },

  // 관계 계산 규칙 (간결한 구현)
  kinshipRules: {
    "부자": { degree: 1, honorific: "아버지/아들" },
    "모자": { degree: 1, honorific: "어머니/아들" },
    "부녀": { degree: 1, honorific: "아버지/딸" },
    "모녀": { degree: 1, honorific: "어머니/딸" },
    "형제": { degree: 1, honorific: "형님/동생" },
    "자매": { degree: 1, honorific: "언니/동생" },
    "조부손": { degree: 2, honorific: "할아버지/손자" },
    "조모손": { degree: 2, honorific: "할머니/손자" },
    "조부녀": { degree: 2, honorific: "할아버지/손녀" },
    "조모녀": { degree: 2, honorific: "할머니/손녀" },
    "증조부손": { degree: 3, honorific: "증조할아버지/증손자" },
    "증조모손": { degree: 3, honorific: "증조할머니/증손자" }
  },

  // 계산 히스토리
  calculationHistory: {
    recent: [
      { 
        person1: "조은상", 
        person2: "조원상", 
        result: "1촌 형제", 
        timestamp: "2025-09-13T21:30:00Z" 
      }
    ],
    maxHistory: 10
  }
};

// 촌수 계산 클래스 (Lego Block 방식)
class KinshipCalculator {
  constructor() {
    this.data = KINSHIP_DATA;
    this.persons = null; // Core Module에서 로드
  }

  // Core Module 데이터 로드
  loadPersonsData(personsData) {
    this.persons = personsData;
    console.log("촌수 계산 데이터 로드 완료");
  }

  // 촌수 계산 (핵심 함수)
  calculateKinship(person1Id, person2Id) {
    if (!this.persons) {
      throw new Error("인물 데이터가 로드되지 않았습니다.");
    }

    // 같은 사람인지 확인
    if (person1Id === person2Id) {
      return {
        person1: this.getPerson(person1Id),
        person2: this.getPerson(person2Id),
        relationship: {
          degree: 0,
          relation: "본인",
          honorific: "본인",
          path: [person1Id],
          commonAncestor: person1Id
        },
        calculationTime: new Date().toISOString()
      };
    }

    // 사전 계산된 관계 확인
    const matrixKey1 = `${person1Id}_${person2Id}`;
    const matrixKey2 = `${person2Id}_${person1Id}`;
    
    if (this.data.kinshipMatrix[matrixKey1]) {
      return this.createResult(person1Id, person2Id, this.data.kinshipMatrix[matrixKey1]);
    }
    
    if (this.data.kinshipMatrix[matrixKey2]) {
      return this.createResult(person1Id, person2Id, this.data.kinshipMatrix[matrixKey2]);
    }

    // 동적 계산 (간결한 구현)
    return this.calculateDynamic(person1Id, person2Id);
  }

  // 동적 촌수 계산 (간결한 구현)
  calculateDynamic(person1Id, person2Id) {
    const person1 = this.getPerson(person1Id);
    const person2 = this.getPerson(person2Id);
    
    if (!person1 || !person2) {
      throw new Error("인물을 찾을 수 없습니다.");
    }

    // 공통 조상 찾기
    const commonAncestor = this.findCommonAncestor(person1Id, person2Id);
    
    if (!commonAncestor) {
      return {
        person1: person1,
        person2: person2,
        relationship: {
          degree: -1,
          relation: "관계없음",
          honorific: "관계없음",
          path: [],
          commonAncestor: null
        },
        calculationTime: new Date().toISOString()
      };
    }

    // 촌수 계산
    const path1 = this.getPathToAncestor(person1Id, commonAncestor);
    const path2 = this.getPathToAncestor(person2Id, commonAncestor);
    const degree = Math.max(path1.length, path2.length) - 1;

    // 관계 및 호칭 결정
    const relation = this.determineRelation(path1, path2);
    const honorific = this.determineHonorific(relation, person1.gender, person2.gender);

    return {
      person1: person1,
      person2: person2,
      relationship: {
        degree: degree,
        relation: relation,
        honorific: honorific,
        path: [...path1, ...path2.reverse()],
        commonAncestor: commonAncestor
      },
      calculationTime: new Date().toISOString()
    };
  }

  // 공통 조상 찾기 (간결한 구현)
  findCommonAncestor(person1Id, person2Id) {
    const ancestors1 = this.getAllAncestors(person1Id);
    const ancestors2 = this.getAllAncestors(person2Id);
    
    for (const ancestor of ancestors1) {
      if (ancestors2.includes(ancestor)) {
        return ancestor;
      }
    }
    
    return null;
  }

  // 모든 조상 가져오기
  getAllAncestors(personId) {
    const ancestors = [];
    const person = this.getPerson(personId);
    
    if (!person) return ancestors;
    
    // 부모 추가
    if (person.relationships.father) {
      ancestors.push(person.relationships.father);
      ancestors.push(...this.getAllAncestors(person.relationships.father));
    }
    
    if (person.relationships.mother) {
      ancestors.push(person.relationships.mother);
      ancestors.push(...this.getAllAncestors(person.relationships.mother));
    }
    
    return [...new Set(ancestors)]; // 중복 제거
  }

  // 조상까지의 경로 가져오기
  getPathToAncestor(personId, ancestorId) {
    const path = [];
    let current = personId;
    
    while (current && current !== ancestorId) {
      path.push(current);
      const person = this.getPerson(current);
      if (person && person.relationships.father) {
        current = person.relationships.father;
      } else if (person && person.relationships.mother) {
        current = person.relationships.mother;
      } else {
        break;
      }
    }
    
    if (current === ancestorId) {
      path.push(ancestorId);
    }
    
    return path;
  }

  // 관계 결정 (간결한 구현)
  determineRelation(path1, path2) {
    if (path1.length === 1 && path2.length === 1) {
      return "형제";
    } else if (path1.length === 1 && path2.length === 2) {
      return "부자";
    } else if (path1.length === 2 && path2.length === 1) {
      return "부자";
    } else if (path1.length === 2 && path2.length === 2) {
      return "조부손";
    } else {
      return "기타";
    }
  }

  // 호칭 결정 (간결한 구현)
  determineHonorific(relation, gender1, gender2) {
    const rules = this.data.kinshipRules[relation];
    if (rules) {
      return rules.honorific;
    }
    return "기타";
  }

  // 결과 생성
  createResult(person1Id, person2Id, relationship) {
    return {
      person1: this.getPerson(person1Id),
      person2: this.getPerson(person2Id),
      relationship: relationship,
      calculationTime: new Date().toISOString()
    };
  }

  // 인물 정보 가져오기
  getPerson(personId) {
    return this.persons?.find(p => p.id === personId);
  }

  // 계산 히스토리 추가
  addCalculationHistory(person1, person2, result) {
    const history = this.data.calculationHistory;
    const newEntry = {
      person1: person1.name,
      person2: person2.name,
      result: `${result.relationship.degree}촌 ${result.relationship.relation}`,
      timestamp: new Date().toISOString()
    };
    
    history.recent.unshift(newEntry);
    
    if (history.recent.length > history.maxHistory) {
      history.recent = history.recent.slice(0, history.maxHistory);
    }
  }

  // 계산 히스토리 가져오기
  getCalculationHistory() {
    return this.data.calculationHistory.recent;
  }
}

// 전역 인스턴스 생성
const kinshipCalculator = new KinshipCalculator();

// 모듈 내보내기 (Node.js 환경 대응)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KINSHIP_DATA, KinshipCalculator, kinshipCalculator };
}
