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
        // V4.0 단일소스 시스템: window.CORE_DATA 사용 (배열 형태)
        if (Array.isArray(window.CORE_DATA)) {
            familyData = { persons: window.CORE_DATA };
        } else {
            familyData = window.CORE_DATA;
        }
        
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

// 필터링된 인물 목록 가져오기 (ID 기반 시스템)
function getFilteredPersons() {
    if (!familyData) return [];
    
    // 전체 인물에서 Line별 필터링 (ID 기반)
    let filteredPersons = familyData.persons.filter(person => {
        if (!person.id) return false;
        const lineCode = person.id.split('-')[0]; // L1, L2, L3
        const lineName = lineCode === 'L1' ? 'Line1' : 
                        lineCode === 'L2' ? 'Line2' : 
                        lineCode === 'L3' ? 'Line3' : null;
        return lineName === currentLine;
    });
    
    // 세대별 필터링 (ID 기반)
    if (currentGeneration !== 'all') {
        const targetGeneration = parseInt(currentGeneration);
        filteredPersons = filteredPersons.filter(person => {
            if (!person.id) return false;
            const genMatch = person.id.match(/L\d-G(\d+)-/);
            return genMatch && parseInt(genMatch[1]) === targetGeneration;
        });
    }
    
    return filteredPersons;
}

// 1-2세대 고정 데이터 생성
function getFixedAncestors() {
    const ancestors = [];
    
    // 1세대 고정 데이터
    if (currentLine === 'Line1' || currentLine === 'Line2') {
        ancestors.push({
            generation: 1,
            couples: [{
                husband: { name: '조정윤', 생년: 1852 },
                wife: { name: '임정숙', 생년: 1861 },
                fixed: true
            }]
        });
    } else if (currentLine === 'Line3') {
        ancestors.push({
            generation: 1,
            couples: [{
                husband: { name: '조정윤', 생년: 1852 },
                wife: { name: '이천경', 생년: 1886 },
                fixed: true
            }]
        });
    }
    
    // 2세대 고정 데이터
    if (currentLine === 'Line1') {
        ancestors.push({
            generation: 2,
            couples: [{
                husband: { name: '조병희', 생년: 1880 },
                wife: { name: '강부인', 생년: 1885 },
                fixed: true
            }]
        });
    } else if (currentLine === 'Line2') {
        ancestors.push({
            generation: 2,
            couples: [{
                husband: { name: '조병희', 생년: 1880 },
                wife: { name: '민혜숙', 생년: 1890 },
                fixed: true
            }]
        });
    } else if (currentLine === 'Line3') {
        ancestors.push({
            generation: 2,
            couples: [{
                husband: { name: '조병갑', 생년: 1885 },
                wife: { name: '김명훈', 생년: 1890 },
                fixed: true
            }]
        });
    }
    
    return ancestors;
}

// 가족 트리 렌더링
function renderFamilyTree() {
    const treeContainer = document.getElementById('family-tree');
    if (!treeContainer) return;
    
    let html = '';
    
    // 1-2세대 고정 조상 표시
    const ancestors = getFixedAncestors();
    
    // 선택된 세대가 1세대 또는 2세대이거나 전체인 경우 조상 표시
    if (currentGeneration === 'all' || currentGeneration === '1' || currentGeneration === '2') {
        ancestors.forEach(ancestorGen => {
            if (currentGeneration === 'all' || currentGeneration === ancestorGen.generation.toString()) {
                html += createGenerationGroup(ancestorGen.generation, ancestorGen.couples, true);
            }
        });
    }
    
    // 3세대 이상 실제 데이터 표시
    if (currentGeneration === 'all' || parseInt(currentGeneration) >= 3) {
        const filteredPersons = getFilteredPersons();
        
        if (filteredPersons.length === 0 && (currentGeneration === 'all' || parseInt(currentGeneration) >= 3)) {
            if (html === '') {
                html = `
                    <div class="no-data">
                        <p>선택된 조건에 해당하는 인물이 없습니다.</p>
                    </div>
                `;
            }
        } else {
            // 실제 데이터 세대별 그룹화 (3세대 이상만)
            const realDataPersons = filteredPersons.filter(person => {
                if (!person.id) return false;
                const genMatch = person.id.match(/L\d-G(\d+)-/);
                return genMatch && parseInt(genMatch[1]) >= 3;
            });
            
            if (realDataPersons.length > 0) {
                const groupedPersons = groupPersonsByGeneration(realDataPersons);
                
                // 세대순 정렬 후 렌더링
                const sortedGenerations = Object.keys(groupedPersons)
                    .map(gen => parseInt(gen))
                    .filter(gen => gen >= 3)
                    .sort((a, b) => a - b);
                
                sortedGenerations.forEach(generation => {
                    if (currentGeneration === 'all' || currentGeneration === generation.toString()) {
                        html += createGenerationGroup(generation, groupedPersons[generation]);
                    }
                });
            }
        }
    }
    
    treeContainer.innerHTML = html;
}

