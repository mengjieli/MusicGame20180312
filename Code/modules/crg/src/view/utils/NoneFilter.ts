namespace game {
    export namespace crg {
        export class NoneFilter extends Filter {

            createProgram() {
                if (!NoneFilter.program) {
                    let glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(NoneFilter.vectorShader, NoneFilter.fragShader);
                    } else {
                        glProgram.initWithVertexShaderByteArray(NoneFilter.vectorShader, NoneFilter.fragShader);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    NoneFilter.program = glProgram;
                }
                this.program = NoneFilter.program;
            }

            private static program: any;

            private static vectorShader = `
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
            private static fragShader = `
                                    #ifdef GL_ES
                                    precision lowp float;
                                    #endif
                                    
                                    varying vec4 v_fragmentColor;
                                    varying vec2 v_texCoord;
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);
                                    
                                    void main()
                                    {
                                        gl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
                                    }`;
        }
    }
}