namespace game {
    export namespace login {

        export class TestRecvProxy extends lib.ByteArray {

            public static CMD: number = 10103;

            public tbyte: number;
            public tbool: boolean;
            public tint: number;
            public tuint: number;
            public tstr: string;
            public tIntArray: number[];
            public tStruct: TestStructProxy;
            public tStructArray: TestStructProxy[];

            constructor() {
                super();
            }

            public decode(bytes: lib.ByteArray): void {
                this.tbyte = bytes.readByte();
                this.tbool = bytes.readBoolean();
                this.tint = bytes.readInt();
                this.tuint = bytes.readUInt();
                this.tstr = bytes.readUTF();
                this.tIntArray = [];
                for (let i = 0, len = bytes.readUInt(); i < len; i++) {
                    this.tIntArray.push(bytes.readInt());
                }
                this.tStruct = new TestStructProxy();
                this.tStruct.decode(bytes);
                this.tStructArray = [];
                for (let i = 0, len = bytes.readUInt(); i < len; i++) {
                    let item = new TestStructProxy();
                    item.decode(bytes);
                    this.tStructArray.push(item);
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