//#1
// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

export function a_star(grid, start_node, finish_node) {
    const visited_nodes_order = [];
    start_node.distance = 0;
    const unvisitedNodes = getAllNodes(grid); // Q: different from using grid or slice of grid???
  
    while (unvisitedNodes.length) {
      sortByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (!closestNode.isWall) {
        // If the closest node is at a distance of infinity,
        // we must be trapped and should stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
      }
    }
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1 + neighbor.distanceToFinishNode;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  
  //#2
  import PriorityQueue from "js-priority-queue";
  
  const astar = (grid, startNode, endNode, heuristic, allowDiag) => {
    let visitedNodes = [];
    let shortestPath = [];
    let diagDist = 1.414;
    if (heuristic === "chebyshev") diagDist = 1;
    let pq = new PriorityQueue({
      comparator: function(a, b) {
        //Tie-breaker
        if (a.f === b.f) return a.h - b.h;
        return a.f - b.f;
      }
    });
    grid.forEach(row => {
      row.forEach(node => {
        //g : distance
        node.g = Infinity;
        //h : heuristic
        node.h = Infinity;
        //f = g + h
        node.f = Infinity;
        node.prevNode = null;
      });
    });
    grid[startNode.row][startNode.column].g = 0;
    grid[startNode.row][startNode.column].h = 0;
    grid[startNode.row][startNode.column].f = 0;
    pq.queue(grid[startNode.row][startNode.column]);
    while (pq.length) {
      const node = pq.dequeue();
      const { row, col } = node;
      grid[row][col].isVisited = true;
      visitedNodes.push(node);
      if (node.row === endNode.row && node.col === endNode.column) {
        shortestPath = getShortestPath(node);
        break;
      }
      const n = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
      ];
      //with diag
      if (allowDiag) n.push([-1, 1], [1, 1], [-1, -1], [1, -1]);
      for (let j = 0; j < n.length; j++) {
        const i = n[j];
        const r = row + i[0];
        const c = col + i[1];
        if (
          grid[r] &&
          grid[r][c] &&
          !grid[r][c].isVisited &&
          (!grid[r][c].isWall || (r === endNode.row && c === endNode.column))
        ) {
          if (r === endNode.row && c === endNode.column) {
            grid[r][c].isVisited = true;
            grid[r][c].prevNode = grid[row][col];
            shortestPath = getShortestPath(grid[r][c]);
            return { visitedNodes, shortestPath };
          }
          const dist =
            Math.abs(i[0]) === 1 && Math.abs(i[1]) === 1 ? diagDist : 1;
          let gNew = grid[row][col].g + dist;
          let hNew = calculateHeuristic(r, c, endNode, heuristic, diagDist);
          let fNew = gNew + hNew;
          if (grid[r][c].f > fNew) {
            grid[r][c].g = gNew;
            grid[r][c].h = hNew;
            grid[r][c].f = fNew;
            grid[r][c].prevNode = node;
            pq.queue(grid[r][c]);
          }
        }
      }
    }
    return { visitedNodes, shortestPath };
  };
  
  const calculateHeuristic = (row, col, endNode, heuristic, diagDist) => {
    const dx = Math.abs(row - endNode.row);
    const dy = Math.abs(col - endNode.column);
    const d = 1;
    let ans;
    if (heuristic === "manhatten") {
      ans = d * (dx + dy);
    }
    if (heuristic === "euclidean") {
      ans = d * Math.sqrt(dx * dx + dy * dy);
    }
    if (heuristic === "octile" || heuristic === "chebyshev") {
      let d2 = diagDist;
      ans = d * Math.max(dx, dy) + (d2 - d) * Math.min(dx, dy);
    }
    return ans;
  };
  
  const getShortestPath = node => {
    let shortestPath = [];
    while (node !== null) {
      shortestPath.unshift(node);
      node = node.prevNode;
      if (node) node.isShortestPath = true;
    }
    return shortestPath;
  };
  
  export default astar;