/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-18 21:00
*/
export default class CloumnCreate extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:column, tips:"管道预制体", type:Prefab, default:null}*/
    this.column=null;
    /** @prop {name:columnContainer, tips:"管道容器", type:Node, default:null}*/
    this.columnContainer=null;
    this.ranIntervalTime = 2000;
    this.timer = 0;
    this.canCreateColumn = true;
  }

  onAwake() {
    Laya.stage.on("GameOver", this, function() {
      this.canCreateColumn = false;
    })
  }

  onUpdate() {
    if (!this.canCreateColumn) {
      return;
    }
    this.timer += Laya.timer.delta;
    if (this.timer >= this.ranIntervalTime) {
      this.timer = 0;
      this.ranIntervalTime = this.randomNum(2000, 3500);
      this.createCloumn();
    }
  }

  createCloumn() {
    // 生成bottom管道
    // 300-625
    // var columnBottom = this.column.create();
    var columnBottom = Laya.Pool.getItemByCreateFun("column",this.createFn, this);
    var randomBy = this.randomNum(300, 625);
    columnBottom.rotation = 0;
    columnBottom.x = 1994;
    columnBottom.y = randomBy;
    columnBottom.canAddScore = true;
    this.columnContainer.addChild(columnBottom);

    // 管道间距
    // 200 - 300
    var ranSpacing = this.randomNum(200, 300)

    // 生成top管道
    var columnTop = Laya.Pool.getItemByCreateFun("column",this.createFn, this);
    columnTop.rotation = 180;
    columnTop.x = 2250;
    columnTop.y = randomBy - ranSpacing;
    columnTop.canAddScore = false;
    this.columnContainer.addChild(columnTop);
  }

  randomNum(min, max) {
    let tempArr = [min, max].sort();
    return Math.random() * (tempArr[1] - tempArr[0]) + tempArr[0];
  }

  createFn() {
    return this.column.create();
  }
  
}