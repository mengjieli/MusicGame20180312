namespace game {
    export namespace crg {
        export class GameUI extends cc.Node {

            private combo: cc.Node;
            private operate: cc.Node;

            constructor() {
                super();

                let node = new cc.Node();
                this.combo = node;
                this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 60;
                node.addComponent(cc.Label);
                let label = node.getComponent(cc.Label);
                label.string = "";

                node = new cc.Node();
                this.operate = node;
                this.addChild(node);
                node.y = lib.data.system.screen.height / 2 - 140;
                node.addComponent(cc.Label);
                label = node.getComponent(cc.Label);
                label.string = "";
            }

            public showCombo(val: number) {
                if (val) {
                    this.combo.getComponent(cc.Label).string = "Combo " + val;
                    lib.Tween.to(this.combo, 0.2, {
                        opacity: 255,
                        scaleX: 1,
                        scaleY: 1
                    }, null, {
                        opacity: 150,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                } else {
                    this.combo.getComponent(cc.Label).string = "";
                }
            }

            public showOperateResult(type: string) {
                this.operate.getComponent(cc.Label).string = type;
                lib.Tween.to(this.operate, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 0
                }, null, {scaleX: 1, scaleY: 1, opacity: 255});
            }
        }
    }
}