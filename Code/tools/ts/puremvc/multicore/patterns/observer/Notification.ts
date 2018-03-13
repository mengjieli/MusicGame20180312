namespace mvc {

    /**
     * 消息类
     */
    export class Notification {

        private _name: string;
        private _body: any;
        private _type: string;

        constructor(name: string, body?: any, type: string = "") {
            this._name = name;
            this._body = body;
            this._type = type;
        }

        /**
         * 消息名称
         */
        get name(): string {
            return this._name;
        }

        /**
         * 消息内容
         */
        get body(): any {
            return this._body;
        }

        set body(val: any) {
            this._body = val;
        }

        /**
         * 消息类型
         */
        get type(): string {
            return this._type;
        }

        set type(val: string) {
            this._type = val;
        }

        toString() {
            var msg = "Notification Name: " + this.name;
            msg += "\nBody:" + ((this.body == null) ? "null" : this.body.toString());
            msg += "\nType:" + ((this.type == null) ? "null" : this.type);
            return msg;
        }
    }
}