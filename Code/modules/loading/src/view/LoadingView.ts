namespace game {
    export namespace loading {
        export class LoadingView extends cc.Node {

            private label: cc.Label;

            constructor() {
                super();
                this.addComponent(cc.Label);
                this.label = this.getComponent(cc.Label);
                this.label.fontSize = 12;
                this.color = new cc.Color(255, 255, 255);
            }

            public set text(val: string) {
                this.label.string = val;
            }
        }
    }
}