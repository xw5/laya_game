/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-18 22:52
*/
export default class cloumn extends Laya.Script {

  constructor() {
    super();
    this.canAddScore = true;
  }

  onAwake() {
  }

  onUpdate() {
    if (this.owner.x <= -210) {
      this.owner.removeSelf();
      Laya.Pool.recover("column", this.owner);
      return;
    }
    if (this.canAddScore && this.owner.x <= 75) {
      this.canAddScore = false;
      console.log("增加一分!", this.owner.x, this.owner.y)
      Laya.stage.event("addScore", 1);
    }
  }
}