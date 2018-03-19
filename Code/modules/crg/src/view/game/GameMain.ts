namespace game {
    export namespace crg {
        export class GameMain extends cc.Component {

            private events: GameEvent[];

            start() {
                DataProxy.data.config = ConfigProxy.getGameConfig();
                DataProxy.data.configTime = ConfigProxy.getLevelConfigTime(DataProxy.data.config);
                DataProxy.data.root = this.node;
                this.node.x = -lib.data.system.screen.width / 2;
                this.node.y = -lib.data.system.screen.height / 2;
                this.events = [
                    new GameStartEvent(),
                    new OperateRhythmEvent(),
                    new OperateEvent()
                ];
                DataProxy.data.monsterLayer = new cc.Node();
                DataProxy.data.root.addChild(DataProxy.data.monsterLayer);
                DataProxy.data.playerLayer = new cc.Node();
                DataProxy.data.root.addChild(DataProxy.data.playerLayer);

                //添加点击事件
                let node = new cc.Node();
                DataProxy.data.root.addChild(node);
                node.addComponent(cc.Sprite);
                node.scaleX = lib.data.system.screen.width;
                node.scaleY = lib.data.system.screen.height;
                node.opacity = 0;
                let sprite = node.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(ResourceProxy.getResource("click"));
                node.on(cc.Node.EventType.TOUCH_START, function () {
                    DataProxy.data.clickFlag = true;
                }, this);
            }

            update() {
                if (DataProxy.data.configTime - 10000 >= DataProxy.data.lastTime && DataProxy.data.configTime - 10000 < DataProxy.data.time) {
                    DataProxy.data.config = ConfigProxy.addGameConfig(DataProxy.data.config);
                    DataProxy.data.configTime = ConfigProxy.getLevelConfigTime(DataProxy.data.config);
                }
                DataProxy.data.lastTime = DataProxy.data.time;
                DataProxy.data.time += lib.CoreTime.lastTimeGap;
                DataProxy.data.currentMovePosition = ~~(16 * ConfigProxy.getConfig("moveSpeed") / 1000);
                DataProxy.data.position += DataProxy.data.currentMovePosition;
                for (let i = 0; i < this.events.length; i++) {
                    this.events[i].execute();
                }
            }
        }
    }
}