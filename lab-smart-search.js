/* Lab Central smart search: discovery only, never test equivalence.
 * Numerical test codes and short abbreviations are kept exact. */
(function(){
'use strict';
const STOP=new Set(['the','and','or','a','an','of','to','for','with','me','please','find','show']);
const PHRASES=[
 ['cbc',['complete blood count','full blood count','blood cell count']],
 ['cmp',['comprehensive metabolic panel','comprehensive chemistry panel']],
 ['bmp',['basic metabolic panel','basic chemistry panel']],
 ['tsh',['thyroid stimulating hormone','thyrotropin']],
 ['hcg',['human chorionic gonadotropin','pregnancy hormone','beta hcg']],
 ['qc',['quality control','quality controls','quality check']],
 ['egfr',['estimated glomerular filtration rate','estimated gfr']],
 ['sendout',['send out','send outs','sendouts','reference laboratory testing']],
 ['inhouse',['in house','in house testing','in house tests']],
 ['poc',['point of care','point of care testing']],
 ['rpp',['respiratory pathogen panel','respiratory panel']],
 ['gipanel',['gastrointestinal pathogen panel','gi panel','gastrointestinal panel']],
 ['urinalysis',['urine dipstick','urine analysis']],
 ['lft',['liver function tests','liver function panel']],
 ['ddimer',['d dimer']],
 ['proficiency',['proficiency testing','proficiency test']],
 ['troponin',['cardiac troponin']],
 ['flu',['influenza']],
 ['covid',['covid 19','sars cov 2','sars cov2']],
 ['rsv',['respiratory syncytial virus']],
 ['strep',['streptococcus pyogenes','group a streptococcus']],
 ['pathmd',['path md']],
 ['healthtrackrx',['health track rx','health trackrx','htrx']],
 ['labcorp',['lab corp','laboratory corporation']],
 ['clinitek',['clini tek']],
 ['documents',['document','docs','pdfs']],
 ['template',['templates','forms','form']],
 ['workflow',['workflows']],
 ['log',['logs']],
 ['maintenance',['maintenence','maintanence']],
 ['troubleshooting',['troubleshoot','trouble shooting']],
 ['specimen',['sample collection']]
];
const variants=PHRASES.flatMap(([canonical,alternatives])=>
 [canonical,...alternatives].map(phrase=>({phrase,canonical})))
 .sort((a,b)=>b.phrase.length-a.phrase.length);
function norm(value){
 return String(value??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
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
function hasPhrase(raw,phrase){return (' '+raw+' ').includes(' '+phrase+' ')}
function expandText(value){
 const raw=norm(value),aliases=[];
 for(const entry of variants)if(hasPhrase(raw,entry.phrase)&&!hasPhrase(raw,entry.canonical))
  aliases.push(entry.canonical);
 return raw+(aliases.length?' '+aliases.join(' '):'');
}
function queryWords(input){
 let q=norm(input);
 for(const {phrase,canonical} of variants){
  if(phrase===canonical||!hasPhrase(q,phrase))continue;
  // All declared variants are simple alphanumeric phrases; no regex metacharacters.
  const pattern=new RegExp('(^| )'+phrase+'(?= |$)','g');
  q=q.replace(pattern,(_m,prefix)=>prefix+canonical);
 }
 return q.split(' ').filter(t=>t&&!STOP.has(t));
}
function create(text){
 const value=expandText(text);
 return {value,words:new Set(value.split(' ').filter(Boolean))};
}
function editDistance(a,b,max){
 if(Math.abs(a.length-b.length)>max)return max+1;
 let prev=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){
  const next=[i];let best=next[0];
  for(let j=1;j<=b.length;j++){
   next[j]=Math.min(prev[j]+1,next[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
   if(next[j]<best)best=next[j];
  }
  if(best>max)return max+1;
  prev=next;
 }
 return prev[b.length];
}
function isCode(t){return /\d/.test(t)}
function score(index,terms,{fuzzy=false}={}){
 if(!terms.length)return -1;
 const words=index.words||new Set(),vocab=index.wordList||Array.from(words);
 let scoreValue=0,usedFuzzy=false;
 for(const term of terms){
  if(words.has(term)){scoreValue+=30;continue}
  if(term.length>=3&&!isCode(term)&&vocab.some(w=>w.length>term.length&&w.startsWith(term))){
   scoreValue+=12;continue;
  }
  if(!fuzzy||term.length<5||isCode(term))return -1;
  const max=term.length>=9?2:1;
  let closest=max+1;
  for(const w of vocab){
   if(w.length<5||isCode(w)||Math.abs(w.length-term.length)>max)continue;
   if(w[0]!==term[0])continue;
   const dist=editDistance(term,w,max);
   if(dist<closest)closest=dist;
   if(closest===1)break;
  }
  if(closest>max)return -1;
  scoreValue+=closest===1?4:1;
  usedFuzzy=true;
 }
 return usedFuzzy?scoreValue-100:scoreValue;
}
function matches(text,query,{fuzzy=false}={}){
 return score(create(text),queryWords(query),{fuzzy})>= (fuzzy?-100:0);
}
window.LAB_SMART_SEARCH={norm,create,queryWords,score,matches,editDistance};
})();
