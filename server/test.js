const fs = require('fs');

function findFileList(url) {
    return new Promise((resolve, reject) => {
        fs.readdir(url, function(err, files) {
            //声明一个数组存储目录下的所有文件夹
            var floder = [];
            //从数组的第一个元素开始遍历数组
            (function iterator(i) {
                //遍历数组files结束
                console.log(files, 'files');
                if (i == files.length) {
                    resolve(files)
                }
                floder.push(files[i]);
            })(0)
        })
    })
}

findFileList('C:/code/个人代码/编写vs code插件/test/client')
    .then(res => {
        console.log(res);
    })