// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

//#1
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    let nextNodesStack = [startNode];
    while (nextNodesStack.length) {
      const currentNode = nextNodesStack.shift();
      if (currentNode === finishNode) return visitedNodesInOrder;
  
      if (
        !currentNode.isWall &&
        (currentNode.isStart || !currentNode.isVisited)
      ) {
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        const {col, row} = currentNode;
        let nextNode;
        if (row > 0) {
          nextNode = grid[row - 1][col];
          if (!nextNode.isVisited) {
            nextNode.previousNode = currentNode;
            nextNodesStack.push(nextNode);
          }
        }
        if (row < grid.length - 1) {
          nextNode = grid[row + 1][col];
          if (!nextNode.isVisited) {
            nextNode.previousNode = currentNode;
            nextNodesStack.push(nextNode);
          }
        }
        if (col > 0) {
          nextNode = grid[row][col - 1];
          if (!nextNode.isVisited) {
            nextNode.previousNode = currentNode;
            nextNodesStack.push(nextNode);
          }
        }
        if (col < grid[0].length - 1) {
          nextNode = grid[row][col + 1];
          if (!nextNode.isVisited) {
            nextNode.previousNode = currentNode;
            nextNodesStack.push(nextNode);
          }
        }
      }
    }
    // return visitedNodesInOrder;
  }
  
  
  //#2
  BFSsearch(show) {
    if (this.q.isEmpty()) {
      // this.nodes[this.si][this.sj].distance = 0;
      this.q.enqueue(this.nodes[this.si][this.sj]);
      this.path[this.si][this.sj] = [this.nodes[this.si][this.sj]];
      // document.getElementById(this.nodes[this.si][this.sj].name).className = "visited";
    } else if (this.q.isEmpty() == false) {
      let rm = this.q.dequeue();
      if(document.getElementById(rm.name).className == "sd"){
        document.getElementById(rm.name).className = "sd";
      }else{
        if(show == true){
          document.getElementById(rm.name).className = "visited";
        }else{
          document.getElementById(rm.name).className = "unvisited";
        }
      }
      // console.log(rm.name);
      // console.log(rm.edges);
      // this.close.push(rm);
      for (let k = 0; k < 4; k++) {
        var node = rm.edges[k];
        if (node != null) {
          if (node.distance == 0) {
            // console.log(node.name);
            node.distance = rm.distance + 1;
  
            if (this.path[rm.pi][rm.pj]) {
              this.path[node.pi][node.pj] = [node];
              this.path[node.pi][node.pj] = this.path[node.pi][node.pj].concat(this.path[rm.pi][rm.pj]);
            }
            this.q.enqueue(node);
            if ((node.pi == this.di) && (node.pj == this.dj)) {
              this.pathArr = this.path[this.di][this.dj]
              this.distance = node.distance;
              bus.$emit("stop", {p: this.pathArr, d: this.distance});
              // for(let i= 1; i<this.pathArr.length-1; i++){
              //   document.getElementById(this.pathArr[i].name).className = "path"
                // document.getElementById(this.pathArr[0].name).className = "sd"
                // document.getElementById(this.pathArr[this.pathArr.length-1].name).className = "sd"
              // }
            }
          }
        }
      }
    }