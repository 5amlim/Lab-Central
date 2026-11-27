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
let activeMarket=window.LAB_MARKET?.get()||"socal";
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
  (!window.LAB_MARKET?.get()?('<nav class="dqc-market-picker" aria-label="Select market for lab calculators and guides"><span class="dqc-picker-label">MARKET</span><div class="dqc-market-buttons">'+
   markets.map(item=>'<button type="button" class="dqc-market-choice'+(item.id===m.id?' is-selected':'')+'" data-calc2-market="'+E(item.id)+'" aria-pressed="'+(item.id===m.id)+'">'+E(item.short)+'</button>').join('')+
  '</div></nav>'):'')+
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
  {id:"pathmd",name:"PathMD",tag:"PATHMD",title:"Molecular testing guide",tone:"pathmd",desc:"White-top tube collection, illustrated panel instructions and courier routing. Site activation may still be pending.",tips:["Use one PathMD white-top tube for the ordered panel and confirm the approved specimen source.","For urine, mix the thick swab in a sterile cup 10 times; for GI, collect stool on the thick swab. No transfer pipette for urine.","Label tubes with patient identifiers, date and time, specimen source, and collector initials."]}
 ].filter(v=>availableLabs().includes(v.id));
 return '<section class="calc2-molecular-section" aria-labelledby="calc2-molecular-heading">'+
  '<div class="calc2-section-heading"><div><span class="calc-guide-eyebrow">SPECIALTY SENDOUTS</span><h2 id="calc2-molecular-heading">Molecular testing</h2><p>'+entries.map(v=>E(v.name)).join(" and ")+' references for '+E(m.name)+'. Check clinic-specific activation before use.</p></div><span class="calc2-category-tag">'+entries.length+' guide'+(entries.length===1?"":"s")+'</span></div>'+
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
 socal:["quest","cedars","labcorp","pathmd"],
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
 cedars:{tag:"CEDARS-SINAI",title:"Cedars lab guide",kind:"Test & container reference · SoCal",desc:"Use the Cedars lab guide to look up tests and confirm the appropriate collection containers.",steps:[
 ["Look up the test","Use the Cedars lab guide to confirm the requested test and its ordering details."],
 ["Check the container","Verify the specimen source, approved collection container and special handling."],
 ["Confirm courier","Check the local Cedars or Apollo handoff procedure."]]},
 labcorp:{tag:"LABCORP",title:"Labcorp calculator",kind:"Collection calculator",desc:"Test-code lookup, specimen handling and sendout instructions.",steps:[
 ["Find the code","Select the exact Labcorp test from the directory."],
 ["Review processing","Confirm collection container, volume, centrifugation and temperature."],
 ["Finalize the flowsheet","Verify STAT routing and bag separation before printing."]]},
 htrx:{tag:"HEALTHTRACKRX",title:"HealthTrackRx",kind:"Molecular sendout guide",desc:"Molecular specimen collection, kit selection, manifest and handoff.",steps:[
 ["Choose the approved kit","Confirm panel eligibility and the specimen source."],
 ["Verify identifiers","Check requisition, label and collection date/time."],
 ["Arrange the shipment","Confirm HTRX-specific manifest, shipping label and site courier."]]},
 pathmd:{tag:"PATHMD",title:"PathMD",kind:"Molecular sendout guide · Trial",desc:"Athena aftercare, paper requisition, molecular collection and local sendout guidance.",steps:[
 ["Place Athena aftercare order","Follow up on the exact PathMD panel name."],
 ["Complete paper requisition","Dymo patient name and DOB; provider name and signature (Dr. B by default); one panel, ICD-10, date and specimen source."],
 ["Package and document","Follow the clinic courier procedure. Results fax through Athena and match by name and DOB."]]}
};
function availableLabs(){return labOrder[activeMarket]||labOrder.socal;}
function selectedLab(){
 const options=availableLabs();
 if(!options.includes(rememberedLab[activeMarket]))rememberedLab[activeMarket]=options[0];
 return rememberedLab[activeMarket];
}
// Only accept a deep-linked lab when it is offered in the active market.
function selectLab(id){
 if(!availableLabs().includes(id))return false;
 rememberedLab[activeMarket]=id;
 return true;
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
/* Vendor: HealthTrackRx June 2026 syndromic menu. Limit this clinic view to previously selected panels.
 * Add-on codes include the entire base panel plus listed additional organisms.
 */
const splitTargets=s=>s.split("|").map(x=>x.trim()).filter(Boolean);
const htrxResp={
 bacterial:splitTargets("Bordetella pertussis|Bordetella parapertussis|Bordetella bronchiseptica|Chlamydia pneumoniae|Mycoplasma pneumoniae"),
 viral:splitTargets("Adenovirus|Coronavirus 229E|Coronavirus NL63|Coronavirus HKU1|Coronavirus OC43|SARS-CoV-2 (COVID-19)|Enterovirus D68|Human metapneumovirus|Influenza A|Influenza B|Parainfluenza 1|Parainfluenza 2|Parainfluenza 3|Parainfluenza 4|Respiratory syncytial virus (RSV)|Rhinovirus/Enterovirus")
};
const htrxPhar={
 bacterial:splitTargets("Chlamydia pneumoniae|Mycoplasma pneumoniae|Streptococcus pyogenes (Group A Strep)"),
 viral:htrxResp.viral
};
const htrxPersistent={
 bacterial:splitTargets("Fusobacterium nucleatum|Fusobacterium necrophorum|Streptococcus dysgalactiae (Group C/G Strep)"),
 viral:splitTargets("Epstein-Barr virus (EBV / HHV-4)")
};
const htrxUTI={
 bacterial:splitTargets("Acinetobacter baumannii|Citrobacter freundii|Enterobacter cloacae complex|Klebsiella aerogenes|Enterococcus faecalis|Enterococcus faecium|Escherichia coli|Klebsiella pneumoniae|Klebsiella oxytoca|Morganella morganii|Proteus mirabilis|Proteus vulgaris|Pseudomonas aeruginosa|Serratia marcescens|Staphylococcus aureus|Staphylococcus epidermidis|Staphylococcus haemolyticus|Staphylococcus lugdunensis|Staphylococcus saprophyticus|Streptococcus agalactiae (Group B Strep)"),
 fungal:splitTargets("Candida albicans|Candida parapsilosis|Candida tropicalis|Candida glabrata|Candida krusei"),
 resistance:splitTargets("ACT/MIR/FOX/ACC groups|CTX-M groups|dfrA1/dfrA5|sul1/sul2|ermA/ermB/ermC|mefA|IMP/NDM/VIM groups|mecA|OXA groups|qnrA/qnrB|SHV/KPC groups|tetB/tetM|vanA/vanB")
};
const combineHTRX=(a,b)=>Object.fromEntries([...new Set([...Object.keys(a),...Object.keys(b)])].map(k=>[k,[...new Set([...(a[k]||[]),...(b[k]||[])])]]));
const htrxRecords=[
 {code:"RTI",name:"Respiratory tract infection",tube:"White top",specimen:"Nasopharynx/nares, oropharynx/throat/oral, cough sputum",groups:htrxResp,aliases:"respiratory viral respiratory bacterial cough"},
 {code:"RTIPROAO",name:"RTI - persistent add-on",tube:"White top",specimen:"RTI specimen sources",groups:combineHTRX(htrxResp,{bacterial:splitTargets("Haemophilus influenzae|Moraxella catarrhalis|Streptococcus pneumoniae")}),aliases:"persistent respiratory"},
 {code:"RTITHRAO",name:"RTI - atypical pharyngitis",tube:"White top",specimen:"Oropharynx/throat/oral only",groups:combineHTRX(htrxResp,htrxPersistent),aliases:"atypical throat EBV"},
 {code:"PHAR",name:"Pharyngitis",tube:"White top",specimen:"Oropharynx/throat/oral",groups:htrxPhar,aliases:"sore throat strep A"},
 {code:"PHARRECAO",name:"Pharyngitis - persistent add-on",tube:"White top",specimen:"Oropharynx/throat/oral",groups:combineHTRX(htrxPhar,htrxPersistent),aliases:"persistent strep pharyngitis EBV"},
 {code:"FCRSV",name:"Flu, COVID, RSV",tube:"White top",specimen:"Nasopharynx/nares",groups:{viral:splitTargets("SARS-CoV-2 (COVID-19)|Influenza A|Influenza B|Respiratory syncytial virus (RSV)")},aliases:"flu covid coronavirus RSV"},
 {code:"UTI",name:"Urinary tract infection",tube:"White top",specimen:"Voided or catheter urine",groups:htrxUTI,aliases:"urine urinary infection bladder UTI"},
 {code:"CGGY",name:"Chlamydia / Gonorrhea (throat/oral)",tube:"Green top",specimen:"Oral/throat swab (green collection device)",groups:{bacterial:splitTargets("Chlamydia trachomatis|Neisseria gonorrhoeae")},aliases:"throat GC CT GC gonococcus chlamydia gonorrhea"}
];
let htrxQuery="";
const normHTRX=s=>String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\be\.?\s*coli\b/g,"escherichia coli").replace(/\bstrep a\b/g,"streptococcus pyogenes");
const htrxText=p=>[p.code,p.name,p.tube,p.specimen,p.aliases,...Object.values(p.groups).flat()].join(" ");
function htrxMenu(){
 const needle=normHTRX(htrxQuery.trim());
 const rows=htrxRecords.filter(p=>!needle||normHTRX(htrxText(p)).includes(needle));
 const labels={bacterial:"Bacterial",viral:"Viral",fungal:"Fungal / yeast",resistance:"Resistance markers"};
 return '<section class="calc2-htrx-menu" id="calc2-htrx-menu" aria-label="HealthTrackRx molecular test menu">'+
  '<div class="calc2-vendor-section-heading"><div><span class="calc-guide-eyebrow">HEALTHTRACKRX / MENU</span><h4>Test menu &amp; pathogens</h4><p>Search the organisms included in selected white-top panels and green-top oral/throat CG.</p></div><span class="calc2-htrx-menu-count">'+rows.length+' of '+htrxRecords.length+'</span></div>'+
  '<label class="calc2-htrx-menu-search-label" for="calc2-htrx-search">Search panel, code, pathogen or resistance marker</label>'+
  '<input id="calc2-htrx-search" data-calc2-htrx-search type="search" placeholder="Try RSV, Strep pyogenes, E. coli, Candida, mecA..." autocomplete="off" value="'+E(htrxQuery)+'">'+
  '<div class="calc2-htrx-menu-items">'+(rows.length?rows.map(p=>
   '<details class="calc2-htrx-menu-row" '+(needle?'open':'')+'><summary><span class="calc2-htrx-menu-code">'+E(p.code)+'</span>'+
   '<span class="calc2-htrx-menu-desc"><b>'+E(p.name)+'</b><small>'+E(p.specimen)+'</small></span>'+
   '<span class="calc2-htrx-menu-tube '+(p.tube==="Green top"?"green":"white")+'">'+E(p.tube)+'</span><span class="calc2-htrx-menu-chevron" aria-hidden="true"></span></summary>'+
   '<div class="calc2-htrx-pathogens">'+Object.entries(p.groups).map(([kind,targets])=>
     '<div class="calc2-htrx-pathogen-group"><strong>'+E(labels[kind]||kind)+' <small>'+targets.length+'</small></strong>'+
      '<div>'+targets.map(t=>'<span class="calc2-htrx-pathogen'+(needle&&normHTRX(t).includes(needle)?' is-match':'')+'">'+E(t)+'</span>').join("")+'</div></div>'
   ).join("")+'</div></details>'
  ).join(""):'<div class="calc2-htrx-no-results">No matching panels or pathogens. Try another name or code.</div>')+'</div>'+
  '<p class="calc2-htrx-menu-foot">Panel targets from the June 2026 HealthTrackRx syndromic menu. Add-on panels include base targets. Confirm activated panels, specimen source and current vendor instructions before collection.</p>'+
 '</section>';
}
/* Cross-vendor molecular pathogen search, available regardless of selected lab tab. */
let molecularQuery="";
function molecularMatches(query=molecularQuery){
 const raw=String(query||"").trim(),q=normHTRX(raw);
 if(q.length<2||activeMarket==="ny"||(window.LAB_MARKET?.get()&&!availableLabs().some(id=>id==="htrx"||id==="pathmd")))return [];
 const smart=window.LAB_SMART_SEARCH;
 const matches=(text,fuzzy=false)=>normHTRX(text).includes(q)||Boolean(smart?.matches(text,raw,{fuzzy}));
 const htrxTextFor=p=>htrxText(p);
 const pathmdTextFor=p=>[p.name,p.category,p.terms,...Object.values(p.groups||{}).flat()].join(" ");
 const exactHtrx=availableLabs().includes("htrx")?htrxRecords.filter(p=>matches(htrxTextFor(p))):[];
 const exactPathmd=(window.LAB_PATHMD_REFERENCE?.panels||[]).filter(p=>matches(pathmdTextFor(p)));
 // Consider near spellings only when no panel matches exactly. Do not expand
 // short pathogen abbreviations or laboratory order codes by edit distance.
 const fuzzyEligible=!exactHtrx.length&&!exactPathmd.length&&raw.length>=5;
 const htrx=fuzzyEligible
  ?(availableLabs().includes("htrx")?htrxRecords.filter(p=>matches(htrxTextFor(p),true)):[])
  :exactHtrx;
 const pathmd=fuzzyEligible
  ?(window.LAB_PATHMD_REFERENCE?.panels||[]).filter(p=>matches(pathmdTextFor(p),true))
  :exactPathmd;
 const list=[
  ...htrx.map(p=>({
   lab:"htrx",labName:"HealthTrackRx",name:p.name,code:p.code,
   targets:Object.values(p.groups).flat(),groups:p.groups,specimen:p.specimen,
   text:[p.name,p.code,p.specimen,p.aliases].join(" ")
  })),
  ...pathmd.map(p=>({
   lab:"pathmd",labName:"PathMD",id:p.id,name:p.name,code:"",
   targets:Object.values(p.groups).flat(),groups:p.groups,
   specimen:"PathMD white-top tube; swab collection depends on specimen source",
   text:[p.name,p.category,p.terms].join(" ")
  }))
 ];
 return list.map(p=>{
  const hits=p.targets.filter(t=>matches(t,fuzzyEligible));
  return {...p,matched:hits[0]||"",hits,approximate:fuzzyEligible};
 });
}

