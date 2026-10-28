# Lab Central

Interactive reference website for clinical lab workflows, instrument instructions, and training.

## What's included

- Searchable instrument and point-of-care testing guides
- Custom SVG equipment illustrations for each instrument, plus the detailed PATHFAST six-lane rack diagram
- PATHFAST workflows, including one combined 28-day Calibration + QC guide with a six-lane rack schematic and a single Calibration + QC video placeholder
- Lab Calculator links for Quest, Cedars and Labcorp
- External requisition workflow (Navigator task, clinical review, missing information, provider escalation and front-desk scheduling)
- Separate in-house ordering workflow
- Order-set placeholders for each active instrument
- Archived references for discontinued devices
- Home stool and urine collection: staff kit preparation, patient instructions and test-specific containers
- Specimen drop-off: new Athena appointment, new provider order and documentation
- Lab Sendout Log: color printing from Athena original image, nurse .rn charting, tech processing, Microsoft Forms logging, and bin handoff

## Website

Equipment illustrations are stored in `equipment-art.js` and styled in `equipment-art.css`. They appear on the instrument Overview tabs and are simplified visual references, not manufacturer operating diagrams. Both files must be deployed with `index.html`.



The main site content, scripts and existing illustrations are in `index.html`. Layout enhancements for connected workflow steps, category-colored menus and active navigation are in `flow-navigation.css`. Keep both files at the repository root when publishing. Open `index.html` in a browser with `flow-navigation.css` alongside it to preview locally.

To publish it with GitHub Pages, use **Settings → Pages → Deploy from a branch → main / (root)**. GitHub Pages deployment is separate from uploading the repository files.

## Sendout Log form link

The direct responder URL for the Microsoft Sendout Log was not available in the supplied materials. The website therefore displays a clear pending-link message and directs staff to the existing QR code on the laminated lab instructions.

To publish the verified link, edit `sendout-form-config.js` and set `window.LAB_SENDOUT_FORM_URL` to the official HTTPS **responder link**, then republish. Do not place a form editor URL, credentials or patient data in the repository.

## Home collection

The home-collection instructions were transcribed from *Home Urine and Stool Collection Instructions for Staff and Patients* (5-page source), with clinical verification cautions for specimen stability. Its source PDF illustrations are not hosted in this repository. Confirm container selection and storage directions against current test-specific guidance. The new Athena drop-off appointment and new order workflow are staff-provided instructions separate from the source document.

## Serial hs-Troponin collection windows and interference investigation

The RN collection guide displays the clinic-requested **±10-minute** timed-draw window:
- 0/1-hour: 50–70 minutes after the timestamp of the initial blood draw.
- 0/2-hour: 110–130 minutes after the initial blood draw.

**Never designate or apply the 1-hour or 2-hour delta decision threshold to a specimen collected outside the applicable timing window.** Record the real time, notify the provider, and use the approved alternative plan. The 2020 ESC guidelines explicitly describe ±10 minutes for the 0/1-hour draw; the same tolerance for the 0/2-hour pathway is a requested **local workflow rule** that requires approval in the applicable clinical protocol.

The guide also illustrates a centrifuged lithium-heparin tube, with plasma above buffy coat and packed red cells. When a falsely elevated PATHFAST troponin is suspected from fibrin/microclots, the same original tube can be centrifuged and plasma retested as an **interference investigation**, following the approved lab SOP and assay IFU. This does not dismiss the original elevated result, replace the timed clinical redraw, or preclude a separately requested new specimen.

The provider tab has an interactive multiple-choice chest-pain pathway reference with source-appropriate safety warnings. It does not store patient information, issue a diagnosis, calculate deltas, or make discharge/transfer decisions. Clinical thresholds in the supplied source slides must be reconciled with the current approved pathway before patient use.

Files: `pathfast-interactive.js` and `pathfast-interactive.css`; both required with `index.html`.
Evidence: 2020 ESC 0/1-hour sampling guidance, PATHFAST hs-cTnI-II package insert (fibrin/clots and plasma), and laboratory medicine publications on same-specimen re-centrifugation in suspected hs-troponin interference.

