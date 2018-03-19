namespace game {
    export namespace bamaoGame {
        export class MainComponent extends cc.Graphics {

            scaleMode: number = 0;
            proxy: RoundProxy;
            events: GameEvent[];

            start() {
                this.proxy = new RoundProxy();
                this.proxy.config = ConfigProxy.getGameConfig();
                this.proxy.node = this.node;
                this.proxy.events = [
                    new GameStartEvent(),
                    new GameFinishEvent(),
                    new MonsterEnterEvent(),
                    new MonsterExitEvent(),
                    new OperateRoundStartEvent(),
                    new OperateRhythmEvent(),
                    new OperateRoundFinishEvent(),
                    new TipRoundStartEvent(),
                    new TipRhythmEvent(),
                    new TipRoundFinishEvent(),
                    new OperateEvent()
                ];
                this.schedule(this.update, 0.016, 10000000000);
            }

            lastTime = 0;

            update() {
                let time = (new Date()).getTime();
                let timeGap = time - this.lastTime;
                if (timeGap > 30) {
                    timeGap = 30;
                }
                this.proxy.time += timeGap;
                this.lastTime = time;
                let events = this.proxy.events;
                for (let i = 0; i < events.length; i++) {
                    events[i].execute(this.proxy);
                }
                this.proxy.lastTime = this.proxy.time;
            }

            onLoad() {
                this.node.width = 640;
                this.node.height = 960;
                this.scaleMode = 1;

                var size = lib.data.system.screen.value;
                var width = this.node.width;
                var height = this.node.height;
                var scaleMode = this.scaleMode;
                if (width && height && scaleMode) {
                    var scaleX = size.width / width;
                    var scaleY = size.height / height;
                    if (scaleMode == 1) {
                        this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 2) {
                        this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                        this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
                    } else if (scaleMode == 3) {
                        // this.height = this.parent.height / scaleX;
                        this.node.scaleX = scaleX;
                        this.node.scaleY = scaleX;
                    } else if (scaleMode == 4) {
                        // this.width = this.parent.width / scaleY;
                        this.node.scaleX = scaleY;
                        this.node.scaleY = scaleY;
                    }
                }
            }
        }
    }
}