let pendingSendoutSearchScroll=null;
function selectSendoutSearchResult(lab,term,panelId=""){
 if(lab!=="htrx"&&lab!=="pathmd")return false;
 if(!availableLabs().includes(lab))return false;
 rememberedLab[activeMarket]=lab;
 const query=String(term||"");
 let selectedId="";
 if(lab==="htrx")htrxQuery=query;
 else if(panelId&&window.LAB_PATHMD_REFERENCE?.selectPanel?.(panelId,query))selectedId=panelId;
 else window.LAB_PATHMD_REFERENCE?.searchForPathogen?.(query);
 pendingSendoutSearchScroll={lab,panelId:selectedId};
 return true;
}
function scrollToSearchResult(){
 if(!pendingSendoutSearchScroll)return;
 const {lab,panelId}=pendingSendoutSearchScroll;
 pendingSendoutSearchScroll=null;
 requestAnimationFrame(()=>{
  const target=lab==="pathmd"&&panelId
   ?document.querySelector("#pathmd-reference .pmd-menu-card.is-targeted")
   :document.getElementById(lab==="htrx"?"calc2-htrx-menu":"pmd-test-search");
  const destination=target||document.getElementById(lab==="htrx"?"calc2-htrx-menu":"pmd-test-search");
  destination?.scrollIntoView?.({behavior:"smooth",block:"start"});
  if(target&&panelId)target.querySelector("summary")?.focus({preventScroll:true});
 });
}
function finderResults(){
 const q=normHTRX(molecularQuery.trim()),matches=molecularMatches();
 if(q.length<2)return '<span class="calc2-finder-hint">Try an organism such as RSV, Group A Strep, E. coli or Candida.</span>';
 const all=matches.length,shown=matches.slice(0,18);
 if(!all)return '<div class="calc2-finder-empty">No panels found for “'+E(molecularQuery)+'”. Check the spelling or search the full vendor menu.</div>';
 return '<div class="calc2-finder-count">'+all+' matching panel'+(all===1?'':'s')+' across '+availableLabs().filter(x=>x==='htrx'||x==='pathmd').map(x=>E(names[x])).join(' and ')+'</div>'+
  '<div class="calc2-finder-grid">'+shown.map(p=>
   '<button type="button" class="calc2-finder-hit" data-calc2-pick-molecular="'+p.lab+'" data-calc2-pick-target="'+E(molecularQuery)+'">'+
   '<span class="calc2-finder-lab '+p.lab+'">'+E(p.labName)+'</span>'+
   '<span class="calc2-finder-info"><strong>'+E(p.name)+'</strong><small>'+(p.matched?'Contains: '+E(p.matched):'Matching panel or description')+'</small></span>'+
   '<span class="calc2-finder-arrow" aria-hidden="true">↗</span></button>'
  ).join("")+'</div>'+
  (all>shown.length?'<p class="calc2-finder-more">Showing the first '+shown.length+' matching panels. Refine your search to narrow the list.</p>':'');
}
function molecularFinder(){
 if(!availableLabs().includes("htrx")&&!availableLabs().includes("pathmd"))return "";
 return '<section class="calc2-finder" id="calc2-finder" aria-label="Search molecular sendout pathogens">'+
  '<div class="calc2-finder-head"><div><strong>Find a molecular pathogen</strong><span>Search '+availableLabs().filter(x=>x==="htrx"||x==="pathmd").map(x=>E(names[x])).join(" and ")+' panel targets</span></div><span class="calc2-finder-labs">'+availableLabs().filter(x=>x==="htrx"||x==="pathmd").length+' lab'+(availableLabs().filter(x=>x==="htrx"||x==="pathmd").length===1?"":"s")+'</span></div>'+
  '<div class="calc2-finder-input"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>'+
  '<input id="calc2-molecular-search" type="search" data-calc2-molecular-search autocomplete="off" placeholder="Search pathogen, panel or resistance marker..." value="'+E(molecularQuery)+'"></div>'+
  '<div class="calc2-finder-results" id="calc2-finder-results">'+finderResults()+'</div></section>';
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
 const cedarsContent=id==="cedars"&&m.id==="socal"?window.LAB_CEDARS_DIRECTORY?.render()||"":"";
 const pickup=(id==="pathmd"&&m.id==="socal")?
  '<section class="calc2-pickup-note" aria-label="PathMD pickup details"><span class="calc-guide-eyebrow">SOCAL LOCAL COURIER</span><strong>'+(c[0]==="sm"?"Santa Monica · Monday through Friday":"Local courier pickup · Daily")+'</strong>'+
  (c[0]==="sm"?'<p>11:00–11:30 PM · Place sealed, labeled specimens in the <strong>lockbox</strong> for pickup.</p>':'<p>Local courier pickup is arranged daily. Confirm the exact time and handoff location with the clinic.</p>')+'</section>':'';

 const action=molecular?
  '<button type="button" class="calc2-primary-action" data-calc2-open-menu="'+id+'">Open '+E(names[id])+' test menu <span aria-hidden="true">↓</span></button>':
  id==="cedars"?'<button type="button" class="calc2-primary-action" data-calc2-open-menu="cedars">Search Cedars tests <span aria-hidden="true">↓</span></button>':
  calc?'<a class="calc2-primary-action" target="_blank" rel="noopener noreferrer" href="'+E(calc.url)+'">Open '+E(item.title)+' <span aria-hidden="true">↗</span></a>':'';
 const extra=(id==="cedars"?'<button type="button" class="calc2-secondary-action" data-go="lab-container-gallery" data-target-tab="cedars-urine">View UA + gray-top urine tubes <span aria-hidden="true">→</span></button>':'')+
  (id==="cedars"&&calc?'<a class="calc2-secondary-action" target="_blank" rel="noopener noreferrer" href="'+E(calc.url)+'">Full Cedars lab guide <span aria-hidden="true">↗</span></a>':'')+
  (calc?.extra?'<a class="calc2-secondary-action" href="'+E(calc.extra)+'" target="_blank" rel="noopener noreferrer">Container guide <span aria-hidden="true">↗</span></a>':'');
 const visual=molecular?'<span class="calc2-panel-icon molecular" aria-hidden="true"><svg viewBox="0 0 48 48" width="31" height="31" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7l24 17-24 17M36 7L12 24l24 17M13 15h22M13 24h22M13 33h22"/><circle cx="12" cy="7" r="3" fill="#fff"/><circle cx="36" cy="7" r="3" fill="#fff"/><circle cx="12" cy="41" r="3" fill="#fff"/><circle cx="36" cy="41" r="3" fill="#fff"/></svg></span>':
  '<span class="calc2-panel-icon">'+logo+'</span>';
 const cedarsPayerNote=id==="cedars"?
  '<aside class="calc2-cedars-payer-note" aria-label="Cedars insurance eligibility"><strong>Insurance eligibility</strong><span>Cedars does not accept uninsured patients or patients with HMO insurance.</span></aside>':"";
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
   '<div class="calc2-panel-actions">'+action+extra+'</div>'+
  '</div>'+
  pickup+cedarsPayerNote+(pathmdContent||htrxContent||quickSteps)+cedarsContent+
  '<p class="calc2-panel-footnote">'+(molecular?
    'Before collection or dispatch, verify this clinic is activated and confirm approved panels, collection devices and transport arrangements.':
    'Always verify the current test directory, exact specimen requirements and local SOP before collection.')+'</p>'+
  '</section>';
}
/* One relevant continuation area replaces the two competing sendout callouts. */
function nextActions(){
 const molecular=!isCalculator(),cedars=selectedLab()==="cedars";
 const text=molecular?
  'After packaging, record the specimen handoff and pickup or tracking information.':
  cedars?'Confirm the appropriate collection container and arrange the approved Cedars or Apollo specimen handoff.':
  'Use the correct order workflow, then document collection and specimen handoff.';
 return '<section class="calc2-next-area" aria-label="Next steps after collection">'+
  '<div class="calc2-next-copy"><span class="calc-guide-eyebrow">NEXT STEPS</span><h3>'+(molecular?'Finish the molecular sendout':'Continue the sendout')+'</h3><p>'+text+'</p></div>'+
  '<div class="calc2-next-buttons">'+
   (molecular||cedars?'':'<button type="button" class="calc2-next-secondary" data-go="orders" data-target-tab="in-house"><span>Order &amp; upload workflow</span><span aria-hidden="true">→</span></button>')+
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
   else if(menuButton.dataset.calc2OpenMenu==="cedars")window.LAB_CEDARS_DIRECTORY?.open?.();
  return;
 }
 const pick=event.target.closest('[data-calc2-pick-molecular]');
 if(pick){
  const lab=pick.dataset.calc2PickMolecular;
  const term=pick.dataset.calc2PickTarget||molecularQuery;
  if(availableLabs().includes(lab)){
   rememberedLab[activeMarket]=lab;
   if(lab==="htrx")htrxQuery=term;
   else window.LAB_PATHMD_REFERENCE?.searchForPathogen?.(term);
   updatePage("tab");
   const target=document.getElementById(lab==="htrx"?"calc2-htrx-menu":"pmd-test-search");
   target?.scrollIntoView?.({behavior:"smooth",block:"center"});
  }
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
 if(!event.target?.matches?.("[data-calc2-molecular-search]"))return;
 molecularQuery=event.target.value;
 const results=document.getElementById("calc2-finder-results");
 if(results)results.innerHTML=finderResults();
});
document.addEventListener("input",event=>{
 if(!event.target?.matches?.("[data-calc2-htrx-search]"))return;
 htrxQuery=event.target.value;
 const needle=normHTRX(htrxQuery.trim());
 const root=document.getElementById("calc2-htrx-menu");
 if(!root)return;
 const input=event.target, start=input.selectionStart, end=input.selectionEnd;
 const html=htrxMenu();
 root.outerHTML=html;
 const next=document.getElementById("calc2-htrx-search");
 if(next){
  next.focus({preventScroll:true});
  try{next.setSelectionRange(start,end)}catch(e){}
 }
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
document.addEventListener('labcentral:marketchange',event=>{
 if(markets.some(m=>m.id===event.detail?.market))activeMarket=event.detail.market;
});

/* Function-specific instructions for the two collection calculators. */
const functionGuides=[
 {id:"start",tab:"Quick start",title:"Build a collection plan",intro:"Start here for a routine sendout.",steps:[
 ["Choose the receiving lab","Select your clinic and laboratory above, then open its calculator. Confirm the lab and exact ordered test codes before starting."],
 ["Find and add tests","Use Find Tests to enter the ordered names or codes. Review the matches and add the correct tests."],
 ["Check the collection plan","Review the cart, tube quantities, collection alerts, processing and transport requirements."],
 ["Finalize the order","Verify STAT routing and regional turnaround time when relevant. Print or save the flowsheet, then follow your clinic’s sendout process."]],tip:"The calculator helps plan collection. It does not place orders in Athena or replace the official lab directory."},
 {id:"find",tab:"Find tests",title:"Search and add ordered tests",intro:"Use Add Tests for a requisition or Browse tests for individual searches.",steps:[
 ["Enter the orders","In Find Tests, type or paste one test code or name per line. Shorthand and common misspellings are supported; select autocomplete suggestions to confirm the intended test."],
 ["Review matches","Select Review matches to preview results without adding them. Verify the exact code, name, panel and specimen. An exact match badge identifies the search match, not clinical appropriateness."],
 ["Add tests","Select Add best matches or add individual results. Resolve ambiguous matches individually; review unmatched or restricted entries. A green cart animation confirms a successful addition."],
 ["Browse and filter","Search by name, code or category. Filter by clinical category, specimen, temperature, transport container, fasting, pediatric tests or centrifugation. Use Clear filters or Show more tests as needed."],
 ["Check the directory","Open the test’s directory link to verify instructions, especially for unusual specimens or collection requirements."]],tip:"Red suggestions indicate Do Not Perform entries; they are visible for identification but cannot be added. Search results are not authorization to order a test."},
 {id:"convert",tab:"Convert tests",title:"Compare Quest and LabCorp test codes",intro:"Use Convert Tests when the order comes from the other laboratory.",steps:[
 ["Choose the destination","Open the calculator for the receiving lab and switch from Find Tests to Convert Tests. The input is the other laboratory; output is the current receiving laboratory."],
 ["Enter source tests","Enter codes or names one per line and use autocomplete to resolve exact source entries. Review the suggested destination codes."],
 ["Verify every candidate","Check the official directories for analytes, panel composition, methodology where relevant, specimen and clinical intent. Use Browse matches to compare either direction and filter possible, related or unmatched records."],
 ["Resolve incomplete results","Review alternate candidates where offered. No match means no verified candidate was identified. Manually entered text is not a verified match; confirm independently before using it."],
 ["Copy or add","Copy destination codes when needed, or use the add-to-cart control for eligible destination tests. Return to Find Tests and review the cart."]],tip:"Candidate matches are not verified clinical equivalents. Do not substitute tests without confirming the order and appropriate receiving-lab requirements."},
 {id:"cart",tab:"Cart",title:"Manage selected tests",intro:"The Collection summary is your working cart.",steps:[
 ["Open the cart","Review selected tests and the count. On mobile, use View cart to jump to the summary."],
 ["Review details","Select Show details for individual requirements and directory links. Check for missing tests, duplicates, alerts and STAT markings."],
 ["Change the order","Remove incorrect tests individually. Add a missing test only if it is permitted and verified. Recheck the collection plan after every change."],
 ["Clear the cart","Select Clear all, then confirm. Cancel to keep your selections. The empty cart animates after confirmation; a refresh restores saved selections without replaying the add animation."]],tip:"The cart is saved in the browser. Clear it before starting an unrelated patient’s collection plan; do not enter patient identifiers in the calculator."},
 {id:"collection",tab:"Collect & process",title:"Understand the collection and processing plan",intro:"Use the calculated quantities as a planning aid and verify test-specific requirements.",steps:[
 ["Choose available tubes","Set Gold / SST (5 mL) or Tiger SST (7.5 mL) to match actual stock. For Quest urine culture, choose Gray Top or UriSponge only when the receiving lab permits that device."],
 ["Review what to collect","Check specimen type, original collection container, tube counts, volume and order of draw. Compatible specimens may be pooled by the calculator; dedicated specimens and special requirements must remain separate."],
 ["Check alerts","Read fasting, light protection, trace metal, pediatric, special handling and other collection alerts. Confirm additives, fill requirements and minimum volumes; do not rely on cap color alone."],
 ["Process specimens","Review centrifugation, separation, transfer and temperature instructions. Only separate or transfer when the specific test requires it. Do not centrifuge whole blood merely because it needs transfer."],
 ["Review what to submit","Check the final transport containers, quantities, labeling, stability and any special requirements. Use the container reference to identify unfamiliar tubes or kits."]],tip:"If requirements conflict or a volume is unclear, verify with the receiving lab before collection. Do not override a dedicated tube or special handling instruction just to reduce tube counts."},
 {id:"stat",tab:"STAT",title:"Check STAT availability and routing",intro:"STAT eligibility depends on the exact test and receiving laboratory.",steps:[
 ["Select receiving location","Choose the actual STAT receiving lab in Quest or the receiving area in LabCorp. Unverified locations do not establish STAT eligibility."],
 ["Check available tests","Open Show STAT tests (Quest) or STAT routing info (LabCorp). Search for the exact code and confirm local availability and courier arrangements."],
 ["Set priority","Add eligible tests from the STAT menu or use the STAT control in the cart. Confirm the prompt and review any default STAT markings against the order."],
 ["Separate the shipment","Verify that STAT specimens are separated from routine specimens in the collection and transport plan. Follow the clinic’s urgent handoff and notification process."]],tip:"A STAT marking is not a guarantee of turnaround time or acceptance. Confirm the receiving location can perform the requested test STAT."},
 {id:"tat",tab:"TAT & setup",title:"Check turnaround time and test setup",intro:"Use regional directory estimates to plan follow-up.",steps:[
 ["Open the turnaround section","In the Collection summary, expand View TAT & Test Set Up."],
 ["Choose the region","Select the relevant region or general directory option. Check the estimate and setup schedule for each selected test where available."],
 ["Interpret the estimate","Turnaround is based on the receiving laboratory’s published information, generally from receipt at the laboratory. Transport, weekends, holidays and testing schedules can affect actual result timing."],
 ["Verify missing information","If a test has no estimate or setup schedule, consult the official directory or contact the receiving laboratory."]],tip:"Do not promise a specific result time based solely on the calculator. STAT routing is a separate check."},
 {id:"missing",tab:"Missing / restricted",title:"Handle tests that cannot be found or added",intro:"Do not bypass restrictions by creating a manual record.",steps:[
 ["Check the exact code","Search by test code, full name and alternate spelling. Open Do Not Perform to see restricted tests; red matches may appear in autocomplete."],
 ["Verify the official directory","Confirm whether the test is supported by the clinic and receiving lab. If a test is restricted, blocked or requires review, contact the lab supervisor before proceeding."],
 ["Request a permanent addition","Send the receiving lab, exact test name, code and official directory information to the lab supervisor."],
 ["Add a missing test if authorized","Use Add a missing test for an appropriate verified test. Enter the exact code, name, initials, specimen, draw and submission containers, volumes, quantities, processing, temperature and applicable handling notes. Use additional container requirements for multi-specimen tests when needed."],
 ["Review manual entries","Check the saved entry and cart output. Manual records are browser-local, not a shared catalog update. Clear manual entries removes browser-added records, not packaged tests."]],tip:"A missing or unmatched test is not evidence that it is safe to collect. Never use a manual entry to circumvent a Do Not Perform restriction."},
 {id:"sendout",tab:"Print & send",title:"Finalize the LAB FLOWSHEET",intro:"Review the complete collection and shipping plan before handing off specimens.",steps:[
 ["Check transport bags","Confirm the receiving lab, room-temperature, refrigerated and frozen groups. Separate STAT and routine shipments and check special transport instructions."],
 ["Review the complete printout","Select Print and review test codes and names, collection containers, processing, submission containers, bag totals, alerts and TAT where available. Ensure the printout matches the actual order and specimens."],
 ["Save or print","Use the print dialog to print or Save as PDF. Download spreadsheet is available for a spreadsheet copy of the summary; it does not replace the required flowsheet."],
 ["Upload and hand off","Upload the PDF to Athena as a Clinical Document labeled LAB FLOWSHEET. For color printing from Athena, open View Original Image first. Follow local requisition, labeling, packaging, pickup and Sendout Log instructions."]],tip:"Use the final reviewed flowsheet for collection and handoff. Follow your clinic’s actual ordering and documentation workflow."}
];
const rememberedFunction={quest:"start",labcorp:"start"};
function functionPanelContent(item){
 return '<div class="calc-fn-intro"><h3>'+E(item.title)+'</h3><p>'+E(item.intro)+'</p></div>'+
 '<ol class="calc-fn-steps">'+item.steps.map((s,i)=>'<li><span class="calc-fn-step-no" aria-hidden="true">'+String(i+1).padStart(2,"0")+'</span><div><h4>'+E(s[0])+'</h4><p>'+E(s[1])+'</p></div></li>').join("")+'</ol>'+
 '<aside class="calc-fn-tip"><strong>Keep in mind</strong><p>'+E(item.tip)+'</p></aside>';
}
function functionGuide(){
 const lab=selectedLab();if(!["quest","labcorp"].includes(lab))return "";
 const active=rememberedFunction[lab]||"start",item=functionGuides.find(x=>x.id===active)||functionGuides[0];
 return '<section class="calc-fn-guide" aria-labelledby="calculator-usage-heading" data-calc-fn-lab="'+E(lab)+'">'+
 '<header class="calc-fn-heading"><div><span class="calc-guide-eyebrow">LAB CALCULATOR · USER GUIDE</span><h2 id="calculator-usage-heading">How to use the '+E(names[lab])+' calculator</h2><p>Choose a function for step-by-step instructions.</p></div><span class="calc-fn-count">'+functionGuides.length+' topics</span></header>'+
 '<div class="calc-fn-tabs" role="tablist" aria-label="Calculator functions">'+functionGuides.map((x,i)=>'<button type="button" role="tab" id="calc-fn-tab-'+x.id+'" data-calc-fn-tab="'+x.id+'" aria-controls="calc-fn-panel" aria-selected="'+(x.id===item.id)+'" tabindex="'+(x.id===item.id?"0":"-1")+'"><span class="calc-fn-tab-no" aria-hidden="true">'+String(i+1).padStart(2,"0")+'</span>'+E(x.tab)+'</button>').join("")+'</div>'+
 '<div id="calc-fn-panel" class="calc-fn-panel" role="tabpanel" tabindex="0" aria-labelledby="calc-fn-tab-'+item.id+'">'+functionPanelContent(item)+'</div></section>';
}
function chooseFunction(tab){
 const root=tab.closest(".calc-fn-guide"),id=tab.dataset.calcFnTab,item=functionGuides.find(x=>x.id===id);
 if(!root||!item||tab.getAttribute("aria-selected")==="true")return;
 rememberedFunction[root.dataset.calcFnLab]=id;
 for(const b of root.querySelectorAll("[data-calc-fn-tab]")){const active=b===tab;b.setAttribute("aria-selected",String(active));b.tabIndex=active?0:-1;}
 const panel=root.querySelector(".calc-fn-panel");
 panel.setAttribute("aria-labelledby",tab.id);
 panel.innerHTML=functionPanelContent(item);
 tab.focus({preventScroll:true});
 if(!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches){
  panel.getAnimations?.().forEach(a=>a.cancel());
  panel.animate?.([{opacity:.4,transform:"translateY(7px)"},{opacity:1,transform:"translateY(0)"}],{duration:220,easing:"ease-out"});
 }
}
document.addEventListener("click",event=>{const tab=event.target.closest?.("[data-calc-fn-tab]");if(tab)chooseFunction(tab);});
document.addEventListener("keydown",event=>{
 const tab=event.target.closest?.("[data-calc-fn-tab]");
 if(!tab||!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
 const tabs=[...tab.closest('[role="tablist"]').querySelectorAll("[data-calc-fn-tab]")],i=tabs.indexOf(tab);
 const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:event.key==="ArrowRight"?(i+1)%tabs.length:(i-1+tabs.length)%tabs.length;
 event.preventDefault();chooseFunction(tabs[next]);
});

window.LAB_CALCULATORS_GUIDE={selector,tabs,functionGuide,molecularFinder,searchSendouts:molecularMatches,selectSendoutSearchResult,scrollToSearchResult,panel,nextActions,isCalculator,selectedLab,selectLab,allows,market,count};
})();