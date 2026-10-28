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
 disc:"data:image/webp;base64,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",
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
 if(!take&&!add&&!analyzer)return '';
 let pieces='';
 if(take){
  pieces='<article class="pic-vis-card"><strong>Reagent disc (top view)</strong><img loading="lazy" class="pic-user-photo" src="'+piccoloImages.disc+'" alt="User-supplied photograph of a clear Piccolo reagent disc"/><span>Inspect the sealed disc; keep level and handle by the edges.</span></article>'+
  '<article class="pic-vis-card"><strong>Locate the sample port</strong><img loading="lazy" class="pic-user-photo pic-photo-port" src="'+piccoloImages.port+'" alt="User-provided annotated Piccolo disc diagram highlighting the sample chamber in red"/>'+piccoloDiscSvg(false)+'<span>Use the small sample inlet near the disc hub, not any outer reagent chamber.</span></article>';
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