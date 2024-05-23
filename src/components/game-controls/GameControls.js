import React  from "react"; 

function GameControls({ resetGame }) {
    return (
      <div className="game-controls">
        <button className="button reset" aria-label="Reset" onClick={resetGame}>Reset</button>
      </div>
    );
}

export default GameControls;
