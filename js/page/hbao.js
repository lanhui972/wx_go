'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Btn from '../ex/btn'
import Dongtu from '../ex/dongtu2'
import Opacity from '../ex/opacity'
import Font from '../ex/font'
import { p, rand, loading, liuhai, now_m, post, alt, now, mGS, f_w, f_arr, sc, gc, date, syT } from '../inc/func'

var ww = 750;
var bli = window.innerWidth / ww;
var bli2 = ww / window.innerWidth;
var wh = window.innerHeight / bli;
export default class Hbao {
    constructor() {
        this.close = 0;
        this.adVideo = true;
        //this.maiChuan(4);
        //this.bg();

        this.dianjiJB = 0;
        this.dj_jinBi = 0;
        this.scTime = 0;
    }
    //

    tishi(str) {
        let s = 2;
        let f = '12px 微软雅黑';
        //for (let n in this.alts){        
        let w = f_w(str, f);
        G.dom['cm_tishi'] = new Opacity('div', 'zindex:200;border:#994528;background:#666;color:#FFF;line:1;x:center;e_opacity:0;s_e:' + s + ';y:center;font:' + f + ';textalign:center;valign:middle;radius:3;width:' + (w * bli2 + 100) + ';height:60;', { text: str, end: function (t) { p(t); t.remove(); } });
    }
    kuangDian() {
        //p(G.aaList.conf);
        //p(this.getDGG());
        if (undefined === G.aaList || undefined === G.aaList.conf || G.aaList.conf.start != 1 || G.nDgg > 6){
            p('未达点击要求');
            return;
        }
        let that = this;
        G.adOK = false;
        if (undefined !== G.bannerAd) {
            G.bannerAd.destroy()
        }
        this.dianjiJB = 0;
        let bgTU = I + 'dj/gbg.jpg';
        if (undefined !== G.aaList.conf.start_pic && G.aaList.conf.start_pic!=''){
            bgTU = G.aaList.conf.start_pic;
        }
        G.dom.gg_dj_bg = new Dom('img', 'class:commdj;zindex:220;src:' + bgTU+';x:0;y:0;width:100%;height:100%;', { bli: 750, click: function () { } });
        
        G.dom.gg_dj_n = new Dom('img', 'class:commdj;zindex:220;src:' + I + 'dj/n.png;x:103;y:918;p_x:0;p_y:500;p_w:44;p_h:24;width:44;height:24;', { bli: 750});
        G.dom.gg_dj_k = new Dom('img', 'class:commdj;zindex:220;src:' + I + 'dj/k.png;x:100;y:416;width:50;height:528;', { bli: 750});

        G.dom.gg_btnx = new Dongtu('img', 'dongsu:5;class:commdj;zindex:220;src:' + I + 'dj/1.png;x:275;y:' + (wh - 239 - liuhai) + ';width:278;height:239;',
            { imgs: { 0: { dir: '' + I + 'dj/%.png', min: 1, loop: true, max: 2 } }, bli: 750, click: function () { if (G.closeCommDJ<=0){ that.kuangDianCK();} } });

        G.iniDoms();
    }
    djJDT(n){
        if (undefined !== G.dom.gg_dj_n){
            if (n>20){
                n = 20;
            }
            let h = parseInt((n/20)*524);
            G.dom.gg_dj_n.attr.p_h = h;
            G.dom.gg_dj_n.height(h*bli);
            G.dom.gg_dj_n.attr.p_y = 524 - h;
            G.dom.gg_dj_n.attr.y = (418+524+liuhai - h)*bli;
        }
    }
    kuangDianCK() {
        if (now() - this.scTime<=2){
            return;
        }
        if (!G.adOK && this.dianjiJB >= 4){
            G.adOK = true;
            G.ad();
        }
        this.dianjiJB += 1;
        this.djJDT(this.dianjiJB);
        this.tishi('总共得到 ' + this.dianjiJB + ' 金币');
        if (this.dianjiJB >= 20){
            this.kuangDianEnd();
        }
    }
    getDGG(){
        p(date('Ymd') + '_dGGx');
        let n = wx.getStorageSync(date('Ymd')+'_dGGx');
        if (undefined === n || n == '') {
            n = 0
        } else {
            n = parseInt(n);
        }
        p('点ad -- '+n);
        return n;
    }
    kuangDianEnd() {
        if (this.dianjiJB > 0) {
            let that = this;
            let n = this.getDGG() + 1;
            wx.setStorageSync(date('Ymd') + '_dGGx', n);
            post({ act: 'djJB', jbi: that.dianjiJB, }, function (data) {
                that.scTime = now();
                if (data.code == 200) {
                    G.us.jbi = data.jbi;
                    if (undefined !== G.dom.jbi) {
                        p('has jbs');
                        G.dom.jbi.attr.text = data.jbi;
                    } else {
                        p('no jbs');
                    }
                    if (that.dianjiJB > 0){
                        that.dj_jinBi = that.dianjiJB;
                    }
                    that.tishi('恭喜，总共点到 ' + that.dj_jinBi + ' 金币');
                    that.dianjiJB = 0;
                }
            }, 'json');
            
            G.closeCommDJ = 10;
        }
    }


