namespace game {
    export namespace common {

        export class ChangeSceneNB {

            private _sceneName: string;
            private _data: any;

            constructor(sceneName: string, data: any = null) {
                this._sceneName = sceneName;
                this._data = data;
            }

            public get sceneName(): string {
                return this._sceneName;
            }

            public get data():any {
                return this._data;
            }
        }
    }
}