/* Training and competency reference and non-persistent scheduling aid for Lab Central. */
(function(){
'use strict';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const methods=[
 ['01','Observe routine testing','Watch patient preparation, specimen handling, processing and test performance as applicable.'],
 ['02','Review result reporting','Verify test results are recorded, transmitted and reported correctly.'],
 ['03','Review QC and records','Review worksheets, intermediate results, QC, PT and maintenance records as applicable.'],
 ['04','Observe instrument checks','Directly observe maintenance, function checks and equipment performance.'],
 ['05','Evaluate test performance','Use previously tested specimens, blind samples or external PT material as appropriate.'],
 ['06','Assess troubleshooting','Evaluate responses to errors, failed QC, incorrect specimens and other testing problems.']
];
const sourceLinks=[
 {name:'CLIA competency requirements, moderate complexity',url:'https://www.law.cornell.edu/cfr/text/42/493.1413'},
 {name:'CLIA competency requirements, high complexity',url:'https://www.law.cornell.edu/cfr/text/42/493.1451'},
 {name:'CMS Assessing Personnel Competency',url:'https://www.cms.gov/Regulations-and-Guidance/Legislation/CLIA/Downloads/CLIA_CompBrochure_508.pdf'}
];
const ico=(name)=>{
 const paths={
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M8 18h3M15 14h2"/>',
 clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM8 11l1.5 1.5L12 10M14 11h2M8 16l1.5 1.5L12 15M14 16h2"/>',
 shield:'<path d="M12 2 4 5.5v6c0 4.7 3.1 8.1 8 10.5 4.9-2.4 8-5.8 8-10.5v-6L12 2Z"/><path d="m8 12 2.5 2.5L16 9"/>',
 file:'<path d="M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h8"/>'
 };
 return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]||paths.file)+'</svg>';
};
function dueDate(iso,months){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return null;
 const parts=iso.split('-').map(Number);
 const y=parts[0],m=parts[1],d=parts[2];
 if(y<1900||y>2200||m<1||m>12||d<1||d>31)return null;
 const base=new Date(Date.UTC(y,m-1,d));
 if(base.getUTCFullYear()!==y||base.getUTCMonth()!==m-1||base.getUTCDate()!==d)return null;
 const target=new Date(Date.UTC(y,m-1+months,1));
 const lastDay=new Date(Date.UTC(target.getUTCFullYear(),target.getUTCMonth()+1,0)).getUTCDate();
 target.setUTCDate(Math.min(d,lastDay));
 return target;
}
function labelDate(date){
 if(!date)return 'Choose a start date';
 return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(date);
}
function updatePlanner(){
 const wrapper=document.querySelector('.lc-competency');
 if(!wrapper)return;
 const input=wrapper.querySelector('[data-tc-start]');
 if(!input)return;
 const value=input.value;
 wrapper.querySelectorAll('[data-tc-due]').forEach(node=>{
  const n=Number(node.dataset.tcDue);
  node.textContent=labelDate(dueDate(value,n));
 });
 const note=wrapper.querySelector('[data-tc-planner-note]');
 if(note)note.textContent=value?
  'Illustrative planning targets based on the first date of patient testing for this test system. Confirm the approved facility calendar and any earlier assessment deadlines.':
  'Enter the first patient-testing date to calculate planning targets. This browser tool does not save staff information or send reminders.';
}
function renderSchedule(){
 const timeline=[
  {stage:'01',when:'Before testing',title:'Initial training',detail:'Complete method-specific instruction, demonstrations and supervised practice. Record training and authorization before independent patient testing.',tip:'Training and initial authorization'},
  {stage:'02',when:'First 6 months',title:'6-month competency',detail:'Document the first semiannual assessment of the person’s nonwaived testing competency.',tip:'First-year assessment 1'},
  {stage:'03',when:'By 12 months',title:'12-month competency',detail:'Document the second first-year competency assessment, with evidence for the required assessment methods.',tip:'First-year assessment 2'},
  {stage:'04',when:'Every year thereafter',title:'Annual competency',detail:'Repeat documented competency at least annually for each applicable nonwaived test system.',tip:'Year 2 and every year after'}
 ];
 return '<div class="lc-competency">'+
  '<header class="tc-hero"><div class="tc-eyebrow">QUALITY &amp; COMPLIANCE</div><h1>Training &amp; Competency</h1><p>Initial training before patient testing, followed by 6-month and 12-month competency during the first year, then annual assessment thereafter.</p><div class="tc-hero-chips"><span>Lab personnel / RN performing testing</span><span>Market-specific SOPs apply</span></div></header>'+
  '<section class="tc-section" aria-labelledby="tc-schedule"><div class="tc-section-top"><span class="tc-section-icon">'+ico('calendar')+'</span><div><h2 id="tc-schedule">Required schedule</h2><p>Use the date an individual begins patient testing on each applicable test system, not automatically the employee hire date.</p></div></div>'+
  '<div class="tc-timeline">'+timeline.map(t=>'<article class="tc-milestone"><div class="tc-milestone-top"><span class="tc-step">'+t.stage+'</span><span class="tc-period">'+esc(t.when)+'</span></div><h3>'+esc(t.title)+'</h3><p>'+esc(t.detail)+'</p><div class="tc-milestone-foot">'+esc(t.tip)+'</div></article>').join('')+'</div>'+
  '<div class="tc-info-line"><strong>Important:</strong> Initial training is not a substitute for documented competency. For nonwaived testing, CLIA requires assessment at least twice during the first year and annually afterward. A new method or instrument also requires reevaluation before reporting results.</div></section>'+
  '<div class="tc-columns"><section class="tc-section tc-planner" aria-labelledby="tc-date-title"><div class="tc-section-top"><span class="tc-section-icon">'+ico('calendar')+'</span><div><h2 id="tc-date-title">Competency due-date planner</h2><p>Calculate the milestone dates for an individual test system.</p></div></div>'+
  '<label class="tc-field-label" for="tc-first-patient-date">Date staff member began patient testing</label><div class="tc-input-line"><input type="date" id="tc-first-patient-date" data-tc-start aria-describedby="tc-date-disclaimer"/><button type="button" class="tc-clear" data-tc-clear>Clear</button></div>'+
  '<div class="tc-dues"><div><span>First-year check</span><strong data-tc-due="6">Choose a start date</strong><small>6 months</small></div><div><span>First-year check</span><strong data-tc-due="12">Choose a start date</strong><small>12 months</small></div><div><span>Annual</span><strong data-tc-due="24">Choose a start date</strong><small>24 months</small></div><div><span>Next annual</span><strong data-tc-due="36">Choose a start date</strong><small>36 months</small></div></div>'+
  '<p class="tc-small-note" id="tc-date-disclaimer" data-tc-planner-note>Enter the first patient-testing date to calculate planning targets. This browser tool does not save staff information or send reminders.</p></section>'+
  '<section class="tc-section" aria-labelledby="tc-record-title"><div class="tc-section-top"><span class="tc-section-icon">'+ico('file')+'</span><div><h2 id="tc-record-title">Forms &amp; documentation</h2><p>Keep training and competency evidence separately for each staff member and applicable test system.</p></div></div>'+
  '<div class="tc-resource-list"><a href="training-competency-record.html?form=training" target="_blank" rel="noopener noreferrer"><span class="tc-resource-icon">'+ico('clipboard')+'</span><span><strong>Initial training record</strong><small>Print a blank form with trainer and trainee sign-off</small></span><span class="tc-resource-arrow" aria-hidden="true">↗</span></a>'+
  '<a href="training-competency-record.html?form=competency" target="_blank" rel="noopener noreferrer"><span class="tc-resource-icon">'+ico('shield')+'</span><span><strong>Competency assessment form</strong><small>Six-element evidence and final assessor review</small></span><span class="tc-resource-arrow" aria-hidden="true">↗</span></a>'+
  '<a href="assets/lab-templates/training-competency-tracker.csv" download><span class="tc-resource-icon">'+ico('calendar')+'</span><span><strong>Competency tracking spreadsheet</strong><small>Blank CSV for due dates, completion and reassessment</small></span><span class="tc-resource-arrow" aria-hidden="true">↓</span></a></div>'+
  '<p class="tc-small-note">Blank templates are reference aids. Use the organization’s approved, controlled records for personnel qualification and competency sign-off.</p></section></div>'+
  '<section class="tc-section" aria-labelledby="tc-six"><div class="tc-section-top"><span class="tc-section-icon">'+ico('shield')+'</span><div><h2 id="tc-six">Six CLIA competency assessment methods</h2><p>Document all six for moderate- and high-complexity testing, as applicable to the individual’s duties and each test system.</p></div></div>'+
  '<div class="tc-six-grid">'+methods.map(x=>'<article><span>'+esc(x[0])+'</span><div><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></div></article>').join('')+'</div></section>'+
  '<div class="tc-columns tc-notes"><section class="tc-section"><h2>Who needs which record?</h2><ul><li><strong>All testing staff:</strong> training and demonstrated capability before independent testing, documented per site policy.</li><li><strong>Moderate / high complexity:</strong> first-year and annual competency assessment using the required methods.</li><li><strong>Waived-only tests:</strong> CLIA does not impose this six-element competency schedule, but training and local or accreditation policies still apply.</li><li><strong>Collection-only staff:</strong> follow competency and training requirements established for specimen collection and other assigned duties.</li></ul></section>'+
  '<section class="tc-section"><h2>Documentation and reassessment</h2><ul><li>Record test system, assessment dates, method evidence, results and corrective action.</li><li>Keep assessor identity, qualifications/authorization and staff sign-off on the approved record.</li><li>Retest or retrain when performance gaps are identified, and document resolution.</li><li>When equipment or methodology changes, retrain and reassess before patient-result reporting.</li><li>A technical consultant/supervisor or properly qualified and authorized designee must conduct competency assessments per complexity and applicable regulations.</li></ul></section></div>'+
  '<footer class="tc-reference"><strong>Regulatory references</strong><p>General guidance for nonwaived laboratory testing. Follow the approved laboratory director/technical consultant or supervisor policy, your accreditation requirements and state law.</p><div class="tc-source-links">'+sourceLinks.map(x=>'<a target="_blank" rel="noopener noreferrer" href="'+esc(x.url)+'">'+esc(x.name)+' ↗</a>').join('')+'</div></footer></div>';
}

