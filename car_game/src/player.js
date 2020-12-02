import Car from "./Car";

export default class player extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:forceRateX, tips:"车子力的强度", type:Int, default:6}*/
        this.forceRateX = 6;
        /** @prop {name:forceRateDeg, tips:"车子力的强度", type:Int, default:25}*/
        this.forceRateDeg = 25;
        this.playerMinx = 200;
        this.playerMaxX = 880;
        this.isBegin = false;
        this.limitPos = [260,450,640,820];
    }
    
    //x 260 450 640 820
    //y 1360
    onAwake() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.rig = this.owner.getComponent(Laya.RigidBody);
        Laya.stage.on("startGame",this, function() {
            this.isBegin = true;
        });
        Laya.stage.on("pause",this, function() {
            this.isBegin = false;
        });

        this.init();

    }

    init() {
        // 随机小汽车初始位置
        var index = this.getRandom(0, this.limitPos.length);
        this.owner.pos(this.limitPos[index], 1360);
    }

    mouseDown() {
        if (!this.isBegin) return;
        if (Laya.stage.mouseY <= 500) return;
        var mousex = Laya.stage.mouseX;
        var stageW = Laya.stage.width / 2;
        var forceDirection = 0;
        if (mousex < stageW) {
            forceDirection = -1;
        } else {
            forceDirection = 1;
        }
        this.rig.linearVelocity={x:forceDirection * this.forceRateX, y:0};
        Laya.Tween.to(this.owner,{rotation:forceDirection*this.forceRateDeg}, 300);
    }

    mouseUp() {
        console.log('right');
        this.rig.linearVelocity={x:0, y:0};
        Laya.Tween.to(this.owner,{rotation:0}, 300);
    }

    onDisable() {
    }

    onTriggerEnter(other) {
        if (other.label == "car") {
            // 游戏结束
            Laya.stage.event("gameOver");
            this.isBegin = false;
        }
        if (other.label == "coin") {
            other.owner.getComponent(Car).recover();
            // 加分 todo
            Laya.stage.event("addScore", 10);
            
        }
    }

    onUpdate() {
        if (this.owner.x < this.playerMinx) {
            this.owner.x = this.playerMinx;
        }
        if (this.owner.x > this.playerMaxX) {
            this.owner.x = this.playerMaxX;
        }
    }

    getRandom(min, max) {
        var value = (max -min)* Math.random();
        return parseInt(min + value);
    }

    resume() {
        this.isBegin = true;
    }

    reset() {
        this.init();
        this.isBegin = true;
    }

}