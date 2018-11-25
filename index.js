// 导入模块
const fs = require('fs');
const http = require('http');
const path = require('path');
//记录网站根目录
let rootPath = path.join(__dirname, "www");

let server = http.createServer((request, response) => {
    //生成地址
    let targetPath = path.join(rootPath, request.url);
    // 判断路径是否存在
    if (fs.existsSync(targetPath)) {
        // 存在
        // 文件还是文件夹
        let stats = fs.stat(targetPath, () => { });
    } else {
        //设置状态码
        response.statusCode = 404;
        //设置字符集
        response.setHeader('content-type','text/html;charset=utf-8');
        //不存在
        response.end(`
          <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              <head>
                  <title>Index of/ </title>
              </head>
              <body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      这是一个很寂寞的天
                  </ul>
              </body>
              </html>
          `);
    }
    // response.end('hello'); 
})
server.listen(80, '127.0.0.1', () => {
    console.log('开启成功');
})