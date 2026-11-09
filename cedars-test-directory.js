/* Searchable Southern California Cedars reference inside Lab Central.
 * Entries mirror the existing Cedars Lab Guide; do not use as standalone clinical instructions.
 */
(function(){
"use strict";
const all=(window.CEDARS_TESTS||[]).filter(t=>t&&t.id);
const active=all.filter(t=>!t.hold);
const unavailable=all.length-active.length;
const categories=["All","Blood","Swab","Urine","Stool","Other"];
const size=10;
let query="",category="All",page=0;
const E=value=>String(value==null?"":value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=value=>String(value||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
function matches(test,needle){
 if(!needle)return true;
 const source=[test.name,test.code,test.category,test.specimen,test.collect,test.submit,test.aliases,test.notes,test.containerType].join(" ");
 return norm(source).includes(needle);
}
function sorted(){
 const needle=norm(query);
 return active.filter(t=>(category==="All"||t.category===category)&&matches(t,needle))
  .sort((a,b)=>categories.indexOf(a.category)-categories.indexOf(b.category)||a.name.localeCompare(b.name));
}
function menuChips(){
 return categories.map(cat=>{
  const n=cat==="All"?active.length:active.filter(t=>t.category===cat).length;
  if(!n)return "";
  return '<button type="button" class="cedars-menu-chip'+(cat===category?' is-selected':'')+'" data-cedars-category="'+E(cat)+'" aria-pressed="'+String(cat===category)+'">'+E(cat)+' <span>'+n+'</span></button>';
 }).join("");
}
function field(title,value){
 if(!value)return "";
 return '<div class="cedars-test-field"><dt>'+E(title)+'</dt><dd>'+E(value)+'</dd></div>';
}
function testRow(t){
 const badge=t.statLocalWorkflow?'<span class="cedars-test-tag stat">Local STAT workflow</span>':
  t.sourceNote&&/local/i.test(t.sourceNote)?'<span class="cedars-test-tag local">Local reference</span>':"";
 const code=t.code?'<span class="cedars-test-code">'+E(t.code)+'</span>':"";
 const qty=t.qty?String(t.qty)+' '+(Number(t.qty)===1?'container':'containers'):"";
 const details=field("Specimen",t.specimen)+field("Collection container",t.collect)+
  field("Submission container",t.submit)+field("Transport",t.temp)+
  field("Quantity",qty);
 const stat=(t.statPickup||t.statTat||t.orderInstructions)?
  '<div class="cedars-test-stat">'+
  (t.statPickup?'<p><strong>STAT pickup:</strong> '+E(t.statPickup)+'</p>':"")+
  (t.statTat?'<p><strong>Turnaround:</strong> '+E(t.statTat)+'</p>':"")+
  (t.orderInstructions?'<p><strong>Requisition:</strong> '+E(t.orderInstructions)+'</p>':"")+'</div>':"";
 const source=t.sourceNote?'<p class="cedars-test-source">'+E(t.sourceNote)+'</p>':"";
 return '<details class="cedars-test-row"><summary>'+
  '<span class="cedars-test-row-main"><strong>'+E(t.name)+'</strong><small>'+E(t.specimen||"Confirm specimen source")+'</small></span>'+
  '<span class="cedars-test-row-meta">'+code+badge+'<span class="cedars-test-chevron" aria-hidden="true"></span></span>'+
  '</summary><div class="cedars-test-detail"><dl class="cedars-test-fields">'+details+'</dl>'+
  (t.notes?'<p class="cedars-test-notes">'+E(t.notes)+'</p>':"")+stat+source+
  '<a class="cedars-test-source-link" href="https://5amlim.github.io/Lab-Calculator/cedars.html?test='+encodeURIComponent(t.id)+'" target="_blank" rel="noopener noreferrer">View in full Cedars lab guide <span aria-hidden="true">↗</span></a>'+
  '</div></details>';
}
function results(){
 const filtered=sorted(),pages=Math.max(1,Math.ceil(filtered.length/size));
 page=Math.min(page,pages-1);
 const view=filtered.slice(page*size,(page+1)*size);
 let group="";
 const rows=view.map(t=>{
  const heading=t.category!==group?'<div class="cedars-test-group-heading"><span>'+E(t.category)+'</span></div>':"";
  group=t.category;
  return heading+testRow(t);
 }).join("");
 const first=filtered.length?page*size+1:0,last=Math.min(filtered.length,(page+1)*size);
 return '<div class="cedars-test-results-heading"><strong>'+filtered.length+' matching test'+(filtered.length===1?'':'s')+'</strong><span>Showing '+first+'–'+last+' of '+filtered.length+'</span></div>'+
  (rows||'<div class="cedars-test-empty">No Cedars tests matched. Try a test name, code, specimen or collection tube.</div>')+
  (pages>1?'<div class="cedars-test-pagination"><button type="button" data-cedars-page="prev"'+(page===0?' disabled':'')+'>Previous</button><span>Page '+(page+1)+' of '+pages+'</span><button type="button" data-cedars-page="next"'+(page>=pages-1?' disabled':'')+'>Next</button></div>':"");
}
function render(){
 if(!active.length)return "";
 return '<section class="cedars-menu" id="calc2-cedars-menu" aria-label="Search Cedars-Sinai tests">'+
  '<div class="cedars-menu-head"><div><span class="calc-guide-eyebrow">CEDARS-SINAI / TEST DIRECTORY</span><h4>Find a Cedars test</h4><p>Browse the tests documented in the existing Cedars lab guide. Search by test name, code, specimen or collection container.</p></div><span class="cedars-menu-count">'+active.length+' tests</span></div>'+
  '<div class="cedars-menu-search"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><label for="cedars-test-search" class="sr-only">Search Cedars tests</label><input id="cedars-test-search" type="search" autocomplete="off" data-cedars-search placeholder="Search troponin, bilirubin, culture, PCR..." value="'+E(query)+'"></div>'+
  '<div class="cedars-menu-chips" id="cedars-menu-chips" role="group" aria-label="Filter Cedars tests by specimen type">'+menuChips()+'</div>'+
  '<div class="cedars-test-results" id="cedars-test-results" aria-live="polite">'+results()+'</div>'+
  '<p class="cedars-test-disclaimer">This is a curated local reference, not the complete Cedars test catalog. '+(unavailable?unavailable+' tests marked unavailable in the source guide are excluded. ':'')+'Confirm test availability, specimen requirements, transport, and STAT handling against current Cedars instructions before collection.</p>'+
 '</section>';
}
function refresh(){
 const chips=document.getElementById("cedars-menu-chips");
 const target=document.getElementById("cedars-test-results");
 if(chips)chips.innerHTML=menuChips();
 if(target)target.innerHTML=results();
}
document.addEventListener("input",event=>{
 if(!event.target?.matches?.("[data-cedars-search]"))return;
 query=event.target.value;page=0;refresh();
});
document.addEventListener("click",event=>{
 const chip=event.target.closest("[data-cedars-category]");
 if(chip){category=chip.dataset.cedarsCategory;page=0;refresh();return;}
 const nav=event.target.closest("[data-cedars-page]");
 if(nav){
  const pages=Math.max(1,Math.ceil(sorted().length/size));
  page=Math.max(0,Math.min(pages-1,page+(nav.dataset.cedarsPage==="next"?1:-1)));
  refresh();document.getElementById("calc2-cedars-menu")?.scrollIntoView({behavior:"smooth",block:"start"});
 }
});
function open(){
 const section=document.getElementById("calc2-cedars-menu");
 section?.scrollIntoView({behavior:"smooth",block:"start"});
 section?.querySelector("input")?.focus({preventScroll:true});
}
window.LAB_CEDARS_DIRECTORY={render,open,count:active.length};
})();