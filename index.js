// 导入模块
const fs=require('fs');
const http=require('http');
const path=require('path');
//记录网站根目录
let rootPath=path.join(__dirname,"www");

let server=http.createServer((request,response)=>{
    //生成地址
    // let targetPath=path.join(rootPath,request.url);
    response.end('hello');
})
server.listen(80,'127.0.0.1',()=>{
    console.log('开启成功');
})