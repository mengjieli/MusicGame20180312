namespace game {
    export namespace jumpGame {
        export class Player extends cc.Node {

            id:string;

            constructor(id:string=null) {
                super();

                this.id = id||lib.Help.getuuid();

                var node = new cc.Node();
                this.addChild(node);
                node.width = node.height = 20;
                node.addComponent(cc.Label);
                var label: cc.Label = node.getComponent(cc.Label);
                label.fontSize = 12;
                label.string = "P";
                node.x = this.x;
                node.y = -160 + this.y;
                this.player = node;

                var xTxt = new cc.Node();
                xTxt.anchorX = 0;
                this.addChild(xTxt);
                xTxt.x = -400 / 2;
                xTxt.y = -360 / 2;
                xTxt.addComponent(cc.Label);
                var xLabel = xTxt.getComponent(cc.Label);
                xLabel.fontSize = 14;
                xLabel.string = "x: " + this.x;
                this.xLabel = xLabel;

                var yTxt = new cc.Node();
                this.addChild(yTxt);
                yTxt.anchorX = 0;
                yTxt.x = -400 / 2;
                yTxt.y = -400 / 2;
                yTxt.addComponent(cc.Label);
                var yLabel = yTxt.getComponent(cc.Label);
                yLabel.fontSize = 14;
                yLabel.string = "y: " + this.y;
                this.yLabel = yLabel;
            }

            _left = false;
            _up = false;
            _right = false;

            get left(): boolean {
                return this._left;
            }

            set left(val: boolean) {
                if (val == this._left) return;
                this._left = val;
            }

            get right(): boolean {
                return this._right;
            }

            set right(val: boolean) {
                if (val == this._right) return;
                this._right = val;
            }

            get up(): boolean {
                return this._up;
            }

            set up(val: boolean) {
                if (val == this._up) return;
                this._up = val;
                this.vy = 4;
            }

            updateControl() {
                if (this.right) { //向左
                    this.vx = 2;
                } else if (this.left) { //向左
                    this.vx = -2;
                }
            }


            posx = 0;
            posy = 0;
            vx = 0;
            vy = 0;
            ax = -0.1;
            ay = 0;
            g = -0.2;
            axz = 0;
            player: cc.Node;
            xLabel: cc.Label;
            yLabel: cc.Label;

            loop(): void {
                this.updateControl();
                // this.vx += this.ax;
                // this.vy += this.ay;
                this.posx += this.vx;
                this.posy += this.vy;
                if (this.posy > 0) {
                    this.vy += this.g;
                } else {
                    if (this.vx > 0) {
                        this.vx += this.ax;
                        if (this.vx < 0) {
                            this.vx = 0;
                        }
                    }
                    if (this.vx < 0) {
                        this.vx -= this.ax;
                        if (this.vx > 0) {
                            this.vx = 0;
                        }
                    }
                }
                if (this.posy < 0) {
                    this.posy = 0;
                    this.ay = 0;
                }
                this.player.x = this.posx;
                this.player.y = this.posy - 160;
                this.xLabel.string = "x: " + ~~this.posx;
                this.yLabel.string = "y: " + ~~this.posy;
            }

            update() {
            }
        }
    }
}