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
function pills(){
 return '<div class="pfs-screen-meta">REAGENT / CALIBRATION / QC STATUS</div>'+
 '<div class="pfs-status-pills">'+assays.map(function(a){return '<span class="pfs-real-pill available">'+e(a)+'</span>';}).join('')+'</div>';
}
function login(mode){
 return frame("LOG-IN",mode==="patient"?"Step 6 · Operator access":"Step 7 · Operator access",
 '<div class="pfs-login"><div class="pfs-login-mark"><b>PATHFAST</b><span>OPERATOR ACCESS</span></div>'+
 '<div class="pfs-form-row"><label>USER</label><div class="pfs-form-box pfs-click-target">Select User ID'+cue("1 · SELECT")+'</div></div>'+
 '<div class="pfs-form-row"><label>PASSWORD</label><div class="pfs-form-box pfs-click-target">••••••••'+cue("2 · ENTER")+'</div></div>'+
 '<div class="pfs-login-actions"><span class="pfs-click-target">OK'+cue("3 · TAP")+'</span><span>CANCEL</span></div></div>',
 'SELECT USER ID, ENTER PASSWORD AND CONFIRM OK.');
}

function home(analyte,mode,focus){
 const back=focus==="back";
 const body=nav()+'<div class="pfs-home-heading">ASSAY/HOME · REAGENT STATUS</div>'+pills()+
 '<div class="pfs-home-footer"><span class="pfs-back-highlight '+(back?'pfs-click-target':'')+'">◀ BACK'+(back?cue("TAP BACK"):'')+'</span><span>SAMPLE INFO.</span></div>';
 const note='<div class="pfs-external-readiness-note"><div><strong>Verify assay readiness on the actual analyzer.</strong>'+
 '<span>The gray pills are examples only. If an assay is locked or unavailable, stop testing and complete required calibration and QC.</span></div>'+
 '<button type="button" class="pfs-qc-route" data-gotab="cal-qc">Calibration + QC →</button></div>';
 return frame("ASSAY/HOME",back?"Step 8 · Select BACK":"Step 7 · Check assay status",body,
  back?"ASSAY/HOME":"REAGENT STATUS")+note;
}
function menu(mode){
 const cal=mode!=="patient",options=["SAMPLE","QC/SAMPLE","CAL/QC/SAMPLE"];
 const rows=options.map(function(x){const selected=x===(cal?"CAL/QC/SAMPLE":"SAMPLE");return '<div class="pfs-assay-option '+(selected?'target pfs-click-target':'')+'"><span>'+x+'</span>'+(selected?cue("TAP THIS OPTION"):'')+'</div>';}).join('');
 return frame("ASSAY",cal?"Step 9 · Select CAL/QC":"Step 9 · Choose SAMPLE",nav()+
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
 return frame(cal?"CAL/QC INFORMATION":"ASSAY/HOME",cal?"Step 10 · Review CAL/QC lanes":"Step 10 · Open SAMPLE INFO. and choose lane",
 nav()+'<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active '+(!cal?'pfs-click-target':'')+'">SAMPLE INFO.'+(!cal?cue("1 · TAP"):'')+'</span></div>'+
 '<div class="pfs-lanes">'+labs.map(function(x,i){return '<div class="pfs-lane"><span class="pfs-lane-number '+(!cal&&i===0?'pfs-click-target':'')+'"><small>LANE</small>'+(i+1)+(!cal&&i===0?cue("2 · EXAMPLE"):'')+'</span>'+
 '<span class="pfs-lane-assay">'+(cal?(i<4?e(a):"CONTROL"):"PATIENT")+'</span><strong>'+(cal?e(x):"SID: —")+'</strong></div>';}).join('')+'</div>'+
 (!cal?'<div class="pfs-screen-alert">Lane 1 is an example only. Select the lane matching the occupied rack position.</div>':'')+
 foot(cal?"CAL/QC → START":"SAMPLE INFO. → SID → OK"));
}
function sid(){
 return frame("SAMPLE INFO.","Step 11 · Enter and confirm SID",nav()+
 '<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active">SAMPLE INFO.</span></div>'+
 '<div class="pfs-sid-selection"><span>SELECTED LANE</span><strong>Example: lane 1</strong></div>'+
 '<div class="pfs-sid-panel"><strong>PATIENT IDENTIFICATION</strong><div class="pfs-sid-entry"><span>SID</span><div class="pfs-click-target">Enter / scan MRN'+cue("1 · SELECT SID")+'</div></div>'+
 '<div class="pfs-sid-actions"><span class="pfs-click-target">OK'+cue("2 · CONFIRM")+'</span><span>CANCEL</span></div></div>'+
 '<div class="pfs-screen-alert">Verify patient SID and occupied lane on the actual instrument before confirming. The illustrated lane is an example.</div>',
 "ENTER OR SCAN SID, VERIFY AND CONFIRM.");
}
function start(mode){
 const cal=mode==="cal";
 return frame("ASSAY/HOME",cal?"Step 11 · Start CAL/QC":"Step 12 · Start patient assay",
 nav("start")+'<div class="pfs-home-heading">'+(cal?"CAL/QC":"PATIENT SAMPLE")+' · READY TO RUN</div>'+
 '<div class="pfs-start-check"><strong>Check before START</strong><span>Verify assay, specimen IDs, lane assignments and loaded tips on the actual screen.</span></div>'+
 '<div class="pfs-screen-alert">Tap the highlighted START control, then review and confirm the analyzer prompt.</div>',
 "VERIFY ASSIGNMENTS, THEN SELECT START.");
}

function physicalStep(i){
 const stages=[
  ["01","RETRIEVE CARTRIDGES AND PREPARE SPECIMEN","Bring out only the needed assay cartridges when ready; check the assay and expiration. Gently mix the collected lithium-heparin specimen and inspect for clots.","retrieve"],
  ["02","PREPARE METAL RACK AND LOAD CARTRIDGES","Remove the metal six-slot rack from the idle analyzer, set it securely in the clear loading base, then push each required cartridge into its matching rack lane until fully seated.","setup"],
  ["03","DISPENSE PATIENT SAMPLE","Use the correct assay volume and transfer pipette. Deliver mixed lithium-heparin whole blood or plasma into the clear front sample well, confirm specimen fills the molded dome at the bottom to the fill mark, and avoid bubbles. Never add specimen to the round detection well.","dispense"],
  ["04","RETURN RACK AND LOAD DISPOSABLE TIPS","Return the sample-loaded rack to the analyzer. Insert a new tip in each matching active tip holder and confirm the center waste-tip box is seated. Leave the cover open until all consumables have been checked.","tips"],
  ["05","CLOSE THE ANALYZER HOOD","With the cartridge rack, tip holders and center waste box correctly seated, lower the raised hood completely and verify it is closed. Then continue to the analyzer touchscreen.","hood"]
 ];
 const stage=stages[i]||stages[0];
 const art=window.LAB_EQUIPMENT_ART?.pathfastActionVisual;
 const images=stage[3]==="setup"?(art?art("base","patient")+art("rack-empty","patient"):""):
  stage[3]==="tips"?(art?art("rack","patient")+art("tips","patient")+art("assembled","patient"):""):(art?art(stage[3],"patient"):"");
 return '<section class="pfs-reference pfs-prep-reference pf-prep-focused" aria-label="PATHFAST physical preparation step '+(i+1)+'">'+
 '<div class="pfs-heading"><strong>PATHFAST · PHYSICAL PREPARATION</strong><span>Preparation '+(i+1)+' of 5 · Before screen navigation</span></div>'+
 '<div class="pf-prep-focus-head"><span class="pfs-prep-number">'+stage[0]+'</span><div><strong>'+stage[1]+'</strong><p>'+stage[2]+'</p></div></div>'+
 '<div class="pf-prep-illustrations'+(stage[3]==="tips"?" three":stage[3]==="setup"?" two":"")+'">'+images+'</div>'+
 '<p class="pfs-note"><strong>Before continuing:</strong> Verify each cartridge is fully seated in the correct lane, the sample wells match the intended assay, and the required pipette tips are ready.</p></section>';
}
function patientStep(i){
 if(i>=0&&i<=4)return physicalStep(i);
 if(i===5)return login("patient");
 if(i===6)return home("","patient");
 if(i===7)return home("","patient","back");
 if(i===8)return menu("patient");
 if(i===9)return lanes("patient");
 if(i===10)return sid();
 if(i===11)return start("patient");
 if(i===12)return window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual("running","patient"):"";
 if(i===13)return window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual("results","patient"):"";
 return "";
}

window.LAB_PATHFAST_SCREEN={login:login,home:home,menu:menu,item:item,lanes:lanes,sid:sid,start:start,patient:function(){return lanes("patient");},cal:function(a){return lanes("cal",a);},patientStep:patientStep};
})();