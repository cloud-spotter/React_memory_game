import React from "react";

function Card({ card, handleCardClick }) {
  // Set card aria-labels for accessibility
  const getAriaLabel = () => {
    if (card.isMatched) {
        return `Matched card: ${card.description}`;
    } else if (card.isFlipped) {
        return `Flipped card: ${card.description}`;
    } else {
        return `Card ${card.id || 'unknown'} facedown`;
    }
  };
  
  return (
      <button
        className={`${card.isFlipped ? "card-faceup" : "card-facedown"} ${card.isMatched ? "card-matched" : ""}`}
        aria-label={getAriaLabel()} // Use dynamic attribute label since updating aria-labels to match card states
        onClick={handleCardClick}
        data-value={card.image.split('/').pop().split('.')[0]}
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