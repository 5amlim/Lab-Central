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
{id:"troponin",label:"hs-Troponin I",analytes:["hs-Troponin I"],qc:"Bio-Rad Liquichek Cardiac Markers Plus",catalog:"PF1261-KUS",vials:[["QC 1 · LANE 5","CONTROL LEVEL 1","146","LEVEL 1"],["QC 2 · LANE 6","CONTROL LEVEL 3","148","LEVEL 3"]]},
{id:"ntprobnp",label:"NT-proBNP",analytes:["NT-proBNP"],qc:"Bio-Rad Liquichek Cardiac Markers Plus",catalog:"PF1061-KUS",vials:[["QC 1 · LANE 5","CONTROL LEVEL 1","146","LEVEL 1"],["QC 2 · LANE 6","CONTROL LEVEL 3","148","LEVEL 3"]]},
{id:"ddimer",label:"D-dimer",analytes:["D-dimer"],qc:"Bio-Rad Liquichek D-dimer",catalog:"PF1051-KUS",vials:[["QC 1 · LANE 5","LEVEL LOW","27100","LOW"],["QC 2 · LANE 6","LEVEL 1","27101","LEVEL 1"]]}
];
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function defs(){return '<defs>'+
 '<linearGradient id="pfxmetal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f6fafc"/><stop offset=".5" stop-color="#bfcdd6"/><stop offset="1" stop-color="#eaf1f6"/></linearGradient>'+
 '<linearGradient id="pfxglass" x1="0" x2=".8" y1="0" y2="1"><stop stop-color="#e9f2f7" stop-opacity=".65"/><stop offset=".55" stop-color="#b9d1db" stop-opacity=".23"/><stop offset="1" stop-color="#a9c8d9" stop-opacity=".6"/></linearGradient>'+
 '<linearGradient id="pfxamber" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d8a16c"/><stop offset=".5" stop-color="#81502c"/><stop offset="1" stop-color="#b97e49"/></linearGradient>'+
 '</defs>';}
