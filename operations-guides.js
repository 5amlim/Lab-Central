/* Lab Central operational guide: home collection, drop-off and Sendout Log. */
(function(){
"use strict";
var formURL=String(window.LAB_SENDOUT_FORM_URL||"").trim();
var formReady=/^https:\/\/[^\s<>"']+$/i.test(formURL)&&!/^https:\/\/(?:forms\.office\.com|forms\.microsoft\.com)\/?$/i.test(formURL);
function heading(k,t,d){return '<section class="ops-page"><div class="ops-kicker">'+k+'</div><h1>'+t+'</h1><p class="ops-lead">'+d+'</p>';}
function notice(t,type){return '<div class="ops-info '+(type||'')+'"><span class="ops-info-icon" aria-hidden="true">'+(type==="amber"?"!":"i")+'</span><div>'+t+'</div></div>';}
function steps(items,start=1){return '<div class="ops-flow">'+items.map(function(s,i){return '<div class="ops-step"><span class="ops-step-index">'+String(i+start).padStart(2,"0")+'</span><div class="ops-step-body">'+(s[0]?'<span class="ops-role">'+s[0]+'</span>':'')+'<strong>'+s[1]+'</strong><p>'+s[2]+'</p></div></div>';}).join("")+'</div>';}
function list(items,ordered){var tag=ordered?"ol":"ul";return '<'+tag+'>'+items.map(function(x){return '<li>'+x+'</li>';}).join("")+'</'+tag+'>';}
function card(title,body,color,tag){return '<article class="ops-card '+(color||"teal")+'">'+(tag?'<div class="ops-card-label">'+tag+'</div>':'')+'<h3>'+title+'</h3>'+body+'</article>';}
function accordion(title,body,opened){return '<details class="ops-accordion" '+(opened?"open":"")+'><summary>'+title+'</summary><div class="ops-accordion-content">'+body+'</div></details>';}
function action(route,label,color){return '<button type="button" class="ops-action '+(color||"")+'" data-go="'+route+'">'+label+' <span aria-hidden="true">→</span></button>';}
function tabs(active){return '<div class="ops-tabs" role="group" aria-label="Home collection topics">'+[
['staff','Preparing take-home kits'],['stool','Stool instructions'],['urine','Urine instructions']
].map(function(x){return '<button type="button" data-ops-tab="'+x[0]+'" class="'+(active===x[0]?'active':'')+'" aria-pressed="'+(active===x[0])+'">'+x[1]+'</button>';}).join("")+'<button type="button" data-go="specimen-dropoff">Specimen drop-off ↗</button></div>';}
function kit(){
var h=notice('<strong>Before discharge:</strong> Give the patient the instruction handout with the appropriate collection highlighted. Select the correct medium, and place patient labels and specimen type on every container.');
h+='<h2 class="ops-section-heading">Prepare the take-home kit</h2>';
h+=steps([
['Tech / RN','Verify the requested test','Identify stool versus urine, the receiving lab and the exact ordered test. Do not substitute collection media.'],
['Tech / RN','Select the proper devices','Match the required container to in-house GI BioFire, HealthTrackRx or Cedars below. Confirm test-specific requirements.'],
['Tech / RN','Pack and label the kit','Label all containers with the specimen type. Pack the collection tools and the biohazard and opaque return bags.'],
['Tech / RN','Explain and highlight instructions','Highlight the correct section of the patient handout, explain how to transfer the sample into the supplied container and where to record date and time.'],
['Tech / RN','Explain specimen return','Advise prompt return per the specific test; patient returns will follow the new Athena specimen drop-off appointment workflow.']
]);
h+='<h2 class="ops-section-heading">Supplies for all tests</h2>';
h+=card('Include with every kit',list(['Patient instructions, with applicable collection section highlighted','Collection hat for stool and urine as needed','Standard urine cup when applicable','Patient labels, including specimen type, on every container','Gloves and tongue depressor','Biohazard bag and an opaque outer bag']),"blue","KIT CHECKLIST");
h+='<h2 class="ops-section-heading">Match the container to the test</h2><div class="ops-grid">';
h+=card('GI BioFire stool','<span class="ops-tag">In-house</span><p>Para-Pak C&amp;S vial with orange lid and red liquid. Add stool to the marked line with lid scoop or tongue depressor and seal.</p>','teal','STOOL');
h+=card('HTRX stool','<span class="ops-tag">Send-out</span><p>HealthTrackRx liquid-containing vial and thick swab. Collect a small amount with swab, break it into the vial and seal.</p>','purple','STOOL');
h+=card('Cedars stool','<span class="ops-tag">Send-out</span><p>Three-vial O&amp;P kit. Fill all three vials to their lines and seal. Vials contain liquid.</p>','amber','STOOL');
h+=card('HTRX urine','<span class="ops-tag">Send-out</span><p>Standard urine cup, HTRX vial and pipette, plus Castile cleansing wipes.</p>','purple','URINE');
h+=card('Cedars urine','<span class="ops-tag">Send-out</span><p>Tiger-top urine tube, gray culture tube, Vacutainer cup or transfer straw, and Castile wipes. <strong>Transfer devices contain a needle.</strong></p>','amber','URINE');
h+=card('Urine dip at home','<span class="ops-tag">In-house</span><p>Home collection for an in-house dipstick is not recommended. Use preservative tube and send out. An exception with a standard cup requires immediate refrigeration and same-day return.</p>','blue','URINE');
h+='</div><h2 class="ops-section-heading">Frequently asked questions</h2>';
h+=accordion('May a patient return a standard specimen cup?','Transfer specimens to the appropriate collection medium as soon as possible (reference limits: urine within 1 hour; stool within 2 hours). If a patient returns a plain cup, refrigerate it immediately after collection and return it the same day. <strong>Check current requirements for the actual test.</strong>',true);
h+=accordion('Can the patient return a specimen the next day?','Same-day return is preferred. Next-day return and room-temperature storage may be permitted in the correct collection medium, depending on the test. Verify the current specimen stability requirements.');
h+=accordion('What if staff do not yet know which stool test is needed?','If the requested test is not yet confirmed, provide the appropriate collection options (for example HTRX and GI BioFire) and verify the actual order before processing.');
h+=notice('<strong>Specimen handling:</strong> Confirm collection media, refrigeration and specimen stability in the current receiving laboratory directory.','amber');
return h;
}
var stoolSteps=[
['','Urinate first','Urinate before starting the stool collection.'],
['','Position the collection hat','Place the hat under the back of the toilet seat.'],
['','Collect stool','Do not contaminate the specimen with urine or toilet paper.'],
['','Transfer to the designated container','Follow the specific collection medium instructions below.'],
['','Seal, label and bag','Seal tightly, write collection date and time on the sticker, place in biohazard bag, then opaque bag.'],
['','Return promptly','Return to clinic the same day for best accuracy.']
];
var urineSteps=[
['','Clean the collection area','Wipe the urethra with the supplied cleansing cloth. The wipe is not flushable.'],
['','Open the specimen cup','Avoid touching the edges.'],
['','Position the cup or hat','If using a collection hat, place it toward the front of the toilet; omit when using a cup.'],
['','Collect a midstream urine specimen','Start urinating first, then collect urine, filling the cup about halfway.'],
['','Transfer into the designated medium','Follow the instructions for HTRX or Cedars below.'],
['','Seal, label and bag','Record the date/time; put the sealed container in the biohazard and opaque bags. Discard extra urine.'],
['','Return promptly','Return to clinic the same day for best accuracy.']
];
function patient(type){
var stool=type==="stool";
var h=notice('<strong>Patient reference:</strong> Highlight the correct test and container on the handout. The handout recommends same-day specimen return. For questions, call <strong>310-870-0400</strong> and ask for a nurse.','green');
h+='<h2 class="ops-section-heading">'+(stool?'Stool':'Urine')+' collection steps</h2>'+steps(stool?stoolSteps:urineSteps);
h+='<h2 class="ops-section-heading">By test and collection device</h2>';
if(stool){
h+=accordion('GI BioFire: orange-lid Para-Pak C&S vial',list(['The vial contains liquid; avoid spilling it.','Use the lid scoop or tongue depressor to add stool to the line.','Seal tightly.'],true),true);
h+=accordion('HealthTrackRx: swab and vial',list(['The vial contains liquid; avoid spilling it.','Open the swab without touching the cotton tip.','Collect a little stool from the hat onto the swab and put it into the vial.','Break the swab and seal the vial.'],true));
h+=accordion('Cedars: three-vial O&P kit',list(['All three vials contain liquid.','Using the scoop in the lids or a tongue depressor, add stool into all three containers to the marked lines.','Seal all three containers tightly.'],true));
}else{
h+=accordion('HealthTrackRx: urine pipette and vial',list(['The vial contains liquid.','Open the pipette. Squeeze the bulb, insert pipette tip into urine, then release to fill to the top line. Do not fill into the bulb.','Place pipette tip inside the vial and squeeze to transfer urine. Seal the vial.'],true),true);
h+=accordion('Cedars: blue-lid specimen cup transfer',list(['<strong>Needle hazard:</strong> the transfer device uses a needle.','Remove the yellow label from the blue lid.','Holding the rubber-top tube downward, insert it into the opening and wait until filling stops.','Repeat with the second tube.'],true));
h+=accordion('Cedars: transfer straw alternative',list(['<strong>Needle hazard:</strong> the device uses a needle.','Unpack the transfer straw and put its white tip in urine.','Insert the stopper end of the tube into the cup end of the device; allow it to fill until it stops.','Repeat with the other tube.'],true));
}
h+=notice('<strong>At specimen return:</strong> Clinic staff must create an Athena drop-off appointment, and the provider must place a new order for the returned specimen.','amber');
h+='<div class="ops-action-row">'+action('specimen-dropoff','Specimen drop-off workflow','primary')+action('outside','Kit preparation')+'</div>';
h+='<p class="ops-citation">Patient collection instructions · pages '+(stool?'3':'4–5')+'. Follow the issued handout and currently approved laboratory-specific instructions.</p>';
return h;
}
function home(tab){
var selected=['staff','stool','urine'].includes(tab)?tab:'staff';
var h=heading('HOME COLLECTION / STAFF & PATIENT INSTRUCTIONS','Home stool &amp; urine collection','Take-home kits, specimen-specific patient instructions, and container guidance. These are at-home collections, not specimens collected by clinic staff.');
h+=tabs(selected);
h+=selected==='staff'?kit():patient(selected);
h+='<div class="ops-link-card"><div><strong>Patient returning with a specimen?</strong><p>Use the Athena drop-off appointment and new-provider-order workflow.</p></div><button data-go="specimen-dropoff" type="button">Drop-off steps →</button></div>';
return h+'</section>';
}
function dropoff(){
var h=heading('HOME COLLECTION / RETURN ENCOUNTER','Specimen drop-off','Document every returned home-collected stool or urine specimen through a new Athena drop-off appointment and a new provider order.');
h+='<div class="ops-tabs"><button type="button" data-go="outside">← Home collection</button><button type="button" class="active" data-go="specimen-dropoff">Specimen drop-off</button></div>';
h+=notice('<strong>Required before processing:</strong> Front desk creates an Athena appointment for the drop-off; the provider places a <strong>new order</strong> for the returned specimen. Do not rely only on the previous encounter.','amber');
h+=steps([
['Front desk','Create a drop-off appointment in Athena','Set up the specimen drop-off appointment so the return can be documented in a chart encounter.'],
['Tech / RN','Check the returned specimen','Review patient identifiers, label, medium, collection date/time and test-specific stability. Escalate labeling, timing or container concerns before testing.'],
['Provider','Place a new order','The provider must enter a new order in Athena for the drop-off encounter, regardless of the prior visit.'],
['Clinical team','Document the drop-off in the chart','Document collection details and drop-off handling in the encounter. RN documentation uses the approved .rn phrase when applicable.'],
['Tech / RN','Direct to in-house testing or send-out','Use the corresponding instrument procedure for in-house specimens. For send-outs, use the receiving lab calculator and sendout documentation process.']
]);
h+='<h2 class="ops-section-heading">Choose the next route</h2><div class="ops-specimen-route">';
h+='<div class="ops-route"><strong>In-house test</strong><p>Verify the new order and follow the instrument-specific SOP.</p>'+action('home','Instrument guides')+'</div>';
h+='<div class="ops-route"><strong>Send-out test</strong><p>Verify the new order, prepare the Lab Calculator, and follow the tech sendout steps.</p>'+action('sendout-log','Sendout Log workflow')+'</div></div>';
h+=notice('Follow current Athena documentation requirements and approved procedures for specimen acceptance.');
return h+'</section>';
}
function sendout(){
 var h=heading('SEND-OUTS / LAB PERSONNEL DOCUMENTATION','Lab Sendout Log','Use this log for routine send-outs, STAT or special pickups, and special test kits sent by UPS or FedEx. Process the specimens, photograph each bag and document the handoff.');
 h+='<div class="ops-action-row">'+action('calculators','Open Lab Calculators','blue')+action('sendout','Receiving lab guidance')+'</div>';
 h+=window.LAB_SENDOUT_MARKETS.render("log");
 h+='<h2 class="ops-section-heading">Lab personnel workflow</h2>';
 const sendoutSteps=[
 ['Lab personnel','Process specimens according to the Lab Calculator','Confirm the receiving lab and ordered tests. Check tube labels, specimen volumes, processing and transport requirements against the approved test directory. Follow kit-specific instructions for special tests.'],
 ['Lab personnel','Separate and label transport bags','Follow the Lab Calculator printout: place room-temperature, refrigerated and frozen specimens in separate bags. Separate STAT or special-handling specimens when required. Put the matching requisition in each bag\'s document sleeve and seal the bag.'],
 ['Lab personnel','Photograph each bag separately','Take a clear photo of the labeled specimens and matching requisition, plus one photo of each sealed transport bag. You can attach up to 10 photos to the regional Sendout Log. Include the Lab Calculator printout if requested.'],
 ['Lab personnel','Complete the regional Sendout Log','Select your market, then choose the clinic in the secure Microsoft Form. Enter the receiving lab, specimen and bag details. For STAT or special pickups, record the pickup confirmation. For UPS/FedEx test kits, enter the carrier and tracking number. Attach your photos.'],
 ['Lab personnel','Submit the form and verify the entry','Check that the requisition, specimens, temperature groups and documentation match. Submit the form and confirm it was received. Verify any applicable pickup or shipping details.'],
 ['Lab personnel','Place the bags or kits in the approved handoff area','Place routine specimens in the correct receiving-lab bin, lockbox, refrigerator or freezer. For STAT/special pickups or UPS/FedEx kits, use the approved courier handoff or drop-off procedure and retain the confirmation or tracking reference.']
 ];
 h+='<div class="ops-sendout-photo-route">';
 h+='<div class="ops-sendout-first-steps">'+steps(sendoutSteps.slice(0,2))+'</div>';
 h+='<div class="ops-sendout-followup">'+steps(sendoutSteps.slice(2),3)+
 '<a class="ops-sendout-photo-arrow" href="#ops-sendout-photo-guide" aria-label="Jump to photo examples for the Sendout Log">'+
 '<span class="ops-sendout-photo-arrow-label">PHOTO EXAMPLES</span>'+
 '<svg viewBox="0 0 72 400" preserveAspectRatio="none" aria-hidden="true"><path d="M4 14 H37 Q53 14 53 30 V370" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 360 L53 380 L63 360" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
 '<span class="ops-photo-mobile-down" aria-hidden="true">↓</span></a></div>';
 h+=window.LAB_SENDOUT_VISUAL.examples();
 h+='</div>';
 h+=accordion('What needs to be photographed?', 'Photograph all labeled specimens, each separately sealed transport bag, and the matching requisition. You may attach up to 10 photos in the Sendout Log, including the Lab Calculator printout when requested. Separate temperature and STAT/special bags according to the Lab Calculator printout, and photograph each bag individually.',true);
 h+=accordion('How do I group and store multiple bags?', 'Follow the Lab Calculator printout: separate specimens by receiving lab, temperature (room temperature, refrigerated or frozen), and routine versus STAT or special handling when required. Use the designated secure pickup, storage or temperature-controlled area and follow the receiving lab directory.');
 h+=accordion('Does the log include special courier pickups and shipped kits?', 'Yes. Complete the regional Sendout Log for routine send-outs, STAT or special pickups, and special test kits shipped using UPS or FedEx. Enter pickup confirmation or reference information when applicable, or carrier and tracking number for shipped kits. Use the approved handoff process and secure documentation.');
 h+=notice('<strong>Before submitting:</strong> Match every bag to the requisition and Lab Calculator. Include photos of each bag (up to 10 total) and any applicable pickup confirmation or UPS/FedEx tracking information.','amber');
 h+='<div class="ops-link-card"><div><strong>Need specific receiving-lab or courier instructions?</strong><p>Open Lab send-outs for Quest, Cedars, HealthTrackRx and Labcorp.</p></div><button type="button" data-go="sendout">Receiving lab guidance →</button></div>';
 return h+'</section>';
}

window.LAB_OPS={render:function(page,tab){if(page==='outside')return home(tab);if(page==='specimen-dropoff')return dropoff();if(page==='sendout-log')return sendout();return '';},titles:{outside:'Home stool & urine collection','specimen-dropoff':'Specimen drop-off','sendout-log':'Lab Sendout Log'}};
})();
