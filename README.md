# 服务端签名后直传
> 参考阿里云oss[服务端签名后直传demo](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.11186623.2.1.qwjpUv)

> 采用JS客户端直接签名有一个很严重的安全隐患，OSS AccessId/AccessKey暴露在前端页面，其他人可以随意拿到AccessId/AccessKey，这是非常不安全的做法。 本文将讲述如何从后端php代码中取到签名及上传policy。[oss web直传](http://oss-demo.aliyuncs.com/oss-h5-upload-js-direct/index.html)

## 后端上传签名逻辑如下：
1、客户端要上传图片时，到应用服务器取上传的policy及签名。

2、客户端拿到签名直接上传到OSS。

> [后端上传签名示例](http://oss-demo.aliyuncs.com/oss-h5-upload-js-php/index.html?spm=a2c4g.11186623.2.1.Thc1Ax)


### 以上例子为官方demo

## demo启动步骤

1、npm install

2、node src/app.js

## demo
> 访问[localhost:8080](http://localhost:8080)

## 主要文件
> app.js 中 getOssAuthorization 方法用于从后端获取oss授权，只需要按照官方demo的格式来即可

> 代码中有相关注释，最主要的地方是需要给数据进行sha1加密，这个地方需要特别注意
