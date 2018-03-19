namespace game {
    export namespace bamaoGame {

        /**
         * 一轮操作开始
         */
        export class TipRoundStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 2) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手进场
                            let monsterHand = new cc.Node();
                            monsterHand.addComponent(cc.Sprite);
                            let sprite = monsterHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("monsterHand"));
                            proxy.node.addChild(monsterHand);
                            monsterHand.x = -320;
                            proxy.monsterHand = monsterHand;

                            proxy.gameMonment = GameMoment.TIP;
                        }
                    }
                }
            }
        }
    }
}