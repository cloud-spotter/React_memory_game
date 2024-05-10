import React from 'react';
import Card from '../card/Card';

function Grid({ cards, handleCardClick }) {
    const cardElements = cards.map((card, index) => (
        <Card key={index} value={card.value} isFlipped={card.isFlipped} handleCardClick={() => handleCardClick(index)} />
    ));

    return <div className="grid" data-testid="grid">{cardElements}</div>; 
};

export default Grid;