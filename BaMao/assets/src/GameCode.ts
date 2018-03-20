//////////Module common//////////
//////////controller/Command.ts//////////
namespace game {
    export namespace common {

        /**
         * 整个游戏的进行顺序为:
         * INIT_MODULE(await) -> CHANGE_SCENE("login") -> 登录中 -> REGISTER_NET -> ENTER_GAME_LOADING(await) -> CHANGE_SCENE("hall"|"game")
         */
        export class Command {

            /**
             * 初始化模块
             * @type {string}
             */
            public static INIT_MODULE: string = "init_module";

            /**
             * 切换场景
             * @type {string}
             */
            public static CHANGE_SCENE: string = "change_scene";

            /**
             * 进入游戏加载，一般有进度条显示
             * @type {string}
             */
            public static ENTER_GAME_LOADING: string = "enter_game_loading";

            /**
             * 显示界面
             * @type {string}
             */
            public static OPEN_VIEW: string = "open_view";

            /**
             * 关闭界面
             * @type {string}
             */
            public static CLOSE_VIEW: string = "close_view";


            /**
             * 注册网络监听
             * @type {string}
             */
            public static REGISTER_NET: string = "register_net";

            /**
             * AI 控制
             * @type {string}
             */
            public static AI_CONTROLLER: string = "ai_controller";
        }
    }
}

//////////controller/notification/OpenViewNB.ts//////////
namespace game {
    export namespace common {
        export class OpenViewNB {

            private _name: string;
            private _data: null;

            constructor(name: string, data: any = null) {
                this._name = name;
                this._data = data;
            }

            public get name(): string {
                return this._name;
            }

            public get data(): any {
                return this._data;
            }
        }
    }
}

//////////controller/notification/CloseViewNB.ts//////////
namespace game {
    export namespace common {
        export class CloseViewNB {

            private _name: string;

            constructor(name: string) {
                this._name = name;
            }

            public get name(): string {
                return this._name;
            }
        }
    }
}

//////////controller/notification/InitModuleNB.ts//////////
namespace game {
    export namespace common {
        export class InitModuleNB {

            private _rootView: cc.Node;
            private _progress: any;

            constructor(rootView: cc.Node,progress: any) {
                this._rootView = rootView;
                this._progress = progress;
            }

            public get rootView(): cc.Node {
                return this._rootView;
            }

            public get progress(): any {
                return this._progress;
            }
        }
    }
}

//////////controller/notification/ChangeSceneNB.ts//////////
namespace game {
    export namespace common {

        export class ChangeSceneNB {

            private _sceneName: string;
            private _data: any;

            constructor(sceneName: string, data: any = null) {
                this._sceneName = sceneName;
                this._data = data;
            }

            public get sceneName(): string {
                return this._sceneName;
            }

            public get data():any {
                return this._data;
            }
        }
    }
}



//////////Module ui//////////
//////////model/proxy/SettingProxy.ts//////////
namespace game {
    export namespace ui {
        export class SettingProxy {

            // public static designWidth = 960;
            //
            // public static designHeight = 750;
            //
            // /**
            //  * 如果是高度适配，则
            //  * @type {number}
            //  */
            // public static fixHeightWidth = 0;
            //
            // public static fixHeightHeight = 750;
        }
    }
}

//////////view/Panel.ts//////////
namespace game {
    export namespace ui {

        export class Panel extends cc.Component {

            private _scaleMode: number;

            constructor(scaleMode: number = 1) {
                super();
                this._scaleMode = scaleMode;
            }

            public get scaleMode(): number {
                return this._scaleMode;
            }

            public set scaleMode(val: number) {
                this._scaleMode = ~~val;
            }

            onLoad() {
                var size = lib.data.system.screen.value;
                var width = this.node.width || SettingProxy.designWidth;
                var height = this.node.height || SettingProxy.designHeight;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    } else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            }
        }
    }
}



//////////Module layer//////////
//////////view/LayerModule.ts//////////
namespace game {
    export namespace layer {

        export class LayerModule extends mvc.Module {

            private rootNode: cc.Node;

            constructor() {
                super(LayerModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.INIT_MODULE:
                        var data: common.InitModuleNB = note.body;
                        this.rootNode = new cc.Node();
                        // this.rootNode.x = cc.director.getVisibleSize().width / 2;
                        // this.rootNode.y = cc.director.getVisibleSize().height / 2;
                        data.rootView.addChild(this.rootNode);
                        this.rootNode.addChild(new GameLayer());
                        this.rootNode.addChild(new MainUILayer());
                        this.rootNode.addChild(new PopLayer());
                        this.rootNode.addChild(new TopLayer());
                        break;
                }
            }

            static NAME: string = "layer";
        }
    }
}

//////////view/GameLayer.ts//////////
namespace game {
    export namespace layer {
        export class GameLayer extends cc.Node {

            constructor() {
                super();
                GameLayer.instance = this;
            }

            private static instance: GameLayer;

            public static show(node: cc.Node): void {
                if (node.parent != GameLayer.instance) {
                    GameLayer.instance.addChild(node);
                }
            }
        }
    }
}

//////////view/MainUILayer.ts//////////
namespace game {
    export namespace layer {
        export class MainUILayer extends cc.Node {

            constructor() {
                super();
                MainUILayer.instance = this;
            }

            private static instance: MainUILayer;

            public static show(node: cc.Node): void {
                if (node.parent != MainUILayer.instance) {
                    MainUILayer.instance.addChild(node);
                }
            }
        }
    }
}

//////////view/PopLayer.ts//////////
namespace game {
    export namespace layer {
        export class PopLayer extends cc.Node {

        }
    }
}

//////////view/TopLayer.ts//////////
namespace game {
    export namespace layer {
        export class TopLayer extends cc.Node {
            
        }
    }
}



//////////Module startup//////////
//////////AppFacade.ts//////////
namespace game {

    /**
     * 游戏数据
     * @type {{}}
     */
    export var data = {};

    /**
     * 游戏网络 VBWebsocket
     * @type {null}
     */
    export var net: any = null;

    // export var net = null;

    export namespace startup {

        export var ModuleName = "startup";
        export var ModuleNone = "";

        export class AppFacade extends mvc.Facade {

            protected initializeController() {
                super.initializeController();

                cc.director.setDisplayStats(false);

                //注册启动程序
                this.registerCommand(Command.IN.START_UP, StartupCommand);
            }

            /**
             * 启动
             */
            public start(rootView: cc.Node): void {
                //发送启动消息
                this.sendNotification(Command.IN.START_UP, new common.InitModuleNB(rootView, lib.DataManager.createData("ProgressData")));
            }

            public static NAME: string = "gameApp";

            private static instance: AppFacade;

            /**
             * 启动
             */
            public static start(rootView: cc.Node): void {
                if (!AppFacade.instance) {
                    AppFacade.instance = new AppFacade(AppFacade.NAME);
                    AppFacade.instance.start(rootView);
                }
            }
        }
    }
}

//////////controller/Command.ts//////////
namespace game {
    export namespace startup {
        export class Command {
            /**
             * 内部消息
             */
            public static IN = {
                START_UP: "startup.start_up" //启动
            };

            /**
             * 希望外部处理的消息
             */
            public static OUT = {
            };

            /**
             * 处理模块外部的消息
             */
            public static INTERFACE = {
                EXIT: "exit" //退出模块，清除所有模块相关的东西
            };
        }
    }
}

//////////controller/startup/StartupCommand.ts//////////
namespace game {
    export namespace startup {

        export class StartupCommand extends mvc.MacroCommand {

            protected initializeMacroCommand(): void {
                this.addSubCommand(InitModuleCommand);
            }
        }
    }
}

//////////controller/startup/InitModuleCommand.ts//////////
namespace game {
    export namespace startup {

        export class InitModuleCommand extends mvc.SimpleCommand {

            public async execute(note: mvc.Notification) {
                this.facade.registerModule(new layer.LayerModule());
                this.facade.registerModule(new bamaoGame.BaMaoGameModule());
                this.facade.registerModule(new bamaoStart.BaMaoStartModule());
                this.facade.registerModule(new bamaoResult.BaMaoResultModule());
                this.facade.registerModule(new loading.LoadingModule());
                this.facade.registerModule(new musicTest.MusicTestModule());
                this.facade.registerModule(new runGame.RunGameModule());
                this.facade.registerModule(new motion.MotionModule());
                this.facade.registerModule(new crg.CRGModule());
                // this.facade.registerModule(new login.LoginModule());
                // this.facade.registerModule(new jumpGame.JumpGameModule());

                //获取模块初始化的进度
                var progress = note.body.progress;
                progress.current = progress.max = 1;
                //调用模块初始化消息
                this.sendNotification(common.Command.INIT_MODULE, note.body);
                var max = 1;
                if (progress.percent != max) { //如果模块初始化已完成
                    await progress.percentValue.valueEqual(max);
                }
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("crg"));
            }
        }
    }
}

//////////controller/restart/RestartCommand.ts//////////
namespace game {
    export namespace startup {

        import AppFacade = game.startup.AppFacade;

        export class RestartCommand extends mvc.MacroCommand {

            protected initializeMacroCommand(): void {
                //清理 mvc
                this.addSubCommand(ClearMVCCommand);
                //清理数据模块
                this.addSubCommand(ClearDataCommand);
                //清理 lib 库内容
                this.addSubCommand(ClearLibCommand);

                //启动
                AppFacade.start();
            }
        }
    }
}

//////////controller/restart/ClearMVCCommand.ts//////////
namespace game {
    export namespace startup {
        export class ClearMVCCommand extends mvc.SimpleCommand {

            public execute(note: mvc.Notification): void {
                mvc.Facade.remove(AppFacade.NAME);
                mvc.Model.remove(AppFacade.NAME);
                mvc.View.remove(AppFacade.NAME);
                mvc.Controller.remove(AppFacade.NAME);
            }
        }
    }
}

//////////controller/restart/ClearDataCommand.ts//////////
namespace game {
    export namespace startup {
        export class ClearDataCommand extends mvc.SimpleCommand {

            public execute(note: mvc.Notification): void {
                game.data = null;
            }
        }
    }
}

//////////controller/restart/ClearLibCommand.ts//////////
namespace game {
    export namespace startup {
        export class ClearLibCommand extends mvc.SimpleCommand {

            public execute(note: mvc.Notification): void {

            }
        }
    }
}



//////////Module loading//////////
//////////view/LoadingModule.ts//////////
namespace game {
    export namespace loading {
        export class LoadingModule extends mvc.Module {

            constructor() {
                super(LoadingModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
                        break;
                }
            }

            public static NAME = "loading";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace loading {
        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private data: any;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new LoadingView();
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        this.data = note.body.data;
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if(this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                            (this.viewComponent as LoadingView).text = note.body.data.text;
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "loading.MainMediator";
        }
    }
}

//////////view/LoadingView.ts//////////
namespace game {
    export namespace loading {
        export class LoadingView extends cc.Node {

            private label: cc.Label;

            constructor() {
                super();
                this.addComponent(cc.Label);
                this.label = this.getComponent(cc.Label);
                this.label.fontSize = 12;
                this.color = new cc.Color(255, 255, 255);
            }

            public set text(val: string) {
                this.label.string = val;
            }
        }
    }
}



//////////Module bamaoStart//////////
//////////proxy/Resource.ts//////////
namespace game {
    export namespace bamaoStart {
        export class Resource {

            public static instance: Resource;

            loadList: any[] = [
                {name: "ui", data: game.prefab.ui1, url: "resources/baMaoStart/res/baMaoUI.prefab"},
                {name: "bgm", url: "resources/baMaoStart/res/bgm/startbgm.wav"},
                {name: "bg0", url: "resources/baMaoStart/res/textures/bg0.png"},
                {name: "bg1", url: "resources/baMaoStart/res/textures/bg1.png"},
            ];

            public static async loadResources() {
                if (!Resource.instance) {
                    Resource.instance = new Resource();
                }
                let list: any[] = Resource.instance.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;

                    async function load() {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if(res.data) {
                            index++;
                            load();
                        } else {
                            if (res.type == "URLLoader") {
                                var loader = new lib.URLLoader(res.url);
                                var result = await loader.load();
                                res.data = result.data;
                                index++;
                                load();
                            } else {
                                cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                    res.data = data;
                                    index++;
                                    load();
                                });
                            }
                        }
                    }

                    load();
                }.bind(this));
            }

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.instance.loadList.length; i++) {
                    if (Resource.instance.loadList[i].name == name) {
                        return Resource.instance.loadList[i].data;
                    }
                }
                return null;
            }
        }
    }
}

//////////view/BaMaoStartModule.ts//////////
namespace game {
    export namespace bamaoStart {
        export class BaMaoStartModule extends mvc.Module {

            constructor() {
                super(BaMaoStartModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
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
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == BaMaoStartModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                    case common.Command.REGISTER_NET: //注册网络模块
                        // for (let i = 0; i < this.receiveNetProxies.length; i++) {
                        //     this.receiveNetProxies[i].registerNet(game.net);
                        // }
                        break;
                }
            }

            public static NAME = "bamaoStart";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace bamaoStart {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private change: any;

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                this.viewComponent = cc.instantiate(Resource.getResource("ui"));
                //获取开始按钮
                let startBtn = this.viewComponent.getChildByName("startBtn");
                startBtn.on(cc.Node.EventType.TOUCH_END, this.onClickStart, this);

                //获取背景
                let background = this.viewComponent.getChildByName("bg");
                background.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame();
                let index = 0;
                this.change = setInterval(function () {
                    background.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("bg" + index));
                    index++;
                    index = index % 2;
                }, 250);

                //播放背景音乐
                this.bgm = cc.audioEngine.play(Resource.getResource("bgm"), false, 1);
            }

