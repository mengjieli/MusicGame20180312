var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('./ca-key.pem', 'utf8');
var certificate = fs.readFileSync('./ca-cert.pem', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate,
    passphrase: "111111",
    path: "/Users/guanliyuan/Documents/baili/bamaoProj/Code/"
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function () {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

// Welcome
app.get('/', function (req, res) {
    console.log("...", req.url);
    if (req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    }
    else {
        res.status(200).send('Welcome!');
    }
});

app.get("/a.html", function (req, res) {
    res.sendFile("/Users/guanliyuan/Documents/baili/bamaoProj/Code/a.html");
});

app.get("/b.html", function (req, res) {
    res.sendFile("/Users/guanliyuan/Documents/baili/bamaoProj/Code/b.html");
});