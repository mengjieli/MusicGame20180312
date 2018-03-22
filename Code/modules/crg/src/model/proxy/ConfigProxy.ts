namespace game {
    export namespace crg {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("levelConfig"));

                    //分析 MusicConfig
                    ConfigProxy.musicConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("musicConfig"));
                }
            }

            private static allConfig: lib.ArrayValue;

            public static getConfig(name: string): any {
                let item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            }

            public static musicConfig: lib.ArrayValue;

            public static levelConfig: lib.ArrayValue = new lib.ArrayValue();

            public static getLevelConfig(levelId: number): lib.ArrayValue {
                let levelAllCfg = ConfigProxy.levelConfig.getItemWith("LevelId", levelId);
                let levelCfg: any = ConfigProxy.decodeConfig(ResourceProxy.getResource("level" + levelId));

                let cfg: any[] = [];
                let time = ConfigProxy.getConfig("gameStartTime");
                let len = levelCfg.length;
                for (let i = 0; i < len; i++) {
                    let levelItemCfg = ConfigProxy.getRandomLevel(time, levelCfg[i]);
                    cfg = cfg.concat(levelItemCfg);
                    time = ConfigProxy.getLevelConfigTime(levelItemCfg);
                }

                cfg.push({
                    operate: 9, //游戏结束
                    time: levelAllCfg.time
                });

                return new lib.ArrayValue(cfg);
            }

            private static decodeConfig(content: string): lib.ArrayValue {
                let res: lib.ArrayValue = new lib.ArrayValue();
                let list: any = content.split("\n");
                let keys = [];
                for (let i = 0; i < list.length; i++) {
                    list[i] = lib.StringDo.replaceString(list[i], "\n", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\r", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\t", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\v", "");
                    list[i] = lib.StringDo.replaceString(list[i], "\f", "");
                    let itemList: any[] = list[i].split(",");
                    if (i == 0) {
                        keys = itemList;
                    } else {
                        let item: any = {};
                        for (let j = 0; j < itemList.length; j++) {
                            if (j == 0 && !itemList[j]) {
                                item = null;
                                break;
                            }
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        if (item) {
                            res.push(item);
                        }
                    }
                }
                return res;
            }

            private static getRandomLevel(startTime: number, item: any): any[] {
                let levelConfig = item;
                let list = [];
                let time = startTime;

                //计算提示拍子
                time += ConfigProxy.getConfig("levelTimeGap");
                let count = 0;
                let start = list.length;
                for (let i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i] && levelConfig["beat" + i] != "") {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start,
                            music: levelConfig["beat" + i],
                            event: 1 + (~~(Math.random() * 3))
                        });
                        (list[0] as any).cut++;
                    } else {
                        count++;
                    }
                }

                return list;
            }

            public static getLevelConfigTime(cfg: any): number {
                let time = 0;
                for (let i = 0; i < cfg.length; i++) {
                    if (cfg[i].time > time) {
                        time = cfg[i].time;
                    }
                }
                return time;
            }
        }
    }
}