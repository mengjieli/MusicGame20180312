namespace game {
    export namespace layer {
        export class GameLayer extends cc.Node {

            constructor() {
                super();
                GameLayer.instance = this;
            }

            private static instance: GameLayer;

            public static show(node: cc.Node): void {
                if (node.parent != GameLayer.instance) {
                    GameLayer.instance.addChild(node);
                }
            }
        }
    }
}