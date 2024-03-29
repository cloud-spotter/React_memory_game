// tests/integration/GameBoard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from '../../src/components/game-board/GameBoard';

// Commented out to start with App.test.js

// describe('GameBoard', () => {
//   test('renders a 4x4 grid of cards', () => {
//     render(<GameBoard />);
//     const cards = screen.getAllByRole('button', { name: /card/i });
//     expect(cards).toHaveLength(16);
//   });

//   test('flips a card when clicked', () => {
//     render(<GameBoard />);
//     const card = screen.getAllByRole('button', { name: /card/i })[0];
//     userEvent.click(card);
//     expect(card).not.toHaveClass('card-facedown');
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
//     render(<GameBoard />);
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
// });