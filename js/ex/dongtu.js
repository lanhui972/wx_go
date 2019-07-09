'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import { p } from '../inc/func'

export default class Dongtu extends Dom {
    constructor(t) {
        if (arguments.length <= 2) {
            super(arguments[0], arguments[1]);
        } else {
            super(arguments[0], arguments[1], arguments[2]);
        }

        this.attr.imgsOK = true;		//是否已经设置好图片
        this.attr.nCurrImg = 0;
        this.attr.imgsList = {};
        if (undefined === this.attr.dongsu) {
            this.dongsu = 10;
        } else {
            this.dongsu = this.attr.dongsu;
        }
        this.moving = false;
        this.y12 = [];
        if (undefined !== this.attr.imgs) {
            this.attr.imgsList[0] = [];
            this.attr.imgsList[0].push(this.attr.img);

            for (var im in this.attr.imgs) {
                this.attr.imgsList[im] = {};
                if (undefined === this.attr.imgs[im].min) {	//单图

                    //let img = new Image();
                    //img.src = this.attr.imgs[im].dir;		
                    //this.attr.imgsList[im].push(img);
                    this.attr.imgsList[im][0] = getImgLoad(this.attr.imgs[im].dir);

                    this.attr.imgs[im].len = 0
                    this.attr.imgs[im].n = 0;
                } else {
                    for (var i = parseInt(this.attr.imgs[im].min); i <= parseInt(this.attr.imgs[im].max); i++) {
                        this.attr.imgsList[im][i] = getImgLoad(this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/, '$1' + i + '$2'));
                        this.attr.imgs[im].len += 1;
                        //let img = new Image();
                        //img.src = this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
                        //this.attr.imgsList[im].push(img)
                    }
                    this.attr.imgs[im].len = this.attr.imgs[im].max - this.attr.imgs[im].min;
                    this.attr.imgs[im].n = this.attr.imgs[im].min;

                    //p(this.attr.imgs[im]);
                }
            }
			/*for (var i=parseInt(this.attr.imgs.min); i<=parseInt(this.attr.imgs.max); i++){
				let img = new Image();
				img.src = this.attr.imgs.dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
				this.attr.imgsList.push(img)
			}
			//this.attr.imgs.old = this.img; //是否需要保存原图
			this.attr.imgs.n   = this.attr.imgs.min;
			*/
        }
    }
    thMove(e, ckx, cky) {
        //p(ckx);
        if (!this.kmove || this.attr.parent.guenDong) return;  // 
        this.moving = true;
        if (this.y12.length <= 0) {
            this.y12 = this.attr.parent.qiuY12();
        }


        let ey = e.touches[0].clientY;
        if (this.attr.y + (ey - cky) <= this.y12[0]) {
            this.xg_attr.my = this.y12[0];
            this.my = this.y12[0];
        } else if (this.attr.y + (ey - cky) > this.y12[1]) {
            this.xg_attr.my = this.y12[1];
            this.my = this.y12[1];
        } else {
            if (undefined !== this.xg_attr && undefined !== this.xg_attr.my) {
                this.xg_attr.my = this.xg_attr.y + (ey - cky);
            }
            this.my = this.attr.y + (ey - cky);
        }
        this.move = true;
    }
    thMoveEnd(e) {
        this.y12 = [];
        this.moving = false;
        this.attr.parent.ckMoveEnd();
    }
    xgAttr() {
        if (this.attr.imgs[this.attr.nCurrImg].len == 1) {	//单图不用整天赋值
            this.attr.imgsOK = true;
            this.img = this.attr.imgsList[this.attr.nCurrImg][0];
        } else if (this.attr.imgs[this.attr.nCurrImg].len > 0) {	//多图不停切换
            if (this.attr.imgs[this.attr.nCurrImg].n <= this.attr.imgs[this.attr.nCurrImg].max) {
                //this.loadok = false;
                this.img = this.attr.imgsList[this.attr.nCurrImg][this.attr.imgs[this.attr.nCurrImg].n];

                this.attr.imgs[this.attr.nCurrImg].n += 1;
                if (this.attr.imgs[this.attr.nCurrImg].n > this.attr.imgs[this.attr.nCurrImg].max && undefined !== this.attr.imgs[this.attr.nCurrImg].loop && this.attr.imgs[this.attr.nCurrImg].loop) {
                    this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].min;
                }
                //if (this.attr.y > 300){
                //	this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].max + 1;
                //}
            } else {
                for (var o in this.attr.imgs[this.attr.nCurrImg].ok) {
                    if (o == 'func') {
                        this.attr.imgs[this.attr.nCurrImg].ok[o](this);
                    } else {
                        this.attr[o] = this.attr.imgs[this.attr.nCurrImg].ok[o];
                    }
                }
                //this.attr.imgs.n = this.attr.imgs.min;
                //this.img = this.attr.imgs.old;
                //this.attr.this.attr.nCurrImg = 0; = false;
            }
        }
    }
    w() {
        //p(111);

        //p(this.attr.imgsOK);
        this.dongsu -= 1;
        if (this.dongsu <= 0) {
            this.xgAttr(this.attr.xg, 0);
            this.dongsu = 8;
        }

        super.w();
        //p('Btn w'); 
    }
}