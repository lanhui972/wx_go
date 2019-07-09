'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli} from '../inc/func'
export default class Opacity extends Dom {
    constructor(t){
		if(arguments.length<=3){
			super(arguments[0],arguments[1],arguments[2]);
		}else {
			super(arguments[0],arguments[1],arguments[2],arguments[3]);
		}

        if(undefined === this.attr.s_opacity){
            this.attr.s_opacity = 1.0;
        }
        this.attr.o_opacity = 1;
        this.sDu = 0;   //变化的速度   s_opacity开始透明度 e_opacity结束透明度 s_e时间
        if (undefined!==this.attr.e_opacity && undefined!==this.attr.s_e){
            this.attr.s_opacity = parseFloat(this.attr.s_opacity);
            this.attr.e_opacity = parseFloat(this.attr.e_opacity);
            this.attr.s_e = parseFloat(this.attr.s_e);
            if (this.attr.s_opacity > this.attr.e_opacity){
                this.fangxiang = 0;
            }else {
                this.fangxiang = 1;
            }
            this.attr.o_opacity = this.attr.s_opacity;
            this.sDu = parseFloat(Math.abs(this.attr.s_opacity-this.attr.e_opacity))/parseFloat(this.attr.s_e*60);
        }
        
        if (undefined!==this.attr.endy && this.attr.y>this.attr.endy){
            this.mvy = (this.attr.y-this.attr.endy)/30;
        }

    }
	w(){
        if (this.sDu > 0){
            if (this.fangxiang==1){
                this.attr.o_opacity+=this.sDu;
                this.attr.o_opacity += this.sDu;
                if (this.attr.o_opacity>=this.attr.s_opacity && this.attr.loop){ 
                    this.attr.o_opacity -= this.sDu;
                    this.fangxiang = 0;
                }else if (this.attr.o_opacity>=this.attr.s_opacity && undefined!==this.attr.end){
                    this.attr.o_opacity -= this.sDu;
                    this.attr.end(this);
                }
            }else {
                this.attr.o_opacity-=this.sDu;
                if (this.attr.o_opacity<=this.attr.e_opacity && this.attr.loop){ 
                    this.attr.o_opacity += this.sDu;
                    this.fangxiang = 1;
                }else if (this.attr.o_opacity<=this.attr.e_opacity && undefined!==this.attr.end){
                    this.attr.o_opacity += this.sDu;
                    this.attr.end(this);
                }
            }
        }
        if (undefined!==this.attr.endy && this.attr.y>this.attr.endy){
            let y = this.attr.y-this.mvy;            
            if (y < this.attr.endy){
                y = this.attr.endy;
                delete this.attr.endy;
            }
            this.y(y);
        }

        if (this.attr.o_opacity<1){
            ctx.globalAlpha = this.attr.o_opacity;
            super.w();
            ctx.globalAlpha = 1;
        }else {        
		    super.w();
        }
		//p('Btn w'); 
	}
}