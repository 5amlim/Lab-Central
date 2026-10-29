/* PATHFAST nursing specimen collection and provider pathway references */
(function(){
"use strict";
function tube(){
return '<svg class="pcr-tube-svg" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Green-top lithium-heparin collection tube and immediate gentle inversion">'+
'<defs><linearGradient id="pcrglass" x1="0" x2="1"><stop stop-color="#c3e0e6"/><stop offset=".5" stop-color="#faffff"/><stop offset="1" stop-color="#b7d7df"/></linearGradient></defs>'+
'<g transform="translate(80,10) translate(80,0) scale(.73,1) translate(-80,0)"><rect x="44" y="2" width="72" height="35" rx="10" fill="#16885b" stroke="#0c6a4a" stroke-width="3"/>'+
'<path d="M48 35 H112 L108 195 Q82 225 53 195Z" fill="url(#pcrglass)" stroke="#8badba" stroke-width="3"/>'+
'<path d="M56 116 H105 L103 193 Q82 210 58 193Z" fill="#b74b5a" opacity=".84"/>'+
'<rect x="56" y="69" width="48" height="52" rx="4" fill="#fff" stroke="#a4bfcb"/>'+
'<text x="80" y="87" font-size="11" text-anchor="middle" fill="#237558" font-weight="900">LITHIUM</text>'+
'<text x="80" y="102" font-size="11" text-anchor="middle" fill="#237558" font-weight="900">HEPARIN</text>'+
'<text x="80" y="114" font-size="8" text-anchor="middle" fill="#537c76">GREEN TOP</text></g>'+
'<path d="M283 61 Q339 22 366 84" fill="none" stroke="#259b80" stroke-width="7" stroke-linecap="round"/>'+
'<path d="M345 75 L368 95 L380 69" fill="none" stroke="#259b80" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'+
'<g transform="translate(298,120) rotate(150,26,48) scale(.75,1)"><rect x="0" y="0" width="55" height="27" rx="8" fill="#168b5f"/>'+
'<path d="M5 27 H50 L47 103 Q28 117 8 103Z" fill="url(#pcrglass)" stroke="#8ab6c2" stroke-width="2"/>'+
'<path d="M6 31 H49 L47 59 H8Z" fill="#cc6670" opacity=".91"/></g>'+
'<text x="329" y="241" font-size="11" font-weight="850" text-anchor="middle" fill="#237f6c">Gently invert 8–10×</text>'+
'</svg>';
}
/* Nurse collection uses the same numbered, previous/next guided control as instrument procedures.
   Group related actions instead of stacking six independent cards. */
let rnStep=0,rnAllSteps=false;
const rnSteps=[
 {name:"Confirm the 0/1-hour pathway",text:"Use the 0/1-hour PATHFAST hs-Troponin I pathway as the standard collection workflow. The 0/2-hour pathway is a fallback only if the approved 1-hour collection window is missed and the provider authorizes the switch."},
 {name:"Collect, label and gently invert",text:"Collect lithium-heparin whole blood, document the exact baseline collection date and time, and gently invert 8–10 times immediately. Do not shake or leave the tube unmixed. Keep serial sample types consistent."},
 {name:"Handoff and start the timer",text:"Give the properly labeled tube to the lab tech promptly. Start the 60-minute timer from the FIRST DRAW, not from the result time. Collect the 1-hour repeat in the approved window. The +15-minute allowance is only valid when authorized under the assay-specific local protocol. Never collect early."},
 {name:"Repeat and document",text:"At the approved 1-hour repeat time, use the same specimen type, gently invert, and document the actual draw time. If the approved collection window is missed, notify the provider and use the 2-hour pathway only when authorized. Do not treat a late 1-hour sample as an in-window 1-hour delta."}
];
function rnGuide(){
 const count=rnSteps.length,number=rnStep+1;
 const buttons=rnSteps.map((step,i)=>'<button type="button" class="guide-step-pill" data-pcr-rn-step="'+i+'" aria-label="Go to RN collection step '+(i+1)+': '+step.name+'" '+(!rnAllSteps&&i===rnStep?'aria-current="step"':'')+'><span class="guide-pill-number">'+String(i+1).padStart(2,"0")+'</span><span class="guide-pill-label">'+step.name+'</span></button>').join('');
 const articles=rnSteps.map((step,i)=>'<article class="pcr-step pcr-rn-step" '+(!rnAllSteps&&i!==rnStep?'hidden ':'')+'aria-label="RN collection step '+(i+1)+' of '+count+'"><span class="pcr-step-index">'+String(i+1).padStart(2,"0")+'</span><div><h3>'+step.name+'</h3><p>'+step.text+'</p></div></article>').join('');
 let h='<section class="pcr-rn-guide procedure-flow" aria-label="RN collection step-by-step procedure">'+
 '<div class="guide-toolbar"><div class="guide-toolbar-info"><span class="guide-toolbar-dot" aria-hidden="true"></span><span>'+count+' steps · '+(rnAllSteps?'Complete procedure':'Focused step view')+'</span></div>'+
 '<div class="guide-mode-switch" role="group" aria-label="RN workflow display mode"><button type="button" data-pcr-rn-mode="guided" aria-pressed="'+(!rnAllSteps)+'">Guided view</button><button type="button" data-pcr-rn-mode="all" aria-pressed="'+rnAllSteps+'">All steps</button></div></div>'+
 '<div class="guide-stepper" role="group" aria-label="Go directly to an RN collection step">'+buttons+'</div>';
 if(!rnAllSteps)h+='<div class="guide-progress" role="progressbar" aria-label="RN steps viewed" aria-valuemin="0" aria-valuemax="'+count+'" aria-valuenow="'+number+'"><span style="width:'+(number/count*100)+'%"></span></div>';
 h+='<div class="pcr-rn-step-content">'+articles+'</div>';
 if(!rnAllSteps){
  h+='<div class="guide-bottom"><span class="guide-step-count">'+number+' / '+count+' main steps</span><div class="guide-transport">'+
  '<button type="button" class="guide-button" data-pcr-rn-step="'+(rnStep-1)+'" '+(rnStep===0?'disabled ':'')+'aria-label="Previous RN collection step">← Previous</button>'+
  (rnStep<count-1?'<button type="button" class="guide-button primary" data-pcr-rn-step="'+(rnStep+1)+'" aria-label="Next RN collection step">Next step →</button>':
  '<button type="button" class="guide-button primary" data-pcr-rn-mode="all">View all steps ↗</button>')+
  '</div></div>';
 }
 return h+'</section>';
}
if(typeof document!=="undefined"&&typeof document.addEventListener==="function"){
 document.addEventListener("click",function(ev){
  const button=ev.target.closest("[data-pcr-rn-step],[data-pcr-rn-mode]");
  if(!button||!button.closest(".pcr-rn-guide"))return;
  if(button.disabled)return;
  if(button.hasAttribute("data-pcr-rn-step")){
   const next=Number(button.getAttribute("data-pcr-rn-step"));
   if(!Number.isInteger(next)||next<0||next>=rnSteps.length)return;
   rnStep=next;rnAllSteps=false;
  }else{
   const mode=button.getAttribute("data-pcr-rn-mode");
   if(mode!=="all"&&mode!=="guided")return;
   rnAllSteps=mode==="all";
  }
  const old=document.querySelector(".pcr-rn-guide");
  if(old){old.outerHTML=rnGuide();const fresh=document.querySelector(".pcr-rn-guide");if(fresh&&typeof fresh.scrollIntoView==="function")fresh.scrollIntoView({behavior:"smooth",block:"start"});}
 });
}
function collection(){
return '<section class="pcr-guide"><div class="pcr-heading"><div><span class="pcr-eyebrow">PATHFAST / NURSING COLLECTION</span>'+
'<h2>Collection and serial troponin timing</h2><p>Specimen mixing and the actual collection time determine whether a serial troponin delta is interpretable.</p></div><span class="pcr-role-label">RN</span></div>'+
'<div class="pcr-specimen"><div class="pcr-specimen-picture">'+tube()+'</div><div class="pcr-specimen-checklist">'+
'<div><span>01</span><strong>Use lithium-heparin green top</strong><p>Whole blood. Keep specimen type consistent between serial tests.</p></div>'+
'<div><span>02</span><strong>Immediately invert gently 8–10 times</strong><p>Do not shake or delay mixing. Improper mixing can form microclots and fibrin.</p></div>'+
'<div><span>03</span><strong>Label the actual collection time</strong><p>Document identifiers, date and draw time. The clock starts at the first draw, not when the test starts or finishes.</p></div>'+
'</div></div>'+
'<div class="pcr-warning"><strong>Microclots can cause inaccurate results</strong><p>Send promptly, avoid heat, and gently remix before testing. Unexpected elevations possibly affected by microclots or fibrin must be reviewed with the provider. Use the same-tube plasma interference check below before assuming the result is false. The PATHFAST Quick Guide specifies testing within 4 hours of collection.</p></div>'+
'<h3 class="pcr-section-title">RN collection workflow</h3>'+rnGuide()+
'<h3 class="pcr-section-title">Serial collection clock</h3><div class="pcr-timing-panel">'+
window.LAB_PATHFAST_EXTRAS.baselinePicker()+
window.LAB_PATHFAST_EXTRAS.timing()+'</div>'+

'<details class="pcr-accordion" open><summary>Collection from existing IV lines and other precautions <span class="pcr-summary-actions"><span class="pcr-waste-summary-badge">1 TUBE WASTE</span><span class="lab-shared-chevron" aria-hidden="true"></span></span></summary><div>'+
'<p>Prefer fresh venipuncture for repeat troponins when feasible and follow approved line-draw policy. <strong>For an existing IV line, follow the one-full-tube waste instruction below.</strong></p>'+
'<div class="pcr-line-waste-alert" role="note">'+
'<svg class="pcr-line-waste-icon" viewBox="0 0 100 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One sample tube marked for discard">'+
'<rect x="25" y="6" width="48" height="20" rx="6" fill="#b0c4cb" stroke="#728d99" stroke-width="2"/>'+
'<path d="M29 24h40l-4 62q-16 18-32 0z" fill="#f2fafb" stroke="#9aafb9" stroke-width="3"/>'+
'<path d="M35 58h28l-2 27q-12 12-24 0z" fill="#c76d7b" opacity=".76"/>'+
'<path d="M22 39l52 52m0-52L22 91" stroke="#ba4b43" stroke-width="6" stroke-linecap="round"/>'+
'<text x="49" y="108" fill="#7b4b41" font-size="12" font-family="Arial" font-weight="800" text-anchor="middle">DISCARD</text></svg>'+
'<div><span>EXISTING IV LINE ONLY</span><strong>WASTE 1 FULL TUBE (5 mL)</strong>'+
'<p>Before collecting the troponin specimen through an existing IV line, discard one full tube per the local line-draw SOP. Confirm this requirement for the specific access device and current policy. Fresh venipuncture is preferred when feasible.</p></div></div>'+
'<p>Hemolysis may be tolerated by PATHFAST, but visible or suspected microclots can compromise results. Use the original suspect lithium-heparin tube for the analytical plasma retest below. A fresh draw may be needed separately for clinical reasons.</p></div></details>'+
'<div class="pcr-tech-note"><strong>Lab tech processing</strong><p>Gently remix before cartridge loading. Inspect the sample appearance for visible clots or fibrin and follow the specimen-acceptability SOP. Verify patient ID, lane, QC/calibration status and specimen integrity. The one-page guide lists 100 µL per cartridge and approximately 17 minutes per run. Follow the assay IFU.</p></div>'+
window.LAB_PATHFAST_EXTRAS.interference()+
'<p class="pcr-foot">References: PATHFAST Clinic One-Page Guide; Quick Guide; Competency Quiz, PATHFAST assay IFU and cardiac troponin interference literature. The routine collection pathway is 0/1 hour; the provider must authorize any switch after a missed collection window.</p></section>';
}
function referenceRow(title,subtitle,criteria,kind){
 return '<article class="pcr-criteria-row '+kind+'">'+
 '<div class="pcr-criteria-label"><span class="pcr-criteria-marker" aria-hidden="true"></span>'+
 '<div><strong>'+title+'</strong><small>'+subtitle+'</small></div></div>'+
 '<ul class="pcr-criteria-list">'+criteria.map(function(item){return '<li>'+item+'</li>';}).join('')+'</ul></article>';
}
function routeBranch(value,note,kind){
 return '<article class="pcr-route-branch '+kind+'"><span class="pcr-route-caption">INITIAL hs-TnI</span>'+
 '<strong>'+value+'</strong><p>'+note+'</p></article>';
}
function pathway(){
 return '<section class="pcr-guide"><div class="pcr-heading"><div><span class="pcr-eyebrow">PATHFAST / PROVIDER REFERENCE</span><h2>hs-Troponin I · 0/1-hour pathway</h2>'+
 '<p>Use the approved 0/1-hour serial hs-Troponin I pathway for routine testing. Switch to the 0/2-hour fallback only after the approved 1-hour collection window is missed and the provider authorizes the change.</p></div><span class="pcr-role-label provider">Provider</span></div>'+
 '<div class="pcr-review-strip"><span class="pcr-review-icon" aria-hidden="true">!</span><div><strong>Medical protocol verification required</strong><p>The source references contain differing thresholds. Confirm the approved assay-specific pathway before clinical decisions.</p><details class="pcr-review-detail"><summary>See threshold discrepancies</summary><p>References differ on 1-hour delta <b>&gt;3 versus ≥3 ng/L</b> and low-value rule-out conditions. The one-page guide states a 99th-percentile reference of 29 ng/L, while this pathway shows 21.4 ng/L (F) and 29.8 ng/L (M). Medical leadership must reconcile these differences before clinical use.</p></details></div></div>'+
 window.LAB_PATHFAST_EXTRAS.flow()+
 '<details class="pcr-reference-accordion" data-print-open><summary><span class="pcr-reference-summary-icon" aria-hidden="true">▤</span><span><strong>Clinical reference charts</strong><small>Assay thresholds and timed pathways</small></span><span class="pcr-reference-chevron" aria-hidden="true"></span></summary>'+
 '<div class="pcr-reference-content pcr-compact-reference">'+
 '<header class="pcr-reference-subheading"><div><span class="pcr-eyebrow">RESULT INTERPRETATION</span><h3>0/1-hour reference criteria</h3></div><span class="pcr-reference-static">Reference only</span></header>'+
 '<div class="pcr-criteria-table" aria-label="One-hour troponin reference criteria">'+
 referenceRow("Rule-out","Low-risk review",[
  "Initial hs-TnI <b>&lt;4 ng/L</b>",
  "1-hour delta <b>&lt;3 ng/L</b>",
  "HEART ≤3 and reassuring ECG"
 ],"ruleout")+
 referenceRow("Consider discharge","Follow-up review",[
  "Initial hs-TnI <b>≥4 ng/L</b> with 1-hour delta <b>&lt;3 ng/L</b>",
  "Total below <b>21.4 ng/L (F)</b> or <b>29.8 ng/L (M)</b>",
  "HEART ≤3 and cardiology follow-up within 48–72 hours; may repeat 2-hour troponin"
 ],"consider")+
 referenceRow("Observe / consult","Further assessment",[
  "1-hour delta <b>&gt;3 and &lt;20 ng/L</b> with total &lt;90 ng/L",
  "Or total above the sex-specific threshold but &lt;90 ng/L, or HEART &gt;3",
  "Real-time cardiology consult, risk stratification or transfer"
 ],"observe")+
 referenceRow("Rule-in / transfer","Urgent escalation",[
  "Initial hs-TnI <b>≥90 ng/L</b>",
  "Or 1-hour delta <b>≥20 ng/L</b>",
  "Or 1-hour total <b>≥90 ng/L</b>: transfer"
 ],"transfer")+
 '</div>'+
 '<div class="pcr-2h-reference"><span class="pcr-eyebrow">0/2-HOUR SERIAL PATHWAY</span><h3>2-hour high-sensitivity troponin I</h3><p>If the approved 1-hour window is missed and the provider authorizes the 0/2-hour fallback, collect the repeat at 120 minutes from the baseline within the approved 2-hour collection window. Interpret the actual value and delta against the approved PATHFAST-specific 0/2-hour limits, not one-hour thresholds.</p><div class="pcr-2h-route"><span><b>0 h</b> Baseline hs-Troponin I</span><b class="pcr-2h-arrow" aria-hidden="true">→</b><span><b>2 h</b> Timed repeat + assay-specific delta</span><b class="pcr-2h-arrow" aria-hidden="true">→</b><span><b>Provider</b> Rule-out / observation / urgent review</span></div></div>'+
'<header class="pcr-reference-subheading pcr-route-heading"><div><span class="pcr-eyebrow">INITIAL RESULT</span><h3>Where the 0-hour result leads</h3></div><span class="pcr-reference-static">Provider assessment</span></header>'+
 '<div class="pcr-simple-map" aria-label="Initial troponin routing overview">'+
 '<div class="pcr-route-start"><span class="pcr-route-start-icon" aria-hidden="true">●</span><div><strong>Chest pain presentation</strong><small>Initial hs-TnI (0 hour) + ECG</small></div></div>'+
 '<div class="pcr-route-connector" aria-hidden="true"><span>↓</span></div>'+
 '<div class="pcr-route-branches">'+
 routeBranch("&lt;4 ng/L","Assess symptom onset and HEART score. Onset &gt;3 hours with HEART ≤3 may support provider-directed discharge; for onset ≤3 hours, use 1-hour repeat pathway.","ruleout")+
 routeBranch("4 to &lt;90 ng/L","Obtain the 1-hour repeat and review delta, total, ECG and HEART score.","observe")+
 routeBranch("≥90 ng/L","Source pathway identifies rule-in / ED transfer for ACS or NSTEMI assessment.","transfer")+
 '</div></div>'+
 '<div class="pcr-reference-endnote"><strong>For clinical interpretation:</strong> Assess the ECG, symptoms, HEART score, actual serial sampling times, assay units, and results together. Elevated troponin can indicate myocardial injury without establishing MI. PATHFAST high-sensitivity troponin and conventional Triage values should not be directly trended.</div>'+
 '<p class="pcr-foot">References: “Step 4: interpret the 1-hour result”, “Primary Option: hs-TnI 0/1-Hour Chest Pain Pathway”, and PATHFAST Clinic One-Page Guide. Provider use only; verify the approved protocol.</p>'+
 '</div></details></section>';
}
if(typeof window!=='undefined'&&typeof window.addEventListener==='function'&&typeof document!=='undefined'){
 let printState=[];
 window.addEventListener('beforeprint',function(){printState=Array.from(document.querySelectorAll('.pcr-reference-accordion, .pcr-review-detail')).map(function(node){return {node:node,open:node.open};});printState.forEach(function(item){item.node.open=true;});});
 window.addEventListener('afterprint',function(){printState.forEach(function(item){item.node.open=item.open;});printState=[];});
}
window.LAB_PATHFAST_CLINICAL={collection:collection,pathway:pathway};
})();