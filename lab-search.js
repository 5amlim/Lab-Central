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
 .replace(/\b0\s*[/\-]\s*1\s*(?:hour|hr|h)\b/g,'1h')
 .replace(/\b0\s*[/\-]\s*2\s*(?:hour|hr|h)\b/g,'2h')
 .replace(/\b1\s*(?:hour|hr|h)\b/g,'1h')
 .replace(/\b2\s*(?:hour|hr|h)\b/g,'2h')
 .replace(/\b60\s*(?:minutes?|mins?)\b/g,'1h')
 .replace(/\b120\s*(?:minutes?|mins?)\b/g,'2h')
 .replace(/\bhs[\s-]*tni\b/g,'hstni')
 .replace(/\bnt[\s-]*pro[\s-]*bnp\b/g,'ntprobnp')
 .replace(/[^a-z0-9]+/g,' ').trim();
}
const items=[
 // Workflow destinations which do not appear as individual instrument guides.
 ['Tools','eGFR calculator','2021 CKD-EPI creatinine-based estimated GFR, race-free; G1 through G5','egfr gfr renal kidney function ckd epi creatinine estimate glomerular filtration calculator','\x23piccolo/egfr-calculator'],
 ['Tools','Troponin pathway','PATHFAST high-sensitivity troponin I serial assessment and chest pain pathway','troponin hstni hs tni hs ctni chest pain acs heart score 0/1h 0/2h 1h 2h 1 hour 2 hour one hour two hour 60 minute 120 minute serial testing delta pathway repeat','\x23pathfast/chest-pain'],
 ['Tools','PATHFAST 1h / 2h serial pathway','Open the troponin pathway and timing decision reference','0/1h 0/2h 1h 2h one hour two hour 60 min 120 min serial troponin repeat delta missed window timing','\x23pathfast/chest-pain'],
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
function categoryFor(sec){
 if(sec.category==='Analyzers'||sec.category==='Point of care'||sec.category==='Archived')return 'In-house testing';
 if(sec.category==='Send-outs')return 'Sendout testing';
 if(sec.category==='Quality & compliance')return 'Quality & compliance';
 return 'Workflows';
}
function add(list,entry){if(!entry.title||!entry.href)return;list.push(entry);}
function baseIndex(ctx){
 if(cached)return cached;
 const out=[];
 items.forEach(x=>add(out,{category:x[0],title:x[1],description:x[2],keywords:x[3],href:x[4],markets:x[5]?[x[5]]:null}));
 templates.forEach(x=>add(out,{category:'Documents',title:x[1],description:'Printable laboratory template · QC, maintenance or tracking record',keywords:'pdf document form template log '+x[2],href:'lab-templates.html?template='+encodeURIComponent(x[0])}));
 checklists.forEach(x=>add(out,{category:'Documents',title:x[1],description:'PDF training and competency record',keywords:'pdf training competency document '+x[2],href:'assets/training-checklists/'+x[0]}));
 referenceDocs.forEach(x=>add(out,{category:'Documents',title:x[1],description:'Reference PDF',keywords:'pdf document reference '+x[2],href:'assets/reference-pdfs/'+x[0],markets:/^pathmd|^healthtrackrx/.test(x[0])?['socal','norcal']:null}));
 (ctx.sections||[]).concat(ctx.extras||[]).forEach(sec=>{
  const category=categoryFor(sec);
  const archived=Boolean(sec.archived||sec.category==='Archived');
  add(out,{category,title:sec.title,description:(sec.subtitle||'Open reference guide')+(archived?' · Archived reference':''),keywords:[sec.category,sec.sourceTitle,sec.sample,sec.qc,sec.title,sec.subtitle,archived?'historical archive':''].filter(Boolean).join(' '),href:'#'+sec.id,archived});
  if(!(ctx.sections||[]).includes(sec))return;
  let groups=[];
  try{groups=ctx.groupsFor(sec)||[]}catch(_){}
  groups.forEach(g=>{
   if(!g.id||g.id==='overview')return;
   const text=(g.blocks||[]).map(b=>b.text||'').join(' ').slice(0,10000);
   add(out,{category,title:sec.title+' · '+(g.title||g.id),description:'Open '+(g.title||g.id)+' section',keywords:sec.title+' '+sec.subtitle+' '+g.id+' '+text,href:'#'+sec.id+'/'+g.id,archived});
  });
  if(category==='In-house testing'&&!archived){
   add(out,{category,title:sec.title+' · Proficiency testing',description:'American Proficiency Institute (API) sample procedures',keywords:sec.title+' pt api proficiency test quality',href:'#'+sec.id+'/pt-testing'});
   add(out,{category,title:sec.title+' · Athena orders',description:'In-house test names and order sets',keywords:sec.title+' athena orders laboratory test code',href:'#'+sec.id+'/order-sets'});
  }
 });
 cached=out;
 return out;
}
function relevance(item,q,terms){
 const title=norm(item.title),desc=norm(item.description),keys=norm(item.keywords),cat=norm(item.category);
 const titleWords=new Set(title.split(' ')),fullWords=new Set((title+' '+desc+' '+keys+' '+cat).split(' '));
 const keyWords=new Set(keys.split(' '));
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
 const term=norm(q),words=term.split(' ').filter(Boolean);
 if(!words.length)return [];
 const market=ctx.market||null;
 return baseIndex(ctx).filter(x=>!x.markets||!market||x.markets.includes(market))
 .map((item,i)=>({item,score:relevance(item,term,words),i}))
 .filter(x=>x.score>=0)
 .sort((a,b)=>b.score-a.score||a.i-b.i)
 .map(x=>x.item);
}
function itemCard(x){
 const route=x.href.charAt(0)==='#';
 const label='<span class="gs-result-type">'+E(x.category)+(x.archived?' · Archived':'')+'</span><strong>'+E(x.title)+'</strong><small>'+E(x.description||'Open reference')+'</small><span class="gs-result-open">'+(route?'Open section':'Open document')+' <span aria-hidden="true">→</span></span>';
 if(route){
  const bits=x.href.slice(1).split('/');
  return '<button type="button" class="gs-result" data-go="'+E(bits[0])+'"'+(bits.length>1?' data-target-tab="'+E(bits.slice(1).join('/'))+'"':'')+'>'+label+'</button>';
 }
 return '<a class="gs-result" href="'+E(x.href)+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';
}
function render(arg){
 const q=arg.query||'',filter=CATEGORIES.includes(arg.filter)?arg.filter:'All';
 const records=find(q,arg);
 const panels=arg.panelResults||[],sendouts=arg.sendoutResults||[];
 const groups=CATEGORIES.map(category=>{
  const rows=records.filter(x=>x.category===category);
  const extraCount=category==='In-house testing'?panels.length:category==='Sendout testing'?sendouts.length:0;
  return {category,rows,count:rows.length+extraCount};
 });
 const total=groups.reduce((n,x)=>n+x.count,0);
 let html='<div class="eyebrow">LAB CENTRAL / UNIVERSAL SEARCH</div><h1 class="page-h1">Search Lab Central</h1>'+
 '<p class="lede">Results for “'+E(q)+'” across documents, tools, workflows, in-house testing and sendout references.</p>'+
 '<div class="gs-search-summary"><strong>'+total+' '+(total===1?'result':'results')+'</strong><span>Search by name, test, abbreviation or keyword. Choose a category to narrow results.</span></div>'+
 '<div class="gs-filters" role="group" aria-label="Filter search results by category">'+
 '<button type="button" data-filter="All" class="gs-filter'+(filter==='All'?' is-selected':'')+'" aria-pressed="'+(filter==='All')+'">All <span>'+total+'</span></button>'+
 groups.map(x=>'<button type="button" data-filter="'+E(x.category)+'" class="gs-filter'+(filter===x.category?' is-selected':'')+'" aria-pressed="'+(filter===x.category)+'">'+E(x.category)+' <span>'+x.count+'</span></button>').join('')+'</div>';
 const visible=groups.filter(x=>x.count&&(filter==='All'||filter===x.category));
 visible.forEach(group=>{
  html+='<section class="gs-group" aria-label="'+E(group.category)+' search results"><div class="gs-group-heading"><h2>'+E(group.category)+'</h2><span>'+group.count+' '+(group.count===1?'result':'results')+'</span></div>';
  if(group.rows.length)html+='<div class="gs-results">'+group.rows.map(itemCard).join('')+'</div>';
  if(group.category==='In-house testing'&&panels.length){
   html+='<div class="gs-assay-results"><p class="gs-assay-caption">Matching in-house assay panels</p><div class="lab-search-sources">'+arg.labSearchResultGroup('inhouse','In-house panels','Assay and pathogen matches',panels.map(arg.searchPanelCard).join(''),panels.length)+'</div></div>';
  }
  if(group.category==='Sendout testing'&&sendouts.length){
   const kinds=[['htrx','HealthTrackRx'],['pathmd','PathMD']];
   html+='<div class="gs-assay-results"><p class="gs-assay-caption">Matching molecular sendout panels</p><div class="lab-search-sources">'+
    kinds.map(kind=>{const subset=sendouts.filter(x=>x.lab===kind[0]);return arg.labSearchResultGroup(kind[0],kind[1],'Molecular sendout panel matches',subset.map(x=>arg.searchSendoutPanelCard(x,q)).join(''),subset.length)}).join('')+'</div></div>';
  }
  html+='</section>';
 });
 if(!visible.length)html+='<div class="empty-state gs-empty">No matches in '+E(filter==='All'?'Lab Central':filter)+'. Try a broader term such as “QC”, “troponin”, “eGFR”, “sendout”, or “template”.</div>';
 return html;
}
window.LAB_SITE_SEARCH={render,find,categories:CATEGORIES,resourceCount:templates.length+checklists.length+referenceDocs.length};
})();
