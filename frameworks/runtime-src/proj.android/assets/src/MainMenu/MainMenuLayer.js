var MainMenuLayer = cc.Layer.extend({
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

	var startButton = new cc.MenuItemImage(
	res.startNormal_png,
	res.startSelected_png,
	function () {
	    cc.director.runScene(new PlayScene());
	}, this);

	startButton.attr({
	    x: size.width / 2,
	    y: size.height / 2,
	    anchorX: 0.5,
	    anchorY: 0.5
	});
	startButton.runAction(
	    cc.RepeatForever(
		cc.sequence(
		      cc.scaleTo(.2, 1.1, 1.1),
		      cc.scaleTo(.2, 1, 1)
		)
	    )
        );
        var menu = new cc.Menu(startButton);
        menu.x = 0;
        menu.y = 0;
	
        this.addChild(menu, 1);
	
	
	
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var title = new cc.LabelTTF("Pong", "Arial", 38);
        // position the label on the center of the screen
        title.x = size.width / 2;
        title.y = size.height / 1.1;
        // add the label as a child to this layer
        this.addChild(title, 5);
	

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

//         helloLabel.runAction(
//             cc.spawn(
//                 cc.moveBy(2.5, cc.p(0, size.height - 40)),
//                 cc.tintTo(2.5,255,125,0)
//             )
//         );