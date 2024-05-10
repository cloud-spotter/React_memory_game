import React from "react";

function Card( { value, isFlipped, handleCardClick }) {
    return (
        <button 
            className={isFlipped ? "card-faceup" : "card-facedown"}
            // aria-label added to enhance accessibility
            aria-label={isFlipped ? `Card faceup with value ${value}` : "Card facedown"} 
            onClick={handleCardClick}
        >
            {isFlipped ? value : ""}
        </button>
    )
}

export default Card;