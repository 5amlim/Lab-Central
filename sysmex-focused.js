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
 return window.LAB_EQUIPMENT_ART?.sysmexDeviceSvg
  ? window.LAB_EQUIPMENT_ART.sysmexDeviceSvg("patient",true)
  : "";
}
function completedAnalyzer(){
 const art=window.LAB_EQUIPMENT_ART;
 if(!art?.sysmexDeviceMarkup)return "";
 const check='<circle cx="731" cy="164" r="45" fill="#e4f5ed" stroke="#59b69a" stroke-width="4"/>'+
 '<path d="M707 164l16 16 30-36" fill="none" stroke="#188d69" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'+
 tx(730,229,"RUN STARTED",17,"#187b6d",900)+
 tx(730,252,"Run initiation only",12,"#54798a",750);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 0 750 465" role="img" aria-label="Reference-based pocH-100i CBC analyzer with an analyzing screen and a checkmark indicating only that the run started">'+
 art.sysmexDeviceMarkup("running",true)+check+'</svg>';
}
function sideSwitch(){
 const art=window.LAB_EQUIPMENT_ART;
 if(!art?.sysmexDeviceMarkup)return "";
 // Switch is visible in a simplified three-quarter illustration; keep the
 // same faceplate, screen and purple sample bay as every other pocH view.
 const callout='<circle cx="428" cy="161" r="36" fill="none" stroke="#168e88" stroke-width="3.5" stroke-dasharray="7 5"/>'+
 '<path d="M465 151l96-51h128" fill="none" stroke="#208f87" stroke-width="3.5"/>'+
 tx(693,77,"BLACK POWER",17,"#257d81",900,"end")+
 tx(693,98,"SWITCH · OFF",17,"#257d81",900,"end");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 0 680 465" role="img" aria-label="pocH-100i white cabinet and purple front bay with the physical black side power switch highlighted after shutdown completes">'+
 art.sysmexDeviceMarkup("switch",false)+callout+'</svg>';
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