            onClickStart(): void {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoGame"));
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
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
                        break;
                }
            }

            public static NAME = "bamaoStart.MainMediator";
        }
    }
}



//////////Module bamaoGame//////////
//////////proxy/Resource.ts//////////
namespace game {
    export namespace bamaoGame {
        export class Resource {
            private static loadList: any[] = [
                {name: "allConfig", url: "resources/baMaoGame/res/config/All.csv"},
                {name: "levelConfig", url: "resources/baMaoGame/res/config/Level.csv"},
                {name: "bgm", url: "resources/baMaoGame/res/bgm/game1.wav"},
                // {name: "readygo", url: "resources/baMaoGame/res/music/readygo.mp3"},
                {name: "rhythmTip", url: "resources/baMaoGame/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/baMaoGame/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/baMaoGame/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/baMaoGame/res/music/perfect.wav"},
                {name: "monster", url: "resources/baMaoGame/res/textures/monster.png"},
                {name: "monsterHand", url: "resources/baMaoGame/res/textures/monsterHand.png"},
                {name: "doctorHand", url: "resources/baMaoGame/res/textures/doctorHand.png"},
                {name: "cut", url: "resources/baMaoGame/res/textures/cut.png"},
                {name: "band", url: "resources/baMaoGame/res/textures/band.png"},


                {name: "back1", url: "resources/baMaoGame/res/textures/background/back1.png"},
                {name: "back2", url: "resources/baMaoGame/res/textures/background/back2.png"},
                {name: "back3", url: "resources/baMaoGame/res/textures/background/back3.png"},

                {name: "role1", url: "resources/baMaoGame/res/textures/role/role1.png"},
                {name: "role2", url: "resources/baMaoGame/res/textures/role/role2.png"},
                {name: "role3", url: "resources/baMaoGame/res/textures/role/role3.png"},

                {name: "facePerfect", url: "resources/baMaoGame/res/textures/face/perfect.png"},
                {name: "faceGood", url: "resources/baMaoGame/res/textures/face/good.png"},
                {name: "faceMiss", url: "resources/baMaoGame/res/textures/face/miss.png"},
                {name: "faceNormal", url: "resources/baMaoGame/res/textures/face/normal.png"},

                {name: "faceResult1", url: "resources/baMaoGame/res/textures/face/result1.png"},
                {name: "faceResult2", url: "resources/baMaoGame/res/textures/face/result2.png"},
                {name: "faceResult3", url: "resources/baMaoGame/res/textures/face/result3.png"},

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

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
                let list: any[] = Resource.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;
                    let load = function () {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if (res.resourceType == "effect") {
                            if (!res.loadIndex) {
                                res.pictures = [];
                                res.loadIndex = 0;
                                res.loadLength = res.nameEnd - res.nameBegin + 1;
                                res.data = {
                                    pictures: [],
                                    frameTime: res.frameTime
                                };
                            } else {
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                    load();
                                    return;
                                }
                            }
                            let count = res.loadIndex + res.nameBegin;
                            let name = "" + count;
                            while (name.length < res.nameCount) {
                                name = "0" + name;
                            }
                            cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e: any, data: any) {
                                res.data.pictures.push(data);
                                res.loadIndex++;
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                }
                                load();
                            });
                        } else {
                            cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                res.data = data;
                                index++;
                                load();
                            });
                        }
                    }
                    load();
                }.bind(this));
            }
        }
    }
}

//////////proxy/RoundProxy.ts//////////
namespace game {
    export namespace bamaoGame {
        export class RoundProxy {

            public node: cc.Node;

            //combo数
            public combo: number = 0;
            //分数
            public score: number = 0;
            //perfect
            public perfect: number = 0;
            //good
            public good: number = 0;
            //miss
            public miss: number = 0;
            //bgm
            public bgm: any = null;
            //tweenList
            public tweenList: lib.Tween[] = [];

            //背景
            public background:cc.Node;
            //怪物图片
            public monster: cc.Node;
            //表情
            public face:cc.Node;
            //提示的手
            public monsterHand: cc.Node;
            //医生的手
            public doctorHand: cc.Node;

            //伤口位置
            public cutPoses: any[];

            /**
             * 处理事件
             */
            public events: GameEvent[] = [];

            /**
             * 上一次的运行时间
             */
            public lastTime: number = 0;

            /**
             * 在提示前多久开始播放手的动画
             * @type {number}
             */
            public tipTime: number = ConfigProxy.getConfig("tipHandTime");
            /**
             * 在操作前多久开始播放提示特效
             * @type {number}
             */
            public operateTipTime: number = ConfigProxy.getConfig("tipEffectTime");

            /**
             * 是否有点击
             * @type {boolean}
             */
            public clickFlag: boolean = false;

            /**
             * 记录某个拍子是否操作过了
             * @type {any[]}
             */
            public operate: any[] = [];

            /**
             * 操作层
             */
            public operateNode: cc.Node;

            /**
             * combo 文字对象
             */
            public comboNode: cc.Node;

            /**
             * 游戏当前运行时间
             */
            public time: number = 0;

            public lastHandX: number;
            public lastHandY: number;
            public lastHandTime: number;
            public handX: number;
            public handY: number;

            //表情切换时间
            public faceChangeTime = ConfigProxy.getConfig("faceChangeTime");

            /**
             * 游戏阶段
             * tip 演示阶段
             * operate 操作阶段
             * @type {string}
             */
            public gameMonment: string = "";

            /**
             * perfect 判定时间
             * @type {number}
             */
            public perfectTime: number = ConfigProxy.getConfig("perfectTime");
            /**
             * good 判定时间
             * @type {number}
             */
            public goodTime: number = ConfigProxy.getConfig("goodTime");
            /**
             * miss 判定时间
             * @type {number}
             */
            public missTime: number = ConfigProxy.getConfig("missTime");

            public config: any[] = [ //拍子
                {
                    operate: 1, //怪物进场
                    time: 0,
                    cut: 4
                },
                {
                    operate: 2, //提示轮开始
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
                    operate: 4, //提示轮结束
                    time: 5000
                },
                {
                    operate: 5, //操作轮开始
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
                    operate: 7, //操作轮结束
                    time: 13000
                },
                {
                    operate: 8, //怪物退场
                    time: 14000
                },

                //第二关
                {
                    operate: 1, //怪物进场
                    time: 15000,
                    cut: 3
                },
                {
                    operate: 2, //提示轮开始
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
                    operate: 4, //提示轮结束
                    time: 19000
                },
                {
                    operate: 5, //操作轮开始
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
                    operate: 7, //操作轮结束
                    time: 25000
                },
                {
                    operate: 8, //怪物退场
                    time: 26000
                },


                {
                    operate: 9, //游戏结束
                    time: 27000
                }
            ];

        }
    }
}

//////////proxy/ConfigProxy.ts//////////
namespace game {
    export namespace bamaoGame {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(Resource.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(Resource.getResource("levelConfig"));
                }
            }

            private static allConfig: lib.ArrayValue;

            public static getConfig(name: string): any {
                let item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            }

            private static levelConfig: lib.ArrayValue = new lib.ArrayValue();

            private static decodeConfig(content: string): lib.ArrayValue {
                let res: lib.ArrayValue = new lib.ArrayValue();
                let list: any = content.split("\n");
                let keys = [];
                for (let i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    let itemList: any[] = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    } else {
                        let item: any = {};
                        for (let j = 0; j < itemList.length; j++) {
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        res.push(item);
                    }
                }
                return res;
            }

            public static getGameConfig(): any[] {
                let cfg: any[] = [];
                let time = 0;
                let len = ConfigProxy.getConfig("gameOverLevel");
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                //临时加入游戏结束
                cfg.push({
                    operate: 9, //游戏结束
                    time: time
                });
                return cfg;
            }

            public static getRandomLevel(startTime: number): any[] {
                let levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                let list = [];
                let time = startTime;

                //怪物进场
                list.push({
                    operate: 1, //怪物进场
                    time: time,
                    cut: 0
                });

                //提示轮开始
                time += ConfigProxy.getConfig("monsterEnterTime");
                list.push({
                    operate: 2, //提示轮开始
                    time: time,
                });

                //计算提示拍子
                time += ConfigProxy.getConfig("tipStartTime");
                let count = 0;
                let start = list.length;
                for (let i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 3,
                            time: time,
                            index: list.length - start
                        });
                        (list[0] as any).cut++;
                    } else {
                        count++;
                    }
                }

                //提示轮结束
                time += ConfigProxy.getConfig("tipEndTime");
                list.push({
                    operate: 4, //提示轮结束
                    time: time
                });

                //操作轮开始
                time += ConfigProxy.getConfig("tipGapTime");
                list.push({
                    operate: 5, //操作轮开始
                    time: time
                });

                //计算操作拍子
                time += ConfigProxy.getConfig("operateSrartTime");
                count = 0;
                start = list.length;
                for (let i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start
                        });
                    } else {
                        count++;
                    }
                }

                //操作轮结束
                time += ConfigProxy.getConfig("operateEndTime");
                list.push({
                    operate: 7, //操作轮结束
                    time: time
                });

                //怪物退场
                time += ConfigProxy.getConfig("monsterExitTime");
                list.push({
                    operate: 8, //操作轮结束
                    time: time
                });
                return list;
            }

            private static getLevelConfigTime(cfg: any): number {
                for (let i = 0; i < cfg.length; i++) {
                    if (cfg[i].operate == 8) {
                        return cfg[i].time;
                    }
                }
                return 0;
            }
        }
    }
}

//////////proxy/GameMoment.ts//////////
namespace game {
    export namespace bamaoGame {
        export class GameMoment {

            public static NONE:string = "";

            /**
             * 提示阶段
             * @type {string}
             */
            public static TIP:string = "tip";

            /**
             * 操作阶段
             * @type {string}
             */
            public static OPERATE:string = "operate";
        }
    }
}

//////////view/BaMaoGameModule.ts//////////
namespace game {
    export namespace bamaoGame {
        export class BaMaoGameModule extends mvc.Module {

            constructor() {
                super(BaMaoGameModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
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
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == BaMaoGameModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                    case common.Command.REGISTER_NET: //注册网络模块
                        // for (let i = 0; i < this.receiveNetProxies.length; i++) {
                        //     this.receiveNetProxies[i].registerNet(game.net);
                        // }
                        break;
                }
            }

            public static NAME = "bamaoGame";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace bamaoGame {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private init() {
                this.viewComponent = new cc.Node();
                this.viewComponent.addComponent(MainComponent);

                ConfigProxy.init();
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.init();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        layer.MainUILayer.show(this.viewComponent);
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        break;
                }
            }

            public static NAME = "bamaoGame.MainMediator";
        }
    }
}

//////////view/MainComponent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class MainComponent extends cc.Graphics {

            scaleMode: number = 0;
            proxy: RoundProxy;
            events: GameEvent[];

            start() {
                this.proxy = new RoundProxy();
                this.proxy.config = ConfigProxy.getGameConfig();
                this.proxy.node = this.node;
                this.proxy.events = [
                    new GameStartEvent(),
                    new GameFinishEvent(),
                    new MonsterEnterEvent(),
                    new MonsterExitEvent(),
                    new OperateRoundStartEvent(),
                    new OperateRhythmEvent(),
                    new OperateRoundFinishEvent(),
                    new TipRoundStartEvent(),
                    new TipRhythmEvent(),
                    new TipRoundFinishEvent(),
                    new OperateEvent()
                ];
                this.schedule(this.update, 0.016, 10000000000);
            }

            lastTime = 0;

            update() {
                let time = (new Date()).getTime();
                let timeGap = time - this.lastTime;
                if (timeGap > 30) {
                    timeGap = 30;
                }
                this.proxy.time += timeGap;
                this.lastTime = time;
                let events = this.proxy.events;
                for (let i = 0; i < events.length; i++) {
                    events[i].execute(this.proxy);
                }
                this.proxy.lastTime = this.proxy.time;
            }

            onLoad() {
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
                    } else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    } else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            }
        }
    }
}

//////////view/Effect.ts//////////
namespace game {
    export namespace bamaoGame {

        /**
         * 序列帧特效
         */
        export class Effect extends cc.Node {

            frameTime: number;
            pictures: cc.Texture2D[];
            length: number;
            loop: any;
            frame: number;

            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            constructor(config: any) {
                super();
                this.frameTime = config.frameTime;
                this.pictures = config.pictures;
                this.length = this.pictures.length;
                this.loop = !!config.loop;
                this.frame = 0;

                this.update = this.update.bind(this);

                this.addComponent(cc.Sprite);
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(this.update, this.frameTime / 1000, 10000000000);

                this.update();
            }

            update() {
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            }

            destroy(): boolean {
                this.getComponent(cc.Sprite).unschedule(this.update);
                super.destroy();
                return true;
            }
        }
    }
}

//////////view/gameEvents/GameEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class GameEvent {

            constructor() {
            }

            execute(proxy: RoundProxy) {
                
            }
        }
    }
}

//////////view/gameEvents/GameStartEvent.ts//////////
namespace game {
    export namespace bamaoGame {

        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        export class GameStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {
                    proxy.bgm = cc.audioEngine.play(Resource.getResource("bgm"), true, 0.1);
                }
            }
        }
    }
}

