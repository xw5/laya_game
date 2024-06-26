/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import autoMove from "./autoMove"
import player from "./player"
import startPanel from "./startPanel"
import GameManage from "./GameManage"
import gamePanel from "./gamePanel"
import PausePanel from "./PausePanel"
import GameOver from "./GameOver"
import Car from "./Car"

export default class GameConfig {
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
