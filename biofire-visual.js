/* BioFire FilmArray TORCH and SPOTFIRE training visuals.
   Original SVG illustrations of the pouch station, vials and screen sequence.
   Red sample well LEFT, blue hydration well RIGHT, as viewed in the
   manufacturer pouch-loading-station diagrams. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function svg(body,label){return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(label)+'" viewBox="0 0 920 400">'+body+'</svg>';}
function text(x,y,s,size=15,color="#326780",anchor="middle",weight="800"){return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+weight+'" fill="'+color+'">'+esc(s)+'</text>';}

/* Injection vials are drawn apart from the station during mixing.
   The red and blue caps remain in the matching loading-station wells
   when the vial is removed for pouch puncture. */
function vial(x,color,material,mode,y=62){
 const blue=color==="blue",cap=blue?"#168cb7":"#c54f5c",fluid=blue?"#a8dcf1":"#d9a5ae";
 const needle=mode==="needle";
 return '<g transform="translate('+x+' '+y+')">'+
 '<ellipse cx="40" cy="195" rx="38" ry="6" fill="#deebf1"/>'+
 '<rect x="16" y="34" width="48" height="154" rx="12" fill="#f5fbfd" stroke="#8eafbe" stroke-width="3"/>'+
 '<path d="M21 110H59V167Q52 182 40 182Q26 181 21 167Z" fill="'+fluid+'" opacity=".83"/>'+
 (mode==="open"?'<ellipse cx="40" cy="37" rx="26" ry="8" fill="#e7f4f8" stroke="#82a8b6" stroke-width="3"/><ellipse cx="40" cy="37" rx="17" ry="4" fill="#446b7b"/>':'<rect x="9" y="12" width="62" height="35" rx="11" fill="'+cap+'" stroke="#6b91a3" stroke-width="3"/>')+
 '<path d="M15 20H65" stroke="#fff" stroke-width="3" opacity=".68"/>'+
 '<rect x="23" y="75" width="34" height="44" rx="4" fill="#fff" stroke="#d6e4e9"/>'+
 text(40,94,blue?"HYDR.":"SAMPLE",8.2,"#375d71")+text(40,108,"INJECTION",7.1,"#57798a")+
 (needle?'<path d="M40 12V-7" stroke="#899ba4" stroke-width="8"/><path d="M40 -7V-33" stroke="#a4beca" stroke-width="3"/>':'')+
 text(40,212,material,12,blue?"#277c9d":"#ae4c5b")+'</g>';
}
function stationBase(){
 const red=385,blue=590;
 return '<ellipse cx="492" cy="339" rx="258" ry="13" fill="#dfe9ed"/>'+
 '<path d="M282 137L347 107H648L724 145L695 276H320Z" fill="#23303a" stroke="#738b99" stroke-width="4"/>'+
 '<path d="M320 276H695V294H320Z" fill="#172832" stroke="#7b93a1" stroke-width="3"/>'+
 '<path d="M283 139L320 275V294L281 174Z" fill="#1a2a34" stroke="#7b93a1" stroke-width="3"/>'+
 '<path d="M341 137H658L688 253H330Z" fill="#3b4e5a" stroke="#7893a2" stroke-width="2.5"/>'+
 '<path d="M386 194L628 194L642 263H373Z" fill="#e2edf1" fill-opacity=".75" stroke="#93abb8" stroke-width="3"/>'+
 Array.from({length:11},(_,i)=>'<rect x="'+(397+i*20)+'" y="206" width="12" height="46" rx="4" fill="#b6d0da" stroke="#91b4c1" stroke-width="1.4"/>').join("")+
 '<path d="M368 259H650" stroke="#b7cdd7" stroke-width="4"/>'+
 '<rect x="346" y="145" width="77" height="26" rx="9" fill="#8e3c49" stroke="#cf6e7a" stroke-width="3"/>'+
 '<ellipse cx="'+red+'" cy="144" rx="27" ry="16" fill="#a34652" stroke="#f2b0b7" stroke-width="4"/>'+
 '<ellipse cx="'+red+'" cy="143" rx="16" ry="8" fill="#762b39"/>'+
 '<rect x="554" y="145" width="73" height="26" rx="9" fill="#18779b" stroke="#80c9df" stroke-width="3"/>'+
 '<ellipse cx="'+blue+'" cy="144" rx="27" ry="16" fill="#218bac" stroke="#a7dfea" stroke-width="4"/>'+
 '<ellipse cx="'+blue+'" cy="143" rx="16" ry="8" fill="#195a7a"/>'+
 text(385,78,"RED · SAMPLE",15,"#b84b5a")+text(590,78,"BLUE · HYDRATION",15,"#2b83a3")+
 '<path d="M385 88V119M590 88V119" stroke="#8daab9" stroke-width="2.4" stroke-dasharray="5 4"/>'+
 '<path d="M413 292H576" stroke="#bed2da" stroke-width="3"/>';
}
function station(mode){
 let extra="";
 if(mode==="ready"){
   extra=vial(345,"red","Sample vial","normal",73)+vial(550,"blue","Hydration vial","normal",73);
 }else if(mode==="hydrate"){
   extra=vial(548,"blue","Hydration vial","needle",39)+
   '<path d="M590 158v20" stroke="#3ba9c7" stroke-width="5" stroke-dasharray="5 3"/>'+
   text(807,241,"HYDRATE BLUE",15,"#267fa3");
 }else if(mode==="sample"){
   extra=vial(343,"red","Sample vial","needle",39)+
   '<path d="M384 158v20" stroke="#c55363" stroke-width="5" stroke-dasharray="5 3"/>'+
   text(130,241,"LOAD SAMPLE",15,"#b64a59");
 }
 return svg(stationBase()+extra,
  "FilmArray pouch loading station with red sample vial on left and blue hydration vial on right; sample and hydration vial ports remain separate");
}
function pipetteShape(x,y){
 return '<g transform="translate('+x+' '+y+') rotate(28 10 94)">'+
 '<path d="M7 4L10 104" stroke="#a2b4be" stroke-width="15" stroke-linecap="round"/>'+
 '<path d="M7 4L10 104" stroke="#f5fbfc" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M10 103L10 139" stroke="#a6b8c1" stroke-width="5"/>'+
 '<path d="M10 120L10 141" stroke="#c04757" stroke-width="3"/>'+
 '<path d="M2 42H19M2 63H19M2 82H19" stroke="#799dab" stroke-width="2.5"/>'+
 '</g>';
}
function kit(){
 let h='<rect x="28" y="25" width="864" height="344" rx="18" fill="#fbfdfe" stroke="#dce9ef" stroke-width="2"/>'+
 '<rect x="236" y="49" width="468" height="272" rx="14" fill="#f4f9fb" stroke="#e3edf2" stroke-width="2"/>'+
 stationBase()+
 vial(53,"red","Red sample vial","normal",74)+vial(772,"blue","Blue hydration vial","normal",74)+
 text(114,53,"SAMPLE INJECTION",13,"#b45160")+text(831,53,"HYDRATION INJECTION",13,"#237b9c")+
 '<rect x="326" y="315" width="346" height="33" rx="8" fill="#e5f1f5" stroke="#c5dde8"/>'+
 text(500,336,"POUCH IN LOADING STATION",14,"#356c83");
 return svg(h,"BioFire test kit: two separate injection vials and a single pouch held in the dark loading station. Red vial is left, blue vial is right");
}
/* Panel-specific sample volume and sequence must match the assay IFU.
   FilmArray GI: buffer first, then 0.2 mL stool in Cary Blair.
   SpotFire R: specimen with fixed-volume pipette, then buffer. */
