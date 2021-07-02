/**
 * 图片对象转数组
 * @param {*} image 
 */
export function toImageData(image) {
    const { width, height } = image
    const canvas = document.createElement("canvas")
    const context = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height
    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, width, height)

    return imageData

}

export function toLineSumPixel(imageData) {

    
    const { width, height, data } = imageData
    let index = 0;
    let sum;
    const lines = []
    for (let row = 0; row < height; row++) {
        sum = 0;
        for (let col = 0; col < width; col++) {
            sum += data[index] + data[index + 1] + data[index + 2];
            index += 4
        }
        lines.push(sum)
    }
    return lines
}