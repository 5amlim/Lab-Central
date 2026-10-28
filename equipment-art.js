/* Original SVG equipment silhouettes for Lab Central.
   Visual orientation only. Illustrations are simplified and intentionally unlabeled at component level. */
(function(){
"use strict";
const specs={
 sysmex:{label:"CBC ANALYZER",shape:"tower",accent:"#348b9c",tip:"EDTA whole blood"},
 piccolo:{label:"CHEMISTRY ANALYZER",shape:"rotor",accent:"#247d98",tip:"Green-top lithium heparin"},
 pathfast:{label:"CARDIAC ASSAYS",shape:"pathfast",accent:"#247a94",tip:"Lithium heparin whole blood / plasma"},
 triage:{label:"CARDIAC MARKERS",shape:"reader",accent:"#31658d",tip:"Assay-specific sample"},
 clinitek:{label:"URINALYSIS",shape:"urine",accent:"#358c88",tip:"Urine sample"},
 torch:{label:"GI PANEL",shape:"torch",accent:"#387c9a",tip:"Stool / Cary Blair"},
 spotfire:{label:"RESPIRATORY PANEL",shape:"modules",accent:"#386f9d",tip:"UTM / eSwab"},
 febridx:{label:"RAPID TEST",shape:"cassette",accent:"#9267a4",tip:"Specimen per test IFU"},
 "drug-screen":{label:"URINE DRUG SCREEN",shape:"cup",accent:"#8370a0",tip:"Urine sample"},
 coagsense:{label:"PT / INR",shape:"coag",accent:"#387e90",tip:"Fingerstick"},
 poc:{label:"RAPID TEST MENU",shape:"tests",accent:"#377f89",tip:"Specimen varies by test"},
 sofia:{label:"RAPID ANTIGEN TESTING",shape:"sofia",accent:"#237ab8",tip:"Respiratory / throat swab"},
 hemocue:{label:"HEMOGLOBIN",shape:"hemocue",accent:"#3b8c91",tip:"Fingerstick"},
 visby:{label:"ARCHIVED PLATFORM",shape:"visby",accent:"#8d939e",tip:"Archived"},
 idnow:{label:"ARCHIVED PLATFORM",shape:"idnow",accent:"#8d939e",tip:"Archived"}
};
function g(s){return '<g>'+s+'</g>'}
function rect(x,y,w,h,r,fill,stroke,sw){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'" stroke-width="'+(sw||2)+'"':'')+'/>'}
function circle(x,y,r,fill,stroke){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'"'+(stroke?' stroke="'+stroke+'" stroke-width="2"':'')+'/>'}
function line(x1,y1,x2,y2,color,w){return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" stroke="'+color+'" stroke-width="'+(w||3)+'" stroke-linecap="round"/>'}
function txt(x,y,t,size,color,weight){return '<text x="'+x+'" y="'+y+'" font-size="'+(size||12)+'" fill="'+(color||'#314e62')+'" font-weight="'+(weight||750)+'" font-family="Arial,sans-serif" text-anchor="middle">'+t+'</text>'}
function screen(x,y,w,h,accent){return rect(x,y,w,h,9,"#243a49","#7c939f",2)+rect(x+12,y+12,w-24,h-24,5,"#e7f1f3")+rect(x+24,y+24,w-48,13,3,accent)+line(x+24,y+53,x+w-38,y+53,"#aec8d1",3)+line(x+24,y+68,x+w-56,y+68,"#c0d4dc",3)}
function body(shape,a){
 let v="";
 if(shape==="tower"){
 v=rect(262,26,216,238,22,"url(#equip-white)","#93a5b2",3)+rect(267,29,206,234,19,"#ecf2f5")+screen(286,53,165,115,a)+rect(376,183,73,69,13,"#253746")+rect(384,191,57,47,9,"#101c25")+circle(413,215,19,"#2f3d49","#6e8797")+rect(285,187,67,8,3,"#cbdce2");
 }else if(shape==="rotor"){
 /* Piccolo Xpress is a tall blue front-touchscreen analyzer with a disc-loading drawer. */
 v='<path d="M270 36 L467 33 Q492 38 498 56 L498 253 Q491 267 464 269 L272 265 Q251 259 250 240 L249 65 Q250 44 270 36Z" fill="#286f9d" stroke="#215477" stroke-width="3"/>'+
 '<path d="M464 34 L498 55 L498 246 L470 259Z" fill="#15547e" opacity=".64"/>'+
 '<rect x="272" y="42" width="193" height="188" rx="15" fill="#142635" stroke="#2a4051" stroke-width="3"/>'+
 '<rect x="288" y="58" width="161" height="151" rx="6" fill="#dcecf3" stroke="#33596c" stroke-width="2"/>'+
 '<rect x="301" y="73" width="134" height="27" rx="4" fill="#c8dce7"/>'+
 txt(366,90,"piccolo xpress",11,"#287b9a",850)+
 '<rect x="307" y="111" width="121" height="17" rx="3" fill="#edc85e"/>'+
 '<rect x="307" y="140" width="121" height="17" rx="3" fill="#c1d5de"/>'+
 '<rect x="307" y="167" width="121" height="17" rx="3" fill="#c1d5de"/>'+
 '<rect x="298" y="234" width="157" height="20" rx="4" fill="#102534"/>'+
 '<path d="M314 253 L443 253 L471 281 L291 281Z" fill="#182e3b" stroke="#506877" stroke-width="2"/>'+
 '<rect x="311" y="267" width="142" height="12" rx="3" fill="#536d7c"/>'+
 '<circle cx="380" cy="264" r="26" fill="#eff6f7" stroke="#9fb8c4" stroke-width="3"/>'+
 Array.from({length:20},(_,i)=>{const th=i*Math.PI/10;return '<rect x="'+(377+23*Math.cos(th)).toFixed(1)+'" y="'+(261+23*Math.sin(th)).toFixed(1)+'" width="6" height="4" rx="1" fill="#d6e4ec"/>';}).join("")+
 '<circle cx="380" cy="264" r="9" fill="#d4e5ec" stroke="#a7c5d2"/>'+
 txt(367,218,"PICCOLO XPRESS",9,"#cadfea",780)+
 '<ellipse cx="378" cy="293" rx="117" ry="5" fill="#c9d8de" opacity=".4"/>';
 }else if(shape==="pathfast"){
 v=rect(161,75,407,176,22,"url(#equip-white)","#91a4b0",3)+screen(184,96,165,107,a)+rect(370,103,173,124,12,"#d7e4eb","#93abb8")+rect(385,117,144,96,7,"#2a3c47")+Array.from({length:6},(_,i)=>rect(395+i*22,133,16,56,3,"#e5edf1","#8daab7")+rect(397+i*22,138,12,6,1,i<4?a:"#b08b4b")).join("")+rect(206,241,314,12,5,"#a9bdc7");
 }else if(shape==="reader"){
 v=rect(213,73,317,184,23,"url(#equip-white)","#93a8b5",3)+screen(236,91,245,95,a)+rect(290,205,160,31,8,"#b1c5ce","#819dad")+rect(320,208,101,15,4,"#3e505d")+rect(250,236,240,13,5,"#a7c3cd");
 }else if(shape==="urine"){
 v=rect(224,64,300,194,25,"#edf3f5","#93a8b5",3)+screen(262,85,206,98,a)+rect(268,204,211,23,7,"#b5c9d3")+rect(296,211,158,9,4,"#f8fcfd","#9cb7c4")+line(313,216,439,216,"#559890",3);
 }else if(shape==="torch"){
 v=rect(264,33,211,245,18,"url(#equip-white)","#91a7b1",3)+Array.from({length:4},(_,i)=>rect(282,51+i*49,172,42,9,"#e7edf0","#a6bac4")+rect(294,61+i*49,148,22,6,"#d7e5ea")+rect(406,66+i*49,25,12,4,a)).join("")+rect(320,254,101,11,4,"#a8bac7");
 }else if(shape==="modules"){
 v=rect(190,36,249,235,16,"url(#equip-white)","#99aab2",3)+Array.from({length:4},(_,i)=>rect(210,51+i*52,207,48,9,"#e9f0f4","#a5b5bf")+rect(317,62+i*52,24,18,5,"#c54348")).join("")+rect(480,68,112,155,14,"#e2eaf0","#92a7b5",3)+screen(491,82,90,117,a)+line(506,226,570,226,"#b0c5d1",6);
 }else if(shape==="sofia"){
 v=rect(223,74,296,177,35,"#203747","#243d52",3)+rect(236,69,260,22,11,a)+screen(253,92,228,109,a)+rect(350,213,107,28,7,a)+rect(367,219,73,19,4,"#d2eaf6")+line(367,232,440,232,"#7ab5d2",2);
 }else if(shape==="hemocue"){
 v=rect(283,64,200,196,29,"#e2e8ec","#7b929d",3)+screen(305,87,154,92,a)+rect(327,196,115,41,10,"#2f404c","#9aaeb9")+rect(354,209,63,15,5,"#e5eff2")+rect(355,238,60,10,4,"#abc2ce");
 }else if(shape==="coag"){
 v=rect(275,63,218,205,26,"#e2ebee","#95abb4",3)+screen(303,91,161,100,a)+rect(328,207,116,25,10,"#b0c7d0")+rect(347,218,80,11,4,"#eef5f7")+circle(385,247,9,a);
 }else if(shape==="cup"){
 v=rect(290,84,177,175,20,"#edf3f7","#91a5b2",3)+rect(280,69,198,33,11,"#b9cdd6","#829aa8")+Array.from({length:7},(_,i)=>rect(312+i*19,117,10,98,4,"#f5fafb","#c0d3db")+rect(315+i*19,160,4,16,2,i%2?a:"#c9b6d7")).join("")+rect(328,227,102,12,4,"#aac2cf");
 }else if(shape==="cassette"||shape==="tests"){
 const count=shape==="tests"?3:1;
 v=Array.from({length:count},(_,i)=>{const x=shape==="tests"?190+i*140:260;const y=shape==="tests"?110:94;const w=shape==="tests"?115:245;return rect(x,y,w,113,18,"#f4f8fa","#9ab0bc",3)+rect(x+16,y+23,w-32,22,6,"#d5e4eb")+rect(x+18,y+69,w-36,22,8,"#e0eaee")+rect(x+26,y+75,w-52,10,4,"#d7c0dc")+rect(x+39,y+76,5,10,2,a)}).join("");
 }else if(shape==="visby"){
 v=rect(247,79,245,178,24,"#f1f4f6","#b3bbc3",3)+rect(268,97,201,28,10,"#dbe2e7")+circle(368,188,56,"#ebf0f3","#9eacb8")+circle(368,188,23,"#b6c8d0","#8a9ca8");
 }else if(shape==="idnow"){
 v=rect(235,74,281,180,25,"#f1f4f6","#a8b3bb",3)+screen(265,97,210,92,"#899aa6")+rect(298,207,156,22,7,"#dae6ea")+circle(378,219,7,"#738c9c");
 }
 return v;
}
function render(sec){
 if(!sec||!Object.prototype.hasOwnProperty.call(specs,sec.id))return "";
 const item=specs[sec.id],a=item.accent,label=item.label;
 const core=body(item.shape,a);
 const svg='<svg class="equipment-svg" viewBox="0 0 740 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified illustration of '+String(sec.title).replace(/"/g,"&quot;")+' instrument">'+
 '<defs><linearGradient id="equip-white" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#cfdee5"/></linearGradient></defs>'+
 '<ellipse cx="376" cy="273" rx="230" ry="16" fill="#b7cad5" opacity=".23"/>'+core+'</svg>';
 return '<section class="equipment-overview" aria-label="'+String(sec.title).replace(/"/g,"&quot;")+' visual reference"><div class="equipment-art">'+svg+'</div>'+
 '<div class="equipment-information"><div class="equipment-overline">EQUIPMENT REFERENCE</div><h2>'+sec.title+'</h2><p>'+label+'</p>'+
 '<dl><div><dt>Specimen</dt><dd>'+item.tip+'</dd></div><div><dt>Instructions</dt><dd>Use the procedure tabs for operation, QC and handling.</dd></div></dl>'+
 '<span class="equipment-art-note">Simplified instrument illustration · not to scale</span></div></section>';
}

/* Piccolo-specific teaching images. User-supplied disc and gray transfer-tool photos are embedded at reduced resolution. */
const piccoloImages={
 tip:"data:image/webp;base64,UklGRqgCAABXRUJQVlA4IJwCAABwIACdASrwAPAAPtVqrFCoJyknJdapQSAaiWlu+E489z8DsM7aCHBILgvq4oym+w9sgXvyttgbvNLS+hOZeekO7fKLBTnd6kteZJF4FmqKJKhn5gdNRtMPv1xSbBw5f5iqXnjwr3XOEYx81KtsPSgRoM+pP3R2sQyJFnwAQGYRtPCfe4QS28kG/zEAK5Fsu5dZGCLfA8E7Gy5tFOsi8MEGbJkgGyS+jzxko1wY9z7ZUDVpU3E1keiAy+2m6YJuqEA0IMH1z0/NwiUD7J3m5vdm388VzV6/a0wKD5I4Xx/DxMHZvkiq3fKcETSkARrJSl0YOyF7qUBHUqDzXuXysQv5187SZ+uSG+Zb1MkAAP7yPAACx5qKiIAEgYR/7lG03yJfONgSKgp5+Vu60qkNFwV6d/qslsvNpp/2Vo+LRXTfnAllxzsLoB4T6x4r8kV/CiemXtQQqMZqC6X99QPC66dabPdkl2ZIYD47M3Y8X5FoLgbI1Yktwpnrc8cBNkxwUaKEBCxCpvPnBDC8ufkxHSLLk2E2XJVN2bjkaFR0k5Pb3Xp4qJn/KgUyk102K0BbXz2CPMKJruVl/y+TNA9vzvQmsB4h0mCkY5kcQI0/nxvb/6otNCNsyIrbhQGb1/SEsZPMGU5wbqiEHyIv/q+ztQ8IMtjoYFgQ2xccGFXGlCzjok8MczkUMCozAEs4546D6tklAL27V19G7OrAqRlSmuNhUCcWv+g/7iVtqVZgHQMxdueNSmkPd4Z3A/AfH1g7nDlIdUscoNY1sxrDDzbEkjmC6J0k/sia0sQbgs6XDSZRpsww2Aa/OpmtUuqrDlbuMJWwAFRJtsbKn2rruQJZfOv6vb0ZAlVcbpsNcpJJDDwCWsFg1+rYLVOAAAAAAA==",
 disc:"data:image/webp;base64,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"
};
function piccoloDiscSvg(filled=false,port=true){
 const n=36;
 let spokes=Array.from({length:n},(_,i)=>{const a=2*Math.PI*i/n;const a2=2*Math.PI*(i+.42)/n;
  const rad=(r,t)=>((170+r*Math.cos(t)).toFixed(1)+","+(156+r*Math.sin(t)).toFixed(1));
  return '<path d="M'+rad(104,a)+' L'+rad(130,a)+' L'+rad(130,a2)+' L'+rad(104,a2)+'Z" fill="#eef5f8" stroke="#c7d9e1" stroke-width="1.2"/>';
 }).join("");
 const liquid=filled?'<path d="M167 146 L204 149 Q215 160 207 174 L167 175 Z" fill="#bb3340" opacity=".83"/>':'';
 return '<svg class="pic-disc-svg" viewBox="0 0 440 315" role="img" aria-label="Piccolo clear reagent disc; near-center sample inlet and chamber are highlighted">'+
 '<circle cx="170" cy="156" r="137" fill="#f5fafb" stroke="#9eb8c5" stroke-width="7"/>'+
 '<circle cx="170" cy="156" r="125" fill="#fff" stroke="#d0e1e7" stroke-width="2"/>'+spokes+
 '<circle cx="170" cy="156" r="91" fill="#f5fafb" stroke="#a7c1cf" stroke-width="4"/>'+
 '<circle cx="170" cy="156" r="57" fill="#ecf5f8" stroke="#a8c4d0" stroke-width="4"/>'+
 '<circle cx="170" cy="156" r="24" fill="#d4e7ee" stroke="#9aafbb" stroke-width="3"/>'+
 '<path d="M170 111 L170 142 M170 173 L170 196" stroke="#8aadb9" stroke-width="5"/>'+
 '<rect x="184" y="142" width="23" height="27" rx="6" fill="#e4f1f6" stroke="#6e9fb4" stroke-width="2.5"/>'+liquid+
 '<circle cx="192" cy="148" r="5.5" fill="'+(filled?'#bc3543':'#275f7c')+'" stroke="#fff" stroke-width="2"/>'+
 '<path d="M199 146 L268 102 L303 102" fill="none" stroke="#188c9c" stroke-width="3"/>'+
 '<text x="308" y="96" font-size="13" fill="#235c74" font-weight="850">SAMPLE PORT</text>'+
 '<text x="308" y="113" font-size="10.5" fill="#5a8295">Tip enters here</text>'+
 '<path d="M201 169 L264 208 L307 208" fill="none" stroke="#c14c59" stroke-width="2.5"/>'+
 '<text x="308" y="204" font-size="12" fill="#ab4756" font-weight="850">FILL CHAMBER</text>'+
 '<text x="308" y="220" font-size="10.5" fill="#68889a">Follow molded fill marks</text>'+
 '<text x="170" y="304" font-size="11" fill="#708d9e" text-anchor="middle">Diagram schematic · align with actual disc</text></svg>';
}
function piccoloPipetteSvg(){
 return '<svg class="pic-pipette-svg" viewBox="0 0 440 180" role="img" aria-label="Gray Piccolo transfer pipette, separate disposable sample tip, and a 100 microliter sample">'+
 '<rect x="21" y="71" width="62" height="22" rx="8" fill="#a9afb6" stroke="#737c84" stroke-width="2"/>'+
 '<rect x="78" y="62" width="8" height="40" rx="3" fill="#8d989e"/>'+
 '<rect x="86" y="67" width="160" height="31" rx="12" fill="#aeb6ba" stroke="#77858b" stroke-width="2"/>'+
 '<path d="M246 72 L312 76 L312 88 L246 94Z" fill="#b9c0c4" stroke="#76858c" stroke-width="2"/>'+
 '<path d="M319 82 L410 85 L410 87 L319 88Z" fill="#d6e3e9" stroke="#809baa" stroke-width="2"/>'+
 '<rect x="315" y="79" width="12" height="11" rx="4" fill="#c5d0d5"/>'+
 '<path d="M341 84 L410 85 L410 87 L341 87Z" fill="#c03a43" opacity=".7"/>'+
 '<text x="123" y="45" font-size="13" fill="#385b6d" font-weight="850">GRAY PIPETTE / TRANSFER DEVICE</text>'+
 '<path d="M160 48 L160 63" stroke="#7894a3" stroke-width="2"/>'+
 '<text x="308" y="136" font-size="12" fill="#276c7e" font-weight="850">DISPOSABLE TIP</text>'+
 '<path d="M344 122 L357 90" stroke="#238a9a" stroke-width="2"/>'+
 '<text x="240" y="164" font-size="10.5" fill="#68869a" text-anchor="middle">Use the specified 100 µL pipette and a fresh matching tip</text></svg>';
}
function piccoloLoadingSvg(){
 return '<svg class="pic-loading-svg" viewBox="0 0 510 300" role="img" aria-label="Pipette entering the center-adjacent sample port of a Piccolo disc tilted approximately 45 degrees">'+
 '<defs><linearGradient id="picLiquid" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d36267"/><stop offset="1" stop-color="#a52d39"/></linearGradient></defs>'+
 '<g transform="translate(190 204) rotate(-25)"><ellipse cx="0" cy="0" rx="159" ry="68" fill="#f2f7f9" stroke="#9fb9c8" stroke-width="6"/>'+
 Array.from({length:20},(_,i)=>{const t=i*Math.PI/10;return '<ellipse cx="'+(138*Math.cos(t)).toFixed(1)+'" cy="'+(53*Math.sin(t)).toFixed(1)+'" rx="8" ry="6" fill="#d9e8ee" stroke="#adcad5"/>'}).join("")+
 '<ellipse rx="79" ry="36" fill="#e7f1f5" stroke="#aac8d2" stroke-width="3"/>'+
 '<ellipse rx="25" ry="12" fill="#d9e8ee" stroke="#a1b8c6" stroke-width="2"/>'+
 '<ellipse cx="45" cy="-8" rx="11" ry="6" fill="#ae3240" stroke="#7d2633" stroke-width="3"/>'+
 '<path d="M33 0 Q70 5 77 17 Q44 23 22 10Z" fill="#bd3c49" opacity=".68"/></g>'+
 '<path d="M265 25 L290 25 L306 90 L294 111 L304 143 L295 160" fill="none" stroke="#a5b3ba" stroke-width="17" stroke-linejoin="round" stroke-linecap="round"/>'+
 '<path d="M295 159 L284 189" stroke="#dce5e8" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M284 177 C274 189 278 200 282 201 C294 203 297 194 284 177Z" fill="url(#picLiquid)"/>'+
 '<circle cx="282" cy="204" r="10" fill="none" stroke="#168e8c" stroke-width="3" stroke-dasharray="3 3"/>'+
 '<path d="M287 206 L357 156 L412 156" stroke="#188c9c" stroke-width="2.7" fill="none"/>'+
 '<text x="420" y="151" fill="#276981" font-weight="850" font-size="13" text-anchor="middle">SAMPLE PORT</text>'+
 '<text x="421" y="168" fill="#6c8b9b" font-size="10.5" text-anchor="middle">near disc center</text>'+
 '<text x="38" y="35" fill="#446e86" font-size="13" font-weight="850">TILT DISC ~45°</text>'+
 '<text x="38" y="52" fill="#6c8c9d" font-size="10.5">Port above fill line</text>'+
 '<text x="252" y="292" font-size="11" fill="#718a9b" text-anchor="middle">Illustrative side/top view, not to scale</text></svg>';
}
function piccoloVisual(text){
 const t=String(text).toLowerCase();
 const take=t.includes("grab the disc")||t.includes("disc for the");
 const add=t.includes("load sample into the disc")||t.includes("load controls into the disc");
 const analyzer=t.includes("click analyze");
 if(!take&&!add&&!analyzer)return '';
 let pieces='';
 if(take){
  pieces='<article class="pic-vis-card"><strong>Reagent disc (top view)</strong><img loading="lazy" class="pic-user-photo" src="'+piccoloImages.disc+'" alt="User-supplied photograph of a clear Piccolo reagent disc"/><span>Inspect the sealed disc; keep level and handle by the edges.</span></article>'+
  '<article class="pic-vis-card"><strong>Locate the sample port</strong>'+piccoloDiscSvg(false)+'<span>Use the small sample inlet near the disc hub, not any outer reagent chamber.</span></article>';
 }else if(add){
  pieces='<article class="pic-vis-card"><strong>Gray transfer device and disposable tip</strong><img loading="lazy" class="pic-user-photo pic-photo-tip" src="'+piccoloImages.tip+'" alt="User-supplied photograph of gray Piccolo transfer component"/>'+piccoloPipetteSvg()+'<span>Fit a fresh compatible tip. Avoid bubbles during aspiration.</span></article>'+
  '<article class="pic-vis-card"><strong>Dispense blood into the sample port</strong>'+piccoloLoadingSvg()+'<span>With the disc tilted, place the tip into the sample port and fill the chamber to its molded fill line. Do not introduce bubbles.</span></article>'+
  '<article class="pic-vis-card"><strong>Disc after sample loading</strong>'+piccoloDiscSvg(true)+'<span>The red region illustrates blood in the near-center sample chamber. Start analysis within 10 minutes of filling the disc.</span></article>';
 }else{
  pieces='<article class="pic-vis-card"><strong>Place disc in analyzer drawer</strong>'+piccoloAnalyzerSvg()+'<span>Position the filled disc in the front drawer, then close the drawer and follow the analyzer prompts.</span></article>';
 }
 return '<section class="pic-step-visual" aria-label="Piccolo sample preparation images"><div class="pic-step-head"><strong>PICCOLO · VISUAL REFERENCE</strong><span>Sample handling illustration</span></div><div class="pic-vis-grid">'+pieces+'</div><p class="pic-vis-footnote">Images are training references based on the supplied photos. Follow the approved Piccolo Xpress IFU for the actual disc, pipette and sample port.</p></section>';
}
function piccoloAnalyzerSvg(){
 return '<svg viewBox="0 0 430 315" role="img" aria-label="Piccolo Xpress tall blue analyzer with black touchscreen, open front drawer and inserted reagent disc">'+
 '<path d="M101 26 L289 25 L338 49 L338 278 L285 298 L100 279Z" fill="#2177a6" stroke="#1d5576" stroke-width="3"/>'+
 '<path d="M287 26 L338 49 L338 277 L287 297Z" fill="#185b86"/>'+
 '<rect x="116" y="34" width="172" height="202" rx="14" fill="#152b3a"/>'+
 '<rect x="131" y="50" width="142" height="158" rx="5" fill="#d9e9ef" stroke="#517c94"/>'+
 '<rect x="147" y="74" width="108" height="21" rx="4" fill="#a9cddd"/>'+
 '<rect x="147" y="109" width="108" height="22" rx="4" fill="#efd275"/>'+
 '<rect x="147" y="145" width="108" height="22" rx="4" fill="#c0d5df"/>'+
 '<text x="202" y="66" text-anchor="middle" font-size="12" font-weight="800" fill="#226b91">piccolo xpress</text>'+
 '<rect x="148" y="239" width="113" height="17" rx="3" fill="#152c3a"/>'+
 '<path d="M156 253 L255 253 L292 290 L111 290Z" fill="#243f50" stroke="#5f8298" stroke-width="2"/>'+
 '<ellipse cx="205" cy="274" rx="43" ry="13" fill="#eaf2f6" stroke="#afc4ce" stroke-width="3"/>'+
 '<ellipse cx="205" cy="274" rx="19" ry="7" fill="#e1edf2" stroke="#a7c2d1" stroke-width="2"/>'+
 '<circle cx="216" cy="272" r="4" fill="#b53a43"/>'+
 '<path d="M245 272 L345 263" fill="none" stroke="#2b93a1" stroke-width="2.5"/>'+
 '<text x="351" y="257" font-size="11" font-weight="850" fill="#29677d">DISC DRAWER</text>'+
 '<text x="213" y="309" font-size="10.5" fill="#69889a" text-anchor="middle">Front drawer with reagent disc · simplified view</text></svg>';
}

window.LAB_EQUIPMENT_ART={render:render,ids:Object.keys(specs),piccoloVisual:piccoloVisual,piccoloDiscSvg:piccoloDiscSvg,piccoloPipetteSvg:piccoloPipetteSvg};
})();