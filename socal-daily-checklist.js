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
 {id:'clinitek',group:'Instrument QC & readiness',title:'Siemens Clinitek cleaning and readiness',desc:'Inspect and clean the test table and correct strip/cassette insert per SOP. Confirm controls are current under the SoCal monthly and event-triggered QC schedule; routine daily UA/hCG external QC is not required in SoCal.',role:'Trained lab personnel / RN'},
 {id:'sysmex',group:'Instrument QC & readiness',badges:['QC','Printouts Needed'],qcGuide:{instrument:'sysmex',tab:'daily-qc'},title:'Sysmex pocH daily QC and blank check',desc:'Run/verify three-level EIGHTCHECK control and approved blank/background check. Confirm acceptable results, complete the dedicated control and start-up blank-check logs, then file all three QC printouts and the blank-check printout.',role:'Trained lab personnel / RN'},
 {id:'triage',group:'Instrument QC & readiness',badges:['QC','Printouts Needed'],qcGuide:{instrument:'triage',tab:'daily-qc'},title:'Triage electronic QC Device',desc:'Run the reusable electronic QC Device daily when patient testing is performed. Separately review each active assay lot liquid-QC due date and new shipment/lot requirements.',role:'Trained lab personnel / RN'},
 {id:'rapid',group:'Instrument QC & readiness',title:'Rapid POC station and test-kit QC',desc:'Check supplies, stock, expiry and required new shipment/lot QC for QuickVue, Sofia, FebriDx and other active POC kits. Document any failed controls or unavailable kits.',role:'Lab personnel / RN'},
 {id:'navigator',group:'Tasks & handoff',title:'Check and resolve Navigator tasks',desc:'Review open specimen follow-ups, rejected tests, provider communications and lab-related Navigator tasks. Close only resolved items and hand off outstanding issues.',role:'Lab personnel / RN'}
];
const sharedTasks=[
 {id:'pending',group:'Courier readiness',title:'Review sendout bins and staging areas',desc:'At opening, inspect receiving-lab bins, lockboxes and staging areas for specimens or sealed bags left from the previous shift. Check labeling, storage conditions and missed pickups.',role:'Lab personnel / RN'},
 {id:'couriers',group:'Courier readiness',title:'Confirm courier pickup readiness',desc:'Check assigned receiving-lab pickup points, shipping bags and courier schedules. Escalate missed collections using the market procedure.',role:'Lab personnel / RN'},
 {id:'clean',group:'Environment & logs',title:'Cleaning and disinfection log',desc:'Verify required bench and station disinfection is documented and address any outstanding cleaning issues.',role:'Lab personnel / RN'},
 {id:'fridge',group:'Environment & logs',title:'Refrigerator temperature',desc:'Record and assess current/min/max temperatures as applicable. Escalate excursions and document corrective actions.',role:'Lab personnel / RN'},
 {id:'freezer',group:'Environment & logs',title:'Freezer temperature',desc:'Review freezer readings and alarms. Escalate excursions before using affected reagents or controls.',role:'Lab personnel / RN'},
 {id:'room',group:'Environment & logs',title:'Room temperature and humidity',desc:'Record ambient conditions and check against the required ranges for active instruments and reagents.',role:'Lab personnel / RN'},
 {id:'clinitek',group:'Instrument QC & readiness',title:'Siemens Clinitek daily UA and hCG QC',desc:'Perform daily external QC for UA strips and hCG controls per market SOP. Confirm acceptable results and print/file required QC records in the daily binder. Repeat QC for new bottles or lots when required.',role:'Trained lab personnel / RN',badges:['QC','Printouts Needed'],qcGuide:{instrument:'clinitek',tab:'combined-qc'}},
 {id:'sysmex',group:'Instrument QC & readiness',title:'Sysmex pocH daily QC and blank check',desc:'If installed, run or verify three EIGHTCHECK QC levels and the blank/background check. Complete the pocH-100i Control Log and Start-up Blank Check Log, and file all three QC printouts plus the blank-check printout in the daily binder.',role:'Trained lab personnel / RN',badges:['QC','Printouts Needed'],qcGuide:{instrument:'sysmex',tab:'daily-qc'}},
 {id:'triage',group:'Instrument QC & readiness',title:'Triage electronic QC Device',desc:'If installed, run the electronic QC Device daily when testing is performed. Check liquid-QC due dates and new-lot or new-shipment requirements. Print/file the daily QC record.',role:'Trained lab personnel / RN',badges:['QC','Printouts Needed'],qcGuide:{instrument:'triage',tab:'daily-qc'}},
 {id:'rapid',group:'Instrument QC & readiness',title:'Rapid POC station and test-kit QC',desc:'Check supplies, stock, expiry and new shipment/lot QC requirements for active POC kits. Document failed controls or unavailable kits.',role:'Lab personnel / RN'},
 {id:'handoff',group:'Tasks & handoff',title:'Review outstanding lab follow-ups',desc:'Address specimen issues, rejected tests and open lab-related tasks. Resolve or hand off outstanding items before the end of shift.',role:'Lab personnel / RN'}
];

/* Tasks stay market-scoped; clinic selection provides a dedicated view for each site.
   The equipment/binder inventory must be verified locally before SOP use. */
