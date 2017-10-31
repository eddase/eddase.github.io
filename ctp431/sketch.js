//setting variables
var drops = [];
var y=0;
var w=0;
var z=0;
var q=0;
var v=0;
var vol=0.5;
var gravity=2;
var rgb=[[255,0,0],[255,255,0],[0,0,255],[0,255,0],[255,0,255]];
function preload() {
  //load first sound file
  Sound = loadSound('look.mp3');
}

function setup() {
	fft= new p5.FFT();
 	var canvas = createCanvas(windowWidth,windowHeight);
  Sound.setVolume(0.5);
  frameRate(30);
  canvas.drop(gotFile);
}

//function for making raindrops
function rain(a,b){
	while (a>300){
     	drops.push(new raindrop(b));
      a=a-300
	}
  return a
}

//pause and stop
function mousePressed() {
  if (!Sound.isPlaying() ) {
    Sound.play();
  } 
  else {
    Sound.pause();
  }
}

//restart and load musics
//function keyTyped() {
  //if (key==="s"){
   // Sound.stop();
 // }
  //if (key==="1"){
  //  Sound.stop();
  //  Sound = loadSound('nomore.mp3')
 // }
//  if (key==="2"){
 //   Sound.stop();
 //   Sound = loadSound('look.mp3')
 // }      
 // return false;
//}

//Volume control with wheel
function mouseWheel(i) {
  if (vol<=1 && i.delta<0){
    vol=vol-0.03*i.delta
  }else if(vol>1 && i.delta<0){
    vol=1
  }else if(vol>=0 && i.delta>0){
    vol=vol-0.03*i.delta
  }else if(vol<0 && i.delta<0){
    vol=0
  }
  if (vol<0.1){
    Sound.setVolume(0);
  }else{
    Sound.setVolume(vol)
  }

}

function gotFile(music){
  Sound.stop();
  Sound=loadSound(music);
}  

//making raindrop object
function raindrop(i) {
  		this.x = random(width);
  		this.y = -10;
  		this.w = 12;
  		this.h = 65;
  		this.speed = 20;
      this.color =rgb[i]

      //draw drops
  		this.show = function(i) {
      			fill(this.color);
            noStroke();
      			rect(this.x, this.y, this.w, this.h);
  		};

      //move downward
  		this.fall = function() {
    		this.y = this.y + this.speed;
    		this.speed = this.speed + gravity;
  		};
}

function draw(){
  background(220);
	
//loading
  if(!Sound.isLoaded()){
    text("now loading music. please wait",width/2,height/3)
	}
//fft parameters
 	var spec= fft.analyze();
 	var lowest=Math.exp(fft.getEnergy("bass")/50);
 	var low=fft.getEnergy("lowMid");
 	var mid=fft.getEnergy("mid");
 	var high=fft.getEnergy("highMid");
 	var highest=fft.getEnergy("treble");

//add up
 	y=y+lowest;
  w=w+low;
  z=z+mid;
  v=v+high;
  q=q+highest;

//make raindrops 	
  y=rain(y,0);
  w=rain(w,1);
  z=rain(z,2);
  v=rain(v,3);
  q=rain(v,4);
    
//show them all and drop 
  for (var i = 0; i < drops.length; i++ ) {
    drops[i].show();
    drops[i].fall();
    //eliminate old ones
    if (drops[i].y>height){
      drops.splice(i,1)
    }
  }
  //volume
  noFill();
  rect(width/15,height/15,100,15)
  noStroke();
  fill(0,0,0);
  if (vol<=1 && vol>=0){
    rect(width/15,height/15,100*vol,15);
  }else if(vol>1){
    rect(width/15,height/15,100,15) 
  }
  if (!Sound.isPlaying()){
    textSize(50)
    textAlign(CENTER)
    text("Click mouse to start",width/2,height/2)
  }

}