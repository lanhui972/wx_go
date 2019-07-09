'use strict'
import {p,rand,now,post,inQ} from './func'
export default class Touch {
    constructor(parents){
		this.parent   = parents;
        this.hasMove  = false;
        this.numMove  = 0;
        this.moveOxy  = [0,0];
	}
	touchEvent(i){ 
		if (i==0){ //取消
			//p('remove touch.');
			touchHandler   && canvas.removeEventListener('touchstart', touchHandler);
			touchMVHandler && canvas.removeEventListener('touchmove', touchMVHandler);
            touchEDHandler && canvas.removeEventListener('touchend', touchEDHandler);
            touchEDHandler && canvas.removeEventListener('touchcancel', touchEDHandler);
			hasEventBind = false;
		}else if(!hasEventBind){
			//p('add touch.');
			hasEventBind   = true;
			touchHandler   = this.touchStart.bind(this);
			touchMVHandler = this.touchMove.bind(this);
			touchEDHandler = this.touchEnd.bind(this);
			canvas.addEventListener('touchstart', touchHandler);
			canvas.addEventListener('touchmove', touchMVHandler);
            canvas.addEventListener('touchend', touchEDHandler);
            canvas.addEventListener('touchcancel', touchEDHandler);
		}
	}
	touchEnd(e) { 
		//p('touchEnd');
		e.preventDefault();
		//p(this.moveDom.move);
        
        if (this.hasMove && undefined !== this.moveDom && undefined !== this.moveDom.attr) {
            //p('滚动');
			if(this.moveDom.move){
				this.moveDom.thMoveEnd(e);
			}
			this.moveDom.ckXG(0);
        }else if(undefined !== this.clickDom && undefined !== this.clickDom.attr &&  this.clickDom.attr.click){
            //p('点击');
			//todo判断上一层有没有其它元素
			if (inQ(e.changedTouches[0].pageX, e.changedTouches[0].pageY, this.clickPos.d, this.clickPos.kz)) {
				this.clickDom.attr.click(this.clickDom);
			}
			this.clickDom.ckXG(0);
            if (undefined === this.clickDom.attr.syin || this.clickDom.attr.syin){
                G.music.ck(G.syin, 'ck');
            }
            this.clickDom.move = false;
		}else {
            //p(this.clickDom);
            //p('其它');
        }
        this.moveDom  = {};
        this.clickDom = {};
        this.clickPos = {};
	}
	touchMove(e) {
		//p('touchMove');
        e.preventDefault();
        if (undefined !== this.moveDom && undefined !== this.moveDom.attr) {
            this.moveDom.thMove(e, this.movePos.x, this.movePos.y);
            if(Math.abs(this.moveDom.mx-this.moveOxy[0])>1 || Math.abs(this.moveDom.my-this.moveOxy[1])>1){
                this.hasMove = true;
                if (undefined!==this.clickDom){
                    this.clickDom.ckXG(0);
                    this.clickDom = undefined;                
                }
            }
        }
        if(undefined !== this.clickDom && undefined !== this.clickDom.attr &&  this.clickDom.attr.click){
			if (inQ(e.touches[0].clientX, e.touches[0].clientY, this.clickPos.d, this.clickPos.kz)){
				this.clickDom.ckXG(2);
			}else {
				this.clickDom.ckXG(3);
			}
		}
	}
    touchStart(e) {
        //p('touchStart');
        e.preventDefault()
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        this.hasMove  = false;
        this.moveDom  = undefined;
        this.clickDom = undefined;
        this.clickPos = { x: x, y: y ,d:{},kz:{}};
        this.movePos  = { x: x, y: y ,d:{},kz:{}};
        this.click_mv = true;  //点击后，它父是否为可动
        this.numMove  = 0; 

		//p(G.dom); //this.kuangWin
        for (let i = G.doms.length - 1; i >= 0; i--) {
            let dom1 = G.dom[G.doms[i]];
            if(dom1.kuangWin){ //框容器
                let d = { x: dom1.attr.x*dom1.maxBli, y: dom1.attr.y*dom1.maxBli, width: dom1.attr.width*dom1.maxBli, height: dom1.attr.height*dom1.maxBli}
                if (inQ(x, y, d, 0)) {
                    //p('kuang内');
                    for (let kk in dom1.dom){
                        if(this.ckClickMove(x,y,e, dom1.dom[kk], dom1.maxBli)){
                            return true;
                        }
                    }
                }
            }else {
                if(this.ckClickMove(x,y,e,dom1,1)){
                    return true;
                }
            }
        }
        //p(this.clickDom);
    }

