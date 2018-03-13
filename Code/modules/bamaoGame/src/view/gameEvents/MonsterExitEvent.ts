namespace game {
    export namespace bamaoGame {
        export class MonsterExitEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 8) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物退场动画
                            if (proxy.monster) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.monster, 0.2, {x: -640}, lib.Ease.SINE_EASE_IN_OUT).call(
                                        function () {
                                            proxy.monster.destroy();
                                            proxy.monster = null;
                                        }
                                    )
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}