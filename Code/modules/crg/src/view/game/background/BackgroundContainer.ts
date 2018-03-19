namespace game {
    export namespace crg {
        export class BackgroundContainer extends cc.Node {

            private items: BackgroundItem[];
            public layer:number;

            constructor(layer: number) {
                super();
                this.layer = layer;
                this.anchorX = this.anchorY = 0;

                this.items = [];
                let list = DataProxy.data.groundData.items;
                for (let i = 0; i < list.length; i++) {
                    if(list[i].layer == layer) {
                        let item = new BackgroundItem(list[i]);
                        this.items.push(item);
                        this.addChild(item);
                    }
                }
            }
        }
    }
}