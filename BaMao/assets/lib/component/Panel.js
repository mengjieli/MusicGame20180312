cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _scaleMode: 1,
        scaleMode: {
            get: function () {
                return this._scaleMode;
            },
            set: function (val) {
                this._scaleMode = val;
            },
            type: cc.Enum({
                NO_SCALE: 0,
                SHOW_ALL: 1,
                NO_BORDER: 2,
                SCALE_WIDTH: 3,
                SCALE_HEIGHT: 4
            })
        }
    },

    // use this for initialization
    onLoad: function () {
        var size = lib.data.system.screen.value;
        var width = this.node.width;
        var height = this.node.height;
        var scaleMode = this.scaleMode;
        if (width && height && scaleMode) {
            var scaleX = size.width / width;
            var scaleY = size.height / height;
            if (scaleMode == 1) {
                this.node.scaleX = scaleX < scaleY ? scaleX : scaleY;
                this.node.scaleY = scaleX < scaleY ? scaleX : scaleY;
            } else if (scaleMode == 2) {
                this.node.scaleX = scaleX > scaleY ? scaleX : scaleY;
                this.node.scaleY = scaleX > scaleY ? scaleX : scaleY;
            } else if (scaleMode == 3) {
                // this.height = this.parent.height / scaleX;
                this.node.scaleX = scaleX;
                this.node.scaleY = scaleX;
            } else if (scaleMode == 4) {
                // this.width = this.parent.width / scaleY;
                this.node.scaleX = scaleY;
                this.node.scaleY = scaleY;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

