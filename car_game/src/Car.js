export default class Car extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:speed, tips:"车速度", type:Number, default: 14}*/
        this.speed = 14;

    }

    init(sign){
        this.sign = sign;
    }

    onAwake() {
        // this.rig = this.owner.getComponent(Laya.RigidBody);
        // this.rig.linearVelocity={x:0, y:this.speed};
        Laya.timer.frameLoop(1, this, this.moveCar)
    }
    
    onEnable() {
    }

    onDisable() {
    }

    moveCar() {
        this.owner.y = this.owner.y + Number(this.speed);
        //console.log("car.js:", this.owner.name);
    }

    onTriggerExit(other) {
        console.log("recover0", other.label, this.sign);
        if (other.label == "bottomCollider") {
            this.recover();
            // console.log("recover1", this.sign);
        }
    }

    recover() {
        Laya.Pool.recover(this.sign,this.owner);
        this.owner.removeSelf();
    }
}