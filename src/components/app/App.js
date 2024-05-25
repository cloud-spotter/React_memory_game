import React from 'react';
import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';
import Footer from '../footer/Footer';

function App() {
  return (
    <div className="memory-game">
      <Header />
      <div className="game-container">
        <GameBoard />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
