namespace game {
    export namespace jumpGame {
        export class JumpGameModule extends mvc.Module {

            constructor() {
                super(JumpGameModule.NAME);
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
                        this.facade.registerMediator(new JumpGameMediator());
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
                        if (note.body.sceneName == JumpGameModule.NAME) {
                            this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(JumpGameMediator.NAME));
                        }
                        break;
                    case common.Command.REGISTER_NET: //注册网络模块
                        // for (let i = 0; i < this.receiveNetProxies.length; i++) {
                        //     this.receiveNetProxies[i].registerNet(game.net);
                        // }
                        break;
                }
            }

            public static NAME: string = "jumpGame";
        }
    }
}