// 监听文件
const {fileFilter} = require('./common')
const watch = require('node-watch');
const path=require('path');
const watchFile = {
  //保存所有依赖
  dependFileTree:{},
  //临时保持依赖以作对比
  temporaryFileTree:{},
  onWatch(url){
    const than = this;
    console.log(this,'this');
    watch(url, function(env,name){
        console.log(String(than.temporaryFileTree),'temporaryFileTreexx');
      than.temporaryFileTree = {};
      console.log(name,'name');
      console.log(env,'envxxsxx');
      diffDepend.call(than,name);
    });
  },
  dependFile(url){
    createFileTree(url.split('/'),this.dependFileTree)
  }
};

//对比改动的文件是否是在依赖中的
const diffDepend = function(newUrl){
    console.log(String(newUrl),'diffDepend====');
    let url = (newUrl + "").split('\\');
    console.log(url,'url');
    createFileTree(url,this.temporaryFileTree);
    console.log(JSON.stringify(this.temporaryFileTree),'temporaryFileTree');
    console.log(JSON.stringify(this.dependFileTree),'dependFileTree');
    for (const dependItem in this.dependFileTree) {
      for (const temporaryItem in this.temporaryFileTree) {
          if (dependItem == temporaryItem && JSON.stringify(this.dependFileTree[dependItem]) ===  JSON.stringify(this.temporaryFileTree[temporaryItem])) {
              console.log('可以进行更新');
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
      console.log(JSON.stringify(dependStorage),'打印树1');   
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