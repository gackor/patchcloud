var server = require("./server"),
    express = require('express'),
    appHandlers = require("./handler/appHandlers"),
    h5Handlers = require("./handler/h5Handlers"),
    multer  = require('multer'),
    upload = multer({dest:'apks/'});


// handle 保存不同请求路径对应的处理方法
var app = express();
app.all('*', server.accessAllow);
app.post("/api/app/check",appHandlers.checkApk);

app.get("/api/h5/apk/list",h5Handlers.appList);
app.get("/api/h5/apk/del",h5Handlers.delApp);
app.post("/api/h5/apk/upload",upload.single('apkFile'),h5Handlers.upload);

app.get("/api/h5/patch/list",h5Handlers.patchList);
app.get("/api/h5/patch/del",h5Handlers.delPatch);
app.post("/api/h5/patch/create",h5Handlers.createPatch);
// 传入路由模块方法, 路径处理方法
server.start(app);