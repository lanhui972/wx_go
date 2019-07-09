'use strict'	//变大至消失
import { spine } from '../inc/spine'
import Dom from '../inc/dom'
import {p,bli,bli2,now,ww,wh,pww,pwh} from '../inc/func'
export default class Spine extends Dom {
    constructor(t) {

        super('img', arguments[0], arguments[1]);

        
        this.assetManager;
        this.skeleton, this.state, this.bounds;
        this.skeletonRenderer;

        this.skelName = "wukong";
        this.animName = "run";
        this.dataOk   = false;
        
        if (undefined === this.attr.sd){   //速度倍数
            this.attr.sd = 1;
        }
        if (undefined === this.attr.stop){ //停止动作
            this.attr.stop = true;
        }        

        this.skeletonRenderer = new spine.canvas.SkeletonRenderer(ctx);
        this.skeletonRenderer.debugRendering = false;
        this.skeletonRenderer.triangleRendering = false;

        this.assetManager = new spine.canvas.AssetManager();
        this.assetManager.loadText("json/" + this.skelName + ".json");
        this.assetManager.loadText("json/" + this.skelName.replace("-pro", "").replace("-ess", "") + ".atlas");
        this.assetManager.loadTexture("json/" + this.skelName.replace("-pro", "").replace("-ess", "") + ".png");
    }

    run(){
        this.animName = "run";
        var data = this.loadSkeleton(this.skelName, this.animName, "default");
        this.skeleton = data.skeleton;
        this.state = data.state;
        this.bounds = data.bounds;
        this.dataOk = true;
    }
    hit() {
        this.animName = "hit";
        var data = this.loadSkeleton(this.skelName, this.animName, "default");
        this.skeleton = data.skeleton;
        this.state = data.state;
        this.bounds = data.bounds;
        this.dataOk = true;
    }
    pao() {
        this.attr.sd = 2;
    }
    shou() {
        this.attr.sd = 1;
    }

    loadSkeleton(name, initialAnimation, skin) {
        let that = this;
        if (skin === undefined) skin = "default";

        // Load the texture atlas using name.atlas and name.png from the AssetManager.
        // The function passed to TextureAtlas is used to resolve relative paths.
        var atlas = new spine.TextureAtlas(that.assetManager.get("json/" + name.replace("-pro", "").replace("-ess", "") + ".atlas"), function(path) {
            return that.assetManager.get("json/" + path);
        });
        // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
        that.atlasLoader = new spine.AtlasAttachmentLoader(atlas);
        // Create a SkeletonJson instance for parsing the .json file.
        var skeletonJson = new spine.SkeletonJson(that.atlasLoader);
        // Set the scale to apply during parsing, parse the file, and create a new skeleton.
        var skeletonData = skeletonJson.readSkeletonData(that.assetManager.get("json/" + name + ".json"));
        var skeleton = new spine.Skeleton(skeletonData);
        skeleton.flipY = true;
        var bounds = that.calculateBounds(skeleton);
        skeleton.setSkinByName(skin);

        // Create an AnimationState, and set the initial animation in looping mode.
        var animationState = new spine.AnimationState(new spine.AnimationStateData(skeleton.data));
        animationState.setAnimation(0, initialAnimation, true);
        animationState.addListener({
            event: function(trackIndex, event) {
                 console.log("Event on track " + trackIndex + ": " + JSON.stringify(event));
            },
            complete: function(trackIndex, loopCount) {
                if (undefined !== that.attr.endFunc){
                    that.attr.endFunc(that, loopCount);
                }
                 console.log("Animation on track " + trackIndex + " completed, loop count: " + loopCount);
            },
            start: function(trackIndex) {
                 console.log("Animation on track " + trackIndex + " started");
            },
            end: function(trackIndex) {
                 console.log("Animation on track " + trackIndex + " ended");
            }
        })
        // Pack everything up and return to caller.
        return { skeleton: skeleton, state: animationState, bounds: bounds };
    }
    calculateBounds(skeleton) {
        var data = skeleton.data;
        skeleton.setToSetupPose();
        skeleton.updateWorldTransform();
        var offset = new spine.Vector2();
        var size = new spine.Vector2();
        skeleton.getBounds(offset, size, []);
        return { offset: offset, size: size };
    }

    render() {
        var now = Date.now() / 1000;
        var delta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(this.attr.x, this.attr.y);

        this.state.update(delta * G.d['我']['前进速度']);
        this.state.apply(this.skeleton);
        if (!this.stop){
            this.skeleton.updateWorldTransform();
        }        
        this.skeletonRenderer.draw(this.skeleton);

        //ctx.restore();
        //requestAnimationFrame(this.render);
    }

    w() {
      if (!this.dis || !this.dis) return false;
        if (undefined===this.lastFrameTime){
            this.lastFrameTime = Date.now() / 1000;
        }

        if (this.dataOk){
            this.render();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(0, 0);
            ctx.scale(3, 3);

        }else if (this.assetManager.isLoadingComplete()) {
            var data = this.loadSkeleton(this.skelName, this.animName, "default");
            this.skeleton = data.skeleton;
            this.state = data.state;
            this.bounds = data.bounds;
            this.dataOk = true;
            this.render();
            
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(0, 0);
            ctx.scale(3, 3);
        }
    }
}