// const PubSub = require('pubsub-js');
cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 1,
        transDuration: 0,
        bgAudio:{
            default:null,
            url:cc.AudioClip
        }
    },
    onLoad: function () {
        var self = this;
        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown (event) {
            console.log("onTouchDown");
            this.stopAllActions();
            // if (audioMng) audioMng.playButton();
            cc.audioEngine.playEffect(self.bgAudio,false);
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp (event) {
            console.log("onTouchUp");
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }
});
