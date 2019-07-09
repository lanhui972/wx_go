'use strict'	//增加一些元素的效果
import Btn from './btn'
import Dom from '../inc/dom'
import {p,pww,pwh,ww,wh,inarray} from '../inc/func'
export default class Kuang extends Dom { //新框架窗口
    constructor(t){

		super('div','line:0;width:100%;height:100%;x:0;y:0;',t);
        let that = this;
        this.kuangWin = true;
        this.dom = {};

        this.raopos = [0, 0]; //绕的旋转点
        this.c = this.posC();
        this.fangDa = false;    //是否放大
        this.sfDong = false;    //是否还在动

        if (undefined===this.attr.bsu){   //放大倍数
            this.beiShu = 1;  
        }else {
            this.beiShu = this.attr.bsu;
        }
        this.maxBli = this.beiShu;  //最大值
        
        if (this.attr.xg == 1){ //放大出现窗口
            this.fangDa = true;
            this.sfDong = true;
            this.fXiang = 1;    //1加 0减
            this.shuDu  = 0.05; //变化速度
            this.minBli = 0.1;  //最小值
            this.beiShu = this.minBli;
        }else {
            this.setC(this.beiShu);
        }
    }
    
    b(k,d){
        let that    = this;
        d.attr.f    = that;
        this.dom[k] = d;
    }
    del(s){
        if (undefined!==this.dom[s]){
            this.dom[s].attr.del = true;
        }
    }
    delClass(v) {	//清理class
        let av = v.split(',');
        if(v.indexOf(',') > -1){
            av = v.split(',');
        }else {
            av.push(v);
        }
        for (var dx in this.dom){
            if (undefined!==this.dom[dx].attr && undefined !== this.dom[dx].attr['class'] && inarray(this.dom[dx].attr['class'], av) ) {
                this.dom[dx].attr.del = true;
            }
        }
    }
    setC(Bli){ //中心点
        this.posC([this.c[0]/this.beiShu, this.c[1]/this.beiShu]);
        this.c = this.posC();
        
        
        this.beiShu = this.maxBli = Bli;
        if ((this.attr.z!==undefined && this.attr.z > 0)||(this.attr.zjd!==undefined)||(this.attr.bzpos!==undefined && this.attr.bzpos==1)){
            this.raopos = [this.c[0]-this.x(), this.c[1]-this.y()];
            this.pos([0-this.width()/2, 0-this.height()/2]);
        }
    }
    
	w(){
        let that  = this;
        let at    = this.attr;
        let zdong = false;
        if(!this.sfDong){   //不在放大出现的时候判断以下
            if(at.z!==undefined && at.z > 0){ //中心旋转
                ctx.save();
                ctx.translate(this.raopos[0], this.raopos[1]) ;
                ctx.rotate(this.attr.zj*(Math.PI/180));
                this.attr.zj += at.z/10;
                zdong = true; 
            }else if(at.zjd!==undefined){ //转角度
                ctx.save();
                ctx.translate(this.raopos[0], this.raopos[1]);
                ctx.rotate(at.zjd*(Math.PI/180));
                zdong = true;
            }else if(at.bzpos!==undefined && at.bzpos==1){ //绕点旋转
                ctx.save();
                ctx.translate(at.zpos[0], at.zpos[1]);
                ctx.rotate(at.zposjd*(Math.PI/180));
                zdong = true;
            }
        }

        if (this.beiShu<=1){
            if(this.beiShu < this.maxBli){
                this.posC([this.c[0]/this.beiShu, this.c[1]/this.beiShu]);
            }
            ctx.scale(this.beiShu,this.beiShu);
        }
        
        super.w();
        for (var d in this.dom){
            if (this.dom[d].attr.del){
                delete this.dom[d];
            }else {            
                this.dom[d].w();
            }
        }
        if (this.beiShu<1){
            ctx.scale(1/this.beiShu,1/this.beiShu);
        }
        
        if (this.fangDa && this.fXiang==1 && this.sfDong){
            this.beiShu += this.shuDu;
            if (this.beiShu>=this.maxBli){
                this.sfDong = false;
                this.beiShu = this.maxBli;
                this.setC(this.beiShu);
            }
        }
        /*else if (this.fXiang==0 && this.beiShu>this.minBli){
            ctx.scale(1/this.beiShu,1/this.beiShu);
            this.beiShu -= this.shuDu;
            if (this.beiShu<=this.minBli){
                this.fXiang = 1;
                this.beiShu = this.minBli;
            }
        }else if (this.fXiang==0){
            this.beiShu -= this.shuDu;
        }else if (this.fXiang==1){
            this.beiShu += this.shuDu;
        }*/



        if (zdong){
            ctx.restore();
        }

	}
}