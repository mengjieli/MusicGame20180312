namespace game {
    export namespace runGame {
        import Graphics = cc.Graphics;

        export class GameUI extends cc.Node {

            private life: Graphics;

            constructor() {
                super();

                let node = new cc.Node();
                node.addComponent(cc.Graphics);
                this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                let graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(100, 100, 100);
                graphics.fillRect(0, 0, 620, 20);

                node = new cc.Node();
                node.addComponent(cc.Graphics);
                this.addChild(node);
                node.anchorX = 0;
                node.anchorY = 1;
                node.x = -310;
                node.y = 440;
                graphics = node.getComponent(cc.Graphics);
                graphics.fillColor = new cc.Color(225, 225 ,225);
                this.life = graphics;
                this.percent = 0.5;
            }

            public set percent(val: number) {
                if(val < 0) val = 0;
                if(val > 1) val = 1;
                this.life.clear();
                this.life.fillRect(0, 0, 620 * val, 20);
            }
        }
    }
}