const socalBinder=[
 {"id":"temperature","title":"Daily Temperature and Humidity Log","desc":"Record and file required room, refrigerator, freezer and humidity readings. Document any excursion and corrective action.","role":"Lab personnel / RN","template":"temperature"},
 {"id":"cleaning","title":"Daily Cleaning and Disinfection Log","desc":"Record required work-surface cleaning, disinfection and operator initials. Note any missed tasks or corrective action.","role":"Lab personnel / RN","template":"cleaning"},
 {"id":"sysmex-control","title":"pocH-100i Three-Level Control Log","desc":"If installed, record acceptable EIGHTCHECK Low, Normal and High QC results. File the three matching QC printouts with this log.","role":"Trained lab personnel / RN","template":"sysmex-control","badges":["Printouts Needed"]},
 {"id":"sysmex-blank","title":"pocH-100i Start-up Blank Check Log","desc":"If installed, record the daily blank/background check and file its separate printout with this log.","role":"Trained lab personnel / RN","template":"sysmex-blank","badges":["Printouts Needed"]},
 {"id":"sysmex-maint","title":"pocH-100i Maintenance Log","desc":"Document required shutdown, cleaning and instrument maintenance on the approved schedule, including any corrective action.","role":"Trained lab personnel / RN","template":"sysmex-maint"},
 {"id":"triage-daily","title":"Triage MeterPro Daily QC Log","desc":"If installed, document the daily electronic QC Device result when required and file its QC printout. Keep liquid QC in the monthly binder.","role":"Trained lab personnel / RN","template":"triage-daily","badges":["Printouts Needed"]},
 {"id":"clinitek-maint","title":"Siemens Urinalysis Maintenance and Cleaning Log","desc":"Record Clinitek test-table/platform cleaning and maintenance according to the site SOP. Keep this separate from the environmental and general cleaning logs.","role":"Trained lab personnel / RN","template":"clinitek-maint"},
 {"id":"eyewash","title":"Eyewash Station Maintenance Log","desc":"Record required eyewash checks and flushing on the approved schedule, with initials and any corrective actions.","role":"Lab personnel / RN","template":"eyewash"},
 {"id":"waived-qc","title":"Waived Test Quality Control Log","desc":"Record applicable rapid-test kit controls and new-lot or shipment QC for the tests in use.","role":"Trained lab personnel / RN","template":"waived-qc"},
 {"id":"febridx-qc","title":"FebriDx Quality Control Log","desc":"Document FebriDx external controls when required, including new box or lot QC and any failed controls.","role":"Trained lab personnel / RN","template":"febridx-qc"},
 {"id":"remedial","title":"Comprehensive Remedial Action Log","desc":"Record failed QC, specimen or instrument issues and other exceptions with the corrective action and resolution.","role":"Lab personnel / RN","template":"remedial"}
];
// Reference cadences sourced from the instrument QC overview. Only applicable
// when the instrument is installed and the clinic's approved SOP requires it.
// Recurring 28-day checks are shown separately from calendar-month checks.
const monthlyQcTasks=[
 {id:'pathfast-28d',group:'Recurring QC & calibration',title:'PATHFAST calibration and QC',frequency:'Every 28 days',desc:'Complete calibration and both QC levels for the active PATHFAST assays before the instrument lockout. Verify acceptable results and document any failure or repeat.',role:'Authorized trained personnel',badges:['QC','Printouts Needed'],qcGuide:{instrument:'pathfast',tab:'cal-qc'}},
 {id:'piccolo-30d',group:'Recurring QC & calibration',title:'Piccolo Xpress external QC',frequency:'Every 30 days / panel SOP',desc:'Run the required control levels for panels in use according to the clinic panel schedule; also complete new-lot or new-shipment checks as specified.',role:'Authorized trained personnel',badges:['QC','Printouts Needed'],qcGuide:{instrument:'piccolo',tab:'monthly-qc'}},
 {id:'triage-30d',group:'Recurring QC & calibration',title:'Quidel Triage liquid QC',frequency:'Every 30 days',desc:'Run required liquid QC for each active assay lot. This is separate from the daily electronic QC Device and any new-box or new-lot checks.',role:'Authorized trained personnel',badges:['QC','Printouts Needed'],qcGuide:{instrument:'triage',tab:'liquid-qc-every-30-days'}},
 {id:'clinitek-monthly',group:'Recurring QC & calibration',title:'Siemens Clinitek UA / hCG QC',frequency:'Monthly where required',desc:'Complete urine dipstick and hCG external QC on the approved market schedule and for applicable new-bottle or new-lot events.',note:'Daily UA/hCG QC is required in some markets. SoCal follows the approved monthly and event-triggered QC schedule.',role:'Trained lab personnel / RN',badges:['QC','Printouts Needed'],qcGuide:{instrument:'clinitek',tab:'combined-qc'}},
 {id:'sofia-cal-30d',group:'Recurring QC & calibration',title:'Sofia 2 optical calibration check',frequency:'Every 30 days',desc:'Run the optical calibration check with the dedicated calibration cassette. Document the calibration result in the approved QC log. Separately perform and document assay external QC for new shipments or lots when required by the IFU.',role:'Trained lab personnel / RN',badges:['QC'],qcGuide:{instrument:'sofia',tab:'calibration-scan-ma'}}
];
const monthlyBinder=[
 {"id":"pathfast-qc","title":"PATHFAST Calibration and QC Printouts","desc":"File the calibration and accepted control printouts for the active assays every 28 days, with required identifiers and corrective actions.","role":"Trained lab personnel / RN","badges":["Printouts Needed"]},
 {"id":"pathfast-maint","title":"PATHFAST Operational and Maintenance Log","desc":"Record scheduled instrument operational checks and maintenance, and document any problems or corrective actions.","role":"Trained lab personnel / RN","template":"pathfast-maint"},
 {"id":"piccolo-qc","title":"Piccolo Xpress Quality Control Sheet","desc":"Record required low- and high-level panel controls and file the matching analyzer QC printouts.","role":"Trained lab personnel / RN","template":"piccolo-qc","badges":["Printouts Needed"]},
 {"id":"triage-liquid","title":"Triage MeterPro Liquid QC Control Log","desc":"Record scheduled liquid controls for active assay lots and file corresponding QC printouts, separate from daily electronic QC.","role":"Trained lab personnel / RN","template":"triage-liquid","badges":["Printouts Needed"]},
 {"id":"sofia-cal","title":"Sofia 2 Calibration Check Log","desc":"Record the 30-day optical calibration check result, date and operator. Sofia 2 does not require a printout.","role":"Trained lab personnel / RN","template":"sofia-cal"},
 {"id":"sofia-qc","title":"Sofia 2 Quality Control Log","desc":"Document positive and negative external QC for new shipments, new lots or other approved triggers. No printout is required.","role":"Trained lab personnel / RN","template":"sofia-qc"},
 {"id":"clinitek-ua","title":"Siemens Urinalysis Control Log","desc":"SoCal: record monthly UA strip QC and required new-bottle/new-lot controls. File any applicable QC printouts with this log.","role":"Trained lab personnel / RN","template":"clinitek-ua","badges":["Printouts Needed"]},
 {"id":"clinitek-hcg","title":"Siemens hCG Pregnancy Control Log","desc":"SoCal: record monthly hCG controls and required new-lot or other event-based QC. File any applicable printouts with this log.","role":"Trained lab personnel / RN","template":"clinitek-hcg","badges":["Printouts Needed"]},
 {"id":"remedial","title":"Comprehensive Remedial Action Log","desc":"Record failed monthly QC, calibration issues, corrective actions and final resolution, as applicable.","role":"Lab personnel / RN","template":"remedial"}
];
const sharedBinder=[
 {"id":"temperature","title":"Daily Temperature and Humidity Log","desc":"Record and file required room, refrigerator, freezer and humidity readings. Document any excursion and corrective action.","role":"Lab personnel / RN","template":"temperature"},
 {"id":"cleaning","title":"Daily Cleaning and Disinfection Log","desc":"Record required work-surface cleaning, disinfection and operator initials. Note any missed tasks or corrective action.","role":"Lab personnel / RN","template":"cleaning"},
 {"id":"sysmex-control","title":"pocH-100i Three-Level Control Log","desc":"If installed, record acceptable EIGHTCHECK Low, Normal and High QC results. File the three matching QC printouts with this log.","role":"Trained lab personnel / RN","template":"sysmex-control","badges":["Printouts Needed"]},
 {"id":"sysmex-blank","title":"pocH-100i Start-up Blank Check Log","desc":"If installed, record the daily blank/background check and file its separate printout with this log.","role":"Trained lab personnel / RN","template":"sysmex-blank","badges":["Printouts Needed"]},
 {"id":"sysmex-maint","title":"pocH-100i Maintenance Log","desc":"Document required shutdown, cleaning and instrument maintenance on the approved schedule, including any corrective action.","role":"Trained lab personnel / RN","template":"sysmex-maint"},
 {"id":"triage-daily","title":"Triage MeterPro Daily QC Log","desc":"If installed, document the daily electronic QC Device result when required and file its QC printout. Keep liquid QC in the monthly binder.","role":"Trained lab personnel / RN","template":"triage-daily","badges":["Printouts Needed"]},
 {"id":"clinitek-maint","title":"Siemens Urinalysis Maintenance and Cleaning Log","desc":"Record Clinitek test-table/platform cleaning and maintenance according to the site SOP. Keep this separate from the environmental and general cleaning logs.","role":"Trained lab personnel / RN","template":"clinitek-maint"},
 {"id":"clinitek-ua","title":"Siemens Urinalysis Control Log","desc":"Record daily UA strip control results and new-bottle or new-lot checks as required. File any applicable QC printouts with this log.","role":"Trained lab personnel / RN","template":"clinitek-ua","badges":["Printouts Needed"]},
 {"id":"clinitek-hcg","title":"Siemens hCG Pregnancy Control Log","desc":"Record daily hCG positive and negative control results and event-triggered QC. File any applicable printouts with this log.","role":"Trained lab personnel / RN","template":"clinitek-hcg","badges":["Printouts Needed"]},
 {"id":"eyewash","title":"Eyewash Station Maintenance Log","desc":"Record required eyewash checks and flushing on the approved schedule, with initials and any corrective actions.","role":"Lab personnel / RN","template":"eyewash"},
 {"id":"waived-qc","title":"Waived Test Quality Control Log","desc":"Record applicable rapid-test kit controls and new-lot or shipment QC for the tests in use.","role":"Trained lab personnel / RN","template":"waived-qc"},
 {"id":"febridx-qc","title":"FebriDx Quality Control Log","desc":"Document FebriDx external controls when required, including new box or lot QC and any failed controls.","role":"Trained lab personnel / RN","template":"febridx-qc"},
 {"id":"remedial","title":"Comprehensive Remedial Action Log","desc":"Record failed QC, specimen or instrument issues and other exceptions with the corrective action and resolution.","role":"Lab personnel / RN","template":"remedial"}
];
// Non-SoCal markets document Clinitek QC daily, so it does not appear as a separate monthly task.
const otherMarketsMonthlyQcTasks=monthlyQcTasks.filter(t=>t.id!=='clinitek-monthly');
const otherMarketsMonthlyBinder=monthlyBinder.filter(t=>t.id!=='clinitek-ua'&&t.id!=='clinitek-hcg');
const markets=[
 {id:'socal',name:'Southern California',short:'SoCal',tasks:socalTasks,monthly:monthlyQcTasks,binder:socalBinder,clinics:[
  {id:'bh',name:'Beverly Hills'},
  {id:'bh-satellite',name:'Beverly Hills Satellite'},
  {id:'sm',name:'Santa Monica'},
  {id:'mb',name:'Manhattan Beach'}
 ]},
 {id:'norcal',name:'Northern California',short:'NorCal',tasks:sharedTasks,monthly:otherMarketsMonthlyQcTasks,monthlyBinder:otherMarketsMonthlyBinder,binder:sharedBinder,clinics:[
  {id:'sf',name:'San Francisco'},
  {id:'palo-alto',name:'Palo Alto'}
 ]},
 {id:'ny',name:'New York',short:'New York',tasks:sharedTasks,monthly:otherMarketsMonthlyQcTasks,monthlyBinder:otherMarketsMonthlyBinder,binder:sharedBinder,clinics:[
  {id:'ues',name:'Upper East Side'},
  {id:'tribeca',name:'Tribeca'},
  {id:'hamptons',name:'Hamptons'},
  {id:'fifth',name:'5th Avenue'},
  {id:'gramercy',name:'Gramercy'},
  {id:'hudson-yards',name:'Hudson Yards'}
 ]},
 {id:'fl',name:'Florida',short:'Florida',tasks:sharedTasks,monthly:otherMarketsMonthlyQcTasks,monthlyBinder:otherMarketsMonthlyBinder,binder:sharedBinder,clinics:[
  {id:'boca',name:'Boca Raton'},
  {id:'palm-beach',name:'Palm Beach'},
  {id:'coral-gables',name:'Coral Gables'}
 ]}
];
const groupOrder=['Courier readiness','Environment & logs','Instrument QC & readiness','Tasks & handoff'];
let selectedMarket='socal';
let selectedView='daily';
let selectedMonthlyView='monthly';
let currentPage='daily';
const siteByMarket=Object.fromEntries(markets.map(m=>[m.id,m.clinics[0].id]));
function safe(x){return String(x??'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]})}
/* Shared outlined guide symbols used in the selector tiles and section headers. */
function dqcSectionIcon(kind){
 const shapes={
  binder:'<rect x="4" y="2.7" width="16" height="18.6" rx="2.1"/><path d="M9.3 2.7v18.6M13 7h4M13 11h4M13 15h2.8"/><circle cx="6.7" cy="7" r=".7"/><circle cx="6.7" cy="12" r=".7"/><circle cx="6.7" cy="17" r=".7"/>',
  checklist:'<rect x="4.5" y="4.2" width="15" height="17" rx="2.1"/><path d="M9 2.5h6v3.3H9zM8.1 11l1.6 1.6 2.6-2.7M14.3 11.2h2.1M8.1 16.8l1.6 1.6 2.6-2.7M14.3 17h2.1"/>',
  qc:'<path d="M12 3 3.5 7v5.5c0 4.2 3.1 7.4 8.5 9 5.4-1.6 8.5-4.8 8.5-9V7L12 3Z"/><path d="m8.5 12.1 2.5 2.5 4.8-5.2"/>',
  monthly:'<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h2M13 14h3M8 17.4h2M13 17.4h3"/>',
  templates:'<path d="M5 3.5h10l4 4V21H5zM15 3.5v4h4M8 12h8M8 16h8M8 9h3"/>'
 };
 return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[kind]||shapes.checklist)+'</svg>';
}
function taskItem(t){
 const badges=Array.isArray(t.badges)&&t.badges.length
   ?'<div class="dqc-task-badges" aria-label="Task requirements">'+t.badges.map(function(badge){
     return '<span class="dqc-task-badge '+(badge==='QC'?'is-qc':'is-print')+'">'+safe(badge)+'</span>';
    }).join('')+'</div>'
   :'';
 const qcLink=t.qcGuide
   ?'<button type="button" class="dqc-qc-guide-link" data-go="'+safe(t.qcGuide.instrument)+'" data-target-tab="'+safe(t.qcGuide.tab)+'" aria-label="Open '+safe(t.title)+' QC instructions">View QC guide <span aria-hidden="true">↗</span></button>'
   :'';
 const footer=(badges||qcLink)?'<div class="dqc-task-actions">'+qcLink+badges+'</div>':'';
 return '<article class="dqc-item'+(footer?' has-task-badges':'')+'"><div class="dqc-item-main"><h4>'+safe(t.title)+'</h4><p>'+safe(t.desc)+'</p>'+(t.note?'<p class="dqc-task-note"><strong>Note:</strong> '+safe(t.note)+'</p>':'')+'</div><span class="dqc-role">'+safe(t.role)+'</span>'+footer+'</article>';
}
function card(group,index,tasks){
 const rows=tasks.filter(t=>t.group===group);
 if(!rows.length)return '';
 return '<section class="dqc-section" aria-labelledby="dqc-group-'+index+'">'+
  '<header class="dqc-section-head"><span class="dqc-section-number">'+String(index+1).padStart(2,'0')+'</span><h3 id="dqc-group-'+index+'">'+safe(group)+'</h3><span class="dqc-section-count">'+rows.length+' checks</span></header>'+
  '<div class="dqc-items">'+rows.map(taskItem).join('')+'</div></section>';
}
function monthlyCard(t){
 return '<section class="dqc-monthly-card"><div class="dqc-monthly-frequency">'+safe(t.frequency)+'</div>'+taskItem(t)+'</section>';
}
function binderCard(item){
 const badge=item.badges&&item.badges.includes('Printouts Needed')?'<div class="dqc-binder-task-badges"><span class="dqc-task-badge is-print">Printouts Needed</span></div>':'';
 return '<article class="dqc-binder-item"><div class="dqc-binder-main">'+
  '<div class="dqc-binder-heading"><h3>'+safe(item.title)+'</h3><span class="dqc-role">'+safe(item.role)+'</span></div>'+
  '<div class="dqc-binder-description-row"><p>'+safe(item.desc)+'</p>'+badge+'</div>'+
  '</div></article>';
}
/* Blank, print-ready adaptations of the logs supplied for the lab templates library. */
const dailyTemplateCatalog=[
 {id:'temperature',title:'Daily Temperature Log',detail:'Room, refrigerator, freezer and humidity readings',group:'Environment'},
 {id:'cleaning',title:'Daily Cleaning and Disinfection Log',detail:'Bench and work-area cleaning documentation',group:'Environment'},
 {id:'sysmex-control',title:'pocH-100i Three-Level Control Log',detail:'Low, normal and high QC with supporting printouts',group:'Instrument QC'},
 {id:'sysmex-blank',title:'pocH-100i Start-up Blank Check Log',detail:'Startup/background result and attached printout',group:'Instrument QC'},
 {id:'sysmex-maint',title:'pocH-100i Maintenance Log',detail:'Instrument maintenance record',group:'Maintenance'},
 {id:'triage-daily',title:'Triage MeterPro Daily QC Log',detail:'Daily electronic QC device result',group:'Instrument QC'},
 {id:'clinitek-maint',title:'Siemens Urinalysis Maintenance Log',detail:'Platform cleaning and as-needed maintenance',group:'Maintenance'},
 {id:'eyewash',title:'Eyewash Station Maintenance Log',detail:'Daily bump test and weekly flush',group:'Maintenance'},
 {id:'waived-qc',title:'Waived Test QC Log',detail:'Event-based controls for new or active kits',group:'As needed'},
 {id:'febridx-qc',title:'FebriDx Quality Control Log',detail:'New-box positive and negative controls',group:'As needed'},
 {id:'remedial',title:'Comprehensive Remedial Action Log',detail:'Problems, specimen rejections and corrective actions',group:'Exceptions'}
];
const monthlyTemplateCatalog=[
 {id:'pathfast-maint',title:'PATHFAST Maintenance Schedule',detail:'Weekly and monthly instrument maintenance',group:'Maintenance'},
 {id:'piccolo-qc',title:'Piccolo Xpress QC Control Sheet',detail:'Low- and high-level controls with printout attachments',group:'Instrument QC'},
 {id:'triage-liquid',title:'Triage MeterPro Liquid QC Log',detail:'Scheduled liquid QC for active assays',group:'Instrument QC'},
 {id:'sofia-cal',title:'Sofia 2 Calibration Check Log',detail:'Optical calibration results; no printout required',group:'Instrument QC'},
 {id:'sofia-qc',title:'Sofia 2 QC Log',detail:'New-lot, new-shipment or other event-based controls',group:'As needed'},
 {id:'remedial',title:'Comprehensive Remedial Action Log',detail:'Monthly corrective-action record',group:'Exceptions'}
];
const clinitekTemplateCatalog=[
 {id:'clinitek-ua',title:'Siemens Urinalysis QC Log',detail:'Low and high UA controls',group:'Clinitek'},
 {id:'clinitek-hcg',title:'Siemens hCG Pregnancy QC Log',detail:'Negative and positive pregnancy controls',group:'Clinitek'}
];
function templatesForMarket(market,page){
 const base=(page==='monthly'?monthlyTemplateCatalog:dailyTemplateCatalog);
 return page==='monthly'?(market.id==='socal'?[...base,...clinitekTemplateCatalog]:base)
 :market.id==='socal'?base:[...base,...clinitekTemplateCatalog];
}
function renderTemplatePanel(market,page){
 const records=templatesForMarket(market,page);
 const clinic=market.clinics.find(c=>c.id===siteByMarket[market.id])||market.clinics[0];
 const view=page==='monthly'?'monthly':'daily';
 const active=page==='monthly'?selectedMonthlyView==='monthly-templates':selectedView==='templates';
 const panelId=page==='monthly'?'dqc-panel-monthly-templates':'dqc-panel-templates';
 const tabId=page==='monthly'?'dqc-tab-monthly-templates':'dqc-tab-templates';
 const cards=records.map(function(t){
  const href='lab-templates.html?view='+encodeURIComponent(view)+'&template='+encodeURIComponent(t.id)+'&market='+encodeURIComponent(market.short)+'&clinic='+encodeURIComponent(clinic.name);
  return '<article class="dqc-template-card"><div class="dqc-template-top"><span class="dqc-template-category">'+safe(t.group)+'</span></div><h3>'+safe(t.title)+'</h3><p>'+safe(t.detail)+'</p><a class="dqc-template-action" href="'+safe(href)+'" target="_blank" rel="noopener noreferrer">Open printable template <span aria-hidden="true">↗</span></a></article>';
 }).join('');
 return '<section id="'+panelId+'" class="dqc-workstream dqc-templates-workstream" role="tabpanel" aria-labelledby="'+tabId+'"'+(active?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('templates')+'</span><div><h2>Lab Templates</h2><p>Blank log sheets for '+(page==='monthly'?'recurring QC, maintenance and documentation':'daily checks, controls and lab documentation')+'</p></div></div><span class="dqc-check-count">'+records.length+' templates</span></header><p class="dqc-template-intro">Open a print-ready log and fill in the header if needed, then print or save it as a PDF. These are adapted from the supplied lab logs. Verify the current controlled form and site SOP before clinical use.</p><div class="dqc-template-grid">'+cards+'</div></section>';
}

function renderDailySections(market,dailyQcTasks){
 return '<nav class="dqc-view-switch" role="tablist" aria-label="Lab checklist sections">'+
 '<button type="button" id="dqc-tab-daily" class="dqc-view-button'+(selectedView==='daily'?' is-selected':'')+'" role="tab" data-dqc-view="daily" aria-controls="dqc-panel-daily" aria-selected="'+(selectedView==='daily')+'" tabindex="'+(selectedView==='daily'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('checklist')+'</span><span class="dqc-view-label"><strong>Daily Task Checklist</strong><small>'+market.tasks.length+' checks</small></span></button>'+
 '<button type="button" id="dqc-tab-daily-qc" class="dqc-view-button'+(selectedView==='daily-qc'?' is-selected':'')+'" role="tab" data-dqc-view="daily-qc" aria-controls="dqc-panel-daily-qc" aria-selected="'+(selectedView==='daily-qc')+'" tabindex="'+(selectedView==='daily-qc'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('qc')+'</span><span class="dqc-view-label"><strong>Daily QC</strong><small>'+dailyQcTasks.length+' checks</small></span></button>'+
 '<button type="button" id="dqc-tab-binder" class="dqc-view-button'+(selectedView==='binder'?' is-selected':'')+'" role="tab" data-dqc-view="binder" aria-controls="dqc-panel-binder" aria-selected="'+(selectedView==='binder')+'" tabindex="'+(selectedView==='binder'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('binder')+'</span><span class="dqc-view-label"><strong>Binder Documentation</strong><small>'+market.binder.length+' record groups</small></span></button>'+
 '<button type="button" id="dqc-tab-templates" class="dqc-view-button'+(selectedView==='templates'?' is-selected':'')+'" role="tab" data-dqc-view="templates" aria-controls="dqc-panel-templates" aria-selected="'+(selectedView==='templates')+'" tabindex="'+(selectedView==='templates'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('templates')+'</span><span class="dqc-view-label"><strong>Lab Templates</strong><small>'+templatesForMarket(market,'daily').length+' templates</small></span></button></nav>'+
 '<section id="dqc-panel-daily" role="tabpanel" class="dqc-workstream" aria-labelledby="dqc-tab-daily"'+(selectedView==='daily'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('checklist')+'</span><div><h2 id="dqc-daily-title">Daily Task Checklist</h2><p>Opening checks, QC readiness and unresolved lab handoffs</p></div></div><span class="dqc-check-count">'+market.tasks.length+' checks</span></header>'+
 '<div class="dqc-sections">'+groupOrder.map(function(group,i){return card(group,i,market.tasks)}).join('')+'</div></section>'+
 '<section id="dqc-panel-daily-qc" role="tabpanel" class="dqc-workstream dqc-daily-qc-workstream" aria-labelledby="dqc-tab-daily-qc"'+(selectedView==='daily-qc'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('qc')+'</span><div><h2>Daily QC</h2><p>Instrument QC and readiness tasks, based on the approved market schedule</p></div></div><span class="dqc-check-count">'+dailyQcTasks.length+' checks</span></header>'+
 '<p class="dqc-cadence-note">Perform only the checks applicable to instruments and tests installed at this clinic. External QC may be due daily, with a new lot or shipment, or on another approved schedule. A readiness check does not replace required external QC.'+(market.id==='socal'?' <strong>SoCal:</strong> UA/hCG external QC is not a routine daily requirement; follow the monthly and event-triggered schedule.':' <strong>Other markets:</strong> Clinitek UA and hCG external QC is required daily; file its printouts in the daily binder.')+'</p>'+
 '<div class="dqc-daily-qc-grid">'+dailyQcTasks.map(taskItem).join('')+'</div></section>'+
 '<section id="dqc-panel-binder" role="tabpanel" class="dqc-workstream dqc-binder-workstream" aria-labelledby="dqc-tab-binder"'+(selectedView==='binder'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('binder')+'</span><div><h2 id="dqc-binder-title">Binder Documentation</h2><p>File or verify completed records in the clinic-approved binder or electronic log</p></div></div><span class="dqc-check-count">'+market.binder.length+' record groups</span></header>'+
 '<div class="dqc-binder-grid">'+market.binder.map(binderCard).join('')+'</div>'+
 '<p class="dqc-binder-note">File daily QC records, cleaning logs and event-based controls required by the clinic SOP. For recurring 28-day or 30-day QC and calibration printouts, use the separate Lab Monthly Checklist binder. Consult the approved site binder index.</p></section>'+renderTemplatePanel(market,'daily');
}
function renderMonthlySections(market,monthlyTasks){
 const v=selectedMonthlyView;
 const monthlyRecords=market.monthlyBinder||monthlyBinder;
 return '<nav class="dqc-view-switch" role="tablist" aria-label="Monthly checklist sections">'+
 '<button type="button" id="dqc-tab-monthly" class="dqc-view-button'+(v==='monthly'?' is-selected':'')+'" role="tab" data-dqc-view="monthly" aria-controls="dqc-panel-monthly" aria-selected="'+(v==='monthly')+'" tabindex="'+(v==='monthly'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('monthly')+'</span><span class="dqc-view-label"><strong>Monthly QC Tasks</strong><small>'+monthlyTasks.length+' recurring checks</small></span></button>'+
 '<button type="button" id="dqc-tab-monthly-binder" class="dqc-view-button'+(v==='monthly-binder'?' is-selected':'')+'" role="tab" data-dqc-view="monthly-binder" aria-controls="dqc-panel-monthly-binder" aria-selected="'+(v==='monthly-binder')+'" tabindex="'+(v==='monthly-binder'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('binder')+'</span><span class="dqc-view-label"><strong>Monthly Binder Documentation</strong><small>'+monthlyRecords.length+' record groups</small></span></button>'+
 '<button type="button" id="dqc-tab-monthly-templates" class="dqc-view-button'+(v==='monthly-templates'?' is-selected':'')+'" role="tab" data-dqc-view="monthly-templates" aria-controls="dqc-panel-monthly-templates" aria-selected="'+(v==='monthly-templates')+'" tabindex="'+(v==='monthly-templates'?'0':'-1')+'"><span class="dqc-view-icon">'+dqcSectionIcon('templates')+'</span><span class="dqc-view-label"><strong>Lab Templates</strong><small>'+templatesForMarket(market,'monthly').length+' templates</small></span></button></nav>'+
 '<section id="dqc-panel-monthly" role="tabpanel" class="dqc-workstream dqc-monthly-workstream" aria-labelledby="dqc-tab-monthly"'+(v==='monthly'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('monthly')+'</span><div><h2>Monthly QC Tasks</h2><p>Recurring QC and calibration checks for applicable instruments</p></div></div><span class="dqc-check-count">'+monthlyTasks.length+' recurring checks</span></header>'+
 '<p class="dqc-cadence-note"><strong>File required instrument printouts with the monthly binder records; document Sofia 2 calibration and QC in the approved signed log.</strong> For checks without printouts, use the approved signed QC record. PATHFAST is due every 28 days, while other intervals may be every 30 days or market-specific. Follow actual due dates, not the calendar month, and only perform tasks applicable to installed instruments.'+(market.id==='socal'?'':' <strong>Clinitek:</strong> UA and hCG external QC is scheduled daily in this market. File its printouts in the Daily Checklist binder, not as a separate monthly QC task.')+'</p>'+
 '<div class="dqc-monthly-grid">'+monthlyTasks.map(monthlyCard).join('')+'</div></section>'+
 '<section id="dqc-panel-monthly-binder" role="tabpanel" class="dqc-workstream dqc-binder-workstream" aria-labelledby="dqc-tab-monthly-binder"'+(v==='monthly-binder'?'':' hidden')+'><header class="dqc-workstream-header"><div><span class="dqc-workstream-index">'+dqcSectionIcon('binder')+'</span><div><h2>Monthly Binder Documentation</h2><p>Printouts and records for recurring QC and calibration checks</p></div></div><span class="dqc-check-count">'+monthlyRecords.length+' record groups</span></header>'+
 '<p class="dqc-cadence-note"><strong>File required QC/calibration printouts and signed QC records in the monthly binder.</strong> Include the date, instrument, lot, operator and corrective action when required by site SOP. Sofia 2 calibration and QC are documented in the approved log without a printout.</p>'+
 '<div class="dqc-binder-grid">'+monthlyRecords.map(binderCard).join('')+'</div>'+
 '<p class="dqc-binder-note">Only include installed equipment and checks that were required or due. Daily binder items remain on the Lab Daily Checklist page.</p></section>'+renderTemplatePanel(market,'monthly');
}
function render(page='daily'){
 currentPage=page==='monthly'?'monthly':'daily';
 const market=markets.find(m=>m.id===selectedMarket)||markets[0];
 const clinic=market.clinics.find(c=>c.id===siteByMarket[market.id])||market.clinics[0];
 const dailyQcTasks=market.tasks.filter(t=>t.group==='Instrument QC & readiness' && t.id!=='rapid' && !(market.id==='socal' && t.id==='clinitek'));
 const monthlyTasks=market.monthly||[];
 return '<section class="dqc-page" aria-label="'+(currentPage==='monthly'?'Lab Monthly Checklist':'Lab Daily Checklist')+' reference">'+
 '<header class="dqc-hero"><div><span class="dqc-eyebrow">'+(currentPage==='monthly'?'LAB OPERATIONS / RECURRING LAB QC':'LAB OPERATIONS / DAILY LAB TASKS')+'</span><h1>'+(currentPage==='monthly'?'Lab Monthly Checklist':'Lab Daily Checklist')+'</h1><p>'+(currentPage==='monthly'?'Recurring QC/calibration tasks and monthly binder documentation by clinic.':'Daily readiness tasks, QC and binder documentation by clinic.')+'</p></div><span class="dqc-readonly">REFERENCE ONLY</span></header>'+
 '<nav class="dqc-market-picker" aria-label="Select checklist market"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+markets.map(function(m){
  return '<button type="button" data-dqc-market="'+safe(m.id)+'" class="dqc-market-choice'+(market.id===m.id?' is-selected':'')+'" aria-pressed="'+(market.id===m.id)+'">'+safe(m.short)+'</button>';
 }).join('')+'</div></nav>'+
 '<div class="dqc-location-bar"><span class="dqc-location-label" id="dqc-clinic-label">Clinic location</span>'+
 '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-dqc-location-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="dqc-location-options" aria-labelledby="dqc-clinic-label dqc-location-value">'+
 '<span id="dqc-location-value">'+safe(clinic.name)+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
 '<div class="dqc-location-options" id="dqc-location-options" role="listbox" aria-labelledby="dqc-clinic-label" hidden>'+
 market.clinics.map(c=>'<button type="button" role="option" data-dqc-clinic-option="'+safe(c.id)+'" class="dqc-location-option'+(c.id===clinic.id?' is-selected':'')+'" aria-selected="'+(c.id===clinic.id)+'" tabindex="-1">'+safe(c.name)+(c.id===clinic.id?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
 '</div></div><span class="dqc-location-hint">Choose a clinic to view its reference</span></div>'+
 '<div class="dqc-market-heading"><div><span class="dqc-market-overline">'+(currentPage==='monthly'?'RECURRING QC':'DAILY LAB TASKS')+' / '+safe(market.short).toUpperCase()+'</span><h2>'+safe(clinic.name)+'</h2><p>'+safe(market.name)+' · Follow site-approved SOPs for installed equipment and required documentation.</p></div></div>'+
 (currentPage==='monthly'?renderMonthlySections(market,monthlyTasks):renderDailySections(market,dailyQcTasks))+
 '<footer class="dqc-footer"><strong>Official records remain separate.</strong><span>This page is a read-only reference, not a signed checklist or QC log. Record results, exceptions and operator initials in the approved system.<span class="dqc-contact-note">Need an item added or updated? <strong>Contact Sam.</strong></span></span></footer>'+
 '</section>';
}
function rerender(){
 const page=document.querySelector('.dqc-page');
 if(page)page.outerHTML=render(currentPage);
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
 const monthly=currentPage==='monthly';
 const valid=monthly?['monthly','monthly-binder','monthly-templates']:['daily','daily-qc','binder','templates'];
 if(!valid.includes(next)||(monthly?selectedMonthlyView:selectedView)===next)return;
 if(monthly)selectedMonthlyView=next;else selectedView=next;
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
  const order=currentPage==='monthly'?['monthly','monthly-binder','monthly-templates']:['daily','daily-qc','binder','templates'];
  const index=order.indexOf(tab.dataset.dqcView);
  const next=e.key==='Home'?order[0]:e.key==='End'?order[order.length-1]:order[(index+(e.key==='ArrowRight'?1:-1)+order.length)%order.length];
  switchView(next,true);
  return;
 }
 if(e.key==='Escape')setLocationMenu(false,false,true);
});
window.LAB_SOCAL_DAILY={render:()=>render('daily'),taskCount:socalTasks.length,tasks:socalTasks};
window.LAB_MONTHLY_CHECKLIST={render:()=>render('monthly'),taskCount:monthlyQcTasks.length,binderCount:monthlyBinder.length};
window.LAB_DAILY_CHECKLIST={render,markets:markets.map(m=>({id:m.id,name:m.name,clinics:m.clinics.map(c=>({...c}))}))};
})();