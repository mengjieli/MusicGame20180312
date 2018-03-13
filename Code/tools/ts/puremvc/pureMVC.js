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
var mvc;
(function (mvc) {
    var Controller = (function () {
        function Controller(key) {
            if (Controller.instanceMap[key] != null) {
                throw new Error(Controller.MULTITON_MSG);
            }
            this._multitonKey = key;
            Controller.instanceMap[this._multitonKey] = this;
            this.commandMap = {};
            this.initializeController();
        }
        Object.defineProperty(Controller.prototype, "multitonKey", {
            get: function () {
                return this._multitonKey;
            },
            enumerable: true,
            configurable: true
        });
        Controller.prototype.initializeController = function () {
            this.view = mvc.View.getInstance(this._multitonKey);
        };
        Controller.prototype.registerCommand = function (notificationName, commandClass) {
            if (this.commandMap[notificationName]) {
                throw new Error(Controller.CONTROLLER_MSG);
            }
            this.view.registerObserver(notificationName, new mvc.Observer(this.executeCommand, this));
            this.commandMap[notificationName] = commandClass;
        };
        Controller.prototype.hasCommand = function (notificationName) {
            return this.commandMap[notificationName] ? true : false;
        };
        Controller.prototype.removeCommand = function (notificationName) {
            if (this.commandMap[notificationName]) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        Controller.prototype.executeCommand = function (notification) {
            if (!this.commandMap[notification.name])
                return;
            var commandClass = this.commandMap[notification.name];
            var command = new commandClass();
            command.initializeNotifier(this._multitonKey);
            command.execute(notification);
        };
        Controller.getInstance = function (key) {
            if (key == null) {
                return null;
            }
            if (Controller.instanceMap[key] == null) {
                new Controller(key);
            }
            return Controller.instanceMap[key];
        };
        Controller.remove = function (key) {
            var controller = Controller.instanceMap[key];
            delete Controller.instanceMap[key];
            return controller;
        };
        Controller.MULTITON_MSG = "controller key for this Multiton key already constructed";
        Controller.CONTROLLER_MSG = "the notification has been registered with another command.";
        Controller.instanceMap = {};
        return Controller;
    }());
    mvc.Controller = Controller;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Model = (function () {
        function Model(key) {
            if (Model.instanceMap[key]) {
                throw new Error(Model.MULTITON_MSG);
            }
            this._multitonKey = key;
            Model.instanceMap[key] = this;
            this.proxyMap = {};
            this.initializeModel();
        }
        Object.defineProperty(Model.prototype, "multitonKey", {
            get: function () {
                return this._multitonKey;
            },
            enumerable: true,
            configurable: true
        });
        Model.prototype.initializeModel = function () {
        };
        Model.prototype.registerProxy = function (proxy) {
            proxy.initializeNotifier(this._multitonKey);
            this.proxyMap[proxy.name] = proxy;
            proxy.onRegister();
        };
        Model.prototype.getProxy = function (proxyName) {
            return this.proxyMap[proxyName];
        };
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] ? true : false;
        };
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        Model.getInstance = function (key) {
            if (null == key)
                return null;
            if (Model.instanceMap[key] == null) {
                new Model(key);
            }
            return Model.instanceMap[key];
        };
        Model.remove = function (key) {
            var model = Model.instanceMap[key];
            delete Model.instanceMap[key];
            return model;
        };
        Model.MULTITON_MSG = "Model instance for this Multiton key already constructed!";
        Model.instanceMap = {};
        return Model;
    }());
    mvc.Model = Model;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var View = (function () {
        function View(key) {
            if (View.instanceMap[key] != null) {
                throw new Error(View.MULTITON_MSG);
            }
            this._multitonKey = key;
            View.instanceMap[this.multitonKey] = this;
            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }
        View.prototype.initializeView = function () {
        };
        View.prototype.registerObserver = function (notificationName, observer) {
            if (!this.observerMap[notificationName]) {
                this.observerMap[notificationName] = [];
            }
            this.observerMap[notificationName].push(observer);
        };
        View.prototype.removeObserver = function (notificationName, context) {
            if (!this.observerMap[notificationName])
                return;
            var observers = this.observerMap[notificationName];
            for (var i = 0, len = observers.length; i < len; i++) {
                if (observers[i].compareNotifyContext(context)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            if (!observers.length) {
                delete this.observerMap[notificationName];
            }
        };
        View.prototype.notifyObservers = function (notification) {
            if (this.observerMap[notification.name]) {
                var observers_ref = this.observerMap[notification.name];
                var observers = observers_ref.concat();
                for (var i = 0, len = observers.length; i < len; i++) {
                    observers[i].notifyObserver(notification);
                }
            }
        };
        View.prototype.registerMediator = function (mediator) {
            if (this.mediatorMap[mediator.name])
                return;
            mediator.initializeNotifier(this._multitonKey);
            this.mediatorMap[mediator.name] = mediator;
            var interests = mediator.listNotificationInterests();
            if (interests.length) {
                var observer = new mvc.Observer(mediator.handleNotification, mediator);
                for (var i = 0, len = interests.length; i < len; i++) {
                    this.registerObserver(interests[i], observer);
                }
            }
            mediator.onRegister();
        };
        View.prototype.getMediator = function (name) {
            return this.mediatorMap[name];
        };
        View.prototype.removeMediator = function (mediatorName) {
            var mediator = this.mediatorMap[mediatorName];
            if (mediator) {
                var interests = mediator.listNotificationInterests();
                for (var i = 0, len = interests.length; i < len; i++) {
                    this.removeObserver(interests[i], mediator);
                }
                delete this.mediatorMap[mediatorName];
                mediator.onRemove();
            }
            return mediator;
        };
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] ? true : false;
        };
        Object.defineProperty(View.prototype, "multitonKey", {
            get: function () {
                return this._multitonKey;
            },
            enumerable: true,
            configurable: true
        });
        View.getInstance = function (key) {
            if (key == null) {
                return null;
            }
            if (View.instanceMap[key] == null) {
                new View(key);
            }
            return View.instanceMap[key];
        };
        View.remove = function (key) {
            var view = View.instanceMap[key];
            delete View.instanceMap[key];
            return view;
        };
        View.instanceMap = {};
        View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
        return View;
    }());
    mvc.View = View;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Notification = (function () {
        function Notification(name, body, type) {
            if (type === void 0) { type = ""; }
            this._name = name;
            this._body = body;
            this._type = type;
        }
        Object.defineProperty(Notification.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Notification.prototype, "body", {
            get: function () {
                return this._body;
            },
            set: function (val) {
                this._body = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Notification.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (val) {
                this._type = val;
            },
            enumerable: true,
            configurable: true
        });
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.name;
            msg += "\nBody:" + ((this.body == null) ? "null" : this.body.toString());
            msg += "\nType:" + ((this.type == null) ? "null" : this.type);
            return msg;
        };
        return Notification;
    }());
    mvc.Notification = Notification;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Notifier = (function () {
        function Notifier() {
        }
        Object.defineProperty(Notifier.prototype, "multitonKey", {
            get: function () {
                return this._multitonKey;
            },
            enumerable: true,
            configurable: true
        });
        Notifier.prototype.initializeNotifier = function (key) {
            this._multitonKey = key + "";
            this._facade = this.facade;
        };
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (type === void 0) { type = ""; }
            if (this._facade) {
                return this._facade;
            }
            var facade = this.facade;
            if (facade) {
                facade.sendNotification(name, body, type);
            }
        };
        Object.defineProperty(Notifier.prototype, "facade", {
            get: function () {
                if (this._multitonKey == null) {
                    throw new Error(Notifier.MULTITON_MSG);
                }
                return mvc.Facade.getInstance(this._multitonKey);
            },
            enumerable: true,
            configurable: true
        });
        Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
        return Notifier;
    }());
    mvc.Notifier = Notifier;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Observer = (function () {
        function Observer(notify, context) {
            this._notify = notify;
            this._context = context;
        }
        Object.defineProperty(Observer.prototype, "notify", {
            get: function () {
                return this._notify;
            },
            set: function (val) {
                this._notify = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Observer.prototype, "context", {
            get: function () {
                return this._context;
            },
            set: function (val) {
                this._context = val;
            },
            enumerable: true,
            configurable: true
        });
        Observer.prototype.notifyObserver = function (notification) {
            this._notify.call(this._context, notification);
        };
        Observer.prototype.compareNotifyContext = function (context) {
            return this._context === context;
        };
        return Observer;
    }());
    mvc.Observer = Observer;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var MacroCommand = (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
            var _this = _super.call(this) || this;
            _this._subCommands = [];
            _this.initializeMacroCommand();
            return _this;
        }
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this._subCommands.push(commandClassRef);
        };
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this._subCommands;
            while (subCommands.length > 0) {
                var ref = subCommands.shift();
                var cmd = new ref();
                cmd.initializeNotifier(this.multitonKey);
                cmd.execute(notification);
            }
        };
        return MacroCommand;
    }(mvc.Notifier));
    mvc.MacroCommand = MacroCommand;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var SimpleCommand = (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            return _super.call(this) || this;
        }
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    }(mvc.Notifier));
    mvc.SimpleCommand = SimpleCommand;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Facade = (function () {
        function Facade(key) {
            if (Facade.instanceMap[key] != null) {
                throw new Error(Facade.MULTITON_MSG);
            }
            this.initializeNotifier(key);
            Facade.instanceMap[key] = this;
            this.initializeFacade();
        }
        Object.defineProperty(Facade.prototype, "multitonKey", {
            get: function () {
                return this._multitonKey;
            },
            enumerable: true,
            configurable: true
        });
        Facade.prototype.initializeNotifier = function (key) {
            this._multitonKey = key;
        };
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        Facade.prototype.initializeModel = function () {
            if (this.model != null)
                return;
            this.model = mvc.Model.getInstance(this.multitonKey);
        };
        Facade.prototype.initializeController = function () {
            if (this.controller != null)
                return;
            this.controller = mvc.Controller.getInstance(this.multitonKey);
        };
        Facade.prototype.initializeView = function () {
            if (this.view != null)
                return;
            this.view = mvc.View.getInstance(this.multitonKey);
        };
        Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.getProxy = function (proxyName) {
            return this.model.getProxy(proxyName);
        };
        Facade.prototype.removeProxy = function (proxyName) {
            var proxy = null;
            if (this.model != null) {
                proxy = this.model.removeProxy(proxyName);
            }
            return proxy;
        };
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        Facade.prototype.registerMediator = function (mediator) {
            if (this.view != null) {
                this.view.registerMediator(mediator);
            }
        };
        Facade.prototype.getMediator = function (mediatorName) {
            return this.view.getMediator(mediatorName);
        };
        Facade.prototype.removeMediator = function (mediatorName) {
            var mediator = null;
            if (this.view != null) {
                mediator = this.view.removeMediator(mediatorName);
            }
            return mediator;
        };
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        Facade.prototype.sendNotification = function (notificationName, body, type) {
            if (type === void 0) { type = ""; }
            this.notifyObservers(new mvc.Notification(notificationName, body, type));
        };
        Facade.prototype.notifyObservers = function (notification) {
            if (this.view != null) {
                this.view.notifyObservers(notification);
            }
        };
        Facade.getInstance = function (key) {
            if (null == key)
                return null;
            if (Facade.instanceMap[key] == null) {
                Facade.instanceMap[key] = new Facade(key);
            }
            return Facade.instanceMap[key];
        };
        Facade.prototype.has = function (key) {
            return Facade.instanceMap[key] ? true : false;
        };
        Facade.remove = function (key) {
            if (Facade.instanceMap[key] == null)
                return;
            mvc.Model.remove(key);
            mvc.View.remove(key);
            mvc.Controller.remove(key);
            delete Facade.instanceMap[key];
        };
        Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
        Facade.instanceMap = {};
        return Facade;
    }());
    mvc.Facade = Facade;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(name, viewComponent) {
            var _this = _super.call(this) || this;
            _this._name = name || Mediator.NAME;
            _this._viewComponent = viewComponent;
            return _this;
        }
        Object.defineProperty(Mediator.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mediator.prototype, "viewComponent", {
            get: function () {
                return this._viewComponent;
            },
            set: function (val) {
                this._viewComponent = val;
            },
            enumerable: true,
            configurable: true
        });
        Mediator.prototype.listNotificationInterests = function () {
            return [];
        };
        Mediator.prototype.handleNotification = function (notification) {
        };
        Mediator.prototype.onRegister = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        Mediator.NAME = "Mediator";
        return Mediator;
    }(mvc.Notifier));
    mvc.Mediator = Mediator;
})(mvc || (mvc = {}));
var mvc;
(function (mvc) {
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(name, data) {
            var _this = _super.call(this) || this;
            _this._name = name || Proxy.NAME;
            _this._data = data;
            return _this;
        }
        Object.defineProperty(Proxy.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Proxy.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this._data = val;
            },
            enumerable: true,
            configurable: true
        });
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.NAME = "Proxy";
        return Proxy;
    }(mvc.Notifier));
    mvc.Proxy = Proxy;
})(mvc || (mvc = {}));
//# sourceMappingURL=pureMVC.js.map