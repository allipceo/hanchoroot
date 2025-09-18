// 촌수계산 종합 테스트
const fs = require('fs');

// window.CORE_DATA 로드
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
global.window = { CORE_DATA: null };
eval(coreDataContent);

const ChonsuCalculator = require('./chonsu_engine.js');
const calculator = new ChonsuCalculator();
calculator.loadData();

console.log("=== 촌수계산 종합 테스트 ===");

// 동적 테스트 케이스 생성기: 실제 데이터에서 20+ 케이스 자동 수집
const testCases = [];
const seen = new Set();

function addCase(name1, name2, expected, description) {
    if (!name1 || !name2) return;
    const key = [name1, name2].sort().join('::');
    if (seen.has(key)) return;
    seen.add(key);
    testCases.push({ name1, name2, expected, description });
}

// 자기자신 2건
if (window.CORE_DATA.length > 0) {
    const p0 = window.CORE_DATA[0];
    addCase(p0.name, p0.name, 0, "자기자신");
}
if (window.CORE_DATA.length > 1) {
    const p1 = window.CORE_DATA[1];
    addCase(p1.name, p1.name, 0, "자기자신(2)");
}

// 부모-자녀 6건까지 수집
let parentChildCount = 0;
const nameToPerson = new Map(window.CORE_DATA.map(p => [p.name, p]));
for (const child of window.CORE_DATA) {
    const r = child.relationships || {};
    const f = r.father && nameToPerson.get(r.father);
    const m = r.mother && nameToPerson.get(r.mother);
    if (f && parentChildCount < 10) { addCase(f.name, child.name, 1, "부모-자녀(부)"); parentChildCount++; }
    if (m && parentChildCount < 20) { addCase(m.name, child.name, 1, "부모-자녀(모)"); parentChildCount++; }
    if (parentChildCount >= 20) break;
}

// 형제/자매 6건까지 수집(부모 공유)
let siblingCount = 0;
for (const p of window.CORE_DATA) {
    const r = p.relationships || {};
    const father = r.father && nameToPerson.get(r.father);
    const mother = r.mother && nameToPerson.get(r.mother);
    const parents = [father, mother].filter(Boolean);
    for (const parent of parents) {
        const children = (parent.relationships && parent.relationships.children) || [];
        if (children.length >= 2) {
            const sibs = children.map(n => nameToPerson.get(n)).filter(Boolean);
            for (let i = 0; i < sibs.length - 1 && siblingCount < 12; i++) {
                addCase(sibs[i].name, sibs[i + 1].name, 2, "형제/자매");
                siblingCount++;
            }
        }
    }
    if (siblingCount >= 12) break;
}

// 배우자 3건(배우자 경로 제외 규칙: degree 0 기대)
let spouseCount = 0;
for (const p of window.CORE_DATA) {
    const r = p.relationships || {};
    const spouses = r.spouses || (r.spouse ? [r.spouse] : []);
    if (spouses.length > 0) {
        const sName = spouses[0];
        const sp = nameToPerson.get(sName);
        if (sp) { addCase(p.name, sp.name, 0, "배우자"); spouseCount++; }
    }
    if (spouseCount >= 5) break;
}

// 사촌 4촌 3건: 부모가 형제인 두 아이 선택
let cousinCount = 0;
for (const a of window.CORE_DATA) {
    const aParentName = (a.relationships && (a.relationships.father || a.relationships.mother));
    const aParent = aParentName && nameToPerson.get(aParentName);
    if (!aParent) continue;
    const grandParentName = aParent.relationships && (aParent.relationships.father || aParent.relationships.mother);
    const grandParent = grandParentName && nameToPerson.get(grandParentName);
    if (!grandParent) continue;
    const unclesAunts = (grandParent.relationships && grandParent.relationships.children) || [];
    for (const uaName of unclesAunts) {
        if (uaName === aParent.name) continue;
        const ua = nameToPerson.get(uaName);
        if (!ua) continue;
        const cousins = (ua.relationships && ua.relationships.children) || [];
        if (cousins.length > 0) {
            const cName = cousins[0];
            addCase(a.name, cName, 4, "사촌 4촌");
            cousinCount++;
            if (cousinCount >= 10) break;
        }
    }
    if (cousinCount >= 10) break;
}

