/* Actual Lab Central art adjustments: upright PATHFAST rack, correct-looking
   Triage electronic QC vs single-use patient cassette. */
(function(){
"use strict";
const art=window.LAB_EQUIPMENT_ART;if(!art)return;
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'"&quot;');
const svg=(drawing,view,desc)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" role="img" aria-label="'+E(desc)+'">'+drawing+'</svg>';
function uprightRack(mode,filled){
 const cal=mode==="cal",names=cal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:["1","2","3","4","5","6"];
 const colors=["#83b3d4","#83b3d4","#ad9bcf","#ad9bcf","#e0b45e","#84c9af"];
 let h='<rect x="40" y="30" width="900" height="450" rx="23" fill="#e8f8fb" fill-opacity=".56" stroke="#a4c7d6" stroke-width="5"/>'+
 '<rect x="61" y="47" width="858" height="414" rx="13" fill="#f7fcfd" stroke="#c3dce6" stroke-width="3"/>';
 const active=mode==="setup"?0:cal?6:2;
 for(let i=0;i<6;i++){
   const x=87+i*138,has=i<active,c=colors[i];
   h+='<rect x="'+x+'" y="66" width="117" height="377" rx="11" fill="#d5e3ea" stroke="#8da9b8" stroke-width="3"/>'+
   '<rect x="'+(x+9)+'" y="75" width="99" height="359" rx="7" fill="#fff" stroke="#b0c8d2" stroke-width="2"/>'+
   '<rect x="'+(x+32)+'" y="48" width="55" height="26" rx="8" fill="'+(has?c:"#dceaf0")+'" stroke="#a6c2d1" stroke-width="2"/>'+
   '<text x="'+(x+59)+'" y="66" text-anchor="middle" font-size="15" font-weight="900" font-family="Arial,sans-serif" fill="#315c74">'+(i+1)+'</text>';
   if(has){
     h+='<rect x="'+(x+19)+'" y="86" width="79" height="332" rx="6" fill="#182530" stroke="#708491" stroke-width="2"/>'+
     '<rect x="'+(x+21)+'" y="89" width="75" height="19" rx="3" fill="#db5755"/>'+
     '<text x="'+(x+58)+'" y="102" text-anchor="middle" font-size="11" fill="#fff" font-weight="850" font-family="Arial,sans-serif">PATHFAST</text>'+
     '<rect x="'+(x+27)+'" y="119" width="63" height="165" rx="3" fill="#202c37" stroke="#556873"/>'+
     Array.from({length:12},(_,j)=>'<path d="M'+(x+31+j*4.5)+' 123v157" stroke="#77838a" stroke-width="'+(j%3===0?2.3:1.1)+'" opacity=".8"/>').join('')+
     '<circle cx="'+(x+59)+'" cy="307" r="17" fill="#12212c" stroke="#748f9f" stroke-width="3"/>'+
     '<circle cx="'+(x+59)+'" cy="307" r="8" fill="#203849"/>'+
     '<rect x="'+(x+30)+'" y="341" width="59" height="66" rx="8" fill="#dceff6" stroke="#87acbd" stroke-width="3"/>'+
     '<path d="M'+(x+36)+' 374H'+(x+83)+'V392Q'+(x+59)+' 415 '+(x+36)+' 392Z" fill="'+(filled?cal?c:"#b94857":"#edf7fb")+'" stroke="'+(filled?c:"#bad1dd")+'" stroke-width="2"/>'+
     '<path d="M'+(x+38)+' 375H'+(x+81)+'" stroke="#79adb9" stroke-width="2" stroke-dasharray="4 3"/>';
   }
   h+='<text x="'+(x+58)+'" y="457" text-anchor="middle" font-size="'+(cal?14:12)+'" font-weight="850" fill="#3e7185" font-family="Arial,sans-serif">'+E(names[i])+'</text>';
 }
 return svg(h,'0 0 980 500',cal?
 'Upright six-lane PATHFAST metal rack with clear base: lanes one and two CAL 1, lanes three and four CAL 2, lane five QC 1 and lane six QC 2. Verify analyzer lane assignments':
 'Straight vertical six-channel PATHFAST rack, with two black cartridges in lanes one and two, clear sample wells at lower ends');
}
function combinedRack(mode){
 let h='<rect x="20" y="20" width="940" height="486" rx="20" fill="#f6fbfd" stroke="#d0e2e9" stroke-width="3"/>';
 h+='<text x="246" y="58" text-anchor="middle" font-weight="850" font-size="20" fill="#337388" font-family="Arial">UPRIGHT CARTRIDGES</text>'+
 '<text x="614" y="58" text-anchor="middle" font-weight="850" font-size="20" fill="#337388" font-family="Arial">WASTE TIP BOX</text>'+
 '<text x="828" y="58" text-anchor="middle" font-weight="850" font-size="20" fill="#337388" font-family="Arial">NEW TIPS</text>';
 const cal=mode==="cal",active=cal?6:2;
 for(let i=0;i<6;i++){
  const x=86+i*61,has=i<active;
  h+='<rect x="'+x+'" y="106" width="52" height="322" rx="7" fill="#d7e6ed" stroke="#9db5c1" stroke-width="2"/>'+
   '<rect x="'+(x+6)+'" y="115" width="40" height="300" rx="3" fill="'+(has?"#18252f":"#f4f9fa")+'" stroke="#b4c9d3"/>'+
   (has?'<rect x="'+(x+8)+'" y="118" width="36" height="22" fill="#d84c51"/>'+
    '<rect x="'+(x+13)+'" y="348" width="26" height="55" rx="6" fill="#e2eff5" stroke="#8db4c2"/>'+
    '<path d="M'+(x+17)+' 374h18v24h-18Z" fill="'+(cal?"#99bbce":"#b94857")+'"/>':'')+
   '<text x="'+(x+26)+'" y="449" text-anchor="middle" font-size="15" fill="#377084" font-weight="800" font-family="Arial">'+(i+1)+'</text>';
 }
 h+='<rect x="529" y="182" width="165" height="224" rx="20" fill="#e5eef3" stroke="#9fb6c4" stroke-width="5"/>'+
 '<rect x="546" y="215" width="131" height="158" rx="10" fill="#fff" stroke="#d4e2e8"/>'+
 '<text x="612" y="281" text-anchor="middle" font-size="18" font-family="Arial" font-weight="850" fill="#416d85">WASTE</text>'+
 '<text x="612" y="310" text-anchor="middle" font-size="18" font-family="Arial" font-weight="850" fill="#416d85">TIP BOX</text>'+
 '<rect x="745" y="184" width="187" height="224" rx="15" fill="#e0ecf1" stroke="#a2bcc9" stroke-width="4"/>';
 for(let i=0;i<6;i++){
  const x=764+i*28,used=i<active;
  h+='<ellipse cx="'+x+'" cy="363" rx="10" ry="6" fill="#9fb6c2"/>'+
    (used?'<rect x="'+(x-7)+'" y="236" width="15" height="130" rx="5" fill="#ebf8fb" stroke="#91b4c3" stroke-width="2"/>'+
    '<path d="M'+(x-6)+' 361l6 20 6-20Z" fill="#afcedc"/>':'')+
    '<text x="'+x+'" y="401" text-anchor="middle" font-size="12" fill="#4c7890" font-family="Arial">'+(i+1)+'</text>';
 }
 return svg(h,'0 0 980 520','PATHFAST complete physical arrangement: upright cartridge rack on left, centered waste-tip box and new tips in corresponding active positions on right');
}
const base=art.pathfastActionVisual;
art.pathfastActionVisual=function(stage,mode){
 if(['base','rack-empty','rack','assembled'].includes(stage)){
  let label=stage==="base"?"EMPTY UPRIGHT METAL RACK · SIX LANES":stage==="assembled"?"COMPLETE SETUP · RACK / WASTE BOX / TIPS":stage==="rack-empty"?"CARTRIDGES SEATED · EMPTY SAMPLE WELLS":"CARTRIDGES VERTICAL · MATERIALS SEATED";
  let visual=stage==="assembled"?combinedRack(mode):uprightRack(stage==="base"?"setup":mode,stage==="rack");
  return '<figure class="pf-action-figure pf-upright-rack"><div class="pf-action-heading">'+label+'</div><div class="pf-action-image">'+visual+'</div><figcaption>'+(
    stage==="assembled"?"The central waste-tip box is between the upright cartridge rack and the new tips. Match occupied lanes and review the actual instrument before START.":
    stage==="base"?"The metal six-lane rack is seated in its clear loading base. Keep channels straight; match the numbered positions.":
    stage==="rack-empty"?"Seat the cartridges securely. Do not add material until the correct front wells and lane assignments are confirmed.":
    "Illustrated assay placement, not a substitute for the actual CAL/QC lane assignment screen.")+'</figcaption></figure>';
 }
 return base(stage,mode);
};
function triageQC(){
 let h='<ellipse cx="307" cy="459" rx="165" ry="11" fill="#dfebf0"/>'+
 '<rect x="180" y="35" width="170" height="390" rx="45" fill="#fbfcfd" stroke="#a2b0b9" stroke-width="5"/>'+
 '<rect x="195" y="62" width="140" height="334" rx="28" fill="#f8fafa" stroke="#e3e8ec" stroke-width="2"/>'+
 '<rect x="228" y="80" width="20" height="221" rx="8" fill="#e4eaed" stroke="#bfc9ce" stroke-width="2"/>'+
 '<path d="M238 98V285" stroke="#9ea7ad" stroke-width="4"/>'+
 '<rect x="264" y="116" width="44" height="171" rx="12" fill="#b42b67"/>'+
 '<text x="295" y="245" transform="rotate(-90 295 245)" font-size="21" font-family="Arial" font-weight="850" fill="#fff">TRIAGE QC DEVICE</text>'+
 '<text x="264" y="334" text-anchor="middle" font-size="19" font-family="Arial" font-weight="900" fill="#292b30">DO NOT</text>'+
 '<text x="264" y="355" text-anchor="middle" font-size="19" font-family="Arial" font-weight="900" fill="#292b30">DISCARD</text>'+
 '<rect x="397" y="228" width="80" height="113" rx="7" fill="#27373d" stroke="#6d8692" stroke-width="3"/>'+
 '<rect x="402" y="265" width="69" height="66" rx="3" fill="#42a67e"/>'+
 Array.from({length:6},(_,i)=>'<path d="M'+(409+i*10)+' 291v30" stroke="#dfc968" stroke-width="5"/>').join('')+
 '<text x="435" y="365" text-anchor="middle" font-family="Arial" font-size="15" fill="#386e82" font-weight="850">QC CODE CHIP</text>'+
 '<text x="260" y="453" text-anchor="middle" font-family="Arial" font-size="18" fill="#8e3a64" font-weight="850">REUSABLE · NO SAMPLE PORT</text>';
 return svg(h,'0 0 650 495','White reusable Quidel Triage electronic QC Device with central translucent stripe, magenta QC DEVICE marking, do not discard label and separate green/gold CODE CHIP. No sample port.');
}
function triagePatient(loaded){
 let h='<ellipse cx="310" cy="463" rx="153" ry="11" fill="#dce6ed"/>'+
 '<rect x="184" y="25" width="243" height="422" rx="58" fill="#fbfcfd" stroke="#b2bcc1" stroke-width="5"/>'+
 '<rect x="201" y="52" width="210" height="364" rx="40" fill="#fff"/>'+
 '<path d="M249 151L304 67L358 151H326V310H281V151Z" fill="#a20b5c"/>'+
 '<rect x="297" y="88" width="26" height="220" rx="10" fill="#e0e7eb" stroke="#afbfc6" stroke-width="2"/>'+
 '<text x="259" y="300" transform="rotate(-90 259 300)" fill="#fff" font-family="Arial" font-size="24" font-weight="850">BNP</text>'+
 '<text x="305" y="336" font-family="Arial" text-anchor="middle" font-size="19" font-weight="850" fill="#a81864">TRIAGE</text>'+
 '<path d="M211 349H398" stroke="#2e8c7b" stroke-width="5"/>'+
 '<path d="M256 393Q304 368 350 393Q334 432 303 428Q274 427 256 393Z" fill="'+(loaded?"#bb5466":"#e4ecef")+'" stroke="#b0236c" stroke-width="7"/>'+
 '<path d="M268 395Q303 383 336 395" stroke="#fff" stroke-opacity=".65" stroke-width="4" fill="none"/>'+
 '<path d="M352 404L471 392H531" stroke="#168996" stroke-width="3" fill="none"/>'+
 '<text x="531" y="384" text-anchor="end" fill="#237788" font-family="Arial" font-size="16" font-weight="850">SAMPLE PORT</text>'+
 (loaded?'<path d="M473 342Q457 366 472 375Q486 366 473 342Z" fill="#b34155"/>':'');
 return svg(h,'0 0 650 500',loaded?"Triage BNP patient test device with sample applied into oval lower sample port":"Triage BNP single-use assay device with prominent vertical magenta BNP arrow and oval sample well at the lower end");
}
const orig=art.workflowVisual;
art.workflowVisual=function(sec,title,group){
 if(sec&&sec.id==='triage'){
  const t=String(title||'').toLowerCase(),g=String(group||'').toLowerCase();
  const daily=/daily.?qc/.test(g);
  if((daily||/qc device/.test(t))&&/qc device|insert|cassette|device/.test(t)){
   return '<figure class="lab-step-scene lab-triage-new"><div class="lab-step-scene-media">'+triageQC()+
    '</div><figcaption><strong>Daily electronic QC Device</strong><span>Reusable, stored with its CODE CHIP. There is NO sample port. Never add liquid to this electronic device.</span></figcaption></figure>';
  }
  if(/grab|test kit|sample cassette|load sample|dispense|pipett|apply/.test(t)){
   return '<figure class="lab-step-scene lab-triage-new"><div class="lab-step-scene-media">'+triagePatient(/pipett|apply|dispens/.test(t))+
    '</div><figcaption><strong>Single-use assay device</strong><span>The patient test cassette has an oval sample well near its lower end. Use only the approved assay-specific pipette and sample volume.</span></figcaption></figure>';
  }
 }
 return orig(sec,title,group);
};
art.triageReference=function(daily,loaded){return daily?triageQC():triagePatient(!!loaded);};
})();
