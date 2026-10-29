/* PATHFAST detail corrections: visibly domed front sample well, filled blood,
   third setup drawing for rack/tips/waste-tip box, and larger green-top tube. */
(function(){
 "use strict";
 const art=window.LAB_EQUIPMENT_ART;
 if(!art)return;
 const originalAction=art.pathfastActionVisual;
 function dome(src){
  if(!src)return src;
  /* Keep the real cartridge outline, show a shallow transparent dome inside
     the existing front sample well and remove the former overlapping label. */
  const chamber='<g aria-label="Red sample in the clear shallow domed sample chamber">'+
   '<path d="M108 172Q129 195 150 174" fill="none" stroke="#7ba7b6" stroke-width="3"/>'+
   '<path d="M111 173Q130 190 147 174L146 177Q129 192 112 177Z" fill="#b84957" stroke="#c06b75" stroke-width="1.5"/>'+
   '<path d="M625 175Q651 197 679 175" fill="none" stroke="#81abbc" stroke-width="3"/>'+
   '<path d="M629 176Q651 189 675 176" fill="none" stroke="#b84957" stroke-width="5"/>'+
   '</g>';
  return src.replace('</svg>',chamber+'</svg>');
}
function loadedRack(){
  let shapes='<rect x="18" y="18" width="944" height="420" rx="17" fill="#f5fafc" stroke="#d3e4eb" stroke-width="3"/>'+
    '<rect x="45" y="79" width="403" height="305" rx="12" fill="#e9f8fc" stroke="#a5c8d7" stroke-width="4"/>'+
    '<rect x="54" y="88" width="385" height="286" rx="8" fill="#f3f8fb" stroke="#c6dce5"/>';
  for(let i=0;i<6;i++){
   let y=100+i*43,full=i<2;
   shapes+='<rect x="69" y="'+y+'" width="364" height="38" rx="5" fill="#d4e1e9" stroke="#91adbc" stroke-width="2"/>'+
    '<rect x="87" y="'+(y+4)+'" width="334" height="29" rx="3" fill="'+(full?"#19232d":"#f5fafc")+'" stroke="#b7d0db" stroke-width="1"/>'+
    (full?'<rect x="89" y="'+(y+6)+'" width="36" height="25" rx="4" fill="#e5f6fa" stroke="#91b2bd"/>'+
      '<path d="M93 '+(y+17)+'H122V'+(y+28)+'H93Z" fill="#b54856"/>'+
      '<path d="M143 '+(y+13)+'H393" stroke="#596673" stroke-width="4"/>'+
      '<rect x="390" y="'+(y+6)+'" width="27" height="25" rx="2" fill="#dc524f"/>':'')+
    '<text x="76" y="'+(y+24)+'" font-size="11" fill="#4c697b" text-anchor="middle" font-family="Arial">'+(i+1)+'</text>';
  }
  shapes+='<rect x="468" y="142" width="219" height="173" rx="16" fill="#eef3f6" stroke="#9cbbc9" stroke-width="5"/>'+
   '<rect x="484" y="166" width="188" height="123" rx="11" fill="#fff" stroke="#c0d5df" stroke-width="3"/>'+
   '<path d="M491 194H665M491 226H665" stroke="#dde9ee" stroke-width="3"/>'+
   '<rect x="511" y="129" width="133" height="25" rx="6" fill="#e4ebef" stroke="#b6cbd5"/>'+
   '<text x="579" y="252" text-anchor="middle" font-family="Arial" font-size="18" font-weight="850" fill="#47748c">WASTE TIP</text>'+
   '<text x="579" y="273" text-anchor="middle" font-family="Arial" font-size="18" font-weight="850" fill="#47748c">BOX</text>'+
   '<rect x="712" y="96" width="220" height="289" rx="13" fill="#e9f5f9" stroke="#a5c6d4" stroke-width="4"/>'+
   '<rect x="735" y="120" width="172" height="238" rx="10" fill="#f9fcfd" stroke="#c2dae4"/>';
  for(let i=0;i<6;i++){
   const x=746+i*27,active=i<2;
   shapes+='<ellipse cx="'+x+'" cy="305" rx="11" ry="6" fill="'+(active?"#769aaa":"#d4e0e7")+'"/>'+
    (active?'<rect x="'+(x-6)+'" y="157" width="13" height="149" rx="5" fill="#f0fafc" stroke="#8fb4c5" stroke-width="2"/>'+
     '<path d="M'+(x-5)+' 305L'+x+' 333L'+(x+6)+' 305Z" fill="#d0e6ed" stroke="#9fb9c7"/>'+
     '<rect x="'+(x-10)+'" y="149" width="21" height="14" rx="4" fill="#deebf1" stroke="#8daebb"/>':'')+
    '<text x="'+x+'" y="339" text-anchor="middle" font-size="11" fill="#5c8396" font-family="Arial">'+(i+1)+'</text>';
  }
  shapes+='<text x="244" y="56" text-anchor="middle" font-family="Arial" font-weight="850" font-size="19" fill="#2e7189">LOADED CARTRIDGES</text>'+
   '<text x="576" y="56" text-anchor="middle" font-family="Arial" font-weight="850" font-size="19" fill="#2e7189">CENTER WASTE BOX</text>'+
   '<text x="822" y="56" text-anchor="middle" font-family="Arial" font-weight="850" font-size="19" fill="#2e7189">NEW TIPS</text>'+
   '<text x="492" y="416" text-anchor="middle" font-family="Arial" font-size="15" fill="#5e7f92">Example: 2 occupied lanes · match rack, tips and waste box to analyzer placement</text>';
  return '<svg viewBox="0 0 980 460" role="img" aria-label="Combined PATHFAST loading station: six-lane cartridge rack on left with two red-filled sample wells, white waste-tip box in middle, six-place tip holder on right with two new tips">'+shapes+'</svg>';
 }
 art.pathfastActionVisual=function(stage,mode){
  if(stage==='assembled')return '<figure class="pf-action-figure pf-assembled-figure"><div class="pf-action-heading">READY TO RUN · CARTRIDGES + TIPS + CENTER WASTE TIP BOX</div><div class="pf-action-image">'+loadedRack()+'</div><figcaption>Completed setup example with two active lanes. Verify the waste-tip box is present and correctly seated, both matching disposable tips are installed, and the sample wells contain specimen before closing the cover.</figcaption></figure>';
  const source=originalAction(stage,mode);
  if(stage==='dispense')return dome(source);
  return source;
 };
 const specimen=art.specimenGuide;
 art.specimenGuide=function(sec){
  let html=specimen(sec);
  if(sec&&['pathfast','piccolo'].includes(sec.id)){
    html=html.replace('viewBox="0 0 550 285"','viewBox="80 30 160 248"');
  }
  return html;
 };
})();