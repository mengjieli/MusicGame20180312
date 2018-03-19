namespace game {
    export namespace runGame {
        export class RoundProxy {

            public node: cc.Node;

            //combo数
            public combo: number = 0;
            //分数
            public score: number = 0;
            //perfect
            public perfect: number = 0;
            //good
            public good: number = 0;
            //miss
            public miss: number = 0;
            //bgm
            public bgm: any = null;
            //tweenList
            public tweenList: lib.Tween[] = [];


            /**
             * perfect 判定时间
             * @type {number}
             */
            public perfectTime: number = ConfigProxy.getConfig("perfectTime");
            /**
             * good 判定时间
             * @type {number}
             */
            public goodTime: number = ConfigProxy.getConfig("goodTime");
            /**
             * miss 判定时间
             * @type {number}
             */
            public missTime: number = ConfigProxy.getConfig("missTime");

            //生命值
            public life: number = 100;
            //最大生命值
            public maxLife: number = 100;

            public lifeReduceSecond: number = 1;

            public events: GameEvent[] = [];

            public time: number = 0;
            public lastTime: number = 0;

            public clickFlag: boolean = false;

            public background: BackGround;
            public backgroundX: number = 0;
            public pos: number = 0;

            public player: Effect;

            public monsterNode:cc.Node;
            public monsters:Effect[] = [];

            /**
             * 记录某个拍子是否操作过了
             * @type {any[]}
             */
            public operate: any = {};


            /**
             * 操作层
             */
            public operateNode: cc.Node;

            /**
             * combo 文字对象
             */
            public comboNode: cc.Node;

            /**
             * 每秒移动多少像素
             * @type {number}
             */
            public timeSpeed: number = 300;

            //最大操作配置时间
            public configTime:number;
            public config: any[] = [ //拍子
                {
                    operate: 0,  //游戏开始
                    time: 0,
                },
                {
                    operate: 6,
                    time: 3000,
                    index: 0
                },
                {
                    operate: 6,
                    time: 4000,
                    index: 1
                },
                {
                    operate: 6,
                    time: 5000,
                    index: 2
                },
                {
                    operate: 6,
                    time: 6000,
                    index: 3
                },

                //第二关
                {
                    operate: 6,
                    time: 8000,
                    index: 0
                },
                {
                    operate: 6,
                    time: 9000,
                    index: 2
                }
            ];

        }
    }
}