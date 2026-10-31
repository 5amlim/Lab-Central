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
 const shared=art.sysmexDeviceMarkup;
 if(typeof shared!=="function")return "";
 // Maintenance pictures keep the larger task-specific object at right.
 // Do not repeat the reagent bottle when illustrating waste, CELLCLEAN,
 // replacement packs, or a barcode scanner beside the main analyzer.
 const m=mode==="shutdown"?"shutdown":mode==="reagent"?"reagent":
  mode==="transducer"?"transducer":mode==="waste"?"waste":
  mode==="other"?"other":"ready";
 return '<g transform="translate(38 0) scale(.90)">'+shared(m,false)+'</g>'+
 T(300,443,"SYSMEX pocH-100i · illustrated front view",13,"#648093");
}
function cellclean(){
 // The user-supplied CELL CLEAN AUTO product is a factory-filled 4mL vial, not a bottle or carton.
 // For pocH-100i the documented cleaning step still calls for 3mL in an approved sample tube.
 return '<ellipse cx="785" cy="414" rx="172" ry="12" fill="#dce8ec"/>'+
  '<rect x="644" y="149" width="281" height="115" rx="14" fill="#f5f8f8" stroke="#d1dee2" stroke-width="2"/>'+
  '<rect x="666" y="173" width="235" height="38" rx="17" fill="#fbfcfc" stroke="#aec0c9" stroke-width="3"/>'+
  '<path d="M893 176H919Q927 176 927 182V201Q927 207 919 207H893Z" fill="#f6f8f8" stroke="#aec0c9" stroke-width="2"/>'+
  '<rect x="708" y="178" width="175" height="29" rx="2" fill="#fff" stroke="#b9c8cc"/>'+
  '<rect x="708" y="178" width="30" height="29" fill="#242d31"/>'+
  T(723,198,"CL",19,"#fff",900)+T(745,188,"CELLCLEAN AUTO",13,"#232a2e",900,"start")+
  T(745,201,"Sysmex · 4 mL",10,"#50616b",700,"start")+
  T(789,286,"Factory-filled 4 mL vial (photo reference)",11,"#637f8c",700)+
  '<rect x="744" y="324" width="99" height="78" rx="13" fill="#d9eaf0" stroke="#8aa9b8" stroke-width="3"/>'+
  '<rect x="772" y="293" width="45" height="89" rx="11" fill="#f7fbfd" stroke="#80a3b6" stroke-width="4"/>'+
  '<path d="M777 351H811V370H777Z" fill="#e5f1e5" opacity=".9"/>'+
  '<ellipse cx="795" cy="293" rx="22" ry="6" fill="#fff" stroke="#80a3b6" stroke-width="3"/>'+
  T(795,333,"3 mL",14,"#27718a",900)+
  T(795,437,"Approved sample tube in adapter",12,"#587e8d",750);
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
  // Reference products: pocH-pack D is a 2L rectangular translucent bottle (PPD-300A),
  // while pocH-pack L is a 250mL translucent bottle with purple-label band (PPL-200A).
  const barcode=Array.from({length:17},(_,i)=>'<path d="M'+(691+i*4)+' 206v35" stroke="#354852" stroke-width="'+(i%4===0?2.6:1.3)+'"/>').join("");
  return '<ellipse cx="760" cy="424" rx="215" ry="13" fill="#dce8eb"/>'+
   '<path d="M588 175Q587 162 603 157L625 142H647V118H697V142H741Q769 144 773 170V395Q773 414 750 414H613Q586 413 586 391Z" fill="#e6eff1" stroke="#a8bdc6" stroke-width="4"/>'+
   '<path d="M597 182Q597 168 615 165H744Q759 167 761 182V392H597Z" fill="#f0f5f5" opacity=".8"/>'+
   '<rect x="642" y="109" width="56" height="23" rx="4" fill="#e9f5fb" stroke="#96aec0" stroke-width="3"/>'+
   '<rect x="643" y="101" width="54" height="13" rx="4" fill="#3f97c5"/>'+
   '<rect x="609" y="186" width="144" height="125" rx="2" fill="#fff" stroke="#c9d8de"/>'+
   '<rect x="609" y="186" width="144" height="25" fill="#5484a4"/>'+
   T(681,203,"pocH-pack D",16,"#fff",850)+
   T(681,261,"DILUENT",16,"#476b80",900)+T(681,287,"2 L · PPD-300A",12,"#557887",800)+barcode+
   T(680,438,"D · DILUENT · 2 L",12,"#5b7d8d",800)+
   '<path d="M821 290Q820 279 831 277H840V257H889V277H899Q910 281 910 291V394Q910 411 894 412H834Q820 412 820 395Z" fill="#f0f6f6" stroke="#a2b8c1" stroke-width="3.5"/>'+
   '<rect x="839" y="251" width="53" height="15" rx="4" fill="#7e5e9d" stroke="#a2b8c1" stroke-width="2"/>'+
   '<rect x="829" y="314" width="75" height="72" fill="#fff" stroke="#d1dfe4"/>'+
   '<rect x="829" y="314" width="75" height="20" fill="#7b5b99"/>'+
   T(866,328,"pocH-pack L",10,"#fff",850)+T(866,349,"LYSE",16,"#72558d",900)+
   T(866,368,"250 mL",12,"#5f7888",800)+
   T(868,438,"L · LYSE · 250 mL",12,"#5b7d8d",800);
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
  if(mode==='transducer')return scene('Verify the correct CELLCLEAN product',media(mode),'The photo supplied shows CELL CLEAN AUTO (4 mL × 20). This carton is a product-identification reference only. Follow the pocH-100i instructions for 3 mL of approved CELLCLEAN in a separate clean sample tube and sample adapter.')+
   '<aside class="guide-note urgent sysmex-cleaner-compatibility"><strong>Product compatibility:</strong> CELL CLEAN AUTO (CF-579-595) is specified by Sysmex for XN-series systems and related equipment, not the pocH-100i. Do not substitute it for the pocH-100i cleaning reagent. Confirm the correct CELLCLEAN supply with Sysmex and the approved site SOP before proceeding.</aside>';
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