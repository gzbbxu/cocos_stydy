# cocos_stydy
一: 组件 CommonButton.js
一个自定义带有音效的通用按钮。
- 使用方法：

1，button/sprite 按钮下添加组件。

2, 配置属性，拖拽音效。



二：用JavaScript做发布/订阅中消息方案 PubSub
 
特点：高效，稳定。 纯JavaScript，没有依赖库。同样适用React。

使用：
1，安装node环境。（自行google ,注意一定要设置淘宝镜像）

2，进入cocos_creator 下，npm init ,一路回车,最后输入yes。在跟目录下生成package.json。

3，执行命令npm install pubsub-js。(如果是protobuf-js或者其他库 也是一样的套路)

4，引入和使用：


引入：
	const PubSub = require('pubsub-js');

使用：

	//发布
	 PubSub.publish('msgtype', obj); //默认异步发布
	 PubSub.publishSync( 'msgtype', obj); //同步发布
	//订阅
	
	 var token = PubSub.subscribe('test', function(msg,data){
            console.log(".....msg:"+msg+"data:"+data);
            // PubSub.unsubscribe(token); //取消订阅
        });
	
	 //在合适的时机调用取消订阅
	PubSub.unsubscribe(token); //取消订阅
	PubSub.unsubscribe('msgtype'); //取消订阅
	PubSub.clearAllSubscriptions();//取消所有订阅




三： cocos-creator protobufjs 通信方案。

使用：

1，npm install protobufjs@5 --save
2，使用案例：
	     var protobuf = require("protobufjs");
         var builder = protobuf.newBuilder();

         protobuf.protoFromFile(cc.url.raw('resources/Player.proto'), builder);


        var PB = builder.build('grace.proto.msg');

        //实例化Player
        var player = new PB.Player();
        //属性赋值
        player.name = '张三';
        player.enterTime = Date.now();
        player.id = 1;
        console.log("aaaaaaaa:"+PB);
        var data = player.toArrayBuffer();
        console.log("data:"+data.byteLength);
        var otherPlayer = PB.Player.decode(data);
        console.log(otherPlayer.name+":"+otherPlayer.enterTime);



