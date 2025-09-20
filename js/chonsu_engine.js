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

    getParents(person) {
        if (!person) return [];
        const result = [];
        
        // relationships 필드에서 부모 찾기
        if (person.relationships) {
            if (person.relationships.father) {
                const f = this.findPersonByName(person.relationships.father);
                if (f) result.push({ node: f, viaMother: false });
            }
            if (person.relationships.mother) {
                const m = this.findPersonByName(person.relationships.mother);
                if (m) result.push({ node: m, viaMother: true });
            }
        }
        
        // notes 필드에서 부모 찾기 (기존 함수 재활용)
        if (result.length === 0) {
            const notes = person.additional?.notes || '';
            // "조성원-박선영의 딸" 또는 "조병갑-김명훈의 첫째 아들" 패턴 파싱
            const parentPattern = /(.+)-(.+)의\s*.*?(아들|딸)/;
            const parentMatch = notes.match(parentPattern);
            if (parentMatch) {
                const father = this.findPersonByName(parentMatch[1]);
                const mother = this.findPersonByName(parentMatch[2]);
                if (father) result.push({ node: father, viaMother: false });
                if (mother) result.push({ node: mother, viaMother: true });
            }
        }
        
        return result;
    }

    buildAncestorMap(personId) {
        const start = this.findPersonById(personId);
        const visited = new Map();
        const queue = [];
        if (start) queue.push({ node: start, dist: 0, passedMaternal: false });

        while (queue.length) {
            const { node, dist, passedMaternal } = queue.shift();
            if (!node || visited.has(node.id)) continue;
            visited.set(node.id, { dist, passedMaternal });

            const parents = this.getParents(node);
            parents.forEach(({ node: parent, viaMother }) => {
                queue.push({ node: parent, dist: dist + 1, passedMaternal: passedMaternal || viaMother });
            });
        }
        return visited;
    }

    // 최적 공통조상 찾기(부/모 BFS 교집합 최단합)
    findBestCommon(id1, id2) {
        const ancA = this.buildAncestorMap(id1);
        const ancB = this.buildAncestorMap(id2);
        let best = null;
        ancA.forEach((infoA, pid) => {
            const infoB = ancB.get(pid);
            if (!infoB) return;
            const degree = infoA.dist + infoB.dist;
            if (!best || degree < best.degree) {
                const person = this.findPersonById(pid) || { name: this.founder };
                best = { ancestor: person, distance1: infoA.dist, distance2: infoB.dist, degree, mA: infoA.passedMaternal, mB: infoB.passedMaternal };
            }
        });
        return best;
    }

    // 촌수 계산 (070 업데이트 기준)
    calculateChonsu(id1, id2) {
        const person1 = this.findPersonById(id1);
        const person2 = this.findPersonById(id2);
        
        if (!person1 || !person2) {
            return { error: "사람을 찾을 수 없습니다." };
        }

        // 같은 사람인 경우
        if (id1 === id2) {
            return { chonsu: 0, title: "나", relationship: "self" };
        }

        // 배우자 관계 확인 (070 규칙: 배우자는 0촌)
        if (this.isSpouse(person1, person2)) {
            return { chonsu: 0, title: "배우자", relationship: "spouse" };
        }

        // 공통조상 찾기(부/모 포함 BFS)
        const commonAncestor = this.findBestCommon(id1, id2);
        if (!commonAncestor) {
            return { error: "공통조상을 찾을 수 없습니다." };
        }

        // 촌수 계산: (A→조상) + (B→조상)
        const chonsu = commonAncestor.distance1 + commonAncestor.distance2;
        
        // 조씨/외가 규칙 적용
        const bothCho = this.isChoSurname(person1) && this.isChoSurname(person2);
        const maternalPath = commonAncestor.mA || commonAncestor.mB;
        
        // 규칙 검증: 둘 다 비-조씨이고 모계 경로가 없으면 계산 불가
        if (!bothCho && !maternalPath) {
            return { error: "규칙상 계산 불가(성씨/경로 불일치)" };
        }
        
        // 외가 여부: 모계 경로이고 한쪽이라도 비-조씨인 경우
        const isMaternal = maternalPath && (!bothCho);
        
        // 호칭 생성
        const title = this.formatTitle(chonsu, isMaternal);
        
        return {
            chonsu: chonsu,
            title: title,
            relationship: "relative",
            commonAncestor: commonAncestor.ancestor.name,
            distance1: commonAncestor.distance1,
            distance2: commonAncestor.distance2,
            isMaternal: isMaternal
        };
    }

    // 배우자 관계 확인
    isSpouse(person1, person2) {
        // relationships.spouses 확인
        if (person1.relationships && person1.relationships.spouses && 
            person1.relationships.spouses.includes(person2.name)) {
            return true;
        }
        if (person2.relationships && person2.relationships.spouses && 
            person2.relationships.spouses.includes(person1.name)) {
            return true;
        }
        
        // notes에서 배우자 관계 확인
        const notes1 = person1.additional?.notes || '';
        const notes2 = person2.additional?.notes || '';
        
        if (notes1.includes(`${person2.name}의 부인`) || notes1.includes(`${person2.name}의 남편`)) {
            return true;
        }
        if (notes2.includes(`${person1.name}의 부인`) || notes2.includes(`${person1.name}의 남편`)) {
            return true;
        }
        
        return false;
    }

    // 조씨 성씨 판정 (ID 기반 + 이름 fallback)
    isChoSurname(person) {
        // ID 기반 판정 (L로 시작하는 ID는 한양조씨)
        if (person.id && person.id.startsWith('L')) {
            return true;
        }
        
        // fallback: 이름 기반
        return person.name && person.name.startsWith('조');
    }

    // 호칭 포매터 (070 표준화)
    formatTitle(chonsu, isMaternal) {
        const prefix = isMaternal ? "외" : "";
        
        switch (chonsu) {
            case 0: return "나";
            case 1: return prefix + "부모/자녀";
            case 2: return prefix + "형제/자매";
            case 3: return prefix + "삼촌/조카";
            case 4: return prefix + "사촌";
            case 5: return prefix + "오촌";
            case 6: return prefix + "육촌";
            case 7: return prefix + "칠촌";
            case 8: return prefix + "팔촌";
            default: return prefix + `${chonsu}촌`;
        }
    }

    // 레거시 호칭 생성 (하위 호환)
    generateTitle(chonsu, distance1, distance2, isMaternal) {
        return this.formatTitle(chonsu, isMaternal);
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
