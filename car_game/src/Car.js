export default class Car extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:speed, tips:"车速度", type:Number, default: 14}*/
        let speed = 14;

    }

    onAwake() {

    }
    
    onEnable() {
    }

    onDisable() {
    }

    onUpdate() {
        this.owner.y = this.owner.y + Number(this.speed);
        console.log("car.js:", this.owner.y);
    }
}