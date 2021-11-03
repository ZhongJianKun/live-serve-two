// var Diff = require('diff');
 
// var one = `.abc{
//     color:red
// }`;
// var other =  `.abc{
//     color:blur
// }`;
 
// var diff = Diff.diffCss(one, other);
//  console.log('这里');
// diff.forEach(function(part){
//   // green for additions, red for deletions
//   // grey for common parts
//   var color = part.added ? 'green' :
//   part.removed ? 'red' : 'grey';
//   console.log(part);
// //   process.stderr.write(part.value[color]);
// });
 
// // console.log();

// const path = require('path')
// path.resolve('C:\code\个人代码\编写vs code插件\test\client\index.html');
// console.log(path.resolve('C:\code\个人代码\编写vs code插件\test\client\index.html'));
// console.log('C:\code\个人代码\编写vs code插件\test\client\index.html'.split('/'));
// var strurl = "http:\\localhost:64177\Home\AccordionIndex";
// console.log(strurl.replace(/[\\]/g, '/'));
// strurl = strurl .replace("\\\\", "\/\/");
// strurl = strurl .replace("\\", "\/");
// strurl = strurl .replace("\\", "\/");
// console.log(strurl);

// let str = `C:\code\个人代码\编写vs code插件\test\client\index.html`;
// let a = '';
// for (let i = 0; i < str.length; i++) {
//   console.log(str[i],i);
//   if (str[i] === '\u005C'){
//     a+='/'
//   }else{
//     a+=str[i];
//   }
// }

// console.log(a);

// var str = 'D:\Download\123\456';
let a = "C:\code\个人代码\编写vs code插件\test\client\index.html";
let bu1 =  Buffer.from(a);
console.log(bu1);
console.log(bu1.toString().split('\\'));;

function namea(url) {
  let a = url;
  console.log(a.split('\\'));
}
namea(a)