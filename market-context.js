/* Portal-level market context. The selected market travels with the portal URL,
   rather than being saved as a browser preference. */
(function(){
 'use strict';
 const markets=[
  {id:'socal',name:'Southern California',short:'SoCal'},
  {id:'norcal',name:'Northern California',short:'NorCal'},
  {id:'ny',name:'New York',short:'New York'},
  {id:'fl',name:'Florida',short:'Florida'}
 ];
 const valid=id=>markets.some(m=>m.id===id);
 let initial=null;
 try {initial=new URLSearchParams(window.location.search).get('market')} catch(_){}
 let selected=valid(initial)?initial:'socal';
 const get=()=>selected;
 const current=()=>markets.find(m=>m.id===selected);
 const label=()=>current().name;
 const dom=(id)=>document.getElementById(id);
 function sync(){
  const labelNode=dom('labCentralMarketLabel');
  if(labelNode)labelNode.textContent=label();
  const list=dom('labCentralMarketOptions');
  if(list)list.querySelectorAll('[data-lc-market-option]').forEach(option=>{
   const chosen=option.dataset.lcMarketOption===selected;
   option.setAttribute('aria-selected',String(chosen));
   option.classList.toggle('is-selected',chosen);
  });
 }
 function expand(show,restoreFocus=false){
  const button=dom('labCentralMarket');
  const list=dom('labCentralMarketOptions');
  if(!button||!list)return;
  list.hidden=!show;
  button.setAttribute('aria-expanded',String(show));
  button.closest('.lc-global-market')?.classList.toggle('is-open',show);
  if(show)list.querySelector('[aria-selected="true"]')?.focus({preventScroll:true});
  else if(restoreFocus)button.focus({preventScroll:true});
 }
 function set(id){
  if(!valid(id))return false;
  const changed=id!==selected;
  selected=id;
  try {
   const url=new URL(window.location.href);
   url.searchParams.set('market',id);
   window.history.replaceState(window.history.state,'',url.pathname+url.search+url.hash);
  }catch(_){}
  sync();
  expand(false);
  if(changed)document.dispatchEvent(new CustomEvent('labcentral:marketchange',{detail:{market:id}}));
  return changed;
 }
 function mount(){
  const trigger=dom('labCentralMarket');
  const list=dom('labCentralMarketOptions');
  if(!trigger||!list)return;
  sync();
  trigger.addEventListener('click',()=>expand(trigger.getAttribute('aria-expanded')!=='true'));
  list.addEventListener('click',event=>{
   const item=event.target.closest('[data-lc-market-option]');
   if(item)set(item.dataset.lcMarketOption);
  });
  document.addEventListener('click',event=>{
   if(!event.target.closest('.lc-global-market'))expand(false);
  });
  document.addEventListener('keydown',event=>{
   if(event.key==='Escape'&&!list.hidden){event.preventDefault();expand(false,true);return;}
   const options=[...list.querySelectorAll('[data-lc-market-option]')];
   const i=options.indexOf(document.activeElement);
   if(i>=0&&['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
    event.preventDefault();
    const j=event.key==='Home'?0:event.key==='End'?options.length-1:(i+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
    options[j].focus({preventScroll:true});
   }
   if(trigger===document.activeElement&&['ArrowDown','ArrowUp'].includes(event.key)){
    event.preventDefault();expand(true);
   }
  });
 }
 window.LAB_MARKET={get,set,label,markets};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
 else mount();
})();
