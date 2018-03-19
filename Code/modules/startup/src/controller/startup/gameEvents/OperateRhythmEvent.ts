namespace game {
    export namespace bamaoGame {
        export class OperateRhythmEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                let findNext = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (proxy.lastTime <= list[i].time - proxy.operateTipTime && list[i].time - proxy.operateTipTime < proxy.time) {
                            //加特效
                            let effect = new Effect(Resource.getResource("tip"));
                            proxy.node.addChild(effect);
                            effect.x = proxy.cutPoses[list[i].index].x;
                            effect.y = proxy.cutPoses[list[i].index].y;
                        }

                        //修改医生手的位置
                        if (proxy.doctorHand) {
                            //达到某个节拍
                            if (list[i].time >= proxy.lastTime && list[i].time < proxy.time) {
                                proxy.doctorHand.x = proxy.lastHandX = proxy.cutPoses[list[i].index].x;
                                proxy.doctorHand.y = proxy.lastHandY = proxy.cutPoses[list[i].index].y;
                                proxy.lastHandTime = list[i].time;
                                proxy.handX = proxy.doctorHand.x;
                                proxy.handY = proxy.doctorHand.y;
                                if (list[i + 1].operate != 6) {
                                    proxy.tweenList.push(lib.Tween.to(proxy.doctorHand, 0.4, {y: -480}, lib.Ease.CUBIC_EASE_OUT).update(function () {
                                        proxy.handX = proxy.doctorHand.x;
                                        proxy.handY = proxy.doctorHand.y;
                                    }));
                                }
                            }
                            //距离下一节拍位置
                            if (!findNext && list[i].time > proxy.time) {
                                findNext = true;
                                proxy.doctorHand.x = proxy.lastHandX + (proxy.cutPoses[list[i].index].x - proxy.lastHandX) * (proxy.time - proxy.lastHandTime) / (list[i].time - proxy.lastHandTime);
                                proxy.doctorHand.y = proxy.lastHandY + (proxy.cutPoses[list[i].index].y - proxy.lastHandY) * (proxy.time - proxy.lastHandTime) / (list[i].time - proxy.lastHandTime);
                                proxy.handX = proxy.doctorHand.x;
                                proxy.handY = proxy.doctorHand.y;
                            }
                        }
                    } else if (list[i].operate != 6 && list[i].time > proxy.time) {
                        break;
                    }
                }
            }
        }
    }
}