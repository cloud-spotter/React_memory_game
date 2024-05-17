import React, { useState } from 'react';
import Grid from '../grid/Grid';
import GameControls from '../game-controls/GameControls';

// Function to create card data for each card instance (to be mapped to each element in the cards array when initialised)
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
    const [flippedIndices, setFlippedIndices] = useState([]);  // Track indices of currently flipped cards across renders
    const [moveCount, setMoveCount] = useState(0)
        
    const handleCardClick = (index) => {
        setMoveCount(previousMoveCount => previousMoveCount +1);
        
        setCards(currentCards => {
            // Create copy of current cards array for modifying
            let updatedCards = [...currentCards];
            // Check if clicked card is already flipped/matched (& return early if so)
            if (currentCards[index].isFlipped || currentCards[index].isMatched) {
                return updatedCards
            }

            // Flip the clicked card
            updatedCards[index].isFlipped = true;

            // Temporary array to include indices of currently flipped cards PLUS the newly flipped card
            const newFlippedIndices = [...flippedIndices, index];
            // If there are 2 cards currently flipped, check their values for a match & if a match is found, mark them as matched
            if (newFlippedIndices.length === 2) {
                const [firstIndex, secondIndex] = newFlippedIndices;
                if (updatedCards[firstIndex].value === updatedCards[secondIndex].value) {
                    updatedCards[firstIndex].isMatched = true;
                    updatedCards[secondIndex].isMatched = true;
                    setFlippedIndices([]); // Remove matched cards from flipped indices tracker
                } else {
                    setFlippedIndices(newFlippedIndices);
                }
            } else if (newFlippedIndices.length === 3) {  // Handle case when third card is clicked if two unmatched cards are already flipped (flip back the first two)
                const [firstIndex, secondIndex] = newFlippedIndices;
                updatedCards[firstIndex].isFlipped = false;
                updatedCards[secondIndex].isFlipped = false;
                updatedCards[index].isFlipped = true; // Flip the third (current) card clicked
                setFlippedIndices([index]);
            } else {
                setFlippedIndices(newFlippedIndices);
            }
            return updatedCards;
        });
    };

    // Game Over
    const isGameOver = cards.every(card => card.isMatched);

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