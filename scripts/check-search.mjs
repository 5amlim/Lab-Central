#!/usr/bin/env node
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(resolve(root,'lab-search.js'),'utf8');
const index=readFileSync(resolve(root,'index.html'),'utf8');
const templatePage=readFileSync(resolve(root,'lab-templates.html'),'utf8');
const browser={
 CEDARS_TESTS:[{id:'procalcitonin',name:'Procalcitonin, serum or plasma (PCT)',aliases:'PCT sepsis',code:'PCT',specimen:'Serum',hold:false}],
 LAB_PT_TESTING:{supports:()=>true}
};
runInNewContext(source,{window:browser});
const search=browser.LAB_SITE_SEARCH;
assert.ok(search,'Global search module did not initialize');
assert.deepEqual(Array.from(search.categories),['Documents','Tools','In-house testing','Sendout testing','Workflows','Quality & compliance']);
const ctx={
 market:'socal',
 sections:[
  {id:'pathfast',title:'PATHFAST',category:'Analyzers',subtitle:'Cardiac marker analyzer',blocks:[{type:'list',level:0,text:'Daily QC'},{type:'list',level:1,text:'Check controls before testing'}]},
  {id:'piccolo',title:'Piccolo Xpress',category:'Analyzers',subtitle:'Chemistry analyzer',blocks:[]},
  {id:'sysmex',title:'Sysmex pocH-100i',category:'Analyzers',subtitle:'CBC analyzer',blocks:[]}
 ],
 extras:[],
 groupsFor:s=>s.id==='pathfast'?[{id:'daily-qc',title:'Daily QC',blocks:s.blocks}]:[]
};
function expectResult(q,fragment,market='socal'){
 const results=search.find(q,{...ctx,market});
 assert.ok(results.some(x=>x.href.includes(fragment)),q+' did not locate '+fragment);
}
for(const q of ['troponin pathway','1h','0/1h','0/1-hour','1-hour','one-hour','60 minute','2h','0/2h','0/2-hour','2-hour troponin','two hour','120 minute','1h and 2h pathway'])
 expectResult(q,'#pathfast/chest-pain');
for(const q of ['eGFR','estimated gfr','CKD-EPI'])expectResult(q,'#piccolo/egfr-calculator');
expectResult('procalcitonin','cedars.html?test=procalcitonin');
expectResult('PCT','cedars.html?test=procalcitonin');
expectResult('blank check log','template=sysmex-control');
expectResult('fire extinguisher inspection','template=fire-extinguisher');
expectResult('training checklist','assets/training-checklists/');
expectResult('Quest lockbox','#sendout/lockbox');
assert.ok(!search.find('procalcitonin',{...ctx,market:'ny'}).some(x=>x.title.startsWith('Cedars')),'Cedars test leaked into NY market results');

// Test-name searches should lead with actual assays rather than generic guides.
const samplePanels=[{id:'flu-test'}];
const renderArgs={
 ...ctx,query:'flu',filter:'All',
 sections:[...ctx.sections,{id:'sofia',title:'Sofia 2',subtitle:'Flu and COVID testing',category:'Point of care',blocks:[]}],
 panelResults:samplePanels,sendoutResults:[],
 labSearchResultGroup:(kind,title,description,cards,count)=>'<section class="lab-search-source lab-search-source-'+kind+'" aria-label="'+title+' matches"><header>'+title+' · '+count+'</header><div class="mock-panel-group">'+cards+'</div></section>',
 searchPanelCard:()=>'<div class="mock-flu-panel">Flu testing option</div>',
 searchSendoutPanelCard:()=>''
};
const fluHtml=search.render(renderArgs);
assert.ok(fluHtml.indexOf('aria-label="In-house testing search results"')>=0,'Missing in-house testing group');
assert.ok(fluHtml.indexOf('mock-flu-panel')<fluHtml.indexOf('class="gs-results"'),'Testing panels must precede related instrument guides');
assert.ok(fluHtml.indexOf('gs-group-heading')<fluHtml.indexOf('mock-flu-panel'),'Testing group heading missing');
// Named destinations lead directly to their equipment, lab calculator or quality card.
// Avoid duplicate cards while retaining the normal category and test-name searches.
for(const [term,title,link] of [
 ['piccolo','Piccolo Xpress','data-go="piccolo"'],
 ['pathfast','PATHFAST','data-go="pathfast"'],
 ['quest','Quest specimen calculator','https://5amlim.github.io/Lab-Calculator/'],
 ['labcorp','Labcorp specimen calculator','labcorp.html'],
 ['cedars','Cedars specimen calculator','cedars.html'],
 ['api','Proficiency testing (API)','data-go="api"'],
 ['envi','Envi supply ordering','data-go="envi-ordering"'],
 ['eGFR','eGFR calculator','data-target-tab="egfr-calculator"']
]){
 const markup=search.render({...renderArgs,query:term,panelResults:[],sendoutResults:[]});
 const start=markup.indexOf('aria-label="Top search result"');
 assert.ok(start>=0,term+' should have a top destination card');
 const top=markup.slice(start,markup.indexOf('</section>',start));
 assert.ok(top.includes(title)&&top.includes(link),term+' top destination was incorrect');
 assert.equal(markup.split('>'+title+'</strong>').length,2,term+' repeated its featured card');
}
const pochiMarkup=search.render({...renderArgs,query:'pochi',panelResults:[],sendoutResults:[]});
assert.ok(pochiMarkup.includes('aria-label="Top search result"')&&
 pochiMarkup.includes('data-go="sysmex"'),'Pochi nickname must open the Sysmex instrument');
