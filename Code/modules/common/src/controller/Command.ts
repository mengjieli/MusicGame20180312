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
             * 关闭场景
             * @type {string}
             */
            public static CLOSE_SCENE:string = "close_scene";


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