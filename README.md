
## 一、热修复基本原理

### 热修复的基本原理并不多，目前已知可用的热修复实现的原理主要有以下几种：
- 基于 Xposed 实现的无侵入的运行时 AOP (Aspect-oriented Programming)  框架，可以实现在线修复 Bug，修复粒度方法级别，但是由于对 ART 虚拟机不支持，导致其对 Android 5.0、6.0 均不支持，使用局限性太大。目前基于这一原理实现的解决方案是手淘团队开源的 Dexposed 项目。

- native hook 方式，其核心部分在 JNI 层对方法进行替换，替换有问题的方法，修复粒度方法级别，无法在类中新增和删减字段，可以做到即时生效，该原理的实现方案主要是阿里团队开源的 AndFix 。

- 该原理由 QQ 空间技术团队提出，使用新的 ClassLoader 加载 patch.dex，hack 默认的 ClassLoader，替换有问题的类，修复粒度类级别，一般无法做到即时生效，需要在应用下一次启动时生效。目前基于该原理实现的方案有 Nuwa、HotFix、RocooFix 。

- dex 文件全量替换，基于 DexDiff 技术，对比修复前后的 dex 文件，生成 patch.dex，再根据 patch.dex 更新有问题的 dex 文件。该方案由微信团队提出：微信Android热补丁实践演进之路 ，暂时还未开源。目前基于这一原理实现的开源方案只有一个：Tinker_imitator 。

###    目前热修复的原理基本就这四种，考虑到使用的兼容性、可实现性以及可操作性，基本上能实际应用到项目中的就剩下了 2、3 两种了，至于第 4 种方式，只能等微信团队开源出比较成熟的方案，方可实际应用。

## 二、andfix方案介绍

### 1、修复粒度：方法级别 
### 2、实现原理：native hook 方式 
### 3、优点：运行时即可修复，修复及时 
### 4、缺点: 
- 只能修复方法，无法新加类和字段;
- 对部分机型不支持;
- 方法的参数类型有限制;

## [三、阿里百川hotfix与andfix的关系](http://baichuan.taobao.com/docs/doc.htm?spm=a3c0d.7629140.0.0.jSmyC7&treeId=234&articleId=105460&docType=1#s2)

## [四、阿里hotfix使用中不被允许的情况](http://baichuan.taobao.com/docs/doc.htm?spm=a3c0d.7629140.0.0.bJzGBC&treeId=234&articleId=105457&docType=1#s3)
- 暂时不支持新增方法、新增类
- 不支持新增 Field
- 不支持针对同一个方法的多次 patch，如果客户端已经有一个 patch 包在运行，则下一个 patch 不会立即生效。
- 三星 note3、S4、S5 的 5.0 设备以及 X8 6设备不支持（点击查看具体支持的机型）
- 参数包括：long、double、float 的方法不能被 patch
- 被反射调用的方法不能被 patch
- 使用 Annotation 的类不能 patch
- 参数超过 8 的方法不能被 patch
- 泛型参数的方法如果 patch 存在兼容性问题

----

### kidcaresFix/viapalmFix 与阿里百川hotfix及andfix的关系。

## 五、原型图

![](https://github.com/gackor/patchcloud/raw/master/readimg/123111.png)  
![](https://github.com/gackor/patchcloud/raw/master/readimg/1234444.png)  



## 六、该文档为服务端api

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
