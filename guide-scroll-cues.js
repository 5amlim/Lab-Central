/* Lab Calculator-style scroll cue for all genuinely overflowing guide panes. */
(function(){
"use strict";
const targets=".pf-rack-scroll, .guide-stepper, .pf-qc-lane-list, .pfux-stage-track, .pfux-jump-options, .qc-screen-gallery--scroll";
const cue=document.createElement("div");
cue.className="lc-page-scroll-cue";
cue.hidden=true;
cue.setAttribute("aria-hidden","true");
cue.innerHTML="<span>Scroll for more ↓</span>";
document.body.appendChild(cue);
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
 const right=document.createElement("div");right.className="lc-scroll-cue-right";
 right.setAttribute("aria-hidden","true");right.innerHTML="<span>Scroll →</span>";
 frame.append(bottom,right);
 let queued=false;
 function update(){
  queued=false;if(!node.isConnected)return;
  const style=window.getComputedStyle(node);
  const below=/(auto|scroll)/.test(style.overflowY)&&node.clientHeight>60&&
    node.scrollHeight>node.clientHeight+12&&node.scrollTop+node.clientHeight<node.scrollHeight-8;
  const moreRight=/(auto|scroll)/.test(style.overflowX)&&node.clientWidth>100&&
    node.scrollWidth>node.clientWidth+12&&node.scrollLeft+node.clientWidth<node.scrollWidth-8;
  frame.classList.toggle("lc-has-more-below",below);
  frame.classList.toggle("lc-has-more-right",moreRight);
  if((below||moreRight)&&!node.hasAttribute("tabindex"))node.tabIndex=0;
 }
 function schedule(){
  if(queued)return;queued=true;requestAnimationFrame(update);
 }
 node.addEventListener("scroll",schedule,{passive:true});
 window.addEventListener("resize",schedule,{passive:true});
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