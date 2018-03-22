namespace game {
    export namespace crg {

        export class UIMediator extends mvc.Mediator {

            constructor() {
                super(UIMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new GameUI();
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
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW,
                    Command.IN.SHOW_COMBO, Command.IN.SHOW_OPERATE_RESULT];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != UIMediator.NAME) {
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
                        if (note.body.name != UIMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            let node = this.viewComponent;
                            lib.Tween.to(this.viewComponent, 1, {opacity: 0}).call(
                                function () {
                                    node.destroy();
                                }.bind(this)
                            )
                            this.viewComponent = null;
                        }
                        break;
                    case Command.IN.SHOW_COMBO:
                        this.viewComponent.showCombo(note.body);
                        break;
                    case Command.IN.SHOW_OPERATE_RESULT:
                        this.viewComponent.showOperateResult(note.body);
                        break;
                }
            }

            public static NAME = "crg.UIMediator";
        }
    }
}