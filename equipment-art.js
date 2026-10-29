/* Original SVG equipment silhouettes for Lab Central.
   Visual orientation only. Illustrations are simplified and intentionally unlabeled at component level. */
(function(){
"use strict";
const specs={
 sysmex:{label:"CBC ANALYZER",shape:"tower",accent:"#348b9c",tip:"EDTA whole blood"},
 piccolo:{label:"CHEMISTRY ANALYZER",shape:"rotor",accent:"#247d98",tip:"Green-top lithium heparin"},
 pathfast:{label:"CARDIAC ASSAYS",shape:"pathfast",accent:"#247a94",tip:"Lithium heparin whole blood / plasma"},
 triage:{label:"CARDIAC MARKERS",shape:"reader",accent:"#31658d",tip:"Assay-specific sample"},
 clinitek:{label:"URINALYSIS",shape:"urine",accent:"#358c88",tip:"Urine sample"},
 torch:{label:"GI PANEL",shape:"torch",accent:"#387c9a",tip:"Stool / Cary Blair"},
 spotfire:{label:"RESPIRATORY PANEL",shape:"modules",accent:"#386f9d",tip:"UTM / eSwab"},
 febridx:{label:"RAPID TEST",shape:"cassette",accent:"#9267a4",tip:"Specimen per test IFU"},
 "drug-screen":{label:"URINE DRUG SCREEN",shape:"cup",accent:"#8370a0",tip:"Urine sample"},
 coagsense:{label:"PT / INR",shape:"coag",accent:"#387e90",tip:"Fingerstick"},
 poc:{label:"RAPID TEST MENU",shape:"tests",accent:"#377f89",tip:"Specimen varies by test"},
 sofia:{label:"RAPID ANTIGEN TESTING",shape:"sofia",accent:"#237ab8",tip:"Respiratory / throat swab"},
 hemocue:{label:"HEMOGLOBIN",shape:"hemocue",accent:"#3b8c91",tip:"Fingerstick"},
 visby:{label:"ARCHIVED PLATFORM",shape:"visby",accent:"#8d939e",tip:"Archived"},
 idnow:{label:"ARCHIVED PLATFORM",shape:"idnow",accent:"#8d939e",tip:"Archived"}
};
function g(s){return '<g>'+s+'</g>'}
function rect(x,y,w,h,r,fill,stroke,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'" stroke-width="'+(sw||2)+'"':'')+'/>'}
function circle(x,y,r,fill,stroke){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'" stroke-width="2"':'')+'/>'}
function line(x1,y1,x2,y2,color,w){return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+color+'" stroke-width="'+(w||3)+'" stroke-linecap="round"/>'}
function txt(x,y,t,size,color,weight){return '<text x="'+x+'" y="'+y+'" font-size="'+(size||12)+'" fill="'+(color||'#314e62')+'" font-weight="'+(weight||750)+'" font-family="Arial,sans-serif" text-anchor="middle">'+t+'</text>'}
function screen(x,y,w,h,accent){return rect(x,y,w,h,9,"#243a49","#7c939f",2)+rect(x+12,y+12,w-24,h-24,5,"#e7f1f3")+rect(x+24,y+24,w-48,13,3,accent)+line(x+24,y+53,x+w-38,y+53,"#aec8d1",3)+line(x+24,y+68,x+w-56,y+68,"#c0d4dc",3)}

/* Shared Piccolo Xpress silhouette, based on the user-supplied front reference.
   Reuse it in the overview, sample-loading guide, and final run confirmation.
   On-screen instructions are schematic; physical enclosure is front-oriented. */
function piccoloDeviceMarkup(mode){
 const isRunning=mode==="running",drawer=mode==="drawer";
 const screenInner=isRunning
 ? '<rect x="268" y="77" width="157" height="206" rx="3" fill="#d5e8f4" stroke="#87a6ba" stroke-width="2"/>'+
   '<rect x="271" y="80" width="151" height="38" fill="#315f91"/>'+
   txt(347,104,"piccolo xpress",14,"#fff",840)+
   txt(347,154,"Analyzing",17,"#32647c",850)+
   '<rect x="288" y="177" width="119" height="17" rx="8" fill="#b5d5e3"/>'+
   '<rect x="288" y="177" width="73" height="17" rx="8" fill="#23998b"/>'+
   txt(347,227,"Run in progress",12,"#547a8c",690)
 : drawer
 ? '<rect x="268" y="77" width="157" height="206" rx="3" fill="#d5e8f4" stroke="#87a6ba" stroke-width="2"/>'+
   '<rect x="271" y="80" width="151" height="38" fill="#315f91"/>'+
   txt(347,104,"piccolo xpress",14,"#fff",840)+
   txt(347,152,"Load Disc",18,"#316a81",850)+
   txt(347,177,"Place disc in drawer",12,"#547a8c",690)+
   '<rect x="287" y="209" width="121" height="32" rx="7" fill="#e7f3f6" stroke="#aac4d1"/>'+
   txt(347,230,"Close drawer",12,"#416f84",800)
 : '<rect x="268" y="77" width="157" height="206" rx="3" fill="url(#lcpx-screen)" stroke="#536e84" stroke-width="2"/>'+
   '<path d="M278 79H308L406 279H375Z" fill="#a1c4d8" opacity=".09"/>';
 const body=
 '<defs><linearGradient id="lcpx-black" x1="0" x2=".92" y1="0" y2="1"><stop stop-color="#263342"/><stop offset=".42" stop-color="#111d2e"/><stop offset="1" stop-color="#111928"/></linearGradient>'+
 '<linearGradient id="lcpx-blue" x1="0" x2="1" y1="0" y2=".9"><stop stop-color="#277dbf"/><stop offset=".45" stop-color="#1766a9"/><stop offset="1" stop-color="#15518a"/></linearGradient>'+
 '<linearGradient id="lcpx-screen" x1="0" x2=".8" y1="0" y2="1"><stop stop-color="#394657"/><stop offset="1" stop-color="#0b1726"/></linearGradient>'+
 '<radialGradient id="lcpx-button"><stop stop-color="#f8fcff"/><stop offset=".6" stop-color="#bfcfd9"/><stop offset="1" stop-color="#819aaa"/></radialGradient></defs>'+
 '<ellipse cx="348" cy="'+(drawer?541:510)+'" rx="152" ry="10" fill="#cedde6" opacity=".6"/>'+
 // Tray and the royal-blue lower cabinet remain visible under the upper black facade.
 '<path d="M246 311Q231 312 231 329V469Q232 486 252 486H443Q463 485 463 465V329Q463 312 447 311Z" fill="url(#lcpx-blue)" stroke="#1d5686" stroke-width="3"/>'+
 '<path d="M245 333Q267 348 285 349H446" fill="none" stroke="#5da8d4" stroke-width="3" opacity=".58"/>'+
 '<path d="M239 468H456V489H239Z" fill="#eef4f6" stroke="#c0cbd1" stroke-width="2"/>'+
 // Tall near-vertical black front, rounded top and bottom, flush with the top of the blue base.
 '<path d="M255 16H439Q462 16 463 45V318Q463 336 444 337H252Q231 336 231 317V46Q231 16 255 16Z" fill="url(#lcpx-black)" stroke="#1b527c" stroke-width="3"/>'+
 '<path d="M258 20H440Q456 20 458 44" fill="none" stroke="#5b768f" stroke-width="2" opacity=".5"/>'+
 '<path d="M241 284H456" fill="none" stroke="#4e5d6a" stroke-width="1.8" opacity=".82"/>'+
 // Actual analyzer reference places the small ABAXIS logo above the tall display.
 txt(347,35,"a product of",7.7,"#b7c3cf",550)+
 txt(347,48,"ABAXIS",13,"#edf2f5",850)+
 '<path d="M365 39l9 -4 5 3" fill="none" stroke="#bc4b5b" stroke-width="2.2"/>'+
 screenInner+
 // Keep logo on the black bezel, not on the colored lower cabinet.
 txt(335,313,"piccolo",19,"#2994dd",850)+
 txt(386,312,"xpress",11,"#e9f1f6",850)+
 '<path d="M388 302l13 -6" stroke="#bf525c" stroke-width="2.2" stroke-linecap="round"/>'+
 txt(347,323,"chemistry analyzer",7.5,"#a7b7c6",520)+
 '<path d="M250 342H445" stroke="#4e8bb7" stroke-width="3" opacity=".35"/>'+
 // Button is low and on the right of the blue front panel.
 '<circle cx="432" cy="438" r="10" fill="#8ba6b5" stroke="#325b77" stroke-width="2"/>'+
 '<circle cx="432" cy="438" r="7" fill="url(#lcpx-button)" stroke="#e3eff5" stroke-width="1.7"/>';
 if(!drawer)return body;
 // The disc is visible only when the lower tray is pulled outward.
 const disc='<ellipse cx="347" cy="522" rx="73" ry="19" fill="#f2f7f8" stroke="#a1bac6" stroke-width="3"/>'+
 '<ellipse cx="347" cy="522" rx="60" ry="15" fill="#d3e4ec" stroke="#8da8b8" stroke-width="2"/>'+
 Array.from({length:16},function(_,i){const a=i*2*Math.PI/16,x=347+49*Math.cos(a),y=522+12*Math.sin(a);return '<ellipse cx="'+x.toFixed(2)+'" cy="'+y.toFixed(2)+'" rx="4" ry="3" fill="#f6fafb" stroke="#b5c8cf" stroke-width=".8"/>';}).join('')+
 '<ellipse cx="347" cy="522" rx="10" ry="4" fill="#edf7fa" stroke="#8caebc" stroke-width="2"/>';
 return body+
 '<path d="M247 491H449L475 515Q476 535 459 539H238Q221 537 221 521Z" fill="#ecf1f4" stroke="#a3bac6" stroke-width="3"/>'+
 disc+
 '<path d="M250 536H446" stroke="#b5cbd5" stroke-width="3"/>';
}
function piccoloDeviceSvg(mode){
 const m=mode||"ready",view=m==="running"?"160 0 560 540":"165 0 385 550";
 let check="";
 if(m==="running")check=
 '<circle cx="595" cy="218" r="54" fill="#e7f6ee" stroke="#66bc9f" stroke-width="4"/>'+
 '<path d="M568 218l20 20 35-40" fill="none" stroke="#178e68" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>'+
 txt(595,302,"RUN STARTED",18,"#177e69",900)+
 txt(595,328,"Run initiation only",12,"#587a89",700)+
 txt(595,345,"Verify final results and QC",11,"#587a89",640);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" role="img" aria-label="'+(m==="running"?"Piccolo Xpress analyzer with analysis in progress and successful run-start confirmation":m==="drawer"?"Piccolo Xpress analyzer with lower reagent disc tray extended":"Piccolo Xpress analyzer, front view")+'">'+piccoloDeviceMarkup(m)+check+'</svg>';
}


/* One reference-matched pocH-100i housing throughout Lab Central. The photo
   supplied for this project shows an off-white, upright CBC analyzer with a
   left upper touchscreen, lower left service panel, purple right-front sample
   bay, and a right-side accessory shelf with reagent bottles/tubing.
   Menu content remains illustrative, never an exact analyzer screenshot. */
function sysmexDeviceMarkup(mode,showAccessory=true){
 const m=String(mode||"ready").toLowerCase(),off=m==="switch";
 const states={
  ready:["MAIN / WB","Sample ID     #####","WB     QC     Run"],
  patient:["MAIN / WB","Sample ID     #####","WB  •  Confirm tube"],
  qc:["QC","Control level 1 / 2 / 3","Review QC status"],
  running:["MAIN / WB","Analyzing sample","Run in progress"],
  shutdown:["SHUTDOWN","Shutdown complete","Safe to power off"],
  switch:["SHUTDOWN","Shutdown complete","Safe to power off"],
  waste:["MAINTENANCE","Discard waste","Execute / Cancel"],
  transducer:["MAINTENANCE","Clean transducer","Execute / Cancel"],
  reagent:["MAINTENANCE","Replace reagent","Check lot / Execute"],
  other:["MAINTENANCE","Select maintenance","Follow actual prompt"]
 };
 const lines=states[m]||states.ready;
 const t=(x,y,v,size=15,color="#3e6077",weight=750,anchor="middle")=>
  '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'" font-family="Arial,sans-serif">'+v+'</text>';
 let h=
 '<defs>'+
 '<linearGradient id="sx-cabinet" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fbfcfa"/><stop offset=".52" stop-color="#e7e9e5"/><stop offset="1" stop-color="#cdd1ce"/></linearGradient>'+
 '<linearGradient id="sx-side" x1="0" x2="1"><stop stop-color="#e9ebe9"/><stop offset="1" stop-color="#b9c2c4"/></linearGradient>'+
 '<linearGradient id="sx-door" x1="0" x2="1"><stop stop-color="#5e337d" stop-opacity=".92"/><stop offset=".55" stop-color="#8b58a0" stop-opacity=".83"/><stop offset="1" stop-color="#4b226e" stop-opacity=".95"/></linearGradient>'+
 '<linearGradient id="sx-bottle" x1="0" x2="1"><stop stop-color="#fafafa"/><stop offset=".58" stop-color="#e8ecec"/><stop offset="1" stop-color="#d3dada"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="367" cy="450" rx="'+(showAccessory?294:204)+'" ry="11" fill="#dce7eb"/>'+
 // Instrument cabinet: broad white face with rounded but not overly domed top.
 '<path d="M105 37Q105 18 127 16H385Q414 17 420 44L430 408Q430 438 400 440H118Q94 439 94 412L90 74Q90 50 105 37Z" fill="url(#sx-cabinet)" stroke="#9eabb0" stroke-width="4"/>'+
 '<path d="M389 20Q419 23 422 58L430 405Q430 432 401 438L393 436Z" fill="url(#sx-side)" stroke="#a3b1b8" stroke-width="2"/>'+
 '<path d="M112 32Q124 23 155 24H366" fill="none" stroke="#fff" stroke-width="7" opacity=".76"/>'+
 // Angular recessed display bezel and the screen mounted in upper LEFT.
 '<path d="M133 79L146 67H356L367 81V252L350 264H135L124 251V94Z" fill="#bac4c5" stroke="#a0adaf" stroke-width="3"/>'+
 '<rect x="139" y="89" width="213" height="164" rx="3" fill="#e7f1f4" stroke="#526b7d" stroke-width="4"/>'+
 '<rect x="146" y="96" width="199" height="24" rx="2" fill="#b9dfe0"/>'+
 '<rect x="149" y="124" width="195" height="122" rx="2" fill="#d5e7f2"/>'+
 t(154,113,"sysmex",11,"#2f8198",900,"start")+
 t(340,113,m==="running"?"Running":"Not Ready",10,m==="running"?"#178f74":"#57788b",740,"end")+
 t(246,143,lines[0],13,"#3e6880",900)+
 '<rect x="167" y="154" width="166" height="33" rx="5" fill="#f4f9fa" stroke="#b3cdd8" stroke-width="2"/>'+
 t(250,176,lines[1],14,"#47667b",780)+
 '<rect x="169" y="198" width="51" height="31" rx="5" fill="#e7b3cb" stroke="#b8a1ba"/>'+
 '<rect x="226" y="198" width="48" height="31" rx="5" fill="#d3eaf2" stroke="#a8c5d5"/>'+
 '<rect x="280" y="198" width="51" height="31" rx="5" fill="#a6dedc" stroke="#83b6b4"/>'+
 t(194,218,m==="qc"?"QC":"ID",11,"#4c6982",850)+
 t(250,218,"WB",11,"#4c6982",850)+
 t(306,218,m==="running"?"Run":"OK",11,"#2e797b",850)+
 // Manufacturer wordmark below screen, NOT a fictional upper body logo.
 t(137,296,"pocH-100i",23,"#596164",780,"start")+
 '<path d="M160 306q25 13 53 1" fill="none" stroke="#707b7d" stroke-width="5"/>'+
 // Bottom-left solid panel and separation line.
 '<path d="M103 321H281V431H117Q103 428 103 410Z" fill="#e9ebe9" stroke="#b8c1c2" stroke-width="2.5"/>'+
 '<path d="M105 322H281" stroke="#a3afb1" stroke-width="3"/>'+
 // Tall purple translucent patient sample door, correct position at lower-right front.
 '<path d="M293 302Q296 286 314 284H385Q403 284 404 303V436H294Z" fill="url(#sx-door)" stroke="#6a4c84" stroke-width="3"/>'+
 '<path d="M307 312H390V429H308Z" fill="#392058" fill-opacity=".54"/>'+
 '<rect x="316" y="322" width="64" height="30" rx="5" fill="#7d559a" opacity=".72"/>'+
 '<path d="M325 366Q348 356 366 368L375 415H321Z" fill="#221739" fill-opacity=".74"/>'+
 '<rect x="330" y="387" width="35" height="39" rx="6" fill="#c49bcf" fill-opacity=".59"/>'+
 '<path d="M310 291Q350 282 391 292" fill="none" stroke="#c7a9d5" stroke-width="4" opacity=".38"/>';
 // Capped tube enters the protected front sample chamber, not the outer bottle.
 if(m==="patient")h+='<rect x="337" y="372" width="21" height="48" rx="5" fill="#e9f1f4" fill-opacity=".9" stroke="#b6cbd2" stroke-width="1.7"/>'+
 '<rect x="334" y="364" width="27" height="11" rx="4" fill="#ae86c4"/>';
 if(m==="running")h+='<rect x="176" y="239" width="128" height="5" rx="2" fill="#c2dce3"/>'+
 '<rect x="176" y="239" width="76" height="5" rx="2" fill="#2c9a8f"/>';
 if(off)h+='<rect x="416" y="294" width="24" height="53" rx="5" fill="#242c36" stroke="#101820" stroke-width="3"/>'+
 '<rect x="421" y="301" width="15" height="39" rx="3" fill="#101923"/>'+
 '<path d="M422 326l13-6" stroke="#f7fcfe" stroke-width="2.5"/>';
 if(showAccessory&&!off){
  // Separate raised right shelf and a white purple-banded reagent bottle,
  // with smaller rear connections. This mirrors the supplied photograph.
  h+='<path d="M428 261Q430 251 442 251H630L649 270V424H430Z" fill="#e7eaeb" stroke="#abb8bb" stroke-width="3"/>'+
   '<path d="M449 259V435H647V422" fill="none" stroke="#fefefe" stroke-width="6"/>'+
   '<path d="M461 100Q454 81 468 66L485 52" fill="none" stroke="#8cabae" stroke-width="7" stroke-linecap="round"/>'+
   '<path d="M477 68L492 90L510 120" fill="none" stroke="#ce8e82" stroke-width="4"/>'+
   '<path d="M501 68L525 60L536 90V144" fill="none" stroke="#b49d8a" stroke-width="4"/>'+
   '<rect x="479" y="67" width="22" height="32" rx="4" fill="#5a95ab"/>'+
   '<rect x="526" y="78" width="27" height="28" rx="4" fill="#b94147"/>'+
   '<path d="M492 131H566Q573 131 573 139V197H490Z" fill="#eef2f2" stroke="#b2c2c6" stroke-width="3"/>'+
   '<rect x="541" y="169" width="24" height="30" rx="4" fill="#6b3e91"/>'+
   '<rect x="483" y="203" width="115" height="179" rx="29" fill="url(#sx-bottle)" stroke="#abb8bb" stroke-width="3"/>'+
   '<rect x="507" y="186" width="62" height="34" rx="9" fill="#eceff0" stroke="#aebfc5" stroke-width="2"/>'+
   '<rect x="503" y="218" width="73" height="24" rx="5" fill="#f6f8f9"/>'+
   '<rect x="485" y="270" width="111" height="16" fill="#573778"/>'+
   '<rect x="494" y="298" width="94" height="66" rx="4" fill="#fff" stroke="#cedadd" stroke-width="2"/>'+
   '<path d="M508 310H574M508 321H574M508 333H566M508 345H563" stroke="#b5bdc4" stroke-width="2"/>'+
   t(542,355,"REAGENT",9,"#7b8790",850);
 }
 return h;
}
function sysmexDeviceSvg(mode,showAccessory=true){
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 0 650 465" role="img" aria-label="Sysmex pocH-100i CBC analyzer with upper left screen, white cabinet, lower purple sample chamber'+(showAccessory?' and right-hand reagent bottle':'')+'">'+sysmexDeviceMarkup(mode,showAccessory)+'</svg>';
}


