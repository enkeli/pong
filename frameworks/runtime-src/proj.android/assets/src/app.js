var app = {
  start: function(){
    cc.director.runScene(new MainMenuScene());
  },
  scores: {
    p1: 0,
    p2: 0
  }
};