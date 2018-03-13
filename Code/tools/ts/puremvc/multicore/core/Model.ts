namespace mvc {

    /***
     * Model ，Proxy 的管理模块
     */
    export class Model {

        private _multitonKey: string;
        private proxyMap: any;

        constructor(key: string) {
            if (Model.instanceMap[key]) {
                throw new Error(Model.MULTITON_MSG);
            }

            this._multitonKey = key;
            Model.instanceMap[key] = this;
            this.proxyMap = {};
            this.initializeModel();
        }

        public get multitonKey(): string {
            return this._multitonKey;
        }

        protected initializeModel(): void {

        }

        /**
         * 注册 Proxy
         * @param proxy
         */
        public registerProxy(proxy: Proxy): void {
            proxy.initializeNotifier(this._multitonKey);
            this.proxyMap[proxy.name] = proxy;
            proxy.onRegister();
        }

        /**
         * 获取 Proxy
         * @param {string} proxyName
         * @returns {mvc.Proxy}
         */
        public getProxy(proxyName: string): Proxy {
            return this.proxyMap[proxyName];
        }

        /**
         * 是否注册了某个 Proxy
         * @param {string} proxyName
         * @returns {boolean}
         */
        public hasProxy(proxyName: string): boolean {
            return this.proxyMap[proxyName] ? true : false;
        }

        /**
         * 移除 Proxy
         * @param {string} proxyName
         * @returns {mvc.Proxy}
         */
        public removeProxy(proxyName: string): Proxy {
            var proxy: Proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        }

        private static MULTITON_MSG: string = "Model instance for this Multiton key already constructed!";

        private static instanceMap: any = {};

        static getInstance(key: string): Model {
            if (null == key) return null;
            if (Model.instanceMap[key] == null) {
                new Model(key);
            }
            return Model.instanceMap[key];
        }

        public static remove(key: string): Model {
            var model: Model = Model.instanceMap[key];
            delete Model.instanceMap[key];
            return model;
        }
    }
}