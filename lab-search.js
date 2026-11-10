/* Lab Central unified search. Uses active page metadata and published resource links.
   Never parse patient data, query external services, or infer clinical instructions. */
(function(){
'use strict';
const CATEGORIES=['Documents','Tools','In-house testing','Sendout testing','Workflows','Quality & compliance'];
const E=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&#39;'}[c]));
function norm(s){
 return String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
 .replace(/\b(?:zero\s*[/\-]\s*)?one[\s-]*hour\b/g,'1h')
 .replace(/\b(?:zero\s*[/\-]\s*)?two[\s-]*hour\b/g,'2h')
 .replace(/\b0\s*[/\-]\s*1[\s-]*(?:hours?|hrs?|h)\b/g,'1h')
 .replace(/\b0\s*[/\-]\s*2[\s-]*(?:hours?|hrs?|h)\b/g,'2h')
 .replace(/\b1[\s-]*(?:hours?|hrs?|h)\b/g,'1h')
 .replace(/\b2[\s-]*(?:hours?|hrs?|h)\b/g,'2h')
 .replace(/\b60\s*(?:minutes?|mins?)\b/g,'1h')
 .replace(/\b120\s*(?:minutes?|mins?)\b/g,'2h')
 .replace(/\bhs[\s-]*tni\b/g,'hstni')
 .replace(/\bnt[\s-]*pro[\s-]*bnp\b/g,'ntprobnp')
 .replace(/[^a-z0-9]+/g,' ').trim();
}
const items=[
 // Workflow destinations which do not appear as individual instrument guides.
 ['Tools','eGFR calculator','2021 CKD-EPI creatinine-based estimated GFR, race-free; G1 through G5','egfr gfr renal kidney function ckd epi creatinine estimate glomerular filtration calculator','\x23piccolo/egfr-calculator'],
 ['Tools','Troponin pathway (0/1h and 0/2h)','PATHFAST high-sensitivity troponin I: routine 1-hour and provider-authorized 2-hour fallback chest pain pathways','troponin trop hstni hs tni hs ctni chest pain acs heart score 0/1h 0/2h 1h 2h 1 hour 2 hour one hour two hour 60 minute 120 minute serial testing delta pathway repeat','\x23pathfast/chest-pain'],
 ['Tools','Lab calculators and collection guides','Quest, Labcorp, Cedars, HealthTrackRx and PathMD collection references','calculator tube volume order of draw specimen collection sendout search test code','\x23calculators'],
 ['Tools','Quest specimen calculator','Quest test codes, tube volumes and specimen processing','quest calculator tubes lab calculator quest diagnostics','https://5amlim.github.io/Lab-Calculator/'],
 ['Tools','Labcorp specimen calculator','Labcorp test codes, tube volumes and specimen processing','labcorp calculator specimen tubes','https://5amlim.github.io/Lab-Calculator/labcorp.html'],
 ['Tools','Cedars specimen calculator','Southern California Cedars collection and sendout requirements','cedars cedars sinai calculator container tubes testing','https://5amlim.github.io/Lab-Calculator/cedars.html','socal'],
 ['Tools','Lab container gallery','Collection tube, swab and kit visual reference','tube types order of draw tube gallery transport containers specimen collection','\x23lab-container-gallery'],
 ['Tools','Athena in-house order directory','Search available in-house point-of-care test names and order sets','athena order sets internal analyzer point of care','\x23order-sets/in-house'],
 ['Tools','Athena sendout order directory','Sendout test ordering directory and requisition guidance','athena orders quest labcorp cedars external requisition','\x23order-sets/sendout'],
 ['Workflows','Athena ordering workflows','How to place and route in-house and sendout laboratory orders','order workflow requisition provider rn lab personnel central account','\x23orders'],
 ['Workflows','Lab sendout and courier tracking','Receiving labs, lockboxes, pickup schedules, manifests and specimens','courier htrx ups quest labcorp cedars pickup shipping track bag log transportation','\x23sendout'],
 ['Workflows','Sendout log submission','Submit a regional specimen sendout tracking log','forms sendout bag confirmation tracking number photo manifest courier','\x23sendout-log'],
 ['Workflows','Daily lab checklist','Daily laboratory checks, QC, maintenance and printable records','daily daily tasks checklist printouts binder logs','\x23socal-daily'],
 ['Workflows','Monthly lab checklist','Monthly QC, instrument maintenance and printable records','monthly tasks checklist qc logs compliance','\x23lab-monthly-checklist'],
 ['Workflows','Envi supply ordering','Facility/location selection, inventory SKU and purchase order submission','envi purchase order po vendor sku supplies ordering','\x23envi-ordering'],
 ['Workflows','Specimen drop-off','Walk-in specimen collection and handoff workflow','urine stool dropoff scheduled walkin home collection','\x23specimen-dropoff'],
 ['Workflows','Home specimen collection','Take-home urine and stool kit instructions','home urine stool take home collection kits patient guidance','\x23outside'],
 ['Workflows','Quest lockbox','Lockbox storage, collection and handoff instructions','quest lockbox evening pickup sendout courier','\x23sendout/lockbox'],
 ['Workflows','Market-specific sendout requirements','Receiving labs and market-specific pickup instructions','socal norcal new york florida laboratory courier logistics','\x23sendout/clinics'],
 ['Quality & compliance','Training and competency','Initial, six-month, annual and ongoing staff competency records','competency 6 month annual training evaluation staff checklist','\x23training-competency'],
 ['Quality & compliance','Proficiency testing (API)','American Proficiency Institute proficiency testing and submission','pt testing api proficiency quality control event vial attestation','\x23api'],
 ['Quality & compliance','Calibration verification','Calibration verification and linearity workflow guidance','calver linearity six month six-month 6 month validation','\x23calver'],
 ['Quality & compliance','PATHFAST six-month linearity','PATHFAST calibration verification and linearity checks','pathfast six month 6 month six-month linearity report','\x23pathfast/six-month-linearity'],
 ['Documents','Lab template library','Printable lab QC, maintenance, cleaning, temperature and inspection logs','template pdf forms printable log printout document records','lab-templates.html'],
 ['Documents','Lab Central reference home','Browse published clinical and operational reference pages','home overview guide reference landing','\x23home']
];
const templates=[
 ['temperature','Daily Temperature Log','fridge freezer ambient temperature humidity daily'],
 ['cleaning','Daily Cleaning and Disinfection Log','cleaning disinfection daily sanitation'],
 ['sysmex-control','Pochi Daily Blank Check and Control Log','sysmex pochi blank qc three levels daily control'],
 ['sysmex-maint','pocH-100i Maintenance Log','sysmex pochi maintenance daily cleaning'],
 ['triage-daily','Triage MeterPro Daily QC Log','triage electronic device controls daily'],
 ['clinitek-combined','CLINITEK UA + hCG Control Log','siemens clinitek urine pregnancy hcg ua qc quality control'],
 ['clinitek-maint','Siemens Urinalysis Maintenance Log','clinitek urine maintenance'],
 ['eyewash','Eyewash Station Maintenance Log','eyewash flush bump test'],
 ['waived-qc','Waived Test Quality Control Log','rapid waived qc lot shipment'],
 ['febridx-qc','FebriDx Quality Control Log','febridx crp mxa controls'],
 ['remedial','Comprehensive Remedial Action Log','corrective action tnp qc failure nonconformance'],
 ['pathfast-qc','PATHFAST CAL + QC Log','pathfast calibration combined printout controls low level 1 1b d dimer biorad'],
 ['pathfast-maint','PATHFAST Operational and Maintenance Schedule (Attachment K)','pathfast operational maintenance'],
 ['piccolo-qc','Piccolo Monthly QC Log','piccolo abaxis chemistry disc control'],
 ['triage-liquid','Triage MeterPro Monthly QC Log','triage liquid qc external controls monthly'],
 ['sofia-cal','Sofia 2 Calibration Check Log','sofia calibration'],
 ['sofia-qc','Sofia 2 QC Log','sofia covid influenza rsv strep controls'],
 ['fire-extinguisher','Fire Extinguisher Monthly Inspection Log','fire extinguisher monthly visual inspection']
];
const checklists=[
 ['Abbott_HIV_Combo_Training.pdf','Abbott HIV Combo Training Checklist','hiv ag ab p24 competency'],
 ['BioFire_SPOTFIRE_RST_Training.pdf','BioFire SPOTFIRE R/ST Training Checklist','spotfire respiratory sore throat competency'],
 ['BioFire_TORCH_Training.pdf','BioFire TORCH Training Checklist','torch gi gastrointestinal competency'],
 ['Clinitek_Status_UA_Training.pdf','CLINITEK Status UA Training Checklist','urinalysis competency'],
 ['Clinitek_Status_Urine_hCG_Training.pdf','CLINITEK Urine hCG Training Checklist','pregnancy competency'],
 ['Coag_Sense_Training.pdf','Coag-Sense Training Checklist','inr coagulation competency'],
 ['McKesson_Consult_Mononucleosis_Training.pdf','Mononucleosis Training Checklist','mckesson mono competency'],
 ['McKesson_Drugs_of_Abuse_Test_Cup_Training.pdf','Drug Screen Training Checklist','urine tox drugs abuse competency'],
 ['Piccolo_Training.pdf','Piccolo Training Checklist','abaxis chemistry competency'],
 ['Quidel_QuickVue_Influenza_AB_Training.pdf','QuickVue Influenza Training Checklist','flu archived competency'],
 ['Quidel_QuickVue_RSV_Training.pdf','QuickVue RSV Training Checklist','archived competency'],
 ['Quidel_QuickVue_SARS_Antigen_Training.pdf','QuickVue SARS Antigen Training Checklist','covid archived competency'],
 ['Quidel_QuickVue_Strep_A_Training.pdf','QuickVue Strep A Training Checklist','archived competency'],
 ['Sollis_Health_Procedure_Package.pdf','Sollis Health Procedure Package','procedures training manual sop packet'],
 ['Sysmex_pocH_100i_Training.pdf','Sysmex pocH-100i Training Checklist','pochi cbc competency']
];
const referenceDocs=[
 ['healthtrackrx-collection-reference.pdf','HealthTrackRx Collection Reference','htrx swab urine molecular sendout collecting'],
 ['healthtrackrx-menu-reference.pdf','HealthTrackRx Test Menu','htrx pathogen panel organisms molecular sendout'],
 ['pathmd-cash-pay-cap-reference.pdf','PathMD Cash-Pay Reference','pathmd price cost 150 dollar cap'],
 ['pathmd-order-shipping-reference.pdf','PathMD Ordering and Shipping Reference','pathmd courier pickup instructions specimen'],
 ['pathmd-test-menu-index.pdf','PathMD Test Menu Index','pathmd pathogens limited respiratory molecular tests']
];
let cached=null;
let externalCatalog=null, pendingCatalog=null, catalogFailed=false;
const EXTERNAL_SEARCH_FILES=[
 'assets/search/quest-tests.json',
 'assets/search/labcorp-tests.json'
];
// Only download the compact external test names and codes after a search starts.
// The full Quest/Labcorp specimen calculators remain separate applications.
function ensureExternalCatalog(query){
 if(externalCatalog||catalogFailed||norm(query).length<2||typeof fetch!=='function')return;
 if(pendingCatalog)return pendingCatalog;
 pendingCatalog=Promise.allSettled(EXTERNAL_SEARCH_FILES.map(path=>
  fetch(path).then(response=>{if(!response.ok)throw Error('Catalog unavailable');return response.json();})
 )).then(results=>{
  const rows=new Map();
  results.forEach((result,i)=>{
   if(result.status!=='fulfilled')return;
   const lab=i===0?'quest':'labcorp';
   for(const entry of result.value.tests||[]){
    const [code,name,specimen]=entry;
    if(!/^\d{2,8}$/.test(String(code||''))||!String(name||'').trim())continue;
    const key=lab+':'+code;
    if(!rows.has(key))rows.set(key,{lab,code:String(code),name:String(name),specimen:String(specimen||'')});
   }
  });
  externalCatalog=[...rows.values()];
  catalogFailed=results.some(result=>result.status!=='fulfilled');
  cached=null;
  window.dispatchEvent(new Event('labcentral:searchindexready'));
 }).catch(()=>{
  catalogFailed=true;
  window.dispatchEvent(new Event('labcentral:searchindexready'));
 });
 return pendingCatalog;
}

function categoryFor(sec){
 if(sec.category==='Analyzers'||sec.category==='Point of care'||sec.category==='Archived')return 'In-house testing';
 if(sec.category==='Send-outs')return 'Sendout testing';
 if(sec.category==='Quality & compliance')return 'Quality & compliance';
 return 'Workflows';
}
function add(list,entry){
 if(!entry.title||!entry.href)return;
 entry._search={title:norm(entry.title),description:norm(entry.description),keywords:norm(entry.keywords),category:norm(entry.category)};
 entry._search.words=new Set(Object.values(entry._search).filter(x=>typeof x==='string').join(' ').split(' '));
 const smart=window.LAB_SMART_SEARCH;
 if(smart){
  const aliases=entry.kind==='sendout-test'&&/comprehensive/i.test(entry.testName||'')&&/metabolic panel/i.test(entry.testName||'')?' cmp ':
   entry.kind==='sendout-test'&&/basic/i.test(entry.testName||'')&&/metabolic panel/i.test(entry.testName||'')?' bmp ':'';
  entry._smart=smart.create([entry.title,entry.description,entry.keywords,entry.category,aliases].join(' '));
  entry._smart.wordList=Array.from(entry._smart.words);
  entry._smartTitle=smart.create(entry.title+' '+aliases);
 }
 list.push(entry);
}
function baseIndex(ctx){
 if(cached)return cached;
 const out=[];
 items.forEach(x=>add(out,{category:x[0],title:x[1],description:x[2],keywords:x[3],href:x[4],markets:x[5]?[x[5]]:null}));
 templates.forEach(x=>add(out,{category:'Documents',title:x[1],description:'Printable laboratory template · QC, maintenance or tracking record',keywords:'pdf document form template log '+x[2],href:'lab-templates.html?template='+encodeURIComponent(x[0])}));
 checklists.forEach(x=>add(out,{category:'Documents',title:x[1],description:'PDF training and competency record',keywords:'pdf training competency document template form checklist '+x[2],href:'assets/training-checklists/'+x[0]}));
 referenceDocs.forEach(x=>add(out,{category:'Documents',title:x[1],description:'Reference PDF',keywords:'pdf document reference '+x[2],href:'assets/reference-pdfs/'+x[0],markets:/^pathmd|^healthtrackrx/.test(x[0])?['socal','norcal']:null}));
 (window.CEDARS_TESTS||[]).filter(t=>t&&t.id&&!t.hold).forEach(t=>add(out,{
  category:'Sendout testing',title:'Cedars · '+t.name,
  description:'Cedars test reference'+(t.code?' · '+t.code:'')+(t.specimen?' · '+t.specimen:''),
  keywords:[t.name,t.code,t.category,t.aliases,t.specimen,t.collect,t.submit,t.containerType,t.notes,t.temp].filter(Boolean).join(' '),
  href:'https://5amlim.github.io/Lab-Calculator/cedars.html?test='+encodeURIComponent(t.id),markets:['socal'],kind:'sendout-test',lab:'cedars',testName:t.name,code:t.code||'',specimen:t.specimen||'',container:t.collect||'',transport:t.temp||''
 }));
 (externalCatalog||[]).forEach(t=>add(out,{
  category:'Sendout testing',title:(t.lab==='quest'?'Quest':'Labcorp')+' · '+t.name,
  description:(t.code?'Test code '+t.code:'')+(t.specimen?' · '+t.specimen:''),
  keywords:[t.name,t.code,t.specimen].join(' '),kind:'sendout-test',lab:t.lab,
  testName:t.name,code:t.code,specimen:t.specimen,
  href:t.lab==='quest'?'https://5amlim.github.io/Lab-Calculator/':'https://5amlim.github.io/Lab-Calculator/labcorp.html'
 }));
 (ctx.sections||[]).concat(ctx.extras||[]).forEach(sec=>{
  const category=categoryFor(sec);
  const archived=Boolean(sec.archived||sec.category==='Archived');
  add(out,{category,title:sec.title,description:(sec.subtitle||'Open reference guide')+(archived?' · Archived reference':''),keywords:[sec.category,sec.sourceTitle,sec.sample,sec.qc,sec.title,sec.subtitle,(sec.blocks||[]).map(b=>b.text||'').join(' '),archived?'historical archive':''].filter(Boolean).join(' '),href:'#'+sec.id,archived});
  if(!(ctx.sections||[]).includes(sec))return;
  let groups=[];
  try{groups=ctx.groupsFor(sec)||[]}catch(_){}
  groups.forEach(g=>{
   if(!g.id||g.id==='overview')return;
   const text=(g.blocks||[]).map(b=>b.text||'').join(' ').slice(0,10000);
   add(out,{category,title:sec.title+' · '+(g.title||g.id),description:'Open '+(g.title||g.id)+' section',keywords:sec.title+' '+sec.subtitle+' '+g.id+' '+text,href:'#'+sec.id+'/'+g.id,archived});
  });
  if(category==='In-house testing'&&!archived){
   if(window.LAB_TROUBLESHOOTING?.ids?.includes(sec.id))
    add(out,{category:'Workflows',title:sec.title+' · Troubleshooting',description:'Instrument errors, fault messages, technical support and corrective actions',keywords:sec.title+' troubleshoot troubleshooting common issues errors fault support manufacturer technical service help',href:'#'+sec.id+'/troubleshooting'});
   if(window.LAB_PT_TESTING?.supports?.(sec))add(out,{category,title:sec.title+' · Proficiency testing',description:'American Proficiency Institute (API) sample procedures',keywords:sec.title+' pt api proficiency test quality',href:'#'+sec.id+'/pt-testing'});
   add(out,{category,title:sec.title+' · Athena orders',description:'In-house test names and order sets',keywords:sec.title+' athena orders laboratory test code',href:'#'+sec.id+'/order-sets'});
  }
 });
 cached=out;
 return out;
}
function relevance(item,q,terms,smartQuery,allowFuzzy=false){
 const smart=window.LAB_SMART_SEARCH;
 if(smart&&item._smart){
  const match=smart.score(item._smart,smartQuery,{fuzzy:allowFuzzy});
  if(match<0)return -1;
  const titleScore=smart.score(item._smartTitle,smartQuery,{fuzzy:false});
  const exactCode=item.kind==='sendout-test'&&item.code&&smartQuery.length===1&&smartQuery[0]===String(item.code);
  return match+(exactCode?500:0)+(titleScore>=0?80+titleScore:0)+
   (item._smartTitle.value===smart.norm(q)?170:0)-(item.archived?25:0);
 }
 const title=item._search.title,keys=item._search.keywords,fullWords=item._search.words;
 const titleWords=new Set(title.split(' ')),keyWords=new Set(keys.split(' '));
 for(const t of terms){
  const wordMatch=Array.from(fullWords).some(w=>t.length<=2?w===t:w===t||w.startsWith(t));
  if(!wordMatch)return -1;
 }
 let score=0;
 if(title===q)score+=150;
 if(title.startsWith(q))score+=55;
 if(title.includes(q))score+=35;
 if(keys.includes(q))score+=18;
 for(const t of terms){
  if(titleWords.has(t))score+=14;
  else if(titleWords.size&&Array.from(titleWords).some(w=>w.startsWith(t)))score+=9;
  if(keyWords.has(t))score+=5;
 }
 if(item.archived)score-=22;
 return score;
}
function find(q,ctx){
 const term=norm(q),words=term.split(' ').filter(x=>x&&!['and','or','the','for','of','to','with','in','at','a','an'].includes(x));
 if(!words.length)return [];
 const smart=window.LAB_SMART_SEARCH,smartQuery=smart?smart.queryWords(q):words;
 if(!smartQuery.length)return [];
 const market=ctx.market||null;
 const scoped=baseIndex(ctx).filter(x=>(!x.markets||!market||x.markets.includes(market))&&
  !(x.kind==='sendout-test'&&term===x.lab));
 const exact=scoped.map((item,i)=>({item,score:relevance(item,term,words,smartQuery,false),i}))
  .filter(x=>x.score>=0)
  .sort((a,b)=>b.score-a.score||a.i-b.i);
 // Fuzzy fallback only when exact/prefix results are scarce. Never approximate
 // codes, 1-4-letter analyte acronyms or numeric-containing clinical tokens.
 if(!smart||exact.length||!smartQuery.some(t=>t.length>=5&&!/\d/.test(t)))return exact.map(x=>x.item);
 const already=new Set(exact.map(x=>x.item));
 const near=scoped.map((item,i)=>({item,score:relevance(item,term,words,smartQuery,true),i}))
  .filter(x=>x.score>=0&&!already.has(x.item))
  .sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,25);
 return exact.map(x=>x.item).concat(near.map(x=>({...x.item,approximate:true})));
}
function itemCard(x){
 const route=x.href.charAt(0)==='#';
 const label='<span class="gs-result-type">'+E(x.category)+(x.archived?' · Archived':'')+'</span><strong>'+E(x.title)+'</strong>'+(x.approximate?'<span class="gs-approx-match">Possible spelling match</span>':'')+'<small>'+E(x.description||'Open reference')+'</small><span class="gs-result-open">'+(route?'Open section':'Open document')+' <span aria-hidden="true">→</span></span>';
 if(route){
  const bits=x.href.slice(1).split('/');
  return '<button type="button" class="gs-result" data-go="'+E(bits[0])+'"'+(bits.length>1?' data-target-tab="'+E(bits.slice(1).join('/'))+'"':'')+'>'+label+'</button>';
 }
 return '<a class="gs-result" href="'+E(x.href)+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';
}
// A single orderable sendout test uses the same panel card structure as
// in-house assay/pathogen results. The source heading lives above the cards.
function sendoutTestCard(x){
 const lab=x.lab==='quest'?'Quest':x.lab==='labcorp'?'Labcorp':'Cedars-Sinai';
 const name=x.testName||x.title.replace(/^[^·]+·\s*/,'');
 const code=x.code||'';
 const specimen=x.specimen||'';
 const isCedars=x.lab==='cedars';
 const linkLabel=isCedars?'Open Cedars test':'Open '+lab+' calculator';
 const note=isCedars
  ?'Verify the current collection and shipping instructions before sending.'
  :'Find code '+code+' in the calculator to confirm specimen requirements.';
 return '<article class="lab-panel-search-result lab-panel-sendout-result gs-orderable-test">'+
  '<div class="lab-panel-search-top"><div class="gs-test-title">'+
   '<small>'+E(lab)+' <span class="lab-panel-sendout-kind">SENDOUT TEST</span></small>'+
   '<h3>'+E(name)+'</h3>'+(x.approximate?'<span class="gs-approx-match">Possible spelling match · check name and code</span>':'')+
   (code?'<div class="gs-test-code"><span>Test code</span><strong>'+E(code)+'</strong></div>':'')+
   '</div><a class="lab-panel-open" href="'+E(x.href)+'" target="_blank" rel="noopener noreferrer"'+
    (code?' title="Look up test code '+E(code)+' in '+E(lab)+'"':'')+'>'+E(linkLabel)+' <span aria-hidden="true">→</span></a></div>'+
  (specimen||x.container||x.transport?
   '<div class="lab-panel-target-hits gs-test-specimens"><strong>Specimen / collection</strong>'+
    (specimen?'<span class="lab-panel-target-match">'+E(specimen)+'</span>':'')+
    (x.container?'<span class="lab-panel-target-match">'+E(x.container)+'</span>':'')+
    (x.transport?'<span class="lab-panel-target-match">'+E(x.transport)+'</span>':'')+
   '</div>':'')+
  '<p class="gs-test-verification">'+E(note)+'</p></article>';
}
const SENDOUT_SOURCES=[
 {id:'quest',name:'Quest',description:'Quest Diagnostics · Test codes and specimen references'},
 {id:'labcorp',name:'Labcorp',description:'Labcorp · Test codes and specimen references'},
 {id:'cedars',name:'Cedars-Sinai',description:'Cedars · Curated local sendout test menu'},
 {id:'htrx',name:'HealthTrackRx',description:'Molecular sendout panels and pathogen targets'},
 {id:'pathmd',name:'PathMD',description:'Molecular sendout panels and pathogen targets'}
];
function renderSendoutSources(tests,sendouts,q,arg){
 const out=[];
 for(const source of SENDOUT_SOURCES){
  const labTests=tests.filter(test=>test.lab===source.id);
  const molecular=sendouts.filter(panel=>panel.lab===source.id);
  if(!labTests.length&&!molecular.length)continue;
  const cards=[];
  // Keep the matched molecular panels and their original interactive
  // order information, then append the source's individual orderable tests.
  if(molecular.length)cards.push(...molecular.map(panel=>arg.searchSendoutPanelCard(panel,q)));
  const shownLimit=Math.max(6,Number(arg.visibleByLab?.[source.id])||6);
  const shown=labTests.slice(0,shownLimit);
  cards.push(...shown.map(sendoutTestCard));
  if(labTests.length>shown.length){
   const remaining=labTests.length-shown.length;
   cards.push('<button type="button" class="gs-show-more" data-search-more="'+E(source.id)+'">'+
    'Show more '+E(source.name)+' tests <span>'+Math.min(6,remaining)+' more of '+remaining+'</span></button>');
  }
  out.push(arg.labSearchResultGroup(
   source.id,source.name,source.description,cards.join(''),labTests.length+molecular.length
  ));
 }
 return out.join('');
}
function render(arg){
 const q=arg.query||'',filter=CATEGORIES.includes(arg.filter)?arg.filter:'All';
 ensureExternalCatalog(q);
 const records=find(q,arg);
 const panels=arg.panelResults||[],sendouts=arg.sendoutResults||[];
 const directSendoutTests=records.filter(x=>x.kind==='sendout-test');
 const groups=CATEGORIES.map(category=>{
  const rows=records.filter(x=>x.category===category);
  const extraCount=category==='In-house testing'?panels.length:category==='Sendout testing'?sendouts.length:0;
  return {category,rows,count:rows.length+extraCount};
 });
 const total=groups.reduce((n,x)=>n+x.count,0);
 // Prioritize real testing options when a clinical assay or pathogen matches.
 // Searches specifically about documents, workflows or tools keep those resources first.
 const resourceIntent=/\b(?:template|templates|log|logs|form|forms|document|documents|pdf|checklist|checklists|training|competency|calibration|maintenance|qc|quality|workflow|workflows|calculator|pathway|order|orders|ordering|shipping|courier)\b/.test(norm(q));
 const testingFirst=Boolean((panels.length||sendouts.length||directSendoutTests.length)&&!resourceIntent);
 let html='<div class="eyebrow">LAB CENTRAL / UNIVERSAL SEARCH</div><h1 class="page-h1">Search Lab Central</h1>'+
 '<p class="lede">Results for “'+E(q)+'” across documents, tools, workflows, in-house testing and sendout references.</p>'+
 '<div class="gs-search-summary"><strong>'+total+' '+(total===1?'result':'results')+'</strong><span>Search by test name, code, category, shorthand or keyword. Word order and small spelling mistakes are supported.</span></div>'+
 ([].concat(records,panels,sendouts).some(x=>x.approximate)?'<p class="gs-index-status">Some results are approximate spelling matches. Confirm the exact test name and code before using a collection guide.</p>':'')+
 (pendingCatalog&&!externalCatalog?'<p class="gs-index-status" role="status">Loading Quest and Labcorp test indexes…</p>':'')+
 (catalogFailed?'<p class="gs-index-status">Some external test indexes could not be loaded. Open the calculators for full searches.</p>':'')+
 '<div class="gs-filters" role="group" aria-label="Filter search results by category">'+
 '<button type="button" data-filter="All" class="gs-filter'+(filter==='All'?' is-selected':'')+'" aria-pressed="'+(filter==='All')+'">All <span>'+total+'</span></button>'+
 groups.map(x=>'<button type="button" data-filter="'+E(x.category)+'" class="gs-filter'+(filter===x.category?' is-selected':'')+'" aria-pressed="'+(filter===x.category)+'">'+E(x.category)+' <span>'+x.count+'</span></button>').join('')+'</div>';
 const visible=groups.filter(x=>x.count&&(filter==='All'||filter===x.category));
 if(testingFirst){
  // A Cedars analyte with no in-house panel should be the first result, not
  // an empty In-house heading or an unrelated guide/document match.
  const priority=panels.length
   ?{'In-house testing':0,'Sendout testing':1}
   :{'Sendout testing':0,'In-house testing':1};
  visible.sort((a,b)=>(priority[a.category]??2)-(priority[b.category]??2));
 }
 visible.forEach(group=>{
  html+='<section class="gs-group" aria-label="'+E(group.category)+' search results"><div class="gs-group-heading"><h2>'+E(group.category)+'</h2><span>'+group.count+' '+(group.count===1?'result':'results')+'</span></div>';
  // Matching assay cards are the primary action for test-name searches.
  // Related analyzer and workflow guide cards come afterward.
  if(group.category==='In-house testing'&&panels.length){
   html+='<div class="gs-assay-results gs-assay-first"><p class="gs-assay-caption">Matching in-house testing options</p><div class="lab-search-sources">'+arg.labSearchResultGroup('inhouse','In-house panels','Assay and pathogen matches',panels.map(arg.searchPanelCard).join(''),panels.length)+'</div></div>';
  }
  const tests=group.category==='Sendout testing'?group.rows.filter(x=>x.kind==='sendout-test'):[];
  const related=group.rows.filter(x=>x.kind!=='sendout-test');
  if(group.category==='Sendout testing'&&(tests.length||sendouts.length)){
   html+='<div class="gs-assay-results gs-assay-first"><p class="gs-assay-caption">Matching sendout testing options</p><div class="lab-search-sources gs-sendout-sources">'+renderSendoutSources(tests,sendouts,q,arg)+'</div></div>';
  }
  if(related.length){
   if((group.category==='In-house testing'&&panels.length)||(group.category==='Sendout testing'&&(sendouts.length||tests.length)))
    html+='<p class="gs-assay-caption">Related guides and references</p>';
   html+='<div class="gs-results">'+related.map(itemCard).join('')+'</div>';
  }
  html+='</section>';
 });
 if(!visible.length)html+='<div class="empty-state gs-empty">No matches in '+E(filter==='All'?'Lab Central':filter)+'. Try a broader term such as “QC”, “troponin”, “eGFR”, “sendout”, or “template”.</div>';
 return html;
}
window.LAB_SITE_SEARCH={render,find,categories:CATEGORIES,resourceCount:templates.length+checklists.length+referenceDocs.length,ensureExternalCatalog};
})();
