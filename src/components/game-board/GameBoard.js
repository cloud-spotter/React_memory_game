import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '../grid/Grid';
import GameControls from '../game-controls/GameControls';
import GameOverModal from '../game-over-modal/GameOverModal';

// Function to create card data for each card instance (to be mapped to each element in the cards array when initialised)
const createCardData = (image) => ({ // () around {} indicates that the arrow function will directly return an object literal
    image: image, 
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

const createPairSequence = (numPairs, imageSet) => {
    const imageSets = {
        animals: [
            '/images/animal_card_set/beaver.png',
            '/images/animal_card_set/capybara.png',
            '/images/animal_card_set/frog.png',
            '/images/animal_card_set/lemur.png',
            '/images/animal_card_set/llama.png',
            '/images/animal_card_set/puffin.png',
            '/images/animal_card_set/raccoon.png',
            '/images/animal_card_set/squirrel.png',
            '/images/animal_card_set/bear.png',
            '/images/animal_card_set/capybara.png',  
            '/images/animal_card_set/frog.png',      
            '/images/animal_card_set/penguin.png',   
            '/images/animal_card_set/sloth.png',
            '/images/animal_card_set/beaver.png',    
            '/images/animal_card_set/chicken.png',  
            '/images/animal_card_set/lemur.png',     
            '/images/animal_card_set/pig.png',       
            '/images/animal_card_set/squirrel.png',
            '/images/animal_card_set/bee.png',      
            '/images/animal_card_set/crab.png',      
            '/images/animal_card_set/llama.png',     
            '/images/animal_card_set/puffin.png',    
            '/images/animal_card_set/turtle.png',
            '/images/animal_card_set/blowfish.png',  
            '/images/animal_card_set/cricket.png',   
            '/images/animal_card_set/mouse.png',     
            '/images/animal_card_set/raccoon.png',   
            '/images/animal_card_set/whale.png',
            '/images/animal_card_set/bullfinch.png', 
            '/images/animal_card_set/dolphin.png',   
            '/images/animal_card_set/owl.png',       
            '/images/animal_card_set/rhino.png',
            '/images/animal_card_set/butterfly.png', 
            '/images/animal_card_set/fox.png',       
            '/images/animal_card_set/parrot.png',    
            '/images/animal_card_set/seal.png'
        ],
        totoro: [
            // TODO: add images to card set
        ]
    };
    const selectedImages = imageSets[imageSet].slice(0, numPairs);
    // Create a paired sequence of images
    const sequence = [...selectedImages, ...selectedImages];
    return shuffleArray(sequence); 
};

const gridSizes = {
    '3x4': 6,
    '4x4': 8, 
    '6x4': 12
};


function GameBoard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gridSize = queryParams.get('gridSize') || '4x4';
    console.log("gridSize received from Home:", gridSize) // DEBUGGING
    const [columns, rows] = gridSize.split('x').map(Number) // Split the string & convert each element to a number by passing map() the inbuilt function Number() as a callback (i.e. without parenthesis)
    const numPairs = gridSizes[gridSize]; // Default to 8 pairs if not specified
    const imageSet = queryParams.get('imageSet') || 'animals'; // Default to 'animals' if not specified

    const totalCards = numPairs * 2; // TODO: delete if not needed anymore
    const cardImages = createPairSequence(numPairs, imageSet); // Create and shuffle cards
    // Initialise cards state (with shuffled values)
    const [cards, setCards] = useState(cardImages.map(image => createCardData(image)));
    const [flippedIndices, setFlippedIndices] = useState([]);  // Track indices of currently flipped cards across renders
    const [moveCount, setMoveCount] = useState(0)
    const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [isGameActive, setIsGameActive] = useState(false);

    // Check if game is over
    useEffect(() => {
        if (cards.every((card) => card.isMatched)) {
            stopTimer();
            setIsGameOverModalOpen(true);
        }
    }, [cards]);

    const handleCardClick = (index) => {
        if (!isGameActive) {
            startGame(); // Start the game on the first card click
            setIsGameActive(true);
        }
        
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

            // If there are 2 cards currently flipped, check their values for a match & if a match is found, mark them as matched
            if (newFlippedIndices.length === 2) {
                const [firstIndex, secondIndex] = newFlippedIndices;
                if (updatedCards[firstIndex].image === updatedCards[secondIndex].image) {
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

    const stopTimer = () => {
        if (timerId) { // Check whether there's a timer running
            clearInterval(timerId); // Stop the timer using clearInterval with the stored interval ID
            setTimerId(null); // Reset the timerId state to null (i.e. no active timer)
        }
    };

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
        }
        
        const shuffledCardImages = createPairSequence(numPairs, imageSet);
        setCards(shuffledCardImages.map((image) => createCardData(image)));
        setFlippedIndices([]);
        setMoveCount(0);
        setIsGameOverModalOpen(false);
    };
    
    // resetGame: clears the current game state and settings, preparing for a fresh start/replay
    const resetGame = () => {
        setIsGameActive(false);
        const shuffledCardImages = createPairSequence(numPairs, imageSet);
        setCards(shuffledCardImages.map((image) => createCardData(image)));
        setFlippedIndices([]);
        setMoveCount(0);
        resetTimer();
        setIsGameOverModalOpen(false);
    };

    return (
    <>
      <div className='game-board' data-testid="game-board">
        <Grid columns={columns} rows={rows} cards={cards} handleCardClick={handleCardClick} />
      </div>
      <GameControls 
        resetGame={resetGame}
        setNumPairs={numPairs => {
            queryParams.set('numPairs', numPairs);
            window.history.replaceState(null, '', `${location.pathname}?${queryParams.toString()}`);
            resetGame(); 
        }} 
        setImageSet={imageSet => {
            queryParams.set('imageSet', imageSet);
            window.history.replaceState(null, '', `${location.pathname}?${queryParams.toString()}`);
            resetGame(); 
        }}
      />
      <GameOverModal isOpen={isGameOverModalOpen} closeModal={() => setIsGameOverModalOpen(false)} moveCount={moveCount} resetGame={resetGame} timer={timer}></GameOverModal>
    </>
    );
}

export default GameBoard;