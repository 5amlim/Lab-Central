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
  {id:'piccolo',title:'Piccolo Xpress',category:'Analyzers',subtitle:'Chemistry analyzer',blocks:[]}
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
assert.ok(index.includes('matches.sort((a,b)=>b.score-a.score)'), 'In-house test panels are not ranked by test/analyte specificity');

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
 dispatchEvent:()=>{}
};
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
const externalSearch=catalogWindow.LAB_SITE_SEARCH;
assert.equal(loadedPaths.length,0,'External indexes must not load before the user searches');
await externalSearch.ensureExternalCatalog('procalcitonin');
assert.equal(loadedPaths.length,2,'External catalogs should require only two lazy requests');
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
