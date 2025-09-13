// js/family.js - 패밀리별 보기 로직
let familyData = null;
let currentLine = 'Line1';
let currentGeneration = 'all';
let currentStatus = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initFamilyPage();
});

function initFamilyPage() {
    console.log("Family page initialized.");
    if (typeof coreLoader !== 'undefined') {
        familyData = coreLoader.load();
        displayAppVersion();
        setupFamilyEventListeners();
        renderFamilyTree();
    } else {
        console.error("Core Module을 찾을 수 없습니다.");
    }
}

function displayAppVersion() {
    const appConfig = familyData.config.app;
    document.getElementById('app-version').textContent = appConfig.version;
    document.getElementById('data-version').textContent = appConfig.dataVersion;
}

function setupFamilyEventListeners() {
    // Line 탭 이벤트
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            currentLine = e.target.dataset.line;
            updateTabButtons();
            renderFamilyTree();
        });
    });
    
    // 세대 필터 이벤트
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', (e) => {
            currentGeneration = e.target.dataset.generation;
            updateFilterButtons();
            renderFamilyTree();
        });
    });
    
    // 상태 필터 이벤트
    document.querySelectorAll('.status-button').forEach(button => {
        button.addEventListener('click', (e) => {
            currentStatus = e.target.dataset.status;
            updateStatusButtons();
            renderFamilyTree();
        });
    });
}

function updateTabButtons() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.toggle('active', button.dataset.line === currentLine);
    });
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-button').forEach(button => {
        button.classList.toggle('active', button.dataset.generation === currentGeneration);
    });
}

function updateStatusButtons() {
    document.querySelectorAll('.status-button').forEach(button => {
        button.classList.toggle('active', button.dataset.status === currentStatus);
    });
}

// 필터링 캐시
const filterCache = new Map();

function getFilteredPersons() {
    const cacheKey = `${currentLine}-${currentGeneration}-${currentStatus}`;
    
    // 캐시에서 결과 확인
    if (filterCache.has(cacheKey)) {
        return filterCache.get(cacheKey);
    }
    
    let personIds = [];
    
    // 검색 인덱스 활용한 최적화된 필터링
    const filters = [];
    
    if (currentLine !== 'all') {
        filters.push(familyData.searchIndex.byLine[currentLine] || []);
    }
    
    if (currentGeneration !== 'all') {
        filters.push(familyData.searchIndex.byGeneration[currentGeneration] || []);
    }
    
    if (currentStatus !== 'all') {
        filters.push(familyData.searchIndex.byStatus[currentStatus] || []);
    }
    
    if (filters.length === 0) {
        // 모든 필터가 '전체'인 경우
        personIds = familyData.persons.map(person => person.id);
    } else {
        // 교집합 계산
        personIds = filters.reduce((intersection, currentFilter) => {
            if (intersection.length === 0) {
                return currentFilter;
            }
            return intersection.filter(id => currentFilter.includes(id));
        }, []);
    }
    
    // ID로 실제 Person 객체 조회
    const persons = personIds.map(id => 
        familyData.persons.find(person => person.id === id)
    ).filter(person => person !== undefined);
    
    // 결과 캐시에 저장
    filterCache.set(cacheKey, persons);
    
    return persons;
}

// 캐시 초기화 함수
function clearFilterCache() {
    filterCache.clear();
}

function renderFamilyTree() {
    const familyList = document.getElementById('familyList');
    
    // 로딩 표시
    familyList.innerHTML = '<div class="loading">가족 정보를 불러오는 중...</div>';
    
    // 약간의 지연을 두어 로딩 효과 표시
    setTimeout(() => {
        // 성능 측정
        const filteredPersons = measurePerformance(() => getFilteredPersons(), '필터링');
        
        familyList.innerHTML = '';
        
        if (filteredPersons.length === 0) {
            familyList.innerHTML = '<p class="no-results">해당 조건에 맞는 가족 구성원이 없습니다.</p>';
            return;
        }
        
        // 가족 트리 구조 생성
        const familyTree = measurePerformance(() => buildFamilyTree(filteredPersons), '트리 구조 생성');
        
        // 트리 렌더링
        measurePerformance(() => renderTreeStructure(familyTree, familyList), '트리 렌더링');
        
        // 통계 정보 표시
        displayStatistics(filteredPersons);
        
        // 지연 로딩 적용
        lazyLoadFamilyMembers();
        
    }, 300); // 300ms 지연
}

// 가족 트리 구조 생성
function buildFamilyTree(persons) {
    // 관계 정보를 기반으로 트리 구조 생성
    const personMap = new Map();
    persons.forEach(person => {
        personMap.set(person.id, person);
    });
    
    // 루트 노드 찾기 (아버지 정보가 없는 사람들)
    const rootPersons = persons.filter(person => !person.relationships.father);
    
    // 각 루트에서 시작하여 트리 구조 생성
    const trees = rootPersons.map(root => buildSubTree(root, personMap));
    
    return trees;
}

// 서브 트리 생성
function buildSubTree(person, personMap) {
    // 자녀 찾기
    const children = Array.from(personMap.values()).filter(p => 
        p.relationships.father === person.name
    );
    
    return {
        person: person,
        children: children.map(child => buildSubTree(child, personMap)),
        level: 0 // 트리 레벨 (들여쓰기용)
    };
}

// 트리 구조 렌더링
function renderTreeStructure(trees, container) {
    trees.forEach(tree => {
        renderTreeNode(tree, container, 0);
    });
}

