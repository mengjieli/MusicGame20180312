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
                                } else if (Math.abs(data.time - list[i].time) < goodTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Good"
                                    });
                                } else if (Math.abs(data.time - list[i].time) < missTime) { //good
                                    mainMediator.sendNotification(Command.IN.OPERATE, {
                                        data: list[i],
                                        operateType: "Miss"
                                    });
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
                    }
                    data.clickFlag = false;
                }
                //检测漏过的点
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 6) {
                        if (!data.operate[list[i].time] && data.time - list[i].time > missTime) {
                            mainMediator.sendNotification(Command.IN.OPERATE, {data: null, operateType: "AutoMiss"});
                            data.operate[list[i].time] = true;
                        }
                    }
                }
            }
        }
    }
}