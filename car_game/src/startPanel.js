export default class startPanel extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:btnPlay, tips:"开始按钮", type:Node, default:null}*/
        this.btnPlay = null;
        /** @prop {name:audioOn, tips:"开启音乐按钮", type:Node, default:null}*/
        this.audioOn = null;
        /** @prop {name:audioOff, tips:"关闭按钮", type:Node, default:null}*/
        this.audioOff = null;

    }
    
    onAwake() {
        this.btnPlay.on(Laya.Event.CLICK, this, this.startPlay);
        this.audioOn.on(Laya.Event.CLICK, this, this.audioOnFn);
        this.audioOff.on(Laya.Event.CLICK, this, this.audioOffFn);
        Laya.stage.on("muted", this, this.muted);
    }
    startPlay() {
        console.log("游戏开始");
        this.owner.visible = false;
        Laya.stage.event("startGame");
        Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
    }

    audioOnFn() {
        Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        Laya.stage.event("muted", false);
    }

    audioOffFn() {
        Laya.stage.event("muted", true);
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

    onDisable() {
    }

    homeClick() {
        this.owner.visible = true;
    }
}