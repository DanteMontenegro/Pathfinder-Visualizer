// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.
bfs_search(show) {
  if (this.q.isEmpty()) {
    // this.nodes[this.si][this.sj].distance = 0;
    this.q.enqueue(this.nodes[this.si][this.sj]);
    this.path[this.si][this.sj] = [this.nodes[this.si][this.sj]];
    // document.getElementById(this.nodes[this.si][this.sj].name).className = "visited";
  } else if (this.q.isEmpty() == false) {
    let rm = this.q.dequeue();
    if(document.getElementById(rm.name).class_name == "sd"){
      document.getElementById(rm.name).class_name = "sd";
    }else{
      if(show == true){
        document.getElementById(rm.name).class_name = "visited";
      }else{
        document.getElementById(rm.name).class_name = "unvisited";
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

