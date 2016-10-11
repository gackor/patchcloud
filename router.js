// 路由模块,针对不同的请求,做出不同的响应
// handle 处理请求方法

function route(handle, uri) {
    console.log("About to route a request for " + uri.path);

    // 检查给定的路径对应的请求处理程序是否存在，如果存在的话直接调用相应的函数
    if (typeof handle[uri.pathname] == "function") {
        return handle[uri.pathname](uri.query);
    } else {
        return null;
        console.log("No request handler found for " +  uri.path);
    }
}

exports.route = route;
