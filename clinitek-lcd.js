/* CLINITEK Status+ 320x240 LCD, reconstructed from Siemens Operator's Guide
 Fig. 1-7, Operations, 2019 Quick Guide and Status Connect QC guide.
 No live results; configuration-dependent prompts shown as examples. */
(()=>{
'use strict';
const E=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let serial=0;
function lcd(mode,opts={}){
 const h=opts.kind==='hcg',qc=!!opts.qc,id='clLCD'+(++serial),blue='url(#'+id+'b)',focus=opts.focus||'';
 const r=(x,y,w,h,f,s='#56838b',rx=3)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+f+'" stroke="'+s+'"/>';
 const t=(x,y,v,size=12,anchor='start',color='#172b30',bold=false)=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" text-anchor="'+anchor+'" fill="'+color+'" font-weight="'+(bold?700:400)+'">'+E(v)+'</text>';
 const key=(x,y,w,h,labels,name='',active=false)=>r(x,y,w,h,blue,'#4b7d83',4)+(Array.isArray(labels)?labels:[labels]).map((v,i,all)=>t(x+w/2,y+h/2+5+(i-(all.length-1)/2)*15,v,13,'middle','#173d45',true)).join('')+((active||name&&focus===name)?r(x+1,y+1,w-2,h-2,'none','#bc7428',3).replace('/>',' stroke-width="2.5"/>'):'');
 const title=(name,sub='')=>r(0,0,320,29,'#36767e','none',0)+t(8,19,name,15,'start','#fff',true)+(sub?t(312,18,sub,10,'end','#fff'):t(312,18,'[ time / date ]',9,'end','#fff'));
 const foot=(labels)=>labels.map((v,i)=>key(8+i*104,205,96,29,v,v)).join('');
 const radio=(x,y,label)=>'<circle cx="'+x+'" cy="'+y+'" r="6" fill="#fff" stroke="#456b72"/>'+t(x+13,y+4,label,12);
 const assay=h?'Clinitest hCG cassette':'Multistix 10 SG';
 const ready=()=>title('Select Ready')+key(8,38,145,68,['Instrument','Set Up'],'setup')+key(167,38,145,68,['Recall','Results'],'recall')+
 (opts.lockout!==false?key(8,112,304,36,['QC Test'+(opts.due?' '+(h?'Cassette':'Strip')+' due':'')],'QC'): '')+
 key(8,opts.lockout!==false?154:115,145,opts.lockout!==false?76:115,['Cassette Test'],'cassette',focus==='cassette')+
 key(167,opts.lockout!==false?154:115,145,opts.lockout!==false?76:115,['Strip Test'],'strip',focus==='strip');
 let b='';
 switch(mode){
 case 'ready': b=ready();break;
 case 'qctype':b=title('QC Test')+t(160,54,'Select type of test',15,'middle')+key(20,72,280,55,['QC Strip Test'+(opts.due&&!h?' Required':'')],'strip')+key(20,137,280,55,['QC Cassette Test'+(opts.due&&h?' Required':'')],'cassette')+foot(['Back']);break;
 case 'type':b=title('Test Type')+key(21,63,278,69,['Clinitest hCG','cassette'],'cassette')+foot(['Back']);break;
 case 'lot':b=title(qc?'QC '+(opts.control?'Control':h?'Cassette':'Strip')+' Lot':h?'Cassette Lot':'Strip Lot')+t(160,54,opts.control?'[ control / level ]':assay,14,'middle')+key(20,70,280,54,['Use Last Lot'],'last')+key(20,135,280,54,['Enter new lot','and expiration'],'new')+foot(['Back']);break;
 case 'entry':b=title(opts.title||'QC Control Lot')+r(8,37,304,30,'#fff')+key(8,73,39,25,'123')+key(274,73,38,25,'X')+Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ-').map((v,i)=>key(8+i%8*39,103+Math.floor(i/8)*24,36,22,v)).join('')+key(222,205,90,29,'Enter','Enter');break;
 case 'expiry':b=title(opts.title||'QC Control Expiration')+['YY','MM','DD'].map((v,i)=>{const x=41+i*90;return key(x,66,70,32,'▲')+r(x,101,70,33,'#fff')+t(x+35,122,'--',19,'middle')+t(x+35,148,v,12,'middle')+key(x,156,70,32,'▼')}).join('')+foot(['Previous','','Enter']);break;
 case 'prepare':b=title('Prepare Test')+(qc?t(12,49,'QC',14,'start','#183a42',true):'')+t(12,qc?70:55,assay,16,'start','#172b30',true)+t(12,qc?95:85,'Touch START to begin',14)+ (qc?t(12,119,'Control: '+(h?'KOVA hCG':'Quantimetrix Dipper'),13)+t(12,141,'Level: '+(opts.level||'[ selected level ]'),13):'')+key(233,37,80,48,['Help','?'],'Help')+key(207,155,105,72,'START','START',true);break;
 case 'timer':b=title('Prepare Test')+(h?['1. Draw sample to pipette mark','2. Add sample to cassette well']:['1. Dip test strip in sample','2. Remove excess','3. Blot strip','4. Place on test table']).map((v,i)=>t(12,63+i*27,v,14)).join('')+r(97,174,126,49,'#fff')+t(160,206,'00:08',27,'middle','#203b43',true);break;
 case 'calibrating':b=title('Calibrating')+t(160,86,'Please wait',17,'middle')+t(160,137,'Clinitek Status+ is Calibrating',14,'middle');break;
 case 'analyzing':b=title('Analyzing')+t(160,77,'In progress',17,'middle')+r(95,111,130,58,'#fff')+t(160,150,'--:--',29,'middle','#203b43',true);break;
 case 'appearance':b=title('Select Appearance','Test in progress')+t(160,65,'Select Color and Clarity',15,'middle')+t(160,85,'of urine sample',14,'middle')+key(18,104,284,55,'Yellow and Clear','yellow')+key(18,170,284,55,'Other','other');break;
 case 'color':case 'clarity':{
 const color=mode==='color',labels=color?['Light Yellow','Yellow','Dark Yellow','Amber','Brown','Red','Orange','Pink','Green','Blue','Other']:['Clear','Slightly Cloudy','Cloudy','Turbid','Other'];
 b=title('Select Appearance','Test in progress')+t(12,48,color?'Select Color':'Select Clarity',14)+labels.map((v,i)=>radio(17+Math.floor(i/6)*155,67+i%6*21,v)).join('')+foot(['Back','','Next']);break;}
 case 'results':{
 const list=h?['Clinitest hCG','Test date','Time']:['Glucose','Bilirubin','Ketone','Specific Gravity','Blood','pH','Protein','Urobilinogen','Nitrite','Leukocytes'];
 b=title('Results',h?'':'1 of 2')+t(7,45,qc?'QC Test: [ status ]':'Patient: [ ID ]',12,'start','#203b43',true)+list.map((v,i)=>t(7,61+i*15,v,11)+t(226,61+i*15,'—',12,'end')).join('')+(!h?key(237,48,76,35,'More','More'):'')+(qc?key(237,88,76,40,['Add QC','notes'],'notes'):'')+key(237,155,76,34,'Print','Print')+key(237,198,76,34,'Done','Done');break;}
 case 'passfail':b=title('QC Test')+t(160,60,'Select PASS or FAIL',16,'middle')+key(19,78,282,51,'QC PASS','PASS')+key(19,140,282,51,'QC FAIL','FAIL')+foot(['','','Done']);break;
 case 'summary':b=title('QC Test')+t(160,53,'Results Summary',15,'middle')+t(12,82,'Level 1',13)+t(302,82,'[ status ]',13,'end')+t(12,108,'Level 2',13)+t(302,108,'[ status ]',13,'end')+key(25,146,270,39,'Repeat failed QC test','repeat')+foot(['','','Done']);break;
 case 'recall':b=title('Recall Options')+radio(18,70,'Recall Patient Tests or QC Tests')+radio(18,114,'Delete Records')+foot(['Done','','Select']);break;
 case 'recalltype':b=title('Recall Results')+t(12,53,'Choose which results to search',13)+radio(25,88,'Patient tests')+radio(25,128,'QC tests')+foot(['Previous','','Next']);break;
 case 'search':b=title('Recall Results')+key(20,49,280,48,'Search by date','date')+key(20,113,280,48,'View all results','all')+foot(['Previous']);break;
 default:return '';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="CLINITEK Status+ '+E(mode)+' training screen"><defs><linearGradient id="'+id+'b" x2="0" y2="1"><stop stop-color="#e9f7f7"/><stop offset="1" stop-color="#a7ced0"/></linearGradient></defs>'+r(.5,.5,319,239,'#cde2e3','#597e83',0)+b+'</svg>';
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