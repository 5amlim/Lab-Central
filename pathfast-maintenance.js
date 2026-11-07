/* PATHFAST weekly and monthly maintenance reference. Uses the original controlled Attachment K. */
(function(){
'use strict';
const log='assets/lab-templates/PATHFAST-Operational-and-Maintenance-Schedule.pdf';
function logButton(label){
 return '<a class="pfm-log-button" href="'+log+'" target="_blank" rel="noopener noreferrer"><span class="pfm-log-icon" aria-hidden="true">&#128196;</span><span>'+label+'</span><span aria-hidden="true">&#8599;</span></a>';
}
function list(items){
 return '<ol class="pfm-list">'+items.map(function(label,i){
  return '<li><span class="pfm-count">'+String(i+1).padStart(2,'0')+'</span><span>'+label+'</span></li>';
 }).join('')+'</ol>';
}
function render(){
 return '<section class="pfm-page" aria-label="PATHFAST weekly and monthly maintenance">'+
  '<header class="pfm-header"><div><span class="pfm-overline">PATHFAST / ROUTINE MAINTENANCE</span><h2>Weekly &amp; monthly maintenance</h2><p>Complete the scheduled checks for the installed analyzer and record them on the original operational and maintenance log.</p></div><span class="pfm-role">Lab personnel</span></header>'+
  '<div class="pfm-grid">'+
   '<section class="pfm-card"><div class="pfm-card-top"><span class="pfm-frequency">Every week</span><h3>Weekly maintenance</h3><p>Three scheduled checks</p></div>'+list(['Replace the tip waste box','Clean the reagent cartridge rack','Clean the stage surface'])+'</section>'+
   '<section class="pfm-card"><div class="pfm-card-top"><span class="pfm-frequency">Every month</span><h3>Monthly maintenance</h3><p>Three scheduled checks</p></div>'+list(['Clean the outside of the instrument','Clean the piercing nozzle edges','Clean the tip holder'])+'</section>'+
  '</div>'+
  '<section class="pfm-misc"><div><span class="pfm-misc-label">MISCELLANEOUS / WHEN APPLICABLE</span><h3>Additional items recorded on the same log</h3></div><ul><li>Replace printer paper</li><li>Self-check</li></ul></section>'+
  '<section class="pfm-document"><div><span class="pfm-document-label">DOCUMENTATION</span><h3>Document completion in this log</h3><p>Use the original <strong>PATHFAST Operational &amp; Maintenance Schedule</strong> (SOP-0523 Rev 02, Attachment K). Enter the instrument serial number, month/year, and date/initials, then record each completed task in its corresponding column.</p><p class="pfm-document-note">Follow the approved PATHFAST SOP and manufacturer instructions for cleaning technique and safety precautions. This page is a reference, not a substitute for the signed log.</p></div>'+logButton('Open original maintenance log (PDF)')+'</section>'+
 '</section>';
}
function logLink(){
 return '<div class="pfm-quicklink"><div><strong>Weekly / monthly maintenance log</strong><span>Document routine PATHFAST cleaning and maintenance on the original Attachment K.</span></div>'+logButton('Open maintenance log (PDF)')+'</div>';
}
window.LAB_PATHFAST_MAINT={render:render,logLink:logLink};
})();