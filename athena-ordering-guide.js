/* Athena sendout order workflow with visual UI references, not live order entry. */
(function(){
'use strict';
const labs={
 quest:{name:'Quest Diagnostics',search:'Quest Lab',note:'Verify the intended Quest receiver and location.'},
 labcorp:{name:'LabCorp',search:'LabCorp',note:'Verify the intended LabCorp receiver and location.'},
 cedars:{name:'Cedars',search:'Cedars-Sinai',note:'Verify the intended Cedars-Sinai facility and address.'},
 htrx:{name:'HealthTrackRx',search:'HealthTrackRx',note:'Verify the intended HealthTrackRx receiver.'},
 pathmd:{name:'PathMD',search:'PathMD',note:'Verify the intended PathMD receiver.'}
};
let selectedLab=null;
function chosen(){return selectedLab?labs[selectedLab]:null;}
function selectedName(){return chosen()?chosen().name:'No lab selected';}
function stepDetail(step,i){
 if(!chosen())return step.text;
 if(i===6)return 'Confirm the clinic <strong>location ZIP code</strong> and correct if needed. Search for <strong>'+chosen().search+'</strong> and select the correct facility/address. '+chosen().note;
 if(i===7)return 'Search by the <strong>exact '+chosen().name+' test code</strong> from the requisition or Lab Calculator. Verify the panel, reflex algorithm, specimen requirements and performing lab.';
 if(i===8)return 'Confirm the <strong>'+chosen().name+'</strong> order in <strong>Outstanding Orders</strong>. If <strong>unsigned</strong>, follow the provider-signature process.';
 return step.text;
}
function shell(title,body,kind){
 return '<div class="ao-art-app '+kind+'"><div class="ao-art-top"><strong>athenaOne</strong><span>Calendar　 Patients　 Claims</span><b>⚙</b></div><div class="ao-art-subhead"><strong>'+title+'</strong><small>ILLUSTRATED VIEW</small></div>'+body+'</div>';
}
function cue(s){return '<span class="ao-art-cue">'+s+'</span>';}
function bar(txt){return '<div class="ao-art-search"><span>⌕</span><b>'+txt+'</b><span>×</span></div>';}
function check(){return '<span class="ao-art-check">✓</span>';}
function scene(n){
 switch(n){
 case 1:return shell('Patient chart',
  '<div class="ao-art-patient"><span class="ao-art-avatar">PT</span><div><strong>Training patient</strong><small>Chart overview</small></div><span class="ao-art-highlight-menu">☰</span></div><div class="ao-art-two-panels"><div><b>Personal info</b><i></i><i></i></div><div><b>Outstanding orders</b><i></i><i></i></div></div>'+cue('CLICK HAMBURGER MENU'),'ao-art-chart');
 case 2:return shell('Patient chart',
  '<div class="ao-art-menu-background"><i></i><i></i></div><div class="ao-art-purple-menu"><span>Quickview</span><span>Create patient case</span><strong>＋ Create order group</strong><span>Print chart sections</span><span>Add document</span></div>'+cue('CREATE ORDER GROUP'),'ao-art-chart-menu');
 case 3:return shell('Create order group',
  '<div class="ao-art-order-provider"><strong>First, select the ordering provider:</strong>'+bar('Search provider name')+'<div class="ao-art-selected">'+check()+'<strong>Selected ordering provider</strong></div><small>Confirm correct provider before continuing</small></div>'+cue('CHOOSE PROVIDER'),'ao-art-provider');
 case 4:return shell('Order group',
  '<div class="ao-art-order-layout"><div class="ao-art-rail"><strong>Active Problems</strong><span>Historical (0)</span><p>□ No known problems</p></div><div class="ao-art-main-order"><strong>Orders</strong><div class="ao-art-dropdown-row"><span>Ordering Provider</span><b>Selected provider　⌄</b></div><div class="ao-art-add-button">⊕　 DIAGNOSES &amp; ORDERS</div></div></div>'+cue('CLICK + DIAGNOSES & ORDERS'),'ao-art-order-group');
 case 5:return shell('Diagnoses & Orders',
  bar('Search diagnosis')+'<div class="ao-art-diagnosis"><div><strong>Diagnoses (20+)</strong><p class="ao-art-selected">'+check()+'Correct diagnosis</p><p>Another diagnosis</p><p>Another result</p></div><div><strong>Order Sets</strong><p>Available orders</p><p>Related orders</p></div></div>'+cue('ADD DIAGNOSIS FIRST'),'ao-art-dx');
 case 6:return shell('Diagnoses & Orders',
  '<div class="ao-art-edit-link">Displaying labs from currently selected facility　<strong>Edit preferences ↗</strong></div><div class="ao-art-prefs"><div><b>Lab orders</b><span>Imaging orders</span><span>Procedure orders</span></div><div><small>LAB ORDERS</small><strong>Set a preferred lab orders provider　›</strong><p>Change receiving laboratory</p></div></div>'+cue('OPEN LAB PREFERENCES'),'ao-art-settings');
 case 7:return shell('Add a receiver',
  '<div class="ao-art-zip"><span>Search within selected location</span><strong>Clinic ZIP　✎</strong></div>'+bar(chosen()?chosen().search:'Search receiving lab')+'<div class="ao-art-receivers"><b>Receiver</b><b>Location</b><div>'+check()+'<strong>'+(chosen()?chosen().name:'Correct lab and facility')+'</strong><small>Verify address / distance</small></div><div class="ao-art-alt">Another matching location</div></div>'+cue('CONFIRM ZIP AND FACILITY'),'ao-art-receiver');
 case 8:return shell('Diagnoses & Orders',
  bar('Enter exact lab test code')+'<div class="ao-art-lab-chosen">Displaying labs from <strong>'+(chosen()?chosen().name:'selected laboratory')+'</strong></div><div class="ao-art-test-details"><div><strong>Matching test code</strong><p class="ao-art-selected">'+check()+'Correct test</p></div><div><strong>Verify details</strong><span>Panel / reflex algorithm</span><span>Specimen requirements</span><span>Performing laboratory</span></div></div>'+cue('CHECK CODE & TEST DETAILS'),'ao-art-test-code');
 default:return shell('Patient chart',
  '<div class="ao-art-final"><div><b>Orders</b><p>Diagnosis linked</p><small>Ordering provider selected</small></div><div><b>Outstanding Orders</b><div class="ao-art-final-row">'+check()+'<span><strong>'+(chosen()?chosen().name+' order':'External laboratory test')+'</strong><small>Receiving lab confirmed</small></span><em>Unsigned</em></div></div></div>'+cue('VERIFY ORDER STATUS'),'ao-art-final-view');
 }
}
const steps=[
 {label:'CHART',title:'Open patient chart',text:'Open the patient chart and click the upper-right <strong>hamburger menu</strong>.'},
 {label:'MENU',title:'Create order group',text:'Select <strong>Create order group</strong> from the purple menu.'},
 {label:'PROVIDER',title:'Select ordering provider',text:'Search for and choose the correct <strong>ordering provider</strong>.'},
 {label:'ORDER GROUP',title:'Open Diagnoses & Orders',text:'Click <strong>+ Diagnoses &amp; Orders</strong> in the new order group.'},
 {label:'DIAGNOSIS',title:'Add diagnosis',text:'Search for and add the <strong>appropriate diagnosis</strong> first.'},
 {label:'LAB PREFERENCES',title:'Edit lab preferences',text:'Click <strong>Edit preferences</strong>. Under <strong>Lab orders</strong>, select <strong>Set a preferred lab orders provider</strong>.'},
 {label:'RECEIVING LAB',title:'Choose correct lab',text:'Check the <strong>location ZIP code</strong>, correcting it if needed. Search for <strong>Quest, LabCorp, Cedars, HealthTrackRx, or PathMD</strong>; choose the correct facility/address.'},
 {label:'TEST CODE',title:'Search exact test code',text:'Enter the <strong>receiving lab test code</strong>. Verify the test, panel, reflex algorithm, specimen requirements and performing laboratory before selecting.'},
 {label:'ORDER STATUS',title:'Confirm & verify order',text:'Confirm the order appears in <strong>Outstanding Orders</strong>. If <strong>unsigned</strong>, follow the provider-signature process.'}
];
function printSheet(){
 return '<section class="ao-print-sheet" aria-label="Printable selected-laboratory checklist">'+
 '<header class="ao-print-sheet-header"><span>LAB CENTRAL · ATHENA SENDOUT ORDERING</span><h1>External laboratory order checklist</h1><p>Receiving laboratory: <strong>'+selectedName()+'</strong></p></header>'+
 '<div class="ao-print-sheet-fields"><div><strong>Clinic ZIP</strong> _____________________</div><div><strong>Ordering provider</strong> _____________________</div><div><strong>Exact test code</strong> _____________________</div><div><strong>Diagnosis</strong> _____________________</div></div>'+
 '<div class="ao-print-step-list">'+steps.map(function(s,i){return '<div class="ao-print-step"><span class="ao-print-check">□</span><span class="ao-print-index">'+String(i+1).padStart(2,'0')+'</span><div><strong>'+s.title+'</strong><p>'+stepDetail(s,i)+'</p></div></div>';}).join('')+'</div>'+
 '<div class="ao-print-sheet-notes"><strong>Final checks</strong><p>Verify selected receiver, test code, panel, reflex rules, specimen requirements, performing lab, and order status. Unsigned orders require the approved provider-signing process.</p><div>Signature status:　□ Unsigned　□ Signed</div></div>'+
 '<footer>Training reference · Select the receiver and test in Athena. This printed guide does not place orders or contain patient identifiers.</footer></section>';
}
function render(){
 return '<section id="athena-external-ordering" class="ao-guide" aria-labelledby="ao-guide-heading">'+
 '<header class="ao-guide-intro"><div><span class="ao-guide-eyebrow">ATHENA / SENDOUT LAB WORKFLOW</span><h2 id="ao-guide-heading">Order an external laboratory test</h2><p>Choose a receiving lab to customize the ordering guide and printouts.</p></div><div class="ao-guide-header-actions"><span class="ao-guide-role">Ordering staff / provider</span><div class="ao-print-actions"><button type="button" data-ao-print="checklist">▤ Print checklist</button><button type="button" data-ao-print="illustrated">▤ Print illustrated guide</button></div></div></header>'+
 '<div class="ao-guide-labs" role="group" aria-label="Choose receiving laboratory"><span class="ao-guide-labs-label">RECEIVING LAB</span>'+Object.keys(labs).map(function(id){return '<button type="button" class="ao-lab-chip'+(selectedLab===id?' is-selected':'')+'" data-ao-lab="'+id+'" aria-pressed="'+(selectedLab===id)+'">'+labs[id].name+'</button>';}).join('')+'</div>'+
 '<div class="ao-guide-selection" role="status"><span class="ao-guide-selection-icon">'+(chosen()?'✓':'i')+'</span><div><strong>'+(chosen()?'Selected lab: '+chosen().name:'Choose a receiving lab above')+'</strong><p>'+(chosen()?'In Athena, search receivers for <b>'+chosen().search+'</b>. '+chosen().note+' Use the exact lab test code.':'Selecting a lab customizes the illustrated ordering steps and printouts. It does not place an order in Athena.')+'</p></div></div>'+
 '<div class="ao-guide-progress" aria-label="Sendout workflow overview"><span>Chart &amp; provider</span><b>›</b><span>Diagnosis</span><b>›</b><span>Receiving lab</span><b>›</b><span>Test code</span><b>›</b><span>Confirm</span></div>'+
 '<div class="ao-guide-grid">'+steps.map(function(s,i){return '<article class="ao-guide-card"><div class="ao-guide-card-header"><span class="ao-guide-index">'+String(i+1).padStart(2,'0')+'</span><div class="ao-guide-card-heading"><span class="ao-guide-step-type">'+s.label+'</span><h3>'+s.title+'</h3></div><span class="ao-guide-next" aria-hidden="true">'+(i===steps.length-1?'✓':'→')+'</span></div><div class="ao-guide-sketch" aria-hidden="true">'+scene(i+1)+'</div><p class="ao-guide-detail">'+stepDetail(s,i)+'</p></article>';}).join('')+'</div>'+
 '<div class="ao-guide-tips"><div class="ao-guide-tip ao-guide-tip-teal"><span class="ao-guide-tip-icon" aria-hidden="true">✓</span><div><strong>Use the exact lab test code</strong><p>Searching only by name can select the wrong test, panel, profile, reflex testing, specimen requirements or performing laboratory. Check the order details.</p></div></div><div class="ao-guide-tip ao-guide-tip-amber"><span class="ao-guide-tip-icon" aria-hidden="true">!</span><div><strong>Outstanding does not mean signed</strong><p>Verify the receiving lab and test. An unsigned order still needs to follow the authorized provider-signing workflow.</p></div></div></div>'+
 '<p class="ao-guide-footnote">Illustrations are training references, not live Athena screens. Selecting a lab here does not change an Athena order. Facility locations and menu wording vary by clinic. Follow current Sollis ordering requirements.</p>'+printSheet()+'</section>';
}
function startPrint(mode){
 if(mode!=='checklist'&&mode!=='illustrated')return;
 if(typeof document==='undefined'||!document.getElementById('athena-external-ordering'))return;
 document.documentElement.setAttribute('data-ao-print',mode);
 window.print();
}
function clearPrint(){if(typeof document!=='undefined')document.documentElement.removeAttribute('data-ao-print');}
function onGuideClick(e){
 const chip=e.target.closest('[data-ao-lab]');
 const print=e.target.closest('[data-ao-print]');
 if(!chip&&!print)return;
 if(!e.target.closest('#athena-external-ordering'))return;
 if(print){startPrint(print.getAttribute('data-ao-print'));return;}
 const id=chip.getAttribute('data-ao-lab');
 if(!Object.prototype.hasOwnProperty.call(labs,id))return;
 selectedLab=selectedLab===id?null:id;
 const root=document.getElementById('athena-external-ordering');
 if(root)root.outerHTML=render();
 const next=document.querySelector('#athena-external-ordering [data-ao-lab="'+id+'"]');
 if(next)next.focus({preventScroll:true});
}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('click',onGuideClick);
if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('afterprint',clearPrint);
window.LAB_ATHENA_ORDER_GUIDE={render:render};
})();