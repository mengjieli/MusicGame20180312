namespace game {
    export namespace crg {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                DataProxy.data = new GameData();

                this.viewComponent = new cc.Node();
                this.viewComponent.anchorX = 0;
                this.viewComponent.anchorY = 0;
                let background = new cc.Node();
                background.name = "background";
                background.addComponent(Background);
                background.anchorX = 0;
                background.anchorY = 0;
                this.viewComponent.addChild(background);
                this.viewComponent.addComponent(GameMain);

                this.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB(UIMediator.NAME));
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                await ResourceProxy.loadResources();
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

            public static NAME = "crg.MainMediator";
        }
    }
}