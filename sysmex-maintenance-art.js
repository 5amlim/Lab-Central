/* pocH-100i maintenance illustrations referenced against Sysmex IFU.
   https://www.manualslib.com/manual/1918861/Sysmex-Poch-100i.html
   Distinct device and accessory silhouettes. Not exact instrument screenshots. */
(function(){
 "use strict";
 const art=window.LAB_EQUIPMENT_ART;
 if(!art)return;
 const E=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
 const T=(x,y,v,size=16,color="#345e75",weight=750,anchor="middle")=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" fill="'+color+'" text-anchor="'+anchor+'">'+E(v)+'</text>';
 const S=(markup,title)=>'<svg viewBox="0 0 980 460" role="img" aria-label="'+E(title)+'" xmlns="http://www.w3.org/2000/svg">'+markup+'</svg>';
 function analyzer(mode){
  let head=mode==="shutdown"?"MAIN · Ready":mode==="transducer"?"MAINT. · Clean Transducer":mode==="other"?"MAINTENANCE":mode==="waste"?"Discard waste":mode==="reagent"?"Replace Reagent":"MAIN";
  const choices=mode==="shutdown"?["QC","Result","Shutdown"]:
   mode==="transducer"?["Set CELLCLEAN in sample position","Execute","Cancel"]:
   mode==="other"?["Clean waste chamber","Auto Rinse","Clog Removal"]:
   mode==="waste"?["Check waste bottle connection","Execute","Cancel"]:
   mode==="reagent"?["pocH-pack D / L","Scan reagent barcode","Execute"]:["Main","QC","Result"];
  const selected=mode==="shutdown"?"Shutdown":mode==="transducer"?"Execute":mode==="other"?"Clean waste chamber":mode==="waste"?"Execute":"Scan reagent barcode";
  let m='<ellipse cx="329" cy="429" rx="230" ry="15" fill="#d9e4e9" opacity=".75"/>'+
    '<path d="M148 75Q148 45 177 34L190 29H485Q506 29 516 51L531 78V375Q531 410 493 418H180Q146 413 146 379Z" fill="#eef2f3" stroke="#92a8b4" stroke-width="5"/>'+
    '<path d="M486 31Q509 34 520 63L531 80V375Q531 399 495 413L491 411V77Z" fill="#c4d2d9" stroke="#91a7b4" stroke-width="3"/>'+
    '<path d="M170 63L185 48H471L481 61V230H171Z" fill="#f7f9fa"/>'+
    '<rect x="179" y="72" width="286" height="176" rx="9" fill="#cad7df" stroke="#8ea4b1" stroke-width="5"/>'+
    '<rect x="193" y="86" width="259" height="147" rx="5" fill="#eef7fa"/>'+
    '<rect x="193" y="86" width="259" height="30" rx="4" fill="#e4ecf2"/>'+
    T(207,105,"Sysmex",13,"#2c98b0",850,"start")+
    T(436,105,mode==="shutdown"?"Ready":"Not Ready",11,mode==="shutdown"?"#318c67":"#b76c49",850,"end")+
    '<rect x="199" y="123" width="247" height="25" rx="3" fill="#d7e8f0"/>'+
    T(323,141,head,15,"#315c72",850)+
    choices.map((v,i)=>{
      const y=155+i*25,sel=v===selected;
      return '<rect x="204" y="'+y+'" width="238" height="22" rx="5" fill="'+(sel?"#ccefe8":"#f9fcfd")+'" stroke="'+(sel?"#178676":"#b7ced9")+'" stroke-width="'+(sel?2.5:1)+'"/>'+
       T(323,y+15,v,v.length>25?9.5:12,sel?"#17695c":"#4d6d7f",sel?900:720);
    }).join("")+
    '<path d="M172 250H462" stroke="#c1cbd0" stroke-width="3"/>'+
    '<path d="M203 264L278 264" stroke="#277eab" stroke-width="5" stroke-linecap="round"/>'+
    T(240,284,"SYSMEX",18,"#2b7891",900)+
    T(244,298,"pocH-100i",14,"#677984",800)+
    '<rect x="330" y="255" width="132" height="157" rx="19" fill="#293943" stroke="#91a7b4" stroke-width="5"/>'+
    '<rect x="347" y="278" width="102" height="49" rx="9" fill="#182b35"/>'+
    '<rect x="360" y="330" width="77" height="58" rx="8" fill="#1f313d" stroke="#526773" stroke-width="3"/>'+
    '<ellipse cx="399" cy="358" rx="27" ry="15" fill="#0c202c" stroke="#647e8a" stroke-width="3"/>'+
    '<rect x="209" y="329" width="91" height="60" rx="7" fill="#edf1f2" stroke="#c3cdd2" stroke-width="2"/>'+
    '<path d="M218 350H290" stroke="#c1cbd1" stroke-width="3"/>'+
    '<path d="M245 392H286" stroke="#b9c8cf" stroke-width="3"/>'+
    '<circle cx="493" cy="264" r="8" fill="#dcecf3" stroke="#81a3b3" stroke-width="3"/><path d="M163 68Q171 47 192 47H471" fill="none" stroke="#fff" stroke-width="7" opacity=".75"/><path d="M481 41V405" fill="none" stroke="#a8bec8" stroke-width="2"/><rect x="167" y="409" width="31" height="10" rx="3" fill="#647783"/><rect x="465" y="409" width="30" height="10" rx="3" fill="#647783"/><path d="M174 252H325" stroke="#dae4e8" stroke-width="3"/>'+
    T(328,442,"pocH-100i · actual front geometry (schematic)",13,"#678699");
  return m;
 }
 function cellclean(){
  return '<ellipse cx="787" cy="410" rx="139" ry="12" fill="#e0e9ef"/>'+
   '<path d="M676 102H898L890 407H688Z" fill="#eaf6f8" stroke="#aec8d4" stroke-width="4" opacity=".65"/>'+
   '<rect x="716" y="125" width="144" height="264" rx="22" fill="#f4fbfd" stroke="#88adbe" stroke-width="5"/>'+
   '<path d="M724 292H852V354Q847 384 794 384H785Q735 380 724 354Z" fill="#eef5eb" opacity=".86"/>'+
   '<ellipse cx="788" cy="125" rx="72" ry="15" fill="#e6f1f5" stroke="#80a6b8" stroke-width="4"/>'+
   '<rect x="734" y="183" width="108" height="91" rx="5" fill="#fff" stroke="#d7e5eb"/>'+
   T(788,204,"CELLCLEAN",16,"#31667a",900)+T(788,229,"3 mL",24,"#288b91",900)+
   T(788,252,"SAMPLE TUBE",10,"#5d8192")+
   '<rect x="677" y="375" width="219" height="24" rx="9" fill="#d9e9ed" stroke="#99b7c6" stroke-width="3"/>'+
   T(788,445,"Open tube in approved sample adapter",12,"#628194");
 }
 function waste(){
   return '<ellipse cx="789" cy="418" rx="135" ry="13" fill="#dce7ec"/>'+
     '<path d="M677 131L700 119H875L900 131V381Q894 408 877 410H702Q680 408 677 388Z" fill="#edf8fb" fill-opacity=".84" stroke="#98b5c4" stroke-width="5"/>'+
     '<path d="M688 276H890V388Q886 400 871 402H710Q692 400 688 387Z" fill="#d6b9ad" opacity=".35"/>'+
     '<path d="M698 125V112Q700 99 711 98H867Q879 100 879 112V130" fill="#f0f7f9" stroke="#9ab9c6" stroke-width="4"/>'+
     '<rect x="725" y="92" width="133" height="25" rx="9" fill="#deeff3" stroke="#95b6c7" stroke-width="3"/>'+
     '<rect x="741" y="69" width="38" height="28" rx="8" fill="#c34d58" stroke="#a44854" stroke-width="3"/>'+
     '<path d="M760 69L760 43C761 25 746 23 724 25L518 27" stroke="#db716f" stroke-width="9" fill="none" stroke-linecap="round"/>'+
     '<path d="M760 68L760 44C761 24 746 21 724 23L518 25" stroke="#ffe3d4" stroke-width="3" fill="none"/>'+
     '<path d="M825 90V335" stroke="#829da8" stroke-width="9" stroke-linecap="round"/>'+
     '<rect x="810" y="329" width="30" height="51" rx="12" fill="#bbc7ce" stroke="#7f9eac" stroke-width="3"/>'+
     '<rect x="715" y="200" width="147" height="82" rx="7" fill="#fff" stroke="#cddde6"/>'+
     T(787,229,"WASTE",20,"#9e4958",900)+T(787,251,"BOTTLE",18,"#9e4958",900)+
     T(787,269,"FLOAT SWITCH",11,"#648092")+
     T(817,440,"Outlet tubing connects to analyzer rear",12,"#557b91");
 }
 function packs(){
   let m='<ellipse cx="760" cy="422" rx="205" ry="12" fill="#dae6ed"/>'+
    '<path d="M579 175L613 148H743L763 169V407H579Z" fill="#b8946e" stroke="#8f775b" stroke-width="4"/>'+
    '<path d="M743 148L768 166V400L744 407Z" fill="#a68a6d" stroke="#8f755e" stroke-width="2"/>'+
    '<rect x="598" y="222" width="143" height="100" rx="4" fill="#d2b599" stroke="#a78765"/>'+
    '<rect x="606" y="240" width="130" height="48" fill="#5c96ba"/>'+
    T(670,260,"pocH-pack D",15,"#fff",900)+
    T(670,278,"DILUENT · 2 L",11,"#fff",750)+
    '<path d="M602 150H735" stroke="#efe6d3" stroke-width="8"/>'+
    '<rect x="811" y="200" width="112" height="207" rx="17" fill="#e9f3f5" stroke="#a0b9c4" stroke-width="4"/>'+
    '<rect x="829" y="176" width="75" height="42" rx="12" fill="#f4f7f8" stroke="#a9b6bf" stroke-width="3"/>'+
    '<rect x="823" y="253" width="87" height="96" rx="3" fill="#fff" stroke="#d3e1e6"/>'+
    '<rect x="823" y="264" width="87" height="24" fill="#7c5b9b"/>'+
    T(866,280,"pocH-pack L",12,"#fff",850)+
    T(866,311,"LYSE",17,"#635584",900)+
    T(866,335,"250 mL",12,"#5c7486")+
    T(671,440,"DILUENT",12,"#6b7f8d")+T(869,440,"LYSING REAGENT",12,"#6b7f8d");
   return m;
 }
 function scanner(){
   return '<path d="M628 77L704 77L714 125L681 142L663 189L627 177L650 129L627 103Z" fill="#333e48" stroke="#8298a7" stroke-width="4"/>'+
    '<rect x="637" y="88" width="62" height="29" rx="6" fill="#739aa9"/>'+
    '<path d="M681 177Q704 197 735 178" stroke="#698398" stroke-width="5" fill="none"/>'+
    '<path d="M711 130L758 185" stroke="#e86d65" stroke-width="2.5" stroke-dasharray="6 5"/>'+
    T(752,69,"HANDHELD",13,"#356d83")+T(752,85,"BARCODE SCANNER",13,"#356d83")+
    '<rect x="735" y="190" width="82" height="39" rx="5" fill="#fff" stroke="#aebfc8"/>'+
    Array.from({length:13},(_,i)=>'<path d="M'+(742+i*5)+' 198v22" stroke="#293a45" stroke-width="'+(i%3+1)+'"/>').join('');
 }
 function media(mode){
  let content=analyzer(mode);
  if(mode==="transducer")content+=cellclean();
  if(mode==="waste")content+=waste();
  if(mode==="reagent")content+=packs()+scanner();
  if(mode==="other")content+='<rect x="643" y="143" width="296" height="165" rx="15" fill="#f1f8fa" stroke="#bed6de"/>'+
   T(791,181,"MAINTENANCE",18,"#2b6c82",900)+
   T(791,221,"Clean waste chamber",15,"#5b788a")+
   T(791,251,"Auto rinse",15,"#5b788a")+
   T(791,281,"Clog removal",15,"#5b788a");
  if(mode==="shutdown")content+='<rect x="618" y="146" width="308" height="155" rx="15" fill="#f2f8fa" stroke="#bdd4df" stroke-width="3"/>'+
   T(772,179,"DAILY SHUTDOWN",20,"#2d6d84",900)+
   T(772,213,"Main screen → Shutdown",16,"#4f7388")+
   T(772,242,"Select Execute",16,"#4f7388")+
   T(772,270,"Wait until complete, then OFF",14,"#5e8091");
  return S(content,'Sysmex pocH-100i maintenance: '+mode+
    (mode==='waste'?' external waste bottle, red waste spout and float switch':mode==='reagent'?' pack D diluent, pack L lyse and barcode scanner':''));
 }
 function scene(title,visual,desc){
  return '<figure class="lab-step-scene sysmex-maint-scene"><div class="lab-step-scene-media">'+visual+
   '</div><figcaption><strong>'+E(title)+'</strong><span>'+E(desc)+'</span></figcaption></figure>';
 }
 function step(mode){
  if(mode==='shutdown')return scene('Shutdown is an analyzer command',media(mode),'On the Main screen, select Shutdown, then Execute. Wait for the completion prompt before switching OFF. No blood tube is involved.');
  if(mode==='transducer')return scene('CELLCLEAN and sample adapter',media(mode),'Use 3 mL of approved CELLCLEAN in a clean sample tube. Place in the sample adapter, close the compartment and choose Execute. Remove after the completed cycle.');
  if(mode==='other')return scene('Select the maintenance task on the instrument',media(mode),'Follow the specific Clean Waste Chamber, Auto Rinse or Clog Removal prompt and its manufacturer procedure. These are separate maintenance tasks.');
  if(mode==='waste')return scene('Waste bottle, red waste line and float switch',media(mode),'Empty the waste bottle into the designated lab sink, then follow with bleach according to the approved local waste-handling SOP. Refit the float switch and cap, reconnect without kinking tubing, and confirm no leaks.');
  if(mode==='reagent')return scene('pocH-pack D · diluent / pocH-pack L · lyse',media(mode),'D is the larger diluent container; L is the smaller purple-labeled lyse bottle. Transfer the matching spout kit without contaminating the tubing and enter or scan the new reagent barcode when prompted.');
  return '';
 }
 const before=art.workflowVisual;
 art.workflowVisual=function(sec,title,group){
   if(sec&&sec.id==='sysmex'&&/cleaning|maintenance/i.test(group||'')){
     const t=String(title||'').toLowerCase();
     const mode=/shutdown/.test(t)?'shutdown':/transducer/.test(t)?'transducer':
       /other cleaning|prompts/.test(t)?'other':/waste bottle|dispose waste/.test(t)?'waste':
       /reagent change|pack-d|pack-l/.test(t)?'reagent':null;
     if(mode)return step(mode);
   }
   return before(sec,title,group);
 };
 const priorInline=art.inlineKitVisual;
 art.inlineKitVisual=function(sec,title,depth,root){
  if(sec&&sec.id==='sysmex'&&/cleaning|maintenance/i.test(String(root||'')))return '';
  return priorInline(sec,title,depth,root);
 };
 const priorStep=art.stepIllustration;
 art.stepIllustration=function(sec,title,group){
  if(sec&&sec.id==='sysmex'&&/cleaning|maintenance/i.test(String(group||''))){
   return art.workflowVisual(sec,title,group)||scene('Analyzer maintenance',media('other'),'Follow the task-specific procedure on the actual instrument.');
  }
  return priorStep(sec,title,group);
 };
 window.LAB_SYSMEX_MAINTENANCE={media,step};
})();