/* BioFire FilmArray TORCH and SPOTFIRE training visuals.
   Original SVG illustrations of the pouch station, vials and screen sequence.
   Red sample well LEFT, blue hydration well RIGHT, as viewed in the
   manufacturer pouch-loading-station diagrams. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function svg(body,label){return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(label)+'" viewBox="0 0 920 400">'+body+'</svg>';}
function text(x,y,s,size=15,color="#326780",anchor="middle",weight="800"){return '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+weight+'" fill="'+color+'">'+esc(s)+'</text>';}

/* Injection vials are drawn apart from the station during mixing.
   The red and blue caps remain in the matching loading-station wells
   when the vial is removed for pouch puncture. */
/* One loading station shared by TORCH and SPOTFIRE kit illustrations.
   User-supplied photo: low black clamshell loading base; red circular socket
   on operator LEFT, blue circular socket on RIGHT; translucent front pouch
   holder and central white FilmArray mark. White-capped CLEAR injection vials,
   not solid red/blue bottles, with narrow assay-color bands and printed labels.
   Diagrams represent orientation only. Assay IFU controls exact vial handling. */
function vial(x,color,material,mode,y=62){
 const blue=color==="blue",cap=blue?"#267eae":"#c64350",word=blue?"HYDRATION":"SAMPLE";
 const open=mode==="open",active=mode==="needle";
 return '<g transform="translate('+x+' '+y+')">'+
 '<ellipse cx="44" cy="183" rx="28" ry="5" fill="#d7e4ea" opacity=".45"/>'+
 // Slim clear body rather than a tall solid-color tube.
 '<path d="M22 54L25 165Q26 181 42 182H47Q63 181 64 165L67 54Z" fill="#eef5f4" fill-opacity=".84" stroke="#91abb7" stroke-width="2.8"/>'+
 '<path d="M26 59H63M28 81H60M29 160H60" stroke="#fff" stroke-width="3" opacity=".83"/>'+
 '<path d="M29 129H60V162Q57 176 45 176Q32 176 30 163Z" fill="'+(blue?"#bedce9":"#e8c4c6")+'" opacity=".52"/>'+
 // Printed vial label and correctly colored small band.
 '<rect x="26" y="83" width="38" height="48" rx="3" fill="#fcfdfd" stroke="#d5e0e3" stroke-width="1.3"/>'+
 '<rect x="27" y="84" width="36" height="5" fill="'+cap+'"/>'+
 text(45,101,word,8.5,cap)+
 text(45,113,"INJECTION",7.2,"#637d87")+
 '<path d="M32 121H57" stroke="#c0cdd2" stroke-width="1.6"/>'+
 '<path d="M35 72H55" stroke="'+cap+'" stroke-width="5" stroke-linecap="round"/>'+
 // Narrow white collar sits below a broad flattened white cap, per photograph.
 '<rect x="30" y="41" width="30" height="21" rx="8" fill="#f6f9f7" stroke="#b9c8c8" stroke-width="2"/>'+
 (open?
 '<ellipse cx="45" cy="42" rx="17" ry="6" fill="#eaf4f6" stroke="#9db8c0" stroke-width="2.5"/>'+
 '<ellipse cx="45" cy="42" rx="9" ry="3" fill="#708f9d"/>':
 '<path d="M4 33Q4 24 16 22L65 19Q84 20 87 30L80 37L12 39Z" fill="#fafcfa" stroke="#c4cfcd" stroke-width="2.2"/>'+
 '<ellipse cx="45" cy="24" rx="36" ry="6" fill="#fff" stroke="#d0d9d6" stroke-width="1.5"/>'+
 '<rect x="35" y="34" width="22" height="12" rx="5" fill="#f4f7f5" stroke="#cbd6d6" stroke-width="1.6"/>')+
 (active?'<path d="M43 180V191" fill="none" stroke="'+cap+'" stroke-width="3" stroke-dasharray="3 3"/>':'')+
 '</g>';
}
function stationBase(){
 // An open-front black base with the pouch laid HORIZONTALLY across the
 // transparent retaining frame. Nothing here is the analyzer itself.
 return '<defs>'+
 '<linearGradient id="bfstation-case" x1="0" y1="0" x2=".8" y2="1">'+
 '<stop stop-color="#393d40"/><stop offset=".55" stop-color="#151a1d"/><stop offset="1" stop-color="#101519"/></linearGradient>'+
 '<linearGradient id="bfstation-pouch" x1="0" x2=".85" y1="0" y2="1">'+
 '<stop stop-color="#f8f5e9"/><stop offset=".55" stop-color="#dadacb"/><stop offset="1" stop-color="#c1c9c6"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="466" cy="361" rx="327" ry="11" fill="#dce7ec" opacity=".52"/>'+
 // Rear tray lip and top platform, very wide and flat.
 '<path d="M157 162Q157 145 180 145H746Q769 145 776 161L790 260H146Z" fill="url(#bfstation-case)" stroke="#495358" stroke-width="4"/>'+
 '<path d="M167 159L751 159L761 237H161Z" fill="#222629" stroke="#373f43" stroke-width="2"/>'+
 '<path d="M176 174H747" stroke="#5f6668" stroke-width="2" opacity=".63"/>'+
 // White FilmArray-style mark at center of black top.
 [0,1,2,3,4].map(i=>{
   const y=182+i*9;
   return '<path d="M'+(445-i*3)+' '+y+'l24 -7 16 5 -24 8Z" fill="#f7faf8"/>'+
   '<path d="M'+(477+i*2)+' '+y+'l-16 8 24 4 16 -8Z" fill="#f7faf8"/>';
 }).join('')+
 // Circular sockets with red left and blue right, held around vial bases.
 '<ellipse cx="253" cy="218" rx="35" ry="18" fill="#a63140" stroke="#d45964" stroke-width="4"/>'+
 '<ellipse cx="253" cy="218" rx="22" ry="10" fill="#282023" stroke="#e06973" stroke-width="3"/>'+
 '<ellipse cx="679" cy="218" rx="35" ry="18" fill="#155c94" stroke="#367cb9" stroke-width="4"/>'+
 '<ellipse cx="679" cy="218" rx="22" ry="10" fill="#192b37" stroke="#4c96cf" stroke-width="3"/>'+
 // Transparent horizontal pouch cassette is visible in the forward holder.
 '<path d="M176 230H763L768 308Q764 321 751 322H184Q171 322 168 308Z" fill="#171b1d" stroke="#525b5f" stroke-width="4"/>'+
 '<path d="M226 238H711Q729 238 731 249V301Q729 309 712 310H226Q213 307 211 298V252Q211 238 226 238Z" fill="#a6b7b8" fill-opacity=".5" stroke="#879a9d" stroke-width="3"/>'+
 '<rect x="230" y="248" width="478" height="51" rx="5" fill="url(#bfstation-pouch)" stroke="#bac9c7" stroke-width="2"/>'+
 '<rect x="242" y="253" width="463" height="42" rx="3" fill="#fff8e8" fill-opacity=".61" stroke="#d0c7ad"/>'+
 '<rect x="253" y="256" width="158" height="35" rx="2" fill="#fffdf6" stroke="#c3bdaa"/>'+
 text(329,270,"FilmArray panel",10,"#4e5b61")+
 text(329,285,"POUCH / LOT",8.6,"#60737b")+
 '<rect x="435" y="257" width="154" height="25" rx="2" fill="#ece7d4" stroke="#c9c4b4"/>'+
 text(512,274,"SAMPLE ID",10,"#596970")+
 '<rect x="260" y="287" width="33" height="5" fill="#b94350"/>'+
 '<rect x="635" y="287" width="33" height="5" fill="#247fad"/>'+
 // Transparent hinge, locking arm and colored port arrows.
 '<path d="M201 241H227V308H199Z" fill="#dce9ea" fill-opacity=".52" stroke="#7b939c" stroke-width="2"/>'+
 '<path d="M720 242H740V305H721Z" fill="#dce9ea" fill-opacity=".48" stroke="#7b939c" stroke-width="2"/>'+
 '<path d="M201 314H744V336H201Z" fill="#25292c" stroke="#69767c" stroke-width="3"/>'+
 '<path d="M185 327H770L758 348H197Z" fill="#12191c" stroke="#4c565c" stroke-width="3"/>'+
 '<path d="M248 337v-23m-8 8 8 -9 8 9" fill="none" stroke="#d24450" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<path d="M687 337v-23m-8 8 8 -9 8 9" fill="none" stroke="#268bc3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<path d="M198 348H760" stroke="#6b777a" stroke-width="3"/>';
}
function station(mode="ready"){
 const m=String(mode||"ready").toLowerCase();
 const isHydrate=m==="hydrate",isSample=m==="sample";
 const label=isHydrate?"HYDRATION PORT · BLUE":isSample?"SAMPLE PORT · RED":"RED SAMPLE LEFT · BLUE HYDRATION RIGHT";
 const active=isHydrate?'<path d="M695 124Q759 148 725 213Q710 239 687 251" fill="none" stroke="#2384b5" stroke-width="4" stroke-dasharray="9 7" stroke-linecap="round"/>'+
 '<path d="M676 238l11 15 13 -12" fill="none" stroke="#2384b5" stroke-width="4"/>':
 isSample?'<path d="M232 125Q161 155 196 214Q206 240 247 251" fill="none" stroke="#c44f5c" stroke-width="4" stroke-dasharray="9 7" stroke-linecap="round"/>'+
 '<path d="M232 239l15 14 9 -15" fill="none" stroke="#c44f5c" stroke-width="4"/>':'';
 const h=stationBase()+
 // Both actual white/clear injection vials remain illustrated. The arrows in
 // hydrate/sample views illustrate the destination of the removed vial.
 vial(208,"red","Red sample vial","normal",29)+
 vial(634,"blue","Blue hydration vial","normal",29)+
 active+
 '<rect x="315" y="57" width="300" height="36" rx="14" fill="#f3f9fa" stroke="#bfd6df" stroke-width="2"/>'+
 text(465,80,label,15,isHydrate?"#277eaa":isSample?"#b5485a":"#356c7e");
 return svg(h,
 "BioFire TORCH and SPOTFIRE photo-reference pouch loading station: flat black base, horizontal pouch in clear holder, white-capped RED sample injection vial on the left and WHITE-capped BLUE hydration injection vial on the right. "+(isHydrate?"Blue hydration destination is emphasized.":isSample?"Red sample destination is emphasized.":"Both vials are pictured upright."));
}
function pipetteShape(x,y){
 return '<g transform="translate('+x+' '+y+') rotate(28 10 94)">'+
 '<path d="M7 4L10 104" stroke="#a2b4be" stroke-width="15" stroke-linecap="round"/>'+
 '<path d="M7 4L10 104" stroke="#f5fbfc" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M10 103L10 139" stroke="#a6b8c1" stroke-width="5"/>'+
 '<path d="M10 120L10 141" stroke="#c04757" stroke-width="3"/>'+
 '<path d="M2 42H19M2 63H19M2 82H19" stroke="#799dab" stroke-width="2.5"/>'+
 '</g>';
}
function kit(){
 const scene=stationBase()+
 vial(208,"red","Red sample vial","normal",29)+
 vial(634,"blue","Blue hydration vial","normal",29)+
 '<rect x="288" y="48" width="352" height="41" rx="12" fill="#f4f9fb" stroke="#bdd5df" stroke-width="2"/>'+
 text(464,74,"POUCH + BOTH INJECTION VIALS",16,"#315e74");
 return svg(scene,
 "BioFire TORCH and SPOTFIRE kit: actual-style black pouch loading station with a horizontal pouch in the transparent front holder; separate transparent white-capped sample injection vial in RED left well and hydration vial in BLUE right well.");
}
/* Panel-specific sample volume and sequence must match the assay IFU.
   FilmArray GI: buffer first, then 0.2 mL stool in Cary Blair.
   SpotFire R: specimen with fixed-volume pipette, then buffer. */
