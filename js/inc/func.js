'use strict'
var ww  = 750;
p(window.innerWidth);
p(window.innerHeight);
var bli = window.innerWidth/750;
var bli2= 750/window.innerWidth;
var wh  = window.innerHeight/bli;
var pww = window.innerWidth;
var pwh = window.innerHeight;
var liuhai = (window.innerHeight/window.innerWidth)>1.9?90:0;
//p('wh');
//p(wh);
function p() {
    console.log(arguments)
}
function randArr(arr, num) {
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
function un(s){
    return null === s || undefined === s || s == '';
}
function gAds(f, t) {
    if (undefined === G.aaList) {
        let q = { appid: G.appid, ver: G.version, llu: JSON.stringify(G.fromCS), };
        p(q);
        wx.request({
            url: G.adUrl, data: q, method: "POST",
            header: {"content-type": "application/x-www-form-urlencoded"},
            success: function (a) {
                G.aaList = a.data;
                if (undefined !== a.data && undefined !== f) {
                    f(G.aaList, t);
                }
            },
            fail: function (e) { wx.hideLoading(); p('request error' + e); }
        });
    } else {
        if (undefined !== f) {
            f(G.aaList, t);
        }
    }
}
function l(s){
    return (s + '').length;
}
function ptj(id){
    wx.request({
        url: G.adUrl, data:{act:'tj',id:id}, method: "POST",
        header: {"content-type": "application/x-www-form-urlencoded"},
        success: function (a) {}
    });
}
function ruler(w, h) {  //尺子
    ctx.beginPath();
    ctx.strokeStyle = "#f60";
    ctx.lineCap = "round";
    /*ctx.lineCap="butt|round|square";*/
    ctx.lineWidth = 1;
    ctx.moveTo(0.5, 0.5);
    for (var i = 0; i <= w; i += 10) {
        let x = i+0.5;
        ctx.lineTo(x, 0);
        ctx.lineTo(x, 5);
        if (i >= 100 && i % 100 == 0) {
            ctx.lineTo(x, 15);

            ctx.fillStyle = "#BBB";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText('X ' + i, i, 25);

        } else if (i >= 50 && i % 50 == 0) {
            ctx.lineTo(x, 10);
        } else {
            ctx.lineTo(x, 5);
        }
        ctx.lineTo(x, 0);
    }
    for (var i = 0; i <= h; i += 10) {
        let y = i+0.5
        ctx.lineTo(0, y);
        if (i >= 100 && i % 100 == 0) {
            ctx.fillStyle = "#BBB";
            ctx.font = "10px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText('Y ' + i, 20, i);

            ctx.lineTo(15, y);
        } else if (i >= 50 && i % 50 == 0) {
            ctx.lineTo(10, y);
        } else {
            ctx.lineTo(5, y);
        }
        ctx.lineTo(0.5, y);
    }
    ctx.closePath();
    ctx.stroke();
}
function post(q){
    let sUrl = G.serUrl;
    if (G.local && window.navigator.platform == 'devtools') {
        sUrl = G.localUrl;
    }

	let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
    if (undefined===q){
        q = {};
    }
    if (G.usCode!=G.odCode && undefined===q.code){ //更新用户session
        q.usCode = G.usCode;
        G.odCode = G.usCode;
    }else if(undefined!==q.code){
        G.odCode = G.usCode;
    }
    q.ver   = G.version;
    q.appid = G.appid;
    if (undefined !== q.url) {
        sUrl = q.url;
        delete q.url;
        delete q.ver;
    }

	wx.request({
		url: sUrl, data: q, method: "POST", header:{"content-type": "application/x-www-form-urlencoded","psession":gc("phpsessid")},
		success: function (a) {
            //wx.hideLoading();

			if (a.statusCode == 200) {
				n(a.data);
				if (a.data.phpsessid != undefined) {
					sc("phpsessid", a.data.phpsessid);
				}
                if (a.data.ctxt != undefined) {
                    cpx(a.data.ctxt);
                }
			} else {
                n({code:a.statusCode});
				p('request error url:' + sUrl + ' code:' + a.statusCode) 
			}
		},
		fail: function (e){wx.hideLoading();p('request error' + e);}
	})
}

function rand(n1, n2) {
	return Math.floor(Math.random() * (n2 - n1) + n1)
}
function now(n) {  //当前秒数
	if (undefined === n || n <= 0) {
		var d = new Date;
	} else {
		var d = new Date(n * 1000);
	}
	return Math.ceil(d.getTime() / 1000);
}
function now_m(n) {  //当前微秒
	if (undefined === n || n <= 0) {
		var d = new Date;
	} else {
		var d = new Date(n * 1000);
	}
	return d.getTime();
}
function date(s, n) {
    const d = new Date;
	if (undefined !== n && n > 0) {
		const d = new Date(n * 1000);
	}
	var str = '';
	if (undefined === s || s == '') {
		str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
			+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
	} else {
		str = s.replace(/Y/, d.getFullYear());
		str = str.replace(/m/, d.getMonth() + 1);
		str = str.replace(/d/, d.getDate());
		str = str.replace(/H/, d.getHours());
		str = str.replace(/i/, d.getMinutes());
		str = str.replace(/s/, d.getSeconds());
	}
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])([^\d])/g, '$10$2$3');
	str = str.replace(/([^\d])([\d])$/g, '$10$2');
	return str;
}
function inDom(x, y, dom) {  //sz 边框收展数值
	if (undefined===dom){
        return false;
    }
    return inQ(x, y, {x:dom.x(), y:dom.y(), width:dom.width(), height:dom.height()}, 0);
}
function inQ(x, y, q, sz) {  //sz 边框收展数值
	if (undefined == sz || null == sz) { sz = 0; }//扩展区
	if (undefined != q.r) {//半径
		q.r += sz;
		return Math.abs(q.x - x) <= q.r && Math.abs(q.y - y) <= q.r;
	} else {
		return (x >= q.x - sz && y >= q.y - sz && x <= q.x + q.width + sz && y <= q.y + q.height + sz)
	}
}
function syT(n) {   //剩余时间格式
    let m = parseInt(n/60);
    let s = parseInt(n%60);
    return (m>9?m:'0'+m)+':'+(s>9?s:'0'+s);
}
function jgT(n) {   //间隔时间格式
	nj = now() - n;
	if (nj > 86400) {
		n = date('m-d H:i', n);
	} else if (nj > 3600) {
		n = Math.floor(nj / 3600) + '小时前';
	} else if (nj > 60) {
		n = Math.floor(nj % 3600 / 60) + '分钟前';
	} else {
		n = nj + '秒前'; 
	}
	return n;
}
function gc(k, n) {
	if (undefined === wx.getStorageSync(k) || wx.getStorageSync(k)=='') {
		if (undefined !== n) {
			return n;
		} else {
			return '';
		}
	}
	return wx.getStorageSync(k);
}
function sc(k, v) {
	wx.setStorageSync(k, v);
    //p(k+':' + gc(k, 0));
}
function alt(t){
    if (undefined===t){
        wx.hideToast();
    }else {    
	    wx.showToast({ title: t,icon:'none'});
    }
}
function vFloat(src,pos,n){
	if (n ==1){	//分秒
		src  = (now_m()-src)/1000;
		let src2 = 0;
		let src3 = 0;
		if (src>3600){
			src2 = parseInt(src/3600);
		}
		if (src%3600>60){
			src3 = parseInt(src%3600/60);
		}
        let s = parseInt(src % 60);
        return (src2 > 0 ? (src2 <= 9 ? '0' + src2 : src2)+ ':' : '') + (src3 > 0 ? (src3<=9?'0'+src3:src3) : '00') + ':' +( s<=9?'0'+s:s);   
	}else {	
        if (undefined===pos){
            pos = 2;
        }
		return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);   
	}
}
function alert(s,t,cancel,f,that){
    if (undefined===s){
        wx.hideToast();
    }else {
        wx.showModal({
            title: undefined==t?'提示框':t,
            content: s,
            showCancel:undefined==cancel?false:cancel,
            success: function (re) {
                if (re['confirm']){ //确认
                    if (undefined!==f){
                        f(that);
                    }
                }else { //取消
                    //
                }
            }
        });
    }
}
function loading(t){
    if (undefined===t){
        wx.hideLoading();
    }else {    
        wx.showLoading({title:t});
    }
} 
function mGS(n,z){
    let dwei = 'abcdefghijk'.split('');
    let dweis= {};
    for (let w in dwei){
        dweis[dwei[w]] = w*3;
    }
    n += '';
    let wi = '';
    for (let w in dweis){
        if (wi=='' && n.length > dweis[w]){
            wi = w;
        }else if (n.length > dweis[w]+1){
            wi = w;
        }else {
            break;
        }
        dweis[dwei[w]] = w*3;
    }
    
    return (vFloat(n/Math.pow(10,dweis[wi]),2)+wi);

    return n;
    //K M G T 
    let dw = '';
    if (undefined===z){    
        let nn = n +'';
        let am = {'E':[25,1000000000000000000],'P':[22,1000000000000000],'T':[19,1000000000000], 'G':[16,1000000000], 'M':[13,1000000], 'K':[10,1000]};
        let m  = 10;
        
        for (var k in am){
            if (nn.length>=am[k][0]){
                dw = k;
                n = parseFloat(n/am[k][1]).toFixed(0);
                break;
            }
        }
    }
    n = parseFloat(n);
    n = format_n(n);//n.toLocaleString();
    return n+dw;
}

