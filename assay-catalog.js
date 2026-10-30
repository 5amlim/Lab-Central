/* Lab Central assay menus: names, categorized targets, and per-assay CLIA badges.
   Verify the product-specific IFU and local certificate before use. */
(function(){
'use strict';
const A=(s)=>s.split('|').map(x=>x.trim()).filter(Boolean);
const tests={
 piccolo:[
  {title:'Comprehensive Metabolic Panel',short:'CMP',color:'#e43c33',complexity:'waived',groups:{'Measured analytes':A('Albumin|Alkaline phosphatase|Alanine aminotransferase|Aspartate aminotransferase|Blood urea nitrogen|Calcium|Chloride|Creatinine|Glucose|Potassium|Sodium|Total bilirubin|Total carbon dioxide|Total protein'),'Calculated result':A('Estimated glomerular filtration rate')},source:'https://www.abaxis.com/panels/comprehensive-metabolic-panel/'},
  {title:'Basic Metabolic Panel',short:'BMP',color:'#9dbce5',complexity:'waived',groups:{'Measured analytes':A('Blood urea nitrogen|Calcium|Chloride|Creatinine|Glucose|Potassium|Sodium|Total carbon dioxide'),'Calculated result':A('Estimated glomerular filtration rate')},source:'https://www.abaxis.com/panels/basic-metabolic-panel/'},
  {title:'MetLyte Plus C-Reactive Protein',short:'MetLyte + CRP',color:'#e9b41e',complexity:'moderate',groups:{'Measured analytes':A('Blood urea nitrogen|Chloride|Creatine kinase|Creatinine|C-reactive protein|Glucose|Potassium|Sodium|Total carbon dioxide'),'Calculated result':A('Estimated glomerular filtration rate')},source:'https://www.abaxis.com/panels/metlyte-plus-crp/'},
  {title:'MetLac 12',short:'MetLac 12',color:'#4b4da5',complexity:'moderate',groups:{'Measured analytes':A('Albumin|Blood urea nitrogen|Calcium|Chloride|Creatinine|Glucose|Lactate|Magnesium|Phosphorus|Potassium|Sodium|Total carbon dioxide'),'Calculated result':A('Estimated glomerular filtration rate')},source:'https://www.abaxis.com/panels/metlac-12/'},
  {title:'Liver Panel Plus',short:'Liver Plus',color:'#292462',complexity:'waived',groups:{'Measured analytes':A('Albumin|Alkaline phosphatase|Alanine aminotransferase|Amylase|Aspartate aminotransferase|Gamma-glutamyl transferase|Total bilirubin|Total protein')},source:'https://www.abaxis.com/panels/liver-panel-plus/'},
  {title:'Lipid Panel',short:'Lipid',color:'#f19a8e',complexity:'waived',groups:{'Measured analytes':A('Total cholesterol|High-density lipoprotein cholesterol|Triglycerides'),'Calculated results':A('Cholesterol-to-high-density-lipoprotein ratio|Non-high-density-lipoprotein cholesterol|Very-low-density lipoprotein cholesterol')},source:'https://www.abaxis.com/panels/lipid-panel/'}
 ],
 pathfast:[
  {title:'High-sensitivity cardiac troponin I',complexity:'moderate',groups:{'Cardiac injury marker':A('High-sensitivity cardiac troponin I')}},
  {title:'N-terminal pro-B-type natriuretic peptide',complexity:'moderate',groups:{'Heart failure marker':A('N-terminal pro-B-type natriuretic peptide')}},
  {title:'D-dimer',complexity:'moderate',groups:{'Coagulation / fibrinolysis marker':A('D-dimer')}}
 ],
 triage:[
  {title:'Cardiac troponin I',complexity:'moderate',color:'#8b9fcf',tint:'#edf0f9',deep:'#4e6eaa',boxColor:'Blue stripe · magenta cassette',groups:{'Cardiac injury marker':A('Cardiac troponin I')}},
  {title:'D-dimer',complexity:'moderate',color:'#f0c631',tint:'#fff9df',deep:'#8e6c09',boxColor:'Yellow stripe · magenta cassette',groups:{'Coagulation / fibrinolysis marker':A('D-dimer')}},
  {title:'B-type natriuretic peptide',complexity:'moderate',color:'#419a84',tint:'#e7f5f0',deep:'#226c5c',boxColor:'Green stripe · magenta cassette',groups:{'Heart failure marker':A('B-type natriuretic peptide')}}
 ],
 clinitek:[
  {title:'Urinalysis reagent strip',complexity:'waived',groups:{'Urinalysis parameters':A('Glucose|Bilirubin|Ketones|Specific gravity|Blood / hemoglobin|pH|Protein|Urobilinogen|Nitrite|Leukocyte esterase')}},
  {title:'Urine pregnancy (human chorionic gonadotropin)',complexity:'waived',groups:{'Pregnancy marker':A('Human chorionic gonadotropin')}}
 ],
 spotfire:[
  {title:'Full respiratory panel',complexity:'waived',groups:{'Viruses':A('Adenovirus|Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)|Seasonal coronaviruses|Human metapneumovirus|Human rhinovirus / enterovirus|Influenza A virus (including A/H1-2009 and A/H3 subtyping)|Influenza B virus|Parainfluenza viruses|Respiratory syncytial virus'),'Bacteria':A('Bordetella parapertussis|Bordetella pertussis|Chlamydia pneumoniae|Mycoplasma pneumoniae')}},
  {title:'Mini respiratory panel',complexity:'waived',groups:{'Viruses':A('Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)|Human rhinovirus|Influenza A virus|Influenza B virus|Respiratory syncytial virus')}},
  {title:'Mini sore throat panel',complexity:'waived',groups:{'Viruses':A('Human rhinovirus|Influenza A virus|Influenza B virus|Respiratory syncytial virus'),'Bacteria':A('Streptococcus pyogenes (group A Streptococcus)')}}
 ],
 torch:[
  {title:'Gastrointestinal Pathogen Panel',complexity:'moderate',groups:{
    'Bacteria':A('Campylobacter jejuni / coli / upsaliensis|Clostridioides difficile toxin A/B|Plesiomonas shigelloides|Salmonella species|Yersinia enterocolitica|Vibrio parahaemolyticus / vulnificus / cholerae|Vibrio cholerae (separate target)'),
    'Diarrheagenic Escherichia coli / Shigella':A('Enteroaggregative Escherichia coli|Enteropathogenic Escherichia coli|Enterotoxigenic Escherichia coli (heat-labile / heat-stable toxin)|Shiga toxin-producing Escherichia coli (stx1 / stx2)|Escherichia coli O157|Shigella / enteroinvasive Escherichia coli'),
    'Viruses':A('Adenovirus F40/41|Astrovirus|Norovirus genogroups I / II|Rotavirus A|Sapovirus genogroups I, II, IV and V'),
    'Parasites':A('Cryptosporidium species|Cyclospora cayetanensis|Entamoeba histolytica|Giardia lamblia')
  }}
 ],
 sofia:[
  {title:'Influenza A and B / SARS-CoV-2',complexity:'waived',color:'#1769a8',tint:'#e6f1fa',deep:'#155884',boxColor:'Blue box',groups:{'Viruses':A('Influenza A virus|Influenza B virus|Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)')}},
  {title:'Respiratory syncytial virus',complexity:'waived',color:'#ef7e16',tint:'#fff1e2',deep:'#a94d06',boxColor:'Orange box',groups:{'Virus':A('Respiratory syncytial virus')}},
  {title:'Group A Streptococcus',complexity:'waived',color:'#af2447',tint:'#fae9ed',deep:'#8c1737',boxColor:'Red box',groups:{'Bacterium':A('Streptococcus pyogenes (group A Streptococcus)')}}
 ],
 poc:[
  {title:'Rapid influenza test',groups:{'Viruses':A('Influenza A virus|Influenza B virus')}},
  {title:'Rapid SARS-CoV-2 test',groups:{'Virus':A('Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)')}},
  {title:'Rapid respiratory syncytial virus test',groups:{'Virus':A('Respiratory syncytial virus')}},
  {title:'Rapid group A Streptococcus test',groups:{'Bacterium':A('Streptococcus pyogenes (group A Streptococcus)')}},
  {title:'Conjunctivitis rapid test',groups:{'Target (assay-dependent)':A('Adenovirus antigen, if using an adenovirus-specific conjunctivitis test')}},
  {title:'Human immunodeficiency virus antigen / antibody test',complexity:'moderate',groups:{'Antigen':A('Human immunodeficiency virus type 1 p24 antigen'),'Antibodies':A('Human immunodeficiency virus type 1 antibodies|Human immunodeficiency virus type 2 antibodies')}},
  {title:'Infectious mononucleosis rapid test',groups:{'Antibodies':A('Heterophile antibodies (not direct Epstein-Barr virus detection)')}},
  {title:'McKesson 14-panel urine drug screen',groups:{'Drug classes and compounds':A('Amphetamine|Barbiturates|Benzodiazepines|Buprenorphine|Cocaine metabolite|3,4-Methylenedioxymethamphetamine (MDMA)|Methadone|Methamphetamine|Morphine / opiates|Oxycodone|Phencyclidine|Propoxyphene|Tetrahydrocannabinol (THC) metabolite|Tricyclic antidepressants')},note:'Use the current McKesson 14-panel cup and confirm every analyte, cutoff and reading time against its product-specific insert. This entry matches the separate 14-panel workflow.'}
 ],
 'drug-screen':[
  {title:'McKesson 14-panel urine drug screen (current guide)',complexity:'waived',groups:{'Drug classes and compounds':A('Amphetamine|Barbiturates|Benzodiazepines|Buprenorphine|Cocaine metabolite|3,4-Methylenedioxymethamphetamine (MDMA)|Methadone|Methamphetamine|Morphine / opiates|Oxycodone|Phencyclidine|Propoxyphene|Tetrahydrocannabinol (THC) metabolite|Tricyclic antidepressants')},note:'This is the existing 14-panel workflow. Confirm the selected site kit, its labeling, and cutoff values before use.'}
 ],
 sysmex:[{title:'Three-part complete blood count',complexity:'moderate',groups:{'Blood cell measurements':A('White blood cell count|Red blood cell count|Hemoglobin|Hematocrit|Mean corpuscular volume|Mean corpuscular hemoglobin|Mean corpuscular hemoglobin concentration|Red blood cell distribution width|Platelet count|Mean platelet volume'),'Three-part white cell differential':A('Lymphocytes|Mixed cells (monocytes / eosinophils / basophils)|Granulocytes (predominantly neutrophils)')}}],
 febridx:[{title:'FebriDx inflammatory marker test',complexity:'moderate',groups:{'Host-response markers':A('Myxovirus resistance protein A|C-reactive protein')}}],
 hemocue:[{title:'Hemoglobin',groups:{'Measured analyte':A('Hemoglobin')}}],
 coagsense:[{title:'Prothrombin time / INR',groups:{'Coagulation results':A('Prothrombin time|International normalized ratio')}}]
};
const references={
 piccolo:'https://www.abaxis.com/reagent-panels/',
 pathfast:'https://www.pathfast.com/testing-menu',
 triage:'https://www.cliawaived.com/triage-meterpro.html',
 spotfire:'https://www.biomerieux.com/corp/en/our-offer/clinical-products/biofire-spotfire-respiratory-panels.html',
 torch:'https://www.biomerieux.com/us/en/our-offer/clinical-products/biofire-gastrointestinal-panel.html'
};
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function complexity(type){return type==='moderate'?'<span class="ac-complex ac-moderate">CLIA MODERATE</span>':type==='waived'?'<span class="ac-complex ac-waived">CLIA WAIVED</span>':'';}
function disc(c){return '<div class="ac-disc" style="--disc-color:'+c.color+'" aria-label="'+esc(c.title)+' color reference"><div class="ac-disc-hole"></div><span>'+esc(c.short)+'</span></div>';}
function oneCard(c,idx,withDisc){
 const groups=Object.entries(c.groups).map(([name,arr])=>'<div class="ac-group"><h4>'+esc(name)+'</h4><ul>'+arr.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul></div>').join('');
 const count=Object.values(c.groups).reduce((n,a)=>n+a.length,0);
 return '<details class="ac-card'+(c.boxColor?' ac-kit-coded':'')+'" open style="'+(c.color?'--ac-strip:'+c.color+';--ac-kit-tint:'+(c.tint||'#eef5f8')+';--ac-kit-deep:'+(c.deep||c.color):'')+'">'+
  '<summary class="ac-card-head">'+(withDisc?disc(c):'<span class="ac-card-index">'+String(idx+1).padStart(2,'0')+'</span>')+
  '<span class="ac-card-summary"><strong>'+esc(c.title)+'</strong><small>'+count+' listed analytes / targets'+(withDisc?' · '+esc(c.short):'')+(c.boxColor?' · '+esc(c.boxColor):'')+'</small></span>'+complexity(c.complexity)+'<span class="ac-chevron" aria-hidden="true"></span></summary>'+
  '<div class="ac-card-body">'+groups+(c.note?'<p class="ac-card-note">'+esc(c.note)+'</p>':'')+(c.source?'<a class="ac-source-link" href="'+esc(c.source)+'" target="_blank" rel="noopener noreferrer">Manufacturer panel details ↗</a>':'')+'</div></details>';
}
function render(section){
 const id=typeof section==='string'?section:section?.id;
 const list=tests[id];if(!list)return '';
 const isDisc=id==='piccolo';
 const heading=isDisc?'Available Piccolo reagent discs':id==='torch'?'Gastrointestinal panel targets':'Available tests and detected analytes';
 const subtitle=isDisc?'Six approved chemistry discs. Accent colors follow the corresponding reagent pouch labeling. Measured and calculated results are separated.':'Select an assay below to review its full analyte or pathogen menu. Categories and complexity labels are assay-specific.';
 let notes='';
 if(id==='spotfire')notes='Full and mini testing menus differ. Use the specimen-appropriate respiratory or sore throat menu printed on the installed U.S. pouch IFU.';
 if(id==='poc'||id==='drug-screen')notes='Rapid antigen and drug-screen assays are kit-dependent. Check the specific product, specimen type, CLIA category, and current lot insert before testing.';
 if(isDisc)notes='CLIA status is disc-specific, not analyzer-wide. Only the two listed moderate-complexity discs are marked moderate. Always use the approved disc-specific IFU.';
 return '<section class="assay-catalog" aria-label="'+esc(heading)+'"><header class="ac-title"><div><span class="ac-eyebrow">TEST MENU / ANALYTE REFERENCE</span><h2>'+esc(heading)+'</h2><p>'+esc(subtitle)+'</p></div><span class="ac-count">'+list.length+' '+(list.length===1?'panel':'panels / tests')+'</span></header>'+
  '<div class="ac-grid '+(isDisc?'ac-disc-grid':'')+'">'+list.map((c,i)=>oneCard(c,i,isDisc)).join('')+'</div>'+
  (notes?'<p class="ac-footnote">'+esc(notes)+'</p>':'')+
  (references[id]?'<p class="ac-reference">Source: <a href="'+references[id]+'" target="_blank" rel="noopener noreferrer">Official test menu / manufacturer reference ↗</a></p>':'')+'</section>';
}
function qcMenu(selected){return '<div class="cl-qc-switch" role="group" aria-label="Select Siemens quality-control procedure"><div class="cl-qc-intro"><span class="ac-eyebrow">MONTHLY QUALITY CONTROL</span><h2>Choose the QC method</h2><p>Use the correct material and test-table orientation for each assay.</p></div><div class="cl-qc-switch-buttons">'+
  '<button type="button" data-clinitek-qc="ua-qc" aria-pressed="'+(selected==='ua-qc')+'" class="'+(selected==='ua-qc'?'is-active':'')+'"><strong>Urinalysis strip QC</strong><small>Quantimetrix controls</small><span class="ac-chevron" aria-hidden="true"></span></button>'+
  '<button type="button" data-clinitek-qc="hcg-qc" aria-pressed="'+(selected==='hcg-qc')+'" class="'+(selected==='hcg-qc'?'is-active':'')+'"><strong>Human chorionic gonadotropin QC</strong><small>CLINITEST cassette controls</small><span class="ac-chevron" aria-hidden="true"></span></button></div></div>';}
window.LAB_ASSAY_CATALOG={render,qcMenu,tests};
})();