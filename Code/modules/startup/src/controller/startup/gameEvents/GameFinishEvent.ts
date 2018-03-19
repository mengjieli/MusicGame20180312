namespace game {
    export namespace bamaoGame {
        export class GameFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 9) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            if (proxy.bgm != null) {
                                cc.audioEngine.stop(proxy.bgm);
                                proxy.bgm = null;
                            }

                            //清除动画
                            while (proxy.tweenList.length) {
                                proxy.tweenList.pop().dispose();
                            }

                            //弹出结果内容
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW,
                                new common.CloseViewNB(MainMediator.NAME));
                            mainMediator.sendNotification(common.Command.CHANGE_SCENE,
                                new common.ChangeSceneNB("bamaoResult", {
                                    score: proxy.score,
                                    perfect: proxy.perfect,
                                    good: proxy.good,
                                    miss: proxy.miss
                                }));
                        }
                    }
                }
            }
        }
    }
}