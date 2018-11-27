// 导入模块
const fs = require('fs');
const http = require('http');
const path = require('path');
//引入第三方包
const mime = require('mime');
//记录网站根目录
let rootPath = path.join(__dirname, "www");

let server = http.createServer((request, response) => {
    //生成地址
    let targetPath = path.join(rootPath, request.url);
    //设置编码格式
    // response.setHeader('content-type','text/html;charset=utf-8');
    // 判断路径是否存在
    if (fs.existsSync(targetPath)) {
        // 存在
        // 文件还是文件夹
        let stats = fs.stat(targetPath, (err, data) => {
            // 是文件 直接读取并返回
            if (data.isFile()) {
                //获取文件的类型 设置content-type
                console.log(mime.getType(targetPath));
                // 使用mime设置类型
                response.setHeader('content-type', mime.getType(targetPath));
                //读取文件并返回
                fs.readFile(targetPath, (err, data) => {
                    response.end(data);
                })
            }
            if (data.isDirectory()) {
                //读取文件夹信息
                fs.readdir(targetPath, (err, files) => {
                    let tem ='';
                    //遍历
                    for (let i = 0; i < files.length; i++) {
                        tem+=`
                        <li>
                            <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
                        </li>
                        `;
                    }
                    //读取完毕之后再返回
                    response.end(`
                    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                    <html>
                    <head>
                        <title>Index of/ </title>
                    </head>
                    <body>
                        <h1>Index of ${request.url}</h1>
                        <ul>
                            ${tem}
                        </ul>
                    </body>
                    </html>
                    `);
                })
                
            }
        });
    } else {
        //设置状态码
        response.statusCode = 404;
        //设置字符集
        response.setHeader('content-type', 'text/html;charset=utf-8');
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
server.listen(8848, '127.0.0.1', () => {
    console.log('开启成功');
})