// 인물들을 세대별로 그룹화하고 부부 순으로 배치 (ID 기반 시스템)
function groupPersonsByGeneration(persons) {
    const grouped = {};
    
    // 먼저 세대별로 그룹화 (ID 기반)
    persons.forEach(person => {
        if (!person.id) return;
        const genMatch = person.id.match(/L\d-G(\d+)-/);
        if (genMatch) {
            const generation = parseInt(genMatch[1]);
            if (!grouped[generation]) {
                grouped[generation] = [];
            }
            grouped[generation].push(person);
        }
    });
    
    // 각 세대별로 부부 순으로 정렬
    Object.keys(grouped).forEach(generation => {
        grouped[generation] = sortCouplesFirst(grouped[generation]);
    });
    
    return grouped;
}

// 유사 이름 매칭 함수 (이름 오타 해결)
function findSimilarName(allData, targetName, processed) {
    // 알려진 이름 매핑 (오타 수정)
    const nameMapping = {
        '조아영': '조야영',    // 전승재의 배우자 (오타 수정)
        '조윤형': '조윤경',    // 손안세의 배우자 (조윤형 → 조윤경)
        '김윤형': '김윤형'     // 김승우의 배우자 (정확함)
    };
    
    // 직접 매핑이 있는 경우
    if (nameMapping[targetName]) {
        const mapped = allData.find(p => p.name === nameMapping[targetName] && !processed.has(p.id));
        if (mapped) return mapped;
    }
    
    // 유사 이름 검색 (첫 2글자 일치)
    if (targetName.length >= 2) {
        const prefix = targetName.substring(0, 2);
        const similar = allData.find(p => 
            !processed.has(p.id) && 
            p.name.startsWith(prefix) && 
            p.name.length === targetName.length
        );
        if (similar) return similar;
    }
    
    return null;
}