function laneSvg(item,i){
 const x=31+i*145, cx=x+62;
 let codes='';
 for(let j=0;j<9;j++)codes+='<rect x="'+(x+36+j*5)+'" y="171" width="'+(j%3===0?3:1.5)+'" height="'+(j%2?19:24)+'" fill="#d0dbe2"/>';
 return '<g role="group" aria-label="Lane '+(i+1)+' '+item.name+'">'+
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
 '<rect x="'+(x+24)+'" y="276" width="76" height="45" rx="7" fill="'+item.well+'" stroke="'+item.ink+'" stroke-width="2"/>'+
 '<rect x="'+(x+30)+'" y="281" width="64" height="32" rx="5" fill="'+item.tone+'" opacity=".9"/>'+
 '<text x="'+cx+'" y="302" text-anchor="middle" font-weight="900" font-size="14" fill="'+item.ink+'">'+item.name+'</text>'+
 '</g>';
}
function rack(){
 return '<div class="pf-rack-scroll" role="region" tabindex="0" aria-label="Six cartridge loading positions, horizontally scrollable">'+
 '<svg class="pf-rack-svg" viewBox="0 0 940 359" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PATHFAST six-lane rack with color coded sample wells: Cal 1 in lanes 1 and 2, Cal 2 in lanes 3 and 4, QC 1 in lane 5, QC 2 in lane 6">'+
 defs()+
 '<rect x="17" y="83" width="892" height="255" rx="17" fill="#dbe7ec" stroke="#9cabb6" stroke-width="4"/>'+
 '<rect x="25" y="92" width="876" height="235" rx="13" fill="#cfdae2" stroke="#f9fcfd" stroke-width="2"/>'+
 lanes.map(laneSvg).join("")+
 '<text x="469" y="354" text-anchor="middle" fill="#698091" font-size="11" letter-spacing="1.5" font-weight="850">FRONT · COLOR-CODED SAMPLE WELLS</text></svg></div>';
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
function svgCal2(){
 let body='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="Two glass CAL 2 vials containing lyophilized powder" xmlns="http://www.w3.org/2000/svg">'+defs();
 for(let i=0;i<2;i++){const x=38+i*92;body+='<g><ellipse cx="'+(x+30)+'" cy="134" rx="29" ry="5" fill="#dce4e8"/>'+
 '<rect x="'+(x+6)+'" y="13" width="47" height="23" rx="5" fill="#d6e3ec" stroke="#8ba4b4" stroke-width="2"/>'+
 '<rect x="'+(x+10)+'" y="36" width="39" height="92" rx="8" fill="url(#pfxglass)" stroke="#8da4b1" stroke-width="2"/>'+
 '<rect x="'+(x+13)+'" y="58" width="33" height="41" rx="3" fill="#f5f7f9" stroke="#b8cad4"/>'+
 '<text x="'+(x+30)+'" y="74" text-anchor="middle" font-size="10" fill="#745ba3" font-weight="900">CAL 2</text>'+
 '<path d="M'+(x+15)+' 113 Q'+(x+30)+' 104 '+(x+46)+' 113 L'+(x+46)+' 121 L'+(x+15)+' 121Z" fill="#e8dcf2" stroke="#b8aad1"/></g>'}
 return body+'</svg>';
}
function svgDiluent(){
 let out='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="Two blue liquid buffer diluent vials for CAL 2 reconstitution" xmlns="http://www.w3.org/2000/svg">'+defs();
 for(let i=0;i<2;i++){const x=40+i*90;out+='<ellipse cx="'+(x+28)+'" cy="134" rx="27" ry="6" fill="#dce5eb"/>'+
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
 const pair=["A","B"].map((key,i)=>'<g transform="translate('+(i*445)+',0)">'+
  '<rect x="4" y="3" width="430" height="177" rx="12" fill="#f8fafc" stroke="#d0dfe8" stroke-width="2"/>'+
  '<rect x="4" y="3" width="430" height="30" rx="12" fill="#edf3fa"/>'+
  '<text x="18" y="23" font-size="14" font-weight="900" fill="#375774">CAL 2 · VIAL '+key+'</text>'+
  bottle(25,"powder")+bottle(156,"diluent")+bottle(328,"mixed")+
  '<text x="137" y="101" font-size="29" text-anchor="middle" fill="#4b94b4" font-weight="800">+</text>'+
  '<text x="287" y="101" font-size="30" text-anchor="middle" fill="#4b94b4" font-weight="850">→</text>'+
  '<text x="65" y="164" font-size="11" font-weight="800" text-anchor="middle" fill="#6c6692">Powder</text>'+
  '<text x="195" y="164" font-size="11" font-weight="800" text-anchor="middle" fill="#267da6">Blue diluent</text>'+
  '<text x="368" y="164" font-size="11" font-weight="850" text-anchor="middle" fill="#546d98">Reconstituted</text></g>').join('');
 return '<figure class="pf-cal2-mix-diagram"><header><strong>CAL 2 reconstitution</strong><span>Two separate preparations, A and B</span></header>'+
  '<svg role="img" aria-label="CAL 2 powder vial A plus its own blue diluent makes CAL 2 A. Separately, powder vial B plus its own blue diluent makes CAL 2 B." xmlns="http://www.w3.org/2000/svg" viewBox="0 0 890 190">'+pair+'</svg>'+
  '<figcaption>Add the matching blue diluent to each CAL 2 powder vial separately. Use the current assay IFU for exact volumes, mixing and stability.</figcaption></figure>';
}
function cartridgePack(group){
 const label=esc(group.label);
 const six=Array.from({length:6},(_,i)=>{
   const x=178+i*69;
   return '<g><rect x="'+x+'" y="55" width="57" height="126" rx="7" fill="#889fac" stroke="#495d69" stroke-width="2"/>'+
    '<rect x="'+(x+5)+'" y="62" width="47" height="112" rx="5" fill="#1c303a" stroke="#728b99"/>'+
    '<rect x="'+(x+8)+'" y="74" width="41" height="15" rx="2" fill="#bc4e4b"/>'+
    '<text x="'+(x+28)+'" y="84" font-size="7.5" fill="white" text-anchor="middle" font-weight="850">PATHFAST</text>'+
    '<rect x="'+(x+12)+'" y="95" width="32" height="47" rx="2" fill="#293944" stroke="#637a82"/>'+
    '<circle cx="'+(x+28)+'" cy="155" r="10" fill="#91adbd" stroke="#d6e4eb" stroke-width="2"/>'+
    '<text x="'+(x+28)+'" y="205" text-anchor="middle" font-size="13" font-weight="900" fill="#47657d">'+(i+1)+'</text></g>';
 }).join('');
 return '<figure class="pf-cartridge-pack"><header><strong>Assay cartridge pack</strong>'+
  '<span>6 CARTRIDGES · '+label+'</span></header>'+
  '<svg role="img" aria-label="Foil PATHFAST '+label+' pack containing six individual assay cartridges" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 790 290">'+
  '<defs><linearGradient id="pf-kit-foil"><stop stop-color="#c7d2d8"/><stop offset=".45" stop-color="#f5f8fa"/><stop offset="1" stop-color="#bbc9ce"/></linearGradient></defs>'+
  '<ellipse cx="390" cy="275" rx="250" ry="10" fill="#dbe4e9"/>'+
  '<path d="M156 58L171 19H608L622 58V136H156Z" fill="#202529" stroke="#151b20" stroke-width="5"/>'+
  '<path d="M170 28H606V63H170Z" fill="#34393b" stroke="#747f84" stroke-width="3"/>'+
  '<path d="M147 114Q392 99 632 114L639 259Q633 273 619 272H166Q152 272 145 259Z" fill="url(#pf-kit-foil)" stroke="#93a9b5" stroke-width="3"/>'+
  six+
  '<rect x="191" y="196" width="401" height="40" rx="4" fill="#262d31"/>'+
  '<text x="208" y="223" fill="white" font-family="Arial,sans-serif" font-size="20" font-weight="900" letter-spacing="2">PATHFAST</text>'+
  '<text x="572" y="222" text-anchor="end" fill="white" font-family="Arial,sans-serif" font-size="18" font-weight="800">'+label+'</text>'+
  '<rect x="223" y="242" width="340" height="16" rx="4" fill="#f5f7f8" stroke="#bac8d0"/>'+
  '<text x="393" y="253" text-anchor="middle" font-size="10" font-weight="800" fill="#455e6c">VERIFY LOT AND EXPIRATION ON PACKAGE</text></svg>'+
  '<figcaption>Illustrated from the supplied PATHFAST foil-pack photo. Retrieve six matching '+label+' cartridges and verify the actual assay and expiration.</figcaption></figure>';
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
function material(label,tag,description,svg,color){
 return '<article class="pf-material-card '+(color||"")+'"><div class="pf-material-figure">'+svg+'</div>'+
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
 '<div class="pf-freezer" style="background:#edf7f2;border-color:#d6e8dd;color:#366a56"><span>◷</span><span>PATHFAST reagent kits and calibrators: <strong>refrigerated at 2–8°C</strong>. Bio-Rad QC vials: <strong>frozen at −20 to −70°C</strong>. Confirm current lot-specific instructions.</span></div>'+
 '<h3 class="pf-material-heading">Calibration materials <small>Included in the refrigerated reagent box</small></h3>'+
 '<div class="pf-material-grid">'+
 material('CAL 1','LIQUID · SPOUT BOTTLE','Ready-to-use liquid CAL 1. Load into lanes 1 and 2.',svgCal1(),'cal1')+
 material('CAL 2','2 GLASS VIALS','Both vials contain lyophilized powder. Reconstitute with matching diluent before loading lanes 3 and 4.',svgCal2(),'cal2')+
 material('Blue liquid diluent','2 BUFFER VIALS','Combine the supplied blue liquid diluent with each CAL 2 powder vial using the assay-specific mixing directions and volume.',svgDiluent(),'diluent')+
 '</div>'+
 cal2MixIllustration()+
 '<h3 class="pf-material-heading">Bio-Rad quality controls <small>QC 1 and QC 2</small></h3>'+qcGallery(group)+'</div>';
}
const workflow=[
 ['Check the analyte status','Verify assay readiness on the actual analyzer and do not test patients if calibration or QC is due or rejected.'],
 ['Confirm reagent lot and enter CAL/QC','If new lot, scan the kit MC ENTRY card as instructed. For existing lot, confirm reagent lot and select CAL/QC for the applicable assay.'],
 ['Prepare calibrators and controls','Use CAL 1 from the reagent box, reconstitute the two CAL 2 powder vials with their matching blue diluents, and select the correct Bio-Rad cardiac or D-dimer QC materials.'],
 ['Load the six-lane rack','CAL 1, CAL 1, CAL 2, CAL 2, QC 1, QC 2. Use sample preparation and volumes from the approved assay insert.'],
 ['Run the six cartridges','Slide cartridges into the rack until they click, insert rack and tips, close the cover and follow the analyzer START prompts.'],
 ['Review results and ready state','Accept calibration and both control levels using the current lot-specific criteria. Verify actual analyzer readiness before patient testing.']
];

function storageSymbol(type){
 const freezer=type==="qc";
 const color=freezer?"#785e9d":"#258c8c";
 return '<svg class="pf-storage-svg" viewBox="0 0 220 170" role="img" aria-label="'+(freezer?'Freezer holding Bio-Rad quality control vials':'Refrigerator holding PATHFAST calibrators')+'">'+
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
 const header='<div class="pf-storage-intro"><strong>03 · Return materials to their specified storage</strong><p>After the accepted CAL/QC results are printed and filed, return the materials for '+esc(group.label)+' to the correct temperature-controlled locations. Use current open-vial and reconstituted-material stability limits.</p></div>';
 const cal='<article class="pf-storage-card"><header><span class="pf-storage-dot cal"></span><strong>CAL 1 and CAL 2</strong><small>Refrigerated reagent-kit materials</small></header>'+
 '<div class="pf-storage-visual"><div class="pf-storage-cal-images">'+svgCal1()+svgCal2()+'</div>'+storageSymbol("cal")+'</div>'+
 '<p>Return eligible remaining calibrator materials to <b>2–8°C refrigeration</b>, not to the QC freezer. Dispose of used or unstable reconstituted portions according to the assay insert.</p></article>';
 const qc='<article class="pf-storage-card"><header><span class="pf-storage-dot qc"></span><strong>'+esc(group.qc)+'</strong><small>QC 1 and QC 2 · manufacturer-specified freezer</small></header>'+
 '<div class="pf-storage-visual"><div class="pf-storage-qc-images">'+group.vials.map(function(v,i){return '<div class="pf-storage-vial"><span style="--cap:'+(i?"#a8e1c5":"#f4d082")+'"></span><b>QC '+(i+1)+'</b><small>#'+esc(v[2])+'</small></div>';}).join('')+'</div>'+storageSymbol("qc")+'</div>'+
 '<p>Return the two Bio-Rad QC levels to the designated <b>−20°C to −70°C freezer</b> only if permitted by the current lot-specific insert and open-vial stability instructions. Secure caps and close the freezer.</p></article>';
 return '<section class="pf-return-storage" aria-label="Return calibration and QC material to appropriate cold storage">'+header+'<div class="pf-storage-grid">'+cal+qc+'</div><p class="pf-workflow-note"><strong>All three assays:</strong> Apply this same storage check after hs-Troponin I, NT-proBNP and D-dimer CAL/QC. Never assume the calibrators share the QC freezer requirement.</p></section>';
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
  // Keep the controls outside the native summary to avoid toggling its details.
  return '<details class="pf-workflow-step'+(guided?' pf-workflow-has-nav':'')+'" '+(!showAllSteps||n===currentStep?'open':'')+'>'+
    '<summary><span class="pf-workflow-no">'+String(n).padStart(2,"0")+'</span>'+
    '<span class="pf-workflow-label"><strong>'+title+'</strong><small>'+desc+'</small></span>'+
    '<span class="pf-workflow-chev"></span></summary>'+
    (guided?calHeaderNavigation():'')+
    '<div class="pf-workflow-detail">'+(inner||"")+'</div></details>';
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
  const laneDesc=['CAL 1 liquid','CAL 1 liquid','Reconstituted CAL 2 (vial A)','Reconstituted CAL 2 (vial B)',group.vials[0][1]+' · Bio-Rad #'+group.vials[0][2],group.vials[1][1]+' · Bio-Rad #'+group.vials[1][2]];
  const laneList='<div class="pf-qc-lane-list" role="list" aria-label="Six sample-to-lane assignments">'+laneNames.map((name,i)=>
     '<div role="listitem" class="pf-qc-lane-item"><b class="pf-qc-lane-no">'+(i+1)+'</b><strong>'+esc(name)+'</strong><span>'+esc(laneDesc[i])+'</span></div>'
    ).join('')+'</div>';
  const laneMap='<div class="pf-rack-header"><div><span class="pf-eyebrow">SIX-LANE RACK · TOP TO BOTTOM</span><h3>Which material goes in each cartridge?</h3></div></div>'+
   '<div class="pf-qc-vertical-layout"><div class="pf-rack-box">'+rack()+'</div>'+laneList+'</div>'+
   '<p class="pf-workflow-note"><strong>Important:</strong> This is a training layout for two CAL 1, two CAL 2 and two QC levels. Confirm each actual lane assignment on PATHFAST before dispensing. Calibration replicate and QC-lockout settings can change the analyzer-assigned order.</p>';
  h+='<div class="pf-selected-panel"><span class="pf-selected-dot"></span><strong>'+x+'</strong><span>CAL + QC · REVIEW 6 LANES</span></div>'+
   '<div class="pfux-cal-toolbar"><div><strong>Step '+currentStep+' of '+total+'</strong><span>Start with materials and cartridges, then use the screen</span></div><div class="pfux-cal-toolbar-actions"><button type="button" data-pf-browse aria-expanded="'+stepMenuOpen+'">Jump to step <span></span></button><button type="button" data-pf-toggle-all>'+(showAllSteps?'Focused view':'View all steps')+'</button></div></div>'+
   (stepMenuOpen?'<div class="pfux-cal-step-menu" role="group" aria-label="Choose calibration step">'+[
    'Gather kits and QC','Prepare CAL and Bio-Rad controls','Place cartridges in rack','Dispense into assigned sample wells','Rack, tips and waste box',
    'Close analyzer hood','Log in and check status','Back to operation menu','Select CAL/QC and assay','Verify lane assignments',
    'Press START','Confirm 17-min run','Review CAL and QC results','Print, file and return materials'
   ].map((label,i)=>'<button type="button" data-pf-jump="'+(i+1)+'" class="'+(currentStep===i+1?'active':'')+'"><b>'+String(i+1).padStart(2,'0')+'</b>'+label+'</button>').join('')+'</div>':'')+
   '<div class="pfux-cal-meter" role="progressbar" aria-label="Calibration procedure progress" aria-valuemin="1" aria-valuemax="'+total+'" aria-valuenow="'+currentStep+'"><span style="width:'+(currentStep/total*100)+'%"></span></div>';
  h+=step(1,'Gather assay cartridges, calibrators and Bio-Rad controls','Confirm the exact QC levels and vials for '+x,
      '<div class="pf-qc-prep-emphasis"><strong>Do this before logging in.</strong><span>Retrieve the matching six-cartridge assay kit, inspect cartridge packaging and expiration, and check that the two Bio-Rad control levels match the selected assay.</span></div>'+
      panelContent(group)+
      '<p class="pf-workflow-note">Bio-Rad control material: use the current lot-specific insert for frozen storage, thawing, mixing, open-vial stability and acceptable ranges. For BNP/NT-proBNP controls, check the latest revised insert. Do not assume all control products use the same preparation.</p>');
  h+=step(2,'Prepare CAL 1, both CAL 2 vials and the two QC controls','Separate the reagent-kit materials from the Bio-Rad controls',
      '<div class="pf-cal-prep-row">'+
      material('CAL 1 · ready-to-use','REFRIGERATED KIT','Use CAL 1 as supplied; assign to lanes 1 and 2.',svgCal1(),'cal1')+
      material('Two CAL 2 powder vials','REFRIGERATED KIT','Reconstitute each vial separately with its matching blue liquid diluent using the approved assay insert.',svgCal2(),'cal2')+
      material('Two blue diluents','REFRIGERATED KIT','Use one matching diluent vial per CAL 2 powder vial; confirm required volume and stability.',svgDiluent(),'diluent')+
      '</div>'+cal2MixIllustration()+'<h3 class="pf-material-heading">Bio-Rad QC vials · '+esc(group.qc)+'</h3>'+qcGallery(group)+
      '<div class="pf-qc-prep-emphasis"><strong>Prepare before loading cartridges.</strong><span>Thaw and gently mix each control as its lot-specific insert specifies; check for unsuitable material. Keep CAL 1, CAL 2 A, CAL 2 B, QC 1 and QC 2 separated and identified.</span></div>');
  h+=step(3,'Seat the cartridges in the upright six-lane rack','Place metal rack in clear loading base and insert six assay cartridges',
      laneMap+
      '<p class="pf-workflow-note">Confirm every cartridge matches the selected assay and is fully seated in its assigned vertical channel. At this stage, the clear front sample wells are still empty. Do not put liquids in the round detection wells.</p>');
  h+=step(4,'Dispense each calibrator and Bio-Rad control into its assigned sample well','Check the material by lane before using the transfer pipette',
      laneMap+
      '<p class="pf-workflow-note">Gently mix each material according to the corresponding insert. Fill only each cartridge’s clear front sample well to its assay-specific mark without bubbles or cross-contamination. Use a fresh tip for each transfer; never pipette into the separate round detection well.</p>');
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
  h+=step(8,'Return to the operation menu','Use BACK, then find CAL/QC/SAMPLE or CAL/QC',
      window.LAB_PATHFAST_SCREEN.home(group.label,"cal","back")+
      window.LAB_PATHFAST_SCREEN.menu("cal")+
      '<p class="pf-workflow-note">Choose the calibration/QC mode shown on your analyzer. If QC lockout is active, the available menu label can differ.</p>');
  h+=step(9,'Select '+x+' for calibration and QC','Confirm the assay and reagent lot',
      window.LAB_PATHFAST_SCREEN.item(group.label)+
      '<p class="pf-workflow-note">If the reagent lot is not registered, follow the instrument’s MC ENTRY registration instructions. Do not bypass lot checks.</p>');
  h+=step(10,'Verify actual CAL/QC lane assignments','Match the instrument’s six-lane screen to each prepared cartridge',
      window.LAB_PATHFAST_SCREEN.lanes("cal",group.label)+laneMap+
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
window.LAB_PATHFAST_UI={render:render,lanes:lanes,assays:groups.map(x=>x.id)};
})();