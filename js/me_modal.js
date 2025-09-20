// 메인 화면용 나 설정 모달 - 촌수계산기와 동일한 개선된 모듈
(function(){
    const MeModal = {
        open() { 
            const m = document.getElementById('me-modal'); 
            if(m) { 
                m.style.display = 'block'; 
                const i = document.getElementById('me-search'); 
                if(i) i.focus(); 
            } 
        },
        close() { 
            const m = document.getElementById('me-modal'); 
            if(m) m.style.display = 'none'; 
        },
        
        init() {
            const meModal = document.getElementById('me-modal');
            const meSearch = document.getElementById('me-search');
            const meResults = document.getElementById('me-results');
            const meClose = document.getElementById('me-close');
            const meClear = document.getElementById('me-clear');

            if (!meModal || !meSearch || !meResults) return;

            let selectedMe = null;

            // 직접 선택 및 확정 기능 (촌수계산기와 동일)
            function selectMeDirectly(person) {
                if (!person) return;
                selectedMe = { id: person.id, name: person.name };
                localStorage.setItem('gia_current_user', JSON.stringify(selectedMe));
                if (meModal) meModal.style.display = 'none';
                window.APP_CURRENT_USER = selectedMe;
                
                // 메인 화면 UI 업데이트
                if (typeof window.displayCurrentUser === 'function') {
                    window.displayCurrentUser();
                }
                if (typeof window.updateSettingsCurrentUser === 'function') {
                    window.updateSettingsCurrentUser();
                }
                
                // 성공 피드백
                showSuccessMessage(`"${person.name}"(으)로 설정되었습니다!`);
            }

            // 토스트 메시지 표시 (촌수계산기와 동일)
            function showSuccessMessage(message) {
                const toast = document.createElement('div');
                toast.style.cssText = `
                    position: fixed; top: 20px; right: 20px; z-index: 10000;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white; padding: 12px 20px; border-radius: 8px;
                    font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                    animation: slideIn 0.3s ease-out;
                `;
                toast.textContent = message;
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.style.animation = 'slideOut 0.3s ease-in forwards';
                    setTimeout(() => document.body.removeChild(toast), 300);
                }, 2000);
            }

            // 검색 결과 렌더링 (촌수계산기와 동일한 스타일)
            function renderMeResults(keyword) {
                if (!keyword) { 
                    meResults.innerHTML = '<div class="me-no-results"><span class="me-search-hint">💡 이름을 입력하면 검색 결과가 나타납니다</span></div>';
                    return; 
                }
                
                const list = (window.CORE_DATA || []).filter(p => (p.name || '').includes(keyword));
                meResults.innerHTML = '';
                
                if (list.length === 0) {
                    meResults.innerHTML = '<div class="me-no-results"><span class="me-search-hint">❌ 검색 결과가 없습니다</span></div>';
                    return;
                }
                
                list.forEach(p => {
                    const row = document.createElement('div');
                    row.className = 'me-person-item';
                    
                    const info = document.createElement('div');
                    info.className = 'me-person-info';
                    
                    const name = document.createElement('div');
                    name.className = 'me-person-name';
                    name.textContent = p.name;
                    
                    const details = document.createElement('div');
                    details.className = 'me-person-details';
                    // ID에서 세대 추출: L3-G4-M-S-176 → G4 → 4세대
                    const generation = p.id ? p.id.split('-')[1]?.substring(1) : (p.세대 || p.generation);
                    const father = (p.relationships && p.relationships.father) ? p.relationships.father : '미상';
                    details.textContent = `${generation || '?'}세대 · 부: ${father}`;
                    
                    info.appendChild(name);
                    info.appendChild(details);
                    
                    const selectBtn = document.createElement('button');
                    selectBtn.className = 'me-select-btn';
                    selectBtn.textContent = '선택';
                    selectBtn.onclick = (e) => {
                        e.stopPropagation();
                        selectMeDirectly(p);
                    };
                    
                    row.appendChild(info);
                    row.appendChild(selectBtn);
                    row.onclick = () => selectMeDirectly(p);
                    
                    meResults.appendChild(row);
                });
            }

            // 이벤트 리스너 설정
            if (meSearch) {
                meSearch.addEventListener('input', () => renderMeResults(meSearch.value.trim()));
                meSearch.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const name = meSearch.value.trim();
                        if (name) {
                            const person = (window.CORE_DATA || []).find(p => p.name === name);
                            if (person) selectMeDirectly(person);
                        }
                    }
                });
            }

            if (meClose) meClose.onclick = () => { if (meModal) meModal.style.display = 'none'; };
            
            if (meClear) meClear.onclick = () => { 
                // 로컬스토리지에서 사용자 정보 삭제
                localStorage.removeItem('gia_current_user'); 
                selectedMe = null; 
                
                // 검색 결과 및 입력 필드 초기화
                meResults.innerHTML = '<div class="me-no-results"><span class="me-search-hint">💡 이름을 입력하면 검색 결과가 나타납니다</span></div>'; 
                if (meSearch) meSearch.value = '';
                
                // 전역 변수 초기화
                window.APP_CURRENT_USER = null;
                if (typeof window.currentUser !== 'undefined') {
                    window.currentUser = null;
                }
                
                // UI 업데이트 - 메인 화면과 설정 화면 모두
                if (typeof window.displayCurrentUser === 'function') {
                    window.displayCurrentUser();
                }
                if (typeof window.updateSettingsCurrentUser === 'function') {
                    window.updateSettingsCurrentUser();
                }
                
                // 성공 피드백
                showSuccessMessage("사용자 설정이 초기화되었습니다!");
                
                // 모달 닫기
                if (meModal) meModal.style.display = 'none';
            };
        }
    };

    window.MeModal = MeModal;
    document.addEventListener('DOMContentLoaded', () => MeModal.init());
})();
