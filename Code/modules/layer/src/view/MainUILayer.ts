namespace game {
    export namespace layer {
        export class MainUILayer extends cc.Node {
            constructor() {
                super();
                MainUILayer.instance = this;
            }

            private static instance: MainUILayer;

            public static show(node: cc.Node): void {
                if (node.parent != MainUILayer.instance) {
                    MainUILayer.instance.addChild(node);
                }
            }
        }
    }
}