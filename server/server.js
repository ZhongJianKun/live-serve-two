//处理服务访问逻辑

const url = require('url');
const path = require("path");
const fs = require("fs");
const { findFileList ,findFileInfo } = require('./common');
const { prepareInserthtml } = require('./operationHtml');
const watchFile = require('./watchFile');
let isDefault = false;
const {wsServer} = require('./ws');
const serverLogic = async (req,defaurl) =>{
   //默认不返回文件列表的html
   //当前访问的url
   const {url:route} = req;
   const parmas = route.split('?')[1];
   let pathname = decodeURI(defaurl + url.parse(route).pathname)
   if (parmas == "x=x") {
       pathname = decodeURI(dealWithResources(route))
   }
   let fileListHtml = path.resolve(__dirname, './fileList/index.html');
   //如果访问不带文件路径
   if (path.extname(pathname) == "") {
       console.log('当前的访问不带文件路径,是目录',pathname);
       try {
           let data = await findFileList(pathname)
           if (data.includes('index.html')) {
               console.log('工作文件');
               isDefault = true;
               //如果当前目录下面有index.html，就返回html
               pathname +='index.html'
           }else{
               // pathname = pathname.endsWith
               console.log(pathname,'访问的路径xxxx');
               let listData = await findFileInfo(pathname)
               //否则返回文件列表的html
               isDefault = true;
               pathname = fileListHtml;
               //使用ws 向html发送文件信息
               setTimeout(()=>{
                 wsServer.onSend(listData)  
               },1000)
           }
       } catch (error) {
           console.log(error,'eerror');
       };
   }
   //开启文件监听
   watchFile.onWatch('C:/code/个人代码/编写vs code插件/test/client');
   let exists = fs.existsSync(pathname);
   if (exists) {
       let curFileFile = setWriteHead(pathname);
       //对用户访问的文件筛选进行依赖跟踪
       watchFile.dependFile(pathname);
       let fileData = fs.readFileSync(pathname);
       curFileFile.content = curFileFile.extName == "html" && !isDefault ? prepareInserthtml(fileData) : fileData;
       return curFileFile;
   } else {
       return ({
         status:404,
         extName:'',
         contentType:"text/html",
         content:"<h1>404 Not Found 没有找到你的页面</h1>"
       })
   }
} 

  //设置头
  function setWriteHead(pathname) {
    let headInfo = {
        status:200,
        extName:'',
        contentType:'',
    };
    headInfo.extName = path.extname(pathname);
    switch (path.extname(pathname)) {
        case ".html":
            headInfo.contentType = "text/html";
            break;
        case ".js":
            headInfo.contentType = "text/javascript";
            break;
        case ".css":
            headInfo.contentType = "text/css";
            break;
        case ".gif":
            headInfo.contentType = "image/gif";
            break;
        case ".jpg":
            headInfo.contentType = "image/jpeg";
            break;
        case ".png":
            headInfo.contentType = "image/png";
            break;
        default:
            headInfo.contentType = "text/html";
    }
    return headInfo;   
}

//处理文件列表的资源路径
function dealWithResources(route) {
    let url = route.split('?')[0].split('/');
    let fileName =url[url.length-1];
    let before = fileName.includes('iconfont') ? 'iconfont' : 'common';
    return path.resolve(__dirname, `./fileList/${before}/${fileName}`);
}

module.exports = serverLogic;