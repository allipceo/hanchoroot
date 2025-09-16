// 형제 관계 디버깅
const fs = require('fs');

// window.CORE_DATA 로드
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
global.window = { CORE_DATA: null };
eval(coreDataContent);

const data = window.CORE_DATA;

const joyoungha = data.find(p => p.name === "조영하");
const jomyungha = data.find(p => p.name === "조명하");

console.log("=== 조영하 정보 ===");
console.log(joyoungha);

console.log("\n=== 조명하 정보 ===");
console.log(jomyungha);

// 조상 추적 테스트
function findAncestors(personId) {
    const ancestors = [];
    let current = data.find(p => p.id === personId);
    
    console.log(`\n=== ${current.name}의 조상 추적 ===`);
    let level = 0;
    
    while (current && current.relationships.father) {
        const father = data.find(p => p.name === current.relationships.father);
        if (father) {
            ancestors.push(father);
            console.log(`${level + 1}세대 위: ${father.name} (${father.id})`);
            current = father;
            level++;
        } else {
            console.log(`부모 ${current.relationships.father}를 찾을 수 없음`);
            break;
        }
    }
    
    return ancestors;
}

const ancestors1 = findAncestors(joyoungha.id);
const ancestors2 = findAncestors(jomyungha.id);

console.log("\n=== 공통조상 찾기 ===");
console.log("조영하 조상:", ancestors1.map(a => a.name));
console.log("조명하 조상:", ancestors2.map(a => a.name));

// 공통조상 찾기
for (let i = 0; i < ancestors1.length; i++) {
    for (let j = 0; j < ancestors2.length; j++) {
        if (ancestors1[i].id === ancestors2[j].id) {
            console.log(`공통조상 발견: ${ancestors1[i].name} (거리: ${i}, ${j})`);
            console.log(`촌수: ${i + j}`);
            break;
        }
    }
}
