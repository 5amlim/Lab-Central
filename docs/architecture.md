# Architecture

## Overview

Lab Central is a static, client-side site served from the repository root. Its current implementation uses plain HTML, CSS, and JavaScript, without a bundler or a backend.

`index.html` contains the application shell, core reference content, routing, and page rendering. Additional feature files extend the interface and illustrations.

## Main areas

| Area | Files |
| --- | --- |
| Navigation and page layout | `index.html`, `flow-navigation.css`, `guide-scroll-cues.js` |
| Lab operations | `operations-guides.*`, `sendout-market-guide.js`, `sendout-form-config.js` |
| Quality and competency | `qc-guide.*`, `quality-reference.*`, `pt-testing-guide.*`, `training-competency.*` |
| Instrument-specific guides | `pathfast-*.*`, `biofire-*.*`, `triage-meterpro-visual.*`, `sysmex-*.*` |
| Collection and specimen references | `lab-container-*.*`, `tube-reference.css`, `collection-photo-preview.js` |
| Clinical reference tools | `egfr-calculator.*`, `result-interpretation-guides.*`, `assay-catalog.*` |
| Ordering and sendout | `athena-ordering-guide.*`, `lab-calculators-guide.*`, `pathmd-reference.*` |
| Images and training documents | `assets/` |

The inventory above is a guide to the primary modules, not an exhaustive list.

## Module dependencies

The JavaScript files use shared `window.LAB_*` interfaces and, in some cases, extend functions defined by modules loaded earlier. Their order in `index.html` is intentional.

When updating modules:

1. Check the related script and stylesheet tags in `index.html`.
2. Preserve dependency order and exported browser globals.
3. Verify navigation, guided steps, print behavior, and mobile layouts in a browser.
4. Run `node scripts/check-site.mjs` to catch missing static references.

Avoid moving or renaming active JavaScript and CSS files without updating all references. An isolated rename can be safe; a bulk move requires broader regression testing.

## Content and files

The site includes instructional assets under `assets/`. Some links open external vendor references, calculators, or forms. Those services are outside this repository and must be validated separately.

`archive/` holds earlier reference implementations. Its content should not be treated as an approved clinical procedure.

## Technical debt

The main HTML file still contains significant application and content logic. Extracting those areas into smaller modules is a future refactor, not a prerequisite for secure hosting. Any extraction should be incremental and accompanied by functional checks.
