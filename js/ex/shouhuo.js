'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli,f_w,bli2,ww} from '../inc/func'
export default class Shouhuo {
    constructor(n,zindex,fmi){
        this.attr = {};
        this.dis  = true;
        if (undefined!==zindex){
            this.attr.zindex = zindex;
        }
        this.attr.opacity = 1;
        this.suDu = 5;
        this.stZen= 10; //停帖
        

        let name = '';
        let img  = I+'/hua/'+n+'.png';
        let yg   = 0;
        if (n == 0){
            img    = I+'/ff.png';
            name   = '掏蜂窝';
            yg     = fmi;
        }else {
            name = G.huaArr[n].name;
            yg   = G.huaArr[n].yg;
        }
        

        let kx = 35+f_w(name,'11px 微软雅黑')*bli2+30+f_w('+'+yg,'11px 微软雅黑')*bli2+25;
        this.doms = {};
        this.doms.k = new Dom('div', 'border:#FBBBDE;background:#FFF;radius:5;width:'+kx+';height:32px;x:'+(ww-kx)/2+';y:150;',{mousemove:true,liuhai:0});
        this.doms.k.attr.opacity = 0.3;
        this.doms.hua = new Dom('img', 'src:'+img+';background:#000;width:30;height:30;x:10;y:0;',{f:this.doms.k});
        this.doms.huaName = new Dom('font', 'font:11px 微软雅黑;color:#FBBBDE;x:45;y:15;valign:middle;textalign:left;',{f:this.doms.k,text:name});
        let x = 45+f_w(name,'11px 微软雅黑')*bli2+5;
        this.doms.mi = new Dom('img', 'src:'+I+'/di.png;background:#000;width:22;height:25;x:'+x+';y:3;',{f:this.doms.k});
        x += 30;
        this.doms.huaSH = new Dom('font', 'font:11px 微软雅黑;color:#FBBBDE;x:'+x+';y:15;valign:middle;textalign:left;',{f:this.doms.k,text:'+'+yg});

        this.hideTime = 1*G.zen;
    }
	w(){
        if (this.stZen > 0){
            this.stZen -= 1;
        }else {
            this.suDu     -= 0.2; 
            if (this.suDu <=0.1){
                this.suDu  = 0.1;
            }else {
                this.suDu  -= 0.2;
            }
            
            this.hideTime -= 1;
            if (this.hideTime <= 0 || this.attr.opacity <= 0.01){
                for (var k in this.doms){
                    delete this.doms[k];
                }
                this.attr.del = true;
                return;
            }
            this.attr.opacity -= 0.01;
            if (this.attr.opacity<=0){
                this.attr.opacity = 0.01;
            }
            //ctx.scale(2,2);
            ctx.globalAlpha = this.attr.opacity;
            this.doms.k.my += this.suDu;
        }
        for (var k in this.doms){
            this.doms[k].w();
        }  
        //ctx.scale(0.5,0.5);
        ctx.globalAlpha = 1;
	}
}