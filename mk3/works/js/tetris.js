var time = 0;
var block = [];
var s = 0;
var sbefore = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight,WEBGL);
  for (var i = 0; i < 21; ++i) {
    var a = [
      10*(Math.floor(random(-3/10*window.innerHeight, 3/10*window.innerHeight)/10)), 10*(Math.floor(random(-1/10*window.innerHeight, 3/10*window.innerHeight)/10)), 1/50*i*window.innerHeight-1/5*window.innerHeight
    ];
    block[i] = new Block(a, i%7);
  }
}

function draw() {
  background(255);
  ambientLight(50);
  directionalLight(200, 0, 0, 0.8, 0.8, 0.8);
  camera(0, -100, 600, 0, 0, 0, 0, 1, 0);
  rotateY(radians(time/2));
  noStroke();
  fill(0,0,102);
  beginShape();
  vertex(2/5*window.innerHeight, 235*window.innerHeight, 200*window.innerHeight);
  vertex(-2/5*window.innerHeight, 235*window.innerHeight, 2/5*window.innerHeight);
  vertex(-2/5*window.innerHeight, 235*window.innerHeight, -2/5*window.innerHeight);
  vertex(2/5*window.innerHeight, 235*window.innerHeight, -2/5*window.innerHeight);
  endShape();
  for (var i = 0; i < block.length; ++i) {
    block[i].display();
  }
  update();
}

function update() {
  sbefore = s;
  s = second();
  if (s != sbefore) {
    for (var i = 0; i < block.length; ++i) {
      block[i].fall();
    }
  }
  ++time;
}

function Block(a,b) {
  this.x = a;
  this.type = b;
  this.rotation = 0;
  switch (this.type) {
    case 0:
      this.c = color(255,0,0);
      break;

    case 1:
      this.c = color(255,128,0);
      break;

    case 2:
      this.c = color(255,255,0);
      break;

    case 3:
      this.c = color(0,153,0);
      break;

    case 4:
      this.c = color(0,0,255);
      break;

    case 5:
      this.c = color(0,0,204);
      break;

    case 6:
      this.c = color(102,0,204);
      break;
  }
  this.display = function() {
    push();
    translate(this.x[0], this.x[1], this.x[2]);
    rotateZ(this.rotation);
    specularMaterial(this.c);
    box(10);
    switch (this.type) {
      case 0:
        translate(0, -10, 0);
        box(10,10,10);
        translate(-10, 0, 0);
        box(10,10,10);
        translate(20, 10, 0);
        box(10,10,10);
        break;

      case 1:
        translate(10, 0, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        translate(0, -10, 0);
        box(10,10,10);
        break;

      case 2:
        translate(0, -10, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        translate(0, 10, 0);
        box(10,10,10);
        break;

      case 3:
        translate(10, 0, 0);
        box(10,10,10);
        translate(0, -10, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        break;

      case 4:
        translate(10, 0, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        translate(-20, -10, 0);
        box(10,10,10);
        break; 

      case 5:
        translate(10, 0, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        translate(10, 0, 0);
        box(10,10,10);
        break;
      case 6:
        translate(0, -10, 0);
        box(10,10,10);
        translate(-10, 0, 0);
        box(10,10,10);
        translate(20, 0, 0);
        box(10,10,10);
        break;
    }
    pop();
  };
  this.fall = function() {
    this.x[1] += 10;
    if (((this.x[1] == 80)||(this.x[1] == 160))&&(random(0, 1)>0.5)) {
      this.rotation += PI/2;
    }
    if (this.x[1] == 200) {
      this.x[0] = 10*(Math.floor(random(-150, 150)/10));
      this.x[1] = -50;
      this.x[2] = 10*(Math.floor(random(-150, 150)/10));
    }
  };
}
