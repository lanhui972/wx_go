'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import { p, bli, bli2, vFloat } from '../inc/func'
export default class Font extends Dom { //自定义图片文字
    constructor(t) {
        let arg = ['font'];
        for (var k in arguments) {
            arg.push(arguments[k]);
        }
        if (arg.length <= 3) {
            super(arg[0], arg[1], arg[2]);
        } else {
            super(arg[0], arg[1], arg[2], arg[3]);
        }
        if (undefined !== this.attr.padding) {
            this.y(this.y() + this.attr.padding * 2 * bli);
        }
        this.attr.wpos = true;
        this.text = this.attr.text.toLowerCase();
        this.fonts = {};

        // 0 [x初始值， 宽度],
        this.fonts[0] = {// 关卡数
            'src': I + 'font.png', 'height': 38, 0: [0, 26], 1: [29, 26], 2: [55, 26], 3: [84, 26], 4: [112, 26],
            5: [140, 26], 6: [168, 26], 7: [196, 26], 8: [224, 26], 9: [252, 26]
        };
        this.fonts[1] = { //时间
            'src': I + 'font2.png', 'height': 35, 1: [20, 20], 2: [40, 20], 3: [60, 20], 4: [80, 20],
            5: [100, 20], 6: [120, 20], 7: [140, 20], 8: [160, 20], 9: [180, 20], 0: [0, 21], ':': [200, 24]
        };
        this.fonts[2] = {
            'src': I + 'font1.png', 'height': 32, 0: [0, 22], 1: [30, 15], 2: [57, 21], 3: [84, 21], 4: [111, 24],
            5: [141, 20], 6: [168, 22], 7: [197, 21], 8: [223, 22], 9: [252, 23], 's': [280, 21]
        };
        this.fonts[3] = {
            'src': I + 'font3.png', 'height': 40, 0: [0, 34], 1: [50, 34], 2: [101, 34], 3: [155, 34], 4: [210, 34],
            5: [264, 34], 6: [319, 34], 7: [373, 34], 8: [428, 34], 9: [482, 34]
        };



        this.dom = {};
        this.wbl = 1;      //实际输出的文字宽度比例
        //p(this);

        this.c = this.posC();

        if (undefined === this.attr.s_opacity) {
            this.attr.s_opacity = 1.0;
        }
        this.attr.o_opacity = 1;
        this.sDu = 0;   //变化的速度   s_opacity开始透明度 e_opacity结束透明度 s_e时间
        if (undefined !== this.attr.e_opacity && undefined !== this.attr.s_e) {
            this.attr.s_opacity = parseFloat(this.attr.s_opacity);
            this.attr.e_opacity = parseFloat(this.attr.e_opacity);
            this.attr.s_e = parseFloat(this.attr.s_e);
            if (this.attr.s_opacity > this.attr.e_opacity) {
                this.fangxiang = 0;
            } else {
                this.fangxiang = 1;
            }
            this.attr.o_opacity = this.attr.s_opacity;
            this.sDu = parseFloat(Math.abs(this.attr.s_opacity - this.attr.e_opacity)) / parseFloat(this.attr.s_e * 60);
        }

        if (undefined !== this.attr.endy && this.attr.y > this.attr.endy) {
            this.mvy = (this.attr.y - this.attr.endy) / 30;
        }
        this.reText();
    }
    noFont() {
        return (undefined === this.attr.fontk || undefined === this.fonts[this.attr.fontk] || undefined === this.fonts[this.attr.fontk]['src'] || undefined === this.fonts[this.attr.fontk]['height']);
    }
    reText() {
        if (this.attr.text == '' || this.noFont()) {
            return;
        }
        let f = this.fonts[this.attr.fontk]
        if (undefined === this.attr.height) {
            this.attr.height = f['height'];
        }
        this.dom = {};
        //p(f['height']+'/'+this.attr.height*bli2 +'='+ (f['height']/this.attr.height*bli2));
        this.wbl = vFloat(f['height'] / (this.attr.height * bli2), 2);

        this.text = (this.attr.text).toLowerCase();

        let st = 'width:0;x:' + this.attr.x * bli2 + ';y:' + this.attr.y * bli2 + ';height:' + this.attr.height * bli2 + ';';
        st += undefined === this.attr.line ? '' : 'line:' + this.attr.line + ';';
        st += undefined === this.attr.border ? '' : 'border:' + this.attr.border + ';';
        st += undefined === this.attr.padding ? '' : 'padding:' + this.attr.padding + ';';

        this.dom['div'] = new Dom('div', st, { liuhai: this.liuhai, clip: false });

        let x = 0, y = 0, padding = 0;
        if (undefined !== this.dom['div'].attr.padding) {
            padding = parseInt(this.dom['div'].attr.padding), x = padding, y = padding;
        }
        for (var n in this.text) {
            if (undefined === f[this.text[n]]) {
                p(f['src'] + '-无文字[' + this.text[n] + '] 请修复');
            }
            let w = vFloat(f[this.text[n]][1] / this.wbl, 2);
            this.dom['f_' + n] = new Dom('img', 'src:' + f['src'] + ';p_x:' + f[this.text[n]][0] + ';p_y:0;p_w:' + f[this.text[n]][1] + ';p_h:' + f['height'] + ';x:' + x + ';y:' + y + ';width:' + w + ';height:' + (this.attr.height * bli2).toFixed(2) + ';', { f: this.dom['div'], clip: false });
            x += w;
        }
        this.dom['div'].width((x + padding) * bli);
        this.dom['div'].height(this.dom['div'].height() + 2 * padding * bli);

        let a = this.attr;
        if (undefined !== a.textalign) {
            if (a.textalign == 'center' || a.valign == 'middle') {
                this.dom['div'].x(this.x() - this.dom['div'].width() / 2);
                this.dom['div'].attr.px = this.dom['div'].x();
            } else if (a.textalign == 'right') {
                this.dom['div'].x(this.x() - this.dom['div'].width());
                this.dom['div'].attr.px = this.dom['div'].x();
            }
            if (a.valign == 'center' || a.valign == 'middle') {
                this.dom['div'].y(this.y() - this.dom['div'].height() / 2);
                this.dom['div'].attr.py = this.dom['div'].y();
            } else if (a.valign == 'bottom') {
                this.dom['div'].y(this.y() - this.dom['div'].height());
                this.dom['div'].attr.py = this.dom['div'].y();
            }
        }
        if (undefined !== this.attr.f) {
            this.dom['div'].attr.xcx = this.attr.x - this.dom['div'].attr.x;    //跟this相差
            this.dom['div'].attr.xcy = this.attr.y - this.dom['div'].attr.y;    //跟this相差
        }
    }
    w() {
        if (this.attr.text == '' || !this.dis) {
            return;
        }
        if (this.noFont()) {
            //super.w();
        } else {
            if (this.sDu > 0) {
                if (this.fangxiang == 1) {
                    this.attr.o_opacity += this.sDu;
                    this.attr.o_opacity += this.sDu;
                    if (this.attr.o_opacity >= this.attr.s_opacity && this.attr.loop) {
                        this.attr.o_opacity -= this.sDu;
                        this.fangxiang = 0;
                    } else if (this.attr.o_opacity >= this.attr.s_opacity && undefined !== this.attr.end) {
                        this.attr.o_opacity -= this.sDu;
                        this.attr.end(this);
                    }
                } else {
                    this.attr.o_opacity -= this.sDu;
                    if (this.attr.o_opacity <= this.attr.e_opacity && this.attr.loop) {
                        this.attr.o_opacity += this.sDu;
                        this.fangxiang = 1;
                    } else if (this.attr.o_opacity <= this.attr.e_opacity && undefined !== this.attr.end) {
                        this.attr.o_opacity += this.sDu;
                        this.attr.end(this);
                    }
                }
            }

            if (undefined !== this.attr.endy && this.attr.y > this.attr.endy) {
                let y = this.attr.y - this.mvy;
                if (y < this.attr.endy) {
                    y = this.attr.endy;
                    delete this.attr.endy;
                }
                this.y(y);
            }

            let echo = false;
            if (this.attr.o_opacity < 1) {
                ctx.globalAlpha = this.attr.o_opacity;
                echo = super.w();
                ctx.globalAlpha = 1;
            } else {
                echo = super.w();
            }

            if (echo) { //上级正常输出
                if (this.text !== this.attr.text) {
                    this.reText();
                }
                if (undefined !== this.attr.f) {
                    this.dom['div'].pos([this.attr.px - this.dom['div'].attr.xcx, this.attr.py - this.dom['div'].attr.xcy]);
                }
                if (this.attr.o_opacity < 1) {
                    ctx.globalAlpha = this.attr.o_opacity;
                    for (var d in this.dom) {
                        this.dom[d].w();
                    }
                    ctx.globalAlpha = 1;
                } else {
                    for (var d in this.dom) {
                        this.dom[d].w();
                    }
                }
            }
            if (undefined !== this.attr.sxiao) {
                this.attr.height -= this.attr.sxiao
                this.reText();
            }

        }
    }
}