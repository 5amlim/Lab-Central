/* Instrument QC screen and binder teaching references.
   These are schematic illustrations, not functional analyzer interfaces.
   Screen choices and printer capabilities are verified where the listed
   manufacturer guidance is available; the local approved SOP governs. */
(function(){
"use strict";
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
const configs={
 sysmex:{brand:"SYSMEX pocH-100i",binder:"pocH Daily Control Log · Maintenance Log binder",steps:[
  {heading:"Open QC records",screen:"MAIN / MENU",items:["QC","Str. Data","Shutdown"],focus:"QC",tip:"Select MENU, then QC."},
  {heading:"Choose what to print",screen:"QUALITY CONTROL",items:["Chart","Current","Delete"],focus:"Current",tip:"Print Current for the selected control; Chart is available for QC trends."},
  {heading:"Print the control record",screen:"QC REPORT",items:["Print","Back"],focus:"Print",tip:"The run can also print automatically after Quit, depending on settings."}
 ],note:"Confirm each Low, Normal and High result is acceptable. File the startup blank-check report separately in the pocH blank-check log; retain new-lot parallel QC printouts in the validation log until the approved transition is complete."},
 piccolo:{brand:"Piccolo Xpress",binder:"Monthly QC Log binder",steps:[
  {heading:"Read the completed run",screen:"ANALYSIS COMPLETE",items:["Results","Print","Home"],focus:"Print",tip:"The analyzer normally prints results automatically at run completion."},
  {heading:"Retrieve if needed",screen:"RECALL",items:["Browse","Search"],focus:"Browse",tip:"Choose the correct Control result, not a patient result."},
  {heading:"Request another printout",screen:"CONTROL RESULT",items:["Print","Transmit","Back"],focus:"Print",tip:"Select the Results report or required QC report per configuration."}
 ],note:"Use the control run for the correct disc/panel, lot and level. If print settings differ, follow the approved analyzer Recall workflow."},
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
 return '<div class="qc-screen-reference" role="img" aria-label="Illustrated '+esc(brand)+' screen: '+esc(item.heading)+'">'+
 '<div class="qc-visual-top"><span>SCREEN '+String(number).padStart(2,"0")+'</span><strong>'+esc(item.heading)+'</strong></div>'+
 '<div class="qc-device-face"><div class="qc-device-screen"><div class="qc-device-screen-top"><strong>'+esc(brand)+'</strong><small>MENU REFERENCE</small></div>'+
 '<div class="qc-device-screen-label">'+esc(item.screen)+'</div><div class="qc-device-options">'+item.items.map(x=>'<span class="qc-device-option'+(x===item.focus?' targeted':'')+'">'+esc(x)+(x===item.focus?'<b>SELECT</b>':'')+'</span>').join("")+'</div>'+
 '<div class="qc-device-screen-bottom"><span>Back</span><span>Screen illustration</span></div></div></div>'+
 '<p class="qc-screen-instruction">'+esc(item.tip)+'</p></div>';
}
function screenGallery(list,brand){
 return '<div class="qc-screen-gallery">'+list.map((x,i)=>screenPanel(x,brand,i+1)).join("")+'</div>'+
 '<p class="qc-illustration-disclaimer">Illustrative screen layouts, not live controls or exact screenshots. Verify the actual model/software menu and the current approved SOP.</p>';
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
  {heading:"Power on the analyzer",screen:"INITIALIZING",items:["Main power switch ON","System startup","Please wait"],focus:"",tip:"Turn on the physical power switch after the completed shutdown and allow initialization."},
  {heading:"Wait for blank check",screen:"STARTUP BLANK CHECK",items:["Automated blank check","Processing","Ready when complete"],focus:"",tip:"No touchscreen action is needed. Wait for completion and confirm readiness before QC."}
 ],"Sysmex pocH-100i")+'</div>';
 if(/go to menu|blank check.*today/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {heading:"Open stored data",screen:"MAIN / MENU",items:["QC","Str. Data","Maintenance"],focus:"Str. Data",tip:"Select Menu, then Str. Data."},
  {heading:"Choose today's blank",screen:"STORED DATA",items:["__BLANK CHECK__","Other stored result","Back"],focus:"__BLANK CHECK__",tip:"Select the blank-check record bearing today’s date."},
  {heading:"Print the report",screen:"BLANK CHECK RESULT",items:["Print","Back"],focus:"Print",tip:"Press Print and file with the date/name in the blank-check section of the Maintenance Log binder."}
 ],"Sysmex pocH-100i")+'</div>';
 if(/^run (the )?qc/.test(t))return '<div class="qc-instrument-walkthrough">'+screenGallery([
  {heading:"Open QC and check the lot",screen:"MAIN",items:["QC","Result","Shutdown"],focus:"QC",tip:"Select QC, choose the correct Low / Normal / High file and verify the control lot."},
  {heading:"Run the control level",screen:"QC FILE",items:["QC FILE 1 / 2 / 3","Run","Back"],focus:"Run",tip:"Mix material per approved EIGHTCHECK instructions, load it using the green QC adapter and select Run."},
  {heading:"Accept and print result",screen:"QC RESULT",items:["Quit","Print (if needed)","Back"],focus:"Quit",tip:"Select Quit after reviewing results; printout is generated automatically when the printer option is configured."}
 ],"Sysmex pocH-100i")+'</div>';
 return "";
}
function qcClickStep(sec,groupId,title){
 const base=sysmexStep(sec,groupId,title);
 if(base)return base;
 if(!sec||!title)return "";
 const t=String(title).toLowerCase();
 let scenes=null;
 if(sec.id==="piccolo"&&/click analyze/.test(t))scenes=[
  {heading:"Open analysis",screen:"HOME",items:["Analyze","Recall","Settings"],focus:"Analyze",tip:"Select Analyze, then close the drawer when prompted."},
  {heading:"Choose control mode",screen:"ANALYZE",items:["Patient","Control","Calibration"],focus:"Control",tip:"Select Control rather than Patient."},
  {heading:"Identify the level",screen:"CONTROL",items:["Level 1 · Low","Level 2 · High","Enter"],focus:"Enter",tip:"Enter the required control level and confirm before starting."}];
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
 else if(sec.id==="torch"&&/load the controls/.test(t))scenes=[
  {heading:"Identify the QC sample",screen:"RUN SETUP",items:["Sample Name","Pouch barcode","Start Run"],focus:"Sample Name",tip:"Identify the run using the approved QC Sample Name, rather than a patient MRN."},
  {heading:"Start the control",screen:"RUN CONFIRMATION",items:["Review QC name","Confirm pouch","Start Run"],focus:"Start Run",tip:"Verify pouch/control identity before selecting Start Run."}];
 if(!scenes)return "";
 return '<div class="qc-instrument-walkthrough">'+screenGallery(scenes,getConfig(sec.id).brand)+'</div>';
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
 return '<div class="qc-final-doc" aria-label="QC print and binder filing procedure">'+
 '<div class="qc-final-intro"><span class="qc-final-mark">QC</span><div><strong>Finish with the verified QC record</strong><p>Only file accepted results. Document and escalate any out-of-range control according to the current SOP before patient testing.</p></div></div>'+
 '<div class="qc-final-section-label">01 · Get the printout or authorized record</div>'+
 screenGallery(cfg.steps,cfg.brand)+
 '<div class="qc-final-section-label">02 · Identify, organize and file</div>'+
 '<div class="qc-binder-layout"><div class="qc-binder-pictogram">'+binderSvg()+'</div><div class="qc-binder-text"><span>FILE IN</span><strong>'+esc(cfg.binder)+'</strong>'+
 '<ol><li>Verify the report shows the instrument, date, test/panel, control level or type, lot, and result.</li><li>Confirm result acceptance and add operator identification or any missing required log details.</li><li>Place the printout in the designated QC binder section, grouped by date and QC category.</li></ol>'+
 '<p>'+esc(cfg.note)+'</p></div></div></div>';
}
window.LAB_QC_GUIDE={isQcGroup:isQcGroup,sysmexStep:sysmexStep,qcClickStep:qcClickStep,controlNotes:controlNotes,printStep:printStep};
})();