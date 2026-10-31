/* Compact illustrated Athena send-out ordering guide. Reference-only; not order entry. */
(function(){
 'use strict';
 function bar(title){
  return '<div class="ao-ui-bar"><span class="ao-ui-wordmark">athenaOne</span><span class="ao-ui-bar-title">'+title+'</span><span class="ao-ui-bar-more">•••</span></div>';
 }
 function mini(n){
  if(n===1)return '<div class="ao-ui-frame ao-ui-chart">'+bar('Patient chart')+
    '<div class="ao-ui-chart-row"><span class="ao-ui-profile">PT</span><span class="ao-ui-patient-lines"><i></i><i></i></span><span class="ao-ui-hamb" aria-label="Menu">☰</span></div>'+
    '<div class="ao-ui-surface"><span class="ao-ui-faint-line"></span><span class="ao-ui-faint-line short"></span></div>'+
    '<div class="ao-ui-dropdown"><span>Quickview</span><strong>＋ Create order group</strong><span>Add document</span></div></div>';
  if(n===2)return '<div class="ao-ui-frame">'+bar('Create order group')+
    '<div class="ao-ui-form-title">Select ordering provider</div>'+
    '<div class="ao-ui-input"><span class="ao-ui-search-icon">⌕</span><strong>Ordering provider</strong><span class="ao-ui-check">✓</span></div>'+
    '<div class="ao-ui-rule"></div><div class="ao-ui-action"><span class="ao-ui-plus">＋</span><strong>DIAGNOSES &amp; ORDERS</strong><span>›</span></div></div>';
  if(n===3)return '<div class="ao-ui-frame">'+bar('Diagnoses & Orders')+
    '<div class="ao-ui-input"><span class="ao-ui-search-icon">⌕</span>Search diagnosis</div>'+
    '<div class="ao-ui-label">DIAGNOSES</div><div class="ao-ui-select"><span class="ao-ui-check">✓</span><strong>Appropriate diagnosis</strong></div>'+
    '<div class="ao-ui-caption"><span>Diagnosis added</span><span class="ao-ui-check">✓</span></div></div>';
  if(n===4)return '<div class="ao-ui-frame">'+bar('Edit preferences')+
    '<div class="ao-ui-preferences"><div class="ao-ui-pref-rail"><strong>Lab orders</strong><span>Imaging</span><span>Procedure</span></div>'+
    '<div class="ao-ui-pref-main"><div class="ao-ui-label">LAB ORDERS</div><div class="ao-ui-link-target">Set a preferred lab orders provider <span>›</span></div><span class="ao-ui-mini-line"></span><span class="ao-ui-mini-line short"></span></div></div></div>';
  if(n===5)return '<div class="ao-ui-frame">'+bar('Select laboratory')+
    '<div class="ao-ui-zip"><span>Search near ZIP</span><strong>90211</strong><span class="ao-ui-pencil">✎</span></div>'+
    '<div class="ao-ui-lab-search">⌕ &nbsp; Quest / LabCorp / Cedars / ...</div>'+
    '<div class="ao-ui-lab-row"><span class="ao-ui-check">✓</span><strong>Correct facility and location</strong></div>'+
    '<div class="ao-ui-lab-secondary">Quest · LabCorp · Cedars · HealthTrackRx · PathMD</div></div>';
  return '<div class="ao-ui-frame">'+bar('Diagnoses & Orders')+
    '<div class="ao-ui-input ao-ui-code"><span class="ao-ui-search-icon">⌕</span><strong>Exact test code</strong><span class="ao-ui-code-tag">CODE</span></div>'+
    '<div class="ao-ui-result"><span class="ao-ui-check">✓</span><strong>Verify test + receiving lab</strong></div>'+
    '<div class="ao-ui-outstanding"><span>OUTSTANDING ORDERS</span><div><span class="ao-ui-check">✓</span> Order added <em>Check signature status</em></div></div></div>';
 }
 const steps=[
  {title:'Open chart menu',tag:'CHART',desc:'In the patient chart, open the <strong>hamburger menu</strong> and select <strong>Create order group</strong>.'},
  {title:'Choose provider',tag:'ORDER GROUP',desc:'Select the <strong>ordering provider</strong>, then click <strong>+ Diagnoses & Orders</strong>.'},
  {title:'Add diagnosis',tag:'DIAGNOSIS',desc:'Search for and add the <strong>appropriate diagnosis</strong> before selecting the lab test.'},
  {title:'Set lab preference',tag:'PREFERENCES',desc:'Select <strong>Edit preferences</strong> → <strong>Lab orders</strong> → <strong>Set a preferred lab orders provider</strong>.'},
  {title:'Select receiving lab',tag:'RECEIVER',desc:'Check the <strong>location ZIP code</strong> and correct it if needed. Search for and select the appropriate <strong>lab and facility</strong>.'},
  {title:'Enter code and confirm',tag:'FINAL CHECK',desc:'Search by the <strong>exact lab test code</strong>. Confirm the test, reflex rules and performing lab. Verify the order in <strong>Outstanding Orders</strong> and check its signature status.'}
 ];
 function render(){
  return '<section class="ao-guide" id="athena-external-ordering" aria-labelledby="ao-guide-heading">'+
    '<header class="ao-guide-intro"><div class="ao-guide-intro-text"><span class="ao-guide-eyebrow">ATHENA / SEND-OUT ORDERING</span><h2 id="ao-guide-heading">How to order to an external lab</h2><p>Follow this sequence in Athena when placing an external laboratory order.</p></div><span class="ao-guide-role">Provider / ordering staff</span></header>'+
    '<div class="ao-guide-labs" aria-label="Supported receiving laboratories"><span class="ao-guide-labs-label">RECEIVING LAB</span><span>Quest Diagnostics</span><span>LabCorp</span><span>Cedars</span><span>HealthTrackRx</span><span>PathMD</span></div>'+
    '<div class="ao-guide-grid">'+steps.map(function(step,i){return '<article class="ao-guide-card"><header class="ao-guide-card-header"><span class="ao-guide-index">'+String(i+1).padStart(2,'0')+'</span><div class="ao-guide-card-heading"><span class="ao-guide-step-type">'+step.tag+'</span><h3>'+step.title+'</h3></div><span class="ao-guide-next" aria-hidden="true">'+(i===steps.length-1?'✓':'→')+'</span></header><div class="ao-guide-sketch" aria-hidden="true">'+mini(i+1)+'</div><p class="ao-guide-detail">'+step.desc+'</p></article>';}).join('')+'</div>'+
    '<div class="ao-guide-tips"><div class="ao-guide-tip ao-guide-tip-teal"><span class="ao-guide-tip-icon" aria-hidden="true">✓</span><div><strong>Use the exact test code</strong><p>Name searches may return a different panel, reflex algorithm, specimen requirement or performing laboratory. Compare the order details before selecting.</p></div></div><div class="ao-guide-tip ao-guide-tip-amber"><span class="ao-guide-tip-icon" aria-hidden="true">!</span><div><strong>Check order and signature status</strong><p>An order appearing in Outstanding Orders may still be <strong>unsigned</strong>. Follow the approved provider-signing workflow.</p></div></div></div>'+
    '<p class="ao-guide-footnote">Illustrations are simplified UI references, not live Athena screens. Available labs and menu labels may vary by clinic and account. Use current Sollis ordering procedures.</p></section>';
 }
 window.LAB_ATHENA_ORDER_GUIDE={render:render};
})();