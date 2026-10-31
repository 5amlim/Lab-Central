/* PATHFAST CAL/QC: 28-day reference, reagent material guide, and six-lane rack.
   Drawings are simplified and intentionally not to scale. */
(function(){
"use strict";
const lanes=[
 {name:"CAL 1",tone:"#e2f1fb",ink:"#226c97",well:"#a9d8fa"},
 {name:"CAL 1",tone:"#e2f1fb",ink:"#226c97",well:"#a9d8fa"},
 {name:"CAL 2",tone:"#eee9fa",ink:"#76569e",well:"#d1c3f3"},
 {name:"CAL 2",tone:"#eee9fa",ink:"#76569e",well:"#d1c3f3"},
 {name:"QC 1",tone:"#fff0d6",ink:"#a67324",well:"#f4d082"},
 {name:"QC 2",tone:"#e3f5ec",ink:"#19755e",well:"#a8e1c5"}
];
const groups=[
{id:"troponin",label:"hs-Troponin I",analytes:["hs-Troponin I"],qc:"Bio-Rad Liquichek Cardiac Markers Plus",catalog:"PF1261-KUS",vials:[["QC1 · LANE 5","CONTROL LEVEL 1","146","LEVEL 1"],["QC2 · LANE 6","CONTROL LEVEL 3","148","LEVEL 3"]]},
{id:"ntprobnp",label:"NT-proBNP",analytes:["NT-proBNP"],qc:"Bio-Rad Liquichek Cardiac Markers Plus",catalog:"PF1061-KUS",vials:[["QC1 · LANE 5","CONTROL LEVEL 1","146","LEVEL 1"],["QC2 · LANE 6","CONTROL LEVEL 3","148","LEVEL 3"]]},
{id:"ddimer",label:"D-dimer",analytes:["D-dimer"],qc:"Bio-Rad Liquichek D-dimer",catalog:"PF1051-KUS",vials:[["QC1 · LANE 5","LEVEL LOW","27100","LOW"],["QC2 · LANE 6","LEVEL 1","27101","LEVEL 1"]]}
];
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function defs(){return '<defs>'+
 '<linearGradient id="pfxmetal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f6fafc"/><stop offset=".5" stop-color="#bfcdd6"/><stop offset="1" stop-color="#eaf1f6"/></linearGradient>'+
 '<linearGradient id="pfxglass" x1="0" x2=".8" y1="0" y2="1"><stop stop-color="#e9f2f7" stop-opacity=".65"/><stop offset=".55" stop-color="#b9d1db" stop-opacity=".23"/><stop offset="1" stop-color="#a9c8d9" stop-opacity=".6"/></linearGradient>'+
 '<linearGradient id="pfxamber" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d8a16c"/><stop offset=".5" stop-color="#81502c"/><stop offset="1" stop-color="#b97e49"/></linearGradient>'+
 '</defs>';}
function laneSvg(item,i,filled=false){
 const x=31+i*145, cx=x+62;
 let codes='';
 for(let j=0;j<9;j++)codes+='<rect x="'+(x+36+j*5)+'" y="171" width="'+(j%3===0?3:1.5)+'" height="'+(j%2?19:24)+'" fill="#d0dbe2"/>';
 const sample=filled?
  '<rect x="'+(x+24)+'" y="276" width="76" height="45" rx="7" fill="'+item.well+'" stroke="'+item.ink+'" stroke-width="2.4"/>'+
  '<rect x="'+(x+30)+'" y="281" width="64" height="32" rx="5" fill="'+item.tone+'" opacity=".94"/>'+
  '<text x="'+cx+'" y="302" text-anchor="middle" font-weight="900" font-size="14" fill="'+item.ink+'">'+item.name+'</text>':
  '<rect x="'+(x+24)+'" y="276" width="76" height="45" rx="7" fill="#f6fbfe" stroke="#9ab6c6" stroke-width="2.4"/>'+
  '<rect x="'+(x+30)+'" y="281" width="64" height="32" rx="5" fill="#e8f2f6" stroke="#c8dce5" stroke-width="1"/>'+
  '<path d="M'+(x+34)+' 285 L'+(x+43)+' 285" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'+
  '<text x="'+cx+'" y="302" text-anchor="middle" font-weight="800" font-size="11" fill="#7190a2">EMPTY</text>';
 return '<g role="group" aria-label="Lane '+(i+1)+' '+item.name+', '+(filled?'matching calibrator or QC added':'sample well empty')+'">'+
 '<rect x="'+x+'" y="8" width="123" height="59" rx="10" fill="'+item.tone+'" stroke="'+item.ink+'" stroke-opacity=".35"/>'+
 '<text x="'+cx+'" y="31" text-anchor="middle" font-size="12" font-weight="850" fill="'+item.ink+'">LANE '+(i+1)+'</text>'+
 '<text x="'+cx+'" y="54" text-anchor="middle" font-size="18" font-weight="900" fill="'+item.ink+'">'+item.name+'</text>'+
 '<rect x="'+(x-2)+'" y="90" width="127" height="239" rx="10" fill="#c8d5dc" stroke="#9db2bf" stroke-width="2"/>'+
 '<rect x="'+(x+7)+'" y="100" width="110" height="220" rx="6" fill="url(#pfxmetal)" stroke="#fff"/>'+
 '<rect x="'+(x+21)+'" y="110" width="82" height="161" rx="6" fill="#1e2b36" stroke="#13212d"/>'+
 '<rect x="'+(x+21)+'" y="111" width="82" height="15" rx="3" fill="#d34b4a"/>'+
 '<rect x="'+(x+27)+'" y="132" width="70" height="25" rx="3" fill="#394853"/>'+
 '<text x="'+cx+'" y="149" text-anchor="middle" font-size="9.8" fill="#e5ebed" font-weight="800">PATHFAST</text>'+
 codes+
 '<circle cx="'+cx+'" cy="227" r="17" fill="#141e26" stroke="#899faa" stroke-width="3"/>'+
 '<circle cx="'+cx+'" cy="227" r="7" fill="#455765"/>'+
 sample+
 '</g>';
}
/* Small source-vial illustrations directly beneath their own sample wells.
   Two CAL 2 lane illustrations represent repeat transfers from ONE mixed vial. */
function laneSourceVial(item,i,group){
 const x=31+i*145,cx=x+62;
 const isCal1=i<2,isCal2=i>=2&&i<4,isQc=i>=4;
 const level=isQc?group?.vials?.[i-4]:null;
 const code=isQc?(level?.[2]||''):null;
 const dimer=group?.id==='ddimer';
 const cap=isQc?(i===4?(dimer?'#09a8ad':'#fafbfc'):'#292d34'):(isCal2?'#ccdbe7':'#e8f0f3');
 const short=isCal1?'CAL 1':isCal2?'CAL 2':'QC'+(i-3);
 const lower=isCal1?'LIQUID':isCal2?'MIXED':'Bio-Rad #'+code;
 const fill=isCal1?'#cce6f0':isCal2?'#b5a8df':'#8a5035';
 const labelTone=isCal1?'#257296':isCal2?'#6e589c':i===4?'#ad7924':'#16775c';
 const vial=isCal1?
  '<g>'+
   '<rect x="'+(cx-21)+'" y="425" width="42" height="86" rx="10" fill="#e2eef3" stroke="#91abb9" stroke-width="2.2"/>'+
   '<path d="M'+(cx-18)+' 474H'+(cx+18)+'V501Q'+cx+' 510 '+(cx-18)+' 501Z" fill="'+fill+'"/>'+
   '<path d="M'+(cx-13)+' 436V481" stroke="#fff" stroke-width="3" opacity=".8"/>'+
   '<rect x="'+(cx-15)+'" y="414" width="30" height="15" rx="4" fill="'+cap+'" stroke="#8ba5b6" stroke-width="2"/>'+
   '<path d="M'+(cx+8)+' 416L'+(cx+26)+' 407L'+(cx+34)+' 408" fill="none" stroke="#8ba5b6" stroke-width="5" stroke-linecap="round"/>'+
   '<rect x="'+(cx-19)+'" y="451" width="38" height="29" rx="4" fill="#fbfeff" stroke="#c8dce5"/>'+
   '<text x="'+cx+'" y="465" text-anchor="middle" font-size="10.5" font-weight="900" fill="'+labelTone+'">CAL 1</text>'+
   '<text x="'+cx+'" y="474" text-anchor="middle" font-size="7" fill="#72909f">LIQUID</text>'+
  '</g>':
  '<g>'+
   '<rect x="'+(cx-20)+'" y="424" width="40" height="86" rx="8" fill="'+(isCal2?'#e9f0f7':'#975e44')+'" stroke="'+(isCal2?'#92adb9':'#86523b')+'" stroke-width="2.2"/>'+
   (isCal2?'<path d="M'+(cx-16)+' 468H'+(cx+16)+'V503H'+(cx-16)+'Z" fill="'+fill+'" opacity=".9"/>':
   '<path d="M'+(cx-15)+' 482H'+(cx+15)+'V501Q'+cx+' 507 '+(cx-15)+' 501Z" fill="#673b2d" opacity=".85"/>')+
   '<path d="M'+(cx-13)+' 433V478" stroke="#fff" opacity=".5" stroke-width="2.2"/>'+
   '<rect x="'+(cx-22)+'" y="410" width="44" height="19" rx="5" fill="'+cap+'" stroke="#93a7b1" stroke-width="2"/>'+
   Array.from({length:6},(_,j)=>'<path d="M'+(cx-15+j*6)+' 413v13" stroke="'+(isQc&&i===5?'#62646c':'#c6d2d8')+'" stroke-width="1"/>').join('')+
   '<rect x="'+(cx-20)+'" y="449" width="40" height="33" rx="3" fill="#fafdff" stroke="#d8e4e9" stroke-width=".8"/>'+
   (isQc?'<rect x="'+(cx-20)+'" y="449" width="40" height="7" fill="'+labelTone+'"/>':'')+
   '<text x="'+cx+'" y="'+(isQc?468:464)+'" text-anchor="middle" font-size="'+(isQc?11:10.5)+'" font-weight="900" fill="'+labelTone+'">'+short+'</text>'+
   '<text x="'+cx+'" y="478" text-anchor="middle" font-size="7.4" font-weight="850" fill="#486c81">'+(isQc?'#'+esc(code):'MIXED')+'</text>'+
  '</g>';
 return '<g role="group" aria-label="Lane '+(i+1)+' source: '+(isCal1?'CAL 1 liquid':isCal2?'Same single reconstituted CAL 2 vial as the other CAL 2 lane':('Bio-Rad '+esc(level?.[1]||'QC')+' catalog '+esc(code)))+'">'+
  '<path d="M'+cx+' 400 V348" stroke="'+item.ink+'" stroke-width="2.4" stroke-dasharray="5 5" fill="none" opacity=".78"/>'+
  '<path d="M'+(cx-7)+' 357 L'+cx+' 348 L'+(cx+7)+' 357" stroke="'+item.ink+'" stroke-width="2.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+
  '<path d="M'+cx+' 367 C'+(cx-8)+' 377 '+(cx-9)+' 382 '+(cx-8)+' 387 Q'+cx+' 402 '+(cx+8)+' 387 C'+(cx+10)+' 381 '+(cx+6)+' 373 '+cx+' 367Z" fill="'+item.well+'" stroke="'+item.ink+'" stroke-width="2"/>'+
  '<path d="M'+(cx-3)+' 377q-4 6-1 11" stroke="#fff" stroke-width="2" opacity=".85" fill="none"/>'+
  vial+
  '<text x="'+cx+'" y="528" text-anchor="middle" fill="#42687e" font-weight="800" font-size="11">'+lower+'</text>'+
 '</g>';
}
function rack(filled=false,group=null,showVials=false){
 const vials=showVials?lanes.map((item,i)=>laneSourceVial(item,i,group)).join(''):'';
 const height=showVials?548:365;
 const label=showVials?'SOURCE VIALS BELOW · DROPLETS / ARROWS INDICATE TRANSFER INTO SAMPLE WELLS':filled?'FRONT · MATERIALS ADDED TO SAMPLE WELLS':'FRONT · SAMPLE WELLS EMPTY BEFORE DISPENSING';
 return '<div class="pf-rack-scroll" role="region" tabindex="0" aria-label="Six cartridge loading positions, horizontally scrollable">'+
 '<svg class="pf-rack-svg'+(showVials?' pf-rack-with-vials':'')+'" viewBox="0 0 940 '+height+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(filled?'PATHFAST six-lane rack after adding matching calibrators and QC materials':'PATHFAST six-lane rack with all six transparent sample wells empty')+(showVials?'; a matching source vial and upward droplet under each lane':'')+'">'+
 defs()+
 '<rect x="17" y="83" width="892" height="255" rx="17" fill="#dbe7ec" stroke="#9cabb6" stroke-width="4"/>'+
 '<rect x="25" y="92" width="876" height="235" rx="13" fill="#cfdae2" stroke="#f9fcfd" stroke-width="2"/>'+
 lanes.map((item,i)=>laneSvg(item,i,filled)).join('')+
 vials+
 '<text x="469" y="'+(showVials?545:358)+'" text-anchor="middle" fill="#698091" font-size="'+(showVials?11:11)+'" letter-spacing="'+(showVials?.7:1.5)+'" font-weight="850">'+label+'</text></svg></div>'+
 (showVials?'<p class="pf-rack-transfer-note"><strong>CAL 2 lanes 3 and 4:</strong> Both transfers use the <strong>same single reconstituted vial</strong>, not two separately mixed vials. The two vial icons represent the shared source for each cartridge well.</p>':'');
}
function svgCal1(){
 return '<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="CAL 1 liquid bottle with dispensing spout" xmlns="http://www.w3.org/2000/svg">'+defs()+
 '<ellipse cx="107" cy="133" rx="49" ry="7" fill="#d9e2e7"/>'+
 '<rect x="84" y="12" width="43" height="32" rx="6" fill="#f1f5f7" stroke="#9daeb7" stroke-width="2"/>'+
 '<path d="M95 12 L104 2 L117 2 L125 13" fill="#dae8ee" stroke="#9daeb7" stroke-width="2"/>'+
 '<path d="M118 5 L135 2" stroke="#698ba1" stroke-width="4" stroke-linecap="round"/>'+
 '<rect x="73" y="41" width="65" height="90" rx="13" fill="url(#pfxglass)" stroke="#91a7b4" stroke-width="2"/>'+
 '<rect x="77" y="65" width="57" height="49" rx="5" fill="#e3f0f7" stroke="#bfd0d9"/>'+
 '<text x="105" y="84" text-anchor="middle" fill="#1f698a" font-size="12" font-weight="900">CAL 1</text>'+
 '<text x="105" y="99" text-anchor="middle" fill="#688a9f" font-size="9">LIQUID</text></svg>';
}
function svgCal2(count=2){
 let body='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="'+(count===1?'One glass CAL 2 vial containing lyophilized powder':'Two glass CAL 2 vials containing lyophilized powder')+'" xmlns="http://www.w3.org/2000/svg">'+defs();
 for(let i=0;i<count;i++){const x=(count===1?84:38+i*92);body+='<g><ellipse cx="'+(x+30)+'" cy="134" rx="29" ry="5" fill="#dce4e8"/>'+
 '<rect x="'+(x+6)+'" y="13" width="47" height="23" rx="5" fill="#d6e3ec" stroke="#8ba4b4" stroke-width="2"/>'+
 '<rect x="'+(x+10)+'" y="36" width="39" height="92" rx="8" fill="url(#pfxglass)" stroke="#8da4b1" stroke-width="2"/>'+
 '<rect x="'+(x+13)+'" y="58" width="33" height="41" rx="3" fill="#f5f7f9" stroke="#b8cad4"/>'+
 '<text x="'+(x+30)+'" y="74" text-anchor="middle" font-size="10" fill="#745ba3" font-weight="900">CAL 2</text>'+
 '<path d="M'+(x+15)+' 113 Q'+(x+30)+' 104 '+(x+46)+' 113 L'+(x+46)+' 121 L'+(x+15)+' 121Z" fill="#e8dcf2" stroke="#b8aad1"/></g>'}
 return body+'</svg>';
}
function svgReconstitutedCal2(){
 return '<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="One reconstituted CAL 2 glass vial containing mixed calibrator ready for freezer storage" xmlns="http://www.w3.org/2000/svg">'+defs()+
 '<ellipse cx="105" cy="134" rx="37" ry="6" fill="#dce4e8"/>'+
 '<rect x="81" y="13" width="48" height="23" rx="5" fill="#d6e3ec" stroke="#8ba4b4" stroke-width="2"/>'+
 '<rect x="85" y="36" width="40" height="92" rx="8" fill="url(#pfxglass)" stroke="#8da4b1" stroke-width="2"/>'+
 '<rect x="90" y="77" width="30" height="46" rx="4" fill="#b9b4e5" stroke="#9692bf" stroke-width="1"/>'+
 '<rect x="89" y="54" width="32" height="26" rx="3" fill="#f5f8fc" stroke="#b8cad4"/>'+
 '<text x="105" y="68" text-anchor="middle" font-size="10" fill="#745ba3" font-weight="900">CAL 2</text>'+
 '<text x="105" y="76" text-anchor="middle" font-size="6" fill="#745ba3">MIXED</text></svg>';
}
function svgDiluent(count=2){
 let out='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="'+(count===1?'One blue liquid buffer diluent vial for CAL 2 reconstitution':'Two blue liquid buffer diluent vials for CAL 2 reconstitution')+'" xmlns="http://www.w3.org/2000/svg">'+defs();
 for(let i=0;i<count;i++){const x=(count===1?82:40+i*90);out+='<ellipse cx="'+(x+28)+'" cy="134" rx="27" ry="6" fill="#dce5eb"/>'+
 '<rect x="'+(x+6)+'" y="18" width="44" height="26" rx="5" fill="#438cc8" stroke="#286fa7" stroke-width="2"/>'+
 '<rect x="'+(x+10)+'" y="44" width="36" height="82" rx="7" fill="url(#pfxglass)" stroke="#90b3c8" stroke-width="2"/>'+
 '<rect x="'+(x+12)+'" y="76" width="32" height="45" rx="4" fill="#86c7ef" opacity=".78"/>'+
 '<rect x="'+(x+12)+'" y="55" width="32" height="28" rx="3" fill="#ecf8fc" stroke="#b5d8e9"/>'+
 '<text x="'+(x+28)+'" y="73" text-anchor="middle" font-size="8" font-weight="900" fill="#2877a9">DILUENT</text>';}
 return out+'</svg>';
}

function cal2MixIllustration(){
 function bottle(x,kind){
  const powder=kind==="powder",diluent=kind==="diluent";
  const label=powder?"CAL 2":diluent?"BLUE":"MIXED";
  return '<g transform="translate('+x+',35)">'+
    '<rect x="18" y="0" width="43" height="23" rx="5" fill="'+(diluent?"#3b98ca":"#dce3e9")+'" stroke="#94aab6" stroke-width="2"/>'+
    '<rect x="21" y="23" width="37" height="81" rx="7" fill="#e7eef3" stroke="#93afbc" stroke-width="2"/>'+
    (powder?'<path d="M26 94h27v7H26z" fill="#c7acd9"/>':
    '<rect x="26" y="'+(diluent?61:53)+'" width="27" height="'+(diluent?40:48)+'" rx="3" fill="'+(diluent?"#70c4e9":"#b6b7e3")+'"/>')+
    '<rect x="24" y="45" width="31" height="24" rx="2" fill="#fff" opacity=".95"/>'+
    '<text x="40" y="60" font-size="9" font-weight="900" text-anchor="middle" fill="#536b95">'+label+'</text></g>';
 }
 const pair=["ONE VIAL"].map((key,i)=>'<g transform="translate('+(i*445)+',0)">'+
  '<rect x="4" y="3" width="430" height="177" rx="12" fill="#f8fafc" stroke="#d0dfe8" stroke-width="2"/>'+
  '<rect x="4" y="3" width="430" height="30" rx="12" fill="#edf3fa"/>'+
  '<text x="18" y="23" font-size="14" font-weight="900" fill="#375774">CAL 2</text>'+
  '<text x="414" y="23" font-size="14" font-weight="900" text-anchor="end" fill="#765aa0">1 VIAL</text>'+
  bottle(25,"powder")+bottle(156,"diluent")+bottle(328,"mixed")+
  '<text x="137" y="101" font-size="29" text-anchor="middle" fill="#4b94b4" font-weight="800">+</text>'+
  '<text x="287" y="101" font-size="30" text-anchor="middle" fill="#4b94b4" font-weight="850">→</text>'+
  '<text x="65" y="164" font-size="11" font-weight="800" text-anchor="middle" fill="#6c6692">Powder</text>'+
  '<text x="195" y="164" font-size="11" font-weight="800" text-anchor="middle" fill="#267da6">Blue diluent</text>'+
  '<text x="368" y="157" font-size="11" font-weight="850" text-anchor="middle" fill="#546d98">Reconstituted</text>'+
  '<rect x="320" y="165" width="96" height="18" rx="8" fill="#ede7f9" stroke="#c5b3e1" stroke-width="1.3"/>'+
  '<text x="368" y="178" text-anchor="middle" font-size="10.8" font-weight="900" fill="#76519c">LANES 3 + 4</text></g>').join('');
 return '<figure class="pf-cal2-mix-diagram"><header><strong>CAL 2 reconstitution</strong><span class="pf-cal-one-vial">1 vial only · reserve the unopened second vial</span></header>'+
  '<svg role="img" aria-label="Reconstitute a single CAL 2 powder vial with one matching blue diluent for both duplicate CAL 2 calibration cartridges." xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445 190">'+pair+'</svg>'+
  '<figcaption><strong>One prepared vial supplies BOTH CAL 2 cartridges (lanes 3 and 4).</strong> Reconstitute only one CAL 2 powder vial with one matching diluent. After use, cap, label and promptly freeze remaining prepared material when allowed by the selected assay IFU. Keep the second powder and diluent unopened.</figcaption></figure>';
}
/* Foil-pouch packaging shown in the user reference photograph.
   Each single-use assay cartridge is individually protected in its own sealed pouch. */
/* One kit box contains six matching assay cartridges. Schematic packaging
   rather than six individually packaged pouches; the box opens to show contents. */
function cartridgePack(group){
 const label=esc(group.label);
 const printed=group.id==='troponin'?'hs-cTnI':group.id==='ntprobnp'?'NTproBNP':'D-dimer';
 const folds=Array.from({length:23},(_,i)=>{
   const x=256+i*13;
   return '<path d="M'+x+' 318l2 19" stroke="'+(i%3===0?'#b3bbc0':'#e4e8eb')+'" stroke-width="'+(i%3===0?2:1)+'" opacity=".72"/>';
 }).join('');
 const cartridgeWells=Array.from({length:7},(_,i)=>{
   const x=295+i*29;
   return '<rect x="'+x+'" y="112" width="18" height="39" rx="5" fill="'+(i%2?'#6b777c':'#818d91')+'" stroke="#a7b3ba" stroke-width="1.7" opacity=".74"/>';
 }).join('');
 const crimp=Array.from({length:26},(_,i)=>'<path d="M'+(260+i*10.4)+' 33v13" stroke="'+(i%3===0?'#777e83':'#505a60')+'" stroke-width="1.3"/>').join('');
 return '<figure class="pf-cartridge-pack pf-cartridge-pouch"><header><strong>PATHFAST reagent cartridge packaging</strong>'+
  '<span>1 WHOLE SMALL BOX · 6 CARTRIDGES · '+label+'</span></header>'+
  '<svg role="img" aria-label="Silver and black PATHFAST '+label+' foil pouch reference shown alongside a note: six cartridges, one whole small box." xmlns="http://www.w3.org/2000/svg" viewBox="0 0 790 360">'+
  '<defs>'+
   '<linearGradient id="pf-pouch-foil" x1="0" y1="0" x2=".9" y2=".14"><stop stop-color="#fdfefe"/><stop offset=".14" stop-color="#b3c0c8"/><stop offset=".34" stop-color="#f9fbfc"/><stop offset=".64" stop-color="#d1dbe1"/><stop offset=".82" stop-color="#f5f7f8"/><stop offset="1" stop-color="#adbcc5"/></linearGradient>'+
   '<linearGradient id="pf-pouch-dark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0b0f12"/><stop offset=".4" stop-color="#252c30"/><stop offset=".72" stop-color="#0a0c0e"/><stop offset="1" stop-color="#42494e"/></linearGradient>'+
   '<linearGradient id="pf-pouch-window" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#151e21"/><stop offset=".5" stop-color="#4d565a" stop-opacity=".9"/><stop offset="1" stop-color="#20272a"/></linearGradient>'+
  '</defs>'+
  '<ellipse cx="406" cy="347" rx="186" ry="11" fill="#c5d5df" opacity=".5"/>'+
  /* Pouch outer sealed silver body and uneven crimping. */
  '<path d="M257 19Q251 20 250 31L239 300Q235 329 252 337L551 339Q567 333 563 313L554 38Q551 19 540 17Z" fill="url(#pf-pouch-foil)" stroke="#83949e" stroke-width="2.7"/>'+
  '<path d="M251 25L547 23L551 53L247 54Z" fill="url(#pf-pouch-dark)" stroke="#3d484e" stroke-width="3"/>'+crimp+
  '<path d="M256 326L552 327" fill="none" stroke="#f9fcfe" stroke-width="3"/>'+folds+
  /* Actual black hinged top and long cassette visible behind translucent upper pouch. */
  '<path d="M267 42L543 40L537 154L265 157Z" fill="url(#pf-pouch-window)" stroke="#48565d" stroke-width="3"/>'+
  cartridgeWells+
  '<path d="M272 46H536V99Q532 109 525 113L289 113Q275 105 272 92Z" fill="url(#pf-pouch-dark)" stroke="#4e575b" stroke-width="2.6"/>'+
  '<path d="M290 57Q337 51 385 56H526" fill="none" stroke="#879198" stroke-opacity=".52" stroke-width="2"/>'+
  '<path d="M281 116L524 115" fill="none" stroke="#0b1317" stroke-width="9" opacity=".5"/>'+
  '<path d="M274 150L538 151L545 320L251 317Z" fill="#e7eef2" opacity=".87"/>'+
  '<path d="M270 153L280 306" stroke="#fff" stroke-width="9" opacity=".5"/>'+
  '<path d="M529 156L541 309" stroke="#b0bbc2" stroke-width="8" opacity=".45"/>'+
  /* The assay name is on a long dark label, like the supplied NTproBNP pouch. */
  '<rect x="289" y="181" width="236" height="36" rx="5" fill="#2e3438"/>'+
  '<text x="306" y="203" font-family="Arial,sans-serif" font-size="16" font-weight="900" letter-spacing="2.2" fill="#fff">PATHFAST</text>'+
  '<text x="507" y="203" text-anchor="end" font-family="Arial,sans-serif" font-size="15" font-weight="850" fill="#f3f6f8">'+esc(printed)+'</text>'+
  '<text x="406" y="245" text-anchor="middle" fill="#4e5963" font-size="12" font-weight="700">Keep this side up</text>'+
  '<rect x="287" y="257" width="239" height="46" rx="3" fill="#e7ebee" stroke="#6e808b" stroke-width="1.6"/>'+
  '<text x="300" y="275" font-size="12" font-weight="750" fill="#41515b">CARTRIDGE</text>'+
  '<path d="M289 282H521" stroke="#a1adb6" stroke-width="1"/>'+
  '<text x="300" y="296" font-size="11" fill="#5a6b76">VERIFY ASSAY / LOT / EXPIRATION</text>'+
  '<path d="M250 303L282 331" stroke="#fff" opacity=".53" stroke-width="5"/>'+
  /* Simple note next to the original illustration; one box, not six pouches. */
  '<rect x="584" y="106" width="177" height="157" rx="14" fill="#eff8fa" stroke="#bedbe5" stroke-width="2"/>'+
  '<text x="672" y="137" font-size="11" text-anchor="middle" letter-spacing="1.2" font-weight="900" fill="#42768b">KIT QUANTITY</text>'+
  '<text x="672" y="174" font-size="24" text-anchor="middle" font-weight="900" fill="#1d647d">SIX</text>'+
  '<text x="672" y="194" font-size="15" text-anchor="middle" font-weight="850" fill="#2d667f">CARTRIDGES</text>'+
  '<path d="M612 207H733" stroke="#bedbe5" stroke-width="2"/>'+
  '<text x="672" y="228" font-size="13" text-anchor="middle" font-weight="900" fill="#2d7382">ONE WHOLE</text>'+
  '<text x="672" y="247" font-size="13" text-anchor="middle" font-weight="900" fill="#2d7382">SMALL BOX</text>'+
  '<text x="408" y="354" text-anchor="middle" fill="#688497" font-size="10.5" font-weight="800">ILLUSTRATION OF ONE SEALED FOIL POUCH</text>'+
  '</svg>'+
  '<figcaption><strong>Six cartridges, one whole small box.</strong> The silver PATHFAST packaging illustration is restored from the previous reference. Retrieve one complete small box containing six matching '+label+' reagent cartridges for Calibration + QC. Confirm the assay label, lot, expiration and package integrity before use.</figcaption></figure>';
}
function svgQC(kind){
 const tint=kind==="cardiac"?"#ae3d49":"#855a9b",label=kind==="cardiac"?"CARDIAC":"D-DIMER";
 let out='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="Two Bio-Rad '+label+' control vials, quality control materials with assay-specific level choices" xmlns="http://www.w3.org/2000/svg">'+defs();
 for(let i=0;i<2;i++){let x=36+i*91;out+='<ellipse cx="'+(x+30)+'" cy="134" rx="28" ry="5" fill="#d6dfe7"/>'+
 '<rect x="'+(x+7)+'" y="11" width="46" height="31" rx="7" fill="'+(i?"#eef1f4":"#dce4e8")+'" stroke="#8d9fa9" stroke-width="2"/>'+
 '<rect x="'+(x+10)+'" y="41" width="40" height="85" rx="7" fill="url(#pfxamber)" stroke="#805d45" stroke-width="2"/>'+
 '<rect x="'+(x+13)+'" y="67" width="34" height="41" rx="3" fill="#f9f6f3"/>'+
 '<rect x="'+(x+13)+'" y="67" width="34" height="9" rx="2" fill="'+tint+'"/>'+
 '<text x="'+(x+30)+'" y="85" font-size="7" font-weight="900" text-anchor="middle" fill="#83565c">Bio-Rad</text>'+
 '<text x="'+(x+30)+'" y="95" font-size="8.5" font-weight="900" text-anchor="middle" fill="#594f58">QC '+(i+1)+'</text>';}
 return out+'</svg>';
}
function material(label,tag,description,svg,color,laneTag=''){
 return '<article class="pf-material-card '+(color||"")+'">'+
 (laneTag?'<span class="pf-material-lane-tag">'+esc(laneTag)+'</span>':'')+
 '<div class="pf-material-figure">'+svg+'</div>'+
 '<div class="pf-material-detail"><span class="pf-material-tag">'+esc(tag)+'</span><h4>'+esc(label)+'</h4><p>'+esc(description)+'</p></div></article>';
}
function status(group){
 return '<div class="pf-subtitle">Verify analyzer calibration and QC status</div>'+
  '<div class="pf-analyte-states">'+group.analytes.map(function(a){
    return '<div class="pf-analyte-row"><strong>'+esc(a)+'</strong><div class="pf-state-box">'+
    '<span class="pf-state-pill ready">'+esc(a)+'</span><div><b>Check the instrument</b>'+
    '<small>Confirm the analyzer status and acceptable QC results before patient testing.</small></div></div></div>';
  }).join('')+'</div>';
}
function qcVialArt(group,v,index){
 const d=group.id==="ddimer", low=d&&index===0;
 const cap=low?"#0ab4b4":index===1&&!d?"#26262b":"#f7f8f9";
 const edge=low?"#06918f":index===1&&!d?"#202127":"#d4d8dc";
 const stripe=d?"#5da8d1":index===1?"#b877ab":"#d65a5f";
 const number=low?"L":index===0?"1":d?"1":"3";
 const family=d?"D-dimer Control":"Cardiac Markers Plus";
 return '<svg class="pf-qc-bottle-art" viewBox="0 0 180 188" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(group.qc)+' '+esc(v[1])+' vial, '+(low?"teal":index===1&&!d?"black":"white")+' cap">'+
 '<ellipse cx="90" cy="176" rx="49" ry="7" fill="#cad7de" opacity=".7"/>'+
 '<rect x="54" y="22" width="72" height="45" rx="19" fill="'+cap+'" stroke="'+edge+'" stroke-width="2"/>'+
 Array.from({length:15},(_,n)=>'<path d="M'+(57+n*4.6)+' 34v25" stroke="'+(low?"#50cccc":index===1&&!d?"#56565b":"#dadfe3")+'" stroke-width=".8" opacity=".8"/>').join('')+
 '<ellipse cx="90" cy="26" rx="24" ry="8.5" fill="#a1a8b7" stroke="#858d99" stroke-width="1.2"/>'+
 '<path d="M61 64C61 72 52 80 52 90V151Q52 168 67 168H113Q128 168 128 151V90C128 80 119 72 119 64Z" fill="#79492e" stroke="#64432f" stroke-width="2"/>'+
 '<path d="M59 83C57 116 57 144 60 156" stroke="#e9c096" stroke-width="6" opacity=".45" stroke-linecap="round"/>'+
 '<path d="M119 86v67" stroke="#322d2b" stroke-width="6" opacity=".22"/>'+
 '<rect x="54" y="98" width="72" height="53" rx="4" fill="#fcfcfc" stroke="#e8e9eb"/>'+
 '<rect x="54" y="98" width="72" height="10" fill="'+stripe+'"/>'+
 '<text x="90" y="106" font-size="6.6" font-weight="900" text-anchor="middle" fill="#fff">Liquichek™</text>'+
 '<rect x="57" y="111" width="17" height="8" rx="2" fill="#5c997d"/><text x="65.5" y="116.7" font-size="5" font-weight="800" text-anchor="middle" fill="#fff">BIO-RAD</text>'+
 '<text x="63" y="144" font-size="29" font-weight="900" fill="'+(d?"#267eb7":"#a14a79")+'">'+number+'</text>'+
 '<text x="96" y="126" font-size="7" font-weight="800" text-anchor="middle" fill="#37617a">'+(d?"D-DIMER":"CARDIAC")+'</text>'+
 '<text x="96" y="137" font-size="6.6" font-weight="750" text-anchor="middle" fill="#37617a">'+(d?"CONTROL":"MARKERS")+'</text>'+
 '<text x="96" y="146" font-size="6.8" font-weight="850" text-anchor="middle" fill="#37617a">#'+esc(v[2])+'</text></svg>';
}
function qcGallery(group){
 const photos=group.id==="ddimer"?["d-dimer-low.webp","d-dimer-level-1.webp"]:["cardiac-level-1.webp","cardiac-level-3.webp"];
 const cards=group.vials.map(function(v,i){
  const src="assets/pathfast-qc/"+photos[i];
  const title=group.label+" "+v[1]+" #"+v[2];
  return '<article class="pf-qc-vial '+(group.id==="ddimer"?"pf-qc-dimer":"pf-qc-cardiac")+'">'+
    '<span class="pf-qc-slot">'+esc(v[0])+'</span>'+
    '<div class="pf-qc-bottle-wrap">'+qcVialArt(group,v,i)+'</div>'+
    '<strong class="pf-qc-level">'+esc(v[3])+'</strong>'+
    '<small>'+esc(group.qc)+' · Catalog #'+esc(v[2])+'</small>'+
    '<div class="pf-qc-image-control">'+
     '<button type="button" class="pf-qc-photo-trigger" aria-label="View actual vial photo: '+esc(title)+'">⌕ View vial photo</button>'+
     '<div class="pf-qc-photo-popover" role="tooltip"><img src="'+src+'" alt="Actual Bio-Rad '+esc(title)+' control vial photo" loading="lazy" width="210" height="210"/><span>'+esc(v[1])+' · #'+esc(v[2])+'</span></div>'+
    '</div></article>';
 }).join("");
 return '<div class="pf-freezer"><span>❄</span><span>Bio-Rad QC materials are stored in the freezer. Thaw and handle per the current lot-specific insert.</span></div>'+
  '<div class="pf-qc-vials">'+cards+'</div>'+
  '<div class="pf-qc-note"><strong>Control levels vs lane positions</strong><p>QC 1 (lane 5) uses '+esc(group.vials[0][1])+' (#'+group.vials[0][2]+'). QC 2 (lane 6) uses '+esc(group.vials[1][1])+' (#'+group.vials[1][2]+'). Confirm manufacturer compatibility and use lot-specific QC ranges for the installed assay.</p></div>';
}
function panelContent(group){
 return '<div class="pf-assay-content pf-panel-content" aria-label="'+esc(group.label)+' calibration and QC materials">'+cartridgePack(group)+status(group)+
 '<div class="pf-freezer" style="background:#edf7f2;border-color:#d6e8dd;color:#366a56"><span>◷</span><span>Unopened reagent kits and CAL 1: <strong>2–8°C refrigerator</strong>. After use, promptly freeze permitted remaining <strong>reconstituted CAL 2</strong> (typically −20°C or colder). Follow assay-specific stability limits. Bio-Rad QC storage follows its own lot insert.</span></div>'+
 '<h3 class="pf-material-heading">Calibration materials <small>Included in the refrigerated reagent box</small></h3>'+
 '<div class="pf-material-grid">'+
 material('CAL 1','LIQUID · SPOUT BOTTLE','Ready-to-use liquid CAL 1. Load into lanes 1 and 2.',svgCal1(),'cal1','LANES 1 + 2')+
 material('CAL 2','2 GLASS VIALS IN BOX','Reconstitute just one vial at a time, then use the same prepared vial for duplicate CAL 2 cartridges. Freeze the remaining prepared material per selected assay IFU.',svgCal2(1),'cal2')+
 material('Blue liquid diluent','2 BUFFER VIALS IN BOX','Use one matching diluent with the single CAL 2 powder vial. Keep the second vial and diluent unopened.',svgDiluent(1),'diluent')+
 '</div>'+
 cal2MixIllustration()+
 '<h3 class="pf-material-heading">Bio-Rad quality controls <small>QC 1 and QC 2</small></h3>'+qcGallery(group)+'</div>';
}
const workflow=[
 ['Check the analyte status','Verify assay readiness on the actual analyzer and do not test patients if calibration or QC is due or rejected.'],
 ['Confirm reagent lot and enter CAL/QC','If new lot, scan the kit MC ENTRY card as instructed. For existing lot, confirm reagent lot and select CAL/QC for the applicable assay.'],
 ['Prepare calibrators and controls','Use CAL 1 from the reagent box, reconstitute only one CAL 2 powder vial with one matching blue diluent for both CAL 2 duplicate cartridges, and select the correct Bio-Rad cardiac or D-dimer QC materials.'],
 ['Load the six-lane rack','CAL 1, CAL 1, CAL 2, CAL 2, QC 1, QC 2. Use sample preparation and volumes from the approved assay insert.'],
 ['Run the six cartridges','Slide cartridges into the rack until they click, insert rack and tips, close the cover and follow the analyzer START prompts.'],
 ['Review results and ready state','Accept calibration and both control levels using the current lot-specific criteria. Verify actual analyzer readiness before patient testing.']
];

function storageSymbol(type){
 const freezer=type==="qc"||type==="cal2";
 const color=freezer?"#785e9d":"#258c8c";
 return '<svg class="pf-storage-svg" viewBox="0 0 220 170" role="img" aria-label="'+(type==='cal2'?'Freezer holding the reconstituted CAL 2 vial':type==='qc'?'Freezer holding Bio-Rad quality control vials':'Refrigerator holding CAL 1 and unopened PATHFAST materials')+'">'+
 '<rect x="30" y="13" width="158" height="145" rx="16" fill="#e7f2f6" stroke="#91b1bf" stroke-width="4"/>'+
 '<path d="M176 19L198 35V148L176 157Z" fill="#bfd6df" stroke="#91b1bf" stroke-width="3"/>'+
 '<rect x="42" y="25" width="124" height="119" rx="8" fill="#f9fdff" stroke="#bfd5df" stroke-width="2"/>'+
 '<path d="M49 75H159M49 120H159" stroke="#a1c0ce" stroke-width="4"/>'+
 [0,1,2].map(function(i){const x=55+i*35;return '<rect x="'+x+'" y="88" width="25" height="30" rx="5" fill="#eef8fa" stroke="#7fa4b4" stroke-width="2"/>'+
 '<rect x="'+(x+2)+'" y="83" width="21" height="9" rx="3" fill="'+color+'"/>'+
 '<rect x="'+(x+4)+'" y="101" width="17" height="11" rx="2" fill="#fff"/>';}).join('')+
 '<rect x="181" y="70" width="5" height="40" rx="3" fill="#6c96a9"/>'+
 '</svg>';
}
function returnMaterials(group){
 const header='<div class="pf-storage-intro"><strong>03 · Return materials to approved storage</strong><p>After recording acceptable results for '+esc(group.label)+', cap and store each material according to its own storage and stability requirements.</p></div>';
 const cal1='<article class="pf-storage-card"><header><span class="pf-storage-dot cal"></span><strong>CAL 1 and unopened kit</strong><small>Refrigerate at 2–8°C</small></header>'+
  '<div class="pf-storage-visual"><div class="pf-storage-cal-images">'+svgCal1()+'</div>'+storageSymbol("cal")+'</div>'+
  '<p>Refrigerate CAL 1 and the unopened backup CAL 2 powder and matching diluent at <b>2–8°C</b> in accordance with the reagent IFU.</p></article>';
 const cal2='<article class="pf-storage-card"><header><span class="pf-storage-dot qc"></span><strong>Reconstituted CAL 2</strong><small>Freeze remaining prepared vial after use</small></header>'+
  '<div class="pf-storage-visual"><div class="pf-storage-cal-images">'+svgReconstitutedCal2()+'</div>'+storageSymbol("cal2")+'</div>'+
  '<p>After dispensing into both CAL 2 cartridge wells, promptly recap, label and <b>freeze the single prepared CAL 2 vial at −20°C or colder</b> when permitted by the assay IFU. Record reconstitution date, expiration and freeze/thaw history; do not exceed assay-specific stability.</p></article>';
 const qc='<article class="pf-storage-card"><header><span class="pf-storage-dot qc"></span><strong>'+esc(group.qc)+'</strong><small>QC1 and QC2 · separate lot-specific instructions</small></header>'+
  '<div class="pf-storage-visual"><div class="pf-storage-qc-images">'+group.vials.map(function(v,i){return '<div class="pf-storage-vial"><span style="--cap:'+(i?"#a8e1c5":"#f4d082")+'"></span><b>QC'+(i+1)+'</b><small>#'+esc(v[2])+'</small></div>';}).join('')+'</div>'+storageSymbol("qc")+'</div>'+
  '<p>Return Bio-Rad QC controls to the approved <b>freezer</b> only when permitted by the current lot-specific insert and open-vial stability instructions. Recap and secure each vial.</p></article>';
 return '<section class="pf-return-storage" aria-label="Storage for CAL 1, prepared CAL 2 and quality controls">'+header+
   '<div class="pf-storage-grid pf-storage-three">'+cal1+cal2+qc+'</div>'+
   '<p class="pf-workflow-note"><strong>Applies to all three assay workflows.</strong> Verify selected-assay CAL 2 reconstitution and freezer limits, and follow the Bio-Rad control-specific storage requirements separately.</p></section>';
}

let selectedPanel=null;
let panelDropdownOpen=false;
let currentStep=1;
let showAllSteps=false;
let stepMenuOpen=false;
function selectedGroup(){return groups.find(g=>g.id===selectedPanel)||null;}
function panelPicker(){
 const group=selectedGroup();
 return '<div class="pf-panel-control" id="pfPanelControl">'+
 '<div class="pf-panel-prompt"><span class="pf-panel-question">01</span><div><strong>Which panel are you running calibration and QC on?</strong><p>Select the assay panel to see its calibrators, QC materials and six-lane setup.</p></div></div>'+
 '<div class="pf-panel-picker">'+
 '<button type="button" class="pf-panel-trigger'+(group?' has-selection':'')+'" data-pf-panel-trigger aria-haspopup="true" aria-expanded="'+panelDropdownOpen+'" aria-controls="pfPanelOptions">'+
 '<span class="pf-panel-trigger-main"><span class="pf-panel-trigger-kicker">'+(group?'SELECTED PANEL':'SELECT PANEL')+'</span><span class="pf-panel-trigger-value">'+(group?esc(group.label):'Choose an assay panel')+'</span></span>'+
 '<span class="pf-panel-chevron'+(panelDropdownOpen?' open':'')+'" aria-hidden="true"></span></button>'+
 (panelDropdownOpen?'<div class="pf-panel-options" id="pfPanelOptions" role="group" aria-label="Assay panel options">'+
 groups.map(g=>'<button type="button" class="pf-panel-option'+(selectedPanel===g.id?' selected':'')+'" data-pf-panel-option="'+g.id+'" aria-pressed="'+(selectedPanel===g.id)+'">'+
 '<span class="pf-panel-option-mark '+g.id+'" aria-hidden="true">'+(g.id==='ddimer'?'◆':'♥')+'</span><span class="pf-panel-option-text"><strong>'+esc(g.label)+'</strong><small>Calibration + '+esc(g.qc)+'</small></span>'+
 '<span class="pf-panel-option-check" aria-hidden="true">'+(selectedPanel===g.id?'✓':'›')+'</span></button>').join('')+'</div>':'')+
 '</div></div>';
}
function repaintPanel(){
 const old=document.querySelector('.pf-calibration-guide');
 if(old)old.outerHTML=render();
 const rail=document.querySelector('.pfux-cal-stage-nav .pfux-stage-track');
 const active=rail?.querySelector('.pfux-stage-button.is-current');
 if(rail&&active)rail.scrollLeft=Math.max(0,active.offsetLeft-rail.offsetLeft-24);
}
function render(){
 const group=selectedGroup();
 const x=group?esc(group.label):"";
 function calHeaderNavigation(){
  return '<div class="pfux-cal-navigation pfux-cal-header-nav" role="group" aria-label="Calibration step navigation">'+
   '<button type="button" data-pf-prev '+(currentStep===1?'disabled':'')+'>← Previous</button>'+
   '<span class="pfux-cal-progress">'+currentStep+' / 14</span>'+
   '<button type="button" class="primary" '+(currentStep===14?'data-pf-toggle-all':'data-pf-next')+'>'+
     (currentStep===14?'View all steps ↗':'Next step →')+'</button></div>';
 }
 function step(n,title,desc,inner){
  if(!showAllSteps&&n!==currentStep)return '';
  const guided=!showAllSteps&&n===currentStep;
  // Main step cards are static. Only explicit step navigation buttons change stages.
  return '<article class="pf-workflow-step pf-workflow-static'+(guided?' pf-workflow-has-nav':'')+'">'+
    '<header class="pf-workflow-head"><span class="pf-workflow-no">'+String(n).padStart(2,"0")+'</span>'+
    '<span class="pf-workflow-label"><strong>'+title+'</strong><small>'+desc+'</small></span>'+
    (guided?calHeaderNavigation():'')+'</header>'+
    '<div class="pf-workflow-detail">'+(inner||"")+'</div></article>';
 }
 let h='<section class="pf-calibration-guide">'+
 '<div class="pf-calibration-heading"><div><span class="pf-eyebrow">PATHFAST · CALIBRATION AND QC</span>'+
 '<h2>28-day calibration + QC</h2><p>Review the screen sequence, dispense calibrators and controls into their assigned cartridges, and load the six-lane rack.</p></div>'+
 '<span class="pf-interval">↻ 28 DAYS</span></div>'+
 panelPicker();
 if(!group){
  h+='<div class="pf-panel-empty" aria-live="polite"><span class="pf-panel-empty-icon">▤</span><strong>Select the assay to start</strong><p>Start with the reagent box, calibrators, matching Bio-Rad quality controls and the six-lane rack. Instrument login comes after physical preparation.</p></div>';
 }else{
  const total=14;
  const laneNames=['CAL 1','CAL 1','CAL 2','CAL 2','QC 1','QC 2'];
  const laneDesc=['CAL 1 liquid','CAL 1 liquid','CAL 2 from the one reconstituted vial','CAL 2 from the SAME reconstituted vial',group.vials[0][1]+' · Bio-Rad #'+group.vials[0][2],group.vials[1][1]+' · Bio-Rad #'+group.vials[1][2]];
  const laneList='<div class="pf-qc-lane-list" role="list" aria-label="Six sample-to-lane assignments">'+laneNames.map((name,i)=>
     '<div role="listitem" class="pf-qc-lane-item"><b class="pf-qc-lane-no">'+(i+1)+'</b><strong>'+esc(name)+'</strong><span>'+esc(laneDesc[i])+'</span></div>'
    ).join('')+'</div>';
  const laneMap=(filled=false,withVials=false)=>'<div class="pf-rack-header"><div><span class="pf-eyebrow">SIX-LANE RACK · TOP TO BOTTOM</span><h3>'+(withVials?'Transfer the matching vial into each sample well':'Which material goes in each cartridge?')+'</h3></div></div>'+
   '<div class="pf-qc-vertical-layout"><div class="pf-rack-box">'+rack(filled,group,withVials)+'</div>'+laneList+'</div>'+
   '<p class="pf-workflow-note"><strong>Important:</strong> Both CAL 2 cartridges use the same single reconstituted CAL 2 vial. This is a training layout for two CAL 1, two CAL 2 and two QC levels. Confirm each actual lane assignment on PATHFAST before dispensing. Calibration replicate and QC-lockout settings can change the analyzer-assigned order.</p>';
  h+='<div class="pf-selected-panel"><span class="pf-selected-dot"></span><strong>'+x+'</strong><span>CAL + QC · REVIEW 6 LANES</span></div>'+
   '<div class="pfux-cal-toolbar"><div><strong>Step '+currentStep+' of '+total+'</strong><span>Select any step below, like the patient testing workflow</span></div><div class="pfux-cal-toolbar-actions"><button type="button" data-pf-toggle-all>'+(showAllSteps?'Focused view':'View all steps')+'</button></div></div>'+
   '<nav class="pfux-stage-nav pfux-cal-stage-nav" aria-label="PATHFAST calibration and quality control steps"><div class="pfux-stage-track" role="group" aria-label="Select a calibration step">'+[
    'Gather kits and QC','Prepare CAL + QC','Load six cartridges','Dispense materials','Rack, tips and waste box',
    'Close analyzer hood','Log in and check status','Tap BACK','Select CAL/QC/SAMPLE then assay','Verify six lanes',
    'Press START','Confirm 17-min run','Review CAL and QC','Print, file and freeze'
   ].map((label,i)=>'<button type="button" data-pf-jump="'+(i+1)+'" class="pfux-stage-button'+(currentStep===i+1?' is-current':i+1<currentStep?' is-previous':'')+'" aria-label="Step '+(i+1)+' of '+total+': '+esc(label)+'" '+(currentStep===i+1?'aria-current="step"':'')+'><span class="pfux-stage-number">'+String(i+1).padStart(2,'0')+'</span><span class="pfux-stage-name">'+esc(label)+'</span></button>').join('')+'</div></nav>'+
   '<p class="pfux-cal-scroll-hint">Scroll horizontally to view all 14 steps →</p>'+
   '<div class="pfux-cal-meter" role="progressbar" aria-label="Calibration procedure progress" aria-valuemin="1" aria-valuemax="'+total+'" aria-valuenow="'+currentStep+'"><span style="width:'+(currentStep/total*100)+'%"></span></div>';
  h+=step(1,'Gather assay cartridges, calibrators and Bio-Rad controls','Confirm the exact QC levels and vials for '+x,
      '<div class="pf-qc-prep-emphasis"><strong>Do this before logging in.</strong><span>Retrieve the matching six-cartridge assay kit, inspect cartridge packaging and expiration, and check that the two Bio-Rad control levels match the selected assay.</span></div>'+
      panelContent(group)+
      '<p class="pf-workflow-note">Bio-Rad control material: use the current lot-specific insert for frozen storage, thawing, mixing, open-vial stability and acceptable ranges. For BNP/NT-proBNP controls, check the latest revised insert. Do not assume all control products use the same preparation.</p>');
  h+=step(2,'Prepare CAL 1, one CAL 2 vial and the two QC controls','Use one CAL 2 powder vial and one matching diluent; reserve the unopened set',
      '<div class="pf-cal-prep-row">'+
      material('CAL 1 · ready-to-use','REFRIGERATED KIT','Use CAL 1 as supplied; assign to lanes 1 and 2.',svgCal1(),'cal1','LANES 1 + 2')+
      material('One CAL 2 powder vial','REFRIGERATED KIT · USE 1 OF 2','Reconstitute one powder vial only. Use this same preparation for the two CAL 2 cartridge wells in lanes 3 and 4.',svgCal2(1),'cal2')+
      material('One blue diluent','REFRIGERATED KIT · USE 1 OF 2','Use one matching diluent bottle with one CAL 2 powder vial. Keep the other diluent and powder vial unopened.',svgDiluent(1),'diluent')+
      '</div>'+cal2MixIllustration()+'<h3 class="pf-material-heading">Bio-Rad QC vials · '+esc(group.qc)+'</h3>'+qcGallery(group)+
      '<div class="pf-qc-prep-emphasis"><strong>Prepare before loading cartridges.</strong><span>Thaw and gently mix each control as its lot-specific insert specifies; check for unsuitable material. Keep CAL 1, the one reconstituted CAL 2 vial, QC 1 and QC 2 separately identified. Do not reconstitute the backup CAL 2 vial.</span></div>');
  h+=step(3,'Seat the cartridges in the upright six-lane rack','Place metal rack in clear loading base and insert six assay cartridges',
      laneMap(false,false)+
      '<p class="pf-workflow-note">Confirm every cartridge matches the selected assay and is fully seated in its assigned vertical channel. At this stage, the clear front sample wells are still empty. Do not put liquids in the round detection wells.</p>');
  h+=step(4,'Dispense each calibrator and Bio-Rad control into its assigned sample well','Check the material by lane before using the transfer pipette',
      laneMap(true,true)+
      '<p class="pf-workflow-note">Dispense from the same reconstituted CAL 2 vial into BOTH CAL 2 cartridges, lanes 3 and 4. Gently mix each material according to the corresponding insert. Fill only each cartridge’s clear front sample well to its assay-specific mark without bubbles or cross-contamination. Use a fresh tip for each transfer; never pipette into the separate round detection well.</p>');
  h+=step(5,'Return the loaded rack, add tips and check the waste-tip box','Confirm all six active lanes and center waste-tip box before closing cover',
      (window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual('assembled','cal'):'')+
      '<div class="pf-qc-prep-emphasis"><strong>Before closing:</strong><span>Confirm the rack is fully seated, a new disposable tip is installed in each active position, and the central waste-tip box is correctly seated and not full. Compare lane IDs to the instrument screen later.</span></div>');
  h+=step(6,'Close the analyzer hood over the loaded rack','Lower the raised hood and confirm it is secured before touchscreen steps',
      (window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual('hood','cal'):'')+
      '<p class="pf-workflow-note">Check the rack and all six pipette tips and center waste-tip box, then lower and close the hood fully. Do not start with the cover raised.</p>');
  h+=step(7,'Log in and check assay status','Select operator credentials, then inspect the assay pill colors',
      window.LAB_PATHFAST_SCREEN.login()+
      window.LAB_PATHFAST_SCREEN.home(group.label,"cal")+
      '<p class="pf-workflow-note">Verify the actual assay readiness on the analyzer. A locked or unavailable assay must not be used for patient testing until required calibration and QC are accepted.</p>');
  h+=step(8,'Tap BACK to leave reagent status','Return from the reagent / calibration / QC status screen to the assay operations',
      window.LAB_PATHFAST_SCREEN.home(group.label,"cal","back")+
      '<p class="pf-workflow-note">Tap BACK to return to the ASSAY operation choices. The next step shows the CAL/QC/SAMPLE selection.</p>');
  h+=step(9,'Select CAL/QC/SAMPLE, then '+x,'Choose the calibration/QC operation first, then select the analyte and verify its reagent lot',
      window.LAB_PATHFAST_SCREEN.menu("cal")+
      window.LAB_PATHFAST_SCREEN.item(group.label)+
      '<p class="pf-workflow-note">Select CAL/QC/SAMPLE, or the equivalent CAL/QC option with QC Lockout ON, before selecting the assay. If the reagent lot is not registered, use the approved MC ENTRY procedure; do not bypass lot checks.</p>');
  h+=step(10,'Verify actual CAL/QC lane assignments','Match the instrument’s six-lane screen to each prepared cartridge',
      window.LAB_PATHFAST_SCREEN.lanes("cal",group.label)+laneMap(true,false)+
      '<p class="pf-workflow-note">Instrument-assigned lanes take precedence over an illustrated example. If the displayed configuration differs, confirm the applicable calibration-replicate and QC-lockout procedure before starting.</p>');
  h+=step(11,'Press START to begin calibration and QC','Verify prepared lanes and confirm the analyzer START prompt',
      window.LAB_PATHFAST_SCREEN.start("cal")+
      '<p class="pf-workflow-note">Confirm that all six prepared lanes match the displayed assay and that the hood is fully closed before pressing START.</p>');
  h+=step(12,'Confirm the analyzer is running · approx. 17 minutes','Do not open the hood during processing',
      (window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual('running','cal'):'')+
      '<p class="pf-workflow-note">After START is accepted, allow the analyzer to finish the approximately 17-minute assay. Keep the hood closed and do not interrupt processing.</p>');
  h+=step(13,'Review calibration and QC results','Only accept the run after reviewing all calibrators and control levels',
      (window.LAB_EQUIPMENT_ART?.pathfastActionVisual?window.LAB_EQUIPMENT_ART.pathfastActionVisual('results','cal'):'')+
      status(group)+
      '<p class="pf-workflow-note">Review CAL 1, CAL 2 and both Bio-Rad controls against lot-specific criteria; confirm results are acceptable before patient testing. Failed controls require resolution.</p>');
  h+=step(14,'Print, file and return CAL/QC materials to storage','Document both control levels and return each material to the correct temperature',
      (window.LAB_QC_GUIDE?.printStep?window.LAB_QC_GUIDE.printStep('pathfast'):'<p class="pf-workflow-note">Print and retain the accepted calibration and QC results in the approved binder.</p>')+
      '<p class="pf-workflow-note">Confirm the assay, reagent lot, control lots, levels, date and operator are recorded in the approved QC log.</p>'+returnMaterials(group));

  h+='<div class="pf-tip"><span class="pf-tip-icon">!</span><div>Current manufacturer IFU and approved assay SOP govern dilution volumes, incubation, stability, QC ranges and any additional QC required outside the 28-day calibration cycle.</div></div>'+
      '<div class="pf-bottom-actions"><button type="button" class="pf-video-button" data-pf-play-video aria-haspopup="dialog">▶ Play combined CAL + QC training video</button>'+
      '<button type="button" class="pf-procedure-button" data-gotab="notes">Handling notes ↗</button></div>';
 }
 return h+'</section>';
}
if(typeof document!=='undefined' && typeof document.addEventListener==='function'){
 document.addEventListener('click',function(e){
  const next=e.target.closest('[data-pf-next]');
  const prev=e.target.closest('[data-pf-prev]');
  const jump=e.target.closest('[data-pf-jump]');
  const browse=e.target.closest('[data-pf-browse]');
  const toggleAll=e.target.closest('[data-pf-toggle-all]');
  if(next||prev||jump||browse||toggleAll){
   if(next)currentStep=Math.min(14,currentStep+1);
   if(prev)currentStep=Math.max(1,currentStep-1);
   if(jump){const n=Number(jump.getAttribute('data-pf-jump'));if(n>=1&&n<=14)currentStep=n;showAllSteps=false;stepMenuOpen=false;}
   if(browse)stepMenuOpen=!stepMenuOpen;
   if(toggleAll){showAllSteps=!showAllSteps;stepMenuOpen=false;}
   repaintPanel();
   if(next||prev||jump){const head=document.querySelector('.pfux-cal-toolbar');if(head&&head.scrollIntoView)head.scrollIntoView({block:'start',behavior:'instant'});}
   return;
  }
  const trigger=e.target.closest('[data-pf-panel-trigger]');
  if(trigger){panelDropdownOpen=!panelDropdownOpen;repaintPanel();const newTrigger=document.querySelector('[data-pf-panel-trigger]');if(newTrigger)newTrigger.focus();return;}
  const option=e.target.closest('[data-pf-panel-option]');
  if(option){
   const id=option.getAttribute('data-pf-panel-option');
   if(groups.some(g=>g.id===id)){
    selectedPanel=id;panelDropdownOpen=false;currentStep=1;showAllSteps=false;stepMenuOpen=false;repaintPanel();
    const newTrigger=document.querySelector('[data-pf-panel-trigger]');if(newTrigger)newTrigger.focus();
   }
   return;
  }
  if(panelDropdownOpen&&!e.target.closest('.pf-panel-control')){panelDropdownOpen=false;repaintPanel();}
 });
 document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&panelDropdownOpen){
   panelDropdownOpen=false;repaintPanel();
   const trigger=document.querySelector('[data-pf-panel-trigger]');if(trigger)trigger.focus();
  }
 });
}
function renderAllForPrint(){
 const oldAll=showAllSteps,oldStep=currentStep;
 try{showAllSteps=true;return render();}
 finally{showAllSteps=oldAll;currentStep=oldStep;}
}
window.LAB_PATHFAST_UI={render:render,renderAllForPrint:renderAllForPrint,hasSelectedPanel:function(){return !!selectedGroup();},selectedPanelLabel:function(){return selectedGroup()?.label||'';},lanes:lanes,assays:groups.map(x=>x.id)};
})();