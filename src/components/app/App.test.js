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

// test('renders GameBoard component', () => {
//   render(<App />);
//   const gameBoardElement = screen.getByTestId('game-board');
//   expect(gameBoardElement).toBeInTheDocument();
// });

// test('renders Footer component', () => {
//   render(<App />);
//   const footerElement = screen.getByText(/Created by/i);
//   expect(footerElement).toBeInTheDocument();
// });
});