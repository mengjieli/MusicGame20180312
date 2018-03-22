namespace game {
    export namespace crg {
        export class GameOverCommand extends mvc.SimpleCommand {

            execute(note: mvc.Notification) {
                let data = DataProxy.data;
                if (data.bgm != null) {
                    cc.audioEngine.stop(data.bgm);
                    data.bgm = null;
                }

                data.gameOver = true;

                //清除动画
                while (data.tweenList.length) {
                    data.tweenList.pop().dispose();
                }

                // 弹出结果内容
                mainMediator.sendNotification(common.Command.CHANGE_SCENE,
                    new common.ChangeSceneNB("bamaoResult", {
                        score: data.score,
                        perfect: data.perfect,
                        good: data.good,
                        miss: data.miss,
                        progress: (~~(10000 * data.progress / data.progressAll)) / 100
                    }));
            }
        }
    }
}