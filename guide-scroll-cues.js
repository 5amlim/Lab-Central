/* Lab Calculator-style scroll cue for all genuinely overflowing guide panes. */
(function(){
"use strict";
const targets=".pf-rack-scroll, .guide-stepper, .pf-qc-lane-list, .pfux-stage-track, .pfux-jump-options, .qc-screen-gallery--scroll, .tab-strip.instrument-matched-tabs";
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
 ".pfux-stage-track",".guide-stepper",".pf-rack-scroll",".pf-qc-lane-list",
 ".pfux-jump-options",".qc-screen-gallery--scroll",
 ".tab-strip.instrument-matched-tabs",".tab-strip.order-workflow-tabs"
];
const remembered=new Map();
const selectorFor=node=>scrollSelectors.find(selector=>node.matches(selector));
function scrollKey(node){
 const selector=selectorFor(node);
 if(!selector)return "";
 const route=decodeURIComponent(location.hash||"#home").replace(/^#/,"");
 const page=route.split("/")[0];
 const scope=selector.includes("tab-strip")?page:route;
 const index=Array.from(document.querySelectorAll(selector)).indexOf(node);
 return scope+"::"+selector+"::"+Math.max(0,index);
}
function remember(node){
 const key=scrollKey(node);
 if(key)remembered.set(key,{left:node.scrollLeft,top:node.scrollTop});
}
function ensureCurrentVisible(node){
 const current=node.querySelector('[aria-current="step"],[aria-selected="true"]');
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
 const active=main&&main.querySelector(".procedure-flow, .pf-calibration-guide, .pfux-cal-nested, .pfux-patient, .pf-rack-scroll");
 const page=document.scrollingElement||document.documentElement;
 cue.hidden=!active||page.scrollHeight<window.innerHeight+140||
   window.scrollY+window.innerHeight>=page.scrollHeight-75;
}
function setup(node){
 if(!node||initialized.has(node)||!node.parentNode)return;
 initialized.add(node);
 const frame=document.createElement("div");frame.className="lc-scroll-cue-frame";
 node.parentNode.insertBefore(frame,node);frame.appendChild(node);
 const bottom=document.createElement("div");bottom.className="lc-scroll-cue-bottom";
 bottom.setAttribute("aria-hidden","true");bottom.innerHTML="<span>Scroll for more ↓</span>";
 const right=document.createElement("button");right.className="lc-scroll-cue-right";
 right.type="button";right.hidden=true;
 const steps=node.matches(".pfux-stage-track, .guide-stepper");
 const tabs=node.matches(".tab-strip.instrument-matched-tabs");
 right.setAttribute("aria-label",steps?"Show more procedure steps to the right":tabs?"Show more instrument sections to the right":"Show more items to the right");
 right.innerHTML="<span>"+(steps?"More steps":tabs?"More sections":"More")+" <span aria-hidden=\"true\">→</span></span>";
 right.addEventListener("click",function(){
  const distance=Math.max(240,Math.round(node.clientWidth*.72));
  node.scrollBy({left:distance,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 });
 frame.append(bottom,right);
 let queued=false;
 function update(){
  queued=false;if(!node.isConnected)return;
  const style=window.getComputedStyle(node);
  const below=/(auto|scroll)/.test(style.overflowY)&&node.clientHeight>60&&
    node.scrollHeight>node.clientHeight+12&&node.scrollTop+node.clientHeight<node.scrollHeight-8;
  const moreRight=/(auto|scroll)/.test(style.overflowX)&&node.clientWidth>100&&
    node.scrollWidth>node.clientWidth+12&&node.scrollLeft+node.clientWidth<node.scrollWidth-8;
  const horizontal=/(auto|scroll)/.test(style.overflowX)&&node.scrollWidth>node.clientWidth+12;
  const onCardControls=node.matches(".qc-screen-gallery--scroll");
  frame.classList.toggle("lc-has-horizontal-overflow",horizontal);
  frame.classList.toggle("lc-has-more-below",below);
  frame.classList.toggle("lc-has-more-right",moreRight&&!onCardControls);
  right.hidden=!moreRight||onCardControls;
  if((below||moreRight)&&!node.hasAttribute("tabindex"))node.tabIndex=0;
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
if(root&&typeof MutationObserver!=="undefined"){
 const observer=new MutationObserver(scan);
 observer.observe(root,{subtree:true,childList:true});
}
scan();
})();