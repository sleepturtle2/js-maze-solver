//PATH FINDING SOLUTION
function isSafe(x, y) {
    if (x >= 0 && x < tileRowCount && y >= 0 && y < tileColumnCount && (tiles[x][y].state != 'w'))
        return true;

    return false;
}

function print(a) {
    var str;
    for (i = 0; i < a.length; i++) {
        for (j = 0; j < a[0].length; j++)
            str += a[i][j].state + " ";
        console.log(str);
        str = "";
    }
}

function solveMazeUtil(x, y, sol) {
    if (x == end_x && y == end_y && tiles[x][y].state == 'f') {
        sol[x][y] = 1;
        steps++;
        return true;
    }

    if (isSafe(x, y) === true) {

        // Check if the current block is already part of solution path.
        if (sol[x][y] === 1) return false;
        console.log(x, y);
        // mark x, y as part of solution path
        sol[x][y] = 1;
        if (tiles[x][y].state != 's')
            tiles[x][y].state = 'x';
        steps++;

        //right
        if (solveMazeUtil(x, y + 1, sol) === true) return true;
        //down
        else if (solveMazeUtil(x + 1, y, sol) === true) return true;
        //left
        else if (solveMazeUtil(x - 1, y, sol) === true) return true;
        //up
        else if (solveMazeUtil(x, y - 1, sol) === true) return true;


        sol[x][y] = 0; //if all cases are false, this cell cannot be part of path
        tiles[x][y].state = 'e';
        steps--;
        return false;
    }
    return false;
}

function solveMaze(tiles, output) {
    let sol = new Array(tiles.length);

    //create solution maze
    for (i = 0; i < sol.length; i++)
        sol[i] = new Array(tiles[0].length);
    for (i = 0; i < sol.length; i++)
        for (j = 0; j < sol[0].length; j++)
            sol[i][j] = 0;
    //console.log(sol.length, sol[0].length);

    if (solveMazeUtil(0, 0, sol) == false)
        output.innerHTML = "No solution possible!";
    else {
        /*
        // print sol
        console.log("printing solution");

        var str="";
        for (i = 0; i < sol.length; i++)
        {
          for (j = 0; j < sol[0].length; j++)
            str += sol[i][j];
          console.log(str);
          str = "";
          }
          */
        output.innerHTML = "Shortest path in " + steps + " steps!";
    }
}

export { solveMaze };