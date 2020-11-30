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

var _player = require("./player");

var _player2 = _interopRequireDefault(_player);

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
            reg("player.js", _player2.default);
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

},{"./autoMove":3,"./player":4,"./startPanel":5}],2:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var player = function (_Laya$Script) {
    _inherits(player, _Laya$Script);

    function player() {
        _classCallCheck(this, player);

        /** @prop {name:forceRate, tips:"车子力的强度", type:Int, default:6}*/
        var _this = _possibleConstructorReturn(this, (player.__proto__ || Object.getPrototypeOf(player)).call(this));

        var forceRate = 6;
        return _this;
    }

    _createClass(player, [{
        key: 'onAwake',
        value: function onAwake() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.rig = this.owner.getComponent(Laya.rigidBody);
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown() {
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
            this.rig.linearVelocity = { x: forceDirection * Number(this.forceRate), y: 0 };
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp() {
            console.log('right');
            this.rig.linearVelocity = { x: 0, y: 0 };
        }
    }, {
        key: 'onDisable',
        value: function onDisable() {}
    }]);

    return player;
}(Laya.Script);

exports.default = player;

},{}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9NYWluLmpzIiwic3JjL2F1dG9Nb3ZlLmpzIiwic3JjL3BsYXllci5qcyIsInNyYy9zdGFydFBhbmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7cWpCQ1ZBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFU7Ozs7Ozs7K0JBQ0g7QUFDVjtBQUNBLGdCQUFJLE1BQU0sS0FBSyxVQUFMLENBQWdCLFFBQTFCO0FBQ04sZ0JBQUksYUFBSixFQUFrQixrQkFBbEI7QUFDQSxnQkFBSSxlQUFKLEVBQW9CLG9CQUFwQjtBQUNBLGdCQUFJLFdBQUosRUFBZ0IsZ0JBQWhCO0FBQ0c7Ozs7OztrQkFQZ0IsVTs7QUFTckIsV0FBVyxLQUFYLEdBQW1CLElBQW5CO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLElBQXBCO0FBQ0EsV0FBVyxTQUFYLEdBQXNCLFNBQXRCO0FBQ0EsV0FBVyxVQUFYLEdBQXdCLFVBQXhCO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLFFBQXBCO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLFFBQXBCO0FBQ0EsV0FBVyxVQUFYLEdBQXdCLGlCQUF4QjtBQUNBLFdBQVcsU0FBWCxHQUF1QixFQUF2QjtBQUNBLFdBQVcsS0FBWCxHQUFtQixLQUFuQjtBQUNBLFdBQVcsSUFBWCxHQUFrQixLQUFsQjtBQUNBLFdBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQVcsaUJBQVgsR0FBK0IsSUFBL0I7O0FBRUEsV0FBVyxJQUFYOzs7Ozs7O0FDM0JBOzs7Ozs7OztJQUNNLEk7QUFDTCxpQkFBYztBQUFBOztBQUNiO0FBQ0EsTUFBSSxPQUFPLFFBQVAsQ0FBSixFQUFzQixP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QSxpQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixLQUFyQjtBQUNIOzs7b0NBRVc7QUFDUixvQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCO0FBQ0EsaUJBQUssUUFBTCxDQUFjLE9BQWQsR0FBd0IsSUFBeEI7QUFDSDs7O3FDQUVZO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxpQkFBSyxRQUFMLENBQWMsT0FBZCxHQUF3QixLQUF4QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLElBQXZCO0FBQ0g7OztvQ0FFVyxDQUNYOzs7O0VBcENtQyxLQUFLLE07O2tCQUF4QixVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgYXV0b01vdmUgZnJvbSBcIi4vYXV0b01vdmVcIlxuaW1wb3J0IHN0YXJ0UGFuZWwgZnJvbSBcIi4vc3RhcnRQYW5lbFwiXG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlnIHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIC8v5rOo5YaMU2NyaXB05oiW6ICFUnVudGltZeW8leeUqFxyXG4gICAgICAgIGxldCByZWcgPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcblx0XHRyZWcoXCJhdXRvTW92ZS5qc1wiLGF1dG9Nb3ZlKTtcblx0XHRyZWcoXCJzdGFydFBhbmVsLmpzXCIsc3RhcnRQYW5lbCk7XG5cdFx0cmVnKFwicGxheWVyLmpzXCIscGxheWVyKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLndpZHRoID0gMTA4MDtcclxuR2FtZUNvbmZpZy5oZWlnaHQgPSAxOTIwO1xyXG5HYW1lQ29uZmlnLnNjYWxlTW9kZSA9XCJzaG93YWxsXCI7XHJcbkdhbWVDb25maWcuc2NyZWVuTW9kZSA9IFwidmVydGljYWxcIjtcclxuR2FtZUNvbmZpZy5hbGlnblYgPSBcIm1pZGRsZVwiO1xyXG5HYW1lQ29uZmlnLmFsaWduSCA9IFwiY2VudGVyXCI7XHJcbkdhbWVDb25maWcuc3RhcnRTY2VuZSA9IFwibWFpblNjZW5lLnNjZW5lXCI7XHJcbkdhbWVDb25maWcuc2NlbmVSb290ID0gXCJcIjtcclxuR2FtZUNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG5HYW1lQ29uZmlnLnN0YXQgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcblxyXG5HYW1lQ29uZmlnLmluaXQoKTtcclxuIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKSB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBhdXRvTW92ZSBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgc3VwZXIoKTsgXHJcbiAgICAgICAgLyoqIEBwcm9wIHtuYW1lOnNwZWVkLCB0aXBzOlwi6LeR6YGT6YCf5bqmXCIsIHR5cGU6SW50LCBkZWZhdWx0OjIwfSovXHJcbiAgICAgICAgbGV0IHNwZWVkID0gMjA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm93bmVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5vd25lci55ID0gdGhpcy5vd25lci55ICsgTnVtYmVyKHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIGlmICh0aGlzLm93bmVyLnkgPj0gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vd25lci55ID0gLXRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHBsYXllciBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgc3VwZXIoKTsgXHJcbiAgICAgICAgLyoqIEBwcm9wIHtuYW1lOmZvcmNlUmF0ZSwgdGlwczpcIui9puWtkOWKm+eahOW8uuW6plwiLCB0eXBlOkludCwgZGVmYXVsdDo2fSovXHJcbiAgICAgICAgbGV0IGZvcmNlUmF0ZSA9IDY7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5yaWcgPSB0aGlzLm93bmVyLmdldENvbXBvbmVudChMYXlhLnJpZ2lkQm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW91c2VEb3duKCkge1xyXG4gICAgICAgIHZhciBtb3VzZXggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB2YXIgc3RhZ2VXID0gTGF5YS5zdGFnZS53aWR0aCAvIDI7XHJcbiAgICAgICAgdmFyIGZvcmNlRGlyZWN0aW9uID0gMDtcclxuICAgICAgICBpZiAobW91c2V4IDwgc3RhZ2VXKSB7XHJcbiAgICAgICAgICAgIGZvcmNlRGlyZWN0aW9uID0gLTE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsZWZ0Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yY2VEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmlnaHQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yaWcubGluZWFyVmVsb2NpdHk9e3g6Zm9yY2VEaXJlY3Rpb24gKiBOdW1iZXIodGhpcy5mb3JjZVJhdGUpLCB5OjB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vdXNlVXAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JpZ2h0Jyk7XHJcbiAgICAgICAgdGhpcy5yaWcubGluZWFyVmVsb2NpdHk9e3g6MCwgeTowfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBzdGFydFBhbmVsIGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICBzdXBlcigpOyBcclxuICAgICAgICAvKiogQHByb3Age25hbWU6YnRuUGxheSwgdGlwczpcIuW8gOWni+aMiemSrlwiLCB0eXBlOk5vZGUsIGRlZmF1bHQ6bnVsbH0qL1xyXG4gICAgICAgIGxldCBidG5QbGF5ID0gbnVsbDtcclxuICAgICAgICAvKiogQHByb3Age25hbWU6YXVkaW9PbiwgdGlwczpcIuW8gOWQr+mfs+S5kOaMiemSrlwiLCB0eXBlOk5vZGUsIGRlZmF1bHQ6bnVsbH0qL1xyXG4gICAgICAgIGxldCBhdWRpb09uID0gbnVsbDtcclxuICAgICAgICAvKiogQHByb3Age25hbWU6YXVkaW9PZmYsIHRpcHM6XCLlhbPpl63mjInpkq5cIiwgdHlwZTpOb2RlLCBkZWZhdWx0Om51bGx9Ki9cclxuICAgICAgICBsZXQgYXVkaW9PZmYgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmJ0blBsYXkub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zdGFydFBsYXkpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Pbi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmF1ZGlvT25Gbik7XHJcbiAgICAgICAgdGhpcy5hdWRpb09mZi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmF1ZGlvT2ZmRm4pO1xyXG4gICAgfVxyXG4gICAgc3RhcnRQbGF5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5ri45oiP5byA5aeLXCIpO1xyXG4gICAgICAgIHRoaXMub3duZXIudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1ZGlvT25GbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWQr+mfs+S5kFwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvT24udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXVkaW9PZmYudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW9PZmZGbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWFs+mXremfs+S5kFwiKTtcclxuICAgICAgICB0aGlzLmF1ZGlvT2ZmLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1ZGlvT24udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgfVxyXG59Il19
