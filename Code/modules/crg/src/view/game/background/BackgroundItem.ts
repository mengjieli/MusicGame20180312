namespace game {
    export namespace crg {
        export class BackgroundItem extends cc.Node {

            private data: BackgroundItemData;
            private image: cc.Node;
            private filter: ColorFilter;

            constructor(data: BackgroundItemData) {
                super();
                this.data = data;
                if (data.url) {
                    this.image = DisplayFactory.createImage(ResourceProxy.getResource(data.url));

                    this.addChild(this.image);

                    if (this.data.changeType) {
                        this.data.changeValue.addListener(lib.Event.CHANGE, this.change, this);

                        //色相
                        if (this.data.changeType == 1) {
                            this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 360 * (1 - this.data.changeValue.value), 0, 0);
                        }
                        //灰度
                        if (this.data.changeType == 2) {
                            this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 0, -100.0 * (1 - this.data.changeValue.value), 0);
                        }
                        //渐现
                        if (this.data.changeType == 3) {
                            this.addComponent(cc.Mask);
                            this.anchorX = 0;
                            this.anchorY = 0;
                            let mask = this.getComponent(cc.Mask);
                            mask.type = cc.Mask.Type.RECT;
                            this.width = this.image.width;
                            this.height = 0;
                        }
                    }
                }
            }

            private change() {
                if (this.data.changeType == 1) {
                    DataProxy.data.tweenList.push(lib.Tween.to(this, 0.5, {colorH: (1 - this.data.changeValue.value)}, null, {colorH: (1 - this.data.changeValue.old)}));
                }
                if (this.data.changeType == 2) {
                    DataProxy.data.tweenList.push(lib.Tween.to(this, 0.5, {colorS: (1 - this.data.changeValue.value)}, null, {colorS: (1 - this.data.changeValue.old)}));
                }
                if (this.data.changeType == 3) {
                    DataProxy.data.tweenList.push(lib.Tween.to(this, 2, {height: this.image.height * this.data.changeValue.value}));
                }
            }

            private set colorH(val: number) {
                if (this.filter) {
                    this.filter.dispose();
                }
                this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 360 * val, 0, 0);
            }

            private set colorS(val: number) {
                if (this.filter) {
                    this.filter.dispose();
                }
                this.filter = new ColorFilter(this.image.getComponent(cc.Sprite), 0, -100.0 * val, 0);
            }
        }
    }
}