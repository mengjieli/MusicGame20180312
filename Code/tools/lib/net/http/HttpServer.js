var http = require("http");
var URL = require('url');
var query = require("querystring");    //解析POST请求
try {
    var getPixels = require("get-pixels") //npm install --save get-pixels   http://blog.csdn.net/dreamer2020/article/details/51678238
} catch (e) {
    var getPixels = null;
}

var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "text/plain",
    "pdf": "application/pdf",
    "zip": "application/x-zip-compressed",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var HttpResponseType = {
    CSS: mine.css,
    GIF: mine.gif,
    HTML: mine.html,
    ICO: mine.ico,
    JPEG: mine.jpeg,
    JPG: mine.jpeg,
    JS: mine.js,
    JSON: mine.json,
    PDF: mine.pdf,
    ZIP: mine.zip,
    PNG: mine.png,
    SVG: mine.svg,
    SWF: mine.swf,
    TIFF: mine.tiff,
    TXT: mine.txt,
    WAV: mine.wav,
    WMA: mine.wma,
    WMV: mine.wmv,
    XML: mine.xml
};
lib.HttpResponseType = HttpResponseType;

var HttpResponseEncoding = {
    UTF8: "utf-8",
    BINARY: "binary"
}
lib.HttpResponseEncoding = HttpResponseEncoding;

var HttpServer = function (port, root) {
    this.trans = {};
    this.port = port;
    this.root = root || ".";
    if (this.root.charAt(this.root.length - 1) == "/") {
        this.root = this.root.slice(0, this.root.length - 1);
    }
}

HttpServer.prototype.getRequestIP = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

HttpServer.prototype.onReciveRequest = function (request, response) {
    // console.log("[httpReceive]",request.method,request.url,this.root,(new lib.File(this.root)).readDirectionList());
    if (request.method == "GET" || request.method == "HEAD") {
        var ip = this.getRequestIP(request);
        if (this.trans[ip]) {
            this.sendResourceFrom(request, response, this.trans[ip].server, this.trans[ip].port);
        } else {
            this.sendResource(request, response);
        }
    } else if (request.method == "POST") {
        this.receivePost(request, response);
    } else {
    }
}

/**
 * 设置中转服务器，如果是这个 ip 来的请求就转到另外一个服务器
 * @param ip
 * @param toServer
 * @param toPort
 */
HttpServer.prototype.setTransIP = function (ip, toServer, toPort) {
    this.trans[ip] = {
        server: toServer,
        port: toPort
    }
}

/**
 * 从其他服务器请求资源之后再转发
 * @param request
 * @param response
 * @param server
 * @param port
 */
HttpServer.prototype.sendResourceFrom = function (request, response, server, port) {
    var url = request.url;
    url = url.split("?")[0];
    var httpRequest = new lib.HttpRequest(server, port, url);
    httpRequest.localRequest = request;
    httpRequest.localResponse = response;
    httpRequest.encoding = "binary";
    var _this = this;
    httpRequest.addEventListener(Event.CLOSE, function (event) {
        _this.sendResourceWidthData(event.currentTarget.localRequest, event.currentTarget.localResponse, event.currentTarget.data.lenth == 0 ? null : event.currentTarget.data);
    });
    httpRequest.get(null, request.method);
}

HttpServer.prototype.start = function () {
    this.server = http.createServer(this.onReciveRequest.bind(this));
    this.server.listen(this.port);
}

