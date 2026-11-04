Lab Central: Triage MeterPro monthly liquid QC log

1. Extract the contents of this ZIP directly into:
   ~/Documents/Projects/Lab-Central

   The folder should then contain:
   lab-templates.html (already existing)
   apply_triage_qc_update.py (new)
   assets/lab-templates/Triage-MeterPro-Control-Log.pdf (new)

2. In the VS Code terminal run:
   cd ~/Documents/Projects/Lab-Central
   python3 apply_triage_qc_update.py
   git diff -- lab-templates.html
   git status --short

3. Refresh http://localhost:8000/lab-templates.html?template=triage-liquid
   It should open the supplied two-page Sollis Triage log PDF.

This update preserves the original PDF unchanged. No Git commit or push occurs.
Before publishing, confirm this internal Sollis form is approved for the repository's visibility/access settings.
