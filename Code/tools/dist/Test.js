require("./../lib/com/requirecom");
var file = new lib.File("dist/A.txt");
console.log(file.isExist());
file.save("GGGG");
var file = new lib.File("dist/A.txt");
console.log(file.isExist());
console.log(file.readContent());
var calls = [];
function checkExist(url) {
    console.log("check ", url, (new lib.File(url)).isExist());
}
function addNextDo(call) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    calls.push([call, args]);
}
function checkNextDo() {
    while (calls.length) {
        var info = calls.shift();
        info[0].apply(null, info[1]);
    }
}
setInterval(checkNextDo, 100);
var fileWatch = new lib.FileWatch("./ts");
fileWatch.addEventListener(lib.Event.UPDATE, function (e) {
    // console.log("change", e.data.url, e.data.isExist());
    addNextDo(checkExist, e.data.url);
});
