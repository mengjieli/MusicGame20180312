namespace game {
    export namespace crg {
        export class GameData {

            /**
             * 移动的位置
             * @type {number}
             */
            public position: number = 0;

            /**
             * 当前帧改变距离
             * @type {number}
             */
            public currentMovePosition: number = 0;

            /**
             * 移动的时间
             * @type {number}
             */
            public time: number = 0;

            /**
             * 上一次移动的时间
             * @type {number}
             */
            public lastTime: number = 0;

            /**
             * 背景数据
             * @type {game.crg.BackgroundData}
             */
            public groundData: BackgroundData = new BackgroundData();

            //显示相关的对象
            //根对象
            public root: cc.Node;

            //怪物层
            public monsterLayer:cc.Node;

            public playerLayer:cc.Node;

            //角色
            public player: Effect;

            //怪物
            public monsters: any[] = [];

            //动画
            public tweenList:lib.Tween[] = [];

            //点击
            public clickFlag:boolean = false;

            //记录是否操作过
            public operate:any = {};
            //记录怪兽是否出现过
            public monsterShow:any = {};

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

            //背景音乐
            public bgm:any;

            //记录配置最大时间
            public configTime:number;
            public config: any[] = [ //拍子
                {
                    id: 0,
                    operate: 6,
                    time: 3000,
                    index: 0,
                    event:3
                },
                {
                    id: 1,
                    operate: 6,
                    time: 4000,
                    index: 1,
                    event:3
                },
                {
                    id: 2,
                    operate: 6,
                    time: 5000,
                    index: 2,
                    event:3
                },
                {
                    id: 3,
                    operate: 6,
                    time: 6000,
                    index: 3,
                    event:3
                },

                //第二关
                {
                    id: 4,
                    operate: 6,
                    time: 8000,
                    index: 0,
                    event:3
                },
                {
                    id: 5,
                    operate: 6,
                    time: 9000,
                    index: 2,
                    event:3
                }
            ];
        }
    }
}