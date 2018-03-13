namespace game {
    export namespace bamaoGame {

        /**
         * 整个游戏开始
         * 1. 播放背景音乐
         */
        export class GameStartEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {
                    proxy.bgm = cc.audioEngine.play(Resource.getResource("bgm"), true, 0.1);
                }
            }
        }
    }
}