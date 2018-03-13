namespace game {
    export namespace login {

        import IHead = lib.IHead;

        export class NoticeCProxy implements IReceiveProxy {


            public registerNet(net: lib.WebSocketClient): void {
                net.add(NoticeProxy.CMD, this.receive, this);
            }

            public receive(head: IHead, bytes: lib.ByteArray): void {
                console.log("收到消息?", head.cmd);
            }
        }
    }
}