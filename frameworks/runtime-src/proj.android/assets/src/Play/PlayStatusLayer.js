var PlayStatusLayer = cc.Layer.extend({
    sprite:null,
    score: {},
    controls: {
      p1: {},
      p2: {}
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. Score labels
        this.score.p1 = new cc.LabelTTF(app.scores.p1, "Arial", 38);
        // position the label on the center of the screen
        this.score.p1.x = size.width / 4;
        this.score.p1.y = size.height / 1.1;
        // add the label as a child to this layer
        this.addChild(this.score.p1, 5);
	
	this.score.p2 = new cc.LabelTTF(app.scores.p2, "Arial", 38);
        // position the label on the center of the screen
        this.score.p2.x = size.width / 1.25;
        this.score.p2.y = size.height / 1.1;
        // add the label as a child to this layer
        this.addChild(this.score.p2, 5);
	
	/////////////////////////////
	// 4. Controls
	this.controls.p1.up = new cc.MenuItemImage(
	res.control_png,
	res.control_png,
	function () {
	    cc.log("P1 Up");
	}, this);

	this.controls.p1.up.attr({
	    x: 100,
	    y: size.height / 1.25,
	    anchorX: 0.5,
	    anchorY: 0.5
	});
	
	this.controls.p1.down = new cc.MenuItemImage(
	res.control_png,
	res.control_png,
	function () {
	    cc.log("P1 down");
	}, this);

	this.controls.p1.down.attr({
	    x: 100,
	    y: size.height / 4,
	    anchorX: 0.5,
	    anchorY: 0.5,
	    rotation: 180
	});
	
	this.controls.p2.up = new cc.MenuItemImage(
	res.control_png,
	res.control_png,
	function () {
	    cc.log("P2 Up");
	}, this);

	this.controls.p2.up.attr({
	    x: size.width - 100,
	    y: size.height / 1.25,
	    anchorX: 0.5,
	    anchorY: 0.5
	});
	
	this.controls.p2.down = new cc.MenuItemImage(
	res.control_png,
	res.control_png,
	function () {
	    cc.log("P2 down");
	}, this);

	this.controls.p2.down.attr({
	    x: size.width - 100,
	    y: size.height / 4,
	    anchorX: 0.5,
	    anchorY: 0.5,
	    rotation: 180
	});
	
        this.controls.menu = new cc.Menu(this.controls.p1.up, this.controls.p1.down, this.controls.p2.up, this.controls.p2.down);
        this.controls.menu.x = 0;
        this.controls.menu.y = 0;
	
        this.addChild(this.controls.menu, 1);
	
        return true;
	
    }
});