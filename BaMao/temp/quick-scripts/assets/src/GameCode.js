(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/GameCode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a3e4d+V4mZKjp5nQrI/akrz', 'GameCode', __filename);
// src/GameCode.ts

//////////Module common//////////
//////////controller/Command.ts//////////
var game;
(function (game) {
    var common;
    (function (common) {
        /**
         * 整个游戏的进行顺序为:
         * INIT_MODULE(await) -> CHANGE_SCENE("login") -> 登录中 -> REGISTER_NET -> ENTER_GAME_LOADING(await) -> CHANGE_SCENE("hall"|"game")
         */
        var Command = /** @class */ (function () {
            function Command() {
            }
            /**
             * 初始化模块
             * @type {string}
             */
            Command.INIT_MODULE = "init_module";
            /**
             * 切换场景
             * @type {string}
             */
            Command.CHANGE_SCENE = "change_scene";
            /**
             * 进入游戏加载，一般有进度条显示
             * @type {string}
             */
            Command.ENTER_GAME_LOADING = "enter_game_loading";
            /**
             * 显示界面
             * @type {string}
             */
            Command.OPEN_VIEW = "open_view";
            /**
             * 关闭界面
             * @type {string}
             */
            Command.CLOSE_VIEW = "close_view";
            /**
             * 关闭场景
             * @type {string}
             */
            Command.CLOSE_SCENE = "close_scene";
            /**
             * 注册网络监听
             * @type {string}
             */
            Command.REGISTER_NET = "register_net";
            /**
             * AI 控制
             * @type {string}
             */
            Command.AI_CONTROLLER = "ai_controller";
            return Command;
        }());
        common.Command = Command;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////controller/notification/OpenViewNB.ts//////////
(function (game) {
    var common;
    (function (common) {
        var OpenViewNB = /** @class */ (function () {
            function OpenViewNB(name, data) {
                if (data === void 0) { data = null; }
                this._name = name;
                this._data = data;
            }
            Object.defineProperty(OpenViewNB.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OpenViewNB.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            return OpenViewNB;
        }());
        common.OpenViewNB = OpenViewNB;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////controller/notification/CloseViewNB.ts//////////
(function (game) {
    var common;
    (function (common) {
        var CloseViewNB = /** @class */ (function () {
            function CloseViewNB(name) {
                this._name = name;
            }
            Object.defineProperty(CloseViewNB.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            return CloseViewNB;
        }());
        common.CloseViewNB = CloseViewNB;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////controller/notification/InitModuleNB.ts//////////
(function (game) {
    var common;
    (function (common) {
        var InitModuleNB = /** @class */ (function () {
            function InitModuleNB(rootView, progress) {
                this._rootView = rootView;
                this._progress = progress;
            }
            Object.defineProperty(InitModuleNB.prototype, "rootView", {
                get: function () {
                    return this._rootView;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InitModuleNB.prototype, "progress", {
                get: function () {
                    return this._progress;
                },
                enumerable: true,
                configurable: true
            });
            return InitModuleNB;
        }());
        common.InitModuleNB = InitModuleNB;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////controller/notification/ChangeSceneNB.ts//////////
(function (game) {
    var common;
    (function (common) {
        var ChangeSceneNB = /** @class */ (function () {
            function ChangeSceneNB(sceneName, data) {
                if (data === void 0) { data = null; }
                this._sceneName = sceneName;
                this._data = data;
            }
            Object.defineProperty(ChangeSceneNB.prototype, "sceneName", {
                get: function () {
                    return this._sceneName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChangeSceneNB.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            return ChangeSceneNB;
        }());
        common.ChangeSceneNB = ChangeSceneNB;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////controller/notification/CloseSceneNB.ts//////////
(function (game) {
    var common;
    (function (common) {
        var CloseSceneNB = /** @class */ (function () {
            function CloseSceneNB(sceneName, data) {
                if (data === void 0) { data = null; }
                this._sceneName = sceneName;
                this._data = data;
            }
            Object.defineProperty(CloseSceneNB.prototype, "sceneName", {
                get: function () {
                    return this._sceneName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CloseSceneNB.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            return CloseSceneNB;
        }());
        common.CloseSceneNB = CloseSceneNB;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//////////Module ui//////////
//////////model/proxy/SettingProxy.ts//////////
(function (game) {
    var ui;
    (function (ui) {
        var SettingProxy = /** @class */ (function () {
            function SettingProxy() {
            }
            return SettingProxy;
        }());
        ui.SettingProxy = SettingProxy;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//////////view/Panel.ts//////////
(function (game) {
    var ui;
    (function (ui) {
        var Panel = /** @class */ (function (_super) {
            __extends(Panel, _super);
            function Panel(scaleMode) {
                if (scaleMode === void 0) { scaleMode = 1; }
                var _this = _super.call(this) || this;
                _this._scaleMode = scaleMode;
                return _this;
            }
            Object.defineProperty(Panel.prototype, "scaleMode", {
                get: function () {
                    return this._scaleMode;
                },
                set: function (val) {
                    this._scaleMode = ~~val;
                },
                enumerable: true,
                configurable: true
            });
            Panel.prototype.onLoad = function () {
                var size = lib.data.system.screen.value;
                var width = this.node.width || ui.SettingProxy.designWidth;
                var height = this.node.height || ui.SettingProxy.designHeight;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    }
                    else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            };
            return Panel;
        }(cc.Component));
        ui.Panel = Panel;
    })(ui = game.ui || (game.ui = {}));
})(game || (game = {}));
//////////Module layer//////////
//////////view/LayerModule.ts//////////
(function (game) {
    var layer;
    (function (layer) {
        var LayerModule = /** @class */ (function (_super) {
            __extends(LayerModule, _super);
            function LayerModule() {
                return _super.call(this, LayerModule.NAME) || this;
            }
            LayerModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE];
            };
            LayerModule.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (note.name) {
                            case game.common.Command.INIT_MODULE:
                                data = note.body;
                                this.rootNode = new cc.Node();
                                // this.rootNode.x = cc.director.getVisibleSize().width / 2;
                                // this.rootNode.y = cc.director.getVisibleSize().height / 2;
                                data.rootView.addChild(this.rootNode);
                                this.rootNode.addChild(new layer.GameLayer());
                                this.rootNode.addChild(new layer.MainUILayer());
                                this.rootNode.addChild(new layer.PopLayer());
                                this.rootNode.addChild(new layer.TopLayer());
                                break;
                        }
                        return [2 /*return*/];
                    });
                });
            };
            LayerModule.NAME = "layer";
            return LayerModule;
        }(mvc.Module));
        layer.LayerModule = LayerModule;
    })(layer = game.layer || (game.layer = {}));
})(game || (game = {}));
//////////view/GameLayer.ts//////////
(function (game) {
    var layer;
    (function (layer) {
        var GameLayer = /** @class */ (function (_super) {
            __extends(GameLayer, _super);
            function GameLayer() {
                var _this = _super.call(this) || this;
                GameLayer.instance = _this;
                return _this;
            }
            GameLayer.show = function (node) {
                if (node.parent != GameLayer.instance) {
                    GameLayer.instance.addChild(node);
                }
            };
            return GameLayer;
        }(cc.Node));
        layer.GameLayer = GameLayer;
    })(layer = game.layer || (game.layer = {}));
})(game || (game = {}));
//////////view/MainUILayer.ts//////////
(function (game) {
    var layer;
    (function (layer) {
        var MainUILayer = /** @class */ (function (_super) {
            __extends(MainUILayer, _super);
            function MainUILayer() {
                var _this = _super.call(this) || this;
                MainUILayer.instance = _this;
                return _this;
            }
            MainUILayer.show = function (node) {
                if (node.parent != MainUILayer.instance) {
                    MainUILayer.instance.addChild(node);
                }
            };
            return MainUILayer;
        }(cc.Node));
        layer.MainUILayer = MainUILayer;
    })(layer = game.layer || (game.layer = {}));
})(game || (game = {}));
//////////view/PopLayer.ts//////////
(function (game) {
    var layer;
    (function (layer) {
        var PopLayer = /** @class */ (function (_super) {
            __extends(PopLayer, _super);
            function PopLayer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return PopLayer;
        }(cc.Node));
        layer.PopLayer = PopLayer;
    })(layer = game.layer || (game.layer = {}));
})(game || (game = {}));
//////////view/TopLayer.ts//////////
(function (game) {
    var layer;
    (function (layer) {
        var TopLayer = /** @class */ (function (_super) {
            __extends(TopLayer, _super);
            function TopLayer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TopLayer;
        }(cc.Node));
        layer.TopLayer = TopLayer;
    })(layer = game.layer || (game.layer = {}));
})(game || (game = {}));
//////////Module startup//////////
//////////AppFacade.ts//////////
(function (game) {
    /**
     * 游戏数据
     * @type {{}}
     */
    game.data = {};
    /**
     * 游戏网络 VBWebsocket
     * @type {null}
     */
    game.net = null;
    // export var net = null;
    var startup;
    (function (startup) {
        startup.ModuleName = "startup";
        startup.ModuleNone = "";
        var AppFacade = /** @class */ (function (_super) {
            __extends(AppFacade, _super);
            function AppFacade() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AppFacade.prototype.initializeController = function () {
                _super.prototype.initializeController.call(this);
                cc.director.setDisplayStats(false);
                //注册启动程序
                this.registerCommand(startup.Command.IN.START_UP, startup.StartupCommand);
            };
            /**
             * 启动
             */
            AppFacade.prototype.start = function (rootView) {
                //发送启动消息
                this.sendNotification(startup.Command.IN.START_UP, new game.common.InitModuleNB(rootView, lib.DataManager.createData("ProgressData")));
            };
            /**
             * 启动
             */
            AppFacade.start = function (rootView) {
                if (!AppFacade.instance) {
                    AppFacade.instance = new AppFacade(AppFacade.NAME);
                    AppFacade.instance.start(rootView);
                }
            };
            AppFacade.NAME = "gameApp";
            return AppFacade;
        }(mvc.Facade));
        startup.AppFacade = AppFacade;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/Command.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var Command = /** @class */ (function () {
            function Command() {
            }
            /**
             * 内部消息
             */
            Command.IN = {
                START_UP: "startup.start_up" //启动
            };
            /**
             * 希望外部处理的消息
             */
            Command.OUT = {};
            /**
             * 处理模块外部的消息
             */
            Command.INTERFACE = {
                EXIT: "exit" //退出模块，清除所有模块相关的东西
            };
            return Command;
        }());
        startup.Command = Command;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/startup/StartupCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var StartupCommand = /** @class */ (function (_super) {
            __extends(StartupCommand, _super);
            function StartupCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StartupCommand.prototype.initializeMacroCommand = function () {
                this.addSubCommand(startup.InitModuleCommand);
            };
            return StartupCommand;
        }(mvc.MacroCommand));
        startup.StartupCommand = StartupCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/startup/InitModuleCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var InitModuleCommand = /** @class */ (function (_super) {
            __extends(InitModuleCommand, _super);
            function InitModuleCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            InitModuleCommand.prototype.execute = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var progress, max;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.facade.registerModule(new game.layer.LayerModule());
                                this.facade.registerModule(new game.bamaoGame.BaMaoGameModule());
                                this.facade.registerModule(new game.bamaoStart.BaMaoStartModule());
                                this.facade.registerModule(new game.bamaoResult.BaMaoResultModule());
                                this.facade.registerModule(new game.loading.LoadingModule());
                                this.facade.registerModule(new game.musicTest.MusicTestModule());
                                this.facade.registerModule(new game.runGame.RunGameModule());
                                this.facade.registerModule(new game.motion.MotionModule());
                                this.facade.registerModule(new game.crg.CRGModule());
                                progress = note.body.progress;
                                progress.current = progress.max = 1;
                                //调用模块初始化消息
                                this.sendNotification(game.common.Command.INIT_MODULE, note.body);
                                max = 1;
                                if (!(progress.percent != max)) return [3 /*break*/, 2];
                                return [4 /*yield*/, progress.percentValue.valueEqual(max)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                this.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("bamaoStart"));
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return InitModuleCommand;
        }(mvc.SimpleCommand));
        startup.InitModuleCommand = InitModuleCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/restart/RestartCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var AppFacade = game.startup.AppFacade;
        var RestartCommand = /** @class */ (function (_super) {
            __extends(RestartCommand, _super);
            function RestartCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            RestartCommand.prototype.initializeMacroCommand = function () {
                //清理 mvc
                this.addSubCommand(startup.ClearMVCCommand);
                //清理数据模块
                this.addSubCommand(startup.ClearDataCommand);
                //清理 lib 库内容
                this.addSubCommand(startup.ClearLibCommand);
                //启动
                AppFacade.start();
            };
            return RestartCommand;
        }(mvc.MacroCommand));
        startup.RestartCommand = RestartCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/restart/ClearMVCCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var ClearMVCCommand = /** @class */ (function (_super) {
            __extends(ClearMVCCommand, _super);
            function ClearMVCCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ClearMVCCommand.prototype.execute = function (note) {
                mvc.Facade.remove(startup.AppFacade.NAME);
                mvc.Model.remove(startup.AppFacade.NAME);
                mvc.View.remove(startup.AppFacade.NAME);
                mvc.Controller.remove(startup.AppFacade.NAME);
            };
            return ClearMVCCommand;
        }(mvc.SimpleCommand));
        startup.ClearMVCCommand = ClearMVCCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/restart/ClearDataCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var ClearDataCommand = /** @class */ (function (_super) {
            __extends(ClearDataCommand, _super);
            function ClearDataCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ClearDataCommand.prototype.execute = function (note) {
                game.data = null;
            };
            return ClearDataCommand;
        }(mvc.SimpleCommand));
        startup.ClearDataCommand = ClearDataCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////controller/restart/ClearLibCommand.ts//////////
(function (game) {
    var startup;
    (function (startup) {
        var ClearLibCommand = /** @class */ (function (_super) {
            __extends(ClearLibCommand, _super);
            function ClearLibCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ClearLibCommand.prototype.execute = function (note) {
            };
            return ClearLibCommand;
        }(mvc.SimpleCommand));
        startup.ClearLibCommand = ClearLibCommand;
    })(startup = game.startup || (game.startup = {}));
})(game || (game = {}));
//////////Module loading//////////
//////////view/LoadingModule.ts//////////
(function (game) {
    var loading;
    (function (loading) {
        var LoadingModule = /** @class */ (function (_super) {
            __extends(LoadingModule, _super);
            function LoadingModule() {
                return _super.call(this, LoadingModule.NAME) || this;
            }
            LoadingModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE];
            };
            LoadingModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        //初始化 view
                        this.facade.registerMediator(new loading.MainMediator());
                        break;
                }
            };
            LoadingModule.NAME = "loading";
            return LoadingModule;
        }(mvc.Module));
        loading.LoadingModule = LoadingModule;
    })(loading = game.loading || (game.loading = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var loading;
    (function (loading) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                return _super.call(this, MainMediator.NAME, null) || this;
            }
            MainMediator.prototype.initUI = function () {
                this.viewComponent = new loading.LoadingView();
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.asyncLoad.call(this, resolve);
                        this.initUI();
                        this.loadComplete();
                        return [2 /*return*/];
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                this.data = note.body.data;
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.MainUILayer.show(this.viewComponent);
                                    this.viewComponent.text = note.body.data.text;
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent) {
                                    this.viewComponent.destroy();
                                    this.viewComponent = null;
                                }
                                cc.audioEngine.stop(this.bgm);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "loading.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        loading.MainMediator = MainMediator;
    })(loading = game.loading || (game.loading = {}));
})(game || (game = {}));
//////////view/LoadingView.ts//////////
(function (game) {
    var loading;
    (function (loading) {
        var LoadingView = /** @class */ (function (_super) {
            __extends(LoadingView, _super);
            function LoadingView() {
                var _this = _super.call(this) || this;
                _this.addComponent(cc.Label);
                _this.label = _this.getComponent(cc.Label);
                _this.label.fontSize = 20;
                _this.color = new cc.Color(255, 255, 255);
                return _this;
            }
            Object.defineProperty(LoadingView.prototype, "text", {
                set: function (val) {
                    this.label.string = val;
                },
                enumerable: true,
                configurable: true
            });
            return LoadingView;
        }(cc.Node));
        loading.LoadingView = LoadingView;
    })(loading = game.loading || (game.loading = {}));
})(game || (game = {}));
//////////Module bamaoStart//////////
//////////proxy/Resource.ts//////////
(function (game) {
    var bamaoStart;
    (function (bamaoStart) {
        var Resource = /** @class */ (function () {
            function Resource() {
                this.loadList = [
                    { name: "ui", data: game.prefab.ui1, url: "resources/baMaoStart/res/baMaoUI.prefab" },
                    { name: "bgm", url: "resources/baMaoStart/res/bgm/1.mp3" },
                    {
                        name: "levelConfig",
                        url: "resources/bamaoStart/res/config/level.csv",
                        execute: Resource.configLoadComplete
                    }
                ];
            }
            Resource.configLoadComplete = function () {
                bamaoStart.ConfigProxy.init();
                var len = bamaoStart.ConfigProxy.levelCount;
                for (var i = 0; i < len; i++) {
                    var cfg = bamaoStart.ConfigProxy.getLevelAt(i);
                    Resource.instance.loadList.push({ name: "levelBackground" + cfg.level, url: "resources/baMaoStart/res/textures/" + cfg.background });
                    Resource.instance.loadList.push({ name: "levelBgm" + cfg.level, url: "resources/baMaoStart/res/bgm/" + cfg.music });
                }
            };
            Resource.loadResources = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list;
                    return __generator(this, function (_a) {
                        Resource.instance = new Resource();
                        list = Resource.instance.loadList;
                        return [2 /*return*/, new Promise(function (resolve) {
                                var index = 0;
                                function load() {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var res, loader, result;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (index >= list.length) {
                                                        bamaoStart.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB("loading.MainMediator"));
                                                        resolve();
                                                        return [2 /*return*/];
                                                    }
                                                    res = list[index];
                                                    bamaoStart.mainMediator.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB("loading.MainMediator", { text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name }));
                                                    if (!res.data) return [3 /*break*/, 1];
                                                    index++;
                                                    load();
                                                    return [3 /*break*/, 4];
                                                case 1:
                                                    if (!(res.type == "URLLoader")) return [3 /*break*/, 3];
                                                    loader = new lib.URLLoader(res.url);
                                                    return [4 /*yield*/, loader.load()];
                                                case 2:
                                                    result = _a.sent();
                                                    res.data = result.data;
                                                    index++;
                                                    load();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    cc.loader.load(cc.url.raw(res.url), function (e, data) {
                                                        res.data = data;
                                                        index++;
                                                        if (res.execute) {
                                                            res.execute();
                                                        }
                                                        load();
                                                    });
                                                    _a.label = 4;
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                                load();
                            }.bind(this))];
                    });
                });
            };
            Resource.getResource = function (name) {
                for (var i = 0; i < Resource.instance.loadList.length; i++) {
                    if (Resource.instance.loadList[i].name == name) {
                        return Resource.instance.loadList[i].data;
                    }
                }
                return null;
            };
            return Resource;
        }());
        bamaoStart.Resource = Resource;
    })(bamaoStart = game.bamaoStart || (game.bamaoStart = {}));
})(game || (game = {}));
//////////proxy/ConfigProxy.ts//////////
(function (game) {
    var bamaoStart;
    (function (bamaoStart) {
        var ConfigProxy = /** @class */ (function () {
            function ConfigProxy() {
            }
            ConfigProxy.init = function () {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;
                    // //分析 AllConfig
                    // ConfigProxy.allConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("allConfig"));
                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(bamaoStart.Resource.getResource("levelConfig"));
                }
            };
            ConfigProxy.getLevelAt = function (index) {
                return ConfigProxy.levelConfig.getItemAt(index);
            };
            Object.defineProperty(ConfigProxy, "levelCount", {
                get: function () {
                    return ConfigProxy.levelConfig.length;
                },
                enumerable: true,
                configurable: true
            });
            ConfigProxy.decodeConfig = function (content) {
                var res = new lib.ArrayValue();
                var list = content.split("\n");
                var keys = [];
                for (var i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    var itemList = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    }
                    else {
                        var item = {};
                        for (var j = 0; j < itemList.length; j++) {
                            if (j == 0 && !itemList[j]) {
                                item = null;
                                break;
                            }
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        if (item) {
                            res.push(item);
                        }
                    }
                }
                return res;
            };
            ConfigProxy.flag = false;
            ConfigProxy.levelConfig = new lib.ArrayValue();
            return ConfigProxy;
        }());
        bamaoStart.ConfigProxy = ConfigProxy;
    })(bamaoStart = game.bamaoStart || (game.bamaoStart = {}));
})(game || (game = {}));
//////////view/BaMaoStartModule.ts//////////
(function (game) {
    var bamaoStart;
    (function (bamaoStart) {
        var BaMaoStartModule = /** @class */ (function (_super) {
            __extends(BaMaoStartModule, _super);
            function BaMaoStartModule() {
                return _super.call(this, BaMaoStartModule.NAME) || this;
            }
            BaMaoStartModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            BaMaoStartModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new bamaoStart.MainMediator());
                        //
                        // //初始化 model
                        // //1. 加载网络监听对象
                        // this.receiveNetProxies.push(new NoticeCProxy());
                        // this.receiveNetProxies.push(new TestRecvCProxy());
                        // //2. 初始化 proxy
                        //
                        // //初始化 controller
                        // this.facade.registerCommand(Command.IN.AUTO_LOGIN, AutoLoginCommand);
                        // this.facade.registerCommand(Command.IN.LOGIN_GAME_SERVER, LoginCompleteCommand);
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == BaMaoStartModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(bamaoStart.MainMediator.NAME));
                        }
                        break;
                    case game.common.Command.REGISTER_NET://注册网络模块
                        // for (let i = 0; i < this.receiveNetProxies.length; i++) {
                        //     this.receiveNetProxies[i].registerNet(game.net);
                        // }
                        break;
                }
            };
            BaMaoStartModule.NAME = "bamaoStart";
            return BaMaoStartModule;
        }(mvc.Module));
        bamaoStart.BaMaoStartModule = BaMaoStartModule;
    })(bamaoStart = game.bamaoStart || (game.bamaoStart = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var bamaoStart;
    (function (bamaoStart) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                var _this = _super.call(this, MainMediator.NAME, null) || this;
                bamaoStart.mainMediator = _this;
                return _this;
            }
            MainMediator.prototype.initUI = function () {
                this.viewComponent = new cc.Node();
                this.viewComponent.addComponent(bamaoStart.MainComponent);
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.asyncLoad.call(this, resolve);
                                return [4 /*yield*/, bamaoStart.Resource.loadResources()];
                            case 1:
                                _a.sent();
                                this.initUI();
                                this.loadComplete();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.MainUILayer.show(this.viewComponent);
                                    lib.Tween.to(this.viewComponent, 1, { opacity: 255 }, null, { opacity: 0 });
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    this.viewComponent.parent.removeChild(this.viewComponent);
                                    this.viewComponent.destroy();
                                    this.viewComponent = null;
                                }
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "bamaoStart.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        bamaoStart.MainMediator = MainMediator;
    })(bamaoStart = game.bamaoStart || (game.bamaoStart = {}));
})(game || (game = {}));
//////////view/MainComponent.ts//////////
(function (game) {
    var bamaoStart;
    (function (bamaoStart) {
        var MainComponent = /** @class */ (function (_super) {
            __extends(MainComponent, _super);
            function MainComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.levelIndex = 0;
                return _this;
            }
            MainComponent.prototype.start = function () {
                var ui = cc.instantiate(bamaoStart.Resource.getResource("ui"));
                this.node.addChild(ui);
                //开始按钮
                ui.getChildByName("startBtn").on(cc.Node.EventType.TOUCH_END, this.onClickStart, this);
                ui.getChildByName("leftBtn").on(cc.Node.EventType.TOUCH_END, this.onClickLeft, this);
                ui.getChildByName("rightBtn").on(cc.Node.EventType.TOUCH_END, this.onClickRight, this);
                this.nameLabel = ui.getChildByName("levelName").getComponent(cc.Label);
                this.descLabel = ui.getChildByName("levelDesc").getComponent(cc.Label);
                this.backgroundContainer = ui.getChildByName("levelBg");
                this.showLevel();
            };
            MainComponent.prototype.onClickLeft = function () {
                this.levelIndex--;
                if (this.levelIndex == -1) {
                    this.levelIndex = bamaoStart.ConfigProxy.levelCount - 1;
                }
                this.showLevel();
            };
            MainComponent.prototype.onClickRight = function () {
                this.levelIndex++;
                if (this.levelIndex == bamaoStart.ConfigProxy.levelCount) {
                    this.levelIndex = 0;
                }
                this.showLevel();
            };
            MainComponent.prototype.showLevel = function () {
                var cfg = bamaoStart.ConfigProxy.getLevelAt(this.levelIndex);
                this.nameLabel.string = cfg.name;
                this.descLabel.string = lib.StringDo.replaceString(cfg.desc, "<br>", "\n");
                if (this.bgm != null) {
                    cc.audioEngine.stop(this.bgm);
                }
                this.bgm = cc.audioEngine.play(bamaoStart.Resource.getResource("levelBgm" + cfg.level), true, 1);
                var old = this.background;
                if (this.background) {
                    lib.Tween.to(this.background, 0.5, { opacity: 0 }).call(function () {
                        old.destroy();
                    });
                }
                this.background = new cc.Node();
                this.background.addComponent(cc.Sprite);
                var sprite = this.background.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(bamaoStart.Resource.getResource("levelBackground" + cfg.level));
                this.backgroundContainer.addChild(this.background);
                if (old) {
                    this.background.opacity = 0;
                    lib.Tween.to(this.background, 0.5, { opacity: 255 });
                }
            };
            MainComponent.prototype.onClickStart = function () {
                if (this.bgm != null) {
                    cc.audioEngine.stop(this.bgm);
                }
                this.destroy();
                bamaoStart.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(bamaoStart.MainMediator.NAME));
                bamaoStart.mainMediator.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("crg", bamaoStart.ConfigProxy.getLevelAt(this.levelIndex).level));
            };
            return MainComponent;
        }(cc.Component));
        bamaoStart.MainComponent = MainComponent;
    })(bamaoStart = game.bamaoStart || (game.bamaoStart = {}));
})(game || (game = {}));
//////////Module bamaoGame//////////
//////////proxy/Resource.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var Resource = /** @class */ (function () {
            function Resource() {
            }
            Resource.getResource = function (name) {
                for (var i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            };
            Resource.loadResources = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list;
                    return __generator(this, function (_a) {
                        list = Resource.loadList;
                        return [2 /*return*/, new Promise(function (resolve) {
                                var index = 0;
                                var load = function () {
                                    if (index >= list.length) {
                                        bamaoGame.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB("loading.MainMediator"));
                                        resolve();
                                        return;
                                    }
                                    var res = list[index];
                                    bamaoGame.mainMediator.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB("loading.MainMediator", { text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name }));
                                    if (res.resourceType == "effect") {
                                        if (!res.loadIndex) {
                                            res.pictures = [];
                                            res.loadIndex = 0;
                                            res.loadLength = res.nameEnd - res.nameBegin + 1;
                                            res.data = {
                                                pictures: [],
                                                frameTime: res.frameTime
                                            };
                                        }
                                        else {
                                            if (res.loadIndex == res.loadLength) {
                                                index++;
                                                load();
                                                return;
                                            }
                                        }
                                        var count = res.loadIndex + res.nameBegin;
                                        var name = "" + count;
                                        while (name.length < res.nameCount) {
                                            name = "0" + name;
                                        }
                                        cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e, data) {
                                            res.data.pictures.push(data);
                                            res.loadIndex++;
                                            if (res.loadIndex == res.loadLength) {
                                                index++;
                                            }
                                            load();
                                        });
                                    }
                                    else {
                                        cc.loader.load(cc.url.raw(res.url), function (e, data) {
                                            res.data = data;
                                            index++;
                                            load();
                                        });
                                    }
                                };
                                load();
                            }.bind(this))];
                    });
                });
            };
            Resource.loadList = [
                { name: "allConfig", url: "resources/baMaoGame/res/config/All.csv" },
                { name: "levelConfig", url: "resources/baMaoGame/res/config/Level.csv" },
                { name: "bgm", url: "resources/baMaoGame/res/bgm/game1.wav" },
                // {name: "readygo", url: "resources/baMaoGame/res/music/readygo.mp3"},
                { name: "rhythmTip", url: "resources/baMaoGame/res/music/tip.wav" },
                { name: "rhythmMiss", url: "resources/baMaoGame/res/music/miss.wav" },
                { name: "rhythmGood", url: "resources/baMaoGame/res/music/good.wav" },
                { name: "rhythmPerfect", url: "resources/baMaoGame/res/music/perfect.wav" },
                { name: "monster", url: "resources/baMaoGame/res/textures/monster.png" },
                { name: "monsterHand", url: "resources/baMaoGame/res/textures/monsterHand.png" },
                { name: "doctorHand", url: "resources/baMaoGame/res/textures/doctorHand.png" },
                { name: "cut", url: "resources/baMaoGame/res/textures/cut.png" },
                { name: "band", url: "resources/baMaoGame/res/textures/band.png" },
                { name: "back1", url: "resources/baMaoGame/res/textures/background/back1.png" },
                { name: "back2", url: "resources/baMaoGame/res/textures/background/back2.png" },
                { name: "back3", url: "resources/baMaoGame/res/textures/background/back3.png" },
                { name: "role1", url: "resources/baMaoGame/res/textures/role/role1.png" },
                { name: "role2", url: "resources/baMaoGame/res/textures/role/role2.png" },
                { name: "role3", url: "resources/baMaoGame/res/textures/role/role3.png" },
                { name: "facePerfect", url: "resources/baMaoGame/res/textures/face/perfect.png" },
                { name: "faceGood", url: "resources/baMaoGame/res/textures/face/good.png" },
                { name: "faceMiss", url: "resources/baMaoGame/res/textures/face/miss.png" },
                { name: "faceNormal", url: "resources/baMaoGame/res/textures/face/normal.png" },
                { name: "faceResult1", url: "resources/baMaoGame/res/textures/face/result1.png" },
                { name: "faceResult2", url: "resources/baMaoGame/res/textures/face/result2.png" },
                { name: "faceResult3", url: "resources/baMaoGame/res/textures/face/result3.png" },
                {
                    name: "tip",
                    url: "resources/baMaoGame/res/textures/effect/",
                    resourceType: "effect",
                    namePre: "jl",
                    nameCount: 4,
                    nameBegin: 1,
                    nameEnd: 16,
                    nameFileEnd: "png",
                    frameTime: 33
                }
            ];
            return Resource;
        }());
        bamaoGame.Resource = Resource;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////proxy/RoundProxy.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var RoundProxy = /** @class */ (function () {
            function RoundProxy() {
                //combo数
                this.combo = 0;
                //分数
                this.score = 0;
                //perfect
                this.perfect = 0;
                //good
                this.good = 0;
                //miss
                this.miss = 0;
                //bgm
                this.bgm = null;
                //tweenList
                this.tweenList = [];
                /**
                 * 处理事件
                 */
                this.events = [];
                /**
                 * 上一次的运行时间
                 */
                this.lastTime = 0;
                /**
                 * 在提示前多久开始播放手的动画
                 * @type {number}
                 */
                this.tipTime = bamaoGame.ConfigProxy.getConfig("tipHandTime");
                /**
                 * 在操作前多久开始播放提示特效
                 * @type {number}
                 */
                this.operateTipTime = bamaoGame.ConfigProxy.getConfig("tipEffectTime");
                /**
                 * 是否有点击
                 * @type {boolean}
                 */
                this.clickFlag = false;
                /**
                 * 记录某个拍子是否操作过了
                 * @type {any[]}
                 */
                this.operate = [];
                /**
                 * 游戏当前运行时间
                 */
                this.time = 0;
                //表情切换时间
                this.faceChangeTime = bamaoGame.ConfigProxy.getConfig("faceChangeTime");
                /**
                 * 游戏阶段
                 * tip 演示阶段
                 * operate 操作阶段
                 * @type {string}
                 */
                this.gameMonment = "";
                /**
                 * perfect 判定时间
                 * @type {number}
                 */
                this.perfectTime = bamaoGame.ConfigProxy.getConfig("perfectTime");
                /**
                 * good 判定时间
                 * @type {number}
                 */
                this.goodTime = bamaoGame.ConfigProxy.getConfig("goodTime");
                /**
                 * miss 判定时间
                 * @type {number}
                 */
                this.missTime = bamaoGame.ConfigProxy.getConfig("missTime");
                this.config = [
                    {
                        operate: 1,
                        time: 0,
                        cut: 4
                    },
                    {
                        operate: 2,
                        time: 700
                    },
                    {
                        operate: 3,
                        time: 1000,
                        index: 0
                    },
                    {
                        operate: 3,
                        time: 2000,
                        index: 1
                    },
                    {
                        operate: 3,
                        time: 3000,
                        index: 2
                    },
                    {
                        operate: 3,
                        time: 4000,
                        index: 3
                    },
                    {
                        operate: 4,
                        time: 5000
                    },
                    {
                        operate: 5,
                        time: 6000
                    },
                    {
                        operate: 6,
                        time: 7000,
                        index: 0
                    },
                    {
                        operate: 6,
                        time: 8000,
                        index: 1
                    },
                    {
                        operate: 6,
                        time: 9000,
                        index: 2
                    },
                    {
                        operate: 6,
                        time: 10000,
                        index: 3
                    },
                    {
                        operate: 7,
                        time: 13000
                    },
                    {
                        operate: 8,
                        time: 14000
                    },
                    //第二关
                    {
                        operate: 1,
                        time: 15000,
                        cut: 3
                    },
                    {
                        operate: 2,
                        time: 16000
                    },
                    {
                        operate: 3,
                        time: 17000,
                        index: 0
                    },
                    {
                        operate: 3,
                        time: 18000,
                        index: 2
                    },
                    {
                        operate: 4,
                        time: 19000
                    },
                    {
                        operate: 5,
                        time: 20000
                    },
                    {
                        operate: 6,
                        time: 21000,
                        index: 0
                    },
                    {
                        operate: 6,
                        time: 22000,
                        index: 2
                    },
                    {
                        operate: 7,
                        time: 25000
                    },
                    {
                        operate: 8,
                        time: 26000
                    },
                    {
                        operate: 9,
                        time: 27000
                    }
                ];
            }
            return RoundProxy;
        }());
        bamaoGame.RoundProxy = RoundProxy;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////proxy/ConfigProxy.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var ConfigProxy = /** @class */ (function () {
            function ConfigProxy() {
            }
            ConfigProxy.init = function () {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;
                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(bamaoGame.Resource.getResource("allConfig"));
                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(bamaoGame.Resource.getResource("levelConfig"));
                }
            };
            ConfigProxy.getConfig = function (name) {
                var item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            };
            ConfigProxy.decodeConfig = function (content) {
                var res = new lib.ArrayValue();
                var list = content.split("\n");
                var keys = [];
                for (var i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    var itemList = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    }
                    else {
                        var item = {};
                        for (var j = 0; j < itemList.length; j++) {
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        res.push(item);
                    }
                }
                return res;
            };
            ConfigProxy.getGameConfig = function () {
                var cfg = [];
                var time = 0;
                var len = ConfigProxy.getConfig("gameOverLevel");
                for (var i = 0; i < len; i++) {
                    var levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                //临时加入游戏结束
                cfg.push({
                    operate: 9,
                    time: time
                });
                return cfg;
            };
            ConfigProxy.getRandomLevel = function (startTime) {
                var levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                var list = [];
                var time = startTime;
                //怪物进场
                list.push({
                    operate: 1,
                    time: time,
                    cut: 0
                });
                //提示轮开始
                time += ConfigProxy.getConfig("monsterEnterTime");
                list.push({
                    operate: 2,
                    time: time,
                });
                //计算提示拍子
                time += ConfigProxy.getConfig("tipStartTime");
                var count = 0;
                var start = list.length;
                for (var i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 3,
                            time: time,
                            index: list.length - start
                        });
                        list[0].cut++;
                    }
                    else {
                        count++;
                    }
                }
                //提示轮结束
                time += ConfigProxy.getConfig("tipEndTime");
                list.push({
                    operate: 4,
                    time: time
                });
                //操作轮开始
                time += ConfigProxy.getConfig("tipGapTime");
                list.push({
                    operate: 5,
                    time: time
                });
                //计算操作拍子
                time += ConfigProxy.getConfig("operateSrartTime");
                count = 0;
                start = list.length;
                for (var i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start
                        });
                    }
                    else {
                        count++;
                    }
                }
                //操作轮结束
                time += ConfigProxy.getConfig("operateEndTime");
                list.push({
                    operate: 7,
                    time: time
                });
                //怪物退场
                time += ConfigProxy.getConfig("monsterExitTime");
                list.push({
                    operate: 8,
                    time: time
                });
                return list;
            };
            ConfigProxy.getLevelConfigTime = function (cfg) {
                for (var i = 0; i < cfg.length; i++) {
                    if (cfg[i].operate == 8) {
                        return cfg[i].time;
                    }
                }
                return 0;
            };
            ConfigProxy.flag = false;
            ConfigProxy.levelConfig = new lib.ArrayValue();
            return ConfigProxy;
        }());
        bamaoGame.ConfigProxy = ConfigProxy;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////proxy/GameMoment.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var GameMoment = /** @class */ (function () {
            function GameMoment() {
            }
            GameMoment.NONE = "";
            /**
             * 提示阶段
             * @type {string}
             */
            GameMoment.TIP = "tip";
            /**
             * 操作阶段
             * @type {string}
             */
            GameMoment.OPERATE = "operate";
            return GameMoment;
        }());
        bamaoGame.GameMoment = GameMoment;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/BaMaoGameModule.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var BaMaoGameModule = /** @class */ (function (_super) {
            __extends(BaMaoGameModule, _super);
            function BaMaoGameModule() {
                return _super.call(this, BaMaoGameModule.NAME) || this;
            }
            BaMaoGameModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            BaMaoGameModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new bamaoGame.MainMediator());
                        //
                        // //初始化 model
                        // //1. 加载网络监听对象
                        // this.receiveNetProxies.push(new NoticeCProxy());
                        // this.receiveNetProxies.push(new TestRecvCProxy());
                        // //2. 初始化 proxy
                        //
                        // //初始化 controller
                        // this.facade.registerCommand(Command.IN.AUTO_LOGIN, AutoLoginCommand);
                        // this.facade.registerCommand(Command.IN.LOGIN_GAME_SERVER, LoginCompleteCommand);
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == BaMaoGameModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(bamaoGame.MainMediator.NAME));
                        }
                        break;
                    case game.common.Command.REGISTER_NET://注册网络模块
                        // for (let i = 0; i < this.receiveNetProxies.length; i++) {
                        //     this.receiveNetProxies[i].registerNet(game.net);
                        // }
                        break;
                }
            };
            BaMaoGameModule.NAME = "bamaoGame";
            return BaMaoGameModule;
        }(mvc.Module));
        bamaoGame.BaMaoGameModule = BaMaoGameModule;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                var _this = _super.call(this, MainMediator.NAME, null) || this;
                bamaoGame.mainMediator = _this;
                return _this;
            }
            MainMediator.prototype.init = function () {
                this.viewComponent = new cc.Node();
                this.viewComponent.addComponent(bamaoGame.MainComponent);
                bamaoGame.ConfigProxy.init();
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.asyncLoad.call(this, resolve);
                                return [4 /*yield*/, bamaoGame.Resource.loadResources()];
                            case 1:
                                _a.sent();
                                this.init();
                                this.loadComplete();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                game.layer.MainUILayer.show(this.viewComponent);
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent) {
                                    this.viewComponent.destroy();
                                    this.viewComponent = null;
                                }
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "bamaoGame.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        bamaoGame.MainMediator = MainMediator;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/MainComponent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var MainComponent = /** @class */ (function (_super) {
            __extends(MainComponent, _super);
            function MainComponent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.scaleMode = 0;
                _this.lastTime = 0;
                return _this;
            }
            MainComponent.prototype.start = function () {
                this.proxy = new bamaoGame.RoundProxy();
                this.proxy.config = bamaoGame.ConfigProxy.getGameConfig();
                this.proxy.node = this.node;
                this.proxy.events = [
                    new bamaoGame.GameStartEvent(),
                    new bamaoGame.GameFinishEvent(),
                    new bamaoGame.MonsterEnterEvent(),
                    new bamaoGame.MonsterExitEvent(),
                    new bamaoGame.OperateRoundStartEvent(),
                    new bamaoGame.OperateRhythmEvent(),
                    new bamaoGame.OperateRoundFinishEvent(),
                    new bamaoGame.TipRoundStartEvent(),
                    new bamaoGame.TipRhythmEvent(),
                    new bamaoGame.TipRoundFinishEvent(),
                    new bamaoGame.OperateEvent()
                ];
                this.schedule(this.update, 0.016, 10000000000);
            };
            MainComponent.prototype.update = function () {
                var time = (new Date()).getTime();
                var timeGap = time - this.lastTime;
                if (timeGap > 30) {
                    timeGap = 30;
                }
                this.proxy.time += timeGap;
                this.lastTime = time;
                var events = this.proxy.events;
                for (var i = 0; i < events.length; i++) {
                    events[i].execute(this.proxy);
                }
                this.proxy.lastTime = this.proxy.time;
            };
            MainComponent.prototype.onLoad = function () {
                this.node.width = 640;
                this.node.height = 960;
                this.scaleMode = 1;
                var size = lib.data.system.screen.value;
                var width = this.node.width;
                var height = this.node.height;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    }
                    else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            };
            return MainComponent;
        }(cc.Graphics));
        bamaoGame.MainComponent = MainComponent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/Effect.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        /**
         * 序列帧特效
         */
        var Effect = /** @class */ (function (_super) {
            __extends(Effect, _super);
            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            function Effect(config) {
                var _this = _super.call(this) || this;
                _this.frameTime = config.frameTime;
                _this.pictures = config.pictures;
                _this.length = _this.pictures.length;
                _this.loop = !!config.loop;
                _this.frame = 0;
                _this.update = _this.update.bind(_this);
                _this.addComponent(cc.Sprite);
                var sprite = _this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(_this.update, _this.frameTime / 1000, 10000000000);
                _this.update();
                return _this;
            }
            Effect.prototype.update = function () {
                var sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            };
            Effect.prototype.destroy = function () {
                this.getComponent(cc.Sprite).unschedule(this.update);
                _super.prototype.destroy.call(this);
                return true;
            };
            return Effect;
        }(cc.Node));
        bamaoGame.Effect = Effect;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/GameEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var GameEvent = /** @class */ (function () {
            function GameEvent() {
            }
            GameEvent.prototype.execute = function (proxy) {
            };
            return GameEvent;
        }());
        bamaoGame.GameEvent = GameEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/GameStartEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        var GameStartEvent = /** @class */ (function (_super) {
            __extends(GameStartEvent, _super);
            function GameStartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameStartEvent.prototype.execute = function (proxy) {
                if (proxy.lastTime == 0) {
                    proxy.bgm = cc.audioEngine.play(bamaoGame.Resource.getResource("bgm"), true, 0.1);
                }
            };
            return GameStartEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.GameStartEvent = GameStartEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/GameFinishEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var GameFinishEvent = /** @class */ (function (_super) {
            __extends(GameFinishEvent, _super);
            function GameFinishEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameFinishEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 9) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            if (proxy.bgm != null) {
                                cc.audioEngine.stop(proxy.bgm);
                                proxy.bgm = null;
                            }
                            //清除动画
                            while (proxy.tweenList.length) {
                                proxy.tweenList.pop().dispose();
                            }
                            //弹出结果内容
                            bamaoGame.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(bamaoGame.MainMediator.NAME));
                            bamaoGame.mainMediator.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("bamaoResult", {
                                score: proxy.score,
                                perfect: proxy.perfect,
                                good: proxy.good,
                                miss: proxy.miss
                            }));
                        }
                    }
                }
            };
            return GameFinishEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.GameFinishEvent = GameFinishEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateRhythmEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var OperateRhythmEvent = /** @class */ (function (_super) {
            __extends(OperateRhythmEvent, _super);
            function OperateRhythmEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateRhythmEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                var findNext = false;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (proxy.lastTime <= list[i].time - proxy.operateTipTime && list[i].time - proxy.operateTipTime < proxy.time) {
                            //加特效
                            var effect = new bamaoGame.Effect(bamaoGame.Resource.getResource("tip"));
                            proxy.node.addChild(effect);
                            effect.x = proxy.cutPoses[list[i].index].x;
                            effect.y = proxy.cutPoses[list[i].index].y;
                        }
                        //修改医生手的位置
                        if (proxy.doctorHand) {
                            //达到某个节拍
                            if (list[i].time >= proxy.lastTime && list[i].time < proxy.time) {
                                proxy.doctorHand.x = proxy.lastHandX = proxy.cutPoses[list[i].index].x;
                                proxy.doctorHand.y = proxy.lastHandY = proxy.cutPoses[list[i].index].y;
                                proxy.lastHandTime = list[i].time;
                                proxy.handX = proxy.doctorHand.x;
                                proxy.handY = proxy.doctorHand.y;
                                if (list[i + 1].operate != 6) {
                                    proxy.tweenList.push(lib.Tween.to(proxy.doctorHand, 0.4, { y: -480 }, lib.Ease.CUBIC_EASE_OUT).update(function () {
                                        proxy.handX = proxy.doctorHand.x;
                                        proxy.handY = proxy.doctorHand.y;
                                    }));
                                }
                            }
                            //距离下一节拍位置
                            if (!findNext && list[i].time > proxy.time) {
                                findNext = true;
                                proxy.doctorHand.x = proxy.lastHandX + (proxy.cutPoses[list[i].index].x - proxy.lastHandX) * (proxy.time - proxy.lastHandTime) / (list[i].time - proxy.lastHandTime);
                                proxy.doctorHand.y = proxy.lastHandY + (proxy.cutPoses[list[i].index].y - proxy.lastHandY) * (proxy.time - proxy.lastHandTime) / (list[i].time - proxy.lastHandTime);
                                proxy.handX = proxy.doctorHand.x;
                                proxy.handY = proxy.doctorHand.y;
                            }
                        }
                    }
                    else if (list[i].operate != 6 && list[i].time > proxy.time) {
                        break;
                    }
                }
            };
            return OperateRhythmEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.OperateRhythmEvent = OperateRhythmEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateRoundFinishEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var OperateRoundFinishEvent = /** @class */ (function (_super) {
            __extends(OperateRoundFinishEvent, _super);
            function OperateRoundFinishEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateRoundFinishEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 7) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            proxy.gameMonment = bamaoGame.GameMoment.NONE;
                            //怪物手退场
                            if (proxy.doctorHand) {
                                proxy.tweenList.push(lib.Tween.to(proxy.doctorHand, 0.2, { y: -600 }).call(function () {
                                    this.proxy.doctorHand.destroy();
                                    this.proxy.doctorHand = null;
                                }.bind({
                                    proxy: proxy
                                })));
                                if (proxy.operateNode) {
                                    proxy.operateNode = null;
                                }
                                if (proxy.comboNode) {
                                    proxy.comboNode.destroy();
                                    proxy.comboNode = null;
                                }
                            }
                        }
                    }
                }
            };
            return OperateRoundFinishEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.OperateRoundFinishEvent = OperateRoundFinishEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateRoundStartEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        /**
         * 一轮游戏
         */
        var OperateRoundStartEvent = /** @class */ (function (_super) {
            __extends(OperateRoundStartEvent, _super);
            function OperateRoundStartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateRoundStartEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 5) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            proxy.gameMonment = bamaoGame.GameMoment.OPERATE;
                            //医生手进场
                            var doctorHand = new cc.Node();
                            doctorHand.addComponent(cc.Sprite);
                            var sprite = doctorHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("doctorHand"));
                            proxy.node.addChild(doctorHand);
                            doctorHand.y = -600;
                            proxy.lastHandTime = proxy.time;
                            proxy.lastHandX = doctorHand.x;
                            proxy.lastHandY = doctorHand.y;
                            //添加绷带
                            var band = new cc.Node();
                            band.addComponent(cc.Sprite);
                            var bandSprite = band.getComponent(cc.Sprite);
                            bandSprite.spriteFrame = new cc.SpriteFrame();
                            bandSprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("band"));
                            doctorHand.addChild(band);
                            // band.y = 50;
                            proxy.doctorHand = doctorHand;
                            proxy.tweenList.push(lib.Tween.to(proxy.doctorHand, 0.2, { y: -480 }));
                            //添加操作层
                            if (!proxy.operateNode) {
                                var operateNode = new cc.Node();
                                proxy.operateNode = operateNode;
                                proxy.monster.addChild(operateNode);
                            }
                            //添加combo文字
                            if (!proxy.comboNode) {
                                var comboNode = new cc.Node();
                                comboNode.y = 400;
                                comboNode.color = new cc.Color(0, 0, 0);
                                comboNode.addComponent(cc.Label);
                                comboNode.getComponent(cc.Label).string = proxy.combo ? "combo" + proxy.combo : "";
                                proxy.node.addChild(comboNode);
                                proxy.comboNode = comboNode;
                            }
                        }
                    }
                }
            };
            return OperateRoundStartEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.OperateRoundStartEvent = OperateRoundStartEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/TipRhythmEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var TipRhythmEvent = /** @class */ (function (_super) {
            __extends(TipRhythmEvent, _super);
            function TipRhythmEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TipRhythmEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 3) {
                        if (proxy.lastTime <= list[i].time - proxy.tipTime && list[i].time - proxy.tipTime < proxy.time) {
                            //手移动
                            proxy.tweenList.push(lib.Tween.to(proxy.monsterHand, proxy.tipTime / 1000, {
                                x: proxy.cutPoses[list[i].index].x - 248 / 2 + 270 / 4,
                                y: proxy.cutPoses[list[i].index].y - 160 / 2 + 300 / 4
                            }).call(function () {
                                //播放提示音效
                                cc.audioEngine.play(bamaoGame.Resource.getResource("rhythmTip"), false, 1);
                            }));
                        }
                    }
                }
            };
            return TipRhythmEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.TipRhythmEvent = TipRhythmEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/TipRoundFinishEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var TipRoundFinishEvent = /** @class */ (function (_super) {
            __extends(TipRoundFinishEvent, _super);
            function TipRoundFinishEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TipRoundFinishEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 4) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手退场
                            if (proxy.monsterHand) {
                                proxy.tweenList.push(lib.Tween.to(proxy.monsterHand, 0.2, { x: -300 }).call(function () {
                                    this.proxy.monsterHand.destroy();
                                    this.proxy.monsterHand = null;
                                }.bind({
                                    proxy: proxy
                                })));
                            }
                            proxy.gameMonment = bamaoGame.GameMoment.NONE;
                        }
                    }
                }
            };
            return TipRoundFinishEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.TipRoundFinishEvent = TipRoundFinishEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/TipRoundStartEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        /**
         * 一轮操作开始
         */
        var TipRoundStartEvent = /** @class */ (function (_super) {
            __extends(TipRoundStartEvent, _super);
            function TipRoundStartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TipRoundStartEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 2) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手进场
                            var monsterHand = new cc.Node();
                            monsterHand.addComponent(cc.Sprite);
                            var sprite = monsterHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("monsterHand"));
                            proxy.node.addChild(monsterHand);
                            monsterHand.x = -320;
                            proxy.monsterHand = monsterHand;
                            proxy.gameMonment = bamaoGame.GameMoment.TIP;
                        }
                    }
                }
            };
            return TipRoundStartEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.TipRoundStartEvent = TipRoundStartEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/MonsterEnterEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var MonsterEnterEvent = /** @class */ (function (_super) {
            __extends(MonsterEnterEvent, _super);
            function MonsterEnterEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MonsterEnterEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 1) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //背景
                            if (!proxy.background) {
                                var background = new cc.Node();
                                background.addComponent(cc.Sprite);
                                var bksprite = background.getComponent(cc.Sprite);
                                bksprite.spriteFrame = new cc.SpriteFrame();
                                bksprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                                proxy.node.addChild(background);
                                proxy.background = background;
                            }
                            else {
                                var bksprite = proxy.background.getComponent(cc.Sprite);
                                bksprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                            }
                            //怪物进场
                            var monster = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            var sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("role" + (1 + ~~(3 * Math.random()))));
                            proxy.node.addChild(monster);
                            proxy.monster = monster;
                            monster.on(cc.Node.EventType.TOUCH_START, function () {
                                proxy.clickFlag = true;
                            }, this);
                            //添加表情
                            var face = new cc.Node();
                            face.addComponent(cc.Sprite);
                            face.y = 210;
                            face.x = -5;
                            var faceSprite = face.getComponent(cc.Sprite);
                            faceSprite.spriteFrame = new cc.SpriteFrame();
                            ;
                            faceSprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("faceNormal"));
                            proxy.monster.addChild(face);
                            proxy.face = face;
                            //生成伤口
                            var poses = [];
                            for (var px = 0; px < 4; px++) {
                                for (var py = 0; py < 4; py++) {
                                    poses.push({
                                        x: px * 75 + 3 - 6 * Math.random(),
                                        y: py * 75 + 3 - 6 * Math.random()
                                    });
                                }
                            }
                            var cuts = [];
                            for (var c = 0; c < list[i].cut; c++) {
                                var x = Math.random() * 300 - 150 - 200 + 127 + 100;
                                var y = Math.random() * 300 - 150 - 200 - 300 + 180 + 150;
                                //测试随机位置
                                var pos = poses.splice(~~(poses.length * Math.random()), 1)[0];
                                x = pos.x - 150 - 200 + 127 + 100;
                                y = pos.y - 150 - 200 - 300 + 180 + 150;
                                var cutImage = new cc.Node();
                                cutImage.addComponent(cc.Sprite);
                                cutImage.x = x;
                                cutImage.y = y;
                                cutImage.rotation = 360 * Math.random();
                                monster.addChild(cutImage);
                                var cutSprite = cutImage.getComponent(cc.Sprite);
                                cutSprite.spriteFrame = new cc.SpriteFrame();
                                cutSprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("cut"));
                                cuts.push({ x: x, y: y });
                            }
                            proxy.cutPoses = cuts;
                            //加上怪物进场动画
                            monster.x = 640;
                            proxy.tweenList.push(lib.Tween.to(monster, 0.3, { x: 0 }, lib.Ease.SINE_EASE_IN_OUT));
                        }
                    }
                }
            };
            return MonsterEnterEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.MonsterEnterEvent = MonsterEnterEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/MonsterExitEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var MonsterExitEvent = /** @class */ (function (_super) {
            __extends(MonsterExitEvent, _super);
            function MonsterExitEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MonsterExitEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 8) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物退场动画
                            if (proxy.monster) {
                                proxy.tweenList.push(lib.Tween.to(proxy.monster, 0.2, { x: -640 }, lib.Ease.SINE_EASE_IN_OUT).call(function () {
                                    proxy.monster.destroy();
                                    proxy.monster = null;
                                }));
                            }
                        }
                    }
                }
            };
            return MonsterExitEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.MonsterExitEvent = MonsterExitEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateEvent.ts//////////
