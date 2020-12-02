export default class gamePanel extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:last, tips:"最近成绩", type:Node, default:null}*/
        this.last = null;
        /** @prop {name:best, tips:"最好成绩", type:Node, default:null}*/
        this.best = null;
        /** @prop {name:score, tips:"现在成绩", type:Node, default:null}*/
        this.score = null;
        /** @prop {name:pauseBtn, tips:"音乐暂停按钮", type:Node, default:null}*/
        this.pauseBtn = null;
        this.isBegin = false;
        this.scoreNum = 0;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onAwake() {
        this.pauseBtn.on(Laya.Event.CLICK, this, this.pauseClick);
        // 用第三方字体加载
        Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
            this.last.font = font.fontName;
            this.best.font = font.fontName;
            this.score.font = font.fontName;
        }));
        this.owner.visible = false;
        Laya.stage.on("startGame", this, function() {
            this.owner.visible = true;
            this.isBegin = true;
            this.init();
        });
        Laya.stage.on("gameOver",this, function() {
            this.owner.visible = false;
            this.isBegin = false;
        });
        Laya.timer.loop(300, this, this.addScore);
        Laya.stage.on("addScore", this, this.addScore);
        
    }

    init() {
        var bestScore = Laya.LocalStorage.getItem('bestScore');
        var lastScore = Laya.LocalStorage.getItem('lastScore');
        this.best.text = "Best:"+(bestScore ? bestScore : 0);
        this.last.text = "Last:"+(lastScore ? lastScore : 0);
        this.score.text = 0;
        this.scoreNum = 0;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    addScore(score = 1) {
        if (!this.isBegin) return;
        this.scoreNum += score;
        this.score.text = this.scoreNum;
    }

    pauseClick() {
        Laya.timer.pause();
        Laya.stage.event("pause");
    }

    homeClick() {
        this.owner.visible = false; 
    }

}