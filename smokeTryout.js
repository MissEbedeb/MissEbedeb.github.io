/*
Steps:
1. draw circle
2. let circle move slightly
3. turn circle into class
4. make object array
5. place circles by moving mouse
6. replace circles with stripes
*/
let bubble = [];
let bubAmount = 150;

let pmx = []; //add together?
let pmy = [];

let start = false;


let bgCol0;
let bgCol1;
let bgCol2;
let hue1 = 170;
let hue2 = 220;

let c;

let song;

function preload(){
    soundFormats('mp3','ogg');
    song = loadSound('bathTime'); 
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    //noCursor();
    colorMode(HSB,360,100,100,255);
    bgCol0 = 100;
    bgCol1 = color(200, 30, 80); //top
    bgCol2 = color(170, 10, 100); //bottom

    let catImg = loadImage('imgs/cat.jpeg');
    let catFlichImg = loadImage('imgs/catFlinch.jpeg');
    let clickImg = loadImage('imgs/CLICKTOSTART.jpg');

    c = new Cat(catImg,catFlichImg,clickImg);
}

function draw(){
    bg(bgCol0,bgCol1,bgCol2);

    c.displayCat();

    for(var i = 0; i<bubble.length; i++){
        bubble[i].move();
        bubble[i].overlap(pmx[i],pmy[i]);
        bubble[i].display(colorPick(hue1,hue2));
    }

    if(start){   
        if(!song.isPlaying()){
            song.play();
        }
    }
} 

//--------FUNCTIONS--------//
function mousePressed(){
    getAudioContext().resume();
}

function mouseMoved(){
    if(start){
        let size = random(10,120);
        let col = colorPick(hue1,hue2);
        pmx.push(pmouseX);
        pmy.push(pmouseY);
        let b = new Bubble(mouseX,mouseY,size,col);
        bubble.push(b);

        if(bubble.length>bubAmount){
            bubble.splice(0,1);
            pmx.splice(0,1);
            pmy.splice(0,1);
        }
    }
}

function mousePressed(){
    if(!start){
        start = true;
    }
}

function colorPick(hue1_,hue2_){
    this.hue1 = hue1_;
    this.hue2 = hue2_;
    let col = {
        hue: constrain(map(movedX, -50,50,this.hue1,this.hue2),0,360),
        sat: random(5,50),
        bright: 100,
        alpha: 30
    }
    //console.log(col);
    return col;
}

function bg(col0_,col1_,col2_){
     let cSize = 50;
     let w = width;
     let h = height;
     this.col0 = col0_;
     this.col1 = col1_;
     this.col2 = col2_;

     background(this.col0);
     for(var j=0; j<h+cSize; j+=cSize/2){
        if(j%(cSize)==0){
            initw=-cSize/2;
        } else {
            initw=0;
        }

        let gradient = lerpColor(this.col1,this.col2,map(j,0,height,0,1)); 
        
        for(var k=initw; k<w+cSize; k+=30){
            stroke(360);
            noStroke();
            fill(gradient);
            circle(k,j,cSize);
        }
    }
}

//---------CLASS---------//

class Bubble{
    constructor(x_,y_,size_,col_){
        this.x = x_;
        this.y = y_;
        this. size = size_;
        this.col = col_;
    }

    display(){
        // stroke(255);
        // strokeWeight(3);
        // noFill();
        noStroke();
        circle(this.x,this.y,this.size);
    }

    move(){
        this.x += random(-5,5);
        this.y += random(-5,5);
    }

    //How to take pM out of this to easy switch between mouseX/y and pX/Y?
    overlap(mX,mY){
        if(dist(this.x,this.y,mX,mY)<this.size/2){
            let highlight = this.col.alpha*3;//map(this.col.Alpha, 0,100,50,100);
            fill(this.col.hue,this.col.sat,this.col.bright,highlight);
        } else{
            fill(this.col.hue,this.col.sat,this.col.bright,this.col.alpha);
        }
    }
}

class Cat{
    constructor(cat_,catF_,clickImg_){
        this.cat = cat_;
        this.catF = catF_;
        this.clickImg = clickImg_;
    }

    displayCat(){
        let scale =3;
        let cath = this.cat.height/scale;
        let catw = this.cat.width/scale;
        let catX = width/2-catw/2;
        let catY = height- (cath+(cath/10));

        image(this.overlapCat(catw,cath,catX,catY),catX,catY,catw,cath);
    }
    
    overlapCat(catw_,cath_,x_,y_){
        if(start){
           if(mouseX<x_ || mouseX>x_+catw_ || mouseY<y_ ||mouseY>y_+cath_){
            return this.cat;
        } else{
            return this.catF;
        }
        } else{
            return this.clickImg;
        }
    }
}