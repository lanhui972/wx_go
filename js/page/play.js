'use strict'
import Dom from '../inc/dom'
import Xg from '../ex/xg'
import Btn from '../ex/btn'
import Font from '../ex/font'
import Hua from '../ex/hua'
import Shouhuo from '../ex/shouhuo'
import Dongtu from '../ex/dongtu'
import Kuang from '../ex/kuang'
import Bgv from '../ex/bgv'
import { md5 } from '../inc/md5'
import Opacity from '../ex/opacity'
import Spine from '../ex/spine'
import Move from '../ex/move'

import { p, ww, wh, pwh, ex, un, liuhai, rand, bli, gc, ptj, sc, now_m, vFloat, post, alt, bli2, mGS, inQ, inDom, now, data_r, base64, f_arr, alert, loading, linePos, date, f_w, pww, randArr } from '../inc/func'

export default class Play {
    constructor() {
        let that = this;
        let hgt = (wh * 0.75 - liuhai);
        G.dom['tbgx'] = new Dom('img', 'src:' + I + 'bg/sky2.jpg;x:0;y:0;width:100%;height:' + (wh * 0.30 + liuhai) + ';');
        G.dom['lu'] = new Dom('img', 'src:' + I + 'bg/zbg.png;x:0;y:' + wh * 0.25 + ';width:100%;height:' + hgt + ';', { click: function (t, spos, epos) { if (that.stop) { return } that.move(spos, epos) } });

        G.dom['tu_back'] = new Btn('img', 'xg:2;zindex:11;src:' + I + 'zc/xback.png;x:20;y:20;width:88;height:88;', { click: function () { G.play.stop = true; if (undefined !== G.aaList && G.aaList.conf.syad == 1) { G.M.gameBox(); } else { G.goPage('index'); } } });


        G.dom['jbi'] = new Dongtu('img', 'zindex:10;src:' + I + 'bg/coin_1x10.png;x:150;dongsu:3;y:30;width:70;height:66;p_w:70;p_h:66;p_x:0;p_y:0;',
            {
                nCurrImg: 0,
                imgs: {
                    0: {
                        dir: I + 'bg/coin_1x10.png', loop: true, ok: { func: function (t) { that.stop = false; ex(function () { t.curr('run'); }, 30); } },
                        imgxy: [{ p_x: 0, p_y: 0 }, { p_x: 70, p_y: 0 }, { p_x: 140, p_y: 0 }, { p_x: 210, p_y: 0 }, { p_x: 280, p_y: 0 },
                        { p_x: 350, p_y: 0 }, { p_x: 420, p_y: 0 }, { p_x: 490, p_y: 0 }, { p_x: 560, p_y: 0 }, { p_x: 630, p_y: 0 },]
                    },
                }
            })
        G.dom['jbs'] = new Dom('font', 'zindex:10;x:240;y:70;color:#F90;font:bold 27px \'\';valign:middle;textalign:left;', { text: 0 });

        G.dom['me'] = new Dongtu('img', 'zindex:10;src:' + I + 'bg/ren.png;cx:' + ww * .5 + ';dongsu:3;ry:400;width:132;height:148;',
            {
                nCurrImg: 'run',
                imgs: {
                    0: { dir: I + 'bg/ren.png', loop: false, width: 150, height: 176, ok: { func: function (t) { that.stop = false; ex(function () { t.curr('run'); }, 30); } } },
                    'run': {
                        dir: I + 'bg/ren.png', loop: true, width: 150, height: 176, dongsu: 2,
                        ok: { func: function (t) { t.curr('jump'); } }
                    },
                    'jump': {
                        dir: I + 'bg/ren.png', cy: -40, loop: false, width: 150, height: 176, dongsu: 2,
                        ok: { func: function (t) { t.curr('run'); } }
                    },
                    'slide': {
                        dir: I + 'bg/ren.png', loop: false, width: 150, height: 176, dongsu: 2,
                        ok: { func: function (t) { t.curr('run'); } }
                    }
                }
            }
        );

        this.stop = false;

        this.currPos = 0;   //当前位置


        this.ySD = 1;
        this.xSD = liuhai > 0 ? 0.95 : 1.1;
        this.xZY = liuhai > 0 ? 0.25 : 0.3;

        this.lxArr = {};
        this.lxTime = 20;
        this.lxCTime = 0;

        this.jArr = {};
        this.jTime = 20;
        this.jCTime = 0;
        //G.dom['l_f'] = new Dom('img', 'src:' + I + 'jzu/bg08.png;cx:' + ww * 0.36 + ';y:' + (wh * 0.25 - 259 * 0.9) + ';width:182;height:259;', { csbl: 0.3, csbly: 2, ysd: this.ySD });

        /*G.dom['ibg'] = new Dongtu('img', 'src:' + I + 'ibg/bg_game_00.jpg;x:0;dongsu:7;y:0;width:100%;height:100%;',
            {
                click: function () { that.kqiang() },
                imgs: { 0: { dir: I + 'ibg/bg_game_%%.jpg', min: 56, loop: true, max: 0 } }
            }
        );*/

        //G.dom['qiang'] = new Dom('img', 'zindex:4;x:0;y:0;src:' + I + 'bg/gun_left.png;x:0;ry:0;width:150;height:125;p_w:149;p_h:125;p_x:0;p_y:0;', { fx: 1 });

        this.csj = [130, 150, 140];
        this.arJB = [0, 0, 0];
        this.arJBT = [0, 0, 0];
        this.sshang = 0;    //受伤闪
        this.xliang = 5;
        this.zdArr = {};
        this.zindex = 20;
        //this.bZuDang();
        //this.tc();

        if (!(undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0)) {
            this.ggX = {};
            G.dom['adk'] = new Dom('div', 'line:1;border:#FFF;zindex:10;background:#596468;x:0;ry:0;width:100%;height:200;');
            let yy = G.dom['adk'].y() * bli2 + 20;
            let xx = 20;
            for (let k in G.aaList.sy) {
                let o = G.aaList.sy[k];
                this.ggX[k] = k;
                G.dom['x' + k] = new Dom('img', 'class:comm;zindex:10;radius:10;src:' + o.spic + ';x:' + xx + ';y:' + yy + ';width:160;height:160;', { liuhai: false, click: function () { G.goAPPID(o['appid'], o['path'], o['id']); } });
                xx += 170;
            }
        }
        G.bindLoop = this.play.bind(this);
    }
    tc() {   //弹窗
        G.music.ck2(true, 'die');
        this.stop = true;

        G.dom['tu_back'].attr.zindex = this.zindex + 1;
        if (!(undefined === G.aaList || undefined === G.aaList.sy || G.aaList.conf.syad != 1 || G.aaList.sy.length <= 0)) {
            G.dom.sdt = new Dom('img', 'class:comm;zindex:' + this.zindex + ';src:' + I + 'zc/gray.png;x:0;y:0;width:100%;height:100%;', { dclick: true });
            G.dom.sqd = new Dom('img', 'class:comm;zindex:' + this.zindex + ';src:' + I + 'zc/bge.png;x:center;y:' + (wh * 0.08 + (liuhai > 0 ? liuhai + 10 : 0)) + ';width:611;height:800;');
            G.guoArr = randArr(G.aaList.sy, 9);
            if (G.guoArr.length < 9) {
                let list2 = G.randArr(G.aaList.sy, 9 - G.guoArr.length);
                for (let k2 in list2) {
                    G.guoArr.push(list2[k2]);
                }
            }

            let y = 50, n = 1, py = 0, px = 0;
            for (var i in G.guoArr) {
                let o = G.guoArr[i];
                if (n == 4) {
                    y += 250;
                    py = 70;
                    px = 0;
                } else if (n == 7) {
                    y += 250;
                    py = 0;
                    px = 0;
                }
                G.dom['x_su_' + n] = new Dom('img', 'class:comm;zindex:' + this.zindex + ';src:' + o.spic + ';x:' + ((n - 1) % 3 * 196 + 19) + ';y:' + y + ';width:181;height:181;', { f: G.dom.sqd, click: function () { G.goAPPID(o['appid'], o['path'], o['id']); } });
                p(((n - 4) * 200));
                G.dom['x_di_' + n] = new Dom('img', 'class:comm;zindex:' + this.zindex + ';src:' + I + 'zc/fbg.png;x:' + ((n - 1) % 3 * 196 + 19) + ';y:' + (y + 181) + ';p_x:' + px + ';p_y:' + py + ';p_w:196;p_h:61;width:181;height:50;', { f: G.dom.sqd, });

                G.dom['x_num_' + n] = new Dom('font', 'class:comm;zindex:' + this.zindex + ';font:13px 微软雅黑;color:#FFF;x:' + ((n - 1) % 3 * 196 + 90.5 + 19) + ';y:' + (y + 205) + ';textalign:center;valign:middle;', { f: G.dom.sqd, text: o.name });
                n += 1;
                px += 200;
            }
            G.dom['tc_rebtn'] = new Dom('img', 'zindex:' + this.zindex + ';src:' + I + 'zc/rebtn.png;x:center;y:820;width:159;height:49;', { f: G.dom.sqd, click: function () { G.goPage('play'); } });
        } else {
            G.dom['tcdiv'] = new Dom('div', 'zindex:' + this.zindex + ';x:0;y:0;width:100%;height:100%;background:#000;', { click: function () { } });
            G.dom['tcdiv'].attr.opacity = .5;
            G.dom['tcbg'] = new Dom('img', 'zindex:' + this.zindex + ';src:' + I + 'bg/tcbg.png;x:center;cy:' + wh * .48 + ';width:409;height:291;');
            G.dom['tcjbs'] = new Dom('font', 'zindex:' + this.zindex + ';x:center;y:center;color:#FFF;font:bold 50px \'\';valign:middle;textalign:center;', { text: G.dom['jbs'].val() });

            G.dom['tchome'] = new Dom('img', 'zindex:' + this.zindex + ';src:' + I + 'bg/home.png;cx:' + 409 * 0.2 + ';cy:350;width:100;height:100;', { f: G.dom['tcbg'], click: function () { G.goPage(); } });
            G.dom['tcre'] = new Dom('img', 'zindex:' + this.zindex + ';src:' + I + 'bg/re.png;cx:' + 409 * 0.8 + ';cy:350;width:100;height:100;', { f: G.dom['tcbg'], click: function () { G.goPage('play'); } });
        }
        G.iniDoms();
    }
    move(spos, epos) {
        if (Math.abs(spos.x - epos.x) > Math.abs(spos.y - epos.y)) { //左右
            if (spos.x > epos.x) {
                p('左');
                if (this.currPos == 2) {
                    this.currPos = 0;
                    $('me').cx(pww * .5);
                } else {
                    this.currPos = 1;
                    $('me').cx(pww * this.xZY);
                }
            } else {
                p('右');
                if (this.currPos == 1) {
                    this.currPos = 0;
                    $('me').cx(pww * .5);
                } else {
                    this.currPos = 2;
                    $('me').cx(pww * (1 - this.xZY));
                }
            }
        } else if ($('me').attr.nCurrImg == 'run') { //上下
            return;
            if (spos.y > epos.y) {
                G.music.ck2(true, 'jump');
                $('me').curr('jump');
                p('上');
            } else {
                G.music.ck2(true, 'skate');
                $('me').curr('slide');
                p('下');
            }
        }
    }
    bZuDang(fx, n) {
        let dm = now_m() + '' + rand(1000, 9999);
        this.zdArr[dm] = dm;
        let cx = 'center';
        let src = 'z' + rand(1, 3) + '.png';
        let bbl = 0.2;
        for (let dm in this.zdArr) {
            let o = G.dom[dm];
            if (undefined !== o) {
                G.dom[dm].attr.zindex += 1;
                if (this.zindex < G.dom[dm].attr.zindex) {
                    this.zindex = G.dom[dm].attr.zindex + 1;
                }
            }
        }
        $('me').attr.zindex = this.zindex;
        if (undefined !== G.dom['adk']) {
            $('adk').attr.zindex = this.zindex;
            for (let k in this.ggX) {
                let o = G.dom['x' + k];
                if (undefined !== o) {
                    o.attr.zindex = this.zindex;
                }
            }
        }
        if (n == 1) {   //生成金币
            if (fx == 1) {
                cx = ww / 2 - 70 * 0.9 / 2 - 10;
            } else if (fx == 2) {
                cx = ww / 2 + 70 * 0.9 / 2 + 10;
            }
            G.dom[dm] = new Dom('img', 'zindex:10;src:' + I + 'bg/bonus_partical2.png;cx:' + cx + ';dongsu:3;y:' + (wh * 0.25 - 66 * 0.9) + ';width:70;height:62;',
                {
                    sou: true, fx: fx, csbl: 0.9, csbly: 2, ysd: this.ySD, xsd: 0.4
                })

        } else {
            if (fx == 1) {
                src = rand(1, 3) == 1 ? 'l.png' : src;
                cx = ww / 2 - 147 * bbl / 2 - 30;
            } else if (fx == 2) {
                if (rand(1, 3) == 1) {
                    src = 'r.png';
                }
                cx = ww / 2 + 147 * bbl / 2 + 30;
            } else {

            }
            G.dom[dm] = new Dom('img', 'zindex:4;src:' + I + 'bg/' + src + ';cx:' + cx + ';y:' + (wh * 0.25 - 189 * 0.9) + ';width:147;height:189;',
                { sou: false, fx: fx, csbl: bbl, csbly: 2, ysd: this.ySD, xsd: 0.4 });

            if (this.csj[fx] > 200) {
                this.arJBT[fx] = 10
                this.arJB[fx] = rand(2, 6);
            }
        }


        G.iniDoms();
    }
    bJZu() {
        //左建筑
        let dm = now_m() + '' + rand(1000, 9999);
        this.jArr[dm] = dm;
        let cx = ww * 0.35;
        let jz = rand(6, 10);
        if (jz > 9) {
            jz = 9;
        }
        let bg = rand(1, 5);
        if (bg == 1) {
            let jz2 = rand(3, 6);
            if (jz2 > 5) {
                jz2 = 5;
            }
            let dm2 = now_m() + '' + rand(1000, 9999);
            this.jArr[dm2] = dm2;
            G.dom[dm2] = new Dom('img', 'zindex:1;src:' + I + 'bg/tree' + rand(1, 4) + '.png;cx:' + ww * 0.2 + ';y:' + (wh * 0.25 - 290 * 0.9) + ';width:298;height:290;', { fx: 1, csbl: 0.25, csbly: 2, ysd: this.ySD, xsd: this.xSD + 0.45 });
            G.dom[dm2].attr.opacity = 0.01;
        }
        G.dom[dm] = new Dom('img', 'zindex:1;src:' + I + 'bg/tree' + rand(1, 4) + '.png;cx:' + cx + ';y:' + (wh * 0.25 - 290 * 0.9) + ';width:298;height:290;', { fx: 1, csbl: 0.3, csbly: 2, ysd: this.ySD, xsd: this.xSD });
        G.dom[dm].attr.opacity = 0.01;

        //右建筑
        dm = now_m() + '' + rand(1000, 9999);
        this.jArr[dm] = dm;
        cx = ww * 0.68;
        jz = rand(17, 21);
        if (jz > 21) {
            jz = 20;
        }
        bg = rand(1, 3);
        if (bg == 1) {
            let jz2 = rand(14, 17);
            if (jz2 > 16) {
                jz2 = 16;
            }
            let dm2 = now_m() + '' + rand(1000, 9999);
            this.jArr[dm2] = dm2;
            G.dom[dm2] = new Dom('img', 'zindex:1;src:' + I + 'bg/tree' + rand(1, 4) + '.png;cx:' + ww * 0.7 + ';y:' + (wh * 0.25 - 290 * 0.9) + ';width:298;height:290;', { fx: 2, csbl: 0.25, csbly: 2, ysd: this.ySD, xsd: this.xSD + 0.45 });
            G.dom[dm2].attr.opacity = 0.01;
        }
        G.dom[dm] = new Dom('img', 'zindex:1;src:' + I + 'bg/tree' + rand(1, 4) + '.png;cx:' + cx + ';y:' + (wh * 0.25 - 290 * 0.9) + ';width:298;height:290;', { fx: 2, csbl: 0.3, csbly: 2, ysd: this.ySD, xsd: this.xSD });
        G.dom[dm].attr.opacity = 0.01;

        G.iniDoms();
    }
    bLux() {
        let dm = now_m() + '' + rand(1000, 9999);
        this.lxArr[dm] = dm;
        G.dom[dm] = new Dom('img', 'zindex:1;src:' + I + 'bg/water_texture2.png;x:center;y:' + wh * 0.25 + ';width:500;height:200;', { csbl: 0.2, csbly: 1, ysd: this.ySD });
        G.iniDoms();
    }
    sou(o) {
        G.dom['jbs'].val(parseInt(G.dom['jbs'].val()) + 1);
        o.remove();
        G.music.ck2(true, 'ding');
    }
    sShang() {
        let that = this;
        this.xliang -= 1;

        G.music.ck2(true, 'bong');
        let dm = now_m() + '' + rand(1000, 9999);
        G.dom[dm] = new Dongtu('img', 'zindex:' + (G.dom['me'].attr.zindex + 1) + ';src:' + I + 'bg/explosion_4x2.png;cx:' + G.dom['me'].cx() * bli2 + ';dongsu:3;cy:' + G.dom['me'].cy() * bli2 + ';width:300;height:300;',
            {
                liuhai: false,
                imgs: {
                    0: {
                        dir: I + 'bg/explosion_4x2.png', loop: false, ok: { func: function (t) { t.remove(); } },
                        imgxy: [
                            { p_w: 300, p_h: 300, p_x: 0, p_y: 0 },
                            { p_w: 300, p_h: 300, p_x: 300, p_y: 0 },
                            { p_w: 300, p_h: 300, p_x: 600, p_y: 0 },
                            { p_w: 300, p_h: 300, p_x: 900, p_y: 0 },
                            { p_w: 300, p_h: 300, p_x: 0, p_y: 300 },
                            { p_w: 300, p_h: 300, p_x: 300, p_y: 300 },
                            { p_w: 300, p_h: 300, p_x: 600, p_y: 300 },
                        ]
                    },
                }
            }
        );
        G.iniDoms();

        if (this.xliang <= 0) {
            $('me').hide();
            ex(function () { that.tc(); }, 20);
            this.stop = true;
        } else {
            $('me').attr.opacity = 0.1;
            this.sshang = 5;
        }

    }
    start() {

    }

