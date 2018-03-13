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