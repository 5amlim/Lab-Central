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
  cards=tile(fig("Pouch and loading-station kit",B&&B.kit?B.kit():statusCard("blue","POUCH KIT","Red sample / blue hydration"),"Confirm the requested panel, pouch, both vials, buffer, pipette, specimen and expiration."))+
    fig("Panel and media",statusCard("blue",panel,isTorch?"GI pouch · Cary Blair stool":"R/ST pouch · UTM or eSwab as permitted"),"Use the kit and specimen type for the ordered assay.");
 }else if(/loading station|prepare pouch/.test(t)){
  cards=tile(fig("Seat the pouch in its station",B&&B.station?B.station("ready"):statusCard("blue","LOADING STATION","Red left / blue right"),"Place the pouch level in the loading station; red sample well LEFT, blue hydration well RIGHT.")+
   fig("Confirm the ports",pouchWithArrow(),"Keep the red sample and blue hydration paths separate. Match the orientation to the actual kit."));
 }else if(/hydrate/.test(t)){
  cards=tile(fig("Blue hydration vial",B&&B.station?B.station("hydrate"):statusCard("blue","HYDRATE","Blue vial and port"),"Unscrew blue vial while leaving its plastic cover in the station. Insert into the blue hydration port, press and wait.")+
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
  cards=tile(fig("Review the completed run",B&&B.analyzer?B.analyzer(id,"results"):statusCard("blue","REVIEW RESULTS","Verify internal controls and identity"),"Read internal control status, sample ID and results; handle incomplete/invalid runs per the assay IFU."));
 }else if(/qc|control/.test(t)){
  cards=tile(fig("Prepare QC in red vial",B&&B.station?B.station("ready"):statusCard("red","QC SAMPLE","Use approved QC materials"),"Use the correct QC positive/negative material and the panel-specific IFU; record the control ID.")+
   fig("Load QC pouch",B&&B.station?B.station("ready"):statusCard("blue","POUCH STATION","Red left / blue right"),"Follow the same blue hydration and red sample paths for both QC levels."));
 }
 return cards?'<section class="lc-biofire-stages" aria-label="'+panel+' illustrated step">'+cards+ref+'</section>':"";
}
if(B){
 B.stageVisual=biofire;
}
function piccoloPatientScreen(){
 const visual=(heading,body,note,wide=false)=>'<div class="lc-pic-screen-panel"><strong>'+heading+'</strong><svg viewBox="0 0 '+(wide?550:420)+' 290" role="img" aria-label="'+heading+' on the Piccolo Xpress touchscreen">'+body+'</svg><small>'+note+'</small></div>';
 const screen=(title,body)=>'<rect x="32" y="13" width="354" height="251" rx="18" fill="#1e3e59" stroke="#517489" stroke-width="5"/>'+
 '<rect x="51" y="35" width="316" height="204" rx="8" fill="#c8e4f4"/>'+
 '<rect x="51" y="35" width="316" height="49" rx="5" fill="#295a83"/>'+
 '<text x="209" y="66" text-anchor="middle" fill="#fff" font-size="21" font-weight="800" font-family="Arial">'+title+'</text>'+body;
 const select=screen('Select Type','<rect x="91" y="106" width="236" height="53" rx="9" fill="#f5d16c" stroke="#b28a20" stroke-width="4"/>'+
 '<text x="209" y="142" text-anchor="middle" font-size="23" font-family="Arial" fill="#264e69" font-weight="850">Patient</text>'+
 '<rect x="91" y="171" width="236" height="45" rx="8" fill="#f7f9fa" stroke="#b0c7d3"/>'+
 '<text x="209" y="201" text-anchor="middle" font-size="21" font-family="Arial" fill="#516e83">Control</text>');
 const nums=['1','2','3','4','5','6','7','8','9','abc','0','Done'];
 const keypad=screen('Enter Sample ID','<rect x="78" y="92" width="264" height="38" rx="7" fill="#f8fcfd" stroke="#aac4d3"/>'+
 '<text x="209" y="119" text-anchor="middle" font-size="20" font-family="Arial" font-weight="850" letter-spacing="3" fill="#52768a">#####</text>'+
 '<path d="M343 108L408 108L434 78" stroke="#188c86" stroke-width="3" fill="none"/>'+
 '<text x="438" y="67" font-size="16" font-family="Arial" font-weight="850" fill="#207f81">VERIFY MRN</text>'+
 nums.map((v,i)=>{const x=82+(i%3)*90,y=140+Math.floor(i/3)*25;return '<rect x="'+x+'" y="'+y+'" width="79" height="23" rx="4" fill="'+(v==='Done'?'#239b8c':'#f4cf68')+'" stroke="'+(v==='Done'?'#18796e':'#b99d48')+'"/>'+
 '<text x="'+(x+39)+'" y="'+(y+16)+'" font-size="13" font-family="Arial" text-anchor="middle" font-weight="800" fill="'+(v==='Done'?'white':'#365468')+'">'+v+'</text>';}).join(''));
 return '<div class="lc-pic-screen-flow">'+visual('1 · Select Patient',select,'Select Patient, not Control.')+visual('2 · Enter MRN, then Done',keypad,'Use the correct patient MRN; verify against the label.',true)+'</div>';
}
function piccoloRunningSvg(){
 // Use the same reference-matched device illustration as the overview and loading step.
 return A?.piccoloDeviceSvg ? A.piccoloDeviceSvg("running") : "";
}

