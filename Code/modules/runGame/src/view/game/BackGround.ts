namespace game {
    export namespace runGame {
        export class BackGround extends cc.Node {

            private bgWidth = 1027;
            private bgHeight = 412;
            private bgScale = 1;

            private bgs: cc.Node[];

            private proxy: RoundProxy;

            constructor(proxy: RoundProxy) {
                super();
                this.proxy = proxy;
                this.bgs = [
                    this.getBackgroundNode("bg1"),
                    this.getBackgroundNode("bg2"),
                    this.getBackgroundNode("bg3"),
                    this.getBackgroundNode("bg4")
                ];
                this.bgScale = (ui.SettingProxy.designHeight / 412);
                for (let i = 0; i < this.bgs.length; i++) {
                    this.addChild(this.bgs[i]);
                    this.bgs[i].scaleX = this.bgs[i].scaleY = this.bgScale;
                }
            }

            public update(pos: number): void {
                for (let i = 0; i < this.bgs.length; i++) {
                    this.bgs[i].x = lib.data.system.screen.value.width;
                }
                let index = (~~(pos / (this.bgWidth * this.bgScale))) % this.bgs.length;
                pos = pos % (this.bgWidth * this.bgScale);
                this.bgs[index].x = -pos - ui.SettingProxy.designWidth / 2;
                while (pos + lib.data.system.screen.value.width > this.bgWidth * this.bgScale) {
                    index++;
                    index = index % this.bgs.length;
                    pos -= this.bgWidth * this.bgScale;
                    this.bgs[index].x = -pos - ui.SettingProxy.designWidth / 2;
                }
            }

            getBackgroundNode(name: string): cc.Node {
                let node = new cc.Node();
                node.addComponent(cc.Sprite);
                node.anchorX = 0;

                let sprite = node.getComponent(cc.Sprite);

                console.log("设置滤镜?");
                this.setShader(sprite, "");

                sprite.spriteFrame = new cc.SpriteFrame();
                sprite.spriteFrame.setTexture(Resource.getResource(name));

                node.on(cc.Node.EventType.TOUCH_START, function () {
                    this.proxy.clickFlag = true;
                }, this);
                return node;
            }

            private shaderPrograms: any = {};

            setShader(sprite: cc.Sprite, shaderName: string) {
                var glProgram = this.shaderPrograms[shaderName];
                if (!glProgram) {
                    glProgram = new cc.GLProgram();
                    var vert = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;
varying vec4 v_fragmentColor; 
varying vec2 v_texCoord; 
void main() 
{ 
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = a_color; 
    v_texCoord = a_texCoord; 
}
`;
                    var frag = `
#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
void main()
{
    vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
    gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
    gl_FragColor.w = c.w;
}
`;
                    if (cc.sys.isNative) {
                        glProgram.initWithString(vert, frag);
                    } else {
                        glProgram.initWithVertexShaderByteArray(vert, frag);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    this.shaderPrograms[shaderName] = glProgram;
                }
                sprite._sgNode.setShaderProgram(glProgram);
            }
        }
    }
}