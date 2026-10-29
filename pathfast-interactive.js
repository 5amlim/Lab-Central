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
 return String(h%12||12)+":"+String(minute).padStart(2,"0")+" "+(h>=12?"PM":"AM")+(total>=1440?" (next day)":"");
}
function inputTime(total){
 const m=((total%1440)+1440)%1440;
 return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
}
// Editable 12-hour time, while retaining the existing clock field's appearance.
function parseDrawTime(raw, currentPeriod){
 const s=String(raw).trim().toUpperCase().replace(/\./g,"").replace(/\s+/g,"");
 const match=s.match(/^(\d{1,4})(?::(\d{1,2}))?(AM|PM|A|P)?$/);
 if(!match)return null;
 const meridiem=match[3]?match[3].startsWith("A")?"AM":"PM":null;
 let hour, minute;
 if(match[2]!==undefined){hour=Number(match[1]);minute=Number(match[2]);}
 else if(match[1].length>=3){hour=Number(match[1].slice(0,-2));minute=Number(match[1].slice(-2));}
 else{hour=Number(match[1]);minute=0;}
 if(minute>59||hour<0||hour>23)return null;
 if(meridiem){
  if(hour<1||hour>12)return null;
  hour=hour%12+(meridiem==="PM"?12:0);
 }else if(hour<=12){
  const period=currentPeriod||"PM";
  if(hour===0)hour=0;
  else hour=hour%12+(period==="PM"?12:0);
 }
 return hour*60+minute;
}
function baselinePicker(){
 return '<div class="pcr-timing-start pcr-custom-baseline" id="pcr-custom-baseline">'+
 '<span class="pcr-clock">0 h</span><div class="pcr-baseline-text"><strong>Baseline draw</strong><p>Enter the actual first collection time, not the result time.</p></div>'+
 '<label class="pcr-time-input-label" for="pcr-baseline-input"><span>FIRST DRAW TIME</span><span class="pcr-time-input-shell"><input id="pcr-baseline-input" type="text" inputmode="text" maxlength="11" spellcheck="false" autocomplete="off" value="'+displayTime(baselineMinutes)+'" aria-label="First troponin blood collection time" aria-describedby="pcr-time-help" placeholder="12:00 PM"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span><small id="pcr-time-help" class="pcr-time-help">Type 9:15 AM or 13:15. Press Enter.</small></label>'+
 '<div class="pcr-draw-clock-art" aria-hidden="true">'+
 '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pcr-clock-face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#e6f7f5"/></linearGradient></defs>'+
 '<circle cx="50" cy="50" r="42" fill="#d0ede6" opacity=".55"/><circle cx="50" cy="50" r="38" fill="url(#pcr-clock-face)" stroke="#268f82" stroke-width="4"/>'+
 Array.from({length:12},(_,i)=>'<path d="M50 18V25" transform="rotate('+(i*30)+' 50 50)" stroke="#579e98" stroke-width="3" stroke-linecap="round"/>').join("")+
 '<path d="M50 50L50 29M50 50L64 57" stroke="#1c796e" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="5" fill="#1c796e"/>'+
 '</svg><span>DRAW TIME</span></div>'+
 '</div>';
}
function timing(){
 const base=displayTime(baselineMinutes);
 const one=displayTime(baselineMinutes+60),one15=displayTime(baselineMinutes+75);
 const two=displayTime(baselineMinutes+120),two15=displayTime(baselineMinutes+135);
 const row=(name,minutes,target,windowEnd,windowText,extra,alt)=>'<div class="pcr-timing-row'+(alt?' secondary':'')+'">'+
  '<div class="pcr-timing-path"><span class="pcr-time-badge'+(alt?' alt':'')+'">'+name+'</span><strong>'+minutes+' minutes</strong></div>'+
  '<div class="pcr-timing-value"><span>TARGET DRAW</span><strong>'+target+'</strong></div>'+
  '<div class="pcr-timing-value"><span>COLLECTION WINDOW</span><strong>'+target+'–'+windowEnd+'</strong><small>'+windowText+'</small></div>'+
  (extra?'<p class="pcr-timing-extra">'+extra+'</p>':'')+'</div>';
 return '<div id="pcr-serial-timing" class="pcr-timing-compact">'+
  '<div class="pcr-timing-summary"><strong>Repeat collection from the first draw ('+base+')</strong>'+
  '<p>Never draw early. The +15-minute allowance must be approved locally for assay-specific delta interpretation.</p></div>'+
  '<div class="pcr-timing-rows">'+
  '<div class="pcr-primary-timing-label">STANDARD PATHWAY · 0/1 HOUR</div>'+
  row('0/1 HOUR','60',one,one15,'60–75 min from baseline','Default repeat. Set the 60-minute draw timer from the first collection.','')+
  '</div>'+
  '<details class="pcr-fallback-timing"><summary><span>Missed the 1-hour window?</span><strong>View provider-authorized 0/2-hour fallback</strong><span class="pcr-fallback-action"><span class="pcr-fallback-show">Show more</span><span class="pcr-fallback-hide">Show less</span><span class="pcr-fallback-chevron lab-shared-chevron" aria-hidden="true"></span></span></summary>'+
  row('0/2 HOUR','120',two,two15,'120–135 min from baseline','Only if the approved 1-hour window was missed. Notify the provider and obtain authorization before changing pathways.','alt')+
  '</details>'+
  '<div class="pcr-timing-footnote"><strong>Outside the authorized window?</strong> Record the actual collection time, notify the provider, and follow the approved alternative plan. Do not classify the sample as an in-window timed delta.</div>'+
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
 {id:"baseline",title:"Initial PATHFAST hs-Troponin I result",opts:[["low","Below 4 ng/L"],["middle","4 to below 90 ng/L"],["high","90 ng/L or above"]]},
 {id:"twoHourTiming",title:"2-hour repeat collection status",opts:[["yes","Collected within the approved 2-hour window","Document the actual collection time and confirm it meets the approved timing criteria."],["pending","2-hour draw not yet collected","Schedule the repeat for 2 hours after the baseline collection time."],["late","Missed the approved 2-hour window","Notify the provider. Do not apply an out-of-window 0/2-hour delta."]]},
 {id:"twoHourResult",title:"Review the 2-hour hs-Troponin I result",opts:[["ruleout","Both values and the 2-hour delta meet approved rule-out criteria","Verify the absolute baseline and repeat concentrations, 2-hour change, actual collection times, ECG and clinical exclusions."],["observe","Observation range or indeterminate result","Continue clinician assessment and any further testing required by the approved protocol."],["rulein","Approved urgent / rule-in criteria met","Immediate provider evaluation using the assay-specific thresholds and ECG / symptoms."],["unknown","Result, delta or threshold not yet verified","Confirm the repeat concentration, exact delta and approved 0/2-hour limits before classification."]]},
 {id:"timing",title:"1-hour repeat collection status",opts:[["yes","Collected within the approved 1-hour window","Document the actual repeat draw time measured from the first collection."],["no","Missed the 1-hour window","Notify the provider. Switch to the approved 0/2-hour pathway if directed."],["pending","Repeat sample not collected yet","Plan the 1-hour draw relative to the baseline collection time."]]},
 {id:"fallbackApproval",title:"After a missed 1-hour window, did the provider authorize the 0/2-hour fallback?",opts:[["yes","Yes, provider informed and authorized 0/2-hour repeat"],["notInformed","No, provider has not been informed"]]},
 {id:"delta",title:"Change in PATHFAST hs-Troponin I at 1 hour",opts:[["small","Less than 3 ng/L"],["middle","3 to below 20 ng/L"],["large","20 ng/L or greater"],["unknown","Delta unavailable"]]},
 {id:"risk",title:"Clinical assessment · ECG and HEART score",opts:[["low","HEART score ≤3, reassuring ECG, no concerning findings"],["concerning","Concerning ECG, HEART score >3, symptoms, or other concern"],["unknown","Clinical assessment incomplete"]]},
 {id:"onset",title:"Time since symptom onset at the initial blood draw",opts:[["late","More than 3 hours"],["early","3 hours or less"],["unknown","Uncertain or unknown"]]},
 {id:"confirmation",title:"Provider verification of approved rule-out criteria",opts:[["yes","All protocol criteria confirmed"],["no","One or more criteria not met"],["pending","Review still in progress"]]}
];
let selected={pathway:"one"};
function ruleoutCriteria(){
 const items=[
  ["ECG","No new ischemic changes; review the full clinical presentation."],
  ["Clinical risk","HEART score and other risk findings satisfy the approved pathway."],
  ["Baseline value","Initial PATHFAST hs-cTnI meets the approved assay-specific threshold."],
  ["Repeat result","Actual repeat hs-cTnI concentration and its delta meet the applicable cutoff."],
  ["Timing","Confirm draw times; check symptom onset (≥3 h for single-draw rule-out, if authorized)."],
  ["Exclusions / plan","No overriding concerning features; provider confirms next steps and follow-up."]
 ];
 return '<div class="pcr-ruleout-review" role="note" aria-label="Provider rule-out verification criteria">'+
 '<div class="pcr-ruleout-review-head"><strong>Criteria to verify before confirming</strong><span>Provider review · Refer to approved protocol</span></div>'+
 '<div class="pcr-ruleout-review-grid">'+items.map(([name,detail])=>'<div class="pcr-ruleout-review-item"><span class="pcr-review-open-dot" aria-hidden="true"></span><div><b>'+esc(name)+'</b><p>'+esc(detail)+'</p></div></div>').join('')+'</div>'+
 '<p class="pcr-ruleout-review-note"><strong>Threshold approval:</strong> The existing PATHFAST references do not agree on every absolute cutoff or delta boundary. Do not use draft values or a small delta alone for rule-out. Apply the medical-director-approved, assay-specific pathway.</p>'+
 '</div>';
}
function question(q,index){
 const twoHour=q.id==="twoHourResult";
 return '<div class="pcr-flow-question'+(twoHour?' pcr-two-hour-question':'')+'"><div class="pcr-flow-question-header"><span class="pcr-flow-number">'+index+'</span><strong>'+esc(q.title)+'</strong></div>'+
 (q.id==="confirmation"?ruleoutCriteria():"")+
 '<div class="pcr-flow-options" role="group" aria-label="'+esc(q.title)+'">'+q.opts.map(([value,label,description])=>
 '<button type="button" class="pcr-flow-option '+(selected[q.id]===value?'selected':'')+'" data-pcr-choice="'+q.id+'" data-pcr-value="'+value+'" aria-pressed="'+(selected[q.id]===value)+'">'+
 (twoHour
 ?'<span class="pcr-result-option-header"><strong>'+esc(label)+'</strong><span class="pcr-result-selected" aria-hidden="true">'+(selected[q.id]===value?'✓':'')+'</span></span><span class="pcr-result-option-body">'+(description?esc(description):'')+'</span>'
 :esc(label)+(description?'<small class="pcr-flow-choice-note">'+esc(description)+'</small>':'')+(selected[q.id]===value?' ✓':''))+
 '</button>').join('')+'</div></div>';
}
function zoneOutcome(zone,title,explanation,nextAction){
 const zones=[
  {id:"ruleout",label:"RULE-OUT",detail:"Low-risk pathway"},
  {id:"observe",label:"YELLOW ZONE",detail:"Observe / review"},
  {id:"rulein",label:"RULE-IN",detail:"Urgent evaluation"}
 ];
 const actionBlock=nextAction?'<div class="pcr-provider-action" role="note"><strong>'+esc(nextAction.title)+'</strong><ol>'+nextAction.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol></div>':'';
 return '<section class="pcr-zone-outcome '+zone+'" role="status" aria-label="Pathway reference endpoint: '+esc(title)+'">'+
  '<span class="pcr-zone-eyebrow">APPROVED PATHWAYS · PROVIDER REVIEW</span>'+
  '<div class="pcr-zone-options">'+zones.map(x=>'<div class="pcr-zone-choice '+x.id+(x.id===zone?' active':' inactive')+'" '+(x.id===zone?'aria-current="step"':'')+'><strong>'+x.label+'</strong><small>'+x.detail+'</small></div>').join('')+'</div>'+
  '<h4>'+esc(title)+'</h4><p>'+esc(explanation)+'</p>'+actionBlock+
  '<div class="pcr-zone-caution">Provisional pathway reference, not an MI diagnosis or discharge/transfer order. Follow the current approved PATHFAST assay-specific algorithm, ECG and clinical assessment. Verify site-approved assay cutoffs, clinical criteria and allowed collection timing before using this pathway.</div>'+
  '</section>';
}
function flow(){
 const q=id=>questions.find(x=>x.id===id);
 let h='<section class="pcr-flow-explorer" aria-label="PATHFAST hs-Troponin I approved pathway decision flow">'+
 '<div class="pcr-flow-head"><div><span class="pcr-eyebrow">PATHFAST hs-cTnI · PROVIDER DECISION SUPPORT</span><h3>0/1-hour hs-Troponin I pathway</h3>'+
 '<p>Start with the standard 0/1-hour pathway. Confirm actual blood draw times, both hs-Troponin I results, the 1-hour change (delta), ECG and clinical findings before making any decision.</p></div>'+
 '<button type="button" data-pcr-reset class="pcr-flow-reset">↻ Reset pathway</button></div>'+
 '<div class="pcr-secondary-note pcr-fallback-only" role="note"><div><strong>Standard pathway: 0/1 hour</strong><p>Do not begin with 0/2 hours. Use the 2-hour fallback only after the approved 1-hour window is missed and the provider authorizes the change.</p></div></div>'+
 '<div class="pcr-flow-spine">'+question(q("baseline"),1);
 function outcome(zone,title,explanation,next){h+=zoneOutcome(zone,title,explanation,next);}
 function providerClose(number,mode){
  h+=question(q("risk"),number);
  if(selected.risk==="concerning")return outcome("observe","Provider review · clinical concerns","An acceptable troponin delta does not override concerning symptoms, ECG changes or a higher clinical risk score.");
  if(selected.risk==="unknown")return outcome("observe","Clinical assessment incomplete","Review the ECG, HEART score and clinical presentation before applying a rule-out pathway.");
  if(selected.risk!=="low")return;
  h+=question(q("onset"),number+1);
  if(selected.onset==="unknown")return outcome("observe","Confirm symptom onset","Symptom timing must be verified. Single-sample rule-out criteria, where authorized, are not appropriate for an unknown onset.");
  if(!selected.onset)return;
  h+=question(q("confirmation"),number+2);
  if(selected.confirmation==="yes")outcome("ruleout",mode+" · provider-confirmed rule-out review","The treating provider confirms all approved PATHFAST hs-cTnI requirements, serial value/delta limits, ECG and clinical exclusions. This is not a discharge order.");
  else if(selected.confirmation)outcome("observe","Approved rule-out criteria not fully verified","Continue clinician assessment using the approved assay-specific decision pathway.");
 }
 function twoHourBranch(number,reason){
  h+='<div class="pcr-flow-transition"><span class="pcr-transition-icon">2h</span><div><strong>0/2-hour hs-Troponin I pathway</strong><p>'+esc(reason||"Missed one-hour window. Use the baseline draw time to schedule a provider-approved repeat.")+'</p></div></div>';
  h+=question(q("twoHourTiming"),number);
  if(selected.twoHourTiming==="late")return outcome("observe","2-hour collection window missed","Record the actual collection time and notify the provider. Do not apply a 0/2-hour delta cutoff outside its authorized timing window.");
  if(selected.twoHourTiming==="pending")return outcome("observe","2-hour sample pending","Collect at 120 minutes from the original baseline, or within an explicitly approved timing allowance. Record the actual collection time.");
  if(selected.twoHourTiming!=="yes")return;
  h+=question(q("twoHourResult"),number+1);
  if(selected.twoHourResult==="rulein")return outcome("rulein","0/2-hour pathway · urgent provider assessment","The provider has identified assay-specific criteria requiring urgent evaluation. Review both measurements, ECG and clinical features.");
  if(selected.twoHourResult==="observe")return outcome("observe","0/2-hour pathway · further evaluation","The two-hour result requires observation or additional clinical assessment per the site-approved pathway.");
  if(selected.twoHourResult==="unknown")return outcome("observe","0/2-hour interpretation pending","Verify the actual 2-hour hs-cTnI value, delta and laboratory-approved PATHFAST thresholds.");
  if(selected.twoHourResult==="ruleout")providerClose(number+2,"0/2-hour");
 }
 if(selected.baseline==="high"){
  outcome("rulein","Urgent provider evaluation","The site's reference flags a baseline PATHFAST hs-Troponin I at or above 90 ng/L for urgent review. Troponin elevation alone is not an MI diagnosis.");
 }else if(selected.baseline){
  h+=question(q("timing"),2);
  if(selected.timing==="no"){
   h+=question(q("fallbackApproval"),3);
   if(selected.fallbackApproval==="yes")twoHourBranch(4,"The approved 1-hour collection window was missed, and the provider authorized switching to the 0/2-hour fallback.");
   else if(selected.fallbackApproval==="notInformed"){
    h+='<div class="pcr-provider-notification" role="alert"><span class="pcr-provider-notification-label">ACTION REQUIRED</span>'+
     '<strong>Inform the provider now</strong>'+
     '<p>The approved 1-hour collection window was missed. Notify the provider, document the actual collection times, and obtain direction. Do not switch to the 0/2-hour pathway unless the provider authorizes it.</p></div>';
   }
  }else if(selected.timing==="pending"){
   outcome("observe","One-hour sample pending","Coordinate the 60-minute draw with the RN. If the approved window is missed, request provider authorization for a 0/2-hour fallback.");
  }else if(selected.timing==="yes"){
   h+=question(q("delta"),3);
    if(selected.delta==="large"){
     outcome("rulein","1-hour pathway · urgent provider evaluation","The site's draft reference flags a large one-hour delta for urgent evaluation. Confirm the approved limits, ECG and clinical findings.");
    }else if(selected.delta==="middle"){
     outcome("observe","1-hour pathway · observe or consult","A one-hour delta in the intermediate range requires provider review and possibly additional assessment or timed testing.");
    }else if(selected.delta==="unknown"){
     outcome("observe","One-hour delta unavailable","Verify both hs-cTnI values and the actual draw times before applying an approved pathway.");
    }else if(selected.delta==="small"){
     providerClose(4,"0/1-hour");
    }
   }
 }
 h+='</div><div class="pcr-flow-foot"><span class="pcr-flow-foot-icon">i</span><span>Clinical review only. The approved 0/1-hour and 0/2-hour PATHFAST hs-cTnI algorithms require their own assay-specific concentration and delta limits. Use the approved collection window, record actual draw times and notify the provider of missed windows.</span></div></section>';
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
   const next={pathway:"one"};for(const key of ["baseline","timing","fallbackApproval","twoHourTiming","twoHourResult","delta","risk","onset","confirmation"]){if(key===id)break;if(selected[key])next[key]=selected[key];}
   next[id]=value;selected=next;refresh();return;
  }
  if(ev.target.closest('[data-pcr-reset]')){selected={pathway:"one"};refresh();}
 });
}
if(typeof document!=="undefined" && typeof document.addEventListener==="function"){
 // Click to select the time and type directly. Enter commits; Escape restores.
 document.addEventListener("focusin",function(ev){
  if(ev.target&&ev.target.id==="pcr-baseline-input"&&typeof ev.target.select==="function")ev.target.select();
 });
 document.addEventListener("keydown",function(ev){
  if(!ev.target||ev.target.id!=="pcr-baseline-input")return;
  if(ev.key==="Enter"){ev.preventDefault();ev.target.blur();}
  if(ev.key==="Escape"){ev.target.value=displayTime(baselineMinutes);ev.target.blur();}
 });
 document.addEventListener("change",function(ev){
  const input=ev.target && ev.target.closest ? ev.target.closest("#pcr-baseline-input") : null;
  if(!input)return;
  const candidate=parseDrawTime(input.value,baselineMinutes>=720?"PM":"AM");
  if(candidate===null){
   input.value=displayTime(baselineMinutes);
   const help=document.getElementById("pcr-time-help");
   if(help)help.textContent="Invalid time. Try 9:15 AM or 13:15.";
   return;
  }
  baselineMinutes=candidate;
  input.value=displayTime(candidate);
  const help=document.getElementById("pcr-time-help");
  if(help)help.textContent="Type 9:15 AM or 13:15. Press Enter.";
  const current=document.getElementById("pcr-serial-timing");
  if(current)current.outerHTML=timing();
 });
}
window.LAB_PATHFAST_EXTRAS={timing,baselinePicker,interference,flow,reset:function(){selected={pathway:'one'};},_getSelected:()=>({...selected})};
})();