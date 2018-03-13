namespace mvc {

    /**
     * Mediator 的管理模块
     */
    export class View {

        private _multitonKey: string;
        private mediatorMap: any;
        private observerMap: any;

        constructor(key:string) {
            if (View.instanceMap[key] != null) {
                throw new Error(View.MULTITON_MSG);
            }
            this._multitonKey = key;
            View.instanceMap[this.multitonKey] = this;
            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }

        protected initializeView(): void {

        }

        /**
         * 注册消息监听对象
         * @param notificationName
         * @param observer
         */
        public registerObserver(notificationName: string, observer: Observer): void {
            if (!this.observerMap[notificationName]) {
                this.observerMap[notificationName] = [];
            }
            this.observerMap[notificationName].push(observer);
        }

        /**
         * 移除消息监听
         * @param {string} notificationName
         * @param context
         */
        public removeObserver(notificationName: string, context: any): void {
            if (!this.observerMap[notificationName]) return;
            var observers = this.observerMap[notificationName];
            for (let i = 0, len = observers.length; i < len; i++) {
                if (observers[i].compareNotifyContext(context)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if (!observers.length) {
                delete this.observerMap[notificationName];
            }
        }

        /**
         * 发送消息
         * @param {mvc.Notification} notification
         */
        public notifyObservers(notification: Notification): void {
            if (this.observerMap[notification.name]) {
                var observers_ref = this.observerMap[notification.name];
                var observers = observers_ref.concat();
                for (let i = 0, len = observers.length; i < len; i++) {
                    observers[i].notifyObserver(notification);
                }
            }
        }

        /**
         * 注册 Mediator
         * @param {mvc.Mediator} mediator
         */
        public registerMediator(mediator: Mediator): void {
            if (this.mediatorMap[mediator.name]) return;
            mediator.initializeNotifier(this._multitonKey);
            this.mediatorMap[mediator.name] = mediator;
            var interests = mediator.listNotificationInterests();
            if (interests.length) {
                var observer = new Observer(mediator.handleNotification, mediator);
                for (let i = 0, len = interests.length; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        }

        /**
         * 获取 Mediator
         * @param {string} name
         * @returns {mvc.Mediator}
         */
        public getMediator(name: string): Mediator {
            return this.mediatorMap[name];
        }

        /**
         * 移除 Mediator
         * @param {string} mediatorName
         * @returns {mvc.Mediator}
         */
        public removeMediator(mediatorName: string): Mediator {
            var mediator = this.mediatorMap[mediatorName];
            if (mediator) {
                var interests = mediator.listNotificationInterests();
                for (var i = 0, len = interests.length; i < len; i++) {
                    this.removeObserver(interests[i], mediator);
                }
                delete this.mediatorMap[mediatorName];
                mediator.onRemove();
            }
            return mediator;
        }

        /**
         * 是否拥有某个类型的 Mediator
         * @param {string} mediatorName
         * @returns {boolean}
         */
        public hasMediator(mediatorName: string): boolean {
            return this.mediatorMap[mediatorName] ? true : false;
        }


        public get multitonKey() {
            return this._multitonKey;
        }

        private static instanceMap: any = {};

        private static MULTITON_MSG = "View instance for this Multiton key already constructed!";

        public static getInstance(key: string): View {
            if (key == null) {
                return null;
            }
            if (View.instanceMap[key] == null) {
                new View(key);
            }
            return View.instanceMap[key];
        }

        public static remove(key: string): View {
            var view: View = View.instanceMap[key];
            delete View.instanceMap[key];
            return view;
        }
    }
}