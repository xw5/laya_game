import GameManage from "./GameManage";
import gamePanel from "./gamePanel";
import player from "./player";
import startPanel from "./startPanel";

export default class PausePanel extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:closeBtn, tips:"关闭按钮", type:Node, default:null}*/
        this.closeBtn = null;
        /** @prop {name:homeBtn, tips:"主页按钮", type:Node, default:null}*/
        this.homeBtn = null;
        /** @prop {name:retryBtn, tips:"重玩按钮", type:Node, default:null}*/
        this.retryBtn = null;
        /** @prop {name:audioOff, tips:"关闭声音", type:Node, default:null}*/
        this.audioOff = null;
        /** @prop {name:audioOn, tips:"开启声音", type:Node, default:null}*/
        this.audioOn = null;
        /** @prop {name:pauseTxt, tips:"暂停文字", type:Node, default:null}*/
        this.pauseTxt = null;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onAwake() {

         // 用第三方字体加载
         Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
            this.pauseTxt.font = font.fontName;
        }));
        Laya.stage.on("pause", this, function() {
            this.owner.visible = true;
        });

        this.closeBtn.on(Laya.Event.CLICK, this, function() {
            this.owner.visible = false;
            Laya.timer.resume();
            this.owner.parent.getChildByName("player").getComponent(player).resume();
            this.owner.parent.getComponent(GameManage).resume();
        });

        this.homeBtn.on(Laya.Event.CLICK, this, function() {
            this.owner.visible = false;
            this.owner.parent.getChildByName("startPanel").getComponent(startPanel).homeClick();
            this.owner.parent.getComponent(GameManage).homeClick();
            this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).homeClick();
            this.owner.parent.getChildByName("player").getComponent(player).reset();
            Laya.timer.resume();
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        });

        this.retryBtn.on(Laya.Event.CLICK, this, function() {
            this.owner.visible = false;
            this.owner.parent.getChildByName("player").getComponent(player).reset();
            this.owner.parent.getComponent(GameManage).reset();
            Laya.timer.resume();
            Laya.stage.event("startGame");
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        });

        this.audioOff.on(Laya.Event.CLICK, this, function() {
            Laya.stage.event("muted", true);
        });

        this.audioOn.on(Laya.Event.CLICK, this, function() {
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            Laya.stage.event("muted", false);
        });

        Laya.stage.on("muted", this, this.muted);
    }

    muted(status) {
        console.log("startPanel status:", status);
        Laya.SoundManager.muted = status;
        if (status) {
            this.audioOff.visible = false;
            this.audioOn.visible = true;
        } else {
            this.audioOff.visible = true;
            this.audioOn.visible = false;
        }
    }
    
    onEnable() {
    }

    onDisable() {
    }
}