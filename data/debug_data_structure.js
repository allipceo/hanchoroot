// 데이터 구조 디버깅 스크립트
const fs = require('fs');

// window.CORE_DATA 로드
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
global.window = { CORE_DATA: null };
eval(coreDataContent);

const data = window.CORE_DATA;

console.log("=== 데이터 구조 분석 ===");
console.log(`총 인원: ${data.length}명`);

// 조정윤, 조영하, 조명하 찾기
const jojungyun = data.find(p => p.name === "조정윤");
const joyoungha = data.find(p => p.name === "조영하");
const jomyungha = data.find(p => p.name === "조명하");

console.log("\n=== 핵심 인물 정보 ===");
if (jojungyun) {
    console.log("조정윤:", {
        id: jojungyun.id,
        name: jojungyun.name,
        father: jojungyun.relationships.father,
        children: jojungyun.relationships.children
    });
} else {
    console.log("조정윤을 찾을 수 없음");
}

if (joyoungha) {
    console.log("조영하:", {
        id: joyoungha.id,
        name: joyoungha.name,
        father: joyoungha.relationships.father,
        children: joyoungha.relationships.children
    });
} else {
    console.log("조영하를 찾을 수 없음");
}

if (jomyungha) {
    console.log("조명하:", {
        id: jomyungha.id,
        name: jomyungha.name,
        father: jomyungha.relationships.father,
        children: jomyungha.relationships.children
    });
} else {
    console.log("조명하를 찾을 수 없음");
}

// 조씨 성을 가진 사람들
const joFamily = data.filter(p => p.name.startsWith('조'));
console.log(`\n=== 조씨 가족 (${joFamily.length}명) ===`);
joFamily.forEach(person => {
    console.log(`${person.name} (${person.id}) - 부: ${person.relationships.father || '없음'}`);
});
