
import StitchImage from './stitchImage.js';
import cropImageData from 'crop-image-data'
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

            const topImg = toImageData(this.images[i])
            const botImg = toImageData(this.images[i+1])
            const stitchImage = new StitchImage(topImg, botImg)
            stitchImage.findBestOverlapAreas()
            this.listMergeInfors.push(stitchImage)
            console.log('stitchImage', stitchImage)
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


        const { topImage,
            botImage,
            beginOverlapTopImageRow,
            beginOverlapBotImageRow
        } = stitchInfo

        const resultHeight = beginOverlapTopImageRow + botImage.height - beginOverlapBotImageRow
        
        console.log({resultHeight})

        //截掉重叠部分
        const cropBotImage = cropImageData(botImage, { top: beginOverlapBotImageRow })

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d');
        canvas.width = topImage.width
        canvas.height = resultHeight
        ctx.putImageData(topImage, 0, 0)
        ctx.putImageData(cropBotImage, 0, beginOverlapTopImageRow)
        const imageData = ctx.getImageData(0, 0, topImage.width, resultHeight)


        return imageData
    }

}

export default Stitch