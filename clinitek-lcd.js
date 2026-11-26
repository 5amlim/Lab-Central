/* CLINITEK Status+ LCD. Reference: Siemens Status+ Operator Guide fig. 1-7,
 Siemens Academy CLINITEK Status Quick Guide (2019), slides 13–49,
 Siemens CLINITEST hCG Proper Testing Technique, steps 1, 4, 7.
 Reconstructed monochrome 320 x 240 display; illustrative values only. */
(()=>{
'use strict';
const E=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let serial=0;
function lcd(mode,opts={}){
 const h=opts.kind==='hcg',qc=!!opts.qc,id='clLCD'+(++serial),ink='#143a39',bg='#c3e4e2',focus=opts.focus||'';
 const rect=(x,y,w,ht,fill=bg,stroke=ink,rx=0)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+ht+'" rx="'+rx+'" fill="'+fill+'" stroke="'+stroke+'"/>';
 const text=(x,y,v,size=13,anchor='start',color=ink,bold=true)=>'<text x="'+x+'" y="'+y+'" font-family="Tahoma,Arial,sans-serif" font-size="'+size+'" text-anchor="'+anchor+'" fill="'+color+'" font-weight="'+(bold?700:400)+'" letter-spacing=".12">'+E(v)+'</text>';
 const lines=(x,y,items,size=13,dy=15,anchor='start',color=ink,bold=true)=>items.map((v,i)=>text(x,y+i*dy,v,size,anchor,color,bold)).join('');
 const arrow=(x,y,dir='right',scale=1)=>'<g transform="translate('+x+' '+y+') scale('+scale+') '+(dir==='left'?'rotate(180)':'')+'"><path d="M-8 -6H0V-14L12 0 0 14V6H-8Z" fill="'+ink+'"/></g>';
 const glyph=(name,x,y,scale=1)=>'<g transform="translate('+x+' '+y+') scale('+scale+')" fill="none" stroke="'+ink+'" stroke-width="2.2" stroke-linejoin="miter">'+({
  setup:'<path d="M0 0H25V22H0Z M4 4H21V14H4Z M15 17H21V20H15Z M12 22V25H18"/>',
  recall:'<path d="M2 5H8L11 1H23V5H27V21H2Z M0 7H23V23H0Z"/>',
  cassette:'<path d="M0 15A13 13 0 0 1 26 15V67H0Z M6 13H20V42H6Z M6 22H20 M6 31H20"/><circle cx="13" cy="55" r="5"/>',
  strip:'<path d="M0 0H10V69H0Z M0 3H10 M0 9H12 M0 16H12 M0 23H12 M0 30H12 M0 37H12 M0 44H12"/>',
  qc:'<circle cx="13" cy="13" r="13" fill="'+ink+'"/><text x="13" y="17" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="'+bg+'" stroke="none">QC</text>',
  print:'<path d="M4 0H17V14H4Z M7 3H14 M7 6H14 M7 9H14 M1 8H0V19H21V8H18"/>',
  help:'<text x="10" y="20" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" fill="'+ink+'" stroke="none">?</text>'
 }[name]||'')+'</g>';
 const edge=(x,y,w,ht,active=false)=>rect(x+.5,y+.5,w-1,ht-1,bg,ink,Math.min(9,ht/4))+'<rect x="'+(x+2)+'" y="'+(y+2)+'" width="'+(w-4)+'" height="'+(ht-4)+'" rx="'+Math.min(7,ht/4)+'" fill="none" stroke="'+ink+'" stroke-opacity=".65" stroke-dasharray="1 1" stroke-width="1"/>'+(active?'<rect x="'+(x+4)+'" y="'+(y+4)+'" width="'+(w-8)+'" height="'+(ht-8)+'" rx="5" fill="none" stroke="'+ink+'" stroke-width="1.2"/>':'');
 const button=(x,y,w,ht,label,name='',opt={})=>{
  const ls=Array.isArray(label)?label:[label], center=opt.center,sz=opt.size||14;
  return edge(x,y,w,ht,!!name&&focus===name)+lines(center?x+w/2:x+7,center?y+ht/2+5-(ls.length-1)*8:y+16,ls,sz,16,center?'middle':'start')+
  (opt.icon?glyph(opt.icon,x+w-32,y+6,opt.icon==='qc'?.82:.83):'')+
  (opt.arrow?arrow(x+w-17,y+ht-19,opt.arrow,.75):'');
 };
 const back=(label='')=>edge(2,199,label?100:38,39)+(label?text(12,216,label,13):'')+arrow(label?20:20,227,'left',.72);
 const next=(label='Next')=>button(218,199,100,39,label,label,{arrow:'right'});
 const title=(name,sub='',page='',icon=qc?'qc':h?'cassette':'strip')=>{
  const home=name==='Select';
  return '<path d="M40 0H320V39H47Q40 39 40 31Z" fill="'+ink+'"/>'+
   text(48,20,name,19,'start',bg)+ (sub?text(48,34,sub,12,'start',bg):'')+
   (page?text(311,34,page,11,'end',bg):'')+
   (home?'':glyph(icon,icon==='strip'?16:9,5,icon==='strip'?.41:icon==='cassette'?.46:1));
 };
 const radio=(x,y,label,on=false)=>'<circle cx="'+x+'" cy="'+y+'" r="6" fill="'+bg+'" stroke="'+ink+'" stroke-width="1.6"/>'+(on?'<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+ink+'"/>':'')+text(x+11,y+4,label,12);
 const assay=h?'Clinitest® hCG':'Multistix® 10 SG';
 const ready=()=>{
  const due=opts.due?['QC Test',h?'Cassette due':'Strip due']:['QC Test'];
  return title('Select','Ready','10:24AM  11-25-2026','')+
   button(2,42,156,37,['Instrument','Set Up'],'setup',{icon:'setup',size:14})+
   button(161,42,157,37,'Recall Results','recall',{icon:'recall',size:14})+
   (opts.lockout!==false?button(2,82,156,40,due,'QC',{icon:'qc',size:13}):'')+
   button(2,123,156,115,'Cassette Test','cassette',{size:15})+glyph('cassette',67,160,1)+
   button(161,123,157,115,'Strip Test','strip',{size:15})+glyph('strip',235,158,1);
 };
 let b='';
 switch(mode){
 case 'ready':b=ready();break;
 case 'qctype':b=title('QC Test','','','qc')+text(7,56,'Select type of test',13)+button(160,83,158,75,'QC Strip Test'+(opts.due&&!h?' Required':''),'strip',{size:12,arrow:'right'})+button(160,161,158,77,['QC Cassette Test',...(opts.due&&h?['Required']:[])],'cassette',{size:13,arrow:'right'})+back();break;
 case 'type':b=title('Test Type','','','cassette')+text(7,57,'Select type of cassette',13)+button(158,160,160,78,['Clinitest® hCG','cassette'],'cassette',{arrow:'right'})+back();break;
 case 'lot':b=title(qc?'QC '+(opts.control?'Control':h?'Cassette':'Strip')+' Lot':h?'Cassette Lot':'Strip Lot')+(!opts.control?text(8,57,assay,14):'')+button(160,43,158,93,'Use Last Lot','last',{arrow:'right'})+button(160,139,158,99,['Enter new lot','and expiration'],'new',{arrow:'right'})+back();break;
 case 'entry':{
  b=title(opts.title||'QC Control Lot')+button(2,42,39,32,'123','numeric',{center:true,size:13})+rect(44,42,229,32,bg,ink,2)+button(276,42,42,32,'X','clear',{center:true});
  for(const [i,v] of [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].entries())b+=button(2+i%8*40,79+Math.floor(i/8)*32,37,29,v,v,{center:true,size:15});
  b+=button(82,175,37,29,'-','-',{center:true})+button(122,175,76,29,' ','space',{center:true})+next('Enter');break;
 }
 case 'expiry':b=title(opts.title||'QC Control Expiration')+['YY','MM','DD'].map((v,i)=>{const x=45+i*80;return button(x,62,67,34,'▲','',{center:true})+rect(x,98,67,39,bg,ink)+text(x+33,124,'--',21,'middle')+text(x+33,153,v,12,'middle')+button(x,156,67,34,'▼','',{center:true})}).join('')+back('Previous')+next('Enter');break;
 case 'prepare':{
  b=title('Prepare Test',h?assay:'','',qc?'qc':h?'cassette':'strip')+
  (qc?lines(7,55,['QC',assay,'Touch START to','begin'],13,16)+lines(7,145,['Control:',h?'hCG control':'Quantimetrix Dipper','Level:',opts.level||'[level]'],12,15):
  h?lines(7,58,['Adjust test table','insert for cassette','tests','Place cassette on','test table and touch','START'],13,15):
  lines(7,58,[assay,'','Touch START to','begin'],14,16))+
  (!qc?button(160,42,158,35,'Help','Help',{icon:'help'}):'')+
  button(160,qc?42:80,158,qc?196:158,'START','START',{center:true,size:21,arrow:'right'})+back();break;
 }
 case 'timer':b=title('Prepare Test',h?assay:'')+lines(7,66,h?['1. Draw sample into pipette','2. Add sample to cassette']:['1. Dip test strip in sample','2. Remove excess','3. Blot strip','4. Place on test table'],14,25)+text(160,218,'00:08',27,'middle');break;
 case 'calibrating':b=title('Calibrating','Please wait')+text(160,125,'Clinitek Status® is Calibrating',14,'middle');break;
 case 'analyzing':b=title('Analyzing','In progress')+text(160,132,h?'04:52':'00:43',28,'middle');break;
 case 'appearance':b=title('Select Appearance','Test in progress')+lines(8,63,['Select Color and Clarity','of urine sample'],14,17)+button(160,102,158,66,'Yellow and Clear','yellow',{size:13,arrow:'right'})+button(160,171,158,67,'Other','other',{arrow:'right'});break;
 case 'color':case 'clarity':{
  const color=mode==='color',labels=color?['Light Yellow','Yellow','Dark Yellow','Amber','Brown','Red','Orange','Pink','Green','Blue','Other']:['Clear','Slightly Cloudy','Cloudy','Turbid','Other'];
  b=title(color?'Select Color':'Select Clarity','Test in progress')+labels.map((v,i)=>radio(13+Math.floor(i/6)*154,57+i%6*23,v)).join('')+back('Previous')+next();break;
 }
 case 'results':case 'results-more':{
  const more=mode==='results-more';
  const list=more?['Test','Test date','Time','Test sequence number']:h?[assay,'Test date','Time','Test sequence number']:['Glucose','Bilirubin','Ketone','Specific Gravity','Blood','pH','Protein','Urobilinogen','Nitrite','Leukocytes'];
  b=title(qc?'QC Results':'Results',qc?'QC Test: [status]':opts.quick?'Test Sequence Number: 0000':'Patient: MRN #######',h?'':more?'2 of 2':'1 of 2')+
   list.map((v,i)=>text(7,58+i*14,v,11,'start',ink,false)+text(220,58+i*14,'·············   —',11,'end',ink,false)).join('')+
   (!h?button(241,42,77,39,more?'Back':'More',more?'Back':'More',{size:13,arrow:more?'left':'right'}):'')+
   (qc?button(241,84,77,41,['Add QC','notes'],'notes',{size:12}):'')+
   button(241,128,77,37,'Print','Print',{size:13,icon:'print'})+
   button(241,169,77,69,'Done','Done',{size:13,arrow:'right'});break;
 }
 case 'passfail':b=title('QC Test','Select PASS or FAIL','','qc')+button(160,42,158,96,'QC PASS','PASS',{arrow:'right'})+button(160,141,158,97,'QC FAIL','FAIL',{arrow:'right'})+back();break;
 case 'summary':b=title('QC Test','Select PASS or FAIL','','qc')+button(160,42,158,96,'QC PASS','PASS',{arrow:'right'})+button(160,141,158,97,'QC FAIL','FAIL',{arrow:'right'})+back();break;
 case 'recall':b=title('Recall Options','','','recall')+radio(13,59,'Recall Patient Tests or QC Tests',true)+radio(13,91,'Delete Records')+button(2,199,100,39,'Done','Done',{arrow:'left'})+next('Select');break;
 case 'recalltype':b=title('Recall Results','','','recall')+lines(8,57,['Choose which','results to search'],13,16)+radio(174,59,'Patient tests')+radio(174,90,'QC tests',true)+back('Previous')+next();break;
 case 'search':b=title('Recall Results','','','recall')+button(160,42,158,62,['Search by name','or ID'],'name',{arrow:'right'})+button(160,108,158,62,'Search by date','date',{arrow:'right'})+button(160,174,158,64,'View all results','all',{arrow:'right'})+back('Previous');break;
 case 'stored-list':b=title('Recall Results','Search Results','','recall')+Array.from({length:7},(_,i)=>text(7,54+i*20,'11-25-2026  10:'+String(24-i).padStart(2,'0')+'       '+String(8-i).padStart(4,'0'),12)).join('')+button(282,43,36,39,'▲','',{center:true})+button(282,154,36,39,'▼','',{center:true})+button(2,199,65,39,'Back','Back',{arrow:'left'})+button(69,199,81,39,'Send all','Send all',{size:12})+button(152,199,81,39,'Print all','Print all',{size:12})+button(235,199,83,39,'Select','Select',{arrow:'right'});break;
 default:return '';
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="CLINITEK Status+ '+E(mode)+' training screen" text-rendering="optimizeSpeed"><defs><pattern id="'+id+'px" width="2" height="2" patternUnits="userSpaceOnUse"><path d="M0 1H2" stroke="#143a39" stroke-width=".35" opacity=".16"/></pattern></defs>'+rect(.5,.5,319,239,bg,ink)+b+'<rect width="320" height="240" fill="url(#'+id+'px)" pointer-events="none"/></svg>';
}
function fromItem(item){
 const s=(item.screen||'').toLowerCase(),f=(item.focus||'').toLowerCase(),kind=item.kind==='hcg'?'hcg':'ua',opts={kind,qc:true,focus:f};
 if(s==='select ready')return lcd('ready',{...opts,focus:f.includes('recall')?'recall':'QC'});
 if(s==='recall options')return lcd('recall',opts);
 if(s==='recall results')return lcd('recalltype',opts);
 if(s==='search results')return lcd('search',opts);
 if(s==='stored list')return lcd('stored-list',opts);
 if(s.includes('stored result'))return lcd('results',opts);
 return '';
}
window.LAB_CLINITEK_LCD={lcd,fromItem};
})();