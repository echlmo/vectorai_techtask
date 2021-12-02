import React, { useState, createContext } from "react";

// Helper: Reorders an array when moving an item from one position to another
function move(array, oldPos, newPos) {
   if (newPos >= array.length) {
       newPos = array.length - 1;
   }

   array.splice(newPos, 0, array.splice(oldPos, 1)[0]);

   return array;
}

// Helper: Moves and repositions an item in an array by an offset using move()
function moveItem(array, index, offset){
    const newPos = index + offset;

    return move(array, index, newPos);
}

const GridContext = createContext({ items: []});    //Init context for Grid (empty)

export function GridMaker(props) {
    const state = useState({items:[]});
    return (
        <GridContext.Provider value={state}>
            {props.children}
        </GridContext.Provider>
    )
}

export default GridContext;