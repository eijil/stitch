//todo/ 使用webwoker处理

import Stitch from './stitch'


self.addEventListener('message', function async (e) {  
   this.setTimeout(()=>{
    self.postMessage('stitch done')
},1000)


}, false);