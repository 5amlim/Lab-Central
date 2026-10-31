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
function mark(v){return '<span class="ev-focus">'+v+'</span>';}
function field(label,value,active){return '<div class="ev-field '+(active?'ev-field-active':'')+'"><span>'+label+'</span><strong>'+value+'</strong><i aria-hidden="true">⌄</i></div>';}
function topbar(){return '<div class="ev-mini-top"><b class="ev-mini-brand">envi</b><span>⌕　☷　◷　?</span></div>';}
function sidebar(active){return '<aside class="ev-mini-sidebar"><span>▤　Dashboard</span><strong>🛒　Purchasing</strong><small>Purchasing Dashboard</small><small>Purchase Orders</small><small class="'+(active?'ev-nav-active':'')+'">Order Entry</small><small>Standing PO</small></aside>';}
function frame(title,inner,active){return '<div class="ev-mini-screen" aria-hidden="true">'+topbar()+'<div class="ev-mini-screen-content">'+sidebar(active!==false)+'<div class="ev-mini-main"><div class="ev-mini-crumb">'+title+'<span>▣ Sollis Health</span></div>'+inner+'</div></div><div class="ev-mini-foot">Envi · Training illustration</div></div>';}
function tabs(which){return '<div class="ev-tabs"><span class="'+(which==='details'?'ev-tab-active':'')+'">Details</span><span class="'+(which==='items'?'ev-tab-active':'')+'">Line Items</span><span class="'+(which==='update'?'ev-tab-active':'')+'">Update</span><span>Resources</span></div>';}
function rowline(second,edit){return '<div class="ev-table-row"><span>☑</span><span>'+(second?'2':'1')+'</span><span>'+(second?'11151':'10856')+'</span><span>McKesson</span><span>'+(second?'824758':'832497')+'</span><span class="ev-item-description">'+(second?'Triage Troponin-I Kit':'Piccolo Comprehensive Metabolic Panel')+'</span><b class="'+(edit?'ev-highlight':'')+'">'+(second?'1 CT (25)':'2 BX (10)')+'</b></div>';}

