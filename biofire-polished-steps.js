/* Lab Central | BioFire TORCH / SPOTFIRE polished step media.
   Original diagrams stay editable SVG. TORCH manufacturer photographs are linked
   from the user-provided illustrated guide, not copied into this repository.
   SPOTFIRE figures and protocols are linked to official bioMérieux documents;
   the official PDF expressly restricts reproduction of its images.
   Assay-, market-, and lot-specific IFU/SOP supersede these visual aids. */
(function(){
"use strict";
const B=window.LAB_BIOFIRE_ART;
if(!B)return;
const previous=B.stageVisual;
const escape=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const manual="https://manuals.plus/biofire/423745-pouch-loading-station-with-filmarray-system-manual";
const photoBase="https://manuals.plus/wp-content/uploads/2022/01/BIOFIRE-423745-Pouch-Loading-Station-with-FilmArray-System-fig-";
const library="https://www.biomerieux.com/us/en/service-and-support/support/biofire-system-documents.html";
const spotGuide="https://www.biomerieux.com/content/dam/biomerieux-com/service-support/support-documents/quick-guides/BFR0002-3126-BIOFIRE-SPOTFIRE-R-Panel-Quick-Guide-EN-STD.pdf";
const spotImage="https://www.biomerieux.com/content/dam/biomerieux-com/03----our-offer/clinical/biofire-spotfire-system/SPOTFIRE-loading-pouch.jpg";
function picture(n,alt){
 const url=photoBase+n+".jpg";
 return '<a class="bf-photo" href="'+url+'" target="_blank" rel="noopener noreferrer" title="View original figure"><img loading="lazy" src="'+url+'" alt="'+escape(alt)+'"/></a>';
}
function officialPhoto(){
 return '<a class="bf-photo" href="https://www.biomerieux.com/us/en/our-offer/clinical-products/biofire-spotfire-respiratory-panels.html" target="_blank" rel="noopener noreferrer">'+
 '<img src="'+spotImage+'" loading="lazy" alt="SPOTFIRE manufacturer photo showing a test pouch being loaded"/></a>';
}
const diagram=(art)=>'<div class="bf-polished-svg">'+(art||"")+'</div>';
const point=(value,kind="")=>'<div class="bf-polished-point'+(kind?" "+kind:"")+'"><span class="bf-polished-point-dot"></span><span>'+escape(value)+'</span></div>';
const label=(text,kind="")=>'<span class="bf-polished-chip'+(kind?" "+kind:"")+'">'+escape(text)+'</span>';
function block({id,kind,title,visual,steps=[],warning="",reference="",link="",credit="",under=""}){
 return '<section class="bf-polished bf-polished-'+(kind||"neutral")+'" aria-label="'+escape(title)+'">'+
 '<div class="bf-polished-top">'+label(id==="torch"?"FILMARRAY TORCH · GI":"BIOFIRE SPOTFIRE · R/ST","system")+
 label(kind==="red"?"RED · SAMPLE":kind==="blue"?"BLUE · HYDRATION":kind==="green"?"ANALYZER":"POUCH PREP",kind)+
 '</div><div class="bf-polished-inner">'+
 '<div class="bf-polished-media">'+visual+(credit?'<div class="bf-polished-credit">'+escape(credit)+'</div>':"")+'</div>'+
 '<div class="bf-polished-instruction"><h4>'+escape(title)+'</h4>'+
 '<div class="bf-polished-points">'+steps.map(x=>typeof x==="string"?point(x):point(x.text,x.kind)).join("")+'</div>'+
 (warning?'<div class="bf-polished-alert"><strong>Important</strong> '+escape(warning)+'</div>':"")+
 (link?'<a class="bf-polished-source" href="'+link+'" target="_blank" rel="noopener noreferrer">View manufacturer reference ↗</a>':"")+
 '</div></div>'+
 (under?'<p class="bf-polished-footer">'+under+'</p>':"")+
 '</section>';
}
function pair(a,b){
 return '<div class="bf-polished-pair">'+a+b+'</div>';
}
function stage(id,title){
 if(id!=="torch"&&id!=="spotfire")return previous?previous(id,title):"";
 const t=String(title||"").toLowerCase();
 const gi=id==="torch", ref=gi?manual:spotGuide;
 const page=(p)=>gi?ref:ref+"#page="+p;
 const picCredit="Technique photo from linked FilmArray loading-station guide. This guide is not the GI assay IFU.";
 const spotCredit="Manufacturer photo. The linked R-panel PDF is an international illustrative edition, not a substitute for the approved U.S. R / R-ST / Mini IFU.";
 const docNote='<strong>Procedure source:</strong> <a href="'+library+'" target="_blank" rel="noopener noreferrer">Current BioFire documents</a>. These visuals are aids, not a substitute for the selected panel IFU or your approved SOP.';
 if(/gather|retrieve|materials|kit and specimen/.test(t)){
  return block({id,title:"Confirm the pouch kit and specimen",visual:gi?
    pair(diagram(B.kit?.()),picture(1,"BioFire pouch loading station and materials reference")):
    pair(diagram(B.kit?.()),officialPhoto()),
   steps:gi?["Confirm the GI pouch and expiration date.","Gather the red sample vial, blue hydration vial, buffer and transfer pipette.","Confirm the appropriate Cary Blair stool specimen."]:
   ["Match the pouch and sample-preparation kit identifiers.","Check the red sample vial, blue hydration vial, fixed-volume pipette and buffer.","Verify the ordered R, R/ST, or Mini panel and accepted specimen type."],
   warning:"Wear clean gloves and prepare one pouch at a time. Follow contamination controls.",link:gi?manual:library,credit:gi?picCredit:spotCredit,under:docNote});
 }
 if(/insert pouch|set up vials|loading station|prepare pouch/.test(t)){
  return block({id,title:"Seat the pouch and position both vials",visual:gi?
    pair(diagram(B.station?.("ready")),picture(2,"BioFire pouch in black loading station with color-coded red and blue wells")):
    diagram(B.station?.("ready")),
   steps:["Seat the pouch in the black loading station.","Red sample injection vial goes in the LEFT red well.","Blue hydration injection vial goes in the RIGHT blue well."],
   warning:gi?"The linked photograph demonstrates the station, not the current GI panel's sample-preparation requirements.":"Match pouch and kit identifiers, and keep the pouch barcode visible.",
   link:gi?manual:page(4),credit:gi?picCredit:"Original diagram; consult official SPOTFIRE quick-guide figure, page 4.",under:docNote});
 }
 if(/hydrate/.test(t)){
  return block({id,kind:"blue",title:"Hydrate through the BLUE pouch port",
   visual:gi?pair(diagram(B.station?.("hydrate")),picture(2,"BioFire vial placed at hydration port")):diagram(B.station?.("hydrate")),
   steps:["Unscrew the blue vial, leaving its blue cover in the station.","Insert the blunt needle in the BLUE hydration port and press until the seal punctures.","Verify hydration liquid has entered the pouch."],
   warning:"Do not touch the blunt needle. If hydration fails, follow the pouch-specific IFU; do not proceed with a dry pouch.",
   link:gi?manual:page(4),credit:gi?picCredit:"Original schematic, with official SPOTFIRE hydration figure on page 4.",under:docNote});
 }
 if(/open buffer|prepare red sample|sample buffer|prepare.*specimen/.test(t)){
  return block({id,kind:"red",title:gi?"Prepare the GI sample mixture · BUFFER FIRST":"Prepare SPOTFIRE sample mixture · SPECIMEN FIRST",
   visual:gi?pair(picture(5,"BioFire sample-buffer tube opening, textured-tab reference"),picture(6,"BioFire buffer dispensed into red injection vial"))+
   '<details class="bf-polished-more"><summary>See specimen-transfer reference photo</summary>'+picture(4,"BioFire transfer pipette showing specimen transfer technique")+'</details>':diagram(B.pipette?.("spotfire")),
   steps:gi?
   ["Open the supplied GI sample-buffer tube using its actual tab design.","Squeeze buffer into the RED sample vial first.","Add the approved volume of thoroughly mixed Cary Blair stool with the specified pipette."]:
   ["Transfer the assay-specified sample with the fixed-volume pipette to the RED vial first.","Twist the tab off the buffer tube, without touching the tip.","Add the full supplied buffer volume to the RED vial."],
   warning:gi?"Do not use a COVID-panel transfer-line illustration as the GI volume standard. Verify the GI insert.":"SPOTFIRE is not the TORCH GI buffer-first workflow. Check the specific R / R-ST / Mini instructions.",
   link:gi?manual:page(5),credit:gi?picCredit:"Original schematic; use current SPOTFIRE quick guide for the pipette and buffer sequence.",under:docNote});
 }
 if(/invert|cap red vial|gently mix/.test(t)){
  return block({id,kind:"red",title:"Cap and gently invert the RED vial 3 times",
   visual:gi?pair(diagram(B.invert?.()),picture(7,"BioFire red sample injection vial inversion example")):diagram(B.invert?.()),
   steps:["Close the sample vial securely.","Gently invert exactly three times. Do not shake.","Return the vial to the RED well."],
   warning:"Keep the cap secured and avoid foaming or contamination.",
   link:gi?manual:page(5),credit:gi?picCredit:"Original schematic; refer to the SPOTFIRE inversion figure on page 5.",under:docNote});
 }
 if(/load mixture|inject sample|red sample port/.test(t)){
  return block({id,kind:"red",title:"Load the sample mixture through the RED port",
   visual:gi?pair(diagram(B.station?.("sample")),picture(8,"BioFire red sample vial loading into pouch")):diagram(B.station?.("sample")),
   steps:["Unscrew the red vial and pause 5 seconds before lifting it from the cover.","Insert the blunt needle into the RED pouch sample port.","Press to puncture the seal and confirm the sample is drawn into the pouch."],
   warning:"Keep blunt needle sterile. Follow your panel IFU for the required loading wait and verification.",
   link:gi?manual:page(5),credit:gi?picCredit:"Original schematic; see SPOTFIRE pouch-loading sequence on page 5.",under:docNote});
 }
 if(/select.*module|available module/.test(t)){
  return block({id,kind:"green",title:"Choose an available analyzer module",
   visual:diagram(B.analyzer?.(id,"selected")),
   steps:["Bring the prepared pouch to the appropriate analyzer.","Select an available TORCH or SPOTFIRE module.","Check that the correct assay is selected before loading."],
   warning:"SPOTFIRE and TORCH use different analyzers. Follow the selected system's on-screen prompts.",
   link:library,under:docNote});
 }
 if(/scan.*barcode|confirm.*id/.test(t)){
  return block({id,kind:"green",title:"Verify pouch barcode and specimen ID",
   visual:diagram(B.ui?.(id,1)),
   steps:["Scan the pouch barcode when prompted.","Confirm the patient or QC ID and ordered panel.","Correct any mismatch before starting."],
   warning:"The pictured screens are instructional rather than exact firmware screenshots.",
   link:library,under:docNote});
 }
 if(/start run|load pouch/.test(t)){
  return block({id,kind:"green",title:gi?"Insert pouch and start TORCH analysis":"Review information, then insert pouch",
   visual:gi?diagram(B.analyzer?.(id,"selected")):(B.spotfireScreenWithZoom?.("insert")||""),
   steps:gi?
     ["Insert the prepared pouch into the correct TORCH module.","Follow the TORCH analyzer prompts and confirm the run begins."]:
     ["Review sample ID, specimen type and panel on the SPOTFIRE review screen.","Wait for the selected module LED to blink blue and insert the prepared pouch.","SPOTFIRE pulls in the pouch and automatically starts the run; its LED changes to solid green."],
   warning:gi?"A started run is not a completed or QC-passed test.":"No additional Start Run tap is needed after pouch insertion. A started run is not a completed result.",
   link:library,under:docNote});
 }
 if(/run in progress|analysis started|confirm analysis|analyzing|running/.test(t)){
  return block({id,kind:"green",title:"Confirm the run is processing",
   visual:diagram(B.analyzer?.(id,"running")),
   steps:["Confirm the run has started on the analyzer.","Do not disturb the module while the test is running.","Review the completed run and internal controls before reporting."],
   link:library,under:docNote});
 }
 if(/review.*result|document.*result|print.*result/.test(t)){
  return block({id,kind:"green",title:"Review results and internal controls",
   visual:diagram(B.analyzer?.(id,"results")),
   steps:["Verify the correct specimen identifier and completed run status.","Review the internal controls and panel results.","Document and release results according to the approved SOP."],
   warning:"Invalid or failed control results must be addressed according to the panel IFU.",
   link:library,under:docNote});
 }
 return previous?previous(id,title):"";
}
B.stageVisual=stage;
window.LAB_BIOFIRE_POLISHED={stage};
})();