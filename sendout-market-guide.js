/* Region / site picker shared by Lab Send-outs and the Sendout Log. */
(function(){
"use strict";
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const markets={
 socal:{name:"Southern California",sites:[["bh","Beverly Hills Flagship"],["annex","Beverly Hills Annex"],["sm","Santa Monica"],["mb","Manhattan Beach"]],labs:["quest","labcorp","cedars","htrx","pathmd"]},
 norcal:{name:"Northern California",sites:[["sf","San Francisco"],["pa","Palo Alto"]],labs:["quest","labcorp"]},
 fl:{name:"Florida",sites:[["boca","Boca Raton"],["palm","Palm Beach"],["coral","Coral Gables"]],labs:["quest","labcorp"]},
 ny:{name:"New York",sites:[["ues","Upper East Side"],["tribeca","Tribeca"],["hamptons","Hamptons"],["fifth","5th Avenue"],["gramercy","Gramercy"]],labs:["quest","labcorp"]}
};
const labs={
 quest:{title:"Quest Diagnostics",eyebrow:"QUEST",desc:"Use the Quest test directory and its exact test codes. Match requisition, collection and transport requirements.",steps:["Verify tests and specimen requirements using the Quest directory or approved regional STAT menu.","Separate routine and STAT bags and confirm temperature and QuantiFERON handling when ordered.","Place the sealed Quest-specific transport bag into the appropriate site lockbox, refrigerator or freezer pickup area."],href:"https://testdirectory.questdiagnostics.com/test/home"},
 labcorp:{title:"Labcorp",eyebrow:"LABCORP",desc:"Check the Labcorp test menu for container, processing and sendout requirements.",steps:["Prepare each specimen with the Labcorp calculator and confirm the matching order form.","Package according to temperature and priority; do not mix Labcorp specimens with another receiving lab.","Use the approved LabcorpLink pickup process or the site's scheduled courier."],href:"https://www.labcorplink.com/ui/"},
 cedars:{title:"Cedars-Sinai",eyebrow:"CEDARS",desc:"Southern California only. Use the Cedars collection and transport guide, including dedicated media where required.",steps:["Confirm acceptance, specimen media and order form, including provider signature when required.","Separate Cedars bags from Quest and Labcorp, and verify the correct transport category.","Use the current Cedars courier or Apollo procedure at the selected clinic."]},
 htrx:{title:"HealthTrackRx (HTRX)",eyebrow:"HTRX / UPS",desc:"Use the approved HTRX collection kit, manifest, shipping label and required courier bag.",steps:["Match specimen source to the correct HTRX kit and fully labeled requisition.","Complete the manifest, affix shipping label, and confirm the bag is sealed for handoff.","Front desk photographs the manifest for Lab Pickup and Tracking; check daily whether a prior bag remains."]},
 pathmd:{title:"PathMD",eyebrow:"TRIAL WORKFLOW",desc:"Trial sendout workflow. Check that the clinic has activated PathMD before using it.",steps:["Confirm panel eligibility, available collection kits and portal ordering instructions.","Use the approved PathMD kit and documented pickup method, not an assumed HTRX or Quest courier.","Complete the approved sendout documentation and track the specimen handoff."]}
};
const htrxTimes={
 bh:"Monday to Friday: UPS 2–3 PM. Saturday: blue HTRX bag at front desk by 8 PM for the Sunday-morning handoff. Sunday: no pickup; send Monday.",
 sm:"Monday to Friday: UPS 3–4 PM. Saturday: UPS 3–4 PM. Sunday: no pickup; send Monday.",
 mb:"Monday to Friday: UPS 4–5 PM. Saturday: UPS 4–5 PM. Sunday: no pickup; send Monday."
};
let market="socal",site="bh",open="";
const validSite=()=>markets[market].sites.some(x=>x[0]===site);
const selectedSite=()=>markets[market].sites.find(x=>x[0]===site)?.[1]||"Select location";
const form=()=>window.LAB_SENDOUT_FORMS?.[market];
const chevron='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function dropdown(field,label,value,choices){
 return '<div class="lc-select-box"><div class="lc-select-label">'+E(label)+'</div>'+
 '<button type="button" class="lc-select-trigger" data-lc-select="'+field+'" aria-haspopup="true" aria-expanded="'+(open===field)+'">'+
 '<strong>'+E(value)+'</strong>'+chevron+'</button>'+
 (open===field?'<div class="lc-options" role="group" aria-label="'+E(label)+'">'+choices.map(([id,text])=>{
  const chosen=field==="market"?id===market:id===site;
  return '<button type="button" role="option" aria-selected="'+chosen+'" class="lc-option '+(chosen?"chosen":"")+'" data-lc-choice="'+field+'" data-lc-value="'+E(id)+'">'+E(text)+(chosen?'<span aria-hidden="true">✓</span>':'')+'</button>';
 }).join("")+'</div>':"")+'</div>';
}
function selection(mode="guide"){
 const logOnly=mode==="log";
 return '<div class="lc-market-choice"><div class="lc-picker-lead"><strong>'+(logOnly?'Choose market':'Choose market and clinic')+'</strong><p>'+(logOnly?'Choose a market for routine send-outs, STAT or special pickups, and shipped test kits. Select the clinic within the Microsoft Form.':'The receiving lab, packaging rules, courier and documentation depend on your site.')+'</p></div>'+
 '<div class="lc-picker-fields">'+dropdown("market","Market",markets[market].name,Object.entries(markets).map(([k,v])=>[k,v.name]))+
 (logOnly?'':dropdown("site","Clinic location",selectedSite(),markets[market].sites))+'</div></div>';
}
function labInfo(l){
 const m=labs[l],regional=market==="socal";
 let extra="";
 if(regional&&l==="htrx")extra='<div class="lc-site-note"><strong>HTRX pickup for '+E(selectedSite())+'</strong><p>'+E(htrxTimes[site]||"Annex routing is not active until launch and courier confirmation. Do not ship until the site is approved.")+'</p></div>';
 if(regional&&l==="cedars")extra='<div class="lc-site-note"><strong>Cedars timing</strong><p>Follow the site courier schedule and aim for weekday pickup before noon; confirm weekend Apollo cutoff (before 4 PM) through the site procedure.</p></div>';
 if(regional&&l==="labcorp")extra='<div class="lc-site-note"><strong>Labcorp timing</strong><p>Verify pickup before 5 PM or the current site-specific scheduled time.</p></div>';
 if(regional&&l==="quest")extra='<div class="lc-site-note"><strong>Quest handoff</strong><p>'+(site==="bh"?"Use Beverly Hills evening pickup and check the lockbox.":site==="sm"?"Confirm the Santa Monica evening pickup and lockbox.":site==="mb"?"Manhattan Beach may require calling for pickup; verify the lockbox and cold bags.":"Annex pickups are not established. Confirm account readiness and courier before use.")+'</p></div>';
 if(!regional)extra='<div class="lc-site-note"><strong>Site verification required</strong><p>This market’s courier windows and activated receiving labs are not confirmed here. Use the current local SOP and vendor directory; do not assume SoCal pickup times apply.</p></div>';
 return '<details class="lc-lab-detail" '+(l===markets[market].labs[0]?'open':'')+'><summary><span class="lc-lab-sign">'+E(m.eyebrow)+'</span><span class="lc-lab-heading"><strong>'+E(m.title)+'</strong><small>'+E(m.desc)+'</small></span><span class="lc-lab-chevron">'+chevron+'</span></summary><div class="lc-lab-content">'+
 '<ol>'+m.steps.map(v=>'<li>'+E(v)+'</li>').join("")+'</ol>'+extra+
 (m.href?'<a class="lc-lab-resource" target="_blank" rel="noopener noreferrer" href="'+m.href+'">Open receiving lab directory ↗</a>':'')+
 '</div></details>';
}
function guide(){
 const f=form(),l=markets[market].labs;
 return '<div class="lc-sendout" id="lcSendoutGuide">'+selection()+
 '<div class="lc-guide-intro"><span class="lc-guide-eyebrow">SELECTED SITE · '+E(markets[market].name)+'</span><h2>'+E(selectedSite())+' sendouts</h2>'+
 '<p>Begin with the Lab Calculator, verify the receiving laboratory and test-specific instructions, then use the relevant lab section below. These sections are independent, not one combined sendout procedure.</p></div>'+
 '<div class="lc-sendout-actions"><button type="button" data-go="calculators">Open Lab Calculators ↗</button><button type="button" data-go="sendout-log">Open Lab Sendout Log ↗</button></div>'+
 '<div class="lc-lab-accordions"><div class="lc-guide-eyebrow">RECEIVING LABS · SELECT ONE</div>'+l.map(labInfo).join("")+'</div>'+
 '<p class="lc-guide-warning">Not every receiving lab is activated at every clinic. Verify current site approval, collection requirements and pickup arrangements before processing.</p></div>';
}
function log(){
 const f=form(),valid=Boolean(f&&/^https:\/\/forms\.cloud\.microsoft\/r\/[A-Za-z0-9]+$/.test(f.url));
 return '<div class="lc-sendout lc-sendout-log" id="lcSendoutGuide">'+selection("log")+
 '<div class="lc-log-outcome"><span class="lc-guide-eyebrow">LAB SENDOUT LOG</span>'+
 '<h2>'+E(markets[market].name)+'</h2><p>Use the <strong>'+E(markets[market].name)+'</strong> Sendout Log for routine specimens, STAT or special pickups, and special test kits shipped by UPS or FedEx. Choose the clinic within the form. Enter any pickup confirmation, carrier and shipment tracking details under <strong>Confirmation Number</strong>.</p>'+
 (valid?'<a class="lc-open-form" href="'+E(f.url)+'" target="_blank" rel="noopener noreferrer">Open '+E(markets[market].name)+' Sendout Log ↗</a>':'<p>Approved form link is not configured for this market.</p>')+
 '</div></div>';
}
function render(mode){if(!validSite())site=markets[market].sites[0][0];return mode==="log"?log():guide();}
function refresh(){
 const target=document.getElementById("lcSendoutGuide");if(!target)return;
 target.outerHTML=render(target.classList.contains("lc-sendout-log")?"log":"guide");
}
document.addEventListener("click",e=>{
 const trigger=e.target.closest("[data-lc-select]"),choice=e.target.closest("[data-lc-choice]");
 if(trigger){const field=trigger.dataset.lcSelect;open=open===field?"":field;refresh();const b=document.querySelector('[data-lc-select="'+field+'"]');if(b)b.focus();return;}
 if(choice){
  const field=choice.dataset.lcChoice,val=choice.dataset.lcValue;
  if(field==="market"&&markets[val]){market=val;site=markets[market].sites[0][0];}
  if(field==="site"&&markets[market].sites.some(x=>x[0]===val))site=val;
  open="";refresh();return;
 }
 if(open&&!e.target.closest(".lc-select-box")){open="";refresh();}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&open){open="";refresh();}});
window.LAB_SENDOUT_MARKETS={render};
})();