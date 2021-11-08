//#1
import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    render() {
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;

        const extraClassName = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : '';

        return (
            <td 
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}></td>
        );
    }
}


//#2
//Import necessary components
import React from "react";
import "./Node.css";

//Set node constant; append all node components to it
const Node = ({row, col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseLeave}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

//Append all mouse keys commands to div component
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseLeave={() => onMouseLeave(row, col)}
    ></div>
  );
};

//Expot node
export default Node;
