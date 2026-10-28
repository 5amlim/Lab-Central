/* PATHFAST six-lane calibration and quality control illustration and staff guide.
   Illustration is schematic, not an actual analyzer status feed. */
(function () {
"use strict";
var lanes=[
 ["CAL 1","#e8f2fa","#276d97"],["CAL 1","#e8f2fa","#276d97"],
 ["CAL 2","#f1eafa","#75599b"],["CAL 2","#f1eafa","#75599b"],
 ["QC 1","#fff3df","#a67628"],["QC 2","#e5f5ef","#267f6c"]
];
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
function laneSVG(item,i){
 var x=38+i*145, code="";
 for(var j=0;j<11;j++){code+='<rect x="'+(x+37+j*4)+'" y="175" width="'+(j%3===0?2:1)+'" height="'+(j%3===0?22:17)+'" fill="#dfe7ea"/>';}
 return '<g aria-label="Lane '+(i+1)+': '+esc(item[0])+'">'+
 '<rect x="'+x+'" y="10" width="124" height="58" rx="11" fill="'+item[1]+'" stroke="'+item[2]+'" stroke-opacity=".3"/>'+
 '<text x="'+(x+62)+'" y="33" font-size="12" font-weight="800" fill="'+item[2]+'" text-anchor="middle">LANE '+(i+1)+'</text>'+
 '<text x="'+(x+62)+'" y="54" font-size="18" font-weight="900" fill="'+item[2]+'" text-anchor="middle">'+item[0]+'</text>'+
 '<rect x="'+(x-1)+'" y="94" width="126" height="228" rx="9" fill="#ced9df" stroke="#9caeb8"/>'+
 '<rect x="'+(x+9)+'" y="105" width="106" height="198" rx="6" fill="url(#pf-metal)" stroke="#f8fafb"/>'+
 '<rect x="'+(x+20)+'" y="114" width="84" height="160" rx="6" fill="#1c2732" stroke="#18232a"/>'+
 '<rect x="'+(x+20)+'" y="114" width="84" height="15" rx="3" fill="#d34546"/>'+
 '<rect x="'+(x+26)+'" y="135" width="73" height="25" rx="2" fill="#343f48"/>'+
 '<text x="'+(x+62)+'" y="152" text-anchor="middle" font-size="10" font-weight="800" fill="#e8edf0" letter-spacing="1.2">PATHFAST</text>'+
 code+
 '<circle cx="'+(x+62)+'" cy="229" r="17" fill="#111a20" stroke="#8b9ba4" stroke-width="3"/>'+
 '<circle cx="'+(x+62)+'" cy="229" r="7" fill="#465964" stroke="#111820"/>'+
 '<rect x="'+(x+27)+'" y="277" width="69" height="39" rx="6" fill="url(#pf-well)" stroke="#9bb2be"/>'+
 '<rect x="'+(x+36)+'" y="284" width="52" height="13" rx="4" fill="#f6fafb" stroke="#b5c6ce"/>'+
 '<circle cx="'+(x+62)+'" cy="306" r="5" fill="#b7d6e5" stroke="#8caab8"/></g>';
}
function rack(){
 return '<div class="pf-rack-scroll" role="region" aria-label="Six-lane PATHFAST rack schematic, horizontally scrollable on mobile" tabindex="0">'+
 '<svg class="pf-rack-svg" viewBox="0 0 940 355" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six reagent cartridges loaded in parallel in a metal rack, lanes 1 and 2 CAL 1, lanes 3 and 4 CAL 2, lane 5 QC 1, lane 6 QC 2">'+
 '<defs><linearGradient id="pf-metal" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fafbfd"/><stop offset=".5" stop-color="#becbd4"/><stop offset="1" stop-color="#f3f8fb"/></linearGradient>'+
 '<linearGradient id="pf-well" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#d4e1e8"/></linearGradient></defs>'+
 '<rect x="22" y="84" width="890" height="249" rx="15" fill="#e6edf1" stroke="#9badb8" stroke-width="4"/>'+
 '<rect x="30" y="92" width="874" height="231" rx="12" fill="#d4dfe5" stroke="#f8fafb" stroke-width="2"/>'+
 lanes.map(laneSVG).join("")+
 '<text x="470" y="350" text-anchor="middle" fill="#687c8b" font-size="11" letter-spacing="1.4" font-weight="800">FRONT / SAMPLE WELLS</text></svg></div>';
}
var instructions=[
 ["Check the status","The CAL/QC pill turns pink when the 28-day calibration interval expires and the analyzer locks patient testing."],
 ["Select CAL/QC and verify the reagent lot","From the home screen select BACK. For a new reagent lot, scan the supplied MC ENTRY card with the handheld reader as directed. For the same lot, verify the reagent lot, select CAL/QC, select the test and confirm."],
 ["Prepare six reagent cartridges","Remove cartridges from the refrigerator when ready to run. Gently tap on the counter two or three times, and slide each cartridge into the rack until it clicks."],
 ["Load all six lanes","Lanes 1 and 2: CAL 1. Lanes 3 and 4: CAL 2. Lane 5: QC 1. Lane 6: QC 2. The existing cheat sheet specifies 100 µL into each sample well; follow the current assay-specific IFU."],
 ["Place rack and tips, then start","Insert the loaded rack into the analyzer holder, load tips, close the cover, press Start and confirm Start again. The original cheat sheet lists about 17 minutes."],
 ["Review calibration and QC","Confirm acceptable calibration and both QC results under the approved procedure. Following successful QC, the menu pill turns gray, indicating ready to use. If results fail or the pill remains pink, do not release patient testing."]
];
function render(){
 var pills='<div class="pf-state-strip"><div class="pf-state-box"><span class="pf-state-pill overdue">CAL/QC</span><div><strong>Pink · due</strong><small>28 days elapsed. Locked.</small></div></div><span class="pf-state-arrow" aria-hidden="true">→</span><div class="pf-state-box"><span class="pf-state-pill ready">CAL/QC</span><div><strong>Gray · ready</strong><small>Calibration and QC accepted.</small></div></div></div>';
 var details=lanes.map(function(item,i){return '<span class="pf-lane-chip" style="--lane-tone:'+item[1]+';--lane-ink:'+item[2]+'"><b>'+(i+1)+'</b>'+item[0]+'</span>';}).join("");
 var workflow=instructions.map(function(item,i){return '<article class="pf-action"><span class="pf-action-no">'+String(i+1).padStart(2,"0")+'</span><div><h3>'+esc(item[0])+'</h3><p>'+esc(item[1])+'</p></div></article>';}).join("");
 return '<section class="pf-calibration-guide">'+
 '<div class="pf-calibration-heading"><div><div class="pf-eyebrow">PATHFAST / COMBINED WORKFLOW</div><h2>Calibration + QC</h2><p>Run together <strong>every 28 days</strong> using <strong>all six lanes</strong>.</p></div><span class="pf-interval">↻ 28 days</span></div>'+
 '<div class="pf-subtitle">Menu indicator after the 28-day calibration interval</div>'+pills+
 '<p class="pf-state-caption">Illustrative status pills, not live instrument status. Additional QC may be necessary under current assay-specific SOPs.</p>'+
 '<div class="pf-rack-header"><div><div class="pf-eyebrow">SIX-CARTRIDGE RACK</div><h3>Load lanes in this order</h3></div><span class="pf-rack-hint">Top-down schematic · not to scale</span></div>'+
 '<div class="pf-rack-box">'+rack()+'<div class="pf-lane-summary">'+details+'</div><div class="pf-rack-foot"><span><b>1–4:</b> Calibration in duplicate</span><span><b>5–6:</b> Quality controls</span></div></div>'+
 '<div class="pf-steps-header"><h3>Combined CAL/QC workflow</h3><span>6 steps</span></div><div class="pf-actions">'+workflow+'</div>'+
 '<div class="pf-tip"><span class="pf-tip-icon">!</span><div><strong>Before patient testing:</strong> Confirm both QC levels and calibration meet the assay acceptance criteria. The 28-day run does not replace extra QC required by a new shipment, lot or current SOP. Never bypass a lockout.</div></div>'+
 '<div class="pf-bottom-actions"><button type="button" class="pf-video-button" data-gotab="videos">▶ Calibration + QC video</button><button type="button" class="pf-procedure-button" data-gotab="notes">Handling notes ↗</button></div>'+
 '<p class="source-footnote">PATHFAST rack and cartridge drawing is schematic. Confirm all procedures using the current manufacturer IFU and approved site protocol.</p></section>';
}
window.LAB_PATHFAST_UI={render:render,lanes:lanes};
})();