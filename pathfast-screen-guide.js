/* PATHFAST touchscreen teaching diagrams.
   Modeled on PHC PATHFAST Operator's Manual, Rev 4.70EN, sections 5.5, 5.6, 6.2, 8.5.
   Static illustrative UI. The analyzer display and menu labels can vary by configuration. */
(function(){
"use strict";
function e(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
const assays=["hs-Troponin I","NT-proBNP","D-dimer"];
function frame(name,label,body,msg){
 return '<section class="pfs-reference pfs-rebuilt" aria-label="'+e(label)+' touchscreen reference">'+
 '<div class="pfs-heading"><strong>PATHFAST · SCREEN REFERENCE</strong><span>'+e(label)+'</span></div>'+
 '<div class="pfs-shell"><div class="pfs-blue-bar">'+e(name)+'</div>'+
 '<div class="pfs-status"><span>'+e(msg||"PUSH START BUTTON TO ASSAY.")+'</span><span>ILLUSTRATION</span></div>'+body+'</div>'+
 '<p class="pfs-note">Illustrated from the PATHFAST operator screen layout. Refer to the screen on the analyzer for the current software configuration.</p></section>';
}
function nav(){return '<div class="pfs-toolbar"><span class="pfs-navbtn primary">▶ START</span><span class="pfs-navbtn">CHECK</span><span class="pfs-navbtn">SETUP</span><span class="pfs-navbtn">ADMIN</span></div>';}
function foot(text){return '<div class="pfs-footer"><span>◀ BACK</span><span>'+e(text||"ASSAY")+'</span></div>';}
function pills(selected,locked){
 return '<div class="pfs-screen-meta">REAGENT / CALIBRATION / QC STATUS</div>'+
 '<div class="pfs-status-pills">'+assays.map(function(a){
 const pink=locked&&a===selected;
 return '<span class="pfs-real-pill '+(pink?'locked':'available')+'">'+e(a)+'</span>';
 }).join('')+'</div>';
}
function login(){
 return frame("LOG-IN","Step 1 · Operator access",
 '<div class="pfs-login"><div class="pfs-login-mark"><b>PATHFAST</b><span>OPERATOR ACCESS</span></div>'+
 '<div class="pfs-form-row"><label>USER</label><div class="pfs-form-box">Select User ID <b>⌄</b></div></div>'+
 '<div class="pfs-form-row"><label>PASSWORD</label><div class="pfs-form-box">••••••••</div></div>'+
 '<div class="pfs-login-actions"><span>OK</span><span>CANCEL</span></div></div>',
 'SELECT USER ID AND ENTER PASSWORD.');
}
function home(analyte,mode){
 const cal=mode!=="patient",wanted=cal?analyte:"";
 const body=nav()+'<div class="pfs-home-heading">ASSAY/HOME · REAGENT STATUS</div>'+
 pills(wanted,cal)+
 '<div class="pfs-status-callout '+(cal?'overdue':'ready')+'">'+
 (cal?'<strong>Selected assay: pink</strong><span>CAL/QC expired or locked. Other assays shown in gray.</span>':
 '<strong>Assay availability</strong><span>Confirm the selected assay is gray / ready before loading patient samples.</span>')+'</div>'+
 '<div class="pfs-home-footer"><span class="pfs-back-highlight">◀ BACK</span><span>SAMPLE INFO.</span></div>';
 return frame("ASSAY/HOME","Step 2 · Status pills",body,"CHECK CAL/QC STATUS BEFORE TESTING.");
}
function menu(mode){
 const iscal=mode!=="patient";
 const menuOpts=[{id:"SAMPLE",label:"SAMPLE"},{id:"QC/SAMPLE",label:"QC/SAMPLE"},{id:"CAL/QC/SAMPLE",label:"CAL/QC/SAMPLE"}];
 const opts=menuOpts.map(function(x){
 const active=(iscal?x.id==="CAL/QC/SAMPLE":x.id==="SAMPLE");
 return '<div class="pfs-assay-option '+(active?'target':'')+'"><span>'+e(x.label)+'</span><span>'+(active?'SELECT THIS':'')+'</span></div>';
 }).join('');
 return frame("ASSAY","Step 3–4 · Select operation",nav()+
 '<div class="pfs-menu-caption">SELECT OPERATION</div><div class="pfs-assay-options">'+opts+'</div>'+
 '<div class="pfs-screen-alert">'+(iscal?
 'Select CAL/QC/SAMPLE on the local configuration. With QC Lockout ON, the operator manual may show CAL/QC instead.':
 'Choose SAMPLE to enter patient sample information.')+'</div>'+
 foot("ASSAY / SELECT OPERATION"));
}
function item(analyte){
 return frame("CAL/QC","Step 4 · Select assay",'<div class="pfs-item-caption">SELECT ITEM.</div>'+
 '<div class="pfs-item-list">'+assays.map(function(a){return '<div class="pfs-item-option '+(a===analyte?'target':'')+'">'+e(a)+(a===analyte?' <b>✓</b>':'')+'</div>';}).join('')+'</div>'+
 '<div class="pfs-item-actions"><span>OK</span><span>CANCEL</span></div>',"SELECT AN ASSAY FOR CALIBRATION.");
}
function lanes(mode,analyte){
 const cal=mode!=="patient",a=analyte||"hs-Troponin I",labs=cal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:["SAMPLE","SAMPLE","SAMPLE","SAMPLE","SAMPLE","SAMPLE"];
 return frame(cal?"CAL/QC INFORMATION":"ASSAY/HOME",cal?"Step 5 · Six-lane CAL/QC information":"Step 5 · Patient sample information",
 nav()+'<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active">SAMPLE INFO.</span></div>'+
 '<div class="pfs-lanes">'+labs.map(function(x,i){return '<div class="pfs-lane"><span class="pfs-lane-number"><small>LANE</small>'+(i+1)+'</span>'+
 '<span class="pfs-lane-assay">'+(cal?i<4?e(a):"CONTROL":"PATIENT")+'</span><strong>'+ (cal?e(x):"SID: —")+'</strong></div>';}).join('')+'</div>'+foot(cal?"CAL/QC → START":"SAMPLE INFO. → SID → OK"));
}
function patientStep(i){
 if(i===0)return login();
 if(i===1)return home("","patient");
 if(i===2)return menu("patient");
 if(i===3)return frame("ASSAY","Step 4 · SAMPLE mode",nav()+'<div class="pfs-menu-caption">SELECT OPERATION</div><div class="pfs-assay-options"><div class="pfs-assay-option target">SAMPLE <b>SELECT THIS</b></div><div class="pfs-assay-option">QC/SAMPLE</div><div class="pfs-assay-option">CAL/QC/SAMPLE</div></div>'+foot("SAMPLE"),"CHOOSE SAMPLE FOR PATIENT TESTING.");
 if(i===4)return lanes("patient");
 return "";
}
window.LAB_PATHFAST_SCREEN={login:login,home:home,menu:menu,item:item,lanes:lanes,patient:function(){return lanes("patient");},cal:function(a){return lanes("cal",a);},patientStep:patientStep};
})();