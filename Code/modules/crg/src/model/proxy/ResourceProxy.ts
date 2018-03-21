namespace game {
    export namespace crg {
        export class ResourceProxy {

            public static configLoadComplete() {
                ConfigProxy.init();
                let list: any = ConfigProxy.musicConfig;
                for (let i = 0; i < list.length; i++) {
                    let item = {name: "rhythm" + list[i].name, url: "resources/crg/res/rhythm/" + list[i].url};
                    ResourceProxy.loadList.push(item);
                }
            }

            private static initList: any[] = [
                {name: "bgm", url: "resources/crg/res/bgm/game1.wav"},
                {name: "rhythmTip", url: "resources/crg/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/crg/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/crg/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/crg/res/music/perfect.wav"},

                {name: "allConfig", url: "resources/crg/res/config/All.csv"},
                {name: "levelConfig", url: "resources/crg/res/config/Level.csv"},
                {
                    name: "musicConfig",
                    url: "resources/crg/res/config/Music.csv",
                    execute: ResourceProxy.configLoadComplete
                },

                {name: "click", url: "resources/crg/res/textures/ui/click.png"},

                {name: "ground", url: "resources/crg/res/textures/bg/ground.png"},
                {name: "ground1", url: "resources/crg/res/textures/bg/ground1.png"},
                {name: "ground2", url: "resources/crg/res/textures/bg/ground2.png"},
                {name: "ground3", url: "resources/crg/res/textures/bg/ground3.png"},
                {name: "cloud1", url: "resources/crg/res/textures/bg/cloud1.png"},
                {name: "cloud2", url: "resources/crg/res/textures/bg/cloud2.png"},
                {name: "tree1", url: "resources/crg/res/textures/bg/tree1.png"},
                {name: "tree2", url: "resources/crg/res/textures/bg/tree2.png"},
                {name: "tree3", url: "resources/crg/res/textures/bg/tree3.png"},
                {name: "tree4", url: "resources/crg/res/textures/bg/tree4.png"},
                {name: "tree5", url: "resources/crg/res/textures/bg/tree5.png"},
                {name: "tree6", url: "resources/crg/res/textures/bg/tree6.png"},
                {name: "tree7", url: "resources/crg/res/textures/bg/tree7.png"},
                {name: "bg1", url: "resources/crg/res/textures/bg/bg1.png"},
                {name: "bg2", url: "resources/crg/res/textures/bg/bg2.png"},
                {name: "bg3", url: "resources/crg/res/textures/bg/bg3.png"},
                {name: "bg4", url: "resources/crg/res/textures/bg/bg4.png"},
                {name: "effect", url: "resources/crg/res/textures/bg/effect.png"},
                {
                    name: "player1",
                    url: "resources/crg/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "him",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 66,
                        scaleX: 1.2,
                        scaleY: 1.2
                    }
                },
                {
                    name: "player2",
                    url: "resources/crg/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "her",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 66,
                        scaleX: -1.2,
                        scaleY: 1.2
                    }
                },
                {name: "monster1", url: "resources/crg/res/textures/enemy/rank1.png"},
                {name: "monster2", url: "resources/crg/res/textures/enemy/rank2.png"},
                {name: "monster3", url: "resources/crg/res/textures/enemy/rank3.png"},
                {name: "monster4", url: "resources/crg/res/textures/enemy/rank4.png"},
                {name: "monster5", url: "resources/crg/res/textures/enemy/rank5.png"},
                {name: "monster6", url: "resources/crg/res/textures/enemy/rank6.png"},
                {name: "monsterStar", url: "resources/crg/res/textures/enemy/star2.png"},
                {
                    name: "pressok",
                    url: "resources/crg/res/textures/effect/pressok/",
                    resourceType: "effect",
                    namePre: "hero alien shipAttack_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 8,
                    nameFileEnd: "png",
                    properties: {
                        frameTime: 33,
                        anchorY:0
                    }
                },
            ];

            private static loadList: any[];

            public static getResource(name: string): any {
                for (let i = 0; i < ResourceProxy.loadList.length; i++) {
                    if (ResourceProxy.loadList[i].name == name) {
                        return ResourceProxy.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
                if (!ResourceProxy.loadList) {
                    ResourceProxy.loadList = ResourceProxy.initList.concat();
                }
                let list: any[] = ResourceProxy.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;
                    let load = function () {
                        if (index >= list.length) {
                            mainMediator.sendNotification(common.Command.CLOSE_VIEW, new common.CloseViewNB("loading.MainMediator"));
                            resolve();
                            return;
                        }
                        let res = list[index];
                        mainMediator.sendNotification(common.Command.OPEN_VIEW, new common.OpenViewNB("loading.MainMediator", {text: "Loading " + (~~((index / list.length) * 100)) + "%  " + res.name}));
                        if (res.resourceType == "effect") {
                            if (!res.loadIndex) {
                                res.pictures = [];
                                res.loadIndex = 0;
                                res.loadLength = res.nameEnd - res.nameBegin + 1;
                                res.data = {
                                    pictures: []
                                };
                                if (res.properties) {
                                    for (let key in res.properties) {
                                        res.data[key] = res.properties[key];
                                    }
                                }
                            } else {
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                    load();
                                    return;
                                }
                            }
                            let count = res.loadIndex + res.nameBegin;
                            let name = "" + count;
                            while (name.length < res.nameCount) {
                                name = "0" + name;
                            }
                            cc.loader.load(cc.url.raw(res.url + res.namePre + name + "." + res.nameFileEnd), function (e: any, data: any) {
                                res.data.pictures.push(data);
                                res.loadIndex++;
                                if (res.loadIndex == res.loadLength) {
                                    index++;
                                }
                                load();
                            });
                        } else {
                            cc.loader.load(cc.url.raw(res.url), function (e: any, data: any) {
                                res.data = data;
                                if (res.execute) {
                                    res.execute();
                                }
                                index++;
                                load();
                            });
                        }
                    }
                    load();
                }.bind(this));
            }
        }
    }
}