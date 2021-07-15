var canvas;
var context;
const WIDTH = 1200;
const HEIGHT = 600;

var tileW = 20;
var tileH = 20;
var tileRowCount = 3;
var tileColumnCount = 5;
var tiles;
//BUILD WALL FUNCTIONS

function Move(event) {

  x = event.pageX - canvas.offsetLeft;
  y = event.pageY - canvas.offsetTop;
  console.log(x, y);
  for (r = 0; r < tileRowCount; r++)
    for (c = 0; c < tileColumnCount; c++){
      //if x and y is in range of a particular cell
      if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
        console.log(r, c);
        if (tiles[r][c].state == 'e'&& (r!=boundX || c != boundY)) {
          tiles[r][c].state = 'w'; //wall
          boundX = r;
          boundY = c;
        }

        else if (tiles[r][c].state == 'w' && (r!=boundX || c != boundY)) {
          tiles[r][c].state = 'e';
          boundX = r;
          boundY = c;
        }
      }
    }
}

function Down(event) {
  canvas.onmousemove = Move;
  x = event.pageX - canvas.offsetLeft;
  y = event.pageY - canvas.offsetTop;

  //console.log(x, y);

  for (r = 0; r < tileRowCount; r++)
    for (c = 0; c < tileColumnCount; c++){
      //if x and y is in range of a particular cell
      if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
        console.log(r, c);

        if (tiles[r][c].state == 'e' ) {
          tiles[r][c].state = 'w'; //wall
          boundX = r;
          boundY = c;
        }

        else if (tiles[r][c].state == 'w') {
          tiles[r][c].state = 'e';
          boundX = r;
          boundY = c;
        }
      }
    }
}

function Up() {
  canvas.onmousemove = null;
}
// INIT FUNCTIONS
function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

function reset() {
  tiles = new Array(tileRowCount);
  for (i = 0; i < tiles.length; i++)
    tiles[i] = new Array(tileColumnCount);

  for (r = 0; r < tileRowCount; r++)
    for (c = 0; c < tileColumnCount; c++)
    {
      tiles[r][c] = { x: c * (tileW + 3), y: r * (tileH + 3), state: 'e' };
      console.log(tiles[r][c]);
    }


  tiles[0][0].state = 's';
  tiles[tileRowCount - 1][tileColumnCount - 1].state = 'f';
  return tiles;
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
  else if (state == 'x') {
    context.fillStyle = '#000000';
  }
  context.beginPath();
  context.rect(x, y, w, h);
  context.closePath();
  context.fill();
}

function draw() {
  clear();

  for (r = 0; r < tileRowCount; r++)
    for (c = 0; c < tileColumnCount; c++)
      rect(tiles[r][c].x, tiles[r][c].y, tileW, tileH, tiles[r][c].state);
}

function init() {
  tiles = reset();
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');
  return setInterval(draw, 10);
}

init();
canvas.onmousedown = Down;
canvas.onmouseup = Up;
