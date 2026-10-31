/* Assay-specific QC overview, last reviewed October 2026.
   "Every X days" labels do not replace new lot, failed QC or site SOP requirements. */
(function(){
'use strict';
const cfg={
 triage:{label:'QC Device daily · liquid QC every 30 days',name:'QC',frequency:'QC Device daily · liquid QC every 30 days',detail:'Liquid QC also with new lots or shipments.',source:'https://www.quidelortho.com/content/dam/quidelortho/global/docs/Z2VQM2Y5XFDAVOE65B.pdf'},
 sysmex:{label:'Daily 3-level QC + blank check',name:'QC & background',frequency:'Daily: 3-level QC + blank check',detail:'Print and file QC and blank results.',source:'https://www.sysmex-ap.com/wp-content/uploads/2020/05/poch-100i-brochure_ebook.pdf'},
 pathfast:{label:'Calibration + QC every 28 days',name:'Calibration + QC',frequency:'Every 28 days',detail:'',source:''},
 piccolo:{label:'External QC monthly · per panel SOP',name:'QC',frequency:'External QC monthly · per panel SOP',detail:'Also with new lots or indicated changes. Internal iQC each run.',source:'https://www.abaxis.com/faqs/'},
 clinitek:{label:'Monthly UA/hCG QC + new bottle checks',name:'QC',frequency:'Monthly UA + hCG QC',detail:'Check strip controls for new bottles and as indicated.',source:'https://doclib.siemens-healthineers.com/rest/v1/view?document-id=778963'},
 sofia:{label:'Calibration every 30 days + lot/shipment QC',name:'Calibration & QC',frequency:'Calibration every 30 days',detail:'External QC with each new shipment or lot.',source:'https://quickstart.quidel.com/docs/setup/calibrate/'},
 torch:{label:'Internal controls each run · external QC per IQCP',name:'QC',frequency:'Internal controls every run',detail:'External QC per IQCP and new lot/shipment procedure.',source:'https://www.biofiredx.com/support/faq/'},
 spotfire:{label:'Internal controls each run · external QC per IQCP',name:'QC',frequency:'Internal controls every run',detail:'External QC per IQCP and new lot/shipment procedure.',source:'https://www.biofiredx.com/support/faq/'},
 febridx:{label:'Control line each test · external QC per SOP',name:'QC',frequency:'Control line each test',detail:'External QC per assay IFU and SOP.',source:'https://www.febridx.com/documents/2025/08/_PM-127.3_FebriDx%20Instructions%20for%20Use_US_07-15-2025.pdf'},
 hemocue:{label:'Self-test at startup · liquid QC per SOP',name:'QC',frequency:'Self-test at startup',detail:'Liquid QC per approved SOP.',source:'https://hemocue.com/us/products/hematology/hemocue-hb-201plus-system/'},
 coagsense:{label:'Control QC for new shipments/lots',name:'QC',frequency:'High + low QC with each new lot/shipment',detail:'Additional QC per approved SOP.',source:'https://coag-sense.com/wp-content/uploads/2021/02/PN-200220-PT2-Professional-User-Manual-Rev-AD.pdf'},
 poc:{label:'Built-in control each test · external QC per IFU',name:'QC',frequency:'Built-in control every test',detail:'External QC by kit, lot/shipment and SOP.',source:'https://www.quidelortho.com/us/en/products/quickvue-rapid-lateral-flow-tests/quickvue-sars-antigen-test'},
 'drug-screen':{label:'Control each cup · external QC per SOP',name:'QC',frequency:'Control line on each cup',detail:'External QC per product IFU and SOP.',source:'https://mms.mckesson.com/'}
};
function esc(x){return String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function row(id){const p=cfg[id];if(!p)return '';return '<div class="qc-overview-row"><dt>'+esc(p.name)+'</dt><dd><div class="qc-overview-summary"><strong>'+esc(p.frequency)+'</strong>'+(p.source?'<a class="qc-overview-source" href="'+esc(p.source)+'" target="_blank" rel="noopener noreferrer">Manufacturer reference ↗</a>':'')+'</div>'+(p.detail?'<span class="qc-overview-detail">'+esc(p.detail)+'</span>':'')+'</dd></div>';}
window.LAB_QC_OVERVIEW={cfg,row,ids:Object.keys(cfg)};
})();