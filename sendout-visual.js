(function(){
"use strict";
const keys=["socal","norcal","ny","fl"];
const forms=keys.map(k=>window.LAB_SENDOUT_FORMS&&window.LAB_SENDOUT_FORMS[k])
 .filter(x=>x&&/^https:\/\/forms\.cloud\.microsoft\/r\/[A-Za-z0-9]+$/.test(x.url))
 .map(x=>[x.label,x.url]);
function formLinks(){
 return '<section class="ops-region-forms"><div class="ops-region-forms-heading"><span>REGIONAL SENDOUT LOG</span><strong>Open the appropriate Microsoft Form</strong></div><div class="ops-region-forms-grid">'+
 forms.map(([label,url])=>'<a class="ops-region-form-link" href="'+url+'" target="_blank" rel="noopener noreferrer"><span class="ops-region-form-mark" aria-hidden="true">↗</span><strong>'+label+'</strong><small>Open secure form</small></a>').join('')+
 '</div></section>';
}
function tube(){
 const shapes=[45,148].map(x=>'<g><rect x="'+x+'" y="28" width="58" height="28" rx="7" fill="#347ba9" stroke="#49708c" stroke-width="3"/>'+
 '<path d="M'+(x+7)+' 56h44v115q-22 39-44 0Z" fill="#e7f5fa" stroke="#8caebb" stroke-width="3"/>'+
 '<path d="M'+(x+10)+' 121h38v47q-19 28-38 0Z" fill="#b75466" opacity=".65"/>'+
 '<rect x="'+(x+10)+'" y="91" width="38" height="35" rx="4" fill="#fff" stroke="#d2e2e9"/>'+
 '<text x="'+(x+29)+'" y="106" text-anchor="middle" fill="#497187" font-size="9" font-weight="800">SAMPLE</text>'+
 '<text x="'+(x+29)+'" y="118" text-anchor="middle" fill="#6c8898" font-size="8">EXAMPLE</text></g>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 230" role="img" aria-label="Two securely capped labeled blue-top specimen tubes"><ellipse cx="130" cy="211" rx="88" ry="9" fill="#dfe8ed"/>'+shapes+'</svg>';
}
function bag(){
 const groups=[["RT","#2b8c83","#e7f5f2",13],["FRIDGE","#2c78a4","#e9f4fc",98],["FROZEN","#665db1","#f0edfa",183]];
 const drawings=groups.map(([label,ink,tint,x])=>
  '<g transform="translate('+x+',0)">'+
  '<rect x="2" y="19" width="68" height="30" rx="10" fill="'+tint+'" stroke="'+ink+'" stroke-opacity=".28"/>'+
  '<text x="36" y="38" text-anchor="middle" font-size="11" font-weight="900" fill="'+ink+'">'+label+'</text>'+
  '<rect x="0" y="61" width="74" height="125" rx="5" fill="#f0f9fc" fill-opacity=".70" stroke="#88b1c3" stroke-width="3"/>'+
  '<path d="M-1 65h76" stroke="'+ink+'" stroke-width="8" stroke-linecap="round"/>'+
  '<rect x="13" y="91" width="23" height="63" rx="5" fill="#fff" stroke="#8eb7c4" stroke-width="2"/>'+
  '<rect x="11" y="84" width="27" height="12" rx="3" fill="'+ink+'"/>'+
  '<path d="M16 123h17v27q-9 8-17 0Z" fill="#c76d82" opacity=".7"/>'+
  '<rect x="43" y="96" width="22" height="47" rx="3" fill="#fff" stroke="#aac4d0" stroke-width="1.5"/>'+
  '<path d="M47 105h14 M47 113h12 M47 121h14 M47 129h10" stroke="#b6ccd6" stroke-width="2"/>'+
  '<path d="M19 172h36" stroke="'+ink+'" stroke-width="3" opacity=".60"/>'+
  '</g>'
 ).join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 230" role="img" aria-label="Three separate sealed transport bags labeled room temperature, refrigerated and frozen, with specimen and requisition in each bag">'+
 drawings+'<text x="135" y="214" text-anchor="middle" fill="#446b80" font-size="10" font-weight="900" letter-spacing=".55">SEPARATE TEMPERATURE BAGS</text></svg>';
}
function req(){
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 230" role="img" aria-label="Example laboratory requisition form with selected tests and matching specimen identifiers">'+
 '<rect x="60" y="13" width="150" height="203" rx="6" fill="#fff" stroke="#a6bfcc" stroke-width="4"/>'+
 '<rect x="72" y="27" width="125" height="28" rx="4" fill="#e1eff4"/>'+
 '<text x="134" y="46" font-family="Arial" font-weight="900" text-anchor="middle" font-size="13" fill="#3c7087">REQUISITION</text>'+
 '<path d="M73 66h115 M73 77h113 M73 88h94 M73 110h115 M73 132h108 M73 144h98 M73 171h107" stroke="#b3cbd6" stroke-width="3"/>'+
 '<path d="M77 102l7 7 12-15 M77 162l7 7 12-15" stroke="#2b947c" stroke-width="3" fill="none" stroke-linecap="round"/>'+
 '<rect x="80" y="184" width="103" height="18" rx="4" fill="#e9f5f2"/>'+
 '<text x="132" y="197" font-size="10" font-weight="800" text-anchor="middle" fill="#337e74">EXAMPLE ONLY</text></svg>';
}
function card(title,picture,description){
 return '<article class="ops-evidence-card"><div class="ops-evidence-card-top"><strong>'+title+'</strong></div>'+
 '<div class="ops-evidence-svg">'+picture+'</div><p>'+description+'</p></article>';
}
function examples(){
 return '<section class="ops-evidence" id="ops-sendout-photo-guide"><div class="ops-evidence-heading"><span>PHOTO DOCUMENTATION</span><h2>Photograph specimens, each bag and the requisition</h2>'+
 '<p>Use the Lab Calculator printout to organize specimens before taking photos for the secure regional Sendout Log.</p></div>'+
 '<div class="ops-evidence-grid">'+
 card("01 · Specimen tubes",tube(),"Photograph all labeled specimen tubes or containers. Make sure the cap color, number of tubes and labels are visible.")+
 card("02 · Separate transport bags",bag(),"Follow the Lab Calculator printout: <strong>separate bags by temperature</strong> (room temperature, refrigerated and frozen). Keep STAT or special groups separate when indicated. <strong>Take a photo of each sealed bag.</strong>")+
 card("03 · Requisition form",req(),"Photograph the matching requisition with all ordered tests and provider information visible in the approved secure form.")+
 '</div>'+
 '<div class="ops-evidence-details">'+
 '<div class="ops-evidence-detail"><span class="ops-evidence-detail-icon" aria-hidden="true">10</span><div><strong>Up to 10 photos</strong><p>You can attach up to 10 photos in the Sendout Log. Include each sealed bag separately, along with specimen containers, the requisition and Lab Calculator printout when requested.</p></div></div>'+
 '<div class="ops-evidence-detail"><span class="ops-evidence-detail-icon" aria-hidden="true">↗</span><div><strong>Document pickup or shipment</strong><p>In the regional Sendout Log form, use the <strong>Confirmation Number</strong> field. For <strong>STAT or special pickups</strong>, enter the pickup confirmation or reference number. For <strong>special test kits shipped by UPS or FedEx</strong>, enter the carrier, tracking number and pickup or drop-off confirmation.</p></div></div>'+
 '</div>'+
 '<div class="ops-evidence-note"><span aria-hidden="true">✓</span><p>The Sendout Log covers <strong>routine send-outs, STAT/special pickups and shipped test kits</strong>. Upload patient documents and photos only through approved secure systems.</p></div></section>';
}
window.LAB_SENDOUT_VISUAL={formLinks,examples};
})();