import React, { useState, useContext } from 'react';
import './App.css';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DragCard from './DragCard';
import { Grid } from './DragGrid';
import { GridContext } from './DragGridContext';

import dog from './img/dog.png';
import fiyah from './img/fiyah.jpg';
import friendlyguy from './img/friendlyguy.png';
import ok from './img/ok.png';
import sads from './img/sads.png';

import content from './static/content.json';

function App() {

    // Set up the initial items to be displayed combining the images and the static JSON data
    const images = [dog, fiyah, friendlyguy, ok, sads]

    //const {items, moveItems} = useContext(GridContext);

    return (
        <div className="App">
            <h1>Hello</h1>
            <Grid>
                {/*<DragCard id="test" title="Test" img={fiyah}/>*/}
                {content.map( item => (
                    <div>
                        <h2>{item.title}</h2>
                        <img src={images[item.position]}/>
                    </div>
                ))}
            </Grid>
        </div>
    );
}

export default App;
