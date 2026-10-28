/* PATHFAST nursing specimen collection and provider pathway references */
(function(){
"use strict";
function tube(){
return '<svg class="pcr-tube-svg" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Green-top lithium-heparin collection tube and immediate gentle inversion">'+
'<defs><linearGradient id="pcrglass" x1="0" x2="1"><stop stop-color="#c3e0e6"/><stop offset=".5" stop-color="#faffff"/><stop offset="1" stop-color="#b7d7df"/></linearGradient></defs>'+
'<g transform="translate(80,10)"><rect x="44" y="2" width="72" height="35" rx="10" fill="#16885b" stroke="#0c6a4a" stroke-width="3"/>'+
'<path d="M48 35 H112 L108 195 Q82 225 53 195Z" fill="url(#pcrglass)" stroke="#8badba" stroke-width="3"/>'+
'<path d="M56 116 H105 L103 193 Q82 210 58 193Z" fill="#b74b5a" opacity=".84"/>'+
'<rect x="56" y="69" width="48" height="52" rx="4" fill="#fff" stroke="#a4bfcb"/>'+
'<text x="80" y="87" font-size="11" text-anchor="middle" fill="#237558" font-weight="900">LITHIUM</text>'+
'<text x="80" y="102" font-size="11" text-anchor="middle" fill="#237558" font-weight="900">HEPARIN</text>'+
'<text x="80" y="114" font-size="8" text-anchor="middle" fill="#537c76">GREEN TOP</text></g>'+
'<path d="M283 61 Q339 22 366 84" fill="none" stroke="#259b80" stroke-width="7" stroke-linecap="round"/>'+
'<path d="M345 75 L368 95 L380 69" fill="none" stroke="#259b80" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'+
'<g transform="translate(298,120) rotate(150,26,48)"><rect x="0" y="0" width="55" height="27" rx="8" fill="#168b5f"/>'+
'<path d="M5 27 H50 L47 103 Q28 117 8 103Z" fill="url(#pcrglass)" stroke="#8ab6c2" stroke-width="2"/>'+
'<path d="M8 72 H47 L45 101 Q27 108 10 101Z" fill="#cc6670"/></g>'+
'<text x="329" y="241" font-size="12" font-weight="850" text-anchor="middle" fill="#237f6c">Invert 8–10×</text>'+
'</svg>';
}
function card(n,role,title,body){
return '<article class="pcr-step"><span class="pcr-step-index">'+String(n).padStart(2,"0")+'</span><div><span class="pcr-role">'+role+'</span><h3>'+title+'</h3><p>'+body+'</p></div></article>';
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
'<h3 class="pcr-section-title">RN collection workflow</h3><div class="pcr-steps">'+
card(1,"RN","Confirm the order and provider-selected pathway","Check the PATHFAST hs-Troponin I order. Confirm whether the provider chose the 0/1-hour or 0/2-hour protocol.")+
card(2,"RN","Collect and label the baseline sample","Use a lithium-heparin green-top tube and document the exact 0-hour collection date and time.")+
card(3,"RN","Invert immediately","Gently invert 8–10 times. Do not shake or let the tube stand unmixed.")+
card(4,"RN → Lab tech","Deliver the sample promptly","Hand the properly labeled specimen to the tech; avoid unnecessary delay or heat.")+
card(5,"RN","Start timer from the first draw","Set 60 minutes for the 0/1-hour protocol or 120 minutes for the 0/2-hour protocol. A ±10-minute collection window applies at each target. Do not time from result availability.")+
card(6,"RN","Collect and document the repeat","Use the same specimen type and invert immediately. Record actual draw time. Samples outside the ±10-minute window cannot be used for the 1-hour or 2-hour timed delta; notify the provider.")+
'</div><h3 class="pcr-section-title">Serial collection clock</h3>'+
'<div class="pcr-timing-start"><span class="pcr-clock">0 h</span><div><strong>Baseline draw</strong><p>Example: 11:05 AM. Start the timer at this actual collection time.</p></div></div>'+
window.LAB_PATHFAST_EXTRAS.timing()+
'<div class="pcr-missed"><strong>Missed the 1-hour window?</strong><p>Notify the provider. Example: If the baseline is 11:05 AM and the missed window is identified at 12:21 PM, notify the provider and use the approved 2-hour pathway, targeting <b>1:05 PM</b>. Record the actual draw time, notify the provider, and do not use the out-of-window sample for any protocol-timed 1-hour or 2-hour delta. It may be assessed separately with its actual timing.</p></div>'+
'<details class="pcr-accordion"><summary>Collection from existing IV lines and other precautions <span>⌄</span></summary><div>'+
'<p>Prefer fresh venipuncture for repeat troponins when feasible and follow approved line-draw policy. The PATHFAST competency guidance references a one-full-tube (5 mL) discard from an existing line. Confirm this requirement for the actual access device and current site policy before use.</p>'+
'<p>Hemolysis may be tolerated by PATHFAST, but visible or suspected microclots can compromise results. Use the original suspect lithium-heparin tube for the analytical plasma retest below. A fresh draw may be needed separately for clinical reasons.</p></div></details>'+
'<div class="pcr-tech-note"><strong>Lab tech processing</strong><p>Gently remix before cartridge loading. Confirm the matching patient ID and lane, acceptable QC/calibration status and specimen integrity. The one-page guide lists 100 µL per cartridge and approximately 17 minutes per run. Follow the assay IFU.</p></div>'+
window.LAB_PATHFAST_EXTRAS.interference()+
'<p class="pcr-foot">References: PATHFAST Clinic One-Page Guide; Quick Guide; Competency Quiz, PATHFAST assay IFU and cardiac troponin interference literature. The provider chooses the serial-testing pathway.</p></section>';
}
function col(title,tag,statements,kind){
return '<article class="pcr-decision '+kind+'"><div class="pcr-decision-head"><strong>'+title+'</strong><small>'+tag+'</small></div><div class="pcr-decision-body">'+statements.map(x=>'<p>'+x+'</p>').join("")+'</div></article>';
}
function pathway(){
return '<section class="pcr-guide"><div class="pcr-heading"><div><span class="pcr-eyebrow">PATHFAST / PROVIDER REFERENCE</span><h2>hs-Troponin I 0/1-hour pathway</h2>'+
'<p>Provider reference for 0/1-hour hs-Troponin I interpretation. Confirm the current approved chest-pain protocol.</p></div><span class="pcr-role-label provider">Provider</span></div>'+
'<div class="pcr-review-strip"><span class="pcr-review-icon" aria-hidden="true">!</span><div><strong>Medical protocol verification required</strong><p>The source references contain differing thresholds. Confirm the approved assay-specific pathway before clinical decisions.</p><details class="pcr-review-detail"><summary>See threshold discrepancies</summary><p>References differ on 1-hour delta <b>&gt;3 versus ≥3 ng/L</b> and low-value rule-out conditions. The one-page guide states a 99th-percentile reference of 29 ng/L, while this pathway shows 21.4 ng/L (F) and 29.8 ng/L (M). Medical leadership must reconcile these differences before clinical use.</p></details></div></div>'+
window.LAB_PATHFAST_EXTRAS.flow()+
'<details class="pcr-reference-accordion" data-print-open><summary><span class="pcr-reference-summary-icon" aria-hidden="true">▤</span><span><strong>Clinical reference charts</strong><small>View the 1-hour interpretation table and flowchart</small></span><span class="pcr-reference-chevron" aria-hidden="true">⌄</span></summary><div class="pcr-reference-content"><h3 class="pcr-section-title">Reference A: Interpreting the 1-hour result</h3><div class="pcr-decisions">'+
col("Rule-out","Low risk",["Initial hs-TnI <b>&lt;4 ng/L</b>","1-hour delta <b>&lt;3 ng/L</b>","HEART ≤3 and reassuring ECG"],"ruleout")+
col("Consider discharge","Follow-up review",["Initial hs-TnI <b>≥4 ng/L</b> with 1-hour delta <b>&lt;3 ng/L</b>","Total below <b>21.4 ng/L (F)</b> or <b>29.8 ng/L (M)</b>","HEART ≤3 and cardiology follow-up within 48–72 hours; may repeat 2-hour troponin"],"consider")+
col("Observe / consult","Further assessment",["1-hour delta <b>&gt;3 and &lt;20 ng/L</b> with total &lt;90 ng/L","Or total above the sex-specific threshold but &lt;90 ng/L, or HEART &gt;3","Real-time cardiology consult, risk stratification or transfer"],"observe")+
col("Rule-in / transfer","Urgent escalation",["Initial hs-TnI <b>≥90 ng/L</b>","Or 1-hour delta <b>≥20 ng/L</b>","Or 1-hour total <b>≥90 ng/L</b>: transfer"],"transfer")+
'</div><p class="pcr-foot">Clinical reference: “Step 4: interpret the 1-hour result”. Verify against the current approved protocol.</p>'+
'<h3 class="pcr-section-title">Reference B: 0/1-hour pathway overview</h3><div class="pcr-map">'+
'<div class="pcr-map-start"><strong>Chest pain presentation</strong><span>Initial hs-TnI (0 hour) + ECG</span></div>'+
'<div class="pcr-map-down">↓</div><div class="pcr-map-three">'+
'<div class="pcr-map-branch ruleout"><h4>Initial &lt;4 ng/L</h4><p>Evaluate symptom onset &gt;3 hours and HEART ≤3 for possible discharge; for symptoms ≤3 hours, follow the 1-hour repeat pathway.</p></div>'+
'<div class="pcr-map-branch observe"><h4>Initial 4 to &lt;90 ng/L</h4><p>Repeat hs-TnI at 1 hour; assess delta, total, ECG and HEART score.</p></div>'+
'<div class="pcr-map-branch transfer"><h4>Initial ≥90 ng/L</h4><p>Rule-in / ED transfer for ACS or NSTEMI evaluation.</p></div>'+
'</div><div class="pcr-map-down">↓</div>'+
'<div class="pcr-map-results"><span class="ruleout">Rule-out / discharge criteria</span><span class="consider">Consider 2-hour repeat / close follow-up</span><span class="observe">Observe / consult</span><span class="transfer">Rule-in / transfer</span></div></div>'+
'<div class="pcr-tech-note"><strong>Provider-only clinical interpretation</strong><p>Evaluate symptom onset, ECG, HEART score, serial troponin values, units and clinical presentation together. Elevated troponin may indicate myocardial injury but does not alone establish MI. PATHFAST high-sensitivity results should not be trended directly with conventional Triage troponin values.</p></div>'+
'<p class="pcr-foot">Clinical reference: “Primary Option: hs-TnI 0/1-Hour Chest Pain Pathway” and PATHFAST Clinic One-Page Guide. Provider use only.</p></div></details></section>';
}
if(typeof window!=='undefined'&&typeof window.addEventListener==='function'&&typeof document!=='undefined'){
 let printState=[];
 window.addEventListener('beforeprint',function(){printState=Array.from(document.querySelectorAll('.pcr-reference-accordion, .pcr-review-detail')).map(function(node){return {node:node,open:node.open};});printState.forEach(function(item){item.node.open=true;});});
 window.addEventListener('afterprint',function(){printState.forEach(function(item){item.node.open=item.open;});printState=[];});
}
window.LAB_PATHFAST_CLINICAL={collection:collection,pathway:pathway};
})();