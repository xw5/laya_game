/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-19 21:51
*/
export default class UiCtrl extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:score, tips:"分数展示", type:Node, default:null}*/
    this.score=null;
    /** @prop {name:gameOverScore, tips:"结束页分数展示", type:Node, default:null}*/
    this.gameOverScore=null;
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
  }

  addScore(val) {
    this.nowScore += val;
    this.score.text = "SCORE∶ "+this.nowScore;
    this.gameOverScore.text = "SCORE∶ "+this.nowScore;
    console.log(this.nowScore);
  }

  lookRanking() {
    console.log("查看排行榜！");
  }

  playAgain() {
    console.log("开始游戏")
  }
}