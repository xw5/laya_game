/**
*
* @ author:xw
* @ email:412832768@qq.com
* @ data: 2020-03-17 20:02
*/
let isGameOver = false;
export default class BridCtrl extends Laya.Script {

  constructor() {
    super();
    /** @prop {name:name, tips:"点击屏幕鸟受到的作用力", type:Number, default:-10}*/
    this.force=-10;
    isGameOver = false;
  }

  static isGameOver() {
    return isGameOver;
  }

  onAwake() {
     Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
     this.owner.autoAnimation = "idle";
     this.owner.loop = false;
     this.owner.getComponent(Laya.RigidBody).type = "static";
     Laya.stage.on("gameStart",this, this.gameStart);
  }

  mouseDown() {
    if (isGameOver) {
      return;
    }
    this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0,y:this.force};
    this.owner.autoAnimation = "fly";
    this.owner.once(Laya.Event.COMPLETE,this, function() {
      this.owner.autoAnimation = "idle";
    });
  }

  gameStart() {
    isGameOver = false;
    this.owner.getComponent(Laya.RigidBody).type = "dynamic";
    this.owner.pos(312, 423);
    this.owner.rotation = 0;
  }

  onTriggerEnter(other) {
    if (other.owner.name == 'topedge') {
      return;
    }

    this.owner.autoAnimation = "die";
    if (!isGameOver) {
      Laya.stage.event("GameOver");
    }
    isGameOver = true;
  }
}