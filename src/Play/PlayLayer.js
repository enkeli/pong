var PlayLayer = cc.Layer.extend({
    p1: null,
    p2: null,
    ball: null,
    space: null,
    ctor: function (space) {
        //////////////////////////////
        // 1. super init first
        this._super();
	this.space = space;
	
// 	this._debugNode = new cc.PhysicsDebugNode(this.space);
// 	this.addChild(this._debugNode, 10);
	this.init();
    },
    init: function () {
	this._super();
	
	
        //create the player 1 sprite
        this.p1 = new cc.PhysicsSprite(res.pong_png);
	var contentSize = this.p1.getContentSize();	
	this.p1.body = new cp.Body(10, cp.momentForBox(10, contentSize.width, contentSize.height));	
	this.p1.body.p = cc.p(30, 150 + contentSize.height / 2);	
	this.space.addBody(this.p1.body);	
	this.p1.shape = new cp.BoxShape(this.p1.body, contentSize.width, contentSize.height);
	this.p1.shape.setElasticity(1);	
	this.space.addShape(this.p1.shape);	
	this.p1.setBody(this.p1.body);	
        this.addChild(this.p1);
	
	//create the player 2 sprite
        this.p2 = new cc.PhysicsSprite(res.pong_png);
	var contentSize = this.p2.getContentSize();	
	this.p2.body = new cp.Body(10, cp.momentForBox(10, contentSize.width, contentSize.height));	
	this.p2.body.p = cc.p(cc.winSize.width - 30, 150 + contentSize.height / 2);	
	this.space.addBody(this.p2.body);	
	this.p2.shape = new cp.BoxShape(this.p2.body, contentSize.width, contentSize.height);
	this.p2.shape.setElasticity(1);	
	this.space.addShape(this.p2.shape);	
	this.p2.setBody(this.p2.body);	
	this.addChild(this.p2);
	
	//create the ball sprite
        this.ball = new cc.PhysicsSprite(res.ball_png);
	var contentSize = this.ball.getContentSize();	
	this.ball.body = new cp.Body(0.1, cp.momentForCircle(0.1, 0, contentSize.width, cp.v(0,0)));	
	this.ball.body.p = cc.p(cc.winSize.width - 500, 100 + contentSize.height / 2);	
	this.ball.body.applyImpulse(cp.v(50, 20), cp.v(0, 0));	
	this.space.addBody(this.ball.body);	
	this.ball.shape = new cp.CircleShape(this.ball.body, contentSize.width / 2, cp.v(0,0));
	this.ball.shape.setElasticity(1);	
	this.ball.shape.group = 10;
	this.space.addShape(this.ball.shape);	
	this.ball.setBody(this.ball.body);
        this.addChild(this.ball);
	
	cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                switch(keyCode){
		    case 87:
		      cc.log("P1 up");
		      event.getCurrentTarget().p1.movingUp = true;
		      break;
		    case 83:
		      cc.log("P1 down");
		      event.getCurrentTarget().p1.movingDown = true;
		      break;
		    case 38:
		      cc.log("P2 up");
		      event.getCurrentTarget().p2.movingUp = true;
		      break;
		    case 40:
		      cc.log("P2 down");
		      event.getCurrentTarget().p2.movingDown = true;
		      break;
		  }
	    },
	    onKeyReleased: function(keyCode, event){
		    switch(keyCode){
			case 87:
			  cc.log("P1 up");
			  event.getCurrentTarget().p1.movingUp = false;
			  break;
			case 83:
			  cc.log("P1 down");
			  event.getCurrentTarget().p1.movingDown = false;
			  break;
			case 38:
			  cc.log("P2 up");
			  event.getCurrentTarget().p2.movingUp = false;
			  break;
			case 40:
			  cc.log("P2 down");
			  event.getCurrentTarget().p2.movingDown = false;
			  break;
		  }
            }
        }, this);
    },
    handleControls: function (controls) {
	if(controls.p1.up.isSelected()){
	  this.p1.movingUp = true;
	}
	else {
	    this.p1.movingUp = false;
	}
	
	if(controls.p1.down.isSelected()){
	  this.p1.movingDown = true;
	}
	else {
	    this.p1.movingDown = false;
	}
	
	if(controls.p2.up.isSelected()){
	  this.p2.movingUp = true;
	}
	else {
	    this.p2.movingUp = false;
	}
	
	if(controls.p2.down.isSelected()){
	  this.p2.movingDown = true;
	}
	else {
	    this.p2.movingDown = false;
	}
	
      
	if(this.p1.movingUp) {
	    this.p1.body.applyImpulse(cp.v(0, 100), cp.v(0, 0));
	}
	else if(this.p1.movingDown) {
	    this.p1.body.applyImpulse(cp.v(0, -100), cp.v(0, 0));
	}
	else {
	    this.p1.body.setVel(cp.v(0, 0));
	}
	
	
	if(this.p2.movingUp) {
	    this.p2.body.applyImpulse(cp.v(0, 100), cp.v(0, 0));
	}
	else if(this.p2.movingDown) {
	    this.p2.body.applyImpulse(cp.v(0, -100), cp.v(0, 0));
	}
	else {
	    this.p2.body.setVel(cp.v(0, 0));
	}
	
    },
    handleBall: function(score) {
	var pos = this.ball.getPositionX();
	
	if(pos <= 0) {
	  app.scores.p2++;  
	  score.p2.setString(app.scores.p1);
	  cc.director.runScene(new PlayScene());
	}
	
	if(pos >= cc.winSize.width) {
	    app.scores.p1++;
	    score.p1.setString(app.scores.p2);
	    cc.director.runScene(new PlayScene());
	}
    }
});