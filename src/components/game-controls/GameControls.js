import React  from "react"; 

function GameControls({startGame}) {
    console.log(startGame);
    return (
      <div className="game-controls">
        <button className="button start" aria-label="Start" onClick={startGame}>Start</button>
        <button className="button reset" aria-label="Reset">Reset</button>
      </div>
    );
}

export default GameControls;
