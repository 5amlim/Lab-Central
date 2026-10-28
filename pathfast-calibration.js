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
 {id:"cardiac",label:"hs-Troponin I + NT-proBNP",analytes:["hs-Troponin I","NT-proBNP"],qc:"Bio-Rad Cardiac Markers",detail:"Use Bio-Rad Cardiac controls for hs-Troponin I and NT-proBNP. Confirm both control levels and the current assay-specific assigned ranges."},
 {id:"ddimer",label:"D-dimer",analytes:["D-dimer"],qc:"Bio-Rad D-dimer",detail:"Use Bio-Rad D-dimer controls for the D-dimer assay. Verify QC levels, lot and assigned ranges against the current control insert."}
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
function svgQC(kind){
 const tint=kind==="cardiac"?"#ae3d49":"#855a9b",label=kind==="cardiac"?"CARDIAC":"D-DIMER";
 let out='<svg class="pf-material-svg" viewBox="0 0 210 146" role="img" aria-label="Two Bio-Rad '+label+' control vials, quality control levels 1 and 2" xmlns="http://www.w3.org/2000/svg">'+defs();
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
 return '<div class="pf-subtitle">CAL/QC menu status</div>'+
 '<div class="pf-analyte-states">'+group.analytes.map(function(a){
   return '<div class="pf-analyte-row"><strong>'+esc(a)+'</strong>'+
   '<div class="pf-state-strip"><div class="pf-state-box"><span class="pf-state-pill overdue">'+esc(a)+'</span><div><b>Pink · locked</b><small>28 days reached</small></div></div>'+
   '<span class="pf-state-arrow" aria-hidden="true">→</span>'+
   '<div class="pf-state-box"><span class="pf-state-pill ready">'+esc(a)+'</span><div><b>Gray · ready</b><small>Calibration and QC accepted</small></div></div></div></div>';
 }).join("")+'</div>';
}
function assay(group,index){
 const open=index===0?' open':'';
 return '<details class="pf-assay-dropdown" data-pf-assay="'+group.id+'"'+open+'>'+
 '<summary><span class="pf-assay-icon">'+(group.id==="cardiac"?"♥":"◈")+'</span>'+
 '<span class="pf-assay-summary"><strong>'+esc(group.label)+'</strong><small>Calibration materials and Bio-Rad QC · expand for instructions</small></span>'+
 '<span class="pf-assay-arrow">⌄</span></summary>'+
 '<div class="pf-assay-content">'+status(group)+
 '<h3 class="pf-material-heading">Calibration materials <small>Included in the reagent box</small></h3>'+
 '<div class="pf-material-grid">'+
 material('CAL 1','LIQUID · SPOUT BOTTLE','Ready-to-use liquid CAL 1. Load into lanes 1 and 2.',svgCal1(),'cal1')+
 material('CAL 2','2 GLASS VIALS','Both vials contain lyophilized powder. Reconstitute with matching diluent before loading lanes 3 and 4.',svgCal2(),'cal2')+
 material('Blue liquid diluent','2 BUFFER VIALS','Combine the supplied blue liquid diluent with each CAL 2 powder vial using the assay-specific mixing directions and volume.',svgDiluent(),'diluent')+
 '</div>'+
 '<div class="pf-mix-flow" aria-label="Reconstitution: two separate CAL 2 powder vials, each mixed with its corresponding blue diluent vial"><span>CAL 2 powder <b>× 2</b></span><strong>+</strong><span>Blue diluent <b>× 2</b></span><strong>→</strong><span class="pf-mix-result">Reconstituted CAL 2 <b>× 2</b></span></div>'+
 '<h3 class="pf-material-heading">Quality control <small>Bio-Rad</small></h3>'+
 '<div class="pf-material-grid pf-qc-grid">'+
 material(group.qc,'QC 1 + QC 2',group.detail,svgQC(group.id),group.id)+
 '<div class="pf-qc-note"><strong>QC loading</strong><p>Use '+esc(group.qc)+' for this assay group. Load QC 1 in lane 5 and QC 2 in lane 6. Confirm assigned ranges and acceptable results before patient testing.</p></div>'+
 '</div></div></details>';
}
const workflow=[
 ['Check the analyte status','Select the assay to calibrate. After 28 days, its menu pill turns pink and patient testing is locked.'],
 ['Confirm reagent lot and enter CAL/QC','If new lot, scan the kit MC ENTRY card as instructed. For existing lot, confirm reagent lot and select CAL/QC for the applicable assay.'],
 ['Prepare calibrators and controls','Use CAL 1 from the reagent box, reconstitute the two CAL 2 powder vials with their matching blue diluents, and select the correct Bio-Rad cardiac or D-dimer QC materials.'],
 ['Load the six-lane rack','CAL 1, CAL 1, CAL 2, CAL 2, QC 1, QC 2. Use sample preparation and volumes from the approved assay insert.'],
 ['Run the six cartridges','Slide cartridges into the rack until they click, insert rack and tips, close the cover and follow the analyzer START prompts.'],
 ['Review results and ready state','Accept calibration and both control levels using the current lot-specific criteria. The analyte pill turns gray after acceptable QC; if still pink, do not test patients.']
];
function render(){
 const w=workflow.map(function(item,i){return '<article class="pf-action"><span class="pf-action-no">'+String(i+1).padStart(2,'0')+'</span><div><h3>'+esc(item[0])+'</h3><p>'+esc(item[1])+'</p></div></article>';}).join("");
 return '<section class="pf-calibration-guide">'+
 '<div class="pf-calibration-heading"><div><span class="pf-eyebrow">PATHFAST · CALIBRATION AND QC</span><h2>28-day calibration + QC</h2><p>Calibration and QC are performed together using <strong>all six lanes</strong>. Select the assay group below to review its materials and analyzer status.</p></div><span class="pf-interval">↻ 28 DAYS</span></div>'+
 '<div class="pf-assay-list">'+groups.map(assay).join("")+'</div>'+
 '<div class="pf-rack-header"><div><span class="pf-eyebrow">SIX-LANE RACK</span><h3>Load the cartridges in this order</h3></div><span class="pf-rack-hint">Illustrated from above</span></div>'+
 '<div class="pf-rack-box">'+rack()+'<div class="pf-rack-foot"><span><b>1–4</b> Calibration in duplicate</span><span><b>5–6</b> Bio-Rad QC 1 and QC 2</span></div></div>'+
 '<div class="pf-steps-header"><h3>Combined CAL/QC procedure</h3><span>6 steps</span></div>'+
 '<div class="pf-actions">'+w+'</div>'+
 '<div class="pf-tip"><span class="pf-tip-icon">!</span><div><strong>Reconstitution and QC:</strong> Use the current analyte and lot-specific IFU for diluent volume, mixing, stability, calibration acceptance and QC target ranges. The diagrams are visual references, not validated preparation instructions.</div></div>'+
 '<div class="pf-bottom-actions"><button type="button" class="pf-video-button" data-gotab="videos">▶ Calibration + QC video</button><button type="button" class="pf-procedure-button" data-gotab="notes">Handling notes ↗</button></div>'+
 '<p class="source-footnote">Instrument material and rack illustrations are simplified and not to scale. Verify all operational steps against the approved PATHFAST instructions.</p></section>';
}
/* Keep both assay panels included when printing the guide. */
if(typeof window.addEventListener==='function'){
 let pfPrintPanels=[];
 window.addEventListener('beforeprint',function(){
  pfPrintPanels=Array.from(document.querySelectorAll('.pf-assay-dropdown')).map(function(node){return {node:node,open:node.open};});
  pfPrintPanels.forEach(function(entry){entry.node.open=true;});
 });
 window.addEventListener('afterprint',function(){
  pfPrintPanels.forEach(function(entry){entry.node.open=entry.open;});
  pfPrintPanels=[];
 });
}
window.LAB_PATHFAST_UI={render:render,lanes:lanes,assays:groups.map(x=>x.id)};
})();