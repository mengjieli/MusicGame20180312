namespace game {
    export namespace startup {

        export class InitModuleCommand extends mvc.SimpleCommand {

            public async execute(note: mvc.Notification) {
                this.facade.registerModule(new layer.LayerModule());
                this.facade.registerModule(new bamaoGame.BaMaoGameModule());
                this.facade.registerModule(new bamaoStart.BaMaoStartModule());
                this.facade.registerModule(new bamaoResult.BaMaoResultModule());
                this.facade.registerModule(new loading.LoadingModule());
                this.facade.registerModule(new musicTest.MusicTestModule());
                this.facade.registerModule(new runGame.RunGameModule());
                this.facade.registerModule(new motion.MotionModule());
                this.facade.registerModule(new crg.CRGModule());
                // this.facade.registerModule(new login.LoginModule());
                // this.facade.registerModule(new jumpGame.JumpGameModule());

                //获取模块初始化的进度
                var progress = note.body.progress;
                progress.current = progress.max = 1;
                //调用模块初始化消息
                this.sendNotification(common.Command.INIT_MODULE, note.body);
                var max = 1;
                if (progress.percent != max) { //如果模块初始化已完成
                    await progress.percentValue.valueEqual(max);
                }
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoStart"));
            }
        }
    }
}