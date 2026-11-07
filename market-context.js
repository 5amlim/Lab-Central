/* One market selection for all Lab Central pages. Clinic choices remain local to each page. */
(function(){
  'use strict';
  const markets=[
    {id:'socal',name:'Southern California'},
    {id:'norcal',name:'Northern California'},
    {id:'ny',name:'New York'},
    {id:'fl',name:'Florida'}
  ];
  const key='labCentralSelectedMarket';
  const valid=id=>markets.some(item=>item.id===id);
  let selected='socal';
  try { const stored=localStorage.getItem(key); if(valid(stored))selected=stored; } catch(_) {}
  function get(){return selected;}
  function label(){return markets.find(m=>m.id===selected).name;}
  function set(id){
    if(!valid(id)||selected===id)return false;
    selected=id;
    try {localStorage.setItem(key,id);} catch(_) {}
    const input=document.getElementById('labCentralMarket');
    if(input)input.value=id;
    document.dispatchEvent(new CustomEvent('labcentral:marketchange',{detail:{market:id}}));
    return true;
  }
  function mount(){
    const select=document.getElementById('labCentralMarket');
    if(!select)return;
    select.value=selected;
    select.addEventListener('change',()=>set(select.value));
  }
  window.LAB_MARKET={get,set,label,markets};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
