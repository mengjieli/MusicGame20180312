namespace game {
    export namespace bamaoGame {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private init() {
                this.viewComponent = new cc.Node();
                this.viewComponent.addComponent(MainComponent);

                ConfigProxy.init();
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await Resource.loadResources();
                this.init();
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
                        layer.MainUILayer.show(this.viewComponent);
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        break;
                }
            }

            public static NAME = "bamaoGame.MainMediator";
        }
    }
}