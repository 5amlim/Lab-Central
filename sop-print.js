/* Lab Central SOP print generator. Print reference, not a substitute for approved SOP/IFU. */
(function(){
'use strict';
const E=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function labList(useOrdersMarket=false){const market=window.LAB_MARKET?.get()||(useOrdersMarket?document.querySelector('[data-orders-market-value]')?.dataset.ordersMarketValue:null);return market==='ny'?'Quest Diagnostics or LabCorp':'Quest Diagnostics, LabCorp, Cedars, HealthTrackRx or PathMD';}
function section(title,subtitle){return '<div class="lc-sop-section"><h2>'+E(title)+'</h2>'+(subtitle?'<p>'+E(subtitle)+'</p>':'')+'</div>';}
function step(title,body,role,num){
 return '<article class="lc-sop-step"><div class="lc-sop-step-top"><span class="lc-sop-index">'+String(num||'').padStart(2,'0')+'</span><h3>'+E(title)+'</h3>'+(role?'<span class="lc-sop-owner">'+E(role)+'</span>':'')+'</div><div class="lc-sop-step-body">'+body+'</div></article>';
}
function bullet(...items){return '<ul class="lc-sop-bullets">'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';}
function note(title,text,urgent){return '<aside class="lc-sop-note'+(urgent?' lc-sop-urgent':'')+'"><strong>'+E(title)+'</strong><p>'+text+'</p></aside>';}
function fork(question,choices){
 return '<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>'+E(question)+'</strong><span>SELECT ONE PATH</span></div><div class="lc-sop-branches">'+choices.map(c=>'<div class="lc-sop-branch"><span class="lc-sop-branch-label">'+E(c[0])+'</span><div>'+c[1]+'</div></div>').join('')+'</div></div>';
}
function header(title,subtitle,scope,owner){
 return '<header class="lc-sop-header"><div class="lc-sop-eyebrow">LAB CENTRAL <span> / </span> LAB OPERATIONS</div><h1>'+E(title)+'</h1><p>'+E(subtitle)+'</p><div class="lc-sop-meta"><span><b>Applies to</b> '+E(scope)+'</span><span><b>Roles</b> '+E(owner)+'</span><span><b>Document</b> Procedure reference</span></div></header>';
}
function finish(extra){
 return (extra||'')+'<footer class="lc-sop-footer">Internal lab operations reference. Follow the current approved SOP, manufacturer instructions, receiving-lab requirements, and site-specific procedures. For decisions, complete only the applicable pathway.</footer>';
}
function handoff(start){
 const steps=[
 ['Collect specimens', 'RN / Collector',bullet('Use the LAB FLOWSHEET for <b>tubes, volumes and order of draw</b>.','Label every tube with patient identifiers, collection <b>date, time and collector initials</b>.','Collect all required specimen types.')],
 ['Document and hand off','RN',bullet('Document in Athena using the approved <b>.rn</b> workflow.','Hand off labeled specimens, requisition and LAB FLOWSHEET to lab personnel.')],
 ['Process specimens','Lab personnel',bullet('Verify all labels against the requisition and chart.','Follow the LAB FLOWSHEET for centrifugation, aliquoting, temperature and special handling; confirm using the current lab directory.')],
 ['Separate transport bags','Lab personnel',bullet('Use <b>separate bags by receiving lab and temperature</b>: room temperature, refrigerated and frozen.','Keep STAT and routine or special-handling requests separated when required; include appropriate paperwork in the bag sleeve.')],
 ['Check billing paperwork','Lab personnel',bullet('Confirm insurance information is included with the requisition.','<b>If insurance information is missing,</b> attach the patient facesheet.')],
 ['Complete the Sendout Log','Lab personnel',bullet('Photograph labeled specimens, requisition and each transport bag as required.','Scan the QR code for the correct regional Microsoft Form and complete the Sendout Log, including pickup confirmation or UPS/FedEx tracking when applicable.')],
 ['Place bags for pickup','Lab personnel',bullet('Use the appropriate cold or frozen sleeve as needed, following the Lab Calculator printout and receiving-lab requirements.','For lockbox pickup, place sealed bags in the designated lockbox.','For pickup inside the lab, place sealed bags in the correct receiving-lab collection bin. Place refrigerated bags in the refrigerator and frozen bags in the freezer as needed.','For special courier pickups and UPS/FedEx kits, follow the site-specific approved handoff procedure.')]
 ];
 const market=window.LAB_MARKET?.get()||document.querySelector('[data-orders-market-value]')?.dataset.ordersMarketValue||(document.querySelector('[data-norcal-pickup]')?'norcal':null);
 if(market==='norcal')steps.push(['Confirm specimen pickup','Front Desk Coordinator',bullet(
  'Once pickup has been scheduled, react with a ⏰ to each corresponding entry in the <b>NoCal Sendout Log</b> group chat.',
  'Once specimens have been picked up, react with a ✅ to each corresponding entry in the <b>NoCal Sendout Log</b> group chat.',
  'Post a separate message in the same group chat confirming the receiving lab or courier pickup, e.g., “Quest has been picked up.” or “Labcorp has been picked up.”',
  'Do not mark any entry as picked up until pickup is confirmed.'
 )]);
 return section('Specimen collection, processing and handoff','Required after the order and collection plan are ready.')+steps.map((v,i)=>step(v[0],v[2],v[1],i+(start||1))).join('');
}
function scheduled(){
 let h=header('External requisition · Scheduled','Compact workflow for outside requisitions, Athena documentation, scheduling, specimen collection and sendout.','Scheduled external laboratory requests','Front Desk Coordinator · Lab Personnel / RN · Triage Provider');

 h+=section('Optional · Obtain the requisition','Only when a member calls before their outside requisition arrives.');
 h+=note('Already have the requisition? Skip this intake','When orders arrive directly by email, text or fax, begin at Step 01. Front Desk phone intake is not required.');
 h+=fork('Does the member already have lab orders?',[
  ['Yes',bullet(
   'Ask the member to email their orders to the <b>approved regional intake email</b> for clinical review.',
   '<b>Do not offer or confirm an appointment time</b> until clinical review is complete.',
   '<b>Suggested wording:</b> “Please email your lab orders to the regional address provided by our team. We will contact you after clinical review to discuss scheduling.”')],
  ['No',bullet(
   'A Sollis provider may assess the member and order labs when clinically appropriate.',
   'If Sollis places the orders, use the <b>Ordered at Sollis</b> workflow instead.')]
 ]);

 h+=section('01 · Receive, classify and route the requisition','Front Desk Coordinator. Follow only the arrival method that applies.');
 h+=fork('How was the requisition received?',[
  ['Email or text',bullet(
   '<b>i. Upload manually:</b> Open the existing Navigator task and upload the requisition to the correct Athena patient chart. It is not automatically uploaded.',
   '<b>ii. Classify and label:</b> Set <b>Clinical Document</b>, label <b>LAB REQUISITION</b>, then save and verify.')],
  ['Faxed to Sollis',bullet(
   '<b>i. Verify:</b> Locate the automatically uploaded fax in the correct patient chart. Confirm its patient identifiers and current classification.',
   '<b>ii. Reclassify and label:</b> Set <b>Clinical Document</b>, label <b>LAB REQUISITION</b>, then save and verify. Do not upload a duplicate.')]
 ]);
 h+=note('Required for both intake paths',[
  '<b>iii. Internal Note:</b> Open each saved LAB REQUISITION and enter <b>(1 of 1)</b> even when there is only one file. For multiple active requisitions, use <b>(1 of N), (2 of N)</b>, etc., with the same total.',
  '<b>iv. Navigator task:</b> Assign to <b>Lab Personnel / RN</b> for review <b>before scheduling</b>. Use the existing task; for an auto-uploaded fax, create one only if needed. Do not create a duplicate.'
 ].join('<br>'),true);

 h+=section('Additional or updated requisitions','Keep the active Athena documents and Internal Notes synchronized.');
 h+=bullet(
  'Count <b>current, unique</b> requisitions. Exclude exact duplicates and versions replaced by corrected orders.',
  'Upload and classify new requisitions as <b>Clinical Document · LAB REQUISITION</b>. Do not duplicate an auto-uploaded fax.',
  '<b>Update every previous Internal Note</b> when the number of active requisitions changes. Example: change (1 of 1) to <b>(1 of 2)</b> and number the new file <b>(2 of 2)</b>.',
  'Handle replaced or duplicate documents under the approved correction and retention process. Verify the final numbered set and notify the lab team.'
 );

 h+=step('Review the requisition',bullet(
  'Confirm patient name and DOB, receiving lab, exact tests and <b>test codes</b>, <b>account number</b>, current requisition version and collection/preparation requirements.',
  'Confirm test availability and any restrictions before proceeding.'
 ),'Lab Personnel / RN',2);
 h+=fork('Are the account number and test codes available?',[
  ['Yes',bullet('Continue to Step 03 and prepare the Lab Calculator.')],
  ['No or incomplete',bullet(
   '<b>Lab Personnel / RN calls the ordering provider’s office</b> for missing information.',
   '<b>If obtained:</b> Upload the corrected requisition as <b>Clinical Document · LAB REQUISITION</b>, reconcile the active file set and Internal Notes, then continue.',
   '<b>If unavailable:</b> Ask the <b>Sollis provider on duty</b> to place the required orders in Athena. Do not collect until orders are in place.')]
 ]);

 h+=section('03–05 · Prepare, hand off and schedule','Complete the required Athena documents before scheduling.');
 h+=step('Prepare and upload the Lab Calculator',bullet(
  '<b>i. Review and save:</b> Confirm the receiving lab, tests, specimen needs and preparation restrictions. Save as a PDF.',
  '<b>ii. Upload:</b> Add the saved PDF to the correct patient chart in Athena.',
  '<b>iii. Classify and label:</b> Classify as <b>Clinical Document</b>, label as <b>LAB FLOWSHEET</b>, then save and verify.',
  '<b>iv. Count tests:</b> Count each ordered test across all current requisitions, <b>not the number of files</b>.'
 ),'Lab Personnel / RN',3);
 h+=note('Preparation handoff · Required for both routes','<b>Lab Personnel / RN informs both Front Desk and Clinical Triage</b> of all fasting, dietary, timed-draw or other preparation restrictions.');
 h+='<div class="lc-sop-volume-routing"><div class="lc-sop-volume-heading">AFTER UPLOAD · ROUTE BY INDIVIDUAL TEST COUNT</div><div class="lc-sop-volume-grid">'+
  '<div class="lc-sop-volume-card lc-sop-volume-standard"><div class="lc-sop-volume-count">≤ 15 <span>TESTS</span></div><strong>Send to Front Desk for scheduling</strong></div>'+
  '<div class="lc-sop-volume-card lc-sop-volume-triage"><div class="lc-sop-volume-count">≥ 16 <span>TESTS</span></div><strong>Assign the Navigator task to Clinical Triage</strong></div>'+
  '</div></div>';
 h+=note('Triage Provider · Required for 16 or more tests','Before scheduling, discuss the increased risk of ordering, collection or processing errors with the patient. Return the request and preparation instructions to Front Desk. <b>Suggested wording:</b> “Your order includes more than 15 lab tests, which increases the chance of an error during ordering, collection, or processing. We would like to review this with you before scheduling.”',true);
 h+=step('Schedule the patient','<p>Once the required handoff is complete, Front Desk schedules the appointment and communicates any <b>fasting, dietary, timed-draw, or other preparation restrictions</b>.</p>','Front Desk Coordinator',4);
 h+=step('On the appointment day, print both documents',bullet(
  'Before collection, print each current <b>LAB REQUISITION</b> and the <b>LAB FLOWSHEET</b> from the chart.',
  'Open the Lab Calculator using <b>View Original Image</b> to preserve color-coded tube and bag instructions.'
 ),'Lab Personnel / RN',5);

 h+=handoff(6);
 h+=note('Collection gate','Do not collect until the required Athena orders, active requisitions and LAB FLOWSHEET are complete and verified.',true);
 return h+finish();
}
function nyScheduled(){
 let h=header('External requisition · Scheduled · New York','NY-only process for outside-physician lab draw requests, from intake and approval through collection and results routing.','New York scheduled non-Sollis provider requests','Front Desk Coordinator · NY Lab/Rad Tech · RN · Provider');
 h+=note('Three important New York distinctions','<b>Outside orders are not entered as Athena laboratory orders.</b> An <b>Athena encounter is still required</b>, including for urine or stool drop-offs. <b>Results go directly to the outside ordering provider</b>, not Sollis Aftercare.',true);
 h+=section('Front Desk · Intake');
 h+=step('Receive the request and outside Rx',bullet(
  'Ask the member to email the outside physician\'s lab prescription before scheduling.',
  'Use the incoming Navigator task; reassign to <b>NY Lab/Rad Techs</b> for approval.',
  'Upload the Rx in the correct Athena chart under <b>Clinical Documents</b> with the label <b>Outside Lab Rx: [Date]</b>.',
  '<b>Do not schedule</b> until lab review is complete.'
 ),'Front Desk Coordinator',1);
 h+=section('NY Lab/Rad Tech · Approval');
 h+=step('Confirm collection eligibility and required information',bullet(
  'Review whether Sollis can collect and handle the ordered tests and verify specimen and transport requirements.',
  'Confirm ordering physician <b>name, address, fax and NPI</b>.',
  'Confirm readable <b>test orders and diagnosis codes</b>.',
  'Confirm <b>insurance card or facesheet</b> and <b>ordering physician lab account number</b>.',
  'Contact the ordering physician\'s office for missing information. For unavailable Quest provider accounts, use the approved <b>NY Sollis Quest fallback account</b> from the internal directory, not an unverified number.',
  '<b>All required information must be obtained before approval.</b>'
 ),'NY Lab/Rad Tech',2);
 h+=fork('Is the lab draw approved?',[
  ['Approved',bullet('Reassign the Navigator task to Front Desk for scheduling.')],
  ['Not approved',bullet('Reassign the task to the Lab Supervisor with the reason for denial.')]
 ]);
 h+=section('Front Desk · Schedule');
 h+=step('Schedule and inform the member',bullet(
  'Schedule <b>Monday to Friday, 9:00 AM to 5:00 PM</b>; prefer a non-flagship clinic.',
  'Verify required ordering-physician fax and lab account details before the appointment.',
  'Tell the member that results go <b>directly to the ordering provider</b>; Sollis will not receive, send or interpret them.',
  'Confirm appointment <b>date, time and clinic location</b>.'
 ),'Front Desk Coordinator',3);
 h+=section('Appointment · Athena documentation and specimen sendout');
 h+=step('Document the encounter and collect',bullet(
  'Open an Athena encounter for <b>every lab sendout</b>, including samples dropped off without an in-person visit.',
  'The provider or RN adds <b>.outsidelabdraw</b> to the HPI; the in-clinic provider documents and closes the encounter.',
  'Send tests using <b>only the outside ordering physician\'s Rx</b>. Do not create a Sollis laboratory requisition or enter those orders in Athena.',
  'Collect and handle specimens per the current reference-lab requirements and include the insurance card or patient facesheet.'
 ),'RN / Lab personnel · Provider',4);
 h+=step('Verify requisition details before bagging',bullet(
  'Confirm ordering physician name, address, fax, NPI and lab account number.',
  'Confirm tests, diagnosis codes and insurance information are attached.',
  'Submit to Quest or LabCorp using approved NY site handling and courier procedures.'
 ),'Lab personnel / RN',5);
 h+=note('Results and follow-up','Reconfirm with the member: <b>Sollis will not receive or discuss outside results.</b> The ordering physician receives results and handles questions and follow-up.',true);
 return h+finish();
}
function walkin(){
 let h=header('External requisition · Walk-in','Same-visit procedure for a patient presenting with an outside laboratory requisition.','Walk-in external lab request','RN / Lab personnel · Provider');
 h+=note('Scheduling','Encourage patients to schedule external lab visits in advance. For a patient already in clinic, review and complete the orders and chart documentation before collection.');
 h+=step('Review the outside requisition',bullet(
  'Match patient name and date of birth to the Athena chart; verify exact test codes, receiving lab, account number and preparation requirements.',
  'Review specimen collection, timing, processing and special precautions.'),'RN / Lab personnel',1);
 h+=fork('Are all required test codes, account and ordering details available?',[
  ['Yes',bullet('Continue to prepare the calculator and upload the required chart documents.')],
  ['No or unclear',bullet('Call the ordering provider’s office for missing details.','If unavailable, the <b>Sollis provider on duty places the required orders in Athena</b> before collection. Confirm the intended receiving lab.')]
 ]);
 h+=step('Prepare the Lab Calculator and upload both documents',bullet(
  'Select the correct receiving-lab calculator, review tubes, volumes, processing and transport, and save the finalized printout as a PDF.',
  'Upload the requisition as <b>Clinical Document · LAB REQUISITION</b>.',
  '<b>Required Internal Note:</b> open the saved requisition and enter <b>(1 of 1)</b> even if it is the only file. Number multiple requisitions (1 of N), (2 of N), etc.',
  'Upload the calculator PDF as <b>Clinical Document · LAB FLOWSHEET</b>.',
  'Confirm both documents are saved in the correct chart before collection. Print the current requisition(s) and Lab Calculator as needed for handoff.'),'RN / Lab personnel',2);
 h+=note('Additional, updated or replacement requisitions','Count current unique requisitions, update the denominator in every existing Internal Note when new ones arrive, and number each additional document separately. Do not increase the count for a replacement. Remove duplicates and superseded copies from the active workflow only through the approved document correction/deletion process. Verify the current set before handoff.',true);
 h+=handoff(3);
 h+=note('Patient already in clinic','After order review and documentation, proceed with collection, processing, packaging, billing paperwork and Sendout Log.');
 return h+finish();
}
function sollis(){
 let h=header('Sendout orders placed by Sollis','Provider order through collection, processing, transport and logging.','Orders entered by the Sollis clinical team','Provider · RN · Lab personnel · Front Desk');
 h+=step('Provider places the order',bullet('The Sollis provider places the external laboratory order in Athena.','Confirm the receiving laboratory: '+E(labList(true))+'.','Use exact laboratory test codes where available to avoid incorrect panels or reflex algorithms.'),'Provider',1);
 h+=step('Review the order',bullet('RN or lab personnel verifies ordered tests, specimen requirements and the correct receiving laboratory.'),'RN / Lab personnel',2);
 h+=step('Prepare collection instructions',bullet('Use the appropriate receiving-lab calculator, checking test codes, tube/container, volume, processing, transport temperatures and priority against the current directory.'),'RN / Lab personnel',3);
 h+=step('Upload the finalized Lab Calculator',bullet('Save as a PDF and upload to the patient chart as <b>Clinical Document · LAB FLOWSHEET</b>.','Complete the upload even when the patient is already in clinic and before collection.'),'RN / Lab personnel',4);
 h+=fork('Is the patient already in clinic?',[
 ['Yes',bullet('Proceed to RN collection and lab personnel processing immediately after order review and uploads are complete.')],
 ['No',bullet('Ask the Front Desk Coordinator to schedule as needed.','Share preparation requirements, then complete specimen collection, processing and logging on the appointment day.')]
 ]);
 h+=handoff(5);
 return h+finish();
}
function orders(tab){return tab==='walk-in'?walkin():tab==='in-house'?sollis():((window.LAB_MARKET?.get()||document.querySelector('[data-orders-market-value]')?.dataset.ordersMarketValue)==='ny'?nyScheduled():scheduled());}
function nodeText(el){return el?.textContent?.replace(/\s+/g,' ').trim()||'';}
function htmlText(el){
 if(!el)return '';
 const clone=el.cloneNode(true);
 clone.querySelectorAll('button,svg,img,script,style,iframe,video,.ops-actions,.ops-action,.lc-options,.lc-select-box,.ao-guide-sketch').forEach(x=>x.remove());
 return E(nodeText(clone));
}
function makeStepsFromDom(items,mapper,start=1){
 return items.map((node,i)=>{const v=mapper(node);return step(v.title,v.body,v.role,i+start)}).join('');
}
function calculators(root){
 let h=header('Lab Calculator · Six-step workflow','Prepare the receiving laboratory’s collection and transport plan before draw and sendout.','Quest, LabCorp and Cedars calculators','RN · Lab personnel');
 const phases=Array.from(root.querySelectorAll('.calc-guide-phase'));
 if(phases.length!==3)return null;
 let number=1;
 phases.forEach((phase,i)=>{
  h+=section(['Build the order','Verify requirements','Finalize the flowsheet'][i],nodeText(phase.querySelector('.calc-guide-phase-descriptor')));
  for(const card of phase.querySelectorAll('.calc-guide-card')){
   let body='';
   for(const li of card.querySelectorAll('li'))body+='<p class="lc-sop-line">• '+li.innerHTML+'</p>';
   const tip=card.querySelector('.calc-guide-tip');if(tip)body+=note('Important',tip.innerHTML);
   const title=nodeText(card.querySelector('h3'));
   h+=step(title,body,'RN / Lab personnel',number++);
  }
 });
 h+=section('Additional checks');
 const extra=Array.from(root.querySelectorAll('.calc-extra-card'));
 for(const item of extra){h+=note(nodeText(item.querySelector('strong')),htmlText(item.querySelector('p')));}
 const warning=root.querySelector('.calc-guide-safety');if(warning)h+=note('Before collection',htmlText(warning),true);
 return h+finish();
}
function athena(root){
 let h=header('Athena · External laboratory ordering','Reference sequence for selecting the correct receiver and entering the ordered test.','Receiving labs: '+labList(),'Ordering staff · Provider');
 const selected=nodeText(root.querySelector('.ao-guide-selection strong'));
 if(selected)h+=note('Receiving laboratory',E(selected)+(root.querySelector('.ao-guide-selection p')?' · '+htmlText(root.querySelector('.ao-guide-selection p')):''));
 const cards=Array.from(root.querySelectorAll('.ao-guide-card'));if(cards.length!==9)return null;
 h+=section('Order entry','Complete these steps in Athena, not in the guide.');
 h+=makeStepsFromDom(cards,node=>({title:nodeText(node.querySelector('h3')),body:'<p>'+node.querySelector('.ao-guide-detail')?.innerHTML+'</p>',role:null}));
 const tips=Array.from(root.querySelectorAll('.ao-guide-tip'));
 tips.forEach(t=>{h+=note(nodeText(t.querySelector('strong')),htmlText(t.querySelector('p')),t.classList.contains('ao-guide-tip-amber'));});
 return h+finish();
}
function ops(root,route){
 const headline=nodeText(root.querySelector('.ops-header h1,.ops-header h2,.ops-intro h1,.ops-intro h2,.ops-heading h1,h1'))||({
 outside:'Home stool and urine collection', 'specimen-dropoff':'Specimen drop-off','sendout-log':'Lab Sendout Log'}[route.id]||'Lab operations');
 let h=header(headline,'Complete workflow and applicable specimen-specific alternatives.',{
  outside:'Home collection · '+(route.tab||'staff'),'specimen-dropoff':'Returned home-collected samples','sendout-log':'Regional specimen sendouts'
 }[route.id]||route.id,'RN · Lab personnel · Front Desk · Provider, as applicable');
 const first=root.querySelector('.ops-lead,.ops-header p,.ops-intro p');
 if(first)h+=note('Purpose',htmlText(first));
 const notices=Array.from(root.querySelectorAll('.ops-notice,.ops-alert,.ops-warning'));
 notices.forEach((item,i)=>h+=note(i===0?'Required before proceeding':'Handling and exception note',htmlText(item),true));
 const flow=Array.from(root.querySelectorAll('.ops-flow > .ops-step'));
 if(flow.length){
  h+=section('Procedure','Follow each step in sequence.');
  h+=makeStepsFromDom(flow,node=>({title:nodeText(node.querySelector('.ops-step-body > strong')),body:'<p>'+htmlText(node.querySelector('.ops-step-body > p'))+'</p>',role:nodeText(node.querySelector('.ops-role'))}));
 }
 // Render every accordion, including ones that are closed on the screen.
 const accordions=Array.from(root.querySelectorAll('.ops-accordion,.lc-lab-detail'));
 if(accordions.length){
  const options=accordions.map(el=>{
   const label=nodeText(el.querySelector('summary strong,summary'))||'Specific instruction';
   const detail=el.querySelector('.ops-accordion-content,.lc-lab-content');
   const lines=detail?Array.from(detail.querySelectorAll('li')).map(li=>li.innerHTML):[];
   const info=lines.length?bullet(...lines):'<p>'+htmlText(detail)+'</p>';
   return [label,info];
  });
  if(route.id==='outside'&&['stool','urine'].includes(route.tab)){
   h+=section('Specimen medium and container decision','Follow only the instructions matching the ordered test and supplied kit.');
   h+=fork('Which collection medium or container is issued?',options);
  }else{
   h+=section('Questions, exceptions and special handling','Review these whenever the condition applies.');
   options.forEach(item=>h+=note(item[0],item[1]));
  }
 }
 const additional=Array.from(root.querySelectorAll('.ops-card')).slice(0,20);
 const kitOptions=additional.filter(card=>!/^Include with every kit$/i.test(nodeText(card.querySelector('h3'))));
 const kitSupplies=additional.find(card=>/^Include with every kit$/i.test(nodeText(card.querySelector('h3'))));
 if(kitSupplies){
  const list=Array.from(kitSupplies.querySelectorAll('li')).map(li=>li.innerHTML);
  h+=note('Required kit supplies',list.length?bullet(...list):htmlText(kitSupplies));
 }
 if(kitOptions.length){
  h+=fork('Which collection kit or specimen type is ordered?',kitOptions.map(card=>[
   nodeText(card.querySelector('h3')),
   '<p>'+htmlText(card.querySelector('p'))+'</p>'
  ]));
 }
 const routes=Array.from(root.querySelectorAll('.ops-route'));
 if(routes.length){
  h+=fork('How should the returned specimen be handled?',routes.map(card=>[
   nodeText(card.querySelector('strong')),
   '<p>'+htmlText(card.querySelector('p'))+'</p>'
  ]));
 }
 if(route.id==='sendout-log'){
  const market=root.querySelector('.lc-log-outcome');
  if(market)h+=note('Regional log and pickup confirmation',htmlText(market));
 }
 const last=root.querySelector('.ops-citation,.lc-guide-warning');
 if(last)h+=note('Reference',htmlText(last),true);
 if(!flow.length&&!accordions.length&&!additional.length&&!routes.length)return null;
 return h+finish();
}
function market(root){
 let h=header('Lab sendouts · Receiving-lab and courier guidance','Market and site-specific specimen routing reference.','Market/site selected on the page','Lab personnel · Front Desk');
 const market=nodeText(root.querySelector('.lc-guide-intro h2'))||'Selected market';
 h+=note('Selected location',E(market));
 const targets=Array.from(root.querySelectorAll('.lc-lab-detail'));
 if(!targets.length)return null;
 h+=fork('Which receiving lab is responsible for the specimen?',targets.map(el=>{
  const name=nodeText(el.querySelector('summary strong'))||nodeText(el.querySelector('summary'));
  const rules=Array.from(el.querySelectorAll('.lc-lab-content li')).map(li=>li.innerHTML);
  const site=el.querySelector('.lc-site-note');
  return [name,bullet(...rules)+(site?note(nodeText(site.querySelector('strong')),htmlText(site.querySelector('p'))):'')];
 }));
 return h+finish(note('Site verification required','Receiving laboratory services, courier cutoffs and approved labs can change. Confirm clinic activation and current pickup instructions.',true));
}
function supports(route,procedure){
 if(procedure)return true;
 if(['orders','calculators','specimen-dropoff','sendout-log','outside','envi-ordering'].includes(route.id))return true;
 if(route.id==='order-sets'&&route.tab==='sendout')return true;
 if(route.id==='sendout'&&route.tab==='overview')return true;
 return false;
}
function build(route,root){
 if(route.id==='orders')return orders(route.tab);
 if(!root)return null;
 if(route.id==='calculators')return calculators(root);
  if(route.id==='envi-ordering')return window.LAB_ENVI_ORDERING?.compactSop?.()||null;
 if(route.id==='order-sets'&&route.tab==='sendout')return athena(root);
 if(['outside','specimen-dropoff','sendout-log'].includes(route.id))return ops(root,route);
 if(route.id==='sendout'&&route.tab==='overview')return market(root);
 return null;
}
window.LAB_SOP_PRINT={supports:supports,build:build};
})();