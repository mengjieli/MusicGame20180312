namespace game {
    export namespace bamaoStart {
        export class MainComponent extends cc.Component {

            private nameLabel: cc.Label;
            private descLabel: cc.Label;
            private backgroundContainer: cc.Node;
            private background: cc.Node;
            private bgm: any;
            private levelIndex: number = 0;

            start() {
                let ui = cc.instantiate(Resource.getResource("ui"));
                this.node.addChild(ui);


                //开始按钮
                ui.getChildByName("startBtn").on(cc.Node.EventType.TOUCH_END, this.onClickStart, this);
                ui.getChildByName("leftBtn").on(cc.Node.EventType.TOUCH_END, this.onClickLeft, this);
                ui.getChildByName("rightBtn").on(cc.Node.EventType.TOUCH_END, this.onClickRight, this);


                this.nameLabel = ui.getChildByName("levelName").getComponent(cc.Label);
                this.descLabel = ui.getChildByName("levelDesc").getComponent(cc.Label);
                this.backgroundContainer = ui.getChildByName("levelBg");

                this.showLevel();
            }

            private onClickLeft(): void {
                this.levelIndex--;
                if (this.levelIndex == -1) {
                    this.levelIndex = ConfigProxy.levelCount - 1;
                }
                this.showLevel();
            }

            private onClickRight(): void {
                this.levelIndex++;
                if (this.levelIndex == ConfigProxy.levelCount) {
                    this.levelIndex = 0;
                }
                this.showLevel();
            }

            private showLevel(): void {
                let cfg = ConfigProxy.getLevelAt(this.levelIndex);
                this.nameLabel.string = cfg.name;
                this.descLabel.string = lib.StringDo.replaceString(cfg.desc, "<br>", "\n");
                if (this.bgm != null) {
                    cc.audioEngine.stop(this.bgm);
                }
                this.bgm = cc.audioEngine.play(Resource.getResource("levelBgm" + cfg.level), true, 1);
                let old = this.background;
                if (this.background) {
                    lib.Tween.to(this.background, 0.5, {opacity: 0}).call(
                        function () {
                            old.destroy();
                        }
                    );
                }
                this.background = new cc.Node();
                this.background.addComponent(cc.Sprite);
                let sprite = this.background.getComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(Resource.getResource("levelBackground" + cfg.level));
                this.backgroundContainer.addChild(this.background);
                if (old) {
                    this.background.opacity = 0;
                    lib.Tween.to(this.background, 0.5, {opacity: 255});
                }
            }

            onClickStart(): void {
                if (this.bgm != null) {
                    cc.audioEngine.stop(this.bgm);
                }
                this.destroy();
                mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB(MainMediator.NAME));
                mainMediator.sendNotification(common.Command.CHANGE_SCENE, new common.ChangeSceneNB("crg", ConfigProxy.getLevelAt(this.levelIndex).level));
            }
        }
    }
}