// 촌수계산기 JavaScript
// 기존 함수 재활용, window.CORE_DATA 단일소스 활용

class ChonsuCalculatorUI {
    constructor() {
        this.calculator = null;
        this.recentCalculations = [];
        this.init();
    }

    // 초기화
    init() {
        this.setupEventListeners();
        this.waitForDataAndInit();
    }
    
    // 데이터 로드를 기다리고 초기화
    waitForDataAndInit() {
        const checkData = () => {
            if (window.CORE_DATA && Array.isArray(window.CORE_DATA)) {
                console.log("데이터 로드 완료, 촌수계산기 초기화 시작");
                this.loadCalculatorEngine();
                this.populatePersonSelects();
                this.loadRecentCalculations();
            } else {
                console.log("데이터 로드 대기 중...");
                setTimeout(checkData, 100);
            }
        };
        checkData();
    }

    // 촌수계산 엔진 로드
    loadCalculatorEngine() {
        if (typeof ChonsuCalculator !== 'undefined') {
            this.calculator = new ChonsuCalculator();
            this.calculator.loadData();
            console.log("촌수계산 엔진 로드 완료");
        } else {
            console.error("ChonsuCalculator 클래스를 찾을 수 없습니다.");
        }
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 촌수계산기 버튼
        document.getElementById('calculator-btn').addEventListener('click', () => {
            this.showCalculatorScreen();
        });

        // 촌수계산기 화면 네비게이션
        document.getElementById('calculator-back-btn').addEventListener('click', () => {
            this.hideCalculatorScreen();
        });

        document.getElementById('calculator-home-btn').addEventListener('click', () => {
            this.showMainScreen();
        });

        // 사람 선택 변경
        document.getElementById('person1-select').addEventListener('change', () => {
            this.updateCalculateButton();
        });

        document.getElementById('person2-select').addEventListener('change', () => {
            this.updateCalculateButton();
        });

        // 계산 버튼
        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.calculateChonsu();
        });
    }

    // 사람 선택 옵션 채우기
    populatePersonSelects() {
        if (!window.CORE_DATA) {
            console.error("window.CORE_DATA를 찾을 수 없습니다.");
            return;
        }

        const select1 = document.getElementById('person1-select');
        const select2 = document.getElementById('person2-select');

        // 기존 옵션 제거 (첫 번째 옵션 제외)
        select1.innerHTML = '<option value="">선택하세요</option>';
        select2.innerHTML = '<option value="">선택하세요</option>';

        // 한양조씨 가족만 추가
        const joFamily = window.CORE_DATA.filter(person => person.name.startsWith('조'));
        
        joFamily.forEach(person => {
            const option1 = document.createElement('option');
            option1.value = person.id;
            option1.textContent = `${person.name} (${person.세대}세대)`;
            select1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = person.id;
            option2.textContent = `${person.name} (${person.세대}세대)`;
            select2.appendChild(option2);
        });

        console.log(`촌수계산 대상: ${joFamily.length}명 로드 완료`);
    }

    // 계산 버튼 상태 업데이트
    updateCalculateButton() {
        const person1 = document.getElementById('person1-select').value;
        const person2 = document.getElementById('person2-select').value;
        const calculateBtn = document.getElementById('calculate-btn');

        if (person1 && person2 && person1 !== person2) {
            calculateBtn.disabled = false;
            calculateBtn.textContent = '촌수 계산하기';
        } else {
            calculateBtn.disabled = true;
            if (person1 === person2 && person1) {
                calculateBtn.textContent = '같은 사람을 선택했습니다';
            } else {
                calculateBtn.textContent = '두 사람을 선택하세요';
            }
        }
    }

    // 촌수 계산
    calculateChonsu() {
        const person1Id = document.getElementById('person1-select').value;
        const person2Id = document.getElementById('person2-select').value;

        if (!person1Id || !person2Id || person1Id === person2Id) {
            return;
        }

        if (!this.calculator) {
            alert("촌수계산 엔진이 로드되지 않았습니다.");
            return;
        }

        const result = this.calculator.calculateChonsu(person1Id, person2Id);
        this.displayResult(result, person1Id, person2Id);
        this.saveRecentCalculation(result, person1Id, person2Id);
    }

    // 결과 표시
    displayResult(result, person1Id, person2Id) {
        const resultDiv = document.getElementById('calculator-result');
        const chonsuSpan = document.getElementById('result-chonsu');
        const titleSpan = document.getElementById('result-title');
        const relationshipSpan = document.getElementById('result-relationship');
        const ancestorSpan = document.getElementById('result-ancestor');
        const detailsDiv = document.getElementById('result-details');

        if (result.error) {
            chonsuSpan.textContent = "계산 불가";
            titleSpan.textContent = result.error;
            relationshipSpan.textContent = "오류";
            detailsDiv.style.display = 'none';
        } else {
            chonsuSpan.textContent = `${result.chonsu}촌`;
            titleSpan.textContent = result.title;
            relationshipSpan.textContent = result.relationship;

            if (result.commonAncestor) {
                ancestorSpan.textContent = result.commonAncestor;
                detailsDiv.style.display = 'block';
            } else {
                detailsDiv.style.display = 'none';
            }
        }

        resultDiv.style.display = 'block';
    }

    // 최근 계산 기록 저장
    saveRecentCalculation(result, person1Id, person2Id) {
        const person1 = this.calculator.findPersonById(person1Id);
        const person2 = this.calculator.findPersonById(person2Id);

        const calculation = {
            id: Date.now(),
            person1: person1.name,
            person2: person2.name,
            chonsu: result.chonsu || 0,
            title: result.title || "계산 불가",
            timestamp: new Date().toLocaleString()
        };

        this.recentCalculations.unshift(calculation);
        
        // 최대 10개까지만 저장
        if (this.recentCalculations.length > 10) {
            this.recentCalculations = this.recentCalculations.slice(0, 10);
        }

        this.saveRecentCalculations();
        this.updateRecentCalculationsDisplay();
    }

    // 최근 계산 기록 로드
    loadRecentCalculations() {
        const saved = localStorage.getItem('chonsu_recent_calculations');
        if (saved) {
            this.recentCalculations = JSON.parse(saved);
            this.updateRecentCalculationsDisplay();
        }
    }

    // 최근 계산 기록 저장
    saveRecentCalculations() {
        localStorage.setItem('chonsu_recent_calculations', JSON.stringify(this.recentCalculations));
    }

    // 최근 계산 기록 표시 업데이트
    updateRecentCalculationsDisplay() {
        const listDiv = document.getElementById('recent-calculations-list');
        
        if (this.recentCalculations.length === 0) {
            listDiv.innerHTML = '<div class="no-calculations">아직 계산 기록이 없습니다.</div>';
            return;
        }

        listDiv.innerHTML = this.recentCalculations.map(calc => `
            <div class="calculation-item">
                <div class="calculation-persons">${calc.person1} ↔ ${calc.person2}</div>
                <div class="calculation-result">${calc.chonsu}촌 (${calc.title})</div>
                <div class="calculation-time">${calc.timestamp}</div>
            </div>
        `).join('');
    }

    // 화면 전환
    showCalculatorScreen() {
        document.getElementById('main-screen').style.display = 'none';
        document.getElementById('calculator-screen').style.display = 'block';
    }

    hideCalculatorScreen() {
        document.getElementById('calculator-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
    }

    showMainScreen() {
        document.getElementById('calculator-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM 로드 완료, 촌수계산기 UI 초기화 시작");
    new ChonsuCalculatorUI();
});