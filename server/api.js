//接口请求文件
const config = require('./config');
const url = require('url');
const api = {
    '/api/getFileData': async (router)=>{
      let pathname = decodeURI(config.defaultUrl + url.parse(router).pathname);
      let listData = await findFileInfo(pathname)
      return{
          data:listData
      }
    }
}

module.exports = api;