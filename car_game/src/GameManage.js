export default class GameManage extends Laya.Script {

    constructor() { 
        super(); 
        /** @prop {name:car1, tips:"汽车", type:Prefab, default:null}*/
        let car1 = null;
        /** @prop {name:car2, tips:"汽车", type:Prefab, default:null}*/
        let car2 = null;
        /** @prop {name:car3, tips:"汽车", type:Prefab, default:null}*/
        let car3 = null;
        /** @prop {name:car4, tips:"汽车", type:Prefab, default:null}*/
        let car4 = null;
        /** @prop {name:car5, tips:"汽车", type:Prefab, default:null}*/
        let car5 = null;
        /** @prop {name:car6, tips:"汽车", type:Prefab, default:null}*/
        let car6 = null;

    }

    onAwake() {
        // 随机随时生成汽车
        // this.loopDur = this.getRandom(1000, 3000);
        // Laya.timer.loop(this.loopDur, this, function() {
        //     // this.spwan();
        //     this.loopDur = this.getRandom(1000, 3000);
        //     var nowCar = this.car1.create();
        //     Laya.stage.addChild(nowCar);
        //     nowCar.pos(100, 100)
        // });
        var nowCar = this.car1.create();
        Laya.stage.addChild(nowCar);
        nowCar.pos(100, 100)
    }
    
    onEnable() {
    }

    onDisable() {
    }

    // x 190 380 570 760
    spwan() {
        var arrX = [190,380,570,760];
        var carY = -300;
        var carX = arrX[this.getRandom(0, arrX.length)];

        var typeArr = [1,2,3,4,5,6];
        var typeIndex = this.getRandom(0, typeArr.length);
        var nowCar = null;
        switch(typeArr[typeIndex]){
            case 1:
                nowCar = this.car1.create();
                break;
            case 2:
                nowCar = this.car2.create();
                break;
            case 3:
                nowCar = this.car3.create();
                break;
            case 4:
                nowCar = this.car4.create();
                break;
            case 5:
                nowCar = this.car5.create();
                break;
            case 6:
                nowCar = this.car6.create();
                break;           
        }
        Laya.stage.addChild(nowCar);
        nowCar.pos(carX, carY);
    }

    getRandom(min, max) {
        var value = (max -min)* Math.random();
        return parseInt(min + value);
    }
}