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