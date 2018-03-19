namespace game {
    export namespace crg {
        export class Filter {

            protected program: any;
            protected sprite: cc.Sprite;

            constructor(sprite: cc.Sprite) {
                this.createProgram();
                this.sprite = sprite;
                this.sprite._sgNode.setShaderProgram(this.program);
            }

            protected createProgram() {

            }
        }
    }
}