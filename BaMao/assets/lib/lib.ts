////////////////////////////////black/flower/platform/creator/Platform.ts/////////////////////////////////
namespace lib {
    export class Platform {
        static type = "creator";
        static native = cc.sys.isNative;

        static stage;
        static width;
        static height;

        static start() {
            lib.data.system.screen.width = cc.director.getWinSize().width;
            lib.data.system.screen.height = cc.director.getWinSize().height;

            setInterval(Platform._run,1000/60);
            CoreTime.$playEnterFrame = false;
        }


        static _runBack;
        static lastTime = (new Date()).getTime();
        static frame = 0;

        static _run() {
            Platform.frame++;
            var now = (new Date()).getTime();
            Platform._runBack(now - Platform.lastTime);
            Platform.lastTime = now;
            PlatformURLLoader.run();
        }

        static pools = {};

        static create(name) {
            var pools = Platform.pools;
            return null;
        }

        static release(name, object) {
            object.release();
            var pools = Platform.pools;
            if (!pools[name]) {
                pools[name] = [];
            }
            pools[name].push(object);

        }
    }
}

////////////////////////////////black/flower/platform/creator/PlatformURLLoader.ts/////////////////////////////////
namespace lib {
    export class PlatformURLLoader {

        static isLoading = false;
        static loadingFrame;
        static loadingFunc;
        static loadingArgs;
        static loadingId = 0;
        static checkFrame;
        static loadingList = [];

        static loadText(url, back, errorBack, thisObj, method, params, contentType) {
            if (PlatformURLLoader.isLoading) {
                PlatformURLLoader.loadingList.push([PlatformURLLoader.loadText, url, back, errorBack, thisObj, method, params, contentType]);
                return;
            }
            // if (TIP) {
            //     $tip(2001, url);
            // }
            PlatformURLLoader.isLoading = true;
            PlatformURLLoader.loadingFunc = PlatformURLLoader.realLoadText;
            PlatformURLLoader.loadingArgs = arguments;
            PlatformURLLoader.loadingFunc.apply(null, arguments);
        }

        static realLoadText(url, back, errorBack, thisObj, method, params, contentType) {
            PlatformURLLoader.loadingFrame = Platform.frame;
            PlatformURLLoader.loadingId++;
            var id = PlatformURLLoader.loadingId;
            if (url.slice(0, "http://".length) == "http://") {
                PlatformURLLoader.checkFrame = Platform.frame + 120;
                var pstr = "?";
                for (var key in params) {
                    pstr += key + "=" + params[key] + "&";
                }
                if (pstr.charAt(pstr.length - 1) == "&") {
                    pstr = pstr.slice(0, pstr.length - 1);
                }
                if (pstr != "?") {
                    url += pstr;
                }
                var xhr = cc.loader.getXMLHttpRequest();
                if (method == null || method == "") {
                    method = "GET";
                }
                if (method == "GET") {
                    xhr.open("GET", url, true);
                } else if (method == "POST") {
                    xhr.open("POST", url, true);
                    if (!contentType) {
                        contentType = "application/x-www-form-urlencoded";
                    }
                    xhr.setRequestHeader("Content-Type", contentType);
                } else if (method == "HEAD") {
                    xhr.open("HEAD", url, true);
                    xhr.open("HEAD", url, true);
                }
                xhr.onloadend = function () {
                    if (id != PlatformURLLoader.loadingId) {
                        return;
                    }
                    if (xhr.status != 200) {
                        errorBack.call(thisObj);
                    } else {
                        if (method == "HEAD") {
                            back.call(thisObj, xhr.getAllResponseHeaders());
                        } else {
                            back.call(thisObj, xhr.responseText);
                        }
                    }
                    PlatformURLLoader.isLoading = false;
                    PlatformURLLoader.loadingId++;
                };
                xhr.send();
            } else {
                PlatformURLLoader.checkFrame = Platform.frame + 3;
                var res;
                var end = url.split(".")[url.split(".").length - 1];
                // if (end != "plist" && end != "xml" && end != "json") {
                //     res = cc.loader.getRes(url);
                // }
                if (res) {
                    if (id != PlatformURLLoader.loadingId) {
                        return;
                    }
                    back.call(thisObj, res);
                    PlatformURLLoader.isLoading = false;
                    PlatformURLLoader.loadingId++;
                } else {
                    cc.loader.loadRes(url, function (error, data) {
                        if (id != PlatformURLLoader.loadingId) {
                            return;
                        }
                        if (error) {
                            errorBack.call(thisObj);
                        }
                        else {
                            // if (!CACHE) {
                            cc.loader.release(url);
                            // }
                            if (data instanceof Array) {
                                data = JSON.stringify(data[0]);
                            }
                            back.call(thisObj, data);
                        }
                        PlatformURLLoader.isLoading = false;
                        PlatformURLLoader.loadingId++;
                    });
                }
            }
        }

        static loadTexture(url, back, errorBack, thisObj, params) {
            if (PlatformURLLoader.isLoading) {
                PlatformURLLoader.loadingList.push([PlatformURLLoader.loadTexture, url, back, errorBack, thisObj, params]);
                return;
            }
            // if (TIP) {
            //     $tip(2002, url);
            // }
            PlatformURLLoader.isLoading = true;
            PlatformURLLoader.loadingFunc = PlatformURLLoader.realLoadTexture;
            PlatformURLLoader.loadingArgs = arguments;
            PlatformURLLoader.loadingFunc.apply(null, arguments);

        }

        static realLoadTexture(url, back, errorBack, thisObj, params) {
            PlatformURLLoader.loadingFrame = Platform.frame;
            if (url.slice(0, "http://".length) == "http://") {
                PlatformURLLoader.checkFrame = Platform.frame + 120;
            } else {
                PlatformURLLoader.checkFrame = Platform.frame + 3;
            }
            PlatformURLLoader.loadingId++;
            var id = PlatformURLLoader.loadingId;
            cc.loader.loadImg(url, {isCrossOrigin: true}, function (err, img) {
                if (id != PlatformURLLoader.loadingId) {
                    return;
                }
                if (err) {
                    errorBack.call(thisObj);
                }
                else {
                    if (!CACHE) {
                        cc.loader.release(url);
                    }
                    var texture;
                    if (Platform.native) {
                        texture = img;
                    } else {
                        texture = new cc.Texture2D();
                        texture.initWithElement(img);
                        texture.handleLoadedTexture();
                    }
                    back.call(thisObj, texture, texture.getContentSize().width, texture.getContentSize().height);
                    //if (Platform.native) {
                    //    back.call(thisObj, texture, texture.getContentSize().width, texture.getContentSize().height);
                    //} else {
                    //    back.call(thisObj, new cc.Texture2D(texture), texture.width, texture.height);
                    //}
                }
                PlatformURLLoader.isLoading = false;
                PlatformURLLoader.loadingId++;
            });
        }

        static run() {
            if (PlatformURLLoader.isLoading == false) {
                if (PlatformURLLoader.loadingList.length) {
                    var item = PlatformURLLoader.loadingList.shift();
                    item[0].apply(null, item.slice(1, item.length));
                }
            } else {
                if (Platform.frame >= PlatformURLLoader.checkFrame) {
                    console.log("Try load again: " + PlatformURLLoader.loadingArgs[0]);
                    PlatformURLLoader.loadingFunc.apply(null, PlatformURLLoader.loadingArgs);
                }
            }
        }
    }
}

////////////////////////////////black/flower/platform/creator/PlatformWebSocket.ts/////////////////////////////////
namespace lib {
    export class PlatformWebSocket {

        webSocket;

        bindWebSocket(ip, port, path, thisObj, onConnect, onReceiveMessage, onError, onClose) {
            var websocket = new LocalWebSocket("ws://" + ip + ":" + port + path);
            this.webSocket = websocket;
            var openFunc = function () {
                onConnect.call(thisObj);
            };
            websocket.onopen = openFunc;
            var receiveFunc = function (event) {
                if (!cc.sys.isNative && event.data instanceof Blob) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        var list = [];
                        var data = new Uint8Array(this.result);
                        for (var i = 0; i < data.length; i++) {
                            list.push(data[i]);
                        }
                        onReceiveMessage.call(thisObj, "buffer", list);
                    }
                    reader.readAsArrayBuffer(event.data);
                } else if (cc.sys.isNative && event.data instanceof ArrayBuffer) {
                    var list = [];
                    var data = new Uint8Array(event.data);
                    for (var i = 0; i < data.length; i++) {
                        list.push(data[i]);
                    }
                    onReceiveMessage.call(thisObj, "buffer", list);
                } else {
                    onReceiveMessage.call(thisObj, "string", event.data);
                }
            };
            websocket.onmessage = receiveFunc;
            var errorFunc = function () {
                onError.call(thisObj);
            };
            websocket.onerror = errorFunc;
            var closeFunc = function () {
                onClose.call(thisObj);
            };
            websocket.onclose = closeFunc;
            PlatformWebSocket.webSockets.push({
                "webSocket": websocket
            });
            return websocket;
        }

        sendWebSocketUTF(data) {
            this.webSocket.send(data);
        }

        sendWebSocketBytes(data) {
            this.webSocket.send(new Uint8Array(data));
        }

        releaseWebSocket() {
            var item = null;
            var list = PlatformWebSocket.webSockets;
            var webSocket = this.webSocket;
            for (var i = 0; i < list.length; i++) {
                if (websocket == list[i].webSocket) {
                    websocket.close();
                    websocket.onopen = null;
                    websocket.onmessage = null;
                    websocket.onerror = null;
                    websocket.onclose = null;
                    this.webSocket = null;
                    list.splice(i, 1);
                    break;
                }
            }
        }

        static webSockets = [];
    }
}

////////////////////////////////black/flower/core/CoreTime.ts/////////////////////////////////
namespace lib {
    export class CoreTime {

        static currentTime = 0;
        static lastTimeGap:number;
        static $playEnterFrame = true;

        static $run(gap:number) {
            CoreTime.lastTimeGap = gap;
            CoreTime.currentTime += gap;
            EnterFrame.$update(CoreTime.currentTime, gap);
        }

        static getTime() {
            return CoreTime.currentTime;
        }
    }
}

////////////////////////////////black/flower/event/Event.ts/////////////////////////////////
namespace lib {
    export class Event {

        $type: string;
        $bubbles: boolean;
        $cycle: boolean = false;
        $target: any = null;
        $currentTarget: any = null;
        data: any;
        _isPropagationStopped: boolean = false;

        constructor(type: string, bubbles: boolean = false) {
            this.$type = type;
            this.$bubbles = bubbles;
        }

        public stopPropagation():void {
            this._isPropagationStopped = true;
        }

        public get isPropagationStopped():boolean {
            return this._isPropagationStopped;
        }

        public get type():string {
            return this.$type;
        }

        public get bubbles():boolean {
            return this.$bubbles;
        }

        public get target():any {
            return this.$target;
        }

        public get currentTarget():any {
            return this.$currentTarget;
        }

        public static READY = "ready";
        public static COMPLETE = "complete";
        public static ADDED = "added";
        public static REMOVED = "removed";
        public static ADD = "add";
        public static REMOVE = "remove";
        public static ADDED_TO_STAGE = "added_to_stage";
        public static REMOVED_FROM_STAGE = "removed_from_stage";
        public static CONNECT = "connect";
        public static CLOSE = "close";
        public static CHANGE = "change";
        public static ERROR = "error";
        public static FOCUS_IN = "focus_in";
        public static FOCUS_OUT = "focus_out";
        public static CONFIRM = "confirm";
        public static CANCEL = "cancel";
        public static START_INPUT = "start_input";
        public static STOP_INPUT = "stop_input";
        public static DISTORT = "distort";
        public static CREATION_COMPLETE = "creation_complete";
        public static SELECTED_ITEM_CHANGE = "selected_item_change";
        public static CLICK_ITEM = "click_item";
        public static TOUCH_BEGIN_ITEM = "touch_begin_item";

        public static _eventPool = [];

        public static create(type, data = null, bubbles = false) {
            var e;
            if (!lib.Event._eventPool.length) {
                e = new lib.Event(type);
            }
            else {
                e = lib.Event._eventPool.pop();
                e.$cycle = false;
            }
            e.$type = type;
            e.$bubbles = bubbles;
            e.data = data;
            return e;
        }

        public static release(e) {
            if (e.$cycle) {
                return;
            }
            e.$cycle = true;
            e.data = null;
            lib.Event._eventPool.push(e);
        }
    }
}

////////////////////////////////black/flower/event/EventDispatcher.ts/////////////////////////////////
namespace lib {

    export class EventDispatcher {

        __EventDispatcher: any;
        __hasDispose: boolean = false;

        constructor(target?: any) {
            this.__EventDispatcher = {
                0: target || this,
                1: {}
            }
        }

        public get isDispose(): boolean {
            return this.__hasDispose;
        }

        public dispose(): void {
            this.__EventDispatcher = null;
            this.__hasDispose = true;
        }

        $release() {
            this.__EventDispatcher = {
                0: this,
                1: {}
            }
        }

        /**
         *
         * @param type
         * @param listener
         * @param thisObject
         * @param priority 监听事件的优先级，暂未实现
         */
        public once(type: string, listener: Function, thisObject: any = null, priority: number = 0, args: any = null): void {
            this.__addListener(type, listener, thisObject, priority, true, args);
        }

        /**
         *
         * @param type
         * @param listener
         * @param thisObject
         * @param priority 监听事件的优先级，暂未实现
         */
        public addListener(type: string, listener: Function, thisObject: any = null, priority: number = 0, args: any = null): void {
            this.__addListener(type, listener, thisObject, priority, false, args);
        }

        /**
         * 监听事件
         * @param type
         * @param listener
         * @param thisObject
         * @param priority 监听事件的优先级，暂未实现
         * @param once
         * @private
         */
        private __addListener(type, listener, thisObject, priority, once, args): void {
            // if (DEBUG) {
            //     if (this.__hasDispose) {
            //         $error(1002);
            //     }
            //     if (type == null) {
            //         $error(1100);
            //     }
            //     if (listener == null) {
            //         $error(1101);
            //     }
            // }
            var values = this.__EventDispatcher;
            var events = values[1];
            var list = events[type];
            if (!list) {
                list = values[1][type] = [];
            }
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                var agrsame = item.args == args ? true : false;
                if (!agrsame && item.args && args) {
                    var arg1 = item.args.length ? item.args : [item.args];
                    var arg2 = args.length ? args : [args];
                    if (arg1.length == arg2.length) {
                        agrsame = true;
                        for (var a = 0; a < arg1.length; a++) {
                            if (arg1[a] != arg2[a]) {
                                agrsame = false;
                                break;
                            }
                        }
                    }
                }
                if (item.listener == listener && item.thisObject == thisObject && item.del == false && agrsame) {
                    return;
                }
            }
            list.push({"listener": listener, "thisObject": thisObject, "once": once, "del": false, args: args});
        }

        removeListener(type, listener, thisObject) {
            if (this.__hasDispose) {
                return;
            }
            var values = this.__EventDispatcher;
            var events = values[1];
            var list = events[type];
            if (!list) {
                return;
            }
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].listener == listener && list[i].thisObject == thisObject && list[i].del == false) {
                    list[i].listener = null;
                    list[i].thisObject = null;
                    list[i].del = true;
                    break;
                }
            }
        }

        removeAllListener() {
            if (this.__hasDispose) {
                return;
            }
            var values = this.__EventDispatcher;
            var events = values[1];
            events = {};
        }

        hasListener(type) {
            // if (DEBUG) {
            //     if (this.__hasDispose) {
            //         $error(1002);
            //     }
            // }
            var events = this.__EventDispatcher[1];
            var list = events[type];
            if (!list) {
                return false;
            }
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].del == false) {
                    return true;
                }
            }
            return false;
        }

        dispatch(event) {
            if (!this.__EventDispatcher) {
                return;
            }
            // if (DEBUG) {
            //     if (this.__hasDispose) {
            //         $error(1002);
            //     }
            // }
            var list = this.__EventDispatcher[1][event.type];
            if (!list) {
                return;
            }

            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].del == false) {
                    var listener = list[i].listener;
                    var thisObj = list[i].thisObject;
                    if (event.$target == null) {
                        event.$target = this;
                    }
                    event.$currentTarget = this;
                    var args = [event];
                    if (list[i].args) {
                        args = args.concat(list[i].args);
                    }
                    if (list[i].once) {
                        list[i].listener = null;
                        list[i].thisObject = null;
                        list[i].del = true;
                    }
                    listener.apply(thisObj, args);
                }
            }
            for (i = 0; i < list.length; i++) {
                if (list[i].del == true) {
                    list.splice(i, 1);
                    i--;
                }
            }
        }

        dispatchWith(type, data = null, bubbles = false) {
            // if (DEBUG) {
            //     if (this.__hasDispose) {
            //         $error(1002);
            //     }
            // }
            var e = Event.create(type, data, bubbles);
            e.$target = this;
            this.dispatch(e);
            Event.release(e);
        }
    }

}


////////////////////////////////black/flower/language/Language.ts/////////////////////////////////
namespace lib {

    class Language {

        static currentLanguage = "";
        static __languages = [];

    }


    var $locale_strings = {};
    var $game_strings = {};

    /**
     * @private
     * 全局多语言翻译函数
     * @param code 要查询的字符串代码
     * @param args 替换字符串中{0}标志的参数列表
     * @returns 返回拼接后的字符串
     */
    export function getLanguage(code, ...args) {
        var language = $language;
        if (!$locale_strings[language]) {
            language = "zh_CN";
        }
        var text = $locale_strings[language][code];
        if (!text) {
            return "{" + code + "}";
        }
        var length = args.length;
        for (var i = 0; i < length; i++) {
            text = StringDo.replaceString(text, "{" + i + "}", args[i]);
        }
        return text;
    }

    /**
     * 设置游戏语言库
     * @param language
     * @param code
     * @param content
     */
    export function setGameLanguage(language, code, content) {
        if (!$game_strings[language]) {
            $game_strings[language] = {};
        }
        $game_strings[language][code] = content;
    }

    /**
     * 获取游戏语言文字
     * @param code
     * @param args
     * @returns {*}
     */
    export function getGameLanguage(code, ...args) {
        if (!$game_strings[$language]) {
            return "";
        }
        var text = $game_strings[$language][code];
        if (!text) {
            return "{" + code + "}";
        }
        var length = args.length;
        for (var i = 0; i < length; i++) {
            text = StringDo.replaceString(text, "{" + i + "}", args[i]);
        }
        return text;
    }
}

////////////////////////////////black/flower/language/zh_CN.ts/////////////////////////////////
namespace lib {
    export var $locale_strings = {};
    $locale_strings["zh_CN"] = $locale_strings["zh_CN"] || {};

    var locale_strings = $locale_strings["zh_CN"];
    var docsWebSite = "github.com/mengjieli/flower/blob/UI/";

    //core 1000-3000
    locale_strings[1001] = "对象已经回收。";
    locale_strings[1002] = "对象已释放，对象名称:{0}";
    locale_strings[1003] = "重复创建纹理:{0}";
    locale_strings[1004] = "创建纹理:{0}";
    locale_strings[1005] = "释放纹理:{0}";
    locale_strings[1006] = "纹理已释放:{0} ，关于纹理释放可访问 http://" + docsWebSite + "docs/class/texture.md?dispose";
    locale_strings[1007] = "{0} 超出索引: {1}，索引范围为 0 ~ {2}";
    locale_strings[1008] = "错误的参数类型：{0} ，请参考 http://" + docsWebSite + "docs/class/{1}.md?f{2}";
    locale_strings[1020] = "开始标签和结尾标签不一致，开始标签：{0} ，结尾标签：{1}";
    locale_strings[1030] = "目标显示对象不在同一个显示列表中";
    locale_strings[1100] = "监听事件类型不能为空";
    locale_strings[1101] = "监听事件回调函数不能为空";
    locale_strings[2001] = "[loadText] {0}";
    locale_strings[2002] = "[loadTexture] {0}";
    locale_strings[2003] = "[加载失败] {0}";
    locale_strings[2004] = "[加载Plist失败] {0}";
}

////////////////////////////////black/flower/error/Error.ts/////////////////////////////////
namespace lib {

    /**
     * @private
     */
    export class Error {

        /**
         * 网络关闭
         * @type {number}
         */
        public static $SOCKET_CLOSED = -1;
    }
}

////////////////////////////////black/flower/utils/Help.ts/////////////////////////////////
namespace lib {
    export class Help {

        /**
         *
         * 获取一个新的 uuid
         * @returns {string}
         */
        public static getuuid(): string {
            return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        /**
         * 程序等待
         * @param {number} time 等待时间，单位 毫秒
         * @returns {Promise<void>}
         */
        public static async sleep(time: number): Promise<void> {
            return new Promise<void>(function (resolve) {
                setTimeout(resolve, time);
            });
        }
    }
}

////////////////////////////////black/flower/utils/UTFChange.ts/////////////////////////////////
namespace lib {
    export class UTFChange {

