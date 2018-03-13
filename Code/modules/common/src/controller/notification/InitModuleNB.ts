namespace game {
    export namespace common {
        export class InitModuleNB {

            private _rootView: cc.Node;
            private _progress: any;

            constructor(rootView: cc.Node,progress: any) {
                this._rootView = rootView;
                this._progress = progress;
            }

            public get rootView(): cc.Node {
                return this._rootView;
            }

            public get progress(): any {
                return this._progress;
            }
        }
    }
}