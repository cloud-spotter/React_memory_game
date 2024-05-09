import React from 'react';
import Card from '../card/Card';

function areArraysDifferent(array1, array2) {
    // If array lengths are different, they're different
    if (array1.length !== array2.length) {
        return true; 
    }
    // If any pair of corresponding elements in the arrays are different, the arrays are different
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return true;
        }
    }
    // Otherwise (where no diffence is found):
    return false;
};

const getCardValues = (container) => {
    // Find all the 'faceup' card elements
    const cards = container.querySelectorAll(".card-faceup");
    // Map over the found elements to retrieve their text content
    return Array.from(cards).map(card => card.textContent);
};

function Grid({ cards, handleCardClick }) {
    const cardElements = cards.map((card, index) => (
        <Card key={index} value={card.value} isFlipped={card.isFlipped} handleCardClick={() => handleCardClick(index)} />
    ));
    // Old code pre-refactor TODO: delete once refactored code is working
    // const totalValues = 16; // Start with a fixed grid for testing & first iteration
    
    // Function to shuffle array (Fisher-Yates shuffle algorithm)
    // https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
    // const shuffleArray = (array) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    // }
    
    // const createPairSequence = (total) => {
    //     const sequence = [...Array(Math.floor(total / 2)).keys()].map(i => i + 1);
    //     return [...sequence, ...sequence]; // Create a paired sequence of values
    // };
    
    // let cardValues = createPairSequence(totalValues);
    // cardValues = shuffleArray(cardValues); // Shuffle the card value array

    // const cards = cardValues.map((value, index) => (
    //     <Card key={index} value={value} />
    // ));

    return <div className="grid" data-testid="grid">{cardElements}</div>; 
};

export default Grid;