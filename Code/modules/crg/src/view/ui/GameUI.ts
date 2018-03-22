namespace game {
    export namespace crg {
        export class GameUI extends cc.Node {

            private combo: cc.Node;
            private operate: cc.Node;
            private hearts: cc.SpriteFrame[];

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

                this.hearts = [];
                let data = DataProxy.data;
                for (let i = 0; i < data.maxHp; i++) {
                    let node = new cc.Node();
                    node.anchorX = 0;
                    node.anchorY = 1;
                    node.x = -lib.data.system.screen.width / 2 + 10 + i * 70;
                    node.y = lib.data.system.screen.height / 2 - 10;
                    this.addChild(node);
                    node.addComponent(cc.Sprite);
                    let sprite = node.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame();
                    sprite.spriteFrame.setTexture(ResourceProxy.getResource("heart"));
                    this.hearts.push(sprite.spriteFrame);
                }
                data.hp.addListener(lib.Event.CHANGE, this.onHpChange, this);
            }

            private onHpChange(e: lib.Event): void {
                let data = DataProxy.data;
                for (let i = 0; i < data.maxHp; i++) {
                    if (i + 1 <= data.hp.value) {
                        this.hearts[i].setTexture(ResourceProxy.getResource("heart"));
                    } else {
                        this.hearts[i].setTexture(ResourceProxy.getResource("heart2"));
                    }
                }
            }

            public showCombo(val: number) {
                if (val) {
                    this.combo.getComponent(cc.Label).string = "Combo " + val;
                    DataProxy.data.tweenList.push(lib.Tween.to(this.combo, 0.2, {
                        opacity: 255,
                        scaleX: 1,
                        scaleY: 1
                    }, null, {
                        opacity: 150,
                        scaleX: 0.5,
                        scaleY: 0.5
                    }));
                } else {
                    this.combo.getComponent(cc.Label).string = "";
                }
            }
        }
    }
}