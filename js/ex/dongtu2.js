'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p} from '../inc/func'

export default class Dongtu extends Dom {
    constructor(){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}

		this.attr.imgsOK   = true;		//是否已经设置好图片
        if (undefined===this.attr.nCurrImg){
            this.attr.nCurrImg = 0;
        }
		this.attr.imgsList = {};

        if (undefined === this.attr.dongsu){
            this.dongsu = 10;
        }else {
            this.dongsu = this.attr.dongsu;
        }        
		
        this.movexy   = false; //自移动
        this.movexysd = 10;
        this.movexyx  = 0;
        this.movecunn = 0;

        this.kdongsu= this.dongsu;
		if (undefined!==this.attr.imgs){
			this.attr.imgsList[0] = [];
			this.attr.imgsList[0].push(this.attr.img);

			for (var im in this.attr.imgs){
				this.attr.imgsList[im] = {};
				if (undefined === this.attr.imgs[im].min){	//单图
                    p(this.attr);
					this.attr.imgsList[im][0] = getImgLoad(this.attr.imgs[im].dir);
					this.attr.imgs[im].len = 1
					this.attr.imgs[im].n   = 0;
				}else {
					for (var i=parseInt(this.attr.imgs[im].min); i<=parseInt(this.attr.imgs[im].max); i++){
						this.attr.imgsList[im][i] = getImgLoad(this.re100(this.attr.imgs[im].dir, i));
						this.attr.imgs[im].len   += 1;
					}
					this.attr.imgs[im].len = this.attr.imgs[im].max - this.attr.imgs[im].min+1;
					this.attr.imgs[im].n   = this.attr.imgs[im].min;
				}
			}
            if (undefined===this.attr.imgs[0]){
                this.attr.imgsList[0][0] = getImgLoad(this.attr.src);
                this.attr.imgs[0] = {};
                this.attr.imgs[0].len = 1;
                this.attr.imgs[0].n  = 0;
            }
            
		}

        //p(this.attr.imgs);
    }
	re100(s,i){
        i += '';
        if (s.replace(/[^%]/g,'').length==1){
            s = s.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2');
        }else {        
            for (let ni=i.length-1;ni>=0;ni--){
                s = s.replace(/^(.*?)%([^%]+)$/,'$1'+i[ni]+'$2');
            }
            s = s.replace(/%/g,'0');
        }
        return s;
    }
	xgAttr(){
		if (this.attr.imgs[this.attr.nCurrImg].len == 1){	//单图不用整天赋值
			this.attr.imgsOK = true;
			this.img = this.attr.imgsList[this.attr.nCurrImg][0];
		}else if (this.attr.imgs[this.attr.nCurrImg].len > 0){	//多图不停切换
            
			if (this.attr.imgs[this.attr.nCurrImg].n <= this.attr.imgs[this.attr.nCurrImg].max){
				//this.loadok = false;
				this.img = this.attr.imgsList[this.attr.nCurrImg][this.attr.imgs[this.attr.nCurrImg].n];

				this.attr.imgs[this.attr.nCurrImg].n += 1;
				if (this.attr.imgs[this.attr.nCurrImg].n > this.attr.imgs[this.attr.nCurrImg].max && undefined!==this.attr.imgs[this.attr.nCurrImg].loop && this.attr.imgs[this.attr.nCurrImg].loop){
					this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].min;
				}
				//if (this.attr.y > 300){
				//	this.attr.imgs[this.attr.nCurrImg].n = this.attr.imgs[this.attr.nCurrImg].max + 1;
				//}
			}else {
				for (var o in this.attr.imgs[this.attr.nCurrImg].ok){
					if(o == 'func'){
						this.attr.imgs[this.attr.nCurrImg].ok[o]();
					}else  {
						this.attr[o] = this.attr.imgs[this.attr.nCurrImg].ok[o];
					}
				}
                
				//this.attr.imgs.n = this.attr.imgs.min;
				//this.img = this.attr.imgs.old;
				//this.attr.this.attr.nCurrImg = 0; = false;
			}
		}
	}
    movePos(p1,p2){
        if (undefined===p1 || p1.length!=2){
            this.movexy   = false;
            return;
        }
        
        this.pos(p1);
        this.attr.pos1 = p1;

        this.movexy   = true;
        this.movexysd = 10;
        this.movexyjs = 0;
        this.movexx =  (p2[0]-p1[0])/10;
        this.moveyy =  (p2[1]-p1[1])/10;

        if (Math.abs(p1[0]-p2[0]) > Math.abs(p1[1]-p2[1])){ //水平向
            this.movexyx  = 1;

        }else {
            this.movexyx = 2;
        }        
    }
	w(){
		this.kdongsu -= 1;
		if (this.kdongsu<=0){
			this.xgAttr();
			this.kdongsu= this.dongsu;
		}

        if (this.movexy){
            if (this.movecunn>=this.movexysd){
                this.movexyjs += 1;           
                if (this.movexyjs>=10){
                    this.pos(this.attr.pos1);
                    this.movexyjs = 0;   
                }else {            
                    this.pos([this.attr.pos1[0]+this.movexx*this.movexyjs, this.attr.pos1[1]+this.moveyy*this.movexyjs]);
                }
                this.movecunn = 0;
            }else {
                this.movecunn += 1;
            }
        }
        


		super.w();
		//p('Btn w'); 
	}
}