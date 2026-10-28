/* Lab Central operational guide: home collection, drop-off and Sendout Log. */
(function(){
"use strict";
var formURL=String(window.LAB_SENDOUT_FORM_URL||"").trim();
var formReady=/^https:\/\/[^\s<>"']+$/i.test(formURL)&&!/^https:\/\/(?:forms\.office\.com|forms\.microsoft\.com)\/?$/i.test(formURL);
function heading(k,t,d){return '<section class="ops-page"><div class="ops-kicker">'+k+'</div><h1>'+t+'</h1><p class="ops-lead">'+d+'</p>';}
function notice(t,type){return '<div class="ops-info '+(type||'')+'"><span class="ops-info-icon" aria-hidden="true">'+(type==="amber"?"!":"i")+'</span><div>'+t+'</div></div>';}
function steps(items){return '<div class="ops-flow">'+items.map(function(s,i){return '<div class="ops-step"><span class="ops-step-index">'+String(i+1).padStart(2,"0")+'</span><div class="ops-step-body">'+(s[0]?'<span class="ops-role">'+s[0]+'</span>':'')+'<strong>'+s[1]+'</strong><p>'+s[2]+'</p></div></div>';}).join("")+'</div>';}
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
h+=card('Urine dip at home','<span class="ops-tag">In-house</span><p>The uploaded instructions advise against a home-collected in-house dipstick. Use preservative tube and send out. An exception with a standard cup requires immediate refrigeration and same-day return.</p>','blue','URINE');
h+='</div><h2 class="ops-section-heading">Frequently asked questions</h2>';
h+=accordion('May a patient return a standard specimen cup?','The source document says specimen should be transferred into the correct medium immediately. It cites a maximum of 1 hour for urine and 2 hours for stool before transfer. If a patient insists on returning a plain cup, the document calls for immediate refrigeration and same-day return. <strong>Check current requirements for the actual test.</strong>',true);
h+=accordion('Can the patient return a specimen the next day?','The document recommends same-day return. It states specimens in the correct medium may be kept until the next day at room temperature. This does not override test-specific stability requirements; verify the current assay instructions.');
h+=accordion('What if staff do not yet know which stool test is needed?','The source says to provide both relevant collection options when there is uncertainty, for example HTRX versus GI BioFire. Confirm which test is ordered before processing.');
h+=notice('<strong>Source review:</strong> Pages 1–2 of the uploaded Home Urine and Stool Collection Instructions. Confirm current preservation, temperature and stability instructions for each assay.','amber');
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
h+='<p class="ops-citation">Source: uploaded patient collection handout, pages '+(stool?'3':'4–5')+'. Follow the issued handout and currently approved laboratory-specific instructions.</p>';
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
h+=notice('The supplied PDF addresses patient and staff collection, not the new Athena encounter procedure. This drop-off workflow reflects the instructions provided for Lab Central.');
return h+'</section>';
}
function sendout(){
var h=heading('SEND-OUTS / TECH DOCUMENTATION','Lab Sendout Log','Seven steps from the printed Lab Calculator to correct specimen bin placement. RNs chart collection in Athena; only techs complete the electronic Sendout Log.');
h+='<div class="ops-action-row">'+action('calculators','Open Lab Calculators','blue')+action('sendout','Receiving lab guidance')+'</div>';
h+=steps([
['Tech / RN','Print the Lab Calculator in color','In Athena, select <strong>View Original Image</strong>, then print the original image so the color-coded collection and bag instructions are preserved. Do not print the black-and-white chart preview.'],
['RN / Collector','Draw or collect specimens','Collect the ordered specimens according to the verified Lab Calculator and current test directory.'],
['RN','Document in Athena using .rn','RNs chart the collection using the approved <strong>.rn</strong> phrase. RNs do not submit the tech Sendout Log.'],
['RN → Tech','Bring specimens to the laboratory','Hand the samples to the laboratory technologist for processing, together with the required requisition and calculator reference.'],
['Lab tech','Process using the Lab Calculator','Verify labeling, draw volumes, centrifugation/aliquoting, temperature, routine vs STAT bag assignments, and required paperwork.'],
['Lab tech','Complete the Microsoft Forms Sendout Log','Use the Microsoft Form to document the sendout. Enter the required location, receiving laboratory, patient reference, bag/specimen details, temperature groups and photos. Include STAT pickup notes if applicable.'],
['Lab tech','Place specimens into the correct bin','After logging, place processed and appropriately packaged specimens in the designated lab and temperature bin/pickup location.']
]);
h+='<h2 class="ops-section-heading">Microsoft Forms: Lab Sendout Log</h2>';
if(formReady){
var safe=formURL.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
h+='<div class="ops-action-row"><a class="ops-action primary" href="'+safe+'" target="_blank" rel="noopener noreferrer">Open Lab Sendout Log form ↗</a></div>';
}else{
h+='<div class="ops-form-pending"><strong>Direct form link is awaiting the verified Microsoft Forms URL.</strong>Use the QR code on the laminated lab instructions for now. To make a direct button available to staff, set the responder URL in <code>sendout-form-config.js</code> and republish. This site does not link to an unrelated form.</div>';
}
h+=accordion('What goes into the Sendout Log?', 'Use the live form fields for site, date, receiving lab, patient reference, specimen quantities/temperature, and photographs of the bag, requisition, and Lab Calculator. Document STAT pickup notes/confirmation where relevant. <strong>Patient information belongs only in the approved clinical systems and secure Microsoft Form.</strong>',true);
h+=accordion('Which bin should hold the specimens?', 'Use the dedicated receiving-laboratory and appropriate temperature storage/bin area. Keep routine and STAT bags separate where required and follow the clinic pickup schedule.');
h+=notice('<strong>Staff use only:</strong> The Lab Central site does not submit forms, chart collections, or handle patient information. Document these actions in the approved Athena and Microsoft 365 workflows.','amber');
h+='<div class="ops-link-card"><div><strong>Need receiving lab, courier or packaging instructions?</strong><p>Open the Lab send-outs reference for Quest, Cedars, HTRX and Labcorp.</p></div><button type="button" data-go="sendout">Lab send-outs →</button></div>';
return h+'</section>';
}
window.LAB_OPS={render:function(page,tab){if(page==='outside')return home(tab);if(page==='specimen-dropoff')return dropoff();if(page==='sendout-log')return sendout();return '';},titles:{outside:'Home stool & urine collection','specimen-dropoff':'Specimen drop-off','sendout-log':'Lab Sendout Log'}};
})();