(function (game) {
    var bamaoGame;
    (function (bamaoGame) {
        var OperateEvent = /** @class */ (function (_super) {
            __extends(OperateEvent, _super);
            function OperateEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                var find = false;
                if (proxy.clickFlag) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[i] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) {
                                    this.showOperate(proxy, "Perfect", proxy.cutPoses[list[i].index]);
                                }
                                else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) {
                                    this.showOperate(proxy, "Good", proxy.cutPoses[list[i].index]);
                                }
                                else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                    this.showOperate(proxy, "Miss", proxy.cutPoses[list[i].index]);
                                }
                                find = true;
                                proxy.operate[i] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find && proxy.gameMonment == bamaoGame.GameMoment.OPERATE) {
                        this.showOperate(proxy, "OutMiss", { x: proxy.handX, y: proxy.handY });
                    }
                    proxy.clickFlag = false;
                }
                //检测漏过的点
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[i] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss", proxy.cutPoses[list[i].index]);
                            proxy.operate[i] = true;
                        }
                    }
                }
            };
            OperateEvent.prototype.showOperate = function (proxy, type, pos) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                cc.audioEngine.play(bamaoGame.Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                }
                else {
                    var node = new cc.Node();
                    node.addComponent(cc.Sprite);
                    node.rotation = 360 * Math.random();
                    var sprite = node.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame();
                    sprite.spriteFrame.setTexture(bamaoGame.Resource.getResource("band"));
                    if (type == "Perfect") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.score += 100;
                        proxy.perfect++;
                    }
                    else if (type == "Good") {
                        node.x = pos.x + 20 - 40 * Math.random();
                        node.y = pos.y + 20 - 40 * Math.random();
                        proxy.score += 80;
                        proxy.good++;
                    }
                    else if (type == "Miss") {
                        var x = pos.x + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        var y = pos.y + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        if (Math.abs(x - proxy.handX) > 30 || Math.abs(y - proxy.handY) > 30) {
                            x = proxy.handX;
                            y = proxy.handY;
                        }
                        node.x = x;
                        node.y = y;
                        proxy.score += 0;
                        proxy.miss++;
                    }
                    else if (type == "OutMiss") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.miss++;
                    }
                    proxy.operateNode.addChild(node);
                    proxy.tweenList.push(lib.Tween.to(node, 0.15, { scaleX: 1, scaleY: 1, opacity: 255 }, null, {
                        scaleX: 1.5,
                        scaleY: 1.5,
                        opacity: 150
                    }));
                }
                //添加文字
                var node2 = new cc.Node();
                node2.addComponent(cc.Label);
                node2.color = new cc.Color(0, 0, 0);
                node2.y = 200;
                var label = node2.getComponent(cc.Label);
                label.string = type == "AutoMiss" || type == "OutMiss" ? "Miss" : type;
                proxy.operateNode.addChild(node2);
                proxy.tweenList.push(lib.Tween.to(node2, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 50
                }, null, { opacity: 255 }).call(function () {
                    node2.destroy();
                }));
                //表情
                if (type == "Perfect") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(bamaoGame.Resource.getResource("facePerfect"));
                }
                else if (type == "Good") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(bamaoGame.Resource.getResource("faceGood"));
                }
                else if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(bamaoGame.Resource.getResource("faceMiss"));
                }
                //一定时间后切换回正常表情
                setTimeout(function () {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(bamaoGame.Resource.getResource("faceNormal"));
                }, proxy.faceChangeTime);
                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                    proxy.comboNode.getComponent(cc.Label).string = "";
                }
                else {
                    proxy.combo++;
                    proxy.comboNode.getComponent(cc.Label).string = "combo" + proxy.combo;
                    proxy.tweenList.push(lib.Tween.to(proxy.comboNode, 0.2, {
                        opacity: 255,
                    }, null, {
                        opacity: 150
                    }));
                }
            };
            return OperateEvent;
        }(bamaoGame.GameEvent));
        bamaoGame.OperateEvent = OperateEvent;
    })(bamaoGame = game.bamaoGame || (game.bamaoGame = {}));
})(game || (game = {}));
//////////Module bamaoResult//////////
//////////proxy/Resource.ts//////////
(function (game) {
    var bamaoResult;
    (function (bamaoResult) {
        var Resource = /** @class */ (function () {
            function Resource() {
            }
            Resource.loadResources = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list;
                    return __generator(this, function (_a) {
                        list = Resource.loadList;
                        return [2 /*return*/, new Promise(function (resolve) {
                                var index = 0;
                                function load() {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var res, loader, result;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (index >= list.length) {
                                                        resolve();
                                                        return [2 /*return*/];
                                                    }
                                                    res = list[index];
                                                    if (!(res.type == "URLLoader")) return [3 /*break*/, 2];
                                                    loader = new lib.URLLoader(res.url);
                                                    return [4 /*yield*/, loader.load()];
                                                case 1:
                                                    result = _a.sent();
                                                    res.data = result.data;
                                                    index++;
                                                    load();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    cc.loader.load(cc.url.raw(res.url), function (e, data) {
                                                        res.data = data;
                                                        index++;
                                                        load();
                                                    });
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                                load();
                            }.bind(this))];
                    });
                });
            };
            Resource.getResource = function (name) {
                for (var i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            };
            Resource.loadList = [
                { name: "ui", url: "baMaoResult/res/ui", type: "URLLoader" },
            ];
            return Resource;
        }());
        bamaoResult.Resource = Resource;
    })(bamaoResult = game.bamaoResult || (game.bamaoResult = {}));
})(game || (game = {}));
//////////view/BaMaoResultModule.ts//////////
(function (game) {
    var bamaoResult;
    (function (bamaoResult) {
        var BaMaoResultModule = /** @class */ (function (_super) {
            __extends(BaMaoResultModule, _super);
            function BaMaoResultModule() {
                return _super.call(this, BaMaoResultModule.NAME) || this;
            }
            BaMaoResultModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            BaMaoResultModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        //初始化 view
                        this.facade.registerMediator(new bamaoResult.MainMediator());
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == BaMaoResultModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(bamaoResult.MainMediator.NAME, note.body.data));
                        }
                        break;
                    case game.common.Command.REGISTER_NET://注册网络模块
                        break;
                }
            };
            BaMaoResultModule.NAME = "bamaoResult";
            return BaMaoResultModule;
        }(mvc.Module));
        bamaoResult.BaMaoResultModule = BaMaoResultModule;
    })(bamaoResult = game.bamaoResult || (game.bamaoResult = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var bamaoResult;
    (function (bamaoResult) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                return _super.call(this, MainMediator.NAME, null) || this;
            }
            MainMediator.prototype.initUI = function () {
                this.viewComponent = new cc.Node();
                this.viewComponent = cc.instantiate(bamaoResult.Resource.getResource("ui"));
                // //获取分数
                // let scoreTxt = this.viewComponent.getChildByName("scoreTxt");
                // scoreTxt.getComponent(cc.Label).string = this.data.score + "";
                // //获取perfect
                // let perfectTxt = this.viewComponent.getChildByName("perfectTxt");
                // perfectTxt.getComponent(cc.Label).string = this.data.perfect + "";
                // //获取good
                // let goodTxt = this.viewComponent.getChildByName("goodTxt");
                // goodTxt.getComponent(cc.Label).string = this.data.good + "";
                // //获取miss
                // let missTxt = this.viewComponent.getChildByName("missTxt");
                // missTxt.getComponent(cc.Label).string = this.data.miss + "";
                //获取progress
                var progressTxt = this.viewComponent.getChildByName("progress");
                progressTxt.getComponent(cc.Label).string = "完成进度：" + this.data.progress;
                //获取返回主界面按钮
                var mainBtn = this.viewComponent.getChildByName("mainBtn");
                mainBtn.on(cc.Node.EventType.TOUCH_END, this.onClickReturnMainMeu, this);
                // //获取开始游戏按钮
                // let gameBtn = this.viewComponent.getChildByName("gameBtn");
                // gameBtn.on(cc.Node.EventType.TOUCH_END, this.onClickStartGame, this);
            };
            MainMediator.prototype.onClickReturnMainMeu = function () {
                this.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("bamaoStart"));
            };
            MainMediator.prototype.onClickStartGame = function () {
                this.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("bamaoGame"));
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.asyncLoad.call(this, resolve);
                                return [4 /*yield*/, bamaoResult.Resource.loadResources()];
                            case 1:
                                _a.sent();
                                this.initUI();
                                this.loadComplete();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, node_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                this.data = note.body.data;
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                game.layer.MainUILayer.show(this.viewComponent);
                                lib.Tween.to(this.viewComponent, 0.8, { y: 0 }, lib.Ease.CUBIC_EASE_OUT, { y: lib.data.system.screen.height });
                                this.sendNotification(game.common.Command.CLOSE_SCENE, new game.common.CloseSceneNB("crg"));
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent) {
                                    node_1 = this.viewComponent;
                                    lib.Tween.to(this.viewComponent, 0.5, { opacity: 0 }).call(function () {
                                        node_1.destroy();
                                    }.bind(this));
                                    this.viewComponent = null;
                                }
                                cc.audioEngine.stop(this.bgm);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "bamaoResult.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        bamaoResult.MainMediator = MainMediator;
    })(bamaoResult = game.bamaoResult || (game.bamaoResult = {}));
})(game || (game = {}));
//////////Module musicTest//////////
//////////view/MusicTestModule.ts//////////
(function (game) {
    var musicTest;
    (function (musicTest) {
        var MusicTestModule = /** @class */ (function (_super) {
            __extends(MusicTestModule, _super);
            function MusicTestModule() {
                return _super.call(this, MusicTestModule.NAME) || this;
            }
            MusicTestModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            MusicTestModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new musicTest.MainMediator());
                        //
                        // //初始化 model
                        // //1. 加载网络监听对象
                        // this.receiveNetProxies.push(new NoticeCProxy());
                        // this.receiveNetProxies.push(new TestRecvCProxy());
                        // //2. 初始化 proxy
                        //
                        // //初始化 controller
                        // this.facade.registerCommand(Command.IN.AUTO_LOGIN, AutoLoginCommand);
                        // this.facade.registerCommand(Command.IN.LOGIN_GAME_SERVER, LoginCompleteCommand);
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == MusicTestModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(musicTest.MainMediator.NAME));
                        }
                        break;
                }
            };
            MusicTestModule.NAME = "musicTest";
            return MusicTestModule;
        }(mvc.Module));
        musicTest.MusicTestModule = MusicTestModule;
    })(musicTest = game.musicTest || (game.musicTest = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var musicTest;
    (function (musicTest) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                var _this = _super.call(this, MainMediator.NAME, null) || this;
                musicTest.mainMediator = _this;
                return _this;
            }
            MainMediator.prototype.initUI = function () {
                this.viewComponent = new cc.Node();
                console.log("初始化音乐测试场景");
                this.viewComponent.addComponent(cc.Graphics);
                var gp = this.viewComponent.getComponent(cc.Graphics);
                var c = new cc.Color(255, 100, 100);
                gp.fillColor = c;
                // this.viewComponent.color = new cc.Color(255,0,0);
                // this.viewComponent.addComponent(cc.Label);
                // this.viewComponent.getComponent(cc.Label).string = "w~~";
                var url = cc.url.raw("resources/musicTest/res/startbgm.wav");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function (oEvent) {
                    var arrayBuffer = xhr.response;
                    if (arrayBuffer) {
                        audioContext.decodeAudioData(arrayBuffer, function (buffer) {
                            visualize(audioContext, buffer); //调用_visualize进行下一步处理，此方法在后面定义并实现
                            console.log("gogo");
                        }, function (e) {
                            console.log("!哎玛，文件解码失败:(");
                        });
                    }
                    else {
                    }
                };
                xhr.send(null);
                function visualize(audioContext, buffer) {
                    var audioBufferSouceNode = audioContext.createBufferSource(), analyser = audioContext.createAnalyser();
                    //将source与分析器连接
                    audioBufferSouceNode.connect(analyser);
                    //将分析器与destination连接，这样才能形成到达扬声器的通路
                    analyser.connect(audioContext.destination);
                    //将上一步解码得到的buffer数据赋值给source
                    audioBufferSouceNode.buffer = buffer;
                    //播放
                    audioBufferSouceNode.start(0);
                    //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
                    var last = 0;
                    var lastMax = 0;
                    setInterval(function () {
                        var array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);
                        var meterWidth = 10, //频谱条宽度
                        gap = 2, //频谱条间距
                        capHeight = 2, capStyle = '#fff', meterNum = 800 / (10 + 2), //频谱条数量
                        capYPositionArray = []; //将上一画面各帽头的位置保存到这个数组
                        var max = 0;
                        var sum = 0;
                        var count = 0;
                        for (var i = 0; i < array.length; i++) {
                            if (array[i]) {
                                sum += array[i];
                                count++;
                            }
                            if (array[i] > max) {
                                max = array[i];
                            }
                        }
                        gp.clear();
                        gp.fillRect(0, 0, 20, ~~(sum / count));
                        // console.log(~~(sum/count));
                        var now = ~~(sum / count);
                        if (last && (now - last > 10 || last - now > 10)) {
                            // console.log(now - last > 0? "hi" : "low", last, now);
                        }
                        last = now;
                        if (lastMax && (max - lastMax > 10 || lastMax - max > 10)) {
                            console.log(max - lastMax > 0 ? "max hi" : "max low", max, lastMax);
                        }
                        lastMax = max;
                        // var step = Math.round(array.length / meterNum); //计算采样步长
                        // // ctx.clearRect(0, 0, cwidth, cheight);
                        // for (var i = 0; i < meterNum; i++) {
                        //     var value = array[i * step]; //获取当前能量值
                        //     if (capYPositionArray.length < Math.round(meterNum)) {
                        //         capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
                        //     };
                        //     console.log(value);
                        //     // ctx.fillStyle = capStyle;
                        //     //开始绘制帽头
                        //     // if (value < capYPositionArray[i]) { //如果当前值小于之前值
                        //     //     ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight); //则使用前一次保存的值来绘制帽头
                        //     // } else {
                        //     //     ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight); //否则使用当前值直接绘制
                        //     //     capYPositionArray[i] = value;
                        //     // };
                        //     //开始绘制频谱条
                        //     // ctx.fillStyle = gradient;
                        //     // ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
                        // }
                    }, 0.016);
                }
                var audioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.asyncLoad.call(this, resolve);
                        this.initUI();
                        this.loadComplete();
                        return [2 /*return*/];
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.MainUILayer.show(this.viewComponent);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    this.viewComponent.parent.removeChild(this.viewComponent);
                                    this.viewComponent.destroy();
                                    this.viewComponent = null;
                                }
                                if (this.change) {
                                    clearInterval(this.change);
                                    this.change = null;
                                }
                                cc.audioEngine.stop(this.bgm);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "musicTest.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        musicTest.MainMediator = MainMediator;
    })(musicTest = game.musicTest || (game.musicTest = {}));
})(game || (game = {}));
//////////Module runGame//////////
//////////esc/Component.ts//////////
var esc;
(function (esc) {
    var Component = /** @class */ (function () {
        function Component() {
        }
        return Component;
    }());
    esc.Component = Component;
})(esc || (esc = {}));
//////////esc/Entity.ts//////////
(function (esc) {
    var Entity = /** @class */ (function () {
        function Entity(id) {
            this.$components = [];
            this._id = id || lib.Help.getuuid();
        }
        Object.defineProperty(Entity.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Entity.prototype.addComponent = function (component) {
            this.$components.push(component);
        };
        Entity.prototype.removeComponent = function (component) {
        };
        Entity.prototype.$update = function () {
        };
        return Entity;
    }());
    esc.Entity = Entity;
})(esc || (esc = {}));
//////////esc/EntityManager.ts//////////
(function (esc) {
    var EntityManager = /** @class */ (function () {
        function EntityManager() {
        }
        EntityManager.addEntity = function (entity) {
            EntityManager.entities.push(entity);
        };
        EntityManager.removeEntity = function (entity) {
            var list = EntityManager.entities;
            for (var i = 0; i < list.length; i++) {
                if (list[i] == entity) {
                    list.splice(i, 1);
                    break;
                }
            }
        };
        EntityManager.entities = [];
        return EntityManager;
    }());
    esc.EntityManager = EntityManager;
})(esc || (esc = {}));
//////////esc/System.ts//////////
(function (esc) {
    var System = /** @class */ (function () {
        function System() {
            this.$entities = [];
        }
        System.prototype.update = function () {
        };
        System.prototype.$addEntity = function (entity) {
        };
        return System;
    }());
    esc.System = System;
})(esc || (esc = {}));
//////////proxy/RoundProxy.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var RoundProxy = /** @class */ (function () {
            function RoundProxy() {
                //combo数
                this.combo = 0;
                //分数
                this.score = 0;
                //perfect
                this.perfect = 0;
                //good
                this.good = 0;
                //miss
                this.miss = 0;
                //bgm
                this.bgm = null;
                //tweenList
                this.tweenList = [];
                /**
                 * perfect 判定时间
                 * @type {number}
                 */
                this.perfectTime = runGame.ConfigProxy.getConfig("perfectTime");
                /**
                 * good 判定时间
                 * @type {number}
                 */
                this.goodTime = runGame.ConfigProxy.getConfig("goodTime");
                /**
                 * miss 判定时间
                 * @type {number}
                 */
                this.missTime = runGame.ConfigProxy.getConfig("missTime");
                //生命值
                this.life = 100;
                //最大生命值
                this.maxLife = 100;
                this.lifeReduceSecond = 1;
                this.events = [];
                this.time = 0;
                this.lastTime = 0;
                this.clickFlag = false;
                this.backgroundX = 0;
                this.pos = 0;
                this.monsters = [];
                /**
                 * 记录某个拍子是否操作过了
                 * @type {any[]}
                 */
                this.operate = {};
                /**
                 * 每秒移动多少像素
                 * @type {number}
                 */
                this.timeSpeed = 300;
                this.config = [
                    {
                        operate: 0,
                        time: 0,
                    },
                    {
                        operate: 6,
                        time: 3000,
                        index: 0
                    },
                    {
                        operate: 6,
                        time: 4000,
                        index: 1
                    },
                    {
                        operate: 6,
                        time: 5000,
                        index: 2
                    },
                    {
                        operate: 6,
                        time: 6000,
                        index: 3
                    },
                    //第二关
                    {
                        operate: 6,
                        time: 8000,
                        index: 0
                    },
                    {
                        operate: 6,
                        time: 9000,
                        index: 2
                    }
                ];
            }
            return RoundProxy;
        }());
        runGame.RoundProxy = RoundProxy;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////proxy/ConfigProxy.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var ConfigProxy = /** @class */ (function () {
            function ConfigProxy() {
            }
            ConfigProxy.init = function () {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;
                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(runGame.Resource.getResource("allConfig"));
                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(runGame.Resource.getResource("levelConfig"));
                    //分析 MusicConfig
                    ConfigProxy.musicConfig = ConfigProxy.decodeConfig(runGame.Resource.getResource("musicConfig"));
                }
            };
            ConfigProxy.getConfig = function (name) {
                var item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            };
            ConfigProxy.decodeConfig = function (content) {
                var res = new lib.ArrayValue();
                var list = content.split("\n");
                var keys = [];
                for (var i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    var itemList = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    }
                    else {
                        var item = {};
                        for (var j = 0; j < itemList.length; j++) {
                            if (j == 0 && !itemList[j]) {
                                item = null;
                                break;
                            }
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        if (item) {
                            res.push(item);
                        }
                    }
                }
                return res;
            };
            ConfigProxy.getGameConfig = function () {
                var cfg = [];
                var time = 0;
                var len = 3;
                for (var i = 0; i < len; i++) {
                    var levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                //临时加入游戏结束
                cfg.push({
                    operate: 9,
                    time: time
                });
                return cfg;
            };
            ConfigProxy.addGameConfig = function (oldCfg) {
                var time = ConfigProxy.getLevelConfigTime(oldCfg);
                for (var i = 0; i < oldCfg.length; i++) {
                    if (oldCfg[i].time < time - 30000) {
                        oldCfg.splice(i, 1);
                    }
                }
                var cfg = [];
                var len = 3;
                for (var i = 0; i < len; i++) {
                    var levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                oldCfg = oldCfg.concat(cfg);
                return oldCfg;
            };
            ConfigProxy.getRandomLevel = function (startTime) {
                var levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                var list = [];
                var time = startTime;
                //计算提示拍子
                time += ConfigProxy.getConfig("levelTimeGap");
                var count = 0;
                var start = list.length;
                for (var i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i] && levelConfig["beat" + i] != "") {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start,
                            music: levelConfig["beat" + i]
                        });
                        list[0].cut++;
                    }
                    else {
                        count++;
                    }
                }
                return list;
            };
            ConfigProxy.getLevelConfigTime = function (cfg) {
                var time = 0;
                for (var i = 0; i < cfg.length; i++) {
                    if (cfg[i].time > time) {
                        time = cfg[i].time;
                    }
                }
                return time;
            };
            ConfigProxy.flag = false;
            ConfigProxy.levelConfig = new lib.ArrayValue();
            return ConfigProxy;
        }());
        runGame.ConfigProxy = ConfigProxy;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////proxy/GameMoment.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var GameMoment = /** @class */ (function () {
            function GameMoment() {
            }
            GameMoment.NONE = "";
            /**
             * 提示阶段
             * @type {string}
             */
            GameMoment.TIP = "tip";
            /**
             * 操作阶段
             * @type {string}
             */
            GameMoment.OPERATE = "operate";
            return GameMoment;
        }());
        runGame.GameMoment = GameMoment;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////proxy/Resource.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var Resource = /** @class */ (function () {
            function Resource() {
            }
            Resource.configLoadComplete = function () {
                runGame.ConfigProxy.init();
                var list = runGame.ConfigProxy.musicConfig;
                for (var i = 0; i < list.length; i++) {
                    var item = { name: "rhythm" + list[i].name, url: "resources/runGame/res/rhythm/" + list[i].url };
                    Resource.loadList.push(item);
                }
            };
            Resource.getResource = function (name) {
                for (var i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            };
            Resource.loadResources = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list;
                    return __generator(this, function (_a) {
                        if (!Resource.loadList) {
                            Resource.loadList = Resource.initList.concat();
                        }
                        list = Resource.loadList;
                        return [2 /*return*/, new Promise(function (resolve) {
                                var index = 0;
                                var load = function () {
                                    if (index >= list.length) {
                                        runGame.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB("loading.MainMediator"));
                                        resolve();
                                        return;
                                    }
                                    var res = list[index];
                                    runGame.mainMediator.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB("loading.MainMediator", { text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name }));
                                    if (res.resourceType == "effect") {
                                        if (!res.loadIndex) {
                                            res.pictures = [];
                                            res.loadIndex = 0;
                                            res.loadLength = res.nameEnd - res.nameBegin + 1;
                                            res.data = {
                                                pictures: [],
                                                frameTime: res.frameTime
                                            };
                                        }
                                        else {
                                            if (res.loadIndex == res.loadLength) {
                                                index++;
                                                load();
                                                return;
                                            }
                                        }
                                        var count = res.loadIndex + res.nameBegin;
                                        var name = "" + count;
                                        while (name.length < res.nameCount) {
                                            name = "0" + name;
                                        }
                                        cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e, data) {
                                            res.data.pictures.push(data);
                                            res.loadIndex++;
                                            if (res.loadIndex == res.loadLength) {
                                                index++;
                                            }
                                            load();
                                        });
                                    }
                                    else {
                                        cc.loader.load(cc.url.raw(res.url), function (e, data) {
                                            res.data = data;
                                            if (res.execute) {
                                                res.execute();
                                            }
                                            index++;
                                            load();
                                        });
                                    }
                                };
                                load();
                            }.bind(this))];
                    });
                });
            };
            Resource.initList = [
                { name: "allConfig", url: "resources/runGame/res/config/All.csv" },
                { name: "levelConfig", url: "resources/runGame/res/config/Level.csv" },
                {
                    name: "musicConfig",
                    url: "resources/runGame/res/config/Music.csv",
                    execute: Resource.configLoadComplete
                },
                { name: "bgm", url: "resources/runGame/res/bgm/game1.wav" },
                // {name: "readygo", url: "resources/runGame/res/music/readygo.mp3"},
                { name: "rhythmTip", url: "resources/runGame/res/music/tip.wav" },
                { name: "rhythmMiss", url: "resources/runGame/res/music/miss.wav" },
                { name: "rhythmGood", url: "resources/runGame/res/music/good.wav" },
                { name: "rhythmPerfect", url: "resources/runGame/res/music/perfect.wav" },
                { name: "monster", url: "resources/runGame/res/texture/monster.png" },
                { name: "monsterHand", url: "resources/runGame/res/texture/monsterHand.png" },
                { name: "doctorHand", url: "resources/runGame/res/texture/doctorHand.png" },
                { name: "cut", url: "resources/runGame/res/texture/cut.png" },
                { name: "band", url: "resources/runGame/res/texture/band.png" },
                { name: "back1", url: "resources/runGame/res/texture/background/back1.png" },
                { name: "back2", url: "resources/runGame/res/texture/background/back2.png" },
                { name: "back3", url: "resources/runGame/res/texture/background/back3.png" },
                { name: "role1", url: "resources/runGame/res/texture/role/role1.png" },
                { name: "role2", url: "resources/runGame/res/texture/role/role2.png" },
                { name: "role3", url: "resources/runGame/res/texture/role/role3.png" },
                { name: "facePerfect", url: "resources/runGame/res/texture/face/perfect.png" },
                { name: "faceGood", url: "resources/runGame/res/texture/face/good.png" },
                { name: "faceMiss", url: "resources/runGame/res/texture/face/miss.png" },
                { name: "faceNormal", url: "resources/runGame/res/texture/face/normal.png" },
                { name: "faceResult1", url: "resources/runGame/res/texture/face/result1.png" },
                { name: "faceResult2", url: "resources/runGame/res/texture/face/result2.png" },
                { name: "faceResult3", url: "resources/runGame/res/texture/face/result3.png" },
                {
                    name: "tip",
                    url: "resources/runGame/res/texture/effect/",
                    resourceType: "effect",
                    namePre: "jl",
                    nameCount: 4,
                    nameBegin: 1,
                    nameEnd: 16,
                    nameFileEnd: "png",
                    frameTime: 33
                },
                { name: "bg1", url: "resources/runGame/res/textures/bg/bg1.png" },
                { name: "bg2", url: "resources/runGame/res/textures/bg/bg2.png" },
                { name: "bg3", url: "resources/runGame/res/textures/bg/bg3.png" },
                { name: "bg4", url: "resources/runGame/res/textures/bg/bg4.png" },
                {
                    name: "playerRun",
                    url: "resources/runGame/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "player",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    frameTime: 66
                },
                {
                    name: "monster1",
                    url: "resources/runGame/res/textures/enemy/mushroom1/",
                    resourceType: "effect",
                    namePre: "mushroom1_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 6,
                    nameFileEnd: "png",
                    frameTime: 66
                },
                {
                    name: "monster2",
                    url: "resources/runGame/res/textures/enemy/mushroom2/",
                    resourceType: "effect",
                    namePre: "mushroom2_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 3,
                    nameFileEnd: "png",
                    frameTime: 132
                },
                {
                    name: "monster3",
                    url: "resources/runGame/res/textures/enemy/mushroom3/",
                    resourceType: "effect",
                    namePre: "mushroom3_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 3,
                    nameFileEnd: "png",
                    frameTime: 132
                },
            ];
            return Resource;
        }());
        runGame.Resource = Resource;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////controller/Command.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var Command = /** @class */ (function () {
            function Command() {
            }
            Command.IN = {
                LIFE_CHANGE: "runGame.life_change",
            };
            return Command;
        }());
        runGame.Command = Command;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////controller/LifeChangeCommand.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var LifeChangeCommand = /** @class */ (function (_super) {
            __extends(LifeChangeCommand, _super);
            function LifeChangeCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LifeChangeCommand.prototype.execute = function (notification) {
            };
            return LifeChangeCommand;
        }(mvc.SimpleCommand));
        runGame.LifeChangeCommand = LifeChangeCommand;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/utils/Effect.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        /**
         * 序列帧特效
         */
        var Effect = /** @class */ (function (_super) {
            __extends(Effect, _super);
            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            function Effect(config, loop) {
                if (loop === void 0) { loop = null; }
                var _this = _super.call(this) || this;
                _this.frameTime = config.frameTime;
                _this.pictures = config.pictures;
                _this.length = _this.pictures.length;
                _this.loop = loop != null ? loop : !!config.loop;
                _this.frame = 0;
                _this.update = _this.update.bind(_this);
                _this.addComponent(cc.Sprite);
                var sprite = _this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(_this.update, _this.frameTime / 1000, 10000000000);
                _this.update();
                return _this;
            }
            Effect.prototype.update = function () {
                var sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            };
            Effect.prototype.destroy = function () {
                this.getComponent(cc.Sprite).unschedule(this.update);
                _super.prototype.destroy.call(this);
                return true;
            };
            return Effect;
        }(cc.Node));
        runGame.Effect = Effect;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/utils/DisplayFactory.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var DisplayFactory = /** @class */ (function () {
            function DisplayFactory() {
            }
            DisplayFactory.createImage = function (texture2d) {
                var node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                node.anchorY = 0;
                var sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(texture2d);
                return node;
            };
            return DisplayFactory;
        }());
        runGame.DisplayFactory = DisplayFactory;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/RunGameModule.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var RunGameModule = /** @class */ (function (_super) {
            __extends(RunGameModule, _super);
            function RunGameModule() {
                return _super.call(this, RunGameModule.NAME) || this;
            }
            RunGameModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            RunGameModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new runGame.MainMediator());
                        //
                        // //初始化 model
                        // //1. 加载网络监听对象
                        // this.receiveNetProxies.push(new NoticeCProxy());
                        // this.receiveNetProxies.push(new TestRecvCProxy());
                        // //2. 初始化 proxy
                        //
                        //初始化 controller
                        this.facade.registerCommand(runGame.Command.IN.LIFE_CHANGE, runGame.LifeChangeCommand);
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == RunGameModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(runGame.MainMediator.NAME));
                        }
                        break;
                }
            };
            RunGameModule.NAME = "runGame";
            return RunGameModule;
        }(mvc.Module));
        runGame.RunGameModule = RunGameModule;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                var _this = _super.call(this, MainMediator.NAME, null) || this;
                runGame.mainMediator = _this;
                return _this;
            }
            MainMediator.prototype.initUI = function () {
                this.viewComponent = new cc.Node();
                var node = new cc.Node();
                node.addComponent(runGame.MainComponent);
                this.viewComponent.addChild(node);
                this.viewComponent.addChild(this.ui = new runGame.GameUI());
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.asyncLoad.call(this, resolve);
                                return [4 /*yield*/, runGame.Resource.loadResources()];
                            case 1:
                                _a.sent();
                                this.initUI();
                                this.loadComplete();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.GameLayer.show(this.viewComponent);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    this.viewComponent.parent.removeChild(this.viewComponent);
                                    this.viewComponent.destroy();
                                    this.viewComponent = null;
                                }
                                if (this.change) {
                                    clearInterval(this.change);
                                    this.change = null;
                                }
                                cc.audioEngine.stop(this.bgm);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "runGame.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        runGame.MainMediator = MainMediator;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/MainComponent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var MainComponent = /** @class */ (function (_super) {
            __extends(MainComponent, _super);
            function MainComponent() {
                var _this = _super.call(this) || this;
                _this.scaleMode = 0;
                _this.lastTime = 0;
                return _this;
            }
            MainComponent.prototype.start = function () {
                this.proxy = new runGame.RoundProxy();
                this.proxy.config = runGame.ConfigProxy.getGameConfig();
                this.proxy.configTime = runGame.ConfigProxy.getLevelConfigTime(this.proxy.config);
                this.proxy.node = this.node;
                this.proxy.events = [
                    new runGame.GameBackGroundEvent(),
                    new runGame.GameStartEvent(),
                    new runGame.OperateRhythmEvent(),
                    new runGame.OperateEvent(),
                ];
                this.schedule(this.update, 0.016, 10000000000);
            };
            MainComponent.prototype.update = function () {
                var time = (new Date()).getTime();
                var timeGap = time - this.lastTime;
                if (timeGap > 30) {
                    timeGap = 30;
                }
                this.proxy.time += timeGap;
                this.proxy.pos = this.proxy.time * this.proxy.timeSpeed / 1000;
                this.lastTime = time;
                if (this.proxy.configTime - 10000 >= this.proxy.lastTime && this.proxy.configTime - 10000 < this.proxy.time) {
                    this.proxy.config = runGame.ConfigProxy.addGameConfig(this.proxy.config);
                    this.proxy.configTime = runGame.ConfigProxy.getLevelConfigTime(this.proxy.config);
                    console.log(this.proxy.configTime, this.proxy.config.length);
                }
                var events = this.proxy.events;
                for (var i = 0; i < events.length; i++) {
                    events[i].execute(this.proxy);
                }
                this.proxy.lastTime = this.proxy.time;
            };
            MainComponent.prototype.onLoad = function () {
                this.node.width = 640;
                this.node.height = 960;
                this.scaleMode = 4;
                var size = lib.data.system.screen.value;
                var width = this.node.width;
                var height = this.node.height;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    }
                    else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    }
                    else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            };
            return MainComponent;
        }(cc.Graphics));
        runGame.MainComponent = MainComponent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/ui/GameUI.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                var _this = _super.call(this) || this;
                var node = new cc.Node();
                node.addComponent(cc.Graphics);
                _this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                var graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(100, 100, 100);
                graphics.fillRect(0, 0, 620, 20);
                node = new cc.Node();
                node.addComponent(cc.Graphics);
                _this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(225, 225, 225);
                _this.life = graphics;
                _this.percent = 0.5;
                return _this;
            }
            Object.defineProperty(GameUI.prototype, "percent", {
                set: function (val) {
                    if (val < 0)
                        val = 0;
                    if (val > 1)
                        val = 1;
                    this.life.clear();
                    this.life.fillRect(0, 0, 620 * val, 20);
                },
                enumerable: true,
                configurable: true
            });
            return GameUI;
        }(cc.Node));
        runGame.GameUI = GameUI;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/game/BackGround.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var BackGround = /** @class */ (function (_super) {
            __extends(BackGround, _super);
            function BackGround(proxy) {
                var _this = _super.call(this) || this;
                _this.bgWidth = 1027;
                _this.bgHeight = 412;
                _this.bgScale = 1;
                _this.shaderPrograms = {};
                _this.proxy = proxy;
                _this.bgs = [
                    _this.getBackgroundNode("bg1"),
                    _this.getBackgroundNode("bg2"),
                    _this.getBackgroundNode("bg3"),
                    _this.getBackgroundNode("bg4")
                ];
                _this.bgScale = (game.ui.SettingProxy.designHeight / 412);
                for (var i = 0; i < _this.bgs.length; i++) {
                    _this.addChild(_this.bgs[i]);
                    _this.bgs[i].scaleX = _this.bgs[i].scaleY = _this.bgScale;
                }
                return _this;
            }
            BackGround.prototype.update = function (pos) {
                for (var i = 0; i < this.bgs.length; i++) {
                    this.bgs[i].x = lib.data.system.screen.value.width;
                }
                var index = (~~(pos / (this.bgWidth * this.bgScale))) % this.bgs.length;
                pos = pos % (this.bgWidth * this.bgScale);
                this.bgs[index].x = -pos - game.ui.SettingProxy.designWidth / 2;
                while (pos + lib.data.system.screen.value.width > this.bgWidth * this.bgScale) {
                    index++;
                    index = index % this.bgs.length;
                    pos -= this.bgWidth * this.bgScale;
                    this.bgs[index].x = -pos - game.ui.SettingProxy.designWidth / 2;
                }
            };
            BackGround.prototype.getBackgroundNode = function (name) {
                var node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                var sprite = node.getComponent(cc.Sprite);
                console.log("设置滤镜?");
                this.setShader(sprite, "");
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(runGame.Resource.getResource(name));
                node.on(cc.Node.EventType.TOUCH_START, function () {
                    this.proxy.clickFlag = true;
                }, this);
                return node;
            };
            BackGround.prototype.setShader = function (sprite, shaderName) {
                var glProgram = this.shaderPrograms[shaderName];
                if (!glProgram) {
                    glProgram = new cc.GLProgram();
                    var vert = "\nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_fragmentColor; \nvarying vec2 v_texCoord; \nvoid main() \n{ \n    gl_Position = CC_PMatrix * a_position;\n    v_fragmentColor = a_color; \n    v_texCoord = a_texCoord; \n}\n";
                    var frag = "\n#ifdef GL_ES\nprecision lowp float;\n#endif\n\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main()\n{\n    vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n    gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n    gl_FragColor.w = c.w;\n}\n";
                    if (cc.sys.isNative) {
                        glProgram.initWithString(vert, frag);
                    }
                    else {
                        glProgram.initWithVertexShaderByteArray(vert, frag);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    this.shaderPrograms[shaderName] = glProgram;
                }
                sprite._sgNode.setShaderProgram(glProgram);
            };
            return BackGround;
        }(cc.Node));
        runGame.BackGround = BackGround;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/gameEvents/GameEvent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var GameEvent = /** @class */ (function () {
            function GameEvent() {
            }
            GameEvent.prototype.execute = function (proxy) {
            };
            return GameEvent;
        }());
        runGame.GameEvent = GameEvent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/gameEvents/GameStartEvent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        var GameStartEvent = /** @class */ (function (_super) {
            __extends(GameStartEvent, _super);
            function GameStartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameStartEvent.prototype.execute = function (proxy) {
                if (proxy.lastTime == 0) {
                    proxy.monsterNode = new cc.Node();
                    proxy.node.addChild(proxy.monsterNode);
                    proxy.player = new runGame.Effect(runGame.Resource.getResource("playerRun"), true);
                    proxy.player.y = -380;
                    proxy.player.x = -200;
                    proxy.node.addChild(proxy.player);
                    //添加操作层
                    if (!proxy.operateNode) {
                        var operateNode = new cc.Node();
                        proxy.operateNode = operateNode;
                        proxy.node.addChild(operateNode);
                    }
                    //添加combo文字
                    if (!proxy.comboNode) {
                        var comboNode = new cc.Node();
                        comboNode.y = 400;
                        comboNode.color = new cc.Color(0, 0, 0);
                        comboNode.addComponent(cc.Label);
                        comboNode.getComponent(cc.Label).string = proxy.combo ? "combo" + proxy.combo : "";
                        proxy.node.addChild(comboNode);
                        proxy.comboNode = comboNode;
                    }
                    proxy.bgm = cc.audioEngine.play(runGame.Resource.getResource("bgm"), true, 0.05);
                }
            };
            return GameStartEvent;
        }(runGame.GameEvent));
        runGame.GameStartEvent = GameStartEvent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateRhythmEvent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var OperateRhythmEvent = /** @class */ (function (_super) {
            __extends(OperateRhythmEvent, _super);
            function OperateRhythmEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateRhythmEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                var findNext = false;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if ((list[i].time - 2000) >= proxy.lastTime && (list[i].time - 2000) < proxy.time) {
                            // console.log("出现节奏!")
                            var monster = new runGame.Effect(runGame.Resource.getResource("monster" + ((~~(3 * Math.random())) + 1)), true);
                            proxy.monsterNode.addChild(monster);
                            monster.x = proxy.player.x + 2000 * proxy.timeSpeed / 1000;
                            monster.y = proxy.player.y;
                            monster.opacity = 0;
                            monster.scaleX = 0;
                            monster.scaleY = 0;
                            monster.data = list[i];
                            proxy.monsters.push(monster);
                        }
                    }
                }
                for (var i = 0; i < proxy.monsters.length; i++) {
                    var last = proxy.monsters[i].x;
                    proxy.monsters[i].x -= (proxy.time - proxy.lastTime) * proxy.timeSpeed / 1000;
                    if (last >= 600 - 320 && proxy.monsters[i].x < 600 - 320) {
                        lib.Tween.to(proxy.monsters[i], 0.3, { opacity: 255, scaleX: 1, scaleY: 1 });
                        cc.audioEngine.play(runGame.Resource.getResource("rhythm" + proxy.monsters[i].data.music), false, 1);
                    }
                }
            };
            return OperateRhythmEvent;
        }(runGame.GameEvent));
        runGame.OperateRhythmEvent = OperateRhythmEvent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/gameEvents/OperateEvent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var OperateEvent = /** @class */ (function (_super) {
            __extends(OperateEvent, _super);
            function OperateEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateEvent.prototype.execute = function (proxy) {
                var list = proxy.config;
                var find = false;
                if (proxy.clickFlag) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[list[i].time] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) {
                                    this.showOperate(proxy, "Perfect");
                                }
                                else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) {
                                    this.showOperate(proxy, "Good");
                                }
                                else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                    this.showOperate(proxy, "Miss");
                                }
                                find = true;
                                proxy.operate[list[i].time] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find) {
                        this.showOperate(proxy, "OutMiss");
                    }
                    proxy.clickFlag = false;
                }
                //检测漏过的点
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[list[i].time] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss");
                            proxy.operate[list[i].time] = true;
                        }
                    }
                }
            };
            OperateEvent.prototype.showOperate = function (proxy, type) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                if (!(type == "MISS" || type == "AutoMiss" || type == "OutMiss"))
                    cc.audioEngine.play(runGame.Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                }
                else {
                    if (type == "Perfect") {
                        proxy.score += 100;
                        proxy.perfect++;
                    }
                    else if (type == "Good") {
                        proxy.score += 80;
                        proxy.good++;
                    }
                    else if (type == "Miss") {
                        proxy.score += 0;
                        proxy.miss++;
                    }
                    else if (type == "OutMiss") {
                        proxy.miss++;
                    }
                }
                //添加文字
                var node2 = new cc.Node();
                node2.addComponent(cc.Label);
                node2.color = new cc.Color(0, 0, 0);
                node2.y = 200;
                var label = node2.getComponent(cc.Label);
                label.string = type == "AutoMiss" || type == "OutMiss" ? "Miss" : type;
                proxy.operateNode.addChild(node2);
                proxy.tweenList.push(lib.Tween.to(node2, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 50
                }, null, { opacity: 255 }).call(function () {
                    node2.destroy();
                }));
                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                    proxy.comboNode.getComponent(cc.Label).string = "";
                }
                else {
                    proxy.combo++;
                    proxy.comboNode.getComponent(cc.Label).string = "combo" + proxy.combo;
                    proxy.tweenList.push(lib.Tween.to(proxy.comboNode, 0.2, {
                        opacity: 255,
                    }, null, {
                        opacity: 150
                    }));
                }
            };
            return OperateEvent;
        }(runGame.GameEvent));
        runGame.OperateEvent = OperateEvent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////view/gameEVents/GameBackGroundEvent.ts//////////
