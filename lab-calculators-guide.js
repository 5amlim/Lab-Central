/* Market-aware calculator and molecular sendout directory. Matches API PT selector controls. */
(function(){
"use strict";
const E=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const markets=[
 {id:"socal",short:"SoCal",name:"Southern California",clinics:[["bh","Beverly Hills"],["bh-satellite","Beverly Hills Satellite"],["sm","Santa Monica"],["mb","Manhattan Beach"]]},
 {id:"norcal",short:"NorCal",name:"Northern California",clinics:[["sf","San Francisco"],["palo-alto","Palo Alto"]]},
 {id:"ny",short:"New York",name:"New York",clinics:[["ues","Upper East Side"],["tribeca","Tribeca"],["hamptons","Hamptons"],["fifth","5th Avenue"],["gramercy","Gramercy"],["hudson-yards","Hudson Yards"]]},
 {id:"fl",short:"Florida",name:"Florida",clinics:[["boca","Boca Raton"],["palm-beach","Palm Beach"],["coral-gables","Coral Gables"]]}
];
let activeMarket="socal";
const selectedClinics=Object.fromEntries(markets.map(m=>[m.id,m.clinics[0][0]]));
function current(){
 const market=markets.find(m=>m.id===activeMarket)||markets[0];
 const clinic=market.clinics.find(c=>c[0]===selectedClinics[market.id])||market.clinics[0];
 return {market,clinic};
}
function allows(vendor){return vendor!=="cedars"||activeMarket==="socal";}
function market(){return activeMarket;}
function count(){return availableLabs().length;}
function selector(){
 const {market:m,clinic:c}=current();
 return '<section id="calc2-site-selector" class="calc2-site-selector" aria-label="Lab calculators and guides market and clinic">'+
  '<nav class="dqc-market-picker" aria-label="Select market for lab calculators and guides"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+
   markets.map(item=>'<button type="button" class="dqc-market-choice'+(item.id===m.id?' is-selected':'')+'" data-calc2-market="'+E(item.id)+'" aria-pressed="'+(item.id===m.id)+'">'+E(item.short)+'</button>').join('')+
  '</div></nav>'+
  '<div class="dqc-location-bar"><span class="dqc-location-label" id="calc2-clinic-label">Clinic location</span>'+
  '<div class="dqc-location-picker"><button type="button" class="dqc-location-trigger" data-calc2-toggle aria-haspopup="listbox" aria-expanded="false" aria-controls="calc2-location-options" aria-labelledby="calc2-clinic-label calc2-clinic-value">'+
   '<span id="calc2-clinic-value">'+E(c[1])+'</span><span class="dqc-location-chevron" aria-hidden="true"></span></button>'+
   '<div class="dqc-location-options" id="calc2-location-options" role="listbox" aria-labelledby="calc2-clinic-label" hidden>'+
    m.clinics.map(cl=>'<button type="button" role="option" data-calc2-clinic="'+E(cl[0])+'" class="dqc-location-option'+(cl[0]===c[0]?' is-selected':'')+'" aria-selected="'+(cl[0]===c[0])+'" tabindex="-1">'+E(cl[1])+(cl[0]===c[0]?'<span class="dqc-location-check" aria-hidden="true">✓</span>':'')+'</button>').join('')+
   '</div></div><span class="dqc-location-hint">Select a clinic to view its reference tools</span></div>'+
  '<div class="dqc-market-heading"><div><span class="dqc-market-overline">LAB REFERENCE TOOLS / '+E(m.short).toUpperCase()+'</span>'+
   '<h2>'+E(c[1])+'</h2><p>'+E(m.name)+' · Confirm individual lab account activation, panels, collection kits and courier details for this clinic before sending specimens.</p></div></div>'+
 '</section>';
}
function moleculeIcon(){
 return '<svg viewBox="0 0 52 52" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">'+
 '<path d="M13 10l13 8 13-8M13 26l13 8 13-8M13 42l13-8 13 8M13 10v16m26-16v16M13 26v16m26-16v16"/>'+
 '<circle cx="13" cy="10" r="3.5" fill="#fff"/><circle cx="39" cy="10" r="3.5" fill="#fff"/>'+
 '<circle cx="26" cy="18" r="3.5" fill="#fff"/><circle cx="13" cy="26" r="3.5" fill="#fff"/>'+
 '<circle cx="39" cy="26" r="3.5" fill="#fff"/><circle cx="26" cy="34" r="3.5" fill="#fff"/>'+
 '<circle cx="13" cy="42" r="3.5" fill="#fff"/><circle cx="39" cy="42" r="3.5" fill="#fff"/></svg>';
}
function molecular(){
 if(activeMarket==="ny")return '';
 const {market:m,clinic:c}=current();
 const entries=[
  {id:"htrx",name:"HealthTrackRx",tag:"HEALTHTRACKRX",title:"Molecular testing guide",tone:"htrx",desc:"Molecular sendout specimen collection, kit selection, manifest and handoff.",tips:["Check the ordered panel, specimen source and HTRX-approved kit.","Match patient identifiers, requisition and specimen collection date/time.","Confirm the site’s current UPS or courier schedule and manifest process."]},
  {id:"pathmd",name:"PathMD",tag:"PATHMD",title:"Molecular testing guide",tone:"pathmd",desc:"Molecular test collection and routing reference. Site activation may still be pending.",tips:["Confirm the selected clinic is activated and the panel is approved.","Verify PathMD-specific collection media, requisition and kit instructions.","Use the approved PathMD pickup and tracking process, not an assumed HTRX courier."]}
 ];
 return '<section class="calc2-molecular-section" aria-labelledby="calc2-molecular-heading">'+
  '<div class="calc2-section-heading"><div><span class="calc-guide-eyebrow">SPECIALTY SENDOUTS</span><h2 id="calc2-molecular-heading">Molecular testing</h2><p>HealthTrackRx and PathMD references for '+E(m.name)+'. Check clinic-specific activation before use.</p></div><span class="calc2-category-tag">2 guides</span></div>'+
  '<div class="calculator-grid calc2-molecular-grid">'+entries.map(v=>'<article class="calculator-card calc2-molecular-card '+v.tone+'">'+
   '<div class="calculator-top"><span class="calculator-tag">'+E(v.tag)+'</span><span class="calc2-type-badge">MOLECULAR</span></div>'+
   '<div class="calculator-brand-title"><span class="calc2-molecule-icon">'+moleculeIcon()+'</span><h2>'+E(v.name)+'</h2></div>'+
   '<p>'+E(v.desc)+'</p>'+
   '<div class="calc2-clinic-note"><strong>'+E(c[1])+'</strong><span>Verify approved panels, specimen media and courier arrangements.</span></div>'+
   '<details class="calc2-guide-details"><summary>Collection &amp; sendout checkpoints <span class="calc2-detail-chevron" aria-hidden="true"></span></summary><ol>'+v.tips.map(t=>'<li>'+E(t)+'</li>').join('')+'</ol></details>'+
   '<button type="button" class="calculator-go calc2-molecular-go" data-calc2-sendout="'+E(v.id)+'">Open '+E(v.name)+' sendout guide <span aria-hidden="true">↗</span></button>'+
  '</article>').join('')+'</div>'+
  '<p class="calc2-molecular-warning">Availability is not confirmed by this directory. Never substitute collection kits, specimens or courier instructions between molecular laboratories.</p>'+
 '</section>';
}

/* Focused laboratory tabs. One lab's instructions are visible at a time. */
const labOrder={
 socal:["quest","cedars","labcorp","htrx","pathmd"],
 norcal:["quest","labcorp","htrx","pathmd"],
 fl:["quest","labcorp","htrx","pathmd"],
 ny:["quest","labcorp"]
};
const rememberedLab={socal:"quest",norcal:"quest",fl:"quest",ny:"quest"};
const names={quest:"Quest",cedars:"Cedars",labcorp:"Labcorp",htrx:"HealthTrackRx",pathmd:"PathMD"};
const labData={
 quest:{tag:"QUEST DIAGNOSTICS",title:"Quest calculator",kind:"Collection calculator",desc:"Test selection, tubes, processing and collection instructions.",steps:[
 ["Find the exact test","Search by code or name and verify the selection."],
 ["Check requirements","Confirm containers, minimum volume, handling and STAT eligibility."],
 ["Prepare the sendout","Review bag separation and save the final LAB FLOWSHEET."]]},
 cedars:{tag:"CEDARS-SINAI",title:"Cedars lab guide",kind:"Collection guide · SoCal",desc:"Cedars-specific specimen collection, container and submission guidance.",steps:[
 ["Confirm the test","Verify Cedars acceptance, specimen and requisition."],
 ["Check the container","Review the illustrated container guide and specific handling."],
 ["Confirm courier","Check the local Cedars or Apollo handoff procedure."]]},
 labcorp:{tag:"LABCORP",title:"Labcorp calculator",kind:"Collection calculator",desc:"Test-code lookup, specimen handling and sendout instructions.",steps:[
 ["Find the code","Select the exact Labcorp test from the directory."],
 ["Review processing","Confirm collection container, volume, centrifugation and temperature."],
 ["Finalize the flowsheet","Verify STAT routing and bag separation before printing."]]},
 htrx:{tag:"HEALTHTRACKRX",title:"HealthTrackRx",kind:"Molecular sendout guide",desc:"Molecular specimen collection, kit selection, manifest and handoff.",steps:[
 ["Choose the approved kit","Confirm panel eligibility and the specimen source."],
 ["Verify identifiers","Check requisition, label and collection date/time."],
 ["Arrange the shipment","Confirm HTRX-specific manifest, shipping label and site courier."]]},
 pathmd:{tag:"PATHMD",title:"PathMD",kind:"Molecular sendout guide · Trial",desc:"Molecular specimen collection and routing reference. Activation may be pending.",steps:[
 ["Confirm site approval","Verify the selected clinic and panel are activated."],
 ["Use PathMD supplies","Check collection media and requisition. Never substitute an HTRX kit."],
 ["Record the handoff","Confirm PathMD-specific courier method and tracking."]]}
};
function availableLabs(){return labOrder[activeMarket]||labOrder.socal;}
function selectedLab(){
 const options=availableLabs();
 if(!options.includes(rememberedLab[activeMarket]))rememberedLab[activeMarket]=options[0];
 return rememberedLab[activeMarket];
}
function isCalculator(){return ["quest","cedars","labcorp"].includes(selectedLab());}
function tabs(){
 const active=selectedLab(),labs=availableLabs();
 return '<div class="calc2-tab-heading"><div><span class="calc-guide-eyebrow">RECEIVING LAB</span><h2>Choose a laboratory</h2><p>Select one lab to see its tools and instructions.</p></div><span class="calc2-tab-count">'+labs.length+' labs</span></div>'+
 '<div class="calc2-tabs" role="tablist" aria-label="Receiving laboratories">'+
 labs.map(id=>'<button type="button" role="tab" id="calc2-tab-'+id+'" data-calc2-lab="'+id+'" aria-controls="calc2-lab-panel" aria-selected="'+(id===active)+'" tabindex="'+(id===active?'0':'-1')+'" class="calc2-tab calc2-tab-'+id+(id===active?' is-selected':'')+'"><span class="calc2-tab-mark" aria-hidden="true"></span>'+E(names[id])+'</button>').join('')+
 '</div>';
}
/* HTRX is intentionally restricted to the two clinic-approved transport tube types. */
function htrxTubeIllustration(color){
 const cap=color==="green"?"#479c75":"#f2f4f7";
 return '<svg viewBox="0 0 80 135" width="74" height="124" role="img" aria-label="'+(color==="green"?"Green-top molecular transport tube":"White-top molecular transport tube")+' illustration">'+
 '<rect x="22" y="22" width="36" height="98" rx="10" fill="#f7fbfe" stroke="#9cb5c2" stroke-width="2"/>'+
 '<rect x="19" y="11" width="42" height="25" rx="6" fill="'+cap+'" stroke="#93a8b5" stroke-width="2"/>'+
 '<path d="M26 76h28v33c0 9-28 9-28 0z" fill="#deedf4"/>'+
 '<rect x="25" y="49" width="30" height="36" rx="4" fill="white" stroke="#dce5eb"/>'+
 '<path d="M29 59h22M29 65h16M29 71h19" stroke="#a9b9c7" stroke-width="1.5"/>'+
 '</svg>';
}
function htrxMenu(){
 const menus=[
 ["RTI","Respiratory tract infection","White top","Nasopharynx/nares, oropharynx/throat/oral, cough sputum"],
 ["RTIPROAO","RTI - persistent add-on","White top","RTI sources; additional bacterial targets"],
 ["RTITHRAO","RTI - atypical pharyngitis","White top","Oropharynx/throat/oral only"],
 ["PHAR","Pharyngitis","White top","Oropharynx/throat/oral"],
 ["PHARRECAO","Pharyngitis - persistent add-on","White top","Oropharynx/throat/oral"],
 ["FCRSV","Flu, COVID, RSV","White top","Nasopharynx/nares"],
 ["UTI","Urinary tract infection","White top","Urine, voided or catheter, per guide"],
 ["CGGY","Chlamydia / Gonorrhea (throat/oral)","Green top","Oral/throat swab, green collection device"]
 ];
 return '<section class="calc2-htrx-menu" id="calc2-htrx-menu" aria-label="HealthTrackRx molecular test menu">'+
  '<div class="calc2-vendor-section-heading"><div><span class="calc-guide-eyebrow">HEALTHTRACKRX / MENU</span><h4>Test menu</h4><p>Selected white-top panels and the approved green-top oral/throat CG test.</p></div></div>'+
  '<label class="calc2-htrx-menu-search-label" for="calc2-htrx-search">Search by panel name, code or specimen</label>'+
  '<input id="calc2-htrx-search" data-calc2-htrx-search type="search" placeholder="Search RTI, throat, CGGY, FCRSV..." autocomplete="off">'+
  '<div class="calc2-htrx-menu-items">'+menus.map(p=>
   '<article class="calc2-htrx-menu-row" data-calc2-htrx-entry="'+E(p.join(" ").toLowerCase())+'"><strong>'+E(p[0])+'</strong>'+
    '<div><b>'+E(p[1])+'</b><small>'+E(p[3])+'</small></div><span class="calc2-htrx-menu-tube '+(p[2]==="Green top"?"green":"white")+'">'+E(p[2])+'</span></article>'
   ).join("")+'</div>'+
  '<p class="calc2-htrx-menu-foot">Selected clinic menu. Confirm current HealthTrackRx test activation, panel details and approved specimen instructions before collection.</p>'+
 '</section>';
}
function htrxReference(){
 return '<section class="calc2-htrx-reference" aria-label="HealthTrackRx approved collection reference">'+
 '<div class="calc2-vendor-section-heading"><div><span class="calc-guide-eyebrow">APPROVED COLLECTION DEVICES</span><h4>Only two tube types</h4><p>Choose by ordered test menu and specimen source. Other vendor tube types are not part of this workflow.</p></div></div>'+
 '<div class="calc2-htrx-tube-grid">'+
 '<article class="calc2-htrx-tube calc2-htrx-white"><div class="calc2-htrx-tube-art">'+htrxTubeIllustration("white")+'</div><div class="calc2-htrx-tube-copy"><span class="calc2-htrx-top-badge">WHITE TOP</span><h5>Molecular PCR menus</h5><p>Use for approved HealthTrackRx respiratory, genitourinary and specialty molecular tests assigned to the white tube.</p><span class="calc2-htrx-tube-note">Verify the requested menu and source before collection.</span></div></article>'+
 '<article class="calc2-htrx-tube calc2-htrx-green"><div class="calc2-htrx-tube-art">'+htrxTubeIllustration("green")+'</div><div class="calc2-htrx-tube-copy"><span class="calc2-htrx-top-badge">GREEN TOP</span><h5>Throat GC / CT-GC</h5><p>For <strong>oral or throat Chlamydia/Gonorrhea (CG)</strong> testing. The vendor lists <strong>CGGY</strong> for vaginal, rectal and oral sources using the green-top tube.</p><span class="calc2-htrx-tube-note">Confirm oral/throat collection site on the order.</span></div></article>'+
 '</div>'+
 htrxMenu()+
 '<div class="calc2-htrx-checklist"><strong>Before pickup</strong><div><span>1. One tube per menu; check source and submit order.</span><span>2. Label name, DOB and collection site; do not obscure the barcode.</span><span>3. Seal the tube and bag; verify manifest and approved clinic courier.</span></div></div>'+
 '<p class="calc2-htrx-restriction">Yellow-top urine CG/CGT and gray-top urine culture collection tubes are intentionally excluded from this clinic reference.</p>'+
 '<div class="calc2-pdf-library"><div class="calc2-pdf-library-heading"><strong>PDF collection references</strong><small>Concise PDFs adapted from the uploaded 2026 HealthTrackRx documents</small></div><div class="calc2-pdf-links">'+
 '<a target="_blank" rel="noopener noreferrer" href="assets/reference-pdfs/healthtrackrx-collection-reference.pdf"><span class="calc2-pdf-icon">PDF</span><span><strong>Collection &amp; tube guide</strong><small>White and green tubes · labeling · transport</small></span><span class="calc2-pdf-arrow">↗</span></a>'+
 '<a target="_blank" rel="noopener noreferrer" href="assets/reference-pdfs/healthtrackrx-menu-reference.pdf"><span class="calc2-pdf-icon">PDF</span><span><strong>Selected menu reference</strong><small>RTI, pharyngitis, FCRSV, CGGY and more</small></span><span class="calc2-pdf-arrow">↗</span></a>'+
 '</div></div>'+
 '</section>';
}
/* Shared panel shell across Quest, Cedars, Labcorp, HealthTrackRx and PathMD. */
function panel(calculators,logo){
 const id=selectedLab(),item=labData[id],{market:m,clinic:c}=current();
 const molecular=id==="htrx"||id==="pathmd";
 const calc=(calculators||[]).find(v=>v.accent===id);
 if(id==="pathmd")window.LAB_PATHMD_REFERENCE?.setLocation?.(m.id,c[0]);
 const pathmdContent=id==="pathmd"?window.LAB_PATHMD_REFERENCE?.render()||"":"";
 const htrxContent=id==="htrx"?htrxReference():"";
 const pickup=(id==="pathmd"&&m.id==="socal")?
  '<section class="calc2-pickup-note" aria-label="PathMD pickup details"><span class="calc-guide-eyebrow">SOCAL LOCAL COURIER</span><strong>'+(c[0]==="sm"?"Santa Monica · Monday through Friday":"Local courier pickup · Daily")+'</strong>'+
  (c[0]==="sm"?'<p>11:00–11:30 PM · Place sealed, labeled specimens in the <strong>lockbox</strong> for pickup.</p>':'<p>Local courier pickup is arranged daily. Confirm the exact time and handoff location with the clinic.</p>')+'</section>':'';

 const action=molecular?
  '<button type="button" class="calc2-primary-action" data-calc2-open-menu="'+id+'">Open '+E(names[id])+' test menu <span aria-hidden="true">↓</span></button>':
  calc?'<a class="calc2-primary-action" target="_blank" rel="noopener noreferrer" href="'+E(calc.url)+'">Open '+E(item.title)+' <span aria-hidden="true">↗</span></a>':'';
 const extra=calc?.extra?'<a class="calc2-secondary-action" href="'+E(calc.extra)+'" target="_blank" rel="noopener noreferrer">Container guide <span aria-hidden="true">↗</span></a>':'';
 const sendout='<button type="button" class="calc2-secondary-action" data-calc2-sendout="'+id+'">Sendout workflow <span aria-hidden="true">↗</span></button>';
 const visual=molecular?'<span class="calc2-panel-icon molecular" aria-hidden="true"><svg viewBox="0 0 48 48" width="31" height="31" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7l24 17-24 17M36 7L12 24l24 17M13 15h22M13 24h22M13 33h22"/><circle cx="12" cy="7" r="3" fill="#fff"/><circle cx="36" cy="7" r="3" fill="#fff"/><circle cx="12" cy="41" r="3" fill="#fff"/><circle cx="36" cy="41" r="3" fill="#fff"/></svg></span>':
  '<span class="calc2-panel-icon">'+logo+'</span>';
 const quickSteps='<section class="calc2-panel-steps" aria-label="Quick start for '+E(names[id])+'">'+
  '<div class="calc2-panel-steps-heading"><h4>Before specimen collection</h4><span>3 checkpoints</span></div>'+
  '<div class="calc2-step-grid">'+item.steps.map((step,i)=>
   '<div class="calc2-step"><span class="calc2-step-number">'+String(i+1).padStart(2,"0")+'</span>'+
   '<div><strong>'+E(step[0])+'</strong><p>'+E(step[1])+'</p></div></div>').join("")+
  '</div></section>';
 return '<section id="calc2-lab-panel" role="tabpanel" aria-labelledby="calc2-tab-'+id+'" tabindex="0" class="calc2-panel calc2-panel-'+id+'">'+
  '<div class="calc2-panel-top"><span>'+E(item.kind)+'</span><span class="calc2-selected-site">'+E(m.short)+' <i aria-hidden="true">·</i> '+E(c[1])+'</span></div>'+
  '<div class="calc2-panel-intro">'+
   '<div class="calc2-panel-hero">'+visual+'<div><span class="calc2-panel-tag">'+E(item.tag)+'</span><h3>'+E(item.title)+'</h3><p>'+E(item.desc)+'</p></div></div>'+
   '<div class="calc2-panel-actions">'+action+extra+sendout+'</div>'+
  '</div>'+
  pickup+(pathmdContent||htrxContent||quickSteps)+
  '<p class="calc2-panel-footnote">'+(molecular?
    'Before collection or dispatch, verify this clinic is activated and confirm approved panels, collection devices and transport arrangements.':
    'Always verify the current test directory, exact specimen requirements and local SOP before collection.')+'</p>'+
  '</section>';
}
/* One relevant continuation area replaces the two competing sendout callouts. */
function nextActions(){
 const molecular=!isCalculator();
 const text=molecular?
  'After packaging, record the specimen handoff and pickup or tracking information.':
  'Use the correct order workflow, then document collection and specimen handoff.';
 return '<section class="calc2-next-area" aria-label="Next steps after collection">'+
  '<div class="calc2-next-copy"><span class="calc-guide-eyebrow">NEXT STEPS</span><h3>'+(molecular?'Finish the molecular sendout':'Continue the sendout')+'</h3><p>'+text+'</p></div>'+
  '<div class="calc2-next-buttons">'+
   (molecular?'':'<button type="button" class="calc2-next-secondary" data-go="orders"><span>Order &amp; upload workflow</span><span aria-hidden="true">→</span></button>')+
   '<button type="button" class="calc2-next-primary" data-go="sendout-log"><span>Sendout Log instructions</span><span aria-hidden="true">→</span></button>'+
  '</div></section>';
}
function setMenu(open,focusSelected=false,restore=false){
 const picker=document.querySelector('#calc2-site-selector .dqc-location-picker');
 if(!picker)return;
 const trigger=picker.querySelector('[data-calc2-toggle]');
 const list=picker.querySelector('[role="listbox"]');
 if(!trigger||!list)return;
 list.hidden=!open;trigger.setAttribute('aria-expanded',String(open));
 picker.classList.toggle('is-open',open);
 if(open&&focusSelected)(list.querySelector('[aria-selected="true"]')||list.querySelector('[role="option"]'))?.focus();
 if(!open&&restore)trigger.focus();
}
function updatePage(focus=""){
 document.dispatchEvent(new CustomEvent('lc-calculators-change'));
 const counter=document.getElementById('calc2-nav-count');
 if(counter)counter.textContent=String(count());
 if(focus==="clinic")document.querySelector('#calc2-site-selector [data-calc2-toggle]')?.focus({preventScroll:true});
 if(focus==="tab")document.querySelector('.calc2-tab.is-selected')?.focus({preventScroll:true});
}
document.addEventListener('click',event=>{
 const btn=event.target.closest('#calc2-site-selector [data-calc2-market]');
 if(btn){
  const next=btn.dataset.calc2Market;
  if(markets.some(m=>m.id===next)&&next!==activeMarket){activeMarket=next;updatePage();}
  return;
 }
 const toggle=event.target.closest('#calc2-site-selector [data-calc2-toggle]');
 if(toggle){setMenu(toggle.getAttribute('aria-expanded')!=='true');return;}
 const clinic=event.target.closest('#calc2-site-selector [data-calc2-clinic]');
 if(clinic){
  const m=current().market,id=clinic.dataset.calc2Clinic;
  if(m.clinics.some(c=>c[0]===id)){selectedClinics[m.id]=id;updatePage('clinic');}
  return;
 }
 const tab=event.target.closest('[data-calc2-lab]');
 if(tab){
  const id=tab.dataset.calc2Lab;
  if(availableLabs().includes(id)&&id!==selectedLab()){rememberedLab[activeMarket]=id;updatePage("tab");}
  return;
 }
 const menuButton=event.target.closest('[data-calc2-open-menu]');
 if(menuButton){
  if(menuButton.dataset.calc2OpenMenu==="pathmd")window.LAB_PATHMD_REFERENCE?.openMenu?.();
  else if(menuButton.dataset.calc2OpenMenu==="htrx")document.getElementById("calc2-htrx-menu")?.scrollIntoView({behavior:"smooth",block:"start"});
  return;
 }
 const sendout=event.target.closest('[data-calc2-sendout]');
 if(sendout){
  const {market:m,clinic:c}=current();
  window.LAB_SENDOUT_MARKETS?.select?.(m.id,c[0],sendout.dataset.calc2Sendout);
  location.hash='#sendout';
  return;
 }
 if(!event.target.closest('#calc2-site-selector .dqc-location-picker'))setMenu(false);
});
document.addEventListener("input",event=>{
 if(!event.target?.matches?.("[data-calc2-htrx-search]"))return;
 const needle=event.target.value.toLowerCase().trim();
 document.querySelectorAll("[data-calc2-htrx-entry]").forEach(row=>{
  row.hidden=Boolean(needle)&&!row.dataset.calc2HtrxEntry.includes(needle);
 });
});
document.addEventListener('keydown',event=>{
 const tab=event.target.closest('.calc2-tab');
 if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
  event.preventDefault();
  const options=availableLabs(),i=options.indexOf(tab.dataset.calc2Lab);
  const id=event.key==='ArrowRight'?options[(i+1)%options.length]:
   event.key==='ArrowLeft'?options[(i-1+options.length)%options.length]:
   event.key==='Home'?options[0]:options[options.length-1];
  rememberedLab[activeMarket]=id;updatePage("tab");
  return;
 }
 const toggle=event.target.closest('#calc2-site-selector [data-calc2-toggle]');
 if(toggle&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
  event.preventDefault();setMenu(true,true);
  if(event.key==='ArrowUp'){
   const options=[...document.querySelectorAll('#calc2-site-selector [data-calc2-clinic]')];
   options[options.length-1]?.focus();
  }
  return;
 }
 if(toggle&&event.key==='Escape'){event.preventDefault();setMenu(false,false,true);return;}
 const clinic=event.target.closest('#calc2-site-selector [data-calc2-clinic]');
 if(!clinic)return;
 if(event.key==='Escape'){event.preventDefault();setMenu(false,false,true);return;}
 if(event.key==='Tab'){setMenu(false);return;}
 const options=[...document.querySelectorAll('#calc2-site-selector [data-calc2-clinic]')];
 const idx=options.indexOf(clinic);
 const next=event.key==='ArrowDown'?options[(idx+1)%options.length]:
  event.key==='ArrowUp'?options[(idx-1+options.length)%options.length]:
  event.key==='Home'?options[0]:event.key==='End'?options[options.length-1]:null;
 if(next){event.preventDefault();next.focus();}
});
window.LAB_CALCULATORS_GUIDE={selector,tabs,panel,nextActions,isCalculator,selectedLab,allows,market,count};
})();