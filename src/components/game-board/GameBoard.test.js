// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';

describe('GameBoard', () => {
    beforeEach(() => {
        cleanup();
    });
    
    test('renders the grid component', () => {
        render(<GameBoard />);
        const grid = screen.getByTestId('grid');
        expect(grid).toBeInTheDocument();
    });

    // TEST REMOVED (Start button removed from design - hindered user experience)
    // test('renders start button', () => {
    //     render(<GameBoard />);
    //     const startButton = screen.getByRole('button', { name: /start/i });
    //     expect(startButton).toBeInTheDocument();
    // });

    test('renders reset button', () => {
        render(<GameBoard />);
        const resetButton = screen.getByRole('button', { name: /reset/i });
        expect(resetButton).toBeInTheDocument();
    });

    test('flips a facedown-card when clicked', () => {
        render(<GameBoard />);
        const card = screen.getAllByRole('button', { name: "Card facedown" })[0];
        fireEvent.click(card);
        expect(card).toHaveClass('card-faceup');
    });

    test('shuffles the cards randomly each render', () => {        
        const { container: firstContainer } = render(<GameBoard />);
        // Flip all cards in the first render
        const firstRenderCards = screen.getAllByRole('button', { name: "Card facedown" }); // Search component currently rendered for facedown cards first (as that's their initial state)
        firstRenderCards.forEach(card => {
            fireEvent.click(card);  // Then turn each card over to check their values
        });
        const firstRenderCardValues = firstRenderCards.map(card => card.textContent);

        cleanup();  // Unmount component currently rendered (firstContainer) & clear up any side effects 

        const { container: secondContainer } = render(<GameBoard />);
        // Flip all cards in the second render
        const secondRenderCards = screen.getAllByRole('button', { name: "Card facedown" });
        secondRenderCards.forEach(card => {
            fireEvent.click(card);
        });
        const secondRenderCardValues = secondRenderCards.map(card => card.textContent);
        
        expect(firstRenderCardValues).not.toEqual(secondRenderCardValues);
    });

    test('registers cards as matched when two matching cards are flipped', async () => {
        render(<GameBoard />);
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
    
        await userEvent.click(secondCard);
        expect(firstCard).toHaveClass('card-matched');
        expect(secondCard).toHaveClass('card-matched');
        });

    test('unflips cards when two non-matching cards are already flipped and a third is clicked', () => {
        render(<GameBoard />);
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
        render(<GameBoard />);
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCard = cards[0];
        fireEvent.click(firstCard); // Start game by clicking card (also reshuffles cards so do this before finding a matching card)
        
        const matchingCard = cards.find(card => card.getAttribute('data-value') === firstCard.getAttribute('data-value'));
        fireEvent.click(matchingCard);

        expect(firstCard).not.toHaveClass('card-facedown');
        expect(matchingCard).not.toHaveClass('card-facedown');
    });

//   test('updates move count when cards are flipped', () => {
//     render(<GameBoard />);
//     const cards = screen.getAllByRole('button', { name: /card facedown/i });
//     const firstCard = cards[0]
//     const secondCard = cards[1]

//     fireEvent.click(firstCard);
//     fireEvent.click(secondCard);

//     const moveCount = screen.getByText(/Moves: 2/i);
//     expect(moveCount).toBeInTheDocument();
//   });

//   test('ends the game when all cards are matched', () => {
//     render(<GameBoard />);
//     // Simulate matching all cards
//     const cards = screen.getAllByRole('button', { name: /card/i });
//     cards.forEach((card, index) => {
//       card.setAttribute('data-testid', `card-${Math.floor(index / 2)}`);
//       userEvent.click(card);
//     });
//     const gameOverMessage = screen.getByText(/Game Over/i);
//     expect(gameOverMessage).toBeInTheDocument();
//   });
});