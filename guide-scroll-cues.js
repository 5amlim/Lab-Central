/* Lab Calculator-style scroll cue for all genuinely overflowing guide panes. */
(function(){
"use strict";
const targets=".pf-rack-scroll, .guide-stepper, .ptg-step-strip, .pf-qc-lane-list, .pfux-stage-track, .pfux-jump-options, .qc-screen-gallery--scroll, .tab-strip.instrument-matched-tabs, .pfux-primary-nav, .tab-strip.order-workflow-tabs, .api-guide-tabs, .dqc-page .dqc-view-switch, .tc-portal .tc-view-switch, .sendout-reference-layout .sendout-reference-tabs";
const cue=document.createElement("div");
cue.className="lc-page-scroll-cue";
cue.hidden=true;
cue.innerHTML="<button type=\"button\" aria-label=\"Scroll down for more guide content\">Scroll for more <span aria-hidden=\"true\">↓</span></button>";
document.body.appendChild(cue);
cue.querySelector('button').addEventListener('click',function(){window.scrollBy({top:Math.max(300,Math.round(window.innerHeight*.7)),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
/* Preserve scroll positions of interactive lists across guide rerenders.
   Keys are scoped to the active guide; instrument tabs share their position
   across tabs for the same analyzer. Nothing is stored across browser sessions. */
const scrollSelectors=[
 ".pfux-stage-track",".guide-stepper",".ptg-step-strip",".pf-rack-scroll",".pf-qc-lane-list",
 ".pfux-jump-options",".qc-screen-gallery--scroll",
 ".tab-strip.instrument-matched-tabs",".pfux-primary-nav",".tab-strip.order-workflow-tabs",
 ".api-guide-tabs",".dqc-page .dqc-view-switch",".tc-portal .tc-view-switch",".sendout-reference-layout .sendout-reference-tabs"
];
const remembered=new Map();
const selectorFor=node=>scrollSelectors.find(selector=>node.matches(selector));
function scrollKey(node){
 const selector=selectorFor(node);
 if(!selector)return "";
 const route=decodeURIComponent(location.hash||"#home").replace(/^#/,"");
 const page=route.split("/")[0];
 const scope=(selector.includes("tab-strip")||selector===".pfux-primary-nav")?page:route;
 const index=Array.from(document.querySelectorAll(selector)).indexOf(node);
 return scope+"::"+selector+"::"+Math.max(0,index);
}
function remember(node){
 const key=scrollKey(node);
 if(key)remembered.set(key,{left:node.scrollLeft,top:node.scrollTop});
}
function ensureCurrentVisible(node){
 const current=node.querySelector('[aria-current="step"],[aria-current="page"],[aria-selected="true"]');
 if(!current||node.scrollWidth<=node.clientWidth+2)return;
 const track=node.getBoundingClientRect(),item=current.getBoundingClientRect();
 const left=item.left-track.left,right=item.right-track.right;
 if(left<9)node.scrollLeft+=left-12;
 else if(right>-9)node.scrollLeft+=right+12;
}
function restore(node){
 const key=scrollKey(node),saved=remembered.get(key);
 if(saved){
  node.scrollLeft=Math.min(saved.left,Math.max(0,node.scrollWidth-node.clientWidth));
  node.scrollTop=Math.min(saved.top,Math.max(0,node.scrollHeight-node.clientHeight));
 }
 ensureCurrentVisible(node);
 remember(node);
}
document.addEventListener("click",function(e){
 const clicked=e.target.closest(targets);
 if(clicked)remember(clicked);
},true);
document.addEventListener("keydown",function(e){
 if(e.key==="Enter"||e.key===" ") {
  const clicked=e.target.closest(targets);
  if(clicked)remember(clicked);
 }
},true);
const initialized=new WeakSet();
function updatePage(){
 const main=document.getElementById("mainContent");
 const page=document.scrollingElement||document.documentElement;
 const viewport=window.innerHeight||document.documentElement.clientHeight;
 const remaining=page.scrollHeight-page.scrollTop-viewport;
 // Show on any page with genuinely more vertical content, not only instrument flows.
 // Suppress the cue near the end and while a modal is open.
 cue.hidden=!main||!main.firstElementChild||remaining<=64||
   !!document.querySelector("dialog[open]");
}
function setup(node){
 if(!node||initialized.has(node)||!node.parentNode)return;
 initialized.add(node);
 const compliance=node.matches(".api-guide-tabs, .dqc-page .dqc-view-switch, .tc-portal .tc-view-switch, .sendout-reference-layout .sendout-reference-tabs");
 const pathfastNavigation=node.matches(".pfux-primary-nav");
 const frame=document.createElement("div");frame.className="lc-scroll-cue-frame"+(compliance?" lc-compliance-scroll-frame":"")+(pathfastNavigation?" lc-pathfast-howto-frame":"");
 node.parentNode.insertBefore(frame,node);frame.appendChild(node);
 const bottom=document.createElement("div");bottom.className="lc-scroll-cue-bottom";
 bottom.setAttribute("aria-hidden","true");bottom.innerHTML="<span>Scroll for more ↓</span>";
 const right=document.createElement("button");right.className="lc-scroll-cue-right";
 right.type="button";right.hidden=true;
 const steps=node.matches(".pfux-stage-track, .guide-stepper, .ptg-step-strip");
 const tabs=node.matches(".tab-strip.instrument-matched-tabs, .pfux-primary-nav, .tab-strip.order-workflow-tabs, .api-guide-tabs, .dqc-page .dqc-view-switch, .tc-portal .tc-view-switch, .sendout-reference-layout .sendout-reference-tabs");
 right.setAttribute("aria-label",steps?"Show more procedure steps to the right":tabs?"Show more instrument sections to the right":"Show more items to the right");
 right.innerHTML="<span>"+(steps?"More steps":tabs?"More sections":"More")+" <span aria-hidden=\"true\">→</span></span>";
 right.addEventListener("click",function(){
  const distance=Math.max(240,Math.round(node.clientWidth*.72));
  node.scrollBy({left:distance,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 });
 const left=document.createElement("button");left.className="lc-scroll-cue-left";
 left.type="button";left.hidden=true;
 left.setAttribute("aria-label",steps?"Show earlier procedure steps":tabs?"Show earlier sections":"Show earlier items");
 left.innerHTML="<span><span aria-hidden=\"true\">←</span> "+(steps?"Earlier steps":tabs?"Earlier sections":"Earlier")+"</span>";
 left.addEventListener("click",function(){
  const distance=Math.max(240,Math.round(node.clientWidth*.72));
  node.scrollBy({left:-distance,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 });
 frame.append(bottom,left,right);
 let pathfastNavFooter=null;
 if(pathfastNavigation){
  const heading=document.createElement("div");
  heading.className="lc-pathfast-howto-heading";
  heading.innerHTML='<div class="lc-howto-intro"><span class="lc-howto-kicker">PATHFAST GUIDE</span><h2>How to</h2><p>Choose a workflow below. Scroll sideways or use the arrows to see every section.</p></div><span class="lc-howto-guide-tag" aria-hidden="true">Guide navigation</span>';
  frame.insertBefore(heading,node);
  pathfastNavFooter=document.createElement("div");
  pathfastNavFooter.className="lc-pathfast-howto-footer";
  pathfastNavFooter.hidden=true;
  const tip=document.createElement("span");
  tip.className="lc-pathfast-howto-hint";
  tip.textContent="Browse all PATHFAST sections";
  pathfastNavFooter.append(tip,left,right);
  frame.appendChild(pathfastNavFooter);
 }
 let queued=false;
 function update(){
  queued=false;if(!node.isConnected)return;
  const style=window.getComputedStyle(node);
  const below=/(auto|scroll)/.test(style.overflowY)&&node.clientHeight>60&&
    node.scrollHeight>node.clientHeight+12&&node.scrollTop+node.clientHeight<node.scrollHeight-8;
  const moreRight=/(auto|scroll)/.test(style.overflowX)&&node.clientWidth>100&&
    node.scrollWidth>node.clientWidth+12&&node.scrollLeft+node.clientWidth<node.scrollWidth-8;
  const horizontal=/(auto|scroll)/.test(style.overflowX)&&node.scrollWidth>node.clientWidth+12;
  const moreLeft=horizontal&&node.scrollLeft>8;
  const onCardControls=node.matches(".qc-screen-gallery--scroll");
  frame.classList.toggle("lc-has-horizontal-overflow",horizontal);
  frame.classList.toggle("lc-has-more-below",below);
  frame.classList.toggle("lc-has-more-right",moreRight&&!onCardControls);
  frame.classList.toggle("lc-has-more-left",moreLeft&&!onCardControls);
  right.hidden=!moreRight||onCardControls;
  left.hidden=!moreLeft||onCardControls;
  if(pathfastNavFooter)pathfastNavFooter.hidden=!horizontal;
  if((below||horizontal)&&!node.hasAttribute("tabindex"))node.tabIndex=0;
 }
 function schedule(){
  if(queued)return;queued=true;requestAnimationFrame(update);
 }
 node.addEventListener("scroll",function(){remember(node);schedule();},{passive:true});
 window.addEventListener("resize",schedule,{passive:true});
 requestAnimationFrame(function(){if(node.isConnected){restore(node);schedule();}});
 if(typeof ResizeObserver!=="undefined"){
  const observer=new ResizeObserver(schedule);
  observer.observe(node);
  if(node.firstElementChild)observer.observe(node.firstElementChild);
 }
 schedule();
}
let scheduled=false;
function scan(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{
  scheduled=false;
  document.querySelectorAll(targets).forEach(setup);
  updatePage();
 });
}
window.addEventListener("scroll",updatePage,{passive:true});
window.addEventListener("resize",scan,{passive:true});
window.addEventListener("hashchange",scan);
const root=document.getElementById("mainContent");

/* Keep clicked controls stationary when an in-place view redraws.
   Deliberate route changes, step navigation and scroll-to links stay untouched. */
if(root&&typeof MutationObserver!=="undefined"){
 const controls="button,[role='button'],[role='tab'],summary";
 const intentional="a[href],[data-go],[data-gotab],[data-goorderset],[data-workflowtab],"+
  "[data-guide-step],[data-guide-mode],[data-ev-step],[data-calc2-search-lab],"+
  "[data-calc2-open-menu],[data-pf-panel-trigger],"+
  ".lc-scroll-cue-left,.lc-scroll-cue-right,.lc-page-scroll-cue";
 const label=node=>String(node.getAttribute("aria-label")||node.textContent||"")
  .replace(/\s+/g," ").trim().slice(0,160);
 document.addEventListener("click",function(event){
  const control=event.target.closest(controls);
  if(!control||!root.contains(control)||control.closest(intentional))return;
  const originalRoute=location.pathname+location.search+location.hash;
  const originalTop=control.getBoundingClientRect().top;
  const tag=control.tagName;
  const id=control.id;
  const key=Array.from(control.attributes).find(a=>a.name.startsWith("data-")&&a.value);
  const text=label(control);
  if(!id&&!key&&!text)return;
  const matches=()=>Array.from(root.querySelectorAll(controls)).filter(node=>
   node.tagName===tag&&(id?node.id===id:key?node.getAttribute(key.name)===key.value:label(node)===text));
  const position=Math.max(0,matches().indexOf(control));
  let closed=false,queued=false;
  const observer=new MutationObserver(schedule);
  function close(){if(closed)return;closed=true;observer.disconnect();}
  function schedule(){
   if(closed||queued)return;
   queued=true;
   requestAnimationFrame(function(){
    queued=false;
    if(closed)return;
    if(location.pathname+location.search+location.hash!==originalRoute){close();return;}
    const candidates=matches();
    const labeled=candidates.filter(node=>label(node)===text);
    const replacement=control.isConnected?control:
     (labeled.length===1?labeled[0]:(candidates[position]||(candidates.length===1?candidates[0]:null)));
    if(!replacement||!replacement.isConnected)return;
    const displacement=replacement.getBoundingClientRect().top-originalTop;
    if(control.isConnected&&Math.abs(displacement)<=2)return;
    if(Number.isFinite(displacement)&&Math.abs(displacement)>2)
     window.scrollBy({top:displacement,behavior:"instant"});
    if(event.detail===0&&!control.isConnected)
     replacement.focus?.({preventScroll:true});
    close();
   });
  }
  observer.observe(root,{childList:true,subtree:true});
  setTimeout(close,350);
 },true);
}

if(root&&typeof MutationObserver!=="undefined"){
 const observer=new MutationObserver(scan);
 observer.observe(root,{subtree:true,childList:true});
}
// Recheck when images, expanded cards, and other asynchronous content change page height.
if(root&&typeof ResizeObserver!=="undefined"){
 const pageObserver=new ResizeObserver(updatePage);
 pageObserver.observe(root);
}
window.addEventListener("load",scan,{once:true});
scan();
})();