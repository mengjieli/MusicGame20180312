namespace game {
    export namespace loading {
        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private data: any;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new LoadingView();
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
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
                        this.data = note.body.data;
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if(this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                            (this.viewComponent as LoadingView).text = note.body.data.text;
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "loading.MainMediator";
        }
    }
}