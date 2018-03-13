namespace game {
    export namespace bamaoGame {
        export class Resource {
            private static loadList: any[] = [
                {name: "allConfig", url: "resources/baMaoGame/res/config/All.csv"},
                {name: "levelConfig", url: "resources/baMaoGame/res/config/Level.csv"},
                {name: "bgm", url: "resources/baMaoGame/res/bgm/game1.wav"},
                // {name: "readygo", url: "resources/baMaoGame/res/music/readygo.mp3"},
                {name: "rhythmTip", url: "resources/baMaoGame/res/music/tip.wav"},
                {name: "rhythmMiss", url: "resources/baMaoGame/res/music/miss.wav"},
                {name: "rhythmGood", url: "resources/baMaoGame/res/music/good.wav"},
                {name: "rhythmPerfect", url: "resources/baMaoGame/res/music/perfect.wav"},
                {name: "monster", url: "resources/baMaoGame/res/textures/monster.png"},
                {name: "monsterHand", url: "resources/baMaoGame/res/textures/monsterHand.png"},
                {name: "doctorHand", url: "resources/baMaoGame/res/textures/doctorHand.png"},
                {name: "cut", url: "resources/baMaoGame/res/textures/cut.png"},
                {name: "band", url: "resources/baMaoGame/res/textures/band.png"},


                {name: "back1", url: "resources/baMaoGame/res/textures/background/back1.png"},
                {name: "back2", url: "resources/baMaoGame/res/textures/background/back2.png"},
                {name: "back3", url: "resources/baMaoGame/res/textures/background/back3.png"},

                {name: "role1", url: "resources/baMaoGame/res/textures/role/role1.png"},
                {name: "role2", url: "resources/baMaoGame/res/textures/role/role2.png"},
                {name: "role3", url: "resources/baMaoGame/res/textures/role/role3.png"},

                {name: "facePerfect", url: "resources/baMaoGame/res/textures/face/perfect.png"},
                {name: "faceGood", url: "resources/baMaoGame/res/textures/face/good.png"},
                {name: "faceMiss", url: "resources/baMaoGame/res/textures/face/miss.png"},
                {name: "faceNormal", url: "resources/baMaoGame/res/textures/face/normal.png"},

                {name: "faceResult1", url: "resources/baMaoGame/res/textures/face/result1.png"},
                {name: "faceResult2", url: "resources/baMaoGame/res/textures/face/result2.png"},
                {name: "faceResult3", url: "resources/baMaoGame/res/textures/face/result3.png"},

                {
                    name: "tip",
                    url: "resources/baMaoGame/res/textures/effect/",
                    resourceType: "effect",
                    namePre: "jl",
                    nameCount: 4,
                    nameBegin: 1,
                    nameEnd: 16,
                    nameFileEnd: "png",
                    frameTime: 33
                }
            ];

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }

            public static async loadResources() {
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