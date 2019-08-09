'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Btn from '../ex/btn'
import Dongtu from '../ex/dongtu'
import Opacity from '../ex/opacity'
import Font from '../ex/font'
import { p, rand, liuhai,randArr, now_m, post, alt, now, mGS, f_w, f_arr, sc, gc, date, syT } from '../inc/func'

var ww = 750;
var bli = window.innerWidth / ww;
var bli2 = ww / window.innerWidth;
var wh = window.innerHeight / bli;
export default class More {
    constructor() {
        //this.maiChuan(4);
        //this.bg();
    }
    del(n) {
        G.gameBox = false; 
        G.delClass('commx');
    }
    getBox() {
        p(11);
    }
    gameBox(mo) {    //游戏盒子
        if (undefined === G.gameList || G.gameList.length <= 0) {
            if (G.currPage == 'play') {
                G.goPage('level');
            } else {
                //alt('开发中~')
                G.goPage();
            }
            return;
        }
        if (G.gameBox) { return; }

        G.gameBox = true;
        let that = this;
        if (undefined !== G.bannerAd) {
            G.bannerAd.destroy();
            G.bannerAd.hide();
        }

        if (undefined !== G.dom.bner) {
            G.dom.bner.attr.del = true;
        }
        let zindex = 12;
        if (G.currPage == 'play' && undefined !== G.play.zindex) {
            zindex = G.play.zindex + 2;
        }
        G.stop = true;
        G.dom.gb_atbg = new Dom('div', 'class:commx;zindex:' + zindex +';line:1;background:#00B5FF;width:100%;height:100%;x:0;y:0;', { bli: 750, click: function () { } });
        G.dom.gb_tbg = new Dom('div', 'class:commx;zindex:' + zindex +';line:1;background:#0099FF;width:100%;height:' + (150 + liuhai - (liuhai > 0 ? 60 : 0)) + ';x:0;y:0;', { bli: 750 });

        let y = 44;
        if (liuhai > 0) {
            y = 1;
        }

        G.dom.gb_fh = new Xg('img', 'class:commx;zindex:' + zindex +';xg:1;src:' + I + 'zc/back.png;x:20;y:' + y + ';width:172;height:62;', 
            { click: function () { 
                if (G.currPage == 'play' && G.dom['me'].dis) {
                    G.play.stop = false;
                }
                if (undefined !== mo && mo == 1) { G.goPage(); } else { that.del(2); G.ad(); } G.stop = false; } });  //返回按钮

        if (G.currPage == 'play') {
            G.dom.gb_home = new Xg('img', 'class:commx;zindex:' + zindex +';xg:1;src:' + I + 'zc/lt1.png;x:200;y:' + y + ';width:64;height:65;', { click: function () { that.del(2); G.goPage(); } });  //返回关卡选择
        } else {
            G.dom.gb_home = new Xg('img', 'class:commx;zindex:' + zindex +';xg:1;src:' + I + 'zc/lt1.png;x:200;y:' + y + ';width:64;height:65;', { click: function () { that.del(2); G.goPage(); } });  //返回首页
        }
        G.dom.gb_fon = new Dom('font', 'class:commx;zindex:' + zindex +';font:18px 微软雅黑;color:#FFF;x:' + (ww / 2) + ';y:' + (y + 36) + ';textalign:center;valign:middle;', { bli: 750, text: '指色玩' });

        if (true) {//G.iosGame.length > 0) { //大图版
            G.dom.gb_bxList = new Dom('div', 'class:commx;line:0;zindex:' + zindex +';border:#5670C7;width:696;height:' + (wh - 150 - (liuhai > 0 ? 60 : 0)) + ';x:27;y:' + (150 - (liuhai > 0 ? 60 : 0)) + ';', { bli: 750, overflow: true, ofx: 2, mousemove: true });
            G.dom['hyzwan'] = new Dom('font', 'class:commx;zindex:' + zindex +';font:16px 微软雅黑;color:#FFF;x:4;y:38;textalign:left;valign:middle;', { bli: 750, f: G.dom.gb_bxList, text: '好友在玩' });
            G.dom['hyzwnx'] = new Dom('div', 'class:commx;line:1;zindex:' + zindex +';border:#5670C7;width:696;height:150;x:0;y:70;background:#FFF;radius:10;', { bli: 750, f: G.dom.gb_bxList });

            let x = 16, y = 86;
            let hyou = randArr(G.aaList.sy, 6);
            for (var k2 in hyou) {
                let o = hyou[k2];
                G.dom['pmls_xx_' + k2] = new Dom('img', 'class:commx;zindex:' + zindex +';src:' + o.pic + ';x:' + x + ';y:85;width:120;height:120;', { bli: 750, f: G.dom.gb_bxList, click: function () { G.goAPPID(o.appid, o.path, o.id, 16) } }); //游戏图
                x += 120 + 16;
            }

            G.dom['hyzwanx'] = new Dom('font', 'class:commx;zindex:' + zindex +';font:16px 微软雅黑;color:#FFF;x:4;y:265;textalign:left;valign:middle;', { bli: 750, f: G.dom.gb_bxList, text: '热门推荐' });
            x = 0, y = 300;
            k2 = 0;
            for (var k1 = 1; k1 <= 2; k1++) {
                for (var k in G.aaList.sy) {
                    let o = G.aaList.sy[k];
                    G.dom['hyzwnx_' + k1 + '_' + k] = new Dom('div', 'class:commx;line:1;zindex:' + zindex +';border:#4E738B;width:335;height:380;x:' + x + ';y:' + y + ';background:#FFF;radius:10;', { bli: 750, f: G.dom.gb_bxList });
                    G.dom['pmls_yx_' + k1 + '_' + k] = new Dom('img', 'class:commx;zindex:' + zindex +';radius:5;src:' + o.pic + ';x:' + (x + 14) + ';y:' + (y + 14) + ';width:308;height:308;', { bli: 750, f: G.dom.gb_bxList, click: function () { G.goAPPID(o.appid, o.path, o.id, 16) } }); //游戏图
                    G.dom['pmls_yx_ff' + k1 + '_' + k] = new Dom('font', 'class:commx;zindex:' + zindex +';font:14px 微软雅黑;color:#5B9CF8;x:' + (x + 14) + ';y:' + (y + 355) + ';textalign:left;valign:middle;', { bli: 750, f: G.dom.gb_bxList, text: o.name });

                    G.dom['pmls_yx_rw' + k1 + '_' + k] = new Dom('font', 'class:commx;zindex:' + zindex +';font:bold 11px 微软雅黑;color:#C35C5B;x:' + (x + 260) + ';y:' + (y + 355) + ';textalign:center;valign:middle;', { bli: 750, f: G.dom.gb_bxList, text: rand(100000, 999999) + '人玩' });

                    if ((parseInt(k2) + 1) % 2 == 0) {
                        x = 0, y += 410;
                    } else {
                        x = 360;
                    }
                    k2 += 1;
                }
            }
            G.dom.gb_bxList.attr.offset.h += 20;
        } else {
            G.dom.gb_bxList = new Dom('div', 'class:commx;line:0;zindex:' + zindex +';border:#5670C7;width:' + (ww - 40) + ';height:' + (wh - 150) + ';x:10;y:' + (150 - (liuhai > 0 ? 60 : 0)) + ';', { bli: 750, overflow: true, ofx: 2, mousemove: true });
            let arls = G.gameList;
            let y = 0;
            for (var n in arls) {
                let a = arls[n];
                let x = 0;
                y += 40;
                if (undefined !== a.name && a.list.length > 0) {
                    G.dom['gb_b_' + n] = new Dom('font', 'class:commx;zindex:' + zindex +';font:bold 15px 微软雅黑;color:#333;x:' + (x + 20) + ';y:' + y + ';textalign:left;valign:top;', { bli: 750, f: G.dom.gb_bxList, text: a.name });
                    y += 60;
                }
                if (a.list.length > 0) {
                    let m = 1;
                    let e = false;
                    for (var n2 in a.list) {
                        e = false;
                        x += 88.7;
                        G.dom['gb_t_' + n + '_' + n2] = new Dom('img', 'class:commx;zindex:' + zindex +';src:' + a.list[n2].img + ';x:' + (x - 65) + ';y:' + y + ';radius:15;width:150;height:150;', { bli: 750, f: G.dom.gb_bxList, appid: a.list[n2].appid, path: a.list[n2].path, id: a.list[n2].id, click: function (t) { G.goAPPID(t.attr.appid, t.attr.path, t.attr.id); } });//游戏图片
                        G.dom['gb_1_' + n + '_' + n2] = new Dom('font', 'class:commx;zindex:' + zindex +';font:12px 微软雅黑;color:#000;x:' + (x + 10) + ';y:' + (y + 160) + ';textalign:center;valign:top;', { bli: 750, f: G.dom.gb_bxList, text: a.list[n2].name });
                        G.dom['gb_2_' + n + '_' + n2] = new Dom('font', 'class:commx;zindex:' + zindex +';font:11px 微软雅黑;color:#BEBDBE;x:' + (x + 10) + ';y:' + (y + 195) + ';textalign:center;valign:top;', { bli: 750, f: G.dom.gb_bxList, text: a.list[n2].count_jump + '人在玩' });
                        //G.dom['gb_s_' + n + '_' + n2] = new Dom('div', 'class:commx;zindex:12;line:1;border:#292E5D;color:#292E5D;radius:15;font:11px 微软雅黑;valign:middle;textalign:center;x:' + (x - 50) + ';y:' + (y + 193) + ';width:100;height:40;', { text: '开始玩', bli: 750, f: G.dom.gb_bxList, appid: a.list[n2].appid, path: a.list[n2].path, id: a.list[n2].id, click: function (t) { G.goAPPID(t.attr.appid, t.attr.path, t.attr.id); } });//游戏图片
                        m += 1;
                        x += 88.7;
                        if (m > 4) {
                            e = true;
                            m = 1;
                            x = 0;
                            y += 245;
                        }
                    }
                    if (!e) {
                        y += 235;
                    }
                }
                if (undefined !== a.bn) {
                    y += 20;
                    G.dom['gb_bn_' + n] = new Dom('img', 'class:commx;zindex:' + zindex +';src:' + a.bn[3] + ';x:20;y:' + y + ';width:' + (ww - 80) + ';height:170;', { bli: 750, f: G.dom.gb_bxList, click: function () { G.goAPPID(a.bn[0], a.bn[1], a.bn[2]); } });//游戏图片
                    y += 180;
                } else {
                    y += 20;
                    G.dom['gb_bl_' + n] = new Dom('line', 'class:commx;zindex:' + zindex +';line:1;color:#EEE;', { bli: 750, f: G.dom.gb_bxList, path: [[20, y], [690, y]] });//游戏图片
                }
            }
            G.dom.gb_bottom = new Dom('div', 'class:commx;zindex:' + zindex +';line:1;background:#9933FB;height:50;x:0;y:' + (y + liuhai) + ';', { bli: 750, f: G.dom.gb_bxList });
        }
        G.iniDoms();
    }
}