function format_n(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num)){
        num = "0";
    }
    num += '';
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++){
        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
    }
    return num;
}

function data_r(n){ //时间格式
    if (n>60){
        let f = parseInt(n/60);
        let m = (n%60);
        return (f<10?'0'+f:f)+':'+(m<10?'0'+m:m);
    }else {
        return '00:'+(n<10?'0'+n:n);
    }
}
function inarray(s,arr){
    for (var k in arr){
        if(s == arr[k]){
            return true;
        }
    }
    return false;
}
function f_arr(s,f,w){ //文字分行组
    if (s==''){
        return [];
    }
    s = s.replace(/(\r|\n)/g,'');
    let a = ['',];
    ctx.font = f;
    for (var n in s){
        if (ctx.measureText(a[a.length-1] + s[n]).width > w){
            a.push(s[n]);
        }else {
            a[a.length-1] += s[n];
        }
    }
    return a;
}
function f_w(s,f){  //文字宽度
    if (s==''){
        return 0;
    }    
    ctx.font = f;
    return ctx.measureText(s).width;
}
function cp(s,f){
    wx.setClipboardData({
      data: s,
      success: function (r) {
            if (undefined!==f){
                wx.showToast({
                    title: '复制成功',
                    icon: 'none',
                    duration: 0
                });

                f(true);
            }else {
                wx.showToast({
                    title: '复制成功',
                    icon: 'none',
                    duration: 1000
                });
            }
      }
    })
}
function cpx(s) {
    wx.setClipboardData({data: s,
        success: function (r) {
            wx.showToast({
                title: '',
                icon: 'none',
                duration: 0
            });}
    });alt();
}
function jdu(p1,p2){  //返回角度
    var diff_x = p2[0] - p1[0],
        diff_y = p2[1] - p1[1];
    return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
}
function linePos(p1, p2, x){ //线上的点
    let t = x/(p1[0]+p2[0]);
    return t*(p1[1]+p2[1]);
}
function linePosX(p1, p2, y){ //线上的点
    let t = y/(p1[1]+p2[1]);
    return t*(p1[0]+p2[0]);
}
function trim(s){ //线上的点
    s = s.replace(/^[ ]+/,'');
    s = s.replace(/[ ]+$/,'');
    if (s == 'true'){
        return true;
    }else if (s == 'false'){
        return false;
    }else if (/^-?\d+$/.test(s)){
        return parseInt(s);
    }    
    return s;
}

