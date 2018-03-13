namespace game {
    export namespace bamaoGame {
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

            //背景
            public background:cc.Node;
            //怪物图片
            public monster: cc.Node;
            //表情
            public face:cc.Node;
            //提示的手
            public monsterHand: cc.Node;
            //医生的手
            public doctorHand: cc.Node;

            //伤口位置
            public cutPoses: any[];

            /**
             * 处理事件
             */
            public events: GameEvent[] = [];

            /**
             * 上一次的运行时间
             */
            public lastTime: number = 0;

            /**
             * 在提示前多久开始播放手的动画
             * @type {number}
             */
            public tipTime: number = ConfigProxy.getConfig("tipHandTime");
            /**
             * 在操作前多久开始播放提示特效
             * @type {number}
             */
            public operateTipTime: number = ConfigProxy.getConfig("tipEffectTime");

            /**
             * 是否有点击
             * @type {boolean}
             */
            public clickFlag: boolean = false;

            /**
             * 记录某个拍子是否操作过了
             * @type {any[]}
             */
            public operate: any[] = [];

            /**
             * 操作层
             */
            public operateNode: cc.Node;

            /**
             * combo 文字对象
             */
            public comboNode: cc.Node;

            /**
             * 游戏当前运行时间
             */
            public time: number = 0;

            public lastHandX: number;
            public lastHandY: number;
            public lastHandTime: number;
            public handX: number;
            public handY: number;

            //表情切换时间
            public faceChangeTime = ConfigProxy.getConfig("faceChangeTime");

            /**
             * 游戏阶段
             * tip 演示阶段
             * operate 操作阶段
             * @type {string}
             */
            public gameMonment: string = "";

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

            public config: any[] = [ //拍子
                {
                    operate: 1, //怪物进场
                    time: 0,
                    cut: 4
                },
                {
                    operate: 2, //提示轮开始
                    time: 700
                },
                {
                    operate: 3,
                    time: 1000,
                    index: 0
                },
                {
                    operate: 3,
                    time: 2000,
                    index: 1
                },
                {
                    operate: 3,
                    time: 3000,
                    index: 2
                },
                {
                    operate: 3,
                    time: 4000,
                    index: 3
                },
                {
                    operate: 4, //提示轮结束
                    time: 5000
                },
                {
                    operate: 5, //操作轮开始
                    time: 6000
                },
                {
                    operate: 6,
                    time: 7000,
                    index: 0
                },
                {
                    operate: 6,
                    time: 8000,
                    index: 1
                },
                {
                    operate: 6,
                    time: 9000,
                    index: 2
                },
                {
                    operate: 6,
                    time: 10000,
                    index: 3
                },
                {
                    operate: 7, //操作轮结束
                    time: 13000
                },
                {
                    operate: 8, //怪物退场
                    time: 14000
                },

                //第二关
                {
                    operate: 1, //怪物进场
                    time: 15000,
                    cut: 3
                },
                {
                    operate: 2, //提示轮开始
                    time: 16000
                },
                {
                    operate: 3,
                    time: 17000,
                    index: 0
                },
                {
                    operate: 3,
                    time: 18000,
                    index: 2
                },
                {
                    operate: 4, //提示轮结束
                    time: 19000
                },
                {
                    operate: 5, //操作轮开始
                    time: 20000
                },
                {
                    operate: 6,
                    time: 21000,
                    index: 0
                },
                {
                    operate: 6,
                    time: 22000,
                    index: 2
                },
                {
                    operate: 7, //操作轮结束
                    time: 25000
                },
                {
                    operate: 8, //怪物退场
                    time: 26000
                },


                {
                    operate: 9, //游戏结束
                    time: 27000
                }
            ];

        }
    }
}