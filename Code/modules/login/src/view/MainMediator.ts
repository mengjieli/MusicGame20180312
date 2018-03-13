namespace game {
    export namespace login {
        export class MainMediator extends mvc.Mediator {

            private waitingView: cc.Node;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
                //获取游客登录按钮
                var ykbtn = this.viewComponent.getChildByName("btn_youke");
                ykbtn.on(cc.Node.EventType.TOUCH_END, this.onClickYKLogin, this);
                //获取微信登录按钮
                var wxbtn = this.viewComponent.getChildByName("btn_weixin");
                wxbtn.on(cc.Node.EventType.TOUCH_END, this.onClickWXLogin, this);
                //获取等待界面
                this.waitingView = this.viewComponent.getChildByName("WaitingConnection");
            }

            /**
             * 点击游客登录
             * @param {cc.Event} e
             */
            private onClickYKLogin(e: cc.Event): void {
                //开始自动登录
                this.facade.sendNotification(Command.IN.AUTO_LOGIN, {
                    "user": "test",
                    "pwd": "03top",
                    "gameName": "DouDiZhu"
                });
                this.waitingView.active = true;
            }

            /**
             * 点击微信登录
             * @param {cc.Event} e
             */
            private onClickWXLogin(e: cc.Event): void {
            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                var loader = new lib.URLLoader(Resource.MAIN_UI);
                var result = await loader.load();
                if (result.result) {
                    console.log("加载资源错误:", Resource.MAIN_UI);
                    return;
                }
                this.viewComponent = cc.instantiate(result.data);
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
                        layer.MainUILayer.show(this.viewComponent);
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                        }
                        break;
                }
            }

            public static NAME = "login.MainMediator";
        }
    }
}