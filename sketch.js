
//declare milktea
let milktea;
//factor
let yoff = 0;
//coefficient
let c = 150;
//side stroke offset
let strOff = 150;


function setup() {
    //canvas size is same as window width and height.
    let canvas = createCanvas(windowWidth, windowHeight);
    
    //frame rate set to 30.
    frameRate(30);
    
    //canvas position lcoked
    canvas.position(0, 0, 'fixed');
    
    //milktea initialization
    milktea = new MilkTea(-100, 0, yoff, c, strOff);
}


function draw() {
    background('white');
    
    milktea.display();
    
    noStroke();
    fill('#3f1c00');
    ellipse(400, 500, 40, 40);
    
    let mover = new Boba(3, 40, 40);
    
    mover.display();
    
}

//Boba class with mass/size, x and y parameters.
//velocity and acceleration x y set to 0 by default
let Boba = function(m, x, y) {
    this.mass = m;
    this.position = createVector(x,y);
    this.velocity = createVector(0, 0);
    this.acc = createVector(0,0);
    this.velocity
}

Boba.prototype.display = function() {
    noStroke();
    fill('#3f1c00');
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
}

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
    for (var x = this.x; x <= windowWidth+this.strOff; x+=1) {
        var nx = map(x, 0, windowWidth, 0, 0.2);
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