namespace game {
    export namespace bamaoGame {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    //分析 AllConfig
                    ConfigProxy.allConfig = ConfigProxy.decodeConfig(Resource.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(Resource.getResource("levelConfig"));
                }
            }

            private static allConfig: lib.ArrayValue;

            public static getConfig(name: string): any {
                let item = ConfigProxy.allConfig.getItemWith("name", name);
                return item ? item.value : null;
            }

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
                            itemList[j] = lib.StringDo.parseNumber(itemList[j]) != null ? lib.StringDo.parseNumber(itemList[j]) : itemList[j];
                            item[keys[j]] = itemList[j];
                        }
                        res.push(item);
                    }
                }
                return res;
            }

            public static getGameConfig(): any[] {
                let cfg: any[] = [];
                let time = 0;
                let len = ConfigProxy.getConfig("gameOverLevel");
                for (let i = 0; i < len; i++) {
                    let levelCfg = ConfigProxy.getRandomLevel(time);
                    cfg = cfg.concat(levelCfg);
                    time = ConfigProxy.getLevelConfigTime(levelCfg) + ConfigProxy.getConfig("levelGapTime");
                }
                //临时加入游戏结束
                cfg.push({
                    operate: 9, //游戏结束
                    time: time
                });
                return cfg;
            }

            public static getRandomLevel(startTime: number): any[] {
                let levelConfig = ConfigProxy.levelConfig.getItemAt(~~(Math.random() * ConfigProxy.levelConfig.length));
                let list = [];
                let time = startTime;

                //怪物进场
                list.push({
                    operate: 1, //怪物进场
                    time: time,
                    cut: 0
                });

                //提示轮开始
                time += ConfigProxy.getConfig("monsterEnterTime");
                list.push({
                    operate: 2, //提示轮开始
                    time: time,
                });

                //计算提示拍子
                time += ConfigProxy.getConfig("tipStartTime");
                let count = 0;
                let start = list.length;
                for (let i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 3,
                            time: time,
                            index: list.length - start
                        });
                        (list[0] as any).cut++;
                    } else {
                        count++;
                    }
                }

                //提示轮结束
                time += ConfigProxy.getConfig("tipEndTime");
                list.push({
                    operate: 4, //提示轮结束
                    time: time
                });

                //操作轮开始
                time += ConfigProxy.getConfig("tipGapTime");
                list.push({
                    operate: 5, //操作轮开始
                    time: time
                });

                //计算操作拍子
                time += ConfigProxy.getConfig("operateSrartTime");
                count = 0;
                start = list.length;
                for (let i = 1; i < 10000; i++) {
                    if (levelConfig["beat" + i]) {
                        count++;
                        time += levelConfig.speed * count;
                        count = 0;
                        list.push({
                            operate: 6,
                            time: time,
                            index: list.length - start
                        });
                    } else {
                        count++;
                    }
                }

                //操作轮结束
                time += ConfigProxy.getConfig("operateEndTime");
                list.push({
                    operate: 7, //操作轮结束
                    time: time
                });

                //怪物退场
                time += ConfigProxy.getConfig("monsterExitTime");
                list.push({
                    operate: 8, //操作轮结束
                    time: time
                });
                return list;
            }

            private static getLevelConfigTime(cfg: any): number {
                for (let i = 0; i < cfg.length; i++) {
                    if (cfg[i].operate == 8) {
                        return cfg[i].time;
                    }
                }
                return 0;
            }
        }
    }
}