namespace game {
    export namespace crg {
        export class DisplayFactory {

            public static createImage(texture2d: cc.Texture2D): cc.Node {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;
                node.anchorY = 0;
                let sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(texture2d);
                return node;
            }
        }
    }
}