// 트리 노드 렌더링
function renderTreeNode(node, container, level) {
    // 세대별 그룹 헤더 (레벨 0일 때만)
    if (level === 0) {
        const generationGroup = document.createElement('div');
        generationGroup.className = 'generation-group';
        
        const generationHeader = document.createElement('h3');
        generationHeader.className = 'generation-header';
        generationHeader.textContent = `${node.person.generation}세대`;
        generationGroup.appendChild(generationHeader);
        
        container.appendChild(generationGroup);
    }
    
    // 현재 노드 렌더링
    const memberElement = createFamilyMemberElement(node.person, level);
    container.appendChild(memberElement);
    
    // 자녀 노드들 렌더링
    node.children.forEach(child => {
        renderTreeNode(child, container, level + 1);
    });
}

function groupByGeneration(persons) {
    return persons.reduce((groups, person) => {
        const generation = person.generation;
        if (!groups[generation]) {
            groups[generation] = [];
        }
        groups[generation].push(person);
        return groups;
    }, {});
}

function createFamilyMemberElement(person, level = 0) {
    const memberElement = document.createElement('div');
    memberElement.className = 'family-member';
    memberElement.style.marginLeft = `${level * 20}px`; // 들여쓰기
    memberElement.onclick = () => showPersonDetail(person.id);
    
    const statusIcon = getStatusIcon(person.status);
    const generationBadge = `${person.generation}세대`;
    
    // 관계 정보 구성
    let relationshipInfo = '';
    if (person.relationships.father) {
        relationshipInfo += `아버지: ${person.relationships.father}`;
    }
    if (person.relationships.mother) {
        if (relationshipInfo) relationshipInfo += ' | ';
        relationshipInfo += `어머니: ${person.relationships.mother}`;
    }
    if (!relationshipInfo) {
        relationshipInfo = '관계 정보 없음';
    }
    
    // 트리 레벨에 따른 시각적 구분
    const levelIndicator = level > 0 ? '├─ ' : '';
    
    memberElement.innerHTML = `
        <span class="status-icon">${statusIcon}</span>
        <div class="member-info">
            <div class="member-name">${levelIndicator}${person.name}</div>
            <div class="member-details">${person.line} | ${relationshipInfo}</div>
        </div>
        <span class="generation-badge">${generationBadge}</span>
    `;
    
    // 레벨에 따른 스타일 적용
    if (level > 0) {
        memberElement.classList.add('child-member');
    }
    
    return memberElement;
}

function getStatusIcon(status) {
    switch(status) {
        case 'living': return '💚';
        case 'deceased': return '🙏';
        case 'unknown': return '❓';
        default: return '❓';
    }
}

function showPersonDetail(personId) {
    // 상세 정보 화면으로 이동
    window.location.href = `detail.html?id=${personId}`;
}

function displayStatistics(persons) {
    // 통계 정보 계산
    const stats = {
        total: persons.length,
        living: persons.filter(p => p.status === 'living').length,
        deceased: persons.filter(p => p.status === 'deceased').length,
        unknown: persons.filter(p => p.status === 'unknown').length,
        generations: [...new Set(persons.map(p => p.generation))].sort((a, b) => a - b)
    };
    
    // 통계 정보를 헤더에 표시 (선택사항)
    const header = document.querySelector('h1');
    if (header) {
        header.innerHTML = `📱 패밀리별 보기 <small style="font-size: 14px; color: #666;">(${stats.total}명)</small>`;
    }
    
    console.log('패밀리별 보기 통계:', stats);
}

// 키보드 네비게이션 지원
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // ESC 키로 뒤로가기
        history.back();
    }
});

// 페이지 가시성 변경 시 데이터 새로고침
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 페이지가 다시 보이면 데이터 새로고침
        if (familyData) {
            renderFamilyTree();
        }
    }
});

// 성능 모니터링
function measurePerformance(func, name) {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${name} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
}

// 지연 로딩 구현
function lazyLoadFamilyMembers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadFamilyMember(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.family-member').forEach(member => {
        observer.observe(member);
    });
}

function loadFamilyMember(memberElement) {
    // 지연 로딩 로직 (필요시 구현)
    memberElement.classList.add('loaded');
}

// 메모리 최적화
function optimizeMemory() {
    // 캐시 크기 제한
    if (filterCache.size > 50) {
        const keys = Array.from(filterCache.keys());
        const keysToDelete = keys.slice(0, 25); // 절반 삭제
        keysToDelete.forEach(key => filterCache.delete(key));
    }
    
    // 가비지 컬렉션 힌트
    if (window.gc) {
        window.gc();
    }
}

// 주기적 메모리 최적화
setInterval(optimizeMemory, 30000); // 30초마다

// 에러 처리
window.addEventListener('error', (e) => {
    console.error('패밀리별 보기 오류:', e.error);
    const familyList = document.getElementById('familyList');
    if (familyList) {
        familyList.innerHTML = '<p class="no-results">데이터를 불러오는 중 오류가 발생했습니다. 페이지를 새로고침해 주세요.</p>';
    }
});

// 네트워크 상태 모니터링
window.addEventListener('online', () => {
    console.log('네트워크 연결됨');
    if (familyData) {
        clearFilterCache();
        renderFamilyTree();
    }
});

window.addEventListener('offline', () => {
    console.log('네트워크 연결 끊김');
});
