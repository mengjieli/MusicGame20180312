require("./../lib/com/requirecom");
require("./../lib/net/requirenet");
var modules = [];
var moduleFiles = {};

function readModules(change) {
    if (change === void 0) {
        change = false;
    }
    if (!change)
        modules = [];
    var file = new lib.File("./modules.json");
    if (file.isExist()) {
        if (!change)
            modules = [];
        var cfg;
        try {
            cfg = JSON.parse(file.readContent());
            var list = cfg.modules;
            for (var i = 0; i < list.length; i++) {
                var name = list[i];
                var find = false;
                for (var f = 0; f < modules.length; f++) {
                    if (modules[f].name == name) {
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    modules.push({
                        name: name,
                        content: "",
                        files: {}
                    });
                    readModule(modules[modules.length - 1]);
                }
            }
            if (change) {
                for (var i = 0; i < modules.length; i++) {
                    var moduleName = modules[i].name;
                    var find = false;
                    for (var f = 0; f < list.length; f++) {
                        if (list[f] == moduleName) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        modules.splice(i, 1);
                        delete moduleFiles[moduleName];
                    }
                }
            }
        } catch (e) {

            modules = [];
        }

    }
    writeFileToCocos();
}

function writeFileToCocos() {
    var tscfg = {
        "compilerOptions": {
            "module": "system",
            "target": "ES2015",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "watch": true,
            "outFile": "./MergeSRC.js"
        },
        "files": [
            "./lib/creator.d.ts",
            "./lib/pureMVC.d.ts",
            "./lib/lib.d.ts",
            "./lib/game.d.ts"
        ]
    };
    for (var i = 0; i < modules.length; i++) {
        for (var f = 0; f < modules[i].files.length; f++) {
            if (moduleFiles[modules[i].name] && moduleFiles[modules[i].name][modules[i].files[f]]) {
                tscfg.files.push("./modules/" + modules[i].name + "/src/" + modules[i].files[f]);
            }
        }
    }
    var file = new lib.File("./tsconfig.json");
    file.save(JSON.stringify(tscfg));
    file = new lib.File("./modules.json");
    file.save(file.readContent(), lib.FileFormat.UTF8, "./../BaMao/assets/modules.json");
    var content = "";
    for (var i = 0; i < modules.length; i++) {
        content += "//////////Module " + modules[i].name + "//////////\n" + modules[i].content + "\n\n";
    }
    content += "window.game = game;\n";
    var file = new lib.File("./../BaMao/assets/src/GameCode.ts");
    file.save(content);
}

function readModule(info, change) {
    if (change === void 0) {
        change = false;
    }
    var name = info.name;
    var moduleURL = "modules/" + name + "/module.json";
    var file = new lib.File(moduleURL);
    var content = "";
    if (!change)
        moduleFiles[name] = {};
    if (!file.isExist())
        return;
    try {
        var moduleConfig = JSON.parse(file.readContent());
        var fileList = moduleConfig.src;
        if (!change)
            watchModuleConfig(name);
        info.files = [];
        for (var i = 0; i < fileList.length; i++) {
            var fileName = fileList[i];
            info.files.push(fileName);
            if (!moduleFiles[name][fileName]) {
                var tsfile = new lib.File("modules/" + name + "/src/" + fileName);
                if (tsfile.isExist()) {
                    moduleFiles[name][fileName] = tsfile.readContent();
                }
                else {
                    moduleFiles[name][fileName] = "";
                }
            }
        }
        if (change) {
            for (var key in moduleFiles[name]) {
                var find = false;
                for (var i = 0; i < fileList.length; i++) {
                    if (fileList[i] == key) {
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    delete moduleFiles[name][key];
                }
            }
        }
        readModuleContent(info);
    }
    catch (e) {
    }
}

function readModuleContent(info) {
    var content = "";
    if (moduleFiles[info.name]) {
        for (var i = 0; i < info.files.length; i++) {
            content += "//////////" + info.files[i] + "//////////\n" + moduleFiles[info.name][info.files[i]] + "\n\n";
        }
    }
    info.content = content;
}

function onFileChange(url) {
    var file = new lib.File(url);
    var findModuleName = "";
    var findFileName = "";
    for (var moduleName in moduleFiles) {
        for (var fileName in moduleFiles[moduleName]) {
            if ("./modules/" + moduleName + "/src/" + fileName == file.url) {
                findModuleName = moduleName;
                findFileName = fileName;
                break;
            }
        }
    }
    if (findModuleName != "") {
        if (file.isExist()) {
            moduleFiles[findModuleName][findFileName] = file.readContent();
        }
        else {
            delete moduleFiles[findModuleName][findFileName];
        }
        readModuleContent(getModuleInfo(findModuleName));
        writeFileToCocos();
    }
}

function getModuleInfo(name) {
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].name == name) {
            return modules[i];
        }
    }
}

function watchModuleConfig(name) {
    var watch = new lib.FileWatch("./modules/" + name + "/module.json");
    watch.addEventListener(lib.Event.UPDATE, function (e) {
        // onModuleConfigChange(name);
        addNextDo(onModuleConfigChange, name);
    });
}

function onModuleConfigChange(name) {
    if (!moduleFiles[name])
        return;
    readModule(getModuleInfo(name), true);
    writeFileToCocos();
}

var watch = new lib.FileWatch("./modules.json");
watch.addEventListener(lib.Event.UPDATE, function (e) {
    // readModules(true);
    addNextDo(readModules, true);
});
var tswatch = new lib.FileWatch("./modules");
tswatch.addEventListener(lib.Event.UPDATE, function (e) {
    // onFileChange(e.data);
    addNextDo(onFileChange, e.data.url);
});
readModules();


var calls = [];

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


/**
 * 添加 var calls 到 setInterval(checkNextDo,100); 的代码
 * 修改 3个 lib.Event.UPDATE 的返回
 */