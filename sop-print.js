/* Lab Central SOP print generator. Print reference, not a substitute for approved SOP/IFU. */
(function(){
'use strict';
const E=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const labList='Quest Diagnostics, LabCorp, Cedars, HealthTrackRx or PathMD';
function section(title,subtitle){return '<div class="lc-sop-section"><h2>'+E(title)+'</h2>'+(subtitle?'<p>'+E(subtitle)+'</p>':'')+'</div>';}
function step(title,body,role,num){
 return '<article class="lc-sop-step"><div class="lc-sop-step-top"><span class="lc-sop-index">'+String(num||'').padStart(2,'0')+'</span><h3>'+E(title)+'</h3>'+(role?'<span class="lc-sop-owner">'+E(role)+'</span>':'')+'</div><div class="lc-sop-step-body">'+body+'</div></article>';
}
function bullet(...items){return '<ul class="lc-sop-bullets">'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';}
function note(title,text,urgent){return '<aside class="lc-sop-note'+(urgent?' lc-sop-urgent':'')+'"><strong>'+E(title)+'</strong><p>'+text+'</p></aside>';}
function fork(question,choices){
 return '<div class="lc-sop-decision"><div class="lc-sop-decision-title"><span class="lc-sop-diamond">◇</span><strong>'+E(question)+'</strong><span>FOLLOW THE APPLICABLE PATH</span></div><div class="lc-sop-branches">'+choices.map(c=>'<div class="lc-sop-branch"><span class="lc-sop-branch-label">'+E(c[0])+'</span><div>'+c[1]+'</div></div>').join('')+'</div></div>';
}
function header(title,subtitle,scope,owner){
 return '<header class="lc-sop-header"><div class="lc-sop-eyebrow">LAB CENTRAL <span> / </span> PRINTABLE WORKFLOW REFERENCE</div><h1>'+E(title)+'</h1><p>'+E(subtitle)+'</p><div class="lc-sop-meta"><span><b>Applies to</b> '+E(scope)+'</span><span><b>Roles</b> '+E(owner)+'</span><span><b>Format</b> Complete SOP-style workflow</span></div></header>';
}
function finish(extra){
 return (extra||'')+'<footer class="lc-sop-footer">Staff workflow reference. Confirm the current approved Sollis SOP, Athena configuration, test directory, assay IFU and local receiving-laboratory requirements before use. Decisions must follow the applicable branch. No patient details are included.</footer>';
}
function handoff(start){
 const steps=[
 ['Collect specimens', 'RN / Collector',bullet('Use the LAB FLOWSHEET for <b>tubes, volumes and order of draw</b>.','Label every tube with patient identifiers, collection <b>date, time and collector initials</b>.','Collect all required specimen types.')],
 ['Document and hand off','RN',bullet('Document in Athena using the approved <b>.rn</b> workflow.','Hand off labeled specimens, requisition and LAB FLOWSHEET to lab personnel.')],
 ['Process specimens','Lab personnel',bullet('Verify all labels against the requisition and chart.','Follow the LAB FLOWSHEET for centrifugation, aliquoting, temperature and special handling; confirm using the current lab directory.')],
 ['Separate transport bags','Lab personnel',bullet('Use <b>separate bags by receiving lab and temperature</b>: room temperature, refrigerated and frozen.','Keep STAT and routine or special-handling requests separated when required; include appropriate paperwork in the bag sleeve.')],
 ['Check billing paperwork','Lab personnel',bullet('Confirm insurance information is included with the requisition.','<b>If insurance information is missing,</b> attach the patient facesheet.')],
 ['Complete Sendout Log and handoff','Lab personnel',bullet('Photograph labeled specimens, requisition and each transport bag as required.','Scan the QR code for the correct regional Microsoft Form and complete the Sendout Log, including pickup confirmation or UPS/FedEx tracking when applicable.','Place bags in the designated pickup or storage area.')]
 ];
 return section('Specimen collection, processing and handoff','Required after the order and collection plan are ready.')+steps.map((v,i)=>step(v[0],v[2],v[1],i+(start||1))).join('');
}
function scheduled(){
 let h=header('External requisition · Scheduled','From receipt of an outside requisition through documentation, scheduling, specimen collection and sendout.','Scheduled external laboratory requests','Front Desk Coordinator · RN / Lab personnel · Provider');
 h+=section('1. Receive and route the requisition','Use the route that matches how it arrived.');
 h+=fork('How was the requisition received?',[
 ['Faxed to Sollis',bullet('Find the automatically uploaded fax in the correct Athena patient chart.','Verify and <b>reclassify it as Clinical Document</b> labeled <b>LAB REQUISITION</b>.','Create and route a Navigator task to the lab team/RN unless one already exists. Do not duplicate.')],
 ['Email or text',bullet('Use the existing Navigator task and <b>manually upload</b> the requisition to the correct Athena chart.','Classify it as <b>Clinical Document · LAB REQUISITION</b> and verify.','Assign the existing task to the lab team/RN. Do not create a duplicate.')]
 ]);
 h+=step('Review the outside requisition',bullet('Verify patient identity, intended lab, ordered tests, exact <b>test codes</b>, <b>account number</b> and preparation requirements.','Check that the chart and requisition match before proceeding.'),'RN / Lab personnel',2);
 h+=fork('Are the account number and test codes complete?',[
 ['Yes',bullet('Continue to prepare the Lab Calculator and collection plan.')],
 ['No, information is missing',bullet('RN or lab personnel contacts the ordering provider’s office for the missing information.','<b>If obtained:</b> upload the corrected requisition as Clinical Document · LAB REQUISITION and confirm the new version before continuing.','<b>If unavailable:</b> the <b>Sollis provider on duty</b> must place the required orders in Athena. Verify the receiving lab and orders before collection, then continue with the Lab Calculator.')]
 ]);
 h+=section('2. Prepare and schedule','Resolve all missing information first.');
 h+=step('Prepare and upload the Lab Calculator',bullet('Choose the correct receiving lab and confirm test codes, tubes, volumes, processing and transport temperature.','Generate and upload the final calculator PDF in Athena as <b>Clinical Document · LAB FLOWSHEET</b>.'),'RN / Lab personnel',3);
 h+=step('Schedule the patient',bullet('Front Desk Coordinator schedules after receiving the completed request.','Communicate any fasting, dietary, timed-draw or other patient instructions supplied by the clinical team.'),'Front Desk Coordinator',4);
 h+=step('Print both documents on appointment day',bullet('Print the current <b>LAB REQUISITION</b> and <b>LAB FLOWSHEET</b> from the chart.','For calculator colors, choose <b>View Original Image</b> in Athena before printing.'),'RN / Lab personnel',5);
 h+=handoff(6);
 h+=note('Do not collect before required orders are in place','If codes or account information cannot be obtained, escalate to the Sollis provider on duty. Complete the required Athena ordering and document uploads before collection.',true);
 return h+finish();
}
function walkin(){
 let h=header('External requisition · Walk-in','Full same-visit process for a patient presenting with an outside lab requisition.','Walk-in external lab request','RN / Lab personnel · Provider');
 h+=note('Scheduling','Encourage patients to schedule external lab visits in advance. For a patient already in clinic, review and complete the order documentation before collecting.');
 h+=step('Review the outside requisition',bullet('Match the requisition to the Athena patient chart and verify identity, exact test codes, receiving lab and account number.','Review tubes, timing, specimen processing, special precautions and patient preparation.'),'RN / Lab personnel',1);
 h+=fork('Are all required codes, account and ordering details available?',[
  ['Yes',bullet('Continue to calculator preparation and chart document uploads.')],
  ['No or unclear',bullet('Contact the ordering provider’s office for missing information.','If test codes or account number still cannot be obtained, the <b>Sollis provider on duty places the orders in Athena</b> before collection. Confirm the intended receiving lab.')]
 ]);
 h+=step('Prepare and upload both documents',bullet('Use the correct receiving-lab calculator to prepare the collection plan, then save its printout as PDF.','Upload outside requisition as <b>Clinical Document · LAB REQUISITION</b>.','Upload Lab Calculator as <b>Clinical Document · LAB FLOWSHEET</b>.','Verify both documents in the correct patient chart before collection.'),'RN / Lab personnel',2);
 h+=handoff(3);
 h+=note('Patient already in clinic','After review and chart uploads, proceed directly with collection and subsequent processing, packaging and electronic Sendout Log.');
 return h+finish();
}
function sollis(){
 let h=header('Sendout orders placed by Sollis','Provider order through collection, processing, transport and logging.','Orders entered by the Sollis clinical team','Provider · RN · Lab personnel · Front Desk');
 h+=step('Provider places the order',bullet('The Sollis provider places the external laboratory order in Athena.','Confirm the receiving laboratory: '+E(labList)+'.','Use exact laboratory test codes where available to avoid incorrect panels or reflex algorithms.'),'Provider',1);
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
function orders(tab){return tab==='walk-in'?walkin():tab==='in-house'?sollis():scheduled();}
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
 let h=header('Athena · External laboratory ordering','Reference sequence for selecting the correct receiver and entering the ordered test.','Receiving labs: '+labList,'Ordering staff · Provider');
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
 const warning=root.querySelector('.ops-notice,.ops-alert,.ops-warning');
 if(warning)h+=note('Required before proceeding',htmlText(warning),true);
 const flow=Array.from(root.querySelectorAll('.ops-flow > .ops-step'));
 if(flow.length){
  h+=section('Procedure','Follow each step in sequence.');
  h+=makeStepsFromDom(flow,node=>({title:nodeText(node.querySelector('.ops-step-body > strong')),body:'<p>'+htmlText(node.querySelector('.ops-step-body > p'))+'</p>',role:nodeText(node.querySelector('.ops-role'))}));
 }
 // Render every accordion, including ones that are closed on the screen.
 const accordions=Array.from(root.querySelectorAll('.ops-accordion,.lc-lab-detail'));
 if(accordions.length){
  h+=section('Specimen or receiving-lab alternatives','Choose the section that matches the ordered test, kit and receiving laboratory.');
  h+=fork('Which test, container or receiving lab applies?',accordions.map(el=>{
   const label=nodeText(el.querySelector('summary strong,summary'))||'Specific instruction';
   const detail=el.querySelector('.ops-accordion-content,.lc-lab-content');
   const lines=detail?Array.from(detail.querySelectorAll('li')).map(li=>li.innerHTML):[];
   const info=lines.length?bullet(...lines):'<p>'+htmlText(detail)+'</p>';
   return [label,info];
  }));
 }
 const additional=Array.from(root.querySelectorAll('.ops-card')).slice(0,14);
 for(const card of additional){h+=note(nodeText(card.querySelector('h3')),htmlText(card.querySelector('p,ul,ol')));}
 const last=root.querySelector('.ops-citation,.lc-guide-warning');
 if(last)h+=note('Reference',htmlText(last),true);
 if(!flow.length&&!accordions.length&&!additional.length)return null;
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
 if(['orders','calculators','specimen-dropoff','sendout-log','outside'].includes(route.id))return true;
 if(route.id==='order-sets'&&route.tab==='sendout')return true;
 if(route.id==='sendout'&&route.tab==='overview')return true;
 return false;
}
function build(route,root){
 if(route.id==='orders')return orders(route.tab);
 if(!root)return null;
 if(route.id==='calculators')return calculators(root);
 if(route.id==='order-sets'&&route.tab==='sendout')return athena(root);
 if(['outside','specimen-dropoff','sendout-log'].includes(route.id))return ops(root,route);
 if(route.id==='sendout'&&route.tab==='overview')return market(root);
 return null;
}
window.LAB_SOP_PRINT={supports:supports,build:build};
})();