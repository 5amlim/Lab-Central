/* CLINITEK Status+ 320x240 LCD, reconstructed from Siemens Operator's Guide
 Fig. 1-7, Operations, 2019 Quick Guide and Status Connect QC guide.
 No live results; configuration-dependent prompts shown as examples. */
(()=>{
'use strict';
const E=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let serial=0;
function lcd(mode,opts={}){
 const h=opts.kind==='hcg',qc=!!opts.qc,id='clLCD'+(++serial),blue='#c2e8e7',focus=opts.focus||'';
 const r=(x,y,w,h,f,s='#56838b',rx=3)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+f+'" stroke="'+s+'"/>';
 const t=(x,y,v,size=12,anchor='start',color='#172b30',bold=false)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" text-anchor="'+anchor+'" fill="'+color+'" font-weight="'+(bold?700:400)+'">'+E(v)+'</text>';
 const edge=(x,y,w,h,selected=false)=>'<path d="M'+(x+6)+' '+y+'H'+(x+w-6)+'L'+(x+w)+' '+(y+6)+'V'+(y+h-6)+'L'+(x+w-6)+' '+(y+h)+'H'+(x+6)+'L'+x+' '+(y+h-6)+'V'+(y+6)+'Z" fill="'+blue+'" stroke="#20494a" stroke-width="'+(selected?2.5:1.3)+'"/><path d="M'+(x+6)+' '+(y+2)+'H'+(x+w-6)+'M'+(x+2)+' '+(y+6)+'V'+(y+h-6)+'" fill="none" stroke="#f0ffff" stroke-width="1"/>';
 const key=(x,y,w,h,labels,name='',active=false)=>edge(x,y,w,h,active||!!name&&focus===name)+(Array.isArray(labels)?labels:[labels]).map((v,i,all)=>t(x+w/2,y+h/2+5+(i-(all.length-1)/2)*15,v,13,'middle','#163b3c',true)).join('')+((active||name&&focus===name)?r(x+3,y+3,w-6,h-6,'none','#245455',2).replace('/>',' stroke-width="1.5" stroke-dasharray="3 2"/>'):'');
 const title=(name,sub='')=>'<path d="M40 0H320V37H46L40 31Z" fill="#173d3e"/>'+t(49,16,name,15,'start','#e0f4f3',true)+t(310,14,'10:24 AM',10,'end','#e0f4f3')+t(310,28,'11-25-2026',10,'end','#e0f4f3')+(sub?t(49,31,sub,10,'start','#e0f4f3'):'');
 const glyph=(name,x,y)=>'<g transform="translate('+x+' '+y+')" fill="none" stroke="#173d3e" stroke-width="2.6" stroke-linejoin="round">'+({setup:'<rect x="0" y="0" width="22" height="15"/><path d="M4 4h14v7H4zM8 19h8M11 15v4"/>',recall:'<path d="M0 5h8l3-4h13v19H0zM3 8h20"/>',cassette:'<path d="M0 12Q0 0 13 0Q26 0 26 12V64H0Z"/><rect x="6" y="13" width="14" height="26"/><path d="M6 22h14M6 30h14"/><circle cx="13" cy="52" r="4"/>',strip:'<rect x="0" y="0" width="10" height="64"/>'+Array.from({length:7},(_,i)=>'<path d="M0 '+(5+i*6)+'h12"/>').join(''),qc:'<path d="M3 1h14M6 1v5l-3 3v15h14V9l-3-3V1M6 14h8"/>'}[name]||'')+'</g>';
 const foot=(labels)=>labels.map((v,i)=>v?key(3+i*105,207,101,30,v==='Previous'?'◀ Previous':v==='Next'?'Next ▶':v,v):'').join('');
 const radio=(x,y,label)=>'<circle cx="'+x+'" cy="'+y+'" r="6" fill="#c2e8e7" stroke="#20494a" stroke-width="1.5"/>'+t(x+13,y+4,label,12);
 const assay=h?'Clinitest hCG cassette':'Multistix 10 SG';
 const ready=()=>{
 const enabled=opts.lockout!==false, top=enabled?115:121, ht=236-top;
 const due=opts.due?('QC '+(h?'Cassette':'Strip')+' Test due'):'';
 const tile=(x,y,w,hh,label,name,icon,ix,iy)=>edge(x,y,w,hh,focus===name)+t(x+8,y+17,label,13,'start','#173d3e',true)+glyph(icon,ix,iy);
 return title('Select Ready')+
 tile(2,42,156,36,'Instrument Set Up','setup','setup',129,50)+
 tile(162,42,156,36,'Recall Results','recall','recall',289,50)+
 (enabled?edge(162,81,156,31,focus==='QC')+t(170,100,due||'QC Test',12,'start','#173d3e',true)+glyph('qc',294,84):'')+
 edge(2,top,156,ht,focus==='cassette')+t(80,top+20,'Cassette Test',14,'middle','#173d3e',true)+glyph('cassette',67,top+42)+
 edge(162,top,156,ht,focus==='strip')+t(240,top+20,'Strip Test',14,'middle','#173d3e',true)+glyph('strip',235,top+42);
 };
 let b='';
 switch(mode){
 case 'ready': b=ready();break;
 case 'qctype':b=title('QC Test')+glyph('qc',10,5)+t(8,62,'Select type of test',14)+key(162,42,156,92,'QC Strip Test','strip')+key(162,138,156,98,'QC Cassette Test','cassette')+foot(['Previous']);break;
 case 'type':b=title('Test Type')+glyph('cassette',8,4).replace('translate(8 4)','translate(12 4) scale(.42)')+key(162,42,156,194,['Clinitest hCG','cassette'],'cassette')+foot(['Previous']);break;
 case 'lot':b=title(qc?'QC '+(opts.control?'Control':h?'Cassette':'Strip')+' Lot':h?'Cassette Lot':'Strip Lot')+t(160,54,opts.control?'[ control / level ]':assay,14,'middle')+key(20,70,280,54,['Use Last Lot'],'last')+key(20,135,280,54,['Enter new lot','and expiration'],'new')+foot(['Back']);break;
 case 'entry':b=title(opts.title||'QC Control Lot')+r(8,37,304,30,'#fff')+key(8,73,39,25,'123')+key(274,73,38,25,'X')+Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ-').map((v,i)=>key(8+i%8*39,103+Math.floor(i/8)*24,36,22,v)).join('')+key(222,205,90,29,'Enter','Enter');break;
 case 'expiry':b=title(opts.title||'QC Control Expiration')+['YY','MM','DD'].map((v,i)=>{const x=41+i*90;return key(x,66,70,32,'▲')+r(x,101,70,33,'#fff')+t(x+35,122,'--',19,'middle')+t(x+35,148,v,12,'middle')+key(x,156,70,32,'▼')}).join('')+foot(['Previous','','Enter']);break;
 case 'prepare':b=title('Prepare Test')+(qc?t(12,49,'QC',14,'start','#183a42',true):'')+t(8,qc?70:55,assay,h?12:14,'start','#172b30',true)+t(8,qc?95:85,'Touch START to',13)+t(8,qc?110:100,'begin',13)+ (qc?t(8,139,'Control:',12)+t(8,155,h?'hCG control':'Quantimetrix Dipper',12)+t(8,176,'Level:',12)+t(8,192,opts.level||'[selected level]',12):'')+key(162,42,156,36,'Help   ?','Help')+key(162,81,156,155,'START','START',true);break;
 case 'timer':b=title('Prepare Test')+(h?['1. Draw sample to pipette mark','2. Add sample to cassette well']:['1. Dip test strip in sample','2. Remove excess','3. Blot strip','4. Place on test table']).map((v,i)=>t(12,63+i*27,v,14)).join('')+t(160,220,'00:08',27,'middle','#173d3e',true);break;
 case 'calibrating':b=title('Calibrating')+t(160,86,'Please wait',17,'middle')+t(160,137,'Clinitek Status+ is Calibrating',14,'middle');break;
 case 'analyzing':b=title('Analyzing')+t(160,77,'In progress',17,'middle')+t(160,151,h?'--:--':'00:43',29,'middle','#173d3e',true);break;
 case 'appearance':b=title('Select Appearance','Test in progress')+t(160,65,'Select Color and Clarity',15,'middle')+t(160,85,'of urine sample',14,'middle')+key(18,104,284,55,'Yellow and Clear','yellow')+key(18,170,284,55,'Other','other');break;
 case 'color':case 'clarity':{
 const color=mode==='color',labels=color?['Light Yellow','Yellow','Dark Yellow','Amber','Brown','Red','Orange','Pink','Green','Blue','Other']:['Clear','Slightly Cloudy','Cloudy','Turbid','Other'];
 b=title('Select Appearance','Test in progress')+t(12,48,color?'Select Color':'Select Clarity',14)+labels.map((v,i)=>radio(17+Math.floor(i/6)*155,67+i%6*21,v)).join('')+foot(['Back','','Next']);break;}
 case 'results':{
 const list=h?['Clinitest hCG','Test date','Time']:['Glucose','Bilirubin','Ketone','Specific Gravity','Blood','pH','Protein','Urobilinogen','Nitrite','Leukocytes'];
 b=title(qc?'QC Results':'Results',h?'':'1 of 2')+t(7,50,qc?'QC Test: [status]':'Patient: [ID]',12,'start','#203b43',true)+list.map((v,i)=>t(7,67+i*15,v,11)+t(226,67+i*15,'······',11,'end')).join('')+(!h?key(237,48,76,35,'More','More'):'')+(qc?key(237,88,76,40,['Add QC','notes'],'notes'):'')+key(237,155,76,34,'Print','Print')+key(237,198,76,34,'Done','Done');break;}
 case 'passfail':b=title('QC Test')+t(160,60,'Select PASS or FAIL',16,'middle')+key(19,78,282,51,'QC PASS','PASS')+key(19,140,282,51,'QC FAIL','FAIL')+foot(['','','Done']);break;
 case 'summary':b=title('QC Test')+t(160,53,'Results Summary',15,'middle')+t(12,82,'Level 1',13)+t(302,82,'[ status ]',13,'end')+t(12,108,'Level 2',13)+t(302,108,'[ status ]',13,'end')+key(25,146,270,39,'Repeat failed QC test','repeat')+foot(['','','Done']);break;
 case 'recall':b=title('Recall Options')+radio(18,70,'Recall Patient Tests or QC Tests')+radio(18,114,'Delete Records')+foot(['Done','','Select']);break;
 case 'recalltype':b=title('Recall Results')+t(12,53,'Choose which results to search',13)+radio(25,88,'Patient tests')+radio(25,128,'QC tests')+foot(['Previous','','Next']);break;
 case 'search':b=title('Recall Results')+key(20,49,280,48,'Search by date','date')+key(20,113,280,48,'View all results','all')+foot(['Previous']);break;
 default:return '';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="CLINITEK Status+ '+E(mode)+' training screen"><defs><linearGradient id="'+id+'b" x2="0" y2="1"><stop stop-color="#e9f7f7"/><stop offset="1" stop-color="#a7ced0"/></linearGradient></defs>'+r(.5,.5,319,239,'#c2e8e7','#20494a',0)+b+'</svg>';
}
function fromItem(item){
 const s=(item.screen||'').toLowerCase(),f=(item.focus||'').toLowerCase(),kind=item.kind==='hcg'?'hcg':'ua',opts={kind,qc:true,focus:f};
 if(s==='select ready')return lcd('ready',{...opts,focus:f.includes('recall')?'recall':'QC'});
 if(s==='recall options')return lcd('recall',opts);
 if(s==='recall results')return lcd('recalltype',opts);
 if(s==='search results')return lcd('search',opts);
 if(s.includes('stored result'))return lcd('results',opts);
 return '';
}
window.LAB_CLINITEK_LCD={lcd,fromItem};
})();