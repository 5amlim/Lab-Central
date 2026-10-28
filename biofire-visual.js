/* BioFire FilmArray TORCH and SPOTFIRE training visuals.
   Original SVG illustrations of the pouch station, vials and screen sequence.
   Red sample well LEFT, blue hydration well RIGHT, as viewed in the
   manufacturer pouch-loading-station diagrams. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function svg(body,label){return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(label)+'" viewBox="0 0 920 400">'+body+'</svg>';}
function text(x,y,s,size=15,color="#326780",anchor="middle",weight="800"){return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+weight+'" fill="'+color+'">'+esc(s)+'</text>';}
function vial(x,color,material,mode){
 const blue=color==="blue",ink=blue?"#188ac5":"#c44f59",fill=blue?"#81c5e8":"#cc6d76";
 const needle=mode==="needle"||mode==="port";
 return '<g transform="translate('+x+' 0)">'+
 '<ellipse cx="60" cy="323" rx="55" ry="8" fill="#dfe9ee"/>'+
 '<rect x="35" y="121" width="50" height="173" rx="12" fill="#edf7fb" fill-opacity=".8" stroke="#8baebf" stroke-width="3"/>'+
 '<path d="M39 203 H81 V277 Q59 291 39 277Z" fill="'+fill+'" opacity=".45"/>'+
 '<rect x="30" y="105" width="60" height="30" rx="9" fill="'+ink+'" stroke="#6e91a3" stroke-width="2"/>'+
 '<path d="M35 110h50" stroke="#fff" opacity=".6" stroke-width="2"/>'+
 '<rect x="42" y="174" width="37" height="40" rx="4" fill="#fff" opacity=".95"/>'+
 text(60,190,blue?"HYDR.":"SAMPLE",9,"#41687a")+
 text(60,203,"INJECTION",7.5,"#41687a")+
 (needle?'<path d="M60 105 V71" stroke="#8da5b1" stroke-width="8" stroke-linecap="round"/><path d="M60 72v-24" stroke="#91a1ac" stroke-width="3"/>':'')+
 text(60,345,material,13,blue?"#237d9f":"#ac4a58")+'</g>';
}
function stationBase(){
 return '<ellipse cx="492" cy="333" rx="275" ry="18" fill="#e1eaee"/>'+
 '<path d="M232 182 L350 114 L685 119 L789 181 L695 291 L349 291Z" fill="#27313a" stroke="#6b7e8e" stroke-width="5"/>'+
 '<path d="M233 182 L349 291 L349 317 L232 207Z" fill="#18232c" stroke="#526877" stroke-width="3"/>'+
 '<path d="M349 291 L695 291 L695 316 L349 317Z" fill="#232c35" stroke="#526877" stroke-width="3"/>'+
 '<path d="M350 125 L685 129 L747 175 L317 176Z" fill="#1b2730"/>'+
 '<path d="M358 187 H681 L690 258 H350Z" fill="#3e4b56" stroke="#91a8b5" stroke-width="2"/>'+
 '<rect x="385" y="195" width="263" height="55" rx="4" fill="#edf3f5" stroke="#adbec7" stroke-width="3"/>'+
 Array.from({length:12},(_,i)=>'<rect x="'+(393+i*20)+'" y="203" width="12" height="39" rx="3" fill="#c6dfe9" stroke="#aac4cf"/>').join("")+
 '<path d="M490 258 H572" stroke="#71a6bf" stroke-width="4"/>'+
 '<circle cx="370" cy="162" r="21" fill="#b64f5b" stroke="#efacb3" stroke-width="5"/>'+
 '<circle cx="655" cy="162" r="21" fill="#2b93c1" stroke="#a7d9ea" stroke-width="5"/>'+
 text(370,94,"SAMPLE",15,"#ad4954")+text(370,111,"RED • LEFT",11,"#ad4954")+
 text(655,94,"HYDRATION",15,"#2585ac")+text(655,111,"BLUE • RIGHT",11,"#2585ac");
}
function station(mode){
 let vials="";
 if(mode==="ready"){vials=vial(308,"red","Sample vial","normal").replace('translate(308 0)','translate(310 -90)')+vial(598,"blue","Hydration vial","normal").replace('translate(598 0)','translate(597 -90)');}
 if(mode==="hydrate"){vials=vial(598,"blue","Hydration vial","needle").replace('translate(598 0)','translate(594 -110)')+'<path d="M665 201 l-12 28 l12 -6 l12 6Z" fill="#2585ac"/>';}
 if(mode==="sample"){vials=vial(308,"red","Sample vial","needle").replace('translate(308 0)','translate(309 -100)');}
 return svg(stationBase()+vials+
 (mode==="ready"?'<rect x="43" y="245" width="183" height="50" rx="10" fill="#f2f8fa" stroke="#c5dde5"/>'+text(134,265,"SET VIALS IN",13)+text(134,283,"THE MATCHING WELLS",12):'')+
 (mode==="hydrate"?'<path d="M728 160 L795 134 H882" stroke="#268bac" stroke-width="3" fill="none"/>'+text(822,125,"PUNCTURE BLUE PORT",12):'')+
 (mode==="sample"?'<path d="M303 154 L241 127 H129" stroke="#bd5e69" stroke-width="3" fill="none"/>'+text(133,118,"SAMPLE INTO RED PORT",12):''),
 "BioFire pouch loading station with red sample well on left and blue hydration well on right");
}
function kit(){
 const h=stationBase()+
 vial(8,"red","Red sample vial","normal")+vial(786,"blue","Blue hydration vial","normal")+
 '<path d="M115 55 V169" stroke="#a2b6bf" stroke-width="5" fill="none"/>'+
 '<path d="M137 68 V152" stroke="#93aab6" stroke-width="5"/>'+
 '<path d="M132 147 L140 165 L145 147" fill="#c9dce3"/>'+
 text(70,54,"SAMPLE VIAL",12,"#b3535e")+text(845,54,"HYDRATION VIAL",12,"#2684aa")+
 '<rect x="404" y="38" width="188" height="45" rx="8" fill="#eaf4f7" stroke="#c6dde6"/>'+text(498,57,"PUCH + LOADING",13)+text(498,73,"STATION",12);
 return svg(h,"BioFire reagent kit and separate sample and hydration injection vials");
}
function pipette(){
 const h=stationBase()+
 vial(307,"red","Sample vial","normal").replace('translate(307 0)','translate(307 -94)')+
 '<path d="M170 40 L302 196" stroke="#a3bbc7" stroke-width="14" stroke-linecap="round"/>'+
 '<path d="M174 48 L282 177" stroke="#fff" stroke-width="6"/>'+
 '<path d="M282 177L299 200" stroke="#9babb9" stroke-width="4"/>'+
 '<path d="M282 183L301 204" stroke="#c34d62" stroke-width="4"/>'+
 '<rect x="12" y="96" width="165" height="106" rx="13" fill="#f6fbfd" stroke="#d2e3ea"/>'+
 '<path d="M58 130 h34 v46 h-34Z" fill="#eaf4f8" stroke="#9bb7c4" stroke-width="3"/>'+
 '<path d="M61 156 h28 v17h-28Z" fill="#c7a873" opacity=".65"/>'+
 text(95,116,"SAMPLE BUFFER",12)+text(95,189,"+ SPECIMEN",12);
 return svg(h,"BioFire specimen transfer pipette and sample buffer into red injection vial");
}
function analyzer(id){
 const torch=id==="torch";
 let body='<ellipse cx="490" cy="350" rx="300" ry="20" fill="#e1e9ed"/>';
 if(torch){
 body+='<path d="M240 124 L280 95 L672 95 L724 130 L724 303 Q699 332 656 334 H279 Q240 319 240 291Z" fill="#e4e9ec" stroke="#95a9b7" stroke-width="5"/>'+
 '<path d="M240 124 L280 95 L328 95 L328 332 L276 328 Q243 322 240 290Z" fill="#555b65"/>'+
 '<path d="M324 112 H675 L688 267 H324Z" fill="#f3f5f5" stroke="#9aadb5" stroke-width="3"/>'+
 Array.from({length:4},(_,i)=>{const x=335+(i%2)*168,y=116+Math.floor(i/2)*71;return '<g><rect x="'+x+'" y="'+y+'" width="151" height="63" rx="8" fill="#f8fbfb" stroke="#b0c3cc" stroke-width="2"/><path d="M'+(x+15)+' '+(y+22)+' H'+(x+38)+'" stroke="#d05256" stroke-width="5"/><rect x="'+(x+17)+'" y="'+(y+13)+'" width="25" height="31" rx="3" fill="#222f39"/></g>';}).join("")+
 '<path d="M528 258 L690 250 L715 311 L558 330Z" fill="#dee9ec" stroke="#94aab5" stroke-width="3"/>'+
 '<path d="M559 261 L679 255 L695 298 L574 303Z" fill="#202f3b" stroke="#4e6779" stroke-width="3"/>'+
 '<path d="M574 271 L672 267 L682 290 L584 292Z" fill="#d1eaf0"/>'+
 text(386,314,"BIOFIRE",17,"#e4eeee");
 }else{
 body+='<rect x="270" y="105" width="296" height="224" rx="15" fill="#eff4f6" stroke="#8da5b4" stroke-width="5"/>'+
 Array.from({length:4},(_,i)=>'<rect x="287" y="'+(124+i*43)+'" width="170" height="34" rx="5" fill="#fbfcfc" stroke="#a8bec9" stroke-width="2"/><path d="M304 '+(141+i*43)+' h26" stroke="#3f424d" stroke-width="6"/>').join("")+
 '<path d="M480 116 L646 109 L662 321 L480 328Z" fill="#dfe9ef" stroke="#9aafbb" stroke-width="4"/>'+
 '<rect x="502" y="137" width="141" height="156" rx="6" fill="#1f3d50"/>'+
 '<rect x="511" y="153" width="122" height="124" rx="3" fill="#e5f1f4"/>'+
 text(572,184,"SPOTFIRE",13,"#3c7184")+text(572,205,"AVAILABLE",11,"#49899c")+
 '<rect x="536" y="229" width="71" height="28" rx="5" fill="#b7dce6"/>';
 }
 return svg(body,"BioFire "+(torch?"FilmArray TORCH modular instrument with front loading modules and sloped touchscreen":"SPOTFIRE system with modular drawer units and upright display"));
}
function ui(id,index){
 const torch=id==="torch";
 const states=[
  {title:"Home / available",option:torch?"Available modules":"Available modules",choices:["Home","Available","Running"],focus:"Available"},
  {title:"Identify the pouch",option:"Scan pouch barcode",choices:["Scan pouch barcode","Enter / scan sample ID","Back"],focus:"Scan pouch barcode"},
  {title:"Confirm panel and identification",option:torch?"GI panel":"Respiratory / Sore Throat",choices:[torch?"GI panel":"Select correct panel","Patient / specimen ID","Continue"],focus:"Continue"},
  {title:"Load pouch and start",option:"Ready to run",choices:["Verify pouch and module","Start Run","Back"],focus:"Start Run"}
 ][index]||{};
 return svg('<rect x="205" y="24" width="510" height="356" rx="24" fill="#e4edf2" stroke="#96b0be" stroke-width="8"/>'+
 '<rect x="232" y="48" width="456" height="303" rx="10" fill="#eaf5f7" stroke="#b6d2dc" stroke-width="3"/>'+
 '<rect x="232" y="48" width="456" height="48" rx="8" fill="#233c4d"/>'+
 text(461,79,torch?"BIOFIRE FILMARRAY TORCH":"BIOFIRE SPOTFIRE",19,"#f5fbfc")+
 text(460,126,states.title?.toUpperCase(),16,"#356982")+
 (states.choices||[]).map((x,i)=>'<g><rect x="308" y="'+(147+i*60)+'" width="305" height="45" rx="8" fill="'+(x===states.focus?"#e3f3ef":"#fff")+'" stroke="'+(x===states.focus?"#238b7c":"#bdcfd8")+'" stroke-width="'+(x===states.focus?"3":"2")+'"/>'+text(462,175+i*60,x,15,x===states.focus?"#217668":"#527588")+'</g>').join("")+
 '<rect x="210" y="355" width="501" height="24" rx="8" fill="#a0b4be"/>',
 "Illustrative "+(torch?"TORCH":"SPOTFIRE")+" navigation view "+(index+1));
}
function figure(title,desc,picture){
 return '<figure class="biofire-training-figure"><div class="biofire-training-title"><strong>'+esc(title)+'</strong><span>ORIGINAL SCHEMATIC</span></div><div class="biofire-training-image">'+picture+'</div><figcaption>'+esc(desc)+'</figcaption></figure>';
}
function stageVisual(id,title){
 if(id!=="torch"&&id!=="spotfire")return "";
 const t=String(title).toLowerCase(),torch=id==="torch";let figs=[];
 if(/gather|retrieve|materials/.test(t))figs=[figure("Test kit and both injection vials","Hydration is blue, sample is red. Follow the assay-specific reagent kit.",kit())];
 else if(/loading station|prepare pouch/.test(t))figs=[figure("Prepare pouch loading station","Set the red sample vial in the left well and blue hydration vial in the right well, as viewed from the illustrated operator position.",station("ready"))];
 else if(/hydrate/.test(t))figs=[figure("Hydrate through blue port","Remove the blue vial from its cover and puncture the designated blue hydration port. Confirm the pouch hydrates.",station("hydrate"))];
 else if(/sample.*buffer|mix specimen|prepare specimen/.test(t))figs=[figure("Prepare specimen in red vial","Transfer sample and buffer into the red sample injection vial in the order and amounts specified for this particular panel.",pipette())];
 else if(/inject sample|load sample mix/.test(t))figs=[figure("Load red sample mixture","Puncture the red sample port with the prepared sample injection vial. Verify sample is drawn into the pouch.",station("sample"))];
 else if(/available module/.test(t))figs=[
   figure("Instrument and available modules","Identify an available module on the actual analyzer before loading the prepared pouch.",analyzer(id)),
   figure("Open available module","Select an available module from the analyzer interface.",ui(id,0))
 ];
 else if(/scan pouch barcode/.test(t))figs=[figure("Scan pouch barcode","Scan the barcoded pouch and match the panel/lot information displayed.",ui(id,1))];
 else if(/confirm panel|verify sample id/.test(t))figs=[figure("Verify panel and identifiers","Confirm the intended panel, pouch and specimen or QC identifiers before running.",ui(id,2))];
 else if(/start assay|start run|load.*module/.test(t))figs=[figure("Insert pouch and start the run","Follow the on-screen loading prompt for the correct module, then verify information and choose START.",ui(id,3))];

 if(!figs.length)return "";
 return '<section class="biofire-training" aria-label="BioFire illustrated preparation"><div class="biofire-training-grid">'+figs.join("")+'</div></section>';
}
window.LAB_BIOFIRE_ART={stageVisual,station,kit,analyzer,ui};
})();