        /**
         * 把二进数组制转换成字符串
         * @param {number[]} arr 二进制数组
         * @returns {string} 字符串
         */
        public static bytesToString(arr: number[]): string {
            //arr = arr.reverse();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < 0) arr[i] += 256;
            }
            var res = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == 0) continue;
                if ((arr[i] & 128) == 0) res.push(arr[i]);				//1位
                else if ((arr[i] & 64) == 0) res.push(arr[i] % 128);		//1位
                else if ((arr[i] & 32) == 0)	//2位
                {
                    res.push((arr[i] % 32) * 64 + (arr[i + 1] % 64));
                    i++;
                }
                else if ((arr[i] & 16) == 0)	//3位
                {
                    res.push((arr[i] % 16) * 64 * 64 + (arr[i + 1] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                }
                else if ((arr[i] & 8) == 0)	//4位
                {
                    res.push((arr[i] % 8) * 64 * 64 * 64 + (arr[i + 1] % 64) * 64 * 64 + (arr[i + 2] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                    i++;
                } else {
                    // console.log("?!!!!!!!!!!!!!!!!!!!", arr[i]);
                }
            }
            var str = "";
            for (i = 0; i < res.length; i++) {
                str += String.fromCharCode(res[i]);
            }
            return str;
        }

        /**
         * 把字符串转换成二进制数组
         * @param {string} str 字符串
         * @returns {number[]} 二进制数组
         */
        public static stringToBytes(str: string): number[] {
            var res: number[] = [];
            var num: number;
            for (var i = 0; i < str.length; i++) {
                num = str.charCodeAt(i);
                if (num < 128) {
                    res.push(num);
                }
                else if (num < 2048) {
                    res.push(~~(num / 64) + 128 + 64);
                    res.push((num % 64) + 128);
                }
                else if (num < 65536) {
                    res.push(~~(num / 4096) + 128 + 64 + 32);
                    res.push(~~((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
                else {
                    res.push(~~(num / 262144) + 128 + 64 + 32 + 16);
                    res.push(~~((num % 262144) / 4096) + 128);
                    res.push(~~((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
            }
            return res;
        }
    }
}

////////////////////////////////black/flower/utils/CallLater.ts/////////////////////////////////
namespace lib {
    export
    class CallLater {
        _func;
        _thisObj;
        _data;

        constructor(func, thisObj, args = null) {
            this._func = func;
            this._thisObj = thisObj;
            this._data = args || [];
            CallLater._next.push(this);
        }

        $call() {
            this._func.apply(this._thisObj, this._data);
            this._func = null;
            this._thisObj = null;
            this._data = null;
        }

        static add(func, thisObj, args = null) {
            for (var i = 0, len = CallLater._next.length; i < len; i++) {
                if (CallLater._next[i]._func == func && CallLater._next[i]._thisObj == thisObj) {
                    CallLater._next[i]._data = args || [];
                    return;
                }
            }
            new CallLater(func, thisObj, args);
        }

        static _next = [];
        static _list = [];

        static $run() {
            if (!CallLater._next.length) {
                return;
            }
            CallLater._list = CallLater._next;
            CallLater._next = [];
            var list = CallLater._list;
            while (list.length) {
                list.pop().$call();
            }
        }

        static $dispose() {
            CallLater._list = [];
            CallLater._next = [];
        }

    }
}

////////////////////////////////black/flower/utils/DelayCall.ts/////////////////////////////////
namespace lib {
    export class DelayCall {

        _func;
        _thisObj;
        _data;
        _time;
        _start;
        _count;
        $complete;


        constructor(time, count, func, thisObj, ...args) {
            this._func = func;
            this._thisObj = thisObj;
            this._data = args || [];
            this._time = time;
            this._start = CoreTime.currentTime;
            this._count = count || 1000000000;
            this.$complete = false;
            DelayCall._next.push(this);
        }

        $update() {
            if (!this.$complete && CoreTime.currentTime - this._start > this._time) {
                this._func.apply(this._thisObj, this._data);
                this._count--;
                if (!this.$complete && this._count > 0) {
                    this._start = CoreTime.currentTime;
                } else {
                    this._func = null;
                    this._thisObj = null;
                    this._data = null;
                    this.$complete = true;
                }
            }
        }

        dispose() {
            this.$complete = true;
        }


        static _list = [];
        static _next = [];

        static $run() {
            DelayCall._list = DelayCall._list.concat(DelayCall._next);
            DelayCall._next.length = 0;
            var list = DelayCall._list;
            for (var i = 0; i < list.length; i++) {
                list[i].$update();
            }
            for (var i = 0; i < list.length; i++) {
                if (list[i].$complete) {
                    list.splice(i, 1);
                    i--;
                }
            }
        }

        static $dispose() {
            DelayCall._list.length = 0;
            DelayCall._next.length = 0;
        }

    }
}

////////////////////////////////black/flower/utils/EnterFrame.ts/////////////////////////////////
namespace lib {
    export class EnterFrame {

        static enterFrames = [];
        static waitAdd = [];

        static add(call, owner) {
            for (var i = 0; i < EnterFrame.enterFrames.length; i++) {
                if (EnterFrame.enterFrames[i].call == call && EnterFrame.enterFrames[i].owner == owner) {
                    return;
                }
            }
            for (i = 0; i < EnterFrame.waitAdd.length; i++) {
                if (EnterFrame.waitAdd[i].call == call && EnterFrame.waitAdd[i].owner == owner) {
                    return;
                }
            }
            EnterFrame.waitAdd.push({"call": call, "owner": owner});
        }

        static remove(call, owner) {
            for (var i = 0; i < EnterFrame.enterFrames.length; i++) {
                if (EnterFrame.enterFrames[i].call == call && EnterFrame.enterFrames[i].owner == owner) {
                    EnterFrame.enterFrames.splice(i, 1);
                    return;
                }
            }
            for (i = 0; i < EnterFrame.waitAdd.length; i++) {
                if (EnterFrame.waitAdd[i].call == call && EnterFrame.waitAdd[i].owner == owner) {
                    EnterFrame.waitAdd.splice(i, 1);
                    return;
                }
            }
        }

        static frame = 0;
        static updateFactor = 1;
        static __lastFPSTime = 0;
        static __lastFPSFrame = 0;

        static $update(now, gap) {
            EnterFrame.frame++;
            var st = (new Date()).getTime();
            var et;
            CallLater.$run();
            et = (new Date()).getTime();
            // DebugInfo.cpu.callLater += et - st;
            st = et;
            DelayCall.$run();
            et = (new Date()).getTime();
            // DebugInfo.cpu.delayCall += et - st;
            st = et;
            if (EnterFrame.waitAdd.length) {
                EnterFrame.enterFrames = EnterFrame.enterFrames.concat(EnterFrame.waitAdd);
                EnterFrame.waitAdd = [];
            }
            var copy = EnterFrame.enterFrames;
            for (var i = 0; i < copy.length; i++) {
                copy[i].call.apply(copy[i].owner, [now, gap]);
            }
            et = (new Date()).getTime();
            // DebugInfo.cpu.enterFrame += et - st;
            if (now - EnterFrame.__lastFPSTime > 500) {
                // DebugInfo.cpu.fps = ~~((EnterFrame.frame - EnterFrame.__lastFPSFrame) * 500 / (now - EnterFrame.__lastFPSTime));
                EnterFrame.__lastFPSTime = now;
                EnterFrame.__lastFPSFrame = EnterFrame.frame;
            }
        }

        static $dispose() {
            EnterFrame.enterFrames = [];
            EnterFrame.waitAdd = [];
        }
    }
}

////////////////////////////////black/flower/utils/StringDo.ts/////////////////////////////////
namespace lib {
    export class StringDo {

        static isNumberString(str) {
            var hasDot = false;
            for (var i = 0; i < str.length; i++) {
                if (i == 0 && str.charAt(0) == "+" || str.charAt(0) == "-") {

                } else {
                    if (str.charAt(i) == ".") {
                        if (hasDot) {
                            return false;
                        }
                        hasDot = true;
                    } else {
                        var code = str.charCodeAt(i);
                        if (code < 48 || code > 57) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        static changeStringToInner(content) {
            var len = content.length;
            for (var i = 0; i < len; i++) {
                if (content.charAt(i) == "\t") {
                    content = content.slice(0, i) + "\\t" + content.slice(i + 1, len);
                    i++;
                    len++;
                } else if (content.charAt(i) == "\n") {
                    content = content.slice(0, i) + "\\n" + content.slice(i + 1, len);
                    i++;
                    len++;
                } else if (content.charAt(i) == "\r") {
                    content = content.slice(0, i) + "\\r" + content.slice(i + 1, len);
                    i++;
                    len++;
                } else if (content.charAt(i) == "\"") {
                    content = content.slice(0, i) + "\\\"" + content.slice(i + 1, len);
                    i++;
                    len++;
                }
            }
            return content;
        }

        static findString(content, findString, begin) {
            begin = begin || 0;
            for (var i = begin; i < content.length; i++) {
                if (content.slice(i, i + findString.length) == findString) {
                    return i;
                }
            }
            return -1;
        }

        static findStrings(content, findStrings, begin) {
            begin = begin || 0;
            for (var i = begin; i < content.length; i++) {
                for (var j = 0; j < findStrings.length; j++) {
                    if (content.slice(i, i + findStrings[j].length) == findStrings[j]) {
                        return i;
                    }
                }
            }
            return -1;
        }

        static jumpStrings(content, start, jumps) {
            var pos = start;
            while (true) {
                var find = false;
                for (var i = 0; i < jumps.length; i++) {
                    if (jumps[i] == content.slice(pos, pos + jumps[i].length)) {
                        find = true;
                        pos += jumps[i].length;
                        break;
                    }
                }
                if (find == false) {
                    break;
                }
            }
            return pos;
        }

        // static findCharNotABC(content, start) {
        //     start = +start;
        //     for (var i = start; i < content.length; i++) {
        //         if (!StringDo.isCharABC(content.charAt(i))) {
        //             return i;
        //         }
        //     }
        //     return content.length;
        // }

        static replaceString(str, findStr, tstr) {
            for (var i = 0; i < str.length; i++) {
                if (StringDo.hasStringAt(str, [findStr], i)) {
                    str = str.slice(0, i) + tstr + str.slice(i + findStr.length, str.length);
                    i--;
                }
            }
            return str;
        }

        static hasStringAt(str, hstrs, pos) {
            for (var i = 0; i < hstrs.length; i++) {
                var hstr = hstrs[i];
                if (str.length - pos >= hstr.length && str.slice(pos, pos + hstr.length) == hstr) {
                    return true;
                }
            }
            return false;
        }

        static findId(str, pos) {
            if (str.length <= pos) {
                return "";
            }
            var id = "";
            var code;
            for (var j = pos, len = str.length; j < len; j++) {
                code = str.charCodeAt(j);
                if (code >= 65 && code <= 90 || code >= 97 && code <= 122 || code == 36 || code == 95 || j != pos && code >= 48 && code <= 57) {
                    id += str.charAt(j);
                } else {
                    break;
                }
            }
            return id;
        }

        /**
         * 分析函数体
         * @param str
         * @param pos
         */
        static findFunctionContent(str, pos) {
            if (str.length <= pos) {
                return "";
            }
            //跳过程序空白
            pos = StringDo.jumpProgramSpace(str, pos);
            if (str.charAt(pos) != "{") {
                return "";
            }
            var end = pos + 1;
            var startPos;
            var endPos;
            var count = 0;
            while (true) {
                var startPos = StringDo.findString(str, "{", end);
                var endPos = StringDo.findString(str, "}", end);
                if (startPos != -1 && endPos != -1) {
                    if (startPos < endPos) {
                        count++;
                        end = startPos + 1;
                    } else {
                        count--;
                        end = endPos + 1;
                        if (count < 0) {
                            break;
                        }
                    }
                } else if (startPos != -1) {
                    return "";
                } else if (endPos != -1) {
                    end = endPos + 1;
                    count--;
                    if (count < 0) {
                        break;
                    }
                } else {
                    return "";
                }
            }
            return str.slice(pos, end);
        }

        /**
         * 删除程序注释
         * @param str
         * @param pos
         */
        static deleteProgramNote(str, pos) {
            var end;
            for (var len = str.length; pos < len; pos++) {
                if (str.slice(pos, pos + 2) == "//") {
                    end = StringDo.findStrings(str, ["\r", "\n"], pos);
                    str = str.slice(0, pos) + str.slice(end, str.length);
                    len = str.length;
                    pos--;
                } else if (str.slice(pos, pos + 2) == "/*") {
                    end = StringDo.findString(str, "*/", pos);
                    if (end == -1) {
                        return len;
                    }
                    end += 2;
                    while (true) {
                        var nextStart = StringDo.findString(str, "/*", end);
                        if (nextStart == -1) {
                            nextStart = len;
                        }
                        var nextEnd = StringDo.findString(str, "*/", end);
                        if (nextEnd == -1 || nextEnd > nextStart) {
                            break;
                        }
                        end = nextEnd + 2;
                    }
                    str = str.slice(0, pos) + str.slice(end, str.length);
                    len = str.length;
                }
            }
            return str;
        }

        /**
         * 跳过程序空格，包含 " ","\t","\r","\n"
         * @param str
         * @param pos
         */
        static jumpProgramSpace(str, pos) {
            for (var len = str.length; pos < len; pos++) {
                var char = str.charAt(pos);
                if (char == " " || char == "　" || char == "\t" || char == "\r" || char == "\n") {
                } else {
                    break;
                }
            }
            return pos;
        }

        static numberToString(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < 0) arr[i] += 256;
            }
            var res = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i] == 0)break;
                if ((arr[i] & 128) == 0) res.push(arr[i]);				//1位
                else if ((arr[i] & 64) == 0) res.push(arr[i] % 128);		//1位
                else if ((arr[i] & 32) == 0)	//2位
                {
                    res.push((arr[i] % 32) * 64 + (arr[i + 1] % 64));
                    i++;
                }
                else if ((arr[i] & 16) == 0)	//3位
                {
                    res.push((arr[i] % 16) * 64 * 64 + (arr[i + 1] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                }
                else if ((arr[i] & 8) == 0)	//4位
                {
                    res.push((arr[i] % 8) * 64 * 64 * 64 + (arr[i + 1] % 64) * 64 * 64 + (arr[i + 2] % 64) * 64 + (arr[i + 2] % 64));
                    i++;
                    i++;
                    i++;
                }
            }
            var str = "";
            for (i = 0; i < res.length; i++) {
                str += String.fromCharCode(res[i]);
            }
            return str;
        }

        static stringToBytes(str) {
            var res = [];
            var num;
            for (var i = 0; i < str.length; i++) {
                num = str.charCodeAt(i);
                if (num < 128) {
                    res.push(num);
                }
                else if (num < 2048) {
                    res.push(math.floor(num / 64) + 128 + 64);
                    res.push((num % 64) + 128);
                }
                else if (num < 65536) {
                    res.push(math.floor(num / 4096) + 128 + 64 + 32);
                    res.push(math.floor((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
                else {
                    res.push(math.floor(num / 262144) + 128 + 64 + 32 + 16);
                    res.push(math.floor((num % 262144) / 4096) + 128);
                    res.push(math.floor((num % 4096) / 64) + 128);
                    res.push((num % 64) + 128);
                }
            }
            return res;
        }

        /**
         * 如果不是数字则返回 null
         * @param value 字符串
         */
        static parseNumber(value) {
            if (typeof value == "number") {
                return value;
            }
            if (typeof value != "string") {
                return null;
            }
            var code0 = "0".charCodeAt(0);
            var code9 = "9".charCodeAt(0);
            var codeP = ".".charCodeAt(0);
            var isNumber;
            var hasPoint = false;
            var before = "";
            var end = "";
            var code;
            var flag = true;
            for (var p = 0; p < value.length; p++) {
                code = value.charCodeAt(p);
                if (hasPoint) {
                    if (code >= code0 && code <= code9) {
                        end += value.charAt(p);
                    } else {
                        flag = false;
                        break;
                    }
                } else {
                    if (code == codeP) {
                        hasPoint = true;
                    } else if (code >= code0 && code <= code9) {
                        before += value.charAt(p);
                    } else {
                        flag = false;
                        break;
                    }
                }
            }
            if (flag) {
                return parseInt(before) + (end != "" ? parseInt(end) / (Math.pow(10, end.length)) : 0);
            }
            return null;
        }

        static split(text, array) {
            if (!array) {
                return [text];
            }
            if (typeof array == "string") {
                array = [array];
            }
            var list = [];
            var start = 0;
            for (var i = 0, len = text.length; i < len; i++) {
                for (var a = 0; a < array.length; a++) {
                    if (text.slice(i, i + array[a].length) == array[a]) {
                        list.push(text.slice(start, i));
                        i += array[a].length - 1;
                        start = i + 1;
                        break;
                    }
                }
            }
            return list;
        }

        static intTo16(num) {
            var str = "";
            while (num) {
                var n = num & 0xF;
                num = num >> 4;
                if (n < 10) {
                    str = n + str;
                } else if (n == 10) {
                    str = "a" + str;
                } else if (n == 11) {
                    str = "b" + str;
                } else if (n == 12) {
                    str = "c" + str;
                } else if (n == 13) {
                    str = "d" + str;
                } else if (n == 14) {
                    str = "e" + str;
                } else if (n == 15) {
                    str = "f" + str;
                }
            }
            str = "0x" + str;
            return str;
        }
    }
}

////////////////////////////////black/flower/utils/ObjectDo.ts/////////////////////////////////
namespace lib {
    export class ObjectDo {

        static toString(obj, maxDepth = 4, before = "", depth = 0) {
            before = before || "";
            depth = depth || 0;
            maxDepth = maxDepth || 4;
            var str = "";
            if (typeof(obj) == "string") {
                str += "\"" + obj + "\"";
            }
            else if (typeof(obj) == "number") {
                str += obj;
            }
            else if (obj instanceof Array) {
                if (depth > maxDepth) {
                    return "...";
                }
                str = "[\n";
                for (var i = 0; i < obj.length; i++) {
                    str += before + " " + ObjectDo.toString(obj[i], maxDepth, before + " ", depth + 1) + (i < obj.length - 1 ? ",\n" : "\n");
                }
                str += before + "]";
            }
            else if (obj instanceof Object) {
                if (depth > maxDepth) {
                    return "...";
                }
                str = "{\n";
                for (var key in obj) {
                    str += before + " \"" + key + "\": " + ObjectDo.toString(obj[key], maxDepth, before + " ", depth + 1);
                    str += ",\n";
                }
                if (str.slice(str.length - 2, str.length) == ",\n") {
                    str = str.slice(0, str.length - 2) + "\n";
                }
                str += before + "}";
            }
            else {
                str += obj;
            }
            return str;
        }

        static keys(obj) {
            var list = [];
            for (var key in obj) {
                list.push(key);
            }
            return list;
        }

        static clone(obj) {
            var res:any = "";
            if (typeof(obj) == "string" || typeof(obj) == "number") {
                res = obj;
            }
            else if (obj instanceof Array) {
                res = obj.concat();
            }
            else if (obj instanceof Object) {
                res = {};
                for (var key in obj) {
                    res[key] = ObjectDo.clone(obj[key]);
                }
            }
            else {
                if (obj.hasOwnProperty("clone")) {
                    res = obj.clone();
                } else {
                    res = obj;
                }
            }
            return res;
        }
    }

}

////////////////////////////////black/flower/utils/ByteArray.ts/////////////////////////////////
namespace lib {
    export class ByteArray {

        //字节数组
        private bytes: number[];
        //读写指针的位置
        public position: number;
        //字节数
        private _length: number;

        /**
         * 构造函数
         */
        constructor() {
            this.bytes = [];
            this.position = 0;
            this.length = 0;
        }

        /**
         * 字节长度
         * @returns {number}
         */
        public get length(): number {
            return this._length;
        }

        public set length(val: number) {
            this._length = val;
        }

        /**
         * 剩余字节数
         * @returns {number}
         */
        public get bytesAvailable(): number {
            return this._length - this.position;
        }

        /**
         * 获取字节数组
         * @returns {number[]}
         */
        public get arrayData(): number[] {
            return this.bytes;
        }

        /**
         * 写一个字节
         * @param {number} val
         */
        public writeByte(val: number): void {
            val = val & 0xFF;
            this.bytes.splice(this.position, 0, val);
            this.length += 1;
            this.position += 1;
        }

        /**
         * 写一个 boolean 类型
         * @param {boolean} val
         */
        public writeBoolean(val: boolean): void {
            this.bytes.splice(this.position, 0, val == true ? 1 : 0);
            this.length += 1;
            this.position += 1;
        }

        /**
         * 写一个 Int
         * @param {number} val
         */
        public writeInt(val: number): void {
            if (val >= 0) {
                val *= 2;
            }
            else {
                val = ~val;
                val *= 2;
                val++;
            }
            this.writeUInt(val);
        }

        /**
         * 写一个 UInt
         * @param {number} val
         */
        public writeUInt(val: number): void {
            var flag = false;
            val = val < 0 ? -val : val;
            var val2 = 0;
            if (val >= 0x10000000) {
                val2 = val / 0x10000000;
                val = val & 0xFFFFFFF;
                flag = true;
            }
            if (flag || val >> 7) {
                this.bytes.splice(this.position, 0, 0x80 | val & 0x7F);
                this.position++;
                this.length++;
            }
            else {
                this.bytes.splice(this.position, 0, val & 0x7F);
                this.position++;
                this.length++;
            }
            if (flag || val >> 14) {
                this.bytes.splice(this.position, 0, 0x80 | (val >> 7) & 0x7F);
                this.position++;
                this.length++;
            }
            else if (val >> 7) {
                this.bytes.splice(this.position, 0, (val >> 7) & 0x7F);
                this.position++;
                this.length++;
            }
            if (flag || val >> 21) {
                this.bytes.splice(this.position, 0, 0x80 | (val >> 14) & 0x7F);
                this.position++;
                this.length++;
            }
            else if (val >> 14) {
                this.bytes.splice(this.position, 0, (val >> 14) & 0x7F);
                this.position++;
                this.length++;
            }
            if (flag || val >> 28) {
                this.bytes.splice(this.position, 0, 0x80 | (val >> 21) & 0x7F);
                this.position++;
                this.length++;
            }
            else if (val >> 21) {
                this.bytes.splice(this.position, 0, (val >> 21) & 0x7F);
                this.position++;
                this.length++;
            }
            if (flag) {
                this.writeUInt(Math.floor(val2));
            }
        }

        /**
         * 写一个 utf-8 字符串，前面带长度
         * @param {string} val 要写入的字符串
         */
        public writeUTF(val: string): void {
            var arr = UTFChange.stringToBytes(val);
            this.writeUInt(arr.length);
            for (var i = 0; i < arr.length; i++) {
                this.bytes.splice(this.position, 0, arr[i]);
                this.position++;
            }
            this.length += arr.length;
        }

        /**
         * 写一个 utf 字符串的内容，不带长度
         * @param {string} val 要写入的字符串
         * @param {number} len 要写入的字符串长度
         */
        public writeUTFBytes(val: string, len: number): void {
            var arr = UTFChange.stringToBytes(val);
            for (var i = 0; i < len; i++) {
                if (i < arr.length)
                    this.bytes.splice(this.position, 0, arr[i]);
                else
                    this.bytes.splice(this.position, 0, 0);
                this.position++;
            }
            this.length += len;
        }

        /**
         * 写入一个 ByteArray 的部分内容
         * @param {ByteArray} byteArray 要写入的 ByteArray 对象
         * @param {number} start 从写入对象的哪里开始读取
         * @param {number} len 要写入的长度
         */
        public writeByteArray(byteArray: ByteArray, start: number = 0, len: number = 0): void {
            var copy = byteArray.bytes;
            for (var i = start; i < copy.length && i < start + len; i++) {
                this.bytes.splice(this.position, 0, copy[i]);
                this.position++;
            }
            this.length += len;
        }

        /**
         * 把整个数组内容写进来
         * @param {number[]} array
         */
        public writeArray(array: number[]): void {
            var bytes = this.bytes;
            for (var i = 0, len = array.length; i < len; i++) {
                bytes.push(array[i]);
            }
            this.length += this.bytes.length;
        }

        /**
         * 读取一个字节
         * @returns {number}
         */
        public readByte(): number {
            this.position++;
            return this.bytes[this.position - 1];
        }

        /**
         * 读取一个 bool 对象
         * @returns {boolean}
         */
        public readBoolean(): boolean {
            this.position++;
            return this.bytes[this.position - 1] ? true : false;
        }

        /**
         * 读取一个 UInt
         * @returns {number}
         */
        public readUInt(): number {
            var bytes = this.bytes;
            var val = 0;
            var position = this.position;
            val += bytes[position] & 0x7F;
            if (bytes[position] >> 7) {
                position++;
                val += (bytes[position] & 0x7F) << 7;
                if (bytes[position] >> 7) {
                    position++;
                    val += (bytes[position] & 0x7F) << 14;
                    if (bytes[position] >> 7) {
                        position++;
                        val += (bytes[position] & 0x7F) << 21;
                        if (bytes[position] >> 7) {
                            position++;
                            val += ((bytes[position] & 0x7F) << 24) * 16;
                            if (bytes[position] >> 7) {
                                position++;
                                val += ((bytes[position] & 0x7F) << 24) * 0x800;
                                if (bytes[position] >> 7) {
                                    position++;
                                    val += (bytes[position] << 24) * 0x40000;
                                }
                            }
                        }
                    }
                }
            }
            position++;
            this.position = position;
            return val;
        }

        /**
         * 读取一个 Int
         * @returns {number}
         */
        public readInt(): number {
            var val = this.readUInt();
            if (val % 2 == 1) {
                val = Math.floor(val / 2);
                val = ~val;
            }
            else {
                val = Math.floor(val / 2);
            }
            return val;
        }

        /**
         * 读取一个 utf-8 字符串
         * @returns {string}
         */
        public readUTF(): string {
            var len = this.readUInt();
            var val = UTFChange.bytesToString(this.bytes.slice(this.position, this.position + len));
            this.position += len;
            return val;
        }

        /**
         * 读取自定长度的 utf-8 字符串
         * @param {number} len
         * @returns {string}
         */
        public readUTFBytes(len: number): string {
            var val = UTFChange.bytesToString(this.bytes.slice(this.position, this.position + len));
            this.position += len;
            return val;
        }

        /**
         * 把内容转换成字符串
         * @returns {string}
         */
        public toString(): string {
            return JSON.stringify(this.bytes);
        }
    }
}

////////////////////////////////black/flower/net/package/supers/IHead.ts/////////////////////////////////
namespace lib {

    export interface IHead {

        /**
         * 消息头版本
         */
        headVersion: number;

        /**
         * 协议版本
         */
        version: number;

        /**
         * 协议号
         */
        cmd: number;

        /**
         * 远程调用 id
         */
        remoteId: string;

        readFrom(head: IHead): void;

        /**
         * 读取内容 object
         */
        readonly value: any;

        /**
         * 表示此包头是否为请求
         * @returns {boolean}
         */
        readonly isRequest:boolean;
    }
}

////////////////////////////////black/flower/net/package/supers/IMessage.ts/////////////////////////////////
namespace lib {

    export interface IMessage {

        head: IHead;

        readonly value: any;

        setHead(head: IHead): void;

        send(net: ISocket): any;

        encode(bytes: ByteArray): void;

        decode(bytes: ByteArray): void;
    }
}

////////////////////////////////black/flower/net/package/supers/IRemote.ts/////////////////////////////////
namespace lib {
    export interface IRemote {

        remoteId: string;

        onReceive(head: ResponseHead, msg: ByteArray): void;

        onBack(head: ZeroResponse): void;
    }
}

////////////////////////////////black/flower/net/package/RequestHead.ts/////////////////////////////////
namespace lib {

    export class RequestHead implements IHead {

        /**
         * 包头版本，如果是基数，则为客户端发送给服务端的包，否则为服务端返回的包
         * @type {number}
         */
        public static VERSION: number = 1;

        /**
         * 包头版本号
         */
        public headVersion: number;
        /**
         * 协议版本号
         */
        public version: number = 1;
        /**
         * 协议号
         */
        protected _cmd: number;
        /**
         * 请求 uuid
         */
        $uuid: string;

        constructor(cmd: number = 0, uuid: string = "") {
            this.headVersion = RequestHead.VERSION;
            this._cmd = cmd;
            this.$uuid = uuid;
        }

        public decode(bytes: ByteArray): void {
            this.version = bytes.readUInt();
            this._cmd = bytes.readUInt();
            this.$uuid = bytes.readUTF();
        }

        public encode(bytes: ByteArray): void {
            bytes.writeUInt(this.headVersion);
            bytes.writeUInt(this.version);
            bytes.writeUInt(this._cmd);
            bytes.writeUTF(this.$uuid);
        }

        /**
         * 读取另外一个 head 的内容
         * @param {ResponseHead} head
         */
        public readFrom(head: RequestHead): void {
            this.headVersion = head.headVersion;
            this.version = head.version;
            this._cmd = head.cmd;
            this.$uuid = head.$uuid;
        }

        /**
         * 协议号
         * @returns {number}
         */
        public get cmd(): number {
            return this._cmd;
        }

        /**
         * 远程调用 id
         * @returns {string}
         */
        public get remoteId(): string {
            return this.$uuid;
        }

        /**
         * 表示此包头是否为请求
         * @returns {boolean}
         */
        public get isRequest():boolean {
            return true;
        }

        public get value() {
            return {
                "headVersion": this.headVersion,
                "version": this.version,
                "cmd": this.cmd,
                "uuid": this.$uuid
            }
        }
    }
}

////////////////////////////////black/flower/net/package/ResponseHead.ts/////////////////////////////////
namespace lib {

    export class ResponseHead implements IHead {

        public static VERSION = 2;

        /**
         * 包头版本号
         */
        public headVersion: number;
        /**
         * 协议版本号
         */
        public version: number = 1;
        /**
         * 协议号
         */
        protected _cmd: number;
        /**
         * 远程调用 id
         */
        protected $uuid: string;
        /**
         * 程序处理时间
         */
        private _processTime: number;

        constructor(cmd: number = 0, uuid: string = "", processTime: number = 0) {
            this.headVersion = ResponseHead.VERSION;
            this._cmd = cmd;
            this.$uuid = uuid;
            this._processTime = processTime;
        }

        public decode(bytes: ByteArray): void {
            this.version = bytes.readUInt();
            this._cmd = bytes.readUInt();
            this.$uuid = bytes.readUTF();
            this._processTime = bytes.readUInt();
        }

        public encode(bytes: ByteArray): void {
            bytes.writeUInt(this.headVersion);
            bytes.writeUInt(this.version);
            bytes.writeUInt(this._cmd);
            bytes.writeUTF(this.$uuid);
            bytes.writeUInt(this._processTime);
        }

        /**
         * 读取另外一个 head 的内容
         * @param {ResponseHead} head
         */
        public readFrom(head: ResponseHead): void {
            this.headVersion = head.headVersion;
            this.version = head.version;
            this._cmd = head.cmd;
            this.$uuid = head.remoteId;
            this._processTime = head.processTime;
        }

        /**
         * 协议号
         * @returns {number}
         */
        public get cmd(): number {
            return this._cmd;
        }

        /**
         * 远程调用 id
         * @returns {string}
         */
        public get remoteId(): string {
            return this.$uuid;
        }

        /**
         * 程序处理耗时，毫秒
         * @returns {number}
         */
        public get processTime(): number {
            return this._processTime;
        }

        /**
         * 表示此包头是否为请求
         * @returns {boolean}
         */
        public get isRequest():boolean {
            return false;
        }

        public get value() {
            return {
                "headVersion": this.headVersion,
                "version": this.version,
                "cmd": this.cmd,
                "remoteId": this.remoteId,
                "processTime": this.processTime
            }
        }
    }
}

////////////////////////////////black/flower/net/package/Request.ts/////////////////////////////////
namespace lib {

    export class Request extends ByteArray implements IMessage, IRemote {

        public head: RequestHead;

        private resolve: Function;

        constructor(cmd: number = -1) {
            super();

            if (cmd != -1) {
                this.head = new RequestHead(cmd, Help.getuuid());
            }
        }

        /**
         * 设置 head 内容
         * @param {RequestHead} head
         */
        public setHead(head: RequestHead): void {
            if (this.head) {
                this.head.readFrom(head);
            } else {
                this.head = head;
            }
        }

        /**
         * 发送本条请求
         * @param {ISocket} net
         * @returns {Promise<ZeroPackage>}
         */
        public send(net: ISocket): Promise<ZeroResponse> {
            this.head.encode(this);
            this.encode(this);
            net.addRemote(this);
            net.send(this);
            var __ = this;
            return new Promise<ZeroResponse>(function (resolve: Function) {
                __.resolve = resolve;
            }.bind(this));
        }

        /**
         * 消息编码
         * @param {ByteArray} bytes
         */
        public encode(bytes: ByteArray): void {
        }

        /**
         * 消息解码
         * @param {ByteArray} bytes
         */
        public decode(bytes: ByteArray): void {

        }

        public onReceive(head: ResponseHead, bytes: ByteArray): void {
        }

        public onBack(head: ZeroResponse): void {
            var func = this.resolve;
            this.resolve = null;
            func(head);
        }

        public get remoteId(): string {
            return this.head.remoteId;
        }

        public get value(): any {
            return {
                head: this.head.value
            }
        }
    }
}

////////////////////////////////black/flower/net/package/Response.ts/////////////////////////////////
namespace lib {

    export class Response extends ByteArray implements IMessage {

        public head: ResponseHead;

        constructor(cmd: number = -1, uuid: string = "", processTime: number = 0) {
            super();
            if (cmd != -1) {
                this.head = new ResponseHead(cmd, uuid, processTime);
            }
        }

        /**
         * 设置 head 内容
         * @param {ResponseHead} head
         */
        public setHead(head: ResponseHead): void {
            if (this.head) {
                this.head.readFrom(head);
            } else {
                this.head = head;
            }
        }

        public send(net: ISocket): void {
            //写消息头
            this.head.encode(this);
            //写消息体
            this.encode(this);
            //发送消息
            net.send(this);
        }

        /**
         * 编码
         * @param {bk.VByteArray} bytes
         */
        public encode(bytes: ByteArray): void {

        }


        /**
         * 消息解码
         * @param {ByteArray} bytes
         */
        public decode(bytes: ByteArray): void {

        }

        public get value(): any {
            return {
                head: this.head.value
            }
        }
    }
}

////////////////////////////////black/flower/net/package/ZeroResponse.ts/////////////////////////////////
namespace lib {

    export class ZeroResponse extends Response {

        /**
         * 错误码
         */
        public errorCode: number;

        /**
         * 请求的协议号
         */
        public requestCmd: number;

        /**
         * 错误信息
         * @type {string}
         */
        public message: string = "";

        constructor(uuid: string = "", processTime: number = 0, errorCode: number = 0, requestCmd: number = 0, message: string = "") {
            super(0, uuid, processTime);
            this.errorCode = errorCode;
            this.requestCmd = requestCmd;
            this.message = message;
        }

        public encode(bytes: ByteArray): void {
            bytes.writeInt(this.errorCode)
            bytes.writeUInt(this.requestCmd);
            bytes.writeUTF(this.message);
        }

        public decode(bytes: ByteArray): void {
            this.errorCode = bytes.readInt();
            this.requestCmd = bytes.readUInt();
            this.message = bytes.readUTF();
        }

        public get value() {
            return {
                head: this.head.value,
                errorCode: this.errorCode,
                requestCmd: this.requestCmd,
                message: this.message
            }
        }
    }
}

////////////////////////////////black/flower/net/supers/ISocket.ts/////////////////////////////////
namespace lib {

    export interface ISocket {

        /**
         * 表示这个链接是不是客户端
         */
        readonly isClient: boolean;

        readonly isConnect: boolean;

        send(bytes: ByteArray): void;

        addRemote(remot: IRemote): void;

        awaitClose(): Promise<number>;

        close(): void;

        addRemote(remote: IRemote): void;

        onReceive(message: any): void;

        add(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;

        addOnce(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;

        remove(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;

        addZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;

        removeZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;

        addZeroOnce(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;
    }
}

////////////////////////////////black/flower/net/supers/SocketBase.ts/////////////////////////////////
namespace lib {

    export class SocketBase implements ISocket {

        public static id: number = 1;

        private remotes: any = {};
        private backs: any = {};
        private zbacks: any = {};

        public isClient: boolean = false;

        /**
         * 添加远程回调
         * @param {IRemote} remote 远程回调对象
         */
        public addRemote(remote: IRemote): void {
            this.remotes[remote.remoteId] = remote;
            // console.log("添加 remote?", remote.remoteId);
        }

        public onReceive(message: any): void {
        }

        public add(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void {
            if (this.backs[cmd] == null) {
                this.backs[cmd] = [];
            }
            this.backs[cmd].push({func: back, thisObj: thisObj, id: SocketBase.id++});
        }

        public addOnce(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void {
            if (this.backs[cmd] == null) {
                this.backs[cmd] = [];
            }
            this.backs[cmd].push({func: back, thisObj: thisObj, once: true, id: SocketBase.id++});
        }

        public remove(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void {
            var list = this.backs[cmd];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].func == back && list[i].thisObj == thisObj) {
                        list.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        public addZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void {
            if (this.zbacks[cmd] == null) {
                this.zbacks[cmd] = [];
            }
            this.zbacks[cmd].push({func: back, thisObj: thisObj, id: SocketBase.id++});
        }

        public removeZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void {
            var list = this.zbacks[cmd];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].func == back && list[i].thisObj == thisObj) {
                        list.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        public addZeroOnce(cmd: number, back: (head: ZeroResponse) => void, thisObj: any) {
            if (this.zbacks[cmd] == null) {
                this.zbacks[cmd] = [];
            }
            this.zbacks[cmd].push({func: back, thisObj: thisObj, once: true, id: SocketBase.id++});
        }

        /**
         * 分发消息
         * @param {ByteArray} bytes
         */
        protected dispatchMessage(bytes: ByteArray): void {
            var pos;
            var head: IHead = SocketBase.readHead(bytes);
            // console.log("[receive]", head.headVersion, head.cmd, head.remoteId, bytes.length);
            var buffers = SocketBuffer.getMessage(head.remoteId);
            if (head.isRequest && buffers) { //如果请求相同，则直接返回无需通过上层
                // console.log("同样的请求", head.remoteId);
                for (let i = 0; i < buffers.length; i++) {
                    var bhead = SocketBase.readHead(buffers[i]);
                    // console.log("同样的请求返回", bhead.cmd, bhead.remoteId, bytes.length);
                    this.send(buffers[i]);
                }
                SocketBuffer.removeMessage(head.remoteId);
                return;
            }
            var cmd = head.cmd;
            var removeList;
            var a;
            var i;
            var f;
            var backList;
            var remoteId = head.remoteId;
            if (remoteId != "" && this.remotes[remoteId]) {
                var remote: IRemote = this.remotes[remoteId];
                // console.log("[receive] [remote] ", head.remoteId, remote ? true : false);
                if (cmd == 0) {
                    let zp = new ZeroResponse();
                    zp.head = head as ResponseHead;
                    zp.decode(bytes);
                    remote.onBack(zp);
                    delete this.remotes[remoteId];
                } else {
                    remote.onReceive(head as ResponseHead, bytes);
                }
            } else if (cmd == 0) {
                let zp = new ZeroResponse();
                zp.head = head as ResponseHead;
                zp.decode(bytes);
                var backCmd = zp.requestCmd;
                var zbackList = this.zbacks[backCmd];
                // console.log("[receive] [zero] ", head.remoteId, zbackList ? true : false);
                if (zbackList) {
                    removeList = [];
                    a = zbackList.concat();
                    for (i = 0; i < a.length; i++) {
                        a[i].func.call(a[i].thisObj, zp);
                        if (a[i].once) {
                            removeList.push(a[i].id);
                        }
                    }
                    for (i = 0; i < removeList.length; i++) {
                        for (f = 0; f < this.zbacks[backCmd].length; f++) {
                            if (this.zbacks[backCmd][f].id == removeList[i]) {
                                this.zbacks[backCmd].splice(f, 1);
                                break;
                            }
                        }
                    }
                }
                backList = this.backs[cmd];
                if (backList) {
                    removeList = [];
                    a = backList.concat();
                    for (i = 0; i < a.length; i++) {
                        bytes.position = pos;
                        a[i].func.call(a[i].thisObj, head, bytes);
                        if (a[i].once) {
                            removeList.push(a[i].id);
                        }
                    }
                    for (i = 0; i < removeList.length; i++) {
                        for (f = 0; f < this.backs[cmd].length; f++) {
                            if (this.backs[cmd][f].id == removeList[i]) {
                                this.backs[cmd].splice(f, 1);
                                break;
                            }
                        }
                    }
                }
            } else {
                pos = bytes.position;
                backList = this.backs[cmd];
                // console.log("[receive] [other] ", head.remoteId, backList ? true : false);
                if (backList) {
                    removeList = [];
                    a = backList.concat();
                    for (i = 0; i < a.length; i++) {
                        bytes.position = pos;
                        a[i].func.call(a[i].thisObj, head, bytes);
                        if (a[i].once) {
                            removeList.push(a[i].id);
                        }
                    }
                    for (i = 0; i < removeList.length; i++) {
                        for (f = 0; f < this.backs[cmd].length; f++) {
                            if (this.backs[cmd][f].id == removeList[i]) {
                                this.backs[cmd].splice(f, 1);
                                break;
                            }
                        }
                    }
                }
            }
            // console.log("[receive end]",head.remoteId);
        }

        public send(bytes: ByteArray): void {
        }

        private awaitCloseFunctions: Function[] = [];

        /**
         * 等待断开链接
         * @returns {Promise<number>}
         */
        public awaitClose(): Promise<number> {
            var __ = this;
            return new Promise<number>(function (resolve: Function) {
                __.awaitCloseFunctions.push(resolve);
            });
        }

        protected onAwaitClose(code: number): void {
            // console.log("删除所有 remote!!!");
            for (var key in this.remotes) {
                // console.log("删除 remote...", key);
                this.remotes[key].onBack(new ZeroResponse("", 0, Error.$SOCKET_CLOSED, 0));
            }
            this.remotes = {};
            if (this.awaitCloseFunctions) {
                var funcs = this.awaitCloseFunctions.concat();
                this.awaitCloseFunctions = [];
                while (funcs.length) {
                    funcs.shift()(code);
                }
            }
        }

        private awaitConnectFunctions: Function[] = [];

        /**
         * 等待服务器链接
         */
        public awaitConnect(): Promise<number> {
            var __ = this;
            return new Promise<number>(function (resolve: Function) {
                __.awaitConnectFunctions.push(resolve);
            });
        }

        protected connectComplete() {
            if (this.awaitConnectFunctions) {
                var funcs = this.awaitConnectFunctions.concat();
                while (funcs.length) {
                    var func = funcs.shift();
                    func();
                }
            }
        }

        public close(): void {

        }

        public get isConnect(): boolean {
            return false;
        }

        /**
         * 获取协议头部信息
         * @param {lib.ByteArray} bytes
         * @returns {lib.IHead}
         */
        public static readHead(bytes: ByteArray): IHead {
            bytes.position = 0;
            let headVersion = bytes.readUInt();
            let head: RequestHead | ResponseHead;
            if (headVersion % 2) {
                head = new RequestHead();
                head.headVersion = headVersion;
                head.decode(bytes);
            } else {
                head = new ResponseHead();
                head.headVersion = headVersion;
                head.decode(bytes);
            }
            return head;
        }
    }
}

////////////////////////////////black/flower/net/supers/SocketBuffer.ts/////////////////////////////////
namespace lib {

    /**
     * 消息缓存，没发送出去的消息缓存起来，避免二次调用
     * @private
     */
    export class SocketBuffer {

        private static buffers: any = [];

        public static addMessage(remoteId: string, bytes: ByteArray): void {
            if (!SocketBuffer.buffers[remoteId]) {
                SocketBuffer.buffers[remoteId] = [];
            }
            SocketBuffer.buffers[remoteId].push(bytes);
        }

        public static getMessage(remoteId: string): ByteArray[] {
            return SocketBuffer.buffers[remoteId];
        }

        public static removeMessage(remoteId: string): void {
            delete SocketBuffer.buffers[remoteId];
        }
    }
}

////////////////////////////////black/flower/net/URLLoader.ts/////////////////////////////////
namespace lib {
    export class URLLoader {

        static urlHead = "";

        _createRes = false;
        _res;
        _isLoading = false;
        _data;
        _linkLoader;
        _links;
        _type;
        _selfDispose = false;
        _language;
        _scale;
        _loadInfo;
        _method;
        _params;
        _recordUse;
        resolve;
        reject;

        constructor(res) {
            this.$setResource(res);
            this._language = "cn";//LANGUAGE;
            this._scale = null;//SCALE ? SCALE : null;
        }

        $setResource(res) {
            if (typeof(res) == "string") {
                var resItem = Res.getRes(res);
                if (resItem) {
                    res = resItem;
                } else {
                    this._createRes = true;
                    res = ResItem.create(res);
                }
            }
            this._res = res;
            this._type = this._res.type;
        }

        get url() {
            return this._res ? this._res.url : "";
        }

        get loadURL() {
            return this._loadInfo ? this._loadInfo.url : "";
        }

        get type() {
            return this._res ? this._res.type : "";
        }

        set language(val) {
            this._language = val;
        }

        set scale(val) {
            // this._scale = val * (SCALE ? SCALE : 1);
        }

        set method(val) {
            this._method = val;
        }

        get method() {
            return this._method;
        }

        set params(val) {
            this._params = val;
        }

        get params() {
            return this._params;
        }

        $addLink(loader) {
            if (!this._links) {
                this._links = [];
            }
            this._links.push(loader);
        }

        load(res?: any): Promise<URLLoaderResult> {
            if (res) {
                this.$setResource(res);
            }
            if (this._isLoading) {
                // this.dispatchWith(Event.ERROR, "URLLoader is loading, url:" + this.url);
                return;
            }
            this._loadInfo = this._res.getLoadInfo(this._language, this._scale);
            this._isLoading = true;
            if (this.type != ResType.TEXT) {
                for (var i = 0; i < URLLoader.list.length; i++) {
                    if (URLLoader.list[i].loadURL == this.loadURL && URLLoader.list[i].type == this.type) {
                        this._linkLoader = URLLoader.list[i];
                        break;
                    }
                }
            }
            if (this._linkLoader) {
                this._linkLoader.$addLink(this);
                return;
            }
            URLLoader.list.push(this);
            if (this.type == ResType.IMAGE) {
                // this.loadTexture();
            } else if (this.type == ResType.PLIST) {
                // this.loadPlist();
            } else {
                this.loadText();
            }
            return new Promise<number>(this.asyncFunction.bind(this));
        }

        private asyncFunction(resolve: Function, reject: Function): void {
            this.resolve = resolve;
            this.reject = reject;
        }

        // loadTexture() {
        //     var texture = TextureManager.getInstance().$getTextureByURL(this.url);
        //     if (this._loadInfo.update) {
        //         texture = null;
        //     }
        //     if (texture) {
        //         texture.$addCount();
        //         this._data = texture;
        //         new CallLater(this.loadComplete, this);
        //     }
        //     else {
        //         if (this._loadInfo.plist) {
        //             var loader = new URLLoader(this._loadInfo.plist);
        //             loader.addListener(Event.COMPLETE, this.onLoadTexturePlistComplete, this);
        //             loader.addListener(Event.ERROR, this.loadError, this);
        //             loader.load();
        //         } else {
        //             var params = {};
        //             params.r = math.random();
        //             for (var key in this._params) {
        //                 params[key] = this._params;
        //             }
        //             PlatformURLLoader.loadTexture(this.__concatURLHead(URLLoader.urlHead, this._loadInfo.url), this.loadTextureComplete, this.loadError, this, params);
        //         }
        //     }
        // }

        __concatURLHead(head, url) {
            if (url.slice(0, 7) == "http://") {
                return url;
            }
            return head + url;
        }

        onLoadTexturePlistComplete(e) {
            var plist = e.data;
            this._data = plist.getFrameTexture(this.url);
            this._data.$addCount();
            this.loadComplete();
        }

        // loadTextureComplete(nativeTexture, width, height) {
        //     nativeTexture = new PlatformTexture(this._loadInfo.url, nativeTexture);
        //     var oldTexture;
        //     if (this._loadInfo.update) {
        //         oldTexture = TextureManager.getInstance().$getTextureByURL(this.url);
        //     }
        //     if (oldTexture) {
        //         oldTexture.$update(nativeTexture, width, height, this._loadInfo.settingWidth, this._loadInfo.settingHeight);
        //     } else {
        //         var texture = TextureManager.getInstance().$createTexture(nativeTexture, this.url, this._loadInfo.url, width, height, this._loadInfo.settingWidth, this._loadInfo.settingHeight);
        //         this._data = texture;
        //         texture.$addCount();
        //     }
        //     if (this._loadInfo.splitURL) {
        //         var res = ResItem.create(this._loadInfo.splitURL);
        //         res.__type = ResType.TEXT;
        //         var loader = new flower.URLLoader(res);
        //         loader.addListener(flower.Event.COMPLETE, this.loadTextureSplitComplete, this);
        //         loader.addListener(flower.Event.ERROR, this.loadError, this);
        //         loader.load();
        //     } else {
        //         new CallLater(this.loadComplete, this);
        //     }
        // }

        loadTextureSplitComplete(e) {
            this._data.$setSplitInfo(e.data);
            this.loadComplete();
        }

        setTextureByLink(texture) {
            texture.$addCount();
            this._data = texture;
            this.loadComplete();
        }

        // loadPlist() {
        //     var plist = PlistManager.getInstance().getPlist(this.url);
        //     if (plist) {
        //         this._data = plist;
        //         new CallLater(this.loadComplete, this);
        //     } else {
        //         var load = PlistManager.getInstance().load(this.url, this._loadInfo.url);
        //         load.addListener(Event.COMPLETE, this.loadPlistComplete, this);
        //         load.addListener(Event.ERROR, this.loadError, this);
        //     }
        // }
        //
        // loadPlistComplete(e) {
        //     this._data = e.data;
        //     new CallLater(this.loadComplete, this);
        // }

        setPlistByLink(plist) {
            this._data = plist;
            this.loadComplete();
        }

        loadText() {
            var params = {};
            params.r = math.random();
            for (var key in this._params) {
                params[key] = this._params[key];
            }
            PlatformURLLoader.loadText(this.__concatURLHead(URLLoader.urlHead, this._loadInfo.url), this.loadTextComplete, this.loadError, this, this._method, params);
        }

        loadTextComplete(content) {
            if (this._type == ResType.TEXT) {
                this._data = content;
            }
            else if (this._type == ResType.JSON) {
                this._data = JSON.parse(content);
            }
            new CallLater(this.loadComplete, this);
        }

        setTextByLink(content) {
            if (this._type == ResType.TEXT) {
                this._data = content;
            }
            else if (this._type == ResType.JSON) {
                this._data = JSON.parse(content);
            }
            this.loadComplete();
        }

        setJsonByLink(content) {
            this._data = content;
            this.loadComplete();
        }

        loadComplete() {
            if (this._links) {
                for (var i = 0; i < this._links.length; i++) {
                    if (this._type == ResType.IMAGE) {
                        this._links[i].setTextureByLink(this._data);
                    }
                    else if (this._type == ResType.TEXT) {
                        this._links[i].setTextByLink(this._data);
                    }
                    else if (this._type == ResType.JSON) {
                        this._links[i].setJsonByLink(this._data);
                    } else if (this._type == ResType.PLIST) {
                        this._links[i].setPlistByLink(this._data);
                    }
                }
            }
            this._links = null;
            this._isLoading = false;
            if (this._res == null || this._data == null) {
                this._selfDispose = true;
                this.dispose();
                this._selfDispose = false;
                return;
            }
            for (var i = 0; i < URLLoader.list.length; i++) {
                if (URLLoader.list[i] == this) {
                    URLLoader.list.splice(i, 1);
                    break;
                }
            }
            if (this.isDispose) {
                if (this._data && this._type == ResType.IMAGE) {
                    if (this._recordUse) {
                        this._data.$use = true;
                    }
                    //if (!this._loadInfo.plist) {
                    this._data.$delCount();
                    //}
                    this._data = null;
                }
                return;
            }
            // this.dispatchWith(Event.COMPLETE, this._data);
            if (this.resolve) {
                this.resolve(new URLLoaderResult(0, this._data));
            }
            this._selfDispose = true;
            this.dispose();
            this._selfDispose = false;
        }

        loadError(e) {
            // if (this.hasListener(Event.ERROR)) {
            //     this.dispatchWith(Event.ERROR, getLanguage(2003, this._loadInfo.url));
                if (this.resolve) {
                    this.resolve(new URLLoaderResult(-1));
                }
                if (this._links) {
                    for (var i = 0; i < this._links.length; i++) {
                        this._links[i].loadError();
                    }
                }
                this.dispose();
            // }
            // else {
            //     $error(2003, this._loadInfo.url);
            // }
        }

        $useImage() {
            if (!this._data) {
                this._recordUse = true;
                return;
            }
            this._data.$use = true;
        }

        dispose() {
            if (!this._selfDispose) {
                // super.dispose();
                return;
            }
            if (this._data && this._type == ResType.IMAGE) {
                //if (!this._loadInfo.plist) {
                this._data.$delCount();
                //}
                this._data = null;
            }
            if (this._createRes && this._res) {
                ResItem.release(this._res);
            }
            this._res = null;
            this._data = null;
            // super.dispose();
            for (var i = 0; i < URLLoader.list.length; i++) {
                if (URLLoader.list[i] == this) {
                    URLLoader.list.splice(i, 1);
                    break;
                }
            }
        }

        static list = [];

        static clear() {
            while (URLLoader.list.length) {
                var loader = URLLoader.list.pop();
                loader.dispose();
            }
        }
    }
}

////////////////////////////////black/flower/net/URLLoaderResult.ts/////////////////////////////////
namespace lib {
    export class URLLoaderResult {

        public result: number;
        public data: any;

        constructor(result: number, data: any = null) {
            this.result = result;
            this.data = data;
        }
    }
}

////////////////////////////////black/flower/net/URLLoaderList.ts/////////////////////////////////
namespace lib {
    export class URLLoaderList extends EventDispatcher {

        __list;
        __dataList;
        __index;
        __language;
        __scale;

        constructor(list) {
            super();
            this.__list = list;
            this.__dataList = [];
            this.__index = 0;
        }

        set language(val) {
            this.__language = val;
        }

        set scale(val) {
            this.__scale = val;
        }

        load() {
            this.__loadNext();
        }

        __loadNext() {
            if (this.__index >= this.__list.length) {
                this.dispatchWith(Event.COMPLETE, this.__dataList);
                this.__list = null;
                this.__dataList = null;
                this.dispose();
                return;
            }
            var item = this.__list[this.__index];
            var load = new URLLoader(item);
            if (this.__language != null) load.language = this.__language;
            if (this.__scale != null) load.scale = this.__scale;
            load.addListener(Event.COMPLETE, this.__onComplete, this);
            load.addListener(Event.ERROR, this.__onError, this);
            load.load();
        }

        __onError(e) {
            if (this.hasListener(Event.ERROR)) {
                this.dispatch(e);
            }
            else {
                $error(e.message);
            }
        }

        __onComplete(e) {
            this.__dataList[this.__index] = e.data;
            this.__index++;
            this.__loadNext();
        }
    }
}

////////////////////////////////black/flower/net/URLLoaderMethod.ts/////////////////////////////////
namespace lib {
    export class URLLoaderMethod {
        static GET = "GET";
        static POST = "POST";
        static HEAD = "HEAD";
    }
}

////////////////////////////////black/flower/net/WebSocket.ts/////////////////////////////////
namespace lib {

    export class WebSocketClient extends SocketBase {

        private client: any;
        private _isConnect: boolean = false;
        private _isClosed: boolean = true;
        private _type: string;

        protected serverIp: string;
        protected serverPort: number;


        /**
         * 没有连上和断开是否自动链接服务器
         * @type {boolean}
         */
        public autoLinkServer: boolean = true;
        /**
         * 断开链接后相隔多久自动链接服务器
         * @type {number}
         */
        public connectSleep: number = 100;

        constructor(type: string = "binary") {
            super();
            this.isClient = true;
            this._type = type;

            this._autoLink();
        }

        private async _autoLink() {
            while (this.autoLinkServer) {
                //等待链接上服务器
                await this.awaitConnect();

                //等待网络断开
                await this.awaitClose();

                if (this.autoLinkServer) {
                    //自动连接
                    this.connect(this.serverIp, this.serverPort);
                }
            }
        }

        /**
         * 消息类型，有 binary 和 utf8 之分
         * @returns {string}
         */
        public get type(): string {
            return this._type;
        }

        /**
         * 是否连上服务器
         * @returns {boolean}
         */
        public get isConnect(): boolean {
            return this._isConnect;
        }

        /**
         * 链接是否已关闭
         * @returns {boolean}
         */
        public get isClosed(): boolean {
            return this._isClosed;
        }

        /**
         * 链接服务器
         * @param {string} ip 服务器 IP 地址
         * @param {number} port 服务器端口号
         * @param {string} path websocket 路径
         */
        public connect(ip: string, port: number, path: string = ""): void {
            this.serverIp = ip;
            this.serverPort = port;

            //链接服务器
            this.client = new lib.PlatformWebSocket();
            this.client.bindWebSocket(ip, port, path, this, this.onConnect, this.onReceive, this.onError, this.onClose);

            this._isConnect = false;
            this._isClosed = true;
        }

        public awaitConnect(ip: string = "", port: number = 0): Promise<number> {
            if (port) {
                this.connect(ip, port);
            }
            return super.awaitConnect();
        }

        protected onConnect(): void {
            this._isConnect = true;
            this._isClosed = false;
            this.connectComplete();
        }

        protected onConnectError(e: Error): void {
            let __ = this;
            setTimeout(function () {
                __.connect(__.serverIp, __.serverPort);
            }, this.connectSleep);
        }

        protected onError(e: Error): void {

        }

        /**
         * 结束链接
         * @param {number} code
         * @param {string} desc
         */
        protected onClose(code: number, desc: string = ""): void {
            this._isConnect = false;
            this._isClosed = true;
            this.onAwaitClose(code);
        }

        /**
         * 收到消息
         * @param message
         */
        public onReceive(message: any): void {
            var data;
            if (this.type == "utf8") {
                data = JSON.parse(message.utf8Data);
            }
            else if (this.type == "binary") {
                data = message.binaryData;
            }
            var bytes = new ByteArray();
            bytes.writeArray(data);
            this.dispatchMessage(bytes);
        }

        /**
         * 发送数据
         * @param {ByteArray} bytes 需要发送的二进制数据
         */
        public send(data: ByteArray): void {
            if (!this._isConnect) {
                console.log("send fail, please check the net state 'isConnect'!");
                return;
            }
            if (data instanceof lib.ByteArray) {
                this.client.sendWebSocketBytes(data.arrayData);
            } else {
                this.client.sendWebSocketBytes(data);
            }
        }

        public close(): void {
            if (this.client && !this._isClosed) {
                this.client.releaseWebSocket();
                this.onClose(0);
            }
        }
    }
}

////////////////////////////////black/flower/net/ConnectResult.ts/////////////////////////////////
namespace lib {
    export class ConnectResult {

        /**
         * 为 0 表示 成功，其它表示失败
         */
        public result: number;

        constructor(result:number) {
            this.result = result;
        }


        public static SUCCESS: number = 0;
        public static FAIL: number = -1;
    }
}

////////////////////////////////black/flower/res/Res.ts/////////////////////////////////
namespace lib {
    export class Res {

        static __resItems = [];

        /**
         * 查询存储的 ResItem，通过 url 查找匹配的项
         * @param url
         */
        static getRes(url) {
            var list = Res.__resItems;
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].url == url) {
                    return list[i];
                }
            }
            return null;
        }

        static addRes(res) {
            var list = Res.__resItems;
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].url == res.url) {
                    list.splice(i, 1);
                    break;
                }
            }
            list.push(res);
        }
    }
}

////////////////////////////////black/flower/res/ResItem.ts/////////////////////////////////
namespace lib {
    export class ResItem {
        /**
         * 使用时的路径
         */
        __url;

        /**
         * 实际的加载地址有哪些
         */
        __loadList = [];

        /**
         * 资源类型
         */
        __type;

        constructor(url, type) {
            this.__url = url;
            if (type) {
                this.__type = type;
            } else {
                this.__type = ResType.getURLType(url);
            }
        }

        addURL(url) {
            var info = ResItemInfo.create();

            var plist = null;
            var splitURL = null;
            var array = url.split("#PLIST#");
            if (array.length == 2) {
                url = array[0];
                plist = array[1];
            }
            array = url.split("#SPLIT#");
            if (array.length == 2) {
                url = array[0];
                splitURL = array[1];
            }
            if (plist && !splitURL) {
                array = plist.split("#SPLIT#");
                if (array.length == 2) {
                    plist = array[0];
                    splitURL = array[1];
                }
            }
            array = url.split("/");
            var last = array.pop();
            var nameArray = last.split(".");
            var name = "";
            var end = "";
            if (nameArray.length == 1) {
                name = nameArray[0];
            } else {
                end = nameArray[nameArray.length - 1];
                name = last.slice(0, last.length - end.length - 1);
            }
            nameArray = name.split("@");
            var settingWidth;
            var settingHeight;
            var scale;
            var language;
            for (var i = 1; i < nameArray.length; i++) {
                var content = nameArray[i];
                var code = content.charCodeAt(0);
                if (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0) || code == ".".charCodeAt(0)) {
                    var nums = content.split("x");
                    if (nums.length == 1) {
                        scale = parseFloat(content);
                    } else if (nums.length == 2) {
                        settingWidth = parseInt(nums[0]);
                        settingHeight = parseInt(nums[1]);
                    }
                } else {
                    language = content;
                }
            }
            info.url = url;
            info.plist = plist;
            info.settingWidth = settingWidth;
            info.settingHeight = settingHeight;
            info.scale = scale || 1;
            info.language = language;
            info.update = false;
            info.splitURL = splitURL;
            this.__loadList.push(info);
        }

        addInfo(url, plist, settingWidth, settingHeight, scale, language, update = false, splitURL = null) {
            var info = ResItemInfo.create();
            info.url = url;
            info.plist = plist;
            info.settingWidth = settingWidth;
            info.settingHeight = settingHeight;
            info.scale = scale || 1;
            info.language = language;
            info.update = update;
            info.splitURL = splitURL;
            this.__loadList.push(info);
            return info;
        }

        getLoadInfo(language, scale) {
            var loadList = this.__loadList;
            if (loadList.length == 1) {
                return loadList[0];
            }
            var info;
            for (var i = 0; i < loadList.length; i++) {
                if (language && language != loadList[i].language) {
                    continue;
                }
                if (!info) {
                    info = loadList[i];
                } else if (scale != null) {
                    if (loadList[i].scale != null && math.abs(loadList[i].scale - scale) < math.abs(info.scale - scale)) {
                        info = loadList[i];
                    }
                }
            }
            if (!info) {
                info = loadList[0];
            }
            return info;
        }

        get type() {
            return this.__type;
        }

        get url() {
            return this.__url;
        }

        static $pools = [];

        static create(url) {
            var plist = null;
            var splitURL = null;
            var array = url.split("#PLIST#");
            if (array.length == 2) {
                url = array[0];
                plist = array[1];
            }
            array = url.split("#SPLIT#");
            if (array.length == 2) {
                url = array[0];
                splitURL = array[1];
            }
            if (plist && !splitURL) {
                array = plist.split("#SPLIT#");
                if (array.length == 2) {
                    plist = array[0];
                    splitURL = array[1];
                }
            }
            array = url.split("/");
            var last = array.pop();
            var nameArray = last.split(".");
            var name = "";
            var end = "";
            if (nameArray.length == 1) {
                name = nameArray[0];
            } else {
                end = nameArray[nameArray.length - 1];
                name = last.slice(0, last.length - end.length - 1);
            }
            nameArray = name.split("@");
            var settingWidth;
            var settingHeight;
            var scale;
            var language;
            for (var i = 1; i < nameArray.length; i++) {
                var content = nameArray[i];
                var code = content.charCodeAt(0);
                if (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0) || code == ".".charCodeAt(0)) {
                    var nums = content.split("x");
                    if (nums.length == 1) {
                        scale = parseFloat(content);
                    } else if (nums.length == 2) {
                        settingWidth = parseInt(nums[0]);
                        settingHeight = parseInt(nums[1]);
                    }
                } else {
                    language = content;
                }
            }
            var useURL = "";
            for (var i = 0; i < array.length; i++) {
                useURL += array[i] + "/";
            }
            useURL += nameArray[0] + (end != "" ? "." + end : "");
            var res;
            if (ResItem.$pools.length) {
                res = ResItem.$pools.pop();
                res.__url = useURL;
                res.__type = ResType.getType(end);
                res.__loadList.length = 0;
            } else {
                res = new ResItem(useURL, ResType.getType(end));
            }
            res.addInfo(url, plist, settingWidth, settingHeight, scale, language, false, splitURL);
            return res;
        }

        static release(item) {
            while (item.__loadList.length) {
                ResItemInfo.release(item.__loadList.pop());
            }
            ResItem.$pools.push(item);
        }
    }
}

////////////////////////////////black/flower/res/ResItemInfo.ts/////////////////////////////////
namespace lib {
    export class ResItemInfo {

        /**
         * 实际的加载地址
         */
        url;

        /**
         * plist 地址
         */
        plist;

        /**
         * 拼接信息配置地址
         */
        splitURL;

        /**
         * 预设的宽
         */
        settingWidth;

        /**
         * 预设的高
         */
        settingHeight;

        /**
         * 支持的缩放倍数
         */
        scale;

        /**
         * 支持的语言
         */
        language;

        /**
         * 是否更新旧的纹理
         * @native
         */
        update = false;//UPDATE_RESOURCE ? false : null;

        static $pools = [];

        static create() {
            if (ResItemInfo.$pools.length) {
                return ResItemInfo.$pools.pop();
            } else {
                return new ResItemInfo();
            }
        }

        static release(info) {
            info.update = false;
            ResItemInfo.$pools.push(info);
        }
    }
}

////////////////////////////////black/flower/res/ResType.ts/////////////////////////////////
namespace lib {
    export class ResType {

        static TEXT = 1;
        static JSON = 2;
        static IMAGE = 3;
        static PLIST = 4;

        static getURLType(url) {
            if (url.split(".").length == 1) {
                return ResType.TEXT;
            }
            var end = url.split(".")[url.split(".").length - 1];
            return ResType.getType(end);
        }

        static getType(end) {
            if (end == "json") {
                return ResType.JSON;
            }
            if (end == "png" || end == "jpg" || end == "PNG" || end == "JPG") {
                return ResType.IMAGE;
            }
            if (end == "plist") {
                return ResType.PLIST;
            }
            return ResType.TEXT;
        }
    }
}

////////////////////////////////black/flower/geom/Matrix.ts/////////////////////////////////
namespace lib {
    export class Matrix {
        a = 1;
        b = 0;
        c = 0;
        d = 1;
        tx = 0;
        ty = 0;
        _storeList:any[] = [];

        constructor() {
        }

        identity() {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;
        }

        setTo(a:number, b:number, c:number, d:number, tx:number, ty:number) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

        translate(x:number, y:number) {
            this.tx += x;
            this.ty += y;
        }

        rotate(angle:number) {
            var sin = math.sin(angle);
            var cos = math.cos(angle);
            this.setTo(this.a * cos - this.c * sin, this.a * sin + this.c * cos,
                this.b * cos - this.d * sin, this.b * sin + this.d * cos,
                this.tx * cos - this.ty * sin, this.tx * sin + this.ty * cos);
        }

        scale(scaleX:number, scaleY:number) {
            this.a *= scaleX;
            this.d *= scaleY;
            this.tx *= scaleX;
            this.ty *= scaleY;
        }

        transformPoint(pointX:number, pointY:number, resultPoint:Point) {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new Point(x, y);
        }

        $updateSR(scaleX:number, scaleY:number, rotation:number) {
            var sin = 0;
            var cos = 1;
            if (rotation) {
                sin = math.sin(rotation);
                cos = math.cos(rotation);
            }
            this.a = cos * scaleX;
            this.b = sin * scaleY;
            this.c = -sin * scaleX;
            this.d = cos * scaleY;
        }

        $updateRST(rotation:number, scaleX:number, scaleY:number, tx:number, ty:number) {
            var sin = 0;
            var cos = 1;
            if (rotation) {
                sin = math.sin(rotation);
                cos = math.cos(rotation);
            }
            this.a = cos * scaleX;
            this.b = sin * scaleX;
            this.c = -sin * scaleY;
            this.d = cos * scaleY;
            this.tx = cos * scaleX * tx - sin * scaleY * ty;
            this.ty = sin * scaleX * tx + cos * scaleY * ty;
        }

        $transformRectangle(rect:Rectangle) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var x = rect.x;
            var y = rect.y;
            var xMax = x + rect.width;
            var yMax = y + rect.height;
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }
            rect.x = math.floor(x0 < x2 ? x0 : x2);
            rect.width = math.ceil((x1 > x3 ? x1 : x3) - rect.x);
            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }
            rect.y = math.floor(y0 < y2 ? y0 : y2);
            rect.height = math.ceil((y1 > y3 ? y1 : y3) - rect.y);
        }

        get deformation() {
            if (this.a != 1 || this.b != 0 || this.c != 0 || this.d != 1)
                return true;
            return false;
        }

        save() {
            var matrix = Matrix.create();
            matrix.a = this.a;
            matrix.b = this.b;
            matrix.c = this.c;
            matrix.d = this.d;
            matrix.tx = this.tx;
            matrix.ty = this.ty;
            this._storeList.push(matrix);
        }

        restore() {
            var matrix = this._storeList.pop();
            this.setTo(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            Matrix.release(matrix);
        }

        static $matrix = new Matrix();
        static matrixPool:Matrix[] = [];

        static release(matrix:Matrix) {
            if (!matrix) {
                return;
            }
            matrix._storeList.length = 0;
            Matrix.matrixPool.push(matrix);
        }

        /**
         * 创建出来的矩阵可能不是规范矩阵
         * @returns {Matrix}
         */
        static create() {
            var matrix = Matrix.matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        }

    }

}

////////////////////////////////black/flower/geom/Point.ts/////////////////////////////////
namespace lib {
    export class Point {

        x:number;
        y:number;

        constructor(x?:number, y?:number) {
            this.x = +x || 0;
            this.y = +y || 0;
        }

        setTo(x:number, y:number) {
            this.x = x;
            this.y = y;
            return this;
        }

        get length() {
            return math.sqrt(this.x * this.x + this.y * this.y);
        }

        static distance(p1:Point, p2:Point) {
            return math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        }

        static $TempPoint = new Point();
        static pointPool:Point[] = [];

        static release(point:Point) {
            if (!point) {
                return;
            }
            Point.pointPool.push(point);
        }

        static create(x?:number, y?:number) {
            var point = Point.pointPool.pop();
            if (!point) {
                point = new Point(x, y);
            }
            else {
                point.x = +x || 0;
                point.y = +y || 0;
            }
            return point;
        }
    }

}

////////////////////////////////black/flower/geom/Rectangle.ts/////////////////////////////////
namespace lib {
    export class Rectangle {
        x:number;
        y:number;
        width:number;
        height:number;

        constructor(x?:number, y?:number, width?:number, height?:number) {
            this.x = +x || 0;
            this.y = +y || 0;
            this.width = +width || 0;
            this.height = +height || 0;
        }

        get right() {
            return this.x + this.width;
        }

        set right(value) {
            this.width = value - this.x;
        }

        get bottom() {
            return this.y + this.height;
        }

        set bottom(value) {
            this.height = value - this.y;
        }

        get left() {
            return this.x;
        }

        set left(value) {
            this.width += this.x - value;
            this.x = value;
        }

        get top() {
            return this.y;
        }

        set top(value) {
            this.height += this.y - value;
            this.y = value;
        }

        copyFrom(sourceRect:Rectangle) {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
            return this;
        }

        setTo(x:number, y:number, width:number, height:number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        }

        contains(x:number, y:number) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        }

        intersection(toIntersect:Rectangle):Rectangle {
            return this.clone().$intersectInPlace(toIntersect);
        }

        $intersectInPlace(clipRect:Rectangle):Rectangle {
            var x0 = this.x;
            var y0 = this.y;
            var x1 = clipRect.x;
            var y1 = clipRect.y;
            var l = math.max(x0, x1);
            var r = math.min(x0 + this.width, x1 + clipRect.width);
            if (l <= r) {
                var t = math.max(y0, y1);
                var b = math.min(y0 + this.height, y1 + clipRect.height);
                if (t <= b) {
                    this.setTo(l, t, r - l, b - t);
                    return this;
                }
            }
            this.setEmpty();
            return this;
        }

        intersects(toIntersect:Rectangle) {
            return math.max(this.x, toIntersect.x) <= math.min(this.right, toIntersect.right) && math.max(this.y, toIntersect.y) <= math.min(this.bottom, toIntersect.bottom);
        }

        isEmpty() {
            return this.width <= 0 || this.height <= 0;
        }

        setEmpty() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }

        clone():Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }

        _getBaseWidth(angle:number) {
            var u = math.abs(math.cos(angle));
            var v = math.abs(math.sin(angle));
            return u * this.width + v * this.height;
        }

        _getBaseHeight(angle:number) {
            var u = math.abs(math.cos(angle));
            var v = math.abs(math.sin(angle));
            return v * this.width + u * this.height;
        }

        static rectanglePool:Rectangle[] = [];

        static release(rect:Rectangle) {
            if (!rect) {
                return;
            }
            Rectangle.rectanglePool.push(rect);
        }

        static create(x:number, y:number, width:number, height:number) {
            var rect = Rectangle.rectanglePool.pop();
            if (!rect) {
                rect = new Rectangle(x, y, width, height);
            } else {
                rect.x = +x || 0;
                rect.y = +y || 0;
                rect.width = +width || 0;
                rect.height = +height || 0;
            }
            return rect;
        }

        static $TempRectangle:Rectangle = new Rectangle();
    }

}

////////////////////////////////black/flower/geom/Size.ts/////////////////////////////////
namespace lib {
    export class Size {

        width:number;
        height:number;

        constructor(width?:number, height?:number) {
            this.width = +width || 0;
            this.height = +height || 0;
        }

        setTo(width:number, height:number) {
            this.width = width;
            this.height = height;
            return this;
        }

        get area() {
            return this.width * this.height;
        }

        static $TempSize = new Size();
        static sizePool:Size[] = [];

        static release(size:Size) {
            if (!size) {
                return;
            }
            Size.sizePool.push(size);
        }

        static create(width?:number, height?:number) {
            var size = Size.sizePool.pop();
            if (!size) {
                size = new Size(width, height);
            }
            else {
                size.width = +width || 0;
                size.height = +height || 0;
            }
            return size;
        }
    }

}

////////////////////////////////black/flower/tween/BasicPlugin.ts/////////////////////////////////
namespace lib {
    export class BasicPlugin {
        constructor() {

        }

        init(tween:Tween, propertiesTo:any, propertiesFrom:any):any {
            this.tween = tween;
            this._attributes = propertiesTo;
            this.keys = ObjectDo.keys(propertiesTo);
            var target = tween.target;
            var startAttributes:any = {};
            var keys = this.keys;
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                if (propertiesFrom && key in propertiesFrom) {
                    startAttributes[key] = propertiesFrom[key];
                }
                else {
                    startAttributes[key] = target[key];
                }
            }
            this.startAttributes = startAttributes;
            return null;
        }

        tween:Tween;
        keys:string[];
        startAttributes:any;
        _attributes:any;

        update(value:any) {
            var target = this.tween.target;
            var keys = this.keys;
            var length = keys.length;
            var startAttributes = this.startAttributes;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                target[key] = (this._attributes[key] - startAttributes[key]) * value + startAttributes[key];
            }
        }
    }

}

////////////////////////////////black/flower/tween/Ease.ts/////////////////////////////////
namespace lib {
    export class Ease {

        static NONE = "None";
        static SINE_EASE_IN = "SineEaseIn";
        static SineEaseOut = "SineEaseOut";
        static SINE_EASE_IN_OUT = "SineEaseInOut";
        static SineEaseOutIn = "SineEaseOutIn";
        static QUAD_EASE_IN = "QuadEaseIn";
        static QUAD_EASE_OUT = "QuadEaseOut";
        static QUAD_EASE_IN_OUT = "QuadEaseInOut";
        static QUAD_EASE_OUT_IN = "QuadEaseOutIn";
        static CUBIC_EASE_IN = "CubicEaseIn";
        static CUBIC_EASE_OUT = "CubicEaseOut";
        static CUBIC_EASE_IN_OUT = "CubicEaseInOut";
        static CUBIC_EASE_OUT_IN = "CubicEaseOutIn";
        static QUART_EASE_IN = "QuartEaseIn";
        static QUART_EASE_OUT = "QuartEaseOut";
        static QUART_EASE_IN_OUT = "QuartEaseInOut";
        static QUART_EASE_OUT_IN = "QuartEaseOutIn";
        static QUINT_EASE_IN = "QuintEaseIn";
        static QUINT_EASE_OUT = "QuintEaseOut";
        static QUINT_EASE_IN_OUT = "QuintEaseInOut";
        static QUINT_EASE_OUT_IN = "QuintEaseOutIn";
        static EXPO_EASE_IN = "ExpoEaseIn";
        static EXPO_EASE_OUT = "ExpoEaseOut";
        static EXPO_EASE_IN_OUT = "ExpoEaseInOut";
        static EXPO_EASE_OUT_IN = "ExpoEaseOutIn";
        static CIRC_EASE_IN = "CircEaseIn";
        static CIRC_EASE_OUT = "CircEaseOut";
        static CIRC_EASE_IN_OUT = "CircEaseInOut";
        static CIRC_EASE_OUT_IN = "CircEaseOutIn";
        static BACK_EASE_IN = "BackEaseIn";
        static BACK_EASE_OUT = "BackEaseOut";
        static BACK_EASE_IN_OUT = "BackEaseInOut";
        static BACK_EASE_OUT_IN = "BackEaseOutIn";
        static ELASTIC_EASE_IN = "ElasticEaseIn";
        static ELASTIC_EASE_OUT = "ElasticEaseOut";
        static ELASTIC_EASE_IN_OUT = "ElasticEaseInOut";
        static ELASTIC_EASE_OUT_IN = "ElasticEaseOutIn";
        static BOUNCE_EASE_IN = "BounceEaseIn";
        static BounceEaseOut = "BounceEaseOut";
        static BOUNCE_EASE_IN_OUT = "BounceEaseInOut";
        static BOUNCE_EASE_OUT_IN = "BounceEaseOutIn";

        static registerEaseFunction(name:string, ease:Function) {
            EaseFunction[name] = ease;
        }
    }


}

////////////////////////////////black/flower/tween/EaseFunction.ts/////////////////////////////////
namespace lib {
    export class EaseFunction {
        static None(t:number) {
            return t;
        }

        static SineEaseIn(t:number) {
            return math.sin((t - 1) * math.PI * .5) + 1;
        }

        static SineEaseOut(t:number) {
            return math.sin(t * math.PI * .5);
        }

        static SineEaseInOut(t:number) {
            return math.sin((t - .5) * math.PI) * .5 + .5;
        }

        static SineEaseOutIn(t:number) {
            if (t < 0.5) {
                return math.sin(t * math.PI) * .5;
            }
            return math.sin((t - 1) * math.PI) * .5 + 1;
        }

        static QuadEaseIn(t:number) {
            return t * t;
        }

        static QuadEaseOut(t:number) {
            return -(t - 1) * (t - 1) + 1;
        }

        static QuadEaseInOut(t:number) {
            if (t < .5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        }

        static QuadEaseOutIn(t:number) {
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        }

        static CubicEaseIn(t:number) {
            return t * t * t;
        }

        static CubicEaseOut(t:number) {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        }

        static CubicEaseInOut(t:number) {
            if (t < .5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        }

        static CubicEaseOutIn(t:number) {
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
        }

        static QuartEaseIn(t:number) {
            return t * t * t * t;
        }

        static QuartEaseOut(t:number) {
            var a = (t - 1);
            return -a * a * a * a + 1;
        }

        static QuartEaseInOut(t:number) {
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
        }

        static QuartEaseOutIn(t:number) {
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
        }

        static QuintEaseIn(t:number) {
            return t * t * t * t * t;
        }

        static QuintEaseOut(t:number) {
            var a = t - 1;
            return a * a * a * a * a + 1;
        }

        static QuintEaseInOut(t:number) {
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
        }

        static QuintEaseOutIn(t:number) {
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
        }

        static ExpoEaseIn(t:number) {
            return math.pow(2, 10 * (t - 1));
        }

        static ExpoEaseOut(t:number) {
            return -math.pow(2, -10 * t) + 1;
        }

        static ExpoEaseInOut(t:number) {
            if (t < .5) {
                return math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
        }

        static ExpoEaseOutIn(t:number) {
            if (t < .5) {
                return -math.pow(2, -20 * t) * .5 + .5;
            }
            return math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
        }

        static CircEaseIn(t:number) {
            return 1 - math.sqrt(1 - t * t);
        }

        static CircEaseOut(t:number) {
            return math.sqrt(1 - (1 - t) * (1 - t));
        }

        static CircEaseInOut(t:number) {
            if (t < .5) {
                return .5 - math.sqrt(.25 - t * t);
            }
            return math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
        }

        static CircEaseOutIn(t:number) {
            var s = math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
        }

        static BackEaseIn(t:number) {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        }

        static BackEaseOut(t:number) {
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
        }

        static BackEaseInOut(t:number) {
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
        }

        static BackEaseOutIn(t:number) {
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
        }

        static ElasticEaseIn(t:number) {
            if (t == 0 || t == 1)
                return t;
            return -(math.pow(2, 10 * (t - 1)) * math.sin((t - 1.075) * 2 * math.PI / .3));
        }

        static ElasticEaseOut(t:number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            return (math.pow(2, 10 * -t) * math.sin((-t - .075) * 2 * math.PI / .3)) + 1;
        }

        static ElasticEaseInOut(t:number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return -(math.pow(2, 10 * t - 10) * math.sin((t * 2 - 2.15) * math.PI / .3));
            }
            return (math.pow(2, 10 - 20 * t) * math.sin((-4 * t + 1.85) * math.PI / .3)) * .5 + 1;
        }

        static ElasticEaseOutIn(t:number) {
            if (t == 0 || t == .5 || t == 1)
                return t;
            if (t < .5) {
                return (math.pow(2, -20 * t) * math.sin((-t * 4 - .15) * math.PI / .3)) * .5 + .5;
            }
            return -(math.pow(2, 20 * (t - 1)) * math.sin((t * 4 - 4.15) * math.PI / .3)) * .5 + .5;
        }

        static bounceEaseIn(t:number) {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        }

        static bounceEaseOut(t:number) {
            var s;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            }
            else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            }
            else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            }
            else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
        }


        static BounceEaseInOut(t:number) {
            if (t < .5)
                return EaseFunction.bounceEaseIn(t * 2) * .5;
            else
                return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
        }

        static BounceEaseOutIn(t:number) {
            if (t < .5)
                return EaseFunction.bounceEaseOut(t * 2) * .5;
            else
                return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        }

        static BounceEaseIn = EaseFunction.bounceEaseIn;
        static BounceEaseOut = EaseFunction.bounceEaseOut;
    }
}

////////////////////////////////black/flower/tween/Tween.ts/////////////////////////////////
namespace lib {
    export class Tween {

        constructor(target:any, time:number, propertiesTo:any, ease = "None", propertiesFrom:any = null) {
            if (Tween.plugins == null) {
                Tween.registerPlugin("center", TweenCenter);
                Tween.registerPlugin("path", TweenPath);
                Tween.registerPlugin("physicMove", TweenPhysicMove);
            }
            time = +time;
            if (time < 0) {
                time = 0;
            }
            this.$time = time * 1000;
            this._target = target;
            this._propertiesTo = propertiesTo;
            this._propertiesFrom = propertiesFrom;
            this.ease = ease || "None";
            var timeLine = new TimeLine();
            timeLine.addTween(this);
        }

        invalidProperty = false;
        _propertiesTo:any;
        set propertiesTo(value:any) {
            if (value == this._propertiesTo) {
                return;
            }
            this._propertiesTo = value;
            this.invalidProperty = false;
        }

        _propertiesFrom:any;
        set propertiesFrom(value:any) {
            if (value == this._propertiesFrom) {
                return;
            }
            this._propertiesFrom = value;
            this.invalidProperty = false;
        }

        $time:number;

        get time() {
            return this.$time / 1000;
        }

        set time(value) {
            value = +value | 0;
            this.$time = (+value) * 1000;
            if (this._timeLine) {
                this._timeLine.$invalidateTotalTime();
            }
        }

        $startTime = 0;

        get startTime() {
            return this.$startTime / 1000;
        }

        set startTime(value) {
            value = +value | 0;
            if (value < 0) {
                value = 0;
            }
            if (value == this.$startTime) {
                return;
            }
            this.$startTime = value * 1000;
            if (this._timeLine) {
                this._timeLine.$invalidateTotalTime();
            }
            this.invalidProperty = false;
        }

        _currentTime = 0;
        _target:any;
        get target() {
            return this._target;
        }

        set target(value) {
            if (value == this.target) {
                return;
            }
            this.removeTargetEvent();
            this._target = value;
            this.invalidProperty = false;
            this.addTargetEvent();
        }

        _ease:any;
        _easeData:any;

        get ease() {
            return this._ease;
        }

        set ease(val) {
            if (!Tween.easeCache[val]) {
                var func = EaseFunction[val];
                if (func == null) {
                    return;
                }
                var cache = [];
                for (var i = 0; i <= 2000; i++) {
                    cache[i] = func(i / 2000);
                }
                Tween.easeCache[val] = cache;
            }
            this._ease = val;
            this._easeData = Tween.easeCache[val];
        }

        _startEvent = "";
        get startEvent() {
            return this._startEvent;
        }

        set startEvent(type) {
            this.removeTargetEvent();
            this._startEvent = type;
            this.addTargetEvent();
        }

        _startTarget:any;
        get startTarget() {
            return this._startTarget;
        }

        set startTarget(value) {
            this.removeTargetEvent();
            this._startTarget = value;
            this.addTargetEvent();
        }

        removeTargetEvent() {
            var target;
            if (this._startTarget) {
                target = this._startTarget;
            }
            else {
                target = this._target;
            }
            if (target && this._startEvent && this._startEvent != "") {
                target.removeListener(this._startEvent, this.startByEvent, this);
            }
        }

        addTargetEvent() {
            var target;
            if (this._startTarget) {
                target = this._startTarget;
            }
            else {
                target = this._target;
            }
            if (target && this._startEvent && this._startEvent != "") {
                target.addListener(this._startEvent, this.startByEvent, this);
            }
        }

        play() {
            this.timeLine.play();
        }

        stop() {
            this.timeLine.stop();
        }

        startByEvent() {
            this._timeLine.gotoAndPlay(0);
        }

        _timeLine:TimeLine;

        get timeLine() {
            if (!this._timeLine) {
                this._timeLine = new TimeLine();
                this._timeLine.addTween(this);
            }
            return this._timeLine;
        }

        $setTimeLine(value:any) {
            if (this._timeLine) {
                this._timeLine.removeTween(this);
            }
            this._timeLine = value;
        }

        pugins:BasicPlugin[] = [];

        initParmas() {
            var controller;
            var params = this._propertiesTo;
            var allPlugins = Tween.plugins;
            if (params) {
                var keys = ObjectDo.keys(allPlugins);
                var deletes:any[] = [];
                for (var i = 0, len = keys.length; i < len; i++) {
                    if (keys[i] in params) {
                        var plugin = allPlugins[keys[i]];
                        controller = new plugin();
                        deletes = deletes.concat(controller.init(this, params, this._propertiesFrom));
                        this.pugins.push(controller);
                    }
                }
                for (i = 0; i < deletes.length; i++) {
                    delete params[deletes[i]];
                }
                keys = ObjectDo.keys(params);
                for (i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (!(typeof(key) == "string")) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                    var attribute = params[key];
                    if (!(typeof(attribute) == "number") || !(key in this._target)) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                }
                if (keys.length) {
                    controller = new BasicPlugin();
                    controller.init(this, params, this._propertiesFrom);
                    this.pugins.push(controller);
                }
            }
            this.invalidProperty = true;
        }

        invalidate() {
            this.invalidProperty = false;
        }

        _complete:any;
        _completeThis:any;
        _completeParams:any;

        call(callBack:any, thisObj:any = null, ...args:any[]) {
            this._complete = callBack;
            this._completeThis = thisObj;
            this._completeParams = args;
            return this;
        }

        _update:any;
        _updateThis:any;
        _updateParams:any;

        update(callBack:any, thisObj:any = null, ...args:any[]) {
            this._update = callBack;
            this._updateThis = thisObj;
            this._updateParams = args;
            return this;
        }

        $update(time:number) {
            if (!this.invalidProperty) {
                this.initParmas();
            }
            this._currentTime = time - this.$startTime;
            if (this._currentTime > this.$time) {
                this._currentTime = this.$time;
            }
            var length = this.pugins.length;
            var s = this._easeData[2000 * (this._currentTime / this.$time) | 0];
            for (var i = 0; i < length; i++) {
                this.pugins[i].update(s);
            }
            if (this._update != null) {
                this._update.apply(this._updateThis, this._updateParams);
            }
            if (this._currentTime == this.$time) {
                if (this._complete != null) {
                    this._complete.apply(this._completeThis, this._completeParams);
                }
            }
            return true;
        }

        dispose() {
            if (this.timeLine) {
                this.timeLine.removeTween(this);
            }
        }

        static to(target:any, time:number, propertiesTo:any, ease = "None", propertiesFrom:any = null) {
            var tween = new Tween(target, time, propertiesTo, ease, propertiesFrom);
            tween.timeLine.play();
            return tween;
        }

        static plugins:any;
        static easeCache:any = {};

        static registerPlugin(paramName:string, plugin:any) {
            if (Tween.plugins == null) {
                Tween.plugins = {};
            }
            Tween.plugins[paramName] = plugin;
        }

        static hasPlugin(paramName:string):boolean {
            return Tween.plugins[paramName] ? true : false;
        }

    }

}

////////////////////////////////black/flower/tween/TimeLine.ts/////////////////////////////////
namespace lib {

    export class TimeLine {

        tweens:Tween[];

        constructor() {
            this.tweens = [];
        }

        lastTime = -1;
        _currentTime = 0;

        get totalTime() {
            return this.getTotalTime();
        }

        getTotalTime() {
            if (this.invalidTotalTime == true) {
                return this._totalTime;
            }
            this.invalidTotalTime = true;
            var tweens = this.tweens;
            var endTime = 0;
            var time;
            for (var i = 0, len = tweens.length; i < len; i++) {
                time = tweens[i].startTime + tweens[i].time;
                if (time > endTime) {
                    endTime = time;
                }
            }
            this._totalTime = endTime * 1000;
            return this._totalTime;
        }

        _totalTime = 0;
        invalidTotalTime = true;

        $invalidateTotalTime() {
            if (this.invalidTotalTime == false) {
                return;
            }
            this.invalidTotalTime = false;
        }

        _loop = false;
        get loop() {
            return this._loop;
        }

        set loop(value) {
            this._loop = value;
        }

        _isPlaying = false;
        get isPlaying() {
            return this._isPlaying;
        }

        update(timeStamp:number, gap:number) {
            var totalTime = this.getTotalTime();
            var lastTime = this._currentTime;
            this._currentTime += timeStamp - this.lastTime;
            var currentTime = -1;
            var loopTime = 0;
            if (this._currentTime >= totalTime) {
                currentTime = this._currentTime % totalTime;
                loopTime = math.floor(this._currentTime / totalTime);
                if (!this._loop) {
                    this.$setPlaying(false);
                }
            }
            while (loopTime > -1) {
                if (loopTime && currentTime != -1) {
                    this._currentTime = totalTime;
                }
                var calls = this.calls;
                var call;
                var len = calls.length;
                for (i = 0; i < len; i++) {
                    call = calls[i];
                    if (call.time > lastTime && call.time <= this._currentTime || (call.time == 0 && lastTime == 0 && this._currentTime)) {
                        call.callBack.apply(call.thisObj, call.args);
                    }
                }
                var tweens = this.tweens;
                var tween;
                len = tweens.length;
                for (var i = 0; i < len; i++) {
                    tween = tweens[i];
                    if (tween.$startTime + tween.$time > lastTime && tween.$startTime <= this._currentTime || (tween.$startTime == 0 && lastTime == 0 && this._currentTime)) {
                        tween.$update(this._currentTime);
                    }
                }
                loopTime--;
                if (loopTime == 0) {
                    if (currentTime != -1) {
                        lastTime = 0;
                        this._currentTime = currentTime;
                    }
                }
                else {
                    if (loopTime) {
                        lastTime = 0;
                    }
                }
                if (this._loop == false) {
                    break;
                }
            }
            this.lastTime = timeStamp;
            return true;
        }

        play() {
            var now = CoreTime.currentTime;
            this.$setPlaying(true, now);
        }

        stop() {
            this.$setPlaying(false);
        }

        $setPlaying(value:any, time = 0) {
            if (value) {
                this.lastTime = time;
            }
            if (this._isPlaying == value) {
                return;
            }
            this._isPlaying = value;
            if (value) {
                EnterFrame.add(this.update, this);
                this.update(CoreTime.currentTime, 0);
            }
            else {
                EnterFrame.remove(this.update, this);
            }
        }

        gotoAndPlay(time:number) {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = CoreTime.currentTime;
            this.$setPlaying(true, now);
        }

        gotoAndStop(time:number) {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = CoreTime.currentTime;
            this.$setPlaying(false);
        }

        addTween(tween:Tween) {
            this.tweens.push(tween);
            tween.$setTimeLine(this);
            this.$invalidateTotalTime();
            return tween;
        }

        removeTween(tween:Tween) {
            var tweens = this.tweens;
            for (var i = 0, len = tweens.length; i < len; i++) {
                if (tweens[i] == tween) {
                    tweens.splice(i, 1)[0].$setTimeLine(null);
                    this.$invalidateTotalTime();
                    break;
                }
            }
            if (tweens.length == 0) {
                this.$setPlaying(false);
            }
        }

        calls:any[] = [];

        call(time:number, callBack:Function, thisObj:any = null, ...args:any[]) {
            this.calls.push({"time": time, "callBack": callBack, "thisObj": thisObj, "args": args});
        }
    }

}

////////////////////////////////black/flower/tween/plugins/TweenCenter.ts/////////////////////////////////
namespace lib {
    export class TweenCenter {
        constructor() {
        }

        init(tween: any, propertiesTo: any, propertiesFrom: any) {
            this.tween = tween;
            var target = tween.target;
            this.centerX = target.width / 2;
            this.centerY = target.height / 2;
            this.centerLength = math.sqrt(target.width * target.width + target.height * target.height) * .5;
            this.rotationStart = math.atan2(target.height, target.width) * 180 / math.PI;
            if (target.rotation) {
                this.lastMoveX = this.centerX - this.centerLength * math.cos((target.rotation + this.rotationStart) * math.PI / 180);
                this.lastMoveY = this.centerY - this.centerLength * math.sin((target.rotation + this.rotationStart) * math.PI / 180);
            } else {
                this.lastMoveX = 0;
                this.lastMoveY = 0;
            }
            var useAttributes = [];
            useAttributes.push("center");
            if ("scaleX" in propertiesTo) {
                this.scaleXTo = +propertiesTo["scaleX"];
                useAttributes.push("scaleX");
                if (propertiesFrom && "scaleX" in propertiesFrom) {
                    this.scaleXFrom = +propertiesFrom["scaleX"];
                }
                else {
                    this.scaleXFrom = target["scaleX"];
                }
            }
            if ("scaleY" in propertiesTo) {
                this.scaleYTo = +propertiesTo["scaleY"];
                useAttributes.push("scaleY");
                if (propertiesFrom && "scaleY" in propertiesFrom) {
                    this.scaleYFrom = +propertiesFrom["scaleY"];
                }
                else {
                    this.scaleYFrom = target["scaleY"];
                }
            }
            if ("rotation" in propertiesTo) {
                this.rotationTo = +propertiesTo["rotation"];
                useAttributes.push("rotation");
                if (propertiesFrom && "rotation" in propertiesFrom) {
                    this.rotationFrom = +propertiesFrom["rotation"];
                }
                else {
                    this.rotationFrom = target["rotation"];
                }
            }
            return useAttributes;
        }

        tween:Tween;
        scaleXFrom:any;
        scaleYFrom:any;
        scaleXTo:any;
        scaleYTo:any;
        rotationFrom:any;
        rotationStart:any;
        rotationTo:any;
        centerX:number;
        centerY:number;
        centerLength:number;
        lastMoveX:number;
        lastMoveY:number;

        update(value:any) {
            var target = this.tween.target;
            var moveX = 0;
            var moveY = 0;
            if (this.scaleXTo) {
                target.scaleX = this.scaleXFrom + (this.scaleXTo - this.scaleXFrom) * value;
                target.x = this.centerX - target.width / 2;
            }
            if (this.scaleYTo) {
                target.scaleY = this.scaleYFrom + (this.scaleYTo - this.scaleYFrom) * value;
                target.y = this.centerY - target.height / 2;
            }
            if (this.rotationTo) {
                target.rotation = this.rotationFrom + (this.rotationTo - this.rotationFrom) * value;
                moveX += this.centerX - this.centerLength * math.cos((target.rotation + this.rotationStart) * math.PI / 180);
                moveY += this.centerY - this.centerLength * math.sin((target.rotation + this.rotationStart) * math.PI / 180);
                target.x += moveX - this.lastMoveX;
                target.y += moveY - this.lastMoveY;
            }
            this.lastMoveX = moveX;
            this.lastMoveY = moveY;
        }

        static scaleTo(target: any, time: number, scaleTo: any, scaleFrom: any = null, ease = "None") {
            return Tween.to(target, time, {
                "center": true,
                "scaleX": scaleTo,
                "scaleY": scaleTo
            }, ease, scaleFrom == null ? null : {"scaleX": scaleFrom, "scaleY": scaleFrom});
        }

        static rotationTo(target: any, time: number, rotationTo: any, rotationFrom: any = null, ease = "None") {
            return Tween.to(target, time, {
                "center": true,
                "rotation": rotationTo
            }, ease, rotationFrom == null ? null : {"rotation": rotationFrom});
        }
    }

}

////////////////////////////////black/flower/tween/plugins/TweenPath.ts/////////////////////////////////
namespace lib {
    export class TweenPath {

        constructor() {
        }

        init(tween:Tween, propertiesTo:any, propertiesFrom:any) {
            this.tween = tween;
            var useAttributes = [];
            useAttributes.push("path");
            var path = propertiesTo["path"];
            var target = tween.target;
            var start = Point.create(target.x, target.y);
            path.splice(0, 0, start);
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    start.x = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    start.y = +propertiesFrom["y"];
                }
            }
            if ("x" in propertiesTo && "y" in propertiesTo) {
                useAttributes.push("x");
                useAttributes.push("y");
                path.push(Point.create(+propertiesTo["x"], +propertiesTo["y"]));
            }
            this.path = path;
            this.pathSum = [];
            this.pathSum.push(0);
            for (var i = 1, len = path.length; i < len; i++) {
                this.pathSum[i] = this.pathSum[i - 1] + math.sqrt((path[i].x - path[i - 1].x) * (path[i].x - path[i - 1].x) + (path[i].y - path[i - 1].y) * (path[i].y - path[i - 1].y));
            }
            var sum = this.pathSum[len - 1];
            for (i = 1; i < len; i++) {
                this.pathSum[i] = this.pathSum[i] / sum;
            }
            return useAttributes;
        }

        tween:Tween;
        pathSum:any;
        path:any;

        update(value:any) {
            var path = this.path;
            var target = this.tween.target;
            var pathSum = this.pathSum;
            var i, len = pathSum.length;
            for (i = 1; i < len; i++) {
                if (value > pathSum[i - 1] && value <= pathSum[i]) {
                    break;
                }
            }
            if (value <= 0) {
                i = 1;
            }
            else if (value >= 1) {
                i = len - 1;
            }
            value = (value - pathSum[i - 1]) / (pathSum[i] - pathSum[i - 1]);
            target.x = value * (path[i].x - path[i - 1].x) + path[i - 1].x;
            target.y = value * (path[i].y - path[i - 1].y) + path[i - 1].y;
        }

        static to(target:any, time:number, path:any, ease = "None") {
            return Tween.to(target, time, {"path": path}, ease);
        }

        static vto(target:any, v:number, path:any, ease = "None") {
            var sum = 0;
            for (var i = 1, len = path.length; i < len; i++) {
                sum += math.sqrt((path[i].x - path[i - 1].x) * (path[i].x - path[i - 1].x) + (path[i].y - path[i - 1].y) * (path[i].y - path[i - 1].y));
            }
            var time = sum / v;
            return Tween.to(target, time, {"path": path}, ease);
        }

    }

}

////////////////////////////////black/flower/tween/plugins/TweenPhysicMove.ts/////////////////////////////////
namespace lib {
    export class TweenPhysicMove {

        constructor() {
            if (!Tween.hasPlugin("physicMove")) {
                Tween.registerPlugin("physicMove", TweenPhysicMove);
            }
        }

        init(tween:Tween, propertiesTo:any, propertiesFrom:any) {
            this.tween = tween;
            var useAttributes = [];
            useAttributes.push("physicMove");
            var target = tween.target;
            var startX = target.x;
            var startY = target.y;
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    startX = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    startY = +propertiesFrom["y"];
                }
            }
            this.startX = startX;
            this.startY = startY;
            var endX = startX;
            var endY = startY;
            if ("x" in propertiesTo) {
                endX = +propertiesTo["x"];
                useAttributes.push("x");
            }
            if ("y" in propertiesTo) {
                endY = +propertiesTo["y"];
                useAttributes.push("y");
            }
            var vx = 0;
            var vy = 0;
            var t = tween.time;
            if ("vx" in propertiesTo) {
                vx = +propertiesTo["vx"];
                useAttributes.push("vx");
                if (!("x" in propertiesTo)) {
                    endX = startX + t * vx;
                }
            }
            if ("vy" in propertiesTo) {
                vy = +propertiesTo["vy"];
                useAttributes.push("vy");
                if (!("y" in propertiesTo)) {
                    endY = startY + t * vy;
                }
            }
            this.vx = vx;
            this.vy = vy;
            this.ax = (endX - startX - vx * t) * 2 / (t * t);
            this.ay = (endY - startY - vy * t) * 2 / (t * t);
            this.time = t;
            return useAttributes;
        }

        tween:Tween;
        startX:number;
        vx:number;
        ax:number;
        startY:number;
        vy:number;
        ay:number;
        time:number;

        update(value:number) {
            var target = this.tween.target;
            var t = this.time * value;
            target.x = this.startX + this.vx * t + .5 * this.ax * t * t;
            target.y = this.startY + this.vy * t + .5 * this.ay * t * t;
        }

        static freeFallTo(target:any, time:number, groundY:number) {
            return Tween.to(target, time, {"y": groundY, "physicMove": true});
        }

        static freeFallToWithG(target:any, g:number, groundY:number) {
            return Tween.to(target, math.sqrt(2 * (groundY - target.y) / g), {"y": groundY, "physicMove": true});
        }

        static fallTo(target:any, time:number, groundY:number, vX:number = null, vY:number = null) {
            return Tween.to(target, time, {"y": groundY, "physicMove": true, "vx": vX, "vy": vY});
        }

        static fallToWithG(target:any, g:number, groundY:number, vX:number = null, vY:number = null) {
            vX = +vX;
            vY = +vY;
            return Tween.to(target, math.sqrt(2 * (groundY - target.y) / g + (vY * vY / (g * g))) - vY / g, {
                "y": groundY,
                "physicMove": true,
                "vx": vX,
                "vy": vY
            });
        }

        static to(target:any, time:number, xTo:number, yTo:number, vX = 0, vY = 0) {
            return Tween.to(target, time, {"x": xTo, "y": yTo, "vx": vX, "vy": vY, "physicMove": true});
        }

    }

}

////////////////////////////////black/flower/data/DataManager.ts/////////////////////////////////
namespace lib {
    export class DataManager {

