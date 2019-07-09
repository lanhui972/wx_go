'use strict'	//增加一些元素的效果
import Dom from '../inc/dom'
import {p,bli,liuhai} from '../inc/func'
export default class Btn extends Dom {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}

		if(undefined === this.attr.xg){
			this.attr.xg = 0;
		}

        this.iniXG();
        this.XShi = false;
        if (this.attr.xiaoshi){ //定交了定时消失
            this.XShi = true;
            this.xiaoShi = this.attr.xiaoshi*G.zen;
        }
        

        if (undefined===this.attr.ssdx){
            this.ckSSO = this.attr.width*0.1;
            this.ckSSX = 0;  //效果1收缩的大小值
        }else {
            this.ckSSO = this.attr.ssdx;
            this.ckSSX = 0;
        }


        this.ckSSY =this.attr.height/this.attr.width*this.ckSSO;

        this.attr.owidth  = this.attr.width;
        this.attr.oheight = this.attr.height;
        this.attr.owidth2 = this.attr.width;
        this.attr.oheight2= this.attr.height;
        this.attr.owidth4 = this.attr.width;
        this.attr.oheight4= this.attr.height;
        this.ckCk = false;  //是否点击或移动内

        
        
        if (undefined===this.attr.xg1){ 
            this.attr.xg1 = true;  //其它效果也带缩放效果
        }
        this.gCenterPos();
		this.attr.imgsOK   = false;		//是否已经设置好图片
		this.attr.nCurrImg = 0;
		this.attr.imgsList = {};

		if (undefined!==this.attr.imgs){
			this.attr.imgsList[0] = [];
			this.attr.imgsList[0].push(this.attr.img);

			for (var im in this.attr.imgs){
				this.attr.imgsList[im] = [];
				if (undefined === this.attr.imgs[im].min){	//单图
					this.attr.imgsList[im].push(getImgLoad(this.attr.imgs[im].dir));
					this.attr.imgs[im].n = 0;
				}else {
					for (var i=parseInt(this.attr.imgs[im].min); i<=parseInt(this.attr.imgs[im].max); i++){
						this.attr.imgsList[im].push(getImgLoad(this.attr.imgs[im].dir.replace(/^(.*?)%(.*?)$/,'$1'+i+'$2')));
					}
					this.attr.imgs[im].n   = this.attr.imgs[im].min;
				}
			}
		}
		if (undefined!==this.attr.mvx || undefined!==this.attr.mvy){
			this.kmove = true;
		}
    }
    cgXG(n){
        this.attr.xg = n;
        this.iniXG();
    }
	iniXG(){     //初始化效果
        //xg效果 1缩小  2
        if (this.attr.xg == 2){ //旋转
            this.zjdFX = 1;         //旋转方向
            this.zjdDX = 10;        //转角度
            this.zjdSD = 5;         //转速度
            if (undefined!== this.attr.xgzt){
                this.zjdTTO= parseFloat(this.attr.xgzt)*G.zen;   //收或缩停时间
            }else {
                this.zjdTTO= 3*G.zen;   //停时间
            }
            
            this.zjdZQO = 3;         //初始圈
            this.zjdZQ = 3;         //转几圈停            
            this.zjdTT = 0;         //停的当前值为0开始转
            if (undefined===this.attr.zjd){
                this.attr.zjd = 0;
            }
        }else if (this.attr.xg == 3){ //心跳缩放
            this.xtFX = 1;      //当前心跳方向
            if (undefined===this.attr.xtfd){
                this.xtFD = 10;     //心跳大小幅度
            }else {
                this.xtFD = this.attr.xtfd;     //心跳大小幅度
            }
            this.xtSD = 0.2;      //心跳速度
        }else if (this.attr.xg == 4){ //弹球缩放
            this.tqSS = 5;      //收缩像素
            this.tqFX = 1;      //收或缩
            this.tqZFO= 10;      //收或缩延伸大小
            this.tqZF = this.tqZFO;      //收或缩延伸大小
            this.tqZC = this.tqZF/2;      //收或缩次数
            if (undefined!== this.attr.xgzt){
                this.tqZTO= parseFloat(this.attr.xgzt)*G.zen;   //收或缩停时间
            }else {
                this.tqZTO= 3*G.zen;   //收或缩停时间
            }
            this.tqZT = this.tqZTO;
        }else { //点击缩放

        }
    }
	ckXG(i){	//点击效果        
		if (this.attr.xg != 1 && !this.attr.xg1){
			return;
		}

        let currCK = false;
		if (i==1){
            //p([this.mx,this.my]);
            //p('点击开始');
            this.attr.owidth  = this.attr.owidth2+this.ckSSO;
            this.attr.oheight = this.attr.oheight2+this.ckSSY;
            currCK = true;
		}else if(i==0){	//释放
            //p('释放点击');
            this.attr.owidth  = this.attr.owidth2;
            this.attr.oheight = this.attr.oheight2;
            currCK = false; 
		}else if(i==2){	//dom内移动
            //p([this.mx,this.my]);
            //p('点击内移动');
            this.attr.owidth  = this.attr.owidth2+this.ckSSO;
            this.attr.oheight = this.attr.oheight2+this.ckSSY; 
            currCK = true; 
		}else if(i==3){	//dom外移动
            //p('点击外移动');
            this.attr.owidth  = this.attr.owidth2;
            this.attr.oheight = this.attr.oheight2;
            currCK = false; 
		}
        if (this.ckCk != currCK){        
            this.ckCk = currCK;
            if(undefined===this.attr.dsrc){
                this.attr.width  = this.attr.owidth;
                this.attr.height = this.attr.oheight;
                this.sXY(this.attr.width, this.attr.height);
            }else {
                if (this.ckCk){
                    this.sSrc(this.attr.dsrc);
                }else {
                    this.sSrc(this.attr.src);
                }            
            }
        }
	}
    gCenterPos(){
        this.attr.cXY = [this.attr.x+this.attr.width/2, this.attr.y+this.attr.height/2]; //中心点
    }
	setImgCurr(n){	//设置使用哪一组图
		if (n <= 0){
			this.attr.img = this.attr.imgsList[0];
		}else if (undefined!==this.attr.imgsList[n]){
			this.attr.imgsOK = true;
			this.attr.nCurrImg = 1;
		}
	}
    thMove(e,ckx,cky){
        super.thMove(e,ckx,cky);
        //this.attr.cXY = [this.mx+this.attr.width/2, this.my+this.attr.height/2]; //中心点
        //p(this.x()+' - '+this.y());
        //gCenterPos();
    }
    thMoveEnd(e){
        super.thMoveEnd(e); 
        //this.gCenterPos();
    }
    sXY(w,h){
        if (this.attr.xg == 4 && undefined!==this.attr.mousemove && this.attr.mousemove){
            this.pos([this.mx+this.attr.owidth4/2-w/2, this.my+this.attr.oheight4/2-h/2]);
        }else {        
            this.pos([this.attr.cXY[0]-w/2, this.attr.cXY[1]-h/2]);
        }
        this.gCenterPos();
    }
    xg2end(){

    }
    xg4end(){

    }
	w(){
        let that = this;
		//p(this.attr.imgsOK);
        if (!this.move && undefined===this.attr.endy){
            if (that.attr.xg == 2){
                if (this.zjdTT <=0){        
                    if (this.zjdFX == 1){
                        this.attr.zjd += this.zjdSD;
                        if (this.attr.zjd >= this.zjdDX){
                            this.zjdFX = 0;
                            this.zjdZQ -= 1;
                            if (this.zjdZQ <=0){
                                this.zjdZQ = this.zjdZQO;
                                this.zjdTT = this.zjdTTO;
                            }
                        }
                    }else {
                        this.attr.zjd -= this.zjdSD;
                        if (this.attr.zjd <= -this.zjdDX){
                            this.zjdFX = 1;
                            if (this.zjdZQ <=0){
                                this.zjdZQ = this.zjdZQO;
                                this.zjdTT = this.zjdTTO;
                            }
                        }
                    }
                }else {
                    if (this.attr.zjd > 0){
                        this.attr.zjd -= this.zjdSD;
                        if (this.attr.zjd<=0){
                            this.attr.zjd = 0;
                        }                    
                    }
                    
                    this.zjdTT -= 1;
                }
            }else if (that.attr.xg == 3){
                //this.xtFX = 1;      //当前心跳方向
                //this.xtFD = 10;     //心跳大小幅度
                //this.xtSD = 1;      //心跳速度
                let posC = this.posC();
                if (this.xtFX == 1){
                    this.attr.width  += this.xtSD;
                    this.attr.height += this.xtSD*(this.attr.oheight/this.attr.owidth);
                    if (this.attr.width > this.attr.owidth+this.xtFD){
                        this.xtFX = 0;
                    }
                    
                }else {
                    this.attr.width  -= this.xtSD;
                    this.attr.height -= this.xtSD*(this.attr.oheight/this.attr.owidth);
                    if (this.attr.width < this.attr.owidth-this.xtFD){
                        this.xtFX = 1;
                    }
                }
                this.posC(posC);
            }else if (that.attr.xg == 4){
                //this.tqZT
                if (this.tqZT <= 0){
                    let end = false;
                    let posC = this.posC();
                    this.attr.owidth4  = this.attr.width;
                    this.attr.oheight4 = this.attr.height;
                    if (this.tqFX == 1){
                        this.attr.width += this.tqSS;
                        this.attr.height -= this.tqSS;
                        if (this.attr.width > this.attr.owidth+this.tqZF){
                            this.tqZF -= this.tqZC;
                            
                            this.tqFX = 0;
                            if (this.tqZF <= 0){
                                end = true;                                                                
                                this.attr.width = this.attr.owidth;
                                this.attr.height = this.attr.oheight;
                                this.tqZF  = this.tqZFO
                                this.tqZT  = this.tqZTO;
                            }
                        }
                        
                    }else {
                        this.attr.width -= this.tqSS;
                        this.attr.height += this.tqSS;
                        if (this.attr.width < this.attr.owidth-this.tqZF){
                            this.tqFX = 1;
                        }
                    }
                    this.posC(posC);
                    if (end && undefined !== this.attr.xgend) {
                        this.attr.xgend(this);
                    }
                }else {
                    this.tqZT -= 1;
                }
            }
        }
        if (undefined!==this.attr.endy && this.attr.y<this.attr.endy){
            let y = this.attr.y+10;
            
            if (y > this.attr.endy){
                y = this.attr.endy;
                delete this.attr.endy;
            }
            this.y(y);
            
            this.gCenterPos();
        }
        if (this.XShi){
            this.xiaoShi -= 1;
            if (this.xiaoShi<=0){
                this.remove();
            }else if (this.xiaoShi < 20){
                this.attr.opacity = this.xiaoShi/20;
                if (this.attr.opacity<=0){
                    this.attr.opacity = 0.01;
                }
            }
            
        }
		super.w();
		//p('Btn w'); 
	}
}