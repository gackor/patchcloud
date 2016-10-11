// 请求(require)一个 nodejs 自带的 http模块
// 请求(require)一个 nodejs 自带的 url解析模块
var http = require("http"),
    url = require("url");

// console.log(url);

// 调用 http模块 提供的 createServer函数:
// 返回一个对象,这个对象有一个 listen 方法,这个方法带一个数值参数,
// 指定这个 http 服务器监听的端口号.

function start(route, handle) {

    function onRequest(request, response) {
        // 获取请求路径
        var URI = url.parse(request.url);

        // 关闭nodejs 默认访问 favicon.ico
        if (!URI.pathname.indexOf('/favicon.ico')) {
            return;
        };
        if(URI.pathname=="/"){
            response.writeHead(200, {"Content-type": "text/plain;charset=utf-8"});
            response.write("ok！");
            response.end();
            return;
        }

        // 收到来自 pathname 的请求
        console.log("Request for " + URI.pathname + " received.");

        // 路由器处理
        var result=route(handle, URI);

        // 返回数据
        response.writeHead(200,{'Content-Type': 'application/json;charset=utf-8'});
        //response.writeHead(200, {"Content-type": "text/plain;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has start!");
}

// 开放接口
exports.start = start;