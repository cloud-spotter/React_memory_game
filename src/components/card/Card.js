import React from "react";
import { useState } from "react";

function Card( { value, onCardClick }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            if (onCardClick) {
                onCardClick();
            }
        }
    };
    
    return (
        <button className={isFlipped ? "card-faceup" : "card-facedown"}
        onClick={handleClick}>
            {isFlipped ? value : ""}
        </button>
    )
}

export default Card;