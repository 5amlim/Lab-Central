/* Lab Central | unified TORCH / SPOTFIRE illustrated procedure cards.
 * One meaningful illustration and a short instruction per step. Original
 * copyrighted manufacturer diagrams remain at their source (linked/embedded
 * from the publisher) rather than copied into the public repository.
 * The legacy BioFire pouch loading photos are for orientation only; clinical
 * sequence and specimen requirements follow the currently approved assay IFU.
 */
(function(){
"use strict";
const B=window.LAB_BIOFIRE_ART;
if(!B)return;
const previous=B.stageVisual;
const legacy="https://manuals.plus/wp-content/uploads/2022/01/BIOFIRE-423745-Pouch-Loading-Station-with-FilmArray-System-fig-";
const legacyGuide="https://manuals.plus/biofire/423745-pouch-loading-station-with-filmarray-system-manual";
const spotGuide="https://www.biomerieux.com/content/dam/biomerieux-com/service-support/support-documents/instructions-for-use-and-manuals/BFR0001-7220-BIOFIRE-SPOTFIRE-R-ST-Panel-Instructions-for-Use-EN.pdf";
const sourcePouchGuide="https://biofiredefense.com/content/BIOFIRE-SPOTFIRE-Support/SPOTFIRE-Product-Labeling/BioFire-BioThreat-Instructions-SPOTFIRE-DFA2-PRT-0283.pdf";
const miniGuide="https://www.biomerieux.com/us/en/service-and-support/support/biofire-system-documents.html"; // Select the U.S. R/ST Mini guide from the current library; older OUS PDF is not a U.S. IFU.
const docLibrary="https://www.biomerieux.com/us/en/service-and-support/support/biofire-system-documents.html";
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
// Actual manufacturer figures cropped from the supplied PDF and published as
// local static assets by the source-extraction workflow. Clicking zooms to the
// unchanged original illustration. BioThreat is hardware-only, not clinical IFU.
const photo=(file,alt)=>'<a class="bf-source-image" href="assets/biofire/'+esc(file)+'" target="_blank" rel="noopener" title="Open full-size manufacturer illustration">'+
 '<img src="assets/biofire/'+esc(file)+'" alt="'+esc(alt)+'" loading="lazy" decoding="async"></a>';
const link=(url,title)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+'</a>';
const instruction=lines=>'<div class="bf-polished-points">'+lines.map(t=>'<div class="bf-polished-point"><i class="bf-polished-point-dot" aria-hidden="true"></i><span>'+esc(t)+'</span></div>').join("")+'</div>';
function manufacturer(id,figure,page){
 if(id==="torch"&&figure){
  const pic=legacy+figure+".jpg";
  return '<details class="bf-polished-more bf-ref-figure"><summary>View manufacturer handling photo · Figure '+figure+'</summary>'+
   '<a class="bf-photo" target="_blank" rel="noopener noreferrer" href="'+esc(pic)+'" title="Open original manufacturer handling photo">'+
   '<img src="'+esc(pic)+'" loading="lazy" alt="BioFire pouch loading handling reference, figure '+figure+'"></a>'+
   '<p class="bf-ref-caption">From an earlier BioFire pouch-loading guide. Handling reference only, not the GI panel IFU. '+link(legacyGuide,"View source guide")+'</p>'+
   '</details>';
 }
 if(id==="spotfire"&&page){
  const href=spotGuide+"#page="+page;
  // The user's BioThreat document depicts the same physical loading-station
  // hardware but is environmental research only, NOT the clinical R/ST IFU.
  const hardwarePages={13:10,14:10,15:11,16:12};
  const originalPage=hardwarePages[page];
  if(originalPage){
   const original=sourcePouchGuide+"#page="+originalPage;
   return '<p class="bf-source-hardware-note"><strong>Manufacturer hardware image:</strong> '+
    link(original,"Original BioFire figure · PDF page "+originalPage)+
    '. BioThreat images show physical handling only, not the diagnostic R/ST procedure. '+
    link(href,"Clinical R/ST instructions")+'.</p>';
  }
  return '<details class="bf-polished-more bf-ref-pdf"><summary>View official SPOTFIRE R/ST illustration · page '+page+'</summary>'+
   '<div class="bf-ref-frame"><iframe loading="lazy" title="Official SPOTFIRE R/ST guide page '+page+'" src="'+esc(href)+'"></iframe></div>'+
   '<p class="bf-ref-caption">'+link(href,"Open illustrated R/ST page")+' · '+link(miniGuide,"Current Mini documents")+'. Follow the exact assay and kit in use.</p>'+
   '</details>';
 }
 return "";
}
function card(id,opts){
 const hue=opts.hue||"green",visual=opts.visual||"",lines=opts.lines||[];
 const reference=manufacturer(id,opts.figure,opts.page);
 const details=opts.note?'<div class="bf-polished-alert"><strong>'+esc(opts.noteTitle||"Verify")+'</strong> '+esc(opts.note)+'</div>':"";
 const source=id==="torch"?link(legacyGuide,"Original loading-station guide")+' · '+link(docLibrary,"Current GI panel resources"):
  link(spotGuide+"#page="+(opts.page||14),"SPOTFIRE R/ST illustrated IFU")+' · '+link(miniGuide,"Find current R/ST Mini guide");
 return '<section class="bf-polished bf-polished-'+hue+'" aria-label="'+esc(id==="torch"?"TORCH GI":"SPOTFIRE R/ST")+' '+esc(opts.title)+'">'+
 '<div class="bf-polished-top"><span class="bf-polished-chip">'+esc(id==="torch"?"TORCH · GI":"SPOTFIRE · R/ST")+'</span>'+
 '<span class="bf-polished-chip '+(hue==="red"?"":"system")+'">'+esc(opts.tag||"Action")+'</span></div>'+
 '<div class="bf-polished-inner"><div class="bf-polished-media"><div class="bf-polished-svg">'+visual+'</div>'+
 '<span class="bf-polished-credit">Illustration/reference only · current clinical assay instructions govern</span></div>'+
 '<div class="bf-polished-instruction"><h4>'+esc(opts.title)+'</h4>'+instruction(lines)+details+reference+
 '<p class="bf-ref-small">Reference: '+source+'</p></div></div></section>';
}
function prepOnly(id,position){
 // The shared drawing contains the two different preparation sequences.
 // Crop to the matching action without creating repetitive side-by-side cards.
 const art=B.pipette?.(id)||"";
 const view=position==="first"?"0 0 460 400":"460 0 460 400";
 return art.replace('viewBox="0 0 920 400"','viewBox="'+view+'"');
}
function render(id,title){
 if(id!=="torch"&&id!=="spotfire")return previous?previous(id,title):"";
 const gi=id==="torch",t=String(title||"").trim().toLowerCase();
 const c=opts=>card(id,opts);
 if(/gather.*(kit|specimen)|kit and specimen/.test(t))return c({
  title:"Check pouch, vials and specimen",tag:"Preparation",
  visual:gi?B.kit?.():photo("spotfire-seat-pouch.png","Actual BioFire pouch and loading station with red sample and blue hydration positions"),figure:1,page:13,
  lines:[gi?"Confirm the ordered GI pouch and its expiration date.":"Confirm the ordered R/ST Regular or Mini pouch and its expiration date.",
  "Check the red sample vial, blue hydration vial, buffer and transfer pipette.",
  gi?"Verify the stool specimen is in the approved Cary Blair transport medium.":"Confirm specimen type and transport medium for the selected Respiratory or Sore Throat menu."],
  note:"Use the specific panel supplied at your location. R/ST Regular and Mini instructions are not interchangeable."
 });
 if(/seat pouch|insert pouch|set up vials|loading station/.test(t))return c({
  title:"Seat pouch and place both vials",tag:"Loading station",
  visual:gi?B.station?.("ready"):photo("spotfire-seat-pouch.png","Manufacturer figure: seat the pouch in the loading station and align red and blue positions"),figure:2,page:14,
  lines:["Place the pouch flat in the black loading station.","Seat the RED sample vial in the left red well.","Seat the BLUE hydration vial in the right blue well."],
  note:"Keep the pouch barcode accessible and the red/blue injection paths separate."
 });
 if(/hydrat/.test(t))return c({
  title:"Hydrate through the blue port",tag:"BLUE · hydration",hue:"blue",
  visual:gi?B.station?.("hydrate"):photo("spotfire-hydrate-pouch.png","Manufacturer figure: blue hydration vial pressed into pouch hydration port"),figure:2,page:14,
  lines:["Unscrew the blue vial, leaving its colored cover in the station.","Insert its blunt needle into the BLUE hydration port and press to puncture the seal.","Verify the pouch draws in hydration solution before proceeding."],
  noteTitle:"Check",note:"Do not proceed with a pouch that fails hydration. Follow the panel IFU."
 });
 if(/add gi sample buffer|gi buffer|buffer.*first/.test(t) || gi&&/open buffer|prepare red sample/.test(t))return c({
  title:"Add GI buffer first",tag:"RED · sample prep",hue:"red",
  visual:prepOnly("torch","first"),figure:5,page:15,
  lines:["Hold the buffer ampoule tip up. Open the supplied tab design as instructed.","Dispense GI sample buffer into the red sample injection vial.","Avoid touching the tip or creating excessive foam."],
  noteTitle:"GI order",note:"BUFFER FIRST, then add the Cary Blair stool specimen."
 });
 if(/transfer gi specimen|cary blair|gi specimen/.test(t))return c({
  title:"Add 0.2 mL GI specimen",tag:"RED · sample prep",hue:"red",
  visual:prepOnly("torch","second"),figure:4,page:15,
  lines:["Mix stool thoroughly in Cary Blair transport medium.","Draw to the second line of the supplied transfer pipette (0.2 mL).","Dispense into the red vial after buffer, as directed in the GI workflow."],
  note:"Do not use the SPOTFIRE fixed-volume specimen method for the TORCH GI panel."
 });
 if(/transfer spotfire specimen|spotfire specimen|specimen.*first/.test(t) || !gi&&/open buffer|prepare red sample/.test(t))return c({
  title:"Transfer SPOTFIRE specimen first",tag:"RED · sample prep",hue:"red",
  visual:prepOnly("spotfire","first"),page:15,
  lines:["Use the supplied fixed-volume transfer pipette for the ordered R/ST kit.","Visually verify the correct pipette fill according to the assay insert.","Dispense the specimen into the red sample injection vial."],
  noteTitle:"SPOTFIRE order",note:"SPECIMEN FIRST, then sample buffer. Check the R/ST Regular or Mini kit."
 });
 if(/add spotfire buffer|spotfire buffer/.test(t))return c({
  title:"Add the full SPOTFIRE buffer",tag:"RED · sample prep",hue:"red",
  visual:photo("spotfire-buffer-ampoule.png","Manufacturer illustration of opening the buffer ampoule and dispensing into red injection vial"),page:15,
  lines:["TWIST the tab off the SPOTFIRE sample-buffer ampoule tip.","Squeeze the entire supplied buffer volume into the red sample vial.","Close the vial securely. Avoid touching the open tip or creating foam."],
  note:"Do not substitute the TORCH GI textured side-tab technique unless the actual supplied kit directs it."
 });
 if(/invert|gently mix|cap red/.test(t))return c({
  title:"Cap and gently invert 3 times",tag:"Mix gently",hue:"red",
  visual:gi?B.invert?.():photo("spotfire-mix-vial.png","Manufacturer illustration: gently invert the closed red sample vial three times"),figure:7,page:15,
  lines:["Tightly close the red sample injection vial.","Gently invert it three times. Do not shake.","Return the closed vial to the red station well."],
  note:"The vial shown is the sample injection vial, not the specimen collection tube."
 });
 if(/load prepared sample|load mixture|red sample port|inject sample/.test(t))return c({
  title:"Load sample through the red port",tag:"RED · sample port",hue:"red",
  visual:gi?B.station?.("sample"):photo("spotfire-red-port-wait.png","Manufacturer figure: red vial at sample port and five-second wait"),figure:8,page:16,
  lines:["Unscrew the red vial and pause 5 seconds before lifting it; leave the red cover in the station.","Insert the blunt needle into the red pouch port and press to puncture the seal.","Verify that the mixture has been drawn into the pouch."],
  note:"Keep the blunt needle free of contamination. Discard a pouch if sample transfer fails, per the assay IFU."
 });
 if(/select.*(analyzer )?module|available module/.test(t))return c({
  title:"Choose an available module",tag:"Instrument",hue:"green",
  visual:gi?B.analyzer?.(id,"selected"):B.spotfireScreenWithZoom?.("selected"),page:17,
  lines:["Move the prepared pouch to the correct analyzer.","Select an available module and follow the actual loading prompts."],
  note:"The instrument drawing is schematic; verify the real module status."
 });
 if(/scan.*barcode|confirm sample id|verify sample id/.test(t))return c({
  title:"Scan pouch and verify identification",tag:"Identity check",
  visual:B.ui?.(id,1),page:17,
  lines:["Scan the pouch barcode.","Confirm the requested panel, sample ID and specimen type before starting."],
  note:"For SPOTFIRE, verify the Respiratory vs Sore Throat menu matches the order."
 });
 if(/load pouch and start run|start assay|start run|load.*module/.test(t))return c({
  title:"Load pouch and start test",tag:"Start run",
  visual:gi?B.analyzer?.(id,"selected"):B.spotfireScreenWithZoom?.("selected"),page:17,
  lines:["Insert the prepared pouch into the selected module.","Recheck sample ID and panel, then follow the analyzer START prompts."],
  note:"A started run is not the same as a completed, valid result."
 });
 if(/review.*result|document.*result|print.*result/.test(t))return c({
  title:"Review completed results",tag:"Reporting",
  visual:gi?B.analyzer?.(id,"results"):B.spotfireScreenWithZoom?.("results"),page:20,
  lines:["Confirm completion and verify patient or QC identification.","Check internal control acceptance and the complete result report.","Release or document results only under the approved reporting workflow."],
  note:"Failed, invalid or incomplete results require the assay-specific follow-up process."
 });
 // Preserve dedicated QC and other previously approved workflow branches.
 return previous?previous(id,title):"";
}
B.stageVisual=render;
window.LAB_BIOFIRE_POLISHED={render:render};
})();