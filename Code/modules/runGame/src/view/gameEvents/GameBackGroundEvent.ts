namespace game {
    export namespace runGame {
        export class GameBackGroundEvent {

            execute(proxy: RoundProxy) {
                if (proxy.lastTime == 0) {
                    proxy.background = new BackGround(proxy);
                    proxy.node.addChild(proxy.background);
                }
                if (proxy.background) {
                    proxy.background.update(proxy.pos);
                }
            }
        }
    }
}