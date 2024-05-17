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
  //   return (
//     <>
//       <div className="header"><Header /></div>
//       <div className="memory-game"><GameBoard /></div>
//     </>
//   );
// }

export default App;
