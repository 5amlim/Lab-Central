/* API assessment routing and quantitative calibration verification. */
(function(){
"use strict";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
/* Current API reference: waived respiratory, former drug screen and unassigned
   coagulation PT categories are intentionally excluded from this menu. */
const map=[
 {id:"chemistry-core",title:"Chemistry Core",badge:"CH / CM / PSC",machines:[["Piccolo Xpress","piccolo"],["Triage MeterPro","triage"]],items:[
  {code:"CH",title:"Comprehensive chemistry",instrument:"Piccolo Xpress",route:"piccolo",description:"Follow the actual CH shipment. Select the prescribed Piccolo reagent disc and report only its enrolled analytes.",tests:["MetLyte + C-reactive protein","MetLac 12"]},
  {code:"CM",title:"Cardiac markers",instrument:"Triage MeterPro",route:"triage",description:"Use the enrolled cardiac marker panel and verify the assay-specific reporting units on the API event.",tests:["Cardiac troponin I","D-dimer"]},
  {code:"PSC",title:"Cardiac markers pilot",instrument:"Triage MeterPro",route:"triage",description:"Run the assigned pilot panel and report only the markers listed on the shipment sheet.",tests:["Cardiac troponin I","D-dimer"]}
 ]},
 {id:"hematology",title:"Hematology",badge:"HSY",machines:[["Sysmex pocH-100i","sysmex"]],items:[
  {code:"HSY",title:"Complete blood count",instrument:"Sysmex pocH-100i",route:"sysmex",description:"Run the hematology proficiency specimen under the correct PT identifier and report the specific enrolled CBC results.",tests:["Complete blood count","Three-part white cell differential"]}
 ]},
 {id:"microbiology",title:"Microbiology",badge:"GIP",machines:[["BioFire TORCH","torch"]],items:[
  {code:"GIP",title:"Gastrointestinal pathogens",instrument:"BioFire TORCH",route:"torch",description:"Run the assigned gastrointestinal proficiency pouch and report only pathogen targets requested by the API event.",tests:["Gastrointestinal pathogen panel"]}
 ]},
 {id:"immunology",title:"Immunology / Immunohematology",badge:"HV / CRP",machines:[["Rapid POC tests","poc"],["Piccolo Xpress","piccolo"]],items:[
  {code:"HV",title:"Rapid human immunodeficiency virus test",instrument:"Rapid POC tests",route:"poc",description:"Use the approved rapid HIV test and its enrolled proficiency instructions; confirm the test-specific reporting format.",tests:["Human immunodeficiency virus antigen / antibody"]},
  {code:"CRP",title:"C-reactive protein",instrument:"Piccolo Xpress",route:"piccolo",description:"Use the MetLyte + C-reactive protein disc and confirm reporting units, such as mg/L versus mg/dL.",tests:["C-reactive protein","MetLyte + C-reactive protein"]}
 ]}
];
function apiInstrumentLink(name,route){
 return '<a class="quality-api-instrument-link" href="#'+esc(route)+'" title="Open '+esc(name)+' instrument guide" aria-label="Open '+esc(name)+' instrument guide">'+esc(name)+' <span aria-hidden="true">↗</span></a>';
}
function apiTestBadge(test){
 return '<span class="quality-api-test-badge">'+esc(test)+'</span>';
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
   ...map.map(x=>({id:x.id,title:x.title,blocks:[
     ...step("Check the assigned program","API code: "+x.badge+". The event paperwork determines the exact analyte set and material."),
     ...x.items.map(it=>step(it.code+" · "+it.title+" · "+it.instrument,it.description+" Required test menu: "+it.tests.join(", ")+".")).flat(),
     ...step("Review and file the event","Verify units, analyzer/test identification and acceptance of submitted results; retain the event packet and any follow-up.")
   ]}))
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
    apiInstrumentLink(it.instrument,it.route)+'</div>'+
    '<p class="quality-api-assessment-desc">'+esc(it.description)+'</p>'+
    '<div class="quality-api-badge-group" aria-label="Tests or panels for '+esc(it.code)+'">'+
    it.tests.map(apiTestBadge).join('')+'</div></li>').join('')+'</ul></article>'
 ).join('')+'</div>'+
 '<div class="quality-followup"><strong>For every API event</strong><p>Use only the enrolled test system and assay list on the shipment sheet. Verify the assigned material, units and reporting method; retain submission records and corrective action documentation.</p></div></section>';
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
function visual(id,title){
 if(id!=="calver")return "";
 const lower=String(title).toLowerCase();
 if(/low verification|midpoint level|high verification/.test(lower))return '<section class="quality-step-visual"><div class="quality-step-visual-head">REPORTABLE RANGE · 3 POINTS</div>'+levelsVisual()+'</section>';
 if(/print|file in calibration/.test(lower))return '<section class="quality-step-visual quality-report"><div class="quality-step-visual-head">VERIFICATION REPORT</div><div class="quality-report-sheet"><strong>CALIBRATION VERIFICATION</strong><div>Analyzer · Lot · Date · Operator</div><div>Low &nbsp; ✓ &nbsp; Midpoint &nbsp; ✓ &nbsp; High &nbsp; ✓</div><div>Assigned value · Observed value · Limits</div><span>Reviewer approval → Calibration Verification Binder</span></div></section>';
 return "";
}
window.LAB_QUALITY_GUIDE={groups,apiOverview,calverOverview,visual};
})();