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
function render(){
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
document.addEventListener('input',e=>{if(e.target&&e.target.matches('[data-tc-start]'))updatePlanner()});
document.addEventListener('click',e=>{
 if(e.target&&e.target.closest('[data-tc-clear]')){
  const date=document.querySelector('.lc-competency [data-tc-start]');
  if(date){date.value='';updatePlanner();date.focus();}
 }
});
window.LAB_TRAINING_COMPETENCY={render,addMonths:dueDate};
})();