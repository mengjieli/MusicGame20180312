declare namespace lib {

    /**
     * 事件对象
     */
    export class Event {

        /**
         * 事件名称
         * @param {string} type
         * @param data
         */
        constructor(type: string, data: any);

        /**
         * 事件名称
         */
        public type: string;

        /**
         * 事件内容
         */
        public data: any;

        static CONNECT: string;
        static CONNECT_ERROR: string;
        static ERROR: string;
        static CLOSE: string;
        static UPDATE: string;
        static DATA: string;
    }

    /**
     * 事件抛出对象
     */
    export class EventDispatcher {

        constructor();

        /**
         * 监听事件
         * @param {string} eventName 事件名称
         * @param {(event: com.Event) => {}} back
         * @param owner
         */
        public addEventListener(eventName: string, back: (event: Event) => void, owner?: any): void;

        /**
         * 是否拥有某个事件
         * @param {string} eventName
         * @returns {boolean}
         */
        public hasEventListener(eventName: string): boolean;

        /**
         * 抛出事件
         * @param {com.Event} event
         */
        public dispatchEvent(event: Event): void;

        /**
         * 快速抛出事件
         * @param {string} eventName
         */
        public dispatchWith(eventName: string): void;

        /**
         * 移除事件监听
         * @param {string} eventName
         * @param {Function} back
         */
        public removeEventListener(eventName: string, back: Function): void;

        /**
         * 移除 owner 上的所有事件
         * @param owner
         */
        public removeEventsByOwner(owner: any): void;

        /**
         * 清楚内存
         */
        public dispose(): void;
    }

    /**
     * 文件或文件夹对象
     */
    export class File {

        /**
         * 构造函数
         * @param {string} url 文件目录
         */
        constructor(url: string);

        /*
         * 目录
         */
        public readonly url: string;

        /**
         * 文件所在文件夹目录
         */
        public readonly direction: string;

        /**
         * 文件名称
         */
        public readonly name: string;

        /**
         * 文件后缀
         */
        public readonly end: string;

        /**
         * 文件或文件夹大小
         */
        public readonly size: number;

        /**
         * 最后改变时间
         */
        public readonly changeTime: string;

        /**
         * 最后修改时间
         */
        public readonly modifyTime: string;

        /**
         * 创建时间
         */
        public readonly createTime: string;

        /**
         * 文件或文件夹是否存在
         * @returns {boolean}
         */
        public isExist(): boolean;

        /**
         * 是否为文件夹
         * @returns {boolean}
         */
        public isDirection(): boolean;

        /**
         * 保存文件
         * @param data
         * @param {string} format
         * @param {string} url
         */
        public save(data: any, format?: string, url?: string): void;

        /**
         * 读取文件内容
         * @param {string} format
         * @param {string} backFormat
         * @returns {any}
         */
        public readContent(format?: string, backFormat?: string): any;

        /**
         * 读取文件夹下所有指定后缀的文件列表
         * @param {string | string[]} ends
         * @returns {com.File[]}
         */
        public readFilesWidthEnd(ends: string | string[]): File[];

        /**
         * 读取文件夹下所有文件夹列表
         * @returns {com.File[]}
         */
        public readDirectionList(): File[];

        /**
         * 删除文件或文件夹
         */
        public delete(): void;

        /**
         * 创建文件夹目录
         * @param {string} dirpath
         */
        public static mkdirsSync(dirpath: string): void;
    }

    /**
     * 文件数据模式
     */
    export class FileFormat {
        /**
         * utf-8
         */
        public static UTF8: string;

        /**
         * binary
         */
        public static BINARY: string;
    }

    /**
     * 二进制数据
     */
    export class ByteArray {

        /**
         * 构造函数
         * @param {number[]} array 传统数组，可传入传统的数组初始化二进制数据
         */
        constructor(array?: number[]);

        /**
         * 剩余数据长度
         */
        public readonly bytesAvailable: number;

        /**
         * 指针位置
         */
        public position: number;

        /**
         * 内容长度
         */
        public readonly length: number;

        /**
         * 用数组初始化二进制数据
         * @param {number[]} array
         */
        public initArray(array: number[]): void;

        /**
         * 写入整数 4位
         * @param {number} val
         */
        public writeInt(val: number): void;

        /**
         * 写入字节 1位
         * @param {number} val
         */
        public writeByte(val: number): void;

        /**
         * 写入数组数据
         * @param {number[]} val
         */
        public writeArray(val: number[]): void;

        /**
         * 写入 bool 值 1位
         * @param {boolean} val
         */
        public writeBoolean(val: boolean): void;

        /**
         * 写入无符号整数 4 位
         * @param {number} val
         */
        public writeUnsignedInt(val: number): void;

        /**
         * 写入短整数 2 位
         * @param {number} val
         */
        public writeShort(val: number): void;

        /**
         * 写入无符号短整数 2位
         * @param {number} val
         */
        public writeUnsignedShort(val: number): void;

        /**
         * 写入utf-8字符串，前面带内容长度 2位
         * @param {string} val
         */
        public writeUTF(val: string): void;

        /**
         * 写入utf-8字符串内容，前面不带长度
         * @param {string} val
         */
        public writeUTFBytes(val: string): void;

        /**
         *
         * @returns {number}
         */
        public readInt(): number;

        public readInt64(): number;

        public readUnsignedInt(): number;

        public readByte(): number;

        public readShort(): number;

        public readUnsignedShort(): number;

        public readUTF(): number;

        public readUTFBytes(len: number): string;
    }

    /**
     * 系统信息
     */
    export class System {

        static WINDOWS: string;
        static MACOS: string;

        /**
         * 操作系统平台 System.WINDOWS 或其它
         */
        static platform: string;
        static hostName: string;
        static IP: string;
    }

    /**
     * 文件变化检测
     * @Event lib.Event.UPDATE 监听变化 (e)=>{}   e.data is lib.File
     */
    export class FileWatch extends EventDispatcher {

        /**
         * 构造函数
         * @param {string} url 文件或文件夹目录
         */
        constructor(url: string);
    }
}