const piccoloWithPanels=search.render({...renderArgs,query:'piccolo'});
assert.ok(piccoloWithPanels.indexOf('aria-label="Top search result"')<
 piccoloWithPanels.indexOf('mock-flu-panel'),'Named analyzer guide must lead before related assays');
for(const term of ['piccolo qc log','quest troponin','troponin','flu']){
 const markup=search.render({...renderArgs,query:term});
 assert.ok(!markup.includes('aria-label="Top search result"'),
  term+' should keep its task or assay results rather than a generic direct shortcut');
}
const apiFiltered=search.render({...renderArgs,query:'api',filter:'Tools',panelResults:[],sendoutResults:[]});
assert.ok(!apiFiltered.includes('aria-label="Top search result"'),
 'Direct destination card must respect category filtering');
// Sidebar typeahead must respect named destinations, testing intent and search scope.
const quickSuggest=(term,overrides={})=>search.suggestions(term,{...renderArgs,...overrides});
for(const [term,title] of [
 ['piccolo','Piccolo Xpress'],
 ['quest','Quest specimen calculator'],
 ['labcorp','Labcorp specimen calculator'],
 ['api','Proficiency testing (API)'],
 ['pathfast','PATHFAST']
]){
 const suggestions=quickSuggest(term,{panelResults:[],sendoutResults:[]});
 assert.equal(suggestions[0]?.title,title,term+' quick suggestion must lead with its direct destination');
 assert.ok(suggestions.length<=6,term+' suggestion panel exceeded its compact limit');
}
const analyteSuggestions=quickSuggest('troponin',{
 panelResults:[{section:ctx.sections[0],panel:{title:'High-sensitivity cardiac troponin I'}}],
 sendoutResults:[]
});
assert.equal(analyteSuggestions[0]?.title,'High-sensitivity cardiac troponin I',
 'Analyte typeahead should put in-house test panels ahead of guides');
assert.equal(analyteSuggestions[0]?.action,'search','Panel typeahead must return to test search results');
const documentSuggestions=quickSuggest('qc log',{panelResults:[],sendoutResults:[]});
assert.equal(documentSuggestions[0]?.category,'Documents',
 'Explicit QC log autocomplete must prioritize documents');
assert.ok(index.includes('id="searchSuggestions"')&&index.includes('id="clearSearch"')&&
 index.includes('role="combobox"')&&index.includes('aria-controls="searchSuggestionOptions"'),
 'Accessible search autocomplete or custom clear button is missing');
assert.ok(index.includes("highlightSearchSuggestion(")&&index.includes("refreshSearchSuggestions()"),
 'Search keyboard navigation and live suggestions must be wired');
const searchCss=readFileSync(resolve(root,'lab-search.css'),'utf8');
assert.ok(searchCss.includes('.sidebar .sidebar-search input::-webkit-search-cancel-button')&&
 searchCss.includes('.sidebar .sidebar-search .sidebar-search-clear')&&
 searchCss.includes('.sidebar .sidebar-search .search-suggestions'),
 'Sidebar search input sizing, custom clear icon, or dropdown styles are missing');
