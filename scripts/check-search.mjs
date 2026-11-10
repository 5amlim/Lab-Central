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
 labSearchResultGroup:(kind,title,description,cards)=>'<div class="mock-panel-group">'+cards+'</div>',
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
 assert.ok(testHtml.indexOf('Matching sendout tests')>=0,term+' is not presented as a test option');
 assert.ok(testHtml.indexOf('Matching sendout tests')<testHtml.indexOf('Cedars · Procalcitonin'),term+' testing option was not prioritized');
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
console.log('Unified search keywords, templates, categories, destinations and market scoping verified.');
