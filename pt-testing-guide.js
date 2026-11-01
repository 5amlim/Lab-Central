/* Concise, instrument-specific proficiency testing references. */
(function(){
"use strict";
const e=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cms="https://www.cms.gov/medicare/health-safety-standards/clinical-laboratory-improvement-amendments-clia/clia-regulations-compliance/proficiency-testing-program-requirements-general-cytology";
const adapter="https://imgcdn.mckesson.com/CumulusWeb/Images/Item_Detail/1086170_front.jpg";
const adapterPage="https://mms.mckesson.com/product/1086170/Sysmex-America-44230512";
const configs={
 sysmex:{label:"HSY",mode:"Patient run · green adapter",steps:[
 ["Confirm HSY sample","Match the vial ID and event. Mix and prepare the PT vial exactly as instructed by API."],
 ["Fit green adapter","Seat the small PT vial in the approved green pocH adapter. Check the fit before closing the holder."],
 ["Run and print","Run the usual CBC patient test, not QC. Enter the actual HSY sample ID, check CBC/differential and flags, then print all reports."]]},
 triage:{label:"CM / PSC",mode:"Miscellaneous Test",steps:[
 ["Verify cardiac PT material","Match the event code, vial ID and assigned Triage cartridge/analytes. Prepare the vial per API instructions."],
 ["Select Miscellaneous Test","Choose Misc Test rather than a patient record. Enter the exact PT specimen ID."],
 ["Run and print","Process with the routine patient cartridge workflow. Check flags and units; print all enrolled cardiac results."]]},
 piccolo:{label:"CH / CRP",mode:"Analyze → Control",steps:[
 ["Identify the two PT sample types","CH is the chemistry PT material; CRP is the separate C-reactive protein PT material. Confirm each vial and the assigned disc before testing."],
 ["Prepare and choose Control","Load the appropriate disc as usual, avoiding bubbles. In Analyze, select Control instead of Patient and enter the assigned PT sample ID."],
 ["Review and print","Run the assigned disc for each material, verify the requested analytes and units, then print every result. Do not treat PT as routine QC grading."]]},
 torch:{label:"GIP",mode:"GI patient-testing run",steps:[
 ["Verify GIP material","Match the GI PT sample ID and pouch. Prepare the material per the current event sheet."],
 ["Prepare and run GI pouch","Use the regular TORCH GI patient steps for hydration, buffer, transfer and pouch loading. Enter the actual GIP code as the sample ID."],
 ["Review and print","Confirm a valid run and internal controls. Print the complete GI pathogen report for each sample."]]},
 poc:{label:"HV",mode:"Routine rapid HIV test",steps:[
 ["Check HIV event and kit","Match the HV vial ID, approved rapid HIV test kit, and API preparation instructions."],
 ["Run and read","Follow the normal kit timing and patient-testing procedure. At the valid read time, check the control and interpret the test."],
 ["Photograph and print","Take clear photos of the completed device and assigned HV ID within the valid read window. Print the photos and record each result."]]},
 pathfast:{label:"VERIFY EVENT CODE",mode:"Routine PATHFAST SAMPLE run",steps:[
 ["Choose analyte and vial code","Select the assigned PATHFAST analyte and program code below. Match the actual API vial, sample number, and event sheet; the code is not automatically assigned to any assay."],
 ["Prepare and run SAMPLE","Prepare PT material according to its insert. Use PATHFAST's normal patient SAMPLE workflow, select the correct assay, and enter the exact PT sample ID."],
 ["Review and print","Confirm completed hs-Troponin I, D-dimer or NT-proBNP results, units and flags. Print all assigned results and compare to the API worksheet."]]}
};
const other={
 clinitek:"Use the correct UA or hCG patient-test mode. Follow the event's PT-material preparation.",
 spotfire:"Use the assigned respiratory or throat panel with its normal patient workflow. Verify PT matrix compatibility.",
 sofia:"Use the assigned Sofia 2 assay and normal cassette/reader procedure and timing.",
 febridx:"Confirm compatible approved PT material. Do not substitute venous blood for a fingerstick-only test.",
 hemocue:"Use the routine patient hemoglobin method with the compatible assigned PT material.",
 coagsense:"Use the routine patient coagulation workflow only if the PT sample matrix is approved for the instrument.",
 "drug-screen":"Use the enrolled rapid panel and its normal patient read window; report only assigned analytes."
};
const remembered=new Map();
const stepsSaved=new Map();
function supports(sec){return !!sec&&!sec.archived&&["Analyzers","Point of care"].includes(sec.category);}
function patientGroup(sec,groups){
 const x=(groups||[]).find(g=>/^(patient|patient-testing|ua-strip|running-samples|running-patient-samples|running-tests)(-|$)/i.test(g.id)||/^Running (Patient )?Samples|^Running tests|^Patient testing/i.test(g.title));
 return x?(sec.id==="clinitek"?"ua-strip":x.id):null;
}
function stateFor(id,length){
 const v=remembered.get(id)||{step:0,mode:"guided",assay:"troponin",code:"",material:""};
 return {...v,step:Math.max(0,Math.min(length-1,v.step))};
}

function fileStep(){
 return ["Print, notify, and file under the correct event","Tape all instrument printouts (and HIV photographs, if applicable) onto a blank sheet with double-sided tape, keeping IDs and results visible. Send a clear photo to the Lab Supervisor. File the original sheet in the API binder under the matching event tab (correct code, shipment, and year)."];
}
function vialSvg(label,code,color){
 return '<svg class="ptg-vial-svg" viewBox="0 0 130 180" role="img" aria-label="Illustration of '+e(label)+' PT vial, not an actual API vial photo" xmlns="http://www.w3.org/2000/svg">'+
 '<ellipse cx="65" cy="167" rx="33" ry="6" fill="#dce9ed"/>'+
 '<rect x="42" y="20" width="46" height="127" rx="9" fill="#f9fcfe" stroke="#9db7c2" stroke-width="2.5"/>'+
 '<rect x="39" y="11" width="52" height="30" rx="6" fill="'+color+'"/>'+
 '<path d="M45 98h40v38q-20 10-40 0z" fill="#e8f3f4"/>'+
 '<rect x="44" y="64" width="42" height="41" rx="5" fill="white" stroke="#d9e6ea"/>'+
 '<text x="65" y="79" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#23757c">'+e(code||"PT")+'</text>'+
 '<text x="65" y="94" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#527887">SAMPLE</text></svg>';
}
/* Program names are reference choices, not evidence of enrollment.
   Never equate a drawing's cap color or shape with the shipped PT material. */
const materials={
 piccolo:[
  {id:"CH",name:"CH · Chemistry PT sample",code:"CH",color:"#598f9e",note:"Use the CH vial and the chemistry disc(s) specified on that event. Check every requested analyte and panel."},
  {id:"CRP",name:"CRP · C-reactive protein PT sample",code:"CRP",color:"#927aa7",note:"This is a separate CRP PT specimen. Use the assigned CRP-capable disc and event worksheet."}
 ],
 sysmex:[{id:"HSY",name:"HSY · CBC PT sample",code:"HSY",color:"#a47f9a",note:"Small specimen vial. The approved green adapter is shown in the next step."}],
 triage:[
  {id:"CM",name:"CM · Cardiac marker sample",code:"CM",color:"#548fa2",note:"Check which cardiac assays and units are actually listed for this CM event."},
  {id:"PSC",name:"PSC · Cardiac pilot sample",code:"PSC",color:"#8b9b78",note:"Use only the assays assigned for the current pilot shipment."}
 ],
 torch:[{id:"GIP",name:"GIP · GI PT material",code:"GIP",color:"#598fa0",note:"Prepare the GI PT material per the event sheet. Do not assume the shipped vial is already in Cary-Blair."}],
 poc:[{id:"HV",name:"HV · Rapid HIV PT material",code:"HV",color:"#a27a97",note:"Use the assigned rapid HIV test and read within its specified time window."}],
 clinitek:[
  {id:"UA",name:"Urinalysis PT material",code:"UA",color:"#649a9b",note:"Only if the clinic has an assigned UA event and compatible testing material."},
  {id:"HCG",name:"Pregnancy hCG PT material",code:"hCG",color:"#9c88a9",note:"Confirm the actual event, pregnancy test system and compatible PT material."}
 ],
 spotfire:[
  {id:"RESP",name:"Respiratory panel PT material",code:"R",color:"#668ea8",note:"Confirm the assigned respiratory panel, sample type and event preparation."},
  {id:"ST",name:"Sore-throat panel PT material",code:"ST",color:"#a4879e",note:"Confirm the assigned sore-throat panel, sample type and event preparation."}
 ],
 sofia:[
  {id:"FLU-COVID",name:"Flu + COVID PT material",code:"F/C",color:"#5d96a3",note:"Confirm the actual Sofia 2 assay, approved specimen and event."},
  {id:"RSV",name:"RSV PT material",code:"RSV",color:"#7d9f84",note:"Only if an RSV event is assigned to this clinic."},
  {id:"STREP",name:"Strep A PT material",code:"ST",color:"#a284a7",note:"Only if a Strep A event is assigned to this clinic."}
 ],
 febridx:[{id:"FEBRIDX",name:"FebriDx PT material",code:"PT",color:"#8a9b9d",note:"Confirm an approved fingerstick-compatible PT specimen exists before testing."}],
 hemocue:[{id:"HGB",name:"Hemoglobin PT material",code:"HGB",color:"#a87989",note:"Confirm the approved matrix and event for the instrument."}],
 coagsense:[{id:"INR",name:"PT/INR proficiency material",code:"INR",color:"#688ca5",note:"Confirm the actual event material is compatible with Coag-Sense."}],
 "drug-screen":[{id:"DRUG",name:"Urine drug screen PT material",code:"PT",color:"#8b9b9f",note:"Use only an enrolled event and the approved kit-specific testing method."}]
};
function selectedMaterial(id,st){
 const options=materials[id]||[];
 if(st.material==="OTHER")return {id:"OTHER",name:"Other assigned PT material",code:"EVENT",color:"#839aa0",note:"Use the actual specimen ID, test and preparation from the current shipment."};
 return options.find(o=>o.id===st.material)||options[0]||null;
}
function materialReference(id,st){
 if(id==="pathfast"){
  const assays=[["troponin","hs-Troponin I","#5c91a3"],["ddimer","D-dimer","#6d9b83"],["ntprobnp","NT-proBNP","#a58cad"]];
  const codes=[["","Select code on shipment"],["CM","CM · Cardiac markers"],["PSC","PSC · Cardiac pilot"],["other","Other code on event"]];
  const selected=assays.find(a=>a[0]===st.assay)||assays[0];
  const label=st.code==="other"?"EVENT":st.code||"PT";
  const notes={troponin:"Use the result units required by the event for hs-Troponin I.",ddimer:"Check D-dimer unit type before result entry.",ntprobnp:"PATHFAST measures NT-proBNP, not BNP."};
  return '<section class="ptg-specimen-reference" aria-label="PATHFAST PT material reference">'+
   '<div class="ptg-assay-picker"><label>PT analyte<select data-ptg-field="assay" aria-label="Select PATHFAST analyte">'+assays.map(a=>'<option value="'+a[0]+'"'+(st.assay===a[0]?' selected':'')+'>'+a[1]+'</option>').join('')+'</select></label>'+
   '<label>Code on API event<select data-ptg-field="code" aria-label="Select API event code">'+codes.map(a=>'<option value="'+a[0]+'"'+(st.code===a[0]?' selected':'')+'>'+a[1]+'</option>').join('')+'</select></label></div>'+
   '<div class="ptg-specimen-preview"><div class="ptg-specimen-art">'+vialSvg(selected[1],label,selected[2])+'</div><div class="ptg-specimen-copy"><strong>'+e(selected[1])+' · '+e(st.code||"Verify event code")+'</strong><p>'+e(notes[st.assay]||notes.troponin)+' Match the exact sample number, material type and preparation to the shipment.</p><small>Illustration only. Program code does not confirm enrollment for this analyte.</small></div></div></section>';
 }
 const options=materials[id]||[{id:"EVENT",name:"PT material assigned to this instrument",code:"PT",color:"#79989c",note:"Check the current event for the correct sample type and analyzer method."}];
 const selected=selectedMaterial(id,st)||options[0];
 const other=id!=="piccolo"&&id!=="pathfast";
 const choice=[...options,...(other?[{id:"OTHER",name:"Other assigned PT material",code:"EVENT",color:"#839aa0",note:"Use the actual specimen ID, test and preparation from the current shipment."}]:[])];
 return '<section class="ptg-specimen-reference" aria-label="PT sample selection">'+
 '<div class="ptg-assay-picker"><label>Choose PT sample<select data-ptg-field="material" aria-label="Choose PT sample type">'+choice.map(o=>'<option value="'+e(o.id)+'"'+(st.material===o.id||(!st.material&&selected.id===o.id)?' selected':'')+'>'+e(o.name)+'</option>').join('')+'</select></label></div>'+
 '<div class="ptg-specimen-preview"><div class="ptg-specimen-art">'+vialSvg(selected.name,selected.code,selected.color)+'</div><div class="ptg-specimen-copy"><strong>'+e(selected.name)+'</strong><p>'+e(selected.note)+'</p><small>Illustration only, not an actual API vial. Verify the material and specimen ID against the shipment.</small></div></div></section>';
}
function adapterReference(){
 return '<div class="ptg-adapter"><div><strong>Green pocH adapter</strong><p>For the smaller HSY PT vial. Confirm the actual vial fits before running.</p><img loading="lazy" src="'+adapter+'" alt="Reference photo of the green Sysmex adapter"/><a href="'+adapterPage+'" target="_blank" rel="noopener noreferrer">Adapter reference ↗</a></div></div>';
}

function documentation(){
 return '<div class="ptg-fileline"><span><b>01</b> Tape printouts to blank paper</span><span><b>02</b> Send photo to Lab Supervisor</span><span><b>03</b> File under the matching API event tab</span></div>';
}
function workflow(id,sequence){
 const st=stateFor(id,sequence.length);
 remembered.set(id,st);stepsSaved.set(id,sequence);
 const stage=(item,i)=>{
  const choice=selectedMaterial(id,st);
  const title=id==="piccolo"&&i===0?"Confirm "+(choice?.id||"CH")+" PT sample":item[0];
  const description=id==="piccolo"&&i===0?((choice?.id==="CRP")?
   "Use the separate CRP proficiency specimen and the CRP-capable disc assigned for this event. Match the CRP vial ID and preparation instructions before loading.":
   "Use the CH chemistry proficiency specimen and the chemistry disc(s) assigned for this event. Match the CH vial ID and preparation instructions before loading."):item[1];
  return '<article class="ptg-stage'+(i===sequence.length-1?' ptg-stage-final':'')+'"><span class="ptg-number">'+String(i+1).padStart(2,"0")+'</span><div><h3>'+e(title)+'</h3><p>'+e(description)+'</p></div></article>'+
   (i===0?materialReference(id,st):"")+
   (i===1&&id==="sysmex"?adapterReference():"")+
   (i===sequence.length-1?documentation():"");
 };
 const strips=sequence.map((s,i)=>'<button type="button" data-ptg-step="'+i+'" class="ptg-step-tab'+(st.step===i?' is-active':'')+'" aria-current="'+(st.step===i?'step':'false')+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+e(s[0])+'</button>').join("");
 const all=st.mode==="all";
 const buttons='<div class="ptg-controls"><button type="button" data-ptg-mode="guided" aria-pressed="'+!all+'" class="'+(!all?'is-active':'')+'">Guided</button><button type="button" data-ptg-mode="all" aria-pressed="'+all+'" class="'+(all?'is-active':'')+'">All steps</button></div>';
 const nav='<div class="ptg-transport"><button type="button" data-ptg-step="'+(st.step-1)+'"'+(st.step===0?' disabled':'')+'>← Previous</button><button type="button" class="ptg-next" data-ptg-step="'+(st.step+1)+'"'+(st.step===sequence.length-1?' disabled':'')+'>'+(st.step===sequence.length-1?'Complete':'Next →')+'</button></div>';
 return '<div class="ptg-workflow-head"><strong>'+(all?'Complete PT procedure':'Step '+(st.step+1)+' of '+sequence.length)+'</strong>'+buttons+'</div>'+
 '<div class="ptg-progress"><span style="width:'+((all?sequence.length:st.step+1)/sequence.length*100)+'%"></span></div>'+
 '<nav class="ptg-step-strip" aria-label="Jump to PT step">'+strips+'</nav>'+
 '<div class="ptg-focused-stage" id="ptg-current-step" tabindex="-1">'+(all?'<div class="ptg-all-steps">'+sequence.map(stage).join('')+'</div>':'<div class="ptg-stage-nav">'+nav+'</div>'+stage(sequence[st.step],st.step))+'</div>'+
 '<div class="ptg-print-only">'+sequence.map(stage).join('')+'</div>';
}
function actions(patient){
 return '<div class="ptg-links">'+(patient?'<button type="button" data-gotab="'+e(patient)+'">Patient testing ↗</button>':'')+
 '<button type="button" data-go="api" data-target-tab="pt-handling">API handling & categories ↗</button>'+
 '<button type="button" data-go="api" data-target-tab="submit-results">Submit results ↗</button></div>';
}
function render(sec,groups){
 if(!supports(sec))return "";
 const cfg=configs[sec.id];
 const sequence=cfg?cfg.steps:[
 ["Confirm assignment","Check the clinic's actual API enrollment, specimen ID, assay and event instructions before testing."],
 ["Test as a patient sample",other[sec.id]||"Use the regular patient testing procedure, including its usual specimen and instrument requirements."],
 ["Review and print","Verify result, specimen ID and any flags; print or retain the original report for each assigned sample."]
 ];
 const full=[...sequence,fileStep()];
 const patient=patientGroup(sec,groups);
 return '<section class="ptg-page"><header class="ptg-head"><div><span>API · PROFICIENCY TESTING</span><h2>PT testing</h2><p>Run like a patient specimen using the assigned PT material and exact event sample ID. '+(cfg?'':'Only test if this assay and site are enrolled.')+'</p></div><small>'+e(cfg?cfg.label:"ONLY IF ENROLLED")+'</small></header>'+
 (sec.id==='piccolo'?'':'<div class="ptg-keyline"><strong>'+(cfg?e(cfg.mode):"Current approved patient method")+'</strong><span>Use <b>PT Sample</b> only if there is a separate name field. Use the actual vial ID instead of an MRN.</span></div>')+
 '<div class="ptg-workflow" data-ptg-workflow="'+e(sec.id)+'">'+workflow(sec.id,full)+'</div>'+
 actions(patient)+
 '<p class="ptg-foot">Use the actual PT event instructions and routine testing frequency. Do not perform extra grading-driven repeats or refer PT material to another lab. Retain the complete event records for at least two years. <a target="_blank" rel="noopener noreferrer" href="'+cms+'">CMS requirements ↗</a></p></section>';
}
function refresh(host,id,field){
 const sequence=stepsSaved.get(id);
 if(!sequence)return;
 host.innerHTML=workflow(id,sequence);
 if(field){
  const select=host.querySelector('[data-ptg-field="'+field+'"]');
  if(select)select.focus({preventScroll:true});
 }else{
  const stage=host.querySelector("#ptg-current-step");
  if(stage){stage.focus({preventScroll:true});const b=stage.getBoundingClientRect();if((b.top<90||b.top>window.innerHeight-140)&&typeof stage.scrollIntoView==="function")stage.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});}
 }
}
document.addEventListener("click",event=>{
 const btn=event.target.closest("[data-ptg-step],[data-ptg-mode]");
 if(!btn)return;
 const host=btn.closest(".ptg-page")?.querySelector("[data-ptg-workflow]");
 if(!host)return;
 const id=host.getAttribute("data-ptg-workflow"),seq=stepsSaved.get(id);
 if(!seq)return;
 const st=stateFor(id,seq.length);
 if(btn.hasAttribute("data-ptg-mode")){
  const m=btn.getAttribute("data-ptg-mode");
  if(m!=="guided"&&m!=="all")return;
  st.mode=m;
 }else{
  const num=Number(btn.getAttribute("data-ptg-step"));
  if(!Number.isInteger(num)||num<0||num>=seq.length)return;
  st.step=num;st.mode="guided";
 }
 remembered.set(id,st);refresh(host,id);
});
document.addEventListener("change",event=>{
 const sel=event.target.closest("[data-ptg-field]");
 const host=sel?.closest(".ptg-page")?.querySelector("[data-ptg-workflow]");
 if(!sel||!host)return;
 const id=host.getAttribute("data-ptg-workflow"),seq=stepsSaved.get(id);
 if(!seq)return;
 const field=sel.getAttribute("data-ptg-field");
 const value=sel.value;
 if(field==="assay"){
  if(id!=="pathfast"||!["troponin","ddimer","ntprobnp"].includes(value))return;
 }else if(field==="code"){
  if(id!=="pathfast"||!["","CM","PSC","other"].includes(value))return;
 }else if(field==="material"){
  if(id==="pathfast")return;
  const valid=(materials[id]||[]).some(v=>v.id===value)||value==="OTHER";
  if(!valid)return;
 }else return;
 const st=stateFor(id,seq.length);
 st[field]=value;
 remembered.set(id,st);
 refresh(host,id,field);
});
window.LAB_PT_TESTING={supports,render,patientGroup};
})();