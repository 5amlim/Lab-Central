/* Show the same unobtrusive 'more content' affordance on guide pages and overflowed rows.
   This is presentational, does not change workflow content or navigation. */
(function(){
"use strict";
if(!document||!window)return;
const downArrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6"/></svg>';
const rightArrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const cue=document.createElement("button");
cue.type="button";cue.className="lc-scroll-down";cue.hidden=true;cue.setAttribute("aria-label","Scroll down to see more steps");cue.innerHTML='<span>More below</span>'+downArrow;
document.body.appendChild(cue);
cue.addEventListener("click",()=>window.scrollBy({top:Math.min(530,Math.round(window.innerHeight*.7)),behavior:"smooth"}));
const selectors=".pf-rack-scroll, .guide-stepper, .pf-qc-lane-list, .pfux-jump-options, .pf-panel-options";
function updatePage(){
 const section=document.querySelector("#mainContent");
 const enabled=Boolean(section&&section.querySelector(".procedure-flow, .pf-calibration-guide, .pfux-cal-nested, .pfux-patient, .pf-rack-scroll"));
 const doc=document.scrollingElement||document.documentElement;
 cue.hidden=!enabled||doc.scrollHeight<=window.innerHeight+125||window.scrollY+window.innerHeight>=doc.scrollHeight-85;
}
function updateHoriz(node){
 if(!node.isConnected)return;
 const shell=node.parentElement;
 const hint=shell&&shell.querySelector(":scope > .lc-horizontal-hint");
 if(!hint)return;
 hint.hidden=node.scrollWidth<=node.clientWidth+10||node.scrollLeft+node.clientWidth>=node.scrollWidth-8;
}
function attachHoriz(){
 document.querySelectorAll(selectors).forEach(node=>{
   if(node.dataset.lcScrollCue==="ready"){updateHoriz(node);return;}
   node.dataset.lcScrollCue="ready";
   const parent=node.parentNode;if(!parent)return;
   const shell=document.createElement("div");shell.className="lc-horizontal-shell";
   parent.insertBefore(shell,node);shell.appendChild(node);
   const hint=document.createElement("button");hint.className="lc-horizontal-hint";
   hint.type="button";hint.setAttribute("aria-label","Scroll right for more");hint.innerHTML=rightArrow;
   shell.appendChild(hint);
   hint.addEventListener("click",()=>node.scrollBy({left:Math.max(200,Math.round(node.clientWidth*.65)),behavior:"smooth"}));
   node.addEventListener("scroll",()=>updateHoriz(node),{passive:true});
   updateHoriz(node);
 });
}
let pending=false;
function schedule(){
 if(pending)return;pending=true;
 requestAnimationFrame(()=>{pending=false;attachHoriz();updatePage();});
}
window.addEventListener("scroll",updatePage,{passive:true});
window.addEventListener("resize",schedule,{passive:true});
window.addEventListener("hashchange",schedule);
const root=document.getElementById("mainContent");
if(root&&typeof MutationObserver!=="undefined"){
 const mo=new MutationObserver(schedule);
 mo.observe(root,{childList:true,subtree:true});
}
schedule();
})();