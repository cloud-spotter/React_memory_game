import React from "react";

function Card({ card, handleCardClick }) {
    return (
      <button
        // Use template string to construct className string (to combine multiple classes conditionally)
        className={`${card.isFlipped ? "card-faceup" : "card-facedown"} ${card.isMatched ? "card-matched" : ""}`}
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