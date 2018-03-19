namespace game {
    export namespace crg {
        export class BackgroundItemData {
            //id
            public id: string;

            public url: string;

            /**
             * 层次，1.近景 2.中景 3.远景
             */
            public layer: number;

            /**
             * 变化类型
             */
            public changeType: number;

            /**
             * 变化率
             */
            public changeSpeed: number;

            /**
             * 变化值
             */
            public changeValue: lib.NumberValue = new lib.NumberValue();

            constructor(id: string, url: string, layer: number, changeType: number = 0, changeSpeed: number = 0) {
                this.id = id;
                this.url = url;
                this.layer = layer;
                this.changeType = changeType;
                this.changeSpeed = changeSpeed;
            }

            public isChangeComplete(): boolean {
                if (this.changeType == 0) return true;
                return this.changeValue.value < 1 ? false : true;
            }
        }
    }
}