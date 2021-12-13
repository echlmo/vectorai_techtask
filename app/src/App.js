import React, {useState, useContext} from 'react';
import './App.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from './DragCard';
import { Grid, GridCell, GridPic } from './DragGrid';
import GridContext, {GridMaker} from './DragGridContext';
import Picture from './Picture';
import ImageModal from './ImageModal';
import {useFetch} from "./useFetch";

import {dog, fiyah, friendlyguy, ok, sads} from './img';

import data from './static/data.json';

/*
TODO
    - Fix: Get DnD cards working properly
    - Call get from API for card data (title, position, img_src)
    - Post to API for updating positions every move (x5 indiv posts)
    - Fn to check every 5 seconds for change and update/reload data
*/

function App() {

    // Assign thumbnails to data from JSON
    const images = [dog, fiyah, friendlyguy, ok, sads];

    const url = "http://0.0.0.0:8000";  // URL of REST API
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
    const options = {};
    const [request_data, error, isLoading] = useFetch(url, options);

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

    const {items, moveItem} = useContext(GridContext);

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
            {/*    <GridMaker items={data}>*/}
            {/*        <Grid>*/}
            {/*            {items.map(item => (*/}
            {/*                <DragCard key={item.type} id={item.type} onMoveItem={moveItem} onClick={handleClick}>*/}
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
