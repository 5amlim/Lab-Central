/* Instrument QC screen and binder teaching references.
   These are schematic illustrations, not functional analyzer interfaces.
   Screen choices and printer capabilities are verified where the listed
   manufacturer guidance is available; the local approved SOP governs. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
const configs={
 sysmex:{brand:"SYSMEX pocH-100i",binder:"pocH Daily Control Log · Maintenance Log binder",steps:[
  {kind:"mainMenu",heading:"Open QC from Menu",tip:"From the Main screen select Menu, then QC."},
  {kind:"qcFiles",heading:"Choose the QC level",tip:"Select QC1 / Low, QC2 / Normal, or QC3 / High. Verify the correct file, lot and control level before printing."},
  {heading:"Open the print menu",screen:"QUALITY CONTROL CHART",items:["Print","File","Setup"],focus:"Print",tip:"With the desired QC file displayed, select Print."},
  {heading:"Print the selected level",screen:"PRINT CONTROL CHART",items:["Chart","Current","Cancel"],focus:"Current",tip:"Select Current for the chosen QC file. Repeat file selection and printing separately for QC1, QC2 and QC3; Chart prints the full chart instead."}
 ],note:"Print the accepted QC1 (Low), QC2 (Normal) and QC3 (High) control records one by one. File the startup blank-check report separately in the pocH blank-check log; retain new-lot comparison records in the validation log until the approved transition is complete."},
 piccolo:{brand:"Piccolo Xpress",binder:"Monthly QC Log binder",steps:[
  {kind:"piccoloRecall",heading:"Open Recall",screen:"Recall",tip:"From Home, tap Recall. Select Last Disc for the latest run, or Browse to locate an earlier QC run."},
  {kind:"piccoloResultsList",heading:"Choose the QC result",screen:"All Results Sorted by Date",tip:"Select the correct C (Control) result by date and ID, not a P (Patient) result."},
  {kind:"piccoloViewResult",heading:"Open result and Print",screen:"View Result",tip:"Check the correct control level and date, then tap Print on the result preview."},
  {kind:"piccoloSelectReport",heading:"Choose Results to reprint",screen:"Select Report",tip:"Leave Print checked and select Results. iQC is a separate internal QC report."}
 ],note:"The analyzer prints control results automatically. Reprint only when needed. Review and file acceptable results for both QC levels in the Monthly QC Log."},
 triage:{brand:"Triage MeterPro",binder:"Triage Daily or Monthly QC Log · Maintenance binder",steps:[
  {heading:"Recall the run",screen:"MAIN MENU",items:["RUN TEST","RECALL RESULTS","OPTIONS"],focus:"RECALL RESULTS",tip:"For a just-finished run, the meter's printer key can print the displayed result."},
  {heading:"Choose the QC report",screen:"RECALL RESULTS",items:["QC RESULTS","PRINT ALL RESULTS","PATIENT RESULTS"],focus:"PRINT ALL RESULTS",tip:"Select QC Device Results or QC Sample Results as appropriate."},
  {heading:"Print the correct QC type",screen:"PRINT ALL RESULTS",items:["QC DEVICE RESULTS","QC SAMPLE RESULTS","PATIENT RESULTS"],focus:"QC DEVICE RESULTS",tip:"Select the appropriate category, then press the physical printer key."}
 ],note:"Daily QC Device and monthly QC Sample printouts go in their respective log sections. Do not substitute patient-test printouts."},
 clinitek:{brand:"Siemens CLINITEK Status+",binder:"Monthly UA or hCG QC Log binder",steps:[
  {heading:"Open saved results",screen:"SELECT READY",items:["Strip Test","Cassette Test","Recall Results"],focus:"Recall Results",tip:"If configured, the built-in printer may already have printed the QC result."},
  {heading:"Find the control record",screen:"RECALL OPTIONS",items:["Recall Results","Select","Back"],focus:"Recall Results",tip:"Select the correct QC run. Some configurations store QC as a patient-type record."},
  {heading:"Print the selected record",screen:"STORED RESULT",items:["Print","Done","More"],focus:"Print",tip:"Check QC identification and lot before filing."}
 ],note:"File UA strip and hCG cassette controls in the correct monthly section. Verify that the record is labeled as QC, not a patient report."},
 sofia:{brand:"Quidel Sofia 2",binder:"Waived Tests QC Log binder",steps:[
  {heading:"Open stored control results",screen:"MAIN MENU",items:["Run QC","Review Data","Run Calibration"],focus:"Review Data",tip:"QC results can also be printed from the completion screen."},
  {heading:"Select the QC result",screen:"REVIEW DATA",items:["Patient Results","QC Results","Calibration Results"],focus:"QC Results",tip:"Verify assay, lot and positive/negative control."},
  {heading:"Print if connected",screen:"QC RESULTS",items:["Details","Print icon","Home"],focus:"Print icon",tip:"A compatible connected printer is optional. If absent, use an approved QC record."}
 ],note:"Record positive and negative controls in the waived QC log. An attached printer is required to produce an analyzer paper printout."},
 torch:{brand:"BioFire TORCH",binder:"Monthly Molecular QC Log binder",steps:[
  {heading:"Open completed run",screen:"DASHBOARD",items:["Dashboard","Browse Runs","Settings"],focus:"Browse Runs",tip:"Choose the QC control run by assay and date."},
  {heading:"Review the QC report",screen:"COMPLETED RUN",items:["Summary","Details","Print"],focus:"Print",tip:"A completed run report can be opened from the Finished module or Browse Runs."},
  {heading:"Print the report",screen:"RUN REPORT",items:["Print","Print All","Save"],focus:"Print",tip:"Print or save the required complete run report per approved QC practice."}
 ],note:"File the positive/negative run report in the molecular QC section. Keep control identity and result associated with the right pouch lot."},
 spotfire:{brand:"BioFire SPOTFIRE",binder:"Monthly Molecular QC Log binder",steps:[
  {heading:"Open the control library",screen:"HOME",items:["Patient Test Results","Quality Control","Settings"],focus:"Quality Control",tip:"Select the finished QC run in the Quality Control section."},
  {heading:"Open the result report",screen:"QUALITY CONTROL",items:["Completed QC","Details","Home"],focus:"Completed QC",tip:"Review the correct control and panel."},
  {heading:"Print the report",screen:"QC RESULT",items:["Print","Show Details","Options"],focus:"Print",tip:"Use the Print control shown in the report action bar."}
 ],note:"File the positive and negative control records under the appropriate respiratory/sore-throat QC section."},
 coagsense:{brand:"Coag-Sense PT/INR",binder:"Coag-Sense QC binder",steps:[
  {heading:"Review the control run",screen:"QC RESULT",items:["Review","History","Printer icon"],focus:"Printer icon",tip:"Open the individual QC result using the instrument's approved result-history workflow."},
  {heading:"Print if supported",screen:"PRINT RESULT",items:["Print","Back"],focus:"Print",tip:"Printing requires a compatible optional portable printer, configured and connected."}
 ],note:"If no compatible printer is installed, create and file the approved QC record instead. Do not invent a paper printout."},
 pathfast:{brand:"PATHFAST",binder:"PATHFAST Calibration + QC binder",steps:[
  {heading:"Collect automatic printouts",screen:"ASSAY / HOME",items:["Calibration report","QC 1 / QC 2","CHECK"],focus:"Calibration report",tip:"The analyzer's built-in printer normally prints calibration and QC results after the run."},
  {heading:"Open saved records if a reprint is needed",screen:"ASSAY / HOME",items:["START","CHECK","SETUP"],focus:"CHECK",tip:"Select CHECK from the home screen to access stored QC and calibration records."},
  {heading:"Choose QC or calibration",screen:"CHECK",items:["RESULT CHECK","QC CHECK","CAL CHECK"],focus:"QC CHECK",tip:"Choose QC CHECK to review/reprint controls; CAL CHECK for calibration data."},
  {heading:"Reprint the selected record",screen:"QC / CAL RECORD",items:["Print","Back"],focus:"Print",tip:"Select the correct assay, lot, date, and result, then print per the analyzer screen."}
 ],note:"Keep the CAL result and both QC levels for each assay/lot together. Confirm QC acceptability and the gray/ready status before returning to patient testing."},
 generic:{brand:"Instrument QC",binder:"Approved QC / Maintenance binder",steps:[
  {heading:"Locate the control result",screen:"RESULTS / QC",items:["Review QC","Results","History"],focus:"Review QC",tip:"Use the current instrument's approved QC-results workflow."},
  {heading:"Print or export",screen:"QC RESULT",items:["Print (if supported)","Export","Back"],focus:"Print (if supported)",tip:"Button labels are illustrative; some instruments require an external printer or electronic log."}
 ],note:"If the instrument cannot produce a paper printout, use the approved electronic QC record or authorized print/export procedure. Do not file patient results in the QC binder."}
};
function getConfig(id){return configs[id]||configs.generic;}
function isQcGroup(sec,group){
 if(!sec||!group||sec.archived||!["Analyzers","Point of care"].includes(sec.category))return false;
 return /\bqc\b|\bquality control\b/i.test(group.title) && !/\bnotes\b|reference/i.test(group.title);
}
function screenPanel(item,brand,number){
 const top='<div class="qc-visual-top"><span>SCREEN '+String(number).padStart(2,"0")+'</span><strong>'+esc(item.heading)+'</strong></div>';
 const isPiccoloScene=/^piccolo(?:Home|Load|Type|Level|PatientId|Running|Recall|ResultsList|ViewResult|SelectReport)$/.test(item.kind||"");
 const isPoch=brand==="Sysmex pocH-100i";
 const header=isPiccoloScene
  ?'<div class="qc-device-screen-top qc-px-screen-top"><strong>'+esc(item.screen)+'</strong></div>'
  :isPoch?'<div class="qc-device-screen-top qc-poch-top"><strong>sysmex</strong><small>Ready · Top</small></div>':'<div class="qc-device-screen-top"><strong>'+esc(brand)+'</strong><small>MENU REFERENCE</small></div>';
 let body="";
 if(item.kind==="piccoloHome"){
  // Match the actual Piccolo Home screen: one yellow Analyze action with small utility icons.
  body='<div class="qc-px-home-body"><div class="qc-px-yellow-button">Analyze</div>'+
   '<div class="qc-px-home-tools"><span aria-hidden="true">▣</span><span aria-hidden="true">☞</span></div></div>'+
   '<div class="qc-px-screen-footer">HOME</div>';
 }else if(item.kind==="piccoloLoad"){
  // Verified Load Disc prompt and blue Close bar from manufacturer literature.
  body='<div class="qc-px-load-body"><p>Close drawer to<br>analyze a sample</p>'+
   '<span class="qc-px-help-icon" aria-hidden="true">i</span></div>'+
   '<div class="qc-px-blue-button">Close</div>';
 }else if(item.kind==="piccoloType"){
  body='<div class="qc-px-type-body"><div class="qc-px-type-choice'+(item.patient?' qc-px-type-active':'')+'">Patient</div>'+
   '<div class="qc-px-type-choice'+(!item.patient?' qc-px-type-active':'')+'">Control</div>'+
   '<div class="qc-px-type-cancel">Cancel</div></div>';
 }else if(item.kind==="piccoloLevel"){
  // 1 or 2 is entered by the operator, never selected from a prepopulated level list.
  body='<div class="qc-px-level-body"><div class="qc-px-level-field"><strong>1</strong></div>'+
   '<div class="qc-px-keypad">'+["1","2","3","4","5","6","7","8","9","◂","0","▸"].map(v=>'<span>'+v+'</span>').join("")+'</div>'+
   '<div class="qc-px-keypad-actions"><span>Cancel</span><b>Enter</b></div></div>';
 }else if(item.kind==="piccoloPatientId"){
  body='<div class="qc-px-level-body"><div class="qc-px-level-field"><strong>#####</strong></div>'+
   '<div class="qc-px-keypad">'+["1","2","3","4","5","6","7","8","9","←","0","→"].map(v=>'<span>'+esc(v)+'</span>').join("")+'</div>'+
   '<div class="qc-px-keypad-actions"><span>Cancel</span><b>Done</b></div></div>';
 }else if(item.kind==="piccoloRunning"){
  body='<div class="qc-px-running-body"><div class="qc-px-running-disc" aria-hidden="true">◉</div>'+
   '<strong>Analyzing sample...</strong><small>QC run in progress</small></div>';
 }else if(item.kind==="piccoloRecall"){
  body='<div class="qc-px-recall-menu">'+["Last Disc","Search","Browse","Transmit Date Range","Transmit All"].map(v=>
   '<div class="qc-px-amber-choice'+(v==="Browse"?' qc-px-amber-selected':'')+'">'+esc(v)+'</div>').join("")+
   '</div><div class="qc-px-blue-footer"><span>Home</span></div>';
 }else if(item.kind==="piccoloResultsList"){
  const records=[["C","30 Oct","QC-LEVEL-1"],["C","30 Oct","QC-LEVEL-2"],["E","29 Oct","EXAMPLE-ERR"],["P","29 Oct","SAMPLE-001"]];
  body='<div class="qc-px-results-table">'+records.map((row,i)=>
   '<div class="qc-px-results-row'+(i===0?' qc-px-results-selected':'')+'"><b>'+esc(row[0])+'</b><span>'+esc(row[1])+'</span><span>'+esc(row[2])+'</span></div>').join("")+
   '</div><div class="qc-px-arrow-row"><span>△</span><span>▽</span></div>'+
   '<div class="qc-px-blue-footer"><span>Back</span><span>Home</span></div>';
 }else if(item.kind==="piccoloViewResult"){
  const report=["piccolo xpress","Control Result","30 Oct 2026  10:24","Sample Type: Control","Control ID: QC-LEVEL-1","Disc Lot: EXAMPLE","QC OK"].join("\n");
  body='<div class="qc-px-preview"><pre>'+esc(report)+'</pre></div>'+
   '<div class="qc-px-arrow-row"><span>△</span><span>▽</span></div>'+
   '<div class="qc-px-blue-footer"><span>Back</span><span>Home</span><span class="qc-px-print-focus">Print</span></div>';
 }else if(item.kind==="piccoloSelectReport"){
  body='<div class="qc-px-report-options">'+["All","Results","iQC","Error Report"].map(v=>
   '<div class="qc-px-amber-choice'+(v==="Results"?' qc-px-amber-selected':'')+'">'+esc(v)+'</div>').join("")+
   '</div><div class="qc-px-report-method"><span class="qc-px-checked">☑ Print</span><span>☐ Xmit</span></div>'+
   '<div class="qc-px-blue-footer"><span>Back</span><span>Home</span></div>';
 }else if(item.kind==="status"){
  // Startup is a passive system display, not a set of selectable actions.
  body='<div class="qc-device-state"><div class="qc-device-state-title">'+esc(item.screen)+'</div>'+
   '<div class="qc-device-state-message"><span class="qc-device-state-indicator" aria-hidden="true"></span>'+
   '<strong>'+esc(item.status)+'</strong><span>'+esc(item.detail)+'</span></div>'+
   '<div class="qc-device-state-note">AUTOMATIC PROCESS · NO TOUCHSCREEN ACTION</div></div>';
 }else if(item.kind==="qcFiles"){
  // File labels are teaching aliases for the laboratory's Low, Normal and High QC files.
  body='<div class="qc-device-screen-label">QUALITY CONTROL · SELECT FILE</div>'+
   '<div class="qc-device-file-options"><div class="qc-device-file-choice selected"><strong>QC1</strong><span>Low control</span><small>FILE 1</small></div>'+
   '<div class="qc-device-file-choice"><strong>QC2</strong><span>Normal control</span><small>FILE 2</small></div>'+
   '<div class="qc-device-file-choice"><strong>QC3</strong><span>High control</span><small>FILE 3</small></div></div>'+
   '<div class="qc-device-screen-bottom"><span>Choose the correct active file</span><span>One level at a time</span></div>';
 }else if(item.kind==="qcLot"){
  body='<div class="qc-device-screen-label">SET QC · SELECT FILE / LOT</div>'+
   '<div class="qc-device-qcfile-label">QC1 / Low <span>File [1] · repeat for QC2 and QC3</span></div>'+
   '<div class="qc-device-scan-form"><div><strong>Lot ID</strong><span class="qc-device-barcode" aria-hidden="true"></span><em>Scan lot barcode</em></div>'+
   '<div><strong>Expire</strong><span class="qc-device-barcode" aria-hidden="true"></span><em>Scan / enter expiry</em></div></div>'+
   '<div class="qc-device-screen-bottom"><span>Verify package insert</span><span>NEXT →</span></div>';
 }else if(item.kind==="qcAnalytes"){
  const rows=["WBC","RBC","HGB","HCT","MCV"];
  body='<div class="qc-device-screen-label">SET QC · FILE [1] · TARGET / LIMIT</div>'+
   '<div class="qc-device-parameter-table"><div class="qc-device-param-heading"><b>PARAMETER</b><b>TARGET</b><b>LIMIT</b></div>'+
   rows.map(x=>'<div class="qc-device-param-row"><strong>'+x+'</strong><span class="qc-device-barcode" aria-label="Scan target barcode"></span><span class="qc-device-barcode" aria-label="Scan limit barcode"></span></div>').join("")+'</div>'+
   '<div class="qc-device-screen-bottom"><span>Use the matching lot assay sheet</span><span>NEXT → MORE ANALYTES</span></div>';
 }else if(item.kind==="piccoloClose"){
  // Closing the drawer is the final manual action and immediately starts QC analysis.
  body='<div class="qc-device-screen-label">CONTROL · READY</div>'+
   '<div class="qc-piccolo-close-action"><span class="qc-piccolo-close-status">Level confirmed</span>'+
   '<span class="qc-device-option targeted">Close <b>SELECT</b></span>'+
   '<span class="qc-piccolo-close-running">Drawer closes → QC analysis starts</span></div>'+
   '<div class="qc-device-screen-bottom"><span>Confirm entered level</span><span>Then select Close</span></div>';
 }else if(item.kind==="singleAction"){
  // Piccolo Home has Analyze as its only text action.
  body='<div class="qc-device-screen-label">'+esc(item.screen)+'</div>'+
   '<div class="qc-piccolo-single-action"><span class="qc-device-option targeted">Analyze <b>SELECT</b></span></div>';
 }else if(item.kind==="manualLevel"){
  // Piccolo QC uses a typed numeric control level, not a menu of level choices.
  body='<div class="qc-device-screen-label">CONTROL · ENTER LEVEL</div>'+
   '<div class="qc-piccolo-level-entry"><span class="qc-piccolo-entry-caption">Control level</span>'+
   '<div class="qc-piccolo-entry-field"><strong>1</strong></div>'+
   '<p class="qc-piccolo-entry-help"><b>1</b> = Low control <span>·</span> <b>2</b> = High control</p>'+
   '<div class="qc-piccolo-entry-confirm">Enter <b>CONFIRM</b></div></div>'+
   '<div class="qc-device-screen-bottom"><span>Type 1 or 2</span><span>Then press Enter</span></div>';
 }else if(item.kind==="qcSave"){
  body='<div class="qc-device-screen-label">SET QC · CHECK ALL PARAMETERS</div>'+
   '<div class="qc-device-save-summary"><strong>Review all target and limit entries</strong><p>Use the arrows to review the remaining parameter pages. Do not enter sample values as QC targets.</p>'+
   '<span class="qc-device-save-highlight">SAVE <b>SELECT</b></span><span>Confirm the save message with OK</span></div>'+
   '<div class="qc-device-screen-bottom"><span>Then repeat for each active QC file</span><span>TOP</span></div>';
 }else if(item.kind==="mainMenu"){
  // Illustrate the Main screen and its actual navigation target before Str. Data.
  body='<div class="qc-device-mainbar"><span>MAIN · WB</span><strong class="qc-device-menu-highlight">MENU <b>SELECT</b></strong></div>'+
   '<div class="qc-device-mainstate"><span>Ready</span><span>Sample ID <b>#####</b></span></div>'+
   '<div class="qc-device-mainmodes"><span>WB</span><span>PD</span><span>RUN</span></div>'+
   '<div class="qc-device-mainfooter"><span>QC</span><span>Result</span><span>Shutdown</span></div>';
 }else if(item.kind==="pochPhysical"){
  body='<div class="qc-poch-physical"><strong>'+esc(item.title||"Prepare supplies")+'</strong>'+
   '<p>'+esc(item.detail||"Follow the approved physical handling instructions.")+'</p>'+
   '<div class="qc-poch-physical-labels">'+(item.labels||[]).map(value=>'<span>'+esc(value)+'</span>').join("")+'</div></div>';
 }else if(item.kind==="pochStatus"){
  body='<div class="qc-poch-status"><strong>'+esc(item.title||"Operation in progress")+'</strong>'+
   '<p>'+esc(item.detail||"Wait for the completion prompt.")+'</p>'+
   '<span>Automatic process</span></div>';
 }else if(isPoch&&Array.isArray(item.items)){
  // Schematic based on the pocH-100i IFU's pastel-color two-column operator buttons.
  body='<div class="qc-poch-menu-label">'+esc(item.screen||"MAIN")+'</div>'+
   '<div class="qc-poch-options">'+item.items.map((value,i)=>
    '<span class="qc-poch-option'+(value===item.focus?' active':'')+'"><b>'+esc(value)+'</b>'+(value===item.focus?'<em>SELECT</em>':'')+'</span>').join("")+
   '</div><div class="qc-poch-bottom"><span>Back</span><span>Top</span></div>';
 }else{
  body='<div class="qc-device-screen-label">'+esc(item.screen)+'</div><div class="qc-device-options">'+
   item.items.map(x=>'<span class="qc-device-option'+(x===item.focus?' targeted':'')+'">'+esc(x)+(x===item.focus?'<b>SELECT</b>':'')+'</span>').join("")+'</div>'+
   '<div class="qc-device-screen-bottom"><span>Back</span><span>Review selected action</span></div>';
 }
 return '<div class="qc-screen-reference" role="group" aria-label="Illustrated '+esc(brand)+' screen: '+esc(item.heading)+'">'+
  top+'<div class="qc-device-face"><div class="qc-device-screen'+(item.kind==="status"?' qc-device-screen--status':'')+(isPiccoloScene?' qc-device-screen--piccolo':'')+'">'+header+body+'</div></div>'+
  '<p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
}
function screenGallery(list,brand,options={}){
 const scroll=options.scroll===true;
 const scrollCueOnly=scroll&&options.scrollCueOnly===true;
 const cards=list.map((x,i)=>{
  const html=screenPanel(x,brand,i+1);
  if(!scroll||i===list.length-1||scrollCueOnly)return html;
  const closing=html.lastIndexOf('</p></div>');
  return closing<0?html:html.slice(0,closing)+'</p><button class="qc-gallery-more" type="button" aria-label="Show screen '+String(i+2)+'">More <span aria-hidden="true">→</span></button></div>'+html.slice(closing+10);
 }).join("");
 return '<div class="qc-screen-gallery'+(scroll?' qc-screen-gallery--scroll':'')+(scrollCueOnly?' qc-screen-gallery--cue-only':'')+(options.piccolo?' qc-screen-gallery--piccolo':'')+'"'+
  (scroll?' role="region" aria-label="Scrollable '+esc(brand)+' screen sequence" tabindex="0"':'')+'>'+
  cards+'</div>'+
  (scrollCueOnly&&list.length>2?'<div class="qc-gallery-scroll-hint" aria-hidden="true"><span class="qc-gallery-scroll-hint-line"></span><span>Scroll horizontally to see the next screens</span><span class="qc-gallery-scroll-hint-arrow">→</span></div>':'')+
  '<p class="qc-illustration-disclaimer">'+esc(options.disclaimer||"Confirm the correct menu, assay, lot and QC level on the analyzer before printing.")+'</p>';
}
if(!window.__labQcGalleryMoreBound){
 window.__labQcGalleryMoreBound=true;
 document.addEventListener('click',function(event){
  const button=event.target.closest?.('.qc-gallery-more');
  if(!button)return;
  const card=button.closest('.qc-screen-reference'),next=card?.nextElementSibling;
  if(next?.classList?.contains('qc-screen-reference')){
   const gallery=card.parentElement;
   gallery.scrollBy({left:next.getBoundingClientRect().left-card.getBoundingClientRect().left,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
   next.setAttribute('tabindex','-1');
   next.focus({preventScroll:true});
  }
 });
}
function piccoloPatientLoadStep(){
 const scenes=[
  {kind:"piccoloHome",heading:"Select Analyze",screen:"Home",tip:"Select Analyze to open the disc drawer."},
  {kind:"piccoloLoad",heading:"Insert disc and Close",screen:"Load Disc",tip:"Seat the prepared disc, barcode up, then select Close."},
  {kind:"piccoloType",heading:"Choose Patient",screen:"Select Type",patient:true,tip:"Select Patient when prompted. Control is only for QC."},
  {kind:"piccoloPatientId",heading:"Enter patient ID",screen:"Enter Sample ID",tip:"Enter and verify the patient's MRN or approved sample ID. Select Done."}
 ];
 return '<section class="qc-patient-load-sequence" aria-label="Piccolo patient sample touchscreen sequence">'+
  '<div class="qc-patient-sequence-head"><strong>Follow the analyzer screens</strong><span>Select More or swipe right to continue</span></div>'+
  screenGallery(scenes,"Piccolo Xpress",{scroll:true,piccolo:true,disclaimer:"Screens are manufacturer-informed illustrations. Confirm prompts on your analyzer."})+
  '</section>';
}
function sysmexStep(sec,group,title){
 if(sec.id!=="sysmex"||group!=="daily-qc")return "";
 const t=String(title).toLowerCase();
 if(/perform (daily )?shutdown/.test(t))return '<div class="qc-instrument-walkthrough"><div class="qc-walkthrough-title"><b>01</b><div><strong>Complete shutdown, then restart for QC</strong><p>Perform the analyzer’s cleaning shutdown while powered on. Wait for completion before switching off.</p></div></div>'+
 screenGallery([
  {heading:"Select shutdown",screen:"MAIN",items:["QC","Result","Shutdown"],focus:"Shutdown",tip:"On the main analyzer screen, select Shutdown."},
  {heading:"Confirm the sequence",screen:"SHUTDOWN",items:["Execute","Cancel"],focus:"Execute",tip:"Select Execute. Wait through the approximate two-minute cycle."},
  {heading:"Shutdown complete",screen:"SHUTDOWN COMPLETE",items:["Remove tube from sample position","Switch OFF main power","Restart (if selected)"],focus:"",tip:"Follow the completion message and use the physical main power switch, not a touchscreen button. Restart for daily QC."}
 ],"Sysmex pocH-100i")+'</div>';
 if(/turn on the sysmex|start.*analyzer|startup blank check/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {kind:"status",heading:"Power on the analyzer",screen:"INITIALIZING",status:"System starting",detail:"Please wait",tip:"Turn on the physical power switch after the completed shutdown. The analyzer initializes automatically."},
  {kind:"status",heading:"Wait for blank check",screen:"STARTUP BLANK CHECK",status:"Blank check in progress",detail:"Wait for the ready indication",tip:"No touchscreen action is needed. Wait for completion and confirm readiness before QC."}
 ],"Sysmex pocH-100i")+'</div>';
 if(/go to menu|blank check.*today/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {kind:"mainMenu",heading:"Open the Main screen",screen:"MAIN",tip:"On the ready Main screen, select the highlighted Menu button."},
  {heading:"Open stored data",screen:"MAIN / MENU",items:["QC","Str. Data","Maintenance"],focus:"Str. Data",tip:"In Menu, select Str. Data."},
  {heading:"Choose today's blank",screen:"STORED DATA",items:["__BLANK CHECK__","Other stored result","Back"],focus:"__BLANK CHECK__",tip:"Select the blank-check record bearing today’s date."},
  {heading:"Print the report",screen:"BLANK CHECK RESULT",items:["Print","Back"],focus:"Print",tip:"Press Print and file with the date/name in the blank-check section of the Maintenance Log binder."}
 ],"Sysmex pocH-100i",{scroll:true})+'</div>';
 if(/new qc lot|register a new qc lot|parallel qc|lot-to-lot comparison|lot is expired/.test(t))return '<div class="qc-instrument-walkthrough lc-poc-lot-setup">'+
 '<div class="lc-poc-lot-intro"><strong>Enter the new QC lot and control ranges</strong><span>Menu → QC → select file → Setup. This illustrates the analyzer workflow, not a working barcode input.</span></div>'+
 screenGallery([
  {kind:"qcFiles",heading:"Open QC setup and select file",tip:"Open Menu → QC, choose the correct QC file, then select Setup. Keep the old valid lot records available during the approved comparison."},
  {kind:"qcLot",heading:"Scan lot ID and expiration",tip:"Scan the lot barcode and enter/verify the expiration date for the selected control level. Confirm both against the manufacturer sheet."},
  {kind:"qcAnalytes",heading:"Scan each analyte target and limit",tip:"For WBC, RBC, HGB, HCT, MCV and every parameter on the subsequent pages, scan each TARGET and LIMIT barcode on the matching control lot assay sheet. No sample result or made-up range belongs here."},
  {kind:"qcSave",heading:"Save and repeat for all three levels",tip:"Use the arrows to review the remaining parameter screens, select Save and confirm OK. Repeat the same setup for QC1, QC2 and QC3. Use nonexpired lots for any parallel comparison."}
 ],"Sysmex pocH-100i",{scroll:true})+
 '<p class="lc-poc-lot-caution">Only compare the old and new lots when both materials are within their labeled stability and expiration. Follow the approved lot-to-lot acceptance criteria before switching.</p></div>';
 if(/^run (the )?qc/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {heading:"Open QC and check the lot",screen:"MAIN",items:["QC","Result","Shutdown"],focus:"QC",tip:"Select QC, choose the correct Low / Normal / High file and verify the control lot."},
  {kind:"qcFiles",heading:"Select QC1, QC2 or QC3",tip:"Choose the correct active QC file: QC1 Low, QC2 Normal or QC3 High. Verify lot and expiration."},
  {heading:"Run the selected QC level",screen:"QC FILE",items:["Run","Back"],focus:"Run",tip:"Mix material per approved EIGHTCHECK instructions, load it using the green QC adapter and select Run."},
  {heading:"Accept and print result",screen:"QC RESULT",items:["Quit","Print (if needed)","Back"],focus:"Quit",tip:"Select Quit after reviewing results; printout is generated automatically when the printer option is configured."}
 ],"Sysmex pocH-100i",{scroll:true})+'</div>';
 return "";
}
function qcClickStep(sec,groupId,title){
 const base=sysmexStep(sec,groupId,title);
 if(base)return base;
 if(!sec||!title)return "";
 const t=String(title).toLowerCase();
 let scenes=null;
 if(sec.id==="piccolo"&&/^(run qc|click analyze)/.test(t))scenes=[
  {kind:"piccoloHome",heading:"Select Analyze",screen:"Home",tip:"Select Analyze to open the disc drawer."},
  {kind:"piccoloLoad",heading:"Insert disc and Close",screen:"Load Disc",tip:"Place the prepared QC disc in the open drawer, barcode up. Select Close to begin analysis."},
  {kind:"piccoloType",heading:"Select Control",screen:"Select Type",tip:"When prompted after closing the drawer, select Control, not Patient."},
  {kind:"piccoloLevel",heading:"Enter QC level",screen:"Enter Sample ID",tip:"Enter 1 for Low or 2 for High using the numeric keypad, then confirm the entry."},
  {kind:"piccoloRunning",heading:"Confirm QC is running",screen:"Analysis",tip:"The analyzer verifies the disc and processes the control. Review the automatic printout when finished."}];
 else if(sec.id==="triage"&&/select run test|click run test/.test(t))scenes=[
  {heading:"Open QC testing",screen:"MAIN MENU",items:["RUN TEST","RECALL RESULTS","OPTIONS"],focus:"RUN TEST",tip:"Choose RUN TEST."},
  {heading:"Choose the QC mode",screen:"RUN TEST",items:["QC DEVICE","QC SAMPLE","PATIENT"],focus:/device/.test(t)?"QC DEVICE":"QC SAMPLE",tip:"Use QC DEVICE for daily electronic control or QC SAMPLE for external control levels."},
  {heading:"Confirm and run",screen:"QC",items:["Lot / ID","Enter","Run"],focus:"Run",tip:"Verify prompted identifiers or lot codes, insert the correct test device, and proceed as directed."}];
 else if(sec.id==="clinitek"&&/open the (ua|hcg)|qc test|place cassette and select start/.test(t))scenes=[
  {heading:"Enter the QC workflow",screen:"SELECT READY",items:["QC Test","Strip Test","Cassette Test"],focus:"QC Test",tip:"Select QC Test if shown, or the authorized QC workflow on your analyzer."},
  {heading:"Choose assay format",screen:"QC TEST",items:["UA strip","hCG cassette","Back"],focus:groupId==="hcg-qc"?"hCG cassette":"UA strip",tip:"Match the QC material to the correct strip or cassette format."},
  {heading:"Start the QC run",screen:"QC READY",items:["Lot / Level","Start","Back"],focus:"Start",tip:"Confirm identifiers and select START before applying material within the allowed timing window."}];
 else if(sec.id==="sofia"&&/run the controls|run qc|log the qc/.test(t))scenes=[
  {heading:"Start external controls",screen:"MAIN MENU",items:["Run Test","Run QC","Review Data"],focus:"Run QC",tip:"Select Run QC and scan the assay-specific QC barcode."},
  {heading:"Follow QC prompts",screen:"RUN QC",items:["Positive control","Next","Negative control"],focus:"Positive control",tip:"Run the positive control, then follow the on-screen Next control to complete the negative control; do not skip it."}];
 else if(sec.id==="spotfire"&&/grab the controls|select the qc tab/.test(t))scenes=[
  {heading:"Open the QC section",screen:"HOME",items:["Patient Test Results","Quality Control","Settings"],focus:"Quality Control",tip:"Select Quality Control at the top or side of the workstation screen."},
  {heading:"Choose the required control",screen:"QUALITY CONTROL",items:["Positive","Negative","View Results"],focus:"Positive",tip:"Complete the correct positive and negative control runs using the displayed instructions."}];
 else if(sec.id==="torch"&&/confirm qc sample name|enter qc sample name|start the control/.test(t))scenes=[
  {heading:"Identify the QC sample",screen:"RUN SETUP",items:["Sample Name","Pouch barcode","Start Run"],focus:"Sample Name",tip:"Identify the run using the approved QC Sample Name, rather than a patient MRN."},
  {heading:"Start the control",screen:"RUN CONFIRMATION",items:["Review QC name","Confirm pouch","Start Run"],focus:"Start Run",tip:"Verify pouch/control identity before selecting Start Run."}];
 if(!scenes)return "";
 return '<div class="qc-instrument-walkthrough">'+
 (sec.id==="piccolo"?'<p class="qc-px-scroll-cue">Scroll right to see every screen <span aria-hidden="true">→</span></p>':'')+
 screenGallery(scenes,getConfig(sec.id).brand,{scroll:sec.id==="piccolo",piccolo:sec.id==="piccolo",disclaimer:sec.id==="piccolo"?"Screen layout is based on the manufacturer guide. Close starts the run; then select Control and enter the level when prompted.":null})+'</div>';
}
function binderSvg(){
 return '<svg class="qc-binder-art" viewBox="0 0 490 280" role="img" aria-label="Illustration of printed QC report being placed into a labeled ring binder">'+
 '<ellipse cx="244" cy="259" rx="215" ry="13" fill="#dce8eb"/>'+
 '<rect x="26" y="74" width="128" height="104" rx="12" fill="#dceaf0" stroke="#88a9b8" stroke-width="4"/>'+
 '<rect x="41" y="58" width="98" height="36" rx="6" fill="#f7fbfd" stroke="#91adbb" stroke-width="3"/>'+
 '<rect x="47" y="101" width="85" height="42" rx="4" fill="#f8fcff" stroke="#8aa6b7"/>'+
 '<path d="M54 117 H126 M54 126 H111 M54 135 H116" stroke="#80a4b3" stroke-width="3"/>'+
 '<text x="89" y="158" text-anchor="middle" font-family="Arial" font-size="14" font-weight="800" fill="#416b7b">PRINTER</text>'+
 '<path d="M163 127 H229 M215 116 L230 127 L215 139" fill="none" stroke="#26958c" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<g transform="rotate(-8 261 132)"><rect x="223" y="57" width="104" height="142" rx="6" fill="#fff" stroke="#aac3ce" stroke-width="3"/>'+
 '<text x="275" y="82" text-anchor="middle" font-size="12" font-family="Arial" font-weight="900" fill="#365b6d">QC REPORT</text>'+
 '<path d="M238 98 H313 M238 111 H300 M238 124 H309 M238 136 H285" stroke="#b8cbd3" stroke-width="4"/>'+
 '<path d="M239 158 L251 171 L274 148" fill="none" stroke="#27957d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>'+
 '<path d="M340 131 H371 M360 120 L373 131 L360 143" fill="none" stroke="#26958c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<path d="M377 45 Q377 37 388 37 H456 Q466 37 466 49 V238 Q466 246 457 246 H385 Q377 246 377 238Z" fill="#e5f5f2" stroke="#238b83" stroke-width="5"/>'+
 '<rect x="393" y="39" width="14" height="202" rx="5" fill="#45a59c"/>'+
 '<rect x="413" y="86" width="42" height="75" rx="5" fill="#fff" stroke="#b3d5d0"/>'+
 '<text x="434" y="110" text-anchor="middle" font-family="Arial" font-size="11" font-weight="900" fill="#29746e">QC</text>'+
 '<text x="434" y="125" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#568a81">LOG</text>'+
 '<path d="M424 138 H445" stroke="#91b6ae" stroke-width="3"/>'+
 '</svg>';
}
function controlNotes(){
 return '<div class="qc-control-summary" aria-label="pocH QC storage and lot transition notes">'+
 '<div class="qc-control-note"><span class="qc-note-icon">1</span><div><strong>Condition controls</strong><p>Retrieve all three EIGHTCHECK-3WP levels from the refrigerator and allow at least 15 minutes at room temperature. Mix only as specified in the approved IFU.</p></div></div>'+
 '<div class="qc-control-note"><span class="qc-note-icon">2</span><div><strong>14-day in-use window</strong><p>Refrigerate opened controls and replace the current set 14 days after initial use, or sooner if expired under the lot labeling or SOP.</p></div></div>'+
 '<div class="qc-control-note"><span class="qc-note-icon">3</span><div><strong>New-lot parallel comparison</strong><p>When replacing a lot, retain old- and new-lot QC printouts separately during the approved parallel-testing period. The current guide specifies five days, but its later text says one week. Confirm the active local policy.</p></div></div>'+
 '</div>';
}
function printStep(id){
 const cfg=getConfig(id);
 const piccolo=id==="piccolo";
 return '<div class="qc-final-doc" aria-label="QC print and binder filing procedure">'+
 '<div class="qc-final-intro"><span class="qc-final-mark">QC</span><div><strong>Finish with the verified QC record</strong><p>Only file accepted results. Document and escalate any out-of-range control according to the current SOP before patient testing.</p></div></div>'+
 (piccolo?
 '<div class="qc-final-section-label">01 · Check the automatic QC printout</div>'+
 '<div class="qc-piccolo-auto-print"><strong>Prints automatically</strong><p>Piccolo prints the QC result when the run completes. Review the result and keep the printout for the Monthly QC Log. No manual Print selection is needed for the normal workflow.</p></div>'+
 '<div class="qc-final-section-label">If needed · Reprint a QC result</div>':
 '<div class="qc-final-section-label">01 · Get the printout or authorized record</div>')+
 (piccolo?'<p class="qc-px-scroll-cue">Scroll right to view all reprint screens <span aria-hidden="true">→</span></p>':'')+
 screenGallery(cfg.steps,cfg.brand,{scroll:id==="sysmex"||piccolo,piccolo:piccolo,disclaimer:piccolo?"If needed: Recall → Last Disc or Browse → Control result → Print → Results. Screen labels can vary by software version.":null})+
 '<div class="qc-final-section-label">02 · Verify and file the QC result</div>'+
 '<div class="qc-binder-layout"><div class="qc-binder-pictogram">'+binderSvg()+'</div><div class="qc-binder-text"><span>FILE IN</span><strong>'+esc(cfg.binder)+'</strong>'+
 '<ol><li>Verify the report shows the instrument, date, test/panel, control level or type, lot, and result.</li><li>Confirm result acceptance and add operator identification or any missing required log details.</li><li>Place the printout in the designated QC binder section, grouped by date and QC category.</li></ol>'+
 '<p>'+esc(cfg.note)+'</p></div></div></div>';
}
window.LAB_QC_GUIDE={isQcGroup:isQcGroup,sysmexStep:sysmexStep,qcClickStep:qcClickStep,controlNotes:controlNotes,printStep:printStep,piccoloPatientLoadStep:piccoloPatientLoadStep,screenGallery:screenGallery};
})();