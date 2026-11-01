/* PT testing: instrument-specific differences with links back to routine patient testing. */
(function(){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const programs={
 sysmex:{codes:"HSY",mode:"Patient run · green control-vial adapter",note:"Run as a patient sample, not QC. Use the green adapter to fit the small HSY PT vial.",steps:[
 ["Verify HSY and prepare vial","Match the exact HSY event, vial ID and testing instructions. Follow API material mixing, storage and preparation rather than assuming routine whole-blood collection directions."],
 ["Fit the green adapter","Insert the green pocH-100i control-vial adapter for the smaller PT vial. Seat the vial securely without forcing the holder or chamber. Check correct tube fit."],
 ["Run as a patient sample","Select the routine whole-blood patient-testing process, not a QC file. Enter the actual HSY sample number in the sample ID field; use PT Sample only if a separate name field exists."],
 ["Print and record","Verify the completed CBC and differential, flags, identifier and all reportable results. Print the analyzer report for the HSY specimen."]]},
 triage:{codes:"CM / PSC",mode:"Miscellaneous Test",note:"Use Miscellaneous Test for the PT run, while following the usual Triage assay and cartridge workflow.",steps:[
 ["Verify assigned cardiac assay","Confirm CM or PSC event, sample code, assigned troponin I and/or D-dimer assays, kit materials and current QC status."],
 ["Select Miscellaneous Test","Use the instrument Miscellaneous Test option. Enter the exact PT ID rather than any real patient MRN or identity."],
 ["Load and run routine cartridge","Prepare the PT material per API, then use the assigned patient-testing cartridge, sample volume and routine analytical procedure."],
 ["Print and reconcile results","Print each result. Reconcile unit labels, invalid flags, qualifiers and enrolled analytes with the API event before submission."]]},
 piccolo:{codes:"CH / CRP",mode:"Analyze → Control",note:"Use Control rather than Patient for the PT run. This is still PT, not routine QC.",steps:[
 ["Verify panel and event","Match the specified CH or CRP event with the correct chemistry disc, such as MetLyte + CRP or MetLac 12, and exact PT sample ID."],
 ["Prepare the disc","Prepare PT material per API and use the usual Piccolo sample port, transfer device and no-bubbles disc-loading process."],
 ["Run as Control","On Piccolo choose Analyze, load the disc, then select Control rather than Patient. Enter the actual program sample ID where supported."],
 ["Print and verify","Keep the completed disc report and check the requested analytes, units and flags. Do not judge the PT material against routine QC limits."]]},
 torch:{codes:"GIP",mode:"Patient GI workflow",note:"Run on TORCH like a patient GI specimen. Follow the API preparation instructions for the supplied PT matrix.",steps:[
 ["Confirm GI sample ID","Match the GIP event, pouch, individual vial and any reconstitution or temperature requirements. Do not assume PT material is already in Cary-Blair."],
 ["Prepare GI pouch as usual","Use the existing TORCH patient-testing steps for hydration, buffer, transfer, pouch loading and module setup, after preparing the material as the event instructs."],
 ["Enter the PT sample ID","Use the actual GIP sample number, not a patient MRN. Keep vial, pouch and analyzer run identifiers matched."],
 ["Print GI pathogen results","Verify run acceptance and internal controls; retain full output and report the enrolled organism targets requested by API."]]},
 poc:{codes:"HV",mode:"Routine rapid HIV testing",note:"Use the approved rapid HIV kit and routine read window. Photograph completed test devices and print the photos.",steps:[
 ["Match the HIV event","Verify the HV event, actual sample ID, material handling instructions and approved rapid HIV test kit."],
 ["Run the HIV test","Follow the normal rapid-test reagent, transfer, timing and interpretation instructions for the selected kit, adjusted only for supplied PT material."],
 ["Interpret at the correct read time","Check the required control and test line pattern, validity and event result categories. Record actual ID and read time."],
 ["Photograph and print","At the valid read time take legible photos of the completed device and control/test window. Print the photos and file with the interpreted result and PT packet."]]}
};
const extra={
 pathfast:"Confirm the enrolled assay and PT material compatibility. Run the routine PATHFAST patient sample method, not a special QC pathway, unless the approved local SOP specifically requires otherwise.",
 clinitek:"Use the enrolled UA or hCG patient procedure and the correct PT material preparation; do not assume an ordinary urine sample.",
 spotfire:"Follow the correct SPOTFIRE patient panel for the specimen and confirmed event. Do not assume all respiratory or sore-throat targets are enrolled.",
 sofia:"Follow the enrolled Sofia 2 Flu/COVID/RSV/Strep patient assay, with its normal reader and kit-specific timing.",
 febridx:"Confirm that a compatible PT material and approved procedure exist before attempting this fingerstick-only assay. Do not substitute venous specimen or override the IFU.",
 hemocue:"Use the enrolled HemoCue patient testing technique with a compatible assigned PT specimen and the current cuvette method.",
 coagsense:"Confirm the PT event matrix is appropriate for Coag-Sense, then use the approved patient coagulation method without extra repeats.",
 "drug-screen":"Follow the kit-specific patient method only if the drug panel is explicitly enrolled for the current event. Respect each read window and report only assigned analytes."
};
const source="https://www.cms.gov/medicare/health-safety-standards/clinical-laboratory-improvement-amendments-clia/clia-regulations-compliance/proficiency-testing-program-requirements-general-cytology";
const adapterUrl="https://mms.mckesson.com/product/1086170/Sysmex-America-44230512";
const adapterPhoto="https://imgcdn.mckesson.com/CumulusWeb/Images/Item_Detail/1086170_front.jpg";
const vialPhoto="https://www.canyons.edu/_images/academics/mlt/header-mobile-MLT04.jpg";
function supports(sec){return !!sec&&!sec.archived&&["Analyzers","Point of care"].includes(sec.category);}
function patientGroup(sec,groups){
 const x=(groups||[]).find(g=>/^(patient|patient-testing|ua-strip|running-samples|running-patient-samples|running-tests)(-|$)/i.test(g.id)||/^Running (Patient )?Samples|^Running tests|^Patient testing/i.test(g.title));
 return x?(sec.id==="clinitek"?"ua-strip":x.id):null;
}
function action(where,tab,title,primary){
 return '<button type="button" class="ptg-link'+(primary?" primary":"")+'" data-'+(where?"go":"gotab")+'="'+e(where||tab)+'"'+(where?' data-target-tab="'+e(tab)+'"':"")+'>'+e(title)+' <span aria-hidden="true">→</span></button>';
}
function figures(){
 return '<section class="ptg-figure"><header><span>SYSMEX · VIAL REFERENCE</span><h3>Green adapter and small sample vial</h3><p>The photographs show the actual green adapter listing and an example of a small vial near pocH-100i. The vial photo is not the current API HSY material. Always confirm the vial supplied in the event.</p></header><div class="ptg-photos">'+
 '<figure><img loading="lazy" src="'+adapterPhoto+'" alt="Sysmex green control-blood sample adapter, product 44230512"/><figcaption>Green tube adapter · Sysmex #44230512</figcaption></figure>'+
 '<figure class="ptg-illustration"><svg viewBox="0 0 480 220" role="img" aria-label="Illustration of small PT vial being seated in a green pocH control-blood adapter" xmlns="http://www.w3.org/2000/svg">'+
 '<rect width="480" height="220" rx="14" fill="#f8fbfc"/>'+
 '<g transform="translate(82 11)"><rect x="91" y="34" width="64" height="105" rx="13" fill="#f9fdfd" stroke="#8cabb9" stroke-width="4"/><rect x="90" y="21" width="66" height="32" rx="7" fill="#c85c77"/><rect x="98" y="76" width="50" height="45" rx="4" fill="#e8eff4"/><text x="123" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="#355f71">HSY</text><text x="123" y="112" text-anchor="middle" font-size="9" fill="#648496">PT VIAL</text><path d="M122 144v17" stroke="#218478" stroke-width="3" stroke-dasharray="4 5"/><path d="M115 157l7 10 7-10" fill="none" stroke="#218478" stroke-width="3" stroke-linecap="round"/><path d="M70 165h105v24H70z" fill="#44a786" stroke="#247d68" stroke-width="4"/><rect x="92" y="164" width="60" height="12" rx="6" fill="#e6f9ed" stroke="#247d68" stroke-width="3"/><path d="M77 189h18v20H77zm75 0h18v20h-18z" fill="#3e9e79"/></g>'+
 '<text x="309" y="91" font-size="14" font-weight="800" fill="#345b6e">Small PT vial</text><text x="309" y="109" font-size="11" fill="#6b8493">Assigned HSY code</text><text x="309" y="177" font-size="14" font-weight="800" fill="#237c68">Green adapter</text><text x="309" y="194" font-size="11" fill="#6b8493">Confirm physical fit</text></svg><figcaption>Placement illustration, not to scale or an official API sample photo</figcaption></figure>'+
 '<figure><img loading="lazy" src="'+vialPhoto+'" alt="Example of a small blood sample vial next to pocH-100i; not the API vial"/><figcaption>Example small vial, not the HSY vial</figcaption></figure></div>'+
 '<a class="ptg-source" target="_blank" rel="noopener noreferrer" href="'+adapterUrl+'">Green adapter product reference ↗</a></section>';
}
function render(sec,groups){
 if(!supports(sec))return "";
 const c=programs[sec.id],sample=c?c.codes.split(" / ")[0]:"Actual event code",id=c?sample+"# (use assigned number)":"Assigned sample ID";
 const sequence=c?c.steps:[
 ["Verify enrollment","Confirm that this clinic, instrument and assay actually have a PT event. A PT tab does not mean the analyzer is enrolled."],
 ["Prepare and identify","Follow the event instructions for PT material handling. Enter PT Sample for a supported name field, and the actual printed vial ID instead of a patient MRN."],
 ["Use the routine patient procedure",extra[sec.id]||"Follow the current analyzer patient testing procedure and approved site SOP. Test the same number of times as patient specimens."],
 ["Print and document","Retain the original result, instrument output, ID, units and any required event comments. Complete the API result submission and attestation."]
 ];
 const steps=sequence.map((v,i)=>'<article class="ptg-step"><b>'+String(i+1).padStart(2,"0")+'</b><div><h3>'+e(v[0])+'</h3><p>'+e(v[1])+'</p></div></article>').join("");
 const patient=patientGroup(sec,groups);
 return '<section class="ptg-page"><header class="ptg-head"><span>API · INSTRUMENT PROFICIENCY TESTING</span><div class="ptg-headline"><div><h2>PT testing</h2><p>Follow the patient-testing workflow and use the specific PT specimen identifier. The steps below highlight only PT differences and required documentation.</p></div><small>'+e(c?"PROGRAM REFERENCE · "+c.codes:"ONLY IF ENROLLED")+'</small></div></header>'+
 '<div class="ptg-identifiers"><div><span>NAME / PATIENT FIELD, IF AVAILABLE</span><strong>PT Sample</strong></div><div><span>SAMPLE ID INSTEAD OF MRN</span><strong>'+e(id)+'</strong></div></div>'+
 '<p class="ptg-identifiers-note">Use the exact code and number printed on the API vial or event sheet, such as an HSY sample identifier. If only one field is available, use the exact sample ID. Do not enter a real patient identity or a literal example ID.</p>'+
 '<div class="ptg-rule"><strong>Same method and frequency as patient testing</strong><p>Use routine patient personnel, workload, instrument and testing frequency. No grade-driven repeats, no PT referral to another lab, and no interlaboratory discussion of results before the deadline. Material reconstitution and storage follow the event instructions.</p></div>'+
 '<div class="ptg-mode"><div><span>'+e(c?"PT-SPECIFIC INSTRUMENT CHOICE":"ENROLLMENT REQUIRED")+'</span><strong>'+e(c?c.mode:"Only test when assigned")+'</strong><p>'+e(c?c.note:"This instrument is not listed as currently assigned in the Lab Central API program reference. Verify enrollment and an approved procedure before testing.")+'</p></div></div>'+
 '<div class="ptg-section-title"><span>REFERENCE PROCEDURE</span><h2>Run and document PT</h2><p>Use the linked patient instructions for the full testing sequence.</p></div>'+
 '<div class="ptg-steps">'+steps+'</div>'+(sec.id==="sysmex"?figures():"")+
 '<div class="ptg-actions"><div><strong>Related instructions</strong><p>Complete the routine run, then submit and file the PT event.</p></div><div class="ptg-links">'+
 (patient?action(null,patient,"Patient testing procedure",true):"")+
 action("api","pt-handling","API sample handling")+action("api","pt-categories","API PT categories")+action("api","submit-results","Submit PT results")+'</div></div>'+
 '<p class="ptg-foot"><strong>Recordkeeping:</strong> Retain raw printouts, pictures when required, unit checks, submitted API results, evaluation and signed attestation for at least two years. <a target="_blank" rel="noopener noreferrer" href="'+source+'">CMS PT guidance ↗</a></p></section>';
}
window.LAB_PT_TESTING={supports,render,patientGroup};
})();