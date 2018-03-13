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