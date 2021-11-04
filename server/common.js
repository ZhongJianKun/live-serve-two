//文件筛选
const fileFilter = (fileName) =>{
    const list =  ['.html',".js",".css",".gif",".jpg",".png"];
    return list.some(item => fileName.includes(item));
}
// 节流
const throttle = function(func, delay) {            
    var timer = null;
    console.log('进来了1');            
    return function() {
        console.log('进来了；');                
        var context = this;               
        var args = arguments;                
        if (!timer) {         
            timer = setTimeout(function() {
                console.log('执行了=====================');                          
                func.apply(context, args);                        
                timer = null;                    
            }, delay);                
        }            
    }        
}   
module.exports = {fileFilter,throttle};