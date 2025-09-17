// 한양조씨 족보 촌수계산 엔진 v1.0
// 기존 함수 재활용, window.CORE_DATA 단일소스 활용

class ChonsuCalculator {
    constructor() {
        this.data = null;
        this.founder = "조정윤"; // 시조
        this.founderSpouse = "임정숙"; // 시조 배우자
    }

    // window.CORE_DATA 로드
    loadData() {
        if (typeof window !== 'undefined' && window.CORE_DATA) {
            this.data = window.CORE_DATA;
            console.log(`촌수계산 엔진: ${this.data.length}명 데이터 로드 완료`);
            return true;
        }
        console.error("window.CORE_DATA를 찾을 수 없습니다.");
        return false;
    }

    // ID로 사람 찾기
    findPersonById(id) {
        if (!this.data) return null;
        return this.data.find(person => person.id === id);
    }

    // 이름으로 사람 찾기
    findPersonByName(name) {
        if (!this.data) return null;
        return this.data.find(person => person.name === name);
    }

    // 조상 추적 (시조까지)
    findAncestors(personId) {
        const ancestors = [];
        let current = this.findPersonById(personId);
        
        while (current && current.relationships.father) {
            const father = this.findPersonByName(current.relationships.father);
            if (father) {
                ancestors.push(father);
                current = father;
            } else {
                break;
            }
        }
        
        return ancestors;
    }

    // 공통조상 찾기
    findCommonAncestor(id1, id2) {
        const ancestors1 = this.findAncestors(id1);
        const ancestors2 = this.findAncestors(id2);
        
        // 시조를 공통조상으로 추가
        ancestors1.push({ id: "founder", name: this.founder });
        ancestors2.push({ id: "founder", name: this.founder });
        
        // 가장 가까운 공통조상 찾기 (가장 먼저 발견되는 것)
        for (let i = 0; i < ancestors1.length; i++) {
            for (let j = 0; j < ancestors2.length; j++) {
                if (ancestors1[i].id === ancestors2[j].id) {
                    return {
                        ancestor: ancestors1[i],
                        distance1: i,
                        distance2: j
                    };
                }
            }
        }
        
        return null;
    }

    // 촌수 계산
    calculateChonsu(id1, id2) {
        const person1 = this.findPersonById(id1);
        const person2 = this.findPersonById(id2);
        
        if (!person1 || !person2) {
            return { error: "사람을 찾을 수 없습니다." };
        }

        // 같은 사람인 경우
        if (id1 === id2) {
            return { chonsu: 0, title: "본인", relationship: "self" };
        }

        // 부모-자식 관계 확인 (부/모 모두 확인)
        const isP1ChildOfP2 = (person1.relationships && (person1.relationships.father === person2.name || person1.relationships.mother === person2.name));
        const isP2ChildOfP1 = (person2.relationships && (person2.relationships.father === person1.name || person2.relationships.mother === person1.name));
        if (isP1ChildOfP2 || isP2ChildOfP1) {
            return { chonsu: 1, title: isP1ChildOfP2 ? "자" : "부", relationship: "parent-child" };
        }

        // 공통조상 찾기
        const commonAncestor = this.findCommonAncestor(id1, id2);
        if (!commonAncestor) {
            return { error: "공통조상을 찾을 수 없습니다." };
        }

        // 촌수 계산: 각 인덱스는 '조상까지의 간수 - 1'이므로 +1 보정
        // (A→조상 간수) + (B→조상 간수)
        let chonsu = (commonAncestor.distance1 + 1) + (commonAncestor.distance2 + 1);
        
        // 형제/자매 관계 (같은 부모)는 2촌으로 표시
        // (보정 이후 형제는 2로 계산되므로 별도 보정 불필요)
        
        // 호칭 생성
        const title = this.generateTitle(chonsu, commonAncestor.distance1, commonAncestor.distance2);
        
        return {
            chonsu: chonsu,
            title: title,
            relationship: "relative",
            commonAncestor: commonAncestor.ancestor.name,
            distance1: commonAncestor.distance1,
            distance2: commonAncestor.distance2
        };
    }

    // 호칭 생성
    generateTitle(chonsu, distance1, distance2) {
        if (chonsu === 0) return "본인";
        if (chonsu === 1) return "부모/자녀";
        if (chonsu === 2) return "형제/자매";
        if (chonsu === 3) return "삼촌/조카";
        if (chonsu === 4) return "사촌";
        if (chonsu === 5) return "오촌";
        if (chonsu === 6) return "육촌";
        if (chonsu === 7) return "칠촌";
        if (chonsu === 8) return "팔촌";
        
        return `${chonsu}촌`;
    }

    // 테스트 함수
    test() {
        console.log("=== 촌수계산 엔진 테스트 시작 ===");
        
        if (!this.loadData()) {
            console.error("데이터 로드 실패");
            return false;
        }

        // 테스트 케이스들
        const testCases = [
            { name1: "조영하", name2: "조명하", expected: 2 }, // 형제 (조병희의 자녀들)
            { name1: "조정윤", name2: "조병희", expected: 1 }, // 부자
            { name1: "조병희", name2: "조영하", expected: 1 }, // 부자
        ];

        let passed = 0;
        let total = testCases.length;

        testCases.forEach((testCase, index) => {
            const person1 = this.findPersonByName(testCase.name1);
            const person2 = this.findPersonByName(testCase.name2);
            
            if (person1 && person2) {
                const result = this.calculateChonsu(person1.id, person2.id);
                const success = result.chonsu === testCase.expected;
                
                console.log(`테스트 ${index + 1}: ${testCase.name1} ↔ ${testCase.name2}`);
                console.log(`  예상: ${testCase.expected}촌, 실제: ${result.chonsu}촌, 호칭: ${result.title}`);
                console.log(`  결과: ${success ? '✅ 통과' : '❌ 실패'}`);
                
                if (success) passed++;
            } else {
                console.log(`테스트 ${index + 1}: ${testCase.name1} 또는 ${testCase.name2}를 찾을 수 없음`);
            }
        });

        console.log(`=== 테스트 완료: ${passed}/${total} 통과 ===`);
        return passed === total;
    }
}

// 전역 객체로 내보내기
if (typeof window !== 'undefined') {
    window.ChonsuCalculator = ChonsuCalculator;
}

// Node.js 환경에서도 사용 가능하도록
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChonsuCalculator;
}
