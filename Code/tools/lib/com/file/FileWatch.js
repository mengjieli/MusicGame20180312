var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fs = require('fs');
var FileWatch = (function (_super) {
    __extends(FileWatch, _super);
    function FileWatch(url) {
        var _this = _super.call(this) || this;
        _this.watchs = {};
        _this.root = url;
        var file = new lib.File(url);
        if (!file.isExist())
            return _this;
        if (file.isDirection()) {
            var list = _this.readDirectionList(url);
            for (var i = 0; i < list.length; i++) {
                _this.addWatch(list[i]);
            }
        }
        else {
            _this.watchFile(url);
        }
        return _this;
    }
    FileWatch.prototype.addWatch = function (url) {
        if (this.watchs[url]) {
            return;
        }
        this.watchs[url] = fs.watch(url, function (event, filename) {
            if (filename.split(".")[filename.split(".").length - 1].indexOf("_") != -1) {
                return;
            }
            var fileURL = url + "/" + filename;
            var file = new lib.File(fileURL);
            if (file.isExist() && file.isDirection()) {
                this.addWatch(fileURL);
            }
            if (!file.isExist()) {
                if (this.watchs[fileURL]) {
                    return;
                }
            }
            if (!file.isExist() || !file.isDirection()) {
                this.dispatchEvent(new lib.Event(lib.Event.UPDATE, file));
            }
        }.bind(this));
    };
    FileWatch.prototype.watchFile = function (url) {
        var file = new lib.File(url);
        var name = file.name + "." + file.end;
        fs.watch(file.direction, function (event, filename) {
            if (filename.split(".")[filename.split(".").length - 1].indexOf("_") != -1) {
                return;
            }
            if (filename == name) {
                var file = new lib.File(url);
                this.dispatchEvent(new lib.Event(lib.Event.UPDATE, file));
            }
        }.bind(this));
    };
    FileWatch.prototype.readDirectionList = function (url) {
        var list = [];
        var dirs = (new lib.File(url)).readDirectionList();
        for (var i = 0; i < dirs.length; i++) {
            if (dirs[i].isDirection()) {
                list.push(dirs[i].url);
            }
        }
        return list;
    };
    return FileWatch;
}(lib.EventDispatcher));

global.lib.FileWatch = FileWatch;