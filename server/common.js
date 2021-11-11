const fs = require("fs");
//文件筛选
const fileFilter = (fileName) => {
        const list = ['.html', ".js", ".css", ".gif", ".jpg", ".png"];
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

//查找指定文件列表下的所有文件
function findFileList(url) {
    return new Promise((resolve, reject) => {
        fs.readdir(url, function(err, files) {
            //声明一个数组存储目录下的所有文件夹
            var floder = [];
            //从数组的第一个元素开始遍历数组
            (function iterator(i) {
                //遍历数组files结束
                console.log(files, 'files');
                console.log(i , files.length,'i == files.length');
                resolve(files)
                floder.push(files[i]);
            })(0)
        })
    })
}
module.exports = { fileFilter, throttle, findFileList };