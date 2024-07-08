import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [gridSize, setGridSize] = useState('4x4')
    const [imageSet, setImageSet] = useState('animals');
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate(`/game?gridSize=${gridSize}&imageSet=${imageSet}`);
    }

    return (
        <div className="home-content">
            <div className="options">
                <div className="options-subheader">Choose your cards</div>
                <div className="button-group">
                    <button 
                        className={`card-option-button ${imageSet === 'animals' ? 'active' : ''}`} 
                        aria-label="Animals card set"
                        onClick={() => setImageSet('animals')}
                    >
                        <img src="/images/animal_card_set/raccoon.png" alt="card" style={{ width: '70%', height: '65%' }} />
                    </button>
                    <button 
                        className={`card-option-button ${imageSet === 'totoro' ? 'active' : ''}`} 
                        aria-label="Totoro card set"
                        onClick={() => setImageSet('totoro')}
                    >
                        <img src="/images/totoro_card_set/totoro-sitting.png" alt="card" style={{ width: '60%', height: '82%' }} />
                    </button>
                </div>
                <div className="options-subheader">Choose a grid size</div>
                <div className="button-group">
                    <button 
                        className={`grid-option-button ${gridSize === '3x4' ? 'active' : ''}`} 
                        onClick={() => setGridSize('3x4')}
                    >
                        3 x 4
                    </button>
                    <button 
                        className={`grid-option-button ${gridSize === '4x4' ? 'active' : ''}`} 
                        onClick={() => setGridSize('4x4')}
                    >
                        4 x 4
                    </button>
                    <button 
                        className={`grid-option-button ${gridSize === '6x4' ? 'active' : ''}`} 
                        onClick={() => setGridSize('6x4')}
                    >
                        6 x 4
                    </button>
                </div>
                <button className="play" onClick={handleStartGame}>Play</button>
            </div>
        </div>
    );
}

export default Home;