HttpServer.prototype.sendResource = function (request, response) {
    var url = request.url;
    url = url.split("?")[0];
    var file = new lib.File(this.root + url);
    //console.log("request:",url,this.root,process.cwd(),"  file=",file.url,file.isExist());
    if (!file.isExist()) {
        //console.log("[http-server]", this.root + url, " [Error File not exist!]" + "from :" + this.getRequestIP(request));
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write("This request URL " + URL.parse(request.url).pathname + " was not found on this server. from \"" + this.getRequestIP(request) + "\"");
        response.end();
    } else {
        var content;
        end = request.url.split("?")[0];
        end = end.split(".")[end.split(".").length - 1];
        // if (params.img == "base64") {
        //     getPixels(file.url, function (err, pixels) {
        //         end = "txt";
        //         content = new Buffer(file.readContent("binary"), 'binary').toString('base64');
        //         content = pixels.shape[0] + "," + pixels.shape[1] + "|" + content;
        //         console.log(content, content.length);
        //         var buffer = new Buffer(content);
        //         response.writeHead(200, {
        //             "Content-Length": buffer.length,
        //             "Content-Type": mine[end],
        //             "Access-Control-Allow-Origin": "*",
        //             "Accept-Ranges": "bytes",
        //             "Last-Modified": file.state.mtime.toString()
        //         });
        //         if (request.method != "HEAD") {
        //             response.write(buffer, "binary");
        //         }
        //         response.end();
        //     })
        // } else {
        content = file.readContent("binary");
        response.writeHead(200, {
            "Content-Length": file.size,
            "Content-Type": mine[txt],
            "Access-Control-Allow-Origin": "*",
            "Accept-Ranges": "bytes",
            "Last-Modified": file.modifyTime
        });
        if (request.method != "HEAD") {
            response.write(content, "binary");
        }
        response.end();
        // }
    }
}

HttpServer.prototype.send = function (request, response, content, type, format) {
    content = content || "";
    type = type || "txt";
    format = format || "utf-8";
    response.writeHead(200, {
        "Content-Length": content.length,
        "Content-Type": type,
        "Access-Control-Allow-Origin": "*",
        "Accept-Ranges": "bytes"
    });
    if (request.method != "HEAD") {
        response.write(content, format);
    }
    response.end();
}

HttpServer.prototype.refusal = function (request, response, content) {
    content = content || "404";
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.write(content);
    response.end();
}

HttpServer.prototype.sendResourceWidthData = function (request, response, data) {
    var url = request.url;
    url = url.split("?")[0];
    if (request.method == "GET" && !data) {
        // console.log("[http-server]", this.root + url, " [Error File not exist!]");
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write("This request URL " + URL.parse(request.url).pathname + " was not found on this server.");
        response.end();
    } else {
        end = request.url.split("?")[0];
        end = end.split(".")[end.split(".").length - 1];
        response.writeHead(200, {
            "Content-Length": file.size,
            "Content-Type": mine[end],
            "Access-Control-Allow-Origin": "*",
            "Accept-Ranges": "bytes",
            "Last-Modified": file.modifyTime
        });
        if (request.method != "HEAD") {
            response.write(data, "binary");
        }
        response.end();
    }
}

HttpServer.prototype.sendContent = function (request, response, content) {
    if (!content) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write("This request URL " + URL.parse(request.url).pathname + " was not found on this server.");
        response.end();
    } else {
        end = request.url.split("?")[0];
        end = end.split(".")[end.split(".").length - 1];
        response.writeHead(200, {
            "Content-Length": file.size,
            "Content-Type": mine[end],
            "Access-Control-Allow-Origin": "*",
            "Accept-Ranges": "bytes",
            "Last-Modified": file.modifyTime
        });
        response.write(content, "binary");
        response.end();
    }
}

HttpServer.prototype.receivePost = function (request, response) {
    var postdata = "";
    request.addListener("data", function (postchunk) {
        postdata += postchunk;
    });
    var _this = this;
    //POST结束输出结果
    request.addListener("end", function () {
        _this.receivePostComplete(request, response, postdata);
    });
}

HttpServer.prototype.receivePostComplete = function (request, response, data) {

}

HttpServer.prototype.sendMessage = function (response, message) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*"
    });
    response.write(message);
    response.end();
}

HttpServer.prototype.close = function () {
    this.server.removeAllListeners();
    this.server.close();
}

global.lib.HttpServer = HttpServer;