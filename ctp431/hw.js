//setting variables
var drops = [];
var energy= [];
var added=[0,0,0,0,0];
var vol=0.5;
var gravity=2;
var rgb=[[255,0,0],[255,255,0],[0,0,255],[0,255,0],[255,0,255]];
function preload() {
  //load first sound file
  soundFormats('mp3', 'ogg');
  Sound = loadSound('blackdog.mp3');
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
  if(mouseX>50){
    if (!Sound.isPlaying() ) {
      Sound.play();
  } 
    else {
      Sound.pause();
  }
  }else{
    Sound.jump(mouseY/height*Sound.duration())
  }
}

//restart and load musics from server
function keyPressed() {
  if (keyCode===ESCAPE){
    Sound.stop();
  }else if (keyCode===BACKSPACE){
    Sound.jump();
  }else if (keyCode===LEFT_ARROW){
    Sound.jump(Sound.currentTime()-10);
  }else if (keyCode===RIGHT_ARROW){
    Sound.jump(Sound.currentTime()+10);
  } else if (key==="1"){
    Sound.stop();
    Sound = loadSound('blackdog.mp3')
  }else if (key==="2"){
    Sound.stop();
    Sound = loadSound('look.mp3')
  }else if (key==="3"){
    Sound.stop();
    Sound = loadSound('nomore.mp3')
  }      
  return false;
}
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
//music from local file
function gotFile(music){
  Sound.stop();
  Sound=loadSound(music);
}  

//making raindrop object
function raindrop(i) {
  		this.x = random(width);
  		this.y = -100;
  		this.w = 12;
  		this.h = 65;
  		this.speed = 20;
      this.color =rgb[i]
      //this.color=[0,50*i,200]
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
  //energy=[fft.getEnergy("bass"),fft.getEnergy("lowMid"),fft.getEnergy("mid"),fft.getEnergy("highMid"),fft.getEnergy("treble")]
  energy=fft.logAverages(fft.getOctaveBands(0.5,50))
for (var i=0; i < 10; i++){
  added[i]=added[i]+Math.pow(10,energy[i]/100)-1;
}
//make raindrops 
for (var i=0; i < 10; i++){
  added[i]=rain(added[i],i);
}
  
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
  rect(width/15,height/15,100,15);
  noStroke();
  fill(0);
  if (vol<=1 && vol>=0){
    rect(width/15,height/15,100*vol,15);
  }else if(vol>1){
    rect(width/15,height/15,100,15) 
  //current time
  }
  noStroke();
  fill(255)
  rect(0,0,20,height)
  fill(0);
  rect(0,0,20,Sound.currentTime()*height/Sound.duration())
  
  if (!Sound.isPlaying()&&Sound.isLoaded()){
    textSize(50)
    textAlign(CENTER)
    text("Click mouse to start",width/2,height/2)
  }
}