const resourceHtml=search.render({...renderArgs,query:'qc log'});
assert.ok(resourceHtml.indexOf('aria-label="Documents search results"')<resourceHtml.indexOf('aria-label="In-house testing search results"'),'Document-focused searches must keep documents first');
// Direct test-name and analyte hits are primary results even when no in-house
// or molecular panel matches. Cedars has its own verified local test index.
for(const term of ['procalcitonin','PCT']){
 const testHtml=search.render({...renderArgs,query:term,panelResults:[],sendoutResults:[]});
 assert.ok(testHtml.indexOf('aria-label="Sendout testing search results"')>=0,term+' sendout test is missing');
 assert.ok(testHtml.indexOf('Matching sendout testing options')>=0,term+' is not presented as a test option');
 assert.ok(testHtml.indexOf('Matching sendout testing options')<testHtml.indexOf('<h3>Procalcitonin, serum or plasma (PCT)</h3>'),term+' testing option was not prioritized');
 assert.ok(testHtml.indexOf('aria-label="Sendout testing search results"')<testHtml.indexOf('aria-label="Documents search results"')||!testHtml.includes('aria-label="Documents search results"'),term+' did not put testing first');
}
assert.ok(index.includes('strict.sort((a,b)=>b.score-a.score)')&&index.includes('near.sort((a,b)=>b.score-a.score)'), 'In-house exact and approximate panels are not ranked by specificity');

