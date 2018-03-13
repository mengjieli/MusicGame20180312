var Event = (function () {
    function Event(type, data) {
        this.type = type;
        this.data = data;
    }

    var d = __define, c = Event;
    p = c.prototype;

    Event.CONNECT = "connect";
    Event.CONNECT_ERROR = "connect_error";
    Event.ERROR = "error";
    Event.CLOSE = "close";
    Event.UPDATE = "update";
    Event.DATA = "data";

    return Event;
})();

global.lib.Event = Event;