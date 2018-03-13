namespace game {
    export namespace jumpGame {
        export class FrameNotify extends lib.Request {
            public static CMD = 10014;

            public operates: OperateStruct[];

            constructor(operates: OperateStruct[] = []) {
                super(FrameNotify.CMD);
                this.operates = operates;
            }

            public encode(bytes: lib.ByteArray): void {
                bytes.writeUInt(this.operates.length);
                for (let i = 0; i < this.operates.length; i++) {
                    this.operates[i].encode(bytes);
                }
            }

            public decode(bytes: lib.ByteArray): void {
                let len = bytes.readUInt();
                this.operates = [];
                for (let i = 0; i < len; i++) {
                    let item = new OperateStruct();
                    item.decode(bytes);
                    this.operates.push(item);
                }
            }

            public get value(): any {
                let operatesList = [];
                for (let i = 0; i < this.operates.length; i++) {
                    operatesList.push(this.operates[i].value);
                }
                return {
                    head: this.head.value,
                    operates: operatesList
                }
            }
        }
    }
}