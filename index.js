var server = require("./server"),
    router = require("./router"),
    appHandlers = require("./handler/appHandlers");
h5Handlers = require("./handler/h5Handlers");

// handle 保存不同请求路径对应的处理方法
var handle = {};

handle["/"] = appHandlers.start;
handle["/start"] = appHandlers.start;
handle["/upload"] = h5Handlers.upload;

// 传入路由模块方法, 路径处理方法
server.start(router.route, handle);