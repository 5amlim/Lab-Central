/* PATHFAST touchscreen teaching diagrams.
   Modeled on PHC PATHFAST Operator's Manual, Rev 4.70EN, sections 5.5, 5.6, 6.2, 8.5.
   Static illustrative UI. The analyzer display and menu labels can vary by configuration. */
(function(){
"use strict";
function e(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
// Portrait LCD reconstruction based on PHC manual v4.70EN, chapters 5–9.
const assays=["hs-Troponin I","NT-proBNP","D-dimer"];
const short=a=>({"hs-Troponin I":"cTnI","NT-proBNP":"NTproBNP","D-dimer":"D-Dimer"})[a]||a||"cTnI";
let n=0;
function lcd(mode,options={}){
 const id="pfLCD"+(++n),blue="url(#"+id+"b)",dark="url(#"+id+"d)",gray="url(#"+id+"g)",footbg="url(#"+id+"f)";
 const rect=(x,y,w,h,fill,stroke="none",r=0)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'"/>';
 const t=(x,y,v,size=12,color="#555",weight=400,anchor="start")=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+e(v)+'</text>';
 const focus=options.focus||"";
 const mark=(x,y,w,h)=>'<rect x="'+(x+1)+'" y="'+(y+1)+'" width="'+(w-2)+'" height="'+(h-2)+'" rx="3" fill="none" stroke="#d17a20" stroke-width="2"/>';
 const key=(x,y,w,h,label,fill=blue,color="#fff",selected=false)=>rect(x,y,w,h,fill,"#b5e8ff",5)+t(x+w/2,y+h/2+4,label,11,color,700,"middle")+(selected?mark(x,y,w,h):"");
 const title=(label,msg="")=>rect(0,0,240,20,dark)+t(120,14,label,14,"#fff",700,"middle")+rect(0,20,240,50,"#dcdadc")+t(9,31,msg,7.8,"#444")+t(236,67,"[ date / time ]",9,"#008aff",700,"end");
 const nav=(kind="menu",active="ASSAY")=>rect(0,70,240,25,blue)+(kind==="running"?
 key(3,73,54,22,"ASSAY",gray,"#007bff")+key(60,73,55,22,"CHECK")+key(121,73,116,22,"■","#f8bcd5","#ec569c"):
 [kind==="ready"?"▶": "ASSAY","CHECK","SETUP","ADMIN"].map((v,i)=>key(3+i*59,73,55,22,v,v===active||v==="▶"?gray:blue,v===active||v==="▶"?"#008bf2":"#fff",focus===v||focus==="START"&&v==="▶")).join(""));
 const tabs=(selected="SAMPLE INFO.")=>["REAGENT STATUS","SAMPLE INFO."].map((v,i)=>key(1+i*120,96,118,24,v,v===selected?"#fff":"#e1e1e1","#007bff",false)).join("");
 const footer=(labels)=>rect(0,290,240,30,footbg)+labels.map((v,i)=>key(v==="BACK"||v==="HOME"?5:240-75*(labels.length-i),294,70,22,v,v==="OK"?"#35cc25":v==="CANCEL"?"#ff7836":"#505050","#fff",focus===v)).join("");
 const sub=(label)=>rect(0,70,240,25,blue)+t(120,86,label,13,"#fff",700,"middle");
 const field=(x,y,w,value,label="")=>rect(x,y,w,20,gray,"#999",5)+t(x+4,y+14,value,11,"#444",600)+(focus===label?mark(x,y,w,20):"");
 const rowList=(values,icons=false)=>values.map((v,i)=>{let y=98+i*38;return (icons?rect(10,y+4,28,28,blue,"#aad9e8",4)+t(24,y+22,["▤","QC","∿","▣","▥"][i%5],12,"#fff",700,"middle"):"")+t(icons?48:12,y+22,v,13,"#505653",700)+ '<path d="M'+(icons?48:8)+' '+(y+35)+'H226" stroke="#b6b6b6"/>'+(focus===v?mark(icons?43:3,y,icons?190:234,35):"");}).join("");
 const cal=options.cal===true, qc=options.qc===true, name=cal?"CAL/QC":qc?"QC":"ASSAY/HOME";
 const laneRows=(running=false)=>Array.from({length:6},(_,i)=>{const y=120+i*33.2, role=cal?["CAL1","CAL1","CAL2","CAL2","QC1","QC2"][i]:qc?["QC1","QC2","QC3","QC1","QC2","QC3"][i]:"";
 const assay=cal?(i<4||running?short(options.analyte):""):qc?"":i===0?short(options.analyte):"";
 return rect(0,y,240,33.2,"#fff","#b7b7b7")+rect(1,y+2,28,29,blue)+t(15,y+10,"LANE",7,"#fff",700,"middle")+t(15,y+25,i+1,15,"#fff",700,"middle")+t(35,y+15,assay,11,"#555",600)+t(108,y+15,role,11,"#555")+(!cal&&!qc&&i===0&&options.sid?t(35,y+28,"SID: [MRN]",10):"")+(focus==="LANE"&&i===0?mark(1,y+1,28,31):"");}).join("");
 const ready=(running=false)=>title(name,running?"ASSAYING...": "PUSH START BUTTON TO ASSAY.")+nav(running?"running":"ready")+tabs()+laneRows(running);
 let body="";
 if(mode==="menu")body=title("ASSAY")+nav("menu")+rowList(["SAMPLE","QC","CAL/QC","MC ENTRY"],true)+footer(["HOME"]);
 else if(mode==="check")body=title("CHECK")+nav("menu","CHECK")+rowList(["RESULT CHECK","QC CHECK","CAL CHECK","Hct% CORRECTION","TEMP CHECK"],true)+footer(["HOME"]);
 else if(mode==="admin")body=title("ADMIN")+nav("menu","ADMIN")+rowList(["SHUT DOWN","USER SWITCH","SYSTEM","FILE UTILITY","MAINTENANCE"],true)+footer(["HOME"]);
 else if(mode==="item")body=title("CAL/QC")+sub("SELECT ITEM.")+["cTnI","D-Dimer","NTproBNP"].map((v,i)=>{const y=95+i*34;return rect(0,y,240,34,"#fff","#b7b7b7")+t(12,y+21,v,13,"#555",700)+(v===short(options.analyte)?mark(1,y+1,238,32):"");}).join("")+footer(["OK","CANCEL"]);
 else if(mode==="home")body=title("ASSAY/HOME","PUSH START BUTTON TO ASSAY.")+nav("ready")+tabs("REAGENT STATUS")+[0,1,2].map(i=>{const x=7+i*78;return key(x,133,72,30,short(assays[i]),options.locked&&i===0?"#f2accd":gray,"#444");}).join("")+footer(["BACK"]);
 else if(mode==="lanes"||mode==="start")body=ready();
 else if(mode==="running")body=ready(true);
 else if(mode==="sid")body=title("SAMPLE INFO.")+sub("EDIT INFORMATION")+t(10,112,"LANE 1",12,"#555",700)+t(10,145,"SID",11)+field(72,130,162,"[ MRN ]","SID")+t(10,180,"Hct%",11)+field(72,165,162,"[ configured value ]")+footer(["OK","CANCEL"]);
 else if(mode==="login")body=title("LOG IN","SELECT USER AND ENTER PASSWORD.")+t(9,42,"HANDHELD BARCODE READER NOW OPERATABLE",7.5)+rect(0,70,240,220,dark)+rect(18,114,204,140,"#93bae3","none",10)+t(120,138,"USER",16,"#fff",400,"middle")+field(30,149,180,"","USER")+t(120,202,"PASSWORD",16,"#fff",400,"middle")+field(30,213,180,"","PASSWORD")+rect(0,290,240,30,footbg)+key(5,294,70,22,"SHUT DOWN","#ff7836");
 else if(mode==="mc")body=title("MC ENTRY")+sub("MC ENTRY")+t(120,141,"Read MC ENTRY CARD",14,"#555",700,"middle")+t(120,173,"[ Assay / Lot / Expiry ]",11,"#555",400,"middle")+footer(["BACK"]);
 else if(mode==="status")body=title("CAL/QC STATUS")+sub("CAL/QC STATUS")+["ITEM","LOT","CAL","QC"].map((v,i)=>t(8,119+i*36,v,12)+field(70,104+i*36,164,i===0?short(options.analyte):"—")).join("")+footer(["BACK"]);
 else if(mode==="results"){
  const kind=options.resultTitle||"RESULT CHECK",isQC=kind==="QC CHECK",isCal=kind==="CAL CHECK";
  const rows=isQC?[["ITEM",short(options.analyte)],["SAMPLE",options.sample||"QC1"],["RANGE","LAST 10 TESTS"]]:isCal?[["ITEM",short(options.analyte)],["LOT","[ lot ]"],["RANGE","[ select range ]"]]:[["ITEM",short(options.analyte)],["LOT","[ lot ]"],["SAMPLE",options.sample||"PATIENT"],["RANGE","LAST 10 TESTS"]];
  const y=97+rows.length*26;
  body=title(kind)+rect(0,70,240,25,blue)+rows.map(([v,value],i)=>t(8,111+i*26,v,12)+field(83,97+i*26,153,value)).join("")+t(8,y+12,"LIST",11)+rect(83,y,153,284-y,"#fff","#aaa",4)+[0,1].map(i=>(isQC?rect(84,y+1+i*15,151,15,"#222"):"")+t(89,y+12+i*15,"[ run date / time ]",9,isQC?"#fff":"#444")).join("")+rect(0,290,240,30,footbg)+key(5,294,68,22,"BACK","#505050")+(isQC?key(84,294,68,22,"GRAPH","#fff","#28c427"):"")+key(165,294,70,22,"DATA","#35cc25");
 }
 else if(mode==="record")body=title(options.resultTitle||"RESULT CHECK")+rect(0,70,240,25,blue)+["REPRINT DATE: [ date / time ]","------------------------------","DATE: [ run date ]","SAMPLE ID: [ sample ID ]","LANE: [ lane ]","",short(options.analyte),"     —","", "REMARK: —","SAMPLE: "+(options.sample||"PATIENT")].map((v,i)=>t(3,108+i*15,v,10,"#222",700)).join("")+rect(205,96,34,192,gray,"#aaa")+["≪","⌃","⌄","≫"].map((v,i)=>t(222,126+i*45,v,17,"#61a6df",700,"middle")).join("")+rect(0,290,240,30,footbg)+key(5,294,68,22,"BACK","#505050")+key(165,294,70,22,"PRINT","#fff","#28c427",true);
 else if(mode==="shutdown")body=title("ADMIN")+sub("SHUT DOWN")+t(120,154,"SHUT DOWN?",14,"#444",700,"middle")+footer(["OK","CANCEL"]);
 else return "";
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320" role="img" aria-label="PATHFAST '+e(mode)+' training illustration"><defs>'+[["b","#0062d9","#00cbef"],["d","#07104d","#00bdf3"],["g","#d9d9d9","#fff"],["f","#f7f7f7","#c4c4c4"]].map(([k,a,b])=>'<linearGradient id="'+id+k+'" x1="0" y1="0" x2="'+(k==="d"?"1":"0")+'" y2="1"><stop stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>').join("")+'</defs>'+rect(0,0,240,320,"#fff")+body+rect(.5,.5,239,319,"none","#314b9a")+'</svg>';
}
function frame(label,mode,options={},note=""){
 return '<section class="pfs-reference pfs-lcd-reference" aria-label="'+e(label)+'"><div class="pfs-heading"><strong>PATHFAST · SCREEN REFERENCE</strong><span>'+e(label)+'</span></div><div class="pfs-lcd-portrait">'+lcd(mode,options)+'</div><p class="pfs-note">'+e(note||"Training reconstruction. Confirm actual instrument display and approved SOP.")+'</p></section>';
}
function login(){return frame("Operator access","login",{focus:"USER"},"Select user ID, enter the assigned password, and confirm OK. Credentials are never shown.");}
function home(analyte,mode,focus){return frame(focus==="back"?"Select BACK":"Check assay status","home",{analyte,locked:mode==="patient",focus:focus==="back"?"BACK":""},mode==="patient"?"Pink assay status is an illustrative lockout example, not the current instrument status. Verify calibration and QC before testing.":"Check the selected assay and reagent status on the instrument.");}
function menu(mode){return frame(mode==="patient"?"Select SAMPLE":"Select CAL/QC","menu",{focus:mode==="patient"?"SAMPLE":mode==="qc"?"QC":"CAL/QC"},"QC lockout ON. Actual options depend on permissions and configuration.");}
function item(analyte){return frame("Select assay","item",{analyte},"Select the intended assay and follow the on-screen confirmation. Assay names may vary with the installed master data.");}
function lanes(mode,analyte){return frame(mode==="patient"?"Select occupied lane":"Review lane assignments","lanes",{cal:mode==="cal",qc:mode==="qc",analyte,focus:mode==="patient"?"LANE":""},mode==="patient"?"Tap the occupied lane number, then verify SID. Unoccupied lanes are blank.":"Verify the assigned lanes against the loaded cartridges and control levels.");}
function sid(){return frame("Enter patient SID","sid",{focus:"SID"},"Scan or enter the MRN, verify the lane and confirm. Follow configured Hct% workflow.");}
function start(mode,analyte){return frame("Start assay","start",{cal:mode==="cal",qc:mode==="qc",analyte,sid:mode==="patient",focus:"START"},"Check lane assignments and consumables before pressing the triangular start control.");}
function running(mode,analyte){return frame("Assay in progress","running",{cal:mode==="cal",qc:mode==="qc",analyte,sid:mode==="patient"},"Pink stop button is for cancellation only. Allow the assay to finish and review results.");}
function results(mode,analyte){return frame("Review stored results","results",{analyte,resultTitle:mode==="cal"?"CAL CHECK":mode==="qc"?"QC CHECK":"RESULT CHECK",sample:mode==="patient"?"PATIENT":"QC1"},"Select the actual assay, lot and run. Review the printed report and any flags; blank fields are training placeholders.");}
function fromItem(item){
 const s=String(item.screen||"").toUpperCase(),h=String(item.heading||"").toLowerCase();
 if(s==="CHECK")return lcd("check",{focus:item.focus||"QC CHECK"});
 if(/RECORD/.test(s))return lcd("record",{resultTitle:"QC CHECK",sample:"QC1",focus:"PRINT"});
 if(/ASSAY.*HOME/.test(s))return lcd("home",{focus:item.focus==="CHECK"?"CHECK":""});
 if(/SHUT DOWN/.test(s))return lcd("shutdown");
 return "";
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
 if(i===13)return running("patient")+(window.LAB_EQUIPMENT_ART?.pathfastActionVisual?.("running","patient")||"");
 if(i===14){
  const review=window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual("results","patient"):"";
  return results('patient')+review+'<aside class="pf-review-interference" aria-label="Possible microclot or fibrin interference">'+
   '<div class="pf-review-interference-head"><span class="pf-review-interference-mark" aria-hidden="true">!</span><div><strong>Suspected clot / fibrin interference?</strong><span>Use the original specimen for a plasma retest if permitted by the approved SOP.</span></div></div>'+
   '<ol>'+
    '<li><b>Hold and assess.</b> If the result is unexpectedly elevated or discordant, inspect the original lithium-heparin tube and notify the provider. Do not assume the first result is false.</li>'+
    '<li><b>Spin the same tube for 10 minutes</b> using the validated centrifuge settings.</li>'+
    '<li><b>Repeat PATHFAST on plasma</b> from the original tube, avoiding the cell layer or fibrin. Compare both results and document/escalate discrepancies before reporting or correcting any result.</li>'+
   '</ol>'+
   '<p><b>Visible clot, unsuitable specimen or persistent discrepancy?</b> Follow the specimen rejection/redraw and provider-notification SOP. A plasma retest on the same tube is an interference check, <b>not</b> a new timed serial troponin draw.</p>'+
  '</aside>';
 }
 return "";
}

window.LAB_PATHFAST_SCREEN={login:login,home:home,menu:menu,item:item,lanes:lanes,sid:sid,start:start,running:running,results:results,lcd:lcd,fromItem:fromItem,patient:function(){return lanes("patient");},cal:function(a){return lanes("cal",a);},patientStep:patientStep};
})();