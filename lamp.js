i = 0;
status = false;
objects = [];
percent = 0;
img = "";
function back() {
  window.location.href = "index.html";
}
function preload() {
  img = loadImage("lamp.jpg");
}

function setup() {
  canvas = createCanvas(400, 400);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status"). innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  objectDetector.detect(img, gotResult);
  status = true;
  document.getElementById("status"). innerHTML = "Status: Detected all objects";
}

function gotResult(error, results) {
  if(error) {
      console.log(error);
  }
  console.log(results);
  objects = results;
  document.getElementById("objects"). innerHTML = "Number of objects detected is " + objects.length;
}

function draw() {
  canvas.center();
  image(img, 0, 0, 400, 400);
  if (status = true) {
    for (i = 0; i < objects.length; i++) {
      stroke('red');
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
