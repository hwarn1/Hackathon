/*references: https://www.condorferries.co.uk/plastic-in-the-ocean-statistics
https://www.futureagenda.org/foresights/plastic-oceans/#:~:text=There%20are%20increasing%20high%20levels,fish%20in%20the%20world's%20oceans.*/

let pieces = [];
var condition = 9;
let swimmers = [];
let score = 0;
let facts = ["Each day, 8 million piece of plastic end \nup in our ocean system.", "Only 9% of the world's plastic actually \ngets recycled.", "76 trillion macro and microplastics \nare in our oceans.", "The ocean is being polluted with \napproximately 12.7 million tons of \nplastic every year.", "100% of infant sea turtles have some \nplastic in their stomach.", "88% of our ocean surfaces have \nplastic waste pollution", "It is anticipated that by 2050, the ocean \nwill contain more plastic than fish.", "Approximately 1 in every 3 fish caught \nfor humans to eat has plastic in it.", "It is estimated that plastic microbeads \nare 1 million times more toxic than \nregular seawater."]

function setup() {
  createCanvas(400, 400);
  
  
  for (var i = 0; i < 5; i++) {
    pieces[i] = new trash(400,random(400), 10, 10);
  }
  for (var f = 0; f < 3; f++) {
    swimmers[f] = new fish(400, random(400), 15, 10);
  }
  
}

function home() {
  condition = 9;
  background(100, 200, 200);
  fill(300, 300, 300);
  textSize(40);
  text("Save the Ocean!", 50, 150);
  
  rect(100, 180, 200, 70);
  fill(100, 200, 200);
  text("PLAY", 150, 230);
  
  fill(255);
  rect(100, 260, 200, 70);
  fill(100, 200, 200);
  textSize(28);
  text("HOW TO PLAY", 105, 305);
  
  fill(255);
  textSize(18);
  text("Did you know? ", 10, 355);
  textSize(15);
  text(facts[8], 135, 355)
}

function learn() {
  
  condition = 12;
  background(100, 200, 200);
  fill(255);
  textSize(30);
  text("HOW TO PLAY", 100, 65);
  stroke(255);
  rect(5, 100, 390, 250);
  noStroke();
  fill(100, 200, 200);
  textSize(20);
  text("Goal: ", 10, 140);
  textSize(15);
  text("Collect all the garbage while catching the ", 90, 140);
  text("least amount of fish possible. If you miss a", 90, 160);
  text("piece of trash, you lose!", 90, 180);
  textSize(20);
  text("How to: ", 10, 220);
  textSize(15);
  text("Drag your cursor to move the trash can ", 90, 220);
  text("across the screen. Collect trash by mousing", 90, 240);
  text("over it with the front of the can.", 90, 260);
  textSize(20);
  text("Scoring: ", 10, 300);
  textSize(15);
  text("Collect 1 piece of trash = 1 point", 90, 300);
  text("Collect 1 fish = -5 points", 90, 320);
  
  stroke(255);
  rect(5, 355, 75, 40, 10);
  fill(255);
  noStroke();
  text("BACK", 20, 380);
}

function game() {
  condition = 10;
  background(70, 220, 500);

   
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].show();
    pieces[i].update();
  }
  for (var f = 0; f < swimmers.length; f++) {
    swimmers[f].show();
    swimmers[f].update();
  }
  
  //trash bin (always where mouse is)
  noStroke();
  fill(100);
  rect(mouseX-20, mouseY-15, 40, 30);
  fill(70);
  rect(mouseX+20, mouseY-17, 4, 34);
  
  fill(200, 40, 100);
  textSize(20);
  text("Score:" + score, 20, 20);
}

function gameOver() {
  condition = 11;
  background(100, 200, 200);
  fill(300, 150, 0);
  textSize(50);
  text("Oh no!", 120, 100);
  textSize(25);
  fill(255);
  text("You missed a piece of trash :(", 25, 135);
  fill(300, 150, 0);
  text("Score: " + score, 150, 165);
  fill(255);
  text("Play again to avenge those fishies!", 5, 200);
  rect(150, 225, 100, 45, 10);
  fill(100, 200, 200);
  textSize(15);
  text("PLAY AGAIN", 155, 253);
  fill(255);
  rect(150, 280, 100, 45, 10);
  fill(100, 200, 200);
  textSize(12);
  text("BACK TO HOME", 155, 308);
  
}

function draw() {
  if (condition === 9) {
    home();
  } else if (condition === 10) {
    game();
  } else if (condition === 11) {
    gameOver();
  } else if (condition === 12) {
    learn();
  }
}

function mouseClicked() {
  if (condition === 9 && mouseX >= 100 && mouseX <= 300 && mouseY >= 200 && mouseY <= 270) {
    condition = 10;
  } else if (condition === 11 && mouseX >= 150 && mouseX <= 250 && mouseY >= 225 && mouseY <= 270) {
    condition = 10;
    score = 0;
  } else if (condition === 11 && mouseX >= 150 && mouseX <= 300 && mouseY >= 280 && mouseY <= 325) {
    condition = 9;
  } else if (condition === 9 && mouseX >= 100 && mouseX <= 300 && mouseY >= 280 && mouseY <= 350) {
    condition = 12;
  } else if (condition === 12 && mouseX >= 5 && mouseX <= 80 && mouseY >= 355 && mouseY <= 395) {
    condition = 9;
  }
}
