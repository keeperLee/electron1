//使用8.1.0版本electron的时候，可以通过window对象获取到require引入的内容，但是在22.2.0版本不行
let objRender2 = require('./objRender2')  
window.objRender = { key: "value1" };
window.objRender2 = objRender2
