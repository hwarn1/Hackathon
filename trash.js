class trash {
  
  constructor(x,y, width, height) {
    this.pos = createVector(x, y);
    //(400+x*1000, (height-50-y*50));
    this.width = width;
    this.height = height;
  }
  
  show() {
    fill(100,100,100);
    ellipse(this.pos.x, this.pos.y, this.width, this.height)
  }
  update() {
    this.pos.x -= 2;
  }
}
