// Based on tutorial at: https://github.com/tfiechowski/react-dnd-grid-tutorial

import React, { useState, createContext } from "react";
import {dog, fiyah, friendlyguy, ok, sads} from "./img";
import data from "./static/data.json";


// Data and thumbnails for initializing
const images = [dog, fiyah, friendlyguy, ok, sads];

const cardData = data.map(i => (
        i.src = images[data.indexOf(i)]
    )
)

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
    const moveItems = (source, dest) => {
        const sourcePos = state.items.findIndex(
            i => i.id === source
        );

        const destinationPos = state.items.findIndex(
            i => i.id === dest
        );

        if (source === -1 || dest === -1) {
            return;
        }

        const offset = destinationPos - sourcePos;

        setState(state => ({
            items: moveItem(state.items, sourcePos, offset)
        }));
    };

    const setItems = items => setState({items})

    const [state, setState] = useState({
        items: cardData,
        moveItems: moveItems,
        setItems: setItems
    });

    return (
        <GridContext.Provider value={state}>
            {props.children}
        </GridContext.Provider>
    )
}

export default GridContext;