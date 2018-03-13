namespace game {
    export namespace bamaoGame {
        export class OperateEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let find = false;
                if (proxy.clickFlag) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].operate == 6) {
                            if (!proxy.operate[i] && Math.abs(proxy.time - list[i].time) < proxy.missTime) {
                                //如果操作时间在时间点 100 毫秒 - 200 毫秒之外是 good，0 － 100 毫秒是 perfect，200 - 300 是 miss
                                if (Math.abs(proxy.time - list[i].time) < proxy.perfectTime) { //perfect
                                    this.showOperate(proxy, "Perfect", proxy.cutPoses[list[i].index]);
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.goodTime) { //good
                                    this.showOperate(proxy, "Good", proxy.cutPoses[list[i].index]);
                                } else if (Math.abs(proxy.time - list[i].time) < proxy.missTime) { //good
                                    this.showOperate(proxy, "Miss", proxy.cutPoses[list[i].index]);
                                }
                                find = true;
                                proxy.operate[i] = true;
                                break;
                            }
                        }
                    }
                    //没有踩到节拍点
                    if (!find && proxy.gameMonment == GameMoment.OPERATE) {
                        this.showOperate(proxy, "OutMiss", {x: proxy.handX, y: proxy.handY});
                    }
                    proxy.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!proxy.operate[i] && proxy.time - list[i].time > proxy.missTime) {
                            this.showOperate(proxy, "AutoMiss", proxy.cutPoses[list[i].index]);
                            proxy.operate[i] = true;
                        }
                    }
                }
            }

            showOperate(proxy: RoundProxy, type: string, pos: any) {
                // if(!proxy.operateNode) {
                //     return;
                // }
                //播放音效
                cc.audioEngine.play(Resource.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
                //添加绷带
                if (type == "AutoMiss") {
                    proxy.miss++;
                } else {
                    let node = new cc.Node();
                    node.addComponent(cc.Sprite);
                    node.rotation = 360 * Math.random();
                    let sprite = node.getComponent(cc.Sprite);
                    sprite.spriteFrame = new cc.SpriteFrame();
                    sprite.spriteFrame.setTexture(Resource.getResource("band"));
                    if (type == "Perfect") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.score += 100;
                        proxy.perfect++;
                    } else if (type == "Good") {
                        node.x = pos.x + 20 - 40 * Math.random();
                        node.y = pos.y + 20 - 40 * Math.random();
                        proxy.score += 80;
                        proxy.good++;
                    } else if (type == "Miss") {
                        let x = pos.x + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        let y = pos.y + (Math.random() > 0.5 ? 1 : -1) * 30 + 10 - 20 * Math.random();
                        if (Math.abs(x - proxy.handX) > 30 || Math.abs(y - proxy.handY) > 30) {
                            x = proxy.handX;
                            y = proxy.handY;
                        }
                        node.x = x;
                        node.y = y;
                        proxy.score += 0;
                        proxy.miss++;
                    } else if (type == "OutMiss") {
                        node.x = pos.x;
                        node.y = pos.y;
                        proxy.miss++;
                    }
                    proxy.operateNode.addChild(node);
                    proxy.tweenList.push(
                        lib.Tween.to(node, 0.15, {scaleX: 1, scaleY: 1, opacity: 255}, null, {
                            scaleX: 1.5,
                            scaleY: 1.5,
                            opacity: 150
                        })
                    );
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

                //表情
                if (type == "Perfect") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("facePerfect"));
                } else if (type == "Good") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceGood"));
                } else if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceMiss"));
                }
                //一定时间后切换回正常表情
                setTimeout(function () {
                    proxy.face.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("faceNormal"));
                }, proxy.faceChangeTime);

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