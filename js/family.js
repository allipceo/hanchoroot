// 한양조씨 족보앱 - 패밀리별 보기 JavaScript

// 전역 변수
let currentLine = 'Line1';
let currentGeneration = 'all';
let familyData = null;

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeFamilyView();
});

// 패밀리별 보기 초기화
function initializeFamilyView() {
    console.log('패밀리별 보기 초기화 시작');
    
    // 로딩 인디케이터 표시
    showLoadingIndicator();
    
    // 패밀리 데이터 로드
    loadFamilyData();
}

// 패밀리 데이터 로드 (V4.0 단일소스 시스템)
function loadFamilyData() {
    try {
        // V4.0 단일소스 시스템: window.CORE_DATA 사용
        familyData = window.CORE_DATA;
        
        if (!familyData || !familyData.persons) {
            throw new Error('window.CORE_DATA가 로드되지 않았습니다');
        }
        
        console.log('패밀리 데이터 로드 완료:', familyData);
        
        // UI 업데이트
        updateStatistics();
        renderFamilyTree();
        
        // 로딩 인디케이터 숨김
        hideLoadingIndicator();
        
    } catch (error) {
        console.error('패밀리 데이터 로드 실패:', error);
        showError('데이터를 불러오는데 실패했습니다.');
    }
}

// Line 선택
function selectLine(line) {
    console.log('Line 선택:', line);
    
    // 현재 Line 업데이트
    currentLine = line;
    
    // 탭 활성화 상태 업데이트
    updateLineTabs(line);
    
    // 통계 및 트리 업데이트
    updateStatistics();
    renderFamilyTree();
}

// 세대 선택
function selectGeneration(generation) {
    console.log('세대 선택:', generation);
    
    // 현재 세대 업데이트
    currentGeneration = generation;
    
    // 필터 활성화 상태 업데이트
    updateGenerationFilters(generation);
    
    // 통계 및 트리 업데이트
    updateStatistics();
    renderFamilyTree();
}

// Line 탭 상태 업데이트
function updateLineTabs(selectedLine) {
    const tabs = document.querySelectorAll('.line-tabs .tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.line === selectedLine) {
            tab.classList.add('active');
        }
    });
}

// 세대 필터 상태 업데이트
function updateGenerationFilters(selectedGeneration) {
    const filters = document.querySelectorAll('.generation-filters .filter');
    filters.forEach(filter => {
        filter.classList.remove('active');
        if (filter.dataset.generation === selectedGeneration) {
            filter.classList.add('active');
        }
    });
}

// 통계 정보 업데이트
function updateStatistics() {
    if (!familyData) return;
    
    // 선택된 Line과 세대에 따른 필터링된 인물 수 계산
    const filteredPersons = getFilteredPersons();
    
    // UI 업데이트
    document.getElementById('selected-line').textContent = currentLine;
    document.getElementById('selected-generation').textContent = 
        currentGeneration === 'all' ? '전체' : `${currentGeneration}세대`;
    document.getElementById('display-count').textContent = `${filteredPersons.length}명`;
}

// 필터링된 인물 목록 가져오기 (V4.0 필드명 사용)
function getFilteredPersons() {
    if (!familyData) return [];
    
    // 전체 인물에서 Line별 필터링
    let filteredPersons = familyData.persons.filter(person => 
        person.Line1 === currentLine
    );
    
    // 세대별 필터링
    if (currentGeneration !== 'all') {
        filteredPersons = filteredPersons.filter(person => 
            person.세대 === parseInt(currentGeneration)
        );
    }
    
    return filteredPersons;
}

// 가족 트리 렌더링
function renderFamilyTree() {
    const treeContainer = document.getElementById('family-tree');
    if (!treeContainer) return;
    
    const filteredPersons = getFilteredPersons();
    
    if (filteredPersons.length === 0) {
        treeContainer.innerHTML = `
            <div class="no-data">
                <p>선택된 조건에 해당하는 인물이 없습니다.</p>
            </div>
        `;
        return;
    }
    
    // 세대별로 그룹화
    const personsByGeneration = groupPersonsByGeneration(filteredPersons);
    
    // HTML 생성
    let html = '';
    Object.keys(personsByGeneration).sort().forEach(generation => {
        const persons = personsByGeneration[generation];
        html += createGenerationGroup(generation, persons);
    });
    
    treeContainer.innerHTML = html;
}

// 인물들을 세대별로 그룹화하고 부부 순으로 배치 (V4.0 필드명 사용)
function groupPersonsByGeneration(persons) {
    const grouped = {};
    
    // 먼저 세대별로 그룹화
    persons.forEach(person => {
        const generation = person.세대;
        if (!grouped[generation]) {
            grouped[generation] = [];
        }
        grouped[generation].push(person);
    });
    
    // 각 세대별로 부부 순으로 정렬
    Object.keys(grouped).forEach(generation => {
        grouped[generation] = sortCouplesFirst(grouped[generation]);
    });
    
    return grouped;
}

