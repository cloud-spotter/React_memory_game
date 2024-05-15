// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

    test('renders start button', () => {
        render(<GameBoard />);
        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeInTheDocument();
    });

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

    test('registers cards as matched when two matching cards are flipped', () => {
        render(<GameBoard />);
    
        // Find two cards with the same value
        const cards = screen.getAllByRole('button', { name: /card facedown/i });
        const firstCardValue = cards[0].getAttribute('data-value');
        const matchingCard = cards.find(card => card.getAttribute('data-value') === firstCardValue && card !== cards[0]);
        
        // Ensure a matching card is found
        expect(matchingCard).not.toBeUndefined();

        // Flip the two matching cards
        fireEvent.click(cards[0]);
        fireEvent.click(matchingCard);

        // Assert that both cards are registered as matched
        expect(cards[0]).toHaveClass('card-matched');
        expect(matchingCard).toHaveClass('card-matched');
    });

//   test('unflips cards when two non-matching cards are already flipped', () => {
//     render(<GameBoard />);
//     const [card1, card2] = screen.getAllByRole('button', { name: /card faceup/i });
//     userEvent.click(card1);
//     userEvent.click(card2);
//     expect(card1).toHaveClass('card-facedown');
//     expect(card2).toHaveClass('card-facedown');
//   });

//   test('keeps cards flipped when two matching cards are flipped', () => {
//     render(<Grid />);
//     const [card1, card2] = screen.getAllByRole('button', { name: /card/i });
//     card1.setAttribute('data-testid', 'card-1');
//     card2.setAttribute('data-testid', 'card-1');
//     userEvent.click(card1);
//     userEvent.click(card2);
//     expect(card1).not.toHaveClass('card-facedown');
//     expect(card2).not.toHaveClass('card-facedown');
//   });

//   test('updates move count when cards are flipped', () => {
//     render(<GameBoard />);
//     const [card1, card2] = screen.getAllByRole('button', { name: /card/i });
//     userEvent.click(card1);
//     userEvent.click(card2);
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