        static Attribute = "Attribute";
        static Size = "Size";
        static Point = "Point";
        static RGB = "RGB";
        static ARGB = "ARGB";
        static Rectangle = "Rectangle";
        static ProgressData = "ProgressData";
        static System = "System";
        static BlackData = "BlackData";

        _defines: any = {};
        _root: any = {};
        staticScript: string;
        scriptContent: string;

        constructor() {
            if (DataManager.instance) {
                return;
            }
            DataManager.instance = this;
            this.addDefine({
                "name": "Attribute",
                "members": {
                    "name": {"type": "string"},
                    "content": {"type": "string"}
                }
            });
            this.addDefine({
                "name": "Size",
                "members": {
                    "width": {"type": "int"},
                    "height": {"type": "int"}
                }
            });
            this.addDefine({
                "name": "Point",
                "members": {
                    "x": {"type": "int"},
                    "y": {"type": "int"}
                }
            });
            this.addDefine({
                "name": "RGB",
                "members": {
                    "r": {"type": "uint"},
                    "g": {"type": "uint"},
                    "b": {"type": "uint"}
                }
            });
            this.addDefine({
                "name": "ARGB",
                "members": {
                    "a": {"type": "uint"},
                    "r": {"type": "uint"},
                    "g": {"type": "uint"},
                    "b": {"type": "uint"}
                }
            });
            this.addDefine({
                "name": "Rectangle",
                "members": {
                    "x": {"type": "int"},
                    "y": {"type": "int"},
                    "width": {"type": "int"},
                    "height": {"type": "int"}
                }
            });
            this.addDefine({
                "name": "ProgressData",
                "members": {
                    "current": {"type": "number"},
                    "max": {"type": "number"},
                    "percent": {"type": "number", "bind": "{max==0?1:current/max}"},
                    "tip": {"type": "string"}
                }
            });
            this.addDefine({
                "name": "System",
                "members": {
                    "screen": {"type": "Size"},
                }
            });
            this.addDefine({
                "name": "BlackData",
                "members": {
                    "system": {"type": "System"},
                }
            });
            this.addRootData("black", "BlackData");
        }

