namespace game {
    export namespace bamaoGame {
        export class OperateRoundFinishEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 7) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {

                            proxy.gameMonment = GameMoment.NONE;

                            //怪物手退场
                            if (proxy.doctorHand) {
                                proxy.tweenList.push(
                                    lib.Tween.to(proxy.doctorHand, 0.2, {y: -600}).call(
                                        function () {
                                            this.proxy.doctorHand.destroy();
                                            this.proxy.doctorHand = null;
                                        }.bind({
                                            proxy: proxy
                                        })
                                    )
                                )

                                if (proxy.operateNode) {
                                    proxy.operateNode = null;
                                }
                                if(proxy.comboNode) {
                                    proxy.comboNode.destroy();
                                    proxy.comboNode = null;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}