function sampleBufferTube(x,y){
 return '<g transform="translate('+x+' '+y+')">'+
 '<path d="M20 24H63L60 111Q58 125 48 129H35Q26 125 24 111Z" fill="#f6fbfd" stroke="#91adb9" stroke-width="3"/>'+
 '<path d="M27 79H57L55 114Q43 123 30 114Z" fill="#dfc39e" opacity=".87"/>'+
 '<path d="M28 46H57V75H28Z" fill="#fff" stroke="#dae9ef"/>'+
 text(42,58,"SAMPLE",9,"#446c80")+text(42,69,"BUFFER",9,"#446c80")+
 '<path d="M20 25L17 15L29 7H54L66 16L62 26Z" fill="#e3eef2" stroke="#8aa8b9" stroke-width="3"/>'+
 '<path d="M61 18L77 3L85 11L68 30Z" fill="#b1c9d3" stroke="#7f9eab" stroke-width="3"/>'+
 '<path d="M76 4L85 11" stroke="#fff" stroke-width="3"/>'+
 '<path d="M44 125L45 150" stroke="#8aabb8" stroke-width="6"/>'+
 '<path d="M44 147L45 165" stroke="#dbc09a" stroke-width="3"/>'+
 '</g>';
}
function pipette(id){
 const spotfire=id==="spotfire";
 const first='<rect x="26" y="32" width="423" height="335" rx="17" fill="#f8fbfd" stroke="#dce8ef" stroke-width="2"/>'+
 text(237,64,spotfire?"1 · ADD SPECIMEN":"1 · ADD SAMPLE BUFFER",18,"#286e85")+
 vial(274,"red","Red injection vial","open",104)+
 (spotfire?pipetteShape(139,86):sampleBufferTube(123,83))+
 '<path d="M215 226L267 233" stroke="#3198a2" stroke-width="3" stroke-dasharray="7 4"/>'+
 text(235,343,spotfire?"Fixed-volume transfer pipette (R panel)":"Pinch the textured snap tab · squeeze twice",12,"#5e7d8d");
 const second='<rect x="467" y="32" width="423" height="335" rx="17" fill="#f8fbfd" stroke="#dce8ef" stroke-width="2"/>'+
 text(679,64,spotfire?"2 · ADD SAMPLE BUFFER":"2 · ADD SPECIMEN",18,"#286e85")+
 vial(595,"red","Red injection vial","open",104)+
 (spotfire?sampleBufferTube(757,83):pipetteShape(736,88))+
 '<path d="M732 232L656 250" stroke="#ba5664" stroke-width="3" stroke-dasharray="7 4"/>'+
 text(680,343,spotfire?"Open snap tab; squeeze entire buffer":"GI specimen in Cary Blair · 2nd mark (0.2 mL)",12,"#5e7d8d");
 return svg(first+second,spotfire?
 "SPOTFIRE R panel: transfer fixed volume of specimen into red vial first, then snap open sample buffer tube and squeeze full amount into same vial":
 "FilmArray GI: hold sample buffer tube tip up and snap textured plastic tab, dispense buffer first into red vial and add 0.2 mL well-mixed Cary Blair specimen");
}
function invert(){
 const left=vial(146,"red","Capped vial","normal",75);
 const right='<g transform="rotate(180 630 175)">'+
 '<rect x="606" y="75" width="48" height="156" rx="12" fill="#f6fbfc" stroke="#8daebb" stroke-width="3"/>'+
 '<path d="M610 173H650V215Q646 227 630 228Q612 227 610 215Z" fill="#d4a0ab"/>'+
 '<rect x="598" y="219" width="64" height="35" rx="10" fill="#c84f5e" stroke="#8299a8" stroke-width="3"/>'+
 '<rect x="613" y="124" width="34" height="42" rx="4" fill="#fff"/>'+
 text(630,144,"MIX",10,"#396b83")+
 '</g>';
 return svg('<rect x="58" y="20" width="804" height="354" rx="18" fill="#f8fcfd" stroke="#d7e8ef"/>'+
 left+right+
 '<path d="M374 158C414 57 523 60 553 146" fill="none" stroke="#238d92" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M535 128L554 157L563 128" fill="none" stroke="#238d92" stroke-width="7" stroke-linecap="round"/>'+
 text(461,58,"GENTLY INVERT 3 TIMES",22,"#247d83")+
 text(461,334,"Close red vial tightly first · do not shake",15,"#577f90"),
 "BioFire red sample injection vial capped and gently inverted three times to mix specimen with buffer");
}
function analyzer(id,state){
 const torch=id==="torch";
 let body='<ellipse cx="490" cy="350" rx="300" ry="20" fill="#e1e9ed"/>';
 if(torch){
 const moduleRows=Array.from({length:4},(_,r)=>Array.from({length:2},(_,c)=>{
  const x=331+c*127,y=37+r*47;
  return '<g>'+
   '<rect x="'+(x-3)+'" y="'+(y-3)+'" width="127" height="47" rx="4" fill="#c83e4c"/>'+
   '<rect x="'+x+'" y="'+y+'" width="119" height="40" rx="4" fill="#f8fafa" stroke="#b6c6cc" stroke-width="1.4"/>'+
   '<path d="M'+(x+3)+' '+(y+5)+'H'+(x+116)+'" stroke="#fff" stroke-width="2.5" opacity=".9"/>'+
   '<path d="M'+(x+17)+' '+(y+12)+'h20v7h-8v12" fill="none" stroke="#212a32" stroke-width="8" stroke-linejoin="round" stroke-linecap="square"/>'+
   '<rect x="'+(x+77)+'" y="'+(y+12)+'" width="4" height="20" rx="2" fill="#8dbc86"/>'+
   '<rect x="'+(x+83)+'" y="'+(y+12)+'" width="2" height="20" fill="#dae8e8"/>'+
   '</g>';
 }).join('')).join('');
 body+='<defs>'+
 '<linearGradient id="torch-case" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eef2f2"/><stop offset=".55" stop-color="#c5cdd1"/><stop offset="1" stop-color="#858e95"/></linearGradient>'+
 '<linearGradient id="torch-front" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f9fbfb"/><stop offset="1" stop-color="#dfe5e6"/></linearGradient>'+
 '<linearGradient id="torch-screen" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#dff2f4"/><stop offset="1" stop-color="#adceda"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="474" cy="348" rx="264" ry="19" fill="#cddce4" opacity=".55"/>'+
 '<path d="M282 43 L324 17 H585 L610 36 L611 269 L583 298 L286 289Z" fill="url(#torch-case)" stroke="#909fa8" stroke-width="4"/>'+
 '<path d="M282 43 L324 17 L324 245 L285 278Z" fill="#7b858d" stroke="#59656f" stroke-width="2"/>'+
 '<path d="M323 19 L581 19 L611 37 L606 247 L326 241Z" fill="#dfe4e5" stroke="#9daeb8" stroke-width="2"/>'+
 '<path d="M327 32 H582 V232 H327Z" fill="#d23a48"/>'+
 moduleRows+
 '<path d="M273 236 H610 L664 310 Q668 323 648 331 L316 335 Q289 332 274 318 L245 278Z" fill="#e7ebec" stroke="#8d9ca4" stroke-width="4"/>'+
 '<path d="M275 242 H608 L654 309 L314 317 L254 277Z" fill="#f8f9f8" stroke="#b7c4cb" stroke-width="2"/>'+
 '<path d="M314 317 H655 L646 330 H317Z" fill="#a3aeb4"/>'+
 '<path d="M282 278 L602 278" stroke="#ce4650" stroke-width="4" opacity=".8"/>'+
 '<path d="M415 258 L598 256 L637 302 L441 305Z" fill="#44525d" stroke="#c75c60" stroke-width="4"/>'+
 '<path d="M425 265 L593 263 L624 294 L448 298Z" fill="url(#torch-screen)" stroke="#8ca7b8" stroke-width="2"/>'+
 '<text x="514" y="277" text-anchor="middle" font-size="12" font-family="Arial" fill="#40657b" font-weight="800">BIOFIRE TORCH</text>'+
 '<rect x="462" y="282" width="48" height="7" rx="2" fill="#e8f4f3" stroke="#93c5be"/>'+
 '<rect x="516" y="282" width="47" height="7" rx="2" fill="#e8f4f3" stroke="#93c5be"/>'+
 '<rect x="569" y="282" width="44" height="7" rx="2" fill="#e8f4f3" stroke="#93c5be"/>'+
 '<path d="M306 270 h64" stroke="#dce5e7" stroke-width="13" stroke-linecap="round"/>'+
 '<path d="M303 296h62" stroke="#d9dfe2" stroke-width="14" stroke-linecap="round"/>'+
 '<rect x="380" y="306" width="28" height="12" rx="3" fill="#53656f"/>'+
 '<rect x="386" y="308" width="16" height="8" rx="2" fill="#2b3640"/>'+
 '<text x="328" y="250" font-size="11" font-family="Arial" fill="#8b9ca6" font-weight="850">FilmArray</text>';
 }else{
 body+='<rect x="270" y="105" width="296" height="224" rx="15" fill="#eff4f6" stroke="#8da5b4" stroke-width="5"/>'+
 Array.from({length:4},(_,i)=>'<rect x="287" y="'+(124+i*43)+'" width="170" height="34" rx="5" fill="#fbfcfc" stroke="#a8bec9" stroke-width="2"/><path d="M304 '+(141+i*43)+' h26" stroke="#3f424d" stroke-width="6"/>').join("")+
 '<path d="M480 116 L646 109 L662 321 L480 328Z" fill="#dfe9ef" stroke="#9aafbb" stroke-width="4"/>'+
 '<rect x="502" y="137" width="141" height="156" rx="6" fill="#1f3d50"/>'+
 '<rect x="511" y="153" width="122" height="124" rx="3" fill="#e5f1f4"/>'+
 text(572,184,"SPOTFIRE",13,"#3c7184")+text(572,205,state==="selected"?"OPEN MODULE":"AVAILABLE",11,state==="selected"?"#158775":"#49899c")+
 '<rect x="536" y="229" width="71" height="28" rx="5" fill="#b7dce6"/>';
 }
 const illustration=svg(body,"BioFire "+(torch?"FilmArray TORCH modular instrument with front loading modules and sloped touchscreen":"SPOTFIRE system with modular drawer units and upright display"));
 return torch?illustration.replace('viewBox="0 0 920 400"','viewBox="205 0 510 375"'):illustration;
}

