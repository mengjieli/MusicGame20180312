namespace game {
    export namespace bamaoGame {

        /**
         * 序列帧特效
         */
        export class Effect extends cc.Node {

            frameTime: number;
            pictures: cc.Texture2D[];
            length: number;
            loop: any;
            frame: number;

            /**
             * @param config
             * {
             *    "pictures":[]
             *    "frameTime":16,
             *    "loop":false //默认false
             * }
             */
            constructor(config: any) {
                super();
                this.frameTime = config.frameTime;
                this.pictures = config.pictures;
                this.length = this.pictures.length;
                this.loop = !!config.loop;
                this.frame = 0;

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