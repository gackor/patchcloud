var fs = require("fs");
var apks="apks/";
var patchs="patchs/";
var child_process = require('child_process');
function appList(req, res){
    var files=fs.readdirSync(apks);
    var filesList = [];
    files.forEach( function (file){
        var states = fs.statSync(apks+file)
        var obj = new Object();
        obj.apkSize = states.size;//文件大小，以字节为单位
        obj.apkName = file;//文件名
        filesList.push(obj);
    });
    console.log(filesList);
    res.json(filesList);
}
function delApp(req, res){
    console.log("delApp--"+req.query.appName);
    fs.unlinkSync(apks+req.query.appName);
    res.json("{result:ok}");
}

function upload(req,res){
    var arr=req.file.originalname.split(".");
    if(arr.length!=2||isNaN(+arr[0])||arr[1]!="apk"){
        fs.unlinkSync(req.file.path);
        res.status(403);
        res.end("{code:'5'}")
        return;
    }
    var newPath=apks+req.file.originalname;
    fs.rename(req.file.path,newPath);
    res.status(200);
    res.end("ok")

}


function patchList(req, res){
    var files=fs.readdirSync(patchs);
    var filesList = [];
    files.forEach( function (file){
        var states = fs.statSync(patchs+file)
        var obj = new Object();
        obj.patchSize = states.size;//文件大小，以字节为单位
        obj.patchName = file;//文件名
        filesList.push(obj);
    });
    console.log(filesList);
    res.json(filesList);
}
function delPatch(req, res){
    console.log("delPatch--"+req.query);
    fs.unlinkSync(patchs+req.query.patchName);
    res.json("{result:ok}");
}

function createPatch(req,res){
    console.log("createPatch:"+req.body.oldName+"--"+req.body.newName);
    var sec=fs.readFileSync("../util/secrit",{flag:'r+',encoding:'utf8'});
    child_process.exec("../util/apkpatch.sh -f ../apks/"+req.body.newName+" -t ../apks/"+req.body.oldName+sec,
        function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            var files=fs.readdirSync("../util/output");
            if(files.length>0){
                files.forEach( function (file){
                    var arr=file.split(".");
                    if(arr.length==2&&arr[1]=="apatch"){
                        fs.rename("../util/output/"+file,"../apatch/"+req.body.oldName+"-"+req.body.newName+".apatch");
                    }
                    var states = fs.statSync(patchs+file)
                    var obj = new Object();
                    obj.patchSize = states.size;//文件大小，以字节为单位
                    obj.patchName = file;//文件名
                    filesList.push(obj);
                });
            }

        });
}





exports.appList=appList;
exports.delApp=delApp;
exports.upload=upload;
exports.createPatch=createPatch;
exports.delPatch=delPatch;
exports.patchList=patchList;