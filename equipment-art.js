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
 /* Model-specific front/side vector referenced to Sysmex pocH-100i. */
 v="\n<g aria-label=\"pocH-100i three-quarter front view\">\n<!-- off-white deep analyzer side enclosure -->\n<ellipse cx=\"381\" cy=\"285\" rx=\"169\" ry=\"11\" fill=\"#b4c8d1\" opacity=\".25\"/>\n<path d=\"M342 37 Q363 29 382 34 L503 60 Q531 65 537 97 L542 238 Q537 258 513 268 L370 280 L342 250Z\" fill=\"#e7eef0\" stroke=\"#afbec5\" stroke-width=\"3\"/>\n<path d=\"M372 44 L498 70 Q519 75 522 101 L529 241 Q524 255 509 257 L379 270Z\" fill=\"#fafbfa\" stroke=\"#ccd8dc\" stroke-width=\"2\"/>\n<path d=\"M497 69 Q523 81 524 99 L529 238 Q527 253 511 258 L501 256 Q508 234 504 215 L502 105Z\" fill=\"#e5ebed\"/>\n<path d=\"M420 60 L424 258 M491 78 L504 248\" fill=\"none\" stroke=\"#e1e8e9\" stroke-width=\"2\"/>\n<circle cx=\"432\" cy=\"110\" r=\"3.2\" fill=\"#b9c9ce\"/><circle cx=\"498\" cy=\"217\" r=\"3.2\" fill=\"#b9c9ce\"/>\n<text x=\"459\" y=\"177\" fill=\"#d9e3e5\" stroke=\"#edf1f1\" stroke-width=\".5\" font-family=\"Arial,sans-serif\" font-size=\"23\" font-weight=\"800\" text-anchor=\"middle\">Sysmex</text>\n<rect x=\"520\" y=\"157\" width=\"6\" height=\"48\" rx=\"2\" fill=\"#7d959e\"/>\n\n<!-- curved front shell -->\n<path d=\"M231 48 Q254 30 298 32 L363 38 Q384 44 388 69 L382 244 Q379 266 354 279 L249 270 Q224 262 218 239 Q211 207 214 117 L215 90 Q215 60 231 48Z\" fill=\"url(#equip-white)\" stroke=\"#a4b5be\" stroke-width=\"3\"/>\n<path d=\"M237 54 Q258 39 298 38 L348 44 Q367 47 368 66 L363 153 L350 255 Q342 271 329 271 L255 262 Q228 249 230 223 L228 90 Q226 64 237 54Z\" fill=\"#fbfcfb\" opacity=\".7\"/>\n<path d=\"M235 59 Q259 42 297 42 L348 48\" fill=\"none\" stroke=\"white\" stroke-width=\"4\" opacity=\".8\"/>\n\n<!-- angled color LCD at upper left -->\n<path d=\"M237 71 L344 63 Q357 63 360 76 L356 150 Q355 161 344 164 L231 174 Q222 173 223 157 L225 85 Q225 73 237 71Z\" fill=\"#8a9fab\" stroke=\"#718a96\" stroke-width=\"2.5\"/>\n<path d=\"M236 79 L344 72 Q350 72 351 80 L348 149 L232 164 L233 87Z\" fill=\"#e6f0f3\"/>\n<path d=\"M233 95 L349 87 L348 107 L232 115Z\" fill=\"#c3daec\"/>\n<path d=\"M233 99 L349 91 L348 100 L233 108Z\" fill=\"#b49dc9\"/>\n<path d=\"M237 120 L345 113 L344 131 L236 140Z\" fill=\"#f5f8f9\"/>\n<path d=\"M236 143 L270 141 L269 153 L235 156Z\" fill=\"#995a9c\"/>\n<path d=\"M275 140 L306 138 L306 150 L274 152Z\" fill=\"#6bc4d1\"/>\n<path d=\"M310 138 L342 136 L341 148 L309 150Z\" fill=\"#2ca0cb\"/>\n<text x=\"285\" y=\"106\" font-family=\"Arial,sans-serif\" font-size=\"7.5\" font-weight=\"800\" text-anchor=\"middle\" fill=\"#3f6e90\">READY  •  WHOLE BLOOD</text>\n<text x=\"252\" y=\"151\" font-family=\"Arial,sans-serif\" font-size=\"7\" fill=\"white\" text-anchor=\"middle\">WB</text>\n<text x=\"290\" y=\"149\" font-family=\"Arial,sans-serif\" font-size=\"7\" fill=\"#2c6f81\" text-anchor=\"middle\">QC</text>\n<text x=\"324\" y=\"146\" font-family=\"Arial,sans-serif\" font-size=\"7\" fill=\"white\" text-anchor=\"middle\">RUN</text>\n\n<!-- lettering below LCD -->\n<text x=\"244\" y=\"202\" font-family=\"Arial,sans-serif\" font-size=\"13\" font-weight=\"800\" fill=\"#617580\">pocH-100i</text>\n<path d=\"M251 213 L274 219 L263 223 L250 219Z M256 228 L275 232 L265 237 L253 233Z\" fill=\"#a8b1b3\"/>\n\n<!-- translucent purple access cover with dark sample adapter -->\n<path d=\"M337 161 Q352 153 365 162 Q373 170 375 189 L378 250 Q377 273 364 280 L335 269 Q323 251 324 232 L327 184 Q327 169 337 161Z\" fill=\"#79448d\" stroke=\"#6b417f\" stroke-width=\"2.5\"/>\n<path d=\"M338 168 Q353 160 365 171 L370 241 Q374 256 362 270 L339 263 Q329 248 330 231 L332 185 Q330 175 338 168Z\" fill=\"#aa76b9\" opacity=\".94\"/>\n<path d=\"M340 174 Q347 170 354 175 L358 246 Q359 259 353 268 L342 262Z\" fill=\"#dec1e1\" opacity=\".42\"/>\n<rect x=\"337\" y=\"184\" width=\"27\" height=\"14\" rx=\"6\" fill=\"#8e6fa3\"/>\n<text x=\"350\" y=\"194\" font-family=\"Arial,sans-serif\" font-size=\"6.5\" fill=\"#f7f1f8\" font-weight=\"800\" text-anchor=\"middle\">OPEN</text>\n<path d=\"M339 208 Q347 199 355 208 L358 236 Q357 250 347 253 Q337 251 337 234Z\" fill=\"#3c2a4d\" opacity=\".9\"/>\n<ellipse cx=\"347\" cy=\"216\" rx=\"9\" ry=\"5\" fill=\"#291f35\"/>\n<rect x=\"343\" y=\"217\" width=\"8\" height=\"28\" rx=\"2\" fill=\"#c5cad2\" stroke=\"#888596\" stroke-width=\"1\"/>\n<rect x=\"342\" y=\"214\" width=\"10\" height=\"6\" rx=\"2\" fill=\"#aaa7ba\"/>\n</g>";
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
 v=rect(227,51,283,216,27,"#e8f1f5","#91aab8",3)
 +'<path d="M370 55 Q407 11 478 50 L505 81 L475 106 L368 91Z" fill="#87c5d7" stroke="#6daabd" stroke-width="3"/>'
 +rect(255,118,96,103,9,"#2d5063","#829eae",2)
 +rect(266,128,73,82,4,"#b6d4e2")
 +rect(271,140,63,15,3,"#3386ab")
 +rect(271,165,63,5,2,"#a0becb")
 +rect(271,180,48,5,2,"#a0becb")
 +rect(380,101,104,133,9,"#b7dce5","#81aabc",2)
 +rect(394,116,76,102,5,"#3a515e")
 +Array.from({length:6},(_,i)=>rect(399+i*12,128,9,80,2,"#d9e5eb","#7e9baa",1)).join("")
 +txt(302,240,"PATHFAST",14,"#2f7998",850);
}else if(shape==="reader"){
 v=rect(192,68,350,197,14,"#edf2f5","#a6b7bf",3)+rect(206,82,329,107,5,"#b4c0c7")+rect(215,96,200,80,3,"#d7e2e8","#7f99a5",2)+rect(427,98,101,73,8,"#d8e4e9")+Array.from({length:5},(_,i)=>circle(451+(i%3)*24,111+Math.floor(i/3)*25,8,"#eaf1f4","#92a8b5")).join("")+rect(217,194,230,59,7,"#f5f8fa","#c3d0d7")+Array.from({length:12},(_,i)=>txt(237+(i%4)*53,209+Math.floor(i/4)*17,i===9?"0":String(i+1),10,"#4c6472",750)).join("")+rect(454,224,66,25,6,"#2d3d46")+txt(300,88,"Triage MeterPro",11,"#fff",790)+txt(476,215,"Quidel",12,"#92a9b6",810);
 }else if(shape==="urine"){
 v='<path d="M247 240 L270 67 Q275 48 300 46 L460 46 Q484 52 487 73 L513 238 Q511 257 483 258 L270 258 Q249 256 247 240Z" fill="#eaf0f3" stroke="#9eafbb" stroke-width="3"/>'+rect(287,72,188,99,7,"#9db2bf")+rect(300,85,160,74,5,"#dce9ec")+txt(359,198,"CLINITEK Status+",14,"#465b6d",830)+txt(316,235,"SIEMENS",15,"#2789ad",850)+circle(462,191,12,"#9eb7c2","#738d9b")+rect(393,230,97,22,7,"#3a4b55");
 }else if(shape==="torch"){
 v=rect(270,45,214,236,15,"#e9f0f3","#a2b3bd",3)+Array.from({length:4},(_,i)=>rect(289,62+i*46,175,39,7,"#fafcfd","#a4b7c3",2)+rect(298,72+i*46,151,20,4,"#eef4f6")+rect(418,77+i*46,19,13,3,"#ba4d55")).join("")+rect(287,251,181,18,5,"#50606b")+txt(348,264,"BIOFIRE TORCH",10,"#fff",790);
 }else if(shape==="modules"){
 v=rect(194,104,215,166,18,"#eef3f6","#9cadb9",3)+rect(211,119,180,99,10,"#d9e5ea","#b7cbd4",2)+'<path d="M260 135 H330 V151 H280 V192 H260Z" fill="#293847" stroke="#c84f4f" stroke-width="4"/>'+rect(214,228,179,29,7,"#dae6eb")+txt(303,245,"BIOFIRE SPOTFIRE",11,"#2a809b",840)+rect(404,59,120,196,17,"#f3f7f9","#9db3bf",3)+rect(417,81,95,154,6,"#263c4b")+rect(427,94,75,119,3,"#e1edf2")+txt(465,131,"Available",13,"#356b86",850)+circle(464,243,7,"#4a91aa");
 }else if(shape==="sofia"){
 v='<path d="M210 92 Q219 62 262 59 L460 69 Q507 76 519 126 L524 241 Q522 258 503 264 L253 266 Q218 258 214 230Z" fill="#223440" stroke="#1a313d" stroke-width="4"/>'+'<path d="M205 119 L223 77 Q245 60 270 59 L270 263 L237 264Z" fill="#117b9b"/>'+rect(284,87,204,121,15,"#1d2835","#638ca1",2)+rect(303,106,166,80,7,"#d9e9ef")+circle(387,146,24,"#edb76c")+txt(388,153,"+",29,"#fff",800)+rect(390,216,103,36,8,"#0d283a")+rect(415,220,55,27,6,"#1587a5")+txt(329,236,"Sofia 2",16,"#e5edf2",800);
 }else if(shape==="hemocue"){
 v='<path d="M309 38 Q317 27 340 28 L451 30 Q464 40 465 58 L471 236 Q462 258 449 267 L316 266 Q302 249 302 233Z" fill="#c83c46" stroke="#9e2b34" stroke-width="4"/>'+rect(322,68,129,106,15,"#393e7d","#262e65",3)+rect(337,84,99,50,4,"#d2dfdf")+txt(387,164,"Hb 201+",13,"#fff",750)+rect(342,211,91,39,10,"#272d3b")+rect(349,220,73,16,5,"#151b2a")+txt(386,59,"HemoCue",13,"#fff",850);
 }else if(shape==="coag"){
 v='<path d="M266 242 L268 112 Q274 75 311 70 L448 70 Q489 81 497 118 L508 237 Q505 261 487 267 L289 266 Q269 262 266 242Z" fill="#f1f5f7" stroke="#a2b4bf" stroke-width="3"/>'+rect(295,99,175,105,13,"#1f303e")+rect(314,116,137,68,4,"#d3e9ef")+txt(381,148,"Apply sample",12,"#357b93",800)+txt(377,225,"Coag-Sense",16,"#a94453",850)+rect(361,244,87,28,10,"#293e4b")+rect(383,248,47,13,4,"#b8d0d7");
 }else if(shape==="cup"){
 v=rect(290,84,177,175,20,"#edf3f7","#91a5b2",3)+rect(280,69,198,33,11,"#b9cdd6","#829aa8")+Array.from({length:7},(_,i)=>rect(312+i*19,117,10,98,4,"#f5fafb","#c0d3db")+rect(315+i*19,160,4,16,2,i%2?a:"#c9b6d7")).join("")+rect(328,227,102,12,4,"#aac2cf");
 }else if(shape==="cassette"||shape==="tests"){
 const count=shape==="tests"?3:1;
 v=Array.from({length:count},(_,i)=>{const x=shape==="tests"?190+i*140:260;const y=shape==="tests"?110:94;const w=shape==="tests"?115:245;return rect(x,y,w,113,18,"#f4f8fa","#9ab0bc",3)+rect(x+16,y+23,w-32,22,6,"#d5e4eb")+rect(x+18,y+69,w-36,22,8,"#e0eaee")+rect(x+26,y+75,w-52,10,4,"#d7c0dc")+rect(x+39,y+76,5,10,2,a)}).join("");
 }else if(shape==="visby"){
 v=rect(247,79,245,178,24,"#f1f4f6","#b3bbc3",3)+rect(268,97,201,28,10,"#dbe2e7")+circle(368,188,56,"#ebf0f3","#9eacb8")+circle(368,188,23,"#b6c8d0","#8a9ca8");
 }else if(shape==="idnow"){
 v='<path d="M228 239 L238 108 Q245 68 277 61 L477 61 Q506 72 514 115 L520 236 Q513 259 492 263 L252 263 Q232 261 228 239Z" fill="#eff4f5" stroke="#9bafb8" stroke-width="3"/>'
 +rect(382,91,109,111,9,"#536d7d","#9cb7c4",2)+rect(390,99,92,92,5,"#d8e8ed")
 +rect(260,105,107,128,15,"#e3ebef","#c2d0d7",2)
 +txt(436,225,"ID NOW",17,"#4e6471",850)+txt(437,243,"Abbott",11,"#2672a3",840);

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
 disc:"data:image/webp;base64,UklGRhgGAABXRUJQVlA4IAwGAAAwQQCdASrbAA4BPtViqVAoJSijJ1HLyRAaiWludcVT+2N0DljG5t/Mcrfr51+p1MsyQOKkTHeiuKi2nQfH4/hRy2jd5upRWod0ELTscnpSOYOzxyy6YRYzu5K27bLEKK4MZbvRwOSs2EDZ6ahh4ExhoJZxfRCKqJEC30GcLMjRedafhdpuEX+AiphNLVM3OZT1OLqs2xbgNzJnm+BzLuQZ6Aw6N50BoIwZz2uk1Hd1hQflbkkw615TZWEVvWBO+PlmPMlK86ILHIRuQeBTTwa7MxxZFh3o4tOQ4tVkJ8yLzKrb5mVw1ir4TAS+KI5cVMlCVGQNahnxygcmVMRAlvyBE4OETmDXksoTJF4WzvsmatxhERhgiKlnUFQ1owIdN5gsK9AXXA3jBOAI/QWVraVJklCNnQb7CpExY5TatGrv7NknHyUmaLIcNYgRjxevLkssVEWMWGNyf2mkznbBWCWcSUg9AzQPe6sQ+h6grKnYvNAmFNxaXtBdBTkTIDN4Vo2McqOSjnU1SkcW4mQWolZ+BcnA3e+QnjlN67qRQFIHCgYei4naud4ZEfK/YluCvd2CDRfF4Vhzh+yPCOSHl2yPAwYzKPr489IjZmNtJwSEakbcuxYfui/fwZmuhVoGU+3xxboto+gDP9seCOWzB6SNnDv6l5PVDuPegluQ0F8Ki3FKqz/Z1K9pIHFSJjvRXFQoAAD+9qdOAFCAvkUp53dHJoXgAAxdQfqz96GgoKAE4GPEStU4pfqpJ8nlTCn5qkmo2fZgL61KjcNlaQ13Le40MyYAyLFOIZvfgZAVG2aczOfnnZQoQQ1GYwWEFOjpW55n6fOAAqgZUEYXDOJC0/okEtIYupQzD85v3PxLttAKkKlZ0sgdjazYthxQjmplyuDLsZ+Ma1njzspmPbutE/VgkQfaHEqJGGgaNLU7wkfE+1bFfgdB6TJYu+iLOFU48PwsmSfop+VL82tffdcMDdIFHQqAvz7Dyggz+30hkjlvioDfgmdH1Hrwq0GidC4XfKru1OMyqtqZVOtLIWTpk5FLiXRQ6L+82VXwropEpRdAVqp5MCv7PNfLr9WAsUwQv4sNomXGkedh190jw5toz0fOKKWFBj28Fhd7XXU0xN33qlhm51m3P7G/1KGXx/UOWm8buCk33ejBnK3u4cBCOBBDHL+a3zQFr4m/R784c3tOXmflZLCGnGkXUQoJGi5ujemCeu9HaYNxDHPt7MIJ7g5+E6OJSOHSvn9lJp4D1DxXUq3A9dztn9cvjflkRTAi6gpijJQLIt5UErOgWihNZcoPxQn9qQ15/BtXdK7NiF9hOsD3sQgApfueBoqBO63itPZak4wBcyXoM8L1K+ct9Sz/QsxXNXMe6j3m62bDZhFWUFONd/sqq2vVh9vh4YhjPqEOfl/V7qInf5FMx+/NVrIHJJ4PVu80b4QkkZwKtMLjsfekimBMgXqsuciuucLxQn1dMf8XUZ/+ot1YkFqDSaI9bwgy/jWnUZ1oBbzg1GrwbRudp9cEqPtWW98ost140bGoMflLoVt+CfKMJmxEyUji5xZfXf9cFBNIHmP0h32ZQtFXaYoJPDgAIIh2Ia38fuVYPZ9S6QGG7y394RbFxkK14E77w4H5vUVXrGRxeKS98r/IOhMcvNv+yp5+rqUSTFFkZLg/Do7qYLZ60PPCsYhNlQ3Y6rlRwfZtNB9XIvIuZNO9hOrF0HLZGbTcrjmiHi3DfpgY8PzejFUk4w/p6ywH7sRtqXRyF2PP63dJOmhboUYV+oIQVqn68LzSBUGohhNynENV+d6ENgLAdkSo52ZcIFPpqjcDOBGAsi6B1O5d55XJaO6Su+vVcpId17OQZf74fWtOtAaUVZbnGLHd3YKgJ7EIGqDiNzZnOsSICxzGX/Uu39WXRoRmeai8sLIBHKhTY717niGl4eerS0K6MgvhM1iE1pJ+j0wiJCT3D2A6Pq05MqkJb6sk3h4MIDQXdmpoSeD5fRpfEnLGCuSW89oChT1F5cGmJ80xBTc2RYtAny0Ltsf6waqGmkLocegoGBkGlVs4PtaAAAAAAAA=",
 port:"data:image/webp;base64,UklGRtQEAABXRUJQVlA4IMgEAACwHACdASpaAFoAP0WIs1WwKSQyM5xdIkAoiWUANRAt6zcgq+eneK8LNQI0wk3MQi43CAoTYUpa5b6CCxondO9dEzxYNjraQDagUFa/XbqTZXLqsZL63+d+omPD+BaI660VG1f0P4lSZMyimfn6mr7yPPBITtuQ0k0rIzyZFBhj6t4yjxRg3czKd1lI1KzSdXI743mzgnnsjkee1eN9zw7+beNXeRebJbkJByxgKZknTEMN7qoQKdOITKDfaHEUuwqkXncSUv/T9ky33905ilr/KdKLfRMvkWo8I+0m3RoKVTbXxdpYeJEXgLx4zxIAAP7CrSDTWJXbFeFHQXoKQftZjBSwfNquN20zX25shBeQuABpHwu2i3NEOnCrYm8T+gyuLUdscsrM6uBaleFomCzdEy694/k5riD/8CeDzOmZO1P0fZZBvUguUdcK8C4UrItV9TuEdFuR/UCHS42Xi0PB+xzsXqBhB2D2+foErGh1bCOQzZhKaiyDpQFXHIiM5kGKIOXqrfiBTlhosbJ07Wtxj2LBm3dXStVgBqE5BQL8A1GfIT+gaSAvutrARYjAwidSTJ8oKa1O9RBaZqXsmfGnA4AygP/THlOyAiYmeT4boqeuSOnHPXk9rJJTM9KlFWTTskcNGd8Mm10rkjS1SK7yiHJIclC0/s1f8N1K0IIYewuDquWTkmxckyP18OiGZEisjx9N/oojJF2BQJXqFz+4CAI/FbDQm4fg0vokCWwbCL+ot1AKZGIeuRQYVslop3/sOkh2DZoQq8WgJW5+YShAqIlV/uJEL1I3PPfkbjRSfLr8gFsupjPR9fEbxloWODyN5mO7p1zxQ2HfC7ldWaMtxyFtLthJn1pfoSO6jmP5EU+I33Ta0LGaUJlG5hmUy/EFnF36vWqEBbkcqakYgGejEEXAaWz69BdDTmA8Gkjo02xpH1tRKaqQJg0srVEd1sSoyVUj2p0OeYJCAXBTGGMvZRt6P8xwDyL3GDzRulZu3iEeBgYCO2BjFbImz9dN7bguiCtG8mCBk6vhrW7/QyHQMJ1wKbq7qRl+425TKMYDdaNRJ6DrDvgqqn0Kv2CBofVzpaQ1pSPsbv0282alcZNXgcGFJvdUlxSd7kqxKiTzziBLo//doChXgyvZu06CPCm9HJDC7lv4TTqlGm/qdlmIG0T1yF9SRpTR9qrcV6GSieaYzlB6OxxPgSRF9mrFstXYlov9kvtcZNtrTofqZlOBq0nLmubxGi3W0+HROT1+8jkR3+FMQhLTt3HPhWHhLe/Gpgksh8XMP14vTTW01xAT7UpOTVCsSrEc2A9kMqn8cpgOu4xdNq8EIg5/84N5ViuNsrUaq0OdJk6+ZuJz5nM58vf3hX6v36muQE749vaMmomyNkiQTU+/AtFSiGJsSdYBazMPZGFcy0Tsi5Ixvw43s03shFV2PJrNul9H1F8CoB7l2gIap8EnuEaJqeeMBgx54VtoNZpweHNX3P7lpHzQkwmE4J8Occv5dVO9O5oHPcz49mvbveKcps+SNHpRwS5zmfTH72cs4LWMdwr0GyU72Wee3bKNe1nR7fxoPtTvSr1HHf/tj1m8NS93i+saVBmX2JyQLbJ0ZKeG02O6eyDBD2/AAmgAAAA="
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
 const take=t.includes("grab the")&&(t.includes("disc")||t.includes("reagent"));
 const add=(t.includes("load")&&(t.includes("disc sample port")||t.includes("sample into the disc")||t.includes("controls into the disc")));
 const analyzer=t.includes("insert the filled disc")||t.includes("click analyze")||t.includes("start the analysis");
 const qc=t.includes("qc")||t.includes("controls");
 if(!take&&!add&&!analyzer)return '';
 let pieces='';
 if(take){
  pieces='<article class="pic-vis-card"><strong>Reagent disc (top view)</strong><img loading="lazy" class="pic-user-photo" src="'+piccoloImages.disc+'" alt="User-supplied photograph of a clear Piccolo reagent disc"/><span>Inspect the sealed disc; keep level and handle by the edges.</span></article>'+
  '<article class="pic-vis-card"><strong>Locate the sample port</strong><img loading="lazy" class="pic-user-photo pic-photo-port" src="'+piccoloImages.port+'" alt="User-provided annotated Piccolo disc diagram highlighting the sample chamber in red"/>'+piccoloDiscSvg(false)+'<span>Use the small sample inlet near the disc hub, not any outer reagent chamber.</span></article>';
 }else if(add){
  pieces='<article class="pic-vis-card"><strong>Gray transfer device and disposable tip</strong><img loading="lazy" class="pic-user-photo pic-photo-tip" src="'+piccoloImages.tip+'" alt="User-supplied photograph of gray Piccolo transfer component"/>'+piccoloPipetteSvg()+'<span>Fit a fresh compatible tip. Avoid bubbles during aspiration.</span></article>'+
  (qc?'<article class="pic-vis-card"><strong>Dispense QC material into the sample port</strong>'+piccoloDiscSvg(false)+'<span>Transfer the appropriate QC material using the approved QC procedure and verify the chamber is properly filled.</span></article>':
  '<article class="pic-vis-card"><strong>Dispense blood into the sample port</strong>'+piccoloLoadingSvg()+'<span>With the disc tilted, place the tip into the sample port and fill the chamber to its molded fill line. Do not introduce bubbles.</span></article>'+
  '<article class="pic-vis-card"><strong>Disc after blood loading</strong>'+piccoloDiscSvg(true)+'<span>The red region illustrates blood in the near-center sample chamber. Start analysis within 10 minutes of filling the disc.</span></article>');
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


/* Procedure-linked consumable and collection media references.
   All graphics are schematic, not device screens or direct photographs. */
const collection={
 sysmex:[["lavender","EDTA whole blood","Lavender-top tube"]],
 piccolo:[["green","Lithium-heparin whole blood","Green-top tube; approved plasma option"]],
 pathfast:[["green","Lithium-heparin whole blood","Green-top tube or prepared plasma"]],
 triage:[["lavender","EDTA blood","For cardiac panels"],["urine","Urine specimen","For urine/toxicology assays"]],
 clinitek:[["urine","Fresh urine","Clean collection cup"]],
 torch:[["stool","Stool in Cary Blair","GI panel transport medium"]],
 spotfire:[["utm","Respiratory swab","UTM/VTM per assay"],["eswab","Throat swab","eSwab per assay"]],
 febridx:[["finger","Fingerstick capillary blood","Direct application; no collection tube"]],
 "drug-screen":[["urine","Urine specimen","Screening collection cup"]],
 coagsense:[["finger","Fingerstick capillary blood","Transfer tube; no EDTA tube"]],
 poc:[["varies","Specimen varies","Confirm the specific assay IFU"]],
 sofia:[["swab","Respiratory or throat swab","Assay-specific extraction kit"]],
 hemocue:[["finger","Capillary whole blood","Direct-fill microcuvette; no tube"]],
 visby:[["swab","Assay-specific swab","Archived platform"]],
 idnow:[["swab","Direct swab","Archived; use assay-specific IFU"]]
};
function visualEsc(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function illustratedSvg(inner,label,view="0 0 320 210"){
 return '<svg viewBox="'+view+'" role="img" aria-label="'+visualEsc(label)+'" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="equip-white" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#cfdee5"/></linearGradient></defs>'+inner+'</svg>';
}
function mediaSvg(kind){
 const caps={green:"#37966e",lavender:"#9568b3",red:"#c65b5d",blue:"#548eb6"};
 if(caps[kind]){
  return illustratedSvg('<ellipse cx="160" cy="174" rx="39" ry="7" fill="#e7eef2"/>'+
   '<rect x="135" y="41" width="50" height="133" rx="12" fill="#f0f8fa" fill-opacity=".78" stroke="#96b8c7" stroke-width="3"/>'+
   '<path d="M138 99 H182 V157 Q182 170 172 170 H148 Q138 170 138 155Z" fill="#ac3548" opacity=".67"/>'+
   '<rect x="130" y="27" width="60" height="30" rx="8" fill="'+caps[kind]+'" stroke="#718f9f" stroke-width="3"/>'+
   '<rect x="139" y="105" width="42" height="37" rx="3" fill="#fff" opacity=".96"/>'+
   '<text x="160" y="118" text-anchor="middle" font-size="7.6" fill="#405e72" font-weight="800">'+(kind==="green"?"LI-HEP":"EDTA")+'</text>'+
   '<text x="160" y="132" text-anchor="middle" font-size="7" fill="#6a8393">BLOOD</text>',
   kind+"-top whole blood collection tube");
 }
 if(kind==="finger")return illustratedSvg(
  '<path d="M103 169 L103 106 Q103 64 122 61 Q143 59 147 79 L149 111 Q150 126 158 128 Q168 126 167 106 L169 84 Q169 70 181 70 Q195 70 195 86 L199 133 Q206 151 225 160 L232 177 L103 177Z" fill="#e6bbae" stroke="#c78e7e" stroke-width="3"/>'+
  '<path d="M125 61 Q139 63 142 74" stroke="#ba8173" stroke-width="3" fill="none"/>'+
  '<path d="M130 40 C116 56 117 67 130 70 C143 69 145 56 130 40Z" fill="#be3543"/>'+
  '<path d="M140 49 L178 27 H222" stroke="#c44352" stroke-width="2" fill="none"/>'+
  '<text x="225" y="24" font-size="12" fill="#8b3949" font-weight="850">BLOOD DROP</text>',
  "Fingerstick capillary blood droplet, direct collection");
 if(["urine","stool"].includes(kind)){
  const stool=kind==="stool";
  return illustratedSvg('<ellipse cx="159" cy="182" rx="66" ry="8" fill="#e7eef2"/>'+
   '<rect x="96" y="63" width="128" height="112" rx="15" fill="#edf6f8" stroke="#93acba" stroke-width="3"/>'+
   '<path d="M104 115 H216 V152 Q216 169 203 169 H118 Q104 167 104 151Z" fill="'+(stool?"#9c815f":"#e0b861")+'" opacity=".54"/>'+
   '<rect x="91" y="47" width="138" height="30" rx="9" fill="'+(stool?"#c9474a":"#fafbfc")+'" stroke="#9bb2bd" stroke-width="3"/>'+
   '<rect x="117" y="94" width="86" height="28" rx="4" fill="white"/>'+
   '<text x="160" y="111" font-size="12" fill="#486a7c" text-anchor="middle" font-weight="800">'+(stool?"CARY BLAIR":"URINE")+'</text>',
   stool?"Stool Cary Blair transport container":"Urine collection cup");
 }
 if(["utm","eswab","swab"].includes(kind)){
  return illustratedSvg('<ellipse cx="157" cy="179" rx="66" ry="8" fill="#e7eef2"/>'+
   '<rect x="139" y="62" width="41" height="112" rx="13" fill="#eef7fa" stroke="#9ab8c7" stroke-width="3"/>'+
   '<path d="M144 132 H175 V158 Q175 170 166 171 H151 Q144 169 144 158Z" fill="#a9d7e2" opacity=".65"/>'+
   '<rect x="134" y="49" width="52" height="22" rx="7" fill="'+(kind==="eswab"?"#dde8ef":"#c57a8b")+'" stroke="#89a6b6" stroke-width="3"/>'+
   '<path d="M215 32 L213 140" stroke="#ae9d89" stroke-width="5" stroke-linecap="round"/>'+
   '<ellipse cx="213" cy="146" rx="9" ry="16" fill="#f8fcfd" stroke="#b8cad3"/>'+
   '<text x="118" y="34" font-size="11" text-anchor="middle" fill="#486f83" font-weight="800">'+(kind==="utm"?"UTM / VTM":kind==="eswab"?"ESWAB":"SWAB")+'</text>',
   "Swab with sample transport tube or extraction vial");
 }
 return illustratedSvg('<rect x="94" y="65" width="135" height="95" rx="13" fill="#f3f7f9" stroke="#abc1cd" stroke-width="3"/>'+
 '<path d="M109 90 H215 M109 112 H202 M109 134 H188" stroke="#a4c3d0" stroke-width="5" stroke-linecap="round"/>'+
 '<text x="160" y="178" font-size="11" fill="#537a90" text-anchor="middle">VERIFY ASSAY</text>',
 "Assay-specific specimen collection reference");
}
function specimenGuide(sec){
 if(!sec||!collection[sec.id])return "";
 const items=collection[sec.id],arch=!!sec.archived;
 return '<section class="device-collection-guide" aria-label="Collection container reference">'+
 '<div class="device-collection-heading"><div><span class="device-collection-kicker">'+(sec.id==='pathfast'?'PATIENT TESTING · SPECIMEN':'SPECIMEN & COLLECTION')+'</span><h3>'+(sec.id==='pathfast'?'Sample to use':'What to collect')+'</h3><p>'+(sec.id==='pathfast'?'Use lithium-heparin whole blood or prepared plasma as permitted by the assay IFU. This illustration does not indicate sample volume.':'Choose the container for the specific assay. Illustrations are not specimen volume or fill guides.')+'</p></div>'+
 (arch?'<span class="device-historical-mark">ARCHIVED</span>':'')+'</div>'+
 '<div class="device-collection-list">'+items.map(x=>'<article class="device-collection-item"><div class="device-media-picture">'+mediaSvg(x[0])+'</div><div><strong>'+visualEsc(x[1])+'</strong><span>'+visualEsc(x[2])+'</span></div></article>').join('')+'</div>'+
 (sec.id==='triage'||sec.id==='spotfire'||sec.id==='poc'||sec.id==='sofia'?'<p class="device-collection-caveat">Specimen and kit depend on the selected assay. Confirm the current assay IFU and approved site SOP.</p>':'')+
 '</section>';
}



/* Separate CLINITEK Status+ consumables. A strip and an hCG cassette must
   never be represented as one combined test device. */
function clinitekKit(kind,filled){
 const name=kind==="hcg"?"CLINITEST hCG cassette":"Siemens urinalysis dipstick";
 if(kind==="hcg"){
  const cassette='<ellipse cx="154" cy="173" rx="121" ry="11" fill="#e9eff2"/>'+
   '<rect x="39" y="67" width="236" height="92" rx="17" fill="#f7fafb" stroke="#94abb9" stroke-width="3.5"/>'+
   '<path d="M50 78 H262" stroke="#e4ebef" stroke-width="3"/>'+
   '<rect x="70" y="97" width="101" height="35" rx="6" fill="#e1ebee" stroke="#b2c7d1" stroke-width="2"/>'+
   '<rect x="85" y="104" width="73" height="21" rx="4" fill="#f5f8f9" stroke="#c5d4dc"/>'+
   '<text x="91" y="102" font-size="9" fill="#6b8799" font-family="Arial">C</text>'+
   '<text x="126" y="102" font-size="9" fill="#6b8799" font-family="Arial">T</text>'+
   
   '<circle cx="224" cy="115" r="16" fill="'+(filled?"#ecd3dd":"#f9fdff")+'" stroke="#9aaeba" stroke-width="3"/>'+
   '<circle cx="224" cy="115" r="8" fill="'+(filled?"#b77b91":"#edf4f7")+'" opacity=".9"/>'+
   '<text x="224" y="144" font-family="Arial" font-size="10" fill="#4b7185" font-weight="850" text-anchor="middle">S</text>'+
   '<text x="117" y="146" font-family="Arial" font-size="10" fill="#506d80" font-weight="850" text-anchor="middle">CLINITEST hCG</text>'+
   '<path d="M224 94 L250 34 L304 34" fill="none" stroke="#258b9b" stroke-width="2.3"/>'+
   '<text x="265" y="26" font-size="11" fill="#27687a" font-family="Arial" font-weight="850" text-anchor="middle">SAMPLE WELL</text>'+
   (filled?'<path d="M215 80 Q206 95 214 97 Q223 98 215 80Z" fill="#c46c7d" opacity=".8"/>':'');
  return illustratedSvg(cassette,name+(filled?" with urine applied to its sample well":" unused; sample well empty"));
 }
 const colors=filled?["#cac868","#aa7595","#78a7bf","#d8b678","#a57db1","#b5cd8f","#de9a7a","#a7bcda","#c3a768","#9ab891"]:["#f4df94","#d0c0dc","#e5d5a3","#c9e3a1","#e9d8b3","#cfc4b3","#f0d3ae","#d3d4e9","#cfd8aa","#dfd8b2"];
 const strip='<ellipse cx="153" cy="158" rx="146" ry="9" fill="#e8eff2"/>'+
  '<rect x="16" y="91" width="280" height="35" rx="6" fill="#f5f8fa" stroke="#98b3c1" stroke-width="2.6"/>'+
  '<rect x="17" y="98" width="61" height="21" rx="3" fill="#e8f0f4"/>'+
  '<text x="45" y="111" font-size="11" font-family="Arial" font-weight="800" fill="#4f839b" text-anchor="middle">UA</text>'+
  colors.map((color,i)=>'<rect x="'+(81+i*20)+'" y="97" width="16" height="23" rx="3" fill="'+color+'" stroke="#b8c6cd" stroke-width="1"/>').join('')+
  '<path d="M80 121 L280 121" stroke="#b6c3cc" stroke-width="2"/>'+
  '<path d="M95 90 L95 69 L136 69" stroke="#328ba0" stroke-width="2" fill="none"/>'+
  '<text x="137" y="65" font-family="Arial" font-size="10" fill="#2c7088" font-weight="850">REAGENT PADS</text>'+
  (filled?'<path d="M180 34 Q159 66 180 69 Q201 66 180 34Z" fill="#dfb664" opacity=".65"/>':'');
 return illustratedSvg(strip,name+(filled?" after dipping urine onto reagent pads":" before dipping"));
}
function clinitekVisualGuide(sec){
 const build=(type,label,color,steps,desc,open)=>{
  const cards=steps.map((st,i)=>{
   let visual;
   if(i===0)visual=mediaSvg("urine");
   else if(i===steps.length-1)visual=illustratedSvg(body("urine",specs.clinitek.accent),"CLINITEK Status+ device","0 0 740 310");
   else visual=clinitekKit(type,i>=2);
   return '<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+visualEsc(st[0])+'</strong></div>'+
   '<div class="device-gallery-image">'+visual+'</div><p>'+visualEsc(st[1])+'</p></article>';
  }).join('');
  return '<details class="clinitek-visual-track" '+(open?'open':'')+'><summary><span class="clinitek-track-icon '+color+'">'+(type==="hcg"?"hCG":"UA")+'</span>'+
   '<span><strong>'+label+'</strong><small>'+desc+'</small></span><span class="clinitek-track-chevron" aria-hidden="true"></span></summary>'+
   '<div class="clinitek-track-content"><div class="device-gallery-grid">'+cards+'</div></div></details>';
 };
 const ua=[
 ["Collect a fresh urine specimen","Use a clean dry container and check patient identification."],
 ["Identify the UA dipstick","Remove a reagent strip from the bottle and recap it immediately. Use the strip test table insert."],
 ["Press START, dip, blot, and position strip","Press START first. Within 8 seconds, wet the reagent pads, blot the edge, and place the pads-up strip in its channel."],
 ["Read the strip on CLINITEK Status+","Let the analyzer pull in the test table automatically, review results, and discard the used strip."]
 ];
 const hcg=[
 ["Collect a fresh urine specimen","Use a clean dry container and verify the requisition and patient."],
 ["Identify the hCG cassette and pipette","Use an unopened CLINITEST hCG cassette and the single-use pipette provided in its pack."],
 ["Place cassette, then press START","Select Cassette Test, position the cassette on the correct test table insert, and select START. Do not prefill."],
 ["Dispense urine into the hCG cassette","Within the 8-second window, use the included pipette to transfer one 200 µL stem of urine to the sample well. Do not dispense the overflow reservoir."],
 ["Read the hCG cassette on CLINITEK Status+","Let the test table pull in, review the interpreted result, then discard the used cassette."]
 ];
 return '<section class="device-gallery clinitek-gallery" aria-label="Separate Clinitek urinalysis and hCG illustrated workflows">'+
 '<div class="device-gallery-heading"><div><span>CHOOSE TEST TYPE</span><h2>Two separate testing workflows</h2><p>Open only the test being performed. The UA strip and hCG cassette are not interchangeable.</p></div></div>'+
 build("ua","Urinalysis dipstick","strip",ua.length?ua:[],"Dipstick with reagent pads · Strip Test",true)+
 build("hcg","hCG pregnancy cassette","cassette",hcg,"White cassette and single-use pipette · Cassette Test",false)+
 '<p class="device-gallery-note">Follow the current Siemens CLINITEK Status+ Operator Guide and your approved site SOP. Illustrations are simplified training references.</p></section>';
}
/* PATHFAST reagent cartridge based on the PHC/LSI Medience cartridge reference:
   Long black-foil strip, clear sample trough at the front red tab,
   multiple transparent reagent wells, and a separate black detection well.
   Drawn as an original schematic, not a manufacturer image or fill-scale guide. */
function pathfastCartridgeSvg(filled,showPipette=false,material='blood'){
 const isQC=material==="calqc";
 const red=filled?(isQC?"#a9c5eb":"#bc4654"):"#e8f6fa";
 const liquid=filled?(isQC?"#7196c8":"#a82d45"):"#d9edf4";
 const chambers=Array.from({length:7},(_,i)=>{
  const x=196+i*46;
  return '<path d="M'+x+' 161 L'+(x+4)+' 215 Q'+(x+13)+' 234 '+(x+26)+' 216 L'+(x+31)+' 154Z" fill="'+(i%2?'#dcebf1':'#c2dce7')+'" fill-opacity=".72" stroke="#9dbdcd" stroke-width="2"/>'+
   '<path d="M'+(x+8)+' 168 L'+(x+11)+' 211" stroke="#fff" stroke-opacity=".82" stroke-width="3"/>';
 }).join("");
 const strips=Array.from({length:20},(_,i)=>{
  const x=468+i*4;
  return '<path d="M'+x+' 122 l0 20" stroke="'+(i%3?"#1c2930":"#f7fcfd")+'" stroke-width="'+(i%4===0?2.6:1.2)+'"/>';
 }).join("");
 const top=
 '<ellipse cx="338" cy="259" rx="253" ry="11" fill="#c6d8e1" opacity=".48"/>'+
 chambers+
 '<path d="M157 139 L548 118 L562 157 L165 184Z" fill="#e7f1f6" fill-opacity=".75" stroke="#a0b9c7" stroke-width="2.5"/>'+
 '<path d="M163 115 L544 99 L562 153 L175 169Z" fill="#1d262e" stroke="#7d939f" stroke-width="2.5"/>'+
 '<path d="M177 165 L564 149" fill="none" stroke="#eef8fb" stroke-width="3"/>'+
 '<path d="M215 116 L226 164 M248 113 L260 163 M284 111 L295 162 M319 110 L330 161" stroke="#62737d" stroke-width="1.5" opacity=".72"/>'+
 '<path d="M154 116 L191 114 L202 166 L173 168Z" fill="#e54d43" stroke="#b43f3c" stroke-width="1.8"/>'+
 '<path d="M176 121 L191 120" stroke="#fff0e8" stroke-width="1.8" opacity=".85"/>'+
 '<path d="M447 112 L545 107 L552 143 L454 146Z" fill="#e5edf0" stroke="#8f9fa7" stroke-width="1.8"/>'+
 strips+
 '<rect x="501" y="113" width="41" height="3.5" rx="1" fill="#869ca8"/>'+
 '<path d="M541 99 L559 98 L574 151 L562 153Z" fill="#df5b4e" stroke="#a73d34" stroke-width="1.4"/>'+
 '<ellipse cx="372" cy="134" rx="18" ry="13" fill="#050b0e" stroke="#7d8e9a" stroke-width="3"/>'+
 '<ellipse cx="372" cy="134" rx="8" ry="6" fill="#1c353d" stroke="#495e67" stroke-width="1.5"/>'+
 '<path d="M87 136 L156 125 L176 169 L99 187Z" fill="#eef9fd" fill-opacity=".72" stroke="#8faebe" stroke-width="3"/>'+
 '<path d="M102 145 L145 138 L154 168 L105 178Z" fill="#c3e2ec" fill-opacity=".7" stroke="#84aaba" stroke-width="2"/>'+
 '<path d="M105 157 L149 150 L154 167 L108 174Z" fill="'+liquid+'" fill-opacity="'+(filled?".96":".58")+'"/>'+
 '<path d="M105 156 L148 149" stroke="#86a6b3" stroke-width="1.8" stroke-dasharray="4 3"/>'+
 '<path d="M92 143 L98 169 M100 140 L107 171" stroke="#fff" stroke-opacity=".76" stroke-width="2"/>'+
 '<path d="M89 187 L176 169" stroke="#91b6c6" stroke-width="2"/>';
 const callouts=
 '<path d="M124 145 L110 93 L58 93" fill="none" stroke="#198a99" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<circle cx="124" cy="145" r="4.4" fill="#168c9a"/>'+
 '<text x="57" y="83" font-family="Arial,sans-serif" fill="#246b7d" font-size="13" font-weight="850">SAMPLE WELL</text>'+
 '<path d="M372 116 L378 80 L453 80" fill="none" stroke="#647f8c" stroke-width="2" stroke-linecap="round"/>'+
 '<text x="379" y="68" font-family="Arial,sans-serif" fill="#547080" font-size="11" font-weight="750">DETECTION WELL</text>';
 const detail=
 '<rect x="574" y="62" width="153" height="180" rx="12" fill="#fff" stroke="#c9dfe8" stroke-width="2"/>'+
 '<text x="651" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="850" fill="#315e76">SAMPLE WELL</text>'+
 '<text x="651" y="99" text-anchor="middle" font-family="Arial,sans-serif" font-size="9.5" fill="#658294">ENLARGED TOP VIEW</text>'+
 '<rect x="605" y="109" width="94" height="98" rx="9" fill="#e9f5f9" fill-opacity=".95" stroke="#8dadbc" stroke-width="3"/>'+
 '<rect x="620" y="119" width="64" height="74" rx="6" fill="#f7fcfd" stroke="#88adbf" stroke-width="2.6"/>'+
 '<rect x="624" y="151" width="56" height="37" rx="3" fill="'+red+'" fill-opacity="'+(filled?".9":".28")+'"/>'+
 '<path d="M622 151 H683" stroke="#6596a7" stroke-width="2.4" stroke-dasharray="5 3"/>'+
 '<text x="651" y="223" text-anchor="middle" font-family="Arial,sans-serif" font-size="10.5" font-weight="800" fill="'+(filled?"#9a4051":"#326e82")+'">'+(filled?"SAMPLE LOADED":"WELL EMPTY")+'</text>';
 const transfer=showPipette?
 '<g aria-label="Transfer pipette containing sample, delivering into the clear sample well">'+
 '<path d="M201 1 L164 68 L137 129 L128 150" fill="none" stroke="#8da6b6" stroke-width="26" stroke-linecap="round"/>'+
 '<path d="M201 1 L164 68 L137 129 L128 150" fill="none" stroke="#eaf6fa" stroke-width="21" stroke-linecap="round"/>'+
 '<path d="M171 49 L137 120" fill="none" stroke="'+(isQC?'#7497c5':'#b44953')+'" stroke-width="9" stroke-linecap="round"/>'+
 '<path d="M126 129 L124 146 L132 144 L138 127Z" fill="#d2e9f1" stroke="#7b9fb0" stroke-width="2"/>'+
 '<path d="M128 147 C123 158 123 162 129 164 C135 162 135 156 128 147Z" fill="'+(isQC?'#7599c7':'#b53a4a')+'" stroke="#8b7a8d" stroke-width="1"/>'+
 '<text x="233" y="30" font-family="Arial,sans-serif" font-size="13" font-weight="850" fill="#376c82">TRANSFER PIPETTE</text>'+
 '<path d="M213 37 L182 58" stroke="#328e9b" stroke-width="2.6" fill="none"/>'+
 '</g>':'';
 const info='<text x="311" y="244" text-anchor="middle" font-family="Arial,sans-serif" font-size="10.5" fill="#698395">Long cartridge • clear sample tip • black foil and reagent wells</text>';
 return illustratedSvg(top+callouts+detail+info+transfer,
  "PATHFAST reagent cartridge, "+(filled?(isQC?"control material":"whole blood")+" in the clear rectangular sample well":"empty clear rectangular sample well")+" at the red-marked front end; separate black detection well must not receive blood",
  "0 0 740 310");
}


/* Large illustrated equipment used by patient and calibration guides.
   The six aluminum channels and long black-foil cartridges are drawn after
   manufacturer rack photos, not as a dimensionally exact machine diagram. */
function pathfastRackSvg(mode="patient"){
 const isCal=mode==="cal";
 const items=isCal?["CAL 1","CAL 1","CAL 2","CAL 2","QC 1","QC 2"]:["SAMPLE 1","SAMPLE 2","","","",""];
 const fills=["#7caed6","#7caed6","#ad99d4","#ad99d4","#d4aa66","#7cbda7"];
 let h='<defs><linearGradient id="pfRackMetal" x1="0" y1="0" x2=".75" y2="1"><stop stop-color="#f9fdff"/><stop offset=".5" stop-color="#bccbd2"/><stop offset="1" stop-color="#eef4f6"/></linearGradient><linearGradient id="pfRackWell" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#edfaff" stop-opacity=".95"/><stop offset="1" stop-color="#b0d7e3" stop-opacity=".85"/></linearGradient></defs>'+
 '<ellipse cx="490" cy="370" rx="395" ry="25" fill="#b6c9d2" opacity=".3"/>'+
 '<path d="M88 325 L235 102 L851 105 L930 327 L829 357 L158 357Z" fill="url(#pfRackMetal)" stroke="#8ca5b4" stroke-width="5"/>'+
 '<path d="M203 112 L860 116" stroke="#f6fcff" stroke-width="12" stroke-linecap="round"/>';
 for(let i=0;i<6;i++){
   const x=160+i*126,active=!!items[i],label=items[i],ink=fills[i],lx=x+42;
   h+='<g aria-label="Lane '+(i+1)+(active?" with "+label+" cartridge":" empty")+'">'+
      '<path d="M'+(x-8)+' 123 L'+(x-28)+' 343" stroke="#94aab4" stroke-width="9" stroke-linecap="round"/>'+
      '<path d="M'+(x+95)+' 123 L'+(x+77)+' 343" stroke="#f5faff" stroke-width="10" stroke-linecap="round"/>'+
      '<path d="M'+(x-4)+' 131 L'+(x+89)+' 131 L'+(x+71)+' 335 L'+(x-22)+' 335Z" fill="'+(active?"#d8e3e8":"#ecf2f5")+'" stroke="#9cb0bb" stroke-width="2"/>'+
      (active?'<path d="M'+(x+7)+' 147 L'+(x+74)+' 147 L'+(x+56)+' 309 L'+(x-10)+' 309Z" fill="#1c282e" stroke="#506876" stroke-width="2"/>'+
        '<path d="M'+(x+7)+' 147 L'+(x+74)+' 147 L'+(x+73)+' 166 L'+(x+5)+' 166Z" fill="#d65850"/>'+
        '<path d="M'+(x+8)+' 183 L'+(x+70)+' 183" stroke="#dce5e9" stroke-width="6"/>'+
        Array.from({length:11},(_,j)=>'<path d="M'+(x+14+j*4.8)+' 189 v29" stroke="'+(j%3===0?"#f7fcfd":"#98aab4")+'" stroke-width="'+(j%3===0?2:1)+'"/>').join("")+
        '<circle cx="'+(x+36)+'" cy="245" r="17" fill="#050b12" stroke="#a7b8c0" stroke-width="4"/>'+
        '<circle cx="'+(x+36)+'" cy="245" r="6" fill="#34454d"/>'+
        '<path d="M'+(x-9)+' 296 L'+(x+58)+' 296 L'+(x+54)+' 326 L'+(x-13)+' 326Z" fill="url(#pfRackWell)" stroke="#70a5b6" stroke-width="2.5"/>'+
        '<path d="M'+(x-5)+' 311 L'+(x+54)+' 311 L'+(x+52)+' 325 L'+(x-8)+' 325Z" fill="'+(isCal?ink:"#a8404e")+'" opacity=".82"/>'+
        '<path d="M'+(x-4)+' 307 L'+(x+55)+' 307" stroke="#6a9daf" stroke-dasharray="4 3" stroke-width="2"/>' :
        '<path d="M'+(x+2)+' 143 L'+(x+80)+' 143 M'+(x-12)+' 326 L'+(x+70)+' 326" stroke="#bbcbd3" stroke-width="4"/>' )+
      '<rect x="'+(lx-45)+'" y="53" width="90" height="48" rx="9" fill="'+(active?"#f3f9fc":"#f5f7f9")+'" stroke="'+(active?"#aec9d5":"#d3dde2")+'"/>'+
      '<text x="'+lx+'" y="72" font-size="12" text-anchor="middle" font-weight="850" fill="#557b91">LANE '+(i+1)+'</text>'+
      '<text x="'+lx+'" y="89" font-size="12.5" text-anchor="middle" font-weight="900" fill="'+(active?"#295c73":"#a7b5bf")+'">'+(label||"EMPTY")+'</text>'+
      '</g>';
 }
 h+='<path d="M106 335 L899 335 L840 361 L149 360Z" fill="#c5d3dc" stroke="#95a7b2" stroke-width="4"/>'+
 '<path d="M142 350 L847 350" stroke="#f7fcff" stroke-width="5" opacity=".9"/>'+
 '<text x="489" y="402" text-anchor="middle" font-size="16" font-weight="850" fill="#607c8e">'+(isCal?"SIX LOADED CARTRIDGES · CAL 1 / CAL 2 / QC":"ILLUSTRATED SAMPLE RACK · TWO OCCUPIED POSITIONS")+'</text>';
 return illustratedSvg(h,"PATHFAST six-slot metal reagent cartridge rack with "+(isCal?"all six long reagent cartridges loaded, CAL 1 twice, CAL 2 twice, QC 1 and QC 2":"two long sample cartridges inserted and four empty aluminum channels"),"0 0 980 420");
}
function pathfastTipRackSvg(mode="patient"){
 const activeCount=mode==="cal"?6:2;
 let h='<rect x="110" y="215" width="750" height="80" rx="19" fill="#d8e6ec" stroke="#96aebb" stroke-width="5"/>'+
 '<rect x="129" y="232" width="712" height="43" rx="12" fill="#f7fbfd" stroke="#b5cdd7" stroke-width="3"/>';
 for(let i=0;i<6;i++){
 const x=195+i*112;
 if(i>=activeCount){h+='<ellipse cx="'+x+'" cy="225" rx="22" ry="10" fill="#8aa6b3" opacity=".65"/><text x="'+x+'" y="182" text-anchor="middle" fill="#9babba" font-size="11" font-weight="800">EMPTY</text>';continue;}
 h+='<g><ellipse cx="'+x+'" cy="225" rx="22" ry="10" fill="#8aa6b3"/>'+
 '<rect x="'+(x-11)+'" y="85" width="23" height="130" rx="8" fill="#f1fafb" stroke="#93b8c8" stroke-width="2.5"/>'+
 '<path d="M'+(x-6)+' 212 L'+x+' 244 L'+(x+7)+' 212Z" fill="#bfd8e3" stroke="#91abb9" stroke-width="2"/>'+
 '<rect x="'+(x-22)+'" y="75" width="44" height="18" rx="6" fill="#deeaf0" stroke="#88a7b8" stroke-width="2"/>'+
 '<text x="'+x+'" y="67" text-anchor="middle" fill="#3e6b80" font-weight="850" font-size="14">'+(i+1)+'</text></g>';
 }
 h+='<text x="490" y="351" text-anchor="middle" font-size="17" font-weight="850" fill="#4d7488">'+(mode==="cal"?"SIX ACTIVE LANES · SIX NEW TIPS":"TWO ACTIVE EXAMPLE LANES · TWO NEW TIPS")+'</text>';
 return illustratedSvg(h,"Six new disposable PATHFAST pipette tips shown in lane-numbered positions, schematic training view","0 0 980 400");
}
function pathfastResultsSvg(mode="patient"){
 const qc=mode==="cal";
 const paperTitle=qc?"CAL / QC REVIEW":"RESULT REVIEW";
 let h='<ellipse cx="489" cy="330" rx="350" ry="14" fill="#cad9e1" opacity=".4"/>'+
 '<rect x="112" y="42" width="338" height="266" rx="13" fill="#fcfefe" stroke="#a7c0ca" stroke-width="4"/>'+
 '<rect x="137" y="66" width="288" height="43" rx="6" fill="#dfecf3"/>'+
 '<text x="282" y="94" text-anchor="middle" fill="#315e79" font-family="Arial,sans-serif" font-size="20" font-weight="850">'+paperTitle+'</text>'+
 '<text x="146" y="139" fill="#567488" font-family="Arial,sans-serif" font-size="14">Assay / specimen ID</text>'+
 '<rect x="307" y="122" width="109" height="23" rx="6" fill="#ecf2f5"/>'+
 '<path d="M147 166 H412 M147 200 H412 M147 236 H412 M147 273 H412" stroke="#dce7ed" stroke-width="3"/>'+
 '<text x="148" y="189" fill="#51758b" font-family="Arial,sans-serif" font-size="14">'+(qc?"CAL 1 / CAL 2":"Reported value")+'</text>'+
 '<text x="147" y="225" fill="#51758b" font-family="Arial,sans-serif" font-size="14">'+(qc?"QC 1 / QC 2":"Instrument flags")+'</text>'+
 '<text x="148" y="259" fill="#51758b" font-family="Arial,sans-serif" font-size="14">Verify status</text>'+
 '<rect x="334" y="174" width="75" height="21" rx="5" fill="#e1f2ed"/>'+
 '<rect x="334" y="210" width="75" height="21" rx="5" fill="#e1f2ed"/>'+
 '<rect x="334" y="244" width="75" height="21" rx="5" fill="#e9f0f4"/>'+
 '<path d="M346 184 l5 5 10 -12 M346 219 l5 5 10 -12" fill="none" stroke="#268373" stroke-width="3" stroke-linecap="round"/>'+
 '<rect x="531" y="78" width="313" height="205" rx="19" fill="#edf4f6" stroke="#a5bbc8" stroke-width="4"/>'+
 '<rect x="557" y="98" width="261" height="36" rx="6" fill="#d9e9f0"/>'+
 '<text x="688" y="121" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="850" fill="#3d6b82">AFTER THE RUN</text>'+
 '<path d="M582 160 H790" stroke="#b2c9d6" stroke-width="4"/>'+
 '<path d="M591 178 l23 24 40-50" fill="none" stroke="#328b75" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<text x="685" y="184" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#426d81">Verify before</text>'+
 '<text x="685" y="203" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#426d81">'+(qc?"patient testing":"reporting")+'</text>'+
 '<path d="M580 236 H796" stroke="#c6d9df" stroke-width="3"/>'+
 '<text x="687" y="265" text-anchor="middle" font-size="14" font-family="Arial,sans-serif" fill="#567b8d">Use approved SOP</text>';
 return illustratedSvg(h,"PATHFAST post-run review showing illustrative result report and verification checklist with no real patient data","0 0 980 370");
}

function pathfastActionVisual(stage,mode="patient"){
 const qc=mode==="cal";
 const pic=stage==="dispense"?pathfastCartridgeSvg(true,true,qc?"calqc":"blood"):
 stage==="rack"?pathfastRackSvg(mode):
 stage==="tips"?pathfastTipRackSvg(mode):
 stage==="results"?pathfastResultsSvg(mode):
 pathfastCartridgeSvg(false);
 const tag=stage==="dispense"?"PIPETTE INTO THE CLEAR SAMPLE WELL":
 stage==="rack"?"ACTUAL RACK LAYOUT · CARTRIDGES INSERTED":
 stage==="tips"?"SIX LANE TIP POSITIONS":
 stage==="results"?"RESULT AND STATUS VERIFICATION":"CHECK THE UNUSED REAGENT CARTRIDGE";
 const note=stage==="dispense"?"Schematic pipette and well. Add the assay-specific material only to the clear front sample well, fill to the mark and avoid bubbles.":
 stage==="rack"?"Six-slot aluminum rack; actual occupied lanes and assay assignments must match the instrument display.":
 stage==="tips"?"Use approved new tips in each active position. Follow the operator manual and the instrument display.":
 stage==="results"?"Review actual instrument output, flags and calibration/QC acceptability. Follow reporting and disposal procedures; this is a schematic reference, not a result.":
 "Confirm the cartridge type and front sample well; inspect packaging, seal, and expiration.";
 return '<figure class="pf-action-figure"><div class="pf-action-heading">'+tag+'</div><div class="pf-action-image">'+pic+'</div><figcaption>'+note+'</figcaption></figure>';
}

/* Three distinct Sysmex EIGHTCHECK 3WP QC vials.
   Low (red cap), Normal (white cap), High (black cap). */
function eightcheckControlSvg(){
 const vials=[
  {x:56,level:"LOW",code:"3WP-L",cap:"#d84646",stripe:"#d84847"},
  {x:161,level:"NORMAL",code:"3WP-N",cap:"#f7f8f9",stripe:"#2d9f90"},
  {x:266,level:"HIGH",code:"3WP-H",cap:"#20242a",stripe:"#b34e42"}
 ];
 const art=vials.map(v=>{
  const x=v.x;
  return '<g><ellipse cx="'+(x+37)+'" cy="187" rx="33" ry="5" fill="#d9e3e8"/>'+
    '<rect x="'+(x+6)+'" y="53" width="63" height="133" rx="15" fill="#6e2630" stroke="#794853" stroke-width="2.5"/>'+
    '<rect x="'+(x+5)+'" y="30" width="65" height="38" rx="10" fill="'+v.cap+'" stroke="#7c8a90" stroke-width="2.5"/>'+
    Array.from({length:8},(_,i)=>'<path d="M'+(x+11+i*7)+' 35v25" stroke="'+(v.level==="HIGH"?"#59606b":v.level==="LOW"?"#bc393c":"#c1ced3")+'" stroke-width="1.5"/>').join("")+
    '<rect x="'+(x+7)+'" y="90" width="61" height="72" rx="4" fill="#f6fafb"/>'+
    '<rect x="'+(x+7)+'" y="91" width="61" height="20" fill="'+v.stripe+'"/>'+
    '<text x="'+(x+37)+'" y="105" text-anchor="middle" font-size="9.3" font-weight="850" fill="#fff">EIGHTCHECK</text>'+
    '<text x="'+(x+37)+'" y="126" text-anchor="middle" font-size="11" font-weight="900" fill="#394c59">'+v.code+'</text>'+
    '<text x="'+(x+37)+'" y="145" text-anchor="middle" font-size="11" fill="#526b76">1.5 mL</text>'+
    '<text x="'+(x+37)+'" y="207" text-anchor="middle" font-size="12" font-weight="900" fill="#286276">'+v.level+'</text>'+
    '</g>';
 }).join("");
 return illustratedSvg(art,'Three distinct Sysmex EIGHTCHECK-3WP blood control vials: low with red cap, normal with white cap, high with black cap','0 0 390 220');
}

function kitShape(id,filled,context){
 const sampleColor=context==="qc"?"#6c9bcc":"#b73d4c";
 const specimen=filled?sampleColor:"#e5f1f5";
 const outline="#87a5b7",dark="#385b72";
 let h='';
 if(id==="piccolo"){
  return piccoloDiscSvg(filled);
 }
 if(id==="pathfast")return pathfastCartridgeSvg(filled);
 if(id==="sysmex"){
  if(context==="qc")return eightcheckControlSvg();
  h='<rect x="114" y="38" width="91" height="146" rx="15" fill="#edf7fa" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="105" y="26" width="109" height="30" rx="7" fill="#9c69b3" stroke="#7c92a1" stroke-width="3"/>'+
   '<path d="M119 109 H200 V164 Q200 179 185 180 H135 Q119 178 119 162Z" fill="'+sampleColor+'" opacity="'+(filled?'.78':'.46')+'"/>'+
   '<rect x="124" y="104" width="72" height="32" rx="3" fill="#fcfeff"/>'+
   '<text x="160" y="119" font-size="10" fill="#385d75" font-weight="850" text-anchor="middle">EDTA</text>'+
   '<text x="160" y="131" font-size="8.5" fill="#688297" text-anchor="middle">CBC TUBE</text>';
  return illustratedSvg(h,'Sysmex pocH-100i lavender-top blood tube; no reagent cartridge');
 }
 if(id==="triage"){
  h='<rect x="53" y="80" width="214" height="73" rx="12" fill="#f3f6f8" stroke="'+outline+'" stroke-width="3"/>'+
   '<path d="M79 98 H220" stroke="#c7d9e2" stroke-width="4"/>'+
   '<rect x="158" y="107" width="62" height="20" rx="4" fill="#e4edf0" stroke="#b2cbd5" stroke-width="2"/>'+
   '<circle cx="83" cy="117" r="18" fill="'+specimen+'" stroke="#6e9aaa" stroke-width="3"/>'+
   '<rect x="238" y="108" width="16" height="21" rx="4" fill="#386a82"/>';
  return illustratedSvg(h+'<path d="M97 102 L115 50 H189" fill="none" stroke="#2f91a1" stroke-width="3"/><text x="142" y="43" font-size="11" fill="'+dark+'" font-weight="850">SAMPLE PORT</text>',"Triage lateral flow test device "+(filled?"after liquid sample applied":"before sample transfer"));
 }
 if(id==="torch"||id==="spotfire"){
  h='<rect x="64" y="26" width="167" height="158" rx="12" fill="#eef5f8" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="82" y="38" width="131" height="35" rx="6" fill="#d6e7ee" stroke="#a9c2cf"/>'+
   '<path d="M77 84 H216 V160 H77Z" fill="#fcfefe" stroke="#b7cbd4" stroke-width="2"/>'+
   Array.from({length:13},(_,i)=>'<rect x="'+(84+i*10)+'" y="128" width="7" height="27" rx="2" fill="'+(filled?"#c5e0e6":"#e7f0f4")+'" stroke="#bfced7" stroke-width="1"/>').join("")+
   '<circle cx="108" cy="90" r="11" fill="'+(filled?"#8fbfd6":"#f4fafc")+'" stroke="#2788b9" stroke-width="3"/>'+
   '<circle cx="183" cy="90" r="11" fill="'+(filled?specimen:"#f6fafb")+'" stroke="#bf4d59" stroke-width="3"/>'+
   '<rect x="94" y="165" width="115" height="12" rx="5" fill="#dae9ef"/>'+
   '<path d="M108 90 L64 60 L20 60" fill="none" stroke="#2b8db7" stroke-width="2"/>'+
   '<path d="M183 90 L241 57 L297 57" fill="none" stroke="#be5365" stroke-width="2"/>'+
   '<text x="20" y="52" font-size="10.5" fill="#327a9b" font-weight="830">HYDRATION</text>'+
   '<text x="241" y="50" font-size="10.5" fill="#a74556" font-weight="830">SAMPLE</text>';
  return illustratedSvg(h,"BioFire sealed pouch with blue hydration port and red sample port "+(filled?"after transfer":"before transfer"));
 }
 if(id==="clinitek")return clinitekKit(context==="hcg"?"hcg":"ua",filled);
  if(id==="febridx"){
  h='<rect x="59" y="67" width="213" height="83" rx="16" fill="#f7fbfc" stroke="'+outline+'" stroke-width="3"/>'+
    '<rect x="90" y="85" width="89" height="26" rx="7" fill="#edf4f6" stroke="#9dbbca" stroke-width="2"/>'+
    '<circle cx="223" cy="109" r="16" fill="'+specimen+'" stroke="#bc5264" stroke-width="3"/>'+
    '<rect x="89" y="120" width="91" height="15" rx="3" fill="#d7e6ec"/>'+
    '<path d="M221 90 L249 43 L297 43" fill="none" stroke="#ba5364" stroke-width="2.5"/>'+
    '<text x="245" y="35" font-size="11" fill="'+dark+'" font-weight="850">COLLECTION</text>';
  return illustratedSvg(h,"FebriDx fingerstick integrated test device "+(filled?"after blood collected":"unused"));
 }
 if(id==="drug-screen"){
  h='<rect x="102" y="45" width="119" height="132" rx="14" fill="#f7fafb" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="96" y="33" width="131" height="25" rx="7" fill="#e2eaf0" stroke="#abc0c9" stroke-width="2"/>'+
   '<path d="M108 126 H216 V158 Q212 169 198 169 H121 Q108 169 108 158Z" fill="'+(filled?"#e4ba63":"#e8f2f5")+'" opacity=".7"/>'+
   Array.from({length:12},(_,i)=>'<rect x="'+(114+i*8.4)+'" y="72" width="5" height="42" rx="2" fill="#fafdfd" stroke="#a5b8c6"/>'+
     '<path d="M'+(116+i*8.4)+' 91 v4" stroke="'+(filled?"#c25d74":"#cbd9e0")+'" stroke-width="2"/>').join("");
  return illustratedSvg(h,"Multi-panel urine drug screen cup "+(filled?"with urine in container":"empty"));
 }
 if(id==="coagsense"){
  h='<rect x="40" y="89" width="237" height="55" rx="9" fill="#f1f6f8" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="66" y="102" width="109" height="28" rx="5" fill="#dce8ec"/>'+
   '<circle cx="214" cy="116" r="17" fill="'+specimen+'" stroke="#8eacb7" stroke-width="3"/>'+
   '<path d="M225 102 L260 55 L298 55" stroke="#2d91a0" stroke-width="2.5" fill="none"/>'+
   '<text x="249" y="46" font-size="11" fill="'+dark+'" font-weight="850">SAMPLE WELL</text>';
  return illustratedSvg(h,"Coag-Sense PT INR test strip with capillary sample well "+(filled?"filled":"empty"));
 }
 if(id==="hemocue"){
  h='<path d="M62 84 H222 Q243 84 246 101 V136 Q239 148 225 148 H64 Q50 147 50 134 V99 Q55 84 62 84Z" fill="#eef3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="72" y="99" width="125" height="34" rx="3" fill="'+(filled?"#c04653":"#f7fcfd")+'" stroke="#a5c2ce" stroke-width="2"/>'+
   '<path d="M196 109 H254 L271 100 L271 138 L254 130 H196Z" fill="#f1f5f8" stroke="#abc4d0" stroke-width="2"/>'+
   '<text x="145" y="70" text-anchor="middle" font-size="12" fill="'+dark+'" font-weight="820">MICROCUVETTE</text>';
  return illustratedSvg(h,"HemoCue Hb 201+ single-use microcuvette "+(filled?"filled with blood":"before filling"));
 }
 if(id==="sofia"||id==="poc"){
  h='<rect x="40" y="76" width="240" height="87" rx="15" fill="#fafcfd" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="69" y="94" width="108" height="37" rx="6" fill="#dbe7ed" stroke="#abbfca"/>'+
   '<rect x="190" y="106" width="41" height="18" rx="5" fill="#e0ebee" stroke="#aac4d0"/>'+
   '<circle cx="252" cy="119" r="11" fill="'+(filled?"#e2bdd0":"#fff")+'" stroke="#9eafb8" stroke-width="3"/>'+
   '<path d="M252 107 L270 49 L305 49" stroke="#278e9d" stroke-width="3" fill="none"/>'+
   '<text x="258" y="39" fill="'+dark+'" font-size="11" font-weight="850">SAMPLE WELL</text>';
  return illustratedSvg(h,"Rapid test cassette "+(filled?"after assay-specific extracted sample":"unused"));
 }
 if(id==="idnow"){
  h='<rect x="46" y="89" width="104" height="72" rx="11" fill="#eef3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<circle cx="98" cy="113" r="18" fill="'+(filled?"#c7dae2":"#f9fdfd")+'" stroke="#a4c0cc" stroke-width="3"/>'+
   '<rect x="173" y="86" width="100" height="78" rx="12" fill="#eaf3f6" stroke="'+outline+'" stroke-width="3"/>'+
   '<circle cx="201" cy="117" r="12" fill="#f7f9f9" stroke="#a4c0ca" stroke-width="2"/>'+
   '<circle cx="245" cy="117" r="12" fill="#e3ebee" stroke="#a4c0ca" stroke-width="2"/>'+
   '<text x="98" y="176" text-anchor="middle" font-size="10" fill="'+dark+'">SAMPLE RECEIVER</text>'+
   '<text x="223" y="176" text-anchor="middle" font-size="10" fill="'+dark+'">TEST BASE</text>';
  return illustratedSvg(h,"Abbott ID NOW sample receiver and test base "+(filled?"after swab elution":"unused"));
 }
 if(id==="visby"){
  h='<rect x="58" y="55" width="218" height="125" rx="21" fill="#f6f9fa" stroke="'+outline+'" stroke-width="3"/>'+
   '<rect x="83" y="75" width="163" height="29" rx="8" fill="#d9e7ed"/>'+
   '<circle cx="170" cy="139" r="26" fill="'+(filled?"#dbe7ed":"#f8fcfd")+'" stroke="#a1bdca" stroke-width="3"/>'+
   '<circle cx="170" cy="139" r="11" fill="#b9cdd7"/>';
  return illustratedSvg(h,"Visby self-contained molecular test device "+(filled?"after sample processing":"unused"));
 }
 return illustratedSvg('<rect x="60" y="65" width="200" height="88" rx="16" fill="#f3f8f9" stroke="#a2c0cb" stroke-width="3"/>',"Assay kit reference");
}
function kitScene(id,stage,context){
 const loaded=stage!=="before",what=stage==="before"?"BEFORE SAMPLE":"AFTER SAMPLE";
 const opaque=["torch","spotfire","idnow","visby"].includes(id);
 const noCartridge=id==="sysmex";
 const qc=context==="qc";
 const title=id==="sysmex"&&qc?"EIGHTCHECK 3WP · 3 CONTROL LEVELS":noCartridge?(loaded?"TUBE AT ANALYZER":"COLLECTION TUBE"):opaque?(loaded?"AFTER TRANSFER":"UNPREPARED KIT"):qc?(loaded?"QC MATERIAL APPLIED":"BEFORE QC"):what;
 const note=id==="sysmex"&&qc?"Use EIGHTCHECK-3WP Low, Normal and High controls. Follow the manufacturer mixing, warm-up and QC procedure.":opaque?"Closed pouches and cartridges conceal the sample after transfer.":"Sample position is schematic; follow the assay IFU for actual fill and handling.";
 return '<div class="dev-kit-view"><div class="dev-kit-state">'+title+'</div><div class="dev-kit-drawing">'+kitShape(id,loaded,context)+'</div><p>'+note+'</p></div>';
}
function workflowVisual(sec,title,groupTitle=""){
 if(!sec||!collection[sec.id]||sec.archived)return "";
 if(sec.id==="clinitek"&&/^(ua-strip|hcg-cassette|ua-qc|hcg-qc)$/.test(groupTitle)){
  const hcg=/hcg/.test(groupTitle),qc=/qc/.test(groupTitle),kind=hcg?"hcg":"ua";
  const t=String(title).toLowerCase();
  const before=hcg?/prepare and place|place cassette|prepare hcg|confirm urine specimen and hcg/i.test(t):/prepare the ua dipstick|prepare urinalysis controls/i.test(t);
  const after=hcg?/dispense urine|dispense qc material/i.test(t):/press start, then dip|run each control using the strip/i.test(t);
  if(!before&&!after)return "";
  return '<div class="dev-workflow-visual clinitek-single-visual"><div class="dev-visual-header"><strong>'+(hcg?'hCG CASSETTE':'URINALYSIS DIPSTICK')+'</strong><span>'+(qc?'Control testing':'Patient testing')+'</span></div>'+
   '<div class="dev-kit-scenes" style="grid-template-columns:minmax(0,440px);justify-content:center">'+
   '<div class="dev-kit-view"><div class="dev-kit-state">'+(before?'UNUSED '+(hcg?'CASSETTE':'STRIP'):(qc?'CONTROL APPLIED':'AFTER URINE'))+'</div>'+
   '<div class="dev-kit-drawing">'+clinitekKit(kind,after)+'</div></div></div></div>';
 }

 const id=sec.id,t=String(title).toLowerCase();
 const qc=/\bqc\b|control|calibration/i.test(title);
 const patient=/running|patient|samples|test|fingerstick|blood|collection/i.test(title);
 if(id==="piccolo")return "";
 if(id==="pathfast"&&!/(retrieve cartridges|load cartridges|insert the rack)/i.test(title))return "";
 if(!(qc||patient))return "";
 if(/ordering|order set|available locations|results|review, document|maintenance|cleaning|turnaround/i.test(t))return "";
 let cards=[];
 if(id==="pathfast"){
  const current=/retrieve/.test(t)?"before":/load cartridges/.test(t)?"after":"after";
  cards=[kitScene(id,current,"patient")];
 }else cards=[kitScene(id,"before",qc?"qc":"patient"),kitScene(id,"after",qc?"qc":"patient")];
 const media=collection[id];
 const specimen=qc?"Quality controls: use the controls specified by the current analyzer SOP.":media.map(x=>x[1]).join(" or ");
 return '<div class="dev-workflow-visual" aria-label="Illustrated kit before and after specimen preparation"><div class="dev-visual-header"><strong>DEVICE & SAMPLE VISUAL GUIDE</strong><span>'+visualEsc(specimen)+'</span></div>'+
 '<div class="dev-kit-scenes">'+cards.join('')+'</div>'+
 '<p class="dev-visual-footnote">Schematic shapes, not scale drawings. Verify the correct panel, collection material, port, lot and specimen requirements in the manufacturer IFU.</p></div>';
}
function inlineKitVisual(sec,title,depth,rootTitle){
 if(!sec||!collection[sec.id]||sec.archived||sec.id==="piccolo")return "";
 if(sec.id==="clinitek")return "";

 const t=String(title).toLowerCase(),root=String(rootTitle||"").toLowerCase();
 if(depth>1)return "";
 const relevant=/cartridge|cassette|test kit|pouch|vial|test strip|pipett|microcuvette|disc|reagent|sample port|loading station|sample well|rack|device|insert|dispense|apply sample|transfer pipette|load sample|load the sample|load the rack/i.test(title);
 const action=/\bgrab\b|\bremove\b|\bload\b|\bprepare\b|\binsert\b|\bdispens|\btransfer\b|\bapply\b|\bdip\b|\bhydrat|\bcollect\b|\bfill\b|\bplace\b/i.test(title);
 if(!relevant||!action||/printing|printout|log|reagent-status|data|documentation|report|turnaround|unit|normal|expiry|expiration/i.test(t))return "";
 const before=/grab|remove|prepare|collect|select|new box|new shipment/i.test(title)&&!/load|dispens|transfer|fill/i.test(title);
 const qc=/\bqc\b|control|calibration/i.test(root);
 const stage=before?"before":"after";
 return '<div class="dev-inline-illustration"><span class="dev-inline-kicker">'+(stage==="before"?"CHECK ITEM":"SAMPLE / KIT HANDLING")+'</span>'+
 '<div class="dev-inline-drawing">'+kitShape(sec.id,stage!=="before",qc?"qc":"patient")+'</div>'+
 '<span class="dev-inline-caption">'+(stage==="before"?"Identify the correct unused kit or material.":"Use the correct sample location; verify details in the assay IFU.")+'</span></div>';
}


const visualStepsText={
 sysmex:[["Identify the EDTA tube","Lavender-top EDTA whole blood is the collection specimen for CBC testing."],["Identify the closed tube","This analyzer aspirates from a collection tube; there is no disposable sample cartridge."],["Present the specimen for aspiration","Mix and identify the sample as required by the approved procedure. Do not add blood to a reagent cartridge."],["Run the analyzer","Match the tube to the patient ID, then use the actual instrument controls and approved SOP."]],
 piccolo:[["Confirm green-top collection","Use the approved lithium-heparin whole blood or allowed plasma specimen."],["Inspect the reagent disc","Identify the clear single-use chemistry disc and locate its near-center sample port."],["Transfer sample to disc","Use the supplied pipette and a fresh tip. Check the molded sample chamber fill marks."],["Insert the disc","Place the filled disc in the front drawer and complete patient ID and analyzer prompts."]],
 pathfast:[["Confirm green-top collection","Use the approved lithium-heparin specimen and verify mixing/clots."],["Retrieve reagent cartridges","Use the long, narrow black-foil cartridge. Identify the clear sample well at the red-marked end, not the separate round detection well. Match the assay and lane."],["Dispense into sample wells","Pipette the assay-specified sample volume into the clear rectangular well at the red-marked end. Fill to the well line, remove bubbles, and start the run promptly; do not dispense into the black round detection well."],["Load rack and operate","Use the instrument's SAMPLE and SID screens and verify the correct lane before START."]],
 triage:[["Identify specimen for panel","EDTA blood is used for cardiac markers; urine is used for applicable urine assays."],["Identify test device","Each assay kit includes its test device and an assay-specific transfer pipette."],["Add sample","Transfer sample to the designated device port using the assay kit instructions."],["Read on MeterPro","Insert the prepared device and follow the meter's patient-test prompts."]],
 clinitek:[["Select the applicable workflow","Urinalysis dipstick and CLINITEST hCG cassette are separate consumables with different sampling methods."],["Use the correct consumable","See the two dedicated workflows below."],["Load only after START","Siemens requires pressing START before sample application for both test types."],["Review analyzer output","Verify the intended test mode and patient before recording results."]],
 torch:[["Collect stool in Cary Blair","GI panel specimens require an approved stool transport medium."],["Prepare pouch and loading station","Identify the pouch, blue hydration port, red sample port and corresponding vials."],["Hydrate and transfer sample","Follow the panel IFU. Fluids enter the sealed pouch and are not directly visible afterward."],["Insert prepared pouch","Load the pouch into the correct TORCH module and run the assigned panel."]],
 spotfire:[["Select correct transport media","Choose UTM/VTM for respiratory or eSwab for throat per the selected assay."],["Prepare kit and pouch","Identify the blue hydration vial and red sample injection vial."],["Hydrate and transfer sample","Use the pouch loading station and assay-specific transfer steps."],["Run on SPOTFIRE","Insert the prepared pouch and confirm panel selection on the analyzer."]],
 febridx:[["Collect fingerstick blood","FebriDx uses a direct fingerstick sample. No purple or green-top tube is used."],["Check the unused FebriDx device","Identify the integrated single-use blood collection and test device."],["Load sample into device","Use the integrated collection tube and actuation method described by the current kit IFU."],["Develop and read","Follow the manufacturer timing and interpretation instructions; the device is not an analyzer cartridge."]],
 "drug-screen":[["Collect urine","Use the approved urine drug screen collection cup."],["Check the unused screening cup","Confirm the correct panel count, packaging and expiration."],["Fill the cup","Collect and secure the urine specimen using the current kit instructions; do not expose test strips."],["Read and document","Follow the prescribed wait/read window and facility confirmation policy."]],
 coagsense:[["Collect capillary blood","Obtain a fingerstick sample with the approved capillary transfer device; no routine blood tube."],["Insert unused PT/INR strip","Identify the strip's sample application well."],["Transfer the sample","Apply blood only when the meter indicates it is ready, using the transfer tube."],["Read meter result","Follow the actual instrument's prompts and approved SOP."]],
 poc:[["Check assay specimen","Other POC tests include multiple specimen types, not one universal tube."],["Choose the correct test kit","Confirm the actual product instructions before collecting or handling the specimen."],["Apply the specimen","Use the indicated specimen port and manufacturer-specified extraction/transfer method."],["Read and report","Follow the kit-specific timing, interpretation and documentation requirements."]],
 sofia:[["Collect the appropriate swab","Use the swab/transport method required by the selected Sofia 2 assay."],["Identify test cassette and extraction kit","Assay-specific cassette and processing tube are required."],["Transfer prepared sample","Dispense extracted sample into the designated cassette sample well."],["Load and read","Choose the applicable Walk Away or Read Now mode and insert the cassette."]],
 hemocue:[["Collect whole blood","A fingerstick drop or permitted venous sample is used; the Hb 201+ microcuvette is the test consumable."],["Identify empty microcuvette","Handle the microcuvette by its body; keep optical surfaces clean."],["Fill by capillary action","Fill the microcuvette from the specimen using the approved instructions and check for bubbles."],["Insert into analyzer","Place the correctly filled microcuvette in its holder and follow the reader instructions."]],
 visby:[["Historical specimen reference","Archived device. Confirm the historical assay specimen."],["Identify unused Visby device","Self-contained molecular test device; schematic only."],["Historical sample path","Not an active testing procedure. Follow historical IFU only for record review."],["Archived instrument reference","This platform is inactive. Do not use it for patient testing."]],
 idnow:[["Historical swab reference","Archived platform. Test-specific swab requirements varied."],["Identify receiver and test base","ID NOW used distinct sample receiver, test base and transfer cartridge."],["Historical transfer pathway","Sample was processed through the receiver and base; this is not current site guidance."],["Archived analyzer reference","This platform is inactive. Do not use it for patient testing."]]
};
/* pocH-100i has a tube aspiration workflow, not a disposable reagent cartridge.
   Give each step a different useful visual instead of repeating capped EDTA tubes. */
function sysmexVisualGuide(sec){
 const screen=illustratedSvg(
  '<rect x="156" y="22" width="428" height="264" rx="23" fill="#edf3f6" stroke="#8eabb9" stroke-width="5"/>'+
  '<rect x="175" y="40" width="390" height="224" rx="12" fill="#f9fcfd" stroke="#c5dbe5" stroke-width="2"/>'+
  '<rect x="175" y="40" width="390" height="48" rx="10" fill="#cfdfeb"/>'+
  '<text x="202" y="70" font-family="Arial,sans-serif" font-size="20" font-weight="800" fill="#315d77">MAIN · WB</text>'+
  '<rect x="202" y="111" width="168" height="62" rx="9" fill="#eaf0f9" stroke="#7b9fb6" stroke-width="3"/>'+
  '<text x="286" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="800" fill="#245779">SAMPLE ID</text>'+
  '<text x="286" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#5d7b8d">Verify patient</text>'+
  '<rect x="387" y="111" width="151" height="62" rx="9" fill="#e7f5f1" stroke="#53a28e" stroke-width="3"/>'+
  '<text x="462" y="137" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" font-weight="800" fill="#206c66">WB MODE</text>'+
  '<text x="462" y="157" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#4f867c">Whole blood</text>'+
  '<path d="M207 202 H534" stroke="#c7d7e0" stroke-width="3"/>'+
  '<text x="370" y="233" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#526f83">Confirm ID before loading</text>',
  'Schematic pocH-100i touchscreen showing Sample ID and whole blood mode','0 0 740 310');
 const sampleBay=illustratedSvg(
  body(specs.sysmex.shape,specs.sysmex.accent)+
  '<ellipse cx="355" cy="218" rx="38" ry="70" fill="none" stroke="#138c99" stroke-width="4" stroke-dasharray="7 6"/>'+
  '<path d="M382 220 L456 218 L525 198" fill="none" stroke="#168995" stroke-width="4" stroke-linecap="round"/>'+
  '<rect x="525" y="166" width="182" height="39" rx="11" fill="#e8f5f5" stroke="#a4d3d6" stroke-width="2"/>'+
  '<text x="616" y="191" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#236e79">SAMPLE DOOR</text>'+
  '<text x="86" y="143" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#3a657b">ADAPTER</text>'+
  '<path d="M125 153 V176 H167" stroke="#168995" stroke-width="3" fill="none"/>'+
  '<rect x="137" y="183" width="56" height="79" rx="10" fill="#f4e9ca" stroke="#ae9970" stroke-width="3"/>'+
  '<rect x="147" y="198" width="36" height="59" rx="7" fill="#edf5f6" stroke="#9ab9c5" stroke-width="2"/>'+
  '<text x="165" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="#576f7c">TUBE</text>'+
  '<path d="M193 220 H312" stroke="#168995" stroke-width="3" stroke-dasharray="7 5" fill="none"/>'+
  '<path d="M308 213 L319 220 L308 227" stroke="#168995" stroke-width="3" fill="none"/>',
  'pocH-100i sample compartment highlighted with schematic sample adapter and tube','0 0 740 310');
 const analyzer=illustratedSvg(body(specs.sysmex.shape,specs.sysmex.accent),
  'Sysmex pocH-100i analyzer with screen and purple sample compartment','0 0 740 310');
 const cards=[
  ['Collect and gently mix EDTA whole blood',
   '<div class="device-gallery-specimens"><div class="device-gallery-media">'+mediaSvg('lavender')+'<small>Lavender-top EDTA whole blood</small></div></div>',
   'Verify the tube and patient identifiers. Gently invert the tube according to the approved collection SOP. Check for clots.'],
  ['Enter the sample ID and confirm WB mode',
   '<div class="device-gallery-image">'+screen+'</div>',
   'On the pocH-100i, select Sample ID and enter or scan the correct ID. Confirm whole-blood (WB) mode. Screen shown is a simplified reference.'],
  ['Open the sample door and insert the tube',
   '<div class="device-gallery-image device-gallery-analyzer">'+sampleBay+'</div>',
   'Open the sample compartment, place the correct adapter, gently re-mix the specimen, and load the tube. Closed-tube mode requires an approved pierceable cap; open-tube mode requires cap removal.'],
  ['Close the door, run, and verify results',
   '<div class="device-gallery-image device-gallery-analyzer">'+analyzer+'</div>',
   'Close the sample compartment, press RUN, and review results and instrument flags. Never open the sample compartment during aspiration.']
 ];
 return '<section class="device-gallery sysmex-gallery" aria-label="Sysmex pocH-100i specimen to analyzer training steps">'+
  '<div class="device-gallery-heading"><div><span>VISUAL TRAINING REFERENCE</span><h2>Sysmex pocH-100i · sample testing</h2><p>EDTA whole blood → Patient ID → Sample compartment → Analysis</p></div><span class="device-gallery-count">4 STEPS</span></div>'+
  '<div class="device-gallery-grid">'+cards.map((step,i)=>'<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+visualEsc(step[0])+'</strong></div>'+step[1]+'<p>'+visualEsc(step[2])+'</p></article>').join('')+'</div>'+
  '<p class="device-gallery-note"><strong>Tube cap safety:</strong> Closed-tube aspiration is permitted only with a compatible pierceable rubber cap. Do not use non-pierceable caps with the piercer. For open-tube mode, remove the cap before loading. Diagrams are schematic, not exact instrument screen or adapter replicas. Follow the manufacturer IFU and approved site SOP.</p>'+
  '</section>';
}

function visualGuide(sec){
 if(!sec||!specs[sec.id]||!visualStepsText[sec.id])return "";
 if(sec.id==="clinitek")return clinitekVisualGuide(sec);
 if(sec.id==="sysmex")return sysmexVisualGuide(sec);
 const id=sec.id,arr=visualStepsText[id],med=collection[id]||[],archive=!!sec.archived;
 const title=archive?"Historical consumable reference":"Specimen to instrument · visual steps";
 let steps=arr.map((step,i)=>{
   let visual='';
   if(i===0){
     visual='<div class="device-gallery-specimens">'+med.map(x=>'<div class="device-gallery-media">'+mediaSvg(x[0])+'<small>'+visualEsc(x[1])+'</small></div>').join('')+'</div>';
   }else if(i===1) visual='<div class="device-gallery-image">'+kitShape(id,false,"patient")+'</div>';
   else if(i===2)visual='<div class="device-gallery-image">'+kitShape(id,true,"patient")+'</div>';
   else visual='<div class="device-gallery-image device-gallery-analyzer">'+
     illustratedSvg(body(specs[id].shape,specs[id].accent),id+" device representation","0 0 740 310")+'</div>';
   return '<article class="device-gallery-step"><div class="device-gallery-step-head"><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+visualEsc(step[0])+'</strong></div>'+
   visual+'<p>'+visualEsc(step[1])+'</p></article>';
 }).join('');
 return '<section class="device-gallery" aria-label="Step-by-step illustrated '+visualEsc(sec.title)+' reference">'+
 '<div class="device-gallery-heading"><div><span>VISUAL TRAINING REFERENCE</span><h2>'+title+'</h2><p>'+visualEsc(sec.title)+' · '+(archive?'Archived reference only':'Select the exact assay before testing')+'</p></div><span class="device-gallery-count">4 STEPS</span></div>'+
 (archive?'<p class="device-gallery-archive">Archived device: informational reference only. Do not use for current patient testing.</p>':'')+
 '<div class="device-gallery-grid">'+steps+'</div>'+
 '<p class="device-gallery-note">Illustrative components are simplified, not photographic replicas or accurate fill-scale diagrams. Use the actual kit insert and local approved SOP for volumes, position, timing, specimen handling and QC. Opaque kits may not visibly show their internal sample.</p></section>';
}

window.LAB_EQUIPMENT_ART={pathfastActionVisual:pathfastActionVisual,pathfastRackSvg:pathfastRackSvg,render:render,ids:Object.keys(specs),piccoloVisual:piccoloVisual,piccoloDiscSvg:piccoloDiscSvg,piccoloPipetteSvg:piccoloPipetteSvg,specimenGuide:specimenGuide,mediaSvg:mediaSvg,kitShape:kitShape,kitScene:kitScene,workflowVisual:workflowVisual,inlineKitVisual:inlineKitVisual,clinitekKit:clinitekKit,visualGuide:visualGuide};
})();