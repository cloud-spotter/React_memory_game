import React from "react";

function Card({ card, handleCardClick }) {
    return (
      <button
        // Use template string to construct className string (to combine multiple classes conditionally)
        className={`${card.isFlipped ? "card-faceup" : "card-facedown"} ${card.isMatched ? "card-matched" : ""}`}
        // aria-label added to enhance accessibility
        aria-label={card.isFlipped ? `Card faceup with image` : "Card facedown"} 
        onClick={handleCardClick}
        data-value={card.image}
      >
        {card.isFlipped ? <img src={card.image} alt="card" style={{ width: '70%', height: '70%' }} /> : ""}
      </button>
    )
}

export default Card;