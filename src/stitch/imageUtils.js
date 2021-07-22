/**
 * 图片对象转数组
 * @param {*} image 
 */
export function toImageData(image,scale =false) {
    const { width, height } = image
    const radio = scale ? 750 / width :1
    const canvas = document.createElement("canvas")
    const context = canvas.getContext('2d');
    const w = width * radio
    const h = height * radio
    canvas.width = w;
    canvas.height = h
    context.scale(radio, radio)
    context.drawImage(image, 0, 0)
    const imageData = context.getImageData(0, 0, w, h)

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
            sum += data[index] + data[index + 1] + data[index + 2] + data[index + 3];
            index += 4
        }
        lines.push(sum)
    }
    return lines
}