// import WebSocket, { WebSocketServer } from 'ws';

const { WebSocket }  = require('ws')

exports.wsServer = {
    onWsServer:  (server)=>{
        try {
          const wss = new WebSocket.Server({ server });
          wss.on('connection', function connection(ws) {
            // console.log('已连接');
            ws.on('message', function incoming(data, isBinary) {
              
            });
          });   
        } catch (error) {
            
        }
    }
}