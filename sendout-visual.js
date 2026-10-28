(function(){
"use strict";
const forms=[
 ["Southern California","https://forms.cloud.microsoft/r/c4RvraNnGE"],
 ["Northern California","https://forms.cloud.microsoft/r/GgtCPLVSHw"],
 ["New York","https://forms.cloud.microsoft/r/rrQv53xVzd"],
 ["Florida","https://forms.cloud.microsoft/r/ZrU11LNKNB"]
];
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
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 230" role="img" aria-label="Sealed transparent biohazard specimen bag with labeled tube and separate document pocket">'+
 '<path d="M50 24h174v182H50Z" fill="#ebf8fc" fill-opacity=".55" stroke="#8fb7c7" stroke-width="4"/>'+
 '<path d="M43 26h187" stroke="#358fa8" stroke-width="14" stroke-linecap="round"/>'+
 '<path d="M49 29h174" stroke="#bee3ed" stroke-width="3"/>'+
 '<rect x="145" y="67" width="66" height="91" rx="5" fill="#fafbfc" stroke="#8ca8b7" stroke-width="2"/>'+
 '<path d="M153 82h51 M153 92h43 M153 102h47 M153 112h40" stroke="#acc4d0" stroke-width="3"/>'+
 '<path d="M75 57h45v103q-22 24-45 0Z" fill="#f7fdff" stroke="#91b8c8" stroke-width="3"/>'+
 '<rect x="71" y="48" width="53" height="20" rx="4" fill="#397da7"/>'+
 '<path d="M79 113h37v42q-18 15-37 0Z" fill="#c55e73" opacity=".66"/>'+
 '<path d="M111 173l18-30 17 30Z" fill="#da795c"/>'+
 '<circle cx="129" cy="163" r="5" fill="#fff"/>'+
 '<text x="133" y="194" text-anchor="middle" font-size="12" fill="#38788c" font-weight="900">SEALED BAG</text></svg>';
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
 return '<section class="ops-evidence"><div class="ops-evidence-heading"><span>PHOTO DOCUMENTATION</span><h2>Photograph the tube, bag and requisition</h2>'+
 '<p>Use clear photographs in the regional Sendout Log to reconcile the correctly labeled specimens, packaging and requisition.</p></div>'+
 '<div class="ops-evidence-grid">'+
 card("01 · Specimen tubes",tube(),"Capture all labeled tubes or collection containers, including cap color, quantity and identifiers.")+
 card("02 · Sealed transport bag",bag(),"Show the sealed bag, receiving laboratory and required room-temperature, refrigerated, frozen or STAT grouping.")+
 card("03 · Requisition form",req(),"Capture the complete matching order form in the secure Microsoft Form, including required tests and provider details.")+
 '</div><div class="ops-evidence-note"><span>✓</span><p>Upload Lab Calculator and packaging photos wherever the form requests them. Use separate photographs for multiple bags or temperature groups. Do not upload patient details outside approved systems.</p></div></section>';
}
window.LAB_SENDOUT_VISUAL={formLinks,examples};
})();