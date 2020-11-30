
//declare milktea
let milktea;
//factor
let yoff = 0;
//coefficient
let c = 300;
//side stroke offset
let strOff = 150;

let boba = [];


function setup() {
    //canvas size is same as window width and height.
    let canvas = createCanvas(windowWidth, windowHeight);
    
    canvas.style('z-index', '-1');
    
    //frame rate set to 30.
    frameRate(60);
    
    //canvas position lcoked
    canvas.position(0, 0, 'fixed');
    
    //milktea initialization
    milktea = new MilkTea(-100, 0, yoff, c, strOff);
    
    for(var i = 0; i < 100; i++) {
        boba[i] = new Boba(20, random(0, windowWidth), random(0, 100));
    }
    
}


function draw() {
    background('white');
    
    milktea.display();
    
    noStroke();
    fill('#3f1c00');
    
    
    for(var i = 0; i < boba.length - 1; i++) {
        let gravity = createVector(0, 0.1 * boba[i].mass);
        
        if(boba[i].position.y >= windowHeight - boba[i].mass) {
            boba[i].velocity.y *= 0;
            
        } else {
            boba[i].applyForce(gravity);
            boba[i].update();
        }
        
        boba[i].display();
        
    }
}

//Boba class with mass/size, x and y parameters.
//velocity and acceleration x y set to 0 by default
let Boba = function(m, x, y) {
    this.mass = m;
    this.position = createVector(x,y);
    this.velocity = createVector(0, 0);
    this.acc = createVector(0,0);
}

//apply velocity when falling.
Boba.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
}

Boba.prototype.checkCollision = function(other) {
    if((this.position.y) > (other.position.y)) {
        this.position.y = this.position.y - (this.position.y - other.position.y);
    }
}


/*
Boba.prototype.checkSubmerged = function() {
    if(this.position.y > )
}
*/
//display boba
Boba.prototype.display = function() {
    noStroke();
    fill('#3f1c00');
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
}

Boba.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acc);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acc.mult(0);
};

//MilkTea Class
let MilkTea = function(x, y, f, c, ss) {
    this.x = x;
    this.y = y;
    this.yOff = f;
    this.coefficient = c;
    this.strOff = ss;
}

//display MilkTea
MilkTea.prototype.display = function() {
    stroke('#ECE1B3');
    //strokeWeight is set to strOff to match sides and bottom
    strokeWeight(strOff);
    fill('#E2D18A');
    
    beginShape();
    //initial value for x is same as strOff to match where the tea starts on left side.
    for (var x = this.x; x <= windowWidth+this.strOff; x+=100) {
        var nx = map(x, 0, windowWidth, 0, 0.6);
        var y = 100 * noise(nx + this.yOff) + c;
        vertex(x,y);
    }
    this.yOff += 0.01;
    vertex(windowWidth+this.strOff, windowHeight+this.strOff);
    vertex(-this.strOff, windowHeight+this.strOff);
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}