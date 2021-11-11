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
    console.log(isDefault,'isDefault');
   //默认不返回文件列表的html
   //当前访问的url
   const {url:route} = req;
   const parmas = route.split('?')[1];
   let pathname = defaurl + url.parse(route).pathname;
   if (parmas == "x=x") {
       console.log('访问的是文件列表的资源');
       pathname = dealWithResources(route)
   }
   console.log(route,'route');
   console.log(__dirname,'__dirname');
   let fileListHtml = path.resolve(__dirname, './fileList/index.html');
//    fileListHtml = fileListHtml.split('\\');
//    fileListHtml = fileListHtml.join('/')
   //如果访问不带文件路径
   if (path.extname(pathname) == "") {
       try {
           let data = await findFileList(pathname)
           if (data.includes('index.html')) {
               console.log('工作文件');
               isDefault = true;
               //如果当前目录下面有index.html，就返回html
               pathname +='index.html'
           }else{
               let listData = await findFileInfo(pathname)
               //否则返回文件列表的html
               isDefault = true;
               pathname = fileListHtml;
               //使用ws 向html发送文件信息
               console.log(wsServer,'wsServer');
               setTimeout(()=>{
                 wsServer.onSend(listData)  
               },500)
           }
       } catch (error) {
           console.log(error,'eerror');
       };
   }
   //开启文件监听
   watchFile.onWatch('C:/code/个人代码/编写vs code插件/test/client');
   console.log(pathname, '最后返回的pathname');
   let exists = fs.existsSync(pathname);
   console.log(exists,'exists');
   if (exists) {
       let curFileFile = setWriteHead(pathname);
       //对用户访问的文件筛选进行依赖跟踪
       watchFile.dependFile(pathname);
       let fileData = fs.readFileSync(pathname);
       curFileFile.content = curFileFile.extName == "html" && !isDefault ? prepareInserthtml(fileData) : fileData;
       console.log(curFileFile,'curFileFile');
       return curFileFile;
   } else {
       console.log(pathname,'没有找到');
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
            headInfo.contentType = "application/octet-stream";
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