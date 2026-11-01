/* HemoCue Hb 201+ step-by-step workflow.
   Manufacturer: HemoCue Hb 201 Microcuvettes US insert (151712 200824)
   and HemoCue Hb 201+ operating manual. Verify stocked model and site SOP. */
(function () {
  'use strict';
  const section = window.LAB_GUIDE_DATA?.sections?.find(s => s.id === 'hemocue');
  if (!section) return;
  const h = text => ({type:'list',level:0,text});
  const p = (title, ...notes) => [
    {type:'list',level:1,text:title},
    ...notes.map(text => ({type:'list',level:2,text}))
  ];
  section.subtitle = 'Hemoglobin · Hb 201+';
  section.qc = 'Startup self-test · external QC per site SOP';
  section.blocks = [
    h('Patient testing'),
    ...p('Verify the order, patient and analyzer model',
      'Confirm the hemoglobin order in Athena and use two patient identifiers. This procedure is for HemoCue Hb 201+ with Hb 201 microcuvettes; check the actual model label before testing.',
      'Perform testing only when the analyzer self-test and any external QC required by the clinic are acceptable. Wear gloves and follow bloodborne-pathogen precautions.'),
    ...p('Power on and check analyzer readiness',
      'Pull the microcuvette holder to its loading position. Press the ON/OFF button and wait for the self-test.',
      'The HemoCue symbol and three flashing dashes indicate readiness. If an error appears, stop and use Troubleshooting before testing.'),
    ...p('Prepare supplies and the fingerstick site',
      'Gather an in-date Hb 201 microcuvette, single-use lancet, alcohol wipe, lint-free gauze and appropriate disposal supplies. Check vial open date; Hb 201 vial cuvettes expire 3 months after first opening or at the printed expiry, whichever is sooner.',
      'Have the patient keep the hand warm and relaxed. Use the middle or ring finger, avoiding rings. Clean the side of the fingertip and allow it to dry completely.'),
    ...p('Puncture and wipe away the first drops',
      'Gently encourage circulation from the knuckle toward the tip; puncture the side of the fingertip with a single-use lancet.',
      'Discard the first 2–3 drops with clean gauze. Apply only light pressure to form a fresh hanging drop; avoid forceful squeezing. Dispose of the lancet immediately in sharps.'),
    ...p('Fill one Hb 201 microcuvette completely',
      'Remove a fresh microcuvette and close the vial right away. Fill within 3 minutes of removing it from its package.',
      'Touch the filling tip to a sufficiently large blood drop and allow capillary action to fill the cavity in one continuous motion (approximately 10 µL). Never refill or top off a partially filled cuvette; replace it.'),
    ...p('Wipe and inspect the filled microcuvette',
      'Use a clean lint-free wipe to remove blood from the outside without touching the filling opening or optical eye.',
      'Check that the cavity is completely filled and the optical window is clear. If bubbles are present in the optical eye, discard the cuvette and collect a new drop. Small peripheral edge bubbles may be acceptable per the IFU.'),
    ...p('Load the microcuvette and start the measurement',
      'With three flashing dashes displayed, place the cuvette in the extended holder and gently push the holder fully inward to the measuring position.',
      'Start as soon as possible and within 10 minutes after filling. The analyzer displays stationary dashes during analysis; do not pull out the holder while measuring.'),
    ...p('Read and verify the hemoglobin result',
      'For Hb 201+, results generally appear in 15–60 seconds. Confirm the displayed result and units (usually g/dL); do not substitute the 1-second timing used by a different HemoCue model.',
      'If the display shows HHH, an error, or a result inconsistent with the clinical picture, do not enter a numeric result. Follow the analyzer IFU and clinic escalation or confirmatory testing procedure.'),
    ...p('Document, notify and discard',
      'Enter the verified hemoglobin value manually in Relaymed against the correct patient and Athena order. Follow site policy for communication of critical or unexpected values.',
      'Slide out the holder after the result is recorded, remove the used cuvette and discard it in the designated biohazard waste. Clean the testing area.'),
    h('External QC (when required)'),
    ...p('Check QC requirements and prepare approved controls',
      'The analyzer runs an internal electronic self-test at startup and periodically while powered on. Liquid external QC is performed when required by the site SOP, regulation, a troubleshooting event, or manufacturer guidance; do not assume it is universally daily.',
      'Use only HemoCue-recommended controls compatible with the Hb 201+ system. Check control lot, expiry, storage, preparation and manufacturer assigned ranges.'),
    ...p('Prepare a liquid control aliquot',
      'Bring control material to the temperature specified by its insert and mix as directed.',
      'Place a drop of control on a clean hydrophobic surface. Do not directly touch the control vial with the microcuvette.'),
    ...p('Fill, inspect and load a fresh microcuvette',
      'Fill a new Hb 201 microcuvette completely from the control drop in one motion, without refilling. Wipe the exterior and reject any cuvette with bubbles in the optical eye.',
      'With the analyzer ready, insert the filled cuvette and push the holder in to measure within 10 minutes after filling.'),
    ...p('Review QC against the correct range',
      'Compare the result with the assigned acceptable range for the exact control lot and level. Run every level required by the clinic SOP.',
      'If any required level is outside range, do not release patient results or continue testing until the QC failure has been resolved under the approved SOP.'),
    ...p('Record QC and restore the analyzer to service',
      'Document date, operator, analyzer, QC level, control and microcuvette lot, measured value, acceptable range and pass/fail in the required clinic QC record or binder.',
      'Return to patient testing only after QC is acceptable. No separate user calibration is performed because Hb 201+ is factory-calibrated.'),
    h('Daily care'),
    ...p('Clean the microcuvette holder after use',
      'Turn the analyzer off and confirm the display is blank. Remove the cuvette holder as directed by the Hb 201+ operating manual; do not force the retaining catch.',
      'Clean the holder with 20–70% alcohol or mild detergent and a lint-free wipe. Allow it to dry fully before reinstalling.'),
    ...p('Check the optical path and store supplies',
      'If directed by an instrument error or cleaning procedure, clean the optical unit only with the approved HemoCue Cleaner and follow its drying instructions.',
      'Keep the microcuvette vial tightly closed and stored dry at 15–30°C. Document maintenance as required by the site SOP.'),
    h('Turnaround Time'),
    {type:'list',level:1,text:'Hb 201+: approximately 15–60 seconds per measurement after the holder is closed.'},
    h('Available Locations'),
    {type:'list',level:1,text:'Santa Monica'},
    {type:'list',level:1,text:'Manhattan Beach'}
  ];

  // Reuse the existing guided-step layout, with one distinct educational
  // illustration per HemoCue action. Do not change other instrument guides.
  const oldFocus = window.LAB_INSTRUMENT_FOCUS;
  const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function svg(inner, label) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 285" role="img" aria-label="' + esc(label) + '">' + inner + '</svg>';
  }
  function text(x,y,t,size=16,color='#345f76') {
    return '<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" font-weight="750" fill="'+color+'">'+esc(t)+'</text>';
  }
  function card(name,inner,note) {
    return '<figure class="lc-focus-figure"><header>'+esc(name)+'</header><div class="lc-focus-art">'+inner+'</div><figcaption>'+esc(note)+'</figcaption></figure>';
  }
  function analyzer(display, mode) {
    const ready=mode==='ready', loaded=mode==='loaded';
    return svg(
      '<ellipse cx="300" cy="256" rx="205" ry="16" fill="#e0eaf0"/>'+
      '<path d="M160 38Q172 24 196 24H412Q440 25 449 53L463 215Q465 241 439 246H173Q149 246 151 220Z" fill="#bf3d49" stroke="#982d3b" stroke-width="5"/>'+
      '<rect x="215" y="49" width="182" height="135" rx="15" fill="#343d69" stroke="#2d315b" stroke-width="3"/>'+
      '<rect x="231" y="67" width="150" height="81" rx="8" fill="#d9ebe9" stroke="#95bbb5" stroke-width="3"/>'+
      text(255,112,display,30,'#224558')+
      text(265,170,'Hb 201+',17,'#fff')+
      '<rect x="246" y="201" width="122" height="24" rx="7" fill="#262f3b"/>'+
      '<rect x="258" y="205" width="98" height="13" rx="4" fill="#0f1e2a"/>'+
      (loaded?'<path d="M279 222H342V242H279Z" fill="#e9edf0" stroke="#78909c" stroke-width="2"/>'+
        '<rect x="292" y="227" width="36" height="10" rx="3" fill="#a63e51"/>':
        '<rect x="289" y="225" width="52" height="8" rx="3" fill="#e5ecf0" stroke="#78909c"/>')+
      text(480,88,ready?'READY':'HEMOGLOBIN',14,'#2a7180')+
      text(480,111,ready?'3 flashing dashes':loaded?'Holder closed':'Display shown',13,'#547f8e'),
      'Simplified HemoCue Hb 201 plus analyzer, '+display+' display'
    );
  }
  function cuvette(filled,inspect) {
    const blood=filled?'#b74555':'#eef6f7';
    return svg(
      '<ellipse cx="293" cy="240" rx="196" ry="15" fill="#e1ecf0"/>'+
      '<path d="M113 105H403Q421 105 425 124V169Q422 185 404 185H113Q91 183 91 167V125Q94 105 113 105Z" fill="#edf4f7" stroke="#91b2c0" stroke-width="5"/>'+
      '<path d="M140 122H349V167H140Z" fill="'+blood+'" stroke="#8aabb8" stroke-width="3"/>'+
      '<path d="M398 123H480L505 111V180L480 167H398Z" fill="#f8fcfd" stroke="#95b5bf" stroke-width="3"/>'+
      (inspect?'<circle cx="346" cy="144" r="24" fill="none" stroke="#279b8a" stroke-width="4"/>'+
        '<path d="M346 168L385 213" stroke="#279b8a" stroke-width="5"/>':'')+
      text(142,85,filled?'BLOOD-FILLED CAVITY':'EMPTY SINGLE-USE CUVETTE',16,'#397285')+
      text(438,209,'FILLING TIP',14,'#397285')+
      '<path d="M472 184L478 171" stroke="#397285" stroke-width="2"/>'+
      text(115,216,inspect?'CHECK OPTICAL WINDOW':'ONE CONTINUOUS FILL',14,'#397285'),
      'HemoCue Hb 201 microcuvette '+(filled?'filled':'empty')+(inspect?' with optical area inspection':'')
    );
  }
  function finger(action) {
    const drop=action==='lance'||action==='fill';
    return svg(
      '<ellipse cx="266" cy="258" rx="186" ry="14" fill="#e1eaf0"/>'+
      '<path d="M149 223L158 126Q161 87 190 86Q215 87 221 118L230 156L252 61Q260 39 281 43Q303 46 302 71L303 153L323 101Q332 81 352 89Q372 97 368 118L348 216Q335 245 287 248L174 246Z" fill="#f2c7ab" stroke="#ba917c" stroke-width="4"/>'+
      '<path d="M196 146L215 180M280 140L274 178M340 144L316 190" fill="none" stroke="#dca88d" stroke-width="3"/>'+
      (drop?'<path d="M189 85Q177 104 189 109Q202 106 189 85Z" fill="#b83f50"/>':'')+
      (action==='prep'?'<rect x="393" y="106" width="118" height="72" rx="12" fill="#e9f3f5" stroke="#a1bdc9" stroke-width="3"/>'+text(410,135,'ALCOHOL',16)+text(423,156,'WIPE',16):
       action==='lance'?'<rect x="390" y="104" width="42" height="110" rx="9" fill="#f2f8fa" stroke="#789cae" stroke-width="4"/>'+
         '<path d="M409 214L409 232" stroke="#718899" stroke-width="4"/>'+text(449,159,'LANCET',16):
         '<path d="M395 112L472 134L505 167" fill="none" stroke="#3c98a0" stroke-width="6"/>'+
         text(390,96,'CAPILLARY FILL',15)),
      'Fingerstick illustration: '+action
    );
  }
  function control() {
    return svg(
      '<ellipse cx="290" cy="259" rx="180" ry="13" fill="#dfeaf0"/>'+
      '<rect x="125" y="82" width="106" height="160" rx="17" fill="#f6fafb" stroke="#91aeba" stroke-width="4"/>'+
      '<rect x="119" y="64" width="117" height="34" rx="9" fill="#477f9c"/>'+
      '<rect x="136" y="126" width="84" height="72" rx="6" fill="#fff" stroke="#d6e3e8"/>'+
      text(155,150,'Hb QC',16)+text(153,176,'LOT / LVL',12)+
      '<path d="M263 202H424" stroke="#8eb4be" stroke-width="4"/>'+
      '<path d="M310 202Q300 183 310 179Q324 184 310 202Z" fill="#b64757"/>'+
      '<rect x="297" y="213" width="145" height="15" rx="7" fill="#f4f7f8" stroke="#a5c0ca" stroke-width="2"/>'+
      text(299,77,'CONTROL ALIQUOT',16)+text(284,247,'Clean hydrophobic surface',14),
      'Approved liquid HemoCue Hb 201 QC vial and a separate control drop'
    );
  }
  function document() {
    return svg(
      '<rect x="138" y="29" width="327" height="224" rx="17" fill="#f6fafb" stroke="#9bb9c8" stroke-width="4"/>'+
      '<rect x="163" y="53" width="275" height="43" rx="8" fill="#d9e9ee"/>'+
      text(193,81,'RESULT / QC RECORD',17)+
      text(181,129,'Patient or control ID',15)+
      '<path d="M181 141H417" stroke="#bdd0d8" stroke-width="2"/>'+
      text(181,178,'Hb value and units',15)+
      '<path d="M181 190H417" stroke="#bdd0d8" stroke-width="2"/>'+
      '<path d="M367 222L378 233L400 208" stroke="#319a8d" stroke-width="7" fill="none" stroke-linecap="round"/>',
      'Verify identifiers and record the hemoglobin or quality control result'
    );
  }
  function cleaning() {
    return svg(
      '<rect x="135" y="86" width="311" height="133" rx="18" fill="#eef5f7" stroke="#92b5c0" stroke-width="5"/>'+
      '<rect x="159" y="116" width="262" height="69" rx="12" fill="#d8e8ed" stroke="#a1c0ca" stroke-width="3"/>'+
      '<path d="M187 189L250 115L304 148L244 218Z" fill="#f9fcfd" stroke="#8aadb8" stroke-width="3"/>'+
      '<path d="M350 108L389 153M367 112L410 156" stroke="#6bb1bd" stroke-width="7" stroke-linecap="round"/>'+
      text(169,70,'CUVETTE HOLDER',16)+text(353,241,'CLEAN · DRY · REINSTALL',14),
      'HemoCue cuvette holder cleaning illustration'
    );
  }
  function renderHemo(title,group) {
    if (/^(turnaround-time|available-locations|order-set)$/.test(group)) return '';
    const t=String(title||'').toLowerCase();
    const qc=group.indexOf('external-qc')===0;
    const care=group==='daily-care';
    let name='',art='',note='';
    if (care) {
      name=t.includes('optical')?'Optical path and storage':'Daily holder care';
      art=cleaning();
      note='Turn off before cleaning; use manufacturer-approved cleaning materials and allow full drying.';
    } else if (qc) {
      if (/prepare approved controls|liquid control aliquot/.test(t)) {name='QC control and sample preparation';art=control();note='Use the correct HemoCue-recommended liquid control, not patient blood.';}
      else if (/fresh microcuvette/.test(t)) {name='Fresh control-filled microcuvette';art=cuvette(true,true);note='Inspect the optical window and run the QC sample like a patient cuvette.';}
      else if (/review qc|record qc/.test(t)) {name='QC verification and documentation';art=document();note='Use the control-lot assigned range, and document every level required by the site.';}
      else {name='Quality control readiness';art=analyzer('---','ready');note='Built-in self-test at startup; external controls only when required by the site SOP.';}
    } else {
      if (/verify the order/.test(t)) {name='Verify patient and HemoCue Hb 201+ model';art=analyzer('---','ready');note='This guide is for the Hb 201+ pictured, not the Hb 301 or Hb 801.';}
      else if (/power on/.test(t)) {name='Ready screen';art=analyzer('---','ready');note='Three flashing dashes mean the analyzer passed startup checks and is ready.';}
      else if (/prepare supplies/.test(t)) {name='Warm, clean and dry the finger';art=finger('prep');note='Use the middle or ring finger and an in-date Hb 201 microcuvette.';}
      else if (/puncture/.test(t)) {name='Fingerstick collection';art=finger('lance');note='Puncture the side of the fingertip and discard the first 2–3 drops.';}
      else if (/fill one/.test(t)) {name='Capillary-fill microcuvette';art=cuvette(true,false);note='Fill once, completely, within 3 minutes of opening; never refill.';}
      else if (/wipe and inspect/.test(t)) {name='Inspect the optical window';art=cuvette(true,true);note='No air bubbles in the optical eye. Do not touch the opening while wiping.';}
      else if (/load/.test(t)) {name='Close the measuring holder';art=analyzer('---','loaded');note='Start measurement within 10 minutes of filling the microcuvette.';}
      else if (/read and verify/.test(t)) {name='Read hemoglobin in g/dL';art=analyzer('12.4','loaded');note='12.4 is an illustration only. Hb 201+ typically reads in 15–60 seconds.';}
      else if (/document/.test(t)) {name='Document in Relaymed';art=document();note='Verify patient ID and result before discarding the used cuvette.';}
    }
    return art ? card(name,art,note) : '';
  }
  window.LAB_INSTRUMENT_FOCUS = {
    render(sec,title,group) {
      if (sec?.id === 'hemocue') return renderHemo(title,group);
      return oldFocus?.render ? oldFocus.render(sec,title,group) : '';
    }
  };
})();