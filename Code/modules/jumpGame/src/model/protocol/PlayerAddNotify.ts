namespace game {
    export namespace jumpGame {
        export class PlayerAddNotify extends lib.Request {
            public static CMD = 10020;

            public playerUUID: string;
            public x: number;
            public y: number;

            constructor(playerUUID: string = "", x: number = 0, y: number = 0) {
                super(PlayerAddNotify.CMD);
                this.playerUUID = playerUUID;
                this.x = x;
                this.y = y;
            }

            public encode(bytes: lib.ByteArray): void {
                this.writeUTF(this.playerUUID);
                this.writeInt(this.x);
                this.writeInt(this.y);
            }

            public decode(bytes: lib.ByteArray): void {
                this.playerUUID = bytes.readUTF();
                this.x = bytes.readInt();
                this.y = bytes.readInt();
            }

            public get value(): any {
                return {
                    head: this.head.value,
                    playerUUID: this.playerUUID,
                    x: this.x,
                    y: this.y
                }
            }
        }
    }
}