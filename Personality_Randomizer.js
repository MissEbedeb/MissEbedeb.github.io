let mbtiTable;

function preload(){
  mbtiTable = loadTable('MBTI.csv','csv');
}

function setup() {
  createCanvas(700, 500);
  background(180,200,255);
  // textSize(50);
  // let txt = '*Press any button to start!*';
  // let 
  // text(,70,100)
  txtDraw('Press any button to start!',60,height/2);
}

function draw() {
  
}

/*
V. Calc tritype (random(2,4), random(5,7), random(8,10) if 10 then 1)
V. Pick 1 number of tritype (random(1,3))
V. Calc wing (random(-1,1), if 0 then 'true type')
4. Pick random from list of mbti
5. Make a list of small bits of info on enneagram and mbti including links to more info
*/
function personalityDisplay(){
  background(180,200,255);
  let enneagram = ennCalc();
  let mbti = mbtiPick();
  console.log(enneagram,mbti);

  fill(0,0,150);
  txtDraw('MBTI',50,80);
  txtDraw('Enneagram',40,280);
  txtDraw('tritype',25,415);

  fill(0);
  txtDraw(mbti,80,190);

  if(enneagram.wing == 'True'){
    txtDraw(enneagram.wing+' '+enneagram.core,70,360);
  } else {
    txtDraw(enneagram.core+'w'+enneagram.wing,70,360);
  }
  
  txtDraw(enneagram.one+'-'+enneagram.two+'-'+enneagram.three,40,460);
}

function txtDraw(txt_,tS,txtH){
  textSize(tS);
  txt = txt_;
  txtW = (width/2)- (textWidth(txt)/2)
  text(txt,txtW,txtH);
}

//---------MBTI---------//
function mbtiPick(){
  let pick = int(random(0,16));
  return mbti = mbtiTable.get(pick,0);
}
//---------ENNEAGRAM---------//
function ennCalc(){ //calcs enneagram
  let triType = tritypeCalc();

  let coreWing = cWCalc(triType);

  return enn = {
    one: triType.one,
    two: triType.two,
    three: triType.three,
    core: coreWing.core,
    wing: coreWing.wing
  }
}

function tritypeCalc(){
  let tempGut = random(8,11);
  if(tempGut >= 10){
    tempGut = 1
  }

  let heart= int(random(2,5));
  let head= int(random(5,8));
  let gut= int(tempGut);

  let tempTri = [heart,head,gut];
  randomize(tempTri);
  console.log(tempTri);
  
  return tri = {
    one: tempTri[0],
    two: tempTri[1],
    three: tempTri[2]
  }
}

function randomize(tempTri_){
  let index = tempTri_.length, randomIndex;

  while (index != 0){
    randomIndex = floor(random()*index);
    index--;

    [tempTri_[index], tempTri_[randomIndex]] = [
      tempTri_[randomIndex], tempTri_[index]];
  }
  
  return tempTri_;
}

function cWCalc(triType_){
  let coreCalc;
  switch (int(random(0,3))){
    case 0:
      coreCalc = triType_.one;
      break;
    
    case 1:
      coreCalc = triType_.two;
      break;
    
    case 2:
      coreCalc = triType_.three;
      break;
  }

  let wingCalc = random(20);

  if(wingCalc<=8){
    wingCalc = coreCalc-1;
    if(wingCalc == 0){
      wingCalc = 9;
    }
  } else if(wingCalc>8 && wingCalc<=16){
    wingCalc = coreCalc+1;
    if(wingCalc == 10){
      wingCalc = 1;
    }
  } else if(wingCalc>16){
    wingCalc = 'True';
  }

  return cW = {
    core: coreCalc,
    wing: wingCalc
  }
}


function keyPressed(){
    personalityDisplay();
}