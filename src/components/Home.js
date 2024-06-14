import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [numPairs, setNumPairs] = useState(8);
    const [imageSet, setImageSet] = useState('animals');
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate(`/game?numPairs=${numPairs}&imageSet=${imageSet}`);
    }

    return (
        <div className="home">
          {/* <h1>Memory Game</h1> */}
          <div>
            <label htmlFor="numPairs">Number of Pairs:</label>
            <select id="numPairs" onChange={(e) => setNumPairs(parseInt(e.target.value))} defaultValue={8}>
                {[...Array(8).keys()].map(n => (
                    <option key={n + 1} value={n + 1}>{n+1} Pairs</option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="imageSet">Image Set:</label>
            <select id="imageSet" onChange={(e) => setImageSet(e.target.value)} defaultValue="animals">
                <option value="animals">Animals</option>
                <option value="totoro">My Neighbour Totoro</option>
            </select>
          </div>
          <button className="start" onClick={handleStartGame}>Start</button>
        </div>
    );
}

export default Home; 