function piccolo(title,group){
 if(!A)return "";
 const t=String(title).toLowerCase(),q=/qc|control/i.test(group)||/qc|control/i.test(t);
 const empty=A.piccoloDiscSvg(false),filled=A.piccoloDiscSvg(true),
 qcDisc=filled.replace(/#b82e40|#a73241|#ea8190|#b5223a/g,'#739fae')
 .replace('Blood visible (red)','Control material visible')
 .replace('red whole blood in curved inner sample chamber','QC control material in curved inner sample chamber');
 // Use one consistent, current sample-port diagram across all Piccolo steps.
 const tool=A.piccoloPipetteSvg();
  const instrument=(A.piccoloVisual("insert the filled disc").match(/<svg[\s\S]*?<\/svg>/)||[])[0]||"";
 if(/analysis is running|confirm analysis|run is running|run in progress/.test(t))return fig("Piccolo Xpress · Analysis in progress",piccoloRunningSvg(),"Check that the analyzer has started processing the disc. A green check marks successful run initiation only. Review final analyzer results and internal QC before reporting.","lc-piccolo-single lc-piccolo-running");
 if(/select patient|enter.*mrn|patient.*sample id/.test(t))return fig("Select Patient and enter patient MRN",piccoloPatientScreen(),"After the drawer is closed, select Patient. Enter the correct patient ID (up to 14 characters), then select Done. Verify the identifier before the analyzer processes the disc.","lc-piccolo-single lc-piccolo-screen-step");
  // Control menu steps use the QC screen walk-through, not another disc-loading drawing.
 if(/click analyze|control\s*>\s*enter|enter 1 for low|enter 2 for high/.test(t))return "";
 if(/within 60|sample time|collection|blood tube/.test(t)){
  return fig("Lithium-heparin whole blood",A.mediaSvg?A.mediaSvg("green"):empty,"Confirm specimen identity and stability per the approved Piccolo SOP.","lc-piccolo-single");
 }
 if(/grab the controls|brt|nod|freezer/.test(t)){
  return fig("Thaw the approved BRT or NOD control set",(A.stepIllustration({id:'piccolo',category:'Analyzers'},'grab the controls','monthly-qc').match(/<svg[\s\S]*?<\/svg>/)||[])[0]||statusCard("blue","QC CONTROL","Use lot-specific instructions"),"Thaw both QC levels (1 and 2) from the selected BRT or NOD set per the lot-specific insert. Use control material, not patient blood, in the disc sample chamber.","lc-piccolo-single");
 }
 if(/grab|reagent disc|qc disc|inspect/.test(t)){
  return fig("Inspect the intact reagent disc",empty,"The sample entry port is built into the disc. Do not peel or create an opening. Remove only one disc at a time.","lc-piccolo-single");
 }
 if((/load|pipett|sample port|fill chamber|dispense/.test(t))&&!/load the disc|insert.*disc|load.*disc.*start/.test(t)){
  return '<section class="lc-piccolo-prep" aria-label="Two stages of sample loading">'+
   '<div class="lc-prep-heading"><strong>Load the disc '+(q?"with approved QC material":"with blood")+'</strong><p>Fit a fresh disposable tip to the gray 100 µL transfer device. Transfer the approved volume slowly, avoiding bubbles.</p></div>'+
   '<div class="lc-piccolo-one-visual">'+
   fig("100 µL pipette + new disposable tip",tool,"Fit the disposable tip, aspirate approximately 100 µL without bubbles, and dispense through the permanent sample port.")+
   '<div class="lc-piccolo-disc-pair">'+
   fig("1 · Before loading",empty,"Empty sample port and chamber.")+
   fig("2 · After loading",q?qcDisc:filled,q?"Fill the sample chamber with the approved control material, not patient blood.":"Confirm sample is at the molded fill mark. Avoid bubbles in the sample chamber.")+'</div></div></section>';
 }
 if(/load the disc|insert|drawer|analyz|start|click/.test(t)){
  return fig("Insert the filled disc into Piccolo Xpress",'<div class="lc-insert-flow"><div class="lc-insert-disc">'+(q?qcDisc:filled)+'<strong>Prepared disc</strong></div><div class="lc-insert-arrow" aria-hidden="true">➜</div><div class="lc-insert-machine">'+instrument+'<strong>Piccolo Xpress front drawer</strong></div></div>',"Select Analyze to open the drawer, seat the prepared disc, and select Close. Next, choose Patient and enter the patient MRN.","lc-piccolo-insert");
 }
 if(/print|result|log/.test(t))return (window.LAB_QC_GUIDE?.printStep?.("piccolo")||fig("Document the QC or patient result",statusCard("blue","REVIEW RESULTS","Print / file as required"),"Check accepted QC and instrument status before releasing results.","lc-piccolo-single"));
 return fig("Confirm analyzer and workflow",instrument,"Use the actual Piccolo prompts and current approved IFU.","lc-piccolo-single");
}
window.LAB_GUIDE_POLISH={piccolo,biofire};
})();