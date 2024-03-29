// ~~Default CRA test (displays React logo on server start)~~
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// tests/integration/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
  test('renders header with game title', () => {
    render(<App />);
    const gameTitle = screen.getByText(/Memory Game/i);
    expect(gameTitle).toBeInTheDocument();
  });

//   test('renders game board with 16 face-down cards', () => {
//     render(<App />);
//     const cards = screen.getAllByRole('button', { name: /card/i });
//     expect(cards).toHaveLength(16);
//     cards.forEach((card) => {
//       expect(card).toHaveClass('card-facedown');
//     });
//   });

//   test('renders game controls with start button', () => {
//     render(<App />);
//     const startButton = screen.getByRole('button', { name: /start/i });
//     expect(startButton).toBeInTheDocument();
//   });

//   test('renders game status with initial move count', () => {
//     render(<App />);
//     const moveCount = screen.getByText(/Moves: 0/i);
//     expect(moveCount).toBeInTheDocument();
//   });
// });