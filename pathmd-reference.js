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
let selectedMarket="socal",selectedClinic="bh";
function setLocation(market,clinic){selectedMarket=market;selectedClinic=clinic;}

function safeSearch(s){return String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/\be\.?\s*coli\b/g,"escherichia coli").replace(/\bstrep a\b/g,"streptococcus pyogenes");}
function searchText(p){
 return safeSearch([p.name,p.category,p.terms,...Object.values(p.groups).flat()].join(" "));
}
function filtered(){
 const needle=safeSearch(query.trim());
 return panels.filter(p=>(category==="All"||p.category===category)&&(!needle||searchText(p).includes(needle)));
}
function highlighted(text){
 const value=String(text),needle=query.trim();
 if(!needle)return e(value);
 const index=value.toLowerCase().indexOf(needle.toLowerCase());
 if(index<0)return e(value);
 return e(value.slice(0,index))+'<mark class="pmd-match">'+e(value.slice(index,index+needle.length))+'</mark>'+e(value.slice(index+needle.length));
}
function groupHtml(groups){
 return Object.entries(groups).map(([kind,values])=>
  '<section class="pmd-analyte-group pmd-analyte-'+e(kind)+'"><h5>'+e(groupNames[kind])+' <small>'+values.length+'</small></h5><div class="pmd-targets">'+
   values.map(value=>'<span class="pmd-target">'+highlighted(value)+'</span>').join("")+'</div></section>').join('');
}
function menuCards(){
 const arr=filtered();
 return '<div class="pmd-results-count" id="pmd-result-count"><strong>'+arr.length+'</strong> of '+panels.length+' menus'+(query?' matching “'+e(query)+'”':'')+'</div>'+
 (arr.length?'<div class="pmd-menu-grid">'+arr.map(p=>
   '<details class="pmd-menu-card" '+(query.trim().length>1?'open':'')+'><summary><span class="pmd-panel-heading"><span class="pmd-panel-category">'+e(p.category)+'</span><strong>'+highlighted(p.name)+'</strong><small>Menu guide · page '+p.page+'</small></span><span class="pmd-expand-arrow" aria-hidden="true"></span></summary>'+
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
 return '<div class="pmd-section-lead"><h4>Submit a PathMD sample</h4><p>Current Sollis workflow: submit an Athena aftercare order, then complete a paper requisition for the specimen.</p></div>'+
 '<div class="pmd-current-flow"><span class="pmd-current-label">CURRENT WORKFLOW</span><strong>Athena aftercare order + paper requisition</strong><span>2 steps</span></div>'+
 '<div class="pmd-ordering-grid">'+
  '<section class="pmd-ordering-card"><div class="pmd-order-card-top"><span class="pmd-order-step">01</span><div><span class="pmd-mini-label">ATHENA</span><h5>Place an aftercare order</h5></div></div>'+
   '<p>In the patient chart, submit an <strong>Aftercare</strong> order to follow up on the requested PathMD panel.</p>'+
   '<div class="pmd-order-example"><span>AFTERCARE ORDER</span><strong>Follow up on &ldquo;[Panel Name]&rdquo;</strong></div>'+
   '<p class="pmd-order-hint">Use the ordered panel name so the follow-up instruction clearly identifies the test.</p>'+
  '</section>'+
  '<section class="pmd-ordering-card"><div class="pmd-order-card-top"><span class="pmd-order-step">02</span><div><span class="pmd-mini-label">PATHMD</span><h5>Complete the paper requisition</h5></div></div>'+
   '<ul class="pmd-order-checklist">'+
    '<li><strong>Full patient name &amp; DOB</strong><small>Apply the Dymo label</small></li>'+
    '<li><strong>Provider name &amp; signature</strong><small>Dr. B by default</small></li>'+
    '<li><strong>Order / panel name</strong><small>Select one test menu only</small></li>'+
    '<li><strong>ICD-10 diagnosis code(s)</strong></li>'+
    '<li><strong>Date of collection &amp; specimen source</strong></li>'+
   '</ul>'+
  '</section></div>'+
 '<p class="pmd-order-footer">After completing both steps, follow the approved PathMD specimen labeling, packaging and clinic courier workflow under <strong>Collection &amp; shipping</strong>.</p>';
}
function shipping(){
 const local=selectedMarket==="socal";
 const base=[
  ["Collect the approved specimen","Follow the exact PathMD test menu's approved collection device and specimen source."],
  ["Label the tube","Write the patient's first and last name AND date of birth directly on the tube."],
  ["Prepare specimen bag","Secure the tube and include the approved requisition and demographic documentation."],
  ["Verify transport conditions","Confirm the temperature-control and packaging instructions for the clinic's approved PathMD service."]
 ];
 const steps=local?base.concat([
  ["Use the local courier","SoCal PathMD specimens use the clinic's local courier pickup, not an assumed FedEx handoff."],
  ["Confirm clinic pickup",selectedClinic==="sm"?"Santa Monica: Monday-Friday, 11:00-11:30 PM. Place sealed specimens in the lockbox.":"The local courier is scheduled daily. Verify the exact pickup time and handoff location at this clinic."],
  ["Document transfer","Log the receiving lab, specimen bag and pickup confirmation under the Lab Sendout Log."]
 ]):base.concat([
  ["Verify service activation","Confirm whether PathMD and the courier service are activated at this clinic."],
  ["Confirm transport procedure","Follow the local authorized shipping or pickup procedure; no pickup window is configured here."],
  ["Document handoff","Record the confirmed carrier, tracking or pickup confirmation in the Sendout Log."]
 ]);
 const optional='<details class="pmd-vendor-rates"><summary><span><strong>Vendor FedEx quick-guide reference</strong><small>Use only when FedEx shipping is the approved routing at your clinic</small></span><span class="pmd-vendor-chevron" aria-hidden="true"></span></summary>'+
  '<div class="pmd-vendor-price-note">The supplied PathMD Quick Guide describes a silver temperature-control bag with two frozen ice packs, placed inside a labeled FedEx bag. These instructions are not a substitute for the SoCal local courier SOP.</div></details>';
 return '<div class="pmd-critical"><strong>Critical specimen labeling</strong><p>The vendor quick guide states that specimens missing the patient first and last name or date of birth directly on the tube are automatically rejected.</p></div>'+
 '<div class="pmd-section-lead"><h4>'+(local?"Collection & local courier":"Collection & transport")+'</h4><p>Verify collection requirements and use the approved route for your clinic.</p></div>'+
 '<section class="pmd-subcard">'+sequence(steps)+'</section>'+
 '<div class="pmd-inline-note"><strong>Before sending:</strong> Confirm the current PathMD kit, specimen handling and clinic-specific transport procedure. Record the handoff.</div>'+
 optional;
}
function results(){
 return '<div class="pmd-section-lead"><h4>Aftercare &amp; results</h4><p>PathMD results flow back to the patient’s chart through Athena.</p></div>'+
 '<div class="pmd-aftercare-flow">'+
  '<section class="pmd-aftercare-card"><span class="pmd-aftercare-icon" aria-hidden="true">1</span><div><span class="pmd-mini-label">RESULT DELIVERY</span><h5>Automatically faxed via Athena</h5><p>Final PathMD results are automatically received by fax through Athena.</p></div></section>'+
  '<section class="pmd-aftercare-card"><span class="pmd-aftercare-icon" aria-hidden="true">2</span><div><span class="pmd-mini-label">CHART MATCHING</span><h5>Matched to the patient chart</h5><p>Athena matches the faxed result to the correct patient chart using the <strong>patient’s full name and date of birth</strong>. Ensure these identifiers are correct on the requisition.</p></div></section>'+
 '</div>'+
 '<div class="pmd-aftercare-note"><strong>Aftercare follow-up:</strong> Confirm the result is attached to the correct chart and follow up on the ordered panel as directed by the provider.</div>'+
 '<details class="pmd-aftercare-reference"><summary>Vendor report interpretation reference <span aria-hidden="true">⌄</span></summary>'+
 '<div><p>The vendor guide organizes antibiotic recommendations by first-line, second-line and, when applicable, third-line options. Multiple detected pathogens should be reviewed individually.</p>'+
 '<p>These are decision-support suggestions, not automatic treatment orders. Clinical decisions depend on the provider’s assessment, specimen source, allergies and any relevant susceptibility testing.</p></div></details>';
}
function pricing(){
 return '<div class="pmd-cap-policy"><div><span>CLINIC CASH-PAY CAP</span><strong>$150 <small>/ test maximum</small></strong></div><p>The current Sollis PathMD cash-pay charge is capped at <strong>$150 per test</strong>. This is a maximum, not the price of every individual assay. Confirm the actual charge and patient eligibility with the billing owner before quoting.</p></div>'+
 '<details class="pmd-vendor-rates"><summary><span><strong>2026 vendor rate sheet</strong><small>Historical vendor list prices, not the Sollis cash-pay rate</small></span><span class="pmd-vendor-chevron" aria-hidden="true"></span></summary>'+
 '<div class="pmd-vendor-price-note">These are vendor list prices from the uploaded schedule. Amounts over $150 are NOT the clinic rate and do not override the per-test cap.</div>'+
 '<div class="pmd-rate-list">'+rates.map(([name,price])=>'<div class="pmd-rate-row"><span>'+e(name)+'</span><strong>'+e(price)+'</strong></div>').join("")+'</div></details>'+
 '<div class="pmd-inline-note"><strong>Eligibility:</strong> The vendor schedule describes uninsured/self-pay eligibility and states payment is due at service. Confirm clinic-approved payment instructions and applicable billing terms. Do not store payment card details here.</div>';
}
function renderContent(){return tab==="menu"?menu():tab==="ordering"?ordering():tab==="shipping"?shipping():tab==="results"?results():pricing();}
function render(){
 return '<section class="pmd-reference" id="pathmd-reference" aria-label="PathMD searchable laboratory reference">'+
 '<div class="pmd-reference-head"><div><span class="pmd-overline">PATHMD REFERENCE LIBRARY</span><h3>Test menus &amp; workflows</h3><p>Search panels and pathogens, or review the current Athena aftercare, paper requisition, courier and results workflow.</p></div><span class="pmd-source-chip">2026 vendor guides</span></div>'+
 '<div class="pmd-reference-stats"><span><strong>15</strong> test menus</span><span><strong>3</strong> source documents</span><span><strong>5</strong> reference sections</span></div>'+
 '<div class="pmd-downloads"><div class="pmd-downloads-heading"><strong>Quick-reference summaries</strong><small>These are shortened Lab Central reference sheets, not the original PathMD documents</small></div>'+
 '<div class="pmd-download-grid">'+
 '<a target="_blank" rel="noopener noreferrer" href="assets/reference-pdfs/pathmd-order-shipping-reference.pdf"><span class="pmd-download-icon">PDF</span><span><strong>Vendor quick-guide summary</strong><small>Legacy portal &amp; FedEx reference, not the current Sollis ordering workflow</small></span><span aria-hidden="true">↗</span></a>'+
 '<a target="_blank" rel="noopener noreferrer" href="assets/reference-pdfs/pathmd-test-menu-index.pdf"><span class="pmd-download-icon">PDF</span><span><strong>Molecular menu index</strong><small>15 panels by clinical category</small></span><span aria-hidden="true">↗</span></a>'+
 '<a target="_blank" rel="noopener noreferrer" href="assets/reference-pdfs/pathmd-cash-pay-cap-reference.pdf"><span class="pmd-download-icon">PDF</span><span><strong>Cash-pay cap</strong><small>$150 maximum per test</small></span><span aria-hidden="true">↗</span></a>'+
 '</div></div>'+
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
function searchForPathogen(term){
 query=String(term||"");
 category="All";
 tab="menu";
}
function openMenu(){
 tab="menu";
 const root=document.getElementById("pathmd-reference");
 if(root)refresh(false);
 const target=document.getElementById("pmd-test-search")||document.getElementById("pathmd-reference");
 target?.scrollIntoView?.({behavior:"smooth",block:"start"});
}
window.LAB_PATHMD_REFERENCE={render,openMenu,setLocation,searchForPathogen,panels,prices:rates};
})();