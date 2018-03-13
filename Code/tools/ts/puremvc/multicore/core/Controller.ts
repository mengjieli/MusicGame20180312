namespace mvc {

    /**
     * Command 的管理模块
     */
    export class Controller {

        private _multitonKey: string;

        private commandMap: any;

        private view: View;

        constructor(key: string) {
            if (Controller.instanceMap[key] != null) {
                throw new Error(Controller.MULTITON_MSG);
            }

            this._multitonKey = key;
            Controller.instanceMap[this._multitonKey] = this;
            this.commandMap = {};
            this.initializeController();
        }

        public get multitonKey(): string {
            return this._multitonKey;
        }

        protected initializeController(): void {
            this.view = View.getInstance(this._multitonKey);
        }

        /**
         * 注册 Command ，一个 Command 能关心多个消息，但一个消息只能一个 Command 处理
         * @param {string} notificationName
         * @param commandClass
         */
        public registerCommand(notificationName: string, commandClass: any): void {
            if (this.commandMap[notificationName]) {
                throw new Error(Controller.CONTROLLER_MSG);
            }
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
            this.commandMap[notificationName] = commandClass;
        }

        /**
         * 是否已注册了某个 Command
         * @param {string} notificationName
         * @returns {boolean}
         */
        public hasCommand(notificationName: string): boolean {
            return this.commandMap[notificationName] ? true : false;
        }

        /**
         * 移除 Command
         * @param {string} notificationName
         */
        public removeCommand(notificationName: string): void {
            if (this.commandMap[notificationName]) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        }

        /**
         * 执行 Command
         * @param {mvc.Notification} notification
         */
        public executeCommand(notification: Notification): void {
            if (!this.commandMap[notification.name]) return;
            let commandClass = this.commandMap[notification.name];
            var command: SimpleCommand | MacroCommand = new commandClass();
            command.initializeNotifier(this._multitonKey);
            command.execute(notification);
        }


        private static MULTITON_MSG: string = "controller key for this Multiton key already constructed";
        private static CONTROLLER_MSG: string = "the notification has been registered with another command.";

        private static instanceMap: any = {};

        public static getInstance(key: string): Controller {
            if (key == null) {
                return null;
            }
            if (Controller.instanceMap[key] == null) {
                new Controller(key);
            }
            return Controller.instanceMap[key];
        }

        public static remove(key: string): Controller {
            var controller: Controller = Controller.instanceMap[key];
            delete Controller.instanceMap[key];
            return controller;
        }
    }
}