function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(70, 220, 500);
  
  //trash bin (always where mouse is)
  noStroke();
  fill(100);
  rect(mouseX-10, mouseY-20, 30, 40);
  fill(70);
  rect(mouseX-12, mouseY-22, 34, 4);
}
