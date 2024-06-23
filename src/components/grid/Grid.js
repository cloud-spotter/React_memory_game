import React from 'react';
import Card from '../card/Card';

function Grid({ columns, rows, cards, handleCardClick }) {
    // New object to pass to CSS style attribute, to set grid columns/rows dynamically from user choice in Home.js
    const gridStyle = {  
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeate(${rows}, 1fr)`
    };
    
    const cardElements = cards.map((card, index) => (
        <Card key={index} card={card} handleCardClick={() => handleCardClick(index)} />
    ));

    return <div className="grid" style={gridStyle} data-testid="grid">{cardElements}</div>; 
};

export default Grid;