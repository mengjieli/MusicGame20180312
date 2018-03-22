namespace game {
    export namespace crg {
        export class OperateEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                let list = data.config;
                let find = false;
                let perfectTime = ConfigProxy.getConfig("perfectTime");
                let goodTime = ConfigProxy.getConfig("goodTime");
                let missTime = ConfigProxy.getConfig("missTime");
                if (data.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!data.operate[list[i].id] && Math.abs(data.time - list[i].time) < missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(data.time - list[i].time) < perfectTime) { //perfect
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Perfect"
                                    });
                                    //删除节拍对象
                                    this.pressOK(list[i]);
                                    this.showOperateText("Perfect");
                                    this.checkHp(true, true);
                                } else if (Math.abs(data.time - list[i].time) < goodTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Good"
                                    });
                                    //删除节拍对象
                                    this.pressOK(list[i]);
                                    this.showOperateText("Good");
                                    this.checkHp(true);
                                } else if (Math.abs(data.time - list[i].time) < missTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Miss"
                                    });
                                    this.showOperateText("Miss");
                                    this.checkHp(false);
                                }
                                find = true;
                                data.operate[list[i].time] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find) {
                        mainMediator.sendNotification(Command.IN.OPERATE, {data: null, operateType: "OutMiss"});
                        this.showOperateText("Miss");
                        this.checkHp(false);
                    }
                    data.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!data.operate[list[i].time] && data.time - list[i].time > missTime) {
                            mainMediator.sendNotification(Command.IN.OPERATE, {data: null, operateType: "AutoMiss"});
                            data.operate[list[i].time] = true;
                            this.showOperateText("Miss");
                            this.checkHp(false);
                        }
                    }
                }
            }

            private checkHp(flag: boolean, perfect: boolean = false): void {
                if (flag == false) {
                    if (DataProxy.data.hp.value) {
                        DataProxy.data.hp.value = DataProxy.data.hp.value - 1;
                    }
                    DataProxy.data.continuousPerfect = 0;
                    //游戏结束，失败!
                    if (!DataProxy.data.hp.value) {
                        mainMediator.sendNotification(Command.IN.GAME_OVER,false);
                    }
                } else {
                    if (perfect) {
                        DataProxy.data.continuousPerfect++;
                        if (DataProxy.data.continuousPerfect &&
                            DataProxy.data.continuousPerfect % ConfigProxy.getConfig("addHp") == 0 &&
                            DataProxy.data.hp.value < DataProxy.data.maxHp) {
                            DataProxy.data.hp.value++;
                        }
                    } else {
                        DataProxy.data.continuousPerfect = 0;
                    }
                }
            }

            private showOperateText(type: string) {
                //显示 perfect good 文字
                let node = new cc.Node();
                node.x = DataProxy.data.player.x + 20 - (40 * Math.random());
                node.y = DataProxy.data.player.y - 80 + 20 - (40 * Math.random());
                // node.rotation = 10 - Math.random() * 20;
                DataProxy.data.root.addChild(node);
                node.addComponent(cc.Label);
                node.color = new cc.Color(100 + 155 * Math.random(), 100 + 155 * Math.random(), 100 + 155 * Math.random());
                let label = node.getComponent(cc.Label);
                label.string = type;
                DataProxy.data.tweenList.push(lib.Tween.to(node, 0.5 + 0.2 * Math.random(), {
                    opacity: 0,
                    x: node.x + 100 - 200 * Math.random(),
                    y: node.y - 100 * Math.random()
                }).call(
                    function () {
                        node.destroy();
                    }
                ));
            }

            private pressOK(cfg: any, type: string = "") {
                //删除节拍对象
                let monsters = DataProxy.data.monsters;
                for (let i = 0; i < monsters.length; i++) {
                    if (monsters[i].data == cfg) {
                        let monster = monsters[i];
                        monster.destroy();
                        monsters.splice(i, 1);

                        //显示特效
                        let effect = new Effect(ResourceProxy.getResource("pressok"));
                        effect.x = DataProxy.data.player.x;
                        effect.y = DataProxy.data.player.y - 80;
                        DataProxy.data.monsterLayer.addChild(effect);
                        break;
                    }
                }
            }
        }
    }
}