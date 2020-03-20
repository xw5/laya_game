import BridCtrl from "./BridCtrl";

/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-17 16:59
*/
export default class AutoRolling extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:speed, tips:"滚动速度", type:Number, default:-3}*/
    this.speed = -3;
  }

  onAwake() {
    //this.bird = Laya.stage.getChildAt(0).getChildAt(0).getChildByName('brid').getComponent(BridCtrl);
    this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:this.speed, y:0};
    Laya.stage.on("gameStart", this, function() {
      this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:this.speed, y:0};
    });
    //console.log(Laya.stage);
  }

  onUpdate() {
    if (BridCtrl.isGameOver()) {
      this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0, y:0};
    }
    if(this.owner.x <= -this.owner.width) {
      this.owner.x += 2*this.owner.width;
    }
  }
}