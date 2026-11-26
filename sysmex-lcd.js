/* pocH-100i screen reconstructions. Reference: Sysmex IFU 2.1, 3.2, 4;
   Sysmex basic user training (03/03/2020), published by EPUT NHS.
   Static, illustrative values only; firmware and configured options may vary. */
(() => {
'use strict';
const E=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let seq=0;
const text=(x,y,v,size=14,color='#35434f',anchor='start')=>'<text x="'+x+'" y="'+y+'" font-family="Arial, sans-serif" font-size="'+size+'" fill="'+color+'" text-anchor="'+anchor+'">'+E(v)+'</text>';
const rect=(x,y,w,h,fill,stroke='#8596a6',r=3)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'"/>';
function lcd(mode,focus='',item={}){
 const id='sxLCD'+(++seq), blue='url(#'+id+'b)',green='url(#'+id+'g)',orange='url(#'+id+'o)';
 const key=(x,y,w,h,v,f=false,fill=blue)=>rect(x,y,w,h,fill,'#70879f',4)+text(x+w/2,y+h/2+5,v,Math.min(13,w/Math.max(String(v).length,3)*1.55),'#263c50','middle')+(f?'<rect x="'+(x-2)+'" y="'+(y-2)+'" width="'+(w+4)+'" height="'+(h+4)+'" rx="5" fill="none" stroke="#bc6c20" stroke-width="2.5"/>':'');
 const k=(x,y,w,h,v,fill)=>key(x,y,w,h,v,focus===v,fill);
 const field=(x,y,w,v,f=false)=>rect(x,y,w,23,'#f8fafc',f?'#b86d25':'#758698',2)+text(x+w-6,y+16,v,14,'#3a4956','end');
 const top=(name,status='Not Ready',right='Top')=>text(10,24,'sysmex',15,'#438fbd')+
 rect(83,8,110,18,status==='Ready'?'#61c77b':status==='Running'||status==='Aspirating'?'#e4d16d':'#e49bd2','none',0)+text(138,21,status,13,'#283b3a','middle')+
 text(138,40,'[ '+name+' ]',12,'#465360','middle')+
 rect(206,8,10,25,'#dae8f3','#a1aab5',1)+rect(208,17,6,14,'#588bbb','none',0)+
 key(224,8,34,25,'▤')+k(322,8,68,27,right);
 const bottom=(labels)=>labels.map((v,i)=>k(8+i*(384/labels.length),266,384/labels.length-5,24,v)).join('');
 const main=(status='Ready',keypad=false)=>top('Main',status,'Menu')+
 text(15,69,'Sample ID')+field(15,75,167,'#####',focus==='Sample ID')+
 text(15,116,'Operator')+field(15,122,136,'—')+key(155,122,27,23,'→',false,green)+
 text(15,164,'Analysis Mode',13)+rect(15,171,168,79,'#b8bdc6','#88929d',1)+
 k(24,178,67,40,'WB',orange)+k(103,178,67,40,'PD','#f8fafc')+text(98,239,'Whole Blood',12,'#f9fafb','middle')+
 (keypad?['7','8','9','4','5','6','1','2','3','0','-','C'].map((v,i)=>key(210+(i%3)*56,55+Math.floor(i/3)*39,51,34,v,false,v==='C'?orange:blue)).join('')+key(210,211,80,34,'ALPH',false,green)+key(299,211,74,34,'Ent.',true):
 text(208,75,'Set a mixed sample,',13)+text(208,93,'and press [RUN].',13)+k(211,166,151,80,'RUN',green))+
 k(8,266,92,24,'QC')+k(104,266,94,24,'Result')+k(302,266,88,24,'Shutdown');
 const menu=()=>top('Menu')+['Str.Data','Chg.Reag','Maint.','Calib.','Settings','QC Chart'].map((v,i)=>{
 const x=42+(i%3)*115,y=53+Math.floor(i/3)*112;
 const icons=['▤','▣','⚒','▥','▧','∿'];
 return key(x,y,82,73,icons[i],focus===v,'#f1f3f5')+text(x+41,y+91,v,13,'#374553','middle');
 }).join('');
 const files=(chart=false)=>top(chart?'Set QC':'QC Analy')+text(48,60,'File')+text(153,60,'Lot ID')+text(302,60,'Expire')+
 Array.from({length:6},(_,i)=>{const y=68+i*36;return rect(18,y,364,31,blue,'#8293a6',4)+text(45,y+20,i+1,14)+text(91,y+20,'[               ]',14)+text(270,y+20,'[            ]',14)+(i===1?'<rect x="16" y="'+(y-2)+'" width="368" height="35" rx="5" fill="none" stroke="#bc6c20" stroke-width="2"/>':'');}).join('');
 const qcHead=()=>text(12,60,'File [2]')+text(12,79,'Lot ID  [             ]')+text(12,98,'Expire  [             ]');
 const resultRows=(qc=false)=>text(14,83,qc?'Parameter':'Parameter',12)+text(148,83,'Data',12)+text(260,83,qc?'Judgment':'Unit',12)+
 ['WBC','RBC','HGB','HCT','MCV'].map((v,i)=>{const y=108+i*28;return text(15,y,v)+text(179,y,'—',14,'#35434f','end')+text(278,y,qc?'—':['10³/µL','10⁶/µL','g/dL','%','fL'][i],12)+ '<path d="M12 '+(y+6)+'H383" stroke="#bbc5ce" stroke-width=".7"/>';}).join('');
 const setup=()=>top('Set QC')+text(12,63,'File [1]')+text(12,100,'Lot ID')+field(111,83,265,'[                 ]',true)+text(12,145,'Expire')+field(111,128,265,'[                 ]',true)+text(15,190,'Select Input parameters.',13)+bottom(['Clear','→','Print','Setup']);
 const targets=()=>top('Set QC')+text(12,61,'File [1]')+text(140,84,'TARGET',12)+text(238,84,'LIMIT',12)+['WBC','RBC','HGB','HCT','MCV'].map((v,i)=>{let y=92+i*30;return text(12,y+16,v)+field(109,y,82,'—')+field(205,y,82,'—')+text(300,y+16,['10³/µL','10⁶/µL','g/dL','%','fL'][i],11);}).join('')+bottom(['A.tgt','A.lmt','←','→','Save']);
 const chart=()=>top('Set QC')+text(10,59,'File [1]  [            ]  [            ]',13)+text(24,78,'[ selected date / time ]',12)+text(294,99,'LIMIT',12)+['WBC','RBC'].map((v,i)=>{const y=118+i*68;return text(8,y+22,v,12)+text(44,y,'UL',10)+text(44,y+40,'LL',10)+'<path d="M65 '+y+'H290M65 '+(y+20)+'H290M65 '+(y+40)+'H290" stroke="#bb85ad" stroke-width=".9" stroke-dasharray="3 2"/>'+text(315,y+8,'—',12)+text(315,y+26,'—',12)+text(315,y+44,'—',12);}).join('')+bottom(['Print','HC','Delete','File','Setup']);
 const stored=()=>top('Str.Data')+text(13,57,'Sample ID',12)+text(230,57,'Date / Time',12)+Array.from({length:6},(_,i)=>{let y=66+i*29;return rect(10,y,366,25,i===0?'#b9d6f0':'#eef0f3','#a2aeb8',1)+text(15,y+17,i===0?'BLANK CHECK':'—',12)+text(226,y+17,i===0?'[ actual date ]':'—',11);}).join('')+bottom(['Print','←','→','Detail']);
 const prompt=(title,lines,buttons)=>top(title)+rect(35,83,330,135,'#e5e9ee','#7c8e9f',3)+lines.map((v,i)=>text(200,110+i*22,v,13,'#344450','middle')).join('')+buttons.map((v,i)=>k(53+i*101,177,94,30,v)).join('');
 // The startup sequence uses [Start up], Running, Menu, and the
 // named rinse/background messages (Sysmex Basic User Training, slide 28).
 const startupPhase=(label,step)=>top('Start up','Running','Menu')+
 text(200,112,'<  '+label+'  >',16,'#35434f','middle')+
 text(200,149,'Please wait.',15,'#35434f','middle')+
 Array.from({length:8},(_,i)=>'<path d="M'+(51+i*40)+' 245l13 11-13 11z" stroke="#647b90" stroke-width="1.2" fill="'+(i<step?'#6a8397':'none')+'"/>').join('');
 const progress=(title,status='Running')=>top(title,status)+text(200,127,status==='Running'?'Analysis in progress':'Please wait',16,'#35434f','middle')+Array.from({length:9},(_,i)=>text(42+i*37,233,'▶',20,i<5?'#418fc1':'#a9b7c3','middle')).join('');
 let body='';
 switch(mode){
 case 'main': body=main();break;
 case 'mrn':body=main('Not Ready',true);break;
 case 'menu':body=menu();break;
 case 'files':body=files();break;
 case 'chartfiles':body=files(true);break;
 case 'qcrun':body=top('QC Analy','Ready')+qcHead()+text(211,66,'Place control blood',12)+text(211,82,'in tube adapter and',12)+text(211,98,'close sample position.',12)+text(211,114,'Press [Run].',12)+k(226,158,143,74,'Run',green)+bottom(['Print','Settings']);break;
 case 'qcrunning':body=progress('QC Analy');break;
 case 'running':body=progress('Main');break;
 case 'qcresult':body=top('QC Analy','Ready')+text(12,60,'File [2]   Lot [             ]',12)+resultRows(true)+bottom(['Print','Back','←','→','Quit']);break;
 case 'result':body=top('Result','Ready')+text(12,60,'Sample ID [#####]',12)+resultRows()+bottom(['Print','←','→','Back']);break;
 case 'blankresult':body=top('Str.Data')+text(12,60,'BLANK CHECK  [ actual date ]',12)+resultRows()+bottom(['Print','←','→','Back']);break;
 case 'chart':body=chart();break;
 case 'lot':body=setup();break;
 case 'targets':body=targets();break;
 case 'stored':body=stored();break;
 case 'print':body=prompt('Set QC',['Print selected QC data?'],['Current','Chart','Cancel']);break;
 case 'save':body=prompt('Set QC',['Quit QC Setting?'],['OK','Cancel']);break;
 case 'shutdown':body=prompt('Shutdown',['Shutdown'],['Execute','Cancel']);break;
 case 'complete':body=prompt('Shutdown',['Shutdown complete.','Follow the completion prompt.'],[]);break;
 case 'startup':case 'autorinse':body=startupPhase('Auto Rinse',3);break;
 case 'background':body=startupPhase('Background check',5);break;
 case 'ready':body=main('Ready');break;
 case 'maintenance':body=top('Maint.')+['Clean Transducer','Auto Rinse','Clean Waste Chamber','Clog Removal'].map((v,i)=>k(32,58+i*50,336,40,v)).join('');break;
 case 'reagent':body=top('Chg.Reag')+k(24,68,168,116,'pocH-pack D')+k(208,68,168,116,'pocH-pack L')+bottom(['Back','Top']);break;
 case 'barcode':body=prompt('Chg.Reag',['Reagent barcode','[                         ]'],['Manual','OK','Cancel']);break;
 case 'execute':body=prompt(item.screen||'Maint.',['Follow the displayed prompt.'],['Execute','Cancel']);break;
 default:return '';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 424 324" role="img" aria-label="pocH-100i '+E(mode)+' training screen, illustrative values"><defs>'+[['b','#f7f9fc','#a0b8d8'],['g','#d5f8e7','#59b9a9'],['o','#f2c1ac','#df846d']].map(([n,a,b])=>'<linearGradient id="'+id+n+'" x2="0" y2="1"><stop stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient>').join('')+'</defs>'+rect(0,0,424,324,'#d4d7d3','#b3b9ba',9)+rect(8,8,408,308,'#26343a','#879292',3)+'<g transform="translate(12 12)">'+rect(0,0,400,300,'#e9edf2','#627485',1)+body+'</g></svg>';
}
function fromItem(item){
 const s=String(item.screen||'').toLowerCase(),h=String(item.heading||'').toLowerCase(),f=item.focus||'',k=item.kind||'';
 if(k==='pochPhysical')return '';
 const kinds={pochQcMain:['main','QC'],pochAnalyzeFiles:['files',''],pochAnalyzeRun:['qcrun','Run'],pochAnalyzeRunning:['qcrunning',''],pochAnalyzeResults:['qcresult','Quit'],qcFiles:['chartfiles',''],qcLot:['lot',''],qcAnalytes:['targets','']};
 if(kinds[k])return lcd(...kinds[k]);
 if(k==='mainMenu')return lcd('main','Menu');
 if(k==='status'){
  if(/ready for qc|ready screen|confirm ready/.test(s+' '+h))return lcd('ready');
  if(/blank|background/.test(s+' '+h))return lcd('background');
  if(/rinse|initializ|power on/.test(s+' '+h))return lcd('autorinse');
  return '';
 }
 if(/shutdown complete/.test(s+h))return lcd('complete');
 if(/shutdown/.test(s+h))return lcd(s==='main'?'main':'shutdown',s==='main'?'Shutdown':'Execute');
 if(/blank check result|blank-check result/.test(s+h))return lcd('blankresult','Print');
 if(/stored data|today.s blank/.test(s))return lcd('stored');
 if(/quality control chart|qc chart/.test(s))return lcd('chart',f);
 if(/print confirmation/.test(s))return lcd('print','Current');
 if(/save confirmation/.test(s))return lcd('save','OK');
 if(/set qc/.test(s))return lcd('targets',f);
 if(/barcode/.test(s))return lcd('barcode',f);
 if(/chg\. reag|chg\.reag/.test(s)&&/choose/.test(h))return lcd('reagent',f);
 if(/menu/.test(s))return lcd('menu',/^(QC|QC Chart)$/.test(f)?'QC Chart':f==='Str. Data'?'Str.Data':f==='Chg. Reag.'?'Chg.Reag':f);
 if(/maintenance/.test(s))return lcd('maintenance',f);
 if(/execute/i.test(f))return lcd('execute','Execute',item);
 if(k==='pochStatus')return /rinse|background/i.test(item.title||'')?lcd('background'):'';
 return '';
}
window.LAB_SYSMEX_LCD={lcd,fromItem};
})();
