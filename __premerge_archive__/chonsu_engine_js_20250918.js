// Backup of js/chonsu_engine.js on 2025-09-18
// 한양조씨 족보 촌수계산 엔진 v1.0 (브라우저 배포본)

class ChonsuCalculator {
    constructor() {
        this.data = null;
        this.founder = "조정윤";
        this.founderSpouse = "임정숙";
    }

    loadData() {
        if (typeof window !== 'undefined' && window.CORE_DATA) {
            this.data = window.CORE_DATA;
            console.log(`촌수계산 엔진: ${this.data.length}명 데이터 로드 완료`);
            return true;
        }
        console.error("window.CORE_DATA를 찾을 수 없습니다.");
        return false;
    }

    findPersonById(id) {
        if (!this.data) return null;
        return this.data.find(person => person.id === id);
    }

    findPersonByName(name) {
        if (!this.data) return null;
        return this.data.find(person => person.name === name);
    }

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

    findCommonAncestor(id1, id2) {
        const ancestors1 = this.findAncestors(id1);
        const ancestors2 = this.findAncestors(id2);
        ancestors1.push({ id: "founder", name: this.founder });
        ancestors2.push({ id: "founder", name: this.founder });

        for (let i = 0; i < ancestors1.length; i++) {
            for (let j = 0; j < ancestors2.length; j++) {
                if (ancestors1[i].id === ancestors2[j].id) {
                    return { ancestor: ancestors1[i], distance1: i, distance2: j };
                }
            }
        }
        return null;
    }

    calculateChonsu(id1, id2) {
        const person1 = this.findPersonById(id1);
        const person2 = this.findPersonById(id2);
        if (!person1 || !person2) return { error: "사람을 찾을 수 없습니다." };
        if (id1 === id2) return { chonsu: 0, title: "본인", relationship: "self" };

        const isP1ChildOfP2 = (person1.relationships && (person1.relationships.father === person2.name || person1.relationships.mother === person2.name));
        const isP2ChildOfP1 = (person2.relationships && (person2.relationships.father === person1.name || person2.relationships.mother === person1.name));
        if (isP1ChildOfP2 || isP2ChildOfP1) {
            return { chonsu: 1, title: isP1ChildOfP2 ? "자" : "부", relationship: "parent-child" };
        }

        const commonAncestor = this.findCommonAncestor(id1, id2);
        if (!commonAncestor) return { error: "공통조상을 찾을 수 없습니다." };

        let chonsu = (commonAncestor.distance1 + 1) + (commonAncestor.distance2 + 1);
        const title = this.generateTitle(chonsu, commonAncestor.distance1, commonAncestor.distance2);
        return { chonsu, title, relationship: "relative", commonAncestor: commonAncestor.ancestor.name, distance1: commonAncestor.distance1, distance2: commonAncestor.distance2 };
    }

    generateTitle(chonsu) {
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
}

if (typeof window !== 'undefined') {
    window.ChonsuCalculator = ChonsuCalculator;
}