// 부부 순으로 정렬하는 함수
function sortCouplesFirst(persons) {
    const couples = [];
    const singles = [];
    const processed = new Set();
    
    persons.forEach(person => {
        if (processed.has(person.id)) return;
        
        // 배우자가 있는 경우
        if (person.relationships.spouses && person.relationships.spouses.length > 0) {
            const spouseName = person.relationships.spouses[0]; // 첫 번째 배우자
<<<<<<< HEAD
            const spouse = persons.find(p => p.name === spouseName && !processed.has(p.id));
=======
            // 1) 현재 세대/라인 목록에서 우선 검색
            let spouse = persons.find(p => p.name === spouseName && !processed.has(p.id));
            // 2) 없으면 전체 데이터에서 보조 검색 (라인 달라도 허용, 동일 세대 우선)
            if (!spouse && typeof window !== 'undefined' && window.CORE_DATA && Array.isArray(window.CORE_DATA.persons)) {
                const all = window.CORE_DATA.persons;
                const sameGen = all.find(p => p.name === spouseName && p.세대 === person.세대);
                spouse = sameGen || all.find(p => p.name === spouseName);
            }
>>>>>>> 32f8b4e3839543e088dbb97181584009f5f7d0c1
            
            if (spouse) {
                // 한양조씨를 먼저, 배우자를 나중에 배열
                const joPerson = person.name.startsWith('조') ? person : spouse;
                const spousePerson = person.name.startsWith('조') ? spouse : person;
                
                couples.push({
                    type: 'couple',
                    husband: joPerson.성별 === 'M' ? joPerson : spousePerson,
                    wife: joPerson.성별 === 'F' ? joPerson : spousePerson,
                    displayName: `${joPerson.name}-${spousePerson.name}`
                });
                processed.add(person.id);
<<<<<<< HEAD
                processed.add(spouse.id);
            } else {
                // 배우자가 같은 세대에 없는 경우
=======
                if (spouse.id) processed.add(spouse.id);
            } else {
                // 배우자가 전체 데이터에도 없으면 단독 표시
>>>>>>> 32f8b4e3839543e088dbb97181584009f5f7d0c1
                singles.push(person);
                processed.add(person.id);
            }
        } else {
            // 배우자가 없는 경우
            singles.push(person);
            processed.add(person.id);
        }
    });
    
    // 부부를 먼저, 그 다음 미혼자 순으로 정렬
    return [...couples, ...singles];
}

// 세대 그룹 HTML 생성 (부부 표시 지원)
function createGenerationGroup(generation, persons) {
    return `
        <div class="generation-group">
            <div class="generation-header">
                ${generation}세대 (${persons.length}명)
            </div>
            <div class="generation-persons">
                ${persons.map(person => createPersonCard(person)).join('')}
            </div>
        </div>
    `;
}

// 인물 카드 HTML 생성 (부부 표시 지원)
function createPersonCard(person) {
    // 부부인 경우
    if (person.type === 'couple') {
        const husband = person.husband;
        const wife = person.wife;
        const husbandStatus = husband.생존상태 === '생존' ? '💚' : '💀';
        const wifeStatus = wife.생존상태 === '생존' ? '💚' : '💀';
        
        return `
            <div class="couple-card">
                <div class="couple-info">
                    <div class="couple-avatars">
                        <div class="person-avatar clickable" onclick="showPersonDetail('${husband.id}')" title="${husband.name}">${husband.name.charAt(0)}</div>
                        <div class="couple-separator">-</div>
                        <div class="person-avatar clickable" onclick="showPersonDetail('${wife.id}')" title="${wife.name}">${wife.name.charAt(0)}</div>
                    </div>
                    <div class="couple-details">
                        <h3 class="couple-name">
                            <span class="clickable" onclick="showPersonDetail('${husband.id}')" title="${husband.name}">${husband.name}</span>
                            <span class="couple-separator">-</span>
                            <span class="clickable" onclick="showPersonDetail('${wife.id}')" title="${wife.name}">${wife.name}</span>
                        </h3>
                        <div class="couple-meta">
                            <span>${husband.세대}세대</span>
                            <span>${husband.Line1}</span>
                            <span>부부</span>
                        </div>
                    </div>
                </div>
                <div class="couple-status">
                    <span class="status clickable ${husband.생존상태 === '생존' ? 'living' : 'deceased'}" onclick="showPersonDetail('${husband.id}')" title="${husband.name}">${husbandStatus}</span>
                    <span class="status clickable ${wife.생존상태 === '생존' ? 'living' : 'deceased'}" onclick="showPersonDetail('${wife.id}')" title="${wife.name}">${wifeStatus}</span>
                </div>
            </div>
        `;
    }
    
    // 개인인 경우 (기존 로직)
    const statusIcon = person.생존상태 === '생존' ? '💚' : '💀';
    const statusClass = person.생존상태 === '생존' ? 'living' : 'deceased';
    
    return `
        <div class="person-card ${statusClass}" onclick="showPersonDetail('${person.id}')">
            <div class="person-info">
                <div class="person-avatar">
                    ${person.name.charAt(0)}
                </div>
                <div class="person-details">
                    <h3 class="person-name">${person.name}</h3>
                    ${person.한자명 ? `<p class="person-hanja">${person.한자명}</p>` : ''}
                    <div class="person-meta">
                        <span>${person.세대}세대</span>
                        <span>${person.Line1}</span>
                        <span>${person.성별 === 'M' ? '남성' : '여성'}</span>
                    </div>
                </div>
            </div>
            <div class="person-status ${statusClass}">
                ${statusIcon}
            </div>
        </div>
    `;
}

