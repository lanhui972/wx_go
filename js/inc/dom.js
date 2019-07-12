'use strict'
import { p, bli, bli2, ww, wh, pww, pwh, liuhai, f_w, now_m } from './func'
export default class dom {
    constructor(t) {
        //type: img font div arc line
        //pos w: x y w h r color background src border
        this.attr = {};
        this.rpx = bli;
        this.px = 1 + window.innerWidth / 375;
        this.attr.mousemove = false;
        this.attr.click = false;
        this.attr.del = false;	//是否消毁
        this.attr.clicksy = true;		//按扭声音
        this.attr.overflow = false;
        this.attr.out = false;	//是否不在指定区域
        this.attr.offset = { x: 0, y: 0, w: 0, h: 0 }		//隐藏区域位置

        this.attr.zindex = 0;
        this.attr.showtime = 0;
        this.attr.dview = 0;
        this.attr.clip = true;   //裁剪，如果是二级如FONT下的元素将为false不判断裁剪
        this.attr.wpos = false;  //进入w函数，计算完真实位置后退出

        this.attr.outcl = 0; //0不输出 1另一头又出来  2销毁
        this.kuangWin = false; //框容器

        this.xg_attr = {};	//效果属性,点击/划动效果
        this.oattr = {};	//变换附加属性(如1-width:23; 2-width:30;); sAttr(1);
        this.nattr = 0;


        this.liuhai = liuhai;
        if (undefined !== arguments[2] && undefined !== arguments[2].liuhai) {

            if (false === arguments[2].liuhai) {
                this.liuhai = 0;
            } else if (true !== arguments[2].liuhai) {
                if (this.liuhai > 0) {
                    this.liuhai = arguments[2].liuhai;
                }
            }
            delete arguments[2].liuhai;
        }

        this.kmove = false; //可动态控制 是否可移动
        this.move = false; //有在移动
        this.moveET = 0;     //移动的最后时间
        this.moveSD = 0;     //最后移动的速度
        this.moveAU = false; //放手后自动跑
        this.moveGDT = [1, 0];//移动的比例 滚动条[框/高比例, 移动位置 100计算]
        this.ckCK = false; //这次点击已判断

        this.attr.zj = 0;	//默认转角0
        this.v1 = '';
        this.v2 = '';



        if (arguments.length >= 2) {
            this.dis = true;
            this.fdis = true; //父窗隐藏否

            this.ty = arguments[0].toLowerCase();
            this.v1 = arguments[1];
            this.v2 = arguments[2];
            this.iniDom();
            if (this.attr.mousemove) { //支持移动
                this.kmove = true;
                this.move = false;
                this.mx = this.attr.x;
                this.my = this.attr.y;
            }
            if (this.attr.overflow) { //滚动方向 0全向,1 x ,2 y
                if (undefined === this.attr.ofx) {
                    this.attr.ofx = 0;
                }
            }
            if (undefined != this.attr.f) {
                if (this.attr.f.attr.overflow && this.attr.f.attr.offset.h < this.attr.y + this.attr.height) {
                    this.attr.f.attr.offset.h = this.attr.y + this.attr.height;
                }
            }
        } else {
            this.dis = false;
        }


        //this.outWin = false;	//是否在窗外

		/*arc[2] 
        px py:所处屏幕实际XY位置 程序设定属性

        

        p_x p_y p_w p_h:取大图内的某一位置的像素
        x y   : 元素左上角坐标 （center 居中定位）
        cx cy : 中心点定位
        rx : 元素的右侧距屏幕右侧位置
        ry : 元素的底部距屏幕底部位置
        rcx rcy: rx/cx 结合

        endy:最终移动的位置
        dsrc: 点击后的图片
        
        dfw dfn:等分后的位置 几等分  //todo
        {
            dfx, dfx: 等分的左上角位置;
            dfcx, dfcx: 等分中心位置的左上角位置;
        }

        showtime 多少秒后显示出此DOM
        

		f:上级 
		text:文本
		mousemove:true随鼠标移动
		noOut:true不出此框
		click:true点击
		overflow:true,超出隐藏
		zongli:true  重力
		zongliNum:23 重力值
		fantan:true  反弹
		zudang:true  阻挡否
		chili:true   带磁力
		hover:''	 点击后的样式

        liuhai:0; //不判断流海
		*/
        //this.img = new Image()
        //this.img.src = imgSrc

        //this.width = w
        //this.height = h
        //this.x = x
        //this.y = y

        //dclick:true  挡住点击往下判断
        //dview:1      挡住前面的显示，数字层级，无需输出 w();
    }
    width(n) {
        if (undefined === n) {
            return this.attr.width;
        } else {
            this.attr.width = n;
        }
    }
    height(n) {
        if (undefined === n) {
            return this.attr.height;
        } else {
            this.attr.height = n;
        }
    }
    x(n) {
        if (undefined === n) {
            return this.attr.x;
        } else {
            this.attr.x = n;
            this.attr.px = n;
        }
    }
    y(n) {
        if (undefined === n) {
            return this.attr.y;
        } else {
            this.attr.y = n;
        }
    }
    sAttr(k, n) {
        if (undefined === this.attr[k]) {
            return;
        }
        if (undefined === n) {
            return this.attr[k];
        } else {
            this.attr[k] = n;
        }
    }
    val(s) {
        if (undefined === s) {
            return this.attr.text;
        }
        this.attr.text = s + '';
        if (undefined === this.attr.width || this.attr.width <= 0) {
            this.attr.true_text = this.attr.text;
        } else {
            let s = '';
            for (var i in this.attr.text) {
                if (f_w(s + this.attr.text[i], this.attr.font) > this.attr.width) {
                    break;
                }
                s += this.attr.text[i];
            }
            this.attr.true_text = s;
        }
    }
    remove() {
        this.attr.del = true;
    }
    show() {
        this.dis = true;
    }
    hide() {
        this.dis = false;
    }
    pos(ar) { //设定xy位置 ar[x,y]
        if (undefined === ar) {
            return [this.x(), this.y()];
        } else {
            this.x(ar[0]);
            this.y(ar[1]);
            this.sPX();
        }
    }
    posC(ar) { //设定中心点位置 ar[cx,cy]
        if (undefined === ar) {
            if (undefined === this.attr.width) {
                return [this.x(), this.y()];
            } else {
                return [this.x() + this.attr.width / 2, this.y() + this.attr.height / 2];
            }
        } else if (undefined === this.attr.width) {   //没宽度，如font
            this.pos(ar);
        } else {
            this.pos([ar[0] - this.attr.width / 2, ar[1] - this.attr.height / 2]);
        }
    }
    sSrc(src) {
        if (this.ty == 'img') {
            this.loadok = false;
            this.img = getImgLoad(src, this);
        }
    }
    sPX(liuhai) {    //是否+liuhai
        if (undefined !== liuhai && liuhai == 1 && this.liuhai > 0 && this.attr.y > 0 && undefined === this.attr.f) {
            this.attr.y += this.liuhai * bli;
        }
        if (undefined === this.attr.f) {
            this.attr.px = this.attr.x;
            this.attr.py = this.attr.y;
        } else {
            this.attr.px = this.attr.f.attr.px + this.attr.x;
            this.attr.py = this.attr.f.attr.py + this.attr.y;
        }
        if (undefined !== this.attr.mousemove && this.attr.mousemove) {
            this.mx = this.attr.x;
            this.my = this.attr.y;
        }

    }
    iniDom() {
        let v = this.v1, v2 = this.v2;
        if (v == '' && undefined == v2) {
            this.dis = false;
            return;
        }
        if (v != '') {
            var ar = (v + ';').match(/(\d+\-)?[a-z_]+:[^;]*?;/ig);
            for (var n in ar) {
                var ax = /^((\d+)\-)?([a-z_]+):([^;]*?);/i.exec(ar[n]);
                if (null !== ax) {
                    let atr = '';
                    ax[3] = ax[3].toLowerCase();
                    if (undefined === ax[2] && (ax[3] == 'src' || ax[3] == 'dsrc') && this.ty == 'img') {
                        if (ax[4] == '') {
                            this.dis = false;
                        } else {
                            this.loadok = false;
                            //this.img = new Image()
                            //this.img.src = ax[4];
                            if (ax[3] == 'dsrc') {
                                this.dimg = getImgLoad(ax[4], this);
                            } else {
                                this.img = getImgLoad(ax[4], this);
                            }
                            atr = ax[4];
                        }
                    } else if (ax[3] == 'font') {
                        let fontsize = ax[4].replace(/^.*?([\d\.]+)rpx.*?$/, '$1');
                        if (/^[\d\.]+$/.test(fontsize)) {
                            ax[4] = ax[4].replace(/(\d+)rpx/, parseInt(parseInt(fontsize) * this.rpx * this.px) + 'px');
                        } else {
                            let fontsize = ax[4].replace(/^.*?([\d\.]+)px.*?$/, '$1');
                            if (/^[\d\.]+$/.test(fontsize)) {
                                ax[4] = ax[4].replace(/(\d+)px/, parseInt(parseInt(fontsize) * this.px) + 'px');
                            }
                        }
                        atr = ax[4].toLowerCase();
                    } else if (/^\d{1,10}$/.test(ax[4])) {
                        //ax[4] = ax[4].toLowerCase();
                        atr = parseInt(ax[4]);
                    } else if (/^(x|y|yuan|width|height|z|rx|ry|rcx|rcy|cx|cy|endy|endx|showtime|dview)$/.test(ax[3])) {
                        if ('center' == ax[4] || 'middle' == ax[4]) {
                            atr = 'center';
                        } else if (/^[^-\d]/.test(ax[4])) {
                            atr = 0;
                        } else if (/%$/.test(ax[4])) {
                            atr = ax[4];
                        } else {
                            atr = parseFloat(ax[4]);
                        }
                    } else {
                        ax[4] = ax[4].toLowerCase();
                        atr = ax[4];
                    }
                    if (undefined === ax[2]) {
                        this.attr[ax[3]] = atr;
                    } else {
                        if (undefined === this.oattr[ax[2]]) {
                            this.oattr[ax[2]] = {}
                        }
                        this.oattr[ax[2]][ax[3]] = atr;
                    }
                }
            }
        }
        if (undefined != v2) {
            for (var atr in v2) {
                if (undefined !== this[atr]) {
                    this[atr] = v2[atr];
                } else {
                    this.attr[atr] = v2[atr];
                }
            }
        }

        if (undefined !== this.attr.width && this.attr.width == '100%') {
            if (undefined === this.attr.f) {
                this.attr.width = window.innerWidth;
            } else {
                this.attr.width = this.attr.f.attr.width;
            }
        } else if (undefined !== this.attr['width'] && /^[\d\.]+$/.test(this.attr['width'])) {
            this.attr['width'] *= bli;
        } else {
            this.attr['width'] = 0;
        }
        if (undefined !== this.attr.height && this.attr.height == '100%') {
            if (undefined === this.attr.f) {
                this.attr.height = window.innerHeight;
            } else {
                this.attr.height = this.attr.f.attr.height;
            }
        } else if (undefined !== this.attr['height'] && /^[\d\.]+$/.test(this.attr['height'])) {
            this.attr['height'] *= bli;
        } else {
            this.attr['height'] = 0;
        }
        if (undefined !== this.attr['cx']) {
            this.attr['x'] = this.attr['cx'] - this.attr['width'] * bli2 / 2;
        }
        if (undefined !== this.attr['cy']) {
            this.attr['y'] = this.attr['cy'] - this.attr['height'] * bli2 / 2;
        }

        if (undefined !== this.attr['rx']) {
            this.attr['x'] = (undefined === this.attr.f ? ww : this.attr.f.attr.width * bli2) - this.attr['rx'] - this.attr['width'] * bli2;
            if (this.ty == 'font') {
                this.attr.textalign = 'right';
            }
        }
        if (undefined !== this.attr['ry']) {
            if (undefined === this.attr.f) {
                this.attr['y'] = wh - this.attr['ry'] - this.liuhai - this.attr['height'] * bli2;
            } else {
                this.attr['y'] = this.attr.f.attr.height * bli2 - this.attr['ry'] - this.attr['height'] * bli2;
            }
            if (this.ty == 'font') {
                this.attr.valign = 'bottom';
            }
        }
        if (undefined !== this.attr['rcx']) {
            this.attr['x'] = (undefined === this.attr.f ? ww : this.attr.f.attr.width * bli2) - this.attr['rcx'] - this.attr['width'] * bli2 / 2;
        }
        if (undefined !== this.attr['rcy']) {
            if (undefined === this.attr.f) {
                this.attr['y'] = wh - this.attr['rcy'] - this.liuhai - this.attr['height'] * bli2 / 2;
            } else {
                this.attr['y'] = this.attr.f.attr.height * bli2 - this.attr['rcy'] - this.attr['height'] * bli2 / 2;
            }
        }
        let aBliAttr = ['x', 'y'];
        for (let i = 0; i < aBliAttr.length; i++) {
            if (aBliAttr[i] == 'x' && (this.attr['x'] == 'center' || this.attr['x'] == 'middle')) {
                if (undefined === this.attr.f) {
                    this.attr['x'] = (ww * bli - (undefined === this.attr['width'] ? 0 : this.attr['width'])) / 2;
                } else {
                    this.attr['x'] = (this.attr.f.attr.width - (undefined === this.attr.width ? 0 : this.attr.width)) / 2;
                }
            } else if (aBliAttr[i] == 'y' && (this.attr['y'] == 'center' || this.attr['y'] == 'middle')) {
                if (undefined === this.attr.f) {
                    this.attr['y'] = (wh * bli - (undefined === this.attr['height'] ? 0 : this.attr['height'])) / 2;
                } else {
                    this.attr['y'] = (this.attr.f.attr.height - (undefined === this.attr.height ? 0 : this.attr.height)) / 2;
                }
            } else if (undefined !== this.attr[aBliAttr[i]] && /^[\-\d\.]+$/.test(this.attr[aBliAttr[i]])) {
                this.attr[aBliAttr[i]] *= bli;
            }
        }
        this.sPX(1);
        if (undefined !== this.attr.p_x) {
            if (undefined === this.attr.p_w) {
                this.attr.p_w = this.attr.width * bli2;
            }
            if (undefined === this.attr.p_h) {
                this.attr.p_h = this.attr.height * bli2;
            }
        }
        if (this.ty == 'font') {
            this.val(this.attr.text);
        }

        if (this.attr.showtime > 0) {
            this.hide();
            this.attr.showtime *= G.zen;
        }

        //p(this.oattr);
    }
    thMove(e, ckx, cky) {
        //p('have move');
        if (!this.kmove) return;
        if (this.attr.overflow) {
            if (!this.move) {
                this.attr.offset.y = this.my;
                this.attr.offset.x = this.mx;
            }
            if (this.attr.ofx == 0 || this.attr.ofx == 2) this.my = this.attr.offset.y + (e.touches[0].clientY - cky);
            if (this.attr.ofx == 0 || this.attr.ofx == 1) this.mx = this.attr.offset.x + (e.touches[0].clientX - ckx);
        } else {
            if (undefined !== this.xg_attr && undefined !== this.xg_attr.mx) {
                this.xg_attr.mx = this.xg_attr.x + (e.touches[0].clientX - ckx);
                this.xg_attr.my = this.xg_attr.y + (e.touches[0].clientY - cky);
            }
            this.mx = this.attr.x + (e.touches[0].clientX - ckx);
            this.my = this.attr.y + (e.touches[0].clientY - cky);
        }
        if (this.move) {
            let ms = now_m() - this.moveET;
            if (ms <= 3) {
                ms = 3;
            }
            //p([e.touches[0].clientY,cky,now_m(),this.moveET]);
            if (undefined === this.moveUP) {
                this.moveSD = (e.touches[0].clientY - cky) / ms;
            } else {
                this.moveSD = (e.touches[0].clientY - this.moveUP[1]) / ms;
            }
            if (ios) {
                this.moveSD *= 3;
            }

            //p([e.touches[0].clientY, this.moveUP[1], this.moveSD, ms]);
        } else {
            this.moveSD = 0;
        }
        this.moveUP = [e.touches[0].clientX, e.touches[0].clientY];
        this.moveET = now_m();
        this.moveAU = false;
        this.move = true;
    }
    thMoveEnd(e) {
        //p('move end');
        this.move = false;
        if (undefined !== this.attr.ofx && this.attr.overflow && now_m() - this.moveET < 100) {
            this.moveAU = true;
        }
        if (!this.kmove) return;
        if (this.attr.overflow) {
            this.thMoveCKXY();

        } else {
            this.attr.x = this.mx;
            this.attr.y = this.my;
        }
    }

