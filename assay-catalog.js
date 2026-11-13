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
  {title:'Cardiac troponin I',complexity:'moderate',color:'#8b9fcf',tint:'#edf0f9',deep:'#4e6eaa',boxColor:'Blue stripe · magenta cassette',groups:{'Cardiac injury marker':A('Cardiac troponin I')},source:'https://www.quidelortho.com/us/en/products/triage-meter-pro/quidel-triage-cardiac-panel'},
  {title:'D-dimer',complexity:'moderate',color:'#f0c631',tint:'#fff9df',deep:'#8e6c09',boxColor:'Yellow stripe · magenta cassette',groups:{'Coagulation / fibrinolysis marker':A('D-dimer')},source:'https://www.quidelortho.com/us/en/products/triage-meter-pro/quidel-triage-d-dimer-test'},
  {title:'B-type natriuretic peptide',complexity:'waived',color:'#419a84',tint:'#e7f5f0',deep:'#226c5c',boxColor:'Green stripe · magenta cassette',groups:{'Heart failure marker':A('B-type natriuretic peptide')},note:'CLIA waived for EDTA whole blood only. EDTA plasma testing is moderate complexity. Follow the current Quidel Triage BNP assay IFU and approved site SOP.',source:'https://www.quidelortho.com/us/en/products/triage-meter-pro/quidel-triage-bnp-test'}
 ],
 clinitek:[
  {title:'Urinalysis reagent strip',complexity:'waived',groups:{'Urinalysis parameters':A('Glucose|Bilirubin|Ketones|Specific gravity|Blood / hemoglobin|pH|Protein|Urobilinogen|Nitrite|Leukocyte esterase')}},
  {title:'Urine pregnancy (human chorionic gonadotropin)',complexity:'waived',groups:{'Pregnancy marker':A('Human chorionic gonadotropin')}}
 ],
 spotfire:[
  {title:'Full respiratory panel',spotfireMark:'R',complexity:'waived',groups:{'Viruses':A('Adenovirus|Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)|Seasonal coronaviruses|Human metapneumovirus|Human rhinovirus / enterovirus|Influenza A virus (including A/H1-2009 and A/H3 subtyping)|Influenza B virus|Parainfluenza viruses|Respiratory syncytial virus'),'Bacteria':A('Bordetella parapertussis|Bordetella pertussis|Chlamydia pneumoniae|Mycoplasma pneumoniae')}},
  {title:'Full sore throat panel',spotfireMark:'ST',marketNote:'NY clinics',complexity:'waived',countLabel:'14 targets (including influenza A subtypes)',groups:{'Viruses':A('Adenovirus|Seasonal coronaviruses|Human metapneumovirus|Human rhinovirus / enterovirus|Influenza A virus (including A/H1-2009 and A/H3 subtyping)|Influenza B virus|Parainfluenza viruses|Respiratory syncytial virus'),'Bacteria':A('Chlamydia pneumoniae|Mycoplasma pneumoniae|Streptococcus dysgalactiae (group C/G Streptococcus)|Streptococcus pyogenes (group A Streptococcus)')}},
  {title:'Mini respiratory panel',spotfireMark:'R',spotfireMini:true,complexity:'waived',groups:{'Viruses':A('Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)|Human rhinovirus|Influenza A virus|Influenza B virus|Respiratory syncytial virus')}},
  {title:'Mini sore throat panel',spotfireMark:'ST',spotfireMini:true,complexity:'waived',groups:{'Viruses':A('Human rhinovirus|Influenza A virus|Influenza B virus|Respiratory syncytial virus'),'Bacteria':A('Streptococcus pyogenes (group A Streptococcus)')}}
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
 hiv:[
  {title:'Abbott Determine HIV-1/2 Ag/Ab Combo',complexity:'moderate',source:'https://www.fda.gov/media/86959/download',groups:{'Antigen (Ag line)':A('HIV-1 p24 antigen'),'Antibodies (Ab line)':A('HIV-1/2 antibodies (combined readout)')},note:'Separate Ag and Ab lines: the Ab line detects HIV-1/2 antibodies but does not distinguish HIV-1 from HIV-2. Read at 20–30 minutes. Site guide designation: CLIA moderate. Per FDA, venous whole blood, serum and plasma are moderate complexity, while fingerstick whole blood is CLIA waived. Follow the Abbott IFU and site SOP.'}
 ],
 mono:[
  {title:'McKesson Consult Mononucleosis Cassette #5012',complexity:'waived',source:'https://mms.mckesson.com/product/951314/McKesson-Brand-5012',groups:{'Detected analyte':A('Infectious mononucleosis heterophile antibodies (not EBV-specific antibodies)')},note:'Sollis routine patient-testing method: CLIA WAIVED whole blood, using 25 µL with the RED-line pipette. Serum and plasma are CLIA moderate under the manufacturer labeling and are not used for routine clinic patient testing. Included positive/negative liquid controls are handled with a BLACK-line 10 µL pipette as directed by the QC instructions. Add 2–3 developer drops. Read at 8 minutes, never after 15 minutes. A positive screen alone is not a definitive diagnosis.'}
 ],
 poc:[
  {title:'Rapid influenza test',complexity:'waived',note:'CLIA waived for the Quidel QuickVue Influenza A+B test with its approved nasal or nasopharyngeal specimens. Verify the exact stocked kit and current IFU.',source:'https://www.quidelortho.com/us/en/products/quickvue-rapid-lateral-flow-tests/quickvue-influenza-a-b-test',groups:{'Viruses':A('Influenza A virus|Influenza B virus')}},
  {title:'Rapid SARS-CoV-2 test',complexity:'waived',note:'CLIA waived for the authorized Quidel QuickVue SARS Antigen test using its approved anterior nasal swab and testing conditions. Verify the exact stocked kit and current authorization or clearance.',source:'https://www.quidelortho.com/us/en/products/quickvue-rapid-lateral-flow-tests/quickvue-sars-antigen-test',groups:{'Virus':A('Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)')}},
  {title:'Rapid respiratory syncytial virus test',complexity:'waived',note:'CLIA waived for the Quidel QuickVue RSV test with the specimen types and intended population specified in its IFU. Confirm the stocked kit before testing.',source:'https://www.accessdata.fda.gov/SCRIPTS/CDRH/CFDOCS/CFCLIA/Results.cfm?Analyte_Name=Respiratory+syncytial+virus&Clia_Analyte_Specialty=&Clia_Complexity=waived&Document_Number=&Effective_Date_FROM=&Effective_Date_TO=&Exempt_510k=&PAGENUM=10&Qualifier=&SortColumn=ded&Test_System_Name=&start_search=31',groups:{'Virus':A('Respiratory syncytial virus')}},
  {title:'Rapid group A Streptococcus test',complexity:'waived',note:'CLIA waived for the Quidel QuickVue Strep A rapid test with the approved throat swab collection procedure. Verify the stocked product and IFU.',source:'https://www.quidelortho.com/global/en/products/quickvue-rapid-lateral-flow-tests/quickvue-dipstick-strep-a-test',groups:{'Bacterium':A('Streptococcus pyogenes (group A Streptococcus)')}},
  {title:'Conjunctivitis rapid test',complexity:'conditional',note:'CLIA status depends on the exact assay. FDA-waived Quidel QuickVue Adenoviral Conjunctivitis and AdenoPlus tests use tear fluid. Confirm the actual site kit before identifying it as waived.',source:'https://www.accessdata.fda.gov/SCRIPTS/CDRH/CFDOCS/cfClia/Results.cfm?Document_Number=K110722&SortColumn=ded&start_search=1',groups:{'Target (assay-dependent)':A('Adenovirus antigen, if using an adenovirus-specific conjunctivitis test')}},
  {title:'McKesson 14-panel urine drug screen',complexity:'waived',groups:{'Drug classes and compounds':A('Amphetamine|Barbiturates|Benzodiazepines|Buprenorphine|Cocaine metabolite|3,4-Methylenedioxymethamphetamine (MDMA)|Methadone|Methamphetamine|Morphine / opiates|Oxycodone|Phencyclidine|Propoxyphene|Tetrahydrocannabinol (THC) metabolite|Tricyclic antidepressants')},note:'CLIA waived only for an FDA-waived 14-panel urine cup configuration. Confirm the exact manufacturer and catalog number, each listed drug target, cutoffs and reading time against the stocked cup IFU. This entry matches the separate 14-panel workflow.'}
 ],
 'drug-screen':[
  {title:'McKesson 14-panel urine drug screen (current guide)',complexity:'waived',groups:{'Drug classes and compounds':A('Amphetamine|Barbiturates|Benzodiazepines|Buprenorphine|Cocaine metabolite|3,4-Methylenedioxymethamphetamine (MDMA)|Methadone|Methamphetamine|Morphine / opiates|Oxycodone|Phencyclidine|Propoxyphene|Tetrahydrocannabinol (THC) metabolite|Tricyclic antidepressants')},note:'This is the existing 14-panel workflow. CLIA waiver applies only to an FDA-waived urine test cup configuration; confirm the actual kit, its manufacturer/catalog number, panel, labeling, and cutoff values before use.'}
 ],
 sysmex:[{title:'Three-part complete blood count',complexity:'moderate',groups:{'Blood cell measurements':A('White blood cell count|Red blood cell count|Hemoglobin|Hematocrit|Mean corpuscular volume|Mean corpuscular hemoglobin|Mean corpuscular hemoglobin concentration|Red blood cell distribution width|Platelet count|Mean platelet volume'),'Three-part white cell differential':A('Lymphocytes|Mixed cells (monocytes / eosinophils / basophils)|Granulocytes (predominantly neutrophils)')},countLabel:'17 reported CBC parameters · 13 grouped references',note:'RDW has separate SD and CV values. LYM, MXD and NEUT each have a percentage (%) and an absolute count (#) on the Sysmex result printout.'}],
 febridx:[{title:'FebriDx inflammatory marker test',complexity:'waived',groups:{'Host-response markers':A('Myxovirus resistance protein A|C-reactive protein')}}],
 hemocue:[{title:'Hemoglobin',complexity:'waived',note:'CLIA waived for HemoCue Hb 201+ and Hb 301 whole-blood systems when performed with approved microcuvettes and specimen types. Confirm the analyzer model and manufacturer IFU.',source:'https://www.accessdata.fda.gov/SCRIPTS/CDRH/CFDOCS/CFCLIA/Results.cfm?Analyte_Name=HGB%2C+single+analyte+inst.+w%2Fself-cont.+&Clia_Complexity=waived&SortColumn=dad&san=1',groups:{'Measured analyte':A('Hemoglobin')}}],
 coagsense:[{title:'Prothrombin time / INR',complexity:'waived',note:'CLIA waived for Coag-Sense PT/INR professional systems using the approved capillary whole-blood fingerstick procedure and manufacturer test strips.',source:'https://coag-sense.com/tech-specs/',groups:{'Coagulation results':A('Prothrombin time|International normalized ratio')}}]
};