/* Shared Siemens CLINITEK Status+ housing, matched to supplied reference photo.
   The white angled housing has a wide upper gray screen, top printer slot,
   power button on screen-right, branding beneath and an actual pull-out
   black test table under the right-front face.
   The strip and CLINITEST hCG cassette use DISTINCT removable table inserts. */
function clinitekDeviceMarkup(mode="empty"){
 const m=String(mode||"empty").toLowerCase();
 const stripMode=m==="strip",cassetteMode=m==="cassette",trayOut=!/reading|result|closed/.test(m);
 const T=(x,y,t,size=13,color="#425b69",weight=750,anchor="middle")=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+weight+'" fill="'+color+'">'+t+'</text>';
 let art=
 '<defs>'+
 '<linearGradient id="cl-status-case" x1="0" x2=".94" y1="0" y2="1"><stop stop-color="#fff"/><stop offset=".55" stop-color="#f5f6f1"/><stop offset="1" stop-color="#d6dad7"/></linearGradient>'+
 '<linearGradient id="cl-status-glass" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#eef0ed"/><stop offset="1" stop-color="#bfc9cb"/></linearGradient>'+
 '<linearGradient id="cl-status-table" x1="0" x2=".9" y1="0" y2="1"><stop stop-color="#353d44"/><stop offset="1" stop-color="#0e151d"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="303" cy="363" rx="215" ry="10" fill="#dfe8ec"/>'+
 // Top printer recess, as in the source photo.
 '<path d="M132 56L152 25Q166 14 192 14H407Q440 16 453 41L479 287Q477 311 458 316H123Q101 316 101 292L109 91Q112 66 132 56Z" fill="url(#cl-status-case)" stroke="#c7cfce" stroke-width="3"/>'+
 '<path d="M179 40L189 24H394L404 42Z" fill="#e7ebe8" stroke="#d3d9d5" stroke-width="2"/>'+
 '<path d="M208 28H371L361 39H216Z" fill="#c8cfce"/>'+
 '<path d="M125 71Q138 55 157 52L421 50" fill="none" stroke="#fff" stroke-width="7" opacity=".7"/>'+
 // Sloped screen recess, wide and gray.
 '<path d="M152 89L162 80H421L432 91V205L424 216H149L141 208V104Z" fill="#c1c9c8" stroke="#aab7b8" stroke-width="3"/>'+
 '<path d="M156 96L167 91H411L419 101V201H157Z" fill="url(#cl-status-glass)" stroke="#8a9da2" stroke-width="2.5"/>'+
 '<path d="M162 98H404L412 124L404 187H161Z" fill="#e6eae7" opacity=".3"/>'+
 // Keep real physical interface silhouette. The menu remains schematic.
 ((m==="empty"||m==="ready")?'':(
 '<rect x="185" y="117" width="204" height="67" rx="4" fill="#dfe9ec" opacity=".92"/>'+
 T(287,137,m==="cassette"?"Cassette Test":m==="strip"?"Strip Test":m==="result"?"Results":"CLINITEK Status+",13,"#426679",850)+
 '<rect x="199" y="147" width="172" height="23" rx="4" fill="#c9e8e7" stroke="#b1cdd2"/>'+
 T(285,163,m==="cassette"?"CLINITEST hCG":m==="strip"?"Urinalysis strip":m==="result"?"Review report":"Follow screen prompts",11,"#376577",700)
 ))+
 // Correct CLINITEK Status+ / Siemens branding and power button.
 T(162,244,"CLINITEK Status+",19,"#273944",820,"start")+
 T(255,260,"Analyzer",9,"#647681",620)+
 T(164,291,"SIEMENS",22,"#3299b0",900,"start")+
 '<circle cx="434" cy="242" r="19" fill="#abb6b8" stroke="#86999d" stroke-width="3"/>'+
 '<circle cx="434" cy="241" r="14" fill="#ecf1f0" stroke="#bdc9c9" stroke-width="2"/>'+
 '<path d="M434 230V241M426 238A10 10 0 1 0 442 238" stroke="#6c8085" stroke-width="2.5" fill="none" stroke-linecap="round"/>'+
 // Pictogram on real face, subtle and non-instructional.
 '<rect x="307" y="264" width="125" height="32" rx="3" fill="#fcfbf8" stroke="#d2d9d7"/>'+
 '<rect x="316" y="270" width="29" height="18" fill="#f4f8f8" stroke="#c38e9e"/>'+
 '<rect x="351" y="270" width="33" height="18" fill="#eef1f1" stroke="#b5c2c5"/>'+
 '<path d="M391 273h32m-16-6v23" stroke="#a6b8c0" stroke-width="2"/>'+
 // Instrument base feet, not a fictional hinged right-side drawer.
 '<path d="M132 316H457V329Q455 341 443 341H142Q131 340 132 330Z" fill="#c9d2d3" stroke="#acb8bb" stroke-width="2"/>'+
 '<path d="M146 337H220M379 337H452" stroke="#8f9b9f" stroke-width="4"/>'+
 // Real black test-table slot at bottom-right front.
 '<path d="M330 306H449V325H330Z" fill="#111a22" stroke="#5d6871" stroke-width="2"/>';
 if(trayOut){
  // The user's reference shows the table sticking out toward the operator.
  art+='<path d="M337 319L451 319L479 353L480 391Q466 400 450 402H352Q339 400 337 389Z" fill="url(#cl-status-table)" stroke="#303c45" stroke-width="3"/>'+
   '<path d="M350 331H444L464 359V377Q457 389 448 389H357Q350 387 350 377Z" fill="#29323a" stroke="#69777f" stroke-width="2"/>'+
   '<path d="M362 343L434 343L447 365H365Z" fill="#111c25" stroke="#5f7079" stroke-width="1.6"/>'+
   '<path d="M356 396H466" stroke="#121c24" stroke-width="6" stroke-linecap="round"/>';
  if(stripMode){
   art+='<g aria-label="UA reagent strip on strip test table insert">'+
    '<path d="M383 349L394 348L425 378L414 380Z" fill="#f8fcfa" stroke="#9cb2b9" stroke-width="1.6"/>'+
    ['#ddc88a','#a4c79e','#c5a3b7','#9bafcb','#e4bb89','#98c4c0','#c9b2a0'].map((c,i)=>{
      const x=389+i*4,y=351+i*4;
      return '<rect x="'+x+'" y="'+y+'" width="9" height="5" rx="1" fill="'+c+'" transform="rotate(42 '+x+' '+y+')"/>';
    }).join('')+'</g>';
  }
  if(cassetteMode){
   art+='<g aria-label="CLINITEST hCG cassette on cassette test table insert">'+
    '<path d="M358 349L424 347L450 371L383 381Z" fill="#f6f9f8" stroke="#b2c5cb" stroke-width="2"/>'+
    '<path d="M378 356L400 353L411 360L388 364Z" fill="#dfebef" stroke="#99b2bf"/>'+
    '<ellipse cx="427" cy="367" rx="6" ry="4" fill="#f8f7f1" stroke="#879eac" stroke-width="1.8"/>'+
    '<path d="M402 371L414 370" stroke="#8aa9b6" stroke-width="1.4"/></g>';
  }
 }else art+='<path d="M341 321H445V335H341Z" fill="#253039" stroke="#66747b" stroke-width="2"/>';
 return art;
}
function clinitekDeviceSvg(mode="empty"){
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="45 0 500 420" role="img" aria-label="Siemens CLINITEK Status+ front view with wide touchscreen and '+(mode==="strip"?"urinalysis strip seated in the black strip test-table insert":mode==="cassette"?"CLINITEST hCG cassette seated in the distinct cassette table insert":"black pull-out test table")+'">'+clinitekDeviceMarkup(mode)+'</svg>';
}