/* An individual, task-focused screen for every action, modeled on the supplied Envi screens. */
function evScreenHead(active){return tabs(active);}
function evToolbar(btn,selected){return '<div class="ev-mini-toolbar"><span class="'+(selected?'ev-mini-target ev-blue-pill':'ev-blue-pill')+'">'+btn+'</span><span>Cancel</span></div>';}
function evItemResult(mode){
 const checked=mode==='selected'||mode==='quantity'||mode==='add';
 const focused=mode==='verify'?'ev-mini-target':mode==='selected'?'ev-mini-check-target':mode==='quantity'?'ev-mini-qty-target':'';
 return '<div class="ev-mini-result '+focused+'"><span class="ev-mini-check '+(checked?'is-checked':'')+'">'+(checked?'✓':'')+'</span>'+
 '<div class="ev-mini-result-title"><small>Inv # 10856　·　McKesson</small><strong>832497</strong><span>Piccolo Comprehensive Metabolic Panel (10/BX)</span><small>Manufacturer item 07P0208</small></div>'+
 '<div class="ev-mini-pack"><small>UOM</small><strong>BX (10)</strong></div>'+
 '<div class="ev-mini-qty '+(mode==='quantity'?'ev-mini-target':'')+'"><small>QTY</small><strong>'+(mode==='quantity'||mode==='add'?'2':'')+'</strong></div></div>';
}
function evToolbarAdd(active){
 return '<div class="ev-mini-toolbar"><span class="ev-blue-pill '+(active==='continue'?'ev-mini-target':'')+'">Add &amp; Continue</span>'+
 '<span class="ev-blue-pill '+(active==='finish'?'ev-mini-target':'')+'">Add &amp; Go to Line Items</span></div>';
}
function evOrderDetails(extra){
 return '<div class="ev-mini-detail-list"><div><small>Order Entry #</small><strong>1443</strong></div><div><small>Facility</small><strong>Beverly Hills Flagship</strong></div>'+
 '<div><small>Location</small><strong>Order Entry</strong></div><div><small>Department</small><strong>None</strong></div>'+
 '<div><small>Reference</small><strong>BH Lab [Initials] 10/30</strong></div><div><small>Status</small><strong class="ev-mini-draft">Draft</strong></div></div>'+ (extra||'');
}
function visualDetail(which){
 if(which==='purchasing')return frame('Dashboard',
   '<div class="ev-mini-task-label">LEFT SIDEBAR · PURCHASING</div><div class="ev-mini-navigation-enlarged"><div>Dashboard</div>'+
   '<div>Organization</div><div>Inventory</div><div class="ev-mini-target">🛒 Purchasing <span>⌃</span></div>'+
   '<div class="ev-mini-nav-child">Purchasing Dashboard</div><div class="ev-mini-nav-child">Purchase Orders</div>'+
   '<div class="ev-mini-nav-child">Order Entry</div></div><div class="ev-mini-callout">CLICK PURCHASING TO EXPAND</div>',false);
 if(which==='facility')return frame('Add Order Entry',
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add</span><span>Cancel</span></div>'+
   '<div class="ev-mini-form">'+field('Facility *',mark('Beverly Hills Flagship'),true)+
   '<div class="ev-mini-select-pop"><span>Select Facility</span><strong>✓ Beverly Hills Flagship</strong><span>Other clinics …</span></div>'+
   field('Location *','Select Location',false)+field('Department','Select Department',false)+field('Reference','',false)+'</div>',true);
 if(which==='location')return frame('Add Order Entry',
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add</span><span>Cancel</span></div>'+
   '<div class="ev-mini-form">'+field('Facility *','Beverly Hills Flagship',false)+field('Location *',mark('Order Entry'),true)+
   '<div class="ev-mini-select-pop"><span>Select Location</span><strong>✓ Order Entry</strong></div>'+
   field('Department','None',false)+field('Reference','',false)+'</div>',true);
 if(which==='department')return frame('Add Order Entry',
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add</span><span>Cancel</span></div>'+
   '<div class="ev-mini-form">'+field('Facility *','Beverly Hills Flagship',false)+field('Location *','Order Entry',false)+
   field('Department',mark('None'),true)+field('Reference','',false)+'</div>'+
   '<span class="ev-mini-callout">OPTIONAL · VERIFY LOCAL REQUIREMENT</span>',true);
 if(which==='reference')return frame('Add Order Entry',
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add</span><span>Cancel</span></div>'+
   '<div class="ev-mini-form">'+field('Facility *','Beverly Hills Flagship',false)+field('Location *','Order Entry',false)+
   field('Department','None',false)+field('Reference',mark('BH Lab [Initials] 10/30'),true)+'</div>'+
   '<span class="ev-mini-callout">USE MARKET NAMING CONVENTION</span>',true);
 if(which==='draft-details')return frame('Order Entry › Order Entry 1443',
   evScreenHead('details')+ '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Edit</span></div>'+evOrderDetails('<span class="ev-mini-callout">DRAFT ENTRY · NOT YET A PO</span>'),true);
 if(which==='line-tab')return frame('Order Entry › Order Entry 1443',
   '<div class="ev-tabs"><span>Details</span><span class="ev-tab-active ev-mini-target">Line Items</span><span>Update</span><span>Resources</span></div>'+
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add Items ⌄</span><span>Delete Selected</span><span>Quick Add</span></div>'+
   '<div class="ev-mini-empty">▤<br><strong>No records found</strong><span>Add items to build your order.</span></div>',true);
 if(which==='open-menu')return frame('Order Entry › Order Entry 1443',
   evScreenHead('items')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill ev-mini-target">Add Items　⌄</span><span>Delete Selected</span><span>Quick Add</span></div>'+
   '<div class="ev-mini-empty">▤<br>No records found</div>',true);
 if(which==='search-result')return frame('Order Entry › Order Entry 1443',
   evScreenHead('update')+evToolbarAdd('')+
   '<div class="ev-search-box"><strong>832497</strong><span class="ev-mini-target">⌕</span></div>'+
   '<div class="ev-mini-result-head">☐　Inv #　　　　　 Vendor Item #　　　 Description　　　　　　　　 QTY</div>'+
   evItemResult('normal')+'<span class="ev-mini-callout">1 MATCH FOUND · VERIFY BEFORE SELECTING</span>',true);
 if(which==='verify-row')return frame('Order Entry › Order Entry 1443',
   evScreenHead('update')+evToolbarAdd('')+
   '<div class="ev-search-box">832497 <span>⌕</span></div>'+
   '<div class="ev-mini-result-head">☐　Inv #　　　　　 Vendor Item #　　　 Description　　　　　　　　 QTY</div>'+
   evItemResult('verify')+'<div class="ev-mini-verification-tags"><span>✓ Vendor</span><span>✓ SKU</span><span>✓ Description</span><span>✓ UOM</span></div>',true);
 if(which==='check-row')return frame('Order Entry › Order Entry 1443',
   evScreenHead('update')+evToolbarAdd('')+
   '<div class="ev-search-box">832497 <span>⌕</span></div>'+
   evItemResult('selected')+'<div class="ev-mini-callout">CHECK THE MATCHING ITEM</div>',true);
 if(which==='add-continue')return frame('Order Entry › Order Entry 1443',
   evScreenHead('update')+evToolbarAdd('continue')+
   '<div class="ev-search-box">832497 <span>⌕</span></div>'+
   evItemResult('add')+'<div class="ev-mini-callout">SAVE ITEM &amp; STAY IN SEARCH</div>',true);
 if(which==='add-to-lines')return frame('Order Entry › Order Entry 1443',
   evScreenHead('update')+evToolbarAdd('finish')+
   '<div class="ev-search-box">824758 <span>⌕</span></div>'+
   '<div class="ev-mini-result ev-mini-finish-row"><span class="ev-mini-check is-checked">✓</span><div class="ev-mini-result-title"><small>Inv # 11151 · McKesson</small><strong>824758</strong><span>Triage Troponin-I Test Kit</span></div><div class="ev-mini-pack">CT (25)</div><div class="ev-mini-qty">1</div></div>'+
   '<div class="ev-mini-callout">LAST ITEM → GO TO LINE ITEMS</div>',true);
 if(which==='open-item')return frame('Order Entry › Order Entry 1443',
   evScreenHead('items')+'<div class="ev-mini-toolbar"><span class="ev-blue-pill">Add Items ⌄</span><span>Quick Add</span></div>'+
   '<div class="ev-table-head">Line　Inv #　Vendor　　 SKU　　 Description　　　　　　　　　QTY</div>'+
   '<div class="ev-mini-open-line ev-mini-target"><strong>01</strong><span>10856</span><span>832497</span><span>Piccolo CMP (10/BX)</span><b>2 BX (10)</b></div>'+
   '<div class="ev-mini-open-line"><strong>02</strong><span>11151</span><span>824758</span><span>Triage TnI (25/CT)</span><b>1 CT (25)</b></div>'+
   '<div class="ev-mini-callout">OPEN ONLY AN ITEM NEEDING CORRECTION</div>',true);
 if(which==='save-edit')return frame('Order Entry › Order Entry 1443',
   evScreenHead('items')+'<div class="ev-mini-toolbar"><span>← Back</span><span class="ev-blue-pill ev-mini-target">Update</span><span>Cancel</span></div>'+
   '<div class="ev-detail-grid"><span>Line Item</span><strong>1</strong><span>Vendor SKU</span><strong>832497</strong></div>'+
   '<div class="ev-mini-form ev-mini-form-edit">'+field('Order Quantity *','2',true)+'<small>UOM　BX (10)</small></div>'+
   '<div class="ev-mini-callout">UPDATE, THEN RECHECK LINE ITEMS</div>',true);
 if(which==='details-tab')return frame('Order Entry › Order Entry 1443',
   '<div class="ev-tabs"><span class="ev-tab-active ev-mini-target">Details</span><span>Line Items</span><span>Update</span><span>Resources</span></div>'+
   '<div class="ev-mini-toolbar"><span class="ev-blue-pill">Edit</span><span class="ev-blue-pill">Submit to PO</span></div>'+
   evOrderDetails(),true);
 if(which==='submit-confirm')return frame('Order Entry › Order Entry 1443',
   evScreenHead('details')+'<div class="ev-modal-back"><div class="ev-modal"><strong>Submit Order Entry</strong>'+
   '<p>Submit Purchase Order(s) to:</p><span>◯ Draft</span><b class="ev-pending-selected">◉ Pending</b>'+
   '<div><span>Cancel</span><strong class="ev-mini-target">Submit</strong></div></div></div>',true);
 if(which==='record-number')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustrated order-number handoff, not a live confirmation"><div class="ev-handoff-po"><small>ORDER REFERENCE</small><strong>Order Entry #</strong><b>1443 · Example only</b><span>Find the resulting purchase-order number in Envi.</span></div><div class="ev-handoff-connect">→</div><div class="ev-handoff-po"><small>RESULTING ORDER</small><strong>PO #</strong><b>Record actual generated number</b><span>Confirm Pending status in Envi.</span></div></div>';
 if(which==='notify')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustrative notification checklist"><div class="ev-handoff-po"><small>MARKET DEPENDENT</small><strong>Lab Inventory group</strong><span>Send order reference or PO number(s) using the approved channel.</span><div class="ev-notification-example"><b>Clinic</b><span>[Clinic name]</span><b>PO #</b><span>[Actual PO number]</span></div></div></div>';
 if(which==='sheet')return '<div class="ev-handoff-picture ev-handoff-reference" aria-label="Illustrative inventory spreadsheet, not real tracking data"><div class="ev-demo-tracker"><div class="ev-demo-tracker-top"><strong>ORDER TRACKER</strong><small>EXAMPLE FORMAT · LOCAL SHEET MAY VARY</small></div><div class="ev-demo-tracker-table"><b>Date</b><b>Clinic</b><b>Order #</b><b>Status</b><span>[Date]</span><span>[Clinic]</span><span>[PO #]</span><span>Pending</span></div><p>Complete the designated spreadsheet only if required by your market.</p></div></div>';
 return '';
}

