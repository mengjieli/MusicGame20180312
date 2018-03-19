namespace game {
    export namespace runGame {
        export class OperateRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let findNext = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if ((list[i].time - 2000) >= proxy.lastTime && (list[i].time - 2000) < proxy.time) {
                            // console.log("出现节奏!")
                            let monster = new Effect(Resource.getResource("monster" + ((~~(3 * Math.random())) + 1)), true);
                            proxy.monsterNode.addChild(monster);
                            monster.x = proxy.player.x + 2000 * proxy.timeSpeed / 1000;
                            monster.y = proxy.player.y;
                            monster.opacity = 0;
                            monster.scaleX = 0;
                            monster.scaleY = 0;
                            monster.data = list[i];
                            proxy.monsters.push(monster);
                        }
                    }
                }
                for (let i = 0; i < proxy.monsters.length; i++) {
                    let last = proxy.monsters[i].x;
                    proxy.monsters[i].x -= (proxy.time - proxy.lastTime) * proxy.timeSpeed / 1000;
                    if (last >= 600 - 320 && proxy.monsters[i].x < 600 - 320) {
                        lib.Tween.to(proxy.monsters[i], 0.3, {opacity: 255, scaleX: 1, scaleY: 1});
                        cc.audioEngine.play(Resource.getResource("rhythm" + proxy.monsters[i].data.music), false, 1);
                    }
                }
            }
        }
    }
}