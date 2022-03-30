let pieces = [];
var sceneNum = 1;

function setup() {
  createCanvas(400, 400);
  
  
  for (var i = 0; i < 5; i++) {
    pieces[i] = new trash(400,random(400), 10, 10);
  }
  
}

function home() {
  sceneNum = 1;
  background(100, 200, 200);
  fill(300, 300, 300);
  textSize(40);
  text("Save the Ocean!", 50, 150);
  
  rect(100, 200, 200, 70);
  fill(100, 200, 200);
  text("PLAY", 150, 250);
  
}

function game() {
  sceneNum = 2;
  background(70, 220, 500);

   
  for (var i = 0; i < 5; i++) {
    pieces[i].show();
    pieces[i].update();
    
  }
  
  //trash bin (always where mouse is)
  noStroke();
  fill(100);
  rect(mouseX-20, mouseY-15, 40, 30);
  fill(70);
  rect(mouseX+20, mouseY-17, 4, 34);
}

function draw() {
  if (sceneNum === 1) {
    home();
  } else if (sceneNum === 2)
    game();
}

function mouseClicked() {
  if (sceneNum === 1 && mouseX >= 100 && mouseX <= 300 && mouseY >= 200 && mouseY <= 270) {
    sceneNum = 2;
  }
}
