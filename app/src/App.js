import React, {useState, useContext} from 'react';
import './App.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragCard from './DragCard';
import { Grid, GridCell, GridPic } from './DragGrid';
import GridContext, {GridMaker} from './DragGridContext';
import Picture from './Picture';
import ImageModal from './ImageModal';
import {useGet} from "./useGet";
import {usePost} from "./usePost";

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

    // Mockup: Assign thumbnails to data from JSON
    const images = [dog, fiyah, friendlyguy, ok, sads];

    data.map(i => (
            i.img_src = images[data.indexOf(i)]
        )
    )

    // REST API data
    const url = "http://127.0.0.1:8000/profiles"; //`${process.env.REACT_APP_API_ROOT}/profiles`;  // URL of REST API
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
    const [body, setBody] = useState(null);
    const {requestData, error, isLoading} = useGet(url, {headers: headers});
    const {response, err, isPostLoading} = usePost(url, {headers: headers});

    // Modal control
    const [modalImage, setModalImage] = useState("");    // The current image to display in the modal
    const [display, setDisplay] = useState(false);  // Modal visibility

    const closeModal = () => {
        setDisplay(false);
        setModalImage("");
    }

    const handleClick = (e) => {
        setModalImage(e.currentTarget.querySelector("img").src);
        setDisplay(true);
        console.log("Clicked ", e.currentTarget)
    }

    // DnD Grid control context
    const {items, moveItem} = useContext(GridContext);

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                {display && (
                    <div className="modal-display-block">
                        <ImageModal src={modalImage} onClose={closeModal}/>
                    </div>
                )}
                <h1>Hello</h1>
                {/*<p>{requestData}</p>*/}
                <Grid>
                    {requestData.map( item => (
                        <div className="card" onClick={handleClick}>
                            <h2>{item.title}</h2>
                            <Picture id={item.type} src={item.img_src} alt=""/>
                        </div>
                    ))}
                </Grid>
             {/*   <GridMaker items={data}>*/}
             {/*       <Grid>*/}
             {/*           {items.map(item => (*/}
             {/*               <DragCard key={item.type} id={item.type} onMoveItem={moveItem} onClick={handleClick}>*/}
             {/*                   <GridCell>*/}
             {/*                       <h2>{item.title}</h2>*/}
             {/*                       <GridPic>*/}
             {/*                           <Picture src={item.src}/>*/}
             {/*                       </GridPic>*/}
             {/*                   </GridCell>*/}
             {/*               </DragCard>*/}
             {/*           ))}*/}
             {/*       </Grid>*/}
             {/*   </GridMaker>*/}
             </DndProvider>
        </div>
    );
}

export default App;
