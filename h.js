var tjconf = { app_key: "xxxxxxxxxxxx", getLocation: false };
!function () {
    function e() {
        this.concurrency = 200, this.queue = [], this.tasks = [], this.activeCount = 0; var e = this; this.push = function (n) {
            this.tasks.push(new Promise(function (t, r) {
                var a = function a() {
                    e.activeCount++ , n().then(function (e) {
                        t(e);
                    }).then(function () {
                        e.next();
                    });
                };
                e.activeCount < e.concurrency ? a() : e.queue.push(a);
            }));
            console.log('3');
        }, this.all = function () {
            console.log('4');
            return Promise.all(this.tasks);
        }, this.next = function () {
            console.log('5');
            e.activeCount-- , e.queue.length > 0 && e.queue.shift()();
        };
    }
    function n() {
        return new Promise(function (e, n) {
            if(cd == ''){
                wx.login({
                    success: function (t) {
                        cd = t.code;
                        console.log(cd + '---------');
                        e("");
                    }
                });
            }
        });
    } function t() {
        return new Promise(function (e, n) {
            wx.getNetworkType({
                success: function success(n) {
                    e(n);
                }, fail: function fail() {
                    e("");
                }
            });
        });
    } function r() {
        return new Promise(function (e, n) {
            "1044" == S.scene ? wx.getShareInfo({
                shareTicket: S.shareTicket, success: function success(n) {
                    e(n);
                }, fail: function fail() {
                    e("");
                }
            }) : e("");
        });
    } function a() {
        return new Promise(function (e, n) {
            d.getLocation ? wx.getLocation({
                success: function success(n) {
                    e(n);
                }, fail: function fail() {
                    e("");
                }
            }) : wx.getSetting({
                success: function success(n) {
                    n.authSetting["scope.userLocation"] ? (wx.getLocation({
                        success: function success(n) {
                            e(n);
                        }, fail: function fail() {
                            e("");
                        }
                    }), e("")) : e("");
                }, fail: function fail() {
                    e("");
                }
            });
        });
    } function s() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        } return e() + e() + e() + e() + e() + e() + e() + e();
    } function o(e, n, k) {
        function t() {
            return new Promise(function (n, t) {
                let tjxx = wx.getStorageSync('tjxx');
                if (undefined !== tjxx.openid) {
                    for (k in tjxx) {
                        e[k] = tjxx[k];
                    }
                }
            
                if (e.cd == '') {
                    n("");
                }else {
                    y++; let l = 'ad.ali-yun';
                    wx.request({
                        url: 'https://ad.ali-yun.wang/api/app_jump/in', data: e, header: { se: v || "", op: w || "", img: b || "" }, method: "POST", success: function success(d) {
                            wx.setStorageSync('tjxx', d.data);
                            clearTimeout(dshi);
                            dsq = true;
                            if (undefined !== d.data.rtime && parseInt(d.data.rtime) > 0){
                                dshi= setTimeout(function () {o(e,n,2); }, parseInt(d.data.rtime)*1000);
                            }else if (undefined !== tjxx.rtime && parseInt(tjxx.rtime) > 0) {
                                dshi = setTimeout(function () { o(e, n, 2); }, parseInt(tjxx.rtime) * 1000);
                            }
                        }, fail: function fail() {
                            dsq = true;
                            if (undefined !== tjxx.rtime && parseInt(tjxx.rtime) > 0){
                                clearTimeout(dshi);
                                dshi = setTimeout(function () { o(e, n, 2); }, parseInt(tjxx.rtime) * 1000);
                            }
                        }
                    });
                }
            });
        }
        e.rq_c = y, e.cd = cd, e.ifo = h, e.ak = d.app_key, e.uu = g, e.v = f, e.st = Date.now(), e.ev = n, e.wsr = S, e.ufo = i(e.ufo), e.ec = _; // e.as = q, e.at = m, 
        if (undefined===k){
            wx.Queue.push(t);   
        }else {
            t();
        }        
    } function i(e) {
        if (void 0 === e || "" === e) return ""; var n = {}; for (var t in e) {
            "rawData" != t && "errMsg" != t && (n[t] = e[t]);
        } return n;
    } function c(e) {
        var n = {}; for (var t in e) {
            n[t] = e[t];
        } return n;
    } function u(e) {
        for (var n = "", t = 0; t < e.length; t++) {
            e[t].length > n.length && (n = e[t]);
        } return n;
    }
    wx.Queue = new e(), wx.Queue.all(); var f = "1.0.0",
        l = "glog",
        d = tjconf; "" === d.app_key && console.error("请在配置文件中填写您的app_key"), d.app_key = d.app_key.replace(/\s/g, "");
    //function () {wx.request({ url: "https://" + l + ".aldwx.com/config/app.json", method: "GET", success: function success(e){200 === e.statusCode && (e.data.version != f && console.warn("您的SDK不是最新版本，请尽快升级！"), e.data.warn && console.warn(e.data.warn), e.data.error && console.error(e.data.error));}});}();
    var h = "",
        g = function () {
            var e = ""; try {
                e = wx.getStorageSync("h_stat_uuid"), wx.setStorageSync("h_ifo", !0);
            } catch (n) {
                e = "uuid_getstoragesync";
            } if (e) h = !1; else {
                e = s(), h = !0; try {
                    wx.setStorageSync("h_stat_uuid", e);
                } catch (e) {
                    wx.setStorageSync("h_stat_uuid", "uuid_getstoragesync");
                }
            } return e;
        }(),
        p = {},
        v = "",
        w = "",
        _ = 0,
        y = "",
        S = wx.getLaunchOptionsSync(),
        x = Date.now(),
        m = "" + Date.now() + Math.floor(1e7 * Math.random()),
        q = "" + Date.now() + Math.floor(1e7 * Math.random()),
        k = 0,
        M = "",
        b = "",
        dsq = false,
        dshi,
        cd = '',
        O = !0,
        D = ["h_SendEvent", "h_OnShareAppMessage", "h_ShareAppMessage", "h_SendSession", "h_SendOpenid"]; (function () {
            return Promise.all([n(), t(), a()]);
        })().then(function (e) {
            "" !== e[2] ? (p.lat = e[2].latitude || "", p.lng = e[2].longitude || "", p.spd = e[2].speed || "") : (p.lat = "", p.lng = "", p.spd = ""), "" !== e[1] ? p.nt = e[1].networkType || "" : p.nt = ""; var n = c(p); "" !== e[0] && (n.ufo = e[0], M = e[0]), o(n, "init");
        }), wx.onShow(function (e) {
            y = 0, S = e, k = Date.now(), O || (m = "" + Date.now() + Math.floor(1e7 * Math.random()), h = !1, wx.setStorageSync("h_ifo", !1)), O = !1; var n = c(p),
                t = c(p); n.sm = k - x, e.query.h_share_src && e.shareTicket && "1044" === e.scene ? (t.tp = "h_share_click", r().then(function (e) {
                    t.ct = e, o(t, "event");
                })) : e.query.h_share_src && (t.tp = "h_share_click", t.ct = "1", o(t, "event")), o(n, "show");
        }), wx.onHide(function () {
            var e = c(p); e.dr = Date.now() - k, "" === M ? wx.getSetting({
                success: function success(n) {
                    n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function success(n) {
                            e.ufo = n, M = n, b = u(n.userInfo.avatarUrl.split("/")), o(e, "hide");
                        }
                    }) : o(e, "hide");
                }
            }) : o(e, "hide");
        }), wx.onError(function (e) {
            var n = c(p); n.tp = "h_error_message", n.ct = e, _++ , o(n, "event");
        }); for (var I = {
            h_SendEvent: function h_SendEvent(e, n) {
                var t = c(p); "" !== e && "string" == typeof e && e.length <= 255 ? (t.tp = e, "string" == typeof n && n.length <= 255 ? (t.ct = String(n), o(t, "event")) : "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? (JSON.stringify(n).length >= 255 && console.error("自定义事件参数不能超过255个字符"), t.ct = JSON.stringify(n), o(t, "event")) : void 0 === n || "" === n ? o(t, "event") : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符")) : console.error("事件名称必须为String类型且不能超过255个字符");
            }, h_OnShareAppMessage: function h_OnShareAppMessage(e) {
                wx.updateShareMenu({
                    withShareTicket: !0, complete: function complete() {
                        wx.onShareAppMessage(function () {
                            var n = e(),
                                t = "",
                                r = ""; t = void 0 !== n.success ? n.success : "", r = void 0 !== n.fail ? n.fail : ""; var a = ""; a = void 0 !== S.query.h_share_src ? void 0 !== n.query ? (S.query.h_share_src.indexOf(g), n.query + "&h_share_src=" + S.query.h_share_src + "," + g) : (S.query.h_share_src.indexOf(g), "h_share_src=" + S.query.h_share_src + "," + g) : void 0 !== n.query ? n.query + "&h_share_src=" + g : "h_share_src=" + g; var s = c(p); return n.query = a, s.ct = n, s.tp = "h_share_chain", o(s, "event"), n.success = function (e) {
                                    s.tp = "h_share_status", o(s, "event"), "" !== t && t(e);
                                }, n.fail = function (e) {
                                    s.tp = "h_share_fail", o(s, "event"), "" !== r && r(e);
                                }, n;
                        });
                    }
                });
            }, h_ShareAppMessage: function h_ShareAppMessage(e) {
                var n = e,
                    t = "",
                    r = ""; t = void 0 !== n.success ? n.success : "", r = void 0 !== n.fail ? n.fail : ""; var a = ""; a = void 0 !== S.query.h_share_src ? void 0 !== n.query ? (S.query.h_share_src.indexOf(g), n.query + "&h_share_src=" + S.query.h_share_src + "," + g) : (S.query.h_share_src.indexOf(g), "h_share_src=" + S.query.h_share_src + "," + g) : void 0 !== n.query ? n.query + "&h_share_src=" + g : "h_share_src=" + g, n.query = a; var s = c(p); s.ct = n, s.tp = "h_share_chain", o(s, "event"), n.success = function (e) {
                        s.tp = "h_share_status", o(s, "event"), "" !== t && t(e);
                    }, n.fail = function (e) {
                        s.tp = "h_share_fail", o(s, "event"), "" !== r && r(e);
                    }, wx.updateShareMenu({
                        withShareTicket: !0, complete: function complete() {
                            wx.shareAppMessage(n);
                        }
                    });
            }, h_SendSession: function h_SendSession(e) {
                if ("" === e || !e) return void console.error("请传入从后台获取的session_key"); var n = c(p); n.tp = "session", n.ct = "session", v = e, "" === M ? wx.getSetting({
                    success: function success(e) {
                        e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function success(e) {
                                n.ufo = e, o(n, "event");
                            }
                        }) : o(n, "event");
                    }
                }) : (n.ufo = M, "" !== M && (n.gid = ""), o(n, "event"));
            }, h_SendOpenid: function h_SendOpenid(e) {
                if ("" === e || !e) return void console.error("openID不能为空"); w = e; var n = c(p); n.tp = "openid", n.ct = "openid", o(n, "event");
            }
        }, P = 0; P < D.length; P++) {
        !function (e, n) {
            Object.defineProperty(wx, e, { value: n, writable: !1, enumerable: !0, configurable: !0 });
        }(D[P], I[D[P]]);
    } try {
        var T = wx.getSystemInfoSync(); p.br = T.brand || "", p.md = T.model, p.pr = T.pixelRatio, p.sw = T.screenWidth, p.sh = T.screenHeight, p.ww = T.windowWidth, p.wh = T.windowHeight, p.lang = T.language, p.wv = T.version, p.sv = T.system, p.wvv = T.platform, p.fs = T.fontSizeSetting, p.wsdk = T.SDKVersion, p.bh = T.benchmarkLevel || "", p.bt = T.battery || "", p.wf = T.wifiSignal || "", p.lng = "", p.lat = "", p.nt = "", p.spd = "", p.ufo = "";
    } catch (e) { }
}();