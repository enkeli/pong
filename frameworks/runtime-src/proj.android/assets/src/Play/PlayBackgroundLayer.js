var PlayBackgroundLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;


        // add "HelloWorld" splash screen"
        this.background = new cc.Sprite(res.Background_jpg);
        this.background.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.background, 0);
        return true;
	
    }
});