// 조병희 부모 관계 확인
const fs = require('fs');

// window.CORE_DATA 로드
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
global.window = { CORE_DATA: null };
eval(coreDataContent);

const data = window.CORE_DATA;

const joByunghee = data.find(p => p.name === "조병희");
const joJungyun = data.find(p => p.name === "조정윤");

console.log("=== 조병희 정보 ===");
if (joByunghee) {
    console.log("조병희:", {
        id: joByunghee.id,
        name: joByunghee.name,
        father: joByunghee.relationships.father,
        children: joByunghee.relationships.children
    });
} else {
    console.log("조병희를 찾을 수 없음");
}

console.log("\n=== 조정윤 정보 ===");
if (joJungyun) {
    console.log("조정윤:", {
        id: joJungyun.id,
        name: joJungyun.name,
        father: joJungyun.relationships.father,
        children: joJungyun.relationships.children
    });
} else {
    console.log("조정윤을 찾을 수 없음");
}

// 조정윤의 자녀들 확인
console.log("\n=== 조정윤의 자녀들 ===");
const joJungyunChildren = data.filter(p => p.relationships.father === "조정윤");
joJungyunChildren.forEach(child => {
    console.log(`${child.name} (${child.id})`);
});
