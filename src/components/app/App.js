import React from 'react';
import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';

function App() {
  return (
    <div className="memory-game">
      <Header />
      <div className="game-container">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
