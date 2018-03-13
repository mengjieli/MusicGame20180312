namespace game {
    export namespace login {

        export class NoticeProxy extends lib.ByteArray {

            public static CMD: number = 10100;

            public message: string;

            constructor() {
                super();
            }

            public decode(bytes: lib.ByteArray): void {
                this.message = bytes.readUTF();
            }
        }
    }
}