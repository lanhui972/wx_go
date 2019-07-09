'use strict'	//变大至消失
import Btn from './btn'
import {p,bli} from '../inc/func'

export default class Xialuo extends Btn {
    constructor(t){
		if(arguments.length<=2){
			super(arguments[0],arguments[1]);
		}else {
			super(arguments[0],arguments[1],arguments[2]);
		}

    }
    
	w(){

        
        super.w();
	}
}