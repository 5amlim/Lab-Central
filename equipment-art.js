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
 v=rect(202,87,335,161,25,"url(#equip-white)","#8ca2b0",3)+screen(225,111,144,107,a)+rect(390,119,121,105,16,"#dce9ef","#b6c9d2")+circle(450,172,47,"#718e9c","#d4e1e6")+circle(450,172,33,"#d7e5e9","#627b8a")+circle(450,172,13,"#637f8d","#d0e2e9")+rect(237,239,249,16,7,"#b9cbd4");
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
window.LAB_EQUIPMENT_ART={render:render,ids:Object.keys(specs)};
})();