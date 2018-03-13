namespace game {
    export namespace startup {

        import AppFacade = game.startup.AppFacade;

        export class RestartCommand extends mvc.MacroCommand {

            protected initializeMacroCommand(): void {
                //清理 mvc
                this.addSubCommand(ClearMVCCommand);
                //清理数据模块
                this.addSubCommand(ClearDataCommand);
                //清理 lib 库内容
                this.addSubCommand(ClearLibCommand);

                //启动
                AppFacade.start();
            }
        }
    }
}