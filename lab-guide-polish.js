/* Lab Central illustration refinements: reference photographs and focused Piccolo visuals. */
(function(){
"use strict";
const A=window.LAB_EQUIPMENT_ART,B=window.LAB_BIOFIRE_ART;
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const origin="https://manuals.plus/biofire/423745-pouch-loading-station-with-filmarray-system-manual";
const photo=n=>"https://manuals.plus/wp-content/uploads/2022/01/BIOFIRE-423745-Pouch-Loading-Station-with-FilmArray-System-fig-"+n+".jpg";
const fig=(title,art,note,cls="")=>'<figure class="lc-visual '+cls+'"><div class="lc-visual-label">'+E(title)+'</div><div class="lc-visual-body">'+art+'</div><figcaption>'+E(note)+'</figcaption></figure>';
const manual=(n,alt)=>'<a class="lc-manual-photo" href="'+photo(n)+'" target="_blank" rel="noopener noreferrer" title="Open original BIOFIRE reference image"><img loading="lazy" src="'+photo(n)+'" alt="'+E(alt)+'"><span class="lc-photo-reference">Original loading-station reference ↗</span></a>';
const tile=(html)=>'<div class="lc-figure-grid">'+html+'</div>';
const ref='<p class="lc-manual-credit">Reference: <a target="_blank" rel="noopener noreferrer" href="'+origin+'">BIOFIRE loading-station illustrated guide</a>. Example figures are from a COVID-19 FilmArray guide. Follow the ordered GI / SPOTFIRE panel IFU for sample volumes, materials and software prompts.</p>';
const svg=(body,alt,view="0 0 600 310")=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" role="img" aria-label="'+E(alt)+'">'+body+'</svg>';
function statusCard(kind,text,sub){
 const c=kind==="blue"?"#228ab7":kind==="red"?"#bb4457":"#158c83";
 return svg('<rect x="36" y="25" width="528" height="264" rx="22" fill="#f5fafb" stroke="#d9e6ed" stroke-width="3"/>'+
 '<rect x="63" y="51" width="474" height="43" rx="9" fill="#273f50"/>'+
 '<text x="300" y="80" text-anchor="middle" fill="#fff" font-size="19" font-family="Arial" font-weight="800">BIOFIRE WORKFLOW</text>'+
 '<rect x="91" y="120" width="417" height="67" rx="10" fill="#e9f7f4" stroke="'+c+'" stroke-width="3"/>'+
 '<circle cx="125" cy="154" r="14" fill="'+c+'"/>'+
 '<path d="M118 154l5 5 10-13" fill="none" stroke="#fff" stroke-width="3"/>'+
 '<text x="307" y="161" text-anchor="middle" fill="#274f63" font-size="20" font-family="Arial" font-weight="850">'+E(text)+'</text>'+
 '<text x="300" y="225" text-anchor="middle" fill="#587b8b" font-size="15" font-family="Arial">'+E(sub)+'</text>',"Screen sequence illustration for "+text);
}
function pouchWithArrow(){
 const station=B&&B.station?B.station("ready"):"";
 return '<div class="lc-pouch-motion">'+station+'<span class="lc-action-arrow" aria-hidden="true">↓</span></div>';
}
function biofire(id,title){
 if(id!=="torch"&&id!=="spotfire")return "";
 const t=String(title).toLowerCase(),isTorch=id==="torch";
 const panel=isTorch?"TORCH GI":"SPOTFIRE R/ST";
 const note=isTorch?"GI: sample buffer then well-mixed Cary Blair stool (0.2 mL per current GI workflow).":"SPOTFIRE: use the exact kit and sample sequence for the selected Respiratory or Sore Throat assay.";
 let cards="";
 if(/gather|retrieve|materials/.test(t)){
  cards=tile(fig("Pouch and loading-station kit",manual(1,"Pouch, blue hydration vial, red sample vial, pipette, snap-tab buffer tube and dark loading station"),"Confirm the requested panel, pouch, both vials, buffer, pipette, specimen and expiration."))+
    fig("Panel and media",statusCard("blue",panel,isTorch?"GI pouch · Cary Blair stool":"R/ST pouch · UTM or eSwab as permitted"),"Use the kit and specimen type for the ordered assay.");
 }else if(/loading station|prepare pouch/.test(t)){
  cards=tile(fig("Seat the pouch in its station",manual(2,"Pouch slides into dark station; red sample well left and blue hydration well right"),"Place the pouch level in the loading station; red sample well LEFT, blue hydration well RIGHT.")+
   fig("Confirm the ports",pouchWithArrow(),"Keep the red sample and blue hydration paths separate. Match the orientation to the actual kit."));
 }else if(/hydrate/.test(t)){
  cards=tile(fig("Blue hydration vial",manual(2,"BioFire blue hydration vial in the blue loading-station well"),"Unscrew blue vial while leaving its plastic cover in the station. Insert into the blue hydration port, press and wait.")+
   fig("Verify hydration",B&&B.station?B.station("hydrate"):statusCard("blue","Hydration","Blue port"),"Check that hydration liquid entered the pouch before proceeding."));
 }else if(/sample.*buffer|mix specimen|prepare specimen/.test(t)){
  cards=tile(fig("Sample and transfer pipette",B&&B.pipette?B.pipette(id):statusCard("red","SAMPLE PREP","Match assay-specific pipette"),isTorch?"Mix stool in Cary Blair; transfer the GI-assay volume with the kit pipette.":"Follow SPOTFIRE kit instructions for specimen transfer and volume.")+
   fig("Snap-tab buffer, then dispense",manual(5,"Gloved hand breaking textured tab on narrow sample buffer tube"),"Hold tube upright and snap the textured tab away from hands; do not touch the dispensing tip.")+
   fig("Add buffer to red vial",manual(6,"Gloved hand squeezing sample buffer into the red injection vial"),"Dispense into red vial without generating excessive foam. "+note));
 }else if(/invert.*red|mix red vial|mix the capped/i.test(t)){
  cards=tile(fig("Cap and invert gently 3 times",manual(7,"Gloved hands holding and gently inverting capped red vial three times"),"Mix with gentle inversions, not vigorous shaking. Return the closed vial to the red station well."));
 }else if(/inject sample|load sample mix/.test(t)){
  cards=tile(fig("Remove the red sample vial",manual(8,"Red injection vial unscrewed from cover; five-second contamination pause"),"Leave red cover in station, pause five seconds before lifting the vial.")+
   fig("Load through the red port",B&&B.station?B.station("sample"):statusCard("red","Load sample","Red port"),"Insert blunt cannula into the sample port, press and wait for the mixture to draw into pouch."));
 }else if(/available module/.test(t)){
  cards=tile(fig(isTorch?"TORCH analyzer":"SPOTFIRE analyzer",B&&B.analyzer?B.analyzer(id):statusCard("blue","AVAILABLE","Module ready"),"Select an available analyzer module. The same instrument is used through the remaining screen steps."));
 }else if(/scan pouch barcode/.test(t)){
  cards=tile(fig("Scan pouch barcode",B&&B.ui?B.ui(id,1):statusCard("blue","SCAN BARCODE","Verify pouch"),"Match the scanned pouch, lot and order. Screen is schematic, not an exact software capture."));
 }else if(/confirm panel|verify sample id/.test(t)){
  cards=tile(fig("Confirm the ordered panel and ID",B&&B.ui?B.ui(id,2):statusCard("blue","VERIFY SAMPLE ID","Check panel"),"Confirm the intended "+panel+" panel and correct specimen or QC identifier."));
 }else if(/start assay|start run|load.*module/.test(t)){
  cards=tile(fig("Insert prepared pouch in module",B&&B.analyzer?B.analyzer(id,"selected"):statusCard("blue","LOAD MODULE","Insert pouch"),"Use the selected available module and follow the actual drawer/loading prompts.")+
   fig("Start the run",B&&B.ui?B.ui(id,3):statusCard("blue","START RUN","Confirm identifiers"),"Start only after verifying identifiers, pouch and module."));
 }else if(/review and document|results/.test(t)){
  cards=tile(fig("Review the completed run",statusCard("blue","REVIEW RESULTS","Controls passed · verify identity"),"Read internal control status, sample ID and results; handle incomplete/invalid runs per the assay IFU."));
 }else if(/qc|control/.test(t)){
  cards=tile(fig("Prepare QC in red vial",B&&B.station?B.station("ready"):statusCard("red","QC SAMPLE","Use approved QC materials"),"Use the correct QC positive/negative material and the panel-specific IFU; record the control ID.")+
   fig("Load QC pouch",manual(2,"BioFire pouch ready in loading station"),"Follow the same blue hydration and red sample paths for both QC levels."));
 }
 return cards?'<section class="lc-biofire-stages" aria-label="'+panel+' illustrated step">'+cards+ref+'</section>':"";
}
if(B){
 B.stageVisual=biofire;
}
function piccolo(title,group){
 if(!A)return "";
 const t=String(title).toLowerCase(),q=/qc|control/i.test(group)||/qc|control/i.test(t);
 const empty=A.piccoloDiscSvg(false),filled=A.piccoloDiscSvg(true),qcDisc=filled.replace(/#b63d4a|#ce5b64|#b63a48/g,'#739fae').replace(/with blood in the chamber/g,'with approved QC control in the chamber').replace('Sample loaded','QC control loaded');
 const old=A.piccoloVisual("grab the reagent disc");
 const reference=(old.match(/<img[^>]+>/)||[])[0]||empty;
 const tool=A.piccoloPipetteSvg();
 const instrument=(A.piccoloVisual("insert the filled disc").match(/<svg[\s\S]*?<\/svg>/)||[])[0]||"";
 if(/within 60|sample time|collection|blood tube/.test(t)){
  return fig("Lithium-heparin whole blood",A.mediaSvg?A.mediaSvg("green"):empty,"Confirm specimen identity and stability per the approved Piccolo SOP.","lc-piccolo-single");
 }
 if(/grab the controls|brt|nod|freezer/.test(t)){
  return fig("Prepare the approved BRT or NOD control",(A.stepIllustration({id:'piccolo',category:'Analyzers'},'grab the controls','monthly-qc').match(/<svg[\s\S]*?<\/svg>/)||[])[0]||statusCard("blue","QC CONTROL","Use lot-specific instructions"),"Use the freezer-stored approved control. For QC, the sample chamber is filled with control material, not patient blood.","lc-piccolo-single");
 }
 if(/grab|reagent disc|qc disc|inspect/.test(t)){
  return fig("Inspect the intact reagent disc",reference,"The sample entry port is built into the disc. Do not peel or create an opening. Remove only one disc at a time.","lc-piccolo-single");
 }
 if((/load|pipett|sample port|fill chamber|dispense/.test(t))&&!/load the disc|insert.*disc|load.*disc.*start/.test(t)){
  return '<section class="lc-piccolo-prep" aria-label="Two stages of sample loading">'+
   '<div class="lc-prep-heading"><strong>Load the disc '+(q?"with approved QC material":"with blood")+'</strong><p>Fit a fresh disposable tip to the gray 100 µL transfer device. Transfer the approved volume slowly, avoiding bubbles.</p></div>'+
   tile(fig("1 · Before loading",empty,"Sample port and chamber are empty. Use the permanent port near the central hub.")+
   fig("2 · After loading",q?qcDisc:filled,q?"QC fill state is shown in blue-gray to distinguish control material from patient blood. Confirm the required control level and volume.":"Red indicates blood in the chamber after dispensing; verify the molded fill marks."))+
   '<details class="lc-piccolo-tool"><summary>Show gray pipette and disposable tip</summary>'+tool+'</details></section>';
 }
 if(/insert|drawer|analyz|start|click/.test(t)){
  return fig("Insert the filled disc into Piccolo Xpress",'<div class="lc-insert-flow"><div class="lc-insert-disc">'+(q?qcDisc:filled)+'<strong>Prepared disc</strong></div><div class="lc-insert-arrow" aria-hidden="true">➜</div><div class="lc-insert-machine">'+instrument+'<strong>Piccolo Xpress front drawer</strong></div></div>',"Seat the prepared disc level in the open drawer, close it, then select Analyze and verify patient or control details.","lc-piccolo-insert");
 }
 if(/print|result|log/.test(t))return fig("Document the QC or patient result",statusCard("blue","REVIEW RESULTS","Print / file as required"),"Check accepted QC and instrument status before releasing results.","lc-piccolo-single");
 return fig("Confirm analyzer and workflow",instrument,"Use the actual Piccolo prompts and current approved IFU.","lc-piccolo-single");
}
window.LAB_GUIDE_POLISH={piccolo,biofire};
})();