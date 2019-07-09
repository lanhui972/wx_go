import { now_m, rand } from '../inc/func'
let instance
/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        if (instance) 
            return instance

      this.arr = { 
          'bg'  : 'mp3/bg1.mp3', 
          'ck'  : 'mp3/ck1.mp3',
          'hua': 'mp3/hua.mp3',
          'lba': 'mp3/lba.mp3',
          'die': 'mp3/die.mp3',
          }
        this.ckm = {};
    }

    ck(b, k) {
        if(!b || !G.syin)return;
        if (undefined===this.arr[k]){
            k = 'ck';
            //p('未定义声音 - '+k);
            //return;
        }        
        //if (undefined === this.click){
            this.click = new Audio()
            this.click.src = this.arr[k];
        //}
        this.click.currentTime = 0
        this.click.play();
    }
    ck2(b, k) {
        if (!b || !G.syin) return;
        if (undefined === this.arr[k]) {
            k = 'ck';
            //p('未定义声音 - '+k);
            //return;
        }
        //if (undefined === this.click){

        let m = now_m() + '_' + rand(100, 999);

        this.ckm[m] = new Audio()
        this.ckm[m].src = this.arr[k];
        this.ckm[m].play();
    }
	bg(b){
		if (!b) return;
        if (undefined === this.bgm){
            this.bgm = new Audio()
			this.bgm.loop = true
            this.bgm.src = this.arr.bg;
            this.bgm.currentTime = 0;
        }
        this.bgm.play();
	}
    bgStop(){
        if (undefined !== this.bgm){
            console.log(this.bgm);
            this.bgm.pause();
            this.bgm.loop = false;
            delete this.bgm;
        }
    }
    boosBg(b, n){
        if (!b) return;
        if (undefined !== this.bgm){
            this.bgm.pause();    
            this.bgm.loop = true;
            if(n == 1){
                this.bgm.src = this.arr.bossbg;
            }else {
                this.bgm.src = this.arr.bg;
            }
            this.bgm.currentTime = 0;
            this.bgm.play();
        }
        
    }

}
