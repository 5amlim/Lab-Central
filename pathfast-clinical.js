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
 {name:"Handoff and start the timer",text:"Give the properly labeled tube to the lab tech promptly. Start the 60-minute timer from the FIRST DRAW, not from the result time. Collect the 1-hour repeat within 50–75 minutes of the first draw (10 minutes early to 15 minutes late), as permitted by the approved local protocol. The 60-minute target remains preferred. Do not collect before 50 minutes."},
 {name:"Repeat and document",text:"At the approved 1-hour repeat time, use the same specimen type, gently invert, and document the actual draw time. If the 50–75-minute collection window is missed, notify the provider and use the 2-hour pathway only when authorized. Do not treat a late 1-hour sample as an in-window 1-hour delta."}
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

'<div class="pcr-line-waste-alert" role="note">'+
'<svg class="pcr-line-waste-icon" viewBox="0 0 100 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One sample tube marked for discard">'+
'<rect x="25" y="6" width="48" height="20" rx="6" fill="#b0c4cb" stroke="#728d99" stroke-width="2"/>'+
'<path d="M29 24h40l-4 62q-16 18-32 0z" fill="#f2fafb" stroke="#9aafb9" stroke-width="3"/>'+
'<path d="M35 58h28l-2 27q-12 12-24 0z" fill="#c76d7b" opacity=".76"/>'+
'<path d="M22 39l52 52m0-52L22 91" stroke="#ba4b43" stroke-width="6" stroke-linecap="round"/>'+
'<text x="49" y="108" fill="#7b4b41" font-size="12" font-family="Arial" font-weight="800" text-anchor="middle">DISCARD</text></svg>'+
'<div class="pcr-line-waste-body"><div class="pcr-line-waste-head"><span>EXISTING IV LINE ONLY</span><span class="pcr-line-waste-container-badge">SUGGESTED WASTE: RED TOP · SST · 5 cc SYRINGE</span></div><strong>WASTE 1 FULL TUBE (5 mL)</strong>'+
'<p>Before collecting the troponin specimen through an existing IV line, discard one full tube per the local line-draw SOP. Confirm this requirement for the specific access device and current policy. Fresh venipuncture is preferred when feasible.</p></div></div>'+
'<p>Hemolysis may be tolerated by PATHFAST, but visible or suspected microclots can compromise results. Use the original suspect lithium-heparin tube for the analytical plasma retest below. A fresh draw may be needed separately for clinical reasons.</p></div></details>'+
'<div class="pcr-tech-note"><strong>Lab tech processing</strong><p>Gently remix before cartridge loading. Inspect the sample appearance for visible clots or fibrin and follow the specimen-acceptability SOP. Verify patient ID, lane, QC/calibration status and specimen integrity. The one-page guide lists 100 µL per cartridge and approximately 17 minutes per run. Follow the assay IFU.</p></div>'+
window.LAB_PATHFAST_EXTRAS.interference()+
'<p class="pcr-foot">References: PATHFAST Clinic One-Page Guide; Quick Guide; Competency Quiz, PATHFAST assay IFU and cardiac troponin interference literature. The routine collection pathway is 0/1 hour; the provider must authorize any switch after a missed collection window.</p></section>';
}
function pathway(){
 return "<style>\n.pcr-static-pathways{display:grid;gap:22px}\n.pcr-static-intro{margin:0 0 3px;color:#617389;font-size:13px;line-height:1.7}\n.pcr-static-panel{border:1px solid #e3e9ef;border-radius:17px;background:#fff;overflow:hidden}\n.pcr-static-panel-head{padding:17px 20px;border-bottom:1px solid #edf1f5;display:flex;align-items:center;justify-content:space-between;gap:13px;flex-wrap:wrap}\n.pcr-static-panel-head h3{margin:0;color:#253e59;font-size:18px;letter-spacing:-.015em}\n.pcr-static-panel-head p{margin:5px 0 0;color:#6a7f90;font-size:12px;line-height:1.5}\n.pcr-static-pill{display:inline-flex;align-items:center;justify-content:center;border-radius:24px;padding:6px 10px;background:#e9f5f1;color:#317c61;border:1px solid #cce8dd;font-size:10px;font-weight:850;letter-spacing:.08em;white-space:nowrap}\n.pcr-static-pill.fallback{background:#fff5e2;color:#9d6a18;border-color:#f0dfb9}\n.pcr-static-chart-wrap{overflow-x:auto;background:#f5f7fa;padding:15px;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch}\n.pcr-static-chart-wrap img{display:block;width:100%;min-width:760px;height:auto;margin:auto;border:1px solid #e5e9ed;border-radius:8px;background:#fff;box-shadow:0 2px 9px rgba(30,60,90,.05)}\n.pcr-static-chart-tip{color:#75879a;margin:9px 2px 0;font-size:11px}\n.pcr-static-notes{padding:18px 20px 19px}\n.pcr-static-notes strong{display:block;color:#324a61;font-size:12px;margin:0 0 8px}\n.pcr-static-notes ul{margin:0;padding-left:20px;color:#596e82;font-size:12px;line-height:1.8}\n.pcr-static-notes li+li{margin-top:4px}\n.pcr-static-notes b{color:#2e516c}\n.pcr-static-review{padding:15px 18px;background:#fff9eb;border:1px solid #f0dfb9;border-radius:13px;color:#786038;font-size:12px;line-height:1.65}\n.pcr-static-review strong{color:#735122}\n.pcr-static-source{font-size:11px;line-height:1.6;color:#778697}\n@media(max-width:760px){.pcr-static-panel-head{padding:15px}.pcr-static-notes{padding:16px}.pcr-static-chart-wrap{padding:10px}.pcr-static-chart-wrap img{min-width:900px}.pcr-static-panel-head h3{font-size:16px}}\n@media print{.pcr-static-chart-wrap{overflow:visible;padding:0}.pcr-static-chart-wrap img{min-width:0;box-shadow:none}.pcr-static-chart-tip{display:none}.pcr-static-panel{break-inside:avoid}}\n</style>"+
 '<section class="pcr-guide pcr-static-pathways" aria-label="Static PATHFAST chest pain pathway references">'+
 '<div class="pcr-heading"><div><span class="pcr-eyebrow">PATHFAST / PROVIDER REFERENCE</span><h2>Chest pain pathways · hs-Troponin I</h2>'+
 '<p class="pcr-static-intro">Static visual references for the 0/1-hour standard pathway and provider-authorized 0/2-hour fallback. These images are not an interactive decision tool.</p></div><span class="pcr-role-label provider">Provider</span></div>'+
 '<div class="pcr-static-review" role="note"><strong>Clinical protocol check</strong> Confirm current PATHFAST assay-specific criteria with medical leadership before applying thresholds. Review ECG, symptoms, HEART score, symptom onset, serial values and actual draw times together. Troponin elevation alone does not diagnose myocardial infarction.</div>'+
 '<article class="pcr-static-panel"><div class="pcr-static-panel-head"><div><h3>0/1-hour chest pain pathway</h3><p>Routine first choice · baseline and 1-hour repeat</p></div><span class="pcr-static-pill">STANDARD PATHWAY</span></div>'+
 '<div class="pcr-static-chart-wrap"><img src="assets/pathfast-pathways/hs-tni-01.svg" alt="Sollis 0/1-hour hs-Troponin I chest pain flowchart showing rule-out, repeat testing, observation and transfer" loading="lazy"><p class="pcr-static-chart-tip">On a smaller screen, swipe horizontally to view the entire image.</p></div>'+
 '<div class="pcr-static-notes"><strong>Notes</strong><ul>'+
 '<li>Use the <b>0/1-hour pathway by default</b>. Start the clock at the actual baseline collection time, not the analyzer result time.</li>'+
 '<li>Repeat draw target is <b>60 minutes</b>. The collection window is <b>50–75 minutes after baseline</b> (10 minutes early to 15 minutes late), subject to the approved protocol.</li>'+
 '<li>Interpret the <b>1-hour delta</b> and both troponin concentrations together with symptoms, ECG and clinical risk.</li>'+
 '</ul></div></article>'+
 '<article class="pcr-static-panel"><div class="pcr-static-panel-head"><div><h3>0/2-hour chest pain pathway</h3><p>Fallback only when the approved 1-hour window is missed</p></div><span class="pcr-static-pill fallback">PROVIDER AUTHORIZATION</span></div>'+
 '<div class="pcr-static-chart-wrap"><img src="assets/pathfast-pathways/hs-tni-02.svg" alt="Sollis 0/2-hour hs-Troponin I chest pain flowchart showing 2-hour repeat, rule-out, observation and transfer" loading="lazy"><p class="pcr-static-chart-tip">On a smaller screen, swipe horizontally to view the entire image.</p></div>'+
 '<div class="pcr-static-notes"><strong>Notes</strong><ul>'+
 '<li>Use only after the <b>1-hour collection window is missed</b> and the treating provider authorizes the 0/2-hour fallback.</li>'+
 '<li>Target <b>120 minutes from baseline</b>, with a <b>110–135-minute</b> collection window where approved. Do not restart timing from the missed 1-hour draw.</li>'+
 '<li>Apply <b>2-hour-specific delta thresholds</b>, not 1-hour thresholds. The supplied 0/2-hour reference slide contains an incorrect “1 h” footer label; the 2-hour pathway and notes here use 2-hour labels.</li>'+
 '</ul></div></article>'+
 '<p class="pcr-static-source">Source references: Sollis Health 0/1-hour and 0/2-hour chest pain pathway images supplied for Lab Central; visual layout adapted for screen readability. Medical-director-approved criteria take precedence if updated.</p>'+
 '</section>';
}
if(typeof window!=='undefined'&&typeof window.addEventListener==='function'&&typeof document!=='undefined'){
 let printState=[];
 window.addEventListener('beforeprint',function(){printState=Array.from(document.querySelectorAll('.pcr-reference-accordion, .pcr-review-detail')).map(function(node){return {node:node,open:node.open};});printState.forEach(function(item){item.node.open=true;});});
 window.addEventListener('afterprint',function(){printState.forEach(function(item){item.node.open=item.open;});printState=[];});
}
window.LAB_PATHFAST_CLINICAL={collection:collection,pathway:pathway};
})();