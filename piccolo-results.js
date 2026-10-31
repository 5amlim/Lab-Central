/* Piccolo Xpress result-printout guide.
   Source: Piccolo Xpress Quick Reference Guide (English), pp. 10 and 15–17.
   Applies to symbols on analyzer printouts, not clinical interpretation of analyte values. */
(function(){
"use strict";
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'&quot;');
const symbols=[
 {symbol:"*",name:"Outside reference range",meaning:"An analyte is outside its printed reference interval. A rounded value at a boundary can still be marked out of range.",action:"Review the value, units and reference interval. Escalate according to the approved reporting and critical-result procedure."},
 {symbol:"<",name:"Below measurement range",meaning:"The result is below the analyzer's dynamic range. It is not an exact measured concentration.",action:"Review the associated error report if available. Do not treat the displayed boundary as an exact result."},
 {symbol:">",name:"Above measurement range",meaning:"The result is above the analyzer's dynamic range. It is not an exact measured concentration.",action:"Follow the approved procedure for out-of-range results and consult the error report."},
 {symbol:"c / C",name:"Calculated result",meaning:"A calculated value rather than a directly measured concentration, such as a calculated eGFR.",action:"Check the calculation context and limitations before reporting."},
 {symbol:"QC OK",name:"Internal QC passed",meaning:"The analyzer's internal quality-control checks passed for the run.",action:"This is internal QC. It does not replace required external control testing or review of individual results."},
 {symbol:"N/C",name:"Not calculated",meaning:"The analyzer did not calculate this result.",action:"Do not report a numerical value for this item. Review accompanying messages."},
 {symbol:"!",name:"CONFIRM LOW RECOVERIES",meaning:"At least one analyte has a lower concentration than normally expected; the message may accompany multiple analytes.",action:"Rerun the sample once per the manufacturer guide. If repeated, investigate possible sample issues and follow the SOP."},
 {symbol:"H after LD",name:"LD hemolysis warning",meaning:"H after an LD result indicates hemolysis might affect that LD result.",action:"Review the interference information. Do not disregard this flag."},
 {symbol:"< … H for LD",name:"More extensive LD hemolysis",meaning:"The manufacturer notes that < before and H after an LD result can indicate more extensive hemolysis and a true LD below the reported value.",action:"Follow the analyzer/assay SOP; do not treat the result as an uncomplicated numerical LD value."},
 {symbol:"~~~",name:"Result suppressed",meaning:"The chemistry result could not be determined. This can reflect reaction problems, concentrations outside capability, or thermal stress.",action:"Do not release a number for this analyte. Check or print the error report and troubleshoot."},
 {symbol:"HEM",name:"Hemolysis interference",meaning:"When printed instead of an analyte result, hemolysis (possibly with another interferent) affected that measurement.",action:"Do not report that analyte as a numeric result. Inspect HEM/LIP/ICT indices and follow the rejection/recollection procedure."},
 {symbol:"LIP",name:"Lipemia interference",meaning:"When printed instead of an analyte result, lipemia (possibly with icterus) affected that measurement.",action:"Do not report that analyte as a numeric result. Inspect indices and apply the approved follow-up."},
 {symbol:"ICT",name:"Icterus interference",meaning:"When printed instead of an analyte result, icterus affected that measurement.",action:"Do not report that analyte as a numeric result. Inspect indices and apply the approved follow-up."}
];
const tiers=[
 ["0","Clear","No detected sample interference at that qualitative index."],
 ["1+","Slight","Mild detected hemolysis, lipemia or icterus index."],
 ["2+","Moderate","Moderate detected interference index; investigate analyte-specific effects."],
 ["3+","Gross","Marked interference index; review suppressed results and specimen suitability."]
];
function rows(){return symbols.map(s=>'<article class="pxr-flag-card"><header><span class="pxr-symbol">'+E(s.symbol)+'</span><strong>'+E(s.name)+'</strong></header><div class="pxr-flag-body"><p>'+E(s.meaning)+'</p><div class="pxr-action"><span>What to do</span><p>'+E(s.action)+'</p></div></div></article>').join('');}
function sample(){
 // Manufacturer's receipt is a narrow thermal strip with a centered panel name,
 // left/right metadata, and four fixed-width analyte columns. All IDs are fictional.
 const width=37;
 const center=s=>" ".repeat(Math.max(0,Math.floor((width-s.length)/2)))+s;
 const field=(label,value)=>label.padEnd(20," ")+String(value).padStart(17," ");
 const analyte=(name,value,range,unit)=>String(name).padEnd(6," ")+String(value).padStart(7," ")+String(range).padStart(13," ")+String(unit).padStart(11," ");
 const chemistry=[
  ["NA+","137","128-145","mmol/L"],
  ["K+","4.0","3.6-5.1","mmol/L"],
  ["tCO2","28","18-33","mmol/L"],
  ["CL-","103","98-108","mmol/L"],
  ["GLU","7.8*","4.05-6.55","mmol/L"],
  ["CA","2.2","2.0-2.58","mmol/L"],
  ["BUN","4.2","2.5-7.9","mmol/L"],
  ["CRE","79","53-106","umol/L"],
  ["eGFR","60 c","","mL/min"],
  ["ALP","91","42-141","U/L"],
  ["ALT","29","10-47","U/L"],
  ["AST","25","11-38","U/L"],
  ["TBIL","14.2","3.4-27.4","umol/L"],
  ["ALB","44","33-55","g/L"],
  ["TP","78","64-81","g/L"]
 ];
 const receipt=[
  center("piccolo xpress"),
  center("Comprehensive"),
  center("Metabolic Panel"),
  "",
  field("01 Jan 2026","10:24 AM"),
  field("Sample Type:","Patient"),
  field("Patient ID:","SAMPLE001"),
  field("Disc Lot Number:","DEMOLOT"),
  field("Serial Number:","DEMO000"),
  "-".repeat(width),
  ...chemistry.map(row=>analyte(...row)),
  "",
  "QC     OK",
  "HEM 1+       LIP 0       ICT 0"
 ].join("\n");
 return '<section class="pxr-printout" aria-label="Annotated example of a Piccolo result printout">'+
 '<div class="pxr-paper-area"><div class="pxr-printout-paper"><pre class="pxr-receipt-text">'+E(receipt)+'</pre></div>'+
 '<p class="pxr-paper-caption">Sample receipt layout · fictional patient ID, lot and serial number</p></div>'+
 '<div class="pxr-printout-key"><h3>How to read this example</h3>'+
 '<div><b>Header</b><span>The disc/panel name appears above the run date and time. Sample type, sample ID, lot, and serial number appear in aligned fields.</span></div>'+
 '<div><b>Analyte rows</b><span>Four fixed-width columns show the analyte, result, reference interval, and units. The <b>*</b> next to GLU indicates a result outside its example interval.</span></div>'+
 '<div><b>QC OK</b><span>Internal quality checks passed. This does not replace external QC or review of result flags.</span></div>'+
 '<div><b>HEM / LIP / ICT</b><span>Qualitative sample interference indices appear beneath the QC line.</span></div>'+
 '<p class="pxr-sample-disclaimer">Illustrative result values and identifiers only. Actual panels, units and reference intervals depend on analyzer settings and reagent disc. Not a patient result.</p></div></section>';
}

function render(){
 return '<section class="pxr-guide" aria-label="Piccolo Xpress result interpretation"><div class="pxr-hero"><div><span class="pxr-kicker">PICCOLO XPRESS · RESULT PRINTOUT</span><h2>Result interpretation</h2><p>Understand the printed symbols, internal QC status, and interference flags before documenting or releasing a result.</p></div><span class="pxr-reference-badge">STAFF REFERENCE</span></div>'+
 '<div class="pxr-alert"><strong>Important:</strong> A result marked with an asterisk is different from a result suppressed by ~~~, HEM, LIP or ICT. Suppressed values do not provide a numerical result for that analyte. Follow the approved instrument SOP and notify the provider when appropriate.</div>'+
 '<h3 class="pxr-section-heading">Anatomy of a printout</h3>'+sample()+
 '<h3 class="pxr-section-heading">What each symbol means</h3><div class="pxr-flag-grid">'+rows()+'</div>'+
 '<section class="pxr-indices"><h3>HEM / LIP / ICT indices</h3><p>These indicate the qualitative degree of <b>hemolysis (HEM)</b>, <b>lipemia (LIP)</b>, and <b>icterus (ICT)</b> in the specimen. Their 0 to 3+ scale is distinct from a flag printed instead of an analyte value.</p><div class="pxr-indices-grid">'+tiers.map(([v,h,d])=>'<div><strong>'+E(v)+'</strong><b>'+E(h)+'</b><span>'+E(d)+'</span></div>').join('')+'</div><p>The presence of an index does not automatically suppress every analyte. Confirm which individual results were reported and which were withheld.</p></section>'+
 '<section class="pxr-trouble"><h3>When an analyzer suppresses a result or cancels a disc</h3><ol><li>Do not manually enter or release a missing or suppressed analyte concentration.</li><li>Review the screen message and print or save the analyzer error report.</li><li>If the disc cancels, capture the product/panel name, lot number, four-digit error code and specimen type.</li><li>Follow the current SOP to troubleshoot, repeat or recollect. Escalate unresolved errors to the lab supervisor or manufacturer technical support.</li></ol><p>A displayed <b>QC OK</b> does not override a suppressed analyte flag. The analyzer uses internal QC to prevent potentially inaccurate values from being reported.</p></section>'+
 '<p class="pxr-source">Printout format based on the <a href="https://piccolo-xpress.sirv.com/resources/brochures/piccolo-xpress-quick-reference-guide.pdf" target="_blank" rel="noopener noreferrer">Piccolo Xpress Quick Reference Guide</a>, English page 10 (“Interpreting Results”); symbol guidance also references pages 15–17 (“Troubleshooting”). This is a guide to printout notation, not a clinical decision algorithm. Verify current panel-specific instructions and the approved laboratory SOP.</p></section>';
}
window.LAB_PICCOLO_RESULTS={render};
})();