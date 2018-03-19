namespace game {
    export namespace crg {
        export class ColorFilter extends Filter {

            private h: number;
            private s: number;
            private l: number;

            constructor(sprite: cc.Sprite, h: number, s: number, l: number) {
                super(sprite);
                this.h = h;
                this.s = s;
                this.l = l;
                let programmer = this.program;
                if (cc.sys.isNative) {
                    programmer.setUniformInt("filterType", 1);
                    programmer.setUniformFloat("h", this.h);
                    programmer.setUniformFloat("s", this.s);
                    programmer.setUniformFloat("l", this.l);
                } else {
                    this.program.use();
                    programmer.setUniformLocationI32(programmer.getUniformLocationForName("filterType"), 1);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("h"), this.h);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("s"), this.s);
                    programmer.setUniformLocationF32(programmer.getUniformLocationForName("l"), this.l);
                }
                // if (cc.sys.isNative) {
                //     this.program.setUniformVec4("filtersParams" + 0, cc.math.vec4.apply(null, [h, s, l]));
                // } else {
                //     this.program.setUniformLocationWith4f.apply(this.program, [this.program.getUniformLocationForName("filtersParams" + 0)].concat([h, s, l]));
                // }
            }

            createProgram() {
                if (!ColorFilter.pools.length) {
                    let glProgram = new cc.GLProgram();
                    if (cc.sys.isNative) {
                        glProgram.initWithString(ColorFilter.vectorShader, ColorFilter.fragShader);
                    } else {
                        glProgram.initWithVertexShaderByteArray(ColorFilter.vectorShader, ColorFilter.fragShader);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                        glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
                    }
                    glProgram.link();
                    glProgram.updateUniforms();
                    this.program = glProgram;
                } else {
                    this.program = ColorFilter.pools.shift();
                }
            }

            dispose() {
                ColorFilter.pools.push(this.program);
            }

            private static pools: ColorFilter[] = [];

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
                                    
                                    uniform int filterType;
                                    
                                    uniform vec4 filtersParams0;
                                    uniform vec4 filtersParams1;
                                    uniform vec4 filtersParams2;
                                    uniform vec4 filtersParams3;
                                    uniform vec4 filtersParams4;
                                    uniform vec4 filtersParams5;
                                    uniform vec4 filtersParams6;
                                    uniform vec4 filtersParams7;
                                    
                                    uniform float h;
                                    uniform float s;
                                    uniform float l;
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL);
                                    
                                    void main()
                                    {
                                        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
                                        if(filterType == 1) {
                                            gl_FragColor = colorFilter(c,h,s,l);
                                        }
                                    }
                                    
                                    vec4 colorFilter(vec4 color,float colorH,float colorS,float colorL) {
                                        //rgb -> hsl
                                        float r = color[0];
                                        float g = color[1];
                                        float b = color[2];
                                        float min = r<g?(r<b?r:b):(g<b?g:b);
                                        float max = r>g?(r>b?r:b):(g>b?g:b);
                                        float h = 0.0;
                                        if(max == min) {
                                            h = 0.0;
                                        } else if(max == r) {
                                            if(g >= b) {
                                                h = 60.0*(g-b)/(max-min) + 0.0;
                                            } else {
                                                h = 60.0*(g-b)/(max-min) + 360.0;
                                            }
                                        } else if(max == g) {
                                            h = 60.0*(b-r)/(max-min) + 120.0;
                                        } else {
                                            h = 60.0*(r-g)/(max-min) + 240.0;
                                        }
                                        for(int n = 0; n < 10; n++) {
                                            if(h < 0.0) {
                                                h += 0.0;
                                            } else if(h > 360.0) {
                                                h -= 360.0;
                                            } else {
                                                break;
                                            }
                                        }
                                        float l = 0.5*(max+min);
                                        if(l > 1.0) {
                                            l = 1.0;
                                        } else if(l < 0.0) {
                                            l = 0.0;
                                        }
                                        float s = 0.0;
                                        if(l == 0.0 || max == min) {
                                            s = 0.0;
                                        } else if(l <= 0.5) {
                                            s = (max - min)*0.5/l;
                                        } else {
                                            s = (max - min)*0.5/(1.0-l);
                                        }
                                        if(s > 1.0) {
                                            s = 1.0;
                                        } else if(s < 0.0) {
                                            s = 0.0;
                                        }
                                    
                                        //control hsl
                                        h += colorH;
                                        if(colorS < 0.0) {
                                            s *= (colorS + 100.0)*0.01;
                                        } else {
                                            s *= 1.0 + colorS*0.002;
                                        }
                                        l += colorL/100.0;
                                    
                                    
                                        //hsl -> rgb
                                        if(s == 0.0) {
                                            color[0] = l;
                                            color[1] = l;
                                            color[2] = l;
                                        } else {
                                            float q = 0.0;
                                            if(l < 0.5) {
                                                q = l*(1.0 + s);
                                            } else {
                                                q = l + s - l*s;
                                            }
                                            float p = 2.0*l - q;
                                            float hk = h/360.0;
                                            float tr = hk + 1.0/3.0;
                                            float tg = hk;
                                            float tb = hk - 1.0/3.0;
                                            for(int n = 0; n < 10; n++) {
                                                if(tr < 0.0) {
                                                    tr += 1.0;
                                                } else if(tr > 1.0) {
                                                    tr -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            for(int n = 0; n < 10; n++) {
                                                if(tg < 0.0) {
                                                    tg += 1.0;
                                                } else if(tg > 1.0) {
                                                    tg -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            for(int n = 0; n < 10; n++) {
                                                if(tb < 0.0) {
                                                    tb += 1.0;
                                                } else if(tb > 1.0) {
                                                    tb -= 1.0;
                                                } else {
                                                    break;
                                                }
                                            }
                                            if(tr < 1.0/6.0) {
                                                tr = p + ((q - p) * 6.0 * tr);
                                            } else if(tr < 0.5) {
                                                tr = q;
                                            } else if(tr < 2.0/3.0) {
                                                tr = p + ((q - p) * 6.0 * (2.0/3.0 - tr));
                                            } else {
                                                tr = p;
                                            }
                                            if(tg < 1.0/6.0) {
                                                tg = p + ((q - p) * 6.0 * tg);
                                            } else if(tg < 0.5) {
                                                tg = q;
                                            } else if(tg < 2.0/3.0) {
                                                tg = p + ((q - p) * 6.0 * (2.0/3.0 - tg));
                                            } else {
                                                tg = p;
                                            }
                                            if(tb < 1.0/6.0) {
                                                tb = p + ((q - p) * 6.0 * tb);
                                            } else if(tb < 0.5) {
                                                tb = q;
                                            } else if(tb < 2.0/3.0) {
                                                tb = p + ((q - p) * 6.0 * (2.0/3.0 - tb));
                                            } else {
                                                tb = p;
                                            }
                                            color[0] = tr;
                                            color[1] = tg;
                                            color[2] = tb;
                                        }
                                        return color;
                                    }
                                    `;
        }
    }
}