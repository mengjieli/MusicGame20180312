namespace game {
    export namespace bamaoGame {
        export class TipRoundFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 4) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //怪物手退场
                            if (proxy.monsterHand) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.monsterHand, 0.2, {x: -300}).call(
                                        function () {
                                            this.proxy.monsterHand.destroy();
                                            this.proxy.monsterHand = null;
                                        }.bind({
                                            proxy: proxy
                                        })
                                    )
                                )
                            }

                            proxy.gameMonment = GameMoment.NONE;
                        }
                    }
                }
            }
        }
    }
}