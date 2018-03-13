namespace game {
    export namespace login {

        export class TestStructProxy extends lib.ByteArray {

            public name: string;
            public id: number;

            constructor(name?: string, id?: number) {
                super();
                this.name = name;
                this.id = id;
            }

            public encode(bytes: lib.ByteArray): void {
                bytes.writeUTF(this.name);
                bytes.writeUInt(this.id);
            }

            public decode(bytes: lib.ByteArray): void {
                this.name = bytes.readUTF();
                this.id = bytes.readUInt();
            }

            public get value(): any {
                return {
                    name: this.name,
                    id: this.id
                };
            }
        }
    }
}