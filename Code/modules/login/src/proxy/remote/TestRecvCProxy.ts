namespace game {
    export namespace login {

        export class TestRecvCProxy implements IReceiveProxy {


            public registerNet(net: lib.WebSocketClient): void {
                net.add(TestRecvProxy.CMD, this.receive, this);
            }

            public receive(head: lib.IHead, bytes: lib.ByteArray): void {
                var msg = new TestRecvProxy();
                msg.decode(bytes);
                console.log("收到消息", head.cmd, msg);
            }
        }
    }
}