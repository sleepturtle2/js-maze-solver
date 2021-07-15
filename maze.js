var canvas;
var context;
var WIDTH = 1200;
var HEIGHT = 800;

var tileW = 20;
var tileH = 20;
var tileRowCount = 3;
var tileColumnCount = 5;

var boundX = 0;
var boundY = 0;

var tiles = [];

function solveMaze() {

}


function reset() {
  for ( c = 0; c < tileColumnCount; c++){
  tiles[c] = [];
  for (r = 0; r < tileRowCount; r++){
    tiles[c][r] = {x:c*(tileW+3), y:r*(tileH+3) ,state: 'e'} //e = empty
  }
}

tiles[0][0].state = 's'; //start
tiles[tileColumnCount-1][tileRowCount-1].state='f';

  output.innerHtml = '';
}

function rect(x, y, w, h, state) {
  if (state == 's') {
    context.fillStyle = '#00FF00';
  }
  else if (state == 'f') {
    context.fillStyle = '#FF0000'
  }
  else if (state == 'w') {
    context.fillStyle = '#0000FF';
  }
  else if (state == 'e') {
    context.fillStyle = '#AAAAAA';
    }


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

  for (c = 0; c < tileColumnCount; c++)
    for (r = 0; r < tileRowCount; r++){
      rect(tiles[c][r].x, tiles[c][r].y, tileW, tileH, tiles[c][r].state);
    }
}

function init() {
  output = document.getElementById('outcome');
  reset();
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  //draw();

  return setInterval(draw, 10);
}

function myMove(event) {
  x = event.pageX - canvas.offsetLeft;
  y = event.pageY - canvas.offsetTop;
  console.log(x, y);
  for (c = 0; c < tileColumnCount; c++)
    for (r = 0; r < tileRowCount; r++){
      //if x and y is in range of a particular cell
      if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
        if (tiles[c][r].state == 'e'&& (c!=boundX || r != boundY)) {
          tiles[c][r].state = 'w'; //wall
          boundX = c;
          boundY = r;
        }

        else if (tiles[c][r].state == 'w' && (c!=boundX || r != boundY)) {
          tiles[c][r].state = 'e';
          boundX = c;
          boundY = r;
        }
      }
    }
}

function myDown(event) {
  canvas.onmousemove = myMove;
  x = event.pageX - canvas.offsetLeft;
  y = event.pageY - canvas.offsetTop;
  console.log(x, y);
  for (c = 0; c < tileColumnCount; c++)
    for (r = 0; r < tileRowCount; r++){
      //if x and y is in range of a particular cell
      if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
        if (tiles[c][r].state == 'e' ) {
          tiles[c][r].state = 'w'; //wall
          boundX = c;
          boundY = r;
        }

        else if (tiles[c][r].state == 'w') {
          tiles[c][r].state = 'e';
          boundX = c;
          boundY = r;
        }
      }
    }
}

function myUp() {
  canvas.onmousemove = null;
}

init();

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
