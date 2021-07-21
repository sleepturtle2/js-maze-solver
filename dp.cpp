#include <bits/stdc++.h>
using namespace std;

#define ROW 9
#define COL 10

struct Point
{
  int x;
  int y;
};

struct Node
{
  Point pt;
  Point parent;
  int dist = -1;
};

bool isValid(int row, int col)
{
  return (row >= 0) && (row < ROW) && (col >= 0) && (col < COL);
}

int rowNum[] = {-1, 0, 0, 1};
int colNum[] = {0, -1, 1, 0};

void printPath(vector<Node> &path)
{
  for (int i = 0; i < path.size(); i++)
    cout << " (" << path[i].pt.x << "," << path[i].pt.y << "," << path[i].dist << ") ";
  cout << endl;
}

bool isNotVisited(int row, int col, vector<Node> &path)
{
  for (int i = 0; i < path.size(); i++)
  {
    if (path[i].pt.x == row && path[i].pt.y == col)
      return false;
  }
  return true;
}

void backtrack(vector<vector<Node>> &a, Point src, Point dest)
{
  Point curr = dest;
  cout << "Path\n";
  while (curr.x != src.x && curr.y != src.y)
  {
    cout << curr.x << "," << curr.y << endl;
    curr.x = a[curr.x][curr.y].parent.x;
    curr.y = a[curr.x][curr.y].parent.y;
  }
  cout << curr.x << "," << curr.y << endl;
}

void BFS(int mat[][COL], Point src, Point dest)
{
  if (!mat[src.x][src.y] || !mat[dest.x][dest.y])
  {
    cout << "No path\n";
    return;
  }

  queue<Node> queue;
  Node s = Node({0, 0, -1, -1, 0});
  queue.push(s);

  //making matrix of nodes
  vector<vector<Node>> a(ROW, vector<Node>(COL));
  for (int i = 0; i < ROW; i++)
  {
    for (int j = 0; j < COL; j++)
    {
      a[i][j].pt.x = i;
      a[i][j].pt.y = j;

      //no parent
      a[i][j].parent.x = -1;
      a[i][j].parent.y = -1;
    }
  }
  bool pathFound = false;
  while (!queue.empty())
  {
    Node curr = queue.front();
    queue.pop();
    //cout << curr.pt.x << " " << curr.pt.y << endl;
    if (curr.pt.x == dest.x && curr.pt.y == dest.y)
    {
      pathFound = true;
    }
    for (int i = 0; i < 4; i++)
    {
      int row = curr.pt.x + rowNum[i];
      int col = curr.pt.y + colNum[i];

      if (isValid(row, col))
      {
        if (a[row][col].dist == -1 || a[row][col].dist > a[curr.pt.x][curr.pt.y].dist + 1)
        {
          a[row][col].dist = a[curr.pt.x][curr.pt.y].dist + 1;
          a[row][col].parent.x = curr.pt.x;
          a[row][col].parent.y = curr.pt.y;

          queue.push(a[row][col]);
        }
      }
    }
  }

  if (pathFound)
  {
    backtrack(a, src, dest);
  }
  else
    cout << "No path found\n";
}

int main()
{
  int mat[ROW][COL] =
      {
          {1, 0, 1, 1, 1, 1, 0, 1, 1, 1},
          {1, 0, 1, 0, 1, 1, 1, 0, 1, 1},
          {1, 1, 1, 0, 1, 1, 0, 1, 0, 1},
          {0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
          {1, 1, 1, 0, 1, 1, 1, 0, 1, 0},
          {1, 0, 1, 1, 1, 1, 0, 1, 0, 0},
          {1, 0, 0, 0, 0, 0, 0, 0, 0, 1},
          {1, 0, 1, 1, 1, 1, 0, 1, 1, 1},
          {1, 1, 0, 0, 0, 0, 1, 0, 0, 1}};
  Point src = {0, 0};
  Point dest = {3, 4};

  BFS(mat, src, dest);
  //cout << isValid(0, 0) << endl;
}
