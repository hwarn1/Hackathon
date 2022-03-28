let pieces = [];

function setup() {
  createCanvas(400, 400);
  
  
  for (var i = 0; i < 5; i++) {
    pieces[i] = new trash(400,random(400), 10, 10);
  }
  
}

function draw() {
  background(70, 220, 500);

   
  for (var i = 0; i < 5; i++) {
    pieces[i].show();
    pieces[i].update();
  }

  
    /*//trash goes across screen and repeats when reaches left side
  for (var t = 0; t < 5; t++) {
    ellipse(xPos[t], yPos[t], 10, 10);
    xPos.push(400);
    yPos.push(random(0, 400));
    xPos[t] -= 2;
    if (xPos[t] === 0) {
      xPos[t] = 400;
    } /*
  }*/
  
  //trash bin (always where mouse is)
  noStroke();
  fill(100);
  rect(mouseX-20, mouseY-15, 40, 30);
  fill(70);
  rect(mouseX+20, mouseY-17, 4, 34);
}
