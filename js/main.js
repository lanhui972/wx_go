'use strict'
import Xg from './ex/xg'
import Dom from './inc/dom';
import Music from './inc/music'
import { md5 } from './inc/md5'
import { p, rand, now, post, inQ, ww, wh, ptj, pww, inarray, l, bli, now_m, liuhai, gc, sc, alt, alert, mGS } from './inc/func'
import Touch from './inc/touch'
import Index from './page/index'
import Play from './page/play'
import Comm from './page/comm'
import More from './page/more'
import Hbao from './page/hbao'
import Btn from './ex/btn'

window.ctx = canvas.getContext('2d');
window.clip = false;
var width = canvas.width, height = canvas.height;
if (window.devicePixelRatio) {
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * window.devicePixelRatio;
    canvas.width = width * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
ctx.fillStyle = '#FFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);

p(canvas.width+' - '+canvas.height);

window.imgLoad = {};	//初始图片容器 
window.getImgLoad = function (img, t) {
    let n = 0;
    for (var i in imgLoad) {
        n += 1;
    }
    if (undefined === imgLoad[img]) {
        imgLoad[img] = new Image();
        imgLoad[img].src = img;
        if (undefined !== t) {
            imgLoad[img].onload = function () {
                t.loadok = true;
            }
            imgLoad[img].onerror = function () {
                delete imgLoad[img];
                p('onerror: ' + img);
            }
        }
    } else if (undefined !== t) {
        t.loadok = true;
    }
    return imgLoad[img];
}

window.touchHandler = {};
window.touchMVHandler = {};
window.touchEDHandler = {};
window.hasEventBind = false;
window.ios = false;
wx.getSystemInfo({
    success: function (d) { ios = /ios/i.test(d.system); }
})

export default class Main {
    constructor() {
        let that = this;
        this.mwidth = 750;	  //默认宽度
        this.bli = this.mwidth / 1000;	//比例，用于界面设计
        this.syin = gc('syin') == '' ? true : false;  //声音开关
        this.onShow = false;  //是否取了onShow的数据
        this.local = false;
        this.serUrl = '';
        this.localUrl = '';
        this.usCode = ''; //定期更新用户状态
        this.odCode = ''; //上一个提交的CODE，一样的话不重复提交

        this.dombg = {};	  //背景元素
        this.dom = {};	  //页面元素
        this.currPage = 'index';
        this.fromCS = '';     //来路参数
        this.dview = 0;      //挡到第几级开始显示
        this.dVShwo = false;  //是否按挡级可以开始显示

        this.liuhai = (window.innerHeight / window.innerWidth) > 1.9 ? 90 * this.bli : 0;	//是否有流海
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.adOK = (window.innerHeight / window.innerWidth) < 1.65 ? false : true;
        this.adID = 'adunit-72691bba3415aff8';
        this.vadID = 'adunit-f953307936c47cbd';

        this.openD = wx.getOpenDataContext();
        this.shVas = this.openD.canvas;
        this.shVas.width = 2 * this.shVas.width;
        this.shVas.height = 2 * this.shVas.height;

        this.us = {};
        this.config = { CY_fxTxt: ['超好玩赛车小游戏，不用下载即可畅玩'], CY_fxImg: 'i/fx.jpg', CY_fxCS: '' };
        this.scene = 0;	//进入的ID
        this.fid = 0;	//来路朋友ID
        this.adHeight = 0;	//广告的高度
        this.aniId = 0;	//当前帖ID
        this.stop = false;
        this.openKJ = true; //开机关机，未获取配置

        this.moveDom;	//当前移动的元素
        this.clickDom;	//当前点击的元素
        this.clickPos = { x: 0, y: 0, d: {}, kz: {} }	//点击的点位置

        this.bStartBtn = true;	//是否显示此按扭
        this.buildStartBtn();	//生成系统获取信息按扭
        this.comm = new Comm;

        this.updateMyDate = false;  //一次只同步一次线上我的数据


        this.M = new More();
        this.hbao = new Hbao();

    }

    oVar() {
        this.syin = gc('syin') == '' ? true : false;  //声音开关
        this.music = new Music();
    }
    gLN(n, jb) { //级别所需金币/钻石
        let o = G.d['参数']['功能'][n];
        p(n);
        p(o)
        if (undefined === o.len) {
            if (jb > o.max) {
                jb = o.max;
            }
            return o.xnum * jb;
        }
        let jia = parseInt(o.xnum);
        let jiax = jia * Math.pow(10, 1);
        let cl = l(jia);
        let num = 0;
        for (var i = 1; i <= 1000 && i <= o.max; i++) {
            num += jia;
            if (num >= jiax) {
                jia = jiax;
                jiax = jiax * Math.pow(10, 1);
            }
            if (i >= jb || i >= o.max) {
                return num;
            }
        }
    }

    goPage(s, gk) {
        /*for (var k in G.d['参数']['功能']){
            let o = G.d['参数']['功能'][k];
            p(o.name)
            for (var i=1;i<=30&&i<=o.max; i++) {
                this.gLN(k,i);
                p(i + ' - ' + this.gLN(k, i) );
            }
        }
        p(2222);*/

        let that = this;
        this.dom = {};
        imgLoad = {};
        this.clickMove = false;
        this.touch = new Touch(this);

        //this.openD.postMessage({cmd:'echo',n:0,uid:this.config.uid,fen:this.deFen})

        //s = 'play';
        p('请示 ' + (s == undefined ? 'index' : s) + ' 页');


        that.music.bg(that.syin);
        this.currPage = s;
        alt();
        this.b_ad = true;
        switch (s) {
            case 'play':
                this.play = new Play();
                this.play.start(gk);
                break;
            default:
                this.currPage = 'index';
                this.index = new Index();
                break;
        }
        if (this.b_ad) {
            this.ad();
        }
        if (this.currPage != 'index' && undefined !== this.start) {
            this.start.hide();
        } else if (this.currPage == 'index' && undefined !== this.start) {
            if (undefined === that.us || undefined === that.us.us_id) {
                this.start.show();
            }
        }

        this.iniDoms();
        // 清除上一局的动画 
        window.cancelAnimationFrame(this.aniId);
        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
    }
    gDom(k) {
        if (undefined === G.dom[k]) {
            return {}
        } else {
            return G.dom[k];
        }
    }
    goAPPID(id, ph, app_id, tjid) {
        let that = this;
        if (id == '') {
            return;
        }
        if (wx.navigateToMiniProgram) {
            wx.navigateToMiniProgram({
                appId: id,
                path: ph,
                success: function () {
                    if (undefined !== app_id) {

                        let us_id = 0;
                        if (undefined !== that.us && undefined !== that.us.z_uid) {
                            us_id = that.us.z_uid;
                        } else if (undefined !== that.us && undefined !== that.us.z_uid) {
                            us_id = that.us.z_uid;
                        }
                        p(that.us);
                        let d = new Date;
                        let timestamp = d.getTime();
                        let signData = md5('appid:' + G.appid + 'from_id:' + G.appid + 'timestamp:' + timestamp + 'to_id:' + app_id + 'user_id:' + us_id);
                        post({ url: G.tjUrl, appid: G.appid, user_id: us_id, from_id: G.appid, to_id: app_id, sign: signData, timestamp: timestamp }, function (d) {
                        })
                        if (undefined !== tjid && tjid > 0) {
                            ptj(tjid);
                        }
                    }
                    if (G.gameBox && id == G.more_appid) { G.M.del(2); G.ad(); }
                },
                fail: function () { },
                complete: function () {
                    //
                }
            })
        }
    }

    delClass(v) {	//清理class
        let av = v.split(',');
        if (v.indexOf(',') > -1) {
            av = v.split(',');
        } else {
            av.push(v);
        }
        for (var dx in this.dom) {

            if (undefined !== this.dom[dx].attr && undefined !== this.dom[dx].attr['class'] && inarray(this.dom[dx].attr['class'], av)) {
                delete this.dom[dx];
            }
        }
        this.iniDoms();
    }
    setClass(css, attr) {
        for (var dx in this.dom) {
            if (undefined !== this.dom[dx].attr['class'] && this.dom[dx].attr['class'] == css) {
                for (var attr1 in attr) {
                    this.dom[dx][attr1] = attr[attr1];
                }
            }
        }
    }
    iniDoms() {		//更新元素记录
        this.doms = [];
        this.dview = 0;
        let domTemp = { 0: {} };
        for (var domk in this.dom) {
            if (undefined !== this.dom[domk].attr) {
                if (undefined !== this.dom[domk].attr.zindex && this.dom[domk].attr.zindex > 0) {
                    if (undefined === domTemp[this.dom[domk].attr.zindex]) {
                        domTemp[this.dom[domk].attr.zindex] = {};
                    }
                    domTemp[this.dom[domk].attr.zindex][domk] = this.dom[domk];
                } else {
                    domTemp[0][domk] = this.dom[domk];
                }
            } else {
                domTemp[0][domk] = this.dom[domk];
            }
        }
        this.dom = {};
        for (var m in domTemp) {
            for (var domk in domTemp[m]) {
                this.dom[domk] = domTemp[m][domk];
            }
        }
        //p(domTemp);
        domTemp = {};
        for (var domk in this.dom) {
            if (this.dom[domk] instanceof Array) {
                //for (var dm2 in this.dom[dm]){
                //	this.doms[this.doms.length] = domk;
                //}
            } else {

                this.doms[this.doms.length] = domk;
            }
            if (undefined !== this.dom[domk].attr && this.dom[domk].attr.dview > this.dview) {
                this.dview = this.dom[domk].attr.dview;
            }
        }
    }

    iniBG() {	//初始背景
        if (this.adOK && this.adHeight == 0 && undefined !== this.bannerAd) {	//获取底部高度
            if (undefined !== this.bannerAd.style.realHeight) {
                this.adHeight = this.bannerAd.style.realHeight;
                this.bannerAd.style.top = this.wh - this.adHeight - 10;
            }
        }


        if (undefined !== G.aaList && G.aaList.conf.syad == 1) {
            if (undefined === G.dom.zcMore) {
                G.dom.zcMore = new Btn('img', 'src:' + I + 'zc/1.png;zindex:15;x:0;y:480;width:79;height:97;',
                    { bli: 750, liuhai: false, click: function () { C.ceBian(); G.ad(); } }  //更多游戏
                );
                //G.C.moregame();
                G.iniDoms();

                if (this.currPage == 'play') {
                    C.moreX = 997;
                }
            }
            C.moreGameS();
            if (C.moreX > 0) {
                G.dom.zcMore.dis = false;
            } else {
                G.dom.zcMore.dis = true;
            }
        }

        if (undefined !== this.adTime && this.adTime > 0) {
            this.adTime -= 1;
            if (this.adTime <= 0) {
                this.ad();
            }
        }

        ctx.clearRect(0, 0, this.ww, this.wh);
        ctx.closePath();
        ctx.restore();
        for (var dm in this.dombg) {
            this.dombg[dm].w();
        }
    }
    domShow() {
        let hasDel = false;
        this.dVShwo = false;
        for (var dm in this.dom) {
            if (this.dom[dm] instanceof Array) {
                for (var dm2 in this.dom[dm]) {
                    if (this.dom[dm][dm2].attr.del) {
                        delete this.dom[dm][dm2];
                        hasDel = true;
                    } else {
                        if (!this.dVShwo && this.dom[dm][dm2].attr.dview >= this.dview) {
                            this.dVShwo = true;
                        }
                        this.dom[dm][dm2].w();
                    }
                }
            } else {
                if (this.dom[dm].attr.del) {
                    delete this.dom[dm];
                    hasDel = true;
                } else {
                    if (!this.dVShwo && this.dom[dm].attr.dview >= this.dview) {
                        this.dVShwo = true;
                    }
                    this.dom[dm].w();
                }
            }
        }
        if (hasDel) {
            this.iniDoms();
        }

        if (clip) { //前面有裁没闭合
            clip = false;
            ctx.restore();
        }
    }
    touchEvent() {
        this.touch.touchEvent(1);
        this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
    }

    updateUS(d) {
        for (let k in d) {
            this.us[k] = d[k];
        }

        if (undefined !== this.us.us_id && this.us.us_id > 0) {
            this.start.hide();
        }
    }
    usIndFont() {
        let that = this;
        if (undefined !== G.us && undefined !== that.us.info && undefined !== G.dom.ind_font) {
            if (G.us.user_status == 1) {
                G.dom.ind_font.sSrc(that.us.info['index_middle_img_txt']);
            } else {
                G.dom.ind_font.sSrc(that.us.info['index_middle_img_txt_hei']);
            }
            G.dom.ind_font.dis = true;
        }
    }
    oldGetUser() {
        let that = this;
        //wx.showLoading({ title: '更新中...' })
        wx.login({
            success: function (t) {
                //p(t);
                wx.hideLoading();
                wx.getUserInfo({
                    success: function (e) {
                        //p(e);
                        that.usLoginFunc(e, t, 0);
                    }, fail: function (e) {
                        wx.showModal({
                            title: '请求授权',
                            content: '未授权，请先授权再继续游戏！',
                            showCancel: false,
                            complete: function (x) {
                                wx.authorize({
                                    scope: 'scope.userInfo',
                                    success: function (e) {
                                        that.usLoginFunc(e, t, 0);
                                    },
                                    fail: function (e) {
                                        that.oldGetUser();
                                    }
                                })
                                //that.oldGetUser();
                            }
                        })
                    }
                })
            },
            fail: function (t) {
                p('fail');
                //p(t);
                wx.showModal({
                    title: '请求授权',
                    content: '未授权，无法继续游戏',
                    showCancel: false,
                    complete: function (x) {
                        that.oldGetUser();
                    }
                })
                //that.oldGetUser();
            }, complete: function (t) {
                p('complete');
                //p(t);
            }
        })
    }

    buildStartBtn() {   //授权登录按扭

        if (!this.bStartBtn && this.currPage != 'index') {
            return;
        }
        let that = this;
        if (undefined === wx.createUserInfoButton) {
            this.oldGetUser();
            return;
        }

        this.start = wx.createUserInfoButton({
            text: '',
            style: {
                left: (ww - 400) / 2 * bli,
                top: (711 + liuhai) * bli,
                width: 400 * bli,
                height: 147 * bli
                //,lineHeight: 40,
                //,backgroundColor: '#ff0000'
                //color: '#ffffff',
                //textAlign: 'center',
                //fontSize: 16
                //,borderRadius: 4
            }
        });
        this.start.onTap((e) => {
            if (that.loading && that.us.data != undefined) {
                return;
            }
            //that.start.hide();
            that.loading = true;
            wx.showLoading({ title: '加载中' });
            if (that.us.data != undefined && that.config.uid > 0) {
                wx.hideLoading();
                that.start.hide();
                that.loading = false;
                //that.music.con(that.syin);
                that.goPage('play');
            } else {
                wx.hideLoading();
                if (e.errMsg == 'getUserInfo:ok') {
                    //p('开始按扭');
                    //p(e);
                    wx.login({
                        success: function (t) {
                            that.usLoginFunc(e, t, 1);
                        },
                        fail: function () {
                            that.start.show();
                            that.comm.tishi('授权失败，无法开始游戏');
                            that.loading = false;
                        }
                    });
                } else {
                    that.start.show();
                    that.comm.tishi('授权失败，无法开始游戏');
                    that.loading = false;
                }

            }
        })
    }


    usLoginFunc(e, t, kn) {
        let that = this;
        post({
            act: 'usLogin',
            from: JSON.stringify(that.fromCS),
            data: e.rawData,
            code: t.code,
            iv: e.iv,
            encryptedData: e.encryptedData
        }, function (d) {
            wx.hideLoading();
            if (that.fid > 0) that.fid = 0;
            if (that.qzt > 0) that.qzt = 0;
            if (d.code == 200) {
                that.start.hide();

                if (d.config) {
                    for (var k in d.config) {
                        that.config[k] = d.config[k];
                    }
                }
                if (undefined !== d.us_id) {
                    that.updateUS(d)
                    that.goPage('play');
                    //that.fxUsData();
                }
                //that.gameData(d.gData);
            } else {
                alt('服务器出错，稍后重试！');
            }
        }, 'json');
    }
    getConfig(ck, func) {
        let that = this;
        if (ck == 0 && now() - this.getConfigTime < 10) {
            return;
        }
        this.getConfigTime = now();
        if (!that.show) {	//第一次show必须先取来路参数

            wx.onShow(function (t) {
                p(['from', t]);
                that.fromCS = t;
                that.openKJ = true;
                that.music.bg(that.syin);
                that.show = true;
                G.lailu = JSON.stringify(that.fromCS);
                if (that.usCode == '') {
                    wx.login({
                        success: function (e) {
                            that.usCode = e.code;
                            that.getConfig(1, func);
                        }
                    });
                }
                //if(!that.jtFX()){
                //    that.getConfig(1,func);
                //}
            });
        } else {
            var css = { act: 'config', code: this.usCode, from: this.lailu };
            post(css, function (a) {
                if (a.code == 200) {
                    that.fxMenu();
                    that.config = a.config;
                    if (a.ad != '') {
                        //that.adID = a.ad;
                        //that.ad();
                    }
                    if (a.uid > 0) {
                        if (that.fromCS.fid > 0) that.fromCS.fid = 0;
                        if (that.fromCS.qzt > 0) that.fromCS.qzt = 0;
                    }
                    that.jsTime = parseInt(a.config.jsTime) * G.zen;
                    if (a.vad != '') {
                        //that.vadID = a.vad;
                    }
                    if (a.app_id != '') {
                        that.more_appid = a.app_id;
                        that.more_appph = a.app_ph;
                    }

                    if (null !== a.us && undefined !== a.us) {
                        that.updateUS(a.us);
                    } else {
                        //that.oldGetUser();
                    }
                    if (undefined !== func) {
                        func(that);
                    }
                }

                //that.goPage('play');
                //that.altGG(5, 1235)
                //that.comm.paiHang();
            });
        }
    }
    jtFX() {
        if (undefined === this.jtTime) {
            return false;
        }
        if (now() - this.jtTime > 3) {
            C.tishi('等待好友加入');
        } else {
            C.tishi('请分享给好友或群');
        }
        this.jtTime = 0;
        return true;
    }
    fx(k) {
        if (undefined !== k && k == 1) {
            this.jtTime = now();
        }
        //return;
        let that = this;
        p(that.config);
        let fxt = that.config.CY_fxTxt[0];
        let fxi = that.config.CY_fxImg;
        let fxcs = that.config.CY_fxCS;
        wx.shareAppMessage({
            title: fxt,
            imageUrl: fxi,
            query: fxcs,
            withShareTicket: true,
            success: function (t) {

            }
        });
        //p('进了 fx');
    }
    maiJH() {
        this.maiJHE = 0;
        for (var mh in this.mh_cs) {
            this.maiJHE += mh * this.mh_cs[mh];
        }
        //p(this.mh_cs);
        //p(this.maiJHE);
    }

    lxShouyi() { //离线收益
        p('离线时间' + G.us.lxtime + '  可收' + G.config.lxss);
        if (G.us.lxtime < G.config.lxss) {
            return 0;
        }
        let lxsy = 0;
        for (var gk in G.kk) {
            if (G.kk[gk] > 0) {
                //p(this.huaArr[G.kk[gk]]['yg']/3)
                lxsy += (this.huaArr[G.kk[gk]]['yg'] / 3);
            }
        }
        if (lxsy > 0) {
            let nt = G.us.lxtime;
            if (nt > G.config.lxtime) {
                nt = G.config.lxtime;
            }
            lxsy = parseInt(lxsy * nt / 8);
        }

        return lxsy;

        let t = G.maiJia(4);
        let n = 0;
        for (var k in this.kk) {
            n += (2 * Math.pow(2, this.kk[k] - 1) * this.lxSY);
        }
        return n > t || n <= 0 ? t : n;
    }
    maiJia(n) {
        let o = Math.pow(2, n - 1);
        let v = this.maiJHE + o - 1;
        return 100 * Math.pow(2, n - 1) + 5 * ((this.maiJHE + v) * (v - this.maiJHE + 1) / 2);
    }

    fxUsData() {
        if (this.first == 0) {
            this.us.jbi = parseInt(this.us.jbi);
            if (undefined !== this.us.huas && null !== this.us.huas) {
                if (this.us.huas.mais != '') {
                    this.mh_cs = JSON.parse(this.us.huas.mais);
                    this.maiJH();
                }
                if (this.us.huas.data != '') {
                    this.kk = JSON.parse(this.us.huas.data);
                    for (let k in this.kk) {
                        if (this.kk[k] > this.cHuaLevel) {
                            this.cHuaLevel = this.kk[k];
                        }
                    }
                }
                if (this.us.maxLV > this.cHuaLevel) {
                    this.cHuaLevel = this.us.maxLV;
                }
            }
            this.lbfx = parseInt(this.us.lbfx);
            this.jiasCS = parseInt(this.us.jscs);
            this.lxSY = parseInt(this.us.lxsy);
            if (this.lxSY <= 0) {
                this.lxSY = 1;
            }

            if (this.us.jbi <= 0 && this.maiJHE <= 0) { //新手判断
                this.xshouYD = true;
            }
            //p('新手：'+this.xshouYD);
            this.first = 1;
        }
    }

    ser() {
        wx.openCustomerServiceConversation({
            success: function (t) {
                p(t);
            }, complete: function (t) {
                p('complete');
                p(t);
            }
        })
    }
    fxMenu() {
        p('-----++-----');
        wx.onShareAppMessage(
            function () {
                return {
                    title: G.config.CY_fxTxt[0],
                    imageUrl: G.config.CY_fxImg,
                    query: G.config.CY_fxImg
                }
            }
        );
        wx.showShareMenu({
            withShareTicket: true
        })
    }
    gcs(k) {   //lbao礼包,jsu加速,lx离线，新手礼包
        let that = this;
        if (that.vadID == '' || undefined === wx.createRewardedVideoAd || undefined === G.config.tstxt.adV) {
            return false;
        }
        let n = gc(G.config.date + '_' + k, 0);
        p(k + '-' + n);
        p(G.config.tstxt.adV);
        p(inarray(n, G.config.tstxt.adV));
        return inarray(n, G.config.tstxt.adV);
    }
    vad(n) {
        //if (!this.vadOK){return}	
        let that = this;
        if (undefined === wx.createRewardedVideoAd) {
            return;
        }
        this.bannerVad = wx.createRewardedVideoAd({
            adUnitId: that.vadID
        });

        this.bannerVad.load().then(function () {
            if (undefined !== that.bannerAd) {
                that.bannerAd.destroy()
            }
            return that.bannerVad.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {

                    if (undefined !== G.play) {
                        if (n == 5) {
                            alt('可重置关卡');
                            C.reSet(G.play.currGuan);
                        } else if (n == 6) {
                            G.play.sChuiz(1);
                        }
                    }
                    p('正常播放结束，可以下发游戏奖励')
                }
                else {
                    if (n == 5) {
                        alt('未看完视频，不可重置关卡');
                    } else if (n == 6) {
                        alt('未看完视频，无法获得锤子');
                    }
                    p('播放中途退出，不下发游戏奖励');

                    //that.fx();
                }
                that.bannerVad.offClose();//, that.onVad();
                that.ad();
            }),
                that.bannerVad.show();
        }).catch(err => {


            //this.bannerVad.load().then(() => this.bannerVad.show())
        });
        this.bannerVad.onError(function (t) {
            alt('视频广告加载失败');
            that.fx();
            if (undefined !== G.play) {
                if (n == 5) {
                    C.reSet(G.play.currGuan);
                } else if (n == 6) {
                    G.play.sChuiz(1);
                }
            }
            p(t);
        })
    }

    ad(k) {	//输出广告 已有会清理后再创建
        if (this.adID == '' || !this.adOK) {
            if (undefined !== this.bannerAd) {
                this.bannerAd.destroy()
            }

            return;
        }
        this.adHeight = 0;
        if (undefined !== this.bannerAd) {
            this.bannerAd.destroy()
        }
        if (undefined !== this.dom.bner) {
            this.dom.bner.attr.del = true;
        }
        if (undefined === wx.createBannerAd) {
            return;
        }
        //if (undefined !== G.dom.gb_atbg) { //盒子
        //    return;
        //}

        let width = pww - 30;
        if (width < 320) {
            width = 320;
        }
        let that = this;
        let left = (ww * bli - width) / 2;
        if (undefined !== k && k == 1 || undefined !== G.dom.zabtn) {
            left = ww * bli - 1;
        }

        if (undefined === this.dom.gg_dj_bg && undefined === G.dom.botco && (undefined == this.bner || this.bner == 2) && undefined !== G.aaList && undefined !== G.aaList.bner && G.aaList.bner.length > 0) {
            this.adTime = 10 * G.zen;
            this.bner = 1;
            let o = G.aaList.bner[0];
            this.dom.bner = new Dom('img', 'zindex:20;src:' + o.pic + ';width:' + ww + ';height:' + 960 / 1000 * 334 * 0.75 + ';x:0;y:' + (wh - 960 / 1000 * 334 * 0.75) + ';', { click: function () { that.goAPPID(o['appid'], o['path'], o['id']); } });
            G.iniDoms();
        } else {
            this.adTime = 15 * G.zen;
            if (undefined !== G.dom.gb_atbg) { //盒子
                this.adTime = 5 * G.zen;
            }

            if (undefined !== this.dom.bner) {
                this.dom.bner.attr.del = true;
            }
            this.bner = 2;

            this.bannerAd = wx.createBannerAd({
                adUnitId: this.adID,
                style: {
                    left: left,
                    top: wh * 0.85,
                    width: width
                }
            })
            this.bannerAd.onError(function (t) { p(t); });
            this.bannerAd.show()
        }
    }
    randArr(arr, num) {
        if (undefined === num) {
            num = 4;
        }
        var temp_array = new Array();
        for (var index in arr) {
            arr[index].xid = index;
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        p('----' + num + '----');
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }
}