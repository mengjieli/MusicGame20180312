namespace game {
    export namespace jumpGame {
        import IHead = lib.IHead;

        export class JumpGameComponent extends cc.Component {

            players: Player[] = [];
            player: Player;

            start() {
                this.player = new Player();
                this.players.push(this.player);
                this.node.addChild(this.player);
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyControl, this);
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyControl, this);

                (new AddGameRequest(this.player.id, this.player.posx, this.player.posy)).send(game.net);
                (game.net as lib.WebSocketClient).add(FrameNotify.CMD, this.onReceiveFrame, this);
                (game.net as lib.WebSocketClient).add(PlayerAddNotify.CMD, this.onReceivePlayer, this);

                setInterval(this.updateLoop.bind(this), 1000 / 60);
            }

            addPlayer(id: string) {
                this.players.push(new Player(id));
            }

            keyControl(e: any) {
                if (e.keyCode == 65) { //向左
                    if (e.type == cc.SystemEvent.EventType.KEY_DOWN) {
                        // this.player.left = true;
                        (new OperateRequest("left", true, this.player.posx, this.player.posy)).send(game.net);
                    } else if (e.type == cc.SystemEvent.EventType.KEY_UP) {
                        // this.player.left = false;
                        (new OperateRequest("left", false, this.player.posx, this.player.posy)).send(game.net);
                    }
                } else if (e.keyCode == 87) { //向上
                    if (e.type == cc.SystemEvent.EventType.KEY_DOWN) {
                        // this.player.up = true;
                        (new OperateRequest("up", true, this.player.posx, this.player.posy)).send(game.net);
                    } else if (e.type == cc.SystemEvent.EventType.KEY_UP) {
                        // this.player.up = false;
                        (new OperateRequest("up", false, this.player.posx, this.player.posy)).send(game.net);
                    }
                } else if (e.keyCode == 68) { //向右
                    if (e.type == cc.SystemEvent.EventType.KEY_DOWN) {
                        // this.player.right = true;
                        (new OperateRequest("right", true, this.player.posx, this.player.posy)).send(game.net);
                    } else if (e.type == cc.SystemEvent.EventType.KEY_UP) {
                        // this.player.right = false;
                        (new OperateRequest("right", false, this.player.posx, this.player.posy)).send(game.net);
                    }
                }
            }

            controlPlayer(operateStruct: OperateStruct): void {
                for (let i = 0; i < this.players.length; i++) {
                    if (this.players[i].id == operateStruct.playerUUID) {
                        if (operateStruct.operate == "left") {
                            this.player.left = operateStruct.operateValue;
                        }
                        else if (operateStruct.operate == "right") {
                            this.player.right = operateStruct.operateValue;
                        }
                        else if (operateStruct.operate == "up") {
                            this.player.up = operateStruct.operateValue;
                        }
                    }
                }
            }

            onReceiveFrame(head: IHead, bytes: lib.ByteArray): void {
                var msg = new FrameNotify();
                msg.head = head as lib.RequestHead;
                msg.decode(bytes);
                if (msg.operates.length) {
                    for (let i = 0; i < msg.operates.length; i++) {
                        this.controlPlayer(msg.operates[i]);
                    }
                }
                console.log(this.loop);
                while (this.loop) {
                    this.gameLoop();
                    this.loop--;
                }
                this.loop = 6;
                this.gameLoop();
            }

            onReceivePlayer(head: IHead, bytes: lib.ByteArray): void {
                var msg = new PlayerAddNotify();
                msg.head = head as lib.RequestHead;
                msg.decode(bytes);
                console.log("新玩家加入!", msg.value);
                this.player = new Player(msg.playerUUID);
                this.player.posx = msg.x;
                this.player.posy = msg.y;
                this.player.xLabel.node.x += 100 * this.players.length;
                this.player.yLabel.node.x += 100 * this.players.length;
                this.players.push(this.player);
                this.node.addChild(this.player);
            }

            loop = 0;

            updateLoop() {
                if (this.loop) {
                    this.gameLoop();
                    this.loop--;
                }
            }


            gameLoop() {
                for (let i = 0; i < this.players.length; i++) {
                    this.players[i].loop();
                }
            }
        }
    }
}