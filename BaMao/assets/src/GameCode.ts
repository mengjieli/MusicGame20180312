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
            public start(rootView:cc.Node): void {
                //发送启动消息
                this.sendNotification(Command.IN.START_UP,new common.InitModuleNB(rootView,lib.DataManager.createData("ProgressData")));
            }

            public static NAME: string = "gameApp";

            private static instance: AppFacade;

            /**
             * 启动
             */
            public static start(rootView:cc.Node): void {
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
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("musicTest"));
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



window.game = game;
