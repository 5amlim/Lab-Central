/* Assay-specific QC overview, last reviewed October 2026.
   "Every X days" labels do not replace new lot, failed QC or site SOP requirements. */
(function(){
'use strict';
const cfg={
 triage:{label:'QC Device daily; liquid QC every 30 days',name:'QC',frequency:'QC Device daily · liquid QC every 30 days',detail:'Liquid QC also with new shipments or lots.',source:'https://www.quidelortho.com/content/dam/quidelortho/global/docs/Z2VQM2Y5XFDAVOE65B.pdf'},
 sysmex:{label:'External QC · 3 levels daily before patient testing',name:'External QC',frequency:'3 levels daily before patient testing',detail:'Also complete the daily shutdown and blank/background check; print and file QC and blank records per SOP.',source:'https://www.sysmex-ap.com/wp-content/uploads/2020/05/poch-100i-brochure_ebook.pdf'},
 pathfast:{label:'Calibration + QC every 28 days',name:'Calibration + QC',frequency:'Every 28 days',detail:'',source:''},
 piccolo:{label:'External QC · Every 30 days and per panel SOP',name:'External QC',frequency:'Every 30 days and per panel SOP',detail:'Also with new lots or shipments, as applicable.',source:'https://www.abaxis.com/faqs/'},
  clinitek:{label:'External QC · Monthly UA + hCG QC in SoCal',name:'External QC',frequency:'Monthly UA + hCG QC (SoCal)',detail:'NorCal, New York and Florida require daily UA and hCG external QC. Also perform controls for new strip bottles/lots and follow the approved market SOP.',source:'https://doclib.siemens-healthineers.com/rest/v1/view?document-id=778963'},
 sofia:{label:'Calibration every 30 days; external QC per new shipment/lot',name:'Calibration + QC',frequency:'Calibration every 30 days',detail:'External QC each new shipment/lot and for first-time operators, per IFU.',source:'https://quickstart.quidel.com/docs/setup/calibrate/'},
 torch:{label:'External QC · New lots/shipments and per approved IQCP',name:'External QC',frequency:'New lots/shipments and per approved IQCP',detail:'Follow the applicable GI panel and site procedure.',source:'https://www.biofiredx.com/support/faq/'},
 spotfire:{label:'External QC · New lots/shipments and per approved IQCP',name:'External QC',frequency:'New lots/shipments and per approved IQCP',detail:'Follow the selected assay and site procedure.',source:'https://www.biofiredx.com/support/faq/'},
 febridx:{label:'External QC · Every new shipment or lot',name:'External QC',frequency:'Every new shipment or lot',detail:'Positive and negative controls; also for first-time operators.',source:'https://lumosdiagnostics.com/tools'},
 hemocue:{label:'External QC · Liquid QC per SOP, including new shipments/lots',name:'External QC',frequency:'Liquid QC per SOP, including new shipments/lots',detail:'',source:'https://hemocue.com/us/products/hematology/hemocue-hb-201plus-system/'},
 coagsense:{label:'External QC · High + low controls with each new shipment/lot',name:'External QC',frequency:'High + low controls with each new shipment/lot',detail:'Additional QC per approved SOP.',source:'https://coag-sense.com/wp-content/uploads/2021/02/PN-200220-PT2-Professional-User-Manual-Rev-AD.pdf'},
 poc:{label:'External QC · Every new shipment or lot',name:'External QC',frequency:'Every new shipment or lot',detail:'Follow each rapid test kit IFU and site SOP.',source:'https://www.quidelortho.com/us/en/products/quickvue-rapid-lateral-flow-tests/quickvue-sars-antigen-test'},
 'drug-screen':{label:'External QC · Every new shipment or lot per site SOP',name:'External QC',frequency:'Every new shipment or lot per site SOP',detail:'Confirm the cup-specific control requirements.',source:'https://mms.mckesson.com/'}
};
function esc(x){return String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function row(id){const p=cfg[id];if(!p)return '';return '<div class="qc-overview-row"><dt>'+esc(p.name)+'</dt><dd><div class="qc-overview-summary"><strong>'+esc(p.frequency)+'</strong>'+(p.detail?'<span class="qc-overview-detail">'+esc(p.detail)+'</span>':'')+(p.source?'<a class="qc-overview-source" href="'+esc(p.source)+'" target="_blank" rel="noopener noreferrer">Manufacturer reference ↗</a>':'')+'</div></dd></div>';}
window.LAB_QC_OVERVIEW={cfg,row,ids:Object.keys(cfg)};
})();