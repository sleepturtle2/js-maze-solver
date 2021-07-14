var canvas;
var context;
var WIDTH = 1200;
var HEIGHT = 800;

var tileW = 20;
var tileH = 20;
var tileRowCount = 2;
var tileColumnCount = 40;

var tiles = [];
for ( c = 0; c < tileColumnCount; c++){
  tiles[c] = [];
  for (r = 0; r < tileRowCount; r++){
    tiles[c][r] = {x:c*(tileW+3), y:r*(tileH+3) ,state: 'e'} //e = empty
  }
}

tiles[0][0].state = 's'; //start
tiles[tileColumnCount-1][tileRowCount-1].state='f';

function rect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.closePath();
  context.fill();
}

function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  clear();
  context.fillStyle = '#FF0000';
  for (c = 0; c < tileColumnCount; c++)
    for (r = 0; r < tileRowCount; r++){
      rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH);
    }
}

function init() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  return setInterval(draw(), 10);
}

init();

