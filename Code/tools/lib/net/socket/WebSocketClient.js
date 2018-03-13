var WSClient = require('websocket').client;

var WebScoektClient = (function (_super) {

    __extends(WebScoektClient, _super);

    function WebScoektClient() {
        _super.call(this);
        this.client = new WSClient();
        this.client.on("connectFailed", this.onConnectError.bind(this));
        this.client.on("connect", this.onConnect.bind(this));
    }

    var d = __define, c = WebScoektClient;
    var p = c.prototype;

    p.connect = function (ip, port) {
        this.ip = ip;
        this.port = port;
        this.client.connect("ws://" + ip + ":" + port + "/");
    }

    p.onConnect = function (connection) {
        //console.log('[connect]',"ws://" + this.ip + ":" + this.port + "/");
        this.connection = connection;
        connection.on('error', this.onError.bind(this));
        connection.on('close', this.onClose.bind(this));
        connection.on('message', this.receiveData.bind(this));
    }

    p.onConnectError = function (error) {
        //console.log('Connect Error: ' + error.toString());
    }

    p.onError = function (error) {
        //console.log("Connection Error: " + error.toString());
    }

    p.onClose = function () {
        //console.log('echo-protocol Connection Closed');
    }

    p.receiveData = function (message) {

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

    return WebScoektClient;
})(lib.EventDispatcher);


global.lib.WebScoektClient = WebScoektClient;