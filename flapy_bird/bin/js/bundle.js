(function () {
  'use strict';

  /**
  *
  * @ author:xw
  * @ email:412832768@qq.com
  * @ data: 2020-03-17 20:02
  */
  class BridCtrl extends Laya.Script {

    constructor() {
      super();
      /** @prop {name:name, tips:"点击屏幕鸟受到的作用力", type:Number, default:-10}*/
      this.force=-10;
      this.isGameOver = false;
    }

    onAwake() {
       Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
       this.owner.autoAnimation = "idle";
       this.owner.loop = false;
    }

    mouseDown() {
      if (this.isGameOver) {
        return;
      }
      this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0,y:this.force};
      this.owner.autoAnimation = "fly";
      this.owner.once(Laya.Event.COMPLETE,this, function() {
        this.owner.autoAnimation = "idle";
      });
    }

    onTriggerEnter(other) {
      if (other.owner.name == 'topedge') {
        return;
      }

      this.owner.autoAnimation = "die";
      this.isGameOver = true;
      Laya.stage.event("GameOver");
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
      this.bird = null;
    }

    onAwake() {
      this.bird = Laya.stage.getChildAt(0).getChildAt(0).getChildByName('brid').getComponent(BridCtrl);
      this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:this.speed, y:0};
      // Laya.stage.on("GameOver", this, function() {
      //   this.owner.getComponent(Laya.RigidBody).linearVelocity = {x:0, y:0};
      // });
      //console.log(Laya.stage);
    }

    onUpdate() {
      if (this.bird.isGameOver) {
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
      this.canCreateColumn = true;
    }

    onAwake() {
      Laya.stage.on("GameOver", this, function() {
        this.canCreateColumn = false;
      });
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
  class UiCtrl extends Laya.Script {

    constructor() {
      super();
      /** @prop {name:score, tips:"分数展示", type:Node, default:null}*/
      this.score=null;
      /** @prop {name:gameOverScore, tips:"结束页分数展示", type:Node, default:null}*/
      this.gameOverScore=null;
      /** @prop {name:ranking, tips:"排行榜按钮", type:Node, default:null}*/
      this.ranking=null;
      /** @prop {name:again, tips:"重新开始游戏按钮", type:Node, default:null}*/
      this.again=null;
      this.nowScore = 0;
    }

    onAwake() {
      this.ranking.on(Laya.Event.CLICK,this, this.lookRanking);
      this.again.on(Laya.Event.CLICK,this, this.playAgain);
      Laya.stage.on("addScore", this, this.addScore);
    }

    addScore(val) {
      this.nowScore += val;
      this.score.text = "SCORE∶ "+this.nowScore;
      this.gameOverScore.text = "SCORE∶ "+this.nowScore;
      console.log(this.nowScore);
    }

    lookRanking() {
      console.log("查看排行榜！");
    }

    playAgain() {
      console.log("开始游戏");
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
  GameConfig.scaleMode ="fixedwidth";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
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
