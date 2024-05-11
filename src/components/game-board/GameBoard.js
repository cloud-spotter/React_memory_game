import React, { useState } from 'react';
import Grid from '../grid/Grid';
import GameControls from '../game-controls/GameControls';

// Function to create card data for each card instance (to be mapped to each element in the cards array when inisialised)
const createCardData = (value) => ({ // () around {} indicates that the arrow function will directly return an object literal
    value: value, 
    isFlipped: false,
    isMatched: false
});

// Function to shuffle array (Fisher-Yates shuffle algorithm)
// https:www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const createPairSequence = (total) => {
    const sequence = [...Array(Math.floor(total / 2)).keys()].map(i => i + 1);
    return [...sequence, ...sequence]; // Create a paired sequence of values
};

function GameBoard() {
    const totalCards = 16;
    const cardValues = shuffleArray(createPairSequence(totalCards)); // Create and shuffle cards
    // Initialise cards state (with shuffled values)
    const [cards, setCards] = useState(cardValues.map(value => createCardData(value)));
        
    const handleCardClick = (index) => {
        setCards(currentCards => 
            currentCards.map((card, idx) => 
                idx === index ? {...card, isFlipped: !card.isFlipped, isMatched: card.isMatched } : card )
            );
    };

    return (
    <>
        <div className='game-board' data-testid="game-board">
          <Grid cards={cards} handleCardClick={handleCardClick} />
        </div>
      <GameControls />
    </>
    );
}

export default GameBoard;