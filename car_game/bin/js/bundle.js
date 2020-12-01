(function () {
    'use strict';

    class autoMove extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:speed, tips:"跑道速度", type:Int, default:20}*/
            this.speed = 20;
        }
        
        onAwake() {
            this.height = this.owner.height;
        }

        onDisable() {
        }

        onUpdate() {
            this.owner.y = this.owner.y + Number(this.speed);
            if (this.owner.y >= this.height) {
                this.owner.y = -this.height;
            }
        }
    }

    class player extends Laya.Script {

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

            // 随机小汽车初始位置
            var index = this.getRandom(0, this.limitPos.length);
            this.owner.pos(this.limitPos[index], 1360);
        }

        mouseDown() {
            if (!this.isBegin) return;
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

    }

    class startPanel extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:btnPlay, tips:"开始按钮", type:Node, default:null}*/
            this.btnPlay = null;
            /** @prop {name:audioOn, tips:"开启音乐按钮", type:Node, default:null}*/
            this.audioOn = null;
            /** @prop {name:audioOff, tips:"关闭按钮", type:Node, default:null}*/
            this.audioOff = null;

        }
        
        onEnable() {
            this.btnPlay.on(Laya.Event.CLICK, this, this.startPlay);
            this.audioOn.on(Laya.Event.CLICK, this, this.audioOnFn);
            this.audioOff.on(Laya.Event.CLICK, this, this.audioOffFn);
        }
        startPlay() {
            console.log("游戏开始");
            this.owner.visible = false;
            Laya.stage.event("startGame");
        }

        audioOnFn() {
            console.log("开启音乐");
            this.audioOn.visible = false;
            this.audioOff.visible = true;
        }

        audioOffFn() {
            console.log("关闭音乐");
            this.audioOff.visible = false;
            this.audioOn.visible = true;
        }

        onDisable() {
        }
    }

    class Car extends Laya.Script {

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
        }
        
        onEnable() {
        }

        onDisable() {
        }

        onUpdate() {
            this.owner.y = this.owner.y + Number(this.speed);
            //console.log("car.js:", this.owner.name);
        }

        onTriggerExit(other) {
            console.log("recover0", other.label, this.sign);
            if (other.label == "bottomCollider") {
                Laya.Pool.recover(this.sign,this.owner);
                this.owner.removeSelf();
                console.log("recover1", this.sign);
            }
        }
    }

    class GameManage extends Laya.Script {

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
            /** @prop {name:carp, tips:"汽车", type:Node, default:null}*/
            this.carp = null;
            this.arrX = [190,370,560,760];
            this.typeArr = [1, 2, 3, 4, 5, 6];

        }

        onAwake() {
            // 随机随时生成汽车
            this.loopDur = this.getRandom(400, 1000);
            Laya.timer.loop(this.loopDur, this, function() {
                this.spwan();
                this.loopDur = this.getRandom(400, 1000);
            });
        }
        
        onEnable() {
        }

        onDisable() {
        }

        // x 190 380 570 760
        spwan() { 
            var carY = -300;
            var carX = this.arrX[this.getRandom(0, this.arrX.length)];

            var typeIndex = this.getRandom(0, this.typeArr.length);
            var carIndex = this.typeArr[typeIndex];
            var nowCar = Laya.Pool.getItemByCreateFun(String(carIndex),function() {
                return this['car'+carIndex].create()
            }, this);
            this.carp.addChild(nowCar);
            nowCar.pos(carX, carY);
            console.log("当前坐标：", carX, carY, nowCar.name);
            nowCar.getComponent(Car).init(carIndex);
        }

        getRandom(min, max) {
            var value = (max -min)* Math.random();
            return parseInt(min + value);
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("autoMove.js",autoMove);
    		reg("player.js",player);
    		reg("startPanel.js",startPanel);
    		reg("GameManage.js",GameManage);
    		reg("Car.js",Car);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode ="showall";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "mainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError = true;

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    	}
    }
    //激活启动类
    new Main();

}());
