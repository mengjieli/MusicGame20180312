namespace mvc {

    /**
     * 消息通知者
     */
    export class Notifier {

        private _multitonKey: string;

        private _facade: Facade;

        constructor() {

        }

        /**
         *
         * @returns {string}
         */
        protected get multitonKey(): string {
            return this._multitonKey;
        }

        /**
         * 初始化
         * @param {string} key
         */
        initializeNotifier(key: string) {
            this._multitonKey = key + "";
            this._facade = this.facade;
        }

        /**
         * 发送消息
         * @param name
         * @param body
         * @param type
         */
        sendNotification(name: string, body: any, type: string = "") {
            if (this._facade) {
                return this._facade;
            }
            var facade = this.facade;
            if (facade) {
                facade.sendNotification(name, body, type);
            }
        }

        get facade(): Facade {
            if (this._multitonKey == null) {
                throw new Error(Notifier.MULTITON_MSG);
            }
            return Facade.getInstance(this._multitonKey);
        }

        /**
         * @type {string}
         */
        static MULTITON_MSG: string = "multitonKey for this Notifier not yet initialized!";
    }
}