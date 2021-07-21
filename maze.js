var canvas;
var context;
var output = document.getElementById("outcome");
const WIDTH = 1200;
const HEIGHT = 600;

var tileW = 20;
var tileH = 20;
var tileRowCount = 21;
var tileColumnCount = 35;
var tiles;

var boundX = 0;
var boundY = 0;

var end_x = tileRowCount - 1;
var end_y = tileColumnCount - 1;

var steps = 0;


//PATH FINDING SOLUTION

//------UTILITY FUNCTIONS-----//

function isSafe(x, y) {
    if (x >= 0 && x < tileRowCount && y >= 0 && y < tileColumnCount && (tiles[x][y].state != 'w'))
        return true;

    return false;
}
//----------------------------//
//---------------BFS---------------//

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Node(pt, parent, dist) {
    this.pt = pt;
    this.parent = parent;
    this.dist = dist;
}

var d = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
];


function isValid(R, C, row, col) {
    return (row >= 0) && (row < R) && (col >= 0) && (col < C) && tiles[row][col].state != 'w' && tiles[row][col].state != 's'; //&& !visited[row][col];
}

function backtrack(sol, src, dest) {
    // console.log("sol array")
    // for (var i = 0; i < sol.length; i++) {
    //     var str = "";

    //     for (var j = 0; j < sol[0].length; j++)
    //         str += sol[i][j].parent.x + "," + sol[i][j].parent.y + "  ";

    //     console.log(str);
    // }
    console.log("function to backtrack");

    let x = dest.x;
    let y = dest.y;

    while ((x != src.x || y != src.y)) {
        //console.log(x, y);
        steps++;
        tiles[x][y].state = 'x';
        x = sol[x][y].parent.x;
        y = sol[x][y].parent.y;
    }
    output.innerHtml = `Solved in ${steps} steps`;
    //console.log(x, y);
}

function bfs() {
    output.innerHtml = "Solving...";
    let pathFound = false;
    var src = new Point(0, 0);
    var dest = new Point(tileRowCount - 1, tileColumnCount - 1);
    let queue = [];


    let r = tileRowCount;
    let c = tileColumnCount;
    let sol = new Array(r);

    for (let i = 0; i < r; i++) {
        sol[i] = new Array(c);
        for (let j = 0; j < c; j++) {
            let pt = new Point(i, j);
            let parent = new Point(-1, -1);
            let node = new Node(pt, parent, -1);
            sol[i][j] = node;
        }
    }

    let discovery = [];

    let s = new Node(new Point(src.x, src.y), new Point(-1, -1), -1);

    queue.push(s);

    while (queue.length > 0) {
        let curr = queue.pop();
        //console.log(curr);
        tiles[curr.pt.x][curr.pt.y].state = 'v';
        if (curr.pt.x == dest.x && curr.pt.y == dest.y)
            pathFound = true;

        for (let i = 0; i < 4; i++) {
            let row = curr.pt.x + d[i].x;
            let col = curr.pt.y + d[i].y;

            if (isValid(r, c, row, col)) {
                if (sol[row][col].dist == -1 || sol[row][col].dist > sol[curr.pt.x][curr.pt.y].dist + 1) {
                    sol[row][col].dist = sol[curr.pt.x][curr.pt.y].dist + 1;
                    sol[row][col].parent.x = curr.pt.x;
                    sol[row][col].parent.y = curr.pt.y;

                    queue.push(sol[row][col]);
                }
            }
        }

    }
    tiles[0][0].state = 's';
    tiles[tileRowCount - 1][tileColumnCount - 1].state = 'f';
    // console.log(discovery);

    // var highlight = setInterval(() => {
    //     if (discovery.length > 0) {
    //         {
    //             let node = discovery.pop();
    //             tiles[node.x][node.y].state = 'v';

    //         }
    //     } else {
    //         clearInterval(highlight);

    //     }

    // }, 10);
    if (pathFound)
        backtrack(sol, src, dest);
    else {
        output.innerHtml = "No Solution Possible";
        console.log("no path found");
    }

}
//----------------------------------//

//----------------------------------------------------

//BUILD WALL FUNCTIONS

function Move(event) {

    x = event.pageX - canvas.offsetLeft;
    y = event.pageY - canvas.offsetTop;
    //console.log(x, y);
    for (r = 0; r < tileRowCount; r++)
        for (c = 0; c < tileColumnCount; c++) {
            //if x and y is in range of a particular cell
            if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
                console.log(r, c);
                if (tiles[r][c].state == 'e' && (r != boundX || c != boundY)) {
                    tiles[r][c].state = 'w'; //wall
                    boundX = r;
                    boundY = c;
                } else if (tiles[r][c].state == 'w' && (r != boundX || c != boundY)) {
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
        for (c = 0; c < tileColumnCount; c++) {
            //if x and y is in range of a particular cell
            if (c * (tileW + 3) < x && x < c * (tileW + 3) + tileW && r * (tileH + 3) < y && y < r * (tileH + 3) + tileH) {
                console.log(r, c);

                if (tiles[r][c].state == 'e') {
                    tiles[r][c].state = 'w'; //wall
                    boundX = r;
                    boundY = c;
                } else if (tiles[r][c].state == 'w') {
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
        for (c = 0; c < tileColumnCount; c++) {
            tiles[r][c] = { x: c * (tileW + 3), y: r * (tileH + 3), state: 'e' };
            //console.log(tiles[r][c]);
        }


    tiles[0][0].state = 's'; //start
    tiles[tileRowCount - 1][tileColumnCount - 1].state = 'f'; //finsih
    output.innerHTML = "";

    return tiles;
}

function rect(x, y, w, h, state) {
    if (state == 's') {
        context.fillStyle = '#00FF00';
    } else if (state == 'f') {
        context.fillStyle = '#FF0000'
    } else if (state == 'w') {
        context.fillStyle = '#0000FF';
    } else if (state == 'e') {
        context.fillStyle = '#AAAAAA';
    } else if (state == 'x') {
        context.fillStyle = '#000000';
    } else if (state == 'v') {
        context.fillStyle = '#ADD8E6';
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
    return setInterval(draw, 0);
}

init();
canvas.onmousedown = Down;
canvas.onmouseup = Up;