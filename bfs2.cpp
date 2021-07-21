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
  int dist;
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

void BFS(int mat[][COL], Point src, Point dest)
{
  if (!mat[src.x][src.y] || !mat[dest.x][dest.y])
  {
    cout << "No path\n";
    return;
  }

  queue<vector<Node>> q;
  vector<Node> path;
  path.push_back({src, 0});
  q.push(path);

  while (!q.empty())
  {
    path = q.front();
    q.pop();

    Node last = path[path.size() - 1];
    cout << last.pt.x << " " << last.pt.y << endl;

    if (last.pt.x == dest.x && last.pt.y == dest.y)
    {
      printPath(path);
      return;
    }

    for (int i = 0; i < 4; i++)
    {
      int row = last.pt.x + rowNum[i];
      int col = last.pt.y + colNum[i];

      if (isValid(row, col) && isNotVisited(row, col, path))
      {
        vector<Node> newPath(path);
        newPath.push_back({row, col, last.dist + 1});
        q.push(newPath);
      }
    }
  }
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