        addRootData(name: string, className: string, init: any = null) {
            this[name] = this.createData(className, init);
            return this._root[name] = this[name];
        }

        addDefine(config: any) {
            var className = config.name;
            if (!className) {
                sys.$error(3010, ObjectDo.toString(config));
                return;
            }
            if (!this._defines[className]) {
                this._defines[className] = {
                    //moduleKey: moduleKey,
                    id: 0,
                    className: "",
                    define: null
                };
            }
            var item = this._defines[className];
            var packages = className.split(".");
            className = packages.splice(packages.length - 1, 1)[0];
            var defineClass = "" + className + (item.id != 0 ? item.id : "");
            item.className = defineClass;
            var extendClassName = "ObjectValue";
            if (config.extends) {
                var extendsItem = this.getClass(config.extends);
                if (extendsItem) {
                    extendClassName = "DataManager.getInstance().getClass(\"" + config.extends + "\")";
                } else {
                    var extendPakcages = config.extends.split(".");
                    extendsItem = window;
                    for (var i = 0; i < extendPakcages.length; i++) {
                        extendsItem = extendsItem[extendPakcages[i]];
                    }
                    if (extendsItem) {
                        extendClassName = config.extends;
                    }
                }
                if (!extendsItem) {
                    sys.$error(3013, config.extends, ObjectDo.toString(config));
                    return;
                }
            }
            this.staticScript = "";
            this.scriptContent = config.script;
            var content = this.__getImportContent();
            var script = {content: "", ctor: ""};
            this.decodeScript("\n\n", defineClass, script);
            content += "var " + defineClass + " = (function (_super) {\n" +
                "\t__extends(" + defineClass + ", _super);\n" +
                "\tfunction " + defineClass + "(init) {\n" +
                "\t\t_super.call(this,null);\n";
            content += "\t\tthis.className = \"" + config.name + "\";\n";
            var defineMember = "";
            var members = config.members;
            var bindContent = "";
            var subContent = "";
            if (members) {
                var member;
                for (var key in members) {
                    member = members[key];
                    if (member.init && typeof member.init == "object" && member.init.__className) {
                        content += "\t\tthis.$setMember(\"" + key + "\" , DataManager.getInstance().createData(\"" + member.init.__className + "\"," + (member.init != null ? JSON.stringify(member.init) : "null") + "," + member.checkDistort + "));\n";
                        content += "\t\tthis.$setMemberSaveClass(\"" + key + "\" ," + (member.saveClass ? true : false) + ");\n";
                    } else {
                        if (member.type === "number" || member.type === "Number") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new NumberValue(" + (member.init != null ? member.init : "null") + "," + (member.enumList ? JSON.stringify(member.enumList) : "null") + "," + member.checkDistort + "));\n";
                        } else if (member.type === "int" || member.type === "Int") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new IntValue(" + (member.init != null ? member.init : "null") + "," + (member.enumList ? JSON.stringify(member.enumList) : "null") + "," + member.checkDistort + "));\n";
                        } else if (member.type === "uint" || member.type === "Uint") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new UIntValue(" + (member.init != null ? member.init : "null") + "," + (member.enumList ? JSON.stringify(member.enumList) : "null") + "," + member.checkDistort + "));\n";
                        } else if (member.type === "string" || member.type === "String") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new StringValue(" + (member.init != null ? "\"" + member.init + "\"" : "null") + "," + (member.enumList ? JSON.stringify(member.enumList) : "null") + "));\n";
                        } else if (member.type === "boolean" || member.type === "Boolean" || member.type === "bool") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new BooleanValue(" + (member.init != null ? member.init : "null") + "," + (member.enumList ? JSON.stringify(member.enumList) : "null") + "));\n";
                        } else if (member.type === "array" || member.type === "Array") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , new ArrayValue(" + (member.init != null ? JSON.stringify(member.init) : "null") + ",\"" + member.typeValue + "\"));\n";
                        } else if (member.type === "*") {
                            content += "\t\tthis.$setMember(\"" + key + "\" , " + (member.init != null ? member.init : "null") + ");\n";
                            content += "\t\tthis.$setMemberSaveClass(\"" + key + "\" ," + (member.saveClass ? true : false) + ");\n";
                        } else {
                            if (member.hasOwnProperty("init") && member.init == null) {
                                content += "\t\tthis.$setMember(\"" + key + "\" , null);\n";
                            } else {
                                content += "\t\tthis.$setMember(\"" + key + "\" , DataManager.getInstance().createData(\"" + member.type + "\"," + (member.init != null ? JSON.stringify(member.init) : "null") + "));\n";
                            }
                            content += "\t\tthis.$setMemberSaveClass(\"" + key + "\" ," + (member.saveClass ? true : false) + ");\n";
                        }
                        content += "\t\tthis." + key + "Value = this.__value[\"" + key + "\"];\n";
                        // if (member.type === "number" || member.type === "Number" ||
                        //     member.type === "int" || member.type === "Int" ||
                        //     member.type === "uint" || member.type === "Uint" ||
                        //     member.type === "string" || member.type === "String" ||
                        //     member.type === "boolean" || member.type === "Boolean" || member.type === "bool") {
                        //      content += "\t\tthis." + key + "Value = this.__value[\" + key + \"];\n";
                        // }
                    }
                    if (member.save === true || member.save === false) {
                        content += "\t\tthis.$setMemberSaveFlag(\"" + key + "\" ," + member.save + ");\n";
                    }
                    if (member.bind) {
                        bindContent += "\t\tnew Binding(this." + key + "Value,[this],\"value\",\"" + member.bind + "\");\n"
                    }
                    if (member.sub) {
                        subContent += "\t\tthis." + member.sub.source + ".linkSubArrayValue(this." + key + ",";
                        if (typeof member.sub.type == "string") {
                            subContent += "\"" + member.sub.type + "\"," + (typeof member.sub.value == "string" ? "\"" + member.sub.value + "\"" : member.sub.value) + ");\n";
                        } else {
                            for (var s = 0; s < member.sub.type.length; s++) {
                                subContent += "\"" + member.sub.type[s] + "\"," + (typeof member.sub.value[s] == "string" ? "\"" + member.sub.value[s] + "\"" : member.sub.value[s]) + (s < member.sub.type.length - 1 ? "," : ");\n");
                            }
                        }
                    }
                    defineMember += "\tObject.defineProperty(" + defineClass + ".prototype,\"" + key + "\", {\n";
                    defineMember += "\t\tget: function () {\n";
                    if (member.type === "number" || member.type === "Number" ||
                        member.type === "int" || member.type === "Int" ||
                        member.type === "uint" || member.type === "Uint" ||
                        member.type === "string" || member.type === "String" ||
                        member.type === "boolean" || member.type === "Boolean" || member.type === "bool") {
                        defineMember += "\t\t\treturn this.__value[\"" + key + "\"].value;\n";
                    } else {
                        defineMember += "\t\t\treturn this.__value[\"" + key + "\"];\n";
                    }
                    defineMember += "\t\t},\n";
                    defineMember += "\t\tset: function (val) {\n";
                    defineMember += "\t\t\tthis.setValue(\"" + key + "\", val);\n";
                    defineMember += "\t\t},\n";
                    defineMember += "\t\tenumerable: true,\n";
                    defineMember += "\t\tconfigurable: true\n";
                    defineMember += "\t});\n\n";
                }
            }
            if (config.init) {
                content += "\t\tthis.value = " + JSON.stringify(config.init) + ";\n";
            }
            content += "\t\tif(init) this.value = init;\n";
            content += bindContent;
            content += subContent;
            content += script.ctor;
            content += "\t}\n\n" + "var p = " + defineClass + ".prototype;" + "\n\n" +
                script.content + "\n" +
                defineMember +
                "\treturn " + defineClass + ";\n" +
                "})(" + extendClassName + ");\n";
            content += "DataManager.getInstance().$addClassDefine(" + defineClass + ", \"" + config.name + "\");\n";
            if (config.exports) {
                var name = "";
                for (var i = 0; i < packages.length; i++) {
                    name += packages[i];
                    content += "$root." + name + " = $root." + name + " || {}\n";
                    name += ".";
                }
                name += className;
                content += "$root." + name + " = " + defineClass + ";\n";
            }
            if (sys.TIP) {
                console.log("数据结构:\n" + content);
            }
            if (sys.DEBUG) {
                try {
                    eval(content);
                } catch (e) {
                    sys.$error(3011, e, content);
                }
            } else {
                eval(content);
            }
            item.id++;
            return this.getClass(config.name);
        }

        __getImportContent():string {
            return "var DataManager = lib.DataManager;\n" +
                "var ArrayValue = lib.ArrayValue;\n" +
                "var BooleanValue = lib.BooleanValue;\n" +
                "var IntValue = lib.IntValue;\n" +
                "var NumberValue = lib.NumberValue;\n" +
                "var ObjectValue = lib.ObjectValue;\n" +
                "var StringValue = lib.StringValue;\n" +
                "var UIntValue = lib.UIntValue;\n" +
                "var Value = lib.Value;\n" +
                "var Binding = lib.Binding;\n";
        }

        $addClassDefine(clazz: any, className: string) {
            var item = this._defines[className];
            item.define = clazz;
        }

        getClass(className: string) {
            var item = this._defines[className];
            if (!item) {
                return null;
            }
            //if (item.moduleKey != moduleKey) {
            //    sys.$error(3016, moduleKey);
            //}
            return item.define;
        }

        createData(className: string, init: any = null, distort: boolean = null): any {
            if (className === "number" || className === "Number") {
                return new NumberValue(init, null, distort);
            } else if (className === "int" || className === "Int") {
                return new IntValue(init, null, distort);
            } else if (className === "uint" || className === "Uint") {
                return new UIntValue(init, null, distort);
            } else if (className === "string" || className === "String") {
                return new StringValue(init);
            } else if (className === "boolean" || className === "Boolean" || className === "bool") {
                return new BooleanValue(init);
            } else if (className === "array" || className === "Array") {
                return new ArrayValue(init);
            } else if (className === "*") {
                return init;
            } else {
                var item = this._defines[className];
                if (!item) {
                    sys.$error(3012, className);
                    return;
                }
                //if (item.moduleKey != moduleKey) {
                //    sys.$error(3016, moduleKey);
                //}
                return new item.define(init);
            }
        }

        decodeScript(before: any, className: string, script: any) {
            if (this.scriptContent && this.scriptContent != "") {
                var scriptContent = this.scriptContent;
                //删除注释
                scriptContent = StringDo.deleteProgramNote(scriptContent, 0);
                var i = 0;
                var len = scriptContent.length;
                var pos = 0;
                var list: any[] = [];
                this.staticScript = "";
                while (true) {
                    var nextFunction = this.findNextFunction(scriptContent, pos);
                    if (nextFunction) {
                        this.staticScript += nextFunction.staticScript;
                        pos = nextFunction.endIndex;
                        list.push(nextFunction);
                    } else {
                        break;
                    }
                }
                for (var i = 0; i < list.length; i++) {
                    var func: any = list[i];
                    if (func.name == "constructor") {
                        script.ctor = before + func.content + "\n";
                    } else if (func.gset == 0) {
                        script.content += before + "\t" + className + (func.isStatic ? "." : ".prototype.") + func.name + " = function(" +
                            func.params + ") " + func.content + "\n";
                    } else {
                        var setContent = func.gset == 1 ? "" : func.content;
                        var getContent = func.gset == 1 ? func.content : "";
                        var prams = func.gset == 1 ? "" : func.params;
                        for (var f = 0; f < list.length; f++) {
                            if (f != i && list[f].name == func.name && list[f].gset && list[f].gset != func.gset) {
                                if (list[f].gset == 1) {
                                    getContent = list[f].content;
                                } else {
                                    setContent = list[f].content;
                                    prams = list[f].params;
                                }
                                list.splice(f, 1);
                                break;
                            }
                        }
                        script.content += before + "\tObject.defineProperty(" + className + ".prototype, \"" + func.name + "\", {\n";
                        if (getContent != "") {
                            script.content += before + "\t\tget: function () " + getContent + ",\n";
                        }
                        if (setContent != "") {
                            script.content += before + "\t\tset: function (" + prams + ") " + setContent + ",\n";
                        }
                        script.content += before + "\t\tenumerable: true,\n"
                        script.content += before + "\t\tconfigurable: true\n";
                        script.content += before + "\t\t});\n\n";
                    }
                }
            }
        }

        /**
         * 查找下一个函数，并分析出 函数名和参数列表
         * @param content
         * @param start
         * @return {
     *      name : 函数名
     *      gset : 0.普通函数 1.get函数 2.set函数
     *      params : 参数列表 (也是字符串，直接用就可以)
     *      content : 函数体
     *      endIndex : 函数体结束标识 } 之后的那个位置
         * }
         */
        findNextFunction(content: string, start: number) {
            var len = "function".length;
            var flag;
            var name;
            var params;
            var char;
            var pos, pos2, i;
            var res: any;
            var gset = 0;
            var funcName;
            var isStatic = false;
            //跳过空格和注释
            i = StringDo.jumpProgramSpace(content, start);
            if (i == content.length) {
                return null;
            }
            var j = i;
            while (j < content.length) {
                if (content.slice(j, j + "static".length) == "static" || content.slice(j, j + len) == "function") {
                    break;
                }
                j++;
            }
            if (j == content.length) {
                this.staticScript += content.slice(i, j);
                return null;
            }
            var staticScript = content.slice(i, j);
            i = j;
            if (content.slice(i, i + "static".length) == "static") {
                isStatic = true;
                i += "static".length;
                //跳过空格和注释
                i = StringDo.jumpProgramSpace(content, i);
            }
            if (content.slice(i, i + len) == "function") {
                if (i != 0) {
                    //判断 function 之前是不是分隔符
                    char = content.charAt(i - 1);
                    if (char != "\t" && char != " " && char != "\r" && char != "\n") {
                        sys.$error(3007, "", this.scriptContent);
                    }
                }
                i = pos = i + len;
                //跳过 function 之后的分隔符
                pos2 = StringDo.jumpProgramSpace(content, pos);
                if (pos2 == pos) {
                    sys.$error(3007, "", this.scriptContent);
                }
                pos = pos2;
                //获取 function 之后的函数名
                name = StringDo.findId(content, pos);
                if (name == "") {
                    i = pos;
                    sys.$error(3007, "", this.scriptContent);
                }
                if (name == "get" || name == "set") {
                    pos += name.length;
                    gset = name == "get" ? 1 : 2;
                    //跳过 function 之后的分隔符
                    pos2 = StringDo.jumpProgramSpace(content, pos);
                    if (pos2 == pos) {
                        sys.$error(3007, "", this.scriptContent);
                    }
                    pos = pos2;
                    //获取 function 之后的函数名
                    name = StringDo.findId(content, pos);
                    if (name == "") {
                        i = pos;
                        sys.$error(3007, "", this.scriptContent);
                    }
                }
                funcName = name;
                //跳过函数名之后的分隔符
                i = pos = StringDo.jumpProgramSpace(content, pos + name.length);
                //判断函数名之后是不是(
                char = content.charAt(pos);
                if (char != "(") {
                    sys.$error(3007, "", this.scriptContent);
                }
                //跳过 (
                pos++;
                //查找 params
                params = "";
                flag = true;
                while (true) {
                    //跳过空格
                    pos = StringDo.jumpProgramSpace(content, pos);
                    //查找 param 名
                    name = StringDo.findId(content, pos);
                    if (name == "") {
                        if (content.charAt(pos) == ")") {
                            i = pos + 1;
                            break;
                        } else {
                            flag = false;
                            break;
                        }
                    } else {
                        params += name;
                        pos += name.length;
                    }
                    //跳过空格
                    pos = StringDo.jumpProgramSpace(content, pos);
                    char = content.charAt(pos);
                    if (char == ",") {
                        params += ",";
                        pos++;
                    }
                }
                if (!flag) {
                    sys.$error(3007, "", this.scriptContent);
                }
                res = {
                    name: funcName,
                    gset: gset,
                    params: params,
                }
            }
            if (!res) {
                sys.$error(3007, "", this.scriptContent);
            }

            //分析函数体
            //跳过空格
            content = StringDo.findFunctionContent(content, i);
            if (content == "") {
                sys.$error(3007, "", this.scriptContent);
            }
            res.staticScript = staticScript || "";
            res.content = content;
            res.endIndex = i + content.length + 1;
            res.isStatic = isStatic;
            return res;
        }

        clear() {
            for (var key in this._root) {
                delete this._root[key];
                delete this[key];
            }
            this._defines = {};
        }

        static instance: DataManager;

        static getInstance(): DataManager {
            if (DataManager.instance == null) {
                new DataManager();
            }
            return DataManager.instance;
        }

        static addRootData(name: string, className: string, init: any = null): any {
            return DataManager.getInstance().addRootData(name, className, init);
        }

        static getClass(className: string): any {
            return DataManager.getInstance().getClass(className);
        }

        static addDefine(config: any): any {
            return DataManager.getInstance().addDefine(config);
        }

        static createData(className: string, init: any = null): any {
            return DataManager.getInstance().createData(className, init);
        }

        static clear(): void {
            DataManager.getInstance().clear();
        }
    }
}

