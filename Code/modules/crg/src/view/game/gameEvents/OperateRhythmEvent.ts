namespace game {
    export namespace crg {
        export class OperateRhythmEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                let list = data.config;
                let findNext = false;
                let speed = ConfigProxy.getConfig("timeSpeed");
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6 && list[i].time >= data.lastTime && list[i].time < data.time) {
                        DataProxy.data.progress++;
                    }
                    if (list[i].operate == 6 && !data.monsterShow[list[i].time]) {
                        if ((list[i].time - 5000 < 0 || (list[i].time - 5000) >= data.lastTime) && (list[i].time - 5000) < data.time) {
                            let node = new cc.Node();
                            let monster: any = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            let sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(ResourceProxy.getResource("monster" + ((~~(6 * Math.random())) + 1)));
                            data.monsterLayer.addChild(node);
                            node.addChild(monster);
                            node.x = data.player.x + (10 * Math.random()) + (list[i].time - data.time) * speed / 1000;
                            node.y = data.player.y;
                            monster.opacity = 0;
                            monster.scaleX = 0;
                            monster.scaleY = 0;
                            monster.parentNode = node;
                            monster.data = list[i];
                            data.monsters.push(monster);
                            data.monsterShow[list[i].time] = true;
                        }
                    }
                }
                for (let i = 0; i < data.monsters.length; i++) {
                    let last = data.monsters[i].parentNode.x;
                    data.monsters[i].parentNode.x -= (data.time - data.lastTime) * speed / 1000;
                    if ((last >= lib.data.system.screen.width - 50 && data.monsters[i].parentNode.x < lib.data.system.screen.width - 50) || data.monsters[i].parentNode.x < lib.data.system.screen.width - 100 && !list[i].tween) {
                        DataProxy.data.tweenList.push(list[i].tween = lib.Tween.to(data.monsters[i], 1.5, {
                                opacity: 255,
                                scaleX: 0.75,
                                scaleY: 0.75,
                                x: 0,
                                y: 0
                            }, lib.Ease.CIRC_EASE_OUT,
                            {
                                x: 200,
                                y: 200
                            }));
                        cc.audioEngine.play(ResourceProxy.getResource("rhythm" + data.monsters[i].data.music), false, 1);
                    }
                }
                for (let i = 0; i < data.monsters.length; i++) {
                    if (data.monsters[i].parentNode.x < 0) {
                        data.monsters[i].destroy();
                        data.monsters.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }
}