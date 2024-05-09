import React, { useState } from 'react';
import Grid from '../grid/Grid';
import GameControls from '../game-controls/GameControls';

function GameBoard() {
    const totalCards = 16;
    const [cards, setCards] = useState(Array(totalCards).fill({ isFlipped: false, value: '' }));

    const handleCardClick = (index) => {
        setCards(currentCards => 
            currentCards.map((card, idx) => 
                idx === index ? {...card, isFlipped: !card.isFlipped } : card )
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