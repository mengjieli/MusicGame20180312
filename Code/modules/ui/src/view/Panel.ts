namespace game {
    export namespace ui {

        export class Panel extends cc.Component {

            private _scaleMode: number;

            constructor(scaleMode: number = 1) {
                super();
                this._scaleMode = scaleMode;
            }

            public get scaleMode(): number {
                return this._scaleMode;
            }

            public set scaleMode(val: number) {
                this._scaleMode = ~~val;
            }

            onLoad() {
                var size = lib.data.system.screen.value;
                var width = this.node.width || SettingProxy.designWidth;
                var height = this.node.height || SettingProxy.designHeight;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    } else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            }
        }
    }
}