    thMoveCKXY() {
        this.attr.offset.y = this.my;
        this.attr.offset.x = this.mx;
        if (this.attr.ofx == 2) {
            if (this.attr.offset.y - this.attr.y > 0 || this.attr.offset.h < this.attr.height) {
                this.attr.offset.y = this.attr.y;
                this.moveAU = false;
            } else if (this.attr.offset.h > this.attr.height && this.attr.offset.y + this.attr.offset.h < this.attr.height + this.attr.y) {
                this.attr.offset.y = this.attr.height + this.attr.y - this.attr.offset.h;
                this.moveAU = false;
            }
        }
        this.my = this.attr.offset.y;
    }

    sAttr(n) {
        if (this.nattr == n) {
            return;
        }
        this.iniDom(); //初始最开始属性
        if (n > 0 && undefined != this.oattr[n]) {
            for (let art in this.oattr[n]) {
                this.attr[art] = this.oattr[n][art];
                if (art == 'src') {
                    this.sSrc(this.oattr[n][art]);
                }
            }
        }
        this.nattr = n;
        //else if(n==0 && this.attr.src!=''){
        //	this.sSrc(this.attr.src);
        //}
    }
    ckXG(i) {
        if (i == 1) {
            this.ckCK = true;
        } else {
            this.ckCK = false;
        }
    }

