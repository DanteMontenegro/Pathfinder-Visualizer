// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.
export function a_star(grid, start_node, finish_node) {
  //set store hash variable
  const visited_node_order = [];
  //start node countdown distance
  start_node.distance = 0;
  //sotre unvisited nodes
  const unvisited_nodes = get_nodes(grid); 
  while (unvisited_nodes.length) {
    sortByDistance(unvisited_nodes);
    const closest_node = unvisited_nodes.shift();
    // If we encounter a wall, we skip it.
    if (!closest_node.isWall) {
      // If the closest node is at a distance of infinity,
      // we must be trapped and should stop.
      if (closest_node.distance === Infinity) return visited_node_order;
      closestNode.isVisited = true;
      visited_node_order.push(closest_node);
      //identify closet node; update neighboors
      if (closest_node === finish_node) return visited_node_order;
      update_neighboors(closest_node, grid);
    }
  }
}

//Get all nodes and store them in heap sort
function get_nodes(grid) {
  const nodes = [];
  //Iterate
  for (const row of grid) {
    for (const node of row) {
      //push
      nodes.push(node);
    }
  }
  return nodes;
}

//Sort all nodes by distance
function sort_nodes_distance(unvisited_nodes) {
  unvisited_nodes.sort((nodea, nodeb) => nodea.distance - nodeb.distance);
}

//Update unvisited neighboor nodes according to previous node
function update_neighboors(node, grid) {
  const unvisited_neighboors = get_unvisited_neighboors(node, grid);
  for (const neighbor of unvisited_neighboors) {
    neighbor.distance = node.distance + 1;
    neighbor.previous_node = node;
  }

//Store all univisited neighboor nodes; set proper procedures in case of row or col
function get_univisted_neighboors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  //sort all in-match visited neighboors to variable;
  //update all
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

