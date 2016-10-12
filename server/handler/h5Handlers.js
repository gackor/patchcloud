var fs = require("fs");
var apks="apks/";
var patchs="patchs/";
var child_process = require('child_process');
function appList(req, res){
    var files=fs.readdirSync(apks);
    var filesList = [];
    files.forEach( function (file){
        if (file != "zhanwei") {
            var states = fs.statSync(apks + file)
            var obj = new Object();
            obj.apkSize = states.size;//文件大小，以字节为单位
            obj.apkName = file;//文件名
            filesList.push(obj);
        }
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
    files.forEach( function (file) {
        if (file != "zhanwei") {
            var states = fs.statSync(patchs + file)
            var obj = new Object();
            obj.patchSize = states.size;//文件大小，以字节为单位
            obj.patchName = file;//文件名
            filesList.push(obj);
        }
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
    var sec=fs.readFileSync("util/secrit.txt",{flag:'r+',encoding:'utf8'});
    console.log(req.body);

    child_process.exec("util/apkpatch.sh -f apks/"+req.body.newName+" -t apks/"+req.body.oldName+sec,
        function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
                res.status(403);
                var obj=new Object();
                obj.code=1;
                obj.description=stderr;
                res.json(obj);
                console.log("create success!!!");
                return;
            }
            var files=fs.readdirSync("output");
            if(files.length>0){
                files.forEach( function (file){
                    var arr=file.split(".");
                    if(arr.length==2&&arr[1]=="apatch"){
                        fs.rename("output/"+file,"patchs/"+(req.body.oldName+"-"+req.body.newName+".apatch").replace(/\.apk/g,""));
                        res.json("{result:ok}");
                        child_process.execSync("rm -rf output");
                        return;
                    }
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