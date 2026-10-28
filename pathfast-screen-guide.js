/* Static PATHFAST-style touchscreen illustrations; training reference only. */
(function(){
"use strict";
function e(v){return String(v||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function screen(mode,analyte){
 var cal=mode==="cal",assays=["hs-Troponin I","NT-proBNP","D-dimer"],label=analyte||assays[0];
 var pills=assays.map(function(x){return '<span class="pfs-analyte '+(cal&&x===label?'selected':'')+'">'+e(x)+'</span>';}).join("");
 var lanes=(cal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:["SAMPLE","SAMPLE","SAMPLE","SAMPLE","SAMPLE","SAMPLE"]).map(function(x,i){
  return '<div class="pfs-lane"><span class="pfs-lane-number"><small>LANE</small>'+(i+1)+'</span><span class="pfs-lane-assay">'+(cal?i<4?e(label):"CONTROL":"PATIENT")+'</span><strong>'+ (cal?x:"SID: —")+'</strong></div>';
 }).join("");
 return '<section class="pfs-reference" aria-label="PATHFAST touchscreen illustration">'+
 '<div class="pfs-heading"><strong>PATHFAST TOUCHSCREEN</strong><span>'+(cal?"CAL/QC setup":"Patient sample entry")+'</span></div>'+
 '<div class="pfs-shell"><div class="pfs-blue-bar">'+(cal?"CAL/QC INFORMATION":"ASSAY/HOME")+'</div>'+
 '<div class="pfs-status"><span>'+(cal?"PUSH START BUTTON TO ASSAY.":"CHECK CAL/QC STATUS BEFORE TESTING.")+'</span><span>EXAMPLE VIEW</span></div>'+
 '<div class="pfs-toolbar"><span class="pfs-navbtn primary">▶ START</span><span class="pfs-navbtn">CHECK</span><span class="pfs-navbtn">SETUP</span><span class="pfs-navbtn">ADMIN</span></div>'+
 '<div class="pfs-tabs"><span>REAGENT STATUS</span><span class="active">SAMPLE INFO.</span></div>'+
 (!cal?'<div class="pfs-menu-pills">'+pills+'</div>':'')+
 '<div class="pfs-lanes">'+lanes+'</div>'+
 '<div class="pfs-footer"><span>◀ BACK</span><span>'+(cal?"ASSAY → CAL/QC → SELECT ITEM":"SAMPLE INFO. → LANE # → SID → OK")+'</span></div></div>'+
 '<p class="pfs-note">Illustrated screen layout. Follow prompts on the actual analyzer; software versions may differ.</p></section>';
}
window.LAB_PATHFAST_SCREEN={patient:function(){return screen("patient")},cal:function(a){return screen("cal",a)}};
})();