// 부부 순으로 정렬하는 함수
function sortCouplesFirst(persons) {
    const couples = [];
    const singles = [];
    const processed = new Set();
    
    // ID 순서로 먼저 정렬
    const sortedPersons = [...persons].sort((a, b) => {
        if (!a.id || !b.id) return 0;
        return a.id.localeCompare(b.id);
    });
    
    sortedPersons.forEach(person => {
        if (processed.has(person.id)) return;
        
        // 배우자 찾기 (relationships.spouses 우선)
        let spouse = null;
        
        // 1) relationships.spouses 필드 확인
        if (person.relationships && person.relationships.spouses && person.relationships.spouses.length > 0) {
            const spouseName = person.relationships.spouses[0];
            // 현재 persons 목록에서 먼저 찾기
            spouse = sortedPersons.find(p => p.name === spouseName && !processed.has(p.id));
            
            // 없으면 전체 데이터에서 찾기
            if (!spouse && typeof window !== 'undefined' && window.CORE_DATA) {
                const allData = Array.isArray(window.CORE_DATA) ? window.CORE_DATA : window.CORE_DATA.persons;
                if (allData) {
                    spouse = allData.find(p => p.name === spouseName);
                }
            }
        }
        
        // 2) notes 필드에서 배우자 관계 찾기 (모든 경우)
        if (!spouse && person.additional && person.additional.notes) {
            const notes = person.additional.notes;
            const allData = Array.isArray(window.CORE_DATA) ? window.CORE_DATA : (window.CORE_DATA ? window.CORE_DATA.persons : []);
            
            if (allData) {
                // "XXX의 부인/아내" 패턴으로 남편 찾기
                const wifePattern = /(.+)의.*(부인|아내)/;
                const wifeMatch = notes.match(wifePattern);
                if (wifeMatch) {
                    const husbandName = wifeMatch[1].trim();
                    // 현재 persons 목록에서 먼저 찾기
                    spouse = sortedPersons.find(p => p.name === husbandName && !processed.has(p.id));
                    
                    // 현재 목록에 없으면 전체 데이터에서 찾기
                    if (!spouse) {
                        spouse = allData.find(p => p.name === husbandName && !processed.has(p.id));
                        // 정확한 이름으로 찾지 못한 경우 유사 이름 매칭
                        if (!spouse) {
                            spouse = findSimilarName(allData, husbandName, processed);
                        }
                    }
                }
                
                // "XXX의 남편" 패턴으로 아내 찾기
                if (!spouse) {
                    const husbandPattern = /(.+)의.*남편/;
                    const husbandMatch = notes.match(husbandPattern);
                    if (husbandMatch) {
                        const wifeName = husbandMatch[1].trim();
                        // 현재 persons 목록에서 먼저 찾기
                        spouse = sortedPersons.find(p => p.name === wifeName && !processed.has(p.id));
                        
                        // 현재 목록에 없으면 전체 데이터에서 찾기
                        if (!spouse) {
                            spouse = allData.find(p => p.name === wifeName && !processed.has(p.id));
                            // 정확한 이름으로 찾지 못한 경우 유사 이름 매칭
                            if (!spouse) {
                                spouse = findSimilarName(allData, wifeName, processed);
                            }
                        }
                    }
                }
            }
        }
        
        // 3) 역방향 검색 - 다른 사람의 notes에서 현재 person을 배우자로 언급하는지 확인
        if (!spouse) {
            // 현재 persons 목록에서 먼저 찾기
            const husbandCandidate = sortedPersons.find(p => {
                if (processed.has(p.id) || p.id === person.id) return false;
                const notes = p.additional?.notes || '';
                return notes.includes(`${person.name}의 부인`) || notes.includes(`${person.name}의 아내`);
            });
            
            if (husbandCandidate) {
                spouse = husbandCandidate;
            } else {
                // 현재 person을 남편으로 언급하는 사람 찾기
                const wifeCandidate = sortedPersons.find(p => {
                    if (processed.has(p.id) || p.id === person.id) return false;
                    const notes = p.additional?.notes || '';
                    return notes.includes(`${person.name}의 남편`);
                });
                
                if (wifeCandidate) {
                    spouse = wifeCandidate;
                } else {
                    // 현재 목록에 없으면 전체 데이터에서 찾기
                    const allData = Array.isArray(window.CORE_DATA) ? window.CORE_DATA : (window.CORE_DATA ? window.CORE_DATA.persons : []);
                    if (allData) {
                        const husbandInAll = allData.find(p => {
                            if (processed.has(p.id) || p.id === person.id) return false;
                            const notes = p.additional?.notes || '';
                            return notes.includes(`${person.name}의 부인`) || notes.includes(`${person.name}의 아내`);
                        });
                        
                        if (husbandInAll) {
                            spouse = husbandInAll;
                        } else {
                            const wifeInAll = allData.find(p => {
                                if (processed.has(p.id) || p.id === person.id) return false;
                                const notes = p.additional?.notes || '';
                                return notes.includes(`${person.name}의 남편`);
                            });
                            
                            if (wifeInAll) {
                                spouse = wifeInAll;
                            }
                        }
                    }
                }
            }
        }
        
        if (spouse && !processed.has(spouse.id)) {
            // 부부 관계 생성 (4가지 원칙 적용)
            let husband, wife;
            
            // 원칙 1: 조씨 남성 - 조씨남편-다른씨아내
            if (person.name.startsWith('조') && person.성별 === 'M') {
                husband = person;
                wife = spouse;
            }
            else if (spouse.name.startsWith('조') && spouse.성별 === 'M') {
                husband = spouse;
                wife = person;
            }
            // 원칙 2: 조씨 여성 - 다른씨남편-조씨부인
            else if (person.name.startsWith('조') && person.성별 === 'F') {
                husband = spouse;
                wife = person;
            }
            else if (spouse.name.startsWith('조') && spouse.성별 === 'F') {
                husband = person;
                wife = spouse;
            }
            // 원칙 3&4: 비조씨 - 남자-배우자
            else {
                if (person.성별 === 'M') {
                    husband = person;
                    wife = spouse;
                } else {
                    husband = spouse;
                    wife = person;
                }
            }
            
            couples.push({
                type: 'couple',
                husband: husband,
                wife: wife,
                sortId: person.id, // ID 순서 정렬용
                displayName: `${husband.name}-${wife.name}`
            });
            
            processed.add(person.id);
            processed.add(spouse.id);
        } else {
            // 배우자가 없는 경우
            singles.push({
                ...person,
                sortId: person.id
            });
            processed.add(person.id);
        }
    });
    
    // ID 순서로 정렬
    couples.sort((a, b) => a.sortId.localeCompare(b.sortId));
    singles.sort((a, b) => a.sortId.localeCompare(b.sortId));
    
    // 부부를 먼저, 그 다음 미혼자 순으로 정렬
    return [...couples, ...singles];
}

