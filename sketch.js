let gameState = 'title';
let canvas;
let voidSize = 40;
let voidSpeedX;
let voidSpeedY;
let voidX;
let voidY;
let voids = [];
let spawnInt = 600;
let spawnTime = 0;
let score = 0;
let scoreInt = 60;
let scoreTime = 0;
let titleRot = 0;
let titleInt = 200;
let titleTime = 0;
let titleRot2 = 0;
let tR2speed = 1;
let gameBgc;
let lvlInt = 1;

//Preload font and images
function preload() {
  myFont = loadFont('assets/PressStart2P-Regular.ttf');
  whiteVoid = loadImage('assets/wbs2.png');
  blackVoid = loadImage('assets/bbs2.png');
  centerVoid = loadImage('assets/bbs3.png');
  cursorImg = loadImage('assets/gbs2.png');
}

//Setup
function setup() {
  //Establish canvas and general settings.
  canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  frameRate(60);
  noCursor();
  angleMode(DEGREES);
  gameBgc = color(100, 240, 100);
  textFont(myFont);
  imageMode(CENTER);
  
  //Define void variables and create initial void object.
  voidX = width/2;
  voidY = height/2;
  voidSpeedX = int(random(-10, 10));
  voidSpeedY = int(random(-10, 10));
  voids.push(new theVoid(voidX, voidY, voidSpeedX, voidSpeedY, voidSize));
}

//The draw loop, content is drawn depending on the current value of gameState
function draw() {
  switch (gameState) {
    case 'title':
      titleScreen();
      break;
    case 'exp':
      expScreen();
      break;
    case 'lvl1':
      gameStage1();
      break;
    case 'gameover':
      gameOver();
      break;
  }
}

//Key release listener for moving between screens
function keyReleased() {
  if (keyCode === ENTER) {
    if (gameState === 'exp' || gameState === 'gameover') {
      gameState = 'lvl1';
      gameRefresh();
      voids.splice(1);
      voids[0].reset();
    } else if (gameState === 'title') {
      gameState = 'exp';
    }
  }
}

//Render the title screen
function titleScreen() {
  //background and text display
  background(0, 0, 0);
  stroke(255);
  fill(255);
  textSize(45);
  textAlign(CENTER);
  push();
  translate(width*0.5, height*0.33);
  rotate(titleRot);
  text('The Void', 0, 0);
  pop();
  textSize(20);
  text('Press ENTER', width*0.5, height*0.8);
  ellipseMode(CENTER);
  image(cursorImg, mouseX, mouseY);
  
  titleRot++;
  
  //add a void
  if (frameCount > titleTime) {
    voids.push(new theVoid(voidX, voidY, voidSpeedX, voidSpeedY, voidSize));
    titleTime = frameCount + titleInt;
  }
  
  //limit voids to 50
  if(voids.length > 50) {
    voids.splice(1);
    voids[0].reset();
  }
  
  //display and move voids
  for (let i = 0; i < voids.length; i++) {
    voids[i].display();
    //Move void
    voids[i].move();  
    }
}

//Render explainer screen
function expScreen() {
  background(0, 0, 0);
  stroke(255);
  fill(255);
  textSize(15);
  textAlign(CENTER);
  text('Goal:', width*0.5, height*0.1);
  textSize(12);
  text('Avoid the voids to get the high score!', width*0.5, height*0.2);
  textSize(15);
  text('Controls:', width*0.5 , height*0.3);
  textSize(12);
  text('Control the grey circle with your mouse.', width*0.5, height*0.4);
  textSize(15);
  text('Lose Conditions:', width*0.5, height*0.5);
  textAlign(LEFT);
  textSize(12);
  text('1. Moving the cursor out of the window.', width*0.1, height*0.6);
  text('2. Making contact with the moving voids.', width*0.1, height*0.65);
  text('3. Making contact with the center void.', width*0.1, height*0.7);
  textAlign(CENTER);
  textSize(20);
  text('Press ENTER to Start', width*0.5, height*0.9);
  image(cursorImg, mouseX, mouseY);
}

//Render the main game play screen
function gameStage1() {
  
  //function drawing game stage background
  gameBg()
  
  //pointer
  image(cursorImg, mouseX, mouseY);
  
  //check for out of bounds
  if (mouseX > (width/2)-(voidSize) && mouseX < (width/2)+(voidSize)) {
      if (mouseY > (height/2)-(voidSize) && mouseY < (height/2)+(voidSize)) {
        gameState = 'gameover';
      }
    }
  
  //spawn new voids
  if (frameCount > spawnTime) {
    voids.push(new theVoid(voidX, voidY, voidSpeedX, voidSpeedY, voidSize));
    spawnTime = frameCount + (spawnInt/lvlInt);
  }
  
  //control voids
  for (let i = 0; i < voids.length; i++) {
    //Display
    voids[i].display();
    //Check for collison
    voids[i].hitCheck();
    //Move
    voids[i].move();  
    }
  
  //check for out of bounds.
  if (mouseX > (width)+10 || mouseX < -10 || mouseY > (height)+10 || mouseY < -10) {
    gameState = 'gameover';
  }
  
  //add to score
  if (frameCount > scoreTime) {
    score = score + lvlInt;
    scoreTime = frameCount + scoreInt;
  }
  
  //change difficultly and score rate based on current score
  if (score > 25) {
    gameBgc = color(240, 240, 100);
    lvlInt = 2;
  } 
  if (score > 75) {
    gameBgc = color(240, 170, 50);
    lvlInt = 4;
  } 
  if (score > 150) {
    gameBgc = color(240, 0, 0);
    lvlInt = 8;
  }
}

//Render game over screen
function gameOver() {
  background(0, 0 ,0);
  stroke(255);
  fill(255);
  textSize(45);
  textAlign(CENTER);
  push();
  translate(width*0.5, height*0.33);
  rotate(titleRot2);
  text('GAME OVER', 0, 0);
  pop();
  textSize(20);
  text('Your Score: ' + score, width*0.5, height*0.6);
  text('Press ENTER To Restart', width*0.5, height*0.9);
  image(cursorImg, mouseX, mouseY);
  voids.splice(1);
  voids[0].reset();
  
  //animate "game over" text
  if (titleRot2 < -25 || titleRot2 > 25) {
    tR2speed = tR2speed*-1
  }
  titleRot2 = titleRot2 + tR2speed;
}

//Draw game stage background
function gameBg() {
  background(gameBgc);
  stroke(0);
  fill(0);
  textSize(25);
  textAlign(CENTER);
  text('Avoid the voids!', width*0.5, height*0.1);
  textSize(15);
  textAlign(LEFT);
  text('Score: ' + score, width*0.05, height*0.95);
  imageMode(CENTER);
  image(centerVoid, width/2,height/2, voidSize*2, voidSize*2);
}

//Reset score, color, and difficulty
function gameRefresh() {
  gameBgc = color(100, 240, 100);
  lvlInt = 1;
  score = 0;
}