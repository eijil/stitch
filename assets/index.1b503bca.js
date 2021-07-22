import{r as e,R as t,L as a,P as s,a as i,C as r,S as l,U as o,B as n,b as g,D as p,c as h,I as m,_ as c,d as u}from"./vendor.039c3a11.js";function I(e,t=!1){const{width:a,height:s}=e,i=t?750/a:1,r=document.createElement("canvas"),l=r.getContext("2d"),o=a*i,n=s*i;r.width=o,r.height=n,l.scale(i,i),l.drawImage(e,0,0);return l.getImageData(0,0,o,n)}function v(e){const{width:t,height:a,data:s}=e;let i,r=0;const l=[];for(let o=0;o<a;o++){i=0;for(let e=0;e<t;e++)i+=s[r]+s[r+1]+s[r+2]+s[r+3],r+=4;l.push(i)}return l}class d{constructor(e,t){this.topImage=e,this.botImage=t,this.lowerBound=1,this.upperBound=1,this.overlapAreas=[],this.isSameImage=!1,this.isValidOverlapInfos=!1,this.beginOverlapTopImageRow=0,this.beginOverlapBotImageRow=0,this.overlapLength=0}findBestOverlapAreas(){this.findAllOverlapAreas(),this.selectBestOverlapArea()}findAllOverlapAreas(){for(;!this.isValidOverlapInfos&&this.lowerBound>=.98&&!this.isSameImage;)console.log(`Stitching with lowerBound: ${this.lowerBound}, upperBound:${this.upperBound}`),this.calcultateOverlap(),this.lowerBound-=.01,this.upperBound+=.01,this.verifyDetectedOverlapAreas(),console.log(this.overlapAreas)}calcultateOverlap(){if(this.topImage&&this.botImage){const e=v(this.topImage),t=v(this.botImage),a=e.length,s=t.length,i=[[],[]];for(let r=0;r<s;r++)i[0][r]=i[1][r]=0;for(let r=0;r<a;r++){if(r>a/5&&.6*r<=this.overlapAreas.length){console.log("much overlap");break}let l=e[r];for(let e=0;e<s;e++){let a=t[e];if(this.isApproximateTo(l,a)){let t=0;if(0!==e){t=i[(r+1)%2][e-1]+1}if(i[r%2][e]=t,t>50){const a={};a.overlapHeight=t,a.beginOverlapTopImage=r-t+1,a.beginOverlapBotImage=e-t+1,this.addToListInfor(a)}}else i[r%2][e]=0}}}}selectBestOverlapArea(){for(const e of this.overlapAreas)e.overlapHeight>this.overlapLength&&(this.overlapLength=e.overlapHeight,this.beginOverlapTopImageRow=e.beginOverlapTopImage,this.beginOverlapBotImageRow=e.beginOverlapBotImage)}checkOrderedOfImages(){if(this.beginOverlapTopImageRow<this.beginOverlapBotImageRow){let e=this.beginOverlapTopImageRow,t=this.topImage;this.beginOverlapTopImageRow=this.beginOverlapBotImageRow,this.beginOverlapBotImageRow=e,this.topImage=this.botImage,this.botImage=t}}addToListInfor(e){let t=!1;for(const a of this.overlapAreas)if((this.isApproximateIndex(e.beginOverlapBotImage,a.beginOverlapBotImage)||this.isApproximateIndex(e.beginOverlapTopImage,a.beginOverlapTopImage))&&this.isApproximateIndex(e.overlapHeight,a.overlapHeight)&&(t=!0,e.overlapHeight>a.overlapHeight)){a.overlapHeight=e.overlapHeight,e.beginOverlapTopImage<a.beginOverlapTopImage&&(a.beginOverlapTopImage=e.beginOverlapTopImage),e.beginOverlapBotImage>a.beginOverlapBotImage&&(a.beginOverlapBotImage=e.beginOverlapBotImage);break}t||this.overlapAreas.push(e)}verifyDetectedOverlapAreas(){const e=[];for(const t of this.overlapAreas){let a=t.beginOverlapTopImage-t.beginOverlapBotImage;if(0===a&&t.overlapHeight>.99*this.topImage.height){console.log("same"),this.isSameImage=!0,e.push(t);break}a>100&&(this.isValidOverlapInfos=!0,e.push(t))}this.overlapAreas=e}isApproximateTo(e,t){return t>=e*this.lowerBound&&t<=e*this.upperBound}isApproximateIndex(e,t){return e>=t-8&&e<=t+8}currentDistance(){return this.beginOverlapTopImageRow-this.beginOverlapBotImageRow}sufficientOverlapHeight(){return.3*this.topImage.height}}class f{constructor(e,t=!1){this.images=e,this.result=null,this.scale=t,this.init()}init(){this.listMergeInfors=[],this.calculateMergeInfors(),this.stitch()}calculateMergeInfors(){for(let e=0;e<this.images.length-1;e++){const t=I(this.images[e],this.scale),a=I(this.images[e+1],this.scale);let s=new d(t,a);s.findBestOverlapAreas(),s.isSameImage||this.listMergeInfors.push(s),console.log("stitchImage",s)}}stitch(){let e;for(let t=0;t<this.listMergeInfors.length;t++)0!==t?(this.listMergeInfors[t].beginOverlapTopImageRow=this.listMergeInfors[t-1].beginOverlapTopImageRow+this.listMergeInfors[t].beginOverlapTopImageRow-this.listMergeInfors[t-1].beginOverlapBotImageRow,this.listMergeInfors[t].topImage=e,e=this.generateImage(this.listMergeInfors[t])):e=this.generateImage(this.listMergeInfors[t]);this.result=e}generateImage(e){const{topImage:t,botImage:a,beginOverlapTopImageRow:s,beginOverlapBotImageRow:i}=e,r=s+a.height-i,l=document.createElement("canvas"),o=l.getContext("2d");l.width=t.width,l.height=r;const n=r-a.height;o.putImageData(t,0,0),o.putImageData(a,0,n,0,i,a.width,a.height-i);return o.getImageData(0,0,t.width,r)}}const{Content:b}=a;function O(e){return new Promise(((t,a)=>{const s=new FileReader;s.readAsDataURL(e),s.onload=()=>t(s.result),s.onerror=e=>a(e)}))}function w(){const[u,I]=e.exports.useState([{uid:0,name:0,url:"/stitch/assets/0.a6d352a3.jpg"},{uid:1,name:1,url:"/stitch/assets/1.6169f561.jpg"},{uid:2,name:2,url:"/stitch/assets/2.3dcc1a00.jpg"},{uid:3,name:3,url:"/stitch/assets/3.55cea401.jpg"},{uid:4,name:4,url:"/stitch/assets/4.b7c612f3.jpg"},{uid:5,name:5,url:"/stitch/assets/5.8e1ee4b2.jpg"},{uid:6,name:6,url:"/stitch/assets/6.51b4f8c2.jpg"}]),[v,d]=e.exports.useState(""),[w,B]=e.exports.useState(!1),E=async()=>(e=>{const t=[];return e.forEach((e=>{const a=new Promise(((t,a)=>{const s=document.createElement("img");s.src=e,s.onload=()=>{t(s)},s.onerror=()=>{a()}}));t.push(a)})),Promise.all(t)})(u.map((e=>e.url)));return t.createElement("div",{className:"App"},t.createElement(a,null,t.createElement(s,{title:"截图合成工具"}),t.createElement(b,null,t.createElement(i,{justify:"space-between"},t.createElement(r,null,t.createElement(l,null,t.createElement(o,{accept:".jpg,.jpeg",fileList:u,multiple:!0,listType:"picture",onChange:async e=>{let t=e.fileList;for(let a of t)a.url||(a.url=await O(a.originFileObj));I(c.sortBy(t,["lastModified"]))},beforeUpload:()=>!1,showUploadList:!1},t.createElement(n,{type:"primary",icon:t.createElement(g,null),size:"large"},"Upload")),t.createElement(n,{size:"large",icon:t.createElement(p,null),onClick:()=>{d(""),I([])}},"Clean"))),t.createElement(r,null,t.createElement(n,{type:"primary",size:"large",disabled:!(u.length>=2),loading:w,onClick:async()=>{B(!0),console.time("stitch");const e=await E(),t=new f([...e],!0),a=document.createElement("canvas");a.width=t.result.width,a.height=t.result.height;a.getContext("2d").putImageData(t.result,0,0),d(a.toDataURL("image/jpeg")),console.timeEnd("stitch"),B(!1)}},"Stitch"))),t.createElement(h,null),t.createElement("div",{className:"upload-preview"},t.createElement(m.PreviewGroup,null,u.map((e=>t.createElement(m,{key:e.uid,alt:e.name,width:100,src:e.url}))))),t.createElement(i,{justify:"center"},t.createElement(r,{span:12},v&&t.createElement(m,{src:v}))),t.createElement("div",{className:"result"}))))}console.log("0.0.2"),u.render(t.createElement(t.StrictMode,null,t.createElement(w,null)),document.getElementById("root"));
