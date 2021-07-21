let graph = {
    start: { a: 5, b: 2 },
    a: { start: 1, c: 4, d: 2 },
    b: { a: 8, d: 7 },
    c: { d: 6, finish: 3 },
    d: { finish: 1 },
    finish: {}
};


let shortestDistanceNode = (distances, visited) => {
    let shortest = null; //default for shortest

    //each node in distances object
    for (let node in distances) {
        // if no node has been assigned to shortest yet
        // or if the current node's distance is smaller than the current shortest

        let currentIsShortest = shortest === null || distances[node] < distances[shortest]; //boolean

        //if current node is in the unvisited set
        if (currentIsShortest && !visited.includes(node)) {
            shortest = node;
        }

    }
    return shortest;
}

//MAIN ALGORITHM
let findShortestPath = (graph, startNode, endNode) => {

    // track distances from the start node using a hash object
    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
    // track paths using a hash object
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
        parents[child] = startNode;
    }

    // collect visited nodes
    let visited = [];
    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node:
    while (node) {
        // find its distance from the start node & its child nodes
        let distance = distances[node];
        let children = graph[node];

        // for each of those child nodes:
        for (let child in children) {

            // make sure each child node is not the start node
            if (String(child) === String(startNode)) {
                continue;
            } else {
                // save the distance from the start node to the child node
                let newdistance = distance + children[child];
                // if there's no recorded distance from the start node to the child node in the distances object
                // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                if (!distances[child] || distances[child] > newdistance) {
                    // save the distance to the object
                    distances[child] = newdistance;
                    // record the path
                    parents[child] = node;
                }
            }
        }
        // move the current node to the visited set
        visited.push(node);
        // move to the nearest neighbor node
        node = shortestDistanceNode(distances, visited);
    }

    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();

    //this is the shortest path
    let results = {
        distance: distances[endNode],
        path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
    return results;
};

function output() {
    let results = findShortestPath(graph, "start", "end");

    console.log(results.distance);
    for (var i = 0; i < results.path.length; i++)
        console.log(results.path[i]);

}

console.log(findShortestPath(graph, "start", "finish"));