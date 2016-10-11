var server = require("./server"),
    router = require("./router"),
    appHandlers = require("./handler/appHandlers"),
    h5Handlers = require("./handler/h5Handlers");

// handle 保存不同请求路径对应的处理方法
var handle = {};

handle["/api/app/check"] = appHandlers.checkApk;

// 传入路由模块方法, 路径处理方法
server.start(router.route, handle);