////////////////////////////////black/flower/data/member/Value.ts/////////////////////////////////
namespace lib {
    export class Value extends lib.EventDispatcher {

        protected __old: any = null;
        protected __value: any = null;
        protected __checkDistort: boolean;
        protected __list: any[] = null;
        protected valueEqualResolve: Function;
        protected equalValue: any;

        constructor(checkDistort: boolean = null) {
            super();
            this.__checkDistort = checkDistort == null ? Value.Default_Check_Distort : checkDistort;
        }

        /**
         * 等待值等于
         * @param val
         */
        public valueEqual(val: any): Promise<void> {
            this.equalValue = val;
            return new Promise<void>(this.asyncFunction.bind(this));
        }

        protected asyncFunction(resolve: Function): void {
            this.valueEqualResolve = resolve;
        }

        $setValue(val: any) {
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
        }

        $getValue() {
            return this.__value;
        }

        push(val: any) {
            if (!this.__list) {
                this.__list = [];
            }
            this.__list.push(val);
        }

        pop() {
            if (this.__list) {
                return this.__list.pop();
            }
            return null;
        }

        get value() {
            if (this.__checkDistort) {
                return this.$getValue();
            }
            return this.__value;
        }

        set value(val) {
            this.$setValue(val);
        }

        get old() {
            return this.__old;
        }

        //Value 是否自动检测非法修改
        static Default_Check_Distort: boolean = false;
    }

}



////////////////////////////////black/flower/data/member/ArrayValue.ts/////////////////////////////////
namespace lib {
    export /**
     *
     * @Event
     * Event.ADD item
     * Event.REMOV item
     * Event.CHANGE ArrayValue 所有更新都会触发，包括排序
     */
    class ArrayValue extends Value {

        _lengthValue: IntValue;
        _length: number;
        list: any[];
        _key: string = "";
        _rangeMinKey: string = "";
        _rangeMaxKey: string = "";
        _selectedItem: any = null;
        _itemType: string = null;
        _subs: any = null;
        $sub: boolean = false;

        constructor(init: any = null, itemType: string = "*") {
            super();
            this._itemType = itemType;
            this.list = init || [];
            this._length = this.list.length;
            this.__value = this;
            this._lengthValue = new IntValue();
        }

        push(item: any): void {
            this.list.push(item);
            this._length = this._length + 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubPush(item);
                this.__addItemChange(item);
            }
            this.dispatchWith(Event.ADD, item);
            this.dispatchWith(Event.CHANGE, this);
        }

