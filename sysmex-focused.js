/* Focused, task-matched pocH-100i visual references.
   Patient testing uses patient EDTA specimens, never EIGHTCHECK control vials.
   Analyzer controls are illustrated as schematic navigation, not pixel-exact screenshots. */
(function(){
"use strict";
const esc=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'"&quot;');
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
 const mrn=mode==="mrn",start=mode==="run";
 const lines=
 '<rect x="97" y="79" width="482" height="218" rx="9" fill="#f6fbfc" stroke="#a5bcc8" stroke-width="2"/>'+
 '<rect x="99" y="81" width="478" height="47" fill="#2b536c"/>'+tx(127,110,"Sysmex pocH-100i",17,"#fff",850,"start")+
 tx(524,110,"PATIENT",12,"#d6ecef",850,"end")+
 '<rect x="120" y="144" width="435" height="38" rx="6" fill="#e6eff3" stroke="#c5d9e2"/>'+
 tx(134,168,"Sample ID / MRN",14,"#345f73",800,"start")+
 '<rect x="120" y="190" width="435" height="46" rx="7" fill="'+(mrn?"#e2f6f1":"#ffffff")+'" stroke="'+(mrn?"#188e83":"#c3d9e2")+'" stroke-width="'+(mrn?3:2)+'"/>'+
 tx(138,219,mrn?"Tap field, then enter MRN":"Verify patient ID matches tube",16,"#426d7d",750,"start")+
 '<rect x="123" y="247" width="152" height="33" rx="7" fill="'+(mrn?"#188b80":"#e7f1f5")+'" stroke="'+(mrn?"#188b80":"#c5dbe3")+'"/>'+
 tx(199,269,"Ent / Confirm",13,mrn?"#fff":"#5e7e8d",850)+
 '<rect x="404" y="245" width="151" height="37" rx="7" fill="'+(start?"#178f83":"#eaf1f5")+'" stroke="'+(start?"#12786f":"#c4d7e0")+'" stroke-width="'+(start?3:1.5)+'"/>'+
 tx(479,269,"RUN",17,start?"#fff":"#547484",900)+
 (mrn?'<path d="M444 320L430 289" stroke="#168c82" stroke-width="4"/>'+tx(451,334,"MRN confirmed",14,"#16877a",850):'');
 return svg('<rect x="54" y="26" width="566" height="296" rx="21" fill="#e6eef2" stroke="#95adba" stroke-width="5"/>'+lines,
 mrn?"Schematic pocH-100i patient screen with sample ID MRN field and Enter button highlighted":"Schematic pocH-100i patient screen with RUN button highlighted");
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
window.LAB_SYSMEX_FOCUSED={render,patient,shutdown,screen,sideSwitch};
})();