// import WebSocket, { WebSocketServer } from 'ws';

const { WebSocket }  = require('ws')

//发送开启定时器，并收集已经发送过更新的文件名，如果已经发送过了，就
exports.wsServer = {
    // new 之后的ws
    ws:null,
    onWsServer:  (server)=>{
        try {
          const then = this;
          const wss = new WebSocket.Server({ server });
          wss.on('connection', function connection(ws) {
            then.wsServer.ws = ws;
            console.log('已连接');
            ws.on('message', function incoming(data, isBinary) {
              
            });
          });   
        } catch (error) {
            
        }
    },
    //两种 页面重载和css 重载
    onSend(parmas){
      console.log('给客户端发送消息');
      this.ws.send(JSON.stringify(parmas))
    }
}