    ckClickMove(x,y,e,dom1, kbli){
        if (    dom1.dis && dom1.fdis && 
            ((this.moveDom === undefined && this.clickDom === undefined && (dom1.attr.click || (undefined !== dom1.attr.dclick && dom1.attr.dclick)))  //click or dclick
                  || (this.moveDom===undefined && dom1.attr.mousemove && this.click_mv))
        ) {
		    //p(G.doms[i]);
            let kz = 0;
            let dx=dom1.attr.x, dy=dom1.attr.y, dwidth=dom1.attr.width, dheight=dom1.attr.height;
            if (kbli!=1){
                let f = dom1.attr.f;
                dx=(f.attr.x+dx)*kbli, dy=(f.attr.y+dy)*kbli, dwidth*=kbli, dheight*=kbli;
            }            
            if (undefined != dom1.attr.r) {
                var d = { x: dx, y: dy, r: dom1.attr.r, width: 0, height: 0 }
            } else if(dom1.ty == 'font' && dwidth > 0) {
                var d = { x: dx, y: dy, width: dwidth, height: dheight }
                if ( dom1.attr.textalign == 'center'){
                    d.x = d.x - dwidth/2;
                }else if ( dom1.attr.textalign == 'right'){
                    d.x = d.x - dwidth;
                }
                if ( dom1.attr.textalign == 'center'){
                    d.y = d.y - dheight/2;
                }else if ( dom1.attr.textalign == 'bottom'){
                    d.y = d.y - dheight;
                }
                
            } else {
                var d = { x: dx, y: dy, width: dwidth, height: dheight }
            }
            if (kbli==1 && undefined != dom1.attr.f) {
                var o = dom1;
                while (true) {
                    if(o.attr.f.attr.mousemove){
                        d.x += o.attr.f.mx;
                        d.y += o.attr.f.my;
                    }else {
                        d.x += o.attr.f.attr.x;
                        d.y += o.attr.f.attr.y;
                    }
                    if (undefined === o.attr.f.attr.f) {
                        break;
                    } else {
                        o = o.attr.f;
                    }
                }
            }
            if (undefined != dom1.attr.line && dom1.attr.line > 1) {
                kz = parseInt(dom1.attr.line / 2);
            }
            //p(d);
            if (inQ(x, y, d, kz)) {
                //p('in');
                if (undefined !== dom1.attr.dclick && dom1.attr.dclick){    //档住
                    return true;
                }
                if (undefined != dom1.attr.f) {
                    let o = dom1;
                    let d = o.attr.f;
                    let ok= true;
                    while (true) {
                        //判断有没有在父窗内                                
                        if (d.attr.overflow){    //有超出隐藏
                            let fd = { x: d.attr.x, y: d.attr.y, width: d.attr.width, height: d.attr.height }
                            if (undefined != d.attr.r) {
                                fd = { x: d.attr.x, y: d.attr.y, r: d.attr.r, width: 0, height: 0 }
                            }
                            if(!inQ(x, y, fd, 0)){
                                this.click_mv = true;
                                ok= false;
                                break;
                            }
                        }else {
                            this.click_mv = false;
                        }
                        if (undefined === d.attr.f) {
                            break;
                        } else {
                            o = d;
                            d = d.attr.f;
                        }
                    }
                    if (!ok){
                        return false;
                    }else {
                        //p('父窗内');
                        //父窗内
                        //return true;
                    }
                }else {
                    this.click_mv = false;
                }
                //if (d.height != this.wh && !dom1.attr.mousemove && (undefined === dom1.attr.syin || dom1.attr.syin)) {
                    //G.music.ck(G.syin);		//点击声音
                //}
                if (dom1.attr.mousemove && dom1.kmove){
                    //p('moveDom start ' + G.doms[i]);                        
                    this.moveDom = dom1;
                    this.moveDom.moveAU = false;
                    this.moveOxy = [dom1.mx,dom1.my];
                    if(this.clickDom===undefined && undefined!==dom1.attr.click){
                        //p('clickDom start ' + G.doms[i]);
                        this.clickDom = dom1;
                        this.clickPos = {d:d,kz:kz};
                        //p(this.clickDom);
                    }
                    dom1.ckXG(1);
                    return true;
                } else {
                    //p(d);
                    //p(G.doms[i]);
                    //p('clickDom start ' + G.doms[i]);
                    this.clickDom = dom1;
                    this.clickPos = {d:d,kz:kz};
                    
                    //p(this.clickDom);
                    dom1.ckXG(1,x,y);
                    
                    //如果当前点击元素没父级，可return
                    if (!this.click_mv){
                        return true;
                    }
                    
                    //dom1.attr.click(dom1);
                }
                //break;
            }
        }
        return false;
    }

    ordThEnd(e) { //放手
        if (undefined !== this.moveDom && undefined !== this.moveDom.attr && this.moveDom.move) {
            e.preventDefault()
            this.moveDom.thMoveEnd(e);
        }
    }
    ordMove(e) {
        if (undefined !== this.moveDom && undefined !== this.moveDom.attr) {         
            e.preventDefault()
            this.moveDom.thMove(e, this.movePos.x, this.movePos.y);
        }
    }

}