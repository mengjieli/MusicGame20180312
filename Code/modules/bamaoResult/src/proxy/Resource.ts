namespace game {
    export namespace bamaoResult {
        export class Resource {

            private static loadList: any[] = [
                {name: "ui", url: "baMaoResult/res/ui", type: "URLLoader"},
            ];

            public static async loadResources() {
                let list: any[] = Resource.loadList;
                return new Promise<void>(function (resolve: Function) {
                    let index = 0;

                    async function load() {
                        if (index >= list.length) {
                            resolve();
                            return;
                        }
                        let res = list[index];
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
                                load();
                            });
                        }
                    }

                    load();
                }.bind(this));
            }

            public static getResource(name: string): any {
                for (let i = 0; i < Resource.loadList.length; i++) {
                    if (Resource.loadList[i].name == name) {
                        return Resource.loadList[i].data;
                    }
                }
                return null;
            }
        }
    }
}