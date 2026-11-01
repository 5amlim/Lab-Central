/* API assessment routing and quantitative calibration verification. */
(function(){
"use strict";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
/* Current API reference: waived respiratory, former drug screen and unassigned
   coagulation PT categories are intentionally excluded from this menu. */
const map=[
 {id:"chemistry-core",title:"Chemistry Core",badge:"CH / CM",machines:[["Piccolo Xpress","piccolo"],["Triage MeterPro","triage"],["PATHFAST","pathfast"]],items:[
  {code:"CH",title:"Chemistry Core PT sample",instrument:"Piccolo Xpress",route:"piccolo",description:"CH identifies the chemistry proficiency sample, not a catalog number. Use the clinic-assigned MetLyte Plus CRP and MetLac 12 discs and report only enrolled analytes.",tests:["MetLyte Plus CRP","MetLac 12"]},
  {code:"CM",title:"Cardiac markers",instrument:"Triage MeterPro",route:"triage",also:[["PATHFAST","pathfast"]],description:"The CM event covers different assays by instrument. Run and report only the analytes assigned to each analyzer on the current API event. PATHFAST uses NT-proBNP, not BNP.",testGroups:[
   {instrument:"Triage MeterPro",tests:["Troponin I","D-dimer"]},
   {instrument:"PATHFAST",tests:["hs-Troponin I","D-dimer","NT-proBNP"]}
  ]},
 ]},
 {id:"hematology",title:"Hematology",badge:"HSY",machines:[["Sysmex pocH-100i","sysmex"]],items:[
  {code:"HSY",title:"Hematology - 3S PT sample",instrument:"Sysmex pocH-100i",route:"sysmex",description:"API lists Sysmex pocH-100i under Hematology - 3S (catalog 227). HSY is the specimen ID prefix; report the specific enrolled hematology parameters from the patient method.",tests:["CBC","Three-part white cell differential"]}
 ]},
 {id:"microbiology",title:"Microbiology",badge:"GIP",machines:[["BioFire TORCH","torch"]],items:[
  {code:"GIP",title:"Gastrointestinal pathogens",instrument:"BioFire TORCH",route:"torch",description:"Run the assigned gastrointestinal proficiency pouch and report only pathogen targets requested by the API event.",tests:["Gastrointestinal pathogen panel"]}
 ]},
 {id:"immunology",title:"Immunology / Immunohematology",badge:"HV / CRP",machines:[["HIV Antigen/Antibody","hiv"],["Piccolo Xpress","piccolo"]],items:[
  {code:"HV",title:"HIV antigen / antibody rapid test",instrument:"HIV Antigen/Antibody",route:"hiv",description:"Use the approved rapid HIV test and its enrolled proficiency instructions; confirm the test-specific reporting format.",tests:["HIV Antigen/Antibody"]},
  {code:"CRP",title:"C-reactive protein",instrument:"Piccolo Xpress",route:"piccolo",description:"Use the MetLyte Plus CRP disc for the separately assigned CRP sample and confirm the actual reporting units and program on the event sheet.",tests:["MetLyte + CRP"]}
 ]}
];
function apiInstrumentLink(name,route){
 return '<a class="quality-api-instrument-link" href="#'+esc(route)+'/pt-testing" title="Open '+esc(name)+' PT testing instructions" aria-label="Open '+esc(name)+' PT testing instructions">'+esc(name)+' <span aria-hidden="true">↗</span></a>';
}
function apiTestBadge(test){
 return '<span class="quality-api-test-badge">'+esc(test)+'</span>';
}
/* The CM sample serves different enrolled assay sets on Triage and PATHFAST.
   Keep each instrument's tests together in the same card, not a second CHECK card. */
function apiTestGroups(item){
 if(!item.testGroups)return '<div class="quality-api-badge-group">'+(item.tests||[]).map(apiTestBadge).join('')+'</div>';
 return '<div class="quality-pt-analyzer-tests">'+item.testGroups.map(group=>
  '<div class="quality-pt-analyzer-group">'+
   '<strong class="quality-pt-analyzer-title">'+esc(group.instrument)+'</strong>'+
   '<div class="quality-api-badge-group" aria-label="'+esc(group.instrument)+' assigned analytes">'+
    group.tests.map(apiTestBadge).join('')+'</div>'+
  '</div>'
 ).join('')+'</div>';
}
const step=(title,description)=>[{type:"list",level:1,text:title},{type:"list",level:2,text:description}];
function groups(sec){
 if(sec.id==="api"){
  return [
   {id:"pt-handling",title:"PT sample handling",blocks:[
    ...step("Identify the API event and enrolled tests","Match the event, assigned sample ID and analytes to the laboratory enrollment before opening or testing the material."),
    ...step("Prepare the correct PT material","Follow the API kit instructions for reconstitution, temperature, volume and timing. Do not assume every PT sample requires the same warm-up."),
    ...step("Run on the assigned analyzer","Use the laboratory’s approved PT processing mode and the correct instrument for the enrolled analyte. The current local guide uses Piccolo Control, Triage Misc Test, pocH as a patient-type run, and BioFire as a sample-type run; confirm the current SOP."),
    ...step("Document and submit the results","Record the PT identifier, instrument, raw result, units and any required corrective notes. Review before submitting to API within the event window."),
    ...step("Retain the event records","File the completed submission, analyzer printouts, reports and corrective action in the proficiency testing binder; do not enter a real patient MRN.")
   ]},
   {id:"pt-categories",title:"PT Categories",blocks:[]},
   {id:"submit-results",title:"Submit results",blocks:[]},
   {id:"units-reporting",title:"Units & reporting",blocks:[]},
   {id:"pt-exceptions",title:"Rules & exceptions",blocks:[]}
  ];
 }
 if(sec.id==="calver"){
  return [
   {id:"preparation",title:"Prepare verification",blocks:[
    ...step("Confirm what is due","Verify the six-month date, analyzer, panel/analyte and any maintenance/reagent/QC triggers for the next verification."),
    ...step("Choose the appropriate materials","Use approved known-value verification materials spanning a low or zero point, midpoint and high point near the reportable range limit, per assay requirements."),
    ...step("Record all starting information","Document analyzer and panel, kit lot/expiration, assigned concentrations, material reconstitution, reportable ranges and established acceptance limits.")
   ]},
   {id:"testing",title:"Run verification",blocks:[
    ...step("Run the low verification level","Process low or near-zero material under the locally approved verification protocol and correct analyzer mode."),
    ...step("Run the midpoint level","Process midpoint material in the same manner; verify traceability and specimen handling."),
    ...step("Run the high verification level","Process material near the upper end of the analyzer reportable range. Use additional points if required for the assay."),
    ...step("Complete the prescribed replicates","The previous local guide specifies three runs per level, nine runs per panel. Confirm the active procedure because CLIA itself does not universally mandate three replicates."),
    ...step("Review results against limits","For each analyte/level, compare measured to expected values using the laboratory’s accepted limits and mark pass/fail. Do not automatically release a failed test system.")
   ]},
   {id:"filing",title:"Review & document",blocks:[
    ...step("Print or export verification results","Collect all low, midpoint and high results and printouts; include the calibration verification report or worksheet."),
    ...step("Document any failure and remediation","Notify appropriate medical/lab leadership for results outside limits, take corrective action and repeat/review verification as required before reporting patient results."),
    ...step("File in calibration verification binder","Retain the completed record with date, analyzer/panel, assigned values, observed values, acceptance limits, operator review, corrective action and signature.")
   ]}
  ];
 }
 return null;
}
function apiOverview(){
 return '<section class="quality-summary quality-api-overview"><div class="quality-kicker">API · PROFICIENCY TESTING</div>'+
 '<h2>Assessment types and assigned analyzers</h2>'+
 '<p>Match the current API shipment sheet to the enrolled program. Test and panel badges below identify the expected assay menu, not a substitute for the event-specific instructions.</p>'+
 '<div class="quality-map-grid">'+map.map(x=>
  '<article class="quality-map-card"><div class="quality-map-top"><strong>'+esc(x.title)+'</strong>'+
  '<span>'+esc(x.badge)+'</span></div>'+
  '<div class="quality-api-instrument-row"><span class="quality-api-instrument-label">INSTRUMENT GUIDES</span>'+
  '<div class="quality-api-instrument-links">'+x.machines.map(m=>apiInstrumentLink(m[0],m[1])).join('')+'</div></div>'+
  '<ul class="quality-api-assessments">'+x.items.map(it=>
   '<li><div class="quality-api-assessment-head"><div class="quality-api-assessment-name">'+
    '<span class="quality-api-code">'+esc(it.code)+'</span><b>'+esc(it.title)+'</b></div>'+
    '<div class="quality-api-assessment-links">'+apiInstrumentLink(it.instrument,it.route)+(it.also||[]).map(m=>apiInstrumentLink(m[0],m[1])).join('')+'</div></div>'+
    '<p class="quality-api-assessment-desc">'+esc(it.description)+'</p>'+
    '<div class="quality-api-tests-wrap" aria-label="Tests or panels for '+esc(it.code)+'">'+
    apiTestGroups(it)+'</div></li>').join('')+'</ul></article>'
 ).join('')+'</div>'+
 '</section>';
}
function levelsVisual(){
 const vals=[["LOW","#d6edf5"],["MID","#88c9de"],["HIGH","#2b879b"]];
 return '<svg role="img" aria-label="Calibration verification materials low, midpoint and high with results compared against limits" viewBox="0 0 780 235" xmlns="http://www.w3.org/2000/svg">'+
 vals.map((v,i)=>{const x=90+i*212;return '<g><ellipse cx="'+(x+52)+'" cy="199" rx="42" ry="7" fill="#e2edf1"/><rect x="'+(x+27)+'" y="47" width="51" height="149" rx="13" fill="#f4f9fc" stroke="#93b5c1" stroke-width="3"/><path d="M'+(x+31)+' '+(118-i*18)+'h43v58q-22 21-43 0Z" fill="'+v[1]+'"/><rect x="'+(x+23)+'" y="35" width="59" height="31" rx="7" fill="#5b91a8" stroke="#66899d" stroke-width="2"/><rect x="'+(x+35)+'" y="96" width="36" height="34" rx="5" fill="#fff" stroke="#d5e5eb"/><text x="'+(x+53)+'" y="116" font-family="Arial" text-anchor="middle" fill="#467588" font-weight="800" font-size="10">'+v[0]+'</text><text x="'+(x+53)+'" y="223" font-family="Arial" text-anchor="middle" fill="#3d6f86" font-weight="850" font-size="14">'+v[0]+'</text></g>';}).join('')+
 '<path d="M700 65h43v120h-43" stroke="#9bbdcc" stroke-width="4" fill="none"/><circle cx="723" cy="127" r="19" fill="#dcf3ed" stroke="#409c83" stroke-width="3"/><path d="M713 127l8 8 14-17" fill="none" stroke="#278d74" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+
 '</svg>';
}
function calverOverview(){
 return '<section class="quality-summary"><div class="quality-kicker">CLIA · CALIBRATION VERIFICATION</div><h2>Confirm the reportable range</h2><p>Verify performance throughout the assay’s reportable range using known-value material. Routine QC and calibration verification serve different purposes.</p>'+
 '<div class="quality-cal-visual"><div>'+levelsVisual()+'</div><div class="quality-cal-action"><span>REQUIRED COVERAGE</span><strong>Low + Midpoint + High</strong><p>Additional levels or replicates may be required by the approved manufacturer/SOP.</p></div></div>'+
 '<div class="quality-cal-summary"><article><span>FREQUENCY</span><strong>At least every 6 months</strong><p>Also repeat when required by applicable maintenance, reagent changes, unresolved QC shifts or established policy.</p></article>'+
 '<article><span>PICCOLO XPRESS</span><strong>MetLac 12 / MetLyte + CRP</strong><p>Confirm which chemistry analytes are included on the site’s verification plan.</p></article>'+
 '<article><span>TRIAGE METERPRO</span><strong>Troponin I / D-dimer</strong><p>Use the correct quantitative assay material and units.</p></article></div>'+
 '<div class="quality-followup"><strong>Before returning to testing</strong><p>Compare each result with predefined acceptability limits, document out-of-limit findings and have the appropriate reviewer approve the verification. The former local guide specified three replicates per level; follow your currently approved procedure.</p></div></section>';
}


/* API PT categories are included below the sample-handling reference.
   Keep the selection within the portal without requiring navigation or a page reload. */
let selectedPtCategory="chemistry-core";
function setPtCategory(id){
 if(map.some(category=>category.id===id))selectedPtCategory=id;
}
function ptCategoriesContent(){
 const category=map.find(item=>item.id===selectedPtCategory)||map[0];
 const details=category.items.map(function(it){
  return '<article class="quality-pt-assay-card">'+
    '<div class="quality-pt-assay-top"><span class="quality-api-code">'+esc(it.code)+'</span>'+
      '<h4>'+esc(it.title)+'</h4><div class="quality-pt-card-links">'+apiInstrumentLink(it.instrument,it.route)+(it.also||[]).map(m=>apiInstrumentLink(m[0],m[1])).join('')+'</div></div>'+
    '<p>'+esc(it.description)+'</p>'+
    '<div class="quality-pt-assay-foot"><span class="quality-pt-card-label">'+(it.testGroups?'TESTS BY ANALYZER':'ENROLLED TEST REFERENCE')+'</span>'+
      apiTestGroups(it)+'</div>'+
   '</article>';
 }).join('');
 return '<section class="quality-pt-category-detail" aria-label="'+esc(category.title)+' PT reference">'+
  '<header class="quality-pt-category-head"><div><span class="quality-pt-eyebrow">SELECTED PT CATEGORY</span><h3>'+esc(category.title)+'</h3><p>Check the shipment instructions before running or reporting these enrolled assays.</p></div>'+
    '<span class="quality-pt-program-badge" title="Program codes for reference; verify the active event">'+esc(category.badge)+'</span></header>'+

  '<div class="quality-pt-assay-grid">'+details+'</div>'+
  '<div class="quality-pt-category-actions"><span>Only the assays on the active event are reportable.</span><div><button type="button" data-gotab="submit-results">Submit results →</button><button type="button" data-gotab="units-reporting">Reporting units →</button></div></div>'+
 '</section>';
}
function ptCategoriesReference(){
 const selected=map.find(item=>item.id===selectedPtCategory)||map[0];
 const options=map.map(item=>
  '<button type="button" class="quality-pt-option'+(item.id===selected.id?' is-selected':'')+'" data-api-pt-category="'+esc(item.id)+'" aria-current="'+(item.id===selected.id?'true':'false')+'">'+
   '<span>'+esc(item.title)+'</span><small>'+esc(item.badge)+'</small>'+
  '</button>'
 ).join('');
 return '<section class="quality-ref quality-pt-categories" aria-label="PT category reference">'+
  '<header class="quality-ref-head quality-pt-categories-head"><span>PROGRAM REFERENCE</span><h2>PT categories</h2><p>Select the category from your shipment sheet to see sample codes, enrolled test references and instrument guides.</p></header>'+
  '<div class="quality-pt-select-row"><div class="quality-pt-select-label"><strong>PT CATEGORY</strong><span>Choose one of the four program groups</span></div>'+
    '<details class="quality-pt-selector"><summary aria-label="Select a proficiency testing category"><span class="quality-pt-selector-title">'+esc(selected.title)+'</span><small>'+esc(selected.badge)+'</small><span class="quality-pt-chevron" aria-hidden="true"></span></summary>'+
      '<div class="quality-pt-menu" role="group" aria-label="Available PT categories">'+options+'</div>'+
    '</details></div>'+
  '<div class="quality-pt-current">'+ptCategoriesContent()+'</div>'+
  '<p class="quality-pt-event-note">Reference only. Confirm enrollment, instrument, specimen code and reporting units against the current API event.</p>'+
 '</section>';
}
document.addEventListener('click',function(event){
 const button=event.target.closest('[data-api-pt-category]');
 if(!button)return;
 const section=button.closest('.quality-pt-categories');
 if(!section)return;
 const next=button.getAttribute('data-api-pt-category');
 if(!map.some(item=>item.id===next))return;
 setPtCategory(next);
 section.outerHTML=ptCategoriesReference();
 const picker=document.querySelector('.quality-pt-categories .quality-pt-selector summary');
 if(picker)picker.focus({preventScroll:true});
});

/* API PT sample handling is a reference checklist, not a guided procedure.
   Show all five topics together without the stepper, toggle or progress controls. */
function ptHandlingReference(group){
 const topics=[];
 for(const b of group.blocks||[]){
  if(b.type!=="list")continue;
  if(b.level===1)topics.push({title:b.text,details:[]});
  else if(b.level===2&&topics.length)topics[topics.length-1].details.push(b.text);
 }
 const sections=[
  {title:"Before testing",subtitle:"Confirm the event and prepare the material",steps:topics.slice(0,2)},
  {title:"Run the assigned test",subtitle:"Use the approved analyzer and method",steps:topics.slice(2,3)},
  {title:"After testing",subtitle:"Report, verify and retain the records",steps:topics.slice(3,5)}
 ];
 let counter=0;
 return '<section class="quality-ref quality-pt-reference" aria-label="PT sample handling reference">'+
  '<header class="quality-ref-head quality-pt-handling-head"><span>API · PROFICIENCY TESTING</span><h2>PT sample handling</h2><p>Follow the current event instructions from receipt through testing and documentation.</p></header>'+
  '<div class="quality-pt-handling-phases">'+sections.map((phase,i)=>
   '<section class="quality-pt-handling-phase" aria-label="'+esc(phase.title)+'">'+
    '<header class="quality-pt-handling-phase-head"><span>'+String(i+1).padStart(2,"0")+'</span><div><h3>'+esc(phase.title)+'</h3><p>'+esc(phase.subtitle)+'</p></div></header>'+
    '<div class="quality-pt-handling-items">'+phase.steps.map(item=>{
      const n=++counter;
      return '<div class="quality-pt-handling-item"><span>'+String(n).padStart(2,"0")+'</span><div><strong>'+esc(item.title)+'</strong>'+
       item.details.map(d=>'<p>'+esc(d)+'</p>').join("")+'</div></div>';
    }).join("")+'</div></section>'
  ).join("")+'</div>'+
  '</section>'+ptCategoriesReference();
}

/* Calibration verification is a reference checklist, not a click-through
   instrument procedure. Keep its separate Overview unchanged. */
function calverReference(group){
 const meta={
  preparation:{eyebrow:"BEFORE TESTING",summary:"Confirm the verification is due, gather the approved materials, and document the starting conditions."},
  testing:{eyebrow:"VERIFICATION RUN",summary:"Work from low through midpoint and high using the active analyzer-specific procedure and documented limits."},
  filing:{eyebrow:"RESULT REVIEW",summary:"Retain the measured values, acceptance decisions and documented review in one traceable record."}
 };
 const info=meta[group.id];if(!info)return "";
 const steps=[];
 for(const b of group.blocks||[]){
  if(b.type!=="list")continue;
  if(b.level===1)steps.push({title:b.text,details:[]});
  else if(b.level===2&&steps.length)steps[steps.length-1].details.push(b.text);
 }
 const cards=steps.map((item,i)=>'<article class="quality-ref-card"><div class="quality-ref-card-head"><span class="quality-ref-number">'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(item.title)+'</h3></div>'+item.details.map(d=>'<p>'+esc(d)+'</p>').join("")+'</article>').join("");
 const reporting=group.id==="filing"?
 '<div class="quality-ref-art-grid" aria-label="Illustrative verification documentation">'+
 '<figure class="quality-ref-art"><figcaption>Verification points across the reportable range</figcaption>'+levelsVisual()+'<small>Illustrative low, midpoint, and high levels. Assay-specific required concentrations and replicates come from the approved protocol.</small></figure>'+
 '<figure class="quality-ref-art"><figcaption>Suggested verification record layout</figcaption><div class="quality-ref-sheet"><strong>CALIBRATION VERIFICATION</strong><div class="quality-ref-sheet-meta">Analyzer / panel <span>Lot / date / operator</span></div><div class="quality-ref-sheet-row"><b>Level</b><b>Assigned</b><b>Observed</b><b>Limits</b><b>Pass / fail</b></div>'+["LOW","MID","HIGH"].map(x=>'<div class="quality-ref-sheet-row"><span>'+x+'</span><span>____</span><span>____</span><span>____</span><span>____</span></div>').join("")+'<div class="quality-ref-sheet-sign">Corrective action / reviewer signature / date</div></div><small>Reference only. Use the approved analyzer-specific worksheet and record actual results.</small></figure>'+
 '</div>':"";
 return '<section class="quality-ref" aria-label="'+esc(group.title)+' checklist">'+
  '<header class="quality-ref-head"><span>'+esc(info.eyebrow)+'</span><h2>'+esc(group.title)+'</h2><p>'+esc(info.summary)+'</p></header>'+
  '<div class="quality-ref-grid">'+cards+'</div>'+
  reporting+
  '<div class="quality-ref-footer"><strong>Before completing:</strong> Follow the current approved analyzer-specific protocol, manufacturer instructions, established acceptance limits and laboratory review requirements.</div>'+
 '</section>';
}

function visual(id,title){
 if(id!=="calver")return "";
 const lower=String(title).toLowerCase();
 if(/low verification|midpoint level|high verification/.test(lower))return '<section class="quality-step-visual"><div class="quality-step-visual-head">REPORTABLE RANGE · 3 POINTS</div>'+levelsVisual()+'</section>';
 if(/print|file in calibration/.test(lower))return '<section class="quality-step-visual quality-report"><div class="quality-step-visual-head">VERIFICATION REPORT</div><div class="quality-report-sheet"><strong>CALIBRATION VERIFICATION</strong><div>Analyzer · Lot · Date · Operator</div><div>Low &nbsp; ✓ &nbsp; Midpoint &nbsp; ✓ &nbsp; High &nbsp; ✓</div><div>Assigned value · Observed value · Limits</div><span>Reviewer approval → Calibration Verification Binder</span></div></section>';
 return "";
}
window.LAB_QUALITY_GUIDE={groups,apiOverview,calverOverview,calverReference,ptHandlingReference,ptCategoriesReference,setPtCategory,visual};
})();