

//load sound
function preload() {
  soundFormats('mp3');
  bgm = loadSound('music.mp3');
  getPoint = loadSound('yes.mp3');
  wrongTrash=loadSound('no.mp3');
  laser=loadSound('laser3.mp3');
}

//images of the recycable trash
let can;
let bottle;
let bag;
let intro1;
let intro2;
let intro3;
let intro4;

// game objects
var ship;
var lasers = [];
var trashes = []; 
var trashNum;
const flock = [];   // fishes

// sliders
let alignSlider, cohesionSlider, separationSlider;

//scoring system
var playerPoint = 0;
var fishHP = 100;

// game setting
var gameEnd=false;
var condition=1;
var startTime;
var curTime;



function setup() {
    createCanvas(1000, 600);
    amp = new p5.Amplitude();
    playing();
   
    //load images
    can=loadImage('can1.png');
    bag=loadImage('bag1.png');
    bottle=loadImage('bottle1.png');
    intro1=loadImage('intro1.png');
    intro2=loadImage('intro2.png');
    intro3=loadImage('intro3.png');
    intro4=loadImage('intro4.png');


    ship = new Ship();
    for (var i = 0; i < 5; i++) {
        trashes.push(new Trash(0));
        let seed = int(random(1, 4));
        trashes.push(new Trash(seed));
    }
    trashNum = trashes.length;
    for (let i = 0; i < 60; i++) {
        flock.push(new Boid());
    }

    alignSlider = createSlider(0, 2, 1.5, 0.1);
    cohesionSlider = createSlider(0, 2, 1, 0.1);
    separationSlider = createSlider(0, 2, 2, 0.1);
  
  
  //trashcansetup
  //createCanvas(400, 400);
  
  for (var n = 0; n < 5; n++) {
    pieces[n] = new trash(400,random(400), 10, 10);
  }
  for (var f = 0; f < 3; f++) {
    swimmers[f] = new fish(400, random(400), 15, 10);
  }
  r = floor(random(0,8));
}


function draw() {
    background(99, 170, 225);
    if(condition==1) 
        intro();  
    if(condition==2) 
        choose();
   if(condition==3) 
        intro22();  
   if(condition==4) 
        intro33();  
   if(condition==5) 
        intro44();  
    if(condition==6)
        game();
    if(condition==7)
        lose();
  
  if (condition === 9) {
    //createCanvas(400, 400);
    home();
  } else if (condition === 10) {
    game2();
  } else if (condition === 11) {
    gameOver();
  } else if (condition === 12) {
    learn();
  }
}


function mousePressed() {
    
                    
     if (condition == 2 && mouseX >= 100 && mouseX <= 500 && mouseY >= 200 && mouseY <= 400) {
      game2();
      condition = 9;
    } else if (condition == 2 && mouseX >= 500 && mouseX <= 900 && mouseY >= 200 && mouseY <= 400) {
      intro22();
      condition = 3;
    }
    if (3 <= condition && condition <= 5) {
       let d = dist(mouseX,mouseY,900,550);
       if (d < 100) condition ++;
       if (condition == 4) startTime = millis();
    }
}

function intro(){
    image(intro1,0,0,1000,600);
    
}

function choose() {
    condition=2;
    background(100, 170, 500);
    fill(255);
    textSize(30);
    text("Choose your method:", 100, 100);
    fill(100, 170, 500);
    stroke(255);
    rect(100, 200, 400, 200, 10);
    fill(255);
    textSize(50);
    text("Trash Can", 190, 320);
    fill(100, 170, 500);
    rect(500, 200, 400, 200, 10);
    fill(255);
    text("Submarine", 570, 320);
}

function intro22(){
    image(intro2,0,0,1000,600);
}


function intro33(){
    image(intro3,0,0,1000,600);
}

function intro44(){
    image(intro4,0,0,1000,600);
}




function lose(){
    textSize(22);
    noStroke();
    fill(255);
    text("oh no you die, fishes die too", 40, 200);

    textSize(50);
    text("Retry", 80, 335);
    stroke(255);
    noFill();
    rect(40,270,185,100);
    let d = dist(mouseX,mouseY,80,335);
    if (mouseIsPressed && d<100) {
        gameStart = true;
        startTime = millis();
        console.log('game restart at' + str(startTime));
        trashes = []
        for (var i = 0; i < 5; i++) {
            trashes.push(new Trash(0));
            let seed = int(random(1, 4));
            trashes.push(new Trash(seed));
        }
        playerPoint = 0;
        condition --;
    }
}