(function (game) {
    var runGame;
    (function (runGame) {
        var GameBackGroundEvent = /** @class */ (function () {
            function GameBackGroundEvent() {
            }
            GameBackGroundEvent.prototype.execute = function (proxy) {
                if (proxy.lastTime == 0) {
                    proxy.background = new runGame.BackGround(proxy);
                    proxy.node.addChild(proxy.background);
                }
                if (proxy.background) {
                    proxy.background.update(proxy.pos);
                }
            };
            return GameBackGroundEvent;
        }());
        runGame.GameBackGroundEvent = GameBackGroundEvent;
    })(runGame = game.runGame || (game.runGame = {}));
})(game || (game = {}));
//////////Module motion//////////
//////////view/MotionModule.ts//////////
(function (game) {
    var motion;
    (function (motion) {
        var MotionModule = /** @class */ (function (_super) {
            __extends(MotionModule, _super);
            function MotionModule() {
                var _this = _super.call(this, MotionModule.NAME) || this;
                _this.receiveNetProxies = [];
                return _this;
            }
            MotionModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET];
            };
            MotionModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        var initData = note.body;
                        //初始化 view
                        this.facade.registerMediator(new motion.MainMediator());
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == MotionModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(motion.MainMediator.NAME));
                        }
                        break;
                    case game.common.Command.REGISTER_NET://注册网络模块
                        for (var i = 0; i < this.receiveNetProxies.length; i++) {
                            this.receiveNetProxies[i].registerNet(game.net);
                        }
                        break;
                }
            };
            MotionModule.NAME = "motion";
            return MotionModule;
        }(mvc.Module));
        motion.MotionModule = MotionModule;
    })(motion = game.motion || (game.motion = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var motion;
    (function (motion) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                return _super.call(this, MainMediator.NAME, null) || this;
            }
            MainMediator.prototype.initUI = function () {
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.asyncLoad.call(this, resolve);
                        this.viewComponent = new motion.MainView();
                        this.initUI();
                        this.loadComplete();
                        return [2 /*return*/];
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                game.layer.MainUILayer.show(this.viewComponent);
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    this.viewComponent.parent.removeChild(this.viewComponent);
                                }
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "motion.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        motion.MainMediator = MainMediator;
    })(motion = game.motion || (game.motion = {}));
})(game || (game = {}));
//////////view/MainView.ts//////////
(function (game) {
    var motion;
    (function (motion) {
        var MainView = /** @class */ (function (_super) {
            __extends(MainView, _super);
            function MainView() {
                var _this = _super.call(this) || this;
                //绘制背景
                _this.addComponent(cc.Graphics);
                var gp = _this.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0x31223b >> 16, 0x31223b >> 8 & 0xFF, 0x31223b & 0xFF);
                gp.fillRect(-320, -480, 640, 960);
                _this.bg1 = new cc.Node();
                _this.addChild(_this.bg1);
                _this.bg1.addComponent(cc.Graphics);
                gp = _this.bg1.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0xe53331 >> 16, 0xe53331 >> 8 & 0xFF, 0xe53331 & 0xFF);
                gp.moveTo(-320, -480);
                gp.lineTo(960 - 320, 480);
                gp.lineTo(960 - 320 + 640 + 320, 480);
                gp.lineTo(-320 + 640 + 320, -480);
                gp.lineTo(-320, -480);
                gp.fill();
                gp.moveTo(-320 - 1280 - 640, -480);
                gp.lineTo(960 - 320 - 1280 - 640, 480);
                gp.lineTo(960 - 320 + 640 + 320 - 1280 - 640, 480);
                gp.lineTo(-320 + 640 + 320 - 1280 - 640, -480);
                gp.lineTo(-320 - 1280 - 640, -480);
                gp.fill();
                _this.bg2 = new cc.Node();
                _this.addChild(_this.bg2);
                _this.bg2.addComponent(cc.Graphics);
                gp = _this.bg2.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0xefcf3e >> 16, 0xefcf3e >> 8 & 0xFF, 0xefcf3e & 0xFF);
                gp.moveTo(-320, 480);
                gp.lineTo(-320 + 100, 480);
                gp.lineTo(-320 + 100 + 960, 480 - 960);
                gp.lineTo(-320 + 960, 480 - 960);
                gp.lineTo(-320, 480);
                gp.fill();
                gp.moveTo(-320 - 2560, 480);
                gp.lineTo(-320 + 100 - 2560, 480);
                gp.lineTo(-320 + 100 + 960 - 2560, 480 - 960);
                gp.lineTo(-320 + 960 - 2560, 480 - 960);
                gp.lineTo(-320 - 2560, 480);
                gp.fill();
                _this.bg2.x = -1280;
                _this.rect1 = new cc.Node();
                _this.addChild(_this.rect1);
                _this.rect1.addComponent(cc.Graphics);
                gp = _this.rect1.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(255, 255, 255);
                _this.rect2 = new cc.Node();
                _this.addChild(_this.rect2);
                _this.rect2.addComponent(cc.Graphics);
                gp = _this.rect2.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF);
                _this._rect1Size = 0;
                _this._rect1Rot = 0;
                _this._rect1Alpha = 0;
                var __ = _this;
                setTimeout(function () {
                    setInterval(this.update.bind(this), 0.016);
                    lib.Tween.to(__, 0.5, { rect1Size: 600 }, lib.Ease.CUBIC_EASE_OUT).call(function () {
                        setTimeout(function () {
                            lib.Tween.to(__, 0.5, { rect1Size: 300 }, lib.Ease.BACK_EASE_OUT);
                            lib.Tween.to(__, 0.5, { rect1Rot: 225 }, lib.Ease.BACK_EASE_OUT);
                        }, 30);
                    });
                    lib.Tween.to(__, 0.5, { rect1Rot: 135 }, lib.Ease.CUBIC_EASE_OUT);
                    lib.Tween.to(__, 0.5, { rect1Alpha: 255 }, lib.Ease.CUBIC_EASE_OUT, { rect1Alpha: 0 });
                    setTimeout(function () {
                        __._rect2Size = 0;
                        __._rect2Rot = 0;
                        __._rect2Alpha = 0;
                        lib.Tween.to(__, 0.5, { rect2Size: 600 }, lib.Ease.CUBIC_EASE_OUT).call(function () {
                            setTimeout(function () {
                                lib.Tween.to(__, 0.5, { rect2Size: 400 }, lib.Ease.BACK_EASE_OUT);
                                // lib.Tween.to(__, 0.5, {rect2Rot: 45}, lib.Ease.BACK_EASE_OUT);
                            }, 30);
                        });
                        lib.Tween.to(__, 0.5, { rect2Rot: 45 }, lib.Ease.CUBIC_EASE_OUT);
                        lib.Tween.to(__, 0.5, { rect2Alpha: 255 }, lib.Ease.CUBIC_EASE_OUT, { rect1Alpha: 0 });
                    }, 530);
                }.bind(_this), 200);
                return _this;
            }
            Object.defineProperty(MainView.prototype, "rect1Size", {
                get: function () {
                    return this._rect1Size;
                },
                set: function (val) {
                    this._rect1Size = val;
                    var gp = this.rect1.getComponent(cc.Graphics);
                    gp.clear();
                    gp.strokeColor = new cc.Color(255, 255, 255, this._rect1Alpha);
                    gp.rect(-val / 2, -val / 2, val, val);
                    gp.stroke();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainView.prototype, "rect1Alpha", {
                get: function () {
                    return this._rect1Alpha;
                },
                set: function (val) {
                    this._rect1Alpha = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainView.prototype, "rect1Rot", {
                get: function () {
                    return this._rect1Rot;
                },
                set: function (val) {
                    this._rect1Rot = val;
                    this.rect1.rotation = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainView.prototype, "rect2Size", {
                get: function () {
                    return this._rect2Size;
                },
                set: function (val) {
                    this._rect2Size = val;
                    var gp = this.rect2.getComponent(cc.Graphics);
                    gp.clear();
                    gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF, this._rect2Alpha);
                    gp.rect(-val / 2, -val / 2, val, val);
                    gp.stroke();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainView.prototype, "rect2Alpha", {
                get: function () {
                    return this._rect2Alpha;
                },
                set: function (val) {
                    this._rect2Alpha = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MainView.prototype, "rect2Rot", {
                get: function () {
                    return this._rect2Rot;
                },
                set: function (val) {
                    this._rect2Rot = val;
                    this.rect2.rotation = val;
                },
                enumerable: true,
                configurable: true
            });
            MainView.prototype.update = function () {
                this.bg1.x += 0.15;
                if (this.bg1.x >= 1280 + 640) {
                    this.bg1.x -= 1280 + 640;
                }
                this.bg2.x += 0.3;
                if (this.bg2.x >= 2560) {
                    this.bg2.x -= 2560;
                }
            };
            return MainView;
        }(cc.Node));
        motion.MainView = MainView;
    })(motion = game.motion || (game.motion = {}));
})(game || (game = {}));
//////////Module crg//////////
//////////model/proxy/ResourceProxy.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var ResourceProxy = /** @class */ (function () {
            function ResourceProxy() {
            }
            ResourceProxy.configLoadComplete = function () {
                crg.ConfigProxy.init();
                var list = crg.ConfigProxy.musicConfig;
                for (var i = 0; i < list.length; i++) {
                    var item = { name: "rhythm" + list[i].name, url: "resources/crg/res/rhythm/" + list[i].url };
                    ResourceProxy.loadList.push(item);
                }
                list = crg.ConfigProxy.levelConfig;
                for (var i = 0; i < list.length; i++) {
                    ResourceProxy.loadList.push({
                        name: "bgm" + list[i].LevelId,
                        url: "resources/crg/res/bgm/" + list[i].music
                    });
                    ResourceProxy.loadList.push({
                        name: "level" + list[i].LevelId,
                        url: "resources/crg/res/config2/level" + list[i].LevelId + ".csv"
                    });
                }
            };
            ResourceProxy.getResource = function (name) {
                for (var i = 0; i < ResourceProxy.loadList.length; i++) {
                    if (ResourceProxy.loadList[i].name == name) {
                        return ResourceProxy.loadList[i].data;
                    }
                }
                return null;
            };
            ResourceProxy.loadResources = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var list;
                    return __generator(this, function (_a) {
                        ResourceProxy.loadList = ResourceProxy.initList.concat();
                        list = ResourceProxy.loadList;
                        return [2 /*return*/, new Promise(function (resolve) {
                                var index = 0;
                                var load = function () {
                                    if (index >= list.length) {
                                        crg.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB("loading.MainMediator"));
                                        resolve();
                                        return;
                                    }
                                    var res = list[index];
                                    crg.mainMediator.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB("loading.MainMediator", { text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name }));
                                    if (res.resourceType == "effect") {
                                        if (!res.loadIndex) {
                                            res.pictures = [];
                                            res.loadIndex = 0;
                                            res.loadLength = res.nameEnd - res.nameBegin + 1;
                                            res.data = {
                                                pictures: []
                                            };
                                            if (res.properties) {
                                                for (var key in res.properties) {
                                                    res.data[key] = res.properties[key];
                                                }
                                            }
                                        }
                                        else {
                                            if (res.loadIndex >= res.loadLength) {
                                                index++;
                                                load();
                                                return;
                                            }
                                        }
                                        var count = res.loadIndex + res.nameBegin;
                                        var name = "" + count;
                                        while (name.length < res.nameCount) {
                                            name = "0" + name;
                                        }
                                        var loadURL = cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd);
                                        cc.loader.load(loadURL, function (e, data) {
                                            res.data.pictures.push(data);
                                            res.loadIndex++;
                                            if (res.loadIndex == res.loadLength) {
                                                index++;
                                            }
                                            load();
                                        });
                                    }
                                    else {
                                        cc.loader.load(cc.url.raw(res.url), function (e, data) {
                                            res.data = data;
                                            if (res.execute) {
                                                res.execute();
                                            }
                                            index++;
                                            load();
                                        });
                                    }
                                };
                                load();
                            }.bind(this))];
                    });
                });
            };
            ResourceProxy.initList = [
                { name: "rhythmTip", url: "resources/crg/res/music/tip.wav" },
                { name: "rhythmMiss", url: "resources/crg/res/music/miss.wav" },
                { name: "rhythmGood", url: "resources/crg/res/music/good.wav" },
                { name: "rhythmPerfect", url: "resources/crg/res/music/perfect.wav" },
                { name: "allConfig", url: "resources/crg/res/config2/all.csv" },
                { name: "levelConfig", url: "resources/crg/res/config2/allLevel.csv" },
                {
                    name: "musicConfig",
                    url: "resources/crg/res/config2/music.csv",
                    execute: ResourceProxy.configLoadComplete
                },
                { name: "click", url: "resources/crg/res/textures/ui/click.png" },
                { name: "heart", url: "resources/crg/res/textures/ui/heart.png" },
                { name: "heart2", url: "resources/crg/res/textures/ui/heart2.png" },
                { name: "ground", url: "resources/crg/res/textures/bg/ground.png" },
                { name: "ground1", url: "resources/crg/res/textures/bg/ground1.png" },
                { name: "ground2", url: "resources/crg/res/textures/bg/ground2.png" },
                { name: "ground3", url: "resources/crg/res/textures/bg/ground3.png" },
                { name: "cloud1", url: "resources/crg/res/textures/bg/cloud1.png" },
                { name: "cloud2", url: "resources/crg/res/textures/bg/cloud2.png" },
                { name: "tree1", url: "resources/crg/res/textures/bg/tree1.png" },
                { name: "tree2", url: "resources/crg/res/textures/bg/tree2.png" },
                { name: "tree3", url: "resources/crg/res/textures/bg/tree3.png" },
                { name: "tree4", url: "resources/crg/res/textures/bg/tree4.png" },
                { name: "tree5", url: "resources/crg/res/textures/bg/tree5.png" },
                { name: "tree6", url: "resources/crg/res/textures/bg/tree6.png" },
                { name: "tree7", url: "resources/crg/res/textures/bg/tree7.png" },
                { name: "bg1", url: "resources/crg/res/textures/bg/bg1.png" },
                { name: "bg2", url: "resources/crg/res/textures/bg/bg2.png" },
                { name: "bg3", url: "resources/crg/res/textures/bg/bg3.png" },
                { name: "bg4", url: "resources/crg/res/textures/bg/bg4.png" },
                { name: "effect", url: "resources/crg/res/textures/bg/effect.png" },
                {
                    name: "player1",
                    url: "resources/crg/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "him",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 66,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }
                },
                {
                    name: "player2",
                    url: "resources/crg/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "her",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 66,
                        scaleX: -1.2,
                        scaleY: 1.2
                    }
                },
                { name: "monster1", url: "resources/crg/res/textures/enemy/rank1.png" },
                { name: "monster2", url: "resources/crg/res/textures/enemy/rank2.png" },
                { name: "monster3", url: "resources/crg/res/textures/enemy/rank3.png" },
                { name: "monster4", url: "resources/crg/res/textures/enemy/rank4.png" },
                { name: "monster5", url: "resources/crg/res/textures/enemy/rank5.png" },
                { name: "monster6", url: "resources/crg/res/textures/enemy/rank6.png" },
                { name: "monsterStar", url: "resources/crg/res/textures/enemy/star2.png" },
                {
                    name: "pressok",
                    url: "resources/crg/res/textures/effect/pressok/",
                    resourceType: "effect",
                    namePre: "hero alien shipAttack_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 8,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 33,
                        anchorY: 0
                    }
                },
            ];
            return ResourceProxy;
        }());
        crg.ResourceProxy = ResourceProxy;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////model/proxy/ConfigProxy.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var ConfigProxy = /** @class */ (function () {
            function ConfigProxy() {
            }
            ConfigProxy.init = function () {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;
                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(crg.ResourceProxy.getResource("allConfig"));
                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(crg.ResourceProxy.getResource("levelConfig"));
                    //分析 MusicConfig
                    ConfigProxy.musicConfig = ConfigProxy.decodeConfig(crg.ResourceProxy.getResource("musicConfig"));
                }
            };
            ConfigProxy.getConfig = function (name) {
                var item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            };
            ConfigProxy.getLevelConfig = function (levelId) {
                var levelAllCfg = ConfigProxy.levelConfig.getItemWith("LevelId", levelId);
                var levelCfg = ConfigProxy.decodeConfig(crg.ResourceProxy.getResource("level" + levelId));
                var cfg = [];
                var time = ConfigProxy.getConfig("gameStartTime");
                var len = levelCfg.length;
                for (var i = 0; i < len; i++) {
                    var levelItemCfg = ConfigProxy.getRandomLevel(time, levelCfg[i]);
                    cfg = cfg.concat(levelItemCfg);
                    time = ConfigProxy.getLevelConfigTime(levelItemCfg);
                }
                cfg.push({
                    operate: 9,
                    time: levelAllCfg.time
                });
                return new lib.ArrayValue(cfg);
            };
            ConfigProxy.decodeConfig = function (content) {
                var res = new lib.ArrayValue();
                var list = content.split("\n");
                var keys = [];
                for (var i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    var itemList = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    }
                    else {
                        var item = {};
                        for (var j = 0; j < itemList.length; j++) {
                            if (j == 0 && !itemList[j]) {
                                item = null;
                                break;
                            }
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        if (item) {
                            res.push(item);
                        }
                    }
                }
                return res;
            };
            ConfigProxy.getRandomLevel = function (startTime, item) {
                var levelConfig = item;
                var list = [];
                var time = startTime;
                //计算提示拍子
                time += ConfigProxy.getConfig("levelTimeGap");
                var count = 0;
                var start = list.length;
                for (var i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i] && levelConfig["beat" + i] != "") {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start,
                            music: levelConfig["beat" + i],
                            event: 1 + (~~(Math.random() * 3))
                        });
                        list[0].cut++;
                    }
                    else {
                        count++;
                    }
                }
                return list;
            };
            ConfigProxy.getLevelConfigTime = function (cfg) {
                var time = 0;
                for (var i = 0; i < cfg.length; i++) {
                    if (cfg[i].time > time) {
                        time = cfg[i].time;
                    }
                }
                return time;
            };
            ConfigProxy.flag = false;
            ConfigProxy.levelConfig = new lib.ArrayValue();
            return ConfigProxy;
        }());
        crg.ConfigProxy = ConfigProxy;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////model/proxy/DataProxy.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var DataProxy = /** @class */ (function () {
            function DataProxy() {
            }
            return DataProxy;
        }());
        crg.DataProxy = DataProxy;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////model/vo/GameData.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameData = /** @class */ (function () {
            function GameData() {
                /**
                 * 移动的位置
                 * @type {number}
                 */
                this.position = 0;
                /**
                 * 当前帧改变距离
                 * @type {number}
                 */
                this.currentMovePosition = 0;
                /**
                 * 移动的时间
                 * @type {number}
                 */
                this.time = 0;
                /**
                 * 上一次移动的时间
                 * @type {number}
                 */
                this.lastTime = 0;
                /**
                 * 游戏是否结束
                 * @type {boolean}
                 */
                this.gameOver = false;
                /**
                 * 背景数据
                 * @type {game.crg.BackgroundData}
                 */
                this.groundData = new crg.BackgroundData();
                //怪物
                this.monsters = [];
                //动画
                this.tweenList = [];
                //点击
                this.clickFlag = false;
                //记录是否操作过
                this.operate = {};
                //记录怪兽是否出现过
                this.monsterShow = {};
                //combo数
                this.combo = 0;
                //分数
                this.score = 0;
                //perfect
                this.perfect = 0;
                //good
                this.good = 0;
                //miss
                this.miss = 0;
                //连续 perfect
                this.continuousPerfect = 0;
                //最大血量
                this.maxHp = 3;
                //血量
                this.hp = new lib.IntValue(3);
                this.progress = 0;
                this.progressAll = 0;
            }
            return GameData;
        }());
        crg.GameData = GameData;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////model/vo/BackgroundData.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var BackgroundData = /** @class */ (function () {
            function BackgroundData() {
                this.items = [
                    new crg.BackgroundItemData("bg1", "bg1", 3, 2, 0.1),
                    new crg.BackgroundItemData("bg2", "bg2", 3, 2, 0.1),
                    new crg.BackgroundItemData("bg3", "bg3", 3, 2, 0.1),
                    new crg.BackgroundItemData("bg4", "bg4", 3, 2, 0.1),
                    new crg.BackgroundItemData("tree1", "tree1", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree2", "tree2", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree3", "tree3", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree4", "tree4", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree5", "tree5", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree6", "tree6", 2, 3, 0.4),
                    new crg.BackgroundItemData("tree7", "tree7", 2, 3, 0.4),
                    new crg.BackgroundItemData("gd1", "ground1", 1, 2, 0.1),
                    new crg.BackgroundItemData("gd2", "ground2", 1, 2, 0.1),
                    new crg.BackgroundItemData("gd3", "ground3", 1, 2, 0.1),
                    new crg.BackgroundItemData("cd1", "cloud1", 1, 3, 0.5),
                    new crg.BackgroundItemData("cd2", "cloud2", 1, 3, 0.5),
                ];
            }
            return BackgroundData;
        }());
        crg.BackgroundData = BackgroundData;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////model/vo/BackgroundItemData.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var BackgroundItemData = /** @class */ (function () {
            function BackgroundItemData(id, url, layer, changeType, changeSpeed) {
                if (changeType === void 0) { changeType = 0; }
                if (changeSpeed === void 0) { changeSpeed = 0; }
                /**
                 * 变化值
                 */
                this.changeValue = new lib.NumberValue();
                this.id = id;
                this.url = url;
                this.layer = layer;
                this.changeType = changeType;
                this.changeSpeed = changeSpeed;
            }
            BackgroundItemData.prototype.isChangeComplete = function () {
                if (this.changeType == 0)
                    return true;
                return this.changeValue.value < 1 ? false : true;
            };
            return BackgroundItemData;
        }());
        crg.BackgroundItemData = BackgroundItemData;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////controller/Command.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var Command = /** @class */ (function () {
            function Command() {
            }
            /**
             * 内部消息
             */
            Command.IN = {
                OPERATE: "operate",
                SHOW_COMBO: "show_combo",
                SHOW_OPERATE_RESULT: "show_operate_result",
                GAME_OVER: "game_over",
            };
            /**
             * 希望外部处理的消息
             */
            Command.OUT = {};
            return Command;
        }());
        crg.Command = Command;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////controller/OperateCommand.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var OperateCommand = /** @class */ (function (_super) {
            __extends(OperateCommand, _super);
            function OperateCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateCommand.prototype.execute = function (note) {
                var proxy = crg.DataProxy.data;
                var type = note.body.operateType;
                var data = note.body.data;
                //播放音效
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    if (type == "Miss" || type == "OutMiss") {
                        cc.audioEngine.play(crg.ResourceProxy.getResource("rhythmMiss"), false, 1);
                    }
                }
                else {
                    cc.audioEngine.play(crg.ResourceProxy.getResource("rhythm" + data.music), false, 1);
                }
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                }
                else {
                    if (type == "Perfect") {
                        proxy.score += 100;
                        proxy.perfect++;
                    }
                    else if (type == "Good") {
                        proxy.score += 80;
                        proxy.good++;
                    }
                    else if (type == "Miss") {
                        proxy.score += 0;
                        proxy.miss++;
                    }
                    else if (type == "OutMiss") {
                        proxy.miss++;
                    }
                }
                //显示操作结果
                // mainMediator.sendNotification(Command.IN.SHOW_OPERATE_RESULT, type);//type == "AutoMiss" || type == "OutMiss" ? "Miss" : type);
                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                }
                else {
                    proxy.combo++;
                }
                crg.mainMediator.sendNotification(crg.Command.IN.SHOW_COMBO, proxy.combo);
                //处理对应事件
                var event = data ? data.event : 0;
                if (event) {
                    var list = [];
                    var items = crg.DataProxy.data.groundData.items;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].changeType == event && items[i].isChangeComplete() == false) {
                            list.push(items[i]);
                        }
                    }
                    if (list.length) {
                        var item = list[~~(Math.random() * list.length)];
                        if (item.changeValue.value + item.changeSpeed > 1) {
                            item.changeValue.value = 1;
                        }
                        else {
                            item.changeValue.value += item.changeSpeed;
                        }
                    }
                }
            };
            return OperateCommand;
        }(mvc.SimpleCommand));
        crg.OperateCommand = OperateCommand;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////controller/GameOverCommand.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameOverCommand = /** @class */ (function (_super) {
            __extends(GameOverCommand, _super);
            function GameOverCommand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameOverCommand.prototype.execute = function (note) {
                var data = crg.DataProxy.data;
                if (data.bgm != null) {
                    cc.audioEngine.stop(data.bgm);
                    data.bgm = null;
                }
                data.gameOver = true;
                //清除动画
                while (data.tweenList.length) {
                    data.tweenList.pop().dispose();
                }
                // 弹出结果内容
                crg.mainMediator.sendNotification(game.common.Command.CHANGE_SCENE, new game.common.ChangeSceneNB("bamaoResult", {
                    score: data.score,
                    perfect: data.perfect,
                    good: data.good,
                    miss: data.miss,
                    progress: (~~(10000 * data.progress / data.progressAll)) / 100
                }));
            };
            return GameOverCommand;
        }(mvc.SimpleCommand));
        crg.GameOverCommand = GameOverCommand;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/CRGModule.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var CRGModule = /** @class */ (function (_super) {
            __extends(CRGModule, _super);
            function CRGModule() {
                return _super.call(this, CRGModule.NAME) || this;
            }
            CRGModule.prototype.listNotificationInterests = function () {
                return [game.common.Command.INIT_MODULE, game.common.Command.CHANGE_SCENE, game.common.Command.REGISTER_NET, game.common.Command.CLOSE_SCENE];
            };
            CRGModule.prototype.handleNotification = function (note) {
                switch (note.name) {
                    case game.common.Command.INIT_MODULE://初始化模块
                        //初始化 view
                        this.facade.registerMediator(new crg.MainMediator());
                        this.facade.registerMediator(new crg.UIMediator());
                        //初始化 controller
                        this.facade.registerCommand(crg.Command.IN.OPERATE, crg.OperateCommand);
                        this.facade.registerCommand(crg.Command.IN.GAME_OVER, crg.GameOverCommand);
                        break;
                    case game.common.Command.CHANGE_SCENE://切换场景
                        if (note.body.sceneName == CRGModule.NAME) {
                            this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(crg.MainMediator.NAME, note.body.data));
                        }
                        break;
                    case game.common.Command.CLOSE_SCENE:
                        if (note.body.sceneName == CRGModule.NAME) {
                            crg.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(crg.MainMediator.NAME));
                            crg.mainMediator.sendNotification(game.common.Command.CLOSE_VIEW, new game.common.CloseViewNB(crg.UIMediator.NAME));
                        }
                        break;
                }
            };
            CRGModule.NAME = "crg";
            return CRGModule;
        }(mvc.Module));
        crg.CRGModule = CRGModule;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/MainMediator.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var MainMediator = /** @class */ (function (_super) {
            __extends(MainMediator, _super);
            function MainMediator() {
                var _this = _super.call(this, MainMediator.NAME, null) || this;
                crg.mainMediator = _this;
                return _this;
            }
            MainMediator.prototype.initUI = function () {
                crg.DataProxy.data = new crg.GameData();
                crg.DataProxy.data.level = this.level;
                this.viewComponent = new cc.Node();
                this.viewComponent.anchorX = 0;
                this.viewComponent.anchorY = 0;
                var background = new cc.Node();
                background.name = "background";
                background.addComponent(crg.Background);
                background.anchorX = 0;
                background.anchorY = 0;
                this.viewComponent.addChild(background);
                this.viewComponent.addComponent(crg.GameMain);
                this.sendNotification(game.common.Command.OPEN_VIEW, new game.common.OpenViewNB(crg.UIMediator.NAME));
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            MainMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.asyncLoad.call(this, resolve);
                                return [4 /*yield*/, crg.ResourceProxy.loadResources()];
                            case 1:
                                _a.sent();
                                this.initUI();
                                this.loadComplete();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW];
            };
            MainMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, node_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                }
                                return [3 /*break*/, 5];
                            case 1:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                this.level = note.body.data;
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.MainUILayer.show(this.viewComponent);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (note.body.name != MainMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    node_2 = this.viewComponent;
                                    lib.Tween.to(this.viewComponent, 1, { opacity: 0 }).call(function () {
                                        node_2.destroy();
                                    }.bind(this));
                                    this.viewComponent = null;
                                }
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            MainMediator.NAME = "crg.MainMediator";
            return MainMediator;
        }(mvc.Mediator));
        crg.MainMediator = MainMediator;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/ui/UIMediator.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var UIMediator = /** @class */ (function (_super) {
            __extends(UIMediator, _super);
            function UIMediator() {
                return _super.call(this, UIMediator.NAME, null) || this;
            }
            UIMediator.prototype.initUI = function () {
                this.viewComponent = new crg.GameUI();
            };
            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            UIMediator.prototype.asyncLoad = function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.asyncLoad.call(this, resolve);
                        this.initUI();
                        this.loadComplete();
                        return [2 /*return*/];
                    });
                });
            };
            UIMediator.prototype.listNotificationInterests = function () {
                return [game.common.Command.OPEN_VIEW, game.common.Command.CLOSE_VIEW,
                    crg.Command.IN.SHOW_COMBO, crg.Command.IN.SHOW_OPERATE_RESULT];
            };
            UIMediator.prototype.handleNotification = function (note) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, node_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = note.name;
                                switch (_a) {
                                    case game.common.Command.OPEN_VIEW: return [3 /*break*/, 1];
                                    case game.common.Command.CLOSE_VIEW: return [3 /*break*/, 4];
                                    case crg.Command.IN.SHOW_COMBO: return [3 /*break*/, 5];
                                    case crg.Command.IN.SHOW_OPERATE_RESULT: return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 7];
                            case 1:
                                if (note.body.name != UIMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (!!this.viewComponent) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.load()];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                if (this.viewComponent) {
                                    game.layer.MainUILayer.show(this.viewComponent);
                                }
                                return [3 /*break*/, 7];
                            case 4:
                                if (note.body.name != UIMediator.NAME) {
                                    return [2 /*return*/];
                                }
                                if (this.viewComponent && this.viewComponent.parent) {
                                    node_3 = this.viewComponent;
                                    lib.Tween.to(this.viewComponent, 1, { opacity: 0 }).call(function () {
                                        node_3.destroy();
                                    }.bind(this));
                                    this.viewComponent = null;
                                }
                                return [3 /*break*/, 7];
                            case 5:
                                this.viewComponent.showCombo(note.body);
                                return [3 /*break*/, 7];
                            case 6:
                                this.viewComponent.showOperateResult(note.body);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                });
            };
            UIMediator.NAME = "crg.UIMediator";
            return UIMediator;
        }(mvc.Mediator));
        crg.UIMediator = UIMediator;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/ui/GameUI.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameUI = /** @class */ (function (_super) {
            __extends(GameUI, _super);
            function GameUI() {
                var _this = _super.call(this) || this;
                var node = new cc.Node();
                _this.combo = node;
                _this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 60;
                node.addComponent(cc.Label);
                var label = node.getComponent(cc.Label);
                label.string = "";
                node = new cc.Node();
                _this.operate = node;
                _this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 140;
                node.addComponent(cc.Label);
                label = node.getComponent(cc.Label);
                label.string = "";
                _this.hearts = [];
                var data = crg.DataProxy.data;
                for (var i = 0; i < data.maxHp; i++) {
                    var node_4 = new cc.Node();
                    node_4.anchorX = 0;
                    node_4.anchorY = 1;
                    node_4.x = -lib.data.system.screen.width / 2 + 10 + i * 70;
                    node_4.y = lib.data.system.screen.height / 2 - 10;
                    _this.addChild(node_4);
                    node_4.addComponent(cc.Sprite);
                    var sprite = node_4.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame();
                    sprite.spriteFrame.setTexture(crg.ResourceProxy.getResource("heart"));
                    _this.hearts.push(sprite.spriteFrame);
                }
                data.hp.addListener(lib.Event.CHANGE, _this.onHpChange, _this);
                return _this;
            }
            GameUI.prototype.onHpChange = function (e) {
                var data = crg.DataProxy.data;
                for (var i = 0; i < data.maxHp; i++) {
                    if (i + 1 <= data.hp.value) {
                        this.hearts[i].setTexture(crg.ResourceProxy.getResource("heart"));
                    }
                    else {
                        this.hearts[i].setTexture(crg.ResourceProxy.getResource("heart2"));
                    }
                }
            };
            GameUI.prototype.showCombo = function (val) {
                if (val) {
                    this.combo.getComponent(cc.Label).string = "Combo " + val;
                    crg.DataProxy.data.tweenList.push(lib.Tween.to(this.combo, 0.2, {
                        opacity: 255,
                        scaleX: 1,
                        scaleY: 1
                    }, null, {
                        opacity: 150,
                        scaleX: 0.5,
                        scaleY: 0.5
                    }));
                }
                else {
                    this.combo.getComponent(cc.Label).string = "";
                }
            };
            return GameUI;
        }(cc.Node));
        crg.GameUI = GameUI;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/utils/Effect.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        /**
         * 序列帧特效
         */
        var Effect = /** @class */ (function (_super) {
            __extends(Effect, _super);
            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            function Effect(config, loop) {
                if (loop === void 0) { loop = null; }
                var _this = _super.call(this) || this;
                _this.frameTime = config.frameTime;
                _this.pictures = config.pictures;
                _this.length = _this.pictures.length;
                _this.loop = loop != null ? loop : !!config.loop;
                _this.frame = 0;
                if (config.scaleX != null) {
                    _this.scaleX = config.scaleX;
                }
                if (config.scaleY != null) {
                    _this.scaleY = config.scaleY;
                }
                if (config.anchorX != null) {
                    _this.anchorX = config.anchorX;
                }
                if (config.anchorY != null) {
                    _this.anchorY = config.anchorY;
                }
                _this.update = _this.update.bind(_this);
                _this.addComponent(cc.Sprite);
                var sprite = _this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(_this.update, _this.frameTime / 1000, 10000000000);
                _this.update();
                return _this;
            }
            Effect.prototype.update = function () {
                if (crg.DataProxy.data.gameOver) {
                    return;
                }
                var sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            };
            Effect.prototype.destroy = function () {
                this.getComponent(cc.Sprite).unschedule(this.update);
                _super.prototype.destroy.call(this);
                return true;
            };
            return Effect;
        }(cc.Node));
        crg.Effect = Effect;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/utils/DisplayFactory.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var DisplayFactory = /** @class */ (function () {
            function DisplayFactory() {
            }
            DisplayFactory.createImage = function (texture2d) {
                var node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                node.anchorY = 0;
                var sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(texture2d);
                return node;
            };
            return DisplayFactory;
        }());
        crg.DisplayFactory = DisplayFactory;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/utils/Filter.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var Filter = /** @class */ (function () {
            function Filter(sprite) {
                this.createProgram();
                this.sprite = sprite;
                this.sprite._sgNode.setShaderProgram(this.program);
            }
            Filter.prototype.createProgram = function () {
            };
            return Filter;
        }());
        crg.Filter = Filter;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/utils/NoneFilter.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var NoneFilter = /** @class */ (function (_super) {
            __extends(NoneFilter, _super);
            function NoneFilter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NoneFilter.prototype.createProgram = function () {
                if (!NoneFilter.program) {
                    var glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(NoneFilter.vectorShader, NoneFilter.fragShader);
                    }
                    else {
                        glProgram.initWithVertexShaderByteArray(NoneFilter.vectorShader, NoneFilter.fragShader);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    NoneFilter.program = glProgram;
                }
                this.program = NoneFilter.program;
            };
            NoneFilter.vectorShader = "\n                                    attribute vec4 a_position;\n                                    attribute vec2 a_texCoord;\n                                    attribute vec4 a_color;\n                                    varying vec4 v_fragmentColor; \n                                    varying vec2 v_texCoord; \n                                    \n                                    void main() \n                                    { \n                                        gl_Position = CC_PMatrix * a_position;\n                                        v_fragmentColor = a_color; \n                                        v_texCoord = a_texCoord; \n                                    }\n                                    ";
            NoneFilter.fragShader = "\n                                    #ifdef GL_ES\n                                    precision lowp float;\n                                    #endif\n                                    \n                                    varying vec4 v_fragmentColor;\n                                    varying vec2 v_texCoord;\n                                    \n                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);\n                                    \n                                    void main()\n                                    {\n                                        gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n                                    }";
            return NoneFilter;
        }(crg.Filter));
        crg.NoneFilter = NoneFilter;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/utils/ColorFilter.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var ColorFilter = /** @class */ (function (_super) {
            __extends(ColorFilter, _super);
            function ColorFilter(sprite, h, s, l) {
                var _this = _super.call(this, sprite) || this;
                _this.h = h;
                _this.s = s;
                _this.l = l;
                var programmer = _this.program;
                if (cc.sys.isNative) {
                    programmer.setUniformInt("filterType", 1);
                    programmer.setUniformFloat("h", _this.h);
                    programmer.setUniformFloat("s", _this.s);
                    programmer.setUniformFloat("l", _this.l);
                }
                else {
                    _this.program.use();
                    programmer.setUniformLocationI32(programmer.getUniformLocationForName("filterType"), 1);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("h"), _this.h);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("s"), _this.s);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("l"), _this.l);
                }
                return _this;
                // if (cc.sys.isNative) {
                //     this.program.setUniformVec4("filtersParams" + 0, cc.math.vec4.apply(null, [h, s, l]));
                // } else {
                //     this.program.setUniformLocationWith4f.apply(this.program, [this.program.getUniformLocationForName("filtersParams" + 0)].concat([h, s, l]));
                // }
            }
            ColorFilter.prototype.createProgram = function () {
                if (!ColorFilter.pools.length) {
                    var glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(ColorFilter.vectorShader, ColorFilter.fragShader);
                    }
                    else {
                        glProgram.initWithVertexShaderByteArray(ColorFilter.vectorShader, ColorFilter.fragShader);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    this.program = glProgram;
                }
                else {
                    this.program = ColorFilter.pools.shift();
                }
            };
            ColorFilter.prototype.dispose = function () {
                ColorFilter.pools.push(this.program);
            };
            ColorFilter.pools = [];
            ColorFilter.vectorShader = "\n                                    attribute vec4 a_position;\n                                    attribute vec2 a_texCoord;\n                                    attribute vec4 a_color;\n                                    varying vec4 v_fragmentColor; \n                                    varying vec2 v_texCoord; \n                                    \n                                    void main() \n                                    { \n                                        gl_Position = CC_PMatrix * a_position;\n                                        v_fragmentColor = a_color; \n                                        v_texCoord = a_texCoord; \n                                    }\n                                    ";
            ColorFilter.fragShader = "\n                                    #ifdef GL_ES\n                                    precision lowp float;\n                                    #endif\n                                    \n                                    varying vec4 v_fragmentColor;\n                                    varying vec2 v_texCoord;\n                                    \n                                    uniform int filterType;\n                                    \n                                    uniform vec4 filtersParams0;\n                                    uniform vec4 filtersParams1;\n                                    uniform vec4 filtersParams2;\n                                    uniform vec4 filtersParams3;\n                                    uniform vec4 filtersParams4;\n                                    uniform vec4 filtersParams5;\n                                    uniform vec4 filtersParams6;\n                                    uniform vec4 filtersParams7;\n                                    \n                                    uniform float h;\n                                    uniform float s;\n                                    uniform float l;\n                                    \n                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);\n                                    \n                                    void main()\n                                    {\n                                        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n                                        if(filterType == 1) {\n                                            gl_FragColor = colorFilter(c,h,s,l);\n                                        }\n                                    }\n                                    \n                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL) {\n                                        //rgb -> hsl\n                                        float r = color[0];\n                                        float g = color[1];\n                                        float b = color[2];\n                                        float min = r<g?(r<b?r:b):(g<b?g:b);\n                                        float max = r>g?(r>b?r:b):(g>b?g:b);\n                                        float h = 0.0;\n                                        if(max == min) {\n                                            h = 0.0;\n                                        } else if(max == r) {\n                                            if(g >= b) {\n                                                h = 60.0*(g-b)/(max-min) + 0.0;\n                                            } else {\n                                                h = 60.0*(g-b)/(max-min) + 360.0;\n                                            }\n                                        } else if(max == g) {\n                                            h = 60.0*(b-r)/(max-min) + 120.0;\n                                        } else {\n                                            h = 60.0*(r-g)/(max-min) + 240.0;\n                                        }\n                                        for(int n = 0; n < 10; n++) {\n                                            if(h < 0.0) {\n                                                h += 0.0;\n                                            } else if(h > 360.0) {\n                                                h -= 360.0;\n                                            } else {\n                                                break;\n                                            }\n                                        }\n                                        float l = 0.5*(max+min);\n                                        if(l > 1.0) {\n                                            l = 1.0;\n                                        } else if(l < 0.0) {\n                                            l = 0.0;\n                                        }\n                                        float s = 0.0;\n                                        if(l == 0.0 || max == min) {\n                                            s = 0.0;\n                                        } else if(l <= 0.5) {\n                                            s = (max - min)*0.5/l;\n                                        } else {\n                                            s = (max - min)*0.5/(1.0-l);\n                                        }\n                                        if(s > 1.0) {\n                                            s = 1.0;\n                                        } else if(s < 0.0) {\n                                            s = 0.0;\n                                        }\n                                    \n                                        //control hsl\n                                        h += colorH;\n                                        if(colorS < 0.0) {\n                                            s *= (colorS + 100.0)*0.01;\n                                        } else {\n                                            s *= 1.0 + colorS*0.002;\n                                        }\n                                        l += colorL/100.0;\n                                    \n                                    \n                                        //hsl -> rgb\n                                        if(s == 0.0) {\n                                            color[0] = l;\n                                            color[1] = l;\n                                            color[2] = l;\n                                        } else {\n                                            float q = 0.0;\n                                            if(l < 0.5) {\n                                                q = l*(1.0 + s);\n                                            } else {\n                                                q = l + s - l*s;\n                                            }\n                                            float p = 2.0*l - q;\n                                            float hk = h/360.0;\n                                            float tr = hk + 1.0/3.0;\n                                            float tg = hk;\n                                            float tb = hk - 1.0/3.0;\n                                            for(int n = 0; n < 10; n++) {\n                                                if(tr < 0.0) {\n                                                    tr += 1.0;\n                                                } else if(tr > 1.0) {\n                                                    tr -= 1.0;\n                                                } else {\n                                                    break;\n                                                }\n                                            }\n                                            for(int n = 0; n < 10; n++) {\n                                                if(tg < 0.0) {\n                                                    tg += 1.0;\n                                                } else if(tg > 1.0) {\n                                                    tg -= 1.0;\n                                                } else {\n                                                    break;\n                                                }\n                                            }\n                                            for(int n = 0; n < 10; n++) {\n                                                if(tb < 0.0) {\n                                                    tb += 1.0;\n                                                } else if(tb > 1.0) {\n                                                    tb -= 1.0;\n                                                } else {\n                                                    break;\n                                                }\n                                            }\n                                            if(tr < 1.0/6.0) {\n                                                tr = p + ((q - p) * 6.0 * tr);\n                                            } else if(tr < 0.5) {\n                                                tr = q;\n                                            } else if(tr < 2.0/3.0) {\n                                                tr = p + ((q - p) * 6.0 * (2.0/3.0 - tr));\n                                            } else {\n                                                tr = p;\n                                            }\n                                            if(tg < 1.0/6.0) {\n                                                tg = p + ((q - p) * 6.0 * tg);\n                                            } else if(tg < 0.5) {\n                                                tg = q;\n                                            } else if(tg < 2.0/3.0) {\n                                                tg = p + ((q - p) * 6.0 * (2.0/3.0 - tg));\n                                            } else {\n                                                tg = p;\n                                            }\n                                            if(tb < 1.0/6.0) {\n                                                tb = p + ((q - p) * 6.0 * tb);\n                                            } else if(tb < 0.5) {\n                                                tb = q;\n                                            } else if(tb < 2.0/3.0) {\n                                                tb = p + ((q - p) * 6.0 * (2.0/3.0 - tb));\n                                            } else {\n                                                tb = p;\n                                            }\n                                            color[0] = tr;\n                                            color[1] = tg;\n                                            color[2] = tb;\n                                        }\n                                        return color;\n                                    }\n                                    ";
            return ColorFilter;
        }(crg.Filter));
        crg.ColorFilter = ColorFilter;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/gameEvents/GameEvent.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameEvent = /** @class */ (function () {
            function GameEvent() {
            }
            GameEvent.prototype.execute = function () {
            };
            return GameEvent;
        }());
        crg.GameEvent = GameEvent;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/gameEvents/GameStartEvent.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameStartEvent = /** @class */ (function (_super) {
            __extends(GameStartEvent, _super);
            function GameStartEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameStartEvent.prototype.execute = function () {
                var data = crg.DataProxy.data;
                if (data.lastTime == 0) {
                    var player = new crg.Effect(crg.ResourceProxy.getResource("player" + (1 + (~~(2 * Math.random())))), true);
                    data.playerLayer.addChild(player);
                    player.x = 200;
                    player.y = 150;
                    data.player = player;
                    data.bgm = cc.audioEngine.play(crg.ResourceProxy.getResource("bgm" + data.level), true, 1);
                }
            };
            return GameStartEvent;
        }(crg.GameEvent));
        crg.GameStartEvent = GameStartEvent;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/gameEvents/OperateRhythmEvent.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var OperateRhythmEvent = /** @class */ (function (_super) {
            __extends(OperateRhythmEvent, _super);
            function OperateRhythmEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateRhythmEvent.prototype.execute = function () {
                var data = crg.DataProxy.data;
                var list = data.config;
                var findNext = false;
                var speed = crg.ConfigProxy.getConfig("timeSpeed");
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6 && list[i].time >= data.lastTime && list[i].time < data.time) {
                        crg.DataProxy.data.progress++;
                    }
                    if (list[i].operate == 6 && !data.monsterShow[list[i].time]) {
                        if ((list[i].time - 5000 < 0 || (list[i].time - 5000) >= data.lastTime) && (list[i].time - 5000) < data.time) {
                            var node = new cc.Node();
                            var monster = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            var sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(crg.ResourceProxy.getResource("monster" + ((~~(6 * Math.random())) + 1)));
                            data.monsterLayer.addChild(node);
                            node.addChild(monster);
                            node.x = data.player.x + (10 * Math.random()) + (list[i].time - data.time) * speed / 1000;
                            node.y = data.player.y;
                            monster.opacity = 0;
                            monster.scaleX = 0;
                            monster.scaleY = 0;
                            monster.parentNode = node;
                            monster.data = list[i];
                            data.monsters.push(monster);
                            data.monsterShow[list[i].time] = true;
                        }
                    }
                }
                for (var i = 0; i < data.monsters.length; i++) {
                    var last = data.monsters[i].parentNode.x;
                    data.monsters[i].parentNode.x -= (data.time - data.lastTime) * speed / 1000;
                    if ((last >= lib.data.system.screen.width - 50 && data.monsters[i].parentNode.x < lib.data.system.screen.width - 50) || data.monsters[i].parentNode.x < lib.data.system.screen.width - 100 && !list[i].tween) {
                        crg.DataProxy.data.tweenList.push(list[i].tween = lib.Tween.to(data.monsters[i], 1.5, {
                            opacity: 255,
                            scaleX: 0.75,
                            scaleY: 0.75,
                            x: 0,
                            y: 0
                        }, lib.Ease.CIRC_EASE_OUT, {
                            x: 200,
                            y: 200
                        }));
                        cc.audioEngine.play(crg.ResourceProxy.getResource("rhythm" + data.monsters[i].data.music), false, 1);
                    }
                }
                for (var i = 0; i < data.monsters.length; i++) {
                    if (data.monsters[i].parentNode.x < 0) {
                        data.monsters[i].destroy();
                        data.monsters.splice(i, 1);
                        i--;
                    }
                }
            };
            return OperateRhythmEvent;
        }(crg.GameEvent));
        crg.OperateRhythmEvent = OperateRhythmEvent;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/gameEvents/OperateEvent.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var OperateEvent = /** @class */ (function (_super) {
            __extends(OperateEvent, _super);
            function OperateEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OperateEvent.prototype.execute = function () {
                var data = crg.DataProxy.data;
                var list = data.config;
                var find = false;
                var perfectTime = crg.ConfigProxy.getConfig("perfectTime");
                var goodTime = crg.ConfigProxy.getConfig("goodTime");
                var missTime = crg.ConfigProxy.getConfig("missTime");
                if (data.clickFlag) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!data.operate[list[i].id] && Math.abs(data.time - list[i].time) < missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(data.time - list[i].time) < perfectTime) {
                                    crg.mainMediator.sendNotification(crg.Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Perfect"
                                    });
                                    //删除节拍对象
                                    this.pressOK(list[i]);
                                    this.showOperateText("Perfect");
                                    this.checkHp(true, true);
                                }
                                else if (Math.abs(data.time - list[i].time) < goodTime) {
                                    crg.mainMediator.sendNotification(crg.Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Good"
                                    });
                                    //删除节拍对象
                                    this.pressOK(list[i]);
                                    this.showOperateText("Good");
                                    this.checkHp(true);
                                }
                                else if (Math.abs(data.time - list[i].time) < missTime) {
                                    crg.mainMediator.sendNotification(crg.Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Miss"
                                    });
                                    this.showOperateText("Miss");
                                    this.checkHp(false);
                                }
                                find = true;
                                data.operate[list[i].time] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find) {
                        crg.mainMediator.sendNotification(crg.Command.IN.OPERATE, { data: null, operateType: "OutMiss" });
                        this.showOperateText("Miss");
                        this.checkHp(false);
                    }
                    data.clickFlag = false;
                }
                //检测漏过的点
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!data.operate[list[i].time] && data.time - list[i].time > missTime) {
                            crg.mainMediator.sendNotification(crg.Command.IN.OPERATE, { data: null, operateType: "AutoMiss" });
                            data.operate[list[i].time] = true;
                            this.showOperateText("Miss");
                            this.checkHp(false);
                        }
                    }
                }
            };
            OperateEvent.prototype.checkHp = function (flag, perfect) {
                if (perfect === void 0) { perfect = false; }
                if (flag == false) {
                    if (crg.DataProxy.data.hp.value) {
                        crg.DataProxy.data.hp.value = crg.DataProxy.data.hp.value - 1;
                    }
                    crg.DataProxy.data.continuousPerfect = 0;
                    //游戏结束，失败!
                    if (!crg.DataProxy.data.hp.value) {
                        crg.mainMediator.sendNotification(crg.Command.IN.GAME_OVER, false);
                    }
                }
                else {
                    if (perfect) {
                        crg.DataProxy.data.continuousPerfect++;
                        if (crg.DataProxy.data.continuousPerfect &&
                            crg.DataProxy.data.continuousPerfect % crg.ConfigProxy.getConfig("addHp") == 0 &&
                            crg.DataProxy.data.hp.value < crg.DataProxy.data.maxHp) {
                            crg.DataProxy.data.hp.value++;
                        }
                    }
                    else {
                        crg.DataProxy.data.continuousPerfect = 0;
                    }
                }
            };
            OperateEvent.prototype.showOperateText = function (type) {
                //显示 perfect good 文字
                var node = new cc.Node();
                node.x = crg.DataProxy.data.player.x + 20 - (40 * Math.random());
                node.y = crg.DataProxy.data.player.y - 80 + 20 - (40 * Math.random());
                // node.rotation = 10 - Math.random() * 20;
                crg.DataProxy.data.root.addChild(node);
                node.addComponent(cc.Label);
                node.color = new cc.Color(100 + 155 * Math.random(), 100 + 155 * Math.random(), 100 + 155 * Math.random());
                var label = node.getComponent(cc.Label);
                label.string = type;
                crg.DataProxy.data.tweenList.push(lib.Tween.to(node, 0.5 + 0.2 * Math.random(), {
                    opacity: 0,
                    x: node.x + 100 - 200 * Math.random(),
                    y: node.y - 100 * Math.random()
                }).call(function () {
                    node.destroy();
                }));
            };
            OperateEvent.prototype.pressOK = function (cfg, type) {
                if (type === void 0) { type = ""; }
                //删除节拍对象
                var monsters = crg.DataProxy.data.monsters;
                for (var i = 0; i < monsters.length; i++) {
                    if (monsters[i].data == cfg) {
                        var monster = monsters[i];
                        monster.destroy();
                        monsters.splice(i, 1);
                        //显示特效
                        var effect = new crg.Effect(crg.ResourceProxy.getResource("pressok"));
                        effect.x = crg.DataProxy.data.player.x;
                        effect.y = crg.DataProxy.data.player.y - 80;
                        crg.DataProxy.data.monsterLayer.addChild(effect);
                        break;
                    }
                }
            };
            return OperateEvent;
        }(crg.GameEvent));
        crg.OperateEvent = OperateEvent;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/gameEvents/GameFinishEvent.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameFinishEvent = /** @class */ (function (_super) {
            __extends(GameFinishEvent, _super);
            function GameFinishEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameFinishEvent.prototype.execute = function () {
                var data = crg.DataProxy.data;
                var list = data.config;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].operate == 9) {
                        if (data.lastTime <= list[i].time && list[i].time < data.time) {
                            crg.mainMediator.sendNotification(crg.Command.IN.GAME_OVER, true);
                        }
                    }
                }
            };
            return GameFinishEvent;
        }(crg.GameEvent));
        crg.GameFinishEvent = GameFinishEvent;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/GameMain.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var GameMain = /** @class */ (function (_super) {
            __extends(GameMain, _super);
            function GameMain() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameMain.prototype.start = function () {
                crg.DataProxy.data.config = crg.ConfigProxy.getLevelConfig(crg.DataProxy.data.level);
                crg.DataProxy.data.configTime = crg.ConfigProxy.getLevelConfigTime(crg.DataProxy.data.config);
                crg.DataProxy.data.progressAll = crg.DataProxy.data.config.getItemsWith("operate", 6).length;
                crg.DataProxy.data.root = this.node;
                this.node.x = -lib.data.system.screen.width / 2;
                this.node.y = -lib.data.system.screen.height / 2;
                this.events = [
                    new crg.GameStartEvent(),
                    new crg.OperateRhythmEvent(),
                    new crg.OperateEvent(),
                    new crg.GameFinishEvent()
                ];
                crg.DataProxy.data.monsterLayer = new cc.Node();
                crg.DataProxy.data.root.addChild(crg.DataProxy.data.monsterLayer);
                crg.DataProxy.data.playerLayer = new cc.Node();
                crg.DataProxy.data.root.addChild(crg.DataProxy.data.playerLayer);
                //添加点击事件
                var node = new cc.Node();
                crg.DataProxy.data.root.addChild(node);
                node.addComponent(cc.Sprite);
                node.scaleX = lib.data.system.screen.width;
                node.scaleY = lib.data.system.screen.height;
                node.opacity = 0;
                var sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(crg.ResourceProxy.getResource("click"));
                node.on(cc.Node.EventType.TOUCH_START, function () {
                    crg.DataProxy.data.clickFlag = true;
                }, this);
            };
            GameMain.prototype.update = function () {
                if (crg.DataProxy.data.gameOver) {
                    return;
                }
                crg.DataProxy.data.lastTime = crg.DataProxy.data.time;
                crg.DataProxy.data.time += lib.CoreTime.lastTimeGap;
                crg.DataProxy.data.currentMovePosition = ~~(16 * crg.ConfigProxy.getConfig("moveSpeed") / 1000);
                crg.DataProxy.data.position += crg.DataProxy.data.currentMovePosition;
                for (var i = 0; i < this.events.length; i++) {
                    this.events[i].execute();
                }
            };
            return GameMain;
        }(cc.Component));
        crg.GameMain = GameMain;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/background/Background.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var Background = /** @class */ (function (_super) {
            __extends(Background, _super);
            function Background() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.bgs = [];
                return _this;
            }
            Background.prototype.start = function () {
                this.bgs.push(this.bg1_3 = new crg.BackgroundContainer(3));
                this.bgs.push(this.bg2_3 = new crg.BackgroundContainer(3));
                this.bgs.push(this.bg1_2 = new crg.BackgroundContainer(2));
                this.bgs.push(this.bg2_2 = new crg.BackgroundContainer(2));
                this.bgs.push(this.bg1_1 = new crg.BackgroundContainer(1));
                this.bgs.push(this.bg2_1 = new crg.BackgroundContainer(1));
                for (var i = 0; i < this.bgs.length; i++) {
                    this.node.addChild(this.bgs[i]);
                }
                this.bg2_1.x = 1334;
                this.bg2_2.x = 1334;
                this.bg2_3.x = 1334;
            };
            Background.prototype.update = function () {
                if (crg.DataProxy.data.gameOver) {
                    return;
                }
                for (var i = 0; i < this.bgs.length; i++) {
                    if (this.bgs[i].layer == 1) {
                        this.bgs[i].x -= crg.DataProxy.data.currentMovePosition;
                    }
                    else if (this.bgs[i].layer == 2) {
                        this.bgs[i].x -= ~~(crg.DataProxy.data.currentMovePosition * 0.5);
                    }
                    if (this.bgs[i].x <= -1334) {
                        this.bgs[i].x += 1334 * 2;
                    }
                }
            };
            return Background;
        }(cc.Component));
        crg.Background = Background;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/background/BackgroundContainer.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var BackgroundContainer = /** @class */ (function (_super) {
            __extends(BackgroundContainer, _super);
            function BackgroundContainer(layer) {
                var _this = _super.call(this) || this;
                _this.layer = layer;
                _this.anchorX = _this.anchorY = 0;
                _this.items = [];
                var list = crg.DataProxy.data.groundData.items;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].layer == layer) {
                        var item = new crg.BackgroundItem(list[i]);
                        _this.items.push(item);
                        _this.addChild(item);
                    }
                }
                return _this;
            }
            return BackgroundContainer;
        }(cc.Node));
        crg.BackgroundContainer = BackgroundContainer;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