function file(f,bk,bk2,v2){
    var fs = wx.getFileSystemManager()
    fs.readFile({
        filePath:f,
        encoding:'utf8',
        success: function (a){
            if (/\.atlas$/.test(f)){
                let ar  = a.data.split('\n');
                let arr = {};
                let cuk = '';
                let img = '';
                for (var n in ar){
                    if (ar[n]!=''){
                        if (/\.png$/.test(ar[n])){
                            img = ar[n];
                            //arr[img] = {};
                        }else if (!/:/.test(ar[n])){
                            cuk = ar[n];
                            arr[cuk] = {};
                        }else if (cuk!='' && /^  [^:]+:/.test(ar[n])){
                            let arx = ar[n].split(':');
                            let arv = arx[1].split(',');

                            if (arv.length>1){
                                arr[cuk][trim(arx[0])] = [parseInt(arv[0]), parseInt(arv[1])];
                            }else {
                                arr[cuk][trim(arx[0])] = trim(arv[0]);
                            }
                        }
                    }    
                    
                }
                
                if (undefined !== bk){
                    bk(arr, bk2,v2)
                }else {
                    return arr;
                }
            }else if (undefined !== bk){
                bk(JSON.parse(a.data), bk2,v2)
            }else {
                return (a.data);
            }
        },
        fail:function(e){
            p(e);
        }
    });
}

