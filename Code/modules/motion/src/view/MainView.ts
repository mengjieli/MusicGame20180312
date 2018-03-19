namespace game {
    export namespace motion {
        export class MainView extends cc.Node {

            private time: number;
            private bg1: cc.Node;
            private bg2: cc.Node;
            private rect1: cc.Node;
            private _rect1Size: number;
            private _rect1Rot: number;
            private _rect1Alpha: number;
            private rect2: cc.Node;
            private _rect2Size: number;
            private _rect2Rot: number;
            private _rect2Alpha: number;

            constructor() {
                super();

                //绘制背景
                this.addComponent(cc.Graphics);
                let gp = this.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0x31223b >> 16, 0x31223b >> 8 & 0xFF, 0x31223b & 0xFF);
                gp.fillRect(-320, -480, 640, 960);

                this.bg1 = new cc.Node();
                this.addChild(this.bg1);
                this.bg1.addComponent(cc.Graphics);
                gp = this.bg1.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0xe53331 >> 16, 0xe53331 >> 8 & 0xFF, 0xe53331 & 0xFF);
                gp.moveTo(-320, -480);
                gp.lineTo(960 - 320, 480);
                gp.lineTo(960 - 320 + 640 + 320, 480);
                gp.lineTo(-320 + 640 + 320, -480);
                gp.lineTo(-320, -480);
                gp.fill();
                gp.moveTo(-320 - 1280 - 640, -480);
                gp.lineTo(960 - 320 - 1280 - 640, 480);
                gp.lineTo(960 - 320 + 640 + 320 - 1280 - 640, 480);
                gp.lineTo(-320 + 640 + 320 - 1280 - 640, -480);
                gp.lineTo(-320 - 1280 - 640, -480);
                gp.fill();

                this.bg2 = new cc.Node();
                this.addChild(this.bg2);
                this.bg2.addComponent(cc.Graphics);
                gp = this.bg2.getComponent(cc.Graphics);
                gp.fillColor = new cc.Color(0xefcf3e >> 16, 0xefcf3e >> 8 & 0xFF, 0xefcf3e & 0xFF);
                gp.moveTo(-320, 480);
                gp.lineTo(-320 + 100, 480);
                gp.lineTo(-320 + 100 + 960, 480 - 960);
                gp.lineTo(-320 + 960, 480 - 960);
                gp.lineTo(-320, 480);
                gp.fill();
                gp.moveTo(-320 - 2560, 480);
                gp.lineTo(-320 + 100 - 2560, 480);
                gp.lineTo(-320 + 100 + 960 - 2560, 480 - 960);
                gp.lineTo(-320 + 960 - 2560, 480 - 960);
                gp.lineTo(-320 - 2560, 480);
                gp.fill();
                this.bg2.x = -1280;

                this.rect1 = new cc.Node();
                this.addChild(this.rect1);
                this.rect1.addComponent(cc.Graphics);
                gp = this.rect1.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(255, 255, 255);

                this.rect2 = new cc.Node();
                this.addChild(this.rect2);
                this.rect2.addComponent(cc.Graphics);
                gp = this.rect2.getComponent(cc.Graphics);
                gp.lineWidth = 3;
                gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF);

                this._rect1Size = 0;
                this._rect1Rot = 0;
                this._rect1Alpha = 0;


                let __ = this;
                setTimeout(function () {
                    setInterval(this.update.bind(this), 0.016);
                    lib.Tween.to(__, 0.5, {rect1Size: 600}, lib.Ease.CUBIC_EASE_OUT).call(
                        function () {
                            setTimeout(function () {
                                lib.Tween.to(__, 0.5, {rect1Size: 300}, lib.Ease.BACK_EASE_OUT);
                                lib.Tween.to(__, 0.5, {rect1Rot: 225}, lib.Ease.BACK_EASE_OUT);
                            }, 30);
                        }
                    );
                    lib.Tween.to(__, 0.5, {rect1Rot: 135}, lib.Ease.CUBIC_EASE_OUT);
                    lib.Tween.to(__, 0.5, {rect1Alpha: 255}, lib.Ease.CUBIC_EASE_OUT, {rect1Alpha: 0});

                    setTimeout(function () {
                        __._rect2Size = 0;
                        __._rect2Rot = 0;
                        __._rect2Alpha = 0;
                        lib.Tween.to(__, 0.5, {rect2Size: 600}, lib.Ease.CUBIC_EASE_OUT).call(
                            function () {
                                setTimeout(function () {
                                    lib.Tween.to(__, 0.5, {rect2Size: 400}, lib.Ease.BACK_EASE_OUT);
                                    // lib.Tween.to(__, 0.5, {rect2Rot: 45}, lib.Ease.BACK_EASE_OUT);
                                }, 30);
                            }
                        );
                        lib.Tween.to(__, 0.5, {rect2Rot: 45}, lib.Ease.CUBIC_EASE_OUT);
                        lib.Tween.to(__, 0.5, {rect2Alpha: 255}, lib.Ease.CUBIC_EASE_OUT, {rect1Alpha: 0});
                    }, 530);
                }.bind(this), 200);
            }

            public set rect1Size(val: number) {
                this._rect1Size = val;
                let gp = this.rect1.getComponent(cc.Graphics);
                gp.clear();
                gp.strokeColor = new cc.Color(255, 255, 255, this._rect1Alpha);
                gp.rect(-val / 2, -val / 2, val, val);
                gp.stroke();
            }

            public get rect1Size(): number {
                return this._rect1Size;
            }

            public set rect1Alpha(val: number) {
                this._rect1Alpha = val;
            }

            public get rect1Alpha(): number {
                return this._rect1Alpha;
            }

            public set rect1Rot(val: number) {
                this._rect1Rot = val;
                this.rect1.rotation = val;
            }

            public get rect1Rot(): number {
                return this._rect1Rot;
            }


            public set rect2Size(val: number) {
                this._rect2Size = val;
                let gp = this.rect2.getComponent(cc.Graphics);
                gp.clear();
                gp.strokeColor = new cc.Color(0xe0c23e >> 16, 0xe0c23e >> 8 & 0xFF, 0xe0c23e & 0xFF, this._rect2Alpha);
                gp.rect(-val / 2, -val / 2, val, val);
                gp.stroke();
            }

            public get rect2Size(): number {
                return this._rect2Size;
            }

            public set rect2Alpha(val: number) {
                this._rect2Alpha = val;
            }

            public get rect2Alpha(): number {
                return this._rect2Alpha;
            }

            public set rect2Rot(val: number) {
                this._rect2Rot = val;
                this.rect2.rotation = val;
            }

            public get rect2Rot(): number {
                return this._rect2Rot;
            }

            update() {
                this.bg1.x += 0.15;
                if (this.bg1.x >= 1280 + 640) {
                    this.bg1.x -= 1280 + 640;
                }
                this.bg2.x += 0.3;
                if (this.bg2.x >= 2560) {
                    this.bg2.x -= 2560;
                }
            }
        }
    }
}