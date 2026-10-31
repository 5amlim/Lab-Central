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
const markets=[
 {id:'socal',name:'Southern California',short:'SoCal',description:'Beverly Hills, Santa Monica and Manhattan Beach',tasks:socalTasks},
 {id:'norcal',name:'Northern California',short:'NorCal',description:'Use your clinic’s approved courier, QC and environmental procedures.',tasks:sharedTasks},
 {id:'ny',name:'New York',short:'New York',description:'Use your clinic’s approved courier, QC and environmental procedures.',tasks:sharedTasks},
 {id:'fl',name:'Florida',short:'Florida',description:'Use your clinic’s approved courier, QC and environmental procedures.',tasks:sharedTasks}
];
const groupOrder=['Courier readiness','Environment & logs','Instrument QC & readiness','Tasks & handoff'];
let selectedMarket='socal';
function safe(x){return String(x??'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]})}
function section(group,index,tasks){
 const rows=tasks.filter(t=>t.group===group);
 if(!rows.length)return '';
 return '<section class="dqc-section" aria-labelledby="dqc-group-'+index+'">'+
  '<header class="dqc-section-head"><span class="dqc-section-number">'+String(index+1).padStart(2,'0')+'</span><h2 id="dqc-group-'+index+'">'+safe(group)+'</h2><span class="dqc-section-count">'+rows.length+' checks</span></header>'+
  '<div class="dqc-items">'+rows.map(function(t){
    return '<article class="dqc-item"><div class="dqc-item-main"><h3>'+safe(t.title)+'</h3><p>'+safe(t.desc)+'</p></div><span class="dqc-role">'+safe(t.role)+'</span></article>';
  }).join('')+'</div></section>';
}
function render(){
 const market=markets.find(m=>m.id===selectedMarket)||markets[0];
 return '<section class="dqc-page" aria-label="Lab Daily Checklist reference">'+
 '<header class="dqc-hero"><div><span class="dqc-eyebrow">LAB OPERATIONS / DAILY REFERENCE</span><h1>Lab Daily Checklist</h1><p>Opening checks, instrument readiness and lab handoff. Select a market to view its daily reference.</p></div><span class="dqc-readonly">REFERENCE ONLY</span></header>'+
 '<nav class="dqc-market-picker" aria-label="Select checklist market"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+markets.map(function(m){
  return '<button type="button" data-dqc-market="'+safe(m.id)+'" class="dqc-market-choice'+(market.id===m.id?' is-selected':'')+'" aria-pressed="'+(market.id===m.id)+'">'+safe(m.short)+'</button>';
 }).join('')+'</div></nav>'+
 '<div class="dqc-market-heading"><div><span class="dqc-market-overline">DAILY REFERENCE</span><h2>'+safe(market.name)+'</h2><p>'+safe(market.description)+'</p></div><span class="dqc-check-count">'+market.tasks.length+' checks</span></div>'+
 '<div class="dqc-sections">'+groupOrder.map(function(group,i){return section(group,i,market.tasks)}).join('')+'</div>'+
 '<footer class="dqc-footer"><strong>Use the approved logs for sign-off.</strong><span>This page is a reference, not a completion record. Document QC, temperature excursions, missed pickups and follow-ups using the required clinic records and escalate concerns through your local workflow.</span></footer>'+
 '</section>';
}
document.addEventListener('click',function(e){
 const button=e.target.closest('.dqc-page [data-dqc-market]');
 if(!button)return;
 const next=button.getAttribute('data-dqc-market');
 if(!markets.some(m=>m.id===next)||selectedMarket===next)return;
 selectedMarket=next;
 const page=document.querySelector('.dqc-page');
 if(page)page.outerHTML=render();
});
window.LAB_SOCAL_DAILY={render,taskCount:socalTasks.length,tasks:socalTasks};
window.LAB_DAILY_CHECKLIST={render,markets:markets.map(function(m){return {id:m.id,name:m.name}})};
})();