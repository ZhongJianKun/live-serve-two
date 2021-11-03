  const url  = require("url"),
      fs=require("fs"),
      http=require("http"),
      path = require("path");
  const {prepareInserthtml} = require('./operationHtml');
  const {wsServer} = require('./ws');
  const watchFile = require('./watchFile');
  const server =  http.createServer(function (req, res) {
      // var pathname=__dirname+url.parse(req.url).pathname;
      var pathname= 'C:/code/个人代码/编写vs code插件/test/client/index.html';
      if (path.extname(pathname)=="") {
          pathname+="/";
      }
      if (pathname.charAt(pathname.length-1)=="/"){
          pathname+="index.html";
      }
      console.log(pathname,'pathnam1e');
      //对用户访问的文件筛选进行依赖跟踪
      watchFile.dependFile('C:/code/个人代码/编写vs code插件/test/client/index.html');
      //开启文件监听
      watchFile.onWatch('C:/code/个人代码/编写vs code插件/test/client');
      fs.exists(pathname,function(exists){
          if(exists){
              setWriteHead(res,pathname);
              fs.readFile(pathname,function (err,data){
                  res.end(prepareInserthtml(data));
              });
          } else {
              res.writeHead(404, {"Content-Type": "text/html"});
              res.end("<h1>404 Not Found</h1>");
          }
      });
  }).listen(80);
  //开启ws
  wsServer.onWsServer(server);


  //设置头
  function setWriteHead(res,pathname){
    switch(path.extname(pathname)){
        case ".html":
            res.writeHead(200, {"Content-Type": "text/html"});
            break;
        case ".js":
            res.writeHead(200, {"Content-Type": "text/javascript"});
            break;
        case ".css":
            res.writeHead(200, {"Content-Type": "text/css"});
            break;
        case ".gif":
            res.writeHead(200, {"Content-Type": "image/gif"});
            break;
        case ".jpg":
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            break;
        case ".png":
            res.writeHead(200, {"Content-Type": "image/png"});
            break;
        default:
            res.writeHead(200, {"Content-Type": "application/octet-stream"});
    }
  }

  console.log("开启了哦");