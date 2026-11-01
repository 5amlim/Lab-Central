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
 const v=remembered.get(id)||{step:0,mode:"guided",assay:"",code:"",material:""};
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
  {id:"CH",name:"CH · Chemistry PT sample",code:"CH",color:"#598f9e",note:"Run the CH chemistry sample on both MetLyte Plus CRP and MetLac 12 discs. Verify the event's requested analytes and units."},
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
 return options.find(o=>o.id===st.material)||(options.length===1?options[0]:null);
}
function sampleLabel(o){
 return String(o.name||"PT sample").replace(/^[^·]+ · /,"");
}
/* The PT sample chooser is shared by every instrument. Single assigned samples
   use the same visual language as the dropdown trigger but are not interactive. */
function staticPicker(o){
 return '<div class="ptg-static-sample" aria-label="PT sample: '+e(o.code||"PT")+', '+e(sampleLabel(o))+'">'+
 '<span class="ptg-picker-caption">PT sample</span>'+
 '<div class="ptg-static-sample-row"><span class="ptg-picker-code">'+e(o.code||"PT")+'</span>'+
 '<strong>'+e(sampleLabel(o))+'</strong></div></div>';
}
function pickerRow(label,field,options,value,aria){
 const selected=options.find(o=>o.value===value);
 const menuOptions=options.map(o=>({value:o.value,label:o.label,badge:o.badge}));
 return '<div class="ptg-picker-field"><span class="ptg-picker-caption">'+e(label)+'</span>'+
 '<button type="button" class="ptg-picker-trigger'+(selected?' has-selection':'')+'"'+
 ' data-ptg-dropdown-trigger="'+e(field)+'" data-ptg-value="'+e(selected?.value||"")+'"'+
 ' data-ptg-options="'+e(JSON.stringify(menuOptions))+'" aria-haspopup="listbox" aria-expanded="false"'+
 ' aria-label="'+e(aria)+'">'+
 (selected?'<span class="ptg-picker-code">'+e(selected.badge||selected.value)+'</span>':'')+
 '<span class="ptg-picker-value'+(selected?'':' is-placeholder')+'">'+e(selected?.label||label+"…")+'</span>'+
 '<span class="ptg-picker-chevron" aria-hidden="true"></span></button></div>';
}
function materialPicker(id,st){
 if(id==="pathfast"){
  const assays=[
   {value:"troponin",badge:"hs-TnI",label:"High-sensitivity Troponin I"},
   {value:"ddimer",badge:"DD",label:"D-dimer"},
   {value:"ntprobnp",badge:"NT-proBNP",label:"NT-proBNP"}
  ];
  const codes=[
   {value:"CM",badge:"CM",label:"Cardiac markers"},
   {value:"PSC",badge:"PSC",label:"Cardiac pilot"},
   {value:"other",badge:"OTHER",label:"Other event on shipment"}
  ];
  return '<div class="ptg-header-controls ptg-dual-picker">'+
   pickerRow("Choose PT analyte","assay",assays,st.assay,"Choose PATHFAST PT analyte")+
   pickerRow("Choose API event code","code",codes,st.code,"Choose PATHFAST API event code")+'</div>';
 }
 const options=materials[id]||[{id:"EVENT",name:"Assigned PT sample",code:"PT",color:"#79989c",note:"Verify the event instructions and sample code."}];
 if(options.length===1)return staticPicker(options[0]);
 const choices=options.map(o=>({value:o.id,badge:o.code||o.id,label:sampleLabel(o)}));
 return '<div class="ptg-header-controls">'+
  pickerRow("Choose PT sample","material",choices,st.material,"Choose PT sample for "+id)+'</div>';
}
/* The vial is a reference illustration. Reagent selection follows the actual assigned event. */
function reagentFor(id,st){
 const mat=selectedMaterial(id,st)?.id;
 if(id==="sysmex")return null; // HSY uses an adapter, not a reagent cartridge.
 if(id==="pathfast"&&!st.assay)return null;
 if(id!=="pathfast"&&(materials[id]||[]).length>1&&!mat)return null;
 if(id==="pathfast"){
  const assays={
   troponin:["hs-Troponin I","PATHFAST test cartridge","Use the hs-Troponin I cartridge matching the installed assay. Verify the actual package label; do not substitute a conventional cTnI assay."],
   ddimer:["D-dimer","PATHFAST test cartridge","Use the PATHFAST D-dimer cartridge, and check the event's reporting units."],
   ntprobnp:["NT-proBNP","PATHFAST test cartridge","Use the PATHFAST NT-proBNP cartridge, not a BNP-only test."]
  };
  const a=assays[st.assay]||assays.troponin;
  return {name:a[0],type:a[1],note:a[2],art:"pathfast"};
 }
 if(id==="piccolo"){
  if(mat==="CRP")return {
   name:"MetLyte Plus CRP",type:"Piccolo reagent disc",tone:"metlyte",
   note:"Use the MetLyte Plus CRP disc for the separate CRP proficiency sample. Confirm reporting units on the API event worksheet.",art:"disc"
  };
  if(mat==="CH")return {
   kind:"multi",type:"Piccolo reagent discs",
   name:"Both CH reagent discs",note:"Use both discs for the CH chemistry proficiency sample. Check the assigned analytes and reporting units on the API event worksheet.",
   items:[
    {name:"MetLyte Plus CRP",badge:"METLYTE + CRP",tone:"metlyte",art:"disc",note:"Chemistry / CRP disc"},
    {name:"MetLac 12",badge:"METLAC 12",tone:"metlac",art:"disc",note:"Chemistry / lactate disc"}
   ]
  };
  return null;
 }
 const named={
  triage:{name:"Assigned cardiac test cartridge",type:"Triage MeterPro",note:"Use the cartridge and cardiac analytes listed for this CM or PSC event. Do not assume all analytes are enrolled.",art:"cassette"},
  torch:{name:"Gastrointestinal (GI) panel pouch",type:"BioFire TORCH",note:"Use the GI pouch required for the assigned GIP event.",art:"pouch"},
  poc:{name:"Approved rapid HIV test kit",type:"HIV testing",note:"Use the clinic's approved rapid HIV test device. Match the event and read window to the kit.",art:"cassette"},
  febridx:{name:"FebriDx test device",type:"Rapid test",note:"Only use PT material approved for the FebriDx fingerstick method.",art:"cassette"},
  hemocue:{name:"Hemoglobin microcuvette",type:"HemoCue",note:"Use the compatible microcuvette for the installed HemoCue model.",art:"cuvette"},
  coagsense:{name:"PT/INR test strip",type:"Coag-Sense",note:"Check compatibility of the assigned PT material before using the instrument's strip.",art:"strip"},
  "drug-screen":{name:"Assigned drug-screen test panel",type:"Rapid POC test",note:"Use the same approved panel and read window as the enrolled patient method.",art:"cassette"}
 };
 if(id==="clinitek")return mat==="HCG"?
  {name:"hCG test cassette",type:"Clinitek Status+",note:"Use the approved hCG cassette and its routine patient procedure.",art:"cassette"}:
  {name:"Urinalysis reagent strip",type:"Clinitek Status+",note:"Use the clinic's assigned UA reagent strip and confirm tested analytes.",art:"strip"};
 if(id==="spotfire")return mat==="ST"?
  {name:"Assigned sore-throat panel pouch",type:"BioFire SpotFire",note:"Check the event's exact ST panel version and preparation.",art:"pouch"}:
  {name:"Assigned respiratory panel pouch",type:"BioFire SpotFire",note:"Check whether the event requires the full or mini respiratory panel.",art:"pouch"};
 if(id==="sofia"){
  const m={
   "FLU-COVID":["Flu + COVID test cassette","Use the assigned Flu + COVID assay kit."],
   RSV:["RSV test cassette","Use the assigned RSV kit only when enrolled."],
   STREP:["Strep A test cassette","Use the assigned Strep A test kit only when enrolled."]
  }[mat]||["Assigned Sofia test cassette","Check the event's kit"];
  return {name:m[0],type:"Sofia 2",note:m[1]+" Follow the kit-specific read timing.",art:"cassette"};
 }
 return named[id]||null;
}
/* Compact, intentionally schematic test consumables. Never use artwork for product identification. */
function reagentSvg(kind,name,tone){
 const safe=e(name);
 if(kind==="disc"){
  const ring=tone==="metlyte"?"#1b9a8d":tone==="metlac"?"#7970b2":"#8fb4c4";
  const port=tone==="metlyte"?"#4cb6aa":tone==="metlac"?"#9888ca":"#4c8e9f";
  const wells=Array.from({length:24},(_,i)=>{
   const a=i*Math.PI/12,x=112+67*Math.cos(a),y=83+67*Math.sin(a);
   return '<rect x="'+(x-4).toFixed(1)+'" y="'+(y-9).toFixed(1)+'" width="8" height="18" rx="2" fill="#e8f1f4" stroke="#a9c6d1" stroke-width="1.2" transform="rotate('+(i*15+90)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>';
  }).join("");
  return '<svg viewBox="0 0 230 165" role="img" aria-label="Schematic of Piccolo reagent disc for '+safe+'">'+
   '<ellipse cx="113" cy="155" rx="94" ry="7" fill="#dbe7ec"/><circle cx="112" cy="83" r="76" fill="#fcffff" stroke="'+ring+'" stroke-width="4"/>'+
   wells+'<circle cx="112" cy="83" r="48" fill="#edf6f9" stroke="#bbd3dd" stroke-width="3"/>'+
   '<circle cx="112" cy="83" r="24" fill="#e2eef2" stroke="#97b6c4" stroke-width="3"/>'+
   '<circle cx="112" cy="83" r="10" fill="#cce0e8" stroke="#8eb0bf" stroke-width="2"/>'+
   '<circle cx="144" cy="68" r="7" fill="#b7d8e1" stroke="'+port+'" stroke-width="2"/></svg>';
 }
 if(kind==="pathfast"){
  return '<svg viewBox="0 0 230 150" role="img" aria-label="Schematic of PATHFAST test reagent cartridge for '+safe+'">'+
   '<ellipse cx="114" cy="122" rx="101" ry="7" fill="#dbe7ec"/>'+
   '<path d="M17 66L204 47L217 83L32 105Z" fill="#24323b" stroke="#102a37" stroke-width="3"/>'+
   '<path d="M29 68L204 51L209 60L34 78Z" fill="#526773"/>'+
   [0,1,2,3,4,5].map(i=>'<rect x="'+(63+i*22)+'" y="'+(66-i*2)+'" width="13" height="20" rx="4" transform="rotate(-6 '+(69+i*22)+' '+(76-i*2)+')" fill="#dcecf1" stroke="#99bbc9" stroke-width="1.6"/>').join("")+
   '<path d="M19 67L40 65L49 101L28 106Z" fill="#e6f2f6" stroke="#8eafbf" stroke-width="2"/>'+
   '<path d="M30 78L43 75L46 95L33 99Z" fill="#bf5162"/><path d="M196 48L207 47L221 82L211 86Z" fill="#a53e53"/></svg>';
 }
 if(kind==="pouch"){
  return '<svg viewBox="0 0 230 150" role="img" aria-label="Schematic of '+safe+' pouch">'+
   '<ellipse cx="116" cy="135" rx="78" ry="6" fill="#dce8ed"/>'+
   '<rect x="53" y="14" width="125" height="116" rx="8" fill="#eaf5f8" stroke="#8fb7c8" stroke-width="3"/>'+
   '<path d="M55 32H176M55 113H176" stroke="#9abdc9" stroke-width="5" stroke-dasharray="4 4"/>'+
   '<rect x="71" y="48" width="88" height="47" rx="6" fill="#fff" stroke="#b7cdd7"/>'+
   '<circle cx="113" cy="71" r="15" fill="#e1f1f4" stroke="#81b4c0" stroke-width="2"/>'+
   '<path d="M105 71h16M113 63v16" stroke="#277f8e" stroke-width="3"/></svg>';
 }
 if(kind==="strip"){
  return '<svg viewBox="0 0 230 150" role="img" aria-label="Schematic of '+safe+' test strip">'+
   '<ellipse cx="112" cy="128" rx="93" ry="7" fill="#dbe8ed"/>'+
   '<rect x="21" y="63" width="186" height="22" rx="6" fill="#fff" stroke="#89acbb" stroke-width="2.5"/>'+
   [0,1,2,3,4,5].map(i=>'<rect x="'+(35+i*22)+'" y="66" width="17" height="16" rx="2" fill="'+["#a5c7ac","#e0c3b7","#dfd2a0","#aabdd5","#d2bacf","#a8cecf"][i]+'"/>').join("")+
   '<rect x="174" y="64" width="25" height="20" rx="3" fill="#dceaf1"/></svg>';
 }
 if(kind==="cuvette"){
  return '<svg viewBox="0 0 230 150" role="img" aria-label="Schematic of '+safe+'">'+
   '<ellipse cx="115" cy="128" rx="75" ry="5" fill="#dbe8ed"/><path d="M71 25H159V92H128V115H100V92H71Z" fill="#eaf5f8" stroke="#7daabd" stroke-width="4"/>'+
   '<rect x="89" y="45" width="51" height="23" rx="3" fill="#b7d9e2" stroke="#85b1c0" stroke-width="2"/></svg>';
 }
 return '<svg viewBox="0 0 230 150" role="img" aria-label="Schematic of '+safe+' test cassette">'+
  '<ellipse cx="113" cy="121" rx="104" ry="7" fill="#dce9ed"/>'+
  '<rect x="12" y="45" width="206" height="58" rx="13" fill="#f9fcfe" stroke="#9ebecb" stroke-width="3"/>'+
  '<rect x="35" y="59" width="87" height="28" rx="5" fill="#e5f2f5" stroke="#adcbd3" stroke-width="2"/>'+
  '<path d="M68 66v14M86 66v14" stroke="#b25d82" stroke-width="3"/><circle cx="169" cy="74" r="12" fill="#dfecf1" stroke="#9fbecb" stroke-width="2"/></svg>';
}
function reagentReference(reagent){
 if(reagent.kind==="multi"){
  return '<div class="ptg-reference-tile ptg-reagent-tile ptg-reagent-multi">'+
   '<span class="ptg-reference-eyebrow">02 · TEST CARTRIDGE / REAGENT</span>'+
   '<div class="ptg-multi-reagent-head"><div><span class="ptg-reference-badge ptg-reagent-badge">BOTH DISCS REQUIRED</span>'+
   '<strong class="ptg-multi-reagent-title">'+e(reagent.name)+'</strong></div></div>'+
   '<div class="ptg-multi-reagent-grid">'+reagent.items.map(item=>
     '<div class="ptg-mini-reagent ptg-mini-reagent--'+e(item.tone)+'">'+
      '<div class="ptg-mini-reagent-art">'+reagentSvg(item.art,item.name,item.tone)+'</div>'+
      '<div class="ptg-mini-reagent-info"><span class="ptg-mini-reagent-code">'+e(item.badge)+'</span>'+
       '<strong>'+e(item.name)+'</strong><p>'+e(item.note)+'</p></div></div>'
    ).join('')+'</div>'+
   '<p class="ptg-multi-reagent-note">'+e(reagent.note)+'</p></div>';
 }
 return '<div class="ptg-reference-tile ptg-reagent-tile"><span class="ptg-reference-eyebrow">02 · TEST CARTRIDGE / REAGENT</span>'+
  '<div class="ptg-reference-layout"><div class="ptg-reference-art ptg-reagent-art">'+reagentSvg(reagent.art,reagent.name,reagent.tone)+'</div>'+
  '<div class="ptg-reference-copy"><span class="ptg-reference-badge ptg-reagent-badge">'+e(reagent.type)+'</span>'+
  '<strong class="ptg-reagent-name">'+e(reagent.name)+'</strong><p>'+e(reagent.note)+'</p></div></div></div>';
}
function materialPreview(id,st){
 const requiresChoice=id==="pathfast"?!st.assay:(materials[id]||[]).length>1&&!selectedMaterial(id,st);
 if(requiresChoice){
  const prompt=id==="pathfast"?"Choose PT analyte above to view the vial and matching test cartridge.":"Choose PT sample above to view the vial and matching test reagent.";
  return '<section class="ptg-specimen-reference" aria-label="PT sample selection required">'+
   '<div class="ptg-specimen-label">PT sample &amp; test reagent</div>'+
   '<div class="ptg-selection-prompt"><span class="ptg-selection-prompt-mark">?</span><p>'+e(prompt)+'</p></div></section>';
 }
 let name,code,color,note,small;
 if(id==="pathfast"){
  const assays={troponin:["hs-Troponin I","#5c91a3","Verify the PT event reporting units for hs-Troponin I."],
   ddimer:["D-dimer","#6d9b83","Check the D-dimer unit type and required API reporting unit."],
   ntprobnp:["NT-proBNP","#a58cad","PATHFAST measures NT-proBNP, not BNP."]};
  const a=assays[st.assay]||assays.troponin;
  name=a[0]+" PT sample";code=st.code==="other"?"EVENT":st.code||"PT";color=a[1];
  note=a[2]+" Match the event sample number, preparation and specimen type to the shipment.";
  small="CM and PSC are code references, not proof of assay enrollment.";
 }else{
  const m=selectedMaterial(id,st)||{name:"Assigned PT material",code:"PT",color:"#79989c",note:"Confirm the event sheet."};
  name=m.name.replace(/^[^·]+ · /,"");code=m.code;color=m.color;note=m.note;
  small="Check the actual vial, sample code and preparation against the API event.";
 }
 const reagent=reagentFor(id,st);
 const sample='<div class="ptg-reference-tile ptg-sample-tile"><span class="ptg-reference-eyebrow">01 · PT SAMPLE</span>'+
  '<div class="ptg-reference-layout"><div class="ptg-reference-art">'+vialSvg(name,code,color)+'</div>'+
  '<div class="ptg-reference-copy"><span class="ptg-reference-badge">'+e(code)+'</span><strong>'+e(name)+'</strong>'+
  '<p>'+e(note)+'</p></div></div></div>';
 const test=reagent?reagentReference(reagent):"";
 return '<section class="ptg-specimen-reference" aria-label="PT vial and reagent reference">'+
  '<div class="ptg-specimen-label">'+(reagent?'PT sample &amp; test reagent':'PT sample reference')+'</div>'+
  '<div class="ptg-reference-grid'+(reagent?' has-reagent':' sample-only')+'">'+sample+test+'</div>'+
  '<p class="ptg-reference-disclaimer">Illustrations only. '+e(small)+
  (reagent?' Confirm the cartridge or disc label before loading.':'')+'</p></section>';
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
  return v?"Confirm "+v.id+" PT sample":"Choose PT sample";
 };
 const stage=(item,i,focused=false)=>{
  const choice=selectedMaterial(id,st);
  const desc=id==="piccolo"&&i===0?(!choice?"Choose CH or CRP above. Match the selected PT vial and reagent disc to the current API event sheet.":choice.id==="CRP"?
   "Match the CRP proficiency vial to the API event and prepare the CRP-capable disc specified on its worksheet.":
   "Match the CH chemistry vial to the API event. Prepare and run both MetLyte Plus CRP and MetLac 12 reagent discs as assigned."):item[1];
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
  '<div class="ptg-heading-picker'+(sec.id!=="pathfast"&&(materials[sec.id]||[{id:"EVENT"}]).length===1?' ptg-heading-static':'')+'" data-ptg-picker="'+e(sec.id)+'">'+materialPicker(sec.id,st)+'</div></header>'+
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
  const trigger=heading?.querySelector('[data-ptg-dropdown-trigger="'+field+'"]');
  if(trigger&&typeof trigger.focus==="function")trigger.focus({preventScroll:true});
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

/* Portal-level chooser: appends to body, beyond clipped pages, with code badges
   visible beside every option. Accessible through keyboard, pointer and touch. */
let activePickerPortal=null;
function closePickerPortal(refocus=false){
 if(!activePickerPortal)return;
 const {trigger,menu}=activePickerPortal;
 activePickerPortal=null;
 if(trigger){
  trigger.setAttribute("aria-expanded","false");
  trigger.removeAttribute("aria-controls");
  trigger.classList.remove("is-open");
 }
 if(menu?.parentNode)menu.parentNode.removeChild(menu);
 if(refocus&&trigger?.isConnected)trigger.focus({preventScroll:true});
}
function positionPickerPortal(){
 if(!activePickerPortal)return;
 const {trigger,menu}=activePickerPortal;
 if(!trigger?.isConnected){closePickerPortal();return;}
 const r=trigger.getBoundingClientRect();
 const h=window.innerHeight||document.documentElement.clientHeight;
 const w=window.innerWidth||document.documentElement.clientWidth;
 const margin=8, gap=7;
 const availableBelow=h-r.bottom-margin-gap;
 const availableAbove=r.top-margin-gap;
 const above=availableBelow<190&&availableAbove>availableBelow;
 const space=Math.max(110,above?availableAbove:availableBelow);
 menu.style.width=Math.max(0,Math.min(r.width,w-2*margin))+"px";
 menu.style.maxHeight=Math.min(320,space)+"px";
 const menuHeight=menu.getBoundingClientRect().height;
 menu.style.left=Math.round(Math.max(margin,Math.min(r.left,w-margin-menu.getBoundingClientRect().width)))+"px";
 menu.style.top=Math.round(Math.max(margin,Math.min(above?r.top-gap-menuHeight:r.bottom+gap,h-margin-menuHeight)))+"px";
}
function openPickerPortal(trigger){
 if(activePickerPortal?.trigger===trigger){closePickerPortal(true);return;}
 closePickerPortal();
 let options=[];
 try{options=JSON.parse(trigger.getAttribute("data-ptg-options")||"[]");}catch(_){return;}
 if(!Array.isArray(options)||!options.length)return;
 const page=trigger.closest(".ptg-page");
 const host=page?.querySelector("[data-ptg-workflow]");
 if(!host)return;
 const id=host.getAttribute("data-ptg-workflow");
 const field=trigger.getAttribute("data-ptg-dropdown-trigger");
 const selected=trigger.getAttribute("data-ptg-value")||"";
 const menu=document.createElement("div");
 const menuId="ptg-portal-listbox";
 menu.className="ptg-picker-portal";
 menu.id=menuId;
 menu.setAttribute("role","listbox");
 menu.setAttribute("aria-label",trigger.getAttribute("aria-label")||"PT choices");
 menu.innerHTML=options.map(o=>
   '<button type="button" role="option" class="ptg-picker-option'+(selected===o.value?' is-selected':'')+'"'+
   ' data-ptg-option-value="'+e(o.value)+'" data-ptg-option-field="'+e(field)+'" aria-selected="'+(selected===o.value)+'">'+
   '<span class="ptg-picker-code">'+e(o.badge||o.value)+'</span>'+
   '<span class="ptg-picker-option-label">'+e(o.label)+'</span>'+
   (selected===o.value?'<span class="ptg-picker-option-check" aria-hidden="true">✓</span>':'')+'</button>'
 ).join("");
 document.body.appendChild(menu);
 activePickerPortal={trigger,menu,id,host,field};
 trigger.classList.add("is-open");
 trigger.setAttribute("aria-expanded","true");
 trigger.setAttribute("aria-controls",menuId);
 positionPickerPortal();
 const current=menu.querySelector('.ptg-picker-option.is-selected')||menu.querySelector('.ptg-picker-option');
 current?.focus({preventScroll:true});
}
function choosePickerOption(button){
 if(!activePickerPortal)return;
 const {host,id,field}=activePickerPortal;
 const seq=stepsSaved.get(id);
 if(!seq){closePickerPortal();return;}
 const value=button.getAttribute("data-ptg-option-value");
 if(field==="assay"&&(id!=="pathfast"||!["troponin","ddimer","ntprobnp"].includes(value)))return;
 if(field==="code"&&(id!=="pathfast"||!["CM","PSC","other"].includes(value)))return;
 if(field==="material"&&(id==="pathfast"||!(materials[id]||[]).some(o=>o.id===value)))return;
 const st=stateFor(id,seq.length);
 st[field]=value;
 st.step=0;
 remembered.set(id,st);
 closePickerPortal();
 refresh(host,id,field);
}
document.addEventListener("click",event=>{
 const option=event.target.closest("[data-ptg-option-value]");
 if(option&&activePickerPortal?.menu.contains(option)){
  event.preventDefault();
  choosePickerOption(option);
  return;
 }
 const trigger=event.target.closest("[data-ptg-dropdown-trigger]");
 if(trigger){
  event.preventDefault();
  openPickerPortal(trigger);
  return;
 }
 if(activePickerPortal)closePickerPortal();
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
document.addEventListener("keydown",event=>{
 if(!activePickerPortal)return;
 if(event.key==="Escape"){
  event.preventDefault();
  closePickerPortal(true);
  return;
 }
 const {menu}=activePickerPortal;
 const items=Array.from(menu.querySelectorAll(".ptg-picker-option"));
 if(!items.length)return;
 const active=items.indexOf(document.activeElement);
 if(event.key==="ArrowDown"||event.key==="ArrowUp"){
  event.preventDefault();
  items[(active+(event.key==="ArrowDown"?1:-1)+items.length)%items.length].focus();
 }else if(event.key==="Home"){
  event.preventDefault();items[0].focus();
 }else if(event.key==="End"){
  event.preventDefault();items[items.length-1].focus();
 }else if(event.key==="Tab"){
  closePickerPortal();
 }
});
window.addEventListener("resize",positionPickerPortal);
document.addEventListener("scroll",positionPickerPortal,true);
window.LAB_PT_TESTING={supports,render,patientGroup};
})();