/* Short codes are display-only metadata, not additional assays or orderables.
   Prefer the analyzer's result/printout terminology; preserve full names. */
const printoutAbbreviations={
 sysmex:{
  'White blood cell count':'WBC',
  'Red blood cell count':'RBC',
  'Hemoglobin':'HGB',
  'Hematocrit':'HCT',
  'Mean corpuscular volume':'MCV',
  'Mean corpuscular hemoglobin':'MCH',
  'Mean corpuscular hemoglobin concentration':'MCHC',
  'Red blood cell distribution width':'RDW-SD / RDW-CV',
  'Platelet count':'PLT',
  'Mean platelet volume':'MPV',
  'Lymphocytes':'LYM% / LYM#',
  'Mixed cells (monocytes / eosinophils / basophils)':'MXD% / MXD#',
  'Granulocytes (predominantly neutrophils)':'NEUT% / NEUT#'
 },
 piccolo:{
  'Albumin':'ALB','Alkaline phosphatase':'ALP',
  'Alanine aminotransferase':'ALT','Aspartate aminotransferase':'AST',
  'Blood urea nitrogen':'BUN','Calcium':'CA','Chloride':'CL-',
  'Creatinine':'CRE','Glucose':'GLU','Potassium':'K+','Sodium':'NA+',
  'Total bilirubin':'TBIL','Total carbon dioxide':'tCO2','Total protein':'TP',
  'Estimated glomerular filtration rate':'eGFR',
  'Creatine kinase':'CK','C-reactive protein':'CRP',
  'Lactate':'LAC','Magnesium':'MG','Phosphorus':'PHOS',
  'Amylase':'AMY','Gamma-glutamyl transferase':'GGT',
  'Total cholesterol':'CHOL','High-density lipoprotein cholesterol':'HDL',
  'Triglycerides':'TRIG',
  'Cholesterol-to-high-density-lipoprotein ratio':'CHOL/HDL',
  'Non-high-density-lipoprotein cholesterol':'nHDLc',
  'Very-low-density lipoprotein cholesterol':'VLDL'
 },
 pathfast:{
  'High-sensitivity cardiac troponin I':'hs-TnI',
  'N-terminal pro-B-type natriuretic peptide':'NT-proBNP'
 },
 triage:{'Cardiac troponin I':'TnI','B-type natriuretic peptide':'BNP'},
 clinitek:{
  'Glucose':'GLU','Bilirubin':'BIL','Ketones':'KET',
  'Specific gravity':'SG','Blood / hemoglobin':'BLD',
  'Protein':'PRO','Urobilinogen':'URO','Nitrite':'NIT',
  'Leukocyte esterase':'LEU',
  'Human chorionic gonadotropin':'hCG'
 },
 febridx:{'Myxovirus resistance protein A':'MxA','C-reactive protein':'CRP'},
 hemocue:{'Hemoglobin':'Hb'},
 coagsense:{'Prothrombin time':'PT','International normalized ratio':'INR'},
 hiv:{
  'HIV-1 p24 antigen':'Ag · HIV-1 p24',
  'HIV-1/2 antibodies (combined readout)':'Ab · HIV-1/2'
 },
 poc:{
  'Heterophile antibodies (not direct Epstein-Barr virus detection)':'Mono / heterophile Ab',
  'Adenovirus antigen, if using an adenovirus-specific conjunctivitis test':'AdV'
 },
 'drug-screen':{
  'Amphetamine':'AMP','Barbiturates':'BAR','Benzodiazepines':'BZO',
  'Buprenorphine':'BUP','Cocaine metabolite':'COC',
  'Methadone':'MTD','Methamphetamine':'mAMP',
  'Morphine / opiates':'OPI','Oxycodone':'OXY',
  'Phencyclidine':'PCP','Propoxyphene':'PPX',
  'Tricyclic antidepressants':'TCA'
 }
};
const commonTargetAbbreviations={
 'Influenza A virus':'Flu A','Influenza B virus':'Flu B',
 'Influenza A virus (including A/H1-2009 and A/H3 subtyping)':'Flu A',
 'Respiratory syncytial virus':'RSV',
 'Human metapneumovirus':'hMPV',
 'Human rhinovirus':'HRV',
 'Human rhinovirus / enterovirus':'HRV/EV',
 'Parainfluenza viruses':'PIV',
 'Streptococcus pyogenes (group A Streptococcus)':'GAS / Strep A',
 'Clostridioides difficile toxin A/B':'C. diff',
 'Enteroaggregative Escherichia coli':'EAEC',
 'Enteropathogenic Escherichia coli':'EPEC',
 'Enterotoxigenic Escherichia coli (heat-labile / heat-stable toxin)':'ETEC',
 'Shiga toxin-producing Escherichia coli (stx1 / stx2)':'STEC',
 'Shigella / enteroinvasive Escherichia coli':'Shigella/EIEC',
 'Escherichia coli O157':'E. coli O157',
 'B-type natriuretic peptide':'BNP',
 'D-dimer':'D-dimer',
 'C-reactive protein':'CRP',
 'Myxovirus resistance protein A':'MxA',
 'Prothrombin time':'PT','International normalized ratio':'INR',
 'Hemoglobin':'HGB',
 'Tetrahydrocannabinol (THC) metabolite':'THC',
 '3,4-Methylenedioxymethamphetamine (MDMA)':'MDMA'
};
function shortLabel(id,name){
 const short=printoutAbbreviations[id]?.[name]||commonTargetAbbreviations[name]||'';
 // The full target may already contain its short form, e.g. SARS-CoV-2 or MDMA.
 return short&&name.toLowerCase().includes('('+short.toLowerCase()+')')?'':short;
}
/* Calculated Piccolo results are explained in plain language, not given status badges.
   Methods and limitations follow the manufacturer's assay IFU and analyzer manual. */
