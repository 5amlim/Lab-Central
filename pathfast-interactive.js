/* PATHFAST serial draw windows, original-sample interference reference and provider pathway explorer.
   This tool does not store patient data or decide diagnosis/disposition. */
(function(){
"use strict";
const esc=v=>String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
// Time inputs are local to the page; no patient data is saved.
let baselineMinutes=720;
function displayTime(total){
 const m=((total%1440)+1440)%1440;
 const h=Math.floor(m/60),minute=m%60;
 return String(h%12||12)+":"+String(minute).padStart(2,"0")+" "+(h>=12?"PM":"AM");
}
function inputTime(total){
 const m=((total%1440)+1440)%1440;
 return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
}
function baselinePicker(){
 return '<div class="pcr-timing-start pcr-custom-baseline" id="pcr-custom-baseline">'+
 '<span class="pcr-clock">0 h</span><div class="pcr-baseline-text"><strong>Baseline draw</strong><p>Enter the actual first collection time, not the result time.</p></div>'+
 '<label class="pcr-time-input-label" for="pcr-baseline-input"><span>FIRST DRAW TIME</span><input id="pcr-baseline-input" type="time" step="60" value="'+inputTime(baselineMinutes)+'" aria-label="First troponin blood collection time"></label>'+
 '</div>';
}
function timing(){
 const base=displayTime(baselineMinutes);
 const one=displayTime(baselineMinutes+60),one15=displayTime(baselineMinutes+75);
 const two=displayTime(baselineMinutes+120),two15=displayTime(baselineMinutes+135);
 return '<div id="pcr-serial-timing">'+
 '<div class="pcr-window-rule"><strong>Repeat collection: never before the target time</strong>'+
 '<p>Timing starts at the initial blood draw ('+base+'). The +15-minute allowance must be approved locally for assay-specific delta interpretation.</p></div>'+
 '<div class="pcr-time-branches">'+
 '<article class="pcr-valid-time"><span class="pcr-time-badge">0/1 HOUR</span><strong>60 min + 0–15 min</strong><p>Target: <b>'+one+'</b></p><div class="pcr-window-value"><span>COLLECTION WINDOW</span><b>'+one+'–'+one15+'</b><small>60–75 minutes after the baseline · Never earlier</small></div></article>'+
 '<article class="pcr-valid-time"><span class="pcr-time-badge alt">0/2 HOUR</span><strong>120 min + 0–15 min</strong><p>Target: <b>'+two+'</b></p>'+
 '<div class="pcr-twohour-gate" role="note"><strong>MISSED THE 75-MINUTE MARK?</strong><span>Draw the repeat at <b>120 minutes from the initial draw.</b></span></div>'+
 '<div class="pcr-window-value"><span>COLLECTION WINDOW</span><b>'+two+'–'+two15+'</b><small>120–135 minutes after the baseline · Never earlier</small></div></article></div>'+
 '<div class="pcr-invalid-time"><strong>Outside the authorized collection window?</strong><p>Do not treat an out-of-window specimen as a timed delta. Record the actual time, notify the provider and follow the approved alternative plan.</p></div>'+
 '</div>';
}
function plasmaTube(){
 return '<svg class="pcr-plasma-svg" viewBox="0 0 355 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Green-top lithium-heparin specimen after a 10-minute spin per local SOP, showing plasma above buffy coat and red blood cells">'+
 '<defs><linearGradient id="pcrLayerGlass" x1="0" x2="1"><stop stop-color="#c9dde6"/><stop offset=".42" stop-color="#fff" stop-opacity=".86"/><stop offset="1" stop-color="#bad1dc"/></linearGradient></defs>'+
 '<g transform="translate(22 0) scale(.79 1)"><ellipse cx="107" cy="257" rx="65" ry="8" fill="#e2e9ec"/>'+ 
 '<rect x="68" y="12" width="77" height="35" rx="10" fill="#168d60" stroke="#0b7048" stroke-width="3"/>'+
 '<path d="M74 46 L139 46 L136 224 Q107 250 80 224Z" fill="url(#pcrLayerGlass)" stroke="#8caeba" stroke-width="3"/>'+
 '<path d="M80 65 L133 65 L131 146 L82 146Z" fill="#f3d98d"/>'+
 '<rect x="82" y="146" width="49" height="7" rx="2" fill="#f2ecdf"/>'+
 '<path d="M82 153 L131 153 L129 220 Q106 236 85 220Z" fill="#b9434a"/>'+
 '<rect x="85" y="91" width="43" height="33" rx="3" fill="#fff" opacity=".91"/>'+
 '<text x="106" y="106" text-anchor="middle" font-size="9" font-weight="900" fill="#207d61">Li-HEP</text>'+
 '<text x="106" y="118" text-anchor="middle" font-size="8" fill="#537b70">PLASMA</text></g>'+ 
 '<rect x="190" y="19" width="161" height="41" rx="9" fill="#e4f2f5" stroke="#9dc8d2" stroke-width="2"/>'+
 '<text x="270" y="37" text-anchor="middle" fill="#277685" font-weight="900" font-size="13">SPIN · 10 MIN</text>'+
 '<text x="270" y="52" text-anchor="middle" fill="#5c8594" font-size="9">PER LOCAL SOP</text>'+
 '<path d="M137 104 H194" stroke="#b6933a" stroke-width="3"/><circle cx="137" cy="104" r="3" fill="#b6933a"/>'+
 '<text x="203" y="100" font-size="15" font-weight="900" fill="#806527">PLASMA</text>'+
 '<text x="203" y="115" font-size="11" fill="#907b4b">Retest this layer</text>'+
 '<path d="M137 149 H194" stroke="#899b91" stroke-width="2"/><circle cx="137" cy="149" r="3" fill="#899b91"/>'+
 '<text x="203" y="152" font-size="11" font-weight="750" fill="#6d7b76">Buffy coat</text>'+
 '<path d="M137 192 H194" stroke="#b9434a" stroke-width="3"/><circle cx="137" cy="192" r="3" fill="#b9434a"/>'+
 '<text x="203" y="188" font-size="14" font-weight="900" fill="#a83e45">RED CELLS</text>'+
 '<text x="203" y="203" font-size="11" fill="#987175">Do not aspirate</text>'+
 '<text x="107" y="269" text-anchor="middle" font-size="10.5" font-weight="800" fill="#58816d">Original specimen</text></svg>';
}
function interference(){
 return '<section class="pcr-interference" aria-label="Troponin interference investigation">'+
 '<div class="pcr-interference-head"><span class="pcr-interference-icon">🔬</span><div><span class="pcr-eyebrow">LAB TECH / INTERFERENCE INVESTIGATION</span><h3>Suspected falsely elevated troponin: retest plasma from the original tube</h3><p>The same suspect lithium-heparin specimen is used to check whether microclots or fibrin affected the initial measurement.</p></div></div>'+
 '<div class="pcr-interference-grid"><div class="pcr-plasma-drawing">'+plasmaTube()+'</div>'+
 '<ol class="pcr-interference-steps">'+
 '<li><b>Inspect the original tube first.</b> Look for visible clots, fibrin strands, unusual layers or other insoluble material. If a clot is observed, hold the specimen for review and proceed to notify the provider. Absence of visible clots does not rule out microclots.</li>'+
 '<li><b>Notify the provider.</b> Flag the unexpected troponin elevation and any observed clotting. Do not assume the original result is false or automatically correct it.</li>'+
 '<li><b>Verify the original specimen.</b> Confirm the matching lithium-heparin tube, patient identifiers and draw time. Follow the approved policy to determine if the tube can be processed or a redraw is necessary.</li>'+
 '<li><b>Spin 10 minutes, if authorized by the local procedure.</b> Centrifuge the original tube at the validated force and time to separate plasma and insoluble material. If the sample is unsuitable or visibly clotted, follow the laboratory rejection/redraw SOP rather than automatically using it.</li>'+
 '<li><b>Retest the plasma layer.</b> Use the upper plasma portion without disturbing the buffy coat, cells, or material at the interface. Follow the PATHFAST plasma instructions.</li>'+
 '<li><b>Compare and document both results.</b> Notify the provider, verify interpretation, and follow the approved process for any corrected result.</li>'+
 '</ol></div>'+
 '<div class="pcr-interference-caution"><strong>Separate from serial sampling</strong><p>This is an <b>analytical interference check</b> on the original specimen, not a new 1-hour or 2-hour draw. The provider may still request additional timed or clinically indicated specimens. Do not automatically invalidate or delete the original elevated result.</p></div></section>';
}
const questions=[
 {id:"baseline",title:"What is the initial PATHFAST hs-Troponin I result?",opts:[["low","Below 4 ng/L"],["middle","4 to below 90 ng/L"],["high","90 ng/L or above"]]},
 {id:"timing",title:"Was the repeat sample collected in the locally approved 1-hour window?",opts:[["yes","Yes, at least 60 minutes after baseline, within the approved window"],["no","No, collected outside the authorized window"],["pending","No repeat specimen collected yet"]]},
 {id:"delta",title:"What is the change between the 0-hour and 1-hour hs-Troponin I values?",opts:[["small","Less than 3 ng/L"],["middle","3 to below 20 ng/L"],["large","20 ng/L or greater"],["unknown","Not calculated / not available"]]},
 {id:"risk",title:"Which clinical assessment is documented?",opts:[["low","HEART score ≤3, reassuring ECG and no concerning findings"],["concerning","Concerning ECG, HEART score >3, symptoms, or other concern"],["unknown","Not yet fully assessed"]]},
 {id:"onset",title:"For a low initial value, when did symptoms begin?",opts:[["late","More than 3 hours before baseline sampling"],["early","3 hours or less before baseline sampling"],["unknown","Onset is uncertain"]]},
 {id:"confirmation",title:"Has the treating provider confirmed all criteria in the currently approved assay-specific PATHFAST rule-out protocol?",opts:[["yes","Yes, full criteria verified by the provider"],["no","No, at least one criterion is not met"],["pending","Still verifying / not yet documented"]]}
];
let selected={};
function question(q,index){
 return '<div class="pcr-flow-question"><div class="pcr-flow-question-header"><span class="pcr-flow-number">'+index+'</span><strong>'+esc(q.title)+'</strong></div>'+
 '<div class="pcr-flow-options" role="group" aria-label="'+esc(q.title)+'">'+q.opts.map(([value,label])=>
 '<button type="button" class="pcr-flow-option '+(selected[q.id]===value?'selected':'')+'" data-pcr-choice="'+q.id+'" data-pcr-value="'+value+'" aria-pressed="'+(selected[q.id]===value)+'">'+esc(label)+(selected[q.id]===value?' ✓':'')+'</button>').join('')+'</div></div>';
}
function zoneOutcome(zone,title,explanation){
 const zones=[
  {id:"ruleout",label:"RULE-OUT",detail:"Low-risk pathway"},
  {id:"observe",label:"YELLOW ZONE",detail:"Observe / review"},
  {id:"rulein",label:"RULE-IN",detail:"Urgent evaluation"}
 ];
 return '<section class="pcr-zone-outcome '+zone+'" role="status" aria-label="Pathway reference endpoint: '+esc(title)+'">'+
  '<span class="pcr-zone-eyebrow">PATHWAY ENDPOINT · PROVIDER REFERENCE</span>'+
  '<div class="pcr-zone-options">'+zones.map(x=>'<div class="pcr-zone-choice '+x.id+(x.id===zone?' active':' inactive')+'" '+(x.id===zone?'aria-current="step"':'')+'><strong>'+x.label+'</strong><small>'+x.detail+'</small></div>').join('')+'</div>'+
  '<h4>'+esc(title)+'</h4><p>'+esc(explanation)+'</p>'+
  '<div class="pcr-zone-caution">Provisional pathway reference, not an MI diagnosis or discharge/transfer order. Follow the current approved PATHFAST assay-specific algorithm, ECG and clinical assessment. The source cutoffs and requested +15-minute collection window still require local medical approval.</div>'+
  '</section>';
}
function flow(){
 const q=id=>questions.find(x=>x.id===id);
 let h='<section class="pcr-flow-explorer" aria-label="Interactive provider pathway reference">'+
 '<div class="pcr-flow-head"><div><span class="pcr-eyebrow">PROVIDER-LED INTERACTIVE REFERENCE</span><h3>Explore the 0/1-hour pathway</h3><p>Follow the clinical inputs to see one of three final reference zones: Rule-out, Yellow zone or Rule-in. No patient data is stored. This is not a validated decision engine or disposition order.</p></div>'+
 '<button type="button" data-pcr-reset class="pcr-flow-reset">Reset flow ↻</button></div>'+
 '<div class="pcr-flow-spine">'+question(q("baseline"),1);
 if(selected.baseline==="high"){
  h+=zoneOutcome("rulein","Rule-in pathway: urgent evaluation","The source guide includes an initial hs-TnI of at least 90 ng/L in its rule-in/transfer reference. Prompt provider evaluation and escalation are needed; elevated troponin alone does not diagnose MI.");
 }else if(selected.baseline){
  h+=question(q("timing"),2);
  if(selected.timing==="no"){
   h+=zoneOutcome("observe","Yellow zone: sampling outside approved window","Do not interpret the specimen as a valid 1-hour delta. Record the actual draw time and notify the provider to select an authorized alternative pathway. This is a sampling-status category, not a diagnosis.");
  }else if(selected.timing==="pending"){
   h+=zoneOutcome("observe","Yellow zone: repeat sample pending","The repeat value and clinical interpretation are still outstanding. Reassess with the approved timing protocol and the patient's clinical status.");
  }else if(selected.timing==="yes"){
   h+=question(q("delta"),3);
   if(selected.delta==="large"){
    h+=zoneOutcome("rulein","Rule-in pathway: urgent evaluation","A 1-hour change of at least 20 ng/L appears in the site's source rule-in reference. Confirm the timing, assay and clinical context and obtain urgent provider assessment.");
   }else if(selected.delta==="middle"){
    h+=zoneOutcome("observe","Yellow zone: observe / consult","A 1-hour change of 3 to less than 20 ng/L does not establish the site's rule-out criteria. Obtain provider review and any additional tests or repeat ECG specified by the approved pathway.");
   }else if(selected.delta==="unknown"){
    h+=zoneOutcome("observe","Yellow zone: delta unavailable","The serial result is incomplete or cannot be interpreted. Review the actual reported results and collection times before selecting a clinical pathway.");
   }else if(selected.delta==="small"){
    h+=question(q("risk"),4);
    if(selected.risk==="concerning"){
     h+=zoneOutcome("observe","Yellow zone: clinical concern remains","A small troponin change does not override concerning symptoms, ECG findings, or risk assessment. Further provider evaluation is required.");
    }else if(selected.risk==="unknown"){
     h+=zoneOutcome("observe","Yellow zone: risk assessment incomplete","ECG, clinical presentation and HEART score have not been fully reviewed. Do not assign rule-out based only on the troponin delta.");
    }else if(selected.risk==="low"){
     if(selected.baseline==="low"){
      h+=question(q("onset"),5);
      if(selected.onset==="unknown"){
       h+=zoneOutcome("observe","Yellow zone: symptom onset uncertain","Timing of symptoms has not been established. The source's low-initial-value rule-out considerations require verified symptom timing and clinical review.");
      }else if(selected.onset){
       h+=question(q("confirmation"),6);
       if(selected.confirmation==="yes"){
        h+=zoneOutcome("ruleout","Rule-out pathway: provider-confirmed criteria","The treating provider has confirmed the complete approved assay-specific rule-out criteria. Rule-out classification is not by itself a discharge order; review the clinical picture and follow-up plan.");
       }else if(selected.confirmation){
        h+=zoneOutcome("observe","Yellow zone: rule-out not confirmed","Additional review is required, including symptom timing and all algorithm-specific absolute values and exclusion criteria.");
       }
      }
     }else{
      h+=question(q("confirmation"),5);
      if(selected.confirmation==="yes"){
       h+=zoneOutcome("ruleout","Rule-out pathway: provider-confirmed criteria","The provider has reviewed the approved PATHFAST algorithm, including the actual 1-hour result and all concentration, ECG, symptom and clinical criteria. Follow the authorized clinical plan.");
      }else if(selected.confirmation){
       h+=zoneOutcome("observe","Yellow zone: further review required","A small delta alone cannot establish rule-out. Review the actual repeat concentration and the approved sex- and assay-specific limits with the provider.");
      }
     }
    }
   }
  }
 }
 h+='</div><div class="pcr-flow-foot">These are provider-review categories only. The reference sources disagree on some PATHFAST thresholds, and use of the requested 0/+15-minute window must be approved locally. Do not enter patient identifiers.</div></section>';
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
   const next={};for(const key of ["baseline","timing","delta","risk","onset","confirmation"]){if(key===id)break;if(selected[key])next[key]=selected[key];}
   next[id]=value;selected=next;refresh();return;
  }
  if(ev.target.closest('[data-pcr-reset]')){selected={};refresh();}
 });
}
if(typeof document!=="undefined" && typeof document.addEventListener==="function"){
 document.addEventListener("change",function(ev){
  const input=ev.target && ev.target.closest ? ev.target.closest("#pcr-baseline-input") : null;
  if(!input || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(input.value))return;
  const parts=input.value.split(":").map(Number);
  baselineMinutes=parts[0]*60+parts[1];
  const current=document.getElementById("pcr-serial-timing");
  if(current)current.outerHTML=timing();
 });
}
window.LAB_PATHFAST_EXTRAS={timing,baselinePicker,interference,flow,reset:function(){selected={};},_getSelected:()=>({...selected})};
})();