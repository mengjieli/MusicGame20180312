namespace game {
    export namespace bamaoStart {
        export class Resource {

            public static instance: Resource;

            loadList: any[] = [
                {name: "ui", data: game.prefab.ui1, url: "resources/baMaoStart/res/baMaoUI.prefab"},
                {name: "bgm", url: "resources/baMaoStart/res/bgm/1.mp3"},
                {
                    name: "levelConfig",
                    url: "resources/bamaoStart/res/config/level.csv",
                    execute: Resource.configLoadComplete
                }
            ];

            public static configLoadComplete() {
                ConfigProxy.init();
                let len = ConfigProxy.levelCount;
                for (let i = 0; i < len; i++) {
                    let cfg = ConfigProxy.getLevelAt(i);
                    Resource.instance.loadList.push(
                        {name: "levelBackground" + cfg.level, url: "resources/baMaoStart/res/textures/" + cfg.background}
                    );
                    Resource.instance.loadList.push(
                        {name: "levelBgm" + cfg.level, url: "resources/baMaoStart/res/bgm/" + cfg.music}
                    );
                }
            }

            public static async loadResources() {
                Resource.instance = new Resource();
                let list: any[] = Resource.instance.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;

                    async function load() {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if (res.data) {
                            index++;
                            load();
                        } else {
                            if (res.type == "URLLoader") {
                                var loader = new lib.URLLoader(res.url);
                                var result = await loader.load();
                                res.data = result.data;
                                index++;
                                load();
                            } else {
                                cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                    res.data = data;
                                    index++;
                                    if (res.execute) {
                                        res.execute();
                                    }
                                    load();
                                });
                            }
                        }
                    }

                    load();
                }.bind(this));
            }

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.instance.loadList.length; i++) {
                    if (Resource.instance.loadList[i].name == name) {
                        return Resource.instance.loadList[i].data;
                    }
                }
                return null;
            }
        }
    }
}