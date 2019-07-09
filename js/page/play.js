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
import Zbei from '../game/zbei'
import { md5 } from '../inc/md5'
import Opacity from '../ex/opacity'
import Spine from '../ex/spine'
import Move from '../ex/move'

import { p, ww, wh, liuhai, rand, bli, gc, ptj, sc, now_m, vFloat, post, alt, bli2, mGS, inQ, inDom, now, data_r, base64, f_arr, alert, loading, linePos, date, f_w, pww, randArr } from '../inc/func'

export default class Play {
    constructor() { }
    start(g) {
        G.bindLoop = this.play.bind(this);
    }

    play() {
        G.iniBG();
        G.domShow();
        G.touchEvent();
    }
}