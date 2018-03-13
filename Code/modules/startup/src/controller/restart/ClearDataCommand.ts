namespace game {
    export namespace startup {
        export class ClearDataCommand extends mvc.SimpleCommand {

            public execute(note: mvc.Notification): void {
                game.data = null;
            }
        }
    }
}