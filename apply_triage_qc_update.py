#!/usr/bin/env python3
"""Point Lab Central's monthly Triage log at the supplied original PDF."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
page = root / "lab-templates.html"
pdf = root / "assets/lab-templates/Triage-MeterPro-Control-Log.pdf"
if not page.is_file():
    raise SystemExit("Missing lab-templates.html. Extract this ZIP into the Lab-Central project root.")
if not pdf.is_file():
    raise SystemExit("Missing bundled QC PDF under assets/lab-templates/.")
source = page.read_text(encoding="utf-8")
replacement = " {id:'triage-liquid',group:'monthly',title:'Triage MeterPro Liquid QC Log',originalPdf:'assets/lab-templates/Triage-MeterPro-Control-Log.pdf'},"
updated, n = re.subn(r"(?m)^\s*\{id:'triage-liquid',group:'monthly'.*$", lambda _: replacement, source)
if n != 1:
    raise SystemExit(f"Expected one triage-liquid template entry, found {n}. No changes made.")
if updated != source:
    page.write_text(updated, encoding="utf-8")
    print("Updated lab-templates.html to open the supplied Triage log PDF.")
else:
    print("Triage PDF link is already configured.")
print("PDF available at:", pdf.relative_to(root))
print("No commit or GitHub push performed.")