function body(shape,a){
 let v="";
 if(shape==="tower"){
 /* Shared reference-based pocH: no alternate cabinet geometry. */
 v='<g transform="translate(135 -8) scale(.61)">'+sysmexDeviceMarkup("ready",true)+'</g>';
 }else if(shape==="rotor"){
 /* Reuse the same reference-matched tall, narrow Piccolo art as procedure steps. */
 v='<g transform="translate(176 4) scale(.56)">'+piccoloDeviceMarkup("ready")+'</g>';
 }else if(shape==="pathfast"){
 // Curved white PATHFAST compact analyzer, left touchscreen/printer, large
 // teal-blue transparent right chamber and central blue handle.
 v='<defs>'+
 '<linearGradient id="pf-case-p" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#fcfefd"/><stop offset=".65" stop-color="#e5edef"/><stop offset="1" stop-color="#cddde2"/></linearGradient>'+
 '<linearGradient id="pf-cover-p" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#123a54"/><stop offset=".45" stop-color="#176d88"/><stop offset="1" stop-color="#0c3d56"/></linearGradient>'+
 '<linearGradient id="pf-glass-p" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#b6e7ee" stop-opacity=".62"/><stop offset=".5" stop-color="#a3d4e1" stop-opacity=".12"/><stop offset="1" stop-color="#7fc8da" stop-opacity=".38"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="368" cy="291" rx="166" ry="12" fill="#dce6ea" opacity=".6"/>'+
 '<path d="M243 265 L237 153 Q238 74 265 64 Q310 50 331 38 Q353 17 389 18 L460 21 Q496 26 514 63 Q535 106 529 251 Q528 276 507 281 H264 Q245 280 243 265Z" fill="url(#pf-case-p)" stroke="#9eb4be" stroke-width="3"/>'+
 '<path d="M250 145 Q246 76 276 70 Q328 63 348 42 Q376 22 422 30" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>'+
 '<rect x="254" y="154" width="86" height="98" rx="8" fill="#d7e4e8" stroke="#91a7b4" stroke-width="2.4"/>'+
 '<rect x="260" y="161" width="73" height="79" rx="3" fill="#b5d7e1" stroke="#799eb2" stroke-width="2"/>'+
 '<rect x="263" y="164" width="67" height="13" fill="#4f9eb8"/>'+
 '<text x="298" y="173" font-family="Arial" font-size="7" font-weight="850" text-anchor="middle" fill="#fff">ASSAY HOME</text>'+
 '<rect x="267" y="182" width="59" height="13" rx="2" fill="#def2f5"/>'+
 '<rect x="267" y="198" width="28" height="15" rx="3" fill="#e9f7f7" stroke="#80b5c1"/>'+
 '<rect x="299" y="198" width="27" height="15" rx="3" fill="#e9f7f7" stroke="#80b5c1"/>'+
 '<path d="M267 223h51 M267 231h42" stroke="#8bb8c8" stroke-width="3"/>'+
 '<text x="297" y="252" text-anchor="middle" fill="#365d70" font-weight="850" font-size="8">TOUCHSCREEN</text>'+
 '<rect x="258" y="254" width="78" height="24" rx="4" fill="#f8faf9" stroke="#c0cdd1" stroke-width="2"/>'+
 '<rect x="268" y="258" width="54" height="12" rx="2" fill="#8b9da7"/>'+
 '<rect x="274" y="264" width="41" height="4" fill="#eef6f6"/>'+
 '<path d="M262 276v-12 M333 276v-12" stroke="#d0dcdf" stroke-width="2"/>'+
 '<text x="287" y="143" font-family="Arial" font-size="12" font-weight="900" fill="#50626a">COMPACT</text>'+
 '<circle cx="331" cy="145" r="4" fill="#318b76"/>'+
 '<path d="M375 76 Q379 54 405 53 L466 54 Q498 59 502 94 L502 239 Q498 261 475 265 L391 266 Q364 260 364 234 L363 108 Q363 85 375 76Z" fill="#4bacc3" stroke="#67b7cc" stroke-width="4"/>'+
 '<path d="M378 87 Q386 64 407 65 L466 66 Q485 70 490 95 L491 228 Q489 247 472 252 H389 Q377 250 375 227 L374 109Z" fill="url(#pf-cover-p)" stroke="#2e91ad" stroke-width="3"/>'+
 Array.from({length:6},(_,i)=>'<path d="M'+(394+i*14)+' 119 v116" stroke="#8cbfd1" stroke-width="5" opacity=".3"/>').join("")+
 '<path d="M391 228 L473 228 L478 243 L384 243Z" fill="#9cbbc5" opacity=".65"/>'+
 '<path d="M388 77 Q390 65 400 65 L448 66" stroke="#f5ffff" stroke-opacity=".46" stroke-width="7" stroke-linecap="round" fill="none"/>'+
 '<path d="M464 85 Q485 94 482 135 L482 224" stroke="#8dd3e4" stroke-width="5" opacity=".24" fill="none"/>'+
 '<path d="M375 107 L377 222 Q378 248 398 254 H455" stroke="#167ba1" stroke-width="4" opacity=".6" fill="none"/>'+
 '<path d="M386 111 Q421 98 454 105 L472 120 L466 195 Q459 207 399 205 L386 189Z" fill="url(#pf-glass-p)"/>'+
 '<text x="433" y="176" text-anchor="middle" font-family="Arial" fill="#f4ffff" font-size="17" letter-spacing="2" font-weight="900">PATHFAST</text>'+
 '<path d="M396 252 Q420 243 469 251 L467 268 Q431 280 400 267Z" fill="#51b3cb" stroke="#368eac" stroke-width="3"/>'+
 '<path d="M399 264 Q435 277 467 264" stroke="#b7e8f1" stroke-width="3" fill="none"/>'+
 '<path d="M240 240 H223 Q217 240 217 250 V278" fill="none" stroke="#abbcc4" stroke-width="3"/>'+
 '<path d="M200 276 Q219 269 230 277" stroke="#c8d6dd" stroke-width="4" fill="none"/>';
}else if(shape==="reader"){
 v=rect(192,68,350,197,14,"#edf2f5","#a6b7bf",3)+rect(206,82,329,107,5,"#b4c0c7")+rect(215,96,200,80,3,"#d7e2e8","#7f99a5",2)+rect(427,98,101,73,8,"#d8e4e9")+Array.from({length:5},(_,i)=>circle(451+(i%3)*24,111+Math.floor(i/3)*25,8,"#eaf1f4","#92a8b5")).join("")+rect(217,194,230,59,7,"#f5f8fa","#c3d0d7")+Array.from({length:12},(_,i)=>txt(237+(i%4)*53,209+Math.floor(i/4)*17,i===9?"0":String(i+1),10,"#4c6472",750)).join("")+rect(454,224,66,25,6,"#2d3d46")+txt(300,88,"Triage MeterPro",11,"#fff",790)+txt(476,215,"Quidel",12,"#92a9b6",810);
 }else if(shape==="urine"){
 v='<g transform="translate(75 0) scale(.73)">'+clinitekDeviceMarkup("empty")+'</g>';
 }else if(shape==="torch"){
 v='<ellipse cx="385" cy="286" rx="235" ry="15" fill="#dae4e9" opacity=".65"/>'+
 '<path d="M182 99 L234 64 L518 64 L583 100 L583 234 L532 272 L197 272 L180 236Z" fill="#e6edef" stroke="#9cabb6" stroke-width="3"/>'+
 '<path d="M181 99 L234 64 L278 64 L278 271 L194 269 L182 235Z" fill="#545a64" stroke="#555d69" stroke-width="3"/>'+
 '<path d="M276 79 H520 L554 103 L554 228 H276Z" fill="#f5f7f7" stroke="#bdcbd0" stroke-width="2"/>'+
 Array.from({length:4},(_,i)=>{const x=286+(i%2)*133,y=91+Math.floor(i/2)*61;return '<rect x="'+x+'" y="'+y+'" width="124" height="54" rx="6" fill="#fcfdfd" stroke="#a2b5c1" stroke-width="2"/><rect x="'+(x+10)+'" y="'+(y+14)+'" width="20" height="27" rx="4" fill="#26323e"/><path d="M'+(x+35)+' '+(y+18)+'h14" stroke="#c54d54" stroke-width="4"/>';}).join('')+
 '<path d="M400 226 L566 210 L604 267 L420 282Z" fill="#e0ebef" stroke="#9bafb9" stroke-width="3"/>'+
 '<path d="M429 229 L556 217 L581 255 L449 268Z" fill="#233746" stroke="#5c7c8e" stroke-width="3"/>'+
 '<path d="M445 234 L554 226 L568 251 L460 258Z" fill="#d6edf1"/>'+
 '<text x="229" y="203" transform="rotate(-90 229 203)" fill="#eff3f5" font-family="Arial" font-size="12" font-weight="800">BIOFIRE</text>'+
 '<text x="509" y="246" fill="#3a7995" font-family="Arial" font-size="11" font-weight="800">TORCH</text>';
 }else if(shape==="modules"){
 v=rect(194,104,215,166,18,"#eef3f6","#9cadb9",3)+rect(211,119,180,99,10,"#d9e5ea","#b7cbd4",2)+'<path d="M260 135 H330 V151 H280 V192 H260Z" fill="#293847" stroke="#c84f4f" stroke-width="4"/>'+rect(214,228,179,29,7,"#dae6eb")+txt(303,245,"BIOFIRE SPOTFIRE",11,"#2a809b",840)+rect(404,59,120,196,17,"#f3f7f9","#9db3bf",3)+rect(417,81,95,154,6,"#263c4b")+rect(427,94,75,119,3,"#e1edf2")+txt(465,131,"Available",13,"#356b86",850)+circle(464,243,7,"#4a91aa");
 }else if(shape==="sofia"){
 v='<path d="M210 92 Q219 62 262 59 L460 69 Q507 76 519 126 L524 241 Q522 258 503 264 L253 266 Q218 258 214 230Z" fill="#223440" stroke="#1a313d" stroke-width="4"/>'+'<path d="M205 119 L223 77 Q245 60 270 59 L270 263 L237 264Z" fill="#117b9b"/>'+rect(284,87,204,121,15,"#1d2835","#638ca1",2)+rect(303,106,166,80,7,"#d9e9ef")+circle(387,146,24,"#edb76c")+txt(388,153,"+",29,"#fff",800)+rect(390,216,103,36,8,"#0d283a")+rect(415,220,55,27,6,"#1587a5")+txt(329,236,"Sofia 2",16,"#e5edf2",800);
 }else if(shape==="hemocue"){
 v='<path d="M309 38 Q317 27 340 28 L451 30 Q464 40 465 58 L471 236 Q462 258 449 267 L316 266 Q302 249 302 233Z" fill="#c83c46" stroke="#9e2b34" stroke-width="4"/>'+rect(322,68,129,106,15,"#393e7d","#262e65",3)+rect(337,84,99,50,4,"#d2dfdf")+txt(387,164,"Hb 201+",13,"#fff",750)+rect(342,211,91,39,10,"#272d3b")+rect(349,220,73,16,5,"#151b2a")+txt(386,59,"HemoCue",13,"#fff",850);
 }else if(shape==="coag"){
 v='<path d="M266 242 L268 112 Q274 75 311 70 L448 70 Q489 81 497 118 L508 237 Q505 261 487 267 L289 266 Q269 262 266 242Z" fill="#f1f5f7" stroke="#a2b4bf" stroke-width="3"/>'+rect(295,99,175,105,13,"#1f303e")+rect(314,116,137,68,4,"#d3e9ef")+txt(381,148,"Apply sample",12,"#357b93",800)+txt(377,225,"Coag-Sense",16,"#a94453",850)+rect(361,244,87,28,10,"#293e4b")+rect(383,248,47,13,4,"#b8d0d7");
 }else if(shape==="cup"){
 v=rect(290,84,177,175,20,"#edf3f7","#91a5b2",3)+rect(280,69,198,33,11,"#b9cdd6","#829aa8")+Array.from({length:7},(_,i)=>rect(312+i*19,117,10,98,4,"#f5fafb","#c0d3db")+rect(315+i*19,160,4,16,2,i%2?a:"#c9b6d7")).join("")+rect(328,227,102,12,4,"#aac2cf");
 }else if(shape==="cassette"||shape==="tests"){
 const count=shape==="tests"?3:1;
 v=Array.from({length:count},(_,i)=>{const x=shape==="tests"?190+i*140:260;const y=shape==="tests"?110:94;const w=shape==="tests"?115:245;return rect(x,y,w,113,18,"#f4f8fa","#9ab0bc",3)+rect(x+16,y+23,w-32,22,6,"#d5e4eb")+rect(x+18,y+69,w-36,22,8,"#e0eaee")+rect(x+26,y+75,w-52,10,4,"#d7c0dc")+rect(x+39,y+76,5,10,2,a)}).join("");
 }else if(shape==="visby"){
 v=rect(247,79,245,178,24,"#f1f4f6","#b3bbc3",3)+rect(268,97,201,28,10,"#dbe2e7")+circle(368,188,56,"#ebf0f3","#9eacb8")+circle(368,188,23,"#b6c8d0","#8a9ca8");
 }else if(shape==="idnow"){
 v='<path d="M228 239 L238 108 Q245 68 277 61 L477 61 Q506 72 514 115 L520 236 Q513 259 492 263 L252 263 Q232 261 228 239Z" fill="#eff4f5" stroke="#9bafb8" stroke-width="3"/>'
 +rect(382,91,109,111,9,"#536d7d","#9cb7c4",2)+rect(390,99,92,92,5,"#d8e8ed")
 +rect(260,105,107,128,15,"#e3ebef","#c2d0d7",2)
 +txt(436,225,"ID NOW",17,"#4e6471",850)+txt(437,243,"Abbott",11,"#2672a3",840);

 }
 return v;
}
function render(sec){
 if(!sec||!Object.prototype.hasOwnProperty.call(specs,sec.id))return "";
 const item=specs[sec.id],a=item.accent,label=item.label;
 const core=body(item.shape,a);
 const svg=sec.id==="torch"&&window.LAB_BIOFIRE_ART?.analyzer
   ?window.LAB_BIOFIRE_ART.analyzer("torch").replace('<svg ','<svg class="equipment-svg" ').replace('viewBox="0 0 920 400"','viewBox="205 0 510 375"')
   :'<svg class="equipment-svg" viewBox="0 0 740 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified illustration of '+String(sec.title).replace(/"/g,"&quot;")+' instrument">'+
 '<defs><linearGradient id="equip-white" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#cfdee5"/></linearGradient></defs>'+
 '<ellipse cx="376" cy="273" rx="230" ry="16" fill="#b7cad5" opacity=".23"/>'+core+'</svg>';
 return '<section class="equipment-overview '+(sec.id==="torch"?"torch-overview":"")+'" aria-label="'+String(sec.title).replace(/"/g,"&quot;")+' visual reference"><div class="equipment-art">'+svg+'</div>'+
 '<div class="equipment-information"><div class="equipment-overline">EQUIPMENT REFERENCE</div><h2>'+sec.title+'</h2><p>'+label+'</p>'+
 '<dl><div><dt>Specimen</dt><dd>'+item.tip+'</dd></div><div><dt>Instructions</dt><dd>Use the procedure tabs for operation, QC and handling.</dd></div></dl>'+
 '</div></section>';
}

/* Piccolo-specific teaching images. User-supplied disc and gray transfer-tool photos are embedded at reduced resolution. */
const piccoloImages={
 tip:"data:image/webp;base64,UklGRqgCAABXRUJQVlA4IJwCAABwIACdASrwAPAAPtVqrFCoJyknJdapQSAaiWlu+E489z8DsM7aCHBILgvq4oym+w9sgXvyttgbvNLS+hOZeekO7fKLBTnd6kteZJF4FmqKJKhn5gdNRtMPv1xSbBw5f5iqXnjwr3XOEYx81KtsPSgRoM+pP3R2sQyJFnwAQGYRtPCfe4QS28kG/zEAK5Fsu5dZGCLfA8E7Gy5tFOsi8MEGbJkgGyS+jzxko1wY9z7ZUDVpU3E1keiAy+2m6YJuqEA0IMH1z0/NwiUD7J3m5vdm388VzV6/a0wKD5I4Xx/DxMHZvkiq3fKcETSkARrJSl0YOyF7qUBHUqDzXuXysQv5187SZ+uSG+Zb1MkAAP7yPAACx5qKiIAEgYR/7lG03yJfONgSKgp5+Vu60qkNFwV6d/qslsvNpp/2Vo+LRXTfnAllxzsLoB4T6x4r8kV/CiemXtQQqMZqC6X99QPC66dabPdkl2ZIYD47M3Y8X5FoLgbI1Yktwpnrc8cBNkxwUaKEBCxCpvPnBDC8ufkxHSLLk2E2XJVN2bjkaFR0k5Pb3Xp4qJn/KgUyk102K0BbXz2CPMKJruVl/y+TNA9vzvQmsB4h0mCkY5kcQI0/nxvb/6otNCNsyIrbhQGb1/SEsZPMGU5wbqiEHyIv/q+ztQ8IMtjoYFgQ2xccGFXGlCzjok8MczkUMCozAEs4546D6tklAL27V19G7OrAqRlSmuNhUCcWv+g/7iVtqVZgHQMxdueNSmkPd4Z3A/AfH1g7nDlIdUscoNY1sxrDDzbEkjmC6J0k/sia0sQbgs6XDSZRpsww2Aa/OpmtUuqrDlbuMJWwAFRJtsbKn2rruQJZfOv6vb0ZAlVcbpsNcpJJDDwCWsFg1+rYLVOAAAAAAA==",
 disc:"data:image/webp;base64,UklGRhgGAABXRUJQVlA4IAwGAAAwQQCdASrbAA4BPtViqVAoJSijJ1HLyRAaiWludcVT+2N0DljG5t/Mcrfr51+p1MsyQOKkTHeiuKi2nQfH4/hRy2jd5upRWod0ELTscnpSOYOzxyy6YRYzu5K27bLEKK4MZbvRwOSs2EDZ6ahh4ExhoJZxfRCKqJEC30GcLMjRedafhdpuEX+AiphNLVM3OZT1OLqs2xbgNzJnm+BzLuQZ6Aw6N50BoIwZz2uk1Hd1hQflbkkw615TZWEVvWBO+PlmPMlK86ILHIRuQeBTTwa7MxxZFh3o4tOQ4tVkJ8yLzKrb5mVw1ir4TAS+KI5cVMlCVGQNahnxygcmVMRAlvyBE4OETmDXksoTJF4WzvsmatxhERhgiKlnUFQ1owIdN5gsK9AXXA3jBOAI/QWVraVJklCNnQb7CpExY5TatGrv7NknHyUmaLIcNYgRjxevLkssVEWMWGNyf2mkznbBWCWcSUg9AzQPe6sQ+h6grKnYvNAmFNxaXtBdBTkTIDN4Vo2McqOSjnU1SkcW4mQWolZ+BcnA3e+QnjlN67qRQFIHCgYei4naud4ZEfK/YluCvd2CDRfF4Vhzh+yPCOSHl2yPAwYzKPr489IjZmNtJwSEakbcuxYfui/fwZmuhVoGU+3xxboto+gDP9seCOWzB6SNnDv6l5PVDuPegluQ0F8Ki3FKqz/Z1K9pIHFSJjvRXFQoAAD+9qdOAFCAvkUp53dHJoXgAAxdQfqz96GgoKAE4GPEStU4pfqpJ8nlTCn5qkmo2fZgL61KjcNlaQ13Le40MyYAyLFOIZvfgZAVG2aczOfnnZQoQQ1GYwWEFOjpW55n6fOAAqgZUEYXDOJC0/okEtIYupQzD85v3PxLttAKkKlZ0sgdjazYthxQjmplyuDLsZ+Ma1njzspmPbutE/VgkQfaHEqJGGgaNLU7wkfE+1bFfgdB6TJYu+iLOFU48PwsmSfop+VL82tffdcMDdIFHQqAvz7Dyggz+30hkjlvioDfgmdH1Hrwq0GidC4XfKru1OMyqtqZVOtLIWTpk5FLiXRQ6L+82VXwropEpRdAVqp5MCv7PNfLr9WAsUwQv4sNomXGkedh190jw5toz0fOKKWFBj28Fhd7XXU0xN33qlhm51m3P7G/1KGXx/UOWm8buCk33ejBnK3u4cBCOBBDHL+a3zQFr4m/R784c3tOXmflZLCGnGkXUQoJGi5ujemCeu9HaYNxDHPt7MIJ7g5+E6OJSOHSvn9lJp4D1DxXUq3A9dztn9cvjflkRTAi6gpijJQLIt5UErOgWihNZcoPxQn9qQ15/BtXdK7NiF9hOsD3sQgApfueBoqBO63itPZak4wBcyXoM8L1K+ct9Sz/QsxXNXMe6j3m62bDZhFWUFONd/sqq2vVh9vh4YhjPqEOfl/V7qInf5FMx+/NVrIHJJ4PVu80b4QkkZwKtMLjsfekimBMgXqsuciuucLxQn1dMf8XUZ/+ot1YkFqDSaI9bwgy/jWnUZ1oBbzg1GrwbRudp9cEqPtWW98ost140bGoMflLoVt+CfKMJmxEyUji5xZfXf9cFBNIHmP0h32ZQtFXaYoJPDgAIIh2Ia38fuVYPZ9S6QGG7y394RbFxkK14E77w4H5vUVXrGRxeKS98r/IOhMcvNv+yp5+rqUSTFFkZLg/Do7qYLZ60PPCsYhNlQ3Y6rlRwfZtNB9XIvIuZNO9hOrF0HLZGbTcrjmiHi3DfpgY8PzejFUk4w/p6ywH7sRtqXRyF2PP63dJOmhboUYV+oIQVqn68LzSBUGohhNynENV+d6ENgLAdkSo52ZcIFPpqjcDOBGAsi6B1O5d55XJaO6Su+vVcpId17OQZf74fWtOtAaUVZbnGLHd3YKgJ7EIGqDiNzZnOsSICxzGX/Uu39WXRoRmeai8sLIBHKhTY717niGl4eerS0K6MgvhM1iE1pJ+j0wiJCT3D2A6Pq05MqkJb6sk3h4MIDQXdmpoSeD5fRpfEnLGCuSW89oChT1F5cGmJ80xBTc2RYtAny0Ltsf6waqGmkLocegoGBkGlVs4PtaAAAAAAAA=",
 port:"data:image/webp;base64,UklGRtQEAABXRUJQVlA4IMgEAACwHACdASpaAFoAP0WIs1WwKSQyM5xdIkAoiWUANRAt6zcgq+eneK8LNQI0wk3MQi43CAoTYUpa5b6CCxondO9dEzxYNjraQDagUFa/XbqTZXLqsZL63+d+omPD+BaI660VG1f0P4lSZMyimfn6mr7yPPBITtuQ0k0rIzyZFBhj6t4yjxRg3czKd1lI1KzSdXI743mzgnnsjkee1eN9zw7+beNXeRebJbkJByxgKZknTEMN7qoQKdOITKDfaHEUuwqkXncSUv/T9ky33905ilr/KdKLfRMvkWo8I+0m3RoKVTbXxdpYeJEXgLx4zxIAAP7CrSDTWJXbFeFHQXoKQftZjBSwfNquN20zX25shBeQuABpHwu2i3NEOnCrYm8T+gyuLUdscsrM6uBaleFomCzdEy694/k5riD/8CeDzOmZO1P0fZZBvUguUdcK8C4UrItV9TuEdFuR/UCHS42Xi0PB+xzsXqBhB2D2+foErGh1bCOQzZhKaiyDpQFXHIiM5kGKIOXqrfiBTlhosbJ07Wtxj2LBm3dXStVgBqE5BQL8A1GfIT+gaSAvutrARYjAwidSTJ8oKa1O9RBaZqXsmfGnA4AygP/THlOyAiYmeT4boqeuSOnHPXk9rJJTM9KlFWTTskcNGd8Mm10rkjS1SK7yiHJIclC0/s1f8N1K0IIYewuDquWTkmxckyP18OiGZEisjx9N/oojJF2BQJXqFz+4CAI/FbDQm4fg0vokCWwbCL+ot1AKZGIeuRQYVslop3/sOkh2DZoQq8WgJW5+YShAqIlV/uJEL1I3PPfkbjRSfLr8gFsupjPR9fEbxloWODyN5mO7p1zxQ2HfC7ldWaMtxyFtLthJn1pfoSO6jmP5EU+I33Ta0LGaUJlG5hmUy/EFnF36vWqEBbkcqakYgGejEEXAaWz69BdDTmA8Gkjo02xpH1tRKaqQJg0srVEd1sSoyVUj2p0OeYJCAXBTGGMvZRt6P8xwDyL3GDzRulZu3iEeBgYCO2BjFbImz9dN7bguiCtG8mCBk6vhrW7/QyHQMJ1wKbq7qRl+425TKMYDdaNRJ6DrDvgqqn0Kv2CBofVzpaQ1pSPsbv0282alcZNXgcGFJvdUlxSd7kqxKiTzziBLo//doChXgyvZu06CPCm9HJDC7lv4TTqlGm/qdlmIG0T1yF9SRpTR9qrcV6GSieaYzlB6OxxPgSRF9mrFstXYlov9kvtcZNtrTofqZlOBq0nLmubxGi3W0+HROT1+8jkR3+FMQhLTt3HPhWHhLe/Gpgksh8XMP14vTTW01xAT7UpOTVCsSrEc2A9kMqn8cpgOu4xdNq8EIg5/84N5ViuNsrUaq0OdJk6+ZuJz5nM58vf3hX6v36muQE749vaMmomyNkiQTU+/AtFSiGJsSdYBazMPZGFcy0Tsi5Ixvw43s03shFV2PJrNul9H1F8CoB7l2gIap8EnuEaJqeeMBgx54VtoNZpweHNX3P7lpHzQkwmE4J8Occv5dVO9O5oHPcz49mvbveKcps+SNHpRwS5zmfTH72cs4LWMdwr0GyU72Wee3bKNe1nR7fxoPtTvSr1HHf/tj1m8NS93i+saVBmX2JyQLbJ0ZKeG02O6eyDBD2/AAmgAAAA="
};
function piccoloDiscSvg(filled=false){
 const spokes=Array.from({length:32},(_,i)=>{
  const angle=i*360/32;
  return '<rect x="163" y="23" width="13" height="32" rx="2" transform="rotate('+angle+' 170 159)" fill="#e7f1f5" stroke="#b6cbd7" stroke-width="1.4"/>';
 }).join('');
 const blood=filled?'<path d="M193 142 Q199 137 207 142 L218 155 Q220 169 211 177 H191Z" fill="#b63d4a" opacity=".84"/><ellipse cx="201" cy="152" rx="7" ry="4" fill="#ce5b64"/>':'';
 return '<svg class="pic-disc-svg" viewBox="0 0 530 324" role="img" aria-label="Piccolo reagent disc top view with near-center sample entry port and its fill chamber'+(filled?', with blood in the chamber':' empty')+'">'+
 '<ellipse cx="170" cy="302" rx="150" ry="9" fill="#e6eff3"/>'+
 '<circle cx="170" cy="159" r="141" fill="#f9fcfd" stroke="#91b2c2" stroke-width="6"/>'+
 '<circle cx="170" cy="159" r="128" fill="#f5fafc" stroke="#c6dbe5" stroke-width="2"/>'+
 spokes+
 '<circle cx="170" cy="159" r="101" fill="#edf6f9" stroke="#aac8d5" stroke-width="4"/>'+
 '<circle cx="170" cy="159" r="67" fill="#f9fcfd" stroke="#b5d0db" stroke-width="4"/>'+
 '<circle cx="170" cy="159" r="28" fill="#e2eff4" stroke="#9cb8c5" stroke-width="3"/>'+
 '<circle cx="170" cy="159" r="12" fill="#c2d8e2" stroke="#8eacbb" stroke-width="2"/>'+
 '<path d="M190 136 Q209 131 221 146 L229 160 L220 185 Q202 193 185 179 L186 144Z" fill="#e5f1f5" stroke="#82a9bb" stroke-width="2.5"/>'+blood+
 '<ellipse cx="201" cy="150" rx="7" ry="5.5" fill="'+(filled?'#b63a48':'#366c88')+'" stroke="#fff" stroke-width="2"/>'+
 '<path d="M206 148 L298 92 H344" fill="none" stroke="#2c8b9e" stroke-width="3"/>'+
 '<text x="353" y="89" fill="#286f83" font-size="13" font-family="Arial" font-weight="850">SAMPLE ENTRY</text>'+
 '<text x="353" y="106" fill="#607f91" font-size="11" font-family="Arial">Adjacent to center hub</text>'+
 '<path d="M217 178 L296 213 H344" fill="none" stroke="#b94a57" stroke-width="2.5"/>'+
 '<text x="353" y="208" fill="#a94754" font-size="13" font-family="Arial" font-weight="850">SAMPLE CHAMBER</text>'+
 '<text x="353" y="224" fill="#657f8f" font-size="11" font-family="Arial">'+(filled?'Sample loaded':'Fill to molded markers')+'</text>'+
 '<path d="M188 142 v-9 M221 177 v9" stroke="#427e94" stroke-width="2.5"/>'+
 '<text x="170" y="317" font-size="11" fill="#7893a2" font-family="Arial" text-anchor="middle">'+(filled?'AFTER LOADING':'BEFORE LOADING')+'</text></svg>';
}
function piccoloPipetteSvg(){
 return '<svg class="pic-pipette-svg" viewBox="0 0 440 180" role="img" aria-label="Gray Piccolo transfer pipette, separate disposable sample tip, and a 100 microliter sample">'+
 '<rect x="21" y="71" width="62" height="22" rx="8" fill="#a9afb6" stroke="#737c84" stroke-width="2"/>'+
 '<rect x="78" y="62" width="8" height="40" rx="3" fill="#8d989e"/>'+
 '<rect x="86" y="67" width="160" height="31" rx="12" fill="#aeb6ba" stroke="#77858b" stroke-width="2"/>'+
 '<path d="M246 72 L312 76 L312 88 L246 94Z" fill="#b9c0c4" stroke="#76858c" stroke-width="2"/>'+
 '<path d="M319 82 L410 85 L410 87 L319 88Z" fill="#d6e3e9" stroke="#809baa" stroke-width="2"/>'+
 '<rect x="315" y="79" width="12" height="11" rx="4" fill="#c5d0d5"/>'+
 '<path d="M341 84 L410 85 L410 87 L341 87Z" fill="#c03a43" opacity=".7"/>'+
 '<text x="220" y="45" text-anchor="middle" font-size="12" fill="#385b6d" font-weight="850">GRAY PIPETTE + TRANSFER TIP</text>'+
 '<path d="M160 48 L160 63" stroke="#7894a3" stroke-width="2"/>'+
 '<text x="308" y="136" font-size="12" fill="#276c7e" font-weight="850">DISPOSABLE TIP</text>'+
 '<path d="M344 122 L357 90" stroke="#238a9a" stroke-width="2"/>'+
 '<text x="240" y="164" font-size="10.5" fill="#68869a" text-anchor="middle">Use the specified 100 µL pipette and a fresh matching tip</text></svg>';
}
function piccoloLoadingSvg(){
 const chambers=Array.from({length:30},(_,i)=>'<rect x="201" y="28" width="11" height="28" rx="2" transform="rotate('+(i*12)+' 207 170)" fill="#e3eef3" stroke="#bfd3dd" stroke-width="1.2"/>').join('');
 return '<svg class="pic-loading-svg" viewBox="0 0 660 350" role="img" aria-label="Piccolo reagent disc viewed from above while transfer pipette dispenses into the near-center sample chamber">'+
 '<ellipse cx="208" cy="328" rx="173" ry="10" fill="#e5eef3"/>'+
 '<circle cx="207" cy="170" r="149" fill="#f8fbfd" stroke="#94b4c3" stroke-width="6"/>'+
 '<circle cx="207" cy="170" r="136" fill="#f4fafb" stroke="#c2d9e2" stroke-width="2"/>'+chambers+
 '<circle cx="207" cy="170" r="107" fill="#edf7fa" stroke="#aec9d6" stroke-width="4"/>'+
 '<circle cx="207" cy="170" r="68" fill="#f9fcfd" stroke="#b1cad5" stroke-width="4"/>'+
 '<circle cx="207" cy="170" r="28" fill="#dcebf1" stroke="#93b3c2" stroke-width="3"/>'+
 '<circle cx="207" cy="170" r="11" fill="#bad4df" stroke="#8baaba" stroke-width="2"/>'+
 '<path d="M229 146 Q249 142 260 156 L268 172 L258 192 Q244 201 226 188Z" fill="#e1eff5" stroke="#7aa8b9" stroke-width="3"/>'+
 '<path d="M235 165 Q245 161 256 168 L259 184 Q245 189 232 181Z" fill="#bd4350" opacity=".7"/>'+
 '<circle cx="241" cy="158" r="7" fill="#b83646" stroke="#fff" stroke-width="2"/>'+
 '<g transform="translate(243 157) rotate(55)">'+
 '<path d="M0 -189 H27 L31 -65 H30 L25 -13 L15 0 L7 -12 L1 -65Z" fill="#b5bfc5" stroke="#7f9ca9" stroke-width="3"/>'+
 '<path d="M10 -184 V-67" stroke="#f4fbfd" stroke-width="5" opacity=".7"/>'+
 '<path d="M7 -13 L15 0 L25 -13" fill="#d8eaf0" stroke="#7ca6b5" stroke-width="2"/>'+
 '</g>'+
 '<path d="M249 157 L390 135 H470" stroke="#2a899d" stroke-width="3" fill="none"/>'+
 '<text x="480" y="131" fill="#286f82" font-size="15" font-family="Arial" font-weight="900">SAMPLE PORT</text>'+
 '<text x="480" y="151" fill="#637f90" font-size="12" font-family="Arial">Near center hub</text>'+
 '<path d="M259 187 L391 253 H474" stroke="#b94c59" stroke-width="3" fill="none"/>'+
 '<text x="484" y="250" fill="#aa4552" font-size="14" font-family="Arial" font-weight="850">FILL CHAMBER</text>'+
 '<text x="484" y="270" fill="#6c8796" font-size="11.5" font-family="Arial">Follow molded markers</text>'+
 '<text x="35" y="23" font-family="Arial" fill="#2c7386" font-size="14" font-weight="850">DISPENSE INTO CENTER-ADJACENT WELL</text>'+
 '<text x="35" y="341" font-family="Arial" fill="#678493" font-size="11">Keep the sample port visible and avoid bubbles.</text>'+
 '</svg>';
}
function piccoloVisual(text){
 const t=String(text).toLowerCase();
 const take=t.includes("grab the")&&(t.includes("disc")||t.includes("reagent"));
 const add=(t.includes("load")&&(t.includes("disc sample port")||t.includes("sample into the disc")||t.includes("controls into the disc")));
 const analyzer=t.includes("insert the filled disc")||t.includes("click analyze")||t.includes("start the analysis");
 const qc=t.includes("qc")||t.includes("controls");
 if(!take&&!add&&!analyzer)return '';
 let pieces='';
 if(take){
  pieces='<article class="pic-vis-card"><strong>Reagent disc (top view)</strong><img loading="lazy" class="pic-user-photo" src="'+piccoloImages.disc+'" alt="User-supplied photograph of a clear Piccolo reagent disc"/><span>Inspect the sealed disc; keep level and handle by the edges.</span></article>'+
  '<article class="pic-vis-card"><strong>Locate the sample port</strong><img loading="lazy" class="pic-user-photo pic-photo-port" src="'+piccoloImages.port+'" alt="User-provided annotated Piccolo disc diagram highlighting the sample chamber in red"/>'+piccoloDiscSvg(false)+'<span>Use the small sample inlet near the disc hub, not any outer reagent chamber.</span></article>';
 }else if(add){
  pieces='<article class="pic-vis-card"><strong>Gray transfer device and disposable tip</strong><img loading="lazy" class="pic-user-photo pic-photo-tip" src="'+piccoloImages.tip+'" alt="User-supplied photograph of gray Piccolo transfer component"/>'+piccoloPipetteSvg()+'<span>Fit a fresh compatible tip. Avoid bubbles during aspiration.</span></article>'+
  (qc?'<article class="pic-vis-card"><strong>Dispense QC material into the sample port</strong>'+piccoloDiscSvg(false)+'<span>Transfer the appropriate QC material using the approved QC procedure and verify the chamber is properly filled.</span></article>':
  '<article class="pic-vis-card"><strong>Dispense blood into the sample port</strong>'+piccoloLoadingSvg()+'<span>Place the transfer tip into the near-center sample port and dispense into the marked sample chamber. Do not introduce bubbles.</span></article>'+
  '<article class="pic-vis-card"><strong>Disc after blood loading</strong>'+piccoloDiscSvg(true)+'<span>The red region illustrates blood in the near-center sample chamber. Start analysis within 10 minutes of filling the disc.</span></article>');
 }else{
  pieces='<article class="pic-vis-card"><strong>Place disc in analyzer drawer</strong>'+piccoloAnalyzerSvg()+'<span>Position the filled disc in the front drawer, then close the drawer and follow the analyzer prompts.</span></article>';
 }
 return '<section class="pic-step-visual" aria-label="Piccolo sample preparation images"><div class="pic-step-head"><strong>PICCOLO · VISUAL REFERENCE</strong><span>Follow each pictured action</span></div><div class="pic-vis-grid">'+pieces+'</div></section>';
}
function piccoloAnalyzerSvg(){
 return piccoloDeviceSvg("drawer");
}



/* Procedure-linked consumable and collection media references.
   All graphics are schematic, not device screens or direct photographs. */
const collection={
 sysmex:[["lavender","EDTA whole blood","Lavender-top tube"]],
 piccolo:[["green","Lithium-heparin whole blood","Green-top tube; approved plasma option"]],
 pathfast:[["green","Lithium-heparin whole blood","Green-top tube or prepared plasma"]],
 triage:[["lavender","EDTA blood","For troponin I, BNP and D-dimer cardiac testing"]],
 clinitek:[["urine","Fresh urine","Clean collection cup"]],
 torch:[["stool","Stool in Cary Blair","GI panel transport medium"]],
 spotfire:[["utm","Respiratory swab","UTM/VTM per assay"],["eswab","Throat swab","eSwab per assay"]],
 febridx:[["finger","Fingerstick capillary blood","Direct application; no collection tube"]],
 "drug-screen":[["urine","Urine specimen","Screening collection cup"]],
 coagsense:[["finger","Fingerstick capillary blood","Transfer tube; no EDTA tube"]],
 poc:[["varies","Specimen varies","Confirm the specific assay IFU"]],
 sofia:[["swab","Respiratory or throat swab","Assay-specific extraction kit"]],
 hemocue:[["finger","Capillary whole blood","Direct-fill microcuvette; no tube"]],
 visby:[["swab","Assay-specific swab","Archived platform"]],
 idnow:[["swab","Direct swab","Archived; use assay-specific IFU"]]
};
function visualEsc(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function illustratedSvg(inner,label,view="0 0 320 210"){
 return '<svg viewBox="'+view+'" role="img" aria-label="'+visualEsc(label)+'" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="equip-white" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#cfdee5"/></linearGradient></defs>'+inner+'</svg>';
}
function mediaSvg(kind){
 const caps={green:"#37966e",lavender:"#9568b3",red:"#c65b5d",blue:"#548eb6"};
 if(caps[kind]){
  return illustratedSvg('<ellipse cx="160" cy="174" rx="39" ry="7" fill="#e7eef2"/>'+
   '<rect x="135" y="41" width="50" height="133" rx="12" fill="#f0f8fa" fill-opacity=".78" stroke="#96b8c7" stroke-width="3"/>'+
   '<path d="M138 99 H182 V157 Q182 170 172 170 H148 Q138 170 138 155Z" fill="#ac3548" opacity=".67"/>'+
   '<rect x="130" y="27" width="60" height="30" rx="8" fill="'+caps[kind]+'" stroke="#718f9f" stroke-width="3"/>'+
   '<rect x="139" y="105" width="42" height="37" rx="3" fill="#fff" opacity=".96"/>'+
   '<text x="160" y="118" text-anchor="middle" font-size="7.6" fill="#405e72" font-weight="800">'+(kind==="green"?"LI-HEP":"EDTA")+'</text>'+
   '<text x="160" y="132" text-anchor="middle" font-size="7" fill="#6a8393">BLOOD</text>',
   kind+"-top whole blood collection tube");
 }
 if(kind==="finger")return illustratedSvg(
 '<ellipse cx="162" cy="189" rx="100" ry="8" fill="#e4edf1"/>'+
 '<path d="M64 184 L60 138 Q58 120 74 113 L109 96 Q119 91 123 79 L126 49 Q128 33 141 31 Q158 29 161 46 L162 90 Q166 96 171 91 L178 70 Q183 56 196 61 Q210 66 206 82 L198 112 Q195 123 205 125 Q211 122 222 113 L239 101 Q252 92 261 103 Q270 114 256 127 L228 150 Q210 166 214 184Z" fill="#edc1b0" stroke="#bd8c7d" stroke-width="3.4" stroke-linejoin="round"/>'+
 '<path d="M128 55 Q141 52 158 59 M180 81 Q190 74 203 80" fill="none" stroke="#d49c8c" stroke-width="2.4"/>'+
 '<rect x="124" y="34" width="39" height="25" rx="11" fill="#f6d8cc" stroke="#d49a8a" stroke-width="2"/>'+
 '<path d="M151 35 Q163 43 158 56" fill="none" stroke="#fce1d8" stroke-width="3"/>'+
 '<path d="M166 60 L177 40 L190 23" fill="none" stroke="#7c96a2" stroke-width="5" stroke-linecap="round"/>'+
 '<path d="M177 40 L195 26 L209 33 L190 54Z" fill="#cad9df" stroke="#7696a4" stroke-width="2.5"/>'+
 '<path d="M195 31 L211 39" stroke="#6d8c9b" stroke-width="3"/>'+
 '<path d="M125 78 C116 91 119 102 128 105 C140 105 143 94 130 77Z" fill="#bf3f50"/>'+
 '<path d="M119 103 L92 79 H57" stroke="#bf5061" stroke-width="2.5" fill="none"/>'+
 '<text x="53" y="72" font-size="12" font-family="Arial" font-weight="900" fill="#a43e50">CAPILLARY DROP</text>'+
 '<path d="M226 79 L250 57 H302" stroke="#528da0" stroke-width="2.5" fill="none"/>'+
 '<text x="302" y="50" font-size="11" text-anchor="end" font-family="Arial" font-weight="850" fill="#44859a">LANCET</text>',
 "Fingerstick with lancet touching lateral fingertip and capillary blood droplet");
 if(["urine","stool"].includes(kind)){
  const stool=kind==="stool";
  return illustratedSvg('<ellipse cx="159" cy="182" rx="66" ry="8" fill="#e7eef2"/>'+
   '<rect x="96" y="63" width="128" height="112" rx="15" fill="#edf6f8" stroke="#93acba" stroke-width="3"/>'+
   '<path d="M104 115 H216 V152 Q216 169 203 169 H118 Q104 167 104 151Z" fill="'+(stool?"#b94b58":"#e0b861")+'" opacity=".54"/>'+
   '<rect x="91" y="47" width="138" height="30" rx="9" fill="'+(stool?"#c9474a":"#fafbfc")+'" stroke="#9bb2bd" stroke-width="3"/>'+
   (stool?'<path d="M116 145 q12 -15 24 -6 t26 1 t24 4 t20 -4" fill="none" stroke="#654534" stroke-width="9" stroke-linecap="round" opacity=".92"/><ellipse cx="126" cy="158" rx="8" ry="5" fill="#74503a"/><ellipse cx="187" cy="162" rx="7" ry="4" fill="#76513c"/><ellipse cx="169" cy="137" rx="9" ry="4" fill="#74503a"/>':'')+
   '<rect x="117" y="94" width="86" height="28" rx="4" fill="white"/>'+
   '<text x="160" y="111" font-size="12" fill="#486a7c" text-anchor="middle" font-weight="800">'+(stool?"CARY BLAIR":"URINE")+'</text>',
   stool?"Stool Cary Blair transport container":"Urine collection cup");
 }
 if(["utm","eswab","swab"].includes(kind)){
  return illustratedSvg('<ellipse cx="157" cy="179" rx="66" ry="8" fill="#e7eef2"/>'+
   '<rect x="139" y="62" width="41" height="112" rx="13" fill="#eef7fa" stroke="#9ab8c7" stroke-width="3"/>'+
   '<path d="M144 132 H175 V158 Q175 170 166 171 H151 Q144 169 144 158Z" fill="#a9d7e2" opacity=".65"/>'+
   '<rect x="134" y="49" width="52" height="22" rx="7" fill="'+(kind==="eswab"?"#dde8ef":"#c57a8b")+'" stroke="#89a6b6" stroke-width="3"/>'+
   '<path d="M215 32 L213 140" stroke="#ae9d89" stroke-width="5" stroke-linecap="round"/>'+
   '<ellipse cx="213" cy="146" rx="9" ry="16" fill="#f8fcfd" stroke="#b8cad3"/>'+
   '<text x="118" y="34" font-size="11" text-anchor="middle" fill="#486f83" font-weight="800">'+(kind==="utm"?"UTM / VTM":kind==="eswab"?"ESWAB":"SWAB")+'</text>',
   "Swab with sample transport tube or extraction vial");
 }
 return illustratedSvg('<rect x="94" y="65" width="135" height="95" rx="13" fill="#f3f7f9" stroke="#abc1cd" stroke-width="3"/>'+
 '<path d="M109 90 H215 M109 112 H202 M109 134 H188" stroke="#a4c3d0" stroke-width="5" stroke-linecap="round"/>'+
 '<text x="160" y="178" font-size="11" fill="#537a90" text-anchor="middle">VERIFY ASSAY</text>',
 "Assay-specific specimen collection reference");
}
function specimenGuide(sec){
 if(!sec||!collection[sec.id])return "";
 const items=collection[sec.id],arch=!!sec.archived;
 return '<section class="device-collection-guide" aria-label="Collection container reference">'+
 '<div class="device-collection-heading"><div><span class="device-collection-kicker">'+(sec.id==='pathfast'?'PATIENT TESTING · SPECIMEN':'SPECIMEN & COLLECTION')+'</span><h3>'+(sec.id==='pathfast'?'Sample to use':'What to collect')+'</h3><p>'+(sec.id==='pathfast'?'Use lithium-heparin whole blood or prepared plasma as permitted by the assay IFU.':'Use the assay-specific container and approved collection volume.')+'</p></div>'+
 (arch?'<span class="device-historical-mark">ARCHIVED</span>':'')+'</div>'+
 '<div class="device-collection-list">'+items.map(x=>'<article class="device-collection-item"><div class="device-media-picture">'+mediaSvg(x[0])+'</div><div><strong>'+visualEsc(x[1])+'</strong><span>'+visualEsc(x[2])+'</span></div></article>').join('')+'</div>'+
 (sec.id==='triage'||sec.id==='spotfire'||sec.id==='poc'||sec.id==='sofia'?'<p class="device-collection-caveat">Specimen and kit depend on the selected assay. Confirm the current assay IFU and approved site SOP.</p>':'')+
 '</section>';
}



/* Separate CLINITEK Status+ consumables. A strip and an hCG cassette must
   never be represented as one combined test device. */
function clinitekKit(kind,filled){
 const name=kind==="hcg"?"CLINITEST hCG cassette":"Siemens urinalysis dipstick";
 if(kind==="hcg"){
  const cassette='<ellipse cx="154" cy="173" rx="121" ry="11" fill="#e9eff2"/>'+
   '<rect x="39" y="67" width="236" height="92" rx="17" fill="#f7fafb" stroke="#94abb9" stroke-width="3.5"/>'+
   '<path d="M50 78 H262" stroke="#e4ebef" stroke-width="3"/>'+
   '<rect x="70" y="97" width="101" height="35" rx="6" fill="#e1ebee" stroke="#b2c7d1" stroke-width="2"/>'+
   '<rect x="85" y="104" width="73" height="21" rx="4" fill="#f5f8f9" stroke="#c5d4dc"/>'+
   '<text x="91" y="102" font-size="9" fill="#6b8799" font-family="Arial">C</text>'+
   '<text x="126" y="102" font-size="9" fill="#6b8799" font-family="Arial">T</text>'+
   
   '<circle cx="224" cy="115" r="16" fill="'+(filled?"#ecd3dd":"#f9fdff")+'" stroke="#9aaeba" stroke-width="3"/>'+
   '<circle cx="224" cy="115" r="8" fill="'+(filled?"#b77b91":"#edf4f7")+'" opacity=".9"/>'+
   '<text x="224" y="144" font-family="Arial" font-size="10" fill="#4b7185" font-weight="850" text-anchor="middle">S</text>'+
   '<text x="117" y="146" font-family="Arial" font-size="10" fill="#506d80" font-weight="850" text-anchor="middle">CLINITEST hCG</text>'+
   '<path d="M224 94 L250 34 L304 34" fill="none" stroke="#258b9b" stroke-width="2.3"/>'+
   '<text x="265" y="26" font-size="11" fill="#27687a" font-family="Arial" font-weight="850" text-anchor="middle">SAMPLE WELL</text>'+
   (filled?'<path d="M215 80 Q206 95 214 97 Q223 98 215 80Z" fill="#c46c7d" opacity=".8"/>':'');
  return illustratedSvg(cassette,name+(filled?" with urine applied to its sample well":" unused; sample well empty"));
 }
 const colors=filled?["#cac868","#aa7595","#78a7bf","#d8b678","#a57db1","#b5cd8f","#de9a7a","#a7bcda","#c3a768","#9ab891"]:["#f4df94","#d0c0dc","#e5d5a3","#c9e3a1","#e9d8b3","#cfc4b3","#f0d3ae","#d3d4e9","#cfd8aa","#dfd8b2"];
 const strip='<ellipse cx="153" cy="158" rx="146" ry="9" fill="#e8eff2"/>'+
  '<rect x="16" y="91" width="280" height="35" rx="6" fill="#f5f8fa" stroke="#98b3c1" stroke-width="2.6"/>'+
  '<rect x="17" y="98" width="61" height="21" rx="3" fill="#e8f0f4"/>'+
  '<text x="45" y="111" font-size="11" font-family="Arial" font-weight="800" fill="#4f839b" text-anchor="middle">UA</text>'+
  colors.map((color,i)=>'<rect x="'+(81+i*20)+'" y="97" width="16" height="23" rx="3" fill="'+color+'" stroke="#b8c6cd" stroke-width="1"/>').join('')+
  '<path d="M80 121 L280 121" stroke="#b6c3cc" stroke-width="2"/>'+
  '<path d="M95 90 L95 69 L136 69" stroke="#328ba0" stroke-width="2" fill="none"/>'+
  '<text x="137" y="65" font-family="Arial" font-size="10" fill="#2c7088" font-weight="850">REAGENT PADS</text>'+
  (filled?'<path d="M180 34 Q159 66 180 69 Q201 66 180 34Z" fill="#dfb664" opacity=".65"/>':'');
 return illustratedSvg(strip,name+(filled?" after dipping urine onto reagent pads":" before dipping"));
}
function clinitekVisualGuide(sec){
 const build=(type,label,color,steps,desc,open)=>{
  const cards=steps.map((st,i)=>{
   let visual;
   if(i===0)visual=mediaSvg("urine");
   else if(i===1)visual=clinitekKit(type,false);
   else if(i===steps.length-1)visual=clinitekDeviceSvg("reading");
   else visual=clinitekDeviceSvg(type==="hcg"?"cassette":"strip");
   return '<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+visualEsc(st[0])+'</strong></div>'+
   '<div class="device-gallery-image">'+visual+'</div><p>'+visualEsc(st[1])+'</p></article>';
  }).join('');
  return '<details class="clinitek-visual-track" '+(open?'open':'')+'><summary><span class="clinitek-track-icon '+color+'">'+(type==="hcg"?"hCG":"UA")+'</span>'+
   '<span><strong>'+label+'</strong><small>'+desc+'</small></span><span class="clinitek-track-chevron" aria-hidden="true"></span></summary>'+
   '<div class="clinitek-track-content"><div class="device-gallery-grid">'+cards+'</div></div></details>';
 };
 const ua=[
 ["Collect a fresh urine specimen","Use a clean dry container and check patient identification."],
 ["Identify the UA dipstick","Remove a reagent strip from the bottle and recap it immediately. Use the strip test table insert."],
 ["Press START, dip, blot, and position strip","Press START first. Within 8 seconds, wet the reagent pads, blot the edge, and place the pads-up strip in its channel."],
 ["Read the strip on CLINITEK Status+","Let the analyzer pull in the test table automatically, review results, and discard the used strip."]
 ];
 const hcg=[
 ["Collect a fresh urine specimen","Use a clean dry container and verify the requisition and patient."],
 ["Identify the hCG cassette and pipette","Use an unopened CLINITEST hCG cassette and the single-use pipette provided in its pack."],
 ["Place cassette, then press START","Select Cassette Test, position the cassette on the correct test table insert, and select START. Do not prefill."],
 ["Dispense urine into the hCG cassette","Within the 8-second window, use the included pipette to transfer one 200 µL stem of urine to the sample well. Do not dispense the overflow reservoir."],
 ["Read the hCG cassette on CLINITEK Status+","Let the test table pull in, review the interpreted result, then discard the used cassette."]
 ];
 return '<section class="device-gallery clinitek-gallery" aria-label="Separate Clinitek urinalysis and hCG illustrated workflows">'+
 '<div class="device-gallery-heading"><div><span>CHOOSE TEST TYPE</span><h2>Two separate testing workflows</h2><p>Open only the test being performed. The UA strip and hCG cassette are not interchangeable.</p></div></div>'+
 build("ua","Urinalysis dipstick","strip",ua.length?ua:[],"Dipstick with reagent pads · Strip Test",true)+
 build("hcg","hCG pregnancy cassette","cassette",hcg,"White cassette and single-use pipette · Cassette Test",false)+
 '<p class="device-gallery-note">Follow the current Siemens CLINITEK Status+ Operator Guide and your approved site SOP. Follow the displayed instructions and approved workflow.</p></section>';
}
/* PATHFAST reagent cartridge based on the PHC/LSI Medience cartridge reference:
   Long black-foil strip, clear sample trough at the front red tab,
   multiple transparent reagent wells, and a separate black detection well.
   Drawn as an original schematic, not a manufacturer image or fill-scale guide. */
function pathfastCartridgeSvg(filled,showPipette=false,material='blood'){
 const isQC=material==="calqc";
 const red=filled?(isQC?"#a9c5eb":"#bc4654"):"#e8f6fa";
 const liquid=filled?(isQC?"#7196c8":"#a82d45"):"#d9edf4";
 const chambers=Array.from({length:7},(_,i)=>{
  const x=196+i*46;
  return '<path d="M'+x+' 161 L'+(x+4)+' 215 Q'+(x+13)+' 234 '+(x+26)+' 216 L'+(x+31)+' 154Z" fill="'+(i%2?'#dcebf1':'#c2dce7')+'" fill-opacity=".72" stroke="#9dbdcd" stroke-width="2"/>'+
   '<path d="M'+(x+8)+' 168 L'+(x+11)+' 211" stroke="#fff" stroke-opacity=".82" stroke-width="3"/>';
 }).join("");
 const strips=Array.from({length:20},(_,i)=>{
  const x=468+i*4;
  return '<path d="M'+x+' 122 l0 20" stroke="'+(i%3?"#1c2930":"#f7fcfd")+'" stroke-width="'+(i%4===0?2.6:1.2)+'"/>';
 }).join("");
 const top=
 '<ellipse cx="338" cy="259" rx="253" ry="11" fill="#c6d8e1" opacity=".48"/>'+
 chambers+
 '<path d="M157 139 L548 118 L562 157 L165 184Z" fill="#e7f1f6" fill-opacity=".75" stroke="#a0b9c7" stroke-width="2.5"/>'+
 '<path d="M163 115 L544 99 L562 153 L175 169Z" fill="#1d262e" stroke="#7d939f" stroke-width="2.5"/>'+
 '<path d="M177 165 L564 149" fill="none" stroke="#eef8fb" stroke-width="3"/>'+
 '<path d="M215 116 L226 164 M248 113 L260 163 M284 111 L295 162 M319 110 L330 161" stroke="#62737d" stroke-width="1.5" opacity=".72"/>'+
 '<path d="M154 116 L191 114 L202 166 L173 168Z" fill="#e54d43" stroke="#b43f3c" stroke-width="1.8"/>'+
 '<path d="M176 121 L191 120" stroke="#fff0e8" stroke-width="1.8" opacity=".85"/>'+
 '<path d="M447 112 L545 107 L552 143 L454 146Z" fill="#e5edf0" stroke="#8f9fa7" stroke-width="1.8"/>'+
 strips+
 '<rect x="501" y="113" width="41" height="3.5" rx="1" fill="#869ca8"/>'+
 '<path d="M541 99 L559 98 L574 151 L562 153Z" fill="#df5b4e" stroke="#a73d34" stroke-width="1.4"/>'+
 '<ellipse cx="372" cy="134" rx="18" ry="13" fill="#050b0e" stroke="#7d8e9a" stroke-width="3"/>'+
 '<ellipse cx="372" cy="134" rx="8" ry="6" fill="#1c353d" stroke="#495e67" stroke-width="1.5"/>'+
 '<path d="M87 136 L156 125 L176 169 L99 187Z" fill="#eef9fd" fill-opacity=".72" stroke="#8faebe" stroke-width="3"/>'+
 '<path d="M102 145 L145 138 L154 168 L105 178Z" fill="#c3e2ec" fill-opacity=".7" stroke="#84aaba" stroke-width="2"/>'+
 '<path d="M105 157 L149 150 L154 167 L108 174Z" fill="'+liquid+'" fill-opacity="'+(filled?".96":".58")+'"/>'+
 '<path d="M105 156 L148 149" stroke="#86a6b3" stroke-width="1.8" stroke-dasharray="4 3"/>'+
 '<path d="M92 143 L98 169 M100 140 L107 171" stroke="#fff" stroke-opacity=".76" stroke-width="2"/>'+
 '<path d="M89 187 L176 169" stroke="#91b6c6" stroke-width="2"/>';
 const callouts=
 '<path d="M124 145 L110 93 L58 93" fill="none" stroke="#198a99" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<circle cx="124" cy="145" r="4.4" fill="#168c9a"/>'+
 '<text x="57" y="83" font-family="Arial,sans-serif" fill="#246b7d" font-size="13" font-weight="850">SAMPLE WELL</text>'+
 '<path d="M372 116 L378 80 L453 80" fill="none" stroke="#647f8c" stroke-width="2" stroke-linecap="round"/>'+
 '<text x="379" y="68" font-family="Arial,sans-serif" fill="#547080" font-size="11" font-weight="750">DETECTION WELL</text>';
 const detail=
 '<rect x="574" y="62" width="153" height="180" rx="12" fill="#fff" stroke="#c9dfe8" stroke-width="2"/>'+
 '<text x="651" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="850" fill="#315e76">SAMPLE WELL</text>'+
 '<text x="651" y="99" text-anchor="middle" font-family="Arial,sans-serif" font-size="9.5" fill="#658294">ENLARGED TOP VIEW</text>'+
 '<rect x="605" y="109" width="94" height="98" rx="9" fill="#e9f5f9" fill-opacity=".95" stroke="#8dadbc" stroke-width="3"/>'+
 '<rect x="620" y="119" width="64" height="74" rx="6" fill="#f7fcfd" stroke="#88adbf" stroke-width="2.6"/>'+
 '<rect x="624" y="151" width="56" height="37" rx="3" fill="'+red+'" fill-opacity="'+(filled?".9":".28")+'"/>'+
 '<path d="M622 151 H683" stroke="#6596a7" stroke-width="2.4" stroke-dasharray="5 3"/>'+
 '<text x="651" y="223" text-anchor="middle" font-family="Arial,sans-serif" font-size="10.5" font-weight="800" fill="'+(filled?"#9a4051":"#326e82")+'">'+(filled?"SAMPLE LOADED":"WELL EMPTY")+'</text>';
 const transfer=showPipette?
 '<g aria-label="Transfer pipette containing sample, delivering into the clear sample well">'+
 '<path d="M201 1 L164 68 L137 129 L128 150" fill="none" stroke="#8da6b6" stroke-width="26" stroke-linecap="round"/>'+
 '<path d="M201 1 L164 68 L137 129 L128 150" fill="none" stroke="#eaf6fa" stroke-width="21" stroke-linecap="round"/>'+
 '<path d="M171 49 L137 120" fill="none" stroke="'+(isQC?'#7497c5':'#b44953')+'" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M126 129 L124 146 L132 144 L138 127Z" fill="#d2e9f1" stroke="#7b9fb0" stroke-width="2"/>'+
 '<path d="M128 147 C123 158 123 162 129 164 C135 162 135 156 128 147Z" fill="'+(isQC?'#7599c7':'#b53a4a')+'" stroke="#8b7a8d" stroke-width="1"/>'+
 '<text x="233" y="30" font-family="Arial,sans-serif" font-size="13" font-weight="850" fill="#376c82">TRANSFER PIPETTE</text>'+
 '<path d="M213 37 L182 58" stroke="#328e9b" stroke-width="2.6" fill="none"/>'+
 '</g>':'';
 const info='<text x="311" y="244" text-anchor="middle" font-family="Arial,sans-serif" font-size="10.5" fill="#698395">Long cartridge • clear sample tip • black foil and reagent wells</text>';
 return illustratedSvg(top+callouts+detail+info+transfer,
  "PATHFAST reagent cartridge, "+(filled?(isQC?"control material":"whole blood")+" in the clear rectangular sample well":"empty clear rectangular sample well")+" at the red-marked front end; separate black detection well must not receive blood",
  "0 0 740 310");
}


/* Large illustrated equipment used by patient and calibration guides.
   The six aluminum channels and long black-foil cartridges are drawn after
   manufacturer rack photos, not as a dimensionally exact machine diagram. */
function pathfastRackSvg(mode="patient",sampleLoaded=true){
 return pathfastRealRackSvg(mode,sampleLoaded);
}

function pathfastTipRackSvg(mode="patient"){
 const activeCount=mode==="cal"?6:2;
 let h='<rect x="110" y="215" width="750" height="80" rx="19" fill="#d8e6ec" stroke="#96aebb" stroke-width="5"/>'+
 '<rect x="129" y="232" width="712" height="43" rx="12" fill="#f7fbfd" stroke="#b5cdd7" stroke-width="3"/>';
 for(let i=0;i<6;i++){
 const x=195+i*112;
 if(i>=activeCount){h+='<ellipse cx="'+x+'" cy="225" rx="22" ry="10" fill="#8aa6b3" opacity=".65"/><text x="'+x+'" y="182" text-anchor="middle" fill="#9babba" font-size="11" font-weight="800">EMPTY</text>';continue;}
 h+='<g><ellipse cx="'+x+'" cy="225" rx="22" ry="10" fill="#8aa6b3"/>'+
 '<rect x="'+(x-11)+'" y="85" width="23" height="130" rx="8" fill="#f1fafb" stroke="#93b8c8" stroke-width="2.5"/>'+
 '<path d="M'+(x-6)+' 212 L'+x+' 244 L'+(x+7)+' 212Z" fill="#bfd8e3" stroke="#91abb9" stroke-width="2"/>'+
 '<rect x="'+(x-22)+'" y="75" width="44" height="18" rx="6" fill="#deeaf0" stroke="#88a7b8" stroke-width="2"/>'+
 '<text x="'+x+'" y="67" text-anchor="middle" fill="#3e6b80" font-weight="850" font-size="14">'+(i+1)+'</text></g>';
 }
 h+='<text x="490" y="351" text-anchor="middle" font-size="17" font-weight="850" fill="#4d7488">'+(mode==="cal"?"SIX ACTIVE LANES · SIX NEW TIPS":"TWO ACTIVE EXAMPLE LANES · TWO NEW TIPS")+'</text>';
 return illustratedSvg(h,"Six new disposable PATHFAST pipette tips shown in lane-numbered positions, schematic training view","0 0 980 400");
}
function pathfastResultsSvg(mode="patient"){
 const qc=mode==="cal";
 const paperTitle=qc?"CAL / QC REVIEW":"RESULT REVIEW";
 let h='<ellipse cx="489" cy="330" rx="350" ry="14" fill="#cad9e1" opacity=".4"/>'+
 '<rect x="112" y="42" width="338" height="266" rx="13" fill="#fcfefe" stroke="#a7c0ca" stroke-width="4"/>'+
 '<rect x="137" y="66" width="288" height="43" rx="6" fill="#dfecf3"/>'+
 '<text x="282" y="94" text-anchor="middle" fill="#315e79" font-family="Arial,sans-serif" font-size="20" font-weight="850">'+paperTitle+'</text>'+
 '<text x="146" y="139" fill="#567488" font-family="Arial,sans-serif" font-size="14">Assay / specimen ID</text>'+
 '<rect x="307" y="122" width="109" height="23" rx="6" fill="#ecf2f5"/>'+
 '<path d="M147 166 H412 M147 200 H412 M147 236 H412 M147 273 H412" stroke="#dce7ed" stroke-width="3"/>'+
 '<text x="148" y="189" fill="#51758b" font-family="Arial,sans-serif" font-size="14">'+(qc?"CAL 1 / CAL 2":"Reported value")+'</text>'+
 '<text x="147" y="225" fill="#51758b" font-family="Arial,sans-serif" font-size="14">'+(qc?"QC 1 / QC 2":"Instrument flags")+'</text>'+
 '<text x="148" y="259" fill="#51758b" font-family="Arial,sans-serif" font-size="14">Verify status</text>'+
 '<rect x="334" y="174" width="75" height="21" rx="5" fill="#e1f2ed"/>'+
 '<rect x="334" y="210" width="75" height="21" rx="5" fill="#e1f2ed"/>'+
 '<rect x="334" y="244" width="75" height="21" rx="5" fill="#e9f0f4"/>'+
 '<path d="M346 184 l5 5 10 -12 M346 219 l5 5 10 -12" fill="none" stroke="#268373" stroke-width="3" stroke-linecap="round"/>'+
 '<rect x="531" y="78" width="313" height="205" rx="19" fill="#edf4f6" stroke="#a5bbc8" stroke-width="4"/>'+
 '<rect x="557" y="98" width="261" height="36" rx="6" fill="#d9e9f0"/>'+
 '<text x="688" y="121" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="850" fill="#3d6b82">AFTER THE RUN</text>'+
 '<path d="M582 160 H790" stroke="#b2c9d6" stroke-width="4"/>'+
 '<path d="M591 178 l23 24 40-50" fill="none" stroke="#328b75" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<text x="685" y="184" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#426d81">Verify before</text>'+
 '<text x="685" y="203" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#426d81">'+(qc?"patient testing":"reporting")+'</text>'+
 '<path d="M580 236 H796" stroke="#c6d9df" stroke-width="3"/>'+
 '<text x="687" y="265" text-anchor="middle" font-size="14" font-family="Arial,sans-serif" fill="#567b8d">Use approved SOP</text>';
 return illustratedSvg(h,"PATHFAST post-run review showing illustrative result report and verification checklist with no real patient data","0 0 980 370");
}

/* PATHFAST preparation: removable six-slot metal rack rests in a clear
   loading base before patient cartridges are inserted. Original schematic. */
/* Rack and transparent loading base based on the submitted reference photo:
   an acrylic six-channel station with long parallel metal cartridge rails,
   round rear holders, numbered lanes and transparent end wells. */

/* Straight-on rack orientation, replacing the skewed perspective drawing.
   Six genuinely parallel cartridge channels, front sample wells, black foil
   reagent strips, metal outer rack and clear loading base. */
function pathfastRealRackSvg(mode="patient",sampleLoaded=false){
 const isCal=mode==="cal",occupied=mode==="setup"?0:isCal?6:2;
 const labels=isCal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:["1","2","3","4","5","6"];
 const channels=Array.from({length:6},(_,i)=>{
  const y=68+i*49,full=i<occupied;
  const rail='<rect x="110" y="'+(y-3)+'" width="762" height="46" rx="7" fill="#dbe5ea" stroke="#829ca9" stroke-width="2.5"/>'+
   '<rect x="120" y="'+(y+3)+'" width="739" height="34" rx="4" fill="#f8fcfd" stroke="#b3c8d0"/>'+
   '<path d="M118 '+(y+5)+'H861 M118 '+(y+38)+'H861" stroke="#8ea9b7" stroke-width="3"/>';
  const cart=full?
   '<rect x="160" y="'+(y+5)+'" width="671" height="31" rx="3" fill="#151e29" stroke="#586a76" stroke-width="2"/>'+
   '<rect x="181" y="'+(y+8)+'" width="588" height="24" rx="2" fill="#2a3139"/>'+
   '<rect x="193" y="'+(y+11)+'" width="540" height="18" rx="2" fill="#12191f"/>'+
   Array.from({length:13},(_,j)=>'<rect x="'+(346+j*25)+'" y="'+(y+13)+'" width="15" height="14" rx="2" fill="#89939e" opacity="'+(j%3===0?".95":".58")+'"/>').join('')+
   '<rect x="195" y="'+(y+7)+'" width="35" height="27" rx="1" fill="#dc4e48"/>'+
   '<text x="213" y="'+(y+25)+'" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">LOT</text>'+
   '<circle cx="768" cy="'+(y+20)+'" r="10" fill="#0b1219" stroke="#6d8190" stroke-width="2"/>'+
   '<rect x="134" y="'+(y+4)+'" width="36" height="34" rx="5" fill="#effaff" fill-opacity=".86" stroke="#95b5c5" stroke-width="2"/>'+
   '<path d="M139 '+(y+19)+'H166V'+(y+32)+'H139Z" fill="'+(sampleLoaded?(isCal?"#7397b7":"#af3c4c"):"#e4f0f7")+'" opacity="'+(sampleLoaded?".9":".45")+'"/>'+
   '<rect x="138" y="'+(y+8)+'" width="27" height="8" rx="2" fill="#f8ffff" opacity=".65"/>'
  :'';
  return '<g>'+rail+cart+
   '<rect x="80" y="'+(y+7)+'" width="27" height="27" rx="7" fill="'+(full?"#d9ecee":"#edf3f6")+'" stroke="#bdced8"/>'+
   '<text x="94" y="'+(y+25)+'" text-anchor="middle" font-family="Arial" font-size="13" font-weight="900" fill="#4b7184">'+(i+1)+'</text>'+
   (isCal?'<text x="892" y="'+(y+25)+'" text-anchor="middle" font-family="Arial" font-size="12" font-weight="850" fill="#477487">'+labels[i]+'</text>':'')+
   '</g>';
 }).join("");
 const caption=mode==="setup"?"EMPTY METAL RACK · 6 PARALLEL LANES":
   isCal?"SIX ASSIGNED CAL / QC CARTRIDGES":"EXAMPLE · CARTRIDGES IN LANES 1 AND 2";
 const base='<ellipse cx="497" cy="390" rx="425" ry="12" fill="#dbe7ed" opacity=".64"/>'+
 '<rect x="61" y="45" width="845" height="335" rx="18" fill="#e9f9fe" fill-opacity=".40" stroke="#a9c9d7" stroke-width="4"/>'+
 '<rect x="71" y="55" width="825" height="314" rx="10" fill="#e6f5fa" fill-opacity=".16" stroke="#c1d9e1" stroke-width="2"/>'+
 '<path d="M76 57H895 M76 368H895" stroke="#fff" stroke-width="6" opacity=".85"/>'+
 '<rect x="100" y="63" width="12" height="292" rx="4" fill="#b7cbd4" stroke="#9bb1ba"/>'+
 '<rect x="862" y="63" width="13" height="292" rx="4" fill="#b7cbd4" stroke="#9bb1ba"/>';
 return illustratedSvg(base+channels+
 '<rect x="241" y="405" width="507" height="35" rx="9" fill="#eaf4f7" stroke="#cadee8"/>'+
 '<text x="494" y="428" font-family="Arial" text-anchor="middle" font-size="17" font-weight="900" fill="#316f85">'+caption+'</text>',
 "Straight top view of PATHFAST six-parallel-lane metal reagent cartridge rack supported in clear loading base, "+occupied+" cartridges present"+(sampleLoaded?", red specimen visible in front transparent sample wells":", front sample wells empty"),
 "0 0 980 450");
}
function pathfastRackBaseSvg(){
 return pathfastRealRackSvg("setup",false);
}

function pathfastActionVisual(stage,mode="patient"){
 const qc=mode==="cal";
 const pic=stage==="base"?pathfastRackBaseSvg():
 stage==="dispense"?pathfastCartridgeSvg(true,true,qc?"calqc":"blood"):
 stage==="rack-empty"?pathfastRackSvg(mode,false):
 stage==="rack"?pathfastRackSvg(mode):
 stage==="tips"?pathfastTipRackSvg(mode):
 stage==="results"?pathfastResultsSvg(mode):
 pathfastCartridgeSvg(false);
 const tag=stage==="base"?"EMPTY METAL SAMPLE RACK":
 stage==="dispense"?"PIPETTE INTO THE CLEAR SAMPLE WELL":
 stage==="rack-empty"?"SAMPLE RACK LOADED WITH CARTRIDGES":
 stage==="rack"?"ACTUAL RACK LAYOUT · CARTRIDGES INSERTED":
 stage==="tips"?"SIX LANE TIP POSITIONS":
 stage==="results"?"RESULT AND STATUS VERIFICATION":"CHECK THE UNUSED REAGENT CARTRIDGE";
 const note=stage==="base"?"With the instrument accessible and idle, carefully remove the metal six-slot cartridge rack and seat it in its clear loading base before inserting cartridges.":
 stage==="dispense"?"Schematic pipette and well. Add the assay-specific material only to the clear front sample well, fill to the mark and avoid bubbles.":
 stage==="rack-empty"?"Seat the assay cartridges fully into the metal rack while it rests in the clear base. Leave the clear front sample wells empty until the next step.":
 stage==="rack"?"Six-slot aluminum rack; actual occupied lanes and assay assignments must match the instrument display.":
 stage==="tips"?"Use approved new tips in each active position. Follow the operator manual and the instrument display.":
 stage==="results"?"Review actual instrument output, flags and calibration/QC acceptability. Follow reporting and disposal procedures; this is a schematic reference, not a result.":
 "Confirm the cartridge type and front sample well; inspect packaging, seal, and expiration.";
 return '<figure class="pf-action-figure"><div class="pf-action-heading">'+tag+'</div><div class="pf-action-image">'+pic+'</div><figcaption>'+note+'</figcaption></figure>';
}

/* Three distinct Sysmex EIGHTCHECK 3WP QC vials.
   Low (red cap), Normal (white cap), High (black cap). */
function eightcheckControlSvg(){
 const vials=[
  {x:56,level:"LOW",code:"3WP-L",cap:"#d84646",stripe:"#d84847"},
  {x:161,level:"NORMAL",code:"3WP-N",cap:"#f7f8f9",stripe:"#2d9f90"},
  {x:266,level:"HIGH",code:"3WP-H",cap:"#20242a",stripe:"#b34e42"}
 ];
 const art=vials.map(v=>{
  const x=v.x;
  return '<g><ellipse cx="'+(x+37)+'" cy="187" rx="33" ry="5" fill="#d9e3e8"/>'+
    '<rect x="'+(x+6)+'" y="53" width="63" height="133" rx="15" fill="#6e2630" stroke="#794853" stroke-width="2.5"/>'+
    '<rect x="'+(x+5)+'" y="30" width="65" height="38" rx="10" fill="'+v.cap+'" stroke="#7c8a90" stroke-width="2.5"/>'+
    Array.from({length:8},(_,i)=>'<path d="M'+(x+11+i*7)+' 35v25" stroke="'+(v.level==="HIGH"?"#59606b":v.level==="LOW"?"#bc393c":"#c1ced3")+'" stroke-width="1.5"/>').join("")+
    '<rect x="'+(x+7)+'" y="90" width="61" height="72" rx="4" fill="#f6fafb"/>'+
    '<rect x="'+(x+7)+'" y="91" width="61" height="20" fill="'+v.stripe+'"/>'+
    '<text x="'+(x+37)+'" y="105" text-anchor="middle" font-size="9.3" font-weight="850" fill="#fff">EIGHTCHECK</text>'+
    '<text x="'+(x+37)+'" y="126" text-anchor="middle" font-size="11" font-weight="900" fill="#394c59">'+v.code+'</text>'+
    '<text x="'+(x+37)+'" y="145" text-anchor="middle" font-size="11" fill="#526b76">1.5 mL</text>'+
    '<text x="'+(x+37)+'" y="207" text-anchor="middle" font-size="12" font-weight="900" fill="#286276">'+v.level+'</text>'+
    '</g>';
 }).join("");
 return illustratedSvg(art,'Three distinct Sysmex EIGHTCHECK-3WP blood control vials: low with red cap, normal with white cap, high with black cap','0 0 390 220');
}

function kitShape(id,filled,context){
 const sampleColor=context==="qc"?"#6c9bcc":"#b73d4c";
 const specimen=filled?sampleColor:"#e5f1f5";
 const outline="#87a5b7",dark="#385b72";
 let h='';
 if(id==="piccolo"){
  return piccoloDiscSvg(filled);
 }
 if(id==="pathfast")return pathfastCartridgeSvg(filled);
 if(id==="sysmex"){
  if(context==="qc")return eightcheckControlSvg();
  h='<rect x="114" y="38" width="91" height="146" rx="15" fill="#edf7fa" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="105" y="26" width="109" height="30" rx="7" fill="#9c69b3" stroke="#7c92a1" stroke-width="3"/>'+
   '<path d="M119 109 H200 V164 Q200 179 185 180 H135 Q119 178 119 162Z" fill="'+sampleColor+'" opacity="'+(filled?'.78':'.46')+'"/>'+
   '<rect x="124" y="104" width="72" height="32" rx="3" fill="#fcfeff"/>'+
   '<text x="160" y="119" font-size="10" fill="#385d75" font-weight="850" text-anchor="middle">EDTA</text>'+
   '<text x="160" y="131" font-size="8.5" fill="#688297" text-anchor="middle">CBC TUBE</text>';
  return illustratedSvg(h,'Sysmex pocH-100i lavender-top blood tube; no reagent cartridge');
 }
 if(id==="triage"){
  h='<rect x="53" y="80" width="214" height="73" rx="12" fill="#f3f6f8" stroke="'+outline+'" stroke-width="3"/>'+
   '<path d="M79 98 H220" stroke="#c7d9e2" stroke-width="4"/>'+
   '<rect x="158" y="107" width="62" height="20" rx="4" fill="#e4edf0" stroke="#b2cbd5" stroke-width="2"/>'+
   '<circle cx="83" cy="117" r="18" fill="'+specimen+'" stroke="#6e9aaa" stroke-width="3"/>'+
   '<rect x="238" y="108" width="16" height="21" rx="4" fill="#386a82"/>';
  return illustratedSvg(h+'<path d="M97 102 L115 50 H189" fill="none" stroke="#2f91a1" stroke-width="3"/><text x="142" y="43" font-size="11" fill="'+dark+'" font-weight="850">SAMPLE PORT</text>',"Triage lateral flow test device "+(filled?"after liquid sample applied":"before sample transfer"));
 }
 if(id==="torch"||id==="spotfire"){
  h='<path d="M60 143 L105 58 L232 58 L264 142 L231 182 L68 182Z" fill="#202b34" stroke="#829aa8" stroke-width="3"/>'+
   '<path d="M77 142 L112 77 H225 L239 140 H77Z" fill="#111b23" stroke="#3c4e59" stroke-width="2"/>'+
   '<circle cx="116" cy="95" r="13" fill="'+(filled?specimen:"#f6fafb")+'" stroke="#c9535d" stroke-width="4"/>'+
   '<circle cx="204" cy="95" r="13" fill="'+(filled?"#8fcbe4":"#f5fafc")+'" stroke="#288fb9" stroke-width="4"/>'+
   '<path d="M83 139 L231 139" stroke="#4b636f" stroke-width="3"/>'+
   Array.from({length:12},(_,i)=>'<rect x="'+(94+i*10)+'" y="143" width="7" height="25" rx="2" fill="#b9d6df" stroke="#8faab6"/>').join("")+
   '<path d="M116 95 L78 34 H25" stroke="#bd5263" stroke-width="2.5" fill="none"/>'+
   '<path d="M204 95 L243 34 H306" stroke="#278db4" stroke-width="2.5" fill="none"/>'+
   '<text x="25" y="25" font-family="Arial" font-size="11" fill="#b3485a" font-weight="850">RED · SAMPLE</text>'+
   '<text x="306" y="25" text-anchor="end" font-family="Arial" font-size="11" fill="#287d9e" font-weight="850">BLUE · HYDRATION</text>';
  return illustratedSvg(h,"Black BioFire pouch with red sample port left and blue hydration port right, "+(filled?"fluids loaded":"wells empty"));
 }
 if(id==="clinitek")return clinitekKit(context==="hcg"?"hcg":"ua",filled);
  if(id==="febridx"){
  h='<rect x="59" y="67" width="213" height="83" rx="16" fill="#f7fbfc" stroke="'+outline+'" stroke-width="3"/>'+
    '<rect x="90" y="85" width="89" height="26" rx="7" fill="#edf4f6" stroke="#9dbbca" stroke-width="2"/>'+
    '<circle cx="223" cy="109" r="16" fill="'+specimen+'" stroke="#bc5264" stroke-width="3"/>'+
    '<rect x="89" y="120" width="91" height="15" rx="3" fill="#d7e6ec"/>'+
    '<path d="M221 90 L249 43 L297 43" fill="none" stroke="#ba5364" stroke-width="2.5"/>'+
    '<text x="245" y="35" font-size="11" fill="'+dark+'" font-weight="850">COLLECTION</text>';
  return illustratedSvg(h,"FebriDx fingerstick integrated test device "+(filled?"after blood collected":"unused"));
 }
 if(id==="drug-screen"){
  h='<rect x="102" y="45" width="119" height="132" rx="14" fill="#f7fafb" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="96" y="33" width="131" height="25" rx="7" fill="#e2eaf0" stroke="#abc0c9" stroke-width="2"/>'+
   '<path d="M108 126 H216 V158 Q212 169 198 169 H121 Q108 169 108 158Z" fill="'+(filled?"#e4ba63":"#e8f2f5")+'" opacity=".7"/>'+
   Array.from({length:12},(_,i)=>'<rect x="'+(114+i*8.4)+'" y="72" width="5" height="42" rx="2" fill="#fafdfd" stroke="#a5b8c6"/>'+
     '<path d="M'+(116+i*8.4)+' 91 v4" stroke="'+(filled?"#c25d74":"#cbd9e0")+'" stroke-width="2"/>').join("");
  return illustratedSvg(h,"Multi-panel urine drug screen cup "+(filled?"with urine in container":"empty"));
 }
 if(id==="coagsense"){
  h='<rect x="40" y="89" width="237" height="55" rx="9" fill="#f1f6f8" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="66" y="102" width="109" height="28" rx="5" fill="#dce8ec"/>'+
   '<circle cx="214" cy="116" r="17" fill="'+specimen+'" stroke="#8eacb7" stroke-width="3"/>'+
   '<path d="M225 102 L260 55 L298 55" stroke="#2d91a0" stroke-width="2.5" fill="none"/>'+
   '<text x="249" y="46" font-size="11" fill="'+dark+'" font-weight="850">SAMPLE WELL</text>';
  return illustratedSvg(h,"Coag-Sense PT INR test strip with capillary sample well "+(filled?"filled":"empty"));
 }
 if(id==="hemocue"){
  h='<path d="M62 84 H222 Q243 84 246 101 V136 Q239 148 225 148 H64 Q50 147 50 134 V99 Q55 84 62 84Z" fill="#eef3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="72" y="99" width="125" height="34" rx="3" fill="'+(filled?"#c04653":"#f7fcfd")+'" stroke="#a5c2ce" stroke-width="2"/>'+
   '<path d="M196 109 H254 L271 100 L271 138 L254 130 H196Z" fill="#f1f5f8" stroke="#abc4d0" stroke-width="2"/>'+
   '<text x="145" y="70" text-anchor="middle" font-size="12" fill="'+dark+'" font-weight="820">MICROCUVETTE</text>';
  return illustratedSvg(h,"HemoCue Hb 201+ single-use microcuvette "+(filled?"filled with blood":"before filling"));
 }
 if(id==="sofia"||id==="poc"){
  h='<rect x="40" y="76" width="240" height="87" rx="15" fill="#fafcfd" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="69" y="94" width="108" height="37" rx="6" fill="#dbe7ed" stroke="#abbfca"/>'+
   '<rect x="190" y="106" width="41" height="18" rx="5" fill="#e0ebee" stroke="#aac4d0"/>'+
   '<circle cx="252" cy="119" r="11" fill="'+(filled?"#e2bdd0":"#fff")+'" stroke="#9eafb8" stroke-width="3"/>'+
   '<path d="M252 107 L270 49 L305 49" stroke="#278e9d" stroke-width="3" fill="none"/>'+
   '<text x="258" y="39" fill="'+dark+'" font-size="11" font-weight="850">SAMPLE WELL</text>';
  return illustratedSvg(h,"Rapid test cassette "+(filled?"after assay-specific extracted sample":"unused"));
 }
 if(id==="idnow"){
  h='<rect x="46" y="89" width="104" height="72" rx="11" fill="#eef3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<circle cx="98" cy="113" r="18" fill="'+(filled?"#c7dae2":"#f9fdfd")+'" stroke="#a4c0cc" stroke-width="3"/>'+
   '<rect x="173" y="86" width="100" height="78" rx="12" fill="#eaf3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<circle cx="201" cy="117" r="12" fill="#f7f9f9" stroke="#a4c0ca" stroke-width="2"/>'+
   '<circle cx="245" cy="117" r="12" fill="#e3ebee" stroke="#a4c0ca" stroke-width="2"/>'+
   '<text x="98" y="176" text-anchor="middle" font-size="10" fill="'+dark+'">SAMPLE RECEIVER</text>'+
   '<text x="223" y="176" text-anchor="middle" font-size="10" fill="'+dark+'">TEST BASE</text>';
  return illustratedSvg(h,"Abbott ID NOW sample receiver and test base "+(filled?"after swab elution":"unused"));
 }
 if(id==="visby"){
  h='<rect x="58" y="55" width="218" height="125" rx="21" fill="#f6f9fa" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="83" y="75" width="163" height="29" rx="8" fill="#d9e7ed"/>'+
   '<circle cx="170" cy="139" r="26" fill="'+(filled?"#dbe7ed":"#f8fcfd")+'" stroke="#a1bdca" stroke-width="3"/>'+
   '<circle cx="170" cy="139" r="11" fill="#b9cdd7"/>';
  return illustratedSvg(h,"Visby self-contained molecular test device "+(filled?"after sample processing":"unused"));
 }
 return illustratedSvg('<rect x="60" y="65" width="200" height="88" rx="16" fill="#f3f8f9" stroke="#a2c0cb" stroke-width="3"/>',"Assay kit reference");
}
function kitScene(id,stage,context){
 const loaded=stage!=="before",what=stage==="before"?"BEFORE SAMPLE":"AFTER SAMPLE";
 const opaque=["torch","spotfire","idnow","visby"].includes(id);
 const noCartridge=id==="sysmex";
 const qc=context==="qc";
 const title=id==="sysmex"&&qc?"EIGHTCHECK 3WP · 3 CONTROL LEVELS":noCartridge?(loaded?"TUBE AT ANALYZER":"COLLECTION TUBE"):opaque?(loaded?"AFTER TRANSFER":"UNPREPARED KIT"):qc?(loaded?"QC MATERIAL APPLIED":"BEFORE QC"):what;
 const note=id==="sysmex"&&qc?"Use EIGHTCHECK-3WP Low, Normal and High controls. Follow the manufacturer mixing, warm-up and QC procedure.":opaque?"Closed pouches and cartridges conceal the sample after transfer.":"Sample position is schematic; follow the assay IFU for actual fill and handling.";
 return '<div class="dev-kit-view"><div class="dev-kit-state">'+title+'</div><div class="dev-kit-drawing">'+kitShape(id,loaded,context)+'</div><p>'+note+'</p></div>';
}
function workflowVisual(sec,title,groupTitle=""){
 if(!sec||!collection[sec.id]||sec.archived)return "";
 if(sec.id==="clinitek"&&/^(ua-strip|hcg-cassette|ua-qc|hcg-qc)$/.test(groupTitle)){
  const hcg=/hcg/.test(groupTitle),qc=/qc/.test(groupTitle),kind=hcg?"hcg":"ua";
  const t=String(title).toLowerCase();
  const before=hcg?/prepare and place|place cassette|prepare hcg|confirm urine specimen and hcg/i.test(t):/prepare the ua dipstick|prepare urinalysis controls/i.test(t);
  const after=hcg?/dispense urine|dispense qc material/i.test(t):/press start, then dip|run each control using the strip/i.test(t);
  if(!before&&!after)return "";
  return '<div class="dev-workflow-visual clinitek-single-visual"><div class="dev-visual-header"><strong>'+(hcg?'hCG CASSETTE':'URINALYSIS DIPSTICK')+'</strong><span>'+(qc?'Control testing':'Patient testing')+'</span></div>'+
   '<div class="dev-kit-scenes" style="grid-template-columns:minmax(0,440px);justify-content:center">'+
   '<div class="dev-kit-view"><div class="dev-kit-state">'+(before?'UNUSED '+(hcg?'CASSETTE':'STRIP'):(qc?'CONTROL APPLIED':'AFTER URINE'))+'</div>'+
   '<div class="dev-kit-drawing">'+clinitekKit(kind,after)+'</div></div></div></div>';
 }

 const id=sec.id,t=String(title).toLowerCase();
 const qc=/\bqc\b|control|calibration/i.test(title);
 const patient=/running|patient|samples|test|fingerstick|blood|collection/i.test(title);
 if(id==="sysmex"&&qc){
  return '<div class="dev-workflow-visual sysmex-eightcheck-guide" aria-label="Three-level Sysmex EIGHTCHECK-3WP QC controls">'+
   '<div class="dev-visual-header"><strong>QC MATERIALS · EIGHTCHECK-3WP</strong><span>Three separate control vials: Low, Normal, High</span></div>'+
   '<div class="dev-kit-scenes" style="grid-template-columns:minmax(0,600px);justify-content:center">'+kitScene(id,"before","qc")+'</div>'+
   '<p class="dev-visual-footnote">Remove and prepare all three control levels as directed by the approved pocH-100i SOP. These are control vials, not patient EDTA tubes.</p></div>';
 }
 if(id==="torch"||id==="spotfire")return "";
 if(id==="piccolo")return "";
 if(id==="pathfast"&&!/(retrieve cartridges|load cartridges|insert the rack)/i.test(title))return "";
 if(!(qc||patient))return "";
 if(/ordering|order set|available locations|results|review, document|maintenance|cleaning|turnaround/i.test(t))return "";
 let cards=[];
 if(id==="pathfast"){
  const current=/retrieve/.test(t)?"before":/load cartridges/.test(t)?"after":"after";
  cards=[kitScene(id,current,"patient")];
 }else cards=[kitScene(id,"before",qc?"qc":"patient"),kitScene(id,"after",qc?"qc":"patient")];
 const media=collection[id];
 const specimen=qc?"Quality controls: use the controls specified by the current analyzer SOP.":media.map(x=>x[1]).join(" or ");
 return '<div class="dev-workflow-visual" aria-label="Illustrated kit before and after specimen preparation"><div class="dev-visual-header"><strong>DEVICE & SAMPLE VISUAL GUIDE</strong><span>'+visualEsc(specimen)+'</span></div>'+
 '<div class="dev-kit-scenes">'+cards.join('')+'</div>'+
 '<p class="dev-visual-footnote">Schematic shapes, not scale drawings. Verify the correct panel, collection material, port, lot and specimen requirements in the manufacturer IFU.</p></div>';
}
function inlineKitVisual(sec,title,depth,rootTitle){
 if(!sec||!collection[sec.id]||sec.archived||sec.id==="piccolo")return "";
 if(sec.id==="torch"||sec.id==="spotfire")return "";
 if(sec.id==="clinitek")return "";
 if(sec.id==="sysmex"&&/\bqc\b|controls?/i.test(String(rootTitle||"")))return "";

 const t=String(title).toLowerCase(),root=String(rootTitle||"").toLowerCase();
 if(depth>1)return "";
 const relevant=/cartridge|cassette|test kit|pouch|vial|test strip|pipett|microcuvette|disc|reagent|sample port|loading station|sample well|rack|device|insert|dispense|apply sample|transfer pipette|load sample|load the sample|load the rack/i.test(title);
 const action=/\bgrab\b|\bremove\b|\bload\b|\bprepare\b|\binsert\b|\bdispens|\btransfer\b|\bapply\b|\bdip\b|\bhydrat|\bcollect\b|\bfill\b|\bplace\b/i.test(title);
 if(!relevant||!action||/printing|printout|log|reagent-status|data|documentation|report|turnaround|unit|normal|expiry|expiration/i.test(t))return "";
 const before=/grab|remove|prepare|collect|select|new box|new shipment/i.test(title)&&!/load|dispens|transfer|fill/i.test(title);
 const qc=/\bqc\b|control|calibration/i.test(root);
 const stage=before?"before":"after";
 return '<div class="dev-inline-illustration"><span class="dev-inline-kicker">'+(stage==="before"?"CHECK ITEM":"SAMPLE / KIT HANDLING")+'</span>'+
 '<div class="dev-inline-drawing">'+kitShape(sec.id,stage!=="before",qc?"qc":"patient")+'</div>'+
 '<span class="dev-inline-caption">'+(stage==="before"?"Identify the correct unused kit or material.":"Use the correct sample location; verify details in the assay IFU.")+'</span></div>';
}


const visualStepsText={
 sysmex:[["Identify the EDTA tube","Lavender-top EDTA whole blood is the collection specimen for CBC testing."],["Identify the closed tube","This analyzer aspirates from a collection tube; there is no disposable sample cartridge."],["Present the specimen for aspiration","Mix and identify the sample as required by the approved procedure. Do not add blood to a reagent cartridge."],["Run the analyzer","Match the tube to the patient ID, then use the actual instrument controls and approved SOP."]],
 piccolo:[["Confirm green-top collection","Use the approved lithium-heparin whole blood or allowed plasma specimen."],["Inspect the reagent disc","Identify the clear single-use chemistry disc and locate its near-center sample port."],["Transfer sample to disc","Use the supplied pipette and a fresh tip. Check the molded sample chamber fill marks."],["Insert the disc","Place the filled disc in the front drawer and complete patient ID and analyzer prompts."]],
 pathfast:[["Confirm green-top collection","Use the approved lithium-heparin specimen and verify mixing/clots."],["Retrieve reagent cartridges","Use the long, narrow black-foil cartridge. Identify the clear sample well at the red-marked end, not the separate round detection well. Match the assay and lane."],["Dispense into sample wells","Pipette the assay-specified sample volume into the clear rectangular well at the red-marked end. Fill to the well line, remove bubbles, and start the run promptly; do not dispense into the black round detection well."],["Load rack and operate","Use the instrument's SAMPLE and SID screens and verify the correct lane before START."]],
 triage:[["Identify specimen for panel","Collect lavender-top EDTA whole blood for the approved cardiac-marker panel (troponin I, BNP or D-dimer)."],["Identify test device","Each assay kit includes its test device and an assay-specific transfer pipette."],["Add sample","Transfer sample to the designated device port using the assay kit instructions."],["Read on MeterPro","Insert the prepared device and follow the meter's patient-test prompts."]],
 clinitek:[["Select the applicable workflow","Urinalysis dipstick and CLINITEST hCG cassette are separate consumables with different sampling methods."],["Use the correct consumable","See the two dedicated workflows below."],["Load only after START","Siemens requires pressing START before sample application for both test types."],["Review analyzer output","Verify the intended test mode and patient before recording results."]],
 torch:[["Collect stool in Cary Blair","GI panel specimens require an approved stool transport medium."],["Prepare pouch and loading station","Identify the pouch, blue hydration port, red sample port and corresponding vials."],["Hydrate and transfer sample","Follow the panel IFU. Fluids enter the sealed pouch and are not directly visible afterward."],["Insert prepared pouch","Load the pouch into the correct TORCH module and run the assigned panel."]],
 spotfire:[["Select correct transport media","Choose UTM/VTM for respiratory or eSwab for throat per the selected assay."],["Prepare kit and pouch","Identify the blue hydration vial and red sample injection vial."],["Hydrate and transfer sample","Use the pouch loading station and assay-specific transfer steps."],["Run on SPOTFIRE","Insert the prepared pouch and confirm panel selection on the analyzer."]],
 febridx:[["Collect fingerstick blood","FebriDx uses a direct fingerstick sample. No purple or green-top tube is used."],["Check the unused FebriDx device","Identify the integrated single-use blood collection and test device."],["Load sample into device","Use the integrated collection tube and actuation method described by the current kit IFU."],["Develop and read","Follow the manufacturer timing and interpretation instructions; the device is not an analyzer cartridge."]],
 "drug-screen":[["Collect urine","Use the approved urine drug screen collection cup."],["Check the unused screening cup","Confirm the correct panel count, packaging and expiration."],["Fill the cup","Collect and secure the urine specimen using the current kit instructions; do not expose test strips."],["Read and document","Follow the prescribed wait/read window and facility confirmation policy."]],
 coagsense:[["Collect capillary blood","Obtain a fingerstick sample with the approved capillary transfer device; no routine blood tube."],["Insert unused PT/INR strip","Identify the strip's sample application well."],["Transfer the sample","Apply blood only when the meter indicates it is ready, using the transfer tube."],["Read meter result","Follow the actual instrument's prompts and approved SOP."]],
 poc:[["Check assay specimen","Other POC tests include multiple specimen types, not one universal tube."],["Choose the correct test kit","Confirm the actual product instructions before collecting or handling the specimen."],["Apply the specimen","Use the indicated specimen port and manufacturer-specified extraction/transfer method."],["Read and report","Follow the kit-specific timing, interpretation and documentation requirements."]],
 sofia:[["Collect the appropriate swab","Use the swab/transport method required by the selected Sofia 2 assay."],["Identify test cassette and extraction kit","Assay-specific cassette and processing tube are required."],["Transfer prepared sample","Dispense extracted sample into the designated cassette sample well."],["Load and read","Choose the applicable Walk Away or Read Now mode and insert the cassette."]],
 hemocue:[["Collect whole blood","A fingerstick drop or permitted venous sample is used; the Hb 201+ microcuvette is the test consumable."],["Identify empty microcuvette","Handle the microcuvette by its body; keep optical surfaces clean."],["Fill by capillary action","Fill the microcuvette from the specimen using the approved instructions and check for bubbles."],["Insert into analyzer","Place the correctly filled microcuvette in its holder and follow the reader instructions."]],
 visby:[["Historical specimen reference","Archived device. Confirm the historical assay specimen."],["Identify unused Visby device","Self-contained molecular test device; schematic only."],["Historical sample path","Not an active testing procedure. Follow historical IFU only for record review."],["Archived instrument reference","This platform is inactive. Do not use it for patient testing."]],
 idnow:[["Historical swab reference","Archived platform. Test-specific swab requirements varied."],["Identify receiver and test base","ID NOW used distinct sample receiver, test base and transfer cartridge."],["Historical transfer pathway","Sample was processed through the receiver and base; this is not current site guidance."],["Archived analyzer reference","This platform is inactive. Do not use it for patient testing."]]
};
/* pocH-100i has a tube aspiration workflow, not a disposable reagent cartridge.
   Give each step a different useful visual instead of repeating capped EDTA tubes. */
function sysmexVisualGuide(sec){
 const screen=illustratedSvg(
  '<rect x="156" y="22" width="428" height="264" rx="23" fill="#edf3f6" stroke="#8eabb9" stroke-width="5"/>'+
  '<rect x="175" y="40" width="390" height="224" rx="12" fill="#f9fcfd" stroke="#c5dbe5" stroke-width="2"/>'+
  '<rect x="175" y="40" width="390" height="48" rx="10" fill="#cfdfeb"/>'+
  '<text x="202" y="70" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#315d77">MAIN · WB</text>'+
  '<rect x="202" y="111" width="168" height="62" rx="9" fill="#eaf0f9" stroke="#7b9fb6" stroke-width="3"/>'+
  '<text x="286" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="800" fill="#245779">SAMPLE ID</text>'+
  '<text x="286" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#5d7b8d">Verify patient</text>'+
  '<rect x="387" y="111" width="151" height="62" rx="9" fill="#e7f5f1" stroke="#53a28e" stroke-width="3"/>'+
  '<text x="462" y="137" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="800" fill="#206c66">WB MODE</text>'+
  '<text x="462" y="157" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#4f867c">Whole blood</text>'+
  '<path d="M207 202 H534" stroke="#c7d7e0" stroke-width="3"/>'+
  '<text x="370" y="233" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#526f83">Confirm ID before loading</text>',
  'Schematic pocH-100i touchscreen showing Sample ID and whole blood mode','0 0 740 310');
 const sampleBay=illustratedSvg(
  body(specs.sysmex.shape,specs.sysmex.accent)+
  '<ellipse cx="355" cy="218" rx="38" ry="70" fill="none" stroke="#138c99" stroke-width="4" stroke-dasharray="7 6"/>'+
  '<path d="M382 220 L456 218 L525 198" fill="none" stroke="#168995" stroke-width="4" stroke-linecap="round"/>'+
  '<rect x="525" y="166" width="182" height="39" rx="11" fill="#e8f5f5" stroke="#a4d3d6" stroke-width="2"/>'+
  '<text x="616" y="191" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#236e79">SAMPLE DOOR</text>'+
  '<text x="86" y="143" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#3a657b">ADAPTER</text>'+
  '<path d="M125 153 V176 H167" stroke="#168995" stroke-width="3" fill="none"/>'+
  '<rect x="137" y="183" width="56" height="79" rx="10" fill="#f4e9ca" stroke="#ae9970" stroke-width="3"/>'+
  '<rect x="147" y="198" width="36" height="59" rx="7" fill="#edf5f6" stroke="#9ab9c5" stroke-width="2"/>'+
  '<text x="165" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="#576f7c">TUBE</text>'+
  '<path d="M193 220 H312" stroke="#168995" stroke-width="3" stroke-dasharray="7 5" fill="none"/>'+
  '<path d="M308 213 L319 220 L308 227" stroke="#168995" stroke-width="3" fill="none"/>',
  'pocH-100i sample compartment highlighted with schematic sample adapter and tube','0 0 740 310');
 const analyzer=illustratedSvg(body(specs.sysmex.shape,specs.sysmex.accent),
  'Sysmex pocH-100i analyzer with screen and purple sample compartment','0 0 740 310');
 const cards=[
  ['Collect and gently mix EDTA whole blood',
   '<div class="device-gallery-specimens"><div class="device-gallery-media">'+mediaSvg('lavender')+'<small>Lavender-top EDTA whole blood</small></div></div>',
   'Verify the tube and patient identifiers. Gently invert the tube according to the approved collection SOP. Check for clots.'],
  ['Enter the sample ID and confirm WB mode',
   '<div class="device-gallery-image">'+screen+'</div>',
   'On the pocH-100i, select Sample ID and enter or scan the correct ID. Confirm whole-blood (WB) mode. Screen shown is a simplified reference.'],
  ['Open the sample door and insert the tube',
   '<div class="device-gallery-image device-gallery-analyzer">'+sampleBay+'</div>',
   'Open the sample compartment, place the correct adapter, gently re-mix the specimen, and load the tube. Closed-tube mode requires an approved pierceable cap; open-tube mode requires cap removal.'],
  ['Close the door, run, and verify results',
   '<div class="device-gallery-image device-gallery-analyzer">'+analyzer+'</div>',
   'Close the sample compartment, press RUN, and review results and instrument flags. Never open the sample compartment during aspiration.']
 ];
 return '<section class="device-gallery sysmex-gallery" aria-label="Sysmex pocH-100i specimen to analyzer training steps">'+
  '<div class="device-gallery-heading"><div><span>VISUAL TRAINING REFERENCE</span><h2>Sysmex pocH-100i · sample testing</h2><p>EDTA whole blood → Patient ID → Sample compartment → Analysis</p></div><span class="device-gallery-count">4 STEPS</span></div>'+
  '<div class="device-gallery-grid">'+cards.map((step,i)=>'<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+visualEsc(step[0])+'</strong></div>'+step[1]+'<p>'+visualEsc(step[2])+'</p></article>').join('')+'</div>'+
  '<p class="device-gallery-note"><strong>Tube cap safety:</strong> Closed-tube aspiration is permitted only with a compatible pierceable rubber cap. Do not use non-pierceable caps with the piercer. For open-tube mode, remove the cap before loading. Diagrams are schematic, not exact instrument screen or adapter replicas. Follow the manufacturer IFU and approved site SOP.</p>'+
  '</section>';
}

function visualGuide(sec){
 if(!sec||!specs[sec.id]||!visualStepsText[sec.id])return "";
 if(sec.id==="clinitek")return clinitekVisualGuide(sec);
 if(sec.id==="sysmex")return sysmexVisualGuide(sec);
 const id=sec.id,arr=visualStepsText[id],med=collection[id]||[],archive=!!sec.archived;
 const title=archive?"Historical consumable reference":"Specimen to instrument · visual steps";
 let steps=arr.map((step,i)=>{
   let visual='';
   if(i===0){
     visual='<div class="device-gallery-specimens">'+med.map(x=>'<div class="device-gallery-media">'+mediaSvg(x[0])+'<small>'+visualEsc(x[1])+'</small></div>').join('')+'</div>';
   }else if(i===1) visual='<div class="device-gallery-image">'+kitShape(id,false,"patient")+'</div>';
   else if(i===2)visual='<div class="device-gallery-image">'+kitShape(id,true,"patient")+'</div>';
   else visual='<div class="device-gallery-image device-gallery-analyzer">'+
     illustratedSvg(body(specs[id].shape,specs[id].accent),id+" device representation","0 0 740 310")+'</div>';
   return '<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+visualEsc(step[0])+'</strong></div>'+
   visual+'<p>'+visualEsc(step[1])+'</p></article>';
 }).join('');
 return '<section class="device-gallery" aria-label="Step-by-step illustrated '+visualEsc(sec.title)+' reference">'+
 '<div class="device-gallery-heading"><div><span>VISUAL TRAINING REFERENCE</span><h2>'+title+'</h2><p>'+visualEsc(sec.title)+' · '+(archive?'Archived reference only':'Select the exact assay before testing')+'</p></div><span class="device-gallery-count">4 STEPS</span></div>'+
 (archive?'<p class="device-gallery-archive">Archived device: informational reference only. Do not use for current patient testing.</p>':'')+
 '<div class="device-gallery-grid">'+steps+'</div>'+
 '<p class="device-gallery-note">Verify the correct panel, collection materials, sample ports, lot and assay requirements in the approved IFU.</p></section>';
}

window.LAB_EQUIPMENT_ART={clinitekDeviceMarkup:clinitekDeviceMarkup,clinitekDeviceSvg:clinitekDeviceSvg,sysmexDeviceSvg:sysmexDeviceSvg,sysmexDeviceMarkup:sysmexDeviceMarkup,piccoloDeviceSvg:piccoloDeviceSvg,pathfastActionVisual:pathfastActionVisual,pathfastRackSvg:pathfastRackSvg,render:render,ids:Object.keys(specs),piccoloVisual:piccoloVisual,piccoloDiscSvg:piccoloDiscSvg,piccoloPipetteSvg:piccoloPipetteSvg,specimenGuide:specimenGuide,mediaSvg:mediaSvg,kitShape:kitShape,kitScene:kitScene,workflowVisual:workflowVisual,inlineKitVisual:inlineKitVisual,clinitekKit:clinitekKit,visualGuide:visualGuide};
})();