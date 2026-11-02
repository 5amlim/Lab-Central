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

/* Visual collection instructions reused on every PathMD panel. */
function pmdPicture(kind){
 const bg='<svg viewBox="0 0 190 118" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="190" height="118" rx="12" fill="#f4f8fc"/><ellipse cx="95" cy="103" rx="63" ry="5" fill="#dce7ee" opacity=".7"/>';
 const cup='<path d="M52 37h86l-9 56a7 7 0 0 1-7 6H68a7 7 0 0 1-7-6z" fill="#fff" stroke="#9eb5c4" stroke-width="2"/><rect x="47" y="31" width="96" height="8" rx="4" fill="#fff" stroke="#9eb5c4" stroke-width="2"/>';
 const urine=cup+'<path d="M62 70h66l-4 23H67z" fill="#f5d775" opacity=".75"/><path d="M63 71q16-5 32 0t32 0" stroke="#e4b64b" stroke-width="2" fill="none"/>';
 const stool=cup+'<path d="M64 82q14-11 23-4 12-13 25-1 14-3 15 14H66z" fill="#a57a5d"/><path d="M76 87q10-6 20-4m3 5q10-6 19-3" stroke="#805d48" stroke-width="2" fill="none"/>';
 const tube='<rect x="76" y="31" width="38" height="65" rx="8" fill="#fff" stroke="#93abba" stroke-width="2"/><path d="M81 71h28v18a5 5 0 0 1-5 5H86a5 5 0 0 1-5-5z" fill="#d9f3ee"/><rect x="71" y="22" width="48" height="18" rx="5" fill="#fff" stroke="#839dab" stroke-width="2"/><path d="M79 26v10m8-10v10m8-10v10m8-10v10m8-10v10" stroke="#d9e2e8" stroke-width="1.5"/>';
 const swab='<path d="M43 22L101 74" stroke="#b8a38a" stroke-width="5" stroke-linecap="round"/><ellipse cx="105" cy="78" rx="7" ry="10" transform="rotate(-41 105 78)" fill="#fff" stroke="#9cafbf" stroke-width="2"/>';
 let art='';
 if(kind==="urine-cup")art=urine+'<path d="M87 16v13" stroke="#c6a64b" stroke-width="3" stroke-linecap="round"/><path d="M82 23l5 6 5-6" fill="none" stroke="#c6a64b" stroke-width="2"/>';
 else if(kind==="urine-mix")art=urine+'<path d="M83 22l17 63" stroke="#b8a38a" stroke-width="5" stroke-linecap="round"/><ellipse cx="101" cy="87" rx="6" ry="8" fill="#fff" stroke="#abc0c9" stroke-width="1.5"/><path d="M110 52q19 11 2 27" stroke="#739fa8" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M117 78l-6 2 1-7" fill="#739fa8"/><rect x="124" y="11" width="52" height="25" rx="12" fill="#e6f3f1" stroke="#b6dcd4"/><text x="150" y="28" text-anchor="middle" fill="#24776b" font-family="Arial,sans-serif" font-size="13" font-weight="bold">× 10</text>';
 else if(kind==="stool-cup")art=stool+'<path d="M85 16v12" stroke="#9c7b5d" stroke-width="2.5" stroke-linecap="round"/><path d="M80 23l5 6 5-6" fill="none" stroke="#9c7b5d" stroke-width="2"/>';
 else if(kind==="stool-swab")art=stool+'<path d="M55 17l55 63" stroke="#b8a38a" stroke-width="5" stroke-linecap="round"/><ellipse cx="111" cy="82" rx="8" ry="11" transform="rotate(-40 111 82)" fill="#987359" stroke="#785741" stroke-width="1.6"/><circle cx="119" cy="78" r="3" fill="#b18b6d"/>';
 else if(kind==="collect-swab")art=swab+'<path d="M123 39c10 5 16 14 18 23m-13-30c14 7 23 20 25 33" stroke="#8cb6af" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="154" cy="26" r="7" fill="#e1f2ee"/><path d="M154 22v8m-4-4h8" stroke="#538e82" stroke-width="2"/>';
 else if(kind==="swab-tube")art=tube+'<path d="M95 2v54" stroke="#ae9b82" stroke-width="4" stroke-linecap="round"/><ellipse cx="95" cy="58" rx="6" ry="9" fill="#fff" stroke="#9db5c3" stroke-width="1.5"/><path d="M130 58h28m-8-6 8 6-8 6" fill="none" stroke="#789eaa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
 else if(kind==="stool-tube")art=tube+'<path d="M95 2v54" stroke="#ae9b82" stroke-width="4" stroke-linecap="round"/><ellipse cx="95" cy="58" rx="7" ry="10" fill="#9d7559" stroke="#775844" stroke-width="1.5"/><circle cx="91" cy="55" r="2" fill="#c39b79"/><circle cx="99" cy="61" r="2" fill="#c39b79"/>';
 else if(kind==="label")art=tube+'<rect x="76" y="42" width="38" height="34" rx="3" fill="#f7f3fe" stroke="#a79ac3"/><path d="M81 48h28m-28 6h22m-22 6h28m-28 6h20m-20 5h25" stroke="#9181b4" stroke-width="2" stroke-linecap="round"/><rect x="121" y="28" width="57" height="53" rx="7" fill="#fff" stroke="#d9cfe8"/><path d="M129 41h40m-40 9h34m-34 9h40m-40 9h30" stroke="#bcafd4" stroke-width="2" stroke-linecap="round"/>';
 else if(kind==="seal")art=tube+'<circle cx="146" cy="64" r="20" fill="#e3f5ec" stroke="#b8dcca"/><path d="m136 64 7 7 13-16" fill="none" stroke="#3d9470" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
 return bg+art+'</svg>';
}
const pmdLabels='<strong>Label the tube itself:</strong> patient first and last name, DOB, collection <strong>date and time</strong>, <strong>specimen source</strong> and <strong>collector initials</strong>. Keep the barcode readable.';
function pmdCollectionMode(p){
 if(p.id==="gi"||p.id==="gi-plus")return "stool";
 if(p.id==="uti"||p.id==="prostatitis")return "urine";
 if(p.id==="sti"||p.id==="sti-vaginitis")return "urine-or-swab";
 return "swab";
}
function pmdCollectionSteps(mode){
 if(mode==="urine")return [
  ["Collect urine","Collect the urine specimen in a sterile cup.","urine-cup"],
  ["Mix with the thick swab","Place the thick swab into the urine in the sterile cup and mix 10 times.","urine-mix"],
  ["Place swab into white-top tube","Place the urine-exposed thick swab into the PathMD white-top tube. No transfer pipette is needed.","swab-tube"]
 ];
 if(mode==="stool")return [
  ["Collect stool","Collect the stool specimen in a sterile cup.","stool-cup"],
  ["Load the thick swab","Pick up a good amount of stool with the thick swab, leaving a visible stool specimen on the tip.","stool-swab"],
  ["Place swab into white-top tube","Insert the thick swab WITH the collected stool on it into the PathMD white-top tube.","stool-tube"]
 ];
 return [
  ["Collect the ordered swab specimen","Use the approved swab and collection procedure for the anatomical source ordered on the panel.","collect-swab"],
  ["Place swab into white-top tube","Place the collected swab into the PathMD white-top tube following the approved kit instructions.","swab-tube"]
 ];
}
function pmdStepCards(mode){
 return '<div class="pmd-collection-steps">'+pmdCollectionSteps(mode).map(([title,description,picture],index)=>
  '<div class="pmd-collection-step"><div class="pmd-step-picture">'+pmdPicture(picture)+'</div><div class="pmd-collection-step-copy"><span class="pmd-collection-step-no">STEP '+String(index+1).padStart(2,"0")+'</span><strong>'+e(title)+'</strong><p>'+e(description)+'</p></div></div>').join('')+'</div>';
}
function pmdCollection(p){
 const mode=pmdCollectionMode(p);
 const note=mode==="urine"?"URINE · THICK SWAB × 10":mode==="stool"?"STOOL · THICK SWAB":mode==="urine-or-swab"?"URINE OR SITE SWAB":"APPROVED SITE SWAB";
 const paths=mode==="urine-or-swab"?
  '<div class="pmd-collection-path"><h5>Urine specimen</h5><p>When urine is the approved specimen source for the ordered panel:</p>'+pmdStepCards("urine")+'</div>'+
  '<div class="pmd-collection-path"><h5>Swab specimen</h5><p>When a site-specific swab is the approved specimen source:</p>'+pmdStepCards("swab")+'</div>':
  pmdStepCards(mode);
 return '<section class="pmd-collection" aria-label="Specimen collection instructions for '+e(p.name)+'">'+
  '<div class="pmd-collection-heading"><div><span class="pmd-mini-label">SPECIMEN COLLECTION</span><h4>How to collect</h4></div>'+
  '<div class="pmd-collection-tags"><span>1 WHITE-TOP TUBE</span><span>'+note+'</span></div></div>'+
  '<p class="pmd-collection-intro">Use one PathMD white-top transport tube for this panel. Confirm the ordered specimen source is approved before collection.</p>'+
  paths+
  '<div class="pmd-label-instruction"><div class="pmd-label-art">'+pmdPicture("label")+'</div><div><span class="pmd-collection-step-no">REQUIRED ON EVERY TUBE</span><p>'+pmdLabels+'</p></div></div>'+
  '<div class="pmd-collection-foot">Close the tube securely. Match the tube with the completed paper requisition and follow the clinic-approved PathMD pickup procedure.</div>'+
  '</section>';
}

