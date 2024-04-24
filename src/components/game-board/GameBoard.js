import React from 'react';
import Grid from '../grid/Grid';

function GameBoard() {
    return (
        <div className='game-board' data-testid="game-board">
            <Grid />
        </div>
    );
}

export default GameBoard;