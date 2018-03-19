namespace game {
    export namespace runGame {

        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        export class GameStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {

                    proxy.monsterNode = new cc.Node();
                    proxy.node.addChild(proxy.monsterNode);


                    proxy.player = new Effect(Resource.getResource("playerRun"), true);
                    proxy.player.y = -380;
                    proxy.player.x = -200;
                    proxy.node.addChild(proxy.player);

                    //添加操作层
                    if (!proxy.operateNode) {
                        let operateNode = new cc.Node();
                        proxy.operateNode = operateNode;
                        proxy.node.addChild(operateNode);
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

                    proxy.bgm = cc.audioEngine.play(Resource.getResource("bgm"), true, 0.05);
                }
            }
        }
    }
}