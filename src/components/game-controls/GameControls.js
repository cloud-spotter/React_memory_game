import React  from "react"; 

function GameControls() {

    return (
        <div className="game-controls">
            <button className="start" aria-label="Start">Start</button>
            <button className="reset" aria-label="Reset">Reset</button>
        </div>
    );
}

export default GameControls;
