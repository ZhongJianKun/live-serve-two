const { log } = require('console');
const {JSDOM} = require('jsdom')
exports.prepareInserthtml = (htmlStr)=>{
  const html = new JSDOM(htmlStr);
  const document = html.window.document;
  let newDiv = document.createElement("script");
  let newContent = document.createTextNode(jsTemplate());
  newDiv.appendChild(newContent);
  document.querySelector('body').appendChild(newDiv);
  return document.querySelector("html").outerHTML;  
}

//模板
function jsTemplate(){
  return ``
}