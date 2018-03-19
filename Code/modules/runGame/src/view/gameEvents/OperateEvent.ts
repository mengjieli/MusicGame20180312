namespace game {
    export namespace runGame {
        export class OperateEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let find = false;
                if (proxy.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[list[i].time] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) { //perfect
                                    this.showOperate(proxy, "Perfect");
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) { //good
                                    this.showOperate(proxy, "Good");
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) { //good
                                    this.showOperate(proxy, "Miss");
                                }
                                find = true;
                                proxy.operate[list[i].time] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find) {
                        this.showOperate(proxy, "OutMiss");
                    }
                    proxy.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[list[i].time] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss");
                            proxy.operate[list[i].time] = true;
                        }
                    }
                }
            }

            showOperate(proxy: RoundProxy, type: string) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                if(!(type == "MISS" || type == "AutoMiss" || type == "OutMiss"))
                cc.audioEngine.play(Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                } else {
                    if (type == "Perfect") {
                        proxy.score += 100;
                        proxy.perfect++;
                    } else if (type == "Good") {
                        proxy.score += 80;
                        proxy.good++;
                    } else if (type == "Miss") {
                        proxy.score += 0;
                        proxy.miss++;
                    } else if (type == "OutMiss") {
                        proxy.miss++;
                    }
                }

                //添加文字
                let node2 = new cc.Node();
                node2.addComponent(cc.Label);
                node2.color = new cc.Color(0, 0, 0);
                node2.y = 200;
                let label = node2.getComponent(cc.Label);
                label.string = type == "AutoMiss" || type == "OutMiss" ? "Miss" : type;
                proxy.operateNode.addChild(node2);
                proxy.tweenList.push(lib.Tween.to(node2, 0.4, {
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 50
                }, null, {opacity: 255}).call(function () {
                    node2.destroy();
                }));


                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                    proxy.comboNode.getComponent(cc.Label).string = "";
                } else {
                    proxy.combo++;
                    proxy.comboNode.getComponent(cc.Label).string = "combo" + proxy.combo;
                    proxy.tweenList.push(lib.Tween.to(proxy.comboNode, 0.2, {
                        opacity: 255,
                    }, null, {
                        opacity: 150
                    }));
                }

            }
        }
    }
}