/* Lab Central troubleshooting reference. Operator-level actions only.
   Each procedure must be checked against the current U.S. product IFU and local SOP. */
(function(){
'use strict';
const S=(title,url)=>({title,url});
const entry=(topic,title,signal,actions,escalate,level='check')=>({topic,title,signal,actions,escalate,level});
const guides={
pathfast:{
 name:'PATHFAST',subtitle:'Cardiac markers · sample integrity, calibration and analyzer status',
 sources:[S('PHC PATHFAST operator manual and assay IFUs','https://www.phchd.com/eu/ivd/pathfast/ifu/english')],
 items:[
 entry('Specimen & results','Unexpected result or possible microclots','Atypical cardiac marker value, sample pipetting issue, or visible fibrin.',[
  'Confirm tube identity, assay, specimen type, collection time, and immediate mixing of lithium-heparin blood.',
  'Inspect for fibrin/microclots. Follow the approved local workflow for centrifuging the original lithium-heparin specimen and testing plasma when applicable; do not interpret a suspected compromised run.',
  'Review the instrument remark, QC status, and provider notification requirements before a valid repeat.'
 ],'If the result remains discordant or the specimen is unsuitable, notify the provider/lab supervisor and use an approved alternative laboratory.', 'hold'),
 entry('Specimen & results','Sample not detected or aspiration warning','Missing/invalid value, volume mismatch, abnormal sampling indication.',[
  'Verify the sample well contains the correct assay-specific volume with no bubbles and that the correct tips are installed.',
  'Check cartridge position, sample/rack identification and correct patient SID; do not reuse a consumed cartridge.',
  'Repeat only as directed by the error message and approved IFU.'
 ],'Recurrent aspiration/tip warnings require lab supervisor and technical support. Do not release the failed result.','hold'),
 entry('QC & calibration','Assay locked or calibration overdue','Reagent-status pill indicates an invalid calibration/QC state or patient testing is blocked.',[
  'Check the assay-specific status and expiry of the current calibration curve and QC on ASSAY/HOME.',
  'Perform the approved calibration-plus-QC sequence with the correct cartridges, thawed/prepared materials and lane assignment.',
  'Confirm acceptable CAL and QC results before restarting patient testing.'
 ],'Do not override a lockout or report a patient value while calibration/QC is unacceptable.','hold'),
 entry('QC & calibration','Calibration or liquid QC fails','QC out of range or CAL not accepted.',[
  'Verify reagent and control lot, expiry, storage/thawing, preparation and correct CAL 1, CAL 2, QC 1 and QC 2 placement.',
  'Inspect sample wells for bubbles and confirm pipette tips, cartridges and rack are positioned correctly.',
  'Document the failure and repeat only under manufacturer/site corrective-action procedures.'
 ],'If repeat QC/CAL remains unacceptable, hold the assay and contact laboratory leadership/vendor support.','hold'),
 entry('Instrument & workflow','Run stops, error message or LIS mismatch','Analyzer error, incomplete printout, or missing/incorrect transmitted result.',[
  'Record the exact screen message, affected assay/lane, reagent lot and time; do not open the hood during an active run.',
  'Check analyzer result and printout against patient SID, units, reference flags and interface status.',
  'Only perform operator-level restart or recovery described in the manual; do not bypass interlocks.'
 ],'Escalate recurrent hardware/interface faults and route urgent testing to an approved alternative.','service')
 ]},
piccolo:{
 name:'Piccolo Xpress',subtitle:'Chemistry discs · suppressed values, sample quality and analyzer messages',
 sources:[S('Abaxis Piccolo Xpress manufacturer FAQ','https://www.abaxis.com/faqs/'),S('Piccolo Xpress operator manual (manufacturer library)','https://www.abaxis.com/resources/category/manuals-and-drivers/')],
 items:[
 entry('Specimen & results','~~~ instead of a chemistry value','Analyzer suppressed the chemistry; it is not a numeric result.',[
  'Print or review the instrument error report and identify the affected analyte.',
  'Confirm approved sample type, mixing, disc handling, sample volume and expiry.',
  'Use a new disc for an IFU-supported repeat or an approved alternative method; do not manually substitute a value.'
 ],'If suppression persists, hold that chemistry and notify the lab supervisor/provider.','hold'),
 entry('Specimen & results','HEM / LIP / ICT instead of a result','Analyzer identified hemolysis, lipemia or icterus affecting a chemistry.',[
  'Review HEM, LIP and ICT indices at the bottom of the printout; determine which analytes are affected.',
  'Evaluate collection/processing quality and recollect only when needed under approved site policy.',
  'Do not report an interfered/suppressed chemistry as normal or interpolate a value.'
 ],'Use the approved sendout/alternative method if an affected chemistry cannot be obtained.','hold'),
 entry('Specimen & results','Out of measurement range or low recoveries','Result carries < or > or CONFIRM LOW RECOVERIES warning.',[
  'Respect the printed range notation; a result outside the dynamic range is not an exact value.',
  'Do not dilute a patient specimen and rerun on Piccolo unless the manufacturer explicitly authorizes that method.',
  'For low recoveries, follow manufacturer guidance for a repeat with a new disc and review specimen adequacy.'
 ],'Escalate repeated low-recovery flags or values outside range; send to a validated laboratory method.','hold'),
 entry('QC & calibration','Disc QC fails or results do not print','Disc internal QC is unacceptable, expired or storage compromised.',[
  'Check disc packaging, expiration, transport/storage history, correct panel and instrument temperature.',
  'Confirm sample was added to the designated port without bubbles or leakage.',
  'Discard rejected discs. Repeat with a new approved disc after addressing the cause.'
 ],'Repeated failed discs or instrument QC errors require technical support before reporting results.','hold'),
 entry('Instrument & workflow','Drawer, barcode or printing failure','Disc not accepted, run canceled or output unavailable.',[
  'Confirm the disc is properly seated and the drawer/optics are unobstructed without forcing the mechanism.',
  'Record the exact error and identify the patient test; use the analyzer recall function when available.',
  'Follow only operator-authorized maintenance; preserve the failed disc/lot information for review.'
 ],'Stop using the analyzer for repeated mechanical errors and contact support.','service')
 ]},
sysmex:{
 name:'Sysmex pocH-100i',subtitle:'CBC · aspiration, clotting, QC and maintenance alarms',
 sources:[S('Sysmex pocH-100i instructions for use (manual reproduction)','https://www.manualslib.com/manual/1918861/Sysmex-Poch-100i.html')],
 items:[
 entry('Specimen & results','Aspiration failure or questionable CBC','Short sample, unexpectedly abnormal cell counts or instrument sampling alarm.',[
  'Verify EDTA tube identification, fill, mixing, sample age and whether a clot or fibrin is present.',
  'Inspect the approved aspiration process and tube position without accessing internal moving parts.',
  'Do not release flagged or incomplete counts; recollect or send out when specimen quality cannot be established.'
 ],'Escalate recurrent aspiration alarms, clots or implausible results for approved repeat/confirmation.','hold'),
 entry('Specimen & results','CBC flag, unusual histogram or suspect differential','Analyzer reports abnormal population/distribution or count flag.',[
  'Review the full report, histograms and flagged parameter rather than assuming all values are valid.',
  'Verify specimen integrity and compare with clinical context and previous results when available.',
  'Follow site policy for repeat analysis, smear/manual review or referral laboratory.'
 ],'Do not suppress or overwrite flags; contact the provider/lab supervisor for critical or unresolved findings.','hold'),
 entry('QC & calibration','Control material outside limits','L-J/QC error, atypical control counts or failed acceptance.',[
  'Confirm the correct control level, current lot target/limit values, storage, expiration and mixing.',
  'Check aspiration quality, reagent supply and analyzer background before any repeat.',
  'Document QC failure and corrective action; obtain accepted QC before patient testing.'
 ],'If control remains outside limits, suspend patient testing and contact the lab supervisor.','hold'),
 entry('Instrument & workflow','Aperture clog / background failure','Clog warning, unexpectedly high background, flow error.',[
  'Run the instrument-approved clog removal/auto-rinse function and recheck background as directed by the IFU.',
  'Confirm reagent bottles, tubing connections, waste status and instrument prompts.',
  'Never manually probe the aperture or open protected fluidic assemblies.'
 ],'If the warning persists, stop patient testing and request maintenance/service.','service'),
 entry('Instrument & workflow','Shutdown, waste or reagent alarm','Waste bottle full, reagent empty, maintenance incomplete.',[
  'Check displayed reagent and waste status, containers and correct reagent identity.',
  'Complete the approved daily shutdown/cleaning sequence and scheduled preventive maintenance.',
  'After corrective action, confirm analyzer readiness and QC before releasing new patient results.'
 ],'Refer unresolved leaks, persistent warnings or failed background to authorized support.','service')
 ]},
clinitek:{
 name:'Siemens CLINITEK Status+',subtitle:'Urinalysis and CLINITEST hCG · strip handling, sample volume and invalid results',
 sources:[S('Siemens CLINITEK Status+ U.S. operator guide','https://doclib.siemens-healthineers.com/rest/v1/view?document-id=858949'),S('Siemens CLINITEST hCG technique and error prevention','https://www.siemens-healthineers.com/en-us/point-of-care-testing/featured-topics-in-poct/urinalysis-featured-topics/clinitest-hcg-proper-testing')],
 items:[
 entry('Specimen & results','E50, strip tilted or incorrect strip type','Strip recognition or test-table placement error.',[
  'Confirm selected urine strip type and check the strip orientation on the correct table insert.',
  'Inspect the table for residue/damage; repeat using a fresh properly placed Siemens strip.',
  'If E50 persists, perform the approved analyzer check/QC described in the operator guide.'
 ],'Do not report the failed run; escalate repeated recognition errors.','hold'),
 entry('Specimen & results','E52–E54, wrong test mode or cassette','Invalid hCG barcode or strip/cassette mode mismatch.',[
  'Verify whether Strip Test or Cassette Test was selected and use the correct Siemens reagent.',
  'For hCG, turn the insert to the cassette side and use a fresh approved CLINITEST cassette.',
  'Repeat the procedure from the correct mode. Do not reuse an errored cassette.'
 ],'Persistent recognition problems require instrument/insert inspection by authorized personnel.','hold'),
 entry('Specimen & results','hCG E67 / insufficient or excess sample','Sampling/flow failure, unreadable test window or incorrect volume.',[
  'Use the kit-supplied pipette, completely filling the stem and dispensing only one stem (200 µL).',
  'Start the analyzer first, then dispense only when prompted. Do not empty the pipette overflow chamber.',
  'Avoid highly colored, very bloody or viscous samples; follow IFU for a new specimen/test.'
 ],'Treat E67 as invalid; do not convert an invalid result into a negative.','hold'),
 entry('QC & calibration','QC fails or test-strip quality warning','Control outside expected range, reagent exposure or wrong strip lot.',[
  'Verify the correct control level, lot, expiration, storage and matching strip/cassette selection.',
  'Check humidity exposure, reagent packaging and table insert cleanliness.',
  'Repeat QC with fresh approved materials only under your local corrective-action procedure.'
 ],'Hold affected patient testing until acceptable QC is documented.','hold'),
 entry('Instrument & workflow','Test table, printer or power error','Table jam, E28 printer error or low battery.',[
  'Follow the screen message and verify the test table is correctly inserted and unobstructed.',
  'For E28, check printer paper and holding arm per the manual. Check battery/AC power for low-power warnings.',
  'Do not pull a moving table or attempt non-operator repairs.'
 ],'Stop testing for repeated table or setup errors and refer to service.','service')
 ]},
triage:{
 name:'Quidel Triage MeterPro',subtitle:'Troponin I, BNP and D-dimer · internal QC, lots and cartridge handling',
 sources:[S('Quidel Triage MeterPro user manual','https://www.quidelortho.com/content/dam/quidelortho/global/docs/Z2VQM2Y5XFDAVOE65B.pdf')],
 items:[
 entry('Specimen & results','! replaces result','Internal QC out of range: the affected value is blocked.',[
  'Identify the affected analyte and read the printed INTERNAL QC OUT OF RANGE warning.',
  'Review cartridge lot, expiry, specimen handling, procedure and analyzer QC condition.',
  'Resolve the problem and repeat with a fresh device as directed by the IFU.'
 ],'Never transcribe ! as a patient value or release a blocked result.','hold'),
 entry('Specimen & results','# replaces result','# indicates a failed liquid QC sample for the corresponding device lot.',[
  'Review the reagent-lot QC status in the meter and identify the affected analyte.',
  'Check QC material preparation, assay kit lot and expiration and follow the QC corrective-action sequence.',
  'Patient testing resumes only after an acceptable QC sample.'
 ],'When ! and # appear together, both internal and sample QC failures require resolution.','hold'),
 entry('QC & calibration','Daily QC Device or calibration check fails','Meter alignment, optical calibration or laser check is unsuccessful.',[
  'Use the reusable electronic QC Device, not a disposable sample cassette.',
  'Inspect for dirt/handling problems and follow approved QC Device storage/cleaning instructions.',
  'Repeat only the manufacturer-directed check and capture exact failure messages.'
 ],'Stop patient testing if QC Device fails or is overdue; escalate to the lab supervisor/vendor.','hold'),
 entry('QC & calibration','New device lot not ready / code chip issue','QC lockout, missing lot information or NO DEVICE DATA.',[
  'Verify the assay-specific code chip was installed and the lot matches the test devices.',
  'Check instrument date, lot expiration and required external QC status.',
  'Do not bypass a lockout or use expired cartridges.'
 ],'Notify laboratory leadership if coding/QC cannot be restored.','hold'),
 entry('Instrument & workflow','Cassette stuck, motor or optics error','Meter track/motor failure, scan or instrument warning.',[
  'Document the exact message and device lot. Do not force a stuck cassette through the track.',
  'Follow approved restart/cleaning guidance only; check the instrument location/temperature.',
  'Use a new device only after the meter is confirmed ready and QC acceptable.'
 ],'Repeated motor/optics faults require vendor technical support.','service')
 ]},
spotfire:{
 name:'BIOFIRE SPOTFIRE',subtitle:'Respiratory and sore-throat panels · pouch preparation and module errors',
 sources:[S('bioMérieux SPOTFIRE system operator manual','https://www.biomerieux.com/content/dam/biomerieux-com/service-support/support-documents/instructions-for-use-and-manuals/BFR0001-1641-BIOFIRE-SPOTFIRE-System-Operator-Manual-IVD-EN.pdf')],
 items:[
 entry('Specimen & results','Pouch does not draw hydration solution or sample','Vacuum failure, incorrect loading or incomplete hydration.',[
  'Confirm the correct panel, hydration solution, sample buffer, vial and current kit IFU.',
  'Inspect preparation steps without squeezing or attempting to salvage the pouch.',
  'If hydration or sample uptake fails, discard the pouch and use a new one as instructed.'
 ],'Treat the run as invalid; log pouch lot and failure for technical support or credit review.','hold'),
 entry('Specimen & results','Invalid run or controls failed','Run incomplete or internal control failure.',[
  'Read the Run Details and distinguish instrument/run error from panel internal control failure.',
  'Record sample ID, pouch lot, serial number, module ID and error message.',
  'Repeat using a new pouch only after verifying the approved sample, pouch preparation and instrument status.'
 ],'Do not report individual pathogens from a run that failed its required controls.','hold'),
 entry('Instrument & workflow','Pouch rejected, will not load or eject','Module transport/position error.',[
  'Use the software module reset procedure in the operator manual.',
  'Do not force the pouch or open the analyzer hardware to retrieve it.',
  'Retest on a working module with a new pouch when appropriate.'
 ],'Contact bioMérieux support if a module reset does not correct the problem.','service'),
 entry('Instrument & workflow','Barcode or control station problem','Unreadable barcode, frozen interface or communication error.',[
  'Check pouch barcode for wrinkles, damage or debris; manually enter pouch identifiers only if allowed.',
  'Record the error message and use the documented control-station restart sequence.',
  'Confirm patient and pouch identifiers before initiating a new run.'
 ],'Do not use a module with persistent software/hardware errors; contact support.','service')
 ]},
torch:{
 name:'BIOFIRE FilmArray Torch',subtitle:'GI molecular panel · pouch controls, hydration and Torch module recovery',
 sources:[S('bioMérieux FilmArray Torch operator manual','https://www.biomerieux.com/content/dam/biomerieux-com/service-support/support-documents/instructions-for-use-and-manuals/HTFA-PRT-0001-FilmArray-Torch-Operators-Manual-IVD-EN.pdf'),S('BioFire run details and invalid control guidance','https://biofiredefense.com/pouch-credit-reimbursement/')],
 items:[
 entry('Specimen & results','No pouch hydration or sample uptake','Pouch vacuum failed or preparation incomplete.',[
  'Verify the GI panel kit, Cary-Blair specimen handling and the correct hydration/sample vial.',
  'Do not squeeze or force fluid into a failed pouch; follow pouch IFU.',
  'Discard an unsuccessfully hydrated pouch and prepare a fresh one if repeat testing is indicated.'
 ],'Log lot and failure reason for lab leadership/vendor support.','hold'),
 entry('Specimen & results','Controls failed / invalid GI panel','Reported failed control or interrupted run.',[
  'Open Browse Runs / View Report / Show Run Details to read control and error information.',
  'Capture sample ID, pouch lot, run status, module serial number and error code.',
  'After correcting an identifiable setup issue, repeat with a fresh pouch using the current panel IFU.'
 ],'Do not report individual detections from an invalid GI panel or override the control status.','hold'),
 entry('Instrument & workflow','Pouch stuck or rejected by Torch module','Pouch cannot be inserted or does not eject.',[
  'Check module status and follow the approved Torch module reset from its front access panel.',
  'Never pull out a seized pouch while the module is operating.',
  'Only re-run when the module is available and a new pouch is ready.'
 ],'Persistent pouch handling faults need BioFire technical support.','service'),
 entry('Instrument & workflow','Base/communication error','Torch module not available or system interface crashes.',[
  'Record displayed error and identify the affected module.',
  'Use the manufacturer-approved system-base reset if instructed; do not modify Windows/system configuration.',
  'Confirm patient identity and a fresh pouch for any repeat.'
 ],'Escalate recurring system errors, and use approved alternative testing if urgent.','service')
 ]},
sofia:{
 name:'Sofia 2',subtitle:'Flu/COVID, RSV and Strep A · calibration, QC and cassette results',
 sources:[S('Quidel Sofia 2 calibration guidance','https://quickstart.quidel.com/en/docs/calibrate/'),S('Quidel Sofia 2 QC guidance','https://quickstart.quidel.com/docs/qc/')],
 items:[
 entry('Specimen & results','Invalid test / control not accepted','Test cartridge internal control unsuccessful or analyzer reads invalid.',[
  'Do not call an invalid test negative. Verify correct assay/cassette and specimen, sample volume and timing.',
  'Confirm the correct assay mode, required incubation/read mode and kit lot settings.',
  'Repeat with a fresh cassette after following assay-specific instructions.'
 ],'Notify laboratory leadership for repeated invalid tests or discordant clinical results.','hold'),
 entry('QC & calibration','30-day calibration check fails or is overdue','Calibration cassette check not accepted.',[
  'Retrieve the calibration cassette from its storage pouch and avoid touching the optical window.',
  'Follow the analyzer calibration prompts; inspect the cassette for debris/damage.',
  'Reattempt only as specified and verify passing calibration before testing.'
 ],'Quidel instructs users to notify the supervisor or technical support if calibration cannot pass.','hold'),
 entry('QC & calibration','Positive or negative external QC fails','New shipment/lot or scheduled QC outside acceptance.',[
  'Check kit-specific positive/negative controls, QC card, lot, expiry and recommended preparation.',
  'Verify testing conditions and follow each assay package insert for sample/reagent timing.',
  'Record corrective action, repeat QC as permitted and confirm both controls acceptable.'
 ],'Suspend testing with the affected assay/lot until QC passes.','hold'),
 entry('Instrument & workflow','Scanning, drawer or mode issue','QC card/assay barcode not accepted or cassette drawer warning.',[
  'Verify clean barcode and matching assay kit; use documented manual entry only if supported.',
  'Confirm the drawer is clean, unobstructed and fully closed without forcing it.',
  'Record any error code before approved restart or escalation.'
 ],'Repeated reader/drawer problems require supervisor or technical support.','service')
 ]},
febridx:{
 name:'FebriDx',subtitle:'Fingerstick host-response test · control line, timing and collection',
 sources:[S('Lumos FebriDx how-to-use and FAQs','https://www.lumosdiagnostics.com/products/febridx/usa/how-to-use')],
 items:[
 entry('Specimen & results','Blue control line absent','Invalid result regardless of the number of other visible lines.',[
  'Do not interpret MxA or CRP lines without the blue control line.',
  'Repeat with a NEW FebriDx device and a new fingerstick sample following the kit IFU.',
  'Check storage temperature, expiry and that specimen/activation steps were completed.'
 ],'Do not report an invalid test or reinterpret it as negative.','hold'),
 entry('Specimen & results','Faint or uneven MxA / CRP line','Faint, incomplete-width or uneven colored reaction line.',[
  'Read within the manufacturer-defined time window and with the blue control present.',
  'Count a visible faint/uneven result line as positive as directed by the manufacturer.',
  'Use the exact MxA/CRP pattern for interpretation; do not reduce a multi-marker result to a line count.'
 ],'Escalate unreadable background or uncertainty before reporting.','hold'),
 entry('Specimen & results','Blood obscures the window / wrong specimen','Difficult-to-read window, venous blood used or delayed reading.',[
  'Use fresh fingerstick blood only for this assay, not venous whole blood.',
  'Read after 10 minutes when background is clear and no later than 1 hour from starting the test.',
  'If preparation, sample or timing is invalid, repeat with a new device under the IFU.'
 ],'Do not report a result read beyond the permitted window.','hold'),
 entry('QC & calibration','Kit outside intended use or storage conditions','Expired device, wrong patient eligibility or unsuitable storage.',[
  'Verify sealed package, lot/expiry, permitted storage and specified patient population.',
  'Check symptom timing and required collection before testing.',
  'Follow the actual current U.S. IFU and local SOP for controls and limitations.'
 ],'If eligibility or specimen criteria are not met, use the provider-approved alternative.','check')
 ]},
hemocue:{
 name:'HemoCue',subtitle:'Hemoglobin · microcuvette filling, optical path and QC',
 sources:[S('HemoCue Hb 201+ product guidance','https://hemocue.com/us/products/hematology/hemocue-hb-201plus-system/')],
 items:[
 entry('Specimen & results','Bubble, underfilled or contaminated microcuvette','Inconsistent result, incomplete sample filling or visible air bubble.',[
  'Discard the cuvette. Use a fresh, correctly stored and unexpired microcuvette.',
  'Ensure appropriate fingerstick technique, dry puncture site and continuous capillary filling.',
  'Wipe the outside optical surfaces as instructed without drawing extra blood into the same cuvette.'
 ],'If results remain inconsistent, hold the value and check QC/alternative laboratory hemoglobin.','hold'),
 entry('Specimen & results','HHH or result outside measurement range','Instrument indicates a concentration beyond its reportable range.',[
  'Do not substitute a numeric value for HHH or extrapolate beyond instrument range.',
  'Verify specimen/cuvette technique and repeat only if permitted in the IFU.',
  'Obtain a confirmatory approved laboratory measurement.'
 ],'Escalate urgent or critical results to the provider per site policy.','hold'),
 entry('QC & calibration','Liquid control too high or too low','Out-of-range QC or unexpected drift.',[
  'Check control lot, expiry, temperature, mixing and assay-specific accepted ranges.',
  'Check cuvette shelf life, storage and air bubbles.',
  'Clean the cuvette holder/optical unit with approved HemoCue materials, then repeat QC as directed.'
 ],'Stop patient testing until QC is acceptable; seek service for unresolved failure.','hold'),
 entry('Instrument & workflow','Error code, dirty optics or no power','Repeated error, optical check issue or blank display.',[
  'Record the exact error code; check power adapter/batteries and operating temperature.',
  'Perform only manufacturer-approved cleaning of the cuvette holder/optronic unit.',
  'Retry with a new cuvette only if the applicable manual allows it.'
 ],'Persistent electronics/optics errors require HemoCue support; do not open analyzer housing.','service')
 ]},
coagsense:{
 name:'Coag-Sense PT/INR',subtitle:'Fingerstick clot-detection test · strips, sample timing and QC',
 sources:[S('Coag-Sense PT2 professional user manual','https://coag-sense.com/wp-content/uploads/2021/02/PN-200220-PT2-Professional-User-Manual-Rev-AD.pdf')],
 items:[
 entry('Specimen & results','NO SAMPLE DETECTED','Sample absent, misapplied or delayed after APPLY SAMPLE.',[
  'Use a fresh strip and a new fingerstick, as required by the manufacturer.',
  'Wait for APPLY SAMPLE, completely fill the transfer tube to the indicated mark and dispense into the sample well.',
  'Apply within the instrument-defined time window; do not add another drop to an errored strip.'
 ],'Do not report an INR from the failed run.','hold'),
 entry('Specimen & results','CLOT TIME TOO SHORT or unexpected INR','Insufficient or bubbled specimen, early fingerstick, incorrect technique.',[
  'Confirm specimen collection began only after the analyzer prompt.',
  'Review free-flowing fingerstick technique, blood transfer tube filling and air bubbles.',
  'Repeat the entire procedure with a fresh fingerstick and new strip if the IFU directs.'
 ],'If discordant or repeatedly out of range, notify the provider and obtain approved confirmation.','hold'),
 entry('QC & calibration','Control strip or liquid control fails','QC OUT OF RANGE or NO CLOT DETECTED during controls.',[
  'Check compatible control strip/activation material, kit lot, expiry and correct application.',
  'Confirm the transfer tube is filled properly and control sample is free of bubbles.',
  'Follow the manufacturer QC corrective-action procedure before any patient test.'
 ],'Patient testing remains blocked when required controls fail; contact support.','hold'),
 entry('Instrument & workflow','Strip not detected, expired or meter error','DETECT PROBLEM, TEST STRIP EXPIRED, NFC or motor error.',[
  'Confirm meter date, current strip lot and correct strip seating without forcing the mechanism.',
  'Try another current strip only as instructed and use manual lot entry if authorized.',
  'Record exact wording before resetting or escalating.'
 ],'Do not bypass expiry or repeated strip/motor alarms.','service')
 ]},
poc:{
 name:'Other rapid point-of-care tests',subtitle:'QuickVue flu, COVID, RSV, Strep A, mono and conjunctivitis kits. HIV has a separate guide.',
 sources:[S('Quidel QuickVue rapid-test product information','https://www.quidelortho.com/us/en/products/quickvue-rapid-lateral-flow-tests/quickvue-sars-antigen-test'),S('Quidel SARS/flu test product insert (example)','https://imgcdn.mckesson.com/CumulusWeb/Click_and_learn/QuickVue_Flu%2BSARS_Test_IFU.pdf')],
 items:[
 entry('Specimen & results','Control line missing','Lateral-flow assay is invalid even if a test line is visible.',[
  'Stop interpretation and confirm the kit-specific definition of a valid control line.',
  'Check correct specimen, buffer volume, expiry, device orientation and reading time.',
  'Repeat using a new device and fresh/approved specimen following that product IFU.'
 ],'Do not report as positive or negative without a valid control.','hold'),
 entry('Specimen & results','Faint line or read outside time window','Weak test band, early/late reading or background discoloration.',[
  'Use the exact manufacturer interpretation rules and required reading time for the selected test.',
  'Do not apply a different product’s line-count rules to this assay.',
  'If timing or control is invalid, use a new kit and repeat according to IFU.'
 ],'Report only valid results read in the authorized window.','hold'),
 entry('QC & calibration','New lot/shipment or controls fail','Positive/negative controls do not meet the kit criteria.',[
  'Check the exact kit name, approved specimen, lot, expiry and QC materials.',
  'Follow kit-specific control addition, processing and wait times.',
  'Document and repeat QC per site policy. Do not use a failed lot.'
 ],'Quarantine affected tests if repeated QC failure and notify laboratory leadership.','hold'),
 entry('Instrument & workflow','Wrong swab, age group or transport medium','Specimen not within the product’s authorized intended use.',[
  'Compare the order and specimen against the actual current kit IFU; test products can differ even within one brand.',
  'Do not assume transported media or swabs approved for one kit apply to another.',
  'Arrange recollection or a validated alternative when the sample is incompatible.'
 ],'Escalate if the ordered assay cannot be performed with the available kit.','check')
 ]},
'drug-screen':{
 name:'McKesson urine drug screen',subtitle:'14-panel qualitative immunoassay · cutoff, control and manual entry',
 sources:[S('McKesson clinical laboratory testing product information','https://mms.mckesson.com/')],
 items:[
 entry('Specimen & results','Control line missing in any panel','That strip/panel is invalid regardless of apparent test-line pattern.',[
  'Identify the affected panel and the exact 14-panel cup IFU.',
  'Check sufficient sample, read time, storage and expiration.',
  'Repeat on a new approved cup with acceptable specimen under local policy.'
 ],'Do not record an invalid panel as negative or positive.','hold'),
 entry('Specimen & results','Faint test line or confusing negative result','Competitive drug screens may display lines differently than infectious antigen tests.',[
  'Confirm interpretation against the actual kit IFU; for many competitive screens, any visible test line is negative at its cutoff when the control is valid.',
  'Verify the panel abbreviation, target and manufacturer cutoff.',
  'Read only within the specified time; record the result as presumptive.'
 ],'Do not assume a faint line is positive. Refer disputes or unexpected results for definitive testing.','hold'),
 entry('Specimen & results','Discrepant screen or suspected adulteration','Result does not match history, or specimen validity is questioned.',[
  'Check specimen identity, collection quality, temperature and validity parameters only if part of the approved program.',
  'Recognize the limitations of immunoassay cross-reactivity and cutoff-based screening.',
  'Consult the ordering provider for confirmatory laboratory testing where clinically indicated.'
 ],'Do not alter or override a presumptive screening result.','check'),
 entry('QC & calibration','Cup lot issue or Relaymed entry mismatch','New lot, expired cup, incorrect panel code or QC concern.',[
  'Verify current product/lot, all 14 panel labels, expiration and manufacturer QC instructions.',
  'Match reported abbreviations to the corresponding results in the manual-entry workflow.',
  'Document lot-related QC failures and remove affected cups from service.'
 ],'Escalate missing analytes, mismatched tests or unresolvable QC failures.','hold')
 ]}
};
/* Start with the checks most likely to prevent an unnecessary repeat. */
const firstChecks={
 pathfast:['Confirm lithium-heparin mixing, sample well, bubble-free pipetting and correct lane/SID.','Review reagent pill, 28-day calibration and both QC levels.','For failed or questionable tests, save the analyzer remark and notify the ordering provider.'],
 piccolo:['Confirm correct disc, approved lithium-heparin specimen and required sample volume.','Look for ~~~ suppression and HEM/LIP/ICT index flags before reporting.','Re-use no disc. Capture error code and perform approved repeat with a NEW disc.'],
 sysmex:['Inspect properly mixed EDTA tube for clots and adequate volume.','Review daily LOW/NORMAL/HIGH EIGHTCHECK and blank/background acceptance.','Review CBC flags and histogram; keep QC/blank printouts in the binder.'],
 clinitek:['Confirm the correct Strip vs Cassette mode and test-table orientation.','Check specimen age, strip bottle expiry, positive/negative QC and reagent pad exposure.','An E-code or unreadable hCG test is INVALID, not a negative result.'],
 triage:['Run the electronic QC Device daily when patient testing is performed.','Check assay-specific liquid QC at every new shipment/lot and at least every 30 days.','! means failed internal QC; # means failed lot liquid QC. Never report blocked fields.'],
 spotfire:['Confirm exact R/ST Regular or Mini panel and compatible specimen/transport medium.','Verify hydration and sample loading; an invalid pouch cannot be reused.','Record the exact run message, pouch lot, sample ID and instrument module.'],
 torch:['Confirm correct GI pouch, sample buffer, Cary-Blair specimen and transfer steps.','Review RNA process and PCR2 controls before reporting.','Repeat only with a new pouch after any pouch failure or invalid run.'],
 sofia:['Check the 30-day calibration cassette status and external lot QC.','Confirm correct kit, reader mode, extraction volume and the prescribed timing window.','A failed assay control invalidates the result regardless of visible positivity.'],
 febridx:['Only fresh fingerstick blood; completely fill the collection tube.','Check the blue control, clear result window and pink/red blood-clearance window.','A failed 30-minute blood-clearance check or absent control requires a new device.'],
 hemocue:['Inspect microcuvette for bubble, incomplete fill or dirty optical window.','Confirm built-in self-test and any local liquid-QC requirement.','Out-of-range HHH is not a measured numeric value.'],
 coagsense:['Confirm meter ready, valid strip lot and complete fingerstick transfer tube.','Check high/low QC for new shipment/lot and any instrument QC lockout.','Do not add a second drop or bypass an error on the same strip.'],
 poc:['Identify exact stocked kit; approved swab, buffer and read time differ by assay.','Verify control line before interpreting faint test bands.','Repeat invalid tests with a new device and follow lot/shipment QC.'],
 'drug-screen':['Competitive screens often show a faint TEST line when negative at the cutoff.','Verify control on each drug panel, each abbreviation and cutoff.','Document as presumptive; request confirmatory laboratory testing when indicated.']
};
const resumeChecks={
 pathfast:'Current CAL/QC passes for the affected assay, instrument unlocked, sample integrity accepted, and correct SID/result verified.',
 piccolo:'Repeat on an eligible new disc with accepted internal QC and no unresolved suppression. Report only actual printed results.',
 sysmex:'Three-level daily QC and blank/background within limits; reprocessed specimen meets acceptance and CBC flags have been reviewed.',
 clinitek:'Correct mode and consumables, accepted required controls, and a new valid strip/cassette run with patient ID verified.',
 triage:'Electronic QC passes and the relevant lot liquid QC is current and acceptable; no ! or # blockers on the final report.',
 spotfire:'New pouch finishes with valid controls, correct panel/specimen and verified patient/sample identifiers.',
 torch:'New pouch passes both process controls with the correct GI specimen and verified result.',
 sofia:'Calibration and kit-specific QC pass, valid test control, correct cassette/timing and patient ID.',
 febridx:'New single-use device with blue control and both windows acceptable within the permitted read window.',
 hemocue:'Cuvette/optical check resolved, instrument self-test successful, any required QC passes and result within reportable range.',
 coagsense:'High and low controls meet limits, strip current, and patient procedure finishes with a valid INR result.',
 poc:'Appropriate current kit and approved specimen, valid control, proper read window and passed required external controls.',
 'drug-screen':'Valid control on all panels, correct lot/expiry and verified presumptive result entry or approved confirmation.'
};
const names={specimen:'Specimen & results',qc:'QC & calibration',instrument:'Instrument & workflow'};
const order=['Specimen & results','QC & calibration','Instrument & workflow'];
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function card(item,num){
 const urgent=item.level==='hold';
 return '<details class="lt-issue'+(urgent?' lt-hold':'')+'">'+
  '<summary><span class="lt-no">'+String(num).padStart(2,'0')+'</span><span class="lt-main"><strong>'+esc(item.title)+'</strong><small>'+esc(item.signal)+'</small></span><span class="lt-status '+(urgent?'lt-status-hold':item.level==='service'?'lt-status-service':'lt-status-check')+'">'+(urgent?'HOLD RESULT':item.level==='service'?'SUPPORT':'CHECK')+'</span><span class="lt-chevron" aria-hidden="true"></span></summary>'+
  '<div class="lt-issue-content"><div class="lt-subhead">Corrective action</div><ol>'+item.actions.map(a=>'<li>'+esc(a)+'</li>').join('')+'</ol><p class="lt-escalate"><b>If unresolved / stop:</b> '+esc(item.escalate)+'</p><p class="lt-record"><strong>Record:</strong> exact error or printout flag, sample/lot ID in the approved system, QC status, action performed, repeat result and who was notified. Do not enter patient information in this reference page.</p></div></details>';
}
function render(id){
 const guide=guides[id];if(!guide)return '';
 const items=guide.items;
 let num=0;
 const groups=order.map(topic=>{
  const hits=items.filter(x=>x.topic===topic);if(!hits.length)return '';
  return '<section class="lt-group" aria-label="'+esc(topic)+'"><div class="lt-group-heading"><h3>'+esc(topic)+'</h3><span>'+hits.length+' '+(hits.length===1?'situation':'situations')+'</span></div><div class="lt-issues">'+hits.map(x=>card(x,++num)).join('')+'</div></section>';
 }).join('');
 return '<section class="lt-guide" aria-label="'+esc(guide.name)+' troubleshooting reference">'+
  '<header class="lt-hero"><div><span class="lt-eyebrow">LAB CENTRAL / TROUBLESHOOTING</span><h2>Troubleshooting</h2><p>'+esc(guide.subtitle)+'</p></div><span class="lt-counter">'+items.length+' common issues</span></header>'+
  '<div class="lt-response"><div><span>01</span><b>HOLD</b><small>Do not report a failed, blocked or invalid result.</small></div><div><span>02</span><b>CHECK</b><small>Confirm patient, specimen, lot, QC and exact instrument message.</small></div><div><span>03</span><b>RESOLVE</b><small>Follow the current assay IFU, document the action and verify a valid repeat.</small></div></div>'+
  '<div class="lt-quick"><strong>First checks for '+esc(guide.name)+'</strong><ul>'+(firstChecks[id]||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'+
  '<div class="lt-tools"><label>Find an error or symptom<input type="search" class="lt-search" data-lt-search placeholder="e.g. QC, clot, invalid, E67" aria-label="Search troubleshooting situations"></label><div class="lt-tools-actions"><button type="button" data-lt-action="expand">Expand all</button><button type="button" data-lt-action="collapse">Collapse all</button></div></div>'+
  '<p class="lt-notice"><b>Use the site SOP first.</b> These are operator-level reference steps, not authorization to bypass QC, dilute specimens, repair internal components or override the manufacturer IFU. For urgent clinical decisions, inform the provider and use an approved alternate testing pathway if necessary.</p>'+
  groups+
  '<p class="lt-empty" hidden>No matching issues. Try an error code, assay or symptom.</p>'+
  '<div class="lt-resume"><strong>Before testing resumes</strong><p>'+esc(resumeChecks[id]||'Confirm acceptable QC, valid consumables and a reportable result per the current IFU.')+'</p></div>'+
  '<footer class="lt-resources"><div><b>Manufacturer / product references</b><p>Open the source documentation for exact error codes, specimen restrictions and corrective-action steps. Local approved instructions take precedence.</p></div><div class="lt-source-links">'+guide.sources.map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+' ↗</a>').join('')+'</div></footer>'+
  '</section>';
}
document.addEventListener('click',function(e){
 const button=e.target.closest('.lt-guide [data-lt-action]');
 if(!button)return;
 const root=button.closest('.lt-guide');if(!root)return;
 const expand=button.dataset.ltAction==='expand';
 root.querySelectorAll('.lt-issue').forEach(x=>{if(!x.hidden)x.open=expand});
});
document.addEventListener('input',function(e){
 if(!e.target.matches('.lt-guide [data-lt-search]'))return;
 const root=e.target.closest('.lt-guide'),q=e.target.value.trim().toLowerCase();
 root.querySelectorAll('.lt-issue').forEach(x=>{
  x.hidden=Boolean(q)&&!x.textContent.toLowerCase().includes(q);
 });
 root.querySelectorAll('.lt-group').forEach(g=>{g.hidden=![...g.querySelectorAll('.lt-issue')].some(x=>!x.hidden)});
 const empty=root.querySelector('.lt-empty');if(empty)empty.hidden=[...root.querySelectorAll('.lt-issue')].some(x=>!x.hidden);
});
window.LAB_TROUBLESHOOTING={render,ids:Object.keys(guides),guides};
})();
