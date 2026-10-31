/* Lab Central · Container Reference.
 * Entries consolidated from Lab Calculator taxonomy and the supplied reference photos.
 * Selection is informational, not a test-specific acceptance guarantee.
 */
(function(){
'use strict';
const RAW=[["gold-sst","Gold-top SST","Blood tubes","Q,L","tube","gold","SST","Serum separator tube with gel. Common 5 mL collection option; verify required fill and processing.","old:image3.png","https://www.diamedicalusa.com/ProductImages/IV080292_media_01.jpg"],["tiger-sst","Tiger-top SST","Blood tubes","Q,L","tiger","tiger","SST","Larger SST option commonly 7.5 mL. Verify tube size and how many tubes the test requires.","old:image4.png","https://www.minervamedical.ca/cdn/shop/files/becton-dickinson-bd-vacutainer-sst-plastic-tubes-minervamedical-367988-image1_68768b16-e055-4762-8189-dcffb70f19bc.png?v=1763926668"],["red-serum","Red-top serum","Blood tubes","Q,L","tube","red","SERUM","Serum without separator gel; clot, spin and transfer if required by the test.","old:image1.png",""],["lavender-edta","Lavender-top EDTA","Blood tubes","Q,L","tube","lavender","EDTA","EDTA whole blood for hematology and many molecular tests; never describe as serum.","old:image5.png",""],["pink-edta","Pink-top EDTA","Blood tubes","Q,L","tube","pink","EDTA","Dedicated blood-bank EDTA tube when specifically requested; not interchangeable with lavender without approval.","","https://www.medicaleshop.com/_next/image?q=75&url=https%3A%2F%2Fcdn.medicaleshop.com%2F2c2290b4-7748-4bd9-bff7-82c30837a534_123bafc2-70e0-428f-9df8-07fc797b6168_image-1.jpg&w=3840"],["lightblue-citrate","Light-blue sodium citrate","Blood tubes","Q,L","tube","lightblue","CITRATE","Coagulation collection tube; correct fill ratio is important.","old:image7.png",""],["green-lithium","Green-top lithium heparin","Blood tubes","Q,L","tube","green","Li-HEP","Lithium heparin for plasma or whole blood as accepted for the ordered test.","old:image8.png",""],["sodium-heparin","Green-top sodium heparin","Blood tubes","Q,L","tube","darkgreen","Na-HEP","Sodium heparin tube. Check additive carefully; it is not equivalent to lithium heparin for every test.","","https://www.diamedicalusa.com/ProductImages/MED053544_media_01.jpg"],["royalblue-edta","Royal-blue EDTA trace metal","Blood tubes","Q,L","tube","royal","EDTA","Royal-blue trace-element collection tube with EDTA additive; identify by label and additive stripe.","old:image6.png","https://digitalassets.avantorsciences.com/adaptivemedia/rendition?clid=SAPDAM&id=037cf0d38d7b230311a720244731281006338721&prid=original&vid=0e30d159bd6ee69c76636cb91e2309d9d8582973"],["royalblue-serum","Royal-blue serum trace metal","Blood tubes","Q,L","tube","royalred","SERUM","Trace-element serum tube; confirm the red additive stripe. Do not substitute royal-blue EDTA.","","https://shop.dalsup.com/images/gallery/2780/1000X1000/BD_368380_1.jpg"],["acd-yellow","Yellow-top ACD","Blood tubes","Q,L","tube","yellow","ACD","Acid citrate dextrose tube for specific specialized testing; use only when ordered.","","https://medical-goods.com.tw/upload/product/photo_m_174166100921.jpg"],["gray-fluoride","Gray-top fluoride/oxalate blood","Blood tubes","Q,L","tube","gray","FLUORIDE","Blood collection tube for tests requiring a fluoride/oxalate additive. Not the gray urine culture tube.","","https://essentialmedical.ca/cdn/shop/files/367922_1200x1200.png?v=1747747503"],["microtainer-sst","Amber SST Microtainer","Blood tubes","Q,L","micro","gold","SST","Small-volume microcollection device. Not interchangeable with regular SST volume assumptions.","","https://cdn11.bigcommerce.com/s-3yvzqa/images/stencil/1280x1280/products/46246/342213/SKU365978__84774.1692282450.png?c=2"],["microtainer-edta","Lavender EDTA Microtainer","Blood tubes","Q,L","micro","lavender","EDTA","Small-volume EDTA microcollection device when test and laboratory accept microcollection.","","https://www.alphalabs.co.uk/media/catalog/product/3/6/365975-1.jpg"],["urine-cup","Sterile urine cup","Urine","Q,L","cup","white","STERILE","Sterile leakproof container for collection. Transfer into required preservative tube when indicated.","cedars:sterile",""],["ua-yellow","Red/yellow urinalysis preservative tube","Urine","Q,L","tube","yellow","UA","BD-style 8 mL conical urinalysis preservative tube with red/yellow closure. Follow the labeled fill range and test requirements.","cedars:ua","https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/402053_front.jpg"],["urine-gray","Gray-top urine culture tube","Urine","Q,L","tube","gray","CULTURE","Representative BD 4 mL, 13 × 75 mm round-bottom C&S tube. Confirm the marked minimum fill and receiving-lab requirements.","cedars:urine","https://www.mercedesscientific.com/media/catalog/product/cache/aa2ebfe10f8f35add86889ffe8b4ae3a/b/d/bd_364951_image1_2.jpg"],["urisponge","Copan UriSponge","Urine","Q,L","urisponge","yellow","UriSponge","Screw-cap tube with a cap-mounted applicator and two absorbent sponges. Dip the sponges into urine, then reclose the tube. Do not pour urine into the tube.","","https://assets.fishersci.com/TFS-Assets/CCG/product-images/UriSponge_8U033S50_2644505_1.jpg-650.jpg"],["24h-jug","24-hour urine collection jug","Urine","Q,L","jug","orange","24 HOUR","Timed urine collection container. Verify any required preservative and collection instructions.","","https://images.globalindustrial.com/images/pdp/XDF_43029-1.webp?t=1772688177756"],["acidwash-urine","Acid-washed / metal-free urine","Urine","Q,L","cup","blue","TRACE","Use the receiving lab’s trace-element-free or acid-washed container. The reference photo shows a representative trace-metal-controlled collection jug, not every required aliquot vessel.","","https://openstax.org/apps/image-cdn/v1/f%3Dwebp/apps/archive/20260209.222123/resources/d470c046e48d07d1358994c52afb35fd609ac83f"],["cobas-urine","cobas urine PCR transport","Urine","Q,L","swab","yellow","cobas","Special PCR urine transport device, not a routine urine culture vial.","cedars:cobasUrine",""],["serum-transfer","Serum transport tube","Transport","Q,L","tube","red","SERUM","Aliquot serum after processing when required; label serum and original tube source.","old:image9.png",""],["plasma-transfer","Plasma transport tube","Transport","Q,L","tube","lavender","PLASMA","Aliquot plasma from the correct anticoagulant tube; identify source additive.","old:image9.png",""],["frozen-transfer","Frozen plasma transport vial","Transport","Q,L","micro","purple","FROZEN","Use an approved cryovial or transport tube for frozen plasma; the reference photo shows a representative purple-cap cryovial, not a lab-specific approved kit.","","https://i5.walmartimages.com/seo/CryoKING-1-5ml-Plastic-Cryogenic-Vials-with-Caps-Tubes-with-Bottom-2D-Barcode-for-Sample-Collection-and-Storage-External-Thread-25-Pcs-Bag_37875b0d-50e6-41ad-ac27-60bf669f3051.df41a027acc18ba324ba5193496fad81.jpeg"],["amber-protect","Amber light-protected tube","Transport","Q,L","tube","amber","LIGHT","Light-protective specimen transport for photosensitive tests; verify receiving-lab conditions.","","https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/marketplace/images/299/026/56965b8a-9efb-49c2-a125-aeed6e09c903/640/56965b8a-9efb-49c2-a125-aeed6e09c903.png"],["sterile-50ml","Sterile screw-cap 50 mL tube","Transport","Q,L","conical","white","50 mL","Conical sterile transport tube for indicated specimens. Verify specimen source and temperature.","cedars:sterile50",""],["sterile-cup","Sterile specimen cup","Transport","Q,L","cup","white","STERILE","Leakproof sterile cup for swab-free specimen types as accepted by the receiving laboratory.","cedars:sterile",""],["stool-clean","Clean stool vial","Stool","Q,L","stool","white","CLEAN","Unpreserved clean stool transport vial. Use only when compatible with the ordered assay.","cedars:cleanStool",""],["stool-cary","Cary-Blair / Para-Pak C&S","Stool","Q,L","stool","orange","C&S","Orange-cap culture transport medium for enteric stool testing. Not a Total-Fix substitute.","","https://medicalsupplyhq.com/cdn/shop/products/xiqq1kyl9fxjxagxfedl_1080x.jpg?v=1685253722"],["totalfix","Total-Fix O&P preservative","Stool","Q,L","stool","black","TOTAL-FIX","Quest uses Total-Fix for stool parasitology. Labcorp acceptance varies by test; verify before collecting.","","https://cdn.medicaleshop.com/41240715-3486-4c6d-8ff7-3b32d3a106dd_98f676ee-dd22-46eb-a221-163fc1f83bde_image-0.jpg"],["para-formalin","10% formalin stool vial","Stool","Q,L","stool","pink","FORMALIN","Preserved stool vial used in some O&P kits. Use exact paired media per laboratory.","cedars:formalin",""],["para-pva","Zn-PVA stool preservative vial","Stool","Q,L","stool","gray","PVA","Paired stool parasitology media when required. Not interchangeable with culture medium.","","https://assets.fishersci.com/TFS-Assets/CCG/Meridian-Bioscience%2C-Inc/product-images/GID_900000000441333_1.jpg-650.jpg"],["stool-pcr","Stool PCR collection vial","Stool","Q,L","stool","orange","STOOL PCR","Enteric stool PCR kits may specify Cary-Blair transport. Verify the test code and kit.","","https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/1015260_asst.jpg"],["e-swab","eSwab liquid Amies","Swabs & kits","Q,L","swab","white","eSwab","Swab tube with liquid Amies for accepted bacterial cultures. Confirm test/source compatibility.","cedars:eswab",""],["utm","UTM / viral transport tube","Swabs & kits","Q,L","swab","red","UTM","Viral transport medium with swab. Confirm required medium, temperature and acceptance.","cedars:utm",""],["aptima-swab","Aptima transport kit","Swabs & kits","Q,L","swab","pink","APTIMA","Aptima collection kit for selected STI/NAAT tests. Use test-specific swab/urine kit.","cedars:aptima",""],["affirm","Affirm / ATTS kit","Swabs & kits","Q,L","swab","white","AFFIRM","BD Affirm ambient temperature transport system for indicated vaginitis tests.","cedars:affirm",""],["cobas-swab","cobas PCR swab kit","Swabs & kits","Q,L","swab","yellow","COBAS","Test-specific cobas swab PCR collection tube and kit.","cedars:cobasSwab",""],["cedars-three","Cedars three-vial Para-Pak stool kit","Stool","C","three","mixed","3 VIALS","Illustrated as orange C&S, pink 10% formalin and white clean vials. Kit combinations and closure colors vary. Follow the current Cedars kit labels and ordered workflow.","cedars:parapak",""],["cedars-adult","Cedars adult blood culture set","Blood cultures","C","bloodpair","mixed","AER / ANA","Adult aerobic and anaerobic bottles. Confirm the approved bottle types, draw volume and order of collection.","cedars:adult",""],["cedars-peds","Cedars pediatric blood culture","Blood cultures","C","bloodbottle","pink","PEDS","Pediatric culture bottle(s). Confirm count and draw volume with Cedars protocol for the patient.","cedars:peds",""],["cedars-fungal","Cedars fungal / mycobacterial blood culture","Blood cultures","C","bloodbottle","red","MYCO","Specialized Myco/F Lytic bottle where ordered; not an adult routine culture bottle.","cedars:fungal",""],["cedars-eswab","Cedars white-top eSwab","Swabs & kits","C","swab","white","eSwab","Cedars swab-based culture reference; verify specimen source and test.","cedars:eswab",""],["cedars-utm","Cedars red-top UTM","Swabs & kits","C","swab","red","UTM","Cedars viral/swab transport reference. Follow current test-specific instructions.","cedars:utm",""],["cedars-cobas","Cedars cobas PCR swab","Swabs & kits","C","swab","yellow","COBAS","Cedars cobas swab kit when test requires it.","cedars:cobasSwab",""],["cedars-affirm","Cedars Affirm / ATTS","Swabs & kits","C","swab","white","AFFIRM","Cedars vaginitis test transport kit, according to ordered assay.","cedars:affirm",""]];
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
 // Device-specific, scale-conscious SVG reference silhouettes. These are illustrations,
 // not substitutes for the product label or the receiving lab's collection instructions.
 const id=E(item.id),c=COLORS[item.color]||'#9caeba',kind=item.kind;
 const S=(v)=>E(v), R=(x,y,w,h,fill,rx=0,stroke='none',sw=1)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
 const P=(d,fill,stroke='none',sw=1)=>'<path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>';
 const L=(x,y,x2,y2,color='#8da4af',width=1)=>'<path d="M'+x+' '+y+'L'+x2+' '+y2+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"/>';
 const T=(x,y,word,size=9,color='#405967',weight=700)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,Helvetica,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'" text-anchor="middle">'+S(word)+'</text>';
 const ELL=(cx,cy,rx,ry,fill,stroke='none')=>'<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" stroke="'+stroke+'"/>';
 const glass='url(#lcr-glass-'+id+')',amber='url(#lcr-amber-'+id+')';
 const barcode=(x,y,w=24)=>{
  let z='';let px=x;
  for(const width of [1,2,1,1,3,1,2,1,1,2,2,1,1,3,1,2]){
   if(px+width>x+w)break;
   z+=R(px,y,width,12,'#738b97',0,'none',0);px+=width+1;
  }return z;
 };
 const ribs=(x,y,w,h)=>{let z='';for(let k=x+5;k<x+w-3;k+=6)z+=L(k,y+4,k,y+h-4,'#fff',.8);return z;};
 const cap=(x,y,w,h,color,variant='solid')=>{
  let z=R(x,y,w,h,color,4,'#728b96',1.3)+R(x+2,y+2,w-4,3,'#fff',2,'none',0)+ribs(x,y,w,h);
  if(variant==='tiger'){
   z+=R(x,y,w,h,'url(#lcr-tiger-'+id+')',4,'#71838f',1.2)+ribs(x,y,w,h);
  }else if(variant==='swirl'){
   z+=P('M'+x+' '+(y+4)+'l10 -3 16 '+(h-3)+'h-9Z','#c7333e')+
      P('M'+(x+28)+' '+(y+1)+'h9l'+(w-25)+' '+(h-3)+'h-9Z','#bb2439');
  }
  return z+R(x+3,y+h-1,w-6,3,'#6e8794',1);
 };
 const paper=(x,y,w,h,title,sub,accent,small=false)=>{
  const sz=small?7:8.5;
  return R(x,y,w,h,'#fff',2,'#c8d7df',.9)+R(x+2,y+3,4,h-6,accent,1)+
    T(x+w/2+1,y+13,title,sz,'#415c6d')+
    (sub?T(x+w/2+1,y+25,sub,6.1,'#66808e',600):'')+
    barcode(x+w/2-13,y+h-15,26);
 };
 function vacutainer(col,title,sub,opts={}){
  const x=109,y=7,w=42,bottom=137;
  let v=P('M'+x+' 29H'+(x+w)+'V117Q'+(x+w)+' '+bottom+' '+(x+w/2)+' '+bottom+'Q'+x+' '+bottom+' '+x+' 117Z',
       glass,'#86a0ad',1.6);
  v+=R(x+3,109,w-6,10,opts.gel?'#e4ce86':'#e3edf0',2,'none',0);
  if(opts.gel)v+=ELL(x+w/2,122,w/2-5,4,'#dcc67a');
  v+=L(x+4,36,x+4,120,'#fff',2);
  v+=cap(x-4,y,w+8,25,col,opts.pattern||'solid');
  v+=paper(x+4,53,w-8,52,title,sub,opts.stripe||col,true);
  if(opts.highVolume)v+=T(130,144,'7.5 mL',7.4,'#8295a0',600);
  return v;
 }
 function urineTube(col,title,preservative=false){
  const x=103,w=54,y=9;
  let v=preservative
   ? P('M'+x+' 33H'+(x+w)+'V109L138 139Q130 145 122 139L'+x+' 109Z',glass,'#8ca4b0',1.6)
   : P('M'+x+' 33H'+(x+w)+'V121Q'+(x+w)+' 142 130 142Q'+x+' 142 '+x+' 121Z',glass,'#8ca4b0',1.6);
  v+=preservative
   ? P('M107 108H153L132 132Q130 134 128 132Z','#f2de9f')
   : ELL(130,129,22,9,'#f2e4b4');
  v+=cap(x-3,y,w+6,25,col,preservative?'swirl':'solid');
  v+=R(111,55,38,45,'#fff',2,'#cad9e1')+
      T(130,69,title,8.1)+T(130,80,preservative?'PRESERVED':'CULTURE',6.8,'#748793')+
      L(108,108,152,108,'#be6f56',1.7)+T(130,105,'FILL',6,'#a36f62');
  return v;
 }
 function transport(){
  // Screw-cap aliquot vessels are distinct from evacuated Vacutainers and 50 mL conicals.
  const label=item.id==='serum-transfer'?'SERUM':'PLASMA';
  return P('M105 38H155V119Q155 138 130 138Q105 138 105 119Z',glass,'#8da5b0',1.6)+
   cap(101,16,58,25,c)+
   R(111,69,38,42,'#fff',2,'#d2dfe4')+
   T(130,87,label,9)+T(130,100,'ALIQUOT',6.5,'#6c8190',600)+
   L(110,50,110,122,'#fff',2)+
   [0,1,2,3].map((_,i)=>L(147,111+i*5,151,111+i*5,'#90a5b0',.9)).join('');
 }
 function cryo(){
  let z=R(103,57,54,74,glass,7,'#8ba4b0',1.5)+
    R(102,29,56,34,c,6,'#657f8c',1.6)+ribs(102,29,56,34)+
    R(110,76,40,36,'#fff',2,'#d4dfe5')+T(130,90,'FROZEN',8)+T(130,101,'PLASMA',6)+
    R(112,113,36,6,'#d8d1e6',1);
  return z;
 }
 function microtainer(){
  const isAmber=item.id==='microtainer-sst';
  return R(106,36,48,93,isAmber?amber:glass,6,'#8ba0a9',1.5)+
    R(100,22,60,24,c,3,'#738995',1.4)+ribs(100,22,60,24)+
    R(108,69,44,43,isAmber?'#d7b878':'#fff',2,'#c6d6dc')+
    T(130,82,'BD',7.5)+T(130,94,'MICRO',9.5)+T(130,105,item.label,8)+
    L(110,52,110,127,'#fff',1.9);
 }
 function stoolVial(x,topColor,title,subtitle,w=47){
  const center=x+w/2;
  let v=R(x,43,w,91,glass,6,'#8ca5af',1.6)+
    R(x-4,22,w+8,26,topColor,5,'#8b9aa2',1.2)+ribs(x-4,22,w+8,26)+
    R(x+4,68,w-8,51,'#fff',2,'#cbd7dc')+
    R(x+5,91,w-10,4,'#c85150',1)+
    T(center,79,'Para-Pak',7.5,'#334a57')+
    T(center,90,title,7.7,'#455e6c')+
    T(center,108,subtitle,6,'#627d89',600)+
    L(x+8,59,x+w-8,59,'#b9cad1',1.1)+
    L(x+5,124,x+w-5,124,'#c2d0d7',1);
  return v;
 }
 function bactec(x,capColor,label,bandColor='#bdd2e0',size=63){
  const center=x+size/2,bodyY=64,shoulder=61;
  let z=P('M'+(center-12)+' 39V48C'+(center-17)+' 54 '+(x+1)+' 61 '+x+' 75V122Q'+x+' 134 '+(x+12)+' 134H'+(x+size-12)+'Q'+(x+size)+' 134 '+(x+size)+' 122V75C'+(x+size-1)+' 61 '+(center+17)+' 54 '+(center+12)+' 48V39Z',glass,'#8fa4ad',1.6)+
    R(center-17,19,34,22,capColor,4,'#7e9199',1.4)+
    R(center-14,15,28,8,'#f1f4f5',4,'#82939b',1.1)+
    R(x+4,83,size-8,37,'#fff',2,'#d1dfe4')+
    R(x+5,106,size-10,13,bandColor,1)+
    T(center,95,'BD BACTEC',8.3,'#3e5868')+
    T(center,115,label,8,bandColor==='#8d315e'?'#fff':'#315466')+
    barcode(center-18,96,36)+
    ELL(center,127,size/2-7,5,'#b9a78c')+
    L(x+7,75,x+7,128,'#fff',2);
  return z;
 }
 function swabTransport(){
  const cobas=item.id==='cobas-swab',utm=item.id==='utm'||item.id==='cedars-utm';
  const x=91;
  let z=P('M'+x+' 38H132V123Q132 138 111.5 138Q'+x+' 138 '+x+' 123Z',glass,'#90a6b0',1.6)+
    cap(x-3,15,47,27,c)+
    R(95,71,33,44,'#fff',2,'#d4e0e5')+
    T(111.5,84,cobas?'cobas':utm?'UTM':item.id==='aptima-swab'?'APTIMA':'eSwab',7.6)+
    T(111.5,95,cobas?'PCR':utm?'VIRAL':item.id==='aptima-swab'?'NAAT':'AMIES',7)+
    L(97,52,97,126,'#fff',2);
  z+=L(170,44,170,129,utm?'#84a5bd':'#9bafb8',3)+
    ELL(170,35,6.5,13,utm?'#fbf5f0':'#fff','#a9b9be')+
    T(170,145,'SWAB',7,'#8299a8',600);
  if(cobas)z+=R(86,11,54,5,'#f1d234',2);
  return z;
 }
 function cobasUrine(){
  let z=swabTransport();
  // Urine cobas uses a transfer pipette, not a swab.
  z=z.slice(0,z.indexOf(L(170,44,170,129)));
  return z+ELL(179,41,9,14,'#edf5f8','#a9bdc6')+
    P('M174 52H184L182 110L179 135L176 110Z','#f3f9fa','#a9bdc6',1.2)+
    L(179,55,179,123,'#fff',1.5)+T(179,145,'PIPETTE',7,'#8198a8',600);
 }
 function uriSponge(){
  let v=R(51,38,61,98,glass,5,'#91a9b4',1.5)+R(57,73,49,42,'#fff',2,'#cfdee3')+
    T(81,87,'Copan',9)+T(81,101,'UriSponge',7.2,'#486a87')+
    L(57,43,57,128,'#fff',2);
  // Yellow screw cap, stem and two separate cylindrical absorbent sponges.
  v+=R(165,106,49,23,'#f4cf2d',5,'#bc9e27',1.2)+ribs(165,106,49,23)+
    R(187,46,5,60,'#f0c52d',2)+
    R(178,24,10,38,'#e6d6aa',3,'#c5b88c',1)+
    R(190,24,10,38,'#e6d6aa',3,'#c5b88c',1)+
    ELL(183,24,5,3,'#f5e5c4')+ELL(195,24,5,3,'#f5e5c4')+
    T(188,144,'INTEGRATED CAP',6.7,'#8197a5',600);
  return v;
 }
 function conical(){
  return P('M108 44H152V112L134 138Q130 142 126 138L108 112Z',glass,'#829eaa',1.7)+
    cap(105,20,50,25,c)+
    R(112,67,36,34,'#fff',2,'#cbdce2')+
    T(130,81,'STERILE',7.5)+T(130,92,'50 mL',8.5)+
    [0,1,2,3,4].map((_,i)=>L(113,103+i*5,122+(i%2)*4,103+i*5,'#879eaa',1)).join('');
 }
 function cup(){
  return P('M69 52H191L179 125Q178 138 164 138H96Q82 138 81 125Z',glass,'#8fa5ae',1.6)+
    R(65,39,130,19,c,6,'#91a0a8',1.4)+
    [0,1,2,3,4,5,6,7,8,9].map((_,i)=>L(72+i*13,43,72+i*13,55,'#fff',1)).join('')+
    R(91,83,80,37,'#fff',3,'#d3e0e5')+
    T(131,100,item.label,11)+T(131,111,'SPECIMEN',7,'#6b8594');
 }
 function jug(){
  return P('M80 48Q80 43 87 43H173Q180 43 180 50V123Q180 134 169 134H91Q80 134 80 123Z',glass,'#91a8b1',1.8)+
    P('M180 58H201Q209 58 209 67V96Q209 104 200 104H180V91H196V72H180Z',glass,'#91a8b1',1.7)+
    R(93,26,69,24,c,4,'#859ba5',1.4)+ribs(93,26,69,24)+
    R(97,77,67,40,'#fff',3,'#d3dee5')+T(130,96,item.label,12)+T(130,108,'URINE',7);
 }
 function affirm(){
  return R(25,58,103,54,'#e4f1f6',5,'#abc4cc',1.4)+
    R(32,67,89,36,'#fff',2,'#c8dfe8')+T(75,83,'BD AFFIRM',10)+T(75,94,'ATTS',8)+
    P('M170 37H207V125Q207 135 188.5 135Q170 135 170 125Z',glass,'#91a8b2',1.5)+
    cap(166,21,45,22,'#f5f4ef')+
    R(175,71,27,37,'#fff',2,'#cddce2')+T(188,92,'ATTS',7);
 }
 let out='';
 if(kind==='bloodpair')out=bactec(42,'#8763a8','ANA','#bcabd2',61)+bactec(158,'#448ab8','AERO','#b4dbed',61);
 else if(kind==='bloodbottle')out=bactec(97,item.id==='cedars-fungal'?'#7e2a4b':c,item.id==='cedars-fungal'?'MYCO/F':item.label,item.id==='cedars-fungal'?'#8d315e':'#deb3c2',66);
 else if(kind==='three')out=stoolVial(31,'#ed9c36','C&S','CULTURE')+stoolVial(107,'#d68ea9','10%','FORMALIN')+stoolVial(183,'#e8eaec','CLEAN','NO MEDIA');
 else if(kind==='stool'){
  const isTotal=item.id==='totalfix';
  const title=isTotal?'TOTAL-FIX':item.id==='stool-cary'||item.id==='stool-pcr'?'C&S':item.id==='para-formalin'?'10%':item.id==='para-pva'?'PVA':item.label;
  const sub=isTotal?'O&P':item.id==='stool-clean'?'NO MEDIA':item.id==='para-formalin'?'FORMALIN':'TRANSPORT';
  out=stoolVial(101,c,title,sub,58);
 }else if(kind==='cup')out=cup();
 else if(kind==='jug')out=jug();
 else if(kind==='urisponge')out=uriSponge();
 else if(kind==='swab')out=item.id==='cobas-urine'?cobasUrine():item.id==='affirm'||item.id==='cedars-affirm'?affirm():swabTransport();
 else if(kind==='micro')out=item.id==='frozen-transfer'?cryo():microtainer();
 else if(kind==='conical')out=conical();
 else if(item.id==='ua-yellow')out=urineTube('#f0ce38','UA',true);
 else if(item.id==='urine-gray')out=urineTube('#9ba3ad','URINE CULTURE');
 else if(item.id==='gold-sst')out=vacutainer(c,'SST','GEL', {gel:true,stripe:'#c79d28'});
 else if(item.id==='tiger-sst')out=vacutainer('#c95840','SST','GEL', {gel:true,pattern:'tiger',highVolume:true,stripe:'#d2a62f'});
 else if(item.id==='royalblue-edta')out=vacutainer('#2850a2','TRACE','EDTA',{stripe:'#9d75b4'});
 else if(item.id==='royalblue-serum')out=vacutainer('#2850a2','TRACE','SERUM',{stripe:'#d14a58'});
 else if(item.id==='serum-transfer'||item.id==='plasma-transfer')out=transport();
 else if(item.id==='amber-protect'){
  // Light-shielding is a colored vessel or sleeve, not just an amber closure.
  out=R(108,31,44,105,amber,12,'#92744f',1.5)+cap(104,8,52,25,'#9f6c38')+
    R(112,66,36,48,'#fff4',2,'#cfb184')+T(130,84,'LIGHT',8,'#593c27')+
    T(130,96,'PROTECT',7.4,'#593c27')+L(113,39,113,119,'#ffe3a8',1.7);
 }
 else if(item.id==='acidwash-urine')out=cup();
 else if(item.category==='Blood tubes')out=vacutainer(c,item.label.length>9?item.label.slice(0,9):item.label,
    item.id==='gray-fluoride'?'NaF / K-OX':item.id==='lightblue-citrate'?'Na CITRATE':item.id==='green-lithium'?'LITHIUM':item.id==='sodium-heparin'?'SODIUM':item.id==='acd-yellow'?'ACD':'COLLECTION',
    {stripe:c});
 else out=conical();
 const svgTop='<svg class="lcr-svg" viewBox="0 0 260 150" role="img" aria-label="Illustration of '+E(item.name)+'" xmlns="http://www.w3.org/2000/svg">'+
  '<defs><linearGradient id="lcr-glass-'+id+'" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".94"/><stop offset=".26" stop-color="#dce8ed" stop-opacity=".71"/><stop offset=".72" stop-color="#fafdff"/><stop offset="1" stop-color="#d3e0e7" stop-opacity=".8"/></linearGradient>'+
  '<linearGradient id="lcr-amber-'+id+'" x1="0" x2="1"><stop stop-color="#eec76c"/><stop offset=".56" stop-color="#b77239"/><stop offset="1" stop-color="#e8a85b"/></linearGradient>'+
  '<pattern id="lcr-tiger-'+id+'" width="23" height="23" patternUnits="userSpaceOnUse" patternTransform="rotate(27)"><rect width="23" height="23" fill="#c85442"/><rect width="11" height="23" fill="#34373b"/></pattern></defs>';
 return svgTop+ELL(130,143,83,3,'#e4edf1')+out+T(130,148,'NOT TO SCALE',6.4,'#9baab3',600)+'</svg>';
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