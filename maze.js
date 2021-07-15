var canvas;
var context;
var WIDTH = 1200;
var HEIGHT = 600;

var tileW = 20;
var tileH = 20;
var tileRowCount = 3;
var tileColumnCount = 5;
var end_x = tileColumnCount - 1; // x index of finish
var end_y = tileRowCount - 1; //y index of finish

var boundX = 0;
var boundY = 0;

var tiles = [];

function isSafe(x, y) {
  if (x >= 0 && x < tileColumnCount && y >= 0 && y < tileRowCount && (tiles[x][y].state != 'w'))
    return true;

  return false;
}

function print(a) {
  for (i = 0; i < a.length; i++)
    console.log(...a[i]);
}

function solveMazeUtil(x, y, sol) {
  if (x == end_x && y == end_y) {
    sol[x][y] = 1;
    return true;
  }

  if (isSafe(x, y) == true) {
    console.log(x, y);
    if (sol[x][y] == 1) return false;

    sol[x][y] = 1;

    if (solveMazeUtil(x + 1, y, sol) == true)
      return true;
    else if (solveMazeUtil(x - 1, y, sol) == true) return true;

    else if (solveMazeUtil(x, y - 1, sol) == true) return true;

    else if (solveMazeUtil(x, y + 1, sol) == true) return true;

    sol[x][y] = 0;
    return false;
  }
  return false;
}

function backtrack(sol) {
  x = end_x; y = end_y;
  //tiles[x][y].state = 'x';

  sol[x][y] = 0;

  while (x != 0 && y != 0) {
    //check up
    if (isSafe(x - 1, y) && sol[x - 1][y] == 1) {
      sol[x - 1][y] = 0;
      x = x - 1;

    }
    //check down
    else if (isSafe(x + 1, y) && sol[x + 1][y] == 1) {
      sol[x + 1][y] = 0;
      x = x + 1;

    }
    //check right
    else if (isSafe(x, y + 1) && sol[x][y + 1] == 1) {
      sol[x][y + 1] = 0;
      y = y + 1;

    }
    else if (isSafe(x, y - 1) && sol[x][y - 1] == 1) {
      sol[x][y - 1] = 0;
      y = y - 1;

    }
    tiles[x][y].state = 'x';
  }
}

function solveMaze() {
  //console.log(tiles.length, tiles[0].length);

  let sol = new Array(tiles.length);

  //create solution maze
  for (i = 0; i < sol.length; i++)
    sol[i] = new Array(tiles[0].length);
  for (i = 0; i < sol.length; i++)
    for (j = 0; j < sol[0].length; j++)
      sol[i][j] = 0;
   //console.log(sol.length, sol[0].length);

  if (solveMazeUtil(0, 0, sol) == false)
    console.log("no output");
  else {
    print(sol);
    backtrack(sol);
  }

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
  else if (state == 'x') {
    context.fillStyle = '#000000';
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
