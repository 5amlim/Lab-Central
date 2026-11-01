/* PATHFAST touchscreen teaching diagrams.
   Modeled on PHC PATHFAST Operator's Manual, Rev 4.70EN, sections 5.5, 5.6, 6.2, 8.5.
   Static illustrative UI. The analyzer display and menu labels can vary by configuration. */
(function(){
"use strict";
function e(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
const assays=["hs-Troponin I","NT-proBNP","D-dimer"];
function frame(name,label,body,msg){
 const targets=body.includes("pfs-click-target");
 return '<section class="pfs-reference pfs-rebuilt" aria-label="'+e(label)+' touchscreen reference">'+
 '<div class="pfs-heading"><strong>PATHFAST · SCREEN REFERENCE</strong><span>'+e(label)+'</span></div>'+
 '<div class="pfs-shell"><div class="pfs-blue-bar">'+e(name)+'</div><div class="pfs-status"><span>'+e(msg||"PUSH START BUTTON TO ASSAY.")+'</span><span>ILLUSTRATION</span></div>'+body+'</div>'+
 (targets?'<div class="pfs-target-legend"><i></i> Green outline: select this control on the actual analyzer.</div>':'')+
 '<p class="pfs-note">Training illustration only. Follow the actual analyzer display and approved SOP; labels may vary by software version.</p></section>';
}
function cue(t){return '<b class="pfs-target-cue">'+e(t||"TAP")+'</b>';}

function nav(focus){
 return '<div class="pfs-toolbar"><span class="pfs-navbtn primary '+(focus==="start"?"pfs-click-target":"")+'">▶ START'+(focus==="start"?cue("TAP"):"")+'</span><span class="pfs-navbtn">CHECK</span><span class="pfs-navbtn">SETUP</span><span class="pfs-navbtn">ADMIN</span></div>';
}

function foot(text){return '<div class="pfs-footer"><span>◀ BACK</span><span>'+e(text||"ASSAY")+'</span></div>';}
function pills(mode){
 const example=mode==="patient";
 return '<div class="pfs-screen-meta">REAGENT / CALIBRATION / QC STATUS</div>'+
 '<div class="pfs-status-pills">'+assays.map(function(a,i){
  const notReady=example&&i===0;
  return '<span class="pfs-real-pill '+(notReady?'locked':'available')+'"'+(notReady?' aria-label="'+e(a)+': pink, calibration and quality control required"':'')+'>'+e(a)+'</span>';
 }).join('')+'</div>'+
 (example?'<div class="pfs-pink-status-caption"><span class="pfs-pink-status-mark" aria-hidden="true"></span><strong>Example: pink hs-Troponin I = NOT READY</strong><span>Run calibration and quality control before patient testing. Do not test patients using a pink / locked assay.</span></div>':'');
}
function login(mode){
 return frame("LOG-IN",mode==="patient"?"Step 7 · Operator access":"Step 7 · Operator access",
 '<div class="pfs-login"><div class="pfs-login-mark"><b>PATHFAST</b><span>OPERATOR ACCESS</span></div>'+
 '<div class="pfs-form-row"><label>USER</label><div class="pfs-form-box pfs-click-target">Select User ID'+cue("1 · SELECT")+'</div></div>'+
 '<div class="pfs-form-row"><label>PASSWORD</label><div class="pfs-form-box pfs-click-target">••••••••'+cue("2 · ENTER")+'</div></div>'+
 '<div class="pfs-login-actions"><span class="pfs-click-target">OK'+cue("3 · TAP")+'</span><span>CANCEL</span></div></div>',
 'SELECT USER ID, ENTER PASSWORD AND CONFIRM OK.');
}

function home(analyte,mode,focus){
 const back=focus==="back";
 const body=nav()+'<div class="pfs-home-heading">ASSAY/HOME · REAGENT STATUS</div>'+pills(mode)+
 '<div class="pfs-home-footer"><span class="pfs-back-highlight '+(back?'pfs-click-target':'')+'">◀ BACK'+(back?cue("TAP BACK"):'')+'</span><span>SAMPLE INFO.</span></div>';
 const note=mode==="patient"?'<div class="pfs-external-readiness-note"><div><strong>Verify assay readiness on the actual analyzer.</strong>'+
 '<span><b>Pink = NOT READY.</b> Required calibration and QC must be run and accepted before patient testing. Pink hs-Troponin I is a training example, not the current status of the actual analyzer. Check the selected assay on the instrument.</span></div>'+
 '<button type="button" class="pfs-qc-route" data-gotab="cal-qc">Calibration + QC →</button></div>':'';
 return frame("ASSAY/HOME",back?"Step 9 · Select BACK":"Step 8 · Check assay status",body,
  back?"ASSAY/HOME":"REAGENT STATUS")+note;
}
function menu(mode){
 const cal=mode!=="patient",options=["SAMPLE","QC/SAMPLE","CAL/QC/SAMPLE"];
 const rows=options.map(function(x){const selected=x===(cal?"CAL/QC/SAMPLE":"SAMPLE");return '<div class="pfs-assay-option '+(selected?'target pfs-click-target':'')+'"><span>'+x+'</span>'+(selected?cue("TAP THIS OPTION"):'')+'</div>';}).join('');
 return frame("ASSAY",cal?"Step 9 · Select CAL/QC":"Step 10 · Choose SAMPLE",nav()+
 '<div class="pfs-menu-caption">SELECT OPERATION</div><div class="pfs-assay-options">'+rows+'</div>'+
 '<div class="pfs-screen-alert">'+(cal?'Choose CAL/QC/SAMPLE, or CAL/QC if shown on the analyzer with QC Lockout ON.':'Choose SAMPLE to enter patient information.')+'</div>'+foot("ASSAY / SELECT OPERATION"));
}

function item(analyte){
 return frame("CAL/QC","Step 9 · Select assay",'<div class="pfs-item-caption">SELECT ITEM.</div><div class="pfs-item-list">'+
 assays.map(function(a){const selected=a===analyte;return '<div class="pfs-item-option '+(selected?'target pfs-click-target':'')+'">'+e(a)+(selected?cue("1 · SELECT"):'')+'</div>';}).join('')+
 '</div><div class="pfs-item-actions"><span class="pfs-click-target">OK'+cue("2 · TAP")+'</span><span>CANCEL</span></div>',
 "SELECT ASSAY AND CONFIRM OK.");
}

function lanes(mode,analyte){
 const cal=mode!=="patient",a=analyte||"hs-Troponin I",labs=cal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:Array(6).fill("SAMPLE");
 return frame(cal?"CAL/QC INFORMATION":"ASSAY/HOME",cal?"Step 10 · Review CAL/QC lanes":"Step 11 · Tap the occupied lane directly",
 nav()+'<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active">SAMPLE INFO.</span></div>'+
 '<div class="pfs-lanes">'+labs.map(function(x,i){return '<div class="pfs-lane '+(!cal&&i===0?'pfs-lane-tap-example':'')+'"><span class="pfs-lane-number '+(!cal&&i===0?'pfs-click-target':'')+'"><small>LANE</small>'+(i+1)+(!cal&&i===0?cue("TAP LANE"):'')+'</span>'+
 '<span class="pfs-lane-assay">'+(cal?(i<4?e(a):"CONTROL"):"PATIENT")+'</span><strong>'+(cal?e(x):"SID: —")+'</strong></div>';}).join('')+'</div>'+
 (!cal?'<div class="pfs-screen-alert">Tap the occupied lane number directly. Lane 1 is a training example only. Do not tap SAMPLE INFO.; verify the selected lane matches the patient cartridge before entering SID.</div>':'')+
 foot(cal?"CAL/QC → START":"TAP LANE → SID → OK"));
}
function sid(){
 return frame("SAMPLE INFO.","Step 12 · Enter and confirm SID",nav()+
 '<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active">SAMPLE INFO.</span></div>'+
 '<div class="pfs-sid-selection"><span>SELECTED LANE</span><strong>Example: lane 1</strong></div>'+
 '<div class="pfs-sid-panel"><strong>PATIENT IDENTIFICATION</strong><div class="pfs-sid-entry"><span>SID</span><div class="pfs-click-target">Enter / scan MRN'+cue("1 · SELECT SID")+'</div></div>'+
 '<div class="pfs-sid-actions"><span class="pfs-click-target">OK'+cue("2 · CONFIRM")+'</span><span>CANCEL</span></div></div>'+
 '<div class="pfs-screen-alert">Verify patient SID and occupied lane on the actual instrument before confirming. The illustrated lane is an example.</div>',
 "ENTER OR SCAN SID, VERIFY AND CONFIRM.");
}
function start(mode){
 const cal=mode==="cal";
 return frame("ASSAY/HOME",cal?"Step 11 · Start CAL/QC":"Step 13 · Start patient assay",
 nav("start")+'<div class="pfs-home-heading">'+(cal?"CAL/QC":"PATIENT SAMPLE")+' · READY TO RUN</div>'+
 '<div class="pfs-start-check"><strong>Check before START</strong><span>Verify assay, specimen IDs, lane assignments and loaded tips on the actual screen.</span></div>'+
 '<div class="pfs-screen-alert">Tap the highlighted START control, then review and confirm the analyzer prompt.</div>',
 "VERIFY ASSIGNMENTS, THEN SELECT START.");
}


/* First patient-testing action: identify the correctly timed physical tube.
   Example times only, never a substitute for the actual collection label. */
function specimenVerificationArt(){
 const tube=function(tag,title,time,kind){
  return '<div class="pf-serial-tube-card '+kind+'">'+
   '<div class="pf-serial-tube-top"><strong>'+tag+'</strong><span>'+title+'</span></div>'+
   '<svg viewBox="0 0 210 240" role="img" aria-label="Illustration of a green-top lithium-heparin blood tube with a specimen label and collection time">'+
   '<ellipse cx="105" cy="218" rx="51" ry="7" fill="#dce9ed"/>'+
   '<rect x="74" y="25" width="62" height="34" rx="9" fill="#16855e" stroke="#0d654a" stroke-width="3"/>'+
   '<path d="M80 57H130L126 188Q124 205 105 210Q86 205 84 188Z" fill="#f7fcfd" stroke="#8eacb9" stroke-width="3"/>'+
   '<path d="M87 149H123L121 188Q114 202 105 203Q94 201 89 188Z" fill="#b95a63" opacity=".81"/>'+
   '<rect x="85" y="78" width="40" height="64" rx="4" fill="#fff" stroke="#b9d5de"/>'+
   '<text x="105" y="93" text-anchor="middle" font-family="Arial,sans-serif" font-size="9.5" font-weight="800" fill="#267d73">Li-HEP</text>'+
   '<path d="M91 101H119M91 106H119M91 111H115" stroke="#83a4b0" stroke-width="2"/>'+
   '<rect x="90" y="116" width="30" height="15" rx="3" fill="#e2f2f3"/>'+
   '<text x="105" y="127" text-anchor="middle" font-family="Arial,sans-serif" font-size="9.8" font-weight="900" fill="#286a79">'+tag+'</text>'+
   '<path d="M88 65H121" stroke="#fff" stroke-width="3" opacity=".72"/>'+
   '</svg>'+
   '<div class="pf-serial-time"><span>Example collected</span><strong>'+time+'</strong></div>'+
   '</div>';
 };
 return '<figure class="pf-action-figure pf-serial-figure">'+
  '<div class="pf-action-heading">MATCH THE SPECIMEN LABEL TO THE ORDER AND ACTUAL DRAW TIME</div>'+
  '<div class="pf-serial-visual">'+
   tube('0 h','Baseline tube','9:00 AM','baseline')+
   tube('1 h','Standard repeat','10:00 AM','repeat')+
   tube('2 h','Authorized fallback','11:00 AM','fallback')+
  '</div>'+
  '<figcaption><strong>Illustrative times only.</strong> The 0 h specimen establishes the baseline. Compare it with the correctly timed 1 h repeat, or the provider-authorized 2 h fallback if the 1 h window was missed. The actual specimen collection time, not analyzer run time, determines the interval.</figcaption>'+
  '</figure>'+
  '<div class="pf-serial-safety"><strong>Before opening a cartridge</strong><ul>'+
   '<li><b>Match the patient.</b> Verify two identifiers against the order, the labeled tube and the correct assay.</li>'+
   '<li><b>Confirm the timepoint.</b> Read the documented collection date/time for 0 h, 1 h or 2 h. Do not use receipt, processing or result time.</li>'+
   '<li><b>Check the pathway.</b> Default to the approved 0/1 h hs-Troponin I pathway. If that window was missed, confirm the provider-authorized 0/2 h plan. Only the approved window qualifies for that timed delta.</li>'+
   '<li><b>Hold and clarify discrepancies.</b> If identification, label, collection time or intended serial draw is missing or inconsistent, do not guess or interchange tubes. Contact the collecting RN/provider.</li>'+
  '</ul><p>Serial delta timing applies to <b>hs-Troponin I</b>. For NT-proBNP and D-dimer, verify the ordered assay and matching specimen without assigning a troponin serial timepoint.</p></div>';
}

function physicalStep(i){
 const stages=[
  ["01","VERIFY THE CORRECT TUBE AND DRAW TIME","Before preparing cartridges, match the labeled lithium-heparin tube to the patient, ordered assay and documented collection time. For serial hs-Troponin I, verify baseline versus the 1-hour repeat or provider-authorized 2-hour fallback.","verify-tube"],
  ["02","RETRIEVE CARTRIDGES AND PREPARE SPECIMEN","Bring out only the needed assay cartridges when ready; check the assay and expiration. Gently mix the collected lithium-heparin specimen and inspect for clots.","retrieve"],
  ["03","PREPARE METAL RACK AND LOAD CARTRIDGES","Remove the metal six-slot rack from the idle analyzer, set it securely in the clear loading base, then push each required cartridge into its matching rack lane until fully seated.","setup"],
  ["04","DISPENSE PATIENT SAMPLE","Use the correct assay volume and transfer pipette. Deliver mixed lithium-heparin whole blood or plasma into the clear front sample well, confirm specimen fills the molded dome at the bottom to the fill mark, and avoid bubbles. Never add specimen to the round detection well.","dispense"],
  ["05","RETURN RACK AND LOAD DISPOSABLE TIPS","Return the sample-loaded rack to the analyzer. Insert a new tip in each matching active tip holder and confirm the center waste-tip box is seated. Leave the cover open until all consumables have been checked.","tips"],
  ["06","CLOSE THE ANALYZER HOOD","With the cartridge rack, tip holders and center waste box correctly seated, lower the raised hood completely and verify it is closed. Then continue to the analyzer touchscreen.","hood"]
 ];
 const stage=stages[i]||stages[0];
 const art=window.LAB_EQUIPMENT_ART?.pathfastActionVisual;
 const images=stage[3]==="verify-tube"?specimenVerificationArt():stage[3]==="setup"?(art?art("base","patient")+art("rack-empty","patient"):""):
  stage[3]==="tips"?(art?art("rack","patient")+art("tips","patient")+art("assembled","patient"):""):(art?art(stage[3],"patient"):"");
 return '<section class="pfs-reference pfs-prep-reference pf-prep-focused" aria-label="PATHFAST physical preparation step '+(i+1)+'">'+
 '<div class="pfs-heading"><strong>PATHFAST · PHYSICAL PREPARATION</strong><span>Preparation '+(i+1)+' of 6 · Before screen navigation</span></div>'+
 '<div class="pf-prep-focus-head"><span class="pfs-prep-number">'+stage[0]+'</span><div><strong>'+stage[1]+'</strong><p>'+stage[2]+'</p></div></div>'+
 '<div class="pf-prep-illustrations'+(stage[3]==="tips"?" three":stage[3]==="setup"?" two":"")+'">'+images+'</div>'+
 (stage[3]==="verify-tube"?"":'<p class="pfs-note"><strong>Before continuing:</strong> Verify each cartridge is fully seated in the correct lane, the sample wells match the intended assay, and the required pipette tips are ready.</p>')+'</section>';
}
function patientStep(i){
 if(i>=0&&i<=5)return physicalStep(i);
 if(i===6)return login("patient");
 if(i===7)return home("","patient");
 if(i===8)return home("","patient","back");
 if(i===9)return menu("patient");
 if(i===10)return lanes("patient");
 if(i===11)return sid();
 if(i===12)return start("patient");
 if(i===13)return window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual("running","patient"):"";
 if(i===14)return window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual("results","patient"):"";
 return "";
}

window.LAB_PATHFAST_SCREEN={login:login,home:home,menu:menu,item:item,lanes:lanes,sid:sid,start:start,patient:function(){return lanes("patient");},cal:function(a){return lanes("cal",a);},patientStep:patientStep};
})();