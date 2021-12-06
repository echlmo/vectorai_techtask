import React, {useState, useContext, useEffect} from 'react';
import './App.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from './DragCard';
import { Grid, GridCell, GridPic } from './DragGrid';
import GridContext, {GridMaker} from './DragGridContext';
import Picture from './Picture';
import ImageModal from './ImageModal';

import {dog, fiyah, friendlyguy, ok, sads} from './img';

import data from './static/content.json';

function App() {

    // The assigned thumbnails
    const images = [dog, fiyah, friendlyguy, ok, sads];

    data.map(i => (
            i.src = images[data.indexOf(i)]
        )
    )

    const [modalImage, setModalImage] = useState("");    // The current image to display in the modal
    const [display, setDisplay] = useState(false);  // Modal visibility

    const closeModal = () => {
        setDisplay(false);
        setModalImage("");
    }

    const {items, moveItems} = useContext(GridContext);

    const handleClick = (e) => {
        setModalImage(e.currentTarget.querySelector("img").src);
        setDisplay(true);
        console.log("Clicked ", e.currentTarget)
    }

    return (
        <div className="App">
            {display && (
                <div className="modal-display-block">
                    <ImageModal src={modalImage} onClose={closeModal}/>
                </div>
            )}
            <h1>Hello</h1>
            <Grid>
                {data.map( item => (
                    <div className="card" onClick={handleClick}>
                        <h2>{item.title}</h2>
                        <Picture id={item.type} src={item.src} alt=""/>
                    </div>
                ))}
            </Grid>
            {/*<DndProvider backend={HTML5Backend}>*/}
            {/*    <GridMaker>*/}
            {/*        <Grid>*/}
            {/*            {data.map(item => (*/}
            {/*                <DragCard id={item.type} onMoveItem={moveItems}>*/}
            {/*                    <GridCell>*/}
            {/*                        <h2>{item.title}</h2>*/}
            {/*                        <GridPic>*/}
            {/*                            <Picture src={item.src}/>*/}
            {/*                        </GridPic>*/}
            {/*                    </GridCell>*/}
            {/*                </DragCard>*/}
            {/*            ))}*/}
            {/*        </Grid>*/}
            {/*    </GridMaker>*/}
            {/* </DndProvider>*/}
        </div>
    );
}

export default App;
