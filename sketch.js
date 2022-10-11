//
let triWidth = 100;
let triHeight = 200;
let offsetW = 5;
let offsetH = 3;

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  background(255);
  drawNacho(width/2,200)
  triWidth = mouseX;
  offsetH = map(mouseX,0,100,-50,0);
}

function drawNacho(x, y) {
  let fold = 15;
  
  push();
  strokeWeight(3);
  translate(x, y);
  //black
  fill(0);
  //triangle(0, 0, -triWidth, triHeight, triWidth, triHeight);
  //red
  fill(100, 150, 100);
  triangle(
    -1, offsetW, -1, triHeight -fold,-triWidth + offsetW,triHeight - offsetH);
  //yellow
  fill(200, 230, 0);
  triangle(1, offsetW, 1, triHeight - fold, triWidth - offsetW, triHeight - offsetH);
  pop();
}
