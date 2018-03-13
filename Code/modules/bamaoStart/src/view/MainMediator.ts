namespace game {
    export namespace bamaoStart {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private change: any;

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                this.viewComponent = cc.instantiate(Resource.getResource("ui"));
                //获取开始按钮
                let startBtn = this.viewComponent.getChildByName("startBtn");
                startBtn.on(cc.Node.EventType.TOUCH_END, this.onClickStart, this);

                //获取背景
                let background = this.viewComponent.getChildByName("bg");
                background.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame();
                let index = 0;
                this.change = setInterval(function () {
                    background.getComponent(cc.Sprite).spriteFrame.setTexture(Resource.getResource("bg" + index));
                    index++;
                    index = index % 2;
                }, 250);

                //播放背景音乐
                this.bgm = cc.audioEngine.play(Resource.getResource("bgm"), false, 1);
            }

            onClickStart(): void {
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
                        if (this.change) {
                            clearInterval(this.change);
                            this.change = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "bamaoStart.MainMediator";
        }
    }
}