//////////view/gameEvents/GameFinishEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class GameFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
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
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW,
                                new common.CloseViewNB(MainMediator.NAME));
                            mainMediator.sendNotification(common.Command.CHANGE_SCENE,
                                new common.ChangeSceneNB("bamaoResult", {
                                    score: proxy.score,
                                    perfect: proxy.perfect,
                                    good: proxy.good,
                                    miss: proxy.miss
                                }));
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/OperateRhythmEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class OperateRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let findNext = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (proxy.lastTime <= list[i].time - proxy.operateTipTime && list[i].time - proxy.operateTipTime < proxy.time) {
                            //加特效
                            let effect = new Effect(Resource.getResource("tip"));
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
                                    proxy.tweenList.push(lib.Tween.to(proxy.doctorHand, 0.4, {y: -480}, lib.Ease.CUBIC_EASE_OUT).update(function () {
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
                    } else if (list[i].operate != 6 && list[i].time > proxy.time) {
                        break;
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/OperateRoundFinishEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class OperateRoundFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 7) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {

                            proxy.gameMonment = GameMoment.NONE;

                            //怪物手退场
                            if (proxy.doctorHand) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.doctorHand, 0.2, {y: -600}).call(
                                        function () {
                                            this.proxy.doctorHand.destroy();
                                            this.proxy.doctorHand = null;
                                        }.bind({
                                            proxy: proxy
                                        })
                                    )
                                )

                                if (proxy.operateNode) {
                                    proxy.operateNode = null;
                                }
                                if(proxy.comboNode) {
                                    proxy.comboNode.destroy();
                                    proxy.comboNode = null;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/OperateRoundStartEvent.ts//////////
namespace game {
    export namespace bamaoGame {

        /**
         * 一轮游戏
         */
        export class OperateRoundStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 5) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {

                            proxy.gameMonment = GameMoment.OPERATE;

                            //医生手进场
                            let doctorHand = new cc.Node();
                            doctorHand.addComponent(cc.Sprite);
                            let sprite = doctorHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("doctorHand"));
                            proxy.node.addChild(doctorHand);
                            doctorHand.y = -600;
                            proxy.lastHandTime = proxy.time;
                            proxy.lastHandX = doctorHand.x;
                            proxy.lastHandY = doctorHand.y;

                            //添加绷带
                            let band = new cc.Node();
                            band.addComponent(cc.Sprite);
                            let bandSprite = band.getComponent(cc.Sprite);
                            bandSprite.spriteFrame = new cc.SpriteFrame();
                            bandSprite.spriteFrame.setTexture(Resource.getResource("band"));
                            doctorHand.addChild(band);
                            // band.y = 50;

                            proxy.doctorHand = doctorHand;
                            proxy.tweenList.push(
                                lib.Tween.to(proxy.doctorHand, 0.2, {y: -480})
                            );

                            //添加操作层
                            if (!proxy.operateNode) {
                                let operateNode = new cc.Node();
                                proxy.operateNode = operateNode;
                                proxy.monster.addChild(operateNode);
                            }

                            //添加combo文字
                            if (!proxy.comboNode) {
                                let comboNode = new cc.Node();
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
            }
        }
    }
}

//////////view/gameEvents/TipRhythmEvent.ts//////////
namespace game {
    export namespace bamaoGame {

        export class TipRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 3) {
                        if (proxy.lastTime <= list[i].time - proxy.tipTime && list[i].time - proxy.tipTime < proxy.time) {
                            //手移动
                            proxy.tweenList.push(
                                lib.Tween.to(proxy.monsterHand, proxy.tipTime / 1000, {
                                    x: proxy.cutPoses[list[i].index].x - 248/2 + 270 / 4,
                                    y: proxy.cutPoses[list[i].index].y - 160/2 + 300 / 4
                                }).call(function () {
                                    //播放提示音效
                                    cc.audioEngine.play(Resource.getResource("rhythmTip"), false, 1);
                                })
                            );
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/TipRoundFinishEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class TipRoundFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 4) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手退场
                            if (proxy.monsterHand) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.monsterHand, 0.2, {x: -300}).call(
                                        function () {
                                            this.proxy.monsterHand.destroy();
                                            this.proxy.monsterHand = null;
                                        }.bind({
                                            proxy: proxy
                                        })
                                    )
                                )
                            }

                            proxy.gameMonment = GameMoment.NONE;
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/TipRoundStartEvent.ts//////////
namespace game {
    export namespace bamaoGame {

        /**
         * 一轮操作开始
         */
        export class TipRoundStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 2) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手进场
                            let monsterHand = new cc.Node();
                            monsterHand.addComponent(cc.Sprite);
                            let sprite = monsterHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("monsterHand"));
                            proxy.node.addChild(monsterHand);
                            monsterHand.x = -320;
                            proxy.monsterHand = monsterHand;

                            proxy.gameMonment = GameMoment.TIP;
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/MonsterEnterEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class MonsterEnterEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 1) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //背景
                            if (!proxy.background) {
                                let background = new cc.Node();
                                background.addComponent(cc.Sprite);
                                let bksprite = background.getComponent(cc.Sprite);
                                bksprite.spriteFrame = new cc.SpriteFrame();
                                bksprite.spriteFrame.setTexture(Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                                proxy.node.addChild(background);
                                proxy.background = background;
                            } else {
                                let bksprite = proxy.background.getComponent(cc.Sprite);
                                bksprite.spriteFrame.setTexture(Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                            }

                            //怪物进场
                            let monster = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            let sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("role" + (1 + ~~(3 * Math.random()))));
                            proxy.node.addChild(monster);
                            proxy.monster = monster;

                            monster.on(cc.Node.EventType.TOUCH_START, function () {
                                proxy.clickFlag = true;
                            }, this);

                            //添加表情
                            let face = new cc.Node();
                            face.addComponent(cc.Sprite);
                            face.y = 210;
                            face.x = -5;
                            let faceSprite = face.getComponent(cc.Sprite);
                            faceSprite.spriteFrame = new cc.SpriteFrame();;
                            faceSprite.spriteFrame.setTexture(Resource.getResource("faceNormal"));
                            proxy.monster.addChild(face);
                            proxy.face = face;

                            //生成伤口
                            let poses = [];
                            for (let px = 0; px < 4; px++) {
                                for (let py = 0; py < 4; py++) {
                                    poses.push({
                                        x: px * 75 + 3 - 6 * Math.random(),
                                        y: py * 75 + 3 - 6 * Math.random()
                                    });
                                }
                            }
                            let cuts = [];
                            for (let c = 0; c < list[i].cut; c++) {
                                let x = Math.random() * 300 - 150 - 200 + 127 + 100;
                                let y = Math.random() * 300 - 150 - 200 - 300 + 180 + 150;
                                //测试随机位置
                                let pos: any = poses.splice(~~(poses.length * Math.random()), 1)[0];
                                x = pos.x - 150 - 200 + 127 + 100;
                                y = pos.y - 150 - 200 - 300 + 180 + 150;
                                let cutImage = new cc.Node();
                                cutImage.addComponent(cc.Sprite);
                                cutImage.x = x;
                                cutImage.y = y;
                                cutImage.rotation = 360 * Math.random();
                                monster.addChild(cutImage);
                                let cutSprite = cutImage.getComponent(cc.Sprite);
                                cutSprite.spriteFrame = new cc.SpriteFrame();
                                cutSprite.spriteFrame.setTexture(Resource.getResource("cut"));
                                cuts.push({x: x, y: y});
                            }
                            proxy.cutPoses = cuts;

                            //加上怪物进场动画
                            monster.x = 640;
                            proxy.tweenList.push(
                                lib.Tween.to(monster, 0.3, {x: 0}, lib.Ease.SINE_EASE_IN_OUT)
                            );
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/MonsterExitEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class MonsterExitEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 8) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物退场动画
                            if (proxy.monster) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.monster, 0.2, {x: -640}, lib.Ease.SINE_EASE_IN_OUT).call(
                                        function () {
                                            proxy.monster.destroy();
                                            proxy.monster = null;
                                        }
                                    )
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/OperateEvent.ts//////////
namespace game {
    export namespace bamaoGame {
        export class OperateEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let find = false;
                if (proxy.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[i] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) { //perfect
                                    this.showOperate(proxy, "Perfect", proxy.cutPoses[list[i].index]);
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) { //good
                                    this.showOperate(proxy, "Good", proxy.cutPoses[list[i].index]);
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) { //good
                                    this.showOperate(proxy, "Miss", proxy.cutPoses[list[i].index]);
                                }
                                find = true;
                                proxy.operate[i] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find && proxy.gameMonment == GameMoment.OPERATE) {
                        this.showOperate(proxy, "OutMiss", {x: proxy.handX, y: proxy.handY});
                    }
                    proxy.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[i] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss", proxy.cutPoses[list[i].index]);
                            proxy.operate[i] = true;
                        }
                    }
                }
            }

            showOperate(proxy: RoundProxy, type: string, pos: any) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                cc.audioEngine.play(Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                } else {
                    let node = new cc.Node();
                    node.addComponent(cc.Sprite);
                    node.rotation = 360 * Math.random();
                    let sprite = node.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame();
                    sprite.spriteFrame.setTexture(Resource.getResource("band"));
                    if (type == "Perfect") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.score += 100;
                        proxy.perfect++;
                    } else if (type == "Good") {
                        node.x = pos.x + 20 - 40 * Math.random();
                        node.y = pos.y + 20 - 40 * Math.random();
                        proxy.score += 80;
                        proxy.good++;
                    } else if (type == "Miss") {
                        let x = pos.x + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        let y = pos.y + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        if (Math.abs(x - proxy.handX) > 30 || Math.abs(y - proxy.handY) > 30) {
                            x = proxy.handX;
                            y = proxy.handY;
                        }
                        node.x = x;
                        node.y = y;
                        proxy.score += 0;
                        proxy.miss++;
                    } else if (type == "OutMiss") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.miss++;
                    }
                    proxy.operateNode.addChild(node);
                    proxy.tweenList.push(
                        lib.Tween.to(node, 0.15, {scaleX: 1, scaleY: 1, opacity: 255}, null, {
                            scaleX: 1.5,
                            scaleY: 1.5,
                            opacity: 150
                        })
                    );
                }

                //添加文字
                let node2 = new cc.Node();
                node2.addComponent(cc.Label);
                node2.color = new cc.Color(0, 0, 0);
                node2.y = 200;
                let label = node2.getComponent(cc.Label);
                label.string = type == "AutoMiss" || type == "OutMiss" ? "Miss" : type;
                proxy.operateNode.addChild(node2);
                proxy.tweenList.push(lib.Tween.to(node2, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 50
                }, null, {opacity: 255}).call(function () {
                    node2.destroy();
                }));

                //表情
                if (type == "Perfect") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("facePerfect"));
                } else if (type == "Good") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceGood"));
                } else if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceMiss"));
                }
                //一定时间后切换回正常表情
                setTimeout(function () {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceNormal"));
                }, proxy.faceChangeTime);

                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                    proxy.comboNode.getComponent(cc.Label).string = "";
                } else {
                    proxy.combo++;
                    proxy.comboNode.getComponent(cc.Label).string = "combo" + proxy.combo;
                    proxy.tweenList.push(lib.Tween.to(proxy.comboNode, 0.2, {
                        opacity: 255,
                    }, null, {
                        opacity: 150
                    }));
                }

            }
        }
    }
}



//////////Module bamaoResult//////////
//////////proxy/Resource.ts//////////
namespace game {
    export namespace bamaoResult {
        export class Resource {

            private static loadList: any[] = [
                {name: "ui", url: "baMaoResult/res/ui", type: "URLLoader"},
            ];

            public static async loadResources() {
                let list: any[] = Resource.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;

                    async function load() {
                        if (index >= list.length) {
                            resolve();
                            return;
                        }
                        let res = list[index];
                        if (res.type == "URLLoader") {
                            var loader = new lib.URLLoader(res.url);
                            var result = await loader.load();
                            res.data = result.data;
                            index++;
                            load();
                        } else {
                            cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                res.data = data;
                                index++;
                                load();
                            });
                        }
                    }

                    load();
                }.bind(this));
            }

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }
        }
    }
}

//////////view/BaMaoResultModule.ts//////////
namespace game {
    export namespace bamaoResult {
        export class BaMaoResultModule extends mvc.Module {

            constructor() {
                super(BaMaoResultModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
                        break;
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == BaMaoResultModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME, note.body.data));
                        }
                        break;
                    case common.Command.REGISTER_NET: //注册网络模块
                        break;
                }
            }

            public static NAME = "bamaoResult";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace bamaoResult {
        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private data: any;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                this.viewComponent = cc.instantiate(Resource.getResource("ui"));
                //获取分数
                let scoreTxt = this.viewComponent.getChildByName("scoreTxt");
                scoreTxt.getComponent(cc.Label).string = this.data.score + "";
                //获取perfect
                let perfectTxt = this.viewComponent.getChildByName("perfectTxt");
                perfectTxt.getComponent(cc.Label).string = this.data.perfect + "";
                //获取good
                let goodTxt = this.viewComponent.getChildByName("goodTxt");
                goodTxt.getComponent(cc.Label).string = this.data.good + "";
                //获取miss
                let missTxt = this.viewComponent.getChildByName("missTxt");
                missTxt.getComponent(cc.Label).string = this.data.miss + "";
                //获取返回主界面按钮
                let mainBtn = this.viewComponent.getChildByName("mainBtn");
                mainBtn.on(cc.Node.EventType.TOUCH_END, this.onClickReturnMainMeu, this);
                //获取开始游戏按钮
                let gameBtn = this.viewComponent.getChildByName("gameBtn");
                gameBtn.on(cc.Node.EventType.TOUCH_END, this.onClickStartGame, this);
            }

            private onClickReturnMainMeu() {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoStart"));
            }

            private onClickStartGame() {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoGame"));
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        this.data = note.body.data;
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        layer.MainUILayer.show(this.viewComponent);
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "bamaoResult.MainMediator";
        }
    }
}



//////////Module musicTest//////////
//////////view/MusicTestModule.ts//////////
namespace game {
    export namespace musicTest {
        export class MusicTestModule extends mvc.Module {

