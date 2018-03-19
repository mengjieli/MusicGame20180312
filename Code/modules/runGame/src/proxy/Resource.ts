namespace game {
    export namespace runGame {
        export class Resource {
            public static configLoadComplete() {
                ConfigProxy.init();
                let list: any = ConfigProxy.musicConfig;
                for (let i = 0; i < list.length; i++) {
                    let item = {name: "rhythm" + list[i].name, url: "resources/runGame/res/rhythm/" + list[i].url};
                    Resource.loadList.push(item);
                }
            }

            private static initList: any[] = [
                {name: "allConfig", url: "resources/runGame/res/config/All.csv"},
                {name: "levelConfig", url: "resources/runGame/res/config/Level.csv"},
                {
                    name: "musicConfig",
                    url: "resources/runGame/res/config/Music.csv",
                    execute: Resource.configLoadComplete
                },
                {name: "bgm", url: "resources/runGame/res/bgm/game1.wav"},
                // {name: "readygo", url: "resources/runGame/res/music/readygo.mp3"},
                {name: "rhythmTip", url: "resources/runGame/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/runGame/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/runGame/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/runGame/res/music/perfect.wav"},
                {name: "monster", url: "resources/runGame/res/texture/monster.png"},
                {name: "monsterHand", url: "resources/runGame/res/texture/monsterHand.png"},
                {name: "doctorHand", url: "resources/runGame/res/texture/doctorHand.png"},
                {name: "cut", url: "resources/runGame/res/texture/cut.png"},
                {name: "band", url: "resources/runGame/res/texture/band.png"},


                {name: "back1", url: "resources/runGame/res/texture/background/back1.png"},
                {name: "back2", url: "resources/runGame/res/texture/background/back2.png"},
                {name: "back3", url: "resources/runGame/res/texture/background/back3.png"},

                {name: "role1", url: "resources/runGame/res/texture/role/role1.png"},
                {name: "role2", url: "resources/runGame/res/texture/role/role2.png"},
                {name: "role3", url: "resources/runGame/res/texture/role/role3.png"},

                {name: "facePerfect", url: "resources/runGame/res/texture/face/perfect.png"},
                {name: "faceGood", url: "resources/runGame/res/texture/face/good.png"},
                {name: "faceMiss", url: "resources/runGame/res/texture/face/miss.png"},
                {name: "faceNormal", url: "resources/runGame/res/texture/face/normal.png"},

                {name: "faceResult1", url: "resources/runGame/res/texture/face/result1.png"},
                {name: "faceResult2", url: "resources/runGame/res/texture/face/result2.png"},
                {name: "faceResult3", url: "resources/runGame/res/texture/face/result3.png"},

                {
                    name: "tip",
                    url: "resources/runGame/res/texture/effect/",
                    resourceType: "effect",
                    namePre: "jl",
                    nameCount: 4,
                    nameBegin: 1,
                    nameEnd: 16,
                    nameFileEnd: "png",
                    frameTime: 33
                },

                {name: "bg1", url: "resources/runGame/res/textures/bg/bg1.png"},
                {name: "bg2", url: "resources/runGame/res/textures/bg/bg2.png"},
                {name: "bg3", url: "resources/runGame/res/textures/bg/bg3.png"},
                {name: "bg4", url: "resources/runGame/res/textures/bg/bg4.png"},

                {
                    name: "playerRun",
                    url: "resources/runGame/res/textures/player/run/",
                    resourceType: "effect",
                    namePre: "player",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 4,
                    nameFileEnd: "png",
                    frameTime: 66
                },


                {
                    name: "monster1",
                    url: "resources/runGame/res/textures/enemy/mushroom1/",
                    resourceType: "effect",
                    namePre: "mushroom1_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 6,
                    nameFileEnd: "png",
                    frameTime: 66
                },
                {
                    name: "monster2",
                    url: "resources/runGame/res/textures/enemy/mushroom2/",
                    resourceType: "effect",
                    namePre: "mushroom2_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 3,
                    nameFileEnd: "png",
                    frameTime: 132
                },
                {
                    name: "monster3",
                    url: "resources/runGame/res/textures/enemy/mushroom3/",
                    resourceType: "effect",
                    namePre: "mushroom3_",
                    nameCount: 1,
                    nameBegin: 1,
                    nameEnd: 3,
                    nameFileEnd: "png",
                    frameTime: 132
                },
            ];
            private static loadList: any[];

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
                if (!Resource.loadList) {
                    Resource.loadList = Resource.initList.concat();
                }
                let list: any[] = Resource.loadList;
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
                                    pictures: [],
                                    frameTime: res.frameTime
                                };
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