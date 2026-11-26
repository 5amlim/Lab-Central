/* Original, non-interactive training reconstructions of the legacy Insight
   portal. Based on Sysmex 1085-TS Rev 3 (2014), 1571-TS Rev 3 (2019),
   and the 2023 Sysmex BCQM status update for pocH-100i.
   These are not screenshots of the signed-in portal. */
(() => {
  'use strict';
  const field = (value, select=false, highlight=false) => '<span class="sxi-field'+(highlight?' sxi-focus':'')+'">'+value+(select?'<i aria-hidden="true">▾</i>':'')+'</span>';
  const action = (label, focus=false) => '<span class="sxi-action'+(focus?' sxi-focus':'')+'">'+label+'</span>';
  const row = (label,value) => '<div class="sxi-row"><span>'+label+'</span>'+value+'</div>';
  const sidebar = (selected) => '<div class="sxi-side"><b>QC Data</b>'+['Submit QC Data','Review Your QC Data'].map(label=>'<span class="'+(label===selected?'sxi-focus':'')+'">'+label+'</span>').join('')+'<b>Report Center</b><span>Group Comparisons</span><span>Customer QC Reports</span><b>Reference / Documents</b><span>Assay Sheets</span><span>Lot Calendars</span><span>User Manuals</span><b>Account</b><span>Registered Analyzers</span></div>';
  const screen = (title,body,nav='Submit QC Data') => '<div class="sxi-window"><div class="sxi-browser"><span class="sxi-dots">● ● ●</span><span>sysmex.com/insight/</span></div><div class="sxi-brand"><strong>sysmex</strong><span>Insight™</span><small>Log off</small></div><div class="sxi-nav">HOME <span>REFERENCE / DOCUMENTS</span> <b>QC DATA</b> <span>REPORT CENTER</span> <span>ACCOUNT</span> <span>CONTACT US</span></div><div class="sxi-layout">'+sidebar(nav)+'<div class="sxi-main"><h4>'+title+'</h4>'+body+'</div></div></div>';
  const note = (title,body) => '<div class="sxi-callout"><strong>'+title+'</strong><span>'+body+'</span></div>';
  const levels = ['Low','Normal','High'];
  const parameters = ['WBC','RBC','HGB','HCT','MCV','MCH','MCHC','PLT'];
  const grid = (review=false) => '<table class="sxi-data"><thead><tr><th>Parameter</th>'+levels.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody><tr><th>Time</th>'+levels.map(()=>'<td>'+field(review?'HH:MM':'',false,!review)+'</td>').join('')+'</tr>'+parameters.map((x,i)=>'<tr><th>'+x+'</th>'+levels.map(()=>'<td>'+field(review?'—':'',false,!review&&i===0)+'</td>').join('')+'</tr>').join('')+'<tr><th colspan="4" class="sxi-more">Additional applicable parameters as displayed</th></tr></tbody></table>';
  const figure = (caption,body) => '<figure class="sxi-figure"><div class="sxi-scroll">'+body+'</div><figcaption><b>Illustrated training example</b><span>'+caption+'</span></figcaption></figure>';
  const illustrations = [
    () => figure('Select QC Data submission after signing in. The current portal layout may differ.',
      screen('Welcome to Insight', '<p class="sxi-welcome">Interlaboratory Quality Assessment Program</p><div class="sxi-welcome-card"><strong>QC Data</strong><p>Choose the data submission workflow for your registered analyzer.</p>'+action('Submit QC Data',true)+'</div>', 'Submit QC Data')),
    () => figure('Use the registered instrument and actual QC run date and lot. Single Run is the daily manual-entry workflow.',
      screen('Submit QC Data',row('Please select your Analyzer',field('pocH-100i · [your analyzer]',true,true))+'<div class="sxi-actions">'+action('Enter Single Run',true)+action('Enter Summarized Values')+'</div><div class="sxi-rule"></div>'+row('Sample date',field('MM/DD/YYYY',false,true))+row('Lot Number',field('[current EIGHTCHECK lot]',true,true))+note('QC1 · QC2 · QC3','Match the Low, Normal and High reports to the corresponding columns.'))),
    () => figure('The three columns represent the three control levels. Illustrative subset of fields; transcribe every applicable field from the corresponding printed report.',
      screen('Single Run Data',row('Lot Number',field('[actual lot]'))+row('Sample date',field('[actual run date]'))+grid()+'<div class="sxi-actions">'+action('Verify Single Run Data',true)+'</div>')),
    () => figure('Compare the verification screen to the original reports. Correct any entry errors before submitting.',
      screen('Verify QC Data',row('Analyzer',field('pocH-100i · [your analyzer]'))+row('Run Type',field('Single Run'))+row('Lot Number',field('[actual lot]'))+grid(true)+'<div class="sxi-actions">'+action('Edit Single Run Data')+action('Submit Single Run Data',true)+'</div>'+note('Review first','Verification alone does not submit the data.'))),
    () => figure('Reconcile submitted entries with the original reports and local QC records. This illustration is not a QC acceptance report.',
      '<div class="sxi-records"><div class="sxi-report"><strong>pocH-100i</strong><small>QC REPORT · EXAMPLE</small><div class="sxi-rule"></div><span>Lot: [actual lot]</span><span>Level: [Low / Normal / High]</span><span>Date: [run date]</span>'+parameters.slice(0,6).map(x=>'<div>'+x+' <b>—</b></div>').join('')+'</div><div class="sxi-record-checks"><strong>Compare and retain</strong>'+['Correct analyzer, date and lot','All required QC levels recorded','Values match original reports','Discrepancies documented per SOP','Original reports filed in QC log'].map(x=>'<div><span aria-hidden="true">□</span>'+x+'</div>').join('')+'</div></div>')
  ];
  window.LAB_SYSMEX_INSIGHT_VISUAL = { render(index) {
    return illustrations[index] ? illustrations[index]() : '';
  }, source() {
    return '<p class="sxi-source">Screen reconstructions based on the documented legacy Insight workflow (Sysmex 1085-TS Rev. 3 and 1571-TS Rev. 3). <a href="https://pages.sysmex.com/BCQM-Release-Notes.html" target="_blank" rel="noopener noreferrer">Sysmex pocH-100i portal guidance ↗</a>. Not live screenshots; verify the actual screen and approved SOP before entry.</p>';
  }};
})();
