namespace game {
    export namespace jumpGame {
        export class OperateStruct extends lib.ByteArray {

            public playerUUID: string;
            public operate: string;
            public operateValue: any;

            constructor(playerUUID: string = "", operate: string = "", operateValue: any = null) {
                super();
                this.playerUUID = playerUUID;
                this.operate = operate;
                this.operateValue = operateValue;
            }

            public encode(bytes: lib.ByteArray): void {
                bytes.writeUTF(this.playerUUID);
                bytes.writeUTF(this.operate);
                bytes.writeUTF(JSON.stringify(this.operateValue));
            }

            public decode(bytes: lib.ByteArray): void {
                this.playerUUID = bytes.readUTF();
                this.operate = bytes.readUTF();
                this.operateValue = JSON.parse(bytes.readUTF());
            }

            public get value(): any {
                return {
                    playerUUID:this.playerUUID,
                    operate: this.operate,
                    operateValue: this.operateValue
                }
            }
        }
    }
}