    w_1() {  //w() 前置的一些操作
        if (this.attr.showtime > 0) { //多长时间后显示
            this.attr.showtime -= 1;
            if (this.attr.showtime <= 0) {
                this.show();
            }
        }
        if (undefined !== this.attr.djian && this.attr.djian >= 0) {   //递减一个值，到0之后执行一个函数
            this.attr.djian -= 1;                                 //dis:false,djian:100,djianFunc:function(t){t.show()}
            if (this.attr.djian == 0 && undefined !== this.attr.djianFunc) {
                this.attr.djianFunc(this);
            } else if (undefined !== this.attr.djFunc) {
                this.attr.djianFunc(this);
            }
        }

        if (this.moveAU && Math.abs(this.moveSD) > 0) { //划动放手后自动移动一段位置 
            this.my += this.moveSD;
            if (this.moveSD < 0) { //上
                this.moveSD += 0.15;
                if (this.moveSD >= 0) {
                    this.moveAU = false;
                    this.moveSD = 0;
                }
            } else if (this.moveSD > 0) { //下
                this.moveSD -= 0.15;
                if (this.moveSD <= 0) {
                    this.moveAU = false;
                    this.moveSD = 0;
                }
            }
            this.thMoveCKXY();
            //p(this.moveSD);
        }
    }
    w() {    //绘到ctx上
        this.w_1();
        if (undefined !== G && !G.dVShwo && undefined === this.attr.zrfunc && undefined === this.attr.zrnumfunc && undefined === this.attr.zposfunc) return false;
        if (!this.dis || !this.fdis) return false;
        if (!this.ty == 'font' && this.attr.true_text == '') return false;

        let that = this;
        var at = {};
        for (var k in this.attr) { //此方式不对源修改  var at=this.attr
            at[k] = this.attr[k];
        }
        for (var nXG in this.xg_attr) {
            at[nXG] = this.xg_attr[nXG];
        }
        let ax = at.x;
        let ay = at.y;
        if (at.mousemove && !at.overflow) {
            if (undefined !== this.xg_attr && undefined !== this.xg_attr.mx) {
                ax = this.xg_attr.mx;
                ay = this.xg_attr.my;
            } else {
                ax = this.mx;
                ay = this.my;
            }
        }
        if (undefined != at.f) {
            if (undefined !== at.f.attr.f) {
                this.fdis = at.f.fdis;
            } else {
                this.fdis = at.f.dis;
            }
            let fq = at.f;
            let over = undefined;
            while (true) {
                if (undefined !== fq.attr.mousemove && fq.attr.mousemove) {
                    ax = ax + at.f.mx;
                    ay = ay + at.f.my;
                } else {
                    ax += fq.attr.px;
                    ay += fq.attr.py;
                }
                if (undefined === over && undefined !== fq.attr.overflow && fq.attr.overflow) {
                    over = fq;
                }
                if (undefined === fq.attr.f) {
                    break;
                } else {
                    fq = fq.attr.f;
                }
            }
            this.attr.px = ax;
            this.attr.py = ay;
            if (undefined !== over) { //超出显示
                if (at.px + that.height() < over.attr.px || at.py > over.attr.py + over.height() || (undefined !== at.height && at.py + at.height < over.attr.py)) {
                    
                    return false;
                }
            }
        }
        if (at.px > pww || at.py > pwh || at.px + at.width < 0 || at.py + at.height < 0) {
            return false;
        } else if (that.attr.wpos){
            return true;
        }
        if (that.attr.clip && !clip && undefined != at.f && at.f.attr.overflow) { //clip 只裁切一次
            clip = true;
            ctx.save();
            ctx.beginPath();
            ctx.rect(at.f.attr.x, at.f.attr.y, at.f.attr.width, at.f.attr.height);
            ctx.clip();
        }
        if (that.attr.clip && clip && (undefined == at.f || !at.f.attr.overflow)) {
            clip = false;
            ctx.restore();
        }

        switch (this.ty) {
            case 'img':
                if (at.opacity !== undefined) ctx.globalAlpha = at.opacity;
                if (undefined === that.img || '' == that.img.src) {
                    break;
                }
                if (that.loadok) {
                    if (at.yuan !== undefined) {
                        ctx.save();
                        ctx.arc(ax + at.yuan, ay + at.yuan, at.yuan, 0, 2 * Math.PI);
                        ctx.clip();
                    } else if (undefined != at.radius && at.radius > 0) { //圆角
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(ax + at.radius, ay);
                        ctx.arcTo(ax + at.width, ay, ax + at.width, ay + at.height, at.radius);
                        ctx.arcTo(ax + at.width, ay + at.height, ax, ay + at.height, at.radius);
                        ctx.arcTo(ax, ay + at.height, ax, ay, at.radius);
                        ctx.arcTo(ax, ay, ax + at.radius, ay, at.radius);
                        ctx.clip();
                    }
                    if (at.mv !== undefined) { //移动
                        ax += at.mv / 10;
                        if (ax > window.innerWidth) {
                            ax = 0 - at.width;
                        }
                        at.x = ax;
                    }
                    if (at.z !== undefined && at.z != 0) { //中心旋转
                        //p(that.attr.zj);
                        let heg = 0 - at.height / 2;
                        if (undefined !== at.zrpos && at.zrpos == 1) {   //默认0为中点 1点底部中心
                            heg = 0 - at.height;
                        }

                        ctx.save();
                        ctx.translate(ax + at.width / 2, ay + at.height / 2);
                        ctx.rotate(that.attr.zj * (Math.PI / 180));
                        if (undefined !== at.p_x && undefined !== at.p_y) {
                            ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, -at.width / 2, heg, at.width, at.height);
                        } else {
                            ctx.drawImage(that.img, -at.width / 2, heg, at.width, at.height);
                            //ctx.drawImage(that.img,-at.width/2,-at.height/2,at.width,at.height);
                        }
                        that.attr.zj += at.z / 10;
                        if (undefined !== at.zrend) {
                            if (undefined !== that.attr.zrnum && that.attr.zrnum == 0 && undefined !== that.attr.zrfunc) {
                                that.attr.zrfunc(that);
                            }
                            if (at.zrend < 0) {
                                if (that.attr.zj < at.zrend && at.z < 0) {
                                    that.attr.z = Math.abs(at.z);
                                    if (undefined !== at.zrnum) {  //定义了次数
                                        if (undefined !== at.zrnumfunc) {
                                            at.zrnumfunc(that);
                                        }
                                        that.attr.zrnum -= 1;
                                    }
                                } else if (that.attr.zj > 0 && at.z > 0) {
                                    that.attr.z = 0 - Math.abs(at.z);
                                }
                            } else {
                                if (that.attr.zj < 0 && at.z < 0) {
                                    that.attr.z = Math.abs(at.z);
                                } else if (that.attr.zj > at.zrend && at.z > 0) {
                                    that.attr.z = 0 - Math.abs(at.z);
                                    if (undefined !== at.zrnum) {  //定义了次数
                                        if (undefined !== at.zrnumfunc) {
                                            at.zrnumfunc(that);
                                        }
                                        that.attr.zrnum -= 1;
                                    }
                                }
                            }
                        }

                    } else if (at.zjd !== undefined) { //转角度
                        ctx.save();
                        ctx.translate(ax + at.width / 2, ay + at.height / 2)
                        ctx.rotate(at.zjd * (Math.PI / 180));
                        if (undefined !== at.p_x && undefined !== at.p_y) {
                            ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, -at.width / 2, -at.height / 2, at.width, at.height);
                        } else {
                            ctx.drawImage(that.img, -at.width / 2, -at.height / 2, at.width, at.height);
                        }
                    } else if (at.bzpos !== undefined && at.zpos !== undefined && at.bzpos == 1) { //绕点旋转
                        //p(at.x+' - '+(-at.width/2));
                        ctx.save();
                        ctx.translate(at.zpos[0], at.zpos[1]);
                        ctx.rotate(at.zposjd * (Math.PI / 180));
                        if (undefined !== at.zpossd && at.zpossd != 0) {
                            that.attr.zposjd += at.zpossd;
                        } else if (undefined !== at.zposdom && undefined !== at.zposdom.attr.zpossd) {
                            that.attr.zposjd = at.zposdom.attr.zposjd;
                        }
                        if (undefined !== at.zposend) {
                            let zend = false;
                            if (at.zposend < 0) {
                                if (at.zposjd < at.zposend) {
                                    that.attr.zpossd = Math.abs(at.zpossd);
                                    that.attr.zposjd = at.zposend;
                                    zend = true;
                                } else if (at.zposjd > 0) {
                                    that.attr.zpossd = 0 - Math.abs(at.zpossd);
                                    that.attr.zposjd = 0;
                                    zend = true;
                                }
                            } else {
                                if (at.zposjd > at.zposend) {
                                    that.attr.zpossd = 0 - Math.abs(at.zpossd);
                                    that.attr.zposjd = at.zposend;
                                    zend = true;
                                } else if (at.zposjd < 0) {
                                    that.attr.zpossd = Math.abs(at.zpossd);
                                    that.attr.zposjd = 0;
                                    zend = true;
                                }
                            }
                            if (zend && undefined !== this.attr.zposfunc) {
                                this.attr.zposfunc(this, that.attr.zposjd);
                            }
                        }

                        if (undefined !== at.p_x && undefined !== at.p_y) {
                            ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, at.x - at.zpos[0], at.y - at.zpos[1], at.width, at.height);
                        } else {
                            ctx.drawImage(that.img, at.x - at.zpos[0], at.y - at.zpos[1], at.width, at.height);
                        }
                        ctx.restore();
                    } else {
                        if (undefined !== at.p_x && undefined !== at.p_y) {
                            ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, ax, ay, at.width, at.height);
                        } else {
                            ctx.drawImage(that.img, ax, ay, at.width, at.height);
                        }
                    }
                    if (at.yuan !== undefined || at.zjd !== undefined || at.z !== undefined || at.radius !== undefined) {
                        ctx.restore();
                    }
                } else {
                    that.loadok = true;
                    that.img.onload = function () {
                        if (at.yuan !== undefined) {
                            ctx.save();
                            ctx.arc(ax + at.yuan / 2, ay + at.yuan / 2, at.yuan, 0, 2 * Math.PI);
                            ctx.clip();
                        } else if (undefined != at.radius && at.radius > 0) { //圆角
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(ax + at.radius, ay);
                            ctx.arcTo(ax + at.width, ay, ax + at.width, ay + at.height, at.radius);
                            ctx.arcTo(ax + at.width, ay + at.height, ax, ay + at.height, at.radius);
                            ctx.arcTo(ax, ay + at.height, ax, ay, at.radius);
                            ctx.arcTo(ax, ay, ax + at.radius, ay, at.radius);
                            ctx.clip();
                        }
                        if (at.mv !== undefined) { //移动
                            ax += at.mv / 10;
                            if (ax > window.innerWidth) {
                                ax = 0 - at.width;
                            }
                            at.x = ax;
                        }
                        if (at.z !== undefined && at.z > 0) {
                            ctx.save();
                            ctx.translate(ax + at.width / 2, ay + at.height / 2)
                            ctx.rotate(that.attr.zj * (Math.PI / 180));
                            if (undefined !== at.p_x && undefined !== at.p_y) {
                                ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, -at.width / 2, -at.height / 2, at.width, at.height);
                            } else {
                                ctx.drawImage(that.img, -at.width / 2, -at.height / 2, at.width, at.height);
                            }
                            that.attr.zj += at.z / 10;
                        } else if (at.zjd !== undefined) { //转角度
                            ctx.save();
                            ctx.translate(ax + at.width / 2, ay + at.height / 2)
                            ctx.rotate(at.zjd * (Math.PI / 180));

                            if (undefined !== at.p_x && undefined !== at.p_y) {
                                ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, -at.width / 2, -at.height / 2, at.width, at.height);
                            } else {
                                ctx.drawImage(that.img, -at.width / 2, -at.height / 2, at.width, at.height);
                            }

                        } else {
                            if (undefined !== at.p_x && undefined !== at.p_y) {
                                ctx.drawImage(that.img, at.p_x, at.p_y, at.p_w, at.p_h, ax, ay, at.width, at.height);
                            } else {
                                ctx.drawImage(that.img, ax, ay, at.width, at.height);
                            }
                        }

                        if (at.yuan !== undefined || at.zjd !== undefined || at.z !== undefined || at.radius !== undefined) {
                            ctx.restore();
                        }
                        //p('ok: '+that.img.src);
                    }
                    that.img.onerror = function (t) {
                        that.dis = false;
                        //p(t);
                        p('onerror: ' + that.img.src);
                    }
                }
                if (at.opacity !== undefined) ctx.globalAlpha = 1;
                break;
            case 'font':
                if (undefined !== that.attr.true_text) {
                    ctx.beginPath();
                    ctx.scale(0.5, 0.5);
                    if (at.color !== undefined) ctx.fillStyle = at.color;
                    if (at.font !== undefined) ctx.font = at.font;	//30px 微软雅黑
                    if (at.textalign !== undefined) ctx.textAlign = at.textalign; //点的左右
                    else { ctx.textAlign = 'center'; }
                    if (at.valign !== undefined) ctx.textBaseline = at.valign; //上下线
                    else { ctx.textBaseLine = 'middle'; }

                    if (/\n/.test(that.attr.true_text)) {
                        var aText = that.attr.true_text.split('\n');
                        ay = ay * 2;
                        for (var n in aText) {
                            ctx.fillText(aText[n], ax * 2, ay);
                            //p(at.width);
                            if (undefined !== at.width) {
                                //
                                //ay += at.lineheight;
                            }
                            if (undefined !== at.lineheight) {
                                ay += at.lineheight;
                            }
                        }
                    } else {
                        ctx.fillText(that.attr.true_text, ax * 2, ay * 2);
                        if (undefined !== at.border) {
                            ctx.strokeStyle = at.border;
                            ctx.strokeText(that.attr.true_text, ax * 2, ay * 2);
                        }
                    }
                    ctx.scale(2, 2);
                    ctx.stroke();

                }
                break;
            case 'div':
                if (at.line == 0) {
                    break;
                }
                //ctx.save();
                if (at.width <= 0 && at.text !== undefined) {
                    ctx.font = at.font;
                    at.width = ctx.measureText(at.text).width / 2;
                    if (undefined != at.padding) {
                        at.width += at.padding * 2;
                        this.attr.width = at.width;
                    }
                }

                if (undefined != at.yyk) ctx.shadowBlur = at.yyk;
                if (undefined != at.yy) ctx.shadowColor = at.yy;	//
                if (at.line !== undefined) ctx.lineWidth = at.line;
                if (at.opacity !== undefined) ctx.globalAlpha = at.opacity;
                if (undefined != at.radius) { //圆角
                    ctx.beginPath();
                    if (at.radius > at.height / 2) {
                        that.attr.radius = at.height / 2;
                    }
                    if (undefined != at.border) ctx.strokeStyle = at.border;
                    ctx.moveTo(ax + at.radius, ay);
                    ctx.arcTo(ax + at.width, ay, ax + at.width, ay + at.height, at.radius);
                    ctx.arcTo(ax + at.width, ay + at.height, ax, ay + at.height, at.radius);
                    ctx.arcTo(ax, ay + at.height, ax, ay, at.radius);
                    ctx.arcTo(ax, ay, ax + at.radius, ay, at.radius);
                    ctx.lineWidth = at.line;
                    if (at.background !== undefined) { ctx.fillStyle = at.background; ctx.fill() }
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    if (at.background !== undefined && at.background != '' && at.border !== undefined && at.border != '') {
                        ctx.fillStyle = at.background;
                        ctx.strokeStyle = at.border;
                        ctx.rect(ax, ay, at.width, at.height);
                        ctx.fill();
                        ctx.stroke();
                    } else if (at.background !== undefined && at.background != '') {
                        ctx.fillStyle = at.background;
                        ctx.fillRect(ax, ay, at.width, at.height);
                    } else {
                        if (at.border !== undefined) ctx.strokeStyle = at.border;
                        ctx.strokeRect(ax, ay, at.width, at.height);
                    }
                }
                if (undefined != at.yyk) ctx.shadowBlur = 0;
                if (at.opacity !== undefined) ctx.globalAlpha = 1;
                //ctx.closePath();
                //ctx.restore();
                break;
            case 'arc':
                if (at.r > 0) {
                    ctx.beginPath();
                    ctx.lineCap = "round";
                    if (at.line !== undefined) ctx.lineWidth = at.line;
                    if (at.background !== undefined) ctx.fillStyle = at.background;
                    if (at.border !== undefined) ctx.strokeStyle = at.border;
                    ctx.arc(ax, ay, parseInt(at.r), 0, 2 * Math.PI);
                    if (at.background !== undefined) ctx.fill();
                    ctx.closePath()
                    ctx.stroke();
                }
                break;

            case 'dbian':	//多边形
                if (at.r > 0 && at.bian > 2) {
                    ctx.beginPath();
                    ctx.moveTo(ax + at.r * Math.cos(2 * Math.PI * 0 / at.bian), ay + at.r * Math.sin(2 * Math.PI * 0 / at.bian));
                    for (var i = 1; i <= at.bian; i++) {
                        ctx.lineTo(ax + at.r * Math.cos(2 * Math.PI * i / at.bian), ay + at.r * Math.sin(2 * Math.PI * i / at.bian));
                    }
                    ctx.closePath();
                    if (undefined != at.border) ctx.strokeStyle = at.border;
                    if (at.line !== undefined) ctx.lineWidth = at.line;
                    if (at.background !== undefined) { ctx.fillStyle = at.background; ctx.fill() }
                    ctx.stroke();
                }
                break;
            case 'line':
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.lineJoin = "round"; //圆角
                var start = true;

                let fx = 0, fy = 0;
                if (undefined != at.f) {
                    if (at.f.attr.mousemove) {
                        fx = at.f.mx;
                        fy = at.f.my;
                    } else {
                        fx = at.f.attr.x;
                        fy = at.f.attr.y;
                    }
                }

                if (ax !== undefined) {
                    start = false
                    ctx.moveTo(ax, ay);
                }
                //p(fx);
                for (var pos in at.path) {
                    if (at.path[pos].length == 2) {
                        var mvx = at.path[pos][0] * bli + fx;
                        if (start) {
                            ctx.moveTo(mvx, at.path[pos][1] * bli + fy);
                        } else {
                            ctx.lineTo(mvx, at.path[pos][1] * bli + fy);
                        }
                        start = false;
                    } else {
                        start = true;
                        ctx.closePath();
                    }
                }
                if (at.color !== undefined) ctx.strokeStyle = at.color;
                if (at.line !== undefined) ctx.lineWidth = at.line;
                ctx.stroke();
                break;
            default:
                p('错误的类型');
                this.dis = false
                break;
        }

        if (this.ty != 'font' && undefined !== at.text && at.text != '' && undefined !== at.width && undefined !== at.height) {
            ctx.scale(0.5, 0.5);
            if (at.color !== undefined) ctx.fillStyle = at.color;
            if (at.font !== undefined) { ctx.font = at.font; }	//30px 微软雅黑
            if (at.textalign !== undefined) ctx.textAlign = at.textalign; //点的左右
            if (at.valign !== undefined) ctx.textBaseline = at.valign; //上下线

            if (/\n/.test(that.attr.text)) {
                var aText = that.attr.text.split('\n');
                for (var n in aText) {
                    ctx.fillText(aText[n], (ax + at.width / 2) * 2, (ay + at.height / 2 + n * 20) * 2);
                }
            } else {
                ctx.fillText(that.attr.text, (ax + at.width / 2) * 2, (ay + at.height / 2) * 2);
            }
            ctx.scale(2, 2);
            ctx.stroke();
        }
        return true;
    }
}