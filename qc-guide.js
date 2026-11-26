/* Instrument QC screen and binder teaching references.
   These are schematic illustrations, not functional analyzer interfaces.
   Screen choices and printer capabilities are verified where the listed
   manufacturer guidance is available; the local approved SOP governs. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
const configs={
 sysmex:{brand:"SYSMEX pocH-100i",binder:"Pochi Daily Blank Check and Control Log · Daily QC binder",steps:[
  {kind:"mainMenu",heading:"Open Menu",tip:"From the Main screen select Menu."},
  {heading:"Open QC Chart from Menu",screen:"MENU",items:["Str. Data","QC Chart","Maint."],focus:"QC Chart",tip:"Select the QC Chart tile on Menu. This is for stored QC records, not running controls."},
  {kind:"qcFiles",heading:"Choose the QC level",tip:"Select QC1 / Low, QC2 / Normal, or QC3 / High. Verify the correct file, lot and control level before printing."},
  {heading:"Print the current QC result",screen:"QUALITY CONTROL CHART",items:["Print","File","Setup"],focus:"Print",tip:"With the correct QC level and dated result selected, tap Print."},
  {heading:"Choose Current",screen:"QC PRINT CONFIRMATION",items:["Current","Chart"],focus:"Current",tip:"Select Current, not Chart. Repeat separately for missing QC levels."}
 ],note:"Print and file the accepted QC1 (Low), QC2 (Normal) and QC3 (High) records with the Pochi Daily Blank Check and Control Log. File the accepted blank-check printout with the same form. Retain new-lot comparison records in the approved validation log."},
 piccolo:{brand:"Piccolo Xpress",binder:"Piccolo Monthly QC Log · Monthly QC binder",steps:[
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
  {heading:"Recall patient or QC tests",screen:"RECALL OPTIONS",items:["Recall Patient Tests or QC Tests","Select","Done"],focus:"Select",tip:"Select Recall Patient Tests or QC Tests, then Select."},
  {heading:"Choose QC tests",screen:"RECALL RESULTS",items:["Patient tests","QC tests","Next"],focus:"QC tests",tip:"Choose QC tests and select Next."},
  {heading:"Locate the control run",screen:"SEARCH RESULTS",items:["Search by date","View all results"],focus:"Search by date",tip:"Locate the actual QC record by date and verify the assay and level."},
  {heading:"Print the selected record",screen:"STORED RESULT",items:["Print","Done"],focus:"Print",tip:"Check QC identification and lot before filing. Confirm the correct strip or cassette control record."}
 ],note:"File UA strip and hCG cassette controls in the correct monthly section. Verify that the record is labeled as QC, not a patient report."},
 sofia:{brand:"Quidel Sofia 2",binder:"Waived Tests QC Log binder",steps:[
  {heading:"Open stored control results",screen:"MAIN MENU",items:["Run QC","Review Data","Run Calibration"],focus:"Review Data",tip:"Review the completed Sofia 2 QC or calibration record on the analyzer."},
  {heading:"Select the QC result",screen:"REVIEW DATA",items:["Patient Results","QC Results","Calibration Results"],focus:"QC Results",tip:"Verify assay, lot, date, and positive/negative control results."},
  {heading:"Document the QC result",screen:"QC RESULTS",items:["Details","Result status","Home"],focus:"Result status",tip:"Record the result, lot, date, operator, and any corrective action in the approved QC log. No printout is required."}
 ],note:"Document positive and negative controls and calibration checks in the approved signed log. Sofia 2 does not produce a printout for this workflow."},
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
 if(sec.id==="sysmex"&&/insight|register a new qc lot/i.test(group.title))return false;
 return /\bqc\b|\bquality control\b/i.test(group.title) && !/\bnotes\b|reference/i.test(group.title);
}
// Sysmex pocH-100i IFU, chapter 3, section 3.2.3(a), closed-piercer L-J example.
const sysmexQcIfu="https://s-a-le.nl/wp-content/uploads/2020/01/pocH-100i_IFU_1504_en.pdf";
function sysmexAnalyzeScreen(kind){
 const file=kind==="pochAnalyzeFiles",run=kind==="pochAnalyzeRun",running=kind==="pochAnalyzeRunning";
 const control=(text,focus=false)=>'<span class="qc-poch-key'+(focus?' is-highlighted':'')+'">'+esc(text)+'</span>';
 const analytes=["WBC","RBC","HGB","HCT","MCV","MCH","MCHC","PLT"];
 const fileDetails='<div class="qc-poch-file-details"><strong>File [2]</strong><span>Lot ID [ — ]</span><span>Expire [ — ]</span></div>';
 if(file)return '<table class="qc-poch-file-table"><thead><tr><th>File</th><th>Lot ID</th><th>Expire</th></tr></thead><tbody>'+
  Array.from({length:6},(_,i)=>'<tr'+(i===1?' class="is-highlighted"':'')+'><th scope="row">'+(i+1)+'</th><td>—</td><td>—</td></tr>').join("")+
  '</tbody></table>';
 if(run)return fileDetails+
  '<div class="qc-poch-run-area">'+control("Run",true)+'</div>';
 return fileDetails+'<div class="qc-poch-analytes">'+
  analytes.map(name=>'<div><strong>'+name+'</strong><span>'+(running?'›':'—')+'</span></div>').join("")+
  '</div>'+(running?'':'<div class="qc-poch-result-keys">'+[control("Print"),control("Back"),control("←"),control("→"),control("Quit",true)].join("")+'</div>');
}
function screenPanel(item,brand,number){
 const top='<div class="qc-visual-top"><span>SCREEN '+String(number).padStart(2,"0")+'</span><strong>'+esc(item.heading)+'</strong></div>';
 if(/sysmex poch-100i/i.test(brand)){
  const realistic=window.LAB_SYSMEX_LCD?.fromItem(item);
  if(realistic)return '<div class="qc-screen-reference sx-realistic-screen" role="group" aria-label="'+esc(item.heading)+'">'+top+
    '<div class="qc-poch-qc-main">'+realistic+'</div><p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
 }
 if(brand==="PATHFAST"){
  const visual=window.LAB_PATHFAST_SCREEN?.fromItem(item);
  if(visual)return '<div class="qc-screen-reference" role="group" aria-label="'+esc(item.heading)+'">'+top+
   '<div class="pfs-lcd-portrait">'+visual+'</div><p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
 }
 if(brand==="Siemens CLINITEK Status+"){
  const visual=window.LAB_CLINITEK_LCD?.fromItem(item);
  if(visual)return '<div class="qc-screen-reference" role="group" aria-label="'+esc(item.heading)+'">'+top+'<div class="cl-lcd-bezel">'+visual+'</div><p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
 }
 const isPiccoloScene=/^piccolo(?:Home|Load|Type|Level|PatientId|Running|Recall|ResultsList|ViewResult|SelectReport)$/.test(item.kind||"");
 const isPoch=brand==="Sysmex pocH-100i";
 const isPochAnalyze=/^pochAnalyze/.test(item.kind||"");
 const header=isPiccoloScene
  ?'<div class="qc-device-screen-top qc-px-screen-top"><strong>'+esc(item.screen)+'</strong></div>'
  :isPochAnalyze?'<div class="qc-device-screen-top qc-poch-top"><strong>sysmex</strong><small>'+esc(item.screen)+'</small></div>'
  :isPoch?'<div class="qc-device-screen-top qc-poch-top"><strong>sysmex</strong><small>Ready · Top</small></div>':'<div class="qc-device-screen-top"><strong>'+esc(brand)+'</strong><small>MENU REFERENCE</small></div>';
 let body="";
 if(isPochAnalyze){
  body=sysmexAnalyzeScreen(item.kind);
 }else if(item.kind==="pochQcMain"){
  return '<div class="qc-screen-reference" role="group" aria-label="Sysmex Main screen, QC selected">'+top+
   '<div class="qc-poch-qc-main">'+window.LAB_SYSMEX_FOCUSED.screen("qc")+'</div><p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
 }else if(item.kind==="piccoloHome"){
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
   '<div class="qc-device-scan-form"><div><strong>Lot ID</strong><span class="qc-lot-empty-field">—</span><em>Scan or enter lot ID</em></div>'+
   '<div><strong>Expire</strong><span class="qc-lot-empty-field">—</span><em>Scan / enter expiry</em></div></div>'+
   '<div class="qc-device-screen-bottom"><span>Verify both fields</span><span>→</span></div>';
 }else if(item.kind==="qcAnalytes"){
  const rows=["WBC","RBC","HGB","HCT","MCV"];
  body='<div class="qc-device-screen-label">SET QC · FILE [1] · TARGET / LIMIT</div>'+
   '<div class="qc-device-parameter-table"><div class="qc-device-param-heading"><b>PARAMETER</b><b>TARGET</b><b>LIMIT</b></div>'+
   rows.map(x=>'<div class="qc-device-param-row"><strong>'+x+'</strong><span class="qc-lot-empty-field" aria-label="Target field">—</span><span class="qc-lot-empty-field" aria-label="Limit field">—</span></div>').join("")+'</div>'+
   '<div class="qc-device-screen-bottom"><span>←</span><span>→</span></div>';
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
  '<p class="qc-screen-instruction">'+(item.heading==="Print the current QC result"?esc(item.tip).replace("Repeat separately for any missing QC1, QC2 or QC3 records.","<strong>Repeat separately for any missing QC1, QC2 or QC3 records.</strong>"):esc(item.tip))+'</p></div>';
}
function screenGallery(list,brand,options={}){
 const scroll=options.scroll===true;
 const cards=list.map((x,i)=>screenPanel(x,brand,i+1)).join("");
 return '<div class="qc-gallery-wrap'+(options.disclaimer&&brand==="Sysmex pocH-100i"?' qc-gallery-wrap--sysmex-lot':'')+'">'+
 '<div class="qc-screen-gallery'+(scroll?' qc-screen-gallery--scroll qc-screen-gallery--cue-only':'')+(options.piccolo?' qc-screen-gallery--piccolo':'')+'"'+
  (scroll?' role="region" aria-label="Scrollable '+esc(brand)+' screen sequence" tabindex="0"':'')+'>'+cards+'</div>'+
  (scroll&&list.length>1?'<div class="qc-gallery-nav" hidden><button type="button" data-qc-gallery-dir="-1" aria-label="Show earlier screens">← Previous screens</button><span class="qc-gallery-position" aria-live="polite"></span><button type="button" data-qc-gallery-dir="1" aria-label="Show next screens">Next screens →</button></div>':'')+
  '<p class="qc-illustration-disclaimer">'+esc(options.disclaimer||"Confirm the correct menu, assay, lot and QC level on the analyzer before printing.")+'</p></div>';
}
if(!window.__labQcGalleryMoreBound){
 window.__labQcGalleryMoreBound=true;
 const initialized=new WeakSet();
 const trackFor=wrap=>wrap?.querySelector('.qc-screen-gallery--scroll');
 function update(wrap){
  const gallery=trackFor(wrap),nav=wrap.querySelector('.qc-gallery-nav');
  if(!gallery||!nav)return;
  const max=Math.max(0,gallery.scrollWidth-gallery.clientWidth);
  nav.hidden=max<=3||gallery.clientWidth===0;
  nav.querySelector('[data-qc-gallery-dir="-1"]').disabled=gallery.scrollLeft<=3;
  nav.querySelector('[data-qc-gallery-dir="1"]').disabled=gallery.scrollLeft>=max-3;
  const bounds=gallery.getBoundingClientRect(),cards=[...gallery.querySelectorAll(':scope > .qc-screen-reference')];
  const visible=cards.map((card,i)=>({i:i+1,r:card.getBoundingClientRect()})).filter(({r})=>r.right>bounds.left+8&&r.left<bounds.right-8);
  const label=visible.length?'Screens '+visible[0].i+(visible.length>1?'–'+visible.at(-1).i:'')+' of '+cards.length:'';const position=nav.querySelector('.qc-gallery-position');if(position.textContent!==label)position.textContent=label;
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest?.('[data-qc-gallery-dir]');
  if(!button||button.disabled)return;
  const wrap=button.closest('.qc-gallery-wrap'),gallery=trackFor(wrap);if(!gallery)return;
  const max=Math.max(0,gallery.scrollWidth-gallery.clientWidth),dir=Number(button.dataset.qcGalleryDir);
  const left=gallery.getBoundingClientRect().left;
  const offsets=[...gallery.querySelectorAll(':scope > .qc-screen-reference')].map(card=>Math.max(0,Math.min(max,gallery.scrollLeft+card.getBoundingClientRect().left-left-3)));
  const target=dir>0?(offsets.find(x=>x>gallery.scrollLeft+4)??max):([0,...offsets].reverse().find(x=>x<gallery.scrollLeft-4)??0);
  gallery.scrollTo({left:target,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 const scan=()=>document.querySelectorAll('.qc-gallery-wrap').forEach(wrap=>{
  if(initialized.has(wrap)){update(wrap);return;}
  const gallery=trackFor(wrap);if(!gallery)return;
  initialized.add(wrap);
  gallery.addEventListener('scroll',()=>update(wrap),{passive:true});
  if(typeof ResizeObserver==='function'){const ro=new ResizeObserver(()=>update(wrap));ro.observe(gallery);ro.observe(wrap);}
  requestAnimationFrame(()=>update(wrap));
 });
 const root=document.getElementById('mainContent');
 if(root&&typeof MutationObserver==='function')new MutationObserver(()=>requestAnimationFrame(scan)).observe(root,{childList:true,subtree:true});
 window.addEventListener('resize',scan,{passive:true});window.addEventListener('load',scan,{once:true});
 requestAnimationFrame(scan);
}
function piccoloPatientLoadStep(){
 const scenes=[
  {kind:"piccoloHome",heading:"Select Analyze",screen:"Home",tip:"Select Analyze to open the disc drawer."},
  {kind:"piccoloLoad",heading:"Insert disc and Close",screen:"Load Disc",tip:"Seat the prepared disc, barcode up, then select Close."},
  {kind:"piccoloType",heading:"Choose Patient",screen:"Select Type",patient:true,tip:"Select Patient when prompted. Control is only for QC."},
  {kind:"piccoloPatientId",heading:"Enter patient ID",screen:"Enter Sample ID",tip:"Enter and verify the patient's MRN or approved sample ID. Select Done."}
 ];
 return '<section class="qc-patient-load-sequence" aria-label="Piccolo patient sample touchscreen sequence">'+
  '<div class="qc-patient-sequence-head"><strong>Follow the analyzer screens</strong><span>Use the gallery arrows or swipe to see additional screens</span></div>'+
  screenGallery(scenes,"Piccolo Xpress",{scroll:true,piccolo:true,disclaimer:"Screens are manufacturer-informed illustrations. Confirm prompts on your analyzer."})+
  '</section>';
}

function sysmexBinderChecklist(){
 return '<div class="lc-poc-print-binder" aria-label="pocH-100i four required reports">'+
  '<div class="lc-poc-binder-heading"><span>FINAL CHECK · 4 REPORTS</span><strong>Verify and file the daily records</strong><p>Three accepted QC levels plus today’s startup blank check.</p></div>'+
  '<div class="lc-poc-report-groups">'+
   '<section class="lc-poc-report-group"><div class="lc-poc-report-group-head"><strong>3 QC printouts</strong><small>Pochi Daily Blank Check and Control Log</small></div>'+
    '<div class="lc-poc-print-checklist">'+
     ['QC1 · Low','QC2 · Normal','QC3 · High'].map(label=>'<div class="lc-poc-check-item"><span aria-hidden="true">□</span>'+esc(label)+'</div>').join('')+
    '</div></section>'+
   '<section class="lc-poc-report-group"><div class="lc-poc-report-group-head"><strong>1 blank-check printout</strong><small>Pochi Daily Blank Check and Control Log</small></div>'+
    '<div class="lc-poc-print-checklist"><div class="lc-poc-check-item lc-poc-blank-check"><span aria-hidden="true">□</span>Today’s startup blank check</div></div></section>'+
  '</div>'+
  '<ol class="lc-poc-binder-filing-steps"><li><b>Review:</b> Match date, control level, lot and accepted results. Check that the blank check is acceptable and document operator initials in the approved QC log.</li>'+
   '<li><b>File:</b> Keep all three QC reports and the blank-check printout with the Pochi Daily Blank Check and Control Log.</li>'+
   '<li><b>Document:</b> Enter the measured analytes from QC1, QC2 and QC3 in Sysmex Insight (see the dedicated Insight section), complete the Daily Maintenance Log with date and initials, and escalate missing or unacceptable results.</li></ol>'+
  '</div>';
}
function sysmexPrintFallback(){
 const qcScreens=configs.sysmex.steps;
 const blankScreens=[
  {kind:"mainMenu",heading:"Open Menu",tip:"From the main screen, open Menu."},
  {heading:"Open stored data",screen:"MENU",items:["Str. Data","QC","Maint."],focus:"Str. Data",tip:"Select Str. Data to retrieve today's startup blank check."},
  {heading:"Select today's blank check",screen:"STORED DATA",items:["__BLANK CHECK__","Other stored results","Back"],focus:"__BLANK CHECK__",tip:"Select the BLANK CHECK record with today's date. Verify the background check is acceptable."},
  {heading:"Print blank-check result",screen:"BLANK CHECK RESULT",items:["Print","Back"],focus:"Print",tip:"Tap Print and file the report with the Pochi Daily Blank Check and Control Log."}
 ];
 return '<section class="lc-poc-print-decision" data-poc-print-decision aria-label="pocH control result printing">'+
  '<div class="lc-poc-print-prompt"><div><span class="lc-poc-print-eyebrow">AFTER QC · ACTION REQUIRED</span><h4>Do you have all four reports?</h4><p>Check QC1 Low, QC2 Normal, QC3 High and today’s blank check. If any report is missing, follow the reprint route.</p></div>'+
  '<div class="lc-poc-print-choices" role="group" aria-label="Was the QC printout generated?">'+
  '<button type="button" data-poc-print-choice="yes" aria-pressed="false">Yes, all four</button>'+
  '<button type="button" data-poc-print-choice="no" aria-pressed="false">No, missing reports</button></div></div>'+
  '<div class="lc-poc-print-response" data-poc-print-panel="yes" hidden><p class="lc-poc-print-instruction"><strong>Review before filing.</strong> Verify all three QC levels and today’s startup blank check. If one is missing, select “No, missing reports” to retrieve it.</p>'+sysmexBinderChecklist()+'</div>'+
  '<div class="lc-poc-print-response" data-poc-print-panel="no" hidden>'+
  '<div class="lc-poc-print-section"><div class="lc-poc-print-section-head"><span>01</span><div><strong>Reprint only the missing QC level(s)</strong><p>Menu → QC Chart → choose the correct QC file (Low, Normal or High) → Print → Current. Repeat for each missing level. Chart prints the full chart, not the selected record.</p></div></div>'+
  screenGallery(qcScreens,"Sysmex pocH-100i",{scroll:true,disclaimer:"These are illustrative pocH screens. Verify the correct file, level, lot and date on the actual analyzer."})+
  '</div><div class="lc-poc-print-section"><div class="lc-poc-print-section-head"><span>02</span><div><strong>Reprint today’s blank check, if missing</strong><p>Menu → Str. Data → dated BLANK CHECK record → Print.</p></div></div>'+
  screenGallery(blankScreens,"Sysmex pocH-100i",{scroll:true,disclaimer:"Select the current dated blank-check record. Verify the printed values and file the accepted record."})+
  '</div>'+sysmexBinderChecklist()+'</div></section>';
}
if(!window.__labPocPrintDecisionBound){
 window.__labPocPrintDecisionBound=true;
 document.addEventListener('click',function(event){
  const btn=event.target.closest?.('[data-poc-print-choice]');
  if(!btn)return;
  const container=btn.closest('[data-poc-print-decision]');
  if(!container)return;
  const selected=btn.getAttribute('data-poc-print-choice');
  container.querySelectorAll('[data-poc-print-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
  container.querySelectorAll('[data-poc-print-panel]').forEach(panel=>{panel.hidden=panel.getAttribute('data-poc-print-panel')!==selected;});
 });
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
  {kind:"status",heading:"Power on · Auto Rinse",screen:"STARTUP AUTO RINSE",status:"Auto Rinse",detail:"Please wait",tip:"Turn on the physical power switch after shutdown. Following the self-check, the analyzer automatically rinses."},
  {kind:"status",heading:"Wait for background check",screen:"STARTUP BACKGROUND CHECK",status:"Background check",detail:"Please wait",tip:"The analyzer checks the background automatically. No touchscreen action is needed."},
  {kind:"status",heading:"Confirm Ready",screen:"READY FOR QC",status:"Ready",detail:"Main screen",tip:"Confirm the green Ready indication before starting QC. Review any background-check error according to the approved SOP."}
 ],"Sysmex pocH-100i",{scroll:true,disclaimer:"Startup screen reconstructions based on Sysmex Basic User Training, slides 28–29. Verify the actual prompts on your analyzer."})+'</div>'; 
 if(/go to menu|blank check.*today/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {kind:"mainMenu",heading:"Open the Main screen",screen:"MAIN",tip:"On the ready Main screen, select the highlighted Menu button."},
  {heading:"Open stored data",screen:"MAIN / MENU",items:["QC","Str. Data","Maintenance"],focus:"Str. Data",tip:"In Menu, select Str. Data."},
  {heading:"Choose today's blank",screen:"STORED DATA",items:["__BLANK CHECK__","Other stored result","Back"],focus:"__BLANK CHECK__",tip:"Select the blank-check record bearing today’s date."},
  {heading:"Print the report",screen:"BLANK CHECK RESULT",items:["Print","Back"],focus:"Print",tip:"Press Print and file with the date/name with the Pochi Daily Blank Check and Control Log."}
 ],"Sysmex pocH-100i",{scroll:true})+'</div>'; 
 if(/^run (the )?qc/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {kind:"pochQcMain",heading:"Open QC from Main",tip:"Select QC on the Ready Main screen to open the analysis file list. Operator ID entry is disabled on the Sollis analyzer."},
  {kind:"pochAnalyzeFiles",screen:"QC Analyze",heading:"Select the matching file",tip:"The analyzer lists six numbered files. Match the file, lot ID and expiration to the control vial. File 2 is highlighted for illustration only."},
  {kind:"pochAnalyzeRun",screen:"QC Analyze",heading:"Run the selected control",tip:"Verify the selected file and lot. Load the prepared control in the green QC adapter, close the sample door and select Run."},
  {kind:"pochAnalyzeRunning",screen:"Running · QC Analyze",heading:"Wait for analysis",tip:"Leave the sample door closed during aspiration. Wait for the result display."},
  {kind:"pochAnalyzeResults",screen:"QC Analyze",heading:"Review results, then select Quit",tip:"Use the arrow keys to review the result pages. Check the flags and acceptance criteria before selecting Quit. Select Print if needed."}
 ],"Sysmex pocH-100i",{scroll:true,disclaimer:"Training schematics. File selection and values are examples. The screen controls follow the closed-piercer L-J workflow in the Sysmex IFU."})+
 '<p class="qc-poch-reference"><a href="'+sysmexQcIfu+'" target="_blank" rel="noopener noreferrer">Sysmex pocH-100i instructions for use, section 3.2.3(a)</a></p>'+sysmexPrintFallback()+'</div>';

 return "";
}
function sysmexNewLotStep(title){
 const brand="Sysmex pocH-100i";
 const procedureNote="Training schematics. File 1 is an example. Verify the level, lot and file assignments on the analyzer.";
 const checklist=(label,items)=>'<div class="qc-lot-checklist" aria-label="'+esc(label)+'">'+
  items.map(([heading,detail])=>'<div><strong>'+esc(heading)+'</strong><span>'+esc(detail)+'</span></div>').join("")+'</div>';
 const gallery=items=>screenGallery(items,brand,{scroll:items.length>1,disclaimer:procedureNote});
 const assayUrl="https://www.sysmex.com/-/media/project/sysmex/sysmex/documents/assay-sheets/eightcheck_5273.pdf?sc_lang=en";
 const supportUrl="https://www.sysmex.com/en-us/customer-support/support-hub/product-support-library";
 const assayExample=(parameters=false)=>{
  const levels=["Low Abnormal","Normal","High Abnormal"], rows=["WBC (10³/µL)","RBC (10⁶/µL)","HGB (g/dL)","HCT (%)","MCV (fL)","MCH (pg)","MCHC (g/dL)","PLT (10³/µL)","Lymph (W-SCR) (%)","Mixed (W-MCR) (%)","Neut (W-LCR) (%)","Lymph (W-SCC) (10³/µL)","Mixed (W-MCC) (10³/µL)","Neut (W-LCC) (10³/µL)","W-SMV (fL)","W-LMV (fL)","RDW-SD (fL)","RDW-CV (%)","MPV (fL)"];
  // Decorative bars only: no encoded payload, no valid start/stop/checksum,
  // and an interrupted irregular bar pattern; no machine-readable payload.
  const mockBars=(seed=0)=>Array.from({length:35},(_,j)=>{
   const x=4+j*3,w=[1,2.2,1.5,2.6][(j*7+seed*3+j*j)%4];
   return '<rect x="'+x+'" y="2" width="'+w+'" height="10" fill="#26343c"/><rect x="'+x+'" y="14" width="'+w+'" height="10" fill="#26343c"/>';
  }).join("");
  const code=(focus,label="BCR",seed=0)=>'<span class="qc-lot-assay-code qc-assay-mockcode'+(focus?' focus':'')+'" title="Illustrative '+esc(label)+'; not a valid barcode" aria-label="Non-scannable mock '+esc(label)+' barcode"><svg viewBox="0 0 112 26" aria-hidden="true" focusable="false">'+mockBars(seed)+'<rect x="0" y="12" width="112" height="2" fill="#fff"/></svg></span>';
  const scannerIllustration=()=>'<figure class="qc-assay-scan-figure"><svg viewBox="0 0 320 146" role="img" aria-label="Handheld barcode scanner directed at the highlighted example barcode on an assay sheet"><defs><linearGradient id="qcScanBody" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#64717a"/><stop offset="1" stop-color="#26333c"/></linearGradient></defs>'+
   '<ellipse cx="75" cy="131" rx="44" ry="5" fill="#dce5e9"/><path d="M57 88Q45 113 49 131" fill="none" stroke="#414e56" stroke-width="4" stroke-linecap="round"/>'+
   '<path d="M24 26Q24 18 33 16L88 12Q97 12 104 20L128 46Q134 54 125 61L97 79 77 122Q74 128 66 124L43 113Q38 110 41 102L56 76 27 52Q23 48 24 26Z" fill="url(#qcScanBody)" stroke="#25343e" stroke-width="2"/>'+
   '<path d="M92 23L120 50 100 65 74 40Z" fill="#7a939e" stroke="#b4c9d1" stroke-width="1.5"/><path d="M62 77l15 7-8 18-11-5z" fill="#a4b7bf"/><path d="M36 25l44-4" stroke="#9caab1" stroke-width="2" stroke-linecap="round"/>'+
   '<rect x="185" y="21" width="120" height="108" rx="3" fill="#fff" stroke="#aabdc8" stroke-width="1.4"/><path d="M195 34h95M195 43h95M195 50h75" stroke="#ccd7de" stroke-width="2"/><rect x="196" y="60" width="99" height="36" rx="3" fill="#fff2db" stroke="#bd7c32" stroke-width="1.5"/>'+
   '<g transform="translate(201 64) scale(.78 1)">'+mockBars(parameters?3:1)+'<rect x="0" y="12" width="112" height="2" fill="#fff2db"/></g>'+
   '<path d="M125 54L246 78" fill="none" stroke="#d64b51" stroke-width="2" stroke-dasharray="5 4"/><path d="M195 107h95M195 115h66" stroke="#ccd7de" stroke-width="2"/></svg><figcaption>'+(parameters?'Aim at the matching parameter BCR':'Aim at the matching lot barcode')+'</figcaption></figure>';
  const cells=(label,fn)=>'<tr><th scope="row">'+label+'</th>'+levels.map((v,i)=>'<td colspan="3" class="qc-assay-level-start">'+fn(i)+'</td>').join("")+'</tr>';
  return '<section class="qc-lot-assay-example qc-assay-revised" aria-label="EIGHTCHECK assay sheet scanning reference">'+
   '<div class="qc-lot-assay-heading"><div><strong>EIGHTCHECK-3WP X-TRA assay sheet</strong><p>Use the barcode sheet supplied with the active control lot.</p></div><a href="'+supportUrl+'" target="_blank" rel="noopener noreferrer">Sysmex support library ↗</a></div>'+
   '<div class="qc-assay-instruction"><div class="qc-assay-instruction-copy"><span class="qc-assay-step-icon" aria-hidden="true">'+(parameters?'02':'01')+'</span><div><strong>'+(parameters?'Scan each parameter BCR':'Scan the correct level’s lot barcode')+'</strong><p>'+(parameters?'Use the BCR in the matching control-level column. Verify the target and limit on the analyzer after each scan, then move through all parameter pages.':'Match the vial’s lot number to the Low Abnormal, Normal or High Abnormal column. Scan its lot barcode, verify Lot ID, and enter the printed expiration date manually as directed by the package insert.')+'</p></div></div>'+scannerIllustration()+'</div>'+
   '<div class="qc-assay-sheet-scroll" role="region" tabindex="0" aria-label="Three-level assay sheet layout; horizontally scrollable on small screens">'+
   '<div class="qc-lot-assay-paper"><header><div><b>EIGHTCHECK™-3WP X-TRA</b><small>HEMATOLOGY CONTROL</small></div><strong>pocH-100i™</strong></header>'+
   '<div class="qc-lot-assay-warning">TRAINING EXAMPLE · MOCK BARCODES · DO NOT SCAN</div>'+
   '<table class="qc-assay-table"><colgroup><col class="qc-assay-param">'+levels.map(()=>'<col class="qc-assay-value"><col class="qc-assay-value"><col class="qc-assay-bcr">').join("")+'</colgroup><thead>'+
   '<tr><th scope="col">Control</th>'+levels.map(v=>'<th colspan="3" scope="colgroup" class="qc-assay-level-start">'+v+'</th>').join("")+'</tr>'+
   cells("Insight due date",()=> '—')+cells("Expiration date",()=> '—')+
   cells("Lot number",i=>'<div class="qc-assay-lot-cell"><span>—</span>'+code(!parameters&&i===0,"LOT BCR",i+31)+'</div>')+
   '<tr><th scope="col">Parameters</th>'+levels.map(()=>'<th class="qc-assay-level-start" scope="col">Mean</th><th scope="col">Limit</th><th scope="col">BCR</th>').join("")+'</tr></thead><tbody>'+
   rows.map((v,j)=>'<tr><th scope="row">'+esc(v)+'</th>'+levels.map((l,i)=>'<td class="qc-assay-level-start">—</td><td>—</td><td>'+code(parameters&&i===0&&j===0,'BCR',j*3+i)+'</td>').join("")+'</tr>').join("")+'</tbody></table>'+
   '<small class="qc-lot-assay-small">Reconstructed from the manufacturer’s three-level barcode sheet structure. Highlighted Low Abnormal is an example only. Mock barcodes contain no encoded lot or QC values and must not be scanned.</small></div></div>'+
   '<div class="qc-assay-footer"><span>Never scan training illustrations or use expired lot data.</span><span><a href="'+assayUrl+'" target="_blank" rel="noopener noreferrer">Archived source (availability may vary) ↗</a> · <a href="https://www.inofficelab.com/v/vspfiles/assets/images/package_inserts_eightcheck-3wpx-tra.pdf" target="_blank" rel="noopener noreferrer">Package insert ↗</a></span></div></section>';
 };

 if(/^(match the vials|match vials and files)/i.test(title))return '<figure class="qc-lot-control-figure">'+
  (window.LAB_EQUIPMENT_ART?.kitShape?.("sysmex",false,"qc")||"")+
  '<figcaption>Match each control vial to its assay sheet and assigned QC file.</figcaption></figure>'+checklist("Match before editing",[
  ["1 · Control vials","Low, Normal and High. Confirm labeled expiry and in-use stability."],
  ["2 · Assay sheet","Match the lot and level before using any barcode or value."],
  ["3 · Analyzer files","Verify the assigned file for each level and preserve the old lot’s records."]
 ]);
 if(/^(open set qc|select qc file)/i.test(title))return gallery([
  {kind:"mainMenu",heading:"Main → Menu",tip:"Open Menu from Main. This is the path to QC setup."},
  {heading:"Menu → QC Chart",screen:"MENU",items:["Str. Data","Chg.Reag","Maint.","Calib.","Settings","QC Chart"],focus:"QC Chart",tip:"Tap QC Chart to open the chart and access file setup. For daily control runs use QC on the Ready Main screen instead."},
  {heading:"QC chart → File",screen:"QC CHART",items:["Print","HC","Delete","File","Setup"],focus:"File",tip:"Open File if the displayed file is not the assigned control file. Do not use Delete to change lots."},
  {kind:"qcFiles",heading:"Select the assigned QC file",tip:"Choose the file assigned to the correct control level. File 1 is an illustration only. Verify the existing lot and preserve records according to the approved SOP."},
  {heading:"QC chart → Setup",screen:"QC CHART",items:["Print","HC","Delete","File","Setup"],focus:"Setup",tip:"Once the intended file is displayed, tap Setup to enter the new lot information."}
 ])+'<p class="qc-poch-reference qc-poch-reference--lot"><a href="'+sysmexQcIfu+'" target="_blank" rel="noopener noreferrer">Sysmex instructions for use · section 3.2.1(a)</a></p>';
 if(/^(enter the lot id|scan lot and enter expiry)/i.test(title))return gallery([
  {kind:"qcLot",heading:"Set QC · Scan Lot ID and verify Expire",focus:"→",tip:"Scan the matching lot barcode from the current EIGHTCHECK assay sheet. Verify Lot ID and enter the printed expiration date, then press the right arrow."}
 ])+assayExample();
 if(/^(enter|scan) targets and limits/i.test(title))return gallery([
  {kind:"qcAnalytes",heading:"Set QC · Scan TARGET and LIMIT",tip:"Scan the matching analyte barcode to load both fields, verify the values, and advance with the right arrow through all six parameter-setting pages. Blank fields are training examples."}
 ])+assayExample(true);
 if(/^save and verify/i.test(title))return gallery([
  {heading:"Save the file settings",screen:"SET QC",items:["←","→","Save"],focus:"Save",tip:"Save only after checking all parameter pages against the lot-specific sheet."},
  {heading:"Confirm with OK",screen:"SAVE CONFIRMATION",items:["OK"],focus:"OK",tip:"After saving, return to the file and verify the stored information. Repeat for Low, Normal and High."}
 ]);
 if(/^(run the comparison|compare qc lots)/i.test(title))return checklist("Lot comparison record",[
  ["Old lot","Retain results by level for the valid old lot as required by the SOP."],
  ["New lot","Record Low, Normal and High results and compare using the approved criteria."],
  ["Review and approval","Document findings and acceptance before releasing the new lot for routine QC."]
 ]);
 return "";
}
function qcClickStep(sec,groupId,title){
 if(sec?.id==="sysmex"&&groupId.startsWith("register-a-new-qc-lot"))return sysmexNewLotStep(title);
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
 '<p>'+esc(cfg.note)+'</p></div></div>'+'</div>';
}
window.LAB_QC_GUIDE={isQcGroup:isQcGroup,sysmexStep:sysmexStep,qcClickStep:qcClickStep,controlNotes:controlNotes,printStep:printStep,piccoloPatientLoadStep:piccoloPatientLoadStep,screenGallery:screenGallery};
})();