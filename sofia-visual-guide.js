/* Sofia 2 instrument and workflow artwork.
   Visual layouts based on Sofia 2 user manual and user-supplied analyzer photo.
   Screen illustrations are training schematics, not software controls.
   Assay materials/times vary; always use the current assay-specific IFU. */
(function(){
"use strict";
const A=window.LAB_EQUIPMENT_ART;
const F=window.LAB_INSTRUMENT_FOCUS;
const originalFocus=F?.render?.bind(F);
if(!A||!F)return;
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const txt=(x,y,value,size=14,color="#fff",weight=700,anchor="start")=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-family="Arial,Helvetica,sans-serif" font-weight="'+weight+'" text-anchor="'+anchor+'">'+esc(value)+'</text>';
const rect=(x,y,w,h,r=0,fill="#fff",stroke="none",sw=1)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const line=(x,y,xx,yy,color="#8da8b7",w=2)=>'<path d="M'+x+' '+y+'L'+xx+' '+yy+'" stroke="'+color+'" stroke-width="'+w+'" fill="none" stroke-linecap="round"/>';
const circ=(x,y,r,fill,stroke="none",sw=1)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
const boxText=(x,y,w,headline,secondary)=>rect(x,y,w,54,10,"#f3f9fc","#cbdfe8",1.4)+txt(x+13,y+22,headline,14,"#285a70",800)+(secondary?txt(x+13,y+40,secondary,10,"#6c8998",500):"");
const statusBar=rect(0,0,340,24,0,"#0a1014")+txt(12,16,"▣  ◇",12,"#ebf4f6")+txt(329,16,"9:30AM  |  08/04/15",11,"#c1cbd0",500,"end");
function screen(mode){
 let s=rect(0,0,340,230,4,"#252b2e")+statusBar;
 const nav=rect(0,198,340,32,0,"#202629")+rect(13,201,28,25,3,"#14191c")+txt(27,218,"⌂",19,"#fff",800,"middle")+rect(272,201,30,25,3,"#087d9c")+txt(287,218,"▣",15,"#fff",800,"middle")+rect(307,201,29,25,3,"#087d9c")+txt(321,218,"⬆",15,"#fff",800,"middle");
 if(mode==="result"||mode==="qc-result"||mode==="progress"||mode==="cal-pass"){
  s+=txt(20,48,mode==="qc-result"?"QC Results":mode==="cal-pass"?"Calibration Results":"Flu A+B",19,"#e9f1f2",650);
  if(mode==="result"){
   s+=txt(22,76,"12345",12,"#c2d3da")+txt(22,100,"ABCD",12,"#c2d3da");
   for(let i=0;i<40;i++){const a=(i*9-90)*Math.PI/180;s+=line(181+57*Math.cos(a),116+57*Math.sin(a),181+65*Math.cos(a),116+65*Math.sin(a),"#de811c",5);}
   s+=txt(181,134,"+",64,"#e8eef0",800,"middle");
   [["Flu A","+","#e58e21"],["Flu B","−","#1b96c7"],["Control","✓","#69ab63"]].forEach((it,i)=>{s+=txt(263,85+29*i,it[0],12,"#dce8ee",600,"end")+circ(303,80+29*i,11,it[2])+txt(303,86+29*i,it[1],18,"#fff",800,"middle");});
  } else if(mode==="progress"){
   s+=txt(20,76,"WALK AWAY",13,"#e9f1f2",600)+txt(170,132,"12:34",43,"#eb932a",800,"middle")+txt(170,155,"remaining",12,"#cad4d7",500,"middle");
  } else if(mode==="qc-result"){
   s+=txt(23,78,"Positive Control",14,"#e2ecee")+txt(23,121,"Negative Control",14,"#e2ecee");
   [81,124].forEach(y=>{s+=circ(277,y-6,15,"#68a94c")+txt(277,y, "✓",20,"#fff",800,"middle");});
   s+=txt(23,176,"QC PASS",17,"#a9e3be");
  } else {
   s+=txt(22,90,"Calibration check",16,"#dce5ea")+circ(285,91,18,"#67a758")+txt(285,98,"✓",24,"#fff",800,"middle")+txt(23,145,"PASS",24,"#a2e1b6",800);
  }
  return s+nav;
 }
 if(mode==="menu-test"||mode==="menu-qc"||mode==="menu-cal"){
  const sel=mode==="menu-qc"?2:mode==="menu-cal"?3:0;
  s+=rect(0,24,300,174,0,"#13556a");
  ["Run Test","Review Data","Run QC","Run Calibration","Send Data","Supervisor Menu"].forEach((v,i)=>{
   if(i===sel)s+=rect(7,29+i*27,286,25,2,"none","#e98e25",2);
   s+=txt(22,46+i*27,["▶","↶","QC","◎","⬆","♙"][i],14,"#edf7f9",700)+txt(63,46+i*27,v,13,"#fff",650);
  });
  return s+nav;
 }
 if(mode==="scan-qc"||mode==="scan-cal"){
  s+=txt(16,48,mode==="scan-qc"?"Run QC":"Run Calibration",19,"#fff");
  s+=txt(21,79,"User ID",13,"#d2dce0")+rect(153,58,167,29,3,"#e6ebed")+txt(163,77,"Operator",12,"#374c56",600);
  s+=txt(21,123,mode==="scan-qc"?"Scan QC card":"Calibration cassette",13,"#d2dce0")+rect(153,99,167,29,3,"#e6ebed")+txt(162,119,mode==="scan-qc"?"QC kit / lot barcode":"Dedicated optical cassette",11,"#314e5e",600);
  s+=rect(209,158,114,32,4,"#087e9c")+txt(266,179,"▶  NEXT",13,"#fff",750,"middle");
  return s+nav;
 }
 if(mode==="load"||mode==="cal-load"||mode==="qc-load"){
  s+=txt(18,52,mode==="cal-load"?"Insert Calibration":mode==="qc-load"?"Insert QC Cassette":"Insert Test Cassette",18,"#fff");
  s+=rect(45,84,255,78,10,"#1b3845","#387e95",2)+rect(69,105,170,40,7,"#e8edf0","#a7b9c4",2)+circ(92,124,9,"#fff","#8d9aa6",2)+rect(147,119,57,12,3,"#c7d6dd");
  s+=txt(170,181,"Close the blue drawer gently",12,"#d7e5e8",600,"middle");
  return s+nav;
 }
 // True Sofia 2 Run Test display: ID fields on the right, development options beneath.
 s+=txt(16,47,mode==="mode"?"Choose Development Mode":"Run Test",18,"#eef4f7");
 s+=rect(17,59,127,112,8,"#142a34","#284958",1.2)+txt(80,99,"▤",31,"#51a0b1",800,"middle")+txt(80,125,"BARCODE",12,"#bdd9df",700,"middle");
 [["User ID","Operator"],["Patient ID","MRN ######"],["Order Number","Optional"]].forEach((a,i)=>{
  const y=51+i*36;s+=txt(159,y+9,a[0],10,"#dbe2e5")+rect(229,y-7,103,26,2,mode==="entry"&&i===1?"#cde9e8":"#dadfe2",mode==="entry"&&i===1?"#37b1ac":"#7d8a90",1)+txt(235,y+10,a[1],11,"#3e4c54",600);
 });
 s+=circ(170,160,8,mode==="mode"?"#e58b23":"#e58b23","#e9eef0",1)+txt(185,164,"WALK AWAY",11,"#fff",650)+circ(170,181,8,"none","#e7eef2",1.6)+txt(185,185,"READ NOW",11,"#fff",600);
 s+=rect(260,160,73,34,4,"#087d9d")+txt(297,182,"▶",23,"#fff",750,"middle");
 return s+nav;
}
function housing(mode){
 const sc=screen(mode);
 return '<defs><linearGradient id="sofiaHoodGrad" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#278dac"/><stop offset=".58" stop-color="#0e83a4"/><stop offset="1" stop-color="#076786"/></linearGradient><linearGradient id="sofiaFaceGrad" x1="0" x2=".9" y1="0" y2="1"><stop stop-color="#35373a"/><stop offset="1" stop-color="#1c1e21"/></linearGradient></defs>'+
 '<ellipse cx="215" cy="377" rx="163" ry="14" fill="#9fb9c7" opacity=".22"/>'+
 '<path d="M91 118 L113 48 Q125 29 157 30 L163 53 Q168 64 187 64 L266 64 Q283 64 287 45 L296 29 Q330 31 339 62 L360 132 L355 329 Q350 365 329 371 L112 370 Q76 362 74 324Z" fill="#2d3135" stroke="#25292e" stroke-width="5"/>'+
 '<path d="M89 138 Q91 94 114 100 Q152 83 315 97 Q352 101 363 150 L359 184 Q355 156 326 155 L114 155 Q87 155 76 181Z" fill="url(#sofiaHoodGrad)"/>'+
 '<path d="M76 185 Q78 150 112 149 L324 149 Q357 149 359 190 L357 322 Q355 362 327 369 L109 369 Q78 362 77 323Z" fill="url(#sofiaFaceGrad)"/>'+
 '<rect x="100" y="168" width="234" height="153" rx="22" fill="#131517" stroke="#343638" stroke-width="3"/>'+
 '<svg x="111" y="181" width="212" height="126" viewBox="0 0 340 230" preserveAspectRatio="none">'+sc+'</svg>'+
 '<rect x="117" y="331" width="79" height="31" rx="7" fill="#171a1d" stroke="#2d363b" stroke-width="2"/>'+
 '<rect x="130" y="339" width="51" height="14" rx="3" fill="#111b21"/><path d="M136 342 L170 342" stroke="#274c58" stroke-width="2"/>'+
 txt(156,369,"▣ Sofia 2",12,"#e4eaed",700,"middle")+
 '<path d="M239 330 Q240 318 255 318 L313 318 Q329 319 330 333 L331 371 L239 371Z" fill="#075c78"/>'+
 '<path d="M251 333 L317 333 Q321 333 321 342 L321 352 L249 352Z" fill="#0086ae"/>'+
 '<path d="M247 355 L325 355 L316 371 L253 371Z" fill="#033c58"/>';
}
function zoom(mode){
 return '<g transform="translate(421 45)">'+rect(0,0,363,298,17,"#e7f1f5","#bbd6e1",2)+
 txt(18,29,mode==="result"?"RESULT DISPLAY":mode==="mode"?"RUN TEST / MODE":mode==="qc-result"?"QC RESULT":mode==="cal-pass"?"CALIBRATION RESULT":"SOFIA 2 TOUCHSCREEN",12,"#356d84",800)+
 rect(11,40,341,235,9,"#192023","#667d88",2)+
 '<svg x="12" y="41" width="339" height="232" viewBox="0 0 340 230">'+screen(mode)+'</svg>'+
 txt(182,291,"ILLUSTRATED SCREEN",10,"#718f9d",750,"middle")+'</g>';
}
function cassette(x=450,y=160,type="patient",filled=false){
 const name=type==="cal"?"CALIBRATION":type==="qc"?"QC TEST CASSETTE":"TEST CASSETTE";
 let a='<g transform="translate('+x+' '+y+')">'+
 '<rect x="0" y="0" width="270" height="91" rx="12" fill="#cfdce4" stroke="#8faebd" stroke-width="3"/>'+
 '<rect x="9" y="7" width="252" height="77" rx="9" fill="#f6fafb" stroke="#a1b8c4" stroke-width="1.5"/>'+
 txt(22,29,name,13,"#376b7e",800)+
 '<rect x="18" y="40" width="96" height="19" rx="3" fill="#e7edf1" stroke="#adbdc7"/>'+
 txt(25,54,type==="cal"?"OPTICS CHECK":"SOFIA 2",11,"#607b89",750)+
 '<rect x="145" y="35" width="78" height="24" rx="4" fill="#d5e4eb" stroke="#9cb9c5"/>'+
 circ(241,48,15,filled?"#d4dae8":"#fff","#98a9b8",3)+
 (type==="cal"?'<path d="M150 47 h67" stroke="#5292a6" stroke-width="3"/>':"")+
 txt(135,80,type==="cal"?"REUSABLE OPTICAL CHECK":"Sample well →",10,"#547b8d",700)+
 '</g>';
 return a;
}
function specimenScene(type){
 let s="";
 if(type==="swab"){
  s+=boxText(441,52,322,"COLLECTION SWAB","Use only the swab/site allowed for this assay");
  s+='<path d="M492 124 L699 200" stroke="#b7c8cd" stroke-width="11" stroke-linecap="round"/>'+
    '<path d="M481 117 Q459 112 457 125 Q456 144 478 147 L500 133Z" fill="#fff" stroke="#a0b5be" stroke-width="2"/>';
  s+=boxText(441,260,322,"TEST-SPECIFIC KIT","Swab type and collection site may differ");
 }else if(type==="extract"){
  s+=boxText(441,50,322,"EXTRACTION TUBE","Use manufacturer reagent and timing");
  s+='<rect x="539" y="114" width="83" height="168" rx="12" fill="#e2edf2" stroke="#8fb3c4" stroke-width="4"/>'+
  '<rect x="545" y="205" width="71" height="70" rx="7" fill="#c5e3e5"/>'+
  '<rect x="534" y="105" width="94" height="20" rx="7" fill="#d8e8ef" stroke="#8aadb9" stroke-width="2"/>'+
  '<path d="M510 93 L574 209" stroke="#a5b9c3" stroke-width="10" stroke-linecap="round"/>'+
  '<ellipse cx="510" cy="93" rx="14" ry="23" transform="rotate(-27 510 93)" fill="#fff" stroke="#97adb8" stroke-width="2"/>'+
  txt(666,166,"Gently mix",16,"#3a7c8e",750);
 }else if(type==="pipette"){
  s+=boxText(433,39,340,"PREPARED EXTRACT","Transfer only the specified volume");
  s+='<rect x="486" y="108" width="85" height="162" rx="12" fill="#e6f1f4" stroke="#94b5c3" stroke-width="3"/>'+
  '<rect x="493" y="193" width="70" height="68" rx="8" fill="#c6e1df"/>'+
  '<path d="M640 113 L606 184" stroke="#a6bec6" stroke-width="9" stroke-linecap="round"/>'+
  '<ellipse cx="646" cy="98" rx="13" ry="25" transform="rotate(26 646 98)" fill="#deedf0" stroke="#93b1bc" stroke-width="2"/>'+
  '<path d="M601 185 L592 202" stroke="#8daebb" stroke-width="5"/>'+
  cassette(444,281,"patient",true);
 }else if(type==="cassette"){
  s+=boxText(436,53,334,"SAMPLE WELL","Dispense per current assay package insert");
  s+=cassette(458,148,"patient",true);
  s+='<path d="M685 97 L679 146" stroke="#2b92ad" stroke-width="3"/>'+
   '<path d="M679 146 l-7 -12 m7 12 l9 -11" stroke="#2b92ad" stroke-width="3" fill="none"/>';
 }else if(type==="qc"){
  s+=boxText(429,38,345,"POSITIVE + NEGATIVE","Two external controls, separate cassettes");
  s+='<rect x="475" y="116" width="52" height="165" rx="8" fill="#f8f9f8" stroke="#b0c3c8" stroke-width="2"/>'+
   '<rect x="544" y="116" width="52" height="165" rx="8" fill="#f8f9f8" stroke="#b0c3c8" stroke-width="2"/>'+
   '<rect x="474" y="110" width="54" height="28" rx="6" fill="#bc685f"/>'+
   '<rect x="543" y="110" width="54" height="28" rx="6" fill="#2e87b0"/>'+
   txt(501,197,"POS",13,"#91514d",800,"middle")+txt(570,197,"NEG",13,"#2e7798",800,"middle")+
   '<rect x="622" y="116" width="132" height="105" rx="9" fill="#fff" stroke="#9ebdca" stroke-width="2"/>'+
   txt(688,147,"QC CARD",16,"#336e83",800,"middle")+
   Array.from({length:13},(_,i)=>rect(643+i*7,169,i%3===0?3:2,38,0,"#334a58")).join("")+
   txt(688,242,"Scan kit-specific",12,"#5e8191",650,"middle")+txt(688,256,"lot barcode",12,"#5e8191",650,"middle");
 }else if(type==="cal"){
  s+=boxText(431,48,340,"OPTICAL CALIBRATION","Dedicated cassette, not a test cassette");
  s+=cassette(453,139,"cal",false);
  s+=rect(484,260,224,60,8,"#303941","#687b87",2)+txt(595,285,"OPAQUE STORAGE",14,"#e6eff1",800,"middle")+txt(595,302,"Return cassette after check",11,"#cfdee4",600,"middle");
 }
 return s;
}
function art(mode,scene){
 const body=housing(mode)+(scene?specimenScene(scene):zoom(mode));
 return '<svg class="sofia-device-art" viewBox="0 0 820 408" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(scene?"Sofia 2 instrument with "+scene+" materials":"Sofia 2 front panel with enlarged illustrated "+mode+" screen")+'">'+body+'</svg>';
}
function figure(title,mode,note,scene){
 return '<figure class="lc-focus-figure sofia-focus-figure"><header>'+esc(title)+'</header><div class="lc-focus-art">'+art(mode,scene)+'</div><figcaption>'+esc(note)+'</figcaption></figure>';
}
function focused(sec,heading,group){
 if(sec?.id!=="sofia")return originalFocus?originalFocus(sec,heading,group):"";
 const g=String(group||"").toLowerCase(),t=String(heading||"").toLowerCase();
 if(g.includes("ordering-tests"))return figure("Order the intended Sofia 2 assay","menu-test","Select the correct Athena test. Flu, SARS, RSV and Strep may use different kit materials and specimen requirements.");
 if(g.includes("running-tests")){
  if(t.includes("verify order")||t.includes("check the order"))return figure("Verify test selection and kit","menu-test","Confirm the ordered assay, kit expiration, lot status and satisfactory QC before patient testing.","swab");
  if(t.includes("collect"))return figure("Collect an approved swab specimen","entry","Use the swab type and collection site specified by the selected assay; do not substitute a transport swab.","swab");
  if(t.includes("extract"))return figure("Process the swab in the kit extraction tube","entry","Follow the assay package insert for reagent, mixing, contact time and swab expression.","extract");
  if(t.includes("dispense")||t.includes("sample well"))return figure("Add prepared extract to test cassette","entry","Dispense the assay-specified volume using the supplied transfer device. Never pour directly from the extraction tube.","cassette");
  if(t.includes("run test")||t.includes("patient id"))return figure("Run Test and enter identifiers","entry","Use the actual Sofia 2 Run Test screen: scan or enter User ID, patient MRN and Order Number when applicable.");
  if(t.includes("development mode")||t.includes("walk away"))return figure("Select WALK AWAY or READ NOW","mode","WALK AWAY: insert the newly inoculated cassette immediately. READ NOW: develop on bench for the assay-specific time before insertion.");
  if(t.includes("insert")||t.includes("drawer"))return figure("Insert cassette into lower-right blue drawer","load","Pull open the blue drawer, place the prepared cassette flat as directed, and gently close it. Never open the drawer during analysis.");
  if(t.includes("result")||t.includes("control"))return figure("Review test and procedural-control result","result","The Sofia 2 result screen reports analytes and the internal procedural control. A failed control means the test is invalid.");
  if(t.includes("relaymed")||t.includes("document"))return figure("Verify and document the patient result","result","Confirm MRN, assay, procedural-control validity, result and any required repeat or confirmatory testing before release.");
 }
 if(g.includes("qc-test")){
  if(t.includes("gather")||t.includes("check the qc"))return figure("Gather assay QC materials","menu-qc","Obtain positive and negative control swabs, two new test cassettes, reagent materials and the kit-specific QC card.","qc");
  if(t.includes("run qc")||t.includes("scan"))return figure("Menu → Run QC; scan the QC card","scan-qc","Scan or enter User ID, then scan the QC card for the exact assay kit lot. This differs from calibration.","qc");
  if(t.includes("positive")&&t.includes("prepare"))return figure("Prepare positive QC first","qc-load","Use the positive swab with extraction reagents and a fresh cassette following the assay IFU.","qc");
  if(t.includes("positive")&&t.includes("insert"))return figure("Read the positive control cassette","qc-load","Insert the prepared positive QC cassette in the blue drawer using the selected development mode.");
  if(t.includes("negative"))return figure("Next arrow → prepare and read negative QC","qc-load","After positive QC, select the forward arrow rather than the skip icon. Use a fresh negative swab and cassette.","qc");
  if(t.includes("result")||t.includes("document")||t.includes("record"))return figure("Check positive and negative QC results","qc-result","Both controls must pass before patient testing. Record results and follow the site's failed-QC procedure.");
  if(t.includes("box")||t.includes("lot"))return figure("Document kit receipt and QC","qc-result","Mark receipt date, QC date and operator according to the approved site policy.");
 }
 if(g.includes("calibration")){
  if(t.includes("due")||t.includes("30 day"))return figure("Check calibration due status","menu-cal","Perform a Sofia 2 optical calibration check at intervals of 30 days or less, before patient testing.");
  if(t.includes("run calibration")||t.includes("menu"))return figure("Menu → Run Calibration","menu-cal","Use the Sofia 2 calibration function, not Run QC and not the ordinary test workflow.");
  if(t.includes("cassette")||t.includes("drawer"))return figure("Insert the dedicated calibration cassette","cal-load","Remove the optics calibration cassette from its opaque sleeve, insert into the blue drawer and close gently.","cal");
  if(t.includes("pass")||t.includes("record")||t.includes("sleeve"))return figure("Confirm pass and protect calibration cassette","cal-pass","Confirm successful calibration, document per site policy, and return the cassette to its light-protective sleeve.","cal");
 }
 return figure("Sofia 2 instrument and assay-specific supplies","entry","Follow the live on-screen prompts and the current assay-specific package insert.");
}
const oldRender=A.render.bind(A);
A.render=sec=>{
 const base=oldRender(sec);
 if(sec?.id!=="sofia")return base;
 return base.replace(/<svg class="equipment-svg"[\s\S]*?<\/svg>/,art("result",null).replace('class="sofia-device-art"','class="equipment-svg sofia-device-art"'));
};
const oldKitShape=A.kitShape?.bind(A);
if(oldKitShape)A.kitShape=(id,filled=false,context="patient")=>{
 if(id!=="sofia")return oldKitShape(id,filled,context);
 return '<svg viewBox="0 0 820 408" role="img" aria-label="Sofia 2 test cassette and sample well" xmlns="http://www.w3.org/2000/svg">'+
  cassette(260,152,context==="qc"?"qc":"patient",filled)+
  txt(400,130,"SOFIA 2 · "+(context==="qc"?"QC CASSETTE":"ASSAY CASSETTE"),18,"#2e677d",800,"middle")+
  txt(400,290,"Assay-specific design / sample volume",13,"#6b8593",600,"middle")+'</svg>';
};
F.render=focused;
})();