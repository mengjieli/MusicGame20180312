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

            private static levelConfig: lib.ArrayValue = new lib.ArrayValue();

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

            public static getGameConfig(): any[] {
                let cfg: any[] = [];
                let time = ConfigProxy.getConfig("gameStartTime");
                let len = 10;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg);
                }
                // //临时加入游戏结束
                // cfg.push({
                //     operate: 9, //游戏结束
                //     time: time
                // });
                return cfg;
            }

            public static addGameConfig(oldCfg: any): any[] {
                let time: number = ConfigProxy.getLevelConfigTime(oldCfg);
                for (let i = 0; i < oldCfg.length; i++) {
                    if (oldCfg[i].time < time - 30000) {
                        oldCfg.splice(i, 1);
                    }
                }
                let cfg: any[] = [];
                let len = 10;
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg);
                }
                oldCfg = oldCfg.concat(cfg);
                return oldCfg;
            }

            private static getRandomLevel(startTime: number): any[] {
                let levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
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