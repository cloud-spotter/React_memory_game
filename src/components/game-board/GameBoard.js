import React from 'react';
import { Grid } from '../grid/Grid';
import GameControls from '../game-controls/GameControls';

function GameBoard() {
    return (
      <>
        <div className='game-board' data-testid="game-board">
          <Grid />
        </div>
        <GameControls />
      </>
    );
}

export default GameBoard;