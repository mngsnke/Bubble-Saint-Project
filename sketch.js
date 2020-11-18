

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    
    frameRate(30);
    
    canvas.position(0, 0, 'fixed');
}

let xoff = 0.01;
let yoff = 0;
function draw() {
    background('white');
    
    noStroke();
    fill('rgb(243,238,232)');
    
    beginShape();
    for (var x = 0; x <= windowWidth; x+=1) {
        var nx = map(x, 0, windowWidth, 0, 0.2);
        var y = 100 * noise(nx + yoff) + 100;
        vertex(x,y);
    }
    yoff += 0.01;
    
    vertex(windowWidth, windowHeight);
    vertex(0, windowHeight);
    endShape(CLOSE);
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}