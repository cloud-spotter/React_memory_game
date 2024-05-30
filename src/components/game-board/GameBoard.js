import React, { useEffect, useState, useCallback } from 'react';
import Grid from '../grid/Grid';
import GameControls from '../game-controls/GameControls';
import GameOverModal from '../game-over-modal/GameOverModal';

// Function to create card data for each card instance (to be mapped to each element in the cards array when initialised)
const createCardData = (value) => ({ // () around {} indicates that the arrow function will directly return an object literal
    value: value, 
    isFlipped: false,
    isMatched: false
});

// Function to shuffle array (Fisher-Yates shuffle algorithm)
// https:www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const createPairSequence = (total) => {
    const sequence = [...Array(Math.floor(total / 2)).keys()].map(i => i + 1);
    return [...sequence, ...sequence]; // Create a paired sequence of values
};


function GameBoard({ isGameActive, setIsGameActive }) {
    const totalCards = 8; // TODO: reset this to 16 (using small grid for development/testing functionality)
    const cardValues = shuffleArray(createPairSequence(totalCards)); // Create and shuffle cards
    
    const [cards, setCards] = useState(cardValues.map(value => createCardData(value))); // Initialise cards state (with shuffled values)
    const [flippedIndices, setFlippedIndices] = useState([]);  // Track indices of currently flipped cards across renders
    const [moveCount, setMoveCount] = useState(0)
    const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerId, setTimerId] = useState(null);

    const handleCardClick = (index) => {
        console.log('Card clicked (index):', index); // DEBUGGING
        console.log('isGameActive:', isGameActive);  // DEBUGGING
        if (!isGameActive) {
            console.log('starting game')
            startGame(); // Start the game on the first card click
            console.log('isGameActive, after game has started (should be true):', isGameActive);  // DEBUGGING
        }
        console.log('setting cards') // DEBUGGING
        setCards(currentCards => {
            // Create copy of current cards array for modifying
            let updatedCards = [...currentCards];
            // Check if clicked card is already flipped/matched (& return early if so)
            if (currentCards[index].isFlipped || currentCards[index].isMatched) {
                return updatedCards
            }
            
            // Flip the clicked card
            updatedCards[index].isFlipped = true;
            // Temporary array to include indices of currently flipped cards PLUS the newly flipped card
            const newFlippedIndices = [...flippedIndices, index];
            
            console.log('checking the 2 flipped cards for a match') // DEBUGGING
            // If there are 2 cards currently flipped, check their values for a match & if a match is found, mark them as matched
            if (newFlippedIndices.length === 2) {
                const [firstIndex, secondIndex] = newFlippedIndices;
                if (updatedCards[firstIndex].value === updatedCards[secondIndex].value) {
                    updatedCards[firstIndex].isMatched = true;
                    updatedCards[secondIndex].isMatched = true;
                    setFlippedIndices([]); // Remove matched cards from flipped indices tracker
                } else {
                    setFlippedIndices(newFlippedIndices);
                }
                // Increment moveCount (after second card click)
                setMoveCount(previousMoveCount => previousMoveCount +1);
            } else if (newFlippedIndices.length === 3) {  // Handle case when third card is clicked if two unmatched cards are already flipped (flip back the first two)
                const [firstIndex, secondIndex] = newFlippedIndices;
                updatedCards[firstIndex].isFlipped = false;
                updatedCards[secondIndex].isFlipped = false;
                updatedCards[index].isFlipped = true; // Flip the third (current) card clicked
                setFlippedIndices([index]);
            } else {
                setFlippedIndices(newFlippedIndices);
            }
            return updatedCards;
        });
    };

    // Timer functions to track the time taken for the user to match all pairs
    const startTimer = () => {
        stopTimer(); // Safety check! Ensure no time is running already
        const id = setInterval(() => {
            setTimer(timer => timer + 1); // Increment the timer state by one every second
        }, 1000);
        setTimerId(id); // Store the interval ID in state. This allows referencing/clearing that interval later & access to it throughout the component's lifecycle (e.g. allows control over it across renders & other state updates)
    };

    const stopTimer = useCallback(() => {
        if (timerId) { // Check whether there's a timer running
            clearInterval(timerId); // Stop the timer using clearInterval with the stored interval ID
            setTimerId(null); // Reset the timerId state to null (i.e. no active timer)
        }
    }, [timerId]);

    const resetTimer = () => {
        stopTimer();
        setTimer(0);
    };

    // Functions for game control (Start and Reset game)
    // startGame: initialises all game settings and starts a new session
    const startGame = () => {
        if (!isGameActive) {
            resetTimer();
            startTimer();
            console.log('setting isGameActive to true') // DEBUGGING
            setIsGameActive(true);
            isGameActive = true;  // also update current copy
            console.log('isGameActive:', isGameActive)  //DEBUGGING
        }
        console.log('shuffling cards')  //DEBUGGING
        const shuffledCardValues = shuffleArray(createPairSequence(totalCards));
        setCards(shuffledCardValues.map((value) => createCardData(value)));
        setFlippedIndices([]);
        setMoveCount(0);
        setIsGameOverModalOpen(false);
    };
    
    // resetGame: clears the current game state and settings, preparing for a fresh start/replay
    const resetGame = () => {
        console.log('setting isGameActive to false')  //DEBUGGING
        setIsGameActive(false);
        isGameActive = false;
        console.log('isGameActive:', isGameActive)  //DEBUGGING
        const shuffledCardValues = shuffleArray(createPairSequence(totalCards));
        setCards(shuffledCardValues.map((value) => createCardData(value)));
        setFlippedIndices([]);
        setMoveCount(0);
        resetTimer();
        setIsGameOverModalOpen(false);
    };

    // DEBUGGING - log everytime isGameActive state changes
    useEffect(() => {
        console.log('isGameActive changed:', isGameActive);
      }, [isGameActive]);

    // Check if game is over
    useEffect(() => {
        if (cards.every((card) => card.isMatched)) {
            stopTimer();
            setIsGameOverModalOpen(true);
            setIsGameActive(false);
            isGameActive = false;
        }
    }, [cards, stopTimer, setIsGameActive]);

    return (
    <>
      <div className='game-board' data-testid="game-board">
        <Grid cards={cards} handleCardClick={handleCardClick} />
      </div>
      <GameControls resetGame={resetGame} />
      <GameOverModal isOpen={isGameOverModalOpen} closeModal={() => setIsGameOverModalOpen(false)} moveCount={moveCount} resetGame={resetGame} timer={timer}></GameOverModal>
    </>
    );
}

export default GameBoard;