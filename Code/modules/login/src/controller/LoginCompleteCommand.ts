namespace game {
    export namespace login {
        export class LoginCompleteCommand extends mvc.SimpleCommand {

            public async execute(note: mvc.Notification) {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));

                console.log("开始测试服务器通信");
                var msg = new TestRequest(
                    false,
                    256,
                    true,
                    -123456789,
                    123456789,
                    "hello ~",
                    [123, 456, 789],
                    new TestStructProxy("jay", 666),
                    [new TestStructProxy("flower", 999), new TestStructProxy("ke", 888)]
                );
                console.log("[测试通信] 发送数据", msg.value);
                var result = await msg.send(game.net);
                console.log("[测试通信] 通用返回", msg.response.value);
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("jumpGame"));
            }
        }
    }
}