'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Btn from '../ex/btn'
import Dongtu from '../ex/dongtu2'
import Opacity from '../ex/opacity'
import Font from '../ex/font'
import Bgv from '../ex/bgv'
import { p, rand, ww, wh, pww, liuhai, now_m, bli, post,ptj, alt, now, mGS, bli2, f_w, f_arr, sc, gc, date, syT, randArr, loading } from '../inc/func'

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
        this.randKD = rand(5,15);
        if (undefined !== G.bannerAd) {
            G.bannerAd.style.left = ww*bli-0.5;
        }
        this.dianjiJB = 0;
        let bgTU = I + 'dj/gbg.jpg';
        if (undefined !== G.aaList.conf.start_pic && G.aaList.conf.start_pic != '') {
            bgTU = G.aaList.conf.start_pic;
        }
        G.dom.gg_dj_bg = new Dom('img', 'class:commdj;zindex:20;src:' + bgTU + ';x:0;y:0;width:100%;height:100%;', {click: function () { } });

        G.dom.gg_dj_n = new Dom('img', 'class:commdj;zindex:20;src:' + I + 'dj/n.png;x:103;y:918;p_x:0;p_y:500;p_w:44;p_h:24;width:44;height:24;');
        G.dom.gg_dj_k = new Dom('img', 'class:commdj;zindex:20;src:' + I + 'dj/k.png;x:100;y:416;width:50;height:528;');

        G.dom.gg_btnx = new Dongtu('img', 'dongsu:5;class:commdj;zindex:20;src:' + I + 'dj/1.png;x:275;y:' + (wh - 239 - liuhai) + ';width:278;height:239;',
            { imgs: { 0: { dir: '' + I + 'dj/%.png', min: 1, loop: true, max: 2 } },click: function () {that.kuangDianCK();} });
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
        if (undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0) {
            return
        }
        G.dom.cz_bgjs = new Dom('img', 'class:zche;zindex:15;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { click: function () { } });
        G.dom.cz_btn = new Btn('img', 'class:zche;zindex:15;src:' + I + 'zc/3.png;x:497;y:480;width:79;height:97;', { bli: 750, liuhai: false, click: function () { that.moreX = 450; } });

        if (undefined !== G.aaList.ewm && G.aaList.ewm.length > 0) {
            let ppy = ppy = (wh - 1400 - ww * 0.35) / 2;
            if (ppy <= 0) {
                ppy = 1;
            }


            G.dom.cz_morebg = new Dom('img', 'class:zche;zindex:15;src:' + I + 'zc/k.png;x:0;y:' + ppy + ';width:497;height:1050;', { bli: 750, });
            G.dom.cz_gjList = new Dom('div', 'class:zche;zindex:15;line:0;border:#000;width:489;height:560;x:0;y:' + ppy + ';', { bli: 750 });
            let list = G.randArr(G.aaList.sy, 9);
            let sx = 20, sy = 28;
            for (var k in list) {
                let i = parseInt(k) + 1;
                let o = list[k];
                G.dom['cz_one' + i] = new Dom('img', 'radius:15;class:zche;zindex:15;src:' + list[k].spic + ';x:' + sx + ';y:' + (sy) + ';width:135;height:135;',
                    { bli: 750, f: G.dom.cz_gjList, click: function () { G.goAPPID(o['appid'], o['path'], o['id'], 3); } });//游戏图
                G.dom['cz_one_1' + i] = new Dom('font', 'class:zche;zindex:15;font:11px 微软雅黑;x:' + (sx + 67.5) + ';y:' + (sy + 148) + ';textalign:center;color:#000;valign:middle;', { bli: 750, f: G.dom.cz_gjList, text: list[k].name });
                if (rand(1, 5) == 1) {
                    G.dom['cz_icon' + i] = new Dom('img', 'class:zche;zindex:15;src:' + I + 'zc/5.png;x:' + (sx + 135 - 60) + ';y:' + (sy - 5) + ';;width:60;height:36;',
                        { bli: 750, f: G.dom.cz_gjList, });
                }
                sx += 157;
                if (i == 6 || i == 3) {
                    sx = 20;
                    sy += 175;
                }
            }

            G.dom.cz_gjList2 = new Dom('div', 'class:zche;zindex:15;line:0;border:#000;width:450;height:430;x:20;y:' + (ppy + 560) + ';', { overflow: true, ofx: 2, mousemove: true, bli: 750 });
            sx = 8, sy = 12;
            for (var k in G.aaList.ewm) {
                let i = parseInt(k) + 1;
                let o = G.aaList.ewm[k];
                G.dom['cz_one2' + i] = new Dom('img', 'radius:15;class:zche;zindex:15;src:' + o.spic + ';x:' + sx + ';y:' + (sy) + ';;width:100;height:100;',
                    { bli: 750, f: G.dom.cz_gjList2, click: function () { that.bigTu(i - 1); ptj(4); } });//游戏图
                G.dom['cz_one2_1' + i] = new Dom('font', 'class:zche;zindex:15;font:10px 微软雅黑;height:15;x:' + (sx + 50) + ';y:' + (sy + 128) + ';textalign:center;color:#000;valign:bottom;', { bli: 750, f: G.dom.cz_gjList2, text: o.name });
                sx += 111;
                if (i > 0 && i % 4 == 0) {
                    sx = 8;
                    sy += 140;
                }
            }
            G.dom.cz_duowan = new Dom('div', 'class:zche;zindex:15;line:0;border:#000;width:200;height:40;x:150;y:' + (ppy + 1000 + liuhai) + ';', { click: function () { that.moreX = 497; G.M.gameBox(); }, f: G.dom.cz_bgjs, bli: 750 });
        } else {
            G.dom.cz_morebg = new Dom('img', 'class:zche;zindex:15;src:' + I + 'zc/2x.png;x:0;y:150;width:497;height:878;', { bli: 750, liuhai: false, });
            G.dom.cz_gjList = new Dom('div', 'class:zche;zindex:15;line:0;border:#000;width:489;height:600;x:0;y:230;', { bli: 750, liuhai: false });
            let list = G.randArr(G.aaList.sy, 12);

            let sx = 20, sy = 30;
            for (var k in list) {
                let i = parseInt(k) + 1;
                let o = list[k];
                G.dom['cz_one' + i] = new Dom('img', 'radius:15;class:zche;zindex:15;src:' + list[k].spic + ';x:' + sx + ';y:' + (sy) + ';;width:135;height:135;',
                    { bli: 750, f: G.dom.cz_gjList, click: function () { G.goAPPID(o['appid'], o['path'], o['id'], 3); } });//游戏图
                G.dom['cz_one_1' + i] = new Dom('font', 'class:zche;zindex:15;font:12px 微软雅黑;x:' + (sx + 67.5) + ';y:' + (sy + 158) + ';textalign:center;color:#000;valign:middle;', { bli: 750, f: G.dom.cz_gjList, text: list[k].name });
                if (rand(1, 5) == 1) {
                    G.dom['cz_icon' + i] = new Dom('img', 'class:zche;zindex:15;src:' + I + 'zc/5.png;x:' + (sx + 75) + ';y:' + (sy - 5) + ';;width:74;height:44;',
                        { bli: 750, f: G.dom.cz_gjList, });
                }
                sx += 157;
                if (i>0 && i%3==0) {
                    sx = 20;
                    sy += 191;
                }
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
            this.moregame();
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







    ceBian2() { //侧边栏
        let that = this;
        if (undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0) {
            return
        }
        G.ad();
        G.lArr = randArr(G.aaList.sy, 9);
        G.delClass('comm');
        G.dom.bgcb = new Dom('img', 'class:comm;zindex:10;src:' + I + 'p_side2.png;x:0;y:207;width:532;height:568;', { liuhai: false, });
        G.dom.close = new Dom('img', 'class:comm;zindex:10;src:' + I + 'p_side2.png;x:447;y:221;p_x:447;p_y:15;width:87;height:65;',
            { liuhai: false, click: function () { G.delClass('comm'); } }  //关闭按钮
        );
        G.dom.cbList = new Dom('div', 'class:comm;zindex:11;line:0;border:#000;width:450;height:600;x:0;y:221;', { liuhai: false, mousemove: true, ofx: 2, overflow: true });
        let sy = 10, sx = 0;
        for (let n in G.lArr) {
            let i = parseInt(n);
            let o = G.lArr[n];
            if (i > 1 && (i + 1) % 3 == 1) {
                sy += 180;
            }
            sx = 15 + i % 3 * 143;
            G.dom['one' + i] = new Dom('img', 'class:comm;radius:10;zindex:11;src:' + o.spic + ';x:' + sx + ';y:' + sy + ';width:125;height:125;',
                { f: G.dom.cbList, click: function () { G.goAPPID(o['appid'], o['path'], o['id'],3); } });//游戏图
            G.dom['one_1' + i] = new Dom('font', 'class:comm;zindex:11;font:12px 微软雅黑;x:' + (sx + 64) + ';y:' + (sy + 145) + ';textalign:center;color:#FFF;valign:middle;', { f: G.dom.cbList, text: o.name });
        }
        G.iniDoms();
    }

    select(t) { //选择范围
        G.ad();
        let that = this;
        G.delClass('comm');
        G.dom.bgdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.bgqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_bg.png;x:center;y:160;width:630;height:912;');
        G.dom.bgtt = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_title.png;x:103;y:173;width:459;height:87;');
        G.dom.gn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { G.delClass('comm'); } });  //关闭按钮

        for (var i = 0; i <= 4; i++) {
            let b = false;
            let n = i;
            if (i == 0) {
                b = true;
            } else if (G.us.ggnum >= i * 200 + 1) {
                b = true;
            }
            if (b) {
                G.dom['xh' + i] = new Btn('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_dt.png;x:93;y:' + (i * 148 + 308) + ';p_x:0;p_y:0;width:574;height:116;',
                    { click: function () { C.choose(t, n); } }); //黄底图
            } else {
                G.dom['xh' + i] = new Btn('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_dt.png;x:93;y:' + (i * 148 + 308) + ';p_x:0;p_y:149;width:574;height:116;',
                    { click: function () { alt('未解锁'); } }); //未解锁关卡 灰底图
            }
        }
        G.dom.numm = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_num.png;x:center;y:326;width:462;height:671;');
        G.iniDoms();
    }

    choose(t, n) { //选择关卡2
        let that = this;
        G.delClass('comm');
        G.dom.bgdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.bgqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_bg.png;x:center;y:160;width:630;height:912;');
        G.dom.bgtt = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_title.png;x:103;y:173;width:459;height:87;');
        G.dom.gn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { G.delClass('comm'); } });  //关闭按钮
        G.dom.chList = new Dom('div', 'class:comm;zindex:10;line:0;border:#000;width:572;height:755;cx:' + (ww / 2) + ';y:280;', { mousemove: true, ofx: 2, overflow: true });

        let y = 10;
        for (var i = n * 200 + 1; i <= (n + 1) * 200; i++) {
            if (i > n * 200 + 1 && (i - 1) % 4 == 0) {
                y += 148;
            }
            let nn = i;
            if (nn <= parseInt(G.us.ggnum) + 1) {
                G.dom['pmls_yx' + i] = new Btn('img', 'class:comm;zindex:10;src:' + I + 't_bg2.png;x:' + (((i - 1) % 4) * 142 + 10) + ';y:' + y + ';p_x:0;p_y:0;width:124;height:128;',
                    { f: G.dom.chList, click: function () { that.goGuan(nn); } });
                G.dom['pmls_num' + i] = new Font('class:comm;zindex:10;fontk:3;line:0;padding:5;border:red;font:20px 微软雅黑;color:FFF;x:' + (((i - 1) % 4) * 142 + 72) + ';y:' + (y + 54) + ';textalign:center;valign:middle;height:40;', { f: G.dom.chList, text: nn });  //关卡数
            } else { //未解锁关卡
                G.dom['pmls_ch' + i] = new Btn('img', 'class:comm;zindex:10;src:' + I + 't_bg2.png;x:' + (((i - 1) % 4) * 142 + 10) + ';y:' + y + ';p_x:148;p_y:0;width:124;height:128;',
                    { f: G.dom.chList, click: function () { alt('未解锁'); } });
            }
            //G.dom['pmls_c' + i] = new Dom('div', 'class:comm;zindex:10;color:#FEEB84;opacity:0.3;background:#000;cx:' + sx + ';cy:' + (sy + 214) + ';width:298;height:70;', { f: G.dom.chList, });

        }

        G.iniDoms();
    }
    goGuan(n) {
        if (undefined === n) {
            G.goPage();
        } else if (n <= 0) {
            G.goPage('play', 1);
        } else {
            G.goPage('play', n);
        }
    }

    guoGuan(t) { //恭喜过关
        G.ad();
        let n2 = wx.getStorageSync(date('Ymd'));
        if (undefined === n2 || n2 == '') {
            n2 = 0;
        } else {
            n2 = parseInt(n2);
        }
        wx.setStorageSync(date('Ymd'), n2 + 1);

        post({ act: 'guoGuan', cs: n2 + 1, gka: t.currGuan, hb: G.config.hbao, time: now_m() - t.startTime }, function (d) {
            //if (undefined !== d.data.hbao && d.data.hbao == 1) {
            //G.hbao.kai();
            //} else {
            //G.hbao.kuangDian();
            //}
        });

        C.kuangDian();
        if (t.maxGuan > 0 && t.currGuan >= t.maxGuan) {
            this.tongGuan(t);
            return;
        }


        let that = this;
        G.dom.sdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.sqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_bg3.png;x:center;y:160;width:630;height:830;');
        G.dom.st = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_title2.png;x:103;y:173;width:459;height:87;');
        G.dom.sn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { 
            //if (!G.play.reVad) { G.play.reVad = true; G.vad(); }else{ G.goPage('play', t.currGuan + 1); } 

            G.goPage('play', t.currGuan + 1);
            /*if (undefined === G.aaList || undefined === G.aaList.conf || undefined === G.aaList.conf.start || G.aaList.conf.start != 1) {
            } else {
                G.goPage('zche');
            }*/
        } });  //关闭按钮

        G.dom.stt = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_zi.png;x:center;y:323;width:449;height:123;');
        G.dom.guan = new Dom('font', 'class:comm;zindex:10;font:29px 微软雅黑;color:#FF264F;x:458;y:348;textalign:center;valign:middle;', { text: t.currGuan }); //关卡数
        G.dom.miao = new Dom('font', 'class:comm;zindex:10;font:18px 微软雅黑;color:#548CAA;x:349;y:427;textalign:center;valign:middle;', { text: G.dom.time.attr.text }); //秒
        G.dom.tgList = new Dom('div', 'class:comm;zindex:10;line:0;border:#000;width:574;height:550;cx:' + (ww / 2) + ';y:420;', {overflow: true });

        if (undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0) {

        } else {
            G.guoArr = randArr(G.aaList.sy, 6);
            let y = 50 , n = 1,py=0,px=0;
            for (var i in G.guoArr) {
                let o = G.guoArr[i];
                
                if (n == 4) {
                    y = 300;
                    py = 70;
                    px = 0;
                }
                G.dom['x_su_' + n] = new Dom('img', 'class:comm;zindex:10;src:' + o.spic + ';x:' + ((n - 1) % 3 * 196) + ';y:' + y + ';width:181;height:181;', { f: G.dom.tgList, click: function () { G.goAPPID(o['appid'], o['path'], o['id'],24);} });
                //G.dom['x_di_' + n] = new Dom('div', 'class:comm;zindex:10;line:1;border:#78C26C;color:#78C26C;background:#78C26C;width:179;height:46;x:' + ((n - 1) % 3 * 196+1) + ';y:' + (y+181) +';', { f: G.dom.tgList, });
                p(((n - 4) * 200));
                G.dom['x_di_' + n] = new Dom('img', 'class:comm;zindex:10;src:' + I + 'fbg.png;x:' + ((n - 1) % 3 * 196) + ';y:' + (y + 181) + ';p_x:' + px + ';p_y:' + py+';p_w:196;p_h:61;width:181;height:50;', { f: G.dom.tgList, });

                G.dom['x_num_' + n] = new Dom('font', 'class:comm;zindex:11;font:13px 微软雅黑;color:#FFF;x:' + ((n - 1) % 3 * 196 + 90.5) + ';y:' + (y+205) +';textalign:center;valign:middle;', { f: G.dom.tgList, text: o.name });
                n += 1;

                px += 200;
            }
        }
        G.dom.next = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 'next.png;x:center;y:1000;width:139;height:32;', { click: function () { 
            G.goPage('play', t.currGuan + 1);
            /*if (undefined === G.aaList || undefined === G.aaList.conf || undefined === G.aaList.conf.start || G.aaList.conf.start != 1) {
                G.goPage('play', t.currGuan + 1);
            } else {
                G.goPage('zche');
            }*/

        } });
        G.iniDoms();
    }


    paiH() { //排行榜
        let that = this;
        G.dom.sdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.sqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_bg.png;x:center;y:160;width:630;height:912;');
        G.dom.st = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_title3.png;x:103;y:173;width:459;height:87;');
        G.dom.sn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { G.delClass('comm'); } });  //关闭按钮

        G.dom.phList = new Dom('div', 'class:comm;zindex:10;line:0;border:#000;width:574;height:781;cx:' + (ww / 2) + ';y:272;', { mousemove: true, ofx: 2, overflow: true });

        loading("读取中");
        post({ act:'gOrder'},function(d){
            loading();
            for (var k in d.ls) {
                let o = d.ls[k];
                let i = parseInt(k)+1;
                let n = i;

                G.dom['line' + i] = new Dom('img', 'class:comm;zindex:10;src:' + I + 'l_line.png;cx:' + (ww / 2 - 72) + ';cy:' + ((i - 1) * 113 + 111) + ';width:592;height:5;', { f: G.dom.phList, click:function(){} });
                G.dom['ph_num' + i] = new Font('class:comm;zindex:11;fontk:3;line:0;padding:5;border:red;font:20px 微软雅黑;color:FFF;cx:43;cy:' + ((i - 1) * 113 + 66) + ';textalign:center;valign:middle;height:22;', { f: G.dom.phList, text: i });
                G.dom['toux' + i] = new Dom('img', 'class:comm;radius:10;zindex:10;src:' + o.pic + ';cx:143;cy:' + ((i - 1) * 113 + 54) + ';width:72;height:72;', { f: G.dom.phList, }); //头像
                G.dom['zi' + i] = new Dom('font', 'class:comm;zindex:10;font:14px 微软雅黑;color:#2E3451;x:210;cy:' + ((i - 1) * 113 + 54) + ';textalign:left;valign:middle;', { f: G.dom.phList, text: o.name });
                G.dom['miao' + i] = new Dom('font', 'class:comm;zindex:10;font:14px 微软雅黑;color:#2E3451;x:500;cy:' + ((i - 1) * 113 + 54) + ';textalign:center;valign:middle;', { f: G.dom.phList, text: o.ggnum + '关' });
                if (i <= 3) {
                    G.dom.qsan = new Dom('img', 'class:comm;zindex:10;src:' + I + 'l_zi.png;cx:43;y:15;p_x:0;p_y:0;width:72;height:310;', { f: G.dom.phList, });
                    G.dom['ph_num' + i] = new Font('class:comm;zindex:11;fontk:3;line:0;padding:5;border:red;font:20px 微软雅黑;color:FFF;cx:43;cy:' + ((i - 1) * 113 + 66) + ';textalign:center;valign:middle;height:22;', { f: G.dom.phList, text: i });
                } else {
                    G.dom['di' + i] = new Dom('img', 'class:comm;zindex:10;xg:1;src:' + I + 'l_zi.png;cx:43;y:' + ((i - 4) * 113 + 365) + ';p_x:0;p_y:349;width:72;height:59;', { f: G.dom.phList, });
                    G.dom['ph_num' + i] = new Font('class:comm;zindex:11;fontk:3;line:0;padding:5;border:red;font:20px 微软雅黑;color:FFF;cx:43;cy:' + ((i - 4) * 113 + 396) + ';textalign:center;valign:middle;height:22;', { f: G.dom.phList, text: i });
                }
            }
        });


        G.iniDoms();
    }


    reSet(gk) { //重置布局
        G.ad();
        let that = this;
        G.dom.sdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.sqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 'c_bg.png;x:center;y:160;width:631;height:557;');
        G.dom.sn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { G.delClass('comm'); } });  //关闭按钮
        G.dom.sure = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 'c_z.png;x:center;y:483;width:393;height:148;', { click: function () {G.goPage('play',gk)} });  //确定
        G.iniDoms();
    }

    tongGuan() { //恭喜通过1000关
        let that = this;
        G.dom.sdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.sqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 'g_bg.png;x:center;y:160;width:632;height:914;');
        G.dom.sn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { G.goPage(); } });  //关闭按钮
        G.dom.gonxi = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 'g_btn.png;x:center;y:870;width:395;height:148;', { click: function () {G.fx();} });  //确定
        G.iniDoms();
    }

    kdianGuo() {
        let that = this;

        if (undefined !== G.bannerAd) {
            G.bannerAd.style.left = (pww-G.bannerAd.style.width)/2;
        }

        G.dom.sdt = new Dom('img', 'class:comm;zindex:10;src:' + I + 'gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
        G.dom.sqd = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_bgx.png;x:center;y:160;width:630;height:790;');
        G.dom.st = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_title2.png;x:103;y:173;width:459;height:87;');
        G.dom.sn_home = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 't_gb.png;x:578;y:173;width:88;height:87;', { click: function () { 
            if (!G.zche.vad) { G.zche.vad = true; G.vad(6); G.goPage('play'); } else { G.goPage('play'); }
            //G.goPage('play'); 
            } });  //关闭按钮
        // 

       //G.dom.stt = new Dom('img', 'class:comm;zindex:10;src:' + I + 't_zi.png;x:center;y:323;width:449;height:123;');
        
        //G.dom.guan = new Dom('font', 'class:comm;zindex:10;font:29px 微软雅黑;color:#FF264F;x:458;y:348;textalign:center;valign:middle;', { text:'难' }); //关卡数
        //G.dom.miao = new Dom('font', 'class:comm;zindex:10;font:18px 微软雅黑;color:#548CAA;x:349;y:427;textalign:center;valign:middle;', { text: G.dom.time.attr.text }); //秒
        G.dom.tgList = new Dom('div', 'class:comm;zindex:10;line:0;border:red;width:574;height:550;cx:' + (ww / 2) + ';y:380;', {overflow: true });

        G.dom.fgai = new Dom('div', 'class:comm;zindex:10;line:0;color:red;font:18px 微软雅黑;border:#FFF;width:630;height:100;textalign:center;x:0;y:130;', { f: G.dom.sqd,text: "恭喜把车子砸烂，顺利进入下一关卡" });
        if (undefined !== G.dom.zabtn){
            G.dom.zabtn.remove();
        }

        if (undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0) {

        } else {
            G.guoArr = randArr(G.aaList.sy, 6);
            let y = 0, n = 1, py = 0, px = 0;
            for (var i in G.guoArr) {
                let o = G.guoArr[i];

                if (n == 4) {
                    y = 300;
                    py = 70;
                    px = 0;
                }
                G.dom['x_su_' + n] = new Dom('img', 'class:comm;zindex:10;src:' + o.spic + ';x:' + ((n - 1) % 3 * 196) + ';y:' + y + ';width:181;height:181;', { f: G.dom.tgList, click: function () { G.goAPPID(o['appid'], o['path'], o['id']); } });
                //G.dom['x_di_' + n] = new Dom('div', 'class:comm;zindex:10;line:1;border:#78C26C;color:#78C26C;background:#78C26C;width:179;height:46;x:' + ((n - 1) % 3 * 196+1) + ';y:' + (y+181) +';', { f: G.dom.tgList, });
                p(((n - 4) * 200));
                G.dom['x_di_' + n] = new Dom('img', 'class:comm;zindex:10;src:' + I + 'fbg.png;x:' + ((n - 1) % 3 * 196) + ';y:' + (y + 181) + ';p_x:' + px + ';p_y:' + py + ';p_w:196;p_h:61;width:181;height:50;', { f: G.dom.tgList, });

                G.dom['x_num_' + n] = new Dom('font', 'class:comm;zindex:11;font:13px 微软雅黑;color:#FFF;x:' + ((n - 1) % 3 * 196 + 90.5) + ';y:' + (y + 205) + ';textalign:center;valign:middle;', { f: G.dom.tgList, text: o.name });
                n += 1;

                px += 200;
            }
        }
        G.dom.next = new Xg('img', 'class:comm;zindex:10;xg:1;src:' + I + 'next.png;x:center;ry:310;width:139;height:32;', { click: function () { 
            if (!G.zche.vad) { G.zche.vad = true; G.vad(6); G.goPage('play'); } else { G.goPage('play'); }
            } });    // if (!G.zche.vad) { G.zche.vad=true; G.vad();}else{ } 
        G.iniDoms();
    }

}