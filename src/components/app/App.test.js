// tests/integration/App.test.js
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders header with game title', () => {
    render(<App />);
    
    // Check that the title features, agnostic of how it's structured in the HTML
    const headerContainer = screen.getByRole('heading'); // Get the header container   
    // Use within to scope the query to the header container
    const gameTitle = within(headerContainer).getByText((content, element) => {
      return /Memory\s*Game/i.test(element.textContent); // Regex matching to check for title in case insensitive way ('i' flag), allowing for any whitespace ('\s*')
    });

    expect(gameTitle).toBeInTheDocument();
  });

  test('renders GameBoard component', () => {
    render(<App />);
    const gameBoardElement = screen.getByTestId('game-board');
    expect(gameBoardElement).toBeInTheDocument();
  });

test('renders Footer component', () => {
  render(<App />);
  const footerElement = screen.getByText(/Created by/i);
  expect(footerElement).toBeInTheDocument();
});
});