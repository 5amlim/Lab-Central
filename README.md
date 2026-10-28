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

## PATHFAST Calibration + QC

The Calibration + QC page uses a schematic six-lane PATHFAST rack, with **CAL 1 / CAL 1 / CAL 2 / CAL 2 / QC 1 / QC 2** loaded in that order. The 28-day status guidance identifies the pink analyzer pill as the lockout/due state and gray as ready after acceptable results. These illustrations **do not** read live device status.

The website displays one combined Calibration + QC training-video slot instead of two separate slots. Add the approved video URL under `calibration` in the `LAB_GUIDE_VIDEOS` configuration within `index.html`.

The rack illustration is in `pathfast-calibration.js`; its styles are in `pathfast-calibration.css`. The workflow reflects staff instructions and should be checked against each current assay's manufacturer IFU and approved SOP. Other QC intervals or triggers may also apply.

## Training updates

The PATHFAST video entries are placeholders until an authorized editor adds approved training URLs. Instrument order-set fields are placeholders until current Athena order-set names and screenshots have been verified.

## Staff-use and safety

**Review the source procedures against current official SOPs, manufacturer instructions, approved laboratory policies and current courier schedules before rollout.** This repository is currently **public**. Public GitHub repositories and GitHub Pages are not staff-access-controlled, so obtain organizational approval before making internal workflow content publicly available. Do not put patient information, passwords, internal account credentials or private training content into the public repository.
