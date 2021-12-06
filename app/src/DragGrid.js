// Based on tutorial at: https://github.com/tfiechowski/react-dnd-grid-tutorial

import React from 'react';
import styled from 'styled-components';

export const Grid = styled.div `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const GridWrap = styled.div `
    flex: 0 0 33.3%
    display: flex;
    grid-gap: 10px;
`

export const GridPic = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`

export const GridCell = ({ forwardedRef, ...props }) => (
    <GridWrap ref={forwardedRef} { ...props } />
)