## PATHFAST RN collection and clinical pathway references

The PATHFAST instrument page has two additional tabs:

- **RN collection & timing**: green-top lithium-heparin tube illustration, immediate 8–10 gentle inversions, actual collection time, microclot precautions, 0/1-hour and 0/2-hour serial collection timing, missed-window escalation, and handoff.
- **Chest pain pathway**: responsive provider-only visual recreations of the supplied 1-hour interpretation table and 0/1-hour chest-pain flowchart.

These pages are implemented in `pathfast-clinical.js` and styled in `pathfast-clinical.css`. The website does not contain the original slide-image files or the uploaded PDF attachments. Keep both new source files alongside `index.html` when publishing.

**Clinical review required:** The pathway image references have different delta-threshold wording (>3 versus ≥3 ng/L) and initial rule-out conditions. The clinic one-page guide reports a 99th-percentile hs-TnI reference of 29 ng/L while the slide specifies 21.4 ng/L (female) and 29.8 ng/L (male). Medical leadership must confirm the correct assay- and protocol-specific rules before clinical use. The website does not calculate disposition.

## PATHFAST assay selection, controls, and screen guide

The PATHFAST patient testing page now contains 11 guided steps with a touchscreen-style ASSAY/HOME illustration. The login note has been removed. Athena PATHFAST D-Dimer, hs-Troponin and pro-BNP order names appear only under the separate Order Sets tab.

The calibration page presents three assay choices: hs-Troponin I, NT-proBNP, and D-dimer. Each selection shows a CAL/QC touchscreen reference, reagent-box calibrator diagrams, six-lane rack, and lot-specific QC bottle drawings.

Control assignments in the SoCal reagent order tracker (Oct 28, 2026):
- Cardiac (both hs-Troponin I and NT-proBNP): QC 1 lane 5 = **Bio-Rad Cardiac Markers Plus LT Level 1 (#146)**; QC 2 lane 6 = **Level 3 (#148)**.
- D-dimer: QC 1 lane 5 = **Liquichek D-dimer Level Low (#27100)**; QC 2 lane 6 = **Level 1 (#27101)**.

Vendor storage guidance: PATHFAST reagent kits and calibrators at **2–8°C**; Bio-Rad controls at **−20 to −70°C**. Use the current lot-specific IFU for thawing, preparation and stability. Source: https://polymedco.com/faqs/ .

Interface illustrations in `pathfast-screen-guide.js` and `pathfast-screen-guide.css` are simplified original screen references based on the PATHFAST Operator's Manual; they do not replace the actual instrument display or control an analyzer.

## PATHFAST Calibration + QC

The Calibration + QC page uses a schematic six-lane PATHFAST rack, with **CAL 1 / CAL 1 / CAL 2 / CAL 2 / QC 1 / QC 2** loaded in that order. The 28-day status guidance identifies the pink analyzer pill as the lockout/due state and gray as ready after acceptable results. These illustrations **do not** read live device status.

The website displays one combined Calibration + QC training-video slot instead of two separate slots. Add the approved video URL under `calibration` in the `LAB_GUIDE_VIDEOS` configuration within `index.html`.

The rack illustration is in `pathfast-calibration.js`; its styles are in `pathfast-calibration.css`. The workflow reflects staff instructions and should be checked against each current assay's manufacturer IFU and approved SOP. Other QC intervals or triggers may also apply.

## Training updates

The PATHFAST video entries are placeholders until an authorized editor adds approved training URLs. Instrument order-set fields are placeholders until current Athena order-set names and screenshots have been verified.

## Staff-use and safety

**Review the source procedures against current official SOPs, manufacturer instructions, approved laboratory policies and current courier schedules before rollout.** This repository is currently **public**. Public GitHub repositories and GitHub Pages are not staff-access-controlled, so obtain organizational approval before making internal workflow content publicly available. Do not put patient information, passwords, internal account credentials or private training content into the public repository.
