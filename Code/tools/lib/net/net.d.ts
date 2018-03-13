declare namespace lib {

    /**
     * WebSocket
     */
    class WebSocketServer {

        constructor(clientClass: any);

        /**
         * 开启服务器
         * @param {number} port 服务器端口号
         */
        public start(port: number): void;

        /**
         * 连上客户端
         * @param request
         */
        protected onConnectClient(request: any): WebSocketServerClient;

        /**
         * 客户端断开连接
         * @param {com.Event} event
         */
        protected onCloseClient(event: Event): void;

        /**
         * 给所有客户端发送消息
         * @param {lib.ByteArray} bytes
         */
        public sendDataToAll(bytes: lib.ByteArray): void;
    }


    export class WebSocketServerClient extends EventDispatcher {

        protected connection: any;

        constructor(connection: any, big?: boolean);

        protected receiveData(message: any): void;

        /**
         * 发送数据
         * @param {lib.ByteArray} data
         */
        public sendData(data: VByteArray): void;

        protected onClose(): void;

        /**
         * 关闭链接
         */
        public close(): void;
    }

    export class WebScoektClient extends EventDispatcher {

        constructor();

        /**
         * 连接服务器
         * @param {string} ip
         * @param {number} port
         */
        public connect(ip: string, port: number): void;

        /**
         * 连上服务器
         * @param connection
         */
        protected onConnect(connection: any): void;

        /**
         * 连接服务器出错
         * @param error
         */
        protected onConnectError(error: Error): void;

        /**
         * 连接错误
         * @param {Error} error
         */
        protected onError(error: Error): void;

        /**
         * 与服务器断开连接
         */
        protected onClose(): void;

        /**
         * 收到消息
         * @param message
         */
        protected receiveData(message: any): void;

        /**
         * 发送数据
         * @param {lib.ByteArray} data
         */
        public sendData(data: VByteArray): void;

        /**
         * 关闭链接
         */
        public close(): void;

    }

    export class VByteArray {

        /**
         * 消息是大端还是小端
         */
        public readonly big: boolean;

        /**
         * 读写指针位置
         */
        public position: number;

        /**
         * 消息体长度
         */
        public length: number;

        public readonly data: number[];

        /**
         * 构造函数
         * @param {boolean} big 默认为true
         */
        constructor(big?: boolean);

        /**
         * 从原生字节流中读取数据
         * @param bytes
         */
        public readFromByteArray(bytes: any): void;

        /**
         * 从数组中读取数据
         * @param {number[]} array
         */
        public readFromArray(array: number[]): void;

        /**
         * 把数据写到原生字节流中
         * @param {number} bytes
         */
        public writeToByteArray(bytes: number): void;

        /**
         * 写 int
         * @param {number} val
         */
        public writeIntV(val: number): void;

        public writeUIntV(val: number): void;

        public writeByte(val: number): void;

        public writeBoolean(bool: boolean): void;

        public writeUTFV(val: string): void;

        public writeUTFBytes(val: string): void;

        public writeBytes(vbyteArray: VByteArray, start: number, length: number): void;

        public writeByteArray(byteArray: any): void;

        public readBoolean(): boolean;

        public readIntV(): number;

        public readUIntV(): number;

        public readByte(): number;

        public readUTFV(): string;

        public readUTFBytes(): string;

        public getData(): number[];

        public bytesAvailable(): number;
    }

    /**
     * @Event lib.Event.COMPLETE
     * @Event lib.Event.DATA
     * @Event lib.Event.CLOSE
     */
    export class HttpRequest {

        /**
         * 构造函数
         * @param {string} serverIp
         * @param {number} port
         * @param {string} path
         * @param {string} encoding
         */
        constructor(serverIp: string, port: number, path?: string, encoding?: string);
    }

    export class HttpServer {

        constructor(port: number, root?: string)

        /**
         * 启动服务器
         */
        public start(): void;

        /**
         * 设置中转服务器，如果是这个 ip 来的请求，就统一转到 toServer:toPort 上
         * @param {string} ip
         * @param {string} toServer
         * @param {number} toPort
         */
        public setTransIP(ip: string, toServer: string, toPort: number): void;

        protected onReciveRequest(request: any, response: any): void;

        protected onReciveRequest(request: any, response: any): void;

        /**
         * 拒绝服务
         * @param response
         */
        protected refusal(request: any, response: any, text?: string): void;

        /**
         * 发送文字内容
         * @param request
         * @param response
         * @param {string} text
         */
        protected send(request: any, response: any, content: string | Buffer, type?: string, format?: string): void;
    }

    /**
     * HttpResponse 文件类型
     */
    export class HttpResponseType {
        public static CSS: string;
        public static GIF: string;
        public static HTML: string;
        public static ICO: string;
        public static JPEG: string;
        public static JPG: string;
        public static JS: string;
        public static JSON: string;
        public static PDF: string;
        public static ZIP: string;
        public static PNG: string;
        public static SVG: string;
        public static SWF: string;
        public static TIFF: string;
        public static TXT: string;
        public static WAV: string;
        public static WMA: string;
        public static WMV: string;
        public static XML: string;
    }

    export class HttpResponseEncoding {
        public static UTF8: string;
        public static BINARY: string;
    }
}