/* Lab Central · Envi inventory purchasing. Training reference only; does not create orders. */
(function(){
'use strict';
var steps=[
 {phase:'START',title:'Open Order Entry',action:'OPEN ORDER ENTRY',scene:'navigation',body:'In <strong>Envi</strong>, expand <strong>Purchasing</strong> in the left navigation and select <strong>Order Entry</strong>.',note:'This is the ordering-entry workflow, not Purchase Orders or Auto PO.'},
 {phase:'START',title:'Create a new order entry',action:'ADD ORDER ENTRY',scene:'new',body:'On the Order Entry list, select <strong>Add Order Entry</strong>.',note:'Use a new order entry for the current clinic order.'},
 {phase:'SETUP',title:'Select facility and enter reference',action:'COMPLETE REQUIRED FIELDS',scene:'form',body:'Choose the ordering <strong>Facility</strong> (your clinic). Set <strong>Location</strong> to <strong>Order Entry</strong>. Enter a recognizable <strong>Reference</strong>, for example <strong>BH Lab [Initials] 10/30</strong>, or use your market’s preferred naming format.',note:'Department is optional. Select the department required by your local workflow, if applicable.'},
 {phase:'SETUP',title:'Save the draft order entry',action:'CLICK ADD',scene:'draft',body:'Click <strong>Add</strong> to create the order entry. Envi opens the new entry in <strong>Draft</strong> status and assigns an <strong>Order Entry #</strong>.',note:'This is not yet a submitted purchase order.'},
 {phase:'ITEMS',title:'Open Add Items from Inventory',action:'CHOOSE INVENTORY',scene:'menu',body:'Open the <strong>Line Items</strong> tab. Click the <strong>Add Items</strong> dropdown and choose <strong>Add Items from Inventory</strong>.',note:'Select Add Items from Inventory, not Add Any Items.'},
 {phase:'ITEMS',title:'Find the correct item',action:'SEARCH, THEN PRESS ENTER',scene:'search',body:'Search by the <strong>vendor item SKU</strong> or <strong>Envi Inventory #</strong>, then press <strong>Enter</strong>. Confirm the correct description, vendor and package size before selecting.',note:'Illustrated example: McKesson SKU 832497 / Envi inventory 10856. These are examples, not default items for every order.'},
 {phase:'ITEMS',title:'Select the item and quantity',action:'CHECK ITEM + ENTER QTY',scene:'quantity',body:'Check the box beside the matching item and enter the number to order in the <strong>QTY</strong> field. Verify the <strong>unit of measure (UOM)</strong> before continuing.',note:'Example: QTY 2 with UOM BX (10) means two boxes of ten, not two individual discs.'},
 {phase:'ITEMS',title:'Add the item and repeat as needed',action:'ADD & CONTINUE',scene:'continue',body:'Click <strong>Add &amp; Continue</strong> to save the selected item and search for the next SKU or inventory number. Repeat the search, selection and quantity steps for each additional item. <strong>When the last item is ready</strong>, select <strong>Add &amp; Go to Line Items</strong>, or return to the <strong>Line Items</strong> tab.',note:'Keep adding until every needed item appears in the order. Do not submit after entering only the first item.'},
 {phase:'REVIEW',title:'Review all line items',action:'VERIFY EVERY QUANTITY',scene:'review',body:'On <strong>Line Items</strong>, review every product, <strong>quantity</strong>, <strong>UOM</strong> and item number. Confirm that all requested supplies are listed and no duplicates or incorrect items were added.',note:'The review must be completed before Submit to PO.'},
 {phase:'REVIEW',title:'Correct a line item if needed',action:'EDIT → UPDATE',scene:'edit',body:'<strong>If anything is incorrect:</strong> open the line item, select <strong>Edit</strong>, change the <strong>Order Quantity</strong> and click <strong>Update</strong>. Return to Line Items and verify the change. If everything is correct, skip this correction step.',note:'Editing is conditional. Do not change an already correct quantity.'},
 {phase:'SUBMIT',title:'Submit the order entry to PO',action:'DETAILS → SUBMIT TO PO',scene:'submit',body:'After confirming all line items, open <strong>Details</strong> and click <strong>Submit to PO</strong>.',note:'Envi may create one or more purchase orders from the entry.'},
 {phase:'SUBMIT',title:'Choose Pending and submit',action:'SELECT PENDING → SUBMIT',scene:'pending',body:'In the <strong>Submit Order Entry</strong> dialog, choose <strong>Pending</strong>, not Draft, then click <strong>Submit</strong>.',note:'Do not confuse the original Draft order entry status with the desired Pending PO submission status.'},
 {phase:'HANDOFF',title:'Complete your market handoff',action:'FOLLOW MARKET REQUIREMENTS',scene:'handoff',body:'Record the <strong>Order Entry #</strong> and any generated <strong>PO number(s)</strong>. <strong>Depending on your market</strong>, notify the <strong>Lab Inventory group</strong> of the order number and enter the order in the designated <strong>ordering spreadsheet</strong>. Follow your market’s specific notification and tracking requirements.',note:'Both follow-up actions are market-dependent. Neither is assumed to be required at every site.'}
];
var mode='guided',index=0;
function tag(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function mark(v){return '<span class="ev-focus">'+v+'</span>';}
function field(label,value,active){return '<div class="ev-field '+(active?'ev-field-active':'')+'"><span>'+label+'</span><strong>'+value+'</strong><i aria-hidden="true">⌄</i></div>';}
function topbar(){return '<div class="ev-mini-top"><b class="ev-mini-brand">envi</b><span>⌕　☷　◷　?</span></div>';}
function sidebar(active){return '<aside class="ev-mini-sidebar"><span>▤　Dashboard</span><strong>🛒　Purchasing</strong><small>Purchasing Dashboard</small><small>Purchase Orders</small><small class="'+(active?'ev-nav-active':'')+'">Order Entry</small><small>Standing PO</small></aside>';}
function frame(title,inner,active){return '<div class="ev-mini-screen" aria-hidden="true">'+topbar()+'<div class="ev-mini-screen-content">'+sidebar(active!==false)+'<div class="ev-mini-main"><div class="ev-mini-crumb">'+title+'<span>▣ Sollis Health</span></div>'+inner+'</div></div><div class="ev-mini-foot">Envi · Training illustration</div></div>';}
function tabs(which){return '<div class="ev-tabs"><span class="'+(which==='details'?'ev-tab-active':'')+'">Details</span><span class="'+(which==='items'?'ev-tab-active':'')+'">Line Items</span><span class="'+(which==='update'?'ev-tab-active':'')+'">Update</span><span>Resources</span></div>';}
function rowline(second,edit){return '<div class="ev-table-row"><span>☑</span><span>'+(second?'2':'1')+'</span><span>'+(second?'11151':'10856')+'</span><span>McKesson</span><span>'+(second?'824758':'832497')+'</span><span class="ev-item-description">'+(second?'Triage Troponin-I Kit':'Piccolo Comprehensive Metabolic Panel')+'</span><b class="'+(edit?'ev-highlight':'')+'">'+(second?'1 CT (25)':'2 BX (10)')+'</b></div>';}
function visual(which){
 if(which==='navigation')return frame('Dashboard','<div class="ev-placeholder-header"><strong>Welcome to Envi</strong><p>Purchasing <span>›</span> Order Entry</p></div><div class="ev-ui-pointer">SELECT ORDER ENTRY ↖</div>',true);
 if(which==='new')return frame('Order Entry','<div class="ev-mini-toolbar">'+mark('＋ Add Order Entry')+'<span>Multiple Orders Entry Upload</span></div><div class="ev-table-head">OE #　　Reference　　　　　 Facility　　　　　　 Status</div><div class="ev-table-simple">1442　　Lab order　　　　　Clinic　　　　　　Submitted</div>',true);
 if(which==='form')return frame('Order Entry · Add Order Entry','<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add</span><span>Cancel</span></div><div class="ev-mini-form">'+field('Facility *','Beverly Hills Flagship',true)+field('Location *','Order Entry',true)+field('Department','None',false)+field('Reference','BH Lab [Initials] 10/30',true)+'</div>',true);
 if(which==='draft')return frame('Add Order Entry','<div class="ev-mini-toolbar">'+mark('Add')+'<span>Cancel</span></div><div class="ev-mini-form">'+field('Facility *','Beverly Hills Flagship',false)+field('Location *','Order Entry',false)+field('Reference','BH Lab [Initials] 10/30',false)+'</div><p class="ev-secondary-caption">After Add: <strong>Order Entry 1443</strong> · Status: <strong>Draft</strong></p>',true);
 if(which==='menu')return frame('Order Entry 1443',tabs('items')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add Items ⌄</span><span>Delete Selected</span><span>Quick Add</span></div><div class="ev-dropdown"><span class="ev-dropdown-active">Add Items from Inventory　✓</span><span>Add Any Items</span><span>Add Items from Template</span><span>Add Items from Recent Orders</span></div>',true);
 if(which==='search')return frame('Order Entry 1443',tabs('update')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add &amp; Continue</span><span>Add &amp; Go to Line Items</span></div><div class="ev-search-box">'+mark('832497')+' <b>⌕</b></div><div class="ev-table-head">Inv #　　 Vendor　　 Vendor Item #　　 Description　　 QTY</div><div class="ev-ui-search-meta">Press <strong>Enter</strong> to search</div>',true);
 if(which==='quantity')return frame('Order Entry 1443',tabs('update')+'<div class="ev-search-box">832497　⌕</div><div class="ev-item-result"><span>☑</span><span><small>Inv # 10856 · McKesson</small><strong>832497</strong><small>Piccolo Comprehensive Metabolic Panel</small></span><span><small>UOM</small><b>BX (10)</b></span><span class="ev-qty-focus"><small>QTY</small><b>2</b></span></div>',true);
 if(which==='continue')return frame('Order Entry 1443',tabs('update')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill ev-button-primary-outline">Add &amp; Continue</span><span class="ev-blue-pill">Add &amp; Go to Line Items</span></div><div class="ev-loop"><div>① Search item</div><b>›</b><div>② Select + QTY</div><b>›</b><div>③ Add &amp; Continue</div><span class="ev-loop-back">↩ REPEAT FOR MORE ITEMS</span></div>',true);
 if(which==='review')return frame('Order Entry 1443',tabs('items')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add Items ⌄</span><span>Delete Selected</span><span>Quick Add</span></div><div class="ev-table-head">　Line　 Inv #　　　 Vendor　　 SKU　　　　 Description　　　　　　 Quantity</div><div class="ev-table-grid">'+rowline(false,false)+rowline(true,false)+'</div><div class="ev-ui-pointer ev-pointer-bottom">CHECK ALL ITEM QUANTITIES ✓</div>',true);
 if(which==='edit')return frame('Order Entry 1443',tabs('items')+'<div class="ev-mini-toolbar"><span>← Back</span><span class="ev-blue-pill">Update</span><span>Cancel</span></div><div class="ev-detail-grid"><span>Inventory #</span><strong>10856</strong><span>Vendor Item #</span><strong>832497</strong></div><div class="ev-mini-form ev-mini-form-edit">'+field('Order Quantity *','2',true)+'<small>UOM　BX (10)</small></div>',true);
 if(which==='submit')return frame('Order Entry 1443',tabs('details')+'<div class="ev-mini-toolbar"><span>Edit</span>'+mark('Submit to PO')+'</div><div class="ev-detail-grid"><span>Reference</span><strong>BH Lab [Initials] 10/30</strong><span>Status</span><strong>Draft</strong><span>Line items</span><strong>Reviewed ✓</strong></div>',true);
 if(which==='pending')return frame('Order Entry 1443',tabs('details')+'<div class="ev-modal-back"><div class="ev-modal"><strong>Submit Order Entry</strong><p>Submit Purchase Order(s) to:</p><span>◯ Draft</span><b class="ev-pending-selected">◉ Pending</b><div><span>Cancel</span><strong>Submit</strong></div></div></div>',true);
 return '<div class="ev-handoff-picture" aria-hidden="true"><div class="ev-handoff-po"><small>ENVI</small><strong>Order submitted</strong><span>Record generated PO number(s)</span><b>PO # ______</b></div><div class="ev-handoff-connect">→</div><div class="ev-handoff-tasks"><div><span>✉</span><strong>Lab Inventory group</strong><small>Notify when required by market</small></div><div><span>▦</span><strong>Ordering spreadsheet</strong><small>Record when required by market</small></div></div></div>';
}
function renderStep(s,i){
 return '<article class="ev-step" data-ev-card="'+i+'" '+(mode==='guided'&&index!==i?'hidden':'')+'>'+
 '<div class="ev-card-top"><span class="ev-step-number">'+String(i+1).padStart(2,'0')+'</span><div class="ev-card-heading"><span class="ev-step-phase">'+s.phase+'</span><h2>'+tag(s.title)+'</h2></div><span class="ev-required-tag">ACTION REQUIRED</span></div>'+
 '<p class="ev-step-description">'+s.body+'</p><div class="ev-illustration"><div class="ev-illustration-title"><span class="ev-illustration-dot"></span> ENVI SCREEN REFERENCE <small>Illustrated, not a live screen</small></div>'+visual(s.scene)+'</div>'+
 '<div class="ev-next-action"><span class="ev-action-icon">➜</span><strong>'+tag(s.action)+'</strong></div>'+
 '<div class="ev-card-note"><span class="ev-note-symbol">i</span><span>'+s.note+'</span></div></article>';
}
function render(){
 return '<section id="envi-ordering-guide" class="envi-guide" aria-labelledby="ev-heading">'+
 '<header class="ev-header"><div><span class="ev-eyebrow">LAB OPERATIONS / INVENTORY PURCHASING</span><h1 id="ev-heading">Envi Ordering</h1><p>Create an order entry, add inventory items, verify quantities and submit purchase orders as <strong>Pending</strong>.</p></div><span class="ev-app-badge"><span>e</span> envi · ORDER ENTRY</span></header>'+
 '<div class="ev-overview"><div><strong>START</strong><span>Purchasing<br>Order Entry</span></div><b>›</b><div><strong>SET UP</strong><span>Facility &amp;<br>reference</span></div><b>›</b><div><strong>BUILD</strong><span>Add inventory<br>items</span></div><b>›</b><div><strong>REVIEW</strong><span>Check item<br>quantities</span></div><b>›</b><div><strong>SUBMIT</strong><span>Pending &amp;<br>market handoff</span></div></div>'+
 '<div class="ev-guide-toolbar"><div class="ev-guide-toolbar-label"><strong>Step-by-step instructions</strong><span>'+steps.length+' steps · Screens recreated from the supplied Envi workflow</span></div><div class="ev-mode-control" role="group" aria-label="Choose guide view"><button type="button" data-ev-mode="guided" aria-pressed="'+(mode==='guided')+'" class="'+(mode==='guided'?'ev-mode-on':'')+'">One step at a time</button><button type="button" data-ev-mode="all" aria-pressed="'+(mode==='all')+'" class="'+(mode==='all'?'ev-mode-on':'')+'">View all steps</button></div></div>'+
 '<div class="ev-jump-strip" aria-label="Jump to a step">'+steps.map(function(s,i){return '<button type="button" data-ev-step="'+i+'" class="'+(i===index?'ev-current-step':'')+'" '+(i===index?'aria-current="step"':'')+' title="'+tag(s.title)+'">'+String(i+1).padStart(2,'0')+'</button>';}).join('')+'</div>'+
 '<div class="ev-step-viewport">'+steps.map(renderStep).join('')+'</div>'+
 '<nav class="ev-transport" aria-label="Guide step navigation"><span>STEP <strong>'+String(index+1).padStart(2,'0')+' / '+steps.length+'</strong></span><div><button type="button" data-ev-step="'+Math.max(0,index-1)+'" '+(index===0?'disabled':'')+'>‹ Previous</button><button type="button" data-ev-step="'+Math.min(steps.length-1,index+1)+'" '+(index===steps.length-1?'disabled':'')+'>Next step ›</button></div></nav>'+
 '<aside class="ev-final-note"><strong>Before closing the order</strong><p>Confirm the correct clinic and order reference, all quantities and units of measure, Pending submission, and any market-specific inventory notification or spreadsheet entry.</p><small>Training reference only. Envi permissions, approval rules and market requirements may vary. This page does not submit an order or save inventory data.</small></aside>'+
 '</section>';
}
function compactSop(){
 var E=tag;
 var h='<div class="lc-sop-document"><header class="lc-sop-header"><div class="lc-sop-eyebrow">LAB CENTRAL / LAB OPERATIONS</div><h1>Envi Ordering · Order Entry to Pending PO</h1><p>Inventory purchasing workflow with item-by-item review and market-dependent follow-up.</p><div class="lc-sop-meta"><span><b>System</b> Envi · Purchasing</span><span><b>Submit status</b> Pending</span><span><b>Scope</b> Clinic supply orders</span></div></header>';
 steps.forEach(function(s,i){
  h+='<article class="lc-sop-step"><div class="lc-sop-step-top"><span class="lc-sop-index">'+String(i+1).padStart(2,'0')+'</span><h3>'+E(s.title)+'</h3><span class="lc-sop-owner">'+E(s.phase)+'</span></div><div class="lc-sop-step-body"><p>'+s.body+'</p><p><strong>Action:</strong> '+E(s.action)+'</p><p><em>'+s.note+'</em></p></div></article>';
  if(i===7)h+='<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>More items to order?</strong><span>SELECT ONE PATH</span></div><div class="lc-sop-branches"><div class="lc-sop-branch"><span class="lc-sop-branch-label">YES</span><div>Use Add &amp; Continue. Repeat search, item selection, and quantity entry for each additional SKU.</div></div><div class="lc-sop-branch"><span class="lc-sop-branch-label">NO</span><div>Use Add &amp; Go to Line Items, or open Line Items, and review the complete order.</div></div></div></div>';
  if(i===9)h+='<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>Any incorrect quantity or item?</strong><span>SELECT ONE PATH</span></div><div class="lc-sop-branches"><div class="lc-sop-branch"><span class="lc-sop-branch-label">YES</span><div>Open line item, click Edit, correct quantity, Update, and review again.</div></div><div class="lc-sop-branch"><span class="lc-sop-branch-label">NO</span><div>Go to Details and choose Submit to PO.</div></div></div></div>';
 });
 h+='<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>Market-specific follow-up required?</strong><span>FOLLOW LOCAL WORKFLOW</span></div><div class="lc-sop-branches"><div class="lc-sop-branch"><span class="lc-sop-branch-label">INVENTORY GROUP</span><div>If required, notify the designated Lab Inventory group of the generated PO number(s).</div></div><div class="lc-sop-branch"><span class="lc-sop-branch-label">ORDER TRACKER</span><div>If required, enter the order in your market’s approved spreadsheet.</div></div></div></div>'+
 '<footer class="lc-sop-footer">Envi training reference. Check current market policies and Envi approval requirements. This document does not place purchase orders.</footer></div>';
 return h;
}
function refresh(root){
 if(!root)return;
 root.outerHTML=render();
}
if(typeof document!=='undefined')document.addEventListener('click',function(event){
 var btn=event.target.closest('[data-ev-step],[data-ev-mode]');
 if(!btn||!btn.closest('#envi-ordering-guide'))return;
 if(btn.hasAttribute('data-ev-step')){
  var next=Number(btn.getAttribute('data-ev-step'));
  if(!Number.isInteger(next)||next<0||next>=steps.length)return;
  index=next;
  if(mode==='all')mode='guided';
 }else{
  var chosen=btn.getAttribute('data-ev-mode');
  if(chosen!=='all'&&chosen!=='guided')return;
  mode=chosen;
 }
 var old=document.getElementById('envi-ordering-guide');
 var loc=old&&old.getBoundingClientRect().top;
 refresh(old);
 if(mode==='guided'){
  var current=document.querySelector('#envi-ordering-guide .ev-step:not([hidden])');
  if(current&&loc!=null)current.scrollIntoView({block:'nearest',behavior:'instant'});
 }
});
window.LAB_ENVI_ORDERING={render:render,compactSop:compactSop};
})();
