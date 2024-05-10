import React from 'react';
import Card from '../card/Card';

// TODO: decide whether these are still needed, after card state refactoring (& delete if not)
// function areArraysDifferent(array1, array2) {
//     // If array lengths are different, they're different
//     if (array1.length !== array2.length) {
//         return true; 
//     }
//     // If any pair of corresponding elements in the arrays are different, the arrays are different
//     for (let i = 0; i < array1.length; i++) {
//         if (array1[i] !== array2[i]) {
//             return true;
//         }
//     }
//     // Otherwise (where no diffence is found):
//     return false;
// };


function Grid({ cards, handleCardClick }) {
    const cardElements = cards.map((card, index) => (
        <Card key={index} value={card.value} isFlipped={card.isFlipped} handleCardClick={() => handleCardClick(index)} />
    ));

    return <div className="grid" data-testid="grid">{cardElements}</div>; 
};

export default Grid;