/*
Code for the Void class.
Contains the constructor and all functions.
*/

class theVoid {
  
/*
The constructor function inside of a class creates the instance of the object
itself. You can think of it as a setup() function for the Ufo class only. It is 
where you will convert the passed in parameters into local varibles. 
*/
  
//Function to setup void class.
  constructor(xpos, ypos, speedx, speedy, size) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.xspeed = speedx;
    this.yspeed = speedy;
    this.size = size;
  }

/*  
After the constructor you can create your object level functions. In other words,
the functions you want to create the are specific to your object. 
*/

//Function to draw the void
  display() {
    stroke(0);
    fill(0);
    if (gameState == 'title') {
      // noStroke();
      // fill(255);
      image(whiteVoid, this.xpos, this.ypos, this.size, this.size);
    } else {
      //ellipseMode(CENTER);
      //ellipse(this.xpos, this.ypos, this.size);
      image(blackVoid, this.xpos, this.ypos, this.size, this.size);
    }
  }
    
  
//Function for collison check.
  hitCheck() {
    if (mouseX > (this.xpos)-(this.size/2) && mouseX < (this.xpos)+(this.size/2)) {
      if (mouseY > (this.ypos)-(this.size/2) && mouseY < (this.ypos)+(this.size/2)) {
        gameState = 'gameover';
      }
    }
  }
  
//Function to the void around the screen.
  move() {
    this.xpos = this.xpos + this.xspeed;
    //Reverse speed when UFO reaches the edge of the screen
    if (this.xpos > width+10 || this.xpos < -10) {
      this.xspeed = this.xspeed*-1;
      this.yspeed = this.yspeed + int(random(-2, 2));
    } 
    this.ypos = this.ypos + this.yspeed;
    //Reverse speed when UFO reaches the edge of the screen
    if (this.ypos > height+10 || this.ypos < -10) {
      this.yspeed = this.yspeed*-1;
      this.xspeed = this.xspeed + int(random(-2, 2));
    } 
  }
  
//Function to reset the position.
  reset() {
    this.xpos = width/2;
    this.ypos = height/2;
    this.xspeed = int(random(-10, 10));
    this.yspeed = int(random(-10, 10));
  }
} // end of void class 