namespace mvc {
    export class Facade {

        private _multitonKey: string;
        private view: View;
        private model: Model;
        private controller: Controller;

        constructor(key: string) {
            if (Facade.instanceMap[key] != null) {
                throw new Error(Facade.MULTITON_MSG);
            }
            this.initializeNotifier(key);
            Facade.instanceMap[key] = this;
            this.initializeFacade();
        }

        get multitonKey(): string {
            return this._multitonKey;
        }

        private initializeNotifier(key: string): void {
            this._multitonKey = key;
        }

        protected initializeFacade(): void {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        }

        protected initializeModel(): void {
            if (this.model != null)
                return;
            this.model = Model.getInstance(this.multitonKey);
        }

        protected initializeController(): void {
            if (this.controller != null)
                return;
            this.controller = Controller.getInstance(this.multitonKey);
        }

        protected initializeView(): void {
            if (this.view != null)
                return;
            this.view = View.getInstance(this.multitonKey);
        }

        public registerCommand(notificationName: string, commandClassRef: any): void {
            this.controller.registerCommand(notificationName, commandClassRef);
        }

        public removeCommand(notificationName: string): void {
            this.controller.removeCommand(notificationName);
        }

        public hasCommand(notificationName: string): boolean {
            return this.controller.hasCommand(notificationName);
        }

        public registerProxy(proxy: Proxy): void {
            this.model.registerProxy(proxy);
        }

        public getProxy(proxyName: string): Proxy {
            return this.model.getProxy(proxyName);
        }

        public removeProxy(proxyName: string): Proxy {
            var proxy = null;
            if (this.model != null) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        }

        public hasProxy(proxyName: string): boolean {
            return this.model.hasProxy(proxyName);
        }

        public registerMediator(mediator: Mediator): void {
            if (this.view != null) {
                this.view.registerMediator(mediator);
            }
        }

        public getMediator(mediatorName: string): Mediator {
            return this.view.getMediator(mediatorName);
        }

        public removeMediator(mediatorName: string): Mediator {
            var mediator = null;
            if (this.view != null) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        }

        public hasMediator(mediatorName: string): boolean {
            return this.view.hasMediator(mediatorName);
        }

        public sendNotification(notificationName: string, body?: any, type: string = ""): void {
            this.notifyObservers(new Notification(notificationName, body, type));
        }

        /**
         * 发送消息
         * @param notification
         */
        public notifyObservers(notification: Notification): void {
            if (this.view != null) {
                this.view.notifyObservers(notification);
            }
        }

        private static MULTITON_MSG: string = "Facade instance for this Multiton key already constructed!";

        private static instanceMap: any = {};


        public static getInstance(key: string): Facade {
            if (null == key)
                return null;

            if (Facade.instanceMap[key] == null) {
                Facade.instanceMap[key] = new Facade(key);
            }

            return Facade.instanceMap[key];
        }

        public has(key: string): boolean {
            return Facade.instanceMap[key] ? true : false;
        }

        public static remove(key: string): boolean {
            if (Facade.instanceMap[key] == null)
                return;
            Model.remove(key);
            View.remove(key);
            Controller.remove(key);
            delete Facade.instanceMap[key];
        }
    }
}