        addItemAt(item: any, index: number): void {
            index = +index & ~0;
            if (index < 0 || index > this.list.length) {
                sys.$error(3101, index, this.list.length);
                return;
            }
            this.list.splice(index, 0, item);
            this._length = this._length + 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubAddItemAt(item, index);
                this.__addItemChange(item);
            }
            this.dispatchWith(Event.ADD, item);
            this.dispatchWith(Event.CHANGE, this);
        }

        shift(): any {
            if (!this.list.length) {
                return;
            }
            var item = this.list.shift();
            this._length = this._length - 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubRemoveItem(item);
                this.__removeItemChange(item);
            }
            this.dispatchWith(Event.REMOVE, item);
            this.dispatchWith(Event.CHANGE, this);
            return item;
        }

        splice(startIndex: number, delCount = 0, ...args: any[]): any[] {
            var i;
            startIndex = +startIndex & ~0;
            delCount = +delCount & ~0;
            var list;
            if (delCount <= 0) {
                list = [];
                for (i = 0; i < args.length; i++) {
                    list[i] = args[i];
                    this.list.splice(startIndex, 0, args[i]);
                }
                this._length = this._length + 1;
                this._lengthValue.value = this._length;
                for (i = 0; i < args.length; i++) {
                    if (this._subs) {
                        this.__checkSubAddItemAt(args[i], startIndex + i);
                        this.__addItemChange(args[i]);
                    }
                    this.dispatchWith(Event.ADD, args[i]);
                }
                this.dispatchWith(Event.CHANGE, this);
            }
            else {
                list = this.list.splice(startIndex, delCount);
                this._length = this._length - delCount;
                this._lengthValue.value = this._length;
                for (i = 0; i < list.length; i++) {
                    if (this._subs) {
                        this.__checkSubRemoveItem(list[i]);
                        this.__removeItemChange(list[i]);
                    }
                    this.dispatchWith(Event.REMOVE, list[i]);
                }
                this.dispatchWith(Event.CHANGE, this);
            }
            return list;
        }

        slice(startIndex: number, end: number): ArrayValue {
            startIndex = +startIndex & ~0;
            end = +end & ~0;
            return new ArrayValue(this.list.slice(startIndex, end));
        }

        pop(): any {
            if (!this.list.length) {
                return;
            }
            var item = this.list.pop();
            this._length = this._length - 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubRemoveItem(item);
                this.__removeItemChange(item);
            }
            this.dispatchWith(Event.REMOVE, item);
            this.dispatchWith(Event.CHANGE, this);
            return item;
        }

        removeAll(): void {
            if (!this.list.length) {
                return;
            }
            if (this._subs) {
                this.__subRemoveAll();
            }
            while (this.list.length) {
                var item = this.list.pop();
                this._length = this._length - 1;
                this._lengthValue.value = this._length;
                if (this._subs) {
                    this.__removeItemChange(item);
                }
                this.dispatchWith(Event.REMOVE, item);
            }
            this.dispatchWith(Event.CHANGE, this);
        }

        removeItem(item: any): any {
            for (var i = 0, len = this.list.length; i < len; i++) {
                if (this.list[i] == item) {
                    this.list.splice(i, 1);
                    this._length = this._length - 1;
                    this._lengthValue.value = this._length;
                    if (this._subs) {
                        this.__checkSubRemoveItem(item);
                        this.__removeItemChange(item);
                    }
                    this.dispatchWith(Event.REMOVE, item);
                    this.dispatchWith(Event.CHANGE, this);
                    return item;
                }
            }
            return null;
        }

        removeItemAt(index: number): any {
            index = +index & ~0;
            if (index < 0 || index >= this.list.length) {
                sys.$error(3101, index, this.list.length);
                return;
            }
            var item = this.list.splice(index, 1)[0];
            this._length = this._length - 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubRemoveItem(item);
                this.__removeItemChange(item);
            }
            this.dispatchWith(Event.REMOVE, item);
            this.dispatchWith(Event.CHANGE, this);
            return item;
        }

        removeItemWith(key: string, value: any, key2: string = "", value2: any = null): any {
            var item;
            var i;
            if (key2 == "") {
                for (i = 0; i < this.list.length; i++) {
                    var val = this.list[i][key];
                    if (val instanceof Value && !(val instanceof ObjectValue) && !(val instanceof ArrayValue)) {
                        val = val.value;
                    }
                    if (val == value) {
                        item = this.list.splice(i, 1)[0];
                        break;
                    }
                }
            } else {
                for (i = 0; i < this.list.length; i++) {
                    var val1 = this.list[i][key];
                    if (val1 instanceof Value && !(val1 instanceof ObjectValue) && !(val1 instanceof ArrayValue)) {
                        val1 = val1.value;
                    }
                    var val2 = this.list[i][key2];
                    if (val2 instanceof Value && !(val2 instanceof ObjectValue) && !(val2 instanceof ArrayValue)) {
                        val2 = val2.value;
                    }
                    if (val == value && val2 == value2) {
                        item = this.list.splice(i, 1)[0];
                        break;
                    }
                }
            }
            if (!item) {
                return;
            }
            this._length = this._length - 1;
            this._lengthValue.value = this._length;
            if (this._subs) {
                this.__checkSubRemoveItem(item);
                this.__removeItemChange(item);
            }
            this.dispatchWith(Event.REMOVE, item);
            this.dispatchWith(Event.CHANGE, this);
            return item;
        }

        getItemIndex(item: any): number {
            for (var i = 0, len = this.list.length; i < len; i++) {
                if (this.list[i] == item || !(item instanceof Value) && this.list[i] instanceof Value && this.list[i].value == item) {
                    return i;
                }
            }
            return -1;
        }

        getItemWith(key: string, value: any, key2: string = "", value2: any = null): any {
            var i;
            if (key2 == "") {
                for (i = 0; i < this.list.length; i++) {
                    var keys = key.split(".");
                    var val1 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val1 = val1[keys[k]];
                    }
                    if (val1 instanceof Value && !(val1 instanceof ObjectValue) && !(val1 instanceof ArrayValue)) {
                        val1 = val1.value;
                    }
                    if (val1 == value) {
                        return this.list[i];
                    }
                }
            } else {
                for (i = 0; i < this.list.length; i++) {
                    var keys = key.split(".");
                    var val1 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val1 = val1[keys[k]];
                    }
                    if (val1 instanceof Value && !(val1 instanceof ObjectValue) && !(val1 instanceof ArrayValue)) {
                        val1 = val1.value;
                    }
                    keys = key2.split(".");
                    var val2 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val2 = val2[keys[k]];
                    }
                    if (val2 instanceof Value && !(val2 instanceof ObjectValue) && !(val2 instanceof ArrayValue)) {
                        val2 = val2.value;
                    }
                    if (val1 == value && val2 == value2) {
                        return this.list[i];
                    }
                }
            }
            return null;
        }

        getItemFunction(func: Function, thisObj: any, ...args: any[]): void {
            for (var i = 0; i < this.list.length; i++) {
                args.push(this.list[i]);
                var r = func.apply(thisObj, args);
                args.pop();
                if (r == true) {
                    return this.list[i];
                }
            }
            return null;
        }

        getItemsWith(key: string, value: any, key2: string = "", value2: any = null): any[] {
            var result = [];
            var i;
            if (key2 == "") {
                for (i = 0; i < this.list.length; i++) {
                    var keys = key.split(".");
                    var val1 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val1 = val1[keys[k]];
                    }
                    if (val1 instanceof Value && !(val1 instanceof ObjectValue) && !(val1 instanceof ArrayValue)) {
                        val1 = val1.value;
                    }
                    if (val1 == value) {
                        result.push(this.list[i]);
                    }
                }
            } else {
                for (i = 0; i < this.list.length; i++) {
                    var keys = key.split(".");
                    var val1 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val1 = val1[keys[k]];
                    }
                    if (val1 instanceof Value && !(val1 instanceof ObjectValue) && !(val1 instanceof ArrayValue)) {
                        val1 = val1.value;
                    }
                    keys = key2.split(".");
                    var val2 = this.list[i];
                    for (var k = 0; k < keys.length; k++) {
                        val2 = val2[keys[k]];
                    }
                    if (val2 instanceof Value && !(val2 instanceof ObjectValue) && !(val2 instanceof ArrayValue)) {
                        val2 = val2.value;
                    }
                    if (val1 == value && val2 == value2) {
                        result.push(this.list[i]);
                    }
                }
            }
            return result;
        }

        setItemsAttributeWith(findKey: string, findValue: any, setKey: string = "", setValue: any = null): void {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i][findKey] instanceof Value && this.list[i][findKey].value == findValue) {
                    this.list[i][setKey].value = setValue
                } else if (this.list[i][findKey] == findValue) {
                    this.list[i][setKey] = setValue;
                }

            }
        }

        getItemsFunction(func: Function, thisObj: any = null): any[] {
            var _arguments__ = [];
            for (var argumentsLength = 0; argumentsLength < arguments.length; argumentsLength++) {
                _arguments__ = arguments[argumentsLength];
            }
            var result = [];
            var args = [];
            if (_arguments__.length && _arguments__.length > 2) {
                args = [];
                for (var a = 2; a < _arguments__.length; a++) {
                    args.push(_arguments__[a]);
                }
            }
            for (var i = 0; i < this.list.length; i++) {
                args.push(this.list[i]);
                var r = func.apply(thisObj, args);
                args.pop();
                if (r == true) {
                    result.push(this.list[i]);
                }
            }
            return result;
        }

        sort(): void {
            this.list.sort.apply(this.list, arguments);
            this.dispatchWith(Event.CHANGE, this);
        }

        setItemIndex(item: any, index: number): void {
            var itemIndex = this.getItemIndex(item);
            if (itemIndex < 0 || itemIndex == index) {
                return;
            }
            this.list.splice(itemIndex, 1);
            this.list.splice(index, 0, item);
            this.dispatchWith(Event.CHANGE, this);
        }

        getItemAt(index: number): any {
            index = +index & ~0;
            if (index < 0 || index >= this.list.length) {
                sys.$error(3101, index, this.list.length);
                return;
            }
            return this.list[index];
        }

        setItemAt(index: number, item: any) {
            this.splice(index, 1);
            this.splice(index, 0, item);
        }

        getItemByValue(value: any): any {
            if (this.key == "") {
                return null;
            }
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i][this.key] instanceof Value && this.list[i][this.key].value == value || this.list[i][this.key] == value) {
                    return this.list[i];
                }
            }
            return null;
        }

        getItemByRange(value: any): any {
            if (this.key == "" || this.rangeMinKey == "" || this.rangeMaxKey == "") {
                return null;
            }
            for (var i = 0; i < this.list.length; i++) {
                var min = this.list[i][this.rangeMinKey];
                var max = this.list[i][this.rangeMaxKey];
                if (value >= min && value <= max) {
                    return this.list[i];
                }
            }
            return null;
        }

        getItemsByRange(value: any): any[] {
            if (this.key == "" || this.rangeMinKey == "" || this.rangeMaxKey == "") {
                return null;
            }
            var list = [];
            for (var i = 0; i < this.list.length; i++) {
                var min = this.list[i][this.rangeMinKey];
                var max = this.list[i][this.rangeMaxKey];
                if (value >= min && value <= max) {
                    list.push(this.list[i]);
                }
            }
            return list;
        }

        createSubArrayValue(...args: any[]): ArrayValue {
            if (!this._subs) {
                this._subs = [];
            }
            var init = [];
            var list = this.list;
            for (var i = 0; i < list.length; i++) {
                var item = this.list[i];
                var flag = true;
                for (var a = 0; a < arguments.length; a++, a++) {
                    if (item instanceof Value) {
                        if (item[arguments[a]].value != arguments[a + 1]) {
                            flag = false;
                            break;
                        }
                    } else if (item[arguments[a]] != arguments[a + 1]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    init.push(item);
                }
            }
            var sub = new ArrayValue(init, this._itemType);
            sub.$sub = true;
            this._subs.push([sub, arguments]);
            this.__addAllItemChange();
            return sub;
        }

        /**
         * 绑定子集数组
         * @param sub 需要绑定的子集数组对象
         * @param args 绑定条件，按照 属性名称1,属性值1,属性名称2,属性值2,... 的顺序传入
         */
        linkSubArrayValue(sub:any, ...args:any[]):void {
            if (!this._subs) {
                this._subs = [];
            }
            sub.$sub = true;
            sub.removeAll();
            this._subs.push([sub, args]);
            var list = this.list;
            for (var i = 0; i < list.length; i++) {
                var item = this.list[i];
                var flag = true;
                for (var a = 1; a < args.length; a++, a++) {
                    if (item instanceof Value) {
                        if (item[args[a]].value != args[a + 1]) {
                            flag = false;
                            break;
                        }
                    } else if (item[args[a]] != args[a + 1]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    sub.push(item);
                }
            }
            this.__addAllItemChange();
        }

        __addAllItemChange():void {
            var list = this.list;
            var subs = this._subs;
            for (var i = 0; i < list.length; i++) {
                var item = this.list[i];
                for (var s = 0; s < subs.length; s++) {
                    var args = subs[s][1];
                    for (var a = 0; a < args.length; a++, a++) {
                        var key = args[a];
                        if (item[key] instanceof Value) {
                            item[key].addListener(Event.CHANGE, this.__onItemChange, this, 0, item);
                        }
                    }
                }
            }
        }

        __addItemChange(item:any) {
            var subs = this._subs;
            for (var s = 0; s < subs.length; s++) {
                var args = subs[s][1];
                for (var a = 0; a < args.length; a++, a++) {
                    var key = args[a];
                    if (item[key] instanceof Value) {
                        item[key].addListener(Event.CHANGE, this.__onItemChange, this, 0, item);
                    }
                }
            }
        }

        __removeItemChange(item:any) {
            var keys = item.membersKey;
            for (var i = 0; i < keys.length; i++) {
                if (item[keys[i]] instanceof Value) {
                    item[keys[i]].removeListener(Event.CHANGE, this.__onItemChange, this);
                }
            }
        }

        __onItemChange(e:Event, item:any) {
            var subs = this._subs;
            for (var s = 0; s < subs.length; s++) {
                var sub = subs[s][0];
                var args = subs[s][1];
                var oldIndex = sub.getItemIndex(item);
                var flag = true;
                for (var a = 0; a < args.length; a++, a++) {
                    var key = args[a];
                    var value = args[a + 1];
                    if (item[key] instanceof Value) {
                        if (item[key].value != value) {
                            flag = false;
                            break;
                        }
                    } else if (item[key] != value) {
                        flag = false;
                        break;
                    }
                }
                if (oldIndex == -1 && flag) {
                    var index = this.getItemIndex(item);
                    var ind = -1;
                    for (var f = index - 1; f >= 0; f++) {
                        ind = sub.getItemIndex(this.list[f]);
                        if (ind != -1) {
                            ind++;
                            break;
                        }
                    }
                    if (ind == -1) {
                        ind = 0;
                    }
                    sub.addItemAt(item, ind);
                } else if (oldIndex != -1 && !flag) {
                    sub.removeItem(item);
                }
            }
        }

        __checkSubPush(item:any):void {
            for (var s = 0; s < this._subs.length; s++) {
                var sub = this._subs[s][0];
                var args = this._subs[s][1];
                var flag = true;
                for (var a = 0; a < args.length; a++, a++) {
                    var key = args[a];
                    var value = args[a + 1];
                    if (item[key] instanceof Value) {
                        if (item[key].value != value) {
                            flag = false;
                            break;
                        }
                    } else if (item[key] != value) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    sub.push(item);
                }
            }
        }

        __checkSubAddItemAt(item:any, index:number):void {
            for (var s = 0; s < this._subs.length; s++) {
                var sub = this._subs[s][0];
                var args = this._subs[s][1];
                var flag = true;
                for (var a = 0; a < args.length; a++, a++) {
                    var key = args[a];
                    var value = args[a + 1];
                    if (item[key] instanceof Value) {
                        if (item[key].value != value) {
                            flag = false;
                            break;
                        }
                    } else if (item[key] != value) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    var ind = -1;
                    for (var f = index - 1; f >= 0; f++) {
                        ind = sub.getItemIndex(this.list[f]);
                        if (ind != -1) {
                            ind++;
                            break;
                        }
                    }
                    if (ind == -1) {
                        ind = 0;
                    }
                    sub.addItemAt(item, ind);
                }
            }
        }

        __checkSubRemoveItem(item:any):void {
            for (var s = 0; s < this._subs.length; s++) {
                var sub = this._subs[s][0];
                var ind = sub.getItemIndex(item);
                if (ind != -1) {
                    sub.removeItemAt(ind);
                }
            }
        }

        __subRemoveAll():void {
            for (var s = 0; s < this._subs.length; s++) {
                var sub = this._subs[s][0];
                sub.removeAll();
            }
        }


        dispose() {
            var list = this.list;
            for (var i = 0; i < list.length; i++) {
                var value = this.list[i];
                if (value instanceof Value) {
                    value.dispose();
                }
            }
            if (this._subs) {
                while (this._subs) {
                    var sub = this._subs.pop()[0];
                    sub.removeAll();
                    sub.dispose();
                }
                this._subs = null;
            }
            super.dispose();
        }

        /**
         * 从 Object 中读取数据
         * @param value
         */
        $setValue(val:any):void {
            this.removeAll();
            var itemType = this._itemType;
            for (var i = 0; i < val.length; i++) {
                this.push(DataManager.createData(itemType, val[i]));
            }
        }

        /**
         * 将数据转化成 Object
         */
        get value() {
            var res = [];
            var list = this.list;
            for (var i = 0, len = list.length; i < len; i++) {
                var item = list[i];
                if (item instanceof Value) {
                    res.push(item.value);
                } else {
                    res.push(item);
                }
            }
            return res;
        }

        set value(val) {
            this.$setValue(val);
        }

        set key(val) {
            this._key = val;
        }

        get key() {
            return this._key;
        }

        set rangeMinKey(val) {
            this._rangeMinKey = val;
        }

        get rangeMinKey() {
            return this._rangeMinKey;
        }

        set rangeMaxKey(val) {
            this._rangeMaxKey = val;
        }

        get rangeMaxKey() {
            return this._rangeMaxKey;
        }

        get length() {
            return this._length;
        }

        set length(val) {
            val = +val & ~0;
            if (this._length == val) {
            } else {
                while (this.list.length > val) {
                    var item = this.list.pop();
                    this._length = this._length - 1;
                    this._lengthValue.value = this._length;
                    this.dispatchWith(Event.REMOVE, item);
                }
                this.dispatchWith(Event.CHANGE, this);
            }
        }

        get lengthIntValue() {
            return this._lengthValue;
        }
    }

    for (var i = 0; i < 100000; i++) {
        Object.defineProperty(ArrayValue.prototype, "" + i, {
            get: function (index) {
                return function () {
                    return this.list[index];
                }
            }(i),
            set: function (index) {
                return function (val:any) {
                    this.setItemAt(index, val);
                }
            }(i),
            enumerable: true,
            configurable: true
        });
    }
}

////////////////////////////////black/flower/data/member/BooleanValue.ts/////////////////////////////////
namespace lib {
    export class BooleanValue extends Value {

        private __enumList:any[];

        constructor(init:any = false, enumList:any = null) {
            super();
            if (init === "false") {
                init = false;
            }
            this.__enumList = enumList;
            this.__old = this.__value = !!init;
        }

        $setValue(val:any) {
            if (val == "false") {
                val = false;
            }
            val = !!val;
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
            this.dispatchWith(Event.CHANGE, this, val);
            if (this.valueEqualResolve && val == this.equalValue) {
                var func = this.valueEqualResolve;
                this.valueEqualResolve = null;
                this.equalValue = null;
                func();
            }
        }

        $setEnumList(val:any) {
            if (this.__enumList == val) {
                return;
            }
            this.__enumList = val;
        }

        get enumList() {
            return this.__enumList;
        }

        set enumList(val) {
            this.$setEnumList(val);
        }
    }

}

////////////////////////////////black/flower/data/member/IntValue.ts/////////////////////////////////
namespace lib {
    export class IntValue extends Value {

        private __enumList: any[];
        private __valueCheck: any[];

        constructor(init = 0, enumList: any = null, checkDistort: boolean = null) {
            super(checkDistort);
            this.__old = this.__value = +init & ~0 || 0;
            this.__enumList = enumList;
            this.__valueCheck = [48];
        }

        $setValue(val: any) {
            val = +val & ~0 || 0;
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
            if (this.__checkDistort) {
                var str = val + "";
                this.__valueCheck.length = 0;
                for (var i = 0; i < str.length; i++) {
                    this.__valueCheck.push(str.charCodeAt(i));
                }
            }
            this.dispatchWith(Event.CHANGE, this, val);
            if (this.valueEqualResolve && val == this.equalValue) {
                var func = this.valueEqualResolve;
                this.valueEqualResolve = null;
                this.equalValue = null;
                func();
            }
        }

        $getValue() {
            if (this.__checkDistort) {
                var str = this.__value + "";
                var compare = "";
                for (var i = 0; i < this.__valueCheck.length; i++) {
                    compare += String.fromCharCode(this.__valueCheck[i]);
                }
                if (str != compare) {
                    this.dispatchWith(Event.DISTORT, this);
                    this.__value = parseFloat(compare);
                }
            }
            return this.__value;
        }

        $setEnumList(val:any) {
            if (this.__enumList == val) {
                return;
            }
            this.__enumList = val;
        }

        get enumList() {
            return this.__enumList;
        }

        set enumList(val) {
            this.$setEnumList(val);
        }
    }

}

////////////////////////////////black/flower/data/member/NumberValue.ts/////////////////////////////////
namespace lib {
    export class NumberValue extends Value {

        private __enumList: any[];
        private __precision: number;
        private __multiplier: number;
        private __valueCheck: any[];

        constructor(init = 0, enumList: any = null, checkDistort: any = null) {
            super(checkDistort);
            this.__enumList = enumList;
            this.__old = this.__value = +init || 0;
            this.__precision = 2;
            this.__multiplier = Math.pow(10, this.__precision);
            this.__valueCheck = [48];
        }

        $setValue(val: any) {
            val = +val || 0;
            if (val > 0) {
                var smallNumber = val - Math.floor(val);
                smallNumber = Math.floor(smallNumber * this.__multiplier) / this.__multiplier;
                val = Math.floor(val) + smallNumber;
            } else {
                val = -val;
                var smallNumber = val - Math.floor(val);
                smallNumber = Math.floor(smallNumber * this.__multiplier) / this.__multiplier;
                val = Math.floor(val) + smallNumber;
                val = -val;
            }
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
            if (this.__checkDistort) {
                var str = val + "";
                this.__valueCheck.length = 0;
                for (var i = 0; i < str.length; i++) {
                    this.__valueCheck.push(str.charCodeAt(i));
                }
            }
            this.dispatchWith(Event.CHANGE, this, val);
            if (this.valueEqualResolve && val == this.equalValue) {
                var func = this.valueEqualResolve;
                this.valueEqualResolve = null;
                this.equalValue = null;
                func();
            }
        }

        $getValue() {
            if (this.__checkDistort) {
                var str = this.__value + "";
                var compare = "";
                for (var i = 0; i < this.__valueCheck.length; i++) {
                    compare += String.fromCharCode(this.__valueCheck[i]);
                }
                if (str != compare) {
                    this.dispatchWith(Event.DISTORT, this);
                    this.__value = parseFloat(compare);
                }
            }
            return this.__value;
        }

        private $setEnumList(val: any) {
            if (this.__enumList == val) {
                return;
            }
            this.__enumList = val;
        }

        get enumList() {
            return this.__enumList;
        }

        set enumList(val) {
            this.$setEnumList(val);
        }

        /**
         * 设置精确到小数点后多少位
         * @param val
         */
        set precision(val) {
            this.__precision = val;
            this.__multiplier = Math.pow(10, this.__precision);
            this.$setValue(this.__value);
        }

        get precision() {
            return this.__precision;
        }
    }

}

////////////////////////////////black/flower/data/member/ObjectValue.ts/////////////////////////////////
namespace lib {
    /**
     * 定义 Data 时，如下关键字不能作为属性名称
     * `value
     * className
     * membersKey
     * dispose
     */
    export class ObjectValue extends Value {

        private __saveClass:any;
        private __nosave:any;
        private __className:StringValue;

        constructor(init:any = null) {
            super();
            this.__old = this.__value = {};
            if (init) {
                this.value = init;
            }
            this.__saveClass = {};
            this.__nosave = {};
        }

        $setMember(name:string, value:any) {
            var old = this.__value[name];
            this.__value[name] = value;
            this.dispatchWith(name, {
                "name": name,
                "old": old,
                "value": value
            });
        }

        $setMemberSaveClass(name:string, saveClass = false) {
            this.__saveClass[name] = saveClass;
        }

        $setMemberSaveFlag(name:string, save = false) {
            if (save == false) {
                this.__nosave[name] = true;
            } else {
                delete this.__nosave[name];
            }
        }

        hasMember(name:string) {
            return this.__value.hasOwnProperty(name);
        }

        getValue(name:string) {
            return this.__value[name];
        }

        setValue(name:string, value:any) {
            if (!this.__value.hasOwnProperty(name)) {
                sys.$error(3014, name);
                return;
            }
            if (value == null) {
                this.$setMember(name, null);
            } else {
                if (value && (!(value instanceof Value)) && typeof value == "object" && value.__className) {
                    value = DataManager.createData(value.__className, value);
                }
                if (value instanceof Value) {
                    this.$setMember(name, value);
                } else {
                    var val = this.__value[name];
                    var old = val;
                    if (val instanceof Value) {
                        val.value = value;
                    } else {
                        this.__value[name] = value;
                        this.dispatchWith(name, {
                            "name": name,
                            "old": old,
                            "value": value
                        });
                    }
                }
            }
        }

        /**
         * 从 Object 中读取数据
         * @param value
         */
        $setValue(val:any) {
            if (val == null) {
                sys.$error(3015);
                return;
            }
            var list = Object.keys(val);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var value = val[key];
                if (!this.__value.hasOwnProperty(key)) {
                    this.$setMember(key, value);
                } else {
                    this.setValue(key, value);
                }
            }
        }

        $getValue(saveClass = false) {
            var val = this.__value;
            var list = Object.keys(val);
            var config:any = {};
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if (this.__nosave[key]) {
                    continue;
                }
                var member = val[key];
                if (member instanceof Value) {
                    if (member instanceof ObjectValue) {
                        config[key] = member.$getValue(this.__saveClass[key]);
                    } else {
                        config[key] = member.value;
                    }
                } else {
                    config[key] = member;
                }
            }
            if (this.__className && saveClass) {
                config.__className = this.__className.value;
            }
            return config;
        }


        /**
         * 将数据转化成 Object
         */
        get value() {
            return this.$getValue();
        }

        set value(val) {
            this.$setValue(val);
        }

        get className() {
            return this.__className ? this.__className.value : "";
        }

        set className(val) {
            if (val) {
                this.__className = new StringValue(val);
            } else {
                this.__className = null;
            }
        }

        get membersKey() {
            return Object.keys(this.__value);
        }

        dispose() {
            var val = this.__value;
            var list = Object.keys(val);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if (val[key] instanceof Value) {
                    val[key].dispose();
                }
            }
            super.dispose();
        }
    }

}

////////////////////////////////black/flower/data/member/StringValue.ts/////////////////////////////////
namespace lib {
    export class StringValue extends Value {

        private __enumList:any;

        constructor(init = "", enumList:any = null) {
            super();
            this.__old = this.__value = "" + (init == null ? "" : init);
            this.__enumList = enumList;
        }

        $setValue(val:any) {
            val = "" + (val == null ? "" : val);
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
            this.dispatchWith(Event.CHANGE, this, val);
            if (this.valueEqualResolve && val == this.equalValue) {
                var func = this.valueEqualResolve;
                this.valueEqualResolve = null;
                this.equalValue = null;
                func();
            }
        }

        $setEnumList(val:any) {
            if (this.__enumList == val) {
                return;
            }
            this.__enumList = val;
        }

        get enumList() {
            return this.__enumList;
        }

        set enumList(val) {
            this.$setEnumList(val);
        }
    }

}

////////////////////////////////black/flower/data/member/UIntValue.ts/////////////////////////////////
namespace lib {
    export class UIntValue extends Value {

        private __enumList: any;
        private __valueCheck: any[];

        constructor(init = 0, enumList: any = null, checkDistort: boolean = null) {
            super(checkDistort);
            init = +init & ~0 || 0;
            if (init < 0) {
                init = 0;
            }
            this.__enumList = enumList;
            this.__old = this.__value = init;
            this.__valueCheck = [48];
        }

        $setValue(val: any) {
            val = +val & ~0 || 0;
            if (val < 0) {
                val = 0;
            }
            if (val == this.__value) {
                return;
            }
            this.__old = this.__value;
            this.__value = val;
            if (this.__checkDistort) {
                var str = val + "";
                this.__valueCheck.length = 0;
                for (var i = 0; i < str.length; i++) {
                    this.__valueCheck.push(str.charCodeAt(i));
                }
            }
            this.dispatchWith(Event.CHANGE, this, val);
            if (this.valueEqualResolve && val == this.equalValue) {
                var func = this.valueEqualResolve;
                this.valueEqualResolve = null;
                this.equalValue = null;
                func();
            }
        }

        $getValue() {
            if (this.__checkDistort) {
                var str = this.__value + "";
                var compare = "";
                for (var i = 0; i < this.__valueCheck.length; i++) {
                    compare += String.fromCharCode(this.__valueCheck[i]);
                }
                if (str != compare) {
                    this.dispatchWith(Event.DISTORT, this);
                    this.__value = parseFloat(compare);
                }
            }
            return this.__value;
        }

        $setEnumList(val: any) {
            if (this.__enumList == val) {
                return;
            }
            this.__enumList = val;
        }

        get enumList() {
            return this.__enumList;
        }

        set enumList(val) {
            this.$setEnumList(val);
        }
    }

}

////////////////////////////////black/flower/binding/Binding.ts/////////////////////////////////
namespace lib {

    export class Binding {

        singleValue: any;
        list: any;
        stmts: any;
        thisObj: any;
        property: any;
        content: any;
        checks: any[];
        hasDispose: boolean = false;

        constructor(thisObj: any, checks: any[], property: string, content: string) {
            this.thisObj = thisObj;
            this.checks = checks = checks || [];
            this.property = property;
            this.content = content;
            if (checks && content.search("data") != -1) {
                for (var i = 0; i < checks.length; i++) {
                    var display = checks[i];
                    if (display.id) {
                        if (!Binding.changeList[display.id]) {
                            Binding.changeList[display.id] = [];
                        }
                        Binding.changeList[display.id].push(this);
                    }
                }
            }
            this.__bind(thisObj, checks.concat(), property, content);
        }

        $reset() {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].removeListener(Event.CHANGE, this.update, this);
            }
            this.__bind(this.thisObj, this.checks.concat(), this.property, this.content);
        }

        __bind(thisObj: any, checks: any[], property: string, content: string) {
            this.list = [];
            this.stmts = [];
            this.singleValue = false;
            var i;
            if (checks == null) {
                checks = Binding.bindingChecks.concat();
            }
            else {
                for (i = 0; i < Binding.bindingChecks.length; i++) {
                    checks.push(Binding.bindingChecks[i]);
                }
            }
            checks.push(thisObj);
            var lastEnd = 0;
            var parseError = false;
            for (i = 0; i < content.length; i++) {
                if (content.charAt(i) == "{") {
                    for (let j:number = i + 1; j < content.length; j++) {
                        if (content.charAt(j) == "{") {
                            break;
                        }
                        if (content.charAt(j) == "}") {
                            var bindContent = content.slice(i + 1, j);
                            if (i == 0 && j == content.length - 1) {
                                this.singleValue = true;
                            }
                            if (lastEnd < i) {
                                this.stmts.push(content.slice(lastEnd, i));
                            }
                            lastEnd = j + 1;
                            var stmt = Compiler.parserExpr(bindContent, checks, {"this": thisObj}, {
                                "black": black,
                                "Tween": Tween,
                                "Ease": Ease,
                                "Math": Math
                            }, this.list, this);
                            if (stmt == null) {
                                parseError = true;
                                break;
                            }
                            this.stmts.push(stmt);
                            i = j;
                            break;
                        }
                    }
                }
            }
            if (parseError) {
                thisObj[property] = content;
                return;
            }
            if (lastEnd < content.length) {
                this.stmts.push(content.slice(lastEnd, content.length));
            }
            this.thisObj = thisObj;
            this.property = property;
            for (i = 0; i < this.list.length; i++) {
                for (let j = 0; j < this.list.length; j++) {
                    if (i != j && this.list[i] == this.list[j]) {
                        this.list.splice(j, 1);
                        i = -1;
                        break;
                    }
                }
            }
            for (i = 0; i < this.list.length; i++) {
                this.list[i].addListener(Event.CHANGE, this.update, this);
            }
            this.update();
        }

        $addValueListener(value: any) {
            value.addListener(Event.CHANGE, this.update, this);
        }

        $removeValueListener(value: any) {
            value.removeListener(Event.CHANGE, this.update, this);
        }

        update(value: any = null, old: any = null) {
            var value;
            if (this.singleValue) {
                try {
                    value = this.stmts[0].getValue();
                } catch (e) {
                    value = null;
                }
                this.thisObj[this.property] = value;
            }
            else {
                var str = "";
                for (var i = 0; i < this.stmts.length; i++) {
                    var expr = this.stmts[i];
                    if (expr instanceof Stmts) {
                        try {
                            str += expr.getValue();
                        } catch (e) {
                            str += "null";
                        }

                    } else {
                        str += expr;
                    }
                }
                this.thisObj[this.property] = str;
            }
        }

        dispose() {
            this.hasDispose = true;
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].removeListener(Event.CHANGE, this.update, this);
            }
        }

        static bindingChecks: any[] = [];

        static addBindingCheck(check: any) {
            for (var i = 0; i < Binding.bindingChecks.length; i++) {
                if (Binding.bindingChecks[i] == check) {
                    return;
                }
            }
            Binding.bindingChecks.push(check);
        }

        static changeList: any = {};

        static changeData(display: any) {
            var id = display.id;
            var list = Binding.changeList[id];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].$reset();
                }
            }
        }

        static removeChangeObject(display: any) {
            var id = display.id;
            delete Binding.changeList[id];
        }

        static clearBindingChecks() {
            Binding.bindingChecks = null
            Binding.changeList = [];
        }
    }

// Binding.addBindingCheck(window);
}

////////////////////////////////black/flower/binding/compiler/Compiler.ts/////////////////////////////////
namespace lib {
    export class Compiler {
        _scanner: any;
        _parser: any;

        constructor() {
            this._scanner = new Scanner();
            this._parser = new Parser();
        }

        parserExpr(content: string, checks: any, objects: any, classes: any, result: any, binding: any) {
            var scanner = new Scanner();
            var common: any = {
                "content": content,
                "objects": objects,
                "classes": classes,
                "checks": checks,
                "ids": {},
                "tokenValue": null,
                "scanner": this._scanner,
                "nodeStack": null,
                "bindList": [],
                "binding": binding
            };
            this._scanner.setCommonInfo(common);
            this._parser.setCommonInfo(common);
            this._parser.parser(content);
            if (common.parserError) {
                return null;
            }
            common.result = result;
            common.expr = common.newNode.expval;
            common.expr.checkPropertyBinding(common);
            return common.expr;
        }

        static ist:Compiler;

        static parserExpr(content:any, checks:any, objects:any, classes:any, result:any, binding:any) {
            if (!Compiler.ist) {
                Compiler.ist = new Compiler();
            }
            return Compiler.ist.parserExpr(content, checks, objects, classes, result, binding);
        }
    }
}

////////////////////////////////black/flower/binding/compiler/Parser.ts/////////////////////////////////
namespace lib {
    export class Parser {
        action: any;
        go: any;
        commonInfo: any;

        constructor() {
            this.action = ParserTable.action;
            this.go = ParserTable.go;
            this.commonInfo = null;
        }

        setCommonInfo(info: any) {
            this.commonInfo = info;
            this.commonInfo.tokenCount = 0;
        }

