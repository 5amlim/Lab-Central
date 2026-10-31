/* Reference photos for existing instrument collection drawings.
   Uses the same sources as the Lab Container Gallery; no SVG is replaced. */
(function(){
 "use strict";
 const selector=".device-media-has-photo[data-collection-photo]";
 let shown=null,pinned=false,tip=null;
 function galleryItem(id){
  return window.LAB_CONTAINER_REFERENCE?.items?.find(x=>x.id===id)||null;
 }
 function reference(id){
  if(id==="pathfast-green")return {src:window.LAB_PATHFAST_COLLECTION_PHOTO||"",name:"PATHFAST · Green-top lithium-heparin tube",note:"Staff reference photo (specimen label obscured)"};
  const item=galleryItem(id),src=window.LAB_CONTAINER_REFERENCE?.photoForId?.(id)||"";
  return item&&src?{src,name:item.name,note:"Lab Container Gallery reference photo"}:null;
 }
 function ensure(){
  if(tip)return tip;
  tip=document.createElement("div");
  tip.className="device-collection-photo-tooltip";
  tip.hidden=true;
  tip.setAttribute("role","tooltip");
  tip.innerHTML='<div class="device-collection-photo-frame"><img alt=""><span class="device-collection-photo-error" hidden>Photo unavailable. See Lab Container Gallery.</span></div><strong></strong><small></small>';
  document.body.appendChild(tip);
  const img=tip.querySelector("img"),fallback=tip.querySelector(".device-collection-photo-error");
  img.addEventListener("error",()=>{img.hidden=true;fallback.hidden=false;});
  img.addEventListener("load",()=>{if(shown)position(shown);});
  return tip;
 }
 function position(target){
  if(!target||!tip||tip.hidden||!target.isConnected)return;
  const r=target.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;
  let left=r.right+14;
  if(left+w>window.innerWidth-12)left=r.left-w-14;
  if(left<12)left=Math.max(12,Math.min(window.innerWidth-w-12,r.left+(r.width-w)/2));
  const top=Math.max(12,Math.min(window.innerHeight-h-12,r.top+(r.height-h)/2));
  tip.style.left=Math.round(left)+"px";
  tip.style.top=Math.round(top)+"px";
 }
 function hide(){
  if(tip)tip.hidden=true;
  if(shown)shown.setAttribute("aria-expanded","false");
  shown=null;pinned=false;
 }
 function show(target,keep){
  const info=reference(target.dataset.collectionPhoto);
  if(!info||!info.src)return;
  const bubble=ensure();
  if(shown&&shown!==target)shown.setAttribute("aria-expanded","false");
  shown=target;pinned=!!keep;
  target.setAttribute("aria-expanded",String(pinned));
  const img=bubble.querySelector("img"),fallback=bubble.querySelector(".device-collection-photo-error");
  fallback.hidden=true;img.hidden=false;
  if(img.getAttribute("src")!==info.src)img.src=info.src;
  img.alt="Photo of "+info.name;
  bubble.querySelector("strong").textContent=info.name;
  bubble.querySelector("small").textContent=info.note;
  bubble.hidden=false;position(target);
 }
 document.addEventListener("pointerover",function(e){
  if(e.pointerType==="touch"||pinned)return;
  const target=e.target.closest?.(selector);
  if(target&&target!==shown)show(target,false);
 });
 document.addEventListener("pointerout",function(e){
  if(pinned||!shown)return;
  const left=e.target.closest?.(selector);
  if(left===shown&&!shown.contains(e.relatedTarget))hide();
 });
 document.addEventListener("focusin",function(e){
  const target=e.target.closest?.(selector);
  if(target&&!pinned)show(target,false);
 });
 document.addEventListener("focusout",function(e){
  if(!pinned&&shown&&shown.contains(e.target))hide();
 });
 document.addEventListener("click",function(e){
  const target=e.target.closest?.(selector);
  if(target){
   if(pinned&&shown===target)hide();
   else show(target,true);
  }else if(pinned)hide();
 });
 document.addEventListener("keydown",function(e){
  if(e.key==="Escape"&&shown){hide();return;}
  const target=e.target.closest?.(selector);
  if(target&&(e.key==="Enter"||e.key===" ")){
   e.preventDefault();
   if(pinned&&shown===target)hide();else show(target,true);
  }
 });
 window.addEventListener("resize",()=>{if(shown)position(shown)},{passive:true});
 window.addEventListener("scroll",()=>{if(shown){if(pinned)position(shown);else hide();}},{passive:true,capture:true});
})();
