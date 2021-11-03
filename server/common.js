//文件筛选
const fileFilter = (fileName) =>{
    const list =  ['.html',".js",".css",".gif",".jpg",".png"];
    return list.some(item => fileName.includes(item));
}
module.exports = {fileFilter};