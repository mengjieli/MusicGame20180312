namespace game {
    export namespace bamaoGame {

        export class TipRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 3) {
                        if (proxy.lastTime <= list[i].time - proxy.tipTime && list[i].time - proxy.tipTime < proxy.time) {
                            //手移动
                            proxy.tweenList.push(
                                lib.Tween.to(proxy.monsterHand, proxy.tipTime / 1000, {
                                    x: proxy.cutPoses[list[i].index].x - 248/2 + 270 / 4,
                                    y: proxy.cutPoses[list[i].index].y - 160/2 + 300 / 4
                                }).call(function () {
                                    //播放提示音效
                                    cc.audioEngine.play(Resource.getResource("rhythmTip"), false, 1);
                                })
                            );
                        }
                    }
                }
            }
        }
    }
}