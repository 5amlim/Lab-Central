/* API assessment routing and quantitative calibration verification. */
(function(){
"use strict";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const map=[
 {id:"chemistry-core",title:"Chemistry Core",badge:"CH / CM / PSC",machine:"Piccolo Xpress + Triage MeterPro",items:[
  ["Comprehensive chemistry · CH","Piccolo Xpress","MetLyte + CRP / MetLac 12 as specified on the API kit"],
  ["Cardiac markers · CM","Triage MeterPro","Troponin I and D-dimer on the enrolled panel"],
  ["Cardiac markers pilot · PSC","Triage MeterPro","Assigned pilot troponin I and D-dimer materials"]
 ]},
 {id:"chemistry-miscellaneous",title:"Chemistry Miscellaneous",badge:"UDS",machine:"Assigned drug-screen platform",items:[
  ["Urine drug screen · UDS","Only a currently validated and enrolled drug-screen platform","Confirm whether this assessment is currently enrolled and use only its separately approved and validated drug-screen method."]
 ]},
 {id:"hematology-coagulation",title:"Hematology / Coagulation",badge:"HSY",machine:"Sysmex pocH-100i",items:[
  ["Hematology · CBC (HSY)","Sysmex pocH-100i","CBC proficiency specimen; run under the correct PT identifier per analyzer SOP"],
  ["Coagulation","Only the enrolled and approved instrument","Do not assume the CBC sample also covers coagulation. Check the actual event assignment"]
 ]},
 {id:"microbiology",title:"Microbiology",badge:"GIP / RSP",machine:"BioFire TORCH / SPOTFIRE",items:[
  ["GI pathogens · GIP","BioFire TORCH","GI proficiency panel / pouch material specified by the provider"],
  ["Respiratory pathogens · RSP","BioFire SPOTFIRE or site-approved BioFire platform","Assigned respiratory proficiency material and applicable pouch"]
 ]},
 {id:"immunology",title:"Immunology / Immunohematology",badge:"HV / CRP",machine:"Rapid HIV test / Piccolo",items:[
  ["Rapid HIV · HV","Assigned rapid HIV test","Use the enrolled rapid test and its approved proficiency instructions"],
  ["C-reactive protein · CRP","Piccolo Xpress","MetLyte + CRP disc; confirm the reporting units, e.g. mg/L vs mg/dL"]
 ]}
];
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
     ...x.items.map(it=>step(it[0]+" · "+it[1],it[2])).flat(),
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
 return '<section class="quality-summary"><div class="quality-kicker">API · PROFICIENCY TESTING</div><h2>Assessment types and assigned analyzers</h2><p>Choose the assessment listed on the API shipment sheet. The exact enrolled analytes, material, method and reporting units govern each event.</p>'+
 '<div class="quality-map-grid">'+map.map(x=>'<article class="quality-map-card"><div class="quality-map-top"><strong>'+esc(x.title)+'</strong><span>'+esc(x.badge)+'</span></div><p class="quality-map-device">Instrument: '+esc(x.machine)+'</p><ul>'+x.items.map(it=>'<li><b>'+esc(it[0])+'</b><span>'+esc(it[1])+'</span><small>'+esc(it[2])+'</small></li>').join("")+'</ul></article>').join("")+'</div>'+
 '<div class="quality-followup"><strong>For every event</strong><p>Use only the enrolled device and the instructions shipped with the program. Retain the submitted report, run records and corrective action documentation.</p></div></section>';
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