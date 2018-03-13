namespace game {
    export namespace layer {

        export class LayerModule extends mvc.Module {

            private rootNode: cc.Node;

            constructor() {
                super(LayerModule.NAME);
            }

            public listNotificationInterests(): string[] {
                return [common.Command.INIT_MODULE];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.INIT_MODULE:
                        var data: common.InitModuleNB = note.body;
                        this.rootNode = new cc.Node();
                        // this.rootNode.x = cc.director.getVisibleSize().width / 2;
                        // this.rootNode.y = cc.director.getVisibleSize().height / 2;
                        data.rootView.addChild(this.rootNode);
                        this.rootNode.addChild(new GameLayer());
                        this.rootNode.addChild(new MainUILayer());
                        this.rootNode.addChild(new PopLayer());
                        this.rootNode.addChild(new TopLayer());
                        break;
                }
            }

            static NAME: string = "layer";
        }
    }
}