function pmdTargetSection(p){
 const targetCount=Object.values(p.groups).reduce((sum,items)=>sum+items.length,0);
 return '<section class="pmd-panel-target-section" aria-label="Pathogens and markers in '+e(p.name)+'">'+
  '<header class="pmd-panel-target-header"><div><span class="pmd-mini-label">TEST MENU</span><h4>Pathogens &amp; markers</h4><p>Organisms and resistance markers included in this panel</p></div>'+
  '<span class="pmd-panel-target-count">'+targetCount+' targets</span></header>'+
  '<div class="pmd-panel-target-list">'+groupHtml(p.groups)+'</div></section>';
}
function menuCards(){
 const arr=filtered();
 return '<div class="pmd-results-count" id="pmd-result-count"><strong>'+arr.length+'</strong> of '+panels.length+' menus'+(query?' matching “'+e(query)+'”':'')+'</div>'+
 (arr.length?'<div class="pmd-menu-grid">'+arr.map(p=>
   '<details class="pmd-menu-card" '+(query.trim().length>1&&arr.length===1?'open':'')+'><summary><span class="pmd-panel-heading"><span class="pmd-panel-category">'+e(p.category)+'</span><strong>'+highlighted(p.name)+'</strong><small>Menu guide · page '+p.page+'</small></span><span class="pmd-expand-arrow" aria-hidden="true"></span></summary>'+
   '<div class="pmd-menu-body">'+pmdTargetSection(p)+pmdCollection(p)+'</div></details>').join("")+'</div>':
 '<div class="pmd-no-results"><strong>No matching test menus</strong><p>Try a pathogen name, panel name or category, or clear the search.</p><button type="button" data-pmd-clear>Clear search &amp; filters</button></div>');
}
function menu(){
 return '<div class="pmd-searchbar"><label for="pmd-test-search">Search test menus &amp; pathogens</label>'+
  '<div class="pmd-search-wrap"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input id="pmd-test-search" type="search" autocomplete="off" placeholder="e.g. RSV, Candida, UTI, mecA, GI..." value="'+e(query)+'"><span class="pmd-search-key">15 menus</span></div></div>'+
  '<div class="pmd-filter-list" aria-label="Filter PathMD test panels">'+categoryOptions.map(c=>
    '<button type="button" data-pmd-category="'+e(c)+'" aria-pressed="'+(category===c)+'" class="pmd-filter'+(category===c?' is-selected':'')+'">'+e(c)+'</button>').join("")+'</div>'+
  '<div id="pmd-menu-results">'+menuCards()+'</div>'+
  '<p class="pmd-reference-warning"><strong>Collection reference:</strong> Use one white-top PathMD tube per panel, with the specimen-source technique shown inside each menu. Confirm approved sources, collection details and handling with the current PathMD SOP. Resistance genes are not the same as phenotypic susceptibility results.</p>';
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
  ["Collect into a PathMD white-top tube","Use one white-top tube for the ordered panel. For urine, mix the thick swab in a sterile urine cup 10 times and place the swab in the tube, without a pipette. For GI, collect stool on the thick swab and put the swab with stool into the tube. See each test menu for illustrated steps."],
  ["Label the tube","Write patient first and last name, DOB, collection date and time, specimen source, and collector initials directly on the tube. Do not cover the barcode."],
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