namespace game {
    export namespace login {
        export class AutoLoginCommand extends mvc.SimpleCommand {

            public async execute(note: mvc.Notification) {
                // //获取用户名和密码、游戏(服务器)名称
                // var user: string = note.body.user;
                // var pwd: string = note.body.pwd;
                // var gameName: string = note.body.gameName;
                //
                // //开始自动登录流程，首先连接 http 服务器请求登录
                // console.log("[自动登录 AutoLoginCommand] 用户名:" + user + "  密码:" + pwd);
                // var loader = new lib.URLLoader("http://localhost:16812/login");
                // loader.params = {user: user, pwd: pwd};
                // var ret = await loader.load();
                // var res = JSON.parse(ret.data);
                // if (res.result) {
                //     console.log("[登录失败]", ret.data.result);
                //     return;
                // }
                // var session = res.session;
                //
                // //获取斗地主的游戏服务器地址
                // loader = new lib.URLLoader("http://localhost:16812/get_game_server");
                // loader.params = {name: gameName};
                // ret = await loader.load();
                // res = JSON.parse(ret.data);
                // var ip: string = res.ip; //服务器ip
                // var port: number = res.port; //服务器 port
                // console.log("[连接游戏服务器] " + ip + ":" + port);
                //
                // //连接斗地主的游戏服务器 socket
                // var socket = new lib.VBWebSocket();
                // var cret = await socket.connect(ip, port);
                // if (ret.result) {
                //     console.log("[无法连接游戏服务器]", cret);
                //     return;
                // }
                // game.net = socket;
                //
                // //开始给游戏服务器发送登录消息，服务器会返回结果，如果是登录成功会在返回结果前发送一个 NoticeProxy 消息给客户端
                // var msg = new LoginDDZServerProxy(user, session);
                // var result = await msg.send();
                // if (result) {
                //     console.log("[登录游戏服务器失败] " + result);
                //     return;
                // }
                // console.log("[Receive]", msg.notice.message);
                // //登录成功，可以开始注册网络消息了
                // this.sendNotification(common.Command.REGISTER_NET);
                // //登录游戏服务器成功，可以进行后续处理
                // this.sendNotification(Command.IN.LOGIN_GAME_SERVER);
                //
                // //与游戏服务器断开连接时处理
                // await socket.onDisconnect();
                // console.log("[与服务器断开连接]", ip, port);

                var socket = new lib.WebSocketClient();
                await socket.awaitConnect("localhost", 20401);
                game.net = socket;
                
                //登录成功，可以开始注册网络消息了
                this.sendNotification(common.Command.REGISTER_NET);
                //登录游戏服务器成功，可以进行后续处理
                this.sendNotification(Command.IN.LOGIN_GAME_SERVER);
            }
        }
    }
}