    kai() {	//红包
        if (!this.adVideo || this.close >= 2) {
            this.kuangDian();
            return;
        }
        let that = this;
        G.delClass('comm');
        G.dom.hbbg = new Dom('img', 'class:comm;zindex:220;src:' + I + '1.png;x:0;y:0;width:100%;height:100%;', { bli: 750, click: function () { } });

        //G.dom.hbbg = new Dom('div', 'line:1;class:comm;zindex:20;border:#FFF;color:#FEEB84;background:#000;opacity:0.6;width:100%;height:100%;x:0;y:0;', { bli: 750,click:function(){}});
        G.dom.hbb = new Dom('img', 'class:comm;zindex:220;src:' + I + 'hb/hbb.png;x:' + (ww - 600) / 2 + ';y:' + (650 - 758 / 2) + ';width:603;height:758;', { bli: 750 });
        G.dom.font11 = new Dom('font', 'class:comm;zindex:220;font:24px 微软雅黑;x:' + (ww / 2) + ';y:550;textalign:center;color:#FFF;valign:middle;', { bli: 750, text: '观看视频领取' }); //余额
        G.dom.hblq = new Btn('img', 'class:comm;zindex:220;src:' + I + 'hb/hblq.png;x:' + (ww - 287) / 2 + ';y:' + (730 - 289 / 2) + ';width:287;height:289;',
            { bli: 750, click: function () { G.hb_vad(); } }); //领取
        G.dom.hbgb = new Btn('img', 'class:comm;zindex:220;src:' + I + 'hb/hbgb.png;x:608;y:286;width:45;height:44;',
            { bli: 750, click: function () { that.close += 1; that.kuangDian(); G.delClass('comm'); } }); //返回
        G.iniDoms();
    }

    vadOK(n) {
        if (n == 0) { //未看完
            alt('看完视频才可打开红包！');
        } else if (n == 2) { //加载失败
            alt('无法加载视频，稍后重试！');
            this.adVideo = false;
        } else {
            this.lq();
        }
    }
    //

    lq() {	//领取红包提现
        let that = this;
        loading('打开红包余额');
        post({
            act: 'lhb'
        }, function (d) {
            wx.hideLoading();
            if (d.code == 200) {
                G.delClass('comm');
                G.dom.hbbg = new Dom('img', 'class:comm;zindex:220;src:' + I + '1.png;x:0;y:0;width:100%;height:100%;', { bli: 750, click: function () { } });
                //G.dom.hbbg = new Dom('div', 'line:1;class:comm;zindex:20;border:#FFF;color:#FEEB84;background:#000;opacity:0.6;width:100%;height:100%;x:0;y:0;', { bli: 750, click: function () { } });
                G.dom.hbb = new Dom('img', 'class:comm;zindex:220;src:' + I + 'hb/hbb2.png;x:' + (ww - 603) / 2 + ';y:' + (650 - 758 / 2) + ';width:603;height:758;', { bli: 750 });
                G.dom.hbtx = new Btn('img', 'xg:3;class:comm;zindex:220;src:' + I + 'hb/hbtx.png;x:' + (ww - 158) / 2 + ';y:790;width:158;height:76;',
                    { bli: 750, click: function () { that.tx() } }); //提现
                G.dom.hbgb2 = new Btn('img', 'class:comm;zindex:220;src:' + I + 'hb/hbgb.png;x:608;y:286;width:45;height:44;',
                    { bli: 750, click: function () { if (d.data.lq > 0){that.kuangDian();} G.delClass('comm'); } }); //返回

                G.dom.font11 = new Dom('font', 'class:comm;zindex:220;font:24px 微软雅黑;x:' + (ww / 2 + 40) + ';y:460;textalign:center;color:#DF523F;valign:middle;', { bli: 750, text: d.data.hbao }); //余额
                if (undefined !== d.data && undefined !== d.data.lq && d.data.lq > 0) {
                    G.dom.font12 = new Dom('font', 'class:comm;zindex:220;font:34px 微软雅黑;x:' + (ww / 2) + ';y:620;textalign:center;color:#f04f38;valign:middle;', { bli: 750, text: d.data.lq + '元' }); //已存入余额
                }
                G.iniDoms();
            }
        });
    }
    tx() {
        alt('抱歉，未达到提现金额！');
    }
}