var grid =
  [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 0, 0],
  [1, 1, 1, 1]
  ];
var row = grid.length;
var col = grid[0].length;
var end_x = row-1;
var end_y = col - 1;

function isSafe(x, y) {
  if (x >= 0 && x < row && y >= 0 && y < col  && grid[x][y] == 1) return true;
  return false;
}

function print(a) {
  for (i = 0; i < a.length; i++)
  {
      console.log(...a[i]);
    }
}

function backtrack(sol) {
  let x = end_x;
  let y = end_y;

  sol[x][y] = 2; //marks the end of the path
  //console.log(sol[x][y]);
  while (x != 0 && y != 0) {
    //check up
    if (isSafe(x - 1, y) && sol[x - 1][y] == 1) {
      sol[x-1][y] = 0;
      x = x - 1;
      console.log("up");
      continue;
    }
    //check down
    else if (isSafe(x + 1, y) && sol[x + 1][y] == 1) {
      sol[x + 1][y] = 0;
      x = x + 1;
      console.log("down");
      continue;
    }
    //check right
    else if (isSafe(x, y + 1) && sol[x][y + 1] == 1) {
      sol[x][y + 1] = 0;
      y = y + 1;
      console.log("right");
      continue;
    }
      //check left
    else if (isSafe(x, y - 1) && sol[x][y - 1] == 1) {
      sol[x][y - 1] = 0;
      y = y - 1;
      console.log("left");
      continue;
    }
  }
}

function solveMazeUtil(x, y, sol) {
  if (x == row - 1 && y == col - 1 && grid[x][y] == 1) {
    sol[x][y] = 1;
    end_x = row - 1;
    end_y = col - 1;
    return true;
  }

  if (isSafe(x, y) == true) {

    if (sol[x][y] == 1)
      return false;

    sol[x][y] = 1;

    if (solveMazeUtil(x + 1, y, sol) == true)
      return true;

    if (solveMazeUtil(x - 1, y, sol) == true) return true;

    if (solveMazeUtil(x, y - 1, sol) == true) return true;

    if (solveMazeUtil(x, y + 1, sol) == true) return true;

    sol[x][y] = 0;
    return false;
  }

  return false;
}

function solveMaze() {
  let sol = new Array(grid.length);
  let output;

  //create solution maze
  for (i = 0; i < sol.length; i++)
    sol[i] = new Array(grid[0].length);
  //initialize solution maze
  for (i = 0; i < grid.length; i++)
    for (j = 0; j < grid[0].length; j++)
      sol[i][j] = 0;



  if (solveMazeUtil(0, 0, sol) == false)
    ouptut = "Solution does not exist";
  else {
    output = "The solution path has been displayed above"
    print(sol);
    backtrack(sol);
  }

  console.log(output);

}

solveMaze();
