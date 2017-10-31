function preload() {
  // set the global sound formats
  soundFormats('mp3', 'ogg','wav');

  // load either beatbox.mp3, or .ogg, depending on browser
  mySound = loadSound('snare.wav');
}

function setup() {
  mySound.play();
}