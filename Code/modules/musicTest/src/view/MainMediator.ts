namespace game {
    export namespace musicTest {

        export var mainMediator: MainMediator;

        export class MainMediator extends mvc.Mediator {

            private bgm: any;
            private change: any;

            constructor() {
                super(MainMediator.NAME, null);
                mainMediator = this;
            }

            private initUI(): void {
                this.viewComponent = new cc.Node();
                console.log("初始化音乐测试场景");
                this.viewComponent.addComponent(cc.Graphics);
                let gp: cc.Graphics = this.viewComponent.getComponent(cc.Graphics);
                let c = new cc.Color(255, 100, 100);
                gp.fillColor = c;

                // this.viewComponent.color = new cc.Color(255,0,0);
                // this.viewComponent.addComponent(cc.Label);
                // this.viewComponent.getComponent(cc.Label).string = "w~~";

                var url = cc.url.raw("resources/musicTest/res/startbgm.wav");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function (oEvent) {
                    var arrayBuffer = xhr.response;
                    if (arrayBuffer) {
                        audioContext.decodeAudioData(arrayBuffer, function (buffer: any) { //解码成功则调用此函数，参数buffer为解码后得到的结果
                            visualize(audioContext, buffer); //调用_visualize进行下一步处理，此方法在后面定义并实现
                            console.log("gogo")
                        }, function (e: any) { //这个是解码失败会调用的函数
                            console.log("!哎玛，文件解码失败:(");
                        });
                    }
                    else {
                    }
                }
                xhr.send(null);


                function visualize(audioContext: any, buffer: any) {
                    var audioBufferSouceNode = audioContext.createBufferSource(),
                        analyser = audioContext.createAnalyser();
                    //将source与分析器连接
                    audioBufferSouceNode.connect(analyser);
                    //将分析器与destination连接，这样才能形成到达扬声器的通路
                    analyser.connect(audioContext.destination);
                    //将上一步解码得到的buffer数据赋值给source
                    audioBufferSouceNode.buffer = buffer;
                    //播放
                    audioBufferSouceNode.start(0);
                    //音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取

                    let last = 0;
                    let lastMax = 0;

                    setInterval(function () {
                        var array = new Uint8Array(analyser.frequencyBinCount);
                        analyser.getByteFrequencyData(array);

                        var meterWidth = 10, //频谱条宽度
                            gap = 2, //频谱条间距
                            capHeight = 2,
                            capStyle = '#fff',
                            meterNum = 800 / (10 + 2), //频谱条数量
                            capYPositionArray = []; //将上一画面各帽头的位置保存到这个数组

                        let max = 0;
                        let sum = 0;
                        let count = 0;
                        for (let i = 0; i < array.length; i++) {
                            if (array[i]) {
                                sum += array[i];
                                count++;
                            }
                            if(array[i] > max) {
                                max = array[i];
                            }
                        }

                        gp.clear();
                        gp.fillRect(0, 0, 20, ~~(sum / count));
                        // console.log(~~(sum/count));
                        let now = ~~(sum / count);
                        if (last && (now - last > 10 || last - now > 10)) {
                            // console.log(now - last > 0? "hi" : "low", last, now);
                        }
                        last = now;

                        if (lastMax && (max - lastMax > 10 || lastMax - max > 10)) {
                            console.log(max - lastMax > 0? "max hi" : "max low", max, lastMax);
                        }
                        lastMax = max;

                        // var step = Math.round(array.length / meterNum); //计算采样步长
                        // // ctx.clearRect(0, 0, cwidth, cheight);
                        // for (var i = 0; i < meterNum; i++) {
                        //     var value = array[i * step]; //获取当前能量值
                        //     if (capYPositionArray.length < Math.round(meterNum)) {
                        //         capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
                        //     };
                        //     console.log(value);
                        //     // ctx.fillStyle = capStyle;
                        //     //开始绘制帽头
                        //     // if (value < capYPositionArray[i]) { //如果当前值小于之前值
                        //     //     ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight); //则使用前一次保存的值来绘制帽头
                        //     // } else {
                        //     //     ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight); //否则使用当前值直接绘制
                        //     //     capYPositionArray[i] = value;
                        //     // };
                        //     //开始绘制频谱条
                        //     // ctx.fillStyle = gradient;
                        //     // ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
                        // }
                    }, 0.016);
                }

                let audioContext: any = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();

            }

            /**
             * 加载资源
             * @param {Function} resolve
             * @returns {Promise<void>}
             */
            protected async asyncLoad(resolve: Function) {
                super.asyncLoad(resolve);
                this.initUI();
                this.loadComplete();
            }

            public listNotificationInterests(): string[] {
                return [common.Command.OPEN_VIEW, common.Command.CLOSE_VIEW];
            }

            public async handleNotification(note: mvc.Notification) {
                switch (note.name) {
                    case common.Command.OPEN_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (!this.viewComponent) {
                            await this.load();
                        }
                        if (this.viewComponent) {
                            layer.MainUILayer.show(this.viewComponent);
                        }
                        break;
                    case common.Command.CLOSE_VIEW:
                        if (note.body.name != MainMediator.NAME) {
                            return;
                        }
                        if (this.viewComponent && this.viewComponent.parent) {
                            this.viewComponent.parent.removeChild(this.viewComponent);
                            this.viewComponent.destroy();
                            this.viewComponent = null;
                        }
                        if (this.change) {
                            clearInterval(this.change);
                            this.change = null;
                        }
                        cc.audioEngine.stop(this.bgm);
                        break;
                }
            }

            public static NAME = "musicTest.MainMediator";
        }
    }
}