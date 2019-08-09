'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Btn from '../ex/btn'
import Dongtu from '../ex/dongtu'
import Opacity from '../ex/opacity'
import Font from '../ex/font'
import Bgv from '../ex/bgv'
import { p, rand, ww, wh, pww, liuhai, now_m, bli, post, ptj, alt, now, mGS, bli2, f_w, f_arr, sc, gc, date, syT, randArr, loading } from '../inc/func'

export default class Comm {
    constructor() {
        //this.maiChuan(4);
        //this.bg();

        this.dianjiJB = 0;
        this.scTime = 0;
        this.randKD = 0;

        this.moreX = 0;
    }

    tishi(str) { //提示
        let s = 3;
        let f = '12px 微软雅黑';
        //for (let n in this.alts){        
        let w = f_w(str, f);
        if (ios) {
            G.dom['cm_tishi' + now_m()] = new Opacity('div', 'zindex:100;border:#994528;endy:' + (wh / 2 - 50) * bli + ';background:#666;yy:#000;yyk:10;color:#FFF;line:2;x:center;e_opacity:0;s_e:' + s + ';y:center;font:' + f + ';textalign:center;valign:middle;radius:3;width:' + (w * bli2 + 40) + ';height:40;', { text: str, end: function (t) { t.remove(); } });
            G.iniDoms();
        } else {
            G.dom['cm_tishi'] = new Opacity('div', 'zindex:100;border:#994528;endy:' + (wh / 2 - 50) * bli + ';background:#666;color:#FFF;line:2;x:center;e_opacity:0;s_e:' + s + ';y:center;font:' + f + ';textalign:center;valign:middle;radius:3;width:' + (w * bli2 + 40) + ';height:40;', { text: str, end: function (t) { t.remove(); } });
        }
    }