    play() {
        if (this.stop) {

        } else {

            for (let k in this.ggX) {
                let o = G.dom['x' + k];
                if (undefined !== o) {
                    let x = o.x() - 0.5;
                    if (o.x() + o.width() <= 0) {
                        let x2 = pww;
                        for (let k2 in this.ggX) {
                            let o2 = G.dom['x' + k2];
                            if (undefined !== o2 && o2.x() > x2) {
                                x2 = o2.x() + o2.width();
                            }
                        }
                        o.x(x2 + 10 * bli);
                    } else {
                        o.x(x);
                    }
                }
            }

            this.lxCTime -= 1;
            if (this.lxCTime <= 0) {
                this.lxCTime = this.lxTime;
                this.bLux();
            }

            this.jCTime -= 1;
            if (this.jCTime <= 0) {
                this.jCTime = this.jTime;

                for (let dm in this.jArr) {
                    let o = G.dom[dm];
                    if (undefined !== o) {
                        o.attr.zindex += 1;

                    }
                }
                G.iniDoms();

                this.bJZu();
            }

            for (let n in this.csj) {
                if (this.csj[n] > 0) {
                    this.csj[n] -= 1;
                    if (this.csj[n] <= 0) {
                        this.csj[n] = rand(100, 300);
                        this.bZuDang(n);
                    }
                }
            }
            for (let n in this.arJB) {  //生成金币
                if (this.arJB[n] > 0) {
                    this.arJBT[n] -= 1;
                    if (this.arJBT[n] <= 0) {
                        this.arJBT[n] = 10;
                        this.arJB[n] -= 1;
                        this.bZuDang(n, 1);
                    }
                }
            }


            for (let dm in this.zdArr) {
                let o = G.dom[dm];
                if (undefined !== o) {
                    let y = o.y() + o.attr.ysd;
                    o.attr.ysd += 0.04;
                    if (y > pwh) {
                        delete this.zdArr[dm];
                        o.remove();
                    } else {
                        o.sBL(o.attr.csbl + 0.007);
                        o.y(y);

                        if (o.attr.fx == 2) {
                            o.attr.xsd += 0.009;
                            o.x(o.x() + o.attr.xsd);
                        } else if (o.attr.fx == 1) {
                            o.attr.xsd += 0.009;
                            o.x(o.x() - o.attr.xsd);
                        }
                    }
                }
            }

            if (this.sshang > 0) {  //受伤中
                $('me').attr.opacity += 0.1;
                if ($('me').attr.opacity > 1) {
                    this.sshang -= 1;
                    if (this.sshang > 0) {
                        $('me').attr.opacity = 0.1;
                    }
                }
            } else if ($('me').attr.nCurrImg != 'jump') {

                let mex = $('me').cx();
                let mey = $('me').cy();
                for (let dm in this.zdArr) {    //检测碰撞
                    let o = G.dom[dm];
                    if (undefined !== o) {
                        if (inQ(mex, mey, o)) {
                            if (o.attr.sou) {
                                this.sou(o);
                            } else {
                                this.sShang();
                                break;
                            }
                        }
                    }
                }
            }

            for (let dm in this.lxArr) {
                let o = G.dom[dm];
                if (undefined !== o) {
                    let y = o.y() + o.attr.ysd;
                    o.attr.ysd += 0.04;
                    if (y > pwh) {
                        delete this.lxArr[dm];
                        o.remove();
                    } else {
                        o.sBL(o.attr.csbl + 0.007);
                        o.y(y);
                    }
                }
            }

            for (let dm in this.jArr) {
                let o = G.dom[dm];
                if (undefined !== o) {
                    let y = o.y() + o.attr.ysd;
                    o.attr.xsd += 0.015;
                    o.attr.ysd += 0.04;

                    if (y > pwh) {
                        delete this.jArr[dm];
                        o.remove();
                    } else {
                        o.sBL(o.attr.csbl + 0.007);
                        o.y(y);

                        if (o.attr.fx == 2) {
                            o.x(o.x() + o.attr.xsd);
                        } else {
                            o.x(o.x() - o.attr.xsd);
                        }
                    }
                    if (G.dom[dm].attr.opacity < 1) {
                        G.dom[dm].attr.opacity += 0.05;
                    }

                }
            }

        }

        G.iniBG();
        G.domShow();
        G.touchEvent();
    }
}