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
/* Keep the sample selector in the PT page heading at every guided step.
   The selected vial reference belongs to the first procedure step only. */
function materialPicker(id,st){
 if(id==="pathfast"){
  const assays=[["troponin","hs-Troponin I"],["ddimer","D-dimer"],["ntprobnp","NT-proBNP"]];
  const codes=[["","Select code on shipment"],["CM","CM · Cardiac markers"],["PSC","PSC · Cardiac pilot"],["other","Other event code"]];
  return '<div class="ptg-header-controls">'+
   '<label>PT analyte<select data-ptg-field="assay" aria-label="Choose PATHFAST PT analyte">'+
   assays.map(a=>'<option value="'+a[0]+'"'+(st.assay===a[0]?' selected':'')+'>'+a[1]+'</option>').join('')+'</select></label>'+
   '<label>API event code<select data-ptg-field="code" aria-label="Choose PATHFAST API event code">'+
   codes.map(a=>'<option value="'+a[0]+'"'+(st.code===a[0]?' selected':'')+'>'+a[1]+'</option>').join('')+'</select></label></div>';
 }
 const options=materials[id]||[{id:"EVENT",name:"PT material assigned to this instrument",code:"PT",color:"#79989c",note:"Verify the event instructions and sample code."}];
 const selected=selectedMaterial(id,st)||options[0];
 const other=id!=="piccolo";
 const choices=[...options,...(other?[{id:"OTHER",name:"Other assigned PT material"}]:[])];
 return '<div class="ptg-header-controls"><label>Choose PT sample<select data-ptg-field="material" aria-label="Choose PT sample type for '+e(id)+'">'+
  choices.map(o=>'<option value="'+e(o.id)+'"'+(o.id===selected.id?' selected':'')+'>'+e(o.name)+'</option>').join('')+
  '</select></label></div>';
}
function materialPreview(id,st){
 if(id==="pathfast"){
  const assays=[["troponin","hs-Troponin I","#5c91a3"],["ddimer","D-dimer","#6d9b83"],["ntprobnp","NT-proBNP","#a58cad"]];
  const a=assays.find(v=>v[0]===st.assay)||assays[0];
  const code=st.code==="other"?"EVENT":st.code||"PT";
  const notes={troponin:"Verify the PT event reporting units for hs-Troponin I.",ddimer:"Check the D-dimer unit type and required API reporting unit.",ntprobnp:"PATHFAST measures NT-proBNP, not BNP."};
  return '<section class="ptg-specimen-reference" aria-label="PATHFAST PT vial reference"><div class="ptg-specimen-label">PT sample reference</div>'+
    '<div class="ptg-specimen-preview"><div class="ptg-specimen-art">'+vialSvg(a[1],code,a[2])+'</div><div class="ptg-specimen-copy">'+
    '<strong>'+e(a[1])+' · '+e(st.code||"Confirm event code")+'</strong><p>'+e(notes[st.assay]||notes.troponin)+' Match the event sample number, preparation and specimen type to the shipment.</p>'+
    '<small>Illustration only. CM and PSC are code references, not proof of assay enrollment.</small></div></div></section>';
 }
 const selected=selectedMaterial(id,st)||{id:"EVENT",name:"Assigned PT material",code:"PT",color:"#79989c",note:"Confirm the event sheet."};
 return '<section class="ptg-specimen-reference" aria-label="PT vial reference"><div class="ptg-specimen-label">PT sample reference</div>'+
   '<div class="ptg-specimen-preview"><div class="ptg-specimen-art">'+vialSvg(selected.name,selected.code,selected.color)+'</div>'+
   '<div class="ptg-specimen-copy"><strong>'+e(selected.name)+'</strong><p>'+e(selected.note)+'</p>'+
   '<small>Illustration only. Verify the actual vial, sample code and preparation with the API event.</small></div></div></section>';
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
 const all=st.mode==="all";
 const nav='<div class="ptg-transport" role="group" aria-label="PT step navigation">'+
  '<button type="button" data-ptg-step="'+(st.step-1)+'"'+(st.step===0?' disabled':'')+' aria-label="Previous PT step">← Previous</button>'+
  (st.step<sequence.length-1?'<button type="button" class="ptg-next" data-ptg-step="'+(st.step+1)+'" aria-label="Next PT step">Next step →</button>':
   '<button type="button" class="ptg-next" data-ptg-mode="all">View all steps ↗</button>')+'</div>';
 const stepTitle=(item,i)=>{
  if(id!=="piccolo"||i!==0)return item[0];
  const v=selectedMaterial(id,st);
  return "Confirm "+(v?.id==="CRP"?"CRP":"CH")+" PT sample";
 };
 const stage=(item,i,focused=false)=>{
  const choice=selectedMaterial(id,st);
  const desc=id==="piccolo"&&i===0?(choice?.id==="CRP"?
   "Match the CRP proficiency vial to the API event and prepare the CRP-capable disc specified on its worksheet.":
   "Match the CH chemistry vial to the API event and confirm the prescribed chemistry disc(s) and specimen preparation."):item[1];
  return '<article class="ptg-stage'+(i===sequence.length-1?' ptg-stage-final':'')+'">'+
   '<header class="ptg-stage-head"><span class="ptg-number">'+String(i+1).padStart(2,"0")+'</span>'+
   '<div class="ptg-stage-heading"><span class="ptg-stage-kicker">STEP '+(i+1)+' OF '+sequence.length+'</span><h3>'+e(stepTitle(item,i))+'</h3></div>'+
   (focused?nav:"")+'</header>'+
   '<div class="ptg-stage-body"><p class="ptg-stage-description">'+e(desc)+'</p>'+
   (i===0?materialPreview(id,st):"")+
   (i===1&&id==="sysmex"?adapterReference():"")+
   (i===sequence.length-1?documentation():"")+
   '</div></article>';
 };
 const strip=sequence.map((item,i)=>
  '<button type="button" data-ptg-step="'+i+'" class="ptg-step-tab'+(st.step===i&&!all?' is-active':'')+'" '+
  (st.step===i&&!all?'aria-current="step"':'')+
  ' title="'+e(stepTitle(item,i))+'" aria-label="Step '+(i+1)+': '+e(stepTitle(item,i))+'">'+
  '<span class="ptg-step-num">'+String(i+1).padStart(2,"0")+'</span><span class="ptg-step-name">'+e(stepTitle(item,i))+'</span></button>').join("");
 const controls='<div class="ptg-controls" role="group" aria-label="PT procedure display mode">'+
  '<button type="button" data-ptg-mode="guided" aria-pressed="'+(!all)+'" class="'+(!all?'is-active':'')+'">Guided view</button>'+
  '<button type="button" data-ptg-mode="all" aria-pressed="'+all+'" class="'+(all?'is-active':'')+'">All steps</button></div>';
 return '<div class="ptg-workflow-head"><div class="ptg-workflow-status"><span class="ptg-status-dot" aria-hidden="true"></span><strong>'+
  sequence.length+' steps · '+(all?'Complete procedure':'Focused step view')+'</strong></div>'+controls+'</div>'+
  '<nav class="ptg-step-strip" aria-label="Jump to a PT step">'+strip+'</nav>'+
  '<div class="ptg-progress" role="progressbar" aria-label="PT procedure progress" aria-valuemin="0" aria-valuemax="'+sequence.length+'" aria-valuenow="'+(all?sequence.length:st.step+1)+'">'+
  '<span style="width:'+((all?sequence.length:st.step+1)/sequence.length*100)+'%"></span></div>'+
  '<div class="ptg-focused-stage" id="ptg-current-step" tabindex="-1">'+
  (all?'<div class="ptg-all-steps">'+sequence.map((item,i)=>stage(item,i)).join('')+'</div>':stage(sequence[st.step],st.step,true))+'</div>'+
  '<div class="ptg-print-only">'+sequence.map((item,i)=>stage(item,i)).join('')+'</div>';
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
  ["Test as a patient sample",other[sec.id]||"Use the approved patient testing procedure for the assigned PT material."],
  ["Review and print","Verify the result, specimen ID and any flags, then print the original result for each assigned sample."]
 ];
 const full=[...sequence,fileStep()];
 const patient=patientGroup(sec,groups);
 const st=stateFor(sec.id,full.length);
 return '<section class="ptg-page"><header class="ptg-head"><div class="ptg-title"><span>API · PROFICIENCY TESTING</span>'+
  '<h2>PT testing</h2><p>Follow the routine patient method with the assigned PT sample and its exact event ID.'+
  (cfg?'':' Only test if this assay and site are enrolled.')+'</p></div>'+
  '<div class="ptg-heading-picker" data-ptg-picker="'+e(sec.id)+'">'+materialPicker(sec.id,st)+'</div></header>'+
  '<div class="ptg-workflow" data-ptg-workflow="'+e(sec.id)+'">'+workflow(sec.id,full)+'</div>'+
  actions(patient)+
  '<p class="ptg-foot">Test PT as patient specimens. Do not perform extra grading-driven repeats or refer PT specimens. File under the matching event tab and retain records for at least two years. <a target="_blank" rel="noopener noreferrer" href="'+cms+'">CMS requirements ↗</a></p></section>';
}
function refresh(host,id,field){
 const seq=stepsSaved.get(id);
 if(!seq)return;
 const page=host.closest(".ptg-page");
 const heading=page?.querySelector("[data-ptg-picker]");
 if(field&&heading)heading.innerHTML=materialPicker(id,stateFor(id,seq.length));
 host.innerHTML=workflow(id,seq);
 if(field){
  const select=heading?.querySelector('[data-ptg-field="'+field+'"]');
  if(select&&typeof select.focus==="function")select.focus({preventScroll:true});
 }else{
  const stage=host.querySelector("#ptg-current-step");
  if(stage&&typeof stage.focus==="function"){
   stage.focus({preventScroll:true});
   const b=stage.getBoundingClientRect();
   if((b.top<90||b.top>window.innerHeight-140)&&typeof stage.scrollIntoView==="function")
    stage.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  }
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