namespace game {
    export namespace login {

        export class LoginDDZServerProxy extends lib.ByteArray {

            public static CMD: number = 10020;

            public name: string;
            public session: string;

            public notice: NoticeProxy;

            constructor(name: string, session: string) {
                super();
                this.name = name;
                this.session = session;
            }

            public send(): Promise<number> {
                this.clear();
                this.writeUInt(LoginDDZServerProxy.CMD);
                this.writeUInt(this.remoteId);
                this.encode(this);
                return super.sendAsync(game.net);
            }

            public encode(bytes: lib.ByteArray): void {
                bytes.writeUTF(this.name);
                bytes.writeUTF(this.session);
            }

            public receiveMessage(cmd: number, bytes: lib.ByteArray): void {
                if (cmd == NoticeProxy.CMD) {
                    this.notice = new NoticeProxy();
                    this.notice.decode(bytes);
                }
            }
        }
    }
}