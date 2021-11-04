// 监听文件
const {fileFilter} = require('./common')
const watch = require('node-watch');
const path=require('path');
const {wsServer} = require('./ws');
const watchFile = {
  //监听的那个文件夹之下
  watchURL:null,
  //保存所有依赖
  dependFileTree:{},
  //临时保持依赖以作对比
  temporaryFileTree:{},
  //收集一次更新的所有改动的文件
  collectUpdateFile:[],
  onWatch(url){
    this.watchURL = url;
    let time = null;
    let then = this;
    // diffDepend.bind(this)
    watch(url,{ recursive: true }, function (env,newUrl) {
      //防抖， 进来重新清空定时器重新
      then.collectUpdateFile.push(newUrl);
      if (time != null) {
        clearTimeout(time);
        time = null;
      }
      time = setTimeout(()=>{
        then.collectUpdateFile = [...new Set(then.collectUpdateFile)];
        then.collectUpdateFile.forEach(item =>{
          diffDepend.bind(then,item)()
        })
        then.collectUpdateFile = [];
        clearTimeout(time);
        time = null;
      },500)
      // diffDepend.bind(than,env,newUrl)
    });
  },
  dependFile(url){
    createFileTree(url.split('/'),this.dependFileTree)
  }
};

//对比改动的文件是否是在依赖中的
const diffDepend = function(newUrl){
    console.log('diffDepend.call(than,name);',this);
    let url = (newUrl + "").split('\\');
    createFileTree(url,this.temporaryFileTree);
    console.log(JSON.stringify(this.temporaryFileTree),'this.temporaryFileTree');
    console.log(JSON.stringify(this.dependFileTree),'this.dependFileTree');
    for (const dependItem in this.dependFileTree) {
      for (const temporaryItem in this.temporaryFileTree) {
          if (dependItem == temporaryItem && 
             (JSON.stringify(this.dependFileTree[dependItem]) === 
              JSON.stringify(this.temporaryFileTree[temporaryItem]))) {
              console.log('可以进行更新');
              const parmas = {
                url:url.join('/'),
                extName:path.extname(newUrl),
                fileUrl:url.join('/').slice(this.watchURL.length+1)
              }
              if (path.extname(newUrl) === ".css") {
                parmas.type = "cssLoad"
                wsServer.onSend(parmas,url.join('/').slice(this.watchURL.length+1));
              }else{
                parmas.type = "load"
                wsServer.onSend(parmas,url.join('/').slice(this.watchURL.length+1));
              }
          }
      }
    }
    // this.temporaryItem = {};
    // console.log(this.temporaryItem,'我清空了');
}

//生成文件节点树
const createFileTree = (url,dependStorage) =>{
    try {
      const urlArr = url;
      let last = urlArr.length - 1;
      if(!fileFilter(path.extname(urlArr[last]))) return ;
      if (!dependStorage[urlArr[last]]) {
          dependStorage[urlArr[last]] = {};
      };
      create.call(this,urlArr,0,dependStorage[urlArr[last]]);   
    } catch (error) {
        console.log(error,'error1');
    }
    function create(urlArr,index,start) {
      let next = urlArr[index+1];
      if (!next) return;
      let cur = start[urlArr[index]] = {
          [next]:{}
      };
      create(urlArr,index+1,cur)   
    }
}

module.exports = watchFile;