#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const src=readFileSync(resolve(root,'instrument-troubleshooting.js'),'utf8');
const css=readFileSync(resolve(root,'instrument-troubleshooting.css'),'utf8');
const html=readFileSync(resolve(root,'index.html'),'utf8');
const env={window:{},document:{addEventListener:()=>{}}};
runInNewContext(src,env,{filename:'instrument-troubleshooting.js'});
const m=env.window.LAB_TROUBLESHOOTING;
assert.ok(m?.render&&m?.support,'Troubleshooting support is not exported');
const ids=Array.from(m.ids);
assert.equal(ids.length,13,'All troubleshooting guides must be accounted for');
for(const id of ids){
 const support=m.support[id];
 assert.ok(support,'Missing technical support contact for '+id);
 assert.ok(support.phone||support.email,'No contact method for '+id);
 assert.match(support.url||'',/^https:\/\/[^ ]+$/,'Official contact URL missing for '+id);
 if(support.phone){
  assert.match(support.dial||'',/^\+1\d{10}$/,'Non-dialable support phone for '+id);
 }
 if(support.email){
  assert.match(support.email,/^[^@\s]+@[^@\s]+\.[^@\s]+$/,'Invalid support email for '+id);
 }
 const result=m.render(id);
 assert.ok(result.includes('TECHNICAL / PRODUCT SUPPORT'), 'Missing in-header support panel: '+id);
 assert.ok(result.includes('lt-hero-sidebar'),'Support contact is not in header: '+id);
 assert.ok(result.includes(support.phone||support.email),'Missing phone/email markup for '+id);
 assert.ok(result.includes('Official contact source'),'Missing traceable official link for '+id);
 assert.ok(result.includes('href="tel:')||result.includes('href="mailto:'),'Contact not clickable for '+id);
 assert.ok(result.includes('common issues'),'Issue counter regressed: '+id);
}
const poc=m.render('poc');
assert.ok(poc.includes('QuidelOrtho')&&poc.includes('McKesson'),'Generic POC troubleshooting must distinguish kit vendors');
const sysmex=m.render('sysmex');
assert.ok(sysmex.includes('7 AM–7 PM Central'),'pocH-specific support hours missing');
assert.ok(!sysmex.includes('24/7'),'pocH must not inherit general Sysmex 24/7 TAC hours');
assert.ok(m.render('pathfast').includes('Published customer service contact'),'PATHFAST customer service must not be incorrectly called verified direct technical support');
assert.ok(css.includes('@media(max-width:920px)'),'Contact must be responsive');
assert.ok(html.includes('instrument-troubleshooting.js'),'Live site must load troubleshooting script');
console.log('Verified technical support contacts, links, and header layout on '+ids.length+' troubleshooting pages.');