/* Portal navigation mirrors the market and clinic structure used by Lab checklists.
   Training forms are method-specific and do not replace formal competency records. */
const trainingMarkets=[
 {id:'socal',short:'SoCal',name:'Southern California',clinics:[['bh','Beverly Hills'],['bh-satellite','Beverly Hills Satellite'],['sm','Santa Monica'],['mb','Manhattan Beach']]},
 {id:'norcal',short:'NorCal',name:'Northern California',clinics:[['sf','San Francisco'],['pa','Palo Alto']]},
 {id:'ny',short:'New York',name:'New York',clinics:[['ues','Upper East Side'],['tribeca','Tribeca'],['hamptons','Hamptons'],['fifth','5th Avenue'],['gramercy','Gramercy'],['hy','Hudson Yards']]},
 {id:'fl',short:'Florida',name:'Florida',clinics:[['boca','Boca Raton'],['palm','Palm Beach'],['cg','Coral Gables']]}
];
const trainingDocuments=[
 {name:'SPOTFIRE Respiratory / Sore Throat',file:'BioFire_SPOTFIRE_RST_Training.pdf',group:'Analyzer training',tone:'teal',note:'Manufacturer checklist and knowledge review',available:true},
 {name:'BioFire FilmArray TORCH',file:'BioFire_TORCH_Training.pdf',group:'Analyzer training',tone:'teal',note:'Instrument operation, software and maintenance checklist',available:true},
 {name:'Piccolo Xpress',file:'Piccolo_Training.pdf',group:'Analyzer training',tone:'teal',note:'Analyzer setup, maintenance, QC and patient testing',available:true},
 {name:'Sysmex pocH-100i',file:'Sysmex_pocH_100i_Training.pdf',group:'Analyzer training',tone:'teal',note:'CBC analyzer training and quality control checklist',available:true},
 {name:'Clinitek Status+ Urinalysis',file:'Clinitek_Status_UA_Training.pdf',group:'Analyzer training',tone:'teal',note:'Urinalysis strip testing and instrument QC',available:true},
 {name:'Clinitek Status+ Urine hCG',file:'Clinitek_Status_Urine_hCG_Training.pdf',group:'Analyzer training',tone:'teal',note:'Urine hCG cassette testing and QC',available:true},
 {name:'Sofia 2',file:'Sofia 2 Training Checklist.docx',group:'Analyzer training',tone:'teal',note:'Analyte selection, 30-day calibration check and controls',available:true},
 {name:'Abbott HIV Combo',file:'Abbott_HIV_Combo_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Test performance, QC levels and interpretation',available:true},
 {name:'Coag-Sense',file:'Coag_Sense_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Coagulation test operation and control procedures',available:true},
 {name:'McKesson Mononucleosis',file:'McKesson_Consult_Mononucleosis_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Mono cassette handling, controls and results',available:true},
 {name:'McKesson Drugs of Abuse Cup',file:'McKesson_Drugs_of_Abuse_Test_Cup_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Urine test cup handling and internal QC',available:true},
 {name:'QuickVue Influenza A/B',file:'Quidel_QuickVue_Influenza_AB_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Flu A/B rapid test training checklist',available:true},
 {name:'QuickVue RSV',file:'Quidel_QuickVue_RSV_Training.pdf',group:'Rapid POC training',tone:'blue',note:'RSV rapid test training checklist',available:true},
 {name:'QuickVue SARS Antigen',file:'Quidel_QuickVue_SARS_Antigen_Training.pdf',group:'Rapid POC training',tone:'blue',note:'SARS antigen rapid test training checklist',available:true},
 {name:'QuickVue Strep A',file:'Quidel_QuickVue_Strep_A_Training.pdf',group:'Rapid POC training',tone:'blue',note:'Strep A rapid test training checklist',available:true},
 {name:'General Laboratory Procedure Package',file:'Sollis_Health_Procedure_Package.pdf',group:'General lab training',tone:'amber',note:'Bloodborne pathogens and core procedure acknowledgments',available:true}
];
let selectedTrainingMarket=window.LAB_MARKET?.get()||'socal';
let selectedTrainingView='schedule';
const trainingClinicByMarket=Object.fromEntries(trainingMarkets.map(m=>[m.id,m.clinics[0][0]]));
let plannerStart='';
const trainingTabs=[
 {id:'schedule',title:'Training Schedule',subtitle:'Initial, 6 months, 12 months, annual',icon:'calendar',tone:'teal'},
 {id:'templates',title:'Training Templates',subtitle:'Method-specific checklists',icon:'file',tone:'blue'},
 {id:'records',title:'Competency Records',subtitle:'Assessment methods and tracking',icon:'shield',tone:'amber'}
];
function trainingMarket(){return trainingMarkets.find(m=>m.id===selectedTrainingMarket)||trainingMarkets[0]}
function trainingClinic(market){return market.clinics.find(c=>c[0]===trainingClinicByMarket[market.id])||market.clinics[0]}
function sourceLink(file){return 'assets/training-checklists/'+encodeURIComponent(file)}
function trainingTemplateCards(items){
 return items.map(t=>{
  const link=t.available?'<a class="tc-document-link" href="'+esc(sourceLink(t.file))+'" target="_blank" rel="noopener noreferrer">Open original '+(t.file.endsWith('.docx')?'Word':'PDF')+' <span aria-hidden="true">↗</span></a>'
   :'<span class="tc-document-unavailable">Document not available</span>';
  return '<article class="tc-document-card" data-tone="'+esc(t.tone)+'">'+
    '<div class="tc-document-heading"><span class="tc-document-icon">'+ico('file')+'</span><span class="tc-document-format">'+(t.file.endsWith('.docx')?'DOCX':'PDF')+'</span></div>'+
    '<h3>'+esc(t.name)+'</h3><p>'+esc(t.note)+'</p>'+
    '<div class="tc-document-footer">'+link+'<span class="tc-document-category">'+esc(t.group)+'</span></div>'+
   '</article>';
 }).join('');
}
function renderTrainingTemplates(market,clinic){
 const groups=['Analyzer training','Rapid POC training','General lab training'];
 return '<section class="tc-route-panel tc-templates-panel" role="tabpanel" id="tc-panel-templates" aria-labelledby="tc-tab-templates">'+
 '<div class="tc-section-top tc-route-head"><span class="tc-section-icon tc-section-icon-blue">'+ico('file')+'</span><div><h2>Training Templates</h2><p>Source training checklists for '+esc(market.name)+'. Open only the forms for equipment and tests installed at your site.</p></div><span class="tc-page-count">'+trainingDocuments.length+' documents</span></div>'+
 '<div class="tc-information-accent tc-information-accent-blue"><strong>Training record, not competency sign-off.</strong> Document trainer and trainee review before independent patient testing. These checklists are provided versions and may reference different QC cadences. Use the active market SOP and current manufacturer IFU for actual testing and QC.'+(market.id==='socal'?' <strong>SoCal:</strong> Follow the local monthly and event-triggered Clinitek external QC schedule.':' <strong>'+esc(market.short)+':</strong> Follow the local daily Clinitek external QC schedule.')+'</div>'+
 groups.map((g,i)=>{
  const items=trainingDocuments.filter(t=>t.group===g);
  const tone=i===0?'teal':i===1?'blue':'amber';
  return '<section class="tc-template-group" aria-label="'+esc(g)+'"><header class="tc-template-group-title" data-tone="'+tone+'"><h3>'+esc(g)+'</h3><span>'+items.length+' documents</span></header><div class="tc-document-grid">'+trainingTemplateCards(items)+'</div></section>';
 }).join('')+
 '<p class="tc-template-footnote">The procedure package covers more than instrument training. All source documents in this collection are now available as PDF or Word files. Completed individual checklists and assessment forms belong in the approved staff training file. Avoid uploading completed personnel records to this public reference site.</p></section>';
}
function renderCompetencyRecords(){
 return '<section class="tc-route-panel tc-records-panel" role="tabpanel" id="tc-panel-records" aria-labelledby="tc-tab-records">'+
 '<div class="tc-section-top tc-route-head"><span class="tc-section-icon tc-section-icon-amber">'+ico('shield')+'</span><div><h2>Competency Documentation</h2><p>Use competency evidence and sign-off independently of initial method training.</p></div></div>'+
 '<div class="tc-information-accent tc-information-accent-amber"><strong>Assessment cycle:</strong> At least twice in the first year for nonwaived testing, then annually. Documentation is per staff member and relevant test system. Waived-only tests follow applicable facility and accreditation policy.</div>'+
 '<div class="tc-record-grid"><a href="training-competency-record.html?form=training" target="_blank" rel="noopener noreferrer"><span class="tc-record-icon">'+ico('clipboard')+'</span><strong>Initial Training Record</strong><small>Trainer and trainee sign-off</small><span>Open form ↗</span></a>'+
 '<a href="training-competency-record.html?form=competency" target="_blank" rel="noopener noreferrer"><span class="tc-record-icon">'+ico('shield')+'</span><strong>Competency Assessment Form</strong><small>Six assessment methods and assessor decision</small><span>Open form ↗</span></a>'+
 '<a href="assets/lab-templates/training-competency-tracker.csv" download><span class="tc-record-icon">'+ico('calendar')+'</span><strong>Competency Tracking Sheet</strong><small>Blank staff and test-system tracking CSV</small><span>Download CSV ↓</span></a></div>'+
 '<div class="tc-section tc-competency-methods"><h2>Six methods of nonwaived competency assessment</h2><div class="tc-six-grid">'+methods.map(x=>'<article><span>'+esc(x[0])+'</span><div><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></div></article>').join('')+'</div></div></section>';
}
function render(){
 const market=trainingMarket(),clinic=trainingClinic(market);
 return '<div class="lc-competency tc-portal">'+
 '<div class="tc-page-heading"><span class="tc-page-overline">TRAINING &amp; COMPETENCY / '+esc(market.short).toUpperCase()+'</span><h1>'+esc(market.name)+'</h1><p>Market-wide training and competency reference. Confirm the approved requirements for the instruments installed at your clinic.</p></div>'+
 '<nav class="tc-view-switch" role="tablist" aria-label="Training and competency sections">'+trainingTabs.map(t=>'<button type="button" id="tc-tab-'+t.id+'" role="tab" aria-selected="'+(selectedTrainingView===t.id)+'" aria-controls="tc-panel-'+t.id+'" tabindex="'+(selectedTrainingView===t.id?'0':'-1')+'" class="tc-view-button'+(selectedTrainingView===t.id?' is-selected':'')+'" data-tc-view="'+t.id+'" data-tone="'+t.tone+'"><span class="tc-view-icon">'+ico(t.icon)+'</span><span class="tc-view-copy"><strong>'+esc(t.title)+'</strong><small>'+esc(t.subtitle)+'</small></span></button>').join('')+'</nav>'+
 '<div id="tc-panel-schedule" role="tabpanel" aria-labelledby="tc-tab-schedule" class="tc-route-panel tc-schedule-panel"'+(selectedTrainingView==='schedule'?'':' hidden')+'>'+renderSchedule()+'</div>'+
 '<div'+(selectedTrainingView==='templates'?'':' hidden')+'>'+renderTrainingTemplates(market,clinic)+'</div>'+
 '<div'+(selectedTrainingView==='records'?'':' hidden')+'>'+renderCompetencyRecords()+'</div>'+
 '<footer class="tc-market-footer">Training and competency are tracked in the approved staff record, not saved on this page. For clinic-specific instrument coverage, follow the market SOP and contact laboratory leadership about missing training forms.</footer>'+
 '</div>';
}
function rerenderTraining(){
 const root=document.querySelector('.tc-portal');
 if(!root)return;
 const scrollLeft=root.querySelector('.tc-view-switch')?.scrollLeft||0;
 root.outerHTML=render();
 const strip=document.querySelector('.tc-portal .tc-view-switch');
 if(strip)strip.scrollLeft=scrollLeft;
 const input=document.querySelector('.tc-portal [data-tc-start]');
 if(input){input.value=plannerStart;updatePlanner();}
}