// 인물 상세 정보 표시 (간단하고 단단하게)
function showPersonDetail(personId) {
    console.log('인물 상세 정보 표시:', personId);
    
    // detail.html로 이동 (기존 검증된 기능 재사용)
    window.location.href = `detail.html?id=${personId}`;
}

// 로딩 인디케이터 표시
function showLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'block';
    }
}

// 로딩 인디케이터 숨김
function hideLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

// 에러 메시지 표시
function showError(message) {
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        treeContainer.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
            </div>
        `;
    }
    
    hideLoadingIndicator();
}

// 뒤로 가기
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        goHome();
    }
}

// 홈으로 가기
function goHome() {
    window.location.href = 'index.html';
}

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            // 이전 Line으로 이동
            const lineTabs = ['Line1', 'Line2', 'Line3', '공통'];
            const currentIndex = lineTabs.indexOf(currentLine);
            if (currentIndex > 0) {
                selectLine(lineTabs[currentIndex - 1]);
            }
            break;
        case 'ArrowRight':
            // 다음 Line으로 이동
            const lineTabs2 = ['Line1', 'Line2', 'Line3', '공통'];
            const currentIndex2 = lineTabs2.indexOf(currentLine);
            if (currentIndex2 < lineTabs2.length - 1) {
                selectLine(lineTabs2[currentIndex2 + 1]);
            }
            break;
        case 'ArrowUp':
            // 이전 세대로 이동
            const generations = ['all', '1', '2', '3', '4', '5', '6'];
            const currentGenIndex = generations.indexOf(currentGeneration);
            if (currentGenIndex > 0) {
                selectGeneration(generations[currentGenIndex - 1]);
            }
            break;
        case 'ArrowDown':
            // 다음 세대로 이동
            const generations2 = ['all', '1', '2', '3', '4', '5', '6'];
            const currentGenIndex2 = generations2.indexOf(currentGeneration);
            if (currentGenIndex2 < generations2.length - 1) {
                selectGeneration(generations2[currentGenIndex2 + 1]);
            }
            break;
    }
});

// 터치 제스처 지원 (모바일)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 수평 스와이프 (Line 변경)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const lineTabs = ['Line1', 'Line2', 'Line3', '공통'];
        const currentIndex = lineTabs.indexOf(currentLine);
        
        if (deltaX > 0 && currentIndex > 0) {
            // 오른쪽 스와이프 - 이전 Line
            selectLine(lineTabs[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex < lineTabs.length - 1) {
            // 왼쪽 스와이프 - 다음 Line
            selectLine(lineTabs[currentIndex + 1]);
        }
    }
    
    // 수직 스와이프 (세대 변경)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        const generations = ['all', '1', '2', '3', '4', '5', '6'];
        const currentGenIndex = generations.indexOf(currentGeneration);
        
        if (deltaY > 0 && currentGenIndex > 0) {
            // 아래 스와이프 - 이전 세대
            selectGeneration(generations[currentGenIndex - 1]);
        } else if (deltaY < 0 && currentGenIndex < generations.length - 1) {
            // 위 스와이프 - 다음 세대
            selectGeneration(generations[currentGenIndex + 1]);
        }
    }
});

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 렌더링 최적화: 디바운스된 렌더링
const debouncedRender = debounce(renderFamilyTree, 100);

// 윈도우 리사이즈 시 반응형 업데이트
window.addEventListener('resize', debouncedRender);