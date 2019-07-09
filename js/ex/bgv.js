'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,ww,pww} from '../inc/func'
export default class Bgv extends Dom { //背景移动不断重复
    constructor(t){
		if(arguments.length<=3){
			super(arguments[0],arguments[1],arguments[2]);
		}else {
			super(arguments[0],arguments[1],arguments[2],arguments[3]);
		}
        if (undefined===this.attr.mvsd){    //移动速度
            this.attr.mvsd= 2;
        }
        if (undefined===this.attr.mvfx){    //移动方向
            this.attr.mvfx= 1;
        }
        
        if (this.attr.mvfx == 1){
            this.bk = new Dom('img', this.v1);
            this.bk.attr.x = this.attr.width;
        }else {
            p(pww+' - '+this.attr.width);
            this.x(pww-this.attr.width);
            this.bk = new Dom('img', this.v1);
            this.bk.x(pww-this.attr.width*2);
        }
    }
    
	w(){
        if (this.attr.mvfx == 1){   //左移
            if (this.x() < this.bk.attr.x){   //原图在前
                this.x(this.attr.x - parseFloat(this.attr.mvsd));
                this.bk.attr.x = this.x() + this.attr.width;
                if (this.x() + this.width() <= 0){
                    this.x(this.bk.x() + this.bk.width());                
                }
            }else {
                this.bk.x(this.bk.attr.x - parseFloat(this.attr.mvsd));
                this.attr.x = this.bk.x() + this.bk.attr.width;
                if (this.bk.x() + this.bk.width() <= 0) {
                    this.bk.x(this.x() + this.width());
                }
            }
        }else {
            
            if (this.x() > this.bk.attr.x){   //原图在前
                this.x(this.attr.x + parseFloat(this.attr.mvsd));
                this.bk.attr.x = this.x() - this.attr.width;
                if (this.x() > pww){
                    this.x(this.bk.x() - this.bk.width());                
                }
            }else {
                this.bk.x(this.bk.attr.x + parseFloat(this.attr.mvsd));
                this.attr.x = this.bk.x() - this.bk.attr.width;
                if (this.bk.x()> pww) {
                    this.bk.x(this.x() - this.width());
                }
            }
        }
        

        super.w();
        //this.bk.attr.x = ;
        this.bk.w();
	}
}