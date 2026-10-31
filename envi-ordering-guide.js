/* Lab Central · Envi inventory purchasing. Training reference only; does not create orders. */
(function(){
'use strict';
var steps=[
 {
  "phase": "START",
  "title": "Expand Purchasing",
  "action": "EXPAND PURCHASING",
  "scene": "purchasing",
  "body": "In Envi’s left sidebar, click <strong>Purchasing</strong> to reveal its submenu.",
  "note": "You are not creating a Purchase Order directly at this stage.",
  "kind": "required",
  "id": "step-01"
 },
 {
  "phase": "START",
  "title": "Open Order Entry",
  "action": "SELECT ORDER ENTRY",
  "scene": "navigation",
  "body": "Under Purchasing, select <strong>Order Entry</strong>. This opens the list of existing order entries.",
  "note": "Choose Order Entry, not Purchase Orders, PO Search, or Auto PO.",
  "kind": "required",
  "id": "step-02"
 },
 {
  "phase": "START",
  "title": "Start a new entry",
  "action": "CLICK ADD ORDER ENTRY",
  "scene": "new",
  "body": "On the Order Entry list, click the blue <strong>Add Order Entry</strong> button.",
  "note": "Use a new entry for the current clinic and ordering session.",
  "kind": "required",
  "id": "step-03"
 },
 {
  "phase": "SETUP",
  "title": "Choose your clinic",
  "action": "SELECT FACILITY",
  "scene": "facility",
  "body": "Select <strong>Facility</strong> and choose the clinic receiving the supplies, such as <strong>Beverly Hills Flagship</strong>.",
  "note": "The clinic in the example is illustrative. Use your actual ordering location.",
  "kind": "required",
  "id": "step-04"
 },
 {
  "phase": "SETUP",
  "title": "Set the order location",
  "action": "SELECT ORDER ENTRY",
  "scene": "location",
  "body": "Open <strong>Location</strong> and select <strong>Order Entry</strong>.",
  "note": "The Location field is required and must match the Envi Order Entry location.",
  "kind": "required",
  "id": "step-05"
 },
 {
  "phase": "SETUP",
  "title": "Check Department",
  "action": "SELECT IF YOUR MARKET USES ONE",
  "scene": "department",
  "body": "Review <strong>Department</strong>. Leave <strong>None</strong> only when your market does not require a specific department.",
  "note": "Department is not marked required in the screenshot. Follow local rules.",
  "kind": "optional",
  "id": "step-06"
 },
 {
  "phase": "SETUP",
  "title": "Enter a recognizable reference",
  "action": "ENTER ORDER REFERENCE",
  "scene": "reference",
  "body": "In <strong>Reference</strong>, enter a descriptive label such as <strong>BH Lab [Initials] 10/30</strong>, or use your market’s naming convention.",
  "note": "The reference helps identify the order later. No employee names are used in the example.",
  "kind": "required",
  "id": "step-07"
 },
 {
  "phase": "SETUP",
  "title": "Create the order entry",
  "action": "CLICK ADD",
  "scene": "draft",
  "body": "Check the facility, location and reference. Click <strong>Add</strong> to save the new order entry.",
  "note": "This creates an entry, not a submitted PO.",
  "kind": "required",
  "id": "step-08"
 },
 {
  "phase": "SETUP",
  "title": "Check the draft details",
  "action": "CONFIRM DRAFT & ENTRY NUMBER",
  "scene": "draft-details",
  "body": "Envi opens the new <strong>Order Entry #</strong>. Confirm the clinic, reference and <strong>Draft</strong> status.",
  "note": "The illustrated entry number is an example, not a live reference.",
  "kind": "required",
  "id": "step-09"
 },
 {
  "phase": "ITEMS",
  "title": "Open the Line Items tab",
  "action": "CLICK LINE ITEMS",
  "scene": "line-tab",
  "body": "Click <strong>Line Items</strong> at the top of the new order entry.",
  "note": "A new entry may show No records found until items are added.",
  "kind": "required",
  "id": "step-10"
 },
 {
  "phase": "ITEMS",
  "title": "Open the Add Items dropdown",
  "action": "OPEN ADD ITEMS",
  "scene": "open-menu",
  "body": "Click the blue <strong>Add Items</strong> dropdown above the Line Items table.",
  "note": "Use the dropdown arrow to choose an item source.",
  "kind": "required",
  "id": "step-11"
 },
 {
  "phase": "ITEMS",
  "title": "Choose inventory items",
  "action": "SELECT ADD ITEMS FROM INVENTORY",
  "scene": "menu",
  "body": "In the dropdown, select <strong>Add Items from Inventory</strong>.",
  "note": "Do not choose Add Any Items for this standard inventory ordering workflow.",
  "kind": "required",
  "id": "step-12"
 },
 {
  "phase": "ITEMS",
  "title": "Search by SKU or inventory #",
  "action": "TYPE SKU / INVENTORY NUMBER",
  "scene": "search",
  "body": "In the search field, enter the <strong>vendor item SKU</strong> or <strong>Envi Inventory #</strong>.",
  "note": "Example SKU 832497 or inventory # 10856. Use the number for the requested product.",
  "kind": "required",
  "id": "step-13"
 },
 {
  "phase": "ITEMS",
  "title": "Run the item search",
  "action": "PRESS ENTER",
  "scene": "search-result",
  "body": "Press <strong>Enter</strong> or the search icon, then wait for the matching inventory row to appear.",
  "note": "If there is no match, recheck the number and search filter. Do not substitute a similar product without confirmation.",
  "kind": "required",
  "id": "step-14"
 },
 {
  "phase": "ITEMS",
  "title": "Verify the exact product",
  "action": "MATCH ITEM, VENDOR & UOM",
  "scene": "verify-row",
  "body": "Review the <strong>inventory number, vendor, vendor item number, description and package unit</strong> before selecting the row.",
  "note": "Example: 832497, Piccolo CMP, BX (10). Do not assume 1 box equals 1 test.",
  "kind": "required",
  "id": "step-15"
 },
 {
  "phase": "ITEMS",
  "title": "Select the item row",
  "action": "CHECK THE ITEM BOX",
  "scene": "check-row",
  "body": "Check the box beside the correct item so it is selected for your order.",
  "note": "Select only the intended item.",
  "kind": "required",
  "id": "step-16"
 },
 {
  "phase": "ITEMS",
  "title": "Enter quantity",
  "action": "ENTER QTY & CHECK UOM",
  "scene": "quantity",
  "body": "Enter the order <strong>QTY</strong> and confirm the <strong>unit of measure</strong>. A quantity of 2 with BX (10) means 2 boxes of 10.",
  "note": "Verify the number of boxes, cartons or eaches, not just the numeral.",
  "kind": "required",
  "id": "step-17"
 },
 {
  "phase": "ITEMS",
  "title": "Choose whether more items are needed",
  "action": "MORE ITEMS? ADD & CONTINUE",
  "scene": "add-continue",
  "body": "If you have <strong>more items to add</strong>, click <strong>Add &amp; Continue</strong> to save this item and stay in search. <strong>If this is the last item</strong>, use <strong>Add &amp; Go to Line Items</strong> instead (see Step 20).",
  "note": "Choose one of the two Add actions for each item. Do not click both for the same row.",
  "kind": "branch",
  "id": "step-18"
 },
 {
  "phase": "ITEMS",
  "title": "Repeat for each additional item",
  "action": "REPEAT SEARCH → SELECT → QTY",
  "scene": "continue",
  "body": "Only if more items remain, search for the next SKU or inventory #, press Enter, verify the match, select the row and enter its quantity. Use <strong>Add &amp; Continue</strong> again until you reach the final item.",
  "note": "Repeat steps 13 to 18 for every additional item.",
  "kind": "repeat",
  "id": "step-19"
 },
 {
  "phase": "ITEMS",
  "title": "Finish adding items",
  "action": "ADD & GO TO LINE ITEMS",
  "scene": "add-to-lines",
  "body": "For the final item, select <strong>Add &amp; Go to Line Items</strong>. If you already used <strong>Add &amp; Continue</strong> on the final item, simply click the <strong>Line Items</strong> tab. <strong>Do not add that same item again.</strong>",
  "note": "Do not leave the order without verifying the complete list.",
  "kind": "required",
  "id": "step-20"
 },
 {
  "phase": "REVIEW",
  "title": "Verify all line items",
  "action": "CHECK ITEMS, QTY & UOM",
  "scene": "review",
  "body": "On Line Items, check each <strong>product, vendor SKU, quantity and UOM</strong>. Look for missing products and accidental duplicates.",
  "note": "Complete this review before submitting to a PO.",
  "kind": "required",
  "id": "step-21"
 },
 {
  "phase": "REVIEW",
  "title": "Open an item to correct it",
  "action": "OPEN THE ITEM ROW",
  "scene": "open-item",
  "body": "<strong>Only if a line is incorrect:</strong> click that item’s row or line number to view its details.",
  "note": "If everything is correct, skip directly to Details.",
  "kind": "optional",
  "id": "step-22"
 },
 {
  "phase": "REVIEW",
  "title": "Edit the order quantity",
  "action": "CLICK EDIT & CHANGE QTY",
  "scene": "edit",
  "body": "On the line detail, click <strong>Edit</strong> and correct <strong>Order Quantity</strong> if needed.",
  "note": "Confirm the UOM is still correct. This step is only for corrections.",
  "kind": "optional",
  "id": "step-23"
 },
 {
  "phase": "REVIEW",
  "title": "Save changes and recheck",
  "action": "CLICK UPDATE → VERIFY",
  "scene": "save-edit",
  "body": "Click <strong>Update</strong>, return to Line Items, and verify the corrected quantity is shown.",
  "note": "Do not proceed if a correction has not saved.",
  "kind": "optional",
  "id": "step-24"
 },
 {
  "phase": "SUBMIT",
  "title": "Return to Details",
  "action": "CLICK DETAILS",
  "scene": "details-tab",
  "body": "When all lines are correct, select the <strong>Details</strong> tab.",
  "note": "Ensure the order is ready before conversion to PO.",
  "kind": "required",
  "id": "step-25"
 },
 {
  "phase": "SUBMIT",
  "title": "Start PO submission",
  "action": "CLICK SUBMIT TO PO",
  "scene": "submit",
  "body": "On Details, click <strong>Submit to PO</strong> to open the submission dialog.",
  "note": "Envi may create one or more purchase orders from one entry.",
  "kind": "required",
  "id": "step-26"
 },
 {
  "phase": "SUBMIT",
  "title": "Choose Pending",
  "action": "SELECT PENDING",
  "scene": "pending",
  "body": "In <strong>Submit Order Entry</strong>, select <strong>Pending</strong> instead of Draft.",
  "note": "This is the required submission choice shown in the provided workflow.",
  "kind": "required",
  "id": "step-27"
 },
 {
  "phase": "SUBMIT",
  "title": "Confirm the submission",
  "action": "CLICK SUBMIT",
  "scene": "submit-confirm",
  "body": "With <strong>Pending</strong> selected, click the blue <strong>Submit</strong> button in the dialog.",
  "note": "Submit only after the list and quantities have been verified.",
  "kind": "required",
  "id": "step-28"
 },
 {
  "phase": "HANDOFF",
  "title": "Record the order reference",
  "action": "SAVE ORDER ENTRY / PO NUMBER",
  "scene": "record-number",
  "body": "Record the <strong>Order Entry #</strong> and any generated <strong>PO number(s)</strong>. Confirm the resulting order status in Envi.",
  "note": "The original entry number and resulting purchase-order number may differ.",
  "kind": "required",
  "id": "step-29"
 },
 {
  "phase": "HANDOFF",
  "title": "Notify the Lab Inventory group",
  "action": "SEND ORDER NUMBER IF REQUIRED",
  "scene": "notify",
  "body": "<strong>If your market requires it:</strong> notify the designated <strong>Lab Inventory group</strong> of the order and its PO number(s).",
  "note": "Use your market’s approved group and messaging channel.",
  "kind": "market",
  "id": "step-30"
 },
 {
  "phase": "HANDOFF",
  "title": "Update the ordering spreadsheet",
  "action": "LOG ORDER IF REQUIRED",
  "scene": "sheet",
  "body": "<strong>If your market requires it:</strong> enter the order number, clinic, date and other required fields in the designated <strong>ordering spreadsheet</strong>.",
  "note": "Use your local spreadsheet. Do not assume every market uses the same tracker.",
  "kind": "market",
  "id": "step-31"
 }
];
var mode='guided',index=0;

function tag(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

/* Envi training illustrations: highlight only a control or field on the original
   screen layout. Never redraw a second sidebar or overlay instructions. */
function evTarget(inner){return '<span class="ev-target" data-ev-target="true">'+inner+'</span>';}
function evBtn(label,target,primary){
 return '<span class="ev-ui-button '+(primary?'ev-blue-pill ':'')+(target?'ev-target':'')+'" '+(target?'data-ev-target="true"':'')+'>'+label+'</span>';
}
function evField(label,value,target,isSelect){
 return '<div class="ev-field '+(target?'ev-field-active':'')+'" '+(target?'data-ev-target="true"':'')+'><span>'+label+'</span><strong>'+value+'</strong>'+(isSelect===false?'':'<i aria-hidden="true">⌄</i>')+'</div>';
}
function evTopbar(){return '<div class="ev-mini-top"><b class="ev-mini-brand">envi</b><span>⌕　▤　◷　?</span></div>';}
function evSidebar(focus){
 const collapsed=focus==='purchasing';
 const entry=focus==='entry';
 const top='<aside class="ev-mini-sidebar"><span class="ev-side-label">▤　Dashboard</span>'+
   '<span class="ev-side-label">▦　Organization <i>⌄</i></span><span class="ev-side-label">▣　Inventory <i>⌄</i></span>'+
   '<span class="ev-side-label">↕　Adjustments <i>⌄</i></span>'+
   '<strong class="ev-side-purchasing '+(collapsed?'ev-target':'')+'" '+(collapsed?'data-ev-target="true"':'')+'><span>🛒　Purchasing</span><i>'+(collapsed?'⌄':'⌃')+'</i></strong>';
 const children=collapsed?'':'<div class="ev-side-children"><small>Purchasing Dashboard</small><small>Purchase Orders</small>'+
  '<small>PO Search</small><small>PO Email Delivery</small><small>PO Confirmations</small><small>Auto PO</small>'+
  '<small class="ev-nav-active '+(entry?'ev-target':'')+'" '+(entry?'data-ev-target="true"':'')+'>Order Entry</small><small>Standing PO</small></div>';
 return top+children+'<span class="ev-side-label">▣　Receiving <i>⌄</i></span></aside>';
}
function evFrame(title,inner,focus){
 return '<div class="ev-mini-screen" aria-hidden="true">'+evTopbar()+
  '<div class="ev-mini-screen-content">'+evSidebar(focus)+
  '<div class="ev-mini-main"><div class="ev-mini-crumb">'+title+'<span>▦ Sollis Health</span></div>'+inner+
  '</div></div><div class="ev-mini-foot">Envi · Training illustration</div></div>';
}
function evDashboard(){
 return '<div class="ev-dashboard"><h3>Hello!</h3><p>Visualize data, navigate faster and track your messages.</p>'+
 '<div class="ev-dashboard-cta">⚙ Configure Dashboard</div>'+
 '<div class="ev-dashboard-divider"></div><h4>Training Video Center</h4>'+
 '<div class="ev-dashboard-tabs"><span>All Videos</span><span>Adjustments</span></div></div>';
}
function evTabs(active,target){
 return '<div class="ev-tabs">'+['Details','Line Items','Update','Resources'].map(function(t){
  const code=t==='Line Items'?'items':t.toLowerCase();
  return '<span class="'+(active===code?'ev-tab-active ':'')+(target===code?'ev-target':'')+'" '+(target===code?'data-ev-target="true"':'')+'>'+t+'</span>';
 }).join('')+'</div>';
}
function evToolbar(buttons){return '<div class="ev-mini-toolbar">'+buttons.join('')+'</div>';}
function evForm(active){
 const v=active==='facility'?['Select Facility','Select Location','Select Department','']:
 active==='location'?['Beverly Hills Flagship','Select Location','Select Department','']:
 active==='department'?['Beverly Hills Flagship','Order Entry','None','']:
 ['Beverly Hills Flagship','Order Entry','None','BH Lab [Initials] 10/30'];
 return '<div class="ev-mini-form">'+
  evField('Facility *',v[0],active==='facility')+
  evField('Location *',v[1],active==='location')+
  evField('Department',v[2],active==='department')+
  evField('Reference',v[3]||' ',active==='reference',false)+'</div>';
}
function evOrderDetails(focus){
 const data=[['Order Entry #','1443'],['Facility','Beverly Hills Flagship'],
 ['Location','Order Entry'],['Department','None'],['Reference','BH Lab [Initials] 10/30'],['Status','Draft']];
 return '<div class="ev-mini-detail-list">'+data.map(function(x){
  const target=focus==='entry'&&x[0]==='Order Entry #'||focus==='status'&&x[0]==='Status';
  return '<div><small>'+x[0]+'</small><strong class="'+(target?'ev-target':'')+'" '+(target?'data-ev-target="true"':'')+'>'+x[1]+'</strong></div>';
 }).join('')+'</div>';
}
function evOrderTable(target){
 return '<div class="ev-table-head">Line　　Inv #　　 Vendor Item #　　 Description　　　　　　　　　　　　Quantity</div>'+
 '<div class="ev-minimal-order-row"><span>1</span><span>10856</span><span>832497</span><span>Piccolo Comprehensive Metabolic Panel</span><strong class="'+(target==='first'?'ev-target':'')+'" '+(target==='first'?'data-ev-target="true"':'')+'>2 BX (10)</strong></div>'+
 '<div class="ev-minimal-order-row"><span>2</span><span>11151</span><span>824758</span><span>Triage Troponin-I Test Kit</span><strong class="'+(target==='second'?'ev-target':'')+'" '+(target==='second'?'data-ev-target="true"':'')+'>1 CT (25)</strong></div>';
}
function evInventoryToolbar(target){
 return evToolbar([evBtn('Add &amp; Continue',target==='continue',true),evBtn('Add &amp; Go to Line Items',target==='finish',true)]);
}
function evSearch(sku,focus){
 return '<div class="ev-search-box '+(focus?'ev-target':'')+'" '+(focus?'data-ev-target="true"':'')+'><span>'+sku+'</span><b>⌕</b></div>';
}
function evResult(mode,sku){
 const second=sku==='824758',selected=['selected','quantity','added','final'].includes(mode);
 return '<div class="ev-mini-result"><span class="ev-mini-check '+(selected?'is-checked ':'')+(mode==='selected'?'ev-target':'')+'" '+(mode==='selected'?'data-ev-target="true"':'')+'>'+(selected?'✓':'')+'</span>'+
 '<div class="ev-mini-result-title"><small>Inv # '+(second?'11151':'10856')+' · McKesson</small>'+
 '<strong class="'+(mode==='verify'?'ev-target':'')+'" '+(mode==='verify'?'data-ev-target="true"':'')+'>'+sku+'</strong>'+
 '<span>'+(second?'Triage Troponin-I Test Kit':'Piccolo Comprehensive Metabolic Panel')+'</span></div>'+
 '<div class="ev-mini-pack"><small>UOM</small><strong class="'+(mode==='verify'?'ev-target':'')+'" '+(mode==='verify'?'data-ev-target="true"':'')+'>'+(second?'CT (25)':'BX (10)')+'</strong></div>'+
 '<div class="ev-mini-qty"><small>QTY</small><strong class="'+(mode==='quantity'?'ev-target':'')+'" '+(mode==='quantity'?'data-ev-target="true"':'')+'>'+(second?'1':selected?'2':'')+'</strong></div></div>';
}
function evInventoryBody(mode,sku){
 return evTabs('update')+evInventoryToolbar(mode==='added'?'continue':mode==='final'?'finish':'')+
 evSearch(sku,mode==='search'||mode==='result')+
 '<div class="ev-mini-result-head">Inv #　　　　　　 Vendor Item #　　　　 Description　　　　　　　　　　 UOM / QTY</div>'+
 (mode==='search'?'':evResult(mode,sku));
}
function evSubmitModal(focus){
 return '<div class="ev-modal-back"><div class="ev-modal"><strong>Submit Order Entry</strong>'+
 '<p>Are you sure you want to submit this order? Submit Purchase Order(s) to:</p>'+
 '<span>◯ Draft</span><b class="ev-pending-selected '+(focus==='pending'?'ev-target':'')+'" '+(focus==='pending'?'data-ev-target="true"':'')+'>◉ Pending</b>'+
 '<div><span>Cancel</span><strong class="'+(focus==='submit'?'ev-target':'')+'" '+(focus==='submit'?'data-ev-target="true"':'')+'>Submit</strong></div></div></div>';
}
function visual(which){
 if(which==='purchasing')return evFrame('Dashboard',evDashboard(),'purchasing');
 if(which==='navigation')return evFrame('Dashboard',evDashboard(),'entry');
 if(which==='new')return evFrame('Order Entry',
  evToolbar([evBtn('Add Order Entry',true,true),evBtn('Multiple Orders Entry Upload',false)])+
  '<div class="ev-table-head">OE #　　　　 Reference　　　　　　　 Facility　　　　　　　 Created Date　　　　　 Status</div>'+
  '<div class="ev-table-simple">1442　　　　 KS 10/30　　　　　　　 Hamptons Center　　　 10/30/2026　　　　 Submitted</div>');
 if(['facility','location','department','reference','draft'].includes(which)){
  const toolbar=evToolbar([evBtn('Add',which==='draft',true),evBtn('Cancel',false)]);
  return evFrame('Order Entry · Add Order Entry',toolbar+evForm(which==='draft'?'none':which));
 }
 if(which==='draft-details')return evFrame('Order Entry › Order Entry 1443',evTabs('details')+evToolbar([evBtn('Edit',false,true)])+evOrderDetails('entry'));
 if(which==='line-tab')return evFrame('Order Entry › Order Entry 1443',
  evTabs('items','items')+evToolbar([evBtn('Add Items　⌄',false,true),evBtn('Delete Selected',false),evBtn('Quick Add',false)])+
  '<div class="ev-mini-empty">▤<br><strong>No records found</strong></div>');
 if(which==='open-menu'||which==='menu'){
  return evFrame('Order Entry › Order Entry 1443',evTabs('items')+
   evToolbar([evBtn('Add Items　⌄',which==='open-menu',true),evBtn('Delete Selected',false),evBtn('Quick Add',false)])+
   (which==='menu'?'<div class="ev-dropdown"><span class="ev-target" data-ev-target="true">Add Items from Inventory</span>'+
   '<span>Add Any Items</span><span>Add Items from Template</span><span>Add Items from Recent Orders</span></div>':
   '<div class="ev-mini-empty">▤<br><strong>No records found</strong></div>'));
 }
 if(which==='search')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('search','832497'));
 if(which==='search-result')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('result','832497'));
 if(which==='verify-row')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('verify','832497'));
 if(which==='check-row')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('selected','832497'));
 if(which==='quantity')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('quantity','832497'));
 if(which==='add-continue')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('added','832497'));
 if(which==='continue')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('search','824758'));
 if(which==='add-to-lines')return evFrame('Order Entry › Order Entry 1443',evInventoryBody('final','824758'));
 if(which==='review')return evFrame('Order Entry › Order Entry 1443',evTabs('items')+
  evToolbar([evBtn('Add Items　⌄',false,true),evBtn('Delete Selected',false),evBtn('Quick Add',false)])+evOrderTable('first'));
 if(which==='open-item')return evFrame('Order Entry › Order Entry 1443',evTabs('items')+
  evToolbar([evBtn('Add Items　⌄',false,true)])+
  '<div class="ev-table-head">Line　　　　 Inventory #　　 Vendor SKU　　　 Description　　　　　　　 Qty</div>'+
  '<div class="ev-minimal-open-row"><strong class="ev-target" data-ev-target="true">1</strong><span>10856</span><span>832497</span><span>Piccolo CMP</span><span>2 BX (10)</span></div>'+
  '<div class="ev-minimal-open-row"><strong>2</strong><span>11151</span><span>824758</span><span>Triage Troponin-I</span><span>1 CT (25)</span></div>');
 if(which==='edit'||which==='save-edit')return evFrame('Order Entry › Order Entry 1443',evTabs('items')+
  evToolbar([evBtn(which==='save-edit'?'Update':'Edit',true,true),evBtn('Cancel',false)])+
  '<div class="ev-detail-grid"><span>Inventory #</span><strong>10856</strong><span>Vendor Item #</span><strong>832497</strong></div>'+
  '<div class="ev-mini-form ev-mini-form-edit">'+evField('Order Quantity *','2',which==='edit',false)+'</div><small>UOM　BX (10)</small>');
 if(which==='details-tab')return evFrame('Order Entry › Order Entry 1443',evTabs('details','details')+
  evToolbar([evBtn('Edit',false,true),evBtn('Submit to PO',false,true)])+evOrderDetails());
 if(which==='submit')return evFrame('Order Entry › Order Entry 1443',evTabs('details')+
  evToolbar([evBtn('Edit',false,true),evBtn('Submit to PO',true,true)])+evOrderDetails());
 if(which==='pending')return evFrame('Order Entry › Order Entry 1443',evTabs('details')+evSubmitModal('pending'));
 if(which==='submit-confirm')return evFrame('Order Entry › Order Entry 1443',evTabs('details')+evSubmitModal('submit'));
 if(which==='record-number')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustration only, not a live confirmation">'+
  '<div class="ev-handoff-po"><small>ENVI · ORDER ENTRY</small><strong>Entry number</strong><b>1443 · Example</b><span>Record the actual order entry number.</span></div>'+
  '<div class="ev-handoff-connect">→</div>'+
  '<div class="ev-handoff-po"><small>PURCHASE ORDER</small><strong>PO number</strong><b class="ev-target" data-ev-target="true">[Actual PO #]</b><span>Verify the generated PO and status.</span></div></div>';
 if(which==='notify')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustrative notification checklist">'+
  '<div class="ev-handoff-po"><small>MARKET DEPENDENT</small><strong>Lab Inventory group</strong>'+
  '<span>Send the order number using the approved channel.</span>'+
  '<div class="ev-notification-example"><b>Clinic</b><span>[Clinic name]</span>'+
  '<b>PO #</b><span class="ev-target" data-ev-target="true">[Actual PO number]</span></div></div></div>';
 if(which==='sheet')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustrative spreadsheet only">'+
  '<div class="ev-demo-tracker"><div class="ev-demo-tracker-top"><strong>ORDER TRACKER</strong><small>LOCAL FORMAT MAY VARY</small></div>'+
  '<div class="ev-demo-tracker-table"><b>Date</b><b>Clinic</b><b>Order #</b><b>Status</b>'+
  '<span>[Date]</span><span>[Clinic]</span><span class="ev-target" data-ev-target="true">[PO #]</span><span>Pending</span></div>'+
  '<p>Complete the local tracker if required by your market.</p></div></div>';
 return evFrame('Order Entry',evOrderDetails());
}

