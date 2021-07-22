
import { toLineSumPixel } from './imageUtils'

const MIN_OVERLAP_HEIGHT = 50 //最少重叠高度
const MIN_LOWER_BOUND = 0.98   //像素的相似度

class StitchImage {

    //参数类型是canvas imageData
    constructor(topImage, botImage) {

        this.topImage = topImage
        this.botImage = botImage
       

        this.lowerBound = 1.0;
        this.upperBound = 1.0;

        this.overlapAreas = [];

        this.isSameImage = false;
        this.isValidOverlapInfos = false;

        this.beginOverlapTopImageRow = 0;
        this.beginOverlapBotImageRow = 0;
        this.overlapLength = 0
        
    }
    findBestOverlapAreas() {
        this.findAllOverlapAreas()
        this.selectBestOverlapArea()
       // this.checkOrderedOfImages()
    }
    /**
     * 查找所有重叠区域
     */
    findAllOverlapAreas() {
        while (!this.isValidOverlapInfos && this.lowerBound >= MIN_LOWER_BOUND && !this.isSameImage ) {

            console.log(`Stitching with lowerBound: ${this.lowerBound}, upperBound:${this.upperBound}`)
            
            // find overlaps:
            this.calcultateOverlap()
            
            // reduce bounds:
            this.lowerBound -= 0.01;
            this.upperBound += 0.01;

            this.verifyDetectedOverlapAreas()
            console.log(this.overlapAreas)
            
        }


    }
    calcultateOverlap() {
        if (this.topImage && this.botImage) {
            const topLines = toLineSumPixel(this.topImage);
            const botLines = toLineSumPixel(this.botImage);

            const topImgHeight = topLines.length;
            const botImgHeight = botLines.length;

            
            //init matrix
            const matrix = [[], []]
            for (let i = 0; i < botImgHeight; i++) {
                matrix[0][i] = matrix[1][i] = 0;
            }
            
            for (let i = 0; i < topImgHeight; i++) {

                //加一个判断，如果1/5高度，重叠已经超过60%则仍未有问题退出不合并
                if(i > topImgHeight / 5){
                    
                    if(i * 0.6 <=this.overlapAreas.length){
                        console.log('much overlap')
                        break;
                    }
                }

                let topLineValue = topLines[i];
                for (let j = 0; j < botImgHeight; j++) {
                
                    let botLineValue = botLines[j]
                    // if row i (TopImage) ~ row j (BotImage)
                    if (this.isApproximateTo(topLineValue, botLineValue)) {
                        // Calculate new OverlapLength -> Update
                        let currentOverlapHeight = 0
                        if (j !== 0) {
                            let preOverlapHeight = matrix[(i + 1) % 2][j - 1];
                            currentOverlapHeight = preOverlapHeight + 1;
                        }
                        // Update OverlapLength at Row i, Col j.
                        matrix[i % 2][j] = currentOverlapHeight;
                        // if DetectedOverlap > MIN_OVERLAP_HEIGHT, then Update array OverlapAreas.
                        if (currentOverlapHeight > MIN_OVERLAP_HEIGHT  ) {

                       
                            const infor = {}
                            infor.overlapHeight = currentOverlapHeight;
                            infor.beginOverlapTopImage = i - currentOverlapHeight + 1;
                            infor.beginOverlapBotImage = j - currentOverlapHeight + 1;
                           
                            this.addToListInfor(infor)
 

                        }
                    } else {
                        matrix[i % 2][j] = 0
                    }
                }

            }
        }
    }

    selectBestOverlapArea() {

       

       
        for (const infor of this.overlapAreas) {

      
            if (infor.overlapHeight > this.overlapLength ) {

                this.overlapLength = infor.overlapHeight;
                this.beginOverlapTopImageRow = infor.beginOverlapTopImage;
                this.beginOverlapBotImageRow = infor.beginOverlapBotImage;

            } 
            
         
        }

      


    }
    checkOrderedOfImages() {
        if (this.beginOverlapTopImageRow < this.beginOverlapBotImageRow) {
            let tempIndex = this.beginOverlapTopImageRow;
            let tempImg = this.topImage;

            this.beginOverlapTopImageRow = this.beginOverlapBotImageRow;
            this.beginOverlapBotImageRow = tempIndex;
            this.topImage = this.botImage;
            this.botImage = tempImg;
        }
    }



    addToListInfor(inputInfor) {
        let isExisted = false;

        for (const infor of this.overlapAreas) {
          
            if ((this.isApproximateIndex(inputInfor.beginOverlapBotImage, infor.beginOverlapBotImage) ||
                this.isApproximateIndex(inputInfor.beginOverlapTopImage, infor.beginOverlapTopImage)) &&
                this.isApproximateIndex(inputInfor.overlapHeight, infor.overlapHeight)) {
                isExisted = true;
                if (inputInfor.overlapHeight > infor.overlapHeight) {
                    infor.overlapHeight = inputInfor.overlapHeight;

                    if (inputInfor.beginOverlapTopImage < infor.beginOverlapTopImage) {
                        infor.beginOverlapTopImage = inputInfor.beginOverlapTopImage;
                    }

                    if (inputInfor.beginOverlapBotImage > infor.beginOverlapBotImage) {
                        infor.beginOverlapBotImage = inputInfor.beginOverlapBotImage;
                    }
                    break;
                }
            }
        }


        if (!isExisted) {
            
            this.overlapAreas.push(inputInfor)
            
        }
    }
    verifyDetectedOverlapAreas() {

        const validOverlapAreas = []
        
        for (const infor of this.overlapAreas) {
            let distance = infor.beginOverlapTopImage - infor.beginOverlapBotImage
            // if is the same image:
            if (distance === 0 && infor.overlapHeight > 0.99 * this.topImage.height ) {
                console.log('same')
                this.isSameImage = true;
                validOverlapAreas.push(infor)
                break;
            }

            if (distance > 100) {
                this.isValidOverlapInfos = true;
                validOverlapAreas.push(infor)

            }
        }
        this.overlapAreas = validOverlapAreas
    }

    isApproximateTo(x, y) {
        return y >= x * this.lowerBound && y <= x * this.upperBound;
    }
    isApproximateIndex(x, y) {
        return x >= y - 8 && x <= y + 8
    }
    currentDistance() {
        return this.beginOverlapTopImageRow - this.beginOverlapBotImageRow;
    }
    sufficientOverlapHeight() {
        return 0.3 * this.topImage.height;   // 30% height of TopImage
    }
}


export default StitchImage