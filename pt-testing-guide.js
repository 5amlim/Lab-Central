/* PT testing: instrument-specific differences with links back to routine patient testing. */
(function(){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const programs={
 sysmex:{codes:"HSY",mode:"Patient sample · green vial adapter",note:"Run the HSY PT material as a routine patient sample, with the green adapter fitted for the smaller PT vial. Do not save the result under QC.",steps:[
 ["Verify HSY event and prepare vial","Match the exact HSY event, assigned specimen ID and API instructions. Mix, prepare and handle the vial according to the PT insert, rather than assuming standard whole-blood collection directions."],
 ["Fit the green adapter","Place the approved green pocH-100i control-vial adapter into the sample holder. Seat the smaller PT vial securely. Confirm the vial fits without forcing the holder or chamber."],
 ["Run as a patient sample","Use the routine CBC patient-testing workflow, not the QC file. Enter the exact HSY sample number as the sample ID. Use PT Sample in a separate name field only if available."],
 ["Review and print CBC results","Check the completed CBC, differential, flags, specimen ID and all reportable values. Print the analyzer report for every assigned HSY sample."]]},
 triage:{codes:"CM / PSC",mode:"Miscellaneous Test",note:"Select Miscellaneous Test on the Triage MeterPro, then follow the normal assay-specific cartridge and patient-testing workflow.",steps:[
 ["Confirm PT event and assay","Match the CM or PSC event and the exact vial ID. Verify the assigned troponin I and/or D-dimer assay, acceptable PT material preparation and cartridge readiness."],
 ["Select Miscellaneous Test","Choose Miscellaneous Test (Misc Test), not a real patient record. Enter the exact PT sample ID in the available identifier field."],
 ["Load and run the cartridge","Prepare the assigned PT specimen according to its insert. Use the usual cartridge, sample volume, analyzer prompts and routine patient-testing frequency."],
 ["Review and print results","Check valid completion, any flags, reportable values and units. Print the original Triage reports and reconcile only the enrolled analytes with the API worksheet."]]},
 piccolo:{codes:"CH / CRP",mode:"Analyze → Control",note:"For Piccolo Xpress select Control instead of Patient. PT material is still evaluated as proficiency testing, not against routine QC limits.",steps:[
 ["Verify event and correct disc","Confirm the assigned CH or CRP program and PT sample ID. Select the required chemistry disc (such as MetLyte + CRP or MetLac 12), and check its lot and expiration."],
 ["Prepare and load the disc","Prepare the PT material per its event instructions. Transfer material through the normal Piccolo sample port using the approved transfer device, avoiding bubbles."],
 ["Choose Control and run","On Piccolo select Analyze, load and close the disc drawer, then choose Control instead of Patient. Enter the exact PT sample identifier where supported."],
 ["Review and print analytes","Verify the panel, instrument flags, measured results, identifiers and reportable units. Print the full disc report for each assigned specimen."]]},
 torch:{codes:"GIP",mode:"Routine GI patient run",note:"Run the assigned GIP material on BioFire TORCH using the GI patient-testing procedure, after the event-specific specimen preparation.",steps:[
 ["Verify GIP event and sample","Confirm the assigned GIP vial ID, GI pouch, expiration, and event-specific reconstitution or handling. Do not assume the supplied PT specimen is already in Cary-Blair."],
 ["Prepare the GI pouch","Use the established TORCH GI procedure for pouch hydration, GI sample buffer, specimen transfer and loading, after preparing the PT material exactly as directed."],
 ["Run as a GI patient sample","Choose an available TORCH module and routine GI sample run. Enter the exact GIP specimen code instead of a patient MRN, then verify the pouch/sample match."],
 ["Review and print the GI report","Confirm a valid run and internal controls. Print the complete GI pathogen report and reconcile each enrolled organism result with the API worksheet."]]},
 poc:{codes:"HV",mode:"Routine rapid HIV test",note:"Use the approved rapid HIV test and normal read window. Photograph the completed device at the valid read time and print those photos.",steps:[
 ["Match the HV event and kit","Confirm the exact HV sample ID, assigned HIV assay, kit lot/expiration and required PT material preparation. Use the actual manufacturer IFU."],
 ["Perform the patient-equivalent test","Follow the approved rapid HIV transfer, reagent and timing instructions with the assigned PT material. Do not alter the routine patient read window."],
 ["Read result and take photographs","At the authorized read time, confirm a valid control and interpret the HIV test result. Take clear photos showing the device, control/test area and correct PT specimen ID. Record the result and read time."],
 ["Print photos and record interpretation","Print the valid-read-time photographs and record the interpretation for each HV sample. Verify the sample ID and event worksheet before submitting the result."]]}
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
/* PT guided view is independent of the standard patient-testing stepper.
   Preserve the active PT step when the user navigates between instrument tabs. */
const ptView=new Map();
const ptSequences=new Map();
function viewFor(id,total){
 const previous=ptView.get(id)||{mode:"guided",step:0};
 return {mode:previous.mode==="all"?"all":"guided",step:Math.max(0,Math.min(total-1,previous.step||0))};
}
function workflow(id,sequence){
 const {mode,step}=viewFor(id,sequence.length);
 ptView.set(id,{mode,step});
 ptSequences.set(id,sequence);
 const stage=(entry,i)=>'<article class="ptg-step'+(i===sequence.length-1?' ptg-filing-step':'')+'" aria-label="PT step '+(i+1)+' of '+sequence.length+'"><b>'+String(i+1).padStart(2,"0")+'</b><div><h3>'+e(entry[0])+'</h3><p>'+e(entry[1])+'</p></div></article>'+(id==="sysmex"&&i===1?figures():"");
 const choice=sequence.map((entry,i)=>'<button type="button" class="ptg-step-tab'+(i===step?' is-active':'')+'" data-ptg-step="'+i+'" aria-current="'+(i===step?'step':'false')+'" title="'+e(entry[0])+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+e(entry[0])+'</button>').join("");
 const controls='<div class="ptg-controls" role="group" aria-label="PT procedure display mode"><button type="button" data-ptg-mode="guided" aria-pressed="'+(mode==="guided")+'" class="'+(mode==="guided"?'is-active':'')+'">Guided view</button><button type="button" data-ptg-mode="all" aria-pressed="'+(mode==="all")+'" class="'+(mode==="all"?'is-active':'')+'">All steps</button></div>';
 const nav=mode==="guided"?'<div class="ptg-transport"><button type="button" data-ptg-step="'+(step-1)+'"'+(step===0?' disabled':'')+'>← Previous</button><button type="button" class="ptg-next" data-ptg-step="'+(step+1)+'"'+(step===sequence.length-1?' disabled':'')+'>'+(step===sequence.length-1?'All steps complete':'Next step →')+'</button></div>':'';
 const selected=mode==="guided"?stage(sequence[step],step):'<div class="ptg-all-steps">'+sequence.map(stage).join("")+'</div>';
 return '<div class="ptg-workflow-head"><div><span class="ptg-current-label">'+(mode==="guided"?'Step '+(step+1)+' of '+sequence.length:'Complete PT procedure · '+sequence.length+' steps')+'</span><strong>'+(mode==="guided"?e(sequence[step][0]):"All PT steps")+'</strong></div>'+controls+'</div>'+
 '<div class="ptg-progress"><span style="width:'+((mode==="all"?sequence.length:step+1)/sequence.length*100)+'%"></span></div>'+
 '<nav class="ptg-step-strip" aria-label="Jump to PT testing step">'+choice+'</nav>'+
 '<div class="ptg-focused-stage" id="ptg-current-step" tabindex="-1">'+(mode==="guided"?'<div class="ptg-stage-top"><span>PT STEP '+String(step+1).padStart(2,"0")+'</span>'+nav+'</div>':'')+selected+'</div>'+
 '<div class="ptg-print-only">'+sequence.map(stage).join("")+'</div>';
}
document.addEventListener("click",function(event){
 const button=event.target.closest("[data-ptg-step], [data-ptg-mode]");
 const panel=button?.closest(".ptg-page");
 const host=panel?.querySelector("[data-ptg-workflow]");
 if(!button||!host)return;
 const id=host.getAttribute("data-ptg-workflow"),sequence=ptSequences.get(id);
 if(!sequence?.length)return;
 const before=viewFor(id,sequence.length);
 if(button.hasAttribute("data-ptg-mode")){
  const mode=button.getAttribute("data-ptg-mode");
  if(mode!=="guided"&&mode!=="all")return;
  ptView.set(id,{...before,mode});
 }else{
  const step=Number(button.getAttribute("data-ptg-step"));
  if(!Number.isInteger(step)||step<0||step>=sequence.length)return;
  ptView.set(id,{mode:"guided",step});
 }
 host.innerHTML=workflow(id,sequence);
 const stage=host.querySelector("#ptg-current-step");
 if(stage&&typeof stage.focus==="function")stage.focus({preventScroll:true});
 const rect=stage?.getBoundingClientRect();
 if(rect&&(rect.top<100||rect.top>window.innerHeight-150)){
  stage.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 }
});

function render(sec,groups){
 if(!supports(sec))return "";
 const c=programs[sec.id],sample=c?c.codes.split(" / ")[0]:"Actual event code",id=c?sample+"# (use assigned number)":"Assigned sample ID";
 const sequence=c?c.steps:[
 ["Verify enrollment","Confirm that this clinic, instrument and assay actually have a PT event. A PT tab does not mean the analyzer is enrolled."],
 ["Prepare and identify","Follow the event instructions for PT material handling. Enter PT Sample for a supported name field, and the actual printed vial ID instead of a patient MRN."],
 ["Use the routine patient procedure",extra[sec.id]||"Follow the current analyzer patient testing procedure and approved site SOP. Test the same number of times as patient specimens."],
 ["Review and print results","Verify the completed assay, assigned sample ID, result validity, units and reportable values. Print or retain each original analyzer report (or kit record) for the event."]
 ];
 const filing=["Mount printouts, notify and file","Arrange all PT printouts (and printed HIV device photographs when applicable) on a blank sheet of paper. Secure each with double-sided tape without covering identifiers or results. Take a clear picture of the completed page, send the picture to the Lab Supervisor using the approved internal channel, then file the original page in the API binder."];
 const fullSequence=[...sequence,filing];
 const steps=fullSequence.map((v,i)=>'<article class="ptg-step"><b>'+String(i+1).padStart(2,"0")+'</b><div><h3>'+e(v[0])+'</h3><p>'+e(v[1])+'</p></div></article>').join("");
 const patient=patientGroup(sec,groups);
 return '<section class="ptg-page"><header class="ptg-head"><span>API · INSTRUMENT PROFICIENCY TESTING</span><div class="ptg-headline"><div><h2>PT testing</h2><p>Follow the patient-testing workflow and use the specific PT specimen identifier. The steps below highlight only PT differences and required documentation.</p></div><small>'+e(c?"PROGRAM REFERENCE · "+c.codes:"ONLY IF ENROLLED")+'</small></div></header>'+
 '<div class="ptg-identifiers"><div><span>NAME / PATIENT FIELD, IF AVAILABLE</span><strong>PT Sample</strong></div><div><span>SAMPLE ID INSTEAD OF MRN</span><strong>'+e(id)+'</strong></div></div>'+
 '<p class="ptg-identifiers-note">Use the exact code and number printed on the API vial or event sheet, such as an HSY sample identifier. If only one field is available, use the exact sample ID. Do not enter a real patient identity or a literal example ID.</p>'+
 '<div class="ptg-rule"><strong>Same method and frequency as patient testing</strong><p>Use routine patient personnel, workload, instrument and testing frequency. No grade-driven repeats, no PT referral to another lab, and no interlaboratory discussion of results before the deadline. Material reconstitution and storage follow the event instructions.</p></div>'+
 '<div class="ptg-mode"><div><span>'+e(c?"PT-SPECIFIC INSTRUMENT CHOICE":"ENROLLMENT REQUIRED")+'</span><strong>'+e(c?c.mode:"Only test when assigned")+'</strong><p>'+e(c?c.note:"This instrument is not listed as currently assigned in the Lab Central API program reference. Verify enrollment and an approved procedure before testing.")+'</p></div></div>'+
 '<div class="ptg-section-title"><span>GUIDED PT PROCEDURE</span><h2>Run, document and file PT</h2><p>Use the patient testing link for complete instrument instructions. Follow these PT-specific steps in order.</p></div>'+
 '<div class="ptg-workflow" data-ptg-workflow="'+e(sec.id)+'">'+workflow(sec.id,fullSequence)+'</div>'+
 '<div class="ptg-actions"><div><strong>Related instructions</strong><p>Complete the routine run, then submit and file the PT event.</p></div><div class="ptg-links">'+
 (patient?action(null,patient,"Patient testing procedure",true):"")+
 action("api","pt-handling","API sample handling")+action("api","pt-categories","API PT categories")+action("api","submit-results","Submit PT results")+'</div></div>'+
 '<p class="ptg-foot"><strong>Recordkeeping:</strong> Retain raw printouts, pictures when required, unit checks, submitted API results, evaluation and signed attestation for at least two years. <a target="_blank" rel="noopener noreferrer" href="'+source+'">CMS PT guidance ↗</a></p></section>';
}
window.LAB_PT_TESTING={supports,render,patientGroup};
})();