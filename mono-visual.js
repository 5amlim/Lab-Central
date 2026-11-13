/* McKesson Consult #5012, manufacturer-referenced educational drawings.
   Vertical result window (C/T) above the sample well (S).
   Whole-blood method: 25 µL red-line capillary pipette, developer at the lower S well.
   Procedure reference: Mono_5012_procedure_card_2015_12.pdf (McKesson). */
(function(){
  'use strict';
  const C={ink:'#243a55',muted:'#587088',teal:'#168d85',red:'#b7495c',pink:'#965a9f',pale:'#eef4f7',blue:'#315ba6'};
  const text=(x,y,value,size=13,color=C.ink,weight=700)=>'<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+weight+'" font-family="Arial,Helvetica,sans-serif" fill="'+color+'">'+value+'</text>';
  const art=(body,label)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 260" role="img" aria-label="'+label+'">'+
    '<rect x="1" y="1" width="538" height="258" rx="17" fill="#f8fafc" stroke="#e3eaf0"/>'+body+'</svg>';
  const tag=(x,y,label)=>'<rect x="'+x+'" y="'+y+'" width="'+(label.length*7+22)+'" height="25" rx="7" fill="#e6f2f0"/>'+
    text(x+11,y+17,label,11,C.teal,800);
  // Portrait cassette: result window and C/T markings are ABOVE the recessed S well.
  // The single elongated S well has an upper (blood) and a lower (developer) area.
  function cassette(x,y,scale=1,result='negative',focus=''){
    let s='<g transform="translate('+x+' '+y+') scale('+scale+')">'+
      '<rect x="2" y="5" width="144" height="210" rx="15" fill="#cbd5df" opacity=".34"/>'+
      '<rect x="0" y="0" width="144" height="210" rx="14" fill="#fff" stroke="#aabac8" stroke-width="2.2"/>'+
      '<rect x="7" y="7" width="130" height="196" rx="9" fill="none" stroke="#ebeff3" stroke-width="2"/>'+
      text(19,24,'CONSULT',10,'#647587',700)+text(20,40,'Mono',13,'#4c5f74',850)+
      '<rect x="37" y="51" width="67" height="80" rx="7" fill="#e5eaf0" stroke="#a4b3c3" stroke-width="1.5"/>'+
      '<rect x="44" y="58" width="52" height="65" rx="4" fill="#fcfbfb" stroke="#c3cdd7"/>'+
      '<rect x="66" y="58" width="10" height="65" fill="#f5f2f5"/>'+
      text(112,80,'C',12,'#4d6077',850)+text(112,108,'T',12,'#4d6077',850);
    if(result!=='invalid')s+='<rect x="50" y="73" width="40" height="4.5" rx="2" fill="'+C.pink+'"/>';
    if(result==='positive')s+='<rect x="50" y="101" width="40" height="4.5" rx="2" fill="'+C.pink+'"/>';
    s+='<rect x="47" y="145" width="48" height="52" rx="23" fill="#e4e9ed" stroke="#aab9c7" stroke-width="2"/>'+
      '<rect x="53" y="150" width="36" height="42" rx="18" fill="#fcfdff" stroke="#ced7de"/>'+
      text(106,177,'S',13,'#4e6378',850);
    if(focus==='upper')s+='<ellipse cx="71" cy="161" rx="15" ry="8" fill="#d6a6a6" opacity=".85" stroke="'+C.red+'" stroke-width="1.5"/>';
    if(focus==='lower')s+='<ellipse cx="71" cy="181" rx="15" ry="8" fill="#c7e8e6" opacity=".86" stroke="'+C.teal+'" stroke-width="1.5"/>';
    return s+'</g>';
  }
  // Actual design is a one-piece capillary transfer pipette with a narrow tip,
  // red fill mark, side-wall air vent, and integrated squeeze bulb.
  // The pointed tip starts at local (0,0), bulb extends to the RIGHT.
  function pipette(x,y,rotation=0,scale=1){
    return '<g transform="translate('+x+' '+y+') rotate('+rotation+') scale('+scale+')">'+
      '<path d="M0 0 L24 -2.5 L127 -3.5 Q140 -3.5 149 -8 C158 -23 184 -24 196 -10 Q207 0 196 10 C184 24 158 23 149 8 Q140 3.5 127 3.5 L24 2.5 Z" fill="#f7fcfd" stroke="#8fa7b6" stroke-width="2"/>'+
      '<path d="M13 0H154" stroke="#cbdce4" stroke-width="1.3"/>'+
      '<path d="M61 -8V8" stroke="'+C.red+'" stroke-width="4.5"/>'+
      '<circle cx="142" cy="-5.4" r="3.2" fill="#fff" stroke="#6e8d9c" stroke-width="1.5"/>'+
      '<ellipse cx="177" cy="0" rx="10" ry="11" fill="#e5eff4" opacity=".5"/>'+
      '</g>';
  }
  // Blue pointed cap is the kit developer. Orange and black caps belong to controls.
  function developer(x,y,scale=1){
    return '<g transform="translate('+x+' '+y+') scale('+scale+')">'+
      '<rect x="1" y="1" width="53" height="72" rx="12" fill="#fff" stroke="#8ea7b8" stroke-width="2.2"/>'+
      '<path d="M7 12h40v48H7z" fill="#fafafa"/>'+
      '<rect x="6" y="26" width="42" height="29" rx="2" fill="#edf1f5" stroke="#d5dde4"/>'+
      text(10,37,'DEVELOPER',7.3,C.ink,750)+text(14,47,'SOLUTION',7.2,C.muted)+
      '<rect x="11" y="68" width="33" height="17" rx="5" fill="'+C.blue+'" stroke="#27477f" stroke-width="1.5"/>'+
      '<path d="M20 84L28 101L35 84Z" fill="'+C.blue+'" stroke="#27477f" stroke-width="1.5"/>'+
      '<path d="M26.5 98L28 109L30 98" fill="#497cc5"/>'+
      '</g>';
  }
  const drop=(cx,cy,color)=>'<path d="M'+cx+' '+(cy-12)+' C'+(cx-6)+' '+(cy-4)+' '+(cx-7)+' '+cy+' '+cx+' '+(cy+3)+' C'+(cx+7)+' '+cy+' '+(cx+6)+' '+(cy-4)+' '+cx+' '+(cy-12)+'Z" fill="'+color+'" stroke="#fff" stroke-width="1.1"/>';
  const arrow=(x1,y1,x2,y2,color=C.teal)=>'<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-dasharray="6 5" stroke-linecap="round"/>'+
    '<path d="M'+(x2-6)+' '+(y2-6)+'L'+x2+' '+y2+'L'+(x2+6)+' '+(y2-6)+'" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-linecap="round"/>';
  function figure(i){
    let body='',title='',note='';
    if(i===0){
      title='Verify the McKesson #5012 kit';
      body=cassette(331,17,.98)+
        '<rect x="32" y="51" width="238" height="152" rx="13" fill="#fff" stroke="#c6d6e2" stroke-width="2"/>'+
        tag(44,63,'PATIENT ID + ORDER')+
        text(48,124,'✓  Two identifiers',16,C.ink)+
        text(48,158,'✓  Kit lot / expiry',16,C.ink)+
        text(48,191,'✓  Correct test',16,C.ink);
      note='Confirm the patient, Athena order, sealed test device and kit expiration.';
    }else if(i===1){
      title='25 µL red-line capillary pipette';
      body=tag(32,30,'WHOLE BLOOD · CLIA WAIVED')+
        pipette(43,126,0,2.13)+
        text(48,165,'NARROW TIP',12,C.muted)+
        text(168,195,'RED FILL LINE',12,C.red)+
        '<path d="M171 178L172 133" stroke="'+C.red+'" stroke-width="2" stroke-dasharray="4 4"/>'+
        text(316,52,'AIR VENT',12,C.muted)+
        '<path d="M349 57L347 113" stroke="'+C.muted+'" stroke-width="2" stroke-dasharray="4 4"/>'+
        text(420,192,'BULB',12,C.muted)+
        '<path d="M438 179L432 144" stroke="'+C.muted+'" stroke-width="2" stroke-dasharray="4 4"/>';
      note='Hold horizontally. Capillary action fills to the red mark automatically; never squeeze to collect.';
    }else if(i===2){
      title='Remove cassette from sealed pouch';
      body='<rect x="42" y="76" width="230" height="142" rx="10" fill="#f0f4f8" stroke="#aabacb" stroke-width="2.5"/>'+
        '<rect x="56" y="89" width="202" height="115" rx="5" fill="#fafcfe" stroke="#b4c4d1" stroke-width="2" stroke-dasharray="5 4"/>'+
        text(73,134,'SEALED TEST',18,C.ink)+text(73,160,'POUCH',18,C.ink)+
        '<path d="M282 140h40" stroke="'+C.teal+'" stroke-width="3"/>'+
        '<path d="m313 131 11 9-11 9" fill="none" stroke="'+C.teal+'" stroke-width="3"/>'+
        cassette(356,18,.96);
      note='Equilibrate materials to room temperature. Open the pouch when ready and lay the device flat.';
    }else if(i===3){
      title='Whole blood into UPPER end of S well';
      body=cassette(353,20,1,'negative','upper')+
        pipette(425,146,-90,.65)+
        drop(425,154,C.red)+arrow(425,163,425,181,C.red)+
        tag(28,35,'25 µL · RED LINE')+
        text(31,92,'Squeeze bulb to',18,C.ink)+
        text(31,119,'dispense the blood',18,C.ink)+
        '<path d="M232 143L367 168" stroke="'+C.red+'" stroke-width="2.2" stroke-dasharray="6 5"/>'+
        text(31,173,'UPPER S WELL',15,C.red,850);
      note='After capillary filling, squeeze the bulb to expel whole blood into the UPPER part of the single S well.';
    }else if(i===4){
      title='Developer into LOWER end of S well';
      body=cassette(353,18,1,'negative','lower')+
        developer(396,5,.9)+
        drop(421,129,'#4589c5')+drop(421,147,'#4589c5')+
        arrow(421,155,421,197,'#4589c5')+
        tag(30,32,'DEVELOPER SOLUTION')+
        text(31,95,'Hold bottle',18,C.ink)+text(31,121,'VERTICALLY',18,C.ink,850)+
        text(31,163,'2–3 DROPS',20,C.teal,850)+
        text(31,194,'LOWER S WELL',14,C.muted,800);
      note='Hold the blue-tip developer bottle vertically. Add 2–3 drops to the LOWER end of the same S well.';
    }else{
      title='Read the C and T lines at 8 minutes';
      body=cassette(30,43,.76,'positive')+
        cassette(211,43,.76,'negative')+
        cassette(392,43,.76,'invalid')+
        text(48,236,'POSITIVE',13,C.teal,850)+
        text(229,236,'NEGATIVE',13,C.ink,850)+
        text(414,236,'INVALID',13,C.red,850)+
        tag(182,9,'READ AT 8 MIN');
      note='C + T is positive; C alone is negative; missing C is invalid. Never interpret after 15 minutes.';
    }
    return '<aside class="mono-art-card">'+
      '<div class="mono-art-heading"><span class="mono-art-dot"></span><strong>'+title+'</strong></div>'+
      '<div class="mono-art-picture">'+art(body,title)+'</div><p>'+note+'</p>'+
      '<a class="mono-art-source" href="https://imgcdn.mckesson.com/CumulusWeb/Click_and_learn/Mono_5012_procedure_card_2015_12.pdf" target="_blank" rel="noopener noreferrer">McKesson #5012 procedure card ↗</a></aside>';
  }
  const patterns=[
    /verify order, patient, and kit/i,
    /select whole blood method/i,
    /prepare cassette and specimen/i,
    /add specimen to upper s well/i,
    /add developer to lower s well/i,
    /read at 8 min and document/i
  ];
  window.LAB_MONO_ART={render(title,group){
    if(group!=='patient-testing')return '';
    const index=patterns.findIndex(pattern=>pattern.test(String(title||'')));
    return index<0?'':figure(index);
  }};
})();