// 세대 그룹 HTML 생성 (부부 표시 지원)
function createGenerationGroup(generation, persons, isFixed = false) {
    if (isFixed) {
        // 고정 조상 표시
        return `
            <div class="generation-group">
                <div class="generation-header">
                    ${generation}세대 (${persons.length}쌍) - 조상
                </div>
                <div class="generation-persons">
                    ${persons.map(couple => createFixedCoupleCard(couple)).join('')}
                </div>
            </div>
        `;
    }
    
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

// 고정 조상 부부 카드 생성
function createFixedCoupleCard(couple) {
    const husband = couple.husband;
    const wife = couple.wife;
    const husbandAge = husband.생년 ? `(${husband.생년}년생)` : '';
    const wifeAge = wife.생년 ? `(${wife.생년}년생)` : '';
    
    return `
        <div class="couple-card fixed-ancestor">
            <div class="couple-info">
                <div class="couple-avatars">
                    <div class="person-avatar ancestor" title="${husband.name} ${husbandAge}">${husband.name.charAt(0)}</div>
                    <div class="couple-separator">-</div>
                    <div class="person-avatar ancestor" title="${wife.name} ${wifeAge}">${wife.name.charAt(0)}</div>
                </div>
                <div class="couple-details">
                    <h3 class="couple-name">
                        <span class="husband-name">${husband.name}</span>
                        <span class="couple-separator">-</span>
                        <span class="wife-name">${wife.name}</span>
                        <span class="ancestor-badge">조상</span>
                    </h3>
                    <div class="couple-meta">
                        <span class="relationship">부부</span>
                        ${husband.생년 && wife.생년 ? `<span class="ages">남편 ${new Date().getFullYear() - husband.생년}세, 아내 ${new Date().getFullYear() - wife.생년}세</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="couple-status">
                <span class="status deceased">💀</span>
                <span class="status deceased">💀</span>
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
                            <span>${husband.성별 === 'M' ? '남성' : '여성'} - ${wife.성별 === 'F' ? '여성' : '남성'}</span>
                            ${husband.생년 || wife.생년 ? `<span>${husband.생년 || '미상'} - ${wife.생년 || '미상'}</span>` : ''}
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
                    <h3 class="person-name">${person.name} ${/-M-/.test(person.id)?'(M)':(/-F-/.test(person.id)?'(F)':'')}</h3>
                    ${person.한자명 ? `<p class="person-hanja">${person.한자명}</p>` : ''}
                    <div class="person-meta">
                        <span>${person.성별 === 'M' ? '남성' : '여성'}</span>
                        ${person.생년 ? `<span>${person.생년}</span>` : ''}
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