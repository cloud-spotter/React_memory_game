import React, { useState } from 'react';
import Header from '../header/Header';
import GameBoard from '../game-board/GameBoard';
import Footer from '../footer/Footer';

function App() {
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <div className="memory-game">
      <Header />
      <div className="game-container">
        {/* Passing both the state and the state updater function as props allows child components to modify the state in the parent component. */}
        <GameBoard isGameActive={isGameActive} setIsGameActive={setIsGameActive} />
      </div>
      <div>
        {/* Conditionally render Footer if game is not active */}
        {!isGameActive && <Footer />}
      </div>
    </div>
  );
}

export default App;
