import React, {useState, useContext, useEffect} from 'react';
import './App.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DragCard from './DragCard';
import { Grid } from './DragGrid';
import GridContext from './DragGridContext';
import Picture from './Picture';

import {dog, fiyah, friendlyguy, ok, sads} from './img'

import content from './static/content.json';

function App() {

    // Set up the initial items to be displayed combining the images and the static JSON data
    const images = [dog, fiyah, friendlyguy, ok, sads]

    const [displayBox, setDisplay] = useState(false);   // Manage lightbox pop-up
    const [popupImg, setPopupImg] = useState("");  // Modal pop-up active image

    const {items, moveItems} = useContext(GridContext);

    const onClickCard = (e) => {
        setDisplay(true);
        //TODO: Expose the Card's image src for the modal pop up
    }

    const onEsc = (e) => {
        if (e.keyCode === 27){
            setDisplay(false);
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", onEsc);
    })

    return (
        <div className="App">
            <h1>Hello</h1>
            <Grid>
                {content.map( item => (
                    <div className="card" onClick={onClickCard}>
                        <h2>{item.title}</h2>
                        <Picture src={images[item.position]} alt={item.type}/>
                    </div>
                ))}
            </Grid>
            {
                displayBox && (
                    <div className="modal">
                        <div className="modal-image">
                            <img src={popupImg}/>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default App;