        parser(content: any) {
            var commonInfo = this.commonInfo;
            var scanner = this.commonInfo.scanner;
            scanner.setTokenContent(content);
            var token;
            commonInfo.lastTokenPos = 0;
            token = scanner.getNextToken();
            var newNode: any = {"type": "leaf", "token": token, "value": commonInfo.tokenValue};
            if (TokenType.TokenTrans[token])
                token = commonInfo.tokenValue;
            commonInfo.tokenCount++;
            if (token == null) {
                return null;
            }
            var state = 1;
            var stack = [state];
            var nodeStack: any[] = [];
            commonInfo.nodeStack = nodeStack;
            var i;
            var action;
            var popNodes;
            var commonDebug = {"file": content};
            while (true) {
                if (this.action[state][token] == undefined) {
                    sys.$error(3008, content, this.getFilePosInfo(content, commonInfo.lastTokenPos));
                    commonInfo.parserError = true;
                    return false;
                }
                action = this.action[state][token];
                if (action.a == 0) {
                    break;
                }
                else if (action.a == 1) {
                    popNodes = [];
                    i = action.c.exp;
                    while (i) {
                        stack.pop();
                        popNodes.push(nodeStack.pop());
                        i--;
                    }
                    popNodes.reverse();
                    commonInfo.newNode = {
                        "type": "node",
                        "create": action.c.id,
                        "nodes": popNodes,
                        "tokenPos": popNodes[0].tokenPos,
                        "debug": popNodes[0].debug
                    };
                    if (action.c.code) {
                        this.runProgrammer(action.c.id, commonInfo.newNode, popNodes);
                    }
                    state = stack[stack.length - 1];
                    state = this.go[state][action.c.head];
                    stack.push(state);
                    nodeStack.push(commonInfo.newNode);
                }
                else {
                    state = this.action[state][token].to;
                    stack.push(state);
                    nodeStack.push(newNode);
                    token = null;
                    newNode = null;
                }
                if (token == null && token != "$") {
                    commonInfo.lastTokenPos = commonInfo.tokenPos;
                    token = scanner.getNextToken();
                    commonInfo.tokenCount++;
                    if (token == null)
                        return false;
                    else
                        newNode = {
                            "type": "leaf",
                            "token": token,
                            "value": commonInfo.tokenValue,
                            "tokenPos": commonInfo.tokenPos,
                            "debug": commonDebug
                        };
                    if (TokenType.TokenTrans[token])
                        token = commonInfo.tokenValue;
                }
            }
            return true;
        }

        getFilePosInfo(content: any, pos: any) {
            var line = 1;
            var charPos = 1;
            for (var i = 0; i < content.length && pos > 0; i++) {
                charPos++;
                if (content.charCodeAt(i) == 13) {
                    if (content.charCodeAt(i + 1) == 10) {
                        i++;
                        pos--;
                    }
                    charPos = 1;
                    line++;
                }
                else if (content.charCodeAt(i + 1) == 10) {
                    if (content.charCodeAt(i) == 13) {
                        i++;
                        pos--;
                    }
                    charPos = 1;
                    line++;
                }
                pos--;
            }
            return "第" + line + "行，第" + charPos + "个字符(后面10个):" + content.slice(charPos, charPos + 10);
        }

        runProgrammer(id: any, node: any, nodes: any) {
            var common = this.commonInfo;
            switch (id) {
                case 1:
                    node.expval = nodes[0].expval;
                    break;
                case 3:
                    node.expval = new Stmts();
                    node.expval.addStmt(nodes[0].expval);
                    break;
                case 4:
                    node.expval = new ExprStmt(nodes[0].expval);
                    break;
                case 5:
                    node.expval = new DeviceStmt();
                    break;
                case 46:
                    node.expval = new Expr("Atr", nodes[0].expval);
                    break;
                case 47:
                case 67:
                    node.expval = new Expr("int", nodes[0].value);
                    break;
                case 48:
                case 68:
                    node.expval = new Expr("0xint", nodes[0].value);
                    break;
                case 49:
                case 69:
                    node.expval = new Expr("number", nodes[0].value);
                    break;
                case 50:
                case 70:
                    node.expval = new Expr("string", nodes[0].value);
                    break;
                case 55:
                    node.expval = new ExprAtr();
                    node.expval.addItem(new ExprAtrItem("string", nodes[0].value));
                    break;
                case 51:
                    node.expval = new Expr("boolean", "true");
                    break;
                case 52:
                    node.expval = new Expr("boolean", "false");
                    break;
                case 53:
                    node.expval = new Expr("null");
                    break;
                case 56:
                    node.expval = new ExprAtr();
                    node.expval.addItem(new ExprAtrItem("id", nodes[0].value.name));
                    break;
                case 57:
                    node.expval = new ExprAtr();
                    node.expval.addItem(new ExprAtrItem("object", nodes[0].expval));
                    break;
                case 2:
                    node.expval = nodes[1].expval;
                    node.expval.addStmtAt(nodes[0].expval, 0);
                    break;
                case 6:
                    node.expval = new Expr("-a", nodes[1].expval);
                    break;
                case 7:
                    node.expval = new Expr("+a", nodes[1].expval);
                    break;
                case 8:
                    node.expval = new Expr("!", nodes[1].expval);
                    break;
                case 27:
                    node.expval = new Expr("~", nodes[1].expval);
                    break;
                case 60:
                    node.expval = nodes[0].expval;
                    node.expval.addItem(new ExprAtrItem("call", nodes[1].expval));
                    break;
                case 61:
                    node.expval = new ExprAtr();
                    node.expval.addItem(new ExprAtrItem("id", nodes[1].value.name, true));
                    break;
                case 66:
                    node.expval = new Expr("string", nodes[0].value.name);
                    break;
                case 84:
                case 62:
                    node.expval = new ObjectAtr(nodes.length == 2 ? [] : nodes[1].expval);
                    break;
                case 13:
                    node.expval = new Expr("-", nodes[0].expval, nodes[2].expval);
                    break;
                case 12:
                    node.expval = new Expr("+", nodes[0].expval, nodes[2].expval);
                    break;
                case 9:
                    node.expval = new Expr("*", nodes[0].expval, nodes[2].expval);
                    break;
                case 10:
                    node.expval = new Expr("/", nodes[0].expval, nodes[2].expval);
                    break;
                case 11:
                    node.expval = new Expr("%", nodes[0].expval, nodes[2].expval);
                    break;
                case 14:
                    node.expval = new Expr("<<", nodes[0].expval, nodes[2].expval);
                    break;
                case 15:
                    node.expval = new Expr(">>", nodes[0].expval, nodes[2].expval);
                    break;
                case 16:
                    node.expval = new Expr("<<<", nodes[0].expval, nodes[2].expval);
                    break;
                case 17:
                    node.expval = new Expr(">>>", nodes[0].expval, nodes[2].expval);
                    break;
                case 18:
                    node.expval = new Expr(">", nodes[0].expval, nodes[2].expval);
                    break;
                case 19:
                    node.expval = new Expr("<", nodes[0].expval, nodes[2].expval);
                    break;
                case 32:
                    node.expval = new Expr("=", nodes[0].expval, nodes[2].expval);
                    break;
                case 26:
                    node.expval = new Expr("&", nodes[0].expval, nodes[2].expval);
                    break;
                case 28:
                    node.expval = new Expr("^", nodes[0].expval, nodes[2].expval);
                    break;
                case 29:
                    node.expval = new Expr("|", nodes[0].expval, nodes[2].expval);
                    break;
                case 30:
                    node.expval = new Expr("&&", nodes[0].expval, nodes[2].expval);
                    break;
                case 31:
                    node.expval = new Expr("||", nodes[0].expval, nodes[2].expval);
                    break;
                case 54:
                    node.expval = new ExprAtr();
                    node.expval.addItem(new ExprAtrItem("()", nodes[1].expval));
                    break;
                case 73:
                    node.expval = new CallParams();
                    node.expval.addParam(nodes[0].expval);
                    break;
                case 85:
                case 71:
                    node.expval = nodes.length == 2 ? new CallParams() : nodes[1].expval;
                    break;
                case 58:
                    node.expval = nodes[0].expval;
                    node.expval.addItem(new ExprAtrItem(".", nodes[2].value.name));
                    break;
                case 38:
                    node.expval = new Expr("-=", nodes[0].expval, nodes[3].expval);
                    break;
                case 37:
                    node.expval = new Expr("+=", nodes[0].expval, nodes[3].expval);
                    break;
                case 25:
                    node.expval = new Expr("!=", nodes[0].expval, nodes[3].expval);
                    break;
                case 33:
                    node.expval = new Expr("*=", nodes[0].expval, nodes[3].expval);
                    break;
                case 34:
                    node.expval = new Expr("/=", nodes[0].expval, nodes[3].expval);
                    break;
                case 35:
                    node.expval = new Expr("%=", nodes[0].expval, nodes[3].expval);
                    break;
                case 40:
                    node.expval = new Expr("<<=", nodes[0].expval, nodes[3].expval);
                    break;
                case 41:
                    node.expval = new Expr(">>=", nodes[0].expval, nodes[3].expval);
                    break;
                case 20:
                    node.expval = new Expr(">=", nodes[0].expval, nodes[3].expval);
                    break;
                case 21:
                    node.expval = new Expr("<=", nodes[0].expval, nodes[3].expval);
                    break;
                case 22:
                    node.expval = new Expr("==", nodes[0].expval, nodes[3].expval);
                    break;
                case 36:
                    node.expval = new Expr("&=", nodes[0].expval, nodes[3].expval);
                    break;
                case 42:
                    node.expval = new Expr("^=", nodes[0].expval, nodes[3].expval);
                    break;
                case 43:
                    node.expval = new Expr("|=", nodes[0].expval, nodes[3].expval);
                    break;
                case 39:
                    node.expval = new Expr("||=", nodes[0].expval, nodes[3].expval);
                    break;
                case 86:
                case 72:
                    node.expval = nodes[2].expval;
                    node.expval.addParamAt(nodes[0].expval, 0);
                    break;
                case 59:
                    node.expval = nodes[0].expval;
                    node.expval.addItem(new ExprAtrItem(".", nodes[3].value.name, true));
                    break;
                case 64:
                    node.expval = [[nodes[0].expval, nodes[2].expval]];
                    break;
                case 24:
                    node.expval = new Expr("!==", nodes[0].expval, nodes[4].expval);
                    break;
                case 23:
                    node.expval = new Expr("===", nodes[0].expval, nodes[4].expval);
                    break;
                case 44:
                    node.expval = new Expr("?:", nodes[0].expval, nodes[2].expval, nodes[4].expval);
                    break;
                case 87:
                case 63:
                    node.expval = [[nodes[0].expval, nodes[2].expval]];
                    node.expval = node.expval.concat(nodes.length == 4 ? [null] : nodes[4].expval);
                    break;
                case 45:
                    node.expval = new Expr("spfor", nodes[2].expval, nodes[4].expval);
                    break;
            }
        }

    }
}

////////////////////////////////black/flower/binding/compiler/ParserTable.ts/////////////////////////////////
namespace lib {
	export class ParserTable
    {
        static  action = {1:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},",":{"a":2,"to":13},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24},";":{"a":2,"to":25}},2:{"$":{"a":1,"c":{"id":1,"head":"start","code":true,"exp":1}}},3:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},",":{"a":2,"to":13},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24},";":{"a":2,"to":25},"$":{"a":1,"c":{"id":3,"head":"stmts","code":true,"exp":1}}},4:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"for":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"(":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"CString":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"id":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"{":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"@":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"true":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"false":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"null":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},";":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},",":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}},"$":{"a":1,"c":{"id":4,"head":"stmt","code":true,"exp":1}}},5:{"-":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"+":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"!":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"~":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"for":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"(":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"CString":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"id":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"{":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"@":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"true":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"false":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"null":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},";":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},",":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}},"$":{"a":1,"c":{"id":5,"head":"stmt","code":true,"exp":1}}},6:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},7:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},8:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},9:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},10:{"(":{"a":2,"to":51}},11:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},12:{"(":{"a":2,"to":53},".":{"a":2,"to":54},"-":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":46,"head":"expr","code":true,"exp":1}}},13:{"-":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"+":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"!":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"~":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"for":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"(":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"CString":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"id":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"{":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"@":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"CInt":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"OXCInt":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"CNumber":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"true":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"false":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"null":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},";":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},",":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}},"$":{"a":1,"c":{"id":76,"head":"device","code":false,"exp":1}}},14:{"-":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":47,"head":"expr","code":true,"exp":1}}},15:{"-":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":48,"head":"expr","code":true,"exp":1}}},16:{"-":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":49,"head":"expr","code":true,"exp":1}}},17:{"-":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":50,"head":"expr","code":true,"exp":1}},".":{"a":1,"c":{"id":55,"head":"atr","code":true,"exp":1}}},18:{"-":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":51,"head":"expr","code":true,"exp":1}}},19:{"-":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":52,"head":"expr","code":true,"exp":1}}},20:{"-":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"+":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"!":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"~":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"for":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"(":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"id":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"{":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"@":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"true":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"false":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"null":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},";":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},",":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"$":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"*":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"/":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"%":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},">>":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},">":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"<":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"=":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"&":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"^":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"|":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"||":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"?":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},")":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},":":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}},"}":{"a":1,"c":{"id":53,"head":"expr","code":true,"exp":1}}},21:{"-":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"+":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"!":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"~":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"for":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"(":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"id":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"{":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"@":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"true":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"false":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"null":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},";":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},",":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"$":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"*":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"/":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"%":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},">>":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},">":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"<":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"=":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"&":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"^":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"|":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"||":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"?":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},".":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},")":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},":":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}},"}":{"a":1,"c":{"id":56,"head":"atr","code":true,"exp":1}}},22:{"-":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"+":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"!":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"~":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"for":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"(":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"CString":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"id":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"{":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"@":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"CInt":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"OXCInt":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"CNumber":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"true":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"false":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"null":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},";":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},",":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"$":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"*":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"/":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"%":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"<<":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},">>":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"<<<":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},">>>":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},">":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"<":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"=":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"&":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"^":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"|":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"&&":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"||":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"?":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},".":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},")":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},":":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}},"}":{"a":1,"c":{"id":57,"head":"atr","code":true,"exp":1}}},23:{"id":{"a":2,"to":56}},24:{"CInt":{"a":2,"to":57},"OXCInt":{"a":2,"to":58},"CNumber":{"a":2,"to":59},"CString":{"a":2,"to":60},"id":{"a":2,"to":61},"}":{"a":2,"to":63}},25:{"-":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"+":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"!":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"~":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"for":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"(":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"CString":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"id":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"{":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"@":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"CInt":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"OXCInt":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"CNumber":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"true":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"false":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"null":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},";":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},",":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}},"$":{"a":1,"c":{"id":75,"head":"device","code":false,"exp":1}}},26:{"$":{"a":0}},27:{"$":{"a":1,"c":{"id":2,"head":"stmts","code":true,"exp":2}}},28:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":66},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},29:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":68},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},30:{"=":{"a":2,"to":69}},31:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":71},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},32:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":73},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},33:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":75},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},34:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":77},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},35:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":79},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},36:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},37:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},38:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":83},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},39:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":85},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},40:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":87},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},41:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":89},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},42:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":91},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},43:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":93},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},44:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},45:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":96},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},46:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},47:{"-":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"+":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"!":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"*":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"/":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"%":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},">>":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},">":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"<":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"=":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"&":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"^":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"|":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"||":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"?":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"~":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"for":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"(":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"id":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"{":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"@":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"true":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"false":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"null":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},";":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},",":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"$":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},")":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},":":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}},"}":{"a":1,"c":{"id":6,"head":"expr","code":true,"exp":2}}},48:{"-":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"+":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"!":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"*":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"/":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"%":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},">>":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},">":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"<":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"=":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"&":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"^":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"|":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"||":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"?":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"~":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"for":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"(":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"id":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"{":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"@":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"true":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"false":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"null":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},";":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},",":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"$":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},")":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},":":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}},"}":{"a":1,"c":{"id":7,"head":"expr","code":true,"exp":2}}},49:{"-":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"+":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"!":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"*":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"/":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"%":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},">>":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},">":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"<":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"=":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"&":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"^":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"|":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"||":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"?":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"~":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"for":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"(":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"id":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"{":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"@":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"true":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"false":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"null":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},";":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},",":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"$":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},")":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},":":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}},"}":{"a":1,"c":{"id":8,"head":"expr","code":true,"exp":2}}},50:{"-":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"+":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"!":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"*":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"/":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"%":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},">>":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},">":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"<":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"=":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"&":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"^":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"|":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"||":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"?":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"~":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"for":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"(":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"id":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"{":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"@":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"true":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"false":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"null":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},";":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},",":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"$":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},")":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},":":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}},"}":{"a":1,"c":{"id":27,"head":"expr","code":true,"exp":2}}},51:{"(":{"a":2,"to":11},"CString":{"a":2,"to":99},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},52:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},")":{"a":2,"to":100}},53:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},")":{"a":2,"to":102},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},54:{"id":{"a":2,"to":104},"@":{"a":2,"to":105}},55:{"-":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"+":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"!":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"~":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"for":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"(":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"id":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"{":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"@":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"true":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"false":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"null":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},";":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},",":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"$":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"*":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"/":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"%":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},">>":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},">":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"<":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"=":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"&":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"^":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"|":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"||":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"?":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},".":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},")":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},":":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}},"}":{"a":1,"c":{"id":60,"head":"atr","code":true,"exp":2}}},56:{"-":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"+":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"!":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"~":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"for":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"(":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"CString":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"id":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"{":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"@":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"true":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"false":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"null":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},";":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},",":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"$":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"*":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"/":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"%":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"<<":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},">>":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},">>>":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},">":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"<":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"=":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"&":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"^":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"|":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"&&":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"||":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"?":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},".":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},")":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},":":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}},"}":{"a":1,"c":{"id":61,"head":"atr","code":true,"exp":2}}},57:{":":{"a":1,"c":{"id":67,"head":"objectKey","code":true,"exp":1}}},58:{":":{"a":1,"c":{"id":68,"head":"objectKey","code":true,"exp":1}}},59:{":":{"a":1,"c":{"id":69,"head":"objectKey","code":true,"exp":1}}},60:{":":{"a":1,"c":{"id":70,"head":"objectKey","code":true,"exp":1}}},61:{":":{"a":1,"c":{"id":66,"head":"objectKey","code":true,"exp":1}}},62:{"}":{"a":2,"to":106}},63:{"-":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"+":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"!":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"~":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"for":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"(":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"CString":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"id":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"{":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"@":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"true":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"false":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"null":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},";":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},",":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"$":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"*":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"/":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"%":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"<<":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},">>":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},">>>":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},">":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"<":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"=":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"&":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"^":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"|":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"&&":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"||":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"?":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},".":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},")":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},":":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}},"}":{"a":1,"c":{"id":84,"head":"objValue","code":true,"exp":2}}},64:{":":{"a":2,"to":107}},65:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":13,"head":"expr","code":true,"exp":3}}},66:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},67:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":12,"head":"expr","code":true,"exp":3}}},68:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},69:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":111},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},70:{"-":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"+":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"!":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":9,"head":"expr","code":true,"exp":3}}},71:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},72:{"-":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"+":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"!":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":10,"head":"expr","code":true,"exp":3}}},73:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},74:{"-":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"+":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"!":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":11,"head":"expr","code":true,"exp":3}}},75:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},76:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":14,"head":"expr","code":true,"exp":3}}},77:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},78:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":15,"head":"expr","code":true,"exp":3}}},79:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},80:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":16,"head":"expr","code":true,"exp":3}}},81:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":17,"head":"expr","code":true,"exp":3}}},82:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":18,"head":"expr","code":true,"exp":3}}},83:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},84:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":19,"head":"expr","code":true,"exp":3}}},85:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},86:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":32,"head":"expr","code":true,"exp":3}}},87:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"=":{"a":2,"to":120},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},88:{"-":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"+":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"!":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"*":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"/":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"%":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"<<":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},">>":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},">":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"<":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"=":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"&":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"^":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"|":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":26,"head":"expr","code":true,"exp":3}}},89:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},90:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":28,"head":"expr","code":true,"exp":3}}},91:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},92:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"||":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":29,"head":"expr","code":true,"exp":3}}},93:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},94:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"?":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":30,"head":"expr","code":true,"exp":3}}},95:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"~":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"for":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"(":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"id":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"{":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"@":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"true":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"false":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"null":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},";":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},",":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"$":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},")":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},":":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}},"}":{"a":1,"c":{"id":31,"head":"expr","code":true,"exp":3}}},96:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},97:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},":":{"a":2,"to":125}},98:{"(":{"a":2,"to":53},",":{"a":2,"to":126},".":{"a":2,"to":54}},99:{",":{"a":1,"c":{"id":55,"head":"atr","code":true,"exp":1}},".":{"a":1,"c":{"id":55,"head":"atr","code":true,"exp":1}},"(":{"a":1,"c":{"id":55,"head":"atr","code":true,"exp":1}}},100:{"-":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"+":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"!":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"~":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"for":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"(":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"id":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"{":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"@":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"true":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"false":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"null":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},";":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},",":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"$":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"*":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"/":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"%":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"<<":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},">>":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},">":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"<":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"=":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"&":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"^":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"|":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"||":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"?":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},".":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},")":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},":":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}},"}":{"a":1,"c":{"id":54,"head":"atr","code":true,"exp":3}}},101:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},",":{"a":2,"to":127},")":{"a":1,"c":{"id":73,"head":"callParams","code":true,"exp":1}}},102:{"-":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"+":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"!":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"~":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"for":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"(":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"CString":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"id":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"{":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"@":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"CInt":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"OXCInt":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"CNumber":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"true":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"false":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"null":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},";":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},",":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"$":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"*":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"/":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"%":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"<<":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},">>":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"<<<":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},">>>":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},">":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"<":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"=":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"&":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"^":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"|":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"&&":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"||":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"?":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},".":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},")":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},":":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}},"}":{"a":1,"c":{"id":85,"head":"funcCallEnd","code":true,"exp":2}}},103:{")":{"a":2,"to":128}},104:{"-":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"+":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"!":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"~":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"for":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"(":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"CString":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"id":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"{":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"@":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"true":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"false":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"null":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},";":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},",":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"$":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"*":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"/":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"%":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"<<":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},">>":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},">>>":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},">":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"<":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"=":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"&":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"^":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"|":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"&&":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"||":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"?":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},".":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},")":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},":":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}},"}":{"a":1,"c":{"id":58,"head":"atr","code":true,"exp":3}}},105:{"id":{"a":2,"to":129}},106:{"-":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"+":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"!":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"~":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"for":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"(":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"CString":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"id":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"{":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"@":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"true":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"false":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"null":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},";":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},",":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"$":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"*":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"/":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"%":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"<<":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},">>":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},">>>":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},">":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"<":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"=":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"&":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"^":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"|":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"&&":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"||":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"?":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},".":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},")":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},":":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}},"}":{"a":1,"c":{"id":62,"head":"objValue","code":true,"exp":3}}},107:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},108:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":38,"head":"expr","code":true,"exp":4}}},109:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":37,"head":"expr","code":true,"exp":4}}},110:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"|":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"&&":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"||":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"?":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"~":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":25,"head":"expr","code":true,"exp":4}}},111:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},112:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":33,"head":"expr","code":true,"exp":4}}},113:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":34,"head":"expr","code":true,"exp":4}}},114:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":35,"head":"expr","code":true,"exp":4}}},115:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":40,"head":"expr","code":true,"exp":4}}},116:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":41,"head":"expr","code":true,"exp":4}}},117:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"|":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"&&":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"||":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"?":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"~":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":20,"head":"expr","code":true,"exp":4}}},118:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"|":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"&&":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"||":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"?":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"~":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":21,"head":"expr","code":true,"exp":4}}},119:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"|":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"&&":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"||":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"?":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"~":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":22,"head":"expr","code":true,"exp":4}}},120:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},121:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":36,"head":"expr","code":true,"exp":4}}},122:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":42,"head":"expr","code":true,"exp":4}}},123:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":43,"head":"expr","code":true,"exp":4}}},124:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},"~":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"for":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"(":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"id":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"{":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"@":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"true":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"false":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"null":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},";":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},",":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"$":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},")":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},":":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}},"}":{"a":1,"c":{"id":39,"head":"expr","code":true,"exp":4}}},125:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},126:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},127:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24},")":{"a":1,"c":{"id":86,"head":"callParams","code":true,"exp":2}}},128:{"-":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"+":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"!":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"~":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"for":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"(":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"CString":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"id":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"{":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"@":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"CInt":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"OXCInt":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"CNumber":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"true":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"false":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"null":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},";":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},",":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"$":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"*":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"/":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"%":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"<<":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},">>":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"<<<":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},">>>":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},">":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"<":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"=":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"&":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"^":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"|":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"&&":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"||":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"?":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},".":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},")":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},":":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}},"}":{"a":1,"c":{"id":71,"head":"funcCallEnd","code":true,"exp":3}}},129:{"-":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"+":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"!":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"~":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"for":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"(":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"CString":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"id":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"{":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"@":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"CInt":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"OXCInt":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"CNumber":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"true":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"false":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"null":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},";":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},",":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"$":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"*":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"/":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"%":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"<<":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},">>":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"<<<":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},">>>":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},">":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"<":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"=":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"&":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"^":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"|":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"&&":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"||":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"?":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},".":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},")":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},":":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}},"}":{"a":1,"c":{"id":59,"head":"atr","code":true,"exp":4}}},130:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},",":{"a":2,"to":137},"}":{"a":1,"c":{"id":64,"head":"objValueItems","code":true,"exp":3}}},131:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"|":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"&&":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"||":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"?":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"~":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"for":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"(":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"CString":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"id":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"{":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"@":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"CInt":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"OXCInt":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"CNumber":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"true":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"false":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"null":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},";":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},",":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"$":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},")":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},":":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}},"}":{"a":1,"c":{"id":24,"head":"expr","code":true,"exp":5}}},132:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"|":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"&&":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"||":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"?":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"~":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"for":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"(":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"CString":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"id":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"{":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"@":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"CInt":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"OXCInt":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"CNumber":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"true":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"false":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"null":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},";":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},",":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"$":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},")":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},":":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}},"}":{"a":1,"c":{"id":23,"head":"expr","code":true,"exp":5}}},133:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"~":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"for":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"(":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"CString":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"id":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"{":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"@":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"CInt":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"OXCInt":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"CNumber":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"true":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"false":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"null":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},";":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},",":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"$":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},")":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},":":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}},"}":{"a":1,"c":{"id":44,"head":"expr","code":true,"exp":5}}},134:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},")":{"a":2,"to":138}},135:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},",":{"a":2,"to":127},")":{"a":1,"c":{"id":73,"head":"callParams","code":true,"exp":1}}},136:{")":{"a":1,"c":{"id":72,"head":"callParams","code":true,"exp":3}}},137:{"CInt":{"a":2,"to":57},"OXCInt":{"a":2,"to":58},"CNumber":{"a":2,"to":59},"CString":{"a":2,"to":60},"id":{"a":2,"to":61},"}":{"a":1,"c":{"id":87,"head":"objValueItems","code":true,"exp":4}}},138:{"-":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"+":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"!":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"~":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"for":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"(":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"CString":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"id":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"{":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"@":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"CInt":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"OXCInt":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"CNumber":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"true":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"false":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"null":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},";":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},",":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"$":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"*":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"/":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"%":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"<<":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},">>":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"<<<":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},">>>":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},">":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"<":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"=":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"&":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"^":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"|":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"&&":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"||":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"?":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},")":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},":":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}},"}":{"a":1,"c":{"id":45,"head":"expr","code":true,"exp":6}}},139:{"}":{"a":1,"c":{"id":63,"head":"objValueItems","code":true,"exp":5}}},140:{":":{"a":2,"to":141}},141:{"-":{"a":2,"to":6},"+":{"a":2,"to":7},"!":{"a":2,"to":8},"~":{"a":2,"to":9},"for":{"a":2,"to":10},"(":{"a":2,"to":11},"CInt":{"a":2,"to":14},"OXCInt":{"a":2,"to":15},"CNumber":{"a":2,"to":16},"CString":{"a":2,"to":17},"true":{"a":2,"to":18},"false":{"a":2,"to":19},"null":{"a":2,"to":20},"id":{"a":2,"to":21},"@":{"a":2,"to":23},"{":{"a":2,"to":24}},142:{"-":{"a":2,"to":28},"+":{"a":2,"to":29},"!":{"a":2,"to":30},"*":{"a":2,"to":31},"/":{"a":2,"to":32},"%":{"a":2,"to":33},"<<":{"a":2,"to":34},">>":{"a":2,"to":35},"<<<":{"a":2,"to":36},">>>":{"a":2,"to":37},">":{"a":2,"to":38},"<":{"a":2,"to":39},"=":{"a":2,"to":40},"&":{"a":2,"to":41},"^":{"a":2,"to":42},"|":{"a":2,"to":43},"&&":{"a":2,"to":44},"||":{"a":2,"to":45},"?":{"a":2,"to":46},",":{"a":2,"to":137},"}":{"a":1,"c":{"id":64,"head":"objValueItems","code":true,"exp":3}}}};
        static  go = {1:{"stmts":2,"stmt":3,"expr":4,"device":5,"atr":12,"objValue":22,"start":26},2:{},3:{"stmts":27,"stmt":3,"expr":4,"device":5,"atr":12,"objValue":22},4:{},5:{},6:{"expr":47,"atr":12,"objValue":22},7:{"expr":48,"atr":12,"objValue":22},8:{"expr":49,"atr":12,"objValue":22},9:{"expr":50,"atr":12,"objValue":22},10:{},11:{"expr":52,"atr":12,"objValue":22},12:{"funcCallEnd":55},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},21:{},22:{},23:{},24:{"objValueItems":62,"objectKey":64},25:{},26:{},27:{},28:{"expr":65,"atr":12,"objValue":22},29:{"expr":67,"atr":12,"objValue":22},30:{},31:{"expr":70,"atr":12,"objValue":22},32:{"expr":72,"atr":12,"objValue":22},33:{"expr":74,"atr":12,"objValue":22},34:{"expr":76,"atr":12,"objValue":22},35:{"expr":78,"atr":12,"objValue":22},36:{"expr":80,"atr":12,"objValue":22},37:{"expr":81,"atr":12,"objValue":22},38:{"expr":82,"atr":12,"objValue":22},39:{"expr":84,"atr":12,"objValue":22},40:{"expr":86,"atr":12,"objValue":22},41:{"expr":88,"atr":12,"objValue":22},42:{"expr":90,"atr":12,"objValue":22},43:{"expr":92,"atr":12,"objValue":22},44:{"expr":94,"atr":12,"objValue":22},45:{"expr":95,"atr":12,"objValue":22},46:{"expr":97,"atr":12,"objValue":22},47:{},48:{},49:{},50:{},51:{"atr":98,"objValue":22},52:{},53:{"expr":101,"atr":12,"objValue":22,"callParams":103},54:{},55:{},56:{},57:{},58:{},59:{},60:{},61:{},62:{},63:{},64:{},65:{},66:{"expr":108,"atr":12,"objValue":22},67:{},68:{"expr":109,"atr":12,"objValue":22},69:{"expr":110,"atr":12,"objValue":22},70:{},71:{"expr":112,"atr":12,"objValue":22},72:{},73:{"expr":113,"atr":12,"objValue":22},74:{},75:{"expr":114,"atr":12,"objValue":22},76:{},77:{"expr":115,"atr":12,"objValue":22},78:{},79:{"expr":116,"atr":12,"objValue":22},80:{},81:{},82:{},83:{"expr":117,"atr":12,"objValue":22},84:{},85:{"expr":118,"atr":12,"objValue":22},86:{},87:{"expr":119,"atr":12,"objValue":22},88:{},89:{"expr":121,"atr":12,"objValue":22},90:{},91:{"expr":122,"atr":12,"objValue":22},92:{},93:{"expr":123,"atr":12,"objValue":22},94:{},95:{},96:{"expr":124,"atr":12,"objValue":22},97:{},98:{"funcCallEnd":55},99:{},100:{},101:{},102:{},103:{},104:{},105:{},106:{},107:{"expr":130,"atr":12,"objValue":22},108:{},109:{},110:{},111:{"expr":131,"atr":12,"objValue":22},112:{},113:{},114:{},115:{},116:{},117:{},118:{},119:{},120:{"expr":132,"atr":12,"objValue":22},121:{},122:{},123:{},124:{},125:{"expr":133,"atr":12,"objValue":22},126:{"expr":134,"atr":12,"objValue":22},127:{"expr":135,"atr":12,"objValue":22,"callParams":136},128:{},129:{},130:{},131:{},132:{},133:{},134:{},135:{},136:{},137:{"objValueItems":139,"objectKey":140},138:{},139:{},140:{},141:{"expr":142,"atr":12,"objValue":22},142:{}};
    }
}