            constructor() {
                super(MusicTestModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
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
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == MusicTestModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                }
            }

            public static NAME = "musicTest";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace musicTest {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private change: any;

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                console.log("初始化音乐测试场景");
                this.viewComponent.addComponent(cc.Graphics);
                let gp: cc.Graphics = this.viewComponent.getComponent(cc.Graphics);
                let c = new cc.Color(255, 100, 100);
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
                        audioContext.decodeAudioData(arrayBuffer, function (buffer: any) { //解码成功则调用此函数，参数buffer为解码后得到的结果
                            visualize(audioContext, buffer); //调用_visualize进行下一步处理，此方法在后面定义并实现
                            console.log("gogo")
                        }, function (e: any) { //这个是解码失败会调用的函数
                            console.log("!哎玛，文件解码失败:(");
                        });
                    }
                    else {
                    }
                }
                xhr.send(null);


                function visualize(audioContext: any, buffer: any) {
                    var audioBufferSouceNode = audioContext.createBufferSource(),
                        analyser = audioContext.createAnalyser();
                    //将source与分析器连接
                    audioBufferSouceNode.connect(analyser);
                    //将分析器与destination连接，这样才能形成到达扬声器的通路
                    analyser.connect(audioContext.destination);
                    //将上一步解码得到的buffer数据赋值给source
                    audioBufferSouceNode.buffer = buffer;
                    //播放
                    audioBufferSouceNode.start(0);
                    //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取

                    let last = 0;
                    let lastMax = 0;

                    setInterval(function () {
                        var array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);

                        var meterWidth = 10, //频谱条宽度
                            gap = 2, //频谱条间距
                            capHeight = 2,
                            capStyle = '#fff',
                            meterNum = 800 / (10 + 2), //频谱条数量
                            capYPositionArray = []; //将上一画面各帽头的位置保存到这个数组

                        let max = 0;
                        let sum = 0;
                        let count = 0;
                        for (let i = 0; i < array.length; i++) {
                            if (array[i]) {
                                sum += array[i];
                                count++;
                            }
                            if(array[i] > max) {
                                max = array[i];
                            }
                        }

                        gp.clear();
                        gp.fillRect(0, 0, 20, ~~(sum / count));
                        // console.log(~~(sum/count));
                        let now = ~~(sum / count);
                        if (last && (now - last > 10 || last - now > 10)) {
                            // console.log(now - last > 0? "hi" : "low", last, now);
                        }
                        last = now;

                        if (lastMax && (max - lastMax > 10 || lastMax - max > 10)) {
                            console.log(max - lastMax > 0? "max hi" : "max low", max, lastMax);
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

                let audioContext: any = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();

            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
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
                        break;
                }
            }

            public static NAME = "musicTest.MainMediator";
        }
    }
}



//////////Module runGame//////////
//////////esc/Component.ts//////////
namespace esc {
    export class Component {

        start: Function;
        update: Function;
        onDestroy: Function;
        
    }
}

//////////esc/Entity.ts//////////
namespace esc {
    export class Entity {

        private _id: string;

        $components: Component[] = [];

        constructor(id: string) {
            this._id = id || lib.Help.getuuid();
        }

        public get id(): string {
            return this._id;
        }

        public addComponent(component: Component) {
            this.$components.push(component);
        }

        public removeComponent(component: Component) {

        }

        $update(): void {

        }
    }
}

//////////esc/EntityManager.ts//////////
namespace esc {
    export class EntityManager {

        private static entities: Entity[] = [];

        public static addEntity(entity: Entity): void {
            EntityManager.entities.push(entity);
        }

        public static removeEntity(entity: Entity): void {
            let list = EntityManager.entities;
            for (let i = 0; i < list.length; i++) {
                if (list[i] == entity) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    }
}

//////////esc/System.ts//////////
namespace esc {
    export class System {

        $entities: Entity[] = [];

        update() {

        }

        $addEntity(entity: Entity): void {
            
        }
    }
}

//////////proxy/RoundProxy.ts//////////
namespace game {
    export namespace runGame {
        export class RoundProxy {

            public node: cc.Node;

            //combo数
            public combo: number = 0;
            //分数
            public score: number = 0;
            //perfect
            public perfect: number = 0;
            //good
            public good: number = 0;
            //miss
            public miss: number = 0;
            //bgm
            public bgm: any = null;
            //tweenList
            public tweenList: lib.Tween[] = [];


            /**
             * perfect 判定时间
             * @type {number}
             */
            public perfectTime: number = ConfigProxy.getConfig("perfectTime");
            /**
             * good 判定时间
             * @type {number}
             */
            public goodTime: number = ConfigProxy.getConfig("goodTime");
            /**
             * miss 判定时间
             * @type {number}
             */
            public missTime: number = ConfigProxy.getConfig("missTime");

            //生命值
            public life: number = 100;
            //最大生命值
            public maxLife: number = 100;

            public lifeReduceSecond: number = 1;

            public events: GameEvent[] = [];

            public time: number = 0;
            public lastTime: number = 0;

            public clickFlag: boolean = false;

            public background: BackGround;
            public backgroundX: number = 0;
            public pos: number = 0;

            public player: Effect;

            public monsterNode:cc.Node;
            public monsters:Effect[] = [];

            /**
             * 记录某个拍子是否操作过了
             * @type {any[]}
             */
            public operate: any = {};


            /**
             * 操作层
             */
            public operateNode: cc.Node;

            /**
             * combo 文字对象
             */
            public comboNode: cc.Node;

            /**
             * 每秒移动多少像素
             * @type {number}
             */
            public timeSpeed: number = 300;

            //最大操作配置时间
            public configTime:number;
            public config: any[] = [ //拍子
                {
                    operate: 0,  //游戏开始
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
    }
}

//////////proxy/ConfigProxy.ts//////////
namespace game {
    export namespace runGame {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(Resource.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(Resource.getResource("levelConfig"));

                    //分析 MusicConfig
                    ConfigProxy.musicConfig = ConfigProxy.decodeConfig(Resource.getResource("musicConfig"));
                }
            }

            private static allConfig: lib.ArrayValue;

            public static getConfig(name: string): any {
                let item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            }

            public static musicConfig: lib.ArrayValue;

            private static levelConfig: lib.ArrayValue = new lib.ArrayValue();

            private static decodeConfig(content: string): lib.ArrayValue {
                let res: lib.ArrayValue = new lib.ArrayValue();
                let list: any = content.split("\n");
                let keys = [];
                for (let i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    let itemList: any[] = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    } else {
                        let item: any = {};
                        for (let j = 0; j < itemList.length; j++) {
                            if (j == 0 && !itemList[j]) {
                                item = null;
                                break;
                            }
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        if(item) {
                            res.push(item);
                        }
                    }
                }
                return res;
            }

            public static getGameConfig(): any[] {
                let cfg: any[] = [];
                let time = 0;
                let len = 3;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                //临时加入游戏结束
                cfg.push({
                    operate: 9, //游戏结束
                    time: time
                });
                return cfg;
            }

            public static addGameConfig(oldCfg: any): any[] {
                let time: number = ConfigProxy.getLevelConfigTime(oldCfg);
                for (let i = 0; i < oldCfg.length; i++) {
                    if (oldCfg[i].time < time - 30000) {
                        oldCfg.splice(i, 1);
                    }
                }
                let cfg: any[] = [];
                let len = 3;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                oldCfg = oldCfg.concat(cfg);
                return oldCfg;
            }

            private static getRandomLevel(startTime: number): any[] {
                let levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                let list = [];
                let time = startTime;

                //计算提示拍子
                time += ConfigProxy.getConfig("levelTimeGap");
                let count = 0;
                let start = list.length;
                for (let i = 1; i < 10000; i++) {
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
                        (list[0] as any).cut++;
                    } else {
                        count++;
                    }
                }

                return list;
            }

            public static getLevelConfigTime(cfg: any): number {
                let time = 0;
                for (let i = 0; i < cfg.length; i++) {
                    if (cfg[i].time > time) {
                        time = cfg[i].time;
                    }
                }
                return time;
            }
        }
    }
}

//////////proxy/GameMoment.ts//////////
namespace game {
    export namespace runGame {
        export class GameMoment {

            public static NONE:string = "";

            /**
             * 提示阶段
             * @type {string}
             */
            public static TIP:string = "tip";

            /**
             * 操作阶段
             * @type {string}
             */
            public static OPERATE:string = "operate";
        }
    }
}

//////////proxy/Resource.ts//////////
namespace game {
    export namespace runGame {
        export class Resource {
            public static configLoadComplete() {
                ConfigProxy.init();
                let list: any = ConfigProxy.musicConfig;
                for (let i = 0; i < list.length; i++) {
                    let item = {name: "rhythm" + list[i].name, url: "resources/runGame/res/rhythm/" + list[i].url};
                    Resource.loadList.push(item);
                }
            }

            private static initList: any[] = [
                {name: "allConfig", url: "resources/runGame/res/config/All.csv"},
                {name: "levelConfig", url: "resources/runGame/res/config/Level.csv"},
                {
                    name: "musicConfig",
                    url: "resources/runGame/res/config/Music.csv",
                    execute: Resource.configLoadComplete
                },
                {name: "bgm", url: "resources/runGame/res/bgm/game1.wav"},
                // {name: "readygo", url: "resources/runGame/res/music/readygo.mp3"},
                {name: "rhythmTip", url: "resources/runGame/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/runGame/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/runGame/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/runGame/res/music/perfect.wav"},
                {name: "monster", url: "resources/runGame/res/texture/monster.png"},
                {name: "monsterHand", url: "resources/runGame/res/texture/monsterHand.png"},
                {name: "doctorHand", url: "resources/runGame/res/texture/doctorHand.png"},
                {name: "cut", url: "resources/runGame/res/texture/cut.png"},
                {name: "band", url: "resources/runGame/res/texture/band.png"},


                {name: "back1", url: "resources/runGame/res/texture/background/back1.png"},
                {name: "back2", url: "resources/runGame/res/texture/background/back2.png"},
                {name: "back3", url: "resources/runGame/res/texture/background/back3.png"},

                {name: "role1", url: "resources/runGame/res/texture/role/role1.png"},
                {name: "role2", url: "resources/runGame/res/texture/role/role2.png"},
                {name: "role3", url: "resources/runGame/res/texture/role/role3.png"},

                {name: "facePerfect", url: "resources/runGame/res/texture/face/perfect.png"},
                {name: "faceGood", url: "resources/runGame/res/texture/face/good.png"},
                {name: "faceMiss", url: "resources/runGame/res/texture/face/miss.png"},
                {name: "faceNormal", url: "resources/runGame/res/texture/face/normal.png"},

                {name: "faceResult1", url: "resources/runGame/res/texture/face/result1.png"},
                {name: "faceResult2", url: "resources/runGame/res/texture/face/result2.png"},
                {name: "faceResult3", url: "resources/runGame/res/texture/face/result3.png"},

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

                {name: "bg1", url: "resources/runGame/res/textures/bg/bg1.png"},
                {name: "bg2", url: "resources/runGame/res/textures/bg/bg2.png"},
                {name: "bg3", url: "resources/runGame/res/textures/bg/bg3.png"},
                {name: "bg4", url: "resources/runGame/res/textures/bg/bg4.png"},

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
            private static loadList: any[];

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
                if (!Resource.loadList) {
                    Resource.loadList = Resource.initList.concat();
                }
                let list: any[] = Resource.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;
                    let load = function () {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if (res.resourceType == "effect") {
                            if (!res.loadIndex) {
                                res.pictures = [];
                                res.loadIndex = 0;
                                res.loadLength = res.nameEnd - res.nameBegin + 1;
                                res.data = {
                                    pictures: [],
                                    frameTime: res.frameTime
                                };
                            } else {
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                    load();
                                    return;
                                }
                            }
                            let count = res.loadIndex + res.nameBegin;
                            let name = "" + count;
                            while (name.length < res.nameCount) {
                                name = "0" + name;
                            }
                            cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e: any, data: any) {
                                res.data.pictures.push(data);
                                res.loadIndex++;
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                }
                                load();
                            });
                        } else {
                            cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                res.data = data;
                                if (res.execute) {
                                    res.execute();
                                }
                                index++;
                                load();
                            });
                        }
                    }
                    load();
                }.bind(this));
            }
        }
    }
}

//////////controller/Command.ts//////////
namespace game {
    export namespace runGame {
        export class Command {

            public static IN = {
                LIFE_CHANGE: "runGame.life_change", //生命值改变
            }
        }
    }
}

//////////controller/LifeChangeCommand.ts//////////
namespace game {
    export namespace runGame {
        export class LifeChangeCommand extends mvc.SimpleCommand {

            execute(notification: mvc.Notification): void {
                
            }
        }
    }
}

//////////view/utils/Effect.ts//////////
namespace game {
    export namespace runGame {

        /**
         * 序列帧特效
         */
        export class Effect extends cc.Node {

            frameTime: number;
            pictures: cc.Texture2D[];
            length: number;
            loop: any;
            frame: number;

            data:any;

            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            constructor(config: any, loop: boolean = null) {
                super();
                this.frameTime = config.frameTime;
                this.pictures = config.pictures;
                this.length = this.pictures.length;
                this.loop = loop != null ? loop : !!config.loop;
                this.frame = 0;

                this.update = this.update.bind(this);

                this.addComponent(cc.Sprite);
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(this.update, this.frameTime / 1000, 10000000000);

                this.update();
            }

            update() {
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            }

            destroy(): boolean {
                this.getComponent(cc.Sprite).unschedule(this.update);
                super.destroy();
                return true;
            }
        }
    }
}

