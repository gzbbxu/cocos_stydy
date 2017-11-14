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




