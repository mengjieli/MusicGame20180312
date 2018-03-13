namespace mvc {

    /**
     * 消息观察者
     */
    export class Observer {

        private _notify: Function;
        private _context: any;

        constructor(notify: Function, context: any) {
            this._notify = notify;
            this._context = context;
        }

        /**
         * 消息处理函数
         * @returns {Function}
         */
        get notify(): Function {
            return this._notify;
        }

        set notify(val: Function) {
            this._notify = val;
        }

        /**
         * 消息处理函数 this 指针
         * @returns {any}
         */
        get context(): any {
            return this._context;
        }

        set context(val: any) {
            this._context = val;
        }

        /**
         * 调用消息监听函数
         * @param {mvc.Notification} notification
         */
        notifyObserver(notification: Notification): void {
            this._notify.call(this._context, notification);
        }

        /**
         * 比较 context 是否相等
         * @param context
         * @returns {boolean}
         */
        compareNotifyContext(context: any): boolean {
            return this._context === context;
        }
    }
}