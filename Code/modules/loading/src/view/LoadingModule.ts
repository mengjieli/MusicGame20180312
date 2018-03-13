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