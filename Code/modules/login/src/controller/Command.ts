namespace game {
    export namespace login {
        export class Command {

            public static IN = {
                AUTO_LOGIN: "login.auto_login", //开始自动登录游戏服务器
                LOGIN_GAME_SERVER: "login.login_game_server", //连上游戏服务器 socket
            }
        }
    }
}