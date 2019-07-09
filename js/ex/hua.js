'use strict'	//增加一些元素的效果
import Btn from './btn'
import {p,bli} from '../inc/func'
export default class Hua extends Btn {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
    }
    thMove(e,ckx,cky){
        //p('have move');
        this.attr.zindex = 3;
        this.attr.opacity= 0.8;
        super.thMove(e,ckx,cky);
        G.iniDoms();
    }
    thMoveEnd(e){
        //p('move end');
        this.attr.zindex = 2;
        super.thMoveEnd(e);
        delete this.attr.zindex;
        this.attr.opacity=1;
        if (undefined!==this.attr.moveend){
            this.attr.moveend();
        }
        G.iniDoms();
    }


	w(){
        let that = this;
		super.w();
		//p('Btn w'); 
	}
}