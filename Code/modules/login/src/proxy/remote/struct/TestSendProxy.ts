namespace game {
    export namespace login {

        export class TestSendProxy extends lib.ByteArray {

            public static CMD: number = 10102;

            public backWithRemote: boolean;
            public tbyte: number;
            public tbool: boolean;
            public tint: number;
            public tuint: number;
            public tstr: string;
            public tIntArray: number[];
            public tStruct: TestStructProxy;
            public tStructArray: TestStructProxy[];

            public back: TestRecvProxy;

            constructor(backWithRemote: boolean, tbyte: number, tbool: boolean, tint: number, tuint: number, tstr: string, tIntArray: number[], tStruct: TestStructProxy, tStructArray: TestStructProxy[]) {
                super();
                this.backWithRemote = backWithRemote;
                this.tbyte = tbyte;
                this.tbool = tbool;
                this.tint = tint;
                this.tuint = tuint;
                this.tstr = tstr;
                this.tIntArray = tIntArray;
                this.tStruct = tStruct;
                this.tStructArray = tStructArray;
            }

            public send(): Promise<number> {
                this.clear();
                //写消息头
                this.writeUInt(TestSendProxy.CMD);
                this.writeUInt(this.remoteId);
                //写消息体
                this.encode(this);
                return super.sendAsync(game.net);
            }

            /**
             * 编码
             * @param {lib.ByteArray} bytes
             */
            public encode(bytes: lib.ByteArray): void {
                bytes.writeBoolean(this.backWithRemote);
                bytes.writeByte(this.tbyte);
                bytes.writeBoolean(this.tbool);
                bytes.writeInt(this.tint);
                bytes.writeUInt(this.tuint);
                bytes.writeUTF(this.tstr);
                bytes.writeUInt(this.tIntArray.length);
                for (let i = 0; i < this.tIntArray.length; i++) {
                    bytes.writeInt(this.tIntArray[i]);
                }
                this.tStruct.encode(bytes);
                bytes.writeUInt(this.tStructArray.length);
                for (let i = 0; i < this.tStructArray.length; i++) {
                    this.tStructArray[i].encode(bytes);
                }
            }

            public receiveMessage(cmd: number, bytes: lib.ByteArray): void {
                if (cmd == TestRecvProxy.CMD) {
                    this.back = new TestRecvProxy();
                    this.back.decode(bytes);
                }
            }

            public get value(): any {
                var tIntArrayValue = [];
                for (let i = 0; i < this.tIntArray.length; i++) {
                    tIntArrayValue.push(this.tIntArray[i]);
                }
                var tStructArrayValue = [];
                for (let i = 0; i < this.tStructArray.length; i++) {
                    tStructArrayValue.push(this.tStructArray[i].value);
                }
                return {
                    backWithRemote: this.backWithRemote,
                    tbyte: this.tbyte,
                    tbool: this.tbool,
                    tint: this.tint,
                    tuint: this.tuint,
                    tstr: this.tstr,
                    tIntArray: tIntArrayValue,
                    tStruct: this.tStruct.value,
                    tStructArray: tStructArrayValue
                }
            }
        }
    }
}