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