//////////view/utils/DisplayFactory.ts//////////
namespace game {
    export namespace runGame {
        export class DisplayFactory {

            public static createImage(texture2d: cc.Texture2D): cc.Node {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                node.anchorY = 0;
                let sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(texture2d);
                return node;
            }
        }
    }
}

//////////view/RunGameModule.ts//////////
namespace game {
    export namespace runGame {
        export class RunGameModule extends mvc.Module {

            constructor() {
                super(RunGameModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        // var initData: common.InitModuleNB = note.body;
                        //
                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
                        //
                        // //初始化 model
                        // //1. 加载网络监听对象
                        // this.receiveNetProxies.push(new NoticeCProxy());
                        // this.receiveNetProxies.push(new TestRecvCProxy());
                        // //2. 初始化 proxy
                        //

                        //初始化 controller
                        this.facade.registerCommand(Command.IN.LIFE_CHANGE, LifeChangeCommand);
                        break;
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == RunGameModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                }
            }

            public static NAME = "runGame";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace runGame {

        import Game = cc.Game;
        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private change: any;
            private ui:GameUI;

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                let node = new cc.Node();
                node.addComponent(MainComponent);
                this.viewComponent.addChild(node);
                this.viewComponent.addChild(this.ui = new GameUI());

            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.GameLayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
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
                        break;
                }
            }

            public static NAME = "runGame.MainMediator";
        }
    }
}

//////////view/MainComponent.ts//////////
namespace game {
    export namespace runGame {
        export class MainComponent extends cc.Graphics {

            scaleMode: number = 0;
            proxy: RoundProxy;
            events: GameEvent[];

            constructor() {
                super();
            }

            start() {
                this.proxy = new RoundProxy();
                this.proxy.config = ConfigProxy.getGameConfig();
                this.proxy.configTime = ConfigProxy.getLevelConfigTime(this.proxy.config);
                this.proxy.node = this.node;
                this.proxy.events = [
                    new GameBackGroundEvent(),
                    new GameStartEvent(),
                    new OperateRhythmEvent(),
                    new OperateEvent(),
                ];
                this.schedule(this.update, 0.016, 10000000000);
            }

            lastTime = 0;

            update() {
                let time = (new Date()).getTime();
                let timeGap = time - this.lastTime;
                if (timeGap > 30) {
                    timeGap = 30;
                }
                this.proxy.time += timeGap;
                this.proxy.pos = this.proxy.time * this.proxy.timeSpeed / 1000;
                this.lastTime = time;

                if( this.proxy.configTime - 10000 >= this.proxy.lastTime && this.proxy.configTime - 10000 < this.proxy.time) {
                    this.proxy.config = ConfigProxy.addGameConfig(this.proxy.config);
                    this.proxy.configTime = ConfigProxy.getLevelConfigTime(this.proxy.config);
                    console.log(this.proxy.configTime,this.proxy.config.length);
                }
                let events = this.proxy.events;
                for (let i = 0; i < events.length; i++) {
                    events[i].execute(this.proxy);
                }
                this.proxy.lastTime = this.proxy.time;
            }

            onLoad() {
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
                    } else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    } else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            }
        }
    }
}

//////////view/ui/GameUI.ts//////////
namespace game {
    export namespace runGame {
        import Graphics = cc.Graphics;

        export class GameUI extends cc.Node {

            private life: Graphics;

            constructor() {
                super();

                let node = new cc.Node();
                node.addComponent(cc.Graphics);
                this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                let graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(100, 100, 100);
                graphics.fillRect(0, 0, 620, 20);

                node = new cc.Node();
                node.addComponent(cc.Graphics);
                this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(225, 225 ,225);
                this.life = graphics;
                this.percent = 0.5;
            }

            public set percent(val: number) {
                if(val < 0) val = 0;
                if(val > 1) val = 1;
                this.life.clear();
                this.life.fillRect(0, 0, 620 * val, 20);
            }
        }
    }
}

//////////view/game/BackGround.ts//////////
namespace game {
    export namespace runGame {
        export class BackGround extends cc.Node {

            private bgWidth = 1027;
            private bgHeight = 412;
            private bgScale = 1;

            private bgs: cc.Node[];

            private proxy: RoundProxy;

            constructor(proxy: RoundProxy) {
                super();
                this.proxy = proxy;
                this.bgs = [
                    this.getBackgroundNode("bg1"),
                    this.getBackgroundNode("bg2"),
                    this.getBackgroundNode("bg3"),
                    this.getBackgroundNode("bg4")
                ];
                this.bgScale = (ui.SettingProxy.designHeight / 412);
                for (let i = 0; i < this.bgs.length; i++) {
                    this.addChild(this.bgs[i]);
                    this.bgs[i].scaleX = this.bgs[i].scaleY = this.bgScale;
                }
            }

            public update(pos: number): void {
                for (let i = 0; i < this.bgs.length; i++) {
                    this.bgs[i].x = lib.data.system.screen.value.width;
                }
                let index = (~~(pos / (this.bgWidth * this.bgScale))) % this.bgs.length;
                pos = pos % (this.bgWidth * this.bgScale);
                this.bgs[index].x = -pos - ui.SettingProxy.designWidth / 2;
                while (pos + lib.data.system.screen.value.width > this.bgWidth * this.bgScale) {
                    index++;
                    index = index % this.bgs.length;
                    pos -= this.bgWidth * this.bgScale;
                    this.bgs[index].x = -pos - ui.SettingProxy.designWidth / 2;
                }
            }

            getBackgroundNode(name: string): cc.Node {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;

                let sprite = node.getComponent(cc.Sprite);

                console.log("设置滤镜?");
                this.setShader(sprite, "");

                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(Resource.getResource(name));

                node.on(cc.Node.EventType.TOUCH_START, function () {
                    this.proxy.clickFlag = true;
                }, this);
                return node;
            }

            private shaderPrograms: any = {};

