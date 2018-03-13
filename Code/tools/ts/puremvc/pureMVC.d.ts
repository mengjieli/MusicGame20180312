declare namespace mvc {
    class Controller {
        private _multitonKey;
        private commandMap;
        private view;
        constructor(key: string);
        readonly multitonKey: string;
        protected initializeController(): void;
        registerCommand(notificationName: string, commandClass: any): void;
        hasCommand(notificationName: string): boolean;
        removeCommand(notificationName: string): void;
        executeCommand(notification: Notification): void;
        private static MULTITON_MSG;
        private static CONTROLLER_MSG;
        private static instanceMap;
        static getInstance(key: string): Controller;
        static remove(key: string): Controller;
    }
}
declare namespace mvc {
    class Model {
        private _multitonKey;
        private proxyMap;
        constructor(key: string);
        readonly multitonKey: string;
        protected initializeModel(): void;
        registerProxy(proxy: Proxy): void;
        getProxy(proxyName: string): Proxy;
        hasProxy(proxyName: string): boolean;
        removeProxy(proxyName: string): Proxy;
        private static MULTITON_MSG;
        private static instanceMap;
        static getInstance(key: string): Model;
        static remove(key: string): Model;
    }
}
declare namespace mvc {
    class View {
        private _multitonKey;
        private mediatorMap;
        private observerMap;
        constructor(key: string);
        protected initializeView(): void;
        registerObserver(notificationName: string, observer: Observer): void;
        removeObserver(notificationName: string, context: any): void;
        notifyObservers(notification: Notification): void;
        registerMediator(mediator: Mediator): void;
        getMediator(name: string): Mediator;
        removeMediator(mediatorName: string): Mediator;
        hasMediator(mediatorName: string): boolean;
        readonly multitonKey: string;
        private static instanceMap;
        private static MULTITON_MSG;
        static getInstance(key: string): View;
        static remove(key: string): View;
    }
}
declare namespace mvc {
    class Notification {
        private _name;
        private _body;
        private _type;
        constructor(name: string, body?: any, type?: string);
        readonly name: string;
        body: any;
        type: string;
        toString(): string;
    }
}
declare namespace mvc {
    class Notifier {
        private _multitonKey;
        private _facade;
        constructor();
        protected readonly multitonKey: string;
        initializeNotifier(key: string): void;
        sendNotification(name: string, body: any, type?: string): Facade;
        readonly facade: Facade;
        static MULTITON_MSG: string;
    }
}
declare namespace mvc {
    class Observer {
        private _notify;
        private _context;
        constructor(notify: Function, context: any);
        notify: Function;
        context: any;
        notifyObserver(notification: Notification): void;
        compareNotifyContext(context: any): boolean;
    }
}
declare namespace mvc {
    abstract class MacroCommand extends Notifier {
        private _subCommands;
        constructor();
        protected abstract initializeMacroCommand(): void;
        protected addSubCommand(commandClassRef: any): void;
        execute(notification: Notification): void;
    }
}
declare namespace mvc {
    class SimpleCommand extends Notifier {
        constructor();
        execute(notification: Notification): void;
    }
}
declare namespace mvc {
    class Facade {
        private _multitonKey;
        private view;
        private model;
        private controller;
        constructor(key: string);
        readonly multitonKey: string;
        private initializeNotifier(key);
        protected initializeFacade(): void;
        protected initializeModel(): void;
        protected initializeController(): void;
        protected initializeView(): void;
        registerCommand(notificationName: string, commandClassRef: any): void;
        removeCommand(notificationName: string): void;
        hasCommand(notificationName: string): boolean;
        registerProxy(proxy: Proxy): void;
        getProxy(proxyName: string): Proxy;
        removeProxy(proxyName: string): Proxy;
        hasProxy(proxyName: string): boolean;
        registerMediator(mediator: Mediator): void;
        getMediator(mediatorName: string): Mediator;
        removeMediator(mediatorName: string): Mediator;
        hasMediator(mediatorName: string): boolean;
        sendNotification(notificationName: string, body?: any, type?: string): void;
        notifyObservers(notification: Notification): void;
        private static MULTITON_MSG;
        private static instanceMap;
        static getInstance(key: string): Facade;
        has(key: string): boolean;
        static remove(key: string): boolean;
    }
}
declare namespace mvc {
    abstract class Mediator extends Notifier {
        private _name;
        private _viewComponent;
        constructor(name: string, viewComponent: any);
        readonly name: string;
        viewComponent: any;
        listNotificationInterests(): string[];
        handleNotification(notification: Notification): void;
        onRegister(): void;
        onRemove(): void;
        static NAME: string;
    }
}
declare namespace mvc {
    class Proxy extends Notifier {
        private _name;
        private _data;
        constructor(name: string, data: any);
        readonly name: string;
        data: any;
        onRegister(): void;
        onRemove(): void;
        static NAME: string;
    }
}
