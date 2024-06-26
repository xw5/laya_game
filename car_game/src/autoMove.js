export default class autoMove extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:speed, tips:"跑道速度", type:Int, default:20}*/
        this.speed = 20;
    }
    
    onAwake() {
        this.height = this.owner.height;
        Laya.timer.frameLoop(1, this, this.moveBg);
    }

    onDisable() {
    }

    moveBg() {
        this.owner.y = this.owner.y + Number(this.speed);
        if (this.owner.y >= this.height) {
            this.owner.y = -this.height;
        }
    }
}