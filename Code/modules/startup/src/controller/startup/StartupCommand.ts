namespace game {
    export namespace startup {

        export class StartupCommand extends mvc.MacroCommand {

            protected initializeMacroCommand(): void {
                this.addSubCommand(InitModuleCommand);
            }
        }
    }
}