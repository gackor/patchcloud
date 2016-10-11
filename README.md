![](https://github.com/gackor/patchcloud/raw/master/readimg/123111.png)  
![](https://github.com/gackor/patchcloud/raw/master/readimg/1234444.png)  



# 该文档为服务端api

-------------------

[TOC]



## 0_定义
###  0.1_Header定义
    X-EDU-CLIENTVERSION		#客户端版本号，比如v1.9.1

## 1_Android
### 1.1_查询补丁	
    Type:Post
    Url:api/app/check   
Request:
```python

{
   "versionCode":int, 
   "currentPatchName":String #已经加载的patch名字，如果没加载过，则为null。
}
```


Response
StatusCode 200
```python
{
    "downloadUrl":string #如果有需要下载的则返回下载地址，没有则不返还该字段。
}
```

## 2_H5Edit
###2.1_当前apk列表
    Type: Get
    URI:api/h5/apk/list

Request:none

Response

StatusCode 200
```python
{

    "apkList":[
          apkName:string, 
          apkSize:int
    ] 
}
```

###2.2_删除某个apk
    Type Delete
    URI:api/h5/apk/del?appName={apkName} #包括后缀名

Request:none

Response

StatusCode 200

###2.3_上传apk
    Type Post
    URI:api/h5/apk/upload

Request

```python
{
   "apkFile":File
}
```
Response

StatusCode 200

### 2.4_当前patch补丁列表
    Type:Get
    URI:api/h5/patch/list


Request:none

Response

StatusCode 200
```python
{

    "patchList":[
          patchName:String, 
          patchSize:int
    ] 
}
```

### 2.5_删除某个补丁
    Type:Delete
    URI:api/h5/patch/del?patchName={patchName}

Request:None


Response

StatusCode 200

### 2.6_生成补丁
    Type:POST
    URI:api/h5/patch/create

Request

```python
{
   "oldName":string,
   "newName",string
}
```

Response

StatusCode 200
