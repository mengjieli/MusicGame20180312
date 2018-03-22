namespace game {
    export namespace bamaoStart {
        export class ConfigProxy {

            private static flag: boolean = false;

            public static init() {
                if (!ConfigProxy.flag) {
                    ConfigProxy.flag = true;

                    // //分析 AllConfig
                    // ConfigProxy.allConfig = ConfigProxy.decodeConfig(ResourceProxy.getResource("allConfig"));

                    //分析 LevelConfig
                    ConfigProxy.levelConfig = ConfigProxy.decodeConfig(Resource.getResource("levelConfig"));

                }
            }

            private static levelConfig: lib.ArrayValue = new lib.ArrayValue();

            public static getLevelAt(index:number):any {
                return ConfigProxy.levelConfig.getItemAt(index);
            }

            public static get levelCount():number {
                return ConfigProxy.levelConfig.length;
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
        }
    }
}