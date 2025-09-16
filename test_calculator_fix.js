// 촌수계산기 수정 테스트
const fs = require('fs');

console.log("=== 촌수계산기 수정 테스트 ===");

// 1. window_core_data.js 파일 존재 확인
try {
    const coreDataContent = fs.readFileSync('data/window_core_data.js', 'utf8');
    console.log("✅ window_core_data.js 파일 존재");
    
    // window.CORE_DATA 배열 확인
    if (coreDataContent.includes('window.CORE_DATA = [')) {
        console.log("✅ window.CORE_DATA 배열 형식 확인");
    } else {
        console.log("❌ window.CORE_DATA 배열 형식이 아님");
    }
    
    // 데이터 개수 확인
    const dataCount = (coreDataContent.match(/"id":/g) || []).length;
    console.log(`✅ 데이터 개수: ${dataCount}명`);
    
} catch (error) {
    console.log("❌ window_core_data.js 파일을 찾을 수 없음:", error.message);
}

// 2. calculator.js 파일 확인
try {
    const calculatorContent = fs.readFileSync('js/calculator.js', 'utf8');
    console.log("✅ calculator.js 파일 존재");
    
    // 수정된 초기화 로직 확인
    if (calculatorContent.includes('waitForDataAndInit')) {
        console.log("✅ 데이터 대기 로직 추가됨");
    } else {
        console.log("❌ 데이터 대기 로직 없음");
    }
    
} catch (error) {
    console.log("❌ calculator.js 파일을 찾을 수 없음:", error.message);
}

// 3. HTML 파일 확인
try {
    const htmlContent = fs.readFileSync('app/index.html', 'utf8');
    console.log("✅ index.html 파일 존재");
    
    // 올바른 스크립트 로드 확인
    if (htmlContent.includes('window_core_data.js')) {
        console.log("✅ window_core_data.js 로드 확인");
    } else {
        console.log("❌ window_core_data.js 로드되지 않음");
    }
    
    if (htmlContent.includes('core_browser.js')) {
        console.log("⚠️ core_browser.js도 로드됨 (중복 가능성)");
    }
    
} catch (error) {
    console.log("❌ index.html 파일을 찾을 수 없음:", error.message);
}

console.log("\n=== 수정 완료 ===");
console.log("이제 웹 브라우저에서 http://localhost:8000/app/ 접속하여 테스트하세요.");
