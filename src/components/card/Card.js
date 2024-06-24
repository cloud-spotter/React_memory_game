import React from "react";

function Card({ card, handleCardClick }) {
    return (
      <button
        className={`${card.isFlipped ? "card-faceup" : "card-facedown"} ${card.isMatched ? "card-matched" : ""}`}
        aria-label={card.isFlipped ? `Card faceup with image` : "Card facedown"} 
        onClick={handleCardClick}
        data-value={card.image}
      >
        {card.isFlipped && (
          <div className="card-image-wrapper">
            <img src={card.image} alt="card" />
          </div>
        )}
      </button>
    )
}

export default Card;