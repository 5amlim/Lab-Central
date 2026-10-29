/* Concise BIOFIRE TORCH / SPOTFIRE step art. Figure 3b = snap textured buffer tab,
   Figure 3c = squeeze buffer, Figure 3d = cap + invert three times.
   Reference photos illustrate handling technique only; panel-specific sequence prevails. */
(function(){
"use strict";
const B=window.LAB_BIOFIRE_ART;
if(!B)return;
const before=B.stageVisual;
const esc=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const base="https://manuals.plus/wp-content/uploads/2022/01/BIOFIRE-423745-Pouch-Loading-Station-with-FilmArray-System-fig-";
const src=n=>base+n+".jpg";
const photo=(n,alt)=>'<a class="bf-focused-photo" href="'+src(n)+'" target="_blank" rel="noopener noreferrer" title="Open original instructional figure">'+
 '<img loading="lazy" src="'+src(n)+'" alt="'+esc(alt)+'"></a>';
const card=(heading,visual,desc)=>'<figure class="bf-focused-card"><div class="bf-focused-card-head">'+esc(heading)+'</div><div class="bf-focused-card-art">'+visual+'</div><figcaption>'+esc(desc)+'</figcaption></figure>';
const block=(items,foot="")=>'<section class="bf-focused" aria-label="BIOFIRE illustrated step"><div class="bf-focused-grid">'+items.join("")+'</div>'+foot+'</section>';
const provenance='<p class="bf-focused-note">The numbered handling illustrations are from the linked BIOFIRE quick guide. They demonstrate vial technique, not the specimen volume for TORCH GI or SPOTFIRE. Follow the ordered assay kit instructions for specimen volume and transport medium.</p>';
function stage(id,title){
 if(id!=="torch"&&id!=="spotfire")return before?before(id,title):"";
 const t=String(title).toLowerCase(),gi=id==="torch";
 if(/kit and specimen/.test(t)){
  return block([card("Check the kit",B.kit?B.kit():photo(1,"Pouch and vial kit"),"Match the ordered "+(gi?"GI panel":"Respiratory / Sore Throat panel")+", pouch expiry, red and blue vials, buffer and specimen.")]);
 }
 if(/insert pouch|set up vials|loading station/.test(t)){
  return block([card("Insert pouch · red left / blue right",photo(2,"Loading station with red sample well and blue hydration well"),"Seat the pouch in the station. Place the sample vial in the RED well and hydration vial in the BLUE well.")]);
 }
 if(/hydrate/.test(t)){
  return block([card("Inject hydration through blue port",B.station?B.station("hydrate"):photo(2,"Blue hydration vial and pouch"),"Lift the blue vial from its cover, insert into the blue pouch port and press. Wait until hydration solution enters the pouch.")]);
 }
 if(/open buffer|prepare red sample|sample buffer|prepare.*specimen/.test(t)){
  const order=gi?"TORCH GI: BUFFER FIRST, THEN STOOL":"SPOTFIRE: SPECIMEN FIRST, THEN BUFFER";
  const first=gi?
   card("3b · Snap the buffer tube",photo(5,"BIOFIRE Figure 3b: gloved hand pinching the textured snap tab"),"Hold the tip upward and pinch the textured tab until the seal snaps. Do not touch the tip.") :
   card("1 · Transfer specimen",B.pipette?B.pipette("spotfire"):photo(4,"Transfer pipette and red vial"),"Add the assay-approved specimen volume into the red vial using the supplied pipette.");
  const second=gi?
   card("3c · Add buffer to red vial",photo(6,"BIOFIRE Figure 3c: squeezing buffer tube into red sample vial"),"Slow, firm squeeze, then a second squeeze. Avoid foam.") :
   card("3b · Snap the buffer tube",photo(5,"BIOFIRE Figure 3b: gloved hand pinching the textured snap tab"),"Pinch the textured tab to open. Keep the tube tip clean.");
  const third=gi?
   card("Add GI stool specimen",B.pipette?B.pipette("torch"):photo(4,"FilmArray GI specimen pipette and red vial"),"Mix the stool in Cary Blair, draw to the second line (0.2 mL), and add to the red vial.") :
   card("3c · Add buffer to red vial",photo(6,"BIOFIRE Figure 3c: buffer into the red sample vial"),"Squeeze the full supplied buffer into the red vial without excessive foam.");
  return '<section class="bf-focused" aria-label="Panel-specific sample preparation"><div class="bf-focused-order">'+order+'</div><div class="bf-focused-grid">'+[first,second,third].join("")+'</div>'+provenance+'</section>';
 }
 if(/invert|cap red vial|gently mix/.test(t)){
  return block([card("3d · Close and gently invert 3 times",photo(7,"BIOFIRE Figure 3d: red vial capped and inverted 3 times"),"Tightly cap the red sample vial, gently invert three times, then return it to the red well. Do not shake.")],provenance);
 }
 if(/load mixture|inject sample|red sample port/.test(t)){
  return block([card("Use the red SAMPLE port",B.station?B.station("sample"):photo(8,"Red sample vial entering the pouch sample port"),"Unscrew the red vial, wait five seconds before lifting, insert into the red pouch port and press until sample is drawn in.")]);
 }
 if(/select.*module/.test(t)){
  return block([card(gi?"Choose a TORCH module":"Choose a SPOTFIRE module",B.analyzer?B.analyzer(id):"","Select an available module before initiating the run.")]);
 }
 if(/scan.*barcode|confirm.*id/.test(t)){
  return block([card("Scan pouch and verify specimen ID",B.ui?B.ui(id,2):"","Scan the pouch barcode. Confirm the ordered panel and patient or QC specimen ID before loading.")]);
 }
 if(/start run|load pouch/.test(t)){
  return block([card("Load prepared pouch",B.analyzer?B.analyzer(id,"selected"):"","Seat the prepared pouch in the selected module."),card("Start run",B.ui?B.ui(id,3):"","Confirm pouch and specimen information, then select Start Run.")]);
 }
 if(/review.*result/.test(t))return block([card("Review assay result and controls",B.ui?B.ui(id,3):"","Confirm completed run, internal controls and specimen identifiers. Follow the approved reporting workflow.")]);
 return before?before(id,title):"";
}
B.stageVisual=stage;
window.LAB_BIOFIRE_REFINED={stage};
})();