const piccoloCalculationDetails={
 'Estimated glomerular filtration rate':'The displayed Piccolo eGFR is calculated from creatinine with its built-in MDRD equation, which is different from the current race-free 2021 CKD-EPI creatinine estimate. For adults 18+, use the eGFR calculator tab to calculate a separate race-free estimate from valid creatinine, age, and the equation sex parameter. The calculator does not modify the analyzer result or report to the chart. N/C means the instrument could not calculate eGFR.',
 'Cholesterol-to-high-density-lipoprotein ratio':'Total cholesterol ÷ HDL cholesterol.',
 'Non-high-density-lipoprotein cholesterol':'Total cholesterol − HDL cholesterol.',
 'Very-low-density lipoprotein cholesterol':'Triglycerides ÷ 5 (when concentrations are in mg/dL). This estimate is unreliable above 400 mg/dL triglycerides and in nonfasting samples.'
};
/* Retained for callers of the older API; analyte-level PT/accuracy badges are no longer displayed. */
function piccoloTargetStatus(){return '';}
function formatTarget(id,name,status=''){
 const abbr=shortLabel(id,name);
 const hasShort=abbr&&abbr.toLowerCase()!==name.toLowerCase();
 return '<span class="ac-analyte-name">'+esc(name)+'</span>'+
  (hasShort?' <span class="ac-analyte-short" aria-label="Abbreviation: '+esc(abbr)+'">'+esc(abbr)+'</span>':'');
}
function formatPanelTarget(id,panel,name){
 const isCalculated=Object.entries(panel.groups||{}).some(([group,names])=>
  /calculated/i.test(group)&&Array.isArray(names)&&names.includes(name));
 const calculation=id==='piccolo'&&isCalculated?piccoloCalculationDetails[name]:'';
 return formatTarget(id,name)+
  (calculation?'<span class="ac-calculation"><span class="ac-calculation-label">Calculated:</span> '+esc(calculation)+'</span>':'');
}

