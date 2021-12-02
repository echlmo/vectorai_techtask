import React, { useRef, useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

// A custom Card component with a title and image that can be dragged and dropped
export default function DragCard( {id, title, img} ) {
    //let [loading, setLoading] = useState(true);
    // const ref = useRef(null); // Initialize ref for component
    //
    // const [, connectDrag] = useDrag({
    //     item: {id: id, type: "DRAG_CARD"}
    // });
    //
    // const [, connectDrop] = useDrop({
    //     accept: "DRAG_CARD"
    // });
    //
    // connectDrag(ref);
    // connectDrop(ref);

    return (
        <Card>
            <CardHeader
                title={title}
            />
            <CardMedia
                component={"img"}
                image={img}
            />
        </Card>
    )
}