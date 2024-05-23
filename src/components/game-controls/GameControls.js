import React  from "react"; 

function GameControls({startGame, resetGame}) {
    console.log(startGame);
    return (
      <div className="game-controls">
        <button className="button start" aria-label="Start" onClick={startGame}>Start</button>
        <button className="button reset" aria-label="Reset" onClick={resetGame}>Reset</button>
      </div>
    );
}

export default GameControls;
