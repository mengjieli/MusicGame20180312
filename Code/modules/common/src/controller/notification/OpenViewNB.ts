namespace game {
    export namespace common {
        export class OpenViewNB {

            private _name: string;
            private _data: null;

            constructor(name: string, data: any = null) {
                this._name = name;
                this._data = data;
            }

            public get name(): string {
                return this._name;
            }

            public get data(): any {
                return this._data;
            }
        }
    }
}