function ui(id,index){
 const torch=id==="torch";
 if(!torch){
  const choices=[["Available modules","Select a free module"],["Pouch barcode","Scan barcode"],["Sample ID / assay","Confirm ordered panel"],["Start Run","Start only after checks"]];
  const chosen=choices[index]||choices[0];
  return svg('<rect x="197" y="17" width="536" height="363" rx="19" fill="#e8eef1" stroke="#9fb8c5" stroke-width="6"/>'+
   '<rect x="222" y="45" width="485" height="302" rx="10" fill="#fff" stroke="#afc4d0"/>'+
   '<rect x="223" y="45" width="484" height="53" rx="7" fill="#274b67"/>'+
   text(465,76,"BIOFIRE SPOTFIRE · WORKFLOW REFERENCE",17,"#fff")+
   '<rect x="268" y="143" width="394" height="52" rx="8" fill="#e6f5f1" stroke="#24968d" stroke-width="3"/>'+
   text(467,176,chosen[0],20,"#226b73")+
   '<rect x="298" y="228" width="334" height="47" rx="8" fill="#f1f6f8" stroke="#c0d6e0"/>'+
   text(465,255,chosen[1],16,"#527589")+
   text(465,317,"Illustrative workflow only · verify actual screen",12,"#688494"),
   "BioFire SPOTFIRE simplified workflow stage "+(index+1)+"; verify actual software display");
 }
 const stages=[
  {heading:"DASHBOARD",title:"Select an available module",focus:"module"},
  {heading:"NEW RUN",title:"Scan pouch barcode · enter Sample ID",focus:"fields"},
  {heading:"REVIEW RUN",title:"Confirm pouch type and specimen ID",focus:"review"},
  {heading:"START RUN",title:"Verify and start the run",focus:"start"}
 ];
 const stage=stages[index]||stages[0];
 const toolbar='<rect x="172" y="20" width="583" height="360" rx="14" fill="#e9eef2" stroke="#9eb7c3" stroke-width="5"/>'+
 '<rect x="192" y="40" width="543" height="318" rx="8" fill="#fff" stroke="#b8cbd5" stroke-width="2"/>'+
 '<rect x="193" y="40" width="542" height="48" fill="#263f51"/>'+
 text(287,69,"Dashboard",15,stage.focus==="module"?"#fff":"#d1e5ea")+
 text(448,69,"Browse Runs",15,"#c5dbe4")+
 text(576,69,"Settings",15,"#c5dbe4")+
 text(679,69,"TORCH",19,"#f7fcfd")+
 '<rect x="206" y="97" width="516" height="36" rx="4" fill="#eaf2f7"/>'+
 text(464,120,stage.heading,17,"#33687f");
 let content="";
 if(stage.focus==="module"){
   content=Array.from({length:6},(_,i)=>{
    const x=223+i%3*164,y=150+Math.floor(i/3)*78;
    return '<rect x="'+x+'" y="'+y+'" width="147" height="63" rx="8" fill="'+(i===0?"#e6f5ec":"#f3f7f9")+'" stroke="'+(i===0?"#238f79":"#ccdee5")+'" stroke-width="'+(i===0?"3":"2")+'"/>'+
     text(x+73,y+27,"MODULE "+(i+1),12,"#325c73")+
     text(x+73,y+48,"Available",11,i===0?"#1a866d":"#5e8193");
   }).join("")+
   text(459,333,"Select an available module or scan the pouch barcode",13,"#5e7f8e");
 }else if(stage.focus==="fields"){
   content='<rect x="246" y="153" width="440" height="54" rx="8" fill="#f8fbfc" stroke="#bed5df" stroke-width="2"/>'+
    text(274,176,"POUCH BARCODE / LOT / SERIAL",12,"#4c7588","start")+
    text(275,197,"Scan the fitment label",13,"#2c6881","start")+
    '<rect x="246" y="224" width="440" height="54" rx="8" fill="#f8fbfc" stroke="#bed5df" stroke-width="2"/>'+
    text(274,247,"SAMPLE ID",12,"#4c7588","start")+
    text(275,268,"Scan or enter approved accession ID",13,"#2c6881","start")+
    '<rect x="560" y="303" width="126" height="35" rx="7" fill="#268f81"/>'+text(623,325,"NEXT",13,"#fff");
 }else if(stage.focus==="review"){
   content='<rect x="246" y="153" width="440" height="145" rx="9" fill="#f7fafb" stroke="#c0d7e0"/>'+
   text(274,179,"Pouch Type",12,"#688294","start")+text(620,179,"GI PANEL",13,"#346d84","end")+
   '<path d="M262 192H670" stroke="#e0eaf0" stroke-width="2"/>'+
   text(274,218,"Sample ID",12,"#688294","start")+text(620,218,"VERIFY MATCH",13,"#347588","end")+
   '<path d="M262 233H670" stroke="#e0eaf0" stroke-width="2"/>'+
   text(274,260,"Protocol",12,"#688294","start")+text(620,260,"IF PROMPTED",13,"#347588","end")+
   '<rect x="568" y="311" width="116" height="34" rx="7" fill="#248e81"/>'+text(626,333,"NEXT",13,"#fff");
 }else{
   content='<rect x="245" y="151" width="440" height="145" rx="8" fill="#f7fafc" stroke="#c6dbe3"/>'+
    text(464,182,"REVIEW POUCH + SAMPLE ID",15,"#376d85")+
    text(464,211,"Confirm the correct module is loaded",13,"#6b8495")+
    text(464,237,"Confirm operator access on the analyzer",13,"#6b8495")+
    '<rect x="375" y="260" width="178" height="47" rx="8" fill="#278f80"/>'+
    text(464,289,"START RUN",18,"#fff");
 }
 return svg(toolbar+content,
 "BioFire FilmArray Torch dashboard and run workflow using documented Dashboard, Browse Runs, Settings, pouch barcode, Sample ID and Start Run controls; schematic not an exact software screenshot");
}
function figure(title,desc,picture){
 const type=/blue|hydrat/i.test(title)?'blue':/red|sample|specimen/i.test(title)?'red':/scan|panel|start|module/i.test(title)?'screen':'ready';
 const symbol=type==='blue'?'●':type==='red'?'●':type==='screen'?'›':'✓';
 return '<figure class="biofire-training-figure biofire-training-'+type+'"><div class="biofire-training-title"><strong><span class="biofire-training-symbol" aria-hidden="true">'+symbol+'</span>'+esc(title)+'</strong><span class="biofire-action-type">'+(type==='blue'?'HYDRATION':type==='red'?'SAMPLE':type==='screen'?'SCREEN':'PREPARATION')+'</span></div><div class="biofire-training-image">'+picture+'</div><figcaption><span class="biofire-action-arrow" aria-hidden="true">↳</span>'+esc(desc)+'</figcaption></figure>';
}
function stageVisual(id,title){
 if(id!=="torch"&&id!=="spotfire")return "";
 const t=String(title).toLowerCase(),torch=id==="torch";let figs=[];
 if(/load the controls into the red vial|prepare qc sample/i.test(t))figs=[figure("Add approved QC material to red vial","Follow the QC kit instructions for the appropriate material and buffer.",pipette(id)),figure("Mix the capped red QC vial","Gently invert the securely capped red vial 3 times before loading the pouch.",invert())];
 else if(/gather|retrieve|materials/.test(t))figs=[figure("Test kit and both injection vials","Hydration is blue, sample is red. Follow the assay-specific reagent kit.",kit())];
 else if(/loading station|prepare pouch/.test(t))figs=[figure("Prepare pouch loading station","Set the red sample vial in the left well and blue hydration vial in the right well, as viewed from the illustrated operator position.",station("ready"))];
 else if(/hydrate/.test(t))figs=[figure("Hydrate through blue port","Remove the blue vial from its cover and puncture the designated blue hydration port. Confirm the pouch hydrates.",station("hydrate"))];
 else if(/invert.*red|mix red vial|mix the capped/i.test(t))figs=[figure("Important · mix the red vial","Cap the sample injection vial securely and gently invert it 3 times. Return it to the red well before loading the pouch.",invert())];
 else if(/sample.*buffer|mix specimen|prepare specimen/.test(t))figs=[figure(torch?"Prepare GI buffer and specimen":"Prepare specimen and buffer",torch?"GI: dispense buffer first, then 0.2 mL well-mixed Cary Blair specimen.":"SPOTFIRE R: transfer specimen with the supplied fixed-volume pipette first, then add all sample buffer. Confirm the specific panel IFU.",pipette(id))];
 else if(/inject sample|load sample mix/.test(t))figs=[figure("Load red sample mixture","Puncture the red sample port with the prepared sample injection vial. Verify sample is drawn into the pouch.",station("sample"))];
 else if(/available module/.test(t))figs=[
   figure("Instrument and available modules","Identify an available module on the actual analyzer before loading the prepared pouch.",analyzer(id)),
   figure("Confirm module available","The illustration is the same analyzer with its selected-module screen state. Verify the actual module reports Available.",analyzer(id,"selected"))
 ];
 else if(/scan pouch barcode/.test(t))figs=[figure("Scan pouch barcode","Scan the barcoded pouch and match the panel/lot information displayed.",ui(id,1))];
 else if(/confirm panel|verify sample id/.test(t))figs=[figure("Verify panel and identifiers","Confirm the intended panel, pouch and specimen or QC identifiers before running.",ui(id,2))];
 else if(/start assay|start run|load.*module/.test(t))figs=[figure("Insert pouch and start the run","Follow the on-screen loading prompt for the correct module, then verify information and choose START.",ui(id,3))];

 if(!figs.length)return "";
 return '<section class="biofire-training" aria-label="BioFire illustrated preparation"><div class="biofire-training-grid">'+figs.join("")+'</div></section>';
}
window.LAB_BIOFIRE_ART={stageVisual,station,kit,analyzer,ui};
})();