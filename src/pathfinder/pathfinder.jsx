//Make all necessary imports
import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css'

//**********************SECTION: BASE VARIABLES AND VALUES*********************************
//#1
//Set base values
//Define basic value variabkes: row, col; complement witj booleans

export default class Constants {
    //basic variables: finish and start rows and cols, 
    //booleans is_wall and in_progress
    //switch previous_node
    //Consts
    start_row: 25,
    start_col: 40,
    finish_row: 11,
    finish_col: 15,
    //Booleans
    is_pressed: false,
    in_progress: false,
    is_wall: false,
    //...
    animate_grid = [],
    //...
    start_node: false,
    finish_node: false,
    count_column: 35,
    count_row: 35
};

//is running
is_running() {
    this.setState({isRunning: !this.state.isRunning});
}

//***********************SECTION: MOUSE KEYS AND COMMANDS*************************

//#2
//Set mouse down command
////Check if mouse key is down; if so, change
//object statements to mouse down pressed true

mouse_down = (row, col) => {
    mouse_pressed(true);
    //Store variable
    let node_clicked = grid[row][col];
    //Switch to is_moving true
    if (node_clicked.isStart) {
        set_start_node({...start_node, is_moving: true});
    } else if (node_clicked.isFinish) {
        set_start_node({...finish_node, is_moving: true});
    //Switch to wall_togled true
    } else {
        const new_grid = GridFactory.get_wall_toggled(grid, row, col);
        set_grid(new_grid);
    }
};

//#3
//Set mouse enter command
//When mouse key is entered upon nodes, set all proper configurations
//to node match work right

mouse_enter = (row, col) => {
    //If mouse pressed is false, return none
    if (!is_mouse_pressed) return;
    //If start_node or finish_node is moving, update grid 
    if (start_node.is_moving) {
        set_grid(GridFactory.get_start_grid(grid, row, col, false));
        set_start_node({ ...start_node, row, col});
    } else if (finish_node.is_moving) {
        set_grid(GridFactory.get_finish_grid(grid, row, col, false));
        set_finish_node({...finish_node, row, col});
    //else, get toggled grid
    } else {
        set_grid(GridFactory.get_toggled_grid1(grid, row, col));
    }
};

//#4
//Set mouse up command
//If mouse is up key, set statements to proper configuration

mouse_up = () => {
    //if mouse pressed is false, set start and finish nodes to is_moving false
    mouse_pressed(false);
    set_start_node({...start_node, is_moving: false });
    set_finish_node({...finish_node, is_moving: false});
}

//#5
//Set mouse leave command
//If mouse key is left, set all statements to false

mouse_leave = (row, col) => {
    //if mouse is not pressed
    if(!mouse_pressed) return;
    let new_grid;
    //switch start and finish nodes to grid true
    if (start_node.isMoving) {
        new_grid = GridFactory.start_grid(grid, row, col, true);
        set_grid(new_grid);
    } else if (finish_node.isMoving) {
        new_grid = GridFactory.finish_grid(grid, row, col, true);
        set_grid(new_grid);
    }
};

//***********************SECTION: GRIDS AND NODES DISPLAY*************************
//#06
//Set initial grid
//Generate initial grid graph structure; use iteration to
//create a 2D Array of columns and rows using base node
// create function

function initial_grid() {
    count_row = this.state.COUNT_ROW
    count_col = this.state.COUNT_COLUMN
    //generate 3d array through iteration
    const initial_grid = []
    for(let i = 0; i < count_row; i += 1) {
        //store current row in a hash
        const current_row = [];
        for (let j = 0; j < count_row; j+= 1) {
            current_row.push(this.create_node(row, col));
        }
        initial_grid.push(current_row)
    }
    return initial_grid
}

//07
//Set base node definitions: rows, col, walls, is wall boolean,
//previous node value, distance value

function create_node = (row, col) => {
    //Define basic object-oriented attributes of a node
    return {
        row: i,
        col: j,
        isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
        isFinish:
        row === this.state.FINISH__NODE_ROW && col === this.state.FINISH_NODE_COL,
        end_row: j,
        end_col: j,
        distance: Infinity,
        is_visited: false,
        is_wall: XMLDocument,
        previous_Node: null,
        is_node: true,
    }
}

//08
//Set toggle grid when pressioned
//Iterate through nodes and find if Is Wall boolean is true of false;
//If true, set new node

function wall_toggled_grid = (grid, row, col) => {
    //slice new grid
    const new_grid = grid.slice();
    //store new grid to node variable
    const node = new_grid[row][col];
    //set new node to is_wall true
    const new_node = {
        ...node,
        is_wall: !node.is_wall,
    };
    new_grid[row][col] = new_node;
    return new_grid;
};

//******************************SECTION: RESET GRID AND WALLS*****************************/
//09
//Set clear grid function
//Slice and iterate through grid; find all activated tags;
//switch each to first configs; reset all

function is_grid_clear = (start_node, finish_node) => {
    //store cleared grid in variable
    const grid = [];
    //rsset all statements to initial config
    for (let row = 0; row < Constants.rows_number; row++) {
        current_row.push(this.create_node(col, row, start_node, finish_node));
        if (col === start_node.col && row === start_node.row) {
            document.getElementById('nodes-$-{row}-${col}').className = 
            'node node-start';
        } else if (col === finish_node.col && row === finish_node.row) {
            document.getElementById(`node-${row}`-${col}.className =
            "node node-finish";
        } else {
            document.getElementById(`node-${row}-${col}`).className = "node";
        }
    }
    grid.push(current_row);
}
return grid;
};

//10
//If state is not running, slice grid;
//Iterate through wall toggled nodes; switch class tag
//to isWall false

clear_walls() {
    //if state is not running
    if (!this.state.isRunning) {
        const new_grid = this.state.grid.slice();
        //iterate and switch is_wall to false
        for (const row of new_grid) {
            for (const node of row) {
                let node_class_name = document.getElementById(
                    `node-${node.row}-${node.col}`,
                ).className;
                if (node_class_name === 'node node-wall') {
                    document.getElementByid(`node-${node.row}-${node.col}`).classNode = 'node';
                    node.is_wall = false;
                }
            }
        }
    }
}

//************************SECTION: ALGORITHMS AND FUNCTIONS*******************************
//11
//Set animate function
//Iterate through all nodes; switch node unvisited
//to visited; set timing animation

animate(visited_nodes, shortest_path_order) {
    //iterate visited nodes and set time out
    for (let i = 0; i <= visited_nodes.length; i++) {
    if (i === visited_nodes.length) {
    setTimeOut(() => {
        //set shortest path order argument
        this.shortest_path_order
    }, 10 * i);
    return;
    }
    //animate start and finish nodes
    setTimeout(() => {
        const node = visited_nodes[i];
        const node_class_name = document.getElementById(
            `node-${node.row}-${node.col}`,
        ).className;
        if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish'
        ) {
            //set node visited
            document.getElementById(`node-${node.row}-${node.col}`).className =
             'node node-visited';
        }
    }, 10 * i);
  }
}

//#12
//Set shortest path animation
//Find nodes in shortest path order; switch their CSS tags
//to that of animated path node; set time speed

animate_shortest_path(shortest_path_order) {
    //iterate through nodes and switch class to shortest path animated;
    //set time out
    for (let i = 0; i < shortest_path_order.length; i++) {
        setTimeout(() => {
            const node = shortest_path_order[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';    
        }, 50 * i);
    }
}

//************************RENDER HTML AND CSS************************************
//#13
//Set HTML rendering webpage function
//Use HTML code to render a webpage

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










