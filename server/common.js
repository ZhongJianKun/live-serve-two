const fs = require("fs");
//文件筛选
const fileFilter = (fileName) => {
        const list = ['.html', ".js", ".css", ".gif", ".jpg", ".png"];
        return list.some(item => fileName.includes(item));
    }
    // 节流
const throttle = function(func, delay) {
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
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
                resolve(files)
                floder.push(files[i]);
            })(0)
        })
    })
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
                resolve(files)
                floder.push(files[i]);
            })(0)
        })
    })
}

//查找指定文件列表下的所有文件 并返回所有文件信息 x 类型
async function findFileInfo(url) {
    let arr = [];
    let list = await findFileList(url);
    list.forEach(item =>{
        fs.stat(url +'/' + item,function (err,stats) {
            let pathUrl = url + '/'+item;
            arr.push({
                fileName:item,
                completePath:pathUrl,
                isFile:stats == undefined ? '' :stats.isFile(),
                isDirectory:stats == undefined? '' :stats.isDirectory()
            })
        })
    })
    return arr
}
module.exports = { fileFilter, throttle, findFileList ,findFileInfo};