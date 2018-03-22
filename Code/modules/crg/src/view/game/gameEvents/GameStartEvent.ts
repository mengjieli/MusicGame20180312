namespace game {
    export namespace crg {
        export class GameStartEvent extends GameEvent {

            execute() {
                let data = DataProxy.data;
                if (data.lastTime == 0) {
                    let player = new Effect(ResourceProxy.getResource("player" + (1 + (~~(2 * Math.random())))), true);
                    data.playerLayer.addChild(player);
                    player.x = 200;
                    player.y = 150;
                    data.player = player;
                    //1

                    data.bgm = cc.audioEngine.play(ResourceProxy.getResource("bgm" + data.level), true, 1);
                }
            }
        }
    }
}