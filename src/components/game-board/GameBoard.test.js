// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';

describe('GameBoard', () => {
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

//   test('flips a facedown-card when clicked', () => {
//     render(<GameBoard />);
//     const card = screen.getAllByRole('button', { name: "" })[0];
//     fireEvent.click(card);
//     expect(card).toHaveClass('card-faceup');
//   });

//   test('unflips cards when two non-matching cards are flipped', () => {
//     render(<GameBoard />);
//     const [card1, card2] = screen.getAllByRole('button', { name: /card/i });
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