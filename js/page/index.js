'use strict'
import Dom from '../inc/dom'
import Bgv from '../ex/bgv'
import Btn from '../ex/btn'
import Font from '../ex/font'
import Dongtu from '../ex/dongtu'
import { p, ww, wh, rand, now, post, ptj, inQ, liuhai, sc, date, ruler, file, mcGif, bli2, gAds, randArr } from '../inc/func'


export default class Index {
    constructor() {
        let that = this;
        let h = 1624;
        if (wh > h) {
            h = '100%';
        }
        G.getConfig(0, that.confBack);
        G.bindLoop = this.index.bind(G);
    }
    index() {
        if (!G.index.bads && G.lailu !== '') {
            gAds(G.index.iniAdTu, G.index);
            G.index.bads = true;
        }
        this.iniBG();
        this.domShow();
        this.touchEvent();
    }
}