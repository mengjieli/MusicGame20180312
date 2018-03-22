namespace game {
    export namespace crg {
        export class GameFinishEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                let list = data.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 9) {
                        if (data.lastTime <= list[i].time && list[i].time < data.time) {
                            mainMediator.sendNotification(Command.IN.GAME_OVER, true);
                        }
                    }
                }
            }
        }
    }
}