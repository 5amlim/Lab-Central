/* Lab Central · Container Reference.
 * Entries consolidated from Lab Calculator taxonomy and the supplied reference photos.
 * Selection is informational, not a test-specific acceptance guarantee.
 */
(function(){
'use strict';
const RAW=[["gold-sst","Gold-top SST","Blood tubes","Q,L","tube","gold","SST","Serum separator tube with gel. Common 5 mL collection option; verify required fill and processing.","old:image3.png","https://www.diamedicalusa.com/ProductImages/IV080292_media_01.jpg"],["tiger-sst","Tiger-top SST","Blood tubes","Q,L","tiger","tiger","SST","Larger SST option commonly 7.5 mL. Verify tube size and how many tubes the test requires.","old:image4.png","https://www.minervamedical.ca/cdn/shop/files/becton-dickinson-bd-vacutainer-sst-plastic-tubes-minervamedical-367988-image1_68768b16-e055-4762-8189-dcffb70f19bc.png?v=1763926668"],["red-serum","Red-top serum","Blood tubes","Q,L","tube","red","SERUM","Serum without separator gel; clot, spin and transfer if required by the test.","old:image1.png",""],["lavender-edta","Lavender-top EDTA","Blood tubes","Q,L","tube","lavender","EDTA","EDTA whole blood for hematology and many molecular tests; never describe as serum.","old:image5.png",""],["pink-edta","Pink-top EDTA","Blood tubes","Q,L","tube","pink","EDTA","Dedicated blood-bank EDTA tube when specifically requested; not interchangeable with lavender without approval.","","https://www.medicaleshop.com/_next/image?q=75&url=https%3A%2F%2Fcdn.medicaleshop.com%2F2c2290b4-7748-4bd9-bff7-82c30837a534_123bafc2-70e0-428f-9df8-07fc797b6168_image-1.jpg&w=3840"],["lightblue-citrate","Light-blue sodium citrate","Blood tubes","Q,L","tube","lightblue","CITRATE","Coagulation collection tube; correct fill ratio is important.","old:image7.png",""],["green-lithium","Green-top lithium heparin","Blood tubes","Q,L","tube","green","Li-HEP","Lithium heparin for plasma or whole blood as accepted for the ordered test.","old:image8.png",""],["sodium-heparin","Green-top sodium heparin","Blood tubes","Q,L","tube","darkgreen","Na-HEP","Sodium heparin tube. Check additive carefully; it is not equivalent to lithium heparin for every test.","","https://www.diamedicalusa.com/ProductImages/MED053544_media_01.jpg"],["royalblue-edta","Royal-blue EDTA trace metal","Blood tubes","Q,L","tube","royal","EDTA","Royal-blue trace-element collection tube with EDTA additive; identify by label and additive stripe.","old:image6.png","https://digitalassets.avantorsciences.com/adaptivemedia/rendition?clid=SAPDAM&id=037cf0d38d7b230311a720244731281006338721&prid=original&vid=0e30d159bd6ee69c76636cb91e2309d9d8582973"],["royalblue-serum","Royal-blue serum trace metal","Blood tubes","Q,L","tube","royalred","SERUM","Trace-element serum tube; confirm the red additive stripe. Do not substitute royal-blue EDTA.","","https://shop.dalsup.com/images/gallery/2780/1000X1000/BD_368380_1.jpg"],["acd-yellow","Yellow-top ACD","Blood tubes","Q,L","tube","yellow","ACD","Acid citrate dextrose tube for specific specialized testing; use only when ordered.","","https://medical-goods.com.tw/upload/product/photo_m_174166100921.jpg"],["gray-fluoride","Gray-top fluoride/oxalate blood","Blood tubes","Q,L","tube","gray","FLUORIDE","Blood collection tube for tests requiring a fluoride/oxalate additive. Not the gray urine culture tube.","","https://essentialmedical.ca/cdn/shop/files/367922_1200x1200.png?v=1747747503"],["microtainer-sst","Amber SST Microtainer","Blood tubes","Q,L","micro","gold","SST","Small-volume microcollection device. Not interchangeable with regular SST volume assumptions.","","https://cdn11.bigcommerce.com/s-3yvzqa/images/stencil/1280x1280/products/46246/342213/SKU365978__84774.1692282450.png?c=2"],["microtainer-edta","Lavender EDTA Microtainer","Blood tubes","Q,L","micro","lavender","EDTA","Small-volume EDTA microcollection device when test and laboratory accept microcollection.","","https://www.alphalabs.co.uk/media/catalog/product/3/6/365975-1.jpg"],["urine-cup","Sterile urine cup","Urine","Q,L","cup","white","STERILE","Sterile leakproof container for collection. Transfer into required preservative tube when indicated.","cedars:sterile",""],["ua-yellow","Yellow-cap urinalysis transport","Urine","Q,L","tube","yellow","UA","Urinalysis preservative tube; follow the correct fill line and test requirements.","cedars:ua","https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/402053_front.jpg"],["urine-gray","Gray-top urine culture tube","Urine","Q,L","tube","gray","CULTURE","Preserved urine culture tube. Correct fill amount varies by system and receiving lab.","cedars:urine","https://www.mercedesscientific.com/media/catalog/product/cache/aa2ebfe10f8f35add86889ffe8b4ae3a/b/d/bd_364951_image1_2.jpg"],["urisponge","Copan UriSponge","Urine","Q,L","urisponge","yellow","UriSponge","Urine culture sponge transport system. Dip sponge, then close; do not pour urine directly into its tube.","","https://assets.fishersci.com/TFS-Assets/CCG/product-images/UriSponge_8U033S50_2644505_1.jpg-650.jpg"],["24h-jug","24-hour urine collection jug","Urine","Q,L","jug","orange","24 HOUR","Timed urine collection container. Verify any required preservative and collection instructions.","","https://images.globalindustrial.com/images/pdp/XDF_43029-1.webp?t=1772688177756"],["acidwash-urine","Acid-washed / metal-free urine","Urine","Q,L","cup","blue","TRACE","Use the receiving lab’s trace-element-free or acid-washed container. The reference photo shows a representative trace-metal-controlled collection jug, not every required aliquot vessel.","","https://openstax.org/apps/image-cdn/v1/f%3Dwebp/apps/archive/20260209.222123/resources/d470c046e48d07d1358994c52afb35fd609ac83f"],["cobas-urine","cobas urine PCR transport","Urine","Q,L","swab","yellow","cobas","Special PCR urine transport device, not a routine urine culture vial.","cedars:cobasUrine",""],["serum-transfer","Serum transport tube","Transport","Q,L","tube","red","SERUM","Aliquot serum after processing when required; label serum and original tube source.","old:image9.png",""],["plasma-transfer","Plasma transport tube","Transport","Q,L","tube","lavender","PLASMA","Aliquot plasma from the correct anticoagulant tube; identify source additive.","old:image9.png",""],["frozen-transfer","Frozen plasma transport vial","Transport","Q,L","micro","purple","FROZEN","Use an approved cryovial or transport tube for frozen plasma; the reference photo shows a representative purple-cap cryovial, not a lab-specific approved kit.","","https://i5.walmartimages.com/seo/CryoKING-1-5ml-Plastic-Cryogenic-Vials-with-Caps-Tubes-with-Bottom-2D-Barcode-for-Sample-Collection-and-Storage-External-Thread-25-Pcs-Bag_37875b0d-50e6-41ad-ac27-60bf669f3051.df41a027acc18ba324ba5193496fad81.jpeg"],["amber-protect","Amber light-protected tube","Transport","Q,L","tube","amber","LIGHT","Light-protective specimen transport for photosensitive tests; verify receiving-lab conditions.","","https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/marketplace/images/299/026/56965b8a-9efb-49c2-a125-aeed6e09c903/640/56965b8a-9efb-49c2-a125-aeed6e09c903.png"],["sterile-50ml","Sterile screw-cap 50 mL tube","Transport","Q,L","conical","white","50 mL","Conical sterile transport tube for indicated specimens. Verify specimen source and temperature.","cedars:sterile50",""],["sterile-cup","Sterile specimen cup","Transport","Q,L","cup","white","STERILE","Leakproof sterile cup for swab-free specimen types as accepted by the receiving laboratory.","cedars:sterile",""],["stool-clean","Clean stool vial","Stool","Q,L","stool","white","CLEAN","Unpreserved clean stool transport vial. Use only when compatible with the ordered assay.","cedars:cleanStool",""],["stool-cary","Cary-Blair / Para-Pak C&S","Stool","Q,L","stool","orange","C&S","Orange-cap culture transport medium for enteric stool testing. Not a Total-Fix substitute.","","https://medicalsupplyhq.com/cdn/shop/products/xiqq1kyl9fxjxagxfedl_1080x.jpg?v=1685253722"],["totalfix","Total-Fix O&P preservative","Stool","Q,L","stool","black","TOTAL-FIX","Quest uses Total-Fix for stool parasitology. Labcorp acceptance varies by test; verify before collecting.","","https://cdn.medicaleshop.com/41240715-3486-4c6d-8ff7-3b32d3a106dd_98f676ee-dd22-46eb-a221-163fc1f83bde_image-0.jpg"],["para-formalin","10% formalin stool vial","Stool","Q,L","stool","pink","FORMALIN","Preserved stool vial used in some O&P kits. Use exact paired media per laboratory.","cedars:formalin",""],["para-pva","Zn-PVA stool preservative vial","Stool","Q,L","stool","gray","PVA","Paired stool parasitology media when required. Not interchangeable with culture medium.","","https://assets.fishersci.com/TFS-Assets/CCG/Meridian-Bioscience%2C-Inc/product-images/GID_900000000441333_1.jpg-650.jpg"],["stool-pcr","Stool PCR collection vial","Stool","Q,L","stool","orange","STOOL PCR","Enteric stool PCR kits may specify Cary-Blair transport. Verify the test code and kit.","","https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/1015260_asst.jpg"],["e-swab","eSwab liquid Amies","Swabs & kits","Q,L","swab","white","eSwab","Swab tube with liquid Amies for accepted bacterial cultures. Confirm test/source compatibility.","cedars:eswab",""],["utm","UTM / viral transport tube","Swabs & kits","Q,L","swab","red","UTM","Viral transport medium with swab. Confirm required medium, temperature and acceptance.","cedars:utm",""],["aptima-swab","Aptima transport kit","Swabs & kits","Q,L","swab","pink","APTIMA","Aptima collection kit for selected STI/NAAT tests. Use test-specific swab/urine kit.","cedars:aptima",""],["affirm","Affirm / ATTS kit","Swabs & kits","Q,L","swab","white","AFFIRM","BD Affirm ambient temperature transport system for indicated vaginitis tests.","cedars:affirm",""],["cobas-swab","cobas PCR swab kit","Swabs & kits","Q,L","swab","yellow","COBAS","Test-specific cobas swab PCR collection tube and kit.","cedars:cobasSwab",""],["cedars-three","Cedars three-vial Para-Pak stool kit","Stool","C","three","mixed","3 VIALS","Cedars local kit: yellow C&S, pink 10% formalin and white clean vial. Submit all three only when ordered workflow specifies.","cedars:parapak",""],["cedars-adult","Cedars adult blood culture set","Blood cultures","C","bloodpair","mixed","AER / ANA","Adult aerobic and anaerobic bottles. Confirm the approved bottle types, draw volume and order of collection.","cedars:adult",""],["cedars-peds","Cedars pediatric blood culture","Blood cultures","C","bloodbottle","pink","PEDS","Pediatric culture bottle(s). Confirm count and draw volume with Cedars protocol for the patient.","cedars:peds",""],["cedars-fungal","Cedars fungal / mycobacterial blood culture","Blood cultures","C","bloodbottle","red","MYCO","Specialized Myco/F Lytic bottle where ordered; not an adult routine culture bottle.","cedars:fungal",""],["cedars-eswab","Cedars white-top eSwab","Swabs & kits","C","swab","white","eSwab","Cedars swab-based culture reference; verify specimen source and test.","cedars:eswab",""],["cedars-utm","Cedars red-top UTM","Swabs & kits","C","swab","red","UTM","Cedars viral/swab transport reference. Follow current test-specific instructions.","cedars:utm",""],["cedars-cobas","Cedars cobas PCR swab","Swabs & kits","C","swab","yellow","COBAS","Cedars cobas swab kit when test requires it.","cedars:cobasSwab",""],["cedars-affirm","Cedars Affirm / ATTS","Swabs & kits","C","swab","white","AFFIRM","Cedars vaginitis test transport kit, according to ordered assay.","cedars:affirm",""]];
const labs=[{id:'all',name:'All labs'},{id:'Q',name:'Quest'},{id:'L',name:'Labcorp'},{id:'C',name:'Cedars'}];
const commonCats=['Blood tubes','Urine','Transport','Stool','Swabs & kits','Blood cultures'];
let selectedLab='all',selectedCat='all',query='';
const E=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[c]));
const list=RAW.map(a=>({id:a[0],name:a[1],category:a[2],labs:a[3].split(','),kind:a[4],color:a[5],label:a[6],desc:a[7],photo:a[8],external:a[9]}));
const labText={Q:'QUEST',L:'LABCORP',C:'CEDARS'};
const COLORS={gold:'#d9ac28',tiger:'#ca513f',red:'#cf5754',lavender:'#9378b5',pink:'#d08aa8',lightblue:'#89d5e5',green:'#368e66',darkgreen:'#236b53',royal:'#264c95',royalred:'#284994',yellow:'#efca3a',gray:'#9aa4ad',orange:'#e58c36',white:'#eceff2',blue:'#487cb2',purple:'#7657a0',amber:'#9d6232',black:'#313c45',mixed:'#b0bfcc'};
const photoFallback={Q:'https://testdirectory.questdiagnostics.com/test/home',L:'https://www.labcorp.com/test-menu/search',C:'https://www.cedars-sinai.org/'};
function photo(item){
 if(item.photo.startsWith('old:'))return window.LAB_TUBE_IMAGES?.[item.photo.slice(4)]||'';
 if(item.photo.startsWith('cedars:'))return window.CEDARS_CONTAINER_PHOTOS?.[item.photo.slice(7)]||'';
 return item.external||'';
}
function photoSource(item){return item.external || (item.photo.startsWith('cedars:')?'https://5amlim.github.io/Lab-Calculator/cedars-container-guide.html':photoFallback[item.labs[0]]);}
function svg(item){
 const c=COLORS[item.color]||'#b1bcc3';
 const lab=E(item.label.length>12?item.label.slice(0,12):item.label);
 const top='<svg class="lcr-svg" viewBox="0 0 260 150" role="img" aria-label="Illustration of '+E(item.name)+'" xmlns="http://www.w3.org/2000/svg">'+
 '<defs><linearGradient id="glass-'+E(item.id)+'" x1="0" x2="1"><stop stop-color="#f7fbfc"/><stop offset=".48" stop-color="#e5eff3"/><stop offset="1" stop-color="#fbfdff"/></linearGradient></defs>';
 const glass='url(#glass-'+E(item.id)+')';
 const txt=(x,y,s,size=9)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="700" fill="#405b6a">'+E(s)+'</text>';
 const tube=(x,y,w,h,cap,label,fill='#b4c2c8',tiger=false)=>{
  const end=y+h;
  let v='<path d="M'+x+' '+(y+15)+'H'+(x+w)+'V'+(end-15)+'Q'+(x+w)+' '+end+' '+(x+w/2)+' '+end+'Q'+x+' '+end+' '+x+' '+(end-15)+'Z" fill="'+glass+'" stroke="#8aa2ae" stroke-width="1.5"/>'+
  '<path d="M'+(x+3)+' '+(end-42)+'H'+(x+w-3)+'V'+(end-16)+'Q'+(x+w-3)+' '+(end-3)+' '+(x+w/2)+' '+(end-3)+'Q'+(x+3)+' '+(end-3)+' '+(x+3)+' '+(end-16)+'Z" fill="'+fill+'" opacity=".67"/>'+
  '<rect x="'+(x-2)+'" y="'+y+'" width="'+(w+4)+'" height="22" rx="4" fill="'+cap+'" stroke="#718b9b" stroke-width="1"/>';
  if(tiger)v+='<path d="M'+x+' '+(y+2)+' l10 0 l-9 18 h-4ZM'+(x+16)+' '+(y+2)+' l10 0 l-9 18 h-6Z" fill="#30363a"/>';
  for(let j=3;j<w;j+=5)v+='<path d="M'+(x+j)+' '+(y+4)+'v14" stroke="#ffffff" opacity=".34" stroke-width="1"/>';
  v+='<rect x="'+(x+4)+'" y="'+(y+37)+'" width="'+(w-8)+'" height="35" rx="2" fill="#fff" stroke="#d4e0e4"/>'+
  txt(x+w/2,y+55,label,w>36?10:8)+
  '<path d="M'+(x+5)+' '+(y+24)+'v'+(h-43)+'" stroke="#fff" stroke-width="2" opacity=".8"/>';
  return v;
 };
 const vial=(x,cap,label)=>'<rect x="'+x+'" y="42" width="42" height="94" rx="8" fill="'+glass+'" stroke="#819ba5" stroke-width="1.5"/>'+
 '<rect x="'+(x-3)+'" y="33" width="48" height="23" rx="6" fill="'+cap+'" stroke="#76909d" stroke-width="1.3"/>'+
 '<rect x="'+(x+4)+'" y="70" width="34" height="38" rx="3" fill="#fff" stroke="#d7e2e6"/>'+txt(x+21,89,label,9)+
 '<rect x="'+(x+4)+'" y="117" width="34" height="14" rx="3" fill="#d6bf9f" opacity=".5"/>';
 let out='';
 if(item.kind==='three'){
  out=vial(39,'#e0c434','C&S')+vial(107,'#df91ac','10%')+vial(175,'#e4e8eb','CLEAN');
 }else if(item.kind==='stool'){
  out=vial(107,c,lab);
 }else if(item.kind==='bloodpair'||item.kind==='bloodbottle'){
  const bottle=(x,cap,label)=>'<path d="M'+(x+17)+' 39v13q-19 14-19 24v42q0 12 12 12h42q12 0 12-12V76q0-10-19-24V39Z" fill="'+glass+'" stroke="#859da9" stroke-width="1.5"/>'+
   '<rect x="'+(x+15)+'" y="19" width="34" height="24" rx="4" fill="'+cap+'" stroke="#7c93a0"/>'+
   '<rect x="'+(x+6)+'" y="86" width="53" height="27" rx="3" fill="#fff" stroke="#d5e0e5"/>'+txt(x+32,103,label,10)+
   '<rect x="'+(x+4)+'" y="115" width="57" height="11" rx="2" fill="#c9aa9c" opacity=".55"/>';
  out=item.kind==='bloodpair'?bottle(52,'#b47baf','ANA')+bottle(148,'#3687aa','AERO'):bottle(99,c,lab);
 }else if(item.kind==='cup'){
  out='<path d="M75 49h110l-10 77q-1 9-14 9h-61q-13 0-14-9Z" fill="'+glass+'" stroke="#8ba3ae" stroke-width="2"/>'+
  '<rect x="68" y="39" width="124" height="19" rx="6" fill="'+c+'" stroke="#859ba5"/>'+
  '<rect x="94" y="79" width="73" height="30" rx="4" fill="#fff" stroke="#d5e0e5"/>'+txt(130,97,lab,12);
 }else if(item.kind==='jug'){
  out='<path d="M84 40h90q8 0 8 9v72q0 10-10 10H84q-7 0-7-8V48q0-8 7-8Z" fill="'+glass+'" stroke="#8ba3b1" stroke-width="2"/>'+
  '<path d="M177 55h19v32h-19" fill="none" stroke="#8ba3b1" stroke-width="9"/>'+
  '<rect x="90" y="27" width="70" height="17" rx="4" fill="'+c+'"/>'+
  '<rect x="94" y="76" width="76" height="35" rx="4" fill="#fff" stroke="#d6e0e4"/>'+txt(131,96,'24 HOUR',13);
 }else if(item.kind==='urisponge'){
  out=tube(88,15,37,120,'#e7cc41','URI','#eff7e2')+
  '<path d="M173 42v77" stroke="#d5b233" stroke-width="5" stroke-linecap="round"/>'+
  '<rect x="162" y="112" width="22" height="22" rx="5" fill="#efe5b8" stroke="#b5aa77"/>'+
  '<rect x="153" y="27" width="40" height="20" rx="6" fill="#e5c72e"/>';
 }else if(item.kind==='swab'){
  out=tube(94,19,36,117,c,lab,'#e6edf0')+
  '<path d="M165 37v88" stroke="#94acb5" stroke-width="2.8"/>'+
  '<ellipse cx="165" cy="32" rx="6" ry="13" fill="#f8fbfc" stroke="#b5c4cb"/>';
 }else if(item.kind==='conical'||item.kind==='micro'){
  let x=108,tip=item.kind==='micro'?114:137;
  out='<path d="M99 42h63v'+(tip-19)+'l-31 18q-3 2-5 0l-27-18Z" fill="'+glass+'" stroke="#8ba3b1" stroke-width="1.5"/>'+
  '<rect x="95" y="26" width="71" height="22" rx="5" fill="'+c+'" stroke="#829ba5"/>'+
  '<rect x="107" y="67" width="47" height="28" rx="4" fill="#fff" stroke="#d5e0e5"/>'+txt(131,85,lab,10);
 }else{
  let fill=item.category==='Blood tubes'?'#a54e57':'#d6b484';
  if(item.color==='gold'||item.color==='tiger')fill='#e4d29a';
  out=tube(107,12,46,124,c,lab,fill,item.kind==='tiger');
  if(item.color==='royalred')out+='<rect x="106" y="30" width="48" height="4" fill="#ce5d54"/>';
 }
 return top+'<ellipse cx="130" cy="144" rx="82" ry="3" fill="#dce6eb" opacity=".5"/>'+out+'</svg>';
}
function belongs(x){return (selectedLab==='all'||x.labs.includes(selectedLab))&&(selectedCat==='all'||x.category===selectedCat)&&(!query||[x.name,x.label,x.category,x.desc,x.labs.map(l=>labText[l]).join(' ')].join(' ').toLowerCase().includes(query));}
function labsFor(x){return x.labs.map(l=>'<span class="lcr-lab lcr-'+l+'">'+labText[l]+'</span>').join('');}
function card(x){
 const picture=photo(x),safe=E(x.name);
 const preview=picture?'<img src="'+E(picture)+'" alt="Representative reference photo of '+safe+'" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><span class="lcr-no-photo" style="display:none">Photo could not be loaded. Open the reference source.</span>':
 '<span class="lcr-no-photo">Reference image is illustrative. Confirm the exact collection product with the lab.</span>';
 return '<article class="lcr-card"><div class="lcr-media"><button class="lcr-art-trigger" type="button" data-lcr-open="'+E(x.id)+'" aria-label="View reference photo for '+safe+'">'+svg(x)+'<span class="lcr-hover-hint">Hover or click to view photo ↗</span></button>'+
 '<div class="lcr-hover" aria-hidden="true"><div class="lcr-hover-photo">'+preview+'</div><strong>'+safe+'</strong><small>'+(picture?'Representative photo':'Image not yet verified')+'</small></div></div>'+
 '<div class="lcr-card-body"><div class="lcr-badges">'+labsFor(x)+'</div><h3>'+safe+'</h3><p>'+E(x.desc)+'</p>'+
 '<div class="lcr-card-bottom"><span>'+E(x.category)+'</span><button type="button" data-lcr-open="'+E(x.id)+'">View photo & details ↗</button></div></div></article>';
}
function visible(){return list.filter(belongs);}
function categories(){
 const relevant=list.filter(x=>selectedLab==='all'||x.labs.includes(selectedLab));
 return commonCats.filter(c=>relevant.some(x=>x.category===c));
}
function render(){
 const opts=categories();
 if(selectedCat!=='all'&&!opts.includes(selectedCat))selectedCat='all';
 const matches=visible();
 return '<section id="labContainerReference" class="lcr" aria-labelledby="lcrTitle">'+
 '<div class="lcr-hero"><div><span class="lcr-eyebrow">LAB CENTRAL / SPECIMEN REFERENCE</span><h2 id="lcrTitle">Lab Container Reference</h2>'+
 '<p>Illustrated blood tubes, urine containers, stool kits, transport vials and swab systems. Choose the receiving laboratory, then a container category.</p></div>'+
 '<span class="lcr-summary">'+list.length+' container types</span></div>'+
 '<div class="lcr-filter-bar"><div class="lcr-filter-label">RECEIVING LAB</div><div class="lcr-filter-buttons" role="group" aria-label="Filter by receiving lab">'+labs.map(l=>'<button type="button" class="'+(selectedLab===l.id?'active':'')+'" data-lcr-lab="'+l.id+'" aria-pressed="'+(selectedLab===l.id)+'">'+l.name+'</button>').join('')+'</div>'+
 '<div class="lcr-search-wrap"><label class="lcr-filter-label" for="lcrSearch">FIND A CONTAINER</label><input id="lcrSearch" type="search" value="'+E(query)+'" placeholder="Search name, cap, use…" autocomplete="off"></div></div>'+
 '<div class="lcr-categories"><span class="lcr-filter-label">CATEGORY</span><div class="lcr-filter-buttons" role="group" aria-label="Filter by container type">'+
 ['all',...opts].map(c=>'<button type="button" class="'+(selectedCat===c?'active':'')+'" data-lcr-cat="'+E(c)+'" aria-pressed="'+(selectedCat===c)+'">'+(c==='all'?'All containers':E(c))+'</button>').join('')+'</div></div>'+
 '<div class="lcr-results-row"><strong id="lcrResultsCount">'+matches.length+' containers</strong><span>Drawings show recognizable features. Hover to preview a photo; click for a larger view.</span></div>'+
 '<div class="lcr-grid" id="lcrGrid">'+(matches.length?matches.map(card).join(''):'<p class="lcr-empty">No containers match these filters. Try another category or search term.</p>')+'</div>'+
 '<div class="lcr-disclaimer"><strong>Use the approved test-specific directory.</strong> Cap colors, additives, collection volumes, transport conditions and accepting laboratories can differ by assay, product lot and region. A shared lab badge means the container family appears in its workflow, not that every test accepts that container. In particular, confirm Labcorp acceptance before substituting Total-Fix.</div>'+
 '<div class="lcr-links"><a href="https://testdirectory.questdiagnostics.com/test/home" target="_blank" rel="noopener noreferrer">Quest Test Directory ↗</a>'+
 '<a href="https://www.labcorp.com/test-menu/search" target="_blank" rel="noopener noreferrer">Labcorp Test Menu ↗</a>'+
 '<a href="https://5amlim.github.io/Lab-Calculator/cedars-container-guide.html" target="_blank" rel="noopener noreferrer">Cedars container guide ↗</a></div>'+
 '<dialog class="lcr-dialog" id="lcrDialog" aria-label="Container photo and details"><div id="lcrDialogBody"></div><button type="button" data-lcr-close aria-label="Close photo viewer" class="lcr-dialog-close">✕</button></dialog>'+
 '</section>';
}
function modal(item){
 const picture=photo(item);
 const photoBox=picture?'<img src="'+E(picture)+'" alt="Representative reference photo of '+E(item.name)+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><p class="lcr-photo-error" style="display:none">The reference photo is temporarily unavailable.</p>':
 '<p class="lcr-photo-error">A verified product photo is not yet available for this variant. Use the manufacturer source or receiving-lab directory.</p>';
 return '<div class="lcr-modal-head"><div class="lcr-badges">'+labsFor(item)+'</div><h2>'+E(item.name)+'</h2></div>'+
 '<div class="lcr-modal-layout"><div class="lcr-modal-art"><span>ILLUSTRATION</span>'+svg(item)+'</div><div class="lcr-modal-photo"><span>REFERENCE PHOTO</span>'+photoBox+'</div></div>'+
 '<div class="lcr-modal-info"><p>'+E(item.desc)+'</p><a href="'+E(photoSource(item))+'" target="_blank" rel="noopener noreferrer">Open reference source ↗</a></div>';
}
if(typeof document!=='undefined')document.addEventListener('click',e=>{
 const root=e.target.closest('#labContainerReference');
 if(!root)return;
 const lab=e.target.closest('[data-lcr-lab]'),cat=e.target.closest('[data-lcr-cat]'),open=e.target.closest('[data-lcr-open]'),close=e.target.closest('[data-lcr-close]');
 if(close){root.querySelector('#lcrDialog')?.close();return;}
 if(open){
  const item=list.find(x=>x.id===open.getAttribute('data-lcr-open'));
  const dialog=root.querySelector('#lcrDialog');
  if(item&&dialog){dialog.querySelector('#lcrDialogBody').innerHTML=modal(item);dialog.showModal();}
  return;
 }
 if(lab){selectedLab=lab.dataset.lcrLab;selectedCat='all';query='';root.outerHTML=render();return;}
 if(cat){selectedCat=cat.dataset.lcrCat;root.outerHTML=render();}
});
if(typeof document!=='undefined')document.addEventListener('input',e=>{
 if(!e.target.matches('#labContainerReference #lcrSearch'))return;
 query=e.target.value.toLowerCase().trim();
 const root=e.target.closest('#labContainerReference');
 if(!root)return;
 const items=visible();
 const grid=root.querySelector('#lcrGrid'),count=root.querySelector('#lcrResultsCount');
 if(grid)grid.innerHTML=items.length?items.map(card).join(''):'<p class="lcr-empty">No matching containers found.</p>';
 if(count)count.textContent=items.length+' containers';
});
window.LAB_CONTAINER_REFERENCE={render,items:list,draw:svg};
})();