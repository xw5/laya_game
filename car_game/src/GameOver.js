import GameManage from "./GameManage";
import gamePanel from "./gamePanel";
import player from "./player";
import startPanel from "./startPanel";

export default class GameOver extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:homeBtn, tips:"主页按钮", type:Node, default:null}*/
        this.homeBtn = null;
        /** @prop {name:retryBtn, tips:"重玩按钮", type:Node, default:null}*/
        this.retryBtn = null;
        /** @prop {name:overTxt, tips:"游戏结束文字", type:Node, default:null}*/
        this.overTxt = null;
        /** @prop {name:scoreTxt, tips:"本局得分", type:Node, default:null}*/
        this.scoreTxt = null;
        /** @prop {name:bestScoreTxt, tips:"最高分", type:Node, default:null}*/
        this.bestScoreTxt = null;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onAwake() {
        // 用第三方字体加载
        Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
            this.overTxt.font = font.fontName;
            this.scoreTxt.font = font.fontName;
            this.bestScoreTxt.font = font.fontName;
        }));

        Laya.stage.on("gameOver", this, this.gameOver);

        this.homeBtn.on(Laya.Event.CLICK, this, function() {
            this.owner.visible = false;
            this.owner.parent.getChildByName("startPanel").getComponent(startPanel).homeClick();
            this.owner.parent.getComponent(GameManage).homeClick();
            this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).homeClick();
            this.owner.parent.getChildByName("player").getComponent(player).reset();
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        });

        this.retryBtn.on(Laya.Event.CLICK, this, function() {
            this.owner.visible = false;
            this.owner.parent.getChildByName("player").getComponent(player).reset();
            this.owner.parent.getComponent(GameManage).reset();
            Laya.stage.event("startGame");
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        });
    }
    
    onEnable() {
    }

    onDisable() {
    }

    gameOver() {
       this.owner.visible = true;
       var score = this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).scoreNum;
       this.scoreTxt.text = "Score:"+score;
       var highScore = Number(Laya.LocalStorage.getItem("bestScore"));
       if (score > highScore) {
            Laya.LocalStorage.setItem("bestScore", score);
            this.bestScoreTxt.text = "BestScore:"+score;
       } else {
            this.bestScoreTxt.text = "BestScore:"+highScore;
       }
       Laya.LocalStorage.setItem("lastScore", score);
    }
}