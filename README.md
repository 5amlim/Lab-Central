# Lab Central

Lab Central is a browser-based reference hub for clinical laboratory operations. It brings point-of-care instrument instructions, specimen collection and sendout workflows, quality control, training, and competency resources into one searchable site.

The application is a static website. It does not require a database or application server.

## What is in the site

- Instrument guides for patient testing, calibration, QC, and routine maintenance
- Searchable assay references and specimen collection instructions
- Sendout and external requisition workflows with market-specific guidance
- Proficiency testing, training, and competency references
- Links to approved lab calculators, documents, and operational forms
- Illustrated workflows and print-friendly reference pages

## Local development

Use a local HTTP server to preview the same static files published through GitHub Pages:

\`\`\`bash
python3 -m http.server 8000
\`\`\`

Open http://localhost:8000 in a browser. There is no build or install step.

Run the repository checks before publishing changes:

\`\`\`bash
node scripts/check-site.mjs
\`\`\`

The checker verifies that local files referenced by the site's HTML pages exist. JavaScript syntax is also checked in GitHub Actions.

## Repository map

| Location | Purpose |
| --- | --- |
| \`index.html\` | Main application shell, reference data, and client-side navigation |
| \`*.js\` | Feature modules, interactive guides, and illustrations |
| \`*.css\` | Feature styling and printable layouts |
| \`assets/\` | Reference images, instructional documents, and templates |
| \`archive/\` | Retired reference material, not part of the active website |
| \`docs/\` | Architecture, maintenance instructions, and review considerations |
| \`.github/workflows/\` | Repository checks and asset workflows |

Most feature modules are still loaded directly from the repository root. Script order matters because the modules share browser globals. See [Architecture](docs/architecture.md) before reorganizing files.

## Publishing

The site is designed to publish from the repository root using GitHub Pages. Confirm the active deployment settings under **Settings > Pages** before changing the branch or directory.

The \`?v=\` value on local stylesheet and script URLs in \`index.html\` is a cache version. Update it consistently when publishing a coordinated release.

See [Maintenance](docs/maintenance.md) for the change and verification process.

## Clinical and access boundaries

Lab Central is a staff reference, not a laboratory information system, medical record, or substitute for an approved SOP or manufacturer IFU. Clinical workflows, assay criteria, and sendout requirements must be verified against current approved guidance before staff use.

**This GitHub repository is public.** GitHub Pages does not provide staff-only access control. Do not add patient information, internal credentials, sensitive documents, or restricted materials here. The content and hosting model should be reviewed with the organization's technology and compliance teams before a production rollout.

See [Clinical review notes](docs/clinical-review.md) for known areas requiring protocol review.
