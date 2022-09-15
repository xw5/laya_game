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
            Laya.timer.frameLoop(1, this, this.moveCar);
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
            Laya.stage.on("pause",this, function() {
                this.isBegin = false;
            });

            this.init();

            Laya.SoundManager.playMusic("res/Sounds/FutureWorld_Dark_Loop_03.ogg", 0);
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
                Laya.SoundManager.playSound("res/Sounds/CarCrash.ogg", 1);
            }
            if (other.label == "coin") {
                other.owner.getComponent(Car).recover();
                // 加分 todo
                Laya.stage.event("addScore", 10);
                Laya.SoundManager.playSound("res/Sounds/Bonus.ogg", 1);
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
            this.isBegin = false;
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
        
        onAwake() {
            this.btnPlay.on(Laya.Event.CLICK, this, this.startPlay);
            this.audioOn.on(Laya.Event.CLICK, this, this.audioOnFn);
            this.audioOff.on(Laya.Event.CLICK, this, this.audioOffFn);
            Laya.stage.on("muted", this, this.muted);
        }
        startPlay() {
            console.log("游戏开始");
            this.owner.visible = false;
            Laya.stage.event("startGame");
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
        }

        audioOnFn() {
            Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            Laya.stage.event("muted", false);
        }

        audioOffFn() {
            Laya.stage.event("muted", true);
        }

        muted(status) {
            console.log("startPanel status:", status);
            Laya.SoundManager.muted = status;
            if (status) {
                this.audioOff.visible = false;
                this.audioOn.visible = true;
            } else {
                this.audioOff.visible = true;
                this.audioOn.visible = false;
            }
        }

        onDisable() {
        }

        homeClick() {
            this.owner.visible = true;
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

    class gamePanel extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:last, tips:"最近成绩", type:Node, default:null}*/
            this.last = null;
            /** @prop {name:best, tips:"最好成绩", type:Node, default:null}*/
            this.best = null;
            /** @prop {name:score, tips:"现在成绩", type:Node, default:null}*/
            this.score = null;
            /** @prop {name:pauseBtn, tips:"音乐暂停按钮", type:Node, default:null}*/
            this.pauseBtn = null;
            this.isBegin = false;
            this.scoreNum = 0;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onAwake() {
            this.pauseBtn.on(Laya.Event.CLICK, this, this.pauseClick);
            // 用第三方字体加载
            Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
                this.last.font = font.fontName;
                this.best.font = font.fontName;
                this.score.font = font.fontName;
            }));
            this.owner.visible = false;
            Laya.stage.on("startGame", this, function() {
                this.owner.visible = true;
                this.isBegin = true;
                this.init();
            });
            Laya.stage.on("gameOver",this, function() {
                this.owner.visible = false;
                this.isBegin = false;
            });
            Laya.timer.loop(300, this, this.addScore);
            Laya.stage.on("addScore", this, this.addScore);
            
        }

        init() {
            var bestScore = Laya.LocalStorage.getItem('bestScore');
            var lastScore = Laya.LocalStorage.getItem('lastScore');
            this.best.text = "Best:"+(bestScore ? bestScore : 0);
            this.last.text = "Last:"+(lastScore ? lastScore : 0);
            this.score.text = 0;
            this.scoreNum = 0;
        }
        
        onEnable() {
        }

        onDisable() {
        }

        addScore(score = 1) {
            if (!this.isBegin) return;
            this.scoreNum += score;
            this.score.text = this.scoreNum;
        }

        pauseClick() {
            Laya.timer.pause();
            Laya.stage.event("pause");
        }

        homeClick() {
            this.owner.visible = false; 
        }

    }

    class PausePanel extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:closeBtn, tips:"关闭按钮", type:Node, default:null}*/
            this.closeBtn = null;
            /** @prop {name:homeBtn, tips:"主页按钮", type:Node, default:null}*/
            this.homeBtn = null;
            /** @prop {name:retryBtn, tips:"重玩按钮", type:Node, default:null}*/
            this.retryBtn = null;
            /** @prop {name:audioOff, tips:"关闭声音", type:Node, default:null}*/
            this.audioOff = null;
            /** @prop {name:audioOn, tips:"开启声音", type:Node, default:null}*/
            this.audioOn = null;
            /** @prop {name:pauseTxt, tips:"暂停文字", type:Node, default:null}*/
            this.pauseTxt = null;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onAwake() {

             // 用第三方字体加载
             Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
                this.pauseTxt.font = font.fontName;
            }));
            Laya.stage.on("pause", this, function() {
                this.owner.visible = true;
            });

            this.closeBtn.on(Laya.Event.CLICK, this, function() {
                this.owner.visible = false;
                Laya.timer.resume();
                this.owner.parent.getChildByName("player").getComponent(player).resume();
                this.owner.parent.getComponent(GameManage).resume();
            });

            this.homeBtn.on(Laya.Event.CLICK, this, function() {
                this.owner.visible = false;
                this.owner.parent.getChildByName("startPanel").getComponent(startPanel).homeClick();
                this.owner.parent.getComponent(GameManage).homeClick();
                this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).homeClick();
                this.owner.parent.getChildByName("player").getComponent(player).reset();
                Laya.timer.resume();
                Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            });

            this.retryBtn.on(Laya.Event.CLICK, this, function() {
                this.owner.visible = false;
                this.owner.parent.getChildByName("player").getComponent(player).reset();
                this.owner.parent.getComponent(GameManage).reset();
                Laya.timer.resume();
                Laya.stage.event("startGame");
                Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            });

            this.audioOff.on(Laya.Event.CLICK, this, function() {
                Laya.stage.event("muted", true);
            });

            this.audioOn.on(Laya.Event.CLICK, this, function() {
                Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
                Laya.stage.event("muted", false);
            });

            Laya.stage.on("muted", this, this.muted);
        }

        muted(status) {
            console.log("startPanel status:", status);
            Laya.SoundManager.muted = status;
            if (status) {
                this.audioOff.visible = false;
                this.audioOn.visible = true;
            } else {
                this.audioOff.visible = true;
                this.audioOn.visible = false;
            }
        }
        
        onEnable() {
        }

        onDisable() {
        }
    }

    class GameOver extends Laya.Script {

        constructor() { 
            super(); 
            /** @prop {name:homeBtn, tips:"主页按钮", type:Node, default:null}*/
            this.homeBtn = null;
            /** @prop {name:retryBtn, tips:"重玩按钮", type:Node, default:null}*/
            this.retryBtn = null;
            /** @prop {name:overTxt, tips:"游戏结束文字", type:Node, default:null}*/
            this.overTxt = null;
            /** @prop {name:scoreTxt, tips:"本局得分", type:Node, default:null}*/
            this.scoreTxt = null;
            /** @prop {name:bestScoreTxt, tips:"最高分", type:Node, default:null}*/
            this.bestScoreTxt = null;
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onAwake() {
            // 用第三方字体加载
            Laya.loader.load('hemiheadbdit.ttf',Laya.Handler.create(this, function(font) {
                this.overTxt.font = font.fontName;
                this.scoreTxt.font = font.fontName;
                this.bestScoreTxt.font = font.fontName;
            }));

            Laya.stage.on("gameOver", this, this.gameOver);

            this.homeBtn.on(Laya.Event.CLICK, this, function() {
                this.owner.visible = false;
                this.owner.parent.getChildByName("startPanel").getComponent(startPanel).homeClick();
                this.owner.parent.getComponent(GameManage).homeClick();
                this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).homeClick();
                this.owner.parent.getChildByName("player").getComponent(player).reset();
                Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            });

            this.retryBtn.on(Laya.Event.CLICK, this, function() {
                this.owner.visible = false;
                this.owner.parent.getChildByName("player").getComponent(player).reset();
                this.owner.parent.getComponent(GameManage).reset();
                Laya.stage.event("startGame");
                Laya.SoundManager.playSound("res/Sounds/ButtonClick.ogg", 1);
            });
        }
        
        onEnable() {
        }

        onDisable() {
        }

        gameOver() {
           this.owner.visible = true;
           var score = this.owner.parent.getChildByName("gamePanel").getComponent(gamePanel).scoreNum;
           this.scoreTxt.text = "Score:"+score;
           var highScore = Number(Laya.LocalStorage.getItem("bestScore"));
           if (score > highScore) {
                Laya.LocalStorage.setItem("bestScore", score);
                this.bestScoreTxt.text = "BestScore:"+score;
           } else {
                this.bestScoreTxt.text = "BestScore:"+highScore;
           }
           Laya.LocalStorage.setItem("lastScore", score);
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
    		reg("gamePanel.js",gamePanel);
    		reg("PausePanel.js",PausePanel);
    		reg("GameOver.js",GameOver);
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