            setShader(sprite: cc.Sprite, shaderName: string) {
                var glProgram = this.shaderPrograms[shaderName];
                if (!glProgram) {
                    glProgram = new cc.GLProgram();
                    var vert = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;
varying vec4 v_fragmentColor; 
varying vec2 v_texCoord; 
void main() 
{ 
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = a_color; 
    v_texCoord = a_texCoord; 
}
`;
                    var frag = `
#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
void main()
{
    vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
    gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
    gl_FragColor.w = c.w;
}
`;
                    if (cc.sys.isNative) {
                        glProgram.initWithString(vert, frag);
                    } else {
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
            }
        }
    }
}

//////////view/gameEvents/GameEvent.ts//////////
namespace game {
    export namespace runGame {
        export class GameEvent {

            constructor() {
            }

            execute(proxy: RoundProxy) {
                
            }
        }
    }
}

//////////view/gameEvents/GameStartEvent.ts//////////
namespace game {
    export namespace runGame {

        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        export class GameStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {

                    proxy.monsterNode = new cc.Node();
                    proxy.node.addChild(proxy.monsterNode);


                    proxy.player = new Effect(Resource.getResource("playerRun"), true);
                    proxy.player.y = -380;
                    proxy.player.x = -200;
                    proxy.node.addChild(proxy.player);

                    //添加操作层
                    if (!proxy.operateNode) {
                        let operateNode = new cc.Node();
                        proxy.operateNode = operateNode;
                        proxy.node.addChild(operateNode);
                    }

                    //添加combo文字
                    if (!proxy.comboNode) {
                        let comboNode = new cc.Node();
                        comboNode.y = 400;
                        comboNode.color = new cc.Color(0, 0, 0);
                        comboNode.addComponent(cc.Label);
                        comboNode.getComponent(cc.Label).string = proxy.combo ? "combo" + proxy.combo : "";
                        proxy.node.addChild(comboNode);
                        proxy.comboNode = comboNode;
                    }

                    proxy.bgm = cc.audioEngine.play(Resource.getResource("bgm"), true, 0.05);
                }
            }
        }
    }
}

//////////view/gameEvents/OperateRhythmEvent.ts//////////
namespace game {
    export namespace runGame {
        export class OperateRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let findNext = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if ((list[i].time - 2000) >= proxy.lastTime && (list[i].time - 2000) < proxy.time) {
                            // console.log("出现节奏!")
                            let monster = new Effect(Resource.getResource("monster" + ((~~(3 * Math.random())) + 1)), true);
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
                for (let i = 0; i < proxy.monsters.length; i++) {
                    let last = proxy.monsters[i].x;
                    proxy.monsters[i].x -= (proxy.time - proxy.lastTime) * proxy.timeSpeed / 1000;
                    if (last >= 600 - 320 && proxy.monsters[i].x < 600 - 320) {
                        lib.Tween.to(proxy.monsters[i], 0.3, {opacity: 255, scaleX: 1, scaleY: 1});
                        cc.audioEngine.play(Resource.getResource("rhythm" + proxy.monsters[i].data.music), false, 1);
                    }
                }
            }
        }
    }
}

//////////view/gameEvents/OperateEvent.ts//////////
namespace game {
    export namespace runGame {
        export class OperateEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let find = false;
                if (proxy.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[list[i].time] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) { //perfect
                                    this.showOperate(proxy, "Perfect");
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) { //good
                                    this.showOperate(proxy, "Good");
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) { //good
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
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[list[i].time] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss");
                            proxy.operate[list[i].time] = true;
                        }
                    }
                }
            }

            showOperate(proxy: RoundProxy, type: string) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                if(!(type == "MISS" || type == "AutoMiss" || type == "OutMiss"))
                cc.audioEngine.play(Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                } else {
                    if (type == "Perfect") {
                        proxy.score += 100;
                        proxy.perfect++;
                    } else if (type == "Good") {
                        proxy.score += 80;
                        proxy.good++;
                    } else if (type == "Miss") {
                        proxy.score += 0;
                        proxy.miss++;
                    } else if (type == "OutMiss") {
                        proxy.miss++;
                    }
                }

                //添加文字
                let node2 = new cc.Node();
                node2.addComponent(cc.Label);
                node2.color = new cc.Color(0, 0, 0);
                node2.y = 200;
                let label = node2.getComponent(cc.Label);
                label.string = type == "AutoMiss" || type == "OutMiss" ? "Miss" : type;
                proxy.operateNode.addChild(node2);
                proxy.tweenList.push(lib.Tween.to(node2, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 50
                }, null, {opacity: 255}).call(function () {
                    node2.destroy();
                }));


                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                    proxy.comboNode.getComponent(cc.Label).string = "";
                } else {
                    proxy.combo++;
                    proxy.comboNode.getComponent(cc.Label).string = "combo" + proxy.combo;
                    proxy.tweenList.push(lib.Tween.to(proxy.comboNode, 0.2, {
                        opacity: 255,
                    }, null, {
                        opacity: 150
                    }));
                }

            }
        }
    }
}

//////////view/gameEVents/GameBackGroundEvent.ts//////////
namespace game {
    export namespace runGame {
        export class GameBackGroundEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {
                    proxy.background = new BackGround(proxy);
                    proxy.node.addChild(proxy.background);
                }
                if (proxy.background) {
                    proxy.background.update(proxy.pos);
                }
            }
        }
    }
}



//////////Module motion//////////
//////////view/MotionModule.ts//////////
namespace game {
    export namespace motion {

        export class MotionModule extends mvc.Module {

            private receiveNetProxies: IReceiveProxy[] = [];

            constructor() {
                super(MotionModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块
                        var initData: common.InitModuleNB = note.body;

                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
                        break;
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == MotionModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                    case common.Command.REGISTER_NET: //注册网络模块
                        for (let i = 0; i < this.receiveNetProxies.length; i++) {
                            this.receiveNetProxies[i].registerNet(game.net);
                        }
                        break;
                }
            }

            public static NAME: string = "motion";
        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace motion {
        export class MainMediator extends mvc.Mediator {

            private waitingView: cc.Node;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                this.viewComponent = new MainView();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        layer.MainUILayer.show(this.viewComponent);
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                        }
                        break;
                }
            }

            public static NAME = "motion.MainMediator";
        }
    }
}

//////////view/MainView.ts//////////
namespace game {
    export namespace motion {
        export class MainView extends cc.Node {

            private time: number;
            private bg1: cc.Node;
            private bg2: cc.Node;
            private rect1: cc.Node;
            private _rect1Size: number;
            private _rect1Rot: number;
            private _rect1Alpha: number;
            private rect2: cc.Node;
            private _rect2Size: number;
            private _rect2Rot: number;
            private _rect2Alpha: number;

            constructor() {
                super();

                //绘制背景
                this.addComponent(cc.Graphics);
                let gp = this.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0x31223b >> 16, 0x31223b >> 8 & 0xFF, 0x31223b & 0xFF);
                gp.fillRect(-320, -480, 640, 960);

                this.bg1 = new cc.Node();
                this.addChild(this.bg1);
                this.bg1.addComponent(cc.Graphics);
                gp = this.bg1.getComponent(cc.Graphics);
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

                this.bg2 = new cc.Node();
                this.addChild(this.bg2);
                this.bg2.addComponent(cc.Graphics);
                gp = this.bg2.getComponent(cc.Graphics);
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
                this.bg2.x = -1280;

                this.rect1 = new cc.Node();
                this.addChild(this.rect1);
                this.rect1.addComponent(cc.Graphics);
                gp = this.rect1.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(255, 255, 255);

                this.rect2 = new cc.Node();
                this.addChild(this.rect2);
                this.rect2.addComponent(cc.Graphics);
                gp = this.rect2.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF);

                this._rect1Size = 0;
                this._rect1Rot = 0;
                this._rect1Alpha = 0;


                let __ = this;
                setTimeout(function () {
                    setInterval(this.update.bind(this), 0.016);
                    lib.Tween.to(__, 0.5, {rect1Size: 600}, lib.Ease.CUBIC_EASE_OUT).call(
                        function () {
                            setTimeout(function () {
                                lib.Tween.to(__, 0.5, {rect1Size: 300}, lib.Ease.BACK_EASE_OUT);
                                lib.Tween.to(__, 0.5, {rect1Rot: 225}, lib.Ease.BACK_EASE_OUT);
                            }, 30);
                        }
                    );
                    lib.Tween.to(__, 0.5, {rect1Rot: 135}, lib.Ease.CUBIC_EASE_OUT);
                    lib.Tween.to(__, 0.5, {rect1Alpha: 255}, lib.Ease.CUBIC_EASE_OUT, {rect1Alpha: 0});

                    setTimeout(function () {
                        __._rect2Size = 0;
                        __._rect2Rot = 0;
                        __._rect2Alpha = 0;
                        lib.Tween.to(__, 0.5, {rect2Size: 600}, lib.Ease.CUBIC_EASE_OUT).call(
                            function () {
                                setTimeout(function () {
                                    lib.Tween.to(__, 0.5, {rect2Size: 400}, lib.Ease.BACK_EASE_OUT);
                                    // lib.Tween.to(__, 0.5, {rect2Rot: 45}, lib.Ease.BACK_EASE_OUT);
                                }, 30);
                            }
                        );
                        lib.Tween.to(__, 0.5, {rect2Rot: 45}, lib.Ease.CUBIC_EASE_OUT);
                        lib.Tween.to(__, 0.5, {rect2Alpha: 255}, lib.Ease.CUBIC_EASE_OUT, {rect1Alpha: 0});
                    }, 530);
                }.bind(this), 200);
            }

            public set rect1Size(val: number) {
                this._rect1Size = val;
                let gp = this.rect1.getComponent(cc.Graphics);
                gp.clear();
                gp.strokeColor = new cc.Color(255, 255, 255, this._rect1Alpha);
                gp.rect(-val / 2, -val / 2, val, val);
                gp.stroke();
            }

            public get rect1Size(): number {
                return this._rect1Size;
            }

            public set rect1Alpha(val: number) {
                this._rect1Alpha = val;
            }

            public get rect1Alpha(): number {
                return this._rect1Alpha;
            }

            public set rect1Rot(val: number) {
                this._rect1Rot = val;
                this.rect1.rotation = val;
            }

            public get rect1Rot(): number {
                return this._rect1Rot;
            }


            public set rect2Size(val: number) {
                this._rect2Size = val;
                let gp = this.rect2.getComponent(cc.Graphics);
                gp.clear();
                gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF, this._rect2Alpha);
                gp.rect(-val / 2, -val / 2, val, val);
                gp.stroke();
            }

            public get rect2Size(): number {
                return this._rect2Size;
            }

            public set rect2Alpha(val: number) {
                this._rect2Alpha = val;
            }

            public get rect2Alpha(): number {
                return this._rect2Alpha;
            }

            public set rect2Rot(val: number) {
                this._rect2Rot = val;
                this.rect2.rotation = val;
            }

            public get rect2Rot(): number {
                return this._rect2Rot;
            }

            update() {
                this.bg1.x += 0.15;
                if (this.bg1.x >= 1280 + 640) {
                    this.bg1.x -= 1280 + 640;
                }
                this.bg2.x += 0.3;
                if (this.bg2.x >= 2560) {
                    this.bg2.x -= 2560;
                }
            }
        }
    }
}



//////////Module crg//////////
//////////model/proxy/ResourceProxy.ts//////////
namespace game {
    export namespace crg {
        export class ResourceProxy {

            public static configLoadComplete() {
                ConfigProxy.init();
                let list: any = ConfigProxy.musicConfig;
                for (let i = 0; i < list.length; i++) {
                    let item = {name: "rhythm" + list[i].name, url: "resources/crg/res/rhythm/" + list[i].url};
                    ResourceProxy.loadList.push(item);
                }
            }

            private static initList: any[] = [
                {name: "bgm", url: "resources/crg/res/bgm/game1.wav"},
                {name: "rhythmTip", url: "resources/runGame/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/runGame/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/runGame/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/runGame/res/music/perfect.wav"},

                {name: "allConfig", url: "resources/crg/res/config/All.csv"},
                {name: "levelConfig", url: "resources/crg/res/config/Level.csv"},
                {
                    name: "musicConfig",
                    url: "resources/crg/res/config/Music.csv",
                    execute: ResourceProxy.configLoadComplete
                },

                {name: "click", url: "resources/crg/res/textures/ui/click.png"},

                {name: "ground", url: "resources/crg/res/textures/bg/ground.png"},
                {name: "ground1", url: "resources/crg/res/textures/bg/ground1.png"},
                {name: "ground2", url: "resources/crg/res/textures/bg/ground2.png"},
                {name: "ground3", url: "resources/crg/res/textures/bg/ground3.png"},
                {name: "cloud1", url: "resources/crg/res/textures/bg/cloud1.png"},
                {name: "cloud2", url: "resources/crg/res/textures/bg/cloud2.png"},
                {name: "tree1", url: "resources/crg/res/textures/bg/tree1.png"},
                {name: "tree2", url: "resources/crg/res/textures/bg/tree2.png"},
                {name: "tree3", url: "resources/crg/res/textures/bg/tree3.png"},
                {name: "tree4", url: "resources/crg/res/textures/bg/tree4.png"},
                {name: "tree5", url: "resources/crg/res/textures/bg/tree5.png"},
                {name: "tree6", url: "resources/crg/res/textures/bg/tree6.png"},
                {name: "tree7", url: "resources/crg/res/textures/bg/tree7.png"},
                {name: "bg1", url: "resources/crg/res/textures/bg/bg1.png"},
                {name: "bg2", url: "resources/crg/res/textures/bg/bg2.png"},
                {name: "bg3", url: "resources/crg/res/textures/bg/bg3.png"},
                {name: "bg4", url: "resources/crg/res/textures/bg/bg4.png"},
                {name: "effect", url: "resources/crg/res/textures/bg/effect.png"},
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
                {name: "monster1", url: "resources/crg/res/textures/enemy/rank1.png"},
                {name: "monster2", url: "resources/crg/res/textures/enemy/rank2.png"},
                {name: "monster3", url: "resources/crg/res/textures/enemy/rank3.png"},
                {name: "monster4", url: "resources/crg/res/textures/enemy/rank4.png"},
                {name: "monster5", url: "resources/crg/res/textures/enemy/rank5.png"},
                {name: "monster6", url: "resources/crg/res/textures/enemy/rank6.png"},
                {name: "monsterStar", url: "resources/crg/res/textures/enemy/star2.png"},
            ];

            private static loadList: any[];

            public static getResource(name: string): any {
                for (let i = 0; i < ResourceProxy.loadList.length; i++) {
                    if (ResourceProxy.loadList[i].name == name) {
                        return ResourceProxy.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
                if (!ResourceProxy.loadList) {
                    ResourceProxy.loadList = ResourceProxy.initList.concat();
                }
                let list: any[] = ResourceProxy.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;
                    let load = function () {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if (res.resourceType == "effect") {
                            if (!res.loadIndex) {
                                res.pictures = [];
                                res.loadIndex = 0;
                                res.loadLength = res.nameEnd - res.nameBegin + 1;
                                res.data = {
                                    pictures: []
                                };
                                if (res.properties) {
                                    for (let key in res.properties) {
                                        res.data[key] = res.properties[key];
                                    }
                                }
                            } else {
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                    load();
                                    return;
                                }
                            }
                            let count = res.loadIndex + res.nameBegin;
                            let name = "" + count;
                            while (name.length < res.nameCount) {
                                name = "0" + name;
                            }
                            cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e: any, data: any) {
                                res.data.pictures.push(data);
                                res.loadIndex++;
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                }
                                load();
                            });
                        } else {
                            cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                res.data = data;
                                if (res.execute) {
                                    res.execute();
                                }
                                index++;
                                load();
                            });
                        }
                    }
                    load();
                }.bind(this));
            }
        }
    }
}

//////////model/proxy/ConfigProxy.ts//////////
namespace game {
    export namespace crg {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("levelConfig"));

                    //分析 MusicConfig
                    ConfigProxy.musicConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("musicConfig"));
                }
            }

            private static allConfig: lib.ArrayValue;

            public static getConfig(name: string): any {
                let item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            }

            public static musicConfig: lib.ArrayValue;

            private static levelConfig: lib.ArrayValue = new lib.ArrayValue();

            private static decodeConfig(content: string): lib.ArrayValue {
                let res: lib.ArrayValue = new lib.ArrayValue();
                let list: any = content.split("\n");
                let keys = [];
                for (let i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    let itemList: any[] = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    } else {
                        let item: any = {};
                        for (let j = 0; j < itemList.length; j++) {
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
            }

            public static getGameConfig(): any[] {
                let cfg: any[] = [];
                let time = ConfigProxy.getConfig("gameStartTime");
                let len = 10;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg);
                }
                // //临时加入游戏结束
                // cfg.push({
                //     operate: 9, //游戏结束
                //     time: time
                // });
                return cfg;
            }

            public static addGameConfig(oldCfg: any): any[] {
                let time: number = ConfigProxy.getLevelConfigTime(oldCfg);
                for (let i = 0; i < oldCfg.length; i++) {
                    if (oldCfg[i].time < time - 30000) {
                        oldCfg.splice(i, 1);
                    }
                }
                let cfg: any[] = [];
                let len = 10;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg);
                }
                oldCfg = oldCfg.concat(cfg);
                return oldCfg;
            }

            private static getRandomLevel(startTime: number): any[] {
                let levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                let list = [];
                let time = startTime;

                //计算提示拍子
                time += ConfigProxy.getConfig("levelTimeGap");
                let count = 0;
                let start = list.length;
                for (let i = 1; i < 10000; i++) {
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
                        (list[0] as any).cut++;
                    } else {
                        count++;
                    }
                }

                return list;
            }

            public static getLevelConfigTime(cfg: any): number {
                let time = 0;
                for (let i = 0; i < cfg.length; i++) {
                    if (cfg[i].time > time) {
                        time = cfg[i].time;
                    }
                }
                return time;
            }
        }
    }
}

//////////model/proxy/DataProxy.ts//////////
namespace game {
    export namespace crg {
        export class DataProxy {

            public static data:GameData;
        }
    }
}

//////////model/vo/GameData.ts//////////
namespace game {
    export namespace crg {
        export class GameData {

            /**
             * 移动的位置
             * @type {number}
             */
            public position: number = 0;

            /**
             * 当前帧改变距离
             * @type {number}
             */
            public currentMovePosition: number = 0;

            /**
             * 移动的时间
             * @type {number}
             */
            public time: number = 0;

            /**
             * 上一次移动的时间
             * @type {number}
             */
            public lastTime: number = 0;

            /**
             * 背景数据
             * @type {game.crg.BackgroundData}
             */
            public groundData: BackgroundData = new BackgroundData();

            //显示相关的对象
            //根对象
            public root: cc.Node;

            //怪物层
            public monsterLayer:cc.Node;

            public playerLayer:cc.Node;

            //角色
            public player: Effect;

            //怪物
            public monsters: any[] = [];

            //动画
            public tweenList:lib.Tween[] = [];

            //点击
            public clickFlag:boolean = false;

            //记录是否操作过
            public operate:any = {};
            //记录怪兽是否出现过
            public monsterShow:any = {};

            //combo数
            public combo: number = 0;
            //分数
            public score: number = 0;
            //perfect
            public perfect: number = 0;
            //good
            public good: number = 0;
            //miss
            public miss: number = 0;

            //背景音乐
            public bgm:any;

            //记录配置最大时间
            public configTime:number;
            public config: any[] = [ //拍子
                {
                    id: 0,
                    operate: 6,
                    time: 3000,
                    index: 0,
                    event:3
                },
                {
                    id: 1,
                    operate: 6,
                    time: 4000,
                    index: 1,
                    event:3
                },
                {
                    id: 2,
                    operate: 6,
                    time: 5000,
                    index: 2,
                    event:3
                },
                {
                    id: 3,
                    operate: 6,
                    time: 6000,
                    index: 3,
                    event:3
                },

                //第二关
                {
                    id: 4,
                    operate: 6,
                    time: 8000,
                    index: 0,
                    event:3
                },
                {
                    id: 5,
                    operate: 6,
                    time: 9000,
                    index: 2,
                    event:3
                }
            ];
        }
    }
}

//////////model/vo/BackgroundData.ts//////////
namespace game {
    export namespace crg {
        export class BackgroundData {

            public items: BackgroundItemData[] = [
                new BackgroundItemData("bg1", "bg1", 3, 2, 0.1),
                new BackgroundItemData("bg2", "bg2", 3, 2, 0.1),
                new BackgroundItemData("bg3", "bg3", 3, 2, 0.1),
                new BackgroundItemData("bg4", "bg4", 3, 2, 0.1),

                new BackgroundItemData("tree1", "tree1", 2, 3, 0.4),
                new BackgroundItemData("tree2", "tree2", 2, 3, 0.4),
                new BackgroundItemData("tree3", "tree3", 2, 3, 0.4),
                new BackgroundItemData("tree4", "tree4", 2, 3, 0.4),
                new BackgroundItemData("tree5", "tree5", 2, 3, 0.4),
                new BackgroundItemData("tree6", "tree6", 2, 3, 0.4),
                new BackgroundItemData("tree7", "tree7", 2, 3, 0.4),

                new BackgroundItemData("gd1", "ground1", 1, 2, 0.1),
                new BackgroundItemData("gd2", "ground2", 1, 2, 0.1),
                new BackgroundItemData("gd3", "ground3", 1, 2, 0.1),
                new BackgroundItemData("cd1", "cloud1", 1, 3, 0.5),
                new BackgroundItemData("cd2", "cloud2", 1, 3, 0.5),
            ];
        }
    }
}

//////////model/vo/BackgroundItemData.ts//////////
namespace game {
    export namespace crg {
        export class BackgroundItemData {
            //id
            public id: string;

            public url: string;

            /**
             * 层次，1.近景 2.中景 3.远景
             */
            public layer: number;

            /**
             * 变化类型
             */
            public changeType: number;

            /**
             * 变化率
             */
            public changeSpeed: number;

            /**
             * 变化值
             */
            public changeValue: lib.NumberValue = new lib.NumberValue();

            constructor(id: string, url: string, layer: number, changeType: number = 0, changeSpeed: number = 0) {
                this.id = id;
                this.url = url;
                this.layer = layer;
                this.changeType = changeType;
                this.changeSpeed = changeSpeed;
            }

            public isChangeComplete(): boolean {
                if (this.changeType == 0) return true;
                return this.changeValue.value < 1 ? false : true;
            }
        }
    }
}

//////////controller/Command.ts//////////
namespace game {
    export namespace crg {
        export class Command {
            /**
             * 内部消息
             */
            public static IN = {
                OPERATE: "operate", //操作
                SHOW_COMBO: "show_combo", //显示连击
                SHOW_OPERATE_RESULT: "show_operate_result", //显示操作结果
            };

            /**
             * 希望外部处理的消息
             */
            public static OUT = {};
        }
    }
}

//////////controller/OperateCommand.ts//////////
namespace game {
    export namespace crg {
        export class OperateCommand extends mvc.SimpleCommand {

            execute(note: mvc.Notification) {
                let proxy = DataProxy.data;
                let type: string = note.body.operateType;
                let data = note.body.data;

                //播放音效
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    if (type == "Miss" || type == "OutMiss") {
                        cc.audioEngine.play(ResourceProxy.getResource("rhythmMiss"), false, 1);
                    }
                } else {
                    cc.audioEngine.play(ResourceProxy.getResource("rhythm" + data.music), false, 1);
                }
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                } else {
                    if (type == "Perfect") {
                        proxy.score += 100;
                        proxy.perfect++;
                    } else if (type == "Good") {
                        proxy.score += 80;
                        proxy.good++;
                    } else if (type == "Miss") {
                        proxy.score += 0;
                        proxy.miss++;
                    } else if (type == "OutMiss") {
                        proxy.miss++;
                    }
                }

                //显示操作结果
                mainMediator.sendNotification(Command.IN.SHOW_OPERATE_RESULT, type);//type == "AutoMiss" || type == "OutMiss" ? "Miss" : type);

                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                } else {
                    proxy.combo++;
                }
                mainMediator.sendNotification(Command.IN.SHOW_COMBO, proxy.combo);

                //处理对应事件
                let event = data ? data.event : 0;
                if (event) {
                    let list = [];
                    let items = DataProxy.data.groundData.items;
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].changeType == event && items[i].isChangeComplete() == false) {
                            list.push(items[i]);
                        }
                    }
                    if (list.length) {
                        let item = list[~~(Math.random() * list.length)];
                        if (item.changeValue.value + item.changeSpeed > 1) {
                            item.changeValue.value = 1;
                        } else {
                            item.changeValue.value += item.changeSpeed;
                        }
                    }
                }
            }
        }
    }
}

//////////view/CRGModule.ts//////////
namespace game {
    export namespace crg {
        export class CRGModule extends mvc.Module {

            constructor() {
                super(CRGModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE, common.Command.CHANGE_SCENE, common.Command.REGISTER_NET];
            }

            public handleNotification(note: mvc.Notification): void {
                switch (note.name) {
                    case common.Command.INIT_MODULE: //初始化模块

                        //初始化 view
                        this.facade.registerMediator(new MainMediator());
                        this.facade.registerMediator(new UIMediator());

                        //初始化 controller
                        this.facade.registerCommand(Command.IN.OPERATE, OperateCommand);
                        break;
                    case common.Command.CHANGE_SCENE: //切换场景
                        if (note.body.sceneName == CRGModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(MainMediator.NAME));
                        }
                        break;
                }
            }

            public static NAME = "crg";


        }
    }
}

//////////view/MainMediator.ts//////////
namespace game {
    export namespace crg {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                DataProxy.data = new GameData();

                this.viewComponent = new cc.Node();
                this.viewComponent.anchorX = 0;
                this.viewComponent.anchorY = 0;
                let background = new cc.Node();
                background.name = "background";
                background.addComponent(Background);
                background.anchorX = 0;
                background.anchorY = 0;
                this.viewComponent.addChild(background);
                this.viewComponent.addComponent(GameMain);

                this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(UIMediator.NAME));
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await ResourceProxy.loadResources();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        break;
                }
            }

            public static NAME = "crg.MainMediator";
        }
    }
}

//////////view/ui/UIMediator.ts//////////
namespace game {
    export namespace crg {

        export class UIMediator extends mvc.Mediator {

            constructor() {
                super(UIMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new GameUI();
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW,
                    Command.IN.SHOW_COMBO, Command.IN.SHOW_OPERATE_RESULT];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != UIMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != UIMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        break;
                    case Command.IN.SHOW_COMBO:
                        this.viewComponent.showCombo(note.body);
                        break;
                    case Command.IN.SHOW_OPERATE_RESULT:
                        this.viewComponent.showOperateResult(note.body);
                        break;
                }
            }

            public static NAME = "crg.UIMediator";
        }
    }
}

//////////view/ui/GameUI.ts//////////
namespace game {
    export namespace crg {
        export class GameUI extends cc.Node {

            private combo: cc.Node;
            private operate: cc.Node;

            constructor() {
                super();

                let node = new cc.Node();
                this.combo = node;
                this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 60;
                node.addComponent(cc.Label);
                let label = node.getComponent(cc.Label);
                label.string = "";

                node = new cc.Node();
                this.operate = node;
                this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 140;
                node.addComponent(cc.Label);
                label = node.getComponent(cc.Label);
                label.string = "";

                // node = new cc.Node();
                // node.anchorX = 0;
                // node.anchorY = 1;
                // node.opacity = 150;
                // this.addChild(node);
                // node.x = -lib.data.system.screen.width / 2;
                // node.y = lib.data.system.screen.height / 2;
                // node.addComponent(cc.Label);
                // label = node.getComponent(cc.Label);
                // label.fontSize = 24;
                // label.string = "all: 1000\ntime:123"
            }

            public showCombo(val: number) {
                if (val) {
                    this.combo.getComponent(cc.Label).string = "Combo " + val;
                    lib.Tween.to(this.combo, 0.2, {
                        opacity: 255,
                        scaleX: 1,
                        scaleY: 1
                    }, null, {
                        opacity: 150,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                } else {
                    this.combo.getComponent(cc.Label).string = "";
                }
            }

            public showOperateResult(type: string) {
                this.operate.getComponent(cc.Label).string = type;
                lib.Tween.to(this.operate, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 0
                }, null, {scaleX: 1, scaleY: 1, opacity: 255});
            }
        }
    }
}

//////////view/utils/Effect.ts//////////
namespace game {
    export namespace crg {

        /**
         * 序列帧特效
         */
        export class Effect extends cc.Node {

            frameTime: number;
            pictures: cc.Texture2D[];
            length: number;
            loop: any;
            frame: number;

            data: any;

            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            constructor(config: any, loop: boolean = null) {
                super();
                this.frameTime = config.frameTime;
                this.pictures = config.pictures;
                this.length = this.pictures.length;
                this.loop = loop != null ? loop : !!config.loop;
                this.frame = 0;
                if (config.scaleX != null) {
                    this.scaleX = config.scaleX;
                }
                if (config.scaleY != null) {
                    this.scaleY = config.scaleY;
                }

                this.update = this.update.bind(this);

                this.addComponent(cc.Sprite);
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(this.update, this.frameTime / 1000, 10000000000);

                this.update();
            }

            update() {
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            }

            destroy(): boolean {
                this.getComponent(cc.Sprite).unschedule(this.update);
                super.destroy();
                return true;
            }
        }
    }
}

//////////view/utils/DisplayFactory.ts//////////
namespace game {
    export namespace crg {
        export class DisplayFactory {

            public static createImage(texture2d: cc.Texture2D): cc.Node {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                node.anchorY = 0;
                let sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(texture2d);
                return node;
            }
        }
    }
}

//////////view/utils/Filter.ts//////////
namespace game {
    export namespace crg {
        export class Filter {

            protected program: any;
            protected sprite: cc.Sprite;

            constructor(sprite: cc.Sprite) {
                this.createProgram();
                this.sprite = sprite;
                this.sprite._sgNode.setShaderProgram(this.program);
            }

            protected createProgram() {

            }
        }
    }
}

//////////view/utils/NoneFilter.ts//////////
namespace game {
    export namespace crg {
        export class NoneFilter extends Filter {

            createProgram() {
                if (!NoneFilter.program) {
                    let glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(NoneFilter.vectorShader, NoneFilter.fragShader);
                    } else {
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
            }

            private static program: any;

            private static vectorShader = `
                                    attribute vec4 a_position;
                                    attribute vec2 a_texCoord;
                                    attribute vec4 a_color;
                                    varying vec4 v_fragmentColor; 
                                    varying vec2 v_texCoord; 
                                    
                                    void main() 
                                    { 
                                        gl_Position = CC_PMatrix * a_position;
                                        v_fragmentColor = a_color; 
                                        v_texCoord = a_texCoord; 
                                    }
                                    `;
            private static fragShader = `
                                    #ifdef GL_ES
                                    precision lowp float;
                                    #endif
                                    
                                    varying vec4 v_fragmentColor;
                                    varying vec2 v_texCoord;
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);
                                    
                                    void main()
                                    {
                                        gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
                                    }`;
        }
    }
}

//////////view/utils/ColorFilter.ts//////////
namespace game {
    export namespace crg {
        export class ColorFilter extends Filter {

            private h: number;
            private s: number;
            private l: number;

            constructor(sprite: cc.Sprite, h: number, s: number, l: number) {
                super(sprite);
                this.h = h;
                this.s = s;
                this.l = l;
                let programmer = this.program;
                if (cc.sys.isNative) {
                    programmer.setUniformInt("filterType", 1);
                    programmer.setUniformFloat("h", this.h);
                    programmer.setUniformFloat("s", this.s);
                    programmer.setUniformFloat("l", this.l);
                } else {
                    this.program.use();
                    programmer.setUniformLocationI32(programmer.getUniformLocationForName("filterType"), 1);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("h"), this.h);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("s"), this.s);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("l"), this.l);
                }
                // if (cc.sys.isNative) {
                //     this.program.setUniformVec4("filtersParams" + 0, cc.math.vec4.apply(null, [h, s, l]));
                // } else {
                //     this.program.setUniformLocationWith4f.apply(this.program, [this.program.getUniformLocationForName("filtersParams" + 0)].concat([h, s, l]));
                // }
            }

            createProgram() {
                if (!ColorFilter.pools.length) {
                    let glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(ColorFilter.vectorShader, ColorFilter.fragShader);
                    } else {
                        glProgram.initWithVertexShaderByteArray(ColorFilter.vectorShader, ColorFilter.fragShader);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    this.program = glProgram;
                } else {
                    this.program = ColorFilter.pools.shift();
                }
            }

            dispose() {
                ColorFilter.pools.push(this.program);
            }

            private static pools: ColorFilter[] = [];

            private static vectorShader = `
                                    attribute vec4 a_position;
                                    attribute vec2 a_texCoord;
                                    attribute vec4 a_color;
                                    varying vec4 v_fragmentColor; 
                                    varying vec2 v_texCoord; 
                                    
                                    void main() 
                                    { 
                                        gl_Position = CC_PMatrix * a_position;
                                        v_fragmentColor = a_color; 
                                        v_texCoord = a_texCoord; 
                                    }
                                    `;
            private static fragShader = `
                                    #ifdef GL_ES
                                    precision lowp float;
                                    #endif
                                    
                                    varying vec4 v_fragmentColor;
                                    varying vec2 v_texCoord;
                                    
                                    uniform int filterType;
                                    
                                    uniform vec4 filtersParams0;
                                    uniform vec4 filtersParams1;
                                    uniform vec4 filtersParams2;
                                    uniform vec4 filtersParams3;
                                    uniform vec4 filtersParams4;
                                    uniform vec4 filtersParams5;
                                    uniform vec4 filtersParams6;
                                    uniform vec4 filtersParams7;
                                    
                                    uniform float h;
                                    uniform float s;
                                    uniform float l;
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);
                                    