// 외가 1~2건(가능한 경우): 비-조씨 아이 vs 조씨 이모/외삼촌 라인 => 3촌 기대
let maternalCount = 0;
for (const x of window.CORE_DATA) {
    if (!(x.name && x.name[0] !== '조')) continue;
    const momName = x.relationships && x.relationships.mother;
    const mom = momName && nameToPerson.get(momName);
    if (!mom || !(mom.name && mom.name[0] === '조')) continue;
    // 엄마의 형제(외삼촌/이모)의 자녀와는 외사촌(보통 5촌)이지만, 엄마의 형제 본인과는 외삼촌(3촌)
    const momsParentName = mom.relationships && (mom.relationships.father || mom.relationships.mother);
    const momsParent = momsParentName && nameToPerson.get(momsParentName);
    if (!momsParent) continue;
    const siblings = (momsParent.relationships && momsParent.relationships.children) || [];
    for (const sibName of siblings) {
        if (sibName === mom.name) continue;
        const uncle = nameToPerson.get(sibName);
        if (uncle && uncle.name && uncle.name[0] === '조') {
            addCase(x.name, uncle.name, 3, "외삼촌/외조카 3촌");
            maternalCount++;
            break;
        }
    }
    if (maternalCount >= 5) break;
}

let passed = 0;
let total = testCases.length;

console.log(`\n총 ${total}개 테스트 케이스 실행 중...\n`);

testCases.forEach((testCase, index) => {
    const person1 = calculator.findPersonByName(testCase.name1);
    const person2 = calculator.findPersonByName(testCase.name2);
    
    if (person1 && person2) {
        const result = calculator.calculateChonsu(person1.id, person2.id);
        const success = result.chonsu === testCase.expected;
        
        console.log(`테스트 ${index + 1}: ${testCase.description}`);
        console.log(`  대상: ${testCase.name1} ↔ ${testCase.name2}`);
        console.log(`  예상: ${testCase.expected}촌, 실제: ${result.chonsu}촌`);
        console.log(`  호칭: ${result.title}`);
        if (result.commonAncestor) {
            console.log(`  공통조상: ${result.commonAncestor}`);
        }
        console.log(`  결과: ${success ? '✅ 통과' : '❌ 실패'}`);
        console.log('');
        
        if (success) passed++;
    } else {
        console.log(`테스트 ${index + 1}: ${testCase.name1} 또는 ${testCase.name2}를 찾을 수 없음`);
        console.log('');
    }
});

console.log(`=== 테스트 완료: ${passed}/${total} 통과 ===`);

// 추가 분석: 조씨 가족 전체 촌수 분포
console.log("\n=== 조씨 가족 촌수 분포 분석 ===");
const joFamily = window.CORE_DATA.filter(p => p.name.startsWith('조'));
console.log(`조씨 가족 총 ${joFamily.length}명`);

// 시조와의 촌수 분포
const chonsuDistribution = {};
joFamily.forEach(person => {
    if (person.name !== "조정윤") {
        const result = calculator.calculateChonsu("L1-G1-M-S-547", person.id); // 조정윤 ID
        const chonsu = result.chonsu;
        chonsuDistribution[chonsu] = (chonsuDistribution[chonsu] || 0) + 1;
    }
});

console.log("\n시조(조정윤)와의 촌수 분포:");
Object.keys(chonsuDistribution).sort((a, b) => parseInt(a) - parseInt(b)).forEach(chonsu => {
    console.log(`  ${chonsu}촌: ${chonsuDistribution[chonsu]}명`);
});
