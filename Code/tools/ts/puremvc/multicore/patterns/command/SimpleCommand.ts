namespace mvc {

    /**
     * 既可以发送消息，也可以接收处理消息
     */
    export class SimpleCommand extends Notifier {

        constructor() {
            super();
        }

        /**
         * 执行收到消息后的内容
         * @param notification
         */
        public execute(notification:Notification):void {

        }
    }
}