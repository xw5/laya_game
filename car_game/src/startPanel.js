export default class startPanel extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:btnPlay, tips:"开始按钮", type:Node, default:null}*/
        let btnPlay = null;
        /** @prop {name:audioOn, tips:"开启音乐按钮", type:Node, default:null}*/
        let audioOn = null;
        /** @prop {name:audioOff, tips:"关闭按钮", type:Node, default:null}*/
        let audioOff = null;
        
    }
    
    onEnable() {
        this.btnPlay.on(Laya.Event.CLICK, this, this.startPlay);
        this.audioOn.on(Laya.Event.CLICK, this, this.audioOnFn);
        this.audioOff.on(Laya.Event.CLICK, this, this.audioOffFn);
    }
    startPlay() {
        console.log("游戏开始");
    }

    audioOnFn() {
        console.log("开启音乐");
    }

    audioOffFn() {
        console.log("关闭音乐");
    }

    onDisable() {
    }
}