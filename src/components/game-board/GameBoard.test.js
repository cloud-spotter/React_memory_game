// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';

// Establish props to pass to GameBoard since lifting isGameActive state up to App from GameBoard
const renderGameBoard = (props = {}) => {  // assign constant to arrow function with one param (props) which defaults to an empty object ({}) if not provided
    const setIsGameActive = jest.fn() // Mock function for state setter prop
    return render(<GameBoard isGameActive={false} setIsGameActive={setIsGameActive} {...props} />);
}; // {...props} - spread operator used to pass any additional properties from the props object (potentially overriding the default props provided - isGameActive & setIsGameActive)

describe('GameBoard', () => {
    beforeEach(() => {
        cleanup();
    });
    
    test('renders the grid component', () => {
        renderGameBoard();
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
    });

    // TEST REMOVED (Start button removed from design - hindered user experience)
    // test('renders start button', () => {
    //     renderGameBoard();
    //     const startButton = screen.getByRole('button', { name: /start/i });
    //     expect(startButton).toBeInTheDocument();
    // });

    test('renders reset button', () => {
        renderGameBoard();
        const resetButton = screen.getByRole('button', { name: /reset/i });
        expect(resetButton).toBeInTheDocument();
    });

    test('flips a facedown-card when clicked', () => {
        renderGameBoard();
        const card = screen.getAllByRole('button', { name: "Card facedown" })[0];
        fireEvent.click(card);
        expect(card).toHaveClass('card-faceup');
    });

    test('shuffles the cards randomly each render', () => {        
        const { container: firstContainer } = renderGameBoard();
        // Flip all cards in the first render
        const firstRenderCards = screen.getAllByRole('button', { name: "Card facedown" }); // Search component currently rendered for facedown cards first (as that's their initial state)
        firstRenderCards.forEach(card => {
            fireEvent.click(card);  // Then turn each card over to check their values
        });
        const firstRenderCardValues = firstRenderCards.map(card => card.textContent);

        cleanup();  // Unmount component currently rendered (firstContainer) & clear up any side effects 

        const { container: secondContainer } = renderGameBoard();
        // Flip all cards in the second render
        const secondRenderCards = screen.getAllByRole('button', { name: "Card facedown" });
        secondRenderCards.forEach(card => {
            fireEvent.click(card);
        });
        const secondRenderCardValues = secondRenderCards.map(card => card.textContent);
        
        expect(firstRenderCardValues).not.toEqual(secondRenderCardValues);
    });

    test('registers cards as matched when two matching cards are flipped', async () => {
        renderGameBoard();
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCard = cards[0];
        // Since clicking the first card starts a game, we will click a card
        // first before doing anything else.
        await userEvent.click(firstCard);
        const cardValue = firstCard.getAttribute('data-value');
        const secondCard = cards.find(card => (card.getAttribute('data-value') === cardValue && card !== firstCard));
    
        // Ensure both cards exist and are different elements
        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
        expect(firstCard).not.toBe(secondCard);
    
        console.log('firstCard value:', firstCard.getAttribute('data-value')) // DEBUGGING
        console.log('(firstCard) cardValue value:', cardValue) // DEBUGGING
        console.log('secondCard value before click:', secondCard.getAttribute('data-value')) // DEBUGGING
        // screen.debug(); // DEBUGGING
        
        await userEvent.click(secondCard);
        console.log('firstCard value after secondCard click:', firstCard.getAttribute('data-value')) // DEBUGGING
        console.log('secondCard value after click:', secondCard.getAttribute('data-value')) // DEBUGGING
        expect(firstCard).toHaveClass('card-matched');
        expect(secondCard).toHaveClass('card-matched');
        });

    test('unflips cards when two non-matching cards are already flipped and a third is clicked', () => {
        renderGameBoard();
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start game by clicking card (also reshuffles cards so do this before finding a matching card)
        
        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== firstCard.getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
        
        const thirdCard = cards.find(card => card.getAttribute('data-value') !== firstCard.getAttribute('data-value') && card.getAttribute('data-value') !== nonMatchingCard.getAttribute('data-value'));
        fireEvent.click(thirdCard);

        expect(firstCard).toHaveClass('card-facedown');
        expect(nonMatchingCard).toHaveClass('card-facedown');
        expect(thirdCard).toHaveClass('card-faceup');
    });

    test('keeps cards flipped when two matching cards are flipped', () => {
        renderGameBoard();
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start game by clicking card (also reshuffles cards so do this before finding a matching card)
        
        const matchingCard = cards.find(card => card.getAttribute('data-value') === firstCard.getAttribute('data-value'));
        fireEvent.click(matchingCard);

        expect(firstCard).not.toHaveClass('card-facedown');
        expect(matchingCard).not.toHaveClass('card-facedown');
    });

    // Test suggested by Claude (AI) in response to a request for feedback on my tests
    test('increments move count when two cards are flipped', () => {
        renderGameBoard();
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const totalPairs = cards.length / 2;
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start the game before doing anything else (also initialise game settings, including shuffling the cards)

        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== cards[0].getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
    
        // Simulate matching all remaining cards to trigger the game over modal
        cards.slice(2).forEach((card) => { // Create a new array from cards[2] inclusive (excludes first two cards already clicked)
        fireEvent.click(card);
        const matchingCard = cards.find(
            (c) => c !== card && c.getAttribute('data-value') === card.getAttribute('data-value') // Check for a card (c) that is not the same as the current card (card) but with the same data-value attribute
        );
        fireEvent.click(matchingCard);
        });
    
        // Verify that the move count is displayed correctly in the game over modal
        const expectedMoves = totalPairs + 1;
        const moveCountDisplay = screen.getByText(/moves/i);
        expect(moveCountDisplay).toHaveTextContent(`You found all the pairs in ${expectedMoves} moves.`);
    });

    test('displays game over modal when all pairs are matched', () => {
        renderGameBoard();
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start the game before doing anything else (also initialise game settings, including shuffling the cards)

        const nonMatchingCard = cards.find(card => card.getAttribute('data-value') !== cards[0].getAttribute('data-value'));
        fireEvent.click(nonMatchingCard);
    
        // Simulate matching all remaining cards to trigger the game over modal
        cards.slice(2).forEach((card) => { // Create a new array from cards[2] inclusive (excludes first two cards already clicked)
        fireEvent.click(card);
        const matchingCard = cards.find(
            (c) => c !== card && c.getAttribute('data-value') === card.getAttribute('data-value') // Check for a card (c) that is not the same as the current card (card) but with the same data-value attribute
        );
        fireEvent.click(matchingCard);
        });
        // Assert: Game Over text displays in the DOM
        const gameOverMessage = screen.getByText(/Game Over/i);
        expect(gameOverMessage).toBeInTheDocument();
    });
});