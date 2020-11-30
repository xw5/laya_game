var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */


var _autoMove = require("./autoMove");

var _autoMove2 = _interopRequireDefault(_autoMove);

var _startPanel = require("./startPanel");

var _startPanel2 = _interopRequireDefault(_startPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameConfig = function () {
    function GameConfig() {
        _classCallCheck(this, GameConfig);
    }

    _createClass(GameConfig, null, [{
        key: "init",
        value: function init() {
            //注册Script或者Runtime引用
            var reg = Laya.ClassUtils.regClass;
            reg("autoMove.js", _autoMove2.default);
            reg("startPanel.js", _startPanel2.default);
        }
    }]);

    return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 1080;
GameConfig.height = 1920;
GameConfig.scaleMode = "showall";
GameConfig.screenMode = "vertical";
GameConfig.alignV = "middle";
GameConfig.alignH = "center";
GameConfig.startScene = "mainScene.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./autoMove":3,"./startPanel":4}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = require("./GameConfig");

var _GameConfig2 = _interopRequireDefault(_GameConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
	function Main() {
		_classCallCheck(this, Main);

		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(_GameConfig2.default.width, _GameConfig2.default.height);else Laya.init(_GameConfig2.default.width, _GameConfig2.default.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = _GameConfig2.default.scaleMode;
		Laya.stage.screenMode = _GameConfig2.default.screenMode;
		Laya.stage.alignV = _GameConfig2.default.alignV;
		Laya.stage.alignH = _GameConfig2.default.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = _GameConfig2.default.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (_GameConfig2.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (_GameConfig2.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (_GameConfig2.default.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	_createClass(Main, [{
		key: "onVersionLoaded",
		value: function onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}
	}, {
		key: "onConfigLoaded",
		value: function onConfigLoaded() {
			//加载IDE指定的场景
			_GameConfig2.default.startScene && Laya.Scene.open(_GameConfig2.default.startScene);
		}
	}]);

	return Main;
}();
//激活启动类


new Main();

},{"./GameConfig":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var autoMove = function (_Laya$Script) {
    _inherits(autoMove, _Laya$Script);

    function autoMove() {
        _classCallCheck(this, autoMove);

        /** @prop {name:speed, tips:"跑道速度", type:Int, default:20}*/
        var _this = _possibleConstructorReturn(this, (autoMove.__proto__ || Object.getPrototypeOf(autoMove)).call(this));

        var speed = 20;
        return _this;
    }

    _createClass(autoMove, [{
        key: "onAwake",
        value: function onAwake() {
            this.height = this.owner.height;
        }
    }, {
        key: "onDisable",
        value: function onDisable() {}
    }, {
        key: "onUpdate",
        value: function onUpdate() {
            this.owner.y = this.owner.y + Number(this.speed);
            if (this.owner.y >= this.height) {
                this.owner.y = -this.height;
            }
        }
    }]);

    return autoMove;
}(Laya.Script);

exports.default = autoMove;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var startPanel = function (_Laya$Script) {
    _inherits(startPanel, _Laya$Script);

    function startPanel() {
        _classCallCheck(this, startPanel);

        /** @prop {name:btnPlay, tips:"开始按钮", type:Node, default:null}*/
        var _this = _possibleConstructorReturn(this, (startPanel.__proto__ || Object.getPrototypeOf(startPanel)).call(this));

        var btnPlay = null;
        /** @prop {name:audioOn, tips:"开启音乐按钮", type:Node, default:null}*/
        var audioOn = null;
        /** @prop {name:audioOff, tips:"关闭按钮", type:Node, default:null}*/
        var audioOff = null;

        return _this;
    }

    _createClass(startPanel, [{
        key: "onEnable",
        value: function onEnable() {
            this.btnPlay.on(Laya.Event.CLICK, this, this.startPlay);
            this.audioOn.on(Laya.Event.CLICK, this, this.audioOnFn);
            this.audioOff.on(Laya.Event.CLICK, this, this.audioOffFn);
        }
    }, {
        key: "startPlay",
        value: function startPlay() {
            console.log("游戏开始");
            this.owner.visible = false;
        }
    }, {
        key: "audioOnFn",
        value: function audioOnFn() {
            console.log("开启音乐");
            this.audioOn.visible = false;
            this.audioOff.visible = true;
        }
    }, {
        key: "audioOffFn",
        value: function audioOffFn() {
            console.log("关闭音乐");
            this.audioOff.visible = false;
            this.audioOn.visible = true;
        }
    }, {
        key: "onDisable",
        value: function onDisable() {}
    }]);

    return startPanel;
}(Laya.Script);

exports.default = startPanel;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9NYWluLmpzIiwic3JjL2F1dG9Nb3ZlLmpzIiwic3JjL3N0YXJ0UGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztxakJDVkE7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFU7Ozs7Ozs7K0JBQ0g7QUFDVjtBQUNBLGdCQUFJLE1BQU0sS0FBSyxVQUFMLENBQWdCLFFBQTFCO0FBQ04sZ0JBQUksYUFBSixFQUFrQixrQkFBbEI7QUFDQSxnQkFBSSxlQUFKLEVBQW9CLG9CQUFwQjtBQUNHOzs7Ozs7a0JBTmdCLFU7O0FBUXJCLFdBQVcsS0FBWCxHQUFtQixJQUFuQjtBQUNBLFdBQVcsTUFBWCxHQUFvQixJQUFwQjtBQUNBLFdBQVcsU0FBWCxHQUFzQixTQUF0QjtBQUNBLFdBQVcsVUFBWCxHQUF3QixVQUF4QjtBQUNBLFdBQVcsTUFBWCxHQUFvQixRQUFwQjtBQUNBLFdBQVcsTUFBWCxHQUFvQixRQUFwQjtBQUNBLFdBQVcsVUFBWCxHQUF3QixpQkFBeEI7QUFDQSxXQUFXLFNBQVgsR0FBdUIsRUFBdkI7QUFDQSxXQUFXLEtBQVgsR0FBbUIsS0FBbkI7QUFDQSxXQUFXLElBQVgsR0FBa0IsS0FBbEI7QUFDQSxXQUFXLFlBQVgsR0FBMEIsS0FBMUI7QUFDQSxXQUFXLGlCQUFYLEdBQStCLElBQS9COztBQUVBLFdBQVcsSUFBWDs7Ozs7OztBQ3pCQTs7Ozs7Ozs7SUFDTSxJO0FBQ0wsaUJBQWM7QUFBQTs7QUFDYjtBQUNBLE1BQUksT0FBTyxRQUFQLENBQUosRUFBc0IsT0FBTyxJQUFQLENBQVkscUJBQVcsS0FBdkIsRUFBOEIscUJBQVcsTUFBekMsRUFBdEIsS0FD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USxHQUFSLENBQVksTUFBWjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQXJCO0FBQ0g7OztvQ0FFVztBQUNSLG9CQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkI7QUFDQSxpQkFBSyxRQUFMLENBQWMsT0FBZCxHQUF3QixJQUF4QjtBQUNIOzs7cUNBRVk7QUFDVCxvQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxPQUFkLEdBQXdCLEtBQXhCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsSUFBdkI7QUFDSDs7O29DQUVXLENBQ1g7Ozs7RUFwQ21DLEtBQUssTTs7a0JBQXhCLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBhdXRvTW92ZSBmcm9tIFwiLi9hdXRvTW92ZVwiXG5pbXBvcnQgc3RhcnRQYW5lbCBmcm9tIFwiLi9zdGFydFBhbmVsXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWcge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgLy/ms6jlhoxTY3JpcHTmiJbogIVSdW50aW1l5byV55SoXHJcbiAgICAgICAgbGV0IHJlZyA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuXHRcdHJlZyhcImF1dG9Nb3ZlLmpzXCIsYXV0b01vdmUpO1xuXHRcdHJlZyhcInN0YXJ0UGFuZWwuanNcIixzdGFydFBhbmVsKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLndpZHRoID0gMTA4MDtcclxuR2FtZUNvbmZpZy5oZWlnaHQgPSAxOTIwO1xyXG5HYW1lQ29uZmlnLnNjYWxlTW9kZSA9XCJzaG93YWxsXCI7XHJcbkdhbWVDb25maWcuc2NyZWVuTW9kZSA9IFwidmVydGljYWxcIjtcclxuR2FtZUNvbmZpZy5hbGlnblYgPSBcIm1pZGRsZVwiO1xyXG5HYW1lQ29uZmlnLmFsaWduSCA9IFwiY2VudGVyXCI7XHJcbkdhbWVDb25maWcuc3RhcnRTY2VuZSA9IFwibWFpblNjZW5lLnNjZW5lXCI7XHJcbkdhbWVDb25maWcuc2NlbmVSb290ID0gXCJcIjtcclxuR2FtZUNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG5HYW1lQ29uZmlnLnN0YXQgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcblxyXG5HYW1lQ29uZmlnLmluaXQoKTtcclxuIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKSB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBhdXRvTW92ZSBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgc3VwZXIoKTsgXHJcbiAgICAgICAgLyoqIEBwcm9wIHtuYW1lOnNwZWVkLCB0aXBzOlwi6LeR6YGT6YCf5bqmXCIsIHR5cGU6SW50LCBkZWZhdWx0OjIwfSovXHJcbiAgICAgICAgbGV0IHNwZWVkID0gMjA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm93bmVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5vd25lci55ID0gdGhpcy5vd25lci55ICsgTnVtYmVyKHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIGlmICh0aGlzLm93bmVyLnkgPj0gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vd25lci55ID0gLXRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0YXJ0UGFuZWwgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHN1cGVyKCk7IFxyXG4gICAgICAgIC8qKiBAcHJvcCB7bmFtZTpidG5QbGF5LCB0aXBzOlwi5byA5aeL5oyJ6ZKuXCIsIHR5cGU6Tm9kZSwgZGVmYXVsdDpudWxsfSovXHJcbiAgICAgICAgbGV0IGJ0blBsYXkgPSBudWxsO1xyXG4gICAgICAgIC8qKiBAcHJvcCB7bmFtZTphdWRpb09uLCB0aXBzOlwi5byA5ZCv6Z+z5LmQ5oyJ6ZKuXCIsIHR5cGU6Tm9kZSwgZGVmYXVsdDpudWxsfSovXHJcbiAgICAgICAgbGV0IGF1ZGlvT24gPSBudWxsO1xyXG4gICAgICAgIC8qKiBAcHJvcCB7bmFtZTphdWRpb09mZiwgdGlwczpcIuWFs+mXreaMiemSrlwiLCB0eXBlOk5vZGUsIGRlZmF1bHQ6bnVsbH0qL1xyXG4gICAgICAgIGxldCBhdWRpb09mZiA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuYnRuUGxheS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnN0YXJ0UGxheSk7XHJcbiAgICAgICAgdGhpcy5hdWRpb09uLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuYXVkaW9PbkZuKTtcclxuICAgICAgICB0aGlzLmF1ZGlvT2ZmLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuYXVkaW9PZmZGbik7XHJcbiAgICB9XHJcbiAgICBzdGFydFBsYXkoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmuLjmiI/lvIDlp4tcIik7XHJcbiAgICAgICAgdGhpcy5vd25lci52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW9PbkZuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5ZCv6Z+z5LmQXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Pbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdWRpb09mZi52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhdWRpb09mZkZuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5YWz6Zet6Z+z5LmQXCIpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9PZmYudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Pbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcbn0iXX0=
