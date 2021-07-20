import{c as e,r as t,R as a,L as s,P as i,a as r,C as o,S as l,U as n,B as g,b as p,D as h,d as m,I as c,_ as u,e as I}from"./vendor.ea43c164.js";function d(e){const{width:t,height:a}=e,s=document.createElement("canvas"),i=s.getContext("2d");s.width=t,s.height=a,i.drawImage(e,0,0);return i.getImageData(0,0,t,a)}function v(e){const{width:t,height:a,data:s}=e;let i,r=0;const o=[];for(let l=0;l<a;l++){i=0;for(let e=0;e<t;e++)i+=s[r]+s[r+1]+s[r+2],r+=4;o.push(i)}return o}class f{constructor(e,t){this.topImage=e,this.botImage=t,this.lowerBound=1,this.upperBound=1,this.overlapAreas=[],this.isSameImage=!1,this.isValidOverlapInfos=!1,this.beginOverlapTopImageRow=0,this.beginOverlapBotImageRow=0,this.overlapLength=0}findBestOverlapAreas(){this.findAllOverlapAreas(),this.selectBestOverlapArea(),this.checkOrderedOfImages()}findAllOverlapAreas(){for(;!this.isValidOverlapInfos&&this.lowerBound>=.99&&!this.isSameImage;)console.log(`Stitching with lowerBound: ${this.lowerBound}, upperBound:${this.upperBound}`),this.calcultateOverlap(),this.lowerBound-=.01,this.upperBound+=.01,this.verifyDetectedOverlapAreas(),console.log(this.overlapAreas)}calcultateOverlap(){if(this.topImage&&this.botImage){const e=v(this.topImage),t=v(this.botImage),a=e.length,s=t.length,i=[[],[]];for(let r=0;r<s;r++)i[0][r]=i[1][r]=0;for(let r=0;r<a;r++){if(r>a/5&&.6*r<=this.overlapAreas.length){console.log("much overlap");break}let o=e[r];for(let e=0;e<s;e++){let a=t[e];if(this.isApproximateTo(o,a)){let t=0;if(0!==e){t=i[(r+1)%2][e-1]+1}if(i[r%2][e]=t,t>80){const a={};a.overlapHeight=t,a.beginOverlapTopImage=r-t+1,a.beginOverlapBotImage=e-t+1,a.distance=a.beginOverlapTopImage-a.beginOverlapBotImage,a.distance>10&&this.addToListInfor(a)}}else i[r%2][e]=0}}}}selectBestOverlapArea(){for(const e of this.overlapAreas)e.overlapHeight>this.overlapLength&&(this.overlapLength=e.overlapHeight,this.beginOverlapTopImageRow=e.beginOverlapTopImage,this.beginOverlapBotImageRow=e.beginOverlapBotImage)}checkOrderedOfImages(){if(this.beginOverlapTopImageRow<this.beginOverlapBotImageRow){let e=this.beginOverlapTopImageRow,t=this.topImage;this.beginOverlapTopImageRow=this.beginOverlapBotImageRow,this.beginOverlapBotImageRow=e,this.topImage=this.botImage,this.botImage=t}}addToListInfor(e){let t=!1;for(const a of this.overlapAreas)if((this.isApproximateIndex(e.beginOverlapBotImage,a.beginOverlapBotImage)||this.isApproximateIndex(e.beginOverlapTopImage,a.beginOverlapTopImage))&&this.isApproximateIndex(e.overlapHeight,a.overlapHeight)&&(t=!0,e.overlapHeight>a.overlapHeight)){a.overlapHeight=e.overlapHeight,e.beginOverlapTopImage<a.beginOverlapTopImage&&(a.beginOverlapTopImage=e.beginOverlapTopImage),e.beginOverlapBotImage>a.beginOverlapBotImage&&(a.beginOverlapBotImage=e.beginOverlapBotImage);break}t||this.overlapAreas.push(e)}verifyDetectedOverlapAreas(){for(const e of this.overlapAreas){if(0===e.distance&&e.overlapHeight>.99*this.topImage.height){this.isSameImage=!0;break}e.distance>100&&(this.isValidOverlapInfos=!0)}}isApproximateTo(e,t){return t>=e*this.lowerBound&&t<=e*this.upperBound}isApproximateIndex(e,t){return e>=t-8&&e<=t+8}currentDistance(){return this.beginOverlapTopImageRow-this.beginOverlapBotImageRow}sufficientOverlapHeight(){return.3*this.topImage.height}}class O{constructor(e){this.images=e,this.result=null,this.init()}init(){this.listMergeInfors=[],this.calculateMergeInfors(),this.stitch()}calculateMergeInfors(){for(let e=0;e<this.images.length-1;e++){const t=d(this.images[e]),a=d(this.images[e+1]),s=new f(t,a);s.findBestOverlapAreas(),this.listMergeInfors.push(s),console.log("stitchImage",s)}}stitch(){let e;for(let t=0;t<this.listMergeInfors.length;t++)0!==t?(this.listMergeInfors[t].beginOverlapTopImageRow=this.listMergeInfors[t-1].beginOverlapTopImageRow+this.listMergeInfors[t].beginOverlapTopImageRow-this.listMergeInfors[t-1].beginOverlapBotImageRow,this.listMergeInfors[t].topImage=e,e=this.generateImage(this.listMergeInfors[t])):e=this.generateImage(this.listMergeInfors[t]);this.result=e}generateImage(t){const{topImage:a,botImage:s,beginOverlapTopImageRow:i,beginOverlapBotImageRow:r}=t,o=i+s.height-r;console.log({resultHeight:o});const l=e(s,{top:r}),n=document.createElement("canvas"),g=n.getContext("2d");n.width=a.width,n.height=o,g.putImageData(a,0,0),g.putImageData(l,0,i);return g.getImageData(0,0,a.width,o)}}const{Content:b}=s;function w(e){return new Promise(((t,a)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=()=>t(s.result),s.onerror=e=>a(e)}))}function B(){const[e,I]=t.exports.useState([{uid:0,name:0,url:"/stitch/assets/0.a6d352a3.jpg"},{uid:1,name:1,url:"/stitch/assets/1.6169f561.jpg"},{uid:2,name:2,url:"/stitch/assets/2.3dcc1a00.jpg"},{uid:3,name:3,url:"/stitch/assets/3.55cea401.jpg"},{uid:4,name:4,url:"/stitch/assets/4.b7c612f3.jpg"},{uid:5,name:5,url:"/stitch/assets/5.8e1ee4b2.jpg"},{uid:6,name:6,url:"/stitch/assets/6.51b4f8c2.jpg"}]),[d,v]=t.exports.useState(""),[f,B]=t.exports.useState(!1),E=async()=>(e=>{const t=[];return e.forEach((e=>{const a=new Promise(((t,a)=>{const s=document.createElement("img");s.src=e,s.onload=()=>{t(s)},s.onerror=()=>{a()}}));t.push(a)})),Promise.all(t)})(e.map((e=>e.url)));return a.createElement("div",{className:"App"},a.createElement(s,null,a.createElement(i,{title:"截图合成工具"}),a.createElement(b,null,a.createElement(r,{justify:"space-between"},a.createElement(o,null,a.createElement(l,null,a.createElement(n,{accept:".jpg,.jpeg",fileList:e,multiple:!0,listType:"picture",onChange:async e=>{let t=e.fileList;for(let a of t)a.url||(a.url=await w(a.originFileObj));I(u.sortBy(t,["lastModified"]))},beforeUpload:()=>!1,showUploadList:!1},a.createElement(g,{type:"primary",icon:a.createElement(p,null),size:"large"},"Upload")),a.createElement(g,{size:"large",icon:a.createElement(h,null),onClick:()=>{v(""),I([])}},"Clean"))),a.createElement(o,null,a.createElement(g,{type:"primary",size:"large",disabled:!(e.length>=2),loading:f,onClick:async()=>{B(!0),console.time("stitch");const e=await E(),t=new O([...e]),a=document.createElement("canvas");a.width=t.result.width,a.height=t.result.height;a.getContext("2d").putImageData(t.result,0,0),v(a.toDataURL("image/jpeg")),console.timeEnd("stitch"),B(!1)}},"Stitch"))),a.createElement(m,null),a.createElement("div",{className:"upload-preview"},a.createElement(c.PreviewGroup,null,e.map((e=>a.createElement(c,{key:e.uid,alt:e.name,width:100,src:e.url}))))),a.createElement(r,{justify:"center"},a.createElement(o,{span:12},d&&a.createElement(c,{src:d}))),a.createElement("div",{className:"result"}))))}console.log("0.0.2"),I.render(a.createElement(a.StrictMode,null,a.createElement(B,null)),document.getElementById("root"));
