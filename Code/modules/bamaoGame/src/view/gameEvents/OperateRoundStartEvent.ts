namespace game {
    export namespace bamaoGame {

        /**
         * 一轮游戏
         */
        export class OperateRoundStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 5) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {

                            proxy.gameMonment = GameMoment.OPERATE;

                            //医生手进场
                            let doctorHand = new cc.Node();
                            doctorHand.addComponent(cc.Sprite);
                            let sprite = doctorHand.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("doctorHand"));
                            proxy.node.addChild(doctorHand);
                            doctorHand.y = -600;
                            proxy.lastHandTime = proxy.time;
                            proxy.lastHandX = doctorHand.x;
                            proxy.lastHandY = doctorHand.y;

                            //添加绷带
                            let band = new cc.Node();
                            band.addComponent(cc.Sprite);
                            let bandSprite = band.getComponent(cc.Sprite);
                            bandSprite.spriteFrame = new cc.SpriteFrame();
                            bandSprite.spriteFrame.setTexture(Resource.getResource("band"));
                            doctorHand.addChild(band);
                            // band.y = 50;

                            proxy.doctorHand = doctorHand;
                            proxy.tweenList.push(
                                lib.Tween.to(proxy.doctorHand, 0.2, {y: -480})
                            );

                            //添加操作层
                            if (!proxy.operateNode) {
                                let operateNode = new cc.Node();
                                proxy.operateNode = operateNode;
                                proxy.monster.addChild(operateNode);
                            }

                            //添加combo文字
                            if (!proxy.comboNode) {
                                let comboNode = new cc.Node();
                                comboNode.y = 400;
                                comboNode.color = new cc.Color(0, 0, 0);
                                comboNode.addComponent(cc.Label);
                                comboNode.getComponent(cc.Label).string = proxy.combo ? "combo" + proxy.combo : "";
                                proxy.node.addChild(comboNode);
                                proxy.comboNode = comboNode;
                            }
                        }
                    }
                }
            }
        }
    }
}