namespace game {
    export namespace bamaoStart {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                this.viewComponent.addComponent(MainComponent);
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                            lib.Tween.to(this.viewComponent, 1, {opacity: 255}, null, {opacity: 0});
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        break;
                }
            }

            public static NAME = "bamaoStart.MainMediator";
        }
    }
}