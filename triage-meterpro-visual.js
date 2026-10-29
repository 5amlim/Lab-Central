/* Triage MeterPro reference artwork, based on supplied front photo and
   published Quidel test-device imagery. Illustrations are not a live interface.
   The disposable assay strip is different from the reusable QC device. */
(function(){
"use strict";
const A=window.LAB_EQUIPMENT_ART;
if(!A)return;
const E=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const T=(x,y,v,z=16,c="#305b74",weight=700,anchor="middle")=>'<text x="'+x+'" y="'+y+'" font-family="Arial,Helvetica,sans-serif" font-size="'+z+'" fill="'+c+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+E(v)+'</text>';
const R=(x,y,w,h,rad,fill,stroke="none",sw=1)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rad+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const P=(d,fill="none",stroke="none",sw=1)=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round"/>';
const C=(x,y,r,fill,stroke="none",sw=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const assays=[
 {id:"troponin",label:"Troponin I",short:"Troponin I",color:"#8b9fcf",dark:"#4e6eaa"},
 {id:"bnp",label:"BNP",short:"BNP",color:"#419a84",dark:"#1b7961"},
 {id:"ddimer",label:"D-dimer",short:"D-dimer",color:"#f0c631",dark:"#99710c"}
];
const byId=id=>assays.find(a=>a.id===id)||assays[0];
function meterBody(mode="home"){
 let h='<defs><linearGradient id="tri-case" x1="0" y1="0" x2=".96" y2="1"><stop stop-color="#f8f9f9"/><stop offset=".67" stop-color="#e6ecee"/><stop offset="1" stop-color="#c6d0d6"/></linearGradient>'+
 '<linearGradient id="tri-blue" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#8eabbc"/><stop offset=".55" stop-color="#789bad"/><stop offset="1" stop-color="#60849a"/></linearGradient>'+
 '<linearGradient id="tri-screen" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#8e9494"/><stop offset=".7" stop-color="#797f80"/><stop offset="1" stop-color="#727b7e"/></linearGradient></defs>'+
 '<ellipse cx="355" cy="687" rx="273" ry="12" fill="#b4c3cc" opacity=".25"/>'+
 R(80,94,548,576,14,"url(#tri-case)","#b6c4cc",3)+
 // Twin built-in upper printer rolls and horizontal thermal-paper slot.
 P("M95 94V54Q95 37 109 37H351Q366 37 368 53V95Z","#e6ecee","#b6c3cc",2)+
 P("M373 94V53Q373 37 390 37H604Q617 37 617 57V95Z","#e6ecee","#b6c3cc",2)+
 P("M85 97H625V151H85Z","#edf2f3","#c8d1d5",2)+
 R(119,129,224,23,3,"#11191c")+
 Array.from({length:16},(_,i)=>R(126+i*13.5,147,5,8,0,"#161d21")).join("")+
 P("M345 96V156H386V97","none","#b2bdc4",2)+
 // Distinct blue-gray fascia, left LCD, physical buttons.
 P("M91 174H618V438Q362 459 91 438Z","url(#tri-blue)","#647f93",2.5)+
 T(132,197,"Triage® MeterPro",20,"#d6e9ef",650,"start")+
 R(129,209,280,212,2,"#5a6468","#a7b1b7",2.5)+
 R(139,218,259,194,1,"url(#tri-screen)");
 const captions={
  home:[],
  patient:["RUN TEST","PATIENT SAMPLE","Enter MRN"],
  qc:["RUN TEST","QC DEVICE","Insert QC device"],
  qcsample:["RUN TEST","QC SAMPLE","Confirm control lot"],
  chip:["INSTALL NEW CODE CHIP","Follow meter prompt","Use matching lot chip"],
  reading:["TEST IN PROGRESS","Do not remove device"],
  result:["RESULT READY","Verify ID / controls"]
 };
 if(mode!=="home"){
  const rows=captions[mode]||captions.patient;
  h+=rows.map((v,i)=>T(152,260+i*34,v,i===0?13:15,"#263b3b",700,"start")).join("");
 }
 // Print and Feed buttons.
 [[501,"Print"],[586,"Feed"]].forEach(([x,l],i)=>{
  h+=C(x,220,19,"#d8e0e4","#66869a",2)+C(x,220,14,"#c7d6df","#9db9c5",1)+
   (i===0?R(x-9,219,18,7,2,"#2f78b2")+P("M"+(x-7)+" 208h14v8h-14z","none","#2f78b2",2)
   :R(x-10,216,20,10,1,"#3780b5"))+
   T(x,250,l,12,"#233b4a",700);
 });
 // Round navigation pad with four blue arrows.
 h+=C(541,317,65,"#dae4e7","#57788c",3)+
    C(541,317,40,"#d9e2e5","#c4d2d8",1)+
    P("M541 264 l-9 13 h18z","#2d70b6")+P("M541 366 l-9 -13 h18z","#2d70b6")+
    P("M489 317 l13 -9 v18z","#2d70b6")+P("M592 317 l-13 -9 v18z","#2d70b6")+
    T(487,390,"Enter",12,"#263b47")+T(589,390,"Exit",12,"#263b47")+
    C(490,414,20,"#17448c","#0b275c",3)+T(490,422,"↵",29,"#effbff",800)+
    C(586,414,20,"#c5303e","#752630",3)+T(586,421,"×",23,"#fff",900);
 // Lower recessed 4x4 numeric keypad.
 h+=R(117,477,310,160,14,"#dfe7e9","#a5b8be",2.5)+
    R(127,486,290,139,10,"#c8d8dc","#b7c7cd",1);
 const labels=["☼","1","2","3","⌫","4","5","6","▤","7","8","9","⏻","↑","0","·"];
 h+=labels.map((v,i)=>{
  const x=173+(i%4)*62,y=509+Math.floor(i/4)*33;
  let color=i===12?"#44a568":i===0?"#e4ca4a":"#dae4e8";
  return C(x,y,14,color,"#b3c4cb",1)+T(x,y+6,v, i===12?19:17,i===12?"#0b7d4d":"#334e60",700);
 }).join("");
 // Quidel multi-color brand mark and lower cassette interface.
 h+=R(517,486,60,61,9,"#f1f2f0")+
   R(520,487,27,29,1,"#efb920")+R(550,487,27,29,1,"#ed4763")+
   R(520,520,27,26,1,"#51ae5a")+R(550,520,27,26,1,"#4773ba")+
   R(537,504,24,25,2,"#eaf0f3")+
   T(548,573,"QUIDEL",25,"#343e48",400)+
   P("M440 671 Q450 631 499 631 Q550 631 558 671Z","#141c22")+
   P("M570 658 h36 m-20-13 h17", "none","#607788",2)+T(590,650,"Click",10,"#657985",700);
 return h;
}
function meterSvg(mode="home"){
 return '<svg class="triage-real-meter" viewBox="72 25 565 664" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Photo-matched Quidel Triage MeterPro white cabinet, dual top printer rolls, large blue-gray front panel, LCD screen, physical directional pad, numeric keypad, printer buttons and lower right cartridge entry">'+meterBody(mode)+'</svg>';
}
function cassetteMarkup(id="troponin",filled=false){
 const a=byId(id);const m="#a60060";
 let s='<defs><linearGradient id="tri-cassette-white" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#e3e8eb"/></linearGradient></defs>'+
 '<ellipse cx="126" cy="366" rx="79" ry="8" fill="#bdc9cf" opacity=".35"/>'+
 '<path d="M115 16 Q63 17 61 65 L61 322 Q63 353 95 355 L153 355 Q189 352 189 317 L189 65 Q184 17 135 16Z" fill="url(#tri-cassette-white)" stroke="#b2bcc4" stroke-width="3"/>'+
 '<path d="M77 83L123 30L171 83H148V272H96V83Z" fill="'+m+'"/>'+
 '<rect x="112" y="54" width="24" height="216" rx="10" fill="#e6edf0" stroke="#a7b9c0" stroke-width="2.5"/>'+
 '<rect x="119" y="64" width="10" height="193" rx="4" fill="#bdc8ce"/>'+
 '<rect x="91" y="96" width="31" height="168" rx="2" fill="'+m+'"/>'+
 '<g transform="translate(117 181) rotate(-90)">'+T(0,0,a.label,23,"#fff",700)+'</g>'+
 '<path d="M147 92 V253" stroke="'+m+'" stroke-width="6" stroke-linecap="round"/>'+
 '<path d="M93 282 H160" stroke="'+a.color+'" stroke-width="8"/>'+
 T(126,277,"Triage",15,m,700)+
 '<path d="M80 319 Q124 290 172 319 L159 340 Q123 350 89 338Z" fill="none" stroke="'+m+'" stroke-width="7"/>'+
 '<ellipse cx="129" cy="325" rx="34" ry="11" fill="'+(filled?"#c87383":"#e5edf0")+'" stroke="#90a6b0" stroke-width="2.5"/>'+
 '<path d="M74 308 h19 l-9 -8 v16z" fill="'+m+'"/>'+
 T(129,354,"SAMPLE WELL",9,"#657d88",700);
 return s;
}
function cassetteSvg(id,filled=false){
 const a=byId(id);
 return '<svg viewBox="52 5 146 368" role="img" aria-label="Quidel Triage '+E(a.label)+' disposable assay cassette with vertical magenta assay label, '+E(a.color)+' identification stripe and lower sample well'+(filled?', specimen added':'')+'" xmlns="http://www.w3.org/2000/svg">'+cassetteMarkup(id,filled)+'</svg>';
}
function qcElectronicSvg(){
 let h=R(35,95,380,120,12,"#f8fafb","#8fa9b6",4)+
  R(54,111,230,77,5,"#fff","#c0d4dc",1)+T(169,145,"TRIAGE",22,"#3b6478",850)+
  T(169,169,"QC DEVICE",19,"#3b6478",850)+
  R(312,113,86,75,5,"#f0f3f5","#adbdc8",2)+
  T(355,143,"REUSABLE",13,"#41778c",800)+T(355,166,"NO SAMPLE",11,"#a44954",800)+
  T(225,250,"NO LIQUID / NO SAMPLE WELL",15,"#ab4853",800);
 return '<svg viewBox="0 50 450 230" role="img" aria-label="Reusable Triage electronic QC Device with no liquid sample well, not a disposable assay test cartridge" xmlns="http://www.w3.org/2000/svg">'+h+'</svg>';
}
function qcControlsSvg(){
 let h="";
 [0,1].forEach((i)=>{
  const x=90+i*164,c=i?"#4e86a1":"#ab557c";
  h+=R(x,62,89,220,15,"#f5fafa","#9cb8c5",3)+R(x-6,48,101,35,8,c,"#8a9ca5",2)+
   R(x+14,139,62,84,3,"#fff","#c5d7de")+
   T(x+45,161,"TOTAL 5",14,"#4d6f81",800)+T(x+45,183,"QC "+(i+1),14,"#4d6f81",800);
 });
 return '<svg viewBox="40 25 430 275" role="img" aria-label="Two distinct Triage Total 5 liquid QC control vials 1 and 2" xmlns="http://www.w3.org/2000/svg">'+h+'</svg>';
}
function chipSvg(){
 let h=R(93,66,236,159,13,"#e5edef","#8eacba",2)+
  R(127,93,167,110,7,"#27475b","#5f8293",2)+
  T(211,127,"TRIAGE",19,"#fff",850)+T(211,150,"CODE CHIP",20,"#fff",850)+
  T(211,174,"MATCH REAGENT LOT",10,"#b1dce7",650)+
  R(194,217,34,40,2,"#d9b85d","#a1843f",2);
 return '<svg viewBox="60 40 300 225" role="img" aria-label="Triage reagent CODE CHIP, assay lot identification" xmlns="http://www.w3.org/2000/svg">'+h+'</svg>';
}
function pipetteSvg(){
 let h='<path d="M96 45L207 215" stroke="#b6c5cc" stroke-width="24" stroke-linecap="round"/>'+
 '<path d="M207 215L228 245" stroke="#8fa7b0" stroke-width="9" stroke-linecap="round"/>'+
 '<ellipse cx="95" cy="43" rx="19" ry="29" fill="#e7f1f3" stroke="#90adb9" stroke-width="3"/>'+
 '<circle cx="229" cy="250" r="8" fill="#b5485d"/>'+
 T(237,280,"Kit transfer pipette",16,"#56778a",750);
 return '<svg viewBox="45 0 300 310" role="img" aria-label="Kit-supplied Triage transfer pipette with sample drop; assay-specific volume per IFU" xmlns="http://www.w3.org/2000/svg">'+h+'</svg>';
}
function kitChooser(){
 const panels=assays.map((a,i)=>'<div class="triage-kit-choice" style="--triage-assay:'+a.color+';--triage-ink:'+a.dark+'"><div class="triage-kit-picture">'+cassetteSvg(a.id)+'</div><strong>'+E(a.label)+'</strong><small>White test device · magenta panel · '+(i===0?'blue':i===1?'green':'yellow')+' band</small></div>').join("");
 return '<div class="triage-kit-chooser" role="group" aria-label="Assay-specific cartridges: Troponin I, BNP, and D-dimer">'+panels+'</div>';
}
function figure(title,mode,extra,note){
 const right=extra||kitChooser();
 return '<figure class="lc-focus-figure triage-focus-figure"><header>'+E(title)+'</header><div class="triage-guide-scene"><div class="triage-meter-stage">'+meterSvg(mode)+'</div><div class="triage-material-stage">'+right+'</div></div><figcaption>'+E(note)+'</figcaption></figure>';
}
function selectedMaterial(type,filled){
 const a=byId(type);
 return '<div class="triage-single-cartridge" style="--triage-assay:'+a.color+';--triage-ink:'+a.dark+'"><div>'+cassetteSvg(a.id,filled)+'</div><strong>'+E(a.label)+'</strong><small>'+E(a.label)+' assay cassette</small></div>';
}
function renderStep(title,group){
 const t=String(title||"").toLowerCase(),g=String(group||"").toLowerCase();
 const daily=/daily/.test(g),monthly=/monthly/.test(g),newBox=/new.box/.test(g),qc=daily||monthly||newBox;
 const mode=/code chip|install.*chip/.test(t)?"chip":daily?"qc":/qc sample|qc controls/.test(t)?"qcsample":/patient|mrn/.test(t)?"patient":/machine is ready|result/.test(t)?"result":"home";
 if(/print|log|record|date and initials|file/.test(t))return figure("Document and file the result","result",'<div class="triage-material-note">Print and record results in the appropriate approved QC log or patient chart. Verify lot, operator and patient identification.</div>',"Record the completed result according to the site procedure.");
 if(daily&&/qc device|insert.*qc device/.test(t))return figure("Daily QC · reusable electronic device","qc",qcElectronicSvg(),"The reusable electronic QC Device has no sample well. Do not add liquid or confuse it with single-use patient-test cassettes.");
 if(/chip|install.*chip/i.test(t))return figure("Match and install the new reagent CODE CHIP","chip",chipSvg(),"Install the corresponding lot chip using the prompts. Remove and store it as instructed.");
 if(/freezer|qc sample|total 5|thaw/.test(t))return figure("Prepare Triage Total 5 controls",mode,qcControlsSvg(),"Thaw and prepare the required control vials per approved lot-specific QC instructions.");
 if(/blood samples|collect/.test(t))return figure("EDTA blood for cardiac assays","home",A.mediaSvg("lavender"),"Verify collection tube and specimen stability for the selected cardiac assay.");
 if(/grab the test kit|test kit from the fridge|cassette|pipette|dispens|sample well|port/.test(t)){
  if(daily)return figure("Reusable electronic QC Device","qc",qcElectronicSvg(),"Daily electronic QC uses the reusable device, never an assay cassette or patient sample.");
  if(/insert.*port|insert.*cassette/.test(t))return figure("Insert prepared assay device","patient",selectedMaterial("troponin",true),"Illustration shows a Troponin I example. Insert the actual ordered assay device in the instrument's lower front cassette port.");
  if(/dispens|pipette/.test(t))return figure("Add specimen to the disposable assay cassette",qc?"qcsample":"patient",'<div class="triage-dispense-layout">'+pipetteSvg()+selectedMaterial("bnp",true)+'</div>',"Illustrated BNP example. Use the supplied transfer pipette and the assay-specific sample volume.");
  return figure("Identify the intended Triage cartridge","home",kitChooser(),"Compare the printed cartridge name and colored identification stripe before preparing the specimen.");
 }
 if(/run test|click|enter mrn|lot/.test(t))return figure("Navigate the MeterPro buttons",mode,qc?qcElectronicSvg():kitChooser(),"Use the actual screen prompts and physical arrow/Enter keys to select the correct mode and enter identification.");
 if(/turn on|machine is ready|review|result/.test(t))return figure("Quidel Triage MeterPro",mode,qc?qcElectronicSvg():kitChooser(),"This is the actual meter layout; the screen text is a training illustration rather than a literal captured display.");
 return figure(qc?"Triage QC workflow":"Triage patient test workflow",mode,qc?qcControlsSvg():kitChooser(),"Follow the current kit instructions and analyzer prompts for this step.");
}
const oldRender=A.render.bind(A);
A.render=function(sec){
 const result=oldRender(sec);
 if(sec?.id!=="triage")return result;
 return result.replace(/<svg class="equipment-svg"[\s\S]*?<\/svg>/,
  meterSvg("home").replace('class="triage-real-meter"','class="equipment-svg triage-real-meter"'));
};
const oldKit=A.kitShape?.bind(A);
if(oldKit)A.kitShape=function(id,filled=false,context){
 if(id!=="triage")return oldKit(id,filled,context);
 // Daily electronic QC is handled separately and must never be pictured as a liquid test device.
 return cassetteSvg("troponin",filled);
};
const oldWorkflow=A.workflowVisual?.bind(A);
if(oldWorkflow)A.workflowVisual=function(sec,title,group){
 return sec?.id==="triage"?renderStep(title,group):oldWorkflow(sec,title,group);
};
const oldStep=A.stepIllustration?.bind(A);
if(oldStep)A.stepIllustration=function(sec,title,group){
 return sec?.id==="triage"?renderStep(title,group):oldStep(sec,title,group);
};
A.triageMeterSvg=meterSvg;
A.triageCassetteSvg=cassetteSvg;
window.LAB_TRIAGE_VISUAL={render:renderStep,meterSvg,cassetteSvg,kitChooser,assays};
})();