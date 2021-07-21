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


// //----------NAIVE------------------//


// function print(a) {
//     var str;
//     for (i = 0; i < a.length; i++) {
//         for (j = 0; j < a[0].length; j++)
//             str += a[i][j].state + " ";
//         console.log(str);
//         str = "";
//     }
// }

// function solveMazeUtil(x, y, sol) {
//     if (x == end_x && y == end_y && tiles[x][y].state == 'f') {
//         sol[x][y] = 1;
//         steps++;
//         return true;
//     }

//     if (isSafe(x, y) === true) {

//         // Check if the current block is already part of solution path.
//         if (sol[x][y] === 1) return false;
//         console.log(x, y);
//         // mark x, y as part of solution path
//         sol[x][y] = 1;
//         if (tiles[x][y].state != 's')
//             tiles[x][y].state = 'x';
//         steps++;

//         //right
//         if (solveMazeUtil(x, y + 1, sol) === true) return true;
//         //down
//         else if (solveMazeUtil(x + 1, y, sol) === true) return true;
//         //left
//         else if (solveMazeUtil(x - 1, y, sol) === true) return true;
//         //up
//         else if (solveMazeUtil(x, y - 1, sol) === true) return true;


//         sol[x][y] = 0; //if all cases are false, this cell cannot be part of path
//         tiles[x][y].state = 'e';
//         steps--;
//         return false;
//     }
//     return false;
// }

// function solveMaze() {
//     let sol = new Array(tiles.length);

//     //create solution maze
//     for (i = 0; i < sol.length; i++)
//         sol[i] = new Array(tiles[0].length);
//     for (i = 0; i < sol.length; i++)
//         for (j = 0; j < sol[0].length; j++)
//             sol[i][j] = 0;
//     //console.log(sol.length, sol[0].length);

//     if (solveMazeUtil(0, 0, sol) == false)
//         output.innerHTML = "No solution possible!";
//     else {
//         /*
//         // print sol
//         console.log("printing solution");

//         var str="";
//         for (i = 0; i < sol.length; i++)
//         {
//           for (j = 0; j < sol[0].length; j++)
//             str += sol[i][j];
//           console.log(str);
//           str = "";
//           }
//           */
//         output.innerHTML = "Shortest path in " + steps + " steps!";
//     }
// }

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
    console.log("sol array")
    for (var i = 0; i < sol.length; i++) {
        var str = "";

        for (var j = 0; j < sol[0].length; j++)
            str += sol[i][j].parent.x + "," + sol[i][j].parent.y + "  ";

        console.log(str);
    }
    console.log("function to backtrack");

    let x = dest.x;
    let y = dest.y;

    while ((x != src.x || y != src.y)) {
        console.log(x, y);
        tiles[x][y].state = 'x';
        x = sol[x][y].parent.x;
        y = sol[x][y].parent.y;
    }
    console.log(x, y);
}

function bfs() {
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



    let s = new Node(new Point(src.x, src.y), new Point(-1, -1), -1);

    queue.push(s);

    while (queue.length > 0) {
        let curr = queue.pop();
        //console.log(curr);
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
    if (pathFound)
        backtrack(sol, src, dest);
    else
        console.log("no path found");
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