document.addEventListener('input',e=>{if(e.target&&e.target.matches('[data-tc-start]')){plannerStart=e.target.value;updatePlanner();}});
function setTrainingClinicMenu(open,focusSelected=false,returnFocus=false){
 const picker=document.querySelector('.tc-portal .tc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-tc-location-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;
 trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&returnFocus)trigger.focus();
}
document.addEventListener('click',e=>{
 const market=e.target?.closest('.tc-portal [data-tc-market]');
 if(market){
  const next=market.getAttribute('data-tc-market');
  if(trainingMarkets.some(m=>m.id===next)&&selectedTrainingMarket!==next){
   selectedTrainingMarket=next;
   rerenderTraining();
  }
  return;
 }
 const toggle=e.target?.closest('.tc-portal [data-tc-location-toggle]');
 if(toggle){setTrainingClinicMenu(toggle.getAttribute('aria-expanded')!=='true');return;}
 const option=e.target?.closest('.tc-portal [data-tc-clinic-option]');
 if(option){
  const next=option.getAttribute('data-tc-clinic-option');
  const market=trainingMarket();
  if(market.clinics.some(c=>c[0]===next)){
   trainingClinicByMarket[market.id]=next;
   rerenderTraining();
   document.querySelector('.tc-portal [data-tc-location-toggle]')?.focus();
  }
  return;
 }
 const view=e.target?.closest('.tc-portal [data-tc-view]');
 if(view){selectedTrainingView=view.dataset.tcView;rerenderTraining();return;}
 if(e.target?.closest('.tc-portal [data-tc-clear]')){
  const date=document.querySelector('.tc-portal [data-tc-start]');
  if(date){plannerStart='';date.value='';updatePlanner();date.focus();}
  return;
 }
 if(!e.target?.closest('.tc-portal .tc-location-picker'))setTrainingClinicMenu(false);
});
document.addEventListener('keydown',e=>{
 const view=e.target?.closest('.tc-portal [data-tc-view]');
 if(view&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
  e.preventDefault();
  const order=trainingTabs.map(tab=>tab.id);
  const index=order.indexOf(view.getAttribute('data-tc-view'));
  const next=e.key==='Home'?order[0]:e.key==='End'?order[order.length-1]:order[(index+(e.key==='ArrowRight'?1:-1)+order.length)%order.length];
  if(next!==selectedTrainingView){selectedTrainingView=next;rerenderTraining();}
  document.querySelector('.tc-portal [data-tc-view="'+next+'"]')?.focus();
  return;
 }
 const trigger=e.target?.closest('.tc-portal [data-tc-location-toggle]');
 if(trigger&&['ArrowDown','ArrowUp','Enter',' '].includes(e.key)){
  e.preventDefault();
  setTrainingClinicMenu(true,true);
  if(e.key==='ArrowUp'){
   const options=Array.from(document.querySelectorAll('.tc-portal [data-tc-clinic-option]'));
   options[options.length-1]?.focus();
  }
  return;
 }
 if(trigger&&e.key==='Escape'){e.preventDefault();setTrainingClinicMenu(false,false,true);return;}
 const option=e.target?.closest('.tc-portal [data-tc-clinic-option]');
 if(!option)return;
 if(e.key==='Escape'){e.preventDefault();setTrainingClinicMenu(false,false,true);return;}
 if(e.key==='Tab'){setTrainingClinicMenu(false);return;}
 const options=Array.from(document.querySelectorAll('.tc-portal [data-tc-clinic-option]'));
 const index=options.indexOf(option);
 let next=null;
 if(e.key==='ArrowDown')next=options[(index+1)%options.length];
 else if(e.key==='ArrowUp')next=options[(index-1+options.length)%options.length];
 else if(e.key==='Home')next=options[0];
 else if(e.key==='End')next=options[options.length-1];
 if(next){e.preventDefault();next.focus();}
});
document.addEventListener('labcentral:marketchange',event=>{
 const next=event.detail?.market;
 if(trainingMarkets.some(m=>m.id===next))selectedTrainingMarket=next;
});
window.LAB_TRAINING_COMPETENCY={render,addMonths:dueDate};
})();