    kuangDian() {
        //p(G.aaList.conf);
        //p(this.getDGG());
        //p(G.aaList.conf.start);
        if (undefined === G.aaList || undefined === G.aaList.conf || G.aaList.conf.start != 1 || G.nDgg > 8) {
            p('未达点击要求 -start ' + G.aaList.conf.start + ' -- ' + G.nDgg);
            return;
        }
        let that = this;
        this.randKD = rand(5, 15);
        if (undefined !== G.bannerAd) {
            G.bannerAd.style.left = ww * bli - 0.5;
        }
        this.dianjiJB = 0;
        let bgTU = I + 'dj/gbg.jpg';
        if (undefined !== G.aaList.conf.start_pic && G.aaList.conf.start_pic != '') {
            bgTU = G.aaList.conf.start_pic;
        }
        G.dom.gg_dj_bg = new Dom('img', 'class:commdj;zindex:20;src:' + bgTU + ';x:0;y:0;width:100%;height:100%;', { click: function () { } });

        G.dom.gg_dj_n = new Dom('img', 'class:commdj;zindex:20;src:' + I + 'dj/n.png;x:103;y:918;p_x:0;p_y:500;p_w:44;p_h:24;width:44;height:24;');
        G.dom.gg_dj_k = new Dom('img', 'class:commdj;zindex:20;src:' + I + 'dj/k.png;x:100;y:416;width:50;height:528;');

        G.dom.gg_btnx = new Dongtu('img', 'dongsu:5;class:commdj;zindex:20;src:' + I + 'dj/1.png;x:275;y:' + (wh - 239 - liuhai) + ';width:278;height:239;',
            { imgs: { 0: { dir: '' + I + 'dj/%.png', min: 1, loop: true, max: 2 } }, click: function () { that.kuangDianCK(); } });
        G.iniDoms();
    }
    kuangDianCK() {
        if (now() - this.scTime <= 2) {
            return;
        }

        this.dianjiJB += 1;
        this.djJDT(this.dianjiJB);
        this.tishi('总共得到 ' + this.dianjiJB + ' 金币');
        if (this.dianjiJB >= this.randKD) {
            p('输出广告');
            if (undefined !== G.bannerAd) {
                G.bannerAd.style.left = 0;
            }
            this.kuangDianEnd();
        }
    }
    djJDT(n) {
        if (undefined !== G.dom.gg_dj_n) {
            if (n > 20) {
                n = 20;
            }
            let h = parseInt((n / 20) * 524);
            G.dom.gg_dj_n.attr.p_h = h;
            G.dom.gg_dj_n.height(h * bli);
            G.dom.gg_dj_n.attr.p_y = 524 - h;
            G.dom.gg_dj_n.attr.y = (418 + 524 + liuhai - h) * bli;
        }
    }
    getDGG() {
        p(date('Ymd') + '_dGGx');
        let n = wx.getStorageSync(date('Ymd') + '_dGGx');
        if (undefined === n || n == '') {
            n = 0
        } else {
            n = parseInt(n);
        }
        p('点ad -- ' + n);
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
                    if (that.dianjiJB > 0) {
                        that.dj_jinBi = that.dianjiJB;
                    }
                    that.tishi('恭喜，总共点到 ' + that.dj_jinBi + ' 金币');
                    that.dianjiJB = 0;
                }
            }, 'json');
        }
        G.delClass('commdj');
    }

    ceBian() {	//左侧栏
        let that = this;
        let zindex = 15;
        if (G.currPage == 'play'){
            G.play.stop = true;
            zindex = G.play.zindex+1;
        }
        
        if (undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0) {
            return
        }
        G.dom.cz_bgjs = new Dom('img', 'class:zche;zindex:' + zindex+';src:' + I + 'zc/gray.png;x:0;y:0;width:100%;height:100%;', { click: function () { } });
        G.dom.cz_btn = new Btn('img', 'class:zche;zindex:' + zindex +';src:' + I + 'zc/3.png;x:497;y:480;width:79;height:97;', 
            {
                bli: 750, click: function () {
                    if (G.currPage == 'play' && G.dom['me'].dis) {
                        G.play.stop = false;
                    };
                    that.moreX = 450; } });

        G.dom.cz_morebg = new Dom('img', 'class:zche;zindex:' + zindex +';src:' + I + 'zc/2x.png;x:0;y:150;width:497;height:878;', { bli: 750 });
        G.dom.cz_gjList = new Dom('div', 'class:zche;zindex:' + zindex +';line:0;border:#000;width:489;height:600;x:0;y:230;', { bli: 750});
        let list = G.randArr(G.aaList.sy, 12);

        if (list.length < 12) {
            let list2 = G.randArr(G.aaList.sy, 12 - list.length);
            for (let k2 in list2) {
                list.push(list2[k2]);
            }
        }

        let sx = 20, sy = 30;
        for (var k in list) {
            let i = parseInt(k) + 1;
            let o = list[k];
            G.dom['cz_one' + i] = new Dom('img', 'radius:15;class:zche;zindex:' + zindex +';src:' + list[k].spic + ';x:' + sx + ';y:' + (sy) + ';;width:135;height:135;',
                { bli: 750, f: G.dom.cz_gjList, click: function () { G.goAPPID(o['appid'], o['path'], o['id'], 3); } });//游戏图
            G.dom['cz_one_1' + i] = new Dom('font', 'class:zche;zindex:' + zindex+';font:12px 微软雅黑;x:' + (sx + 67.5) + ';y:' + (sy + 158) + ';textalign:center;color:#000;valign:middle;', { bli: 750, f: G.dom.cz_gjList, text: list[k].name });
            if (rand(1, 5) == 1) {
                G.dom['cz_icon' + i] = new Dom('img', 'class:zche;zindex:' + zindex +';src:' + I + 'zc/5.png;x:' + (sx + 75) + ';y:' + (sy - 5) + ';;width:74;height:44;',
                    { bli: 750, f: G.dom.cz_gjList, });
            }
            sx += 157;
            if (i > 0 && i % 3 == 0) {
                sx = 20;
                sy += 191;
            }
        }
        G.iniDoms();
    }
    bigTu(n) {
        if (undefined !== G.aaList.ewm && undefined !== G.aaList.ewm[n] && G.aaList.ewm[n]['pic'] != '') {
            wx.previewImage({
                current: G.aaList.ewm[n]['pic'], // 当前显示图片的http链接
                urls: [G.aaList.ewm[n]['pic']], // 需要预览的图片http链接列表
                success: function () {
                },
                fail: function () {
                }
            });
        }
    }
    moreGameS() {    //收回
        if (undefined === G.aaList || this.moreX <= 0) {
            return;
        }
        if (undefined === G.dom.cz_gjList) {
            return;
            //this.moregame();
        }
        let bli = window.innerWidth / 750;
        if (this.moreX > 0) {
            this.moreX -= 20;
            if (this.moreX <= 450) {
                G.dom.cz_btn.attr.x = (450 - (450 - this.moreX)) * bli;
                G.dom.cz_morebg.attr.x = (0 - (450 - this.moreX)) * bli;
                G.dom.cz_gjList.attr.x = (0 - (450 - this.moreX)) * bli;
                G.dom.cz_gjList.attr.px = (0 - (450 - this.moreX)) * bli;
                if (undefined !== G.dom.cz_gjList2) {
                    G.dom.cz_gjList2.attr.x = (0 - (440 - this.moreX)) * bli;
                    G.dom.cz_gjList2.attr.px = (0 - (440 - this.moreX)) * bli;
                }
                if (this.moreX <= 0) {
                    this.moreX = 0;
                    G.delClass('zche');
                }
            }
        } else {
            this.moreX = 0;
            G.delClass('zche');
        }
    }

}