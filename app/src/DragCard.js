// Based on tutorial at: https://github.com/tfiechowski/react-dnd-grid-tutorial

import React, { useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';

// A custom Card component that can be dragged and dropped
export default function DragCard( {id, onMoveItem, children} ) {
    const ref = useRef(null); // Initialize ref for component

    const [{isDrag}, connectDrag] = useDrag({
        item: {id: id, type: "DRAG_CARD"},
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    const [, connectDrop] = useDrop({
        accept: "DRAG_CARD",
        hover(hoverItem) {
            if (hoverItem.id !== id) {
               onMoveItem(hoverItem.id, id);
            }
        }
    });

    connectDrag(ref);
    connectDrop(ref);

    const dragop = isDrag ? 0.5 : 1;

    return (
        React.Children.map(children, child =>
            React.cloneElement(child, {
                forwardedRef: ref,
                style: {dragop}
            })
        )
    )
}