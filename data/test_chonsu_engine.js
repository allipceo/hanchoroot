// 촌수계산 엔진 테스트 스크립트
const ChonsuCalculator = require('./chonsu_engine.js');
const fs = require('fs');

// window.CORE_DATA 로드 (Node.js 환경용)
const coreDataContent = fs.readFileSync('window_core_data.js', 'utf8');
// window 객체 시뮬레이션
global.window = { CORE_DATA: null };
eval(coreDataContent);

const calculator = new ChonsuCalculator();
calculator.test();
