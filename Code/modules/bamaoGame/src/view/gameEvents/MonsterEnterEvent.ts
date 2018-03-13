namespace game {
    export namespace bamaoGame {
        export class MonsterEnterEvent extends GameEvent {

            execute(proxy: RoundProxy) {
                let list = proxy.config;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].operate == 1) {
                        if (proxy.lastTime <= list[i].time && list[i].time < proxy.time) {
                            //背景
                            if (!proxy.background) {
                                let background = new cc.Node();
                                background.addComponent(cc.Sprite);
                                let bksprite = background.getComponent(cc.Sprite);
                                bksprite.spriteFrame = new cc.SpriteFrame();
                                bksprite.spriteFrame.setTexture(Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                                proxy.node.addChild(background);
                                proxy.background = background;
                            } else {
                                let bksprite = proxy.background.getComponent(cc.Sprite);
                                bksprite.spriteFrame.setTexture(Resource.getResource("back" + (1 + ~~(3 * Math.random()))));
                            }

                            //怪物进场
                            let monster = new cc.Node();
                            monster.addComponent(cc.Sprite);
                            let sprite = monster.getComponent(cc.Sprite);
                            sprite.spriteFrame = new cc.SpriteFrame();
                            sprite.spriteFrame.setTexture(Resource.getResource("role" + (1 + ~~(3 * Math.random()))));
                            proxy.node.addChild(monster);
                            proxy.monster = monster;

                            monster.on(cc.Node.EventType.TOUCH_START, function () {
                                proxy.clickFlag = true;
                            }, this);

                            //添加表情
                            let face = new cc.Node();
                            face.addComponent(cc.Sprite);
                            face.y = 210;
                            face.x = -5;
                            let faceSprite = face.getComponent(cc.Sprite);
                            faceSprite.spriteFrame = new cc.SpriteFrame();;
                            faceSprite.spriteFrame.setTexture(Resource.getResource("faceNormal"));
                            proxy.monster.addChild(face);
                            proxy.face = face;

                            //生成伤口
                            let poses = [];
                            for (let px = 0; px < 4; px++) {
                                for (let py = 0; py < 4; py++) {
                                    poses.push({
                                        x: px * 75 + 3 - 6 * Math.random(),
                                        y: py * 75 + 3 - 6 * Math.random()
                                    });
                                }
                            }
                            let cuts = [];
                            for (let c = 0; c < list[i].cut; c++) {
                                let x = Math.random() * 300 - 150 - 200 + 127 + 100;
                                let y = Math.random() * 300 - 150 - 200 - 300 + 180 + 150;
                                //测试随机位置
                                let pos: any = poses.splice(~~(poses.length * Math.random()), 1)[0];
                                x = pos.x - 150 - 200 + 127 + 100;
                                y = pos.y - 150 - 200 - 300 + 180 + 150;
                                let cutImage = new cc.Node();
                                cutImage.addComponent(cc.Sprite);
                                cutImage.x = x;
                                cutImage.y = y;
                                cutImage.rotation = 360 * Math.random();
                                monster.addChild(cutImage);
                                let cutSprite = cutImage.getComponent(cc.Sprite);
                                cutSprite.spriteFrame = new cc.SpriteFrame();
                                cutSprite.spriteFrame.setTexture(Resource.getResource("cut"));
                                cuts.push({x: x, y: y});
                            }
                            proxy.cutPoses = cuts;

                            //加上怪物进场动画
                            monster.x = 640;
                            proxy.tweenList.push(
                                lib.Tween.to(monster, 0.3, {x: 0}, lib.Ease.SINE_EASE_IN_OUT)
                            );
                        }
                    }
                }
            }
        }
    }
}