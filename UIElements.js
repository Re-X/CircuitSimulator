let dt;

const UI = {
  //Parameters
  view: new p5.Vector(250, 250),
  origin: new p5.Vector(250, 250),
  size: new p5.Vector(500, 500),
  frameRate: 100,
  bg_color: 40,
  font: "Roboto Mono",
  tx: 0,
  ty: 0,
  zoom: 1,
  scrollDelta: new p5.Vector(0, 0),
  isStatic: false,
  time: 0,

  Setup() {
    createCanvas(this.size.x, this.size.y);
    frameRate(this.frameRate);
    background(this.bg_color);
    textFont(this.font);
    dt = 1/this.frameRate;
  },

  Update() {
    this.time += dt;
    this.origin.x = this.view.x + this.tx / this.zoom;
    this.origin.y = this.view.y + this.ty / this.zoom;
    scale(this.zoom);
    translate(
      this.view.x + this.tx / this.zoom,
      this.view.y + this.ty / this.zoom
    );
    scale(1, -1);
  },

  ScreenToCoords(vec) {
    let vecr = vec.copy();
    vecr.x = vecr.x / this.zoom - this.origin.x;
    vecr.y = this.origin.y - vecr.y / this.zoom;
    return vecr;
  },
  
  ScreenToCoordsXY(x, y) {
    let vecr = new p5.Vector(x, y);
    vecr.x = vecr.x / this.zoom - this.origin.x;
    vecr.y = this.origin.y - vecr.y / this.zoom;
    return vecr;
  },
  
  CoordsToScreenXY(x, y) {
    let x2, y2;
    x2 = (x + this.origin.x) * this.zoom;
    y2 = (this.origin.y - y) * this.zoom;
    return [x2, y2];
  }
};

function Text(string, x, y){
  push();
  fill(255);
  string = str(string);
  let l = string.length;
  rect(x-5, y-2, (l+1)*8, 12, 10);
  stroke(40);
  strokeWeight(1);
  scale(1, -1);
  fill(40);
  text(string, x, -y);
  pop();
}

const Shapes = {
  Arrow(base, vec, len = 1, color = 255) {
    push();
    let r = vec.mag();
    if (r == 0) return;
    stroke(color);
    strokeWeight(3 / UI.zoom);
    fill(color);
    translate(base.x, base.y);
    line(0, 0, len*vec.x/r, len*vec.y/r);
    rotate(vec.heading());
    let arrowSize = 4 / UI.zoom;
    translate(len - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  },
};

function mouseWheel() {
  s = -event.deltaY > 0 ? 1.05 : 0.95;
  UI.zoom *= s;
  UI.tx = mouseX * (1 - s) + UI.tx * s;
  UI.ty = mouseY * (1 - s) + UI.ty * s;
  return false;
}

function mouseDragged() {
  if (mouseButton == LEFT && UI.isStatic == false) {
    UI.view.x += (winMouseX - pwinMouseX) / UI.zoom;
    UI.view.y += (winMouseY - pwinMouseY) / UI.zoom;
  }
}
