namespace mvc {

    /**
     * Command 集合
     */
    export abstract class MacroCommand extends Notifier {

        /**
         * 命令数组
         * @type {any[]}
         * @private
         */
        private _subCommands:any[] = [];

        constructor() {
            super();
            this.initializeMacroCommand();
        }

        /**
         * 初始化命令集合
         *     // Initialize MyMacroCommand
         *     protected initializeMacroCommand function ()
         *     {
         *         this.addSubCommand( com.me.myapp.controller.FirstCommand );
         *         this.addSubCommand( com.me.myapp.controller.SecondCommand );
         *         this.addSubCommand( com.me.myapp.controller.ThirdCommand );
         *
         *     }
         */
        protected abstract initializeMacroCommand():void;

        /**
         * 添加命令集合
         * @param {T} commandClassRef
         */
        protected addSubCommand(commandClassRef: any) {
            this._subCommands.push(commandClassRef);
        }

        public execute(notification: Notification):void {
            var subCommands = this._subCommands;
            // SIC- TODO optimize
            while (subCommands.length > 0) {
                var ref = subCommands.shift();
                var cmd = new ref();
                cmd.initializeNotifier(this.multitonKey);
                cmd.execute(notification);
            }
        }
    }
}