var PlayScene = cc.Scene.extend({
    space: null,
    layers: null,
    onEnter:function () {
        this._super();
	this.initPhysics();
	
        this.layers = {
	  background: new PlayBackgroundLayer(),
	  main: new PlayLayer(this.space),
	  hud: new PlayStatusLayer()
	};
	
        this.addChild(this.layers.background);
	this.addChild(this.layers.main);
	this.addChild(this.layers.hud);
	
	this.scheduleUpdate();
    },
    initPhysics:function() {
        //1. new space object 
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, 0);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 0),// start point
            cp.v(cc.winSize.width, 0),// MAX INT:4294967295
            10);// thickness of wall
	wallBottom.setElasticity(1);
        this.space.addStaticShape(wallBottom);
	
	var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, cc.winSize.height),// start point
            cp.v(cc.winSize.width, cc.winSize.height),// MAX INT:4294967295
            10);// thickness of wall
	wallTop.setElasticity(1);
        this.space.addStaticShape(wallTop);
	
	var wallLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 0),// start point
            cp.v(0, cc.winSize.height),// MAX INT:4294967295
            10);// thickness of wall
	wallLeft.setElasticity(0);
	wallLeft.group = 10;
        this.space.addStaticShape(wallLeft);
	
	var wallRight = new cp.SegmentShape(this.space.staticBody,
            cp.v(cc.winSize.width, 0),// start point
            cp.v(cc.winSize.width, cc.winSize.height),// MAX INT:4294967295
            10);// thickness of wall
	wallRight.setElasticity(0);
	wallRight.group = 10;
        this.space.addStaticShape(wallRight);
	
	//containers
	var containerTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, cc.winSize.height - 15),// start point
            cp.v(cc.winSize.width, cc.winSize.height - 15),// MAX INT:4294967295
            10);// thickness of wall
	containerTop.setElasticity(0);
	containerTop.group = 10;
        this.space.addStaticShape(containerTop);
	
	var containerBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 15),// start point
            cp.v(cc.winSize.width, 15),// MAX INT:4294967295
            10);// thickness of wall
	containerBottom.setElasticity(0);
	containerBottom.group = 10;
        this.space.addStaticShape(containerBottom);
	
	var containerLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(60, 0),// start point
            cp.v(60, cc.winSize.height),// MAX INT:4294967295
            10);// thickness of wall
	containerLeft.setElasticity(0);
	containerLeft.group = 10;
        this.space.addStaticShape(containerLeft);
	
	var containerRight = new cp.SegmentShape(this.space.staticBody,
            cp.v(cc.winSize.width -60, 0),// start point
            cp.v(cc.winSize.width - 60, cc.winSize.height),// MAX INT:4294967295
            10);// thickness of wall
	containerRight.setElasticity(0);
	containerRight.group = 10;
        this.space.addStaticShape(containerRight);
    },
    update:function (dt) {
        // chipmunk step
      this.space.step(dt);
	
	this.layers.main.handleControls(this.layers.hud.controls);
	this.layers.main.handleBall(this.layers.hud.score);
    }
});