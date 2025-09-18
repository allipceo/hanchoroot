(function(){
  const MeModal = {
    open(){ const m=document.getElementById('me-modal'); if(m) { m.style.display='block'; const i=document.getElementById('me-search'); if(i) i.focus(); } },
    close(){ const m=document.getElementById('me-modal'); if(m) m.style.display='none'; },
    _selected:null,
    init(){
      const m=document.getElementById('me-modal'); if(!m) return;
      const input=document.getElementById('me-search');
      const results=document.getElementById('me-results');
      const confirmBtn=document.getElementById('me-confirm');
      const closeBtn=document.getElementById('me-close');
      const clearBtn=document.getElementById('me-clear');
      const render=(kw)=>{
        results.innerHTML='';
        if(!kw){ confirmBtn.disabled=true; return; }
        const list=(window.CORE_DATA||[]).filter(p=> (p.name||'').includes(kw));
        if(list.length===0){ results.innerHTML='<div style="padding:8px;color:#666;">검색 결과가 없습니다.</div>'; confirmBtn.disabled=true; return; }
        list.forEach(p=>{
          const row=document.createElement('div');
          row.style.padding='8px'; row.style.borderBottom='1px solid #eee'; row.style.cursor='pointer';
          const father=(p.relationships && p.relationships.father) ? p.relationships.father : '-';
          row.textContent=`${p.name} (${p.세대||'?'}세대) · 부: ${father}`;
          row.addEventListener('click', ()=>{
            if(confirm(`"${p.name}"(으)로 설정하시겠습니까?`)){
              MeModal._selected={id:p.id, name:p.name};
              confirmBtn.disabled=false; try{confirmBtn.focus();}catch(e){}
            }
          });
          results.appendChild(row);
        })
      };
      if(input){
        input.addEventListener('input', ()=>render(input.value.trim()));
        input.addEventListener('keypress', e=>{ if(e.key==='Enter'){ render(input.value.trim()); } });
      }
      if(confirmBtn){
        confirmBtn.addEventListener('click', ()=>{
          if(!MeModal._selected) return;
          localStorage.setItem('gia_current_user', JSON.stringify(MeModal._selected));
          window.APP_CURRENT_USER=MeModal._selected;
          MeModal.close();
          if(typeof window.updateHeaderUI==='function') window.updateHeaderUI();
        });
      }
      if(closeBtn) closeBtn.onclick=()=>MeModal.close();
      if(clearBtn) clearBtn.onclick=()=>{ localStorage.removeItem('gia_current_user'); MeModal._selected=null; confirmBtn.disabled=true; results.innerHTML=''; if(input) input.value=''; window.APP_CURRENT_USER=null; if(typeof window.updateHeaderUI==='function') window.updateHeaderUI(); };
    }
  };
  window.MeModal=MeModal;
  document.addEventListener('DOMContentLoaded', ()=> MeModal.init());
})();
