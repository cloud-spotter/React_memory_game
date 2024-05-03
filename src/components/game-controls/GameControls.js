import React  from "react"; 

function GameControls() {

    return (
        <div className="game-controls">
            <button className="button start" aria-label="Start">Start</button>
            <button className="button reset" aria-label="Reset">Reset</button>
        </div>
    );
}

export default GameControls;
