var y=0;
var w=0;
var z=0;
var q=0;
var v=0;
var vol=0.5;

}
function preload() {
  //load first sound file
  Sound = loadSound('blackdog.mp3');
}

function setup() {
	fft= new p5.FFT();
 	var canvas = createCanvas(windowWidth,windowHeight);
  Sound.setVolume(0.5);
  frameRate(30);
  Sound.play();
}

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
function draw() {
	background(255)
  	var spec= fft.analyze();
 	A=fft.logAverages(fft.getOctaveBands(0.5,50))
 	B=fft.getOctaveBands(0.5,50)
 	text(A[0].toFixed(2),width/6,height/2,50,50);
 	text(A[1].toFixed(2),width/6*2,height/2,50,50);
 	text(A[2].toFixed(2),width/6*3,height/2,50,50);
 	text(A[3].toFixed(2),width/6*4,height/2,50,50);
 	text(A[4].toFixed(2),width/6*5,height/2,50,50);

 	var spec= fft.analyze();
 	var lowest=Math.exp(fft.getEnergy("bass")/50);
 	var low=fft.getEnergy("lowMid");
 	var mid=fft.getEnergy("mid");
 	var high=fft.getEnergy("highMid");
 	var highest=fft.getEnergy("treble");
 	text(lowest.toFixed(2),width/6,height/4,50,50);
 	text(low.toFixed(2),width/6*2,height/4,50,50);
 	text(mid.toFixed(2),width/6*3,height/4,50,50);
 	text(high.toFixed(2),width/6*4,height/4,50,50);
 	text(highest.toFixed(2),width/6*5,height/4,50,50);

if (Sound.isPlaying()){
    textSize(50)
    textAlign(CENTER)
    text(vol,width/2,height/2)
  }
}
