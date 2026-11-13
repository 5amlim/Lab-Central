/* McKesson Consult #5012 patient-testing illustrations. Educational schematics. */
(function(){
  "use strict";
  const ink="#33455f", muted="#718299", purple="#85539b", red="#cc4f68", teal="#208d8d";
  function svg(body,label){
    return '<svg viewBox="0 0 420 175" role="img" aria-label="'+label+'" xmlns="http://www.w3.org/2000/svg">'+
      '<rect x="1" y="1" width="418" height="173" rx="18" fill="#f8fbfe" stroke="#e4eaf2"/>'+body+'</svg>';
  }
  function t(x,y,s,size=13,color=ink,weight=700){
    return '<text x="'+x+'" y="'+y+'" fill="'+color+'" font-size="'+size+'" font-weight="'+weight+'" font-family="Inter,Arial,sans-serif">'+s+'</text>';
  }
  function cassette(x=155,y=36,result="negative"){
    let a='<g transform="translate('+x+' '+y+')"><rect width="185" height="98" rx="11" fill="#fff" stroke="#b6c5d6" stroke-width="3"/>'+
    '<rect x="15" y="10" width="63" height="12" rx="4" fill="#e8eaf2"/>'+t(20,19,'MONO',9,'#62738d')+
    '<rect x="95" y="22" width="70" height="44" rx="6" fill="#fbf8fd" stroke="#b3b7c9"/>'+
    t(171,37,'C',10)+t(171,59,'T',10)+
    '<circle cx="49" cy="69" r="21" fill="#f7f7fc" stroke="#b0b4c9" stroke-width="2"/>'+t(45,74,'S',13);
    if(result!=="invalid")a+='<rect x="107" y="32" width="48" height="4" rx="2" fill="'+purple+'"/>';
    if(result==="positive")a+='<rect x="107" y="54" width="48" height="4" rx="2" fill="'+purple+'"/>';
    a+='</g>';return a;
  }
  function pipette(x,y,kind='red'){
    let c=kind==='red'?red:'#252f42';
    return '<g transform="translate('+x+' '+y+')">'+
    '<path d="M0 14H106L121 6H140Q154 6 154 18T140 30H121L106 22H0Z" fill="#fff" stroke="#8095ab" stroke-width="2"/>'+
    '<path d="M0 14L106 14" stroke="#bbc9d8" stroke-width="1.5"/>'+
    '<path d="M34 9V27" stroke="'+c+'" stroke-width="5"/>'+
    '<circle cx="124" cy="12" r="3" fill="#fff" stroke="#8095ab"/>'+
    '</g>';
  }
  function card(kind){
    let body='',note='',name='';
    if(kind===0){
      name='Confirm McKesson #5012 and the patient';
      body=cassette(155,32)+
      '<rect x="29" y="47" width="110" height="83" rx="10" fill="#fff" stroke="#b9c8d7" stroke-width="2"/>'+
      t(44,68,'ORDER + ID',12,teal)+t(44,87,'✓ Patient',12)+t(44,106,'✓ Lot / Exp',12)+
      '<path d="M135 90h17" stroke="'+teal+'" stroke-width="4"/>';
      note='Use two identifiers; check the exact cassette, lot and expiration.';
    }else if(kind===1){
      name='CLIA-waived whole-blood method';
      body=t(24,34,'WHOLE BLOOD · CLIA WAIVED',14,teal)+
           pipette(25,55,'red')+
           '<rect x="198" y="57" width="196" height="58" rx="11" fill="#e8f5f1" stroke="#b5dfd4"/>'+
           t(215,79,'25 µL',18,teal,850)+t(215,100,'RED-LINE PIPETTE',11,teal)+
           '<rect x="23" y="129" width="371" height="29" rx="8" fill="#f2f5f9"/>'+
           t(34,149,'Black-line 10 µL pipette: external liquid QC only',11,muted);
      note='The clinic uses whole blood with the red-line 25 µL pipette. Serum/plasma is a separate moderate-complexity method.';
    }else if(kind===2){
      name='Prepare cassette and specimen';
      body='<rect x="27" y="38" width="145" height="96" rx="12" fill="#e6ecf4" stroke="#90a5b9" stroke-width="2"/>'+
      '<rect x="40" y="51" width="120" height="72" rx="7" fill="#fff" stroke="#acbacb" stroke-dasharray="5 4"/>'+
      t(50,90,'SEALED POUCH',12,ink)+
      '<path d="M197 88h36" stroke="'+teal+'" stroke-width="4" stroke-linecap="round"/>'+
      '<path d="m226 80 10 8-10 8" stroke="'+teal+'" fill="none" stroke-width="3"/>'+
      cassette(230,40);
      note='Equilibrate to room temperature, then open and place on a flat surface.';
    }else if(kind===3){
      name='Fill to line; dispense in upper S well';
      body=pipette(20,30)+
      '<path d="M98 70v25" stroke="'+teal+'" stroke-width="3" stroke-dasharray="5 5"/>'+
      '<path d="m90 90 8 10 8-10" fill="none" stroke="'+teal+'" stroke-width="3"/>'+
      cassette(170,52)+
      '<circle cx="219" cy="120" r="7" fill="#d37486" opacity=".75"/>'+
      t(18,120,'FILL LINE',12,red)+t(18,140,'Do not squeeze',11,muted);
      note='Hold pipette horizontally to collect, then expel into the UPPER sample-well area.';
    }else if(kind===4){
      name='Add developer to the lower S well';
      body=cassette(161,51)+
      '<g transform="translate(40 22)"><rect x="24" y="18" width="53" height="74" rx="12" fill="#fff" stroke="#9eacc0" stroke-width="3"/>'+
      '<rect x="33" y="4" width="35" height="20" rx="5" fill="#8355a7"/>'+
      '<path d="M48 94v20" stroke="#a6b6c6" stroke-width="7" stroke-linecap="round"/>'+
      '<path d="M48 126q-15 18 0 18t0-18" fill="#73bdd4" stroke="#388da8" stroke-width="2"/></g>'+
      '<path d="M116 132h40" stroke="'+teal+'" stroke-width="3" stroke-dasharray="5 5"/>'+
      t(36,163,'2–3 DROPS',13,teal);
      note='Hold the bottle vertically and add 2–3 drops to the LOWER S-well area.';
    }else if(kind===5){
      name='Read the cassette at 8 minutes';
      body=cassette(16,42,"positive")+
      '<rect x="228" y="38" width="156" height="98" rx="13" fill="#ecf7f6" stroke="#9bcfc8" stroke-width="2"/>'+
      t(244,69,'READ AT',11,teal)+t(244,103,'8:00',32,teal,850)+t(244,121,'Never after 15 min',11,red)+
      t(29,157,'C = control · T = test',12,muted);
      note='C + T = positive; C only = negative; no C = invalid. Record the result.';
    }
    return '<aside class="mono-art-card"><div class="mono-art-heading"><span class="mono-art-dot"></span><strong>'+name+'</strong></div>'+
      '<div class="mono-art-picture">'+svg(body,name)+'</div><p>'+note+'</p></aside>';
  }
  const patterns=[/verify the order/i,/CLIA-waived whole-blood method/i,/prepare the test device/i,/transfer the specimen/i,/add developer/i,/read at eight minutes/i];
  window.LAB_MONO_ART={render:function(title,group){
    if(group!=='patient-testing')return '';
    const i=patterns.findIndex(p=>p.test(String(title)));
    return i<0?'':card(i);
  }};
})();