
import StitchImage from './stitchImage.js';
import  cropImageData  from 'crop-image-data'
import { toImageData } from './imageUtils'
class Stitch {
    constructor(images) {
        this.images = images
        this.result = null
        this.init()
    }
    init() {
        this.listMergeInfors = []
        this.calculateMergeInfors()
        this.stitch()
       
    }
   
    calculateMergeInfors() {
        
        for (let i = 0; i < this.images.length - 1; i++) {
            const topImg = toImageData(this.images[i],true)
            const botImg = toImageData(this.images[i + 1], true)
            let stitchImage = new StitchImage(topImg, botImg)
            stitchImage.findBestOverlapAreas()
            console.log('stitchImage', stitchImage)
            if (stitchImage.beginOverlapTopImageRow === stitchImage.beginOverlapBotImageRow){
                if(i===0){
                    stitchImage.botImage = stitchImage.topImage
                    this.listMergeInfors.push(stitchImage)
                }
                break;
            }
            this.listMergeInfors.push(stitchImage)
        }
        

    }
    stitch() {

        let result;
        

        for (let i = 0; i < this.listMergeInfors.length; i++) {
            if (i !== 0) {
                this.listMergeInfors[i].beginOverlapTopImageRow =
                this.listMergeInfors[i - 1].beginOverlapTopImageRow +
                this.listMergeInfors[i].beginOverlapTopImageRow -
                this.listMergeInfors[i - 1].beginOverlapBotImageRow;
                this.listMergeInfors[i].topImage = result;
                result = this.generateImage(this.listMergeInfors[i]);
            } else {
                result = this.generateImage(this.listMergeInfors[i]);
            }
        }
      

        this.result = result
    }
    generateImage(stitchInfo) {


        const { 
            topImage,
            botImage,
            beginOverlapTopImageRow,
            beginOverlapBotImageRow
        } = stitchInfo

        const resultHeight = beginOverlapTopImageRow + botImage.height - beginOverlapBotImageRow
        
        //console.log({resultHeight})


        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d');
        canvas.width = topImage.width
        canvas.height = resultHeight
        const botImgTop = resultHeight - botImage.height
        ctx.putImageData(topImage, 0, 0)
        //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData
        ctx.putImageData(
              botImage,
              0, botImgTop, 
              0, beginOverlapBotImageRow ,
              botImage.width, 
              botImage.height - beginOverlapBotImageRow )
        
    
      
        // crop imageData方式 ，性能问题，内存占用多10-20倍
        // const cropBotImage = cropImageData(botImage, { top: beginOverlapBotImageRow })
        // ctx.putImageData(cropBotImage, 0, beginOverlapTopImageRow)
       
        const imageData = ctx.getImageData(0, 0, topImage.width , resultHeight )
       
        return imageData
    }

}

export default Stitch