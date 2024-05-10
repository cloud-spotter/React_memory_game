// tests/integration/Grid.test.js
import { render, screen } from '@testing-library/react';
import Grid from './Grid';
import Card from '../card/Card';

describe('Grid', () => {
  // Arrange mock cards and handler function
  const mockCards = Array(16).fill().map((_, i) => ({ value: i, isFlipped: false }));  
  const mockHandleCardClick = jest.fn(); 
  
// Tests
  test('renders a grid of cards', () => {
      render(<Grid cards={mockCards} handleCardClick={mockHandleCardClick} />); // Need to pass Grid the required props now, since lifting card isFlipped state management up to GameBoard (parent component)
      const cards = screen.getAllByRole('button', { name: "Card facedown"});
      expect(cards).toHaveLength(16);
    });
});
