namespace game {
    export namespace startup {
        export class ClearMVCCommand extends mvc.SimpleCommand {

            public execute(note: mvc.Notification): void {
                mvc.Facade.remove(AppFacade.NAME);
                mvc.Model.remove(AppFacade.NAME);
                mvc.View.remove(AppFacade.NAME);
                mvc.Controller.remove(AppFacade.NAME);
            }
        }
    }
}