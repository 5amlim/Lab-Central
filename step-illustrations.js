/* Device-specific step illustrations for Lab Central. Original scalable SVGs.
   These are educational diagrams, not substitutes for analyzer displays or manufacturer IFUs. */
(function(){
'use strict';
const art=window.LAB_EQUIPMENT_ART;
if(!art)return;
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function svg(inner,label,box){return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(label)+'" viewBox="'+(box||'0 0 600 310')+'">'+inner+'</svg>';}
function words(x,y,t,size,fill,anchor){return '<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+(size||13)+'" font-weight="800" fill="'+(fill||'#355c74')+'" text-anchor="'+(anchor||'middle')+'">'+esc(t)+'</text>';}
function tube(cap,kind){
 const color=cap==='green'?'#16865e':cap==='lavender'?'#8f65b4':'#498bb1';
 return svg('<ellipse cx="164" cy="265" rx="67" ry="11" fill="#dce8ee"/>'+
 '<rect x="122" y="62" width="84" height="198" rx="19" fill="#f4fbfd" stroke="#8fb1bd" stroke-width="4"/>'+
 '<path d="M128 147H200V229Q199 254 176 255H150Q129 253 128 231Z" fill="#b94a57"/>'+
 '<path d="M135 150H193" stroke="#e19aa2" stroke-width="3"/>'+
 '<path d="M130 92h65" stroke="#fff" stroke-width="5" opacity=".8"/>'+
 '<rect x="113" y="43" width="102" height="43" rx="12" fill="'+color+'" stroke="#557e8c" stroke-width="4"/>'+
 Array.from({length:9},function(_,i){return '<path d="M'+(122+i*10)+' 48v31" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>';}).join('')+
 '<rect x="132" y="159" width="65" height="67" rx="5" fill="#fff" stroke="#d4e2e7"/>'+
 words(164,183,kind==='lithium'?'Li-HEP':'EDTA',13,'#28617c')+
 words(164,202,'WHOLE',10,'#668399')+words(164,216,'BLOOD',10,'#668399')+
 words(359,125,cap==='green'?'GREEN TOP':'LAVENDER TOP',21,'#296b79')+
 words(359,154,kind==='lithium'?'Lithium heparin':'EDTA whole blood',16,'#4e7487')+
 '<path d="M216 65H272L290 91" fill="none" stroke="#30988e" stroke-width="3"/>',
 cap==='green'?'Green-top lithium heparin blood collection tube':'Lavender-top EDTA blood collection tube','0 0 550 285');
}
function piccoloDisc(filled,pipette){
 const spokes=Array.from({length:32},function(_,i){
  return '<path d="M200 30L200 57" transform="rotate('+(i*11.25)+' 200 155)" stroke="#b9ced9" stroke-width="7" stroke-linecap="round"/>';
 }).join('');
 const barcode=Array.from({length:48},function(_,i){
  return '<path d="M200 8L200 21" transform="rotate('+(i*7.5)+' 200 155)" stroke="#3f5563" stroke-width="'+(i%3===0?4:2)+'"/>';
 }).join('');
 const chamber=filled?
  '<path d="M173 198 A72 72 0 0 0 265 176 L246 164 A48 48 0 0 1 185 179Z" fill="#b82e40" stroke="#a73241" stroke-width="3"/>'+
  '<path d="M181 192 A62 62 0 0 0 252 182" fill="none" stroke="#ea8190" stroke-width="5"/>':
  '<path d="M173 198 A72 72 0 0 0 265 176 L246 164 A48 48 0 0 1 185 179Z" fill="#e4f2f6" stroke="#8db5c4" stroke-width="3"/>';
 const liquid=filled?'#b82e40':'#f8fbfc';
 return svg('<ellipse cx="198" cy="298" rx="178" ry="9" fill="#e2ecf1"/>'+
 '<circle cx="200" cy="155" r="146" fill="#fbfdfd" stroke="#86a8b9" stroke-width="5"/>'+barcode+
 '<circle cx="200" cy="155" r="131" fill="#eff6f8" stroke="#9bbac7" stroke-width="3"/>'+spokes+
 '<circle cx="200" cy="155" r="96" fill="#f9fcfd" stroke="#bdd2dc" stroke-width="8"/>'+
 '<circle cx="200" cy="155" r="72" fill="#eaf3f6" stroke="#b9ced8" stroke-width="3"/>'+chamber+
 '<circle cx="200" cy="155" r="29" fill="#303b49" stroke="#849ca9" stroke-width="5"/>'+
 '<circle cx="200" cy="155" r="15" fill="#152734" stroke="#667f8c" stroke-width="3"/>'+
 '<circle cx="267" cy="146" r="10" fill="'+liquid+'" stroke="#437f95" stroke-width="3"/>'+
 '<circle cx="267" cy="146" r="4.5" fill="'+(filled?'#b5223a':'#dcecf1')+'"/>'+
 '<path d="M276 140L376 99H439" fill="none" stroke="#298d96" stroke-width="3"/>'+
 words(440,93,'SAMPLE PORT',17,'#236d7d','start')+
 words(440,114,'Open access hole',13,'#5e8191','start')+
 '<path d="M255 192L372 225H439" fill="none" stroke="#b54955" stroke-width="3"/>'+
 words(440,220,'FILL CHAMBER',17,'#a44653','start')+
 words(440,240,filled?'Blood visible (red)':'Empty chamber',13,'#607f91','start')+
 (pipette?'<path d="M351 9L294 97L273 134" fill="none" stroke="#8096a3" stroke-width="17" stroke-linecap="round"/>'+
 '<path d="M351 9L294 97L273 134" fill="none" stroke="#ecf7fb" stroke-width="10" stroke-linecap="round"/>'+
 '<path d="M312 69L276 131" stroke="#b83f4c" stroke-width="6"/>'+
 '<path d="M270 135L267 147" stroke="#bd3b49" stroke-width="4"/>'+
 words(367,40,'100 µL transfer',13,'#346c80','start'):'')+
 words(200,315,filled?'AFTER SAMPLE LOADING':'UNFILLED REAGENT DISC',12,'#638399'),
 'Piccolo reagent disc, permanent sample entry hole next to central hub, '+(filled?'red whole blood in curved inner sample chamber':'no blood added yet')+(pipette?', pipette delivers through the hole':''),'0 0 620 330');
}
function piccoloInstrument(){
 return svg('<ellipse cx="315" cy="308" rx="190" ry="12" fill="#dce7ee"/>'+
 '<path d="M208 20L420 22L454 45L455 278L419 303H209L188 277L189 54Z" fill="#2168a6" stroke="#174a7e" stroke-width="5"/>'+
 '<path d="M420 22L454 45V278L419 303V46Z" fill="#154d81"/>'+
 '<rect x="214" y="43" width="210" height="200" rx="14" fill="#132d48" stroke="#0e3050" stroke-width="5"/>'+
 '<rect x="231" y="58" width="176" height="162" rx="6" fill="#e4f0f2"/>'+
 '<rect x="231" y="58" width="176" height="30" fill="#93b4d0"/>'+
 words(319,79,'piccolo xpress',16,'#264c85')+
 '<rect x="250" y="103" width="135" height="34" rx="8" fill="#f8d477"/>'+words(318,125,'ANALYZE',15,'#34566c')+
 '<rect x="250" y="149" width="135" height="28" rx="7" fill="#d5e3e9"/>'+words(318,169,'RESULTS',13,'#577788')+
 '<rect x="222" y="254" width="193" height="19" rx="4" fill="#0d304c"/>'+
 '<path d="M232 272H399L433 306H206Z" fill="#253b4c" stroke="#6c8fa3" stroke-width="4"/>'+
 '<ellipse cx="318" cy="287" rx="51" ry="13" fill="#ebf3f6" stroke="#9cb6c4" stroke-width="3"/>'+
 '<ellipse cx="318" cy="287" rx="30" ry="9" fill="#edf6f9" stroke="#afc9d3" stroke-width="2"/>'+
 '<path d="M305 294A20 8 0 0 0 338 286L326 283Z" fill="#b63747"/>'+
 '<circle cx="318" cy="286" r="6" fill="#263946"/>'+
 '<path d="M366 288L483 250H553" fill="none" stroke="#268997" stroke-width="3"/>'+
 words(553,242,'FRONT DISC DRAWER',13,'#2f7182','end')+
 '<circle cx="432" cy="245" r="9" fill="#59b7e7" stroke="#aad8f0" stroke-width="2"/>',
 'Piccolo Xpress compact blue analyzer with color touchscreen and front reagent disc drawer showing red sample in disc','0 0 620 330');
}
function qcFreezer(){
 let h='<rect x="35" y="37" width="174" height="204" rx="16" fill="#e3f3f8" stroke="#7cacbf" stroke-width="4"/>'+
 '<rect x="47" y="50" width="150" height="178" rx="10" fill="#f6fcfe" stroke="#b7d4df" stroke-width="2"/>'+
 '<path d="M62 99H183M62 171H183" stroke="#b4d3df" stroke-width="3"/>'+
 '<path d="M97 75h52M123 55v42M106 60l34 31M140 60l-34 31" stroke="#4ea3bb" stroke-width="5" stroke-linecap="round"/>'+
 words(122,204,'FREEZER',16,'#277c94')+
 words(122,223,'QC STORAGE',10,'#56889a');
 [{x:263,label:'BRT',cap:'#346a9a'},{x:393,label:'NOD',cap:'#3c988c'}].forEach(function(v){
  h+='<ellipse cx="'+(v.x+43)+'" cy="247" rx="46" ry="8" fill="#e1eaf0"/>'+
  '<rect x="'+v.x+'" y="87" width="83" height="158" rx="16" fill="#e9f3f7" stroke="#8ba8b6" stroke-width="3"/>'+
  '<path d="M'+(v.x+5)+' 165h73v62q-4 13-22 13h-29q-24-2-24-21z" fill="#8a576c" opacity=".6"/>'+
  '<rect x="'+(v.x-5)+'" y="63" width="93" height="37" rx="10" fill="'+v.cap+'" stroke="#7b939f" stroke-width="3"/>'+
  '<rect x="'+(v.x+12)+'" y="120" width="59" height="62" rx="4" fill="#fff"/>'+
  words(v.x+42,145,v.label,17,'#35586c')+
  words(v.x+42,163,'QC',12,'#67879a');
 });
 h+=words(357,278,'BRT OR NOD · APPROVED CONTROL LOT',14,'#467589');
 return svg(h,'Frozen Piccolo QC materials: BRT and NOD control bottles stored in freezer, use the approved lot','0 0 560 300');
}

function triageQcControls(){
 return svg('<rect x="33" y="48" width="170" height="198" rx="15" fill="#e4f4fa" stroke="#7dabbd" stroke-width="4"/>'+
 '<rect x="47" y="63" width="142" height="171" rx="9" fill="#fbfeff" stroke="#bed9e3"/>'+
 '<path d="M86 100h66M119 66v64M95 77l47 45M141 77l-47 45" stroke="#4d9fbb" stroke-width="5" stroke-linecap="round"/>'+
 words(117,200,'FREEZER',16,'#267e9a')+
 [0,1].map(function(i){const x=264+i*131;return '<ellipse cx="'+(x+40)+'" cy="252" rx="43" ry="8" fill="#e2ebef"/>'+
 '<rect x="'+x+'" y="102" width="80" height="149" rx="16" fill="#f5fafc" stroke="#94afbf" stroke-width="3"/>'+
 '<path d="M'+(x+5)+' 182h70v44q-4 17-22 17h-28q-20-3-20-20z" fill="#b36a83" opacity=".55"/>'+
 '<rect x="'+(x-4)+'" y="83" width="88" height="31" rx="9" fill="'+(i?'#537ea1':'#a65e75')+'" stroke="#8d9ba5" stroke-width="3"/>'+
 '<rect x="'+(x+9)+'" y="128" width="62" height="60" rx="4" fill="#fff"/>'+
 words(x+40,144,'TRIAGE',13,'#3e6379')+words(x+40,160,'TOTAL 5',12,'#4c758c')+
 words(x+40,176,'QC '+(i+1),12,'#41687a')+
 words(x+40,278,'CONTROL '+(i+1),12,'#4a748a');}).join(''),
 'Triage Total 5 liquid QC control vials 1 and 2 stored in a freezer, separate from reusable electronic QC Device','0 0 600 310');
}
function generalControls(){
 return svg([0,1,2].map(function(i){const x=90+i*135;return '<rect x="'+x+'" y="88" width="73" height="153" rx="14" fill="#f7fafb" stroke="#9eb6c2" stroke-width="3"/>'+
 '<rect x="'+(x-4)+'" y="67" width="81" height="34" rx="9" fill="'+(['#b2646d','#6794a9','#428b82'][i])+'"/>'+
 '<rect x="'+(x+8)+'" y="127" width="58" height="65" rx="5" fill="#fff"/>'+
 words(x+37,151,'QC',16,'#4b748b')+words(x+37,171,'LEVEL '+(i+1),11,'#617d91');}).join('')+
 words(300,281,'CHECK THE SPECIFIC ASSAY QC MATERIALS',14,'#45758b'),
 'Illustrative reagent controls, actual brand and storage depend on each analyzer','0 0 600 310');
}
function triageQCDevice(){
 return svg('<ellipse cx="296" cy="232" rx="223" ry="12" fill="#d9e7ec"/>'+
 '<rect x="61" y="91" width="466" height="116" rx="15" fill="#f8fafb" stroke="#899eaa" stroke-width="5"/>'+
 '<path d="M75 104H502" stroke="#e1e7eb" stroke-width="3"/>'+
 '<rect x="83" y="113" width="242" height="67" rx="5" fill="#fff" stroke="#c3d0d8"/>'+
 words(205,137,'TRIAGE',18,'#45687c')+words(205,160,'QC DEVICE',20,'#3e677a')+
 '<rect x="350" y="116" width="114" height="63" rx="5" fill="#f7f8f9" stroke="#c0cbd2"/>'+
 words(406,141,'DO NOT',15,'#ad4150')+words(406,161,'DISCARD',15,'#ad4150')+
 '<rect x="492" y="129" width="33" height="39" rx="5" fill="#dce8ee" stroke="#839ba9" stroke-width="3"/>'+
 '<path d="M74 198H514" stroke="#dce6ec" stroke-width="2"/>'+
 words(298,267,'REUSABLE ELECTRONIC QC DEVICE',16,'#2d7185')+
 words(298,288,'NO BLOOD WELL · NO SAMPLE PORT · NEVER ADD LIQUID',12,'#af4b59'),
 'Quidel Triage electronic daily QC device with no sample port, no pipetting and a do not discard label','0 0 600 310');
}
function triageCassette(filled){
 return svg('<ellipse cx="288" cy="232" rx="230" ry="11" fill="#dfe9ee"/>'+
 '<rect x="63" y="82" width="470" height="123" rx="19" fill="#fcfdfd" stroke="#a0aeb8" stroke-width="4"/>'+
 '<rect x="90" y="101" width="221" height="81" rx="6" fill="#fff" stroke="#d1dee4"/>'+
 words(201,126,'TRIAGE TEST DEVICE',15,'#516778')+words(201,154,'PATIENT / LIQUID QC',11,'#66859a')+
 '<circle cx="389" cy="144" r="27" fill="'+(filled?'#c07888':'#f6fbfc')+'" stroke="#779aab" stroke-width="4"/>'+
 '<circle cx="389" cy="144" r="13" fill="'+(filled?'#ad4457':'#eaf4f7')+'"/>'+
 '<path d="M411 122L482 69H556" fill="none" stroke="#328994" stroke-width="3"/>'+
 words(556,62,'SAMPLE WELL',15,'#31798b','end')+
 (filled?'<path d="M404 80L389 112" stroke="#ad4250" stroke-width="5"/>'+
 '<path d="M406 70Q391 85 406 93Q421 85 406 70Z" fill="#bd5162"/>':'')+
 words(296,271,filled?'SPECIMEN / LIQUID QC ADDED':'UNUSED ASSAY CASSETTE',15,'#557b91'),
 'Triage assay cassette '+(filled?'with specimen in sample well':'before specimen loading')+'; distinct from reusable no-port QC Device','0 0 600 305');
}
function triageMeter(mode){
 const chip=mode==='chip';
 const daily=mode==='daily';
 const pass=mode==='pass';
 const item=chip?'INSTALL NEW CODE CHIP':daily?'QC DEVICE':pass?'QC DEVICE PASS':'RUN TEST';
 let h='<ellipse cx="344" cy="291" rx="245" ry="12" fill="#dce7ed"/>'+
 '<path d="M160 41H499L556 70L547 266Q535 287 515 286H137Q121 280 123 259L149 65Z" fill="#e8edef" stroke="#94a6ae" stroke-width="5"/>'+
 '<path d="M499 42L556 70L547 266L503 274Z" fill="#cdd9df"/>'+
 '<path d="M175 62H483L504 96L476 157H171Z" fill="#9db1c0" stroke="#829ca9" stroke-width="3"/>'+
 '<rect x="194" y="81" width="279" height="62" rx="5" fill="#cfdcc0" stroke="#708986" stroke-width="3"/>'+
 words(333,99,'TRIAGE METERPRO',12,'#425c58')+
 '<rect x="217" y="108" width="237" height="25" rx="3" fill="#788f74"/>'+
 words(337,125,item,14,'#f5fff2')+
 '<rect x="160" y="169" width="204" height="96" rx="9" fill="#dce4e8" stroke="#a9bbc4" stroke-width="2"/>'+
 Array.from({length:12},function(_,i){const x=186+i%4*46,y=188+Math.floor(i/4)*25;return '<rect x="'+x+'" y="'+y+'" width="28" height="18" rx="6" fill="#f9fbfc" stroke="#aebfc8"/>';}).join('')+
 '<circle cx="437" cy="206" r="37" fill="#afc3d4" stroke="#86a1b6" stroke-width="3"/>'+
 '<path d="M437 181v14m0 22v14m-26-25h14m24 0h14" stroke="#f6fbfd" stroke-width="5" stroke-linecap="round"/>'+
 '<rect x="294" y="277" width="108" height="8" rx="3" fill="#374954"/>';
 if(chip){
  h+='<rect x="128" y="228" width="21" height="29" rx="3" fill="#263946"/>'+
  '<rect x="22" y="203" width="80" height="64" rx="8" fill="#244c61" stroke="#577c8c" stroke-width="4"/>'+
  '<rect x="92" y="218" width="34" height="34" rx="3" fill="#d6bc55" stroke="#907d3c"/>'+
  Array.from({length:5},function(_,i){return '<path d="M'+(100+i*5)+' 221v24" stroke="#9a7f2c" stroke-width="2"/>';}).join('')+
  '<path d="M126 235H141" stroke="#219f9c" stroke-width="5" stroke-dasharray="7 4"/>'+
  words(60,182,'CODE CHIP',14,'#377185')+
  words(93,289,'LEFT SIDE PORT',11,'#337e8c');
 }
 return svg(h,'Triage MeterPro analyzer with '+(chip?'reagent code chip entering lower left-side port and INSTALL NEW CODE CHIP selected on main menu':daily?'QC DEVICE menu selected':pass?'QC DEVICE PASS status':'RUN TEST main menu'),'0 0 600 315');
}
function printout(){
 return svg('<rect x="165" y="19" width="267" height="265" rx="8" fill="#fff" stroke="#b4c9d4" stroke-width="4"/>'+
 '<path d="M184 67H411M184 118H411M184 167H411M184 220H411" stroke="#d6e4eb" stroke-width="3"/>'+
 words(297,52,'QC / PATIENT RESULT',17,'#315e76')+
 words(221,99,'Device / lot',13,'#668195','start')+
 words(221,147,'PASS / REVIEW',16,'#297d71','start')+
 words(221,197,'Date / initials',13,'#668195','start')+
 '<rect x="229" y="236" width="145" height="19" rx="3" fill="#e4f3ed"/>'+
 words(297,249,'FILE IN QC LOG',11,'#297a6c'),
 'Analyzer result printout with lot check and QC log filing reference','0 0 600 310');
}
function scene(label,media,note,extra){
 return '<figure class="lab-step-scene'+(extra?' '+extra:'')+'"><div class="lab-step-scene-media">'+media+'</div><figcaption><strong>'+esc(label)+'</strong><span>'+esc(note)+'</span></figcaption></figure>';
}
function piccoloScene(title,group){
 const t=String(title).toLowerCase(),q=/qc|control/i.test(group)||/qc|control/i.test(t);
 if(/within 60|sample time|collection|blood tube/.test(t))return scene('Lithium-heparin collection',tube('green','lithium'),'Green-top whole blood. Check the approved specimen window and handling instructions.','green-tube-scene');
 if(/grab the controls|brt|nod|freezer/.test(t))return scene('Frozen QC material',qcFreezer(),'BRT or NOD, depending on the approved control lot. Keep controls in the freezer and prepare according to the current insert.','frozen-controls');
 if(/grab|reagent disc|qc disc|inspect/.test(t))return scene('Check the intact reagent disc',piccoloDisc(false,false),'A built-in sample entry hole is already present. Do not peel, puncture or remove a cover to create it.');
 if(/load|pipett|sample port|fill chamber/.test(t))return scene(q?'Load the QC sample':'Load the blood sample',piccoloDisc(true,true),'Red shows blood in the inner chamber for the patient example. For QC, use the approved control material and volume.');
 if(/insert|drawer|analyz|start/.test(t))return scene('Close the front disc drawer',piccoloInstrument(),'Seat the filled disc and follow the analyzer prompts. Confirm panel and patient or control identification.');
 if(/print|result|log/.test(t))return scene('Review and file the result',printout(),'Check the result and file the QC report when required.');
 return scene('Piccolo testing reference',piccoloInstrument(),'Check the actual analyzer instructions and approved site SOP.');
}
function triageScene(title,group){
 const t=String(title).toLowerCase(),grp=String(group).toLowerCase();
 const daily=/daily-qc|daily qc/.test(grp),newbox=/new.box|new box/.test(grp);
 const isQC=/qc|control/.test(t)||/qc/.test(grp);
 if(/chip|install|new box/.test(t))return scene('Install the matching CODE CHIP',triageMeter('chip'),'From the main menu select INSTALL NEW CODE CHIP, insert the matching lot chip into the left lower port when prompted, confirm and remove it for storage.');
 if(/freezer|grab the qc sample|qc sample/.test(t)&&!/select|enter|click/.test(t))return scene('Thaw and prepare liquid QC',triageQcControls(),'Illustrative freezer and control bottles. Use the Triage Total 5 controls specified in the local SOP.');
 if(daily&&(/qc device|insert the qc device|cassette/.test(t)))return scene('Reusable electronic QC Device',triageQCDevice(),'Daily device check: no sample port and no pipette. Keep this device in its opaque case.');
 if(/print|record|initial|log/.test(t))return scene('Document the QC result',printout(),'Verify pass/fail, date, user initials and correct log.');
 if(/machine is ready|review|result/.test(t))return scene('Verify the meter status',triageMeter('pass'),'Continue only after acceptable QC and no active lockout.');
 if(/insert the cassette|insert.*port/.test(t))return scene(daily?'Insert reusable QC Device':'Insert prepared test cassette',daily?triageQCDevice():triageCassette(true),daily?'Do not add liquid to daily QC Device.':'Prepare the cassette using the kit-specific transfer pipette.');
 if(/run test|click|patient sample|enter mrn|lot/.test(t))return scene('Follow the MeterPro menu',triageMeter(daily?'daily':'home'),'Select the intended QC Device, QC Sample, or Patient Sample mode on the instrument.');
 if(/grab the test kit|pipette|blood samples|dispens/.test(t))return scene('Choose the assay cassette',triageCassette(/dispens|apply/.test(t)),'The liquid sample well exists on disposable assay cassettes, never on the reusable daily QC Device.');
 if(daily||/turn on/.test(t))return scene('Power on Triage MeterPro',triageMeter('home'),'Confirm the correct test mode before continuing.');
 if(newbox)return scene('New reagent box: match the chip',triageMeter('chip'),'Match the chip to the new reagent lot before new-box QC.');
 return scene('Triage specimen handling',triageCassette(true),'Follow the selected assay and approved sample handling instructions.');
}
function genericScene(sec,title,group){
 const t=String(title).toLowerCase(),qc=/qc|calibrat|control/.test(group),id=sec.id;
 if(/report|print|document|file|results/.test(t))return scene('Check and document',printout(),'Verify instrument output and approved reporting workflow.');
 if(/collect|specimen|blood|tube|urine/.test(t)){
  const kind=id==='sysmex'||id==='triage'?'lavender':'green';
  return scene('Collect the correct specimen',tube(kind,kind==='green'?'lithium':'edta'),'Confirm assay-specific specimen, volume, identification and preparation.');
 }
 if(/freezer|fridge|thaw|controls/.test(t)&&qc)return scene('QC material preparation',generalControls(),'Use the exact manufacturer-approved controls and storage requirements for this device.');
 if(/insert|load|cassette|cartridge|sample|disc|strip|swab|pipett/.test(t)){
  const kit=art.kitShape?art.kitShape(id,/insert|load|apply|pipett/.test(t),qc?'qc':'patient'):'';
  return scene('Prepare the correct testing material',kit,'Use the actual device, assay and manufacturer-defined collection position.');
 }
 const media=art.kitShape?art.kitShape(id,false,qc?'qc':'patient'):'';
 return scene(qc?'Quality control':'Instrument workflow',media,'Follow the procedure on the analyzer and approved SOP.');
}
const oldRender=art.render;
art.render=function(sec){
 let h=oldRender(sec);
 if(sec&&sec.id==='piccolo')h=h.replace(/<svg class="equipment-svg"[\s\S]*?<\/svg>/,piccoloInstrument().replace('<svg ','<svg class="equipment-svg" '));
 if(sec&&sec.id==='triage')h=h.replace(/<svg class="equipment-svg"[\s\S]*?<\/svg>/,triageMeter('home').replace('<svg ','<svg class="equipment-svg" '));
 return h;
};
const originalSpecimen=art.specimenGuide;
art.specimenGuide=function(sec){
 let h=originalSpecimen(sec);
 if(sec&&/^(piccolo|pathfast)$/.test(sec.id))h=h.replace(/(<div class="device-media-picture">)[\s\S]*?(<\/svg>)/,'$1'+tube('green','lithium'));
 return h;
};
const oldWorkflow=art.workflowVisual;
art.workflowVisual=function(sec,title,group){
 if(sec&&sec.id==='piccolo')return piccoloScene(title,group);
 if(sec&&sec.id==='triage')return triageScene(title,group);
 return oldWorkflow(sec,title,group);
};
const originalInline=art.inlineKitVisual;
art.inlineKitVisual=function(sec,title,depth,root){
 if(sec&&sec.id==='triage'&&/code chip|chip.*slot|install new code chip/i.test(title))
  return '<div class="lab-inline-device">'+triageMeter('chip')+'<small>Lot-specific CODE CHIP enters the lower left-side port. Select INSTALL NEW CODE CHIP on the main menu and follow the meter prompts.</small></div>';
 if(sec&&sec.id==='piccolo'&&/100 µL pipette|sample port|fill chamber|dispense approximately/i.test(title))
  return '<div class="lab-inline-device">'+piccoloDisc(true,true)+'<small>The hole is part of the disc. Red shows where whole blood sits after filling; do not peel the disc.</small></div>';
 return originalInline(sec,title,depth,root);
};
art.piccoloVisual=function(){return '';};
art.stepIllustration=function(sec,title,group){
 if(!sec||sec.archived||!['Analyzers','Point of care'].includes(sec.category))return '';
 if(sec.id==='piccolo')return piccoloScene(title,group);
 if(sec.id==='triage')return triageScene(title,group);
 return genericScene(sec,title,group);
};
/* The new-box reagent chip is a distinct illustrated action rather than a
   tiny instruction buried under "grab kit". Keep the QC Sample chip separate. */
const triage=window.LAB_GUIDE_DATA&&window.LAB_GUIDE_DATA.sections&&window.LAB_GUIDE_DATA.sections.find(function(s){return s.id==='triage';});
if(triage&&Array.isArray(triage.blocks)){
 const blocks=triage.blocks;
 const head=blocks.findIndex(function(b){return b.level===0&&b.text==='New Box QC';});
 if(head!==-1){
  let end=blocks.findIndex(function(b,i){return i>head&&b.type==='list'&&b.level===0;});
  if(end===-1)end=blocks.length;
  for(let i=end-1;i>head;i--){
   const b=blocks[i];
   if(b.type==='list'&&/In the box, there is a chip|Insert the chip into the slot located|Click INSTALL NEW CODE CHIP > Put the chip back/i.test(b.text))blocks.splice(i,1);
  }
  const idx=blocks.findIndex(function(b,i){return i>head&&b.type==='list'&&b.level===1&&/Grab the QC sample/i.test(b.text);});
  if(idx>head)blocks.splice(idx,0,{type:'list',level:1,text:'Install the new reagent box CODE CHIP'});
 }
 const daily=blocks.find(function(b){return /Insert the QC Device cassette and press enter to run the daily QC/i.test(b.text);});
 if(daily)daily.text='Insert the reusable QC Device (no sample port) and press Enter to run daily QC. Do not add blood or liquid.';
 const old=blocks.find(function(b){return /Select RUN TEST > QC DEVICE/i.test(b.text);});
 if(old)old.text='Select RUN TEST > QC DEVICE on the MeterPro. Use the reusable electronic QC Device from its black case.';
}
})();