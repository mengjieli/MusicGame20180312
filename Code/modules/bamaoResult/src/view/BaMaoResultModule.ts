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