                                    void main()
                                    {
                                        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
                                        if(filterType == 1) {
                                            gl_FragColor = colorFilter(c,h,s,l);
                                        }
                                    }
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL) {
                                        //rgb -> hsl
                                        float r = color[0];
                                        float g = color[1];
                                        float b = color[2];
                                        float min = r<g?(r<b?r:b):(g<b?g:b);
                                        float max = r>g?(r>b?r:b):(g>b?g:b);
                                        float h = 0.0;
                                        if(max == min) {
                                            h = 0.0;
                                        } else if(max == r) {
                                            if(g >= b) {
                                                h = 60.0*(g-b)/(max-min) + 0.0;
                                            } else {
                                                h = 60.0*(g-b)/(max-min) + 360.0;
                                            }
                                        } else if(max == g) {
                                            h = 60.0*(b-r)/(max-min) + 120.0;
                                        } else {
                                            h = 60.0*(r-g)/(max-min) + 240.0;
                                        }
                                        for(int n = 0; n < 10; n++) {
                                            if(h < 0.0) {
                                                h += 0.0;
                                            } else if(h > 360.0) {
                                                h -= 360.0;
                                            } else {
                                                break;
                                            }
                                        }
                                        float l = 0.5*(max+min);
                                        if(l > 1.0) {
                                            l = 1.0;
                                        } else if(l < 0.0) {
                                            l = 0.0;
                                        }
                                        float s = 0.0;
                                        if(l == 0.0 || max == min) {
                                            s = 0.0;
                                        } else if(l <= 0.5) {
                                            s = (max - min)*0.5/l;
                                        } else {
                                            s = (max - min)*0.5/(1.0-l);
                                        }
                                        if(s > 1.0) {
                                            s = 1.0;
                                        } else if(s < 0.0) {
                                            s = 0.0;
                                        }
                                    
                                        //control hsl
                                        h += colorH;
                                        if(colorS < 0.0) {
                                            s *= (colorS + 100.0)*0.01;
                                        } else {
                                            s *= 1.0 + colorS*0.002;
                                        }
                                        l += colorL/100.0;
                                    
                                    
                                        //hsl -> rgb
                                        if(s == 0.0) {
                                            color[0] = l;
                                            color[1] = l;
                                            color[2] = l;
                                        } else {
                                            float q = 0.0;
                                            if(l < 0.5) {
                                                q = l*(1.0 + s);
                                            } else {
                                                q = l + s - l*s;
                                            }
                                            float p = 2.0*l - q;
                                            float hk = h/360.0;
                                            float tr = hk + 1.0/3.0;
                                            float tg = hk;
                                            float tb = hk - 1.0/3.0;
                                            for(int n = 0; n < 10; n++) {
                                                if(tr < 0.0) {
                                                    tr += 1.0;
                                                } else if(tr > 1.0) {
                                                    tr -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            for(int n = 0; n < 10; n++) {
                                                if(tg < 0.0) {
                                                    tg += 1.0;
                                                } else if(tg > 1.0) {
                                                    tg -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            for(int n = 0; n < 10; n++) {
                                                if(tb < 0.0) {
                                                    tb += 1.0;
                                                } else if(tb > 1.0) {
                                                    tb -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            if(tr < 1.0/6.0) {
                                                tr = p + ((q - p) * 6.0 * tr);
                                            } else if(tr < 0.5) {
                                                tr = q;
                                            } else if(tr < 2.0/3.0) {
                                                tr = p + ((q - p) * 6.0 * (2.0/3.0 - tr));
                                            } else {
                                                tr = p;
                                            }
                                            if(tg < 1.0/6.0) {
                                                tg = p + ((q - p) * 6.0 * tg);
                                            } else if(tg < 0.5) {
                                                tg = q;
                                            } else if(tg < 2.0/3.0) {
                                                tg = p + ((q - p) * 6.0 * (2.0/3.0 - tg));
                                            } else {
                                                tg = p;
                                            }
                                            if(tb < 1.0/6.0) {
                                                tb = p + ((q - p) * 6.0 * tb);
                                            } else if(tb < 0.5) {
                                                tb = q;
                                            } else if(tb < 2.0/3.0) {
                                                tb = p + ((q - p) * 6.0 * (2.0/3.0 - tb));
                                            } else {
                                                tb = p;
                                            }
                                            color[0] = tr;
                                            color[1] = tg;
                                            color[2] = tb;
                                        }
                                        return color;
                                    }
                                    `;
        }
    }
}

//////////view/game/gameEvents/GameEvent.ts//////////
namespace game {
    export namespace crg {
        export class GameEvent {

            constructor() {
            }

            execute() {

            }
        }
    }
}

//////////view/game/gameEvents/GameStartEvent.ts//////////
namespace game {
    export namespace crg {
        export class GameStartEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                if (data.lastTime == 0) {
                    let player = new Effect(ResourceProxy.getResource("player" + (1 + (~~(2 * Math.random())))), true);
                    data.playerLayer.addChild(player);
                    player.x = 100;
                    player.y = 150;
                    data.player = player;

                    data.bgm = cc.audioEngine.play(ResourceProxy.getResource("bgm"), true, 0.05);
                }
            }
        }
    }
}

//////////view/game/gameEvents/OperateRhythmEvent.ts//////////
namespace game {
    export namespace crg {
        export class OperateRhythmEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                let list = data.config;
                let findNext = false;
                let speed = ConfigProxy.getConfig("timeSpeed");
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6 && !data.monsterShow[list[i].time]) {
                        if ((list[i].time - 5000 < 0 || (list[i].time - 5000) >= data.lastTime) && (list[i].time - 5000) < data.time) {
                            let monster:any = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            let sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(ResourceProxy.getResource("monster" + ((~~(6 * Math.random())) + 1)));
                            data.monsterLayer.addChild(monster);
                            monster.x = data.player.x + (10*Math.random()) + (list[i].time - data.time) * speed / 1000;
                            monster.y = data.player.y;
                            monster.opacity = 0;
                            monster.scaleX = 0;
                            monster.scaleY = 0;
                            monster.data = list[i];
                            data.monsters.push(monster);
                            data.monsterShow[list[i].time] = true;
                        }
                    }
                }
                for (let i = 0; i < data.monsters.length; i++) {
                    let last = data.monsters[i].x;
                    data.monsters[i].x -= (data.time - data.lastTime) * speed / 1000;
                    if ((last >= lib.data.system.screen.width - 100 && data.monsters[i].x < lib.data.system.screen.width - 100) || data.monsters[i].x < lib.data.system.screen.width - 100 &&  !list[i].tween) {
                        list[i].tween = lib.Tween.to(data.monsters[i], 0.3, {opacity: 255, scaleX: 0.75, scaleY: 0.75});
                        // cc.audioEngine.play(ResourceProxy.getResource("rhythm" + data.monsters[i].data.music), false, 1);
                    }
                }
                for (let i = 0; i < data.monsters.length; i++) {
                    if (data.monsters[i].x < 0) {
                        data.monsters[i].destroy();
                        data.monsters.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }
}

//////////view/game/gameEvents/OperateEvent.ts//////////
namespace game {
    export namespace crg {
        export class OperateEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                let list = data.config;
                let find = false;
                let perfectTime = ConfigProxy.getConfig("perfectTime");
                let goodTime = ConfigProxy.getConfig("goodTime");
                let missTime = ConfigProxy.getConfig("missTime");
                if (data.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!data.operate[list[i].id] && Math.abs(data.time - list[i].time) < missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(data.time - list[i].time) < perfectTime) { //perfect
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Perfect"
                                    });
                                } else if (Math.abs(data.time - list[i].time) < goodTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Good"
                                    });
                                } else if (Math.abs(data.time - list[i].time) < missTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Miss"
                                    });
                                }
                                find = true;
                                data.operate[list[i].time] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find) {
                        mainMediator.sendNotification(Command.IN.OPERATE, {data: null, operateType: "OutMiss"});
                    }
                    data.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!data.operate[list[i].time] && data.time - list[i].time > missTime) {
                            mainMediator.sendNotification(Command.IN.OPERATE, {data: null, operateType: "AutoMiss"});
                            data.operate[list[i].time] = true;
                        }
                    }
                }
            }
        }
    }
}

//////////view/game/GameMain.ts//////////
namespace game {
    export namespace crg {
        export class GameMain extends cc.Component {

            private events: GameEvent[];

            start() {
                DataProxy.data.config = ConfigProxy.getGameConfig();
                DataProxy.data.configTime = ConfigProxy.getLevelConfigTime(DataProxy.data.config);
                DataProxy.data.root = this.node;
                this.node.x = -lib.data.system.screen.width / 2;
                this.node.y = -lib.data.system.screen.height / 2;
                this.events = [
                    new GameStartEvent(),
                    new OperateRhythmEvent(),
                    new OperateEvent()
                ];
                DataProxy.data.monsterLayer = new cc.Node();
                DataProxy.data.root.addChild(DataProxy.data.monsterLayer);
                DataProxy.data.playerLayer = new cc.Node();
                DataProxy.data.root.addChild(DataProxy.data.playerLayer);

                //添加点击事件
                let node = new cc.Node();
                DataProxy.data.root.addChild(node);
                node.addComponent(cc.Sprite);
                node.scaleX = lib.data.system.screen.width;
                node.scaleY = lib.data.system.screen.height;
                node.opacity = 0;
                let sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(ResourceProxy.getResource("click"));
                node.on(cc.Node.EventType.TOUCH_START, function () {
                    DataProxy.data.clickFlag = true;
                }, this);
            }

            update() {
                if (DataProxy.data.configTime - 10000 >= DataProxy.data.lastTime && DataProxy.data.configTime - 10000 < DataProxy.data.time) {
                    DataProxy.data.config = ConfigProxy.addGameConfig(DataProxy.data.config);
                    DataProxy.data.configTime = ConfigProxy.getLevelConfigTime(DataProxy.data.config);
                }
                DataProxy.data.lastTime = DataProxy.data.time;
                DataProxy.data.time += lib.CoreTime.lastTimeGap;
                DataProxy.data.currentMovePosition = ~~(16 * ConfigProxy.getConfig("moveSpeed") / 1000);
                DataProxy.data.position += DataProxy.data.currentMovePosition;
                for (let i = 0; i < this.events.length; i++) {
                    this.events[i].execute();
                }
            }
        }
    }
}

//////////view/game/background/Background.ts//////////
namespace game {
    export namespace crg {
        export class Background extends cc.Component {

            bg1_1: BackgroundContainer;
            bg1_2: BackgroundContainer;
            bg1_3: BackgroundContainer;
            bg2_1: BackgroundContainer;
            bg2_2: BackgroundContainer;
            bg2_3: BackgroundContainer;
            bgs: BackgroundContainer[] = [];

            start() {
                this.bgs.push(this.bg1_3 = new BackgroundContainer(3));
                this.bgs.push(this.bg2_3 = new BackgroundContainer(3));
                this.bgs.push(this.bg1_2 = new BackgroundContainer(2));
                this.bgs.push(this.bg2_2 = new BackgroundContainer(2));
                this.bgs.push(this.bg1_1 = new BackgroundContainer(1));
                this.bgs.push(this.bg2_1 = new BackgroundContainer(1));
                for (let i = 0; i < this.bgs.length; i++) {
                    this.node.addChild(this.bgs[i]);
                }
                this.bg2_1.x = 1334;
                this.bg2_2.x = 1334;
                this.bg2_3.x = 1334;
            }

            update() {
                for (let i = 0; i < this.bgs.length; i++) {
                    if (this.bgs[i].layer == 1) {
                        this.bgs[i].x -= DataProxy.data.currentMovePosition;
                    } else if (this.bgs[i].layer == 2) {
                        this.bgs[i].x -= ~~(DataProxy.data.currentMovePosition * 0.5);
                    }
                    if (this.bgs[i].x <= -1334) {
                        this.bgs[i].x += 1334 * 2;
                    }
                }
            }
        }
    }
}

//////////view/game/background/BackgroundContainer.ts//////////
namespace game {
    export namespace crg {
        export class BackgroundContainer extends cc.Node {

            private items: BackgroundItem[];
            public layer:number;

            constructor(layer: number) {
                super();
                this.layer = layer;
                this.anchorX = this.anchorY = 0;

                this.items = [];
                let list = DataProxy.data.groundData.items;
                for (let i = 0; i < list.length; i++) {
                    if(list[i].layer == layer) {
                        let item = new BackgroundItem(list[i]);
                        this.items.push(item);
                        this.addChild(item);
                    }
                }
            }
        }
    }
}

//////////view/game/background/BackgroundGround.ts//////////


//////////view/game/background/BackgroundItem.ts//////////
namespace game {
    export namespace crg {
        export class BackgroundItem extends cc.Node {

            private data: BackgroundItemData;
            private image: cc.Node;
            private filter: ColorFilter;

            constructor(data: BackgroundItemData) {
                super();
                this.data = data;
                if (data.url) {
                    this.image = DisplayFactory.createImage(ResourceProxy.getResource(data.url));

                    this.addChild(this.image);

                    if (this.data.changeType) {
                        this.data.changeValue.addListener(lib.Event.CHANGE, this.change, this);

                        //色相
                        if (this.data.changeType == 1) {
                            this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 360 * (1 - this.data.changeValue.value), 0, 0);
                        }
                        //灰度
                        if (this.data.changeType == 2) {
                            this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 0, -100.0 * (1 - this.data.changeValue.value), 0);
                        }
                        //渐现
                        if (this.data.changeType == 3) {
                            this.addComponent(cc.Mask);
                            this.anchorX = 0;
                            this.anchorY = 0;
                            let mask = this.getComponent(cc.Mask);
                            mask.type = cc.Mask.Type.RECT;
                            this.width = this.image.width;
                            this.height = 0;
                        }
                    }
                }
            }

            private change() {
                if (this.data.changeType == 1) {
                    lib.Tween.to(this, 0.2, {colorH: (1 - this.data.changeValue.value)}, null, {colorH: (1 - this.data.changeValue.old)});
                }
                if (this.data.changeType == 2) {
                    lib.Tween.to(this, 0.2, {colorS: (1 - this.data.changeValue.value)}, null, {colorS: (1 - this.data.changeValue.old)});
                }
                if (this.data.changeType == 3) {
                    lib.Tween.to(this, 0.2, {height: this.image.height * this.data.changeValue.value});
                }
            }

            private set colorH(val: number) {
                if (this.filter) {
                    this.filter.dispose();
                }
                this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 360 * val, 0, 0);
            }

            private set colorS(val: number) {
                if (this.filter) {
                    this.filter.dispose();
                }
                this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 0, -100.0 * val, 0);
            }
        }
    }
}



window.game = game;
