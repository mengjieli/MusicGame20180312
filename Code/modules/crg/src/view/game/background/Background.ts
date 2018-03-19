namespace game {
    export namespace crg {
        export class Background extends cc.Component {

            bg1_1: BackgroundContainer;
            bg1_2: BackgroundContainer;
            bg1_3: BackgroundContainer;
            bg2_1: BackgroundContainer;
            bg2_2: BackgroundContainer;
            bg2_3: BackgroundContainer;
            bgs: BackgroundContainer[] = [];

            start() {
                this.bgs.push(this.bg1_3 = new BackgroundContainer(3));
                this.bgs.push(this.bg2_3 = new BackgroundContainer(3));
                this.bgs.push(this.bg1_2 = new BackgroundContainer(2));
                this.bgs.push(this.bg2_2 = new BackgroundContainer(2));
                this.bgs.push(this.bg1_1 = new BackgroundContainer(1));
                this.bgs.push(this.bg2_1 = new BackgroundContainer(1));
                for (let i = 0; i < this.bgs.length; i++) {
                    this.node.addChild(this.bgs[i]);
                }
                this.bg2_1.x = 1334;
                this.bg2_2.x = 1334;
                this.bg2_3.x = 1334;
            }

            update() {
                for (let i = 0; i < this.bgs.length; i++) {
                    if (this.bgs[i].layer == 1) {
                        this.bgs[i].x -= DataProxy.data.currentMovePosition;
                    } else if (this.bgs[i].layer == 2) {
                        this.bgs[i].x -= ~~(DataProxy.data.currentMovePosition * 0.5);
                    }
                    if (this.bgs[i].x <= -1334) {
                        this.bgs[i].x += 1334 * 2;
                    }
                }
            }
        }
    }
}