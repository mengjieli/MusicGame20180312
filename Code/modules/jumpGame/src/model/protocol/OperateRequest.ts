namespace game {
    export namespace jumpGame {
        export class OperateRequest extends lib.Request {

            public static CMD = 10010;

            public operate: string;
            public operateValue: any;
            public x: number;
            public y: number;

            constructor(operate: string = "", operateValue: any = null, x: number, y: number) {
                super(OperateRequest.CMD);
                this.operate = operate;
                this.operateValue = operateValue;
                this.x = x;
                this.y = y;
            }

            public encode(bytes: lib.ByteArray): void {
                bytes.writeUTF(this.operate);
                bytes.writeUTF(JSON.stringify(this.operateValue));
                bytes.writeInt(this.x);
                bytes.writeInt(this.y);
            }

            public decode(bytes: lib.ByteArray): void {
                this.operate = bytes.readUTF();
                this.operateValue = JSON.parse(bytes.readUTF());
                this.x = bytes.readInt();
                this.y = bytes.readInt();
            }

            public get value(): any {
                return {
                    head: this.head.value,
                    operate: this.operate,
                    operateValue: this.operateValue
                }
            }
        }
    }

}