const formsPart=templatePage.split('const forms=[')[1]?.split('\n];')[0]||'';
const formIds=Array.from(formsPart.matchAll(/\{id:'([^']+)'/g),x=>x[1]);
assert.ok(formIds.length>=18,'Unable to audit template list');
for(const id of formIds){
 assert.ok(source.includes("['"+id+"'"),'Template is missing from global search: '+id);
}
for(const href of search.find('training checklist',ctx).map(x=>x.href).filter(x=>x.startsWith('assets/'))){
 assert.ok(existsSync(resolve(root,href)), 'Broken global search PDF link: '+href);
}
assert.ok(index.includes('lab-search.js?v='),'Main page does not load global search');
assert.ok(index.includes('lab-search.css?v='),'Main page does not load search styles');
assert.ok(index.includes('LAB_SITE_SEARCH.render'),'Main search is not connected');
assert.ok(index.includes("sec.id==='pathfast'&&tab==='chest-pain'"),'Troponin deep link route missing');
assert.ok(index.includes("sec.id==='piccolo'&&tab==='egfr-calculator'"),'eGFR deep link route missing');
// The full Quest/Labcorp catalogs load only on demand, from compact local data.
const questIndex=JSON.parse(readFileSync(resolve(root,'assets/search/quest-tests.json'),'utf8'));
const labcorpIndex=JSON.parse(readFileSync(resolve(root,'assets/search/labcorp-tests.json'),'utf8'));
assert.ok(questIndex.tests.length>=2600,'Quest test code search coverage unexpectedly reduced');
assert.ok(labcorpIndex.tests.length>=1300,'Labcorp test code search coverage unexpectedly reduced');
assert.ok(readFileSync(resolve(root,'assets/search/quest-tests.json')).length<200000,'Quest index is too large');
assert.ok(readFileSync(resolve(root,'assets/search/labcorp-tests.json')).length<120000,'Labcorp index is too large');
const catalogWindow={
 CEDARS_TESTS:browser.CEDARS_TESTS,
 LAB_PT_TESTING:{supports:()=>true},
 LAB_TROUBLESHOOTING:{ids:['pathfast','piccolo']},
 dispatchEvent:()=>{}
};
const smartSource=readFileSync(resolve(root,'lab-smart-search.js'),'utf8');
runInNewContext(smartSource,{window:catalogWindow});
const loadedPaths=[];
runInNewContext(source,{
 window:catalogWindow,
 Event:class Event{constructor(type){this.type=type}},
 fetch:async path=>{
  loadedPaths.push(path);
  const data=JSON.parse(readFileSync(resolve(root,path),'utf8'));
  return {ok:true,json:async()=>data};
 }
});
const smart=catalogWindow.LAB_SMART_SEARCH;
assert.ok(smart,'Shared smart search was not initialized');
for(const [field,query] of [
 ['Comprehensive Metabolic Panel','cmp'],
 ['Comprehensive Metabolic Panel','metabolic panel comprehensive'],
 ['Complete Blood Count with Differential','cbc'],
 ['Influenza A virus','flu'],
 ['Urinalysis reagent strip','urine analysis'],
 ['Proficiency testing guide','proficiency testing'],
 ['Daily Quality Control Log','qc log'],
 ['Pathfast technical support and troubleshooting','troubleshoot support'],
 ['Daily QC log','q c']
])assert.ok(smart.matches(field,query),'Shorthand or word-order search failed: '+query);
for(const [field,query] of [
 ['Procalcitonin serum','procalcitonn'],
 ['Chemistry analyzer','chemstry'],
 ['Training template checklist','traning templtes'],
 ['Cardiac troponin pathway','tropnin pathway']
])assert.ok(smart.matches(field,query,{fuzzy:true}),'Typo-tolerant search failed: '+query);
assert.ok(!smart.matches('Quest 593 Lactate Dehydrogenase','594',{fuzzy:true}),'Test codes must remain exact');
assert.ok(!smart.matches('Labcorp 001453 Hemoglobin A1c','001454',{fuzzy:true}),'Leading-zero codes must remain exact');
assert.ok(!smart.matches('Red Blood Cell Count','cbc'),'CBC must not be equivalent to an individual RBC count');
const externalSearch=catalogWindow.LAB_SITE_SEARCH;
assert.equal(loadedPaths.length,0,'External indexes must not load before the user searches');
await externalSearch.ensureExternalCatalog('procalcitonin');
assert.equal(loadedPaths.length,2,'External catalogs should require only two lazy requests');

const troponinOptions=externalSearch.render({...renderArgs,query:'troponin',panelResults:samplePanels});
const inHouseOptionAt=troponinOptions.indexOf('mock-flu-panel');
const sendoutOptionAt=troponinOptions.indexOf('Matching sendout testing options');
const toolResultAt=troponinOptions.indexOf('aria-label="Tools search results"');
assert.ok(inHouseOptionAt>=0&&sendoutOptionAt>inHouseOptionAt&&toolResultAt>sendoutOptionAt,
 'Troponin search should show both testing options before the troponin pathway tool');
const fluOptions=externalSearch.render({...renderArgs,query:'flu',panelResults:samplePanels,
 sendoutResults:[{lab:'htrx',name:'Flu molecular panel',labName:'HealthTrackRx',hits:[],targets:[],groups:{}}],
 searchSendoutPanelCard:()=>'<article class="mock-molecular">Flu molecular option</article>'});
const fluInHouseAt=fluOptions.indexOf('mock-flu-panel');
const fluSendoutAt=fluOptions.indexOf('mock-molecular');
const fluDocumentAt=fluOptions.indexOf('aria-label="Documents search results"');
assert.ok(fluInHouseAt>=0&&fluSendoutAt>fluInHouseAt&&fluDocumentAt>fluSendoutAt,
 'Pathogen search should show in-house and sendout tests before reference documents');
const explicitPathway=externalSearch.render({...renderArgs,query:'troponin pathway',panelResults:samplePanels});
assert.ok(explicitPathway.indexOf('aria-label="Tools search results"')<
 explicitPathway.indexOf('aria-label="In-house testing search results"'),
 'Explicit pathway searches should continue prioritizing the requested tool');
const sendoutFilter=externalSearch.render({...renderArgs,query:'troponin',filter:'Sendout testing',panelResults:samplePanels});
assert.ok(sendoutFilter.includes('aria-label="Sendout testing search results"')&&
 !sendoutFilter.includes('aria-label="In-house testing search results"'),
 'Category filter must continue showing only requested test sources');

for(const [needle,lab,code] of [
 ['322000','labcorp','322000'],
 ['001453','labcorp','001453'],
 ['005009','labcorp','005009'],
 ['acetaminophen','quest','201'],
 ['procalcitonin','cedars','PCT']
]){
 const options=externalSearch.find(needle,ctx);
 assert.ok(options.some(x=>x.kind==='sendout-test'&&x.lab===lab&&x.code===code),
  needle+' did not find expected '+lab+' code '+code);
}
const syntheticCtx={...ctx,sections:[...ctx.sections,{id:'piccolo',title:'Piccolo Xpress',subtitle:'Chemistry analyzer',category:'Analyzers',blocks:[]}]};
for(const [query,category,fragment] of [
 ['procalcitonn','Sendout testing','Procalcitonin'],
 ['pottassium','Sendout testing','Potassium'],
 ['metabolic panel comprehensive','Sendout testing','Metabolic Panel'],
 ['labcorp cmp','Sendout testing','Metabolic Panel'],
 ['training templates','Documents','Training Checklist'],
 ['templates training','Documents','Training Checklist'],
 ['traning templtes','Documents','Training Checklist'],
 ['tropnin pathway','Tools','Troponin pathway'],
 ['quality control log','Documents','QC Log'],
 ['piccolo chemstry','In-house testing','Piccolo']
]){
 const hits=externalSearch.find(query,syntheticCtx);
 assert.ok(hits.some(x=>x.category===category&&x.title.toLowerCase().includes(fragment.toLowerCase())),
  query+' did not find '+category+' / '+fragment);
}
assert.ok(!externalSearch.find('quest 594',ctx).some(x=>x.code==='593'),'Wrong Quest numeric code matched');
assert.ok(!externalSearch.find('labcorp 001454',ctx).some(x=>x.code==='001453'),'Wrong Labcorp numeric code matched');
const labcorpResult=externalSearch.render({...renderArgs,query:'322000',panelResults:[],sendoutResults:[]});
assert.ok(labcorpResult.includes('class="lab-panel-search-result lab-panel-sendout-result gs-orderable-test"'),'External test is not using detailed in-house-style card');
assert.ok(labcorpResult.includes('Open Labcorp calculator'),'Missing Labcorp calculator link');
const questResult=externalSearch.render({...renderArgs,query:'201',panelResults:[],sendoutResults:[]});
assert.ok(questResult.includes('Open Quest calculator'),'Missing Quest calculator link');
const broadResult=externalSearch.render({...renderArgs,query:'serum',panelResults:[],sendoutResults:[],visibleByLab:{}});
assert.ok(broadResult.includes('data-search-more="quest"'),'Broad Quest test search must offer vendor-specific show-more results');
assert.ok(broadResult.includes('data-search-more="labcorp"'),'Broad Labcorp test search must offer vendor-specific show-more results');
assert.ok(broadResult.includes('lab-search-source-quest'),'Quest results need their own header');
assert.ok(broadResult.includes('lab-search-source-labcorp'),'Labcorp results need their own header');
assert.ok(broadResult.indexOf('lab-search-source-quest')<broadResult.indexOf('lab-search-source-labcorp'),'Keep sendout sources in a stable readable order');
const firstPageCards=(broadResult.match(/class="lab-panel-search-result lab-panel-sendout-result gs-orderable-test"/g)||[]).length;
assert.ok(firstPageCards>=12,'Show six test cards per matching external catalog plus eligible Cedars matches');
const expanded=externalSearch.render({...renderArgs,query:'serum',panelResults:[],sendoutResults:[],visibleByLab:{quest:12}});
assert.equal((expanded.match(/class="lab-panel-search-result lab-panel-sendout-result gs-orderable-test"/g)||[]).length,firstPageCards+6,'Show more must expand only the requested receiving lab');
const cedarsResult=externalSearch.render({...renderArgs,query:'procalcitonin',panelResults:[],sendoutResults:[]});
assert.ok(cedarsResult.includes('lab-search-source-cedars'),'Cedars must have a source header');
assert.ok(cedarsResult.includes('Open Cedars test'),'Cedars result must retain its direct test reference');
const molecularGroup=externalSearch.render({...renderArgs,query:'flu',panelResults:[],sendoutResults:[
 {lab:'htrx',name:'Flu COVID RSV',labName:'HealthTrackRx',hits:[],targets:[],groups:{}},
 {lab:'pathmd',name:'Flu panel',labName:'PathMD',hits:[],targets:[],groups:{}}
 ],searchSendoutPanelCard:x=>'<article class="mock-molecular">'+x.name+'</article>'});
assert.ok(molecularGroup.includes('lab-search-source-htrx'),'HealthTrackRx must have its own header');
assert.ok(molecularGroup.includes('lab-search-source-pathmd'),'PathMD must have its own header');
assert.ok(index.includes('visibleByLab:state.searchVisibleByLab'),'Search must pass independent per-lab pagination state');
assert.ok(index.includes('data-search-more'),'Show-more clicks must be handled by Lab Central');
assert.ok(index.includes('labcentral:searchindexready'),'External index loading should refresh open search results');
console.log('Verified '+questIndex.tests.length+' Quest and '+labcorpIndex.tests.length+' Labcorp indexed names/codes, lazy loading and assay-style results.');
console.log('Unified search keywords, templates, categories, destinations and market scoping verified.');
