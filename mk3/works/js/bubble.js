var time = 0;
var step = 0.001;
var radiusOfBubble = window.innerWidth/20;
var bubble = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < 10; ++i) {
    bubble[i] = new Bubble();
  }
  frameRate(60);
}

function draw() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(205);
  for (var i = 0; i < bubble.length; ++i) {
    bubble[i].run();
  }
  for (var i = 0; i < bubble.length; ++i) {
    for (var j = i+1; j < bubble.length; ++j) {
      judge(bubble[i], bubble[j]);
    }
  }
  time += step;
}

function absorption(b1, b2) {
  if (b1.r/2 > b2.r/2) {
    if (b1.r < 200) {
      b1.r += b2.r/6;
      b1.vol = PI*pow(b1.r/2, 2);
    }
    b2.reset();
  } else {
    if (b2.r < 200) {
      b2.r += b1.r/6;
      b2.vol = PI*pow(b2.r/2, 2);
    }
    b1.reset();
  }
}

function judge(b1, b2) {
  var distance = sqrt(pow(b1.x-b2.x, 2)+pow(b1.y-b2.y, 2));
  if (distance < b1.r/2 + b2.r/2) {
    absorption(b1, b2);
  }
}


function Bubble() {
  this.r = random(10, radiusOfBubble);
  this.density = 0.1;
  this.vol = PI*pow(this.r/2, 2);
  this.m = this.vol*this.density;  
  this.x = random(0, width);
  this.y = random(0, height);
  this.v = random(-1, 1);
  this.a = 0;
  this.f = 0;
  this.rho = 10000;
  this.g = 1;

  this.force = function() {
    var ans;
    ans = -this.rho*this.vol*this.g + this.g*this.m - this.vol*this.v;
    this.f = ans;
  };

  this.neq = function() {
    this.a = this.f/this.m;
  };

  this.reset = function() {
    this.x = random(0, width);
    this.y = random(height*random(0.8, 1), height);
    this.v = random(-1, 1);
    this.r = random(10, radiusOfBubble);
    if ((this.r%2 == 0)||(this.r < 10)) {
      this.r = 0;
    }
    this.vol = PI*pow(this.r/2, 2);
    this.m = this.vol*this.density;
  };

  this.parameterSet = function() {
    for (var i = 0; i < 2; ++i) {
      this.v += this.a*step;
      this.y += this.v*step;
    }
    if ((this.x-this.r/2 > width)||(this.x+this.r/2 < 0)) {
      this.reset();
    }
    if (this.y+this.r/2 < 0) {
      this.reset();
    }
    if (this.r == 0) {
      for (var i = 0; i < 100000000; ++i) {
      }
      this.reset();
    }
  };

  this.display = function() {
    noStroke();
    fill(0, 5+20*this.y/height);
    for (var i = 0; i < 3; ++i) {
      ellipse(this.x, this.y, this.r, this.r);
    }
  };

  this.run = function(fld) {
    this.force();
    this.neq();
    this.parameterSet();
    this.display();
  };
}


