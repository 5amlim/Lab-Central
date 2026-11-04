# Maintenance guide

## Make a change

1. Identify the affected guide and its JavaScript/CSS module in [Architecture](architecture.md).
2. Update the content and any linked diagrams or assets.
3. Preserve the script load order and \`window.LAB_*\` interfaces used across modules.
4. Keep clinical instructions aligned with the current manufacturer IFU and approved internal SOP.
5. Update the shared cache version on local script and stylesheet URLs in \`index.html\` when releasing changes.
6. Run the repository check and review the page in a browser before publishing.

## Check locally

Start a web server in the repository root:

\`\`\`bash
python3 -m http.server 8000
\`\`\`

Run the static reference check:

\`\`\`bash
node scripts/check-site.mjs
\`\`\`

Review the affected workflows at both desktop and narrow screen widths. Test search results, navigation, interactive selections, print layouts, and any external links touched by the change.

GitHub Actions checks the local asset references and JavaScript syntax on pull requests and changes to \`main\`. These checks do not replace a clinical review or interactive browser testing.

## Update external links

Market-specific responder links are configured in \`sendout-form-config.js\`. Use verified responder URLs, not form editor links. Verify each market's destination before updating the published site.

Training PDFs and reference artwork belong under \`assets/\` only when their distribution is approved.

## Release and rollback

Keep related changes in one focused commit or pull request. Check the deployed GitHub Pages site after the update. If a live workflow regresses, revert the affected commit rather than making unverified emergency edits to clinical instructions.

Do not rewrite commit history to conceal previous work; the history is useful for debugging and auditability.

## Access review

This repository is public. Before transferring to an approved organizational platform, review the content inventory, asset ownership, external links, user access controls, and the intended publishing process with the appropriate technology and compliance stakeholders.