function sampleBufferTube(x,y){
 return '<g transform="translate('+x+' '+y+')">'+
 '<path d="M20 24H63L60 111Q58 125 48 129H35Q26 125 24 111Z" fill="#f6fbfd" stroke="#91adb9" stroke-width="3"/>'+
 '<path d="M27 79H57L55 114Q43 123 30 114Z" fill="#dfc39e" opacity=".87"/>'+
 '<path d="M28 46H57V75H28Z" fill="#fff" stroke="#dae9ef"/>'+
 text(42,58,"SAMPLE",9,"#446c80")+text(42,69,"BUFFER",9,"#446c80")+
 '<path d="M20 25L17 15L29 7H54L66 16L62 26Z" fill="#e3eef2" stroke="#8aa8b9" stroke-width="3"/>'+
 '<path d="M61 18L77 3L85 11L68 30Z" fill="#b1c9d3" stroke="#7f9eab" stroke-width="3"/>'+
 '<path d="M76 4L85 11" stroke="#fff" stroke-width="3"/>'+
 '<path d="M44 125L45 150" stroke="#8aabb8" stroke-width="6"/>'+
 '<path d="M44 147L45 165" stroke="#dbc09a" stroke-width="3"/>'+
 '</g>';
}
function pipette(id){
 const spotfire=id==="spotfire";
 const first='<rect x="26" y="32" width="423" height="335" rx="17" fill="#f8fbfd" stroke="#dce8ef" stroke-width="2"/>'+
 text(237,64,spotfire?"1 · ADD SPECIMEN":"1 · ADD SAMPLE BUFFER",18,"#286e85")+
 vial(274,"red","Red injection vial","open",104)+
 (spotfire?pipetteShape(139,86):sampleBufferTube(123,83))+
 '<path d="M215 226L267 233" stroke="#3198a2" stroke-width="3" stroke-dasharray="7 4"/>'+
 text(235,343,spotfire?"Fixed-volume transfer pipette (R panel)":"Pinch the textured snap tab · squeeze twice",12,"#5e7d8d");
 const second='<rect x="467" y="32" width="423" height="335" rx="17" fill="#f8fbfd" stroke="#dce8ef" stroke-width="2"/>'+
 text(679,64,spotfire?"2 · ADD SAMPLE BUFFER":"2 · ADD SPECIMEN",18,"#286e85")+
 vial(595,"red","Red injection vial","open",104)+
 (spotfire?sampleBufferTube(757,83):pipetteShape(736,88))+
 '<path d="M732 232L656 250" stroke="#ba5664" stroke-width="3" stroke-dasharray="7 4"/>'+
 text(680,343,spotfire?"Open snap tab; squeeze entire buffer":"GI specimen in Cary Blair · 2nd mark (0.2 mL)",12,"#5e7d8d");
 return svg(first+second,spotfire?
 "SPOTFIRE R panel: transfer fixed volume of specimen into red vial first, then snap open sample buffer tube and squeeze full amount into same vial":
 "FilmArray GI: hold sample buffer tube tip up and snap textured plastic tab, dispense buffer first into red vial and add 0.2 mL well-mixed Cary Blair specimen");
}
function invert(){
 // Both positions now use the SAME white-capped, clear red-injection vial
 // geometry found in the pictured loading station.
 const left=vial(146,"red","Capped red sample vial","normal",75);
 const right='<g transform="rotate(180 630 175)">'+vial(585,"red","Inverted red sample vial","normal",80)+'</g>';
 return svg('<rect x="58" y="20" width="804" height="354" rx="18" fill="#f8fcfd" stroke="#d7e8ef"/>'+
 left+right+
 '<path d="M374 158C414 57 523 60 553 146" fill="none" stroke="#238d92" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M535 128L554 157L563 128" fill="none" stroke="#238d92" stroke-width="7" stroke-linecap="round"/>'+
 text(461,58,"GENTLY INVERT 3 TIMES",22,"#247d83")+
 text(461,334,"Close red vial tightly first · do not shake",15,"#577f90"),
 "Same white-capped BioFire red sample injection vial shown upright and inverted three times; no vigorous shaking");
}
/* FilmArray TORCH benchtop hardware uses one consistent reference drawing.
   Photo: two large upper module fronts, red L-shaped inset handles, left pouch
   dock, broad near-black lower touchscreen, red perimeter and front USB.
   Status highlights are teaching overlays, not claims about exact firmware UI. */
