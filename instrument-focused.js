/* Action-specific visual map for Sofia 2, Coag-Sense and HemoCue.
   Do not infer specimens from generic wording or mix patient and QC materials.
   Instrument menus are schematic, not replacements for device instructions. */
(function(){
"use strict";
const A=window.LAB_EQUIPMENT_ART;
if(!A)return;
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const figure=(heading,art,note)=>'<figure class="lc-focus-figure"><header>'+E(heading)+'</header><div class="lc-focus-art">'+art+'</div><figcaption>'+E(note)+'</figcaption></figure>';
const svg=(body,alt)=>'<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+E(alt)+'">'+body+'</svg>';
const label=(x,y,t,size=17,color="#345f76")=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="800" fill="'+color+'">'+E(t)+'</text>';
const device=(id)=>{const s=A.render({id,title:id==="sofia"?"Sofia 2":id==="coagsense"?"Coag-Sense":"HemoCue",category:"Point of care"});return (s.match(/<svg[\s\S]*?<\/svg>/)||[])[0]||"";};
const material=(id,filled=false,qc=false)=>A.kitShape?.(id,filled,qc?"qc":"patient")||"";
function menu(title,choices,active){
 const card='<rect x="76" y="17" width="448" height="266" rx="17" fill="#e5eef3" stroke="#a1b8c4" stroke-width="4"/>'+
 '<rect x="99" y="42" width="403" height="211" rx="10" fill="#f5fbfc" stroke="#b0c8d1" stroke-width="3"/>'+
 '<rect x="99" y="42" width="403" height="36" rx="6" fill="#28536b"/>'+label(300,67,title,16,"#fff")+
 choices.map((v,i)=>'<rect x="135" y="'+(94+i*48)+'" width="330" height="38" rx="8" fill="'+(v===active?"#d7f0e8":"#fff")+'" stroke="'+(v===active?"#199282":"#c0d3dc")+'" stroke-width="'+(v===active?3:1.2)+'"/>'+
 label(300,119+i*48,v,14,v===active?"#157b70":"#577a8b")).join('');
 return svg(card,title+" schematic menu with "+active+" highlighted");
}
function coagsense(title,group){
 const t=title.toLowerCase(),qc=/qc/.test(String(group).toLowerCase()),id="coagsense";
 if(/turn on|power button/.test(t))return figure("Power on Coag-Sense",device(id),"Press and hold the instrument power button.");
 if(/press test/.test(t))return figure("Select Test",A.coagSenseDeviceSvg?.("test")||device(id),"Tap the large blue Test tile on the actual Coag-Sense home screen. Control, Results and Settings are below it.");
 if(/strip lot/.test(t))return figure("Confirm test-strip lot",menu("STRIP LOT",["Lot confirmed","Enter new lot"],"Lot confirmed"),"Match the lot in the instrument with the strip box.");
 if(/test strip|grab a test/.test(t))return figure("Prepare one test strip",material(id,false),"Open one in-date strip and seat it using the manufacturer's orientation.");
 if(/collect the sample/.test(t))return figure("Fingerstick and capillary transfer",A.mediaSvg?.("finger")||material(id,false),"Use the approved lancet and capillary transfer tube. Do not substitute a lavender or green blood tube.");
 if(/place.*tip|plunger|dispense/.test(t)){
  const kit=material(id,true,qc);
  return figure(qc?"Apply control to the strip":"Transfer fingerstick sample to the strip",kit,
   qc?"Use approved QC material in the strip sample well.":"Position the transfer tip at the illuminated sample well, then dispense as instructed. Verify the meter prompt.");
 }
 if(/testing please wait|sample is detected|test.*complete/.test(t))return figure("Testing in progress",A.coagSenseDeviceSvg?.("running")||device(id),"Illustrated testing screen. Follow the actual meter prompts and wait for the analyzer result and confirmation signal.");
 if(/perform the qc|perform qc/.test(t))return figure("Run authorized QC",material(id,false,true),"Use control material, not fingerstick blood, in the approved QC procedure.");
 if(/record the qc|log results|qc binder/.test(t))return figure("Document result",menu("COAG-SENSE",["Result ready","Verify and record"],"Verify and record"),"Verify patient or QC identification and record in the designated system or QC binder.");
 if(/on the box/.test(t))return figure("Label the reagent box",menu("QC RECORD",["Received date","QC date","Operator initials"],"QC date"),"Record receive date and QC completion per local policy.");
 return "";
}
function sofia(title,group){
 const t=title.toLowerCase(),g=String(group).toLowerCase(),id="sofia";
 if(/ordering-tests/.test(g))return figure("Order the correct Sofia assay",menu("ORDER THE ASSAY",["SARS antigen","Flu A/B","RSV / Strep per order"],"SARS antigen"),"Order the actual assay required, then verify analyzer and kit availability.");
 if(/running-tests/.test(g)){
  if(/enter/.test(t))return figure("Confirm patient MRN",menu("SOFIA 2 · PATIENT",["Patient ID / MRN","Test cassette lot","Confirm"],"Patient ID / MRN"),"Enter or scan the patient MRN in the authorized patient-test workflow.");
  if(/choose/.test(t))return figure("Choose the correct run mode",menu("SOFIA 2 · READ MODE",["WALK-AWAY","READ-NOW"],"WALK-AWAY"),"Walk-Away includes incubation; Read-Now is for an already incubated cassette. Follow the assay IFU.");
  if(/results/.test(t))return figure("Review and document results",menu("SOFIA 2 · RESULT",["Result ready","Check controls","Document result"],"Document result"),"Check internal controls and patient identifiers before Relaymed entry.");
 }
 if(/qc-test/.test(g)){
  if(/run the controls/.test(t))return figure("Sofia 2 positive and negative QC",material(id,false,true),"Use the assay's specified QC swabs and test mode. Record each level.");
  if(/log/.test(t))return figure("QC record",menu("SOFIA 2 · QC",["Positive QC","Negative QC","Document"],"Document"),"Record accepted QC in the designated log.");
  if(/on the box/.test(t))return figure("Lot and QC dates",menu("REAGENT BOX",["Receive date","QC date","Operator"],"QC date"),"Write required information on the box.");
 }
 if(/calibration/.test(g)){
  if(/barcode/.test(t))return figure("Scan analyzer calibration barcode",menu("CALIBRATION",["Scan calibration barcode","Confirm result"],"Scan calibration barcode"),"Use the current calibration code/barcode and verify acceptable status.");
  return figure("Scheduled calibration",device(id),"Confirm the approved calibration interval and current instrument status.");
 }
 return "";
}
function hemocue(title,group){
 const t=title.toLowerCase(),g=String(group).toLowerCase(),id="hemocue";
 if(/turn on/.test(t))return figure("Power on HemoCue",device(id),"Confirm analyzer readiness before collecting a fingerstick specimen.");
 if(/quick tip|running-samples/.test(g))return figure("Fingerstick and microcuvette",A.mediaSvg?.("finger")||material(id,false),"Follow the manufacturer instructions to fill the disposable microcuvette without bubbles.");
 if(/microcuvette/.test(t))return figure("Single-use microcuvette",material(id,false),"Use one correct, in-date HemoCue microcuvette.");
 if(/lancet/.test(t))return figure("Fingerstick lancet",A.mediaSvg?.("finger")||device(id),"Use a single-use capillary lancet and approved fingerstick procedure.");
 if(/results|relaymed/.test(g)||/enter the results/.test(t))return figure("Report HemoCue result",menu("HEMOCUE",["Result displayed","Verify patient ID","Enter in Relaymed"],"Enter in Relaymed"),"Document using the correct patient record.");
 // Turnaround, order-set and location sections are informational, not steps requiring device art.
 if(/turnaround|available-locations|order-set/.test(g))return "";
 return "";
}
function render(sec,title,group){
 if(!sec||!title||sec.archived)return "";
 if(sec.id==="sofia")return sofia(title,group);
 if(sec.id==="coagsense")return coagsense(title,group);
 if(sec.id==="hemocue")return hemocue(title,group);
 return "";
}
window.LAB_INSTRUMENT_FOCUS={render};
})();