////////////////////////////////black/flower/binding/compiler/Scanner.ts/////////////////////////////////
namespace lib {
    export class Scanner {
        start:any;
        moves:any;
        endInfos:any;
        befores:any;
        inputs:any;
        tokenPos:any;
        tokenContent:any;
        tokenContentLength:any;
        commonInfo:any;
        lastToken:any;

        constructor() {
            this.start = ScannerTable.start;
            this.moves = ScannerTable.moves;
            this.endInfos = ScannerTable.endInfos;
            this.befores = ScannerTable.befores;
            this.inputs = ScannerTable.inputs;
            this.tokenPos = 0;
            this.tokenContent = null;
            this.tokenContentLength = 0;
            this.commonInfo = null;
            this.lastToken = null;
        }

        setCommonInfo(info:any) {
            this.commonInfo = info;
        }

        setTokenContent(content:any) {
            content += "\r\n";
            this.tokenContent = content;
            this.tokenPos = 0;
            this.tokenContentLength = content.length;
            this.lastToken = null;
        }

        getNextToken():any {
            if (this.tokenContentLength == 0) {
                return null;
            }
            var recordPos = this.tokenPos;
            var ch;
            var findStart = this.tokenPos;
            var state = this.start;
            var receiveStack = [];
            var lastEndPos = -1;
            var lastEndState = -1;
            while (this.tokenPos < this.tokenContentLength) {
                ch = this.tokenContent.charCodeAt(this.tokenPos);
                if (ch == 92 && this.tokenPos < this.tokenContent.length) {
                    this.tokenPos++;
                }
                if (this.inputs[ch] == undefined) {
                    ch = 20013;
                }
                if (this.moves[state] == undefined || this.moves[state][ch] == undefined)
                    break;
                state = this.moves[state][ch];
                if (this.endInfos[state] != undefined) {
                    lastEndPos = this.tokenPos;
                    lastEndState = state;
                    receiveStack.push([this.tokenPos, state]);
                    if (this.endInfos[state] == true)
                        break;
                }
                this.tokenPos++;
            }
            var last;
            if (receiveStack.length) {
                while (receiveStack.length) {
                    last = receiveStack.pop();
                    lastEndPos = last[0];
                    lastEndState = last[1];
                    if (this.lastToken == null || this.befores[lastEndState] == undefined || (this.befores[lastEndState] != undefined && this.befores[lastEndState][this.lastToken] != undefined)) {
                        this.tokenPos = lastEndPos + 1;
                        var str = this.tokenContent.slice(findStart, this.tokenPos);
                        var result = this.getTokenComplete(lastEndState, str);
                        if (result == null)
                            return this.getNextToken();
                        this.commonInfo.tokenPos = findStart;
                        if (TokenType.TokenTrans[result] != undefined)
                            this.lastToken = this.commonInfo.tokenValue;
                        else
                            this.lastToken = result;
                        return result;
                    }
                }
            }
            if (this.tokenPos < this.tokenContent.length) {
            }
            else {
                this.commonInfo.tokenValue = null;
                return TokenType.Type.endSign;
            }
            return null;
        }

        getFilePosInfo(content:any, pos:any) {
            var line = 1;
            var charPos = 1;
            for (var i = 0; i < content.length && pos > 0; i++) {
                charPos++;
                if (content.charCodeAt(i) == 13) {
                    if (content.charCodeAt(i + 1) == 10) {
                        i++;
                        pos--;
                    }
                    charPos = 1;
                    line++;
                }
                else if (content.charCodeAt(i + 1) == 10) {
                    if (content.charCodeAt(i) == 13) {
                        i++;
                        pos--;
                    }
                    charPos = 1;
                    line++;
                }
                pos--;
            }
            return "第" + line + "行，第" + charPos + "个字符(后面10个):" + content.slice(charPos, charPos + 10);
        }

        installId(commonInfo:any, content:any) {
            if (commonInfo.ids[content]) {
                return commonInfo.ids[content];
            }
            var id = {"name": content};
            commonInfo.ids[content] = id;
            return id;
        }

        getTokenComplete(token:any, content:any) {
            this.commonInfo.tokenValue = null;
            switch (token)
            {
                case 1:return null;
                case 39:return TokenType.Type["null"];
                case 27:return TokenType.Type["as"];
                case 28:return TokenType.Type["is"];
                case 40:return TokenType.Type["true"];
                case 41:return TokenType.Type["false"];
                case 36:return TokenType.Type["for"];
                case 3:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 4:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 5:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 6:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 7:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 8:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 9:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 10:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 11:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 12:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 13:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 14:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 15:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 16:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 31:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 32:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 19:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 17:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 18:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 20:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 30:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 29:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 38:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 37:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 21:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 22:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 23:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 24:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 25:this.commonInfo.tokenValue = content;return TokenType.Type["op"];
                case 26:
                case 44:this.commonInfo.tokenValue = content;return TokenType.Type["valueInt"];
                case 34:this.commonInfo.tokenValue = content;return TokenType.Type["valueOxInt"];
                case 33:this.commonInfo.tokenValue = content;return TokenType.Type["valueNumber"];
                case 35:this.commonInfo.tokenValue = content;return TokenType.Type["valueString"];
                case 2:
                case 43:
                case 46:
                case 47:
                case 48:
                case 49:
                case 50:
                case 51:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:this.commonInfo.tokenValue = this.installId(this.commonInfo,content);return TokenType.Type["id"];
            }
            return null;
        }

    }
}

////////////////////////////////black/flower/binding/compiler/ScannerTable.ts/////////////////////////////////
namespace lib {
    export class ScannerTable {
        static moves = {0:{9:1,10:1,13:1,32:1,33:16,34:42,36:43,37:12,38:18,39:45,40:5,41:6,42:9,43:7,44:25,45:8,46:22,47:10,48:26,49:44,50:44,51:44,52:44,53:44,54:44,55:44,56:44,57:44,58:23,59:24,60:15,61:11,62:14,63:21,64:13,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,94:19,95:43,97:49,98:43,99:43,100:43,101:43,102:48,103:43,104:43,105:54,106:43,107:43,108:43,109:43,110:2,111:43,112:43,113:43,114:43,115:43,116:50,117:43,118:43,119:43,120:43,121:43,122:43,123:3,124:17,125:4,126:20,12288:1},1:{9:1,10:1,13:1,32:1,12288:1},2:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:47,118:43,119:43,120:43,121:43,122:43},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},14:{62:29},15:{60:30},16:{},17:{124:31},18:{38:32},19:{},20:{},21:{},22:{48:33,49:33,50:33,51:33,52:33,53:33,54:33,55:33,56:33,57:33},23:{},24:{},25:{},26:{46:52,48:44,49:44,50:44,51:44,52:44,53:44,54:44,55:44,56:44,57:44,88:34,120:34},27:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},28:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},29:{62:37},30:{60:38},31:{},32:{},33:{48:33,49:33,50:33,51:33,52:33,53:33,54:33,55:33,56:33,57:33},34:{48:34,49:34,50:34,51:34,52:34,53:34,54:34,55:34,56:34,57:34,65:34,66:34,67:34,68:34,69:34,70:34,97:34,98:34,99:34,100:34,101:34,102:34},35:{},36:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},37:{},38:{},39:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},40:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},41:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},42:{9:42,10:42,13:42,32:42,33:42,34:35,36:42,37:42,38:42,39:42,40:42,41:42,42:42,43:42,44:42,45:42,46:42,47:42,48:42,49:42,50:42,51:42,52:42,53:42,54:42,55:42,56:42,57:42,58:42,59:42,60:42,61:42,62:42,63:42,64:42,65:42,66:42,67:42,68:42,69:42,70:42,71:42,72:42,73:42,74:42,75:42,76:42,77:42,78:42,79:42,80:42,81:42,82:42,83:42,84:42,85:42,86:42,87:42,88:42,89:42,90:42,94:42,95:42,97:42,98:42,99:42,100:42,101:42,102:42,103:42,104:42,105:42,106:42,107:42,108:42,109:42,110:42,111:42,112:42,113:42,114:42,115:42,116:42,117:42,118:42,119:42,120:42,121:42,122:42,123:42,124:42,125:42,126:42,12288:42,20013:42},43:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},44:{46:52,48:44,49:44,50:44,51:44,52:44,53:44,54:44,55:44,56:44,57:44},45:{9:45,10:45,13:45,32:45,33:45,34:45,36:45,37:45,38:45,39:35,40:45,41:45,42:45,43:45,44:45,45:45,46:45,47:45,48:45,49:45,50:45,51:45,52:45,53:45,54:45,55:45,56:45,57:45,58:45,59:45,60:45,61:45,62:45,63:45,64:45,65:45,66:45,67:45,68:45,69:45,70:45,71:45,72:45,73:45,74:45,75:45,76:45,77:45,78:45,79:45,80:45,81:45,82:45,83:45,84:45,85:45,86:45,87:45,88:45,89:45,90:45,94:45,95:45,97:45,98:45,99:45,100:45,101:45,102:45,103:45,104:45,105:45,106:45,107:45,108:45,109:45,110:45,111:45,112:45,113:45,114:45,115:45,116:45,117:45,118:45,119:45,120:45,121:45,122:45,123:45,124:45,125:45,126:45,12288:45,20013:45},46:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:51,118:43,119:43,120:43,121:43,122:43},47:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:57,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},48:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:53,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:55,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},49:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:27,116:43,117:43,118:43,119:43,120:43,121:43,122:43},50:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:46,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},51:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:40,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},52:{48:33,49:33,50:33,51:33,52:33,53:33,54:33,55:33,56:33,57:33},53:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:58,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},54:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:28,116:43,117:43,118:43,119:43,120:43,121:43,122:43},55:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:36,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},56:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:41,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},57:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:39,109:43,110:43,111:43,112:43,113:43,114:43,115:43,116:43,117:43,118:43,119:43,120:43,121:43,122:43},58:{48:43,49:43,50:43,51:43,52:43,53:43,54:43,55:43,56:43,57:43,65:43,66:43,67:43,68:43,69:43,70:43,71:43,72:43,73:43,74:43,75:43,76:43,77:43,78:43,79:43,80:43,81:43,82:43,83:43,84:43,85:43,86:43,87:43,88:43,89:43,90:43,95:43,97:43,98:43,99:43,100:43,101:43,102:43,103:43,104:43,105:43,106:43,107:43,108:43,109:43,110:43,111:43,112:43,113:43,114:43,115:56,116:43,117:43,118:43,119:43,120:43,121:43,122:43}};
        static start = 0;
        static endInfos = {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,20:false,21:false,22:false,23:false,24:false,25:false,26:false,27:false,28:false,29:false,30:false,31:false,32:false,33:false,34:false,35:false,36:false,37:false,38:false,39:false,40:false,41:false,43:false,44:false,46:false,47:false,48:false,49:false,50:false,51:false,53:false,54:false,55:false,56:false,57:false,58:false};
        static befores = {};
        static inputs = {9:true,10:true,13:true,32:true,33:true,34:true,36:true,37:true,38:true,39:true,40:true,41:true,42:true,43:true,44:true,45:true,46:true,47:true,48:true,49:true,50:true,51:true,52:true,53:true,54:true,55:true,56:true,57:true,58:true,59:true,60:true,61:true,62:true,63:true,64:true,65:true,66:true,67:true,68:true,69:true,70:true,71:true,72:true,73:true,74:true,75:true,76:true,77:true,78:true,79:true,80:true,81:true,82:true,83:true,84:true,85:true,86:true,87:true,88:true,89:true,90:true,94:true,95:true,97:true,98:true,99:true,100:true,101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,111:true,112:true,113:true,114:true,115:true,116:true,117:true,118:true,119:true,120:true,121:true,122:true,123:true,124:true,125:true,126:true,12288:true,20013:true};
    }
}

////////////////////////////////black/flower/binding/compiler/TokenType.ts/////////////////////////////////
namespace lib {
    export class TokenType {
        static Type:any = {
            "endSign": "$",
            "public": "public",
            "private": "private",
            "protected": "protected",
            "final": "final",
            "dynamic": "dynamic",
            "internal": "internal",
            "class": "class",
            "interface": "interface",
            "extends": "extends",
            "implements": "implements",
            "import": "import",
            "var": "var",
            "static": "static",
            "const": "const",
            "function": "function",
            "override": "override",
            "void": "void",
            "return": "return",
            "package": "package",
            "flashProxy": "flash_proxy",
            "namespace": "namespace",
            "finally": "finally",
            "new": "new",
            "as": "as",
            "is": "is",
            "get": "get",
            "set": "set",
            "Vector": "Vector",
            "op": "op",
            "id": "id",
            "valueInt": "CInt",
            "valueOxInt": "OXCInt",
            "valueNumber": "CNumber",
            "valueString": "CString",
            "valueRegExp": "RegExp",
            "null": "null",
            "true": "true",
            "false": "false",
            "if": "if",
            "else": "else",
            "for": "for",
            "each": "each",
            "in": "in",
            "do": "do",
            "while": "while",
            "switch": "switch",
            "case": "case",
            "default": "default",
            "continue": "continue",
            "break": "break"
        };
        static TokenTrans:any = {"op": true};
    }
}

////////////////////////////////black/flower/binding/compiler/structs/CallParams.ts/////////////////////////////////
namespace lib {
    export class CallParams {
        type = "callParams";
        list:any[] = [];

        constructor() {
        }

        addParam(expr:any) {
            this.list.push(expr);
        }

        addParamAt(expr:any, index:number) {
            this.list.splice(index, 0, expr);
        }

        checkPropertyBinding(commonInfo:any) {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].checkPropertyBinding(commonInfo);
            }
        }

        getValueList() {
            var params = [];
            for (var i = 0; i < this.list.length; i++) {
                params.push((this.list[i]).getValue());
            }
            return params;
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/DeviceStmt.ts/////////////////////////////////
namespace lib {
    export class DeviceStmt {

        constructor() {
        }

        checkPropertyBinding(commonInfo:any) {
        }

        getValue():any {
            return null;
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/Expr.ts/////////////////////////////////
namespace lib {
    export class Expr {
        type:any;
        expr1:any;
        expr2:any;
        expr3:any;

        constructor(type:any, expr1:any = null, expr2:any = null, expr3:any = null) {
            this.type = type;
            this.expr1 = expr1;
            this.expr2 = expr2;
            this.expr3 = expr3;
            if (type == "int") {
                this.expr1 = parseInt(expr1);
            }
            if (type == "string") {
                this.expr1 = this.expr1.slice(1, this.expr1.length - 1);
            }
        }

        checkPropertyBinding(commonInfo:any) {
            if (this.type == "Atr") {
                (this.expr1).checkPropertyBinding(commonInfo);
            } else if (this.expr1 && (this.expr1 instanceof Expr || this.expr1 instanceof ExprAtr)) {
                (this.expr1).checkPropertyBinding(commonInfo);
            }
            if (this.type == "spfor") {
                commonInfo.specialFor = this.expr1.getValue();
            }
            if (this.expr2 && (this.expr2 instanceof Expr || this.expr2 instanceof ExprAtr)) {
                (this.expr2).checkPropertyBinding(commonInfo);
            }
            if (this.expr3 && (this.expr3 instanceof Expr || this.expr3 instanceof ExprAtr)) {
                (this.expr3).checkPropertyBinding(commonInfo);
            }
            if (this.type == "spfor") {
                commonInfo.specialFor = null;
            }
        }

        getValue(params:any) {
            if (this.type == "Atr") {
                return this.expr1.getValue(params);
            }
            if (this.type == "int") {
                return this.expr1;
            }
            if (this.type == "0xint") {
                return this.expr1;
            }
            if (this.type == "number") {
                return this.expr1;
            }
            if (this.type == "boolean") {
                return this.expr1;
            }
            if (this.type == "string") {
                return this.expr1;
            }
            if (this.type == "+a") {
                return this.expr1.getValue(params);
            }
            if (this.type == "-a") {
                return -this.expr1.getValue(params);
            }
            if (this.type == "!") {
                return !this.expr1.getValue(params);
            }
            if (this.type == "*") {
                return this.expr1.getValue(params) * this.expr2.getValue(params);
            }
            if (this.type == "/") {
                return this.expr1.getValue(params) / this.expr2.getValue(params);
            }
            if (this.type == "%") {
                return this.expr1.getValue(params) % this.expr2.getValue(params);
            }
            if (this.type == "+") {
                return this.expr1.getValue(params) + this.expr2.getValue(params);
            }
            if (this.type == "-") {
                return this.expr1.getValue(params) - this.expr2.getValue(params);
            }
            if (this.type == "<<") {
                return this.expr1.getValue(params) << this.expr2.getValue(params);
            }
            if (this.type == ">>") {
                return this.expr1.getValue(params) >> this.expr2.getValue(params);
            }
            if (this.type == ">>>") {
                return this.expr1.getValue(params) >>> this.expr2.getValue(params);
            }
            if (this.type == ">") {
                return this.expr1.getValue(params) > this.expr2.getValue(params);
            }
            if (this.type == "<") {
                return this.expr1.getValue(params) < this.expr2.getValue(params);
            }
            if (this.type == ">=") {
                return this.expr1.getValue(params) >= this.expr2.getValue(params);
            }
            if (this.type == "<=") {
                return this.expr1.getValue(params) <= this.expr2.getValue(params);
            }
            if (this.type == "==") {
                return this.expr1.getValue(params) == this.expr2.getValue(params);
            }
            if (this.type == "===") {
                return this.expr1.getValue(params) === this.expr2.getValue(params);
            }
            if (this.type == "!==") {
                return this.expr1.getValue(params) !== this.expr2.getValue(params);
            }
            if (this.type == "!=") {
                return this.expr1.getValue(params) != this.expr2.getValue(params);
            }
            if (this.type == "&") {
                return this.expr1.getValue(params) & this.expr2.getValue(params);
            }
            if (this.type == "~") {
                return ~this.expr1.getValue(params);
            }
            if (this.type == "^") {
                return this.expr1.getValue(params) ^ this.expr2.getValue(params);
            }
            if (this.type == "|") {
                return this.expr1.getValue(params) | this.expr2.getValue(params);
            }
            if (this.type == "&&") {
                return this.expr1.getValue(params) && this.expr2.getValue(params);
            }
            if (this.type == "||") {
                return this.expr1.getValue(params) || this.expr2.getValue(params);
            }
            if (this.type == "=") {
                this.expr1.setValue(this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "*=") {
                this.expr1.setValue(this.expr1.getValue(params) * this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "/=") {
                this.expr1.setValue(this.expr1.getValue(params) / this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "%=") {
                this.expr1.setValue(this.expr1.getValue(params) % this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "&=") {
                this.expr1.setValue(this.expr1.getValue(params) & this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "+=") {
                this.expr1.setValue(this.expr1.getValue(params) + this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "-=") {
                this.expr1.setValue(this.expr1.getValue(params) - this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "||=") {
                this.expr1.setValue(this.expr1.getValue(params) || this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "<<=") {
                this.expr1.setValue(this.expr1.getValue(params) << this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == ">>=") {
                this.expr1.setValue(this.expr1.getValue(params) >> this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "^=") {
                this.expr1.setValue(this.expr1.getValue(params) ^ this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "|=") {
                this.expr1.setValue(this.expr1.getValue(params) | this.expr2.getValue(params), params);
                return this.expr1.getValue(params);
            }
            if (this.type == "?:") {
                return this.expr1.getValue(params) ? this.expr2.getValue(params) : this.expr3.getValue(params);
            }
            if (this.type == "spfor") {
                var info = params || {};
                info["$s"] = 0;
                info["$len"] = this.expr1.getAttribute("length");
                info["$i"] = null;
                for (var i = 0; i < info["$len"]; i++) {
                    info["$i"] = this.expr1.getAttribute(i);
                    this.expr2.getValue(info);
                }
                return info.$s;
            }
            return null;
        }

        setValue(val:any, params:any) {
            if (this.type == "Atr") {
                this.expr1.setValue(val, params);
            }
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/ExprAtr.ts/////////////////////////////////
namespace lib {
    export class ExprAtr {
        type = "attribute";
        list: any;
        value: any;
        before: any;
        beforeClass: any;
        equalBefore: any;

        constructor() {
            this.list = [];
            this.equalBefore = false;
        }

        addItem(item: any) {
            if (this.list.length == 0 && item.type == "id" && item.val == "this") {
                return;
            }
            if (this.list.length == 0 && item.type == ".") {
                item.type = "id";
            }
            this.list.push(item);
        }

        checkPropertyBinding(commonInfo: any) {
            var atr;
            var getValue = false;
            if (this.list[0].type == "()") {
                (this.list[0].val).checkPropertyBinding(commonInfo);
            }
            else if (this.list[0].type == "object") {
                (this.list[0].val).checkPropertyBinding(commonInfo);
            }
            else if (this.list[0].type == "id") {
                if (commonInfo.specialFor && this.list[0].val == "$i") {
                    this.checkSpecialFor(commonInfo.specialFor, commonInfo.binding);
                }
                getValue = this.list[0].getValue;
                var name = this.list[0].val;
                if (name == "this") {
                    this.list.shift();
                }
                if (commonInfo.objects["this"] && commonInfo.objects["this"][name] != null) {
                    atr = commonInfo.objects["this"][name];
                    this.before = commonInfo.objects["this"];
                } else if (commonInfo.objects[name] != null) {
                    this.before = commonInfo.objects[name];
                    this.beforeClass = false;
                    this.equalBefore = true;
                }
                else if (commonInfo.classes[name] != null) {
                    this.before = commonInfo.classes[name];
                    this.beforeClass = true;
                    this.equalBefore = true;
                }
                else if (commonInfo.checks) {
                    for (var c = 0; c < commonInfo.checks.length; c++) {
                        try {
                            if(commonInfo.checks[c] instanceof ObjectValue) {
                                if (commonInfo.checks[c][name + "Value"] !== null && commonInfo.checks[c][name + "Value"] instanceof Value) {
                                    atr = commonInfo.checks[c][name + "Value"];
                                }
                            } else {
                                atr = commonInfo.checks[c][name];
                            }
                            if (atr) {
                                this.before = commonInfo.checks[c];
                            }
                        }
                        catch (e) {
                            atr = null;
                            this.before = null;
                        }

                        if (atr) {
                            break;
                        }
                    }
                }
            }
            for (var i = 1; i < this.list.length; i++) {
                if (this.list[i].type == ".") {
                    if (atr) {
                        var atrName = this.list[i].val;
                        getValue = this.list[i].getValue;
                        try {
                            if (atr[atrName + "Value"] !== null && atr[atrName + "Value"] instanceof Value) {
                                atr = atr[atrName + "Value"];
                            } else {
                                atr = atr[atrName];
                            }
                        }
                        catch (e) {
                            try {
                                atr = atr[atrName];
                            } catch (e) {
                            }
                            atr = null;
                        }
                    }
                }
                else if (this.list[i].type == "call") {
                    atr = null;
                    this.list[i].val.checkPropertyBinding(commonInfo);
                }
            }
            if (atr && atr instanceof Value && !getValue) {
                this.value = atr;
                commonInfo.result.push(atr);
            }
        }

        getValue(params: any = null): any {
            if (this.value) {
                if (this.value instanceof ArrayValue || this.value instanceof ObjectValue) {
                    return this.value;
                } else {
                    return this.value.value;
                }
            }
            var getValue = false;
            var atr;
            var lastAtr = null;
            if (this.list[0].type == "()") {
                atr = (this.list[0].val).getValue(params);
            }
            else if (this.list[0].type == "object") {
                atr = (this.list[0].val).getValue(params);
            }
            else if (this.list[0].type == "id") {
                if (params && params[this.list[0].val] != null) {
                    this.before = params;
                }
                getValue = this.list[0].getValue;
                atr = this.before;
                lastAtr = this.before;
                if (!this.equalBefore) {
                    try {
                        atr = atr[this.list[0].val];
                    }
                    catch (e) {
                        return null;
                    }
                }
            }
            for (var i = 1; i < this.list.length; i++) {
                try {
                    if (this.list[i].type == ".") {
                        if (atr[this.list[i].val] !== null && atr[this.list[i].val + "Value"] instanceof Value) {
                            atr = atr[this.list[i].val + "Value"];
                        } else {
                            atr = atr[this.list[i].val];
                        }
                        getValue = this.list[i].getValue;
                    }
                    else if (this.list[i].type == "call") {
                        if (i == 2 && this.beforeClass) {
                            atr = atr.apply(null, (this.list[i].val).getValueList());
                        }
                        else {
                            atr = atr.apply(lastAtr, (this.list[i].val).getValueList());
                        }
                    }
                    if (i < this.list.length - 1 && this.list[i + 1].type == "call") {
                        continue;
                    }
                    lastAtr = atr;
                }
                catch (e) {
                    return null;
                }
            }
            if (!getValue && atr instanceof Value) {
                atr = atr.value;
            }
            return atr;
        }

        setValue(val: any, params: any): void {
            if (this.value) {
                this.value.value = val;
                return;
            }
            var atr;
            if (this.list.length > 1) {
                if (this.list[0].type == "id") {
                    if (params && params[this.list[0].val] != null) {
                        atr = params[this.list[0].val];
                    } else {
                        try {
                            atr = this.before[this.list[0].val];
                        } catch (e) {
                            return null;
                        }
                    }
                }
            } else {
                if (this.list[0].type == "id") {
                    if (params && params[this.list[0].val] != null) {
                        params[this.list[0].val] = val;
                    } else {
                        try {
                            this.before[this.list[0].val] = val;
                        } catch (e) {
                            return null;
                        }
                    }
                }
                return;
            }
            for (var i = 1; i < this.list.length; i++) {
                try {
                    if (this.list[i].type == ".") {
                        if (i == this.list.length - 1) {
                            atr[this.list[i].val] = val;
                        } else {
                            atr = atr[this.list[i].val];
                        }
                    }
                } catch (e) {
                    return;
                }
            }
        }

        getAttribute(name: string): any {
            var val: any = this.getValue();
            return val[name];
        }

        checkSpecialFor(list: any, binding: any) {
            var checkItemListener = function (item: any, type: any): void {
                if (binding.hasDispose) {
                    return;
                }
                var atr = item;
                var lastAtr: any = null;
                for (var i = 1; i < this.list.length; i++) {
                    try {
                        if (this.list[i].type == ".") {
                            atr = atr[this.list[i].val];
                        }
                        else if (this.list[i].type == "call") {
                            if (i == 2 && this.beforeClass) {
                                atr = atr.apply(null, (this.list[i].val).getValueList());
                            }
                            else {
                                atr = atr.apply(lastAtr, (this.list[i].val).getValueList());
                            }
                        }
                        if (i < this.list.length - 1 && this.list[i + 1].type == "call") {
                            continue;
                        }
                    }
                    catch (e) {
                        return null;
                    }
                }
                if (atr instanceof Value) {
                    binding["$" + type + "ValueListener"](atr);
                }
            }
            if (this.list.length > 1) {
                for (var i = 0; i < list.length; i++) {
                    checkItemListener.call(this, list[i], "add");
                }
            }
            list.addListener(Event.ADD, function (e: any) {
                checkItemListener.call(this, e.data, "add");
            }, this);
            list.addListener(Event.REMOVE, function (e: any) {
                checkItemListener.call(this, e.data, "remove");
            }, this);
        }

        print() {
            var content = "";
            for (var i = 0; i < this.list.length; i++) {
                content += this.list[i].val;
            }
            return content;
        }

    }
}

////////////////////////////////black/flower/binding/compiler/structs/ExprAtrItem.ts/////////////////////////////////
namespace lib {

    export class ExprAtrItem {

        type: any;
        val: any;
        getValue: any;

        constructor(type: any, val: any, getValue = false) {
            this.type = type;
            this.val = val;
            this.getValue = getValue;
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/ExprStmt.ts/////////////////////////////////
namespace lib {
    export class ExprStmt {
        type = "stmt_expr";
        expr:any;

        constructor(expr:any) {
            this.expr = expr;
        }

        checkPropertyBinding(commonInfo:any) {
            this.expr.checkPropertyBinding(commonInfo);
        }

        getValue() {
            return this.expr.getValue();
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/ObjectAtr.ts/////////////////////////////////
namespace lib {
    export class ObjectAtr {
        list: any[];

        constructor(list: any[]) {
            this.list = list;
            for (var i = 0; i < list.length; i++) {
                list[i][0] = list[i][0].getValue();
            }
        }

        checkPropertyBinding(commonInfo: any) {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i][1].checkPropertyBinding(commonInfo);
            }
        }

        getValue() {
            var val: any = {};
            for (var i = 0; i < this.list.length; i++) {
                val[this.list[i][0]] = this.list[i][1].getValue();
            }
            return val;
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/ParserItem.ts/////////////////////////////////
namespace lib {
    export class ParserItem {

        constructor() {
        }
    }
}

////////////////////////////////black/flower/binding/compiler/structs/Stmts.ts/////////////////////////////////
namespace lib {
    export class Stmts {
        type = "stmts";
        list: any[] = [];

        constructor() {
        }

        addStmt(stmt: any) {
            this.list.push(stmt);
        }

        addStmtAt(stmt: any, index: number) {
            this.list.splice(index, 0, stmt);
        }

        checkPropertyBinding(commonInfo: any) {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].checkPropertyBinding(commonInfo);
            }
        }

        getValue() {
            var value;
            for (var i = 0; i < this.list.length; i++) {
                if (i == 0) {
                    value = this.list[i].getValue();
                }
                else {
                    this.list[i].getValue();
                }
            }
            return value;
        }

    }
}

window.bk = black