//////////view/game/background/BackgroundGround.ts//////////
//////////view/game/background/BackgroundItem.ts//////////
(function (game) {
    var crg;
    (function (crg) {
        var BackgroundItem = /** @class */ (function (_super) {
            __extends(BackgroundItem, _super);
            function BackgroundItem(data) {
                var _this = _super.call(this) || this;
                _this.data = data;
                if (data.url) {
                    _this.image = crg.DisplayFactory.createImage(crg.ResourceProxy.getResource(data.url));
                    _this.addChild(_this.image);
                    if (_this.data.changeType) {
                        _this.data.changeValue.addListener(lib.Event.CHANGE, _this.change, _this);
                        //色相
                        if (_this.data.changeType == 1) {
                            _this.filter = new crg.ColorFilter(_this.image.getComponent(cc.Sprite), 360 * (1 - _this.data.changeValue.value), 0, 0);
                        }
                        //灰度
                        if (_this.data.changeType == 2) {
                            _this.filter = new crg.ColorFilter(_this.image.getComponent(cc.Sprite), 0, -100.0 * (1 - _this.data.changeValue.value), 0);
                        }
                        //渐现
                        if (_this.data.changeType == 3) {
                            _this.addComponent(cc.Mask);
                            _this.anchorX = 0;
                            _this.anchorY = 0;
                            var mask = _this.getComponent(cc.Mask);
                            mask.type = cc.Mask.Type.RECT;
                            _this.width = _this.image.width;
                            _this.height = 0;
                        }
                    }
                }
                return _this;
            }
            BackgroundItem.prototype.change = function () {
                if (this.data.changeType == 1) {
                    crg.DataProxy.data.tweenList.push(lib.Tween.to(this, 0.5, { colorH: (1 - this.data.changeValue.value) }, null, { colorH: (1 - this.data.changeValue.old) }));
                }
                if (this.data.changeType == 2) {
                    crg.DataProxy.data.tweenList.push(lib.Tween.to(this, 0.5, { colorS: (1 - this.data.changeValue.value) }, null, { colorS: (1 - this.data.changeValue.old) }));
                }
                if (this.data.changeType == 3) {
                    crg.DataProxy.data.tweenList.push(lib.Tween.to(this, 2, { height: this.image.height * this.data.changeValue.value }));
                }
            };
            Object.defineProperty(BackgroundItem.prototype, "colorH", {
                set: function (val) {
                    if (this.filter) {
                        this.filter.dispose();
                    }
                    this.filter = new crg.ColorFilter(this.image.getComponent(cc.Sprite), 360 * val, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BackgroundItem.prototype, "colorS", {
                set: function (val) {
                    if (this.filter) {
                        this.filter.dispose();
                    }
                    this.filter = new crg.ColorFilter(this.image.getComponent(cc.Sprite), 0, -100.0 * val, 0);
                },
                enumerable: true,
                configurable: true
            });
            return BackgroundItem;
        }(cc.Node));
        crg.BackgroundItem = BackgroundItem;
    })(crg = game.crg || (game.crg = {}));
})(game || (game = {}));
window.game = game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameCode.js.map
        