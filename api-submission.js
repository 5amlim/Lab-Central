/* API proficiency-testing reference: submission, reporting, and safeguards. */
(function(){
"use strict";
const x=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url={
 portal:"https://ppt.api-pt.com/",
 guide:"https://api-pt.zendesk.com/hc/en-us/article_attachments/42814536754075",
 confirm:"https://api-pt.zendesk.com/hc/en-us/articles/4411486964251-If-I-submit-online-how-do-I-know-that-API-received-my-results-Should-I-also-mail-the-paper-worksheets",
 attest:"https://api-pt.zendesk.com/hc/en-us/articles/4411472224923-I-am-submitting-my-results-online-How-do-we-sign-the-Attestation-Statement",
 comment:"https://api-pt.zendesk.com/hc/en-us/articles/4411494308379-I-am-submitting-results-online-and-I-want-to-make-a-comment-How-do-I-do-that",
 correction:"https://api-pt.zendesk.com/hc/en-us/articles/4411494250523-I-submitted-my-results-online-and-now-I-noticed-a-data-entry-error-Can-I-still-fix-it",
 limits:"https://api-pt.zendesk.com/hc/en-us/articles/4411044919067-How-do-I-report-a-result-that-falls-outside-of-my-instrument-s-linear-range",
 cms:"https://www.cms.gov/regulations-and-guidance/legislation/clia/downloads/cliabrochure8.pdf",
 support:"https://api-pt.com/support/contact-us",
 unit:"https://www.labcorp.com/test-menu/resources/si-unit-conversion-table"
};
const link=(u,text,cl)=>'<a class="'+(cl||"api2-link")+'" href="'+x(u)+'" target="_blank" rel="noopener noreferrer">'+x(text)+' <span aria-hidden="true">↗</span></a>';
const badge=(text,tone)=>'<span class="api2-badge '+(tone||"")+'">'+x(text)+'</span>';
/* Clinic reference selector. Uses the same market, clinic and custom listbox conventions
   as Daily/Monthly Checklists. Selection never changes the external API account. */
const ptMarkets=[
 {id:'socal',short:'SoCal',name:'Southern California',clinics:[{id:'bh',name:'Beverly Hills'},{id:'bh-satellite',name:'Beverly Hills Satellite'},{id:'sm',name:'Santa Monica'},{id:'mb',name:'Manhattan Beach'}]},
 {id:'norcal',short:'NorCal',name:'Northern California',clinics:[{id:'sf',name:'San Francisco'},{id:'palo-alto',name:'Palo Alto'}]},
 {id:'ny',short:'New York',name:'New York',clinics:[{id:'ues',name:'Upper East Side'},{id:'tribeca',name:'Tribeca'},{id:'hamptons',name:'Hamptons'},{id:'fifth',name:'5th Avenue'},{id:'gramercy',name:'Gramercy'},{id:'hudson-yards',name:'Hudson Yards'}]},
 {id:'fl',short:'Florida',name:'Florida',clinics:[{id:'boca',name:'Boca Raton'},{id:'palm-beach',name:'Palm Beach'},{id:'coral-gables',name:'Coral Gables'}]}
];
let selectedPtMarket='socal';
const clinicByPtMarket=Object.fromEntries(ptMarkets.map(m=>[m.id,m.clinics[0].id]));
function selectedPtSite(){
 const market=ptMarkets.find(m=>m.id===selectedPtMarket)||ptMarkets[0];
 return {market,clinic:market.clinics.find(c=>c.id===clinicByPtMarket[market.id])||market.clinics[0]};
}
function marketSelector(){
 const {market,clinic}=selectedPtSite();
 return '<section class="api2-site-selector" aria-label="API market and clinic reference">'+
  '<nav class="dqc-market-picker" aria-label="Select API PT market"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+
  ptMarkets.map(m=>'<button type="button" data-api2-market="'+x(m.id)+'" class="dqc-market-choice'+(m.id===market.id?' is-selected':'')+'" aria-pressed="'+(m.id===market.id)+'">'+x(m.short)+'</button>').join('')+'</div></nav>'+
  '<div class="dqc-location-bar"><span class="dqc-location-label" id="api2-clinic-label">Clinic location</span>'+
  '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-api2-location-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="api2-location-options" aria-labelledby="api2-clinic-label api2-clinic-value">'+
  '<span id="api2-clinic-value">'+x(clinic.name)+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
  '<div class="dqc-location-options" id="api2-location-options" role="listbox" aria-labelledby="api2-clinic-label" hidden>'+
  market.clinics.map(c=>'<button type="button" role="option" data-api2-clinic="'+x(c.id)+'" class="dqc-location-option'+(c.id===clinic.id?' is-selected':'')+'" aria-selected="'+(c.id===clinic.id)+'" tabindex="-1">'+x(c.name)+(c.id===clinic.id?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
  '</div></div><span class="dqc-location-hint">Choose a clinic to view its PT reference</span></div>'+
  '<div class="dqc-market-heading"><div><span class="dqc-market-overline">PROFICIENCY TESTING / '+x(market.short).toUpperCase()+'</span>'+
  '<h2>'+x(clinic.name)+'</h2><p>'+x(market.name)+' · Verify the current enrollment, API account and approved PT procedures for this clinic.</p></div></div>'+
  '</section>';
}
function rerenderPtSite(returnFocus=false){
 const root=document.querySelector('.api2-site-selector');
 if(!root)return;
 root.outerHTML=marketSelector();
 if(returnFocus)document.querySelector('.api2-site-selector [data-api2-location-toggle]')?.focus();
}
function setPtSiteMenu(open,focusSelected=false,returnFocus=false){
 const picker=document.querySelector('.api2-site-selector .dqc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-api2-location-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;
 trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&returnFocus)trigger.focus();
}
document.addEventListener('click',event=>{
 const button=event.target?.closest('.api2-site-selector [data-api2-market]');
 if(button){
  const next=button.getAttribute('data-api2-market');
  if(ptMarkets.some(m=>m.id===next)&&next!==selectedPtMarket){selectedPtMarket=next;rerenderPtSite();}
  return;
 }
 const trigger=event.target?.closest('.api2-site-selector [data-api2-location-toggle]');
 if(trigger){setPtSiteMenu(trigger.getAttribute('aria-expanded')!=='true');return;}
 const choice=event.target?.closest('.api2-site-selector [data-api2-clinic]');
 if(choice){
  const {market}=selectedPtSite(),id=choice.getAttribute('data-api2-clinic');
  if(market.clinics.some(c=>c.id===id)){clinicByPtMarket[market.id]=id;rerenderPtSite(true);}
  return;
 }
 if(!event.target?.closest('.api2-site-selector .dqc-location-picker'))setPtSiteMenu(false);
});
document.addEventListener('keydown',event=>{
 const trigger=event.target?.closest('.api2-site-selector [data-api2-location-toggle]');
 if(trigger&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
  event.preventDefault();setPtSiteMenu(true,true);
  if(event.key==='ArrowUp'){
   const options=Array.from(document.querySelectorAll('.api2-site-selector [data-api2-clinic]'));
   options[options.length-1]?.focus();
  }
  return;
 }
 if(trigger&&event.key==='Escape'){event.preventDefault();setPtSiteMenu(false,false,true);return;}
 const choice=event.target?.closest('.api2-site-selector [data-api2-clinic]');
 if(!choice)return;
 if(event.key==='Escape'){event.preventDefault();setPtSiteMenu(false,false,true);return;}
 if(event.key==='Tab'){setPtSiteMenu(false);return;}
 const options=Array.from(document.querySelectorAll('.api2-site-selector [data-api2-clinic]'));
 const idx=options.indexOf(choice);let next;
 if(event.key==='ArrowDown')next=options[(idx+1)%options.length];
 else if(event.key==='ArrowUp')next=options[(idx-1+options.length)%options.length];
 else if(event.key==='Home')next=options[0];
 else if(event.key==='End')next=options[options.length-1];
 if(next){event.preventDefault();next.focus();}
});


/* Calibration verification uses the same site list and accessible selector patterns as API.
   Each compliance page tracks its selected clinic independently. */
let selectedCalverMarket='socal';
const clinicByCalverMarket=Object.fromEntries(ptMarkets.map(m=>[m.id,m.clinics[0].id]));
function selectedCalverSite(){
 const market=ptMarkets.find(m=>m.id===selectedCalverMarket)||ptMarkets[0];
 return {market,clinic:market.clinics.find(c=>c.id===clinicByCalverMarket[market.id])||market.clinics[0]};
}
function calverMarketSelector(){
 const {market,clinic}=selectedCalverSite();
 return '<section class="calver2-site-selector" aria-label="Calibration verification market and clinic reference">'+
  '<nav class="dqc-market-picker" aria-label="Select calibration verification market"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+
  ptMarkets.map(m=>'<button type="button" data-calver2-market="'+x(m.id)+'" class="dqc-market-choice'+(m.id===market.id?' is-selected':'')+'" aria-pressed="'+(m.id===market.id)+'">'+x(m.short)+'</button>').join('')+'</div></nav>'+
  '<div class="dqc-location-bar"><span class="dqc-location-label" id="calver2-clinic-label">Clinic location</span>'+
  '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-calver2-location-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="calver2-location-options" aria-labelledby="calver2-clinic-label calver2-clinic-value">'+
  '<span id="calver2-clinic-value">'+x(clinic.name)+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
  '<div class="dqc-location-options" id="calver2-location-options" role="listbox" aria-labelledby="calver2-clinic-label" hidden>'+
  market.clinics.map(c=>'<button type="button" role="option" data-calver2-clinic="'+x(c.id)+'" class="dqc-location-option'+(c.id===clinic.id?' is-selected':'')+'" aria-selected="'+(c.id===clinic.id)+'" tabindex="-1">'+x(c.name)+(c.id===clinic.id?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
  '</div></div><span class="dqc-location-hint">Choose a clinic to view its calibration verification reference</span></div>'+
  '<div class="dqc-market-heading"><div><span class="dqc-market-overline">CALIBRATION VERIFICATION / '+x(market.short).toUpperCase()+'</span>'+
  '<h2>'+x(clinic.name)+'</h2><p>'+x(market.name)+' · Confirm this clinic’s analyzer-specific verification plan, acceptance limits, and documentation requirements before testing.</p></div></div>'+
  '</section>';
}
function rerenderCalverSite(returnFocus=false){
 const root=document.querySelector('.calver2-site-selector');
 if(!root)return;
 root.outerHTML=calverMarketSelector();
 if(returnFocus)document.querySelector('.calver2-site-selector [data-calver2-location-toggle]')?.focus();
}
function setCalverSiteMenu(open,focusSelected=false,returnFocus=false){
 const picker=document.querySelector('.calver2-site-selector .dqc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-calver2-location-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;
 trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&returnFocus)trigger.focus();
}
document.addEventListener('click',event=>{
 const button=event.target?.closest('.calver2-site-selector [data-calver2-market]');
 if(button){
  const next=button.getAttribute('data-calver2-market');
  if(ptMarkets.some(m=>m.id===next)&&next!==selectedCalverMarket){selectedCalverMarket=next;rerenderCalverSite();}
  return;
 }
 const trigger=event.target?.closest('.calver2-site-selector [data-calver2-location-toggle]');
 if(trigger){setCalverSiteMenu(trigger.getAttribute('aria-expanded')!=='true');return;}
 const choice=event.target?.closest('.calver2-site-selector [data-calver2-clinic]');
 if(choice){
  const {market}=selectedCalverSite(),id=choice.getAttribute('data-calver2-clinic');
  if(market.clinics.some(c=>c.id===id)){clinicByCalverMarket[market.id]=id;rerenderCalverSite(true);}
  return;
 }
 if(!event.target?.closest('.calver2-site-selector .dqc-location-picker'))setCalverSiteMenu(false);
});
document.addEventListener('keydown',event=>{
 const trigger=event.target?.closest('.calver2-site-selector [data-calver2-location-toggle]');
 if(trigger&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
  event.preventDefault();setCalverSiteMenu(true,true);
  if(event.key==='ArrowUp'){
   const options=Array.from(document.querySelectorAll('.calver2-site-selector [data-calver2-clinic]'));
   options[options.length-1]?.focus();
  }
  return;
 }
 if(trigger&&event.key==='Escape'){event.preventDefault();setCalverSiteMenu(false,false,true);return;}
 const choice=event.target?.closest('.calver2-site-selector [data-calver2-clinic]');
 if(!choice)return;
 if(event.key==='Escape'){event.preventDefault();setCalverSiteMenu(false,false,true);return;}
 if(event.key==='Tab'){setCalverSiteMenu(false);return;}
 const options=Array.from(document.querySelectorAll('.calver2-site-selector [data-calver2-clinic]'));
 const idx=options.indexOf(choice);let next;
 if(event.key==='ArrowDown')next=options[(idx+1)%options.length];
 else if(event.key==='ArrowUp')next=options[(idx-1+options.length)%options.length];
 else if(event.key==='Home')next=options[0];
 else if(event.key==='End')next=options[options.length-1];
 if(next){event.preventDefault();next.focus();}
});

const steps=[
 {title:"Open the correct API event",stage:"Portal",tone:"blue",desc:"Sign in to Paperless Proficiency Testing, choose Enter Results, then select the active event on Current Events. Match the event year, category, event number, kit and site before entering anything.",hint:"Instructions & Worksheets is available alongside the event. The event deadline is on the current event paperwork.",ui:"Enter Results → Current Events → Event name"},
 {title:"Review enrolled tests and methods",stage:"Setup",tone:"blue",desc:"Select the test name under Enter or Review Test Results. Confirm the Sample IDs, analytes, instrument/method and all additional reportable analytes. Previous-event methods may carry forward and need verification.",hint:"Never assume that every assay on an instrument is enrolled. Report only what your facility performs and what the event requests.",ui:"Enter or Review Test Results → Test name"},
 {title:"Enter each reported result",stage:"Entry",tone:"teal",desc:"Enter the laboratory’s actual result for each sample/analyte using numeric input, the offered drop-down, or the qualitative result list. Use the same analyzer and routine reporting method used for patients.",hint:"Check whether API requests a numeric value, a qualitative choice, or a result limit. Do not enter a guessed value or a placeholder zero.",ui:"Enter Test Results → Result fields"},
 {title:"Match units and reporting conventions",stage:"Entry",tone:"teal",desc:"Compare the analyzer printout’s units to API’s displayed units before typing. Convert only equivalent units when necessary and document the factor used. Check FEU versus DDU, reportable-range signs and decimal precision.",hint:"See the Units & reporting tab for common calculations. Verify test-specific units and method codes for the current event.",ui:"Review analyte + unit + method"},
 {title:"Save and review completeness",stage:"Review",tone:"purple",desc:"Select Save Results for each test section, then return to Enter or Review Test Results. Green checks indicate completed sections with methods; red X marks missing entries or methods. A legitimately unperformed test can remain blank.",hint:"The portal saving your work does not mean your results have been sent to API.",ui:"Save Results → Enter or Review Test Results"},
 {title:"Perform a second-person verification",stage:"Review",tone:"purple",desc:"Use Print All to review entered results against original analyzer reports, Sample IDs, methods, significant figures, result qualifiers and unit conversions. Resolve questions before submission.",hint:"Have an authorized reviewer check transcription, especially values converted from different units.",ui:"Enter or Review Test Results → Print All"},
 {title:"Complete the attestation",stage:"Final",tone:"amber",desc:"Select CLICK FOR ATTESTATION AND SUBMISSION. Enter the laboratory director (or designated name in the portal) and all persons who performed testing. The director field and testing-personnel Box 1 are required for portal submission.",hint:"Only attest after confirming PT was performed as patient testing would be. Keep an actual signed attestation in the permanent record.",ui:"CLICK FOR ATTESTATION AND SUBMISSION"},
 {title:"Transmit results to API",stage:"Final",tone:"amber",desc:"Select CLICK TO SUBMIT RESULTS TO API (sometimes described as Transmit to API). Wait for the Submission Complete confirmation. Do not stop after saving or merely opening the attestation page.",hint:"Submit before the posted event cut-off. A saved but untransmitted kit is not a completed submission.",ui:"CLICK TO SUBMIT RESULTS TO API"},
 {title:"Verify receipt and archive the packet",stage:"Records",tone:"blue",desc:"Open Enter Results → Event History. Confirm the submitted event and timestamp, and download or print the submitted worksheets and electronic attestation. Obtain required signatures and file raw reports, comments and confirmation.",hint:"When submitting online, do not additionally mail worksheets or the signed attestation to API. Retain PT records at least two years.",ui:"Enter Results → Event History"}
];
const rail=(items,aria)=>'<div class="api2-rail" aria-label="'+x(aria)+'">'+items.map((s,i)=>'<div><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+x(s)+'</strong></div>').join('')+'</div>';
function submission(){
 return '<section class="api2-page api2-submission">'+
 '<header class="api2-intro api2-submission-hero"><div class="api2-submission-hero-copy"><div class="api2-overline">API · PAPERLESS PROFICIENCY TESTING</div><h2>Submit PT results</h2><p>Enter, review, attest and transmit the current PT event. Follow the real API portal screens and verify receipt before filing.</p></div>'+
 '<div class="api2-submission-hero-actions"><a href="'+x(url.portal)+'" class="api2-submission-portal" target="_blank" rel="noopener noreferrer">Open API Paperless PT <span aria-hidden="true">↗</span></a>'+link(url.guide,"Official API entry guide")+'</div></header>'+
 '<div class="api2-submit-alert" role="note"><strong>Saving is not submitting.</strong><span>Complete the attestation, transmit to API, then confirm the event appears in Event History.</span></div>'+
 '<div class="api2-section-head api2-flow-title"><div><h3>Submission procedure</h3><p>Follow these nine steps in order. Choose a phase below to jump to it.</p></div>'+badge("9 steps · 4 phases","neutral")+'</div>'+
 '<nav class="api2-phase-nav" aria-label="Jump to a submission phase">'+[
 ["01","Prepare event","prepare"],
 ["02","Enter & review","entry"],
 ["03","Attest & submit","attest"],
 ["04","Confirm & file","confirm"]
 ].map(v=>'<a href="#api-submit-'+v[2]+'" aria-label="Jump to phase '+v[0]+': '+v[1]+'"><span>'+v[0]+'</span>'+x(v[1])+'</a>').join('')+'</nav>'+
 '<div class="api2-phase-list">'+[
  {index:'01',id:'prepare',title:'Prepare the event',caption:'Identify the active event and enrolled methods.',tone:'blue',start:0,end:2},
  {index:'02',id:'entry',title:'Enter and review',caption:'Enter the results, match units and check saved entries.',tone:'teal',start:2,end:6},
  {index:'03',id:'attest',title:'Attest and submit',caption:'Attest, then transmit to API.',tone:'amber',start:6,end:8},
  {index:'04',id:'confirm',title:'Confirm and file',caption:'Verify receipt and retain the complete packet.',tone:'blue',start:8,end:9}
 ].map(phase=>
  '<section id="api-submit-'+phase.id+'" class="api2-phase api2-phase-'+phase.tone+'" aria-label="'+x(phase.title)+'">'+
   '<header class="api2-phase-heading"><span class="api2-phase-number">'+x(phase.index)+'</span><div><span class="api2-phase-kicker">PHASE '+x(phase.index)+'</span><h4>'+x(phase.title)+'</h4><p>'+x(phase.caption)+'</p></div><span class="api2-phase-count">'+(phase.end-phase.start)+' '+(phase.end-phase.start===1?'step':'steps')+'</span></header>'+
   '<div class="api2-step-grid">'+steps.slice(phase.start,phase.end).map((item,i)=>
    '<article class="api2-step api2-tone-'+item.tone+'"><div class="api2-step-top"><span class="api2-num">'+String(phase.start+i+1).padStart(2,"0")+'</span>'+badge(item.stage,item.tone)+'</div>'+
    '<h5>'+x(item.title)+'</h5><p>'+x(item.desc)+'</p>'+
    '<div class="api2-screen"><span>IN API PORTAL</span><b>'+x(item.ui)+'</b></div>'+
    '<div class="api2-step-note"><strong>CHECK BEFORE CONTINUING</strong><span>'+x(item.hint)+'</span></div></article>'
   ).join('')+'</div></section>'
 ).join('')+'</div>'+
 '<div class="api2-twin"><section class="api2-panel"><h3>Before you click Transmit</h3><ul class="api2-checklist"><li>Correct CLIA site, event, kit and sample IDs</li><li>All performed analytes entered, with the correct method</li><li>Numeric units, qualifiers, decimals and qualitative choices verified</li><li>Analyzer printouts reconciled with the saved result screen</li><li>Attestation lists all persons who actually performed testing</li><li>Submission deadline has not passed</li></ul></section><section class="api2-panel"><h3>Submission proof</h3><p>Use <strong>Enter Results → Event History</strong> to download the submitted results and electronic attestation. Keep the dated submission timestamp with the signed records and analyzer outputs.</p><div class="api2-mini-callout">API’s electronic attestation still needs the required personnel signatures in the retained laboratory record.</div>'+link(url.confirm,"API: verify submitted results")+'</section></div>'+
 '<section class="api2-sources"><strong>Official guidance</strong><div>'+link(url.guide,"API entering results")+link(url.attest,"API attestation")+link(url.cms,"CMS PT requirements")+'</div></section></section>';
}
const units=[
 ["C-reactive protein (CRP)","mg/dL → mg/L","Multiply by 10","0.8 mg/dL = 8 mg/L"],
 ["Troponin I","ng/mL → ng/L","Multiply by 1,000","0.025 ng/mL = 25 ng/L"],
 ["D-dimer: same FEU/DDU basis","mg/L → ng/mL","Multiply by 1,000","0.50 mg/L FEU = 500 ng/mL FEU"],
 ["Hemoglobin (HGB)","g/dL → g/L","Multiply by 10","13.5 g/dL = 135 g/L"],
 ["Hematocrit (HCT)","% → fraction","Divide by 100","42% = 0.42"],
 ["WBC / Platelets","10³/µL → 10⁹/L","Numerical value unchanged","7.2 → 7.2"],
 ["RBC","10⁶/µL → 10¹²/L","Numerical value unchanged","4.5 → 4.5"],
 ["Glucose","mg/dL → mmol/L","Divide by 18.018","90 mg/dL ≈ 5.0 mmol/L"],
 ["Creatinine","mg/dL → µmol/L","Multiply by 88.4","1.0 mg/dL = 88.4 µmol/L"],
 ["Sodium / Potassium","mEq/L → mmol/L","1:1 for monovalent ions","140 mEq/L Na⁺ = 140 mmol/L"]
];
function unitsPage(){
 return '<section class="api2-page">'+
 '<header class="api2-intro"><div class="api2-overline">API · RESULT ENTRY</div><h2>Units &amp; reporting</h2><p>Use only the analytes and units requested by your current API event. The examples below are mathematical references, not assumed API reporting units.</p></header>'+
 '<div class="api2-alert api2-alert-critical"><strong>Do not silently convert between D-dimer FEU and DDU.</strong><p>They are different reporting bases, not ordinary metric-unit equivalents. Verify what the instrument measures and what API requires; ask lab leadership or API Technical Support before entering a mismatched result.</p></div>'+
 '<div class="api2-section-head"><div><h3>Common result-entry conversions</h3><p>Always preserve method identity, reportable-range qualifiers and appropriate precision.</p></div>'+badge("Reference only","neutral")+'</div>'+
 '<div class="api2-table-scroll"><table class="api2-conversions"><thead><tr><th>Analyte</th><th>Convert</th><th>Rule</th><th>Example</th></tr></thead><tbody>'+units.map((row,i)=>'<tr><td><strong>'+x(row[0])+'</strong></td><td>'+x(row[1])+'</td><td><span class="api2-factor">'+x(row[2])+'</span></td><td>'+x(row[3])+'</td></tr>').join('')+'</tbody></table></div>'+
 '<div class="api2-twin"><section class="api2-panel"><h3>How to handle out-of-range results</h3><p>If an instrument reports below or above its validated reportable range, enter the reported limit with the proper <strong>&lt;</strong> or <strong>&gt;</strong> sign in API’s online result field, as the event instructions permit.</p><div class="api2-example"><span>Example</span><strong>&lt;4.1 ng/L</strong><p>Do not turn an analyzer’s “less than” result into an exact number of 4.1.</p></div>'+link(url.limits,"API: report linear limits")+'</section>'+
 '<section class="api2-panel"><h3>Before entering a converted value</h3><ul class="api2-checklist"><li>Confirm the analyte, specimen and same method</li><li>Check whether API already accepts the analyzer’s native unit</li><li>Confirm the conversion has the same FEU/DDU or other reporting basis</li><li>Preserve &lt; / &gt;, qualitative categories and correct rounding</li><li>Record the original value, original unit and calculated entry for audit</li></ul></section></div>'+
 '<section class="api2-panel api2-instrument-notes"><h3>Instrument-specific checks</h3><div class="api2-note-grid">'+[
 ["Piccolo Xpress","Confirm disc/panel, analyte subset, CRP units and whether individual results are reported or calculated."],
 ["Triage MeterPro","Check TnI and D-dimer units and D-dimer FEU/DDU before choosing the API method."],
 ["Sysmex pocH-100i","Match CBC field abbreviations and verify the WBC/RBC/platelet unit scaling and differential reporting."],
 ["BioFire TORCH","Report the enrolled pathogen target with the event’s requested qualitative category; do not report unrequested targets."],
 ["Rapid HIV / POC","Choose the correct test system and result category on the event worksheet; follow the enrollment and CLIA requirements."]
 ].map(v=>'<article><strong>'+x(v[0])+'</strong><p>'+x(v[1])+'</p></article>').join('')+'</div></section>'+
 '<section class="api2-sources"><strong>Sources and verification</strong><div>'+link(url.unit,"Labcorp SI conversion table")+link(url.limits,"API out-of-range reporting")+link(url.guide,"API entry guide")+'</div></section></section>';
}
const exceptions=[
 {kind:"Important",tone:"red",title:"Retesting / repeating a PT sample",body:"Do not repeat PT to improve or confirm a grade. Test only as frequently as you would the same patient specimen using routine workflow. A repeat is appropriate only if your usual patient-testing procedure would require it; record why it occurred and preserve all results.",detail:"A step in API instructions saying “repeat steps” means repeat portal data-entry for OTHER enrolled tests, not rerun a PT sample."},
 {kind:"Prohibited",tone:"red",title:"Referral or comparison with another lab",body:"Never send PT material or PT results to a separate laboratory before the event closes, even if patient specimens would normally be referred. Do not discuss current event results with another lab. Follow the PT form’s Would refer / Test not performed choices where appropriate.",detail:"This applies to both regulated and voluntary PT programs, including waived analytes."},
 {kind:"At receiving",tone:"blue",title:"Notice of Delivery / shipment notification",body:"If the site receives a shipment notice, Notice of Delivery, or acknowledgment sheet, use it to track that the kit arrived. Check identity, counts, broken/leaking material, storage directions, stability and the deadline; record receipt and notify the program of damaged/missing kit items.",detail:"API’s public online result-entry guide does not establish a mandatory portal button called Notice of Delivery. Use a kit-specific notice only if supplied or required; it is NOT proof that results were transmitted."},
 {kind:"Signed record",tone:"amber",title:"Attestation",body:"At online submission enter the laboratory director (or designated name) and all analysts who performed testing. Transmit, then retain a signed electronic-printout or paper attestation with the event documentation.",detail:"For online submissions API says to retain the signed attestation locally, not mail it separately."},
 {kind:"Correction",tone:"purple",title:"Entry error after submission",body:"API permits unsubmission from Enter Results → Event History for up to two hours after transmission, only before the event deadline. Correct and resubmit before the deadline. After that window, contact API during business hours for guidance.",detail:"Unsubmission after two hours is not guaranteed. A post-deadline correction should not be presumed possible."},
 {kind:"Sample problem",tone:"blue",title:"Damaged, questionable or unstable sample",body:"Document receipt concerns, follow kit-specific handling instructions, and contact API for replacement or disposition instructions. In online result entry, select the Sample ID to open the test-problem comment form and mark affected analytes.",detail:"Enter factual observations and save. Do not invent a result or use zero as a placeholder."},
 {kind:"Missing result",tone:"amber",title:"Not testing an enrolled analyte",body:"If the analyzer is down, an analyte has been discontinued, or a result cannot be obtained, contact API immediately for instructions. Do not enter a zero or an unsupported result merely to complete a portal section.",detail:"Missing entries can prevent submission or lead to a failure/failure to participate."},
 {kind:"Follow-up",tone:"teal",title:"After evaluation is posted",body:"Review all results, including not-graded items and passing but discrepant data. Document director review, investigation, corrective actions, staff follow-up and accuracy verification where applicable.",detail:"CMS requires retaining the full event packet and corrective-action documents for at least two years."}
];
function exceptionsPage(){
 return '<section class="api2-page">'+
 '<header class="api2-intro"><div class="api2-overline">API · EVENT SAFETY &amp; TROUBLESHOOTING</div><h2>Rules, delivery &amp; exceptions</h2><p>High-priority compliance rules and practical steps when a shipment, instrument, sample or submission does not go as planned.</p></header>'+
 '<div class="api2-alert api2-alert-critical"><strong>No PT sample referral. No grading-driven retests.</strong><p>PT must follow the same testing procedures, personnel and frequency as patient testing. Refer questions to laboratory leadership before altering the workflow.</p></div>'+
 '<div class="api2-exception-grid">'+exceptions.map((e,i)=>'<article class="api2-exception api2-tone-'+e.tone+'"><div class="api2-ex-top">'+badge(e.kind,e.tone)+'<span>'+String(i+1).padStart(2,"0")+'</span></div><h3>'+x(e.title)+'</h3><p>'+x(e.body)+'</p><div class="api2-ex-note">'+x(e.detail)+'</div></article>').join('')+'</div>'+
 '<div class="api2-twin"><section class="api2-panel"><h3>Retain for at least two years</h3><ul class="api2-checklist"><li>Event instructions, receipt/handling notes and sample preparation</li><li>Analyzer printouts, raw results and any repeated measurements</li><li>Unit conversions, method selections and submitted worksheets</li><li>Timestamped transmission confirmation and signed attestation</li><li>API evaluation, director review and corrective-action records</li></ul></section>'+
 '<section class="api2-panel"><h3>API assistance</h3><p><strong>Technical Support:</strong> sample, reporting or evaluation concerns. <strong>Customer Service:</strong> shipment, account and website issues.</p><div class="api2-contact"><strong>800-333-0958</strong><small>API business hours, Eastern Time. Do not assume support can reopen an event after its deadline.</small></div>'+link(url.support,"API contact details")+'</section></div>'+
 '<section class="api2-sources"><strong>Official references</strong><div>'+link(url.cms,"CMS PT & referral brochure")+link(url.correction,"API correction window")+link(url.comment,"API sample problem comments")+link(url.attest,"API attestation")+'</div></section></section>';
}

window.LAB_API_SUBMISSION={submission,unitsPage,exceptionsPage,marketSelector,calverMarketSelector};
})();