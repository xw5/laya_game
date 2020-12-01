(function () {
  'use strict';

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-17 20:02
  */
  let isGameOver = false;
  class BridCtrl extends Laya.Script {

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
      Laya.SoundManager.playSound("./audio/fly.mp3", 1);
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
      Laya.SoundManager.playSound("./audio/die.mp3", 1);
    }
  }

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-17 16:59
  */
  class AutoRolling extends Laya.Script {

    constructor() {
      super();
      /** @prop {name:speed, tips:"滚动速度", type:Number, default:-3}*/
      this.speed = -3;
    }

    onAwake() {
      //this.bird = Laya.stage.getChildAt(0).getChildAt(0).getChildByName('brid').getComponent(BridCtrl);
      this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:this.speed, y:0};
      Laya.stage.on("gameStart", this, function() {
        this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:this.speed, y:0};
      });
      //console.log(Laya.stage);
      Laya.SoundManager.playMusic("./audio/bgmusic.mp3", 0);
    }

    onUpdate() {
      if (BridCtrl.isGameOver()) {
        this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0, y:0};
      }
      if(this.owner.x <= -this.owner.width) {
        this.owner.x += 2*this.owner.width;
      }
    }
  }

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-18 22:52
  */
  class cloumn extends Laya.Script {

    constructor() {
      super();
      this.canAddScore = true;
    }

    onAwake() {
    }

    onUpdate() {
      if (this.owner.x <= -210) {
        this.owner.removeSelf();
        Laya.Pool.recover("column", this.owner);
        return;
      }
      if (this.canAddScore && this.owner.x <= 75) {
        this.canAddScore = false;
        console.log("增加一分!", this.owner.x, this.owner.y);
        Laya.stage.event("addScore", 1);
        Laya.SoundManager.playSound("./audio/score.mp3", 1);
      }
    }
  }

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-18 21:00
  */
  class CloumnCreate extends Laya.Script {

    constructor() {
      super();
      /** @prop {name:column, tips:"管道预制体", type:Prefab, default:null}*/
      this.column=null;
      /** @prop {name:columnContainer, tips:"管道容器", type:Node, default:null}*/
      this.columnContainer=null;
      this.ranIntervalTime = 2000;
      this.timer = 0;
      this.canCreateColumn = false;
      this.columnList = [];
    }

    onAwake() {
      Laya.stage.on("GameOver", this, this.gameOver);
      Laya.stage.on("gameStart",this, this.gameStart);
    }

    onUpdate() {
      if (!this.canCreateColumn) {
        return;
      }
      this.timer += Laya.timer.delta;
      if (this.timer >= this.ranIntervalTime) {
        this.timer = 0;
        this.ranIntervalTime = this.randomNum(2500, 4000);
        this.createCloumn();
      }
    }

    gameOver() {
      this.canCreateColumn = false;
    }

    gameStart() {
      this.columnList.forEach((item) => {
        item.removeSelf();
      });
      this.columnList = [];
      this.canCreateColumn = true;
    }

    createCloumn() {
      // 生成bottom管道
      // 300-625
      // var columnBottom = this.column.create();
      var columnBottom = Laya.Pool.getItemByCreateFun("column",this.createFn, this);
      var randomBy = this.randomNum(300, 625);
      columnBottom.rotation = 0;
      columnBottom.x = 1994;
      columnBottom.y = randomBy;
      this.columnContainer.addChild(columnBottom);
      columnBottom.getComponent(cloumn).canAddScore = true;
      this.columnList.push(columnBottom);
      // 管道间距
      // 200 - 300
      var ranSpacing = this.randomNum(260, 350);

      // 生成top管道
      var columnTop = Laya.Pool.getItemByCreateFun("column",this.createFn, this);
      columnTop.rotation = 180;
      columnTop.x = 2250;
      columnTop.y = randomBy - ranSpacing;
      this.columnContainer.addChild(columnTop);
      columnTop.getComponent(cloumn).canAddScore = false;
      this.columnList.push(columnTop);
    }

    randomNum(min, max) {
      let tempArr = [min, max].sort();
      return Math.random() * (tempArr[1] - tempArr[0]) + tempArr[0];
    }

    createFn() {
      return this.column.create();
    }
    
  }

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-19 21:51
  */
  let isStart = false;
  class UiCtrl extends Laya.Script {

    constructor() {
      super();
      /** @prop {name:score, tips:"分数展示", type:Node, default:null}*/
      this.score=null;
      /** @prop {name:gameOverScore, tips:"结束页分数展示", type:Node, default:null}*/
      this.gameOverScore=null;
      /** @prop {name:gameHighestScore, tips:"游戏最高分", type:Node, default:null}*/
      this.gameHighestScore=null;
      /** @prop {name:gameOver, tips:"结束页ui", type:Node, default:null}*/
      this.gameOver=null;
      /** @prop {name:startTxt, tips:"结束页ui", type:Node, default:null}*/
      this.startTxt=null;
      /** @prop {name:again, tips:"重新开始游戏按钮", type:Node, default:null}*/
      this.again=null;
      this.nowScore = 0;
    }

    onAwake() {
      this.again.on(Laya.Event.CLICK,this, this.playAgain);
      Laya.stage.on("addScore", this, this.addScore);
      Laya.stage.on("GameOver",this, this.gameOverFn);
      Laya.stage.on("gameStart",this, this.gameStart);
      Laya.stage.on(Laya.Event.CLICK, this, function(){
        if (!isStart) {
          this.startTxt.visible = false;
          Laya.stage.event("gameStart");
          isStart = true;
        }
      });
    }

    addScore(val) {
      this.nowScore += val;
      this.setScore(this.nowScore);
      console.log(this.nowScore);
    }

    setScore(score) {
      this.score.text = "得分∶ "+score;
      this.gameOverScore.text = "本局得分∶ "+score;
    }

    gameOverFn() {
      this.gameOver.visible = true;
      Laya.Tween.from(this.gameOver, {alpha:0}, 400);
      let highestScore = Laya.LocalStorage.getItem("highestBridScore");
      if (!highestScore || highestScore < this.nowScore) {
        highestScore = this.nowScore;
      }
      this.gameHighestScore.text = "历史最高∶ "+highestScore;
      Laya.LocalStorage.setItem("highestBridScore", highestScore);
    }

    gameStart() {
      this.gameOver.visible = false;
      this.nowScore = 0;
      this.setScore(0);
    }

    playAgain() {
      console.log("开始游戏");
      Laya.stage.event("gameStart");
    }
  }

  /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

  class GameConfig {
      static init() {
          //注册Script或者Runtime引用
          let reg = Laya.ClassUtils.regClass;
  		reg("scripts/AutoRolling.js",AutoRolling);
  		reg("scripts/BridCtrl.js",BridCtrl);
  		reg("scripts/CloumnCreate.js",CloumnCreate);
  		reg("scripts/UiCtrl.js",UiCtrl);
  		reg("scripts/cloumn.js",cloumn);
      }
  }
  GameConfig.width = 2048;
  GameConfig.height = 1024;
  GameConfig.scaleMode ="showall";
  GameConfig.screenMode = "horizontal";
  GameConfig.alignV = "middle";
  GameConfig.alignH = "center";
  GameConfig.startScene = "game_scene.scene";
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
