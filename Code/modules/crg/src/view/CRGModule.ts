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