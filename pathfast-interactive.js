/* PATHFAST serial draw windows, original-sample interference reference and provider pathway explorer.
   This tool does not store patient data or decide diagnosis/disposition. */
(function(){
"use strict";
const esc=v=>String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
function timing(){
 return '<div class="pcr-window-rule"><strong>Timing requirement: ±10 minutes</strong>'+
 '<p>Timing begins with the actual 0-hour blood draw, not the result time. Only a sample collected within the corresponding window can be used as that protocol’s timed 1-hour or 2-hour delta specimen. Do not relabel an out-of-window draw or apply a time-specific delta threshold to it.</p></div>'+
 '<div class="pcr-time-branches">'+
 '<article class="pcr-valid-time"><span class="pcr-time-badge">0/1 HOUR</span><strong>60 min ± 10 min</strong><p>Target: <b>12:05 PM</b></p><div class="pcr-window-value"><span>ACCEPTABLE COLLECTION</span><b>11:55 AM–12:15 PM</b><small>50–70 min from baseline</small></div></article>'+
 '<article class="pcr-valid-time"><span class="pcr-time-badge alt">0/2 HOUR</span><strong>120 min ± 10 min</strong><p>Target: <b>1:05 PM</b></p><div class="pcr-window-value"><span>ACCEPTABLE COLLECTION</span><b>12:55 PM–1:15 PM</b><small>110–130 min from baseline</small></div></article></div>'+
 '<div class="pcr-invalid-time"><strong>Outside either collection window?</strong><p>Do <b>not</b> use the sample as a 1-hour or 2-hour timed delta point. Record the true collection time, notify the provider, and follow the approved alternative testing plan. A separately reported result may still be clinically assessed using its actual time; it must not be represented as a protocol-timed delta.</p></div>';
}
function plasmaTube(){
 return '<svg class="pcr-plasma-svg" viewBox="0 0 355 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Green-top lithium heparin tube after centrifugation, with pale yellow plasma above buffy coat and red blood cell layer">'+
 '<defs><linearGradient id="pcrLayerGlass" x1="0" x2="1"><stop stop-color="#c9dde6"/><stop offset=".42" stop-color="#fff" stop-opacity=".86"/><stop offset="1" stop-color="#bad1dc"/></linearGradient></defs>'+
 '<ellipse cx="107" cy="257" rx="65" ry="8" fill="#e2e9ec"/>'+
 '<rect x="68" y="12" width="77" height="35" rx="10" fill="#168d60" stroke="#0b7048" stroke-width="3"/>'+
 '<path d="M74 46 L139 46 L136 224 Q107 250 80 224Z" fill="url(#pcrLayerGlass)" stroke="#8caeba" stroke-width="3"/>'+
 '<path d="M80 65 L133 65 L131 146 L82 146Z" fill="#f3d98d"/>'+
 '<rect x="82" y="146" width="49" height="7" rx="2" fill="#f2ecdf"/>'+
 '<path d="M82 153 L131 153 L129 220 Q106 236 85 220Z" fill="#b9434a"/>'+
 '<rect x="85" y="91" width="43" height="33" rx="3" fill="#fff" opacity=".91"/>'+
 '<text x="106" y="106" text-anchor="middle" font-size="9" font-weight="900" fill="#207d61">Li-HEP</text>'+
 '<text x="106" y="118" text-anchor="middle" font-size="8" fill="#537b70">PLASMA</text>'+
 '<path d="M141 104 H194" stroke="#b6933a" stroke-width="3"/><circle cx="141" cy="104" r="3" fill="#b6933a"/>'+
 '<text x="203" y="100" font-size="15" font-weight="900" fill="#806527">PLASMA</text>'+
 '<text x="203" y="115" font-size="11" fill="#907b4b">Retest this layer</text>'+
 '<path d="M141 149 H194" stroke="#899b91" stroke-width="2"/><circle cx="141" cy="149" r="3" fill="#899b91"/>'+
 '<text x="203" y="152" font-size="11" font-weight="750" fill="#6d7b76">Buffy coat</text>'+
 '<path d="M141 192 H194" stroke="#b9434a" stroke-width="3"/><circle cx="141" cy="192" r="3" fill="#b9434a"/>'+
 '<text x="203" y="188" font-size="14" font-weight="900" fill="#a83e45">RED CELLS</text>'+
 '<text x="203" y="203" font-size="11" fill="#987175">Do not aspirate</text>'+
 '<text x="107" y="269" text-anchor="middle" font-size="10.5" font-weight="800" fill="#58816d">Original specimen</text></svg>';
}
function interference(){
 return '<section class="pcr-interference" aria-label="Troponin interference investigation">'+
 '<div class="pcr-interference-head"><span class="pcr-interference-icon">🔬</span><div><span class="pcr-eyebrow">LAB TECH / INTERFERENCE INVESTIGATION</span><h3>Suspected falsely elevated troponin: retest plasma from the original tube</h3><p>The same suspect lithium-heparin specimen is used to check whether microclots or fibrin affected the initial measurement.</p></div></div>'+
 '<div class="pcr-interference-grid"><div class="pcr-plasma-drawing">'+plasmaTube()+'</div>'+
 '<ol class="pcr-interference-steps">'+
 '<li><b>Notify the provider.</b> Flag the unexpected elevation for clinical and laboratory review. Do not assume the result is false.</li>'+
 '<li><b>Retrieve the original lithium-heparin tube</b> that produced the suspect value and verify specimen ID and collection time. A fresh draw is <b>not required solely for this same-tube interference investigation</b>.</li>'+
 '<li><b>Centrifuge the original tube</b> using approved plasma-separation settings; remove insoluble material and ensure the sample remains within its stability limits.</li>'+
 '<li><b>Retest using the upper plasma layer</b> from that tube, avoiding the buffy coat and red blood cell layer. Follow PATHFAST plasma instructions.</li>'+
 '<li><b>Compare and document the original and plasma results</b>, notify the provider and follow the approved policy for verification and any result correction.</li>'+
 '</ol></div>'+
 '<div class="pcr-interference-caution"><strong>Separate from serial sampling</strong><p>This is an <b>analytical interference check</b> on the original specimen, not a new 1-hour or 2-hour draw. The provider may still request additional timed or clinically indicated specimens. Do not automatically invalidate or delete the original elevated result.</p></div></section>';
}
const questions=[
 {id:"timing",title:"Is the 1-hour sample collected within 50–70 minutes of baseline?",opts:[["yes","Yes, within the ±10-minute window"],["no","No, outside the window"],["pending","No repeat sample collected yet"]]},
 {id:"baseline",title:"Which initial hs-TnI reference band applies?",opts:[["low","Below 4 ng/L"],["middle","4 to below 90 ng/L"],["high","90 ng/L or above"]]},
 {id:"onset",title:"For a low initial value, when did symptoms begin?",opts:[["late","More than 3 hours before initial sampling"],["early","3 hours or less"],["unknown","Unclear or unknown"]]},
 {id:"delta",title:"Which 1-hour change band applies?",opts:[["small","Below 3 ng/L"],["middle","3 to below 20 ng/L"],["large","20 ng/L or greater"],["unknown","Not available / unclear"]]},
 {id:"risk",title:"Which clinical assessment category is documented?",opts:[["low","HEART ≤3 and reassuring ECG"],["concerning","HEART >3, concerning ECG, or unresolved clinical concern"],["unknown","Not yet assessed"]]}
];
let selected={};
function question(q,index){
 return '<div class="pcr-flow-question"><div class="pcr-flow-question-header"><span class="pcr-flow-number">'+index+'</span><strong>'+esc(q.title)+'</strong></div>'+
 '<div class="pcr-flow-options" role="group" aria-label="'+esc(q.title)+'">'+q.opts.map(([value,label])=>
 '<button type="button" class="pcr-flow-option '+(selected[q.id]===value?'selected':'')+'" data-pcr-choice="'+q.id+'" data-pcr-value="'+value+'" aria-pressed="'+(selected[q.id]===value)+'">'+esc(label)+(selected[q.id]===value?' ✓':'')+'</button>').join('')+'</div></div>';
}
function result(title,body,type){
 return '<div class="pcr-flow-result '+(type||'')+'" role="status"><strong>'+title+'</strong><p>'+body+'</p></div>';
}
function flow(){
 const q=id=>questions.find(x=>x.id===id);
 let h='<section class="pcr-flow-explorer" aria-label="Interactive provider pathway reference">'+
 '<div class="pcr-flow-head"><div><span class="pcr-eyebrow">PROVIDER-LED INTERACTIVE REFERENCE</span><h3>Explore the 0/1-hour pathway</h3><p>Select the circumstances below to find the relevant branch of the clinical reference. No patient data is stored. This tool does not diagnose, calculate deltas, or authorize disposition.</p></div>'+
 '<button type="button" data-pcr-reset class="pcr-flow-reset">Reset flow ↻</button></div>'+
 '<div class="pcr-flow-spine">'+question(q("baseline"),1);
 if(selected.baseline==="high"){
  h+=result("High initial-value reference","An initial hs-TnI ≥90 ng/L appears in the source rule-in/transfer pathway. Urgent clinical assessment and provider-directed escalation apply irrespective of whether a repeat draw has occurred.","high");
 }else if(selected.baseline){
  h+=question(q("timing"),2);
  if(selected.timing==="no"){
   h+=result("Outside the 1-hour collection window","The draw cannot be designated as the 1-hour delta specimen. Record its true time, notify the provider and follow the alternate testing plan. Do not use a timed 1-hour delta threshold.","warn");
  }else if(selected.timing==="pending"){
   h+=result("Repeat sampling not yet documented","The timed 1-hour delta cannot be assessed until a sample has been collected within the approved 50–70-minute window. Immediate clinical assessment remains essential.","info");
  }else if(selected.timing==="yes"){
   if(selected.baseline==="low"){
    h+=question(q("onset"),3);
    if(selected.onset){
     h+=question(q("risk"),4);
     if(selected.risk)h+=result("Review low initial-value reference","The source considers symptom onset, HEART score and ECG. A value <4 ng/L alone does not authorize discharge. Follow the approved protocol, especially for early symptoms or concerning findings.","info");
    }
   }else if(selected.baseline==="middle"){
    h+=question(q("delta"),3);
    if(selected.delta){
     if(selected.delta==="large"){
      h+=result("Marked 1-hour change in source reference","A delta ≥20 ng/L appears in the source's rule-in/transfer evaluation branch. Confirm the actual clinical course and arrange urgent provider-directed assessment.","high");
     }else{
      h+=question(q("risk"),4);
      if(selected.risk)h+=result("Compare relevant protocol criteria","Review the rule-out, consider-discharge and observe/consult references below, including sex-specific concentration thresholds, symptoms, ECG and HEART. The supplied references disagree at the 3 ng/L boundary and this tool cannot assign a definitive zone.","info");
     }
    }
   }
  }
 }
 h+='</div><div class="pcr-flow-foot">Reference explorer only. Follow the current approved protocol for interpretation and disposition. Do not enter patient identifiers.</div></section>';
 return h;
}
function refresh(){
 if(typeof document==='undefined')return;
 const container=document.querySelector('.pcr-flow-explorer');
 if(container)container.outerHTML=flow();
}
if(typeof document!=='undefined'&&typeof document.addEventListener==='function'){
 document.addEventListener('click',function(ev){
  const btn=ev.target.closest('[data-pcr-choice]');
  if(btn){const id=btn.getAttribute('data-pcr-choice'),value=btn.getAttribute('data-pcr-value');const q=questions.find(x=>x.id===id);
   if(!q||!q.opts.some(x=>x[0]===value))return;
   const next={};for(const key of ["baseline","timing","onset","delta","risk"]){if(key===id)break;if(selected[key])next[key]=selected[key];}
   next[id]=value;selected=next;refresh();return;
  }
  if(ev.target.closest('[data-pcr-reset]')){selected={};refresh();}
 });
}
window.LAB_PATHFAST_EXTRAS={timing,interference,flow,reset:function(){selected={};},_getSelected:()=>({...selected})};
})();