function game() {
   
  
  
    //scoring system
    textSize(22);
    noStroke();
    fill(255);
    trashNum = trashes.length;
    if (trashNum <= 10) fishHP = 100;
    else fishHP = 100 - 5 * (trashNum - 10)

    if (fishHP==0) condition=6;

    text("player point" + " "+ playerPoint, 40, 100);
    text("Fish Life" + " "+ fishHP, 40, 150);
    text("Trash Number" + " " + trashNum, 40, 200);
    curTime = millis();

    if (curTime - startTime >= 2500) {
        let mode = int(random(0, 2));
        if (!mode) {
            trashes.push(new Trash(mode));
        }
        else {
            let seed = int(random(1, 4));
            trashes.push(new Trash(seed));
        }
        startTime = curTime;
    }

    // rendering trashes
    for (var i = trashes.length - 1; i >= 0; i--) {
        trash = trashes[i];
        if (ship.fetching() && ship.get(trash)) {
            if (trash.type()) {
              getPoint.play();
              playerPoint += 10;
            }
            else {
              wrongTrash.play();
              playerPoint -= 15;
            }
            trash.beCollected(ship);
            ship.getBack();
        }
        if (trash.collected()) {
            trashes.splice(i, 1);
            continue;
        }
        trash.collide(trashes);
        trash.render();
        trash.update();
        trash.edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } 
        else {
            for (var j = trashes.length - 1; j >= 0; j--) {
                if (lasers[i].hits(trashes[j])) {
                    if (!trashes[j].type()) {
                        playerPoint += 10;
                        if (trashes[j].radius > 30) {
                            var newTrashs = trashes[j].breakup();
                            trashes = trashes.concat(newTrashs);
                        }
                    }
                    else {
                        playerPoint -= 15;
                    }
                    trashes.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    //-----------------
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock, trashes);
        boid.update();
        boid.show();
    } 
}



function keyReleased() {
    ship.setRotation(0);
    ship.boosting(0);
}

function keyPressed() {
    // press space for shoot
    if (keyCode == 32) {
       laser.play();
        lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == SHIFT) {
        ship.isFetching = true;
    } else if (keyCode == RIGHT_ARROW) {
        if (!ship.fetching()) 
            ship.setRotation(0.15);
    } else if (keyCode == LEFT_ARROW) {
        if (!ship.fetching()) 
            ship.setRotation(-0.15);
    } else if (keyCode == UP_ARROW) {
        ship.boosting(1);
    } else if (keyCode == DOWN_ARROW) {
        ship.boosting(2);
    }
  

}


function playing(){
  
   if(!bgm.isPlaying()){
      bgm.play();   
}}


/*references: https://www.condorferries.co.uk/plastic-in-the-ocean-statistics
https://www.futureagenda.org/foresights/plastic-oceans/#:~:text=There%20are%20increasing%20high%20levels,fish%20in%20the%20world's%20oceans.*/

let pieces = [];
//var condition = 9;
let swimmers = [];
let score = 0;
let facts = ["Each day, 8 million piece of plastic end \nup in our ocean system.", "Only 9% of the world's plastic actually \ngets recycled.", "76 trillion macro and microplastics \nare in our oceans.", "The ocean is being polluted with \napproximately 12.7 million tons of \nplastic every year.", "100% of infant sea turtles have some \nplastic in their stomach.", "88% of our ocean surfaces have \nplastic waste pollution", "It is anticipated that by 2050, the ocean \nwill contain more plastic than fish.", "Approximately 1 in every 3 fish caught \nfor humans to eat has plastic in it.", "It is estimated that plastic microbeads \nare 1 million times more toxic than \nregular seawater."]
var r;


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
  text(facts[r], 135, 355)
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

function game2() {
  createCanvas(400,400);
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

function mouseClicked() {
  
  if (condition == 1) {
       let d = dist(mouseX,mouseY,500,350);
       if (d < 100) {
         //choose();
         condition = 2;
       }}
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
