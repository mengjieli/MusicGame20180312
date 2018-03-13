namespace mvc {

    export abstract class Mediator extends Notifier {

        private _name: string;
        private _viewComponent: any;

        constructor(name: string, viewComponent: any) {
            super();
            this._name = name || Mediator.NAME;
            this._viewComponent = viewComponent;
        }

        /**
         * 获取 Mediator 的唯一标识 name
         * @returns {any}
         */
        public get name() {
            return this._name;
        }

        public get viewComponent(): any {
            return this._viewComponent;
        }

        public set viewComponent(val: any) {
            this._viewComponent = val;
        }

        /**
         * 列出感兴趣的消息名
         * @returns {string[]}
         */
        public listNotificationInterests(): string[] {
            return [];
        }

        /**
         * 处理感兴趣的消息名
         * @param {mvc.Notification} notification
         */
        public handleNotification(notification: Notification): void {
            //TODO in subClass
        }

        public onRegister(): void {

        }

        public onRemove(): void {

        }

        static NAME: string = "Mediator";
    }
}