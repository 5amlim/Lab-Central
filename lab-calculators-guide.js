/* Market-aware calculator and molecular sendout directory. Matches API PT selector controls. */
(function(){
"use strict";
const E=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const markets=[
 {id:"socal",short:"SoCal",name:"Southern California",clinics:[["bh","Beverly Hills"],["bh-satellite","Beverly Hills Satellite"],["sm","Santa Monica"],["mb","Manhattan Beach"]]},
 {id:"norcal",short:"NorCal",name:"Northern California",clinics:[["sf","San Francisco"],["palo-alto","Palo Alto"]]},
 {id:"ny",short:"New York",name:"New York",clinics:[["ues","Upper East Side"],["tribeca","Tribeca"],["hamptons","Hamptons"],["fifth","5th Avenue"],["gramercy","Gramercy"],["hudson-yards","Hudson Yards"]]},
 {id:"fl",short:"Florida",name:"Florida",clinics:[["boca","Boca Raton"],["palm-beach","Palm Beach"],["coral-gables","Coral Gables"]]}
];
let activeMarket="socal";
const selectedClinics=Object.fromEntries(markets.map(m=>[m.id,m.clinics[0][0]]));
function current(){
 const market=markets.find(m=>m.id===activeMarket)||markets[0];
 const clinic=market.clinics.find(c=>c[0]===selectedClinics[market.id])||market.clinics[0];
 return {market,clinic};
}
function allows(vendor){return vendor!=="cedars"||activeMarket==="socal";}
function market(){return activeMarket;}
function count(){return activeMarket==="socal"?5:activeMarket==="ny"?2:4;}
function selector(){
 const {market:m,clinic:c}=current();
 return '<section id="calc2-site-selector" class="calc2-site-selector" aria-label="Lab calculators and guides market and clinic">'+
  '<nav class="dqc-market-picker" aria-label="Select market for lab calculators and guides"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+
   markets.map(item=>'<button type="button" class="dqc-market-choice'+(item.id===m.id?' is-selected':'')+'" data-calc2-market="'+E(item.id)+'" aria-pressed="'+(item.id===m.id)+'">'+E(item.short)+'</button>').join('')+
  '</div></nav>'+
  '<div class="dqc-location-bar"><span class="dqc-location-label" id="calc2-clinic-label">Clinic location</span>'+
  '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-calc2-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="calc2-location-options" aria-labelledby="calc2-clinic-label calc2-clinic-value">'+
   '<span id="calc2-clinic-value">'+E(c[1])+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
   '<div class="dqc-location-options" id="calc2-location-options" role="listbox" aria-labelledby="calc2-clinic-label" hidden>'+
    m.clinics.map(cl=>'<button type="button" role="option" data-calc2-clinic="'+E(cl[0])+'" class="dqc-location-option'+(cl[0]===c[0]?' is-selected':'')+'" aria-selected="'+(cl[0]===c[0])+'" tabindex="-1">'+E(cl[1])+(cl[0]===c[0]?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
   '</div></div><span class="dqc-location-hint">Select a clinic to view its reference tools</span></div>'+
  '<div class="dqc-market-heading"><div><span class="dqc-market-overline">LAB REFERENCE TOOLS / '+E(m.short).toUpperCase()+'</span>'+
   '<h2>'+E(c[1])+'</h2><p>'+E(m.name)+' · Confirm individual lab account activation, panels, collection kits and courier details for this clinic before sending specimens.</p></div></div>'+
 '</section>';
}
function moleculeIcon(){
 return '<svg viewBox="0 0 52 52" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">'+
 '<path d="M13 10l13 8 13-8M13 26l13 8 13-8M13 42l13-8 13 8M13 10v16m26-16v16M13 26v16m26-16v16"/>'+
 '<circle cx="13" cy="10" r="3.5" fill="#fff"/><circle cx="39" cy="10" r="3.5" fill="#fff"/>'+
 '<circle cx="26" cy="18" r="3.5" fill="#fff"/><circle cx="13" cy="26" r="3.5" fill="#fff"/>'+
 '<circle cx="39" cy="26" r="3.5" fill="#fff"/><circle cx="26" cy="34" r="3.5" fill="#fff"/>'+
 '<circle cx="13" cy="42" r="3.5" fill="#fff"/><circle cx="39" cy="42" r="3.5" fill="#fff"/></svg>';
}
function molecular(){
 if(activeMarket==="ny")return '';
 const {market:m,clinic:c}=current();
 const entries=[
  {id:"htrx",name:"HealthTrackRx",tag:"HEALTHTRACKRX",title:"Molecular testing guide",tone:"htrx",desc:"Molecular sendout specimen collection, kit selection, manifest and handoff.",tips:["Check the ordered panel, specimen source and HTRX-approved kit.","Match patient identifiers, requisition and specimen collection date/time.","Confirm the site’s current UPS or courier schedule and manifest process."]},
  {id:"pathmd",name:"PathMD",tag:"PATHMD",title:"Molecular testing guide",tone:"pathmd",desc:"Molecular test collection and routing reference. Site activation may still be pending.",tips:["Confirm the selected clinic is activated and the panel is approved.","Verify PathMD-specific collection media, requisition and kit instructions.","Use the approved PathMD pickup and tracking process, not an assumed HTRX courier."]}
 ];
 return '<section class="calc2-molecular-section" aria-labelledby="calc2-molecular-heading">'+
  '<div class="calc2-section-heading"><div><span class="calc-guide-eyebrow">SPECIALTY SENDOUTS</span><h2 id="calc2-molecular-heading">Molecular testing</h2><p>HealthTrackRx and PathMD references for '+E(m.name)+'. Check clinic-specific activation before use.</p></div><span class="calc2-category-tag">2 guides</span></div>'+
  '<div class="calculator-grid calc2-molecular-grid">'+entries.map(v=>'<article class="calculator-card calc2-molecular-card '+v.tone+'">'+
   '<div class="calculator-top"><span class="calculator-tag">'+E(v.tag)+'</span><span class="calc2-type-badge">MOLECULAR</span></div>'+
   '<div class="calculator-brand-title"><span class="calc2-molecule-icon">'+moleculeIcon()+'</span><h2>'+E(v.name)+'</h2></div>'+
   '<p>'+E(v.desc)+'</p>'+
   '<div class="calc2-clinic-note"><strong>'+E(c[1])+'</strong><span>Verify approved panels, specimen media and courier arrangements.</span></div>'+
   '<details class="calc2-guide-details"><summary>Collection &amp; sendout checkpoints <span class="calc2-detail-chevron" aria-hidden="true"></span></summary><ol>'+v.tips.map(t=>'<li>'+E(t)+'</li>').join('')+'</ol></details>'+
   '<button type="button" class="calculator-go calc2-molecular-go" data-calc2-sendout="'+E(v.id)+'">Open '+E(v.name)+' sendout guide <span aria-hidden="true">↗</span></button>'+
  '</article>').join('')+'</div>'+
  '<p class="calc2-molecular-warning">Availability is not confirmed by this directory. Never substitute collection kits, specimens or courier instructions between molecular laboratories.</p>'+
 '</section>';
}
function setMenu(open,focusSelected=false,restore=false){
 const picker=document.querySelector('#calc2-site-selector .dqc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-calc2-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&restore)trigger.focus();
}
function updatePage(focusClinic=false){
 document.dispatchEvent(new CustomEvent('lc-calculators-change'));
 if(focusClinic)document.querySelector('#calc2-site-selector [data-calc2-toggle]')?.focus();
}
document.addEventListener('click',event=>{
 const btn=event.target.closest('#calc2-site-selector [data-calc2-market]');
 if(btn){
  const next=btn.dataset.calc2Market;
  if(markets.some(m=>m.id===next)&&next!==activeMarket){activeMarket=next;updatePage();}
  return;
 }
 const toggle=event.target.closest('#calc2-site-selector [data-calc2-toggle]');
 if(toggle){setMenu(toggle.getAttribute('aria-expanded')!=='true');return;}
 const clinic=event.target.closest('#calc2-site-selector [data-calc2-clinic]');
 if(clinic){
  const m=current().market,id=clinic.dataset.calc2Clinic;
  if(m.clinics.some(c=>c[0]===id)){selectedClinics[m.id]=id;updatePage(true);}
  return;
 }
 const sendout=event.target.closest('[data-calc2-sendout]');
 if(sendout){
  const {market:m,clinic:c}=current();
  window.LAB_SENDOUT_MARKETS?.select?.(m.id,c[0]);
  location.hash='#sendout';
  return;
 }
 if(!event.target.closest('#calc2-site-selector .dqc-location-picker'))setMenu(false);
});
document.addEventListener('keydown',event=>{
 const toggle=event.target.closest('#calc2-site-selector [data-calc2-toggle]');
 if(toggle&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
  event.preventDefault();setMenu(true,true);
  if(event.key==='ArrowUp'){
   const options=[...document.querySelectorAll('#calc2-site-selector [data-calc2-clinic]')];
   options[options.length-1]?.focus();
  }
  return;
 }
 if(toggle&&event.key==='Escape'){event.preventDefault();setMenu(false,false,true);return;}
 const clinic=event.target.closest('#calc2-site-selector [data-calc2-clinic]');
 if(!clinic)return;
 if(event.key==='Escape'){event.preventDefault();setMenu(false,false,true);return;}
 if(event.key==='Tab'){setMenu(false);return;}
 const options=[...document.querySelectorAll('#calc2-site-selector [data-calc2-clinic]')];
 const idx=options.indexOf(clinic);
 const next=event.key==='ArrowDown'?options[(idx+1)%options.length]:
  event.key==='ArrowUp'?options[(idx-1+options.length)%options.length]:
  event.key==='Home'?options[0]:event.key==='End'?options[options.length-1]:null;
 if(next){event.preventDefault();next.focus();}
});
window.LAB_CALCULATORS_GUIDE={selector,molecular,allows,market,count};
})();