function mcGif(arr,bk2,v2){
    if (undefined!==arr['skins']){   //spine
        p(arr);
        let arr2 = {};
        for (var k in arr['skins']['default']){
            let o = arr['skins']['default'][k][k];
            arr2[k] = 'x:'+o.x+';y:'+o.y+';p_x:2;p_y:142;p_w:'+o.width*0.25+';p_h:'+o.height*0.25+';width:'+o.width*0.25+';height:'+o.height*0.25+';rotation:'+o.rotation+';';
        }
        if (undefined!==bk2){
            bk2(arr2,v2);
        }
    }else if (undefined!=arr['res'] && undefined != arr['mc']){
        p(arr['res']);
        let arr2 = [];
        for (var k in arr.mc){
            if(arr.mc[k].frameRate > 0){
                //p(arr.mc[k]);
                for (var n in arr.mc[k]['frames']){
                    let k2 = arr.mc[k]['frames'][n]['res'];
                    arr2.push('p_x:'+arr['res'][k2]['x']+';p_y:'+arr['res'][k2]['y']+';p_w:'+arr['res'][k2]['w']+';p_h:'+arr['res'][k2]['h']+';dx:'+arr.mc[k]['frames'][n]['x']+';dy:'+arr.mc[k]['frames'][n]['y']+';');
                }
            }
        }
        if (undefined!==bk2){
            bk2(arr2,v2);
        }
    }
}


/*
设A(x1,y1),B(x2,y2)
P(x,y)在线段AB上
设向量BP=t向量BA
向量BP=(x-x2,y-y2)
向量BA=(x1-x2,y1-y2)
(x-x2,y-y2)=t(x1-x2,y1-y2)
即x-x2=tx1-tx2
x=tx1+(1-t)x2
即y-y2=ty1-ty2
y=ty1+(1-t)y2
*/

function Base64() {
    // private property
    this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
}
//public method for encoding
Base64.prototype.encode = function (input) {
    var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
}

// public method for decoding
Base64.prototype.decode = function (input) {
    var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = this._utf8_decode(output);
    return output;
}

// private method for UTF-8 encoding
Base64.prototype._utf8_encode = function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}

// private method for UTF-8 decoding
Base64.prototype._utf8_decode = function (utftext) {
    var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
    while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

var base64 = new Base64();

export { p, rand, post, now, un, ptj, sc, gc, jgT, inQ, inDom, l, date, now_m, ww, wh, bli, liuhai, vFloat, alert, alt, loading, bli2, mGS, data_r, inarray, base64, f_arr, f_w, cp, linePos, linePosX, ruler, pwh, pww, syT, file, mcGif, gAds,randArr};