/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-17 20:02
*/
export default class BridCtrl extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:name, tips:"点击屏幕鸟受到的作用力", type:Number, default:-10}*/
    this.force=-10;
    this.isGameOver = false;
  }

  onAwake() {
     Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
     this.owner.autoAnimation = "idle";
     this.owner.loop = false;
  }

  mouseDown() {
    if (this.isGameOver) {
      return;
    }
    this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0,y:this.force};
    this.owner.autoAnimation = "fly";
    this.owner.once(Laya.Event.COMPLETE,this, function() {
      this.owner.autoAnimation = "idle";
    });
  }

  onTriggerEnter(other) {
    if (other.owner.name == 'topedge') {
      return;
    }

    this.owner.autoAnimation = "die";
    this.isGameOver = true;
    Laya.stage.event("GameOver");
  }
}