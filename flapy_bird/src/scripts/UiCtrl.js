/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-19 21:51
*/
let isStart = false;
export default class UiCtrl extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:score, tips:"分数展示", type:Node, default:null}*/
    this.score=null;
    /** @prop {name:gameOverScore, tips:"结束页分数展示", type:Node, default:null}*/
    this.gameOverScore=null;
    /** @prop {name:gameOver, tips:"结束页ui", type:Node, default:null}*/
    this.gameOver=null;
    /** @prop {name:startTxt, tips:"结束页ui", type:Node, default:null}*/
    this.startTxt=null;
    /** @prop {name:ranking, tips:"排行榜按钮", type:Node, default:null}*/
    this.ranking=null;
    /** @prop {name:again, tips:"重新开始游戏按钮", type:Node, default:null}*/
    this.again=null;
    this.nowScore = 0;
  }

  onAwake() {
    this.ranking.on(Laya.Event.CLICK,this, this.lookRanking);
    this.again.on(Laya.Event.CLICK,this, this.playAgain);
    Laya.stage.on("addScore", this, this.addScore);
    Laya.stage.on("GameOver",this, this.gameOverFn);
    Laya.stage.on("gameStart",this, this.gameStart);
    Laya.stage.on(Laya.Event.CLICK, this, function(){
      if (!isStart) {
        this.startTxt.visible = false;
        Laya.stage.event("gameStart");
        isStart = true;
      }
    });
  }

  addScore(val) {
    this.nowScore += val;
    this.setScore(this.nowScore);
    console.log(this.nowScore);
  }

  setScore(score) {
    this.score.text = "SCORE∶ "+score;
    this.gameOverScore.text = "SCORE∶ "+score;
  }

  gameOverFn() {
    this.gameOver.visible = true;
    Laya.Tween.from(this.gameOver, {alpha:0}, 400);
  }

  gameStart() {
    this.gameOver.visible = false;
    this.nowScore = 0;
    this.setScore(0);
  }

  lookRanking() {
    console.log("查看排行榜！");
  }

  playAgain() {
    console.log("开始游戏")
    Laya.stage.event("gameStart");
  }
}