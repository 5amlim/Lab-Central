/* Focused, task-matched pocH-100i visual references.
   Patient testing uses patient EDTA specimens, never EIGHTCHECK control vials.
   Analyzer controls are illustrated as schematic navigation, not pixel-exact screenshots. */
(function(){
"use strict";
const esc=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const svg=(s,description,view="0 0 680 350")=>'<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(description)+'" viewBox="'+view+'">'+s+'</svg>';
const tx=(x,y,value,size=17,color="#345e73",weight=750,anchor="middle")=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" text-anchor="'+anchor+'" font-size="'+size+'" font-weight="'+weight+'" font-family="Arial,sans-serif">'+esc(value)+'</text>';
function figure(title,body,caption){
 return '<figure class="lc-poc-figure"><header>'+esc(title)+'</header><div class="lc-poc-art">'+body+'</div><figcaption>'+esc(caption)+'</figcaption></figure>';
}
function tube(x,y,turned=false){
 const v='<g transform="translate('+x+' '+y+')">'+
 '<rect x="13" y="29" width="65" height="200" rx="16" fill="#f0f9fc" stroke="#8aaaba" stroke-width="4"/>'+
 // When inverted, liquid is near the cap (now the lowest physical point).
 (turned?'<path d="M18 54H73V114Q68 125 46 126Q23 124 18 113Z" fill="#a83d54"/>':'<path d="M18 141H73V205Q68 223 47 224Q22 222 18 205Z" fill="#ab3d53"/>')+
 '<rect x="5" y="9" width="81" height="43" rx="9" fill="#9767b2" stroke="#6d8095" stroke-width="3"/>'+
 '<path d="M12 21H79" stroke="#c6a4d1" stroke-width="3"/>'+
 '<rect x="22" y="111" width="47" height="51" rx="4" fill="#fff" stroke="#d7e5eb"/>'+
 tx(46,133,"EDTA",12,"#385e73",850)+tx(46,148,"CBC",10,"#6b8493")+'</g>';
 return turned?'<g transform="rotate(180 '+(x+45)+' '+(y+120)+')">'+v+'</g>':v;
}
function timing(){
 return svg(tube(106,55)+
 '<rect x="302" y="73" width="292" height="77" rx="12" fill="#ecf7f7" stroke="#abd7d5" stroke-width="2"/>'+
 tx(322,104,"ROOM TEMPERATURE",14,"#457482",850,"start")+
 tx(322,132,"Within 8 hours",20,"#197b78",900,"start")+
 '<rect x="302" y="161" width="292" height="92" rx="12" fill="#eef5fb" stroke="#b9d6e8" stroke-width="2"/>'+
 tx(322,192,"REFRIGERATED",14,"#457482",850,"start")+
 tx(322,220,"Up to 24 hours",20,"#286c91",900,"start")+
 tx(322,241,"Bring to room temperature first",12,"#68869b",700,"start"),
 'Lavender top EDTA specimen with room-temperature and refrigerated sample timing');
}
function invert(){
 return svg(
 tube(87,47)+tube(384,47,true)+
 '<path d="M228 97Q299 35 368 99" fill="none" stroke="#228f91" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M340 84L371 101L362 66" fill="none" stroke="#228f91" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<path d="M370 242Q300 297 226 238" fill="none" stroke="#72a8b7" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M240 269L221 236L257 244" fill="none" stroke="#72a8b7" stroke-width="7" stroke-linejoin="round"/>'+
 tx(146,331,"UPRIGHT",13,"#386e81",850)+tx(429,331,"INVERTED",13,"#386e81",850)+
 tx(304,181,"Gently",18,"#277a84",850)+tx(304,203,"invert",18,"#277a84",850),
 'EDTA lavender top tube gently turned upside-down and upright using curved arrows; blood at the lowest end in both positions');
}
function screen(mode){
 if(mode==="shutdown"||mode==="execute"){
  const first=mode==="shutdown";
  const row=(y,label,active)=>'<rect x="111" y="'+y+'" width="453" height="45" rx="7" fill="'+(active?"#dff3ed":"#ffffff")+'" stroke="'+(active?"#19917e":"#c7dce4")+'" stroke-width="'+(active?3:1.5)+'"/>'+tx(130,y+28,label,17,active?"#197e73":"#58798b",active?900:700,"start");
  return svg('<rect x="69" y="26" width="543" height="291" rx="19" fill="#dbe6ec" stroke="#93adbb" stroke-width="5"/>'+
   '<rect x="91" y="52" width="502" height="247" rx="11" fill="#f4f9fc" stroke="#a3bdca" stroke-width="3"/>'+
   '<rect x="94" y="55" width="496" height="46" rx="5" fill="#294f67"/>'+tx(342,85,"Sysmex pocH-100i",20,"#fff",850)+
   tx(342,127,first?"MAIN MENU":"SHUTDOWN",19,"#315e76",850)+
   (first?row(149,"QC",false)+row(203,"Shutdown",true):row(153,"Cancel",false)+row(211,"Execute",true))+
   tx(342,331,first?"SELECT SHUTDOWN":"CONFIRM EXECUTE",15,"#248981",850),
   first?"pocH main screen with Shutdown menu action highlighted":"pocH shutdown screen with Execute confirmation action highlighted");
 }
 const mrn=mode==="mrn",start=mode==="run";
 // Schematic matched to the pocH-100i main-screen control arrangement in the IFU:
 // Sample ID at left, WB/PD analysis mode, RUN on right, QC/Result/Shutdown below.
 const border='<rect x="55" y="28" width="571" height="290" rx="27" fill="#e5edf1" stroke="#a0b7c3" stroke-width="6"/>'+
 '<rect x="73" y="48" width="534" height="248" rx="10" fill="#ebf5fa" stroke="#91acb9" stroke-width="3"/>';
 const top='<rect x="77" y="52" width="526" height="41" rx="6" fill="#d1ebf7"/>'+
 tx(89,78,"sysmex",18,"#159bb0",900,"start")+
 '<rect x="195" y="55" width="116" height="28" rx="5" fill="#e5a6c6"/>'+tx(252,74,"Ready",15,"#6f315c",850)+
 tx(354,76,"[ Main ]",16,"#506e88",850)+
 '<rect x="509" y="55" width="86" height="30" rx="5" fill="#c2d7e7" stroke="#98b2c4" stroke-width="2"/>'+tx(552,76,"Menu",15,"#365c78",850);
 const left=tx(100,119,"Sample ID",17,"#466e82",850,"start")+
 '<rect x="103" y="127" width="206" height="39" rx="5" fill="#fdfefe" stroke="'+(mrn?"#13978e":"#8baabb")+'" stroke-width="'+(mrn?4:2)+'"/>'+
 tx(292,153,"#####",19,"#3d6582",850,"end")+
 tx(100,187,"Analysis Mode",14,"#53778c",750,"start")+
 '<rect x="103" y="193" width="96" height="42" rx="6" fill="#f6dce1" stroke="#b57c8e" stroke-width="2"/>'+tx(152,220,"WB",19,"#8d4f60",850)+
 '<rect x="208" y="193" width="96" height="42" rx="6" fill="#f8fbfc" stroke="#aac4d0" stroke-width="2"/>'+tx(255,220,"PD",19,"#54758a",850);
 const right=tx(339,124,"Set a mixed sample",16,"#4b6c7d",700,"start")+
 tx(339,146,"and press [RUN].",16,"#4b6c7d",700,"start")+
 '<rect x="372" y="165" width="173" height="77" rx="13" fill="'+(start?"#168e83":"#c0f0ef")+'" stroke="'+(start?"#097c72":"#56aeb4")+'" stroke-width="'+(start?5:3)+'"/>'+
 tx(457,214,"RUN",27,start?"#fff":"#326d75",900);
 const bottom='<rect x="94" y="254" width="112" height="30" rx="6" fill="#b6d5ed" stroke="#9ab4c6"/>'+tx(150,274,"QC",14,"#365b70",850)+
 '<rect x="215" y="254" width="119" height="30" rx="6" fill="#b6d5ed" stroke="#9ab4c6"/>'+tx(274,274,"Result",14,"#365b70",850)+
 '<rect x="465" y="254" width="126" height="30" rx="6" fill="#b6d5ed" stroke="#9ab4c6"/>'+tx(528,274,"Shutdown",13,"#365b70",850);
 const callout=(mrn||start)?'<path d="M290 169L324 304L410 327" stroke="#178a83" stroke-width="3.5" fill="none" stroke-linejoin="round"/>'+
 '<circle cx="290" cy="169" r="6" fill="#188e84"/>'+
 tx(415,339,"Verify MRN matches tube",15,"#187f77",850,"start"):'';
 return svg(border+top+left+right+bottom+callout,
 "Sysmex pocH-100i main screen with Sample ID entered as number signs, WB whole-blood mode, and "+(start?"the RUN control highlighted":"Sample ID entry highlighted")+"; verify patient identity outside the screen");

}
function analyzer(){
 const patient=tube(414,123);
 return svg(
 '<ellipse cx="326" cy="330" rx="225" ry="12" fill="#dce7ed"/>'+
 '<path d="M155 29H460L490 59V317H163L144 290V56Z" fill="#e8eff2" stroke="#8da4b0" stroke-width="5"/>'+
 '<path d="M460 29L490 59V315L462 316Z" fill="#bfcdd4"/>'+
 '<rect x="168" y="55" width="283" height="153" rx="12" fill="#adbec9" stroke="#7894a4" stroke-width="4"/>'+
 '<rect x="183" y="70" width="251" height="119" rx="6" fill="#f2fafc"/>'+
 '<rect x="183" y="70" width="251" height="33" rx="5" fill="#2e566c"/>'+
 tx(304,92,"pocH-100i",19,"#fff",850)+
 tx(302,128,"PATIENT SAMPLE",17,"#306e7d",850)+
 '<rect x="215" y="141" width="179" height="33" rx="6" fill="#e1f6f0" stroke="#66bcb0"/>'+
 tx(304,162,"ID VERIFIED",13,"#167e76",850)+
 '<rect x="338" y="226" width="129" height="94" rx="15" fill="#293e4b" stroke="#90aaba" stroke-width="5"/>'+
 '<rect x="365" y="245" width="75" height="59" rx="10" fill="#465968"/>'+
 '<ellipse cx="404" cy="277" rx="36" ry="20" fill="#a7adb4" stroke="#d8e0e4" stroke-width="5"/>'+
 '<ellipse cx="404" cy="277" rx="26" ry="14" fill="#eff4f6"/>'+
 '<g transform="translate(385 203) scale(.41)">'+
 tube(0,0)+'</g>'+
 '<path d="M463 263L558 222H624" stroke="#208b87" stroke-width="4" fill="none"/>'+
 tx(625,212,"PATIENT",14,"#207c80",900,"end")+tx(625,234,"GRAY BASE",13,"#527788",800,"end")+
 tx(302,347,"CLOSED CAP · EDTA SAMPLE · GRAY BASE",15,"#327689",850),
 'pocH-100i analyzer with lavender top patient EDTA tube inserted upright with the cap closed in gray patient sample base');
}
function completedAnalyzer(){
 // Rounded off-white cabinet, recessed main touchscreen and purple sample-door housing.
 // Diagram shows "analysis started" as a workflow confirmation, not a fabricated result.
 const body='<ellipse cx="314" cy="333" rx="229" ry="13" fill="#dce8ed"/>'+
 '<path d="M142 58Q143 26 179 24H444Q474 24 493 52L515 78V288Q515 321 481 323H176Q142 321 138 288Z" fill="#e7edf0" stroke="#96afba" stroke-width="5"/>'+
 '<path d="M443 27Q476 24 496 59L515 79V288Q515 309 492 319L474 326V72Z" fill="#bdcad1" stroke="#98abb6" stroke-width="3"/>'+
 '<path d="M163 64Q163 53 176 51H426Q439 51 439 64V198Q439 211 427 211H178Q163 211 163 198Z" fill="#a8c0ce" stroke="#829daa" stroke-width="4"/>'+
 '<rect x="176" y="64" width="249" height="133" rx="8" fill="#e9f6fb"/>'+
 '<rect x="183" y="70" width="235" height="30" rx="4" fill="#b9dbeb"/>'+
 tx(191,92,"sysmex",16,"#2092b1",900,"start")+tx(362,92,"[ Main ]",13,"#446b80",850)+
 tx(300,128,"Analyzing sample",18,"#365e71",850)+
 '<rect x="207" y="146" width="178" height="22" rx="9" fill="#d3e9ec" stroke="#b4d5da"/>'+
 '<rect x="207" y="146" width="116" height="22" rx="9" fill="#23998a"/>'+
 '<path d="M364 216H471Q488 216 488 235V304Q488 322 472 322H370Q351 322 351 304V233Q351 216 364 216Z" fill="#66417d" stroke="#4e4065" stroke-width="5"/>'+
 '<path d="M371 241H469V293Q466 307 454 308H385Q373 307 371 292Z" fill="#302e3b"/>'+
 '<rect x="382" y="233" width="74" height="18" rx="5" fill="#906eaa"/>'+
 tx(222,257,"pocH-100i",20,"#536b79",850)+
 '<circle cx="565" cy="133" r="54" fill="#e2f4ed" stroke="#5db69d" stroke-width="5"/>'+
 '<path d="M537 134L557 153L593 112" stroke="#198c65" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'+
 tx(570,209,"RUN STARTED",17,"#187b6d",900);
 return svg(body,"Rounded white Sysmex pocH-100i analyzer with a purple front sample holder, running-status display, and green confirmation checkmark");
}

function sideSwitch(){
 return svg(
 '<ellipse cx="304" cy="327" rx="235" ry="12" fill="#dce8ec"/>'+
 '<path d="M122 46H431L472 76V305L431 316H122L98 287V74Z" fill="#e8edf0" stroke="#91a9b6" stroke-width="5"/>'+
 '<path d="M431 46L472 76V305L431 316Z" fill="#b8c9d1" stroke="#879daa" stroke-width="4"/>'+
 '<rect x="128" y="75" width="273" height="156" rx="14" fill="#bacad3" stroke="#93aeba" stroke-width="4"/>'+
 '<rect x="141" y="90" width="246" height="127" rx="7" fill="#e9f5f8"/>'+
 tx(262,130,"SHUTDOWN COMPLETE",17,"#436b7a",850)+
 tx(262,164,"Safe to power off",14,"#567b8a",700)+
 '<rect x="432" y="165" width="36" height="58" rx="5" fill="#29323a" stroke="#101c27" stroke-width="4"/>'+
 '<rect x="441" y="173" width="18" height="43" rx="3" fill="#101b23"/>'+
 '<path d="M443 202L457 196" stroke="#f0f4f5" stroke-width="3"/>'+
 '<path d="M473 189L546 155H622" stroke="#22908b" stroke-width="4" fill="none"/>'+
 tx(621,146,"BLACK POWER",17,"#247b80",900,"end")+
 tx(621,169,"SWITCH · OFF",16,"#247b80",900,"end")+
 '<circle cx="451" cy="194" r="37" fill="none" stroke="#24948c" stroke-width="4" stroke-dasharray="8 6"/>'+
 tx(272,350,"RIGHT SIDE OF ANALYZER",14,"#527a89",850),
 'After shutdown completes switch off the physical black rocker power switch on the right side of the pocH-100i analyzer');
}
function shutdown(){
 return '<section class="lc-poc-shutdown" aria-label="pocH shutdown sequence">'+
 '<div class="lc-poc-shutdown-grid">'+
 figure('01 · Select Shutdown',screen("shutdown"),'On the main menu choose Shutdown.')+
 figure('02 · Confirm Execute',screen("execute"),'Select Execute and let the cleaning shutdown finish.')+
 figure('03 · Physical power switch',sideSwitch(),'Only after completion, turn the black switch on the right side OFF.')+
 '</div></section>';
}
function patient(title){
 const t=String(title||"").toLowerCase();
 if(/8 hours|refrigerat|stored at room/.test(t))return figure('Sample timing · EDTA whole blood',timing(),'Room temperature: within 8 hours. Refrigerated: within 24 hours, then allow to return to room temperature.');
 if(/invert/.test(t))return figure('Gently invert the lavender tube',invert(),'Invert the capped tube a few times to mix EDTA whole blood. Do not substitute a static tube picture.');
 if(/patient mrn|enter.*mrn|sample id/.test(t))return figure('Enter patient MRN on the analyzer',screen('mrn'),'Choose Sample ID, enter the correct MRN and confirm with Ent. Verify it matches the patient tube.');
 if(/load the sample|gray base/.test(t))return figure('Place patient tube in gray sample base',analyzer(),'Keep tube cap closed. Use the gray patient adapter, not the green QC adapter.');
 if(/confirm analysis|analysis started|run in progress|verify run/.test(t))
  return figure('Analysis started · pocH-100i',completedAnalyzer(),'Confirm the analyzer has entered its running state with the correct patient ID. The check indicates the run started, not that results or QC were accepted.');
  if(/click run|start run/.test(t))return figure('Press Run on the analyzer',screen('run'),'Confirm the patient identity and select Run. The highlighted control is illustrative.');
 return "";
}
function render(title,group){
 const g=String(group||"").toLowerCase(),t=String(title||"").toLowerCase();
 if(/running.samples|patient.testing/.test(g)&&!/qc|control/.test(g))return patient(title);
 if(/daily.qc/.test(g)&&/perform daily shutdown|daily shutdown before qc/.test(t))return shutdown();
 if(/cleaning|maintenance/.test(g)&&/performing daily shutdown/.test(t))return shutdown();
 return "";
}
window.LAB_SYSMEX_FOCUSED={render,patient,shutdown,screen,sideSwitch,completedAnalyzer};
})();