function torchChassis(state){
 const mode=String(state||"ready").toLowerCase();
 const selected=/selected|load|insert/.test(mode),running=/running|start|analy/.test(mode);
 const result=/result|review|complete/.test(mode);
 const txt=(x,y,t,size=13,fill="#516b79",weight=800,anchor="middle")=>
  '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" fill="'+fill+'" font-size="'+size+'" font-weight="'+weight+'" font-family="Arial,sans-serif">'+t+'</text>';
 const doors=[{x:160},{x:480}].map((d,i)=>{
  const x=d.x,fill=i===0&&selected?"#fcfdfc":"#f7f9f8";
  return '<g>'+
   '<rect x="'+x+'" y="57" width="311" height="143" rx="11" fill="#b72f40" stroke="#8e2733" stroke-width="3"/>'+
   '<rect x="'+(x+6)+'" y="63" width="299" height="132" rx="9" fill="'+fill+'" stroke="#c9d1d3" stroke-width="2"/>'+
   // Highlight is an instructional overlay only when a module is being selected.
   (i===0&&selected?'<rect x="'+(x+3)+'" y="60" width="305" height="137" rx="10" fill="none" stroke="#2c9b88" stroke-width="4" stroke-dasharray="10 6"/>':'')+
   '<path d="M'+(x+82)+' 96h45v20h-27v55" fill="none" stroke="#871c32" stroke-width="19" stroke-linecap="square" stroke-linejoin="miter"/>'+
   '<path d="M'+(x+82)+' 96h45v20h-27v55" fill="none" stroke="#251e25" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter"/>'+
   '<rect x="'+(x+154)+'" y="101" width="4" height="67" rx="2" fill="#57545b"/>'+
   '<path d="M'+(x+7)+' 75H'+(x+304)+'" fill="none" stroke="#fff" stroke-width="2" opacity=".66"/>'+
   '</g>';
 }).join("");
 let h='<defs>'+
 '<linearGradient id="lc-torch-frame" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#767c7f"/><stop offset=".50" stop-color="#52585e"/><stop offset="1" stop-color="#292e33"/></linearGradient>'+
 '<linearGradient id="lc-torch-surface" x1=".15" y1="0" x2=".85" y2="1"><stop stop-color="#f9fbfa"/><stop offset=".6" stop-color="#e9eeed"/><stop offset="1" stop-color="#c7d2d1"/></linearGradient>'+
 '<linearGradient id="lc-torch-display" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#31383f"/><stop offset=".5" stop-color="#171e26"/><stop offset="1" stop-color="#090e15"/></linearGradient>'+
 '</defs>'+
 '<ellipse cx="480" cy="383" rx="372" ry="10" fill="#cfdee5" opacity=".65"/>'+
 // Gray housing and top overhang.
 '<path d="M146 39Q136 40 135 54L112 327Q107 365 151 371H803Q849 368 836 326L819 56Q817 38 805 38Z" fill="url(#lc-torch-frame)" stroke="#707a80" stroke-width="4"/>'+
 '<path d="M148 38H804L817 45H137Z" fill="#343a3e"/>'+
 '<rect x="132" y="27" width="691" height="18" rx="7" fill="#646b70" stroke="#4f595e" stroke-width="2"/>'+
 '<path d="M149 31H803" stroke="#aab2b4" stroke-width="2" opacity=".57"/>'+
 // Upper two modules, matching the photograph instead of eight fictitious tiles.
 doors+
 '<path d="M156 205H796V227H157Z" fill="#cfd3d2" stroke="#9fa9aa" stroke-width="3"/>'+
 '<path d="M156 214H795" stroke="#f7f9f7" stroke-width="3" opacity=".82"/>'+
 // Lower sloped surface, red outer border and rounded gray case.
 '<path d="M153 228H794L823 327Q831 352 800 355H148Q122 353 130 323Z" fill="#b73346" stroke="#ab3748" stroke-width="4"/>'+
 '<path d="M164 233H784L810 324Q816 344 795 345H150Q137 343 142 326Z" fill="url(#lc-torch-surface)" stroke="#d4d9d8" stroke-width="3"/>'+
 // Pouch loading dock/reader cover sits LEFT of the touchscreen, as photographed.
 '<path d="M185 317Q191 264 207 257Q235 242 333 248Q356 250 362 278L369 331H174Z" fill="#eceee9" stroke="#d2d7d2" stroke-width="3"/>'+
 '<path d="M179 331H373Q364 314 344 309H210Q189 309 179 331Z" fill="#41484c" stroke="#798589" stroke-width="2"/>'+
 '<path d="M184 329Q207 317 227 319H331Q358 316 368 329" fill="none" stroke="#a8ada9" stroke-width="3"/>'+
 txt(264,280,"BIOFIRE",13,"#8d3f47",850)+
 txt(263,296,"POUCH DOCK",11,"#76828a",730)+
 // Main dark tilted touchscreen, right side and recessed under a narrow bezel.
 '<path d="M421 244L751 242L783 335H394Z" fill="#151b21" stroke="#515d65" stroke-width="4"/>'+
 '<path d="M433 251L743 250L767 326H408Z" fill="url(#lc-torch-display)" stroke="#313d44" stroke-width="2"/>'+
 '<path d="M456 259L728 254" stroke="#99a4a9" stroke-width="2" opacity=".12"/>'+
 // FilmArray Torch wordmark and front center vented chassis.
 txt(231,238,"FilmArray® torch",16,"#994550",730,"start")+
 '<path d="M150 355H802Q808 355 805 365Q798 382 780 383H170Q149 383 146 364Z" fill="#252b30" stroke="#4f5b63" stroke-width="3"/>'+
 Array.from({length:30},(_,i)=>{
   const x=195+i*19;
   return '<rect x="'+x+'" y="369" width="11" height="3.2" rx="1.2" fill="#11191e"/>';
 }).join("")+
 '<rect x="444" y="351" width="44" height="37" rx="4" fill="#333b41" stroke="#77858b" stroke-width="2"/>'+
 [0,1].map(i=>'<rect x="454" y="'+(359+i*14)+'" width="23" height="10" rx="2" fill="#10161a" stroke="#929fa5" stroke-width="1.5"/>'+
   '<rect x="459" y="'+(361+i*14)+'" width="13" height="3" fill="#9eb1ba"/>').join("")+
 // Scanner and cord rest on the top of the instrument.
 '<path d="M316 22Q298 12 306 6Q324 -5 337 15L348 28" stroke="#a9b2b4" stroke-width="7" fill="none" stroke-linecap="round"/>'+
 '<circle cx="353" cy="18" r="13" fill="#497c9e" stroke="#6e8d9c" stroke-width="4"/>'+
 '<circle cx="353" cy="18" r="3.5" fill="#25b8ac"/>';
 if(selected){
  h+='<path d="M312 209L275 222" fill="none" stroke="#248e83" stroke-width="3.5" stroke-linecap="round"/>'+
    '<rect x="155" y="208" width="142" height="23" rx="9" fill="#e3f6ef" stroke="#92d0bf" stroke-width="2"/>'+
    txt(225,224,"SELECTED MODULE",10,"#147a6f",870);
 }
 if(running||result){
  const label=result?"REVIEW RESULTS":"RUN IN PROGRESS";
  h+='<rect x="487" y="265" width="201" height="43" rx="6" fill="#e9f2f2" fill-opacity=".92"/>'+
    txt(588,282,label,12,"#296878",850)+
    '<rect x="525" y="289" width="125" height="7" rx="3" fill="#c4d8da"/>'+
    '<rect x="525" y="289" width="'+(result?125:77)+'" height="7" rx="3" fill="#269589"/>';
 }
 return h;
}
function analyzer(id,state){
 const torch=id==="torch";
 if(torch){
  return svg(torchChassis(state),
   "BioFire FilmArray Torch instrument matching photographed wide two-door gray housing, red-trimmed upper modules, left pouch dock, large black lower touchscreen and front USB ports; status overlays are instructional")
   .replace('viewBox="0 0 920 400"','viewBox="95 0 770 400"');
 }
 const body='<ellipse cx="490" cy="350" rx="300" ry="20" fill="#e1e9ed"/>'+
 '<rect x="270" y="105" width="296" height="224" rx="15" fill="#eff4f6" stroke="#8da5b4" stroke-width="5"/>'+
 Array.from({length:4},(_,i)=>'<rect x="287" y="'+(124+i*43)+'" width="170" height="34" rx="5" fill="#fbfcfc" stroke="#a8bec9" stroke-width="2"/><path d="M304 '+(141+i*43)+' h26" stroke="#3f424d" stroke-width="6"/>').join("")+
 '<path d="M480 116 L646 109 L662 321 L480 328Z" fill="#dfe9ef" stroke="#9aafbb" stroke-width="4"/>'+
 '<rect x="502" y="137" width="141" height="156" rx="6" fill="#1f3d50"/>'+
 '<rect x="511" y="153" width="122" height="124" rx="3" fill="#e5f1f4"/>'+
 text(572,184,"SPOTFIRE",13,"#3c7184")+
 text(572,205,state==="selected"?"OPEN MODULE":"AVAILABLE",11,state==="selected"?"#158775":"#49899c")+
 '<rect x="536" y="229" width="71" height="28" rx="5" fill="#b7dce6"/>';
 return svg(body,"BioFire SPOTFIRE analyzer with modular drawer units and upright display");
}
function ui(id,index){
 const torch=id==="torch";
 if(!torch){
  const choices=[["Available modules","Select a free module"],["Pouch barcode","Scan barcode"],["Sample ID / assay","Confirm ordered panel"],["Start Run","Start only after checks"]];
  const chosen=choices[index]||choices[0];
  return svg('<rect x="197" y="17" width="536" height="363" rx="19" fill="#e8eef1" stroke="#9fb8c5" stroke-width="6"/>'+
   '<rect x="222" y="45" width="485" height="302" rx="10" fill="#fff" stroke="#afc4d0"/>'+
   '<rect x="223" y="45" width="484" height="53" rx="7" fill="#274b67"/>'+
   text(465,76,"BIOFIRE SPOTFIRE · WORKFLOW REFERENCE",17,"#fff")+
   '<rect x="268" y="143" width="394" height="52" rx="8" fill="#e6f5f1" stroke="#24968d" stroke-width="3"/>'+
   text(467,176,chosen[0],20,"#226b73")+
   '<rect x="298" y="228" width="334" height="47" rx="8" fill="#f1f6f8" stroke="#c0d6e0"/>'+
   text(465,255,chosen[1],16,"#527589")+
   text(465,317,"Illustrative workflow only · verify actual screen",12,"#688494"),
   "BioFire SPOTFIRE simplified workflow stage "+(index+1)+"; verify actual software display");
 }
 const stages=[
  {heading:"DASHBOARD",title:"Select an available module",focus:"module"},
  {heading:"NEW RUN",title:"Scan pouch barcode · enter Sample ID",focus:"fields"},
  {heading:"REVIEW RUN",title:"Confirm pouch type and specimen ID",focus:"review"},
  {heading:"START RUN",title:"Verify and start the run",focus:"start"}
 ];
 const stage=stages[index]||stages[0];
 const toolbar='<rect x="172" y="20" width="583" height="360" rx="14" fill="#e9eef2" stroke="#9eb7c3" stroke-width="5"/>'+
 '<rect x="192" y="40" width="543" height="318" rx="8" fill="#fff" stroke="#b8cbd5" stroke-width="2"/>'+
 '<rect x="193" y="40" width="542" height="48" fill="#263f51"/>'+
 text(287,69,"Dashboard",15,stage.focus==="module"?"#fff":"#d1e5ea")+
 text(448,69,"Browse Runs",15,"#c5dbe4")+
 text(576,69,"Settings",15,"#c5dbe4")+
 text(679,69,"TORCH",19,"#f7fcfd")+
 '<rect x="206" y="97" width="516" height="36" rx="4" fill="#eaf2f7"/>'+
 text(464,120,stage.heading,17,"#33687f");
 let content="";
 if(stage.focus==="module"){
   content=Array.from({length:6},(_,i)=>{
    const x=223+i%3*164,y=150+Math.floor(i/3)*78;
    return '<rect x="'+x+'" y="'+y+'" width="147" height="63" rx="8" fill="'+(i===0?"#e6f5ec":"#f3f7f9")+'" stroke="'+(i===0?"#238f79":"#ccdee5")+'" stroke-width="'+(i===0?"3":"2")+'"/>'+
     text(x+73,y+27,"MODULE "+(i+1),12,"#325c73")+
     text(x+73,y+48,"Available",11,i===0?"#1a866d":"#5e8193");
   }).join("")+
   text(459,333,"Select an available module or scan the pouch barcode",13,"#5e7f8e");
 }else if(stage.focus==="fields"){
   content='<rect x="246" y="153" width="440" height="54" rx="8" fill="#f8fbfc" stroke="#bed5df" stroke-width="2"/>'+
    text(274,176,"POUCH BARCODE / LOT / SERIAL",12,"#4c7588","start")+
    text(275,197,"Scan the fitment label",13,"#2c6881","start")+
    '<rect x="246" y="224" width="440" height="54" rx="8" fill="#f8fbfc" stroke="#bed5df" stroke-width="2"/>'+
    text(274,247,"SAMPLE ID",12,"#4c7588","start")+
    text(275,268,"Scan or enter approved accession ID",13,"#2c6881","start")+
    '<rect x="560" y="303" width="126" height="35" rx="7" fill="#268f81"/>'+text(623,325,"NEXT",13,"#fff");
 }else if(stage.focus==="review"){
   content='<rect x="246" y="153" width="440" height="145" rx="9" fill="#f7fafb" stroke="#c0d7e0"/>'+
   text(274,179,"Pouch Type",12,"#688294","start")+text(620,179,"GI PANEL",13,"#346d84","end")+
   '<path d="M262 192H670" stroke="#e0eaf0" stroke-width="2"/>'+
   text(274,218,"Sample ID",12,"#688294","start")+text(620,218,"VERIFY MATCH",13,"#347588","end")+
   '<path d="M262 233H670" stroke="#e0eaf0" stroke-width="2"/>'+
   text(274,260,"Protocol",12,"#688294","start")+text(620,260,"IF PROMPTED",13,"#347588","end")+
   '<rect x="568" y="311" width="116" height="34" rx="7" fill="#248e81"/>'+text(626,333,"NEXT",13,"#fff");
 }else{
   content='<rect x="245" y="151" width="440" height="145" rx="8" fill="#f7fafc" stroke="#c6dbe3"/>'+
    text(464,182,"REVIEW POUCH + SAMPLE ID",15,"#376d85")+
    text(464,211,"Confirm the correct module is loaded",13,"#6b8495")+
    text(464,237,"Confirm operator access on the analyzer",13,"#6b8495")+
    '<rect x="375" y="260" width="178" height="47" rx="8" fill="#278f80"/>'+
    text(464,289,"START RUN",18,"#fff");
 }
 return svg(toolbar+content,
 "BioFire FilmArray Torch dashboard and run workflow using documented Dashboard, Browse Runs, Settings, pouch barcode, Sample ID and Start Run controls; schematic not an exact software screenshot");
}
function figure(title,desc,picture){
 const type=/blue|hydrat/i.test(title)?'blue':/red|sample|specimen/i.test(title)?'red':/scan|panel|start|module/i.test(title)?'screen':'ready';
 const symbol=type==='blue'?'●':type==='red'?'●':type==='screen'?'›':'✓';
 return '<figure class="biofire-training-figure biofire-training-'+type+'"><div class="biofire-training-title"><strong><span class="biofire-training-symbol" aria-hidden="true">'+symbol+'</span>'+esc(title)+'</strong><span class="biofire-action-type">'+(type==='blue'?'HYDRATION':type==='red'?'SAMPLE':type==='screen'?'SCREEN':'PREPARATION')+'</span></div><div class="biofire-training-image">'+picture+'</div><figcaption><span class="biofire-action-arrow" aria-hidden="true">↳</span>'+esc(desc)+'</figcaption></figure>';
}
function stageVisual(id,title){
 if(id!=="torch"&&id!=="spotfire")return "";
 const t=String(title).toLowerCase(),torch=id==="torch";let figs=[];
 if(/load the controls into the red vial|prepare qc sample/i.test(t))figs=[figure("Add approved QC material to red vial","Follow the QC kit instructions for the appropriate material and buffer.",pipette(id)),figure("Mix the capped red QC vial","Gently invert the securely capped red vial 3 times before loading the pouch.",invert())];
 else if(/gather|retrieve|materials/.test(t))figs=[figure("Test kit and both injection vials","Hydration is blue, sample is red. Follow the assay-specific reagent kit.",kit())];
 else if(/loading station|prepare pouch/.test(t))figs=[figure("Prepare pouch loading station","Set the red sample vial in the left well and blue hydration vial in the right well, as viewed from the illustrated operator position.",station("ready"))];
 else if(/hydrate/.test(t))figs=[figure("Hydrate through blue port","Remove the blue vial from its cover and puncture the designated blue hydration port. Confirm the pouch hydrates.",station("hydrate"))];
 else if(/invert.*red|mix red vial|mix the capped/i.test(t))figs=[figure("Important · mix the red vial","Cap the sample injection vial securely and gently invert it 3 times. Return it to the red well before loading the pouch.",invert())];
 else if(/sample.*buffer|mix specimen|prepare specimen/.test(t))figs=[figure(torch?"Prepare GI buffer and specimen":"Prepare specimen and buffer",torch?"GI: dispense buffer first, then 0.2 mL well-mixed Cary Blair specimen.":"SPOTFIRE R: transfer specimen with the supplied fixed-volume pipette first, then add all sample buffer. Confirm the specific panel IFU.",pipette(id))];
 else if(/inject sample|load sample mix/.test(t))figs=[figure("Load red sample mixture","Puncture the red sample port with the prepared sample injection vial. Verify sample is drawn into the pouch.",station("sample"))];
 else if(/available module/.test(t))figs=[
   figure("Instrument and available modules","Identify an available module on the actual analyzer before loading the prepared pouch.",analyzer(id)),
   figure("Confirm module available","The illustration is the same analyzer with its selected-module screen state. Verify the actual module reports Available.",analyzer(id,"selected"))
 ];
 else if(/scan pouch barcode/.test(t))figs=[figure("Scan pouch barcode","Scan the barcoded pouch and match the panel/lot information displayed.",ui(id,1))];
 else if(/confirm panel|verify sample id/.test(t))figs=[figure("Verify panel and identifiers","Confirm the intended panel, pouch and specimen or QC identifiers before running.",ui(id,2))];
 else if(/start assay|start run|load.*module/.test(t))figs=[figure("Insert pouch and start the run","Follow the on-screen loading prompt for the correct module, then verify information and choose START.",ui(id,3))];

 if(!figs.length)return "";
 return '<section class="biofire-training" aria-label="BioFire illustrated preparation"><div class="biofire-training-grid">'+figs.join("")+'</div></section>';
}
window.LAB_BIOFIRE_ART={stageVisual,station,kit,analyzer,ui,pipette,invert};
})();