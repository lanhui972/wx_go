'use strict'
import Dom from '../inc/dom'
import Bgv from '../ex/bgv'
import Btn from '../ex/btn'
import Font from '../ex/font'
import Dongtu from '../ex/dongtu'
import { p, ww, bli, wh, ex, pww, pwh, rand, now, post, ptj, inQ, liuhai, sc, date, ruler, file, mcGif, bli2, gAds, randArr } from '../inc/func'


export default class Index {
    constructor() {
        let that = this;
        
        G.dom['bg'] = new Dom('img', 'src:' + I + 'bg/mainbg.jpg;x:0;y:0;width:100%;height:100%;');

        G.dom['logo'] = new Btn('img', 'xg:2;x:center;y:' + wh * 0.2 + ';src:' + I + 'bg/logo.png;width:438;height:244;');
        G.dom['tu_start'] = new Btn('img', 'xg:3;zindex:1;x:center;y:' + (wh * 0.55 - liuhai) + ';src:' + I + 'bg/start.png;width:130;height:130;', { click: function () { G.goPage('play'); } });
        G.getConfig(0, that.confBack);
        G.bindLoop = this.index.bind(this);
    }

    confBack(t) {
        if (G.currPage == 'index' && t.config.ind_txt != '') {
            //
        }
        //G.goPage('play');
    }
    iniAdTu(ls) {
        let t = G;
        if (undefined !== t.aaList && undefined !== t.aaList.conf) {
            t.config.CY_fxts = t.aaList.conf.syad;
            t.config.end_ad = t.aaList.conf.syad;
            t.config.ind_ad = t.aaList.conf.syad;
            t.config.hbao = t.aaList.conf.syad;
        }
        if (ls.conf.syad == 1) {
            G.gameList = ls.hz;
            G.iosGame = ls.bls;
            t.end_list = randArr(ls.sy, 6);
            t.indPAD = randArr(ls.sy, 4);
            t.indAD = randArr(ls.sy, 4);

            G.dom.fx = new Btn('img', 'src:' + I + 'zc/more.png;x:center;y:' + (G.dom['tu_start'].y() * bli2 - 179) + ';width:394;height:149;', {liuhai:false, click: function () { G.M.gameBox(); } });  //分享

            G.dom.zj = new Dom('div', 'line:0;border:#E8E3B4;width:100%;height:162;x:0;y:' + (G.dom['tu_start'].y() * bli2 - 50) + ';', { liuhai: false,});
            for (var i in t.indPAD) {
                let n = parseInt(i);
                G.dom['bg' + i] = new Dom('img', 'src:' + I + 'zc/tzhan.png;x:' + (n * 604 + 10) + ';y:0;width:123;height:162;', { f: G.dom.zj, });
                G.dom['game' + i] = new Dom('img', 'radius:3;src:' + t.indPAD[i].spic + ';x:' + (n * 604 + 13) + ';y:2;width:117;height:112;',
                    { f: G.dom.zj, click: function () { G.goAPPID(t.indPAD[n].appid, t.indPAD[n].path, t.indPAD[n].id); } }); //中间游戏
            }
            G.dom.xhbg = new Dom('img', 'src:' + I + 'zc/likebg.png;x:center;y:' + (G.dom['tu_start'].y() * bli2 + 160) + ';width:727;height:190;', { liuhai: false,});
            for (let i in t.indAD) {
                i = parseInt(i);
                let n = i;
                G.dom['xh_ad_' + i] = new Btn('img', 'xg:1;radius:15;src:' + t.indAD[i].spic + ';x:' + (i * 158 + 90) + ';y:25;width:140;height:140;',
                    { f: G.dom.xhbg, click: function () { G.goAPPID(t.indAD[n].appid, t.indAD[n].path, t.indAD[n].id); } }); //底部游戏

            }
            t.iniDoms();
        }
    }

    index() {

        if (!G.index.bads && G.lailu !== '') {
            gAds(G.index.iniAdTu, G.index);
            G.index.bads = true;
        }

        G.iniBG();
        G.domShow();
        G.touchEvent();
    }
}