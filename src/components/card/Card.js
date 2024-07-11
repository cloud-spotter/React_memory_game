import React from "react";

function Card({ card, handleCardClick }) {
  // Set card aria-labels for accessibility
  const getAriaLabel = () => {
    if (card.isMatched) {
        return `Matched card: ${card.description}`;
    } else if (card.isFlipped) {
        return `Flipped card: ${card.description}`;
    } else {
        return `Card ${card.id} facedown`;
    }
  };
  
  return (
      <button
        className={`${card.isFlipped ? "card-faceup" : "card-facedown"} ${card.isMatched ? "card-matched" : ""}`}
        aria-label={getAriaLabel()} 
        onClick={handleCardClick}
        data-value={card.image}
      >
        {card.isFlipped && (
          <div className="card-image-wrapper">
            <img src={card.image} alt={card.description} />
          </div>
        )}
      </button>
    );
}

export default Card;