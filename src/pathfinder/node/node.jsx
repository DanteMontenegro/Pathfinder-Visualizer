//#2
//Import necessary components
import React from 'react';
import './Node.css';

//Set node constant; append all node components to it
const Node = ({row, col, is_finish, is_start, is_wall, mouse_down, mouse_enter, mouse_leave}) => {
    const class_name = is_finish
    //three possible statements: finish, start and wall
    ? 'node-finish'
    : is_start
    ? 'node-start'
    : is_wall
    ? 'node-wall'
    : '';

//Append all mouse keys commands to div component
    return (
        <div
        id={`node-${row}-${col}`}
        className = {`node ${extraClassName}`}
        //three mouse key components: down, enter and leave
        onMouseDown = {() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseLeave={() => onMouseLeave(row, col)}
        ></div><
    );
};

//Expot node
export default Node;