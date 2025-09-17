// 촌수 계산기 (calculator.html 전용) - 단순 6단계 플로우
// 1) 첫 사람 입력 대기 → 2) 시작 ID 확인 → 3) 두번째 입력 대기
// 4) 도착 ID 확인 → 5) 두 ID로 촌수 계산 → 6) 촌수/호칭 표시

(function () {
    function $(id) { return document.getElementById(id); }

    // 전역 상태
    let selected = {
        p1: null, // { id, name }
        p2: null  // { id, name }
    };

    // 안전 로드: 데이터와 엔진 준비를 대기
    function waitReady(cb) {
        const ready = !!(window && window.CORE_DATA && Array.isArray(window.CORE_DATA) && window.ChonsuCalculator);
        if (ready) return cb();
        setTimeout(() => waitReady(cb), 100);
    }

    function searchByName(keyword) {
        if (!keyword) return [];
        const q = keyword.trim();
        if (!q) return [];
        return window.CORE_DATA.filter(p => (p.name || '').includes(q));
    }

    function renderModalList(results) {
        const list = $('modal-person-list');
        list.innerHTML = '';
        results.forEach(person => {
            const div = document.createElement('div');
            div.className = 'person-row';
            div.style.padding = '10px 8px';
            div.style.borderBottom = '1px solid #eee';
            div.style.cursor = 'pointer';
            div.textContent = `${person.name} (${person.세대 || '?'}세대)`;
            div.onclick = () => pickPerson(person);
            list.appendChild(div);
        });
        if (results.length === 0) {
            list.innerHTML = '<div style="padding:10px;color:#666;">검색 결과가 없습니다.</div>';
        }
    }

    // 모달 상태
    let targetIndex = 1; // 1 or 2
    function openPersonSelector(idx) {
        targetIndex = idx;
        $('modal-title').textContent = idx === 1 ? '첫 번째 사람 선택' : '두 번째 사람 선택';
        $('modal-search').value = '';
        renderModalList([]);
        $('person-modal').style.display = 'block';
        $('modal-search').focus();
    }

    function closePersonSelector() {
        $('person-modal').style.display = 'none';
    }

    function pickPerson(person) {
        if (targetIndex === 1) {
            selected.p1 = { id: person.id, name: person.name };
            $('person1-placeholder').textContent = `${person.name}`;
            $('person1-selected').style.display = 'block';
            $('person1-name').textContent = person.name;
            $('person1-details').textContent = `${person.세대 || '?'}세대`;
        } else {
            selected.p2 = { id: person.id, name: person.name };
            $('person2-placeholder').textContent = `${person.name}`;
            $('person2-selected').style.display = 'block';
            $('person2-name').textContent = person.name;
            $('person2-details').textContent = `${person.세대 || '?'}세대`;
        }
        updateCalculateButton();
        closePersonSelector();
    }

    function updateCalculateButton() {
        const btn = $('calculate-btn');
        btn.disabled = !(selected.p1 && selected.p2 && selected.p1.id !== selected.p2.id);
    }

    function calculateKinship() {
        if (!(selected.p1 && selected.p2)) return;
        const calc = new window.ChonsuCalculator();
        calc.loadData();
        const result = calc.calculateChonsu(selected.p1.id, selected.p2.id);
        renderResult(result);
        pushHistory(selected.p1.name, selected.p2.name, result);
    }

    function renderResult(result) {
        const section = $('result-section');
        const card = $('result-card');
        section.style.display = 'block';
        if (result.error) {
            card.innerHTML = `<div class="result-line">오류: ${result.error}</div>`;
            return;
        }
        card.innerHTML = `
            <div class="result-line">촌수: <b>${result.chonsu}촌</b></div>
            <div class="result-line">호칭: <b>${result.title}</b></div>
            ${result.commonAncestor ? `<div class="result-line">공통조상: ${result.commonAncestor}</div>` : ''}
        `;
    }

    function pushHistory(name1, name2, result) {
        const list = $('history-list');
        const row = document.createElement('div');
        row.className = 'history-row';
        row.style.padding = '8px 6px';
        row.style.borderBottom = '1px solid #eee';
        row.textContent = `${name1} ↔ ${name2} = ${result.error ? '오류' : result.chonsu + '촌 (' + result.title + ')'} `;
        list.prepend(row);
    }

    function wireEvents() {
        // 기존 버튼을 그대로 사용 (calculator.html 구조)
        window.openPersonSelector = openPersonSelector;
        window.closePersonSelector = closePersonSelector;
        window.searchPersons = function () {
            const kw = $('modal-search').value;
            renderModalList(searchByName(kw));
        }
        window.calculateKinship = calculateKinship;

        // 인라인 한 줄 입력 방식
        const listEl = $('names-list');
        if (listEl && window.CORE_DATA) {
            listEl.innerHTML = '';
            const names = Array.from(new Set(window.CORE_DATA.map(p => p.name))).sort();
            names.forEach(n => {
                const opt = document.createElement('option');
                opt.value = n;
                listEl.appendChild(opt);
            });
        }

        const inlineBtn = $('inline-calc-btn');
        if (inlineBtn) {
            inlineBtn.addEventListener('click', () => {
                const n1 = $('inline-person1').value.trim();
                const n2 = $('inline-person2').value.trim();
                const resDiv = $('inline-result');
                resDiv.textContent = '';

                if (!n1 || !n2 || n1 === n2) {
                    resDiv.textContent = '두 사람의 이름을 서로 다르게 입력하세요.';
                    return;
                }

                const p1 = window.CORE_DATA.find(p => p.name === n1);
                const p2 = window.CORE_DATA.find(p => p.name === n2);
                if (!p1 || !p2) {
                    resDiv.textContent = '입력한 이름을 데이터에서 찾을 수 없습니다.';
                    return;
                }

                const calc = new window.ChonsuCalculator();
                calc.loadData();
                const result = calc.calculateChonsu(p1.id, p2.id);
                if (result.error) {
                    resDiv.textContent = `오류: ${result.error}`;
                } else {
                    resDiv.textContent = `결과: ${result.chonsu}촌 (${result.title})` + (result.commonAncestor ? `, 공통조상: ${result.commonAncestor}` : '');
                }
            });
        }

        // 검색 버튼(가시성 향상: 클릭 시 datalist 드롭다운 도움)
        const triggerList = (inputId) => {
            const el = $(inputId);
            if (!el) return;
            el.focus();
            // 입력 보조를 위해 현재 값을 그대로 두고 select 목록을 보이게 유도
            const val = el.value;
            el.value = '';
            setTimeout(() => { el.value = val; }, 0);
        };
        const s1 = $('inline-search-1'); if (s1) s1.onclick = () => triggerList('inline-person1');
        const s2 = $('inline-search-2'); if (s2) s2.onclick = () => triggerList('inline-person2');

        // 한 사람 입력: 현재 사용자(나) → 대상
        const currentUserName = (window.APP_CURRENT_USER && window.APP_CURRENT_USER.name) || null;

        const singleBtn = $('inline-single-calc');
        if (singleBtn) {
            singleBtn.addEventListener('click', () => {
                const targetName = $('inline-single').value.trim();
                const out = $('inline-single-result');
                out.textContent = '';
                
                if (!targetName) {
                    out.textContent = '대상 이름을 입력하세요.';
                    return;
                }
                
                if (!window.APP_CURRENT_USER) {
                    out.textContent = '나 설정이 필요합니다. 먼저 본인을 설정해주세요.';
                    if (meModal) meModal.style.display = 'block';
                    return;
                }
                
                const me = window.CORE_DATA.find(p => p.id === window.APP_CURRENT_USER.id);
                const target = window.CORE_DATA.find(p => p.name === targetName);
                
                if (!me || !target) {
                    out.textContent = '대상 또는 나를 데이터에서 찾을 수 없습니다.';
                    return;
                }
                
                const calc = new window.ChonsuCalculator();
                calc.loadData();
                const result = calc.calculateChonsu(me.id, target.id);
                out.textContent = result.error ? `오류: ${result.error}` : `결과: ${result.chonsu}촌 (${result.title})` + (result.commonAncestor ? `, 공통조상: ${result.commonAncestor}` : '');
            });
        }

        const sSingle = $('inline-search-single'); if (sSingle) sSingle.onclick = () => triggerList('inline-single');

        // 나 설정 모달 로직
        const meModal = $('me-modal');
        const meSearch = $('me-search');
        const meResults = $('me-results');
        const meConfirm = $('me-confirm');
        const meClose = $('me-close');
        const meClear = $('me-clear');

        let selectedMe = null;

        function renderMeResults(keyword) {
            if (!keyword) { meResults.innerHTML = ''; meConfirm.disabled = true; return; }
            const list = window.CORE_DATA.filter(p => (p.name || '').includes(keyword));
            meResults.innerHTML = '';
            list.forEach(p => {
                const row = document.createElement('div');
                row.style.padding = '8px';
                row.style.borderBottom = '1px solid #eee';
                row.style.cursor = 'pointer';
                const father = (p.relationships && p.relationships.father) ? p.relationships.father : '-';
                row.textContent = `${p.name} (${p.세대 || '?'}세대) · 부: ${father}`;
                row.onclick = () => { selectedMe = { id: p.id, name: p.name }; meConfirm.disabled = false; };
                meResults.appendChild(row);
            });
        }

        if (meSearch) {
            meSearch.addEventListener('input', () => renderMeResults(meSearch.value.trim()));
        }
        if (meConfirm) {
            meConfirm.addEventListener('click', () => {
                if (!selectedMe) return;
                localStorage.setItem('gia_current_user', JSON.stringify(selectedMe));
                if (meModal) meModal.style.display = 'none';
                window.APP_CURRENT_USER = selectedMe;
                updateHeaderUI();
                hideExceptionBanner();
            });
        }
        if (meClose) meClose.onclick = () => { if (meModal) meModal.style.display = 'none'; };
        if (meClear) meClear.onclick = () => { 
            localStorage.removeItem('gia_current_user'); 
            selectedMe = null; 
            meConfirm.disabled = true; 
            meResults.innerHTML=''; 
            if (meSearch) meSearch.value='';
            window.APP_CURRENT_USER = null;
            updateHeaderUI();
        };

        // 헤더 UI 업데이트 함수
        function updateHeaderUI() {
            const headerInfo = $('header-user-info');
            const headerUser = $('header-current-user');
            const metaNameEl = $('current-user-name');
            
            if (window.APP_CURRENT_USER) {
                const user = window.APP_CURRENT_USER;
                const person = window.CORE_DATA.find(p => p.id === user.id);
                const displayName = person ? `${user.name} (${person.세대 || '?'}세대)` : user.name;
                
                if (headerUser) headerUser.textContent = displayName;
                if (metaNameEl) metaNameEl.textContent = user.name;
                if (headerInfo) headerInfo.style.display = 'block';
            } else {
                if (headerUser) headerUser.textContent = '(미설정)';
                if (metaNameEl) metaNameEl.textContent = '(미설정)';
                if (headerInfo) headerInfo.style.display = 'none';
            }
        }

        // 나 변경 버튼 이벤트
        const changeUserBtn = $('change-user-btn');
        if (changeUserBtn) {
            changeUserBtn.addEventListener('click', () => {
                if (meModal) meModal.style.display = 'block';
            });
        }

        // 예외 처리 배너 관리
        function showExceptionBanner(message) {
            const banner = $('exception-banner');
            const messageEl = $('exception-message');
            if (banner && messageEl) {
                messageEl.textContent = message;
                banner.style.display = 'block';
            }
        }

        function hideExceptionBanner() {
            const banner = $('exception-banner');
            if (banner) banner.style.display = 'none';
        }

        // 예외 배너 닫기 버튼
        const exceptionClose = $('exception-close');
        if (exceptionClose) {
            exceptionClose.addEventListener('click', hideExceptionBanner);
        }

        // 데이터 무결성 검사
        function validateCurrentUser() {
            if (!window.APP_CURRENT_USER) return true;
            
            const user = window.APP_CURRENT_USER;
            const person = window.CORE_DATA.find(p => p.id === user.id);
            
            if (!person) {
                showExceptionBanner('저장된 사용자 정보가 데이터에서 찾을 수 없습니다. 나 설정을 다시 해주세요.');
                localStorage.removeItem('gia_current_user');
                window.APP_CURRENT_USER = null;
                updateHeaderUI();
                return false;
            }
            
            if (person.name !== user.name) {
                showExceptionBanner('사용자 이름이 변경되었습니다. 나 설정을 다시 해주세요.');
                localStorage.removeItem('gia_current_user');
                window.APP_CURRENT_USER = null;
                updateHeaderUI();
                return false;
            }
            
            return true;
        }

        // 최초 진입: 저장된 사용자 없으면 모달 오픈
        const saved = localStorage.getItem('gia_current_user');
        if (saved) {
            try {
                window.APP_CURRENT_USER = JSON.parse(saved);
                if (validateCurrentUser()) {
                    updateHeaderUI();
                } else if (meModal) {
                    meModal.style.display = 'block';
                }
            } catch (e) { 
                localStorage.removeItem('gia_current_user');
                if (meModal) meModal.style.display = 'block';
            }
        } else if (meModal) {
            meModal.style.display = 'block';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        console.log('calculator_standalone DOM ready');
        waitReady(() => {
            console.log('데이터/엔진 준비 완료');
            wireEvents();
            // UI 초기 상태 세팅
            updateCalculateButton();
        });
    });
})();


