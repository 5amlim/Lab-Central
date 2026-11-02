/* PathMD reference, sourced from the uploaded November 2026 vendor documents.
 * Test menu: PathMD Molecular Test Menu Guide (3 pages).
 * Operations: PathMD Portal, Paper Requisition, Shipping & Results Quick Guide.
 * Rates: 2026 Patient Cash Pay Fee Schedule. Site validation is still required.
 */
(function(){
"use strict";
const e=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const items=s=>s.split("|").map(x=>x.trim()).filter(Boolean);
const respCore=items("Adenovirus|Coronavirus 229E|Coronavirus HKU1|Coronavirus NL63|Coronavirus OC43|Enterovirus|Human metapneumovirus A|Human metapneumovirus B|Influenza A|Influenza B|Parainfluenza 1|Parainfluenza 2|Parainfluenza 3|Parainfluenza 4|Rhinovirus|RSV|SARS-CoV-2 (COVID-19)");
const respExtended=items("Adenovirus|Bocavirus|Coronavirus 229E|Coronavirus HKU1|Coronavirus NL63|Coronavirus OC43|Epstein-Barr virus (EBV, mononucleosis)|Enterovirus|Human metapneumovirus A|Human metapneumovirus B|Influenza A|Influenza B|Parainfluenza 1|Parainfluenza 2|Parainfluenza 3|Parainfluenza 4|Rhinovirus|RSV|SARS-CoV-2 (COVID-19)");
const giBacteria=items("Clostridioides difficile tcdA|Clostridioides difficile tcdB|Campylobacter spp.|Escherichia coli EIEC|Escherichia coli ETEC|Escherichia coli STEC|Salmonella spp.|Vibrio spp.|Yersinia enterocolitica");
const giViruses=items("Adenovirus F40/F41|Astrovirus|Norovirus GI/GII|Rotavirus A");
const abxBacteria=items("Acinetobacter baumannii|Chlamydia trachomatis|Citrobacter freundii|Enterobacter cloacae|Enterococcus faecium/faecalis|Escherichia coli|Klebsiella aerogenes|Klebsiella oxytoca|Klebsiella pneumoniae|Morganella morganii|Mycoplasma genitalium|Neisseria gonorrhoeae|Proteus mirabilis|Proteus vulgaris|Pseudomonas aeruginosa|Serratia marcescens|Staphylococcus aureus|Staphylococcus saprophyticus|Streptococcus agalactiae");
const abxFungi=items("Candida albicans|Candida dubliniensis/lusitaniae/tropicalis (group)|Candida glabrata|Candida krusei|Candida parapsilosis");
const abxMarkers=items("Beta lactamase ampC|Beta lactamase CTX-M group 1|Beta lactamase CTX-M group 2|Beta lactamase SHV|Beta lactamase TEM|Carbapenem OXA-48|Carbapenem blaNDM/blaKPC|Fluoroquinolone gyrA|Fluoroquinolone parC|Fluoroquinolone qnrA|Fluoroquinolone qnrB|Fosfomycin fosA|Methicillin mecA|Sulfonamide sul|Tetracycline tetM/tetB/tetO|Trimethoprim dfrA|Vancomycin vanA|Vancomycin vanB");
const panels=[
 {id:"resp-plus",category:"Respiratory",name:"Respiratory Plus Panel",page:1,terms:"upper respiratory comprehensive respiratory plus",groups:{
  bacterial:items("Acinetobacter baumannii|Bordetella pertussis|Chlamydophila pneumoniae|Enterobacter cloacae|Haemophilus influenzae|Klebsiella aerogenes|Klebsiella pneumoniae|Legionella pneumophila|Moraxella catarrhalis|Mycoplasma pneumoniae|Proteus mirabilis|Pseudomonas aeruginosa|Staphylococcus aureus|Staphylococcus epidermidis|Streptococcus pneumoniae|Streptococcus pyogenes (Group A)"),
  viral:respExtended,resistance:items("Methicillin/Oxacillin mecA")}},
 {id:"resp-lite",category:"Respiratory",name:"Respiratory Lite Panel",page:1,terms:"small flu covid strep sore throat",groups:{
  bacterial:items("Haemophilus influenzae|Moraxella catarrhalis|Mycoplasma pneumoniae|Streptococcus pyogenes (Group A)"),
  viral:items("Influenza A|Influenza B|RSV|SARS-CoV-2 (COVID-19)")}},
 {id:"covid-flu-rsv",category:"Respiratory",name:"COVID / Flu / RSV",page:1,terms:"5 plex 5-plex influenza covid flu viral",groups:{
  viral:items("SARS-CoV-2|Influenza A virus RNA|Influenza B virus RNA|Respiratory syncytial virus (RSV) RNA")}},
 {id:"strep-a",category:"Respiratory",name:"Streptococcus pyogenes (Group A Strep) Panel",page:1,terms:"strep a group a GAS sore throat",groups:{
  bacterial:items("Streptococcus pyogenes (Group A Strep)")}},
 {id:"peds-resp",category:"Respiratory",name:"Pediatrics Respiratory Panel",page:1,terms:"pediatric children paediatric",groups:{
  bacterial:items("Bordetella pertussis|Chlamydophila pneumoniae|Legionella pneumophila|Mycoplasma pneumoniae"),
  viral:items("Adenovirus|Coronavirus 229E|Coronavirus HKU1|Coronavirus NL63|Coronavirus OC43|Epstein-Barr virus (EBV, mononucleosis)|Enterovirus|Human metapneumovirus A|Human metapneumovirus B|Influenza A|Influenza B|Parainfluenza 1|Parainfluenza 2|Parainfluenza 3|Parainfluenza 4|Rhinovirus|RSV|SARS-CoV-2 (COVID-19)")}},
 {id:"resp-limited",category:"Respiratory",name:"Limited Respiratory Panel",page:1,terms:"limited respiratory",groups:{
  bacterial:items("Bordetella pertussis|Chlamydophila pneumoniae|Mycoplasma pneumoniae|Streptococcus pneumoniae|Streptococcus pyogenes (Group A)"),viral:respCore}},
 {id:"gi",category:"Gastrointestinal",name:"Gastrointestinal Pathogen Panel",page:1,terms:"GI stool diarrhea gastro stool test",groups:{
  bacterial:giBacteria,viral:giViruses,parasitic:items("Cryptosporidium spp.|Entamoeba histolytica|Giardia lamblia")}},
 {id:"gi-plus",category:"Gastrointestinal",name:"Gastrointestinal Plus Pathogen Panel",page:1,terms:"GI plus stool cyclospora diarrhea",groups:{
  bacterial:giBacteria,viral:giViruses,parasitic:items("Cryptosporidium spp.|Cyclospora|Entamoeba histolytica|Giardia lamblia")}},
 {id:"wound",category:"Wound",name:"Wound Pathogen Detection with ABX",page:2,terms:"wound wound panel resistance",groups:{
  bacterial:abxBacteria,fungal:abxFungi,parasitic:items("Trichomonas vaginalis"),resistance:abxMarkers}},
 {id:"uti",category:"Urinary",name:"Urinary Tract Pathogen Detection with ABX",page:2,terms:"UTI urine urinary panel bladder",groups:{
  bacterial:abxBacteria,fungal:abxFungi,parasitic:items("Trichomonas vaginalis"),resistance:abxMarkers}},
 {id:"sti",category:"Sexual health",name:"STI Pathogen Detection Test",page:2,terms:"sexually transmitted infection STD",groups:{
  bacterial:items("Chlamydia trachomatis|Haemophilus ducreyi|Mycoplasma genitalium|Mycoplasma hominis|Neisseria gonorrhoeae|Treponema pallidum|Ureaplasma urealyticum"),
  viral:items("Herpes simplex virus 1 (HSV-1)|Herpes simplex virus 2 (HSV-2)"),
  parasitic:items("Trichomonas vaginalis")}},
 {id:"sti-vaginitis",category:"Sexual health",name:"STI with Vaginitis Pathogen Detection",page:2,terms:"STI vaginitis BV candida STD",groups:{
  bacterial:items("Atopobium vaginae|Bacteroides fragilis|BVAB-2|Chlamydia trachomatis|Escherichia coli|Enterococcus spp.|Gardnerella vaginalis|Haemophilus ducreyi|Lactobacillus crispatus|Lactobacillus gasseri|Lactobacillus iners|Lactobacillus jensenii|Megasphaera type 1|Megasphaera type 2|Mobiluncus curtisii|Mobiluncus mulieris|Mycoplasma genitalium|Mycoplasma hominis|Neisseria gonorrhoeae|Prevotella bivia|Staphylococcus aureus|Streptococcus agalactiae (Group B)|Treponema pallidum|Ureaplasma urealyticum"),
  viral:items("Herpes simplex virus 1 (HSV-1)|Herpes simplex virus 2 (HSV-2)"),
  fungal:items("Candida albicans|Candida dubliniensis|Candida glabrata|Candida krusei|Candida lusitaniae|Candida parapsilosis|Candida tropicalis"),
  parasitic:items("Trichomonas vaginalis")}},
 {id:"fungal",category:"Fungal",name:"Fungal Panel, RT-PCR",page:2,terms:"fungus yeast mold fungal skin",groups:{
  fungal:items("Alternaria spp.|Aspergillus spp.|Candida albicans|Candida glabrata|Candida krusei|Candida parapsilosis|Candida tropicalis|Cryptococcus spp.|Curvularia spp.|Epidermophyton floccosum|Fusarium spp.|Malassezia spp.|Meyerozyma guilliermondii|Microsporum canis|Sarocladium strictum|Scytalidium dimidiatum|Trichophyton anthropophilic spp.|Trichophyton zoophilic spp.|Trichosporon spp."),
  bacterial:items("Pseudomonas aeruginosa"),resistance:items("mecA (oxacillin resistance)")}},
 {id:"pre-op",category:"Other",name:"Pre-Procedure / Pre-Surgery Pathogen Detection with ABX",page:3,terms:"preoperative surgery presurgery pre-procedure",groups:{
  bacterial:abxBacteria,fungal:abxFungi,parasitic:items("Trichomonas vaginalis"),resistance:abxMarkers}},
 {id:"prostatitis",category:"Urinary",name:"Prostatitis Pathogen Detection with ABX",page:3,terms:"prostate male genital urinary",groups:{
  bacterial:items("Acinetobacter baumannii|Chlamydia trachomatis|Citrobacter freundii|Enterobacter cloacae|Enterococcus faecium/faecalis|Escherichia coli|Gardnerella vaginalis|Haemophilus ducreyi|Klebsiella aerogenes|Klebsiella oxytoca|Klebsiella pneumoniae|Morganella morganii|Mycoplasma genitalium|Mycoplasma hominis|Neisseria gonorrhoeae|Proteus mirabilis|Proteus vulgaris|Pseudomonas aeruginosa|Serratia marcescens|Staphylococcus aureus|Staphylococcus saprophyticus|Streptococcus agalactiae|Treponema pallidum|Ureaplasma urealyticum"),
  viral:items("Herpes simplex virus 1 (HSV-1)|Herpes simplex virus 2 (HSV-2)"),fungal:abxFungi,parasitic:items("Trichomonas vaginalis"),resistance:abxMarkers}}
];
const rates=[
 ["Strep A","$35"],["5 Plex (COVID, RSV, Flu A/B)","$137"],["COVID Plus","$195"],
 ["Stool Test","$225"],["Stool Test with Cyclospora","$265"],["Respiratory Panel","$225"],
 ["Fungal Panel","$350"],["UTI Panel","$450"],["Vaginitis / STI Panel","$450"],
 ["Pre-procedure Panel","$450"],["Wound Panel","$450"],["Prostatitis Panel","$450"],
 ["Urinalysis","$10"]
];
const categoryOptions=["All","Respiratory","Gastrointestinal","Urinary","Sexual health","Wound","Fungal","Other"];
const tabOptions=[["menu","Test menu"],["ordering","Ordering"],["shipping","Collection & shipping"],["results","Results"],["rates","Cash-pay rates"]];
const groupNames={bacterial:"Bacterial",viral:"Viral",fungal:"Fungal / yeast",parasitic:"Parasite / protozoal",resistance:"Resistance markers"};
let tab="menu",category="All",query="";
function safeSearch(s){return String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"");}
function searchText(p){
 return safeSearch([p.name,p.category,p.terms,...Object.values(p.groups).flat()].join(" "));
}
function filtered(){
 const needle=safeSearch(query.trim());
 return panels.filter(p=>(category==="All"||p.category===category)&&(!needle||searchText(p).includes(needle)));
}
function groupHtml(groups){
 return Object.entries(groups).map(([kind,values])=>
  '<section class="pmd-analyte-group pmd-analyte-'+e(kind)+'"><h5>'+e(groupNames[kind])+' <small>'+values.length+'</small></h5><div class="pmd-targets">'+
   values.map(value=>'<span class="pmd-target">'+e(value)+'</span>').join("")+'</div></section>').join('');
}
function menuCards(){
 const arr=filtered();
 return '<div class="pmd-results-count" id="pmd-result-count"><strong>'+arr.length+'</strong> of '+panels.length+' menus'+(query?' matching “'+e(query)+'”':'')+'</div>'+
 (arr.length?'<div class="pmd-menu-grid">'+arr.map(p=>
   '<details class="pmd-menu-card" '+(query.trim().length>1?'open':'')+'><summary><span class="pmd-panel-heading"><span class="pmd-panel-category">'+e(p.category)+'</span><strong>'+e(p.name)+'</strong><small>Menu guide · page '+p.page+'</small></span><span class="pmd-expand-arrow" aria-hidden="true"></span></summary>'+
   '<div class="pmd-menu-body">'+groupHtml(p.groups)+'</div></details>').join("")+'</div>':
 '<div class="pmd-no-results"><strong>No matching test menus</strong><p>Try a pathogen name, panel name or category, or clear the search.</p><button type="button" data-pmd-clear>Clear search &amp; filters</button></div>');
}
function menu(){
 return '<div class="pmd-searchbar"><label for="pmd-test-search">Search test menus &amp; pathogens</label>'+
  '<div class="pmd-search-wrap"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input id="pmd-test-search" type="search" autocomplete="off" placeholder="e.g. RSV, Candida, UTI, mecA, GI..." value="'+e(query)+'"><span class="pmd-search-key">15 menus</span></div></div>'+
  '<div class="pmd-filter-list" aria-label="Filter PathMD test panels">'+categoryOptions.map(c=>
    '<button type="button" data-pmd-category="'+e(c)+'" aria-pressed="'+(category===c)+'" class="pmd-filter'+(category===c?' is-selected':'')+'">'+e(c)+'</button>').join("")+'</div>'+
  '<div id="pmd-menu-results">'+menuCards()+'</div>'+
  '<p class="pmd-reference-warning"><strong>Collection requirements:</strong> The supplied molecular menu lists detectable targets, not test-specific specimen media, volumes, stability or order codes. Confirm these with PathMD and the current approved SOP before collection. A detected resistance gene is not the same as a phenotypic susceptibility result.</p>';
}
const sequence=(arr)=>'<ol class="pmd-steps">'+arr.map(([heading,body],i)=>
 '<li><span class="pmd-step-number">'+String(i+1).padStart(2,"0")+'</span><div><strong>'+e(heading)+'</strong><p>'+e(body)+'</p></div></li>').join('')+'</ol>';
function ordering(){
 const portal=[
  ["Create requisition","Log in and choose Create Requisition. Confirm the correct clinic location and provider."],
  ["Add patient","+ Patient: complete all required fields, then Save & Exit."],
  ["Add insurance","Enter primary insurance and subscriber ID, then Save & Exit."],
  ["Record diagnosis and timing","Enter one or two ICD-10 codes and confirm specimen collection date and time."],
  ["Select one test menu","Choose Add Test and select the single approved PathMD test menu."],
  ["Specify source and site","Enter specimen source and collection site, such as swab / throat or nasal."],
  ["Complete and print","Review, choose Save & Exit, then Yes. Print the requisition and patient demographic sheet for the specimen bag."]
 ];
 const paper=[
  ["Confirm provider and patient","Select the correct provider, then enter patient's first and last name and date of birth."],
  ["Document clinical details","Write the appropriate ICD-10 code(s), collection date and swab source / collection site."],
  ["Choose one menu only","Mark one approved test menu, not multiple panels on the same requisition."]
 ];
 return '<div class="pmd-section-lead"><h4>Prepare the PathMD requisition</h4><p>Choose the clinic-approved ordering method. Follow the source guide for all mandatory fields.</p></div>'+
 '<div class="pmd-two-column"><section class="pmd-subcard"><div class="pmd-subcard-heading"><span class="pmd-mini-label">PORTAL</span><h5>Electronic requisition</h5></div>'+sequence(portal)+'</section>'+
 '<section class="pmd-subcard"><div class="pmd-subcard-heading"><span class="pmd-mini-label">BACKUP</span><h5>Paper requisition</h5></div>'+sequence(paper)+
 '<div class="pmd-mini-notice">Use the location and provider authorized for this clinic. Do not place patient information into this reference site.</div></section></div>';
}
function shipping(){
 const steps=[
  ["Collect the approved specimen","Follow the test-specific PathMD collection medium and specimen source instructions."],
  ["Label the collection tube","Write the patient's first and last name AND date of birth directly on the tube."],
  ["Prepare specimen bag","Place the closed specimen tube in a specimen bag with the printed requisition and demographic sheet."],
  ["Use temperature-control bag","Place the specimen bag inside the silver temperature-control bag."],
  ["Add frozen packs","Add exactly two frozen ice packs, as specified in the supplied shipping quick guide."],
  ["Pack FedEx shipment","Close the silver bag, place it inside the FedEx shipping bag and apply the FedEx label."],
  ["Seal and hand off","Seal the FedEx bag and leave it for the scheduled clinic FedEx pickup. Log the handoff."]
 ];
 return '<div class="pmd-critical"><strong>Critical labeling requirement</strong><p>The PathMD quick guide states that specimens missing the patient’s first and last name or date of birth on the tube are automatically rejected.</p></div>'+
 '<div class="pmd-section-lead"><h4>Package and ship</h4><p>Seven checkpoints from specimen collection to FedEx pickup.</p></div>'+
 '<section class="pmd-subcard">'+sequence(steps)+'</section>'+
 '<div class="pmd-inline-note"><strong>Before sending:</strong> Confirm the current receiving-lab packing instructions, cold-chain requirements and pickup schedule for your clinic. Keep extra ice packs frozen and ready.</div>';
}
function results(){
 return '<div class="pmd-section-lead"><h4>Find and review results</h4><p>Based on the PathMD portal and results quick guide.</p></div>'+
 '<div class="pmd-two-column"><section class="pmd-subcard"><h5>Result retrieval</h5>'+sequence([
  ["Watch for the final report","The provided guide describes a result notification by email and fax after finalization."],
  ["Open the PathMD portal","Go to All Requisitions, open the correct patient record and select Preview Result."],
  ["Review the report","Check detected pathogens and any reported resistance markers against the ordered panel."]
 ])+'</section>'+
 '<section class="pmd-subcard"><h5>Antibiotic recommendations</h5><p class="pmd-paragraph">The vendor guide groups antibiotic recommendations by line: first-line options at the top, then second-line, and third-line if present.</p>'+
 '<p class="pmd-paragraph">If multiple pathogens are detected, compare the individual pathogen rows and candidate options. The result is decision support, not an automatic prescription.</p>'+
 '<div class="pmd-mini-notice"><strong>Clinical caution:</strong> Treatment decisions require the provider’s assessment of symptoms, specimen source, allergies, local guidance and culture or susceptibility testing when indicated. Resistance-marker detection alone does not establish the full susceptibility profile.</div></section></div>';
}
function pricing(){
 return '<div class="pmd-section-lead"><h4>2026 patient cash-pay schedule</h4><p>Reference rates transcribed from the uploaded PathMD schedule. These names are billing categories and are not necessarily identical to the molecular menu titles.</p></div>'+
 '<div class="pmd-rate-list">'+rates.map(([name,price])=>'<div class="pmd-rate-row"><span>'+e(name)+'</span><strong>'+e(price)+'</strong></div>').join("")+'</div>'+
 '<div class="pmd-critical pmd-rate-warning"><strong>Eligibility and payment</strong><p>The 2026 document restricts cash rates to uninsured, self-pay patients. Patients with active insurance are ineligible under the vendor’s stated policy. Confirm current pricing and payment procedures directly with PathMD; do not store or enter payment card information in Lab Central.</p></div>';
}
function renderContent(){return tab==="menu"?menu():tab==="ordering"?ordering():tab==="shipping"?shipping():tab==="results"?results():pricing();}
function render(){
 return '<section class="pmd-reference" id="pathmd-reference" aria-label="PathMD searchable laboratory reference">'+
 '<div class="pmd-reference-head"><div><span class="pmd-overline">PATHMD REFERENCE LIBRARY</span><h3>Test menus &amp; workflows</h3><p>Search targets and panels, or open a focused guide for ordering, shipping, results and patient cash-pay rates.</p></div><span class="pmd-source-chip">2026 vendor guides</span></div>'+
 '<div class="pmd-reference-stats"><span><strong>15</strong> test menus</span><span><strong>3</strong> source documents</span><span><strong>5</strong> reference sections</span></div>'+
 '<div class="pmd-tabs" role="tablist" aria-label="PathMD reference sections">'+tabOptions.map(([id,label])=>
  '<button type="button" role="tab" id="pmd-tab-'+id+'" data-pmd-tab="'+id+'" aria-selected="'+(id===tab)+'" aria-controls="pmd-tab-panel" tabindex="'+(tab===id?'0':'-1')+'" class="pmd-tab'+(tab===id?' is-active':'')+'">'+e(label)+'</button>').join("")+'</div>'+
 '<div id="pmd-tab-panel" role="tabpanel" aria-labelledby="pmd-tab-'+tab+'" tabindex="0" class="pmd-tab-panel">'+renderContent()+'</div>'+
 '<div class="pmd-source-foot"><strong>Source references</strong><span>PathMD Molecular Test Menu Guide, pages 1–3 · PathMD Portal, Paper Requisition, Shipping &amp; Results Quick Guide · 2026 Patient Cash Pay Fee Schedule</span></div>'+
 '</section>';
}
function refresh(focusTab=false){
 const old=document.getElementById("pathmd-reference");
 if(!old)return;
 old.outerHTML=render();
 if(focusTab)document.querySelector(".pmd-tab.is-active")?.focus({preventScroll:true});
}
document.addEventListener("click",event=>{
 const tabBtn=event.target.closest("#pathmd-reference [data-pmd-tab]");
 if(tabBtn){
  if(tabOptions.some(x=>x[0]===tabBtn.dataset.pmdTab)){tab=tabBtn.dataset.pmdTab;refresh(true);}
  return;
 }
 const filter=event.target.closest("#pathmd-reference [data-pmd-category]");
 if(filter){category=filter.dataset.pmdCategory;refresh();document.querySelector('[data-pmd-category="'+CSS.escape(category)+'"]')?.focus({preventScroll:true});return;}
 if(event.target.closest("#pathmd-reference [data-pmd-clear]")){query="";category="All";refresh();document.querySelector("#pmd-test-search")?.focus({preventScroll:true});}
});
document.addEventListener("input",event=>{
 if(event.target?.id!=="pmd-test-search")return;
 query=event.target.value;
 const results=document.getElementById("pmd-menu-results");
 if(results)results.innerHTML=menuCards();
});
document.addEventListener("keydown",event=>{
 const tabBtn=event.target.closest("#pathmd-reference .pmd-tab");
 if(!tabBtn||!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
 event.preventDefault();
 const ids=tabOptions.map(x=>x[0]),i=ids.indexOf(tabBtn.dataset.pmdTab);
 tab=event.key==="ArrowRight"?ids[(i+1)%ids.length]:event.key==="ArrowLeft"?ids[(i-1+ids.length)%ids.length]:event.key==="Home"?ids[0]:ids[ids.length-1];
 refresh(true);
});
window.LAB_PATHMD_REFERENCE={render,panels,prices:rates};
})();