/* Read-only daily laboratory reference by market. Official logs remain the record. */
(function(){
'use strict';
const socalTasks=[
 {id:'bins',group:'Courier readiness',title:'Check receiving-lab sendout bins',desc:'At opening, inspect Quest, Labcorp, Cedars and other designated bins for uncollected specimens or misplaced bags. Check labels and conditions before moving anything.',role:'Lab personnel / RN'},
 {id:'quest-lockbox',group:'Courier readiness',title:'Check the Quest lockbox',desc:'Confirm no prior-day samples or unresolved courier pickup remain. Verify correct secure holding and escalate missed collections promptly.',role:'Lab personnel / RN'},
 {id:'htrx',group:'Courier readiness',title:'Check the HealthTrackRx UPS bag',desc:'Check the assigned HTRX collection bag and handoff location first thing. Flag a missed or overnight bag immediately; follow SoCal courier schedule and temperature requirements.',role:'Lab personnel / RN'},
 {id:'clean',group:'Environment & logs',title:'Cleaning and disinfection log',desc:'Confirm required bench and station disinfection is documented with the product/contact time and any outstanding cleaning issue addressed.',role:'Lab personnel / RN'},
 {id:'fridge',group:'Environment & logs',title:'Refrigerator temperature',desc:'Read, record and assess current/min/max where applicable. Escalate excursions, quarantine affected material as directed, and document corrective action.',role:'Lab personnel / RN'},
 {id:'freezer',group:'Environment & logs',title:'Freezer temperature',desc:'Verify required freezer checks and out-of-range alarms. Do not assume thawed reagents or controls are usable without review.',role:'Lab personnel / RN'},
 {id:'room',group:'Environment & logs',title:'Room temperature and humidity',desc:'Record the room conditions and compare them with all active instrument/reagent allowable operating ranges. Report excursions.',role:'Lab personnel / RN'},
 {id:'clinitek',group:'Instrument QC & readiness',title:'Siemens urinalysis analyzer cleaning / QA',desc:'Clean/check the Clinitek test table and appropriate strip or cassette insert per SOP. Check the current UA/hCG QC status and new-bottle requirements before testing.',role:'Trained lab personnel / RN'},
 {id:'sysmex',group:'Instrument QC & readiness',title:'Sysmex pocH daily QC and blank check',desc:'Run/verify three-level EIGHTCHECK control and approved blank/background check. Confirm acceptable results and print/file QC and blank records in the binder.',role:'Authorized lab personnel'},
 {id:'triage',group:'Instrument QC & readiness',title:'Triage electronic QC Device',desc:'Run the reusable electronic QC Device daily when patient testing is performed. Separately review each active assay lot liquid-QC due date and new shipment/lot requirements.',role:'Authorized lab personnel'},
 {id:'rapid',group:'Instrument QC & readiness',title:'Rapid POC station and test-kit QC',desc:'Check supplies, stock, expiry and required new shipment/lot QC for QuickVue, Sofia, FebriDx and other active POC kits. Document any failed controls or unavailable kits.',role:'Lab personnel / RN'},
 {id:'navigator',group:'Tasks & handoff',title:'Check and resolve Navigator tasks',desc:'Review open specimen follow-ups, rejected tests, provider communications and lab-related Navigator tasks. Close only resolved items and hand off outstanding issues.',role:'Lab personnel / RN'}
];
const sharedTasks=[
 {id:'pending',group:'Courier readiness',title:'Review sendout bins and staging areas',desc:'Check for samples or transport bags remaining from the previous shift. Verify required storage and resolve pending handoffs.',role:'Lab personnel / RN'},
 {id:'couriers',group:'Courier readiness',title:'Confirm courier pickup readiness',desc:'Check assigned lockboxes, pickup points and shipping bags as applicable. Escalate missed pickups using your market procedure.',role:'Lab personnel / RN'},
 {id:'clean',group:'Environment & logs',title:'Cleaning and disinfection log',desc:'Confirm required work areas have been disinfected and the approved cleaning record is current.',role:'Lab personnel / RN'},
 {id:'fridge',group:'Environment & logs',title:'Refrigerator temperature',desc:'Record and review refrigerator temperatures. Follow local escalation and quarantine procedures for excursions.',role:'Lab personnel / RN'},
 {id:'freezer',group:'Environment & logs',title:'Freezer temperature',desc:'Check applicable freezer temperatures and alarms. Escalate excursions before using affected reagents or controls.',role:'Lab personnel / RN'},
 {id:'room',group:'Environment & logs',title:'Room temperature and humidity',desc:'Review and document ambient conditions against the limits of equipment and reagents in use.',role:'Lab personnel / RN'},
 {id:'analyzers',group:'Instrument QC & readiness',title:'Review active analyzer QC and maintenance',desc:'Confirm due QC, calibration, cleaning and required records for installed analyzers. Perform testing only when authorized.',role:'Authorized personnel'},
 {id:'rapid',group:'Instrument QC & readiness',title:'Check rapid and POC test readiness',desc:'Check stock, expiration and kit-specific QC requirements for tests used at your clinic.',role:'Trained personnel'},
 {id:'handoff',group:'Tasks & handoff',title:'Review outstanding lab follow-ups',desc:'Address specimen issues, rejected tests and open lab-related tasks, then hand off anything unresolved.',role:'Lab personnel / RN'}
];

/* Tasks stay market-scoped; clinic selection provides a dedicated view for each site.
   The equipment/binder inventory must be verified locally before SOP use. */
const socalBinder=[
 {title:'Environmental and cleaning logs',desc:'File completed temperature/humidity and cleaning records. Document excursions and corrective action.',role:'Lab personnel / RN'},
 {title:'Sysmex QC and blank-check printouts',desc:'If installed, file three EIGHTCHECK QC levels and the blank/background check with required identifiers.',role:'Authorized lab personnel'},
 {title:'Triage and Clinitek QC records',desc:'File completed electronic or liquid QC and UA/hCG controls when performed or due.',role:'Authorized / trained personnel'},
 {title:'Other analyzer and rapid-test QC',desc:'File applicable calibration, controls, new-lot/shipment verification and QC results.',role:'Authorized personnel'},
 {title:'Maintenance and exceptions',desc:'File required instrument maintenance, failed-QC follow-up, temperature excursions and corrective actions.',role:'Lab personnel / RN'}
];
const sharedBinder=[
 {title:'Environmental and cleaning logs',desc:'Verify completed temperature and cleaning records are filed in the approved location.',role:'Lab personnel / RN'},
 {title:'Analyzer QC and calibration records',desc:'File applicable QC printouts, calibration and blank/background results for installed devices.',role:'Authorized personnel'},
 {title:'New lot/shipment control records',desc:'Document external controls for relevant kit or reagent lots when performed or due.',role:'Trained personnel'},
 {title:'Maintenance and corrective actions',desc:'File required instrument service, out-of-range results, failed QC and resolution records.',role:'Lab personnel / RN'}
];
const markets=[
 {id:'socal',name:'Southern California',short:'SoCal',tasks:socalTasks,binder:socalBinder,clinics:[
  {id:'bh',name:'Beverly Hills'},
  {id:'bh-satellite',name:'Beverly Hills Satellite'},
  {id:'sm',name:'Santa Monica'},
  {id:'mb',name:'Manhattan Beach'}
 ]},
 {id:'norcal',name:'Northern California',short:'NorCal',tasks:sharedTasks,binder:sharedBinder,clinics:[
  {id:'sf',name:'San Francisco'},
  {id:'palo-alto',name:'Palo Alto'}
 ]},
 {id:'ny',name:'New York',short:'New York',tasks:sharedTasks,binder:sharedBinder,clinics:[
  {id:'ues',name:'Upper East Side'},
  {id:'tribeca',name:'Tribeca'},
  {id:'hamptons',name:'Hamptons'},
  {id:'fifth',name:'5th Avenue'},
  {id:'gramercy',name:'Gramercy'},
  {id:'hudson-yards',name:'Hudson Yards'}
 ]},
 {id:'fl',name:'Florida',short:'Florida',tasks:sharedTasks,binder:sharedBinder,clinics:[
  {id:'boca',name:'Boca Raton'},
  {id:'palm-beach',name:'Palm Beach'},
  {id:'coral-gables',name:'Coral Gables'}
 ]}
];
const groupOrder=['Courier readiness','Environment & logs','Instrument QC & readiness','Tasks & handoff'];
let selectedMarket='socal';
let selectedView='daily';
const siteByMarket=Object.fromEntries(markets.map(m=>[m.id,m.clinics[0].id]));
function safe(x){return String(x??'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]})}
function card(group,index,tasks){
 const rows=tasks.filter(t=>t.group===group);
 if(!rows.length)return '';
 return '<section class="dqc-section" aria-labelledby="dqc-group-'+index+'">'+
  '<header class="dqc-section-head"><span class="dqc-section-number">'+String(index+1).padStart(2,'0')+'</span><h3 id="dqc-group-'+index+'">'+safe(group)+'</h3><span class="dqc-section-count">'+rows.length+' checks</span></header>'+
  '<div class="dqc-items">'+rows.map(function(t){
    return '<article class="dqc-item"><div class="dqc-item-main"><h4>'+safe(t.title)+'</h4><p>'+safe(t.desc)+'</p></div><span class="dqc-role">'+safe(t.role)+'</span></article>';
  }).join('')+'</div></section>';
}
function binderCard(item){
 return '<article class="dqc-binder-item"><div class="dqc-binder-main"><h3>'+safe(item.title)+'</h3><p>'+safe(item.desc)+'</p></div><span class="dqc-role">'+safe(item.role)+'</span></article>';
}
function render(){
 const market=markets.find(m=>m.id===selectedMarket)||markets[0];
 const clinic=market.clinics.find(c=>c.id===siteByMarket[market.id])||market.clinics[0];
 return '<section class="dqc-page" aria-label="Lab Daily Checklist reference">'+
 '<header class="dqc-hero"><div><span class="dqc-eyebrow">LAB OPERATIONS / DAILY REFERENCE</span><h1>Lab Daily Checklist</h1><p>Daily readiness tasks and binder documentation for each clinic location.</p></div><span class="dqc-readonly">REFERENCE ONLY</span></header>'+
 '<nav class="dqc-market-picker" aria-label="Select checklist market"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+markets.map(function(m){
  return '<button type="button" data-dqc-market="'+safe(m.id)+'" class="dqc-market-choice'+(market.id===m.id?' is-selected':'')+'" aria-pressed="'+(market.id===m.id)+'">'+safe(m.short)+'</button>';
 }).join('')+'</div></nav>'+
 '<div class="dqc-location-bar"><span class="dqc-location-label" id="dqc-clinic-label">Clinic location</span>'+
 '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-dqc-location-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="dqc-location-options" aria-labelledby="dqc-clinic-label dqc-location-value">'+
 '<span id="dqc-location-value">'+safe(clinic.name)+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
 '<div class="dqc-location-options" id="dqc-location-options" role="listbox" aria-labelledby="dqc-clinic-label" hidden>'+
 market.clinics.map(c=>'<button type="button" role="option" data-dqc-clinic-option="'+safe(c.id)+'" class="dqc-location-option'+(c.id===clinic.id?' is-selected':'')+'" aria-selected="'+(c.id===clinic.id)+'" tabindex="-1">'+safe(c.name)+(c.id===clinic.id?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
 '</div></div><span class="dqc-location-hint">Choose a clinic to view its reference</span></div>'+
 '<div class="dqc-market-heading"><div><span class="dqc-market-overline">DAILY REFERENCE / '+safe(market.short).toUpperCase()+'</span><h2>'+safe(clinic.name)+'</h2><p>'+safe(market.name)+' · Follow site-approved SOPs for installed equipment and required documentation.</p></div></div>'+
 '<nav class="dqc-view-switch" role="tablist" aria-label="Reference section">'+
 '<button type="button" id="dqc-tab-daily" class="dqc-view-button'+(selectedView==='daily'?' is-selected':'')+'" role="tab" data-dqc-view="daily" aria-controls="dqc-panel-daily" aria-selected="'+(selectedView==='daily')+'" tabindex="'+(selectedView==='daily'?'0':'-1')+'"><span class="dqc-view-number">01</span><span class="dqc-view-label"><strong>Daily Task Checklist</strong><small>'+market.tasks.length+' checks</small></span></button>'+
 '<button type="button" id="dqc-tab-binder" class="dqc-view-button'+(selectedView==='binder'?' is-selected':'')+'" role="tab" data-dqc-view="binder" aria-controls="dqc-panel-binder" aria-selected="'+(selectedView==='binder')+'" tabindex="'+(selectedView==='binder'?'0':'-1')+'"><span class="dqc-view-number">02</span><span class="dqc-view-label"><strong>Binder Documentation</strong><small>'+market.binder.length+' record groups</small></span></button></nav>'+
 '<section id="dqc-panel-daily" role="tabpanel" class="dqc-workstream" aria-labelledby="dqc-tab-daily"'+(selectedView==='daily'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">01</span><div><h2 id="dqc-daily-title">Daily Task Checklist</h2><p>Opening checks, QC readiness and unresolved lab handoffs</p></div></div><span class="dqc-check-count">'+market.tasks.length+' checks</span></header>'+
 '<div class="dqc-sections">'+groupOrder.map(function(group,i){return card(group,i,market.tasks)}).join('')+'</div></section>'+
 '<section id="dqc-panel-binder" role="tabpanel" class="dqc-workstream dqc-binder-workstream" aria-labelledby="dqc-tab-binder"'+(selectedView==='binder'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">02</span><div><h2 id="dqc-binder-title">Binder Documentation</h2><p>File or verify completed records in the clinic-approved binder or electronic log</p></div></div><span class="dqc-check-count">'+market.binder.length+' record groups</span></header>'+
 '<div class="dqc-binder-grid">'+market.binder.map(binderCard).join('')+'</div>'+
 '<p class="dqc-binder-note">Only file records for procedures and instruments used at this clinic, when required or due. Consult the approved site binder index and SOP.</p></section>'+
 '<footer class="dqc-footer"><strong>Official records remain separate.</strong><span>This page is a read-only reference, not a signed checklist or QC log. Record results, exceptions and operator initials in the approved system.<span class="dqc-contact-note">Need an item added or updated? <strong>Contact Sam.</strong></span></span></footer>'+
 '</section>';
}
function rerender(){
 const page=document.querySelector('.dqc-page');
 if(page)page.outerHTML=render();
}
function setLocationMenu(open,focusSelected=false,returnFocus=false){
 const picker=document.querySelector('.dqc-page .dqc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-dqc-location-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;
 trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&returnFocus)trigger.focus();
}
function switchView(next,returnFocus=false){
 if(!['daily','binder'].includes(next)||selectedView===next)return;
 selectedView=next;
 rerender();
 if(returnFocus)document.querySelector('.dqc-page [data-dqc-view="'+next+'"]')?.focus();
}
document.addEventListener('click',function(e){
 const marketButton=e.target.closest('.dqc-page [data-dqc-market]');
 if(marketButton){
  const next=marketButton.getAttribute('data-dqc-market');
  if(!markets.some(m=>m.id===next)||selectedMarket===next)return;
  selectedMarket=next;
  rerender();
  return;
 }
 const locationToggle=e.target.closest('.dqc-page [data-dqc-location-toggle]');
 if(locationToggle){
  const open=locationToggle.getAttribute('aria-expanded')!=='true';
  setLocationMenu(open,false);
  return;
 }
 const option=e.target.closest('.dqc-page [data-dqc-clinic-option]');
 if(option){
  const market=markets.find(m=>m.id===selectedMarket);
  const next=option.getAttribute('data-dqc-clinic-option');
  if(!market||!market.clinics.some(c=>c.id===next))return;
  siteByMarket[market.id]=next;
  rerender();
  document.querySelector('.dqc-page [data-dqc-location-toggle]')?.focus();
  return;
 }
 const tab=e.target.closest('.dqc-page [data-dqc-view]');
 if(tab){switchView(tab.getAttribute('data-dqc-view'));return;}
 if(!e.target.closest('.dqc-page .dqc-location-picker'))setLocationMenu(false);
});
document.addEventListener('keydown',function(e){
 const trigger=e.target.closest('.dqc-page [data-dqc-location-toggle]');
 if(trigger&&['ArrowDown','ArrowUp','Enter',' '].includes(e.key)){
  e.preventDefault();
  setLocationMenu(true,true);
  if(e.key==='ArrowUp'){
   const options=Array.from(document.querySelectorAll('.dqc-page [data-dqc-clinic-option]'));
   options[options.length-1]?.focus();
  }
  return;
 }
 const option=e.target.closest('.dqc-page [data-dqc-clinic-option]');
 if(option){
  if(e.key==='Escape'){e.preventDefault();setLocationMenu(false,false,true);return;}
  if(e.key==='Tab'){setLocationMenu(false);return;}
  const options=Array.from(document.querySelectorAll('.dqc-page [data-dqc-clinic-option]'));
  const idx=options.indexOf(option);
  let next;
  if(e.key==='ArrowDown')next=options[(idx+1)%options.length];
  else if(e.key==='ArrowUp')next=options[(idx-1+options.length)%options.length];
  else if(e.key==='Home')next=options[0];
  else if(e.key==='End')next=options[options.length-1];
  if(next){e.preventDefault();next.focus();}
  return;
 }
 const tab=e.target.closest('.dqc-page [data-dqc-view]');
 if(tab&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
  e.preventDefault();
  switchView(e.key==='ArrowRight'||e.key==='End'?'binder':'daily',true);
  return;
 }
 if(e.key==='Escape')setLocationMenu(false,false,true);
});
window.LAB_SOCAL_DAILY={render,taskCount:socalTasks.length,tasks:socalTasks};
window.LAB_DAILY_CHECKLIST={render,markets:markets.map(m=>({id:m.id,name:m.name,clinics:m.clinics.map(c=>({...c}))}))};
})();