function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Node(pt, dist) {
    this.pt = pt;
    this.dist = dist;
}

var d = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
];

function bfs(maze, src, dest) {
    var minDist = -1;
    if (maze[src.x][src.y] != 1 || maze[dest.x][dest.y] != 1)
        return minDist;
    var h = maze.length;
    var w = maze[0].length;
    visited = [];
    for (var i = 0; i < h; i++) {
        visited.push([]);
        for (var j = 0; j < w; j++) {
            visited[i].push(false);
        }
    }
    var pathFound = false;
    var queue = [];
    var s = new Node(src, 0);
    queue.push(s);
    visited[src.x][src.y] = true;
    while (queue.length > 0) {
        var curr = queue.pop();
        console.log(curr.pt.x + " " + curr.pt.y);
        var pt = curr.pt;
        // console.log(pt.x + " " + pt.y + " " + curr.dist);
        if (pt.x == dest.x && pt.y == dest.y) {
            console.log("Path 1:");
            console.log(curr.dist);
            queue.push(curr);
            console.log(queue);
            queue.pop();
            pathFound = true;
        }
        for (var i = 0; i < 4; i++) {
            var row = pt.x + d[i].x;
            var col = pt.y + d[i].y;
            if (isValid(maze, visited, h, w, row, col)) {
                visited[row][col] = true;
                var adjCell = new Node(new Point(row, col), curr.dist + 1);
                queue.push(adjCell);
            }
        }
    }
    if (!pathFound)
        return minDist;
    else
        return minDist;
}

function isValid(maze, visited, width, height, row, col) {
    return (row >= 0) && (row < width) && (col >= 0) && (col < height) && maze[row][col] == 1 && !visited[row][col];
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
var dest = new Point(7, 5);
var dist = bfs(maze, source, dest);

if (dist != -1)
    console.log(`The shortest path from (${source.x}, ${source.y}) to (${dest.x}, ${dest.y}) has length ${dist}\n`);
// else
//     console.log(`Shortest path from ${(source.x, source.y)} to ${(dest.x, dest.y)} does not exist`);