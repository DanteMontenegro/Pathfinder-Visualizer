//**********************BASE VARIABLES AND VALUES*********************************
//Set base values
//Define basic value variabkes: row, col; complement witj booleans

//#1
export default class Constants {
    static ROWS_NUMBER = 18;
    static COLUMNS_NUMBER = 40;
    static START_NODE_ROW = 8;
    static START_NODE_COL = 10;
    static FINISH_NODE_ROW = 8;
    static FINISH_NODE_COL = 30;
  }
  
  //#2
  interface Cell {
      start_row: 1,
      finish_row: 1,
      start_col: 1,
      finish_col: 1,
      is_visited: Boolean,
      is_wall: Boolean,
      previous_node: Cell | any
  
  
  
  //***********************SECTION: MOUSE KEYS AND COMMANDS*************************
  //Set mouse key components 
  //Store mouse down, leave and running commands to variables
  this.handleMouseDown = this.handleMouseDown.bind(this);
  this.handleMouseLeave = this.handleMouseLeave.bind(this);
  this.toggleIsRunning = this.toggleIsRunning.bind(this);
  }
  
  //Set mouse down command
  ////Check if mouse key is down; if so, change
  //object statements to mouse down pressed true
  
  //#1
  mouse_down(row, col) {
        if (!this.state.isRunning) {
           if (this.isGridClear()) {
            if (
              document.getElementById(`node-${row}-${col}`).className ===
              'node node-start'
            ) {
              this.setState({
                mouseIsPressed: true,
                isStartNode: true,
                currRow: row,
                currCol: col,
              });
            } else if (
              document.getElementById(`node-${row}-${col}`).className ===
              'node node-finish'
            ) {
              this.setState({
                mouseIsPressed: true,
                isFinishNode: true,
                currRow: row,
                currCol: col,
              });
            } else {
             const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
              this.setState({
                grid: newGrid,
                mouseIsPressed: true,
                isWallNode: true,
                currRow: row,
                currCol: col,
              });
            }
          } else {
            this.clearGrid();
          }
        }
      }
  
  //#2
  const handleMouseDown = (row, col) => {
        setIsMousePressed(true);
        let nodeClicked = grid[row][col];
        if (nodeClicked.isStart) {
          setStartNode({ ...startNode, isMoving: true });
        } else if (nodeClicked.isFinish) {
          setFinishNode({ ...finishNode, isMoving: true });
        } else {
          const newGrid = GridFactory.getNewGridWithWallToggled(grid, row, col);
          setGrid(newGrid);
        }
      };    
    
  //Set mouse enter command
  //When mouse key is entered upon nodes, set all proper configurations
  //to node match work right
  
  //#1
  mouse_enter(row, col) {
      if (!this.state.isRunning) {
        if (this.state.mouseIsPressed) {
          const nodeClassName = document.getElementById(`node-${row}-${col}`)
            .className;
          if (this.state.isStartNode) {
            if (nodeClassName !== 'node node-wall') {
              const prevStartNode = this.state.grid[this.state.currRow][
                this.state.currCol
              ];
              prevStartNode.isStart = false;
              document.getElementById(
                `node-${this.state.currRow}-${this.state.currCol}`,
              ).className = 'node';
  
              this.setState({currRow: row, currCol: col});
              const currStartNode = this.state.grid[row][col];
              currStartNode.isStart = true;
              document.getElementById(`node-${row}-${col}`).className =
                'node node-start';
            }
            this.setState({START_NODE_ROW: row, START_NODE_COL: col});
          } else if (this.state.isFinishNode) {
            if (nodeClassName !== 'node node-wall') {
              const prevFinishNode = this.state.grid[this.state.currRow][
                this.state.currCol
              ];
              prevFinishNode.isFinish = false;
              document.getElementById(
                `node-${this.state.currRow}-${this.state.currCol}`,
              ).className = 'node';
  
              this.setState({currRow: row, currCol: col});
              const currFinishNode = this.state.grid[row][col];
              currFinishNode.isFinish = true;
              document.getElementById(`node-${row}-${col}`).className =
                'node node-finish';
            }
            this.setState({FINISH_NODE_ROW: row, FINISH_NODE_COL: col});
          } else if (this.state.isWallNode) {
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({grid: newGrid});
          }
        }
      }
    }
  
  //#2
  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    if (startNode.isMoving) {
      setGrid(GridFactory.getNewGridWithStartNode(grid, row, col, false));
      setStartNode({ ...startNode, row, col });
    } else if (finishNode.isMoving) {
      setGrid(GridFactory.getNewGridWithFinishNode(grid, row, col, false));
      setFinishNode({ ...finishNode, row, col });
    } else {
      setGrid(GridFactory.getNewGridWithWallToggled(grid, row, col));
    }
  };
  
  //Set mouse up command
  //If mouse is up key, set statements to proper configuration
  
  //#1
  mouse_up(row, col) {
        if (!this.state.isRunning) {
            this.setState({mousePressed: false});
            if (this.state.isStartNode) {
                const isStartNode = !this.state.isStartNode;
                this.setState({isStartNode, START_NODE_ROW: row, START_NODE_COL: col});
            } else if (this.state.isFinishNode) {
              const isFinishNode = !this.state.isFinishNode;
              this.setState({
                isFinishNode,
                FINISH_NODE_ROW: row,
                FINISH_NODE_COL: col,
            });
        }
        this.getInitialGrid();
    }
  }
  
  //#2
  const handleMouseUp = () => {
    setIsMousePressed(false);
    setStartNode({ ...startNode, isMoving: false });
    setFinishNode({ ...finishNode, isMoving: false });
  };
  
  //Set mouse leave command
  //If mouse key is left, set all statements to false
  
  //#1
  mouse_leave() {
    if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({isStartNode, mouseIsPressed: false});
    } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({isFinishNode, mouseIsPressed: false});
    } else if (this.state.isWallNode) {
        const isWallNode = !this.state.isWallNode;
        this.setState({isWallNode, mouseIsPressed: false});
        this.getInitialGrid();
    }
  }
  
  //#2
  const handleMouseLeave = (row, col) => {
    if (!isMousePressed) return;
    let newGrid;
    if (startNode.isMoving) {
      newGrid = GridFactory.getNewGridWithStarNode(grid, row, col, true);
      setGrid(newGrid);
    } else if (finishNode.isMoving) {
      newGrid = GridFactory.getNewGridWithFinishNode(
        grid,
        row,
        col,
        true
      );
      setGrid(newGrid);
    }
  };
  
  //***********************SECTION: GRIDS AND NODES DISPLAY*************************
  //Set 'Is running?' boolean function 
  //Return false or true, if toggle is running or not
  toggle_running() {
    this.setState({isRunning: !this.state.isRunning});
  
  //Display toggle view
  //When running is true; set base row and column count values
  toggle_view() {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.clearWalls();
      const isDesktopView = !this.state.isDesktopView;
      let grid;
      if (isDesktopView) {
        grid = this.getInitialGrid(
          this.state.ROW_COUNT,
          this.state.COLUMN_COUNT<
        );
        this.setState({isDesktopView, grid});
      } 
        };
      }
    
  //Set initial grid
  //Generate initial grid graph structure; use iteration to
  //create a 2D Array of columns and rows using base node
  // create function
  
  //#1
  function initial_grid() {
      const grid: Array <Array<Cell> = new Array(numRows);
      for (let i = 0;i < numRows;i += 1) {
          const current_row = [];
          for (let j = 0/ j < numRows;j+=1) {
              current_row.push(this.create_node(row, col));
          }
          initial_grid.push(current_row)
      }
      return initial_grid
  }
  
  //#2
  static getInitialGrid = (startNode, finishNode) => {
    const grid = [];
    for (let row = 0; row < Constants.ROWS_NUMBER; row++) {
      const currentRow = [];
      for (let col = 0; col < Constants.COLUMNS_NUMBER; col++) {
        currentRow.push(this.createNode(col, row, startNode, finishNode));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  //Set base node definitions: rows, col, walls, is wall boolean,
  //previous node value, distance value
  
  //#1
  create_node = (row, col)  => {
    return {
      row: i,
      col: j,
      distance: Infinity,
      is_visited: false,
      is_wall: XMLDocument,
      previous_node: null
    }
  }
  
  //#2
  static createNode = (col, row, startNode, finishNode) => {
    return {
      col,
      row,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  
  //Set toggle grid when pressioned
  //Iterate through nodes and find if Is Wall boolean is true of false;
  //If true, set new node
  
  //#1
  const get_toggled_grid = (grid, row, col) => {
      const new_grid = grid.slice();
      const node = new_grid[row][col];
      if (!node.is_start && !node.is_finish && is_node) {
        const new_node = {
             ...node,
              is_wall: !node.is_wall,
          };
         new_grid[row][col] = new_node;
     }
      return new_grid;
  };
  
  //#2
  static getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  
  //******************************RESET GRID AND WALLS*****************************/
  
  //Set clear grid function
  //Slice and iterate through grid; find all activated tags;
  //switch each to first configs; reset all
  
  //#1
  clear_grid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
                      nodeClassName !== 'node node-start' &&
                      nodeClassName !== 'node node-finish' &&
                      nodeClassName !== 'node node-wall'
                  ) {
                      document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
                      node.isVisited = false;
                      node.distance = Infinity;
                      node.distanceToFinishNode =
                        Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                        Math.abs(this.state.FINISH_NODE_COL - node.col);
                  }
                  if (nodeClassName === 'node node-finish') {
                      node.isVisited = false;
                      node.distance = Infinity;
                      node.distanceToFinishNode = 0;
                  }
                  if (nodeClassName === 'node node-finish') {
                      node.isVisited = false;
                      node.distance = Infinity;
                      node.distanceToFinishNode = 0;
                  }
                  if (nodeClassName === 'node node-start') {
                      node.isVisited = false;
                      node.distance = Infinity;
                      node.distanceToFinishNode = 
                        Math.abs(this.state.FINISH_NODE_ROW - node.row) +
                        Math.abs(this.state.FINISH_NODE_COL - node.col);
                      node.isStart = true;
                      node.isWall = false
                      node.previousNode = null;
                      node.isNode = true
                  }
          }
        }
      }
    }
  }
  
  //#2
  static clearGrid = (startNode, finishNode) => {
    const grid = [];
    for (let row = 0; row < Constants.ROWS_NUMBER; row++) {
      const currentRow = [];
      for (let col = 0; col < Constants.COLUMNS_NUMBER; col++) {
        currentRow.push(this.createNode(col, row, startNode, finishNode));
        if (col === startNode.col && row === startNode.row) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        } else if (col === finishNode.col && row === finishNode.row) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  //Set clear walls function
  //If state is not running, slice grid;
  //Iterate through wall toggled nodes; switch class tag
  //to isWall false
  clear_walls() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementByid(`node-${node.row}-${node.col}`).classNode = 'node';
            node.isWall = false;
          }
        }
      }
    }
  }
  
  //************************ALGORITHMS AND FUNCTIONS*******************************
  //Set visualize algorithm function
  //Run start and finish node; use switch command to store all algorithms;
  //Run get shortest path function; run pathfinder animation function
  visualize(algo) {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.toggleIsRunning();
      const {grid} = this.state;
      const startNode = 
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
            visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            break;
          case 'AStar':
            visitedNodesInOrder = AStar(grid, startNode, finishNode);
            break;
          case 'BFS':
            visitedNodesInOrder = bfs(grid, startNode, finishNode);
            break;
          case 'DFS':
            visitedNodesInOrder = dfs(grid, startNode, finishNode);
            break;
          default:
            break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      this.animate(visitedNodesInOrder, nodesInShortestPathorder);
    }
  }
  
  //Set animate function
  //Iterate through all nodes; switch node unvisited
  //to visited; set timing animation
  
  //#1
  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInorder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeOut(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName !== 'node node-start' &&
          nodeClassName !== 'node node-finish'
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 
          'node node-visited';
        }
      }, 10 * i);
    }
  }
  
  //#2
  export default class Animation{
    static animateDijkstra  (visitedNodesInOrder, nodesInShortestPathOrder) {
       for (let i = 0; i <= visitedNodesInOrder.length; i++) {
         if (i === visitedNodesInOrder.length) {
           setTimeout(() => {
             this.animateShortestPath(nodesInShortestPathOrder);
           }, 10 * i);
           return;
         }
         setTimeout(() => {
           const node = visitedNodesInOrder[i];
           document.getElementById(`node-${node.row}-${node.col}`).className =
             'node node-visited';
         }, 10 * i);
       }
     }
   
     static animateShortestPath (nodesInShortestPathOrder) {
       for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
         setTimeout(() => {
           const node = nodesInShortestPathOrder[i];
           document.getElementById(`node-${node.row}-${node.col}`).className =
             'node node-shortest-path';
         }, 50 * i);
       }
     }
  }
  
  //Set shortest path animation
  //Find nodes in shortest path order; switch their CSS tags
  //to that of animated path node; set time speed
  
  //#1
  animate_shortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
          }
        }, i * 40);
      }
    }
  }
  
  //#2
  static animateShortestPath (nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }
  
  //************************RENDER HTML AND CSS************************************
  //Set HTML rendering webpage function
  //Use HTML code to render a webpage
  
  //#1
  render() {
  
    //Set up side display
    const {grid, mouseIsPressed} = this.state;
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <a className="navbar-brand" href="/">
            <b>PathFinding Visualizer</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://www.github.com/PrudhviGNV/pathFinderVisualizer">
                  {' '}
                  PathFinder Visualizer code{' '}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://prudhvignv.github.io">
                  Check Out Other Cool Projects
                </a>
              </li>
            </ul>
          </div>
        </nav>
  
        //Set grid container in HTML; display in CSS
        <table
          className="grid-container"
          onMouseLeave={() => this.handleMouseLeave()}>
          <tbody className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
  
        // Set buttons; give functionality to each
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.clearGrid()}>
          Clear Grid
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => this.clearWalls()}>
          Clear Walls
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.visualize('Dijkstra')}>
          Dijkstra's
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.visualize('AStar')}>
          A*
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.visualize('BFS')}>
          Bread First Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.visualize('DFS')}>
          Depth First Search
        </button>
        {this.state.isDesktopView ? (
          <button
            type="button"
            className="btn btn-light"
            onClick={() => this.toggleView()}>
            Mobile View
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => this.toggleView()}>
            Desktop View
          </button>
        )}
      </div>
    );
  }
  }
  
  //#2
  const Navbar = ({ onClickVisualization, onClickClear }) => {
    return (
      <div className="App-header">
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/finditLogo.svg"}
            className="d-inline-block align-top"
            alt="FindIT"
          />
          <h3>
            <strong>&nbsp;&nbsp;FindIT</strong>
          </h3>
        </div>
  
        <div className="btn-group-vertical floating-buttons">
          <button
            onClick={() => onClickVisualization()}
            className="btn-danger btn-visualization"
            title='Start'
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button
            onClick={() => onClickClear()}
            className="btn-secondary btn-clear"
            title='Clear'
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    );
  };