四：cocos-creaator 使用网络资源。

   使用：

   1，新建script 脚本。

   2，新建node 节点

   3，拖拽组件到canvas ,拖拽node 节点到script 脚本中。

	cc.Class({
    extends: cc.Component,

    properties: {
   
        testsprite:cc.Sprite
    },

    // use this for initialization
    onLoad: function () {
        //加载网络图片成功
        var url = 'http://www.uimaker.com/uploads/allimg/140617/1-14061FS4030-L.jpg';
        var self = this;
        cc.loader.load(url, function (err, tex) {
            if(err){
                console.log("load error:"+err);
                return ;
            }
            cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
            var spf=new cc.SpriteFrame();
            spf.initWithTexture(tex);
            self.testsprite.spriteFrame=spf;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
	});

	加载sdcard本地资源
	cc.Class({
    extends: cc.Component,

    properties: {

        testsprite:cc.Sprite
    },

    // use this for initialization
    onLoad: function () {
        //加载网络图片成功
        var url = '/storage/emulated/0/aaa.png';//res.
        var self = this;
        console.log("load url:"+url);
        cc.loader.load(url, function (err, tex) {
            if(err){
                console.log("load error:"+err);
                return ;
            }
            cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
            var spf=new cc.SpriteFrame();
            spf.initWithTexture(tex);
            self.testsprite.spriteFrame=spf;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
	});

	网上还有这种例子：待测试
		var that = this;  
		var url = "http://xxxxxx";  
		cc.loader.loadImg(url, null, function(err,img){  
		    var logo  = new cc.Sprite(img);   
		    that.addChild(logo);  
		    logo.x = size.width / 2;  
		    logo.y = size.height / 2;  
		});  

	
  结论：
  1，web端存在跨域问题，WebGL 的安全策略的限制。在android 中是可以正常访问的。

  2，异步操作，没有缓存。（在网络连接的时候）
	
  3, 远程加载不支持图片文件以外类型的资源 .调用loadRes的话，如果对应资源没有加载，才会去加载，如果对应资源已经加载，则 不会 再次加载

  五：加载网络动画资源。

  1，下载

	downloader :function(){
	/*       var url = '/storage/emulated/0/test.js';
        cc.loader.load(url, function(err,txt){
            if(err) return console.log("load failed");
            console.log("load success:"+txt);
            //success
        });*/
        var shelfDown = this;
        console.log("downloader");
        var downloader = new jsb.Downloader();
        console.log("start.....")
        var downUrl ="http://172.30.95.1:8081/test/bag_full_bg.png";
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./"); // storagePath:/data/user/0/org.cocos2d.helloworld/files/
        console.log("storagePath:"+storagePath+"bag_full_bg.png");
        var testUrl = storagePath+"bag_full_bg.png";
        var result = jsb.fileUtils.isFileExist(testUrl);
        if(result){
            console.log("result ..... success 存在");//文件存在
            return ;
        }
        var testdist = storagePath+"dist";
        console.log("testUrl:"+testUrl);
        downloader.createDownloadFileTask(downUrl,testUrl,"");
        console.log("end.....")
        downloader.setOnTaskError(function (sender,errorCode,errorCodeInternal,errorStr){//下载错误
            console.log("setOnTaskError!!!!:"+"errorstr:"+errorStr+":errorCode:"+errorCode+":errInter:"+errorCodeInternal.toString());
        });
        downloader.setOnTaskProgress(function (sender,bytesReceived,totalByteReceived,totalBytesExpected){
            // cc.log("setOnTaskProgress 已经下载的大小:",bytesReceived);
            // cc.log("总大小:",totalByteReceived);
            // cc.log("预期总大小:"+totalBytesExpected);
            console.log("setOnTaskProgress 已经下载的大小:"+bytesReceived+":总大小"+totalByteReceived+"预期总大小:"+totalBytesExpected);
        });
        downloader.setOnFileTaskSuccess(function (sender){//下载完成
            console.log("down success!!!!:"+sender);
            // shelfDown.loadNet(testUrl);
            console.log("load url:"+testUrl);
            cc.loader.load(testUrl, function (err, tex) {
                if(err){
                    console.log("load error:"+err);
                    return ;
                }
                cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
                var spf=new cc.SpriteFrame();
                spf.initWithTexture(tex);
                shelfDown.testsprite.spriteFrame=spf;
            });
        });

    }

	//另外一套方案。

	loadNative = function(url, callback){
    var dirpath =  jsb.fileUtils.getWritablePath() + 'img/';
    var filepath = dirpath + MD5(url) + '.png';

    function loadEnd(){
        cc.loader.load(filepath, function(err, tex){
            if( err ){
                cc.error(err);
            }else{
                var spriteFrame = new cc.SpriteFrame(tex);
                if( spriteFrame ){
                    spriteFrame.retain();
                    callback(spriteFrame);
                }
            }
        });

    }

    if( jsb.fileUtils.isFileExist(filepath) ){
        cc.log('Remote is find' + filepath);
        loadEnd();
        return;
    }

    var saveFile = function(data){
        if( typeof data !== 'undefined' ){
            if( !jsb.fileUtils.isDirectoryExist(dirpath) ){
                jsb.fileUtils.createDirectory(dirpath);
            }

            if( jsb.fileUtils.writeDataToFile(  new Uint8Array(data) , filepath) ){
                cc.log('Remote write file succeed.');
                loadEnd();
            }else{
                cc.log('Remote write file failed.');
            }
        }else{
            cc.log('Remote download file failed.');
        }
    };
    
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        cc.log("xhr.readyState  " +xhr.readyState);
        cc.log("xhr.status  " +xhr.status);
        if (xhr.readyState === 4 ) {
            if(xhr.status === 200){
                xhr.responseType = 'arraybuffer';
                saveFile(xhr.response);
            }else{
                saveFile(null);
            }
        }
    }.bind(this);
    xhr.open("GET", url, true);
    xhr.send();
	};

	
	
  








六，protobuf :支持



		    onLoad: function () {
        this.label.string = this.text;
        console.log("fkdalkfjdaslfdkas 1111");
       /* if(cc.sys.isNative) {
            global.process = {
               // toString: () => '[object process]'
                toString:function () {
                    return  '[object process]';
                }
              }
        }*/
        var protobuf = require("protobufjs");
        protobuf.Util.IS_NODE = cc.sys.isNative;
        var builder = protobuf.newBuilder();
        console.log("fkdalkfjdaslfdkas 2222");
        protobuf.protoFromFile(cc.url.raw('resources/Player.proto'), builder);
        console.log("fkdalkfjdaslfdkas 3333");

        var PB = builder.build('grace.proto.msg');
        console.log("fkdalkfjdaslfdkas 4444");
        //实例化Player
        var player = new PB.Player();
        //属性赋值
        player.name = '张三';
        player.enterTime = Date.now();
        player.id = 1;
        console.log("aaaaaaaa:"+PB);
        console.log("fkdalkfjdaslfdkas 5555555");
        var data = player.toArrayBuffer(); // unit 8 unsig  8 个字节  byte -> java  readArray  oc ReadArray . {}
        var base64 = player.toBase64();
        console.log("base 64:"+base64);
        console.log("data:"+data.byteLength);
        var otherPlayer = PB.Player.decode(data,"utf8");
        console.log(otherPlayer.name+":"+otherPlayer.enterTime);
        var bytes = new Uint8Array(data);
        for(var i=0;i<data.byteLength;i++){
            console.log("数组。。"+bytes[i]);
        }
        console.log("sssssssssssssssssssssss来来来:");
    },



	//fs.js
	module.exports = {
	    //同步读取文件
	     readFileSync : function(path) {
	        //cocos-jsb提供有相同功能的函数，就借用下它
	        return jsb.fileUtils.getStringFromFile(path);
	    },
	
	    //异步读取文件
	    readFile:function(path, cb) {
	        //cocos-jsb没提供异步读取文件的函数，这里只能简单执行下回调传回读取内容
	        var str = jsb.fileUtils.getStringFromFile(path);
	        cb(null, str);
	    },
	}


		//path.js
		module.exports = {
	    //获取全路径
	    resolve:function (subPath)  {
	    //使用cc.url.raw实现获取全路径
	    return cc.url.raw(`resources/${subPath}`);
	},
	// 方法使用平台特定的分隔符把全部给定的path片段连接到一起
	join: function() {
	    //使用cocos提供的cc.path.join实现
	    return cc.path.join.apply(null, arguments);
	}
	}

	

七 热更新

1，新建热更新组件。添加下面核心代码。（包含检查更新，更新进度的回掉，更新成功后重启游戏）

2，下载脚本文件。放到工程目录下。https://github.com/cocos-creator/tutorial-hot-update/blob/master/assets/scripts/module/HotUpdate.js

3，构建项目。成功后生成build 文件夹（建议：如果存在build ,构建之前先把buidle文件删除）

4，运行脚本。 node version_generator.js -v 1.0.0 -u http://192.168.191.1:8081/test/my_hot-updat/tutorial-hot-update/remote-assets/ -s build/jsb-default/ -d assets/

- `-v` 指定 Manifest 文件的主版本号。

- `-u` 指定服务器远程包的地址，这个地址需要和最初发布版本中 Manifest 文件的远程包地址一致，否则无法检测到更新。

- `-s` 本地原生打包版本的目录相对路径

- `-d` 保存 Manifest 文件的地址。

5，在Assert 目录下生成 project.manifest,version.manifest

6，定义manifestUrl 属性（如下）,利用creator 工具，把version 拖拽到 manifestUrl中去。（如果之前这一步已经做了。第7个步骤可以省略）

7，重新构建。

8，把Assert 目录下的project.manifest,version.manifest 还有build/jsb-default目录下的res 和 src 放到服务器目录上remote-assets 下。我的地址是： http://192.168.191.1:8081/test/my_hot-updat/tutorial-hot-update/remote-assets/

9，修改jsb-default 目录下的main.js 。在 'use strict';上方加入如下代码。
	
	if (cc.sys.isNative) {
        var hotUpdateSearchPaths = cc.sys.localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
        }
    }

10，运行原生代码。


热更新相关代码如下：

	cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        manifestUrl: cc.RawAsset,
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        if (!cc.sys.isNative) {
            return;
        }
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'test-hotfix');

        console.log("StoragePath = " + storagePath);
        this._am = new jsb.AssetsManager(this.manifestUrl, storagePath);
        if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.retain();
        }

        this._am.setVersionCompareHandle(function (versionA, versionB) {
            //版本比对。当前版本和服务器版本。
            console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        });
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
        }

        if (!this._am.getLocalManifest().isLoaded()) {
            console.log('Failed to load local manifest ...');
            return;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._checkListener, 1);
        this._am.checkUpdate();

    },
    checkCb: function (event) {
        console.log('GG_: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('GG_: ERROR_NO_LOCAL_MANIFEST');//没有发现本地manifest
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                console.log('GG_: ERROR_DOWNLOAD_MANIFEST');//下载错误
                break;
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('GG_: ERROR_PARSE_MANIFEST');//解析错误
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('GG_: ALREADY_UP_TO_DATE');//已经是最新版本
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('GG_: NEW_VERSION_FOUND');//发现新版本
                this.hotUpdate();
                break;
            default:
                console.log('GG_: DEFAULT');
                return;
        }

        cc.eventManager.removeListener(this._checkListener);
        this._checkListener = null;
        this._updating = false;
    },
    hotUpdate:function(){
        if (this._am && !this._updating) {
            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl);
            }

            this._failCount = 0;
            this._am.update();
            // this.panel.updateBtn.active = false;
            this._updating = true;
        }
    },
    updateCb: function (event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode())
        {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log( 'updateCb No local manifest file found, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                console.log("updateCb  percent:"+ event.getPercent());// 0-1 的小数
                console.log("updateCb  getPercentByFile:"+ event.getPercentByFile());
                // this.panel.fileProgress.progress = event.getPercentByFile();

                console.log("updateCb getDownloadedFiles:"+event.getDownloadedFiles() + ' / ' + event.getTotalFiles());//已经下载的文件。总的文件
                // this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                console.log("updateCb getDownloadedBytes :"+event.getDownloadedBytes() + ' / ' + event.getTotalBytes());//已经下载的字节 总共下载的字节
                var msg = event.getMessage();
                if (msg) {
                    // this.panel.info.string = 'Updated file: ' + msg;
                     cc.log("updateCb msg:"+event.getPercent()/100 + '% : ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                //this.panel.info.string = 'Fail to download manifest file, hot update skipped.';
                console.log('updateCb Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log( 'updateCb Already up to date with the latest remote version.');
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log( 'updateCb Update finished. ' + event.getMessage());//更新成功
                // this.panel.info.string = 'Update finished. ' + event.getMessage();
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log( 'updateCb Update failed. ' + event.getMessage());//更新失败
                // this.panel.retryBtn.active = true;
                this._updating = false;
                this._canRetry = true;
                // this.retry();// 这里可以调用重试机制。定义好规则。最多允许重试多少次。否则会出现死循环的情况下，
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log( 'updateCb  Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                // this.panel.info.string = event.getMessage();
                //解压错误
                console.log("updateCb ERROR_DECOMPRESS :"+event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            this._updating = false;
        }

        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            console.log("cc.game.restart()");
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },
    //更新失败，重试机制
    retry: function () {
        if (!this._updating && this._canRetry) {

            this._canRetry = false;

            console.log( 'retry Retry failed Assets...');
            this._am.downloadFailedAssets();
        }
    },
    // called every frame
    update: function (dt) {

    },onDestroy: function () {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
            this._am.release();
        }
    }
	});

	




