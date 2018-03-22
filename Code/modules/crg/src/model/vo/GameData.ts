namespace game {
    export namespace crg {
        export class GameData {

            /**
             * 关卡 id
             */
            public level: number;

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
             * 游戏是否结束
             * @type {boolean}
             */
            public gameOver = false;

            /**
             * 背景数据
             * @type {game.crg.BackgroundData}
             */
            public groundData: BackgroundData = new BackgroundData();

            //显示相关的对象
            //根对象
            public root: cc.Node;

            //怪物层
            public monsterLayer: cc.Node;

            public playerLayer: cc.Node;

            //角色
            public player: Effect;

            //怪物
            public monsters: any[] = [];

            //动画
            public tweenList: lib.Tween[] = [];

            //点击
            public clickFlag: boolean = false;

            //记录是否操作过
            public operate: any = {};
            //记录怪兽是否出现过
            public monsterShow: any = {};

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
            //连续 perfect
            public continuousPerfect: number = 0;

            //最大血量
            public maxHp: number = 3;
            //血量
            public hp: lib.IntValue = new lib.IntValue(3);

            //背景音乐
            public bgm: any;

            //记录配置最大时间
            public configTime: number;

            public progress: number = 0;
            public progressAll: number = 0;

            public config:any;
        }
    }
}