function renderStep(s,i){
 return '<article class="ev-step" data-ev-card="'+i+'" '+(mode==='guided'&&index!==i?'hidden':'')+'>'+
 '<div class="ev-card-top"><span class="ev-step-number">'+String(i+1).padStart(2,'0')+'</span><div class="ev-card-heading"><span class="ev-step-phase">'+s.phase+'</span><h2>'+tag(s.title)+'</h2></div>'+
 '<div class="ev-card-controls"><span class="ev-required-tag ev-kind-'+s.kind+'">'+({optional:'IF NEEDED',repeat:'REPEAT AS NEEDED',branch:'CHOOSE ONE',market:'MARKET DEPENDENT'}[s.kind]||'ACTION REQUIRED')+'</span>'+
 (mode==='guided'?'<nav class="ev-card-nav" role="group" aria-label="Envi ordering step navigation"><button type="button" class="ev-prev" data-ev-step="'+Math.max(0,i-1)+'" '+(i===0?'disabled':'')+' aria-label="Previous step">‹ Previous</button><button type="button" class="ev-next" data-ev-step="'+Math.min(steps.length-1,i+1)+'" '+(i===steps.length-1?'disabled':'')+' aria-label="Next step">Next step ›</button></nav>':'')+'</div></div>'+
 '<p class="ev-step-description">'+s.body+'</p><div class="ev-illustration"><div class="ev-illustration-title"><span class="ev-illustration-dot"></span> ENVI SCREEN REFERENCE <small>Illustrated, not a live screen</small><button type="button" class="ev-zoom-trigger" data-ev-zoom="'+i+'" aria-label="Expand Envi illustration for step '+(i+1)+'">Expand screen ↗</button></div>'+visual(s.scene)+'</div>'+
 '<div class="ev-next-action"><span class="ev-action-icon">➜</span><strong>'+tag(s.action)+'</strong></div>'+
 '<div class="ev-card-note"><span class="ev-note-symbol">i</span><span>'+s.note+'</span></div></article>';
}
function render(){
 return '<section id="envi-ordering-guide" class="envi-guide" aria-labelledby="ev-heading">'+
 '<header class="ev-header"><div><span class="ev-eyebrow">LAB OPERATIONS / INVENTORY PURCHASING</span><h1 id="ev-heading">Envi Ordering</h1><p>Create an order entry, add inventory items, verify quantities and submit purchase orders as <strong>Pending</strong>.</p></div><span class="ev-app-badge"><span>e</span> envi · ORDER ENTRY</span></header>'+
 '<div class="ev-overview"><div><strong>START</strong><span>Purchasing<br>Order Entry</span></div><b>›</b><div><strong>SET UP</strong><span>Facility &amp;<br>reference</span></div><b>›</b><div><strong>BUILD</strong><span>Add inventory<br>items</span></div><b>›</b><div><strong>REVIEW</strong><span>Check item<br>quantities</span></div><b>›</b><div><strong>SUBMIT</strong><span>Pending &amp;<br>market handoff</span></div></div>'+
 '<div class="ev-guide-toolbar"><div class="ev-guide-toolbar-label"><strong>Step-by-step instructions</strong><span>'+steps.length+' visual steps · Screens recreated from the supplied Envi workflow</span></div><div class="ev-mode-control" role="group" aria-label="Choose guide view"><button type="button" data-ev-mode="guided" aria-pressed="'+(mode==='guided')+'" class="'+(mode==='guided'?'ev-mode-on':'')+'">One step at a time</button><button type="button" data-ev-mode="all" aria-pressed="'+(mode==='all')+'" class="'+(mode==='all'?'ev-mode-on':'')+'">View all steps</button></div></div>'+
 '<div class="ev-step-map-heading"><strong>Jump to any step</strong><small>Choose a number to open that screen</small></div><div class="ev-jump-strip" aria-label="Jump to a step">'+steps.map(function(s,i){return '<button type="button" data-ev-step="'+i+'" class="'+(i===index?'ev-current-step':'')+'" '+(i===index?'aria-current="step"':'')+' title="'+tag(s.title)+'">'+String(i+1).padStart(2,'0')+'</button>';}).join('')+'</div>'+
 '<div class="ev-step-viewport">'+steps.map(renderStep).join('')+'</div>'+

 '<dialog id="evScreenZoom" class="ev-screen-zoom" aria-label="Expanded Envi screen illustration"><div class="ev-screen-zoom-header"><div><small>ENVI SCREEN REFERENCE</small><strong id="evScreenZoomTitle">Illustrated step</strong></div><button type="button" data-ev-close-zoom>Close ×</button></div><div class="ev-screen-zoom-content"></div><p class="ev-screen-zoom-foot">Training illustration, not a live Envi screen. Follow the highlighted action in the actual application.</p></dialog>'+
 '<aside class="ev-final-note"><strong>Before closing the order</strong><p>Confirm the correct clinic and order reference, all quantities and units of measure, Pending submission, and any market-specific inventory notification or spreadsheet entry.</p><small>Training reference only. Envi permissions, approval rules and market requirements may vary. This page does not submit an order or save inventory data.</small></aside>'+
 '</section>';
}
function compactSop(){
 var E=tag;
 var h='<div class="lc-sop-document"><header class="lc-sop-header"><div class="lc-sop-eyebrow">LAB CENTRAL / LAB OPERATIONS</div><h1>Envi Ordering · Order Entry to Pending PO</h1><p>Inventory purchasing workflow with item-by-item review and market-dependent follow-up.</p><div class="lc-sop-meta"><span><b>System</b> Envi · Purchasing</span><span><b>Submit status</b> Pending</span><span><b>Scope</b> Clinic supply orders</span></div></header>';
 steps.forEach(function(s,i){
  h+='<article class="lc-sop-step"><div class="lc-sop-step-top"><span class="lc-sop-index">'+String(i+1).padStart(2,'0')+'</span><h3>'+E(s.title)+'</h3><span class="lc-sop-owner">'+E(s.phase)+'</span></div><div class="lc-sop-step-body"><p>'+s.body+'</p><p><strong>Action:</strong> '+E(s.action)+'</p><p><em>'+s.note+'</em></p></div></article>';
  if(s.scene==='add-continue')h+='<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>More items to order?</strong><span>SELECT ONE PATH</span></div><div class="lc-sop-branches"><div class="lc-sop-branch"><span class="lc-sop-branch-label">YES</span><div>Use Add &amp; Continue. Repeat search, item selection, and quantity entry for each additional SKU.</div></div><div class="lc-sop-branch"><span class="lc-sop-branch-label">NO</span><div>Use Add &amp; Go to Line Items, or open Line Items, and review the complete order.</div></div></div></div>';
  if(s.scene==='review')h+='<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>Any incorrect quantity or item?</strong><span>SELECT ONE PATH</span></div><div class="lc-sop-branches"><div class="lc-sop-branch"><span class="lc-sop-branch-label">YES</span><div>Open line item, click Edit, correct quantity, Update, and review again.</div></div><div class="lc-sop-branch"><span class="lc-sop-branch-label">NO</span><div>Go to Details and choose Submit to PO.</div></div></div></div>';
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
 var zoom=event.target.closest('[data-ev-zoom]');
 var closer=event.target.closest('[data-ev-close-zoom]');
 var dialog=document.getElementById('evScreenZoom');
 if(closer&&dialog){dialog.close();return;}
 if(!zoom||!zoom.closest('#envi-ordering-guide')||!dialog)return;
 var card=zoom.closest('.ev-step');
 var shot=card&&card.querySelector('.ev-illustration .ev-mini-screen,.ev-illustration .ev-handoff-picture');
 if(!shot)return;
 dialog.querySelector('#evScreenZoomTitle').textContent=card.querySelector('h2')?.textContent||'Envi screen';
 dialog.querySelector('.ev-screen-zoom-content').innerHTML=shot.outerHTML;
 dialog.showModal();
});
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
 var oldHeader=old&&old.querySelector('.ev-step:not([hidden]) .ev-card-top');
 var anchorTop=oldHeader?oldHeader.getBoundingClientRect().top:null;
 refresh(old);
 if(mode==='guided'&&anchorTop!==null){
  var nextHeader=document.querySelector('#envi-ordering-guide .ev-step:not([hidden]) .ev-card-top');
  if(nextHeader){
   // Keep the header navigation at the same screen position as the staff advances.
   var offset=nextHeader.getBoundingClientRect().top-anchorTop;
   if(Math.abs(offset)>1)window.scrollBy({top:offset,left:0,behavior:'instant'});
  }
 }
});
window.LAB_ENVI_ORDERING={render:render,compactSop:compactSop};
})();