function visual(which){
  var custom=visualDetail(which);if(custom)return custom;
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
 '<div class="ev-card-top"><span class="ev-step-number">'+String(i+1).padStart(2,'0')+'</span><div class="ev-card-heading"><span class="ev-step-phase">'+s.phase+'</span><h2>'+tag(s.title)+'</h2></div><span class="ev-required-tag ev-kind-'+s.kind+'">'+({optional:'IF NEEDED',repeat:'REPEAT AS NEEDED',branch:'CHOOSE ONE',market:'MARKET DEPENDENT'}[s.kind]||'ACTION REQUIRED')+'</span></div>'+
 '<p class="ev-step-description">'+s.body+'</p><div class="ev-illustration"><div class="ev-illustration-title"><span class="ev-illustration-dot"></span> ENVI SCREEN REFERENCE <small>Illustrated, not a live screen</small></div>'+visual(s.scene)+'</div>'+
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
 '<nav class="ev-transport" aria-label="Guide step navigation"><span>STEP <strong>'+String(index+1).padStart(2,'0')+' / '+steps.length+'</strong></span><div><button type="button" data-ev-step="'+Math.max(0,index-1)+'" '+(index===0?'disabled':'')+'>‹ Previous</button><button type="button" data-ev-step="'+Math.min(steps.length-1,index+1)+'" '+(index===steps.length-1?'disabled':'')+'>Next step ›</button></div></nav>'+
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