const references={
 piccolo:'https://www.abaxis.com/reagent-panels/',
 pathfast:'https://www.pathfast.com/testing-menu',
 triage:'https://www.quidelortho.com/us/en/products/triage-meter-pro',
 spotfire:'https://www.biomerieux.com/corp/en/our-offer/clinical-products/biofire-spotfire-respiratory-panels.html',
 torch:'https://www.biomerieux.com/us/en/our-offer/clinical-products/biofire-gastrointestinal-panel.html'
};
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function complexity(type){return type==='moderate'?'<span class="ac-complex ac-moderate">CLIA MODERATE</span>':type==='waived'?'<span class="ac-complex ac-waived">CLIA WAIVED</span>':type==='conditional'?'<span class="ac-complex ac-conditional">CLIA VARIES</span>':'';}
function disc(c){return '<div class="ac-disc" style="--disc-color:'+c.color+'" aria-label="'+esc(c.title)+' color reference"><div class="ac-disc-hole"></div><span>'+esc(c.short)+'</span></div>';}
/* SPOTFIRE panel identifiers mirror the R and ST pouch markings, including MINI. */
function spotfireMark(c){
 const label=c.spotfireMark+(c.spotfireMini?' mini':'');
 return '<span class="ac-spotfire-mark'+(c.spotfireMini?' ac-spotfire-mark-mini':'')+'" role="img" aria-label="'+esc(label)+' panel">'+
  '<span class="ac-spotfire-mark-face"><b>'+esc(c.spotfireMark)+'</b>'+(c.spotfireMini?'<small>MINI</small>':'')+'</span></span>';
}
function oneCard(c,idx,withDisc,id){
 const groups=Object.entries(c.groups).map(([name,arr])=>'<div class="ac-group'+(id==='piccolo'&&/calculated/i.test(name)?' ac-calculated-results':'')+'"><h4>'+esc(name)+'</h4><ul>'+arr.map(item=>'<li>'+formatPanelTarget(id,c,item)+'</li>').join('')+'</ul></div>').join('');

 const count=Object.values(c.groups).reduce((n,a)=>n+a.length,0);
 return '<details class="ac-card'+(c.boxColor?' ac-kit-coded':'')+'" open style="'+(c.color?'--ac-strip:'+c.color+';--ac-kit-tint:'+(c.tint||'#eef5f8')+';--ac-kit-deep:'+(c.deep||c.color):'')+'">'+
  '<summary class="ac-card-head">'+(withDisc?disc(c):id==='spotfire'&&c.spotfireMark?spotfireMark(c):'<span class="ac-card-index">'+(id==='sysmex'?'CBC':String(idx+1).padStart(2,'0'))+'</span>')+
  '<span class="ac-card-summary"><strong>'+esc(c.title)+'</strong><small>'+(c.countLabel||count+' listed analytes / targets')+(withDisc?' · '+esc(c.short):'')+(c.boxColor?' · '+esc(c.boxColor):'')+'</small>'+(c.marketNote?'<span class="ac-market-note">'+esc(c.marketNote)+'</span>':'')+'</span>'+complexity(c.complexity)+'<span class="ac-chevron" aria-hidden="true"></span></summary>'+
  '<div class="ac-card-body">'+groups+(c.note?'<p class="ac-card-note">'+esc(c.note)+'</p>':'')+(c.source?'<a class="ac-source-link" href="'+esc(c.source)+'" target="_blank" rel="noopener noreferrer">Manufacturer panel details ↗</a>':'')+'</div></details>';
}
function render(section){
 const id=typeof section==='string'?section:section?.id;
 const source=tests[id];if(!source)return '';
 const market=window.LAB_MARKET?.get()||null;
 const list=source.filter(item=>!market||!item.marketNote||!/(?:\bNY\b|New York)/i.test(item.marketNote)||market==='ny');
 const isDisc=id==='piccolo';
 const heading=isDisc?'Available Piccolo reagent discs':id==='torch'?'Gastrointestinal panel targets':id==='hiv'?'Abbott Determine HIV-1/2 Ag/Ab Combo':id==='mono'?'McKesson Consult Mononucleosis':'Available tests and detected analytes';
 const subtitle=isDisc?'Six approved chemistry discs. Accent colors follow the corresponding reagent pouch labeling. Measured and calculated results are separated.':'Select an assay below to review its full analyte or pathogen menu. Categories and complexity labels are assay-specific.';
 let notes='';
 if(id==='spotfire')notes=market==='ny'?'Select the specimen-appropriate respiratory or sore throat menu per the installed U.S. pouch IFU. Full sore throat is listed for NY clinics.':'Select the specimen-appropriate respiratory or sore throat menu per the installed U.S. pouch IFU.';
 if(id==='poc'||id==='drug-screen')notes='Rapid antigen and drug-screen assays are kit-dependent. Check the specific product, specimen type, CLIA category, and current lot insert before testing.';
 if(isDisc)notes='CLIA complexity applies to the reagent disc and the approved specimen type, not to an analyte universally. Calculated results are estimates from measured values and required patient information; follow the current manufacturer IFU, instrument settings, and site SOP.';
 return '<section class="assay-catalog" aria-label="'+esc(heading)+'"><header class="ac-title"><div><span class="ac-eyebrow">TEST MENU / ANALYTE REFERENCE</span><h2>'+esc(heading)+'</h2><p>'+esc(subtitle)+'</p></div><span class="ac-count">'+list.length+' '+(list.length===1?'panel':'panels / tests')+'</span></header>'+
  '<div class="ac-grid '+(isDisc?'ac-disc-grid':'')+(id==='sysmex'?' ac-grid--sysmex':'')+(id==='torch'?' ac-grid--torch':'')+(id==='spotfire'?' ac-grid--spotfire':'')+(id==='sofia'?' ac-grid--sofia':'')+(id==='coagsense'?' ac-grid--coagsense':'')+(id==='poc'?' ac-grid--poc':'')+(id==='hiv'?' ac-grid--hiv':'')+(id==='pathfast'?' ac-grid--pathfast':'')+'">'+list.map((c,i)=>oneCard(c,i,isDisc,id)).join('')+'</div>'+
  (notes?'<p class="ac-footnote">'+esc(notes)+'</p>':'')+
  (references[id]?'<p class="ac-reference">Source: <a href="'+references[id]+'" target="_blank" rel="noopener noreferrer">Official test menu / manufacturer reference ↗</a></p>':'')+'</section>';
}
function qcMenu(selected){return '<div class="cl-qc-switch" role="group" aria-label="Select Siemens quality-control procedure"><div class="cl-qc-intro"><span class="ac-eyebrow">MONTHLY QUALITY CONTROL</span><h2>Choose the QC method</h2><p>Use the correct material and test-table orientation for each assay.</p></div><div class="cl-qc-switch-buttons">'+
  '<button type="button" data-clinitek-qc="ua-qc" aria-pressed="'+(selected==='ua-qc')+'" class="'+(selected==='ua-qc'?'is-active':'')+'"><strong>Urinalysis strip QC</strong><small>Quantimetrix controls</small><span class="ac-chevron" aria-hidden="true"></span></button>'+
  '<button type="button" data-clinitek-qc="hcg-qc" aria-pressed="'+(selected==='hcg-qc')+'" class="'+(selected==='hcg-qc'?'is-active':'')+'"><strong>Human chorionic gonadotropin QC</strong><small>CLINITEST cassette controls</small><span class="ac-chevron" aria-hidden="true"></span></button></div></div>';}
window.LAB_ASSAY_CATALOG={render,qcMenu,tests,shortLabel,formatTarget,formatPanelTarget,piccoloTargetStatus};
})();