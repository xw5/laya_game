export default class player extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:forceRate, tips:"车子力的强度", type:Int, default:6}*/
        let forceRate = 6;
    }
    
    onAwake() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.rig = this.owner.getComponent(Laya.RigidBody);
    }

    mouseDown() {
        var mousex = Laya.stage.mouseX;
        var stageW = Laya.stage.width / 2;
        var forceDirection = 0;
        if (mousex < stageW) {
            forceDirection = -1;
            console.log('left');
        } else {
            forceDirection = 1;
            console.log('right');
        }
        this.rig.linearVelocity={x:forceDirection * Number(this.forceRate), y:0};
    }

    mouseUp() {
        console.log('right');
        this.rig.linearVelocity={x:0, y:0};
    }

    onDisable() {
    }
}