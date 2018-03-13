namespace game {
    export namespace login {

        export class TestRequest extends lib.Request {

            public static CMD = 10000;

            public backWithRemote: boolean;
            public tbyte: number;
            public tbool: boolean;
            public tint: number;
            public tuint: number;
            public tstr: string;
            public tIntArray: number[];
            public tStruct: TestStruct;
            public tStructArray: TestStruct[];

            public response: TestResponse;

            constructor(backWithRemote: boolean = false, tbyte: number = 0, tbool: boolean = false, tint: number = 0, tuint: number = 0, tstr: string = "", tIntArray: number[] = null, tStruct: TestStruct = null, tStructArray: TestStruct[] = null) {
                super(TestRequest.CMD);
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

            public decode(bytes: lib.ByteArray): void {
                this.backWithRemote = bytes.readBoolean();
                this.tbyte = bytes.readByte();
                this.tbool = bytes.readBoolean();
                this.tint = bytes.readInt();
                this.tuint = bytes.readUInt();
                this.tstr = bytes.readUTF();
                this.tIntArray = [];
                for (let i = 0, len = bytes.readUInt(); i < len; i++) {
                    this.tIntArray.push(bytes.readInt());
                }
                this.tStruct = new TestStruct();
                this.tStruct.decode(bytes);
                this.tStructArray = [];
                for (let i = 0, len = bytes.readUInt(); i < len; i++) {
                    let item = new TestStruct();
                    item.decode(bytes);
                    this.tStructArray.push(item);
                }
            }

            public onReceive(head: lib.ResponseHead, bytes: lib.ByteArray): void {
                if (head.cmd == TestResponse.CMD) {
                    this.response = new TestResponse();
                    this.response.head = head;
                    this.response.decode(bytes);
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
                    head: this.head.value,
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