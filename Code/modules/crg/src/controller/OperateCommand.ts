namespace game {
    export namespace crg {
        export class OperateCommand extends mvc.SimpleCommand {

            execute(note: mvc.Notification) {
                let proxy = DataProxy.data;
                let type: string = note.body.operateType;
                let data = note.body.data;

                //播放音效
                if (!(type == "MISS" || type == "AutoMiss" || type == "OutMiss"))
                    cc.audioEngine.play(ResourceProxy.getResource("rhythm" + (type == "AutoMiss" || type == "OutMiss" ? "Miss" : type)), false, 1);
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

                //显示操作结果
                mainMediator.sendNotification(Command.IN.SHOW_OPERATE_RESULT, type == "AutoMiss" || type == "OutMiss" ? "Miss" : type);

                //combo文字
                if (type == "Miss" || type == "AutoMiss" || type == "OutMiss") {
                    proxy.combo = 0;
                } else {
                    proxy.combo++;
                }
                mainMediator.sendNotification(Command.IN.SHOW_COMBO, proxy.combo);

                //处理对应事件
                let event = data ? data.event : 0;
                if (event) {
                    let list = [];
                    let items = DataProxy.data.groundData.items;
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].changeType == event && items[i].isChangeComplete() == false) {
                            list.push(items[i]);
                        }
                    }
                    if (list.length) {
                        let item = list[~~(Math.random() * list.length)];
                        if(item.changeValue.value + item.changeSpeed > 1) {
                            item.changeValue.value = 1;
                        } else {
                            item.changeValue.value += item.changeSpeed;
                        }
                    }
                }
            }
        }
    }
}