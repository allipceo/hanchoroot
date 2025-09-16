// 조일하 관계 디버깅
const fs = require('fs');

// window.CORE_DATA 로드
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
global.window = { CORE_DATA: null };
eval(coreDataContent);

const data = window.CORE_DATA;

const joByunghee = data.find(p => p.name === "조병희");
const joIlha = data.find(p => p.name === "조일하");
const joyoungha = data.find(p => p.name === "조영하");

console.log("=== 조일하 관계 분석 ===");
console.log("조병희:", {
    id: joByunghee.id,
    name: joByunghee.name,
    father: joByunghee.relationships.father,
    children: joByunghee.relationships.children
});

console.log("\n조일하:", {
    id: joIlha.id,
    name: joIlha.name,
    father: joIlha.relationships.father,
    children: joIlha.relationships.children
});

console.log("\n조영하:", {
    id: joyoungha.id,
    name: joyoungha.name,
    father: joyoungha.relationships.father,
    children: joyoungha.relationships.children
});

// 조병희의 자녀들 확인
console.log("\n=== 조병희의 자녀들 ===");
const joByungheeChildren = data.filter(p => p.relationships.father === "조병희");
joByungheeChildren.forEach(child => {
    console.log(`${child.name} (${child.id}) - 부: ${child.relationships.father}`);
});

// 조일하의 부모 확인
console.log("\n=== 조일하의 부모 ===");
if (joIlha.relationships.father) {
    const father = data.find(p => p.name === joIlha.relationships.father);
    if (father) {
        console.log("부:", {
            name: father.name,
            id: father.id,
            father: father.relationships.father
        });
    }
}
