// tests/integration/Grid.test.js
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

describe('Grid', () => {
  // Arrange mock cards and handler function
  const mockCards = Array(16).fill().map((_, i) => ({ // '_' in function params signifies that a parameter exists but is unused here (omitted intentionally). In this case, it stands in for the 1st element, which would be undefined here due to .fill() (which fills the empty array slots with undefined)
    image: `/images/animal_card_set/animal${i + 1}.png`,
    isFlipped: false,
    isMatched: false,
    description: `Image of animal${i + 1}`,  // Use animal id number in description for simplicity in test
    id: i + 1
  }));  
  
  const mockHandleCardClick = jest.fn(); 
  
// Tests
  test('renders a grid of cards', () => {
      render(
        <Grid 
          columns={4}
          rows={4}
          cards={mockCards} 
          handleCardClick={mockHandleCardClick}
        />
      ); // Need to pass Grid the required props now, since lifting card isFlipped state management up to GameBoard (parent component)
      
      const cards = screen.getAllByRole('button', { name: /Card \d+ facedown/i});
      expect(cards).toHaveLength(16);
    });
});
