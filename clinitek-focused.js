/* CLINITEK Status+ instrument-specific guided step artwork.
   Separate urinalysis dipstick and CLINITEST hCG cassette; never render blood tubes.
   Illustrative interfaces only: compare with the actual analyzer and approved IFU. */
(function(){
'use strict';
const E=s=>String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'&quot;');
const tx=(x,y,s,size=16,color="#315e75",bold=true,anchor="middle")=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-size="'+size+'" font-family="Arial,sans-serif" font-weight="'+(bold?850:550)+'" fill="'+color+'">'+E(s)+'</text>';
const svg=(body,alt)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 355" role="img" aria-label="'+E(alt)+'">'+body+'</svg>';
const fig=(heading,art,note)=>'<figure class="cl-focused-figure"><header>'+E(heading)+'</header><div class="cl-focused-art">'+art+'</div><figcaption>'+E(note)+'</figcaption></figure>';
const strip=(x,y,orientation=0)=>'<g transform="translate('+x+' '+y+') rotate('+orientation+' 0 0)">'+
 '<rect x="-10" y="-103" width="20" height="205" rx="3" fill="#eff5f6" stroke="#94afb9" stroke-width="2"/>'+
 '<rect x="-8" y="-98" width="16" height="34" rx="2" fill="#e6dd91"/>'+
 ['#96c9a5','#cdb598','#c4a5bb','#93a8d7','#dfc279','#a1bbb8','#d1a6a6','#c4c6a7'].map((c,i)=>'<rect x="-8" y="'+(-57+i*18)+'" width="16" height="15" rx="2" fill="'+c+'"/>').join('')+'</g>';
const cassette=(x=584,y=245)=>'<g transform="translate('+x+' '+y+')">'+
 '<rect x="-66" y="-21" width="135" height="53" rx="10" fill="#f8fcfd" stroke="#93b1be" stroke-width="3"/>'+
 '<rect x="-51" y="-9" width="55" height="22" rx="5" fill="#e5eef2" stroke="#a0bbc8" stroke-width="2"/>'+
 '<rect x="-41" y="-3" width="34" height="9" rx="2" fill="#fff"/>'+
 '<circle cx="44" cy="3" r="13" fill="#eef6f8" stroke="#92b2bf" stroke-width="3"/>'+
 tx(-21,26,"CLINITEST hCG",11,"#477587")+'</g>';
const cup=(x=535,y=102)=>'<g transform="translate('+x+' '+y+')">'+
 '<ellipse cx="67" cy="172" rx="79" ry="8" fill="#dce7ed"/>'+
 '<path d="M13 35H122L112 163Q108 179 68 179Q27 179 22 163Z" fill="#e8f4f7" stroke="#91afbc" stroke-width="4"/>'+
 '<path d="M25 112H111L107 158Q103 170 68 171Q33 170 30 158Z" fill="#f2d58e" fill-opacity=".82"/>'+
 '<ellipse cx="68" cy="35" rx="57" ry="13" fill="#f8fcfd" stroke="#9fbbc6" stroke-width="4"/>'+
 '<rect x="31" y="70" width="75" height="40" rx="5" fill="#fff" stroke="#d7e5ea"/>'+
 tx(68,94,"URINE",17,"#326c7c")+'</g>';
function machine(mode="home"){
 const screen=mode==="results"?"RESULTS":mode==="start"?"READY":mode==="cassette"?"CASSETTE TEST":"CLINITEK Status+";
 const options=mode==="home"||mode==="strip"?["Strip Test","Cassette Test"]:mode==="cassette"?["CLINITEST hCG","Back"]:mode==="qc"?["QC Test","Enter control ID"]:mode==="start"?["START","Cancel"]:mode==="results"?["Result ready","Review / print"]:["Strip Test","Cassette Test"];
 const focus=mode==="strip"?"Strip Test":mode==="cassette"?"CLINITEST hCG":mode==="qc"?"QC Test":mode==="start"?"START":mode==="results"?"Review / print":"";
 return '<ellipse cx="261" cy="333" rx="177" ry="10" fill="#d9e6ec"/>'+
 '<path d="M107 55L130 35H424L448 58V300L420 317H127L105 300Z" fill="#e9eff2" stroke="#8da6b3" stroke-width="5"/>'+
 '<path d="M424 35L448 58V300L420 317V60Z" fill="#bdccd4"/>'+
 '<rect x="128" y="58" width="290" height="185" rx="15" fill="#405d71" stroke="#abc3ce" stroke-width="5"/>'+
 '<rect x="140" y="70" width="266" height="157" rx="7" fill="#f1f8fa"/>'+
 '<rect x="140" y="70" width="266" height="34" rx="5" fill="#27617a"/>'+tx(273,93,screen,14,"#fff")+
 options.map((o,i)=>{const y=123+i*52,selected=o===focus;return '<rect x="167" y="'+y+'" width="209" height="39" rx="6" fill="'+(selected?"#d5f1e8":"#fff")+'" stroke="'+(selected?"#168c7c":"#bed5de")+'" stroke-width="'+(selected?3:1.5)+'"/>'+tx(271,y+25,o,16,selected?"#0e796a":"#466c7d");}).join('')+
 '<rect x="165" y="259" width="215" height="29" rx="5" fill="#e7f0f3" stroke="#afc5ce" stroke-width="2"/>'+
 '<path d="M159 296H393L400 313H153Z" fill="#b7c9d1" stroke="#8aa9b8" stroke-width="2"/>';
}
function scene(kind,mode){
 const isHcg=kind==="hcg",testName=isHcg?"CLINITEST hCG CASSETTE":"URINALYSIS DIPSTICK";
 let art=machine(mode==="select"?(isHcg?"cassette":"strip"):mode==="qc"?"qc":mode==="qc-dip"?"start":mode==="dip"?"start":mode==="start"?"start":mode==="results"?"results":"home");
 if(mode==="specimen"){art+=cup(512,75);art+=isHcg?cassette(590,301):strip(486,238,80);}
 if(mode==="qc-material"||mode==="qc-dip"){art+='<g><rect x="532" y="123" width="91" height="147" rx="13" fill="#e9f5f8" stroke="#96b4c1" stroke-width="4"/><rect x="526" y="106" width="103" height="34" rx="7" fill="#639bad"/><rect x="541" y="173" width="73" height="46" rx="6" fill="#fff" stroke="#c4d7df"/></g>'+tx(577,194,"QC CONTROL",12,"#2d7483")+tx(583,318,"APPROVED QC LOT",14,"#487d8c");}
 if(mode==="qc-dip")art+=(isHcg?cassette(590,260):strip(592,240,-20))+
  tx(583,335,"CONTROL MATERIAL",13,"#287a83");
 if(mode==="strip"){art+=isHcg?cassette(590,200):strip(570,188,0);
  art+=tx(576,329,isHcg?"hCG CASSETTE":"UA DIPSTICK",15);}
 if(mode==="dip"){art+=cup(499,68)+(isHcg?cassette(596,264):strip(580,173,-23))+
  '<path d="M612 105C645 123 648 161 621 175" fill="none" stroke="#27958b" stroke-width="5"/>';}
 if(mode==="table"){art+='<rect x="474" y="255" width="236" height="35" rx="8" fill="#edf3f5" stroke="#99b4c1" stroke-width="3"/>';
  art+=isHcg?cassette(593,263):strip(592,263,90);
  art+=tx(588,321,"TEST TABLE",15,"#3e7c8d");}
 if(mode==="start")art+=(isHcg?cassette(592,207):strip(596,204,45))+tx(587,336,"SELECT START",15,"#1a8578");
 if(mode==="dispense"){art+=cassette(587,245)+
  '<path d="M556 106L577 176" stroke="#8caebd" stroke-width="9" stroke-linecap="round"/>'+
  '<path d="M578 179Q590 189 578 205Q565 191 578 179Z" fill="#d7b58e"/>'+
  tx(590,335,"PIPETTE INTO SAMPLE WELL",13,"#247989");}
 if(mode==="results")art+=tx(587,197,isHcg?"CLINITEST hCG":"URINALYSIS",17,"#2a718a")+tx(587,225,"RESULTS",20,"#2a718a");
 return svg(art,"Siemens CLINITEK Status+ analyzer and "+(mode==="specimen"?"urine cup with "+testName:mode==="select"?"selected "+testName+" screen":mode==="dip"?"urine dipstick dipped in urine":mode==="table"?testName+" on test table":mode==="start"?"Start button selected":"result display"));
}
function render(title,group){
 const g=String(group||"").toLowerCase(),t=String(title||"").toLowerCase();
 const kind=/hcg|cassette/.test(g)?"hcg":"ua";
 const qc=/qc/.test(g);
 if(!/ua-strip|hcg-cassette|ua-qc|hcg-qc/.test(g))return "";
 if(/confirm urine|verify urine|confirm specimen|check specimen/.test(t))
  return fig(qc?"Confirm urine control and test materials":"CLINITEK + urine cup + "+(kind==="hcg"?"hCG cassette":"UA strip"),scene(kind,"specimen"),
     qc?"Verify the correct QC material, lot and expiration before testing.":"Verify fresh urine in a clean cup, patient ID and correct test strip or cassette.");
 if(/select strip test|select cassette test|choose strip|select hcg/.test(t))
  return fig("Select "+(kind==="hcg"?"Cassette Test":"Strip Test")+" on the analyzer",scene(kind,"select"),
     "Select the correct test type and confirm patient ID or QC entry on the analyzer.");
 if(qc&&/prepare.*control|quality control/.test(t))return fig("Prepare approved QC controls",scene(kind,"qc-material"),"Confirm the correct QC material, level, lot, and expiry. Use the approved assay-specific procedure.");
 if(/prepare the ua|prepare the strip|prepare hcg|prepare and place|prepare urinalysis controls|prepare control/.test(t))
  return fig("Prepare "+(kind==="hcg"?"CLINITEST hCG cassette":"UA dipstick"),scene(kind,"strip"),
     "Check expiration and remove one compatible unused "+(kind==="hcg"?"cassette":"reagent strip")+".");
 if(qc&&/open.*qc|qc test/.test(t))
  return fig("Open QC test mode",scene(kind,"qc"),"Choose the correct QC menu and confirm control ID and lot.");
 if(kind==='hcg'&&/dispense urine|dispense qc material|apply.*sample/.test(t))
  return fig(qc?"Dispense approved hCG QC":"Dispense urine into hCG cassette",scene(kind,"dispense"),
   "Apply the assay-specified volume with the supplied transfer pipette into the cassette sample well.");
 if(kind==='hcg'&&/press start|place cassette and select start/.test(t))return fig("Select START before applying specimen",scene(kind,"start"),"Start the hCG cassette workflow first, then use the kit pipette and approved volume.");
 if(qc&&/run each control/.test(t))
  return fig("Run controls using the urinalysis strip method",scene(kind,"qc-dip"),
   "Use approved control material and the correct QC mode, not a patient urine cup.");
 if(/press start|dip and blot|dip.*strip|run each control/.test(t))
  return fig("Press START, dip and blot",scene(kind,"dip"),
     qc?"Apply controls according to the lot-specific SOP.":"Press START, immerse the reagent pads, then blot the strip as directed by the approved procedure.");
 if(/place.*test table|place.*strip|place cassette/.test(t))
  return fig("Place "+(kind==="hcg"?"cassette":"strip")+" on analyzer test table",scene(kind,"table"),
    "Seat the test device flat in the correct test-table position. Do not place the urine cup on the table.");
 if(/start|begin test|analyze/.test(t))return fig("Start the selected test",scene(kind,"start"),"Confirm test selection and start analysis.");
 if(/review|document|print|result/.test(t))
  return fig("Review and document results",scene(kind,"results"),"Verify the patient ID, QC status, and analyzer result before documenting.");
 if(qc)return fig("CLINITEK QC step",scene(kind,"select"),"Follow the correct QC workflow, materials, and prompts in the approved site SOP.");
 return fig("CLINITEK urine workflow",scene(kind,"specimen"),"Urine specimens only. Use the correct Siemens strip or CLINITEST cassette.");
}
window.LAB_CLINITEK_FOCUSED={render};
})();