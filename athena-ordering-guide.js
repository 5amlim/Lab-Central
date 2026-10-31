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
 if(i===7)return (selectedLab==='quest'||selectedLab==='labcorp'?'Use the <strong>Lab Calculator</strong> to find the correct <strong>'+chosen().name+' test code</strong>, then search by that code in Athena.':'Search by the <strong>test name</strong> in Athena for <strong>'+chosen().name+'</strong>.')+' Verify the correct test, panel, reflex algorithm, specimen requirements and performing laboratory before selecting.';
 if(i===8)return 'Confirm the <strong>'+chosen().name+'</strong> order in <strong>Outstanding Orders</strong>. If <strong>unsigned</strong>, follow the provider-signature process.';
 return step.text;
}
function shell(title,body,kind){
 return '<div class="ao-art-app '+kind+'"><div class="ao-art-top"><strong>athenaOne</strong><span>Calendar　 Patients　 Claims</span><b>⚙</b></div><div class="ao-art-subhead"><strong>'+title+'</strong><small>ILLUSTRATED VIEW</small></div>'+body+'</div>';
}
function cue(s){return '<span class="ao-art-cue">'+s+'</span>';}
function bar(txt){return '<div class="ao-art-search"><span>⌕</span><b>'+txt+'</b><span>×</span></div>';}
function check(){return '<span class="ao-art-check">✓</span>';}
function artFrame(title,body,variant){
 return '<div class="ao-art-app ao-art-rev ao-art-rev-'+variant+'">'+
 '<div class="ao-art-top"><strong>athenaOne</strong><span>Calendar　 Patients　 Claims　 Reports</span><b>⚙</b></div>'+
 '<div class="ao-r-screen-title"><span>'+title+'</span><small>ILLUSTRATED EXAMPLE</small></div>'+body+'</div>';
}
function artCue(s){return '<span class="ao-art-cue">'+s+'</span>';}
function artSearch(s){return '<div class="ao-r-search"><span>⌕</span><strong>'+s+'</strong></div>';}
function artCheck(){return '<span class="ao-r-check">✓</span>';}
function scene(n){
 switch(n){
  case 1:return artFrame('Patient chart',
   '<div class="ao-r-chart-banner"><span class="ao-r-avatar">PT</span><div><b>Patient chart</b><small>Patient overview</small></div><span class="ao-r-menu-button">☰</span></div>'+
   '<div class="ao-r-chart-body"><div><b>Personal info</b><span>Allergies</span><i></i><span>Medications</span><i></i></div><div><b>Outstanding Orders</b><i></i><i></i></div></div>'+artCue('OPEN MENU'),'chart');
  case 2:return artFrame('Patient chart',
   '<div class="ao-r-chart-background"><div><b>Personal info</b><i></i><i></i></div><div><b>Outstanding Orders</b><i></i></div></div>'+
   '<div class="ao-r-drop-menu"><span>Quickview</span><span>Create patient case</span><strong>＋ Create order group</strong><span>Print chart sections</span><span>Print forms</span><span>Add document</span></div>'+artCue('CREATE ORDER GROUP'),'menu');
  case 3:return artFrame('Create order group',
   '<div class="ao-r-provider-modal"><b>First, select the ordering provider:</b>'+artSearch('Search provider name')+
   '<div class="ao-r-provider-selected">'+artCheck()+'<strong>Ordering provider selected</strong></div></div>'+artCue('SELECT PROVIDER'),'provider');
  case 4:return artFrame('Order group',
   '<div class="ao-r-order-workspace"><div class="ao-r-order-sidebar"><b>Active Problems</b><span>Historical (0)</span><p>☑ No Known Problems</p></div>'+
   '<div class="ao-r-order-form"><b>Orders</b><div class="ao-r-field"><span>Ordering Provider</span><strong>Selected provider　⌄</strong></div><div class="ao-r-field"><span>Supervising Provider</span><strong>Selected provider　⌄</strong></div><div class="ao-r-order-plus">⊕　 DIAGNOSES &amp; ORDERS</div></div></div>'+artCue('CLICK + DIAGNOSES & ORDERS'),'group');
  case 5:return artFrame('Diagnoses & Orders',
   '<div class="ao-r-modal-head"><b>⊕　 DIAGNOSES &amp; ORDERS</b></div>'+artSearch('Search diagnosis')+
   '<div class="ao-r-search-meta">Displaying orders from preferred facility <b>Edit preferences</b></div>'+
   '<div class="ao-r-dual-list"><div><b>Diagnoses (20+)</b><span class="ao-r-highlight-row">'+artCheck()+' Appropriate diagnosis</span><span>Other diagnosis</span></div><div><b>Order Sets</b><span>Available order set</span><span>Related test</span></div></div>'+artCue('ADD DIAGNOSIS'),'diagnosis');
  case 6:return artFrame('Edit preferences',
   '<div class="ao-r-preferences-window"><div class="ao-r-preferences-heading"><b>Set a preferred facility</b></div><div class="ao-r-pref-content"><aside><strong>Lab orders</strong><span>Imaging orders</span><span>Referral orders</span></aside>'+
   '<section><b>Lab orders</b><p>Choose where laboratory orders are sent</p><div class="ao-r-pref-action">Set a preferred lab orders provider <span>›</span></div></section></div></div>'+artCue('LAB ORDERS → SET PROVIDER'),'preferences');
  case 7:return artFrame('Add a receiver',
   '<div class="ao-r-receiver-controls"><div><b>View by</b><span>Relevance</span><span>Frequently Used</span></div>'+artSearch(chosen()?chosen().search:'Search receivers')+'</div>'+
   '<div class="ao-r-zip-control"><span>Distance: within selected area</span><strong>Practice ZIP code　✎</strong></div>'+
   '<div class="ao-r-receiver-results"><div class="ao-r-results-heading"><b>Receiver</b><b>Location</b></div><div class="ao-r-result-selected">'+artCheck()+'<strong>'+(chosen()?chosen().name:'Select intended lab')+'</strong><small>Confirm facility &amp; address</small></div><div class="ao-r-result-alt">Another matching receiver</div></div>'+artCue('VERIFY ZIP + RECEIVER'),'receiver');
  case 8:return artFrame('Diagnoses & Orders',
   '<div class="ao-r-modal-head"><b>⊕　 DIAGNOSES &amp; ORDERS</b></div>'+artSearch(selectedLab==='quest'||selectedLab==='labcorp'?'Enter test code from Lab Calculator':selectedLab?'Search test name':'Search test code or name')+
   '<div class="ao-r-search-meta">Displaying labs from <b>'+(chosen()?chosen().name:'selected receiving lab')+'</b> · Edit preferences</div>'+
   '<div class="ao-r-dual-list ao-r-test-list"><div><b>Diagnoses</b><span>Selected diagnosis</span></div><div><b>Orders (matching test)</b><span class="ao-r-highlight-row">'+artCheck()+' Verify matching test</span><span>Check panel / reflex rules</span><span>Check specimen &amp; laboratory</span></div></div>'+artCue('VERIFY MATCHING TEST'),'testcode');
  default:return artFrame('Patient chart',
   '<div class="ao-r-outstanding"><div class="ao-r-outstanding-left"><b>Orders</b><span>Diagnosis linked</span><i></i><small>Provider selected</small></div>'+
   '<div class="ao-r-outstanding-right"><b>Outstanding Orders</b><div class="ao-r-outstanding-row">'+artCheck()+'<span><strong>'+(chosen()?chosen().name+' laboratory order':'External lab order')+'</strong><small>Receiving laboratory verified</small></span><em>Unsigned</em></div></div></div>'+artCue('CHECK SIGNATURE STATUS'),'outstanding');
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
 {label:'TEST SEARCH',title:'Find the correct test',text:'For <strong>Quest and LabCorp</strong>, use the <strong>Lab Calculator</strong> to find the test code and enter it in Athena. For <strong>Cedars, HealthTrackRx, and PathMD</strong>, search by <strong>test name</strong>. Verify test details before selecting.'},
 {label:'ORDER STATUS',title:'Confirm & verify order',text:'Confirm the order appears in <strong>Outstanding Orders</strong>. If <strong>unsigned</strong>, follow the provider-signature process.'}
];
function printSheet(){
 return '<section class="ao-print-sheet" aria-label="Printable selected-laboratory checklist">'+
 '<header class="ao-print-sheet-header"><span>LAB CENTRAL · ATHENA SENDOUT ORDERING</span><h1>External laboratory order checklist</h1><p>Receiving laboratory: <strong>'+selectedName()+'</strong></p></header>'+
 '<div class="ao-print-sheet-fields"><div><strong>Clinic ZIP</strong> _____________________</div><div><strong>Ordering provider</strong> _____________________</div><div><strong>Test code / name</strong> _____________________</div><div><strong>Diagnosis</strong> _____________________</div></div>'+
 '<div class="ao-print-step-list">'+steps.map(function(s,i){return '<div class="ao-print-step"><span class="ao-print-check">□</span><span class="ao-print-index">'+String(i+1).padStart(2,'0')+'</span><div><strong>'+s.title+'</strong><p>'+stepDetail(s,i)+'</p></div></div>';}).join('')+'</div>'+
 '<div class="ao-print-sheet-notes"><strong>Final checks</strong><p>Verify selected receiver, correct test code or name, panel, reflex rules, specimen requirements, performing lab, and order status. Unsigned orders require the approved provider-signing process.</p><div>Signature status:　□ Unsigned　□ Signed</div></div>'+
 '<footer>Training reference · Select the receiver and test in Athena. This printed guide does not place orders or contain patient identifiers.</footer></section>';
}
function render(){
 return '<section id="athena-external-ordering" class="ao-guide" aria-labelledby="ao-guide-heading">'+
 '<header class="ao-guide-intro"><div><span class="ao-guide-eyebrow">ATHENA / SENDOUT LAB WORKFLOW</span><h2 id="ao-guide-heading">Order an external laboratory test</h2><p>Choose a receiving lab to customize the ordering guide and printouts.</p></div><div class="ao-guide-header-actions"><span class="ao-guide-role">Ordering staff / provider</span><div class="ao-print-actions"><button type="button" data-ao-print="checklist">▤ Print checklist</button><button type="button" data-ao-print="illustrated">▤ Print illustrated guide</button></div></div></header>'+
 '<div class="ao-guide-labs" role="group" aria-label="Choose receiving laboratory"><span class="ao-guide-labs-label">RECEIVING LAB</span>'+Object.keys(labs).map(function(id){return '<button type="button" class="ao-lab-chip'+(selectedLab===id?' is-selected':'')+'" data-ao-lab="'+id+'" aria-pressed="'+(selectedLab===id)+'">'+labs[id].name+'</button>';}).join('')+'</div>'+
 '<div class="ao-guide-selection" role="status"><span class="ao-guide-selection-icon">'+(chosen()?'✓':'i')+'</span><div><strong>'+(chosen()?'Selected lab: '+chosen().name:'Choose a receiving lab above')+'</strong><p>'+(chosen()?'In Athena, search receivers for <b>'+chosen().search+'</b>. '+chosen().note+' Use the correct test code or name.':'Selecting a lab customizes the illustrated ordering steps and printouts. It does not place an order in Athena.')+'</p></div></div>'+
 '<div class="ao-guide-progress" aria-label="Sendout workflow overview"><span>Chart &amp; provider</span><b>›</b><span>Diagnosis</span><b>›</b><span>Receiving lab</span><b>›</b><span>Find test</span><b>›</b><span>Confirm</span></div>'+
 '<div class="ao-guide-grid">'+steps.map(function(s,i){return '<article class="ao-guide-card"><div class="ao-guide-card-header"><span class="ao-guide-index">'+String(i+1).padStart(2,'0')+'</span><div class="ao-guide-card-heading"><span class="ao-guide-step-type">'+s.label+'</span><h3>'+s.title+'</h3></div><span class="ao-guide-next" aria-hidden="true">'+(i===steps.length-1?'✓':'→')+'</span></div><div class="ao-guide-sketch" aria-hidden="true">'+scene(i+1)+'</div><p class="ao-guide-detail">'+stepDetail(s,i)+'</p></article>';}).join('')+'</div>'+
 '<div class="ao-guide-tips"><div class="ao-guide-tip ao-guide-tip-teal"><span class="ao-guide-tip-icon" aria-hidden="true">✓</span><div><strong>Search by code or name as appropriate</strong><p>For Quest and LabCorp, use the Lab Calculator to find the test code. For Cedars, HealthTrackRx and PathMD, search by test name. Always check the panel, reflex testing, specimen requirements and performing laboratory.</p></div></div><div class="ao-guide-tip ao-guide-tip-amber"><span class="ao-guide-tip-icon" aria-hidden="true">!</span><div><strong>Outstanding does not mean signed</strong><p>Verify the receiving lab and test. An unsigned order still needs to follow the authorized provider-signing workflow.</p></div></div></div>'+
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