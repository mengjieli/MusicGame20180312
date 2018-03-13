declare var $math: Math;
declare var LocalWebSocket: {
    new (url: string, protocols?: string | string[]): WebSocket;
    prototype: WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
};
declare namespace lib {
    var math: Math;
    var $language: string;
    var CACHE: boolean;
    var data: any;
    function start(completeFunc: any, params: any): void;
    function $error(errorCode: any, ...args: any[]): void;
    function $warn(errorCode: any, ...args: any[]): void;
    function $tip(errorCode: any, ...args: any[]): void;
    function isNaN(value: any): boolean;
    function clampRotation(value: any): any;
    function trace(): void;
    function breakPoint(name: any): void;
    function dispose(): void;
    var sys: {
        config: {};
        DEBUG: boolean;
        TIP: boolean;
        $tip: (errorCode: any, ...args: any[]) => void;
        $warn: (errorCode: any, ...args: any[]) => void;
        $error: (errorCode: any, ...args: any[]) => void;
        getLanguage: (code: any, ...args: any[]) => any;
    };
    var system: {};
}
declare namespace lib {
    class Platform {
        static type: string;
        static native: any;
        static stage: any;
        static width: any;
        static height: any;
        static start(): void;
        static _runBack: any;
        static lastTime: number;
        static frame: number;
        static _run(): void;
        static pools: {};
        static create(name: any): any;
        static release(name: any, object: any): void;
    }
}
declare namespace lib {
    class PlatformURLLoader {
        static isLoading: boolean;
        static loadingFrame: any;
        static loadingFunc: any;
        static loadingArgs: any;
        static loadingId: number;
        static checkFrame: any;
        static loadingList: any[];
        static loadText(url: any, back: any, errorBack: any, thisObj: any, method: any, params: any, contentType: any): void;
        static realLoadText(url: any, back: any, errorBack: any, thisObj: any, method: any, params: any, contentType: any): void;
        static loadTexture(url: any, back: any, errorBack: any, thisObj: any, params: any): void;
        static realLoadTexture(url: any, back: any, errorBack: any, thisObj: any, params: any): void;
        static run(): void;
    }
}
declare namespace lib {
    class PlatformWebSocket {
        webSocket: any;
        bindWebSocket(ip: any, port: any, path: any, thisObj: any, onConnect: any, onReceiveMessage: any, onError: any, onClose: any): WebSocket;
        sendWebSocketUTF(data: any): void;
        sendWebSocketBytes(data: any): void;
        releaseWebSocket(): void;
        static webSockets: any[];
    }
}
declare namespace lib {
    class CoreTime {
        static currentTime: number;
        static lastTimeGap: number;
        static $playEnterFrame: boolean;
        static $run(gap: number): void;
        static getTime(): number;
    }
}
declare namespace lib {
    class Event {
        $type: string;
        $bubbles: boolean;
        $cycle: boolean;
        $target: any;
        $currentTarget: any;
        data: any;
        _isPropagationStopped: boolean;
        constructor(type: string, bubbles?: boolean);
        stopPropagation(): void;
        readonly isPropagationStopped: boolean;
        readonly type: string;
        readonly bubbles: boolean;
        readonly target: any;
        readonly currentTarget: any;
        static READY: string;
        static COMPLETE: string;
        static ADDED: string;
        static REMOVED: string;
        static ADD: string;
        static REMOVE: string;
        static ADDED_TO_STAGE: string;
        static REMOVED_FROM_STAGE: string;
        static CONNECT: string;
        static CLOSE: string;
        static CHANGE: string;
        static ERROR: string;
        static FOCUS_IN: string;
        static FOCUS_OUT: string;
        static CONFIRM: string;
        static CANCEL: string;
        static START_INPUT: string;
        static STOP_INPUT: string;
        static DISTORT: string;
        static CREATION_COMPLETE: string;
        static SELECTED_ITEM_CHANGE: string;
        static CLICK_ITEM: string;
        static TOUCH_BEGIN_ITEM: string;
        static _eventPool: any[];
        static create(type: any, data?: any, bubbles?: boolean): any;
        static release(e: any): void;
    }
}
declare namespace lib {
    class EventDispatcher {
        __EventDispatcher: any;
        __hasDispose: boolean;
        constructor(target?: any);
        readonly isDispose: boolean;
        dispose(): void;
        $release(): void;
        once(type: string, listener: Function, thisObject?: any, priority?: number, args?: any): void;
        addListener(type: string, listener: Function, thisObject?: any, priority?: number, args?: any): void;
        private __addListener(type, listener, thisObject, priority, once, args);
        removeListener(type: any, listener: any, thisObject: any): void;
        removeAllListener(): void;
        hasListener(type: any): boolean;
        dispatch(event: any): void;
        dispatchWith(type: any, data?: any, bubbles?: boolean): void;
    }
}
declare namespace lib {
    function getLanguage(code: any, ...args: any[]): any;
    function setGameLanguage(language: any, code: any, content: any): void;
    function getGameLanguage(code: any, ...args: any[]): any;
}
declare namespace lib {
    var $locale_strings: {};
}
declare namespace lib {
    class Error {
        static $SOCKET_CLOSED: number;
    }
}
declare namespace lib {
    class Help {
        static getuuid(): string;
        static sleep(time: number): Promise<void>;
    }
}
declare namespace lib {
    class UTFChange {
        static bytesToString(arr: number[]): string;
        static stringToBytes(str: string): number[];
    }
}
declare namespace lib {
    class CallLater {
        _func: any;
        _thisObj: any;
        _data: any;
        constructor(func: any, thisObj: any, args?: any);
        $call(): void;
        static add(func: any, thisObj: any, args?: any): void;
        static _next: any[];
        static _list: any[];
        static $run(): void;
        static $dispose(): void;
    }
}
declare namespace lib {
    class DelayCall {
        _func: any;
        _thisObj: any;
        _data: any;
        _time: any;
        _start: any;
        _count: any;
        $complete: any;
        constructor(time: any, count: any, func: any, thisObj: any, ...args: any[]);
        $update(): void;
        dispose(): void;
        static _list: any[];
        static _next: any[];
        static $run(): void;
        static $dispose(): void;
    }
}
declare namespace lib {
    class EnterFrame {
        static enterFrames: any[];
        static waitAdd: any[];
        static add(call: any, owner: any): void;
        static remove(call: any, owner: any): void;
        static frame: number;
        static updateFactor: number;
        static __lastFPSTime: number;
        static __lastFPSFrame: number;
        static $update(now: any, gap: any): void;
        static $dispose(): void;
    }
}
declare namespace lib {
    class StringDo {
        static isNumberString(str: any): boolean;
        static changeStringToInner(content: any): any;
        static findString(content: any, findString: any, begin: any): any;
        static findStrings(content: any, findStrings: any, begin: any): any;
        static jumpStrings(content: any, start: any, jumps: any): any;
        static replaceString(str: any, findStr: any, tstr: any): any;
        static hasStringAt(str: any, hstrs: any, pos: any): boolean;
        static findId(str: any, pos: any): string;
        static findFunctionContent(str: any, pos: any): any;
        static deleteProgramNote(str: any, pos: any): any;
        static jumpProgramSpace(str: any, pos: any): any;
        static numberToString(arr: any): string;
        static stringToBytes(str: any): any[];
        static parseNumber(value: any): number;
        static split(text: any, array: any): any[];
        static intTo16(num: any): string;
    }
}
declare namespace lib {
    class ObjectDo {
        static toString(obj: any, maxDepth?: number, before?: string, depth?: number): string;
        static keys(obj: any): string[];
        static clone(obj: any): any;
    }
}
declare namespace lib {
    class ByteArray {
        private bytes;
        position: number;
        private _length;
        constructor();
        length: number;
        readonly bytesAvailable: number;
        readonly arrayData: number[];
        writeByte(val: number): void;
        writeBoolean(val: boolean): void;
        writeInt(val: number): void;
        writeUInt(val: number): void;
        writeUTF(val: string): void;
        writeUTFBytes(val: string, len: number): void;
        writeByteArray(byteArray: ByteArray, start?: number, len?: number): void;
        writeArray(array: number[]): void;
        readByte(): number;
        readBoolean(): boolean;
        readUInt(): number;
        readInt(): number;
        readUTF(): string;
        readUTFBytes(len: number): string;
        toString(): string;
    }
}
declare namespace lib {
    interface IHead {
        headVersion: number;
        version: number;
        cmd: number;
        remoteId: string;
        readFrom(head: IHead): void;
        readonly value: any;
        readonly isRequest: boolean;
    }
}
declare namespace lib {
    interface IMessage {
        head: IHead;
        readonly value: any;
        setHead(head: IHead): void;
        send(net: ISocket): any;
        encode(bytes: ByteArray): void;
        decode(bytes: ByteArray): void;
    }
}
declare namespace lib {
    interface IRemote {
        remoteId: string;
        onReceive(head: ResponseHead, msg: ByteArray): void;
        onBack(head: ZeroResponse): void;
    }
}
declare namespace lib {
    class RequestHead implements IHead {
        static VERSION: number;
        headVersion: number;
        version: number;
        protected _cmd: number;
        $uuid: string;
        constructor(cmd?: number, uuid?: string);
        decode(bytes: ByteArray): void;
        encode(bytes: ByteArray): void;
        readFrom(head: RequestHead): void;
        readonly cmd: number;
        readonly remoteId: string;
        readonly isRequest: boolean;
        readonly value: {
            "headVersion": number;
            "version": number;
            "cmd": number;
            "uuid": string;
        };
    }
}
declare namespace lib {
    class ResponseHead implements IHead {
        static VERSION: number;
        headVersion: number;
        version: number;
        protected _cmd: number;
        protected $uuid: string;
        private _processTime;
        constructor(cmd?: number, uuid?: string, processTime?: number);
        decode(bytes: ByteArray): void;
        encode(bytes: ByteArray): void;
        readFrom(head: ResponseHead): void;
        readonly cmd: number;
        readonly remoteId: string;
        readonly processTime: number;
        readonly isRequest: boolean;
        readonly value: {
            "headVersion": number;
            "version": number;
            "cmd": number;
            "remoteId": string;
            "processTime": number;
        };
    }
}
declare namespace lib {
    class Request extends ByteArray implements IMessage, IRemote {
        head: RequestHead;
        private resolve;
        constructor(cmd?: number);
        setHead(head: RequestHead): void;
        send(net: ISocket): Promise<ZeroResponse>;
        encode(bytes: ByteArray): void;
        decode(bytes: ByteArray): void;
        onReceive(head: ResponseHead, bytes: ByteArray): void;
        onBack(head: ZeroResponse): void;
        readonly remoteId: string;
        readonly value: any;
    }
}
declare namespace lib {
    class Response extends ByteArray implements IMessage {
        head: ResponseHead;
        constructor(cmd?: number, uuid?: string, processTime?: number);
        setHead(head: ResponseHead): void;
        send(net: ISocket): void;
        encode(bytes: ByteArray): void;
        decode(bytes: ByteArray): void;
        readonly value: any;
    }
}
declare namespace lib {
    class ZeroResponse extends Response {
        errorCode: number;
        requestCmd: number;
        message: string;
        constructor(uuid?: string, processTime?: number, errorCode?: number, requestCmd?: number, message?: string);
        encode(bytes: ByteArray): void;
        decode(bytes: ByteArray): void;
        readonly value: {
            head: {
                "headVersion": number;
                "version": number;
                "cmd": number;
                "remoteId": string;
                "processTime": number;
            };
            errorCode: number;
            requestCmd: number;
            message: string;
        };
    }
}
declare namespace lib {
    interface ISocket {
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
declare namespace lib {
    class SocketBase implements ISocket {
        static id: number;
        private remotes;
        private backs;
        private zbacks;
        isClient: boolean;
        addRemote(remote: IRemote): void;
        onReceive(message: any): void;
        add(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;
        addOnce(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;
        remove(cmd: number, back: (head: IHead, bytes: ByteArray) => void, thisObj: any): void;
        addZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;
        removeZero(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;
        addZeroOnce(cmd: number, back: (head: ZeroResponse) => void, thisObj: any): void;
        protected dispatchMessage(bytes: ByteArray): void;
        send(bytes: ByteArray): void;
        private awaitCloseFunctions;
        awaitClose(): Promise<number>;
        protected onAwaitClose(code: number): void;
        private awaitConnectFunctions;
        awaitConnect(): Promise<number>;
        protected connectComplete(): void;
        close(): void;
        readonly isConnect: boolean;
        static readHead(bytes: ByteArray): IHead;
    }
}
declare namespace lib {
    class SocketBuffer {
        private static buffers;
        static addMessage(remoteId: string, bytes: ByteArray): void;
        static getMessage(remoteId: string): ByteArray[];
        static removeMessage(remoteId: string): void;
    }
}
declare namespace lib {
    class URLLoader {
        static urlHead: string;
        _createRes: boolean;
        _res: any;
        _isLoading: boolean;
        _data: any;
        _linkLoader: any;
        _links: any;
        _type: any;
        _selfDispose: boolean;
        _language: any;
        _scale: any;
        _loadInfo: any;
        _method: any;
        _params: any;
        _recordUse: any;
        resolve: any;
        reject: any;
        constructor(res: any);
        $setResource(res: any): void;
        readonly url: any;
        readonly loadURL: any;
        readonly type: any;
        language: any;
        scale: any;
        method: any;
        params: any;
        $addLink(loader: any): void;
        load(res?: any): Promise<URLLoaderResult>;
        private asyncFunction(resolve, reject);
        __concatURLHead(head: any, url: any): any;
        onLoadTexturePlistComplete(e: any): void;
        loadTextureSplitComplete(e: any): void;
        setTextureByLink(texture: any): void;
        setPlistByLink(plist: any): void;
        loadText(): void;
        loadTextComplete(content: any): void;
        setTextByLink(content: any): void;
        setJsonByLink(content: any): void;
        loadComplete(): void;
        loadError(e: any): void;
        $useImage(): void;
        dispose(): void;
        static list: any[];
        static clear(): void;
    }
}
declare namespace lib {
    class URLLoaderResult {
        result: number;
        data: any;
        constructor(result: number, data?: any);
    }
}
declare namespace lib {
    class URLLoaderList extends EventDispatcher {
        __list: any;
        __dataList: any;
        __index: any;
        __language: any;
        __scale: any;
        constructor(list: any);
        language: any;
        scale: any;
        load(): void;
        __loadNext(): void;
        __onError(e: any): void;
        __onComplete(e: any): void;
    }
}
declare namespace lib {
    class URLLoaderMethod {
        static GET: string;
        static POST: string;
        static HEAD: string;
    }
}
declare namespace lib {
    class WebSocketClient extends SocketBase {
        private client;
        private _isConnect;
        private _isClosed;
        private _type;
        protected serverIp: string;
        protected serverPort: number;
        autoLinkServer: boolean;
        connectSleep: number;
        constructor(type?: string);
        private _autoLink();
        readonly type: string;
        readonly isConnect: boolean;
        readonly isClosed: boolean;
        connect(ip: string, port: number, path?: string): void;
        awaitConnect(ip?: string, port?: number): Promise<number>;
        protected onConnect(): void;
        protected onConnectError(e: Error): void;
        protected onError(e: Error): void;
        protected onClose(code: number, desc?: string): void;
        onReceive(message: any): void;
        send(data: ByteArray): void;
        close(): void;
    }
}
declare namespace lib {
    class ConnectResult {
        result: number;
        constructor(result: number);
        static SUCCESS: number;
        static FAIL: number;
    }
}
declare namespace lib {
    class Res {
        static __resItems: any[];
        static getRes(url: any): any;
        static addRes(res: any): void;
    }
}
declare namespace lib {
    class ResItem {
        __url: any;
        __loadList: any[];
        __type: any;
        constructor(url: any, type: any);
        addURL(url: any): void;
        addInfo(url: any, plist: any, settingWidth: any, settingHeight: any, scale: any, language: any, update?: boolean, splitURL?: any): any;
        getLoadInfo(language: any, scale: any): any;
        readonly type: any;
        readonly url: any;
        static $pools: any[];
        static create(url: any): any;
        static release(item: any): void;
    }
}
declare namespace lib {
    class ResItemInfo {
        url: any;
        plist: any;
        splitURL: any;
        settingWidth: any;
        settingHeight: any;
        scale: any;
        language: any;
        update: boolean;
        static $pools: any[];
        static create(): any;
        static release(info: any): void;
    }
}
declare namespace lib {
    class ResType {
        static TEXT: number;
        static JSON: number;
        static IMAGE: number;
        static PLIST: number;
        static getURLType(url: any): number;
        static getType(end: any): number;
    }
}
declare namespace lib {
    class Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        _storeList: any[];
        constructor();
        identity(): void;
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        translate(x: number, y: number): void;
        rotate(angle: number): void;
        scale(scaleX: number, scaleY: number): void;
        transformPoint(pointX: number, pointY: number, resultPoint: Point): Point;
        $updateSR(scaleX: number, scaleY: number, rotation: number): void;
        $updateRST(rotation: number, scaleX: number, scaleY: number, tx: number, ty: number): void;
        $transformRectangle(rect: Rectangle): void;
        readonly deformation: boolean;
        save(): void;
        restore(): void;
        static $matrix: Matrix;
        static matrixPool: Matrix[];
        static release(matrix: Matrix): void;
        static create(): Matrix;
    }
}
declare namespace lib {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        setTo(x: number, y: number): this;
        readonly length: number;
        static distance(p1: Point, p2: Point): number;
        static $TempPoint: Point;
        static pointPool: Point[];
        static release(point: Point): void;
        static create(x?: number, y?: number): Point;
    }
}
declare namespace lib {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        right: number;
        bottom: number;
        left: number;
        top: number;
        copyFrom(sourceRect: Rectangle): this;
        setTo(x: number, y: number, width: number, height: number): this;
        contains(x: number, y: number): boolean;
        intersection(toIntersect: Rectangle): Rectangle;
        $intersectInPlace(clipRect: Rectangle): Rectangle;
        intersects(toIntersect: Rectangle): boolean;
        isEmpty(): boolean;
        setEmpty(): void;
        clone(): Rectangle;
        _getBaseWidth(angle: number): number;
        _getBaseHeight(angle: number): number;
        static rectanglePool: Rectangle[];
        static release(rect: Rectangle): void;
        static create(x: number, y: number, width: number, height: number): Rectangle;
        static $TempRectangle: Rectangle;
    }
}
declare namespace lib {
    class Size {
        width: number;
        height: number;
        constructor(width?: number, height?: number);
        setTo(width: number, height: number): this;
        readonly area: number;
        static $TempSize: Size;
        static sizePool: Size[];
        static release(size: Size): void;
        static create(width?: number, height?: number): Size;
    }
}
declare namespace lib {
    class BasicPlugin {
        constructor();
        init(tween: Tween, propertiesTo: any, propertiesFrom: any): any;
        tween: Tween;
        keys: string[];
        startAttributes: any;
        _attributes: any;
        update(value: any): void;
    }
}
declare namespace lib {
    class Ease {
        static NONE: string;
        static SINE_EASE_IN: string;
        static SineEaseOut: string;
        static SINE_EASE_IN_OUT: string;
        static SineEaseOutIn: string;
        static QUAD_EASE_IN: string;
        static QUAD_EASE_OUT: string;
        static QUAD_EASE_IN_OUT: string;
        static QUAD_EASE_OUT_IN: string;
        static CUBIC_EASE_IN: string;
        static CUBIC_EASE_OUT: string;
        static CUBIC_EASE_IN_OUT: string;
        static CUBIC_EASE_OUT_IN: string;
        static QUART_EASE_IN: string;
        static QUART_EASE_OUT: string;
        static QUART_EASE_IN_OUT: string;
        static QUART_EASE_OUT_IN: string;
        static QUINT_EASE_IN: string;
        static QUINT_EASE_OUT: string;
        static QUINT_EASE_IN_OUT: string;
        static QUINT_EASE_OUT_IN: string;
        static EXPO_EASE_IN: string;
        static EXPO_EASE_OUT: string;
        static EXPO_EASE_IN_OUT: string;
        static EXPO_EASE_OUT_IN: string;
        static CIRC_EASE_IN: string;
        static CIRC_EASE_OUT: string;
        static CIRC_EASE_IN_OUT: string;
        static CIRC_EASE_OUT_IN: string;
        static BACK_EASE_IN: string;
        static BACK_EASE_OUT: string;
        static BACK_EASE_IN_OUT: string;
        static BACK_EASE_OUT_IN: string;
        static ELASTIC_EASE_IN: string;
        static ELASTIC_EASE_OUT: string;
        static ELASTIC_EASE_IN_OUT: string;
        static ELASTIC_EASE_OUT_IN: string;
        static BOUNCE_EASE_IN: string;
        static BounceEaseOut: string;
        static BOUNCE_EASE_IN_OUT: string;
        static BOUNCE_EASE_OUT_IN: string;
        static registerEaseFunction(name: string, ease: Function): void;
    }
}
declare namespace lib {
    class EaseFunction {
        static None(t: number): number;
        static SineEaseIn(t: number): number;
        static SineEaseOut(t: number): number;
        static SineEaseInOut(t: number): number;
        static SineEaseOutIn(t: number): number;
        static QuadEaseIn(t: number): number;
        static QuadEaseOut(t: number): number;
        static QuadEaseInOut(t: number): number;
        static QuadEaseOutIn(t: number): number;
        static CubicEaseIn(t: number): number;
        static CubicEaseOut(t: number): number;
        static CubicEaseInOut(t: number): number;
        static CubicEaseOutIn(t: number): number;
        static QuartEaseIn(t: number): number;
        static QuartEaseOut(t: number): number;
        static QuartEaseInOut(t: number): number;
        static QuartEaseOutIn(t: number): number;
        static QuintEaseIn(t: number): number;
        static QuintEaseOut(t: number): number;
        static QuintEaseInOut(t: number): number;
        static QuintEaseOutIn(t: number): number;
        static ExpoEaseIn(t: number): number;
        static ExpoEaseOut(t: number): number;
        static ExpoEaseInOut(t: number): number;
        static ExpoEaseOutIn(t: number): number;
        static CircEaseIn(t: number): number;
        static CircEaseOut(t: number): number;
        static CircEaseInOut(t: number): number;
        static CircEaseOutIn(t: number): number;
        static BackEaseIn(t: number): number;
        static BackEaseOut(t: number): number;
        static BackEaseInOut(t: number): number;
        static BackEaseOutIn(t: number): number;
        static ElasticEaseIn(t: number): number;
        static ElasticEaseOut(t: number): number;
        static ElasticEaseInOut(t: number): number;
        static ElasticEaseOutIn(t: number): number;
        static bounceEaseIn(t: number): number;
        static bounceEaseOut(t: number): number;
        static BounceEaseInOut(t: number): number;
        static BounceEaseOutIn(t: number): number;
        static BounceEaseIn: typeof EaseFunction.bounceEaseIn;
        static BounceEaseOut: typeof EaseFunction.bounceEaseOut;
    }
}
declare namespace lib {
    class Tween {
        constructor(target: any, time: number, propertiesTo: any, ease?: string, propertiesFrom?: any);
        invalidProperty: boolean;
        _propertiesTo: any;
        propertiesTo: any;
        _propertiesFrom: any;
        propertiesFrom: any;
        $time: number;
        time: number;
        $startTime: number;
        startTime: number;
        _currentTime: number;
        _target: any;
        target: any;
        _ease: any;
        _easeData: any;
        ease: any;
        _startEvent: string;
        startEvent: string;
        _startTarget: any;
        startTarget: any;
        removeTargetEvent(): void;
        addTargetEvent(): void;
        play(): void;
        stop(): void;
        startByEvent(): void;
        _timeLine: TimeLine;
        readonly timeLine: TimeLine;
        $setTimeLine(value: any): void;
        pugins: BasicPlugin[];
        initParmas(): void;
        invalidate(): void;
        _complete: any;
        _completeThis: any;
        _completeParams: any;
        call(callBack: any, thisObj?: any, ...args: any[]): this;
        _update: any;
        _updateThis: any;
        _updateParams: any;
        update(callBack: any, thisObj?: any, ...args: any[]): this;
        $update(time: number): boolean;
        dispose(): void;
        static to(target: any, time: number, propertiesTo: any, ease?: string, propertiesFrom?: any): Tween;
        static plugins: any;
        static easeCache: any;
        static registerPlugin(paramName: string, plugin: any): void;
        static hasPlugin(paramName: string): boolean;
    }
}
declare namespace lib {
    class TimeLine {
        tweens: Tween[];
        constructor();
        lastTime: number;
        _currentTime: number;
        readonly totalTime: number;
        getTotalTime(): number;
        _totalTime: number;
        invalidTotalTime: boolean;
        $invalidateTotalTime(): void;
        _loop: boolean;
        loop: boolean;
        _isPlaying: boolean;
        readonly isPlaying: boolean;
        update(timeStamp: number, gap: number): boolean;
        play(): void;
        stop(): void;
        $setPlaying(value: any, time?: number): void;
        gotoAndPlay(time: number): void;
        gotoAndStop(time: number): void;
        addTween(tween: Tween): Tween;
        removeTween(tween: Tween): void;
        calls: any[];
        call(time: number, callBack: Function, thisObj?: any, ...args: any[]): void;
    }
}
declare namespace lib {
    class TweenCenter {
        constructor();
        init(tween: any, propertiesTo: any, propertiesFrom: any): string[];
        tween: Tween;
        scaleXFrom: any;
        scaleYFrom: any;
        scaleXTo: any;
        scaleYTo: any;
        rotationFrom: any;
        rotationStart: any;
        rotationTo: any;
        centerX: number;
        centerY: number;
        centerLength: number;
        lastMoveX: number;
        lastMoveY: number;
        update(value: any): void;
        static scaleTo(target: any, time: number, scaleTo: any, scaleFrom?: any, ease?: string): Tween;
        static rotationTo(target: any, time: number, rotationTo: any, rotationFrom?: any, ease?: string): Tween;
    }
}
declare namespace lib {
    class TweenPath {
        constructor();
        init(tween: Tween, propertiesTo: any, propertiesFrom: any): string[];
        tween: Tween;
        pathSum: any;
        path: any;
        update(value: any): void;
        static to(target: any, time: number, path: any, ease?: string): Tween;
        static vto(target: any, v: number, path: any, ease?: string): Tween;
    }
}
declare namespace lib {
    class TweenPhysicMove {
        constructor();
        init(tween: Tween, propertiesTo: any, propertiesFrom: any): string[];
        tween: Tween;
        startX: number;
        vx: number;
        ax: number;
        startY: number;
        vy: number;
        ay: number;
        time: number;
        update(value: number): void;
        static freeFallTo(target: any, time: number, groundY: number): Tween;
        static freeFallToWithG(target: any, g: number, groundY: number): Tween;
        static fallTo(target: any, time: number, groundY: number, vX?: number, vY?: number): Tween;
        static fallToWithG(target: any, g: number, groundY: number, vX?: number, vY?: number): Tween;
        static to(target: any, time: number, xTo: number, yTo: number, vX?: number, vY?: number): Tween;
    }
}
declare namespace lib {
    class DataManager {
        static Attribute: string;
        static Size: string;
        static Point: string;
        static RGB: string;
        static ARGB: string;
        static Rectangle: string;
        static ProgressData: string;
        static System: string;
        static BlackData: string;
        _defines: any;
        _root: any;
        staticScript: string;
        scriptContent: string;
        constructor();
        addRootData(name: string, className: string, init?: any): any;
        addDefine(config: any): any;
        __getImportContent(): string;
        $addClassDefine(clazz: any, className: string): void;
        getClass(className: string): any;
        createData(className: string, init?: any, distort?: boolean): any;
        decodeScript(before: any, className: string, script: any): void;
        findNextFunction(content: string, start: number): any;
        clear(): void;
        static instance: DataManager;
        static getInstance(): DataManager;
        static addRootData(name: string, className: string, init?: any): any;
        static getClass(className: string): any;
        static addDefine(config: any): any;
        static createData(className: string, init?: any): any;
        static clear(): void;
    }
}
declare namespace lib {
    class Value extends lib.EventDispatcher {
        protected __old: any;
        protected __value: any;
        protected __checkDistort: boolean;
        protected __list: any[];
        protected valueEqualResolve: Function;
        protected equalValue: any;
        constructor(checkDistort?: boolean);
        valueEqual(val: any): Promise<void>;
        protected asyncFunction(resolve: Function): void;
        $setValue(val: any): void;
        $getValue(): any;
        push(val: any): void;
        pop(): any;
        value: any;
        readonly old: any;
        static Default_Check_Distort: boolean;
    }
}
declare namespace lib {
    class ArrayValue extends Value {
        _lengthValue: IntValue;
        _length: number;
        list: any[];
        _key: string;
        _rangeMinKey: string;
        _rangeMaxKey: string;
        _selectedItem: any;
        _itemType: string;
        _subs: any;
        $sub: boolean;
        constructor(init?: any, itemType?: string);
        push(item: any): void;
        addItemAt(item: any, index: number): void;
        shift(): any;
        splice(startIndex: number, delCount?: number, ...args: any[]): any[];
        slice(startIndex: number, end: number): ArrayValue;
        pop(): any;
        removeAll(): void;
        removeItem(item: any): any;
        removeItemAt(index: number): any;
        removeItemWith(key: string, value: any, key2?: string, value2?: any): any;
        getItemIndex(item: any): number;
        getItemWith(key: string, value: any, key2?: string, value2?: any): any;
        getItemFunction(func: Function, thisObj: any, ...args: any[]): void;
        getItemsWith(key: string, value: any, key2?: string, value2?: any): any[];
        setItemsAttributeWith(findKey: string, findValue: any, setKey?: string, setValue?: any): void;
        getItemsFunction(func: Function, thisObj?: any): any[];
        sort(): void;
        setItemIndex(item: any, index: number): void;
        getItemAt(index: number): any;
        setItemAt(index: number, item: any): void;
        getItemByValue(value: any): any;
        getItemByRange(value: any): any;
        getItemsByRange(value: any): any[];
        createSubArrayValue(...args: any[]): ArrayValue;
        linkSubArrayValue(sub: any, ...args: any[]): void;
        __addAllItemChange(): void;
        __addItemChange(item: any): void;
        __removeItemChange(item: any): void;
        __onItemChange(e: Event, item: any): void;
        __checkSubPush(item: any): void;
        __checkSubAddItemAt(item: any, index: number): void;
        __checkSubRemoveItem(item: any): void;
        __subRemoveAll(): void;
        dispose(): void;
        $setValue(val: any): void;
        value: any[];
        key: string;
        rangeMinKey: string;
        rangeMaxKey: string;
        length: number;
        readonly lengthIntValue: IntValue;
    }
}
declare namespace lib {
    class BooleanValue extends Value {
        private __enumList;
        constructor(init?: any, enumList?: any);
        $setValue(val: any): void;
        $setEnumList(val: any): void;
        enumList: any[];
    }
}
declare namespace lib {
    class IntValue extends Value {
        private __enumList;
        private __valueCheck;
        constructor(init?: number, enumList?: any, checkDistort?: boolean);
        $setValue(val: any): void;
        $getValue(): any;
        $setEnumList(val: any): void;
        enumList: any[];
    }
}
declare namespace lib {
    class NumberValue extends Value {
        private __enumList;
        private __precision;
        private __multiplier;
        private __valueCheck;
        constructor(init?: number, enumList?: any, checkDistort?: any);
        $setValue(val: any): void;
        $getValue(): any;
        private $setEnumList(val);
        enumList: any[];
        precision: number;
    }
}
declare namespace lib {
    class ObjectValue extends Value {
        private __saveClass;
        private __nosave;
        private __className;
        constructor(init?: any);
        $setMember(name: string, value: any): void;
        $setMemberSaveClass(name: string, saveClass?: boolean): void;
        $setMemberSaveFlag(name: string, save?: boolean): void;
        hasMember(name: string): any;
        getValue(name: string): any;
        setValue(name: string, value: any): void;
        $setValue(val: any): void;
        $getValue(saveClass?: boolean): any;
        value: any;
        className: any;
        readonly membersKey: string[];
        dispose(): void;
    }
}
declare namespace lib {
    class StringValue extends Value {
        private __enumList;
        constructor(init?: string, enumList?: any);
        $setValue(val: any): void;
        $setEnumList(val: any): void;
        enumList: any;
    }
}
declare namespace lib {
    class UIntValue extends Value {
        private __enumList;
        private __valueCheck;
        constructor(init?: number, enumList?: any, checkDistort?: boolean);
        $setValue(val: any): void;
        $getValue(): any;
        $setEnumList(val: any): void;
        enumList: any;
    }
}
declare namespace lib {
    class Binding {
        singleValue: any;
        list: any;
        stmts: any;
        thisObj: any;
        property: any;
        content: any;
        checks: any[];
        hasDispose: boolean;
        constructor(thisObj: any, checks: any[], property: string, content: string);
        $reset(): void;
        __bind(thisObj: any, checks: any[], property: string, content: string): void;
        $addValueListener(value: any): void;
        $removeValueListener(value: any): void;
        update(value?: any, old?: any): void;
        dispose(): void;
        static bindingChecks: any[];
        static addBindingCheck(check: any): void;
        static changeList: any;
        static changeData(display: any): void;
        static removeChangeObject(display: any): void;
        static clearBindingChecks(): void;
    }
}
declare namespace lib {
    class Compiler {
        _scanner: any;
        _parser: any;
        constructor();
        parserExpr(content: string, checks: any, objects: any, classes: any, result: any, binding: any): any;
        static ist: Compiler;
        static parserExpr(content: any, checks: any, objects: any, classes: any, result: any, binding: any): any;
    }
}
declare namespace lib {
    class Parser {
        action: any;
        go: any;
        commonInfo: any;
        constructor();
        setCommonInfo(info: any): void;
        parser(content: any): boolean;
        getFilePosInfo(content: any, pos: any): string;
        runProgrammer(id: any, node: any, nodes: any): void;
    }
}
declare namespace lib {
    class ParserTable {
        static action: {
            1: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
                ";": {
                    "a": number;
                    "to": number;
                };
            };
            2: {
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            3: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
                ";": {
                    "a": number;
                    "to": number;
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            4: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            5: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            6: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            7: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            8: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            9: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            10: {
                "(": {
                    "a": number;
                    "to": number;
                };
            };
            11: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            12: {
                "(": {
                    "a": number;
                    "to": number;
                };
                ".": {
                    "a": number;
                    "to": number;
                };
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            13: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            14: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            15: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            16: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            17: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            18: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            19: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            20: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            21: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            22: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            23: {
                "id": {
                    "a": number;
                    "to": number;
                };
            };
            24: {
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "}": {
                    "a": number;
                    "to": number;
                };
            };
            25: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            26: {
                "$": {
                    "a": number;
                };
            };
            27: {
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            28: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            29: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            30: {
                "=": {
                    "a": number;
                    "to": number;
                };
            };
            31: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            32: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            33: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            34: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            35: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            36: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            37: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            38: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            39: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            40: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            41: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            42: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            43: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            44: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            45: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            46: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            47: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            48: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            49: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            50: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            51: {
                "(": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            52: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "to": number;
                };
            };
            53: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            54: {
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
            };
            55: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            56: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            57: {
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            58: {
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            59: {
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            60: {
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            61: {
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            62: {
                "}": {
                    "a": number;
                    "to": number;
                };
            };
            63: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            64: {
                ":": {
                    "a": number;
                    "to": number;
                };
            };
            65: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            66: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            67: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            68: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            69: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            70: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            71: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            72: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            73: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            74: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            75: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            76: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            77: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            78: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            79: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            80: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            81: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            82: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            83: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            84: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            85: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            86: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            87: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            88: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            89: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            90: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            91: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            92: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            93: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            94: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            95: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            96: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            97: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ":": {
                    "a": number;
                    "to": number;
                };
            };
            98: {
                "(": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                ".": {
                    "a": number;
                    "to": number;
                };
            };
            99: {
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            100: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            101: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            102: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            103: {
                ")": {
                    "a": number;
                    "to": number;
                };
            };
            104: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            105: {
                "id": {
                    "a": number;
                    "to": number;
                };
            };
            106: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            107: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            108: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            109: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            110: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            111: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            112: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            113: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            114: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            115: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            116: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            117: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            118: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            119: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            120: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            121: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            122: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            123: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            124: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            125: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            126: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            127: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            128: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            129: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ".": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            130: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            131: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            132: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            133: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            134: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "to": number;
                };
            };
            135: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            136: {
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            137: {
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            138: {
                "-": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "+": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "!": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "~": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "for": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "(": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CString": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "id": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "{": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "@": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "OXCInt": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "CNumber": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "true": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "false": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "null": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ";": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ",": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "$": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "*": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "/": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "%": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<<<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">>>": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ">": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "<": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "=": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "^": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "|": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "&&": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "||": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "?": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ")": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                ":": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            139: {
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
            140: {
                ":": {
                    "a": number;
                    "to": number;
                };
            };
            141: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "~": {
                    "a": number;
                    "to": number;
                };
                "for": {
                    "a": number;
                    "to": number;
                };
                "(": {
                    "a": number;
                    "to": number;
                };
                "CInt": {
                    "a": number;
                    "to": number;
                };
                "OXCInt": {
                    "a": number;
                    "to": number;
                };
                "CNumber": {
                    "a": number;
                    "to": number;
                };
                "CString": {
                    "a": number;
                    "to": number;
                };
                "true": {
                    "a": number;
                    "to": number;
                };
                "false": {
                    "a": number;
                    "to": number;
                };
                "null": {
                    "a": number;
                    "to": number;
                };
                "id": {
                    "a": number;
                    "to": number;
                };
                "@": {
                    "a": number;
                    "to": number;
                };
                "{": {
                    "a": number;
                    "to": number;
                };
            };
            142: {
                "-": {
                    "a": number;
                    "to": number;
                };
                "+": {
                    "a": number;
                    "to": number;
                };
                "!": {
                    "a": number;
                    "to": number;
                };
                "*": {
                    "a": number;
                    "to": number;
                };
                "/": {
                    "a": number;
                    "to": number;
                };
                "%": {
                    "a": number;
                    "to": number;
                };
                "<<": {
                    "a": number;
                    "to": number;
                };
                ">>": {
                    "a": number;
                    "to": number;
                };
                "<<<": {
                    "a": number;
                    "to": number;
                };
                ">>>": {
                    "a": number;
                    "to": number;
                };
                ">": {
                    "a": number;
                    "to": number;
                };
                "<": {
                    "a": number;
                    "to": number;
                };
                "=": {
                    "a": number;
                    "to": number;
                };
                "&": {
                    "a": number;
                    "to": number;
                };
                "^": {
                    "a": number;
                    "to": number;
                };
                "|": {
                    "a": number;
                    "to": number;
                };
                "&&": {
                    "a": number;
                    "to": number;
                };
                "||": {
                    "a": number;
                    "to": number;
                };
                "?": {
                    "a": number;
                    "to": number;
                };
                ",": {
                    "a": number;
                    "to": number;
                };
                "}": {
                    "a": number;
                    "c": {
                        "id": number;
                        "head": string;
                        "code": boolean;
                        "exp": number;
                    };
                };
            };
        };
        static go: {
            1: {
                "stmts": number;
                "stmt": number;
                "expr": number;
                "device": number;
                "atr": number;
                "objValue": number;
                "start": number;
            };
            2: {};
            3: {
                "stmts": number;
                "stmt": number;
                "expr": number;
                "device": number;
                "atr": number;
                "objValue": number;
            };
            4: {};
            5: {};
            6: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            7: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            8: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            9: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            10: {};
            11: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            12: {
                "funcCallEnd": number;
            };
            13: {};
            14: {};
            15: {};
            16: {};
            17: {};
            18: {};
            19: {};
            20: {};
            21: {};
            22: {};
            23: {};
            24: {
                "objValueItems": number;
                "objectKey": number;
            };
            25: {};
            26: {};
            27: {};
            28: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            29: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            30: {};
            31: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            32: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            33: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            34: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            35: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            36: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            37: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            38: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            39: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            40: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            41: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            42: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            43: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            44: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            45: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            46: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            47: {};
            48: {};
            49: {};
            50: {};
            51: {
                "atr": number;
                "objValue": number;
            };
            52: {};
            53: {
                "expr": number;
                "atr": number;
                "objValue": number;
                "callParams": number;
            };
            54: {};
            55: {};
            56: {};
            57: {};
            58: {};
            59: {};
            60: {};
            61: {};
            62: {};
            63: {};
            64: {};
            65: {};
            66: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            67: {};
            68: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            69: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            70: {};
            71: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            72: {};
            73: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            74: {};
            75: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            76: {};
            77: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            78: {};
            79: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            80: {};
            81: {};
            82: {};
            83: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            84: {};
            85: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            86: {};
            87: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            88: {};
            89: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            90: {};
            91: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            92: {};
            93: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            94: {};
            95: {};
            96: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            97: {};
            98: {
                "funcCallEnd": number;
            };
            99: {};
            100: {};
            101: {};
            102: {};
            103: {};
            104: {};
            105: {};
            106: {};
            107: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            108: {};
            109: {};
            110: {};
            111: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            112: {};
            113: {};
            114: {};
            115: {};
            116: {};
            117: {};
            118: {};
            119: {};
            120: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            121: {};
            122: {};
            123: {};
            124: {};
            125: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            126: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            127: {
                "expr": number;
                "atr": number;
                "objValue": number;
                "callParams": number;
            };
            128: {};
            129: {};
            130: {};
            131: {};
            132: {};
            133: {};
            134: {};
            135: {};
            136: {};
            137: {
                "objValueItems": number;
                "objectKey": number;
            };
            138: {};
            139: {};
            140: {};
            141: {
                "expr": number;
                "atr": number;
                "objValue": number;
            };
            142: {};
        };
    }
}
declare namespace lib {
    class Scanner {
        start: any;
        moves: any;
        endInfos: any;
        befores: any;
        inputs: any;
        tokenPos: any;
        tokenContent: any;
        tokenContentLength: any;
        commonInfo: any;
        lastToken: any;
        constructor();
        setCommonInfo(info: any): void;
        setTokenContent(content: any): void;
        getNextToken(): any;
        getFilePosInfo(content: any, pos: any): string;
        installId(commonInfo: any, content: any): any;
        getTokenComplete(token: any, content: any): any;
    }
}
declare namespace lib {
    class ScannerTable {
        static moves: {
            0: {
                9: number;
                10: number;
                13: number;
                32: number;
                33: number;
                34: number;
                36: number;
                37: number;
                38: number;
                39: number;
                40: number;
                41: number;
                42: number;
                43: number;
                44: number;
                45: number;
                46: number;
                47: number;
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                58: number;
                59: number;
                60: number;
                61: number;
                62: number;
                63: number;
                64: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                94: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
                123: number;
                124: number;
                125: number;
                126: number;
                12288: number;
            };
            1: {
                9: number;
                10: number;
                13: number;
                32: number;
                12288: number;
            };
            2: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            3: {};
            4: {};
            5: {};
            6: {};
            7: {};
            8: {};
            9: {};
            10: {};
            11: {};
            12: {};
            13: {};
            14: {
                62: number;
            };
            15: {
                60: number;
            };
            16: {};
            17: {
                124: number;
            };
            18: {
                38: number;
            };
            19: {};
            20: {};
            21: {};
            22: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
            };
            23: {};
            24: {};
            25: {};
            26: {
                46: number;
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                88: number;
                120: number;
            };
            27: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            28: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            29: {
                62: number;
            };
            30: {
                60: number;
            };
            31: {};
            32: {};
            33: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
            };
            34: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
            };
            35: {};
            36: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            37: {};
            38: {};
            39: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            40: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            41: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            42: {
                9: number;
                10: number;
                13: number;
                32: number;
                33: number;
                34: number;
                36: number;
                37: number;
                38: number;
                39: number;
                40: number;
                41: number;
                42: number;
                43: number;
                44: number;
                45: number;
                46: number;
                47: number;
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                58: number;
                59: number;
                60: number;
                61: number;
                62: number;
                63: number;
                64: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                94: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
                123: number;
                124: number;
                125: number;
                126: number;
                12288: number;
                20013: number;
            };
            43: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            44: {
                46: number;
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
            };
            45: {
                9: number;
                10: number;
                13: number;
                32: number;
                33: number;
                34: number;
                36: number;
                37: number;
                38: number;
                39: number;
                40: number;
                41: number;
                42: number;
                43: number;
                44: number;
                45: number;
                46: number;
                47: number;
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                58: number;
                59: number;
                60: number;
                61: number;
                62: number;
                63: number;
                64: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                94: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
                123: number;
                124: number;
                125: number;
                126: number;
                12288: number;
                20013: number;
            };
            46: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            47: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            48: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            49: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            50: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            51: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            52: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
            };
            53: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            54: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            55: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            56: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            57: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
            58: {
                48: number;
                49: number;
                50: number;
                51: number;
                52: number;
                53: number;
                54: number;
                55: number;
                56: number;
                57: number;
                65: number;
                66: number;
                67: number;
                68: number;
                69: number;
                70: number;
                71: number;
                72: number;
                73: number;
                74: number;
                75: number;
                76: number;
                77: number;
                78: number;
                79: number;
                80: number;
                81: number;
                82: number;
                83: number;
                84: number;
                85: number;
                86: number;
                87: number;
                88: number;
                89: number;
                90: number;
                95: number;
                97: number;
                98: number;
                99: number;
                100: number;
                101: number;
                102: number;
                103: number;
                104: number;
                105: number;
                106: number;
                107: number;
                108: number;
                109: number;
                110: number;
                111: number;
                112: number;
                113: number;
                114: number;
                115: number;
                116: number;
                117: number;
                118: number;
                119: number;
                120: number;
                121: number;
                122: number;
            };
        };
        static start: number;
        static endInfos: {
            1: boolean;
            2: boolean;
            3: boolean;
            4: boolean;
            5: boolean;
            6: boolean;
            7: boolean;
            8: boolean;
            9: boolean;
            10: boolean;
            11: boolean;
            12: boolean;
            13: boolean;
            14: boolean;
            15: boolean;
            16: boolean;
            17: boolean;
            18: boolean;
            19: boolean;
            20: boolean;
            21: boolean;
            22: boolean;
            23: boolean;
            24: boolean;
            25: boolean;
            26: boolean;
            27: boolean;
            28: boolean;
            29: boolean;
            30: boolean;
            31: boolean;
            32: boolean;
            33: boolean;
            34: boolean;
            35: boolean;
            36: boolean;
            37: boolean;
            38: boolean;
            39: boolean;
            40: boolean;
            41: boolean;
            43: boolean;
            44: boolean;
            46: boolean;
            47: boolean;
            48: boolean;
            49: boolean;
            50: boolean;
            51: boolean;
            53: boolean;
            54: boolean;
            55: boolean;
            56: boolean;
            57: boolean;
            58: boolean;
        };
        static befores: {};
        static inputs: {
            9: boolean;
            10: boolean;
            13: boolean;
            32: boolean;
            33: boolean;
            34: boolean;
            36: boolean;
            37: boolean;
            38: boolean;
            39: boolean;
            40: boolean;
            41: boolean;
            42: boolean;
            43: boolean;
            44: boolean;
            45: boolean;
            46: boolean;
            47: boolean;
            48: boolean;
            49: boolean;
            50: boolean;
            51: boolean;
            52: boolean;
            53: boolean;
            54: boolean;
            55: boolean;
            56: boolean;
            57: boolean;
            58: boolean;
            59: boolean;
            60: boolean;
            61: boolean;
            62: boolean;
            63: boolean;
            64: boolean;
            65: boolean;
            66: boolean;
            67: boolean;
            68: boolean;
            69: boolean;
            70: boolean;
            71: boolean;
            72: boolean;
            73: boolean;
            74: boolean;
            75: boolean;
            76: boolean;
            77: boolean;
            78: boolean;
            79: boolean;
            80: boolean;
            81: boolean;
            82: boolean;
            83: boolean;
            84: boolean;
            85: boolean;
            86: boolean;
            87: boolean;
            88: boolean;
            89: boolean;
            90: boolean;
            94: boolean;
            95: boolean;
            97: boolean;
            98: boolean;
            99: boolean;
            100: boolean;
            101: boolean;
            102: boolean;
            103: boolean;
            104: boolean;
            105: boolean;
            106: boolean;
            107: boolean;
            108: boolean;
            109: boolean;
            110: boolean;
            111: boolean;
            112: boolean;
            113: boolean;
            114: boolean;
            115: boolean;
            116: boolean;
            117: boolean;
            118: boolean;
            119: boolean;
            120: boolean;
            121: boolean;
            122: boolean;
            123: boolean;
            124: boolean;
            125: boolean;
            126: boolean;
            12288: boolean;
            20013: boolean;
        };
    }
}
declare namespace lib {
    class TokenType {
        static Type: any;
        static TokenTrans: any;
    }
}
declare namespace lib {
    class CallParams {
        type: string;
        list: any[];
        constructor();
        addParam(expr: any): void;
        addParamAt(expr: any, index: number): void;
        checkPropertyBinding(commonInfo: any): void;
        getValueList(): any[];
    }
}
declare namespace lib {
    class DeviceStmt {
        constructor();
        checkPropertyBinding(commonInfo: any): void;
        getValue(): any;
    }
}
declare namespace lib {
    class Expr {
        type: any;
        expr1: any;
        expr2: any;
        expr3: any;
        constructor(type: any, expr1?: any, expr2?: any, expr3?: any);
        checkPropertyBinding(commonInfo: any): void;
        getValue(params: any): any;
        setValue(val: any, params: any): void;
    }
}
declare namespace lib {
    class ExprAtr {
        type: string;
        list: any;
        value: any;
        before: any;
        beforeClass: any;
        equalBefore: any;
        constructor();
        addItem(item: any): void;
        checkPropertyBinding(commonInfo: any): void;
        getValue(params?: any): any;
        setValue(val: any, params: any): void;
        getAttribute(name: string): any;
        checkSpecialFor(list: any, binding: any): void;
        print(): string;
    }
}
declare namespace lib {
    class ExprAtrItem {
        type: any;
        val: any;
        getValue: any;
        constructor(type: any, val: any, getValue?: boolean);
    }
}
declare namespace lib {
    class ExprStmt {
        type: string;
        expr: any;
        constructor(expr: any);
        checkPropertyBinding(commonInfo: any): void;
        getValue(): any;
    }
}
declare namespace lib {
    class ObjectAtr {
        list: any[];
        constructor(list: any[]);
        checkPropertyBinding(commonInfo: any): void;
        getValue(): any;
    }
}
declare namespace lib {
    class ParserItem {
        constructor();
    }
}
declare namespace lib {
    class Stmts {
        type: string;
        list: any[];
        constructor();
        addStmt(stmt: any): void;
        addStmtAt(stmt: any, index: number): void;
        checkPropertyBinding(commonInfo: any): void;
        getValue(): any;
    }
}
