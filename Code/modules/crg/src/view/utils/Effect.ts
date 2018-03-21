namespace game {
    export namespace crg {

        /**
         * 序列帧特效
         */
        export class Effect extends cc.Node {

            frameTime: number;
            pictures: cc.Texture2D[];
            length: number;
            loop: any;
            frame: number;

            data: any;

            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            constructor(config: any, loop: boolean = null) {
                super();
                this.frameTime = config.frameTime;
                this.pictures = config.pictures;
                this.length = this.pictures.length;
                this.loop = loop != null ? loop : !!config.loop;
                this.frame = 0;
                if (config.scaleX != null) {
                    this.scaleX = config.scaleX;
                }
                if (config.scaleY != null) {
                    this.scaleY = config.scaleY;
                }
                if (config.anchorX != null) {
                    this.anchorX = config.anchorX;
                }
                if (config.anchorY != null) {
                    this.anchorY = config.anchorY;
                }


                this.update = this.update.bind(this);

                this.addComponent(cc.Sprite);
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.schedule(this.update, this.frameTime / 1000, 10000000000);

                this.update();
            }

            update() {
                let sprite = this.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(this.pictures[this.frame]);
                this.frame++;
                if (this.frame >= this.length) {
                    this.frame = 0;
                    if (this.loop == false) {
                        this.destroy();
                    }
                }
            }

            destroy(): boolean {
                this.getComponent(cc.Sprite).unschedule(this.update);
                super.destroy();
                return true;
            }
        }
    }
}