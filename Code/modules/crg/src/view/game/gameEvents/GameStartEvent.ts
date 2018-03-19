namespace game {
    export namespace crg {
        export class GameStartEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                if (data.lastTime == 0) {
                    let player = new Effect(ResourceProxy.getResource("player"), true);
                    data.playerLayer.addChild(player);
                    player.x = 100;
                    player.y = 150;
                    data.player = player;
                }
            }
        }
    }
}