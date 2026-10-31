/* CLINITEK Status+ instrument-specific guided step artwork.
   Separate urinalysis dipstick and CLINITEST hCG cassette; never render blood tubes.
   Illustrative interfaces only: compare with the actual analyzer and approved IFU. */
(function(){
'use strict';
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'&quot;');
const tx=(x,y,s,size=16,color="#315e75",bold=true,anchor="middle")=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+(bold?850:550)+'" fill="'+color+'">'+E(s)+'</text>';
const svg=(body,alt)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 405" role="img" aria-label="'+E(alt)+'">'+body+'</svg>';
const fig=(heading,art,note)=>'<figure class="cl-focused-figure"><header>'+E(heading)+'</header><div class="cl-focused-art">'+art+'</div><figcaption>'+E(note)+'</figcaption></figure>';
const strip=(x,y,orientation=0)=>'<g transform="translate('+x+' '+y+') rotate('+orientation+' 0 0)">'+
 '<rect x="-10" y="-103" width="20" height="205" rx="3" fill="#eff5f6" stroke="#94afb9" stroke-width="2"/>'+
 '<rect x="-8" y="-98" width="16" height="34" rx="2" fill="#e6dd91"/>'+
 ['#96c9a5','#cdb598','#c4a5bb','#93a8d7','#dfc279','#a1bbb8','#d1a6a6','#c4c6a7'].map((c,i)=>'<rect x="-8" y="'+(-57+i*18)+'" width="16" height="15" rx="2" fill="'+c+'"/>').join('')+'</g>';
const cassette=(x=584,y=245)=>'<g transform="translate('+x+' '+y+')">'+
 '<rect x="-66" y="-21" width="135" height="53" rx="10" fill="#f8fcfd" stroke="#93b1be" stroke-width="3"/>'+
 '<rect x="-51" y="-9" width="55" height="22" rx="5" fill="#e5eef2" stroke="#a0bbc8" stroke-width="2"/>'+
 '<rect x="-41" y="-3" width="34" height="9" rx="2" fill="#fff"/>'+
 '<circle cx="44" cy="3" r="13" fill="#eef6f8" stroke="#92b2bf" stroke-width="3"/>'+
 tx(-21,26,"CLINITEST hCG",11,"#477587")+'</g>';
const cup=(x=535,y=102)=>'<g transform="translate('+x+' '+y+')">'+
 '<ellipse cx="67" cy="172" rx="79" ry="8" fill="#dce7ed"/>'+
 '<path d="M13 35H122L112 163Q108 179 68 179Q27 179 22 163Z" fill="#e8f4f7" stroke="#91afbc" stroke-width="4"/>'+
 '<path d="M25 112H111L107 158Q103 170 68 171Q33 170 30 158Z" fill="#f2d58e" fill-opacity=".82"/>'+
 '<ellipse cx="68" cy="35" rx="57" ry="13" fill="#f8fcfd" stroke="#9fbbc6" stroke-width="4"/>'+
 '<rect x="31" y="70" width="75" height="40" rx="5" fill="#fff" stroke="#d7e5ea"/>'+
 tx(68,94,"URINE",17,"#326c7c")+'</g>';
function machine(mode="home",kind="ua"){
 const equipment=window.LAB_EQUIPMENT_ART;
 if(!equipment?.clinitekDeviceMarkup)return "";
 const selectType=kind==="hcg"?"cassette":"strip";
 const shapeMode=mode==="table"?selectType:mode==="dispense"?"cassette":
  mode==="select"?"select-"+selectType:mode==="qc"?"qc":
  mode==="results"?"reading":mode==="start"?(kind==="hcg"?"start-cassette":"start-strip"):
  mode==="dip"?"empty":mode==="qc-dip"?"qc":"empty";
 // Original photographed instrument, scaled to leave space for consumable
 // and table-insert closeups on the right. Screens are simplified diagrams.
 return '<g transform="translate(31 -2) scale(.80)">'+equipment.clinitekDeviceMarkup(shapeMode)+'</g>';
}
function tableCloseup(kind,dispense=false){
 const hcg=kind==="hcg";
 const header=hcg?"FLIPPED hCG CASSETTE SIDE":"UA STRIP SIDE";
 const shell='<rect x="495" y="55" width="244" height="325" rx="15" fill="#f4f9fa" stroke="#bed3dc" stroke-width="3"/>'+
  tx(617,87,header,14,"#2a7187")+
  '<g transform="translate(90 0) scale(.85 1)">'+
  '<path d="M556 104H681L702 123V343Q698 358 683 361H559Q545 355 545 341V124Z" fill="#202932" stroke="#576c79" stroke-width="4"/>'+
  '<path d="M568 116H677L688 132V334Q684 347 675 347H571Q560 344 560 329V129Z" fill="#0f1820" stroke="#415862" stroke-width="3"/>';
 if(!hcg){
  const colors=['#e5e59f','#b8d0ac','#d5ba90','#c0add1','#e3c489','#a4c9bd','#cfaba3','#aac59e'];
  return shell+
   '<path d="M613 127H631V352H613Z" fill="#f9fcfa" stroke="#9fb8c0" stroke-width="2"/>'+
   colors.map((c,i)=>'<rect x="616" y="'+(138+i*19)+'" width="12" height="16" rx="1.3" fill="'+c+'"/>').join('')+
   '</g>'+
   tx(620,371,"STRIP · PADS UP",11,"#4c7b8c");
 }
 return shell+
  '<path d="M582 122H662L667 349H579Z" fill="#f6f9f7" stroke="#9fb6c1" stroke-width="2.5"/>'+
  '<rect x="588" y="136" width="69" height="29" rx="2" fill="#edf2f1"/>'+
  tx(623,151,"CLINITEST hCG",10,"#4b6574")+
  '<rect x="602" y="188" width="42" height="67" rx="4" fill="#e7f0f3" stroke="#a2b9c3" stroke-width="2"/>'+
  '<path d="M612 207H634M612 224H634M612 242H634" stroke="#cad6d8" stroke-width="3"/>'+
  '<circle cx="624" cy="298" r="15" fill="#edf4f4" stroke="#90a9b5" stroke-width="2.5"/>'+
  '<circle cx="624" cy="298" r="6" fill="#fffefa"/>'+
  (dispense?'<path d="M627 179V273" stroke="#5c8c99" stroke-width="5" stroke-linecap="round"/>'+
   '<path d="M623 269q-13 16 1 23q13-4 0-23" fill="#ecd2a5" stroke="#d1ad68" stroke-width="1.5"/>':'')+
  '</g>'+
  tx(619,371,"CASSETTE · SAMPLE WELL",11,"#4c7b8c");
}
function flipInsertCloseup(){
 return '<rect x="493" y="53" width="246" height="327" rx="15" fill="#f4f9fa" stroke="#bed3dc" stroke-width="3"/>'+
  tx(616,84,"FLIP THE TEST TABLE INSERT",13,"#286f81")+
  // Reversible black insert shown on both sides, with a curved physical flip cue.
  '<g transform="translate(0 -5)">'+
  '<path d="M528 129H610L621 231H522Z" fill="#202a32" stroke="#637784" stroke-width="4"/>'+
  '<rect x="559" y="144" width="17" height="66" rx="3" fill="#0c151b" stroke="#7f959d" stroke-width="2"/>'+
  tx(570,249,"STRIP SIDE",12,"#426b7a")+
  '<path d="M625 139Q675 98 701 145" stroke="#278f88" stroke-width="5" fill="none" stroke-linecap="round"/>'+
  '<path d="M689 137L704 147L706 131" stroke="#278f88" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
  '<path d="M624 186H716L721 260H622Z" fill="#202a32" stroke="#637784" stroke-width="4"/>'+
  '<rect x="643" y="199" width="53" height="46" rx="3" fill="#111b23" stroke="#849da5" stroke-width="2"/>'+
  tx(666,282,"hCG SIDE",12,"#426b7a")+
  '</g>'+
  '<rect x="522" y="306" width="188" height="49" rx="8" fill="#e1f3ee" stroke="#89c4b6" stroke-width="2"/>'+
  tx(616,326,"CASSETTE FACE UP",13,"#217e70")+
  tx(616,343,"Then place the hCG cassette",10,"#4d7a80",false);
}


/* Screen enlargements follow Siemens' documented menu labels and layout.
   They are redrawings rather than manufacturer screenshots. */
function screenCloseup(mode,kind){
 const h=kind==="hcg", cassetteLabel=h?"Cassette Test":"Strip Test";
 const bg='<rect x="468" y="44" width="275" height="328" rx="18" fill="#eaf2f4" stroke="#bfd3dc" stroke-width="3"/>'+
 '<rect x="483" y="64" width="245" height="255" rx="7" fill="#f9fbfb" stroke="#809ca8" stroke-width="3"/>';
 const top='<rect x="483" y="64" width="245" height="42" fill="#24282c"/>'+tx(498,82,mode==="results"?"Results":mode==="analyzing"?"Analyzing":mode==="start"?"Prepare Test":/^(appearance|color|clarity)$/.test(mode)?"Select Appearance":mode==="qc"?"Select QC Test":"Select",15,"#fff",true,"start")+tx(499,99,/^(appearance|color|clarity)$/.test(mode)?"Test in progress":mode==="analyzing"?"In progress":"Ready",11,"#e3ecf0",false,"start")+((mode==="color"||mode==="clarity")?tx(710,98,mode==="color"?"2 of 3":"3 of 3",10,"#e3ecf0",true,"end"):"");
 let body="";
 if(mode==="select"||mode==="qc"){
   const entries=mode==="qc"?["QC Strip Test","QC Cassette Test"]:["Instrument Set Up","Recall Results","Cassette Test","Strip Test"];
   body=entries.map((a,i)=>{
     const col=i%2,row=Math.floor(i/2),x=493+col*116,y=118+row*89;
     const active=mode==="qc"?(h?i===1:i===0):(h?i===2:i===3);
     return '<rect x="'+x+'" y="'+y+'" width="108" height="77" rx="5" fill="'+(active?"#e5eee9":"#fff")+'" stroke="'+(active?"#278d83":"#abb9c0")+'" stroke-width="'+(active?3:1.6)+'"/>'+tx(x+54,y+32,a.split(" ")[0],11,"#2c3d43")+tx(x+54,y+48,a.split(" ").slice(1).join(" "),11,"#2c3d43");
   }).join("");
 }else if(mode==="start"){
  body=tx(499,133,h?"Clinitest hCG":"Urinalysis strip",16,"#222",true,"start")+
       tx(499,165,h?"Adjust test table insert":"Dip and blot strip",13,"#283b42",false,"start")+
       tx(499,186,h?"for cassette tests":"then place on test table",13,"#283b42",false,"start")+
       tx(499,216,h?"Place cassette on table":"Test pads facing up",13,"#283b42",false,"start")+
       '<rect x="615" y="259" width="104" height="51" rx="8" fill="#f0c1aa" stroke="#ba6348" stroke-width="2"/>'+tx(666,292,"START",19,"#382d2a");
 }else if(mode==="color"||mode==="clarity"){
  const isColor=mode==="color";
  body=tx(495,128,isColor?"Select Color":"Select Clarity",14,"#304c5a",true,"start");
  const labels=isColor?["Yellow","Orange","Red","Green","Blue","Brown","Other"]:["Clear","Cloudy","Slightly Cloudy","Turbid","Other"];
  body+=labels.map((label,i)=>{
   const col=i%2,row=Math.floor(i/2),x=497+col*111,y=138+row*34;
   return '<rect x="'+x+'" y="'+y+'" width="106" height="31" rx="3" fill="#fff" stroke="#b0c6d0" stroke-width="1.5"/>'+
     '<circle cx="'+(x+14)+'" cy="'+(y+16)+'" r="8" stroke="#8ca6b1" stroke-width="1.6" fill="#fff"/>'+
     (label==="Slightly Cloudy"?tx(x+61,y+13,"Slightly",10,"#355260")+tx(x+61,y+25,"Cloudy",10,"#355260"):tx(x+58,y+21,label,12,"#355260"));
  }).join("");
  body+='<rect x="497" y="284" width="99" height="29" rx="5" fill="#edf2f3" stroke="#b8cbd3"/>'+tx(547,303,"Back  ◀",12,"#426777")+
   '<rect x="607" y="284" width="107" height="29" rx="5" fill="#e3f1ed" stroke="#83b6ae" stroke-width="2"/>'+tx(660,303,"Next  ▶",12,"#216b65");
 }else if(mode==="appearance"){
  body=tx(605,139,"Select Color and Clarity",15,"#2c4955")+
       tx(605,159,"of urine sample",14,"#2c4955",false)+
       '<rect x="498" y="184" width="215" height="51" rx="7" fill="#e8f3f1" stroke="#88bdb9" stroke-width="2.5"/>'+
       tx(592,215,"Yellow and Clear",16,"#236f6c")+
       '<path d="M690 204l11 7-11 7" fill="none" stroke="#267d77" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>'+
       '<rect x="498" y="242" width="215" height="48" rx="7" fill="#f6f9f9" stroke="#adc5ce" stroke-width="2"/>'+
       tx(600,272,"Other",17,"#345865")+
       '<path d="M690 258l11 7-11 7" fill="none" stroke="#537d89" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>'+
       tx(605,307,"Color → Clarity → Next",12,"#507682",false);
 }else if(mode==="analyzing"){
  body=tx(605,150,"Analyzing",20,"#263940")+
      '<rect x="504" y="188" width="200" height="20" rx="10" fill="#e5eaed" stroke="#a4b8c2"/>'+
      '<rect x="505" y="189" width="113" height="18" rx="9" fill="#63a6a1"/>'+
      tx(605,243,"Do not move test table",13,"#4c6770",false);
 }else if(mode==="results"){
  body=tx(605,137,h?"Clinitest hCG":"Urinalysis",18,"#263940")+
       tx(605,178,h?"Result: see analyzer":"Result: see analyzer",13,"#365462")+
       tx(605,201,"Verify ID and printout",12,"#365462",false)+
       '<rect x="557" y="258" width="102" height="48" rx="7" fill="#e8eff0" stroke="#a2b9c2"/>'+tx(608,289,"Done",17,"#2f4c57");
 }
 return bg+top+body+tx(605,350,"SCREEN DETAIL · REDRAWN",11,"#527482");
}

function scene(kind,mode){
 const isHcg=kind==="hcg",testName=isHcg?"CLINITEST hCG CASSETTE":"URINALYSIS DIPSTICK";
 let art=machine(mode,isHcg?"hcg":"ua");
 if(mode==="specimen"){art+=cup(512,75);art+=isHcg?cassette(590,301):strip(486,238,80);}
 if((mode==="qc-material"||mode==="qc-dip")&&isHcg){art+='<g><rect x="532" y="123" width="91" height="147" rx="13" fill="#e9f5f8" stroke="#96b4c1" stroke-width="4"/><rect x="526" y="106" width="103" height="34" rx="7" fill="#639bad"/><rect x="541" y="173" width="73" height="46" rx="6" fill="#fff" stroke="#c4d7df"/></g>'+tx(577,194,"QC CONTROL",12,"#2d7483")+tx(583,318,"APPROVED QC LOT",14,"#487d8c");}
 if(mode==="qc-dip")art+=(isHcg?cassette(590,260):strip(592,240,-20))+
  tx(583,335,"CONTROL MATERIAL",13,"#287a83");
 if(mode==="strip"){art+=isHcg?cassette(590,200):strip(570,188,0);
  art+=tx(576,329,isHcg?"hCG CASSETTE":"UA DIPSTICK",15);}
 if(mode==="dip"){art+=cup(499,68)+(isHcg?cassette(596,264):strip(580,173,-23))+
  '<path d="M612 105C645 123 648 161 621 175" fill="none" stroke="#27958b" stroke-width="5"/>';}
 if(mode==="flip"){art=machine("home","hcg")+flipInsertCloseup();}
 if(mode==="table"){art=machine("table",isHcg?"hcg":"ua")+tableCloseup(isHcg?"hcg":"ua");}
 
 if(mode==="dispense")art=machine("dispense","hcg")+tableCloseup("hcg",true);
 if(mode==="select"||mode==="qc"||mode==="results"||mode==="appearance"||mode==="color"||mode==="clarity")art=machine(mode,isHcg?"hcg":"ua")+screenCloseup(mode,kind);
 if(mode==="running")art='<g transform="translate(-7 -8) scale(1.05)">'+machine("analyzing",kind)+'</g>'+screenCloseup("analyzing",kind);
 if(mode==="analyzing")art=machine("analyzing",kind)+screenCloseup("analyzing",kind);
 if(mode==="start")art=machine("start",kind)+screenCloseup("start",kind);
 return svg(art,"Siemens CLINITEK Status+ analyzer and "+(mode==="specimen"?"urine cup with "+testName:mode==="select"?"selected "+testName+" screen":mode==="dip"?"urine dipstick dipped in urine":mode==="table"?testName+" on test table":mode==="start"?"Start button selected":"result display"));
}

const dipperPhoto='<div class="cl-qc-photo"><img loading="lazy" decoding="async" src="assets/quantimetrix-dipper-controls.jpg" alt="Quantimetrix Dipper Level 1 with pink cap and Level 2 with purple cap, urinalysis QC controls"><span>QUANTIMETRIX DIPPER · LEVEL 1 &amp; 2</span></div>';
function quantimetrixQCFigure(title,sceneMode,note){
 return fig(title,'<div class="cl-qc-material-layout"><div class="cl-qc-analyzer">'+scene("ua",sceneMode)+'</div>'+dipperPhoto+'</div>',note);
}
function render(title,group){
 const g=String(group||"").toLowerCase(),t=String(title||"").toLowerCase();
 const kind=/hcg|cassette/.test(g)?"hcg":"ua";
 const qc=/qc/.test(g);
 if(!/ua-strip|hcg-cassette|ua-qc|hcg-qc/.test(g))return "";
 if(/confirm urine|verify urine|confirm specimen|check specimen/.test(t))
  return fig(qc?"Confirm urine control and test materials":"CLINITEK + urine cup + "+(kind==="hcg"?"hCG cassette":"UA strip"),scene(kind,"specimen"),
     qc?"Verify the correct QC material, lot and expiration before testing.":"Verify fresh urine in a clean cup, patient ID and correct test strip or cassette.");
 if(kind==="hcg"&&/flip.*(table|insert)|orient.*(table|insert)/.test(t))
  return fig("Flip the test-table insert to the hCG cassette side",scene("hcg","flip"),
   "Remove the test-table insert and flip it so the cassette recess faces upward. Reinstall it correctly before placing the CLINITEST hCG cassette. Do not put the cassette into the strip channel.");
 if(/select strip test|select cassette test|choose strip|select hcg/.test(t))
  return fig("Select "+(kind==="hcg"?"Cassette Test":"Strip Test")+" on the analyzer",scene(kind,"select"),
     "Select the correct test type and confirm patient ID or QC entry on the analyzer.");
 if(qc&&/prepare.*control|quality control/.test(t))return kind==="ua"?quantimetrixQCFigure("Prepare Quantimetrix Dipper Level 1 and Level 2 controls","qc-material","Verify the Quantimetrix Dipper 1 and 2 control vials, correct lot, expiration and storage. Follow the current site SOP and manufacturer insert."):fig("Prepare approved QC controls",scene(kind,"qc-material"),"Confirm the correct QC material, level, lot, and expiry. Use the approved assay-specific procedure.");
 if(kind==="hcg"&&/prepare and place|place.*unused.*cassette/.test(t))
  return fig("Seat CLINITEST hCG cassette on the flipped test table",scene("hcg","table"),
   "With the cassette-side recess facing up, place the unused CLINITEST hCG cassette flat on the test table. Leave the sample well accessible and do not dispense urine until START is selected.");
 if(/prepare the ua|prepare the strip|prepare hcg|prepare and place|prepare urinalysis controls|prepare control/.test(t))
  return fig("Prepare "+(kind==="hcg"?"CLINITEST hCG cassette":"UA dipstick"),scene(kind,"strip"),
     "Check expiration and remove one compatible unused "+(kind==="hcg"?"cassette":"reagent strip")+".");
 if(qc&&/open.*qc|qc test/.test(t))
  return fig("Open QC test mode",scene(kind,"qc"),"Choose the correct QC menu and confirm control ID and lot.");
 if(kind==='hcg'&&/dispense urine|dispense qc material|apply.*sample/.test(t))
  return fig(qc?"Dispense approved hCG QC":"Dispense urine into hCG cassette",scene(kind,"dispense"),
   "After selecting START, transfer urine or QC with the supplied pipette to the marked line (approximately 0.2 mL), and dispense the full volume into the cassette sample well within 8 seconds. Do not push the table inward.");
 if(kind==='hcg'&&/press start|place cassette and select start/.test(t))return fig("Select START before applying specimen",scene(kind,"start"),"With the cassette in the correct insert, select START first. The analyzer gives 8 seconds to fill the supplied pipette to its marked line (approximately 0.2 mL) and dispense into the sample well.");
 if(qc&&/run each control/.test(t))
  return kind==="ua"?quantimetrixQCFigure("Run each Quantimetrix Dipper control with the UA strip method","qc-dip",
   "Run Level 1 and Level 2 separately using approved QC mode and reagent-strip technique. Verify acceptable results before patient testing."):fig("Run controls using the urinalysis strip method",scene(kind,"qc-dip"),
   "Use approved control material and the correct QC mode, not a patient urine cup.");
 if(/press start|dip and blot|dip.*strip|run each control/.test(t))
  return fig("Press START, dip and blot",scene(kind,"dip"),
     qc?"Apply controls according to the lot-specific SOP.":"Press START, immerse the reagent pads, then blot the strip as directed by the approved procedure.");
 if(/place.*test table|place.*strip|place cassette/.test(t))
  return fig("Place "+(kind==="hcg"?"cassette":"strip")+" on analyzer test table",scene(kind,"table"),
    "Use the reversible test-table insert with the correct face upward: strip-side for urinalysis (pads up), flipped cassette-side for CLINITEST hCG. Keep the urine cup off the table.");
 if(kind==="ua"&&!qc&&/select urine color/i.test(t))return fig("Select Appearance · urine color",scene("ua","color"),
   "If the specimen is Yellow and Clear, choose that shortcut on the first screen. Otherwise choose Other, select the observed urine color, and tap Next. The example screen shows available color options.");
 if(kind==="ua"&&!qc&&/select urine clarity/i.test(t))return fig("Select Appearance · urine clarity",scene("ua","clarity"),
   "If Other was selected, choose Clear, Cloudy, Slightly Cloudy, Turbid, or Other, then tap Next. This separate screen is skipped when Yellow and Clear is selected at the first prompt.");
 if(kind==="ua"&&!qc&&/wait for analyzer to finish/i.test(t))return fig("CLINITEK Status+ · running the test",scene("ua","running"),
   "The test table is automatically drawn inside and must remain closed during measurement. If analysis is still in progress, the Analyzing screen appears; otherwise Results appears immediately. Do not move the table.");
 if(/start|begin test|analyze/.test(t))return fig("Start the selected test",scene(kind,"start"),"Confirm test selection and start analysis.");
 if(/analyz|countdown|in progress|processing/.test(t))return fig("Analyzer processing screen",scene(kind,"analyzing"),"The analyzer pulls the table inward automatically. Do not push, pull, bump, or reposition the table during calibration and analysis.");
 if(kind==="ua"&&!qc&&/select.*(color|clarity)|urine.*(color|clarity)|select appearance/.test(t))
  return fig("Select Appearance · color and clarity",scene("ua","appearance"),
   "During a Full or Custom UA strip test, visually inspect the urine. Select Yellow and Clear only when both apply. Otherwise select Other, choose the actual color, then the clarity, and select Next. The analyzer continues to Analyzing or Results.");
 if(/review|document|print|result/.test(t))
  return fig("Review and document results",scene(kind,"results"),"Verify the patient ID, QC status, and analyzer result before documenting.");
 if(qc)return fig("CLINITEK QC step",scene(kind,"select"),"Follow the correct QC workflow, materials, and prompts in the approved site SOP.");
 return fig("CLINITEK urine workflow",scene(kind,"specimen"),"Urine specimens only. Use the correct Siemens strip or CLINITEST cassette.");
}
// Only the Full/Custom UA strip workflow requests color and clarity.
const clinitekSection=window.LAB_GUIDE_DATA?.sections?.find(sec=>sec.id==="clinitek");
const uaGroup=clinitekSection?.groups?.find(group=>group.id==="ua-strip");
if(uaGroup?.blocks?.length){
 const blocks=uaGroup.blocks;
 let color=blocks.findIndex(b=>b.level===1&&/select urine color/i.test(b.text||""));
 const results=blocks.findIndex(b=>b.level===1&&/review and document results/i.test(b.text||""));
 if(color<0&&results>=0){
  blocks.splice(results,0,{type:"list",level:1,text:"Select urine color"});
  color=results;
 }
 if(color>=0){
  blocks[color].text="Select urine color";
  const note="During a Full or Custom UA strip test, select Yellow and Clear when both apply. Otherwise choose Other, select the observed color, and tap Next.";
  if(blocks[color+1]?.level===2)blocks[color+1].text=note;
  else blocks.splice(color+1,0,{type:"list",level:2,text:note});
 }
 const clarity=blocks.findIndex(b=>b.level===1&&/select urine clarity/i.test(b.text||""));
 if(clarity<0&&color>=0){
  const next=blocks.findIndex((b,i)=>i>color&&b.level===1);
  blocks.splice(next<0?blocks.length:next,0,
   {type:"list",level:1,text:"Select urine clarity (if Other)"},
   {type:"list",level:2,text:"If you chose Other, select the observed clarity: Clear, Cloudy, Slightly Cloudy, Turbid, or Other, then tap Next. Skip this prompt if Yellow and Clear was selected."});
 }
 if(!blocks.some(b=>b.level===1&&/wait for analyzer to finish/i.test(b.text||""))){
  const last=blocks.findIndex(b=>b.level===1&&/review and document results/i.test(b.text||""));
  if(last>=0)blocks.splice(last,0,
   {type:"list",level:1,text:"Wait for analyzer to finish"},
   {type:"list",level:2,text:"The analyzer draws in the test table, calibrates, and measures the strip. Do not move the table. After entering appearance, Analyzing displays only if testing is still in progress."});
 }
}
window.LAB_CLINITEK_FOCUSED={render};
})();