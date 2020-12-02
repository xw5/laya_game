import Car from "./Car";

export default class GameManage extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:car1, tips:"汽车", type:Prefab, default:null}*/
        this.car1 = null;
        /** @prop {name:car2, tips:"汽车", type:Prefab, default:null}*/
        this.car2 = null;
        /** @prop {name:car3, tips:"汽车", type:Prefab, default:null}*/
        this.car3 = null;
        /** @prop {name:car4, tips:"汽车", type:Prefab, default:null}*/
        this.car4 = null;
        /** @prop {name:car5, tips:"汽车", type:Prefab, default:null}*/
        this.car5 = null;
        /** @prop {name:car6, tips:"汽车", type:Prefab, default:null}*/
        this.car6 = null;
        /** @prop {name:car7, tips:"金币", type:Prefab, default:null}*/
        this.car7 = null;
        /** @prop {name:carp, tips:"汽车", type:Node, default:null}*/
        this.carp = null;
        this.arrX = [190,370,560,760];
        this.typeArr = [1, 2, 3, 4, 5, 6, 7];
        this.begin = false;
        this.pause = false;
        this.totalCars = [];
    }

    onAwake() {
        // 随机随时生成汽车
        this.loopDur = this.getRandom(400, 1000);
        Laya.timer.loop(this.loopDur, this, function() {
            this.spwan();
            this.loopDur = this.getRandom(400, 1000);
        });
        Laya.stage.on("startGame",this, function() {
            this.begin = true;
        });
        Laya.stage.on("gameOver",this, function() {
            this.gameOver();
        });
        Laya.stage.on("pause",this, function() {
            this.begin = false;
        });
    }
    
    onEnable() {
    }

    onDisable() {
    }

    // x 190 380 570 760
    spwan() { 
        if (!this.begin) return;
        var carY = -300;
        var carX = this.arrX[this.getRandom(0, this.arrX.length)];

        var typeIndex = this.getRandom(0, this.typeArr.length);
        var carIndex = this.typeArr[typeIndex];
        var nowCar = Laya.Pool.getItemByCreateFun(String(carIndex),function() {
            return this['car'+carIndex].create()
        }, this);
        this.carp.addChild(nowCar);
        nowCar.pos(carX, carY);
        //console.log("当前坐标：", carX, carY, nowCar.name);
        nowCar.getComponent(Car).init(carIndex);
        this.totalCars.push(nowCar);
    }

    getRandom(min, max) {
        var value = (max -min)* Math.random();
        return parseInt(min + value);
    }

    clearCars() {
        this.totalCars.forEach(function(item){
            item.removeSelf();
        });
    }

    gameOver() {
        this.begin = false;
        this.clearCars();
    }

    homeClick() {
        this.gameOver();
    }

    resume() {
        this.begin = true;
    }

    reset() {
        this.clearCars();
    }
}