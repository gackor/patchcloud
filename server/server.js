
function accessAllow(req, res, next){
        console.log(req.path);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
}

function start(app) {

    var server=app.listen(8888,function(){
        var host = server.address().address
        var port = server.address().port
        console.log("应用实例，访问地址为 http://%s:%s", host, port)
    })
}
exports.accessAllow=accessAllow;
// 开放接口
exports.start = start;