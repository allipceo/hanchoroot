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

// 다양한 관계 테스트 케이스
const testCases = [
    // 부자 관계
    { name1: "조정윤", name2: "조병희", expected: 1, description: "시조-2세대 (부자)" },
    { name1: "조병희", name2: "조영하", expected: 1, description: "2세대-3세대 (부자)" },
    
    // 형제 관계
    { name1: "조영하", name2: "조명하", expected: 2, description: "3세대 형제/자매" },
    { name1: "조병희", name2: "조병갑", expected: 2, description: "2세대 형제" },
    
    // 부자 관계 (조병희-민혜숙의 자녀)
    { name1: "조병희", name2: "조일하", expected: 1, description: "부자 (조병희-민혜숙)" },
    
    // 형제 관계 (같은 부모)
    { name1: "조영하", name2: "조일하", expected: 2, description: "형제/자매 (조병희-민혜숙)" },
    
    // 더 먼 관계
    { name1: "조정윤", name2: "조영하", expected: 2, description: "시조-3세대 (조부-손자)" },
];

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
