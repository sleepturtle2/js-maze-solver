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


function isValid(maze, R, C, row, col) {
    return (row >= 0) && (row < R) && (col >= 0) && (col < C) && maze[row][col] == 1; //&& !visited[row][col];
}

function backtrack(sol, src, dest) {
    console.log("function to backtrack");

    let x = dest.x;
    let y = dest.y;

    while (x != src.x && y != src.y) {
        console.log(x, y);
        x = sol[x][y].parent.x;
        y = sol[x][y].parent.y;
    }
    console.log(x, y);
}

function bfs(maze, src, dest) {
    let pathFound = false;

    let queue = [];


    let r = maze.length;
    let c = maze[0].length;
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

            if (isValid(maze, r, c, row, col)) {
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



var maze = [
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1]
];

var source = new Point(0, 0);
var dest = new Point(5, 8);
bfs(maze, source, dest);