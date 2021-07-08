import{c as e,r as t,R as a,L as i,P as r,a as s,C as o,S as l,U as n,B as g,b as p,D as h,d as m,I as c,_ as I,e as u}from"./vendor.ea43c164.js";function v(e){const{width:t,height:a}=e,i=document.createElement("canvas"),r=i.getContext("2d");i.width=t,i.height=a,r.drawImage(e,0,0);return r.getImageData(0,0,t,a)}function d(e){const{width:t,height:a,data:i}=e;let r,s=0;const o=[];for(let l=0;l<a;l++){r=0;for(let e=0;e<t;e++)r+=i[s]+i[s+1]+i[s+2],s+=4;o.push(r)}return o}class f{constructor(e,t){this.topImage=e,this.botImage=t,this.lowerBound=1,this.upperBound=1,this.overlapAreas=[],this.isSameImage=!1,this.isValidOverlapInfos=!1,this.beginOverlapTopImageRow=0,this.beginOverlapBotImageRow=0,this.overlapLength=0}findBestOverlapAreas(){this.findAllOverlapAreas(),this.selectBestOverlapArea(),this.checkOrderedOfImages()}findAllOverlapAreas(){for(;!this.isValidOverlapInfos&&this.lowerBound>=.99&&!this.isSameImage;)console.log(`Stitching with lowerBound: ${this.lowerBound}, upperBound:${this.upperBound}`),this.calcultateOverlap(),this.lowerBound-=.01,this.upperBound+=.01,this.verifyDetectedOverlapAreas(),console.log(this.overlapAreas)}calcultateOverlap(){if(this.topImage&&this.botImage){const e=d(this.topImage),t=d(this.botImage),a=e.length,i=t.length,r=[[],[]];for(let s=0;s<i;s++)r[0][s]=r[1][s]=0;for(let s=0;s<a;s++){let a=e[s];for(let e=0;e<i;e++){let i=t[e];if(this.isApproximateTo(a,i)){let t=0;if(0!==e){t=r[(s+1)%2][e-1]+1}if(r[s%2][e]=t,t>300){const a={};a.overlapHeight=t,a.beginOverlapTopImage=s-t+1,a.beginOverlapBotImage=e-t+1,a.distance=a.beginOverlapTopImage-a.beginOverlapBotImage,this.addToListInfor(a)}}else r[s%2][e]=0}}}}selectBestOverlapArea(){for(const e of this.overlapAreas){if(e.overlapHeight>this.sufficientOverlapHeight()){this.overlapLength=e.overlapHeight,this.beginOverlapTopImageRow=e.beginOverlapTopImage,this.beginOverlapBotImageRow=e.beginOverlapBotImage;break}e.distance>this.currentDistance()&&(this.overlapLength=e.overlapHeight,this.beginOverlapTopImageRow=e.beginOverlapTopImage,this.beginOverlapBotImageRow=e.beginOverlapBotImage)}}checkOrderedOfImages(){if(this.beginOverlapTopImageRow<this.beginOverlapBotImageRow){let e=this.beginOverlapTopImageRow,t=this.topImage;this.beginOverlapTopImageRow=this.beginOverlapBotImageRow,this.beginOverlapBotImageRow=e,this.topImage=this.botImage,this.botImage=t}}addToListInfor(e){let t=!1;for(const a of this.overlapAreas)if((this.isApproximateIndex(e.beginOverlapBotImage,a.beginOverlapBotImage)||this.isApproximateIndex(e.beginOverlapTopImage,a.beginOverlapTopImage))&&this.isApproximateIndex(e.overlapHeight,a.overlapHeight)&&(t=!0,e.overlapHeight>a.overlapHeight)){a.overlapHeight=e.overlapHeight,e.beginOverlapTopImage<a.beginOverlapTopImage&&(a.beginOverlapTopImage=e.beginOverlapTopImage),e.beginOverlapBotImage>a.beginOverlapBotImage&&(a.beginOverlapBotImage=e.beginOverlapBotImage);break}t||this.overlapAreas.push(e)}verifyDetectedOverlapAreas(){for(const e of this.overlapAreas){if(0===e.distance&&e.overlapHeight>.99*this.topImage.height){this.isSameImage=!0;break}e.distance>100&&(this.isValidOverlapInfos=!0)}}isApproximateTo(e,t){return t>=e*this.lowerBound&&t<=e*this.upperBound}isApproximateIndex(e,t){return e>=t-8&&e<=t+8}currentDistance(){return this.beginOverlapTopImageRow-this.beginOverlapBotImageRow}sufficientOverlapHeight(){return.3*this.topImage.height}}class O{constructor(e){this.images=e,this.result=null,this.init()}init(){this.listMergeInfors=[],this.calculateMergeInfors(),this.stitch()}calculateMergeInfors(){for(let e=0;e<this.images.length-1;e++){const t=v(this.images[e]),a=v(this.images[e+1]),i=new f(t,a);i.findBestOverlapAreas(),this.listMergeInfors.push(i),console.log("stitchImage",i)}}stitch(){let e;for(let t=0;t<this.listMergeInfors.length;t++)0!==t?(this.listMergeInfors[t].beginOverlapTopImageRow=this.listMergeInfors[t-1].beginOverlapTopImageRow+this.listMergeInfors[t].beginOverlapTopImageRow-this.listMergeInfors[t-1].beginOverlapBotImageRow,this.listMergeInfors[t].topImage=e,e=this.generateImage(this.listMergeInfors[t])):e=this.generateImage(this.listMergeInfors[t]);this.result=e}generateImage(t){const{topImage:a,botImage:i,beginOverlapTopImageRow:r,beginOverlapBotImageRow:s}=t,o=r+i.height-s;console.log({resultHeight:o});const l=e(i,{top:s}),n=document.createElement("canvas"),g=n.getContext("2d");n.width=a.width,n.height=o,g.putImageData(a,0,0),g.putImageData(l,0,r);return g.getImageData(0,0,a.width,o)}}const{Content:b}=i;function w(e){return new Promise(((t,a)=>{const i=new FileReader;i.readAsDataURL(e),i.onload=()=>t(i.result),i.onerror=e=>a(e)}))}function B(){const[e,u]=t.exports.useState([]),[v,d]=t.exports.useState(""),[f,B]=t.exports.useState(!1),E=async()=>(e=>{const t=[];return e.forEach((e=>{const a=new Promise(((t,a)=>{const i=document.createElement("img");i.src=e,i.onload=()=>{t(i)},i.onerror=()=>{a()}}));t.push(a)})),Promise.all(t)})(e.map((e=>e.url)));return a.createElement("div",{className:"App"},a.createElement(i,null,a.createElement(r,{title:"截图合成工具"}),a.createElement(b,null,a.createElement(s,{justify:"space-between"},a.createElement(o,null,a.createElement(l,null,a.createElement(n,{accept:".jpg,.jpeg",fileList:e,multiple:!0,listType:"picture",onChange:async e=>{let t=e.fileList;for(let a of t)a.url||(a.url=await w(a.originFileObj));u(I.sortBy(t,["name"]))},beforeUpload:()=>!1,showUploadList:!1},a.createElement(g,{type:"primary",icon:a.createElement(p,null),size:"large"},"Upload")),a.createElement(g,{size:"large",icon:a.createElement(h,null),onClick:()=>{d(""),u([])}},"Clean"))),a.createElement(o,null,a.createElement(g,{type:"primary",size:"large",disabled:!(e.length>=2),loading:f,onClick:async()=>{B(!0);const e=await E(),t=new O([...e]),a=document.createElement("canvas");a.width=t.result.width,a.height=t.result.height;a.getContext("2d").putImageData(t.result,0,0),d(a.toDataURL("image/jpeg")),B(!1)}},"Stitch"))),a.createElement(m,null),a.createElement("div",{className:"upload-preview"},a.createElement(c.PreviewGroup,null,e.map((e=>a.createElement(c,{key:e.uid,alt:e.name,width:100,src:e.url}))))),a.createElement(s,{justify:"center"},a.createElement(o,{span:12},v&&a.createElement(c,{src:v}))),a.createElement("div",{className:"result"}))))}console.log("0.0.2"),u.render(a.createElement(a.StrictMode,null,a.createElement(B,null)),document.getElementById("root"));
