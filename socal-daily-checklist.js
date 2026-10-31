/* SoCal daily lab operations work aid, not an official auditable sign-off system. */
(function(){
'use strict';
const tasks=[
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
const sites=[['BH','Beverly Hills'],['SM','Santa Monica'],['MB','Manhattan Beach']];
function safe(x){return String(x||'').replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));}
function localDate(){const n=new Date();return [n.getFullYear(),String(n.getMonth()+1).padStart(2,'0'),String(n.getDate()).padStart(2,'0')].join('-')}
let site='BH',date=localDate();const prefix='lc-socal-daily-v1:';
function storageKey(){return prefix+site+':'+date}
function read(){try{const v=JSON.parse(localStorage.getItem(storageKey())||'{}');return v&&typeof v==='object'?v:{}}catch{return {}}}
function write(v){try{localStorage.setItem(storageKey(),JSON.stringify(v))}catch{}}
function render(){
 const records=read();let total=0;
 let groups=['Courier readiness','Environment & logs','Instrument QC & readiness','Tasks & handoff'].map((group,gi)=>{
  const rows=tasks.filter(t=>t.group===group);
  const body=rows.map((t,i)=>{
   const rec=records[t.id]||{};if(rec.done)total++;
   return '<div class="dqc-task'+(rec.done?' dqc-complete':'')+'"><label class="dqc-task-label"><input type="checkbox" data-dqc-done="'+safe(t.id)+'" '+(rec.done?'checked':'')+' aria-label="Complete '+safe(t.title)+'"><span class="dqc-check-square" aria-hidden="true"></span><span class="dqc-task-main"><strong>'+safe(t.title)+'</strong><span>'+safe(t.desc)+'</span><small>'+safe(t.role)+'</small></span></label><label class="dqc-initials"><span>Initials</span><input type="text" maxlength="8" autocomplete="off" placeholder="e.g. AB" data-dqc-initials="'+safe(t.id)+'" value="'+safe(rec.initials||'')+'" aria-label="Initials for '+safe(t.title)+'"></label></div>';
  }).join('');
  return '<section class="dqc-group"><header><span class="dqc-group-num">'+String(gi+1).padStart(2,'0')+'</span><h2>'+safe(group)+'</h2><span>'+rows.length+' checks</span></header>'+body+'</section>';
 }).join('');
 return '<section class="dqc-page" aria-label="SoCal daily lab checklist"><header class="dqc-hero"><div><span class="dqc-eyebrow">OPERATIONS / SOUTHERN CALIFORNIA</span><h1>Daily lab checklist</h1><p>Opening and daily checks for Beverly Hills, Santa Monica and Manhattan Beach. Lab personnel or trained RNs complete only tasks they are authorized to perform.</p></div><span class="dqc-market">SOCAL · LAB / RN</span></header>'+
 '<div class="dqc-toolbar"><label>Clinic<select data-dqc-site>'+sites.map(s=>'<option value="'+s[0]+'" '+(site===s[0]?'selected':'')+'>'+s[1]+'</option>').join('')+'</select></label><label>Date<input type="date" value="'+safe(date)+'" data-dqc-date></label><div class="dqc-progress" aria-live="polite"><b>'+total+' of '+tasks.length+'</b><span>completed on this browser</span><div><i style="width:'+(total/tasks.length*100)+'%"></i></div></div><button type="button" class="dqc-print" data-dqc-print>Print checklist</button></div>'+
 '<div class="dqc-caution"><strong>Work aid, not the official log.</strong> Checkboxes and initials are saved only in this browser for the selected clinic and date. They do not sync, submit, certify QC or replace required logs and printouts. Enter initials and date on the approved shared SoCal checklist and maintain original QC records.</div>'+
 groups+
 '<div class="dqc-handoff"><strong>Unresolved or abnormal?</strong><p>Document the finding in the approved log, notify the lab supervisor or clinical lead, and hand off any missed pickup, excursion, failed QC or open Navigator issue. Do not mark complete until the check was actually performed.</p></div></section>';
}
document.addEventListener('change',function(e){
 const t=e.target;if(!t.closest('.dqc-page'))return;
 if(t.matches('[data-dqc-site]')){site=sites.some(s=>s[0]===t.value)?t.value:'BH';(()=>{const page=document.querySelector('.dqc-page');if(page)page.outerHTML=render()})();return}
 if(t.matches('[data-dqc-date]')){date=/^\d{4}-\d{2}-\d{2}$/.test(t.value)?t.value:localDate();(()=>{const page=document.querySelector('.dqc-page');if(page)page.outerHTML=render()})();return}
 if(t.matches('[data-dqc-done]')){const data=read(),id=t.dataset.dqcDone;data[id]={...(data[id]||{}),done:t.checked};write(data);(()=>{const page=document.querySelector('.dqc-page');if(page)page.outerHTML=render()})()}
});
document.addEventListener('input',function(e){
 const t=e.target;if(!t.matches('.dqc-page [data-dqc-initials]'))return;
 const id=t.dataset.dqcInitials,data=read();data[id]={...(data[id]||{}),initials:t.value.toUpperCase()};write(data);
});
document.addEventListener('click',function(e){if(e.target.closest('.dqc-page [data-dqc-print]'))window.print()});
window.LAB_SOCAL_DAILY={render,taskCount:tasks.length,tasks};
})();