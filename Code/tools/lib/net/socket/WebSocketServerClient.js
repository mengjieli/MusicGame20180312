var WebSocketServerClient = (function (_super) {
    __extends(WebSocketServerClient, _super);

    function WebSocketServerClient(connection, big) {
        _super.call(this);
        if (big === void 0) {
            big = true;
        }
        this.big = big;
        this.connection = connection;
        var _this = this;
        this.connection.on('message', this.receiveData.bind(this));
        this.connection.on('close', this.onClose.bind(this));
    }

    var d = __define, c = WebSocketServerClient;
    p = c.prototype;

    p.receiveData = function (message) {
        //if(message.type == "binary") {
        //    var data = message.binaryData;
        //    var byte = new VByteArray();
        //    byte.readFromArray(data);
        //}
        //if(message.type == "utf8") {
        //    var data = message.utf8Data;
        //}
    }

    p.sendData = function (bytes) {
        if (this.type == "binary") {
            this.connection.sendBytes(new Buffer(bytes.data));
        } else {
            var str = "[";
            var array = bytes.data;
            for (var i = 0; i < array.length; i++) {
                str += array[i] + (i < array.length - 1 ? "," : "");
            }
            str += "]";
            this.connection.sendUTF(str);
        }
    }
    
    p.close = function () {
        this.connection.close();
    }

    p.onClose = function () {
        this.dispatchEvent(new lib.Event(lib.Event.CLOSE));
    }

    return WebSocketServerClient;
})(lib.EventDispatcher);

global.lib.WebSocketServerClient = WebSocketServerClient;