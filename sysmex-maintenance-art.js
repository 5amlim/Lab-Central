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
 // Photo reference: white CELL CLEAN AUTO carton, Sysmex REF CF-579-595, 4 mL × 20.
 // This is a packaging-identification example, NOT a pocH-compatible reagent recommendation.
 const barcode=Array.from({length:25},(_,i)=>
  '<rect x="'+(735+i*3.3)+'" y="324" width="'+(i%4===0?2.6:i%3===0?1.8:1)+'" height="'+(i%5===0?35:30)+'" fill="#2f3539"/>').join("");
 return '<ellipse cx="791" cy="406" rx="152" ry="12" fill="#e0e9ed"/>'+
  '<path d="M657 131Q657 120 666 119H753Q769 120 773 107Q781 92 793 94Q805 96 816 111L830 118H914V380Q912 391 898 391H669Q656 391 656 378Z" fill="#fafbfa" stroke="#cad2d4" stroke-width="4"/>'+
  '<path d="M667 134H905" stroke="#e8eceb" stroke-width="3"/>'+
  '<path d="M656 154H911" stroke="#f0f2f1" stroke-width="2"/>'+
  '<g fill="#161b1e"><path d="M801 157l17-13 15 5-15 13Z"/><path d="M818 162l13-12 17 7-14 12Z"/></g>'+
  T(866,177,"sysmex",22,"#181c20",900)+
  '<rect x="675" y="193" width="219" height="75" fill="#fff" stroke="#202529" stroke-width="3"/>'+
  '<rect x="683" y="201" width="42" height="59" fill="#1b2024"/>'+
  T(704,237,"CL",31,"#fff",850)+
  T(737,223,"CELLCLEAN",15,"#141a1f",900,"start")+
  T(737,241,"AUTO",17,"#141a1f",900,"start")+
  '<path d="M730 247H887" stroke="#23282b" stroke-width="1.4"/>'+
  T(740,258,"SYSMEX CLEANER",9,"#333c42",650,"start")+
  '<rect x="675" y="277" width="35" height="15" fill="#fff" stroke="#3e474b" stroke-width="1.3"/>'+
  T(692,288,"REF",10,"#263038",850)+
  T(717,288,"CF-579-595",12,"#22292d",800,"start")+
  T(898,291,"4 mL × 20",13,"#252c30",800,"end")+
  T(685,320,"IVD",12,"#232a2f",800,"start")+
  T(684,358,"CE",14,"#232a2f",750,"start")+
  barcode+
  T(776,375,"CELL CLEAN AUTO",9,"#58636a",650)+
  T(792,444,"CELL CLEAN AUTO · pictured carton",12,"#647b87",650);
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