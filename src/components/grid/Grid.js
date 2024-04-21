import React from 'react';
import Card from '../card/Card';

function Grid() {
    const totalValues = 16; // Start with a fixed grid for testing & first iteration
    const createPairSequence = (total) => {
        const sequence = [...Array(Math.floor(total / 2)).keys()].map(i => i + 1);
        return [...sequence, ...sequence]; // Create a paired sequence of values
    };
    
    const cardValues = createPairSequence(totalValues);

    const cards = cardValues.map((value, index) => (
        <Card key={index} value={value} />
    ));
    return <div className="grid">{cards}</div>; 
}

export default Grid;