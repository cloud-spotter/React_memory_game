import React from "react";

function Card({ card, handleCardClick }) {
    return (
        <button 
            className={card.isFlipped ? "card-faceup" : "card-facedown"}
            // aria-label added to enhance accessibility
            aria-label={card.isFlipped ? `Card faceup with value ${card.value}` : "Card facedown"} 
            onClick={handleCardClick}
            data-value={card.value}
        >
            {card.isFlipped ? card.value : ""}
        </button>
    )
}

export default Card;