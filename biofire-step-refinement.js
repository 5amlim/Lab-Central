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
const illustration=(markup,label)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 290" role="img" aria-label="'+esc(label)+'">'+markup+'</svg>';
function twistSketch(){
 const body='<rect x="35" y="25" width="480" height="235" rx="18" fill="#f4fafc" stroke="#d9e7ec" stroke-width="2"/>'+
 '<path d="M230 86L313 86L295 210Q286 235 270 237Q249 232 245 207Z" fill="#f5fcfd" stroke="#9ab8c5" stroke-width="5"/>'+
 '<path d="M248 160H295L287 205Q276 225 264 215Q255 211 251 200Z" fill="#c0dce6" opacity=".75"/>'+
 '<rect x="238" y="69" width="65" height="22" rx="7" fill="#cbdce5" stroke="#9cbbc7" stroke-width="3"/>'+
 '<path d="M262 68L273 41L294 41L303 66Z" fill="#e8f1f4" stroke="#88acbc" stroke-width="3"/>'+
 '<g transform="translate(310 18) rotate(25)"><path d="M0 11L10 3L32 3L38 12L29 24L10 24Z" fill="#edf5f7" stroke="#8badbc" stroke-width="3"/></g>'+
 '<path d="M322 49C367 57 380 84 355 115" fill="none" stroke="#188c86" stroke-width="6" stroke-linecap="round"/>'+
 '<path d="M338 109L354 119L363 98" fill="none" stroke="#188c86" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<text x="285" y="268" text-anchor="middle" font-size="20" fill="#236d7d" font-weight="850" font-family="Arial">TWIST OFF TIP TAB</text>';
 return illustration(body,"SPOTFIRE sample buffer ampoule: twist the plastic tab off its tip, do not pinch a side tab");
}
function specimenSketch(gi){
 const vol=gi?"2nd LINE · 0.2 mL":"FIXED-VOLUME PIPETTE";
 const body='<rect x="32" y="22" width="486" height="245" rx="17" fill="#f6fbfc" stroke="#d7e8ed" stroke-width="2"/>'+
 '<rect x="330" y="92" width="83" height="129" rx="14" fill="#f4fafc" stroke="#8cabb8" stroke-width="4"/>'+
 '<path d="M339 155H404V199Q397 212 373 213Q344 211 339 196Z" fill="#d9a8b0" opacity=".75"/>'+
 '<rect x="326" y="72" width="91" height="31" rx="7" fill="#c14b60" stroke="#8da4b0" stroke-width="3"/>'+
 '<rect x="345" y="133" width="54" height="40" rx="3" fill="#fff" stroke="#d6e5eb"/>'+
 '<text x="372" y="156" text-anchor="middle" fill="#a13e51" font-size="12" font-weight="850" font-family="Arial">SAMPLE</text>'+
 '<g transform="rotate(28 196 102)"><rect x="166" y="25" width="28" height="113" rx="12" fill="#ebf6fa" stroke="#8baeba" stroke-width="4"/>'+
 '<path d="M171 80H189V126H171Z" fill="#cc5970" opacity=".7"/>'+
 '<path d="M180 140V170" stroke="#8baebb" stroke-width="7" stroke-linecap="round"/>'+
 '<path d="M180 154V170" stroke="#a54e63" stroke-width="3" stroke-linecap="round"/></g>'+
 '<path d="M251 183L318 167" stroke="#238e88" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 7"/>'+
 '<text x="268" y="254" text-anchor="middle" fill="#2b7383" font-size="18" font-weight="850" font-family="Arial">'+vol+'</text>';
 return illustration(body,"Transfer the "+(gi?"mixed Cary Blair GI specimen using the second line":"SPOTFIRE specimen using the fixed-volume pipette")+" into the red sample injection vial");
}
const reference=id=>{
 const gi=id==="torch";
 const link=gi?"https://www.biomerieux.com/content/dam/biomerieux-com/service-support/support-documents/quick-guides/RFIT-PRT-0141-FilmArray-GI-Panel-Quick-Guide-EN.pdf":
  "https://www.biomerieux.com/corp/en/service-and-support/support/BioFire-System-Documents.html";
 return '<p class="bf-focused-note">Figures 3b / 3d illustrate the handling technique from the linked reference and are not a substitute for the assay-specific instructions. Check the <a href="'+link+'" target="_blank" rel="noopener noreferrer">official '+(gi?'FilmArray GI':'SPOTFIRE')+' guide ↗</a> for the correct kit design, specimen volume, and panel workflow.</p>';
};
function stage(id,title){
 if(id!=="torch"&&id!=="spotfire")return before?before(id,title):"";
 const t=String(title).toLowerCase(),gi=id==="torch";
 if(/kit and specimen/.test(t)){
  return block([card("Check the kit",B.kit?B.kit():photo(1,"BIOFIRE pouch loading station and both color-coded injection vials"),"Match the ordered "+(gi?"GI panel":"Respiratory / Sore Throat panel")+", pouch expiry, red and blue vials, buffer and specimen.")]);
 }
 if(/insert pouch|set up vials|loading station/.test(t)){
  return block([card("Insert pouch · red left / blue right",B.station?B.station("ready"):photo(2,"FilmArray loading station with red and blue vials"),"Seat the pouch in the station. Place the sample vial in the RED well and hydration vial in the BLUE well.")]);
 }
 if(/hydrate/.test(t)){
  return block([card("Inject hydration through blue port",B.station?B.station("hydrate"):photo(2,"Blue hydration vial and pouch"),"Lift the blue vial from its cover, insert into the blue pouch port and press. Wait until hydration solution enters the pouch.")]);
 }
 if(/open buffer|prepare red sample|sample buffer|prepare.*specimen/.test(t)){
  const order=gi?"TORCH GI: BUFFER FIRST, THEN STOOL":"SPOTFIRE: SPECIMEN FIRST, THEN BUFFER";
  const first=gi?
   card("Open GI buffer · correct tab type",photo(5,"BIOFIRE Figure 3b: a textured side-tab ampoule being pinched open"),"Twist off the plastic tip tab, or pinch the textured side tab if that is the supplied design. The picture shows the pinch variant.") :
   card("1 · Transfer specimen",specimenSketch(false),"Use the fixed-volume SPOTFIRE pipette to add the specimen to the red vial first.");
  const second=gi?
   card("3c · Add buffer to red vial",photo(6,"BIOFIRE Figure 3c: squeezing buffer tube into red sample vial"),"Slow, firm squeeze, then a second squeeze. Avoid foam.") :
   card("2 · TWIST OFF buffer tip",twistSketch(),"Twist the tab off the tip of the SPOTFIRE buffer tube. Do not use the FilmArray pinch-tab method.");
  const third=gi?
   card("Add GI stool specimen",specimenSketch(true),"Mix stool in Cary Blair, draw to the second pipette line (0.2 mL), then add it to the red vial.") :
   card("3c · Add buffer to red vial",photo(6,"BIOFIRE Figure 3c: buffer into the red sample vial"),"Squeeze the full supplied buffer into the red vial without excessive foam.");
  return '<section class="bf-focused" aria-label="Panel-specific sample preparation"><div class="bf-focused-order">'+order+'</div><div class="bf-focused-grid">'+[first,second,third].join("")+'</div>'+reference(id)+'</section>';
 }
 if(/invert|cap red vial|gently mix/.test(t)){
  return block([card("3d · Close and gently invert 3 times",photo(7,"BIOFIRE Figure 3d: red vial capped and inverted 3 times"),"Tightly cap the red sample vial, gently invert three times, then return it to the red well. Do not shake.")],reference(id));
 }
 if(/load mixture|inject sample|red sample port/.test(t)){
  return block([card("Use the red SAMPLE port",B.station?B.station("sample"):photo(8,"Red sample vial entering the pouch sample port"),"Unscrew the red vial, wait five seconds before lifting, insert into the red pouch port and press until sample is drawn in.")]);
 }
 if(/select.*module/.test(t)){
  return block([card(gi?"Choose a TORCH module":"Choose a SPOTFIRE module",B.analyzer?B.analyzer(id):"","Select an available module before initiating the run.")]);
 }
 if(/scan.*barcode|confirm.*id/.test(t)){
  return block([card("Scan pouch and verify specimen ID",B.ui?B.ui(id,1):"","Scan the pouch barcode. Confirm the ordered panel and patient or QC specimen ID before loading.")]);
 }
 if(/start run|load pouch/.test(t)){
  return block([card("Load prepared pouch",B.analyzer?B.analyzer(id,"selected"):"","Seat the prepared pouch in the selected module."),card("Start run",B.ui?B.ui(id,3):"","Confirm pouch and specimen information, then select Start Run.")]);
 }
 if(/run in progress|analysis started|confirm analysis|analyzing|running/.test(t)){
  return block([card("Confirm the analyzer has started",B.analyzer?B.analyzer(id,"running"):"","The run-start display is an instructional reference, not proof of acceptable results or internal QC.")]);
 }
 if(/review.*result|document.*result|print.*result/.test(t))return block([
  card("Review assay result and controls",B.analyzer?B.analyzer(id,"results"):"","On the actual analyzer, confirm the run has completed and review internal controls, specimen ID and results before reporting.")
 ]);
 return before?before(id,title):"";
}
B.stageVisual=stage;
window.LAB_BIOFIRE_REFINED={stage};
})();