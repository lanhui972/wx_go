'use strict'	//增加一些元素的效果
import Dongtu from './dongtu'
import {p,bli,linePosX} from '../inc/func'
export default class Yangguang extends Dongtu {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}
        
        this.nTime = 120;
        this.mTime = 70;
        this.attr.opacity = 0.1;
    }
	w(){

        if (this.nTime > this.mTime){
            this.attr.opacity += 0.025;
            if (this.attr.opacity>1){
                this.attr.opacity = 1;
            }
            
            this.attr.y -= 0.2;
        }else{
            let zPos = [G.dom['tu_14'].attr.px,G.dom['tu_14'].attr.py,];
            this.attr.x += (zPos[0] - this.attr.px)/this.nTime;
            this.attr.y += (zPos[1] - this.attr.py)/this.nTime;
//p(G.dom);
            if(this.nTime<30 && this.nTime>0) {
                this.attr.opacity -= 0.02;
                if (this.attr.opacity<=0){
                    this.attr.opacity = 0.01;
                }                
            }else if (this.nTime<=0) {
                if (undefined!==this.attr.endF){
                    this.attr.endF();
                }                
                this.remove();
                G.dom[this.attr.ft].remove();
            }
        }
        G.dom[this.attr.ft].attr.x = this.attr.x+this.attr.width/2;
        G.dom[this.attr.ft].attr.y = this.attr.y-5;

        this.nTime -= 1*G.jiaShu;
		super.w();
	}
}