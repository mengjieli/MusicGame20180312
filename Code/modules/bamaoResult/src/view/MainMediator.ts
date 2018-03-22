namespace game {
    export namespace bamaoResult {
        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private data: any;

            constructor() {
                super(MainMediator.NAME, null);
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                this.viewComponent = cc.instantiate(Resource.getResource("ui"));
                // //获取分数
                // let scoreTxt = this.viewComponent.getChildByName("scoreTxt");
                // scoreTxt.getComponent(cc.Label).string = this.data.score + "";
                // //获取perfect
                // let perfectTxt = this.viewComponent.getChildByName("perfectTxt");
                // perfectTxt.getComponent(cc.Label).string = this.data.perfect + "";
                // //获取good
                // let goodTxt = this.viewComponent.getChildByName("goodTxt");
                // goodTxt.getComponent(cc.Label).string = this.data.good + "";
                // //获取miss
                // let missTxt = this.viewComponent.getChildByName("missTxt");
                // missTxt.getComponent(cc.Label).string = this.data.miss + "";


                //获取progress
                let progressTxt = this.viewComponent.getChildByName("progress");
                progressTxt.getComponent(cc.Label).string = "完成进度：" + this.data.progress;

                //获取返回主界面按钮
                let mainBtn = this.viewComponent.getChildByName("mainBtn");
                mainBtn.on(cc.Node.EventType.TOUCH_END, this.onClickReturnMainMeu, this);
                // //获取开始游戏按钮
                // let gameBtn = this.viewComponent.getChildByName("gameBtn");
                // gameBtn.on(cc.Node.EventType.TOUCH_END, this.onClickStartGame, this);
            }

            private onClickReturnMainMeu() {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoStart"));
            }

            private onClickStartGame() {
                this.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                this.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("bamaoGame"));
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
                        this.data = note.body.data;
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        layer.MainUILayer.show(this.viewComponent);
                        lib.Tween.to(this.viewComponent, 0.8, {y: 0}, lib.Ease.CUBIC_EASE_OUT, {y: lib.data.system.screen.height});
                        this.sendNotification(common.Command.CLOSE_SCENE, new common.CloseSceneNB("crg"));
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent) {
                            let node = this.viewComponent;
                            lib.Tween.to(this.viewComponent, 0.5, {opacity: 0}).call(
                                function () {
                                    node.destroy();
                                }.bind(this)
                            )
                            this.viewComponent = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "bamaoResult.MainMediator";
        }
    }
}