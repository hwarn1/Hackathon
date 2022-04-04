class fish {
  
  constructor(x,y, width, height) {
    this.pos = createVector(x, y);
    //(400+x*1000, (height-50-y*50));
    this.width = width;
    this.height = height;
  }
  
  show() {
    fill(300, 150, 0);
    ellipse(this.pos.x, this.pos.y, this.width, this.height)
    triangle(this.pos.x + this.width/2, this.pos.y, this.pos.x + this.width, this.pos.y - this.height/2, this.pos.x + this.width, this.pos.y + this.height/2);
  }
  update() {
    this.pos.x -= 2;
    if(this.pos.x >= mouseX && this.pos.x <= mouseX+20 && this.pos.y >= mouseY-17 && this.pos.y <= mouseY+17) {
      this.pos.x = 400;
      this.pos.y = random(400);
      score -= 5;
    } else if (this.pos.x < -10) {
      this.pos.x = 400;
      this.pos.y = random(400);
    }
  }
  
    
  
}
