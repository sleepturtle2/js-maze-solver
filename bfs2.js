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

function printPath(path) {

    console.log("Final path: ");
    console.log(path);
}

function isNotVisited(row, col, path) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].pt.x === row && path[i].pt.y === col)
            return false;
    }
    return true;
}

function isValid(maze, width, height, row, col) {
    return (row >= 0) && (row < width) && (col >= 0) && (col < height) && maze[row][col] == 1; //&& !visited[row][col];
}

function equal(newPath, path) {
    for (var i = 0; i < path.length; i++)
        newPath.push(path[i]);
}

function bfsUtil(queue, width, height) {
    let path = queue.pop();
    let last = path[path.length - 1];

    if (last.pt.x === dest.x && last.pt.y === dest.y) {
        pathFound = true;
        printPath(path);
        return;
    }

    for (let i = 0; i < 4; i++) {
        let row = last.pt.x + d[i].x;
        let col = last.pt.y + d[i].y;

        if (isValid(maze, width, height, row, col) && isNotVisited(row, col, path)) {
            //visited[row][col] = true
            let newPath = [];
            equal(newPath, path);
            let node = new Node(new Point(row, col), last.dist + 1);
            newPath.push(node);
            queue.push(newPath);
        }
    }

}

function bfs(maze, src, dest) {
    let pathFound = false;

    if (maze[src.x][src.y] || maze[dest.x][dest.y]) {

        let queue = [];
        let path = [];

        let height = maze.length;
        let width = maze[0].length;

        visited = [];
        for (var i = 0; i < height; i++) {
            visited.push([]);
            for (var j = 0; j < width; j++) {
                visited[i].push(false);
            }
        }

        let s = new Node(src, 0);
        path.push(s);
        queue.push(path);
        visited[src.x][src.y] = true;


        while (queue.length > 0) {

        }
    }
    if (!pathFound)
        console.log("No path found");
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