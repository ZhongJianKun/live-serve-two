  const url = require("url"),
      fs = require("fs"),
      http = require("http"),
      path = require("path");
  const { wsServer } = require('./ws');
  const apiCollection = require('./api');
  const watchFile = require('./watchFile');
  const open = require('open');
  const config = require('./config');
//   var defaultUrl = 'C:/code/个人代码/编写vs code插件/test';
  //文件夹列表的html
  const fileList = path.resolve(__dirname, '/fileList/index.html');
  const serverLogic = require('./server')
//   open('http://localhost/client/index.html');
  const api = ['/api/getFileData']
  const server = http.createServer(async function(req, res) {
    const context =  await serverLogic(req,config.defaultUrl)
    const {status,contentType,content} = context; 
    res.writeHead(status, { "Content-Type": contentType });
    res.end(content);
  }).listen(80,()=>{
    console.log('80开启了，准备接受资源请求');
  });
  //开启ws
  wsServer.onWsServer(server);
  const serverApi = http.createServer(async function(req, res) {
    console.log(req.url);
    let parmas = await apiCollection[req.url]();
    res.writeHead(200,
    {"Content-Type":'application/json',
     'charset':'utf-8','Access-Control-Allow-Origin':'*',
     'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
     "Access-Control-Allow-Origin": "*"});//可以解决跨域的请求
     res.write(JSON.stringify(parmas));
     res.end();
  }).listen(8088,()=>{
      console.log('8088开启了，准备接受API请求');
  });